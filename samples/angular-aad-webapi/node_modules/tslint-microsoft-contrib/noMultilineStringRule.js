"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoMultilineStringWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-multiline-string',
    type: 'maintainability',
    description: 'Do not declare multiline strings',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Clarity',
    recommendation: 'true, // multiline-strings often introduce unnecessary whitespace into the string literals',
    commonWeaknessEnumeration: '710'
};
Rule.FAILURE_STRING = 'Forbidden Multiline string: ';
exports.Rule = Rule;
var NoMultilineStringWalker = (function (_super) {
    __extends(NoMultilineStringWalker, _super);
    function NoMultilineStringWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoMultilineStringWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral) {
            var fullText = node.getFullText();
            var firstLine = fullText.substring(0, fullText.indexOf('\n'));
            var trimmed = firstLine.substring(0, 40).trim();
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING + trimmed + '...'));
        }
        _super.prototype.visitNode.call(this, node);
    };
    return NoMultilineStringWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noMultilineStringRule.js.map