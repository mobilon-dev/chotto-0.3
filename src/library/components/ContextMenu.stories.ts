import type { Meta, StoryObj } from '@storybook/vue3';
 
import ContextMenu from './ContextMenu.vue';

const meta: Meta<typeof ContextMenu> = {
  component: ContextMenu,
};
 
export default meta;
type Story = StoryObj<typeof ContextMenu>;
 
const actions = [
  {action: 'edit', title: 'изменить'},
  {action: 'delete', title: 'удалить'},
];
  
export const Standard: Story = {
  args: {
    actions,
  },
};

const actionsWithIcons = [
  {action: 'pin', title: 'прикрепить', icon: 'https://dummyimage.com/64x64/000/fff.png&text=pin'},
  {action: 'edit', title: 'изменить', icon: 'https://dummyimage.com/64x64/000/fff.png&text=edit'},
  {action: 'delete', title: 'удалить', icon: 'https://dummyimage.com/64x64/000/fff.png&text=del'},
];

export const WithIcons: Story = {
  args: {
    actions: actionsWithIcons,
  },
};
