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
var Lint = require("../index");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var newParensWalker = new NewParensWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(newParensWalker);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "new-parens",
        description: "Requires parentheses when invoking a constructor via the `new` keyword.",
        rationale: "Maintains stylistic consistency with other function calls.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Parentheses are required when invoking a constructor";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NewParensWalker = (function (_super) {
    __extends(NewParensWalker, _super);
    function NewParensWalker() {
        _super.apply(this, arguments);
    }
    NewParensWalker.prototype.visitNewExpression = function (node) {
        if (node.arguments === undefined) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        _super.prototype.visitNewExpression.call(this, node);
    };
    return NewParensWalker;
}(Lint.RuleWalker));
