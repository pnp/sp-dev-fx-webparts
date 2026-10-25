const spfxProfile = require('@microsoft/eslint-config-spfx/lib/flat-profiles/react');

module.exports = [
  {
    ignores: [
      'preview/**',
      'node_modules/**',
      'lib/**',
      'lib-commonjs/**',
      'lib-esm/**',
      'dist/**',
      'release/**',
      'temp/**',
      'jest-output/**',
      'sharepoint/**'
    ]
  },
  ...spfxProfile,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      }
    }
  }
];
