"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
require('./CalloutExample.scss');
var index_1 = require('../../../../index');
var CalloutNestedExample = (function (_super) {
    __extends(CalloutNestedExample, _super);
    function CalloutNestedExample() {
        _super.call(this);
        this._onDismiss = this._onDismiss.bind(this);
        this.state = {
            isCalloutVisible: false,
        };
    }
    CalloutNestedExample.prototype.render = function () {
        var _this = this;
        var isCalloutVisible = this.state.isCalloutVisible;
        return (React.createElement("div", {className: 'ms-CalloutExample'}, 
            React.createElement("div", {className: 'ms-CalloutBasicExample-buttonArea', ref: function (menuButton) { return _this._menuButtonElement = menuButton; }}, 
                React.createElement(index_1.Button, {onClick: this._onDismiss}, isCalloutVisible ? 'Hide callout' : 'Show callout')
            ), 
            isCalloutVisible ? (React.createElement("div", null, 
                React.createElement(index_1.Callout, {className: 'ms-CalloutExample-callout', gapSpace: 0, targetElement: this._menuButtonElement, onDismiss: function (ev) { _this._onDismiss(ev); }, setInitialFocus: true}, 
                    React.createElement("div", {className: 'ms-CalloutExample-header'}, 
                        React.createElement("p", {className: 'ms-CalloutExample-title'}, "Callout title here")
                    ), 
                    React.createElement("div", {className: 'ms-CalloutExample-inner'}, 
                        React.createElement("div", {className: 'ms-CalloutExample-content'}, 
                            React.createElement("p", {className: 'ms-CalloutExample-subText'}, "Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.")
                        )
                    ), 
                    React.createElement(index_1.CommandBar, {items: this.props.items}))
            )) : (null)));
    };
    CalloutNestedExample.prototype._onDismiss = function (ev) {
        this.setState({
            isCalloutVisible: !this.state.isCalloutVisible
        });
    };
    return CalloutNestedExample;
}(React.Component));
exports.CalloutNestedExample = CalloutNestedExample;

//# sourceMappingURL=Callout.Nested.Example.js.map
