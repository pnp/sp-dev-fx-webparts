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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("../index");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var options = this.getOptions();
        var banFunctionWalker = new BanFunctionWalker(sourceFile, options);
        var functionsToBan = options.ruleArguments;
        functionsToBan.forEach(function (f) { return banFunctionWalker.addBannedFunction(f); });
        return this.applyWithWalker(banFunctionWalker);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "ban",
        description: "Bans the use of specific functions or global methods.",
        optionsDescription: (_a = ["\n            A list of `['object', 'method', 'optional explanation here']` or `['globalMethod']` which ban `object.method()` \n            or respectively `globalMethod()`."], _a.raw = ["\n            A list of \\`['object', 'method', 'optional explanation here']\\` or \\`['globalMethod']\\` which ban \\`object.method()\\` \n            or respectively \\`globalMethod()\\`."], Lint.Utils.dedent(_a)),
        options: {
            type: "list",
            listType: {
                type: "array",
                items: { type: "string" },
                minLength: 1,
                maxLength: 3,
            },
        },
        optionExamples: ["[true, [\"someGlobalMethod\"], [\"someObject\", \"someFunction\"], \n                          [\"someObject\", \"otherFunction\", \"Optional explanation\"]]"],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_FACTORY = function (expression, messageAddition) {
        return "Calls to '" + expression + "' are not allowed." + (messageAddition ? " " + messageAddition : "");
    };
    return Rule;
    var _a;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var BanFunctionWalker = (function (_super) {
    __extends(BanFunctionWalker, _super);
    function BanFunctionWalker() {
        _super.apply(this, arguments);
        this.bannedGlobalFunctions = [];
        this.bannedFunctions = [];
    }
    BanFunctionWalker.prototype.addBannedFunction = function (bannedFunction) {
        if (bannedFunction.length === 1) {
            this.bannedGlobalFunctions.push(bannedFunction[0]);
        }
        else if (bannedFunction.length >= 2) {
            this.bannedFunctions.push(bannedFunction);
        }
    };
    BanFunctionWalker.prototype.visitCallExpression = function (node) {
        var expression = node.expression;
        this.checkForObjectMethodBan(expression);
        this.checkForGlobalBan(expression);
        _super.prototype.visitCallExpression.call(this, node);
    };
    BanFunctionWalker.prototype.checkForObjectMethodBan = function (expression) {
        if (expression.kind === ts.SyntaxKind.PropertyAccessExpression
            && expression.getChildCount() >= 3) {
            var firstToken = expression.getFirstToken();
            var firstChild = expression.getChildAt(0);
            var secondChild = expression.getChildAt(1);
            var thirdChild = expression.getChildAt(2);
            var rightSideExpression = thirdChild.getFullText();
            var leftSideExpression = void 0;
            if (firstChild.getChildCount() > 0) {
                leftSideExpression = firstChild.getLastToken().getText();
            }
            else {
                leftSideExpression = firstToken.getText();
            }
            if (secondChild.kind === ts.SyntaxKind.DotToken) {
                for (var _i = 0, _a = this.bannedFunctions; _i < _a.length; _i++) {
                    var bannedFunction = _a[_i];
                    if (leftSideExpression === bannedFunction[0] && rightSideExpression === bannedFunction[1]) {
                        var failure = this.createFailure(expression.getStart(), expression.getWidth(), Rule.FAILURE_STRING_FACTORY(leftSideExpression + "." + rightSideExpression, bannedFunction[2]));
                        this.addFailure(failure);
                    }
                }
            }
        }
    };
    BanFunctionWalker.prototype.checkForGlobalBan = function (expression) {
        if (expression.kind === ts.SyntaxKind.Identifier) {
            var identifierName = expression.text;
            if (this.bannedGlobalFunctions.indexOf(identifierName) !== -1) {
                this.addFailure(this.createFailure(expression.getStart(), expression.getWidth(), Rule.FAILURE_STRING_FACTORY("" + identifierName)));
            }
        }
    };
    return BanFunctionWalker;
}(Lint.RuleWalker));
exports.BanFunctionWalker = BanFunctionWalker;
