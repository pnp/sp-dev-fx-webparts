'use strict';
const build = require('@microsoft/sp-build-web');
build.rig.getTasks = ((getTasks) => function () {
  const tasks = getTasks.call(build.rig);
  tasks.set('serve', tasks.get('serve-deprecated'));
  return tasks;
})(build.rig.getTasks);
build.initialize(require('gulp'));
