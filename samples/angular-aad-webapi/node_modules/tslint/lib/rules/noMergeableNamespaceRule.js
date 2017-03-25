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
    /* tslint:enable:object-literal-sort-keys */
    Rule.failureStringFactory = function (identifier, locationToMerge) {
        return "Mergeable namespace " + identifier + " found. Merge its contents with the namespace on line " + locationToMerge.line + ".";
    };
    Rule.prototype.apply = function (sourceFile) {
        var languageService = Lint.createLanguageService(sourceFile.fileName, sourceFile.getFullText());
        var noMergeableNamespaceWalker = new NoMergeableNamespaceWalker(sourceFile, this.getOptions(), languageService);
        return this.applyWithWalker(noMergeableNamespaceWalker);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-mergeable-namespace",
        description: "Disallows mergeable namespaces in the same file.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "maintainability",
        typescriptOnly: true,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoMergeableNamespaceWalker = (function (_super) {
    __extends(NoMergeableNamespaceWalker, _super);
    function NoMergeableNamespaceWalker(sourceFile, options, languageService) {
        _super.call(this, sourceFile, options);
        this.languageService = languageService;
    }
    NoMergeableNamespaceWalker.prototype.visitModuleDeclaration = function (node) {
        if (Lint.isNodeFlagSet(node, ts.NodeFlags.Namespace)
            && node.name.kind === ts.SyntaxKind.Identifier) {
            this.validateReferencesForNamespace(node.name.text, node.name.getStart());
        }
        _super.prototype.visitModuleDeclaration.call(this, node);
    };
    NoMergeableNamespaceWalker.prototype.validateReferencesForNamespace = function (name, position) {
        var fileName = this.getSourceFile().fileName;
        var highlights = this.languageService.getDocumentHighlights(fileName, position, [fileName]);
        if (highlights == null || highlights[0].highlightSpans.length > 1) {
            var failureString = Rule.failureStringFactory(name, this.findLocationToMerge(position, highlights[0].highlightSpans));
            this.addFailure(this.createFailure(position, name.length, failureString));
        }
    };
    NoMergeableNamespaceWalker.prototype.findLocationToMerge = function (currentPosition, highlightSpans) {
        var line = ts.getLineAndCharacterOfPosition(this.getSourceFile(), currentPosition).line;
        for (var _i = 0, highlightSpans_1 = highlightSpans; _i < highlightSpans_1.length; _i++) {
            var span = highlightSpans_1[_i];
            var lineAndCharacter = ts.getLineAndCharacterOfPosition(this.getSourceFile(), span.textSpan.start);
            if (lineAndCharacter.line !== line) {
                return lineAndCharacter;
            }
        }
    };
    return NoMergeableNamespaceWalker;
}(Lint.RuleWalker));
