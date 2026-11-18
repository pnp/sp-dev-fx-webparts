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
    },
    rules: {
      'require-atomic-updates': 'off',
      '@rushstack/no-new-null': 'off',
      'no-void': ['warn', { allowAsStatement: true }]
    }
  }
];
