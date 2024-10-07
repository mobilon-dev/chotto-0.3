import type { Meta, StoryObj } from '@storybook/vue3';
 
import ChatList from './ChatList2.vue';
 
const meta: Meta<typeof ChatList> = {
  component: ChatList,
};
 
export default meta;
type Story = StoryObj<typeof ChatList>;
 
export const Primary: Story = {
  args: {
    chats: [{
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
    }],
  },
};

export const WithEnabledFilter: Story = {
  args: {
    chats: [{
      chatId: '1',
      avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
      name: "John Doe",
      lastMessage: "Привет!",
      countUnread: "21",
      'lastActivity.time': "12:34",
    },{
      chatId: '2',
      name: "John Doe 2",
      lastMessage: "Привет 2!",
      countUnread: "677",
      'lastActivity.time': "12:11",
    }],
    filterEnabled: true,
  },
};

const chats = [0,1,2,3,4,5,6,7,8,9].map(() => {
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
    chats,
    filterEnabled: true,
  },
};
