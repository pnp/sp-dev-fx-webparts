'use strict';
var fs = require('fs'),
  error = require('@microsoft/gulp-core-build').error,
  log = require('@microsoft/gulp-core-build').log;

var SetBaseUrl = {
  execute: (config) => {
    return new Promise((resolve, reject) => {

      var writeManifestsTask = undefined;
      for (var i = 0; i < config.uniqueTasks.length; i++) {
        if (config.uniqueTasks[i].name === 'writemanifests') {
          writeManifestsTask = config.uniqueTasks[i];
          break;
        }
      }

      if (!writeManifestsTask) {
        var errorMsg = 'Couldn\'t retrieve the writeManifests task.';
        error(errorMsg);
        reject(errorMsg);
        return;
      }

      var url = config.production ? `${writeManifestsTask.taskConfig.cdnBasePath}` : `${writeManifestsTask.taskConfig.debugBasePath}dist/`;

      var webPartCodePath = `${config.libFolder}/webparts/angularMsGraph/AngularMsGraphWebPart.js`;
      var webPartCode = fs.readFileSync(webPartCodePath, 'utf-8');
      webPartCode = webPartCode.replace('$BASEURL$', url);
      fs.writeFile(webPartCodePath, webPartCode, (err) => {
        if (err) {
          error(err);
          reject(err);
          return;
        }

        log(`Base URL successfully set to ${url}`);
        resolve();
      });
    });
  },
  name: 'setbaseurl'
};

exports.default = SetBaseUrl;