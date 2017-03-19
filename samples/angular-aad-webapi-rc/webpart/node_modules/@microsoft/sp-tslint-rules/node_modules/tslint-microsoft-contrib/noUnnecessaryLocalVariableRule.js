"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var SyntaxKind_1 = require('./utils/SyntaxKind');
var FAILURE_STRING = 'Unnecessary local variable: ';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new UnnecessaryLocalVariableRuleWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'no-unnecessary-local-variable',
        type: 'maintainability',
        description: 'Do not declare a variable only to return it from the function on the next line.',
        options: null,
        issueClass: 'Non-SDL',
        issueType: 'Warning',
        severity: 'Low',
        level: 'Opportunity for Excellence',
        group: 'Clarity',
        commonWeaknessEnumeration: '563, 710'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var UnnecessaryLocalVariableRuleWalker = (function (_super) {
    __extends(UnnecessaryLocalVariableRuleWalker, _super);
    function UnnecessaryLocalVariableRuleWalker() {
        _super.apply(this, arguments);
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
        if (node.body != null && node.body.kind === SyntaxKind_1.SyntaxKind.current().ModuleBlock) {
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
        if (statement != null && statement.kind === SyntaxKind_1.SyntaxKind.current().VariableStatement) {
            var variableStatement = statement;
            if (variableStatement.declarationList.declarations.length === 1) {
                var declaration = variableStatement.declarationList.declarations[0];
                if (declaration.name != null && declaration.name.kind === SyntaxKind_1.SyntaxKind.current().Identifier) {
                    return declaration.name.text;
                }
            }
        }
        return null;
    };
    UnnecessaryLocalVariableRuleWalker.prototype.tryToGetReturnedVariableName = function (statement) {
        if (statement != null && statement.kind === SyntaxKind_1.SyntaxKind.current().ReturnStatement) {
            var returnStatement = statement;
            if (returnStatement.expression != null && returnStatement.expression.kind === SyntaxKind_1.SyntaxKind.current().Identifier) {
                return returnStatement.expression.text;
            }
        }
        return null;
    };
    return UnnecessaryLocalVariableRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noUnnecessaryLocalVariableRule.js.map