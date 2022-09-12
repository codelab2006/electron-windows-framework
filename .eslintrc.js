module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { tsconfigRootDir: __dirname, project: ['./tsconfig.json'] },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'prettier',
  ],
  rules: {
    eqeqeq: ['error', 'always'],
    '@typescript-eslint/no-empty-interface': 'off',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
  },
};
