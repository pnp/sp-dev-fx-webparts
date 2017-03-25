"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstractFormatter_1 = require("../language/formatter/abstractFormatter");
var Utils = require("../utils");
var Formatter = (function (_super) {
    __extends(Formatter, _super);
    function Formatter() {
        _super.apply(this, arguments);
    }
    /* tslint:enable:object-literal-sort-keys */
    Formatter.prototype.format = function (failures) {
        var output = '<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3">';
        if (failures.length) {
            output += "<file name=\"" + this.escapeXml(failures[0].getFileName()) + "\">";
            for (var _i = 0, failures_1 = failures; _i < failures_1.length; _i++) {
                var failure = failures_1[_i];
                output += "<error line=\"" + (failure.getStartPosition().getLineAndCharacter().line + 1) + "\" ";
                output += "column=\"" + (failure.getStartPosition().getLineAndCharacter().character + 1) + "\" ";
                output += "severity=\"warning\" ";
                output += "message=\"" + this.escapeXml(failure.getFailure()) + "\" ";
                // checkstyle parser wants "source" to have structure like <anything>dot<category>dot<type>
                output += "source=\"failure.tslint." + this.escapeXml(failure.getRuleName()) + "\" />";
            }
            output += "</file>";
        }
        output += "</checkstyle>";
        return output;
    };
    Formatter.prototype.escapeXml = function (str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/'/g, "&#39;")
            .replace(/"/g, "&quot;");
    };
    /* tslint:disable:object-literal-sort-keys */
    Formatter.metadata = {
        formatterName: "checkstyle",
        description: "Formats errors as through they were Checkstyle output.",
        descriptionDetails: (_a = ["\n            Imitates the XMLLogger from Checkstyle 4.3. All failures have the 'warning' severity."], _a.raw = ["\n            Imitates the XMLLogger from Checkstyle 4.3. All failures have the 'warning' severity."], Utils.dedent(_a)),
        sample: (_b = ["\n        <?xml version=\"1.0\" encoding=\"utf-8\"?>\n        <checkstyle version=\"4.3\">\n            <file name=\"myFile.ts\">\n                <error line=\"1\" column=\"14\" severity=\"warning\" message=\"Missing semicolon\" source=\"failure.tslint.semicolon\" />\n            </file>\n        </checkstyle>"], _b.raw = ["\n        <?xml version=\"1.0\" encoding=\"utf-8\"?>\n        <checkstyle version=\"4.3\">\n            <file name=\"myFile.ts\">\n                <error line=\"1\" column=\"14\" severity=\"warning\" message=\"Missing semicolon\" source=\"failure.tslint.semicolon\" />\n            </file>\n        </checkstyle>"], Utils.dedent(_b)),
        consumer: "machine",
    };
    return Formatter;
    var _a, _b;
}(abstractFormatter_1.AbstractFormatter));
exports.Formatter = Formatter;
