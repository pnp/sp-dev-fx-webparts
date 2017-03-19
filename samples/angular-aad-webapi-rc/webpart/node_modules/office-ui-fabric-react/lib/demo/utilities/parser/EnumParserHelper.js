"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseParser_1 = require('./BaseParser');
/**
 * Supporting enum for the parser, used internally within the parser only.
 */
var ParseState;
(function (ParseState) {
    ParseState[ParseState["default"] = 0] = "default";
    ParseState[ParseState["comment"] = 1] = "comment";
    ParseState[ParseState["declaration"] = 2] = "declaration";
})(ParseState || (ParseState = {}));
/**
 * Helper Parser that parses enums.
 */
var EnumParserHelper = (function (_super) {
    __extends(EnumParserHelper, _super);
    /**
     * @constructor
     * Helper Parser that parses enums.
     */
    function EnumParserHelper(str) {
        _super.call(this, str);
        this._state = ParseState.default;
    }
    EnumParserHelper.prototype.parse = function () {
        var bank = [];
        var comment = '';
        var identifierName = '';
        var returnResult = [];
        var noClosingSymbolAsterixPrereq = false;
        this.eatUntil(/\{/);
        this.eat('{');
        do {
            switch (this._state) {
                case ParseState.default:
                    this.eatSpacesAndNewlines();
                    if (this.eat('/')) {
                        if (this.peek() === '*') {
                            this._state = ParseState.comment;
                        }
                        else {
                            // ignore // comments
                            this.eatUntil(/[\n]/);
                        }
                    }
                    else if (this.eat('}')) {
                        // closing
                        break;
                    }
                    else {
                        this._state = ParseState.declaration;
                    }
                    break;
                case ParseState.comment:
                    {
                        // the initial * are always the first * of a comment, and will be treated as decorative
                        var asterisk = this.eatWhile('*');
                        if ((noClosingSymbolAsterixPrereq || asterisk.length > 0) && this.eat('/')) {
                            // encountered closing comment tag
                            comment = bank.join('').trim();
                            bank = [];
                            this._state = ParseState.default;
                            break;
                        }
                        noClosingSymbolAsterixPrereq = false;
                        bank.push(this.eatUntil(/[\n\*]/));
                        if (this.peek() === '*') {
                            var tmp = this.eatWhile('*');
                            if (this.peek() !== '/') {
                                // encountered a line like "* This is a comment with asterisks in the middle **** like this."
                                bank.push(tmp);
                            }
                            else {
                                noClosingSymbolAsterixPrereq = true;
                            }
                        }
                        else if (this.peek() === '\n') {
                            // go to next line
                            this.eatSpacesAndNewlines();
                        }
                    }
                    break;
                case ParseState.declaration:
                    {
                        this.eatSpacesAndNewlines();
                        var tmp = this.eatUntil(/[,\s]/);
                        this.next();
                        identifierName = tmp.trim();
                        this._state = ParseState.default;
                        returnResult.push({
                            description: comment,
                            name: identifierName,
                        });
                        comment = identifierName = '';
                        break;
                    }
            }
        } while (this.hasNext());
        return returnResult;
    };
    return EnumParserHelper;
}(BaseParser_1.BaseParser));
exports.EnumParserHelper = EnumParserHelper;

//# sourceMappingURL=EnumParserHelper.js.map
