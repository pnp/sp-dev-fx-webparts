'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

/**
 * Checks if the app settings match in both the appSettings.json and appSettings.d.ts.
 */
const verifyAppSettings = require('./src/appSettingsGulp.js');
build.rig.addBuildTasks(verifyAppSettings);

build.initialize(gulp);
