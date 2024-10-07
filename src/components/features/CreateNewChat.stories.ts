import type { Meta, StoryObj } from '@storybook/vue3';
 
import CreateNewChat from './CreateNewChat.vue';

const meta: Meta<typeof CreateNewChat> = {
  component: CreateNewChat,
};
 
export default meta;
type Story = StoryObj<typeof CreateNewChat>;
 
const users = [
  {userId: 'user1', name: 'Василий Петрович'},
  {userId: 'user2', name: 'Настасья Ивановна'},
];
  
export const Standard: Story = {
  args: {
    title: '+ чат',
    users,
    isChatName: true,
  },
};
