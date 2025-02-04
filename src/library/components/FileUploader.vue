<template>
  <div v-if="uploadStatus === 'uploading'">
    <p>Загрузка файла...</p>
  </div>
  <div v-else-if="uploadStatus === 'error'">
    <p>Ошибка при загрузке файла.</p>
  </div>
  <ButtonContextMenu
    v-else
    :actions="actions"
    :mode="'hover'"
    :button-class="'pi pi-file-arrow-up'"
    :menu-side="'top'"
    :disabled="!canUploadFile || state == 'disabled'"
    @click="triggerFileUpload"
    @button-click="triggerFileUploadDefault"
  />
  <input
    ref="fileInput"
    style="display: none;"
    type="file"
    @change="onFileSelected"
  >
  <teleport
    v-if="getMessage().file"
    :to="'#chat-input-file-line-'+chatAppId"
  >
    <FilePreview
      v-if="fileInfo"
      :file-info="fileInfo"
      @reset="resetSelectedFile"
    />
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, inject } from "vue";
import ButtonContextMenu from "./ButtonContextMenu.vue";
import FilePreview from "./FilePreview.vue";
import { useMessage } from "../../helpers/useMessage";
import { uploadFile } from "../../helpers/uploadFile";
import { IFilePreview } from "../../types";

const props = defineProps({
  filebumpUrl: {
    type: String,
  },
  state:{
    type: String,
    default: 'active',
  },
});

const uploadStatus = ref("");

const fileInput = ref<HTMLInputElement>();
const fileInfo = ref<IFilePreview>()

const chatAppId = inject('chatAppId')
const { setMessageFile, resetMessageFile, getMessage } = useMessage(chatAppId as string)

const actions = [
  {
    action: 'audio/*',
    title: 'Аудио',
    prime: 'headphones',
  },
  {
    action: 'image/*',
    title: 'Фото',
    prime: 'image',
  },
  {
    action: 'video/*',
    title: 'Видео',
    prime: 'video',
  },
  {
    action: '',
    title: 'Файл',
    prime: 'file',
  },
]

const emit = defineEmits(["fileUploaded"]);

const canUploadFile = computed(() => {
  return !getMessage().file;
})

const resetSelectedFile = () => {
  resetMessageFile()
  fileInfo.value = undefined
  uploadStatus.value = ""
};

const onFileSelected = async () => {
  resetSelectedFile()
  //console.log("onFileSelected", event.target.files[0]);
  if (fileInput.value?.files) {
    uploadStatus.value = "uploading";
    const f = typeof props.filebumpUrl == 'string' ? props.filebumpUrl : null 
    await uploadFile(f, fileInput.value?.files[0])
    .then((data) => {
      uploadStatus.value = data.status
      if (data.status == 'success'){
        setMessageFile({
          url: data.url,
          name: data.name,
          size: data.size,
          type: data.type,
        })
        if (data.preview)
          fileInfo.value = ({
            previewUrl: data.preview.previewUrl,
            isImage: data.preview.isImage,
            isVideo: data.preview.isVideo,
            isAudio: data.preview.isAudio,
            fileName: data.name,
            fileSize: data.preview.fileSize,
          })
      }
    }) 
  }
};

const triggerFileUpload = (action) => {
  if (fileInput.value && canUploadFile) {
    fileInput.value.accept = action.action
    fileInput.value.click();
  }
};

const triggerFileUploadDefault = () => {
  if (fileInput.value && canUploadFile  && props.state == 'active') {
    fileInput.value.click();
  }
};

</script>

<style
  scoped
  lang="scss"
>
</style>
