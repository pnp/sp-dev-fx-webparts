"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var css_1 = require('../../utilities/css');
var Label_1 = require('../../Label');
var object_1 = require('../../utilities/object');
var autobind_1 = require('../../utilities/autobind');
require('./Toggle.scss');
var Toggle = (function (_super) {
    __extends(Toggle, _super);
    function Toggle(props) {
        _super.call(this);
        this.state = {
            isChecked: !!(props.checked || props.defaultChecked)
        };
        this._id = object_1.getId('Toggle');
    }
    Object.defineProperty(Toggle.prototype, "checked", {
        /**
         * Gets the current checked state of the toggle.
         */
        get: function () {
            return this.state.isChecked;
        },
        enumerable: true,
        configurable: true
    });
    Toggle.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.checked !== undefined) {
            this.setState({
                isChecked: newProps.checked
            });
        }
    };
    Toggle.prototype.render = function () {
        var _this = this;
        var _a = this.props, label = _a.label, onText = _a.onText, offText = _a.offText, className = _a.className, disabled = _a.disabled;
        var isChecked = this.state.isChecked;
        var stateText = isChecked ? onText : offText;
        return (React.createElement("div", {className: css_1.css('ms-Toggle', className, {
            'is-checked': isChecked,
            'is-enabled': !disabled,
            'is-disabled': disabled
        })}, 
            React.createElement("div", {className: 'ms-Toggle-innerContainer'}, 
                label && (React.createElement(Label_1.Label, {className: 'ms-Toggle-label', htmlFor: this._id}, label)), 
                React.createElement("div", {className: 'ms-Toggle-slider'}, 
                    React.createElement("button", {ref: function (c) { return _this._toggleButton = c; }, type: 'button', id: this._id, name: this._id, className: 'ms-Toggle-button', disabled: disabled, role: 'checkbox', "aria-checked": isChecked, onClick: this._onClick}), 
                    React.createElement("div", {className: 'ms-Toggle-background'}, 
                        React.createElement("div", {className: 'ms-Toggle-focus'}), 
                        React.createElement("div", {className: 'ms-Toggle-thumb'})), 
                    stateText && (React.createElement(Label_1.Label, {className: 'ms-Toggle-stateText'}, stateText))))
        ));
    };
    Toggle.prototype.focus = function () {
        if (this._toggleButton) {
            this._toggleButton.focus();
        }
    };
    Toggle.prototype._onClick = function () {
        var _a = this.props, checked = _a.checked, onChanged = _a.onChanged;
        var isChecked = this.state.isChecked;
        // Only update the state if the user hasn't provided it.
        if (checked === undefined) {
            this.setState({
                isChecked: !isChecked
            });
        }
        if (onChanged) {
            onChanged(!isChecked);
        }
    };
    Toggle.initialProps = {
        label: '',
        onText: 'On',
        offText: 'Off'
    };
    __decorate([
        autobind_1.autobind
    ], Toggle.prototype, "_onClick", null);
    return Toggle;
}(React.Component));
exports.Toggle = Toggle;

//# sourceMappingURL=Toggle.js.map
