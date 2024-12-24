<template>
  <div
    class="reply__container"
    :class="componentsClassMap(message?.type)"
    @click="onReply"
  >
    <component
      :is="componentsMap(message?.type)"
      :message="message"
    ></component>
    <span
      class="pi pi-times reply__reset"
      style="font-size: 1rem"
      @click="handleReset"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import { inject } from "vue";
import { useMessage } from "../../helpers/useMessage";
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

const emit = defineEmits(['action', 'reply']);

const props = defineProps({
  message: {
    type: Object as () => IFeedObject,
  }
});

const chatAppId = inject('chatAppId')
const { resetReply } = useMessage(chatAppId as string)

const onReply = () => {
  if (props.message){
    emit('reply',props.message.messageId)
  }
}

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
    'message.image': 'grid',
    'message.file': '',
    'message.audio': 'grid',
    'message.video': 'grid',
  }
  return r[type]
}

const handleReset = () => {
  resetReply()
}

</script>

<style lang="scss">
.reply {
  &__container {
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
      background-color: var(--reply-message-before-bg);
    }
  }

  &__reset {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
  }

  &__reset:hover {
    cursor: pointer;
  }

}

.grid {
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

.chat-input-reply {
  padding-right: 20px;
  border: 1px solid var(--neutral-300);
  border-radius: 0;
  max-width: 300px;
  word-break: break-word;

  .reply__reset {
    display: inherit;
  }
}
</style>
