import type { Meta, StoryObj } from '@storybook/vue3';

import FileMessage from './FileMessage.vue';
import { IFileMessage } from '../../types'

const meta: Meta<typeof FileMessage> = {
  component: FileMessage,
};

export default meta;
type Story = StoryObj<typeof FileMessage>;

const fileMessage: IFileMessage = {
  filename: "document.pdf",
  url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
  time: '20:55',
  status: 'read',
  position: 'left',
  messageId: 'testId',
};

const actions = [
  { action: 'edit', title: 'изменить', },
  { action: 'delete', title: 'удалить', },
];


export const LeftFileMessage: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'left',
    } as IFileMessage,
  },
};

export const LeftFileMessageWithSubtext: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'left',
      subText: 'sub text sub text'
    },
  },
};

export const LeftFileMessageWithActions: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'left',
      actions,
    }
  },
};


export const RightFileMessage: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
    }
  },
};

export const RightFileMessageStatusSend: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      status: 'send',
    }
  },
};

export const RightFileMessageStatusReceived: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      status: 'received',
    }
  },
};

export const RightFileMessageStatusRead: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      status: 'read',
    }
  },
};

export const RightFileMessageWithSubtext: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      subText: 'sub text sub text'
    },
  },
};

export const RightFileMessageWithActions: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      actions,
    }
  },
};

export const RightFileMessageWithActionsAndText: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      actions,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
        'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  },
};

export const LeftFileMessageWithActionsAndText: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'left',
      actions,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
        'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
};
