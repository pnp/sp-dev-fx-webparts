"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var Utils_1 = require("./utils/Utils");
var PROPS_REGEX = 'props-interface-regex';
var STATE_REGEX = 'state-interface-regex';
var FAILURE_UNUSED_PROP = 'Unused React property defined in interface: ';
var FAILURE_UNUSED_STATE = 'Unused React state defined in interface: ';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        if (sourceFile.languageVariant === ts.LanguageVariant.JSX) {
            return this.applyWithWalker(new ReactUnusedPropsAndStateRuleWalker(sourceFile, this.getOptions()));
        }
        else {
            return [];
        }
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'react-unused-props-and-state',
    type: 'maintainability',
    description: 'Remove unneeded properties defined in React Props and State interfaces',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Correctness',
    commonWeaknessEnumeration: '398'
};
exports.Rule = Rule;
var ReactUnusedPropsAndStateRuleWalker = (function (_super) {
    __extends(ReactUnusedPropsAndStateRuleWalker, _super);
    function ReactUnusedPropsAndStateRuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.propNames = [];
        _this.propNodes = {};
        _this.stateNames = [];
        _this.stateNodes = {};
        _this.classDeclarations = [];
        _this.propsInterfaceRegex = /^Props$/;
        _this.stateInterfaceRegex = /^State$/;
        _this.getOptions().forEach(function (opt) {
            if (typeof (opt) === 'object') {
                _this.propsInterfaceRegex = _this.getOptionOrDefault(opt, PROPS_REGEX, _this.propsInterfaceRegex);
                _this.stateInterfaceRegex = _this.getOptionOrDefault(opt, STATE_REGEX, _this.stateInterfaceRegex);
            }
        });
        return _this;
    }
    ReactUnusedPropsAndStateRuleWalker.prototype.getOptionOrDefault = function (option, key, defaultValue) {
        try {
            if (option[key] != null) {
                return new RegExp(option[key]);
            }
        }
        catch (e) {
            console.error('Could not read ' + key + ' within react-unused-props-and-state-name configuration');
        }
        return defaultValue;
    };
    ReactUnusedPropsAndStateRuleWalker.prototype.visitSourceFile = function (node) {
        var _this = this;
        _super.prototype.visitSourceFile.call(this, node);
        if (this.propNames.length > 0 || this.stateNames.length > 0) {
            this.classDeclarations.forEach(this.walkChildren, this);
        }
        this.propNames.forEach(function (propName) {
            var typeElement = _this.propNodes[propName];
            _this.addFailure(_this.createFailure(typeElement.getStart(), typeElement.getWidth(), FAILURE_UNUSED_PROP + propName));
        });
        this.stateNames.forEach(function (stateName) {
            var typeElement = _this.stateNodes[stateName];
            _this.addFailure(_this.createFailure(typeElement.getStart(), typeElement.getWidth(), FAILURE_UNUSED_STATE + stateName));
        });
    };
    ReactUnusedPropsAndStateRuleWalker.prototype.visitClassDeclaration = function (node) {
        this.classDeclarations.push(node);
    };
    ReactUnusedPropsAndStateRuleWalker.prototype.visitInterfaceDeclaration = function (node) {
        if (this.propsInterfaceRegex.test(node.name.text)) {
            this.propNodes = this.getTypeElementData(node);
            this.propNames = Object.keys(this.propNodes);
        }
        if (this.stateInterfaceRegex.test(node.name.text)) {
            this.stateNodes = this.getTypeElementData(node);
            this.stateNames = Object.keys(this.stateNodes);
        }
        _super.prototype.visitInterfaceDeclaration.call(this, node);
    };
    ReactUnusedPropsAndStateRuleWalker.prototype.visitPropertyAccessExpression = function (node) {
        var referencedPropertyName = node.getText();
        if (/this\.props\..*/.test(referencedPropertyName)) {
            this.propNames = Utils_1.Utils.remove(this.propNames, referencedPropertyName.substring(11));
        }
        else if (/this\.state\..*/.test(referencedPropertyName)) {
            this.stateNames = Utils_1.Utils.remove(this.stateNames, referencedPropertyName.substring(11));
        }
        if (this.propsAlias != null) {
            if (new RegExp(this.propsAlias + '\\..*').test(referencedPropertyName)) {
                this.propNames = Utils_1.Utils.remove(this.propNames, referencedPropertyName.substring(this.propsAlias.length + 1));
            }
        }
        if (this.stateAlias != null) {
            if (new RegExp(this.stateAlias + '\\..*').test(referencedPropertyName)) {
                this.stateNames = Utils_1.Utils.remove(this.stateNames, referencedPropertyName.substring(this.stateAlias.length + 1));
            }
        }
        if (node.parent.kind !== ts.SyntaxKind.PropertyAccessExpression) {
            if (referencedPropertyName === 'this.props') {
                this.propNames = [];
            }
            else if (referencedPropertyName === 'this.state') {
                this.stateNames = [];
            }
        }
        _super.prototype.visitPropertyAccessExpression.call(this, node);
    };
    ReactUnusedPropsAndStateRuleWalker.prototype.visitIdentifier = function (node) {
        if (this.propsAlias != null) {
            if (node.text === this.propsAlias
                && node.parent.kind !== ts.SyntaxKind.PropertyAccessExpression
                && node.parent.kind !== ts.SyntaxKind.Parameter
                && this.isParentNodeSuperCall(node) === false) {
                this.propNames = [];
            }
        }
        if (this.stateAlias != null) {
            if (node.text === this.stateAlias
                && node.parent.kind !== ts.SyntaxKind.PropertyAccessExpression
                && node.parent.kind !== ts.SyntaxKind.Parameter) {
                this.stateNames = [];
            }
        }
        _super.prototype.visitIdentifier.call(this, node);
    };
    ReactUnusedPropsAndStateRuleWalker.prototype.visitConstructorDeclaration = function (node) {
        if (node.parameters.length > 0) {
            this.propsAlias = node.parameters[0].name.text;
        }
        _super.prototype.visitConstructorDeclaration.call(this, node);
        this.propsAlias = undefined;
    };
    ReactUnusedPropsAndStateRuleWalker.prototype.visitMethodDeclaration = function (node) {
        var methodName = node.name.text;
        if (/componentWillReceiveProps|shouldComponentUpdate|componentWillUpdate|componentDidUpdate/.test(methodName)
            && node.parameters.length > 0) {
            this.propsAlias = node.parameters[0].name.text;
        }
        if (/shouldComponentUpdate|componentWillUpdate|componentDidUpdate/.test(methodName)
            && node.parameters.length > 1) {
            this.stateAlias = node.parameters[1].name.text;
        }
        _super.prototype.visitMethodDeclaration.call(this, node);
        this.propsAlias = undefined;
        this.stateAlias = undefined;
    };
    ReactUnusedPropsAndStateRuleWalker.prototype.getTypeElementData = function (node) {
        var result = {};
        node.members.forEach(function (typeElement) {
            if (typeElement.name != null && typeElement.name.text != null) {
                result[typeElement.name.text] = typeElement;
            }
        });
        return result;
    };
    ReactUnusedPropsAndStateRuleWalker.prototype.isParentNodeSuperCall = function (node) {
        if (node.parent != null && node.parent.kind === ts.SyntaxKind.CallExpression) {
            var call = node.parent;
            return call.expression.getText() === 'super';
        }
        return false;
    };
    return ReactUnusedPropsAndStateRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=reactUnusedPropsAndStateRule.js.map