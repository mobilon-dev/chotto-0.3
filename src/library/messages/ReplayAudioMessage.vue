<template>
  <div
    class="audio-message"
    :class="getClass(message)"
    :messageId="message.messageId"
    @mouseleave="hideMenu"
  >
    <img
      v-if="message.avatar"
      class="audio-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
      :style="{ gridRow: message.subText ? '2' : '1' }"
    >

    <p
      v-if="message.subText"
      class="audio-message__subtext"
    >
      {{ message.subText }}
    </p>

    <div
      class="audio-message__content"
      @mouseenter="showMenu"
    >
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

      <p
        v-if="message.reply?.text"
        class="audio-message__reply-text"
      >{{ message.reply.text }}</p>

      <div class="audio-message__info-container">
        <div
          v-if="message.views"
          @click="viewsAction"
          class="audio-message__views"
        >
          <span class="pi pi-eye" />
          <p>{{ message.views }}</p>
        </div>

        <span class="audio-message__time">{{ message.time }}</span>
        <div
          v-if="getClass(message) === 'audio-message__right' && statuses.includes(message.status)"
          class="audio-message__status"
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
        class="audio-message__menu-button"
        @click="isOpenMenu = !isOpenMenu"
      >
        <span class="pi pi-ellipsis-h" />
      </button>

      <transition>
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="audio-message__context-menu"
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
import { ref, onMounted, computed, watch } from 'vue'
import linkifyStr from "linkify-string";

import { ContextMenu } from '../components'
import { getStatus, statuses } from "../../helpers";
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

const showMenu = () => {
  buttonMenuVisible.value = true;
};

const hideMenu = () => {
  buttonMenuVisible.value = false;
  isOpenMenu.value = false
};

const viewsAction = () => {
  emit('action', { messageId: props.message.messageId, type: 'views' });
}

const status = computed(() => getStatus(props.message.status))

const clickAction = () => { }

const onReply = () => {
  emit('reply', props.message.messageId)
}

function getClass(message) {
  return message.position === 'left' ? 'audio-message__left' : 'audio-message__right';
}
</script>

<style
  scoped
  lang="scss"
>
.audio-message {

  &__content {
    position: relative;
    width: 100%;
    max-width: 25rem;
    padding: 8px 8px 4px 8px;
    border-radius: 14px;
  }

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

  &__info-container {
    grid-column: 1 / 3;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 4px;
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
      color: var(--neutral-200);
    }

    p {
      font-size: var(--base-message-views-font-size);
      color: var(--neutral-200);
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

  &__left,
  &__right {
    display: grid;
    margin: var(--base-message-margin);
  }

  &__left {
    grid-template-columns: min-content 1fr;

    .audio-message__avatar {
      grid-column: 1;
      grid-row: 2;
      margin-right: 12px;
    }

    .audio-message__subtext {
      grid-column: 2;
      grid-row: 1;
      margin: 0 0 2px 10px;
    }

    .audio-message__content {
      grid-column: 2;
      background-color: var(--base-message-left-bg);
    }

    .audio-message__reply-container {
      background-color: var(--replay-message-left-bg);
    }

    .audio-message__menu-button {
      top: 50%;
      right: -40px;
    }

    .audio-message__context-menu {
      top: 50%;
      left: 100%;
      margin-top: 20px;
    }
  }

  &__right {
    grid-template-columns: 1fr min-content;

    .audio-message__avatar {
      grid-column: 2;
      grid-row: 2;
      margin-left: 12px;
    }

    .audio-message__subtext {
      grid-column: 1;
      grid-row: 1;
      margin: 0 10px 2px auto;
    }

    .audio-message__content {
      grid-column: 1;
      margin-left: auto;
      background-color: var(--base-message-right-bg);
    }

    .audio-message__reply-container {
      background-color: var(--replay-message-right-bg);
    }

    .audio-message__menu-button {
      top: 50%;
      left: -40px;
    }

    .audio-message__context-menu {
      top: 50%;
      right: 100%;
      margin-top: 20px;
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
