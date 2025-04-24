import type { Meta, StoryObj } from '@storybook/vue3';
 
import ChatInput from './ChatInput.vue';

const meta: Meta<typeof ChatInput> = {
  component: ChatInput,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]
};
 
export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Standard: Story = {
  args: {
  },
};
