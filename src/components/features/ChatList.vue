<template>
  <div class="chat-list">
    <!-- div class="chat-list__container" -->
      <div 
        class="chat-list__title-container"
        @mouseleave="hideMenu"
        >
        <h2
          v-if="title"
          class="chat-list__title"
        >
          {{ title }}
        </h2>

        <button
          v-if="actions.length"
          class="chat-list__button-actions"
          @click="isOpenMenu = !isOpenMenu"
        >
          <span
            v-if="isOpenMenu"
            class="pi pi-minus"
          />
          <span
            v-else
            class="pi pi-plus"
          />
        </button>

        <transition>
          <ContextMenu
            v-if="isOpenMenu && actions"
            :actions="actions"
            class="chat-list__context-menu"
            @click="action"
          />
        </transition>
      </div>


      <ChatFilter
        v-if="filterEnabled"
        class="chat-list__filter"
        @update="getFilter"
      />

      <div class="chat-list__items">
        <div class="chat-list__fixed-items-top">
          <chat
            v-for="chat in getSortedAndFilteredChats().filter(c => c.isFixedTop)"
            :key="chat.chatId"
            class="chat-list__item"
            :chat="chat"
            @select="selectChat"
            @action="action"
          />
        </div>

        <div class="chat-list__scrollable-items">
          <chat
            v-for="chat in getSortedAndFilteredChats().filter(c => !c.isFixedBottom && !c.isFixedTop)"
            :key="chat.chatId"
            class="chat-list__item"
            :chat="chat"
            @select="selectChat"
            @action="action"
          />
        </div>

        <div class="chat-list__fixed-items-bottom">
          <chat
            v-for="chat in getSortedAndFilteredChats().filter(c => c.isFixedBottom)"
            :key="chat.chatId"
            class="chat-list__item"
            :chat="chat"
            @select="selectChat"
            @action="action"
          />
        </div>
      </div>
    <!-- /div -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Chat from "./Chat.vue";
import ChatFilter from './ChatFilter.vue';
import ContextMenu from '../features/ContextMenu.vue'

const filter = ref('');
const isOpenMenu = ref(false)

const hideMenu = () => {
  isOpenMenu.value = false
}

// Define props
const props = defineProps({
  title: {
    type: String,
    default: 'Чаты',
  },
  chats: {
    type: Array,
    required: true,
  },
  actions: {
    type: Array,
    required: false,
    default: () => [],
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
    .toSorted((a, b) => {   // immutable sort
      if (a.countUnread > b.countUnread) return -1;
      if (a.countUnread < b.countUnread) return 1;
      if (a.countUnread == b.countUnread) return 0;
    })
    .filter(c => c.name.includes(filter.value));
}

const getFilter = (value) => {
  // console.log('filter', value);
  filter.value = value;
}

const action = (data) => emit('action', data);

// watch(() => props.chats, getSortedChats);
</script>

<style
  scoped
  lang="scss"
>
.chat-list {
  background-color: transparent;
  flex-grow: 1;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  height: 80%;

  /*
  &__container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
    */

  &__filter {
    margin: var(--chat-list-filter-margin);
  }

  &__items {
    display: block;
    height: '30vh';
    scroll-behavior: smooth;

    overflow-y: auto;
    padding: var(--chat-list-items-padding);

    &::-webkit-scrollbar {
      width: 6px;
      background-color: var(--scrollbar-bg);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--scrollbar-thumb-bg);
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
    background-color: var(--chat-list-fixed-background-color);
  }

  &__fixed-items-top {
    top: 0;
  }


  &__fixed-items-bottom {
    bottom: 0;
  }

  &__title {
    font-size: var(--h2-font-size);
    font-weight: var(--h2-font-weight);
  }

  &__title-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 50px;
    padding: 0 12px 20px 9px;
  }

  &__button-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--chat-list-button-actions-width);
    height: var(--chat-list-button-actions-height);
    border: none;
    background-color: var(--chat-list-button-actions-bg);
    border-radius: 50%;
    opacity: 0.8;
    cursor: pointer;

    span {
      font-size: var(--icon-font-size-small);
      color: var(--chat-list-button-actions-color);
      transition: all 0.2s;
    }
  }

  &__context-menu {
    position: absolute;
    top: 46px;
    right: 20px;
  }
}

.menu-enter-active {
  transition: all 0.1s ease-out;
}

.menu-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.menu-enter-from,
.menu-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
