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

    <div class="video-message__content">
      <BaseReplyMessage
        style="margin: 10px 10px 4px 16px;"
        :class="message.position"
        v-if="message.reply"
        :message="message.reply"
      />
      <div
        class="video-message__preview-button"
        @click="isOpenModal = true"
        @mouseenter="showMenu"
        @mouseleave="buttonDownloadVisible = !buttonDownloadVisible"
      >
        <video
          ref="previewPlayer"
          class="video-message__video"
          :style="{ borderRadius: videoBorderRadius }"
          @ended="playAgain"
          :src="message.url"
          :muted="true"
          autoplay
        />

        <transition name="modal-fade">
          <div
            v-if="buttonDownloadVisible"
            class="video-message__info-container"
          >
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
        </transition>


        <transition name="modal-fade">
          <a
            v-if="buttonDownloadVisible"
            @click.stop="() => '//Предотвращаем всплытие события клика'"
            class="video-message__download-button"
            :href="message.url"
            download
            target="_blank"
          >
            <span class="pi pi-download" />
          </a>
        </transition>
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

      <div
        v-if="message.text"
        class="video-message__text-container"
      >
        <p
          v-html="linkedText"
          @click="inNewWindow"
        ></p>
      </div>
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
import BaseReplyMessage from './BaseReplyMessage.vue'

const props = defineProps({
  message: {
    type: Object as () => IVideoMessage,
    required: true,
  },
});

const emit = defineEmits(['action']);

function getClass(message) {
  return message.position === 'left' ? 'video-message__left' : 'video-message__right';
}

const player = ref<HTMLVideoElement | null>();
const previewPlayer = ref<HTMLVideoElement | null>();
// const isPlaying = ref(false);
// const audioDuration = ref(0);
// const currentTime = ref(0)

const isOpenModal = ref(false);
const isOpenMenu = ref(false)
const buttonMenuVisible = ref(false);
const buttonDownloadVisible = ref(false)
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
  buttonDownloadVisible.value = true
};

const hideMenu = () => {
  buttonMenuVisible.value = false;
  isOpenMenu.value = false
};

const status = computed(() => getStatus(props.message.status))

const playAgain = () => {
  if (previewPlayer.value) {
    previewPlayer.value.currentTime = 0;
    previewPlayer.value.play();
  }
};


watch([player, previewPlayer], ([playerVal, previewVal]) => {
  if (playerVal) {
    if (previewVal) {
      previewVal.pause();
      previewVal.currentTime = 0;
    }
  } else if (previewVal) {
    previewVal.play();
    previewVal.currentTime = 0;
  }
});

const videoBorderRadius = computed(() => {
  if(props.message.reply && props.message.text) return '0'
  if(props.message.text) return '8px 8px 0 0'
  if(props.message.reply) return '0 0 8px 8px'
  return '8px'
})

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
    border-radius: 14px;
  }

  &__info-container {
    position: absolute;
    bottom: 4px;
    right: 8px;
    display: flex;
    align-items: center;
    column-gap: 4px;
    border-radius: 12px;
    padding: 6px 10px;
    background-color: rgb(0 0 0 / 39%);
  }

  &__download-button {
    position: absolute;
    left: 8px;
    bottom: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 12px;
    padding: 6px 6px;
    background-color: rgb(0 0 0 / 39%);
    cursor: pointer;

    span {
      color: var(--neutral-200);
      font-size: 12px;
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

  &__avatar {
    grid-row: 1 / -1;
    align-self: end;
    margin-bottom: 6px;
    object-fit: cover;
    min-width: var(--avatar-width-small);
    min-height: var(--avatar-height-small);
    border-radius: var(--avatar-border-radius);
  }

  &__video {
    object-fit: cover;
    width: 100%;
    max-height: 500px;
    cursor: zoom-in;
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
    padding: 6px 10px 6px 10px;
    border-radius: 0 0 8px 8px;
    word-wrap: break-word;
    max-width: 25rem;

    p {
      white-space: pre-wrap;
      font-size: var(--base-message-font-size-text);
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

    .video-message__text-container {
      grid-column: 2;
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

    .video-message__text-container {
      grid-column: 1;
      margin-left: auto;
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
