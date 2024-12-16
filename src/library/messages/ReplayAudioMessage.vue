<template>
  <div
    class="audio-message__reply-container"
    @click="onReply"
  >
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

const emit = defineEmits(['action', 'reply']);

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

const onReply = () => {
  emit('reply', props.message.messageId)
}
</script>

<style
  scoped
  lang="scss"
>
.audio-message {

  &__reply-container {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 10px;
    border-radius: 10px;
    padding: 6px 10px 6px 10px;
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

  &__play {
    border: none;
    position: relative;
    align-self: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: var(--neutral-400);

    span {
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: var(--icon-font-size-medium);
      color: var(--audio-message-button-icon-color);
    }
  }

  &__text-container {
    word-wrap: break-word;
    align-content: center;

    p {
      font-size: 13px;
      color: var(--replay-message-color);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  &__reply-description {
    display: flex;
    align-items: center;
    column-gap: 6px;
    margin-bottom: 4px;

    span {
      color: var(--replay-message-color);
    }
  }

  &__modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
    background-color: var(--modal-bg);
    border-radius: var(--modal-border-radius);
    padding: var(--modal-padding);
    max-width: 30%;
    box-shadow: var(--modal-overlay-shadow);

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
    background-color: var(--modal-mask-background);
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
      color: var(--modal-icon-color);
      font-size: var(--icon-font-size-medium);
    }
  }
}

.left {
  .audio-message__reply-container {
    background-color: var(--replay-message-left-bg);
  }
}

.right {
  .audio-message__reply-container {
    background-color: var(--replay-message-right-bg);
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
