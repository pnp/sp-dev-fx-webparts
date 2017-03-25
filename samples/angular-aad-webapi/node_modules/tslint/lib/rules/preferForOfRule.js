/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("../index");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new PreferForOfWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "prefer-for-of",
        description: "Recommends a 'for-of' loop over a standard 'for' loop if the index is only used to access the array being iterated.",
        rationale: "A for(... of ...) loop is easier to implement and read when the index is not needed.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "typescript",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Expected a 'for-of' loop instead of a 'for' loop with this simple iteration";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var PreferForOfWalker = (function (_super) {
    __extends(PreferForOfWalker, _super);
    function PreferForOfWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.incrementorMap = {};
    }
    PreferForOfWalker.prototype.visitForStatement = function (node) {
        var arrayNodeInfo = this.getForLoopHeaderInfo(node);
        var indexVariableName;
        if (arrayNodeInfo != null) {
            var indexVariable = arrayNodeInfo.indexVariable, arrayToken = arrayNodeInfo.arrayToken;
            indexVariableName = indexVariable.getText();
            // store `for` loop state
            this.incrementorMap[indexVariableName] = {
                arrayToken: arrayToken,
                endIncrementPos: node.incrementor.end,
                onlyArrayAccess: true,
            };
        }
        _super.prototype.visitForStatement.call(this, node);
        if (indexVariableName != null) {
            var incrementorState = this.incrementorMap[indexVariableName];
            if (incrementorState.onlyArrayAccess) {
                var length_1 = incrementorState.endIncrementPos - node.getStart() + 1;
                var failure = this.createFailure(node.getStart(), length_1, Rule.FAILURE_STRING);
                this.addFailure(failure);
            }
            // remove current `for` loop state
            delete this.incrementorMap[indexVariableName];
        }
    };
    PreferForOfWalker.prototype.visitIdentifier = function (node) {
        var incrementorState = this.incrementorMap[node.text];
        // check if the identifier is an iterator and is currently in the `for` loop body
        if (incrementorState != null && incrementorState.arrayToken != null && incrementorState.endIncrementPos < node.getStart()) {
            // mark `onlyArrayAccess` false if iterator is used on anything except the array in the `for` loop header
            if (node.parent.kind !== ts.SyntaxKind.ElementAccessExpression
                || incrementorState.arrayToken.getText() !== node.parent.expression.getText()) {
                incrementorState.onlyArrayAccess = false;
            }
        }
        _super.prototype.visitIdentifier.call(this, node);
    };
    // returns the iterator and array of a `for` loop if the `for` loop is basic. Otherwise, `null`
    PreferForOfWalker.prototype.getForLoopHeaderInfo = function (forLoop) {
        var indexVariableName;
        var indexVariable;
        // assign `indexVariableName` if initializer is simple and starts at 0
        if (forLoop.initializer != null && forLoop.initializer.kind === ts.SyntaxKind.VariableDeclarationList) {
            var syntaxList = forLoop.initializer.getChildAt(1);
            if (syntaxList.kind === ts.SyntaxKind.SyntaxList && syntaxList.getChildCount() === 1) {
                var assignment = syntaxList.getChildAt(0);
                if (assignment.kind === ts.SyntaxKind.VariableDeclaration) {
                    var value = assignment.getChildAt(2).getText();
                    if (value === "0") {
                        indexVariable = assignment.getChildAt(0);
                        indexVariableName = indexVariable.getText();
                    }
                }
            }
        }
        // ensure `for` condition
        if (indexVariableName == null
            || forLoop.condition == null
            || forLoop.condition.kind !== ts.SyntaxKind.BinaryExpression
            || forLoop.condition.getChildAt(0).getText() !== indexVariableName
            || forLoop.condition.getChildAt(1).getText() !== "<") {
            return null;
        }
        if (!this.isIncremented(forLoop.incrementor, indexVariableName)) {
            return null;
        }
        // ensure that the condition checks a `length` property
        var conditionRight = forLoop.condition.getChildAt(2);
        if (conditionRight.kind === ts.SyntaxKind.PropertyAccessExpression) {
            var propertyAccess = conditionRight;
            if (propertyAccess.name.getText() === "length") {
                return { indexVariable: indexVariable, arrayToken: propertyAccess.expression };
            }
        }
        return null;
    };
    PreferForOfWalker.prototype.isIncremented = function (node, indexVariableName) {
        if (node == null) {
            return false;
        }
        // ensure variable is incremented
        if (node.kind === ts.SyntaxKind.PrefixUnaryExpression) {
            var incrementor = node;
            if (incrementor.operator === ts.SyntaxKind.PlusPlusToken && incrementor.operand.getText() === indexVariableName) {
                // x++
                return true;
            }
        }
        else if (node.kind === ts.SyntaxKind.PostfixUnaryExpression) {
            var incrementor = node;
            if (incrementor.operator === ts.SyntaxKind.PlusPlusToken && incrementor.operand.getText() === indexVariableName) {
                // ++x
                return true;
            }
        }
        else if (node.kind === ts.SyntaxKind.BinaryExpression) {
            var binaryExpression = node;
            if (binaryExpression.operatorToken.getText() === "+="
                && binaryExpression.left.getText() === indexVariableName
                && binaryExpression.right.getText() === "1") {
                // x += 1
                return true;
            }
            if (binaryExpression.operatorToken.getText() === "="
                && binaryExpression.left.getText() === indexVariableName) {
                var addExpression = binaryExpression.right;
                if (addExpression.operatorToken.getText() === "+") {
                    if (addExpression.right.getText() === indexVariableName && addExpression.left.getText() === "1") {
                        // x = 1 + x
                        return true;
                    }
                    else if (addExpression.left.getText() === indexVariableName && addExpression.right.getText() === "1") {
                        // x = x + 1
                        return true;
                    }
                }
            }
        }
        else {
            return false;
        }
        return false;
    };
    return PreferForOfWalker;
}(Lint.RuleWalker));
