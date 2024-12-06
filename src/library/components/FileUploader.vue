<template>
  <div class="uploader-container">
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
      :disabled="!canUploadFile"
      @click="triggerFileUpload"
      @button-click="triggerFileUploadDefault"
    />
    <input
      ref="fileInput"
      style="display: none;"
      type="file"
      @change="onFileSelected"
    >
  </div>
  <teleport
    v-if="getMessage().file"
    :to="'#chat-input-first-line-'+chatAppId"
  >
    <FilePreview
      :preview-url="previewUrl"
      :is-image="isImage"
      :is-video="isVideo"
      :is-audio="isAudio"
      :file-name="getMessage().file.name"
      :file-size="fileSize"
      @reset="resetSelectedFile"
    />
  </teleport>
</template>

<script setup>
import { ref, computed, inject } from "vue";
import ButtonContextMenu from "./ButtonContextMenu.vue";
import { getTypeFileByMime } from '../../helpers'
import FilePreview from "./FilePreview.vue";
import { useMessage } from "../../helpers/useMessage";
const props = defineProps({
  filebumpUrl: {
    type: String,
  },
});

const selectedFile = ref(null);
const uploadStatus = ref("");
const previewUrl = ref("");
const isImage = ref(false);
const isVideo = ref(false);
const isAudio = ref(false)
const fileInput = ref(null);
const fileSize = ref('')

const chatAppId = inject('chatAppId')
const { setMessageFile, resetMessageFile, getMessage } = useMessage(chatAppId)

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
  selectedFile.value = null;
  resetMessageFile()
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
  else if (fileType === 'audio') {
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
  const sizeMeasurement = ['б', 'Кб', "Мб", "Гб"]
  let size = file.size
  let index = 0
  while (size > 1024) {
    size = size / 1024
    index++
  }
  size = size.toFixed(2) + sizeMeasurement[index]
  fileSize.value = size
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
    uploadStatus.value = "success";

    // emit event with link
    setMessageFile({
      url: result.url,
      name: selectedFile.value.name,
      size: selectedFile.value.size,
      type: getTypeFileByMime(selectedFile.value.type),
    })
  } catch (error) {
    console.error("Ошибка при загрузке файла:", error);
    uploadStatus.value = "error";
  }
};

const triggerFileUpload = (action) => {
  if (fileInput.value && canUploadFile) {
    fileInput.value.accept = action.action
    fileInput.value.click();
  }
};

const triggerFileUploadDefault = () => {
  if (fileInput.value && canUploadFile) {
    fileInput.value.click();
  }
};

</script>

<style
  scoped
  lang="scss"
>
.uploader-container {
  margin-top: 9px;
  display: flex;
}
</style>
