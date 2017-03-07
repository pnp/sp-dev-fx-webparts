'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

// Custom config section starts here
const loaderConfig = [{
  test: /\.hbs/,
  loader: "handlebars-template-loader"
}];

// push loader configuration to SPFx configuration
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    generatedConfiguration.module.loaders.push(loaderConfig);

    return generatedConfiguration;

  }
});

build.initialize(gulp);
