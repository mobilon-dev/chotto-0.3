import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CreateDialog from '../CreateDialog.vue';

const meta = {
  title: 'Molecules/CreateDialog',
  component: CreateDialog,
  args: {},
} satisfies Meta<typeof CreateDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
