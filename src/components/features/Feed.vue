<template>
  <div class="message-feed" ref="refFeed">
    <component
      v-for="message in messages"
      :key="message.messageId"
      :is="componentsMap(message.type)"
      :message="message"
    />
  </div>
</template>

<script setup>
import {ref, unref, watch, nextTick} from 'vue';

import FileMessage from "../messages/FileMessage.vue";
import ImageMessage from "../messages/ImageMessage.vue";
import TextMessage from "../messages/TextMessage.vue";
import DateMessage from '../messages/DateMessage.vue';

const refFeed = ref(null);

// Define props
const props = defineProps({
  messages: {
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
    'system.date': DateMessage,
  };
  return r[type];
}

function scrollToFeedBottom () {
  nextTick(function(){
    const element = unref(refFeed);
    element.scrollTop = element.scrollHeight;
  })
}

watch(() => props.messages, scrollToFeedBottom);
</script>

<style scoped>
.message-feed {
  flex: 1;
  max-height: 600px;
  height: 500px;
  max-width: 800px;
  overflow: auto;
  display: flex;
  flex-direction: column; /* Сообщения располагаются сверху вниз */
  gap: 5px; /* Отступ между сообщениями */
}
</style>
