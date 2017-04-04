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
        return this.applyWithWalker(new UseNamedParameterWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'use-named-parameter',
    type: 'maintainability',
    description: 'Do not reference the arguments object by numerical index; instead, use a named parameter.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Important',
    level: 'Opportunity for Excellence',
    group: 'Correctness',
    commonWeaknessEnumeration: '710'
};
Rule.FAILURE_STRING = 'Use a named parameter instead: ';
exports.Rule = Rule;
var UseNamedParameterWalker = (function (_super) {
    __extends(UseNamedParameterWalker, _super);
    function UseNamedParameterWalker() {
        return _super.apply(this, arguments) || this;
    }
    UseNamedParameterWalker.prototype.visitElementAccessExpression = function (node) {
        if (node.argumentExpression != null) {
            if (node.argumentExpression.kind === ts.SyntaxKind.NumericLiteral) {
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