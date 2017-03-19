"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
require('./Slider.Basic.Example.scss');
var SliderBasicExample = (function (_super) {
    __extends(SliderBasicExample, _super);
    function SliderBasicExample() {
        _super.call(this);
        this.state = {
            value: 0
        };
    }
    SliderBasicExample.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", {className: 'ms-SliderBasicExample'}, 
            React.createElement(index_1.Slider, {label: 'Basic example:', min: 1, max: 3, step: 1, defaultValue: 2, showValue: true, onChange: function (value) { return console.log(value); }}), 
            React.createElement(index_1.Slider, {label: 'Disabled example:', min: 50, max: 500, step: 50, defaultValue: 300, showValue: true, disabled: true}), 
            React.createElement(index_1.Slider, {label: 'Controlled example:', max: 10, value: this.state.value, onChange: function (value) { return _this.setState({ value: value }); }, showValue: true})));
    };
    return SliderBasicExample;
}(React.Component));
exports.SliderBasicExample = SliderBasicExample;

//# sourceMappingURL=Slider.Basic.Example.js.map
