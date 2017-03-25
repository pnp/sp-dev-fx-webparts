"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var AstUtils_1 = require("./utils/AstUtils");
var Utils_1 = require("./utils/Utils");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new MaxFunctionBodyLengthRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'max-func-body-length',
    type: 'maintainability',
    description: 'Avoid long functions.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Moderate',
    level: 'Opportunity for Excellence',
    group: 'Clarity',
    recommendation: '[true, 100, {"ignore-parameters-to-function-regex": "describe"}],',
    commonWeaknessEnumeration: '398, 710'
};
exports.Rule = Rule;
var FUNC_BODY_LENGTH = 'func-body-length';
var FUNC_EXPRESSION_BODY_LENGTH = 'func-express-body-length';
var ARROW_BODY_LENGTH = 'arrow-body-length';
var METHOD_BODY_LENGTH = 'method-body-length';
var CTOR_BODY_LENGTH = 'ctor-body-length';
var IGNORE_PARAMETERS_TO_FUNCTION = 'ignore-parameters-to-function-regex';
var IGNORE_COMMENTS = 'ignore-comments';
var MaxFunctionBodyLengthRuleWalker = (function (_super) {
    __extends(MaxFunctionBodyLengthRuleWalker, _super);
    function MaxFunctionBodyLengthRuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.ignoreNodes = [];
        _this.parseOptions();
        return _this;
    }
    MaxFunctionBodyLengthRuleWalker.prototype.visitCallExpression = function (node) {
        var _this = this;
        var functionName = AstUtils_1.AstUtils.getFunctionName(node);
        if (this.ignoreParametersToFunctionRegex && this.ignoreParametersToFunctionRegex.test(functionName)) {
            node.arguments.forEach(function (argument) {
                _this.ignoreNodes.push(argument);
            });
            _super.prototype.visitCallExpression.call(this, node);
            this.ignoreNodes = Utils_1.Utils.removeAll(this.ignoreNodes, node.arguments);
        }
        else {
            _super.prototype.visitCallExpression.call(this, node);
        }
    };
    MaxFunctionBodyLengthRuleWalker.prototype.visitArrowFunction = function (node) {
        this.validate(node);
        _super.prototype.visitArrowFunction.call(this, node);
    };
    MaxFunctionBodyLengthRuleWalker.prototype.visitMethodDeclaration = function (node) {
        this.validate(node);
        _super.prototype.visitMethodDeclaration.call(this, node);
    };
    MaxFunctionBodyLengthRuleWalker.prototype.visitFunctionDeclaration = function (node) {
        this.validate(node);
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    MaxFunctionBodyLengthRuleWalker.prototype.visitFunctionExpression = function (node) {
        this.validate(node);
        _super.prototype.visitFunctionExpression.call(this, node);
    };
    MaxFunctionBodyLengthRuleWalker.prototype.visitConstructorDeclaration = function (node) {
        this.validate(node);
        _super.prototype.visitConstructorDeclaration.call(this, node);
    };
    MaxFunctionBodyLengthRuleWalker.prototype.visitClassDeclaration = function (node) {
        this.currentClassName = node.name.text;
        _super.prototype.visitClassDeclaration.call(this, node);
        this.currentClassName = undefined;
    };
    MaxFunctionBodyLengthRuleWalker.prototype.validate = function (node) {
        if (!Utils_1.Utils.contains(this.ignoreNodes, node)) {
            var bodyLength = this.calcBodyLength(node);
            if (this.ignoreComments) {
                bodyLength -= this.calcBodyCommentLength(node);
            }
            if (this.isFunctionTooLong(node.kind, bodyLength)) {
                this.addFuncBodyTooLongFailure(node, bodyLength);
            }
        }
    };
    MaxFunctionBodyLengthRuleWalker.prototype.calcBodyLength = function (node) {
        if (node.body == null) {
            return 0;
        }
        var sourceFile = this.getSourceFile();
        var startLine = sourceFile.getLineAndCharacterOfPosition(node.body.pos).line;
        var endLine = sourceFile.getLineAndCharacterOfPosition(node.body.end).line;
        return endLine - startLine;
    };
    MaxFunctionBodyLengthRuleWalker.prototype.calcBodyCommentLength = function (node) {
        var commentLineCount = 0;
        commentLineCount += node.getFullText()
            .split(/\n/)
            .filter(function (line) {
            return line.trim().match(/^\/\//) !== null;
        })
            .length;
        var scanner = ts.createScanner(ts.ScriptTarget.ES5, false, ts.LanguageVariant.Standard, node.getText());
        Lint.scanAllTokens(scanner, function (scanner) {
            if (scanner.getToken() === ts.SyntaxKind.MultiLineCommentTrivia) {
                commentLineCount += scanner.getTokenText().split(/\n/).length;
            }
        });
        return commentLineCount;
    };
    MaxFunctionBodyLengthRuleWalker.prototype.isFunctionTooLong = function (nodeKind, length) {
        return length > this.getMaxLength(nodeKind);
    };
    MaxFunctionBodyLengthRuleWalker.prototype.parseOptions = function () {
        var _this = this;
        this.getOptions().forEach(function (opt) {
            if (typeof (opt) === 'number') {
                _this.maxBodyLength = opt;
                return;
            }
            if (typeof (opt) === 'object') {
                _this.maxFuncBodyLength = opt[FUNC_BODY_LENGTH];
                _this.maxFuncExpressionBodyLength = opt[FUNC_EXPRESSION_BODY_LENGTH];
                _this.maxArrowBodyLength = opt[ARROW_BODY_LENGTH];
                _this.maxMethodBodyLength = opt[METHOD_BODY_LENGTH];
                _this.maxCtorBodyLength = opt[CTOR_BODY_LENGTH];
                _this.ignoreComments = opt[IGNORE_COMMENTS];
                var regex = opt[IGNORE_PARAMETERS_TO_FUNCTION];
                if (regex) {
                    _this.ignoreParametersToFunctionRegex = new RegExp(regex);
                }
            }
        });
    };
    MaxFunctionBodyLengthRuleWalker.prototype.addFuncBodyTooLongFailure = function (node, length) {
        var failure = this.createFailure(node.getStart(), node.getWidth(), this.formatFailureText(node, length));
        this.addFailure(failure);
    };
    MaxFunctionBodyLengthRuleWalker.prototype.formatFailureText = function (node, length) {
        var funcTypeText = this.getFuncTypeText(node.kind);
        var maxLength = this.getMaxLength(node.kind);
        var placeText = this.formatPlaceText(node);
        return "Max " + funcTypeText + " body length exceeded" + placeText + " - max: " + maxLength + ", actual: " + length;
    };
    MaxFunctionBodyLengthRuleWalker.prototype.formatPlaceText = function (node) {
        var funcTypeText = this.getFuncTypeText(node.kind);
        if (node.kind === ts.SyntaxKind.MethodDeclaration ||
            node.kind === ts.SyntaxKind.FunctionDeclaration ||
            node.kind === ts.SyntaxKind.FunctionExpression) {
            return " in " + funcTypeText + " " + (node.name || { text: '' }).text + "()";
        }
        else if (node.kind === ts.SyntaxKind.Constructor) {
            return " in class " + this.currentClassName;
        }
        return '';
    };
    MaxFunctionBodyLengthRuleWalker.prototype.getFuncTypeText = function (nodeKind) {
        if (nodeKind === ts.SyntaxKind.FunctionDeclaration) {
            return 'function';
        }
        else if (nodeKind === ts.SyntaxKind.FunctionExpression) {
            return 'function expression';
        }
        else if (nodeKind === ts.SyntaxKind.MethodDeclaration) {
            return 'method';
        }
        else if (nodeKind === ts.SyntaxKind.ArrowFunction) {
            return 'arrow function';
        }
        else if (nodeKind === ts.SyntaxKind.Constructor) {
            return 'constructor';
        }
        else {
            throw new Error("Unsupported node kind: " + nodeKind);
        }
    };
    MaxFunctionBodyLengthRuleWalker.prototype.getMaxLength = function (nodeKind) {
        var result;
        if (nodeKind === ts.SyntaxKind.FunctionDeclaration) {
            result = this.maxFuncBodyLength;
        }
        else if (nodeKind === ts.SyntaxKind.FunctionExpression) {
            result = this.maxFuncExpressionBodyLength;
        }
        else if (nodeKind === ts.SyntaxKind.MethodDeclaration) {
            result = this.maxMethodBodyLength;
        }
        else if (nodeKind === ts.SyntaxKind.ArrowFunction) {
            result = this.maxArrowBodyLength;
        }
        else if (nodeKind === ts.SyntaxKind.Constructor) {
            result = this.maxCtorBodyLength;
        }
        else {
            throw new Error("Unsupported node kind: " + nodeKind);
        }
        return result || this.maxBodyLength;
    };
    return MaxFunctionBodyLengthRuleWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=maxFuncBodyLengthRule.js.map