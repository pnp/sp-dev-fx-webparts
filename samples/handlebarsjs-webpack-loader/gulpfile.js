'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const loaderConfig = {
  test: /\.hbs/,
  loader: "handlebars-template-loader"
};

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {

    generatedConfiguration.module.rules.push(loaderConfig);

    return generatedConfiguration;

  }
});

build.initialize(gulp);
