'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.initialize(gulp);

var runSequence = require('run-sequence');
gulp.task('package', function (cb) {
  runSequence('clean', 'build', 'bundle', 'package-solution', cb);
});
