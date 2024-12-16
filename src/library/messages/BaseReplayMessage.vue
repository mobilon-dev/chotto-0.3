<template>
  <div class="replay-text">
    <component
      :is="componentsMap(message?.type)"
      :message="message"
    ></component>
  </div>
</template>

<script
  setup
  lang="ts"
>
import {
  ReplayTextMessage,
  ReplayImageMessage,
  ReplayAudioMessage,
  ReplayVideoMessage,
  ReplayFileMessage,
} from "../messages";

import {
  IFeedObject
} from '../../types';

defineProps({
  /*
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
  */
  message: {
    type: Object as () => IFeedObject,
  }
});
/*
const componentName = computed(() => {
  console.log(props.message)
  if (props.textMessage) return ReplayTextMessage;
  if (props.imageMessage) return ReplayImageMessage;
  if (props.fileMessage) return ReplayFileMessage;
  if (props.audioMessage) return ReplayAudioMessage;
  if (props.videoMessage) return ReplayVideoMessage;
  return null;
});
*/
const componentsMap = (type) => {
const r = {
  'message.text': ReplayTextMessage,
  'message.image': ReplayImageMessage,
  'message.file': ReplayFileMessage,
  'message.audio': ReplayAudioMessage,
  'message.video': ReplayVideoMessage,
};
return r[type];
}
/*
const selectedMessage = computed(() => {
  if (props.textMessage) return props.textMessage;
  if (props.imageMessage) return props.imageMessage;
  if (props.fileMessage) return props.fileMessage;
  if (props.audioMessage) return props.audioMessage;
  if (props.videoMessage) return props.videoMessage;
  return null;
});
*/
</script>

<style lang="scss"></style>
