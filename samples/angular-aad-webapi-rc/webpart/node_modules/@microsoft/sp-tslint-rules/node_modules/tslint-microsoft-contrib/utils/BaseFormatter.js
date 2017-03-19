'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fs = require('fs');
var abstractFormatter_1 = require('tslint/lib/language/formatter/abstractFormatter');
var BaseFormatter = (function (_super) {
    __extends(BaseFormatter, _super);
    function BaseFormatter(ruleName, applyFix) {
        _super.call(this);
        this.ruleName = ruleName;
        this.applyFix = applyFix;
    }
    BaseFormatter.prototype.format = function (allFailures) {
        for (var index = allFailures.length - 1; index >= 0; index--) {
            var failure = allFailures[index];
            if (failure.getRuleName() === this.ruleName) {
                this.applyFix(failure);
            }
        }
        var outputLines = allFailures.map(this.formatFailure);
        return outputLines.join('\n') + '\n';
    };
    BaseFormatter.prototype.readFile = function (fileName) {
        return fs.readFileSync(fileName, { encoding: 'UTF-8' });
    };
    BaseFormatter.prototype.writeFile = function (fileName, fileContents) {
        fs.writeFileSync(fileName, fileContents, { encoding: 'UTF-8' });
    };
    BaseFormatter.prototype.formatFailure = function (failure) {
        var fileName = failure.getFileName();
        var failureString = failure.getFailure();
        var ruleName = failure.getRuleName();
        var lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
        var positionTuple = '[' + (lineAndCharacter.line + 1) + ', ' + (lineAndCharacter.character + 1) + ']';
        return '(' + ruleName + ') ' + fileName + positionTuple + ': ' + failureString;
    };
    return BaseFormatter;
}(abstractFormatter_1.AbstractFormatter));
exports.BaseFormatter = BaseFormatter;
//# sourceMappingURL=BaseFormatter.js.map