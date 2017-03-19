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
var autobind_1 = require('../../utilities/autobind');
var css_1 = require('../../utilities/css');
var EventGroup_1 = require('../../utilities/eventGroup/EventGroup');
var ColorSlider = (function (_super) {
    __extends(ColorSlider, _super);
    function ColorSlider(props) {
        _super.call(this, props);
        var initialValue = this.props.initialValue;
        this._events = new EventGroup_1.EventGroup(this);
        this.state = {
            isAdjusting: false,
            origin: null,
            currentValue: initialValue
        };
    }
    ColorSlider.prototype.componentWillUnmount = function () {
        this._events.dispose();
    };
    ColorSlider.prototype.render = function () {
        var _a = this.props, className = _a.className, minValue = _a.minValue, maxValue = _a.maxValue, overlayStyle = _a.overlayStyle;
        var _b = this.state, currentValue = _b.currentValue, isAdjusting = _b.isAdjusting;
        var currentPercentage = 100 * (currentValue - minValue) / (maxValue - minValue);
        return (React.createElement("div", {ref: 'root', className: css_1.css('ms-ColorPicker-slider', className, {
            'is-adjusting': isAdjusting
        }), onMouseDown: this._onMouseDown}, 
            React.createElement("div", {className: 'ms-ColorPicker-sliderOverlay', style: overlayStyle}), 
            React.createElement("div", {className: 'ms-ColorPicker-thumb is-slider', style: { left: currentPercentage + '%' }})));
    };
    ColorSlider.prototype._onMouseDown = function (ev) {
        this._events.on(window, 'mousemove', this._onMouseMove, true);
        this._events.on(window, 'mouseup', this._onMouseUp, true);
        this._onMouseMove(ev);
    };
    ColorSlider.prototype._onMouseMove = function (ev) {
        var _a = this.props, onChanged = _a.onChanged, minValue = _a.minValue, maxValue = _a.maxValue;
        var rectSize = this.refs.root.getBoundingClientRect();
        var currentPercentage = (ev.clientX - rectSize.left) / rectSize.width;
        var newValue = Math.min(maxValue, Math.max(minValue, currentPercentage * maxValue));
        this.setState({
            isAdjusting: true,
            currentValue: newValue
        });
        if (onChanged) {
            onChanged(newValue);
        }
        ev.preventDefault();
        ev.stopPropagation();
    };
    ColorSlider.prototype._onMouseUp = function (ev) {
        this._events.off();
        this.setState({
            isAdjusting: false,
            origin: null
        });
    };
    ColorSlider.defaultProps = {
        minValue: 0,
        maxValue: 100,
        thumbColor: 'inherit',
        initialValue: 0
    };
    __decorate([
        autobind_1.autobind
    ], ColorSlider.prototype, "_onMouseDown", null);
    __decorate([
        autobind_1.autobind
    ], ColorSlider.prototype, "_onMouseMove", null);
    __decorate([
        autobind_1.autobind
    ], ColorSlider.prototype, "_onMouseUp", null);
    return ColorSlider;
}(React.Component));
exports.ColorSlider = ColorSlider;

//# sourceMappingURL=ColorSlider.js.map
