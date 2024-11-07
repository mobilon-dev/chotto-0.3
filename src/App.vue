<template>
  <div class="container">
    <chat-app
      :auth-provider="authProvider"
      :data-provider="dataProvider"
      :eventor="eventor"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import moment from 'moment';

import ChatApp from './ChatApp.vue';
// import ChatApp from './BaseBaseChatApp.vue';
// import ChatApp from './BaseExtendedChatApp.vue';
// import ChatApp from './BaseFeedChatApp.vue';

import { messages, chats, channels, 
  sidebarItems, userProfile, users 
} from './data';

// Mock data
const data3 = {
  messages,
  chats,
  channels,
  sidebarItems,
  userProfile,
  users,
};

// Define the auth provider
const authProvider = {
  getUserProfile() {return data3.userProfile}
};

// Define the data provider
const dataProvider = {
  setAuth(auth) {
    console.log('auth', auth);
  },
  getFeed(chatId) {
    return data3.messages.filter(m => m.chatId === chatId);
  },
  getChannels() {
    return data3.channels;
  },
  getChats() {
    return data3.chats;
  },
  getUsers() {
    return data3.users;
  },
  addMessage(message) {
    data3.messages.push(message);
    console.log("Добавлено новое сообщение:", message);
  },
  getSidebarItems() {
    return data3.sidebarItems;
  }
};

const createEventor = () => {
  let cb = null;
  return {
    push(event) {
      // console.log('push', cb);
      if (cb) {
        // console.log('subscibe');
        cb(event);
      }
    },
    subscribe(cb1) {
      cb = cb1;
    },
  };
}

const eventor = createEventor();

// Эмуляция событий с сервера
onMounted(() => {
  setTimeout(() => {
    // Симулируем получение нового сообщения с сервера
    const newMessage = {
      chatId: 2,
      type: "message.text",
      text: "Новое сообщение от сервера!",
      direction: 'incoming',
      status: 'sent',
      userId: 'testUserId',
      timestamp: moment().unix(),
    };
        
    data3.messages.push(newMessage);
    eventor.push({ type: 'message', data: newMessage });
  }, 3000);

  setTimeout(() => {
    // Симулируем получение системного уведомления с сервера
    const systemNotification = {
      type: 'system',
      text: 'Системное уведомление от сервера',
    };
    //handleServerEvent({ type: 'notification', data: systemNotification });
    eventor.push({ type: 'notification', data: systemNotification });
  }, 6000);
});
</script>

<style scoped>
.container {
  width: 74vw;
  margin: 0 auto;
}
</style>
