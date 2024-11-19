import type { Meta, StoryObj } from '@storybook/vue3';
 
import TypingMessage from './TypingMessage.vue';
 
const meta: Meta<typeof TypingMessage> = {
  component: TypingMessage,
};
 
export default meta;
type Story = StoryObj<typeof TypingMessage>;

const message = {};

export const Standard: Story = {
  args: {
    message,
  },
};

export const WithAvatar: Story = {
  args: {
    message: {
      ...message,
      avatar: "https://placehold.jp/30/336633/ffffff/64x64.png?text=MV",
    },
  },
};

export const WithAvatarAndSubtext: Story = {
  args: {
    message: {
      ...message,
      avatar: "https://placehold.jp/30/336633/ffffff/64x64.png?text=MV",
      subText: 'test test test',
    },
  },
};
