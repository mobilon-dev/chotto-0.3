<template>
  <div class="audio-message" :class="getClass(message)" :messageId="message.messageId">
    <audio ref="player" :src="message.url"></audio>
    <div class="audio-message__container">
      <button class="audio-message__play" v-show="!isPlaying" @click="togglePlayPause">
        <span class="pi pi-play"></span>
      </button>
      <button class="audio-message__pause" v-show="isPlaying" @click="togglePlayPause">
        <span class="pi pi-pause"></span>
      </button>
      <div class="audio-message__progress-bar-container">
        <div class="audio-message__progress-bar" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <p class="audio-message__remaining-time">{{ `${formatCurrentTime} / ${formatDuration}` }}</p>
      <span class="audio-message__time">{{ message.time }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// Define props
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

function getClass(message) {
  return message.position === 'left' ? 'audio-message__left' : 'audio-message__right';
}

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
.audio-message {

  &__container {
    position: relative;
    display: grid;
    grid-template-columns: min-content 1fr;
    column-gap: var(--audio-message-gap);
    padding: var(--audio-message-padding);
    max-width: var(--audio-message-max-width);
    margin: var(--audio-message-margin);
    border-radius: var(--audio-message-border-radius);
  }

  &__play,
  &__pause {
    border: none;
    cursor: pointer;
    position: relative;
    grid-row: 1 / 3;
    width: var(--audio-message-button-width);
    height: var(--audio-message-button-height);
    border-radius: var(--audio-message-button-border-radius);

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
    height: var(--audio-message-pbc-height);
    border-radius: var(--audio-message-pbc-border-radius);
    margin: var(--audio-message-pbc-margin);
    background-color: var(--audio-message-pbc-background-color);
  }

  &__progress-bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    transition: width 0.2s ease-in-out;
    border-radius: var(--audio-message-pb-border-radius);
    background-color: var(--audio-message-pb-background-color);
  }

  &__remaining-time {
    grid-column: 2;
    margin-bottom: -10px;
    font-size: var(--remaining-time);
  }

  &__time {
    position: absolute;
    bottom: 4px;
    right: 8px;
    font-size: var(--time-message-font-size);
  }

  &__left {

    .audio-message__container {
      background-color: var(--audio-message-background-left);
    }

    .audio-message__play,
    .audio-message__pause {
      background-color: var(--audio-message-button-background-color-left);

      span {
        color: var(--audio-message-button-icon-color-left);
      }
    }
  }

  &__right {

    .audio-message__container {
      background-color: var(--audio-message-background-right);
    }

    .audio-message__play,
    .audio-message__pause {
      background-color: var(--audio-message-button-background-color-right);

      span {
        color: var(--audio-message-button-icon-color-right);
      }
    }
  }
}

.dark {
  .audio-message {
    &__left {

      .audio-message__container {
        background-color: var(--d-audio-message-background-left);
      }

      .audio-message__play,
      .audio-message__pause {
        background-color: var(--d-audio-message-button-background-color-left);

        span {
          color: var(--d-audio-message-button-icon-color-left);
        }
      }
    }

    &__right {

      .audio-message__container {
        background-color: var(--d-audio-message-background-right);
      }

      .audio-message__play,
      .audio-message__pause {
        background-color: var(--d-audio-message-button-background-color-right);

        span {
          color: var(--d-audio-message-button-icon-color-right);
        }
      }
    }

    &__progress-bar-container {
      background-color: var(--d-audio-message-pbc-background-color);
    }

    &__progress-bar {
      background-color: var(--d-audio-message-pb-background-color);
    }

  }
}
</style>
