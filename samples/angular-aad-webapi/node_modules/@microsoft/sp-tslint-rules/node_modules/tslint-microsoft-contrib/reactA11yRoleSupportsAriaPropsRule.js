"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var getImplicitRole_1 = require("./utils/getImplicitRole");
var JsxAttribute_1 = require("./utils/JsxAttribute");
var ROLE_SCHEMA = require('./utils/attributes/roleSchema.json');
var ARIA_ATTRIBUTES = require('./utils/attributes/ariaSchema.json');
var ROLES = ROLE_SCHEMA.roles;
var ROLE_STRING = 'role';
function getFailureStringForNotImplicitRole(roleNamesInElement, invalidPropNames) {
    return "Attribute(s) " + invalidPropNames.join(', ') + " are not supported by role(s) " + roleNamesInElement.join(', ') + ". You are using incorrect role or incorrect aria-* attribute";
}
exports.getFailureStringForNotImplicitRole = getFailureStringForNotImplicitRole;
function getFailureStringForImplicitRole(tagName, roleName, invalidPropNames) {
    return "Attribute(s) " + invalidPropNames.join(', ') + " not supported by role " + roleName + " which is implicitly set by the HTML tag " + tagName + ".";
}
exports.getFailureStringForImplicitRole = getFailureStringForImplicitRole;
function getFailureStringForNoRole(tagName, invalidPropNames) {
    return "Attribute(s) " + invalidPropNames + " are not supported by no corresponding role. There is no corresponding role for the HTML tag " + tagName + ". A reference about no corresponding role: https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role.";
}
exports.getFailureStringForNoRole = getFailureStringForNoRole;
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return sourceFile.languageVariant === ts.LanguageVariant.JSX
            ? this.applyWithWalker(new A11yRoleSupportsAriaPropsWalker(sourceFile, this.getOptions()))
            : [];
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'react-a11y-role-supports-aria-props',
    type: 'maintainability',
    description: 'Enforce that elements with explicit or implicit roles defined contain ' +
        'only `aria-*` properties supported by that `role`.',
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
var A11yRoleSupportsAriaPropsWalker = (function (_super) {
    __extends(A11yRoleSupportsAriaPropsWalker, _super);
    function A11yRoleSupportsAriaPropsWalker() {
        return _super.apply(this, arguments) || this;
    }
    A11yRoleSupportsAriaPropsWalker.prototype.visitJsxElement = function (node) {
        this.checkJsxElement(node.openingElement);
        _super.prototype.visitJsxElement.call(this, node);
    };
    A11yRoleSupportsAriaPropsWalker.prototype.visitJsxSelfClosingElement = function (node) {
        this.checkJsxElement(node);
        _super.prototype.visitJsxSelfClosingElement.call(this, node);
    };
    A11yRoleSupportsAriaPropsWalker.prototype.checkJsxElement = function (node) {
        var attributesInElement = JsxAttribute_1.getJsxAttributesFromJsxElement(node);
        var roleProp = attributesInElement[ROLE_STRING];
        var roleValue;
        if (node.tagName.getText().match(/^[A-Z].*/)) {
            return;
        }
        if (roleProp != null) {
            roleValue = JsxAttribute_1.getStringLiteral(roleProp);
            if (!JsxAttribute_1.isEmpty(roleProp) && roleValue == null) {
                return;
            }
        }
        else {
            roleValue = getImplicitRole_1.getImplicitRole(node);
        }
        var isImplicitRole = !roleProp && !!roleValue;
        var normalizedRoles = (roleValue || '').toLowerCase().split(' ')
            .filter(function (role) { return !!ROLES[role]; });
        var supportedAttributeNames = ROLE_SCHEMA.globalSupportedProps;
        normalizedRoles.forEach(function (role) {
            supportedAttributeNames = supportedAttributeNames.concat(ROLES[role].additionalSupportedProps || []);
        });
        var attributeNamesInElement = Object.keys(attributesInElement)
            .filter(function (attributeName) { return !!ARIA_ATTRIBUTES[attributeName.toLowerCase()]; });
        var invalidAttributeNamesInElement = attributeNamesInElement
            .filter(function (attributeName) { return supportedAttributeNames.indexOf(attributeName) === -1; });
        var failureString;
        if (normalizedRoles.length === 0) {
            failureString = getFailureStringForNoRole(node.tagName.getText(), invalidAttributeNamesInElement);
        }
        else if (isImplicitRole) {
            failureString = getFailureStringForImplicitRole(node.tagName.getText(), normalizedRoles[0], invalidAttributeNamesInElement);
        }
        else {
            failureString = getFailureStringForNotImplicitRole(normalizedRoles, invalidAttributeNamesInElement);
        }
        if (invalidAttributeNamesInElement.length > 0) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), failureString));
        }
    };
    return A11yRoleSupportsAriaPropsWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=reactA11yRoleSupportsAriaPropsRule.js.map