/**
 * @license
 * Copyright 2015 Palantir Technologies, Inc.
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
        var noVarKeywordWalker = new NoVarKeywordWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(noVarKeywordWalker);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-var-keyword",
        description: "Disallows usage of the `var` keyword.",
        descriptionDetails: "Use `let` or `const` instead.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Forbidden 'var' keyword, use 'let' or 'const' instead";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoVarKeywordWalker = (function (_super) {
    __extends(NoVarKeywordWalker, _super);
    function NoVarKeywordWalker() {
        var _this = this;
        _super.apply(this, arguments);
        this.fix = function (node) { return new Lint.Fix(Rule.metadata.ruleName, [
            _this.deleteText(node.getStart(), "var".length),
            _this.appendText(node.getStart(), "let"),
        ]); };
    }
    NoVarKeywordWalker.prototype.visitVariableStatement = function (node) {
        if (!Lint.hasModifier(node.modifiers, ts.SyntaxKind.DeclareKeyword)
            && !Lint.isBlockScopedVariable(node)) {
            this.addFailure(this.createFailure(node.declarationList.getStart(), "var".length, Rule.FAILURE_STRING, this.fix(node.declarationList)));
        }
        _super.prototype.visitVariableStatement.call(this, node);
    };
    NoVarKeywordWalker.prototype.visitForStatement = function (node) {
        this.handleInitializerNode(node.initializer);
        _super.prototype.visitForStatement.call(this, node);
    };
    NoVarKeywordWalker.prototype.visitForInStatement = function (node) {
        this.handleInitializerNode(node.initializer);
        _super.prototype.visitForInStatement.call(this, node);
    };
    NoVarKeywordWalker.prototype.visitForOfStatement = function (node) {
        this.handleInitializerNode(node.initializer);
        _super.prototype.visitForOfStatement.call(this, node);
    };
    NoVarKeywordWalker.prototype.handleInitializerNode = function (node) {
        if (node && node.kind === ts.SyntaxKind.VariableDeclarationList &&
            !(Lint.isNodeFlagSet(node, ts.NodeFlags.Let) || Lint.isNodeFlagSet(node, ts.NodeFlags.Const))) {
            this.addFailure(this.createFailure(node.getStart(), "var".length, Rule.FAILURE_STRING, this.fix(node)));
        }
    };
    return NoVarKeywordWalker;
}(Lint.RuleWalker));
