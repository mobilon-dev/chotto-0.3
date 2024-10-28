<template>
  <div
    ref="chatAppRef"
    class="chat-app"
  >
    <div class="chat-app__container">
      <div class="chat-app__left-bar">
        <ToolBar
          :sidebar-items="sidebarItems"
          @select-item="selectItem"
        />
      </div>
      <div class="chat-app__center-bar">
        <Profile :user="userProfile" />
        <ChatList
          class="chat-app__chat-list"
          :chats="chatsStore.chats"
          filter-enabled
          @select="selectChat"
          @action="chatAction"
        />
        <ThemeMode />
      </div>

      <div
        class="chat-app__right-bar"
        :style="{ gridColumn: isOpenChatPanel ? '3' : '3 / 5', }"
      >
        <div
          v-if="selectedChat"
          class="chat-app__right-bar-container"
        >
          <ChatInfo
            :chat="selectedChat"
            @open-panel="isOpenChatPanel = !isOpenChatPanel"
          />
          <Feed
            class="chat-app__feed"
            :objects="messages"
            :style="{ padding: isOpenChatPanel ? '0 20px 50px 20px' : '0 80px 50px 80px' }"
            @message-action="messageAction"
            @load-more="loadMore"
          />
          <ChatInput
            :enable-emoji="true"
            :channels="channels"
            @send="addMessage"
          />
        </div>
        <p
          v-else
          class="chat-app__welcome-text"
        >
          Выберите контакт для начала общения
        </p>
      </div>

      <ChatPanel
        v-if="isOpenChatPanel"
        class="chat-app__chat-panel chat-app__chat-panel--active"
        :title="selectedChat.name"
        @close-panel="isOpenChatPanel = !isOpenChatPanel"
      >
        <template #content>
          test
        </template>
      </ChatPanel>

      <FloatWindow
        v-if="isOpenFloatWindow"
        class="chat-app__float-window"
        :update-chat-app-size="updateChatAppSize"
        @close-window="isOpenFloatWindow = !isOpenFloatWindow"
        @get-size="getFloatWindowSize"
      >
        <div class="chat-app__left-bar">
          <ToolBar
            :sidebar-items="sidebarItems"
            @select-item="selectItem"
          />
        </div>
        <div
          class="chat-app__center-bar"
          :style="{ height: floatWindowHeight - 60 + 'px' }"
        >

          <ChatList
            class="chat-app__chat-list"
            :chats="chatsStore.chats"
            filter-enabled
            @select="selectChat"
            @action="chatAction"
          />
          <ThemeMode />
        </div>

        <div
          class="chat-app__right-bar"
          :style="{ gridColumn: isOpenChatPanel ? '3' : '3 / 5', height: floatWindowHeight - 60 + 'px' }"
        >
          <div
            v-if="selectedChat"
            class="chat-app__right-bar-container"
          >
            <ChatInfo
              :chat="selectedChat"
              @open-panel="isOpenChatPanel = !isOpenChatPanel"
            />
            <Feed
              class="chat-app__feed"
              :objects="messages"
              :style="{ padding: isOpenChatPanel ? '0 20px 50px 20px' : '0 80px 50px 80px' }"
              @message-action="messageAction"
            />
            <ChatInput
              :enable-emoji="true"
              :channels="channels"
              @send="addMessage"
            />
          </div>
          <p
            v-else
            class="chat-app__welcome-text"
          >
            Выберите контакт для начала общения
          </p>
        </div>


        <ChatPanel
          v-if="isOpenChatPanel"
          class="chat-app__chat-panel"
          :style="{ height: floatWindowHeight - 60 + 'px' }"
          @close-panel="isOpenChatPanel = !isOpenChatPanel"
        />
      </FloatWindow>
    </div>
  </div>
  <!-- <CreateNewChat :users="getUsers()" @createNewChat="createNewChat" title="+ чат" :isChatName="true"/>     -->
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

import {
  ChatInfo,
  ChatInput,
  ChatList,
  CreateNewChat,
  Feed,
  Profile,
  FileUploader,
  ThemeMode,
  ToolBar,
  ChatPanel,
  FloatWindow,
} from "./components/features";

import {
  formatTimestamp,
  insertDaySeparators,
  playNotificationAudio,
  sortByTimestamp,
} from './helpers';

import { useChatsStore } from './stores/useChatStore';
import { transformToFeed } from './transform/transformToFeed';

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
const sidebarItems = ref([])

const isOpenChatPanel = ref(false)
const isOpenFloatWindow = ref(true)

const chatAppRef = ref(null)

const floatWindowHeight = ref(0)
const chatAppSize = ref({
  width: 0,
  height: 0
})

const updateChatAppSize = () => {
  return chatAppSize.value = {
    width: chatAppRef.value.offsetWidth,
    height: chatAppRef.value.offsetHeight
  }
}

const getFloatWindowSize = (windowHeight, controlsHeight) => {
  floatWindowHeight.value = windowHeight - controlsHeight
}

const selectItem = (item) => {
  console.log('selected sidebar item', item);
};

const chatAction = (data) => {
  console.log('chat action', data);
}

const messageAction = (data) => {
  console.log('message action', data);
}


const getUsers = () => {
  return (props.dataProvider.getChats()).map(c => { return { ...c, userId: c.chatId.toString() } });
}

const createNewChat = (obj) => {
  // obj.users.map(c=>console.log(c));
  // console.log('chat', obj)
  const chat = { chatId: 3, name: obj.chatName };
  chatsStore.addChat(chat);
}

const loadMore = () => {
  // do load more messages to feed
  console.log('load more')
}

const getFeedObjects = () => {
  // console.log('get feed')
  if (selectedChat.value) {
    // здесь обработка для передачи сообщений в feed
    const messages = props.dataProvider.getFeed(selectedChat.value.chatId);
    const messages3 = transformToFeed(messages);
    return messages3;
  } else {
    return [];
  }
};

const addMessage = (message) => {
  console.log(message);
  // Добавление сообщения в хранилище

  props.dataProvider.addMessage({
    text: message.text,
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


onMounted(() => {
  // console.log('mounted')
  props.eventor.subscribe(handleEvent);
  userProfile.value = props.authProvider.getUserProfile();
  chatsStore.chats = props.dataProvider.getChats();
  channels.value = props.dataProvider.getChannels();
  sidebarItems.value = props.dataProvider.getSidebarItems()
});
</script>

<style
  scoped
  lang="scss"
>
.chat-app {
  position: relative;

  &__container {
    display: grid;
    grid-template-columns: min-content 1.25fr 3fr 1.25fr;
    transition: all 0.3s ease;
    background-color: var(--app-container-bg, transparent);
    margin: var(--app-margin, 0);
  }

  &__left-bar {
    margin-right: 20px;
    grid-column: 1;
    border-right: 1px solid var(--tool-bar-border-color);
  }

  &__right-bar {
    grid-column: 3;
    position: relative;
    /* вычитаем маргины сверху и снизу */
    height: calc(100vh - 60px);
    border-radius: 12px;
    margin: var(--right-bar-margin);
    background-color: var(--rigth-bar-bg);
  }

  &__right-bar-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__center-bar {
    display: flex;
    flex-direction: column;
    /* вычитаем маргины сверху и снизу */
    height: calc(100vh - 60px);
    grid-column: 2;
    margin: var(--center-bar-margin);
    border-right: var(--center-bar-border, none);
  }

  &__chat-panel {
    margin: var(--chat-pannel-margin);
    border-left: var(--chat-pannel-border, none);
    height: calc(100vh - 60px);
  }

  &__chat-list {
    overflow-y: auto;
  }

  &__welcome-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__float-window {
    position: absolute;
    right: 0;
    top: 0;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  opacity: 1;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
