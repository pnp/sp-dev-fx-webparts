"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var DayPickerStrings = {
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    shortMonths: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ],
    days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    shortDays: [
        'S',
        'M',
        'T',
        'W',
        'T',
        'F',
        'S'
    ],
    goToToday: 'Go to today',
    isRequiredErrorMessage: 'Start date is required.',
    invalidInputErrorMessage: 'Invalid date format.'
};
var DatePickerInputExample = (function (_super) {
    __extends(DatePickerInputExample, _super);
    function DatePickerInputExample() {
        _super.call(this);
        this.state = {
            firstDayOfWeek: index_1.DayOfWeek.Sunday,
            value: null
        };
    }
    DatePickerInputExample.prototype.render = function () {
        var _this = this;
        var _a = this.state, firstDayOfWeek = _a.firstDayOfWeek, value = _a.value;
        var desc = 'This field is required. One of the support input formats is year dash month dash day.';
        return (React.createElement("div", null, 
            React.createElement("p", null, "Text input allowed by default when use keyboard navigation. Mouse click the TextField will popup DatePicker, click the TextField again will dismiss the DatePicker and allow text input."), 
            React.createElement(index_1.DatePicker, {label: 'Start date', isRequired: false, allowTextInput: true, ariaLabel: desc, firstDayOfWeek: firstDayOfWeek, strings: DayPickerStrings, value: value, onSelectDate: function (date) { return _this.setState({ value: date }); }}), 
            React.createElement(index_1.Button, {onClick: function () { return _this.setState({ value: null }); }}, "Clear")));
    };
    return DatePickerInputExample;
}(React.Component));
exports.DatePickerInputExample = DatePickerInputExample;

//# sourceMappingURL=DatePicker.Input.Example.js.map
