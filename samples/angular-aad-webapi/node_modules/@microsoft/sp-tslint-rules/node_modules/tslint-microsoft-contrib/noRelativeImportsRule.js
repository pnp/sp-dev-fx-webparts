"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var FAILURE_STRING_EXT = 'External module is being loaded from a relative path. Please use an absolute path: ';
var FAILURE_STRING_IMPORT = 'Imported module is being loaded from a relative path. Please use an absolute path: ';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoRelativeImportsRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-relative-imports',
    type: 'maintainability',
    description: 'Do not use relative paths when importing external modules or ES6 import declarations',
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
var NoRelativeImportsRuleWalker = (function (_super) {
    __extends(NoRelativeImportsRuleWalker, _super);
    function NoRelativeImportsRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoRelativeImportsRuleWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.ExternalModuleReference) {
            var moduleExpression = node.expression;
            if (!this.isModuleExpressionValid(moduleExpression)) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STRING_EXT + node.getText()));
            }
        }
        else if (node.kind === ts.SyntaxKind.ImportDeclaration) {
            var moduleExpression = node.moduleSpecifier;
            if (!this.isModuleExpressionValid(moduleExpression)) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STRING_IMPORT + node.getText()));
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    NoRelativeImportsRuleWalker.prototype.isModuleExpressionValid = function (expression) {
        if (expression.kind === ts.SyntaxKind.StringLiteral) {
            var moduleName = expression;
            if (moduleName.text[0] === '.') {
                return false;
            }
        }
        return true;
    };
    return NoRelativeImportsRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noRelativeImportsRule.js.map