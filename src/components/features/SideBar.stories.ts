import type { Meta, StoryObj } from '@storybook/vue3';
 
import SideBar from './SideBar.vue';

const meta: Meta<typeof SideBar> = {
  component: SideBar,
};
 
export default meta;
type Story = StoryObj<typeof SideBar>;

const sidebarItems = [
  {
    itemId: 'itemId0',
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=SD',
    name: 'manager1 manage',
    selected: false,
  },
  {
    itemId: 'itemId1',
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=PN',
    name: 'manager2',
    selected: false,
  },
  {
    itemId: 'itemId2',
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=MV',
    name: 'manager3 manage',
    selected: false,
  },
  {
    itemId: 'itemId3',
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=PS',
    name: 'manager4',
    isFixedBottom: true,
    selected: false,
  },
];

const sidebarItemsWithNotifications = [
  {
    itemId: 'itemId0',
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=SD',
    name: 'manager1',
    notificationCount: 10,
    notificationColor: '#FF0000',
    selected: false,
  },
  {
    itemId: 'itemId1',
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=PN',
    name: 'manager2',
    notificationCount: 100,
    notificationColor: '#00FF00',
    selected: false,
  },
  {
    itemId: 'itemId2',
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=MV',
    name: 'manager3',
    notificationCount: 3,
    notificationColor: '#0000FF',
    selected: false,
  },
  {
    itemId: 'itemId3',
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=PS',
    name: 'manager4',
    isFixedBottom: true,
    notificationCount: 17,
    notificationColor: '#00FFFF',
    selected: false,
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

const sidebarItemsWithSelected = [
  {
    itemId: 'itemId0',
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=SD',
    name: 'manager1',
    notificationCount: 10,
    notificationColor: '#FF0000',
    selected: true,
  },
  {
    itemId: 'itemId1',
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=PN',
    name: 'manager2',
    notificationCount: 100,
    notificationColor: '#00FF00',
    selected: false,
  },
  {
    itemId: 'itemId2',
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=MV',
    name: 'manager3',
    notificationCount: 3,
    notificationColor: '#0000FF',
    selected: false,
  },
  {
    itemId: 'itemId3',
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=PS',
    name: 'manager4',
    isFixedBottom: true,
    notificationCount: 17,
    notificationColor: '#00FFFF',
    selected: false,
  },
];

export const SidebarWithSelecte: Story = {
  args: {
    sidebarItems: sidebarItemsWithSelected,
  },
};
