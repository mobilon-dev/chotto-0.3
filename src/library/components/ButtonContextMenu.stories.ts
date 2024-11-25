import type { Meta, StoryObj } from '@storybook/vue3';
 
import ButtonContextMenu from './ButtonContextMenu.vue';

const meta: Meta<typeof ButtonContextMenu> = {
  component: ButtonContextMenu,
};
 
export default meta;
type Story = StoryObj<typeof ButtonContextMenu>;
 
const actions = [
  {action: 'edit', title: 'изменить'},
  {action: 'delete', title: 'удалить'},
];

const actionsWithIcons = [
  {action: 'pin', title: 'прикрепить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=pin'},
  {action: 'edit', title: 'изменить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=edit'},
  {action: 'delete', title: 'удалить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=del'},
];

const actionsFileDropDown = [
  {action: 'image/*', title : 'Фото', prime: 'image',},
  {action: 'video/*', title : 'Видео', prime: 'video',},
  {action: '', title : 'Файл', prime: 'file',},
]
  
export const Standard: Story = {
  args: {
    actions,
    buttonClass: 'pi pi-list',
    menuSide: 'right',
  },
};

export const WithIcons: Story = {
  args: {
    actions: actionsWithIcons,
    buttonClass: 'pi pi-list',
    contextMenuKey: 'wi',
    menuSide: 'right',
  },
};

export const FileDropDownMenu: Story = {
  args: {
    actions: actionsFileDropDown,
    buttonClass: 'pi pi-file-arrow-up',
    contextMenuKey: 'fddm',
    menuSide: 'right',
  },
};

export const WithoutIcon: Story = {
  args: {
    actions,
    buttonClass: '',
    buttonTitle: 'Нажми сюда',
    contextMenuKey: 'woi',
    menuSide: 'right',
  },
};
