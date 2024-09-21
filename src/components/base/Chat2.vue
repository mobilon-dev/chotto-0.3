<template>
  <div :class="getClass()"  @click="selectChat">
    <div class="avatar">
      <img :src="getAvatarImage()" width="50" height="50">
    </div>
    <div class="chat-info">
      <div class="name">{{ chat.name }}</div>
      <div class="last-message" v-if="chat.lastMessage">{{ chat.lastMessage }}</div>
    </div>
    <div class="chat-details">
      <div class="unread" v-if="chat.countUnread > 0">{{ chat.countUnread }}</div>
      <div class="time" v-if="chat['lastActivity.time']">{{ chat['lastActivity.time'] }}</div>
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
const emit = defineEmits(['select']);

// Define method
const selectChat = () => {emit('select', props.chat);}

const getClass = () => {
  return props.chat.isSelected ? 'chat-item-selected' : 'chat-item';
}

const getAvatarImage = () => {
  if (props.chat.avatar) {
    return props.chat.avatar;
  } else {
    const svg = '<svg fill="#000000" width="800px" height="800px" viewBox="0 -2.93 32.537 32.537" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <g transform="translate(-481.391 -197.473)"> <path d="M512.928,224.152a.991.991,0,0,1-.676-.264,21.817,21.817,0,0,0-29.2-.349,1,1,0,1,1-1.322-1.5,23.814,23.814,0,0,1,31.875.377,1,1,0,0,1-.677,1.736Z"/> <path d="M498.191,199.473a7.949,7.949,0,1,1-7.949,7.95,7.959,7.959,0,0,1,7.949-7.95m0-2a9.949,9.949,0,1,0,9.95,9.95,9.949,9.949,0,0,0-9.95-9.95Z"/> </g> </g></svg>';
    const defaultAvatar = 'data:image/svg+xml;base64,' + window.btoa(svg);
    return defaultAvatar;
  }
}
</script>

<style scoped>
.chat-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.chat-item-selected {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #bbbbbb;
  border-bottom: 1px solid #a09d9d;
  cursor: pointer;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  margin-right: 15px;
}

.chat-info {
  flex-grow: 1;
  margin-right: 15px;
}

.name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}

.last-message {
  font-size: 14px;
  color: #888;
}

.chat-details {
  display: flex;
  align-items: center;
}

.unread {
  background-color: #f00;
  color: #fff;
  padding: 5px 8px;
  border-radius: 50%;
  font-size: 12px;
  margin-right: 10px;
}

.time {
  font-size: 12px;
  color: #888;
}
</style>
