<template>
  <section class="attachment-section" :class="{'attachment-section-error' : error}">
    <div class="file-upload" @click="triggerFileUpload" v-if="uploadStatus !== 'success'">
      <input type="file" id="file-upload" ref="fileInput"
      style="display: none;" @change="handleFileChange" :accept="fileInfo[type].accept">
      <span
        class="pi pi-paperclip file-upload-icon" 
      />
      <div class="file-upload-text">
        <h2 class="attachment-title open-sans-bold">
          Прикрепить файл 
        </h2>
        <h2 class="file-info open-sans">
          {{ fileInfo[type].text }}
        </h2>
      </div>
    </div>
    <FilePreview
      v-else-if="uploadStatus === 'success'"
      :preview-url="previewUrl"
      :is-image="isImage"
      :is-video="isVideo"
      :is-audio="isAudio"
      :file-name="selectedFile?.name"
      :file-size="fileSize"
      @reset="handleFileDecline"
    />
  </section>
  <div v-if="error" class="error-text">{{ error }}</div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from "vue";
import FilePreview from "./FilePreview.vue";
import { getTypeFileByMime } from "../../helpers";
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  templateId: {
    type: String,
    required: true,
  },
});

const filebumpUrl = ref<string | undefined>(inject('filebumpUrl'))
const selectedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement>();
const error = ref('')
const uploadStatus = ref('')
const isImage = ref(false)
const isVideo = ref(false)
const isAudio = ref(false)
const previewUrl = ref<string>("")
const fileSize = ref('')

const emit = defineEmits(['fileSelected']);

const triggerFileUpload = () => {
  if (fileInput.value && uploadStatus.value != 'success') {
    fileInput.value.click();
  }
};

const fileInfo = {
  'DOCUMENT':
  {
    text: 'Документ до 100 МБ', 
    accept: '.pdf,.doc,.docx,.xls,.xlsx', 
    maxSize: 104857600, 
    error: 'Некорректный тип файла, выберите PDF, DOC или XLS', 
    icon: 'pi pi-file',
  },
  'IMAGE':
  {
    text: 'Изображение до 5 МБ',
    accept: '.jpg,.jpeg,.png', 
    maxSize: 5242880, 
    error: 'Некорректный тип файла, выберите JPG, JPEG или PNG', 
    icon: 'pi pi-image',
  },
  'VIDEO': 
  {
    text: 'Видео до 16 МБ',
    accept: '.mp4,.mov', 
    maxSize: 16777216, 
    error: 'Некорректный тип файла, выберите MP4 или MOV', 
    icon: 'pi pi-video',
  },
}

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    error.value = ''
    const ext = file.name.split('.')
    const hasExt = fileInfo[props.type].accept.indexOf(ext[ext.length - 1])
    if (hasExt == -1){
      error.value = fileInfo[props.type].error
    } 
    else if (file.size > fileInfo[props.type].maxSize){
      error.value = 'Файл слишком большого размера'
    }
    else if (!error.value){
      selectedFile.value = file
      uploadFile()
      generatePreview()
    }
  }
};

const uploadFile = async () => {
  if (selectedFile.value){
    uploadStatus.value = "uploading";

const formData = new FormData();
formData.append("file", selectedFile.value);

const oldFilebumpUrl = 'https://filebump2.services.mobilon.ru';
const url = (filebumpUrl.value ?
  filebumpUrl.value : oldFilebumpUrl) + "/upload";

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

  emit('fileSelected',{
    url: result.url,
    filename: selectedFile.value.name,
    filesize: selectedFile.value.size,
  })
} catch (error) {
  console.error("Ошибка при загрузке файла:", error);
  uploadStatus.value = "error";
}
  }
};

const generatePreview = () => {
  const file = selectedFile.value;
  if (file){
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
        if (e.target?.result)
          previewUrl.value = String(e.target.result)
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
    fileSize.value = size.toFixed(2) + sizeMeasurement[index]
  }
};

const handleFileDecline = () => {
  if (selectedFile.value) {
    selectedFile.value = null
    uploadStatus.value = ''
  }
}

watch(
  () => uploadStatus.value,
  (newStatus) => {
    if (newStatus === '') {
      if (fileInput.value) {
        fileInput.value.value = '';
      }
      selectedFile.value = null
      emit('fileSelected',null)
    }
  }
);

watch(
  () => props.templateId,
  () => {
    uploadStatus.value = ''
  }
)
</script>

<style scoped>

.attachment-section {
  margin-bottom: 5px;
  position: relative;
  z-index: 0;
  background-color: var(--secondary-color);
  text-align: center;
  border-radius: 5px;
}
.attachment-section-error {
  outline:1px solid var(--error-color);
  outline-offset:-1px; 
}
.attachment-section:hover {
  cursor: pointer;
  .file-upload{
    background-color: var(--not-filled-color-hover);
  }
  .file-upload-selected{
    background-color: var(--filled-color-hover);
  }
}
.file-upload {
  border-radius: 5px;
  background-color: var(--not-filled-color);
  display: flex;
  gap: 8px;

  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.file-upload-selected {
  background-color: var(--filled-color);
  align-items: left;
  justify-content: left;
  cursor: auto;
}
.file-upload-icon {
  display: inline;
  padding-left: 10px;
}
.file-uploaded-icon
{
  padding-left: 10px;
}
.file-upload-text {
  flex-direction: column;
  display: inline;
}
.attachment-title {
  font-size: 10px;
  color: #000;
}
.file-info {
  margin-top: 1px;
  color: #5f5f5f;
  font-size: 10px;
  word-break: break-word;
}
.file-info-selected {
  text-align: left;
  color: #000;
  max-width:200px;
}
.decline-icon {
  display: inline;
  flex-grow: 1;
  text-align: right;
}
.no-cross {
  display: none;
}
.cross {
  margin-top: 5px;
  color: #5f5f5f;
  display: inline;
  cursor: pointer;
  margin-right: 5px;
}
.loader-overlay {
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(233, 225, 239, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.error-text {
  color: var(--error-color);
  margin-left: 5px;
  font-size: 10px;
}

</style>