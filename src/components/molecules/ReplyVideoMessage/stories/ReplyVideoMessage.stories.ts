import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ReplyVideoMessage from '../ReplyVideoMessage.vue';

const meta = {
  title: 'Molecules/ReplyVideoMessage',
  component: ReplyVideoMessage,
  args: {},
} satisfies Meta<typeof ReplyVideoMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
