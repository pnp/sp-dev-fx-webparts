"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var load_themed_styles_1 = require('@microsoft/load-themed-styles');
var Highlight = require('react-highlight');
var defaultTheme_1 = require('./defaultTheme');
var index_1 = require('../../../index');
var interfaces_1 = require('../../../utilities/selection/interfaces');
var index_2 = require('../../../components/ColorPicker/index');
require('./ThemePage.scss');
var ThemeCodeExample = require('./ThemeCodeExample.txt');
var ThemePage = (function (_super) {
    __extends(ThemePage, _super);
    function ThemePage() {
        _super.call(this);
        this._onPickerDismiss = this._onPickerDismiss.bind(this);
        this.state = {
            colors: Object.keys(defaultTheme_1.defaultTheme).map(function (variableName) { return ({
                key: variableName,
                name: variableName,
                value: defaultTheme_1.defaultTheme[variableName],
                description: '',
                colorPickerProps: null
            }); })
        };
    }
    ThemePage.prototype.render = function () {
        var _this = this;
        var _a = this.state, colors = _a.colors, colorPickerProps = _a.colorPickerProps;
        return (React.createElement("div", {className: 'Themes'}, 
            React.createElement("h1", {className: 'ms-font-xxl'}, "Themes"), 
            React.createElement("p", null, "The entire color pallete of the controls are themeable. We provide a set of sensible defaults, but you can override all colors individually."), 
            React.createElement("p", null, 
                "To override the themes, you need to call ", 
                React.createElement("span", {className: 'code'}, "loadTheme()"), 
                " with the appropriate set of overrides:"), 
            React.createElement(Highlight, {className: 'typescript'}, ThemeCodeExample), 
            React.createElement("h1", {className: 'ms-font-xl'}, "Define a theme"), 
            React.createElement("div", null, 
                React.createElement(index_1.DetailsList, {ref: 'list', items: colors, selectionMode: interfaces_1.SelectionMode.none, layoutMode: index_1.DetailsListLayoutMode.fixedColumns, columns: [
                    {
                        key: 'name',
                        name: 'Name',
                        fieldName: 'name',
                        minWidth: 150,
                        maxWidth: 150
                    },
                    {
                        key: 'color',
                        name: 'Color',
                        fieldName: 'value',
                        minWidth: 200,
                        onRender: function (item, index) { return (React.createElement("div", {className: 'ThemePage-colorSwatch', "data-is-focusable": 'true', onClick: _this._onSwatchClicked.bind(_this, item, index)}, 
                            React.createElement("span", {className: 'ThemePage-swatch', style: { backgroundColor: item.value }}), 
                            React.createElement("span", {className: 'ThemePage-colorValue'}, item.value))); }
                    },
                    {
                        key: 'desc',
                        name: 'Description',
                        fieldName: 'description',
                        minWidth: 90
                    }
                ]}), 
                colorPickerProps && (React.createElement(index_1.Callout, {isBeakVisible: false, gapSpace: 10, targetElement: colorPickerProps.targetElement, onDismiss: this._onPickerDismiss}, 
                    React.createElement(index_2.ColorPicker, {color: colorPickerProps.value, onColorChanged: this._onColorChanged.bind(this, colorPickerProps.index)})
                )))));
    };
    ThemePage.prototype._onSwatchClicked = function (item, index, ev) {
        this.setState({
            colorPickerProps: {
                targetElement: ev.currentTarget.children[0],
                value: item.value,
                index: index
            }
        });
    };
    ThemePage.prototype._onColorChanged = function (index, newColor) {
        var colors = this.state.colors;
        var color = colors[index];
        var theme = {};
        color.value = newColor;
        for (var i = 0; i < colors.length; i++) {
            var themeColor = colors[i];
            theme[themeColor.key] = themeColor.value;
        }
        load_themed_styles_1.loadTheme(theme);
        // The theme has changed values, but color state is the same. Force an update on the list.
        this.refs.list.forceUpdate();
    };
    ThemePage.prototype._onPickerDismiss = function () {
        this.setState({
            colorPickerProps: null
        });
    };
    return ThemePage;
}(React.Component));
exports.ThemePage = ThemePage;

//# sourceMappingURL=ThemePage.js.map
