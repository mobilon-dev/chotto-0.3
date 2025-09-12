import type { Preview } from '@storybook/vue3';
import '../src/assets/style.css';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen'
  }
};

export default preview;

import type { Preview } from "@storybook/vue3-vite";
import '../src/assets/style.css';
import 'primeicons/primeicons.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ['autodocs']
};

export default preview;
