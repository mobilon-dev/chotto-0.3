import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ReplyTextMessage from '../ReplyTextMessage.vue';

const meta = {
  title: 'Feed Elements/ReplyTextMessage',
  component: ReplyTextMessage,
  args: {},
} satisfies Meta<typeof ReplyTextMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: {
      messageId: '1',
      text: 'Привет! Как дела?',
      position: 'left',
      status: 'read',
      time: '12:34'
    }
  },
};
