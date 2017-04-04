"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var JsxAttribute_1 = require("./utils/JsxAttribute");
var ARIA_SCHEMA = require('./utils/attributes/ariaSchema.json');
function getFailureString(name) {
    return "This attribute name '" + name + "' is an invalid ARIA attribute. A reference to valid ARIA attributes can be found at https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#state_prop_def ";
}
exports.getFailureString = getFailureString;
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return sourceFile.languageVariant === ts.LanguageVariant.JSX
            ? this.applyWithWalker(new A11yPropsWalker(sourceFile, this.getOptions()))
            : [];
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'react-a11y-props',
    type: 'maintainability',
    description: 'Enforce all `aria-*` attributes are valid. Elements cannot use an invalid `aria-*` attribute.',
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
var A11yPropsWalker = (function (_super) {
    __extends(A11yPropsWalker, _super);
    function A11yPropsWalker() {
        return _super.apply(this, arguments) || this;
    }
    A11yPropsWalker.prototype.visitJsxAttribute = function (node) {
        var name = JsxAttribute_1.getPropName(node);
        if (!name || !name.match(/^aria-/i)) {
            return;
        }
        if (!ARIA_SCHEMA[name.toLowerCase()]) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), getFailureString(name)));
        }
    };
    return A11yPropsWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=reactA11yPropsRule.js.map