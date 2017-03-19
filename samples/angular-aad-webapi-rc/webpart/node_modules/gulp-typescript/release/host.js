"use strict";
var tsApi = require('./tsapi');
var utils = require('./utils');
var fs = require('fs');
var path = require('path');
var libDirectory = '__lib/';
var Host = (function () {
    function Host(typescript, currentDirectory, input, externalResolve, libFileName) {
        var _this = this;
        this.getCurrentDirectory = function () {
            return _this.currentDirectory;
        };
        this.writeFile = function (fileName, data, writeByteOrderMark, onError) {
            _this.output[fileName] = data;
        };
        this.getSourceFile = function (fileName, languageVersion, onError) {
            if (fileName === '__lib.d.ts') {
                return Host.getLibDefault(_this.typescript, _this.libFileName, fileName);
            }
            if (fileName.substring(0, libDirectory.length) === libDirectory) {
                try {
                    return Host.getLibDefault(_this.typescript, fileName.substring(libDirectory.length), fileName);
                }
                catch (e) { }
                try {
                    return Host.getLibDefault(_this.typescript, 'lib.' + fileName.substring(libDirectory.length), fileName);
                }
                catch (e) { }
                return undefined;
            }
            var sourceFile = _this.input.getFile(fileName);
            if (sourceFile)
                return sourceFile.ts;
            if (_this.externalResolve) {
                var text = void 0;
                try {
                    text = fs.readFileSync(fileName).toString('utf8');
                }
                catch (ex) {
                    return undefined;
                }
                _this.input.addContent(fileName, text);
                var sourceFile_1 = _this.input.getFile(fileName);
                if (sourceFile_1)
                    return sourceFile_1.ts;
            }
        };
        this.typescript = typescript;
        this.currentDirectory = currentDirectory;
        this.input = input;
        this.externalResolve = externalResolve;
        this.libFileName = libFileName;
        this.realpath = typescript.createCompilerHost({})['realpath'];
        this.reset();
    }
    Host.getLibDefault = function (typescript, libFileName, originalFileName) {
        var fileName;
        for (var i in require.cache) {
            if (!Object.prototype.hasOwnProperty.call(require.cache, i) || require.cache[i] === undefined)
                continue;
            if (require.cache[i].exports === typescript) {
                fileName = i;
            }
        }
        if (fileName === undefined) {
            return undefined; // Not found
        }
        fileName = path.join(path.dirname(fileName), libFileName);
        if (this.libDefault[fileName]) {
            return this.libDefault[fileName]; // Already loaded
        }
        var content = fs.readFileSync(fileName).toString('utf8');
        return this.libDefault[fileName] = tsApi.createSourceFile(typescript, originalFileName, content, typescript.ScriptTarget.ES3); // Will also work for ES5 & 6
    };
    Host.prototype.reset = function () {
        this.output = {};
    };
    Host.prototype.getNewLine = function () {
        return '\n';
    };
    Host.prototype.useCaseSensitiveFileNames = function () {
        return false;
    };
    Host.prototype.getCanonicalFileName = function (filename) {
        return utils.normalizePath(filename);
    };
    Host.prototype.getDefaultLibFilename = function () {
        return '__lib.d.ts';
    };
    Host.prototype.getDefaultLibFileName = function () {
        return '__lib.d.ts';
    };
    Host.prototype.getDefaultLibLocation = function () {
        return libDirectory;
    };
    Host.prototype.fileExists = function (fileName) {
        if (fileName === '__lib.d.ts') {
            return true;
        }
        var sourceFile = this.input.getFile(fileName);
        if (sourceFile)
            return true;
        if (this.externalResolve) {
            try {
                var stat = fs.statSync(fileName);
                if (!stat)
                    return false;
                return stat.isFile();
            }
            catch (ex) {
            }
        }
        return false;
    };
    Host.prototype.readFile = function (fileName) {
        var normalizedFileName = utils.normalizePath(fileName);
        var sourceFile = this.input.getFile(fileName);
        if (sourceFile)
            return sourceFile.content;
        if (this.externalResolve) {
            // Read the whole file (and cache contents) to prevent race conditions.
            var text = void 0;
            try {
                text = fs.readFileSync(fileName).toString('utf8');
            }
            catch (ex) {
                return undefined;
            }
            return text;
        }
        return undefined;
    };
    Host.libDefault = {};
    return Host;
}());
exports.Host = Host;
