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

export const LeftMessageWithText: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  },
};

export const RightMessageWithText: Story = {
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
      actions,
    },
  },
};

export const RightMessageWithTextAndActions: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      actions,
    },
  },
};

export const RightMessageWithStatusSend: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      status: 'send',
      actions,
    },
  },
};

export const RightMessageWithStatusReceived: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      status: 'received',
      actions,
    },
  },
};

export const RightMessageWithStatusRead: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      status: 'read',
      actions,
    },
  },
};

export const RightMessageWithVerticalVideo: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
      position: 'right',
      status: 'read',
      actions,
    },
  },
};

export const RightMessageWithVerticalVideoAndText: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      position: 'right',
      status: 'read',
      actions,
    },
  },
};
