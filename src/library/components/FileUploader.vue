<template>
  <div
    class="uploader-container"
  >
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
        :context-menu-key="'file-uploader'"
        :disabled="!canUploadFile"
        @click="triggerFileUpload"
        @button-click="triggerFileUploadDefault"
      />
    <input
      style="display: none;"
      ref="fileInput"
      type="file"
      @change="onFileSelected" 
    >
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import ButtonContextMenu from "./ButtonContextMenu.vue";
import {getTypeFileByMime} from '../../helpers'

const props = defineProps({
  canUploadFile: {
    type: Boolean,
    required: true,
    default: true,
  },
  filebumpUrl: {
    type: String,
  },
});

const selectedFile = ref(null);
const uploadStatus = ref("");
const fileLink = ref("");
const previewUrl = ref("");
const isImage = ref(false);
const isVideo = ref(false);
const isAudio = ref(false)
const fileInput = ref(null);

const actions = [
  {
    action: 'audio/*',
    title: 'Аудио',
    prime: 'headphones',
  },
  {
    action: 'image/*',
    title : 'Фото',
    prime: 'image',
   },
   {
    action: 'video/*',
    title : 'Видео',
    prime: 'video',
   },
   {
    action: '',
    title : 'Файл',
    prime: 'file',
   },
]

const emit = defineEmits(["fileUploaded"]);
watch(
  () => props.canUploadFile,
  () => {
    nextTick(() => {
      if (props.canUploadFile === true) {
        uploadStatus.value = null;
      }
    });
  }
);

const resetSelectedFile = () => {
  selectedFile.value = null;
  emit("fileUploaded", null);
  fileLink.value = null;
  previewUrl.value = "";
  uploadStatus.value = ""
};

const onFileSelected = (event) => {
  resetSelectedFile()
  console.log("onFileSelected", event.target.files[0]);
  selectedFile.value = event.target.files[0];
  if (selectedFile.value) {
    generatePreview();
    uploadFile();
  }
};


const generatePreview = () => {
  const file = selectedFile.value;
  const fileType = getTypeFileByMime(file.type);
  isImage.value = false;
  isVideo.value = false;
  isAudio.value = false

  if (fileType === 'image') {
    isImage.value = true;    
  } else if (fileType === "video") {
    isVideo.value = true;
  }
  else if (fileType === 'audio'){
    isAudio.value = true
  }

  if (isImage.value || isVideo.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    previewUrl.value = ""; // No preview available
  }
};


const uploadFile = async () => {
  uploadStatus.value = "uploading";

  const formData = new FormData();
  formData.append("file", selectedFile.value);

  const oldFilebumpUrl = 'https://filebump2.services.mobilon.ru';
  const url = (props.filebumpUrl ? 
    props.filebumpUrl : oldFilebumpUrl) + "/upload";

  try {
    const response = await fetch(
      url,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();
    fileLink.value = result.url;
    uploadStatus.value = "success";

    // emit event with link
    emit("fileUploaded", { 
      url: result.url, 
      type: getTypeFileByMime(selectedFile.value.type),
      filename: selectedFile.value.name,
      size: selectedFile.value.size,
      previewUrl: previewUrl.value,
      isImage: isImage.value,
      isVideo: isVideo.value,
      isAudio: isAudio.value,
      selectedFile: selectedFile.value,
    });
  } catch (error) {
    console.error("Ошибка при загрузке файла:", error);
    uploadStatus.value = "error";
  }
};

const triggerFileUpload = (action) => {
  if (fileInput.value && props.canUploadFile) {
    fileInput.value.accept = action.action
    fileInput.value.click();
  }
};

const triggerFileUploadDefault = () => {
  if (fileInput.value && props.canUploadFile) {
    fileInput.value.click();
  }
};

</script>

<style
  scoped
  lang="scss"
>
.uploader-container {
  display: flex;
}
</style>