import type { Meta, StoryObj } from '@storybook/vue3';
 
import ToolBar from './ToolBar.vue';

const meta: Meta<typeof ToolBar> = {
  component: ToolBar,
};
 
export default meta;
type Story = StoryObj<typeof ToolBar>;

const sidebarItems = [
  {
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=SD',
    name: 'manager1',
  },
  {
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=PN',
    name: 'manager2',
  },
  {
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=MV',
    name: 'manager3',
  },
  {
    icon: 'https://dummyimage.com/64x64/000/fff.png&text=PS',
    name: 'manager4',
    isFixedBottom: true,
  },
];

export const Standard: Story = {
  args: {
    sidebarItems
  },
};
