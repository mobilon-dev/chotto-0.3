<template>
  <div class="chat-list">
    <chat
      v-for="chat in getSortedChats()"
      :key="chat.chatId"
      :chat="chat"
      @select="selectChat"
    />
  </div>
</template>

<script setup>
import Chat from "../base/Chat2.vue";

// Define props
const props = defineProps({
  chats: {
    type: Array,
    required: true,
  },
});

// Define emits
const emit = defineEmits(['select']);

// Define method
const selectChat = (chat) => {emit('select', chat)};

const getSortedChats = () => {  
  return props.chats.sort((a, b) => {
    if (a.countUnread > b.countUnread) return -1;
    if (a.countUnread < b.countUnread) return 1;
    if (a.countUnread == b.countUnread) return 0;
  });
}

// watch(() => props.chats, getSortedChats);
</script>

<style scoped>
.chat-list {
  max-height: 400px;
  overflow-y: auto;
  grid-column: span 1;
}
</style>
