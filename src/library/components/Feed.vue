<template>
  <div
    ref="refFeed"
    class="message-feed"
    @scroll="scrollTopCheck()"
    :id="'feed-container-' + chatAppId"
  >
    <div
      v-for="object in objects"
      @dblclick="feedObjectDoubleClick($event,object)"
      :id="JSON.stringify(object)"
      class="tracking-message"
    >
        <component
          :is="componentsMap(object.type)"
          :key="object.messageId"
          class="message-feed__message"
          :message="object"
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
  </div>
  <teleport
    v-if="getMessage().reply"
    :to="'#chat-input-reply-line-'+chatAppId"
  >
    <BaseReplyMessage
      :message="getMessage().reply"
      class="chat-input-reply"
    />
  </teleport>
</template>

<script
  setup
  lang="ts"
>
import { ref, unref, watch, nextTick, onUpdated, inject, computed } from 'vue';
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
} from "../messages";

import { IFeedObject, IFeedTyping, IFeedUnreadButton } from '../../types';

import { useMessage } from '../../helpers/useMessage';
import BaseReplyMessage from '../messages/BaseReplyMessage.vue';

const trackingObjects = ref();
const refFeed = ref();
const isShowButton = ref(false)

const props = defineProps({
  objects: {
    type: Array as () => IFeedObject[],
    required: true,
  },
  buttonParams: {
    type: Object as () => IFeedUnreadButton,
    required: false,
  },
  // при новом сообщении необходимо прокручивать ленту вниз,
  // а при загрузке более ранних сообщений - нет
  isScrollToBottomOnUpdateObjectsEnabled: {
    type: Boolean,
    required: true,
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
  }
});

const chatAppId = inject('chatAppId')
const { setReply, getMessage } = useMessage(chatAppId as string)
const emit = defineEmits([
  'messageAction',
  'loadMore', 
  'loadMoreDown',
  'messageVisible', 
  'clickRepliedMessage',
  'forceScrollToBottom',
]);

const scrollTopCheck = (allowLoadMore: boolean = true) => {
  const element = unref(refFeed);
  const limit = 100;
  const scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;

  // Проверяем, что scrollBottom меньше заданного порога
  if (scrollBottom < limit) {
    isShowButton.value = false;
  } else {
    isShowButton.value = true;
  }

  if (element.scrollTop === 0 && allowLoadMore) {
    emit('loadMore');
  }
  if (scrollBottom === 0 && allowLoadMore){
    emit('loadMoreDown')
  }
};

// Register components
const componentsMap = (type) => {

  const r = {
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

function scrollToBottom() {
  if (props.isScrollToBottomOnUpdateObjectsEnabled) {
    nextTick(function () {
      const element = unref(refFeed);
      element.scrollTop = element.scrollHeight;
    })
  }
}

function scrollToBottomForce() {
  emit('forceScrollToBottom')
  nextTick(function () {
    const element = unref(refFeed);
    element.scrollTop = element.scrollHeight;
  })
}

onUpdated(() => scrollToBottom);
//watch(() => props.objects, scrollToBottom);

const messageAction = (message) => {
  emit('messageAction', message);
}

const handleClickReplied = (messageId) => {
  emit('clickRepliedMessage', messageId)
}

const feedObjectDoubleClick = (event: MouseEvent,object : IFeedObject) => {
  if (props.enableDoubleClickReply){
    event?.preventDefault()
    if (object.type.indexOf('system') == -1 && object.type.indexOf('typing') == -1)
      setReply({
        messageId: object.messageId,
        type: object.type,
        text: object.text,
        filename: object.filename,
        url: object.url,
      })
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
  () => {
    nextTick(() => {
      scrollTopCheck(false)
      trackingObjects.value = document.querySelectorAll('.tracking-message')
      trackingObjects.value.forEach((obj) => observer.observe(obj))
    })
  },
  { immediate: true })

watch(
  () => props.scrollTo,
  () => {
    if (props.scrollTo){
      const elem = props.scrollTo
      document.getElementById(elem)?.scrollIntoView({
        block: 'center',
        inline: 'center'
      })
      document.getElementById(elem)?.children[0].classList.add('focused-message')
      setTimeout(() => {
        document.getElementById(elem)?.children[0].classList.remove('focused-message')
      }, 2000)
      
    }
  }
)

</script>

<style
  scoped
  lang="scss"
>
.message-feed {
  height: 100%;
  max-height: inherit;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-image: url('../../../public/chat-background.svg');
  scroll-behavior: smooth;
  padding: 10px 30px 10px 30px;

  &__message {
    position: relative;
    transition: all 2s;
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
    background-color: var(--feed-button-down-bg);
  }

  &__icon-down {
    font-size: var(--icon-font-size-medium);
    color: var(--feed-button-down-icon-color);
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
    font-size: 12px;
    width: 22px;
    height: 22px;
    color: var(--feed-button-down-uread-color);
    background-color: var(--feed-button-down-uread-bg);
    border-radius: 50%;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background-color: var(--scrollbar-bg);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--scrollbar-thumb-bg);
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
}

.focused-message {
    
    background-color: rgba(168, 243, 134, 0.5);
    box-shadow: 0px 0px 12px 2px rgba(168, 243, 134, 0.5);

  }

.v-enter-active {
  transition: all 0.1s ease-out;
}

.v-leave-active {
  transition: all 0.1s;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
