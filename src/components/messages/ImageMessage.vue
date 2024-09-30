<template>
  <div :class="getClass()" :messageId="message.messageId">
    <img :src="message.url" :alt="message.alt" class="image-message" />
    <div class="message-time">
      {{ message.time }}
    </div>
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

function getClass() {
  return props.message.position === 'left' ? 'image-message-left' : 'image-message-right';
}

</script>

<style scoped>
.image-message {
  max-width: 300px;
  max-height: 240px;
  height: auto;
  border-radius: 5px;
}


.image-message-left {
  /* display: flex; */
  background-color: #c3e8ba;
  max-height: 50px;
  min-width: 300px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  max-width: 70%;
  /* Максимальная ширина сообщения */
  text-align: left;
  /* Выравнивание текста влево */
  position: relative;
  /* Для позиционирования треугольника */
  justify-content: flex-start;
  flex-basis: 200px;
  /* Начальная ширина */
  flex-grow: 2;
  align-self: flex-start;
  /* Сообщения выравниваются слева */
}

.image-message-right {
  /* display: flex; */
  background-color: #f5f5f5;
  max-height: 50px;
  min-width: 300px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  max-width: 70%;
  /* Максимальная ширина сообщения */
  position: relative;
  /* Для позиционирования треугольника */
  justify-content: flex-end;
  flex-basis: 500px;
  /* Начальная ширина */
  flex-grow: 2;
  align-self: flex-end;
  /* Сообщения выравниваются справа */
}

.message-time {
  font-size: 12px;
  color: #777;
  margin-left: 10px;
}
</style>
