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
  message: {
    type: Object as () => IFeedObject,
  }
});

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

</script>

<style lang="scss"></style>
