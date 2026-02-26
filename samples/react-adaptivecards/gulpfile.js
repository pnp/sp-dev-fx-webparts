'use strict';

const build = require('@microsoft/sp-build-web');

// Suppress common warnings
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

// Override the build rig to physically remove the lint task from the execution plan
const getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  const result = getTasks.call(build.rig);

  // Safely check and delete the lint task
  if (result.has('lint')) {
    result.delete('lint');
  }

  // Ensure 'serve' points to the correct task for older versions
  if (result.has('serve-deprecated')) {
    result.set('serve', result.get('serve-deprecated'));
  }

  return result;
};

build.initialize(require('gulp'));