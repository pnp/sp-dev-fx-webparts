/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
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
var abstractFormatter_1 = require("../language/formatter/abstractFormatter");
var Formatter = (function (_super) {
    __extends(Formatter, _super);
    function Formatter() {
        _super.apply(this, arguments);
    }
    /* tslint:enable:object-literal-sort-keys */
    Formatter.prototype.format = function (failures, fixes) {
        if (failures.length === 0 && (!fixes || fixes.length === 0)) {
            return "";
        }
        var fixLines = [];
        if (fixes) {
            var perFileFixes_1 = {};
            for (var _i = 0, fixes_1 = fixes; _i < fixes_1.length; _i++) {
                var fix = fixes_1[_i];
                if (perFileFixes_1[fix.getFileName()] == null) {
                    perFileFixes_1[fix.getFileName()] = 1;
                }
                else {
                    perFileFixes_1[fix.getFileName()]++;
                }
            }
            Object.keys(perFileFixes_1).forEach(function (fixedFile) {
                var fixCount = perFileFixes_1[fixedFile];
                fixLines.push("Fixed " + fixCount + " error(s) in " + fixedFile);
            });
            fixLines.push(""); // add a blank line between fixes and failures
        }
        var errorLines = failures.map(function (failure) {
            var fileName = failure.getFileName();
            var failureString = failure.getFailure();
            var lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
            var positionTuple = "[" + (lineAndCharacter.line + 1) + ", " + (lineAndCharacter.character + 1) + "]";
            return "" + fileName + positionTuple + ": " + failureString;
        });
        return fixLines.concat(errorLines).join("\n") + "\n";
    };
    /* tslint:disable:object-literal-sort-keys */
    Formatter.metadata = {
        formatterName: "prose",
        description: "The default formatter which outputs simple human-readable messages.",
        sample: "myFile.ts[1, 14]: Missing semicolon",
        consumer: "human",
    };
    return Formatter;
}(abstractFormatter_1.AbstractFormatter));
exports.Formatter = Formatter;
