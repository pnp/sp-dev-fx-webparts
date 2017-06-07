'use strict';
const gulp = require('gulp');

var Hello = {
  execute: (config) => {
    return new Promise((resolve, reject) => {
      console.log('Hello Adrian!!');
      resolve();
    });
  },
  name: 'Hello'
};
exports.default = Hello;

