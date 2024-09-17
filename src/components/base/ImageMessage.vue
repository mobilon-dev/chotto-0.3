<template>
  <div class="image-message">
    <img :src="message.url" :alt="message.alt" />
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
</script>

<style scoped>
.image-message img {
  max-width: 100%;
  border-radius: 5px;
}
</style>
