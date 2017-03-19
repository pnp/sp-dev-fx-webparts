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
var CalendarInlineExample = (function (_super) {
    __extends(CalendarInlineExample, _super);
    function CalendarInlineExample() {
        _super.call(this);
        this.state = {
            selectedDate: null
        };
        this._onDismiss = this._onDismiss.bind(this);
        this._onSelectDate = this._onSelectDate.bind(this);
    }
    CalendarInlineExample.prototype.render = function () {
        var divStyle = {
            height: '300px',
            width: '400px'
        };
        return (React.createElement("div", {style: divStyle}, 
            React.createElement("div", null, 
                "Selected date: ", 
                React.createElement("span", null, this.state.selectedDate == null ? 'Not set' : this.state.selectedDate.toLocaleString())), 
            React.createElement(index_1.Calendar, {onSelectDate: this._onSelectDate, onDismiss: this._onDismiss, isMonthPickerVisible: this.props.isMonthPickerVisible, value: this.state.selectedDate, firstDayOfWeek: index_1.DayOfWeek.Sunday, strings: DayPickerStrings})));
    };
    CalendarInlineExample.prototype._onDismiss = function () {
        this.setState(function (prevState) {
            return prevState;
        });
    };
    CalendarInlineExample.prototype._onSelectDate = function (date) {
        this.setState(function (prevState) {
            prevState.selectedDate = date;
            return prevState;
        });
    };
    return CalendarInlineExample;
}(React.Component));
exports.CalendarInlineExample = CalendarInlineExample;

//# sourceMappingURL=Calendar.Inline.Example.js.map
