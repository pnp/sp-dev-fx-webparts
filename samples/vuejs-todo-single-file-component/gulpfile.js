'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
var merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

build.sass.setConfig({
  sassMatch: []
});

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {

    generatedConfiguration.plugins.push(new VueLoaderPlugin());
    generatedConfiguration.resolve.alias = {
      'vue$': 'vue/dist/vue.esm.js'
    };

    generatedConfiguration.module.rules.push({
      test: /\.vue$/,
      use: [
        {
          loader: 'vue-loader',
          options: {
            esModule: true
          }
        }]
    });

    generatedConfiguration.module.rules.push({
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader'
      ]
    });

    return generatedConfiguration;
  }
});

let copyOtherFiles = build.subTask('copy-other-files', function (gulp, buildOptions, done) {
  return gulp.src(['src/**/*.vue', 'src/**/*.scss'])
    .pipe(gulp.dest(buildOptions.libFolder))
});
build.task('copy-other-files', copyOtherFiles);
build.rig.addPostTypescriptTask(copyOtherFiles);

build.initialize(gulp);
