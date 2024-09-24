<template>
  <div class="file-message">
    <a :href="message.url" download>{{ message.filename }}</a>
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
// console.log(props.message)
</script>

<style scoped>
.file-message a {
  color: blue;
  text-decoration: underline;
}
</style>
