"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var SyntaxKind_1 = require('./utils/SyntaxKind');
var AstUtils_1 = require('./utils/AstUtils');
var Utils_1 = require('./utils/Utils');
var FAILURE_STRING = 'A stateless class was found. This indicates a failure in the object model: ';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoStatelessClassRuleWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'no-stateless-class',
        type: 'maintainability',
        description: 'A stateless class represents a failure in the object oriented design of the system.',
        options: null,
        issueClass: 'Non-SDL',
        issueType: 'Warning',
        severity: 'Important',
        level: 'Opportunity for Excellence',
        group: 'Correctness',
        commonWeaknessEnumeration: '398, 710'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoStatelessClassRuleWalker = (function (_super) {
    __extends(NoStatelessClassRuleWalker, _super);
    function NoStatelessClassRuleWalker() {
        _super.apply(this, arguments);
    }
    NoStatelessClassRuleWalker.prototype.visitClassDeclaration = function (node) {
        if (!this.isClassStateful(node)) {
            var className = node.name == null ? '<unknown>' : node.name.text;
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STRING + className));
        }
        _super.prototype.visitClassDeclaration.call(this, node);
    };
    NoStatelessClassRuleWalker.prototype.isClassStateful = function (node) {
        if (Utils_1.Utils.exists(node.heritageClauses, function (clause) {
            return clause.token === SyntaxKind_1.SyntaxKind.current().ExtendsKeyword;
        })) {
            return true;
        }
        if (node.members.length === 0) {
            return false;
        }
        return Utils_1.Utils.exists(node.members, function (classElement) {
            if (classElement.kind === SyntaxKind_1.SyntaxKind.current().Constructor) {
                return false;
            }
            if (AstUtils_1.AstUtils.isStatic(classElement)) {
                return false;
            }
            return true;
        });
    };
    return NoStatelessClassRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noStatelessClassRule.js.map