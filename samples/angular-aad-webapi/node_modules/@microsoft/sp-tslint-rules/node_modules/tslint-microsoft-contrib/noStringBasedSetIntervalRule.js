"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var NoStringParameterToFunctionCallWalker_1 = require("./utils/NoStringParameterToFunctionCallWalker");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var documentRegistry = ts.createDocumentRegistry();
        var languageServiceHost = Lint.createLanguageServiceHost('file.ts', sourceFile.getFullText());
        var languageService = ts.createLanguageService(languageServiceHost, documentRegistry);
        var walker = new NoStringParameterToFunctionCallWalker_1.NoStringParameterToFunctionCallWalker(sourceFile, 'setInterval', this.getOptions(), languageService);
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-string-based-set-interval',
    type: 'maintainability',
    description: 'Do not use the version of setInterval that accepts code as a string argument.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Mandatory',
    group: 'Security',
    commonWeaknessEnumeration: '95, 676, 242, 116'
};
exports.Rule = Rule;
//# sourceMappingURL=noStringBasedSetIntervalRule.js.map