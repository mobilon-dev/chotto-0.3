<template>
  <div
    class="chat"
    @click="selectChat"
  >
    <p>{{ chat.name }} {{ chat.countUnread }}</p>
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

// Define emits
const emit = defineEmits(['select']);

// Define method
const selectChat = () => {emit('select', props.chat);}
</script>

<style scoped>
.chat {
  cursor: pointer;
  padding: 8px;
  border-bottom: 1px solid #ccc;
}
</style>
