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
        return this.applyWithWalker(new UseIsnanRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'use-isnan',
    type: 'maintainability',
    description: 'enforces that you use the isNaN() function to check for NaN references instead of a comparison to the NaN constant.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Ignored',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Opportunity for Excellence',
    group: 'Ignored'
};
Rule.FAILURE_STRING = 'Found an invalid comparison for NaN: ';
exports.Rule = Rule;
var UseIsnanRuleWalker = (function (_super) {
    __extends(UseIsnanRuleWalker, _super);
    function UseIsnanRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    UseIsnanRuleWalker.prototype.visitBinaryExpression = function (node) {
        if (this.isExpressionNaN(node.left) || this.isExpressionNaN(node.right)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING + node.getText()));
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    UseIsnanRuleWalker.prototype.isExpressionNaN = function (node) {
        return node.kind === ts.SyntaxKind.Identifier && node.getText() === 'NaN';
    };
    return UseIsnanRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=useIsnanRule.js.map