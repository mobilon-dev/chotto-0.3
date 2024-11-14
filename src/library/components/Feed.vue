<template>
  <div
    ref="refFeed"
    class="message-feed"
    @scroll="scrollTopCheck"
  >
    <div class="message-feed__container">
      <component
        :is="componentsMap(object.type)"
        v-for="object in objects"
        :key="object.messageId"
        class="message-feed__message"
        :message="object"
        @action="messageAction"
      />
    </div>
    <transition>
      <button
        v-if="isShowButton"
        class="message-feed__button-down"
        @click="scrollToFeedBottom"
      >
        <span class="pi pi-angle-down" />
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, unref, watch, nextTick, onUpdated, onMounted } from 'vue';

import FileMessage from "../messages/FileMessage.vue";
import ImageMessage from "../messages/ImageMessage.vue";
import TextMessage from "../messages/TextMessage.vue";
import DateMessage from '../messages/DateMessage.vue';
import AudioMessage from '../messages/AudioMessage.vue';
import VideoMessage from '../messages/VideoMessage.vue'
import CallMessage from '../messages/CallMessage.vue'
import SystemMessage from '../messages/SystemMessage.vue'

const refFeed = ref();
const initialScroll = ref(0)
const isShowButton = ref(false)

// Define props
const props = defineProps({
  objects: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['messageAction', 'loadMore']);



const scrollTopCheck = () => {
  const element = unref(refFeed);
  const limit = 100;
  const scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;

  // Проверяем, что scrollBottom меньше заданного порога
  if (scrollBottom < limit) {
    isShowButton.value = false;
  } else {
    isShowButton.value = true;
  }

  if (element.scrollTop === 0) {
    emit('loadMore');
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
  };
  return r[type];
}

function scrollToFeedBottom() {
  nextTick(function () {
    const element = unref(refFeed);
    element.scrollTop = element.scrollHeight;
  })
}

onUpdated(() => scrollToFeedBottom);
watch(() => props.objects, scrollToFeedBottom);

const messageAction = (message) => {
  emit('messageAction', message);
}


</script>

<style
  scoped
  lang="scss"
>
.message-feed {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-image: url('../../../public/chat-background.svg');
  scroll-behavior: smooth;
  padding: 0 30px 10px 30px;

  &__container {
    margin-top: auto;
    padding: 0 30px;
  }

  &__message {
    position: relative;
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

    span {
      font-size: var(--icon-font-size-medium);
      color: var(--icon-color);
    }
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
