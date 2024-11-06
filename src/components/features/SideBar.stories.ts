import type { Meta, StoryObj } from '@storybook/vue3';
 
import SideBar from './SideBar.vue';

const meta: Meta<typeof SideBar> = {
  component: SideBar,
};
 
export default meta;
type Story = StoryObj<typeof SideBar>;

const sidebarItems = [
  {
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=SD',
    name: 'manager1 manage',
  },
  {
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=PN',
    name: 'manager2',
  },
  {
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=MV',
    name: 'manager3 manage',
  },
  {
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=PS',
    name: 'manager4',
    isFixedBottom: true,
  },
];

const sidebarItemsWithNotifications = [
  {
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=SD',
    name: 'manager1',
    notificationCount: 10,
    notificationColor: '#FF0000',
  },
  {
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=PN',
    name: 'manager2',
    notificationCount: 100,
    notificationColor: '#00FF00',
  },
  {
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=MV',
    name: 'manager3',
    notificationCount: 3,
    notificationColor: '#0000FF',
  },
  {
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=PS',
    name: 'manager4',
    isFixedBottom: true,
    notificationCount: 17,
    notificationColor: '#00FFFF',
  },
];

export const Standard: Story = {
  args: {
    sidebarItems
  },
};

export const SidebarWithNotifications: Story = {
  args: {
    sidebarItems: sidebarItemsWithNotifications,
  },
};

export const SidebarWithSelectedByDefault: Story = {
  args: {
    sidebarItems: sidebarItemsWithNotifications,
    defaultSelectedItemIndex: 1,
  },
};
