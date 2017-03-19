"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var SyntaxKind_1 = require('./utils/SyntaxKind');
var FAILURE_STRING = 'Avoid typeof x === \'undefined\' comparisons. Prefer x == undefined or x === undefined: ';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoTypeofUndefinedRuleWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'no-typeof-undefined',
        type: 'maintainability',
        description: 'Do not use the idiom typeof `x === \'undefined\'`. You can safely use the simpler x === undefined ' +
            'or perhaps x == null if you want to check for either null or undefined.',
        options: null,
        issueClass: 'Non-SDL',
        issueType: 'Warning',
        severity: 'Important',
        level: 'Opportunity for Excellence',
        group: 'Clarity',
        commonWeaknessEnumeration: '710'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoTypeofUndefinedRuleWalker = (function (_super) {
    __extends(NoTypeofUndefinedRuleWalker, _super);
    function NoTypeofUndefinedRuleWalker() {
        _super.apply(this, arguments);
    }
    NoTypeofUndefinedRuleWalker.prototype.visitBinaryExpression = function (node) {
        if ((this.isUndefinedString(node.left) && this.isTypeOfExpression(node.right))
            || this.isUndefinedString(node.right) && this.isTypeOfExpression(node.left)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STRING + node.getText()));
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    NoTypeofUndefinedRuleWalker.prototype.isTypeOfExpression = function (node) {
        return node.kind === SyntaxKind_1.SyntaxKind.current().TypeOfExpression;
    };
    NoTypeofUndefinedRuleWalker.prototype.isUndefinedString = function (node) {
        if (node.kind === SyntaxKind_1.SyntaxKind.current().StringLiteral) {
            if (node.text === 'undefined') {
                return true;
            }
        }
        return false;
    };
    return NoTypeofUndefinedRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noTypeofUndefinedRule.js.map