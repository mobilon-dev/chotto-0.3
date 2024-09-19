import type { Meta, StoryObj } from '@storybook/vue3';
 
import ChatList from './ChatList.vue';
 
const meta: Meta<typeof ChatList> = {
  component: ChatList,
};
 
export default meta;
type Story = StoryObj<typeof ChatList>;
 
export const Primary: Story = {
  args: {
    chats: [{
      avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
      name: "John Doe",
      lastMessage: "Привет!",
      countUnread: "21",
      'lastActivity.time': "12:34",
    },{
      avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
      name: "John Doe 2",
      lastMessage: "Привет 2!",
      countUnread: "677",
      'lastActivity.time': "12:11",
    }],
  },
};


