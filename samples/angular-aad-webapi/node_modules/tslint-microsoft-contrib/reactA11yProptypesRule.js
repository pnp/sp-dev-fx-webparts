"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var AstUtils_1 = require("./utils/AstUtils");
var JsxAttribute_1 = require("./utils/JsxAttribute");
var TypeGuard_1 = require("./utils/TypeGuard");
var aria = require('./utils/attributes/ariaSchema.json');
function getFailureString(propName, expectedType, permittedValues) {
    switch (expectedType) {
        case 'tristate':
            return "The value for " + propName + " must be a boolean or the string 'mixed'.";
        case 'token':
            return "The value for " + propName + " must be a single token from the following: " + permittedValues + ".";
        case 'tokenlist':
            return "The value for " + propName + " must be a list of one or more tokens from the following: " + permittedValues + ".";
        case 'boolean':
        case 'string':
        case 'integer':
        case 'number':
        default:
            return "The value for " + propName + " must be a " + expectedType + ".";
    }
}
exports.getFailureString = getFailureString;
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return sourceFile.languageVariant === ts.LanguageVariant.JSX
            ? this.applyWithWalker(new ReactA11yProptypesWalker(sourceFile, this.getOptions()))
            : [];
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'react-a11y-proptypes',
    type: 'maintainability',
    description: 'Enforce ARIA state and property values are valid.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Important',
    level: 'Opportunity for Excellence',
    group: 'Accessibility'
};
exports.Rule = Rule;
var ReactA11yProptypesWalker = (function (_super) {
    __extends(ReactA11yProptypesWalker, _super);
    function ReactA11yProptypesWalker() {
        return _super.apply(this, arguments) || this;
    }
    ReactA11yProptypesWalker.prototype.visitJsxAttribute = function (node) {
        var propName = JsxAttribute_1.getPropName(node).toLowerCase();
        if (!aria[propName]) {
            return;
        }
        var allowUndefined = aria[propName].allowUndefined != null
            ? aria[propName].allowUndefined
            : false;
        var expectedType = aria[propName].type;
        var permittedValues = aria[propName].values;
        var propValue = JsxAttribute_1.getStringLiteral(node) || String(JsxAttribute_1.getBooleanLiteral(node));
        if (this.isUndefined(node.initializer)) {
            if (!allowUndefined) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), getFailureString(propName, expectedType, permittedValues)));
            }
            return;
        }
        else if (this.isComplexType(node.initializer)) {
            return;
        }
        if (!this.validityCheck(node.initializer, propValue, expectedType, permittedValues)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), getFailureString(propName, expectedType, permittedValues)));
        }
    };
    ReactA11yProptypesWalker.prototype.validityCheck = function (propValueExpression, propValue, expectedType, permittedValues) {
        switch (expectedType) {
            case 'boolean': return this.isBoolean(propValueExpression);
            case 'tristate': return this.isBoolean(propValueExpression) || this.isMixed(propValueExpression);
            case 'integer': return this.isInteger(propValueExpression);
            case 'number': return this.isNumber(propValueExpression);
            case 'string': return this.isString(propValueExpression);
            case 'token':
                return (this.isString(propValueExpression) || this.isBoolean(propValueExpression)) &&
                    permittedValues.indexOf(propValue.toLowerCase()) > -1;
            case 'tokenlist':
                return (this.isString(propValueExpression) || this.isBoolean(propValueExpression)) &&
                    propValue.split(' ').every(function (token) { return permittedValues.indexOf(token.toLowerCase()) > -1; });
            default:
                return false;
        }
    };
    ReactA11yProptypesWalker.prototype.isUndefined = function (node) {
        if (!node) {
            return true;
        }
        else if (TypeGuard_1.isJsxExpression(node)) {
            var expression = node.expression;
            if (!expression) {
                return true;
            }
            else if (AstUtils_1.AstUtils.isUndefined(expression)) {
                return true;
            }
            else if (TypeGuard_1.isNullKeyword(expression)) {
                return true;
            }
        }
        return false;
    };
    ReactA11yProptypesWalker.prototype.isComplexType = function (node) {
        return !this.isUndefined(node) && TypeGuard_1.isJsxExpression(node) && !AstUtils_1.AstUtils.isConstant(node.expression);
    };
    ReactA11yProptypesWalker.prototype.isBoolean = function (node) {
        if (TypeGuard_1.isStringLiteral(node)) {
            var propValue = node.text.toLowerCase();
            return propValue === 'true' || propValue === 'false';
        }
        else if (TypeGuard_1.isJsxExpression(node)) {
            var expression = node.expression;
            if (TypeGuard_1.isStringLiteral(expression)) {
                var propValue = expression.text.toLowerCase();
                return propValue === 'true' || propValue === 'false';
            }
            else {
                return TypeGuard_1.isFalseKeyword(expression) || TypeGuard_1.isTrueKeyword(expression);
            }
        }
        return false;
    };
    ReactA11yProptypesWalker.prototype.isMixed = function (node) {
        if (TypeGuard_1.isStringLiteral(node)) {
            return node.text.toLowerCase() === 'mixed';
        }
        else if (TypeGuard_1.isJsxExpression(node)) {
            var expression = node.expression;
            return TypeGuard_1.isStringLiteral(expression) && expression.text.toLowerCase() === 'mixed';
        }
        return false;
    };
    ReactA11yProptypesWalker.prototype.isNumber = function (node) {
        if (TypeGuard_1.isStringLiteral(node)) {
            return !isNaN(Number(node.text));
        }
        else if (TypeGuard_1.isJsxExpression(node)) {
            var expression = node.expression;
            if (TypeGuard_1.isStringLiteral(expression)) {
                return !isNaN(Number(expression.text));
            }
            else {
                return TypeGuard_1.isNumericLiteral(expression);
            }
        }
        return false;
    };
    ReactA11yProptypesWalker.prototype.isInteger = function (node) {
        if (TypeGuard_1.isStringLiteral(node)) {
            var value = Number(node.text);
            return !isNaN(value) && Math.round(value) === value;
        }
        else if (TypeGuard_1.isJsxExpression(node)) {
            var expression = node.expression;
            if (TypeGuard_1.isStringLiteral(expression)) {
                var value = Number(expression.text);
                return !isNaN(value) && Math.round(value) === value;
            }
            else if (TypeGuard_1.isNumericLiteral(expression)) {
                var value = Number(expression.text);
                return Math.round(value) === value;
            }
            return false;
        }
        return false;
    };
    ReactA11yProptypesWalker.prototype.isString = function (node) {
        return TypeGuard_1.isStringLiteral(node) || (TypeGuard_1.isJsxExpression(node) && TypeGuard_1.isStringLiteral(node.expression));
    };
    return ReactA11yProptypesWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=reactA11yProptypesRule.js.map