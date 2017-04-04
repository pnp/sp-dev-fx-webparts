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
        return this.applyWithWalker(new NoUnnecessaryBindRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-unnecessary-bind',
    type: 'maintainability',
    description: 'Do not bind `this` as the context for a function literal or lambda expression.',
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
Rule.FAILURE_FUNCTION_WITH_BIND = 'Binding function literal with \'this\' context. Use lambdas instead';
Rule.FAILURE_ARROW_WITH_BIND = 'Binding lambda with \'this\' context. Lambdas already have \'this\' bound';
Rule.UNDERSCORE_BINARY_FUNCTION_NAMES = [
    'all', 'any', 'collect', 'countBy', 'detect', 'each',
    'every', 'filter', 'find', 'forEach', 'groupBy', 'indexBy',
    'map', 'max', 'max', 'min', 'partition', 'reject',
    'select', 'some', 'sortBy', 'times', 'uniq', 'unique'
];
Rule.UNDERSCORE_TERNARY_FUNCTION_NAMES = [
    'foldl', 'foldr', 'inject', 'reduce', 'reduceRight'
];
exports.Rule = Rule;
var NoUnnecessaryBindRuleWalker = (function (_super) {
    __extends(NoUnnecessaryBindRuleWalker, _super);
    function NoUnnecessaryBindRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoUnnecessaryBindRuleWalker.prototype.visitCallExpression = function (node) {
        var _this = this;
        var analyzers = [
            new TypeScriptFunctionAnalyzer(), new UnderscoreStaticAnalyzer(), new UnderscoreInstanceAnalyzer()
        ];
        analyzers.forEach(function (analyzer) {
            if (analyzer.canHandle(node)) {
                var contextArgument = analyzer.getContextArgument(node);
                var functionArgument = analyzer.getFunctionArgument(node);
                if (contextArgument == null || functionArgument == null) {
                    return;
                }
                if (contextArgument.getText() === 'this') {
                    if (isArrowFunction(functionArgument)) {
                        _this.addFailure(_this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_ARROW_WITH_BIND));
                    }
                    else if (isFunctionLiteral(functionArgument)) {
                        _this.addFailure(_this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_FUNCTION_WITH_BIND));
                    }
                }
            }
        });
        _super.prototype.visitCallExpression.call(this, node);
    };
    return NoUnnecessaryBindRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
var TypeScriptFunctionAnalyzer = (function () {
    function TypeScriptFunctionAnalyzer() {
    }
    TypeScriptFunctionAnalyzer.prototype.canHandle = function (node) {
        return !!(AstUtils_1.AstUtils.getFunctionName(node) === 'bind'
            && node.arguments.length === 1
            && node.expression.kind === ts.SyntaxKind.PropertyAccessExpression);
    };
    TypeScriptFunctionAnalyzer.prototype.getContextArgument = function (node) {
        return node.arguments[0];
    };
    TypeScriptFunctionAnalyzer.prototype.getFunctionArgument = function (node) {
        return node.expression.expression;
    };
    return TypeScriptFunctionAnalyzer;
}());
var UnderscoreStaticAnalyzer = (function () {
    function UnderscoreStaticAnalyzer() {
    }
    UnderscoreStaticAnalyzer.prototype.canHandle = function (node) {
        var isUnderscore = AstUtils_1.AstUtils.getFunctionTarget(node) === '_';
        if (isUnderscore) {
            var functionName = AstUtils_1.AstUtils.getFunctionName(node);
            if (functionName === 'bind') {
                return node.arguments.length === 2;
            }
        }
        return isUnderscore;
    };
    UnderscoreStaticAnalyzer.prototype.getContextArgument = function (node) {
        var functionName = AstUtils_1.AstUtils.getFunctionName(node);
        if (Rule.UNDERSCORE_BINARY_FUNCTION_NAMES.indexOf(functionName) !== -1) {
            return node.arguments[2];
        }
        else if (Rule.UNDERSCORE_TERNARY_FUNCTION_NAMES.indexOf(functionName) !== -1) {
            return node.arguments[3];
        }
        else if (functionName === 'sortedIndex') {
            return node.arguments[3];
        }
        else if (functionName === 'bind') {
            return node.arguments[1];
        }
        return null;
    };
    UnderscoreStaticAnalyzer.prototype.getFunctionArgument = function (node) {
        var functionName = AstUtils_1.AstUtils.getFunctionName(node);
        if (Rule.UNDERSCORE_BINARY_FUNCTION_NAMES.indexOf(functionName) !== -1) {
            return node.arguments[1];
        }
        else if (Rule.UNDERSCORE_TERNARY_FUNCTION_NAMES.indexOf(functionName) !== -1) {
            return node.arguments[1];
        }
        else if (functionName === 'sortedIndex') {
            return node.arguments[2];
        }
        else if (functionName === 'bind') {
            return node.arguments[0];
        }
        return null;
    };
    return UnderscoreStaticAnalyzer;
}());
var UnderscoreInstanceAnalyzer = (function () {
    function UnderscoreInstanceAnalyzer() {
    }
    UnderscoreInstanceAnalyzer.prototype.canHandle = function (node) {
        if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
            var propExpression = node.expression;
            if (propExpression.expression.kind === ts.SyntaxKind.CallExpression) {
                var call = propExpression.expression;
                return call.expression.getText() === '_';
            }
        }
        return false;
    };
    UnderscoreInstanceAnalyzer.prototype.getContextArgument = function (node) {
        var functionName = AstUtils_1.AstUtils.getFunctionName(node);
        if (Rule.UNDERSCORE_BINARY_FUNCTION_NAMES.indexOf(functionName) !== -1) {
            return node.arguments[1];
        }
        else if (Rule.UNDERSCORE_TERNARY_FUNCTION_NAMES.indexOf(functionName) !== -1) {
            return node.arguments[2];
        }
        else if (functionName === 'sortedIndex') {
            return node.arguments[2];
        }
        return null;
    };
    UnderscoreInstanceAnalyzer.prototype.getFunctionArgument = function (node) {
        var functionName = AstUtils_1.AstUtils.getFunctionName(node);
        if (Rule.UNDERSCORE_BINARY_FUNCTION_NAMES.indexOf(functionName) !== -1) {
            return node.arguments[0];
        }
        else if (Rule.UNDERSCORE_TERNARY_FUNCTION_NAMES.indexOf(functionName) !== -1) {
            return node.arguments[0];
        }
        else if (functionName === 'sortedIndex') {
            return node.arguments[1];
        }
        return null;
    };
    return UnderscoreInstanceAnalyzer;
}());
function isFunctionLiteral(expression) {
    if (expression.kind === ts.SyntaxKind.FunctionExpression) {
        return true;
    }
    if (expression.kind === ts.SyntaxKind.ParenthesizedExpression) {
        return isFunctionLiteral(expression.expression);
    }
    return false;
}
function isArrowFunction(expression) {
    if (expression.kind === ts.SyntaxKind.ArrowFunction) {
        return true;
    }
    if (expression.kind === ts.SyntaxKind.ParenthesizedExpression) {
        return isArrowFunction(expression.expression);
    }
    return false;
}
//# sourceMappingURL=noUnnecessaryBindRule.js.map