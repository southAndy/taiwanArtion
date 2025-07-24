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
    'react/jsx-key': 'error', // force use key attribute
    'react/jsx-no-target-blank': 'warn',
    'react/no-unescaped-entities': 'warn',

    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // not allow unused vars
    'no-console': ['error', { allow: ['warn', 'error'] }], // not allow console.log
    'no-debugger': 'error', // not allow debugger

    'import/no-unresolved': 'warn',
    'no-undef': 'error', // not allow undefined variables
    'no-empty': 'warn',
    eqeqeq: 'error', // not allow == or !=
    'no-var': 'error', // not allow var
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
