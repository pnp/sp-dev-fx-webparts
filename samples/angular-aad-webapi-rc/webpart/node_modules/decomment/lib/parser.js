'use strict';

var utils = require('./utils');

function parser(code, options, config) {

    if (typeof code !== 'string') {
        throw new TypeError("Input code/text/html must be a string.");
    }

    if (options !== undefined && typeof(options) !== 'object') {
        throw new TypeError("Parameter 'options' must be an object.");
    }

    var idx = 0, // current index;
        s = '', // resulting code;
        len = code.length, // code length;
        emptyLine = true, // set while no symbols encountered on the current line;
        emptyLetters = '', // empty letters on a new line;
        optSafe = options && options.safe, // 'safe' option;
        optSpace = options && options.space, // 'space' option;
        optTrim = options && options.trim, // 'trim' option;
        EOL = utils.getEOL(code), // get EOL from the code;
        isHtml, // set when the input is recognized as HTML;
        regEx = []; // regular expression details;

    if (!len) {
        return code;
    }

    if (config.parse) {
        isHtml = utils.isHtml(code);
        if (!isHtml) {
            regEx = utils.parseRegEx(code);
        }
    } else {
        isHtml = config.html;
    }

    if (options && options.ignore) {
        var ignore = options.ignore;
        if (ignore instanceof RegExp) {
            ignore = [ignore];
        } else {
            if (ignore instanceof Array) {
                ignore = ignore.filter(function (f) {
                    return f instanceof RegExp;
                });
                if (!ignore.length) {
                    ignore = null;
                }
            } else {
                ignore = null;
            }
        }
        if (ignore) {
            for (var i = 0; i < ignore.length; i++) {
                var match, reg = ignore[i];
                do {
                    match = reg.exec(code);
                    if (match) {
                        regEx.push({
                            start: match.index,
                            end: match.index + match[0].length - 1
                        });
                    }
                } while (match && reg.global);
            }
            regEx = regEx.sort(function (a, b) {
                return a.start - b.start;
            });
        }
    }

    do {
        if (!isHtml && code[idx] === '/' && idx < len - 1 && (!idx || code[idx - 1] !== '\\')) {
            if (code[idx + 1] === '/') {
                if (inRegEx()) {
                    if (emptyLetters) {
                        s += emptyLetters;
                        emptyLetters = '';
                    }
                    s += '/';
                    continue;
                }
                var lb = code.indexOf(EOL, idx + 2);
                if (lb < 0) {
                    break;
                }
                if (emptyLine) {
                    emptyLetters = '';
                    if (optSpace) {
                        idx = lb - 1; // just before the line break;
                    } else {
                        idx = lb + EOL.length - 1; // last symbol of the line break;
                        trim();
                    }
                } else {
                    idx = lb - 1; // just before the line break;
                }
                continue;
            }
            if (code[idx + 1] === '*') {
                if (inRegEx()) {
                    if (emptyLetters) {
                        s += emptyLetters;
                        emptyLetters = '';
                    }
                    s += '/';
                    continue;
                }
                var end = code.indexOf('*/', idx + 2);
                var keep = optSafe && idx < len - 2 && code[idx + 2] === '!';
                if (keep) {
                    if (end >= 0) {
                        s += code.substr(idx, end - idx + 2);
                    } else {
                        s += code.substr(idx, len - idx);
                    }
                }
                if (end < 0) {
                    break;
                }
                var comment = code.substr(idx, end - idx + 2);
                idx = end + 1;
                if (emptyLine) {
                    emptyLetters = '';
                }
                if (!keep) {
                    var parts = comment.split(EOL);
                    if (optSpace) {
                        for (var k = 0; k < parts.length - 1; k++) {
                            s += EOL;
                        }
                    }
                    var lb = code.indexOf(EOL, idx + 1);
                    if (lb > idx) {
                        var gapIdx = lb - 1;
                        while ((code[gapIdx] === ' ' || code[gapIdx] === '\t') && --gapIdx > idx);
                        if (gapIdx === idx) {
                            if (emptyLine && !optSpace) {
                                idx = lb + EOL.length - 1; // last symbol of the line break;
                                trim();
                            }
                        } else {
                            if (optSpace) {
                                s += utils.getSpaces(parts[parts.length - 1].length);
                            }
                        }
                    } else {
                        if (optSpace) {
                            var gapIdx = idx + 1;
                            while ((code[gapIdx] === ' ' || code[gapIdx] === '\t') && ++gapIdx < len);
                            if (gapIdx < len) {
                                s += utils.getSpaces(parts[parts.length - 1].length);
                            }
                        }
                    }
                }
                continue;
            }
        }

        if (isHtml && code[idx] === '<' && idx < len - 3 && code.substr(idx + 1, 3) === '!--') {
            if (inRegEx()) {
                if (emptyLetters) {
                    s += emptyLetters;
                    emptyLetters = '';
                }
                s += '<';
                continue;
            }
            var end = code.indexOf('-->', idx + 4);
            var keep = optSafe && code.substr(idx + 4, 3) === '[if';
            if (keep) {
                if (end >= 0) {
                    s += code.substr(idx, end - idx + 3);
                } else {
                    s += code.substr(idx, len - idx);
                }
            }
            if (end < 0) {
                break;
            }
            var comment = code.substr(idx, end - idx + 3);
            idx = end + 2;
            if (emptyLine) {
                emptyLetters = '';
            }
            if (!keep) {
                var parts = comment.split(EOL);
                if (optSpace) {
                    for (var k = 0; k < parts.length - 1; k++) {
                        s += EOL;
                    }
                }
                var lb = code.indexOf(EOL, idx + 1);
                if (lb > idx) {
                    var gapIdx = lb - 1;
                    while ((code[gapIdx] === ' ' || code[gapIdx] === '\t') && --gapIdx > idx);
                    if (gapIdx === idx) {
                        if (emptyLine && !optSpace) {
                            idx = lb + EOL.length - 1; // last symbol of the line break;
                            trim();
                        }
                    } else {
                        if (optSpace) {
                            s += utils.getSpaces(parts[parts.length - 1].length);
                        }
                    }
                } else {
                    if (optSpace) {
                        var gapIdx = idx + 1;
                        while ((code[gapIdx] === ' ' || code[gapIdx] === '\t') && ++gapIdx < len);
                        if (gapIdx < len) {
                            s += utils.getSpaces(parts[parts.length - 1].length);
                        }
                    }
                }
            }
            continue;
        }

        var symbol = code[idx];
        var isSpace = symbol === ' ' || symbol === '\t';
        if (symbol === '\r' || symbol === '\n') {
            if (code.indexOf(EOL, idx) === idx) {
                emptyLine = true;
            }
        } else {
            if (!isSpace) {
                emptyLine = false;
                s += emptyLetters;
                emptyLetters = '';
            }
        }
        if (emptyLine && isSpace) {
            emptyLetters += symbol;
        } else {
            s += symbol;
        }

        if (!isHtml && (symbol === '\'' || symbol === '"' || symbol === '`') && (!idx || code[idx - 1] !== '\\')) {
            if (inRegEx()) {
                continue;
            }
            var closeIdx = idx;
            do {
                closeIdx = code.indexOf(symbol, closeIdx + 1);
                if (closeIdx > 0) {
                    var shIdx = closeIdx;
                    while (code[--shIdx] === '\\');
                    if ((closeIdx - shIdx) % 2) {
                        break;
                    }
                }
            } while (closeIdx > 0);
            if (closeIdx < 0) {
                break;
            }
            s += code.substr(idx + 1, closeIdx - idx);
            idx = closeIdx;
        }

    } while (++idx < len);

    function inRegEx() {
        if (regEx.length) {
            return utils.indexInRegEx(idx, regEx);
        }
    }

    function trim() {
        if (optTrim) {
            var startIdx, endIdx, i;
            do {
                startIdx = idx + 1;
                endIdx = code.indexOf(EOL, startIdx);
                i = startIdx;
                while ((code[i] === ' ' || code[i] === '\t') && ++i < endIdx);
                if (i === endIdx) {
                    idx = endIdx + EOL.length - 1;
                }
            } while (i === endIdx);
        }
    }

    return s;
}

module.exports = parser;
