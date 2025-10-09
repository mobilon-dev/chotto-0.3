import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CommunicationPanel from '../CommunicationPanel.vue';

const meta = {
  title: 'Compounds/CommunicationPanel',
  component: CommunicationPanel,
  args: {},
} satisfies Meta<typeof CommunicationPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
