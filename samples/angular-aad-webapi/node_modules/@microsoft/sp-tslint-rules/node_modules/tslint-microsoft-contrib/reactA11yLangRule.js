"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var FAILURE_MISSING_LANG = 'An html element is missing the lang attribute';
var FAILURE_WRONG_LANG_CODE = 'Lang attribute does not have a valid value. Found: ';
var LANGUAGE_CODES = [
    'ab', 'aa', 'af', 'sq', 'am', 'ar', 'an', 'hy', 'as', 'ay', 'az', 'ba', 'eu', 'bn',
    'dz', 'bh', 'bi', 'br', 'bg', 'my', 'be', 'km', 'ca', 'zh', 'zh-Hans', 'zh-Hant',
    'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et', 'fo', 'fa', 'fj', 'fi', 'fr', 'fy',
    'gl', 'gd', 'gv', 'ka', 'de', 'el', 'kl', 'gn', 'gu', 'ht', 'ha', 'he', 'iw', 'hi',
    'hu', 'is', 'io', 'id', 'in', 'ia', 'ie', 'iu', 'ik', 'ga', 'it', 'ja', 'jv', 'kn',
    'ks', 'kk', 'rw', 'ky', 'rn', 'ko', 'ku', 'lo', 'la', 'lv', 'li', 'ln', 'lt', 'mk',
    'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mo', 'mn', 'na', 'ne', 'no', 'oc', 'or', 'om',
    'ps', 'pl', 'pt', 'pa', 'qu', 'rm', 'ro', 'ru', 'sm', 'sg', 'sa', 'sr', 'sh', 'st',
    'tn', 'sn', 'ii', 'sd', 'si', 'ss', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tl',
    'tg', 'ta', 'tt', 'te', 'th', 'bo', 'ti', 'to', 'ts', 'tr', 'tk', 'tw', 'ug', 'uk',
    'ur', 'uz', 'vi', 'vo', 'wa', 'cy', 'wo', 'xh', 'yi', 'ji', 'yo', 'zu'
];
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        if (sourceFile.languageVariant === ts.LanguageVariant.JSX) {
            return this.applyWithWalker(new ReactA11yLangRuleWalker(sourceFile, this.getOptions()));
        }
        else {
            return [];
        }
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'react-a11y-lang',
    type: 'functionality',
    description: 'For accessibility of your website, html elements must have a valid lang attribute.',
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
var ReactA11yLangRuleWalker = (function (_super) {
    __extends(ReactA11yLangRuleWalker, _super);
    function ReactA11yLangRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    ReactA11yLangRuleWalker.prototype.visitJsxSelfClosingElement = function (node) {
        this.validateOpeningElement(node, node);
        _super.prototype.visitJsxSelfClosingElement.call(this, node);
    };
    ReactA11yLangRuleWalker.prototype.visitJsxElement = function (node) {
        this.validateOpeningElement(node, node.openingElement);
        _super.prototype.visitJsxElement.call(this, node);
    };
    ReactA11yLangRuleWalker.prototype.validateOpeningElement = function (parent, openingElement) {
        var _this = this;
        if (openingElement.tagName.getText() === 'html') {
            var attributes = openingElement.attributes;
            var langFound_1 = false;
            attributes.forEach(function (attribute) {
                if (attribute.kind === ts.SyntaxKind.JsxAttribute) {
                    if (attribute.name.getText() === 'lang') {
                        langFound_1 = true;
                        if (attribute.initializer.kind === ts.SyntaxKind.StringLiteral) {
                            var langText = attribute.initializer.text;
                            if ((LANGUAGE_CODES.indexOf(langText)) === -1) {
                                _this.addFailure(_this.createFailure(parent.getStart(), parent.getWidth(), FAILURE_WRONG_LANG_CODE + langText));
                            }
                        }
                    }
                }
            });
            if (!langFound_1) {
                this.addFailure(this.createFailure(parent.getStart(), parent.getWidth(), FAILURE_MISSING_LANG));
            }
        }
    };
    return ReactA11yLangRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=reactA11yLangRule.js.map