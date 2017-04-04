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
var FAILURE_STATIC_FOUND = 'Static invocation of underscore function found. Prefer instance version instead: ';
var FAILURE_INSTANCE_FOUND = 'Underscore instance wrapping of variable found. Prefer underscore static functions instead: ';
var FUNCTION_NAMES = [
    'each', 'forEach', 'map', 'collect',
    'reduce', 'inject', 'foldl', 'reduceRight',
    'foldr', 'find', 'detect', 'filter',
    'select', 'where', 'findWhere', 'reject',
    'every', 'all', 'some', 'any',
    'contains', 'include', 'invoke', 'pluck',
    'max', 'min', 'sortBy', 'groupBy',
    'indexBy', 'countBy', 'shuffle', 'sample',
    'toArray', 'size', 'partition', 'first',
    'head', 'take', 'initial', 'last',
    'rest', 'tail', 'drop', 'compact',
    'flatten', 'without', 'union', 'intersection',
    'difference', 'uniq', 'unique', 'object',
    'zip', 'unzip', 'indexOf', 'findIndex',
    'lastIndexOf', 'findLastIndex', 'sortedIndex', 'range'
];
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new UnderscoreConsistentInvocationRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'underscore-consistent-invocation',
    type: 'maintainability',
    description: 'Enforce a consistent usage of the _ functions',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Clarity',
    commonWeaknessEnumeration: '398, 710'
};
exports.Rule = Rule;
var UnderscoreConsistentInvocationRuleWalker = (function (_super) {
    __extends(UnderscoreConsistentInvocationRuleWalker, _super);
    function UnderscoreConsistentInvocationRuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.style = 'instance';
        _this.getOptions().forEach(function (opt) {
            if (typeof (opt) === 'object') {
                if (opt.style === 'static') {
                    _this.style = 'static';
                }
            }
        });
        return _this;
    }
    UnderscoreConsistentInvocationRuleWalker.prototype.visitCallExpression = function (node) {
        var functionName = AstUtils_1.AstUtils.getFunctionName(node);
        if (this.style === 'instance' && this.isStaticUnderscoreInvocation(node)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_STATIC_FOUND + '_.' + functionName));
        }
        if (this.style === 'static' && this.isStaticUnderscoreInstanceInvocation(node)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_INSTANCE_FOUND + node.expression.getText()));
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    UnderscoreConsistentInvocationRuleWalker.prototype.isStaticUnderscoreInstanceInvocation = function (node) {
        if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
            var propExpression = node.expression;
            if (propExpression.expression.kind === ts.SyntaxKind.CallExpression) {
                var call = propExpression.expression;
                var target = AstUtils_1.AstUtils.getFunctionTarget(call);
                var functionName = AstUtils_1.AstUtils.getFunctionName(call);
                if (target == null && functionName === '_' && call.arguments.length === 1) {
                    var underscoreFunctionName = AstUtils_1.AstUtils.getFunctionName(node);
                    return FUNCTION_NAMES.indexOf(underscoreFunctionName) > -1;
                }
            }
        }
        return false;
    };
    UnderscoreConsistentInvocationRuleWalker.prototype.isStaticUnderscoreInvocation = function (node) {
        var target = AstUtils_1.AstUtils.getFunctionTarget(node);
        if (target !== '_') {
            return false;
        }
        var functionName = AstUtils_1.AstUtils.getFunctionName(node);
        return FUNCTION_NAMES.indexOf(functionName) > -1;
    };
    return UnderscoreConsistentInvocationRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=underscoreConsistentInvocationRule.js.map