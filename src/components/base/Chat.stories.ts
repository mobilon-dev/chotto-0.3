import type { Meta, StoryObj } from '@storybook/vue3';
 
import Chat from './Chat.vue';
 
const meta: Meta<typeof Chat> = {
  component: Chat,
};
 
export default meta;
type Story = StoryObj<typeof Chat>;
 
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  /*
  render: (args) => ({
    components: { Chat },
    setup() {
      return { args };
    },
    template: '<Chat v-bind="args" />',
  }),
  */
  args: {
    chat: {
      name: 'test chat',
      countUnread: 1
    },
  },
};

export const PrimaryLongTitle: Story = {
  /*
  render: (args) => ({
    components: { Chat },
    setup() {
      return { args };
    },
    template: '<Chat v-bind="args" />',
  }),
  */
  args: {
    chat: {
      name: 'test chat test chat test chat test chat',
      countUnread: 1
    },
  },
};


