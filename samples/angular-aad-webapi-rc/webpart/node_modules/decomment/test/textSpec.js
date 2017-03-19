'use strict';

// Tests for any text file;

var decomment = require('../lib').text;
var os = require('os');
var LB = os.EOL;

describe("Text:", function () {

    describe("empty comment", function () {
        it("must be removed", function () {
            expect(decomment("class{}/**/")).toBe("class{}");
            expect(decomment("class{}//")).toBe("class{}");
        });
    });

    describe("regular comment", function () {
        it("must be removed", function () {
            expect(decomment("class{}/* text */")).toBe("class{}");
            expect(decomment("class{}// text")).toBe("class{}");
        });
    });

    describe("broken quotes", function () {
        it("must cut off the content", function () {
            expect(decomment("'ops")).toBe("'");
            expect(decomment("\"ops")).toBe("\"");
        });
    });

    describe("comments as text", function () {
        it("must remain", function () {
            expect(decomment("'<*hello*>'")).toBe("'<*hello*>'");
        });
    });

    describe("unclosed comments", function () {
        it("must cut off the remainder", function () {
            expect(decomment("some/*comment" + LB + "text")).toBe("some");
        });
    });

    describe("unclosed special comment", function () {
        it("must include the rest of the text", function () {
            expect(decomment("/*!text", {safe: true})).toBe("/*!text");
        });
    });

});
