'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

// BEGIN: Add custom version sync task
// This section is inspired by Stefan Bauer's article at https://n8d.at/how-to-version-new-sharepoint-framework-projects/
// Stefan rocks!
let syncVersionsSubtask = build.subTask('version-sync', function (gulp, buildOptions, done) {
  this.log('Synching versions');

  // import gulp utilits to write error messages
  const gutil = require('gulp-util');

  // import file system utilities form nodeJS
  const fs = require('fs');

  // read package.json
  var pkgConfig = require('./package.json');

  // read configuration of web part solution file
  var pkgSolution = require('./config/package-solution.json');

  // log old version
  this.log('package-solution.json version:\t' + pkgSolution.solution.version);

  // Generate new MS compliant version number
  var newVersionNumber = pkgConfig.version.split('-')[0] + '.0';

  if (pkgSolution.solution.version !== newVersionNumber) {
    // assign newly generated version number to web part version
    pkgSolution.solution.version = newVersionNumber;

    // log new version
    this.log('New package-solution.json version:\t' + pkgSolution.solution.version);

    // write changed package-solution file
    fs.writeFile('./config/package-solution.json', JSON.stringify(pkgSolution, null, 4));
  }
  else {
    this.log('package-solution.json version is up-to-date');
  }

  done();
});

let syncVersionTask = build.task('version-sync', syncVersionsSubtask);

build.rig.addPreBuildTask(syncVersionTask);
// END: Add custom version sync task

build.initialize(require('gulp'));
