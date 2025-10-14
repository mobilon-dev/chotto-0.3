import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ReplyVideoMessage from '../ReplyVideoMessage.vue';

const meta = {
  title: 'Feed Elements/ReplyVideoMessage',
  component: ReplyVideoMessage,
  args: {},
} satisfies Meta<typeof ReplyVideoMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: {
      messageId: '1',
      position: 'left',
      status: 'read',
      time: '12:34',
      url: 'https://example.com/video.mp4'
    }
  },
};
