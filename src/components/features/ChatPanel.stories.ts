import type { Meta, StoryObj } from '@storybook/vue3';
 
import ChatPanel from './ChatPanel.vue';

const meta: Meta<typeof ChatPanel> = {
  component: ChatPanel,

};
 
export default meta;
type Story = StoryObj<typeof ChatPanel>;
 
export const Standard: Story = {
  args: {
    title: 'test panel',
    content: 'wrwer ewrwe r'
  },
};

