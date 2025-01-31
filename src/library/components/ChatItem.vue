<template>
  <div>
    <div
    class="chat-item__container"
    :class="getClass()"
    @mouseenter="showMenu"
    @mouseleave="hideMenu"
    @click="selectChat"
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
      <Tooltip :text="chat.name" position="bottom">
        <div class="chat-item__name">
        {{ chat.name }}
      </div>
      </Tooltip>
      
      <Tooltip :text="chat.lastMessage" position="bottom">
        <div
        v-if="chat.lastMessage || chat.typing"
        class="chat-item__last-message"
      >
        {{ showText }}
      </div>
      </Tooltip>
      
    </div>

    <div class="chat-item__details-container">
      <div
        v-if="chat['lastActivity.time'] && !buttonMenuVisible"
        class="chat-item__time"
      >
        {{ chat['lastActivity.time'] }}
      </div>
      <div
        v-if="chat.countUnread > 0"
        class="chat-item__unread"
        :style="{backgroundColor: chat.colorUnread ? chat.colorUnread : null}"
      >
        {{ chat.countUnread > 99 ? '99+' : chat.countUnread }}
      </div>

      <button
        v-if="buttonMenuVisible && chat.actions"
        class="chat-item__menu-button"
        @click="handleOpenMenu"
        id="noSelectButton"
      >
        <span id="noSelectButton" class="pi pi-ellipsis-h" />
      </button>

      <div
        v-if="chat.countUnread < 1"
        class="chat-item__status-chat-container"
      >
        <div
          v-if="statuses.includes(chat['lastMessage.status'])"
          class="chat-item__status-message"
          :class="status"
        >
          <span
            v-if="chat['lastMessage.status'] !== 'sent'"
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

    <div
      v-if="chat.dialogs" 
      class="chat-item__dialog-buttons"
    >
      <button
        v-if="!chat.dialogsExpanded"
        class="chat-item__menu-button"
        @click="chat.dialogsExpanded = !chat.dialogsExpanded"
        id="noSelectButton"
      >
        <span id="noSelectButton" class="pi pi-angle-down" />
      </button>
      <button
        v-if="chat.dialogsExpanded"
        class="chat-item__menu-button"
        @click="chat.dialogsExpanded = !chat.dialogsExpanded"
        id="noSelectButton"
      >
        <span id="noSelectButton" class="pi pi-angle-up" />
      </button>
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

  <div 
    v-if="chat.dialogsExpanded"
    class="chat-item__dialog-container"
  >
    <div
      v-for="dialog in getSortedDialogs()"
      class="chat-item__dialog-item"
      :class="getDialogClass(dialog)"
      @click="selectDialog(dialog)"
    >
      <img
        v-if="dialog.icon"
        :src="dialog.icon"
        height="16"
        width="16"
      >
      <span
        v-else
        class="pi pi-user"
      />
      <div>{{ dialog.name }}</div>
      <div>{{ dialog['lastActivity.time'] }}</div>
      <div
        v-if="dialog.countUnread > 0"
        class="chat-item__unread"
        :style="{backgroundColor: dialog.colorUnread ? dialog.colorUnread : null}"
      >
        {{ dialog.countUnread > 99 ? '99+' : dialog.countUnread }}
      </div>
    </div>
  </div>
  </div>
  
</template>

<script setup>
import { ref, computed, watch } from 'vue'

import { ContextMenu } from '.'
import { getStatus, statuses } from "../../helpers";
import { t } from '../../locale/useLocale'
import Tooltip from './Tooltip.vue';

const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['select', 'action']);

const selectChat = (event) => { 
  if (event.target.id != 'noSelectButton' && !props.chat.dialogs)
    emit('select', {chat: props.chat, dialog: null});
  if (props.chat.dialogs)
  props.chat.dialogsExpanded = !props.chat.dialogsExpanded
}

const selectDialog = (dialog) => {
    emit('select', {chat: props.chat, dialog: dialog});
}

const getClass = () => {
  return props.chat.isSelected ? 'chat-item__selected' : '';
}

const getDialogClass = (dialog) => {
  return dialog.isSelected ? 'chat-item__dialog-selected' : ''
}

const clickAction = (action) => {
  // console.log('action', props.chat.chatId, action);
  hideMenu();
  emit('action', { chatId: props.chat.chatId, ...action });
}

const isOpenMenu = ref(false)
const buttonMenuVisible = ref(false);

const getSortedDialogs = () => {
  return props.chat.dialogs
    .toSorted((a, b) => {
      if (Number(a['lastActivity.timestamp']) > Number(b['lastActivity.timestamp'])) return -1;
      if (Number(a['lastActivity.timestamp']) < Number(b['lastActivity.timestamp'])) return 1;
      if (Number(a['lastActivity.timestamp']) == Number(b['lastActivity.timestamp'])) return 0;
    })
}

const handleOpenMenu = (event) => {
  isOpenMenu.value = !isOpenMenu.value
}

const showMenu = () => {
  buttonMenuVisible.value = true;
};

const hideMenu = () => {
  buttonMenuVisible.value = false;
  isOpenMenu.value = false
};

const status = computed(() => getStatus(props.chat['lastMessage.status']))

let timer;
const typingIndex = ref(0)
const typingText = [t('component.ChatItem.typing') + '.', t('component.ChatItem.typing') + '..', t('component.ChatItem.typing') + '...']

const showText = computed(() => {
  if (props.chat.typing) {
    return typingText[typingIndex.value];
  } else {
    return props.chat.lastMessage;
  }
});

watch(
  () => props.chat.typing,
  () => {
    if (props.chat.typing) {
      timer = setInterval(() => {
        if (typingIndex.value < 2) {
          typingIndex.value += 1
        }
        else {
          typingIndex.value = 0
        }
      }, 1000);
    }
    else {
      typingIndex.value = 0
      clearInterval(timer);
    }
  },
  { immediate: true }
)


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
      background-color: var(--chat-item-background-color);
    }
  }

  &__dialog-container {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: var(--chat-item-padding-container);
    cursor: pointer;
    gap: 5px;
    padding-left: 80px;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      background-color: var(--chat-item-background-color);
    }
  }

  &__dialog-item{
    display: flex;
  }

  &__dialog-selected {
    cursor: pointer;
    border-radius: var(--chat-item-border-radius);
    background: var(--dialog-item-selected-color);
  }

  &__selected {
    cursor: pointer;
    border-radius: var(--chat-item-border-radius);
    background: var(--chat-item-selected-color);

    .chat-item__menu-button {
      background: var(--chat-item-selected-color);
    }
  }

  &__avatar-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    object-fit: cover;
    margin-right: 15px;
    background-color: var(--avatar-background-color);
    min-width: var(--avatar-width-medium);
    min-height: var(--avatar-height-medium);
    border-radius: var(--avatar-border-radius);

    span {
      font-size: var(--avatar-icon-size-medium);
      color: var(--avatar-color);
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
    overflow: hidden;
  }

  &__name {
    margin-bottom: 8px;
    font-size: var(--chat-item-name-font-size);
    font-weight: var(--chat-item-name-font-weight);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  &__last-message {
    font-size: var(--chat-item-last-message-font-size);
    font-weight: var(--chat-item-last-message-font-weight);
    color: var(--chat-item-last-message-color);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;

  }

  &__details-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    
    span {
      color: var(--chat-item-details-color);
    }
  }

  &__menu-button {
    order: 0;
    width: 100%;
    border: none;
    background-color: transparent;
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
      color: var(--chat-item-menu-button-color-hover);
      transition: 0.2s;
    }
  }

  &__unread {
    order: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-weight: var(--chat-item-unread-font-weight);
    margin-left: auto;
    margin-top: auto;
    min-width: 22px;
    min-height: 22px;
    font-size: var(--chat-item-unread-font-size);
    color: var(--chat-item-unread-color);
    background-color: var(--chat-item-unread-bg);
  }

  &__time {
    font-size: var(--chat-item-time-font-size);
    color: var(--chat-item-time-color);
    font-weight: var(--chat-item-time-font-weight);
    white-space: nowrap;
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
      font-weight: var(--chat-item-message-status-font-weight);
      color: var(--chat-item-message-status-color-received);
      font-size: var(--chat-item-message-status-font-size);
    }
  }
}

.status--received span {
  color: var(--chat-item-message-status-color-received);
}

.status--read span {
  color: var(--chat-item-message-status-color-read);
}

.status--received span:first-child,
.status--read span:first-child {
  margin-right: -8px;
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
