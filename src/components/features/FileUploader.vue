<template>
  <div>
    <!-- Шаг 1: Пользователь выбирает файл -->
    <input type="file" @change="onFileSelected" />

    <!-- Шаг 2: Информационное поле о загрузке файла -->
    <div v-if="uploadStatus === 'success'">
      <p>Файл загружен и готов к отправке.</p>
      {{ fileLink }}
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

const selectedFile = ref(null);
const uploadStatus = ref('');
const fileLink = ref('');

const onFileSelected = (event) => {
  selectedFile.value = event.target.files[0];
  if (selectedFile.value) {
    uploadFile();
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
  } catch (error) {
    console.error('Ошибка при загрузке файла:', error);
    uploadStatus.value = 'error';
  }
};

</script>
