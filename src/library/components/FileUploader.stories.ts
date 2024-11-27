import type { Meta, StoryObj } from '@storybook/vue3';
 
import FileUploader from './FileUploader.vue';

const meta: Meta<typeof FileUploader> = {
  component: FileUploader,
  decorators: [() => ({ template: '<div style="margin-top: 120px;"><story/></div>' })]
};
 
export default meta;
type Story = StoryObj<typeof FileUploader>;
 

export const Standard: Story = {
  args: {
  },
};
