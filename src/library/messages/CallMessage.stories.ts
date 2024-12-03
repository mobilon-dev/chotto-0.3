import type { Meta, StoryObj } from '@storybook/vue3';
 
import CallMessage from './CallMessage.vue';
import { ICallMessage } from '../../types';

const meta: Meta<typeof CallMessage> = {
  component: CallMessage,
};
 
export default meta;
type Story = StoryObj<typeof CallMessage>;

const message: ICallMessage = {
  url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
  position: 'left',
  messageId: 'testMessageId',
  time: '12:00',
  status: 'read',
};

export const NoAnswerLeft: Story = {
  args: {
    message: {
      ...message,
    } as ICallMessage,
  },
};

export const NoAnswerRight: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
    } as ICallMessage,
  },
};

export const CallHappenedLeft: Story = {
  args: {
    message: {
      ...message,
      status: 'read',
      callDuration: '5:00',
    },
  },
};

export const CallHappenedRight: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      callDuration: '5:00',
    },
  },
};


export const RecallLeft: Story = {
  args: {
    message: {
      url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
      position: 'left',
      messageId: 'testMessageId',
      time: '12:00',
      status: 'read',
      isMissedCall: true,
    },
  },
};

export const RecallRight: Story = {
  args: {
    message: {
      url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
      position: 'right',
      messageId: 'testMessageId',
      time: '12:00',
      status: 'read',
      isMissedCall: true,
    },
  },
};
