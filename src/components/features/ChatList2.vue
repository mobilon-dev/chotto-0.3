<template>
  <div class="chat-list">
    <div class="chat-list__container">
      <h2 class="chat-list__title">Чаты</h2>
      <ChatFilter class="chat-list__filter" @update="getFilter" v-if="filterEnabled" />
      <div class="chat-list__items">
        <chat v-for="chat in getSortedAndFilteredChats()" :key="chat.chatId" :chat="chat" @select="selectChat" />
      </div>
      <button @click="toggleDarkMode" style="width: 150px; height: 20px; margin-top: 50px;">Смена темы</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
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

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
}

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

<style scoped lang="scss">
.chat-list {
  background-color: transparent;

  &__container {
    padding: 30px 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  &__filter {
    margin: 0 30px 30px 0;
  }

  &__items {
    overflow: auto;
    padding-right: 20px;

    &::-webkit-scrollbar {
      width: 6px;
      background-color: var(--neutral-50);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--neutral-300);
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }
  }

  &__title {
    font-size: var(--h2-font-size);
    font-weight: var(--h2-font-weight);
    margin-bottom: 20px;
  }
}

.dark {
  .chat-list {
    &::-webkit-scrollbar {
      background-color: var(--neutral-500);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--neutral-200);
    }
  }
}
</style>
