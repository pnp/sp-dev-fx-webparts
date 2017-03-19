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
var CalendarButtonExample = (function (_super) {
    __extends(CalendarButtonExample, _super);
    function CalendarButtonExample() {
        _super.call(this);
        this.state = {
            showCalendar: false,
            selectedDate: null
        };
        this._onClick = this._onClick.bind(this);
        this._onDismiss = this._onDismiss.bind(this);
        this._onSelectDate = this._onSelectDate.bind(this);
    }
    CalendarButtonExample.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null, 
            React.createElement("div", {ref: function (calendarBtn) { return _this._calendarButtonElement = calendarBtn; }}, 
                React.createElement(index_1.Button, {onClick: this._onClick}, this.state.selectedDate == null ? 'Click for Calendar' : this.state.selectedDate.toLocaleDateString())
            ), 
            this.state.showCalendar && (React.createElement(index_1.Callout, {isBeakVisible: false, className: 'ms-DatePicker-callout', gapSpace: 0, doNotLayer: false, targetElement: this._calendarButtonElement, directionalHint: index_1.DirectionalHint.bottomLeftEdge, onDismiss: this._onDismiss, setInitialFocus: false}, 
                React.createElement(index_1.Calendar, {onSelectDate: this._onSelectDate, onDismiss: this._onDismiss, isMonthPickerVisible: true, value: this.state.selectedDate, firstDayOfWeek: index_1.DayOfWeek.Sunday, strings: DayPickerStrings})
            ))));
    };
    CalendarButtonExample.prototype._onClick = function (event) {
        this.setState(function (prevState) {
            prevState.showCalendar = !prevState.showCalendar;
            return prevState;
        });
    };
    CalendarButtonExample.prototype._onDismiss = function () {
        this.setState(function (prevState) {
            prevState.showCalendar = false;
            return prevState;
        });
    };
    CalendarButtonExample.prototype._onSelectDate = function (date) {
        this.setState(function (prevState) {
            prevState.showCalendar = false;
            prevState.selectedDate = date;
            return prevState;
        });
    };
    return CalendarButtonExample;
}(React.Component));
exports.CalendarButtonExample = CalendarButtonExample;

//# sourceMappingURL=Calendar.Button.Example.js.map
