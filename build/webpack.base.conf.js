const path = require('path');

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.ts'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'lib': path.resolve(__dirname, '../src/lib'),
      'config': path.resolve(__dirname, '../src/config'),
      'graphics': path.resolve(__dirname, '../src/graphics'),
      'types': path.resolve(__dirname, '../src/types'),
      'node_modules': path.resolve(__dirname, '../node_modules'),
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: [ 'ts-loader' ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
