"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var Utils_1 = require("./utils/Utils");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new ImportNameRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'import-name',
    type: 'maintainability',
    description: 'The name of the imported module must match the name of the thing being imported',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Ignored',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Clarity',
    commonWeaknessEnumeration: '710'
};
exports.Rule = Rule;
var ImportNameRuleWalker = (function (_super) {
    __extends(ImportNameRuleWalker, _super);
    function ImportNameRuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.replacements = _this.extractOptions();
        return _this;
    }
    ImportNameRuleWalker.prototype.extractOptions = function () {
        var result = {};
        this.getOptions().forEach(function (opt) {
            if (typeof (opt) === 'object') {
                Object.keys(opt).forEach(function (key) {
                    var value = opt[key];
                    if (typeof value === 'string') {
                        result[key] = value;
                    }
                });
            }
        });
        return result;
    };
    ImportNameRuleWalker.prototype.visitImportEqualsDeclaration = function (node) {
        var name = node.name.text;
        if (node.moduleReference.kind === ts.SyntaxKind.ExternalModuleReference) {
            var moduleRef = node.moduleReference;
            if (moduleRef.expression.kind === ts.SyntaxKind.StringLiteral) {
                var moduleName = moduleRef.expression.text;
                this.validateImport(node, name, moduleName);
            }
        }
        else if (node.moduleReference.kind === ts.SyntaxKind.QualifiedName) {
            var moduleName = node.moduleReference.getText();
            moduleName = moduleName.replace(/.*\./, '');
            this.validateImport(node, name, moduleName);
        }
        _super.prototype.visitImportEqualsDeclaration.call(this, node);
    };
    ImportNameRuleWalker.prototype.visitImportDeclaration = function (node) {
        if (node.importClause.name != null) {
            var name_1 = node.importClause.name.text;
            if (node.moduleSpecifier.kind === ts.SyntaxKind.StringLiteral) {
                var moduleName = node.moduleSpecifier.text;
                this.validateImport(node, name_1, moduleName);
            }
        }
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    ImportNameRuleWalker.prototype.validateImport = function (node, importedName, moduleName) {
        moduleName = moduleName.replace(/.*\//, '');
        if (this.isImportNameValid(importedName, moduleName) === false) {
            var message = "Misnamed import. Import should be named '" + moduleName + "' but found '" + importedName + "'";
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
        }
    };
    ImportNameRuleWalker.prototype.isImportNameValid = function (importedName, moduleName) {
        var _this = this;
        if (moduleName === importedName) {
            return true;
        }
        return Utils_1.Utils.exists(Object.keys(this.replacements), function (replacementKey) {
            if (new RegExp(replacementKey).test(moduleName)) {
                return importedName === _this.replacements[replacementKey];
            }
            return false;
        });
    };
    return ImportNameRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=importNameRule.js.map