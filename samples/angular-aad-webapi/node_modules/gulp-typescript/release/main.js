"use strict";
var fs = require('fs');
var path = require('path');
var _project = require('./project');
var utils = require('./utils');
var _reporter = require('./reporter');
function compile(param, theReporter) {
    if (arguments.length >= 3) {
        utils.deprecate("Reporter are now passed as the second argument", "remove the second argument", "Filters have been removed as of gulp-typescript 3.0.\nThe reporter is now passed as the second argument instead of the third argument.");
    }
    var proj;
    if (typeof param === "function") {
        proj = param;
        if (arguments.length >= 2) {
            utils.deprecate("ts(tsProject, ...) has been deprecated", "use .pipe(tsProject(reporter)) instead", "As of gulp-typescript 3.0, .pipe(ts(tsProject, ...)) should be written as .pipe(tsProject(reporter)).");
        }
        else {
            utils.deprecate("ts(tsProject) has been deprecated", "use .pipe(tsProject(reporter)) instead", "As of gulp-typescript 3.0, .pipe(ts(tsProject)) should be written as .pipe(tsProject()).");
        }
    }
    else {
        proj = compile.createProject(param || {});
    }
    return proj(theReporter);
}
function getTypeScript(typescript) {
    if (typescript)
        return typescript;
    try {
        return require('typescript');
    }
    catch (e) {
        utils.deprecate("TypeScript not installed", "install with `npm install typescript --save-dev`", "As of gulp-typescript 3.0, TypeScript isn't bundled with gulp-typescript any more.\nInstall the latest stable version with `npm install typescript --save-dev`\nor a nightly with `npm install typescript@next --save-dev`");
        throw new Error("TypeScript not installed");
    }
}
function getCompilerOptions(settings, projectPath, configFileName) {
    var typescript = getTypeScript(settings.typescript);
    if (settings.sourceRoot !== undefined) {
        console.warn('gulp-typescript: sourceRoot isn\'t supported any more. Use sourceRoot option of gulp-sourcemaps instead.');
    }
    if (settings.noExternalResolve !== undefined) {
        utils.deprecate("noExternalResolve is deprecated", "use noResolve instead", "The non-standard option noExternalResolve has been removed as of gulp-typescript 3.0.\nUse noResolve instead.");
    }
    if (settings.sortOutput !== undefined) {
        utils.deprecate("sortOutput is deprecated", "your project might work without it", "The non-standard option sortOutput has been removed as of gulp-typescript 3.0.\nYour project will probably compile without this option.\nOtherwise, if you're using gulp-concat, you should remove gulp-concat and use the outFile option instead.");
    }
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
            option === 'inlineSourceMap' ||
            option === 'sourceRoot' ||
            option === 'inlineSources')
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
var compile;
(function (compile) {
    compile.reporter = _reporter;
    function createProject(fileNameOrSettings, settings) {
        var tsConfigFileName = undefined;
        var tsConfigContent = undefined;
        var projectDirectory = process.cwd();
        if (fileNameOrSettings !== undefined) {
            if (typeof fileNameOrSettings === 'string') {
                tsConfigFileName = path.resolve(process.cwd(), fileNameOrSettings);
                projectDirectory = path.dirname(tsConfigFileName);
                // Load file and strip BOM, since JSON.parse fails to parse if there's a BOM present
                var tsConfigText = fs.readFileSync(tsConfigFileName).toString();
                var typescript = getTypeScript(settings && settings.typescript);
                var tsConfig = typescript.parseConfigFileTextToJson(tsConfigFileName, tsConfigText);
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
        var project = _project.setupProject(projectDirectory, tsConfigContent, getCompilerOptions(settings, projectDirectory, tsConfigFileName), getTypeScript(settings.typescript));
        return project;
    }
    compile.createProject = createProject;
    function filter() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        utils.deprecate('ts.filter() is deprecated', 'soon you can use tsProject.resolve()', 'Filters have been removed as of gulp-typescript 3.0.\nSoon tsProject.resolve() will be available as an alternative.\nSee https://github.com/ivogabe/gulp-typescript/issues/190.');
    }
    compile.filter = filter;
})(compile || (compile = {}));
module.exports = compile;
