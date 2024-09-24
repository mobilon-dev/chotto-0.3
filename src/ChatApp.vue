<template>
  <div class="chat-app">
    <div>
      <Profile :user="userProfile" />
      <ChatList
        :chats="chatsStore.chats"
        @select="selectChat"
        filterEnabled
      />
    </div>

    <div v-if="selectedChat">
      <ChatInfo :chat="selectedChat"/>
      <MessageFeed :messages="messages" />
      <ChatInput @send="addMessage" :enableEmoji="true" :channels="channels"/>
    </div>
    <p v-else>Выберите контакт для начала общения</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { defineStore } from 'pinia'

import ChatInput from "./components/features/ChatInput2.vue";
import ChatList from "./components/features/ChatList2.vue";
import ChatInfo from "./components/features/ChatInfo.vue";
import MessageFeed from "./components/features/Feed.vue";
import Profile from "./components/features/Profile.vue";

import {insertDaySeparators, formatTimestamp, playNotificationAudio} from './helpers';

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
const channels = ref([]);


const readableFormat = (timestamp) => {
  // @todo: преобразование timestamp в читаемый вид
  return formatTimestamp(timestamp);
}

// Methods
const getFeed = () => {
  // console.log('get feed')
  if (selectedChat.value) {
    // здесь обработка для передачи сообщений в feed
    const messages = props.dataProvider.getFeed(selectedChat.value.chatId);

    // сортировка по timestamp
    const messages1 = messages.sort((a, b) => {
      if (Number(a.timestamp) < Number(b.timestamp)) return -1;
      if (Number(a.timestamp) > Number(b.timestamp)) return 1;
      return 0;
    })

    // а. переформатирование
    const messages2 = messages1.map((m) => {
      return {
        ...m,
        position: m.direction === 'outgoing' ? 'right' : 'left',
        time: readableFormat(m.timestamp),
      };
    });

    // б. вставка временных отсечек
    const messages3 = insertDaySeparators(messages2);

    return messages3;
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
    timestamp: '1727112546',
  });
  messages.value = getFeed();  // Обновление сообщений
};

const selectChat = (chat) => {
  selectedChat.value = chat;
  chatsStore.setUnreadCounter(chat.chatId, 0);
  messages.value = getFeed(); // Обновляем сообщения при выборе контакта
};

const handleEvent = async (event) => {
  if (event.type === 'message') {
    chatsStore.setUnreadCounter(event.data.chatId, 1);
    if (selectedChat?.value?.chatId) {
      messages.value = getFeed();
    }
    await playNotificationAudio();
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
  channels.value = props.dataProvider.getChannels();
});
</script>

<style scoped>
.chat-app {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 16px;
}
</style>
