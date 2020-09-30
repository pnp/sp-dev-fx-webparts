'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

const path = require('path');
build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {
        if (!generatedConfiguration.resolve.alias) {
            generatedConfiguration.resolve.alias = {};
        }

        // root src folder
        generatedConfiguration.resolve.alias['@src'] = path.resolve(__dirname, 'lib')

        return generatedConfiguration;
    }
});

build.initialize(require('gulp'));

var runSequence = require('run-sequence');
gulp.task('package', function (cb) {
    runSequence('clean', 'build', 'bundle', 'package-solution', cb);
});
