// gulpfile.js
'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin-legacy');
build.addSuppression(/Warning - \[sass\] The local CSS class .* is not camelCase and will not be type-safe./gi);

// force use of projects specified typescript version
const typeScriptConfig = require('@microsoft/gulp-core-build-typescript/lib/TypeScriptConfiguration');
typeScriptConfig.TypeScriptConfiguration.setTypescriptCompiler(require('typescript'));

// disable tslint
build.tslint.enabled = false;

const eslint = require('gulp-eslint');

const eslintSubTask = build.subTask('eslint', function (gulp, buildOptions, done) {
  return gulp.src(['src/**/*.{ts,tsx}'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

build.rig.addPreBuildTask(build.task('eslint-task', eslintSubTask));
// force use of projects specified react version
build.configureWebpack.mergeConfig({

  additionalConfiguration: (generatedConfiguration) => {
    // force use of projects specified react version
      generatedConfiguration.externals = generatedConfiguration.externals
          .filter(name => !(["react", "react-dom"].includes(name)));
// force use TerserPlugIn (remove UglifyJs)
          generatedConfiguration.plugins.forEach((plugin, i) => {
            if (plugin.options && plugin.options.mangle) {
              generatedConfiguration.plugins.splice(i, 1);
              generatedConfiguration = merge(generatedConfiguration, {
                plugins: [
                  new TerserPlugin()
                ]
              });
            }

          });
          return generatedConfiguration;
  }
});


build.initialize(gulp);
