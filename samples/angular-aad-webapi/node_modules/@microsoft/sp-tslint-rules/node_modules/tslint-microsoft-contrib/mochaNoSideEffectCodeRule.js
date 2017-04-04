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
var MochaUtils_1 = require("./utils/MochaUtils");
var Utils_1 = require("./utils/Utils");
var FAILURE_STRING = 'Mocha test contains dangerous variable initialization. Move to before()/beforeEach(): ';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new MochaNoSideEffectCodeRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'mocha-no-side-effect-code',
    type: 'maintainability',
    description: 'All test logic in a Mocha test case should be within Mocha lifecycle method.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Ignored',
    issueType: 'Warning',
    severity: 'Moderate',
    level: 'Opportunity for Excellence',
    group: 'Correctness'
};
exports.Rule = Rule;
var MochaNoSideEffectCodeRuleWalker = (function (_super) {
    __extends(MochaNoSideEffectCodeRuleWalker, _super);
    function MochaNoSideEffectCodeRuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.isInDescribe = false;
        _this.parseOptions();
        return _this;
    }
    MochaNoSideEffectCodeRuleWalker.prototype.parseOptions = function () {
        var _this = this;
        this.getOptions().forEach(function (opt) {
            if (typeof (opt) === 'object') {
                if (opt.ignore != null) {
                    _this.ignoreRegex = new RegExp(opt.ignore);
                }
            }
        });
    };
    MochaNoSideEffectCodeRuleWalker.prototype.visitSourceFile = function (node) {
        var _this = this;
        if (MochaUtils_1.MochaUtils.isMochaTest(node)) {
            node.statements.forEach(function (statement) {
                if (statement.kind === ts.SyntaxKind.VariableStatement) {
                    var declarationList = statement.declarationList;
                    declarationList.declarations.forEach(function (declaration) {
                        _this.validateExpression(declaration.initializer, declaration);
                    });
                }
                if (MochaUtils_1.MochaUtils.isStatementDescribeCall(statement)) {
                    var expression = statement.expression;
                    var call = expression;
                    _this.visitCallExpression(call);
                }
            });
        }
    };
    MochaNoSideEffectCodeRuleWalker.prototype.visitVariableDeclaration = function (node) {
        if (this.isInDescribe === true) {
            this.validateExpression(node.initializer, node);
        }
    };
    MochaNoSideEffectCodeRuleWalker.prototype.visitFunctionDeclaration = function (node) {
    };
    MochaNoSideEffectCodeRuleWalker.prototype.visitClassDeclaration = function (node) {
    };
    MochaNoSideEffectCodeRuleWalker.prototype.visitCallExpression = function (node) {
        if (MochaUtils_1.MochaUtils.isDescribe(node)) {
            var nestedSubscribe = this.isInDescribe;
            this.isInDescribe = true;
            _super.prototype.visitCallExpression.call(this, node);
            if (nestedSubscribe === false) {
                this.isInDescribe = false;
            }
        }
        else if (MochaUtils_1.MochaUtils.isLifecycleMethod(node)) {
            return;
        }
        else if (this.isInDescribe) {
            this.validateExpression(node, node);
        }
    };
    MochaNoSideEffectCodeRuleWalker.prototype.validateExpression = function (initializer, parentNode) {
        var _this = this;
        if (initializer == null) {
            return;
        }
        if (AstUtils_1.AstUtils.isConstant(initializer)) {
            return;
        }
        if (initializer.kind === ts.SyntaxKind.FunctionExpression
            || initializer.kind === ts.SyntaxKind.ArrowFunction) {
            return;
        }
        if (initializer.kind === ts.SyntaxKind.ArrayLiteralExpression) {
            var arrayLiteral = initializer;
            arrayLiteral.elements.forEach(function (expression) {
                _this.validateExpression(expression, parentNode);
            });
            return;
        }
        if (initializer.kind === ts.SyntaxKind.FirstTemplateToken) {
            return;
        }
        if (initializer.kind === ts.SyntaxKind.TypeAssertionExpression) {
            var assertion = initializer;
            this.validateExpression(assertion.expression, parentNode);
            return;
        }
        if (initializer.kind === ts.SyntaxKind.PropertyAccessExpression) {
            return;
        }
        if (initializer.kind === ts.SyntaxKind.Identifier) {
            return;
        }
        if (initializer.kind === ts.SyntaxKind.ObjectLiteralExpression) {
            var literal = initializer;
            literal.properties.forEach(function (element) {
                if (element.kind === ts.SyntaxKind.PropertyAssignment) {
                    var assignment = element;
                    _this.validateExpression(assignment.initializer, parentNode);
                }
            });
            return;
        }
        if (initializer.getText() === 'moment()') {
            return;
        }
        if (initializer.kind === ts.SyntaxKind.CallExpression
            && AstUtils_1.AstUtils.getFunctionTarget(initializer) === 'moment()') {
            return;
        }
        if (initializer.kind === ts.SyntaxKind.NewExpression) {
            if (AstUtils_1.AstUtils.getFunctionName(initializer) === 'Date') {
                return;
            }
        }
        if (this.ignoreRegex != null && this.ignoreRegex.test(initializer.getText())) {
            return;
        }
        if (AstUtils_1.AstUtils.isConstantExpression(initializer)) {
            return;
        }
        var message = FAILURE_STRING + Utils_1.Utils.trimTo(parentNode.getText(), 30);
        this.addFailure(this.createFailure(parentNode.getStart(), parentNode.getWidth(), message));
    };
    return MochaNoSideEffectCodeRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=mochaNoSideEffectCodeRule.js.map