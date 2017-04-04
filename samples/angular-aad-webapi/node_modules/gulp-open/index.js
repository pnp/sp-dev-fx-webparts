'use strict';

var open = require('open');
var through = require('through2');
var gutil = require('gulp-util');

var colors = gutil.colors;

var PLUGIN_NAME = 'gulp-open';

module.exports = function(opts) {
  opts = opts || {};

  return through.obj(function(file, enc, cb) {
    var uri = opts.uri;

    if (file.isNull() && !uri) {
      return cb(new gutil.PluginError(PLUGIN_NAME,
        'URI is missing or incorrect'));
    }

    if (file.path && !uri)  {
      uri = file.path;
    }

    if (opts.app) {
      gutil.log(colors.blue('Opening', colors.green(uri), 'using the app',
        colors.green(opts.app)));
      // Open with the given app
      open(uri, opts.app);
      return cb(null, file);

    }
    gutil.log(colors.blue('Opening', colors.green(uri), 'using the',
      colors.green('default OS app')));
    // Open with the default app defined by the os
    open(uri);
    return cb(null, file);

  });
};
