import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ChatFilter from '../ChatFilter.vue';

const meta = {
  title: 'Elements/ChatFilter',
  component: ChatFilter,
  args: {},
} satisfies Meta<typeof ChatFilter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
