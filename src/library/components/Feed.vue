<template>
  <div
    v-if="objects.length > 0 || typing"
    ref="feedContainer"
    class="message-feed"
    @scroll="handleScroll"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    :id="`feed-container-${chatAppId}`"
  >
    <!-- Виртуализированный список сообщений -->
    <div 
      :style="{ height: totalHeight + 'px', position: 'relative' }"
      class="message-feed__virtual-container"
    >
      <div
        v-for="item in visibleItems"
        :key="item.id"
        :style="{ 
          position: 'absolute', 
          top: `${item.offset}px`,
          width: '100%',
          height: `${itemHeight}px`
        }"
        :data-message-id="item.id"
        class="message-feed__virtual-item"
        @dblclick="handleDoubleClick($event, item.data)"
      >
        <component
          :is="getMessageComponent(item.data.type)"
          :message="item.data"
          :apply-style="applyStyle"
          class="message-feed__message"
          @action="handleMessageAction"
          @reply="handleReplyClick"
        />
      </div>
    </div>

    <!-- Индикатор печати -->
    <TypingMessage
      v-if="typing"
      :message="{
        subText: (typing as IFeedTyping).title,
        avatar: (typing as IFeedTyping).avatar,
      }"
      class="message-feed__typing"
    />

    <!-- Клавиатура быстрых ответов -->
    <Transition name="keyboard">
      <MessageKeyboard
        v-if="showKeyboard"
        ref="keyboardRef"
        class="message-feed__keyboard"
        :keyboard="lastMessageKeyboard"
        @action="handleKeyboardAction"
      />
    </Transition>
    
    <!-- Кнопка прокрутки вниз -->
    <Transition name="scroll-button">
      <button
        v-if="showScrollButton"
        class="message-feed__button-down"
        @click="scrollToBottom"
      >
        <div
          v-if="buttonParams"
          class="message-feed__unread-amount"
        >
          {{ buttonParams.unreadAmount }}
        </div>
        <span class="pi pi-angle-down message-feed__icon-down" />
      </button>
    </Transition>
  </div>

  <!-- Пустое состояние -->
  <div 
    v-else
    class="message-feed message-feed--empty"
    ref="feedContainer"
  >
    <div class="message-feed__empty">
      <slot name="empty-feed"/>
    </div>
  </div>

  <!-- Teleport для ответа на сообщение -->
  <teleport
    v-if="replyMessage"
    :to="`#chat-input-reply-line-${chatAppId}`"
  >
    <BaseReplyMessage
      class="chat-input-reply"
      :message="replyMessage"
      @reset="handleResetReply"
    />
  </teleport>
</template>

<script setup lang="ts">
import { 
  ref, 
  computed, 
  watch, 
  nextTick, 
  inject, 
  onMounted, 
  onUnmounted,
  shallowRef,
  markRaw
} from 'vue'
import {
  FileMessage,
  ImageMessage,
  TextMessage,
  DateMessage,
  AudioMessage,
  VideoMessage,
  CallMessage,
  SystemMessage,
  TypingMessage,
  BaseReplyMessage
} from "../messages"

import { IFeedObject, IFeedTyping, IFeedUnreadButton } from '../../types'
import { useMessage } from '../../helpers/useMessage'
import MessageKeyboard from './MessageKeyboard.vue'

// Props
const props = defineProps({
  objects: {
    type: Array as () => IFeedObject[],
    required: true,
  },
  buttonParams: {
    type: Object as () => IFeedUnreadButton,
    required: false,
  },
  scrollToBottom: {
    type: Boolean,
    default: false,
  },
  typing: {
    type: [Object as () => IFeedTyping, Boolean],
    default: false,
  },
  enableDoubleClickReply: {
    type: Boolean,
    default: false,
  },
  scrollTo: {
    type: String,
    default: null,
  },
  applyStyle: {
    type: Function,
    default: () => null
  },
  // Новые пропсы для виртуализации
  itemHeight: {
    type: Number,
    default: 80, // Примерная высота сообщения
  },
  overscan: {
    type: Number,
    default: 5, // Количество элементов для предзагрузки
  }
})

// Emits
const emit = defineEmits([
  'messageAction',
  'loadMore', 
  'loadMoreDown',
  'messageVisible', 
  'clickRepliedMessage',
  'forceScrollToBottom',
  'keyboardAction'
])

// Injections
const chatAppId = inject('chatAppId') as string
const { setReply, getMessage, resetReply } = useMessage(chatAppId)

// Refs
const feedContainer = ref<HTMLElement>()
const keyboardRef = ref()
const replyMessage = ref()

// Состояние виртуализации
const scrollTop = ref(0)
const containerHeight = ref(0)
const isScrolling = ref(false)
const isMouseScrolling = ref(false)

// Кэшированные компоненты сообщений
const messageComponents = markRaw({
  'message.text': TextMessage,
  'message.image': ImageMessage,
  'message.file': FileMessage,
  'message.audio': AudioMessage,
  'message.video': VideoMessage,
  'message.call': CallMessage,
  'message.system': SystemMessage,
  'system.date': DateMessage,
  'message.typing': TypingMessage
})

// Intersection Observer для отслеживания видимых сообщений
const intersectionObserver = shallowRef<IntersectionObserver>()

// Computed
const totalHeight = computed(() => props.objects.length * props.itemHeight)

const visibleItems = computed(() => {
  if (!containerHeight.value) return []
  
  const startIndex = Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - props.overscan)
  const endIndex = Math.min(
    props.objects.length - 1,
    Math.ceil((scrollTop.value + containerHeight.value) / props.itemHeight) + props.overscan
  )
  
  const items = []
  for (let i = startIndex; i <= endIndex; i++) {
    items.push({
      id: props.objects[i].messageId,
      data: props.objects[i],
      offset: i * props.itemHeight
    })
  }
  
  return items
})

const showKeyboard = computed(() => {
  if (!props.objects.length) return false
  const lastMessage = props.objects[props.objects.length - 1]
  return lastMessage.keyboard && isNearBottom.value
})

const lastMessageKeyboard = computed(() => {
  if (!props.objects.length) return null
  return props.objects[props.objects.length - 1].keyboard
})

const showScrollButton = computed(() => {
  return !isNearBottom.value && props.objects.length > 0
})

const isNearBottom = computed(() => {
  if (!feedContainer.value) return true
  const { scrollTop, scrollHeight, clientHeight } = feedContainer.value
  return scrollHeight - scrollTop - clientHeight < 100
})

// Methods
const getMessageComponent = (type: string) => {
  return messageComponents[type] || TextMessage
}

const handleScroll = () => {
  if (!feedContainer.value) return
  
  const { scrollTop: newScrollTop, scrollHeight, clientHeight } = feedContainer.value
  scrollTop.value = newScrollTop
  
  // Проверяем необходимость загрузки дополнительных сообщений
  if (newScrollTop < 300) {
    emit('loadMore')
  }
  
  if (scrollHeight - newScrollTop - clientHeight < 300) {
    emit('loadMoreDown')
  }
  
  // Отправляем событие о видимых сообщениях
  emitVisibleMessages()
}

const handleMouseDown = (event: MouseEvent) => {
  if (!feedContainer.value) return
  
  const { offsetX, offsetY } = event
  const { clientWidth, clientHeight } = feedContainer.value
  
  isMouseScrolling.value = offsetX > clientWidth || offsetY > clientHeight
}

const handleMouseUp = () => {
  isMouseScrolling.value = false
}

const handleDoubleClick = (event: MouseEvent, message: IFeedObject) => {
  if (!props.enableDoubleClickReply) return
  
  event.preventDefault()
  
  if (message.type.includes('system') || message.type.includes('typing')) return
  
  const previewContainer = document.getElementById(`chat-input-reply-line-${chatAppId}`)
  if (previewContainer) {
    previewContainer.style.display = 'inherit'
  }
  
  setReply({
    messageId: message.messageId,
    type: message.type,
    text: message.text,
    filename: message.filename,
    url: message.url,
    header: message.header,
    callDuration: message.callDuration,
  })
  
  replyMessage.value = message
}

const handleMessageAction = (action: any) => {
  emit('messageAction', action)
}

const handleReplyClick = (messageId: string) => {
  emit('clickRepliedMessage', messageId)
}

const handleKeyboardAction = (action: any) => {
  emit('keyboardAction', action)
}

const handleResetReply = () => {
  resetReply()
  replyMessage.value = null
  
  const previewContainer = document.getElementById(`chat-input-reply-line-${chatAppId}`)
  if (previewContainer) {
    previewContainer.style.display = 'none'
  }
}

const scrollToBottom = () => {
  if (!feedContainer.value) return
  
  emit('forceScrollToBottom')
  
  nextTick(() => {
    if (feedContainer.value) {
      feedContainer.value.scrollTop = feedContainer.value.scrollHeight
    }
  })
}

const scrollToMessage = (messageId: string) => {
  if (!feedContainer.value) return
  
  const messageIndex = props.objects.findIndex(obj => obj.messageId === messageId)
  if (messageIndex === -1) return
  
  const targetScrollTop = messageIndex * props.itemHeight
  feedContainer.value.scrollTop = targetScrollTop
  
  // Добавляем подсветку сообщения
  const messageElement = document.querySelector(`[data-message-id="${messageId}"]`)
  if (messageElement) {
    messageElement.classList.add('focused-message')
    setTimeout(() => {
      messageElement.classList.remove('focused-message')
    }, 2000)
  }
}

const emitVisibleMessages = () => {
  if (!feedContainer.value) return
  
  const { scrollTop, clientHeight } = feedContainer.value
  const startIndex = Math.floor(scrollTop / props.itemHeight)
  const endIndex = Math.ceil((scrollTop + clientHeight) / props.itemHeight)
  
  for (let i = startIndex; i <= endIndex && i < props.objects.length; i++) {
    emit('messageVisible', props.objects[i])
  }
}

// Watchers
watch(() => props.scrollToBottom, (shouldScroll) => {
  if (shouldScroll) {
    scrollToBottom()
  }
}, { immediate: true })

watch(() => props.scrollTo, (messageId) => {
  if (messageId) {
    scrollToMessage(messageId)
  }
})

watch(() => props.objects, () => {
  nextTick(() => {
    // Обновляем размеры контейнера
    if (feedContainer.value) {
      containerHeight.value = feedContainer.value.clientHeight
    }
    
    // Если пользователь был внизу, прокручиваем к новым сообщениям
    if (isNearBottom.value && !isMouseScrolling.value) {
      scrollToBottom()
    }
  })
}, { flush: 'post' })

// Lifecycle
onMounted(() => {
  if (feedContainer.value) {
    containerHeight.value = feedContainer.value.clientHeight
    
    // Создаем Intersection Observer для отслеживания видимых сообщений
    intersectionObserver.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageId = entry.target.getAttribute('data-message-id')
            if (messageId) {
              emit('messageVisible', { messageId })
            }
          }
        })
      },
      {
        root: feedContainer.value,
        rootMargin: '50px',
        threshold: 0.1
      }
    )
    
    // Наблюдаем за видимыми элементами
    nextTick(() => {
      const visibleElements = feedContainer.value?.querySelectorAll('.message-feed__virtual-item')
      visibleElements?.forEach(element => {
        intersectionObserver.value?.observe(element)
      })
    })
  }
})

onUnmounted(() => {
  // Очищаем Intersection Observer
  if (intersectionObserver.value) {
    intersectionObserver.value.disconnect()
  }
})
</script>

<style scoped lang="scss">
.message-feed {
  height: 100%;
  max-height: inherit;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  background-image: url('../../../public/chat-background.svg');
  scroll-behavior: smooth;
  padding: 10px 30px 10px 30px;
  position: relative;
  
  &--empty {
    justify-content: center;
    align-items: center;
  }
  
  &__virtual-container {
    flex: 1;
    position: relative;
  }
  
  &__virtual-item {
    position: absolute;
    left: 0;
    right: 0;
  }
  
  &__message {
    position: relative;
    transition: all 0.2s ease;
  }
  
  &__typing {
    margin-top: 10px;
  }
  
  &__button-down {
    position: sticky;
    z-index: 100;
    bottom: 0;
    margin-left: auto;
    border: none;
    min-width: 46px;
    min-height: 46px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: var(--chotto-button-color-disabled);
    transition: all 0.2s ease;
    
    &:hover {
      background-color: var(--chotto-button-color-hover);
    }
  }
  
  &__keyboard {
    position: sticky;
    z-index: 100;
    bottom: 0;
    max-width: 25rem;
    width: fit-content;
    margin-left: auto;
  }
  
  &__icon-down {
    font-size: var(--chotto-button-icon-size);
    color: var(--chotto-button-color-active);
  }
  
  &__unread-amount {
    position: absolute;
    top: -8px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--chotto-additional-text-font-size);
    width: 22px;
    height: 22px;
    color: var(--chotto-unread-text-color);
    background-color: var(--chotto-unread-background-color);
    border-radius: 50%;
  }
  
  &__empty {
    text-align: center;
    color: var(--chotto-secondary-text-color);
  }
  
  &::-webkit-scrollbar {
    width: 6px;
    background-color: var(--chotto-scrollbar-bg);
  }
  
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--chotto-scrollbar-thumb-bg);
  }
  
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
}

.focused-message {
  background-color: color-mix(in srgb, var(--chotto-message-focused-color) 30%, transparent);
  box-shadow: 0px 0px 12px 2px color-mix(in srgb, var(--chotto-message-focused-color) 30%, transparent);
  animation: focus-pulse 2s ease-out;
}

@keyframes focus-pulse {
  0% {
    background-color: color-mix(in srgb, var(--chotto-message-focused-color) 50%, transparent);
  }
  100% {
    background-color: color-mix(in srgb, var(--chotto-message-focused-color) 30%, transparent);
  }
}

// Transitions
.keyboard-enter-active,
.keyboard-leave-active {
  transition: all 0.3s ease;
}

.keyboard-enter-from,
.keyboard-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.scroll-button-enter-active,
.scroll-button-leave-active {
  transition: all 0.2s ease;
}

.scroll-button-enter-from,
.scroll-button-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
</style>
