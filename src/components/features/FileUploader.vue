<template>
  <div>
    <input type="file" @change="onFileSelected" />
    <div v-if="uploadStatus === 'success'">
      <p>Файл загружен и готов к отправке.</p>
      <PreviewModal 
      v-if="isModalOpen" 
      :previewUrl="previewUrl"
      :isImage="isImage" 
      :isVideo="isVideo" 
      :fileName="selectedFile.name"
      :handleSendEventFunction='sendFunctionWrapper'
    />
    </div>
    <div v-else-if="uploadStatus === 'uploading'">
      <p>Загрузка файла...</p>
    </div>
    <div v-else-if="uploadStatus === 'error'">
      <p>Ошибка при загрузке файла.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PreviewModal from './PreviewModal.vue';

const props = defineProps({
  handleSendEventFunction: {
    type: Function,
    default: null,
  },
})

const selectedFile = ref(null);
const uploadStatus = ref('');
const fileLink = ref('');
const previewUrl = ref('');
const isImage = ref(false);
const isVideo = ref(false);
const isModalOpen = ref(false);

const emit = defineEmits(['file-uploaded']);

const onFileSelected = (event) => {
  console.log('onFileSelected', event.target.files[0]);
  selectedFile.value = event.target.files[0];
  if (selectedFile.value) {
    generatePreview();
    uploadFile();
    isModalOpen.value = true;
  }
};

const generatePreview = () => {
  const file = selectedFile.value;
  const fileType = file.type;
  console.log(fileType)

  if (fileType.startsWith('image/')) {
    isImage.value = true;
    isVideo.value = false;
  } else if (fileType.startsWith('video/')) {
    isImage.value = false;
    isVideo.value = true;
  } else {
    isImage.value = false;
    isVideo.value = false;
  }

  if (isImage.value || isVideo.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    previewUrl.value = ''; // No preview available
  }
};

const uploadFile = async () => {
  uploadStatus.value = 'uploading';
  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    const response = await fetch('https://filebump.services.mobilon.ru/upload', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    fileLink.value = result.url;
    uploadStatus.value = 'success';

    // emit event with link
    emit('file-uploaded', fileLink.value)
  } catch (error) {
    console.error('Ошибка при загрузке файла:', error);
    uploadStatus.value = 'error';
  }
};

const sendFunctionWrapper = () => {
  props.handleSendEventFunction({ ...fileLink.value, type: 'message.file'});
  uploadStatus.value = '';
  isModalOpen.value = false;
}

</script>

<style scoped>
.new-chat-modal {
  position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal-content {
  background-color: white;
	padding: 20px;
	border-radius: 8px;
	width: 300px;
}

.preview-image,
.preview-video {
  max-width: 200px;
  max-height: 200px;
  margin-top: 10px;
}
</style>
