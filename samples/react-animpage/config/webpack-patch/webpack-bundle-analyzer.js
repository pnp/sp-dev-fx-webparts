/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function(webpackConfig) {
  // location of plugin output
  const lastDirName = path.basename(__dirname);
  const projectPath = path.join(__dirname, './../..');
  const webpackStats = path.join(projectPath, 'temp','webpack');

  // ensure plugins collection present
  if (!webpackConfig.plugins) { webpackConfig.plugins = []; }

  // add plugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    openAnalyzer: false,
    analyzerMode: 'static',
    reportFilename: path.join(webpackStats, `build.stats.html`),
    generateStatsFile: true,
    statsFilename: path.join(webpackStats, `build.stats.json`),
    logLevel: 'error'
  }));

  // return modified webpack config to build toolchain
  return webpackConfig;
};