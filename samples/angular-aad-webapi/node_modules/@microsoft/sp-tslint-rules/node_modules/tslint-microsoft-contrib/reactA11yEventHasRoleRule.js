"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var JsxAttribute_1 = require("./utils/JsxAttribute");
var getImplicitRole_1 = require("./utils/getImplicitRole");
var DOM_SCHEMA = require('./utils/attributes/domSchema.json');
var FAILURE_STRING = 'Elements with event handlers must have role attribute.';
var ROLE_STRING = 'role';
var TARGET_EVENTS = ['click', 'keyup', 'keydown', 'keypress', 'mousedown', 'mouseup',
    'mousemove', 'mouseout', 'mouseover', 'onclick', 'onkeyup', 'onkeydown', 'onkeypress', 'onmousedown',
    'onmouseup', 'onmousemove', 'onmouseout', 'onmouseover'];
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return sourceFile.languageVariant === ts.LanguageVariant.JSX
            ? this.applyWithWalker(new ReactA11yEventHasRoleWalker(sourceFile, this.getOptions()))
            : [];
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'react-a11y-event-has-role',
    type: 'maintainability',
    description: 'Elements with event handlers must have role attribute.',
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
var ReactA11yEventHasRoleWalker = (function (_super) {
    __extends(ReactA11yEventHasRoleWalker, _super);
    function ReactA11yEventHasRoleWalker() {
        return _super.apply(this, arguments) || this;
    }
    ReactA11yEventHasRoleWalker.prototype.visitJsxElement = function (node) {
        this.checkJsxOpeningElement(node.openingElement);
        _super.prototype.visitJsxElement.call(this, node);
    };
    ReactA11yEventHasRoleWalker.prototype.visitJsxSelfClosingElement = function (node) {
        this.checkJsxOpeningElement(node);
        _super.prototype.visitJsxSelfClosingElement.call(this, node);
    };
    ReactA11yEventHasRoleWalker.prototype.checkJsxOpeningElement = function (node) {
        var tagName = node.tagName.getText();
        if (!DOM_SCHEMA[tagName]) {
            return;
        }
        var attributes = JsxAttribute_1.getJsxAttributesFromJsxElement(node);
        var events = TARGET_EVENTS.filter(function (eventName) { return !!attributes[eventName]; });
        var hasAriaRole = !!attributes[ROLE_STRING] || !!getImplicitRole_1.getImplicitRole(node);
        if (events.length > 0 && !hasAriaRole) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STRING));
        }
    };
    return ReactA11yEventHasRoleWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=reactA11yEventHasRoleRule.js.map