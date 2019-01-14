const baseConf = require('./webpack.base.conf');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConf, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      showErrors: true,
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 8081,
    contentBase: './dist',
    stats: {
      color: true,
    },
  },
});
