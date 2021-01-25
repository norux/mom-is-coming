process.env.NODE_ENV = 'development';

const { merge } = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common.conf');

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
