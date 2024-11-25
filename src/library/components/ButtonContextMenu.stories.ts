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
  
export const StandardRight: Story = {
  args: {
    storybook: true,
    actions: actions,
    buttonClass: 'pi pi-list',
    menuSide: 'right',
    contextMenuKey: 'sr',
  },
};

export const WithIcons: Story = {
  args: {
    storybook: true,
    actions: actionsWithIcons,
    buttonClass: 'pi pi-list',
    contextMenuKey: 'wi',
    menuSide: 'left',
  },
};

export const FileDropDownMenu: Story = {
  args: {
    storybook: true,
    actions: actionsFileDropDown,
    buttonClass: 'pi pi-file-arrow-up',
    contextMenuKey: 'fddm',
    menuSide: 'right',
  },
};

export const WithoutIcon: Story = {
  args: {
    storybook: true,
    actions: actions,
    buttonClass: '',
    buttonTitle: 'Нажми сюда',
    contextMenuKey: 'woi',
    menuSide: 'right',
  },
};

export const StandardTop: Story = {
  args: {
    storybook: true,
    actions: actions,
    buttonClass: 'pi pi-list',
    menuSide: 'top',
    contextMenuKey: 'st',
  },
};

export const StandardLeft: Story = {
  args: {
    storybook: true,
    actions: actions,
    buttonClass: 'pi pi-list',
    menuSide: 'left',
    contextMenuKey: 'sl',
  },
};

export const StandardBottom: Story = {
  args: {
    storybook: true,
    actions: actions,
    buttonClass: 'pi pi-list',
    menuSide: 'bottom',
    contextMenuKey: 'sr',
  },
};