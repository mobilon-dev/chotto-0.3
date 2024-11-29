import type { Meta, StoryObj } from '@storybook/vue3';
 
import VideoMessage from './VideoMessage.vue';
 
const meta: Meta<typeof VideoMessage> = {
  component: VideoMessage,
};
 
export default meta;
type Story = StoryObj<typeof VideoMessage>;

export const LeftMessage: Story = {
  args: {
    message: {
      messageId: 'testId',
      position: 'left',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      time: '12:12',
      status: 'read',
    },
  },
};


export const RighttMessage: Story = {
  args: {
    message: {
      messageId: 'testId',
      position: 'right',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      time: '20:55',
      status: 'read',
    },
  },
};
