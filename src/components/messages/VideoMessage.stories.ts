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
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      time: '12:12',
    },
  },
};
