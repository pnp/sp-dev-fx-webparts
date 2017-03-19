"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var FocusZone_1 = require('../../FocusZone');
var KeyCodes_1 = require('../../utilities/KeyCodes');
var DateMath_1 = require('../../utilities/dateMath/DateMath');
var rtl_1 = require('../../utilities/rtl');
var css_1 = require('../../utilities/css');
var CalendarMonth = (function (_super) {
    __extends(CalendarMonth, _super);
    function CalendarMonth(props) {
        var _this = this;
        _super.call(this, props);
        this._selectMonthCallbacks = [];
        props.strings.shortMonths.map(function (month, index) {
            _this._selectMonthCallbacks[index] = _this._onSelectMonth.bind(_this, index);
        });
        this._onSelectNextYear = this._onSelectNextYear.bind(this);
        this._onSelectPrevYear = this._onSelectPrevYear.bind(this);
        this._onSelectMonth = this._onSelectMonth.bind(this);
    }
    CalendarMonth.prototype.render = function () {
        var _this = this;
        var _a = this.props, navigatedDate = _a.navigatedDate, strings = _a.strings;
        return (React.createElement("div", {className: 'ms-DatePicker-monthPicker'}, 
            React.createElement("div", {className: 'ms-DatePicker-header'}, 
                React.createElement("div", {className: 'ms-DatePicker-yearComponents ms-DatePicker-navContainer'}, 
                    React.createElement("span", {className: 'ms-DatePicker-prevYear js-prevYear', onClick: this._onSelectPrevYear, onKeyDown: this._onKeyDown.bind(this, this._onSelectPrevYear), tabIndex: 0}, 
                        React.createElement("i", {className: css_1.css('ms-Icon', { 'ms-Icon--ChevronLeft': !rtl_1.getRTL(), 'ms-Icon--ChevronRight': rtl_1.getRTL() })})
                    ), 
                    React.createElement("span", {className: 'ms-DatePicker-nextYear js-nextYear', onClick: this._onSelectNextYear, onKeyDown: this._onKeyDown.bind(this, this._onSelectNextYear), tabIndex: 0}, 
                        React.createElement("i", {className: css_1.css('ms-Icon', { 'ms-Icon--ChevronLeft': rtl_1.getRTL(), 'ms-Icon--ChevronRight': !rtl_1.getRTL() })})
                    )), 
                React.createElement("div", {className: 'ms-DatePicker-currentYear js-showYearPicker'}, navigatedDate.getFullYear())), 
            React.createElement(FocusZone_1.FocusZone, null, 
                React.createElement("div", {className: 'ms-DatePicker-optionGrid'}, strings.shortMonths.map(function (month, index) {
                    return (React.createElement("span", {className: 'ms-DatePicker-monthOption', key: index, onClick: _this._selectMonthCallbacks[index], "data-is-focusable": true}, month));
                }))
            )));
    };
    CalendarMonth.prototype._onKeyDown = function (callback, ev) {
        if (ev.which === KeyCodes_1.KeyCodes.enter) {
            callback();
        }
    };
    CalendarMonth.prototype._onSelectNextYear = function () {
        var _a = this.props, navigatedDate = _a.navigatedDate, onNavigateDate = _a.onNavigateDate;
        onNavigateDate(DateMath_1.addYears(navigatedDate, 1), false);
    };
    ;
    CalendarMonth.prototype._onSelectPrevYear = function () {
        var _a = this.props, navigatedDate = _a.navigatedDate, onNavigateDate = _a.onNavigateDate;
        onNavigateDate(DateMath_1.addYears(navigatedDate, -1), false);
    };
    ;
    CalendarMonth.prototype._onSelectMonth = function (newMonth) {
        var _a = this.props, navigatedDate = _a.navigatedDate, onNavigateDate = _a.onNavigateDate;
        onNavigateDate(DateMath_1.setMonth(navigatedDate, newMonth), true);
    };
    return CalendarMonth;
}(React.Component));
exports.CalendarMonth = CalendarMonth;

//# sourceMappingURL=CalendarMonth.js.map
