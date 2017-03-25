"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var AstUtils_1 = require("./utils/AstUtils");
var METHOD_REGEX = 'method-regex';
var PRIVATE_METHOD_REGEX = 'private-method-regex';
var PROTECTED_METHOD_REGEX = 'protected-method-regex';
var STATIC_METHOD_REGEX = 'static-method-regex';
var FUNCTION_REGEX = 'function-regex';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new FunctionNameRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'function-name',
    type: 'maintainability',
    description: 'Applies a naming convention to function names and method names',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Important',
    level: 'Opportunity for Excellence',
    group: 'Clarity',
    commonWeaknessEnumeration: '398, 710'
};
exports.Rule = Rule;
var FunctionNameRuleWalker = (function (_super) {
    __extends(FunctionNameRuleWalker, _super);
    function FunctionNameRuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.methodRegex = /^[a-z][\w\d]+$/;
        _this.privateMethodRegex = _this.methodRegex;
        _this.protectedMethodRegex = _this.privateMethodRegex;
        _this.staticMethodRegex = /^[A-Z_\d]+$/;
        _this.functionRegex = /^[a-z][\w\d]+$/;
        _this.getOptions().forEach(function (opt) {
            if (typeof (opt) === 'object') {
                _this.methodRegex = _this.getOptionOrDefault(opt, METHOD_REGEX, _this.methodRegex);
                _this.privateMethodRegex = _this.getOptionOrDefault(opt, PRIVATE_METHOD_REGEX, _this.privateMethodRegex);
                _this.protectedMethodRegex = _this.getOptionOrDefault(opt, PROTECTED_METHOD_REGEX, _this.protectedMethodRegex);
                _this.staticMethodRegex = _this.getOptionOrDefault(opt, STATIC_METHOD_REGEX, _this.staticMethodRegex);
                _this.functionRegex = _this.getOptionOrDefault(opt, FUNCTION_REGEX, _this.functionRegex);
            }
        });
        return _this;
    }
    FunctionNameRuleWalker.prototype.visitMethodDeclaration = function (node) {
        var name = node.name.getText();
        if (AstUtils_1.AstUtils.isPrivate(node)) {
            if (!this.privateMethodRegex.test(name)) {
                this.addFailure(this.createFailure(node.name.getStart(), node.name.getWidth(), "Private method name does not match " + this.privateMethodRegex + ": " + name));
            }
        }
        else if (AstUtils_1.AstUtils.isProtected(node)) {
            if (!this.protectedMethodRegex.test(name)) {
                this.addFailure(this.createFailure(node.name.getStart(), node.name.getWidth(), "Protected method name does not match " + this.protectedMethodRegex + ": " + name));
            }
        }
        else if (AstUtils_1.AstUtils.isStatic(node)) {
            if (!this.staticMethodRegex.test(name)) {
                this.addFailure(this.createFailure(node.name.getStart(), node.name.getWidth(), "Static method name does not match " + this.staticMethodRegex + ": " + name));
            }
        }
        else if (!this.methodRegex.test(name)) {
            this.addFailure(this.createFailure(node.name.getStart(), node.name.getWidth(), "Method name does not match " + this.methodRegex + ": " + name));
        }
        _super.prototype.visitMethodDeclaration.call(this, node);
    };
    FunctionNameRuleWalker.prototype.visitFunctionDeclaration = function (node) {
        if (node.name != null) {
            var name_1 = node.name.text;
            if (!this.functionRegex.test(name_1)) {
                this.addFailure(this.createFailure(node.name.getStart(), node.name.getWidth(), "Function name does not match " + this.functionRegex + ": " + name_1));
            }
        }
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    FunctionNameRuleWalker.prototype.getOptionOrDefault = function (option, key, defaultValue) {
        try {
            if (option[key] != null) {
                return new RegExp(option[key]);
            }
        }
        catch (e) {
            console.error('Could not read ' + key + ' within function-name configuration');
        }
        return defaultValue;
    };
    return FunctionNameRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=functionNameRule.js.map