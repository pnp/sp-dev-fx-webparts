"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var AstUtils_1 = require("./utils/AstUtils");
var FAILURE_STRING = 'Replace block comment with a single-line comment';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoSingleLineBlockCommentRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-single-line-block-comment',
    type: 'maintainability',
    description: 'Avoid single line block comments; use single line comments instead',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Whitespace',
    commonWeaknessEnumeration: '710'
};
exports.Rule = Rule;
var NoSingleLineBlockCommentRuleWalker = (function (_super) {
    __extends(NoSingleLineBlockCommentRuleWalker, _super);
    function NoSingleLineBlockCommentRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoSingleLineBlockCommentRuleWalker.prototype.visitSourceFile = function (node) {
        var _this = this;
        var scanner = ts.createScanner(ts.ScriptTarget.ES5, false, AstUtils_1.AstUtils.getLanguageVariant(node), node.text);
        Lint.scanAllTokens(scanner, function (scanner) {
            var startPos = scanner.getStartPos();
            if (_this.tokensToSkipStartEndMap[startPos] != null) {
                scanner.setTextPos(_this.tokensToSkipStartEndMap[startPos]);
                return;
            }
            if (scanner.getToken() === ts.SyntaxKind.MultiLineCommentTrivia) {
                var commentText = scanner.getTokenText();
                var startPosition = scanner.getTokenPos();
                if (_this.isSingleLineComment(commentText)
                    && _this.isNextTokenOnANewLine(scanner)
                    && _this.isTsLintSuppression(commentText) === false) {
                    _this.addFailure(_this.createFailure(startPosition, commentText.length, FAILURE_STRING));
                }
            }
        });
    };
    NoSingleLineBlockCommentRuleWalker.prototype.isNextTokenOnANewLine = function (scanner) {
        return scanner.lookAhead(function () {
            scanner.scan();
            return scanner.hasPrecedingLineBreak();
        });
    };
    NoSingleLineBlockCommentRuleWalker.prototype.isSingleLineComment = function (commentText) {
        var lines = commentText.split(/\r?\n/);
        return lines.length === 1;
    };
    NoSingleLineBlockCommentRuleWalker.prototype.isTsLintSuppression = function (commentText) {
        return /\/*\s*tslint:(enable|disable):.*/.test(commentText);
    };
    return NoSingleLineBlockCommentRuleWalker;
}(Lint.SkippableTokenAwareRuleWalker));
//# sourceMappingURL=noSingleLineBlockCommentRule.js.map