"use strict";
var dom_1 = require('./dom');
var expect = chai.expect;
var unattachedSvg = document.createElement('svg');
var unattachedDiv = document.createElement('div');
var parentDiv = document.createElement('div');
var childDiv = document.createElement('div');
parentDiv.appendChild(childDiv);
describe('elementContains', function () {
    it('can find a child', function () {
        expect(dom_1.elementContains(parentDiv, childDiv)).equals(true);
    });
    it('can return false on an unattached child', function () {
        expect(dom_1.elementContains(parentDiv, unattachedDiv)).equals(false);
    });
    it('can return false on a null child', function () {
        expect(dom_1.elementContains(parentDiv, null)).equals(false);
    });
    it('can return false on a null parent', function () {
        expect(dom_1.elementContains(null, null)).equals(false);
    });
    it('can return false when parent is an svg', function () {
        expect(dom_1.elementContains(unattachedSvg, unattachedDiv)).equals(false);
    });
});
describe('getParent', function () {
    it('returns correct parent for inner SVG elements', function () {
        var childSvg = document.createElement('svg');
        var svgRectangle = document.createElement('rect');
        childSvg.appendChild(svgRectangle);
        parentDiv.appendChild(childSvg);
        expect(dom_1.getParent(svgRectangle)).equals(childSvg);
        expect(dom_1.getParent(childSvg)).equals(parentDiv);
    });
});

//# sourceMappingURL=dom.test.js.map
