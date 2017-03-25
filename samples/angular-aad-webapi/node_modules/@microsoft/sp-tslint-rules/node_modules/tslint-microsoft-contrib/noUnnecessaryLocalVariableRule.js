"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var FAILURE_STRING = 'Unnecessary local variable: ';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new UnnecessaryLocalVariableRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-unnecessary-local-variable',
    type: 'maintainability',
    description: 'Do not declare a variable only to return it from the function on the next line.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Clarity',
    commonWeaknessEnumeration: '563, 710'
};
exports.Rule = Rule;
var UnnecessaryLocalVariableRuleWalker = (function (_super) {
    __extends(UnnecessaryLocalVariableRuleWalker, _super);
    function UnnecessaryLocalVariableRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    UnnecessaryLocalVariableRuleWalker.prototype.visitBlock = function (node) {
        this.validateStatementArray(node.statements);
        _super.prototype.visitBlock.call(this, node);
    };
    UnnecessaryLocalVariableRuleWalker.prototype.visitSourceFile = function (node) {
        this.validateStatementArray(node.statements);
        _super.prototype.visitSourceFile.call(this, node);
    };
    UnnecessaryLocalVariableRuleWalker.prototype.visitCaseClause = function (node) {
        this.validateStatementArray(node.statements);
        _super.prototype.visitCaseClause.call(this, node);
    };
    UnnecessaryLocalVariableRuleWalker.prototype.visitDefaultClause = function (node) {
        this.validateStatementArray(node.statements);
        _super.prototype.visitDefaultClause.call(this, node);
    };
    UnnecessaryLocalVariableRuleWalker.prototype.visitModuleDeclaration = function (node) {
        if (node.body != null && node.body.kind === ts.SyntaxKind.ModuleBlock) {
            this.validateStatementArray(node.body.statements);
        }
        _super.prototype.visitModuleDeclaration.call(this, node);
    };
    UnnecessaryLocalVariableRuleWalker.prototype.validateStatementArray = function (statements) {
        if (statements == null || statements.length < 2) {
            return;
        }
        var lastStatement = statements[statements.length - 1];
        var nextToLastStatement = statements[statements.length - 2];
        var returnedVariableName = this.tryToGetReturnedVariableName(lastStatement);
        var declaredVariableName = this.tryToGetDeclaredVariableName(nextToLastStatement);
        if (returnedVariableName != null && declaredVariableName != null) {
            if (returnedVariableName === declaredVariableName) {
                this.addFailure(this.createFailure(nextToLastStatement.getStart(), nextToLastStatement.getWidth(), FAILURE_STRING + returnedVariableName));
            }
        }
    };
    UnnecessaryLocalVariableRuleWalker.prototype.tryToGetDeclaredVariableName = function (statement) {
        if (statement != null && statement.kind === ts.SyntaxKind.VariableStatement) {
            var variableStatement = statement;
            if (variableStatement.declarationList.declarations.length === 1) {
                var declaration = variableStatement.declarationList.declarations[0];
                if (declaration.name != null && declaration.name.kind === ts.SyntaxKind.Identifier) {
                    return declaration.name.text;
                }
            }
        }
        return null;
    };
    UnnecessaryLocalVariableRuleWalker.prototype.tryToGetReturnedVariableName = function (statement) {
        if (statement != null && statement.kind === ts.SyntaxKind.ReturnStatement) {
            var returnStatement = statement;
            if (returnStatement.expression != null && returnStatement.expression.kind === ts.SyntaxKind.Identifier) {
                return returnStatement.expression.text;
            }
        }
        return null;
    };
    return UnnecessaryLocalVariableRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noUnnecessaryLocalVariableRule.js.map