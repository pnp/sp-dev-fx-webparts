"use strict";
/**
 * Base for a parser - does not actually do any parsing.
 */
var BaseParser = (function () {
    function BaseParser(_str) {
        this._currLocation = 0;
        this._str = _str;
        this._strLength = _str.length;
    }
    BaseParser.prototype.eat = function (match) {
        if (this._str.charAt(this._currLocation) === match) {
            return this._str.charAt(this._currLocation++);
        }
        return undefined;
    };
    BaseParser.prototype.eatSpacesAndNewlines = function () {
        return this.eatWhileRegex(/[ \r\n]/);
    };
    BaseParser.prototype.eatWhile = function (match) {
        var i = 0;
        while (this._str.charAt(this._currLocation + i) === match) {
            i++;
            if (i + this._currLocation > this._strLength) {
                break;
            }
        }
        this._currLocation += i;
        return this._str.substr(this._currLocation - i, i);
    };
    BaseParser.prototype.eatWhileRegex = function (match) {
        var i = 0;
        while (match.test(this._str.charAt(this._currLocation + i))) {
            i++;
            if (i + this._currLocation > this._strLength) {
                break;
            }
        }
        this._currLocation += i;
        return this._str.substr(this._currLocation - i, i);
    };
    BaseParser.prototype.eatWord = function (word) {
        var len = word.length;
        if (this.peekAhead(len) === word) {
            this._currLocation += len;
            return word;
        }
        return undefined;
    };
    BaseParser.prototype.eatUntil = function (match) {
        var i = 0;
        while (!match.test(this._str.charAt(this._currLocation + i))) {
            i++;
            if (i + this._currLocation > this._strLength) {
                break;
            }
        }
        this._currLocation += i;
        return this._str.substr(this._currLocation - i, i);
    };
    BaseParser.prototype.peek = function () {
        return this._str.charAt(this._currLocation);
    };
    BaseParser.prototype.peekAhead = function (by) {
        return this._str.substr(this._currLocation, by);
    };
    BaseParser.prototype.hasNext = function () {
        return this._currLocation < this._strLength - 1;
    };
    /**
     * Advances the stream if possible.
     *
     * @protected
     * @returns {string} The token that was advanced over, or undefined if it wasn't possible to advance.
     */
    BaseParser.prototype.next = function () {
        if (this.hasNext()) {
            return this._str.charAt(this._currLocation++);
        }
        return undefined;
    };
    BaseParser.prototype.reset = function () {
        this._currLocation = 0;
    };
    return BaseParser;
}());
exports.BaseParser = BaseParser;

//# sourceMappingURL=BaseParser.js.map
