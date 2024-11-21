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
      :style="{ gridRow: message.subText ? '2' : '1' }"
    >

    <div
      class="video-message__content"
      @mouseenter="showMenu"
    >
      <video
        ref="player"
        class="video-message__video"
        :src="message.url"
      />
      <div class="video-message__controls">
        <transition>
          <button
            v-show="!isPlaying"
            class="video-message__play"
            @click="togglePlayPause"
          >
            <span class="pi pi-play" />
          </button>
        </transition>
        <button
          v-show="isPlaying"
          class="video-message__pause"
          @click="togglePlayPause"
        />
      </div>

      <button
        v-if="buttonMenuVisible && message.actions"
        class="video-message__menu-button"
        @click="isOpenMenu = !isOpenMenu"
      >
        <span class="pi pi-ellipsis-h" />
      </button>

      <transition>
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="video-message__context-menu"
          :actions="message.actions"
          @click="clickAction"
        />
      </transition>

      <p class="video-message__remaining-time">
        {{ `${remaningTime}` }}
      </p>

      <div class="video-message__info-container">
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import ContextMenu from '../components/ContextMenu.vue'

import { getStatus, statuses } from "../../helpers";

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

function getClass(message) {
  return message.position === 'left' ? 'video-message__left' : 'video-message__right';
}

const player = ref(null);
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

const remaningTime = computed(() => {
  if (player.value) {
    if (currentTime.value >= audioDuration.value) {
      isPlaying.value = false
      return '00:00';
    } else {
      const time = audioDuration.value - currentTime.value;
      return formatTime(time);
    }
  } else {
    return ''
  }
})

onMounted(() => {
  player.value.addEventListener('loadedmetadata', () => {
    audioDuration.value = player.value.duration;
  });
  player.value.addEventListener('timeupdate', () => {
    currentTime.value = player.value.currentTime;
  });
});
</script>

<style
  scoped
  lang="scss"
>
.video-message {
  &__content {
    position: relative;
    height: 200px;
    width: 200px;
  }

  &__info-container {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 6px;
  }

  &__avatar {
    align-self: center;
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
    width: 100%;
    height: 100%;
    border-radius: 50%;
    cursor: pointer;
    padding: 0;

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.67);
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
    object-fit: cover;
    height: 200px;
    width: 200px;
    border-radius: 50%;
  }

  &__remaining-time {
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: var(--base-message-font-size-remaining-time);
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
    right: -8px;

    span {
      color: var(--base-message-status-color-received);

      &:first-child {
        margin-right: -8px;
      }
    }
  }

  .status--read {
    right: -8px;

    span {
      color: var(--base-message-status-color-read);

      &:first-child {
        margin-right: -8px;
      }
    }
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

    .video-message__avatar {
      grid-column: 1;
      grid-row: 2;
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
      color: var(--text-message-text-color);
    }

    .video-message__menu-button {
      top: 50%;
      right: -40px;
    }

    .video-message__context-menu {
      top: 56%;
      left: 100%;
    }
  }

  &__right {
    grid-template-columns: 1fr min-content;

    .video-message__avatar {
      grid-column: 2;
      grid-row: 2;
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
    }

    .video-message__menu-button {
      top: 50%;
      left: -40px;
    }

    .video-message__context-menu {
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
