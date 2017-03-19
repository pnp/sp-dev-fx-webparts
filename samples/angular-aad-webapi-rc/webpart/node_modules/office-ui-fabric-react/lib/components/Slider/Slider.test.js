"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var expect = chai.expect;
var Slider_1 = require('./Slider');
describe('Slider', function () {
    it('renders a slider', function () {
        var component = ReactTestUtils.renderIntoDocument(React.createElement(Slider_1.Slider, {label: 'slider'}));
        var renderedDOM = ReactDOM.findDOMNode(component);
        var labelElement = renderedDOM.querySelector('.ms-Label');
        expect(labelElement.textContent).to.equal('slider');
    });
    it('can slide to default min/max and execute onChange', function () {
        var changedValue;
        var onChange = function (val) {
            changedValue = val;
        };
        var component = ReactTestUtils.renderIntoDocument(React.createElement(Slider_1.Slider, {onChange: onChange}));
        var renderedDOM = ReactDOM.findDOMNode(component);
        var sliderLine = renderedDOM.querySelector('.ms-Slider-line');
        var sliderThumb = renderedDOM.querySelector('.ms-Slider-slideBox');
        sliderLine.getBoundingClientRect = function () { return ({
            left: 0,
            top: 0,
            right: 100,
            bottom: 40,
            width: 100,
            height: 40
        }); };
        ReactTestUtils.Simulate.mouseDown(sliderThumb, {
            type: 'mousedown',
            clientX: 100,
            clientY: 0
        });
        // Default max is 10.
        expect(changedValue).equals(10);
        ReactTestUtils.Simulate.mouseDown(sliderThumb, {
            type: 'mousedown',
            clientX: 0,
            clientY: 0
        });
        // Default min is 0.
        expect(changedValue).equals(0);
    });
    it('has type=button on all buttons', function () {
        var component = ReactTestUtils.renderIntoDocument(React.createElement(Slider_1.Slider, null));
        var renderedDOM = ReactDOM.findDOMNode(component);
        var allButtons = renderedDOM.querySelectorAll('button');
        for (var i = 0; i < allButtons.length; i++) {
            var button = allButtons[i];
            expect(button.getAttribute('type')).equals('button');
        }
    });
});

//# sourceMappingURL=Slider.test.js.map
