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
require('./Slider.scss');
var BaseComponent_1 = require('../../common/BaseComponent');
var KeyCodes_1 = require('../../utilities/KeyCodes');
var Label_1 = require('../../Label');
var css_1 = require('../../utilities/css');
var rtl_1 = require('../../utilities/rtl');
var object_1 = require('../../utilities/object');
var autobind_1 = require('../../utilities/autobind');
(function (ValuePosition) {
    ValuePosition[ValuePosition["Previous"] = 0] = "Previous";
    ValuePosition[ValuePosition["Next"] = 1] = "Next";
})(exports.ValuePosition || (exports.ValuePosition = {}));
var ValuePosition = exports.ValuePosition;
var Slider = (function (_super) {
    __extends(Slider, _super);
    function Slider(props) {
        _super.call(this, props);
        this._id = object_1.getId('Slider');
        var value = props.value || props.defaultValue || props.min;
        this.state = {
            value: value,
            renderedValue: value
        };
    }
    /**
     * Invoked when a component is receiving new props. This method is not called for the initial render.
     */
    Slider.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.value !== undefined) {
            var value = Math.max(newProps.min, Math.min(newProps.max, newProps.value));
            this.setState({
                value: value,
                renderedValue: value
            });
        }
    };
    Slider.prototype.render = function () {
        var _a = this.props, ariaLabel = _a.ariaLabel, className = _a.className, disabled = _a.disabled, label = _a.label, max = _a.max, min = _a.min, showValue = _a.showValue, buttonProps = _a.buttonProps;
        var _b = this.state, value = _b.value, renderedValue = _b.renderedValue;
        var thumbOffsetPercent = (renderedValue - min) / (max - min) * 100;
        var onMouseDownProp = disabled ? {} : { onMouseDown: this._onMouseDownOrTouchStart };
        var onTouchStartProp = disabled ? {} : { onTouchStart: this._onMouseDownOrTouchStart };
        var onKeyDownProp = disabled ? {} : { onKeyDown: this._onKeyDown };
        return (React.createElement("div", {className: css_1.css('ms-Slider', className, {
            'ms-Slider-enabled': !disabled,
            'ms-Slider-disabled': disabled
        }), ref: 'root'}, 
            label && (React.createElement(Label_1.Label, __assign({}, ariaLabel ? {} : { 'htmlFor': this._id }), label)), 
            React.createElement("div", {className: 'ms-Slider-container'}, 
                React.createElement("button", __assign({"aria-valuenow": value, "aria-valuemin": min, "aria-valuemax": max}, onMouseDownProp, onTouchStartProp, onKeyDownProp, buttonProps, {className: css_1.css('ms-Slider-slideBox', buttonProps.className, {
                    'ms-Slider-showValue': showValue,
                    'ms-Slider-showTransitions': (renderedValue === value)
                }), id: this._id, disabled: disabled, type: 'button', role: 'slider'}), 
                    React.createElement("div", {ref: 'sliderLine', className: 'ms-Slider-line'}, 
                        React.createElement("span", __assign({ref: 'thumb', className: 'ms-Slider-thumb'}, ariaLabel ? { 'aria-label': ariaLabel } : {}, {style: rtl_1.getRTL() ?
                            { 'right': thumbOffsetPercent + '%' } :
                            { 'left': thumbOffsetPercent + '%' }})), 
                        React.createElement("span", {className: 'ms-Slider-active', style: { 'width': thumbOffsetPercent + '%' }}), 
                        React.createElement("span", {className: 'ms-Slider-inactive', style: { 'width': (100 - thumbOffsetPercent) + '%' }}))
                ), 
                showValue && React.createElement("label", {className: 'ms-Label ms-Slider-value'}, value))));
    };
    Slider.prototype.focus = function () {
        if (this.refs.thumb) {
            this.refs.thumb.focus();
        }
    };
    Object.defineProperty(Slider.prototype, "value", {
        get: function () {
            return this.state.value;
        },
        enumerable: true,
        configurable: true
    });
    Slider.prototype._onMouseDownOrTouchStart = function (event) {
        if (event.type === 'mousedown') {
            this._events.on(window, 'mousemove', this._onMouseMoveOrTouchMove, true);
            this._events.on(window, 'mouseup', this._onMouseUpOrTouchEnd, true);
        }
        else if (event.type === 'touchstart') {
            this._events.on(window, 'touchmove', this._onMouseMoveOrTouchMove, true);
            this._events.on(window, 'touchend', this._onMouseUpOrTouchEnd, true);
        }
        this._onMouseMoveOrTouchMove(event, true);
    };
    Slider.prototype._onMouseMoveOrTouchMove = function (event, suppressEventCancelation) {
        var _a = this.props, max = _a.max, min = _a.min, step = _a.step;
        var steps = (max - min) / step;
        var sliderPositionRect = this.refs.sliderLine.getBoundingClientRect();
        var sliderLength = sliderPositionRect.width;
        var stepLength = sliderLength / steps;
        var currentSteps;
        if (event.type === 'mousedown' || event.type === 'mousemove') {
            currentSteps = rtl_1.getRTL() ?
                (sliderPositionRect.right - event.clientX) / stepLength :
                (event.clientX - sliderPositionRect.left) / stepLength;
        }
        else if (event.type === 'touchstart' || event.type === 'touchmove') {
            currentSteps = rtl_1.getRTL() ?
                (sliderPositionRect.right - event.touches[0].clientX) / stepLength :
                (event.touches[0].clientX - sliderPositionRect.left) / stepLength;
        }
        var currentValue;
        var renderedValue;
        // The value shouldn't be bigger than max or be smaller than min.
        if (currentSteps > Math.floor(steps)) {
            renderedValue = currentValue = max;
        }
        else if (currentSteps < 0) {
            renderedValue = currentValue = min;
        }
        else {
            renderedValue = min + step * currentSteps;
            currentValue = min + step * Math.round(currentSteps);
        }
        this._updateValue(currentValue, renderedValue);
        if (!suppressEventCancelation) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    Slider.prototype._updateValue = function (value, renderedValue) {
        var _this = this;
        var valueChanged = value !== this.state.value;
        this.setState({
            value: value,
            renderedValue: renderedValue
        }, function () {
            if (valueChanged && _this.props.onChange) {
                _this.props.onChange(_this.state.value);
            }
        });
    };
    Slider.prototype._onMouseUpOrTouchEnd = function () {
        // Synchronize the renderedValue to the actual value.
        this.setState({
            renderedValue: this.state.value
        });
        this._events.off();
    };
    Slider.prototype._onKeyDown = function (event) {
        var value = this.state.value;
        var _a = this.props, max = _a.max, min = _a.min, step = _a.step;
        var diff = 0;
        if (event.which === rtl_1.getRTLSafeKeyCode(KeyCodes_1.KeyCodes.left)) {
            diff = -step;
        }
        else if (event.which === rtl_1.getRTLSafeKeyCode(KeyCodes_1.KeyCodes.right)) {
            diff = step;
        }
        else {
            return;
        }
        var newValue = Math.min(max, Math.max(min, value + diff));
        this._updateValue(newValue, newValue);
        event.preventDefault();
        event.stopPropagation();
    };
    Slider.defaultProps = {
        step: 1,
        min: 0,
        max: 10,
        showValue: true,
        disabled: false,
        buttonProps: {}
    };
    __decorate([
        autobind_1.autobind
    ], Slider.prototype, "_onMouseDownOrTouchStart", null);
    __decorate([
        autobind_1.autobind
    ], Slider.prototype, "_onMouseMoveOrTouchMove", null);
    __decorate([
        autobind_1.autobind
    ], Slider.prototype, "_onMouseUpOrTouchEnd", null);
    __decorate([
        autobind_1.autobind
    ], Slider.prototype, "_onKeyDown", null);
    return Slider;
}(BaseComponent_1.BaseComponent));
exports.Slider = Slider;

//# sourceMappingURL=Slider.js.map
