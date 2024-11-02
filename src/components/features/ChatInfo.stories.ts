import type { Meta, StoryObj } from '@storybook/vue3';
 
import ChatInfo from './ChatInfo.vue';

const meta: Meta<typeof ChatInfo> = {
  component: ChatInfo,
};
 
export default meta;
type Story = StoryObj<typeof ChatInfo>;
 

const chat = {
  name: 'Ch-001',
  chatId: 'testChatId',
  avatar: null,
};

export const Standard: Story = {
  args: {
    chat: chat,
    actions: 'test'
  },
};
