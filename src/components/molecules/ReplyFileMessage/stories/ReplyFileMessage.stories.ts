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
  args: {},
};
