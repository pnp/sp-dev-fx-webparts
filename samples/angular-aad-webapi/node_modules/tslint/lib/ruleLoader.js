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
var path = require("path");
var underscore_string_1 = require("underscore.string");
var configuration_1 = require("./configuration");
var utils_1 = require("./utils");
var moduleDirectory = path.dirname(module.filename);
var CORE_RULES_DIRECTORY = path.resolve(moduleDirectory, ".", "rules");
var shownDeprecations = [];
function loadRules(ruleConfiguration, enableDisableRuleMap, rulesDirectories, isJs) {
    var rules = [];
    var notFoundRules = [];
    var notAllowedInJsRules = [];
    for (var ruleName in ruleConfiguration) {
        if (ruleConfiguration.hasOwnProperty(ruleName)) {
            var ruleValue = ruleConfiguration[ruleName];
            var Rule = findRule(ruleName, rulesDirectories);
            if (Rule == null) {
                notFoundRules.push(ruleName);
            }
            else {
                if (isJs && Rule.metadata && Rule.metadata.typescriptOnly != null && Rule.metadata.typescriptOnly) {
                    notAllowedInJsRules.push(ruleName);
                }
                else {
                    var all = "all"; // make the linter happy until we can turn it on and off
                    var allList = (all in enableDisableRuleMap ? enableDisableRuleMap[all] : []);
                    var ruleSpecificList = (ruleName in enableDisableRuleMap ? enableDisableRuleMap[ruleName] : []);
                    var disabledIntervals = buildDisabledIntervalsFromSwitches(ruleSpecificList, allList);
                    rules.push(new Rule(ruleName, ruleValue, disabledIntervals));
                    if (Rule.metadata && Rule.metadata.deprecationMessage && shownDeprecations.indexOf(Rule.metadata.ruleName) === -1) {
                        console.warn(Rule.metadata.ruleName + " is deprecated. " + Rule.metadata.deprecationMessage);
                        shownDeprecations.push(Rule.metadata.ruleName);
                    }
                }
            }
        }
    }
    if (notFoundRules.length > 0) {
        var warning = (_a = ["\n            Could not find implementations for the following rules specified in the configuration:\n                ", "\n            Try upgrading TSLint and/or ensuring that you have all necessary custom rules installed.\n            If TSLint was recently upgraded, you may have old rules configured which need to be cleaned up.\n        "], _a.raw = ["\n            Could not find implementations for the following rules specified in the configuration:\n                ", "\n            Try upgrading TSLint and/or ensuring that you have all necessary custom rules installed.\n            If TSLint was recently upgraded, you may have old rules configured which need to be cleaned up.\n        "], utils_1.dedent(_a, notFoundRules.join("\n                ")));
        console.warn(warning);
    }
    if (notAllowedInJsRules.length > 0) {
        var warning = (_b = ["\n            Following rules specified in configuration couldn't be applied to .js or .jsx files:\n                ", "\n            Make sure to exclude them from \"jsRules\" section of your tslint.json.\n        "], _b.raw = ["\n            Following rules specified in configuration couldn't be applied to .js or .jsx files:\n                ", "\n            Make sure to exclude them from \"jsRules\" section of your tslint.json.\n        "], utils_1.dedent(_b, notAllowedInJsRules.join("\n                ")));
        console.warn(warning);
    }
    if (rules.length === 0) {
        console.warn("No valid rules have been specified");
    }
    return rules;
    var _a, _b;
}
exports.loadRules = loadRules;
function findRule(name, rulesDirectories) {
    var camelizedName = transformName(name);
    // first check for core rules
    var Rule = loadRule(CORE_RULES_DIRECTORY, camelizedName);
    if (Rule != null) {
        return Rule;
    }
    var directories = configuration_1.getRulesDirectories(rulesDirectories);
    for (var _i = 0, directories_1 = directories; _i < directories_1.length; _i++) {
        var rulesDirectory = directories_1[_i];
        // then check for rules within the first level of rulesDirectory
        if (rulesDirectory != null) {
            Rule = loadRule(rulesDirectory, camelizedName);
            if (Rule != null) {
                return Rule;
            }
        }
    }
    return undefined;
}
exports.findRule = findRule;
function transformName(name) {
    // camelize strips out leading and trailing underscores and dashes, so make sure they aren't passed to camelize
    // the regex matches the groups (leading underscores and dashes)(other characters)(trailing underscores and dashes)
    var nameMatch = name.match(/^([-_]*)(.*?)([-_]*)$/);
    if (nameMatch == null) {
        return name + "Rule";
    }
    return nameMatch[1] + underscore_string_1.camelize(nameMatch[2]) + nameMatch[3] + "Rule";
}
/**
 * @param directory - An absolute path to a directory of rules
 * @param ruleName - A name of a rule in filename format. ex) "someLintRule"
 */
function loadRule(directory, ruleName) {
    var fullPath = path.join(directory, ruleName);
    if (fs.existsSync(fullPath + ".js")) {
        var ruleModule = require(fullPath);
        if (ruleModule && ruleModule.Rule) {
            return ruleModule.Rule;
        }
    }
    return undefined;
}
/*
 * We're assuming both lists are already sorted top-down so compare the tops, use the smallest of the two,
 * and build the intervals that way.
 */
function buildDisabledIntervalsFromSwitches(ruleSpecificList, allList) {
    var isCurrentlyDisabled = false;
    var disabledStartPosition;
    var disabledIntervalList = [];
    var i = 0;
    var j = 0;
    while (i < ruleSpecificList.length || j < allList.length) {
        var ruleSpecificTopPositon = (i < ruleSpecificList.length ? ruleSpecificList[i].position : Infinity);
        var allTopPositon = (j < allList.length ? allList[j].position : Infinity);
        var newPositionToCheck = void 0;
        if (ruleSpecificTopPositon < allTopPositon) {
            newPositionToCheck = ruleSpecificList[i];
            i++;
        }
        else {
            newPositionToCheck = allList[j];
            j++;
        }
        // we're currently disabled and enabling, or currently enabled and disabling -- a switch
        if (newPositionToCheck.isEnabled === isCurrentlyDisabled) {
            if (!isCurrentlyDisabled) {
                // start a new interval
                disabledStartPosition = newPositionToCheck.position;
                isCurrentlyDisabled = true;
            }
            else {
                // we're currently disabled and about to enable -- end the interval
                disabledIntervalList.push({
                    endPosition: newPositionToCheck.position,
                    startPosition: disabledStartPosition,
                });
                isCurrentlyDisabled = false;
            }
        }
    }
    if (isCurrentlyDisabled) {
        // we started an interval but didn't finish one -- so finish it with an Infinity
        disabledIntervalList.push({
            endPosition: Infinity,
            startPosition: disabledStartPosition,
        });
    }
    return disabledIntervalList;
}
