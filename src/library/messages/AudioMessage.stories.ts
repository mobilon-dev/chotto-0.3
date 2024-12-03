import type { Meta, StoryObj } from '@storybook/vue3';

import AudioMessage from './AudioMessage.vue';

const meta: Meta<typeof AudioMessage> = {
  component: AudioMessage,
};

export default meta;
type Story = StoryObj<typeof AudioMessage>;

const message = {
  url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
  position: 'left',
  messageId: 'testMessageId',
  time: '12:00',
  status: 'read',
};

const actions = [
  { action: 'edit', title: 'изменить', },
  { action: 'delete', title: 'удалить', },
];

export const LeftMessage: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
    },
  },
};

export const LeftMessageWithActions: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      actions,
    },
  },
};


export const RightMessage: Story = {
  args: {
    message: {
      ...message,
      position: 'right'
    },
  },
};

export const RightMessageSent: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'sent',
    },
  },
};

export const RightMessageReceived: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'received',
    },
  },
};

export const RightMessageRead: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'read',
    },
  },
};

export const RightMessageWithActions: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      actions,
    },
  },
};

export const RightMessageWithActionsAndText: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      actions,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
  },
};

export const LeftMessageWithActionsAndText: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      actions,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
  },
};
