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
        return this.applyWithWalker(new NoDocumentWriteWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-document-write',
    type: 'maintainability',
    description: 'Do not use document.write',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Mandatory',
    group: 'Security',
    commonWeaknessEnumeration: '79, 85'
};
Rule.WRITE_FAILURE = 'Forbidden call to document.write';
Rule.WRITELN_FAILURE = 'Forbidden call to document.writeln';
exports.Rule = Rule;
var NoDocumentWriteWalker = (function (_super) {
    __extends(NoDocumentWriteWalker, _super);
    function NoDocumentWriteWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoDocumentWriteWalker.prototype.visitCallExpression = function (node) {
        var functionTarget = AstUtils_1.AstUtils.getFunctionTarget(node);
        if (functionTarget === 'document' || functionTarget === 'window.document') {
            if (node.arguments.length === 1) {
                var functionName = AstUtils_1.AstUtils.getFunctionName(node);
                if (functionName === 'write') {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.WRITE_FAILURE));
                }
                else if (functionName === 'writeln') {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.WRITELN_FAILURE));
                }
            }
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    return NoDocumentWriteWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
//# sourceMappingURL=noDocumentWriteRule.js.map