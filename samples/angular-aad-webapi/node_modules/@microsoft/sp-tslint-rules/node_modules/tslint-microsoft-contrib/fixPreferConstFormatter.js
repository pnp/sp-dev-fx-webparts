'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseFormatter_1 = require("./utils/BaseFormatter");
var Formatter = (function (_super) {
    __extends(Formatter, _super);
    function Formatter() {
        return _super.call(this, 'prefer-const', function (failure) {
            var fileName = failure.getFileName();
            var fileContents = this.readFile(fileName);
            var start = failure.getStartPosition().getPosition();
            var leftSide = fileContents.substring(0, start);
            leftSide = leftSide.replace(/let(\s*)$/, 'const$1');
            var rightSide = fileContents.substring(start);
            var newContent = leftSide + rightSide;
            this.writeFile(fileName, newContent);
            console.log('Automatically converting var/let to const. Please re-compile and re-lint: ' + fileName);
        }) || this;
    }
    return Formatter;
}(BaseFormatter_1.BaseFormatter));
exports.Formatter = Formatter;
//# sourceMappingURL=fixPreferConstFormatter.js.map