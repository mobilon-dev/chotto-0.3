import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(ts|tsx)',
    '../src/**/*.mdx'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs'
  ],
  core: {},
  docs: {
    autodocs: true
  }
};

export default config;



