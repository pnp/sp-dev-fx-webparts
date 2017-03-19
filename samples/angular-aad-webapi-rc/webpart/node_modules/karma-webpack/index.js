var _ = require("lodash");
var path = require("path");
var async = require("async");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var SingleEntryDependency = require("webpack/lib/dependencies/SingleEntryDependency");

function Plugin(
			/* config.webpack */webpackOptions,
			/* config.webpackServer */webpackServerOptions,
			/* config.webpackMiddleware */webpackMiddlewareOptions,
			/* config.basePath */basePath,
			/* config.files */files,
			/* config.frameworks */frameworks,
			customFileHandlers,
			emitter) {
	webpackOptions = _.clone(webpackOptions) || {};
	webpackMiddlewareOptions = _.clone(webpackMiddlewareOptions || webpackServerOptions) || {};

	var applyOptions = Array.isArray(webpackOptions) ? webpackOptions : [webpackOptions];
	var includeIndex = applyOptions.length > 1;

	applyOptions.forEach(function(webpackOptions, index) {
		// The webpack tier owns the watch behavior so we want to force it in the config
		webpackOptions.watch = true;

		if(!webpackOptions.output) webpackOptions.output = {};

		// When using an array, even of length 1, we want to include the index value for the build.
		// This is due to the way that the dev server exposes commonPath for build output.
		var indexPath = includeIndex ? index + "/" : "";

		// Must have the common _karma_webpack_ prefix on path here to avoid
		// https://github.com/webpack/webpack/issues/645
		webpackOptions.output.path = "/_karma_webpack_/" + indexPath;
		webpackOptions.output.publicPath = "/_karma_webpack_/" + indexPath + "/";
		webpackOptions.output.filename = "[name]";
		if(includeIndex)
			webpackOptions.output.jsonpFunction = "webpackJsonp" + index;
		webpackOptions.output.chunkFilename = "[id].chunk.js";
	});

	this.emitter = emitter;
	this.wrapMocha = frameworks.indexOf('mocha') >= 0 && includeIndex;
	this.optionsCount = applyOptions.length;
	this.files = [];
	this.basePath = basePath;
	this.waiting = [];

	var compiler = webpack(webpackOptions);
	var applyPlugins = compiler.compilers || [compiler];
	applyPlugins.forEach(function(compiler) {
		compiler.plugin("this-compilation", function(compilation, params) {
			compilation.dependencyFactories.set(SingleEntryDependency, params.normalModuleFactory);
		});
		compiler.plugin("make", this.make.bind(this));
	}, this);

	compiler.plugin("done", function(stats) {
		var applyStats = Array.isArray(stats.stats) ? stats.stats : [stats];
		var assets = [];
		var noAssets = false;
		applyStats.forEach(function(stats) {
			stats = stats.toJson();

			assets.push.apply(assets, stats.assets);
			if(stats.assets.length === 0)
				noAssets = true;
		});

		if(!this.waiting || this.waiting.length === 0) {
			this.notifyKarmaAboutChanges();
		}

		if(this.waiting && !noAssets) {
			var w = this.waiting;
			this.waiting = null;
			w.forEach(function(cb) {
				cb();
			});
		}
	}.bind(this));
	compiler.plugin("invalid", function() {
		if(!this.waiting) this.waiting = [];
	}.bind(this));

	webpackMiddlewareOptions.publicPath = "/_karma_webpack_/";
	var middleware = this.middleware = new webpackDevMiddleware(compiler, webpackMiddlewareOptions);

	customFileHandlers.push({
		urlRegex: /^\/_karma_webpack_\/.*/,
		handler: function(req, res) {
			middleware(req, res, function() {
				res.statusCode = 404;
				res.end('Not found');
			});
		}
	});

	emitter.on("exit", function (done) {
		middleware.close();
		done();
	});
}

Plugin.prototype.notifyKarmaAboutChanges = function() {
	// Force a rebuild
	this.emitter.refreshFiles();
};

Plugin.prototype.addFile = function(entry) {
	if(this.files.indexOf(entry) >= 0) return;
	this.files.push(entry);
	return true;
};

Plugin.prototype.make = function(compilation, callback) {
	async.forEach(this.files.slice(), function(file, callback) {
		var entry = file;
		if (this.wrapMocha) {
			entry = require.resolve("./mocha-env-loader") + "!" + entry;
		}

		var dep = new SingleEntryDependency(entry);
		compilation.addEntry("", dep, path.relative(this.basePath, file).replace(/\\/g, "/"), function() {
			// If the module fails because of an File not found error, remove the test file
			if(dep.module && dep.module.error && dep.module.error.error && dep.module.error.error.code === "ENOENT") {
				this.files = this.files.filter(function(f) {
					return file !== f;
				});
				this.middleware.invalidate();
			}
			callback();
		}.bind(this));
	}.bind(this), callback);
};

Plugin.prototype.readFile = function(file, callback) {
	var middleware = this.middleware;
	var optionsCount = this.optionsCount;

	function doRead() {
		if(optionsCount > 1) {
			async.times(optionsCount, function(idx, callback) {
				middleware.fileSystem.readFile("/_karma_webpack_/" + idx + "/" + file.replace(/\\/g, "/"), callback);
			}, function(err, contents) {
				if(err) return callback(err);
				contents = contents.reduce(function(arr, x) {
					if(!arr) return [x];
					arr.push(new Buffer("\n"), x);
					return arr;
				}, null);
				callback(null, Buffer.concat(contents));
			});
		} else {
			middleware.fileSystem.readFile("/_karma_webpack_/" + file.replace(/\\/g, "/"), callback);
		}
	}
	if(!this.waiting)
		doRead();
	else
		// Retry to read once a build is finished
		// do it on process.nextTick to catch changes while building
		this.waiting.push(process.nextTick.bind(process, this.readFile.bind(this, file, callback)));
};

function createPreprocesor(/* config.basePath */basePath, webpackPlugin) {
	return function(content, file, done) {

		if (webpackPlugin.addFile(file.path)) {
			// recompile as we have an asset that we have not seen before
			webpackPlugin.middleware.invalidate();
		}

		// read blocks until bundle is done
		webpackPlugin.readFile(path.relative(basePath, file.path), function(err, content) {
			if (err) {
				throw err;
			}

			done(err, content && content.toString());
		});
	};
}

module.exports = {
	"webpackPlugin": ["type", Plugin],
	"preprocessor:webpack": ["factory", createPreprocesor]
};
