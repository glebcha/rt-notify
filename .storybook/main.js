// const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  stories: ["../docs/**/*.stories.@(tsx|mdx)"],
  addons: ["@storybook/addon-knobs", "@storybook/addon-docs"],
  webpackFinal: async (config, { configType }) => {
    const isDev = configType === "DEVELOPMENT";

    config.module.rules = config.module.rules.map((fileName) => {
      // Needed to add this to ignore our ../src/ for the default rule, instead of purging it.
      if (fileName.test.toString() === "/\\.css$/") {
        fileName.exclude = path.resolve(__dirname, "../src/");
      }

      return fileName;
    });

    config.plugins.push(new MiniCssExtractPlugin());
    // config.plugins.push(
    //   new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery'
    //   })
    // );

    // config.module.rules.push({
    //   test: /\.scss$/,
    //   use: [
    //     isDev ? "style-loader" : MiniCssExtractPlugin.loader,
    //     {
    //       loader: 'css-loader',
    //       options: {
    //         importLoaders: 1
    //       },
    //     },
    //     'resolve-url-loader',
    //     'sass-loader'
    //   ]
    // });

    config.module.rules.push({
      test: /\.css$/,
      use: [
        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[name]__[local]___[hash:base64:5]",
            },
            importLoaders: 1,
          },
        },
        "postcss-loader",
      ],
    });

    return config;
  },
};

const path = require("path");

// module.exports = ({ config }) => {
//   config.module.rules = config.module.rules.map(fileName => {
//     // Needed to add this to ignore our ../src/ for the default rule, instead of purging it.
//     if (fileName.test.toString() === '/\\.css$/') {
//       fileName.exclude = path.resolve(__dirname, '../src/');
//     }

//     return fileName;
//   });

//   config.module.rules.push({
//     test: /\.(ts|tsx)$/,
//     loader: require.resolve('babel-loader'),
//     options: {
//       presets: [['react-app', { flow: false, typescript: true }]],
//     },
//   });

//   config.module.rules.push({
//     test: /\.css$/,
//     use: [
//       'style-loader',
//       {
//         loader: 'css-loader',
//         options: {
//           modules: {
//             localIdentName: '[name]__[local]___[hash:base64:5]',
//           },
//           importLoaders: 1
//         },
//       },
//       'postcss-loader'
//     ]
//   });

//   config.resolve.extensions.push('.ts', '.tsx');
//   return config;
// }
