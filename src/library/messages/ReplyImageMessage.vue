<template>
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
    background-color: var(--chotto-modal-bg);
    border-radius: var(--chotto-modal-border-radius);
    padding: var(--chotto-modal-padding);
    max-width: 45%;
    box-shadow: var(--chotto-modal-overlay-shadow);
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


  &__text-container {
    word-wrap: break-word;
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
    white-space: nowrap;
    span {
      color: var(--chotto-secondary-text-color);
    }
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
