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
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoHttpStringWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-http-string',
    type: 'maintainability',
    description: 'Do not use strings that start with \'http:\'. URL strings should start with \'https:\'. ',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Mandatory',
    group: 'Security',
    recommendation: '[true, "http://www.example.com/?.*", "http://www.examples.com/?.*"],',
    commonWeaknessEnumeration: '319'
};
Rule.FAILURE_STRING = 'Forbidden http url in string: ';
exports.Rule = Rule;
var NoHttpStringWalker = (function (_super) {
    __extends(NoHttpStringWalker, _super);
    function NoHttpStringWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoHttpStringWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.StringLiteral) {
            var stringText = node.text;
            if (/.*http:.*/.test(stringText)) {
                if (!this.isSuppressed(stringText)) {
                    var failureString = Rule.FAILURE_STRING + '\'' + stringText + '\'';
                    var failure = this.createFailure(node.getStart(), node.getWidth(), failureString);
                    this.addFailure(failure);
                }
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    NoHttpStringWalker.prototype.isSuppressed = function (stringText) {
        var allExceptions = NoHttpStringWalker.getExceptions(this.getOptions());
        return Utils_1.Utils.exists(allExceptions, function (exception) {
            return new RegExp(exception).test(stringText);
        });
    };
    NoHttpStringWalker.getExceptions = function (options) {
        if (options.ruleArguments instanceof Array) {
            return options.ruleArguments[0];
        }
        if (options instanceof Array) {
            return options;
        }
        return null;
    };
    return NoHttpStringWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noHttpStringRule.js.map