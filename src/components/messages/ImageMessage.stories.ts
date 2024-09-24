import type { Meta, StoryObj } from '@storybook/vue3';
 
import ImageMessage from './ImageMessage.vue';
 
const meta: Meta<typeof ImageMessage> = {
  component: ImageMessage,
};
 
export default meta;
type Story = StoryObj<typeof ImageMessage>;

export const LeftImageMessage: Story = {
  args: {
    message: {
      url: 'https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg',
      alt: 'left',
      messageId: 'testMessageId',
      time: '12:00',
      status: 'read',
    },
  },
};
