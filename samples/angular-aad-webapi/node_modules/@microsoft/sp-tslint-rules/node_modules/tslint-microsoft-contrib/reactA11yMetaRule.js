"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var FAILURE_STRING = 'Do not use http-equiv="refresh"';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        if (sourceFile.languageVariant === ts.LanguageVariant.JSX) {
            return this.applyWithWalker(new ReactA11yMetaRuleWalker(sourceFile, this.getOptions()));
        }
        else {
            return [];
        }
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'react-a11y-meta',
    type: 'functionality',
    description: 'For accessibility of your website, HTML meta elements must not have http-equiv="refresh".',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Ignored',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Accessibility'
};
exports.Rule = Rule;
var ReactA11yMetaRuleWalker = (function (_super) {
    __extends(ReactA11yMetaRuleWalker, _super);
    function ReactA11yMetaRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    ReactA11yMetaRuleWalker.prototype.visitJsxElement = function (node) {
        this.validateOpeningElement(node, node.openingElement);
        _super.prototype.visitJsxElement.call(this, node);
    };
    ReactA11yMetaRuleWalker.prototype.visitJsxSelfClosingElement = function (node) {
        this.validateOpeningElement(node, node);
    };
    ReactA11yMetaRuleWalker.prototype.validateOpeningElement = function (parent, openElement) {
        var _this = this;
        if (openElement.tagName.getText() === 'meta') {
            var attributes = openElement.attributes;
            attributes.forEach(function (parameter) {
                if (parameter.kind === ts.SyntaxKind.JsxAttribute) {
                    var attribute = parameter;
                    if (attribute.name.getText() === 'http-equiv') {
                        if (_this.isStringLiteral(attribute.initializer, 'refresh')) {
                            _this.addFailure(_this.createFailure(parent.getStart(), openElement.getWidth(), FAILURE_STRING));
                        }
                    }
                }
            });
        }
    };
    ReactA11yMetaRuleWalker.prototype.isStringLiteral = function (expression, literal) {
        if (expression != null) {
            if (expression.kind === ts.SyntaxKind.StringLiteral) {
                var value = expression.text;
                return value === literal;
            }
            else if (expression.kind === ts.SyntaxKind.JsxExpression) {
                var exp = expression;
                if (exp.expression.kind === ts.SyntaxKind.StringLiteral) {
                    var value = exp.expression.text;
                    return value === literal;
                }
            }
        }
        return null;
    };
    return ReactA11yMetaRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=reactA11yMetaRule.js.map