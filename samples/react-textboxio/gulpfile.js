'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const path = require('path');

// Remove hashes from files. We need this because texboxio use the textboxio.js file name literally to detect its base path
// If we keep hashes, the library can't be initialized
build.copyAssets.taskConfig = {
    excludeHashFromFileNames: true,
}

// Copy the "resources" static folder in the "temp/deploy" folder for the textbox.io library
let copyTextboxioAssets = build.subTask('copy-textboxio-assets', function(gulp, buildOptions, done) {

    let resourcesFolderPath = path.resolve(__dirname, "./src/librairies/textboxio/resources/**/*");
    if ((process.argv.indexOf('--ship') !== -1)) {
        gulp.src(resourcesFolderPath).pipe(gulp.dest('./temp/deploy/resources'));
        done();
    } else {
        gulp.src(resourcesFolderPath).pipe(gulp.dest('./dist/resources'));
        done();
    }
});

build.rig.addPostBuildTask(copyTextboxioAssets);

build.initialize(gulp);
