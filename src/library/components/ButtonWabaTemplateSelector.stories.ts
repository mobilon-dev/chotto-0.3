import type { Meta, StoryObj } from '@storybook/vue3';
 
import {ButtonWabaTemplateSelector} from '.';
import {wabaTemplates, groupTemplates} from '../../data';
 
  
const meta: Meta<typeof ButtonWabaTemplateSelector> = {
  component: ButtonWabaTemplateSelector,
  parameters: {
    layout: 'centered',
  },
  decorators: [() => ({ template: '<div style="min-height: 100px; min-width: 800px; margin-top: 550px; padding: 0px 0px; position: relative"><story/></div>' })]
};
 
export default meta;
type Story = StoryObj<typeof ButtonWabaTemplateSelector>;
 
export const Standard: Story = {
  args: {
    wabaTemplates,
    groupTemplates,
  },
};
