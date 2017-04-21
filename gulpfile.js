'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

/********************************************************************************************
 * Adds an alias for handlebars in order to avoid errors while gulping the project
 * https://github.com/wycats/handlebars.js/issues/1174
 ********************************************************************************************/
build.configureWebpack.mergeConfig({ 
  additionalConfiguration: (generatedConfiguration) => { 
	generatedConfiguration.resolve.alias = { handlebars: 'handlebars/dist/handlebars.min.js' };
    return generatedConfiguration; 
  } 
});

build.initialize(gulp);
