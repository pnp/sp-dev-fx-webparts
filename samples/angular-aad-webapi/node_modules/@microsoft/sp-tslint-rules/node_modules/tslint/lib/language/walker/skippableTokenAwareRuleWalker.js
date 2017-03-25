/**
 * @license
 * Copyright 2015 Palantir Technologies, Inc.
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
var SkippableTokenAwareRuleWalker = (function (_super) {
    __extends(SkippableTokenAwareRuleWalker, _super);
    function SkippableTokenAwareRuleWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.tokensToSkipStartEndMap = {};
    }
    SkippableTokenAwareRuleWalker.prototype.visitRegularExpressionLiteral = function (node) {
        this.addTokenToSkipFromNode(node);
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    SkippableTokenAwareRuleWalker.prototype.visitIdentifier = function (node) {
        this.addTokenToSkipFromNode(node);
        _super.prototype.visitIdentifier.call(this, node);
    };
    SkippableTokenAwareRuleWalker.prototype.visitTemplateExpression = function (node) {
        this.addTokenToSkipFromNode(node);
        _super.prototype.visitTemplateExpression.call(this, node);
    };
    SkippableTokenAwareRuleWalker.prototype.addTokenToSkipFromNode = function (node) {
        if (node.getStart() < node.getEnd()) {
            // only add to the map nodes whose end comes after their start, to prevent infinite loops
            this.tokensToSkipStartEndMap[node.getStart()] = node.getEnd();
        }
    };
    return SkippableTokenAwareRuleWalker;
}(ruleWalker_1.RuleWalker));
exports.SkippableTokenAwareRuleWalker = SkippableTokenAwareRuleWalker;
