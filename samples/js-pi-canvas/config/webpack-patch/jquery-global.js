/**
 * Webpack Patch: jQuery Global Scope
 *
 * Ensures jQuery is available globally as $, jQuery, and window.jQuery.
 * Required for compatibility with plugins and scripts that expect global jQuery.
 *
 * @param {object} webpackConfig - The webpack configuration object
 * @returns {object} Modified webpack configuration
 */

const webpack = require('webpack');

module.exports = function(webpackConfig) {
  // Ensure plugins array exists
  if (!webpackConfig.plugins) {
    webpackConfig.plugins = [];
  }

  // Add ProvidePlugin to expose jQuery globally
  webpackConfig.plugins.push(
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    })
  );

  console.log('[webpack-patch] jQuery global scope configured');
  return webpackConfig;
};
