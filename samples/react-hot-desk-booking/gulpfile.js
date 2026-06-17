'use strict';

const build = require('@microsoft/sp-build-web');
const getTasks = build.rig.getTasks;

build.addSuppression(\Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type safe.\);

var getTasks = build.rig.getTasks;
getTasks.isEnabled('package-solution') ? void (0) : build.rig.addPreBuildTask(build.task('package-solution', build.series(build.task('clean'), build.task('build'), build.task('bundle'), build.task('package-solution'))));

build.initialize(require('gulp'));
