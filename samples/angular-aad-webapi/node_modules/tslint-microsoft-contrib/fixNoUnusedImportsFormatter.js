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
        return _super.call(this, 'no-unused-imports', function (failure) {
            var fileName = failure.getFileName();
            var start = failure.getStartPosition();
            var end = failure.getEndPosition();
            var fileContents = this.readFile(fileName);
            var startOfViolation = fileContents.lastIndexOf('\n', start.getPosition());
            if (startOfViolation === -1) {
                startOfViolation = 0;
            }
            var endOfViolation = fileContents.indexOf('\n', end.getPosition());
            var line = fileContents.substring(startOfViolation, endOfViolation);
            line = line.trim();
            line = line.replace(/\(/, '\\(').replace(/\)/, '\\)');
            var regex = new RegExp('\\n*' + line + '\\n*', 'mg');
            if (startOfViolation === 0) {
                fileContents = fileContents.replace(regex, '');
            }
            else {
                fileContents = fileContents.replace(regex, '\n');
            }
            this.writeFile(fileName, fileContents);
            console.log('Automatically removing unused import. Please re-compile and re-lint: ' + fileName);
        }) || this;
    }
    return Formatter;
}(BaseFormatter_1.BaseFormatter));
exports.Formatter = Formatter;
//# sourceMappingURL=fixNoUnusedImportsFormatter.js.map