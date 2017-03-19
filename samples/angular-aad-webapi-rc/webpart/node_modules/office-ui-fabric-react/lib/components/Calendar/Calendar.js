"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var Calendar_Props_1 = require('./Calendar.Props');
var CalendarDay_1 = require('./CalendarDay');
var CalendarMonth_1 = require('./CalendarMonth');
var Utilities_1 = require('../../Utilities');
require('./Calendar.scss');
var Calendar = (function (_super) {
    __extends(Calendar, _super);
    function Calendar(props) {
        _super.call(this);
        var currentDate = props.value || new Date();
        this.state = {
            selectedDate: currentDate,
            navigatedDate: currentDate
        };
        this._focusOnUpdate = false;
    }
    Calendar.prototype.componentWillReceiveProps = function (nextProps) {
        var value = nextProps.value;
        this.setState({
            selectedDate: value || new Date()
        });
    };
    Calendar.prototype.componentDidMount = function () {
        if (this.props.shouldFocusOnMount) {
            this.refs.dayPicker.focus();
        }
    };
    Calendar.prototype.componentDidUpdate = function () {
        if (this._focusOnUpdate) {
            this.refs.dayPicker.focus();
            this._focusOnUpdate = false;
        }
    };
    Calendar.prototype.render = function () {
        var rootClass = 'ms-DatePicker';
        var _a = this.props, firstDayOfWeek = _a.firstDayOfWeek, strings = _a.strings;
        var _b = this.state, selectedDate = _b.selectedDate, navigatedDate = _b.navigatedDate;
        return (React.createElement("div", {className: rootClass, ref: 'root'}, 
            React.createElement("div", {className: 'ms-DatePicker-picker ms-DatePicker-picker--opened ms-DatePicker-picker--focused ' + (this.props.isMonthPickerVisible ? 'is-monthPickerVisible' : '')}, 
                React.createElement("div", {className: 'ms-DatePicker-holder', onKeyDown: this._onDatePickerPopupKeyDown}, 
                    React.createElement("div", {className: 'ms-DatePicker-frame'}, 
                        React.createElement("div", {className: 'ms-DatePicker-wrap'}, 
                            React.createElement(CalendarDay_1.CalendarDay, {selectedDate: selectedDate, navigatedDate: navigatedDate, onSelectDate: this._onSelectDate, onNavigateDate: this._onNavigateDate, firstDayOfWeek: firstDayOfWeek, strings: strings, ref: 'dayPicker'}), 
                            React.createElement(CalendarMonth_1.CalendarMonth, {navigatedDate: navigatedDate, strings: strings, onNavigateDate: this._onNavigateDate}), 
                            React.createElement("span", {className: 'ms-DatePicker-goToday js-goToday', onClick: this._onGotoToday, onKeyDown: this._onGotoTodayKeyDown, tabIndex: 0}, strings.goToToday))
                    )
                )
            )
        ));
    };
    Calendar.prototype._navigateDay = function (date) {
        this.setState({
            navigatedDate: date
        });
    };
    Calendar.prototype._onNavigateDate = function (date, focusOnNavigatedDay) {
        this._navigateDay(date);
        this._focusOnUpdate = focusOnNavigatedDay;
    };
    Calendar.prototype._onSelectDate = function (date) {
        var onSelectDate = this.props.onSelectDate;
        this.setState({
            selectedDate: date
        });
        if (onSelectDate) {
            onSelectDate(date);
        }
    };
    ;
    Calendar.prototype._onGotoToday = function () {
        this._navigateDay(new Date());
        this._focusOnUpdate = true;
    };
    ;
    Calendar.prototype._onGotoTodayKeyDown = function (ev) {
        if (ev.which === Utilities_1.KeyCodes.enter) {
            ev.preventDefault();
            this._onGotoToday();
        }
    };
    ;
    Calendar.prototype._onDatePickerPopupKeyDown = function (ev) {
        switch (ev.which) {
            case Utilities_1.KeyCodes.enter:
                ev.preventDefault();
                break;
            case Utilities_1.KeyCodes.backspace:
                ev.preventDefault();
                break;
            case Utilities_1.KeyCodes.escape:
                this._handleEscKey(ev);
                break;
            default:
                break;
        }
    };
    Calendar.prototype._handleEscKey = function (ev) {
        if (this.props.onDismiss() != null) {
            this.props.onDismiss();
        }
    };
    Calendar.defaultProps = {
        onSelectDate: null,
        onDismiss: null,
        isMonthPickerVisible: true,
        value: null,
        firstDayOfWeek: Calendar_Props_1.DayOfWeek.Sunday,
        shouldFocusOnMount: true,
        strings: null
    };
    __decorate([
        Utilities_1.autobind
    ], Calendar.prototype, "_navigateDay", null);
    __decorate([
        Utilities_1.autobind
    ], Calendar.prototype, "_onNavigateDate", null);
    __decorate([
        Utilities_1.autobind
    ], Calendar.prototype, "_onSelectDate", null);
    __decorate([
        Utilities_1.autobind
    ], Calendar.prototype, "_onGotoToday", null);
    __decorate([
        Utilities_1.autobind
    ], Calendar.prototype, "_onGotoTodayKeyDown", null);
    __decorate([
        Utilities_1.autobind
    ], Calendar.prototype, "_onDatePickerPopupKeyDown", null);
    __decorate([
        Utilities_1.autobind
    ], Calendar.prototype, "_handleEscKey", null);
    return Calendar;
}(Utilities_1.BaseComponent));
exports.Calendar = Calendar;

//# sourceMappingURL=Calendar.js.map
