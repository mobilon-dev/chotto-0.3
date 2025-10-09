import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Modal from '../Modal.vue';

const meta = {
  title: 'Atoms/Modal',
  component: Modal,
  args: {},
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
