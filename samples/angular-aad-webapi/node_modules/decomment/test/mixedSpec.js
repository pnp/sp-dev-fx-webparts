'use strict';

// Tests for combinations of single + multi-line comments;

var decomment = require('../lib');
var os = require('os');
var LB = os.EOL;

describe("Mixed:", function () {

    describe("special slash cases", function () {
        it("must be ignored", function () {
            expect(decomment("'\f'")).toBe("'\f'");

            expect(decomment("'\\''")).toBe("'\\''");
            expect(decomment('"\\""')).toBe('"\\""');
            expect(decomment('`\\``')).toBe('`\\``');

            expect(decomment("'\\'\\''")).toBe("'\\'\\''");
            expect(decomment('"\\"\\""')).toBe('"\\"\\""');
            expect(decomment('`\\`\\``')).toBe('`\\`\\``');

            expect(decomment("'\\\\'")).toBe("'\\\\'");
            expect(decomment('"\\\\"')).toBe('"\\\\"');
            expect(decomment('`\\\\`')).toBe('`\\\\`');

            expect(decomment("'\\\\\\''")).toBe("'\\\\\\''");
            expect(decomment("'\\\\\\'';")).toBe("'\\\\\\'';");

            expect(decomment('"\\\\\\""')).toBe('"\\\\\\""');
            expect(decomment('"\\\\\\"";')).toBe('"\\\\\\"";');

            expect(decomment('`\\\\\\``')).toBe('`\\\\\\``');
            expect(decomment('`\\\\\\``;')).toBe('`\\\\\\``;');

        });
    });

    describe("single-line gaps", function () {
        it("must be removed", function () {
            expect(decomment("//one" + LB + "//two" + LB + "//three")).toBe("");
        });
    });

    describe("multi-line gaps", function () {
        it("must be removed", function () {
            expect(decomment("/*one*/" + LB + "/*two*/" + LB + "/*three*/")).toBe("");
        });
    });

    describe("mixed comments", function () {
        it("must be removed", function () {
            expect(decomment("//one" + LB + "/*two*/" + LB + "//three")).toBe("");
        });
    });

    describe("Automatic EOL", function () {

        it("must always ignore solo \\r symbols", function () {
            expect(decomment("//comment\r\rtext", {trim: true})).toBe("");
            expect(decomment("/*comment*/\r\rtext", {trim: true})).toBe("\r\rtext");
        });
        it("must determine Unix and break on \\n", function () {
            expect(decomment("//comment\n\ntext", {trim: true})).toBe("text");
            expect(decomment("/*comment*/\n\ntext", {trim: true})).toBe("text");
        });
        it("must determine Windows and break on \\r\\n", function () {
            expect(decomment("//comment\r\n\r\ntext", {trim: true})).toBe("text");
            expect(decomment("/*comment*/\r\n\r\ntext", {trim: true})).toBe("text");
        });

    });

});
