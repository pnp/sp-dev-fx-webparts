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
        return this.applyWithWalker(new NoForInRuleWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'no-for-in',
        type: 'maintainability',
        description: 'Avoid use of for-in statements. They can be replaced by Object.keys',
        options: null,
        issueClass: 'Non-SDL',
        issueType: 'Warning',
        severity: 'Moderate',
        level: 'Opportunity for Excellence',
        group: 'Clarity',
        commonWeaknessEnumeration: '398, 710'
    };
    Rule.FAILURE_STRING_FACTORY = function (initializer, expression) {
        return "Do not use the 'for in' statement: 'for (" + initializer + " in " + expression + ")'. If this is an object, use 'Object.keys' instead. If this is an array use a standard 'for' loop instead.";
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoForInRuleWalker = (function (_super) {
    __extends(NoForInRuleWalker, _super);
    function NoForInRuleWalker() {
        _super.apply(this, arguments);
    }
    NoForInRuleWalker.prototype.visitForInStatement = function (node) {
        var initializer = node.initializer.getText();
        var expression = node.expression.getText();
        var msg = Rule.FAILURE_STRING_FACTORY(initializer, expression);
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), msg));
    };
    return NoForInRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noForInRule.js.map