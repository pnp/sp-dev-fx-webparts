"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var AstUtils_1 = require('./utils/AstUtils');
var Utils_1 = require('./utils/Utils');
var SyntaxKind_1 = require('./utils/SyntaxKind');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new JQueryDeferredAnalyzer(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'jquery-deferred-must-complete',
        type: 'maintainability',
        description: 'When a JQuery Deferred instance is created, then either reject() or resolve() must be called ' +
            'on it within all code branches in the scope.',
        options: null,
        issueClass: 'Non-SDL',
        issueType: 'Error',
        severity: 'Critical',
        level: 'Opportunity for Excellence',
        group: 'Correctness'
    };
    Rule.FAILURE_STRING = 'A JQuery deferred was found that appears to not have resolve or reject invoked on all code paths: ';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function isPromiseInstantiation(expression) {
    if (expression != null && expression.kind === SyntaxKind_1.SyntaxKind.current().CallExpression) {
        var functionName = AstUtils_1.AstUtils.getFunctionName(expression);
        var functionTarget = AstUtils_1.AstUtils.getFunctionTarget(expression);
        if (functionName === 'Deferred' && AstUtils_1.AstUtils.isJQuery(functionTarget)) {
            return true;
        }
    }
    return false;
}
function isCompletionFunction(functionName) {
    return /^(resolve|reject)$/.test(functionName);
}
var JQueryDeferredAnalyzer = (function (_super) {
    __extends(JQueryDeferredAnalyzer, _super);
    function JQueryDeferredAnalyzer() {
        _super.apply(this, arguments);
    }
    JQueryDeferredAnalyzer.prototype.visitBinaryExpression = function (node) {
        if (node.operatorToken.getText() === '=' && isPromiseInstantiation(node.right)) {
            if (node.left.kind === SyntaxKind_1.SyntaxKind.current().Identifier) {
                if (node.left.text != null) {
                    var name_1 = node.left;
                    this.validateDeferredUsage(node, name_1);
                }
            }
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    JQueryDeferredAnalyzer.prototype.visitVariableDeclaration = function (node) {
        if (isPromiseInstantiation(node.initializer)) {
            if (node.name.text != null) {
                var name_2 = node.name;
                this.validateDeferredUsage(node, name_2);
            }
        }
        _super.prototype.visitVariableDeclaration.call(this, node);
    };
    JQueryDeferredAnalyzer.prototype.validateDeferredUsage = function (rootNode, deferredIdentifier) {
        var parent = AstUtils_1.AstUtils.findParentBlock(rootNode);
        var blockAnalyzer = new DeferredCompletionWalker(this.getSourceFile(), this.getOptions(), deferredIdentifier);
        blockAnalyzer.visitNode(parent);
        if (!blockAnalyzer.isAlwaysCompleted()) {
            var failureString = Rule.FAILURE_STRING + '\'' + rootNode.getText() + '\'';
            var failure = this.createFailure(rootNode.getStart(), rootNode.getWidth(), failureString);
            this.addFailure(failure);
        }
    };
    return JQueryDeferredAnalyzer;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
var DeferredCompletionWalker = (function (_super) {
    __extends(DeferredCompletionWalker, _super);
    function DeferredCompletionWalker(sourceFile, options, deferredIdentifier) {
        _super.call(this, sourceFile, options);
        this.wasCompleted = false;
        this.allBranchesCompleted = true;
        this.hasBranches = false;
        this.walkerOptions = options;
        this.deferredIdentifier = deferredIdentifier;
    }
    DeferredCompletionWalker.prototype.visitNode = function (node) {
        _super.prototype.visitNode.call(this, node);
    };
    DeferredCompletionWalker.prototype.isAlwaysCompleted = function () {
        if (this.wasCompleted) {
            return true;
        }
        if (!this.hasBranches) {
            return false;
        }
        return this.allBranchesCompleted;
    };
    DeferredCompletionWalker.prototype.visitIfStatement = function (node) {
        this.hasBranches = true;
        var ifAnalyzer = new DeferredCompletionWalker(this.getSourceFile(), this.walkerOptions, this.deferredIdentifier);
        var elseAnalyzer = new DeferredCompletionWalker(this.getSourceFile(), this.walkerOptions, this.deferredIdentifier);
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
    DeferredCompletionWalker.prototype.visitCallExpression = function (node) {
        var _this = this;
        if (node.expression.kind === SyntaxKind_1.SyntaxKind.current().PropertyAccessExpression) {
            var prop = node.expression;
            if (AstUtils_1.AstUtils.isSameIdentifer(this.deferredIdentifier, prop.expression)) {
                var functionName = prop.name.getText();
                if (isCompletionFunction(functionName)) {
                    this.wasCompleted = true;
                    return;
                }
            }
        }
        var referenceEscaped = Utils_1.Utils.exists(node.arguments, function (argument) {
            return AstUtils_1.AstUtils.isSameIdentifer(_this.deferredIdentifier, argument);
        });
        if (referenceEscaped) {
            this.wasCompleted = true;
            return;
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    DeferredCompletionWalker.prototype.visitArrowFunction = function (node) {
        var _this = this;
        var isDeferredShadowed = Utils_1.Utils.exists(node.parameters, function (param) {
            return AstUtils_1.AstUtils.isSameIdentifer(_this.deferredIdentifier, param.name);
        });
        if (isDeferredShadowed) {
            this.hasBranches = true;
            this.allBranchesCompleted = false;
            return;
        }
        _super.prototype.visitArrowFunction.call(this, node);
    };
    DeferredCompletionWalker.prototype.visitFunctionExpression = function (node) {
        var _this = this;
        var isDeferredShadowed = Utils_1.Utils.exists(node.parameters, function (param) {
            return AstUtils_1.AstUtils.isSameIdentifer(_this.deferredIdentifier, param.name);
        });
        if (isDeferredShadowed) {
            this.hasBranches = true;
            this.allBranchesCompleted = false;
            return;
        }
        _super.prototype.visitFunctionExpression.call(this, node);
    };
    return DeferredCompletionWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=jqueryDeferredMustCompleteRule.js.map