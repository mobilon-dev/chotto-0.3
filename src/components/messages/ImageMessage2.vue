<template>

  <div class="image-message">
    <div class="image-message__container">
      <button class="image-message__button" @click="isOpen = true">
        <img class="image-message__preview-image" :src="message.url" :alt="message.alt" />
        <span class="image-message__time"> {{ message.time }}</span>
      </button>

      <Teleport to="body">
        <transition name="modal-fade">
          <div v-if="isOpen" class="image-message__modal-overlay">
            <div class="image-message__modal">
              <button class="image-message__modal-close-button" @click="isOpen = false">
                <span>
                  <i class="pi pi-times"></i>
                </span>
              </button>
              <img class="image-message__modal-image" :src="message.url" :alt="message.alt" />
            </div>
          </div>
        </transition>
      </Teleport>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isOpen = ref(false);
    return {
      isOpen
    };
  },
};

function getClass(message) {
  return message.position === 'left' ? '' : '';
}

</script>

<style scoped lang="scss">
.image-message {
  &__container {
    position: relative;
    margin: var(--image-message-margin);
    max-width: var(--image-message-max-width);
  }

  &__time {
    position: absolute;
    bottom: 8px;
    right: 8px;
    color: var(--neutral-900);
    font-size: var(--time-message-font-size);
  }

  &__button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
  }

  &__preview-image {
    width: 100%;
    border-radius: 5px;
  }

  &__modal-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  &__modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
    background-color: var(--modal-background-color);
    border-radius: var(--modal-border-radius);
    padding: var(--modal-padding);
    width: var(--modal-width);
    box-shadow: var(--modal-overlay-shadow);
  }

  &__modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--modal-mask-background);
    z-index: 100;
  }

  &__modal-close-button {
    display: block;
    background-color: transparent;
    border: none;
    padding: 4px;
    margin: 0 0 14px auto;
    cursor: pointer;

    span {
      color: var(--icon-color);
      font-size: var(--icon-font-size-medium);
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


.dark {
  .image-message {
    &__time {
      color: var(--neutral-200);
    }

    &__modal {
      background-color: var(--d-modal-background-color);
      border: 1px solid var(--neutral-500);
    }

    &__modal-close-button {

      span {
        color: var(--d-icon-color);
      }
    }
  }
}
</style>
