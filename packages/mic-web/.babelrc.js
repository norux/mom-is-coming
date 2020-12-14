module.exports = {
  presets: ['@babel/preset-react'],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: { version: 3, proposals: true },
        helpers: true,
        regenerator: true,
        useESModules: true,
      },
    ],
  ],
};
