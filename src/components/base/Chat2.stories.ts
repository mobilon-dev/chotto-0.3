import type { Meta, StoryObj } from '@storybook/vue3';
 
import Chat2 from './Chat2.vue';
 
const meta: Meta<typeof Chat2> = {
  component: Chat2,
};
 
export default meta;
type Story = StoryObj<typeof Chat2>;
 
const chat = {  
  name: "John Doe",
  lastMessage: "Привет!",
  countUnread: "2",
  'lastActivity.time': "12:34",
};

const actions = [
  {action: 'edit', title: 'изменить',},
  {action: 'delete', title: 'удалить',},
]

export const Chat: Story = {
  args: {
    chat: {
      ...chat,
    },
  },
};

export const ChatWithoutLastMessage: Story = {
  args: {
    chat: {
      ...chat,
      lastMessage: null,
    },
  },
};

export const ChatWithAvatar: Story = {
  args: {
    chat: {
      ...chat,
      avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
    },
  },
};


export const ChatWithUnread: Story = {
  args: {
    chat: {
      ...chat,
      countUnread: "123",
    }
  },
};

export const ChatWithLongLastMessage: Story = {
  args: {
    chat: { ...chat,
      lastMessage: "Очень длинное текстовое сообщение. Его надо как-то немного спрятать",
      countUnread: "0",
    },
  },
};

export const ChatSelected: Story = {
  args: {
    chat: {
      ...chat,
      isSelected: true,
    },
  },
};

export const ChatWithActions: Story = {
  args: {
    chat: {
      ...chat,
      actions,
    },
  },
};

export const ChatMax: Story = {
  args: {
    chat: {
      ...chat,
      avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
      actions,
    },
  },
};

