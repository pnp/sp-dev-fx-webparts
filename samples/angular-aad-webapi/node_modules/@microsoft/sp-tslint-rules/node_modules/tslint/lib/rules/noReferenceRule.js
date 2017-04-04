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
var Lint = require("../index");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoReferenceWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-reference",
        description: "Disallows `/// <reference path=>` imports (use ES6-style imports instead).",
        rationale: (_a = ["\n            Using `/// <reference path=>` comments to load other files is outdated.\n            Use ES6-style imports to reference other files."], _a.raw = ["\n            Using \\`/// <reference path=>\\` comments to load other files is outdated.\n            Use ES6-style imports to reference other files."], Lint.Utils.dedent(_a)),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "typescript",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "<reference> is not allowed, use imports";
    return Rule;
    var _a;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoReferenceWalker = (function (_super) {
    __extends(NoReferenceWalker, _super);
    function NoReferenceWalker() {
        _super.apply(this, arguments);
    }
    NoReferenceWalker.prototype.visitSourceFile = function (node) {
        for (var _i = 0, _a = node.referencedFiles; _i < _a.length; _i++) {
            var ref = _a[_i];
            this.addFailure(this.createFailure(ref.pos, ref.end - ref.pos, Rule.FAILURE_STRING));
        }
    };
    return NoReferenceWalker;
}(Lint.RuleWalker));
