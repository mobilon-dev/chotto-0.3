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
  {action: 'pin', title: 'прикрепить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=pin'},
  {action: 'edit', title: 'изменить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=edit'},
  {action: 'delete', title: 'удалить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=del'},
];

const actionsFileDropDown = [
  {action: 'image/*', title : 'Фото', icon : '../src/assets/icons/image.svg',},
  {action: 'video/*', title : 'Видео', icon : '../src/assets/icons/camera-video.svg',},
  {action: '', title : 'Файл', icon : '../src/assets/icons/file-earmark.svg',},
]

export const WithIcons: Story = {
  args: {
    actions: actionsWithIcons,
  },
};

export const FileDropDownMenu: Story = {
  args: {
    actions: actionsFileDropDown,
  },
};
