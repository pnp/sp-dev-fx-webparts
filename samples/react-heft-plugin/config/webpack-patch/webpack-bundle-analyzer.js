const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function(webpackConfig) {
  const lastDirName = path.basename(__dirname);
  const projectPath = path.join(__dirname, './../..');
  const webpackStats = path.join(projectPath, 'temp', 'webpack');

  if (!webpackConfig.plugins) { webpackConfig.plugins = []; }

  // add plugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    generateStatsFile: true,
    reportFilename: path.join(webpackStats, 'build.stats.html'),
    statsFilename: path.join(webpackStats, 'build.stats.json'),
    logLevel: 'error'
    }));

  return webpackConfig;
};