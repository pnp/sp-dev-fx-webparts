/*
* User webpack settings file. You can add your own settings here.
* Changes from this file will be merged into the base webpack configuration file.
* This file will not be overwritten by the subsequent spfx-fast-serve calls.
*/

const path = require('path');

/**
 * you can add your project related webpack configuration here, it will be merged using webpack-merge module
 * i.e. plugins: [new webpack.Plugin()]
 */
const webpackConfig = {

}

/**
 * For even more fine-grained control, you can apply custom webpack settings using below function
 * @param {object} initialWebpackConfig - initial webpack config object
 * @param {object} webpack - webpack object, used by SPFx pipeline
 * @returns webpack config object
 */
const transformConfig = function (initialWebpackConfig, webpack) {
  // Add @fluentui/react alias mappings (same as gulpfile.js)
  if (!initialWebpackConfig.resolve) {
    initialWebpackConfig.resolve = {};
  }
  if (!initialWebpackConfig.resolve.alias) {
    initialWebpackConfig.resolve.alias = {};
  }

  // Find the @fluentui/react package location
  const fluentuiReactPath = path.dirname(require.resolve('@fluentui/react/package.json'));

  // Map common subpath exports to their lib-commonjs locations
  initialWebpackConfig.resolve.alias['@fluentui/react/lib/Button'] = path.join(fluentuiReactPath, 'lib-commonjs/Button');
  initialWebpackConfig.resolve.alias['@fluentui/react/lib/components/Button'] = path.join(fluentuiReactPath, 'lib-commonjs/components/Button');
  initialWebpackConfig.resolve.alias['@fluentui/react/lib/Dropdown'] = path.join(fluentuiReactPath, 'lib-commonjs/Dropdown');
  initialWebpackConfig.resolve.alias['@fluentui/react/lib/TextField'] = path.join(fluentuiReactPath, 'lib-commonjs/TextField');
  initialWebpackConfig.resolve.alias['@fluentui/react/lib/Panel'] = path.join(fluentuiReactPath, 'lib-commonjs/Panel');
  initialWebpackConfig.resolve.alias['@fluentui/react/lib/Dialog'] = path.join(fluentuiReactPath, 'lib-commonjs/Dialog');
  initialWebpackConfig.resolve.alias['@fluentui/react/lib/Icon'] = path.join(fluentuiReactPath, 'lib-commonjs/Icon');
  initialWebpackConfig.resolve.alias['@fluentui/react/lib/Label'] = path.join(fluentuiReactPath, 'lib-commonjs/Label');
  initialWebpackConfig.resolve.alias['@fluentui/react/lib/Checkbox'] = path.join(fluentuiReactPath, 'lib-commonjs/Checkbox');
  initialWebpackConfig.resolve.alias['@fluentui/react/lib/ColorPicker'] = path.join(fluentuiReactPath, 'lib-commonjs/ColorPicker');
  initialWebpackConfig.resolve.alias['@fluentui/react/lib/Spinner'] = path.join(fluentuiReactPath, 'lib-commonjs/Spinner');
  initialWebpackConfig.resolve.alias['@fluentui/react/lib/Layer'] = path.join(fluentuiReactPath, 'lib-commonjs/Layer');
  initialWebpackConfig.resolve.alias['@fluentui/react/lib/Utilities'] = path.join(fluentuiReactPath, 'lib-commonjs/Utilities');
  initialWebpackConfig.resolve.alias['@fluentui/react/lib/Styling'] = path.join(fluentuiReactPath, 'lib-commonjs/Styling');

  return initialWebpackConfig;
}

module.exports = {
  webpackConfig,
  transformConfig
}
