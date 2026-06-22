require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: ['@microsoft/eslint-config-spfx/lib/profiles/react'],
  parserOptions: { 
    tsconfigRootDir: __dirname 
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2018,
        sourceType: 'module'
      },
      rules: {
        // Disable the no-void rule to allow void keyword
        'no-void': 'off',
        
        // Allow explicit any when necessary
        '@typescript-eslint/no-explicit-any': 'warn',
        
        // Other common SPFx adjustments
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'react/jsx-no-bind': 'off',
        'react/no-deprecated': 'warn',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/typedef': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'off'
      }
    }
  ]
};