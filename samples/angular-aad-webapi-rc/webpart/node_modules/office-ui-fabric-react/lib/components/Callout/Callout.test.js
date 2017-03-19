"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
var ReactDOM = require('react-dom');
/* tslint:enable:no-unused-variable */
var ReactTestUtils = require('react-addons-test-utils');
var Callout_1 = require('./Callout');
var DirectionalHint_1 = require('../../common/DirectionalHint');
var expect = chai.expect;
describe('Callout', function () {
    it('target id strings does not throw exception', function () {
        var threwException = false;
        var exception;
        try {
            ReactTestUtils.renderIntoDocument(React.createElement("div", null, 
                React.createElement("button", {id: 'target', style: { top: '10px', left: '10px', height: '0', width: '0px' }}, " target "), 
                React.createElement(Callout_1.Callout, {target: '#target', directionalHint: DirectionalHint_1.DirectionalHint.topLeftEdge}, 
                    React.createElement("div", null, "Content")
                )));
        }
        catch (e) {
            exception = e;
            threwException = true;
        }
        expect(threwException).to.be.false;
    });
    it('target MouseEvents does not throw exception', function () {
        var mouseEvent = document.createEvent('MouseEvent');
        var eventTarget = document.createElement('div');
        mouseEvent.initMouseEvent('click', false, false, window, 0, 0, 0, 0, 0, false, false, false, false, 1, eventTarget);
        var threwException = false;
        try {
            ReactTestUtils.renderIntoDocument(React.createElement("div", null, 
                React.createElement(Callout_1.Callout, {target: eventTarget, directionalHint: DirectionalHint_1.DirectionalHint.topLeftEdge}, 
                    React.createElement("div", null, "Content")
                )
            ));
        }
        catch (e) {
            threwException = true;
        }
        expect(threwException).to.be.false;
    });
    it('target HTMLElements does not throw exception', function () {
        var targetElement = document.createElement('div');
        document.body.appendChild(targetElement);
        var threwException = false;
        try {
            ReactTestUtils.renderIntoDocument(React.createElement("div", null, 
                React.createElement(Callout_1.Callout, {target: targetElement, directionalHint: DirectionalHint_1.DirectionalHint.topLeftEdge}, 
                    React.createElement("div", null, "Content")
                )
            ));
        }
        catch (e) {
            threwException = true;
        }
        expect(threwException).to.be.false;
    });
    // Once this has been deprecated completely in v1.0 this is no longer needed.
    it('targetElement  HTMLElements does not throw exception', function () {
        var targetElement = document.createElement('div');
        document.body.appendChild(targetElement);
        var threwException = false;
        try {
            ReactTestUtils.renderIntoDocument(React.createElement("div", null, 
                React.createElement(Callout_1.Callout, {targetElement: targetElement, directionalHint: DirectionalHint_1.DirectionalHint.topLeftEdge}, 
                    React.createElement("div", null, "Content")
                )
            ));
        }
        catch (e) {
            threwException = true;
        }
        expect(threwException).to.be.false;
    });
    it('without target does not throw exception', function () {
        var threwException = false;
        try {
            ReactTestUtils.renderIntoDocument(React.createElement("div", null, 
                React.createElement(Callout_1.Callout, {directionalHint: DirectionalHint_1.DirectionalHint.topLeftEdge}, 
                    React.createElement("div", null, "Content")
                )
            ));
        }
        catch (e) {
            threwException = true;
        }
        expect(threwException).to.be.false;
    });
    it('passes event to onDismiss prop', function () {
        var threwException = false;
        var gotEvent = false;
        var onDismiss = function (ev) {
            if (ev) {
                gotEvent = true;
            }
        };
        // In order to have eventlisteners that have been added to the window to be called the JSX needs
        // to be rendered into the real dom rather than the testutil simulated dom.
        var root = document.createElement('div');
        document.body.appendChild(root);
        try {
            ReactDOM.render(React.createElement("div", null, 
                React.createElement("button", {id: 'focustarget'}, " button "), 
                React.createElement("button", {id: 'target', style: { top: '10px', left: '10px', height: '0', width: '0px' }}, " target "), 
                React.createElement(Callout_1.Callout, {target: '#target', directionalHint: DirectionalHint_1.DirectionalHint.topLeftEdge, onDismiss: onDismiss}, 
                    React.createElement("div", null, "Content")
                )), root);
        }
        catch (e) {
            threwException = true;
        }
        expect(threwException).to.be.false;
        var focusTarget = document.querySelector('#focustarget');
        focusTarget.focus();
        expect(gotEvent).to.be.eq(true, 'Event did not get passed to dismiss event');
    });
});

//# sourceMappingURL=Callout.test.js.map
