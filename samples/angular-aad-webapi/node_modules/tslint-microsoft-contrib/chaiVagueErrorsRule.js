"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var ChaiUtils_1 = require("./utils/ChaiUtils");
var BASE_ERROR = 'Found chai call with vague failure message. ';
var FAILURE_STRING = BASE_ERROR + 'Please add an explicit failure message';
var FAILURE_STRING_COMPARE_TRUE = BASE_ERROR + 'Move the strict equality comparison from the expect ' +
    'call into the assertion value';
var FAILURE_STRING_COMPARE_FALSE = BASE_ERROR + 'Move the strict inequality comparison from the expect ' +
    'call into the assertion value. ';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new ChaiVagueErrorsRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'chai-vague-errors',
    type: 'maintainability',
    description: 'Avoid Chai assertions that result in vague errors',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Important',
    level: 'Opportunity for Excellence',
    group: 'Clarity',
    commonWeaknessEnumeration: '398, 710'
};
exports.Rule = Rule;
var ChaiVagueErrorsRuleWalker = (function (_super) {
    __extends(ChaiVagueErrorsRuleWalker, _super);
    function ChaiVagueErrorsRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    ChaiVagueErrorsRuleWalker.prototype.visitPropertyAccessExpression = function (node) {
        if (ChaiUtils_1.ChaiUtils.isExpectInvocation(node)) {
            if (/ok|true|false|undefined|null/.test(node.name.getText())) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STRING));
            }
        }
        _super.prototype.visitPropertyAccessExpression.call(this, node);
    };
    ChaiVagueErrorsRuleWalker.prototype.visitCallExpression = function (node) {
        if (ChaiUtils_1.ChaiUtils.isExpectInvocation(node)) {
            if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
                if (ChaiUtils_1.ChaiUtils.isEqualsInvocation(node.expression)) {
                    if (node.arguments.length === 1) {
                        if (/true|false|null|undefined/.test(node.arguments[0].getText())) {
                            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STRING));
                        }
                    }
                }
            }
            var actualValue = ChaiUtils_1.ChaiUtils.getFirstExpectCallParameter(node);
            if (actualValue.kind === ts.SyntaxKind.BinaryExpression) {
                var expectedValue = ChaiUtils_1.ChaiUtils.getFirstExpectationParameter(node);
                var binaryExpression = actualValue;
                var operator = binaryExpression.operatorToken.getText();
                var expectingBooleanKeyword = expectedValue.kind === ts.SyntaxKind.TrueKeyword
                    || expectedValue.kind === ts.SyntaxKind.FalseKeyword;
                if (operator === '===' && expectingBooleanKeyword) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STRING_COMPARE_TRUE));
                }
                else if (operator === '!==' && expectingBooleanKeyword) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STRING_COMPARE_FALSE));
                }
            }
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    return ChaiVagueErrorsRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=chaiVagueErrorsRule.js.map