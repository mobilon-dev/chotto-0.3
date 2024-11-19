<template>
  <div
    :class="getClass()"
    @click="selectChat"
  >
    <div
      class="chat-item__container"
      @mouseenter="showMenu"
      @mouseleave="hideMenu"
    >
      <div class="chat-item__avatar-container">
        <span
          class="chat-item__status-user"
          :style="{ backgroundColor: props.chat.status }"
        />
        <img
          v-if="props.chat.avatar"
          :src="props.chat.avatar"
          height="48"
          width="48"
        >
        <span
          v-else
          class="pi pi-user"
        />
      </div>

      <div class="chat-item__info-container">
        <div class="chat-item__name">
          {{ chat.name }}
        </div>

        <div
          v-if="chat.lastMessage || chat.typing"
          class="chat-item__last-message"
        >
          {{ showText }}
        </div>
      </div>

      <div class="chat-item__details-container">
        <div
          v-if="!(buttonMenuVisible && chat.actions) && chat['lastActivity.time']"
          class="chat-item__time"
        >
          {{ chat['lastActivity.time'] }}
        </div>
        <div
          v-if="chat.countUnread > 0"
          class="chat-item__unread"
        >
          {{ chat.countUnread }}
        </div>

        <button
          v-if="buttonMenuVisible && chat.actions"
          class="chat-item__menu-button"
          @click="isOpenMenu = !isOpenMenu"
        >
          <span class="pi pi-ellipsis-h" />
        </button>

        <div
          v-if="chat.countUnread < 1"
          class="chat-item__status-chat-container"
        >
          <div
            v-if="chat.statusMessage"
            class="chat-item__status-message"
            :class="getStatus"
          >
            <span
              v-if="chat.statusMessage !== 'send'"
              class="pi pi-check"
            />
            <span class="pi pi-check" />
          </div>

          <span
            v-if="(chat.isFixedTop || chat.isFixedBottom)"
            class="chat-item__fixed pi pi-thumbtack"
          />
        </div>
      </div>

      <transition name="menu">
        <ContextMenu
          v-if="isOpenMenu && chat.actions"
          class="chat-item__context-menu"
          :actions="chat.actions"
          @click="clickAction"
        />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ContextMenu from './ContextMenu.vue'
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
  switch (props.chat.statusMessage) {
    case 'read':
      return 'chat-item__status-message--read'
    case 'received':
      return 'chat-item__status-message--received'
    default:
      return ''
  }
})

let timer;
const typingText = 'typing...';
const isTypingText = ref(false);

const showText = computed(() => {
  if (props.chat.typing) {
    return isTypingText.value ? typingText : props.chat.lastMessage;
  } else {
    return props.chat.lastMessage;
  }
});

onMounted(() => {
  if (props.chat.typing) {
    timer = setInterval(() => {
      isTypingText.value = !isTypingText.value;
    }, 2000);
  }
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style
  scoped
  lang="scss"
>
.chat-item {


  &__container {
    display: flex;
    position: relative;
    padding: var(--chat-item-padding-container);
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      background-color: var(--neutral-200);
    }
  }

  &__selected {
    cursor: pointer;
    border-radius: var(--chat-item-border-radius);
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
    background-color: var(--neutral-300);
    min-width: var(--avatar-width-medium);
    min-height: var(--avatar-height-medium);
    border-radius: var(--avatar-border-radius);

    span {
      font-size: var(--avatar-icon-size-medium);
      color: var(--neutral-500);
    }

    img {
      border-radius: var(--avatar-border-radius);
      object-fit: cover;
    }
  }

  &__status-user {
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
    align-self: flex-start;
    margin-right: 15px;
  }

  &__name {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: var(--chat-item-font-weight-name);
  }

  &__last-message {
    font-size: 14px;
    font-weight: var(--chat-item-font-weight-last-message);
    color: var(--chat-item-color-last-message);
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

  &__menu-button {
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    background-color: var(--chat-list-menu-button);
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
      color: var(--chat-list-menu-button-color-hover);
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
    min-width: 22px;
    min-height: 22px;
    font-size: 14px;
    color: var(--chat-item-color-unread);
    background-color: var(--chat-item-bg-unread);
  }

  &__time {
    font-size: var(--chat-item-font-size-time);
    color: var(--chat-item-color-time);
    font-weight: var(--chat-item-font-weight-time);

  }

  &__context-menu {
    position: absolute;
    top: 40%;
    right: 0;
  }

  &__status-chat-container {
    display: flex;
    align-items: center;
    column-gap: 4px;
    margin-top: auto;
  }

  &__status-message {
    display: flex;

    span {
      font-weight: 400;
      color: var(--chat-item-message-status-color-received);
      font-size: var(--chat-item-message-status-font-size);
    }
  }

  &__status-message--received {
    span {
      color: var(--chat-item-message-status-color-received);

      &:first-child {
        margin-right: -8px;
      }
    }
  }

  &__status-message--read {
    span {
      color: var(--chat-item-message-status-color-read);

      &:first-child {
        margin-right: -8px;
      }
    }
  }

}

.text-enter-active,
.text-leave-active {
  transition: opacity 0.2s ease;
}

.text-enter-from,
.text-leave-to {
  opacity: 0;
}

.menu-enter-active {
  transition: all 0.2s ease-out;
}

.menu-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.menu-enter-from,
.menu-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
