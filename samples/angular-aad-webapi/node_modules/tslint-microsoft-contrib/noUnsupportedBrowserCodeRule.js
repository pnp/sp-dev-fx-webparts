"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var AstUtils_1 = require("./utils/AstUtils");
var UNSPECIFIED_BROWSER_VERSION = 'unspecified version';
var JSDOC_BROWSERSPECIFIC = '@browserspecific';
var COMMENT_BROWSERSPECIFIC = 'Browser Specific:';
var FAILURE_BROWSER_STRING = 'Unsupported browser';
var FAILURE_VERSION_STRING = 'Unsupported browser version';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoUnsupportedBrowserCodeRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-unsupported-browser-code',
    type: 'maintainability',
    description: 'Avoid writing browser-specific code for unsupported browser versions',
    options: null,
    optionsDescription: '',
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Clarity'
};
exports.Rule = Rule;
var NoUnsupportedBrowserCodeRuleWalker = (function (_super) {
    __extends(NoUnsupportedBrowserCodeRuleWalker, _super);
    function NoUnsupportedBrowserCodeRuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.supportedBrowsers = _this.parseSupportedBrowsers();
        return _this;
    }
    NoUnsupportedBrowserCodeRuleWalker.prototype.visitSourceFile = function (node) {
        var _this = this;
        var scanner = ts.createScanner(ts.ScriptTarget.ES5, false, AstUtils_1.AstUtils.getLanguageVariant(node), node.text);
        Lint.scanAllTokens(scanner, function (scanner) {
            var startPos = scanner.getStartPos();
            if (_this.tokensToSkipStartEndMap[startPos] != null) {
                scanner.setTextPos(_this.tokensToSkipStartEndMap[startPos]);
                return;
            }
            var regex;
            if (scanner.getToken() === ts.SyntaxKind.MultiLineCommentTrivia) {
                regex = new RegExp(JSDOC_BROWSERSPECIFIC + "\\s*(.*)", 'gi');
            }
            else if (scanner.getToken() === ts.SyntaxKind.SingleLineCommentTrivia) {
                regex = new RegExp(COMMENT_BROWSERSPECIFIC + "\\s*(.*)", 'gi');
            }
            else {
                return;
            }
            var match;
            while ((match = regex.exec(scanner.getTokenText()))) {
                var browser = _this.parseBrowserString(match[1]);
                var startPos_1 = scanner.getTokenPos() + match.index;
                var length_1 = match[0].length;
                _this.findUnsupportedBrowserFailures(browser, startPos_1, length_1);
            }
        });
    };
    NoUnsupportedBrowserCodeRuleWalker.prototype.parseBrowserString = function (browser) {
        var regex = /([a-zA-Z ]*)(>=|<=|<|>)?\s*(\d*)/i;
        var match = browser.match(regex);
        return {
            name: match[1].trim(),
            comparison: match[2] || '=',
            version: parseInt(match[3], 10) || UNSPECIFIED_BROWSER_VERSION
        };
    };
    NoUnsupportedBrowserCodeRuleWalker.prototype.parseSupportedBrowsers = function () {
        var _this = this;
        var result = {};
        this.getOptions().forEach(function (option) {
            if (option instanceof Array) {
                option.forEach(function (browserString) {
                    var browser = _this.parseBrowserString(browserString);
                    result[browser.name.toLowerCase()] = browser;
                });
            }
        });
        return result;
    };
    NoUnsupportedBrowserCodeRuleWalker.prototype.isSupportedBrowser = function (targetBrowser) {
        return targetBrowser.name.toLowerCase() in this.supportedBrowsers;
    };
    NoUnsupportedBrowserCodeRuleWalker.prototype.isSupportedBrowserVersion = function (targetBrowser) {
        var supportedBrowser = this.supportedBrowsers[targetBrowser.name.toLowerCase()];
        if (supportedBrowser.version === UNSPECIFIED_BROWSER_VERSION) {
            return true;
        }
        switch (supportedBrowser.comparison) {
            case '>':
                return targetBrowser.version > supportedBrowser.version;
            case '>=':
                return targetBrowser.version >= supportedBrowser.version;
            case '<':
                return targetBrowser.version < supportedBrowser.version;
            case '<=':
                return targetBrowser.version <= supportedBrowser.version;
            case '=':
                return targetBrowser.version === supportedBrowser.version;
            default:
                return false;
        }
    };
    NoUnsupportedBrowserCodeRuleWalker.prototype.findUnsupportedBrowserFailures = function (targetBrowser, startPos, length) {
        if (!this.isSupportedBrowser(targetBrowser)) {
            this.addFailure(this.createFailure(startPos, length, FAILURE_BROWSER_STRING + ": " + targetBrowser.name));
        }
        else if (!this.isSupportedBrowserVersion(targetBrowser)) {
            this.addFailure(this.createFailure(startPos, length, FAILURE_VERSION_STRING + ": " + targetBrowser.name + " " + targetBrowser.version));
        }
    };
    return NoUnsupportedBrowserCodeRuleWalker;
}(Lint.SkippableTokenAwareRuleWalker));
//# sourceMappingURL=noUnsupportedBrowserCodeRule.js.map