<template>
  <div class="chat-info">
    <div v-if="chat">
      <h2>{{ chat.name }}</h2>
    </div>
  </div>
</template>

<script setup>

// Define props
const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.chat-info {
  padding: 16px;
}
</style>
