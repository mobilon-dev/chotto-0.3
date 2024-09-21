import type { Meta, StoryObj } from '@storybook/vue3';
 
// import Channels from './Channels.vue';
import Channels from './Channels2.vue';

const meta: Meta<typeof Channels> = {
  component: Channels,
};
 
export default meta;
type Story = StoryObj<typeof Channels>;
 

const testChannelsList = [
  {
    channelId: 'Ch-001',
    title: 'Test channel',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png'
    // type: 'standard',
  },
  {
    channelId: 'Ch-002',
    title: 'Test channel 2',    
    icon: 'whatsapp',
    type: 'default',
  },
  {
    channelId: 'channel1',    
    title: 'waba',
    icon: 'waba',
  },
];

export const Primary: Story = {
  args: {
    channels: testChannelsList,
  },
};

export const NoChannels: Story = {
  args: {
    channels: [],
  },
};
