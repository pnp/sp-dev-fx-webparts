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
var TextField_1 = require('../../TextField');
var ColorRectangle_1 = require('./ColorRectangle');
var ColorSlider_1 = require('./ColorSlider');
var autobind_1 = require('../../utilities/autobind');
var colors_1 = require('./colors');
require('./ColorPicker.scss');
var ColorPicker = (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker(props) {
        _super.call(this, props);
        this.state = {
            color: colors_1.getColorFromString(props.color)
        };
    }
    ColorPicker.prototype.render = function () {
        var color = this.state.color;
        return (React.createElement("div", {className: 'ms-ColorPicker'}, 
            React.createElement("div", {className: 'ms-ColorPicker-panel'}, 
                React.createElement(ColorRectangle_1.ColorRectangle, {color: color, onSVChanged: this._onSVChanged}), 
                React.createElement(ColorSlider_1.ColorSlider, {className: 'is-hue', minValue: 0, maxValue: colors_1.MAX_COLOR_HUE, initialValue: color.h, onChanged: this._onHChanged}), 
                React.createElement(ColorSlider_1.ColorSlider, {className: 'is-alpha', overlayStyle: { background: "linear-gradient(to right, transparent 0, " + color.str + " 100%)" }, minValue: 0, maxValue: 100, initialValue: color.a, onChanged: this._onAChanged}), 
                React.createElement("table", {className: 'ms-ColorPicker-table', cellPadding: '0', cellSpacing: '0'}, 
                    React.createElement("thead", null, 
                        React.createElement("tr", {className: 'ms-font-s'}, 
                            React.createElement("td", null, "Hex"), 
                            React.createElement("td", null, "Red"), 
                            React.createElement("td", null, "Green"), 
                            React.createElement("td", null, "Blue"), 
                            React.createElement("td", null, "Alpha"))
                    ), 
                    React.createElement("tbody", null, 
                        React.createElement("tr", null, 
                            React.createElement("td", null, 
                                React.createElement(TextField_1.TextField, {className: 'ms-ColorPicker-input', value: color.hex})
                            ), 
                            React.createElement("td", {style: { width: '18%' }}, 
                                React.createElement(TextField_1.TextField, {className: 'ms-ColorPicker-input', value: color.r})
                            ), 
                            React.createElement("td", {style: { width: '18%' }}, 
                                React.createElement(TextField_1.TextField, {className: 'ms-ColorPicker-input', value: color.g})
                            ), 
                            React.createElement("td", {style: { width: '18%' }}, 
                                React.createElement(TextField_1.TextField, {className: 'ms-ColorPicker-input', value: color.b})
                            ), 
                            React.createElement("td", {style: { width: '18%' }}, 
                                React.createElement(TextField_1.TextField, {className: 'ms-ColorPicker-input', value: color.a})
                            ))
                    )))
        ));
    };
    ColorPicker.prototype._onSVChanged = function (s, v) {
        this._updateColor(colors_1.updateSV(this.state.color, s, v));
    };
    ColorPicker.prototype._onHChanged = function (h) {
        this._updateColor(colors_1.updateH(this.state.color, h));
    };
    ColorPicker.prototype._onAChanged = function (a) {
        this._updateColor(colors_1.updateA(this.state.color, a));
    };
    ColorPicker.prototype._updateColor = function (newColor) {
        var onColorChanged = this.props.onColorChanged;
        if (newColor.str !== this.state.color.str) {
            this.setState({
                color: newColor
            });
            if (onColorChanged) {
                onColorChanged(newColor.str);
            }
        }
    };
    __decorate([
        autobind_1.autobind
    ], ColorPicker.prototype, "_onSVChanged", null);
    __decorate([
        autobind_1.autobind
    ], ColorPicker.prototype, "_onHChanged", null);
    __decorate([
        autobind_1.autobind
    ], ColorPicker.prototype, "_onAChanged", null);
    return ColorPicker;
}(React.Component));
exports.ColorPicker = ColorPicker;

//# sourceMappingURL=ColorPicker.js.map
