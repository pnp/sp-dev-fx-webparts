"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoRegexSpacesRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-regex-spaces',
    type: 'maintainability',
    description: 'Do not use multiple spaces in a regular expression literal. Similar to the ESLint no-regex-spaces rule',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Opportunity for Excellence',
    group: 'Correctness'
};
Rule.FAILURE_STRING = 'Spaces in regular expressions are hard to count. Use ';
exports.Rule = Rule;
var NoRegexSpacesRuleWalker = (function (_super) {
    __extends(NoRegexSpacesRuleWalker, _super);
    function NoRegexSpacesRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoRegexSpacesRuleWalker.prototype.visitRegularExpressionLiteral = function (node) {
        var match = /( {2,})+?/.exec(node.getText());
        if (match != null) {
            var replacement = '{' + match[0].length + '}';
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING + replacement));
        }
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    return NoRegexSpacesRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noRegexSpacesRule.js.map