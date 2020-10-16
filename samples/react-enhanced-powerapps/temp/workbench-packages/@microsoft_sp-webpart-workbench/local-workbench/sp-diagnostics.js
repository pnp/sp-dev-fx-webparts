define("78359e4b-07c2-43c6-8d0b-d060b4d577e8_1.11.0", ["@microsoft/sp-lodash-subset","@microsoft/sp-core-library"], function(__WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_UWqr__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "mwqp");
/******/ })
/************************************************************************/
/******/ ({

/***/ "7rFx":
/*!*****************************!*\
  !*** ./lib/Api/LogEntry.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LogFeature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LogFeature */ "QHY3");
/* harmony import */ var _LogType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LogType */ "FSio");
// Copyright (c) Microsoft. All rights reserved.


/**
 * Represents a Log entry
 *
 * @internal
 */
var LogEntry = /** @class */ (function () {
    /**
     * Initializes a new instance of LogEntry
     * @param moduleName - the name of the module
     * @param logFeature - the name of the feature
     * @param logType - the log type
     * @param logProperties - optional property bag
     */
    function LogEntry(moduleName, logFeature, logType, logProperties, isIntentional) {
        if (logFeature === void 0) { logFeature = _LogFeature__WEBPACK_IMPORTED_MODULE_0__["default"].None; }
        if (logType === void 0) { logType = _LogType__WEBPACK_IMPORTED_MODULE_1__["default"].Trace; }
        if (moduleName) {
            this.moduleName = moduleName;
            this.logFeature = logFeature;
            this.logType = logType;
            this.logProperties = logProperties;
            this.isIntentional = isIntentional;
        }
        else {
            throw new Error('moduleName is invalid');
        }
    }
    /**
     * convert the log entry to string
     * @returns the serialized log entry
     */
    LogEntry.prototype.toString = function () {
        var serializedLogProps = undefined;
        if (this.logProperties) {
            try {
                serializedLogProps = JSON.stringify(this.logProperties);
            }
            catch (e) {
                console.log('Error happens in toString():' + e);
            }
        }
        return this.moduleName + " | " + this.logFeature + " | " + this.logType + " | " + serializedLogProps;
    };
    return LogEntry;
}());
/* harmony default export */ __webpack_exports__["default"] = (LogEntry);


/***/ }),

/***/ "AhqE":
/*!***********************************!*\
  !*** ./lib/Api/ExecutionQueue.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */
/**
 * ExecutionQueue allows multiple handlers to be processed in real time or deferred.
 * @internal
 */
var ExecutionQueue = /** @class */ (function () {
    function ExecutionQueue() {
        this._shouldExecuteInRealTime = false;
        this._handlers = {}; // tslint:disable-line:typedef
        this._executionEntries = [];
    }
    Object.defineProperty(ExecutionQueue.prototype, "shouldExecuteInRealTime", {
        /**
         * Determines if the added execution entries should be processed in real time.
         * If this is set to true, a stack with entries will not be saved.
         */
        get: function () {
            return this._shouldExecuteInRealTime;
        },
        /**
         * Sets the behavior for this execution stack.
         * When set to true, all entries on stack will be processed and future entries
         * will be executed in real time.
         * When set to false, future entries will be saved in the execution stack for
         * later processing.
         */
        set: function (executeInRealTime) {
            this._shouldExecuteInRealTime = executeInRealTime;
            if (this._shouldExecuteInRealTime) {
                this.flush();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Registers an external handler to collection for delayed asyncronous processing.
     * Handlers are registered once. If handler is already registered, it does nothing.
     */
    ExecutionQueue.prototype.addHandler = function (key, handler) {
        if (this._containsHandler(key, handler)) {
            return;
        }
        this._initializeHandlerArrayForKey(key);
        var handlers = this._handlers[key]; // tslint:disable-line:no-any
        if (handlers.indexOf(handler) === -1) {
            handlers.push(handler);
        }
    };
    /**
     * Execution Entry registration for delayed asyncronous processing.
     */
    ExecutionQueue.prototype.addExecutionEntry = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        Object.freeze(args);
        if (this._shouldExecuteInRealTime) {
            this._processExecutionEntry(key, args);
        }
        else {
            this._executionEntries.push({ key: key, args: args });
        }
    };
    /**
     * Removes an external executionEntry handler from collection for asyncronous event logging.
     * Logger is registered once.
     */
    ExecutionQueue.prototype.removeHandler = function (key, handler) {
        var index = this._handlers[key].indexOf(handler);
        if (index > -1) {
            this._handlers[key].splice(index, 1);
        }
    };
    /**
     * Reset function clears executionEntry handler collection for asyncronous event logging.
     * All recorded execution entries and handlers are purged.
     */
    ExecutionQueue.prototype.reset = function () {
        this._handlers = {};
        this._executionEntries = [];
    };
    /**
     * Flushes all the buffered execution entries.
     * All recorded execution entries are purged.
     */
    ExecutionQueue.prototype.flush = function () {
        this._processAllExecutionEntries();
        this._executionEntries = [];
    };
    ExecutionQueue.prototype._containsHandler = function (key, handler) {
        if (this._handlers[key] !== null && this._handlers[key] !== undefined) {
            return this._handlers[key].indexOf(handler) > -1;
        }
        return false;
    };
    ExecutionQueue.prototype._initializeHandlerArrayForKey = function (key) {
        if (this._handlers[key] === null || this._handlers[key] === undefined) {
            this._handlers[key] = [];
        }
    };
    ExecutionQueue.prototype._processAllExecutionEntries = function () {
        var _this = this;
        this._executionEntries.forEach(function (entry) {
            if (entry && _this._handlers[entry.key]) {
                try {
                    _this._handlers[entry.key].forEach(function (handler) {
                        handler.apply(_this, entry.args);
                    });
                }
                catch (e) {
                    console.error('failed to process execution entry:' + e.toString());
                }
            }
        });
    };
    ExecutionQueue.prototype._processExecutionEntry = function (key, args) {
        for (var i = 0; i < this._handlers[key].length; i++) {
            try {
                this._handlers[key][i].apply(this, args);
            }
            catch (e) {
                console.error('failed to process execution entry:' + e.toString());
            }
        }
    };
    return ExecutionQueue;
}());
/* harmony default export */ __webpack_exports__["default"] = (ExecutionQueue);


/***/ }),

/***/ "FSio":
/*!****************************!*\
  !*** ./lib/Api/LogType.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Copyright (c) Microsoft. All rights reserved.
/**
 * Represents the supported log types
 *
 * @internal
 */
var LogType;
(function (LogType) {
    /**
     * Trace level log. Use this for logging diagnostics
     */
    LogType[LogType["Trace"] = 1] = "Trace";
    /**
     * Event level log. Use this for logging usage etc
     */
    LogType[LogType["Event"] = 2] = "Event";
    /**
     * Use for errors
     */
    LogType[LogType["Error"] = 3] = "Error";
})(LogType || (LogType = {}));
/* harmony default export */ __webpack_exports__["default"] = (LogType);


/***/ }),

/***/ "H9JW":
/*!**************************************!*\
  !*** ./lib/Api/Trace/TraceLogger.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LogEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LogEvent */ "pPvZ");
/* harmony import */ var _LogLevel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../LogLevel */ "rG76");
/* harmony import */ var _DefaultTraceHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DefaultTraceHandler */ "SiB3");
/* harmony import */ var _LogManager_LogManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../LogManager/LogManager */ "cyTu");





/**
 * This is used to log traces of failed operations and debugging information.
 * @internal
 */
var TraceLogger = /** @class */ (function () {
    function TraceLogger() {
    }
    /**
     * Init function for the passed logger object
     *
     * @internal
     */
    TraceLogger._addHandler = function (logger) {
        TraceLogger._logManager.addHandler(logger.log);
        TraceLogger._logManager.processAll(logger.log);
        TraceLogger._verboseLogManager.addHandler(logger.verbose);
        TraceLogger._verboseLogManager.processAll(logger.verbose);
    };
    /**
     * Exception logging
     * This shoule be used whenever you want to log something that might in future help to debug failures.
     * The error parameter is the only required one and basically will be just converted to string and
     * logged to Debug stream (RealibilityLogs in SLAPI).
     * It will also be uploaded to the server immediately and not wait for next batch log upload.
     * If you don't specify second parameter:eventName
     * the event name for all errors logged that way will be same "CaughtError" with
     * appropriate prefix ("ModernPublish.CaughtError" etc.)
     * These two parameters "eventName and resultCode" are there to be used from Qos.
     * It is not encouraged to use them directly from ErrorHelper but if you do,
     * the log will be written with custom event name of following format:
     * <Workload>.<eventName>.<resultCode>.Failure, Workload is set in Telemetry settings.
     **/
    TraceLogger.logError = function (source, error, eventName, resultCode) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(error, 'error');
        this._log(source, error, eventName, true, resultCode);
    };
    /**
     * Exception logging intended to replace to logError.
     *
     * @remarks
     * Uses the `ILogErrorData` interface to prevent excessive undefined parameters
     * when calling this function.
     * This should be used whenever you want to log something that might in future help to
     * debug failures.
     * It will also be uploaded to the server immediately and not wait for next batch log upload.
     */
    TraceLogger.logErrorData = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.error, 'error');
        var errorInfo = data.logEntry ? data.logEntry.toString() : data.error;
        this._log(data.source, errorInfo, data.eventName, true, data.resultCode, data.serviceScope);
    };
    /**
     * Trace logging
     * The idea here is that verbose logs don't get uploaded to the server unless
     * a failure is logged using ErrorHelper.log method.
     * There is a circular buffer that holds last 50 verbose logs from all scenarios and
     * it is only flushed and uploaded in case a failure is logged.
     * That way whenever you get a failure event with message you also have all supportive verbose messages
     * you logged throughout your scenario execution (or other scenarios).
     * And hopefully that would help you get to the bottom of what exactly went wrong.
     * If no failure happens and your scenario succeeds, verbose logs will be just left in the buffer
     * and most likely overriden by next scenario that logs something verbose.
    **/
    TraceLogger.logVerbose = function (source, message, eventName) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(message, 'message');
        this._log(source, message, eventName, false, undefined);
    };
    /**
     * Verbose logging intended to replace to logVerbose.
     * The idea here is that verbose logs don't get uploaded to the server unless
     * a failure is logged using ErrorHelper.log method.
     * There is a circular buffer that holds last 50 verbose logs from all scenarios and
     * it is only flushed and uploaded in case a failure is logged.
     * That way whenever you get a failure event with message you also have all supportive verbose messages
     * you logged throughout your scenario execution (or other scenarios).
     * And hopefully that would help you get to the bottom of what exactly went wrong.
     * If no failure happens and your scenario succeeds, verbose logs will be just left in the buffer
     * and most likely overriden by next scenario that logs something verbose.
     */
    TraceLogger.logVerboseData = function (data) {
        var message = data.logEntry ? data.logEntry.toString() : data.message;
        this._log(data.source, message, data.eventName, false, undefined, data.serviceScope);
    };
    /**
     * Exception logging With LogEntry
     * error message should be packed into logProperties
     * LogType should be LogType.Error and LogProperties should have `{error:errorMessage}`
     * Do NOT add PII data!
     **/
    TraceLogger.logErrorWithLogEntry = function (source, logEntry, eventName, resultCode) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(source, 'source');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(logEntry, 'logEntry');
        this._log(source, logEntry.toString(), eventName, true, resultCode);
    };
    Object.defineProperty(TraceLogger, "shouldWriteToConsole", {
        /**
         * Indicates if the log entries should be output to the console.
         * This flag is set to true by default.
         */
        get: function () { return TraceLogger._shouldWriteToConsole; },
        /**
         * Toggles console output functionality.
         * Property can be chaged by remote caller.
         */
        set: function (shouldWrite) {
            if (TraceLogger._shouldWriteToConsole && !shouldWrite) {
                TraceLogger._logManager.removeHandler(TraceLogger._defaultLogger.log);
                TraceLogger._verboseLogManager.removeHandler(TraceLogger._defaultLogger.verbose);
            }
            else if (!TraceLogger._shouldWriteToConsole && shouldWrite) {
                TraceLogger._logManager.addHandler(TraceLogger._defaultLogger.log);
                TraceLogger._verboseLogManager.addHandler(TraceLogger._defaultLogger.verbose);
            }
            TraceLogger._shouldWriteToConsole = shouldWrite;
        },
        enumerable: true,
        configurable: true
    });
    /*
    * Trace logging with `LogEntry`
    * The same with above other than wrapped log into `logEntry`
    * Trace message should be packed into `logProperties`
    * `LogType` should be `LogType.Trace` and LogProperties should have something like `{errors:errorMessage}`
    * Do NOT add PII data!
    **/
    TraceLogger.logVerboseWithLogEntry = function (source, logEntry, eventName) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(logEntry, 'LogEntry');
        this._log(source, logEntry.toString(), eventName, false, undefined);
    };
    TraceLogger._log = function (source, data, eventName, isError, resultCode, serviceScope) {
        var enhancedEventName = this._addEventPrefix(source, eventName);
        var logEvent;
        if (isError) {
            logEvent = _LogEvent__WEBPACK_IMPORTED_MODULE_1__["default"].log(enhancedEventName, data, _LogLevel__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error, serviceScope);
            TraceLogger._logManager.log({ data: data, eventName: logEvent.prefix, resultCode: resultCode });
        }
        else {
            logEvent = _LogEvent__WEBPACK_IMPORTED_MODULE_1__["default"].log(enhancedEventName, data.toString(), _LogLevel__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Verbose, serviceScope);
            TraceLogger._verboseLogManager.log({ data: data, eventName: logEvent.prefix });
        }
        if (TraceLogger.shouldWriteToConsole || ( true && !false)) {
            this._writeToConsole(logEvent, isError, resultCode);
        }
    };
    /*
    * EventName is:
    * sourceId.eventName or sourceId if eventName is not provided.
    */
    TraceLogger._addEventPrefix = function (source, eventName) {
        if (!eventName) {
            return source.id;
        }
        else {
            return source.id + "." + eventName;
        }
    };
    /*
    * The log message in console is:
    * `[eventName]: data`.
    */
    TraceLogger._writeToConsole = function (logEvent, isError, resultCode) {
        // @todo (SPPPLAT VSO#250083): This date should be a part of the logEvent.
        var errorString = logEvent.toString();
        if (resultCode) {
            errorString += ". resultCode: " + resultCode;
        }
        // Task 191596: only write to console when a condition is satisfied (e.g., a query parameter provided).
        if (isError) {
            console.error(errorString);
        }
        else {
            console.log(errorString);
        }
    };
    /**
     * Allows process trace log events.
     */
    TraceLogger._logManager = new _LogManager_LogManager__WEBPACK_IMPORTED_MODULE_4__["default"]();
    /**
     * Allows process verbose trace log events.
     */
    TraceLogger._verboseLogManager = new _LogManager_LogManager__WEBPACK_IMPORTED_MODULE_4__["default"]();
    TraceLogger._defaultLogger = new _DefaultTraceHandler__WEBPACK_IMPORTED_MODULE_3__["default"]();
    TraceLogger._shouldWriteToConsole = false;
    return TraceLogger;
}());
/* harmony default export */ __webpack_exports__["default"] = (TraceLogger);


/***/ }),

/***/ "O2hE":
/*!************************************************!*\
  !*** ./lib/Api/Engagement/EngagementLogger.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LogManager_LogManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../LogManager/LogManager */ "cyTu");
/* harmony import */ var _DiagnosticsSettingsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../DiagnosticsSettingsManager */ "ULMK");
/**
 * @copyright Microsoft Corporation.All rights reserved.
 * @file EngagementLogger.ts
 * EngagementLogger logger
 */


/**
 * Engagement logging
 * use *.Click for all the actions triggered by mouse, keyboard, or touch.
 * if you want to add more data or the action is not click but keydown.
 * Use extraData to log the type of action or use extraData to log details wrapped in LogEntry
 * @internal
 */
var EngagementLogger = /** @class */ (function () {
    function EngagementLogger() {
    }
    /**
     * Init function for the passed logger object
     */
    EngagementLogger._addHandler = function (logger) {
        EngagementLogger._handler = function (e) { logger.logData(e); };
        EngagementLogger._logManager.addHandler(EngagementLogger._handler);
    };
    /**
     * Starts processing logs in real time
     */
    EngagementLogger.startRealTimeProcessing = function () {
        if (!this._shouldProcessInRealTime) {
            EngagementLogger._logManager.processAll(EngagementLogger._handler);
            this._shouldProcessInRealTime = true;
        }
    };
    /**
    * Engagement logging
    *
    * @remarks
    * Use *.Click for all the actions triggered by mouse, keyboard, or touch.
    * tagName follows `<Workload>.controlName.actionName` pattern
    * For example, `{ name = "AddButton.Click" }`,
    * this logs `"<Workload>.AddButton.Click"` with default action triggered by mouse, keyboard, or touch.
    * `<Workload>` is set in Telemetry settings
    * `IEngagementData` interface is mapped to a set of enums for standardization of mapping.
    * Add new items to enum in order to register a new item specification.
    * SiteType is defined in SiteType enum
    * CurrentPage is defined in CurrentPage enum
    * Component is defined in Component enum
    * Feature is defined in Feature enum.
    */
    EngagementLogger.log = function (engagementData) {
        EngagementLogger._logEngagementData(engagementData);
    };
    /**
     * Engagement logging
     *
     * @remarks
     * Use *.Click for all the actions triggered by mouse, keyboard, or touch.
     * tagName follows `<Workload>.controlName.actionName` pattern
     * For example, `tagName = "AddButton.Click"`,
     * this logs `"<Workload>.AddButton.Click"` with default action triggered by mouse, keyboard, or touch.
     * `<Workload>` is set in Telemetry settings
     * Use extraData to log the type of action.
     * For example, `actionName = "Keydown"` and `tagName = "ModernPublish.AddButton.Click"`
     * this logs `"<Workload>.AddButton.Click"` with the extraData that it was selected using the Keydown
     */
    EngagementLogger.logEvent = function (tagName, actionName) {
        var logData = { name: tagName };
        if (actionName && actionName.length !== 0) {
            logData.extraData = { action: actionName };
        }
        EngagementLogger._logEngagementData(logData);
    };
    /**
     * Engagement logging with LogEntry
     *
     * @remarks
     * Here is an example:
     * ```
     * {"EngagementName":"SPPage.NavigationAction.SPPageQuickLaunchUpdate"`,
     * "Properties":"{\"message\":\"[NavigationAction] | SPPageQuickLaunchUpdate | 2 | null\"}",
     * "Duration":0,"LogType":0,
     * "ClientTime":1459357627444,"Source":"ClientV2Engagement"}
     * ```
     *
     * NavigationAction is moduleName in LogEntry, SPPageQuickLaunchUpdate is log feature name
     * In this example, SPPage is workload name which is set in Telemetry settings.
     * Do NOT add PII data!
     */
    EngagementLogger.logEventWithLogEntry = function (logEntry) {
        var logData = {
            isIntentional: logEntry.isIntentional,
            name: logEntry.moduleName + '.' + logEntry.logFeature,
            extraData: logEntry.logProperties
        };
        EngagementLogger._logEngagementData(logData, true);
    };
    EngagementLogger._logEngagementData = function (engagementData, isLogEntry) {
        if (isLogEntry === void 0) { isLogEntry = false; }
        if (!engagementData.name || engagementData.name.length === 0) {
            throw new Error('LogEntry is invalid');
        }
        EngagementLogger._checkValidTagName(engagementData, isLogEntry);
        EngagementLogger._addContextData(engagementData);
        EngagementLogger._logManager.log(engagementData);
    };
    // tagName should follow AppName.ControlName.ActionName pattern
    EngagementLogger._checkValidTagName = function (engagementData, isLogEntry) {
        if (isLogEntry === void 0) { isLogEntry = false; }
        if (!isLogEntry) {
            var tagNameRegex = /(\w+)\.(\w+).(\w+)/ig;
            if (tagNameRegex.test(engagementData.name) === false) {
                throw new Error(engagementData.name + " tagName does not follow AppName.ControlName.ActionName pattern");
            }
        }
    };
    EngagementLogger._addContextData = function (data) {
        if (_DiagnosticsSettingsManager__WEBPACK_IMPORTED_MODULE_1__["default"].isInitialized) {
            var _a = _DiagnosticsSettingsManager__WEBPACK_IMPORTED_MODULE_1__["default"].settings, listId = _a.listId, listItemUniqueId = _a.listItemUniqueId, siteId = _a.siteId, webId = _a.webId;
            data.siteId = siteId;
            data.webId = webId;
            if (listId) {
                data.listId = listId;
                if (listItemUniqueId) {
                    data.docId = listItemUniqueId;
                }
            }
        }
    };
    EngagementLogger._logManager = new _LogManager_LogManager__WEBPACK_IMPORTED_MODULE_0__["default"]();
    return EngagementLogger;
}());
/* harmony default export */ __webpack_exports__["default"] = (EngagementLogger);


/***/ }),

/***/ "Pk8u":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Pk8u__;

/***/ }),

/***/ "QHY3":
/*!*******************************!*\
  !*** ./lib/Api/LogFeature.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @file LogFeature.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 * Used for logging so you can filter logs by features.
 */
/**
 * @internal
 */
var LogFeature = /** @class */ (function () {
    function LogFeature() {
    }
    /* tslint:disable:variable-name */
    LogFeature.None = 'None';
    return LogFeature;
}());
/* harmony default export */ __webpack_exports__["default"] = (LogFeature);


/***/ }),

/***/ "SiB3":
/*!**********************************************!*\
  !*** ./lib/Api/Trace/DefaultTraceHandler.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @copyright Microsoft Corporation.All rights reserved.
 * @file DefaultTraceHandler.ts
 */
/**
 * Default implementation for the Trace logger class.
 */
var DefaultTraceHandler = /** @class */ (function () {
    function DefaultTraceHandler() {
    }
    /**
     * Default implementation for log function.
     */
    DefaultTraceHandler.prototype.log = function (traceLogEvent) {
        if (true) {
            console.log("Error: " + traceLogEvent.data + ", " +
                ("Event Name: " + traceLogEvent.eventName + ", ") +
                ("Result Code: " + traceLogEvent.resultCode));
        }
    };
    /**
     * Default implementation for verbose function.
     */
    DefaultTraceHandler.prototype.verbose = function (verboseTraceEvent) {
        if (true) {
            console.log("Error: " + verboseTraceEvent.data + ", Event Name: " + verboseTraceEvent.eventName);
        }
    };
    return DefaultTraceHandler;
}());
/* harmony default export */ __webpack_exports__["default"] = (DefaultTraceHandler);


/***/ }),

/***/ "ULMK":
/*!*******************************************!*\
  !*** ./lib/DiagnosticsSettingsManager.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */


/**
 * TelemetrySettingsManager stores the configuration for Telemetry passed
 * down by the calling application during bootstrapping.
 *
 * @internal
 */
var DiagnosticsSettingsManager = /** @class */ (function () {
    function DiagnosticsSettingsManager() {
    }
    DiagnosticsSettingsManager.initialize = function (settings) {
        this.settings = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"])(settings);
        this._initialized = true;
        this._normalizeContextIds();
    };
    DiagnosticsSettingsManager.updateSettings = function (settings) {
        this.settings = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__["merge"])(this.settings, settings);
        this._normalizeContextIds();
    };
    Object.defineProperty(DiagnosticsSettingsManager, "isInitialized", {
        get: function () {
            return this._initialized;
        },
        enumerable: true,
        configurable: true
    });
    DiagnosticsSettingsManager._normalizeId = function (id) {
        var guid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(id);
        return guid ? guid.toString() : id;
    };
    DiagnosticsSettingsManager._normalizeContextIds = function () {
        this.settings.siteId = this._normalizeId(this.settings.siteId);
        this.settings.webId = this._normalizeId(this.settings.webId);
        this.settings.correlationId = this._normalizeId(this.settings.correlationId);
        if (this.settings.listId) {
            this.settings.listId = this._normalizeId(this.settings.listId);
            if (this.settings.listItemUniqueId) {
                this.settings.listItemUniqueId = this._normalizeId(this.settings.listItemUniqueId);
            }
        }
    };
    DiagnosticsSettingsManager._initialized = false;
    return DiagnosticsSettingsManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (DiagnosticsSettingsManager);


/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "YjAB":
/*!****************************!*\
  !*** ./lib/Diagnostics.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DiagnosticsSettingsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DiagnosticsSettingsManager */ "ULMK");
/* harmony import */ var _Api_Trace_TraceLogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Api/Trace/TraceLogger */ "H9JW");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */



/**
 * Diagnostics class initializes the diagnostics pipeline and connect to backend server.
 * Diagnostics contains a set of internal APIs that collects data and reports data via
 * the pipeline. The APIs consist of
 *  -- TraceLogger - for logging diagnostic information
 *
 * @internal
 */
var Diagnostics = /** @class */ (function () {
    function Diagnostics() {
    }
    /**
     * Initializes the diagnostics pipelines
     */
    Diagnostics.initialize = function (settings) {
        if (!Diagnostics._isInitialized) {
            _DiagnosticsSettingsManager__WEBPACK_IMPORTED_MODULE_1__["default"].initialize(settings);
            _Api_Trace_TraceLogger__WEBPACK_IMPORTED_MODULE_2__["default"].shouldWriteToConsole = settings.enableConsoleLog;
            _Api_Trace_TraceLogger__WEBPACK_IMPORTED_MODULE_2__["default"]._addHandler({
                log: function (traceEvent) {
                    _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Log"].info(traceEvent.eventName, "EventName:" + traceEvent.data.toString() + ", ResultCode: " + traceEvent.resultCode);
                },
                verbose: function (traceEvent) {
                    _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Log"].verbose(traceEvent.eventName, traceEvent.data.toString());
                }
            });
            Diagnostics._isInitialized = true;
        }
    };
    Object.defineProperty(Diagnostics, "isInitialized", {
        /**
         * Returns true if diagnostics has been already initialized.
         */
        get: function () {
            return this._isInitialized;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Used to refresh the telemetry settings when they change from the application
     * (i.e. when an in-place navigation to a different site happens)
     * @param settings - the subset of the telemetry settings to be updated
     */
    Diagnostics.updateSettings = function (settings) {
        _DiagnosticsSettingsManager__WEBPACK_IMPORTED_MODULE_1__["default"].updateSettings(settings);
    };
    Diagnostics._isInitialized = false;
    return Diagnostics;
}());
/* harmony default export */ __webpack_exports__["default"] = (Diagnostics);


/***/ }),

/***/ "cUGs":
/*!**********************************!*\
  !*** ./lib/Api/Qos/QosLogger.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExecutionQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExecutionQueue */ "AhqE");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */

/**
 * QosLogger allows multiple QosMonitors to be deferred processed.
 * @internal
 */
var QosLogger = /** @class */ (function () {
    function QosLogger() {
        this._qosEvents = new Map();
        this._deferExecutor = new _ExecutionQueue__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this._shouldProcessInRealTime = false;
        this.initializeLogger();
    }
    Object.defineProperty(QosLogger, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new QosLogger();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QosLogger.prototype, "shouldProcessInRealTime", {
        get: function () {
            return this._shouldProcessInRealTime;
        },
        set: function (processInRealTime) {
            this._shouldProcessInRealTime = processInRealTime;
            this._deferExecutor.shouldExecuteInRealTime = processInRealTime;
        },
        enumerable: true,
        configurable: true
    });
    QosLogger.prototype.setLogger = function (qosLogger) {
        this._qosLogger = qosLogger;
    };
    QosLogger.prototype.getQosEvent = function (key) {
        return this._qosEvents.get(key);
    };
    QosLogger.prototype.startQosMonitor = function (key, startData) {
        if (!this._qosEvents.has(key)) {
            this._deferExecutor.addExecutionEntry('start', key, startData);
        }
    };
    QosLogger.prototype.writeQosEndResult = function (key, endData) {
        this._deferExecutor.addExecutionEntry('end', key, endData);
    };
    QosLogger.prototype._startMonitor = function (key, event) {
        if (this._qosLogger) {
            this._qosEvents.set(key, new this._qosLogger(event)); /* tslint:disable-line:no-any */
        }
    };
    QosLogger.prototype._endMonitor = function (key, event) {
        if (this._qosEvents.has(key)) {
            this._qosEvents.get(key).end(event); /* tslint:disable-line:no-any */
            this._qosEvents.delete(key);
        }
    };
    /* tslint:disable-next-line:no-any typedef */
    QosLogger.prototype.initializeLogger = function () {
        var _this = this;
        var startHandler = function (key, e) { _this._startMonitor(key, e); }; /* tslint:disable-line:max-line-length typedef */
        var endHandler = function (key, e) { _this._endMonitor(key, e); }; /* tslint:disable-line:max-line-length typedef */
        this._deferExecutor.addHandler('start', startHandler);
        this._deferExecutor.addHandler('end', endHandler);
    };
    return QosLogger;
}());
/* harmony default export */ __webpack_exports__["default"] = (QosLogger);


/***/ }),

/***/ "cyTu":
/*!******************************************!*\
  !*** ./lib/Api/LogManager/LogManager.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CircularBuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CircularBuffer */ "yF0L");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */

/**
 * LogManager allows multiple handlers to process log events.
 * It caches the latest 5000 log events. If a handler is just added, the
 * handler is able to get access to the cached events and all incoming events.
 * Dev-dashboard and potentially third-party can use it to get access to events.
 * @internal
 */
var LogManager = /** @class */ (function () {
    function LogManager(initialHandler) {
        this._shouldLogInRealTime = [];
        this._handlers = [];
        this._events = new _CircularBuffer__WEBPACK_IMPORTED_MODULE_0__["default"](LogManager._maxVerboseLog);
        if (initialHandler) {
            this.addHandler(initialHandler);
        }
    }
    Object.defineProperty(LogManager, "_maxVerboseLog", {
        get: function () {
            return 5000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogManager.prototype, "events", {
        /**
         * Event list for delayed asynchronous processing.
         * Events are accumulated in CircularBuffer for processing later.
         */
        get: function () {
            return this._events;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Registers an external logger to logger collection for asynchronous event logging.
     * Logger is registered once.
     */
    LogManager.prototype.addHandler = function (handler) {
        if (!this._containsHandler(handler)) {
            this._handlers.push(handler);
            this._shouldLogInRealTime.push(false);
        }
    };
    /**
     * Event logging operation for delayed asynchronous processing.
     */
    LogManager.prototype.log = function (event) {
        Object.freeze(event);
        this._events.push(event);
        this._processLogEvent(event);
    };
    /**
     * Removes an external logger from logger collection for asynchronous event logging.
     * Logger is registered once.
     */
    LogManager.prototype.removeHandler = function (handler) {
        var index = this._handlers.indexOf(handler);
        if (index > -1) {
            this._handlers.splice(index, 1);
            this._shouldLogInRealTime.splice(index, 1);
        }
    };
    /**
     * Reset function clears logger collection for asynchronous event logging.
     * All recorded events are purged.
     */
    LogManager.prototype.reset = function () {
        this._handlers = [];
        this._shouldLogInRealTime = [];
        this._events.removeAll();
    };
    /**
     * Processes all the buffered events using the registered handler.
     */
    LogManager.prototype.processAll = function (handler) {
        if (this._handlers.indexOf(handler) > -1) {
            this._processAllEvents(handler);
        }
    };
    LogManager.prototype._containsHandler = function (handler) {
        for (var _i = 0, _a = this._handlers; _i < _a.length; _i++) {
            var existingHandler = _a[_i];
            if (existingHandler === handler) {
                return true;
            }
        }
        return false;
    };
    LogManager.prototype._processAllEvents = function (handler) {
        this._events.forEach(function (event) {
            if (event) {
                try {
                    handler(event);
                }
                catch (e) {
                    console.error('failed to handle event:' + e.toString());
                }
            }
        });
        this._shouldLogInRealTime[this._handlers.indexOf(handler)] = true;
    };
    LogManager.prototype._processLogEvent = function (event) {
        for (var i = 0; i < this._handlers.length; i++) {
            if (this._shouldLogInRealTime[i] && event) {
                try {
                    this._handlers[i](event);
                }
                catch (e) {
                    console.error('failed to handle event:' + e.toString());
                }
            }
        }
    };
    return LogManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (LogManager);


/***/ }),

/***/ "j5uz":
/*!***********************************!*\
  !*** ./lib/Api/Qos/QosMonitor.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Trace_TraceLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Trace/TraceLogger */ "H9JW");
/* harmony import */ var _QosLogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QosLogger */ "cUGs");
/* harmony import */ var _Engagement_EngagementLogger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Engagement/EngagementLogger */ "O2hE");
/* harmony import */ var _DiagnosticsSettingsManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../DiagnosticsSettingsManager */ "ULMK");
// Copyright (c) Microsoft. All rights reserved.





/**
 * Qos logger
 * This class represents the Qos monitor APIs
 *
 * @preapproved @internal
 */
var QosMonitor = /** @class */ (function () {
    /**
   * Creates a QoS monitor (initializes it and logs the start event)
   * @param scenarioName	- Unique name of the QoS scenario
   * You will see start tag: SPPages.ScenarioName.Start
   * @param copyToEngagement - indicate whether this data should be used as Engagement as well.
   */
    function QosMonitor(scenarioName, copyToEngagement) {
        var _a;
        if (copyToEngagement === void 0) { copyToEngagement = false; }
        this._qosResultTypeValue = (_a = {},
            _a[0 /* Success */] = 'Success',
            _a[1 /* Failure */] = 'Failure',
            _a[2 /* ExpectedFailure */] = 'ExpectedFailure',
            _a);
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(scenarioName, 'scenarioName');
        this._id = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].newGuid().toString();
        if (!this._isDebugSession() ||
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('2f038457-f3a3-40d4-8eb1-c9b4495f2419'), '10/15/2019', 'WEX_SkipNonShipQoSUploadStartEvents')) {
            _QosLogger__WEBPACK_IMPORTED_MODULE_2__["default"].instance.startQosMonitor(this._id, { name: scenarioName });
        }
        this._scenarioName = scenarioName;
        this._hasEnded = false;
        this._copyToEngagement = copyToEngagement;
    }
    QosMonitor.startRealTimeProcessing = function () {
        if (!_QosLogger__WEBPACK_IMPORTED_MODULE_2__["default"].instance.shouldProcessInRealTime) {
            this._shouldProcessInRealTime(true);
        }
    };
    /**
     * Only used in unit tests
     * @internal
     */
    QosMonitor._shouldProcessInRealTime = function (processInRealTime) {
        _QosLogger__WEBPACK_IMPORTED_MODULE_2__["default"].instance.shouldProcessInRealTime = processInRealTime;
    };
    Object.defineProperty(QosMonitor.prototype, "name", {
        get: function () {
            return this._scenarioName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QosMonitor.prototype, "shortEventName", {
        get: function () {
            return 'Qos';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QosMonitor.prototype, "resultCode", {
        get: function () {
            return this._endResultCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QosMonitor.prototype, "resultType", {
        get: function () {
            /* tslint:disable-next-line:no-any */
            return this._endResult;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QosMonitor.prototype, "extraData", {
        get: function () {
            return this._endExtraData;
        },
        set: function (value) {
            this._endExtraData = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QosMonitor.prototype, "hasEnded", {
        get: function () {
            return this._hasEnded;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * QoS monitor ends with success
     * You will see success tag: SPPages.ScenarioName.Success
     */
    QosMonitor.prototype.writeSuccess = function (extraData) {
        this._writeQosEnd(0 /* Success */, undefined, undefined, extraData);
    };
    /**
     * QoS monitor ends with failure
     * You will see failure tag: SPPages.ScenarioName.<failuretag>.Failure.
     * <failuretag> will be filled with param tagName
     */
    QosMonitor.prototype.writeUnexpectedFailure = function (tagNameSuffix, ex, extraData) {
        if (tagNameSuffix === void 0) { tagNameSuffix = 'DefaultUnexpected'; }
        this._writeQosEnd(1 /* Failure */, tagNameSuffix, ex, extraData);
    };
    /*
     * QoS monitor ends with expected failure
     * You will see success tag: ModernPublish.RenderPublishPage.<failuretag>.ExpectedFailure.
     * <failuretag> will be filled with param tagName
     */
    QosMonitor.prototype.writeExpectedFailure = function (tagNameSuffix, ex, extraData) {
        if (tagNameSuffix === void 0) { tagNameSuffix = 'DefaultExpected'; }
        this._writeQosEnd(2 /* ExpectedFailure */, tagNameSuffix, ex, extraData);
    };
    QosMonitor.prototype._writeQosEnd = function (resultType, tagNameSuffix, ex, extraData) {
        if (!this._shouldSkip(resultType)) {
            var enableExtraDataSetter = !_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(QosMonitor._isExtraDataSetterEnabledKSId, '9/11/2019', 'WPLoadExtraData');
            /* tslint:disable-next-line:no-any */
            var existingExtraData = enableExtraDataSetter ? this.extraData : undefined;
            if (_DiagnosticsSettingsManager__WEBPACK_IMPORTED_MODULE_4__["default"].isInitialized &&
                resultType !== 0 /* Success */) {
                var correlationId = _DiagnosticsSettingsManager__WEBPACK_IMPORTED_MODULE_4__["default"].settings.correlationId;
                if (!extraData) {
                    extraData = existingExtraData || {};
                }
                // Reuse the existing CorrelationId column for extraData
                extraData.CorrelationId = extraData.correlationId ||
                    extraData.CorrelationId ||
                    correlationId;
            }
            this._endResultCode = tagNameSuffix;
            this._endExtraData = extraData || existingExtraData;
            this._endResult = resultType;
            var endData = {
                resultCode: this._endResultCode,
                resultType: this._endResult,
                error: ex ? ex.message : undefined,
                extraData: this._endExtraData
            };
            _QosLogger__WEBPACK_IMPORTED_MODULE_2__["default"].instance.writeQosEndResult(this._id, endData);
            this._writeToEngagement();
        }
    };
    QosMonitor.prototype._isDebugSession = function () {
        return !!sessionStorage.getItem('spfx-debug');
    };
    QosMonitor.prototype._shouldSkip = function (result) {
        if (this._hasEnded && (this._endResult !== undefined)) {
            var message = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(QosMonitor.qosMonitorHasEndedErrorString, this.name, this._qosResultTypeValue[this._endResult], this._qosResultTypeValue[result]);
            if (this._endResult !== result) {
                _Trace_TraceLogger__WEBPACK_IMPORTED_MODULE_1__["default"].logError(QosMonitor.logSource, new Error(message));
            }
            if (true) {
                _Trace_TraceLogger__WEBPACK_IMPORTED_MODULE_1__["default"].logVerbose(QosMonitor.logSource, message, 'skipEnd');
            }
            return true;
        }
        else {
            this._hasEnded = true;
            return this._isDebugSession();
        }
    };
    QosMonitor.prototype._writeToEngagement = function () {
        if (this._shouldWriteToEngagement()) {
            // Engagement name requires certain format. Cannot just use QOS name.
            // Record Qos name in extra data 'qosName'
            var engagementData = {
                name: 'Spfx.Qos.ToEngagement',
                extraData: this.extraData || {}
            };
            // tslint:disable-next-line:no-string-literal
            engagementData.extraData['qosName'] = this.name;
            if (this.resultType) {
                // tslint:disable-next-line:no-string-literal
                engagementData.extraData['qosResultType'] = this._qosResultTypeValue[this.resultType];
            }
            if (this.resultCode) {
                // tslint:disable-next-line:no-string-literal
                engagementData.extraData['qosResultCode'] = this.resultCode;
            }
            _Engagement_EngagementLogger__WEBPACK_IMPORTED_MODULE_3__["default"].log(engagementData);
        }
    };
    QosMonitor.prototype._shouldWriteToEngagement = function () {
        var shouldWriteEngagement = this._copyToEngagement;
        return shouldWriteEngagement;
    };
    QosMonitor.logSource = {
        id: 'QosMonitor'
    };
    QosMonitor.qosMonitorHasEndedErrorString = 'QoS monitor \'{0}\' has ended with \'{1}\' already. Ignoring \'{2}\' tag.';
    QosMonitor._isExtraDataSetterEnabledKSId = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('6d18e32c-abd5-40c1-8ce1-3fb551418901');
    return QosMonitor;
}());
/* harmony default export */ __webpack_exports__["default"] = (QosMonitor);


/***/ }),

/***/ "lxJ4":
/*!******************************!*\
  !*** ./lib/Api/LogSource.js ***!
  \******************************/
/*! exports provided: default, logSourceServiceKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logSourceServiceKey", function() { return logSourceServiceKey; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Microsoft. All rights reserved.

/**
 * Represents a Log entry
 *
 * @internal
 */
var LogSource = /** @class */ (function () {
    function LogSource(id) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(id, 'id');
        this._id = id;
    }
    /**
     * Factory method to create an instance of the LogSource class
     * @returns a reference to an instance of the LogSource class
     */
    LogSource.create = function (id) {
        return new LogSource(id);
    };
    Object.defineProperty(LogSource.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @returns if the LogSource is empty.
     */
    LogSource.prototype.isEmpty = function () {
        return this._id.length === 0;
    };
    return LogSource;
}());
/* harmony default export */ __webpack_exports__["default"] = (LogSource);
/** @public */
var logSourceServiceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["ServiceKey"].createCustom('sp-client-base:LogSource', function (serviceScope) {
    return LogSource.create('');
});


/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: _TraceLogger, _LogEntry, _LogFeature, _LogSource, _logSourceServiceKey, _LogType, _Diagnostics, _LogEvent, _LogLevel, _CircularBuffer, _LogManager, _EngagementLogger, _LogHandler, _QosMonitor, _QosLogger, _ExecutionQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Api_Trace_TraceLogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Api/Trace/TraceLogger */ "H9JW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_TraceLogger", function() { return _Api_Trace_TraceLogger__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Api_LogEntry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Api/LogEntry */ "7rFx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_LogEntry", function() { return _Api_LogEntry__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Api_LogFeature__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Api/LogFeature */ "QHY3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_LogFeature", function() { return _Api_LogFeature__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Api_LogSource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Api/LogSource */ "lxJ4");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_LogSource", function() { return _Api_LogSource__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_logSourceServiceKey", function() { return _Api_LogSource__WEBPACK_IMPORTED_MODULE_3__["logSourceServiceKey"]; });

/* harmony import */ var _Api_LogType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Api/LogType */ "FSio");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_LogType", function() { return _Api_LogType__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _Diagnostics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Diagnostics */ "YjAB");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_Diagnostics", function() { return _Diagnostics__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _Api_Trace_LogEvent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Api/Trace/LogEvent */ "pPvZ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_LogEvent", function() { return _Api_Trace_LogEvent__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _Api_LogLevel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Api/LogLevel */ "rG76");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_LogLevel", function() { return _Api_LogLevel__WEBPACK_IMPORTED_MODULE_7__["LogLevel"]; });

/* harmony import */ var _Api_LogManager_CircularBuffer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Api/LogManager/CircularBuffer */ "yF0L");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_CircularBuffer", function() { return _Api_LogManager_CircularBuffer__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _Api_LogManager_LogManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Api/LogManager/LogManager */ "cyTu");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_LogManager", function() { return _Api_LogManager_LogManager__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _Api_Engagement_EngagementLogger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Api/Engagement/EngagementLogger */ "O2hE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_EngagementLogger", function() { return _Api_Engagement_EngagementLogger__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _Api_Log_LogHandler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Api/Log/LogHandler */ "qiD/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_LogHandler", function() { return _Api_Log_LogHandler__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _Api_Qos_QosMonitor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Api/Qos/QosMonitor */ "j5uz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_QosMonitor", function() { return _Api_Qos_QosMonitor__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _Api_Qos_QosLogger__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Api/Qos/QosLogger */ "cUGs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_QosLogger", function() { return _Api_Qos_QosLogger__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _Api_ExecutionQueue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Api/ExecutionQueue */ "AhqE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_ExecutionQueue", function() { return _Api_ExecutionQueue__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/**
 * This package defines the internal diagnostics tools for the SharePoint Framework,
 * including monitoring, trace, user engagement and performance logging.
 *
 * @packagedocumentation
 */

















/***/ }),

/***/ "pPvZ":
/*!***********************************!*\
  !*** ./lib/Api/Trace/LogEvent.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LogSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../LogSource */ "lxJ4");
/* harmony import */ var _LogManager_LogManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../LogManager/LogManager */ "cyTu");


/**
 * An object that represents one log event.
 * @internal
 */
var LogEvent = /** @class */ (function () {
    /**
     * Do not call this constructor directly. Use LogEvent.log instead.
     */
    function LogEvent(source, data, level, serviceScope) {
        this._validate(source, data);
        this._timestamp = new Date().getTime();
        this._scope = this._getScope(serviceScope);
        this._source = source.substr(0, this._maxSourceLength);
        this._setData(data);
        this._level = level;
        this._prefix = this._getPrefix();
    }
    /**
     * Use this method to log an event.
     *
     * @param source - source of the log event, e.g. class name of the source file
     * @param data - data of the log event
     * @param level - level of the log event
     * @param serviceScope - scope of the log event, e.g. component/web part
     */
    LogEvent.log = function (source, data, level, serviceScope) {
        var event = new LogEvent(source, data, level, serviceScope);
        LogEvent.logManager.log(event);
        return event;
    };
    LogEvent.prototype.toString = function () {
        var timedPrefix = "[" + this._timestamp + "][" + this._prefix + "]";
        if (this._message) {
            return timedPrefix + " " + this._message;
        }
        else if (this._error) {
            return timedPrefix + " " + this._error.toString();
        }
        else {
            return timedPrefix;
        }
    };
    Object.defineProperty(LogEvent.prototype, "timestamp", {
        get: function () {
            return this._timestamp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogEvent.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogEvent.prototype, "prefix", {
        get: function () {
            return this._prefix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogEvent.prototype, "scope", {
        get: function () {
            return this._scope;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogEvent.prototype, "source", {
        get: function () {
            return this._source;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogEvent.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogEvent.prototype, "error", {
        get: function () {
            return this._error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogEvent.prototype, "_maxSourceLength", {
        get: function () {
            return 30;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogEvent.prototype, "_maxMessageLength", {
        get: function () {
            return 150;
        },
        enumerable: true,
        configurable: true
    });
    LogEvent.prototype._validate = function (source, data) {
        if (!source) {
            throw new Error('source cannot be undefined or null for Logger');
        }
        if (!data) {
            throw new Error('data cannot be undefined or null');
        }
    };
    LogEvent.prototype._setData = function (data) {
        if (typeof data === 'string') {
            this._message = data.substr(0, this._maxMessageLength);
        }
        else if (data instanceof Error) {
            this._error = data;
        }
    };
    LogEvent.prototype._getPrefix = function () {
        var prefix = "" + this._source;
        if (this._scope && !this._scope.isEmpty()) {
            prefix = this._scope.id.substr(0, this._maxSourceLength) + "." + prefix;
        }
        return "" + prefix;
    };
    LogEvent.prototype._getScope = function (serviceScope) {
        var parentSource;
        if (serviceScope) {
            serviceScope.whenFinished(function () {
                parentSource = serviceScope.consume(_LogSource__WEBPACK_IMPORTED_MODULE_0__["logSourceServiceKey"]);
            });
        }
        return parentSource;
    };
    /**
     * Allows process log events.
     */
    LogEvent.logManager = new _LogManager_LogManager__WEBPACK_IMPORTED_MODULE_1__["default"]();
    return LogEvent;
}());
/* harmony default export */ __webpack_exports__["default"] = (LogEvent);


/***/ }),

/***/ "qiD/":
/*!***********************************!*\
  !*** ./lib/Api/Log/LogHandler.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LogLevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../LogLevel */ "rG76");
/* harmony import */ var _Trace_LogEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Trace/LogEvent */ "pPvZ");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */


/**
 * This handler adapts the sp-core-library Log to use the internal telemetry.
 * @internal
 */
var LogHandler = /** @class */ (function () {
    function LogHandler() {
    }
    LogHandler.prototype.verbose = function (source, message, scope) {
        var event = _Trace_LogEvent__WEBPACK_IMPORTED_MODULE_1__["default"].log(source, message, _LogLevel__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Verbose, scope);
        if (true) {
            console.log(event.toString()); // tslint:disable-line:no-console
        }
    };
    LogHandler.prototype.info = function (source, message, scope) {
        var event = _Trace_LogEvent__WEBPACK_IMPORTED_MODULE_1__["default"].log(source, message, _LogLevel__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Info, scope);
        if (true) {
            console.info(event.toString()); // tslint:disable-line:no-console
        }
    };
    LogHandler.prototype.warn = function (source, message, scope) {
        var event = _Trace_LogEvent__WEBPACK_IMPORTED_MODULE_1__["default"].log(source, message, _LogLevel__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Warning, scope);
        if (true) {
            console.warn(event.toString()); // tslint:disable-line:no-console
        }
    };
    LogHandler.prototype.error = function (source, error, scope) {
        var event = _Trace_LogEvent__WEBPACK_IMPORTED_MODULE_1__["default"].log(source, error, _LogLevel__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Error, scope);
        if (true) {
            console.error(event.toString()); // tslint:disable-line:no-console
        }
    };
    return LogHandler;
}());
/* harmony default export */ __webpack_exports__["default"] = (LogHandler);


/***/ }),

/***/ "rG76":
/*!*****************************!*\
  !*** ./lib/Api/LogLevel.js ***!
  \*****************************/
/*! exports provided: LogLevel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return LogLevel; });
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */
/**
 * LogLevel represents the level of a log event.
 * @internal
 */
var LogLevel;
(function (LogLevel) {
    /**
     * verbose event for debugging
     */
    LogLevel[LogLevel["Verbose"] = 1] = "Verbose";
    /**
     * Informational event
     */
    LogLevel[LogLevel["Info"] = 2] = "Info";
    /**
     * A warning
     */
    LogLevel[LogLevel["Warning"] = 3] = "Warning";
    /**
     * An error
     */
    LogLevel[LogLevel["Error"] = 4] = "Error";
})(LogLevel || (LogLevel = {}));


/***/ }),

/***/ "yF0L":
/*!**********************************************!*\
  !*** ./lib/Api/LogManager/CircularBuffer.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */
/**
 * @internal
 */
var CircularBuffer = /** @class */ (function () {
    function CircularBuffer(size) {
        /**
         * Index of the newest item in the buffer
         */
        this._head = -1;
        /**
         * The overall count of how many items have ever been added to the buffer.
         */
        this._count = 0;
        this._isIterating = false;
        if (size <= 0) {
            throw new Error('Size must be positive');
        }
        this._size = size;
        this._buffer = new Array(size);
    }
    Object.defineProperty(CircularBuffer.prototype, "count", {
        get: function () {
            return this._count;
        },
        enumerable: true,
        configurable: true
    });
    CircularBuffer.prototype.push = function (item) {
        this._ensureNotIterating();
        this._head++;
        this._count++;
        if (this._head === this._size) {
            this._head = 0;
        }
        this._buffer[this._head] = item;
    };
    CircularBuffer.prototype.forEach = function (handle) {
        if (this._count === 0) {
            return;
        }
        this._isIterating = true;
        try {
            var current = this._tail;
            // For-loop is prefered over while loop here to avoid possible infinite loop.
            for (var i = 0; i < this._size; i++) {
                handle(this._buffer[current]);
                if (current === this._head) {
                    // The newest item has been processed. End the loop.
                    break;
                }
                current = this._getNext(current);
            }
        }
        finally {
            this._isIterating = false;
        }
    };
    CircularBuffer.prototype.removeAll = function () {
        this._ensureNotIterating();
        this._head = -1;
        this._count = 0;
    };
    Object.defineProperty(CircularBuffer.prototype, "_tail", {
        /**
         * Index of the oldest item in the buffer
         */
        get: function () {
            if (this._isNotWrapped()) {
                return 0;
            }
            return this._getNext(this._head);
        },
        enumerable: true,
        configurable: true
    });
    CircularBuffer.prototype._isNotWrapped = function () {
        return this._count === (this._head + 1);
    };
    /**
     * The next index should be index + 1, unless it reaches
     * the end of the buffer and needs to rewind to 0.
     */
    CircularBuffer.prototype._getNext = function (index) {
        var nextIndex = index + 1;
        if (nextIndex === this._size) {
            nextIndex = 0;
        }
        return nextIndex;
    };
    CircularBuffer.prototype._ensureNotIterating = function () {
        if (this._isIterating) {
            throw new Error('Circular buffer cannot be modified during iteration');
        }
    };
    return CircularBuffer;
}());
/* harmony default export */ __webpack_exports__["default"] = (CircularBuffer);


/***/ })

/******/ })});;
//# sourceMappingURL=sp-diagnostics.js.map