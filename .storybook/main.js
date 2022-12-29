const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  framework: '@storybook/react',
  features: {
    storyStoreV7: true
  },
  core: {
    builder: 'webpack5',
    options: {
      lazyCompilation: true,
      fsCache: true
    }
  },
  stories: ['../docs/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    {
      name: '@storybook/addon-postcss',
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: "[path][name]__[local]",
          },
        },
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  webpackFinal: async (config, { configType }) => {
    config.plugins.push(new MiniCssExtractPlugin());

    return config;
  },
};
