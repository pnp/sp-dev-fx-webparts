'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
<<<<<<< HEAD
=======
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
>>>>>>> upstream/master

build.initialize(gulp);
