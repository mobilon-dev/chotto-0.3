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
    icon: 'telegram',
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
