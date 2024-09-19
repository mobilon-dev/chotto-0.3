import type { Meta, StoryObj } from '@storybook/vue3';
 
import Chat2 from './Chat2.vue';
 
const meta: Meta<typeof Chat2> = {
  component: Chat2,
};
 
export default meta;
type Story = StoryObj<typeof Chat2>;
 
export const Primary: Story = {
  args: {
    chat: {
      avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
      name: "John Doe",
      lastMessage: "Привет!",
      countUnread: "2",
      timestamp: "12:34",
    },
  },
};

export const LongLastMessage: Story = {
  args: {
    chat: {
      name: "John Doe",
      lastMessage: "Очень длинное текстовое сообщение. Его надо как-то немного спрятать",
      countUnread: "0",
      timestamp: "12:34",
    },
  },
};



