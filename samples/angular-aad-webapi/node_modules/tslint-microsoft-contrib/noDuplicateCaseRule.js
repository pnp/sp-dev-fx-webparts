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
        return this.applyWithWalker(new NoDuplicateCaseRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-duplicate-case',
    type: 'maintainability',
    description: 'Do not use duplicate case labels in switch statements.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Opportunity for Excellence',
    group: 'Correctness',
    commonWeaknessEnumeration: '398, 710'
};
Rule.FAILURE_STRING = 'Duplicate case found in switch statement: ';
exports.Rule = Rule;
var NoDuplicateCaseRuleWalker = (function (_super) {
    __extends(NoDuplicateCaseRuleWalker, _super);
    function NoDuplicateCaseRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoDuplicateCaseRuleWalker.prototype.visitSwitchStatement = function (node) {
        var _this = this;
        var seenLabels = [];
        node.caseBlock.clauses.forEach(function (clauseOrDefault) {
            if (clauseOrDefault.kind === ts.SyntaxKind.CaseClause) {
                var clause = clauseOrDefault;
                if (clause.expression != null) {
                    var caseText = clause.expression.getText();
                    if (seenLabels.indexOf(caseText) > -1) {
                        _this.addFailure(_this.createFailure(clause.getStart(), clause.getWidth(), Rule.FAILURE_STRING + caseText));
                    }
                    else {
                        seenLabels.push(caseText);
                    }
                }
            }
        });
        _super.prototype.visitSwitchStatement.call(this, node);
    };
    return NoDuplicateCaseRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noDuplicateCaseRule.js.map