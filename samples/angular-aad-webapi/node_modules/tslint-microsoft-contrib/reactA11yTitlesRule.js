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
var EMPTY_TITLE_FAILURE_STRING = 'Title elements must not be empty';
var LONG_TITLE_FAILURE_STRING = 'Title length must not be longer than 60 characters';
var WORD_TITLE_FAILURE_STRING = 'Title must contain more than one word';
var MAX_TITLE_LENGTH = 60;
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        if (sourceFile.languageVariant === ts.LanguageVariant.JSX) {
            return this.applyWithWalker(new ReactA11yTitlesRuleWalker(sourceFile, this.getOptions()));
        }
        else {
            return [];
        }
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'react-a11y-titles',
    type: 'functionality',
    description: 'For accessibility of your website, HTML title elements must be concise and non-empty.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Moderate',
    level: 'Opportunity for Excellence',
    group: 'Accessibility'
};
exports.Rule = Rule;
var ReactA11yTitlesRuleWalker = (function (_super) {
    __extends(ReactA11yTitlesRuleWalker, _super);
    function ReactA11yTitlesRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    ReactA11yTitlesRuleWalker.prototype.visitJsxSelfClosingElement = function (node) {
        if (node.tagName.getText() === 'title') {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), EMPTY_TITLE_FAILURE_STRING));
        }
        _super.prototype.visitJsxSelfClosingElement.call(this, node);
    };
    ReactA11yTitlesRuleWalker.prototype.visitJsxElement = function (node) {
        var openingElement = node.openingElement;
        if (openingElement.tagName.getText() === 'title') {
            if (node.children.length === 0) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), EMPTY_TITLE_FAILURE_STRING));
            }
            else if (node.children.length === 1) {
                if (node.children[0].kind === ts.SyntaxKind.JsxText) {
                    var value = node.children[0];
                    this.validateTitleText(value.getText(), node);
                }
                else if (node.children[0].kind === ts.SyntaxKind.JsxExpression) {
                    var exp = node.children[0];
                    if (exp.expression.kind === ts.SyntaxKind.StringLiteral) {
                        this.validateTitleText(exp.expression.text, node);
                    }
                }
            }
        }
        _super.prototype.visitJsxElement.call(this, node);
    };
    ReactA11yTitlesRuleWalker.prototype.validateTitleText = function (text, titleNode) {
        if (text.length > MAX_TITLE_LENGTH) {
            this.addFailure(this.createFailure(titleNode.getStart(), titleNode.getWidth(), LONG_TITLE_FAILURE_STRING + ': ' + Utils_1.Utils.trimTo(text, 20)));
        }
        else if (!(text.indexOf(' ') > 0)) {
            this.addFailure(this.createFailure(titleNode.getStart(), titleNode.getWidth(), WORD_TITLE_FAILURE_STRING + ': ' + Utils_1.Utils.trimTo(text, 20)));
        }
    };
    return ReactA11yTitlesRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=reactA11yTitlesRule.js.map