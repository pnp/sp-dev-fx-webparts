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
        return this.applyWithWalker(new AdjacentOverloadSignaturesWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "adjacent-overload-signatures",
        description: "Enforces function overloads to be consecutive.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        rationale: "Improves readability and organization by grouping naturally related items together.",
        type: "typescript",
        typescriptOnly: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_FACTORY = function (name) {
        return "All '" + name + "' signatures should be adjacent";
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var AdjacentOverloadSignaturesWalker = (function (_super) {
    __extends(AdjacentOverloadSignaturesWalker, _super);
    function AdjacentOverloadSignaturesWalker() {
        _super.apply(this, arguments);
    }
    AdjacentOverloadSignaturesWalker.prototype.visitSourceFile = function (node) {
        this.visitStatements(node.statements);
        _super.prototype.visitSourceFile.call(this, node);
    };
    AdjacentOverloadSignaturesWalker.prototype.visitModuleDeclaration = function (node) {
        var body = node.body;
        if (body && body.kind === ts.SyntaxKind.ModuleBlock) {
            this.visitStatements(body.statements);
        }
        _super.prototype.visitModuleDeclaration.call(this, node);
    };
    AdjacentOverloadSignaturesWalker.prototype.visitInterfaceDeclaration = function (node) {
        this.checkOverloadsAdjacent(node.members, function (member) {
            return getTextOfPropertyName(member);
        });
        _super.prototype.visitInterfaceDeclaration.call(this, node);
    };
    AdjacentOverloadSignaturesWalker.prototype.visitClassDeclaration = function (node) {
        this.visitMembers(node.members);
        _super.prototype.visitClassDeclaration.call(this, node);
    };
    AdjacentOverloadSignaturesWalker.prototype.visitTypeLiteral = function (node) {
        this.visitMembers(node.members);
        _super.prototype.visitTypeLiteral.call(this, node);
    };
    AdjacentOverloadSignaturesWalker.prototype.visitStatements = function (statements) {
        this.checkOverloadsAdjacent(statements, function (statement) {
            if (statement.kind === ts.SyntaxKind.FunctionDeclaration) {
                var name_1 = statement.name;
                return name_1 && name_1.text;
            }
            else {
                return undefined;
            }
        });
    };
    AdjacentOverloadSignaturesWalker.prototype.visitMembers = function (members) {
        this.checkOverloadsAdjacent(members, function (member) {
            return getTextOfPropertyName(member);
        });
    };
    /** 'getOverloadName' may return undefined for nodes that cannot be overloads, e.g. a `const` declaration. */
    AdjacentOverloadSignaturesWalker.prototype.checkOverloadsAdjacent = function (overloads, getOverloadName) {
        var last = undefined;
        var seen = Object.create(null);
        for (var _i = 0, overloads_1 = overloads; _i < overloads_1.length; _i++) {
            var node = overloads_1[_i];
            var name_2 = getOverloadName(node);
            if (name_2 !== undefined) {
                if (name_2 in seen && last !== name_2) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING_FACTORY(name_2)));
                }
                seen[name_2] = true;
            }
            last = name_2;
        }
    };
    return AdjacentOverloadSignaturesWalker;
}(Lint.RuleWalker));
function isLiteralExpression(node) {
    return node.kind === ts.SyntaxKind.StringLiteral || node.kind === ts.SyntaxKind.NumericLiteral;
}
function getTextOfPropertyName(node) {
    var nameText;
    if (node.name == null) {
        return null;
    }
    switch (node.name.kind) {
        case ts.SyntaxKind.Identifier:
            nameText = node.name.text;
            break;
        case ts.SyntaxKind.ComputedPropertyName:
            var expression = node.name.expression;
            if (isLiteralExpression(expression)) {
                nameText = expression.text;
            }
            break;
        default:
            if (isLiteralExpression(node.name)) {
                nameText = node.name.text;
            }
    }
    var suffix = Lint.hasModifier(node.modifiers, ts.SyntaxKind.StaticKeyword) ? " __static__" : "";
    return nameText + suffix;
}
