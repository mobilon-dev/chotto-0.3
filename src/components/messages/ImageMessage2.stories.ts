import type { Meta, StoryObj } from '@storybook/vue3';
 
import ImageMessage from './ImageMessage2.vue';
 
const meta: Meta<typeof ImageMessage> = {
  component: ImageMessage,
};
 
export default meta;
type Story = StoryObj<typeof ImageMessage>;

export const LeftImageMessage: Story = {
  args: {   
    message: { 
      position: 'left',
      text: "Вот картинка55656",
      url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
      status: 'sent',
      time: '20:55',
    },
  },
};

export const RightImageMessage: Story = {
  args: {   
    message: {
      position: 'right',
      text: "Вот картинка55656",
      url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
      status: 'read',
      time: '20:55',
    },
  },
};
