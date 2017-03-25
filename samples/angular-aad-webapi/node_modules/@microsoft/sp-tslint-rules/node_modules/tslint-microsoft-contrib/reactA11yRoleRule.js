"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var JsxAttribute_1 = require("./utils/JsxAttribute");
var ROLE_SCHEMA = require('./utils/attributes/roleSchema.json');
var ROLES = ROLE_SCHEMA.roles;
var VALID_ROLES = Object.keys(ROLES).filter(function (role) { return ROLES[role].isAbstract === false; });
function getFailureStringUndefinedRole() {
    return '\'role\' attribute empty. Either select a role from https://www.w3.org/TR/wai-aria/roles#role_definitions, ' +
        'or simply remove this attribute';
}
exports.getFailureStringUndefinedRole = getFailureStringUndefinedRole;
function getFailureStringInvalidRole(invalidRoleName) {
    return "Invalid role attribute value '" + invalidRoleName + "', elements with ARIA roles must use a valid, non-abstract ARIA role. A reference to role definitions can be found at https://www.w3.org/TR/wai-aria/roles#role_definitions.";
}
exports.getFailureStringInvalidRole = getFailureStringInvalidRole;
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return sourceFile.languageVariant === ts.LanguageVariant.JSX
            ? this.applyWithWalker(new A11yRoleRuleWalker(sourceFile, this.getOptions()))
            : [];
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'react-a11y-role',
    type: 'maintainability',
    description: 'Elements with aria roles must use a **valid**, **non-abstract** aria role.',
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
var A11yRoleRuleWalker = (function (_super) {
    __extends(A11yRoleRuleWalker, _super);
    function A11yRoleRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    A11yRoleRuleWalker.prototype.visitJsxAttribute = function (node) {
        var name = JsxAttribute_1.getPropName(node);
        if (!name || name.toLowerCase() !== 'role') {
            return;
        }
        var roleValue = JsxAttribute_1.getStringLiteral(node);
        if (roleValue) {
            var normalizedValues = roleValue.toLowerCase().split(' ');
            if (normalizedValues.some(function (value) { return value && VALID_ROLES.indexOf(value) === -1; })) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), getFailureStringInvalidRole(roleValue)));
            }
        }
        else if (roleValue === '' || JsxAttribute_1.isEmpty(node)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), getFailureStringUndefinedRole()));
        }
        _super.prototype.visitJsxAttribute.call(this, node);
    };
    return A11yRoleRuleWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=reactA11yRoleRule.js.map