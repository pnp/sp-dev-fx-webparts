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
var scopeAwareRuleWalker_1 = require("./scopeAwareRuleWalker");
/**
 * An AST walker that is aware of block scopes in addition to regular scopes. Block scopes
 * are a superset of regular scopes (new block scopes are created more frequently in a program).
 */
var BlockScopeAwareRuleWalker = (function (_super) {
    __extends(BlockScopeAwareRuleWalker, _super);
    function BlockScopeAwareRuleWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        // initialize stack with global scope
        this.blockScopeStack = [this.createBlockScope()];
    }
    BlockScopeAwareRuleWalker.prototype.getCurrentBlockScope = function () {
        return this.blockScopeStack[this.blockScopeStack.length - 1];
    };
    // callback notifier when a block scope begins
    BlockScopeAwareRuleWalker.prototype.onBlockScopeStart = function () {
        return;
    };
    BlockScopeAwareRuleWalker.prototype.getCurrentBlockDepth = function () {
        return this.blockScopeStack.length;
    };
    // callback notifier when a block scope ends
    BlockScopeAwareRuleWalker.prototype.onBlockScopeEnd = function () {
        return;
    };
    BlockScopeAwareRuleWalker.prototype.visitNode = function (node) {
        var isNewBlockScope = this.isBlockScopeBoundary(node);
        if (isNewBlockScope) {
            this.blockScopeStack.push(this.createBlockScope());
        }
        this.onBlockScopeStart();
        _super.prototype.visitNode.call(this, node);
        this.onBlockScopeEnd();
        if (isNewBlockScope) {
            this.blockScopeStack.pop();
        }
    };
    BlockScopeAwareRuleWalker.prototype.isBlockScopeBoundary = function (node) {
        return _super.prototype.isScopeBoundary.call(this, node)
            || node.kind === ts.SyntaxKind.DoStatement
            || node.kind === ts.SyntaxKind.WhileStatement
            || node.kind === ts.SyntaxKind.ForStatement
            || node.kind === ts.SyntaxKind.ForInStatement
            || node.kind === ts.SyntaxKind.ForOfStatement
            || node.kind === ts.SyntaxKind.WithStatement
            || node.kind === ts.SyntaxKind.SwitchStatement
            || (node.parent != null
                && (node.parent.kind === ts.SyntaxKind.TryStatement
                    || node.parent.kind === ts.SyntaxKind.IfStatement))
            || (node.kind === ts.SyntaxKind.Block && node.parent != null
                && (node.parent.kind === ts.SyntaxKind.Block
                    || node.parent.kind === ts.SyntaxKind.SourceFile));
    };
    return BlockScopeAwareRuleWalker;
}(scopeAwareRuleWalker_1.ScopeAwareRuleWalker));
exports.BlockScopeAwareRuleWalker = BlockScopeAwareRuleWalker;
