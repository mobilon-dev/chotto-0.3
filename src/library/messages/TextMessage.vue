<template>
  <div class="text-message">
    <div
      :class="getClass(message)"
      :messageId="message.messageId"
      @mouseleave="hideMenu"
    >
      <img
        v-if="message.avatar"
        class="text-message__avatar"
        :src="message.avatar"
        height="32"
        width="32"
        :style="{ gridRow: message.subText ? '2' : '1' }"
      >

      <p
        v-if="message.subText"
        class="text-message__subtext"
      >
        {{ message.subText }}
      </p>

      <div
        class="text-message__content"
        @mouseenter="showMenu"
      >
        <p class="text-message__text">
          {{ message.text }}
        </p>
        <div class="text-message__info-container">
          <div
            v-if="message.views"
            class="text-message__views"
            @click="viewsAction"
          >
            <span class="pi pi-eye" />
            <p>{{ message.views }}</p>
          </div>
          <span
            v-if="message.time"
            class="text-message__time"
          >{{ message.time }}</span>
          <div
            v-if="getClass(message) === 'text-message__right' && statuses.includes(message.status)"
            class="text-message__status"
            :class="status"
          >
            <span
              v-if="message.status !== 'send'"
              class="pi pi-check"
            />
            <span class="pi pi-check" />
          </div>
        </div>

        <button
          v-if="buttonMenuVisible && message.actions"
          class="text-message__menu-button"
          @click="isOpenMenu = !isOpenMenu"
        >
          <span class="pi pi-ellipsis-h" />
        </button>

        <transition>
          <ContextMenu
            v-if="isOpenMenu && message.actions"
            class="text-message__context-menu"
            :actions="message.actions"
            @click="clickAction"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import ContextMenu from '../components/ContextMenu.vue'

import { getStatus, statuses } from "../../helpers";

// Define props
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['action']);

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

const clickAction = (action) => {
  hideMenu();
  emit('action', { messageId: props.message.messageId, type: 'menu', ...action });
}

const viewsAction = () => {
  hideMenu();
  emit('action', { messageId: props.message.messageId, type: 'views' });
}

function getClass(message) {
  return message.position === 'left' ? 'text-message__left' : 'text-message__right';
}
</script>

<style
  scoped
  lang="scss"
>
.text-message {

  &__content {
    position: relative;
    word-wrap: break-word;
    width: fit-content;
    max-width: 40%;
    border-radius: 14px;
    padding: 10px 10px 4px 16px;
  }

  &__info-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 6px;
    background-color: var(--message-background-color);
  }

  &__views {
    display: flex;
    align-items: center;
    column-gap: 4px;

    span {
      font-size: var(--base-message-views-icon-font-size);
      color: var(--base-message-color-views);
    }

    p {
      font-size: var(--base-message-views-font-size);
      color: var(--base-message-color-views);
    }
  }

  &__time {
    font-size: var(--base-message-font-size-time);
    color: var(--base-message-color-time);
  }

  &__status {
    display: flex;

    span {
      font-weight: 400;
      color: var(--base-message-status-color-received);
      font-size: var(--base-message-status-font-size);
    }
  }

  .status--received {
    span {
      color: var(--base-message-status-color-received);

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

  &__text {
    font-size: var(--base-message-font-size-text);
    white-space: pre-wrap;
  }

  &__subtext {
    font-size: 12px;
    font-weight: 500;
    color: var(--base-message-subtext-color);
  }

  &__avatar {
    align-self: center;
    object-fit: cover;
    min-width: var(--avatar-width-small);
    min-height: var(--avatar-height-small);
    border-radius: var(--avatar-border-radius);
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
    margin: var(--base-message-margin);
  }

  &__left {
    grid-template-columns: min-content 1fr;

    .text-message__avatar {
      grid-column: 1;
      grid-row: 2;
      margin-right: 12px;
    }

    .text-message__subtext {
      grid-column: 2;
      grid-row: 1;
      margin: 0 0 2px 10px;
    }

    .text-message__content {
      grid-column: 2;
      background-color: var(--base-message-left-bg);
    }

    .text-message__menu-button {
      top: 50%;
      right: -40px;
    }

    .text-message__context-menu {
      top: 56%;
      left: 100%;
    }
  }

  &__right {
    grid-template-columns: 1fr min-content;

    .text-message__avatar {
      grid-column: 2;
      grid-row: 2;
      margin-left: 12px;
    }

    .text-message__subtext {
      grid-column: 1;
      grid-row: 1;
      margin: 0 10px 2px auto;
    }

    .text-message__content {
      grid-column: 1;
      margin-left: auto;
      background-color: var(--base-message-right-bg);
    }

    .text-message__menu-button {
      top: 50%;
      left: -40px;
    }

    .text-message__context-menu {
      top: 56%;
      right: 100%;
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
</style>
