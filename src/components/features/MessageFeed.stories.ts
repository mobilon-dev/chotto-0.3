import type { Meta, StoryObj } from '@storybook/vue3';
 
import MessageFeed from './MessageFeed.vue';
 
const meta: Meta<typeof MessageFeed> = {
  component: MessageFeed,
};
 
export default meta;
type Story = StoryObj<typeof MessageFeed>;

const currentDateTimeUTC = new Date().toUTCString();

export const Primary: Story = {
  args: {
    messages: [
      { type: "system.date",   messageId: '1', datetimeUTC: currentDateTimeUTC,},
      { type: "message.text",  messageId: '2', text: "Привет!", position: 'left', status: 'read', time: '12:30'},
      { type: "message.text",  messageId: '3', text: "Привет!", position: 'right', isRead: true},
      { type: "message.image", messageId: '4', url: "https://example.com/image.jpg", alt: "Example Image", position: 'left'},
      { type: "message.file",  messageId: '5', url: "https://example.com/file.pdf", filename: "Документ.pdf" },
      { type: "message.text",  messageId: '6',text: "Привет!", direction: 'incoming', isRead: true},
      { type: "message.image", messageId: '7', url: "https://example.com/image.jpg", alt: "Example Image", direction: 'outgoing'},
    ],
  },
};


