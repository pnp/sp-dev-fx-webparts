'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.task('prepare-solution', {
    execute: (config) => {
        return new Promise((resolve, reject) => {
            gulp.src('sharepoint/assets-temp/e89b5ad5-9ab5-4730-a66b-e1f68994598c.json')
                .pipe(gulp.dest('temp/deploy'));

            resolve();
        });
    }
});

build.initialize(gulp);
