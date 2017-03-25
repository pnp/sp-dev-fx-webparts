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
        return this.applyWithWalker(new NoUnnecessarySemicolonsWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = 'unnecessary semi-colon';
Rule.metadata = {
    ruleName: 'no-unnecessary-semicolons',
    type: 'maintainability',
    description: 'Remove unnecessary semicolons',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Moderate',
    level: 'Opportunity for Excellence',
    group: 'Whitespace',
    commonWeaknessEnumeration: '398, 710'
};
exports.Rule = Rule;
var NoUnnecessarySemicolonsWalker = (function (_super) {
    __extends(NoUnnecessarySemicolonsWalker, _super);
    function NoUnnecessarySemicolonsWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoUnnecessarySemicolonsWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.EmptyStatement) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        _super.prototype.visitNode.call(this, node);
    };
    NoUnnecessarySemicolonsWalker.prototype.visitForStatement = function (node) {
        if (node.statement.kind === ts.SyntaxKind.EmptyStatement) {
            if (node.initializer) {
                this.visitNode(node.initializer);
            }
            if (node.condition) {
                this.visitNode(node.condition);
            }
            if (node.incrementor) {
                this.visitNode(node.incrementor);
            }
        }
        else {
            _super.prototype.visitForStatement.call(this, node);
        }
    };
    NoUnnecessarySemicolonsWalker.prototype.visitWhileStatement = function (node) {
        if (node.statement.kind === ts.SyntaxKind.EmptyStatement) {
            this.visitNode(node.expression);
        }
        else {
            _super.prototype.visitWhileStatement.call(this, node);
        }
    };
    return NoUnnecessarySemicolonsWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noUnnecessarySemicolonsRule.js.map