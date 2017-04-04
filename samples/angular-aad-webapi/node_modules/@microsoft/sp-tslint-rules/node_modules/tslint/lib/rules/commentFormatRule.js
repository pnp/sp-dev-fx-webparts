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
var OPTION_SPACE = "check-space";
var OPTION_LOWERCASE = "check-lowercase";
var OPTION_UPPERCASE = "check-uppercase";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new CommentWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "comment-format",
        description: "Enforces formatting rules for single-line comments.",
        rationale: "Helps maintain a consistent, readable style in your codebase.",
        optionsDescription: (_a = ["\n            Three arguments may be optionally provided:\n\n            * `\"check-space\"` requires that all single-line comments must begin with a space, as in `// comment`\n                * note that comments starting with `///` are also allowed, for things such as `///<reference>`\n            * `\"check-lowercase\"` requires that the first non-whitespace character of a comment must be lowercase, if applicable.\n            * `\"check-uppercase\"` requires that the first non-whitespace character of a comment must be uppercase, if applicable."], _a.raw = ["\n            Three arguments may be optionally provided:\n\n            * \\`\"check-space\"\\` requires that all single-line comments must begin with a space, as in \\`// comment\\`\n                * note that comments starting with \\`///\\` are also allowed, for things such as \\`///<reference>\\`\n            * \\`\"check-lowercase\"\\` requires that the first non-whitespace character of a comment must be lowercase, if applicable.\n            * \\`\"check-uppercase\"\\` requires that the first non-whitespace character of a comment must be uppercase, if applicable."], Lint.Utils.dedent(_a)),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: ["check-space", "check-lowercase", "check-uppercase"],
            },
            minLength: 1,
            maxLength: 3,
        },
        optionExamples: ['[true, "check-space", "check-lowercase"]'],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.LOWERCASE_FAILURE = "comment must start with lowercase letter";
    Rule.UPPERCASE_FAILURE = "comment must start with uppercase letter";
    Rule.LEADING_SPACE_FAILURE = "comment must start with a space";
    return Rule;
    var _a;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var CommentWalker = (function (_super) {
    __extends(CommentWalker, _super);
    function CommentWalker() {
        _super.apply(this, arguments);
    }
    CommentWalker.prototype.visitSourceFile = function (node) {
        var _this = this;
        _super.prototype.visitSourceFile.call(this, node);
        Lint.scanAllTokens(ts.createScanner(ts.ScriptTarget.ES5, false, ts.LanguageVariant.Standard, node.text), function (scanner) {
            var startPos = scanner.getStartPos();
            if (_this.tokensToSkipStartEndMap[startPos] != null) {
                // tokens to skip are places where the scanner gets confused about what the token is, without the proper context
                // (specifically, regex, identifiers, and templates). So skip those tokens.
                scanner.setTextPos(_this.tokensToSkipStartEndMap[startPos]);
                return;
            }
            if (scanner.getToken() === ts.SyntaxKind.SingleLineCommentTrivia) {
                var commentText = scanner.getTokenText();
                var startPosition = scanner.getTokenPos() + 2;
                var width = commentText.length - 2;
                if (_this.hasOption(OPTION_SPACE)) {
                    if (!startsWithSpace(commentText)) {
                        var leadingSpaceFailure = _this.createFailure(startPosition, width, Rule.LEADING_SPACE_FAILURE);
                        _this.addFailure(leadingSpaceFailure);
                    }
                }
                if (_this.hasOption(OPTION_LOWERCASE)) {
                    if (!startsWithLowercase(commentText)) {
                        var lowercaseFailure = _this.createFailure(startPosition, width, Rule.LOWERCASE_FAILURE);
                        _this.addFailure(lowercaseFailure);
                    }
                }
                if (_this.hasOption(OPTION_UPPERCASE)) {
                    if (!startsWithUppercase(commentText) && !isEnableDisableFlag(commentText)) {
                        var uppercaseFailure = _this.createFailure(startPosition, width, Rule.UPPERCASE_FAILURE);
                        _this.addFailure(uppercaseFailure);
                    }
                }
            }
        });
    };
    return CommentWalker;
}(Lint.SkippableTokenAwareRuleWalker));
function startsWith(commentText, changeCase) {
    if (commentText.length <= 2) {
        return true; // comment is "//"? Technically not a violation.
    }
    // regex is "start of string"//"any amount of whitespace"("word character")
    var firstCharacterMatch = commentText.match(/^\/\/\s*(\w)/);
    if (firstCharacterMatch != null) {
        // the first group matched, i.e. the thing in the parens, is the first non-space character, if it's alphanumeric
        var firstCharacter = firstCharacterMatch[1];
        return firstCharacter === changeCase(firstCharacter);
    }
    else {
        // first character isn't alphanumeric/doesn't exist? Technically not a violation
        return true;
    }
}
function startsWithLowercase(commentText) {
    return startsWith(commentText, function (c) { return c.toLowerCase(); });
}
function startsWithUppercase(commentText) {
    return startsWith(commentText, function (c) { return c.toUpperCase(); });
}
function startsWithSpace(commentText) {
    if (commentText.length <= 2) {
        return true; // comment is "//"? Technically not a violation.
    }
    var commentBody = commentText.substring(2);
    // whitelist //#region and //#endregion
    if ((/^#(end)?region/).test(commentBody)) {
        return true;
    }
    // whitelist JetBrains IDEs' "//noinspection ..."
    if ((/^noinspection\s/).test(commentBody)) {
        return true;
    }
    var firstCharacter = commentBody.charAt(0);
    // three slashes (///) also works, to allow for ///<reference>
    return firstCharacter === " " || firstCharacter === "/";
}
function isEnableDisableFlag(commentText) {
    // regex is: start of string followed by "/*" or "//"
    // followed by any amount of whitespace followed by "tslint:"
    // followed by either "enable" or "disable"
    return /^(\/\*|\/\/)\s*tslint:(enable|disable)/.test(commentText);
}
