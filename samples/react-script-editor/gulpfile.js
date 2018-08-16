'use strict';

const gulp = require('gulp');
const path = require('path');
const build = require('@microsoft/sp-build-web');
const bundleAnalyzer = require('webpack-bundle-analyzer');

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    const lastDirName = path.basename(__dirname);
    const dropPath = path.join(__dirname, 'temp', 'stats');
    generatedConfiguration.plugins.push(new bundleAnalyzer.BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      reportFilename: path.join(dropPath, `${lastDirName}.stats.html`),
      generateStatsFile: true,
      statsFilename: path.join(dropPath, `${lastDirName}.stats.json`),
      logLevel: 'error'
    }));

    return generatedConfiguration;
  }
});

let copyDynamic = build.subTask('copy-dynamic-load-files', function (gulp, buildOptions, done) {
    gulp.src('./assets/editor-pop-up.js')
        .pipe(gulp.dest('./temp/deploy'))
        .pipe(gulp.dest('./dist'));
    
    done();
});
build.rig.addPostBuildTask(copyDynamic);

build.initialize(gulp);