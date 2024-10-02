import type { Meta, StoryObj } from '@storybook/vue3';
 
import Profile from './Profile.vue';

const meta: Meta<typeof Profile> = {
  component: Profile,
};
 
export default meta;
type Story = StoryObj<typeof Profile>;

export const Standard: Story = {
  args: {
    user: {
      name: 'test user',
      userId: 'userId',
      email: 'test@tes.com',
      phone: '+7XXXXXXXX'
    }
  },
};
