<template>
  <div 
    v-if="!getMessage().isRecording"
    class="video-recorder__container"
  >
    
    <button
      v-if="uploadStatus != 'uploading'"
      class="video-recorder__button"
      :class="{'video-recorder__button-disabled' : state == 'disabled'}"
      @click="openVideoRecorder"
    >
      <span class="pi pi-video" />
    </button>
  </div>
  <div 
    v-if="uploadStatus === 'uploading'"
    class="video-recorder__container"
  >
    <p>Загрузка файла...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { useMessage } from '../../helpers/useMessage';
import { uploadFile } from '../../helpers/uploadFile';
import { useModalVideoRecorder } from '../modals';

const chatAppId = inject('chatAppId')
const { getMessage, setMessageFile, setForceSendMessage, setRecordingMessage } = useMessage(chatAppId as string)

const uploadStatus = ref("");

const props = defineProps({
  state:{
    type: String,
    default: 'active',
  },
  filebumpUrl: {
    type: String,
    default: null,
  },
})

const openVideoRecorder = async () => {
  await useModalVideoRecorder()
    .then(async (data) => {
      if (data.videoFile){
        uploadStatus.value = 'uploading'
        setRecordingMessage(true)
        await uploadFile(props.filebumpUrl, data.videoFile)
          .then((u) => {
            setRecordingMessage(false)
            uploadStatus.value = u.status
            if (u.status == 'success'){
              setMessageFile({
                url: u.url,
                name: u.name,
                size: u.size,
                type: u.type,
              })
              setForceSendMessage(true)
            }
          })
      }
    })
}

</script>

<style
  scoped
  lang="scss"
>
.video-recorder {
  &__container {
    position: relative;
    display: grid;
    align-items: center;
    background-color: var(--chat-input-container-bg);
  }

  &__button {
    background-color: transparent;
    border: 0px;

    span {
      display: block;
      cursor: pointer;
      padding: 14px;
      font-size: var(--chat-input-icon-font-size);
      color: var(--chat-input-icon-color);
    }
  }

  &__button-disabled {
    span {
      cursor: auto;
      color: var(--chat-input-icon-color-disabled);
    }
  }
}

</style>
