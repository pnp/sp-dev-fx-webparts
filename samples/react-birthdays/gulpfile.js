'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

// Custom task to copy assets
gulp.task('copy-assets', function () {
  return gulp.src('src/assets/**/*')
  .pipe(gulp.dest('lib/assets'))   
    .pipe(gulp.dest('dist/assets')); 
});
build.task('pre-copy', gulp.series('copy-assets'));
// build.rig.addPostBuildTask(gulp.task('copy-assets'));
build.initialize(require('gulp'));
