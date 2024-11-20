import type { Meta, StoryObj } from '@storybook/vue3';
 
import FileUploader from './FileUploader.vue';

const meta: Meta<typeof FileUploader> = {
  component: FileUploader,
};
 
export default meta;
type Story = StoryObj<typeof FileUploader>;
 

export const Standard: Story = {
  args: {
    storybook: true,
  },
};
