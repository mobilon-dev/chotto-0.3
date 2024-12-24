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
              <ChatInfo :chat="selectedChat">
                <template #actions>
                  <div style="display: flex;">
                    <button
                      class="chat-info__button-panel"
                      @click="isOpenChatPanel = !isOpenChatPanel"
                    >
                      <span class="pi pi-info-circle" />
                    </button>
                    <!--ButtonContextMenu
                      :actions="actions"
                      :button-class="'pi pi-list'"
                      :mode="'click'"
                      :menu-side="'bottom'"
                      :context-menu-key="'top-actions'"
                    /-->
                  </div>
                </template>
              </ChatInfo>
              <Feed
                :button-params="buttonParams"
                :objects="messages"
                :is-scroll-to-bottom-on-update-objects-enabled="isScrollToBottomOnUpdateObjectsEnabled"
                :typing="selectedChat.typing ? { avatar: selectedChat.avatar, title: selectedChat.title } : false"
                :enableDoubleClickReply="true"
                :scrollTo="clickedReply"
                @message-action="messageAction"
                @load-more="loadMore"
                @load-more-down="loadMoreDown"
                @message-visible="messageVisible"
                @click-replied-message="handleClickReplied"
                @force-scroll-to-bottom="forceScrollToBottom"
              />
              <ChatInput @send="addMessage">
                <template #buttons>
                  <FileUploader
                    :filebump-url="filebumpUrl"
                    :state="'active'"
                  />
                  <ButtonEmojiPicker
                    :mode="'hover'"
                    :state="'active'"
                  />
                  <ButtonTemplateSelector
                    :templates="templates"
                    :group-templates="groupTemplates"
                    :mode="'click'"
                    :state="'active'"
                  />
                  <ButtonWabaTemplateSelector
                    :waba-templates="wabaTemplates"
                    :group-templates="groupTemplates"
                    :mode="'click'"
                    :state="'active'"
                    :filebump-url="filebumpUrl"
                    @send-waba-values="sendWabaValues"
                  />
                  <ChannelSelector
                    :channels="channels"
                    :mode="'hover'"
                    :state="'active'"
                    @select-channel="onSelectChannel"
                  />
                </template>
              </ChatInput>
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
  ButtonContextMenu,
  ButtonTemplateSelector,
  ButtonWabaTemplateSelector,
  ButtonEmojiPicker,
  FileUploader,
} from "./library";

import {
  formatTimestamp,
  insertDaySeparators,
  playNotificationAudio,
  sortByTimestamp,
} from "./helpers";

import { useChatsStore } from "./stores/useChatStore";
import { transformToFeed } from "./transform/transformToFeed";
import ChannelSelector from "./library/components/ChannelSelector.vue";
import { useLocale } from "./locale/useLocale";

const { locale, locales } = useLocale()


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
  locale: {
    type: String,
    required: false,
    default: 'ru',
  }
});

const buttonParams = {
  unreadAmount: 12
}

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
    title: 'Данные контакта',
    prime: '',
  },
  {
    action: 'video/*',
    title: 'Выбрать сообшение',
    prime: '',
  },
  {
    action: '',
    title: 'Закрыть чат',
    prime: '',
  },
  {
    action: '',
    title: 'Без звука',
    prime: '',
  },
  {
    action: '',
    title: 'Исчезающие сообщения',
    prime: '',
  },
  {
    action: '',
    title: 'Очистить чат',
    prime: '',
  },
]

const chatsStore = useChatsStore();

const selectedChat = ref(null);
const messages = ref([]);
const userProfile = ref({});
const channels = ref([]);
const templates = ref([]);
const wabaTemplates = ref([])
const groupTemplates = ref([])
const sidebarItems = ref([]);
const isOpenChatPanel = ref(false);
const isScrollToBottomOnUpdateObjectsEnabled = ref(false);
const filebumpUrl = ref('https://filebump2.services.mobilon.ru');
const clickedReply = ref('')

const selectItem = (item) => {
  console.log("selected sidebar item", item);
};

const chatAction = async (data) => {
  console.log("chat action", data);
  if (data.action === "add") {
    const data = await useModalSelectUser2('Укажите новых участников чата', getUsers());
    // const data = await useModalCreateChat2('Добавьте контакт');
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
  // do load more messages to feed when scroll up
  console.log("load more");
  if (selectedChat.value && selectedChat.value.chatId == 5 ){
    const firstMessage = messages.value.find((message) => {
      if (message.type.indexOf('system') == -1) return message
    })
    const messages1 = props.dataProvider.getMoreFeedUp(selectedChat.value.chatId,firstMessage.messageId, 10);
    if (messages1.length > 0){
      const additionalMessages = transformToFeed(messages1);
      if (additionalMessages[additionalMessages.length - 1].time == firstMessage.time && messages.value[0].type == 'system.date'){
          messages.value.shift()
      }
      messages.value = additionalMessages.concat(messages.value)
    }
  }
};

const loadMoreDown = () => {
  // do load more messages to feed when scroll down
  console.log("load more down");
  const currentLastMessage = messages.value[messages.value.length - 1]
  const savedLastMessage = props.dataProvider.getLastMessage(selectedChat.value.chatId).messageId
  if (selectedChat.value && selectedChat.value.chatId == 5 && currentLastMessage.messageId != savedLastMessage){
    const newM = props.dataProvider.getMoreFeedDown(selectedChat.value.chatId, currentLastMessage.messageId, 10)
    const additionalMessages = transformToFeed(newM, currentLastMessage.timestamp)
    messages.value = messages.value.concat(additionalMessages)
  }
};

const forceScrollToBottom = () => {
  const currentLastMessage = messages.value[messages.value.length - 1].messageId
  const savedLastMessage = props.dataProvider.getLastMessage(selectedChat.value.chatId).messageId
  if (currentLastMessage != savedLastMessage){
    const messages1 = props.dataProvider.getFeed(selectedChat.value.chatId);
    messages.value = transformToFeed(messages1);
  }
}

const messageVisible = (message) => {
  // processing message in feed visible area 
  // console.log('visible message', message.type)
}

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

const onSelectChannel = (channel) => {
  console.log('selected channel', channel);
}

const addMessage = (message) => {
  console.log(message);
  // Добавление сообщения в хранилище

  props.dataProvider.addMessage({
    text: message.text,
    type: message.type,
    chatId: selectedChat.value.chatId,
    url: message.url || null,
    filename: message.filename || null,
    status: 'sent',
    direction: "outgoing",
    timestamp: moment().unix(),
    reply: message.reply || null,
  });
  messages.value = getFeedObjects(); // Обновление сообщений
};

const sendWabaValues = (obj) => {
  console.log('send waba values', obj);
  const messageObject = {
    type: '',
    text: '',
    url: '',
    filename: '',
    size: '',
  };

  if (obj.file) {
    messageObject.type = 'message.' + obj.file.filetype;
    messageObject.url = obj.file.url;
    messageObject.filename = obj.file.filename;
    messageObject.size = obj.file.filesize.toString();
    messageObject.text = obj.text.trim();
  } else {
    messageObject.type = 'message.text';
    messageObject.text = obj.text.trim();
  }

  addMessage(messageObject)
}

const selectChat = (chat) => {
  selectedChat.value = chat;
  chatsStore.setUnreadCounter(chat.chatId, 0);
  messages.value = getFeedObjects(); // Обновляем сообщения при выборе чата
};

const handleClickReplied = (messageId) => {
  console.log('Clicked reply id ' + messageId)
  const message = messages.value.find((m) => {
    if (m.messageId == messageId) return m
    })
  if (!message) {
    const messages1 = props.dataProvider.getFeedByMessage(selectedChat.value.chatId, messageId)
    messages.value = transformToFeed(messages1)
  }
  setTimeout(() => {
      highlightMessage(messageId)
  }, 50)
}

let timer
const highlightMessage = (messageId) => {
  clearTimeout(timer)
  const message = messages.value.find((m) => {
      if (m.messageId == messageId) return m
    })
  if (message) {
    clickedReply.value = JSON.stringify(message)
    timer = setTimeout(() => {
      clickedReply.value = ''
    }, 100)
  }
}

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
  locale.value = locales.find((loc) => loc.code == props.locale)
  props.eventor.subscribe(handleEvent);
  userProfile.value = props.authProvider.getUserProfile();
  chatsStore.chats = props.dataProvider.getChats();
  channels.value = props.dataProvider.getChannels();
  templates.value = props.dataProvider.getTemplates()
  wabaTemplates.value = props.dataProvider.getWABATemplates()
  groupTemplates.value = props.dataProvider.getGroupTemplates()
  sidebarItems.value = props.dataProvider.getSidebarItems();
  console.log('eee', sidebarItems.value)
});
</script>
