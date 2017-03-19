"use strict";
var tsApi = require('./tsapi');
var path = require('path');
var utils = require('./utils');
var Filter = (function () {
    function Filter(project, filters) {
        var _this = this;
        this.referencedFrom = undefined;
        this.referencedFromAll = undefined;
        this.project = project;
        if (filters.referencedFrom !== undefined) {
            this.referencedFrom = this.mapFilenamesToFiles(filters.referencedFrom);
            this.referencedFromAll = [];
            var addReference_1 = function (file) {
                if (_this.referencedFromAll.indexOf(file.fileNameNormalized) !== -1)
                    return;
                _this.referencedFromAll.push(file.fileNameNormalized);
                for (var i = 0; i < file.ts.referencedFiles.length; i++) {
                    var ref = tsApi.getFileName(file.ts.referencedFiles[i]);
                    ref = utils.normalizePath(path.join(path.dirname(tsApi.getFileName(file.ts)), ref));
                    var refFile = _this.project.input.getFile(ref);
                    if (refFile)
                        addReference_1(refFile);
                }
            };
            for (var i = 0; i < this.referencedFrom.length; i++) {
                addReference_1(this.referencedFrom[i]);
            }
        }
    }
    Filter.prototype.mapFilenamesToFiles = function (filenames) {
        var files = [];
        for (var i = 0; i < filenames.length; i++) {
            var file = this.getFile(filenames[i]);
            if (file === undefined) {
                console.log('gulp-typescript: Could not find file ' + filenames[i]);
            }
            else {
                files.push(file);
            }
        }
        return files;
    };
    Filter.prototype.getFile = function (searchFileName) {
        var fileNames = this.project.input.getFileNames(true);
        for (var _i = 0, fileNames_1 = fileNames; _i < fileNames_1.length; _i++) {
            var fileName = fileNames_1[_i];
            var file = this.project.input.getFile(fileName);
            if (!file || !file.gulp)
                continue;
            var base = path.resolve(process.cwd(), file.gulp.base) + '/';
            if (path.resolve(base, searchFileName) === file.gulp.path) {
                return file;
            }
        }
        return undefined;
    };
    Filter.prototype.match = function (fileName) {
        var fileNameExtensionless = utils.splitExtension(fileName)[0];
        var outputFile = this.project.output.files[utils.normalizePath(fileNameExtensionless)];
        var file;
        if (!outputFile) {
            file = this.project.input.getFile(fileName);
            if (!file) {
                console.log('gulp-typescript: Could not find file ' + fileName + '. Make sure you don\'t rename a file before you pass it to ts.filter()');
                return false;
            }
        }
        else {
            file = outputFile.original;
        }
        if (this.referencedFrom !== undefined) {
            if (!this.matchReferencedFrom(fileName, file)) {
                return false;
            }
        }
        return true;
    };
    Filter.prototype.matchReferencedFrom = function (filename, file) {
        return this.referencedFromAll.indexOf(file.fileNameNormalized) !== -1;
    };
    return Filter;
}());
exports.Filter = Filter;
