"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var expect = chai.expect;
var index_1 = require('./index');
describe('TeachingBubble', function () {
    // <Layer> components will lead ReactDOM.findDOMNode(test_component) return null, so the test is based on the teaching bubble content.
    it('renders a label', function () {
        var component = ReactTestUtils.renderIntoDocument(React.createElement(index_1.TeachingBubbleContent, {headline: 'Title'}));
        var renderedDOM = ReactDOM.findDOMNode(component);
        var titleElement = renderedDOM.querySelector('.ms-TeachingBubble-headline');
        expect(titleElement.textContent).to.equal('Title');
    });
});

//# sourceMappingURL=TeachingBubble.test.js.map
