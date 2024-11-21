<template>
  <div
    class="image-message"
    :class="getClass(message)"
    :messageId="message.messageId"
    @mouseleave="hideMenu"
  >
    <img
      v-if="message.avatar"
      class="image-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
      :style="{ gridRow: message.subText ? '2' : '1' }"
    >

    <p
      v-if="message.subText"
      class="image-message__subtext"
    >
      {{ message.subText }}
    </p>

    <div
      class="image-message__content"
      @mouseenter="showMenu"
    >
      <button
        class="image-message__button"
        @click="isOpen = true"
      >
        <img
          class="image-message__preview-image"
          :src="message.url"
          :alt="message.alt"
        >
        <div class="image-message__info-container">
          <div
            v-if="message.views"
            class="image-message__views"
          >
            <span class="pi pi-eye" />
            <p>{{ message.views }}</p>
          </div>

          <span class="image-message__time">{{ message.time }}</span>

          <div
            v-if="getClass(message) === 'image-message__right' && statuses.includes(message.status)"
            class="image-message__status"
            :class="status"
          >
            <span
              v-if="message.status !== 'sent'"
              class="pi pi-check"
            />
            <span class="pi pi-check" />
          </div>
        </div>
      </button>


      <Teleport to="body">
        <transition name="modal-fade">
          <div
            v-if="isOpen"
            class="image-message__modal-overlay"
          >
            <div class="image-message__modal">
              <button
                class="image-message__modal-close-button"
                @click="isOpen = false"
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

      <button
        v-if="buttonMenuVisible && message.actions"
        class="image-message__menu-button"
        @click="isOpenMenu = !isOpenMenu"
      >
        <span class="pi pi-ellipsis-h" />
      </button>

      <transition name="context-menu">
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="image-message__context-menu"
          :actions="message.actions"
          @click="clickAction"
        />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import ContextMenu from '../components/ContextMenu.vue'

import { getStatus, statuses } from "../../helpers";

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const isOpen = ref(false);

const isOpenMenu = ref(false)
const buttonMenuVisible = ref(false);

const showMenu = () => {
  buttonMenuVisible.value = true;
};

const hideMenu = () => {
  buttonMenuVisible.value = false;
  isOpenMenu.value = false
};

const status = computed(() => getStatus(props.message.status))

function getClass(message) {
  return message.position === 'left' ? 'image-message__left' : 'image-message__right';
}
</script>

<style
  scoped
  lang="scss"
>
.image-message {
  &__avatar {
    align-self: center;
    object-fit: cover;
    min-width: var(--avatar-width-small);
    min-height: var(--avatar-height-small);
    border-radius: var(--avatar-border-radius);
  }

  &__info-container {
    position: absolute;
    bottom: 8px;
    right: 8px;
    display: flex;
    align-items: center;
    column-gap: 8px;
    border-radius: 12px;
    padding: 6px 10px;
    background-color: rgb(0 0 0 / 39%);
  }

  &__views {
    display: flex;
    align-items: center;
    column-gap: 4px;

    span {
      font-size: var(--base-message-views-icon-font-size);
      color: var(--neutral-200);
    }

    p {
      font-size: var(--base-message-views-font-size);
      color: var(--neutral-200);
    }
  }

  &__time {
    color: var(--neutral-200);
    font-size: var(--base-message-font-size-time);
  }

  &__status {
    display: flex;

    span {
      font-weight: 400;
      color: var(--default-white);
      font-size: var(--base-message-status-font-size);
    }
  }

  .status--received {
    span {
      color: var(--default-white);

      &:first-child {
        margin-right: -8px;
      }
    }
  }

  .status--read {
    span {
      color: var(--base-message-status-color-read);

      &:first-child {
        margin-right: -8px;
      }
    }
  }

  &__subtext {
    font-weight: 500;
    font-size: 12px;
    color: var(--base-message-subtext-color);
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
    background-color: var(--modal-bg);
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

  &__content {
    position: relative;
    max-width: 40%;
  }


  &__menu-button {
    position: absolute;
    background-color: transparent;
    border: none;
    transform: translateY(-50%);
    cursor: pointer;
    transition: 0.2s;

    span {
      color: var(--neutral-500);
      font-size: 20px;
    }

    &:hover span {
      color: var(--neutral-700);
      transition: 0.2s;
    }
  }

  &__context-menu {
    position: absolute;
  }

  &__left,
  &__right {
    display: grid;
    margin: 0 0 7px 0;
  }

  &__left {
    grid-template-columns: min-content 1fr;

    .image-message__avatar {
      grid-column: 1;
      grid-row: 2;
      margin-right: 12px;
    }

    .image-message__subtext {
      grid-column: 2;
      grid-row: 1;
      margin: 0 0 2px 10px;
    }

    .image-message__content {
      grid-column: 2;
    }

    .image-message__menu-button {
      top: 50%;
      right: -40px;
    }

    .image-message__context-menu {
      top: 56%;
      left: 100%;
    }
  }

  &__right {
    grid-template-columns: 1fr min-content;

    .image-message__avatar {
      grid-column: 2;
      grid-row: 2;
      margin-left: 12px;
    }

    .image-message__subtext {
      grid-column: 1;
      grid-row: 1;
      margin: 0 10px 2px auto;
    }

    .image-message__content {
      grid-column: 1;
      margin-left: auto;
    }

    .image-message__menu-button {
      top: 50%;
      left: -40px;
    }

    .image-message__context-menu {
      top: 56%;
      right: 100%;
    }
  }
}

.context-menu-enter-active {
  transition: all 0.1s ease-out;
}

.context-menu-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.context-menu-enter-from,
.context-menu-leave-to {
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
