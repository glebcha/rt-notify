const path = require('path');

module.exports = ({ config }) => {
  config.module.rules = config.module.rules.map(fileName => {
    // Needed to add this to ignore our ../src/ for the default rule, instead of purging it.
    if (fileName.test.toString() === '/\\.css$/') {
      fileName.exclude = path.resolve(__dirname, '../src/');
    }

    return fileName;
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
    },
  });

  config.module.rules.push({
    test: /\.css$/,
    use: [
      'style-loader',
      { 
        loader: 'css-loader', 
        options: { 
          modules: {
            localIdentName: '[name]__[local]___[hash:base64:5]',
          }, 
          importLoaders: 1 
        }, 
      },
      'postcss-loader'
    ]
  });

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
}
