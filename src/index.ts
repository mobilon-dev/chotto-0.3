import Chat from './components/base/Chat.vue';
import Chat2 from './components/base/Chat2.vue';
import FileMessage from './components/messages/FileMessage.vue';
import ImageMessage from './components/messages/ImageMessage.vue';
import TextMessage from './components/messages/TextMessage.vue';

import ChatInfo from './components/features/ChatInfo.vue';
import ChatInput from './components/features/ChatInput.vue';
import ChatList from './components/features/ChatList.vue';
import ChatList2 from './components/features/ChatList2.vue';
import Feed from './components/features/Feed.vue';
import Profile from './components/features/Profile.vue';

import 'primeicons/primeicons.css'
import './assets/style.css'

export * from './helpers';

export {
  ChatInput, 
  Chat,
  Chat2,
  ChatList,
  ChatList2,
  FileMessage,
  ChatInfo,
  ImageMessage,
  Feed,
  Profile,
  TextMessage,
};
