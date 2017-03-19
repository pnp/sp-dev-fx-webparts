"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var ReactDOM = require('react-dom');
var index_1 = require('../../../../index');
require('./FocusTrapZone.Box.Example.scss');
var index_2 = require('../../../../index');
var BoxNoClickExample = (function (_super) {
    __extends(BoxNoClickExample, _super);
    function BoxNoClickExample(props) {
        _super.call(this, props);
        this.state = {
            isToggled: false,
        };
    }
    BoxNoClickExample.prototype.render = function () {
        var _this = this;
        var isToggled = this.state.isToggled;
        return (React.createElement("div", null, 
            React.createElement(index_2.Button, {description: 'Focuses inside the FocusTrapZone', onClick: this._onButtonClickHandler.bind(this)}, "Go to Trap Zone"), 
            (function () {
                if (isToggled) {
                    return (React.createElement(index_1.FocusTrapZone, {isClickableOutsideFocusTrap: true, forceFocusInsideTrap: false}, _this._internalContents()));
                }
                else {
                    return (React.createElement("div", null, _this._internalContents()));
                }
            })()));
    };
    BoxNoClickExample.prototype._internalContents = function () {
        var _this = this;
        var isToggled = this.state.isToggled;
        return (React.createElement("div", {className: 'ms-FocusTrapZoneBoxExample'}, 
            React.createElement(index_2.TextField, {label: 'Default TextField', placeholder: 'Input inside Focus Trap Zone', className: ''}), 
            React.createElement(index_2.Link, {href: '', className: ''}, "Hyperlink inside FocusTrapZone"), 
            React.createElement("br", null), 
            React.createElement("br", null), 
            React.createElement(index_2.Toggle, {ref: 'toggle', checked: isToggled, onChanged: this._onFocusTrapZoneToggleChanged.bind(this), label: 'Focus Trap Zone', onText: 'On', offText: 'Off'}), 
            (function () {
                if (isToggled) {
                    return (React.createElement(index_2.Button, {description: 'Exit Focus Trap Zone', onClick: _this._onExitButtonClickHandler.bind(_this)}, "Exit Focus Trap Zone"));
                }
            })()));
    };
    BoxNoClickExample.prototype._onButtonClickHandler = function () {
        this.setState({
            isToggled: true
        });
    };
    BoxNoClickExample.prototype._onExitButtonClickHandler = function () {
        this.setState({
            isToggled: false
        });
    };
    BoxNoClickExample.prototype._onFocusTrapZoneToggleChanged = function (isToggled) {
        var _this = this;
        this.setState({
            isToggled: isToggled
        }, function () {
            var toggle = ReactDOM.findDOMNode(_this.refs.toggle);
            if (toggle) {
                toggle.focus();
            }
        });
    };
    return BoxNoClickExample;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BoxNoClickExample;

//# sourceMappingURL=FocusTrapZone.Box.Click.Example.js.map
