"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var JsxAttribute_1 = require("./utils/JsxAttribute");
var DOM_SCHEMA = require('./utils/attributes/domSchema.json');
var ARIA_SCHEMA = require('./utils/attributes/ariaSchema.json');
function getFailureString(tagName, ariaAttributeNames) {
    return "This element " + tagName + " does not support ARIA roles, states and properties. "
        + ("Try removing attribute(s): " + ariaAttributeNames.join(', ') + ".");
}
exports.getFailureString = getFailureString;
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return sourceFile.languageVariant === ts.LanguageVariant.JSX
            ? this.applyWithWalker(new ReactA11yAriaUnsupportedElementsWalker(sourceFile, this.getOptions()))
            : [];
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'react-a11y-aria-unsupported-elements',
    type: 'maintainability',
    description: 'Enforce that elements that do not support ARIA roles, states, and properties do not have those attributes.',
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
var ReactA11yAriaUnsupportedElementsWalker = (function (_super) {
    __extends(ReactA11yAriaUnsupportedElementsWalker, _super);
    function ReactA11yAriaUnsupportedElementsWalker() {
        return _super.apply(this, arguments) || this;
    }
    ReactA11yAriaUnsupportedElementsWalker.prototype.visitJsxElement = function (node) {
        this.validateOpeningElement(node.openingElement);
        _super.prototype.visitJsxElement.call(this, node);
    };
    ReactA11yAriaUnsupportedElementsWalker.prototype.visitJsxSelfClosingElement = function (node) {
        this.validateOpeningElement(node);
        _super.prototype.visitJsxSelfClosingElement.call(this, node);
    };
    ReactA11yAriaUnsupportedElementsWalker.prototype.validateOpeningElement = function (node) {
        var tagName = node.tagName.getText();
        if (!DOM_SCHEMA[tagName]) {
            return;
        }
        var supportAria = DOM_SCHEMA[tagName].supportAria != null
            ? DOM_SCHEMA[tagName].supportAria
            : false;
        if (supportAria) {
            return;
        }
        var checkAttributeNames = Object.keys(ARIA_SCHEMA).concat('role');
        var attributes = JsxAttribute_1.getJsxAttributesFromJsxElement(node);
        var invalidAttributeNames = checkAttributeNames.filter(function (attributeName) { return !!attributes[attributeName]; });
        if (invalidAttributeNames.length > 0) {
            var message = getFailureString(tagName, invalidAttributeNames);
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
        }
    };
    return ReactA11yAriaUnsupportedElementsWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=reactA11yAriaUnsupportedElementsRule.js.map