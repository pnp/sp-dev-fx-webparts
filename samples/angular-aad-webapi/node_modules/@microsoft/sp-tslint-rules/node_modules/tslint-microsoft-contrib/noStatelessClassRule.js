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
var Utils_1 = require("./utils/Utils");
var FAILURE_STRING = 'A stateless class was found. This indicates a failure in the object model: ';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoStatelessClassRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-stateless-class',
    type: 'maintainability',
    description: 'A stateless class represents a failure in the object oriented design of the system.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Important',
    level: 'Opportunity for Excellence',
    group: 'Correctness',
    commonWeaknessEnumeration: '398, 710'
};
exports.Rule = Rule;
var NoStatelessClassRuleWalker = (function (_super) {
    __extends(NoStatelessClassRuleWalker, _super);
    function NoStatelessClassRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoStatelessClassRuleWalker.prototype.visitClassDeclaration = function (node) {
        if (!this.isClassStateful(node)) {
            var className = node.name == null ? '<unknown>' : node.name.text;
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STRING + className));
        }
        _super.prototype.visitClassDeclaration.call(this, node);
    };
    NoStatelessClassRuleWalker.prototype.isClassStateful = function (node) {
        if (this.classExtendsSomething(node)) {
            return true;
        }
        if (node.members.length === 0) {
            return false;
        }
        if (this.classDeclaresConstructorProperties(node)) {
            return true;
        }
        return this.classDeclaresInstanceData(node);
    };
    NoStatelessClassRuleWalker.prototype.classDeclaresInstanceData = function (node) {
        return Utils_1.Utils.exists(node.members, function (classElement) {
            if (classElement.kind === ts.SyntaxKind.Constructor) {
                return false;
            }
            if (AstUtils_1.AstUtils.isStatic(classElement)) {
                return false;
            }
            return true;
        });
    };
    NoStatelessClassRuleWalker.prototype.classDeclaresConstructorProperties = function (node) {
        var _this = this;
        return Utils_1.Utils.exists(node.members, function (element) {
            if (element.kind === ts.SyntaxKind.Constructor) {
                return _this.constructorDeclaresProperty(element);
            }
            return false;
        });
    };
    NoStatelessClassRuleWalker.prototype.constructorDeclaresProperty = function (ctor) {
        return Utils_1.Utils.exists(ctor.parameters, function (param) {
            return AstUtils_1.AstUtils.hasModifier(param.modifiers, ts.SyntaxKind.PublicKeyword)
                || AstUtils_1.AstUtils.hasModifier(param.modifiers, ts.SyntaxKind.PrivateKeyword)
                || AstUtils_1.AstUtils.hasModifier(param.modifiers, ts.SyntaxKind.ProtectedKeyword)
                || AstUtils_1.AstUtils.hasModifier(param.modifiers, ts.SyntaxKind.ReadonlyKeyword);
        });
    };
    NoStatelessClassRuleWalker.prototype.classExtendsSomething = function (node) {
        return Utils_1.Utils.exists(node.heritageClauses, function (clause) {
            return clause.token === ts.SyntaxKind.ExtendsKeyword;
        });
    };
    return NoStatelessClassRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noStatelessClassRule.js.map