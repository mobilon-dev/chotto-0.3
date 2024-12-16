<template>
  <div
    class="file-message__reply-container"
    @click="onReply"
  >
    <a
      class="file-message__link"
      :href="message.url"
      download
      target="_blank"
    >
      <span class="pi pi-file" />
      <p class="file-message__filename-text">
        {{ message.filename }}
      </p>
    </a>
    <p
      class="file-message__text"
      v-if="message?.text"
    >{{ message.text }}</p>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, watch } from 'vue'
import linkifyStr from "linkify-string";

import { IFileMessage } from '../../types'

// Define props
const props = defineProps({
  message: {
    type: Object as () => IFileMessage,
    required: true,
  },
});

const emit = defineEmits(['action', 'reply']);

const linkedText = ref('')

watch(
  () => props.message.text,
  () => {
    if (props.message.text) {
      linkedText.value = linkifyStr(props.message.text)
    }
  },
  { immediate: true }
)

const onReply = () => {
  emit('reply', props.message.messageId)
}

</script>

<style
  scoped
  lang="scss"
>
.file-message {

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
  }

  &__text {
    margin-top: 6px;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 13px;
    color: var(--reply-message-color);
  }

  &__link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 13px;

    span {
      font-size: var(--icon-font-size-medium);
      color: var(--file-message-icon-color);
    }
  }

  &__filename-text {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-right: 40px;
    font-size: 13px;
    color: var(--reply-message-color);
  }
}

.left {
    .file-message__reply-container {
      background-color: var(--reply-message-left-bg);
    }
  }

.right {
  .file-message__reply-container {
    background-color: var(--reply-message-right-bg);
  }
}

</style>
