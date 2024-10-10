<template>
  <div class="chat-list">
    <div class="chat-list__container">
      <h2 class="chat-list__title">Чаты</h2>

      <ChatFilter class="chat-list__filter" @update="getFilter" v-if="filterEnabled" />

      <div class="chat-list__items">
        <div class="chat-list__fixed-items-top">
          <chat class="chat-list__item" v-for="chat in getSortedAndFilteredChats().filter(c => c.isFixedTop)"
            :key="chat.chatId" :chat="chat" @select="selectChat" @action="action" />
        </div>

        <div class="chat-list__scrollable-items">
          <chat class="chat-list__item"
            v-for="chat in getSortedAndFilteredChats().filter(c => !c.isFixedBottom && !c.isFixedTop)"
            :key="chat.chatId" :chat="chat" @select="selectChat" @action="action" />
        </div>

        <div class="chat-list__fixed-items-bottom">
          <chat class="chat-list__item" v-for="chat in getSortedAndFilteredChats().filter(c => c.isFixedBottom)"
            :key="chat.chatId" :chat="chat" @select="selectChat" @action="action" />
        </div>
      </div>
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

// Define emits
const emit = defineEmits(['select', 'action']);

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

const action = (data) => emit('action', data);

// watch(() => props.chats, getSortedChats);
</script>

<style scoped lang="scss">
.chat-list {
  background-color: transparent;

  &__container {
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__filter {
    margin: 0 30px 30px 0;
  }

  &__items {
    overflow-y: auto;
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

  &__fixed-items-top,
  &__fixed-items-bottom {
    z-index: 100;
    display: block;
    position: sticky;
    background-color: var(--default-white);
  }

  &__fixed-items-top {
    top: 0;
  }


  &__fixed-items-bottom {
    bottom: 0;
  }

  &__title {
    margin-bottom: 20px;
    font-size: var(--h2-font-size);
    font-weight: var(--h2-font-weight);
  }
}

.dark {
  .chat-list {
    &__items {
      &::-webkit-scrollbar {
        background-color: var(--neutral-500);
      }

      &::-webkit-scrollbar-thumb {
        background-color: var(--neutral-200);
      }
    }
  }
}

.v-enter-active {
  transition: all 0.1s ease-out;
}

.v-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
