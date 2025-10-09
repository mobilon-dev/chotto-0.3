import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import ButtonEmojiPicker from '../ButtonEmojiPicker.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
  
const meta: Meta<typeof ButtonEmojiPicker> = {
  component: ButtonEmojiPicker,
  parameters: {
    layout: 'centered',
  },
  render: (args) => ({
    components: {BaseContainer, ButtonEmojiPicker},
    setup() {return {args}},
    template: `
     <BaseContainer data-theme='light'>
       <div style="margin: 100px;">
         <ButtonEmojiPicker v-bind=args />
       </div>
     </BaseContainer>
    ` 
   }),
};


  
export default meta;
type Story = StoryObj<typeof ButtonEmojiPicker>;
 
export const StandardHovering: Story = {
  decorators: [() => ({ template: '<div style="min-height: 100px; min-width: 200px; margin-top: 250px; padding: 0px 0px; position: relative"><story/></div>' })]
};

export const StandardClicking: Story = {
  args:{
    mode: 'click'
  },
  decorators: [() => ({ template: '<div style="min-height: 100px; min-width: 200px; margin-top: 250px; padding: 0px 0px; position: relative"><story/></div>' })]
};

export const InactiveButton: Story = {
  args: {
    state: 'disabled',
  }
}