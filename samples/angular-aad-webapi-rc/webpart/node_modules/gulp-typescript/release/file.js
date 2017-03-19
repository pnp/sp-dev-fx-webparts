var path = require('path');
var tsApi = require('./tsapi');
var utils = require('./utils');
(function (FileChangeState) {
    FileChangeState[FileChangeState["New"] = 0] = "New";
    FileChangeState[FileChangeState["Equal"] = 1] = "Equal";
    FileChangeState[FileChangeState["Modified"] = 2] = "Modified";
    FileChangeState[FileChangeState["Deleted"] = 3] = "Deleted";
    FileChangeState[FileChangeState["NotFound"] = 4] = "NotFound";
})(exports.FileChangeState || (exports.FileChangeState = {}));
var FileChangeState = exports.FileChangeState;
(function (FileKind) {
    FileKind[FileKind["Source"] = 0] = "Source";
    FileKind[FileKind["Config"] = 1] = "Config";
})(exports.FileKind || (exports.FileKind = {}));
var FileKind = exports.FileKind;
var File;
(function (File) {
    function fromContent(fileName, content) {
        var kind = FileKind.Source;
        if (path.extname(fileName).toLowerCase() === 'json')
            kind = FileKind.Config;
        return {
            fileNameNormalized: utils.normalizePath(fileName),
            fileNameOriginal: fileName,
            content: content,
            kind: kind
        };
    }
    File.fromContent = fromContent;
    function fromGulp(file) {
        var str = file.contents.toString('utf8');
        var data = fromContent(file.path, str);
        data.gulp = file;
        return data;
    }
    File.fromGulp = fromGulp;
    function equal(a, b) {
        if (a === undefined || b === undefined)
            return a === b; // They could be both undefined.
        return (a.fileNameOriginal === b.fileNameOriginal)
            && (a.content === b.content);
    }
    File.equal = equal;
    function getChangeState(previous, current) {
        if (previous === undefined) {
            return current === undefined ? FileChangeState.NotFound : FileChangeState.New;
        }
        if (current === undefined) {
            return FileChangeState.Deleted;
        }
        if (equal(previous, current)) {
            return FileChangeState.Equal;
        }
        return FileChangeState.Modified;
    }
    File.getChangeState = getChangeState;
})(File = exports.File || (exports.File = {}));
var FileDictionary = (function () {
    function FileDictionary(typescript) {
        this.files = {};
        this.typescript = typescript;
    }
    FileDictionary.prototype.addGulp = function (gFile) {
        this.addFile(File.fromGulp(gFile));
    };
    FileDictionary.prototype.addContent = function (fileName, content) {
        this.addFile(File.fromContent(fileName, content));
    };
    FileDictionary.prototype.addFile = function (file) {
        if (file.kind === FileKind.Source)
            this.initTypeScriptSourceFile(file);
        this.files[file.fileNameNormalized] = file;
    };
    FileDictionary.prototype.getFile = function (name) {
        return this.files[utils.normalizePath(name)];
    };
    FileDictionary.prototype.getGulpFileNames = function (onlyGulp) {
        if (onlyGulp === void 0) { onlyGulp = false; }
        var fileNames = [];
        for (var fileName in this.files) {
            if (!this.files.hasOwnProperty(fileName))
                continue;
            var file = this.files[fileName];
            if (onlyGulp && !file.gulp)
                continue;
            fileNames.push(file.fileNameOriginal);
        }
        return fileNames;
    };
    return FileDictionary;
})();
exports.FileDictionary = FileDictionary;
var FileCache = (function () {
    function FileCache(typescript, options) {
        this.previous = undefined;
        this.version = 0;
        this.typescript = typescript;
        this.options = options;
        this.createDictionary();
    }
    FileCache.prototype.addGulp = function (gFile) {
        this.current.addGulp(gFile);
    };
    FileCache.prototype.addContent = function (fileName, content) {
        this.current.addContent(fileName, content);
    };
    FileCache.prototype.reset = function () {
        this.version++;
        this.previous = this.current;
        this.createDictionary();
    };
    FileCache.prototype.createDictionary = function () {
        var _this = this;
        this.current = new FileDictionary(this.typescript);
        this.current.initTypeScriptSourceFile = function (file) { return _this.initTypeScriptSourceFile(file); };
    };
    FileCache.prototype.initTypeScriptSourceFile = function (file) {
        if (this.previous) {
            var previous = this.previous.getFile(file.fileNameOriginal);
            if (File.equal(previous, file)) {
                file.ts = previous.ts; // Re-use previous source file.
                return;
            }
        }
        file.ts = tsApi.createSourceFile(this.typescript, file.fileNameOriginal, file.content, this.options.target, this.version + '');
    };
    FileCache.prototype.getFile = function (name) {
        return this.current.getFile(name);
    };
    FileCache.prototype.getFileChange = function (name) {
        var previous;
        if (this.previous) {
            previous = this.previous.getFile(name);
        }
        var current = this.current.getFile(name);
        return {
            previous: previous,
            current: current,
            state: File.getChangeState(previous, current)
        };
    };
    FileCache.prototype.getFileNames = function (onlyGulp) {
        if (onlyGulp === void 0) { onlyGulp = false; }
        return this.current.getGulpFileNames(onlyGulp);
    };
    return FileCache;
})();
exports.FileCache = FileCache;
