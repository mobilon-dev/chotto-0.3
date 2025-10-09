import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CreateChat from '../CreateChat.vue';

const meta = {
  title: 'Molecules/CreateChat',
  component: CreateChat,
  args: {},
} satisfies Meta<typeof CreateChat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
