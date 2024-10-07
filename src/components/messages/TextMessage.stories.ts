import type { Meta, StoryObj } from '@storybook/vue3';
 
import TextMessage from './TextMessage.vue';
 
const meta: Meta<typeof TextMessage> = {
  component: TextMessage,
};
 
export default meta;
type Story = StoryObj<typeof TextMessage>;

export const LeftMessage: Story = {
  args: {
    message: {
      text: 'test test test',
      position: 'left',
      messageId: 'testMessageId',
      time: '12:00',
      status: 'read',
    },
  },
};

export const RightMessage: Story = {
  args: {
    message: {
      text: 'test test test',
      position: 'right',
      messageId: 'testMessageId',
      time: '12:00',
      status: 'read',
    },
  },
};
