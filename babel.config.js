module.exports = {
  babelrcRoots: ['.', 'packages/*'],
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-typescript',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
  ],
};
