<script setup>
import { computed } from 'vue';

const props = defineProps({
  datetimeUTC: {
    type: String,
    default: new Date().toUTCString(),
    required: true,
    description: 'Дата сообщения',
  },
});

const messageTime = computed(() => {
  const date = new Date(props.datetimeUTC);
  const today = new Date();
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  if (date.toDateString() === today.toDateString()) {
    return 'сегодня';
  } else if (date.toDateString() === new Date(today - 86400000).toDateString()) {
    return 'вчера';
  } else {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
  }
});
</script>

<template>
  <div class="dateMessage">
    <p class="dateMessage__text">{{ messageTime }}</p>
  </div>
</template>

<style scoped lang="scss">
.dateMessage {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0 auto;
  padding: 15px 0;
  width: 150px;
  height: 40px;

  &__text {
    width: 100%;
    padding: 10px 15px;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    -webkit-box-shadow:
      0 2px 5px 0 rgba(193, 193, 193, 0.26),
      0 2px 10px 0 rgba(193, 193, 193, 0.16);
    -moz-box-shadow:
      0 2px 5px 0 rgba(193, 193, 193, 0.26),
      0 2px 10px 0 rgba(193, 193, 193, 0.16);
    box-shadow:
      0 2px 5px 0 rgba(193, 193, 193, 0.26),
      0 2px 10px 0 rgba(193, 193, 193, 0.16);
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.7);
    text-align: center;
  }
}
</style>
