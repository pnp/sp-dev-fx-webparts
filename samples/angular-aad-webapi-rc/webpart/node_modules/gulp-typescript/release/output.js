"use strict";
var path = require('path');
var sourceMap = require('source-map');
var gutil = require('gulp-util');
var utils = require('./utils');
var tsApi = require('./tsapi');
var compiler_1 = require("./compiler");
(function (OutputFileKind) {
    OutputFileKind[OutputFileKind["JavaScript"] = 0] = "JavaScript";
    OutputFileKind[OutputFileKind["SourceMap"] = 1] = "SourceMap";
    OutputFileKind[OutputFileKind["Definitions"] = 2] = "Definitions";
})(exports.OutputFileKind || (exports.OutputFileKind = {}));
var OutputFileKind = exports.OutputFileKind;
var Output = (function () {
    function Output(_project, streamJs, streamDts) {
        this.files = {};
        this.errors = [];
        this.project = _project;
        this.streamJs = streamJs;
        this.streamDts = streamDts;
    }
    Output.prototype.write = function (fileName, content) {
        var _a = utils.splitExtension(fileName, Output.knownExtensions), fileNameExtensionless = _a[0], extension = _a[1];
        var kind;
        switch (extension) {
            case 'js':
            case 'jsx':
                kind = OutputFileKind.JavaScript;
                break;
            case 'js.map':
            case 'jsx.map':
                kind = OutputFileKind.SourceMap;
                break;
            case 'd.ts':
                kind = OutputFileKind.Definitions;
                break;
        }
        this.addOrMergeFile(fileNameExtensionless, extension, kind, content);
    };
    /**
     * Adds the file to the `this.files`.
     * If there is already a file with the specified `fileName`, it will be merged.
     * This method should be called 3 times, 1 time for each `OutputFileKind`.
     * @param fileName The extensionless filename.
     */
    Output.prototype.addOrMergeFile = function (fileName, extension, kind, content) {
        var _this = this;
        var file = this.files[utils.normalizePath(fileName)];
        if (file) {
            file.extension[kind] = extension;
            file.content[kind] = content;
            if (file.content[OutputFileKind.JavaScript] !== undefined
                && file.content[OutputFileKind.SourceMap] !== undefined
                && (file.content[OutputFileKind.Definitions] !== undefined || !this.project.options.declaration)) {
                file.sourceMap = JSON.parse(file.content[OutputFileKind.SourceMap]);
                if (!this.project.compiler.correctSourceMap(file.sourceMap)) {
                    file.skipPush = true;
                    return;
                }
                if (this.project.singleOutput) {
                    file.original = this.project.input.firstSourceFile;
                    file.sourceMapOrigins = this.project.input.getFileNames(true).map(function (fName) { return _this.project.input.getFile(fName); });
                }
                else {
                    var originalFileName = path.resolve(file.sourceMap.sourceRoot, file.sourceMap.sources[0]);
                    file.original = this.project.input.getFile(originalFileName);
                    if (!file.original) {
                        console.error(("Could not find input file " + originalFileName + ". This is probably an issue of gulp-typescript.")
                            + "\nPlease report it at https://github.com/ivogabe/gulp-typescript/issues"
                            + ("\nDebug information: \nsourceRoot = " + JSON.stringify(file.sourceMap.sourceRoot) + "\nsources = " + JSON.stringify(file.sourceMap.sources)));
                        file.skipPush = true;
                        file.sourceMapOrigins = [];
                    }
                    else {
                        file.skipPush = !file.original.gulp;
                        file.sourceMapOrigins = [file.original];
                    }
                    var _a = utils.splitExtension(file.sourceMap.file), jsExtension = _a[1]; // js or jsx
                    // Fix the output filename in the source map, which must be relative
                    // to the source root or it won't work correctly in gulp-sourcemaps if
                    // there are more transformations down in the pipeline.
                    file.sourceMap.file = path.relative(file.sourceMap.sourceRoot, originalFileName).replace(/\.ts$/, '.' + jsExtension);
                }
                this.applySourceMaps(file);
                if (!this.project.sortOutput) {
                    this.emit(file);
                }
            }
            return;
        }
        this.files[utils.normalizePath(fileName)] = {
            fileName: fileName,
            original: undefined,
            sourceMapOrigins: undefined,
            extension: (_b = {},
                _b[kind] = extension,
                _b
            ),
            content: (_c = {},
                _c[kind] = content,
                _c
            ),
            pushed: false,
            skipPush: undefined,
            sourceMapsApplied: false,
            sourceMap: undefined,
            sourceMapString: undefined
        };
        var _b, _c;
    };
    Output.prototype.applySourceMaps = function (file) {
        if (file.sourceMapsApplied || file.skipPush || !file.original.gulp.sourceMap)
            return;
        file.sourceMapsApplied = true;
        var map = file.sourceMap;
        map.file = map.file.replace(/\\/g, '/');
        delete map.sourceRoot;
        map.sources = map.sources.map(function (path) { return path.replace(/\\/g, '/'); });
        var generator = sourceMap.SourceMapGenerator.fromSourceMap(new sourceMap.SourceMapConsumer(map));
        for (var _i = 0, _a = file.sourceMapOrigins; _i < _a.length; _i++) {
            var sourceFile = _a[_i];
            if (!sourceFile || !sourceFile.gulp || !sourceFile.gulp.sourceMap)
                continue;
            var inputOriginalMap = sourceFile.gulp.sourceMap;
            var inputMap = typeof inputOriginalMap === 'object' ? inputOriginalMap : JSON.parse(inputOriginalMap);
            /* We should only apply the input mappings if the input mapping isn't empty,
             * since `generator.applySourceMap` has a really bad performance on big inputs.
             */
            if (inputMap.mappings !== '') {
                var consumer = new sourceMap.SourceMapConsumer(inputMap);
                generator.applySourceMap(consumer);
            }
            if (!inputMap.sources || !inputMap.sourcesContent)
                continue;
            for (var i in inputMap.sources) {
                generator.setSourceContent(inputMap.sources[i], inputMap.sourcesContent[i]);
            }
        }
        file.sourceMapString = generator.toString();
    };
    Output.prototype.emit = function (file) {
        if (file.skipPush)
            return;
        var root;
        if (this.project.typescript.convertCompilerOptionsFromJson !== undefined && this.project.options.out === undefined) {
            root = '';
        }
        else if (this.project.singleOutput) {
            root = this.project.input.commonBasePath;
        }
        else if (this.project.options.outDir !== undefined && this.project.compiler instanceof compiler_1.ProjectCompiler) {
            root = file.original.gulp.cwd + '/';
        }
        else {
            root = '';
        }
        var base;
        if (this.project.options.outDir !== undefined && this.project.compiler instanceof compiler_1.ProjectCompiler) {
            base = path.resolve(file.original.gulp.cwd, this.project.options.outDir) + '/';
        }
        else if (this.project.singleOutput) {
            if (this.project.options.out === undefined) {
                base = this.project.projectDirectory;
            }
            else {
                base = this.project.input.commonBasePath;
            }
        }
        else {
            base = file.original.gulp.base;
        }
        var fileJs = new gutil.File({
            path: path.join(root, file.fileName + '.' + file.extension[OutputFileKind.JavaScript]),
            contents: new Buffer(file.content[OutputFileKind.JavaScript]),
            cwd: file.original.gulp.cwd,
            base: base
        });
        if (file.original.gulp.sourceMap)
            fileJs.sourceMap = JSON.parse(file.sourceMapString);
        this.streamJs.push(fileJs);
        if (this.project.options.declaration) {
            var fileDts = new gutil.File({
                path: path.join(root, file.fileName + '.' + file.extension[OutputFileKind.Definitions]),
                contents: new Buffer(file.content[OutputFileKind.Definitions]),
                cwd: file.original.gulp.cwd,
                base: base
            });
            this.streamDts.push(fileDts);
        }
    };
    Output.prototype.finish = function (results) {
        var _this = this;
        if (this.project.sortOutput) {
            var sortedEmit_1 = function (fileName) {
                var file = _this.files[utils.normalizePath(fileName)];
                if (!file || file.skipPush || file.pushed)
                    return;
                if (file.original && file.original.ts) {
                    var references = file.original.ts.referencedFiles.map(function (file) { return tsApi.getFileName(file); });
                    for (var _i = 0, references_1 = references; _i < references_1.length; _i++) {
                        var reference = references_1[_i];
                        sortedEmit_1(utils.splitExtension(reference)[0]);
                    }
                }
                _this.emit(file);
            };
            for (var _i = 0, _a = Object.keys(this.files); _i < _a.length; _i++) {
                var fileName = _a[_i];
                sortedEmit_1(fileName);
            }
        }
        this.results = results;
        if (this.project.reporter.finish)
            this.project.reporter.finish(results);
        this.streamJs.emit('finish');
        this.streamDts.emit('finish');
        this.streamJs.push(null);
        this.streamDts.push(null);
        this.project.running = false;
    };
    Output.prototype.getError = function (info) {
        var fileName = info.file && tsApi.getFileName(info.file);
        var file = fileName && this.project.input.getFile(fileName);
        return utils.getError(info, this.project.typescript, file);
    };
    Output.prototype.diagnostic = function (info) {
        this.error(this.getError(info));
    };
    Output.prototype.error = function (error) {
        if (!error)
            return;
        // Save errors for lazy compilation (if the next input is the same as the current),
        this.errors.push(error);
        // call reporter callback
        if (this.project.reporter.error)
            this.project.reporter.error(error, this.project.typescript);
        // & emit the error on the stream.
        this.streamJs.emit('error', error);
    };
    Output.knownExtensions = ['js', 'jsx', 'js.map', 'jsx.map', 'd.ts'];
    return Output;
}());
exports.Output = Output;
