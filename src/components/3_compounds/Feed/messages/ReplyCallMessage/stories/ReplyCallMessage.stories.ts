import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ReplyCallMessage from '../ReplyCallMessage.vue';

const meta = {
  title: 'Molecules/ReplyCallMessage',
  component: ReplyCallMessage,
  args: {},
} satisfies Meta<typeof ReplyCallMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: {
      messageId: '1',
      position: 'left',
      time: '12:34',
      isMissedCall: false,
      callDuration: '2:30'
    }
  },
};
