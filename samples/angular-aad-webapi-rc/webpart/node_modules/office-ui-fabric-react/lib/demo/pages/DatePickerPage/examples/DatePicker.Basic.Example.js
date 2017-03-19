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
    goToToday: 'Go to today'
};
var DatePickerBasicExample = (function (_super) {
    __extends(DatePickerBasicExample, _super);
    function DatePickerBasicExample() {
        _super.call(this);
        this.state = {
            firstDayOfWeek: index_1.DayOfWeek.Sunday
        };
    }
    DatePickerBasicExample.prototype.render = function () {
        var firstDayOfWeek = this.state.firstDayOfWeek;
        return (React.createElement("div", null, 
            React.createElement(index_1.DatePicker, {firstDayOfWeek: firstDayOfWeek, strings: DayPickerStrings, placeholder: 'Select a date...'}), 
            React.createElement(index_1.Dropdown, {label: 'Select the first day of the week', options: [
                {
                    text: 'Sunday',
                    key: index_1.DayOfWeek[index_1.DayOfWeek.Sunday]
                },
                {
                    text: 'Monday',
                    key: index_1.DayOfWeek[index_1.DayOfWeek.Monday]
                },
                {
                    text: 'Tuesday',
                    key: index_1.DayOfWeek[index_1.DayOfWeek.Tuesday]
                },
                {
                    text: 'Wednesday',
                    key: index_1.DayOfWeek[index_1.DayOfWeek.Wednesday]
                },
                {
                    text: 'Thursday',
                    key: index_1.DayOfWeek[index_1.DayOfWeek.Thursday]
                },
                {
                    text: 'Friday',
                    key: index_1.DayOfWeek[index_1.DayOfWeek.Friday]
                },
                {
                    text: 'Saturday',
                    key: index_1.DayOfWeek[index_1.DayOfWeek.Saturday]
                }
            ], selectedKey: index_1.DayOfWeek[firstDayOfWeek], onChanged: this._onDropdownChanged.bind(this)})));
    };
    DatePickerBasicExample.prototype._onDropdownChanged = function (option) {
        this.setState({
            firstDayOfWeek: index_1.DayOfWeek[option.key]
        });
    };
    return DatePickerBasicExample;
}(React.Component));
exports.DatePickerBasicExample = DatePickerBasicExample;

//# sourceMappingURL=DatePicker.Basic.Example.js.map
