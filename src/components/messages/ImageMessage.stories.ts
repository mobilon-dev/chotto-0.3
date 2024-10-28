import type { Meta, StoryObj } from '@storybook/vue3';
 
import ImageMessage from './ImageMessage.vue';
 
const meta: Meta<typeof ImageMessage> = {
  component: ImageMessage,
};
 
export default meta;
type Story = StoryObj<typeof ImageMessage>;

const imageMessage = {
  text: "Вот картинка55656",
  url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
  time: '20:55',
};

const actions = [
  { action: 'edit', title: 'изменить', },
  { action: 'delete', title: 'удалить', },
];


export const LeftImageMessage: Story = {
  args: {   
    message: { 
      ...imageMessage,
      position: 'left',
    },
  },
};

export const LeftImageMessageWithSubtext: Story = {
  args: {   
    message: { 
      ...imageMessage,
      position: 'left',
      subText: 'sub text sub text',
    },
  },
};

export const LeftImageMessageWithActions: Story = {
  args: {   
    message: { 
      ...imageMessage,
      position: 'left',
      actions,
    },
  },
};


export const RightImageMessage: Story = {
  args: {   
    message: {
      ...imageMessage,
      position: 'right',
    },
  },
};

export const RightImageMessageWithSubtext: Story = {
  args: {   
    message: { 
      ...imageMessage,
      position: 'right',
      subText: 'sub text sub text',
    },
  },
};


export const RightImageMessageStatusSent: Story = {
  args: {   
    message: { 
      ...imageMessage,
      position: 'right',
      status: 'sent',
    },
  },
};

export const RightImageMessageStatusReceived: Story = {
  args: {   
    message: { 
      ...imageMessage,
      position: 'right',
      status: 'received',
    },
  },
};

export const RightImageMessageStatusRead: Story = {
  args: {   
    message: { 
      ...imageMessage,
      position: 'right',
      status: 'read',
    },
  },
};

export const RightImageMessageWithActions: Story = {
  args: {   
    message: { 
      ...imageMessage,
      position: 'right',
      actions,
    },
  },
};
