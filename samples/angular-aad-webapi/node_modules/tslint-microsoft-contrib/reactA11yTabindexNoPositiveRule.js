"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var JsxAttribute_1 = require("./utils/JsxAttribute");
function getFailureString() {
    return 'The value of tabindex attribute is invalid or undefined. It must be either -1 or 0.';
}
exports.getFailureString = getFailureString;
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return sourceFile.languageVariant === ts.LanguageVariant.JSX
            ? this.applyWithWalker(new A11yTabindexNoPositiveWalker(sourceFile, this.getOptions()))
            : [];
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'react-a11y-tabindex-no-positive',
    type: 'maintainability',
    description: 'Enforce tabindex value is **not greater than zero**.',
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
var A11yTabindexNoPositiveWalker = (function (_super) {
    __extends(A11yTabindexNoPositiveWalker, _super);
    function A11yTabindexNoPositiveWalker() {
        return _super.apply(this, arguments) || this;
    }
    A11yTabindexNoPositiveWalker.prototype.visitJsxAttribute = function (node) {
        var name = JsxAttribute_1.getPropName(node);
        if (!name || name.toLowerCase() !== 'tabindex') {
            return;
        }
        var literalString = JsxAttribute_1.getNumericLiteral(node) || JsxAttribute_1.getStringLiteral(node);
        if (literalString === '') {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), getFailureString()));
        }
        else if (literalString && literalString !== '-1' && literalString !== '0') {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), getFailureString()));
        }
        else if (JsxAttribute_1.isEmpty(node)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), getFailureString()));
        }
    };
    return A11yTabindexNoPositiveWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=reactA11yTabindexNoPositiveRule.js.map