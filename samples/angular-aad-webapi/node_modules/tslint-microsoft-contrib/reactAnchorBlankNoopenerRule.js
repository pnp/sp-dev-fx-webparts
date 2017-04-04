"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var Utils_1 = require("./utils/Utils");
var JsxAttribute_1 = require("./utils/JsxAttribute");
var FAILURE_STRING = 'Anchor tags with target="_blank" should also include rel="noopener noreferrer"';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        if (sourceFile.languageVariant === ts.LanguageVariant.JSX) {
            return this.applyWithWalker(new ReactAnchorBlankNoopenerRuleWalker(sourceFile, this.getOptions()));
        }
        else {
            return [];
        }
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'react-anchor-blank-noopener',
    type: 'functionality',
    description: 'Anchor tags with target="_blank" should also include rel="noopener noreferrer"',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Mandatory',
    group: 'Security',
    commonWeaknessEnumeration: '242,676'
};
exports.Rule = Rule;
var ReactAnchorBlankNoopenerRuleWalker = (function (_super) {
    __extends(ReactAnchorBlankNoopenerRuleWalker, _super);
    function ReactAnchorBlankNoopenerRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    ReactAnchorBlankNoopenerRuleWalker.prototype.visitJsxElement = function (node) {
        var openingElement = node.openingElement;
        this.validateOpeningElement(openingElement);
        _super.prototype.visitJsxElement.call(this, node);
    };
    ReactAnchorBlankNoopenerRuleWalker.prototype.visitJsxSelfClosingElement = function (node) {
        this.validateOpeningElement(node);
        _super.prototype.visitJsxSelfClosingElement.call(this, node);
    };
    ReactAnchorBlankNoopenerRuleWalker.prototype.validateOpeningElement = function (openingElement) {
        if (openingElement.tagName.getText() === 'a') {
            var allAttributes = JsxAttribute_1.getJsxAttributesFromJsxElement(openingElement);
            var target = allAttributes['target'];
            var rel = allAttributes['rel'];
            if (target != null && JsxAttribute_1.getStringLiteral(target) === '_blank' && !isRelAttributeValue(rel)) {
                this.addFailure(this.createFailure(openingElement.getStart(), openingElement.getWidth(), FAILURE_STRING));
            }
        }
    };
    return ReactAnchorBlankNoopenerRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
function isRelAttributeValue(attribute) {
    if (JsxAttribute_1.isEmpty(attribute)) {
        return false;
    }
    if (attribute.initializer.kind === ts.SyntaxKind.JsxExpression) {
        var expression = attribute.initializer;
        if (expression.expression != null && expression.expression.kind !== ts.SyntaxKind.StringLiteral) {
            return true;
        }
    }
    var stringValue = JsxAttribute_1.getStringLiteral(attribute);
    if (stringValue == null || stringValue.length === 0) {
        return false;
    }
    var relValues = stringValue.split(/\s+/);
    return Utils_1.Utils.contains(relValues, 'noreferrer') && Utils_1.Utils.contains(relValues, 'noopener');
}
//# sourceMappingURL=reactAnchorBlankNoopenerRule.js.map