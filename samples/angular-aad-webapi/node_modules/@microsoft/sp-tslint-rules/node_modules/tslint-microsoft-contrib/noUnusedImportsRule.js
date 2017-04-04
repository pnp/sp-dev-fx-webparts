"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var AstUtils_1 = require("./utils/AstUtils");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var documentRegistry = ts.createDocumentRegistry();
        var languageServiceHost = Lint.createLanguageServiceHost('file.ts', sourceFile.getFullText());
        var languageService = ts.createLanguageService(languageServiceHost, documentRegistry);
        return this.applyWithWalker(new NoUnusedImportsWalker(sourceFile, this.getOptions(), languageService));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = 'unused import: ';
Rule.metadata = {
    ruleName: 'no-unused-imports',
    type: 'maintainability',
    description: 'Deprecated - This rule is now covered by TSLint\'s no-unused-variables rule',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Ignored',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Deprecated',
    recommendation: 'false             // use tslint no-unused-variable rule instead',
    commonWeaknessEnumeration: '398, 710'
};
exports.Rule = Rule;
var NoUnusedImportsWalker = (function (_super) {
    __extends(NoUnusedImportsWalker, _super);
    function NoUnusedImportsWalker(sourceFile, options, languageServices) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.languageServices = languageServices;
        return _this;
    }
    NoUnusedImportsWalker.prototype.visitImportEqualsDeclaration = function (node) {
        if (!AstUtils_1.AstUtils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
            this.validateReferencesForVariable(node);
        }
        _super.prototype.visitImportEqualsDeclaration.call(this, node);
    };
    NoUnusedImportsWalker.prototype.visitImportDeclaration = function (node) {
        if (!AstUtils_1.AstUtils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
            this.validateReferencesForVariable(node);
        }
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    NoUnusedImportsWalker.prototype.validateReferencesForVariable = function (node) {
        var _this = this;
        if (this.isTsxFile() && this.isReactImport(node)) {
            return;
        }
        var variableStack = [];
        if (node.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
            var name_1 = node.name.text;
            var position = node.name.getStart();
            variableStack.push({ name: name_1, position: position, importNode: node });
        }
        else {
            var importClause = node.importClause;
            if (importClause != null) {
                if (importClause.name != null) {
                    var name_2 = importClause.name.text;
                    var position = importClause.getStart();
                    variableStack.push({ name: name_2, position: position, importNode: node });
                }
                else if (importClause.namedBindings != null) {
                    if (importClause.namedBindings.kind === ts.SyntaxKind.NamespaceImport) {
                        var imports = importClause.namedBindings;
                        var name_3 = imports.name.text;
                        var position = imports.name.getStart();
                        variableStack.push({ name: name_3, position: position, importNode: node });
                    }
                    else if (importClause.namedBindings.kind === ts.SyntaxKind.NamedImports) {
                        var imports = importClause.namedBindings;
                        imports.elements.forEach(function (importSpec) {
                            var name = importSpec.name.text;
                            var position = importSpec.name.getStart();
                            variableStack.push({ name: name, position: position, importNode: node });
                        });
                    }
                }
            }
        }
        variableStack.forEach(function (variable) {
            var name = variable.name;
            var position = variable.position;
            var references = _this.languageServices.getReferencesAtPosition('file.ts', position);
            if (references.length <= 1) {
                var sourceText = _this.getSourceText();
                var endOfImport = variable.importNode.getEnd();
                var restOfFile = sourceText.substring(endOfImport);
                if (new RegExp('\\b(' + name + ')\\b', 'm').test(restOfFile)) {
                    return;
                }
                var failureString = Rule.FAILURE_STRING + '\'' + name + '\'';
                var failure = _this.createFailure(position, name.length, failureString);
                _this.addFailure(failure);
            }
        });
    };
    NoUnusedImportsWalker.prototype.getSourceText = function () {
        if (this.cachedSourceText == null) {
            this.cachedSourceText = this.getSourceFile().text;
        }
        return this.cachedSourceText;
    };
    NoUnusedImportsWalker.prototype.isReactImport = function (node) {
        if (node.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
            var importDeclaration = node;
            if (importDeclaration.moduleReference.kind === ts.SyntaxKind.ExternalModuleReference) {
                var moduleExpression = importDeclaration.moduleReference.expression;
                return this.isModuleExpressionReact(moduleExpression);
            }
        }
        else if (node.kind === ts.SyntaxKind.ImportDeclaration) {
            var importDeclaration = node;
            var moduleExpression = importDeclaration.moduleSpecifier;
            return this.isModuleExpressionReact(moduleExpression);
        }
        return false;
    };
    NoUnusedImportsWalker.prototype.isModuleExpressionReact = function (moduleExpression) {
        if (moduleExpression != null && moduleExpression.kind === ts.SyntaxKind.StringLiteral) {
            var moduleName = moduleExpression;
            return /react/i.test(moduleName.text);
        }
        return false;
    };
    NoUnusedImportsWalker.prototype.isTsxFile = function () {
        return /.*\.tsx/.test(this.getSourceFile().fileName);
    };
    return NoUnusedImportsWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noUnusedImportsRule.js.map