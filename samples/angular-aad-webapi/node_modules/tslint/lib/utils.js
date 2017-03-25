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
/**
 * Enforces the invariant that the input is an array.
 */
function arrayify(arg) {
    if (Array.isArray(arg)) {
        return arg;
    }
    else if (arg != null) {
        return [arg];
    }
    else {
        return [];
    }
}
exports.arrayify = arrayify;
/**
 * Enforces the invariant that the input is an object.
 */
function objectify(arg) {
    if (typeof arg === "object" && arg != null) {
        return arg;
    }
    else {
        return {};
    }
}
exports.objectify = objectify;
/**
 * Removes leading indents from a template string without removing all leading whitespace
 */
function dedent(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var fullString = strings.reduce(function (accumulator, str, i) {
        return accumulator + values[i - 1] + str;
    });
    // match all leading spaces/tabs at the start of each line
    var match = fullString.match(/^[ \t]*(?=\S)/gm);
    if (!match) {
        // e.g. if the string is empty or all whitespace.
        return fullString;
    }
    // find the smallest indent, we don't want to remove all leading whitespace
    var indent = Math.min.apply(Math, match.map(function (el) { return el.length; }));
    var regexp = new RegExp("^[ \\t]{" + indent + "}", "gm");
    fullString = indent > 0 ? fullString.replace(regexp, "") : fullString;
    return fullString;
}
exports.dedent = dedent;
/**
 * Strip comments from file content.
 */
function stripComments(content) {
    /**
     * First capturing group matches double quoted string
     * Second matches single quotes string
     * Third matches block comments
     * Fourth matches line comments
     */
    var regexp = /("(?:[^\\\"]*(?:\\.)?)*")|('(?:[^\\\']*(?:\\.)?)*')|(\/\*(?:\r?\n|.)*?\*\/)|(\/{2,}.*?(?:(?:\r?\n)|$))/g;
    var result = content.replace(regexp, function (match, _m1, _m2, m3, m4) {
        // Only one of m1, m2, m3, m4 matches
        if (m3) {
            // A block comment. Replace with nothing
            return "";
        }
        else if (m4) {
            // A line comment. If it ends in \r?\n then keep it.
            var length_1 = m4.length;
            if (length_1 > 2 && m4[length_1 - 1] === "\n") {
                return m4[length_1 - 2] === "\r" ? "\r\n" : "\n";
            }
            else {
                return "";
            }
        }
        else {
            // We match a string
            return match;
        }
    });
    return result;
}
exports.stripComments = stripComments;
;
