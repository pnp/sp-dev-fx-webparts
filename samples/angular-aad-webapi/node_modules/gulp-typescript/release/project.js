"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var stream = require('stream');
var vfs = require('vinyl-fs');
var path = require('path');
var gutil = require('gulp-util');
var utils = require('./utils');
var reporter_1 = require('./reporter');
var input_1 = require('./input');
var output_1 = require('./output');
var compiler_1 = require('./compiler');
function setupProject(projectDirectory, config, options, typescript) {
    var input = new input_1.FileCache(typescript, options);
    var compiler = options.isolatedModules ? new compiler_1.FileCompiler() : new compiler_1.ProjectCompiler();
    var running = false;
    if (options.isolatedModules) {
        options.newLine = typescript.NewLineKind.LineFeed;
        options.sourceMap = false;
        options.declaration = false;
        options.inlineSourceMap = true;
    }
    var project = function (reporter) {
        if (running) {
            throw new Error('gulp-typescript: A project cannot be used in two compilations at the same time. Create multiple projects with createProject instead.');
        }
        running = true;
        input.reset();
        compiler.prepare(projectInfo);
        var stream = new CompileStream(projectInfo);
        projectInfo.output = new output_1.Output(projectInfo, stream, stream.js, stream.dts);
        projectInfo.reporter = reporter || reporter_1.defaultReporter();
        stream.on('finish', function () {
            running = false;
        });
        return stream;
    };
    var singleOutput = options.out !== undefined || options.outFile !== undefined;
    project.src = src;
    project.typescript = typescript;
    project.projectDirectory = projectDirectory;
    project.config = config;
    project.options = options;
    var projectInfo = {
        input: input,
        singleOutput: singleOutput,
        compiler: compiler,
        options: options,
        typescript: typescript,
        directory: projectDirectory,
        // Set when `project` is called
        output: undefined,
        reporter: undefined
    };
    return project;
}
exports.setupProject = setupProject;
function src() {
    if (arguments.length >= 1) {
        utils.message("tsProject.src() takes no arguments", "Use gulp.src(..) if you need to specify a glob");
    }
    var base;
    if (this.options["rootDir"]) {
        base = path.resolve(this.projectDirectory, this.options["rootDir"]);
    }
    var content = {};
    if (this.config.include)
        content.include = this.config.include;
    if (this.config.exclude)
        content.exclude = this.config.exclude;
    if (this.config.files)
        content.files = this.config.files;
    if (this.options['allowJs'])
        content.compilerOptions = { allowJs: true };
    var _a = this.typescript.parseJsonConfigFileContent(content, this.typescript.sys, this.projectDirectory), fileNames = _a.fileNames, errors = _a.errors;
    for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
        var error = errors_1[_i];
        console.log(error.messageText);
    }
    if (base === undefined)
        base = utils.getCommonBasePathOfArray(fileNames.filter(function (file) { return file.substr(-5) !== ".d.ts"; })
            .map(function (file) { return path.dirname(file); }));
    var vinylOptions = { base: base, allowEmpty: true };
    return vfs.src(fileNames, vinylOptions);
}
var CompileStream = (function (_super) {
    __extends(CompileStream, _super);
    function CompileStream(project) {
        _super.call(this, { objectMode: true });
        this.js = new CompileOutputStream();
        this.dts = new CompileOutputStream();
        this.project = project;
        // Prevent "Unhandled stream error in pipe" when a compilation error occurs.
        this.on('error', function () { });
    }
    CompileStream.prototype._write = function (file, encoding, cb) {
        if (cb === void 0) { cb = function (err) { }; }
        if (!file)
            return cb();
        if (file.isNull()) {
            cb();
            return;
        }
        if (file.isStream()) {
            return cb(new gutil.PluginError('gulp-typescript', 'Streaming not supported'));
        }
        var inputFile = this.project.input.addGulp(file);
        this.project.compiler.inputFile(inputFile);
        cb();
    };
    CompileStream.prototype._read = function () {
    };
    CompileStream.prototype.end = function (chunk, encoding, callback) {
        if (typeof chunk === 'function') {
            this._write(null, null, chunk);
        }
        else if (typeof encoding === 'function') {
            this._write(chunk, null, encoding);
        }
        else {
            this._write(chunk, encoding, callback);
        }
        this.project.compiler.inputDone();
    };
    return CompileStream;
}(stream.Duplex));
var CompileOutputStream = (function (_super) {
    __extends(CompileOutputStream, _super);
    function CompileOutputStream() {
        _super.call(this, { objectMode: true });
    }
    CompileOutputStream.prototype._read = function () {
    };
    return CompileOutputStream;
}(stream.Readable));
