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
var colors_1 = require('./colors');
var object_1 = require('../../utilities/object');
var autobind_1 = require('../../utilities/autobind');
var EventGroup_1 = require('../../utilities/eventGroup/EventGroup');
var hsv2hex = require('color-functions/lib/hsv2hex');
var ColorRectangle = (function (_super) {
    __extends(ColorRectangle, _super);
    function ColorRectangle(props) {
        _super.call(this, props);
        var color = this.props.color;
        this._events = new EventGroup_1.EventGroup(this);
        this.state = {
            isAdjusting: false,
            origin: null,
            color: color,
            fullColorString: colors_1.getFullColorString(color)
        };
    }
    ColorRectangle.prototype.componentWillUnmount = function () {
        this._events.dispose();
    };
    ColorRectangle.prototype.componentWillReceiveProps = function (newProps) {
        var color = newProps.color;
        this.setState({
            color: color,
            fullColorString: colors_1.getFullColorString(color)
        });
    };
    ColorRectangle.prototype.render = function () {
        var minSize = this.props.minSize;
        var _a = this.state, color = _a.color, fullColorString = _a.fullColorString;
        return (React.createElement("div", {ref: 'root', className: 'ms-ColorPicker-colorRect', style: { minWidth: minSize, minHeight: minSize, backgroundColor: fullColorString }, onMouseDown: this._onMouseDown}, 
            React.createElement("div", {className: 'ms-ColorPicker-light'}), 
            React.createElement("div", {className: 'ms-ColorPicker-dark'}), 
            React.createElement("div", {className: 'ms-ColorPicker-thumb', style: { left: color.s + '%', top: (colors_1.MAX_COLOR_VALUE - color.v) + '%', backgroundColor: color.str }})));
    };
    ColorRectangle.prototype._onMouseDown = function (ev) {
        this._events.on(window, 'mousemove', this._onMouseMove, true);
        this._events.on(window, 'mouseup', this._onMouseUp, true);
        this._onMouseMove(ev);
    };
    ColorRectangle.prototype._onMouseMove = function (ev) {
        var _a = this.props, color = _a.color, onSVChanged = _a.onSVChanged;
        var rectSize = this.refs.root.getBoundingClientRect();
        var sPercentage = (ev.clientX - rectSize.left) / rectSize.width;
        var vPercentage = (ev.clientY - rectSize.top) / rectSize.height;
        var newColor = object_1.assign({}, color, {
            s: Math.min(colors_1.MAX_COLOR_SATURATION, Math.max(0, sPercentage * colors_1.MAX_COLOR_SATURATION)),
            v: Math.min(colors_1.MAX_COLOR_VALUE, Math.max(0, colors_1.MAX_COLOR_VALUE - (vPercentage * colors_1.MAX_COLOR_VALUE))),
        });
        newColor.hex = hsv2hex(newColor.h, newColor.s, newColor.v);
        newColor.str = newColor.a === 100 ? '#' + newColor.hex : "rgba(" + newColor.r + ", " + newColor.g + ", " + newColor.b + ", " + newColor.a / 100 + ")";
        this.setState({
            isAdjusting: true,
            color: newColor
        });
        if (onSVChanged) {
            onSVChanged(newColor.s, newColor.v);
        }
        ev.preventDefault();
        ev.stopPropagation();
    };
    ColorRectangle.prototype._onMouseUp = function (ev) {
        this._events.off();
        this.setState({
            isAdjusting: false,
            origin: null
        });
    };
    ColorRectangle.defaultProps = {
        minSize: 220
    };
    __decorate([
        autobind_1.autobind
    ], ColorRectangle.prototype, "_onMouseDown", null);
    __decorate([
        autobind_1.autobind
    ], ColorRectangle.prototype, "_onMouseMove", null);
    __decorate([
        autobind_1.autobind
    ], ColorRectangle.prototype, "_onMouseUp", null);
    return ColorRectangle;
}(React.Component));
exports.ColorRectangle = ColorRectangle;

//# sourceMappingURL=ColorRectangle.js.map
