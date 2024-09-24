import type { Meta, StoryObj } from '@storybook/vue3';
 
import AudioMessage from './AudioMessage.vue';
 
const meta: Meta<typeof AudioMessage> = {
  component: AudioMessage,
};
 
export default meta;
type Story = StoryObj<typeof AudioMessage>;

export const LeftMessage: Story = {
  args: {
    message: {
      url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
      position: 'left',
      messageId: 'testMessageId',
      time: '12:00',
      status: 'read',
    },
  },
};

export const RightMessage: Story = {
  args: {
    message: {
      url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
      position: 'right',
      messageId: 'testMessageId',
      time: '12:00',
      status: 'read',
    },
  },
};
