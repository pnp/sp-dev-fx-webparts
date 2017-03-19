"use strict";
var path = require('path');
var ts = require('typescript');
var tsApi = require('./tsapi');
var gutil = require('gulp-util');
function normalizePath(pathString) {
    return path.normalize(pathString).toLowerCase();
}
exports.normalizePath = normalizePath;
/**
 * Splits a filename into an extensionless filename and an extension.
 * 'bar/foo.js' is turned into ['bar/foo', 'js']
 * 'foo.d.ts' is parsed as ['foo', 'd.ts'] if you add 'd.ts' to knownExtensions.
 * @param knownExtensions An array with known extensions, that contain multiple parts, like 'd.ts'. 'a.b.c' should be listed before 'b.c'.
 */
function splitExtension(fileName, knownExtensions) {
    if (knownExtensions) {
        for (var _i = 0, knownExtensions_1 = knownExtensions; _i < knownExtensions_1.length; _i++) {
            var ext_1 = knownExtensions_1[_i];
            var index_1 = fileName.length - ext_1.length - 1;
            if (fileName.substr(index_1) === '.' + ext_1) {
                return [fileName.substr(0, index_1), ext_1];
            }
        }
    }
    var ext = path.extname(fileName).toLowerCase().substr(1);
    var index = fileName.length - ext.length;
    return [fileName.substr(0, index - 1), ext];
}
exports.splitExtension = splitExtension;
/**
 * Finds the common base path of two directories
 */
function getCommonBasePath(a, b) {
    var aSplit = a.split(/\\|\//); // Split on '/' or '\'.
    var bSplit = b.split(/\\|\//);
    var commonLength = 0;
    for (var i = 0; i < aSplit.length && i < bSplit.length; i++) {
        if (aSplit[i] !== bSplit[i])
            break;
        commonLength += aSplit[i].length + 1;
    }
    return a.substr(0, commonLength);
}
exports.getCommonBasePath = getCommonBasePath;
function getCommonBasePathOfArray(paths) {
    if (paths.length === 0)
        return '';
    return paths.reduce(getCommonBasePath);
}
exports.getCommonBasePathOfArray = getCommonBasePathOfArray;
function getError(info, typescript, file) {
    var err = new Error();
    err.name = 'TypeScript error';
    err.diagnostic = info;
    var codeAndMessageText = ts.DiagnosticCategory[info.category].toLowerCase() +
        ' TS' +
        info.code +
        ': ' +
        tsApi.flattenDiagnosticMessageText(typescript, info.messageText);
    if (!info.file) {
        err.message = codeAndMessageText;
        return err;
    }
    var fileName = tsApi.getFileName(info.file);
    if (file) {
        err.tsFile = file.ts;
        err.fullFilename = file.fileNameOriginal;
        if (file.gulp) {
            fileName = path.relative(file.gulp.cwd, file.fileNameOriginal);
            err.relativeFilename = fileName;
            err.file = file.gulp;
        }
        else {
            fileName = file.fileNameOriginal;
        }
    }
    else {
        fileName = tsApi.getFileName(info.file);
        err.fullFilename = fileName;
    }
    var startPos = tsApi.getLineAndCharacterOfPosition(typescript, info.file, info.start);
    var endPos = tsApi.getLineAndCharacterOfPosition(typescript, info.file, info.start + info.length);
    err.startPosition = {
        position: info.start,
        line: startPos.line,
        character: startPos.character
    };
    err.endPosition = {
        position: info.start + info.length - 1,
        line: endPos.line,
        character: endPos.character
    };
    err.message = gutil.colors.red(fileName + '(' + startPos.line + ',' + startPos.character + '): ').toString()
        + codeAndMessageText;
    return err;
}
exports.getError = getError;
