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
        return this.applyWithWalker(new NoNamespaceWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-namespace",
        description: "Disallows use of internal \`module\`s and \`namespace\`s.",
        descriptionDetails: "This rule still allows the use of `declare module ... {}`",
        rationale: (_a = ["\n            ES6-style external modules are the standard way to modularize code.\n            Using `module {}` and `namespace {}` are outdated ways to organize TypeScript code."], _a.raw = ["\n            ES6-style external modules are the standard way to modularize code.\n            Using \\`module {}\\` and \\`namespace {}\\` are outdated ways to organize TypeScript code."], Lint.Utils.dedent(_a)),
        optionsDescription: (_b = ["\n            One argument may be optionally provided:\n\n            * `allow-declarations` allows `declare namespace ... {}` to describe external APIs."], _b.raw = ["\n            One argument may be optionally provided:\n\n            * \\`allow-declarations\\` allows \\`declare namespace ... {}\\` to describe external APIs."], Lint.Utils.dedent(_b)),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: ["allow-declarations"],
            },
            minLength: 0,
            maxLength: 1,
        },
        optionExamples: ["true", '[true, "allow-declarations"]'],
        type: "typescript",
        typescriptOnly: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "'namespace' and 'module' are disallowed";
    return Rule;
    var _a, _b;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoNamespaceWalker = (function (_super) {
    __extends(NoNamespaceWalker, _super);
    function NoNamespaceWalker() {
        _super.apply(this, arguments);
    }
    NoNamespaceWalker.prototype.visitSourceFile = function (node) {
        // Ignore all .d.ts files by returning and not walking their ASTs.
        // .d.ts declarations do not have the Ambient flag set, but are still declarations.
        if (this.hasOption("allow-declarations") && node.fileName.match(/\.d\.ts$/)) {
            return;
        }
        this.walkChildren(node);
    };
    NoNamespaceWalker.prototype.visitModuleDeclaration = function (decl) {
        _super.prototype.visitModuleDeclaration.call(this, decl);
        // declare module 'foo' {} is an external module, not a namespace.
        if (decl.name.kind === ts.SyntaxKind.StringLiteral) {
            return;
        }
        if (this.hasOption("allow-declarations")
            && Lint.someAncestor(decl, function (n) { return Lint.isNodeFlagSet(n, ts.NodeFlags.Ambient); })) {
            return;
        }
        if (Lint.isNestedModuleDeclaration(decl)) {
            return;
        }
        this.addFailure(this.createFailure(decl.getStart(), decl.getWidth(), Rule.FAILURE_STRING));
    };
    return NoNamespaceWalker;
}(Lint.RuleWalker));
