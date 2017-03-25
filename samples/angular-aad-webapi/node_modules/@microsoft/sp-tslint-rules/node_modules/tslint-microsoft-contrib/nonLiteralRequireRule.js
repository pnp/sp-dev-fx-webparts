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
var FAILURE_STRING = 'Non-literal (insecure) parameter passed to require(): ';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NonLiteralRequireRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'non-literal-require',
    type: 'functionality',
    description: 'Detect require includes that are not for string literals',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Mandatory',
    group: 'Security',
    commonWeaknessEnumeration: '95,676'
};
exports.Rule = Rule;
var NonLiteralRequireRuleWalker = (function (_super) {
    __extends(NonLiteralRequireRuleWalker, _super);
    function NonLiteralRequireRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NonLiteralRequireRuleWalker.prototype.visitCallExpression = function (node) {
        var _this = this;
        if (AstUtils_1.AstUtils.getFunctionName(node) === 'require'
            && AstUtils_1.AstUtils.getFunctionTarget(node) == null
            && node.arguments.length > 0) {
            if (node.arguments[0].kind === ts.SyntaxKind.ArrayLiteralExpression) {
                var arrayExp = node.arguments[0];
                arrayExp.elements.forEach(function (initExpression) {
                    if (initExpression.kind !== ts.SyntaxKind.StringLiteral) {
                        _this.fail(initExpression);
                    }
                });
            }
            else if (node.arguments[0].kind !== ts.SyntaxKind.StringLiteral) {
                this.fail(node.arguments[0]);
            }
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    NonLiteralRequireRuleWalker.prototype.fail = function (expression) {
        var start = expression.getStart();
        var width = expression.getWidth();
        var message = FAILURE_STRING + Utils_1.Utils.trimTo(expression.getText(), 25);
        this.addFailure(this.createFailure(start, width, message));
    };
    return NonLiteralRequireRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=nonLiteralRequireRule.js.map