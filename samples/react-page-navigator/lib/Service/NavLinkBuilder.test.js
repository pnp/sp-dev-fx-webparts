/* eslint-disable @typescript-eslint/no-explicit-any */
import { navLinkBuilder } from "./NavLinkBuilder";
var DEPTH_NO_COLLAPSABLE_HEADER = 0;
var DEPTH_COLLAPSABLE_HEADER = 1;
describe("The NavLinkBuilder without a preceding collapsable header", function () {
    var depth = DEPTH_NO_COLLAPSABLE_HEADER;
    var h1 = depth;
    var h2 = h1 + 1;
    var h3 = h2 + 1;
    var h4 = h3 + 1;
    it("should nest correctly without h1", function () {
        var linkH2 = {
            name: "h2",
        };
        var linkH3 = {
            name: "h3",
        };
        var linkH2a = {
            name: "another h2",
        };
        var linkH3a = {
            name: "another h3",
        };
        var actual = [];
        navLinkBuilder.build(actual, linkH2, h2);
        navLinkBuilder.build(actual, linkH3, h3);
        navLinkBuilder.build(actual, linkH2a, h2);
        navLinkBuilder.build(actual, linkH3a, h3);
        expect(actual).toMatchSnapshot();
    });
    it("should nest correctly for wrong order headings", function () {
        var linkH1 = {
            name: "h1",
        };
        var linkH2 = {
            name: "h2",
        };
        var linkH3 = {
            name: "h3",
        };
        var linkH4 = {
            name: "h4",
        };
        var actual = [];
        navLinkBuilder.build(actual, linkH4, h4);
        navLinkBuilder.build(actual, linkH3, h3);
        navLinkBuilder.build(actual, linkH2, h2);
        navLinkBuilder.build(actual, linkH1, h1);
        expect(actual).toMatchSnapshot();
    });
    it("should nest correctly for headings with a jump", function () {
        var linkH1 = {
            name: "h1",
        };
        var linkH2 = {
            name: "h2",
        };
        var linkH3 = {
            name: "h3",
        };
        var linkH4 = {
            name: "h4",
        };
        var actual = [];
        navLinkBuilder.build(actual, linkH3, h3);
        navLinkBuilder.build(actual, linkH4, h4);
        navLinkBuilder.build(actual, linkH1, h1);
        navLinkBuilder.build(actual, linkH2, h2);
        expect(actual).toMatchSnapshot();
    });
    it("should add a single item to an empty list", function () {
        var lnk = {
            name: "xyz",
        };
        var actual = [];
        navLinkBuilder.build(actual, lnk, h1);
        expect(actual).toMatchSnapshot();
    });
    it("should add a two items on the same level", function () {
        var lnk1 = {
            name: "xyz",
        };
        var lnk2 = {
            name: "abc",
        };
        var actual = [];
        navLinkBuilder.build(actual, lnk1, h1);
        navLinkBuilder.build(actual, lnk2, h1);
        expect(actual).toMatchSnapshot();
    });
    it("should add a two items on different levels", function () {
        var lnk1 = {
            name: "xyz",
        };
        var lnk2 = {
            name: "abc",
        };
        var actual = [];
        navLinkBuilder.build(actual, lnk1, h1);
        navLinkBuilder.build(actual, lnk2, h2);
        expect(actual).toMatchSnapshot();
    });
    it("should add a two items on the same level and two items on different levels", function () {
        var lnk1 = {
            name: "xyz",
        };
        var lnk2 = {
            name: "abc",
        };
        var lnk11 = {
            name: "xyz.1",
        };
        var lnk21 = {
            name: "abc.1",
        };
        var actual = [];
        navLinkBuilder.build(actual, lnk1, h1);
        navLinkBuilder.build(actual, lnk11, h2);
        navLinkBuilder.build(actual, lnk2, h1);
        navLinkBuilder.build(actual, lnk21, h2);
        expect(actual).toMatchSnapshot();
    });
    it("should add a four items on different levels", function () {
        var lnk1 = {
            name: "xyz",
        };
        var lnk2 = {
            name: "abc",
        };
        var lnk3 = {
            name: "def",
        };
        var lnk4 = {
            name: "geh",
        };
        var actual = [];
        navLinkBuilder.build(actual, lnk1, h1);
        navLinkBuilder.build(actual, lnk2, h2);
        navLinkBuilder.build(actual, lnk3, h3);
        navLinkBuilder.build(actual, lnk4, h4);
        expect(actual).toMatchSnapshot();
    });
    it("should not nest two h2", function () {
        var lnk1 = {
            name: "h1",
        };
        var lnk2 = {
            name: "h2",
        };
        var lnk3 = {
            name: "h2",
        };
        var lnk4 = {
            name: "h3",
        };
        var actual = [];
        navLinkBuilder.build(actual, lnk1, h1);
        navLinkBuilder.build(actual, lnk2, h2);
        navLinkBuilder.build(actual, lnk3, h2);
        navLinkBuilder.build(actual, lnk4, h3);
        expect(actual).toMatchSnapshot();
    });
    it("should not nest two h3", function () {
        var lnk0 = {
            name: "h1",
        };
        var lnk1 = {
            name: "h1",
        };
        var lnk2 = {
            name: "h2",
        };
        var lnk3 = {
            name: "h2",
        };
        var lnk4 = {
            name: "h3",
        };
        var lnk5 = {
            name: "h3",
        };
        var lnk6 = {
            name: "h4",
        };
        var actual = [];
        navLinkBuilder.build(actual, lnk0, h1);
        navLinkBuilder.build(actual, lnk1, h1);
        navLinkBuilder.build(actual, lnk2, h2);
        navLinkBuilder.build(actual, lnk3, h2);
        navLinkBuilder.build(actual, lnk4, h3);
        navLinkBuilder.build(actual, lnk5, h3);
        navLinkBuilder.build(actual, lnk6, h4);
        expect(actual).toMatchSnapshot();
    });
});
describe("The NavLinkBuilder with a collapsable header", function () {
    var head;
    var depth = DEPTH_COLLAPSABLE_HEADER;
    var h1 = depth;
    var h2 = h1 + 1;
    var h3 = h2 + 1;
    var h4 = h3 + 1;
    beforeEach(function () {
        head = {
            name: "head",
        };
    });
    it("should nest correctly without h1", function () {
        var linkH2 = {
            name: "h2",
        };
        var linkH3 = {
            name: "h3",
        };
        var linkH2a = {
            name: "another h2",
        };
        var linkH3a = {
            name: "another h3",
        };
        var actual = [head];
        navLinkBuilder.build(actual, linkH2, h2);
        navLinkBuilder.build(actual, linkH3, h3);
        navLinkBuilder.build(actual, linkH2a, h2);
        navLinkBuilder.build(actual, linkH3a, h3);
        expect(actual).toMatchSnapshot();
    });
    it("should nest correctly for wrong order nestings", function () {
        var linkH1 = {
            name: "h1",
        };
        var linkH2 = {
            name: "h2",
        };
        var linkH3 = {
            name: "h3",
        };
        var linkH4 = {
            name: "h4",
        };
        var actual = [head];
        navLinkBuilder.build(actual, linkH4, h4);
        navLinkBuilder.build(actual, linkH3, h3);
        navLinkBuilder.build(actual, linkH2, h2);
        navLinkBuilder.build(actual, linkH1, h1);
        expect(actual).toMatchSnapshot();
    });
    it("should nest correctly for headings with a jump", function () {
        var linkH1 = {
            name: "h1",
        };
        var linkH2 = {
            name: "h2",
        };
        var linkH3 = {
            name: "h3",
        };
        var linkH4 = {
            name: "h4",
        };
        var actual = [];
        navLinkBuilder.build(actual, linkH3, h3);
        navLinkBuilder.build(actual, linkH4, h4);
        navLinkBuilder.build(actual, linkH1, h1);
        navLinkBuilder.build(actual, linkH2, h2);
        expect(actual).toMatchSnapshot();
    });
    it("should add a single item to the heading", function () {
        var lnk = {
            name: "xyz",
        };
        var actual = [head];
        navLinkBuilder.build(actual, lnk, h1);
        expect(actual).toMatchSnapshot();
    });
    it("should add a two items on the same level", function () {
        var lnk1 = {
            name: "xyz",
        };
        var lnk2 = {
            name: "abc",
        };
        var actual = [head];
        navLinkBuilder.build(actual, lnk1, h1);
        navLinkBuilder.build(actual, lnk2, h1);
        expect(actual).toMatchSnapshot();
    });
    it("should add a one item in a collapsable section two inside that one", function () {
        var lnk1 = {
            name: "xyz",
        };
        var lnk2 = {
            name: "abc",
        };
        var lnk3 = {
            name: "def",
        };
        var actual = [head];
        navLinkBuilder.build(actual, lnk1, h1);
        navLinkBuilder.build(actual, lnk2, h2);
        navLinkBuilder.build(actual, lnk3, h2);
        expect(actual).toMatchSnapshot();
    });
    it("should not nest two h2", function () {
        var lnk1 = {
            name: "h1",
        };
        var lnk2 = {
            name: "h2",
        };
        var lnk3 = {
            name: "h2",
        };
        var lnk4 = {
            name: "h3",
        };
        var actual = [head];
        navLinkBuilder.build(actual, lnk1, h1);
        navLinkBuilder.build(actual, lnk2, h2);
        navLinkBuilder.build(actual, lnk3, h2);
        navLinkBuilder.build(actual, lnk4, h3);
        expect(actual).toMatchSnapshot();
    });
    it("should not nest two h3", function () {
        var lnk0 = {
            name: "h1",
        };
        var lnk1 = {
            name: "h1",
        };
        var lnk2 = {
            name: "h2",
        };
        var lnk3 = {
            name: "h2",
        };
        var lnk4 = {
            name: "h3",
        };
        var lnk5 = {
            name: "h3",
        };
        var lnk6 = {
            name: "h4",
        };
        var actual = [head];
        navLinkBuilder.build(actual, lnk0, h1);
        navLinkBuilder.build(actual, lnk1, h1);
        navLinkBuilder.build(actual, lnk2, h2);
        navLinkBuilder.build(actual, lnk3, h2);
        navLinkBuilder.build(actual, lnk4, h3);
        navLinkBuilder.build(actual, lnk5, h3);
        navLinkBuilder.build(actual, lnk6, h4);
        expect(actual).toMatchSnapshot();
    });
});
//# sourceMappingURL=NavLinkBuilder.test.js.map