import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ContactInfo from '../ContactInfo.vue';

const meta = {
  title: 'Elements/ContactInfo',
  component: ContactInfo,
  args: {},
} satisfies Meta<typeof ContactInfo>;

export default meta;

type Story = StoryObj<typeof ContactInfo>;

export const Default: Story = {
  args: {
    contact: {
      attributes: [
        { id: 1, value: 'Телефон' },
        { id: 2, value: 'Email' },
        { id: 3, value: 'Адрес' }
      ]
    },
    channels: [
      {
        channelId: 'whatsapp-001',
        title: 'WhatsApp',
        icon: 'whatsapp'
      },
      {
        channelId: 'telegram-001', 
        title: 'Telegram',
        icon: 'telegram'
      }
    ],
    currentDialog: {
      attributeId: 1
    }
  },
};
