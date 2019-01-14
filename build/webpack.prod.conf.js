const baseConf = require('./webpack.base.conf');
const merge = require('webpack-merge');

module.exports = merge(baseConf, {
  plugins: [],
});
