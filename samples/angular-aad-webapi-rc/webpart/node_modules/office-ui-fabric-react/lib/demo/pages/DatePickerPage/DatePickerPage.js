"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var DatePicker_Basic_Example_1 = require('./examples/DatePicker.Basic.Example');
var DatePicker_Required_Example_1 = require('./examples/DatePicker.Required.Example');
var DatePicker_Input_Example_1 = require('./examples/DatePicker.Input.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var DatePickerBasicExampleCode = require('./examples/DatePicker.Basic.Example.tsx');
var DatePickerRequiredExampleCode = require('./examples/DatePicker.Required.Example.tsx');
var DatePickerInputExampleCode = require('./examples/DatePicker.Input.Example.tsx');
var DatePickerPage = (function (_super) {
    __extends(DatePickerPage, _super);
    function DatePickerPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'DatePicker');
    }
    DatePickerPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'DatePicker', componentName: 'DatePickerExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'DatePicker', code: DatePickerBasicExampleCode}, 
                React.createElement(DatePicker_Basic_Example_1.DatePickerBasicExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'DatePicker as required field', code: DatePickerRequiredExampleCode}, 
                React.createElement(DatePicker_Required_Example_1.DatePickerRequiredExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'DatePicker allows input date string', code: DatePickerInputExampleCode}, 
                React.createElement(DatePicker_Input_Example_1.DatePickerInputExample, null)
            )), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'DatePicker'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "The DatePicker component enables a user to pick a date value.")
        ), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use the control as a single entity."), 
                React.createElement("li", null, "Set the default date to the current date unless a specific date is required for context (e.g. the date of the conference)."), 
                React.createElement("li", null, "The control is designed to resize relative to available screen width. Allow it to render in either wide or narrow as appropriate."), 
                React.createElement("li", null, "When the control is engaged, the DatePicker renders as a flyout and has defined widths (300px -narrow and 440px – wide). Plan your UI implementation accordingly."), 
                React.createElement("li", null, "The control renders date in a specific format. If allowing for manual entry of date, provide helper text in the appropriate format."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Don't attempt to break apart year from month/day selectors. If granularity is required, use the Dropdown control or something similar."), 
                React.createElement("li", null, "Don't attempt to force resize the control in any way."), 
                React.createElement("li", null, "Don't force the control to render one mode vs. the other (year or month/day)"), 
                React.createElement("li", null, "The flyout selector is a light dismiss control. Don't modify this behavior in any way."))
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/DatePicker.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return DatePickerPage;
}(React.Component));
exports.DatePickerPage = DatePickerPage;

//# sourceMappingURL=DatePickerPage.js.map
