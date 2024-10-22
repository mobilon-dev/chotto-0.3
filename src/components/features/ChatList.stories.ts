import type { Meta, StoryObj } from '@storybook/vue3';
 
import ChatList from './ChatList.vue';
 
const meta: Meta<typeof ChatList> = {
  component: ChatList,
};
 
export default meta;
type Story = StoryObj<typeof ChatList>;
 

const chats = [{
  chatId: '1',
  avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  name: "John Doe",
  lastMessage: "Привет!",
  countUnread: "21",
  'lastActivity.time': "12:34",
  isSelected: true,
},{
  chatId: '2',
  name: "John Doe 2",
  lastMessage: "Привет 2!",
  countUnread: "677",
  'lastActivity.time': "12:11",
}];

export const ChatlistBasic: Story = {
  args: {
    chats,
  },
};

export const ChatlistWithEnabledFilter: Story = {
  args: {
    chats,
    filterEnabled: true,
  },
};

const chats10 = [0,1,2,3,4,5,6,7,8,9].map(() => {
  return {
    chatId: '1',
    avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
    name: "John Doe",
    lastMessage: "Привет!",
    countUnread: "21",
    'lastActivity.time': "12:34",
  }
})

export const Entities10: Story = {
  args: {
    chats: [...chats, ...chats10],
    filterEnabled: true,
  },
};

const fixedChats = [{
  chatId: '1',
  avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  name: "John Doe",
  lastMessage: "Привет!",
  countUnread: "21",
  'lastActivity.time': "12:34",
  isFixedTop: true,
},{
  chatId: '2',
  name: "John Doe 2",
  lastMessage: "Привет 2!",
  countUnread: "677",
  'lastActivity.time': "12:11",
  isFixedBottom: true,
}];

export const WithFixedChats: Story = {
  args: {
    chats: [...chats, ...chats10 ,...fixedChats],
    filterEnabled: true,
  },
};

const actions = [
  {action: 'edit', title: 'изменить'},
  {action: 'delete', title: 'удалить'},
]

const chatsWithActions = [{
  chatId: '100',
  avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  name: "John Doe",
  lastMessage: "Привет!",
  countUnread: "21",
  'lastActivity.time': "12:11",
  actions,
},{
  chatId: '102',
  name: "John Doe 2",
  lastMessage: "Привет 2!",
  countUnread: "677",
  'lastActivity.time': "12:12",
  actions,
}];

export const ChatsWithActions: Story = {
  args: {
    chats: [...chats, ...chatsWithActions],
    filterEnabled: true,
  },
};

const chatsWithStatuses = [{
  chatId: '100',
  avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  name: "John Doe",
  lastMessage: "Привет!",
  countUnread: "21",
  'lastActivity.time': "12:11",
  status: 'online',
},{
  chatId: '102',
  name: "John Doe 2",
  lastMessage: "Привет 2!",
  countUnread: "677",
  'lastActivity.time': "12:12",
  status: 'sleep'
}];

export const ChatsWithStatuses: Story = {
  args: {
    chats: [...chats, ...chatsWithStatuses],
    filterEnabled: false,
  },
};
