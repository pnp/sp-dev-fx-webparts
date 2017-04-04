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
var OPTION_USE_TABS = "tabs";
var OPTION_USE_SPACES = "spaces";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new IndentWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "indent",
        description: "Enforces indentation with tabs or spaces.",
        rationale: (_a = ["\n            Using only one of tabs or spaces for indentation leads to more consistent editor behavior,\n            cleaner diffs in version control, and easier programatic manipulation."], _a.raw = ["\n            Using only one of tabs or spaces for indentation leads to more consistent editor behavior,\n            cleaner diffs in version control, and easier programatic manipulation."], Lint.Utils.dedent(_a)),
        optionsDescription: (_b = ["\n            One of the following arguments must be provided:\n\n            * `\"spaces\"` enforces consistent spaces.\n            * `\"tabs\"` enforces consistent tabs."], _b.raw = ["\n            One of the following arguments must be provided:\n\n            * \\`\"spaces\"\\` enforces consistent spaces.\n            * \\`\"tabs\"\\` enforces consistent tabs."], Lint.Utils.dedent(_b)),
        options: {
            type: "string",
            enum: ["tabs", "spaces"],
        },
        optionExamples: ['[true, "spaces"]'],
        type: "maintainability",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_TABS = "tab indentation expected";
    Rule.FAILURE_STRING_SPACES = "space indentation expected";
    return Rule;
    var _a, _b;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
// visit every token and enforce that only the right character is used for indentation
var IndentWalker = (function (_super) {
    __extends(IndentWalker, _super);
    function IndentWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        if (this.hasOption(OPTION_USE_TABS)) {
            this.regExp = new RegExp(" ");
            this.failureString = Rule.FAILURE_STRING_TABS;
        }
        else if (this.hasOption(OPTION_USE_SPACES)) {
            this.regExp = new RegExp("\t");
            this.failureString = Rule.FAILURE_STRING_SPACES;
        }
    }
    IndentWalker.prototype.visitSourceFile = function (node) {
        if (!this.hasOption(OPTION_USE_TABS) && !this.hasOption(OPTION_USE_SPACES)) {
            // if we don't have either option, no need to check anything, and no need to call super, so just return
            return;
        }
        var endOfComment = -1;
        var endOfTemplateString = -1;
        var scanner = ts.createScanner(ts.ScriptTarget.ES5, false, ts.LanguageVariant.Standard, node.text);
        for (var _i = 0, _a = node.getLineStarts(); _i < _a.length; _i++) {
            var lineStart = _a[_i];
            if (lineStart < endOfComment || lineStart < endOfTemplateString) {
                // skip checking lines inside multi-line comments or template strings
                continue;
            }
            scanner.setTextPos(lineStart);
            var currentScannedType = scanner.scan();
            var fullLeadingWhitespace = "";
            var lastStartPos = -1;
            while (currentScannedType === ts.SyntaxKind.WhitespaceTrivia) {
                var startPos = scanner.getStartPos();
                if (startPos === lastStartPos) {
                    break;
                }
                lastStartPos = startPos;
                fullLeadingWhitespace += scanner.getTokenText();
                currentScannedType = scanner.scan();
            }
            var commentRanges = ts.getTrailingCommentRanges(node.text, lineStart);
            if (commentRanges) {
                endOfComment = commentRanges[commentRanges.length - 1].end;
            }
            else {
                var scanType = currentScannedType;
                // scan until we reach end of line, skipping over template strings
                while (scanType !== ts.SyntaxKind.NewLineTrivia && scanType !== ts.SyntaxKind.EndOfFileToken) {
                    if (scanType === ts.SyntaxKind.NoSubstitutionTemplateLiteral) {
                        // template string without expressions - skip past it
                        endOfTemplateString = scanner.getStartPos() + scanner.getTokenText().length;
                    }
                    else if (scanType === ts.SyntaxKind.TemplateHead) {
                        // find end of template string containing expressions...
                        while (scanType !== ts.SyntaxKind.TemplateTail && scanType !== ts.SyntaxKind.EndOfFileToken) {
                            scanType = scanner.scan();
                            if (scanType === ts.SyntaxKind.CloseBraceToken) {
                                scanType = scanner.reScanTemplateToken();
                            }
                        }
                        // ... and skip past it
                        endOfTemplateString = scanner.getStartPos() + scanner.getTokenText().length;
                    }
                    scanType = scanner.scan();
                }
            }
            if (currentScannedType === ts.SyntaxKind.SingleLineCommentTrivia
                || currentScannedType === ts.SyntaxKind.MultiLineCommentTrivia
                || currentScannedType === ts.SyntaxKind.NewLineTrivia) {
                // ignore lines that have comments before the first token
                continue;
            }
            if (fullLeadingWhitespace.match(this.regExp)) {
                this.addFailure(this.createFailure(lineStart, fullLeadingWhitespace.length, this.failureString));
            }
        }
        // no need to call super to visit the rest of the nodes, so don't call super here
    };
    return IndentWalker;
}(Lint.RuleWalker));
