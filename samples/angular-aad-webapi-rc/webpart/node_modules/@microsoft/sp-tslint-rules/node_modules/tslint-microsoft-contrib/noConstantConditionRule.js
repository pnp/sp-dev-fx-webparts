"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var AstUtils_1 = require('./utils/AstUtils');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoConstantConditionRuleWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'no-constant-condition',
        type: 'maintainability',
        description: 'Do not use constant expressions in conditions.',
        options: null,
        issueClass: 'Non-SDL',
        issueType: 'Error',
        severity: 'Critical',
        level: 'Opportunity for Excellence',
        group: 'Correctness',
        commonWeaknessEnumeration: '398, 570, 571, 670'
    };
    Rule.FAILURE_STRING = 'Found constant conditional: ';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoConstantConditionRuleWalker = (function (_super) {
    __extends(NoConstantConditionRuleWalker, _super);
    function NoConstantConditionRuleWalker() {
        _super.apply(this, arguments);
    }
    NoConstantConditionRuleWalker.prototype.visitIfStatement = function (node) {
        if (AstUtils_1.AstUtils.isConstantExpression(node.expression)) {
            var message = Rule.FAILURE_STRING + 'if (' + node.expression.getText() + ')';
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
        }
        _super.prototype.visitIfStatement.call(this, node);
    };
    NoConstantConditionRuleWalker.prototype.visitConditionalExpression = function (node) {
        if (AstUtils_1.AstUtils.isConstantExpression(node.condition)) {
            var message = Rule.FAILURE_STRING + node.condition.getText() + ' ?';
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
        }
        _super.prototype.visitConditionalExpression.call(this, node);
    };
    NoConstantConditionRuleWalker.prototype.visitWhileStatement = function (node) {
        if (AstUtils_1.AstUtils.isConstantExpression(node.expression)) {
            var message = Rule.FAILURE_STRING + 'while (' + node.expression.getText() + ')';
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
        }
        _super.prototype.visitWhileStatement.call(this, node);
    };
    NoConstantConditionRuleWalker.prototype.visitDoStatement = function (node) {
        if (AstUtils_1.AstUtils.isConstantExpression(node.expression)) {
            var message = Rule.FAILURE_STRING + 'while (' + node.expression.getText() + ')';
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
        }
        _super.prototype.visitDoStatement.call(this, node);
    };
    NoConstantConditionRuleWalker.prototype.visitForStatement = function (node) {
        if (node.condition != null) {
            if (AstUtils_1.AstUtils.isConstantExpression(node.condition)) {
                var message = Rule.FAILURE_STRING + ';' + node.condition.getText() + ';';
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
            }
        }
        _super.prototype.visitForStatement.call(this, node);
    };
    return NoConstantConditionRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noConstantConditionRule.js.map