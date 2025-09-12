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
  args: {},
};
