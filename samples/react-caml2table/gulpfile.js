'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

// Fix issue with Monaco Editor
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    // Support for Monaco Editor
    generatedConfiguration.module.rules.push(
      {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    );

    // Fix for missing modules
    generatedConfiguration.resolve.fallback = {
      ...generatedConfiguration.resolve.fallback,
      path: require.resolve('path-browserify')
    };

    return generatedConfiguration;
  }
});

build.initialize(require('gulp'));