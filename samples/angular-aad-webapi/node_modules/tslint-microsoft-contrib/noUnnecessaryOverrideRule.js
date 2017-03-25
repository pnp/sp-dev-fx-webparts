"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var FAILURE_STRING = 'Unnecessary method override. A method that only calls super can be removed: ';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoUnnecessaryOverrideRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-unnecessary-override',
    type: 'maintainability',
    description: 'Do not write a method that only calls super() on the parent method with the same arguments.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Moderate',
    level: 'Opportunity for Excellence',
    group: 'Correctness',
    commonWeaknessEnumeration: '398, 710'
};
exports.Rule = Rule;
var NoUnnecessaryOverrideRuleWalker = (function (_super) {
    __extends(NoUnnecessaryOverrideRuleWalker, _super);
    function NoUnnecessaryOverrideRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoUnnecessaryOverrideRuleWalker.prototype.visitMethodDeclaration = function (node) {
        if (node.body != null) {
            var statement = this.getSingleStatement(node.body);
            if (statement != null) {
                if (this.isSuperCall(node, statement) && this.isMatchingArgumentList(node, statement)) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STRING + this.getMethodName(node)));
                }
            }
        }
        _super.prototype.visitMethodDeclaration.call(this, node);
    };
    NoUnnecessaryOverrideRuleWalker.prototype.getSingleStatement = function (block) {
        if (block.statements.length === 1) {
            return block.statements[0];
        }
        return null;
    };
    NoUnnecessaryOverrideRuleWalker.prototype.isMatchingArgumentList = function (node, statement) {
        var call = this.getCallExpressionFromStatement(statement);
        if (call == null) {
            return false;
        }
        if (call.arguments.length === 0 && node.parameters.length === 0) {
            return true;
        }
        if (call.arguments.length !== node.parameters.length) {
            return false;
        }
        var allParameters = node.parameters;
        for (var i = 0; i < allParameters.length; i++) {
            var parameter = allParameters[i];
            var argument = call.arguments[i];
            if (argument.kind !== ts.SyntaxKind.Identifier) {
                return false;
            }
            if (parameter.name.kind !== ts.SyntaxKind.Identifier) {
                return false;
            }
            var argumentName = argument.text;
            var parameterName = parameter.name.text;
            if (argumentName !== parameterName) {
                return false;
            }
        }
        return true;
    };
    NoUnnecessaryOverrideRuleWalker.prototype.isSuperCall = function (node, statement) {
        var call = this.getCallExpressionFromStatement(statement);
        if (call == null) {
            return false;
        }
        if (call.expression.kind !== ts.SyntaxKind.PropertyAccessExpression) {
            return false;
        }
        var propAccess = call.expression;
        if (propAccess.expression.kind !== ts.SyntaxKind.SuperKeyword) {
            return false;
        }
        var declaredMethodName = this.getMethodName(node);
        var methodName = propAccess.name.text;
        return methodName === declaredMethodName;
    };
    NoUnnecessaryOverrideRuleWalker.prototype.getCallExpressionFromStatement = function (statement) {
        var expression;
        if (statement.kind === ts.SyntaxKind.ExpressionStatement) {
            expression = statement.expression;
        }
        else if (statement.kind === ts.SyntaxKind.ReturnStatement) {
            expression = statement.expression;
            if (expression == null) {
                return null;
            }
        }
        else {
            return null;
        }
        if (expression.kind !== ts.SyntaxKind.CallExpression) {
            return null;
        }
        var call = expression;
        if (call.expression.kind !== ts.SyntaxKind.PropertyAccessExpression) {
            return null;
        }
        return call;
    };
    NoUnnecessaryOverrideRuleWalker.prototype.getMethodName = function (node) {
        var nameNode = node.name;
        if (nameNode.kind === ts.SyntaxKind.Identifier) {
            return nameNode.text;
        }
        return '<unknown>';
    };
    return NoUnnecessaryOverrideRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noUnnecessaryOverrideRule.js.map