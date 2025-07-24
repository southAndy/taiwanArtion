module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'prettier', // must be at the end, to close the rules that conflict with Prettier
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
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // not allow unused vars
    'no-console': ['error', { allow: ['warn', 'error'] }], // not allow console.log
    'no-debugger': 'error',

    'import/no-unresolved': 'warn',
    'react/jsx-key': 'error', // force use key attribute
    'no-undef': 'error', // not allow undefined variables
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
