<template>
  <div :class="getClass()" @click="selectChat">
    <div class="chat-item__container">
      <div class="chat-item__avatar-container">
        <img v-if="props.chat.avatar" :src="props.chat.avatar" height="32" width="32">
        <span v-else class="pi pi-user">
        </span>
      </div>
      <div class="chat-item__info-container">
        <div class="chat-item__name">{{ chat.name }}</div>
        <div class="chat-item__last-message" v-if="chat.lastMessage">{{ chat.lastMessage }}</div>
      </div>
      <div class="chat-item__details-container">
        <div class="chat-item__unread" v-if="chat.countUnread > 0">{{ chat.countUnread }}</div>
        <div class="chat-item__time" v-if="chat['lastActivity.time']">{{ chat['lastActivity.time'] }}</div>
        <span v-if="chat.isFixed" class="pi pi-thumbtack"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Define props
const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});

// Define emits
const emit = defineEmits(['select', 'uuu']);

// Define method
const selectChat = () => { emit('select', props.chat); }

const getClass = () => {
  return props.chat.isSelected ? 'chat-item__selected' : 'chat-item';
}

/*
const getAvatarImage = () => {
  if (props.chat.avatar) {
    return props.chat.avatar;
  } else {
    const svg = '<svg fill="#000000" width="800px" height="800px" viewBox="0 -2.93 32.537 32.537" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <g transform="translate(-481.391 -197.473)"> <path d="M512.928,224.152a.991.991,0,0,1-.676-.264,21.817,21.817,0,0,0-29.2-.349,1,1,0,1,1-1.322-1.5,23.814,23.814,0,0,1,31.875.377,1,1,0,0,1-.677,1.736Z"/> <path d="M498.191,199.473a7.949,7.949,0,1,1-7.949,7.95,7.959,7.959,0,0,1,7.949-7.95m0-2a9.949,9.949,0,1,0,9.95,9.95,9.949,9.949,0,0,0-9.95-9.95Z"/> </g> </g></svg>';
    const defaultAvatar = 'data:image/svg+xml;base64,' + window.btoa(svg);
    return defaultAvatar;
  }
}
*/

</script>

<style scoped lang="scss">
.chat-item {

  &__container {
    display: flex;

    padding: 15px;
    cursor: pointer;
  }

  &__selected {
    border-radius: 6px;
    cursor: pointer;
    background: var(--chat-item-selected);
  }

  &__avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
    margin-right: 15px;
    background-color: var(--avatar-background-color);
    width: var(--avatar-width);
    height: var(--avatar-height);
    border-radius: var(--avatar-border-radius);

    span {
      font-size: var(--avatar-icon-size);
      color: var(--avatar-icon-color);
    }

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
      margin-top: auto;
      color: var(--neutral-500);
    }
  }

  &__unread {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-weight: 400;
    margin-left: auto;
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
}

.dark {
  .chat-item {

    &__selected {
      background: var(--d-chat-item-selected);
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
</style>
