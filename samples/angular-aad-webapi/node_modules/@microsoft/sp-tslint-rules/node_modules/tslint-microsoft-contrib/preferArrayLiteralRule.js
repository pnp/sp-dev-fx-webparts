"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var AstUtils_1 = require("./utils/AstUtils");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoGenericArrayWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'prefer-array-literal',
    type: 'maintainability',
    description: 'Use array literal syntax when declaring or instantiating array types.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Moderate',
    level: 'Opportunity for Excellence',
    group: 'Clarity',
    commonWeaknessEnumeration: '398, 710'
};
Rule.GENERICS_FAILURE_STRING = 'Replace generic-typed Array with array literal: ';
Rule.CONSTRUCTOR_FAILURE_STRING = 'Replace Array constructor with an array literal: ';
exports.Rule = Rule;
var NoGenericArrayWalker = (function (_super) {
    __extends(NoGenericArrayWalker, _super);
    function NoGenericArrayWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.allowTypeParameters = false;
        _this.getOptions().forEach(function (opt) {
            if (typeof (opt) === 'object') {
                _this.allowTypeParameters = opt['allow-type-parameters'] === true;
            }
        });
        return _this;
    }
    NoGenericArrayWalker.prototype.visitTypeReference = function (node) {
        if (this.allowTypeParameters === false) {
            if (node.typeName.text === 'Array') {
                var failureString = Rule.GENERICS_FAILURE_STRING + node.getText();
                var failure = this.createFailure(node.getStart(), node.getWidth(), failureString);
                this.addFailure(failure);
            }
        }
        _super.prototype.visitTypeReference.call(this, node);
    };
    NoGenericArrayWalker.prototype.visitNewExpression = function (node) {
        var functionName = AstUtils_1.AstUtils.getFunctionName(node);
        if (functionName === 'Array') {
            var failureString = Rule.CONSTRUCTOR_FAILURE_STRING + node.getText();
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), failureString));
        }
        _super.prototype.visitNewExpression.call(this, node);
    };
    return NoGenericArrayWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=preferArrayLiteralRule.js.map