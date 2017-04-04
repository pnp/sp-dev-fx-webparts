"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var BannedTermWalker_1 = require("./utils/BannedTermWalker");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new BannedTermWalker_1.BannedTermWalker(sourceFile, this.getOptions(), Rule.FAILURE_STRING, Rule.BANNED_TERMS);
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-banned-terms',
    type: 'maintainability',
    description: 'Do not use banned terms: caller, callee, eval, arguments.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Mandatory',
    group: 'Security',
    commonWeaknessEnumeration: '676, 242, 116'
};
Rule.FAILURE_STRING = 'Forbidden reference to banned term: ';
Rule.BANNED_TERMS = ['caller', 'callee', 'arguments', 'eval'];
exports.Rule = Rule;
//# sourceMappingURL=noBannedTermsRule.js.map