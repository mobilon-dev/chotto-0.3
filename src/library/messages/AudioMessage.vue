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
      <BaseReplyMessage
        v-if="message.reply"
        style="grid-column: 1/3;"
        :message="message.reply"
        :class="message.position"
        @reply="handleClickReplied"
      />
      <div class="audio-message__audio-container">
        <audio
          ref="player"
          :src="message.url"
        />
        <button
          v-show="!isPlaying"
          class="audio-message__play"
          @click="togglePlayPause"
        >
          <span class="pi pi-play" />
        </button>
        <button
          v-show="isPlaying"
          class="audio-message__pause"
          @click="togglePlayPause"
        >
          <span class="pi pi-pause" />
        </button>
        <div class="audio-message__progress-bar-container">
          <div
            class="audio-message__progress-bar"
            :style="{ width: progressPercent + '%' }"
          />
        </div>
        <p class="audio-message__remaining-time">
          {{ `${formatCurrentTime} / ${formatDuration}` }}
        </p>
        <a
          class="audio-message__download-button"
          @click.stop="() => '//Предотвращаем всплытие события клика'"
          :href="message.url"
          download
          target="_blank"
        >
          <span class="pi pi-download" />
        </a>
      </div>

      <div
        v-if="message.transcript?.text"
        class="audio-message__transcript-container"
      >
        <p @click="isFullTranscript = !isFullTranscript">{{ message.transcript.text }}</p>
      </div>
      <div
        v-if="message.text"
        class="audio-message__text-container"
      >
        <p
          v-html="linkedText"
          @click="inNewWindow"
        ></p>
      </div>

      <LinkPreview
        class="audio-message__link-preview"
        :class="message.position"
        v-if="message.linkPreview"
        :linkPreview="message.linkPreview"
      />

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

      <Teleport to="body">
        <transition name="modal-fade">
          <div
            v-if="isFullTranscript"
            class="audio-message__modal-overlay"
          >
            <div class="audio-message__modal">
              <button
                class="audio-message__modal-close-button"
                @click="isFullTranscript = false"
              >
                <span>
                  <i class="pi pi-times" />
                </span>
              </button>
              <p style="
                word-wrap: break-word;
                max-width: 25rem;">
                {{ message.transcript?.text }}
              </p>
            </div>
          </div>
        </transition>
      </Teleport>

    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, onMounted, computed } from 'vue'
import linkifyStr from "linkify-string";

import { ContextMenu } from '../components'
import { getStatus, statuses } from "../../helpers";
import { IAudioMessage } from '../../types';
import BaseReplyMessage from './BaseReplyMessage.vue'
import LinkPreview from './LinkPreview.vue'

// Define props
const props = defineProps({
  message: {
    type: Object as () => IAudioMessage,
    required: true,
  },
});

const emit = defineEmits(['action','reply']);

const player = ref<HTMLAudioElement | null>();
const isPlaying = ref(false);
const audioDuration = ref(0);
const currentTime = ref(0)

const isOpenMenu = ref(false)
const buttonMenuVisible = ref(false);

const isFullTranscript = ref(false)

const linkedText = computed(() => {
  if (props.message.text) return linkifyStr(props.message.text)
})

const handleClickReplied = (messageId) => {
  emit('reply', messageId)
}

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

const clickAction = () => { }

const status = computed(() => getStatus(props.message.status))

function togglePlayPause() {
  if (player.value) {
    if (isPlaying.value) {
      player.value.pause();
    } else {
      player.value.play();
    }
    isPlaying.value = !isPlaying.value;
  }
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const formatCurrentTime = computed(() => {
  if (player.value) {
    return formatTime(currentTime.value)
  }
  return '0:00';
});

const formatDuration = computed(() => {
  if (player.value) {
    return formatTime(audioDuration.value)
  }
  return '0:00';
});

const progressPercent = computed(() => {
  if (audioDuration.value > 0) {
    return (currentTime.value / audioDuration.value) * 100;
  }
  return 0;
});

function getClass(message) {
  return message.position === 'left' ? 'audio-message__left' : 'audio-message__right';
}

onMounted(() => {
  if (player.value != null) {
    player.value.addEventListener('loadedmetadata', () => {
      audioDuration.value = player.value != null ? player.value.duration : 0;
    });
    player.value.addEventListener('timeupdate', () => {
      currentTime.value = player.value != null ? player.value.currentTime : 0;
    });
  }
});
</script>

<style
  scoped
  lang="scss"
>
.audio-message {
  &__content {
    position: relative;
    display: grid;
    grid-template-columns: min-content 1fr;
    column-gap: 12px;
    width: 50%;
    max-width: 25rem;
    min-width: 13rem;
    border-radius: 14px;
    padding: 10px 26px 4px 16px;
  }

  &__audio-container {
    position: relative;
    display: grid;
    grid-template-columns: min-content 1fr;
    column-gap: 12px;
    max-width: 25rem;
    border-radius: 14px;
    padding: 10px 26px 4px 16px;
    grid-column: 1/3;
  }

  &__play,
  &__pause {
    border: none;
    cursor: pointer;
    position: relative;
    grid-row: 1 / 3;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: var(--audio-message-button-icon-bg-color);

    span {
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: var(--audio-message-button-icon-font-size);
      color: var(--audio-message-button-icon-color);
    }
  }

  &__progress-bar-container {
    position: relative;
    width: 100%;
    align-self: center;
    border-radius: 10px;
    height: 8px;
    background-color: var(--audio-message-pbc-background-color);
  }

  &__progress-bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    transition: width 0.2s ease-in-out;
    border-radius: 10px;
    background-color: var(--audio-message-pb-background-color);
  }

  &__remaining-time {
    grid-column: 2;
    margin-bottom: -10px;
    font-size: var(--base-message-remaining-time-font-size);
    height: fit-content;
  }

  &__avatar {
    align-self: center;
    object-fit: cover;
    min-width: var(--avatar-width-small);
    min-height: var(--avatar-height-small);
    border-radius: var(--avatar-border-radius);
  }

  &__subtext {
    font-size: var(--base-message-subtext-font-size);
    color: var(--base-message-subtext-color);
    font-weight: var(--base-message-subtext-font-weight);
  }

  &__info-container {
    grid-column: 1 / 3;
    margin-left: auto;
    display: flex;
    align-items: center;
    column-gap: 4px;
  }

  &__download-button {
    position: absolute;
    right: 0;
    top: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 12px;
    background-color: transparent;
    padding: 0;
    cursor: pointer;

    span {
      color: var(--audio-message-download-button-color);
      font-weight: var(--audio-message-download-button-font-weight);
      font-size: var(--audio-message-download-button-font-size);
    }
  }

  &__status {
    display: flex;

    span {
      color: var(--base-message-status-color-received);
      font-size: var(--base-message-status-font-size);
      font-weight: var(--base-message-status-font-weight);
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
      color: var(--base-message-views-color);
    }

    p {
      font-size: var(--base-message-views-font-size);
      color: var(--base-message-views-color);
    }
  }

  &__time {
    font-size: var(--base-message-time-font-size);
    color: var(--base-message-time-color);
  }

  &__menu-button {
    position: absolute;
    background-color: transparent;
    border: none;
    transform: translateY(-50%);
    cursor: pointer;
    transition: 0.2s;

    span {
      color: var(--base-message-menu-button-color);
      font-size: var(--base-message-menu-button-font-size);
    }

    &:hover span {
      color: var(--base-message-menu-button-hover-color);
      transition: 0.2s;
    }
  }

  &__context-menu {
    position: absolute;
  }

  &__text-container,
  &__transcript-container {
    grid-column: 1 / 3;
    word-wrap: break-word;
    max-width: 25rem;

    p {
      white-space: pre-wrap;
      font-size: var(--base-message-text-font-size);
    }
  }

  &__link-preview {
    grid-column: 1 / 3;
  }

  &__transcript-container {
    position: relative;
    padding-left: 16px;
    margin-bottom: 16px;
    cursor: pointer;
    user-select: none;

    p {
      color: var(--audio-message-transcript-color);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 2px;
      height: 84%;
      background-color: var(--audio-message-transcript-delimiter-color);
      border-radius: 6px;
    }
  }

  &__transcript--full {
    p {
      overflow: visible;
      text-overflow: clip;
      display: block;
      -webkit-line-clamp: unsets;
      line-clamp: unsets;
      -webkit-box-orient: initial;
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
      font-size: var(--modal-icon-font-size);
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
