<template>
  <div class="video-message">
    <div class="video-message__container">
      <video ref="player" class="video-message__video" src="/sample-10s.mp4"></video>

      <div class="video-message__controls">
        <transition>
          <button class="video-message__play" v-show="!isPlaying" @click="togglePlayPause">
            <span class="pi pi-play"></span>
          </button>
        </transition>
        <button class="video-message__pause" v-show="isPlaying" @click="togglePlayPause"></button>
      </div>

      <p class="video-message__remaining-time">{{ `${remaningTime}` }}</p>
      <span class="video-message__time">22:02</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const player = ref(null);
const isPlaying = ref(false);
const audioDuration = ref(0);
const currentTime = ref(0)

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

<style scoped lang="scss">
.video-message {
  &__container {
    position: relative;
    height: var(--video-message-height);
    width: var(--video-message-width);
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
      background-color: var(--video-message-button-background);
      width: var(--video-message-button-width);
      height: var(--video-message-button-height);
      border-radius: var(--video-message-button-border-radius);
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
    height: var(--video-message-height);
    width: var(--video-message-width);
    border-radius: var(--video-message-border-radius);
  }

  &__remaining-time {
    position: absolute;
    bottom: 4px;
    left: 8px;
    font-size: var(--remaining-time);
  }

  &__time {
    position: absolute;
    bottom: 4px;
    right: 8px;
    font-size: var(--time-message-font-size);
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
