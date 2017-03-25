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
        return this.applyWithWalker(new NoEvalWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-eval",
        description: "Disallows `eval` function invocations.",
        rationale: (_a = ["\n            `eval()` is dangerous as it allows arbitrary code execution with full privileges. There are\n            [alternatives](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)\n            for most of the use cases for `eval()`."], _a.raw = ["\n            \\`eval()\\` is dangerous as it allows arbitrary code execution with full privileges. There are\n            [alternatives](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)\n            for most of the use cases for \\`eval()\\`."], Lint.Utils.dedent(_a)),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "forbidden eval";
    return Rule;
    var _a;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoEvalWalker = (function (_super) {
    __extends(NoEvalWalker, _super);
    function NoEvalWalker() {
        _super.apply(this, arguments);
    }
    NoEvalWalker.prototype.visitCallExpression = function (node) {
        var expression = node.expression;
        if (expression.kind === ts.SyntaxKind.Identifier) {
            var expressionName = expression.text;
            if (expressionName === "eval") {
                this.addFailure(this.createFailure(expression.getStart(), expression.getWidth(), Rule.FAILURE_STRING));
            }
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    return NoEvalWalker;
}(Lint.RuleWalker));
