"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var AstUtils_1 = require("./utils/AstUtils");
var Utils_1 = require("./utils/Utils");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new PromiseAnalyzer(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'promise-must-complete',
    type: 'maintainability',
    description: 'When a Promise instance is created, then either the reject() or resolve() parameter must be ' +
        'called on it within all code branches in the scope.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Opportunity for Excellence',
    group: 'Correctness'
};
Rule.FAILURE_STRING = 'A Promise was found that appears to not have resolve or reject invoked on all code paths';
exports.Rule = Rule;
var PromiseAnalyzer = (function (_super) {
    __extends(PromiseAnalyzer, _super);
    function PromiseAnalyzer() {
        return _super.apply(this, arguments) || this;
    }
    PromiseAnalyzer.prototype.isPromiseDeclaration = function (node) {
        if (node.expression.kind === ts.SyntaxKind.Identifier
            && node.expression.getText() === 'Promise'
            && node.arguments != null && node.arguments.length > 0) {
            var firstArg = node.arguments[0];
            if (firstArg.kind === ts.SyntaxKind.ArrowFunction || firstArg.kind === ts.SyntaxKind.FunctionExpression) {
                return true;
            }
        }
        return false;
    };
    PromiseAnalyzer.prototype.getCompletionIdentifiers = function (declaration) {
        var result = [];
        if (declaration.parameters == null || declaration.parameters.length === 0) {
            return result;
        }
        var arg1 = declaration.parameters[0];
        var arg2 = declaration.parameters[1];
        if (arg1 != null && arg1.name.kind === ts.SyntaxKind.Identifier) {
            result.push(declaration.parameters[0].name);
        }
        if (arg2 != null && arg2.name.kind === ts.SyntaxKind.Identifier) {
            result.push(declaration.parameters[1].name);
        }
        return result;
    };
    PromiseAnalyzer.prototype.visitNewExpression = function (node) {
        if (this.isPromiseDeclaration(node)) {
            var functionArgument = node.arguments[0];
            var functionBody = functionArgument.body;
            var competionIdentifiers = this.getCompletionIdentifiers(functionArgument);
            this.validatePromiseUsage(node, functionBody, competionIdentifiers);
        }
        _super.prototype.visitNewExpression.call(this, node);
    };
    PromiseAnalyzer.prototype.validatePromiseUsage = function (promiseInstantiation, block, completionIdentifiers) {
        var blockAnalyzer = new PromiseCompletionWalker(this.getSourceFile(), this.getOptions(), completionIdentifiers);
        blockAnalyzer.visitNode(block);
        if (!blockAnalyzer.isAlwaysCompleted()) {
            var failure = this.createFailure(promiseInstantiation.getStart(), promiseInstantiation.getWidth(), Rule.FAILURE_STRING);
            this.addFailure(failure);
        }
    };
    return PromiseAnalyzer;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
var PromiseCompletionWalker = (function (_super) {
    __extends(PromiseCompletionWalker, _super);
    function PromiseCompletionWalker(sourceFile, options, completionIdentifiers) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.wasCompleted = false;
        _this.allBranchesCompleted = true;
        _this.hasBranches = false;
        _this.walkerOptions = options;
        _this.completionIdentifiers = completionIdentifiers;
        return _this;
    }
    PromiseCompletionWalker.prototype.visitNode = function (node) {
        _super.prototype.visitNode.call(this, node);
    };
    PromiseCompletionWalker.prototype.isAlwaysCompleted = function () {
        if (this.wasCompleted) {
            return true;
        }
        if (!this.hasBranches) {
            return false;
        }
        return this.allBranchesCompleted;
    };
    PromiseCompletionWalker.prototype.visitIfStatement = function (node) {
        this.hasBranches = true;
        var ifAnalyzer = new PromiseCompletionWalker(this.getSourceFile(), this.walkerOptions, this.completionIdentifiers);
        var elseAnalyzer = new PromiseCompletionWalker(this.getSourceFile(), this.walkerOptions, this.completionIdentifiers);
        ifAnalyzer.visitNode(node.thenStatement);
        if (!ifAnalyzer.isAlwaysCompleted()) {
            this.allBranchesCompleted = false;
        }
        else if (node.elseStatement != null) {
            elseAnalyzer.visitNode(node.elseStatement);
            if (!elseAnalyzer.isAlwaysCompleted()) {
                this.allBranchesCompleted = false;
            }
        }
    };
    PromiseCompletionWalker.prototype.visitCallExpression = function (node) {
        var _this = this;
        if (node.expression.kind === ts.SyntaxKind.Identifier) {
            if (this.isCompletionIdentifier(node.expression)) {
                this.wasCompleted = true;
                return;
            }
        }
        var referenceEscaped = Utils_1.Utils.exists(node.arguments, function (argument) {
            return _this.isCompletionIdentifier(argument);
        });
        if (referenceEscaped) {
            this.wasCompleted = true;
            return;
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    PromiseCompletionWalker.prototype.visitArrowFunction = function (node) {
        var nonShadowedIdentifiers = this.getNonShadowedCompletionIdentifiers(node);
        var analyzer = new PromiseCompletionWalker(this.getSourceFile(), this.walkerOptions, nonShadowedIdentifiers);
        analyzer.visitNode(node.body);
        if (analyzer.isAlwaysCompleted()) {
            this.wasCompleted = true;
        }
    };
    PromiseCompletionWalker.prototype.visitFunctionExpression = function (node) {
        var nonShadowedIdentifiers = this.getNonShadowedCompletionIdentifiers(node);
        var analyzer = new PromiseCompletionWalker(this.getSourceFile(), this.walkerOptions, nonShadowedIdentifiers);
        analyzer.visitNode(node.body);
        if (analyzer.isAlwaysCompleted()) {
            this.wasCompleted = true;
        }
    };
    PromiseCompletionWalker.prototype.getNonShadowedCompletionIdentifiers = function (declaration) {
        var result = [];
        this.completionIdentifiers.forEach(function (identifier) {
            var isShadowed = Utils_1.Utils.exists(declaration.parameters, function (parameter) {
                return AstUtils_1.AstUtils.isSameIdentifer(identifier, parameter.name);
            });
            if (!isShadowed) {
                result.push(identifier);
            }
        });
        return result;
    };
    PromiseCompletionWalker.prototype.isCompletionIdentifier = function (sourceIdentifier) {
        return Utils_1.Utils.exists(this.completionIdentifiers, function (identifier) {
            return AstUtils_1.AstUtils.isSameIdentifer(sourceIdentifier, identifier);
        });
    };
    return PromiseCompletionWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=promiseMustCompleteRule.js.map