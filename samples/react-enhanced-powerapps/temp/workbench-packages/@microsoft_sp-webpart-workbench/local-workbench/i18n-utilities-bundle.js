define("c83d5509-ccd5-4c67-919f-2440f237927a_0.1.24", ["globalize","resx-strings"], function(__WEBPACK_EXTERNAL_MODULE_D_ZV__, __WEBPACK_EXTERNAL_MODULE_vpy3__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "2uPZ");
/******/ })
/************************************************************************/
/******/ ({

/***/ "+NlS":
/*!********************************************!*\
  !*** ./lib/fabricSupport/FabricSupport.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LocaleFormat_LocaleFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../LocaleFormat/LocaleFormat */ "3+oh");
/* harmony import */ var _FabricSupport_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FabricSupport.resx */ "JI76");


/**
 * Helper data for office-ui-fabric-react controls.
 * @alpha
 */
var FabricSupport = /** @class */ (function () {
    function FabricSupport() {
    }
    Object.defineProperty(FabricSupport, "datePickerStrings", {
        /**
         * The strings for the DatePicker control (http://dev.office.com/fabric#/components/datepicker)
         */
        get: function () {
            if (!FabricSupport._datePickerStrings) {
                var months = [
                    new Date(0, 0),
                    new Date(0, 1),
                    new Date(0, 2),
                    new Date(0, 3),
                    new Date(0, 4),
                    new Date(0, 5),
                    new Date(0, 6),
                    new Date(0, 7),
                    new Date(0, 8),
                    new Date(0, 9),
                    new Date(0, 10),
                    new Date(0, 11)
                ];
                var days = [
                    new Date(0, 0, 0),
                    new Date(0, 0, 1),
                    new Date(0, 0, 2),
                    new Date(0, 0, 3),
                    new Date(0, 0, 4),
                    new Date(0, 0, 5),
                    new Date(0, 0, 6)
                ];
                FabricSupport._datePickerStrings = {
                    months: months.map(function (month) { return _LocaleFormat_LocaleFormat__WEBPACK_IMPORTED_MODULE_0__["default"].formatDate(month, { raw: 'LLLL' }); }),
                    shortMonths: months.map(function (month) { return _LocaleFormat_LocaleFormat__WEBPACK_IMPORTED_MODULE_0__["default"].formatDate(month, { raw: 'LLL' }); }),
                    days: days.map(function (day) { return _LocaleFormat_LocaleFormat__WEBPACK_IMPORTED_MODULE_0__["default"].formatDate(day, { raw: 'cccc' }); }),
                    shortDays: days.map(function (day) { return _LocaleFormat_LocaleFormat__WEBPACK_IMPORTED_MODULE_0__["default"].formatDate(day, { raw: 'ccc' }); }),
                    goToToday: _FabricSupport_resx__WEBPACK_IMPORTED_MODULE_1__["default"].datePickerGoToToday
                };
            }
            return FabricSupport._datePickerStrings;
        },
        enumerable: true,
        configurable: true
    });
    FabricSupport._datePickerStrings = undefined;
    return FabricSupport;
}());
/* harmony default export */ __webpack_exports__["default"] = (FabricSupport);


/***/ }),

/***/ "2uPZ":
/*!*******************************!*\
  !*** ./lib/i18n-utilities.js ***!
  \*******************************/
/*! exports provided: LocaleFormat, FabricSupport, SPDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LocaleFormat_LocaleFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LocaleFormat/LocaleFormat */ "3+oh");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocaleFormat", function() { return _LocaleFormat_LocaleFormat__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _fabricSupport_FabricSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fabricSupport/FabricSupport */ "+NlS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FabricSupport", function() { return _fabricSupport_FabricSupport__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _spDate_SPDate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./spDate/SPDate */ "nV5s");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPDate", function() { return _spDate_SPDate__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/**
 * SharePoint Framework support for globalization of numbers and dates
 *
 * @remarks
 * This package privates support for formatting and parsing numbers and dates.
 *
 * @packagedocumentation
 */





/***/ }),

/***/ "3+oh":
/*!******************************************!*\
  !*** ./lib/LocaleFormat/LocaleFormat.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var globalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! globalize */ "D/ZV");
/* harmony import */ var globalize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(globalize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _timeConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../timeConstants */ "JLfl");
/* harmony import */ var _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocaleFormatStrings.resx */ "cjwL");
/**
 * This is a set of tools for internationalization, including support for formatting and parsing numbers and
 *  dates and times, and formatting relative times.
 */



var RelativeTimeLengthForm;
(function (RelativeTimeLengthForm) {
    RelativeTimeLengthForm[RelativeTimeLengthForm["short"] = 0] = "short";
    RelativeTimeLengthForm[RelativeTimeLengthForm["narrow"] = 1] = "narrow";
    RelativeTimeLengthForm[RelativeTimeLengthForm["long"] = 2] = "long";
})(RelativeTimeLengthForm || (RelativeTimeLengthForm = {}));
/**
 * A set of utility functions for localizing dates and numbers.
 *
 * @alpha
 */
var LocaleFormat = /** @class */ (function () {
    function LocaleFormat() {
    }
    /**
     * Format a number in the user's locale according to the specified options.
     *
     * @param value - The number to format.
     * @param options - Optional options for formatting.
     *
     * @returns The formatted number.
     */
    // See https://github.com/jquery/globalize/blob/master/doc/api/number/number-formatter.md
    LocaleFormat.formatNumber = function (value, options) {
        return globalize__WEBPACK_IMPORTED_MODULE_0___default.a.formatNumber(value, _sortAndScrubOptions(options));
    };
    /**
     * Parse a string into a number according to the specified options. The number is expected to be formatted according
     *  to the user's locale.
     *
     * @param value - The string value to parse.
     * @param options - Optional options for parsing.
     *
     * @returns The parsed number.
     */
    // See https://github.com/jquery/globalize/blob/master/doc/api/number/number-parser.md
    LocaleFormat.parseNumber = function (value, options) {
        return globalize__WEBPACK_IMPORTED_MODULE_0___default.a.parseNumber(value, _sortAndScrubOptions(options));
    };
    /**
     * Format a date in the user's locale according to the specified options.
     *
     * @param value - The date to format.
     * @param options - Optional options for formatting.
     *
     * @returns The formatted date.
     */
    // See  https://github.com/jquery/globalize/blob/master/doc/api/date/date-formatter.md
    LocaleFormat.formatDate = function (value, options) {
        return globalize__WEBPACK_IMPORTED_MODULE_0___default.a.formatDate(value, _sortAndScrubOptions(options));
    };
    /**
     * Parse a string into a Date according to the specified options. The date is expected to be formatted according
     *  to the user's locale.
     *
     * @param value - The string value to parse.
     * @param options - Optional options for parsing.
     *
     * @returns The parsed date.
     */
    // See https://github.com/jquery/globalize/blob/master/doc/api/date/date-parser.md
    LocaleFormat.parseDate = function (value, options) {
        return globalize__WEBPACK_IMPORTED_MODULE_0___default.a.parseDate(value, _sortAndScrubOptions(options));
    };
    /**
     * Format a number of specified time units in the user's locale according to the specified options as a relative date
     *  time.
     *
     * @param value - The number of units.
     * @param unit - The time unit. Valid options include "day", "week", "month", etc.
     * @param options - Optional options for formatting.
     *
     * @returns The formatted relative time.
     */
    // See https://github.com/jquery/globalize/blob/master/doc/api/relative-time/relative-time-formatter.md
    LocaleFormat.formatRelativeTime = function (value, unit, options) {
        _normalizeRelativeTimeFormatterOptions(options);
        return globalize__WEBPACK_IMPORTED_MODULE_0___default.a.formatRelativeTime(value, unit, options);
    };
    /**
     * Format a date as relative to the current time.
     *
     * @param value - The date.
     * @param options - Optional options for formatting.
     *
     * @returns The formatted relative time.
     */
    // See https://github.com/jquery/globalize/blob/master/doc/api/relative-time/relative-time-formatter.md
    LocaleFormat.formatRelativeTimeApproximate = function (value, options) {
        var formattingOptions = options ? options.formattingOptions : {};
        _normalizeRelativeTimeFormatterOptions(formattingOptions);
        if (!formattingOptions) {
            formattingOptions = {};
        }
        var timeDifference = value.getTime() - Date.now();
        var past = timeDifference < 0;
        var absoluteTimeDifference = (timeDifference < 0) ? -timeDifference : timeDifference;
        var dailyCutoff = options && options.oneWeekCutoff
            ? _timeConstants__WEBPACK_IMPORTED_MODULE_1__["MILLISECONDS_IN_ONE_WEEK"]
            : _timeConstants__WEBPACK_IMPORTED_MODULE_1__["MILLISECONDS_IN_THIRTY_TWO_DAYS"];
        var length = (formattingOptions.form)
            ? ((formattingOptions.form === 'short') ? RelativeTimeLengthForm.short : RelativeTimeLengthForm.narrow)
            : RelativeTimeLengthForm.long;
        if (absoluteTimeDifference < 1000) {
            // now
            return LocaleFormat.formatRelativeTime(0, 'second', formattingOptions);
        }
        else if (absoluteTimeDifference < _timeConstants__WEBPACK_IMPORTED_MODULE_1__["MILLISECONDS_IN_THIRTY_SECONDS"]) {
            // a few seconds ago/in a few seconds
            return _getFewSecondsRelative(length, past);
        }
        else if (absoluteTimeDifference < _timeConstants__WEBPACK_IMPORTED_MODULE_1__["MILLISECONDS_IN_ONE_MINUTE"]) {
            // less than a minute ago/in less than a minute
            return _getLessThanAMinuteRelative(length, past);
        }
        else if (absoluteTimeDifference < _timeConstants__WEBPACK_IMPORTED_MODULE_1__["MILLISECONDS_IN_TWO_MINUTES"]) {
            // about a minute ago/in about a minute
            return _getAboutAMinuteRelative(length, past);
        }
        else if (absoluteTimeDifference < _timeConstants__WEBPACK_IMPORTED_MODULE_1__["MILLISECONDS_IN_ONE_HOUR"]) {
            // {0} minutes ago/in {0} minutes
            var minuteCount = Math.round(timeDifference / _timeConstants__WEBPACK_IMPORTED_MODULE_1__["MILLISECONDS_IN_ONE_MINUTE"]);
            return LocaleFormat.formatRelativeTime(minuteCount, 'minute', formattingOptions);
        }
        else if (absoluteTimeDifference < _timeConstants__WEBPACK_IMPORTED_MODULE_1__["MILLISECONDS_IN_TWO_HOURS"]) {
            // about an hour ago/in about an hour
            return _getAboutAnHourRelative(length, past);
        }
        else if (absoluteTimeDifference < _timeConstants__WEBPACK_IMPORTED_MODULE_1__["MILLISECONDS_IN_ONE_DAY"]) {
            // {0} hours ago/in {0} hours
            var hourCount = Math.round(timeDifference / _timeConstants__WEBPACK_IMPORTED_MODULE_1__["MILLISECONDS_IN_ONE_HOUR"]);
            return LocaleFormat.formatRelativeTime(hourCount, 'hour', formattingOptions);
        }
        else if (absoluteTimeDifference < dailyCutoff) {
            // yesterday/tomorrow
            // or
            // {0} days ago/in {0} days
            var dayCount = Math.round(timeDifference / _timeConstants__WEBPACK_IMPORTED_MODULE_1__["MILLISECONDS_IN_ONE_DAY"]);
            return LocaleFormat.formatRelativeTime(dayCount, 'day', formattingOptions);
        }
        else if (value.getFullYear() === (new Date()).getFullYear()) {
            // The date without the year
            return _getDateWithoutYear(value, length);
        }
        else {
            // The date
            return _getDateWithYear(value, length);
        }
    };
    return LocaleFormat;
}());
/* harmony default export */ __webpack_exports__["default"] = (LocaleFormat);
/**
 * Globalize has this weird caveat where the order of options matters, so we'll always put them
 *  in alphabetical order. We also need to scrub out undefined options.
 */
function _sortAndScrubOptions(options) {
    if (!options) {
        return options;
    }
    else {
        var result = {};
        var keys = Object.keys(options).sort();
        var emptyObject = true;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (options[key] !== undefined) {
                result[key] = options[key];
                emptyObject = false;
            }
        }
        return emptyObject ? undefined : result;
    }
}
function _getFewSecondsRelative(length, past) {
    // a few seconds ago/in a few seconds
    switch (length) {
        case RelativeTimeLengthForm.narrow:
            return past ? _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AFewSeconds_Past_Narrow : _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AFewSeconds_Future_Narrow;
        case RelativeTimeLengthForm.short:
            return past ? _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AFewSeconds_Past_Short : _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AFewSeconds_Future_Short;
        case RelativeTimeLengthForm.long:
            return past ? _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AFewSeconds_Past_Long : _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AFewSeconds_Future_Long;
    }
}
function _getLessThanAMinuteRelative(length, past) {
    // less than a minute ago/in less than a minute
    switch (length) {
        case RelativeTimeLengthForm.narrow:
            return past ? _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].LessThanAMinute_Past_Narrow : _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].LessThanAMinute_Future_Narrow;
        case RelativeTimeLengthForm.short:
            return past ? _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].LessThanAMinute_Past_Short : _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].LessThanAMinute_Future_Short;
        case RelativeTimeLengthForm.long:
            return past ? _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].LessThanAMinute_Past_Long : _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].LessThanAMinute_Future_Long;
    }
}
function _getAboutAMinuteRelative(length, past) {
    // about a minute ago/in about a minute
    switch (length) {
        case RelativeTimeLengthForm.narrow:
            return past ? _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AboutAMinute_Past_Narrow : _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AboutAMinute_Future_Narrow;
        case RelativeTimeLengthForm.short:
            return past ? _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AboutAMinute_Past_Short : _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AboutAMinute_Future_Short;
        case RelativeTimeLengthForm.long:
            return past ? _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AboutAMinute_Past_Long : _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AboutAMinute_Future_Long;
    }
}
function _getAboutAnHourRelative(length, past) {
    // about an hour ago/in about an hour
    switch (length) {
        case RelativeTimeLengthForm.narrow:
            return past ? _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AboutAnHour_Past_Narrow : _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AboutAnHour_Future_Narrow;
        case RelativeTimeLengthForm.short:
            return past ? _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AboutAnHour_Past_Short : _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AboutAnHour_Future_Short;
        case RelativeTimeLengthForm.long:
            return past ? _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AboutAnHour_Past_Long : _LocaleFormatStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].AboutAnHour_Future_Long;
    }
}
function _getDateWithoutYear(value, length) {
    // The date without the year
    var skeleton;
    switch (length) {
        case RelativeTimeLengthForm.narrow:
            skeleton = 'Md'; // 11/1
            break;
        case RelativeTimeLengthForm.short:
            skeleton = 'MMMd'; // Nov 1
            break;
        case RelativeTimeLengthForm.long:
        default: // tslint:disable-line:no-switch-case-fall-through
            skeleton = 'MMMMd'; // November 1
    }
    return LocaleFormat.formatDate(value, { skeleton: skeleton });
}
function _getDateWithYear(value, length) {
    // The date
    var dateFormat;
    switch (length) {
        case RelativeTimeLengthForm.narrow:
            dateFormat = 'short'; // 11/1/10
            break;
        case RelativeTimeLengthForm.short:
            dateFormat = 'medium'; // Nov 1, 2010
            break;
        case RelativeTimeLengthForm.long:
        default: // tslint:disable-line:no-switch-case-fall-through
            dateFormat = 'long'; // November 1, 2010
    }
    return LocaleFormat.formatDate(value, {
        date: dateFormat
    });
}
function _normalizeRelativeTimeFormatterOptions(options) {
    if (!options) {
        // No options, nothing to do
        return;
    }
    if (options.form === 'long') {
        // Globalize uses a falsy values as 'long'
        options.form = undefined;
    }
    options = _sortAndScrubOptions(options);
}


/***/ }),

/***/ "D/ZV":
/*!****************************!*\
  !*** external "globalize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_D_ZV__;

/***/ }),

/***/ "JI76":
/*!*************************************************!*\
  !*** ./lib/fabricSupport/FabricSupport.resx.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_tzecLFnVcD/oZoWS/0fBVg';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "JLfl":
/*!******************************!*\
  !*** ./lib/timeConstants.js ***!
  \******************************/
/*! exports provided: MILLISECONDS_IN_ONE_SECOND, MILLISECONDS_IN_THIRTY_SECONDS, MILLISECONDS_IN_ONE_MINUTE, MILLISECONDS_IN_TWO_MINUTES, MILLISECONDS_IN_ONE_HOUR, MILLISECONDS_IN_TWO_HOURS, MILLISECONDS_IN_ONE_DAY, MILLISECONDS_IN_ONE_WEEK, MILLISECONDS_IN_THIRTY_TWO_DAYS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MILLISECONDS_IN_ONE_SECOND", function() { return MILLISECONDS_IN_ONE_SECOND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MILLISECONDS_IN_THIRTY_SECONDS", function() { return MILLISECONDS_IN_THIRTY_SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MILLISECONDS_IN_ONE_MINUTE", function() { return MILLISECONDS_IN_ONE_MINUTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MILLISECONDS_IN_TWO_MINUTES", function() { return MILLISECONDS_IN_TWO_MINUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MILLISECONDS_IN_ONE_HOUR", function() { return MILLISECONDS_IN_ONE_HOUR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MILLISECONDS_IN_TWO_HOURS", function() { return MILLISECONDS_IN_TWO_HOURS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MILLISECONDS_IN_ONE_DAY", function() { return MILLISECONDS_IN_ONE_DAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MILLISECONDS_IN_ONE_WEEK", function() { return MILLISECONDS_IN_ONE_WEEK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MILLISECONDS_IN_THIRTY_TWO_DAYS", function() { return MILLISECONDS_IN_THIRTY_TWO_DAYS; });
// number of milliseconds for the given timespan
// copied from SPRelativeDateTime, including 32 days to a month. After 32 days, we know a month has passed
var MILLISECONDS_IN_ONE_SECOND = 1000;
var MILLISECONDS_IN_THIRTY_SECONDS = MILLISECONDS_IN_ONE_SECOND * 30;
var MILLISECONDS_IN_ONE_MINUTE = 60 * MILLISECONDS_IN_ONE_SECOND;
var MILLISECONDS_IN_TWO_MINUTES = 2 * MILLISECONDS_IN_ONE_MINUTE;
var MILLISECONDS_IN_ONE_HOUR = 60 * MILLISECONDS_IN_ONE_MINUTE;
var MILLISECONDS_IN_TWO_HOURS = 2 * MILLISECONDS_IN_ONE_HOUR;
var MILLISECONDS_IN_ONE_DAY = 24 * MILLISECONDS_IN_ONE_HOUR;
var MILLISECONDS_IN_ONE_WEEK = 7 * MILLISECONDS_IN_ONE_DAY;
var MILLISECONDS_IN_THIRTY_TWO_DAYS = 32 * MILLISECONDS_IN_ONE_DAY;


/***/ }),

/***/ "cjwL":
/*!******************************************************!*\
  !*** ./lib/LocaleFormat/LocaleFormatStrings.resx.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_tmSI9uv3XmV4RG+FeeI2/A';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "nV5s":
/*!******************************!*\
  !*** ./lib/spDate/SPDate.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timeConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../timeConstants */ "JLfl");
// Copyright (c) Microsoft. All rights reserved.

/**
 * SPDate provides date and time components with time zone offset.
 *
 * @alpha
 */
var SPDate = /** @class */ (function () {
    /**
     * Constructs the SPDate with the given data object.
     * @param data - SPDateData object.
     */
    function SPDate(data) {
        this._fullYear = data.fullYear;
        this._month = data.month;
        this._date = data.date;
        this._hours = data.hours;
        this._minutes = data.minutes;
        this._seconds = data.seconds;
        this._milliseconds = data.milliseconds;
    }
    Object.defineProperty(SPDate.prototype, "fullYear", {
        /**
         * A four digit number corresponding to the year of the given date.
         */
        get: function () { return this._fullYear; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPDate.prototype, "month", {
        /**
         * A number, between 0 and 11, representing the month in the given date.
         * 0 corresponds to January, 1 to February, and so on.
         */
        get: function () { return this._month; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPDate.prototype, "date", {
        /**
         * A number, between 1 and 31, representing the day of the month for the given date.
         */
        get: function () { return this._date; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPDate.prototype, "hours", {
        /**
         * A number, between 0 and 23, representing the hour for the given date.
         */
        get: function () { return this._hours; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPDate.prototype, "minutes", {
        /**
         * A number, between 0 and 59, representing the minutes in the given date.
         */
        get: function () { return this._minutes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPDate.prototype, "seconds", {
        /**
         * A number, between 0 and 59, representing the seconds in the given date.
         */
        get: function () { return this._seconds; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPDate.prototype, "milliseconds", {
        /**
         * A number, between 0 and 999, representing the milliseconds for the given date.
         */
        get: function () { return this._milliseconds ? this._milliseconds : 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPDate.prototype, "timezoneOffset", {
        /**
         * A number representing the time-zone offset from UTC, in minutes.
         */
        get: function () { return this._timezoneOffset ? this._timezoneOffset : 0; },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the UTC date for the date specified during the object creation from the specified
     * time zone.
     *
     * @param date - localized date.
     */
    SPDate.prototype.convertToUTC = function (fromTimezone) {
        // UTC time for the given date.
        var utcMilliSeconds = Date.UTC(this.fullYear, this.month, this.date, this.hours, this.minutes, this.seconds, this.milliseconds);
        var preferredTimezoneMilliSeconds = utcMilliSeconds + (this._getAdjustedTimezoneOffset(this, fromTimezone) * _timeConstants__WEBPACK_IMPORTED_MODULE_0__["MILLISECONDS_IN_ONE_MINUTE"]);
        // create the date with the preferred time zome milliseconds, whose UTC is what is required.
        // Though this date is created in the current time zone, we don't worry about it
        // as we just need that date components.
        var newDate = new Date(preferredTimezoneMilliSeconds);
        return this._convertDateToSPDate(newDate, 0);
    };
    /**
     * Returns the date converted to the time zone specified, for the UTC date passed in during
     * the object creation.
     *
     * @param utcDate - UTC date to convert to the localized date.
     */
    SPDate.prototype.convertFromUTC = function (toTimezone) {
        var utcMilliseconds = Date.UTC(this.fullYear, this.month, this.date, this.hours, this.minutes, this.seconds, this.milliseconds);
        // Adjusted offset for the given timezone with taking DST into account.
        var adjustedOffset = this._getAdjustedTimezoneOffset(this, toTimezone);
        // calculating milliseconds difference with respect to the given time zone's offset.
        var timeInMilliSeconds = utcMilliseconds - (adjustedOffset * _timeConstants__WEBPACK_IMPORTED_MODULE_0__["MILLISECONDS_IN_ONE_MINUTE"]);
        var localizedDate = new Date(timeInMilliSeconds);
        return this._convertDateToSPDate(localizedDate, adjustedOffset);
    };
    SPDate.prototype.isSame = function (inputDate) {
        return (this.fullYear === inputDate.fullYear &&
            this.month === inputDate.month &&
            this.date === inputDate.date &&
            this.hours === inputDate.hours &&
            this.minutes === inputDate.minutes &&
            this.seconds === inputDate.seconds &&
            this.milliseconds === inputDate.milliseconds);
    };
    SPDate.prototype._getAdjustedTimezoneOffset = function (date, timezone) {
        var isStandardTime = this._isStandardTime(date, timezone);
        var adjustedOffset = timezone.offset +
            (isStandardTime ? timezone.standardOffset : timezone.daylightOffset);
        return adjustedOffset;
    };
    // This function takes the reasonable assumption that daylight time and
    // standard time will always vary by at least a month.
    SPDate.prototype._isStandardTime = function (date, timeZone) {
        // This is for the time zones where there is no daylight savings is observed.
        if (timeZone.standardDate.Month === timeZone.daylightDate.Month) {
            return true;
        }
        var isStandardDateEarlier = timeZone.standardDate.Month < timeZone.daylightDate.Month;
        var earlierDate = this._convertSystemTimeToDate(isStandardDateEarlier ? timeZone.standardDate : timeZone.daylightDate, date.fullYear);
        var laterDate = this._convertSystemTimeToDate(isStandardDateEarlier ? timeZone.daylightDate : timeZone.standardDate, date.fullYear);
        if (date._isSameOrAfter(earlierDate) && date._isBefore(laterDate)) {
            return isStandardDateEarlier;
        }
        else {
            return !isStandardDateEarlier;
        }
    };
    SPDate.prototype._convertSystemTimeToDate = function (time, currentYear) {
        var firstDayOfTheMonth = new Date(time.Year || currentYear, time.Month - 1, // Month parameter accepts a 0 based month value.
        1 // First day of the month
        );
        var firstDayOfNextMonth = new Date(time.Year || currentYear, time.Month, 1);
        // Calculate the day offset between target day and first day of this month in terms of day of week.
        // e.g. Friday(5) - Monday(1) = 4(day); Sunday(0) - TuesDay(2) = -2(days);
        var dayOfWeekOffset = time.DayOfWeek - firstDayOfTheMonth.getDay();
        // Calculate the offset in terms of number of weeks between target day and first day of week
        // For a given target day like 'the number nth TuesDay of current month',
        //    if current month starts with Sunday, Monday, or Tuesday, the target day is in the number n  week of month.
        //    if current month starts with Wednesday or later, the target day is actually the number n + 1 week of month.
        // In the two cases, the week offset against first week is (n - 1) weeks and (n + 1 - 1) = n weeks
        // Notes, for time with SystemDate type, time = { Day: n, dayOfWeek: Tuesday(or other day) } means
        // the number nth TuesDay in current month.
        var weekOffset = dayOfWeekOffset >= 0 ? time.Day - 1 : time.Day;
        // Calculating how many days between target day and first day of current month, and turn into milliseconds.
        var dateOffsetInMilliseconds = (weekOffset * 7 + dayOfWeekOffset) * _timeConstants__WEBPACK_IMPORTED_MODULE_0__["MILLISECONDS_IN_ONE_DAY"];
        // Calculating the target date, and setting the hour, minute, seconds, milliseconds from system time.
        var targetDateTime = new Date(firstDayOfTheMonth.getTime() + dateOffsetInMilliseconds);
        targetDateTime.setHours(time.Hour);
        targetDateTime.setMinutes(time.Minute);
        targetDateTime.setSeconds(time.Second);
        targetDateTime.setMilliseconds(time.Milliseconds);
        while (targetDateTime.getTime() >= firstDayOfNextMonth.getTime()) {
            // Some system time (like the daylights saving ends date for Dublin time zone) is defined as
            // 'year: 2018, Month: 10, DayOfWeek: 0(Sunday), Day: 5(FIFTH Sunday)', but Oct. 2018 only has FOUR Sundays.
            // Actually this system time indicates `the LAST Sunday of Oct. 2018`.
            //  - Without this 'while' iteration to roll back, the calculated target date will be Nov. 4th (which is wrong).
            //  - With this 'while()' block, target date is rolled back by 1 week to be Oct. 28th (which is correct).
            targetDateTime = new Date(targetDateTime.getTime() - _timeConstants__WEBPACK_IMPORTED_MODULE_0__["MILLISECONDS_IN_ONE_WEEK"]);
        }
        return targetDateTime;
    };
    SPDate.prototype._convertDateToSPDate = function (date, timezoneOffset) {
        return new SPDate({
            date: date.getUTCDate(),
            fullYear: date.getUTCFullYear(),
            hours: date.getUTCHours(),
            milliseconds: date.getUTCMilliseconds(),
            minutes: date.getUTCMinutes(),
            month: date.getUTCMonth(),
            seconds: date.getUTCSeconds(),
            timezoneOffset: timezoneOffset
        });
    };
    SPDate.prototype._isSameOrAfter = function (inputDate) {
        if (!inputDate) {
            throw new Error('Supplied date cannot be undefined or null.');
        }
        var thisDate = new Date(this.fullYear, this.month, this.date, this.hours, this.minutes, this.milliseconds);
        return thisDate >= inputDate;
    };
    SPDate.prototype._isBefore = function (date) {
        return !this._isSameOrAfter(date);
    };
    return SPDate;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPDate);


/***/ }),

/***/ "vpy3":
/*!*******************************!*\
  !*** external "resx-strings" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vpy3__;

/***/ })

/******/ })});;
//# sourceMappingURL=i18n-utilities-bundle.js.map