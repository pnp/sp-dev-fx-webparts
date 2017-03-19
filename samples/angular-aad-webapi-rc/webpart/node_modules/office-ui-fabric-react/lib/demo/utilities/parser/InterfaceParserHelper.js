"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseParser_1 = require('./BaseParser');
var index_1 = require('../../components/index');
var JSDOC_DEFAULT = '@default';
var JSDOC_DEFAULTVALUE = '@defaultvalue';
var JSDOC_DEPRECATED = '@deprecated';
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
 * Helper Parser that parses interfaces.
 */
var InterfaceParserHelper = (function (_super) {
    __extends(InterfaceParserHelper, _super);
    /**
     * @constructor
     * Helper Parser that parses interfaces.
     */
    function InterfaceParserHelper(str) {
        _super.call(this, str);
        this._state = ParseState.default;
    }
    InterfaceParserHelper.prototype.parse = function () {
        var bank = [];
        var comment = '';
        var identifierName = '';
        var type = '';
        var returnResult = [];
        var defaultValue = '';
        var isDeprecated = false;
        var deprecatedMessage = '';
        var noClosingSymbolAsteriskPrereq = false;
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
                        if ((noClosingSymbolAsteriskPrereq || asterisk.length > 0) && this.eat('/')) {
                            // encountered closing comment tag
                            comment = bank.join('').trim();
                            bank = [];
                            this._state = ParseState.default;
                            break;
                        }
                        noClosingSymbolAsteriskPrereq = false;
                        var tmp = this.eatUntil(/[\n\*@]/);
                        bank.push(tmp);
                        if (this.peek() === '*') {
                            var tmp_1 = this.eatWhile('*');
                            if (this.peek() !== '/') {
                                // encountered a line like '* This is a comment with asterisks in the middle **** like this.'
                                bank.push(tmp_1);
                            }
                            else {
                                // we have already encountered *, and the next symbol is /
                                noClosingSymbolAsteriskPrereq = true;
                            }
                        }
                        else if (this.peek() === '\n') {
                            // go to next line
                            this.eatSpacesAndNewlines();
                        }
                        else if (this.peek() === '@') {
                            if (this.eatWord(JSDOC_DEFAULTVALUE) || this.eatWord(JSDOC_DEFAULT)) {
                                // this parser assumes @default values won't have a bunch of asterisks in the middle of it.
                                var tmp_2 = this.eatUntil(/[\*\n]/);
                                defaultValue = tmp_2;
                                this.eatSpacesAndNewlines();
                            }
                            else if (this.eatWord(JSDOC_DEPRECATED)) {
                                var tmp_3 = this.eatUntil(/[\*\n]/);
                                isDeprecated = true;
                                deprecatedMessage = tmp_3;
                            }
                            else {
                                bank.push(this.eat('@'));
                            }
                        }
                    }
                    break;
                case ParseState.declaration:
                    {
                        this.eatSpacesAndNewlines();
                        var tmp = this.eatUntil(/[\:\;=]/);
                        identifierName = tmp.trim();
                        if (this.eat(':')) {
                            tmp = this.eatUntil(/\;/);
                            type = tmp;
                        }
                        else {
                            // encountered semicolon or =
                            type = 'unspecified';
                        }
                        this.eat(';'); // actually eat the semicolon
                        var isOptional = identifierName[identifierName.length - 1] === '?';
                        var propType = isDeprecated ? index_1.InterfacePropertyType.deprecated : (isOptional ? index_1.InterfacePropertyType.optional : index_1.InterfacePropertyType.required);
                        this._state = ParseState.default;
                        returnResult.push({
                            description: comment,
                            name: identifierName,
                            type: type,
                            defaultValue: defaultValue,
                            interfacePropertyType: propType,
                            deprecatedMessage: deprecatedMessage
                        });
                        comment = identifierName = type = defaultValue = '';
                    }
                    break;
            }
        } while (this.hasNext());
        this.reset();
        return returnResult;
    };
    return InterfaceParserHelper;
}(BaseParser_1.BaseParser));
exports.InterfaceParserHelper = InterfaceParserHelper;

//# sourceMappingURL=InterfaceParserHelper.js.map
