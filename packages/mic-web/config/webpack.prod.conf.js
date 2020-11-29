process.env.NODE_ENV = 'production';

const { merge } = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common.conf');

module.exports = merge(webpackCommonConfig, {
  mode: 'production',
});
