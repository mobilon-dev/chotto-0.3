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
      <div v-else-if="fileInfo.isAudio">
        <span
          class="pi pi-headphones"
          style="font-size: 2.5rem"
        />
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
        <span class="preview__size">{{ fileInfo.fileSize }}</span>
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

import { IFilePreview } from '../../types'

const props = defineProps({
  fileInfo: {
    type: Object as () => IFilePreview,
    required: true,
  }
});

const emit = defineEmits(["reset"]);

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
  }
  &__information span{
    display: flex;
    font-size: small;
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
