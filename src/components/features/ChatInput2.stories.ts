import type { Meta, StoryObj } from '@storybook/vue3';
 
import ChatInput from './ChatInput2.vue';

const meta: Meta<typeof ChatInput> = {
  component: ChatInput,
};
 
export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Standard: Story = {
  args: {
  },
};
