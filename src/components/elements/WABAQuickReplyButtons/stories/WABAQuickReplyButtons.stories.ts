import type { Meta, StoryObj } from '@storybook/vue3-vite';
import WABAQuickReplyButtons from '../WABAQuickReplyButtons.vue';

const meta = {
  title: 'Elements/WABAQuickReplyButtons',
  component: WABAQuickReplyButtons,
  args: {},
} satisfies Meta<typeof WABAQuickReplyButtons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
