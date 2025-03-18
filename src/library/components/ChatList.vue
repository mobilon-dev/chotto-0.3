<template>
  <div class="chat-list">
    <div
      class="chat-list__title-container"
      @mouseleave="hideMenu"
    >
      <h2
        
        class="chat-list__title"
      >
        {{ t('component.ChatList.Title') }}
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

    <slot name="sidebar" />

    <ChatFilter
      v-if="filterEnabled"
      class="chat-list__filter"
      @update="getFilter"
    />

    <div 
      ref="refChatList"
      class="chat-list__items"
      @scroll="scrollCheck"
      @mousedown="startScrollWatch"
      @mouseup="stopScrollWatch"
    >
      <div class="chat-list__fixed-items-top">
        <ChatItem
          v-for="chat in getSortedAndFilteredChats().filter(c => c.isFixedTop)"
          :key="chat.chatId"
          class="chat-list__item"
          :chat="chat"
          @select="selectChat"
          @action="action"
        />
      </div>

      <div class="chat-list__scrollable-items">
        <ChatItem
          v-for="chat in getSortedAndFilteredChats().filter(c => !c.isFixedBottom && !c.isFixedTop)"
          :key="chat.chatId"
          class="chat-list__item"
          :chat="chat"
          @select="selectChat"
          @action="action"
        />
      </div>

      <div class="chat-list__fixed-items-bottom">
        <ChatItem
          v-for="chat in getSortedAndFilteredChats().filter(c => c.isFixedBottom)"
          :key="chat.chatId"
          class="chat-list__item"
          :chat="chat"
          @select="selectChat"
          @action="action"
        />
      </div>
    </div>
    <transition>
      <button
        v-if="isShowButton"
        class="chat-list__button-up"
        @click="scrollToTopForce"
      >
        <span class="pi pi-angle-up chat-list__icon-down" />
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, unref, watch, nextTick } from 'vue';
import { ChatItem, ChatFilter, ContextMenu } from "./";
import { t } from '../../locale/useLocale';

// Define props
const props = defineProps({
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
const emit = defineEmits(['select', 'action', 'loadMoreChats']);

const filter = ref('');
const isOpenMenu = ref(false)
const refChatList = ref()

const allowLoadMore = ref(false)
const isShowButton = ref(false)
const isScrollByMouseButton = ref(false)

const hideMenu = () => {
  isOpenMenu.value = false
}

function scrollToTopForce() {
  nextTick(function () {
    const element = unref(refChatList);
    element.scrollTop = 0;
  })
}

const scrollCheck = () => {
  const element = unref(refChatList);
  const scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
  if (element.scrollTop > 300){
    isShowButton.value = true
  }
  if (element.scrollTop <= 300){
    isShowButton.value = false
  }

  if (isScrollByMouseButton.value){
    if (scrollBottom < 200){    
      allowLoadMore.value = true  
    }
  }
  else{
    if (scrollBottom < 200){
      allowLoadMore.value = true
    }
    if (scrollBottom >= 200){
      allowLoadMore.value = false
    }
  }
};

watch(
  () => allowLoadMore.value,
  () => {
    if (allowLoadMore.value)
      emit('loadMoreChats')
  }
)

watch(
  () => props.chats,
  () => {
    allowLoadMore.value = false
    if (isScrollByMouseButton.value){
      element.scrollTop = 200
    }
  }
)

const startScrollWatch = (event) => {
  const element = unref(refChatList);
  const isScrollbar = event.offsetX > element.clientWidth || event.offsetY > element.clientHeight;
  if (isScrollbar) {
    isScrollByMouseButton.value = true
  }
}

const stopScrollWatch = () => {
  isScrollByMouseButton.value = false
}

// Define method
const selectChat = (args) => {
  props.chats.forEach(c => {
    c.isSelected = false
    if (c.dialogs) 
      c.dialogs.forEach(d => {
        d.isSelected = false
      })
  });
  if (args.dialog) {
    selectDialog(args.dialog)
  }
  const c = props.chats.find(c => c.chatId === args.chat.chatId);
  c.isSelected = true;
  emit('select', args);
};

const selectDialog = (dialog) => {
  props.chats.forEach(c => {
    c.isSelected = false
    if (c.dialogs) 
      c.dialogs.forEach(d => {
        d.isSelected = false
        if (d.dialogId == dialog.dialogId)
        d.isSelected = true
      })
  });
}

const getSortedAndFilteredChats = () => {
  return props.chats
    .toSorted((a, b) => {
      if (Number(a['lastActivity.timestamp']) > Number(b['lastActivity.timestamp'])) return -1;
      if (Number(a['lastActivity.timestamp']) < Number(b['lastActivity.timestamp'])) return 1;
      if (Number(a['lastActivity.timestamp']) == Number(b['lastActivity.timestamp'])) return 0;
    })
    .toSorted((a, b) => {   // immutable sort
      if (a.countUnread > b.countUnread) return -1;
      if (a.countUnread < b.countUnread) return 1;
      if (a.countUnread == b.countUnread) return 0;
    })
    .filter(c => {
      return c.name.includes(filter.value) ||
        c.metadata.includes(filter.value);
    });
}

const getFilter = (value) => {
  filter.value = value;
}

const action = (data) => emit('action', data);
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
  height: 70%;

  &__filter {
    margin: var(--chat-list-filter-margin);
  }

  &__items {
    display: block;
    scroll-behavior: smooth;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
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
    font-size: var(--chat-list-title-font-size);
    font-weight: var(--chat-list-title-font-weight);
  }

  &__title-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 50px;
    padding: var(--chat-list-title-container-padding);
  }

  &__button-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    opacity: 0.8;
    cursor: pointer;
    width: var(--chat-list-button-actions-width);
    height: var(--chat-list-button-actions-height);
    background-color: var(--chat-list-button-actions-bg);

    span {
      transition: all 0.2s;
      font-size: var(--icon-font-size-small);
      color: var(--chat-list-button-actions-color);
    }
  }

  &__context-menu {
    position: absolute;
    top: 46px;
    right: 20px;
  }

  &__button-up {
    position: absolute;
    z-index: 100;
    bottom: 15px;
    right: 25px;
    margin-left: auto;
    border: none;
    min-width: 46px;
    min-height: 46px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: var(--feed-button-down-bg);
  }

  &__icon-up {
    font-size: var(--feed-button-down-icon-font-size);
    color: var(--feed-button-down-icon-color);
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
