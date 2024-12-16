<template>
  <div class="reply-text">
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
  ReplyTextMessage,
  ReplyImageMessage,
  ReplyAudioMessage,
  ReplyVideoMessage,
  ReplyFileMessage,
} from ".";

import {
  IFeedObject
} from '../../types';

defineProps({
  message: {
    type: Object as () => IFeedObject,
  }
});

const componentsMap = (type) => {
const r = {
  'message.text': ReplyTextMessage,
  'message.image': ReplyImageMessage,
  'message.file': ReplyFileMessage,
  'message.audio': ReplyAudioMessage,
  'message.video': ReplyVideoMessage,
};
return r[type];
}

</script>

<style lang="scss"></style>
