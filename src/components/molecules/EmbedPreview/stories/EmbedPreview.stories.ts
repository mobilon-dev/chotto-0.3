import type { Meta, StoryObj } from '@storybook/vue3-vite';
import EmbedPreview from '../EmbedPreview.vue';

const meta = {
  title: 'Molecules/EmbedPreview',
  component: EmbedPreview,
  args: {},
} satisfies Meta<typeof EmbedPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
