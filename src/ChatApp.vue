<template>
  <div class="chat-app">
    <ChatList
      :chats="chatsStore.chats"
      @select="selectChat"
      filterEnabled
    />

    <div v-if="selectedChat">
      <ChatInfo :chat="selectedChat"/>
      <MessageFeed :messages="messages" />
      <ChatInput @send="addMessage" />
    </div>
    <p v-else>Выберите контакт для начала общения</p>

    <Profile :user="userProfile" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { defineStore } from 'pinia'

import ChatInput from "./components/features/ChatInput2.vue";
import ChatList from "./components/features/ChatList2.vue";
import ChatInfo from "./components/features/ChatInfo.vue";
import MessageFeed from "./components/features/MessageFeed.vue";
import Profile from "./components/features/Profile.vue";

// Define props
const props = defineProps({
  authProvider: {
    type: Object,
    required: true,
  },
  dataProvider: {
    type: Object,
    required: true,
  },
  eventor: {
    type: Object,
    required: true,
  },
});

const useChatsStore = defineStore('chats', () => {
  const chats = ref([])

  function setUnreadCounter(chatId, countUnread) {
    const chat = chats.value.find(c => c.chatId === chatId);
    chat.countUnread = countUnread;
  }
  return { chats, setUnreadCounter }
})

const chatsStore = useChatsStore();

// Reactive data
const selectedChat = ref(null);
const messages = ref([]);
const userProfile = ref({});

// Methods
const getFeed = () => {
  // console.log('get feed')
  if (selectedChat.value) {
    return props.dataProvider.getFeed(selectedChat.value.chatId);
  } else {
    return [];
  }
};

const addMessage = (message) => {
  props.dataProvider.addMessage({
    text: message,
    type: 'message.text',
    chatId: selectedChat.value.chatId,
    direction: 'outgoing',
    timestamp: new Date().toLocaleTimeString(),
  });
  messages.value = getFeed();  // Обновление сообщений
};

const selectChat = (chat) => {
  selectedChat.value = chat;
  chatsStore.setUnreadCounter(chat.chatId, 0);
  messages.value = getFeed(); // Обновляем сообщения при выборе контакта
};

const handleEvent = (event) => {
  if (event.type === 'message') {        
    chatsStore.setUnreadCounter(event.data.chatId, 1);
    if (selectedChat?.value?.chatId) {
      messages.value = props.dataProvider.getFeed(selectedChat.value.chatId);
    }
  } else if (event.type === 'notification') {
    console.log('Системное уведомление:', event.data.text);
  }
};

// Lifecycle hook
onMounted(() => {
  // console.log('mounted')
  props.eventor.subscribe(handleEvent);
  userProfile.value = props.authProvider.getUserProfile();
  chatsStore.chats = props.dataProvider.getChats();
});
</script>

<style scoped>
.chat-app {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr ;
  gap: 16px;
}
</style>
