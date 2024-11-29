import type { Meta, StoryObj } from '@storybook/vue3';
 
import SystemMessage from './SystemMessage.vue';
 
const meta: Meta<typeof SystemMessage> = {
  component: SystemMessage,
};
 
export default meta;
type Story = StoryObj<typeof SystemMessage>;

export const Standard: Story = {
  args: {
    message: {
      messageId: 'testId',
      text: 'text text text text text',
    },
  },
};
