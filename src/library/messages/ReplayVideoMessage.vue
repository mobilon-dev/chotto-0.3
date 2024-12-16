<template>
  <div
    class="video-message"
    :class="getClass(message)"
    :messageId="message.messageId"
    @mouseleave="hideMenu"
  >

    <img
      v-if="message.avatar"
      class="video-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
    >

    <p
      v-if="message.subText"
      class="video-message__subtext"
    >
      {{ message.subText }}
    </p>

    <div
      class="video-message__content"
      @mouseenter="showMenu"
    >

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
      </div>

      <p
        v-if="message.reply?.text"
        class="video-message__reply-text"
      >{{ message.reply.text }}</p>

      <div class="video-message__info-container">
        <div
          v-if="message.views"
          @click.stop="viewsAction"
          class="video-message__views"
        >
          <span class="pi pi-eye" />
          <p>{{ message.views }}</p>
        </div>

        <span class="video-message__time">{{ message.time }}</span>

        <div
          v-if="getClass(message) === 'video-message__right' && statuses.includes(message.status)"
          class="video-message__status"
          :class="status"
        >
          <span
            v-if="message.status !== 'sent'"
            class="pi pi-check"
          />
          <span class="pi pi-check" />
        </div>
      </div>

      <transition name="modal-fade">
        <button
          v-if="buttonMenuVisible && message.actions"
          class="video-message__menu-button"
          @click="isOpenMenu = !isOpenMenu"
        >
          <span class="pi pi-ellipsis-h" />
        </button>
      </transition>


      <transition name="context-menu">
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="video-message__context-menu"
          :actions="message.actions"
          @click="clickAction"
        />
      </transition>
    </div>

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

</template>

<script
  setup
  lang="ts"
>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import linkifyStr from "linkify-string";

import { ContextMenu } from '../components'
import { getStatus, statuses } from "../../helpers";
import { IVideoMessage } from '../../types';

const props = defineProps({
  message: {
    type: Object as () => IVideoMessage,
    required: true,
  },
});

const emit = defineEmits(['action', 'reply']);

function getClass(message) {
  return message.position === 'left' ? 'video-message__left' : 'video-message__right';
}

const player = ref<HTMLVideoElement | null>();
const isOpenModal = ref(false);
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

const onReply = () => {
  emit('reply', props.message.messageId)
}

const showMenu = () => {
  buttonMenuVisible.value = true;
};

const hideMenu = () => {
  buttonMenuVisible.value = false;
  isOpenMenu.value = false
};

const status = computed(() => getStatus(props.message.status))

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
  &__content {
    position: relative;
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

  &__info-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 2px;
    padding: 0 2px 0 8px;
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

  &__avatar {
    grid-row: 1 / -1;
    align-self: end;
    margin-bottom: 6px;
    object-fit: cover;
    min-width: var(--avatar-width-small);
    min-height: var(--avatar-height-small);
    border-radius: var(--avatar-border-radius);
  }

  &__controls {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }

  &__play {
    background-color: transparent;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 0;
    width: 100%;
    height: 100%;


    span {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.67);
      width: 40px;
      height: 40px;
      font-size: var(--icon-font-size-medium);
      color: var(--neutral-100);
    }
  }

  &__pause {
    background-color: transparent;
    border: none;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    cursor: pointer;
    padding: 0;
  }

  &__video {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    object-fit: cover;
    cursor: zoom-in;
  }

  &__remaining-time {
    position: absolute;
    left: 8px;
    bottom: 4px;
    border-radius: 12px;
    padding: 6px 10px;
    background-color: rgb(0 0 0 / 39%);
    color: var(--neutral-200);
    font-size: var(--base-message-font-size-remaining-time);
  }

  &__time {
    font-size: var(--base-message-font-size-time);
  }

  &__subtext {
    font-weight: 500;
    font-size: 12px;
    color: var(--base-message-subtext-color);
  }

  &__preview-button {
    position: relative;
    display: flex;
    flex-direction: column;
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
    max-width: 25rem;

    p {
      font-size: 13px;
      color: var(--replay-message-color);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
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

  &__left,
  &__right {
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    margin: var(--base-message-margin);
  }

  &__left {
    grid-template-columns: min-content 1fr;

    .video-message__avatar {
      grid-column: 1;
      margin-right: 12px;
    }

    .video-message__subtext {
      grid-column: 2;
      grid-row: 1;
      margin: 0 0 2px 10px;
    }

    .video-message__content {
      grid-column: 2;
      background-color: var(--base-message-left-bg);
    }

    .video-message__reply-container {
      background-color: var(--replay-message-left-bg);
    }

    .video-message__menu-button {
      top: 50%;
      right: -40px;
    }

    .video-message__context-menu {
      top: 50%;
      left: 100%;
      margin-top: 20px;
    }
  }

  &__right {
    grid-template-columns: 1fr min-content;

    .video-message__avatar {
      grid-column: 2;
      margin-left: 12px;
    }

    .video-message__subtext {
      grid-column: 1;
      grid-row: 1;
      margin: 0 10px 2px auto;
    }

    .video-message__content {
      grid-column: 1;
      margin-left: auto;
      background-color: var(--base-message-right-bg);
    }

    .video-message__reply-container {
      background-color: var(--replay-message-right-bg);
    }

    .video-message__menu-button {
      top: 50%;
      left: -40px;
    }

    .video-message__context-menu {
      top: 50%;
      right: 100%;
      margin-top: 20px;
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
