'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const bundleAnalyzer = require('webpack-bundle-analyzer');

//************START: Added to handle Template file url ************/

var inlineNgxTemplate = require('gulp-inline-ngx-template');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('./tsconfig.json');

let tsInlines = build.subTask('tsInlines', function(gulp, buildOptions, done) {
  return  gulp.src('src/webparts/helloAngularTemplate/app/**/*.ts')
       .pipe(inlineNgxTemplate({ base: '/src/webparts/helloAngularTemplate/app/', useRelativePaths: true }))
       .pipe(tsProject())
       .pipe(gulp.dest('lib/webparts/helloAngularTemplate/app'));
})

build.rig.addPostTypescriptTask(tsInlines);

//************END: Added to handle Template file url ************/

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

    generatedConfiguration.plugins.push(new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)fesm5/, path.join(__dirname, './client')));

    for (let i = 0; i < generatedConfiguration.plugins.length; i++) {
      const p = generatedConfiguration.plugins[i];
      if (p.options && p.options.mangle) {
        generatedConfiguration.plugins.splice(i, 1, new UglifyJSPlugin({ uglifyOptions: { mangle: true } }));
        break;
      }
    }

    return generatedConfiguration;
  }
});

build.initialize(gulp);
