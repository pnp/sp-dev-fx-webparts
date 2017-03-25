"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var noOctalLiteral = new NoOctalLiteral(sourceFile, this.getOptions());
        return this.applyWithWalker(noOctalLiteral);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-octal-literal',
    type: 'maintainability',
    description: 'Do not use octal literals or escaped octal sequences',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Mandatory',
    group: 'Security'
};
Rule.FAILURE_STRING = 'Octal literals should not be used: ';
exports.Rule = Rule;
var NoOctalLiteral = (function (_super) {
    __extends(NoOctalLiteral, _super);
    function NoOctalLiteral() {
        return _super.apply(this, arguments) || this;
    }
    NoOctalLiteral.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.StringLiteral) {
            this.failOnOctalString(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    NoOctalLiteral.prototype.failOnOctalString = function (node) {
        var match = /("|')(.*(\\-?[0-7]{1,3}(?![0-9])).*("|'))/g.exec(node.getText());
        if (match) {
            var octalValue = match[3];
            var startOfMatch = node.getStart() + node.getText().indexOf(octalValue);
            var width = octalValue.length;
            this.addFailure(this.createFailure(startOfMatch, width, Rule.FAILURE_STRING + octalValue));
        }
    };
    return NoOctalLiteral;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noOctalLiteralRule.js.map