"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var SyntaxKind_1 = require('./utils/SyntaxKind');
var FAILURE_STRING = 'Found as-cast instead of a traditional type-cast. Please convert to a type-cast: ';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new PreferTypeCastRuleWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'prefer-type-cast',
        type: 'maintainability',
        description: 'Prefer the tradition type casts instead of the new \'as-cast\' syntax',
        options: null,
        issueClass: 'Ignored',
        issueType: 'Warning',
        severity: 'Low',
        level: 'Opportunity for Excellence',
        group: 'Configurable',
        recommendation: 'true,   // pick either type-cast format and use it consistently',
        commonWeaknessEnumeration: '398, 710'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var PreferTypeCastRuleWalker = (function (_super) {
    __extends(PreferTypeCastRuleWalker, _super);
    function PreferTypeCastRuleWalker() {
        _super.apply(this, arguments);
    }
    PreferTypeCastRuleWalker.prototype.visitSourceFile = function (node) {
        if (/.*\.tsx/.test(node.fileName) === false) {
            _super.prototype.visitSourceFile.call(this, node);
        }
    };
    PreferTypeCastRuleWalker.prototype.visitNode = function (node) {
        if (node.kind === SyntaxKind_1.SyntaxKind.current().AsExpression) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STRING + node.getText()));
        }
        _super.prototype.visitNode.call(this, node);
    };
    return PreferTypeCastRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=preferTypeCastRule.js.map