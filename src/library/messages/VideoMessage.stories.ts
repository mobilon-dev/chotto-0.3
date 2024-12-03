import type { Meta, StoryObj } from '@storybook/vue3';

import VideoMessage from './VideoMessage.vue';

const meta: Meta<typeof VideoMessage> = {
  component: VideoMessage,
};

export default meta;
type Story = StoryObj<typeof VideoMessage>;

const videoMessage = {
  messageId: 'testId',
  position: 'left',
  url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  time: '12:12',
  status: 'read',
};

const actions = [
  { action: 'edit', title: 'изменить', },
  { action: 'delete', title: 'удалить', },
];

export const LeftMessage: Story = {
  args: {
    message: {
      ...videoMessage,
    },
  },
};


export const RightMessage: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
    },
  },
};

export const RightMessageWithText: Story = {
  args: {
    message: {
      ...videoMessage,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  },
};

export const LeftMessageWithText: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  },
};


export const LeftMessageWithTextAndActions: Story = {
  args: {
    message: {
      ...videoMessage,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      actions
    },
  },
};
