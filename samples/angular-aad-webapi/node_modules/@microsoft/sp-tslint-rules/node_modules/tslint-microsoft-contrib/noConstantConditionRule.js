"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var AstUtils_1 = require("./utils/AstUtils");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoConstantConditionRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-constant-condition',
    type: 'maintainability',
    description: 'Do not use constant expressions in conditions.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Opportunity for Excellence',
    group: 'Correctness',
    commonWeaknessEnumeration: '398, 570, 571, 670'
};
Rule.FAILURE_STRING = 'Found constant conditional: ';
exports.Rule = Rule;
var NoConstantConditionRuleWalker = (function (_super) {
    __extends(NoConstantConditionRuleWalker, _super);
    function NoConstantConditionRuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.checkLoops = _this.extractBoolean('checkLoops');
        return _this;
    }
    NoConstantConditionRuleWalker.prototype.extractBoolean = function (keyName) {
        var result = true;
        this.getOptions().forEach(function (opt) {
            if (typeof (opt) === 'object') {
                if (opt[keyName] === false || opt[keyName] === 'false') {
                    result = false;
                }
            }
        });
        return result;
    };
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
        if (this.checkLoops) {
            if (AstUtils_1.AstUtils.isConstantExpression(node.expression)) {
                var message = Rule.FAILURE_STRING + 'while (' + node.expression.getText() + ')';
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
            }
        }
        _super.prototype.visitWhileStatement.call(this, node);
    };
    NoConstantConditionRuleWalker.prototype.visitDoStatement = function (node) {
        if (this.checkLoops) {
            if (AstUtils_1.AstUtils.isConstantExpression(node.expression)) {
                var message = Rule.FAILURE_STRING + 'while (' + node.expression.getText() + ')';
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
            }
        }
        _super.prototype.visitDoStatement.call(this, node);
    };
    NoConstantConditionRuleWalker.prototype.visitForStatement = function (node) {
        if (this.checkLoops && node.condition != null) {
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