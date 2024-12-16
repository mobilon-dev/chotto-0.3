<template>
  <div
    class="text-message__reply-container"
    @click="onReply"
  >
    <p
      v-html="linkedText"
      @click="inNewWindow"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, watch } from 'vue'
import linkifyStr from "linkify-string";

import { ITextMessage } from '../../types';

// Define props
const props = defineProps({
  message: {
    type: Object as () => ITextMessage,
    required: true,
  },
});

const emit = defineEmits(['action', 'reply']);

const linkedText = ref('')

watch(
  () => props.message.text,
  () => {
    linkedText.value = linkifyStr(props.message.text)
  },
  { immediate: true }
)

function inNewWindow(event) {
  event.preventDefault()
  if (event.target.href)
    window.open(event.target.href, '_blank');
}

const onReply = () => {
  emit('reply', props.message.messageId)
}

</script>

<style
  scoped
  lang="scss"
>
.text-message {

  &__reply-container {
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

    p {
      font-size: 13px;
      color: var(--replay-message-color);
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.left {
    .text-message__reply-container {
      background-color: var(--replay-message-left-bg);
    }
  }

.right {
  .text-message__reply-container {
    background-color: var(--replay-message-right-bg);
  }
}

</style>
