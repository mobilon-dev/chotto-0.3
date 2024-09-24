import type { Meta, StoryObj } from '@storybook/vue3';
 
import DateMessage from './DateMessage.vue';
 
const meta: Meta<typeof DateMessage> = {
  component: DateMessage,
};
 
export default meta;
type Story = StoryObj<typeof DateMessage>;

// const currentDateTimeUTC = new Date().toUTCString();

export const Today: Story = {
  args: {
    message: {
      message: 'test',
    }
  },
};
