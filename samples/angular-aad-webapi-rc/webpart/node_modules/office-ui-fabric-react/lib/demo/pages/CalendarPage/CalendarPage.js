"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Calendar_Button_Example_1 = require('./examples/Calendar.Button.Example');
var Calendar_Inline_Example_1 = require('./examples/Calendar.Inline.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var CalendarButtonExampleCode = require('./examples/Calendar.Button.Example.tsx');
var CalendarInlineExampleCode = require('./examples/Calendar.Inline.Example.tsx');
var CalendarPage = (function (_super) {
    __extends(CalendarPage, _super);
    function CalendarPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'DatePicker');
    }
    CalendarPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Calendar', componentName: 'CalendarExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'Inline Calendar', code: CalendarInlineExampleCode}, 
                React.createElement(Calendar_Inline_Example_1.CalendarInlineExample, {isMonthPickerVisible: false})
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Inline Calendar with month picker', code: CalendarInlineExampleCode}, 
                React.createElement(Calendar_Inline_Example_1.CalendarInlineExample, {isMonthPickerVisible: true})
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Calendar launched from a button', code: CalendarButtonExampleCode}, 
                React.createElement(Calendar_Button_Example_1.CalendarButtonExample, null)
            )), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Calendar'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "The calendar component allows a user to browse through a calendar and pick a date value.")
        ), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use the control as a single entity."), 
                React.createElement("li", null, "Set the default date to the current date unless a specific date is required for context (e.g. the date of the conference)."), 
                React.createElement("li", null, "The control is designed to resize relative to available screen width. Allow it to render in either wide or narrow as appropriate."), 
                React.createElement("li", null, "When the control is engaged, the Calendar renders as a flyout and has defined widths (300px -narrow and 440px – wide). Plan your UI implementation accordingly."), 
                React.createElement("li", null, "The control renders date in a specific format. If allowing for manual entry of date, provide helper text in the appropriate format."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Don't attempt to break apart year from month/day selectors. If granularity is required, use the Dropdown control or something similar."), 
                React.createElement("li", null, "Don't attempt to force resize the control in any way."), 
                React.createElement("li", null, "Don't force the control to render one mode vs. the other (year or month/day)"), 
                React.createElement("li", null, "The flyout selector is a light dismiss control. Don't modify this behavior in any way."))
        ), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return CalendarPage;
}(React.Component));
exports.CalendarPage = CalendarPage;

//# sourceMappingURL=CalendarPage.js.map
