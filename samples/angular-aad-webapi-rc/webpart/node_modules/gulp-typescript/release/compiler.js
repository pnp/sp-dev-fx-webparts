"use strict";
var ts = require('typescript');
var path = require('path');
var tsApi = require('./tsapi');
var input_1 = require('./input');
var output_1 = require('./output');
var host_1 = require('./host');
var filter_1 = require('./filter');
var reporter_1 = require('./reporter');
var utils = require('./utils');
/**
 * Compiles a whole project, with full type checking
 */
var ProjectCompiler = (function () {
    function ProjectCompiler() {
    }
    ProjectCompiler.prototype.prepare = function (_project) {
        this.project = _project;
    };
    ProjectCompiler.prototype.inputFile = function (file) { };
    ProjectCompiler.prototype.inputDone = function () {
        if (!this.project.input.firstSourceFile) {
            this.project.output.finish(reporter_1.emptyCompilationResult());
            return;
        }
        var root = this.project.input.commonBasePath;
        var rootFilenames = this.project.input.getFileNames(true);
        if (!this.project.singleOutput) {
            // Add an empty file under the root.
            // This will make sure the commonSourceDirectory, calculated by TypeScript, won't point to a subdirectory of the root.
            // We cannot use the `rootDir` option here, since that gives errors if the commonSourceDirectory points to a
            // directory containing the rootDir instead of the rootDir, which will break the build when using `noEmitOnError`.
            // The empty file is filtered out later on.
            var emptyFileName = path.join(this.project.options['rootDir'] ? path.resolve(this.project.projectDirectory, this.project.options['rootDir']) : root, '________________empty.ts');
            rootFilenames.push(emptyFileName);
            this.project.input.addContent(emptyFileName, '');
        }
        if (!this.project.input.isChanged(true)) {
            // Re-use old output
            var old = this.project.previousOutput;
            for (var _i = 0, _a = old.errors; _i < _a.length; _i++) {
                var error = _a[_i];
                this.project.output.error(error);
            }
            for (var _b = 0, _c = Object.keys(old.files); _b < _c.length; _b++) {
                var fileName = _c[_b];
                var file = old.files[fileName];
                this.project.output.write(file.fileName + '.' + file.extension[output_1.OutputFileKind.JavaScript], file.content[output_1.OutputFileKind.JavaScript]);
                this.project.output.write(file.fileName + '.' + file.extension[output_1.OutputFileKind.SourceMap], file.content[output_1.OutputFileKind.SourceMap]);
                if (file.content[output_1.OutputFileKind.Definitions] !== undefined) {
                    this.project.output.write(file.fileName + '.' + file.extension[output_1.OutputFileKind.Definitions], file.content[output_1.OutputFileKind.Definitions]);
                }
            }
            this.project.output.finish(old.results);
            return;
        }
        this.project.options.sourceRoot = root;
        this.host = new host_1.Host(this.project.typescript, this.project.currentDirectory, this.project.input, !this.project.noExternalResolve, this.project.options.target >= ts.ScriptTarget.ES6 ? 'lib.es6.d.ts' : 'lib.d.ts');
        if (this.project.filterSettings !== undefined) {
            var filter_2 = new filter_1.Filter(this.project, this.project.filterSettings);
            rootFilenames = rootFilenames.filter(function (fileName) { return filter_2.match(fileName); });
        }
        // Creating a program to compile the sources
        // We cast to `tsApi.CreateProgram` so we can pass the old program as an extra argument.
        // TS 1.6+ will try to reuse program structure (if possible)
        this.program = this.project.typescript.createProgram(rootFilenames, this.project.options, this.host, this.program);
        var _d = tsApi.getDiagnosticsAndEmit(this.program), errors = _d[0], result = _d[1];
        for (var i = 0; i < errors.length; i++) {
            this.project.output.diagnostic(errors[i]);
        }
        for (var fileName in this.host.output) {
            if (!this.host.output.hasOwnProperty(fileName))
                continue;
            var content = this.host.output[fileName];
            var _e = utils.splitExtension(fileName), extension = _e[1];
            if (extension === 'js' || extension === 'jsx') {
                content = this.removeSourceMapComment(content);
            }
            this.project.output.write(fileName, content);
        }
        this.project.output.finish(result);
    };
    Object.defineProperty(ProjectCompiler.prototype, "commonBaseDiff", {
        /**
         * Calculates the difference between the common base directory calculated based on the base paths of the input files
         * and the common source directory calculated by TypeScript.
         */
        get: function () {
            if (this._commonBaseDiff)
                return this._commonBaseDiff;
            var expected = this.project.input.commonBasePath;
            var real = this.project.input.commonSourceDirectory;
            var length = real.length - expected.length;
            this._commonBaseDiff = [length, real.substring(real.length - length)];
            if (length > 0) {
                this._commonBaseDiff = [length, real.substring(real.length - length)];
            }
            else {
                this._commonBaseDiff = [length, expected.substring(expected.length + length)];
            }
            if (this._commonBaseDiff[1] === '/' || this._commonBaseDiff[1] === '\\') {
                this._commonBaseDiff = [0, ''];
            }
            return this._commonBaseDiff;
        },
        // This empty setter will prevent that TS emits 'readonly' modifier.
        // 'readonly' is not supported in current stable release.
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    ProjectCompiler.prototype.correctSourceMap = function (map) {
        var _this = this;
        var _a = this.commonBaseDiff, diffLength = _a[0], diff = _a[1];
        if (this.project.singleOutput)
            return true;
        if (diffLength < 0) {
            // There were files added outside of the common base.
            var outsideRoot_1 = false;
            map.sources = map.sources.map(function (fileName) {
                var fullPath = path.join(_this.project.input.commonSourceDirectory, fileName);
                var fullPathNormalized = utils.normalizePath(fullPath);
                var relative = path.relative(utils.normalizePath(_this.project.input.commonBasePath), fullPathNormalized);
                var first2 = relative.substring(0, 2);
                var first3 = relative.substring(0, 3);
                if (first3 === '../' || first3 === '..\\') {
                    outsideRoot_1 = true;
                }
                else if (first2 === './' || first2 === '.\\') {
                    relative = relative.substring(2);
                }
                return path.normalize(fullPath).substring(fullPathNormalized.length - relative.length);
            });
            if (outsideRoot_1)
                return false;
        }
        return true;
    };
    ProjectCompiler.prototype.removeSourceMapComment = function (content) {
        // By default the TypeScript automaticly inserts a source map comment.
        // This should be removed because gulp-sourcemaps takes care of that.
        // The comment is always on the last line, so it's easy to remove it
        // (But the last line also ends with a \n, so we need to look for the \n before the other)
        var index = content.lastIndexOf('\n', content.length - 2);
        return content.substring(0, index) + '\n';
    };
    return ProjectCompiler;
}());
exports.ProjectCompiler = ProjectCompiler;
var FileCompiler = (function () {
    function FileCompiler() {
        this.errorsPerFile = {};
        this.previousErrorsPerFile = {};
        this.compilationResult = undefined;
    }
    FileCompiler.prototype.prepare = function (_project) {
        this.project = _project;
        this.project.input.noParse = true;
        this.compilationResult = reporter_1.emptyCompilationResult();
    };
    FileCompiler.prototype.inputFile = function (file) {
        if (file.fileNameNormalized.substr(file.fileNameNormalized.length - 5) === '.d.ts') {
            return; // Don't compile definition files
        }
        if (this.project.input.getFileChange(file.fileNameOriginal).state === input_1.FileChangeState.Equal) {
            // Not changed, re-use old file.
            var old = this.project.previousOutput;
            var diagnostics_1 = this.previousErrorsPerFile[file.fileNameNormalized];
            for (var _i = 0, diagnostics_2 = diagnostics_1; _i < diagnostics_2.length; _i++) {
                var error = diagnostics_2[_i];
                this.project.output.diagnostic(error);
            }
            this.compilationResult.transpileErrors += diagnostics_1.length;
            this.errorsPerFile[file.fileNameNormalized] = this.previousErrorsPerFile[file.fileNameNormalized];
            for (var _a = 0, _b = Object.keys(old.files); _a < _b.length; _a++) {
                var fileName = _b[_a];
                var oldFile = old.files[fileName];
                if (oldFile.original.fileNameNormalized !== file.fileNameNormalized)
                    continue;
                this.project.output.write(oldFile.fileName + '.' + oldFile.extension[output_1.OutputFileKind.JavaScript], oldFile.content[output_1.OutputFileKind.JavaScript]);
                this.project.output.write(oldFile.fileName + '.' + oldFile.extension[output_1.OutputFileKind.SourceMap], oldFile.content[output_1.OutputFileKind.SourceMap]);
            }
            return;
        }
        var diagnostics = [];
        var outputString = tsApi.transpile(this.project.typescript, file.content, this.project.options, file.fileNameOriginal, diagnostics);
        for (var _c = 0, diagnostics_3 = diagnostics; _c < diagnostics_3.length; _c++) {
            var diagnostic = diagnostics_3[_c];
            this.project.output.diagnostic(diagnostic);
        }
        this.compilationResult.transpileErrors += diagnostics.length;
        var index = outputString.lastIndexOf('\n');
        var mapString = outputString.substring(index + 1);
        if (mapString.substring(0, 1) === '\r')
            mapString = mapString.substring(1);
        var start = '//# sourceMappingURL=data:application/json;base64,';
        if (mapString.substring(0, start.length) !== start) {
            console.error('Couldn\'t read the sourceMap generated by TypeScript. This is likely an issue with gulp-typescript.');
            return;
        }
        mapString = mapString.substring(start.length);
        var map = JSON.parse(new Buffer(mapString, 'base64').toString());
        map.sourceRoot = path.resolve(file.gulp.cwd, file.gulp.base);
        map.sources[0] = path.relative(map.sourceRoot, file.gulp.path);
        var fileNameExtensionless = utils.splitExtension(file.fileNameOriginal)[0];
        var _d = utils.splitExtension(map.file), extension = _d[1]; // js or jsx
        this.project.output.write(fileNameExtensionless + '.' + extension, outputString.substring(0, index));
        this.project.output.write(fileNameExtensionless + '.' + extension + '.map', JSON.stringify(map));
        this.errorsPerFile[file.fileNameNormalized] = diagnostics;
    };
    FileCompiler.prototype.inputDone = function () {
        this.project.output.finish(this.compilationResult);
        this.previousErrorsPerFile = this.errorsPerFile;
        this.errorsPerFile = {};
    };
    FileCompiler.prototype.correctSourceMap = function (map) {
        return true;
    };
    return FileCompiler;
}());
exports.FileCompiler = FileCompiler;
