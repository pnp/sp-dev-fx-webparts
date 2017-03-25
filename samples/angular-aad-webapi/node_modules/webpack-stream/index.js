'use strict';

var gutil = require('gulp-util');
var File = require('vinyl');
var MemoryFileSystem = require('memory-fs');
var through = require('through');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var clone = require('lodash.clone');
var some = require('lodash.some');

var defaultStatsOptions = {
  colors: gutil.colors.supportsColor,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: true,
  version: true,
  cached: false,
  cachedAssets: false,
  reasons: false,
  source: false,
  errorDetails: false
};

module.exports = function (options, wp, done) {
  options = clone(options) || {};
  var config = options.config || options;
  if (typeof done !== 'function') {
    var callingDone = false;
    done = function (err, stats) {
      if (err) {
        // The err is here just to match the API but isnt used
        return;
      }
      stats = stats || {};
      if (options.quiet || callingDone) {
        return;
      }

      // Debounce output a little for when in watch mode
      if (options.watch) {
        callingDone = true;
        setTimeout(function () {
          callingDone = false;
        }, 500);
      }

      if (options.verbose) {
        gutil.log(stats.toString({
          colors: gutil.colors.supportsColor
        }));
      } else {
        var statsOptions = options && options.stats || {};

        Object.keys(defaultStatsOptions).forEach(function (key) {
          if (typeof statsOptions[key] === 'undefined') {
            statsOptions[key] = defaultStatsOptions[key];
          }
        });

        gutil.log(stats.toString(statsOptions));
      }
    };
  }

  var webpack = wp || require('webpack');
  var entry = [];
  var entries = Object.create(null);

  var stream = through(function (file) {
    if (file.isNull()) {
      return;
    }
    if ('named' in file) {
      if (!Array.isArray(entries[file.named])) {
        entries[file.named] = [];
      }
      entries[file.named].push(file.path);
    } else {
      entry = entry || [];
      entry.push(file.path);
    }
  }, function () {
    var self = this;
    var handleConfig = function (config) {
      config.output = config.output || {};
      config.watch = !!options.watch;

      // Determine pipe'd in entry
      if (Object.keys(entries).length > 0) {
        entry = entries;
        if (!config.output.filename) {
          // Better output default for multiple chunks
          config.output.filename = '[name].js';
        }
      } else if (entry.length < 2) {
        entry = entry[0] || entry;
      }

      config.entry = config.entry || entry;
      config.output.path = config.output.path || process.cwd();
      config.output.filename = config.output.filename || '[hash].js';
      config.watch = options.watch;
      entry = [];

      if (!config.entry || config.entry.length < 1) {
        gutil.log('webpack-stream - No files given; aborting compilation');
        self.emit('end');
        return false;
      }
      return true;
    };

    var succeeded;
    if (Array.isArray(config)) {
      for (var i = 0; i < config.length; i++) {
        succeeded = handleConfig(config[i]);
        if (!succeeded) {
          return false;
        }
      }
    } else {
      succeeded = handleConfig(config);
      if (!succeeded) {
        return false;
      }
    }

    var compiler = webpack(config, function (err, stats) {
      if (err) {
        self.emit('error', new gutil.PluginError('webpack-stream', err));
      }
      var jsonStats = stats.toJson() || {};
      var errors = jsonStats.errors || [];
      if (errors.length) {
        var errorMessage = errors.reduce(function (resultMessage, nextError) {
          resultMessage += nextError.toString();
          return resultMessage;
        }, '');
        self.emit('error', new gutil.PluginError('webpack-stream', errorMessage));
      }
      if (!options.watch) {
        self.queue(null);
      }
      done(err, stats);
      if (options.watch && !options.quiet) {
        gutil.log('webpack is watching for changes');
      }
    });

    var handleCompiler = function (compiler) {
      // In watch mode webpack returns a wrapper object so we need to get
      // the underlying compiler
      if (options.watch && compiler.compiler) {
        compiler = compiler.compiler;
      }

      if (options.progress) {
        compiler.apply(new ProgressPlugin(function (percentage, msg) {
          percentage = Math.floor(percentage * 100);
          msg = percentage + '% ' + msg;
          if (percentage < 10) msg = ' ' + msg;
          gutil.log('webpack', msg);
        }));
      }

      var fs = compiler.outputFileSystem = new MemoryFileSystem();

      compiler.plugin('after-emit', function (compilation, callback) {
        Object.keys(compilation.assets).forEach(function (outname) {
          if (compilation.assets[outname].emitted) {
            var file = prepareFile(fs, compiler, outname);
            self.queue(file);
          }
        });
        callback();
      });
    };

    if (Array.isArray(options.config) && options.watch) {
      compiler.watchings.forEach(function (compiler) {
        handleCompiler(compiler);
      });
    } else if (Array.isArray(options.config)) {
      compiler.compilers.forEach(function (compiler) {
        handleCompiler(compiler);
      });
    } else {
      handleCompiler(compiler);
    }
  });

  // If entry point manually specified, trigger that
  var hasEntry = Array.isArray(config)
    ? some(config, function (c) { return c.entry; })
    : config.entry;
  if (hasEntry) {
    stream.end();
  }

  return stream;
};

function prepareFile (fs, compiler, outname) {
  var path = fs.join(compiler.outputPath, outname);
  if (path.indexOf('?') !== -1) {
    path = path.split('?')[0];
  }

  var contents = fs.readFileSync(path);

  var file = new File({
    base: compiler.outputPath,
    path: path,
    contents: contents
  });
  return file;
}

// Expose webpack if asked
Object.defineProperty(module.exports, 'webpack', {
  get: function () {
    return require('webpack');
  }
});
