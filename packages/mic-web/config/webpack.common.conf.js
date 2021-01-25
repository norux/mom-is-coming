const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = fs.realpathSync(process.cwd());
const resolveRoot = relativePath => path.resolve(rootDir, relativePath);

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: [
    require.resolve('core-js/modules/es.promise.finally'),
    require.resolve('core-js/modules/es.map'),
    require.resolve('core-js/modules/es.set'),
    require.resolve('core-js/modules/es.object.entries'),
    require.resolve('core-js/modules/es.object.values'),
    require.resolve('core-js/modules/es.array.find'),

    resolveRoot('src/index.tsx'),
  ],
  output: {
    path: isEnvProduction ? resolveRoot('dist') : undefined,
    filename: isEnvProduction ? 'js/[name].[contenthash:8].js' : isEnvDevelopment && 'js/app.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': resolveRoot('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          rootMode: 'upward',
        },
      },
      {
        test: /\.s?css$/,
        use: [isEnvDevelopment && 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'].filter(Boolean),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolveRoot('public/index.html'),
      favicon: resolveRoot('public/favicon.png'),
    }),
  ],
};
