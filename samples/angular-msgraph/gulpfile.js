'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const setBaseUrl =  require('./setBaseUrlTask');
const copyTemplates = require('./copyTemplatesTask');

build.addBuildTasks(setBaseUrl);
build.addBuildTasks(copyTemplates);
build.initialize(gulp);