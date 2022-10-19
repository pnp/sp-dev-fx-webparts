'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

const fs = require('fs')

if (1) {
  fs.chmod = (a, b, cb) => cb(0)
}


build.initialize(gulp);
