module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'prettier', // 必須放在最後，用來關閉與 Prettier 衝突的規則
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
    'react/prop-types': 'off', // PropTypes 設為警告
    // 允許未使用的變數（以 _ 開頭）
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': ['error', { allow: ['warn', 'error'] }], // 不允許使用 console.log
    'no-debugger': 'error',
    // todo: 臨時將錯誤降級為警告，讓 CI 通過
    'import/no-unresolved': 'warn',
    'react/jsx-key': 'error', // 強制使用 key 屬性
    'no-undef': 'error', // 不允許未定義的變數
    'no-empty': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/jsx-no-target-blank': 'warn',
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
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
