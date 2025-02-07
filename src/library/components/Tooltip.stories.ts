import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue'

import Tooltip from './Tooltip.vue';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  decorators: [() => ({ template: '<div style="margin: 100px;"><story/></div>' })]
};
 
export default meta;
type Story = StoryObj<typeof Tooltip>;
  
export const Right: Story = {
  args: {
    text: 'right',
    position: 'right',
    default: h('span','hover me')
  }
};


export const Top: Story = {
  args: {
    text: 'top',
    position: 'top',
    default: h('span','hover me')
  },
};

export const Left: Story = {
  args: {
    text: 'left',
    position: 'left',
    default: h('span','hover me')
  },
};

export const Bottom: Story = {
  args: {
    text: 'bottom',
    position: 'bottom',
    default: h('span','hover me')
  },
};
