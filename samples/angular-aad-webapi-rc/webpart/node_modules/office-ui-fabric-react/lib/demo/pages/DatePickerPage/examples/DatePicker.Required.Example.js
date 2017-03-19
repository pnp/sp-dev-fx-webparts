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
    isRequiredErrorMessage: 'Field is required.',
    invalidInputErrorMessage: 'Invalid date format.'
};
var DatePickerRequiredExample = (function (_super) {
    __extends(DatePickerRequiredExample, _super);
    function DatePickerRequiredExample() {
        _super.call(this);
        this.state = {
            firstDayOfWeek: index_1.DayOfWeek.Sunday
        };
    }
    DatePickerRequiredExample.prototype.render = function () {
        var firstDayOfWeek = this.state.firstDayOfWeek;
        return (React.createElement("div", null, 
            React.createElement("p", null, "Validation will happen when Date Picker loses focus."), 
            React.createElement(index_1.DatePicker, {label: 'Date required', isRequired: true, firstDayOfWeek: firstDayOfWeek, strings: DayPickerStrings, placeholder: 'Select a date...'})));
    };
    return DatePickerRequiredExample;
}(React.Component));
exports.DatePickerRequiredExample = DatePickerRequiredExample;

//# sourceMappingURL=DatePicker.Required.Example.js.map
