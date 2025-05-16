<template>
  <div
    v-show="!isPlaying"
    class="audio-message__play"
  >
    <span class="pi pi-play" />
  </div>
  <div class="audio-message__text-container">
    <p v-if="message.header">{{ message.header }}</p>
    <div class="audio-message__reply-description">
      <span class="pi pi-microphone"></span>
      <p>Аудиосообщение</p>
    </div>
    <p
      v-if="message.text"
      class="audio-message__text"
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

import { IAudioMessage } from '../../types';

// Define props
const props = defineProps({
  message: {
    type: Object as () => IAudioMessage,
    required: true,
  },
});

const isPlaying = ref(false);

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
  font-size: var(--chotto-additional-text-font-size);
  color: var(--chotto-secondary-text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
}

.audio-message {

  &__play {
    border: none;
    position: relative;
    align-self: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: var(--chotto-message-type-icon-bg-color);

    span {
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: var(--chotto-button-icon-size);
      color: var(--chotto-message-type-icon-color);
    }
  }

  &__text-container {
    align-content: center;
    word-break: break-word;
  }

  &__text{
    margin-top: 8px;
    font-size: var(--chotto-text-font-size);
    color: var(--chotto-primary-text-color);
  }

  &__reply-description {
    display: flex;
    align-items: center;
    column-gap: 6px;
    margin-bottom: 4px;

    span {
      color: var(--chotto-secondary-text-color);
    }
  }

}
</style>
