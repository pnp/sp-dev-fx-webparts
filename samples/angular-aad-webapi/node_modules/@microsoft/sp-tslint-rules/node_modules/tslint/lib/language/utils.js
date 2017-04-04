/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
var path = require("path");
var ts = require("typescript");
function getSourceFile(fileName, source) {
    var normalizedName = path.normalize(fileName).replace(/\\/g, "/");
    var compilerOptions = createCompilerOptions();
    var compilerHost = {
        fileExists: function () { return true; },
        getCanonicalFileName: function (filename) { return filename; },
        getCurrentDirectory: function () { return ""; },
        getDefaultLibFileName: function () { return "lib.d.ts"; },
        getDirectories: function (_path) { return []; },
        getNewLine: function () { return "\n"; },
        getSourceFile: function (filenameToGet) {
            if (filenameToGet === normalizedName) {
                return ts.createSourceFile(filenameToGet, source, compilerOptions.target, true);
            }
        },
        readFile: function () { return null; },
        useCaseSensitiveFileNames: function () { return true; },
        writeFile: function () { return null; },
    };
    var program = ts.createProgram([normalizedName], compilerOptions, compilerHost);
    return program.getSourceFile(normalizedName);
}
exports.getSourceFile = getSourceFile;
function createCompilerOptions() {
    return {
        allowJs: true,
        noResolve: true,
        target: ts.ScriptTarget.ES5,
    };
}
exports.createCompilerOptions = createCompilerOptions;
function doesIntersect(failure, disabledIntervals) {
    return disabledIntervals.some(function (interval) {
        var maxStart = Math.max(interval.startPosition, failure.getStartPosition().getPosition());
        var minEnd = Math.min(interval.endPosition, failure.getEndPosition().getPosition());
        return maxStart <= minEnd;
    });
}
exports.doesIntersect = doesIntersect;
function scanAllTokens(scanner, callback) {
    var lastStartPos = -1;
    while (scanner.scan() !== ts.SyntaxKind.EndOfFileToken) {
        var startPos = scanner.getStartPos();
        if (startPos === lastStartPos) {
            break;
        }
        lastStartPos = startPos;
        callback(scanner);
    }
}
exports.scanAllTokens = scanAllTokens;
/**
 * @returns true if any modifier kinds passed along exist in the given modifiers array
 */
function hasModifier(modifiers) {
    var modifierKinds = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        modifierKinds[_i - 1] = arguments[_i];
    }
    if (modifiers == null || modifierKinds == null) {
        return false;
    }
    return modifiers.some(function (m) {
        return modifierKinds.some(function (k) { return m.kind === k; });
    });
}
exports.hasModifier = hasModifier;
/**
 * Determines if the appropriate bit in the parent (VariableDeclarationList) is set,
 * which indicates this is a "let" or "const".
 */
function isBlockScopedVariable(node) {
    var parentNode = (node.kind === ts.SyntaxKind.VariableDeclaration)
        ? node.parent
        : node.declarationList;
    return isNodeFlagSet(parentNode, ts.NodeFlags.Let)
        || isNodeFlagSet(parentNode, ts.NodeFlags.Const);
}
exports.isBlockScopedVariable = isBlockScopedVariable;
function isBlockScopedBindingElement(node) {
    var variableDeclaration = getBindingElementVariableDeclaration(node);
    // if no variable declaration, it must be a function param, which is block scoped
    return (variableDeclaration == null) || isBlockScopedVariable(variableDeclaration);
}
exports.isBlockScopedBindingElement = isBlockScopedBindingElement;
function getBindingElementVariableDeclaration(node) {
    var currentParent = node.parent;
    while (currentParent.kind !== ts.SyntaxKind.VariableDeclaration) {
        if (currentParent.parent == null) {
            return null; // function parameter, no variable declaration
        }
        else {
            currentParent = currentParent.parent;
        }
    }
    return currentParent;
}
exports.getBindingElementVariableDeclaration = getBindingElementVariableDeclaration;
/**
 * @returns true if some ancestor of `node` satisfies `predicate`, including `node` itself.
 */
function someAncestor(node, predicate) {
    return predicate(node) || (node.parent && someAncestor(node.parent, predicate));
}
exports.someAncestor = someAncestor;
/**
 * Bitwise check for node flags.
 */
function isNodeFlagSet(node, flagToCheck) {
    /* tslint:disable:no-bitwise */
    return (node.flags & flagToCheck) !== 0;
    /* tslint:enable:no-bitwise */
}
exports.isNodeFlagSet = isNodeFlagSet;
/**
 * @returns true if decl is a nested module declaration, i.e. represents a segment of a dotted module path.
 */
function isNestedModuleDeclaration(decl) {
    // in a declaration expression like 'module a.b.c' - 'a' is the top level module declaration node and 'b' and 'c'
    // are nested therefore we can depend that a node's position will only match with its name's position for nested
    // nodes
    return decl.name.pos === decl.pos;
}
exports.isNestedModuleDeclaration = isNestedModuleDeclaration;
