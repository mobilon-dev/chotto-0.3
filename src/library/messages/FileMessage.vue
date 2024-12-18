<template>
  <div
    class="file-message"
    :class="getClass(message)"
    :messageId="message.messageId"
    @mouseleave="hideMenu"
  >
    <img
      v-if="message.avatar"
      class="file-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
      :style="{ gridRow: message.subText ? '2' : '1' }"
    >

    <p
      v-if="message.subText"
      class="file-message__subtext"
    >
      {{ message.subText }}
    </p>

    <div
      class="file-message__content"
      @mouseenter="showMenu"
    >
      <BaseReplyMessage
        v-if="message.reply"
        :message="message.reply"
        :class="message.position"
      />
        <a
          class="file-message__link"
          :href="message.url"
          download
          target="_blank"
        >
          <span class="pi pi-file" />
          <p class="file-message__filename-text">
            {{ message.filename }}
          </p>
          <div
            class="file-message__download-button"
          >
            <span class="pi pi-download" />
          </div>
        </a>
        <div
          v-if="message.text"
          class="file-message__text-container"
        >
          <p
            v-html="linkedText"
            @click="inNewWindow"
          ></p>
        </div>
      <div class="file-message__info-container">

        <div
          v-if="message.views"
          @click="viewsAction"
          class="file-message__views"
        >
          <span class="pi pi-eye" />
          <p>{{ message.views }}</p>
        </div>

        <span class="file-message__time">{{ message.time }}</span>

        <div
          v-if="getClass(message) === 'file-message__right' && statuses.includes(message.status)"
          class="file-message__status"
          :class="status"
        >
          <span
            v-if="message.status !== 'sent'"
            class="pi pi-check"
          />
          <span class="pi pi-check" />
        </div>

      </div>

      <button
        v-if="buttonMenuVisible && message.actions"
        class="file-message__menu-button"
        @click="isOpenMenu = !isOpenMenu"
      >
        <span class="pi pi-ellipsis-h" />
      </button>

      <transition>
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="file-message__context-menu"
          :actions="message.actions"
          @click="clickAction"
        />
      </transition>

    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { computed, ref, watch } from 'vue'
import linkifyStr from "linkify-string";


import { ContextMenu } from '../components'

import { getStatus, statuses } from "../../helpers";

import { IFileMessage } from '../../types'
import BaseReplyMessage from './BaseReplyMessage.vue'

// Define props
const props = defineProps({
  message: {
    type: Object as () => IFileMessage,
    required: true,
  },
});

const emit = defineEmits(['action']);

const isOpenMenu = ref(false)
const buttonMenuVisible = ref(false);
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

const viewsAction = () => {
  emit('action', { messageId: props.message.messageId, type: 'views' });
}

const clickAction = () => { }

const showMenu = () => {
  buttonMenuVisible.value = true;
};

const hideMenu = () => {
  buttonMenuVisible.value = false;
  isOpenMenu.value = false
};

const status = computed(() => getStatus(props.message.status))

function getClass(message) {
  return message.position === 'left' ? 'file-message__left' : 'file-message__right';
}

</script>

<style
  scoped
  lang="scss"
>
.file-message {

  &__content {
    position: relative;
    width: fit-content;
    border-radius: 14px;
    background-color: var(--file-message-background-color);
    padding: 10px 30px 4px 16px;
    max-width: 25rem;
  }

  &__avatar {
    align-self: center;
    object-fit: cover;
    min-width: var(--avatar-width-small);
    min-height: var(--avatar-height-small);
    border-radius: var(--avatar-border-radius);
  }

  &__subtext {
    font-size: 12px;
    color: var(--base-message-subtext-color);
    font-weight: 500;
  }

  &__text-container {
    margin-top: 6px;
    word-wrap: break-word;

    p {
      white-space: pre-wrap;
      font-size: var(--base-message-font-size-text);
    }
  }

  &__link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 12px;

    span {
      font-size: var(--icon-font-size-medium);
      color: var(--file-message-icon-color);
    }
  }

  &__filename-text {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-right: 40px;
    font-size: var(--base-message-font-size-text);
    color: var(--file-message-text-color);
  }

  &__info-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 2px;
  }

  &__download-button {
    margin-bottom: 5px;
    border: none;
    border-radius: 12px;
    background-color: transparent;
    padding: 0;
    cursor: pointer;

    span {
      color: var(--audio-message-download-button);
      font-weight: 600;
      font-size: 12px;
    }
  }

  &__status {
    display: flex;

    span {
      color: var(--base-message-status-color-received);
      font-size: var(--base-message-status-font-size);
      font-weight: 400;
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

    .file-message__avatar {
      grid-column: 1;
      grid-row: 2;
      margin-right: 12px;
    }

    .file-message__subtext {
      grid-column: 2;
      grid-row: 1;
      margin: 0 0 2px 10px;
    }

    .file-message__content {
      /*grid-column: 2;*/
      background-color: var(--base-message-left-bg);
    }

    .file-message__menu-button {
      top: 50%;
      right: -40px;
    }

    .file-message__context-menu {
      top: 50%;
      left: 100%;
      margin-top: 20px;
    }

  }

  &__right {
    grid-template-columns: 1fr min-content;

    .file-message__avatar {
      grid-column: 2;
      grid-row: 2;
      margin-left: 12px;
    }

    .file-message__subtext {
      grid-column: 1;
      grid-row: 1;
      margin: 0 10px 2px auto;
    }

    .file-message__content {
      grid-column: 1;
      margin-left: auto;
      background-color: var(--base-message-right-bg);
    }

    .file-message__menu-button {
      top: 50%;
      left: -40px;
    }

    .file-message__context-menu {
      top: 50%;
      right: 100%;
      margin-top: 20px;
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
