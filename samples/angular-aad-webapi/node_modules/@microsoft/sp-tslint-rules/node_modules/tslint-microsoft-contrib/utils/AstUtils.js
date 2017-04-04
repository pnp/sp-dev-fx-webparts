"use strict";
var ts = require("typescript");
var AstUtils;
(function (AstUtils) {
    function getLanguageVariant(node) {
        if (/.*\.tsx/i.test(node.fileName)) {
            return ts.LanguageVariant.JSX;
        }
        else {
            return ts.LanguageVariant.Standard;
        }
    }
    AstUtils.getLanguageVariant = getLanguageVariant;
    function getFunctionName(node) {
        var expression = node.expression;
        var functionName = expression.text;
        if (functionName === undefined && expression.name) {
            functionName = expression.name.text;
        }
        return functionName;
    }
    AstUtils.getFunctionName = getFunctionName;
    function getFunctionTarget(expression) {
        if (expression.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
            var propExp = expression.expression;
            return propExp.expression.getText();
        }
        return null;
    }
    AstUtils.getFunctionTarget = getFunctionTarget;
    function isJQuery(functionTarget) {
        return functionTarget === '$' || /^(jquery)$/i.test(functionTarget);
    }
    AstUtils.isJQuery = isJQuery;
    function hasModifier(modifiers, modifierKind) {
        if (modifiers == null) {
            return false;
        }
        var result = false;
        modifiers.forEach(function (modifier) {
            if (modifier.kind === modifierKind) {
                result = true;
            }
        });
        return result;
    }
    AstUtils.hasModifier = hasModifier;
    function dumpTypeInfo(expression, languageServices, typeChecker) {
        console.log(expression.getFullText());
        console.log('\tkind: ' + expression.kind);
        if (expression.kind === ts.SyntaxKind.Identifier
            || expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
            var definitionInfo = languageServices.getDefinitionAtPosition('file.ts', expression.getStart());
            if (definitionInfo) {
                definitionInfo.forEach(function (definitionInfo, index) {
                    console.log('\tdefinitionInfo-' + index);
                    console.log('\t\tkind: ' + definitionInfo.kind);
                    console.log('\t\tname: ' + definitionInfo.name);
                });
            }
            var typeInfo = languageServices.getTypeDefinitionAtPosition('file.ts', expression.getStart());
            if (typeInfo) {
                typeInfo.forEach(function (definitionInfo, index) {
                    console.log('\ttypeDefinitionInfo-' + index);
                    console.log('\t\tkind: ' + definitionInfo.kind);
                    console.log('\t\tname: ' + definitionInfo.name);
                });
            }
            var quickInfo = languageServices.getQuickInfoAtPosition('file.ts', expression.getStart());
            console.log('\tquickInfo.kind         = ' + quickInfo.kind);
            console.log('\tquickInfo.kindModifiers= ' + quickInfo.kindModifiers);
            console.log('\tquickInfo.textSpan     = ' + quickInfo.textSpan.start);
            console.log('\tquickInfo.displayParts = ' + quickInfo.displayParts[0].text);
            console.log('\tquickInfo.displayParts = ' + quickInfo.displayParts[0].kind);
            var expressionType = typeChecker.getTypeAtLocation(expression);
            console.log('\ttypeChecker.typeToString : ' + typeChecker.typeToString(expressionType));
            console.log('\ttype.flags: ' + expressionType.flags);
            console.log('\ttype.symbol: ' + expressionType.symbol);
            var expressionSymbol = typeChecker.getSymbolAtLocation(expression);
            if (expressionSymbol == null) {
                console.log('\tsymbol: ' + expressionSymbol);
            }
            else {
                console.log('\tsymbol.flags: ' + expressionSymbol.flags);
                console.log('\tsymbol.name: ' + expressionSymbol.name);
                console.log('\tsymbol.declarations: ' + expressionSymbol.declarations);
            }
            var contextualType = typeChecker.getContextualType(expression);
            if (contextualType == null) {
                console.log('\tcontextualType: ' + contextualType);
            }
            else {
                console.log('\tcontextualType.flags: ' + contextualType.flags);
                console.log('\tcontextualType.symbol: ' + contextualType.symbol);
            }
        }
    }
    AstUtils.dumpTypeInfo = dumpTypeInfo;
    function isPrivate(node) {
        if (ts.NodeFlags.Private != null) {
            return !!(node.flags & ts.NodeFlags.Private);
        }
        else {
            return !!(ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Private);
        }
    }
    AstUtils.isPrivate = isPrivate;
    function isProtected(node) {
        if (ts.NodeFlags.Protected != null) {
            return !!(node.flags & ts.NodeFlags.Protected);
        }
        else {
            return !!(ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Protected);
        }
    }
    AstUtils.isProtected = isProtected;
    function isPublic(node) {
        if (ts.NodeFlags.Public != null) {
            return !!(node.flags & ts.NodeFlags.Public);
        }
        else {
            return !!(ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Public);
        }
    }
    AstUtils.isPublic = isPublic;
    function isStatic(node) {
        if (ts.NodeFlags.Static != null) {
            return !!(node.flags & ts.NodeFlags.Static);
        }
        else {
            return !!(ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Static);
        }
    }
    AstUtils.isStatic = isStatic;
    function isBindingPattern(node) {
        return node != null && (node.kind === ts.SyntaxKind.ArrayBindingPattern ||
            node.kind === ts.SyntaxKind.ObjectBindingPattern);
    }
    function walkUpBindingElementsAndPatterns(node) {
        while (node && (node.kind === ts.SyntaxKind.BindingElement || isBindingPattern(node))) {
            node = node.parent;
        }
        return node;
    }
    function getCombinedNodeFlags(node) {
        node = walkUpBindingElementsAndPatterns(node);
        var flags = node.flags;
        if (node.kind === ts.SyntaxKind.VariableDeclaration) {
            node = node.parent;
        }
        if (node && node.kind === ts.SyntaxKind.VariableDeclarationList) {
            flags |= node.flags;
            node = node.parent;
        }
        if (node && node.kind === ts.SyntaxKind.VariableStatement) {
            flags |= node.flags;
        }
        return flags;
    }
    function isLet(node) {
        return !!(getCombinedNodeFlags(node) & ts.NodeFlags.Let);
    }
    AstUtils.isLet = isLet;
    function isExported(node) {
        if (ts.NodeFlags.Export != null) {
            return !!(getCombinedNodeFlags(node) & ts.NodeFlags.Export);
        }
        else {
            return !!(getCombinedNodeFlags(node) & ts.NodeFlags.ExportContext);
        }
    }
    AstUtils.isExported = isExported;
    function isAssignmentOperator(token) {
        return token >= ts.SyntaxKind.FirstAssignment && token <= ts.SyntaxKind.LastAssignment;
    }
    AstUtils.isAssignmentOperator = isAssignmentOperator;
    function isBindingLiteralExpression(node) {
        return (!!node) &&
            (node.kind === ts.SyntaxKind.ObjectLiteralExpression || node.kind === ts.SyntaxKind.ArrayLiteralExpression);
    }
    AstUtils.isBindingLiteralExpression = isBindingLiteralExpression;
    function findParentBlock(child) {
        var parent = child.parent;
        while (parent != null) {
            if (parent.kind === ts.SyntaxKind.Block) {
                return parent;
            }
            parent = parent.parent;
        }
        throw new Error('Could not determine parent block of node: ' + child);
    }
    AstUtils.findParentBlock = findParentBlock;
    function isSameIdentifer(source, target) {
        if (source == null || target == null) {
            return false;
        }
        if (source.kind === ts.SyntaxKind.Identifier && target.kind === ts.SyntaxKind.Identifier) {
            return source.getText() === target.getText();
        }
        return false;
    }
    AstUtils.isSameIdentifer = isSameIdentifer;
    function getDeclaredMethodNames(node) {
        var result = [];
        node.members.forEach(function (classElement) {
            if (classElement.kind === ts.SyntaxKind.MethodDeclaration) {
                var methodDeclaration = classElement;
                if (methodDeclaration.name.kind === ts.SyntaxKind.Identifier) {
                    result.push(methodDeclaration.name.text);
                }
            }
        });
        return result;
    }
    AstUtils.getDeclaredMethodNames = getDeclaredMethodNames;
    function isDeclarationFunctionType(node) {
        if (node.type != null) {
            if (node.type.getText() === 'Function') {
                return true;
            }
            return node.type.kind === ts.SyntaxKind.FunctionType;
        }
        else if (node.initializer != null) {
            return (node.initializer.kind === ts.SyntaxKind.ArrowFunction
                || node.initializer.kind === ts.SyntaxKind.FunctionExpression);
        }
        return false;
    }
    AstUtils.isDeclarationFunctionType = isDeclarationFunctionType;
    function isUndefined(node) {
        if (node != null) {
            if (node.kind === ts.SyntaxKind.Identifier) {
                return node.getText() === 'undefined';
            }
        }
        return false;
    }
    AstUtils.isUndefined = isUndefined;
    function isConstant(node) {
        if (node == null) {
            return false;
        }
        return node.kind === ts.SyntaxKind.NullKeyword
            || node.kind === ts.SyntaxKind.StringLiteral
            || node.kind === ts.SyntaxKind.FalseKeyword
            || node.kind === ts.SyntaxKind.TrueKeyword
            || node.kind === ts.SyntaxKind.NumericLiteral;
    }
    AstUtils.isConstant = isConstant;
    function isConstantExpression(node) {
        if (node.kind === ts.SyntaxKind.BinaryExpression) {
            var expression = node;
            var kind = expression.operatorToken.kind;
            if (kind >= ts.SyntaxKind.FirstBinaryOperator && kind <= ts.SyntaxKind.LastBinaryOperator) {
                return isConstantExpression(expression.left) && isConstantExpression(expression.right);
            }
        }
        if (node.kind === ts.SyntaxKind.PrefixUnaryExpression || node.kind === ts.SyntaxKind.PostfixUnaryExpression) {
            var expression = node;
            return isConstantExpression(expression.operand);
        }
        return isConstant(node);
    }
    AstUtils.isConstantExpression = isConstantExpression;
})(AstUtils = exports.AstUtils || (exports.AstUtils = {}));
//# sourceMappingURL=AstUtils.js.map