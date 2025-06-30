// .eslintrc.js (example)
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json', // Ensure this path is correct for your project
      sourceType: 'module',
      ecmaVersion: 2020
    },
    extends: [
      'plugin:@typescript-eslint/recommended'
    ],
    plugins: [
      '@typescript-eslint'
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off"
    }
  };
  