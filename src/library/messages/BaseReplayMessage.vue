<template>
  <div class="replay-text">
    <component
      :is="componentName"
      :message="selectedMessage"
    ></component>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue'

import {
  ReplayTextMessage,
  ReplayImageMessage,
  ReplayAudioMessage,
  ReplayVideoMessage,
  ReplayFileMessage,
} from "../messages";

import {
  IAudioMessage,
  IFileMessage,
  IImageMessage,
  ITextMessage,
  IVideoMessage
} from '../../types';

const props = defineProps({
  audioMessage: {
    type: Object as () => IAudioMessage,
    required: false,
  },
  videoMessage: {
    type: Object as () => IVideoMessage,
    required: false,
  },
  fileMessage: {
    type: Object as () => IFileMessage,
    required: false,
  },
  imageMessage: {
    type: Object as () => IImageMessage,
    required: false,
  },
  textMessage: {
    type: Object as () => ITextMessage,
    required: false,
  },
});

const componentName = computed(() => {
  if (props.textMessage) return ReplayTextMessage;
  if (props.imageMessage) return ReplayImageMessage;
  if (props.fileMessage) return ReplayFileMessage;
  if (props.audioMessage) return ReplayAudioMessage;
  if (props.videoMessage) return ReplayVideoMessage;
  return null;
});

const selectedMessage = computed(() => {
  if (props.textMessage) return props.textMessage;
  if (props.imageMessage) return props.imageMessage;
  if (props.fileMessage) return props.fileMessage;
  if (props.audioMessage) return props.audioMessage;
  if (props.videoMessage) return props.videoMessage;
  return null;
});
</script>

<style lang="scss"></style>
