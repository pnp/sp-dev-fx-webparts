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
var FAILURE_UNDEFINED_INIT = 'Unnecessary field initialization. Field explicitly initialized to undefined: ';
var FAILURE_UNDEFINED_DUPE = 'Unnecessary field initialization. Field value already initialized in declaration: ';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new UnnecessaryFieldInitializationRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-unnecessary-field-initialization',
    type: 'maintainability',
    description: 'Do not unnecessarily initialize the fields of a class to values they already have.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Moderate',
    level: 'Opportunity for Excellence',
    group: 'Clarity',
    commonWeaknessEnumeration: '398, 710'
};
exports.Rule = Rule;
var UnnecessaryFieldInitializationRuleWalker = (function (_super) {
    __extends(UnnecessaryFieldInitializationRuleWalker, _super);
    function UnnecessaryFieldInitializationRuleWalker() {
        var _this = _super.apply(this, arguments) || this;
        _this.fieldInitializations = {};
        return _this;
    }
    UnnecessaryFieldInitializationRuleWalker.prototype.visitClassDeclaration = function (node) {
        var _this = this;
        this.fieldInitializations = {};
        node.members.forEach(function (member) {
            if (member.kind === ts.SyntaxKind.PropertyDeclaration) {
                _this.visitPropertyDeclaration(member);
            }
            else if (member.kind === ts.SyntaxKind.Constructor) {
                _this.visitConstructorDeclaration(member);
            }
        });
        this.fieldInitializations = {};
    };
    UnnecessaryFieldInitializationRuleWalker.prototype.visitPropertyDeclaration = function (node) {
        var initializer = node.initializer;
        if (node.name.kind === ts.SyntaxKind.Identifier) {
            var fieldName = 'this.' + node.name.getText();
            if (initializer == null) {
                this.fieldInitializations[fieldName] = undefined;
            }
            else if (AstUtils_1.AstUtils.isConstant(initializer)) {
                this.fieldInitializations[fieldName] = initializer.getText();
            }
        }
        if (AstUtils_1.AstUtils.isUndefined(initializer)) {
            var start = initializer.getStart();
            var width = initializer.getWidth();
            this.addFailure(this.createFailure(start, width, FAILURE_UNDEFINED_INIT + node.name.getText()));
        }
    };
    UnnecessaryFieldInitializationRuleWalker.prototype.visitConstructorDeclaration = function (node) {
        var _this = this;
        if (node.body != null) {
            node.body.statements.forEach(function (statement) {
                if (statement.kind === ts.SyntaxKind.ExpressionStatement) {
                    var expression = statement.expression;
                    if (expression.kind === ts.SyntaxKind.BinaryExpression) {
                        var binaryExpression = expression;
                        var property = binaryExpression.left;
                        var propertyName = property.getText();
                        if (Object.keys(_this.fieldInitializations).indexOf(propertyName) > -1) {
                            if (AstUtils_1.AstUtils.isUndefined(binaryExpression.right)) {
                                if (Object.keys(_this.fieldInitializations).indexOf(propertyName) > -1) {
                                    var fieldInitValue = _this.fieldInitializations[propertyName];
                                    if (fieldInitValue == null) {
                                        var start = property.getStart();
                                        var width = property.getWidth();
                                        _this.addFailure(_this.createFailure(start, width, FAILURE_UNDEFINED_INIT + property.getText()));
                                    }
                                }
                            }
                            else if (AstUtils_1.AstUtils.isConstant(binaryExpression.right)) {
                                var fieldInitValue = _this.fieldInitializations[propertyName];
                                if (fieldInitValue === binaryExpression.right.getText()) {
                                    var start = binaryExpression.getStart();
                                    var width = binaryExpression.getWidth();
                                    var message = FAILURE_UNDEFINED_DUPE + binaryExpression.getText();
                                    _this.addFailure(_this.createFailure(start, width, message));
                                }
                            }
                        }
                    }
                }
            });
        }
    };
    return UnnecessaryFieldInitializationRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noUnnecessaryFieldInitializationRule.js.map