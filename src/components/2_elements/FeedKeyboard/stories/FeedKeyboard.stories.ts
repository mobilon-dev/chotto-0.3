import type { Meta, StoryObj } from '@storybook/vue3-vite';
import FeedKeyboard from '../FeedKeyboard.vue';

const meta = {
  title: 'Elements/FeedKeyboard',
  component: FeedKeyboard,
  args: {},
} satisfies Meta<typeof FeedKeyboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
