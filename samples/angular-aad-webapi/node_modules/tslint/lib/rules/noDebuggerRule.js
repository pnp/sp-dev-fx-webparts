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
var Lint = require("../index");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoDebuggerWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-debugger",
        description: "Disallows `debugger` statements.",
        rationale: "In general, \`debugger\` statements aren't appropriate for production code.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Use of debugger statements is forbidden";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoDebuggerWalker = (function (_super) {
    __extends(NoDebuggerWalker, _super);
    function NoDebuggerWalker() {
        _super.apply(this, arguments);
    }
    NoDebuggerWalker.prototype.visitDebuggerStatement = function (node) {
        var debuggerKeywordNode = node.getChildAt(0);
        this.addFailure(this.createFailure(debuggerKeywordNode.getStart(), debuggerKeywordNode.getWidth(), Rule.FAILURE_STRING));
        _super.prototype.visitDebuggerStatement.call(this, node);
    };
    return NoDebuggerWalker;
}(Lint.RuleWalker));
