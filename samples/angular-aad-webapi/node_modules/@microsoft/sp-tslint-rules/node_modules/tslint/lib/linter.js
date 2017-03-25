/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
var fs = require("fs");
var ts = require("typescript");
var configuration_1 = require("./configuration");
var enableDisableRules_1 = require("./enableDisableRules");
var formatterLoader_1 = require("./formatterLoader");
var rule_1 = require("./language/rule/rule");
var typedRule_1 = require("./language/rule/typedRule");
var utils = require("./language/utils");
var ruleLoader_1 = require("./ruleLoader");
var utils_1 = require("./utils");
/**
 * Linter that can lint multiple files in consecutive runs.
 */
var Linter = (function () {
    function Linter(options, program) {
        this.options = options;
        this.program = program;
        this.failures = [];
        this.fixes = [];
        if (typeof options !== "object") {
            throw new Error("Unknown Linter options type: " + typeof options);
        }
        if (options.configuration != null) {
            throw new Error("ILinterOptions does not contain the property `configuration` as of version 4. " +
                "Did you mean to pass the `IConfigurationFile` object to lint() ? ");
        }
    }
    /**
     * Creates a TypeScript program object from a tsconfig.json file path and optional project directory.
     */
    Linter.createProgram = function (configFile, projectDirectory) {
        if (projectDirectory === undefined) {
            var lastSeparator = configFile.lastIndexOf("/");
            if (lastSeparator < 0) {
                projectDirectory = ".";
            }
            else {
                projectDirectory = configFile.substring(0, lastSeparator + 1);
            }
        }
        var config = ts.readConfigFile(configFile, ts.sys.readFile).config;
        var parseConfigHost = {
            fileExists: fs.existsSync,
            readDirectory: ts.sys.readDirectory,
            useCaseSensitiveFileNames: true,
        };
        var parsed = ts.parseJsonConfigFileContent(config, parseConfigHost, projectDirectory);
        var host = ts.createCompilerHost(parsed.options, true);
        var program = ts.createProgram(parsed.fileNames, parsed.options, host);
        return program;
    };
    /**
     * Returns a list of source file names from a TypeScript program. This includes all referenced
     * files and excludes declaration (".d.ts") files.
     */
    Linter.getFileNames = function (program) {
        return program.getSourceFiles().map(function (s) { return s.fileName; }).filter(function (l) { return l.substr(-5) !== ".d.ts"; });
    };
    Linter.prototype.lint = function (fileName, source, configuration) {
        if (configuration === void 0) { configuration = configuration_1.DEFAULT_CONFIG; }
        var enabledRules = this.getEnabledRules(fileName, source, configuration);
        var sourceFile = this.getSourceFile(fileName, source);
        var hasLinterRun = false;
        var fileFailures = [];
        if (this.options.fix) {
            for (var _i = 0, enabledRules_1 = enabledRules; _i < enabledRules_1.length; _i++) {
                var rule = enabledRules_1[_i];
                var ruleFailures = this.applyRule(rule, sourceFile);
                var fixes = ruleFailures.map(function (f) { return f.getFix(); }).filter(function (f) { return !!f; });
                source = fs.readFileSync(fileName, { encoding: "utf-8" });
                if (fixes.length > 0) {
                    this.fixes = this.fixes.concat(ruleFailures);
                    source = rule_1.Fix.applyAll(source, fixes);
                    fs.writeFileSync(fileName, source, { encoding: "utf-8" });
                    // reload AST if file is modified
                    sourceFile = this.getSourceFile(fileName, source);
                }
                fileFailures = fileFailures.concat(ruleFailures);
            }
            hasLinterRun = true;
        }
        // make a 1st pass or make a 2nd pass if there were any fixes because the positions may be off
        if (!hasLinterRun || this.fixes.length > 0) {
            fileFailures = [];
            for (var _a = 0, enabledRules_2 = enabledRules; _a < enabledRules_2.length; _a++) {
                var rule = enabledRules_2[_a];
                var ruleFailures = this.applyRule(rule, sourceFile);
                if (ruleFailures.length > 0) {
                    fileFailures = fileFailures.concat(ruleFailures);
                }
            }
        }
        this.failures = this.failures.concat(fileFailures);
    };
    Linter.prototype.getResult = function () {
        var formatter;
        var formattersDirectory = configuration_1.getRelativePath(this.options.formattersDirectory);
        var formatterName = this.options.formatter || "prose";
        var Formatter = formatterLoader_1.findFormatter(formatterName, formattersDirectory);
        if (Formatter) {
            formatter = new Formatter();
        }
        else {
            throw new Error("formatter '" + formatterName + "' not found");
        }
        var output = formatter.format(this.failures, this.fixes);
        return {
            failureCount: this.failures.length,
            failures: this.failures,
            fixes: this.fixes,
            format: formatterName,
            output: output,
        };
    };
    Linter.prototype.applyRule = function (rule, sourceFile) {
        var ruleFailures = [];
        if (this.program && typedRule_1.TypedRule.isTypedRule(rule)) {
            ruleFailures = rule.applyWithProgram(sourceFile, this.program);
        }
        else {
            ruleFailures = rule.apply(sourceFile);
        }
        var fileFailures = [];
        for (var _i = 0, ruleFailures_1 = ruleFailures; _i < ruleFailures_1.length; _i++) {
            var ruleFailure = ruleFailures_1[_i];
            if (!this.containsRule(this.failures, ruleFailure)) {
                fileFailures.push(ruleFailure);
            }
        }
        return fileFailures;
    };
    Linter.prototype.getEnabledRules = function (fileName, source, configuration) {
        if (configuration === void 0) { configuration = configuration_1.DEFAULT_CONFIG; }
        var sourceFile = this.getSourceFile(fileName, source);
        // walk the code first to find all the intervals where rules are disabled
        var rulesWalker = new enableDisableRules_1.EnableDisableRulesWalker(sourceFile, {
            disabledIntervals: [],
            ruleName: "",
        });
        rulesWalker.walk(sourceFile);
        var enableDisableRuleMap = rulesWalker.enableDisableRuleMap;
        var rulesDirectories = utils_1.arrayify(this.options.rulesDirectory)
            .concat(utils_1.arrayify(configuration.rulesDirectory));
        var isJs = /\.jsx?$/i.test(fileName);
        var configurationRules = isJs ? configuration.jsRules : configuration.rules;
        var configuredRules = ruleLoader_1.loadRules(configurationRules, enableDisableRuleMap, rulesDirectories, isJs);
        return configuredRules.filter(function (r) { return r.isEnabled(); });
    };
    Linter.prototype.getSourceFile = function (fileName, source) {
        var sourceFile;
        if (this.program) {
            sourceFile = this.program.getSourceFile(fileName);
            // check if the program has been type checked
            if (sourceFile && !("resolvedModules" in sourceFile)) {
                throw new Error("Program must be type checked before linting");
            }
        }
        else {
            sourceFile = utils.getSourceFile(fileName, source);
        }
        if (sourceFile === undefined) {
            var INVALID_SOURCE_ERROR = (_a = ["\n                Invalid source file: ", ". Ensure that the files supplied to lint have a .ts, .tsx, .js or .jsx extension.\n            "], _a.raw = ["\n                Invalid source file: ", ". Ensure that the files supplied to lint have a .ts, .tsx, .js or .jsx extension.\n            "], utils_1.dedent(_a, fileName));
            throw new Error(INVALID_SOURCE_ERROR);
        }
        return sourceFile;
        var _a;
    };
    Linter.prototype.containsRule = function (rules, rule) {
        return rules.some(function (r) { return r.equals(rule); });
    };
    Linter.VERSION = "4.0.2";
    Linter.findConfiguration = configuration_1.findConfiguration;
    Linter.findConfigurationPath = configuration_1.findConfigurationPath;
    Linter.getRulesDirectories = configuration_1.getRulesDirectories;
    Linter.loadConfigurationFromPath = configuration_1.loadConfigurationFromPath;
    return Linter;
}());
module.exports = Linter;
