"use strict";
require('es6-promise');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var TextField_1 = require('./TextField');
var expect = chai.expect;
describe('TextField', function () {
    function renderIntoDocument(element) {
        var component = ReactTestUtils.renderIntoDocument(element);
        var renderedDOM = ReactDOM.findDOMNode(component);
        return renderedDOM;
    }
    function mockEvent(targetValue) {
        if (targetValue === void 0) { targetValue = ''; }
        var target = { value: targetValue };
        var event = { target: target };
        return event;
    }
    function delay(millisecond) {
        return new Promise(function (resolve) { return setTimeout(resolve, millisecond); });
    }
    it('should render label and value to input element', function () {
        var exampleLabel = 'this is label';
        var exampleValue = 'this is value';
        var renderedDOM = renderIntoDocument(React.createElement(TextField_1.TextField, {label: exampleLabel, value: exampleValue}));
        // Assert on the input element.
        var inputDOM = renderedDOM.getElementsByTagName('input')[0];
        expect(inputDOM.value).to.equal(exampleValue);
        expect(inputDOM.getAttribute('label')).to.equal(exampleLabel);
        // Assert on the label element.
        var labelDOM = renderedDOM.getElementsByTagName('label')[0];
        expect(labelDOM.textContent).to.equal(exampleLabel);
    });
    it('should render multiline as text area element', function () {
        var renderedDOM = renderIntoDocument(React.createElement(TextField_1.TextField, {value: 'This\nIs\nMultiline\nText\n', multiline: true}));
        // Assert on the input element.
        var inputDOM = renderedDOM.getElementsByTagName('textarea')[0];
        expect(inputDOM.value).not.be.be.empty;
    });
    it('should associate the label and input box', function () {
        var renderedDOM = renderIntoDocument(React.createElement(TextField_1.TextField, {label: 'text-field-label', value: 'whatever value'}));
        var inputDOM = renderedDOM.getElementsByTagName('input')[0];
        var labelDOM = renderedDOM.getElementsByTagName('label')[0];
        // Assert the input ID and label FOR attribute are the same.
        expect(inputDOM.id).to.not.be.empty;
        expect(inputDOM.id).to.equal(labelDOM.htmlFor);
    });
    it('should render a disabled input element', function () {
        var renderedDOM = renderIntoDocument(React.createElement(TextField_1.TextField, {disabled: true}));
        // Assert the input box is disabled.
        var inputDOM = renderedDOM.getElementsByTagName('input')[0];
        expect(inputDOM.disabled).to.equal(true);
    });
    describe('error message', function () {
        var errorMessage = 'The string is too long, should not exceed 3 characters.';
        function assertErrorMessage(renderedDOM, expectedErrorMessage) {
            var errorMessageDOM = renderedDOM.querySelector('[data-automation-id=error-message]');
            if (expectedErrorMessage === false) {
                expect(errorMessageDOM).to.be.null; // element not exists
            }
            else {
                expect(errorMessageDOM.textContent).to.equal(expectedErrorMessage);
            }
        }
        it('should render error message when onGetErrorMessage returns a string', function () {
            function validator(value) {
                return value.length > 3 ? errorMessage : '';
            }
            var renderedDOM = renderIntoDocument(React.createElement(TextField_1.TextField, {label: 'text-field-label', value: 'whatever value', onGetErrorMessage: validator}));
            var inputDOM = renderedDOM.getElementsByTagName('input')[0];
            ReactTestUtils.Simulate.change(inputDOM, mockEvent('the input value'));
            // The value is delayed to validate, so it must to query error message after a while.
            return delay(250).then(function () { return assertErrorMessage(renderedDOM, errorMessage); });
        });
        it('should render error message when onGetErrorMessage returns a Promise<string>', function () {
            function validator(value) {
                return Promise.resolve(value.length > 3 ? errorMessage : '');
            }
            var renderedDOM = renderIntoDocument(React.createElement(TextField_1.TextField, {label: 'text-field-label', value: 'whatever value', onGetErrorMessage: validator}));
            var inputDOM = renderedDOM.getElementsByTagName('input')[0];
            ReactTestUtils.Simulate.change(inputDOM, mockEvent('the input value'));
            // The value is delayed to validate, so it must to query error message after a while.
            return delay(250).then(function () { return assertErrorMessage(renderedDOM, errorMessage); });
        });
        it('should render error message on first render when onGetErrorMessage returns a string', function () {
            var renderedDOM = renderIntoDocument(React.createElement(TextField_1.TextField, {label: 'text-field-label', value: 'whatever value', onGetErrorMessage: function () { return errorMessage; }}));
            assertErrorMessage(renderedDOM, errorMessage);
        });
        it('should render error message on first render when onGetErrorMessage returns a Promise<string>', function () {
            var renderedDOM = renderIntoDocument(React.createElement(TextField_1.TextField, {label: 'text-field-label', value: 'whatever value', onGetErrorMessage: function () { return Promise.resolve(errorMessage); }}));
            // The Promise based validation need to assert with async pattern.
            return delay(1).then(function () { return assertErrorMessage(renderedDOM, errorMessage); });
        });
        it('should not render error message when onGetErrorMessage return an empty string', function () {
            var renderedDOM = renderIntoDocument(React.createElement(TextField_1.TextField, {label: 'text-field-label', value: 'whatever value', onGetErrorMessage: function () { return ''; }}));
            assertErrorMessage(renderedDOM, /* exist */ false);
        });
        it('should not render error message when no value is provided', function () {
            var actualValue = undefined;
            var renderedDOM = renderIntoDocument(React.createElement(TextField_1.TextField, {label: 'text-field-label', onGetErrorMessage: function (value) { return actualValue = value; }}));
            assertErrorMessage(renderedDOM, /* exist */ false);
            expect(actualValue).to.equal('');
        });
        it('should update error message when receive new value from props', function () {
            function validator(value) {
                return value.length > 3 ? errorMessage : '';
            }
            var renderedDOM = renderIntoDocument(React.createElement(TextField_1.TextField, {value: 'initial value', onGetErrorMessage: validator}));
            assertErrorMessage(renderedDOM, errorMessage);
            ReactDOM.render(React.createElement(TextField_1.TextField, {value: '', onGetErrorMessage: validator}), renderedDOM.parentElement);
            return delay(250).then(function () { return assertErrorMessage(renderedDOM, /* exist */ false); });
        });
    });
    it('can render a default value', function () {
        var renderedDOM = renderIntoDocument(React.createElement(TextField_1.TextField, {defaultValue: 'initial value'}));
        expect(renderedDOM.querySelector('input').value).equals('initial value');
    });
    it('can render a default value as a textarea', function () {
        var renderedDOM = renderIntoDocument(React.createElement(TextField_1.TextField, {defaultValue: 'initial value', multiline: true}));
        expect(renderedDOM.querySelector('textarea').value).equals('initial value');
    });
});

//# sourceMappingURL=TextField.test.js.map
