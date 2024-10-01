<template>
  <div class="message-feed" ref="refFeed">
    <div class="message-feed__container">
      <component v-for="object in objects" :key="object.messageId" :is="componentsMap(object.type)" :message="object" />
    </div>
  </div>
</template>

<script setup>
import { ref, unref, watch, nextTick, onUpdated } from 'vue';

import FileMessage from "../messages/FileMessage.vue";
import ImageMessage from "../messages/ImageMessage2.vue";
import TextMessage from "../messages/TextMessage.vue";
import DateMessage from '../messages/DateMessage.vue';
import AudioMessage from '../messages/AudioMessage.vue';

const refFeed = ref(null);

// Define props
const props = defineProps({
  objects: {
    type: Array,
    required: true,
  },
});

// Register components
const componentsMap = (type) => {
  const r = {
    'message.text': TextMessage,
    'message.image': ImageMessage,
    'message.file': FileMessage,
    'message.audio': AudioMessage,
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

</script>

<style scoped lang="scss">
.message-feed {
  height: fit-content;
  margin-top: auto;
  padding: 0 80px 50px 80px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
    background-color: var(--neutral-50);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--neutral-300);
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
}

.dark {
  .message-feed {
    &::-webkit-scrollbar {
      background-color: var(--neutral-500);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--neutral-200);
    }
  }
}
</style>
