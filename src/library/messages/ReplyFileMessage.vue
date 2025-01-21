<template>
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

</script>

<style
  scoped
  lang="scss"
>

.file-message {

  &__text {
    margin: 0;
    margin-top: 6px;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: var(--reply-message-text-font-size);
    color: var(--reply-message-color);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    line-clamp: 5;
    -webkit-box-orient: vertical;
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
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-right: 40px;
    font-size: var(--reply-message-text-font-size);
    color: var(--reply-message-color);
  }
}

</style>
