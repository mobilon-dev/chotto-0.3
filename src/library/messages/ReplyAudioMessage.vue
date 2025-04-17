<template>
  <div
    v-show="!isPlaying"
    class="audio-message__play"
  >
    <span class="pi pi-play" />
  </div>
  <div class="audio-message__text-container">
    <div class="audio-message__reply-description">
      <span class="pi pi-microphone"></span>
      <p>Аудиосообщение</p>
    </div>
    <p
      v-if="message.text"
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

  &__modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
    color: var(--chotto-primary-text-color);
    background-color: var(--chotto-modal-bg);
    border-radius: var(--chotto-modal-border-radius);
    padding: var(--chotto-modal-padding);
    max-width: 30%;
    box-shadow: var(--chotto-modal-overlay-shadow);

    p {
      margin: 0;
      font-size: 20px;
    }
  }

  &__modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--chotto-modal-mask-background);
    z-index: 1000;
  }

  &__modal-close-button {
    display: block;
    background-color: transparent;
    border: none;
    padding: 4px;
    margin: 0 0 14px auto;
    cursor: pointer;

    span {
      color: var(--chotto-secondary-text-color);
      font-size: var(--chotto-button-icon-size);
    }
  }
}

.v-enter-active {
  transition: all 0.1s ease-out;
}

.v-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: scale(0.9);
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}
</style>
