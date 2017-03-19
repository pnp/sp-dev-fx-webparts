"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var css_1 = require('../../utilities/css');
var FocusZone_1 = require('../../FocusZone');
var KeyCodes_1 = require('../../utilities/KeyCodes');
var DateMath_1 = require('../../utilities/dateMath/DateMath');
var rtl_1 = require('../../utilities/rtl');
var object_1 = require('../../utilities/object');
var DAYS_IN_WEEK = 7;
var CalendarDay = (function (_super) {
    __extends(CalendarDay, _super);
    function CalendarDay(props) {
        _super.call(this, props);
        this.state = {
            activeDescendantId: object_1.getId('DatePickerDay-active'),
            weeks: this._getWeeks(props.navigatedDate, props.selectedDate)
        };
        this._onSelectNextMonth = this._onSelectNextMonth.bind(this);
        this._onSelectPrevMonth = this._onSelectPrevMonth.bind(this);
    }
    CalendarDay.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({
            weeks: this._getWeeks(nextProps.navigatedDate, nextProps.selectedDate)
        });
    };
    CalendarDay.prototype.render = function () {
        var _this = this;
        var _a = this.state, activeDescendantId = _a.activeDescendantId, weeks = _a.weeks;
        var _b = this.props, firstDayOfWeek = _b.firstDayOfWeek, strings = _b.strings, navigatedDate = _b.navigatedDate, onSelectDate = _b.onSelectDate;
        var selectDayCallbacks = {};
        weeks.map(function (week, index) { return week.map(function (day) { return selectDayCallbacks[day.key] = onSelectDate.bind(_this, day.originalDate); }); });
        return (React.createElement("div", {className: 'ms-DatePicker-dayPicker'}, 
            React.createElement("div", {className: 'ms-DatePicker-header'}, 
                React.createElement("div", {className: 'ms-DatePicker-month'}, strings.months[navigatedDate.getMonth()]), 
                React.createElement("div", {className: 'ms-DatePicker-year'}, navigatedDate.getFullYear())), 
            React.createElement("div", {className: 'ms-DatePicker-monthComponents'}, 
                React.createElement("div", {className: 'ms-DatePicker-navContainer'}, 
                    React.createElement("span", {className: 'ms-DatePicker-prevMonth js-prevMonth', onClick: this._onSelectPrevMonth, onKeyDown: this._onKeyDown.bind(this, this._onSelectPrevMonth), tabIndex: 0}, 
                        React.createElement("i", {className: css_1.css('ms-Icon', { 'ms-Icon--ChevronLeft': !rtl_1.getRTL(), 'ms-Icon--ChevronRight': rtl_1.getRTL() })})
                    ), 
                    React.createElement("span", {className: 'ms-DatePicker-nextMonth js-nextMonth', onClick: this._onSelectNextMonth, onKeyDown: this._onKeyDown.bind(this, this._onSelectNextMonth), tabIndex: 0}, 
                        React.createElement("i", {className: css_1.css('ms-Icon', { 'ms-Icon--ChevronLeft': rtl_1.getRTL(), 'ms-Icon--ChevronRight': !rtl_1.getRTL() })})
                    )), 
                React.createElement("div", {className: 'ms-DatePicker-headerToggleView js-showMonthPicker'})), 
            React.createElement(FocusZone_1.FocusZone, null, 
                React.createElement("table", {className: 'ms-DatePicker-table', role: 'grid', "aria-readonly": 'true', "aria-multiselectable": 'false', "aria-activedescendant": activeDescendantId}, 
                    React.createElement("thead", null, 
                        React.createElement("tr", null, strings.shortDays.map(function (val, index) {
                            return React.createElement("th", {className: 'ms-DatePicker-weekday', scope: 'col', key: index, title: strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK]}, strings.shortDays[(index + firstDayOfWeek) % DAYS_IN_WEEK]);
                        }))
                    ), 
                    React.createElement("tbody", null, weeks.map(function (week, weekIndex) {
                        return React.createElement("tr", {key: weekIndex}, week.map(function (day, dayIndex) {
                            return React.createElement("td", {role: 'presentation', key: day.key}, 
                                React.createElement("div", {className: css_1.css('ms-DatePicker-day', {
                                    'ms-DatePicker-day--infocus': day.isInMonth,
                                    'ms-DatePicker-day--outfocus': !day.isInMonth,
                                    'ms-DatePicker-day--today': day.isToday,
                                    'ms-DatePicker-day--highlighted': day.isSelected
                                }), role: 'gridcell', onClick: selectDayCallbacks[day.key], onKeyDown: function (ev) {
                                    return _this._navigateMonthEdge(ev, day.originalDate, weekIndex, dayIndex);
                                }, "aria-selected": day.isSelected, id: DateMath_1.compareDates(navigatedDate, day.originalDate) ? activeDescendantId : null, "data-is-focusable": true, ref: DateMath_1.compareDates(navigatedDate, day.originalDate) ? 'navigatedDay' : null, key: DateMath_1.compareDates(navigatedDate, day.originalDate) ? 'navigatedDay' : null}, day.date)
                            );
                        }));
                    })))
            )));
    };
    CalendarDay.prototype.focus = function () {
        if (this.refs.navigatedDay) {
            this.refs.navigatedDay.tabIndex = 0;
            this.refs.navigatedDay.focus();
        }
    };
    CalendarDay.prototype._navigateMonthEdge = function (ev, date, weekIndex, dayIndex) {
        if (weekIndex === 0 && ev.which === KeyCodes_1.KeyCodes.up) {
            this.props.onNavigateDate(DateMath_1.addWeeks(date, -1), true);
            ev.preventDefault();
        }
        else if (weekIndex === (this.state.weeks.length - 1) && ev.which === KeyCodes_1.KeyCodes.down) {
            this.props.onNavigateDate(DateMath_1.addWeeks(date, 1), true);
            ev.preventDefault();
        }
        else if (dayIndex === 0 && ev.which === rtl_1.getRTLSafeKeyCode(KeyCodes_1.KeyCodes.left)) {
            this.props.onNavigateDate(DateMath_1.addDays(date, -1), true);
            ev.preventDefault();
        }
        else if (dayIndex === (DAYS_IN_WEEK - 1) && ev.which === rtl_1.getRTLSafeKeyCode(KeyCodes_1.KeyCodes.right)) {
            this.props.onNavigateDate(DateMath_1.addDays(date, 1), true);
            ev.preventDefault();
        }
    };
    CalendarDay.prototype._onKeyDown = function (callback, ev) {
        if (ev.which === KeyCodes_1.KeyCodes.enter) {
            callback();
        }
    };
    CalendarDay.prototype._onSelectNextMonth = function () {
        this.props.onNavigateDate(DateMath_1.addMonths(this.props.navigatedDate, 1), false);
    };
    CalendarDay.prototype._onSelectPrevMonth = function () {
        this.props.onNavigateDate(DateMath_1.addMonths(this.props.navigatedDate, -1), false);
    };
    CalendarDay.prototype._getWeeks = function (navigatedDate, selectedDate) {
        var firstDayOfWeek = this.props.firstDayOfWeek;
        var date = new Date(navigatedDate.getFullYear(), navigatedDate.getMonth(), 1);
        var today = new Date();
        var weeks = [];
        var week;
        // Cycle the date backwards to get to the first day of the week.
        while (date.getDay() !== firstDayOfWeek) {
            date.setDate(date.getDate() - 1);
        }
        // a flag to indicate whether all days of the week are in the month
        var isAllDaysOfWeekOutOfMonth = false;
        for (var weekIndex = 0; !isAllDaysOfWeekOutOfMonth; weekIndex++) {
            week = [];
            isAllDaysOfWeekOutOfMonth = true;
            for (var dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
                var dayInfo = {
                    key: date.toString(),
                    date: date.getDate(),
                    originalDate: new Date(date.toString()),
                    isInMonth: date.getMonth() === navigatedDate.getMonth(),
                    isToday: DateMath_1.compareDates(today, date),
                    isSelected: DateMath_1.compareDates(selectedDate, date)
                };
                week.push(dayInfo);
                if (dayInfo.isInMonth) {
                    isAllDaysOfWeekOutOfMonth = false;
                }
                date.setDate(date.getDate() + 1);
            }
            if (!isAllDaysOfWeekOutOfMonth) {
                weeks.push(week);
            }
        }
        return weeks;
    };
    return CalendarDay;
}(React.Component));
exports.CalendarDay = CalendarDay;

//# sourceMappingURL=CalendarDay.js.map
