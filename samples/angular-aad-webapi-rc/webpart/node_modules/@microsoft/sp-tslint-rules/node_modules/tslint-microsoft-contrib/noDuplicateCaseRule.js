"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var SyntaxKind_1 = require('./utils/SyntaxKind');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoDuplicateCaseRuleWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'no-duplicate-case',
        type: 'maintainability',
        description: 'Do not use duplicate case labels in switch statements.',
        options: null,
        issueClass: 'Non-SDL',
        issueType: 'Error',
        severity: 'Critical',
        level: 'Opportunity for Excellence',
        group: 'Correctness',
        commonWeaknessEnumeration: '398, 710'
    };
    Rule.FAILURE_STRING = 'Duplicate case found in switch statement: ';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoDuplicateCaseRuleWalker = (function (_super) {
    __extends(NoDuplicateCaseRuleWalker, _super);
    function NoDuplicateCaseRuleWalker() {
        _super.apply(this, arguments);
    }
    NoDuplicateCaseRuleWalker.prototype.visitSwitchStatement = function (node) {
        var _this = this;
        var seenLabels = [];
        node.caseBlock.clauses.forEach(function (clauseOrDefault) {
            if (clauseOrDefault.kind === SyntaxKind_1.SyntaxKind.current().CaseClause) {
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