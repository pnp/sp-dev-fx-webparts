"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoFunctionExpressionRuleWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'no-function-expression',
        type: 'maintainability',
        description: 'Do not use function expressions; use arrow functions (lambdas) instead.',
        options: null,
        issueClass: 'Non-SDL',
        issueType: 'Warning',
        severity: 'Important',
        level: 'Opportunity for Excellence',
        group: 'Clarity',
        commonWeaknessEnumeration: '398, 710'
    };
    Rule.FAILURE_STRING = 'Use arrow function instead of function expression';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoFunctionExpressionRuleWalker = (function (_super) {
    __extends(NoFunctionExpressionRuleWalker, _super);
    function NoFunctionExpressionRuleWalker() {
        _super.apply(this, arguments);
    }
    NoFunctionExpressionRuleWalker.prototype.visitFunctionExpression = function (node) {
        var walker = new SingleFunctionWalker(this.getSourceFile(), this.getOptions());
        node.getChildren().forEach(function (node) {
            walker.walk(node);
        });
        if (!walker.isAccessingThis) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        _super.prototype.visitFunctionExpression.call(this, node);
    };
    return NoFunctionExpressionRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
var SingleFunctionWalker = (function (_super) {
    __extends(SingleFunctionWalker, _super);
    function SingleFunctionWalker() {
        _super.apply(this, arguments);
        this.isAccessingThis = false;
    }
    SingleFunctionWalker.prototype.visitNode = function (node) {
        if (node.getText() === 'this') {
            this.isAccessingThis = true;
        }
        _super.prototype.visitNode.call(this, node);
    };
    SingleFunctionWalker.prototype.visitFunctionExpression = function (node) {
    };
    SingleFunctionWalker.prototype.visitArrowFunction = function (node) {
    };
    return SingleFunctionWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noFunctionExpressionRule.js.map