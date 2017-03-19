"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var expect = chai.expect;
var Label_1 = require('./Label');
describe('Label', function () {
    it('renders a label', function () {
        var component = ReactTestUtils.renderIntoDocument(React.createElement(Label_1.Label, null, "test"));
        var renderedDOM = ReactDOM.findDOMNode(component);
        expect(renderedDOM.textContent).to.equal('test');
    });
});

//# sourceMappingURL=Label.test.js.map
