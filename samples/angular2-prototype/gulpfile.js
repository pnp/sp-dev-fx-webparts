'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
build.tslint.isEnabled = () => { return false; }
build.initialize(gulp);
