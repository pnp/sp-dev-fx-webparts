'use strict';

// Tests for multi-line comments;

var decomment = require('../lib');
var os = require('os');
var LB = os.EOL;

describe("Multi:", function () {

    describe("empty comment, space=false", function () {
        it("must return an empty string", function () {
            expect(decomment("/**/")).toBe("");
            expect(decomment("\/**\/")).toBe("");
        });
    });

    describe("empty comment, space=true", function () {
        it("must return spaces where needed", function () {
            expect(decomment("/**/", {space: true})).toBe("");
            expect(decomment("\/**\/")).toBe("");
        });
    });

    describe("multiple empty comments, space=false", function () {
        it("must return an empty string", function () {
            expect(decomment("/**/" + LB + "/**/")).toBe("");
            expect(decomment("/**/" + LB + "/**/" + LB)).toBe("");
        });
    });

    describe("multiple empty comments, space=true", function () {
        it("must return only line breaks", function () {
            expect(decomment("/**/" + LB, {space: true})).toBe(LB);
            expect(decomment("/**/" + LB + "/**/", {space: true})).toBe(LB);
            expect(decomment("/**/" + LB + "/**/" + LB, {space: true})).toBe(LB + LB);
        });
    });

    describe("multiple comments, space=true", function () {
        it("must return correct spaces", function () {
            expect(decomment("/**/ " + LB, {space: true})).toBe(LB);
            expect(decomment("/**/   " + LB, {space: true})).toBe(LB);
            expect(decomment("/**/ /**/" + LB, {space: true})).toBe("    " + LB);
            expect(decomment("/**/a/**/b/**/c" + LB, {space: true})).toBe("    a    b    c" + LB);
            expect(decomment("/**/ a/**/ b/**/ c " + LB, {space: true})).toBe("     a     b     c " + LB);
        });
    });

    describe("non-empty comment", function () {
        it("must return an empty string", function () {
            expect(decomment("/*text*/")).toBe("");
        });
    });

    describe("non-empty multiple comments", function () {
        it("must return an empty string", function () {
            expect(decomment("/* text1 */" + LB + "/*text2*/")).toBe("");
            expect(decomment("/* text1 */" + LB + "/*text2*/" + LB)).toBe("");
        });
    });

    describe("with line-break prefix", function () {
        it("must return the break", function () {
            expect(decomment(LB + "/**/")).toBe(LB);
        });
    });

    describe("with line-break suffix", function () {
        it("must return an empty string", function () {
            expect(decomment("/**/" + LB)).toBe("");
        });
    });

    describe("with multiple line-break suffixes", function () {
        it("must return a single line break", function () {
            expect(decomment("/**/" + LB + LB)).toBe(LB);
        });
    });

    describe("with preceding text, space=false", function () {
        it("must return the preceding text", function () {
            expect(decomment("Text/**/")).toBe("Text");
            expect(decomment(LB + "Text/**/")).toBe(LB + "Text");
            expect(decomment("Text" + LB + "/**/")).toBe("Text" + LB);
            expect(decomment("Text/**/" + LB + "Here")).toBe("Text" + LB + "Here");
        });
    });

    describe("with preceding text, space=true", function () {
        it("must return the preceding text", function () {
            expect(decomment("Text/**/", {space: true})).toBe("Text");
            expect(decomment(LB + "Text/**/", {space: true})).toBe(LB + "Text");
            expect(decomment("Text" + LB + "/**/", {space: true})).toBe("Text" + LB);
            expect(decomment("Text/**/" + LB + "Here", {space: true})).toBe("Text" + LB + "Here");
        });
    });

    describe("with empty text prefix", function () {
        var out1 = decomment("''/**/");
        var out2 = decomment("\"\"/**/");
        var out3 = decomment("``/**/");
        it("must leave only the comment", function () {
            expect(out1).toBe("''");
            expect(out2).toBe("\"\"");
            expect(out3).toBe("``");
        });
    });

    describe("with empty text suffix", function () {
        var out1 = decomment("/**/" + LB + "''");
        var out2 = decomment("/**/" + LB + "\"\"");
        var out3 = decomment("/**/" + LB + "``");
        it("must leave only the comment", function () {
            expect(out1).toBe("''");
            expect(out2).toBe("\"\"");
            expect(out3).toBe("``");
        });
    });

    describe("comments inside text", function () {
        it("must leave only the comment", function () {
            expect(decomment("'/**/text'")).toBe("'/**/text'");
        });
    });

    describe("starting comments suffixed by text, space=false", function () {
        it("must remove comment and preserve the suffix", function () {
            expect(decomment("/*hello*/text" + LB + "next")).toBe("text" + LB + "next");
        });
    });

    describe("starting comments suffixed by text, space=true", function () {
        it("must replace comment with white spaces and preserve the suffix", function () {
            expect(decomment("/*hello*/text" + LB + "next", {space: true})).toBe("         text" + LB + "next");
        });
    });

    describe("starting comments suffixed by spaces", function () {
        it("must remove comment and spaces", function () {
            expect(decomment("/*hello*/ " + LB + "next")).toBe("next");
            expect(decomment(" /*hello*/ " + LB + "next")).toBe("next");
            expect(decomment("/*hello*/ \t " + LB + "next")).toBe("next");
            expect(decomment(" \t /*hello*/ \t " + LB + "next")).toBe("next");
        });
    });

    describe("spaces", function () {
        describe("complex case", function () {
            var out = decomment("a /* comment*/" + LB + "\tb /* comment*/" + LB + "c/*end*/");
            it("must keep spaces correctly", function () {
                expect(out).toBe("a " + LB + "\tb " + LB + "c");
            });
        });
    });

    describe("multiple line breaks that follow", function () {
        it("must be removed", function () {
            expect(decomment("/*text*/" + LB + LB + "end", {trim: true})).toBe("end");
        });
    });

    describe("with safe options", function () {

        it("must become empty when safe=false", function () {
            expect(decomment("/*!*/")).toBe("");
        });

        it("must keep comments when safe=true", function () {
            expect(decomment("/*!*/", {safe: true})).toBe("/*!*/");
        });
    });

    describe("combination of options", function () {
        it("must process correctly", function () {
            expect(decomment("/*!special*/" + LB + LB + "code" + LB + "/*normal*/" + LB + LB + "hello" + LB, {
                trim: true,
                safe: true
            })).toBe("/*!special*/" + LB + LB + "code" + LB + "hello" + LB);
        });
    });

    describe("inside regEx", function () {
        it("must be ignored", function () {
            expect(decomment("/[a-b/*]text/")).toBe("/[a-b/*]text/");
        });
    });

    describe("across lines, with space=false", function () {
        it("must delete all lines", function () {
            expect(decomment("/*start" + LB + "middle" + LB + "end*/")).toBe("");
            expect(decomment("/*start" + LB + "middle" + LB + "end*/text")).toBe("text");
            expect(decomment("prefix-/*start" + LB + "middle" + LB + "end*/suffix")).toBe("prefix-suffix");
        });
    });

    describe("across lines, with space=true", function () {
        it("must replace deleted lines with line break", function () {
            expect(decomment("prefix/*comment*/suffix", {space: true})).toBe("prefix           suffix");
            expect(decomment("/*start" + LB + "middle" + LB + "end*/text" + LB, {space: true})).toBe(LB + LB + "     text" + LB);
            expect(decomment("/*start" + LB + "middle" + LB + "end*/\ttext", {space: true})).toBe(LB + LB + "     \ttext");
            expect(decomment("/*start" + LB + "middle" + LB + "end*/", {space: true})).toBe(LB + LB);
            expect(decomment("/*start" + LB + "middle" + LB + "end*/text", {space: true})).toBe(LB + LB + "     text");
            expect(decomment("prefix/*start" + LB + "middle" + LB + "end*/suffix", {space: true})).toBe("prefix" + LB + LB + "     suffix");
        });
    });

});
