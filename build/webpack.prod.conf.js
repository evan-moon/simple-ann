const baseConf = require('./webpack.base.conf');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConf, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      showErrors: true,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    })
  ],
});
