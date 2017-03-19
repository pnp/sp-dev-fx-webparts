"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var Lint = require('tslint/lib/lint');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var SyntaxKind_1 = require('./utils/SyntaxKind');
var Utils_1 = require('./utils/Utils');
var NO_HASH_FAILURE_STRING = 'Do not use # as anchor href.';
var LINK_TEXT_TOO_SHORT_FAILURE_STRING = 'Link text should be at least 4 characters long.';
var UNIQUE_ALT_FAILURE_STRING = 'Links with images and text content, the alt attribute should be unique to the text content or empty.';
var SAME_HREF_SAME_TEXT_FAILURE_STRING = 'Links with the same HREF should have the same link text.';
var DIFFERENT_HREF_DIFFERENT_TEXT_FAILURE_STRING = 'Links that point to different HREFs should have different link text.';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
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
    Rule.metadata = {
        ruleName: 'react-a11y-anchors',
        type: 'functionality',
        description: 'For accessibility of your website, anchor elements must have a href different from # and a text longer than 4.',
        options: null,
        issueClass: 'Non-SDL',
        issueType: 'Warning',
        severity: 'Low',
        level: 'Opportunity for Excellence',
        group: 'Accessibility'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ReactA11yAnchorsRuleWalker = (function (_super) {
    __extends(ReactA11yAnchorsRuleWalker, _super);
    function ReactA11yAnchorsRuleWalker() {
        _super.apply(this, arguments);
        this.anchorInfoList = [];
    }
    ReactA11yAnchorsRuleWalker.prototype.validateAllAnchors = function () {
        var _this = this;
        var sameHrefDifferentTexts = [];
        var differentHrefSameText = [];
        var _loop_1 = function() {
            var current = this_1.anchorInfoList.shift();
            this_1.anchorInfoList.forEach(function (anchorInfo) {
                if (current.href &&
                    current.href === anchorInfo.href &&
                    current.text !== anchorInfo.text &&
                    !Utils_1.Utils.contains(sameHrefDifferentTexts, anchorInfo)) {
                    sameHrefDifferentTexts.push(anchorInfo);
                    _this.addFailure(_this.createFailure(anchorInfo.start, anchorInfo.width, SAME_HREF_SAME_TEXT_FAILURE_STRING + _this.firstPosition(current)));
                }
                if (current.href !== anchorInfo.href &&
                    current.text === anchorInfo.text &&
                    !Utils_1.Utils.contains(differentHrefSameText, anchorInfo)) {
                    differentHrefSameText.push(anchorInfo);
                    _this.addFailure(_this.createFailure(anchorInfo.start, anchorInfo.width, DIFFERENT_HREF_DIFFERENT_TEXT_FAILURE_STRING + _this.firstPosition(current)));
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
                start: parent.getStart(),
                width: parent.getWidth()
            };
            if (anchorInfo.href === '#') {
                this.addFailure(this.createFailure(anchorInfo.start, anchorInfo.width, NO_HASH_FAILURE_STRING));
            }
            if (!anchorInfo.text || anchorInfo.text.length < 4) {
                this.addFailure(this.createFailure(anchorInfo.start, anchorInfo.width, LINK_TEXT_TOO_SHORT_FAILURE_STRING));
            }
            var imageAltText = this.imageAlt(parent);
            if (imageAltText && imageAltText === anchorInfo.text) {
                this.addFailure(this.createFailure(anchorInfo.start, anchorInfo.width, UNIQUE_ALT_FAILURE_STRING));
            }
            this.anchorInfoList.push(anchorInfo);
        }
    };
    ReactA11yAnchorsRuleWalker.prototype.getAttribute = function (openingElement, attributeName) {
        var attributes = openingElement.attributes;
        var attributeValue;
        attributes.forEach(function (attribute) {
            if (attribute.kind === SyntaxKind_1.SyntaxKind.current().JsxAttribute) {
                var jsxAttribute = attribute;
                if (jsxAttribute.name.getText() === attributeName &&
                    jsxAttribute.initializer &&
                    jsxAttribute.initializer.kind === SyntaxKind_1.SyntaxKind.current().StringLiteral) {
                    var literal = jsxAttribute.initializer;
                    attributeValue = literal.text;
                }
            }
        });
        return attributeValue;
    };
    ReactA11yAnchorsRuleWalker.prototype.anchorText = function (root) {
        var _this = this;
        var title = '';
        if (root.kind === SyntaxKind_1.SyntaxKind.current().JsxElement) {
            var jsxElement = root;
            jsxElement.children.forEach(function (child) {
                title += _this.anchorText(child);
            });
        }
        else if (root.kind === SyntaxKind_1.SyntaxKind.current().JsxText) {
            var jsxText = root;
            title += jsxText.getText();
        }
        else if (root.kind === SyntaxKind_1.SyntaxKind.current().StringLiteral) {
            var literal = root;
            title += literal.text;
        }
        else if (root.kind === SyntaxKind_1.SyntaxKind.current().JsxExpression) {
            var expression = root;
            title += this.anchorText(expression.expression);
        }
        else if (root.kind !== SyntaxKind_1.SyntaxKind.current().JsxSelfClosingElement) {
            title += '<unknown>';
        }
        return title;
    };
    ReactA11yAnchorsRuleWalker.prototype.imageAltAttribute = function (openingElement) {
        if (openingElement.tagName.getText() === 'img') {
            var altAttribute = this.getAttribute(openingElement, 'alt');
            if (altAttribute) {
                return altAttribute;
            }
        }
        return '';
    };
    ReactA11yAnchorsRuleWalker.prototype.imageAlt = function (root) {
        var _this = this;
        var altText = '';
        if (root.kind === SyntaxKind_1.SyntaxKind.current().JsxElement) {
            var jsxElement = root;
            altText += this.imageAltAttribute(jsxElement.openingElement);
            jsxElement.children.forEach(function (child) {
                altText += _this.imageAlt(child);
            });
        }
        if (root.kind === SyntaxKind_1.SyntaxKind.current().JsxSelfClosingElement) {
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
        this.start = 0;
        this.width = 0;
    }
    return AnchorInfo;
}());
//# sourceMappingURL=reactA11yAnchorsRule.js.map