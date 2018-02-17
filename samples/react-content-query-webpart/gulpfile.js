'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

/********************************************************************************************
 * Adds an alias for handlebars in order to avoid errors while gulping the project
 * https://github.com/wycats/handlebars.js/issues/1174
 * Adds a loader and a node setting for webpacking the handlebars-helpers correctly
 * https://github.com/helpers/handlebars-helpers/issues/263
 ********************************************************************************************/
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {

    generatedConfiguration.resolve.alias = { handlebars: 'handlebars/dist/handlebars.min.js' };

    generatedConfiguration.module.rules.push(
      { test: /\.js$/, loader: 'unlazy-loader' }
    );

    generatedConfiguration.node = {
      fs: 'empty'
    }
    
    return generatedConfiguration;
  }
});

build.initialize(gulp);