require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  extends: ['@microsoft/eslint-config-spfx/lib/profiles/react'],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    'prefer-const': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/no-deprecated': 'off',
    'no-empty': 'off',
    'react/self-closing-comp': 'off',
    'no-var': 'off',
    'no-constant-condition': 'off'
  }
};
