import type { Meta, StoryObj } from '@storybook/vue3';
 
import Chat from './Chat.vue';
 
const meta: Meta<typeof Chat> = {
  component: Chat,
};
 
export default meta;
type Story = StoryObj<typeof Chat>;
 
export const Primary: Story = {
  args: {
    chat: {
      name: 'test chat',
      countUnread: 1
    },
  },
};

export const PrimaryLongTitle: Story = {
  args: {
    chat: {
      name: 'test chat test chat test chat test chat',
      countUnread: 1
    },
  },
};


