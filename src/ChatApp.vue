<template>
  <div>
    <div class="chat-app">
      <div class="chat-app__container">
        <div>
          <Profile :user="userProfile"></Profile>
          <ChatList2 :chats="chatsStore.chats" @select="selectChat" filterEnabled />
        </div>

        <div class="chat-app__right-bar">
          <div v-if="selectedChat" class="chat-app__right-bar-container">
            <ChatInfo :chat="selectedChat" />
            <Feed class="chat-app__feed" :objects="messages" />
            <ChatInput2 @send="addMessage" :enableEmoji="true" :channels="channels" />
          </div>
          <p v-else class="chat-app__welcome-text">Выберите контакт для начала общения</p>
        </div>
      </div>
    </div>

    <CreateNewChat :users="getUsers()" @createNewChat="createNewChat" title="+ чат" :isChatName="true"/>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { 
  ChatInfo,
  ChatInput2,
  ChatList2,
  CreateNewChat,
  Feed,
  Profile,
} from "./components/features";

import {
  formatTimestamp,
  insertDaySeparators,
  playNotificationAudio,
  sortByTimestamp,
} from './helpers';

import { useChatsStore } from './stores/useChatStore';

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

const getUsers = () => {
  return (props.dataProvider.getChats()).map(c => {return {...c, userId: c.chatId.toString()}});
}

const createNewChat = (obj) => {
  // obj.users.map(c=>console.log(c));
  // console.log('chat', obj)
  const chat = {chatId: 3, name: obj.chatName};
  chatsStore.addChat(chat);
}

// Methods
const getFeedObjects = () => {
  // console.log('get feed')
  if (selectedChat.value) {
    // здесь обработка для передачи сообщений в feed
    const messages = props.dataProvider.getFeed(selectedChat.value.chatId);

    // а. сортировка по timestamp
    const messages1 = sortByTimestamp(messages);

    // б. переформатирование
    const messages2 = messages1.map((m) => {
      return {
        ...m,
        position: m.direction === 'outgoing' ? 'right' : 'left',
        time: readableFormat(m.timestamp),
      };
    });

    // в. вставка временных отсечек
    const messages3 = insertDaySeparators(messages2);

    return messages3;
  } else {
    return [];
  }
};

const addMessage = (message) => {
  console.log(message);
  // Добавление сообщения в хранилище

  props.dataProvider.addMessage({
    text: message,
    type: message.type,
    chatId: selectedChat.value.chatId,
    direction: 'outgoing',
    timestamp: '1727112546',
  });
  messages.value = getFeedObjects();  // Обновление сообщений
};

const selectChat = (chat) => {
  selectedChat.value = chat;
  chatsStore.setUnreadCounter(chat.chatId, 0);
  messages.value = getFeedObjects(); // Обновляем сообщения при выборе контакта
};

const handleEvent = async (event) => {
  if (event.type === 'message') {
    chatsStore.setUnreadCounter(event.data.chatId, 1);
    if (selectedChat?.value?.chatId) {
      messages.value = getFeedObjects();
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

<style scoped lang="scss">
.chat-app {
  &__container {
    display: grid;
    grid-template-columns: 1.25fr 3fr;
  }

  &__right-bar {
    position: relative;
    margin: 30px 0;
    height: calc(100vh - 60px);
    background-color: var(--neutral-100);
    border-radius: 12px;
  }

  &__right-bar-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__welcome-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.dark {
  .chat-app {
    &__right-bar {
      background-color: var(--neutral-800);
    }
  }

}
</style>
