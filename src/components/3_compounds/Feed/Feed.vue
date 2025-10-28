<template>
  <div
    v-if="objects.length > 0 || typing"
    :id="'feed-container-' + chatAppId"
    ref="refFeed"
    class="message-feed"
    :style="{ backgroundImage: `url(${defaultBackground})` }"
    @scroll="throttledScrollTopCheck()"
    @mousedown="startScrollWatch"
    @mouseup="stopScrollWatch"
  >
    <transition>
      <DateMessageSticky
        v-if="showStickyDate"
        class="message-feed__sticky-date"
        :text="stickyDateText"
      />
    </transition>
    <div
      v-for="(object, index) in groupedObjects"
      :id="JSON.stringify(object)"
      :key="`${object.messageId ?? 'mid'}-${index}`"
      :class="['tracking-message', { 'new-message': object.isNewMessage }]"
      @dblclick="feedObjectDoubleClick($event,object)"
    >
      <component
        :is="componentsMap(object.type)"
        :key="`${object.messageId ?? 'mid'}-${index}`"
        class="message-feed__message"
        :message="object"
        :apply-style="applyStyle"
        :is-first-in-series="object.isFirstInSeries"
        @action="messageAction"
        @reply="handleClickReplied"
      />
    </div>
    <typing-message
      v-if="typing"
      :message="{
        subText: (typing as IFeedTyping).title,
        avatar: (typing as IFeedTyping).avatar,
      }"
    />
    <Transition>
      <MessageKeyboard
        v-if="showKeyboard"
        ref="keyboardRef"
        class="message-feed__keyboard"
        :keyboard="objects[objects.length - 1].keyboard!"
        :align="keyboardAlign"
        @action="keyboardAction"
      />
    </Transition>
    
    <transition>
      <button
        v-if="isShowButton"
        class="message-feed__button-down"
        @click="scrollToBottomForce"
      >
        <div
          v-if="buttonParams"
          class="message-feed__unread-amount"
        >
          {{ buttonParams.unreadAmount }}
        </div>
        <span class="pi pi-angle-down message-feed__icon-down" />
      </button>
    </transition>
    <FeedKeyboard
      v-if="feedKeyboards && feedKeyboards.length > 0"
      :buttons="feedKeyboards"
      :align="feedKeyboardAlign"
      @action="feedKeyboardAction"
    />
  </div>
  <div 
    v-else
    ref="refFeed"
    class="message-feed"
  >
    <div style="margin: auto;">
      <slot name="empty-feed" />
    </div>
  </div>
  <teleport
    v-if="getMessage().reply"
    :to="'#chat-input-reply-line-'+chatAppId"
  >
    <BaseReplyMessage
      class="chat-input-reply"
      :message="getMessage().reply"
      @reset="handleResetReply"
    />
  </teleport>
</template>

<script
  setup
  lang="ts"
>
import { ref, watch, nextTick, inject, computed, onMounted } from 'vue';
import { 
  AudioMessage, 
  CallMessage, 
  FileMessage, 
  ImageMessage, 
  TextMessage, 
  VideoMessage,
  DateMessage,
  DateMessageSticky,
  SystemMessage,
  TypingMessage,
  BaseReplyMessage,
  MessageKeyboard,
  FeedKeyboard
} from '@/components';

import { IFeedObject, IFeedTyping, IFeedUnreadButton, IFeedKeyboard } from '@/types';
import { useMessage } from '@/hooks';
import { useStickyDate, useFeedScroll, useFeedButton, useFeedGrouping, useFeedLoadMore } from './composables';
import { throttle } from './functions/throttle';

import chatBackgroundRaw from './assets/chat-background.svg?raw';

const props = defineProps({
  objects: {
    type: Array <IFeedObject>,
    required: true,
  },
  buttonParams: {
    type: Object as () => IFeedUnreadButton,
    required: false,
    default: undefined,
  },
  // принудительный скролл вниз по событию извне (сообщение, смена чата)
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
  scrollTo:{
    type: String,
    default: null,
  },
  applyStyle: {
    type: Function,
    default: () => {return null}
  },
  keyboardAlign: {
    type: String as () => 'left' | 'center' | 'right',
    default: 'right',
    validator: (value: string) => ['left', 'center', 'right'].includes(value)
  },
  feedKeyboards: {
    type: Array as () => IFeedKeyboard[],
    required: false,
    default: undefined
  },
  feedKeyboardAlign: {
    type: String as () => 'left' | 'center' | 'right',
    default: 'right',
    validator: (value: string) => ['left', 'center', 'right'].includes(value)
  },
  chatBackground: {
    type: String,
    default: undefined
  },
  isLoadingMore: {
    type: Boolean,
    default: false
  }
});

const trackingObjects = ref();
const refFeed = ref();
const keyboardRef = ref();

const {
  isShowButton,
  isKeyboardPlace,
  checkButtonVisibility,
} = useFeedButton({
  feedRef: refFeed,
  keyboardRef,
})

// Функция для определения новых сообщений
const isNewMessage = (index: number) => {
  return props.isLoadingMore && 
    newMessagesCount.value > 0 && 
    index < newMessagesCount.value
}

// Инициализация логики группировки
const { groupedObjects } = useFeedGrouping({
  objects: computed(() => props.objects),
  isNewMessage,
})

// Инициализация логики подгрузки сообщений
const {
  allowLoadMoreTop,
  allowLoadMoreBottom,
  topLoadJustHappened,
  checkScrollPosition,
  restoreScrollPosition,
  startScrollWatch,
  stopScrollWatch,
} = useFeedLoadMore({
  feedRef: refFeed,
})

const newMessagesCount = ref(0)
const previousObjectsLength = ref(0)

const chatAppId = inject('chatAppId')
const { setReply, getMessage, resetReply } = useMessage(chatAppId as string)

// Инициализация логики sticky date
const {
  showStickyDate,
  stickyDateText,
  show: showStickyDateComponent
} = useStickyDate({
  feedRef: refFeed,
  trackingObjects
})

// Инициализация логики скролла
const {
  isInitialized,
  performScrollToBottom,
  ensureScrollToBottom,
  initializeScroll,
  smoothScrollToBottom,
} = useFeedScroll({
  feedRef: refFeed,
  objectsRef: computed(() => props.objects),
  scrollToBottomRef: computed(() => props.scrollToBottom),
})

const emit = defineEmits([
  'messageAction',
  'loadMore', 
  'loadMoreDown',
  'messageVisible', 
  'clickRepliedMessage',
  'forceScrollToBottom',
  'keyboardAction',
  'feedAction'
]);

const defaultBackground = computed(() => {
  return props.chatBackground ?? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;
});

const showKeyboard = computed(() => {
  if (isKeyboardPlace.value && props.objects.length > 0 && props.objects[props.objects.length - 1].keyboard)
    return true
  else return false
})

const keyboardAction = (action: string | (() => void)) => {
  emit('keyboardAction', action)
}

const feedKeyboardAction = (action: string | (() => void)) => {
  emit('feedAction', action);
}

function scrollTopCheck (allowLoadMore: boolean = true) {
  // обновляем видимость кнопки и положение клавиатуры через композабл
  checkButtonVisibility();
  // делегируем вычисления подгрузки в композабл
  checkScrollPosition(allowLoadMore);
  // Показываем sticky date
  showStickyDateComponent();
};

watch(
  () => [allowLoadMoreBottom.value, allowLoadMoreTop.value],
  () => {
    if (!allowLoadMoreBottom.value) emit('loadMoreDown')
    if (!allowLoadMoreTop.value) emit('loadMore')
  }
)

watch(
  () => props.isLoadingMore,
  (newValue, oldValue) => {

    if (oldValue === false && newValue === true) {
      previousObjectsLength.value = props.objects.length;
      newMessagesCount.value = 0;
    }
    
    if (oldValue === true && newValue === false) {
      // Восстановление позиции скролла делегировано в композабл
      restoreScrollPosition(0)

      nextTick(() => {

        const currentObjects = props.objects;
        if (currentObjects && currentObjects.length > previousObjectsLength.value) {
          const addedCount = currentObjects.length - previousObjectsLength.value;
          
          newMessagesCount.value = addedCount;
          
          nextTick(() => {
            const allMessages = document.querySelectorAll('.tracking-message');
            const firstMessages = Array.from(allMessages).slice(0, addedCount);
            firstMessages.forEach((msg) => {
              msg.classList.add('new-message');
            });
          });
          

          setTimeout(() => {
            let newMessages = document.querySelectorAll('.tracking-message.new-message');
            
            if (newMessages.length === 0) {
              const allMessages = document.querySelectorAll('.tracking-message');
              const firstMessages = Array.from(allMessages).slice(0, addedCount);
              
              if (firstMessages.length > 0) {
                firstMessages.forEach((msg) => {
                  msg.classList.add('new-message');
                });
                
                if (topLoadJustHappened.value) {
                  return;
                }
                firstMessages.forEach((msg, index) => {
                  setTimeout(() => {
                    msg.classList.add('animate');
                  }, index * 150);
                });
                
                setTimeout(() => {
                  firstMessages.forEach((msg) => {
                    msg.classList.remove('new-message', 'animate');
                  });
                  newMessagesCount.value = 0;
                }, addedCount * 150 + 1500);
                
                return; 
              }
            }
            
            
            if (newMessages.length > 0) {
              if (topLoadJustHappened.value) {
                return;
              }
              newMessages.forEach((msg, index) => {
                setTimeout(() => {
                  msg.classList.add('animate');
                }, index * 150);
              });
              
              setTimeout(() => {
                newMessages.forEach((msg) => {
                  msg.classList.remove('new-message', 'animate');
                });
                newMessagesCount.value = 0;
              }, addedCount * 150 + 1500);
            } else {
              newMessagesCount.value = 0;
            }
          }, 50);
        }
      });
    }
  }
)

// обработчики перенесены в useFeedLoadMore

const throttledScrollTopCheck = throttle(() => scrollTopCheck(), 250)

// Register components
const componentsMap = (type: string) => {

  const r: Record<string, unknown> = {
    'message.text': TextMessage,
    'message.image': ImageMessage,
    'message.file': FileMessage,
    'message.audio': AudioMessage,
    'message.video': VideoMessage,
    'message.call': CallMessage,
    'message.system': SystemMessage,
    'system.date': DateMessage,
    'message.typing': TypingMessage
  };
  return r[type];
}

function scrollToBottomForce() {
  emit('forceScrollToBottom')
  // Для кнопки "вниз" используем плавный скролл
  smoothScrollToBottom()
}

// наблюдение за props.scrollToBottom перенесено в useFeedScroll

const messageAction = (message: IFeedObject) => {
  emit('messageAction', message);
}

const handleClickReplied = (messageId: string) => {
  emit('clickRepliedMessage', messageId)
}

const feedObjectDoubleClick = (event: MouseEvent,object : IFeedObject) => {
  if (props.enableDoubleClickReply){
    event?.preventDefault()
    if (object.type.indexOf('system') == -1 && object.type.indexOf('typing') == -1){
      const previewContainer = document.getElementById('chat-input-reply-line-'+chatAppId)
      if (previewContainer){
        previewContainer.style.display = 'inherit'
      }
      setReply({
        messageId: object.messageId,
        type: object.type,
        text: object.text,
        filename: object.filename,
        url: object.url,
        header: object.header,
        callDuration: object.callDuration,
      })
    }
  }
}

const handleResetReply = () => {
  resetReply()
  const previewContainer = document.getElementById('chat-input-reply-line-'+chatAppId)
  if (previewContainer){
    previewContainer.style.display = 'none'
  }
}

const callback = (entries: Array<IntersectionObserverEntry>) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      emit('messageVisible', JSON.parse(entry.target.id))
    }
  })
}

const options = {
  root: document.getElementById('feed-container-' + chatAppId),
  rootMargin: '5px',
  threshold: 0,
}

const observer = new IntersectionObserver(callback, options)

watch(
  () => props.objects,
  (newObjects, oldObjects) => {
    nextTick(() => {
      // Инициализируем скролл при первой загрузке объектов
      if (!isInitialized.value && newObjects.length > 0) {
        initializeScroll();
      }

      if (oldObjects && newObjects.length > oldObjects.length) {
        const addedCount = newObjects.length - oldObjects.length;
        
        setTimeout(() => {

          if (props.isLoadingMore) {
            newMessagesCount.value = addedCount;
            previousObjectsLength.value = oldObjects.length;
            
            setTimeout(() => {
              const newMessages = document.querySelectorAll('.tracking-message.new-message');
              console.log('📱 Найдено новых сообщений для анимации:', newMessages.length);
              
              newMessages.forEach((msg, index) => {
                setTimeout(() => {
                  msg.classList.add('animate');
                  console.log(`✨ Анимация запущена для сообщения ${index + 1}`);
                }, index * 150);
              });
              
              setTimeout(() => {
                newMessages.forEach((msg) => {
                  msg.classList.remove('new-message', 'animate');
                });
                newMessagesCount.value = 0;
                
              }, addedCount * 150 + 1500);
            }, 50); 
          }
        }, 10); 
      }
      
      allowLoadMoreTop.value = true
      allowLoadMoreBottom.value = true
      // Проверяем позицию без авто-триггера подгрузки, чтобы избежать цепной загрузки
      scrollTopCheck(false)

      trackingObjects.value = document.querySelectorAll('.tracking-message')
      trackingObjects.value.forEach((obj: Element) => observer.observe(obj))
      
    })
  },
  { immediate: true })

watch(
  () => props.scrollTo,
  () => {
    if (props.scrollTo){
      const elem = props.scrollTo
      let target = document.getElementById(elem)
      let list = document.getElementById('feed-container-' + chatAppId)
      if (target instanceof HTMLElement && list instanceof HTMLElement)
        list.scrollTop = target.offsetTop + target.clientHeight / 2 - list.clientHeight / 2
      document.getElementById(elem)?.children[0].classList.add('focused-message')
      setTimeout(() => {
        document.getElementById(elem)?.children[0].classList.remove('focused-message')
      }, 2000)
      
    }
  }
)


// watcher для инициализации при монтировании
onMounted(() => {
  nextTick(() => {
    if (props.objects.length > 0 && !isInitialized.value) {
      initializeScroll();
    }
    
    // Наблюдатель за изменениями размера контента
    const resizeObserver = new ResizeObserver(() => {
      if (props.scrollToBottom) {
        // При изменении размера окна принудительно скроллим вниз
        performScrollToBottom();
        setTimeout(() => {
          ensureScrollToBottom();
        }, 200);
        // Дополнительная проверка для медленных чатов
        setTimeout(() => {
          ensureScrollToBottom();
        }, 800);
      }
    });
    
    if (refFeed.value) {
      resizeObserver.observe(refFeed.value);
    }
  });
});

</script>

<style scoped lang="scss">
@use './styles/Feed.scss';
</style>
