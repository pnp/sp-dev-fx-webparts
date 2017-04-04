"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var AstUtils_1 = require("./utils/AstUtils");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new PreferConstWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'prefer-const',
    type: 'maintainability',
    description: 'Use const to declare variables if they are only assigned a value once.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Important',
    level: 'Opportunity for Excellence',
    group: 'Clarity',
    commonWeaknessEnumeration: '398, 705, 710'
};
Rule.FAILURE_STRING_FACTORY = function (identifier) { return "Identifier '" + identifier + "' never appears " +
    'on the LHS of an assignment - use const instead of let for its declaration.'; };
exports.Rule = Rule;
var PreferConstWalker = (function (_super) {
    __extends(PreferConstWalker, _super);
    function PreferConstWalker() {
        var _this = _super.apply(this, arguments) || this;
        _this.inScopeLetDeclarations = [];
        _this.errors = [];
        return _this;
    }
    PreferConstWalker.prototype.visitSourceFile = function (node) {
        var _this = this;
        this.visitAnyStatementList(node.statements);
        _super.prototype.visitSourceFile.call(this, node);
        this.popDeclarations();
        this.errors.sort(function (a, b) {
            return a.getStartPosition().getPosition() - b.getStartPosition().getPosition();
        }).forEach(function (e) { return _this.addFailure(e); });
    };
    PreferConstWalker.prototype.visitBinaryExpression = function (node) {
        if (AstUtils_1.AstUtils.isAssignmentOperator(node.operatorToken.kind)) {
            this.visitLeftHandSideExpression(node.left);
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    PreferConstWalker.prototype.visitPrefixUnaryExpression = function (node) {
        this.visitAnyUnaryExpression(node);
        _super.prototype.visitPrefixUnaryExpression.call(this, node);
    };
    PreferConstWalker.prototype.visitPostfixUnaryExpression = function (node) {
        this.visitAnyUnaryExpression(node);
        _super.prototype.visitPostfixUnaryExpression.call(this, node);
    };
    PreferConstWalker.prototype.visitModuleDeclaration = function (node) {
        if (node.body.kind === ts.SyntaxKind.ModuleBlock) {
            this.visitBlock(node.body);
        }
        _super.prototype.visitModuleDeclaration.call(this, node);
    };
    PreferConstWalker.prototype.visitForOfStatement = function (node) {
        this.visitAnyForStatement(node);
        _super.prototype.visitForOfStatement.call(this, node);
        this.popDeclarations();
    };
    PreferConstWalker.prototype.visitForInStatement = function (node) {
        this.visitAnyForStatement(node);
        _super.prototype.visitForInStatement.call(this, node);
        this.popDeclarations();
    };
    PreferConstWalker.prototype.visitBlock = function (node) {
        this.visitAnyStatementList(node.statements);
        _super.prototype.visitBlock.call(this, node);
        this.popDeclarations();
    };
    PreferConstWalker.prototype.visitAnyStatementList = function (statements) {
        var _this = this;
        var names = {};
        statements.forEach(function (statement) {
            if (statement.kind === ts.SyntaxKind.VariableStatement) {
                _this.collectLetIdentifiers(statement.declarationList, names);
            }
        });
        this.inScopeLetDeclarations.push(names);
    };
    PreferConstWalker.prototype.visitAnyForStatement = function (node) {
        var names = {};
        if (AstUtils_1.AstUtils.isLet(node.initializer)) {
            if (node.initializer.kind === ts.SyntaxKind.VariableDeclarationList) {
                this.collectLetIdentifiers(node.initializer, names);
            }
        }
        this.inScopeLetDeclarations.push(names);
    };
    PreferConstWalker.prototype.popDeclarations = function () {
        var _this = this;
        var completed = this.inScopeLetDeclarations.pop();
        Object.keys(completed).forEach(function (name) {
            if (Object.hasOwnProperty.call(completed, name)) {
                var element = completed[name];
                if (element.usages === 0) {
                    _this.errors.push(_this.createFailure(element.declaration.getStart(_this.getSourceFile()), element.declaration.getWidth(_this.getSourceFile()), Rule.FAILURE_STRING_FACTORY(name)));
                }
            }
        });
    };
    PreferConstWalker.prototype.visitAnyUnaryExpression = function (node) {
        if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) {
            this.visitLeftHandSideExpression(node.operand);
        }
    };
    PreferConstWalker.prototype.collectLetIdentifiers = function (list, ret) {
        var _this = this;
        list.declarations.forEach(function (node) {
            if (AstUtils_1.AstUtils.isLet(node) && !AstUtils_1.AstUtils.isExported(node)) {
                _this.collectNameIdentifiers(node, node.name, ret);
            }
        });
    };
    PreferConstWalker.prototype.visitLeftHandSideExpression = function (node) {
        while (node.kind === ts.SyntaxKind.ParenthesizedExpression) {
            node = node.expression;
        }
        if (node.kind === ts.SyntaxKind.Identifier) {
            this.markAssignment(node);
        }
        else if (AstUtils_1.AstUtils.isBindingLiteralExpression(node)) {
            this.visitBindingLiteralExpression(node);
        }
    };
    PreferConstWalker.prototype.visitBindingLiteralExpression = function (node) {
        var _this = this;
        if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
            var pattern = node;
            pattern.properties.forEach(function (element) {
                var kind = element.kind;
                if (kind === ts.SyntaxKind.ShorthandPropertyAssignment) {
                    _this.markAssignment(element.name);
                }
                else if (kind === ts.SyntaxKind.PropertyAssignment) {
                    _this.visitLeftHandSideExpression(element.initializer);
                }
            });
        }
        else if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {
            var pattern = node;
            pattern.elements.forEach(function (element) {
                _this.visitLeftHandSideExpression(element);
            });
        }
    };
    PreferConstWalker.prototype.visitBindingPatternIdentifiers = function (pattern) {
        var _this = this;
        if (pattern.kind === ts.SyntaxKind.ObjectBindingPattern) {
            var objPattern = pattern;
            objPattern.elements.forEach(function (element) {
                if (element.kind === ts.SyntaxKind.OmittedExpression) {
                    return;
                }
                else if (element.name.kind === ts.SyntaxKind.Identifier) {
                    _this.markAssignment(element.name);
                }
                else {
                    _this.visitBindingPatternIdentifiers(element.name);
                }
            });
        }
    };
    PreferConstWalker.prototype.markAssignment = function (identifier) {
        var name = identifier.text;
        for (var i = this.inScopeLetDeclarations.length - 1; i >= 0; i--) {
            var declarations = this.inScopeLetDeclarations[i];
            if (declarations[name]) {
                declarations[name].usages += 1;
                break;
            }
        }
    };
    PreferConstWalker.prototype.collectNameIdentifiers = function (declaration, node, table) {
        if (node.kind === ts.SyntaxKind.Identifier) {
            table[node.text] = { declaration: declaration, usages: 0 };
        }
        else {
            this.collectBindingPatternIdentifiers(declaration, node, table);
        }
    };
    PreferConstWalker.prototype.collectBindingPatternIdentifiers = function (value, pattern, table) {
        var _this = this;
        if (pattern.kind === ts.SyntaxKind.ObjectBindingPattern) {
            var objPattern = pattern;
            objPattern.elements.forEach(function (element) {
                if (element.kind === ts.SyntaxKind.OmittedExpression) {
                    return;
                }
                _this.collectNameIdentifiers(value, element.name, table);
            });
        }
    };
    return PreferConstWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=preferConstRule.js.map