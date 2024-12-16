<template>
  <div
    class="reply-container" 
    :class="componentsClassMap(message?.type)"
  >
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

const componentsClassMap = (type) => {
  const r = {
    'message.text': '',
    'message.image': 'reply-container-grid',
    'message.file': '',
    'message.audio': 'reply-container-grid',
    'message.video': 'reply-container-grid',
  }
  return r[type]
}

</script>

<style lang="scss">

.reply-container {
  position: relative;
  padding: 10px 6px 10px 12px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 6px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #07cf9c;
  }
}

.reply-container-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  padding: 6px 10px 6px 10px;
}

.left {
  background-color: var(--reply-message-left-bg);
}

.right {
  background-color: var(--reply-message-right-bg);
}

.chat-input-reply{
  border: 1px solid var(--neutral-300);
  border-radius: 0;
}
</style>
