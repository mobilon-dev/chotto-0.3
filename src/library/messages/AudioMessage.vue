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

      <div class="audio-message__info-container">
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

      <a
        class="audio-message__download-button"
        :href="message.url"
        download
        target="_blank"
      >
        <span class="pi pi-download" />
      </a>

      <transition>
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="audio-message__context-menu"
          :actions="message.actions"
          @click="clickAction"
        />
      </transition>


      <div
        v-if="message.text"
        class="audio-message__text-container"
      >
        <p>{{ message.text }}</p>
      </div>

    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, onMounted, computed } from 'vue'

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

const player = ref<HTMLAudioElement | null>();
const isPlaying = ref(false);
const audioDuration = ref(0);
const currentTime = ref(0)

const isOpenMenu = ref(false)
const buttonMenuVisible = ref(false);

const showMenu = () => {
  buttonMenuVisible.value = true;
};

const hideMenu = () => {
  buttonMenuVisible.value = false;
  isOpenMenu.value = false
};

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
    width: 43%;
    border-radius: 14px;
    padding: 10px 26px 4px 16px;
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

    span {
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: var(--icon-font-size-medium);
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
    font-size: var(--base-message-font-size-remaining-time);
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
    font-size: 12px;
    color: var(--base-message-subtext-color);
    font-weight: 500;
  }

  &__info-container {
    grid-column: 1 / 3;
    margin-left: auto;
    display: flex;
    align-items: center;
    column-gap: 6px;
  }

  &__download-button {
    position: absolute;
    right: 8px;
    top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    grid-column: 1 / 3;
    margin-top: 6px;

    p {
      font-size: var(--base-message-font-size-text);
    }
  }

  &__play,
  &__pause {
    background-color: var(--neutral-400);

    span {
      color: var(--audio-message-button-icon-color);
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
