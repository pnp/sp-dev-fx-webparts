/**
 * Webpack Patch: Fluent UI Aliases
 *
 * Fix for @fluentui/react "exports" field incompatibility with webpack 4.
 * Maps package subpath imports to their actual file locations.
 *
 * Migrated from gulpfile.js for SPFx 1.22 Heft toolchain.
 *
 * @param {object} webpackConfig - The webpack configuration object
 * @returns {object} Modified webpack configuration
 */

const path = require('path');

module.exports = function(webpackConfig) {
  // Ensure resolve and alias objects exist
  if (!webpackConfig.resolve) {
    webpackConfig.resolve = {};
  }
  if (!webpackConfig.resolve.alias) {
    webpackConfig.resolve.alias = {};
  }

  // Find the @fluentui/react package location
  let fluentuiReactPath;
  try {
    fluentuiReactPath = path.dirname(require.resolve('@fluentui/react/package.json'));
  } catch (e) {
    // @fluentui/react not installed, skip aliases
    console.log('[webpack-patch] @fluentui/react not found, skipping aliases');
    return webpackConfig;
  }

  // Map common subpath exports to their lib-commonjs locations
  const aliases = {
    '@fluentui/react/lib/Button': 'lib-commonjs/Button',
    '@fluentui/react/lib/components/Button': 'lib-commonjs/components/Button',
    '@fluentui/react/lib/Dropdown': 'lib-commonjs/Dropdown',
    '@fluentui/react/lib/TextField': 'lib-commonjs/TextField',
    '@fluentui/react/lib/Panel': 'lib-commonjs/Panel',
    '@fluentui/react/lib/Dialog': 'lib-commonjs/Dialog',
    '@fluentui/react/lib/Icon': 'lib-commonjs/Icon',
    '@fluentui/react/lib/Label': 'lib-commonjs/Label',
    '@fluentui/react/lib/Checkbox': 'lib-commonjs/Checkbox',
    '@fluentui/react/lib/ColorPicker': 'lib-commonjs/ColorPicker',
    '@fluentui/react/lib/Spinner': 'lib-commonjs/Spinner',
    '@fluentui/react/lib/Layer': 'lib-commonjs/Layer',
    '@fluentui/react/lib/Utilities': 'lib-commonjs/Utilities',
    '@fluentui/react/lib/Styling': 'lib-commonjs/Styling',
    '@fluentui/react/lib/MessageBar': 'lib-commonjs/MessageBar',
    '@fluentui/react/lib/Toggle': 'lib-commonjs/Toggle',
    '@fluentui/react/lib/Stack': 'lib-commonjs/Stack',
    '@fluentui/react/lib/Text': 'lib-commonjs/Text',
    '@fluentui/react/lib/Pivot': 'lib-commonjs/Pivot',
    '@fluentui/react/lib/List': 'lib-commonjs/List',
    '@fluentui/react/lib/DetailsList': 'lib-commonjs/DetailsList',
    '@fluentui/react/lib/CommandBar': 'lib-commonjs/CommandBar'
  };

  // Apply all aliases
  for (const [alias, target] of Object.entries(aliases)) {
    webpackConfig.resolve.alias[alias] = path.join(fluentuiReactPath, target);
  }

  console.log('[webpack-patch] Fluent UI aliases applied (' + Object.keys(aliases).length + ' aliases)');
  return webpackConfig;
};
