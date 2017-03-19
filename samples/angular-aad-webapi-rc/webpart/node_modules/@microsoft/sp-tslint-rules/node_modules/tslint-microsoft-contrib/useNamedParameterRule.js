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
        return this.applyWithWalker(new UseNamedParameterWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'use-named-parameter',
        type: 'maintainability',
        description: 'Do not reference the arguments object by numerical index; instead, use a named parameter.',
        options: null,
        issueClass: 'Non-SDL',
        issueType: 'Warning',
        severity: 'Important',
        level: 'Opportunity for Excellence',
        group: 'Correctness',
        commonWeaknessEnumeration: '710'
    };
    Rule.FAILURE_STRING = 'Use a named parameter instead: ';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var UseNamedParameterWalker = (function (_super) {
    __extends(UseNamedParameterWalker, _super);
    function UseNamedParameterWalker() {
        _super.apply(this, arguments);
    }
    UseNamedParameterWalker.prototype.visitElementAccessExpression = function (node) {
        if (node.argumentExpression != null) {
            if (node.argumentExpression.kind === SyntaxKind_1.SyntaxKind.current().NumericLiteral) {
                if (node.expression.getText() === 'arguments') {
                    var failureString = Rule.FAILURE_STRING + '\'' + node.getText() + '\'';
                    var failure = this.createFailure(node.getStart(), node.getWidth(), failureString);
                    this.addFailure(failure);
                }
            }
        }
        _super.prototype.visitElementAccessExpression.call(this, node);
    };
    return UseNamedParameterWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=useNamedParameterRule.js.map