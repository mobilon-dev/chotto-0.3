<template>
  <div
    class="reply__container"
    :class="componentsClassMap(message?.type)"
    @click="onReply"
  >
    <component
      :is="componentsMap(message?.type)"
      :message="message"
    />
    <div class="reply__reset">
      <span
        class="pi pi-times "
        @click="emit('reset')"
      />
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import ReplyTextMessage from "../ReplyTextMessage/ReplyTextMessage.vue";
import ReplyImageMessage from "../ReplyImageMessage/ReplyImageMessage.vue";
import ReplyAudioMessage from "../ReplyAudioMessage/ReplyAudioMessage.vue";
import ReplyVideoMessage from "../ReplyVideoMessage/ReplyVideoMessage.vue";
import ReplyFileMessage from "../ReplyFileMessage/ReplyFileMessage.vue";

import {
  IFeedObject
} from '../../types';
import ReplyCallMessage from "../ReplyCallMessage/ReplyCallMessage.vue";

const emit = defineEmits(['action', 'reply', 'reset']);

const props = defineProps({
  message: {
    type: Object as () => IFeedObject,
  }
});


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
    'message.call': ReplyCallMessage,
  };
  return r[type];
}

const componentsClassMap = (type) => {
  const r = {
    'message.text': '',
    'message.image': 'grid',
    'message.file': 'grid',
    'message.audio': 'grid',
    'message.video': 'grid',
    'message.call': 'grid',
  }
  return r[type]
}


</script>

<style lang="scss">
.reply {
  &__container {
    position: relative;
    padding: 10px 6px 10px 20px;
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
      background-color: var(--chotto-message-accent-line-color);
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
  background-color: var(--chotto-message-left-secondary-bg);
}

.right {
  background-color: var(--chotto-message-right-secondary-bg);
}

.chat-input-reply {
  padding-right: 30px;
  border: 1px solid var(--chotto-item-border-color);
  border-radius: 0;
  word-break: break-word;
  margin-bottom: 0;

  .reply__reset {
    font-size: 1.1rem;
    display: flex;
    height: 100%;
    margin-right: 10px;

    span{
      margin: auto;
    }
  }
}
</style>
