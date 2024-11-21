<template>
  <div
    class="uploader-container"
    :class="{'storybook-container' : storybook}"
  >
    <div v-if="uploadStatus === 'uploading'">
      <p>Загрузка файла...</p>
    </div>
    <div v-else-if="uploadStatus === 'error'">
      <p>Ошибка при загрузке файла.</p>
    </div>
    <div
      v-else
      class="chat-input__button-file"
      :class="{'chat-input__button-file-disabled' : !canUploadFile}"
    >
      <label
        @click="handleFileUpload"
      >
        <input
          ref="fileInput"
          type="file"
          @change="onFileSelected" 
        >
        <span>
          <i class="pi pi-file-arrow-up" />
        </span>
      </label>
    </div>
    <ContextMenu
      v-if="canUploadFile"
      class="file-drop-down"
      :actions="actions"
      @click="triggerFileUpload"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import ContextMenu from "./ContextMenu.vue";
import {getTypeFileByMime} from '../../helpers'

const props = defineProps({
  canUploadFile: {
    type: Boolean,
    required: true,
    default: true,
  },
  storybook:{
    type: Boolean,
    default: false
  }
});

const selectedFile = ref(null);
const uploadStatus = ref("");
const fileLink = ref("");
const previewUrl = ref("");
const isImage = ref(false);
const isVideo = ref(false);
const fileInput = ref(null);

const actions = [
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

const handleFileUpload = (event) => {
  if (!props.canUploadFile){
    event.preventDefault()
  }
}

const generatePreview = () => {
  const file = selectedFile.value;
  const fileType = getTypeFileByMime(file.type);
  isImage.value = false;
  isVideo.value = false;

  if (fileType === 'image') {
    isImage.value = true;    
  } else if (fileType === "video") {
    isVideo.value = true;
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

  const url = "https://filebump.services.mobilon.ru/upload";
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

</script>

<style
  scoped
  lang="scss"
>
.chat-input {
  &__button-file {
    input {
      position: absolute;
      z-index: -1;
      opacity: 0;
      display: block;
      width: 0;
      height: 0;
    }

    span {
      display: block;
      cursor: pointer;
      padding: 14px;
      font-size: var(--icon-font-size-medium);
      color: var(--file-uploader-icon-color);
    }
  }
  &__button-file-disabled{
    span {
      cursor: auto;
      color: lightgray;
    }
  }
}

.preview-image,
.preview-video {
  max-width: 200px;
  max-height: 200px;
  border-radius: 5px;
}

.uploader-container {
  position: relative;
}

.file-drop-down {
  display: none;
  font-size: inherit;
  background: white;
  outline: none;
  border-radius: 4px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 80%;
  align-items: center;
  margin: 0;
  max-width: fit-content;
  max-height: fit-content;
  z-index: 2;
}

.file-drop-down:hover {
  display: inherit;
}

.uploader-container:hover .file-drop-down {
  display: inherit;
  
}

.preview {
  max-width: 150px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid;
}

.preview-container {
  margin-left: 10px;
}

.preview-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 150px;
  width: 150px;
  display: inline-block;
}

.storybook-container{
  padding-top: 20px;
  margin-top: 50px;
  height: 100px;
}
</style>
