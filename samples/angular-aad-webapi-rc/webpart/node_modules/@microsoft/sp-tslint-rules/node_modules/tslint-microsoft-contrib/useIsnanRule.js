"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var SyntaxKind_1 = require('./utils/SyntaxKind');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new UseIsnanRuleWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'use-isnan',
        type: 'maintainability',
        description: 'enforces that you use the isNaN() function to check for NaN references instead of a comparison to the NaN constant.',
        options: null,
        issueClass: 'Ignored',
        issueType: 'Error',
        severity: 'Critical',
        level: 'Opportunity for Excellence',
        group: 'Ignored'
    };
    Rule.FAILURE_STRING = 'Found an invalid comparison for NaN: ';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var UseIsnanRuleWalker = (function (_super) {
    __extends(UseIsnanRuleWalker, _super);
    function UseIsnanRuleWalker() {
        _super.apply(this, arguments);
    }
    UseIsnanRuleWalker.prototype.visitBinaryExpression = function (node) {
        if (this.isExpressionNaN(node.left) || this.isExpressionNaN(node.right)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING + node.getText()));
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    UseIsnanRuleWalker.prototype.isExpressionNaN = function (node) {
        return node.kind === SyntaxKind_1.SyntaxKind.current().Identifier && node.getText() === 'NaN';
    };
    return UseIsnanRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=useIsnanRule.js.map