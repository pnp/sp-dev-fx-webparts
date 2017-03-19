"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var MATH_FAIL_STRING = 'Math.random produces insecure random numbers. ' +
    'Use crypto.randomBytes() or window.crypto.getRandomValues() instead';
var NODE_FAIL_STRING = 'crypto.pseudoRandomBytes produces insecure random numbers. ' +
    'Use crypto.randomBytes() instead';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new InsecureRandomRuleWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'insecure-random',
        type: 'functionality',
        description: 'Do not use insecure sources for random bytes',
        options: null,
        issueClass: 'SDL',
        issueType: 'Error',
        severity: 'Important',
        level: 'Opportunity for Excellence',
        group: 'Security',
        commonWeaknessEnumeration: '330'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var InsecureRandomRuleWalker = (function (_super) {
    __extends(InsecureRandomRuleWalker, _super);
    function InsecureRandomRuleWalker() {
        _super.apply(this, arguments);
    }
    InsecureRandomRuleWalker.prototype.visitPropertyAccessExpression = function (node) {
        if (node.expression.getText() === 'Math' && node.name.text === 'random') {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), MATH_FAIL_STRING));
        }
        else if (node.name.text === 'pseudoRandomBytes') {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), NODE_FAIL_STRING));
        }
        _super.prototype.visitPropertyAccessExpression.call(this, node);
    };
    return InsecureRandomRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=insecureRandomRule.js.map