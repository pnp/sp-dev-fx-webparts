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
var OPTION_ALWAYS = "always";
var OPTION_NEVER = "never";
var OPTION_IGNORE_BOUND_CLASS_METHODS = "ignore-bound-class-methods";
var OPTION_IGNORE_INTERFACES = "ignore-interfaces";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new SemicolonWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "semicolon",
        description: "Enforces consistent semicolon usage at the end of every statement.",
        optionsDescription: (_a = ["\n            One of the following arguments must be provided:\n\n            * `\"", "\"` enforces semicolons at the end of every statement.\n            * `\"", "\"` disallows semicolons at the end of every statement except for when they are necessary.\n\n            The following arguments may be optionaly provided:\n            * `\"", "\"` skips checking semicolons at the end of interface members.\n            * `\"", "\"` skips checking semicolons at the end of bound class methods."], _a.raw = ["\n            One of the following arguments must be provided:\n\n            * \\`\"", "\"\\` enforces semicolons at the end of every statement.\n            * \\`\"", "\"\\` disallows semicolons at the end of every statement except for when they are necessary.\n\n            The following arguments may be optionaly provided:\n            * \\`\"", "\"\\` skips checking semicolons at the end of interface members.\n            * \\`\"", "\"\\` skips checking semicolons at the end of bound class methods."], Lint.Utils.dedent(_a, OPTION_ALWAYS, OPTION_NEVER, OPTION_IGNORE_INTERFACES, OPTION_IGNORE_BOUND_CLASS_METHODS)),
        options: {
            type: "array",
            items: [{
                    type: "string",
                    enum: [OPTION_ALWAYS, OPTION_NEVER],
                }, {
                    type: "string",
                    enum: [OPTION_IGNORE_INTERFACES],
                }],
            additionalItems: false,
        },
        optionExamples: [
            ("[true, \"" + OPTION_ALWAYS + "\"]"),
            ("[true, \"" + OPTION_NEVER + "\"]"),
            ("[true, \"" + OPTION_ALWAYS + "\", \"" + OPTION_IGNORE_INTERFACES + "\"]"),
            ("[true, \"" + OPTION_ALWAYS + "\", \"" + OPTION_IGNORE_BOUND_CLASS_METHODS + "\"]"),
        ],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_MISSING = "Missing semicolon";
    Rule.FAILURE_STRING_UNNECESSARY = "Unnecessary semicolon";
    return Rule;
    var _a;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var SemicolonWalker = (function (_super) {
    __extends(SemicolonWalker, _super);
    function SemicolonWalker() {
        _super.apply(this, arguments);
    }
    SemicolonWalker.prototype.visitVariableStatement = function (node) {
        this.checkSemicolonAt(node);
        _super.prototype.visitVariableStatement.call(this, node);
    };
    SemicolonWalker.prototype.visitExpressionStatement = function (node) {
        this.checkSemicolonAt(node);
        _super.prototype.visitExpressionStatement.call(this, node);
    };
    SemicolonWalker.prototype.visitReturnStatement = function (node) {
        this.checkSemicolonAt(node);
        _super.prototype.visitReturnStatement.call(this, node);
    };
    SemicolonWalker.prototype.visitBreakStatement = function (node) {
        this.checkSemicolonAt(node);
        _super.prototype.visitBreakStatement.call(this, node);
    };
    SemicolonWalker.prototype.visitContinueStatement = function (node) {
        this.checkSemicolonAt(node);
        _super.prototype.visitContinueStatement.call(this, node);
    };
    SemicolonWalker.prototype.visitThrowStatement = function (node) {
        this.checkSemicolonAt(node);
        _super.prototype.visitThrowStatement.call(this, node);
    };
    SemicolonWalker.prototype.visitImportDeclaration = function (node) {
        this.checkSemicolonAt(node);
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    SemicolonWalker.prototype.visitImportEqualsDeclaration = function (node) {
        this.checkSemicolonAt(node);
        _super.prototype.visitImportEqualsDeclaration.call(this, node);
    };
    SemicolonWalker.prototype.visitDoStatement = function (node) {
        this.checkSemicolonAt(node);
        _super.prototype.visitDoStatement.call(this, node);
    };
    SemicolonWalker.prototype.visitDebuggerStatement = function (node) {
        this.checkSemicolonAt(node);
        _super.prototype.visitDebuggerStatement.call(this, node);
    };
    SemicolonWalker.prototype.visitPropertyDeclaration = function (node) {
        var initializer = node.initializer;
        // check if this is a multi-line arrow function (`[^]` in the regex matches all characters including CR & LF)
        if (initializer && initializer.kind === ts.SyntaxKind.ArrowFunction && /\{[^]*\n/.test(node.getText())) {
            if (!this.hasOption(OPTION_IGNORE_BOUND_CLASS_METHODS)) {
                this.checkSemicolonAt(node, "never");
            }
        }
        else {
            this.checkSemicolonAt(node);
        }
        _super.prototype.visitPropertyDeclaration.call(this, node);
    };
    SemicolonWalker.prototype.visitInterfaceDeclaration = function (node) {
        if (this.hasOption(OPTION_IGNORE_INTERFACES)) {
            return;
        }
        for (var _i = 0, _a = node.members; _i < _a.length; _i++) {
            var member = _a[_i];
            this.checkSemicolonAt(member);
        }
        _super.prototype.visitInterfaceDeclaration.call(this, node);
    };
    SemicolonWalker.prototype.visitExportAssignment = function (node) {
        this.checkSemicolonAt(node);
        _super.prototype.visitExportAssignment.call(this, node);
    };
    SemicolonWalker.prototype.visitFunctionDeclaration = function (node) {
        if (!node.body) {
            this.checkSemicolonAt(node);
        }
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    SemicolonWalker.prototype.visitTypeAliasDeclaration = function (node) {
        this.checkSemicolonAt(node);
        _super.prototype.visitTypeAliasDeclaration.call(this, node);
    };
    SemicolonWalker.prototype.checkSemicolonAt = function (node, override) {
        var sourceFile = this.getSourceFile();
        var children = node.getChildren(sourceFile);
        var hasSemicolon = children.some(function (child) { return child.kind === ts.SyntaxKind.SemicolonToken; });
        var position = node.getStart(sourceFile) + node.getWidth(sourceFile);
        var never = override === "never" || this.hasOption(OPTION_NEVER);
        // Backwards compatible with plain {"semicolon": true}
        var always = !never && (this.hasOption(OPTION_ALWAYS) || (this.getOptions() && this.getOptions().length === 0));
        if (always && !hasSemicolon) {
            var failureStart = Math.min(position, this.getLimit());
            var fix = new Lint.Fix(Rule.metadata.ruleName, [
                this.appendText(failureStart, ";"),
            ]);
            this.addFailure(this.createFailure(failureStart, 0, Rule.FAILURE_STRING_MISSING, fix));
        }
        else if (never && hasSemicolon) {
            var scanner = ts.createScanner(ts.ScriptTarget.ES5, false, ts.LanguageVariant.Standard, sourceFile.text);
            scanner.setTextPos(position);
            var tokenKind = scanner.scan();
            while (tokenKind === ts.SyntaxKind.WhitespaceTrivia || tokenKind === ts.SyntaxKind.NewLineTrivia) {
                tokenKind = scanner.scan();
            }
            if (tokenKind !== ts.SyntaxKind.OpenParenToken && tokenKind !== ts.SyntaxKind.OpenBracketToken
                && tokenKind !== ts.SyntaxKind.PlusToken && tokenKind !== ts.SyntaxKind.MinusToken) {
                var failureStart = Math.min(position - 1, this.getLimit());
                var fix = new Lint.Fix(Rule.metadata.ruleName, [
                    this.deleteText(failureStart, 1),
                ]);
                this.addFailure(this.createFailure(failureStart, 1, Rule.FAILURE_STRING_UNNECESSARY, fix));
            }
        }
    };
    return SemicolonWalker;
}(Lint.RuleWalker));
