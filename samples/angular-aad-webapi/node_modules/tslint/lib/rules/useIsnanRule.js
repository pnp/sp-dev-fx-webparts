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
        return this.applyWithWalker(new UseIsnanRuleWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "use-isnan",
        description: "Enforces use of the `isNaN()` function to check for NaN references instead of a comparison to the `NaN` constant.",
        rationale: (_a = ["\n            Since `NaN !== NaN`, comparisons with regular operators will produce unexpected results.\n            So, instead of `if (myVar === NaN)`, do `if (isNaN(myVar))`."], _a.raw = ["\n            Since \\`NaN !== NaN\\`, comparisons with regular operators will produce unexpected results.\n            So, instead of \\`if (myVar === NaN)\\`, do \\`if (isNaN(myVar))\\`."], Lint.Utils.dedent(_a)),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Found an invalid comparison for NaN: ";
    return Rule;
    var _a;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var UseIsnanRuleWalker = (function (_super) {
    __extends(UseIsnanRuleWalker, _super);
    function UseIsnanRuleWalker() {
        _super.apply(this, arguments);
    }
    UseIsnanRuleWalker.prototype.visitBinaryExpression = function (node) {
        if ((this.isExpressionNaN(node.left) || this.isExpressionNaN(node.right))
            && node.operatorToken.kind !== ts.SyntaxKind.EqualsToken) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING + node.getText()));
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    UseIsnanRuleWalker.prototype.isExpressionNaN = function (node) {
        return node.kind === ts.SyntaxKind.Identifier && node.getText() === "NaN";
    };
    return UseIsnanRuleWalker;
}(Lint.RuleWalker));
