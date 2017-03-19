"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var expect = chai.expect;
var focus_1 = require('./focus');
var _hiddenElement;
var _visibleElement;
var _element;
function renderIntoDocument(element) {
    var component = ReactTestUtils.renderIntoDocument(element);
    var renderedDOM = ReactDOM.findDOMNode(component);
    return renderedDOM;
}
function _initialize() {
    _hiddenElement = renderIntoDocument(React.createElement("div", {"data-is-visible": false}, 
        React.createElement("button", null)
    ));
    _visibleElement = renderIntoDocument(React.createElement("div", {"data-is-visible": true}, 
        React.createElement("button", null)
    ));
    _element = renderIntoDocument(React.createElement("div", null, 
        React.createElement("button", null)
    ));
    _element.isVisible = true;
}
describe('isElementVisible', function () {
    beforeEach(function () { return _initialize(); });
    it('returns false if data-is-visible is false', function () {
        expect(focus_1.isElementVisible(_hiddenElement)).equals(false, 'Element is not visible');
    });
    it('returns true if data-is-visible is true', function () {
        expect(focus_1.isElementVisible(_visibleElement)).equals(true, 'Element is visible');
    });
    it('returns true if data-is-visible is undefined but element is visible', function () {
        expect(focus_1.isElementVisible(_element)).equals(true, 'Element is visible but data-is-visible is undefined');
    });
});

//# sourceMappingURL=focus.test.js.map
