import path from 'path';
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  // Add path aliases
  webpackFinal: async (config: any) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');
    config.resolve.alias['@styled-system'] = path.resolve(
      __dirname,
      '../styled-system'
    );

    return config;
  },
};
export default config;
