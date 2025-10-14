import type { Meta, StoryObj } from '@storybook/vue3-vite';
// import { h } from 'vue'

import Tooltip from '../Tooltip.vue';
const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  render: (args) => ({
    components: { Tooltip },
    setup() { return { args }; },
    template: `
      <div style="margin: 100px;">
        <Tooltip 
          :text="args.text" 
          :position="args.position"
        >
          <div v-html="args.default"></div>
        </Tooltip>
      </div>
    `
  }),
  decorators: [() => ({ template: '<div style="margin: 100px;"><story/></div>' })]
};
 
export default meta;
type Story = StoryObj<typeof Tooltip>;
  
export const Right: Story = {
  args: {
    text: 'right',
    position: 'right',
    default: '<span>hover me</span>',
  }
};


export const Top: Story = {
  args: {
    text: 'top',
    position: 'top',
    default: '<span>hover me</span>',
  },
};

export const Left: Story = {
  args: {
    text: 'left',
    position: 'left',
    default:'<span>hover me</span>'
  },
};

export const Bottom: Story = {
  args: {
    text: 'bottom',
    position: 'bottom',
    default: '<span>hover me</span>'
  },
};
