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
        return this.applyWithWalker(new NoEmptyInterfacesRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-empty-interfaces',
    type: 'maintainability',
    description: 'Do not use empty interfaces.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Moderate',
    level: 'Opportunity for Excellence',
    group: 'Clarity',
    commonWeaknessEnumeration: '398, 710'
};
Rule.FAILURE_STRING = 'Do not declare empty interfaces: ';
exports.Rule = Rule;
var NoEmptyInterfacesRuleWalker = (function (_super) {
    __extends(NoEmptyInterfacesRuleWalker, _super);
    function NoEmptyInterfacesRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoEmptyInterfacesRuleWalker.prototype.visitInterfaceDeclaration = function (node) {
        if (this.isInterfaceEmpty(node) && !this.hasMultipleParents(node)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING + '\'' + node.name.getText() + '\''));
        }
        _super.prototype.visitInterfaceDeclaration.call(this, node);
    };
    NoEmptyInterfacesRuleWalker.prototype.isInterfaceEmpty = function (node) {
        return node.members == null || node.members.length === 0;
    };
    NoEmptyInterfacesRuleWalker.prototype.hasMultipleParents = function (node) {
        if (node.heritageClauses == null || node.heritageClauses.length === 0) {
            return false;
        }
        return node.heritageClauses[0].types.length >= 2;
    };
    return NoEmptyInterfacesRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noEmptyInterfacesRule.js.map