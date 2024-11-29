import type { Meta, StoryObj } from '@storybook/vue3';
 
import TextMessage from './TextMessage.vue';
 
const meta: Meta<typeof TextMessage> = {
  component: TextMessage,
};

export default meta;
type Story = StoryObj<typeof TextMessage>;


const message = {
  text: 'test test test',
  position: 'left',
  messageId: 'testMessageId',
  time: '12:00',
  status: 'read',
};

const messageLink = {
  text: 'Красивое недлинное сообщение и ссылка на github.com',
  position: 'left',
  messageId: 'testMessageId',
  time: '12:00',
  status: 'read',
};

const actions = [
  { 
    action: 'edit', 
    title: 'изменить', 
    icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=edit',
  },
  { action: 'delete', 
    title: 'удалить', 
    icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=del',
  },
]

const messageWithoutTime = {
  text: 'test test test',
  messageId: 'testMessageId',
  status: 'read',
};

const messageLongText = {
  text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ' +
  'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', ' + 
  'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
  'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, ' +
  'sometimes by accident, sometimes on purpose (injected humour and the like).',
  time: '25:13',
  messageId: 'testMessageId',
  status: 'read',
};


export const LeftMessage: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
    },
  },
};

export const LeftMessageWithViews: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      views: 18495,
    },
  },
};

export const LeftMessageLongText: Story = {
  args: {
    message: {
      ...messageLongText,
      position: 'left',
    },
  },
};

export const LeftMessageWithSubtext: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      subText: '+79135292926',
    },
  },
};

export const LeftMessageWithoutTime: Story = {
  args: {
    message: {
      ...messageWithoutTime,
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

export const LeftMessageWithAvatar: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const LeftMessageWithLongTime: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      time: 'двенадцать дней назад',
    },
  },
};

export const RightMessage: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
    },
  },
};

export const RightMessageWithViews: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      views: 18495,
    },
  },
};

export const RightMessageLongText: Story = {
  args: {
    message: {
      ...messageLongText,
      position: 'right',
    },
  },
};

export const RightMessageWithSubtext: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      subText: 'Это Коля',
    },
  },
};

export const RightMessageWithoutTime: Story = {
  args: {
    message: {
      ...messageWithoutTime,
      position: 'right',
    },
  },
};

export const RightMessageStatusSend: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'send',
    },
  },
};

export const RightMessageStatusReceived: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'received',
    },
  },
};

export const RightMessageStatusRead: Story = {
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

export const RightMessageWithAvatar: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const RightMessageWithLongTime: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      time: 'двенадцать дней назад',
    },
  },
};

export const LeftMessageMax: Story = {
  args: {
    message: {
      ...messageLongText,
      position: 'left',
      subText: 'тест тест тест тест',
      actions,
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=SD',
      time: 'два дня назад',
    },
  },
};

export const RightMessageMax: Story = {
  args: {
    message: {
      ...messageLongText,
      position: 'right',
      subText: 'тест тест тест тест',
      actions,
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=SD',
      time: 'два дня назад',
    },
  },
};

export const LeftMessageWithLink: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'left',
    },
  },
};

export const RightMessageWithLink: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'right',
    },
  },
};