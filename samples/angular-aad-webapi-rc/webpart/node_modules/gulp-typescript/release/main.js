"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var fs = require('fs');
var gutil = require('gulp-util');
var path = require('path');
var stream = require('stream');
var project = require('./project');
var utils = require('./utils');
var _filter = require('./filter');
var _reporter = require('./reporter');
var compiler = require('./compiler');
var tsApi = require('./tsapi');
var through2 = require('through2');
var PLUGIN_NAME = 'gulp-typescript';
var CompileStream = (function (_super) {
    __extends(CompileStream, _super);
    function CompileStream(proj) {
        _super.call(this, { objectMode: true });
        this.dts = new CompileOutputStream();
        this.project = proj;
        // Backwards compatibility
        this.js = this;
        // Prevent "Unhandled stream error in pipe" when compilation error occurs.
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
            return cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }
        var isFirstFile = this.project.input.firstSourceFile === undefined;
        var inputFile = this.project.input.addGulp(file);
        if (isFirstFile) {
            this.project.currentDirectory = this.project.input.firstSourceFile.gulp.cwd;
        }
        this.project.compiler.inputFile(inputFile);
        cb();
    };
    CompileStream.prototype._read = function () {
    };
    CompileStream.prototype.end = function (chunk, encoding, callback) {
        this._write(chunk, encoding, callback);
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
function compile(param, filters, theReporter) {
    var proj;
    if (param instanceof project.Project) {
        proj = param;
        if (proj.running) {
            throw new Error('gulp-typescript: A project cannot be used in two compilations at the same time. Create multiple projects with createProject instead.');
        }
        proj.running = true;
    }
    else {
        proj = compile.createProject(param || {});
    }
    var inputStream = new CompileStream(proj);
    proj.reset(inputStream.js, inputStream.dts);
    proj.filterSettings = filters;
    proj.reporter = theReporter || _reporter.defaultReporter();
    proj.compiler.prepare(proj);
    return inputStream;
}
function createEnumMap(input) {
    var map = {};
    var keys = Object.keys(input);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var value = input[key];
        if (typeof value === 'number') {
            map[key.toLowerCase()] = value;
        }
    }
    return map;
}
function getScriptTarget(typescript, language) {
    var map = createEnumMap(typescript.ScriptTarget);
    return map[language.toLowerCase()];
}
function getModuleKind(typescript, moduleName) {
    var map = createEnumMap(typescript.ModuleKind);
    return map[moduleName.toLowerCase()];
}
function getModuleResolution(typescript, kind) {
    if (typescript.ModuleResolutionKind === undefined) {
        return undefined; // Not supported in TS1.4 & 1.5
    }
    // Enum member name is NodeJs, while option name is `node`
    if (kind === 'node')
        kind = 'nodejs';
    var map = createEnumMap(typescript.ModuleResolutionKind);
    return map[kind.toLowerCase()];
}
function getJsxEmit(typescript, jsx) {
    if (typescript.JsxEmit === undefined) {
        return undefined; // Not supported in TS1.4 & 1.5
    }
    var map = createEnumMap(typescript.JsxEmit);
    return map[jsx.toLowerCase()];
}
function getCompilerOptions(settings, projectPath, configFileName) {
    var typescript = settings.typescript || ts;
    if (settings.sourceRoot !== undefined) {
        console.warn('gulp-typescript: sourceRoot isn\'t supported any more. Use sourceRoot option of gulp-sourcemaps instead.');
    }
    // Try to use `convertCompilerOptionsFromJson` to convert options.
    if (typescript.convertCompilerOptionsFromJson) {
        // Copy settings and remove several options
        var newSettings = {};
        for (var _i = 0, _a = Object.keys(settings); _i < _a.length; _i++) {
            var option = _a[_i];
            if (option === 'declarationFiles') {
                newSettings.declaration = settings.declarationFiles;
                continue;
            }
            if (option === 'noExternalResolve' ||
                option === 'sortOutput' ||
                option === 'typescript' ||
                option === 'sourceMap' ||
                option === 'inlineSourceMap')
                continue;
            newSettings[option] = settings[option];
        }
        var result = typescript.convertCompilerOptionsFromJson(newSettings, projectPath, configFileName);
        var reporter = _reporter.defaultReporter();
        for (var _b = 0, _c = result.errors; _b < _c.length; _b++) {
            var error = _c[_b];
            reporter.error(utils.getError(error, typescript), typescript);
        }
        result.options.sourceMap = true;
        result.options.suppressOutputPathCheck = true;
        return result.options;
    }
    // Legacy conversion
    var tsSettings = {};
    for (var key in settings) {
        if (!Object.hasOwnProperty.call(settings, key))
            continue;
        if (key === 'noExternalResolve' ||
            key === 'declarationFiles' ||
            key === 'sortOutput' ||
            key === 'typescript' ||
            key === 'target' ||
            key === 'module' ||
            key === 'moduleResolution' ||
            key === 'jsx' ||
            key === 'sourceRoot' ||
            key === 'sourceMap' ||
            key === 'inlineSourceMap')
            continue;
        tsSettings[key] = settings[key];
    }
    if (typeof settings.target === 'string') {
        tsSettings.target = getScriptTarget(typescript, settings.target);
    }
    else if (typeof settings.target === 'number') {
        tsSettings.target = settings.target;
    }
    if (typeof settings.module === 'string') {
        tsSettings.module = getModuleKind(typescript, settings.module);
    }
    else if (typeof settings.module === 'number') {
        tsSettings.module = settings.module;
    }
    if (typeof settings.jsx === 'string') {
        // jsx is not supported in TS1.4 & 1.5, so we cannot do `tsSettings.jsx = `, but we have to use brackets.
        tsSettings['jsx'] = getJsxEmit(typescript, settings.jsx);
    }
    else if (typeof settings.jsx === 'number') {
        tsSettings['jsx'] = settings.jsx;
    }
    if (typeof settings.moduleResolution === 'string') {
        // moduleResolution is not supported in TS1.4 & 1.5, so we cannot do `tsSettings.moduleResolution = `, but we have to use brackets.
        tsSettings['moduleResolution'] = getModuleResolution(typescript, settings.moduleResolution);
    }
    else if (typeof settings.moduleResolution === 'number') {
        tsSettings['moduleResolution'] = settings.moduleResolution;
    }
    if (tsApi.isTS14(typescript)) {
        if (tsSettings.target === undefined) {
            // TS 1.4 has a bug that the target needs to be set.
            tsSettings.target = ts.ScriptTarget.ES3;
        }
        if (tsSettings.module === undefined) {
            // Same bug in TS 1.4 as previous comment.
            tsSettings.module = ts.ModuleKind.None;
        }
    }
    if (settings.declarationFiles !== undefined) {
        tsSettings.declaration = settings.declarationFiles;
    }
    tsSettings.sourceMap = true;
    // Suppress errors when providing `allowJs` without `outDir`.
    tsSettings.suppressOutputPathCheck = true;
    if (tsSettings.baseUrl) {
        tsSettings.baseUrl = path.resolve(projectPath, tsSettings.baseUrl);
    }
    if (tsSettings.rootDirs) {
        tsSettings.rootDirs = tsSettings.rootDirs.map(function (dir) { return path.resolve(projectPath, dir); });
    }
    return tsSettings;
}
var compile;
(function (compile) {
    compile.Project = project.Project;
    compile.reporter = _reporter;
    function createProject(fileNameOrSettings, settings) {
        var tsConfigFileName = undefined;
        var tsConfigContent = undefined;
        var projectDirectory = process.cwd();
        if (fileNameOrSettings !== undefined) {
            if (typeof fileNameOrSettings === 'string') {
                tsConfigFileName = fileNameOrSettings;
                projectDirectory = path.dirname(fileNameOrSettings);
                // load file and strip BOM, since JSON.parse fails to parse if there's a BOM present
                var tsConfigText = fs.readFileSync(fileNameOrSettings).toString();
                var typescript = (settings && settings.typescript) || ts;
                var tsConfig = tsApi.parseTsConfig(typescript, tsConfigFileName, tsConfigText);
                tsConfigContent = tsConfig.config || {};
                if (tsConfig.error) {
                    console.log(tsConfig.error.messageText);
                }
                var newSettings = {};
                if (tsConfigContent.compilerOptions) {
                    for (var _i = 0, _a = Object.keys(tsConfigContent.compilerOptions); _i < _a.length; _i++) {
                        var key = _a[_i];
                        newSettings[key] = tsConfigContent.compilerOptions[key];
                    }
                }
                if (settings) {
                    for (var _b = 0, _c = Object.keys(settings); _b < _c.length; _b++) {
                        var key = _c[_b];
                        newSettings[key] = settings[key];
                    }
                }
                settings = newSettings;
            }
            else {
                settings = fileNameOrSettings;
            }
        }
        var project = new compile.Project(tsConfigFileName, projectDirectory, tsConfigContent, getCompilerOptions(settings, projectDirectory, tsConfigFileName), settings.noExternalResolve ? true : false, settings.sortOutput ? true : false, settings.typescript);
        // Isolated modules are only supported when using TS1.5+
        if (project.options['isolatedModules'] && !tsApi.isTS14(project.typescript)) {
            if (project.options.out !== undefined || project.options['outFile'] !== undefined || project.sortOutput) {
                console.warn('You cannot combine option `isolatedModules` with `out`, `outFile` or `sortOutput`');
            }
            project.options['newLine'] = ts.NewLineKind.LineFeed; //new line option/kind fails TS1.4 typecheck
            project.options.sourceMap = false;
            project.options.declaration = false;
            project.options['inlineSourceMap'] = true;
            project.compiler = new compiler.FileCompiler();
        }
        else {
            project.compiler = new compiler.ProjectCompiler();
        }
        return project;
    }
    compile.createProject = createProject;
    function filter(project, filters) {
        var filterObj = undefined;
        return through2.obj(function (file, encoding, callback) {
            if (!filterObj) {
                filterObj = new _filter.Filter(project, filters);
            }
            if (filterObj.match(file.path))
                this.push(file);
            callback();
        });
    }
    compile.filter = filter;
})(compile || (compile = {}));
module.exports = compile;
