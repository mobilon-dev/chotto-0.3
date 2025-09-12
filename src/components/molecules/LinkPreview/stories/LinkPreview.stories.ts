import type { Meta, StoryObj } from '@storybook/vue3-vite';
import LinkPreview from '../LinkPreview.vue';

const meta = {
  title: 'Molecules/LinkPreview',
  component: LinkPreview,
  args: {},
} satisfies Meta<typeof LinkPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
