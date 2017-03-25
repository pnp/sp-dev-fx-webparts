"use strict";
var ts = require("typescript");
var TypeGuard_1 = require("./TypeGuard");
function getPropName(node) {
    if (!TypeGuard_1.isJsxAttribute(node)) {
        throw new Error('The node must be a JsxAttribute collected by the AST parser.');
    }
    return node.name
        ? node.name.text
        : undefined;
}
exports.getPropName = getPropName;
function getStringLiteral(node) {
    if (!TypeGuard_1.isJsxAttribute(node)) {
        throw new Error('The node must be a JsxAttribute collected by the AST parser.');
    }
    var initializer = node == null ? null : node.initializer;
    if (!initializer) {
        return '';
    }
    else if (TypeGuard_1.isStringLiteral(initializer)) {
        return initializer.text.trim();
    }
    else if (TypeGuard_1.isJsxExpression(initializer) && TypeGuard_1.isStringLiteral(initializer.expression)) {
        return initializer.expression.text;
    }
    else if (TypeGuard_1.isJsxExpression(initializer) && !initializer.expression) {
        return '';
    }
    else {
        return undefined;
    }
}
exports.getStringLiteral = getStringLiteral;
function getBooleanLiteral(node) {
    if (!TypeGuard_1.isJsxAttribute(node)) {
        throw new Error('The node must be a JsxAttribute collected by the AST parser.');
    }
    var initializer = node == null ? null : node.initializer;
    var getBooleanFromString = function (value) {
        if (value.toLowerCase() === 'true') {
            return true;
        }
        else if (value.toLowerCase() === 'false') {
            return false;
        }
        else {
            return undefined;
        }
    };
    if (TypeGuard_1.isStringLiteral(initializer)) {
        return getBooleanFromString(initializer.text);
    }
    else if (TypeGuard_1.isJsxExpression(initializer)) {
        var expression = initializer.expression;
        if (TypeGuard_1.isStringLiteral(expression)) {
            return getBooleanFromString(expression.text);
        }
        else {
            if (TypeGuard_1.isTrueKeyword(expression)) {
                return true;
            }
            else if (TypeGuard_1.isFalseKeyword(expression)) {
                return false;
            }
            else {
                return undefined;
            }
        }
    }
    return false;
}
exports.getBooleanLiteral = getBooleanLiteral;
function isEmpty(node) {
    var initializer = node == null ? null : node.initializer;
    if (initializer == null) {
        return true;
    }
    else if (TypeGuard_1.isStringLiteral(initializer)) {
        return initializer.text.trim() === '';
    }
    else if (initializer.kind === ts.SyntaxKind.Identifier) {
        return initializer.getText() === 'undefined';
    }
    else if (initializer.kind === ts.SyntaxKind.NullKeyword) {
        return true;
    }
    else if (initializer.expression != null) {
        var expression = initializer.expression;
        if (expression.kind === ts.SyntaxKind.Identifier) {
            return expression.getText() === 'undefined';
        }
        else if (expression.kind === ts.SyntaxKind.NullKeyword) {
            return true;
        }
    }
    return false;
}
exports.isEmpty = isEmpty;
function getNumericLiteral(node) {
    if (!TypeGuard_1.isJsxAttribute(node)) {
        throw new Error('The node must be a JsxAttribute collected by the AST parser.');
    }
    var initializer = node == null ? null : node.initializer;
    return TypeGuard_1.isJsxExpression(initializer) && TypeGuard_1.isNumericLiteral(initializer.expression)
        ? initializer.expression.text
        : undefined;
}
exports.getNumericLiteral = getNumericLiteral;
function getAllAttributesFromJsxElement(node) {
    var attributes;
    if (node == null) {
        return [];
    }
    else if (TypeGuard_1.isJsxElement(node)) {
        attributes = node.openingElement.attributes;
    }
    else if (TypeGuard_1.isJsxSelfClosingElement(node)) {
        attributes = node.attributes;
    }
    else if (TypeGuard_1.isJsxOpeningElement(node)) {
        attributes = node.attributes;
    }
    else {
        throw new Error('The node must be a JsxElement, JsxSelfClosingElement or JsxOpeningElement.');
    }
    return attributes;
}
exports.getAllAttributesFromJsxElement = getAllAttributesFromJsxElement;
function getJsxAttributesFromJsxElement(node) {
    var attributesDictionary = {};
    getAllAttributesFromJsxElement(node).forEach(function (attr) {
        if (TypeGuard_1.isJsxAttribute(attr)) {
            attributesDictionary[getPropName(attr).toLowerCase()] = attr;
        }
    });
    return attributesDictionary;
}
exports.getJsxAttributesFromJsxElement = getJsxAttributesFromJsxElement;
function getJsxElementFromCode(code, exceptTagName) {
    var sourceFile = ts.createSourceFile('test.tsx', code, ts.ScriptTarget.ES2015, true);
    return delintNode(sourceFile, exceptTagName);
}
exports.getJsxElementFromCode = getJsxElementFromCode;
function delintNode(node, tagName) {
    if (TypeGuard_1.isJsxElement(node) && node.openingElement.tagName.getText() === tagName) {
        return node;
    }
    else if (TypeGuard_1.isJsxSelfClosingElement(node) && node.tagName.getText() === tagName) {
        return node;
    }
    else if (!node || node.getChildCount() === 0) {
        return undefined;
    }
    return ts.forEachChild(node, function (childNode) { return delintNode(childNode, tagName); });
}
function getAncestorNode(node, ancestorTagName) {
    if (!node) {
        return undefined;
    }
    var ancestorNode = node.parent;
    if (TypeGuard_1.isJsxElement(ancestorNode) && ancestorNode.openingElement.tagName.getText() === ancestorTagName) {
        return ancestorNode;
    }
    else {
        return getAncestorNode(ancestorNode, ancestorTagName);
    }
}
exports.getAncestorNode = getAncestorNode;
//# sourceMappingURL=JsxAttribute.js.map