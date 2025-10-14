import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Tooltip from './Tooltip.vue';

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  args: {
    text: 'Hello tooltip',
    position: 'top',
  },
  render: (args) => ({
    components: { Tooltip },
    setup() { return { args }; },
    template: `
      <div style="padding: 40px">
        <Tooltip v-bind="args">
          <button>Hover me</button>
        </Tooltip>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {};


