import type { Meta, StoryObj } from '@storybook/vue3';
 
import ButtonContextMenu from './ButtonContextMenu.vue';

const meta: Meta<typeof ButtonContextMenu> = {
  component: ButtonContextMenu,
  parameters: {
    layout: 'centered',
  },
  decorators: [() => ({ template: '<div style="margin: 100px;"><story/></div>' })]
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

const actionsLA = [
  {action: 'edit', title: 'слишком длинное-длинное поле в слишком коротком-коротком меню'},
  {action: 'delete', title: 'слишком длинное-длинное поле в слишком коротком-коротком меню'},
];
  
export const StandardRight: Story = {
  args: {
    actions: actions,
    buttonClass: 'pi pi-list',
    menuSide: 'right',
    contextMenuKey: 'sr',
  },
  
};

export const WithIcons: Story = {
  args: {
    actions: actionsWithIcons,
    buttonClass: 'pi pi-list',
    contextMenuKey: 'wi',
    menuSide: 'left',
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
    actions: actions,
    buttonClass: '',
    buttonTitle: 'Нажми сюда',
    contextMenuKey: 'woi',
    menuSide: 'right',
  },
};

export const StandardTop: Story = {
  args: {
    actions: actions,
    buttonClass: 'pi pi-list',
    menuSide: 'top',
    contextMenuKey: 'st',
  },
};

export const StandardLeft: Story = {
  args: {
    actions: actions,
    buttonClass: 'pi pi-list',
    menuSide: 'left',
    contextMenuKey: 'sl',
  },
};

export const StandardBottom: Story = {
  args: {
    actions: actions,
    buttonClass: 'pi pi-list',
    menuSide: 'bottom',
    contextMenuKey: 'sb',
  },
};

export const LongActions: Story = {
  args: {
    actions: actionsLA,
    buttonClass: 'pi pi-list',
    menuSide: 'right',
    contextMenuKey: 'la',
  },
};