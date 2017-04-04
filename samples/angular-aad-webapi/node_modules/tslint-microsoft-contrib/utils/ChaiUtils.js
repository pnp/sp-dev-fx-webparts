"use strict";
var ts = require("typescript");
var ChaiUtils;
(function (ChaiUtils) {
    function isExpectInvocation(node) {
        var callExpression = getLeftMostCallExpression(node);
        if (callExpression == null) {
            return false;
        }
        return /.*\.?expect/.test(callExpression.expression.getText());
    }
    ChaiUtils.isExpectInvocation = isExpectInvocation;
    function getLeftMostCallExpression(node) {
        var leftSide = node.expression;
        while (leftSide != null) {
            if (leftSide.kind === ts.SyntaxKind.CallExpression) {
                return leftSide;
            }
            else if (leftSide.kind === (ts.SyntaxKind.PropertyAccessExpression)) {
                leftSide = leftSide.expression;
            }
            else {
                return null;
            }
        }
        return null;
    }
    ChaiUtils.getLeftMostCallExpression = getLeftMostCallExpression;
    function getFirstExpectCallParameter(node) {
        var expectCall = ChaiUtils.getLeftMostCallExpression(node);
        if (expectCall.arguments.length > 0) {
            return expectCall.arguments[0];
        }
        return null;
    }
    ChaiUtils.getFirstExpectCallParameter = getFirstExpectCallParameter;
    function getFirstExpectationParameter(node) {
        if (node.arguments.length > 0) {
            return node.arguments[0];
        }
        return null;
    }
    ChaiUtils.getFirstExpectationParameter = getFirstExpectationParameter;
    function isEqualsInvocation(propExpression) {
        return /equal|equals|eq|eql|eqs/.test(propExpression.name.getText());
    }
    ChaiUtils.isEqualsInvocation = isEqualsInvocation;
})(ChaiUtils = exports.ChaiUtils || (exports.ChaiUtils = {}));
//# sourceMappingURL=ChaiUtils.js.map