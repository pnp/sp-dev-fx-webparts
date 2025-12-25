require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  extends: ['@microsoft/eslint-config-spfx/lib/profiles/default'],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    // Security-focused ESLint rules
    'no-eval': 'error',                           // Prevent eval() usage
    'no-implied-eval': 'error',                   // Prevent implied eval via setTimeout/setInterval strings
    'no-new-func': 'error',                       // Prevent new Function() constructor
    'no-script-url': 'error',                     // Prevent javascript: URLs
    'no-proto': 'error',                          // Prevent __proto__ manipulation
    'no-extend-native': 'error',                  // Prevent extending native prototypes
    'no-return-assign': 'error',                  // Prevent assignment in return statements
    'no-throw-literal': 'error',                  // Require throwing Error objects
    'prefer-promise-reject-errors': 'error',      // Require Error objects in Promise rejections
    'no-unused-expressions': 'warn',              // Warn on unused expressions
    'eqeqeq': ['error', 'always'],                // Require === and !==
    'no-var': 'warn',                             // Prefer let/const over var
    'prefer-const': 'warn'                        // Prefer const when variable is not reassigned
  }
};
