import type { Meta, StoryObj } from '@storybook/vue3';
 
import ThemeMode from './ThemeMode.vue';

const meta: Meta<typeof ThemeMode> = {
  component: ThemeMode,
};
 
export default meta;
type Story = StoryObj<typeof ThemeMode>;

const ThemeModeItems = [
  {
    code: 'light',
    name: 'Light',
  },
  {
    code: 'dark',
    name: 'Dark',
  },
  {
    code: 'green',
    name: 'Green',
  },
];


export const Standard: Story = {
  args: {
    themes: ThemeModeItems
  },
};

