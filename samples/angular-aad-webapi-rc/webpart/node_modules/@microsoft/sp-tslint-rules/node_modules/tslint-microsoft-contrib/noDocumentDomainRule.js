"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var ErrorTolerantWalker_1 = require('./utils/ErrorTolerantWalker');
var SyntaxKind_1 = require('./utils/SyntaxKind');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoDocumentDomainRuleWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'no-document-domain',
        type: 'maintainability',
        description: 'Do not write to document.domain. Scripts setting document.domain to any value should be ' +
            'validated to ensure that the value is on a list of allowed sites.',
        options: null,
        issueClass: 'SDL',
        issueType: 'Error',
        severity: 'Critical',
        level: 'Mandatory',
        group: 'Security'
    };
    Rule.FAILURE_STRING = 'Forbidden write to document.domain: ';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoDocumentDomainRuleWalker = (function (_super) {
    __extends(NoDocumentDomainRuleWalker, _super);
    function NoDocumentDomainRuleWalker() {
        _super.apply(this, arguments);
    }
    NoDocumentDomainRuleWalker.prototype.visitBinaryExpression = function (node) {
        if (node.operatorToken.getText() === '='
            && node.left.kind === SyntaxKind_1.SyntaxKind.current().PropertyAccessExpression
            && this.isDocumentDomainProperty(node.left)) {
            var msg = Rule.FAILURE_STRING + node.getFullText().trim();
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), msg));
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    NoDocumentDomainRuleWalker.prototype.isDocumentDomainProperty = function (node) {
        if (node.name.text !== 'domain') {
            return false;
        }
        return node.expression.getText() === 'document'
            || node.expression.getText() === 'window.document';
    };
    return NoDocumentDomainRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noDocumentDomainRule.js.map