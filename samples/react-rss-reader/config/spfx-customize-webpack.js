'use strict';

module.exports = function (webpackConfiguration) {
  if (!webpackConfiguration.resolve) {
    webpackConfiguration.resolve = {};
  }
  webpackConfiguration.resolve.fallback = {
    ...(webpackConfiguration.resolve.fallback || {}),
    buffer: require.resolve('buffer/'),
    stream: require.resolve('stream-browserify'),
    timers: require.resolve('timers-browserify')
  };
};
