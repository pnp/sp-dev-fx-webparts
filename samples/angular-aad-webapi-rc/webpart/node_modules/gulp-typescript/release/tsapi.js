"use strict";
var reporter_1 = require('./reporter');
function parseTsConfig(typescript, fileName, content) {
    if ('parseConfigFileTextToJson' in typescript) {
        return typescript.parseConfigFileTextToJson(fileName, content);
    }
    else {
        return {
            config: JSON.parse(content.replace(/^\uFEFF/, ''))
        };
    }
}
exports.parseTsConfig = parseTsConfig;
function isTS14(typescript) {
    return !('findConfigFile' in typescript);
}
exports.isTS14 = isTS14;
function isTS16OrNewer(typescript) {
    return ('ModuleResolutionKind' in typescript);
}
exports.isTS16OrNewer = isTS16OrNewer;
function getFileName(thing) {
    if (thing.filename)
        return thing.filename; // TS 1.4
    return thing.fileName; // TS 1.5
}
exports.getFileName = getFileName;
function getDiagnosticsAndEmit(program) {
    var result = reporter_1.emptyCompilationResult();
    if (program.getDiagnostics) {
        var errors = program.getDiagnostics();
        result.syntaxErrors = errors.length;
        if (!errors.length) {
            // If there are no syntax errors, check types
            var checker = program.getTypeChecker(true);
            var semanticErrors = checker.getDiagnostics();
            var emitErrors = checker.emitFiles().diagnostics;
            errors = semanticErrors.concat(emitErrors);
            result.semanticErrors = errors.length;
        }
        else {
            result.emitSkipped = true;
        }
        return [errors, result];
    }
    else {
        var errors = program.getSyntacticDiagnostics();
        result.syntaxErrors = errors.length;
        if (errors.length === 0) {
            errors = program.getGlobalDiagnostics();
            // Remove error: "File '...' is not under 'rootDir' '...'. 'rootDir' is expected to contain all source files."
            // This is handled by ICompiler#correctSourceMap, so this error can be muted.
            errors = errors.filter(function (item) { return item.code !== 6059; });
            result.globalErrors = errors.length;
        }
        if (errors.length === 0) {
            errors = program.getSemanticDiagnostics();
            result.semanticErrors = errors.length;
        }
        var emitOutput = program.emit();
        result.emitErrors = emitOutput.diagnostics.length;
        result.emitSkipped = emitOutput.emitSkipped;
        return [errors.concat(emitOutput.diagnostics), result];
    }
}
exports.getDiagnosticsAndEmit = getDiagnosticsAndEmit;
function getLineAndCharacterOfPosition(typescript, file, position) {
    if (file.getLineAndCharacterOfPosition) {
        var lineAndCharacter = file.getLineAndCharacterOfPosition(position);
        return {
            line: lineAndCharacter.line + 1,
            character: lineAndCharacter.character + 1
        };
    }
    else {
        return file.getLineAndCharacterFromPosition(position);
    }
}
exports.getLineAndCharacterOfPosition = getLineAndCharacterOfPosition;
function createSourceFile(typescript, fileName, content, target, version) {
    if (version === void 0) { version = '0'; }
    if (typescript.findConfigFile) {
        return typescript.createSourceFile(fileName, content, target, true);
    }
    else {
        return typescript.createSourceFile(fileName, content, target, version);
    }
}
exports.createSourceFile = createSourceFile;
function flattenDiagnosticMessageText(typescript, messageText) {
    if (typeof messageText === 'string') {
        return messageText;
    }
    else {
        return typescript.flattenDiagnosticMessageText(messageText, "\n");
    }
}
exports.flattenDiagnosticMessageText = flattenDiagnosticMessageText;
function transpile(typescript, input, compilerOptions, fileName, diagnostics) {
    if (!typescript.transpile) {
        throw new Error('gulp-typescript: Single file compilation is not supported using TypeScript 1.4');
    }
    return typescript.transpile(input, compilerOptions, fileName.replace(/\\/g, '/'), diagnostics);
}
exports.transpile = transpile;
