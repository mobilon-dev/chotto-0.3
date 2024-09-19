<template>
  <div :class="getClass(message)">
    <p>{{ message.text }}</p>
  </div>
</template>

<script setup>

// Define props
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

function getClass(message) {
  return message.direction === 'incoming' ? 'text-message-left' : 'text-message-right';
}
</script>

<style scoped>

.text-message-left {
  /* display: flex; */
  background-color: #c3e8ba;
  max-height: 50px;
  min-width: 300px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  max-width: 70%; /* Максимальная ширина сообщения */
  text-align: left; /* Выравнивание текста влево */
  position: relative; /* Для позиционирования треугольника */
  justify-content: flex-start;
  flex-basis: 200px; /* Начальная ширина */
  flex-grow: 2;
  align-self: flex-start; /* Сообщения выравниваются слева */
}

.text-message-right {
  /* display: flex; */
  background-color: #f5f5f5;
  max-height: 50px;
  min-width: 300px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  max-width: 70%; /* Максимальная ширина сообщения */  
  position: relative; /* Для позиционирования треугольника */
  justify-content: flex-end;
  flex-basis: 500px; /* Начальная ширина */
  flex-grow: 2;
  align-self: flex-end; /* Сообщения выравниваются справа */
}

</style>
