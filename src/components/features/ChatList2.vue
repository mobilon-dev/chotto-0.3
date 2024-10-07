<template>
  <div class="chat-list">
    <div class="chat-list__container">
      <h2 class="chat-list__title">Чаты</h2>
      <ChatFilter class="chat-list__filter" @update="getFilter" v-if="filterEnabled" />
      <div class="chat-list__items" @contextmenu.prevent="showRightClickDialog">
        <chat class="chat-list__item" v-for="chat in getSortedAndFilteredChats()" :key="chat.chatId" :chat="chat"
          @select="selectChat" :data-chat-info="JSON.stringify(chat)" />
      </div>

      <ThemeMode />

      <Transition>
        <div class="chat-list__context-menu" v-if="isContextMenu"
          :style="{ top: selectedChatY + 'px', left: selectedChatX + 'px' }">
          <ul class="chat-list__context-list">
            <li class="chat-list__context-item" @click="fixChat">
              <span class="pi pi-thumbtack"></span>
              <span v-if="!chatInfo.isFixed">Закрепить</span>
              <span v-else>Открепить</span>
            </li>
            <li class="chat-list__context-item">
              <span class="pi pi-pencil"></span>
              <span>что-то еще</span>
            </li>
            <li class="chat-list__context-item">
              <span class="pi pi-plus"></span>
              <span>что-то еще</span>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Chat from "../base/Chat2.vue";
import ChatFilter from '../base/ChatFilter.vue';
import ThemeMode from './ThemeMode.vue';

const filter = ref('');
const isContextMenu = ref(false)
const selectedChatX = ref(0);
const selectedChatY = ref(0);
const chatInfo = ref(null)

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

const showRightClickDialog = (evt) => {
  const target = evt.target.closest('.chat-list__item');
  if (target) {
    chatInfo.value = JSON.parse(target.dataset.chatInfo);
    isContextMenu.value = !isContextMenu.value
    selectedChatX.value = evt.clientX;
    selectedChatY.value = evt.clientY;
  }
}

const fixChat = () => {
  const chat = props.chats.find(element => element.chatId === chatInfo.value.chatId);
  isContextMenu.value = !isContextMenu.value
  chat.isFixed = !chat.isFixed
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
    margin-bottom: 20px;
    font-size: var(--h2-font-size);
    font-weight: var(--h2-font-weight);
  }

  &__context-menu {
    position: absolute;
    width: fit-content;
    z-index: 100;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.11);
    border-radius: var(--context-menu-border-radius);
    padding: var(--context-menu-padding);
    background-color: var(--context-menu-background);
  }

  &__context-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: var(--context-menu-list-row-gap);
  }

  &__context-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    column-gap: var(--context-menu-item-column-gap);

    span {
      font-weight: 500;
    }
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

    &__context-menu {
      background-color: var(--d-context-menu-background);
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
