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
var getImplicitRole_1 = require("./utils/getImplicitRole");
var JsxAttribute_1 = require("./utils/JsxAttribute");
var ROLE_STRING = 'role';
exports.NO_HASH_FAILURE_STRING = 'Do not use # as anchor href.';
exports.LINK_TEXT_TOO_SHORT_FAILURE_STRING = 'Link text or the alt text of image in link should be at least 4 characters long. ' +
    'If you are not using <a> element as anchor, please specify explicit role, e.g. role=\'button\'';
exports.UNIQUE_ALT_FAILURE_STRING = 'Links with images and text content, the alt attribute should be unique to the text content or empty.';
exports.SAME_HREF_SAME_TEXT_FAILURE_STRING = 'Links with the same HREF should have the same link text.';
exports.DIFFERENT_HREF_DIFFERENT_TEXT_FAILURE_STRING = 'Links that point to different HREFs should have different link text.';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        if (sourceFile.languageVariant === ts.LanguageVariant.JSX) {
            var rule = new ReactA11yAnchorsRuleWalker(sourceFile, this.getOptions());
            this.applyWithWalker(rule);
            rule.validateAllAnchors();
            return rule.getFailures();
        }
        return [];
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'react-a11y-anchors',
    type: 'functionality',
    description: 'For accessibility of your website, anchor elements must have a href different from # and a text longer than 4.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Accessibility'
};
exports.Rule = Rule;
var ReactA11yAnchorsRuleWalker = (function (_super) {
    __extends(ReactA11yAnchorsRuleWalker, _super);
    function ReactA11yAnchorsRuleWalker() {
        var _this = _super.apply(this, arguments) || this;
        _this.anchorInfoList = [];
        return _this;
    }
    ReactA11yAnchorsRuleWalker.prototype.validateAllAnchors = function () {
        var _this = this;
        var sameHrefDifferentTexts = [];
        var differentHrefSameText = [];
        var _loop_1 = function () {
            var current = this_1.anchorInfoList.shift();
            this_1.anchorInfoList.forEach(function (anchorInfo) {
                if (current.href &&
                    current.href === anchorInfo.href &&
                    (current.text !== anchorInfo.text || current.altText !== anchorInfo.altText) &&
                    !Utils_1.Utils.contains(sameHrefDifferentTexts, anchorInfo)) {
                    sameHrefDifferentTexts.push(anchorInfo);
                    _this.addFailure(_this.createFailure(anchorInfo.start, anchorInfo.width, exports.SAME_HREF_SAME_TEXT_FAILURE_STRING + _this.firstPosition(current)));
                }
                if (current.href !== anchorInfo.href &&
                    current.text === anchorInfo.text &&
                    current.altText === anchorInfo.altText &&
                    !Utils_1.Utils.contains(differentHrefSameText, anchorInfo)) {
                    differentHrefSameText.push(anchorInfo);
                    _this.addFailure(_this.createFailure(anchorInfo.start, anchorInfo.width, exports.DIFFERENT_HREF_DIFFERENT_TEXT_FAILURE_STRING + _this.firstPosition(current)));
                }
            });
        };
        var this_1 = this;
        while (this.anchorInfoList.length > 0) {
            _loop_1();
        }
    };
    ReactA11yAnchorsRuleWalker.prototype.firstPosition = function (anchorInfo) {
        var startPosition = this.createFailure(anchorInfo.start, anchorInfo.width, '').getStartPosition().getLineAndCharacter();
        var character = startPosition.character + 1;
        var line = startPosition.line + 1;
        return " First link at character: " + character + " line: " + line;
    };
    ReactA11yAnchorsRuleWalker.prototype.visitJsxSelfClosingElement = function (node) {
        this.validateAnchor(node, node);
        _super.prototype.visitJsxSelfClosingElement.call(this, node);
    };
    ReactA11yAnchorsRuleWalker.prototype.visitJsxElement = function (node) {
        this.validateAnchor(node, node.openingElement);
        _super.prototype.visitJsxElement.call(this, node);
    };
    ReactA11yAnchorsRuleWalker.prototype.validateAnchor = function (parent, openingElement) {
        if (openingElement.tagName.getText() === 'a') {
            var anchorInfo = {
                href: this.getAttribute(openingElement, 'href'),
                text: this.anchorText(parent),
                altText: this.imageAlt(parent),
                start: parent.getStart(),
                width: parent.getWidth()
            };
            if (anchorInfo.href === '#') {
                this.addFailure(this.createFailure(anchorInfo.start, anchorInfo.width, exports.NO_HASH_FAILURE_STRING));
            }
            if (anchorInfo.altText && anchorInfo.altText === anchorInfo.text) {
                this.addFailure(this.createFailure(anchorInfo.start, anchorInfo.width, exports.UNIQUE_ALT_FAILURE_STRING));
            }
            var anchorInfoTextLength = anchorInfo.text ? anchorInfo.text.length : 0;
            var anchorImageAltTextLength = anchorInfo.altText ? anchorInfo.altText.length : 0;
            if (this.anchorRole(openingElement) === 'link' &&
                anchorInfoTextLength < 4 &&
                anchorImageAltTextLength < 4) {
                this.addFailure(this.createFailure(anchorInfo.start, anchorInfo.width, exports.LINK_TEXT_TOO_SHORT_FAILURE_STRING));
            }
            this.anchorInfoList.push(anchorInfo);
        }
    };
    ReactA11yAnchorsRuleWalker.prototype.getAttribute = function (openingElement, attributeName) {
        var attributes = JsxAttribute_1.getJsxAttributesFromJsxElement(openingElement);
        var attribute = attributes[attributeName];
        return attribute ? JsxAttribute_1.getStringLiteral(attribute) : '';
    };
    ReactA11yAnchorsRuleWalker.prototype.anchorText = function (root) {
        var _this = this;
        var title = '';
        if (root.kind === ts.SyntaxKind.JsxElement) {
            var jsxElement = root;
            jsxElement.children.forEach(function (child) {
                title += _this.anchorText(child);
            });
        }
        else if (root.kind === ts.SyntaxKind.JsxText) {
            var jsxText = root;
            title += jsxText.getText();
        }
        else if (root.kind === ts.SyntaxKind.StringLiteral) {
            var literal = root;
            title += literal.text;
        }
        else if (root.kind === ts.SyntaxKind.JsxExpression) {
            var expression = root;
            title += this.anchorText(expression.expression);
        }
        else if (root.kind !== ts.SyntaxKind.JsxSelfClosingElement) {
            title += '<unknown>';
        }
        return title;
    };
    ReactA11yAnchorsRuleWalker.prototype.anchorRole = function (root) {
        var attributesInElement = JsxAttribute_1.getJsxAttributesFromJsxElement(root);
        var roleProp = attributesInElement[ROLE_STRING];
        return roleProp ? JsxAttribute_1.getStringLiteral(roleProp) : getImplicitRole_1.getImplicitRole(root);
    };
    ReactA11yAnchorsRuleWalker.prototype.imageAltAttribute = function (openingElement) {
        if (openingElement.tagName.getText() === 'img') {
            var altAttribute = this.getAttribute(openingElement, 'alt');
            return altAttribute === undefined ? '<unknown>' : altAttribute;
        }
        return '';
    };
    ReactA11yAnchorsRuleWalker.prototype.imageAlt = function (root) {
        var _this = this;
        var altText = '';
        if (root.kind === ts.SyntaxKind.JsxElement) {
            var jsxElement = root;
            altText += this.imageAltAttribute(jsxElement.openingElement);
            jsxElement.children.forEach(function (child) {
                altText += _this.imageAlt(child);
            });
        }
        if (root.kind === ts.SyntaxKind.JsxSelfClosingElement) {
            var jsxSelfClosingElement = root;
            altText += this.imageAltAttribute(jsxSelfClosingElement);
        }
        return altText;
    };
    return ReactA11yAnchorsRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
var AnchorInfo = (function () {
    function AnchorInfo() {
        this.href = '';
        this.text = '';
        this.altText = '';
        this.start = 0;
        this.width = 0;
    }
    return AnchorInfo;
}());
//# sourceMappingURL=reactA11yAnchorsRule.js.map