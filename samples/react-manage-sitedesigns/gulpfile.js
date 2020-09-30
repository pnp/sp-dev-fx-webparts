'use strict';

// check if gulp dist was called
if (process.argv.indexOf('dist') !== -1) {
    // add ship options to command call
    process.argv.push('--ship');
}

const path = require('path');
const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const gulpSequence = require('gulp-sequence');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

// Create clean distrubution package
gulp.task('dist', gulpSequence('clean', 'bundle', 'package-solution'));
// Create clean development package
gulp.task('dev', gulpSequence('clean', 'bundle', 'package-solution'));




/**
 * Custom Framework Specific gulp tasks
 */


build.initialize(gulp);

/**
 * Continuous Integration
 */

const buildConfig = build.getConfig();

const karmaTaskCandidates = buildConfig.uniqueTasks.filter(task => task.name === 'karma');

if (karmaTaskCandidates && karmaTaskCandidates.length > 0) {
    const karmaTask = karmaTaskCandidates[0];
    karmaTask.taskConfig.configPath = './config/karma.config.js';
}

