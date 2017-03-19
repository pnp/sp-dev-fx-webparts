"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var BaseComponent_1 = require('../../common/BaseComponent');
var autobind_1 = require('../../utilities/autobind');
var css_1 = require('../../utilities/css');
var object_1 = require('../../utilities/object');
require('./Checkbox.scss');
var Checkbox = (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox(props) {
        _super.call(this, props);
        this._id = object_1.getId('checkbox-');
        this.state = {
            isFocused: false,
            isChecked: props.defaultChecked || false
        };
    }
    Checkbox.prototype.render = function () {
        var _a = this.props, checked = _a.checked, className = _a.className, defaultChecked = _a.defaultChecked, disabled = _a.disabled, inputProps = _a.inputProps, label = _a.label;
        var isFocused = this.state.isFocused;
        var isChecked = checked === undefined ? this.state.isChecked : checked;
        return (React.createElement("div", {className: css_1.css('ms-Checkbox', className, { 'is-inFocus': isFocused })}, 
            React.createElement("input", __assign({}, inputProps, (checked !== undefined && { checked: checked }), (defaultChecked !== undefined && { defaultChecked: defaultChecked }), {disabled: disabled, ref: this._resolveRef('_checkBox'), id: this._id, name: this._id, className: 'ms-Checkbox-input', type: 'checkbox', onChange: this._onChange, onFocus: this._onFocus, onBlur: this._onBlur, "aria-checked": isChecked})), 
            this.props.children, 
            React.createElement("label", {htmlFor: this._id, className: css_1.css('ms-Checkbox-label', {
                'is-checked': isChecked,
                'is-disabled': disabled
            })}, label && React.createElement("span", {className: 'ms-Label'}, label))));
    };
    Object.defineProperty(Checkbox.prototype, "checked", {
        get: function () {
            return this._checkBox ? this._checkBox.checked : false;
        },
        enumerable: true,
        configurable: true
    });
    Checkbox.prototype.focus = function () {
        if (this._checkBox) {
            this._checkBox.focus();
        }
    };
    Checkbox.prototype._onFocus = function (ev) {
        var inputProps = this.props.inputProps;
        if (inputProps && inputProps.onFocus) {
            inputProps.onFocus(ev);
        }
        this.setState({ isFocused: true });
    };
    Checkbox.prototype._onBlur = function (ev) {
        var inputProps = this.props.inputProps;
        if (inputProps && inputProps.onBlur) {
            inputProps.onBlur(ev);
        }
        this.setState({ isFocused: false });
    };
    Checkbox.prototype._onChange = function (ev) {
        var onChange = this.props.onChange;
        var isChecked = ev.target.checked;
        if (onChange) {
            onChange(ev, isChecked);
        }
        if (this.props.checked === undefined) {
            this.setState({ isChecked: isChecked });
        }
    };
    Checkbox.defaultProps = {};
    __decorate([
        autobind_1.autobind
    ], Checkbox.prototype, "_onFocus", null);
    __decorate([
        autobind_1.autobind
    ], Checkbox.prototype, "_onBlur", null);
    __decorate([
        autobind_1.autobind
    ], Checkbox.prototype, "_onChange", null);
    return Checkbox;
}(BaseComponent_1.BaseComponent));
exports.Checkbox = Checkbox;

//# sourceMappingURL=Checkbox.js.map
