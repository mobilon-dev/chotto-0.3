import type { Meta, StoryObj } from '@storybook/vue3';

import { ImageMessage } from './';
import { IImageMessage } from '../../types'

const meta: Meta<typeof ImageMessage> = {
  component: ImageMessage,
};

export default meta;
type Story = StoryObj<typeof ImageMessage>;

const imageMessage: IImageMessage = {
  messageId: 'testId',
  status: 'read',
  url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
  time: '20:55',
  position: 'left',
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
    } as IImageMessage,
  },
};

export const LeftImageMessageWithText: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'left',
      text: 'Текст текст текст текст текст текст текст текст текст',
    } as IImageMessage,
  },
};

export const LeftImageMessageWithTextAndLink: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'left',
      text: 'Текст текст текст текст текст текст текст текст текст yandex.ru',
    } as IImageMessage,
  },
};


export const LeftImageMessageWithViews: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'left',
      views: 121212,
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

export const RightImageMessageWithText: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      text: 'Текст текст текст текст текст текст текст текст текст',
    } as IImageMessage,
  },
};

export const RightImageMessageWithTextAndLink: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      text: 'Текст текст текст текст текст текст текст текст текст yandex.ru',
    } as IImageMessage,
  },
};

export const RightImageMessageWithViews: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      views: 121212,
    } as IImageMessage,
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


export const RightImageMessageStatusSend: Story = {
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

