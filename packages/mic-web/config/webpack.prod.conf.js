process.env.NODE_ENV = 'production';

const { merge } = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common.conf');
const shouldWatch = process.env.BUILD_WATCH || false;

module.exports = merge(webpackCommonConfig, {
  mode: 'production',
  ...(shouldWatch && {
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  }),
});
