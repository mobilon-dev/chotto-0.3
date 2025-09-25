import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ReplyFileMessage from '../ReplyFileMessage.vue';

const meta = {
  title: 'Molecules/ReplyFileMessage',
  component: ReplyFileMessage,
  args: {},
} satisfies Meta<typeof ReplyFileMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: {
      messageId: '1',
      position: 'left',
      time: '12:34',
      url: 'https://example.com/file.pdf',
      filename: 'document.pdf',
      status: 'read'
    }
  },
};
