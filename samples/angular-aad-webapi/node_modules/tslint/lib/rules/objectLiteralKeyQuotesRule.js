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
        var objectLiteralKeyQuotesWalker = new ObjectLiteralKeyQuotesWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(objectLiteralKeyQuotesWalker);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "object-literal-key-quotes",
        description: "Enforces consistent object literal property quote style.",
        descriptionDetails: (_a = ["\n            Object literal property names can be defined in two ways: using literals or using strings.\n            For example, these two objects are equivalent:\n\n            var object1 = {\n                property: true\n            };\n\n            var object2 = {\n                \"property\": true\n            };\n\n            In many cases, it doesn\u2019t matter if you choose to use an identifier instead of a string\n            or vice-versa. Even so, you might decide to enforce a consistent style in your code.\n\n            This rules lets you enforce consistent quoting of property names. Either they should always\n            be quoted (default behavior) or quoted only as needed (\"as-needed\")."], _a.raw = ["\n            Object literal property names can be defined in two ways: using literals or using strings.\n            For example, these two objects are equivalent:\n\n            var object1 = {\n                property: true\n            };\n\n            var object2 = {\n                \"property\": true\n            };\n\n            In many cases, it doesn’t matter if you choose to use an identifier instead of a string\n            or vice-versa. Even so, you might decide to enforce a consistent style in your code.\n\n            This rules lets you enforce consistent quoting of property names. Either they should always\n            be quoted (default behavior) or quoted only as needed (\"as-needed\")."], Lint.Utils.dedent(_a)),
        optionsDescription: (_b = ["\n            Possible settings are:\n\n            * `\"always\"`: Property names should always be quoted. (This is the default.)\n            * `\"as-needed\"`: Only property names which require quotes may be quoted (e.g. those with spaces in them).\n            * `\"consistent\"`: Property names should either all be quoted or unquoted.\n            * `\"consistent-as-needed\"`: If any property name requires quotes, then all properties must be quoted. Otherwise, no \n            property names may be quoted.\n\n            For ES6, computed property names (`{[name]: value}`) and methods (`{foo() {}}`) never need\n            to be quoted."], _b.raw = ["\n            Possible settings are:\n\n            * \\`\"always\"\\`: Property names should always be quoted. (This is the default.)\n            * \\`\"as-needed\"\\`: Only property names which require quotes may be quoted (e.g. those with spaces in them).\n            * \\`\"consistent\"\\`: Property names should either all be quoted or unquoted.\n            * \\`\"consistent-as-needed\"\\`: If any property name requires quotes, then all properties must be quoted. Otherwise, no \n            property names may be quoted.\n\n            For ES6, computed property names (\\`{[name]: value}\\`) and methods (\\`{foo() {}}\\`) never need\n            to be quoted."], Lint.Utils.dedent(_b)),
        options: {
            type: "string",
            enum: ["always", "as-needed", "consistent", "consistent-as-needed"],
        },
        optionExamples: ["[true, \"as-needed\"]", "[true, \"always\"]"],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.INCONSISTENT_PROPERTY = "All property names in this object literal must be consistently quoted or unquoted.";
    Rule.UNNEEDED_QUOTES = function (name) {
        return "Unnecessarily quoted property '" + name + "' found.";
    };
    Rule.UNQUOTED_PROPERTY = function (name) {
        return "Unquoted property '" + name + "' found.";
    };
    return Rule;
    var _a, _b;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
// This is simplistic. See https://mothereff.in/js-properties for the gorey details.
var IDENTIFIER_NAME_REGEX = /^(?:[\$A-Z_a-z])+$/;
var NUMBER_REGEX = /^[0-9]+$/;
var ObjectLiteralKeyQuotesWalker = (function (_super) {
    __extends(ObjectLiteralKeyQuotesWalker, _super);
    function ObjectLiteralKeyQuotesWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.mode = this.getOptions()[0] || "always";
    }
    ObjectLiteralKeyQuotesWalker.prototype.visitPropertyAssignment = function (node) {
        var name = node.name;
        if (name.kind !== ts.SyntaxKind.StringLiteral &&
            name.kind !== ts.SyntaxKind.ComputedPropertyName) {
            var errorText = Rule.UNQUOTED_PROPERTY(name.getText());
            this.currentState.unquotedProperties.push(this.createFailure(name.getStart(), name.getWidth(), errorText));
        }
        if (name.kind === ts.SyntaxKind.StringLiteral) {
            // Check if the quoting is necessary.
            var stringNode = name;
            var property = stringNode.text;
            var isIdentifier = IDENTIFIER_NAME_REGEX.test(property);
            var isNumber = NUMBER_REGEX.test(property);
            if (isIdentifier || (isNumber && Number(property).toString() === property)) {
                var errorText = Rule.UNNEEDED_QUOTES(property);
                var failure = this.createFailure(stringNode.getStart(), stringNode.getWidth(), errorText);
                this.currentState.quotesNotNeededProperties.push(failure);
            }
            else {
                this.currentState.hasQuotesNeededProperty = true;
            }
        }
        _super.prototype.visitPropertyAssignment.call(this, node);
    };
    ObjectLiteralKeyQuotesWalker.prototype.visitObjectLiteralExpression = function (node) {
        var state = {
            hasQuotesNeededProperty: false,
            quotesNotNeededProperties: [],
            unquotedProperties: [],
        };
        // a nested object literal should store its parent state to restore when finished
        var previousState = this.currentState;
        this.currentState = state;
        _super.prototype.visitObjectLiteralExpression.call(this, node);
        if (this.mode === "always" || (this.mode === "consistent-as-needed" && state.hasQuotesNeededProperty)) {
            for (var _i = 0, _a = state.unquotedProperties; _i < _a.length; _i++) {
                var failure = _a[_i];
                this.addFailure(failure);
            }
        }
        else if (this.mode === "as-needed" || (this.mode === "consistent-as-needed" && !state.hasQuotesNeededProperty)) {
            for (var _b = 0, _c = state.quotesNotNeededProperties; _b < _c.length; _b++) {
                var failure = _c[_b];
                this.addFailure(failure);
            }
        }
        else if (this.mode === "consistent") {
            var hasQuotedProperties = state.hasQuotesNeededProperty || state.quotesNotNeededProperties.length > 0;
            var hasUnquotedProperties = state.unquotedProperties.length > 0;
            if (hasQuotedProperties && hasUnquotedProperties) {
                this.addFailure(this.createFailure(node.getStart(), 1, Rule.INCONSISTENT_PROPERTY));
            }
        }
        this.currentState = previousState;
    };
    return ObjectLiteralKeyQuotesWalker;
}(Lint.RuleWalker));
