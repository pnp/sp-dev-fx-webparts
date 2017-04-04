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
        return this.applyWithWalker(new NoConstructWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-construct",
        description: "Disallows access to the constructors of `String`, `Number`, and `Boolean`.",
        descriptionDetails: "Disallows constructor use such as `new Number(foo)` but does not disallow `Number(foo)`.",
        rationale: (_a = ["\n            There is little reason to use `String`, `Number`, or `Boolean` as constructors.\n            In almost all cases, the regular function-call version is more appropriate.\n            [More details](http://stackoverflow.com/q/4719320/3124288) are available on StackOverflow."], _a.raw = ["\n            There is little reason to use \\`String\\`, \\`Number\\`, or \\`Boolean\\` as constructors.\n            In almost all cases, the regular function-call version is more appropriate.\n            [More details](http://stackoverflow.com/q/4719320/3124288) are available on StackOverflow."], Lint.Utils.dedent(_a)),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Forbidden constructor, use a literal or simple function call instead";
    return Rule;
    var _a;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoConstructWalker = (function (_super) {
    __extends(NoConstructWalker, _super);
    function NoConstructWalker() {
        _super.apply(this, arguments);
    }
    NoConstructWalker.prototype.visitNewExpression = function (node) {
        if (node.expression.kind === ts.SyntaxKind.Identifier) {
            var identifier = node.expression;
            var constructorName = identifier.text;
            if (NoConstructWalker.FORBIDDEN_CONSTRUCTORS.indexOf(constructorName) !== -1) {
                var failure = this.createFailure(node.getStart(), identifier.getEnd() - node.getStart(), Rule.FAILURE_STRING);
                this.addFailure(failure);
            }
        }
        _super.prototype.visitNewExpression.call(this, node);
    };
    NoConstructWalker.FORBIDDEN_CONSTRUCTORS = [
        "Boolean",
        "Number",
        "String",
    ];
    return NoConstructWalker;
}(Lint.RuleWalker));
