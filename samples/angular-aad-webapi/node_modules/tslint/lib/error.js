/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
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
/**
 * Used to exit the program and display a friendly message without the callstack.
 */
var FatalError = (function (_super) {
    __extends(FatalError, _super);
    function FatalError(message, innerError) {
        _super.call(this, message);
        this.message = message;
        this.innerError = innerError;
        this.name = FatalError.NAME;
        this.stack = new Error().stack;
    }
    FatalError.NAME = "FatalError";
    return FatalError;
}(Error));
exports.FatalError = FatalError;
