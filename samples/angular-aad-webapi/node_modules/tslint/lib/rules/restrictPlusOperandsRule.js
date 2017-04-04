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
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithWalker(new RestrictPlusOperandsWalker(sourceFile, this.getOptions(), program));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "restrict-plus-operands",
        description: "When adding two variables, operands must both be of type number or of type string.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "functionality",
        typescriptOnly: false,
        requiresTypeInfo: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.MISMATCHED_TYPES_FAILURE = "Types of values used in '+' operation must match";
    Rule.UNSUPPORTED_TYPE_FAILURE_FACTORY = function (type) {
        return "cannot add type " + type;
    };
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
var RestrictPlusOperandsWalker = (function (_super) {
    __extends(RestrictPlusOperandsWalker, _super);
    function RestrictPlusOperandsWalker() {
        _super.apply(this, arguments);
    }
    RestrictPlusOperandsWalker.prototype.visitBinaryExpression = function (node) {
        if (node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
            var tc = this.getTypeChecker();
            var leftType = tc.typeToString(tc.getTypeAtLocation(node.left));
            var rightType = tc.typeToString(tc.getTypeAtLocation(node.right));
            var width = node.getWidth();
            var position = node.getStart();
            if (leftType !== rightType) {
                // mismatched types
                this.addFailure(this.createFailure(position, width, Rule.MISMATCHED_TYPES_FAILURE));
            }
            else if (leftType !== "number" && leftType !== "string") {
                // adding unsupported types
                var failureString = Rule.UNSUPPORTED_TYPE_FAILURE_FACTORY(leftType);
                this.addFailure(this.createFailure(position, width, failureString));
            }
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    return RestrictPlusOperandsWalker;
}(Lint.ProgramAwareRuleWalker));
