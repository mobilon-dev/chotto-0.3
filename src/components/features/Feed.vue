<template>
  <div class="message-feed" ref="refFeed">
    <component
      v-for="object in objects"
      :key="object.messageId"
      :is="componentsMap(object.type)"
      :message="object"
    />
  </div>
</template>

<script setup>
import {ref, unref, watch, nextTick, onMounted} from 'vue';

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

function scrollToFeedBottom () {
  nextTick(function(){
    const element = unref(refFeed);
    element.scrollTop = element.scrollHeight;
  })
}

watch(() => props.objects, scrollToFeedBottom);
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
