import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ReplyImageMessage from '../ReplyImageMessage.vue';

const meta = {
  title: 'Molecules/ReplyImageMessage',
  component: ReplyImageMessage,
  args: {},
} satisfies Meta<typeof ReplyImageMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: {
      messageId: '1',
      position: 'left',
      time: '12:34',
      url: 'https://example.com/image.jpg',
      status: 'read'
    }
  },
};
