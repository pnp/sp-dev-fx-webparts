"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
require('./CalloutExample.scss');
var index_1 = require('../../../../index');
var CalloutBasicExample = (function (_super) {
    __extends(CalloutBasicExample, _super);
    function CalloutBasicExample() {
        _super.call(this);
        this._onShowMenuClicked = this._onShowMenuClicked.bind(this);
        this._onCalloutDismiss = this._onCalloutDismiss.bind(this);
        this.state = {
            isCalloutVisible: false
        };
    }
    CalloutBasicExample.prototype.render = function () {
        var _this = this;
        var isCalloutVisible = this.state.isCalloutVisible;
        return (React.createElement("div", {className: 'ms-CalloutExample'}, 
            React.createElement("div", {className: 'ms-CalloutBasicExample-buttonArea', ref: function (menuButton) { return _this._menuButtonElement = menuButton; }}, 
                React.createElement(index_1.Button, {onClick: this._onShowMenuClicked}, isCalloutVisible ? 'Hide callout' : 'Show callout')
            ), 
            isCalloutVisible && (React.createElement(index_1.Callout, {className: 'ms-CalloutExample-callout', gapSpace: 0, targetElement: this._menuButtonElement, onDismiss: this._onCalloutDismiss, setInitialFocus: true}, 
                React.createElement("div", {className: 'ms-CalloutExample-header'}, 
                    React.createElement("p", {className: 'ms-CalloutExample-title'}, "All of your favorite people")
                ), 
                React.createElement("div", {className: 'ms-CalloutExample-inner'}, 
                    React.createElement("div", {className: 'ms-CalloutExample-content'}, 
                        React.createElement("p", {className: 'ms-CalloutExample-subText'}, "Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.")
                    ), 
                    React.createElement("div", {className: 'ms-CalloutExample-actions'}, 
                        React.createElement(index_1.Link, {className: 'ms-CalloutExample-link', href: 'http://microsoft.com'}, "Go to microsoft")
                    ))))));
    };
    CalloutBasicExample.prototype._onShowMenuClicked = function () {
        this.setState({
            isCalloutVisible: !this.state.isCalloutVisible
        });
    };
    CalloutBasicExample.prototype._onCalloutDismiss = function () {
        this.setState({
            isCalloutVisible: false
        });
    };
    return CalloutBasicExample;
}(React.Component));
exports.CalloutBasicExample = CalloutBasicExample;

//# sourceMappingURL=Callout.Basic.Example.js.map
