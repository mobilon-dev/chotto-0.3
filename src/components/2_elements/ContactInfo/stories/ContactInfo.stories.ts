import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ContactInfo from '../ContactInfo.vue';

const meta = {
  title: 'Elements/ContactInfo',
  component: ContactInfo,
  args: {},
} satisfies Meta<typeof ContactInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
