<template>
  <div
    class="image-message__reply-container"
    @click="onReply"
  >
    <div
      class="image-message__preview-button"
      @click="isOpenModal = true"
    >
      <img
        class="image-message__preview-image"
        :src="message.url"
        :alt="message.alt"
      >
    </div>

    <div class="image-message__text-container">
      <div class="image-message__reply-description">
        <span class="pi pi-camera"></span>
        <p>Фотография</p>
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
          class="image-message__modal-overlay"
          @click="closeModalOutside"
        >
          <div class="image-message__modal">
            <button
              class="image-message__modal-close-button"
              @click="closeModal"
            >
              <span>
                <i class="pi pi-times" />
              </span>
            </button>
            <img
              class="image-message__modal-image"
              :src="message.url"
              :alt="message.alt"
            >
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
import { ref, watch, onMounted, onUnmounted } from 'vue';
import linkifyStr from "linkify-string";

import { IImageMessage } from '../../types';

const props = defineProps({
  message: {
    type: Object as () => IImageMessage,
    required: true,
  },
});

const emit = defineEmits(['action', 'reply']);

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
  if (evt.target.classList.contains('image-message__modal-overlay')) {
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
.image-message {

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


  &__preview-button {
    grid-column: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0;

  }

  &__preview-image {
    width: 60px;
    height: 60px;
    cursor: zoom-in;
    object-fit: cover;
    border-radius: 4px;
  }

  &__modal-image {
    width: 100%;
    height: 100%;
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
}

.left {
    .image-message__reply-container {
      background-color: var(--replay-message-left-bg);
    }
  }

.right {
  .image-message__reply-container {
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
