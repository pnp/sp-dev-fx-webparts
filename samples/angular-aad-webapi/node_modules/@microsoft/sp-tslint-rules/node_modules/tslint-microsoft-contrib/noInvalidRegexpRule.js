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
        return this.applyWithWalker(new NoInvalidRegexpRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-invalid-regexp',
    type: 'maintainability',
    description: 'Do not use invalid regular expression strings in the RegExp constructor.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Opportunity for Excellence',
    group: 'Correctness'
};
exports.Rule = Rule;
var NoInvalidRegexpRuleWalker = (function (_super) {
    __extends(NoInvalidRegexpRuleWalker, _super);
    function NoInvalidRegexpRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoInvalidRegexpRuleWalker.prototype.visitNewExpression = function (node) {
        this.validateCall(node);
        _super.prototype.visitNewExpression.call(this, node);
    };
    NoInvalidRegexpRuleWalker.prototype.visitCallExpression = function (node) {
        this.validateCall(node);
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoInvalidRegexpRuleWalker.prototype.validateCall = function (expression) {
        if (expression.expression.getText() === 'RegExp') {
            if (expression.arguments.length > 0) {
                var arg1 = expression.arguments[0];
                if (arg1.kind === ts.SyntaxKind.StringLiteral) {
                    var regexpText = arg1.text;
                    try {
                        new RegExp(regexpText);
                    }
                    catch (e) {
                        this.addFailure(this.createFailure(arg1.getStart(), arg1.getWidth(), e.message));
                    }
                }
            }
        }
    };
    return NoInvalidRegexpRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noInvalidRegexpRule.js.map