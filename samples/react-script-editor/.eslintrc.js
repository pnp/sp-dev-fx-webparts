require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
    extends: ['@microsoft/eslint-config-spfx/lib/profiles/react'],
    parserOptions: { tsconfigRootDir: __dirname },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            'parserOptions': {
                'project': './tsconfig.json',
                'ecmaVersion': 2018,
                'sourceType': 'module'
            },
            rules: {
                // Prevent usage of the JavaScript null value, while allowing code to access existing APIs that may require null. https://www.npmjs.com/package/@rushstack/eslint-plugin
                '@typescript-eslint/no-explicit-any': 0,
            }
        }
    ]
};


