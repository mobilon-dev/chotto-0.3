<template>
  <div>
    <ChatFilter @update="getFilter" v-if="filterEnabled"/>
    <div class="chat-list">
      <chat
        v-for="chat in getSortedAndFilteredChats()"
        :key="chat.chatId"
        :chat="chat"
        @select="selectChat"
      />
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import Chat from "../base/Chat2.vue";
import ChatFilter from '../base/ChatFilter.vue';

const filter = ref('');
// Define props
const props = defineProps({
  chats: {
    type: Array,
    required: true,
  },
  filterEnabled: {
    type: Boolean,
    required: true,
  },
});

// Define emits
const emit = defineEmits(['select']);

// Define method
const selectChat = (chat) => {
  emit('select', chat);
  props.chats.forEach(c => c.isSelected = false);
  const c = props.chats.find(c => c.chatId === chat.chatId);
  c.isSelected = true;
};

const getSortedAndFilteredChats = () => {
  return props.chats
    .sort((a, b) => {
      if (a.countUnread > b.countUnread) return -1;
      if (a.countUnread < b.countUnread) return 1;
      if (a.countUnread == b.countUnread) return 0;
    })
    .filter(c => c.name.includes(filter.value));
  ;
}

const getFilter = (value) => {
  // console.log('filter', value);
  filter.value = value;
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
