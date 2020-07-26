define("e40f8203-b39d-425a-a957-714852e33b79_1.11.0", ["@microsoft/sp-core-library","@microsoft/sp-diagnostics","@microsoft/sp-lodash-subset"], function(__WEBPACK_EXTERNAL_MODULE__microsoft_sp_core_library__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_diagnostics__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_lodash_subset__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./sp-dynamic-data.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../lib/resx-strings/en-us.js":
/*!************************************!*\
  !*** ../lib/resx-strings/en-us.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
  var strings = {
    "_/GZrHjuQO4erDQbBRI2XSA": {
      "dynamicDataManagerSourceAlreadyExists": "***A source with id \"{0}\" already exists.",
      "dynamicDataManagerSourceDoesntExist": "***No source with id \"{0}\" found.",
      "pageContextDataSourceTitle": "Page environment",
      "pageContextDataSourceDescription": "***This includes some metadata about the page"
    }
  };

  strings.default = strings;
  return strings;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sp-dynamic-data.js":
/*!****************************!*\
  !*** ./sp-dynamic-data.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! @microsoft/sp-lodash-subset */ "@microsoft/sp-lodash-subset"),__webpack_require__(/*! @microsoft/sp-core-library */ "@microsoft/sp-core-library"),__webpack_require__(/*! @microsoft/sp-diagnostics */ "@microsoft/sp-diagnostics"),__webpack_require__(/*! resx-strings */ "../lib/resx-strings/en-us.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(__WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_vpy3__) { return /******/ (function(modules) { // webpackBootstrap
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

/***/ "+8N5":
/*!********************************************************!*\
  !*** ./lib/isolated/IsolatedProxyPageContextSource.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _IsolatedProxyDynamicDataSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IsolatedProxyDynamicDataSource */ "e69M");


/**
 * Proxy for the page context source, as all the apis on the source are async in the isolated app.
 */
var IsolatedProxyPageContextSource = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](IsolatedProxyPageContextSource, _super);
    function IsolatedProxyPageContextSource(source) {
        var _this = _super.call(this, source) || this;
        _this._source = source;
        return _this;
    }
    /**
     * {@inheritdoc IsolatedProxyDynamicDataSource.getPropertyDefinitions}
     */
    IsolatedProxyPageContextSource.prototype.getPropertyDefinitionsAsync = function () {
        return Promise.resolve(this._source.getPropertyDefinitions());
    };
    /**
     * {@inheritdoc IsolatedProxyDynamicDataSource.getPropertyValue}
     */
    IsolatedProxyPageContextSource.prototype.getPropertyValueAsync = function (propertyId) {
        return Promise.resolve(this._source.getPropertyValue(propertyId));
    };
    /**
     * {@inheritdoc IsolatedProxyDynamicDataSource.getAnnotatedPropertyValue}
     */
    IsolatedProxyPageContextSource.prototype.getAnnotatedPropertyValueAsync = function (propertyId) {
        return Promise.resolve(this._source.getAnnotatedPropertyValue(propertyId));
    };
    /**
     * {@inheritdoc IsolatedProxyDynamicDataSource.allowedEventsAsync}
     */
    IsolatedProxyPageContextSource.prototype.allowedEventsAsync = function () {
        return this._source.allowedEventsAsync();
    };
    return IsolatedProxyPageContextSource;
}(_IsolatedProxyDynamicDataSource__WEBPACK_IMPORTED_MODULE_1__["IsolatedProxyDynamicDataSource"]));
/* harmony default export */ __webpack_exports__["default"] = (IsolatedProxyPageContextSource);


/***/ }),

/***/ "7Mqo":
/*!****************************************************!*\
  !*** ./lib/isolated/IsolatedDynamicDataManager.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IsolatedDynamicDataMessageType */ "IkEF");
/* harmony import */ var _IsolatedDynamicDataTransceiver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IsolatedDynamicDataTransceiver */ "jNSU");
/* harmony import */ var _IsolatedProxyDynamicDataSource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IsolatedProxyDynamicDataSource */ "e69M");
/* harmony import */ var _common_DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/DynamicDataEventConstants */ "8uTw");
/* harmony import */ var _common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/DynamicDataEventNames */ "BDIN");
/* harmony import */ var _PageContextDataSource__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../PageContextDataSource */ "uyAI");
/* harmony import */ var _IsolatedProxyPageContextSource__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./IsolatedProxyPageContextSource */ "+8N5");









/**
 * Manager for Dynamic Data in the Isolated scenario.
 * This holds a reference to the Dynamic Data Source and passes the data to the parent window's
 * DynamicDataManager through ParentIframeCommunicator.
 *
 * @remarks
 * Data sources can notify for changes within the data source or for a specific property.
 * Data consumers can register to both changes in a Dynamic Data source and a specific property within the source.
 * There are 3 events to handle this variety of situations:
 *
 * Notifying a change for a property triggers events for the specific propery and for "any" property
 * Notifying a change for the whole source triggers events for for "any" property and "all" properties.
 *
 * Registering for changes in a property register to events for the specific property and "all" properties.
 * Registering for changes in the whole source register to events for "any" properties.
 *
 * This ensures that regardless of how sources and consumers are configured, events will trigger once and only once for
 * each update within the data source.
 *
 * @internal
 */
var IsolatedDynamicDataManager = /** @class */ (function () {
    function IsolatedDynamicDataManager(serviceScope) {
        /**
         * Added the below 3 dummy public properties to make this class extend ISPEventObserver.
         */
        this.instanceId = 'IsolatedDynamicDataManager-instanceId';
        /**
         * Component id for the IsolatedDynamicDataManager.
         */
        this.componentId = 'IsolatedDynamicDataManager-componentId';
        /**
         * Indicates whether the component is disposed or not.
         */
        this.isDisposed = false;
        this._sourcesChangedEvent = new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["SPEvent"](_common_DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_4__["SOURCES_CHANGED_EVENT_NAME"]);
        this._existingSources = new Map();
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.registerEvent(_common_DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_4__["SOURCES_RECEIVED"], this, this._onAllSourcesReceived.bind(this));
    }
    Object.defineProperty(IsolatedDynamicDataManager.prototype, "sourcesChangedEvent", {
        /**
         * Event that gets raised when the list of Dynamic Data Sources gets updated.
         * @eventproperty
         */
        get: function () {
            return this._sourcesChangedEvent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Notifies the parent window that the Dynamic Data Source has been updated.
     * @param sourceId - Id of the Dynamic Data Source that is being updated.
     */
    IsolatedDynamicDataManager.prototype.notifySourceChanged = function (sourceId) {
        _IsolatedDynamicDataTransceiver__WEBPACK_IMPORTED_MODULE_2__["IsolatedDynamicDataTransceiver"].sendMessage(_IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_1__["IsolatedDynamicDataMessageType"].NotifySourceChanged, {
            sourceId: sourceId
        });
    };
    /**
     * Notifies the parent window that the property in a Dynamic Data Source has been updated.
     * @param sourceId - Id of the Dynamic Data Source whose property is being updated.
     * @param propertyId - Id of the property that is being updated.
     */
    IsolatedDynamicDataManager.prototype.notifyPropertyChanged = function (sourceId, propertyId) {
        _IsolatedDynamicDataTransceiver__WEBPACK_IMPORTED_MODULE_2__["IsolatedDynamicDataTransceiver"].sendMessage(_IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_1__["IsolatedDynamicDataMessageType"].NotifyPropertyChanged, {
            sourceId: sourceId,
            propertyId: propertyId
        });
    };
    /**
     * Registers a listener on the parent app's DynamicDataManager for updates
     * on a Dynamic Data Source.
     */
    IsolatedDynamicDataManager.prototype.registerSourceChanged = function (sourceId, observer, callback) {
        var eventNames = [
            _common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_5__["DynamicDataEventNames"].getAllPropertiesChangedEventName(sourceId),
            _common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_5__["DynamicDataEventNames"].getAnyPropertyChangedEventName(sourceId)
        ];
        var eventType = _IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_1__["IsolatedDynamicDataMessageType"].RegisterSourceChanged;
        this._registerUnregisterEvents(true, { eventNames: eventNames, observer: observer, callback: callback }, { eventType: eventType, sourceId: sourceId });
    };
    /**
     * Unregisters a listener for updates on a Dynamic Data Source.
     */
    IsolatedDynamicDataManager.prototype.unregisterSourceChanged = function (sourceId, observer, callback) {
        var eventNames = [
            _common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_5__["DynamicDataEventNames"].getAllPropertiesChangedEventName(sourceId),
            _common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_5__["DynamicDataEventNames"].getAnyPropertyChangedEventName(sourceId)
        ];
        var eventType = _IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_1__["IsolatedDynamicDataMessageType"].UnregisterSourceChanged;
        this._registerUnregisterEvents(false, { eventNames: eventNames, observer: observer, callback: callback }, { eventType: eventType, sourceId: sourceId });
    };
    /**
     * Registers a listener for updates on a Dynamic Data Source.
     */
    IsolatedDynamicDataManager.prototype.registerPropertyChanged = function (sourceId, propertyId, observer, callback) {
        var eventNames = [
            _common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_5__["DynamicDataEventNames"].getPropertyChangedEventName(sourceId, propertyId),
            _common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_5__["DynamicDataEventNames"].getAllPropertiesChangedEventName(sourceId)
        ];
        var eventType = _IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_1__["IsolatedDynamicDataMessageType"].RegisterPropertyChanged;
        this._registerUnregisterEvents(true, { eventNames: eventNames, observer: observer, callback: callback }, { eventType: eventType, sourceId: sourceId, propertyId: propertyId });
    };
    /**
     * Registers a listener for updates on a Dynamic Data Source.
     */
    IsolatedDynamicDataManager.prototype.unregisterPropertyChanged = function (sourceId, propertyId, observer, callback) {
        var eventNames = [
            _common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_5__["DynamicDataEventNames"].getPropertyChangedEventName(sourceId, propertyId),
            _common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_5__["DynamicDataEventNames"].getAllPropertiesChangedEventName(sourceId)
        ];
        var eventType = _IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_1__["IsolatedDynamicDataMessageType"].UnregisterPropertyChanged;
        this._registerUnregisterEvents(false, { eventNames: eventNames, observer: observer, callback: callback }, { eventType: eventType, sourceId: sourceId, propertyId: propertyId });
    };
    /**
     * Sends a message to the parent window, requesting for the current existing sources. When the
     * IsolatedDynamicDataManager receives the new list, it updates the existing list of sources and
     * notifies the listeners that the available sources have changed.
     *
     * @returns - A read-only array with all the existing Dynamic Data Sources.
     */
    IsolatedDynamicDataManager.prototype.getSources = function () {
        _IsolatedDynamicDataTransceiver__WEBPACK_IMPORTED_MODULE_2__["IsolatedDynamicDataTransceiver"].sendMessage(_IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_1__["IsolatedDynamicDataMessageType"].AllSources);
        var sources = [];
        this._existingSources.forEach(function (source) { return sources.push(source); });
        return sources;
    };
    /**
     * Returns a Dynamic Data Source based on its id.
     * Returns undefined if the source doesn't exist.
     * @param sourceId - Id of the Dynamic Data Source.
     */
    IsolatedDynamicDataManager.prototype.tryGetSource = function (sourceId) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(sourceId, 'sourceId');
        return this._existingSources.get(sourceId);
    };
    /**
     * Sends the new Isolated Dynamic Data Source to the main page, to be added into main page's
     * DynamicDataManager's list of sources.
     * Local PageContext data source is not sent to the main page, as it would be irrelevant,
     * and hence maintained locally. This is because, when asked for the pageContext source from
     * the isolated page, PageContext from isolated page is returned, NOT the main pages'.
     *
     * @remarks
     * Throws an error if the source can't be added.
     *
     * @param source - Dynamic Data Source to add.
     */
    IsolatedDynamicDataManager.prototype.addSource = function (source) {
        if (source.id === _PageContextDataSource__WEBPACK_IMPORTED_MODULE_6__["default"].pageContextDataSourceId) {
            this._existingSources.set(source.id, new _IsolatedProxyPageContextSource__WEBPACK_IMPORTED_MODULE_7__["default"](source));
            return;
        }
        _IsolatedDynamicDataTransceiver__WEBPACK_IMPORTED_MODULE_2__["IsolatedDynamicDataTransceiver"].sendMessage(_IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_1__["IsolatedDynamicDataMessageType"].AddSource, { source: source });
    };
    /**
     * Removes an existing Dynamic Data Source from the manager.
     * @param id - Id of the Dynamic Data Source.
     */
    IsolatedDynamicDataManager.prototype.removeSource = function (sourceId) {
        _IsolatedDynamicDataTransceiver__WEBPACK_IMPORTED_MODULE_2__["IsolatedDynamicDataTransceiver"].sendMessage(_IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_1__["IsolatedDynamicDataMessageType"].RemoveSource, { sourceId: sourceId });
    };
    /**
     * Added this api to make this class extend ISPEventObserver.
     * @internal
     */
    IsolatedDynamicDataManager.prototype.dispose = function () {
        this.isDisposed = true;
    };
    /**
     * Handler to store all the received sources from the parent window.
     * @param message - Incoming message from the parent window's PostMessage.
     */
    IsolatedDynamicDataManager.prototype._onAllSourcesReceived = function (data) {
        var _this = this;
        data.sources.forEach(function (source) {
            var id = source.id;
            if (!_this._existingSources.has(id)) {
                _this._existingSources.set(id, new _IsolatedProxyDynamicDataSource__WEBPACK_IMPORTED_MODULE_3__["IsolatedProxyDynamicDataSource"](source));
            }
        });
        this._raiseSourcesChangedEvent();
    };
    /**
     * Raises an event when the Dynamic Data Sources gets updated.
     * @remarks
     * The event is sticky because sources can be updated before there is anyone listening. This way all clients
     * will get notified that sources have been updated. Further updates are notified in real-time.
     */
    IsolatedDynamicDataManager.prototype._raiseSourcesChangedEvent = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.raiseStickyEvent(_common_DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_4__["SOURCES_CHANGED_EVENT_NAME"], {});
    };
    IsolatedDynamicDataManager.prototype._registerUnregisterEvents = function (isRegister, eventData, sendMessageData) {
        var eventNames = eventData.eventNames, observer = eventData.observer, callback = eventData.callback;
        var eventType = sendMessageData.eventType, sourceId = sendMessageData.sourceId, propertyId = sendMessageData.propertyId;
        var methodName = isRegister ? 'registerEvent' : 'unregisterEvent';
        eventNames.forEach(function (eventName) { return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance[methodName](eventName, observer, callback); });
        _IsolatedDynamicDataTransceiver__WEBPACK_IMPORTED_MODULE_2__["IsolatedDynamicDataTransceiver"].sendMessage(eventType, { sourceId: sourceId, propertyId: propertyId, observer: observer });
    };
    return IsolatedDynamicDataManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (IsolatedDynamicDataManager);


/***/ }),

/***/ "8uTw":
/*!*************************************************!*\
  !*** ./lib/common/DynamicDataEventConstants.js ***!
  \*************************************************/
/*! exports provided: ANY_PROPERTY_EVENT_PREFIX, PROPERTY_EVENT_PREFIX, ALL_PROPERTIES_EVENT_PREFIX, SOURCES_CHANGED_EVENT_NAME, SOURCES_RECEIVED, EVENT_NAME_SEPARATOR, GET_PROPERTY_VALUE, GET_ANNOTATED_PROPERTY_VALUE, GET_PROPERTY_DEFINITIONS, GET_ALLOWED_EVENTS, DYNAMICDATAMANAGER_EXCEPTION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANY_PROPERTY_EVENT_PREFIX", function() { return ANY_PROPERTY_EVENT_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROPERTY_EVENT_PREFIX", function() { return PROPERTY_EVENT_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_PROPERTIES_EVENT_PREFIX", function() { return ALL_PROPERTIES_EVENT_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SOURCES_CHANGED_EVENT_NAME", function() { return SOURCES_CHANGED_EVENT_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SOURCES_RECEIVED", function() { return SOURCES_RECEIVED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_NAME_SEPARATOR", function() { return EVENT_NAME_SEPARATOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_PROPERTY_VALUE", function() { return GET_PROPERTY_VALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_ANNOTATED_PROPERTY_VALUE", function() { return GET_ANNOTATED_PROPERTY_VALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_PROPERTY_DEFINITIONS", function() { return GET_PROPERTY_DEFINITIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_ALLOWED_EVENTS", function() { return GET_ALLOWED_EVENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DYNAMICDATAMANAGER_EXCEPTION", function() { return DYNAMICDATAMANAGER_EXCEPTION; });
var ANY_PROPERTY_EVENT_PREFIX = 'DynamicData_AnyPropertyChanged';
var PROPERTY_EVENT_PREFIX = 'DynamicData_PropertyChanged';
var ALL_PROPERTIES_EVENT_PREFIX = 'DynamicData_AllPropertiesChanged';
var SOURCES_CHANGED_EVENT_NAME = 'DynamicData_SourcesChanged';
var SOURCES_RECEIVED = 'DynamicData_All_Sources_Received';
var EVENT_NAME_SEPARATOR = '_';
var GET_PROPERTY_VALUE = 'DynamicData_PropertyValue';
var GET_ANNOTATED_PROPERTY_VALUE = 'DynamicData_Annotated_PropertyValue';
var GET_PROPERTY_DEFINITIONS = 'DynamicData_PropertyDefinitions';
var GET_ALLOWED_EVENTS = 'DynamicData_Allowed_Events';
var DYNAMICDATAMANAGER_EXCEPTION = 'DynamicDataManager_Exception';


/***/ }),

/***/ "BDIN":
/*!*********************************************!*\
  !*** ./lib/common/DynamicDataEventNames.js ***!
  \*********************************************/
/*! exports provided: DynamicDataEventNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicDataEventNames", function() { return DynamicDataEventNames; });
/* harmony import */ var _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DynamicDataEventConstants */ "8uTw");

/**
 * Event names for DynamicData related events.
 *
 * @internal
 */
var DynamicDataEventNames = /** @class */ (function () {
    function DynamicDataEventNames() {
    }
    /**
     * Returns the event name used when all properties in a Dynamic Data source have changed.
     * Example: DynamicData_AllPropertiesChanged_WebPart.<componentId>.<instanceId>
     *
     * @param sourceId - Id of the Dynamic Data source.
     */
    DynamicDataEventNames.getAllPropertiesChangedEventName = function (sourceId) {
        return "" + _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["ALL_PROPERTIES_EVENT_PREFIX"] + _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["EVENT_NAME_SEPARATOR"] + sourceId;
    };
    /**
     * Returns the event name used when any property in a Dynamic Data source has changed.
     * Example: DynamicData_AnyPropertyChanged_WebPart.<componentId>.<instanceId>
     *
     * @param sourceId - Id of the Dynamic Data source.
     */
    DynamicDataEventNames.getAnyPropertyChangedEventName = function (sourceId) {
        return "" + _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["ANY_PROPERTY_EVENT_PREFIX"] + _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["EVENT_NAME_SEPARATOR"] + sourceId;
    };
    /**
     * Returns the event name used when a properties in a Dynamic Data source has changed.
     * Example: DynamicData_PropertyChanged_WebPart.<componentId>.<instanceId>_myProperty
     *
     * @param sourceId - Id of the Dynamic Data source.
     * @param propertyId - Id of the property that has changed.
     */
    DynamicDataEventNames.getPropertyChangedEventName = function (sourceId, propertyId) {
        return "" + this.getPropertyChangedEventPrefix(sourceId) + _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["EVENT_NAME_SEPARATOR"] + propertyId;
    };
    /**
     * Returns the event name prefix used when a property in a Dynamic Data source has changed.
     * This should not be used as a final name for an event, but to be used inside _getPropertyChangedEventName.
     * Example: DynamicData_PropertyChanged_WebPart.<componentId>.<instanceId>
     *
     * @param sourceId - Id of the Dynamic Data source.
     */
    DynamicDataEventNames.getPropertyChangedEventPrefix = function (sourceId) {
        return "" + _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_EVENT_PREFIX"] + _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["EVENT_NAME_SEPARATOR"] + sourceId;
    };
    /**
     * Returns the event name used to publish and consume the event for when a specific property
     * has changed its value on a source.
     *
     * @param sourceId - Id of the Dynamic Data source.
     * @param propertyId - Property Id on the source.
     * @param isAnnotated - Indicates whether the event name is for the annotated value.
     */
    DynamicDataEventNames.getPropertyValueEventName = function (sourceId, propertyId, isAnnotated) {
        var scenario = isAnnotated ? _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["GET_ANNOTATED_PROPERTY_VALUE"] : _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["GET_PROPERTY_VALUE"];
        return "" + scenario + _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["EVENT_NAME_SEPARATOR"] + sourceId + _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["EVENT_NAME_SEPARATOR"] + propertyId;
    };
    /**
     * Returns the event name used to publish and consume the event to request and receive the
     * property definitions from a specific Dynamic Data soource, from the parent window.
     *
     * @param sourceId - Id of the Dynamic Data source.
     */
    DynamicDataEventNames.getPropertyDefintionsEventName = function (sourceId) {
        return "" + _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["GET_PROPERTY_DEFINITIONS"] + _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["EVENT_NAME_SEPARATOR"] + sourceId;
    };
    /**
     * Returns the event name used to publish and consume the event to request and receive the
     * allowed events on a specific Dynamic Data soource, from the parent window.
     *
     * @param sourceId - Id of the Dynamic Data source.
     */
    DynamicDataEventNames.getAllowedEventsEventName = function (sourceId) {
        return "" + _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["GET_ALLOWED_EVENTS"] + _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["EVENT_NAME_SEPARATOR"] + sourceId;
    };
    DynamicDataEventNames.getDynamicDataManagerExceptionEventName = function (sourceId) {
        return "" + _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["DYNAMICDATAMANAGER_EXCEPTION"] + _DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_0__["EVENT_NAME_SEPARATOR"] + sourceId;
    };
    return DynamicDataEventNames;
}());



/***/ }),

/***/ "FpZ8":
/*!********************************************!*\
  !*** ./lib/common/DynamicDataUtilities.js ***!
  \********************************************/
/*! exports provided: DynamicDataUtilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicDataUtilities", function() { return DynamicDataUtilities; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DynamicDataManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DynamicDataManager */ "Ro9o");


/**
  * Utilities for the Dynamic Data feature.
  * @internal
  */
var DynamicDataUtilities = /** @class */ (function () {
    function DynamicDataUtilities() {
    }
    /**
     * A unique ServiceKey to identify the IDynamicDataManager as a service in the ServiceScope.
    *
    * @remarks Same ServiceKey is used to provide both DynamicDataManager and IsolatedDynamicDataManager.
    * This is to ensure that the consumers, will not have to selectively consume IDDM type based on the app they're in.
    * Also note that, in the isolated scenario, though we use the same servicekey, where the default instance
    * is DynamicDataManager, we will provide the IsolatedDynamicDataManager instance to the service scope
    * in the isolated app.
     */
    // tslint:disable-next-line: variable-name
    DynamicDataUtilities.IDynamicDataManagerServiceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["ServiceKey"].create('sp-dynamic-data:IDynamicDataManager', _DynamicDataManager__WEBPACK_IMPORTED_MODULE_1__["default"]);
    return DynamicDataUtilities;
}());



/***/ }),

/***/ "IkEF":
/*!********************************************************!*\
  !*** ./lib/isolated/IsolatedDynamicDataMessageType.js ***!
  \********************************************************/
/*! exports provided: IsolatedDynamicDataMessageType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsolatedDynamicDataMessageType", function() { return IsolatedDynamicDataMessageType; });
/**
 * Enum defining the possible event types related to Dynamic Data when
 * the component is hosted in an isolated environment.
 *
 * @internal
 */
var IsolatedDynamicDataMessageType;
(function (IsolatedDynamicDataMessageType) {
    /**
     * Notify that the list of sources changed in the parent page.
     */
    IsolatedDynamicDataMessageType["SourcesChangedEvent"] = "sourcesChangedEvent";
    /**
     * Notify that the source is changed.
     */
    IsolatedDynamicDataMessageType["NotifySourceChanged"] = "notifySourceChanged";
    /**
     * Notify that the property is changed.
     */
    IsolatedDynamicDataMessageType["NotifyPropertyChanged"] = "notifyPropertyChanged";
    /**
     * Register to the source changed event.
     */
    IsolatedDynamicDataMessageType["RegisterSourceChanged"] = "registerSourceChanged";
    /**
     * Unregister to the source changed event.
     */
    IsolatedDynamicDataMessageType["UnregisterSourceChanged"] = "unregisterSourceChanged";
    /**
     * Register to the property changed event.
     */
    IsolatedDynamicDataMessageType["RegisterPropertyChanged"] = "registerPropertyChanged";
    /**
     * Unregister the requested property changed event.
     */
    IsolatedDynamicDataMessageType["UnregisterPropertyChanged"] = "unregisterPropertyChanged";
    /**
     * Get all the available sources.
     */
    IsolatedDynamicDataMessageType["AllSources"] = "getSources";
    /**
     * Try get the requested source.
     */
    IsolatedDynamicDataMessageType["TryGetSource"] = "tryGetSource";
    /**
     * Add the source.
     */
    IsolatedDynamicDataMessageType["AddSource"] = "addSource";
    /**
     * Remove the source.
     */
    IsolatedDynamicDataMessageType["RemoveSource"] = "removeSource";
    /**
     * Return all the property definitions.
     */
    IsolatedDynamicDataMessageType["GetPropertyDefinitions"] = "getPropertyDefinitions";
    /**
     * Return the value of the specified property.
     */
    IsolatedDynamicDataMessageType["GetPropertyValue"] = "getPropertyValue";
    /**
     * Return the annotated value of the specified property.
     */
    IsolatedDynamicDataMessageType["GetAnnotatedPropertyValue"] = "getAnnotatedPropertyValue";
    /**
     * Return the list of allowed events on the source.
     */
    IsolatedDynamicDataMessageType["AllowedEvents"] = "allowedEvents";
    /**
     * Allows to send an event with data to the source, from the consumer.
     */
    IsolatedDynamicDataMessageType["SendEvent"] = "sendEvent";
    /**
     * When DynamicDataManager in the parent window throws an exception on invoking apis
     * then this event type is used to send that error details to the isolated window.
     */
    IsolatedDynamicDataMessageType["DynamicDataManagerException"] = "dynamicDataManagerException";
})(IsolatedDynamicDataMessageType || (IsolatedDynamicDataMessageType = {}));


/***/ }),

/***/ "Pk8u":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Pk8u__;

/***/ }),

/***/ "Ro9o":
/*!***********************************!*\
  !*** ./lib/DynamicDataManager.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loc/Strings.resx */ "qITA");
/* harmony import */ var _common_DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/DynamicDataEventConstants */ "8uTw");
/* harmony import */ var _common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/DynamicDataEventNames */ "BDIN");





var QOS_MONITOR_PREFIX = 'DynamicData.DynamicDataManager';
var LOG_SOURCE = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('DynamicDataManager');
/**
 * Manager for Dynamic Data.
 * This holds a reference to all Dynamic Data Sources and uses the SPEventManager internally to handle
 * notifications for source updates.
 *
 * @remarks
 * Data sources can notify for changes within the data source or for a specific property.
 * Data consumers can register to both changes in a Dynamic Data source and a specific property within the source.
 * There are 3 events to handle this variety of situations:
 *
 * Notifying a change for a property triggers events for the specific propery and for "any" property
 * Notifying a change for the whole source triggers events for "any" property and "all" properties.
 *
 * Registering for changes in a property register to events for the specific property and "all" properties.
 * Registering for changes in the whole source register to events for "any" properties.
 *
 * This ensures that regardless of how sources and consumers are configured, events will trigger once and only once for
 * each update within the data source.
 *
 * @internal
 */
var DynamicDataManager = /** @class */ (function () {
    function DynamicDataManager(serviceScope) {
        this._sources = new Map();
        this._sourcesChangedEvent = new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["SPEvent"](_common_DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_3__["SOURCES_CHANGED_EVENT_NAME"]);
    }
    Object.defineProperty(DynamicDataManager.prototype, "sourcesChangedEvent", {
        /**
         * Event that gets raised when the list of Dynamic Data Sources gets updated.
         * @eventproperty
         */
        get: function () {
            return this._sourcesChangedEvent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Raises an event to all listeners when a Dynamic Data Source has been updated.
     * @param sourceId - Id of the Dynamic Data Source that is being updated.
     */
    DynamicDataManager.prototype.notifySourceChanged = function (sourceId) {
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](QOS_MONITOR_PREFIX + '.notifySourceChanged');
        try {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(sourceId, 'sourceId');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.raiseEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__["DynamicDataEventNames"].getAllPropertiesChangedEventName(sourceId), {});
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.raiseEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__["DynamicDataEventNames"].getAnyPropertyChangedEventName(sourceId), {});
            qosMonitor.writeSuccess();
        }
        catch (e) {
            qosMonitor.writeUnexpectedFailure(e);
            throw e;
        }
    };
    /**
     * Raises an event to all listeners when a property in a Dynamic Data Source has been updated.
     * @param sourceId - Id of the Dynamic Data Source whose property is being updated.
     * @param propertyId - Id of the property that is being updated.
     */
    DynamicDataManager.prototype.notifyPropertyChanged = function (sourceId, propertyId) {
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](QOS_MONITOR_PREFIX + '.notifyPropertyChanged');
        try {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(sourceId, 'sourceId');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(propertyId, 'propertyId');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.raiseEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__["DynamicDataEventNames"].getPropertyChangedEventName(sourceId, propertyId), {});
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.raiseEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__["DynamicDataEventNames"].getAnyPropertyChangedEventName(sourceId), {});
            qosMonitor.writeSuccess();
        }
        catch (e) {
            qosMonitor.writeUnexpectedFailure(e);
            throw e;
        }
    };
    /**
     * Registers a listener for updates on a Dynamic Data Source.
     */
    DynamicDataManager.prototype.registerSourceChanged = function (sourceId, observer, callback) {
        var extraData = this._createQosExtraData(observer.manifest);
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](QOS_MONITOR_PREFIX + '.registerSourceChanged');
        try {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(sourceId, 'sourceId');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(observer, 'observer');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(callback, 'callback');
            if (!this._sources.has(sourceId)) {
                throw new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].dynamicDataManagerSourceDoesntExist, sourceId));
            }
            // Registering to all properties changed event.
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.registerEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__["DynamicDataEventNames"].getAllPropertiesChangedEventName(sourceId), observer, callback);
            // Registering to any property changed event, as it means that the source is changed.
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.registerEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__["DynamicDataEventNames"].getAnyPropertyChangedEventName(sourceId), observer, callback);
            qosMonitor.writeSuccess(extraData);
        }
        catch (e) {
            qosMonitor.writeUnexpectedFailure('UnhandledRegisterSourceChange', e, extraData);
            throw e;
        }
    };
    /**
     * Unregisters a listener for updates on a Dynamic Data Source.
     */
    DynamicDataManager.prototype.unregisterSourceChanged = function (sourceId, observer, callback) {
        var extraData = this._createQosExtraData(observer.manifest);
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](QOS_MONITOR_PREFIX + '.unregisterSourceChanged');
        try {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(sourceId, 'sourceId');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(observer, 'observer');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(callback, 'callback');
            if (!this._sources.has(sourceId)) {
                throw new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].dynamicDataManagerSourceDoesntExist, sourceId));
            }
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.unregisterEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__["DynamicDataEventNames"].getAllPropertiesChangedEventName(sourceId), observer, callback);
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.unregisterEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__["DynamicDataEventNames"].getAnyPropertyChangedEventName(sourceId), observer, callback);
            qosMonitor.writeSuccess(extraData);
        }
        catch (e) {
            qosMonitor.writeUnexpectedFailure('UnhandledUnregisterSourceChange', e, extraData);
            throw e;
        }
    };
    /**
     * Registers a listener for updates on a Dynamic Data Source.
     */
    DynamicDataManager.prototype.registerPropertyChanged = function (sourceId, propertyId, observer, callback) {
        var extraData = this._createQosExtraData(observer.manifest);
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](QOS_MONITOR_PREFIX + '.registerPropertyChanged');
        try {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(sourceId, 'sourceId');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(propertyId, 'propertyId');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(observer, 'observer');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(callback, 'callback');
            if (!this._sources.has(sourceId)) {
                throw new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].dynamicDataManagerSourceDoesntExist, sourceId));
            }
            // Registering to the specific property
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.registerEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__["DynamicDataEventNames"].getPropertyChangedEventName(sourceId, propertyId), observer, callback);
            // Registering to all properties changed event, as the specific property will also be changed.
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.registerEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__["DynamicDataEventNames"].getAllPropertiesChangedEventName(sourceId), observer, callback);
            qosMonitor.writeSuccess(extraData);
        }
        catch (e) {
            qosMonitor.writeUnexpectedFailure('UnhandledRegisterPropertyChange', e, extraData);
            throw e;
        }
    };
    /**
     * Unregisters a listener for updates on a Dynamic Data Source.
     */
    DynamicDataManager.prototype.unregisterPropertyChanged = function (sourceId, propertyId, observer, callback) {
        var extraData = this._createQosExtraData(observer.manifest);
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](QOS_MONITOR_PREFIX + '.unregisterPropertyChanged');
        try {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(sourceId, 'sourceId');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(propertyId, 'propertyId');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(observer, 'observer');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(callback, 'callback');
            if (!this._sources.has(sourceId)) {
                throw new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].dynamicDataManagerSourceDoesntExist, sourceId));
            }
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.unregisterEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__["DynamicDataEventNames"].getPropertyChangedEventName(sourceId, propertyId), observer, callback);
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.unregisterEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__["DynamicDataEventNames"].getAllPropertiesChangedEventName(sourceId), observer, callback);
            qosMonitor.writeSuccess(extraData);
        }
        catch (e) {
            qosMonitor.writeUnexpectedFailure('UnhandledUnregisterPropertyChange', e, extraData);
            throw e;
        }
    };
    /**
     * Returns a read-only array with all the existing Dynamic Data Sources.
     */
    DynamicDataManager.prototype.getSources = function () {
        var sources = [];
        this._sources.forEach(function (source) { return sources.push(source); });
        return sources;
    };
    /**
     * Returns a Dynamic Data Source based on its id.
     * Returns undefined if the source doesn't exist.
     * @param sourceId - Id of the Dynamic Data Source.
     */
    DynamicDataManager.prototype.tryGetSource = function (sourceId) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(sourceId, 'sourceId');
        return this._sources.get(sourceId);
    };
    /**
     * Adds a new Dynamic Data Source to be managed.
     * Throws an error if the source can't be added.
     *
     * @param source - Dynamic Data Source to add.
     */
    DynamicDataManager.prototype.addSource = function (source) {
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](QOS_MONITOR_PREFIX + '.addSource');
        try {
            this._validateSource(source);
            if (this._sources.has(source.id)) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(LOG_SOURCE, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].dynamicDataManagerSourceAlreadyExists, source.id));
            }
            this._sources.set(source.id, source);
            this._raiseSourcesChangedEvent();
            qosMonitor.writeSuccess();
        }
        catch (e) {
            qosMonitor.writeUnexpectedFailure(e);
            throw e;
        }
    };
    /**
     * Removes an existing Dynamic Data Source from the manager.
     * @param id - Id of the Dynamic Data Source.
     */
    DynamicDataManager.prototype.removeSource = function (sourceId) {
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](QOS_MONITOR_PREFIX + '.removeSource');
        try {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(sourceId, 'sourceId');
            if (this._sources.has(sourceId)) {
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.removeEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__["DynamicDataEventNames"].getAllPropertiesChangedEventName(sourceId));
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.removeEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__["DynamicDataEventNames"].getAnyPropertyChangedEventName(sourceId));
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.removeEventsByPrefix(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_4__["DynamicDataEventNames"].getPropertyChangedEventPrefix(sourceId));
                this._sources.delete(sourceId);
                this._raiseSourcesChangedEvent();
            }
            qosMonitor.writeSuccess();
        }
        catch (e) {
            qosMonitor.writeUnexpectedFailure(e);
            throw e;
        }
    };
    /**
     * Creates a new extra data object _IQosExtraData.
    */
    DynamicDataManager.prototype._createQosExtraData = function (manifest) {
        if (!manifest) {
            return undefined;
        }
        var qosExtraData = {
            alias: manifest.alias,
            isInternal: manifest.isInternal,
            manifestId: manifest.id
        };
        return qosExtraData;
    };
    DynamicDataManager.prototype._validateSource = function (source) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(source, 'source');
        if (source.id.indexOf(_common_DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_3__["EVENT_NAME_SEPARATOR"]) > -1) {
            throw new Error("Source id contains invalid characters, like \"" + _common_DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_3__["EVENT_NAME_SEPARATOR"] + "\". Id: \"" + source.id + "\".");
        }
        var regex = /^[a-zA-Z0-9\-_]+$/;
        source.getPropertyDefinitions().forEach(function (def) {
            if (!regex.test(def.id)) {
                throw new Error("Source contains invalid property \"" + def.id + "\".");
            }
        });
    };
    /**
     * Raises an event when the Dynamic Data Sources gets updated.
     * @remarks
     * The event is sticky because sources can be updated before there is anyone listening. This way all clients
     * will get notified that sources have been updated. Further updates are notified in real-time.
     */
    DynamicDataManager.prototype._raiseSourcesChangedEvent = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.raiseStickyEvent(_common_DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_3__["SOURCES_CHANGED_EVENT_NAME"], {});
    };
    return DynamicDataManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (DynamicDataManager);


/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "e69M":
/*!********************************************************!*\
  !*** ./lib/isolated/IsolatedProxyDynamicDataSource.js ***!
  \********************************************************/
/*! exports provided: IsolatedProxyDynamicDataSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsolatedProxyDynamicDataSource", function() { return IsolatedProxyDynamicDataSource; });
/* harmony import */ var _IsolatedDynamicDataTransceiver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IsolatedDynamicDataTransceiver */ "jNSU");
/* harmony import */ var _IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IsolatedDynamicDataMessageType */ "IkEF");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/DynamicDataEventNames */ "BDIN");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__);





var QOS_MONITOR_PREFIX = 'DynamicData.IsolatedProxyDynamicDataSource';
/**
 * A proxy dyanmic data source created in the isolated environment. This class is responsible
 * for adding proxy async apis on the source, which are responsible for making sending PostMessages
 * to the parent window and get the information back.
 *
 * @internal
 */
var IsolatedProxyDynamicDataSource = /** @class */ (function () {
    function IsolatedProxyDynamicDataSource(source) {
        /**
         * Added the below 3 dummy public properties to make this class extend ISPEventObserver.
         * @internal
         */
        this.instanceId = this.id + "-instanceId";
        this.componentId = this.id;
        this.isDisposed = false;
        // Property value variables
        this._propertyValueMap = new Map(); // tslint:disable-line:no-any
        // Annotated property value variables
        // tslint:disable-next-line:no-any
        this._annotatedPropertyValueMap = new Map();
        this._id = source.id;
        this._metadata = source.metadata;
        this._propertyDefinitions = new Array();
    }
    Object.defineProperty(IsolatedProxyDynamicDataSource.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsolatedProxyDynamicDataSource.prototype, "metadata", {
        get: function () {
            return this._metadata;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns all the property definitions for dynamic data asynchronously.
     * This needs to be overriden by the implementation of the component.
     *
     * Note: Currently we throw when someone tries to call the api, while there's an outstanding
     * promise on the api. This shouldn't happen in a regular case. However, if we see this happening
     * regularly, then we should handle these scenarios properly, instead of just throwing.
     *
     * @virtual
     */
    IsolatedProxyDynamicDataSource.prototype.getPropertyDefinitionsAsync = function () {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_QosMonitor"](QOS_MONITOR_PREFIX + '.getPropertyDefinitions');
        if (this._propertyDefinitions) {
            qosMonitor.writeSuccess();
            return Promise.resolve(this._propertyDefinitions);
        }
        if (this._propertyDefinitionsPromiseResolve) {
            var failureTag = "Calling 'getPropertyDefintions' is not allowed\n      while there's an outstanding promise on the api.";
            qosMonitor.writeUnexpectedFailure(failureTag);
            throw new Error(failureTag);
        }
        return new Promise(function (resolve, reject) {
            _IsolatedDynamicDataTransceiver__WEBPACK_IMPORTED_MODULE_0__["IsolatedDynamicDataTransceiver"].sendMessage(_IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_1__["IsolatedDynamicDataMessageType"].GetPropertyDefinitions);
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPEventManager"].instance.registerEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__["DynamicDataEventNames"].getPropertyDefintionsEventName(_this.id), _this, function (data) { return _this.receivePropertyDefinitions(qosMonitor, data); });
            _this._propertyDefinitionsPromiseResolve = resolve;
            _this._propertyDefinitionsPromiseReject = reject;
        });
    };
    /**
     * Api to receive the requested property definitions from the parent window.
     *
     * @param qosMonitor - Qos monitor
     * @param propertyDefintions - List of property definitions.
     */
    IsolatedProxyDynamicDataSource.prototype.receivePropertyDefinitions = function (qosMonitor, data) {
        var _this = this;
        if (!data.errorMessage) {
            this._propertyDefinitions = data.propertyDefintions;
            if (this._propertyDefinitionsPromiseResolve) {
                qosMonitor.writeSuccess();
                this._propertyDefinitionsPromiseResolve(data.propertyDefintions);
            }
        }
        else {
            if (this._propertyDefinitionsPromiseReject) {
                var failureTag = 'Unable to retreive property definitions from the source id:' + this.id;
                qosMonitor.writeUnexpectedFailure(failureTag);
                this._propertyDefinitionsPromiseReject(new Error(failureTag));
            }
        }
        this._propertyDefinitionsPromiseResolve = undefined;
        this._propertyDefinitionsPromiseReject = undefined;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPEventManager"].instance.unregisterEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__["DynamicDataEventNames"].getPropertyDefintionsEventName(this.id), this, function (pd) { return _this.receivePropertyDefinitions(qosMonitor, pd); });
    };
    /**
     * Given a property id, returns the value of the property asynchronously.
     * This needs to be overriden by the implementation of the component.
     *
     * Note: Currently we throw when someone tries to call the api, while there's an outstanding
     * promise on the api. This shouldn't happen in a regular case. However, if we see this happening
     * regularly, then we should handle these scenarios properly, instead of just throwing.
     *
     * @virtual
     */
    IsolatedProxyDynamicDataSource.prototype.getPropertyValueAsync = function (propertyId) {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_QosMonitor"](QOS_MONITOR_PREFIX + '.getAllowedEvents');
        if (this._propertyValueMap.has(propertyId)) {
            qosMonitor.writeSuccess();
            return Promise.resolve(this._propertyValueMap.get(propertyId));
        }
        if (this._propertyValuePromiseResolve) {
            var failureTag = "Calling 'getPropertyValue' is not allowed\n      while there's an outstanding promise on the api.";
            qosMonitor.writeUnexpectedFailure(failureTag);
            throw new Error(failureTag);
        }
        return new Promise(function (// tslint:disable-line:no-any
        resolve, // tslint:disable-line:no-any
        reject) {
            _IsolatedDynamicDataTransceiver__WEBPACK_IMPORTED_MODULE_0__["IsolatedDynamicDataTransceiver"].sendMessage(_IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_1__["IsolatedDynamicDataMessageType"].GetPropertyValue);
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPEventManager"].instance.registerEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__["DynamicDataEventNames"].getPropertyValueEventName(_this.id, propertyId), _this, function (message) { return _this.receivePropertyValue(qosMonitor, message); });
            _this._propertyValuePromiseResolve = resolve;
            _this._propertyValuePromiseReject = reject;
        });
    };
    /**
     * Api to receive the requested value for the property id from the source in the parent window.
     *
     * @param qosMonitor - Qos monitor.
     * @param propertyValue - Property value.
     */
    IsolatedProxyDynamicDataSource.prototype.receivePropertyValue = function (qosMonitor, message) {
        var _this = this;
        var data = message.data;
        if (!data.errorMessage) {
            this._propertyValueMap.set(data.propertyId, data.propertyValue);
            if (this._propertyValuePromiseResolve) {
                qosMonitor.writeSuccess();
                this._propertyValuePromiseResolve(data.propertyValue);
            }
        }
        else {
            if (this._propertyValuePromiseReject) {
                var failureTag = 'Unable to get the property value for the property id: ' + data.propertyId;
                qosMonitor.writeUnexpectedFailure(failureTag);
                this._propertyValuePromiseReject(new Error(failureTag));
            }
        }
        this._propertyValuePromiseResolve = undefined;
        this._propertyValuePromiseReject = undefined;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPEventManager"].instance.unregisterEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__["DynamicDataEventNames"].getPropertyValueEventName(this.id, data.propertyId), this, function (msg) { return _this.receivePropertyValue(qosMonitor, msg); });
    };
    /**
     * Given a property id, returns its annotated value asynchronously.
     * If the source doesn't supply the annotated value, then it falls back to whatever
     * 'getPropertyValue' as the sample value and metadata would be undefined.
     *
     * @param propertyId - One of the property ids exposed from the dynamic data source.
     *
     * Note: Currently we throw when someone tries to call the api, while there's an outstanding
     * promise on the api. This shouldn't happen in a regular case. However, if we see this happening
     * regularly, then we should handle these scenarios properly, instead of just throwing.
     *
     * @virtual
     */
    IsolatedProxyDynamicDataSource.prototype.getAnnotatedPropertyValueAsync = function (propertyId) {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_QosMonitor"](QOS_MONITOR_PREFIX + '.getAnnotatedPropertyValue');
        if (this._annotatedPropertyValueMap.has(propertyId)) {
            qosMonitor.writeSuccess();
            return Promise.resolve(this._annotatedPropertyValueMap.get(propertyId));
        }
        if (this._annotatedPropertyValuePromiseResolve) {
            var failureTag = "Calling 'getAnnotatedPropertyValue' is not allowed\n      while there's an outstanding promise on the api.";
            qosMonitor.writeUnexpectedFailure(failureTag);
            throw new Error(failureTag);
        }
        return new Promise(function (resolve, reject) {
            _IsolatedDynamicDataTransceiver__WEBPACK_IMPORTED_MODULE_0__["IsolatedDynamicDataTransceiver"].sendMessage(_IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_1__["IsolatedDynamicDataMessageType"].GetAnnotatedPropertyValue);
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPEventManager"].instance.registerEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__["DynamicDataEventNames"].getPropertyValueEventName(_this.id, propertyId, true), _this, function (message) { return _this.receiveAnnoatedPropertyValue(qosMonitor, message); });
            _this._annotatedPropertyValuePromiseResolve = resolve;
            _this._annotatedPropertyValuePromiseReject = reject;
        });
    };
    /**
     * Api to receive the requested annotated value for the property id from the source in the parent window.
     *
     * @param qosMonitor - Qos monitor.
     * @param propertyValue - Property value.
     */
    IsolatedProxyDynamicDataSource.prototype.receiveAnnoatedPropertyValue = function (qosMonitor, message) {
        var _this = this;
        var data = message.data;
        if (!data.errorMessage) {
            this._annotatedPropertyValueMap.set(data.propertyId, data.propertyValue);
            if (this._annotatedPropertyValuePromiseResolve) {
                qosMonitor.writeSuccess();
                this._annotatedPropertyValuePromiseResolve(data.propertyValue);
            }
        }
        else {
            if (this._annotatedPropertyValuePromiseReject) {
                var failureTag = 'Unable to get the annotated property value for the proeprty id: ' + data.propertyId;
                qosMonitor.writeUnexpectedFailure(failureTag);
                this._annotatedPropertyValuePromiseReject(new Error(failureTag));
            }
        }
        this._annotatedPropertyValuePromiseResolve = undefined;
        this._annotatedPropertyValuePromiseReject = undefined;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPEventManager"].instance.unregisterEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__["DynamicDataEventNames"].getPropertyValueEventName(this.id, data.propertyId, true), this, function (msg) { return _this.receiveAnnoatedPropertyValue(qosMonitor, msg); });
    };
    /**
     * Returns list of allowed events on the dynamic data source asynchronously.
     * When this api returns a non-empty result, then source must define 'sendData' api.
     *
     * If this api is not defined or returns an empty map, then no consumer will be able
     * to talk to this source.
     *
     * Note: Currently we throw when someone tries to call the api, while there's an outstanding
     * promise on the api. This shouldn't happen in a regular case. However, if we see this happening
     * regularly, then we should handle these scenarios properly, instead of just throwing.
     *
     * @virtual
     */
    IsolatedProxyDynamicDataSource.prototype.allowedEventsAsync = function () {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_QosMonitor"](QOS_MONITOR_PREFIX + '.getAllowedEvents');
        if (this._allowedEvents) {
            qosMonitor.writeSuccess();
            return Promise.resolve(this._allowedEvents);
        }
        if (this._allowedEventsResolve) {
            var failureTag = "Calling 'getAllowedEvents' is not allowed\n      while there's an outstanding promise on the api.";
            qosMonitor.writeUnexpectedFailure(failureTag);
            throw new Error(failureTag);
        }
        return new Promise(function (resolve, reject) {
            _IsolatedDynamicDataTransceiver__WEBPACK_IMPORTED_MODULE_0__["IsolatedDynamicDataTransceiver"].sendMessage(_IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_1__["IsolatedDynamicDataMessageType"].AllowedEvents);
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPEventManager"].instance.registerEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__["DynamicDataEventNames"].getAllowedEventsEventName(_this.id), _this, function (message) { return _this.receiveAllowedEvents(qosMonitor, message); });
            _this._allowedEventsResolve = resolve;
            _this._allowedEventsPromiseReject = reject;
        });
    };
    /**
     * Api to receive the requested allowed events from the source in the parent window.
     *
     * @param qosMonitor - Qos monitor.
     * @param allowedEvents - List of allowed events on the source.
     */
    IsolatedProxyDynamicDataSource.prototype.receiveAllowedEvents = function (qosMonitor, message) {
        var _this = this;
        var data = message.data;
        if (!data.errorMessage) {
            this._allowedEvents = data.allowedEvents;
            if (this._allowedEventsResolve) {
                qosMonitor.writeSuccess();
                this._allowedEventsResolve(data.allowedEvents);
            }
        }
        else {
            if (this._allowedEventsPromiseReject) {
                var failureTag = 'Unable to get the allowed events on the source id:' + this.id;
                qosMonitor.writeUnexpectedFailure(failureTag);
                this._allowedEventsPromiseReject(new Error(failureTag));
            }
        }
        this._allowedEventsResolve = undefined;
        this._allowedEventsPromiseReject = undefined;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPEventManager"].instance.unregisterEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__["DynamicDataEventNames"].getAllowedEventsEventName(this.id), this, function (msg) { return _this.receiveAllowedEvents(qosMonitor, msg); });
    };
    /**
     * {@inheritdoc IDynamicDataSource.getPropertyDefinitions}
     */
    IsolatedProxyDynamicDataSource.prototype.getPropertyDefinitions = function () {
        return [];
    };
    /**
     * {@inheritdoc IDynamicDataSource.getPropertyValue}
     */
    IsolatedProxyDynamicDataSource.prototype.getPropertyValue = function (propertyId) {
        return undefined;
    };
    /**
     * {@inheritdoc IDynamicDataSource.getAnnotatedPropertyValue}
     */
    IsolatedProxyDynamicDataSource.prototype.getAnnotatedPropertyValue = function (propertyId) {
        return undefined;
    };
    IsolatedProxyDynamicDataSource.prototype.dispose = function () {
        this.isDisposed = true;
    };
    return IsolatedProxyDynamicDataSource;
}());



/***/ }),

/***/ "ilZV":
/*!*************************************!*\
  !*** ./lib/DynamicDataReference.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Class that contains the Dynamic Data reference.
 * This includes the source, property, and property path (if applicable) of Dynamic Data
 *
 * @remarks
 * The reference string is of the form `<sourceId>:<property>` or `<sourceId>:<property>:<propertyPath>`
 *
 * Examples of references are:
 * `WebPart.<componentId>.<instanceId>:myComplexProperty:myArray[0].lastName`
 *
 * @public
 */
var DynamicDataReference = /** @class */ (function () {
    function DynamicDataReference(reference) {
        var split = reference.split(':');
        if (split.length < 2) {
            throw new Error("Data id is malformed. Data id: \"" + reference + "\"");
        }
        this._reference = reference;
        this._sourceId = split[0];
        this._property = split[1];
        this._propertyPath = split[2];
    }
    Object.defineProperty(DynamicDataReference.prototype, "reference", {
        /**
         * Returns the full reference of the Dynamic Data object as a string.
         */
        get: function () {
            return this._reference;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicDataReference.prototype, "sourceId", {
        /**
         * Returns the referred id of the Dynamic Data Source.
         */
        get: function () {
            return this._sourceId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicDataReference.prototype, "property", {
        /**
         * Returns the referred property of the Dynamic Data.
         */
        get: function () {
            return this._property;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicDataReference.prototype, "propertyPath", {
        /**
         * Returns the referred property path of the Dynamic Data.
         * Returns undefined if there is no property path.
         */
        get: function () {
            return this._propertyPath;
        },
        enumerable: true,
        configurable: true
    });
    return DynamicDataReference;
}());
/* harmony default export */ __webpack_exports__["default"] = (DynamicDataReference);


/***/ }),

/***/ "jNSU":
/*!********************************************************!*\
  !*** ./lib/isolated/IsolatedDynamicDataTransceiver.js ***!
  \********************************************************/
/*! exports provided: IsolatedDynamicDataTransceiver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsolatedDynamicDataTransceiver", function() { return IsolatedDynamicDataTransceiver; });
/* harmony import */ var _IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IsolatedDynamicDataMessageType */ "IkEF");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/DynamicDataEventConstants */ "8uTw");
/* harmony import */ var _common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/DynamicDataEventNames */ "BDIN");




/**
 * Class which handles both transmitting and receiving messages to and from the parent window
 * via PostMessage, when the component is loaded in an isolated environment.
 *
 * @internal
 */
var IsolatedDynamicDataTransceiver = /** @class */ (function () {
    function IsolatedDynamicDataTransceiver(serviceScope) {
        this._onMessageReceivedEvent = new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["SPEvent"](_common_DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_2__["SOURCES_RECEIVED"]);
        window.addEventListener('message', this._onMessageReceived);
    }
    /**
     * Sends a PostMessage to the parent window.
     *
     * @param eventType - Type of event to send.
     * @param data - Associated data with the event.
     */
    IsolatedDynamicDataTransceiver.sendMessage = function (eventType, data) {
        if (data === void 0) { data = {}; }
        window.parent.postMessage({
            type: eventType,
            data: data
        }, window.parent.origin);
    };
    Object.defineProperty(IsolatedDynamicDataTransceiver.prototype, "messageReceivedEvent", {
        /**
         * Event that gets raised when the list of Dynamic Data Sources gets updated.
         * @eventproperty
         */
        get: function () {
            return this._onMessageReceivedEvent;
        },
        enumerable: true,
        configurable: true
    });
    IsolatedDynamicDataTransceiver.prototype._onMessageReceived = function (event) {
        var currentOrigin = new URL(event.origin).origin;
        var message = event.data;
        /*
         * Handle the received event only if it is targeted to the current window and
         * the message is for the Isolated DynamicData scenario.
         */
        if (currentOrigin.toLowerCase() === event.origin.toLowerCase() && message) {
            var data = message.data;
            switch (message.type) {
                case _IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_0__["IsolatedDynamicDataMessageType"].SourcesChangedEvent:
                    this._raiseSourcesChangedEvent(data);
                    break;
                case _IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_0__["IsolatedDynamicDataMessageType"].NotifySourceChanged:
                    this._notifySourceChanged(data);
                    break;
                case _IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_0__["IsolatedDynamicDataMessageType"].NotifyPropertyChanged:
                    this._notifyPropertyChanged(data);
                    break;
                case _IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_0__["IsolatedDynamicDataMessageType"].GetPropertyDefinitions:
                    this._notifyPropertyDefinitionsReceived(data);
                    break;
                case _IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_0__["IsolatedDynamicDataMessageType"].GetPropertyValue:
                    this._notifyPropertyValueReceived(data);
                    break;
                case _IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_0__["IsolatedDynamicDataMessageType"].GetAnnotatedPropertyValue:
                    this._notifyAnnotatedPropertyValueReceived(data);
            }
        }
    };
    /**
     * Raises an event when the Dynamic Data Sources gets updated.
     * @remarks
     * The event is sticky because sources can be updated before there is anyone listening. This way all clients
     * will get notified that sources have been updated. Further updates are notified in real-time.
     */
    IsolatedDynamicDataTransceiver.prototype._raiseSourcesChangedEvent = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPEventManager"].instance.raiseStickyEvent(_common_DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_2__["SOURCES_CHANGED_EVENT_NAME"], {});
        // Isolated DDM listens to this event to read all the passed in sources
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPEventManager"].instance.raiseStickyEvent(_common_DynamicDataEventConstants__WEBPACK_IMPORTED_MODULE_2__["SOURCES_RECEIVED"], data);
    };
    /**
     * Raises an event to all listeners when a Dynamic Data Source has been updated.
     * @param data - Data associated with the message.
     */
    IsolatedDynamicDataTransceiver.prototype._notifySourceChanged = function (data) {
        var sourceId = data.sourceId;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPEventManager"].instance.raiseEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__["DynamicDataEventNames"].getAllPropertiesChangedEventName(sourceId), {});
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPEventManager"].instance.raiseEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__["DynamicDataEventNames"].getAnyPropertyChangedEventName(sourceId), {});
    };
    /**
     * Raises an event to all listeners when a property in a Dynamic Data Source has been updated.
     * @param data - Data associated with the event.
     */
    IsolatedDynamicDataTransceiver.prototype._notifyPropertyChanged = function (data) {
        var sourceId = data.sourceId, propertyId = data.propertyId;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPEventManager"].instance.raiseEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__["DynamicDataEventNames"].getPropertyChangedEventName(sourceId, propertyId), {});
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPEventManager"].instance.raiseEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__["DynamicDataEventNames"].getAnyPropertyChangedEventName(sourceId), {});
    };
    IsolatedDynamicDataTransceiver.prototype._notifyPropertyDefinitionsReceived = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPEventManager"].instance.raiseEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__["DynamicDataEventNames"].getPropertyDefintionsEventName(data.sourceId), data);
    };
    IsolatedDynamicDataTransceiver.prototype._notifyPropertyValueReceived = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPEventManager"].instance.raiseEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__["DynamicDataEventNames"].getPropertyValueEventName(data.sourceId, data.propertyId), data);
    };
    IsolatedDynamicDataTransceiver.prototype._notifyAnnotatedPropertyValueReceived = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPEventManager"].instance.raiseEvent(_common_DynamicDataEventNames__WEBPACK_IMPORTED_MODULE_3__["DynamicDataEventNames"].getPropertyValueEventName(data.sourceId, data.propertyId, true), data);
    };
    /**
     * The service key for IsolatedDynamicDataTransceiver service.
     */
    IsolatedDynamicDataTransceiver.serviceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["ServiceKey"].create('sp-dynamic-data:IsolatedDynamicDataTransceiver', IsolatedDynamicDataTransceiver);
    return IsolatedDynamicDataTransceiver;
}());



/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: DynamicDataReference, _PageContextDataSource, _DynamicDataManager, _IsolatedDynamicDataManager, _IsolatedDynamicDataTransceiver, _IsolatedDynamicDataMessageType, _DynamicDataUtilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DynamicDataReference__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DynamicDataReference */ "ilZV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DynamicDataReference", function() { return _DynamicDataReference__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _PageContextDataSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageContextDataSource */ "uyAI");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_PageContextDataSource", function() { return _PageContextDataSource__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _DynamicDataManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DynamicDataManager */ "Ro9o");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_DynamicDataManager", function() { return _DynamicDataManager__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _isolated_IsolatedDynamicDataManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isolated/IsolatedDynamicDataManager */ "7Mqo");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_IsolatedDynamicDataManager", function() { return _isolated_IsolatedDynamicDataManager__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _isolated_IsolatedDynamicDataTransceiver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isolated/IsolatedDynamicDataTransceiver */ "jNSU");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_IsolatedDynamicDataTransceiver", function() { return _isolated_IsolatedDynamicDataTransceiver__WEBPACK_IMPORTED_MODULE_4__["IsolatedDynamicDataTransceiver"]; });

/* harmony import */ var _isolated_IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isolated/IsolatedDynamicDataMessageType */ "IkEF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_IsolatedDynamicDataMessageType", function() { return _isolated_IsolatedDynamicDataMessageType__WEBPACK_IMPORTED_MODULE_5__["IsolatedDynamicDataMessageType"]; });

/* harmony import */ var _common_DynamicDataUtilities__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/DynamicDataUtilities */ "FpZ8");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_DynamicDataUtilities", function() { return _common_DynamicDataUtilities__WEBPACK_IMPORTED_MODULE_6__["DynamicDataUtilities"]; });

/**
 * SharePoint Framework support for dynamic data bindings.
 *
 * @remarks
 * This package provides the necessary infrastructure classes and public APIs necessary
 * to run dynamic data, and implement components that use it.
 *
 * @packagedocumentation
 */









/***/ }),

/***/ "qITA":
/*!*********************************!*\
  !*** ./lib/loc/Strings.resx.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_/GZrHjuQO4erDQbBRI2XSA';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "tCkv":
/*!************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/tslib/1.10.0/node_modules/tslib/tslib.es6.js ***!
  \************************************************************************************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "ut3N":
/*!********************************************!*\
  !*** external "@microsoft/sp-diagnostics" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ut3N__;

/***/ }),

/***/ "uyAI":
/*!**************************************!*\
  !*** ./lib/PageContextDataSource.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loc/Strings.resx */ "qITA");
/* harmony import */ var _common_DynamicDataUtilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/DynamicDataUtilities */ "FpZ8");



/**
 * The page context data source.  It should contain all app-level contextual information
 *
 * @internal
 */
var PageContextDataSource = /** @class */ (function () {
    function PageContextDataSource(serviceScope) {
        var _this = this;
        this._propertyDefinitions = {};
        this._eventDefinitions = {};
        this._serviceScope = serviceScope;
        this._serviceScope.whenFinished(function () {
            _this._dynamicDataManager = serviceScope.consume(_common_DynamicDataUtilities__WEBPACK_IMPORTED_MODULE_2__["DynamicDataUtilities"].IDynamicDataManagerServiceKey);
            _this._dynamicDataManager.addSource({
                id: PageContextDataSource.pageContextDataSourceId,
                metadata: {
                    title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].pageContextDataSourceTitle,
                    description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].pageContextDataSourceDescription,
                    componentId: '1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8',
                    alias: PageContextDataSource._pageContextDataSourceAlias
                },
                getPropertyDefinitions: _this.getPropertyDefinitions.bind(_this),
                getAnnotatedPropertyValue: _this.getAnnotatedPropertyValue.bind(_this),
                getPropertyValue: _this.getPropertyValue.bind(_this),
                sendEvent: _this.sendEvent.bind(_this),
                // Async apis
                getPropertyDefinitionsAsync: _this.getPropertyDefinitionsAsync.bind(_this),
                allowedEventsAsync: _this.allowedEventsAsync.bind(_this),
                getAnnotatedPropertyValueAsync: _this.getAnnotatedPropertyValueAsync.bind(_this),
                getPropertyValueAsync: _this.getPropertyValueAsync.bind(_this)
            });
        });
    }
    /**
     *
     * @param propInfo - The "sub-datasource" property.
     */
    PageContextDataSource.prototype.addPropertyHandler = function (propInfo) {
        var _this = this;
        // add the property references
        propInfo.dynamicDataFunctions.getPropertyDefinitions().forEach(function (propertyDefinition) {
            _this._propertyDefinitions[propertyDefinition.id] = {
                propertyCollectionId: propInfo.id,
                annotatedPropertyValueFunction: propInfo.dynamicDataFunctions.getAnnotatedPropertyValue,
                propertyValueFunction: propInfo.dynamicDataFunctions.getPropertyValue,
                definition: propertyDefinition
            };
        });
        // add the event references
        if (propInfo.dynamicDataFunctions.allowedEvents) {
            propInfo.dynamicDataFunctions.allowedEvents().forEach(function (event) {
                if (propInfo.dynamicDataFunctions.sendEvent) {
                    _this._eventDefinitions[event.name] = {
                        propertyCollectionId: propInfo.id,
                        sendEvent: propInfo.dynamicDataFunctions.sendEvent,
                        definition: event
                    };
                }
            });
        }
        this._dynamicDataManager.notifySourceChanged(PageContextDataSource.pageContextDataSourceId);
    };
    /**
     * Used by the downstream content providers to indicate that their properties have changed.
     * @param propertyId - the propertyId (not the context property info, but the property id) that has changed
     */
    PageContextDataSource.prototype.notifyPropertyChanged = function (propertyId) {
        this._dynamicDataManager.notifyPropertyChanged(PageContextDataSource.pageContextDataSourceId, propertyId);
    };
    /**
     * Remove all of the properties
     *
     * @param id - the id of the data provider that you want to remove.
     */
    PageContextDataSource.prototype.removePropertyHandler = function (id) {
        // First, delete the property references
        for (var prop in this._propertyDefinitions) {
            if (this._propertyDefinitions.hasOwnProperty(prop)) {
                if (this._propertyDefinitions[prop].propertyCollectionId === id) {
                    delete this._propertyDefinitions[prop];
                }
            }
        }
        // then delete the event references
        for (var prop in this._eventDefinitions) {
            if (this._eventDefinitions.hasOwnProperty(prop)) {
                if (this._eventDefinitions[prop].propertyCollectionId === id) {
                    delete this._eventDefinitions[prop];
                }
            }
        }
        this._dynamicDataManager.notifySourceChanged('PageContext');
    };
    /**
     * Iterate over all of the properties we are aware of and return
     * the set
     */
    PageContextDataSource.prototype.getPropertyDefinitions = function () {
        var retVal = [];
        for (var prop in this._propertyDefinitions) {
            if (this._propertyDefinitions.hasOwnProperty(prop)) {
                retVal.push(this._propertyDefinitions[prop].definition);
            }
        }
        return Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"])(retVal);
    };
    /**
     * Return the property value for the given property ID.  This will
     * iterate over all the different data providers exposed in the
     * context data source
     *
     * @param propertyId - the name of the property you want the value for
     *
     */
    PageContextDataSource.prototype.getPropertyValue = function (propertyId) {
        if (this._propertyDefinitions[propertyId]) {
            // We know this property - call the correct prop value function for it
            return Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"])(this._propertyDefinitions[propertyId].propertyValueFunction(propertyId));
        }
        return undefined;
    };
    /**
     * Returns the annotated value for the property supplied.
     * @param propertyId - The id of the property that contains the annotated value.
     */
    PageContextDataSource.prototype.getAnnotatedPropertyValue = function (propertyId) {
        if (this._propertyDefinitions[propertyId]) {
            // we know this property - call the correct annotated prop value function.
            return Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"])(this._propertyDefinitions[propertyId].annotatedPropertyValueFunction(propertyId));
        }
        else {
            return { sampleValue: undefined };
        }
    };
    /**
     * Iterate over all of the properties we are aware of and return
     * the set
     */
    PageContextDataSource.prototype.getPropertyDefinitionsAsync = function () {
        return Promise.resolve(this.getPropertyDefinitions());
    };
    /**
     * Return the property value for the given property ID.  This will
     * iterate over all the different data providers exposed in the
     * context data source
     * @param propertyId - the name of the property you want the value for.
     */
    PageContextDataSource.prototype.getPropertyValueAsync = function (propertyId) {
        return Promise.resolve(this.getPropertyValue(propertyId));
    };
    /**
     * Returns the annotated value for the property supplied.
     * @param propertyId - The id of the property that contains the annotated value.
     */
    PageContextDataSource.prototype.getAnnotatedPropertyValueAsync = function (propertyId) {
        return Promise.resolve(this.getAnnotatedPropertyValue(propertyId));
    };
    /**
     * iterate over all the known event handlers and return the
     * complete set.
     */
    PageContextDataSource.prototype.allowedEventsAsync = function () {
        var retVal = [];
        for (var prop in this._eventDefinitions) {
            if (this._eventDefinitions.hasOwnProperty(prop)) {
                retVal.push(this._eventDefinitions[prop].definition);
            }
        }
        return Promise.resolve(Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"])(retVal));
    };
    /**
     * This simply passes the sendEvent method to the appropriate
     * function end point.
     *
     * @param eventName - The event name that is being called
     * @param data - The data to be passed into the event
     */
    PageContextDataSource.prototype.sendEvent = function (eventName, data) {
        if (this._eventDefinitions[eventName]) {
            this._eventDefinitions[eventName].sendEvent(eventName, data);
        }
    };
    /**
     * Id of the PageContext dynamic data source.
     */
    PageContextDataSource.pageContextDataSourceId = 'PageContext';
    PageContextDataSource._pageContextDataSourceAlias = 'Page Context';
    return PageContextDataSource;
}());
/* harmony default export */ __webpack_exports__["default"] = (PageContextDataSource);


/***/ }),

/***/ "vpy3":
/*!*******************************!*\
  !*** external "resx-strings" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vpy3__;

/***/ })

/******/ })}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));;


/***/ }),

/***/ "@microsoft/sp-core-library":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_core_library__;

/***/ }),

/***/ "@microsoft/sp-diagnostics":
/*!********************************************!*\
  !*** external "@microsoft/sp-diagnostics" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_diagnostics__;

/***/ }),

/***/ "@microsoft/sp-lodash-subset":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_lodash_subset__;

/***/ })

/******/ })});;
//# sourceMappingURL=sp-dynamic-data_en-us.js.map