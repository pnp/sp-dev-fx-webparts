"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var SyntaxKind_1 = require('./utils/SyntaxKind');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var noDeleteExpression = new NoDeleteExpression(sourceFile, this.getOptions());
        return this.applyWithWalker(noDeleteExpression);
    };
    Rule.metadata = {
        ruleName: 'no-delete-expression',
        type: 'maintainability',
        description: 'Do not delete expressions. Only properties should be deleted',
        options: null,
        issueClass: 'SDL',
        issueType: 'Error',
        severity: 'Critical',
        level: 'Mandatory',
        group: 'Security'
    };
    Rule.FAILURE_STRING = 'Variables should not be deleted: ';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoDeleteExpression = (function (_super) {
    __extends(NoDeleteExpression, _super);
    function NoDeleteExpression() {
        _super.apply(this, arguments);
    }
    NoDeleteExpression.prototype.visitExpressionStatement = function (node) {
        _super.prototype.visitExpressionStatement.call(this, node);
        if (node.expression.kind === SyntaxKind_1.SyntaxKind.current().DeleteExpression) {
            var deletedObject = node.expression.getChildren()[1];
            if (deletedObject != null && deletedObject.kind === SyntaxKind_1.SyntaxKind.current().Identifier) {
                this.addNoDeleteFailure(deletedObject);
            }
        }
    };
    NoDeleteExpression.prototype.addNoDeleteFailure = function (deletedObject) {
        var msg = Rule.FAILURE_STRING + deletedObject.getFullText().trim();
        this.addFailure(this.createFailure(deletedObject.getStart(), deletedObject.getWidth(), msg));
    };
    return NoDeleteExpression;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noDeleteExpressionRule.js.map