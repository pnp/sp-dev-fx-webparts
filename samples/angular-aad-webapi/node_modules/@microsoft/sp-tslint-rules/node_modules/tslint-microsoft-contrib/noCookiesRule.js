"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var documentRegistry = ts.createDocumentRegistry();
        var languageServiceHost = Lint.createLanguageServiceHost('file.ts', sourceFile.getFullText());
        var languageService = ts.createLanguageService(languageServiceHost, documentRegistry);
        return this.applyWithWalker(new NoCookiesWalker(sourceFile, this.getOptions(), languageService));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-cookies',
    type: 'maintainability',
    description: 'Do not use cookies',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Mandatory',
    group: 'Security',
    commonWeaknessEnumeration: '315, 539, 565, 614'
};
Rule.FAILURE_STRING = 'Forbidden call to document.cookie';
exports.Rule = Rule;
var NoCookiesWalker = (function (_super) {
    __extends(NoCookiesWalker, _super);
    function NoCookiesWalker(sourceFile, options, languageService) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.languageService = languageService;
        _this.typeChecker = languageService.getProgram().getTypeChecker();
        return _this;
    }
    NoCookiesWalker.prototype.visitPropertyAccessExpression = function (node) {
        var propertyName = node.name.text;
        if (propertyName === 'cookie') {
            var leftSide = node.expression;
            try {
                var leftSideType = this.typeChecker.getTypeAtLocation(leftSide);
                var typeAsString = this.typeChecker.typeToString(leftSideType);
                if (leftSideType.flags === ts.TypeFlags.Any || typeAsString === 'Document') {
                    this.addFailure(this.createFailure(leftSide.getStart(), leftSide.getWidth(), Rule.FAILURE_STRING));
                }
            }
            catch (e) {
                if (leftSide.getFullText().trim() === 'document') {
                    this.addFailure(this.createFailure(leftSide.getStart(), leftSide.getWidth(), Rule.FAILURE_STRING));
                }
            }
        }
        _super.prototype.visitPropertyAccessExpression.call(this, node);
    };
    return NoCookiesWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noCookiesRule.js.map