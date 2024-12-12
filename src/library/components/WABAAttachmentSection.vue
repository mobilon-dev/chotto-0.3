<template>
  <section class="attachment-section" :class="{'attachment-section-error' : error}">
    <div class="file-upload" :class="{ 'file-upload-selected': uploadStatus === 'success' }" @click="triggerFileUpload">
        <input type="file" id="file-upload" ref="fileInput"
          style="display: none;" @change="handleFileChange" :accept="fileInfo[type].accept">
        <span
          v-if="uploadStatus !== 'success'"
          class="pi pi-paperclip file-upload-icon" 
        />
        <span
          v-else-if="uploadStatus === 'success'"
          class="file-uploaded-icon"
          :class="fileInfo[type].icon"
        />
        <div class="file-upload-text">
          <h2 class="attachment-title open-sans-bold">
            {{ uploadStatus != 'success' ? 'Прикрепить файл' : null}}
          </h2>
          <h2 class="file-info open-sans" :class="{'file-info-selected' : uploadStatus === 'success'}">
            {{ uploadStatus === 'success' ? selectedFile?.name : fileInfo[type].text }}
          </h2>
        </div>
        <div :class="{'decline-icon' : uploadStatus === 'success'}">
        <span
          class="pi pi-times no-cross"
          :class="{cross: uploadStatus === 'success'}"
          @click="handleFileDecline"
        />
        </div>
    </div>
  </section>
  <div v-if="error" class="error-text">{{ error }}</div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from "vue";

    
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
      console.log('Selected file:', file);
      selectedFile.value = file
      uploadFile()
    }
  }
};

const uploadFile = async () => {
  uploadStatus.value = "uploading";

  const formData = new FormData();
  if (selectedFile.value) formData.append("file", selectedFile.value);

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

    // emit event with link
    /*setMessageFile({
      url: result.url,
      name: selectedFile.value.name,
      size: selectedFile.value.size,
      type: getTypeFileByMime(selectedFile.value.type),
    })*/
   console.log(result)
  } catch (error) {
    console.error("Ошибка при загрузке файла:", error);
    uploadStatus.value = "error";
  }
};

const handleFileDecline = (event) => {
  event.stopPropagation()
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
    }
  }
);
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