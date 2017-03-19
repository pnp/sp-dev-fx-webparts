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
var BoxExample = (function (_super) {
    __extends(BoxExample, _super);
    function BoxExample(props) {
        _super.call(this, props);
        this.state = {
            isChecked: false,
        };
    }
    BoxExample.prototype.render = function () {
        var _this = this;
        var isChecked = this.state.isChecked;
        return (React.createElement("div", null, 
            React.createElement(index_2.Button, {description: 'Focuses inside the FocusTrapZone', onClick: this._onButtonClickHandler.bind(this)}, "Go to Trap Zone"), 
            (function () {
                if (isChecked) {
                    return (React.createElement(index_1.FocusTrapZone, null, _this._internalContents()));
                }
                else {
                    return (React.createElement("div", null, _this._internalContents()));
                }
            })()));
    };
    BoxExample.prototype._internalContents = function () {
        var _this = this;
        var isChecked = this.state.isChecked;
        return (React.createElement("div", {className: 'ms-FocusTrapZoneBoxExample'}, 
            React.createElement(index_2.TextField, {label: 'Default TextField', placeholder: 'Input inside Focus Trap Zone', className: ''}), 
            React.createElement(index_2.Link, {href: '', className: ''}, "Hyperlink inside FocusTrapZone"), 
            React.createElement("br", null), 
            React.createElement("br", null), 
            React.createElement(index_2.Toggle, {ref: 'toggle', checked: isChecked, onChanged: this._onFocusTrapZoneToggleChanged.bind(this), label: 'Focus Trap Zone', onText: 'On', offText: 'Off'}), 
            (function () {
                if (isChecked) {
                    return (React.createElement(index_2.Button, {description: 'Exit Focus Trap Zone', onClick: _this._onExitButtonClickHandler.bind(_this)}, "Exit Focus Trap Zone"));
                }
            })()));
    };
    BoxExample.prototype._onButtonClickHandler = function () {
        this.setState({
            isChecked: true
        });
    };
    BoxExample.prototype._onExitButtonClickHandler = function () {
        this.setState({
            isChecked: false
        });
    };
    BoxExample.prototype._onFocusTrapZoneToggleChanged = function (isChecked) {
        var _this = this;
        this.setState({
            isChecked: isChecked
        }, function () {
            var toggle = ReactDOM.findDOMNode(_this.refs.toggle);
            if (toggle) {
                toggle.focus();
            }
        });
    };
    return BoxExample;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BoxExample;

//# sourceMappingURL=FocusTrapZone.Box.Example.js.map
