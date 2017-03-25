"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var ErrorTolerantWalker_1 = require("./ErrorTolerantWalker");
var AstUtils_1 = require("./AstUtils");
var Scope_1 = require("./Scope");
var ScopedSymbolTrackingWalker = (function (_super) {
    __extends(ScopedSymbolTrackingWalker, _super);
    function ScopedSymbolTrackingWalker(sourceFile, options, languageServices) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.languageServices = languageServices;
        _this.typeChecker = _this.languageServices.getProgram().getTypeChecker();
        return _this;
    }
    ScopedSymbolTrackingWalker.prototype.isExpressionEvaluatingToFunction = function (expression) {
        if (expression.kind === ts.SyntaxKind.ArrowFunction
            || expression.kind === ts.SyntaxKind.FunctionExpression) {
            return true;
        }
        if (expression.kind === ts.SyntaxKind.StringLiteral
            || expression.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral
            || expression.kind === ts.SyntaxKind.TemplateExpression
            || expression.kind === ts.SyntaxKind.TaggedTemplateExpression
            || expression.kind === ts.SyntaxKind.BinaryExpression) {
            return false;
        }
        if (this.scope.isFunctionSymbol(expression.getText())) {
            return true;
        }
        if (expression.kind === ts.SyntaxKind.Identifier) {
            var typeInfo = this.languageServices.getTypeDefinitionAtPosition('file.ts', expression.getStart());
            if (typeInfo != null && typeInfo[0] != null) {
                if (typeInfo[0].kind === 'function' || typeInfo[0].kind === 'local function') {
                    return true;
                }
            }
            return false;
        }
        if (expression.kind === ts.SyntaxKind.CallExpression) {
            if (expression.expression.name && expression.expression.name.getText() === 'bind') {
                return true;
            }
            try {
                var signature = this.typeChecker.getResolvedSignature(expression);
                var expressionType = this.typeChecker.getReturnTypeOfSignature(signature);
                return this.isFunctionType(expressionType, this.typeChecker);
            }
            catch (e) {
                return false;
            }
        }
        return this.isFunctionType(this.typeChecker.getTypeAtLocation(expression), this.typeChecker);
    };
    ScopedSymbolTrackingWalker.prototype.isFunctionType = function (expressionType, typeChecker) {
        var signatures = typeChecker.getSignaturesOfType(expressionType, ts.SignatureKind.Call);
        if (signatures != null && signatures.length > 0) {
            var signatureDeclaration = signatures[0].declaration;
            if (signatureDeclaration.kind === ts.SyntaxKind.FunctionType) {
                return true;
            }
        }
        return false;
    };
    ScopedSymbolTrackingWalker.prototype.visitSourceFile = function (node) {
        this.scope = new Scope_1.Scope(null);
        this.scope.addGlobalScope(node, node, this.getOptions());
        _super.prototype.visitSourceFile.call(this, node);
        this.scope = null;
    };
    ScopedSymbolTrackingWalker.prototype.visitModuleDeclaration = function (node) {
        this.scope = new Scope_1.Scope(this.scope);
        this.scope.addGlobalScope(node.body, this.getSourceFile(), this.getOptions());
        _super.prototype.visitModuleDeclaration.call(this, node);
        this.scope = this.scope.parent;
    };
    ScopedSymbolTrackingWalker.prototype.visitClassDeclaration = function (node) {
        var _this = this;
        this.scope = new Scope_1.Scope(this.scope);
        node.members.forEach(function (element) {
            var prefix = AstUtils_1.AstUtils.isStatic(element)
                ? node.name.getText() + '.'
                : 'this.';
            if (element.kind === ts.SyntaxKind.MethodDeclaration) {
                _this.scope.addFunctionSymbol(prefix + element.name.getText());
            }
            else if (element.kind === ts.SyntaxKind.PropertyDeclaration) {
                var prop = element;
                if (AstUtils_1.AstUtils.isDeclarationFunctionType(prop)) {
                    _this.scope.addFunctionSymbol(prefix + element.name.getText());
                }
                else {
                    _this.scope.addNonFunctionSymbol(prefix + element.name.getText());
                }
            }
        });
        _super.prototype.visitClassDeclaration.call(this, node);
        this.scope = this.scope.parent;
    };
    ScopedSymbolTrackingWalker.prototype.visitFunctionDeclaration = function (node) {
        this.scope = new Scope_1.Scope(this.scope);
        this.scope.addParameters(node.parameters);
        _super.prototype.visitFunctionDeclaration.call(this, node);
        this.scope = this.scope.parent;
    };
    ScopedSymbolTrackingWalker.prototype.visitConstructorDeclaration = function (node) {
        this.scope = new Scope_1.Scope(this.scope);
        this.scope.addParameters(node.parameters);
        _super.prototype.visitConstructorDeclaration.call(this, node);
        this.scope = this.scope.parent;
    };
    ScopedSymbolTrackingWalker.prototype.visitMethodDeclaration = function (node) {
        this.scope = new Scope_1.Scope(this.scope);
        this.scope.addParameters(node.parameters);
        _super.prototype.visitMethodDeclaration.call(this, node);
        this.scope = this.scope.parent;
    };
    ScopedSymbolTrackingWalker.prototype.visitArrowFunction = function (node) {
        this.scope = new Scope_1.Scope(this.scope);
        this.scope.addParameters(node.parameters);
        _super.prototype.visitArrowFunction.call(this, node);
        this.scope = this.scope.parent;
    };
    ScopedSymbolTrackingWalker.prototype.visitFunctionExpression = function (node) {
        this.scope = new Scope_1.Scope(this.scope);
        this.scope.addParameters(node.parameters);
        _super.prototype.visitFunctionExpression.call(this, node);
        this.scope = this.scope.parent;
    };
    ScopedSymbolTrackingWalker.prototype.visitSetAccessor = function (node) {
        this.scope = new Scope_1.Scope(this.scope);
        this.scope.addParameters(node.parameters);
        _super.prototype.visitSetAccessor.call(this, node);
        this.scope = this.scope.parent;
    };
    return ScopedSymbolTrackingWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
exports.ScopedSymbolTrackingWalker = ScopedSymbolTrackingWalker;
//# sourceMappingURL=ScopedSymbolTrackingWalker.js.map