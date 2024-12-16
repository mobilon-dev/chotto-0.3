<template>
  <div
    class="video-message__reply-container"
    @click="onReply"
  >
    <div
      class="video-message__preview-button"
      @click="isOpenModal = true"
    >
      <video
        class="video-message__video"
        :src="message.url"
        :muted="true"
      />
    </div>

    <div class="video-message__text-container">
      <div class="video-message__reply-description">
        <span class="pi pi-video"></span>
        <p>Видео</p>
      </div>
      <p
        v-if="message.text"
        v-html="linkedText"
        @click="inNewWindow"
      ></p>
    </div>
    <Teleport to="body">
      <transition name="modal-fade">
        <div
          v-if="isOpenModal"
          class="video-message__modal-overlay"
          @click="closeModalOutside"
        >
          <div class="video-message__modal">
            <button
              class="video-message__modal-close-button"
              @click="closeModal"
            >
              <span>
                <i class="pi pi-times" />
              </span>
            </button>
            <video
              ref="player"
              class="video-message__modal-video"
              :src="message.url"
              :alt="message.alt"
              controls
              autoplay
            />
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import linkifyStr from "linkify-string";

import { IVideoMessage } from '../../types';

const props = defineProps({
  message: {
    type: Object as () => IVideoMessage,
    required: true,
  },
});

const emit = defineEmits(['action', 'reply']);

const player = ref<HTMLVideoElement | null>();
const isOpenModal = ref(false);
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

const closeModal = () => isOpenModal.value = false

const closeModalOutside = (evt) => {
  if (evt.target.classList.contains('video-message__modal-overlay')) {
    closeModal()
  }
}

const handleEscKey = (evt) => {
  if (evt.key === 'Escape' && isOpenModal.value) {
    closeModal()
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey);
});
</script>

<style
  scoped
  lang="scss"
>
.video-message {
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

  &__video {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    object-fit: cover;
    cursor: zoom-in;
  }

  &__preview-button {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  &__text-container {
    word-wrap: break-word;
    align-content: center;
    max-width: 25rem;

    p {
      font-size: 13px;
      color: var(--replay-message-color);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
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

  &__modal-video {
    width: 100%;
    height: 100%;
    max-height: 60%;
    object-fit: cover;
    border-radius: 5px;
    max-height: 80vh;
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
    max-width: 45%;
    box-shadow: var(--modal-overlay-shadow);
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
  .video-message__reply-container {
    background-color: var(--replay-message-left-bg);
  }
}

.right {
  .video-message__reply-container {
    background-color: var(--replay-message-right-bg);
  }
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
