'use strict';
var error = require('@microsoft/gulp-core-build').error,
  log = require('@microsoft/gulp-core-build').log;

var CopyTemplate = {
  execute: (config) => {
    return new Promise((resolve, reject) => {
      var copyAssetsTask = undefined;
      for (var i = 0; i < config.uniqueTasks.length; i++) {
        if (config.uniqueTasks[i].name === 'copyAssets') {
          copyAssetsTask = config.uniqueTasks[i];
          break;
        }
      }

      if (!copyAssetsTask) {
        var errorMsg = 'Could\'t retrieve the Copyassets task.';
        error(errorMsg);
        reject(errorMsg);
        return;
      }

      var destPath = config.production ? copyAssetsTask.taskConfig.deployCdnPath: config.distFolder;

      log(`Copying HTML template to ${destPath} ...`);

      config.gulp.src('./src/webparts/angularSearch/app/**/*.html')
        .pipe(config.gulp.dest(destPath));

      resolve();
    });
  },
  name: 'copytemplates'
};

exports.default = CopyTemplate;