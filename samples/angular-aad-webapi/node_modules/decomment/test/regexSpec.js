'use strict';

// Tests for skipping regular expressions;

var decomment = require('../lib');
var os = require('os');
var LB = os.EOL;

describe("RegEx:", function () {

    describe("with apostrophe", function () {
        it("must ignore the apostrophe", function () {
            expect(decomment("/'/")).toBe("/'/");
            expect(decomment("/'/" + LB)).toBe("/'/" + LB);
            expect(decomment("/\'/")).toBe("/'/");
            expect(decomment("/'\/text")).toBe("/'\/text");
        });
    });

    describe("with a quote", function () {
        it("must ignore the quote", function () {
            expect(decomment('/"/')).toBe('/"/');
            expect(decomment('/"/' + LB)).toBe('/"/' + LB);
            expect(decomment('/\"/')).toBe('/"/');
            expect(decomment('/"\/text')).toBe('/"\/text');
        });
    });

    describe("with an es6 apostrophe", function () {
        it("must ignore the apostrophe", function () {
            expect(decomment('/`/')).toBe('/`/');
            expect(decomment('/`/' + LB)).toBe('/`/' + LB);
            expect(decomment('/\`/')).toBe('/`/');
        });
    });

    describe("with a back-slash", function () {
        it("must ignore the back-slash", function () {
            expect(decomment('/\\//')).toBe('/\\//');
            expect(decomment('/\\\//')).toBe('/\\//');
        });
    });

    describe("with a multi-line", function () {
        it("must ignore the multi-line", function () {
            expect(decomment('/\\/*/')).toBe('/\\/*/');
            expect(decomment('/\\/\*/')).toBe('/\\/*/');
        });
    });

    describe("with a multi-line opener", function () {
        it("must ignore the multi-line", function () {
            expect(decomment('/\\*/')).toBe('/\\*/');
            expect(decomment('/\\\*/')).toBe('/\\*/');
        });
    });

    describe("valid regular expressions", function () {
        it("must repent any content", function () {
            expect(decomment("t=/'/")).toBe("t=/'/");
            expect(decomment(LB + "t=/'/")).toBe(LB + "t=/'/");
            expect(decomment("/[']/")).toBe("/[']/");
        });
    });

    describe("multiple regEx in one line", function () {
        it("must be detected correctly", function () {
            expect(decomment("/[']/, /[\"]/")).toBe("/[']/, /[\"]/");
            expect(decomment("/[']/, /[\"]/, /[`]/")).toBe("/[']/, /[\"]/, /[`]/");
        });
    });

    describe("with comments on the outside", function () {
        it("must remove the comments", function () {
            expect(decomment("/*comment*/ /text/")).toBe(" /text/");
            expect(decomment("/text/ //comment")).toBe("/text/ ");
        });
    });
});
