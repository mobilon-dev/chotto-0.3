<template>
  <div>
    <BaseContainer
      height="90vh"
      width="70vw"
    >
      <ExtendedLayout>
        <template #first-col>
          <SideBar
            :sidebar-items="sidebarItems"
            @select-item="selectItem"
          />
          <ThemeMode
            :themes="themes"
            :show="true"
          />
        </template>

        <template #second-col>
          <UserProfile :user="userProfile" />
          <ChatList
            :chats="chatsStore.chats"
            filter-enabled
            @select="selectChat"
            @action="chatAction"
          />
        </template>

        <template #third-col>
          <chat-wrapper
            :is-open-chat-panel="isOpenChatPanel"
            :is-selected-chat="!!selectedChat"
          >
            <template #default>
              <ChatInfo
                :chat="selectedChat"
              >
                <template #actions>
                  <div style="display: flex;">
                    <button
                    class="chat-info__button-panel"
                    @click="isOpenChatPanel = !isOpenChatPanel"
                  >
                    <span class="pi pi-info-circle" />
                  </button>
                  <ButtonContextMenu
                  :actions="actions"
                  :buttonClass="'pi pi-list'"
                  :mode="'click'"
                  :menuSide="'bottom'"
                  :contextMenuKey="'top-actions'"
                  />
                  </div>
                  
                </template>
              </ChatInfo>
              <Feed
                :objects="messages"
                :is-scroll-to-bottom-on-update-objects-enabled="isScrollToBottomOnUpdateObjectsEnabled"
                @message-action="messageAction"
                @load-more="loadMore"
              />
              <ChatInput
                :enable-emoji="true"
                :channels="channels"
                @send="addMessage"
              />
            </template>

            <template #chatpanel>
              <ChatPanel
                v-if="isOpenChatPanel"
                :title="selectedChat.name"
                @close-panel="isOpenChatPanel = !isOpenChatPanel"
              >
                <template #content>
                  test
                </template>
              </ChatPanel>
            </template>
          </chat-wrapper>
        </template>
      </ExtendedLayout>
    </BaseContainer>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import moment from 'moment';

import {
  ChatInfo,
  ChatInput,
  ChatList,
  Feed,
  UserProfile,
  ThemeMode,
  SideBar,
  ChatPanel,
  BaseContainer,
  ExtendedLayout,
  ChatWrapper,
  useModalSelectUser2,
  useModalCreateChat,
  useModalCreateChat2,
} from "./library";

import {
  formatTimestamp,
  insertDaySeparators,
  playNotificationAudio,
  sortByTimestamp,
} from "./helpers";

import { useChatsStore } from "./stores/useChatStore";
import { transformToFeed } from "./transform/transformToFeed";
import ButtonContextMenu from "./library/components/ButtonContextMenu.vue";


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

const themes = [
  {
    code: "light",
    name: "Light",
  },
  {
    code: "dark",
    name: "Dark",
  },
  {
    code: "green",
    name: "Green",
    default: true,
  },
  {
    code: "diamond",
    name: "Diamond",
  },
];

const actions = [
  {
    action: 'image/*',
    title : 'Данные контакта',
    prime: '',
   },
   {
    action: 'video/*',
    title : 'Выбрать сообшение',
    prime: '',
   },
   {
    action: '',
    title : 'Закрыть чат',
    prime: '',
   },
   {
    action: '',
    title : 'Без звука',
    prime: '',
   },
   {
    action: '',
    title : 'Исчезающие сообщения',
    prime: '',
   },
   {
    action: '',
    title : 'Очистить чат',
    prime: '',
   },
]

const chatsStore = useChatsStore();

const selectedChat = ref(null);
const messages = ref([]);
const userProfile = ref({});
const channels = ref([]);
const sidebarItems = ref([]);
const isOpenChatPanel = ref(false);
const isScrollToBottomOnUpdateObjectsEnabled = ref(false);

const selectItem = (item) => {
  console.log("selected sidebar item", item);
};

const chatAction = async (data) => {
  console.log("chat action", data);
  if (data.action === "add") {
    // const data = await useModalSelectUser2('Укажите новых участников чата', getUsers());
    const data = await useModalCreateChat2('Добавьте контакт');
    console.log('users:', data.contact);
  }
};

const messageAction = (data) => {
  console.log("message action", data);
};

const getUsers = () => {
  return props.dataProvider.getUsers();
  // return (props.dataProvider.getChats()).map(c => { return { ...c, userId: c.chatId.toString() } });
};

const loadMore = () => {
  // do load more messages to feed
  console.log("load more");  
};

const getFeedObjects = () => {
  // console.log('get feed')
  if (selectedChat.value) {
    // здесь обработка для передачи сообщений в feed
    isScrollToBottomOnUpdateObjectsEnabled.value = true;
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
    url: message.url || null,
    filename: message.filename || null,
    direction: "outgoing",
    timestamp: moment().unix(),
  });
  messages.value = getFeedObjects(); // Обновление сообщений
};

const selectChat = (chat) => {
  selectedChat.value = chat;
  chatsStore.setUnreadCounter(chat.chatId, 0);
  messages.value = getFeedObjects(); // Обновляем сообщения при выборе чата
};

const handleEvent = async (event) => {
  if (event.type === "message") {
    chatsStore.setUnreadCounter(event.data.chatId, 1);
    if (selectedChat?.value?.chatId) {
      messages.value = getFeedObjects();
    }
    await playNotificationAudio();
  } else if (event.type === "notification") {
    console.log("Системное уведомление:", event.data.text);
  }
};

onMounted(() => {
  props.eventor.subscribe(handleEvent);
  userProfile.value = props.authProvider.getUserProfile();
  chatsStore.chats = props.dataProvider.getChats();
  channels.value = props.dataProvider.getChannels();
  sidebarItems.value = props.dataProvider.getSidebarItems();
  console.log('eee', sidebarItems.value)
});
</script>
