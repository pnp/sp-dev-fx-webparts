"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var AstUtils_1 = require("./utils/AstUtils");
var ChaiUtils_1 = require("./utils/ChaiUtils");
var FAILURE_STRING = 'Found chai call with indexOf that can be converted to .contain assertion: ';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new ChaiPreferContainsToIndexOfRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'chai-prefer-contains-to-index-of',
    type: 'maintainability',
    description: 'Avoid Chai assertions that invoke indexOf and compare for a -1 result.',
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
var ChaiPreferContainsToIndexOfRuleWalker = (function (_super) {
    __extends(ChaiPreferContainsToIndexOfRuleWalker, _super);
    function ChaiPreferContainsToIndexOfRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    ChaiPreferContainsToIndexOfRuleWalker.prototype.visitCallExpression = function (node) {
        if (ChaiUtils_1.ChaiUtils.isExpectInvocation(node)) {
            if (this.isFirstArgumentIndexOfResult(node)) {
                if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
                    if (ChaiUtils_1.ChaiUtils.isEqualsInvocation(node.expression)) {
                        if (this.isFirstArgumentNegative1(node)) {
                            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STRING));
                        }
                    }
                }
            }
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    ChaiPreferContainsToIndexOfRuleWalker.prototype.isFirstArgumentNegative1 = function (node) {
        if (node.arguments != null && node.arguments.length > 0) {
            var firstArgument = node.arguments[0];
            if (firstArgument.getText() === '-1') {
                return true;
            }
        }
        return false;
    };
    ChaiPreferContainsToIndexOfRuleWalker.prototype.isFirstArgumentIndexOfResult = function (node) {
        var expectCall = ChaiUtils_1.ChaiUtils.getLeftMostCallExpression(node);
        if (expectCall.arguments != null && expectCall.arguments.length > 0) {
            var firstArgument = expectCall.arguments[0];
            if (firstArgument.kind === ts.SyntaxKind.CallExpression) {
                if (AstUtils_1.AstUtils.getFunctionName(firstArgument) === 'indexOf') {
                    return true;
                }
            }
        }
        return false;
    };
    return ChaiPreferContainsToIndexOfRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=chaiPreferContainsToIndexOfRule.js.map