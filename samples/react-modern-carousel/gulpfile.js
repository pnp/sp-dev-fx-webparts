'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

// add these after const build = require('@microsoft/sp-build-web');
const fs = require('fs');
const path = require('path');

// Insert this code before build.initialize(require('gulp'));
const copyTask = build.subTask('copy-to-build', function (gulp, buildOptions, done) {
  const srcFolder = './temp/build';
  const destFolder = './temp/';
  // Check if the destination folder exists, if not, create it
  if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder, { recursive: true });
}

// Copy files from srcFolder to destFolder, excluding destFolder itself
return gulp.src([path.join(srcFolder, '**/*'), '!' + destFolder])
  .pipe(gulp.dest(destFolder));
});

build.rig.addPostBundleTask(copyTask);


build.configureWebpack.mergeConfig({

  additionalConfiguration: (generatedConfiguration) => {
    // Modify CSS Modules loader configuration

    if (generatedConfiguration.module && generatedConfiguration.module.rules) {
      for (const rule of generatedConfiguration.module.rules) {
        if (rule.use && rule.use[0] && rule.use[0].loader.includes('css-loader') && rule.use[0].options.generateCssClassName) {
          console.log('Rule Test:'+ rule.test);
          console.log('Rule Loader:'+ rule.use[0].loader);
          console.log('Rule generateCssClassName:'+ rule.use[0].options.generateCssClassName);
          rule.use[0].options.generateCssClassName = (existingClassName, cssFilename, cssContent)=>{
            return `${existingClassName}`;
        };

        }
      }
    }

    return generatedConfiguration;
  }

});

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));

module.exports = build;