'use strict';

const gulp = require('gulp');
const zip = require('gulp-zip');
const del = require('del');

const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

const deleteTeamsPkg = build.subTask('delete-teams-package', function (gulp, buildConfig, done) {
  return del([
    './teams/*.zip',
  ]);
});

const zipTeamsPkg = build.subTask('package-teams-subtask', function (gulp, buildConfig, done) {
  const zipFileName = `${build.packageSolution.taskConfig.solution.name}.zip`;

  gulp.src('./teams/*')
        .pipe(zip(zipFileName))
        .pipe(gulp.dest('./teams'))

  done();
});

var tasksSerie = build.serial([deleteTeamsPkg, zipTeamsPkg]);
build.task("package-teams", tasksSerie);

build.initialize(gulp);
