import type { Meta, StoryObj } from '@storybook/vue3-vite';
import WABAAttachmentSection from '../WABAAttachmentSection.vue';

const meta = {
  title: 'Elements/WABAAttachmentSection',
  component: WABAAttachmentSection,
  args: {},
} satisfies Meta<typeof WABAAttachmentSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
