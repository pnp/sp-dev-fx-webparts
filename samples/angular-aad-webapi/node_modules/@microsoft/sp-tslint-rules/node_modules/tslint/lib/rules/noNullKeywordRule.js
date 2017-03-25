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
// with due reference to https://github.com/Microsoft/TypeScript/blob/7813121c4d77e50aad0eed3152ef1f1156c7b574/scripts/tslint/noNullRule.ts
var ts = require("typescript");
var Lint = require("../index");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NullWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-null-keyword",
        description: "Disallows use of the `null` keyword literal.",
        rationale: (_a = ["\n            Instead of having the dual concepts of `null` and`undefined` in a codebase,\n            this rule ensures that only `undefined` is used."], _a.raw = ["\n            Instead of having the dual concepts of \\`null\\` and\\`undefined\\` in a codebase,\n            this rule ensures that only \\`undefined\\` is used."], Lint.Utils.dedent(_a)),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Use 'undefined' instead of 'null'";
    return Rule;
    var _a;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NullWalker = (function (_super) {
    __extends(NullWalker, _super);
    function NullWalker() {
        _super.apply(this, arguments);
    }
    NullWalker.prototype.visitNode = function (node) {
        _super.prototype.visitNode.call(this, node);
        if (node.kind === ts.SyntaxKind.NullKeyword && !isPartOfType(node)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    };
    return NullWalker;
}(Lint.RuleWalker));
function isPartOfType(_a) {
    var parent = _a.parent;
    while (parent != null) {
        if (ts.SyntaxKind.FirstTypeNode <= parent.kind && parent.kind <= ts.SyntaxKind.LastTypeNode) {
            return true;
        }
        parent = parent.parent;
    }
    return false;
}
