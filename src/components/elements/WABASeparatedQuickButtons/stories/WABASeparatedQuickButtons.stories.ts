import type { Meta, StoryObj } from '@storybook/vue3-vite';
import WABASeparatedQuickButtons from '../WABASeparatedQuickButtons.vue';

const meta = {
  title: 'Elements/WABASeparatedQuickButtons',
  component: WABASeparatedQuickButtons,
  args: {},
} satisfies Meta<typeof WABASeparatedQuickButtons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
