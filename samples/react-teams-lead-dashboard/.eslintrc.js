require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  extends: ['@microsoft/eslint-config-spfx/lib/profiles/react'],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@microsoft/spfx/no-async-await": "off",
    "react/jsx-no-bind": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/ban-types": "off"
  }
};
