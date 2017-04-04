'use strict';

// Tests for extra utilities;

var decomment = require('../lib');
var os = require('os');
var LB = os.EOL;

describe("Utils/Positive:", function () {

    describe("getEOL", function () {
        expect(decomment.getEOL("")).toBe(LB);
        expect(decomment.getEOL("\nhello")).toBe("\n");
        expect(decomment.getEOL("\r\nhello")).toBe("\r\n");
        expect(decomment.getEOL("\r\nhello\n")).toBe(LB);
    });

});

describe("Utils/Negative:", function () {

    describe("getEOL non-string", function () {
        it("must throw an error", function () {
            expect(function () {
                decomment.getEOL();
            }).toThrow(new TypeError("Invalid parameter 'text' specified."));
        });
    });

});
