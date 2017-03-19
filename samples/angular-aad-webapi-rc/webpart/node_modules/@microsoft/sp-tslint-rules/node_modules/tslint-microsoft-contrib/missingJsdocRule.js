"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new MissingJSDocWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'missing-jsdoc',
        type: 'maintainability',
        description: 'All files must have a top level JSDoc comment.',
        options: null,
        issueClass: 'Non-SDL',
        issueType: 'Warning',
        severity: 'Low',
        level: 'Opportunity for Excellence',
        group: 'Clarity',
        commonWeaknessEnumeration: '398, 710'
    };
    Rule.FAILURE_STRING = 'File missing JSDoc comment at the top-level: ';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var MissingJSDocWalker = (function (_super) {
    __extends(MissingJSDocWalker, _super);
    function MissingJSDocWalker() {
        _super.apply(this, arguments);
    }
    MissingJSDocWalker.prototype.visitSourceFile = function (node) {
        if (!/^\/\*\*\s*$/gm.test(node.getFullText())) {
            var failureString = Rule.FAILURE_STRING + this.getSourceFile().fileName;
            var failure = this.createFailure(node.getStart(), node.getWidth(), failureString);
            this.addFailure(failure);
        }
    };
    return MissingJSDocWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=missingJsdocRule.js.map