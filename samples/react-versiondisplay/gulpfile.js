'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};


// BEGIN: Add custom version sync task
let syncVersionsSubtask = build.subTask('version-sync', function (_gulp, _buildOptions, done) {
  this.log('Synching versions');

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
    fs.writeFileSync('./config/package-solution.json', JSON.stringify(pkgSolution, null, 4));
  }
  else {
    this.log('package-solution.json version is up-to-date');
  }

  done();
});

// Register the task with gulp command line
let versionSyncTask = build.task('version-sync', syncVersionsSubtask);

// execute before the TypeScript subtask
build.rig.addPreBuildTask(versionSyncTask);
// END: Add custom version sync task

build.initialize(require('gulp'));
