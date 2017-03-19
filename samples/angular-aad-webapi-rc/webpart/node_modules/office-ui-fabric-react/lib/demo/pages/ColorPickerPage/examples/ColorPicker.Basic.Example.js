"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
require('./ColorPicker.Basic.Example.scss');
var ColorPickerBasicExample = (function (_super) {
    __extends(ColorPickerBasicExample, _super);
    function ColorPickerBasicExample() {
        _super.apply(this, arguments);
    }
    ColorPickerBasicExample.prototype.render = function () {
        return (React.createElement(index_1.ColorPicker, {color: '#FFFFFF'}));
    };
    return ColorPickerBasicExample;
}(React.Component));
exports.ColorPickerBasicExample = ColorPickerBasicExample;

//# sourceMappingURL=ColorPicker.Basic.Example.js.map
