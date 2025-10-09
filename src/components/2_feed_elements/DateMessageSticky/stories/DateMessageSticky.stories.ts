import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DateMessageSticky from '../DateMessageSticky.vue';

const meta = {
  title: 'Molecules/DateMessageSticky',
  component: DateMessageSticky,
  args: {},
} satisfies Meta<typeof DateMessageSticky>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Сегодня'
  },
};
