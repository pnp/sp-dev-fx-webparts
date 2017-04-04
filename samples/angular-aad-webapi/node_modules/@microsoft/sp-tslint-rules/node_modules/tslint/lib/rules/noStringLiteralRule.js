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
        return this.applyWithWalker(new NoStringLiteralWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-string-literal",
        description: "Disallows object access via string literals.",
        rationale: "Encourages using strongly-typed property access.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "object access via string literals is disallowed";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoStringLiteralWalker = (function (_super) {
    __extends(NoStringLiteralWalker, _super);
    function NoStringLiteralWalker() {
        _super.apply(this, arguments);
    }
    NoStringLiteralWalker.prototype.visitElementAccessExpression = function (node) {
        var argument = node.argumentExpression;
        if (argument != null) {
            var accessorText = argument.getText();
            // the argument expression should be a string of length at least 2 (due to quote characters)
            if (argument.kind === ts.SyntaxKind.StringLiteral && accessorText.length > 2) {
                var unquotedAccessorText = accessorText.substring(1, accessorText.length - 1);
                // only create a failure if the identifier is valid, in which case there's no need to use string literals
                if (isValidIdentifier(unquotedAccessorText)) {
                    this.addFailure(this.createFailure(argument.getStart(), argument.getWidth(), Rule.FAILURE_STRING));
                }
            }
        }
        _super.prototype.visitElementAccessExpression.call(this, node);
    };
    return NoStringLiteralWalker;
}(Lint.RuleWalker));
function isValidIdentifier(token) {
    var scanner = ts.createScanner(ts.ScriptTarget.ES5, false, ts.LanguageVariant.Standard, token);
    scanner.scan();
    // if we scanned to the end of the token, we can check if the scanned item was an identifier
    return scanner.getTokenText() === token && scanner.isIdentifier();
}
