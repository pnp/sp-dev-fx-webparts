"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var AstUtils_1 = require("./utils/AstUtils");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoEvalScriptWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-exec-script',
    type: 'maintainability',
    description: 'Do not use the execScript functions',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Mandatory',
    group: 'Security',
    commonWeaknessEnumeration: '95, 676'
};
Rule.FAILURE_STRING = 'forbidden execScript: ';
exports.Rule = Rule;
var NoEvalScriptWalker = (function (_super) {
    __extends(NoEvalScriptWalker, _super);
    function NoEvalScriptWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoEvalScriptWalker.prototype.visitCallExpression = function (node) {
        this.validateExpression(node);
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoEvalScriptWalker.prototype.validateExpression = function (node) {
        var expression = node.expression;
        var functionName = AstUtils_1.AstUtils.getFunctionName(node);
        if (functionName === 'execScript') {
            var msg = Rule.FAILURE_STRING + expression.getFullText().trim();
            this.addFailure(this.createFailure(expression.getStart(), expression.getWidth(), msg));
        }
    };
    return NoEvalScriptWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noExecScriptRule.js.map