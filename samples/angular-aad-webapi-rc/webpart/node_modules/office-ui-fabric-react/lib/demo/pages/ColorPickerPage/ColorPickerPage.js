"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var ColorPicker_Basic_Example_1 = require('./examples/ColorPicker.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var ColorPickerBasicExampleCode = require('./examples/ColorPicker.Basic.Example.tsx');
var ColorPickerPage = (function (_super) {
    __extends(ColorPickerPage, _super);
    function ColorPickerPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Checkbox');
    }
    ColorPickerPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'ColorPicker', componentName: 'ColorPickerExample', exampleCards: React.createElement(index_1.ExampleCard, {title: 'ColorPicker', code: ColorPickerBasicExampleCode}, 
            React.createElement(ColorPicker_Basic_Example_1.ColorPickerBasicExample, null)
        ), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'ColorPicker'}), overview: React.createElement("div", null, "ColorPicker is used to allow a user to select a color"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return ColorPickerPage;
}(React.Component));
exports.ColorPickerPage = ColorPickerPage;

//# sourceMappingURL=ColorPickerPage.js.map
