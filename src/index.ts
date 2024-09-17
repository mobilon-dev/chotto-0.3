// import BaseFiledropper from './components/BaseFiledropper/BaseFiledropper.vue';
import Chat from './components/base/Chat.vue';
import FileMessage from './components/base/FileMessage.vue';
import ImageMessage from './components/base/ImageMessage.vue';
import TextMessage from './components/base/TextMessage.vue';

import ChatInfo from './components/features/ChatInfo.vue';
import ChatInput from './components/features/ChatInput.vue';
import ChatList from './components/features/ChatList.vue';
import MessageFeed from './components/features/MessageFeed.vue';
import Profile from './components/features/Profile.vue';
// (import all components)

// type ComponentType = DefineComponent<{}, {}, any>;

// interface Components {
// 	[key: string]: ComponentType;
// }

// const components: Components = {
//   // (all components)
// 	TextMessage: TextMessage as ComponentType,
//   Contact: Contact as ComponentType,
//   FileMessage: FileMessage as ComponentType,
//   ImageMessage: ImageMessage as ComponentType,
//   ChatInput: ChatInput as ComponentType,
//   ContactList: ContactList as ComponentType,
//   MessageFeed: MessageFeed as ComponentType,
//   Profile: Profile as ComponentType,
// };

// export default {
//   install(app: App) {
//     // Register all components globally
//     Object.keys(components).forEach((key) => {
//       app.component(key, components[key]);
//     });
//   },
// };

// Export components individually for selective import
// export {
//   ChatInput, Contact, ContactList, FileMessage,
//   ImageMessage, MessageFeed,
//   Profile, TextMessage
// };

export {
  ChatInput, 
  Chat,
  ChatList,
  FileMessage,
  ChatInfo,
  ImageMessage,
  MessageFeed,
  Profile,
  TextMessage,
};

/*
export default {
  install(app:any) {
    app.component('Chat', Chat);
    app.component('ChatInfo', ChatInfo);
    app.component('ChatInput', ChatInput);
    app.component('ChatList', ChatList);
    app.component('FileMessage', FileMessage);
    app.component('ImageMessage', ImageMessage);
    app.component('MessageFeed', MessageFeed);
    app.component('Profile', Profile);
    app.component('TextMessage', TextMessage);
  }
}
*/
