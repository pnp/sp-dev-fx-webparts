/**
 * @license
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var underscore_string_1 = require("underscore.string");
var abstractFormatter_1 = require("../language/formatter/abstractFormatter");
var Utils = require("../utils");
var Formatter = (function (_super) {
    __extends(Formatter, _super);
    function Formatter() {
        _super.apply(this, arguments);
    }
    /* tslint:enable:object-literal-sort-keys */
    Formatter.prototype.format = function (failures) {
        var outputLines = failures.map(function (failure) {
            var fileName = failure.getFileName();
            var failureString = failure.getFailure();
            var camelizedRule = underscore_string_1.camelize(failure.getRuleName());
            var lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
            var positionTuple = "(" + (lineAndCharacter.line + 1) + "," + (lineAndCharacter.character + 1) + ")";
            return "" + fileName + positionTuple + ": warning " + camelizedRule + ": " + failureString;
        });
        return outputLines.join("\n") + "\n";
    };
    /* tslint:disable:object-literal-sort-keys */
    Formatter.metadata = {
        formatterName: "msbuild",
        description: "Formats errors for consumption by msbuild.",
        descriptionDetails: (_a = ["\n            The output is compatible with both msbuild and Visual Studio. All failures have the\n            'warning' severity."], _a.raw = ["\n            The output is compatible with both msbuild and Visual Studio. All failures have the\n            'warning' severity."], Utils.dedent(_a)),
        sample: "myFile.ts(1,14): warning: Missing semicolon",
        consumer: "machine",
    };
    return Formatter;
    var _a;
}(abstractFormatter_1.AbstractFormatter));
exports.Formatter = Formatter;
