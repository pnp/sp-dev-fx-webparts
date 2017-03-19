"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var BaseAutoFill_1 = require('./BaseAutoFill');
var KeyCodes_1 = require('../../../utilities/KeyCodes');
var assert = chai.assert;
describe('BaseAutoFill', function () {
    var autoFill;
    var autoFillInput;
    var baseNode = document.createElement('div');
    document.body.appendChild(baseNode);
    beforeEach(function () {
        var component = ReactDOM.render(React.createElement(BaseAutoFill_1.BaseAutoFill, {ref: function (c) { return autoFill = c; }, suggestedDisplayValue: 'hello'}), baseNode);
        autoFillInput = ReactDOM.findDOMNode(component);
    });
    it('Input Text Works', function (done) {
        ReactDOM.render(React.createElement(BaseAutoFill_1.BaseAutoFill, {ref: function (c) { return autoFill = c; }, onInputValueChange: function (text) {
            assert(text === 'hel', 'text was ' + text);
            assert(autoFill.value === 'hel', 'autoFill value was ' + autoFill.value);
            assert(autoFill.inputElement.value === 'hello');
            done();
        }, suggestedDisplayValue: 'hello'}), baseNode);
        autoFillInput.value = 'hel';
        ReactTestUtils.Simulate.change(autoFillInput);
    });
    it('Delete Text Works', function (done) {
        autoFillInput.value = 'hel';
        ReactTestUtils.Simulate.change(autoFillInput);
        ReactDOM.render(React.createElement(BaseAutoFill_1.BaseAutoFill, {ref: function (c) { return autoFill = c; }, onInputValueChange: function (text) {
            assert(autoFill.value === 'he', 'text was ' + autoFill.value);
            assert(text === 'he', 'text was ' + text);
            assert(autoFill.inputElement.value === 'hello');
            done();
        }, suggestedDisplayValue: 'hello'}), baseNode);
        ReactTestUtils.Simulate.keyDown(autoFillInput, { keyCode: KeyCodes_1.KeyCodes.backspace, which: KeyCodes_1.KeyCodes.backspace });
    });
});

//# sourceMappingURL=BaseAutoFill.test.js.map
