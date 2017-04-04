'use strict';

// Tests for HTML comments;

var decomment = require('../lib');
var os = require('os');
var LB = os.EOL;

describe("HTML:", function () {

    describe("empty html", function () {
        it("must be intact", function () {
            expect(decomment("\<\>/*hello*/")).toBe("\<\>/*hello*/");
            expect(decomment("\<text\>//something")).toBe("\<text\>//something");
        });
    });

    describe("single-line comment", function () {
        it("must be gone", function () {
            expect(decomment("\<!--text--\>")).toBe("");
            expect(decomment("\<!--text--\>" + LB)).toBe("");
            // note: spaces and tabs are removed from empty lines;
            expect(decomment("\t \t \<!--text--\>" + LB)).toBe("");
        });
    });

    describe("multi-line comment", function () {
        it("must be gone", function () {
            expect(decomment("\<!-- some" + LB + "text" + LB + "--\>")).toBe("");
        });
    });

    describe("unclosed comment", function () {
        it("must be gone", function () {
            expect(decomment("\<!-- text")).toBe("");
            expect(decomment("\<!-- text" + LB)).toBe("");
        });
    });

    describe("with text that follows", function () {
        it("only the text must be left", function () {
            expect(decomment("\<!-- comment -->text")).toBe("text");
            expect(decomment("\<!-- comment -->\ttext")).toBe("\ttext");
        });
    });

    describe("with prefix text", function () {
        it("only the text must be left", function () {
            expect(decomment("\<html\>prefix<!-- comment -->")).toBe("\<html\>prefix");
            expect(decomment("\<html\>prefix<!-- comment -->" + LB)).toBe("\<html\>prefix" + LB);
        });
    });

    describe("with space=true", function () {
        it("must return the preceding text", function () {
            expect(decomment.html("Text<!---->", {space: true})).toBe("Text");
            expect(decomment.html(LB + "Text<!---->", {space: true})).toBe(LB + "Text");
            expect(decomment.html("Text" + LB + "<!---->", {space: true})).toBe("Text" + LB);
            expect(decomment.html("Text<!---->" + LB + "Here", {space: true})).toBe("Text" + LB + "Here");
        });
    });

    describe("with preceding text", function () {
        it("must return the preceding text", function () {
            expect(decomment.html("Text<!---->")).toBe("Text");
            expect(decomment.html(LB + "Text<!---->")).toBe(LB + "Text");
            expect(decomment.html("Text" + LB + "<!---->")).toBe("Text" + LB);
            expect(decomment.html("Text<!---->" + LB + "Here")).toBe("Text" + LB + "Here");
        });
    });

    describe("Explicit HTML call", function () {
        it("must process it as HTML always", function () {
            expect(decomment.html("text<!-- comment -->")).toBe("text");
        });
    });

    describe("starting comments suffixed by spaces", function () {
        it("must remove comment and spaces", function () {
            expect(decomment("<!--hello--> " + LB + "next")).toBe("next");
            expect(decomment(" <!--hello--> " + LB + "next")).toBe("next");
            expect(decomment("<!--hello--> \t " + LB + "next")).toBe("next");
            expect(decomment(" \t <!--hello--> \t " + LB + "next")).toBe("next");
        });
    });

    describe("starting comments suffixed by text, space=false", function () {
        it("must remove comment and preserve the suffix", function () {
            expect(decomment("<!--hello-->text" + LB + "next")).toBe("text" + LB + "next");
        });
    });

    describe("starting comments suffixed by text, space=true", function () {
        it("must replace comment with white spaces and preserve the suffix", function () {
            expect(decomment("<!--hello-->text" + LB + "next", {space: true})).toBe("            text" + LB + "next");
        });
    });

    describe("across lines, with space=false", function () {
        it("must delete all lines", function () {
            expect(decomment("<!--start" + LB + "middle" + LB + "end-->")).toBe("");
            expect(decomment("<!--start" + LB + "middle" + LB + "end-->text")).toBe("text");
            expect(decomment.html("prefix-<!--start" + LB + "middle" + LB + "end-->suffix")).toBe("prefix-suffix");
        });
    });

    describe("across lines, with space=true", function () {
        it("must replace deleted lines with line break", function () {
            expect(decomment.html("prefix<!--comment-->suffix", {space: true})).toBe("prefix              suffix");
            expect(decomment("<!--start" + LB + "middle" + LB + "end-->text" + LB, {space: true})).toBe(LB + LB + "      text" + LB);
            expect(decomment("<!--start" + LB + "middle" + LB + "end-->\ttext", {space: true})).toBe(LB + LB + "      \ttext");
            expect(decomment("<!--start" + LB + "middle" + LB + "end-->", {space: true})).toBe(LB + LB);
            expect(decomment("<!--start" + LB + "middle" + LB + "end-->text", {space: true})).toBe(LB + LB + "      text");
            expect(decomment.html("prefix<!--start" + LB + "middle" + LB + "end-->suffix", {space: true})).toBe("prefix" + LB + LB + "      suffix");
        });
    });


});

describe("HTML-IE", function () {

    describe("Safe", function () {
        it("must keep all IE comments", function () {
            expect(decomment("<!--[iftext<![endif]-->", {safe: true})).toBe("<!--[iftext<![endif]-->");
            expect(decomment("<!--[iftext", {safe: true})).toBe("<!--[iftext");
            expect(decomment("<!--[if" + LB + "text" + LB + "<![endif]-->", {safe: true})).toBe("<!--[if" + LB + "text" + LB + "<![endif]-->");
        });
    });

    describe("Not Safe", function () {
        it("must delete all IE comments", function () {
            expect(decomment("<!--[if IE]>text<![endif]-->")).toBe("");
            expect(decomment("<!--[if IE]>text")).toBe("");
            expect(decomment("<!--[if IE]>" + LB + "text" + LB + "<![endif]-->")).toBe("");
            expect(decomment.html(" prefix " + LB + "<!--[if IE]>" + LB + "text" + LB + "<![endif]-->" + " suffix ")).toBe(" prefix " + LB + " suffix ");
        });
    });

});