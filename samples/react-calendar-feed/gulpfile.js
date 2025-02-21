'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const path = require('path');
//build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    // Add polyfills for Node.js core modules
    generatedConfiguration.resolve = {
      ...generatedConfiguration.resolve,
      fallback: {
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        timers: require.resolve('timers-browserify'),
        fs: false,
        stream:require.resolve("stream-browserify")
      }
    };

    return generatedConfiguration;
  }
});

build.initialize(gulp);
