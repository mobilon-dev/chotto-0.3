import type { Meta, StoryObj } from '@storybook/vue3';
 
import AdvancedChat from './AdvancedChat.vue';
 
const meta: Meta<typeof AdvancedChat> = {
  component: AdvancedChat,
};
 
export default meta;
type Story = StoryObj<typeof AdvancedChat>;
 
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  /*
  render: (args) => ({
    components: { AdvancedChat },
    setup() {
      return { args };
    },
    template: '<AdvancedChat v-bind="args" />',
  }),
  */
  args: {
    chat: {
      avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
      name: "John Doe",
      lastMessage: "Привет!",
      countUnread: "2",
      timestamp: "12:34",
    },
  },
};


