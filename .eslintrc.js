module.exports = {
  rules: {
    'prettier/prettier': ['error'],

    // More rules
    'linebreak-style': ['error', 'unix'],
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': 'warn',

    // Use typescript-eslint rules instead eslint
    'no-unused-vars': 'off',
    'no-redeclare': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-redeclare': ['warn'],

    // React
    'react/display-name': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 'warn',
    'react-hooks/exhaustive-deps': 'off',

    'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],

    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier/react'],
  plugins: ['@typescript-eslint', 'react', 'prettier', 'simple-import-sort'],
  settings: {
    react: {
      pragma: 'React',
      version: '17.0.0',
    },
  },
};
