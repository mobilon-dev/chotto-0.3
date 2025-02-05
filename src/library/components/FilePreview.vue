<template>
  <div class="preview__container">
    <div class="preview__block">
      <div v-if="fileInfo.isImage">
        <img
          :src="fileInfo.previewUrl"
          alt="Image Preview"
          class="preview__image"
        >
      </div>
      <div v-else-if="fileInfo.isVideo">
        <video
          :src="fileInfo.previewUrl"
          class="preview__video"
        />
      </div>
      <div style="display: flex; gap: 5px" v-else-if="fileInfo.isAudio">
        <span
          class="pi pi-headphones"
          style="font-size: 1rem; margin: auto;"
        />
        <audio
          ref="audio"
          :src="fileInfo.previewUrl"
        />
        <button
          class="preview__audio-control"
          @click="togglePlayPause"
        >
          <span v-show="!isPlaying" class="pi pi-play" />
          <span v-show="isPlaying" class="pi pi-pause" />
        </button>
      </div>
      <div v-else>
        <span
          class="pi pi-file"
          style="font-size: 2.5rem"
        />
      </div>
    </div>
    <div class="preview__control-block">
      <div class="preview__information">
        <span class="preview__name">{{ fileInfo.fileName }}</span>
        <span v-if="!fileInfo.isAudio" class="preview__size">{{ fileInfo.fileSize }}</span>
        <span v-if="fileInfo.isAudio" class="preview__audio-time">
          {{ `${formatCurrentTime} / ${formatDuration}` }}
        </span>
      </div>
      <span
        class="pi pi-times preview__reset"
        style="font-size: 1rem"
        @click="emit('reset')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { IFilePreview } from '../../types'

defineProps({
  fileInfo: {
    type: Object as () => IFilePreview,
    required: true,
  }
});

const emit = defineEmits(["reset"]);

const audio = ref<HTMLAudioElement>()
const isPlaying = ref(false)
const audioDuration = ref(0);
const currentTime = ref(0)

function togglePlayPause() {
  if (audio.value) {
    if (isPlaying.value) {
      audio.value.pause();
    } else {
      audio.value.play();
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
  if (audio.value) {
    return formatTime(currentTime.value)
  }
  return '0:00';
});

const formatDuration = computed(() => {
  if (audio.value) {
    return formatTime(audioDuration.value)
  }
  return '0:00';
});

onMounted(() => {
  if (audio.value != null) {
    audio.value.addEventListener('loadedmetadata', () => {
      if (audio.value != null) {
        if (audio.value.duration == Infinity || Number.isNaN(audio.value.duration)){
          audio.value.currentTime = 1e101;
          audio.value.addEventListener("timeupdate", () => {
            if (audio.value){
              audio.value.currentTime = 0;
              audioDuration.value = audio.value.duration
            }
          }, { once: true });
        }
      }
      audioDuration.value = audio.value != null ? audio.value.duration : 0;
    });
    audio.value.addEventListener('timeupdate', () => {
      currentTime.value = audio.value != null ? audio.value.currentTime : 0;
    });
  }
});

</script>

<style scoped lang="scss">
.preview {
  &__container{
    display: flex;
    border:  var(--file-preview-container-border);
    max-width: 400px;
  }
  &__image,
  &__video{
    max-width: 200px;
    max-height: 200px;
    border-radius: 5px;  
  }
  &__audio-control{
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
  &__block {
    --resolution: 60px;
    max-width: var(--resolution);
    max-height: var(--resolution);
    min-width: var(--resolution);
    min-height: var(--resolution);
    margin: 5px;
    overflow: hidden;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__information {
    margin-left: 5px;
    display: grid;
    span{
      display: flex;
      font-size: small;
    }
  }
  &__name {
    align-items:end;
    overflow: hidden;
    white-space: normal;
    word-break: break-word;
    text-overflow: ellipsis;
  }
  &__reset{
    margin: 10px;
  }
  &__reset:hover {
    cursor: pointer;
  }
  &__control-block{
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
}

</style>
