module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'import'],
  rules: {
    // React 17+ 不需要 import React
    'react/react-in-jsx-scope': 'off',
    // PropTypes 設為警告
    'react/prop-types': 'warn',
    // 允許未使用的變數（以 _ 開頭）
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // 基本的代碼品質規則
    'no-console': 'warn',
    'no-debugger': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@components', './src/components'],
          ['@pages', './src/pages'],
          ['@assets', './src/assets'],
          ['@styles', './src/styles'],
          ['@utils', './src/utils'],
          ['@hooks', './src/hooks'],
          ['@store', './src/store'],
          ['@services', './src/services'],
          ['@plugins', './src/plugins'],
          ['@container', './src/container'],
          ['@layouts', './src/layouts'],
        ],
        extensions: ['.js', '.jsx'],
      },
    },
  },
}
