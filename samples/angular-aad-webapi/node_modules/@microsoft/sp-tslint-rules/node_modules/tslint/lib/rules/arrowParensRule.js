/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
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
        var newParensWalker = new ArrowParensWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(newParensWalker);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "arrow-parens",
        description: "Requires parentheses around the parameters of arrow function definitions.",
        rationale: "Maintains stylistic consistency with other arrow function definitions.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Parentheses are required around the parameters of an arrow function definition";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ArrowParensWalker = (function (_super) {
    __extends(ArrowParensWalker, _super);
    function ArrowParensWalker() {
        _super.apply(this, arguments);
    }
    ArrowParensWalker.prototype.visitArrowFunction = function (node) {
        if (node.parameters.length === 1) {
            var parameter = node.parameters[0];
            var text = parameter.getText();
            var firstToken = node.getFirstToken();
            var lastToken = node.getChildAt(2);
            var width = text.length;
            var position = parameter.getStart();
            var isGenerics = false;
            // If firstToken is LessThanToken, it would be Generics.
            if (firstToken.kind === ts.SyntaxKind.LessThanToken) {
                isGenerics = true;
            }
            if ((firstToken.kind !== ts.SyntaxKind.OpenParenToken || lastToken.kind !== ts.SyntaxKind.CloseParenToken)
                && !isGenerics && node.flags !== ts.NodeFlags.Async) {
                var fix = new Lint.Fix(Rule.metadata.ruleName, [new Lint.Replacement(position, width, "(" + parameter.getText() + ")")]);
                this.addFailure(this.createFailure(position, width, Rule.FAILURE_STRING, fix));
            }
        }
        _super.prototype.visitArrowFunction.call(this, node);
    };
    return ArrowParensWalker;
}(Lint.RuleWalker));
