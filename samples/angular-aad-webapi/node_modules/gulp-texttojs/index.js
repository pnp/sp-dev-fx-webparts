'use strict';

var through = require('through2');
var path = require('path');
var extend = require('node.extend');
var _ = require('lodash');

module.exports = function(options) {
  options = extend({
    template: 'define([], function() { return <%= content %>; });',
    ext: '.js',
    isExtensionAppended: true
  }, options);

  var stream = through.obj(function(file, enc, callback) {

    if (file.isNull() || !file.contents || file.isStream() || !file.contents.length) {
      this.push(file);
      callback();
      return;
    }

    try {
      var fileContent = file.contents.toString('utf8');

      if (options.isExtensionAppended) {
        file.path += options.ext;
      } else if (options.ext) {
        file.path = file.path.replace(path.extname(file.path), options.ext);
      }
      file.contents = new Buffer(_.template(typeof options.template === 'function' ? options.template(file) : options.template, { content: JSON.stringify(fileContent) }));
    }
    catch (e) { console.log('error: ' + e); }

    this.push(file);
    callback();
  });

  return stream;
};

