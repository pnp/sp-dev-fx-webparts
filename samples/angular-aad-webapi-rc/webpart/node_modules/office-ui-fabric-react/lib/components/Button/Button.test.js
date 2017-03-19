"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
var ReactDOM = require('react-dom');
/* tslint:enable:no-unused-variable */
var ReactTestUtils = require('react-addons-test-utils');
var Button_1 = require('./Button');
var expect = chai.expect;
describe('Button', function () {
    it('can render without an onClick.', function () {
        var button = ReactTestUtils.renderIntoDocument(React.createElement(Button_1.Button, null, "Hello"));
        var renderedDOM = ReactDOM.findDOMNode(button);
        console.log(renderedDOM.tagName);
        expect(renderedDOM.tagName).equals('BUTTON', 'A Button with no onClick renders as a span');
    });
    it('can render with an onClick.', function () {
        var onClick = function () { return null; };
        var button = ReactTestUtils.renderIntoDocument(React.createElement(Button_1.Button, {onClick: onClick}, "Hello"));
        var renderedDOM = ReactDOM.findDOMNode(button);
        console.log(renderedDOM.tagName);
        expect(renderedDOM.tagName).equals('BUTTON', 'A Button with onClick renders as a button');
    });
    it('can render with an href', function () {
        var button = ReactTestUtils.renderIntoDocument(React.createElement(Button_1.Button, {href: 'http://www.microsoft.com', target: '_blank'}, "Hello"));
        var renderedDOM = ReactDOM.findDOMNode(button);
        console.log(renderedDOM.tagName);
        expect(renderedDOM.tagName).equals('A', 'A Button with an href renders as an anchor');
    });
});

//# sourceMappingURL=Button.test.js.map
