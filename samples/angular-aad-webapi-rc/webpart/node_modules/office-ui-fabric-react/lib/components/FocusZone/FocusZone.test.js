"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var KeyCodes_1 = require('../../utilities/KeyCodes');
var index_1 = require('./index');
var assert = chai.assert;
var _lastFocusedElement;
function _onFocus(ev) {
    _lastFocusedElement = ev.target;
}
describe('FocusZone', function () {
    it('can use arrows vertically', function () {
        var component = ReactTestUtils.renderIntoDocument(React.createElement("div", __assign({}, { onFocusCapture: _onFocus }), 
            React.createElement(index_1.FocusZone, {direction: index_1.FocusZoneDirection.vertical}, 
                React.createElement("button", {className: 'a'}, "a"), 
                React.createElement("button", {className: 'b'}, "b"), 
                React.createElement("button", {className: 'c'}, "c"))
        ));
        var focusZone = ReactDOM.findDOMNode(component).firstChild;
        var buttonA = focusZone.querySelector('.a');
        var buttonB = focusZone.querySelector('.b');
        var buttonC = focusZone.querySelector('.c');
        // Assign bounding locations to buttons.
        buttonA.getBoundingClientRect = function () { return ({
            top: 0, bottom: 30,
            left: 0, right: 100,
            width: 100,
            height: 30
        }); };
        buttonA.isVisible = true;
        buttonA.focus = function () { return ReactTestUtils.Simulate.focus(buttonA); };
        buttonB.getBoundingClientRect = function () { return ({
            top: 30, bottom: 60,
            left: 0, right: 100,
            width: 100,
            height: 30
        }); };
        buttonB.isVisible = true;
        buttonB.focus = function () { return ReactTestUtils.Simulate.focus(buttonB); };
        buttonC.getBoundingClientRect = function () { return ({
            top: 60, bottom: 90,
            left: 0, right: 100,
            width: 100,
            height: 30
        }); };
        buttonC.isVisible = true;
        buttonC.focus = function () { return ReactTestUtils.Simulate.focus(buttonC); };
        // Focus the first button.
        ReactTestUtils.Simulate.focus(buttonA);
        assert(_lastFocusedElement === buttonA, 'buttonA was not focused');
        // Pressing down should go to b.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.down });
        assert(_lastFocusedElement === buttonB, 'pressing down did not focus b');
        // Pressing down should go to c.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.down });
        assert(_lastFocusedElement === buttonC, 'pressing down did not focus c');
        // Pressing down should stay on c.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.down });
        assert(_lastFocusedElement === buttonC, 'pressing down again did not stay on c');
        // Pressing up should go to b.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.up });
        assert(_lastFocusedElement === buttonB, 'pressing up did not focus b');
        // Pressing up should go to a.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.up });
        assert(_lastFocusedElement === buttonA, 'pressing up did not focus a');
        // Pressing up should stay on a.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.up });
        assert(_lastFocusedElement === buttonA, 'pressing up again did not stay on a');
        // Click on c to focus it.
        ReactTestUtils.Simulate.focus(buttonC);
        assert(_lastFocusedElement === buttonC, 'buttonC was not focused');
        // Pressing up should move to b.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.up });
        assert(_lastFocusedElement === buttonB, 'pressing up after clicking on c did not focus b');
        // Test that pressing horizontal buttons don't move focus.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.left });
        assert(_lastFocusedElement === buttonB, 'pressing left did not keep focus on b');
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.right });
        assert(_lastFocusedElement === buttonB, 'pressing right did not keep focus on b');
        // Press home should go to the first target.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.home });
        assert(_lastFocusedElement === buttonA, 'pressing home did not move focus to a');
        // // Press end should go to the last target.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.end });
        assert(_lastFocusedElement === buttonC, 'pressing end did not move focus to c');
    });
    it('can use arrows horizontally', function () {
        var component = ReactTestUtils.renderIntoDocument(React.createElement("div", __assign({}, { onFocusCapture: _onFocus }), 
            React.createElement(index_1.FocusZone, {direction: index_1.FocusZoneDirection.horizontal}, 
                React.createElement("button", {className: 'a'}, "a"), 
                React.createElement("button", {className: 'b'}, "b"), 
                React.createElement("button", {className: 'c'}, "c"))
        ));
        var focusZone = ReactDOM.findDOMNode(component).firstChild;
        var buttonA = focusZone.querySelector('.a');
        var buttonB = focusZone.querySelector('.b');
        var buttonC = focusZone.querySelector('.c');
        // Assign bounding locations to buttons.
        buttonA.getBoundingClientRect = function () { return ({
            left: 0, right: 30,
            top: 0, bottom: 100,
            width: 30,
            height: 100
        }); };
        buttonA.isVisible = true;
        buttonA.focus = function () { return ReactTestUtils.Simulate.focus(buttonA); };
        buttonB.getBoundingClientRect = function () { return ({
            left: 30, right: 60,
            top: 0, bottom: 100,
            width: 30,
            height: 100
        }); };
        buttonB.isVisible = true;
        buttonB.focus = function () { return ReactTestUtils.Simulate.focus(buttonB); };
        buttonC.getBoundingClientRect = function () { return ({
            left: 60, right: 90,
            top: 0, bottom: 100,
            width: 30,
            height: 100
        }); };
        buttonC.isVisible = true;
        buttonC.focus = function () { return ReactTestUtils.Simulate.focus(buttonC); };
        // Focus the first button.
        ReactTestUtils.Simulate.focus(buttonA);
        assert(_lastFocusedElement === buttonA, 'buttonA was not focused');
        // Pressing right should go to b.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.right });
        assert(_lastFocusedElement === buttonB, 'pressing right did not focus b');
        // Pressing right should go to c.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.right });
        assert(_lastFocusedElement === buttonC, 'pressing right did not focus c');
        // Pressing right should stay on c.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.right });
        assert(_lastFocusedElement === buttonC, 'pressing right again did not stay on c');
        // Pressing left should go to b.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.left });
        assert(_lastFocusedElement === buttonB, 'pressing left did not focus b');
        // Pressing left should go to a.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.left });
        assert(_lastFocusedElement === buttonA, 'pressing left did not focus a');
        // Pressing left should stay on a.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.left });
        assert(_lastFocusedElement === buttonA, 'pressing left again did not stay on a');
        // Click on c to focus it.
        ReactTestUtils.Simulate.focus(buttonC);
        assert(_lastFocusedElement === buttonC, 'buttonC was not focused');
        // Pressing left should move to b.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.left });
        assert(_lastFocusedElement === buttonB, 'pressing left after clicking on c did not focus b');
        // Test that pressing vertical buttons don't move focus.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.up });
        assert(_lastFocusedElement === buttonB, 'pressing up did not keep focus on b');
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.down });
        assert(_lastFocusedElement === buttonB, 'pressing down did not keep focus on b');
        // Press home should go to the first target.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.home });
        assert(_lastFocusedElement === buttonA, 'pressing home did not move focus to a');
        // // Press end should go to the last target.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.end });
        assert(_lastFocusedElement === buttonC, 'pressing end did not move focus to c');
    });
    it('can use arrows bidirectionally', function () {
        var component = ReactTestUtils.renderIntoDocument(React.createElement("div", __assign({}, { onFocusCapture: _onFocus }), 
            React.createElement(index_1.FocusZone, null, 
                React.createElement("button", {className: 'a'}, "a"), 
                React.createElement("button", {className: 'b'}, "b"), 
                React.createElement("button", {className: 'c'}, "c"), 
                React.createElement("button", {className: 'hidden'}, "hidden"), 
                React.createElement("button", {className: 'd'}, "d"), 
                React.createElement("button", {className: 'e'}, "e"))
        ));
        var focusZone = ReactDOM.findDOMNode(component).firstChild;
        var buttonA = focusZone.querySelector('.a');
        var buttonB = focusZone.querySelector('.b');
        var buttonC = focusZone.querySelector('.c');
        var hiddenButton = focusZone.querySelector('.hidden');
        var buttonD = focusZone.querySelector('.d');
        var buttonE = focusZone.querySelector('.e');
        // Set up a grid like so:
        // A B
        // C hiddenButton
        // D E
        //
        // We will iterate from A to B, press down to skip hidden and go to C,
        // down again to E, left to D, then back up to A.
        buttonA.getBoundingClientRect = function () { return ({
            left: 0, right: 20,
            top: 0, bottom: 20,
            width: 20,
            height: 20
        }); };
        buttonA.isVisible = true;
        buttonA.focus = function () { return ReactTestUtils.Simulate.focus(buttonA); };
        buttonB.getBoundingClientRect = function () { return ({
            left: 20, right: 40,
            top: 0, bottom: 20,
            width: 20,
            height: 20
        }); };
        buttonB.isVisible = true;
        buttonB.focus = function () { return ReactTestUtils.Simulate.focus(buttonB); };
        buttonC.getBoundingClientRect = function () { return ({
            left: 0, right: 20,
            top: 20, bottom: 40,
            width: 20,
            height: 20
        }); };
        buttonC.isVisible = true;
        buttonC.focus = function () { return ReactTestUtils.Simulate.focus(buttonC); };
        // hidden button should be ignored.
        hiddenButton.getBoundingClientRect = function () { return ({
            left: 2, right: 40,
            top: 20, bottom: 40,
            width: 20,
            height: 20
        }); };
        hiddenButton.hidden = true;
        hiddenButton.focus = function () { return ReactTestUtils.Simulate.focus(hiddenButton); };
        buttonD.getBoundingClientRect = function () { return ({
            left: 0, right: 20,
            top: 40, bottom: 60,
            width: 20,
            height: 20
        }); };
        buttonD.isVisible = true;
        buttonD.focus = function () { return ReactTestUtils.Simulate.focus(buttonD); };
        buttonE.getBoundingClientRect = function () { return ({
            left: 20, right: 40,
            top: 40, bottom: 60,
            width: 20,
            height: 20
        }); };
        buttonE.isVisible = true;
        buttonE.focus = function () { return ReactTestUtils.Simulate.focus(buttonE); };
        // Focus the first button.
        ReactTestUtils.Simulate.focus(buttonA);
        assert(_lastFocusedElement === buttonA, 'buttonA was not focused');
        // Pressing right should go to b.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.right });
        assert(_lastFocusedElement === buttonB, 'pressing right did not focus b');
        // Pressing down should go to c.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.down });
        assert(_lastFocusedElement === buttonC, 'pressing down did not focus c');
        // Pressing down should go to e.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.down });
        assert(_lastFocusedElement === buttonE, 'pressing down did not focus e');
        // Pressing left should go to d.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.left });
        assert(_lastFocusedElement === buttonD, 'pressing left did not focus d');
        // Pressing up should go to c.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.up });
        assert(_lastFocusedElement === buttonC, 'pressing up did not focus c');
        // Pressing up should go to a.
        ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes_1.KeyCodes.up });
        assert(_lastFocusedElement === buttonA, 'pressing up did not focus a');
    });
});

//# sourceMappingURL=FocusZone.test.js.map
