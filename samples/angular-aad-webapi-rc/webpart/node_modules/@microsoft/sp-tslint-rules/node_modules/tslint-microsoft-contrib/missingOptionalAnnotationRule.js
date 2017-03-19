"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new MissingOptionalAnnotationWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'missing-optional-annotation',
        type: 'maintainability',
        description: 'Deprecated - This rule is now enforced by the TypeScript compiler',
        options: null,
        issueClass: 'Ignored',
        issueType: 'Warning',
        severity: 'Low',
        level: 'Opportunity for Excellence',
        group: 'Deprecated',
        recommendation: 'false,  // now supported by TypeScript compiler'
    };
    Rule.FAILURE_STRING = 'Argument following optional argument missing optional annotation: ';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var MissingOptionalAnnotationWalker = (function (_super) {
    __extends(MissingOptionalAnnotationWalker, _super);
    function MissingOptionalAnnotationWalker() {
        _super.apply(this, arguments);
    }
    MissingOptionalAnnotationWalker.prototype.visitMethodDeclaration = function (node) {
        this.validateParameters(node);
        _super.prototype.visitMethodDeclaration.call(this, node);
    };
    MissingOptionalAnnotationWalker.prototype.visitConstructorDeclaration = function (node) {
        this.validateParameters(node);
        _super.prototype.visitConstructorDeclaration.call(this, node);
    };
    MissingOptionalAnnotationWalker.prototype.visitArrowFunction = function (node) {
        this.validateParameters(node);
        _super.prototype.visitArrowFunction.call(this, node);
    };
    MissingOptionalAnnotationWalker.prototype.visitFunctionDeclaration = function (node) {
        this.validateParameters(node);
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    MissingOptionalAnnotationWalker.prototype.visitFunctionExpression = function (node) {
        this.validateParameters(node);
        _super.prototype.visitFunctionExpression.call(this, node);
    };
    MissingOptionalAnnotationWalker.prototype.validateParameters = function (node) {
        var _this = this;
        var optionalParameterFound = false;
        if (node.parameters == null) {
            return;
        }
        node.parameters.forEach(function (parameter) {
            if (parameter.questionToken != null || parameter.initializer != null) {
                optionalParameterFound = true;
            }
            else if (optionalParameterFound && parameter.initializer == null) {
                var msg = Rule.FAILURE_STRING + parameter.getFullText();
                _this.addFailure(_this.createFailure(parameter.name.getStart(), parameter.name.getWidth(), msg));
            }
        });
    };
    return MissingOptionalAnnotationWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=missingOptionalAnnotationRule.js.map