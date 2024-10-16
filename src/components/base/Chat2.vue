<template>
  <div :class="getClass()" @click="selectChat">
    <div class="chat-item__container" @mouseenter="showMenu" @mouseleave="hideMenu">
      <div class="chat-item__avatar-container">
        <span class="chat-item__status" :style="{ backgroundColor: props.chat.status }"></span>
        <img v-if="props.chat.avatar" :src="props.chat.avatar" height="32" width="32">
        <span v-else class="pi pi-user">
        </span>
      </div>

      <div class="chat-item__info-container">
        <div class="chat-item__name">{{ chat.name }}</div>
        <div class="chat-item__last-message" v-if="chat.lastMessage">{{ chat.lastMessage }}</div>
      </div>

      <div class="chat-item__details-container">
        <div class="chat-item__time" v-if="!(buttonMenuVisible && chat.actions) && chat['lastActivity.time']">{{ chat['lastActivity.time']
          }}
        </div>
        <div class="chat-item__unread" v-if="!(buttonMenuVisible && chat.actions) && chat.countUnread > 0">{{ chat.countUnread }}</div>



        <button v-if="buttonMenuVisible && chat.actions" class="chat-item__menu-button"
          @click="isOpenMenu = !isOpenMenu">
          <span class="pi pi-ellipsis-h"></span>
        </button>


        <span v-if="chat.isFixedTop || chat.isFixedBottom" class="chat-item__fixed pi pi-thumbtack"></span>
      </div>

      <transition>
        <ContextMenu class="chat-item__context-menu" v-if="isOpenMenu && chat.actions" :actions="chat.actions"
          @click="clickAction" />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ContextMenu from '../features/ContextMenu.vue'
// Define props
const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});

// Define emits
const emit = defineEmits(['select', 'action']);

// Define method
const selectChat = () => { emit('select', props.chat); }

const getClass = () => {
  return props.chat.isSelected ? 'chat-item__selected' : 'chat-item';
}

const clickAction = (action) => {
  // console.log('action', props.chat.chatId, action);
  hideMenu();
  emit('action', { chatId: props.chat.chatId, ...action });
}


// Управление видимостью меню
const isOpenMenu = ref(false)
const buttonMenuVisible = ref(false);

const showMenu = () => {
  buttonMenuVisible.value = true;
};

const hideMenu = () => {
  buttonMenuVisible.value = false;
  isOpenMenu.value = false
};

const getStatus = computed(() => {
  switch (props.chat.status) {
    case 'online':
      return 'chat-item__status--online'
    case 'offline':
      return 'chat-item__status--offline'
    case 'sleep':
      return 'chat-item__status--sleep'
  }
})

</script>

<style scoped lang="scss">
.chat-item {

  &__container {
    display: flex;
    position: relative;
    padding: 15px;
    cursor: pointer;
  }

  &__selected {
    border-radius: 6px;
    cursor: pointer;
    background: var(--chat-item-selected);

    .chat-item__menu-button {
      background: var(--chat-item-selected);
    }
  }

  &__avatar-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
    margin-right: 15px;
    background-color: var(--avatar-background-color);
    width: var(--avatar-width-medium);
    height: var(--avatar-height-medium);
    border-radius: var(--avatar-border-radius);

    span {
      font-size: var(--avatar-icon-size-medium);
      color: var(--avatar-icon-color);
    }
  }

  &__status {
    position: absolute;
    bottom: 0;
    right: 5px;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: transparent;
    z-index: 1;
  }

  &__info-container {
    flex-grow: 1;
    align-self: center;
    margin-right: 15px;
  }

  &__name {
    margin-bottom: 5px;
    font-weight: 600;
    font-size: var(--chat-item-font-size-name);
  }

  &__last-message {
    font-weight: 500;
    font-size: var(--chat-item-font-size-last-message);
    color: var(--chat-item-color-last-name);
  }

  &__details-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;

    span {
      color: var(--neutral-500);
    }
  }

  &__fixed {
    margin-top: auto;
  }

  &__menu-button {
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    background-color: var(--default-white);
    cursor: pointer;
    padding: 0;

    span {
      display: block;
      width: fit-content;
      margin-left: auto;
      font-size: 18px;
      transition: 0.2s;
    }

    &:hover span {
      color: var(--neutral-700);
      transition: 0.2s;
    }
  }

  &__unread {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-weight: 400;
    margin-left: auto;
    margin-top: auto;
    min-width: var(--chat-item-min-width-unread);
    min-height: var(--chat-item-min-height-unread);
    color: var(--chat-item-color-unread);
    background-color: var(--chat-item-background-color-unread);
    font-size: var(--chat-item-font-size-unread);
  }

  &__time {
    font-size: 12px;
    color: var(--neutral-400);
    font-weight: 500;

  }

  &__context-menu {
    position: absolute;
    top: 40%;
    right: 0;
  }
}

.dark {
  .chat-item {

    &__selected {
      background: var(--d-chat-item-selected);

      .chat-item__menu-button {
        background: var(--d-chat-item-selected);
      }
    }

    &__menu-button {
      background-color: var(--neutral-900);

      &:hover span {
        color: var(--neutral-200);
      }
    }

    &__avatar-container {
      background-color: var(--d-avatar-background-color);

      span {
        color: var(--d-avatar-icon-color);
      }
    }

    &__last-message {
      color: var(--d-chat-item-color-last-name);
    }

    &__unread {
      background-color: var(--d-chat-item-background-color-unread);
      color: var(--d-chat-item-color-unread);
    }
  }
}

.v-enter-active {
  transition: all 0.2s ease-out;
}

.v-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
