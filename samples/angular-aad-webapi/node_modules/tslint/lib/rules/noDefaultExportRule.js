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
        return this.applyWithWalker(new NoDefaultExportWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-default-export",
        description: "Disallows default exports in ES6-style modules.",
        descriptionDetails: "Use named exports instead.",
        rationale: (_a = ["\n            Named imports/exports [promote clarity](https://github.com/palantir/tslint/issues/1182#issue-151780453).\n            In addition, current tooling differs on the correct way to handle default imports/exports.\n            Avoiding them all together can help avoid tooling bugs and conflicts."], _a.raw = ["\n            Named imports/exports [promote clarity](https://github.com/palantir/tslint/issues/1182#issue-151780453).\n            In addition, current tooling differs on the correct way to handle default imports/exports.\n            Avoiding them all together can help avoid tooling bugs and conflicts."], Lint.Utils.dedent(_a)),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "maintainability",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Use of default exports is forbidden";
    return Rule;
    var _a;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoDefaultExportWalker = (function (_super) {
    __extends(NoDefaultExportWalker, _super);
    function NoDefaultExportWalker() {
        _super.apply(this, arguments);
    }
    NoDefaultExportWalker.prototype.visitExportAssignment = function (node) {
        var exportMember = node.getChildAt(1);
        if (exportMember != null && exportMember.kind === ts.SyntaxKind.DefaultKeyword) {
            this.addFailure(this.createFailure(exportMember.getStart(), exportMember.getWidth(), Rule.FAILURE_STRING));
        }
        _super.prototype.visitExportAssignment.call(this, node);
    };
    // inline class declaration and function declaration exports use modifiers
    NoDefaultExportWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.DefaultKeyword && node.parent != null) {
            var nodes = node.parent.modifiers;
            if (nodes != null &&
                nodes.length === 2 &&
                nodes[0].kind === ts.SyntaxKind.ExportKeyword &&
                nodes[1].kind === ts.SyntaxKind.DefaultKeyword) {
                this.addFailure(this.createFailure(nodes[1].getStart(), nodes[1].getWidth(), Rule.FAILURE_STRING));
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    return NoDefaultExportWalker;
}(Lint.RuleWalker));
