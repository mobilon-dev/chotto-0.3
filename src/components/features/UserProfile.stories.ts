import type { Meta, StoryObj } from '@storybook/vue3';
 
import UserProfile from './UserProfile.vue';

const meta: Meta<typeof UserProfile> = {
  component: UserProfile,
};
 
export default meta;
type Story = StoryObj<typeof UserProfile>;

const userProfile = {
  name: 'test user',
  userId: 'userId',
  email: 'test@tes.com',
  phone: '+7XXXXXXXX'
};

export const Standard: Story = {
  args: {
    user: userProfile,
  },
};

export const StandardWithAvatar: Story = {
  args: {
    user: {
      ...userProfile,
      avatar: 'https://dummyimage.com/64x64/000/fff.png&text=MV',
    },
  },
};
