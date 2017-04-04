"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var Utils_1 = require("./utils/Utils");
var FAILURE_STRING = 'Possible timing attack detected. Direct comparison found: ';
var SENSITIVE_VAR_NAME = /^(password|secret|api|apiKey|token|auth|pass|hash)$/im;
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new PossibleTimingAttackRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'possible-timing-attack',
    type: 'functionality',
    description: 'Avoid timing attacks by not making direct comaprisons to sensitive data',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Moderate',
    level: 'Opportunity for Excellence',
    group: 'Security',
    commonWeaknessEnumeration: '710,749'
};
exports.Rule = Rule;
var PossibleTimingAttackRuleWalker = (function (_super) {
    __extends(PossibleTimingAttackRuleWalker, _super);
    function PossibleTimingAttackRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    PossibleTimingAttackRuleWalker.prototype.visitBinaryExpression = function (node) {
        if (node.operatorToken.kind === ts.SyntaxKind.EqualsEqualsToken
            || node.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken
            || node.operatorToken.kind === ts.SyntaxKind.ExclamationEqualsToken
            || node.operatorToken.kind === ts.SyntaxKind.ExclamationEqualsEqualsToken) {
            if ((SENSITIVE_VAR_NAME.test(node.left.getText()) || SENSITIVE_VAR_NAME.test(node.right.getText()))
                && node.left.getText() !== 'null' && node.right.getText() !== 'null'
                && node.left.getText() !== 'undefined' && node.right.getText() !== 'undefined') {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STRING + Utils_1.Utils.trimTo(node.getText(), 20)));
            }
            else {
                _super.prototype.visitBinaryExpression.call(this, node);
            }
        }
        else {
            _super.prototype.visitBinaryExpression.call(this, node);
        }
    };
    return PossibleTimingAttackRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=possibleTimingAttackRule.js.map