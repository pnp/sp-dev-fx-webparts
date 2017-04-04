"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var JsxAttribute_1 = require("./utils/JsxAttribute");
var NO_ALT_ATTRIBUTE_FAILURE_STRING = 'Inputs element with type="image" must have alt attribute.';
var EMPTY_ALT_ATTRIBUTE_FAILURE_STRING = 'Inputs element with type="image" must have non-empty alt attribute.';
var TYPE_STRING = 'type';
var ALT_STRING = 'alt';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return sourceFile.languageVariant === ts.LanguageVariant.JSX
            ? this.applyWithWalker(new ReactA11yImageButtonHasAltWalker(sourceFile, this.getOptions()))
            : [];
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'react-a11y-image-button-has-alt',
    type: 'maintainability',
    description: 'Enforce that inputs element with type="image" must have alt attribute.',
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
var ReactA11yImageButtonHasAltWalker = (function (_super) {
    __extends(ReactA11yImageButtonHasAltWalker, _super);
    function ReactA11yImageButtonHasAltWalker() {
        return _super.apply(this, arguments) || this;
    }
    ReactA11yImageButtonHasAltWalker.prototype.visitJsxElement = function (node) {
        this.validateOpeningElement(node.openingElement);
        _super.prototype.visitJsxElement.call(this, node);
    };
    ReactA11yImageButtonHasAltWalker.prototype.visitJsxSelfClosingElement = function (node) {
        this.validateOpeningElement(node);
        _super.prototype.visitJsxSelfClosingElement.call(this, node);
    };
    ReactA11yImageButtonHasAltWalker.prototype.validateOpeningElement = function (node) {
        var tagName = node.tagName.getText();
        if (tagName !== 'input') {
            return;
        }
        var attributes = JsxAttribute_1.getJsxAttributesFromJsxElement(node);
        var typeAttribute = attributes[TYPE_STRING];
        if (!typeAttribute || JsxAttribute_1.getStringLiteral(typeAttribute).toLowerCase() !== 'image') {
            return;
        }
        var altAttribute = attributes[ALT_STRING];
        if (!altAttribute) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), NO_ALT_ATTRIBUTE_FAILURE_STRING));
        }
        else if (JsxAttribute_1.isEmpty(altAttribute) || !JsxAttribute_1.getStringLiteral(altAttribute)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), EMPTY_ALT_ATTRIBUTE_FAILURE_STRING));
        }
    };
    return ReactA11yImageButtonHasAltWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=reactA11yImageButtonHasAltRule.js.map