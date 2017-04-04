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
var ruleWalker_1 = require("./ruleWalker");
var ProgramAwareRuleWalker = (function (_super) {
    __extends(ProgramAwareRuleWalker, _super);
    function ProgramAwareRuleWalker(sourceFile, options, program) {
        _super.call(this, sourceFile, options);
        this.program = program;
        this.typeChecker = program.getTypeChecker();
    }
    ProgramAwareRuleWalker.prototype.getProgram = function () {
        return this.program;
    };
    ProgramAwareRuleWalker.prototype.getTypeChecker = function () {
        return this.typeChecker;
    };
    return ProgramAwareRuleWalker;
}(ruleWalker_1.RuleWalker));
exports.ProgramAwareRuleWalker = ProgramAwareRuleWalker;
