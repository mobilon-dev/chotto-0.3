import type { Meta, StoryObj } from '@storybook/vue3';
 
import FileMessage from './FileMessage.vue';
import {IFileMessage} from '../../types'

const meta: Meta<typeof FileMessage> = {
  component: FileMessage,
};
 
export default meta;
type Story = StoryObj<typeof FileMessage>;

const fileMessage  = {
  filename: "document.pdf",
  url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
  time: '20:55',
  status: 'read',
  messageId: 'testId'
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
    },
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

export const RightFileMessageStatusSent: Story = {
  args: {   
    message: {
      ...fileMessage,
      position: 'right',
      status: 'sent',
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
