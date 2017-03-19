"use strict";
var stream = require('stream');
var ts = require('typescript');
var vfs = require('vinyl-fs');
var path = require('path');
var through2 = require('through2');
var tsApi = require('./tsapi');
var utils = require('./utils');
var input_1 = require('./input');
var output_1 = require('./output');
var Project = (function () {
    function Project(configFileName, projectDirectory, config, options, noExternalResolve, sortOutput, typescript) {
        if (typescript === void 0) { typescript = ts; }
        this.running = false;
        this.typescript = typescript;
        this.configFileName = configFileName;
        this.projectDirectory = projectDirectory;
        this.config = config;
        this.options = options;
        this.noExternalResolve = noExternalResolve;
        this.sortOutput = sortOutput;
        this.singleOutput = options.out !== undefined || options['outFile'] !== undefined;
        this.input = new input_1.FileCache(typescript, options);
    }
    /**
     * Resets the compiler.
     * The compiler needs to be reset for incremental builds.
     */
    Project.prototype.reset = function (outputJs, outputDts) {
        this.input.reset();
        this.previousOutput = this.output;
        this.output = new output_1.Output(this, outputJs, outputDts);
    };
    Project.prototype.src = function () {
        var _this = this;
        var configPath = path.dirname(this.configFileName);
        var base;
        if (this.options["rootDir"]) {
            base = path.resolve(configPath, this.options["rootDir"]);
        }
        if (!this.config.files) {
            var files_1 = [path.join(configPath, '**/*.ts')];
            if (tsApi.isTS16OrNewer(this.typescript)) {
                files_1.push(path.join(configPath, '**/*.tsx'));
            }
            if (this.options.allowJs) {
                files_1.push(path.join(configPath, '**/*.js'));
                files_1.push(path.join(configPath, '**/*.jsx'));
            }
            if (this.config.exclude instanceof Array) {
                files_1 = files_1.concat(
                // Exclude files
                this.config.exclude.map(function (file) { return '!' + path.resolve(configPath, file); }), 
                // Exclude directories
                this.config.exclude.map(function (file) { return '!' + path.resolve(configPath, file) + '/**'; }));
            }
            if (base !== undefined) {
                return vfs.src(files_1, { base: base });
            }
            var srcStream = vfs.src(files_1);
            var sources_1 = new stream.Readable({ objectMode: true });
            sources_1._read = function () { };
            var resolvedFiles_1 = [];
            srcStream.on('data', function (file) {
                resolvedFiles_1.push(file);
            });
            srcStream.on('finish', function () {
                var sourceFiles = resolvedFiles_1
                    .filter(function (file) { return file.path.substr(-5) !== ".d.ts"; });
                var base = utils.getCommonBasePathOfArray(sourceFiles.map(function (file) { return path.dirname(file.path); }));
                for (var _i = 0, sourceFiles_1 = sourceFiles; _i < sourceFiles_1.length; _i++) {
                    var file = sourceFiles_1[_i];
                    file.base = base;
                    sources_1.push(file);
                }
                sources_1.emit('finish');
            });
            return srcStream;
        }
        var files = this.config.files.map(function (file) { return path.resolve(configPath, file); });
        if (base === undefined)
            base = utils.getCommonBasePathOfArray(files.map(function (file) { return path.dirname(file); }));
        var resolvedFiles = [];
        var checkMissingFiles = through2.obj(function (file, enc, callback) {
            this.push(file);
            resolvedFiles.push(utils.normalizePath(file.path));
            callback();
        });
        checkMissingFiles.on('finish', function () {
            for (var _i = 0, _a = _this.config.files; _i < _a.length; _i++) {
                var fileName = _a[_i];
                var fullPaths = [
                    utils.normalizePath(path.join(configPath, fileName)),
                    utils.normalizePath(path.join(process.cwd(), configPath, fileName))
                ];
                if (resolvedFiles.indexOf(fullPaths[0]) === -1 && resolvedFiles.indexOf(fullPaths[1]) === -1) {
                    var error = new Error("error TS6053: File '" + fileName + "' not found.");
                    console.error(error.message);
                    checkMissingFiles.emit('error', error);
                }
            }
        });
        var vinylOptions = { base: base, allowEmpty: true };
        return vfs.src(this.config.files.map(function (file) { return path.resolve(configPath, file); }), vinylOptions)
            .pipe(checkMissingFiles);
    };
    return Project;
}());
exports.Project = Project;
