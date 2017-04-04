"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var BannedTermWalker_1 = require("./utils/BannedTermWalker");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new BannedTermWalker_1.BannedTermWalker(sourceFile, this.getOptions(), Rule.FAILURE_STRING, Rule.BANNED_TERMS);
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-reserved-keywords',
    type: 'maintainability',
    description: 'Do not use reserved keywords as names of local variables, fields, functions, or other identifiers.',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Mandatory',
    group: 'Security',
    commonWeaknessEnumeration: '398'
};
Rule.FAILURE_STRING = 'Forbidden reference to reserved keyword: ';
Rule.BANNED_TERMS = [
    'break', 'case', 'catch', 'class',
    'const', 'continue', 'debugger', 'default',
    'delete', 'do', 'else', 'enum', 'export',
    'extends', 'false', 'finally', 'for',
    'function', 'if', 'import', 'in',
    'instanceof', 'new', 'null', 'return',
    'super', 'switch', 'this', 'throw',
    'true', 'try', 'typeof', 'var',
    'void', 'while', 'with',
    'as', 'implements', 'interface', 'let',
    'package', 'private', 'protected',
    'public', 'static', 'yield',
    'any', 'boolean', 'constructor',
    'declare', 'get', 'module',
    'require', 'number', 'set',
    'string', 'symbol', 'type',
    'from', 'of'
];
exports.Rule = Rule;
//# sourceMappingURL=noReservedKeywordsRule.js.map