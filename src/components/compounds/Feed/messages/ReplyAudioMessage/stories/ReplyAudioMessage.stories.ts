import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ReplyAudioMessage from '../ReplyAudioMessage.vue';

const meta = {
  title: 'Molecules/ReplyAudioMessage',
  component: ReplyAudioMessage,
  args: {},
} satisfies Meta<typeof ReplyAudioMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
