"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var ErrorTolerantWalker_1 = require("./ErrorTolerantWalker");
var BannedTermWalker = (function (_super) {
    __extends(BannedTermWalker, _super);
    function BannedTermWalker(sourceFile, options, failureString, bannedTerms) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.allowQuotedProperties = false;
        _this.failureString = failureString;
        _this.bannedTerms = bannedTerms;
        _this.getOptions().forEach(function (opt) {
            if (typeof (opt) === 'object') {
                _this.allowQuotedProperties = opt['allow-quoted-properties'] === true;
            }
        });
        return _this;
    }
    BannedTermWalker.prototype.visitVariableDeclaration = function (node) {
        this.validateNode(node);
        _super.prototype.visitVariableDeclaration.call(this, node);
    };
    BannedTermWalker.prototype.visitFunctionDeclaration = function (node) {
        this.validateNode(node);
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    BannedTermWalker.prototype.visitPropertyDeclaration = function (node) {
        this.validateNode(node);
        _super.prototype.visitPropertyDeclaration.call(this, node);
    };
    BannedTermWalker.prototype.visitPropertySignature = function (node) {
        if (node.kind === ts.SyntaxKind.PropertySignature) {
            var signature = node;
            var propertyName = signature.name;
            if (this.allowQuotedProperties === false || propertyName.kind !== ts.SyntaxKind.StringLiteral) {
                this.validateNode(node);
            }
        }
        else {
            this.validateNode(node);
        }
        _super.prototype.visitPropertySignature.call(this, node);
    };
    BannedTermWalker.prototype.visitSetAccessor = function (node) {
        this.validateNode(node);
        _super.prototype.visitSetAccessor.call(this, node);
    };
    BannedTermWalker.prototype.visitGetAccessor = function (node) {
        this.validateNode(node);
        _super.prototype.visitGetAccessor.call(this, node);
    };
    BannedTermWalker.prototype.visitMethodDeclaration = function (node) {
        this.validateNode(node);
        _super.prototype.visitMethodDeclaration.call(this, node);
    };
    BannedTermWalker.prototype.visitParameterDeclaration = function (node) {
        if (node.name.getText() !== 'this') {
            this.validateNode(node);
        }
        _super.prototype.visitParameterDeclaration.call(this, node);
    };
    BannedTermWalker.prototype.validateNode = function (node) {
        if (node.name) {
            if (node.name.text) {
                var text = node.name.text;
                if (this.isBannedTerm(text)) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.failureString + text));
                }
            }
        }
    };
    BannedTermWalker.prototype.isBannedTerm = function (text) {
        return this.bannedTerms.indexOf(text) !== -1;
    };
    return BannedTermWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
exports.BannedTermWalker = BannedTermWalker;
//# sourceMappingURL=BannedTermWalker.js.map