module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', '@typescript-eslint', 'react-hooks'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true, argsIgnorePattern: '^_' },
    ],
    'consistent-return': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'linebreak-style': 'off',
    'no-debugger': 'off',
    'no-mixed-operators': 'off',
    'no-nested-ternary': 'off',
    'no-restricted-syntax': 'off',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
      },
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          multiline: true,
          consistent: true,
        },
      },
    ],
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/destructuring-assignment': ['off', 'always', { ignoreClassFields: true }],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/jsx-one-expression-per-line': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/no-multi-comp': 'off',
    'react/no-unused-prop-types': 'warn',
  },
  overrides: [
    {
      files: ['**/*.test.*'],
      env: {
        jest: true,
      },
    },
  ],
};
