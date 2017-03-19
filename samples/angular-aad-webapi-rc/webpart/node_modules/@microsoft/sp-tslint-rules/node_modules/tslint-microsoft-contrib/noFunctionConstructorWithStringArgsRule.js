"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var Lint = require('tslint/lib/lint');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var AstUtils_1 = require('./utils/AstUtils');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var documentRegistry = ts.createDocumentRegistry();
        var languageServiceHost = Lint.createLanguageServiceHost('file.ts', sourceFile.getFullText());
        var languageService = ts.createLanguageService(languageServiceHost, documentRegistry);
        return this.applyWithWalker(new NoFunctionConstructorWithStringArgsWalker(sourceFile, this.getOptions(), languageService));
    };
    Rule.metadata = {
        ruleName: 'no-function-constructor-with-string-args',
        type: 'maintainability',
        description: 'Do not use the version of the Function constructor that accepts a string argument to define the body of the function',
        options: null,
        issueClass: 'SDL',
        issueType: 'Error',
        severity: 'Critical',
        level: 'Mandatory',
        group: 'Security',
        commonWeaknessEnumeration: '95, 676, 242, 116'
    };
    Rule.FAILURE_STRING = 'forbidden: Function constructor with string arguments ';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoFunctionConstructorWithStringArgsWalker = (function (_super) {
    __extends(NoFunctionConstructorWithStringArgsWalker, _super);
    function NoFunctionConstructorWithStringArgsWalker(sourceFile, options, languageServices) {
        _super.call(this, sourceFile, options);
        this.languageService = languageServices;
        this.typeChecker = this.languageService.getProgram().getTypeChecker();
    }
    NoFunctionConstructorWithStringArgsWalker.prototype.visitNewExpression = function (node) {
        var functionName = AstUtils_1.AstUtils.getFunctionName(node);
        if (functionName === 'Function') {
            if (node.arguments.length > 0) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
            }
        }
        _super.prototype.visitNewExpression.call(this, node);
    };
    return NoFunctionConstructorWithStringArgsWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noFunctionConstructorWithStringArgsRule.js.map