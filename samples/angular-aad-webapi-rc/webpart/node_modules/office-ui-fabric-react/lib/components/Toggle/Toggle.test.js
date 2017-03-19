"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var expect = chai.expect;
var Toggle_1 = require('./Toggle');
describe('Toggle', function () {
    it('renders a label', function () {
        var component = ReactTestUtils.renderIntoDocument(React.createElement(Toggle_1.Toggle, {label: 'Label'}));
        var renderedDOM = ReactDOM.findDOMNode(component);
        var labelElement = renderedDOM.querySelector('.ms-Toggle-label');
        expect(labelElement.textContent).to.equal('Label');
    });
    it('can call the callback on a change of toggle', function () {
        var isToggledValue;
        var callback = function (isToggled) {
            isToggledValue = isToggled;
        };
        var component = ReactTestUtils.renderIntoDocument(React.createElement(Toggle_1.Toggle, {label: 'Label', onChanged: callback}));
        var renderedDOM = ReactDOM.findDOMNode(component);
        var button = renderedDOM.querySelector('.ms-Toggle-button');
        ReactTestUtils.Simulate.click(button);
        expect(isToggledValue).to.equal(true);
        expect(component.state.isChecked).to.equal(true);
    });
    it("doesn't update the state if the user provides checked", function () {
        var component = ReactTestUtils.renderIntoDocument(React.createElement(Toggle_1.Toggle, {label: 'Label', checked: false}));
        var renderedDOM = ReactDOM.findDOMNode(component);
        var button = renderedDOM.querySelector('.ms-Toggle-button');
        ReactTestUtils.Simulate.click(button);
        expect(component.state.isChecked).to.equal(false);
    });
    it("doesn't render a label element if none is provided", function () {
        var component = ReactTestUtils.renderIntoDocument(React.createElement(Toggle_1.Toggle, {checked: false}));
        var renderedDOM = ReactDOM.findDOMNode(component);
        var label = renderedDOM.querySelector('label');
        expect(label).is.null;
    });
});

//# sourceMappingURL=Toggle.test.js.map
