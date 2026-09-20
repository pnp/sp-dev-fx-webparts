const spfxProfile = require('@microsoft/eslint-config-spfx/lib/flat-profiles/react');

module.exports = [
  ...spfxProfile,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      }
    }
  },
  // Vendored reusable components carried over from the shared component library.
  // They follow that library's conventions, so relax a few stylistic rules here
  // to avoid churning third-party code.
  {
    files: ['src/components/**/*.ts', 'src/components/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-use-before-define': 'off',
      '@rushstack/no-new-null': 'off',
      '@rushstack/import-requires-chunk-name': 'off'
    }
  }
];
