'use strict';

var parser = require('./parser');
var utils = require('./utils');

function main(code, options) {
    return parser(code, options, {
        parse: true // need to parse;
    });
}

main.text = function (text, options) {
    return parser(text, options, {
        parse: false, // do not parse;
        html: false // treat as plain text;
    });
};

main.html = function (html, options) {
    return parser(html, options, {
        parse: false, // do not parse;
        html: true // treat as HTML;
    });
};

main.getEOL = function (text) {
    if (typeof text !== 'string') {
        throw new TypeError("Invalid parameter 'text' specified.");
    }
    return utils.getEOL(text);
};

module.exports = main;
