const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      timers: require.resolve('timers-browserify'),
      fs: require.resolve('browserify-fs')  // Polyfill for 'fs'
    }
  }
};