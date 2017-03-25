"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoMultipleVarDeclRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-multiple-var-decl',
    type: 'maintainability',
    description: 'Deprecated - This rule is now part of the base TSLint product as the rule named \'one-variable-per-declaration\'',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Ignored',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Deprecated',
    recommendation: 'false,         // use tslint one-variable-per-declaration rule instead',
    commonWeaknessEnumeration: '710'
};
Rule.FAILURE_STRING = 'Do not use comma separated variable declarations: ';
exports.Rule = Rule;
var NoMultipleVarDeclRuleWalker = (function (_super) {
    __extends(NoMultipleVarDeclRuleWalker, _super);
    function NoMultipleVarDeclRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoMultipleVarDeclRuleWalker.prototype.visitVariableStatement = function (node) {
        if (node.declarationList.declarations.length > 1) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING + node.declarationList.declarations[0].getText() + ','));
        }
        _super.prototype.visitVariableStatement.call(this, node);
    };
    return NoMultipleVarDeclRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noMultipleVarDeclRule.js.map