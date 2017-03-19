"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
var ReactDOM = require('react-dom');
/* tslint:enable:no-unused-variable */
var ReactTestUtils = require('react-addons-test-utils');
var expect = chai.expect;
var ChoiceGroup_1 = require('./ChoiceGroup');
describe('ChoiceGroup', function () {
    it('Can change options.', function () {
        var options = [
            { key: '1', text: '1' },
            { key: '2', text: '2' },
            { key: '3', text: '3' }
        ];
        var exception;
        var threwException = false;
        var choiceGroup;
        try {
            choiceGroup = ReactTestUtils.renderIntoDocument(React.createElement(ChoiceGroup_1.ChoiceGroup, {label: 'testgroup', options: options, required: true}));
        }
        catch (e) {
            exception = e;
            threwException = true;
        }
        expect(threwException).to.be.false;
        var renderedDOM = ReactDOM.findDOMNode(choiceGroup);
        var choiceOptions = renderedDOM.querySelectorAll('.ms-ChoiceField-input');
        expect(choiceOptions[0].checked).to.be.eq(false, 'Choice 1 was true before click');
        expect(choiceOptions[1].checked).to.be.eq(false, 'Choice 2 was true before click');
        expect(choiceOptions[2].checked).to.be.eq(false, 'Choice 3 was true before click');
        ReactTestUtils.Simulate.change(choiceOptions[0]);
        expect(choiceOptions[0].checked).to.be.eq(true, 'Choice 1 was false after click 1');
        expect(choiceOptions[1].checked).to.be.eq(false, 'Choice 2 was true after click 1');
        expect(choiceOptions[2].checked).to.be.eq(false, 'Choice 3 was true after click 1');
        ReactTestUtils.Simulate.change(choiceOptions[1]);
        expect(choiceOptions[0].checked).to.be.eq(false, 'Choice 1 was true after click 2');
        expect(choiceOptions[1].checked).to.be.eq(true, 'Choice 2 was false after click 2');
        expect(choiceOptions[2].checked).to.be.eq(false, 'Choice 3 was true after click 2');
        ReactTestUtils.Simulate.change(choiceOptions[0]);
        expect(choiceOptions[0].checked).to.be.eq(true, 'Choice 1 was false after click 3');
        expect(choiceOptions[1].checked).to.be.eq(false, 'Choice 2 was true after click 3');
        expect(choiceOptions[2].checked).to.be.eq(false, 'Choice 3 was true after click 3');
    });
    it('An individual choice option can be disabled', function () {
        var options = [
            { key: '1', text: '1', disabled: true },
            { key: '2', text: '2' },
            { key: '3', text: '3' }
        ];
        var exception;
        var threwException = false;
        var choiceGroup;
        try {
            choiceGroup = ReactTestUtils.renderIntoDocument(React.createElement(ChoiceGroup_1.ChoiceGroup, {label: 'testgroup', options: options, required: true}));
        }
        catch (e) {
            exception = e;
            threwException = true;
        }
        expect(threwException).to.be.false;
        var renderedDOM = ReactDOM.findDOMNode(choiceGroup);
        var choiceOptions = renderedDOM.querySelectorAll('.ms-ChoiceField-input');
        expect(choiceOptions[0].disabled).to.be.eq(true, 'Disabled option 1 is not disabled');
        expect(choiceOptions[1].disabled).to.be.eq(false, 'Not disabled option 2 is disabled');
        expect(choiceOptions[2].disabled).to.be.eq(false, 'Not disabled option 2 is disabled');
    });
    it('When choicegroup is disabled all choice options are disabled', function () {
        var options = [
            { key: '1', text: '1' },
            { key: '2', text: '2' },
            { key: '3', text: '3' }
        ];
        var exception;
        var threwException = false;
        var choiceGroup;
        try {
            choiceGroup = ReactTestUtils.renderIntoDocument(React.createElement(ChoiceGroup_1.ChoiceGroup, {label: 'testgroup', options: options, required: true, disabled: true}));
        }
        catch (e) {
            exception = e;
            threwException = true;
        }
        expect(threwException).to.be.false;
        var renderedDOM = ReactDOM.findDOMNode(choiceGroup);
        var choiceOptions = renderedDOM.querySelectorAll('.ms-ChoiceField-input');
        expect(choiceOptions[0].disabled).to.be.eq(true, 'Disabled option 1 is not disabled');
        expect(choiceOptions[1].disabled).to.be.eq(true, 'Disabled option 2 is not disabled');
        expect(choiceOptions[2].disabled).to.be.eq(true, 'Disabled option 3 is not disabled');
    });
});

//# sourceMappingURL=ChoiceGroup.test.js.map
