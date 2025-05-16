<template>
  <a
    class="file-message__link"
    :href="message.url"
    download
    target="_blank"
  >
    <span class="pi pi-file" />
  </a>

  <div>
<p v-if="message.header">{{ message.header }}</p>
  <a
    class="file-message__link"
    :href="message.url"
    download
    target="_blank"
  >
    
    <p class="file-message__filename-text">
      {{ message.filename }}
    </p>
  </a>
  <p
    v-if="message.text"
    class="file-message__text"
    v-html="linkedText"
    @click="inNewWindow"
  ></p>
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

function inNewWindow(event) {
  event.preventDefault()
  if (event.target.href)
    window.open(event.target.href, '_blank');
}


</script>

<style
  scoped
  lang="scss"
>

p {
  margin: 0;
  margin-top: 6px;
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: var(--chotto-additional-text-font-size);
  color: var(--chotto-secondary-text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
}

.file-message {

  &__text {
    margin-top: 8px;
    font-size: var(--chotto-text-font-size);
    color: var(--chotto-primary-text-color);
  }

  &__link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 13px;

    span {
      color: var(--chotto-secondary-text-color);
      font-size: var(--chotto-button-icon-size);
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
    font-size: var(--chotto-additional-text-font-size);
    color: var(--chotto-secondary-text-color);
    text-decoration: underline;
  }
}

</style>
