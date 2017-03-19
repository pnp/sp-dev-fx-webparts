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
var Calendar_1 = require('../../Calendar');
var Callout_1 = require('../../Callout');
var DirectionalHint_1 = require('../../common/DirectionalHint');
var TextField_1 = require('../../TextField');
var Utilities_1 = require('../../Utilities');
require('./DatePicker.scss');
var DatePicker = (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker(props) {
        _super.call(this);
        var formatDate = props.formatDate, value = props.value;
        this.state = {
            selectedDate: value || new Date(),
            formattedDate: (formatDate && value) ? formatDate(value) : '',
            isDatePickerShown: false,
            errorMessage: null
        };
        this._preventFocusOpeningPicker = false;
    }
    DatePicker.prototype.componentWillReceiveProps = function (nextProps) {
        var formatDate = nextProps.formatDate, isRequired = nextProps.isRequired, strings = nextProps.strings, value = nextProps.value;
        var errorMessage = (isRequired && !value) ? (strings.isRequiredErrorMessage || '*') : null;
        this.setState({
            selectedDate: value || new Date(),
            formattedDate: (formatDate && value) ? formatDate(value) : '',
            errorMessage: errorMessage
        });
    };
    DatePicker.prototype.render = function () {
        var _this = this;
        var rootClass = 'ms-DatePicker';
        var _a = this.props, firstDayOfWeek = _a.firstDayOfWeek, strings = _a.strings, label = _a.label, isRequired = _a.isRequired, ariaLabel = _a.ariaLabel, placeholder = _a.placeholder, allowTextInput = _a.allowTextInput;
        var _b = this.state, isDatePickerShown = _b.isDatePickerShown, formattedDate = _b.formattedDate, selectedDate = _b.selectedDate, errorMessage = _b.errorMessage;
        return (React.createElement("div", {className: rootClass, ref: 'root'}, 
            React.createElement("div", {ref: function (c) { return _this._datepicker = c; }}, 
                React.createElement(TextField_1.TextField, {ariaLabel: ariaLabel, "aria-haspopup": 'true', required: isRequired, onKeyDown: this._onTextFieldKeyDown, onFocus: this._onTextFieldFocus, onBlur: this._onTextFieldBlur, onClick: this._onTextFieldClick, onChanged: this._onTextFieldChanged, errorMessage: errorMessage, label: label, placeholder: placeholder, iconClass: Utilities_1.css('ms-Icon ms-Icon--Calendar', label ? 'ms-DatePicker-event--with-label' : 'ms-DatePicker-event--without-label'), readOnly: !allowTextInput, value: formattedDate, ref: 'textField'})
            ), 
            isDatePickerShown && (React.createElement(Callout_1.Callout, {isBeakVisible: false, className: 'ms-DatePicker-callout', gapSpace: 0, doNotLayer: false, targetElement: this._datepicker, directionalHint: DirectionalHint_1.DirectionalHint.bottomLeftEdge, onDismiss: this._calendarDismissed, setInitialFocus: false}, 
                React.createElement(Calendar_1.Calendar, {onSelectDate: this._onSelectDate, onDismiss: this._calendarDismissed, isMonthPickerVisible: this.props.isMonthPickerVisible, value: selectedDate, firstDayOfWeek: firstDayOfWeek, strings: strings, shouldFocusOnMount: true})
            ))));
    };
    DatePicker.prototype._onSelectDate = function (date) {
        var _a = this.props, formatDate = _a.formatDate, onSelectDate = _a.onSelectDate;
        this.setState({
            selectedDate: date,
            isDatePickerShown: false,
            formattedDate: formatDate && date ? formatDate(date) : '',
        });
        if (onSelectDate) {
            onSelectDate(date);
        }
    };
    ;
    DatePicker.prototype._onTextFieldFocus = function (ev) {
        if (!this.props.allowTextInput) {
            if (!this._preventFocusOpeningPicker) {
                this._showDatePickerPopup();
            }
            else {
                this._preventFocusOpeningPicker = false;
            }
        }
    };
    ;
    DatePicker.prototype._onTextFieldBlur = function (ev) {
        this._validateTextInput();
    };
    ;
    DatePicker.prototype._onTextFieldChanged = function (newValue) {
        if (this.props.allowTextInput) {
            if (this.state.isDatePickerShown) {
                this._dismissDatePickerPopup();
            }
            var _a = this.props, isRequired = _a.isRequired, value = _a.value, strings = _a.strings;
            this.setState({
                errorMessage: (isRequired && !value) ? (strings.isRequiredErrorMessage || '*') : null,
                formattedDate: newValue
            });
        }
    };
    DatePicker.prototype._onTextFieldKeyDown = function (ev) {
        switch (ev.which) {
            case Utilities_1.KeyCodes.enter:
                ev.preventDefault();
                ev.stopPropagation();
                if (!this.state.isDatePickerShown) {
                    this._showDatePickerPopup();
                }
                else {
                    // When DatePicker allows input date string directly,
                    // it is expected to hit another enter to close the popup
                    if (this.props.allowTextInput) {
                        this._dismissDatePickerPopup();
                    }
                }
                break;
            case Utilities_1.KeyCodes.escape:
                this._handleEscKey(ev);
                break;
            default:
                break;
        }
    };
    ;
    DatePicker.prototype._onTextFieldClick = function (ev) {
        if (!this.state.isDatePickerShown) {
            this._showDatePickerPopup();
        }
        else {
            if (this.props.allowTextInput) {
                this.setState({
                    isDatePickerShown: false
                });
            }
        }
    };
    DatePicker.prototype._showDatePickerPopup = function () {
        if (!this.state.isDatePickerShown) {
            this._preventFocusOpeningPicker = true;
            this._focusOnSelectedDateOnUpdate = true;
            this.setState({
                isDatePickerShown: true,
                navigatedDate: this.state.selectedDate,
                errorMessage: ''
            });
        }
    };
    DatePicker.prototype._dismissDatePickerPopup = function () {
        if (this.state.isDatePickerShown) {
            this.setState({
                isDatePickerShown: false
            });
            this._validateTextInput();
        }
    };
    /**
     * Callback for closing the calendar callout
     */
    DatePicker.prototype._calendarDismissed = function () {
        this._preventFocusOpeningPicker = true;
        this._dismissDatePickerPopup();
    };
    DatePicker.prototype._handleEscKey = function (ev) {
        this._calendarDismissed();
    };
    DatePicker.prototype._validateTextInput = function () {
        var _a = this.props, isRequired = _a.isRequired, allowTextInput = _a.allowTextInput, strings = _a.strings, formatDate = _a.formatDate, parseDateFromString = _a.parseDateFromString, onSelectDate = _a.onSelectDate;
        var inputValue = this.state.formattedDate;
        // Do validation only if DatePicker's popup is dismissed
        if (this.state.isDatePickerShown) {
            return;
        }
        // Check when DatePicker is a required field but has NO input value
        if (isRequired && !inputValue) {
            this.setState({
                // Since fabic react doesn't have loc support yet
                // use the symbol '*' to represent error message
                errorMessage: strings.isRequiredErrorMessage || '*'
            });
            return;
        }
        if (allowTextInput) {
            var date = null;
            if (inputValue) {
                date = parseDateFromString(inputValue);
                if (!date) {
                    this.setState({
                        errorMessage: strings.invalidInputErrorMessage || '*'
                    });
                }
                else {
                    this.setState({
                        selectedDate: date,
                        formattedDate: formatDate && date ? formatDate(date) : '',
                        errorMessage: ''
                    });
                }
            }
            else {
                // No input date string shouldn't be an error if field is not required
                this.setState({
                    errorMessage: ''
                });
            }
            // Execute onSelectDate callback
            if (onSelectDate) {
                // If no input date string or input date string is invalid
                // date variable will be null, callback should expect null value for this case
                onSelectDate(date);
            }
        }
    };
    DatePicker.defaultProps = {
        allowTextInput: false,
        formatDate: function (date) {
            if (date) {
                return date.toDateString();
            }
            return '';
        },
        parseDateFromString: function (dateStr) {
            var date = Date.parse(dateStr);
            if (date) {
                return new Date(date);
            }
            return null;
        },
        firstDayOfWeek: Calendar_1.DayOfWeek.Sunday,
        isRequired: false,
        isMonthPickerVisible: true,
        strings: null
    };
    __decorate([
        Utilities_1.autobind
    ], DatePicker.prototype, "_onSelectDate", null);
    __decorate([
        Utilities_1.autobind
    ], DatePicker.prototype, "_onTextFieldFocus", null);
    __decorate([
        Utilities_1.autobind
    ], DatePicker.prototype, "_onTextFieldBlur", null);
    __decorate([
        Utilities_1.autobind
    ], DatePicker.prototype, "_onTextFieldChanged", null);
    __decorate([
        Utilities_1.autobind
    ], DatePicker.prototype, "_onTextFieldKeyDown", null);
    __decorate([
        Utilities_1.autobind
    ], DatePicker.prototype, "_onTextFieldClick", null);
    __decorate([
        Utilities_1.autobind
    ], DatePicker.prototype, "_dismissDatePickerPopup", null);
    __decorate([
        Utilities_1.autobind
    ], DatePicker.prototype, "_calendarDismissed", null);
    __decorate([
        Utilities_1.autobind
    ], DatePicker.prototype, "_handleEscKey", null);
    __decorate([
        Utilities_1.autobind
    ], DatePicker.prototype, "_validateTextInput", null);
    return DatePicker;
}(Utilities_1.BaseComponent));
exports.DatePicker = DatePicker;

//# sourceMappingURL=DatePicker.js.map
