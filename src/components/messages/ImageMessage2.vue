<template>

  <div class="image-message">
    <div class="image-message__container">
      <button class="image-message__button" @click="isOpen = true">
        <img class="image-message__preview-image" :src="message.url" :alt="message.alt" />
        <span class="image-message__time">22:02</span>
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


  <!-- <div class="message-container" :class="{ 'sent': message.isSent, 'received': !message.isSent }">
    <div class="message-content" v-if="!showPreview">
      <img :src="message.url" @click="showPreview = true" alt="Изображение" class="chat-image">
    </div>
    <div v-else class="preview-container">
      <img :src="message.url" alt="Изображение" class="preview-image">
      <br/>
      <button @click="showPreview = false">Закрыть</button>
    </div>
    <div class="message-info">
      <div class="message-status" v-if="message.isSent">
        <span v-if="message.isRead" class="status read">✓</span>
        <span v-else-if="message.isDelivered" class="status delivered">✓</span>
        <span v-else class="status sending">...</span>
      </div>
      <div class="message-time">
        {{ message.time }}
      </div>
    </div>
  </div> -->
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
    /*
    imageSrc: {
      type: String,
      required: true,
    },
    isSent: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    timestamp: {
      type: Number, 
      required: true,
    },
    */
  },
  setup(props) {
    const isOpen = ref(false);
    return {
      isOpen
    };
  },
};
</script>

<style scoped lang="scss">
.image-message {
  &__container {
    position: relative;
    margin-bottom: var(--image-message-margin);
    max-width: var(--image-message-max-width);
  }

  &__time {
    font-size: 12px;
    position: absolute;
    bottom: 8px;
    right: 8px;
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

/* .message-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 10px;
}

.message-container.sent {
  background-color: #e0f2f7;
  color: #333;
  margin-left: auto;
}

.message-container.received {
  background-color: #f5f5f5;
  color: #000;
  margin-right: auto;
}

.message-content {
  margin-right: 10px;
}

.chat-image {
  max-width: 200px;
  max-height: 150px;
  cursor: pointer;
}

.preview-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  z-index: 100;
}

.preview-image {
  max-width: 80%;
  max-height: 80vh;
}

.message-info {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.message-status {
  font-size: 12px;
}

.status {
  margin-left: 5px;
}

.status.read {
  color: #34a853;
}

.status.delivered {
  color: #333;
}

.status.sending {
  color: #777;
}


.message-time {
  font-size: 12px;
  color: #777;
  margin-left: 10px;
} */
</style>
