define("f9e737b7-f0df-4597-ba8c-3060f82380db_1.11.0", ["@microsoft/decorators","@microsoft/load-themed-styles","@microsoft/office-ui-fabric-react-bundle","@microsoft/sp-component-base","@microsoft/sp-core-library","@microsoft/sp-diagnostics","@microsoft/sp-lodash-subset","@ms/uifabric-styling-bundle","react","react-dom"], function(__WEBPACK_EXTERNAL_MODULE__microsoft_decorators__, __WEBPACK_EXTERNAL_MODULE__microsoft_load_themed_styles__, __WEBPACK_EXTERNAL_MODULE__microsoft_office_ui_fabric_react_bundle__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_component_base__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_core_library__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_diagnostics__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_lodash_subset__, __WEBPACK_EXTERNAL_MODULE__ms_uifabric_styling_bundle__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./sp-property-pane.js");
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
      "Save": "Apply",
      "Close": "Close",
      "SaveConfirmation": "We saved your changes in the property pane.",
      "PropertyPaneBackPage": "Back",
      "PropertyPaneNextPage": "Next",
      "PropertyPanePageOfPages": "{0} of {1}",
      "PropertyPaneTitle": "{0} settings",
      "PropertyPaneEmptyStateDescription": "No settings to change for this web part.",
      "PropertyPaneFetchingSettingsDataLabel": "Loading data…",
      "NoOpOnRefreshPropertyPaneText": "refreshPropertyPane is a No Op, because the property pane is currently not attached to the web part {0}.",
      "ApplyButtonAriaDescription": "Changes made on the property pane will be applied to the web part.",
      "ToggleOnText": "On",
      "ToggleOffText": "Off",
      "NoDynamicDataReturnedErrorText": "Entered dynamic resource path does not return any dynamic data.",
      "ConnectToDynamicDataSource": "Connect to source",
      "ConnectToDynamicDataSourceDescription": "Click to connect to a dynamic data source.",
      "DynamicDataSourcesDropdownLabel": "Connect to source",
      "DynamicDataPropertiesDropdownLabel": "{0}'s properties",
      "DynamicDataRemoveConnectionText": "Remove connection",
      "InvalidPropertyValueDepthWarning": "Value for {0} is invalid. Possible values are {1} through {2}.",
      "DynamicDataSecondaryGroupButtonLabel": "…"
    }
  };

  strings.default = strings;
  return strings;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sp-property-pane.js":
/*!*****************************!*\
  !*** ./sp-property-pane.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! @microsoft/sp-component-base */ "@microsoft/sp-component-base"),__webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "@microsoft/office-ui-fabric-react-bundle"),__webpack_require__(/*! @microsoft/sp-lodash-subset */ "@microsoft/sp-lodash-subset"),__webpack_require__(/*! @microsoft/sp-core-library */ "@microsoft/sp-core-library"),__webpack_require__(/*! react */ "react"),__webpack_require__(/*! react-dom */ "react-dom"),__webpack_require__(/*! @ms/uifabric-styling-bundle */ "@ms/uifabric-styling-bundle"),__webpack_require__(/*! @microsoft/load-themed-styles */ "@microsoft/load-themed-styles"),__webpack_require__(/*! @microsoft/sp-diagnostics */ "@microsoft/sp-diagnostics"),__webpack_require__(/*! resx-strings */ "../lib/resx-strings/en-us.js"),__webpack_require__(/*! @microsoft/decorators */ "@microsoft/decorators")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(__WEBPACK_EXTERNAL_MODULE__7Awa__, __WEBPACK_EXTERNAL_MODULE_KL1q__, __WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_cDcd__, __WEBPACK_EXTERNAL_MODULE_faye__, __WEBPACK_EXTERNAL_MODULE_fglE__, __WEBPACK_EXTERNAL_MODULE_jOlS__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_vpy3__, __WEBPACK_EXTERNAL_MODULE_wxtz__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"sp-property-pane": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({"vendors~property-pane-component":"vendors~property-pane-component","property-pane-component":"property-pane-component"}[chunkId]||chunkId) + "_" + {"vendors~property-pane-component":"18433f0e0f673f202645","property-pane-component":"79336470e8f347af30a7"}[chunkId] + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonpf9e737b7_f0df_4597_ba8c_3060f82380db_1_11_0"] = window["webpackJsonpf9e737b7_f0df_4597_ba8c_3060f82380db_1_11_0"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Set the webpack public path
/******/ 	(function () {
/******/ 	  var scripts = document.getElementsByTagName('script');
/******/ 	  var regex = (typeof spScriptNamePattern !== 'undefined') ? spScriptNamePattern : new RegExp('\\/sp-property-pane(_[a-z0-9-]+)*\\.js', 'i');
/******/ 	  var publicPath;
/******/
/******/ 	  if (scripts && scripts.length) {
/******/ 	    for (var i = 0; i < scripts.length; i++) {
/******/ 	      if (!scripts[i]) continue;
/******/ 	      var path = scripts[i].getAttribute('src');
/******/ 	      if (path && path.match(regex)) {
/******/ 	        publicPath = path.substring(0, path.lastIndexOf('/') + 1);
/******/ 	        break;
/******/ 	      }
/******/ 	    }
/******/ 	  }
/******/
/******/ 	  if (!publicPath) {
/******/ 	    for (var global in window.__setWebpackPublicPathLoaderSrcRegistry__) {
/******/ 	      if (global && global.match(regex)) {
/******/ 	        publicPath = global.substring(0, global.lastIndexOf('/') + 1);
/******/ 	        break;
/******/ 	      }
/******/ 	    }
/******/ 	  }
/******/ 	  __webpack_require__.p = publicPath;
/******/ 	})();
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "mwqp");
/******/ })
/************************************************************************/
/******/ ({

/***/ "626p":
/*!**************************************************************!*\
  !*** ./lib/propertyPaneController/PropertyPaneController.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../loc/Strings.resx */ "qITA");
/* harmony import */ var _PropertyPaneController_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PropertyPaneController.module.scss */ "LB0u");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file  This file contains code to help control the property pane interactions with its consumers.
 */







/**
 * Class which manages all the interactions between property pane and the property pane consumers, such as web parts.
 *
 * @internal
 */
var PropertyPaneController = /** @class */ (function () {
    /**
     * Instantiates the PropertyPaneController object.
     *
     * NOTE: [TODO] When the killswitch 'ConsumePropertyPaneControllerFromServiceScope'
     * is graduated remove this constructor and make the _constructor as the constructor
     * and still keep it as private.
     *
     * @param callback - callback to be called when a configuration event happens.
     */
    function PropertyPaneController(callback) {
        /*
         * Property pane controller log source
         */
        this._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('PropertyPaneController');
        /**
         * Dictionary of all the registered property pane consumers.
         */
        this._consumers = new Map();
        this._lifeCycleEventCallback = callback;
        this._constructor();
    }
    /**
     * Registers a property pane consumer with the property pane controller.
     *
     * @param instanceId - Instance id of the consumer.
     * @param consumer - Property pane consume to be registered.
     */
    PropertyPaneController.prototype.registerConsumer = function (instanceId, consumer) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(instanceId, 'instanceId');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(consumer, 'consumer');
        this._consumers.set(instanceId, consumer);
    };
    /**
     * Returns true if the passed in instance Id, is a registered consumer.
     * @param instanceId - Instance id of the consumer.
     */
    PropertyPaneController.prototype.isConsumerRegistered = function (instanceId) {
        return this._consumers.has(instanceId);
    };
    Object.defineProperty(PropertyPaneController.prototype, "currentlyConfiguredConsumerId", {
        /**
         * Get the currently configured consumer's instance Id
         */
        get: function () { return this._currentlyConfiguredConsumerId; },
        enumerable: true,
        configurable: true
    });
    /**
     * API to request an action to be performed on the property pane. This helps in configuring a SharePoint component.
     * The inbuilt property pane is used for the configuration, with the below conditions:
     *
     *   - propertyPaneAction is Open and then open the property pane.
     *   - propertyPaneAction is Close and then close the property pane.
     *   - propertyPaneAction is Toggle and the property pane is closed: in this case we open the property pane and
     *       start the configuration process.
     *       Example - This happens when web part configure button is clicked.
     *   - propertyPaneAction is Toggle and the property pane is open: in this case, if the incoming consumer id
     *       is different than the one being currently configured, we keep the property pane open
     *       and change the active consumer being configured.
     *   - propertyPaneAction is Default and the property pane is closed: do nothing
     *   - propertyPaneAction is Default and the property pane is opened: change the property pane to display the
     *       settings of the newly selected consumer.
     *       Example - This happens when the user navigates between property pane consumers (ex: web parts).
     *
     * @param toBeConfiguredConsumerId - instance id of the consumer.
     * @param propertyPaneAction - indicates in what state the property pane should be.
     * @param renderedByWebPart - is the property pane rendered by a web part and not by Canvas or any other source.
     * @param context - additional data passed by the consumer, to be sent back to the same webpart
     */
    PropertyPaneController.prototype.requestAction = function (toBeConfiguredConsumerId, propertyPaneAction, renderedByWebPart, context // tslint:disable-line:no-any
    ) {
        if (propertyPaneAction === void 0) { propertyPaneAction = 4 /* Default */; }
        /**
         * It's a no operation scenario if a consumer is asking to refresh the property pane contents by invoking
         * refreshPropertyPane api, while some other consumer is being configured.
         */
        var noOp = renderedByWebPart &&
            propertyPaneAction === 5 /* Refresh */ &&
            toBeConfiguredConsumerId !== this._currentlyConfiguredConsumerId;
        if (!noOp) {
            // 'id' can be 'undefined'. It happens when user selects RTE.
            // When 'id' is 'undefined' then 'wp' will be 'undefined'. In that case we render the empty property pane.
            var toBeConfiguredConsumer = this._tryGetConsumer(toBeConfiguredConsumerId);
            this._setPropertyPaneDOMElements();
            /**
             * A variable indicating, if the property pane will open or not. The flag is set to true when the pane is NOT
             * open and the requested propertyPaneAction is either Open or Toggle.
             */
            var paneWillOpen = !this._isOpen &&
                (propertyPaneAction === 1 /* Open */ || propertyPaneAction === 3 /* Toggle */);
            var activeComponentChanged = false;
            /**
             * Fire the 'ActiveWebPartChanged' event when the configuring consumer changes on the property pane.
             */
            if (toBeConfiguredConsumerId &&
                this._currentlyConfiguredConsumerId &&
                (toBeConfiguredConsumerId !== this._currentlyConfiguredConsumerId || paneWillOpen)) {
                activeComponentChanged = true;
                /**
                 * Premptively asking consumer(if exists, consumer can be undefined for canvas toolbox hint.)
                 * to load async resources for its property pane before the data
                 * is requested via _getPropertyPaneData call.
                 * We make this call when the active webpart has changed and the property pane is shown.
                 */
                if (toBeConfiguredConsumer && (this._isOpen || paneWillOpen)) {
                    toBeConfiguredConsumer._loadPropertyPaneResources();
                }
                this._fireConfigurationEvent(toBeConfiguredConsumerId, 7 /* ActiveWebPartChanged */);
            }
            if (propertyPaneAction !== 5 /* Refresh */) {
                /**
                 * When shifting from internal item edit to the overall component edit, canvas sends in Toggle
                 * as the propertypaneaction. However, to keep the property pane open and shift to the overall
                 * component configuration we will ignore the incoming propertypanestate and just refreshes it.
                 */
                if (propertyPaneAction === 3 /* Toggle */) {
                    var internalToOverallComponentEdit = !!this._isPaneRenderedByWebPart !== !!renderedByWebPart;
                    if (!activeComponentChanged && internalToOverallComponentEdit) {
                        propertyPaneAction = 5 /* Refresh */;
                    }
                }
                /**
                 * Update the '_isPaneRenderedByWebPart' variable only in the NON 'Refresh' scenarios.
                 * On 'Refresh' we have decided NOT to update the '_isPaneRenderedByWebPart'.
                 */
                this._isPaneRenderedByWebPart = !!renderedByWebPart;
            }
            this._executeAction(toBeConfiguredConsumer, toBeConfiguredConsumerId, propertyPaneAction, context);
            this._currentlyConfiguredConsumerId = toBeConfiguredConsumerId;
        }
        else {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(this._logSource, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_4__["default"].NoOpOnRefreshPropertyPaneText, toBeConfiguredConsumerId));
        }
    };
    /**
     * Returns true if the property pane is rendered by a consumer,example web part, RTE etc.,
     * and not by the host, example canvas.
     * A component becomes consumer if it implements IPropertyPaneConsumer.
     */
    PropertyPaneController.prototype.isRenderedByConsumer = function () {
        return this._isPaneRenderedByWebPart;
    };
    /**
     * Returns true if the property pane is open.
     */
    PropertyPaneController.prototype.isOpen = function () {
        return this._isOpen;
    };
    /**
     * Empty out the property pane when the web part being configured is deleted from the page.
     *
     * @param id - Instance id of the consumer.
     */
    PropertyPaneController.prototype.onConsumerDelete = function (id) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(id, 'id');
        if (id === this._currentlyConfiguredConsumerId) {
            if (this._isOpen) {
                this._renderPropertyPane(undefined, true);
            }
            this._currentlyConfiguredConsumerId = undefined;
        }
    };
    /**
     * Allows the property panes title to be overriden.
     *
     * @param title - Title of the property pane.
     *
     * @internal
     */
    PropertyPaneController.prototype._setAppPagePropertyPaneTopData = function (topControl, title) {
        this._topControl = topControl;
        this._title = title;
    };
    /**
     * Causes the property pane to be rendered narrowly (320px vs 340px).
     *
     * @internal
     */
    PropertyPaneController.prototype._setPropertyPaneToNarrowRender = function (narrow) {
        this._narrowRender = narrow;
    };
    /**
     * Instantiates the PropertyPaneController object.
     *
     * The constructor is private since this service should always be constructed
     * via the ServiceScope key.
     *
     * NOTE: When the killswitch 'ConsumePropertyPaneControllerFromServiceScope'
     * is graduated, this method will become the actual constructor.
     */
    PropertyPaneController.prototype._constructor = function () {
        this._propertyPaneContainerId = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Environment"].type !== _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["EnvironmentType"].ClassicSharePoint ?
            PropertyPaneController.PROPERTY_PANE_CONTAINER_ID :
            PropertyPaneController.PROPERTY_PANE_CONTAINER_NOFLEXBOX_ID;
        // method bindings
        this._onPropertyPaneFieldChanged = this._onPropertyPaneFieldChanged.bind(this);
        this._onConfigurationEvent = this._onConfigurationEvent.bind(this);
        this._fireConfigurationEvent = this._fireConfigurationEvent.bind(this);
    };
    /**
     * Executes the request action on the property pane if appropriate.
     *
     * @param toBeConfiguredConsumer - component to be configured.
     * @param toBeConfiguredConsumerInstanceId - Instance id of the component to be configured.
     * @param propertyPaneAction - Action to be executed on the property pane.
     */
    PropertyPaneController.prototype._executeAction = function (toBeConfiguredConsumer, toBeConfiguredConsumerInstanceId, propertyPaneAction, context /* tslint:disable-line:no-any */) {
        switch (propertyPaneAction) {
            case 1 /* Open */:
            case 6 /* OpenDetails */:
                /**
                 * Inside the '_renderPropertyPane' the value of the variable '_isOpen' could be modified.
                 * Hence, to keep the before state of it, introducing 'paneOpenBeforeRender'.
                 */
                var paneOpenBeforeRender = this._isOpen;
                this._renderPropertyPane(toBeConfiguredConsumer, true, true, propertyPaneAction === 6 /* OpenDetails */, context);
                this._showPropertyPane();
                /**
                 * If pane is 'open' before '_renderPropertyPane' is called that means property pane did not toggle.
                 * Hence no events were fired. So fire the events explicitly.
                 */
                if (paneOpenBeforeRender) {
                    this._fireNoToggleConfigurationEvents(toBeConfiguredConsumerInstanceId);
                }
                else {
                    this._firePostToggleConfigurationEvents();
                }
                break;
            // Property pane should close.
            case 2 /* Close */:
                if (this._isOpen) {
                    this._hidePropertyPane();
                    this._firePostToggleConfigurationEvents();
                }
                break;
            // Property pane should toggle i.e., if it's open, close it else open it.
            case 3 /* Toggle */:
                if (this._isOpen) {
                    this._hidePropertyPane();
                }
                else {
                    this._renderPropertyPane(toBeConfiguredConsumer, true, true);
                    this._showPropertyPane();
                }
                // Fire the post toggle events.
                this._firePostToggleConfigurationEvents();
                break;
            // Keep the property pane open if it's already open, else no-op.
            case 4 /* Default */:
                if (this._isOpen) {
                    // New component triggered the 'openPropertyPane' and the property pane is open, so will keep it open.
                    // This results in NO toggle. So fire the events specific to this condition.
                    this._fireNoToggleConfigurationEvents(toBeConfiguredConsumerInstanceId);
                    // If current opened property pane is the right property pane, no need to force reset.
                    // Otherwise, the componentDidUpdate in PropertyPane.tsx will have never been entered, which will lead to
                    // _isPropertyPaneReplaced in PropertyPane.tsx keeping true.
                    // The logic inside PropertyPane.tsx is strong enough to decide whether it need to reset whole property pane.
                    if (this._isCurrentlyConfiguredPropertyPaneReactive) {
                        this._renderPropertyPane(toBeConfiguredConsumer, true, false);
                    }
                    else {
                        // @todo: (SPPPLAT VSO# Task 236141:Implement Non-Reactive property pane in full).
                        // For now we are rendering the property pane, but ideally we have to check if the
                        // property pane is in dirty state and act accordingly.
                        this._renderPropertyPane(toBeConfiguredConsumer, true, false);
                    }
                }
                break;
            /**
             * Refresh the contents of the property pane if the property pane is open for the requesting component.
             *  - This condition is prechecked in 'requestPropertyPaneAction' method.
             */
            case 5 /* Refresh */:
                if (this._isOpen) {
                    this._renderPropertyPane(toBeConfiguredConsumer, true, false);
                }
                break;
        }
        if (this._isOpen !== false && toBeConfiguredConsumer) {
            // todo(@ManishGa) 282500 - avoid use of any here
            var wpContext = toBeConfiguredConsumer.context; /* tslint:disable-line:no-any */
            var wpAlias = wpContext && wpContext._manifest && wpContext._manifest.alias;
            var isInternal = wpContext && wpContext._manifest && wpContext._manifest.isInternal || false;
            var logEntry = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogEntry"](this._logSource.id, 'PropertyPaneOpened', _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogType"].Event, {
                'alias': wpAlias,
                'isInternal': isInternal.toString()
            });
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_EngagementLogger"].logEventWithLogEntry(logEntry);
        }
    };
    /**
     * A private method to show the property pane.
     *
     * This method will also set the value of the '_isOpen' value appropriately.
     */
    PropertyPaneController.prototype._showPropertyPane = function () {
        if (this._pageContentElement) {
            this._pageContentElement.classList.add(_PropertyPaneController_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].shrinkContent);
        }
        else {
            /**
             * This is a temporary fix.
             * @todo: (SPPPLAT VSO: Bug 237945:Fix the property pane rendering on the classic page)
             */
            this._propertyPaneContainer.style.top = '50px';
            this._propertyPaneContainer.style.zIndex = '999';
        }
        if (this._workbenchCommandBarElement) {
            this._workbenchCommandBarElement.classList.add(_PropertyPaneController_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].shrinkContent);
        }
        this._propertyPaneContainer.classList.add(this._narrowRender ?
            _PropertyPaneController_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].showPaneNarrow :
            _PropertyPaneController_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].showPane);
        this._isOpen = true;
    };
    /**
     * A private method to hide the property pane.
     *
     * This method will also set the value of the '_isOpen' value appropriately.
     */
    PropertyPaneController.prototype._hidePropertyPane = function () {
        var clearPropertyPaneReference = false;
        if (this._pageContentElement) {
            this._pageContentElement.classList.remove(_PropertyPaneController_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].shrinkContent);
            if (this._propertyPaneElement) {
                react_dom__WEBPACK_IMPORTED_MODULE_3__["unmountComponentAtNode"](this._propertyPaneElement);
                clearPropertyPaneReference = true;
            }
        }
        else if (this._propertyPaneElement) {
            /**
             * If there is no page content element, then it means that it is a classic page. So unmounting
             * the property pane node, because for some reason property pane is not respecting PropertyPaneContainer
             * styles.
             *
             * This is a temporary fix.
             * @todo: (SPPPLAT VSO: Bug 237945:Fix the property pane rendering on the classic page)
             */
            react_dom__WEBPACK_IMPORTED_MODULE_3__["unmountComponentAtNode"](this._propertyPaneElement);
            clearPropertyPaneReference = true;
        }
        if (clearPropertyPaneReference) {
            this._propertyPaneElement = undefined;
        }
        if (this._workbenchCommandBarElement) {
            this._workbenchCommandBarElement.classList.remove(_PropertyPaneController_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].shrinkContent);
        }
        this._propertyPaneContainer.classList.remove(this._narrowRender ?
            _PropertyPaneController_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].showPaneNarrow :
            _PropertyPaneController_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].showPane);
        this._isOpen = false;
    };
    /**
     * Renders the property pane.
     *
     * @param currentConsumer - Current component for which the property pane is to be displayed.
     * @param recreatePropertyPane - Indicates whether property pane should be recreated or not.
     * @param reset - Indicating whether property pane state should be reset or not.
     * @param isDetails - Indicating whether this is rendered in openDetails scenario
     * @param context - additional data passed by the consumer, to be sent back to the same webpart
     */
    PropertyPaneController.prototype._renderPropertyPane = function (currentConsumer, recreatePropertyPane, reset, isDetails, context /* tslint:disable-line:no-any */) {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('PropertyPaneController.renderPropertyPane');
        if (currentConsumer) {
            currentConsumer._getPropertyPaneData(isDetails, context).then(function (data) {
                // load the property pane only when the resolved promise is of the current webpart.
                // else no-op
                if (_this._currentlyConfiguredConsumerId === data.webPartId) {
                    /**
                     * Posting a message to the current window indicating that the property pane will open.
                     * This is used by the clientsidewebpartmanager to close isolated property pane, if open.
                     *
                     * @todo(SPPPLAT Bug #299413): Implement missing schema for property pane post messages
                     * @todo(SPPPLAT PBI #687467): Refactor IframedWebPartContoller
                     */
                    window.postMessage('Property pane will open', window.location.origin);
                    _this._buildAndLoadPropertyPane(data, reset);
                }
            }).catch(function (error) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logErrorData({
                    source: _this._logSource,
                    error: error
                });
                qosMonitor.writeUnexpectedFailure('UnhandledError', error);
                throw error;
            });
        }
        else {
            // if !currentWebpart
            this._currentPropertyPaneData = this._getEmptyPropertyPaneData();
            this._loadPropertyPaneComponent(recreatePropertyPane);
        }
    };
    /**
     * Builds the data required to load the property pane and then loads the property pane component.
     *
     * @param propertyPaneData - property pane data for currently active consumer.
     * @param reset - Indicating whether property pane state should be reset or not.
     */
    PropertyPaneController.prototype._buildAndLoadPropertyPane = function (propertyPaneData, reset) {
        var _this = this;
        this._currentPropertyPaneData = propertyPaneData;
        propertyPaneData.onPropertyPaneFieldChanged = this._onPropertyPaneFieldChanged;
        propertyPaneData.onConfigurationEvent = this._onConfigurationEvent;
        propertyPaneData.render = function () { _this._reRender(); };
        propertyPaneData.shouldResetState = reset;
        if (propertyPaneData.configuration &&
            propertyPaneData.configuration.showLoadingIndicator) {
            // Reason behind calculating delay like this is, we want to respect
            // the value provided by the consumer's author, including 0(otherwise its a falsy value.)
            var delay = propertyPaneData.configuration.loadingIndicatorDelayTime === undefined ?
                500 : propertyPaneData.configuration.loadingIndicatorDelayTime;
            setTimeout(function () {
                if (propertyPaneData.configuration.showLoadingIndicator) {
                    /**
                     * Reloading the property pane component if showOverlaySpinner is true after the
                     * overlaySpinnerDelayTime (if specified) or 500 ms.
                     */
                    _this._loadPropertyPaneComponent(true);
                }
            }, delay);
        }
        else {
            this._loadPropertyPaneComponent(true);
        }
    };
    /**
     * Method to load the property pane component into the propertypanecontainer element using the
     * currentPropertyPaneData.
     *
     * @param recreatePropertyPane - Indicating whether property pane should be recreated or not.
     */
    PropertyPaneController.prototype._loadPropertyPaneComponent = function (recreatePropertyPane) {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('PropertyPaneController.loadPropertyPaneComponent');
        // Load the property pane asynchronously in a separate bundle.
        Promise.all(/*! import() | property-pane-component */[__webpack_require__.e("vendors~property-pane-component"), __webpack_require__.e("property-pane-component")]).then(__webpack_require__.bind(null, /*! ../propertyPane/PropertyPane */ "75EL"))
            .then(function (propertyPane) {
            // Only if this flag is true, re-insert the property pane element into the DOM.
            var insertIntoDom = false;
            if (recreatePropertyPane) {
                // Recreating the property pane. This will enable the property pane to be in a valid state.
                if (!_this._propertyPaneElement) {
                    _this._propertyPaneElement = document.createElement('div');
                    insertIntoDom = true;
                }
            }
            if (_this._propertyPaneElement) {
                _this._propertyPaneElement.className = _this._currentPropertyPaneData.webPartId;
                if (_this._title) {
                    _this._currentPropertyPaneData.title = _this._title;
                }
                var el = react__WEBPACK_IMPORTED_MODULE_2__["createElement"](propertyPane.default, {
                    data: _this._currentPropertyPaneData,
                    renderNarrow: _this._narrowRender
                }, _this._topControl);
                react_dom__WEBPACK_IMPORTED_MODULE_3__["render"](el, _this._propertyPaneElement);
            }
            // If the consumer app provides a container div, the property pane will slide-in/out.
            // Else, the property pane will be a popup and overlay over the content area.
            // Further, if not required, do not re-insert the element into dom.
            if (_this._propertyPaneContainer) {
                if (insertIntoDom) {
                    _this._clearPropertyPaneContainer();
                    if (_this._propertyPaneElement) {
                        _this._propertyPaneContainer.appendChild(_this._propertyPaneElement);
                    }
                }
            }
            else {
                if (insertIntoDom && document.body.lastChild && _this._propertyPaneElement) {
                    document.body.insertBefore(_this._propertyPaneElement, document.body.lastChild.nextSibling);
                }
            }
        })
            .catch(function (error) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logErrorData({
                source: _this._logSource,
                error: error
            });
            qosMonitor.writeUnexpectedFailure('UnhandledError', error);
        });
    };
    /**
     * Allow the property pane to re-render itself. Used when navigating pages.
     */
    PropertyPaneController.prototype._reRender = function () {
        var consumer = this._tryGetConsumer(this._currentPropertyPaneData.webPartId);
        if (consumer) {
            this._renderPropertyPane(consumer);
        }
    };
    /**
     * Property pane field change event handler.
     *
     * @param propertyName - Name of the property pane field changed.
     * @param newValue - New value.
     *  This value could be undefined/empty in the case of custom field.
     */
    /* tslint:disable:no-any */
    PropertyPaneController.prototype._onPropertyPaneFieldChanged = function (propertyName, newValue, fieldType) {
        /* tslint:enable:no-any */
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(propertyName, 'propertyName');
        if (!this._currentPropertyPaneData.webPartId) {
            throw new Error('onPropertyPaneFieldChanged event is not expected when no consumer is being configured');
        }
        var consumer = this._tryGetConsumer(this._currentPropertyPaneData.webPartId);
        if (consumer) {
            consumer._onPropertyPaneFieldChanged(propertyName, newValue, fieldType);
            // Resetting the boolean value.
            this._renderPropertyPane(consumer);
        }
        if (this._isCurrentlyConfiguredPropertyPaneReactive()) {
            this._resetConfigurationCompleteTimeout();
        }
    };
    /**
     * Callback to handle the configuration events that originate in the property pane.
     *
     * @example
     * PropertyPaneClosed, PropertyPaneApplyClicked etc.,
     */
    PropertyPaneController.prototype._onConfigurationEvent = function (configurationEvent) {
        switch (configurationEvent) {
            /**
             * For the event 'PropertyPaneClosed' we need to fire both the 'PropertyPaneClosed' and
             * 'PropertyPaneConfigurationComplete' events to the consumer.
             * '_togglePropertyPanePosition' internally fires both the events.
             */
            case 4 /* Closed */:
                this._hidePropertyPane();
                this._firePostToggleConfigurationEvents();
                break;
            /**
             * For these events we need to fire two events:
             *  - 'PropertyPaneConfigurationComplete' and
             *  - Whatever the event the caller has passed in 'configurationEvent'.
             */
            case 5 /* ApplyClicked */:
            case 6 /* LostFocus */:
                this._fireConfigurationEvent(this._currentlyConfiguredConsumerId, configurationEvent);
                this._fireConfigurationEvent(this._currentlyConfiguredConsumerId, 2 /* ConfigurationComplete */);
                break;
        }
    };
    /**
     * Method to fire the configuration events post toggling the property pane.
     * If toggling opened the property pane then fire both the 'PropertyPaneOpened' and 'PropertyPaneConfigurationStart'
     * events after the ANIMATION_TIMEOUT is elapsed.
     * Else if the toggling resulted in closing the property pane then fire 'PropertyPaneConfigurationComplete' event
     * and then after ANIMATION_TIMEOUT is elapsed fire 'PropertyPaneClosed' event.
     */
    PropertyPaneController.prototype._firePostToggleConfigurationEvents = function () {
        var _this = this;
        // @todo: this is a temporary fix to let the host (e.g. Canvas) know that the property pane has completed
        // animating. The current property pane animation is 367ms and hence the 400ms timeout. The correct fix is
        // to hookup to the animation end event.
        if (this._isOpen) {
            window.setTimeout(function () {
                _this._fireConfigurationEvent(_this._currentlyConfiguredConsumerId, 3 /* Opened */);
                _this._fireConfigurationEvent(_this._currentlyConfiguredConsumerId, 1 /* ConfigurationStart */);
                /**
                 * Posting a message to the current window indicating that the property pane toggled.
                 * @example: Modern pages use this message to re-size it's header.'
                 */
                window.postMessage('Property pane toggled', window.location.origin);
            }, PropertyPaneController.ANIMATION_TIMEOUT);
        }
        else {
            this._fireConfigurationEvent(this._currentlyConfiguredConsumerId, 2 /* ConfigurationComplete */);
            window.setTimeout(function () {
                _this._fireConfigurationEvent(_this._currentlyConfiguredConsumerId, 4 /* Closed */);
                /**
                 * Posting a message to the current window indicating that the property pane toggled.
                 * @example: Modern pages use this message to re-size it's header.'
                 * @todo(SPPPLAT Bug #299413): Implement missing schema for property pane post messages
                 */
                window.postMessage('Property pane toggled', window.location.origin);
            }, PropertyPaneController.ANIMATION_TIMEOUT);
        }
    };
    /**
     * Method to fire the configuration events when the property pane did not toggle.
     * Fire the 'ConfigurationComplete' event on the current consumer and
     * then 'ConfigurationStart' for the new consumer.
     *
     * @param id - Id of the consumer to be configured.
     */
    PropertyPaneController.prototype._fireNoToggleConfigurationEvents = function (id) {
        // Firing events for the current consumer.
        this._fireConfigurationEvent(this._currentlyConfiguredConsumerId, 2 /* ConfigurationComplete */);
        // Firing events for the new consumer.
        this._fireConfigurationEvent(id, 1 /* ConfigurationStart */);
    };
    /**
     * Method to fire the configuration event to the host and the consumer.
     *
     * @param componentId - Id of the consumer to which the event needs to be sent.
     * @param configurationEvent - Kind of configuration event to fire.
     */
    PropertyPaneController.prototype._fireConfigurationEvent = function (componentId, configurationEvent) {
        this._clearConfigurationCompleteTimeout();
        // Up to IWebPartGetter to handle an undefined string.
        var consumer = this._tryGetConsumer(componentId);
        if (consumer) {
            // Raise the event to the host.
            if (this._lifeCycleEventCallback) {
                this._lifeCycleEventCallback(configurationEvent, componentId);
            }
            // Raise the event to the consumer.
            consumer._onPropertyPaneLifeCycleEvent(configurationEvent);
        }
    };
    /**
     * Private method to set the property pane related DOM elements, which are used in slide in slide out effect.
     */
    PropertyPaneController.prototype._setPropertyPaneDOMElements = function () {
        var workbenchElement = document.getElementById('workbenchPageContent');
        // @todo: (SPPPLAT VSO#222337) - Refactor Workbench page layout
        if (workbenchElement) {
            this._pageContentElement = workbenchElement;
            this._workbenchCommandBarElement = document.getElementById('workbenchCommandBar');
        }
        else {
            this._pageContentElement = document.getElementById('spPageChromeAppDiv');
        }
        // All modern apps should have the spPageChromeAppDiv. If not, then we should treat like the Classic page scenario.
        // i.e.the container div should be hanging off the root node. And we should create it only the first time.
        if (!this._pageContentElement) {
            if (!this._propertyPaneContainer) {
                this._propertyPaneContainer = document.createElement('div');
                this._propertyPaneContainer.id = this._propertyPaneContainerId;
                this._propertyPaneContainer.className = this._propertyPaneContainerId;
                document.body.appendChild(this._propertyPaneContainer);
            }
        }
        else {
            // We know it will always exist in the Classic Page scenario.
            this._propertyPaneContainer = document.getElementById(this._propertyPaneContainerId) ||
                // classic page or when flexbox killswitch is on
                document.getElementById(PropertyPaneController.PROPERTY_PANE_CONTAINER_NOFLEXBOX_ID);
        }
    };
    /**
     * Removes all the children of the property pane container.
     */
    PropertyPaneController.prototype._clearPropertyPaneContainer = function () {
        while (this._propertyPaneContainer && this._propertyPaneContainer.firstChild) {
            this._propertyPaneContainer.removeChild(this._propertyPaneContainer.firstChild);
        }
    };
    /**
     * Reset configuration completion timeout.
     */
    PropertyPaneController.prototype._resetConfigurationCompleteTimeout = function () {
        this._clearConfigurationCompleteTimeout();
        this._configurationCompletionTimeout = window.setTimeout(this._fireConfigurationEvent, PropertyPaneController.CONFIGURATION_COMPLETE_TIMEOUT, this._currentlyConfiguredConsumerId, 2 /* ConfigurationComplete */);
    };
    /**
     * Clear configuration completion timeout.
     */
    PropertyPaneController.prototype._clearConfigurationCompleteTimeout = function () {
        if (this._configurationCompletionTimeout) {
            window.clearTimeout(this._configurationCompletionTimeout);
            this._configurationCompletionTimeout = undefined;
        }
    };
    /**
     * Method to check whether the currently configured property pane is reactive or not.
     */
    PropertyPaneController.prototype._isCurrentlyConfiguredPropertyPaneReactive = function () {
        if (this._currentlyConfiguredConsumerId) {
            var consumer = this._tryGetConsumer(this._currentlyConfiguredConsumerId);
            var isReactive = this._currentPropertyPaneData ?
                this._currentPropertyPaneData.isReactive :
                consumer && !consumer._isPropertyPaneReactive();
            return !!isReactive;
        }
        return false;
    };
    /**
     * Method to get a consumer instance.
     */
    PropertyPaneController.prototype._tryGetConsumer = function (id) {
        return this._consumers.get(id);
    };
    /**
     * Returns the property pane data which has only 'onClose' defined. This is used when we have to display
     * empty property pane, when there is nothing to configure.
     */
    PropertyPaneController.prototype._getEmptyPropertyPaneData = function () {
        return {
            webPartId: undefined,
            title: undefined,
            shouldResetState: true,
            onPropertyPaneFieldChanged: undefined,
            onConfigurationEvent: this._onConfigurationEvent,
            onRendered: undefined,
            properties: undefined,
            configuration: {
                pages: []
            },
            dynamicConfiguration: undefined
        };
    };
    /**
     * Property pane animation timeout (in milliseconds).
     */
    PropertyPaneController.ANIMATION_TIMEOUT = 400;
    /**
     * Property pane configuration complete timeout for Reactive components (in milliseconds).
     */
    PropertyPaneController.CONFIGURATION_COMPLETE_TIMEOUT = 5000;
    /**
     * Property pane container id.
     */
    PropertyPaneController.PROPERTY_PANE_CONTAINER_ID = 'spPropertyPaneContainer';
    /**
     * Property pane container id.
     */
    PropertyPaneController.PROPERTY_PANE_CONTAINER_NOFLEXBOX_ID = 'spPropertyPaneContainerNoFlexbox';
    return PropertyPaneController;
}());
/* harmony default export */ __webpack_exports__["default"] = (PropertyPaneController);


/***/ }),

/***/ "6DxA":
/*!**********************************************************************!*\
  !*** ./lib/propertyPaneController/PropertyPaneController.module.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PropertyPaneController.module.css */ "CF4K");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "7Awa":
/*!***********************************************!*\
  !*** external "@microsoft/sp-component-base" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7Awa__;

/***/ }),

/***/ "7ncH":
/*!***********************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneCustomField/PropertyPaneCustomField.js ***!
  \***********************************************************************************/
/*! exports provided: PropertyPaneCustomField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneCustomField", function() { return PropertyPaneCustomField; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "jVqW");
// Copyright (c) Microsoft. All rights reserved.

/**
 * Helper method to create a custom field on the PropertyPane.
 *
 * @remarks
 * The purpose of the custom field is to help the web part developer to add a custom control to
 * the PropertyPane. The PropertyPane supports a host of inbuilt field types. While
 * this list meets the demands of most web parts, but there are exceptional cases
 * when web parts have special needs and need a special control. The custom field
 * helps fill that gap.
 *
 * @param targetProperty - target property for this field. This parameter is being deprecated in future releases.
 * @param properties - Strongly typed Custom field properties.
 *
 * @beta
 */
function PropertyPaneCustomField(properties) {
    return {
        type: _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneFieldType"].Custom,
        targetProperty: undefined,
        properties: properties
    };
}


/***/ }),

/***/ "9kCM":
/*!*********************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneLink/PropertyPaneLink.js ***!
  \*********************************************************************/
/*! exports provided: PropertyPaneLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneLink", function() { return PropertyPaneLink; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "jVqW");
// Copyright (c) Microsoft. All rights reserved.

/**
 * Helper method to create a Link on the PropertyPane.
 * @param targetProperty - Target property the Link is associated to.
 * @param properties - Strongly typed Link properties.
 *
 * @public
 */
function PropertyPaneLink(targetProperty, properties) {
    return {
        type: _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneFieldType"].Link,
        targetProperty: undefined,
        properties: properties
    };
}


/***/ }),

/***/ "BHlC":
/*!*************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneSlider/PropertyPaneSlider.js ***!
  \*************************************************************************/
/*! exports provided: PropertyPaneSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneSlider", function() { return PropertyPaneSlider; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "jVqW");
// Copyright (c) Microsoft. All rights reserved.

/**
 * Helper method to create a Slider on the PropertyPane.
 * @param targetProperty - Target property the slider is associated to.
 * @param properties - Strongly typed Slider properties.
 *
 * @public
 */
function PropertyPaneSlider(targetProperty, properties) {
    return {
        type: _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneFieldType"].Slider,
        targetProperty: targetProperty,
        properties: properties
    };
}


/***/ }),

/***/ "CB9j":
/*!******************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneDropdown/IPropertyPaneDropdown.js ***!
  \******************************************************************************/
/*! exports provided: PropertyPaneDropdownOptionType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDropdownOptionType", function() { return PropertyPaneDropdownOptionType; });
// Copyright (c) Microsoft. All rights reserved.
/**
 * Specifies the type of option in a dropdown menu rendered by {@link PropertyPaneDropdown}.
 *
 * @public
 */
var PropertyPaneDropdownOptionType;
(function (PropertyPaneDropdownOptionType) {
    /**
     * Render normal menu item.
     */
    PropertyPaneDropdownOptionType[PropertyPaneDropdownOptionType["Normal"] = 0] = "Normal";
    /**
     * Render a divider.
     */
    PropertyPaneDropdownOptionType[PropertyPaneDropdownOptionType["Divider"] = 1] = "Divider";
    /**
     * Render menu item as a header.
     */
    PropertyPaneDropdownOptionType[PropertyPaneDropdownOptionType["Header"] = 2] = "Header";
})(PropertyPaneDropdownOptionType || (PropertyPaneDropdownOptionType = {}));


/***/ }),

/***/ "CF4K":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/propertyPaneController/PropertyPaneController.module.css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, "[id^=spPropertyPaneContainer].showPane_d3785813{width:340px}[id^=spPropertyPaneContainer].showPaneNarrow_d3785813{width:320px}[id^=spPropertyPaneContainerNoFlexbox].spPropertyPaneContainer_d3785813{position:absolute;top:50px;bottom:0;z-index:999}[dir=ltr] [id^=spPropertyPaneContainerNoFlexbox].spPropertyPaneContainer_d3785813{right:-340px}[dir=rtl] [id^=spPropertyPaneContainerNoFlexbox].spPropertyPaneContainer_d3785813{left:-340px}[dir=ltr] [id^=spPropertyPaneContainerNoFlexbox].showPane_d3785813{right:0}[dir=rtl] [id^=spPropertyPaneContainerNoFlexbox].showPane_d3785813{left:0}[dir=ltr] [id^=spPropertyPaneContainerNoFlexbox].showPaneNarrow_d3785813{right:0}[dir=rtl] [id^=spPropertyPaneContainerNoFlexbox].showPaneNarrow_d3785813{left:0}[dir=ltr] [id^=spPageChromeAppDiv].shrinkContent_d3785813{right:340px}[dir=rtl] [id^=spPageChromeAppDiv].shrinkContent_d3785813{left:340px}[dir=ltr] [id^=workbenchPageContent].shrinkContent_d3785813{right:340px}[dir=rtl] [id^=workbenchPageContent].shrinkContent_d3785813{left:340px}[dir=ltr] [id^=workbenchCommandBar].shrinkContent_d3785813{padding-right:340px}[dir=rtl] [id^=workbenchCommandBar].shrinkContent_d3785813{padding-left:340px}", ""]);



/***/ }),

/***/ "DWke":
/*!*******************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneTextField/PropertyPaneTextField.js ***!
  \*******************************************************************************/
/*! exports provided: PropertyPaneTextField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneTextField", function() { return PropertyPaneTextField; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "jVqW");
// Copyright (c) Microsoft. All rights reserved.

/**
 * Helper method to create a TextField on the PropertyPane.
 * @param targetProperty - Target property the textfield is associated to.
 * @param properties - Strongly typed TextField properties.
 *
 * @public
 */
function PropertyPaneTextField(targetProperty, properties) {
    return {
        type: _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneFieldType"].TextField,
        targetProperty: targetProperty,
        properties: properties
    };
}


/***/ }),

/***/ "KL1q":
/*!***********************************************************!*\
  !*** external "@microsoft/office-ui-fabric-react-bundle" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_KL1q__;

/***/ }),

/***/ "LB0u":
/*!**************************************************************************!*\
  !*** ./lib/propertyPaneController/PropertyPaneController.module.scss.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PropertyPaneController.module.css */ "6DxA");
var styles = {
    showPane: 'showPane_d3785813',
    showPaneNarrow: 'showPaneNarrow_d3785813',
    spPropertyPaneContainer: 'spPropertyPaneContainer_d3785813',
    shrinkContent: 'shrinkContent_d3785813'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "OtTU":
/*!**********************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneLink/IPropertyPaneLink.js ***!
  \**********************************************************************/
/*! exports provided: PopupWindowPosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupWindowPosition", function() { return PopupWindowPosition; });
// Copyright (c) Microsoft. All rights reserved.
/**
 * The position of pop up window.
 *
 * @public
 */
var PopupWindowPosition;
(function (PopupWindowPosition) {
    /**
     * PopupWindowPosition would be located in center of screen.
     */
    PopupWindowPosition[PopupWindowPosition["center"] = 0] = "center";
    /**
     * PopupWindowPosition would be located in right top of screen.
     */
    PopupWindowPosition[PopupWindowPosition["rightTop"] = 1] = "rightTop";
    /**
     * PopupWindowPosition would be located in left top of screen.
     */
    PopupWindowPosition[PopupWindowPosition["leftTop"] = 2] = "leftTop";
    /**
     * PopupWindowPosition would be located in right bottom of screen.
     */
    PopupWindowPosition[PopupWindowPosition["rightBottom"] = 3] = "rightBottom";
    /**
     * PopupWindowPosition would be located in left bottom of screen.
     */
    PopupWindowPosition[PopupWindowPosition["leftBottom"] = 4] = "leftBottom";
})(PopupWindowPosition || (PopupWindowPosition = {}));


/***/ }),

/***/ "Pk8u":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Pk8u__;

/***/ }),

/***/ "Q0xv":
/*!*******************************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneDynamicFieldSet/PropertyPaneDynamicFieldSet.js ***!
  \*******************************************************************************************/
/*! exports provided: PropertyPaneDynamicFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDynamicFieldSet", function() { return PropertyPaneDynamicFieldSet; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "jVqW");
// Copyright (c) Microsoft. All rights reserved.

/**
 * Helper method to create a Dynamic Data widget on the Property Pane for a set
 * of dynamic fields with a common data source.
 *
 * These fields can possibly share the same property based on the associated filters.
 * @param properties - Contains entries and options, described as below:
 *  entries - A set of entries to be configured by the widget. Each entry includes the target
 *           property and, optionally, the label to show.
 *  options - Options enabling customized values for callback, filters etc.,
 *           for the given set of dynamic fields.
 * @public
 */
function PropertyPaneDynamicFieldSet(properties) {
    return {
        type: _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneFieldType"].DynamicFieldSet,
        // Multiple entries have mutiple target properties hence not setting a target property here.
        targetProperty: '',
        properties: properties
    };
}


/***/ }),

/***/ "UK6p":
/*!*****************************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneHorizontalRule/PropertyPaneHorizontalRule.js ***!
  \*****************************************************************************************/
/*! exports provided: PropertyPaneHorizontalRule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneHorizontalRule", function() { return PropertyPaneHorizontalRule; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "jVqW");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file PropertyPaneHorizontalRule.
 */

/**
 * Helper method to create a Horizontal Rule on the PropertyPane.
 * @param properties - Strongly typed Horizontal Rule properties.
 *
 * @public
 */
function PropertyPaneHorizontalRule() {
    return {
        type: _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneFieldType"].HorizontalRule,
        targetProperty: undefined,
        properties: undefined
    };
}


/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "XFyi":
/*!*************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneButton/PropertyPaneButton.js ***!
  \*************************************************************************/
/*! exports provided: PropertyPaneButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneButton", function() { return PropertyPaneButton; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "jVqW");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file PropertyPaneButton.
 */

/**
 * Helper method to create a Button on the PropertyPane.
 * @param targetProperty - Target property the Button is associated to.
 * @param properties - Strongly typed Button properties.
 *
 * @public
 */
function PropertyPaneButton(targetProperty, properties) {
    return {
        type: _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneFieldType"].Button,
        targetProperty: targetProperty,
        properties: properties
    };
}


/***/ }),

/***/ "cDcd":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_cDcd__;

/***/ }),

/***/ "eNgD":
/*!**************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneButton/IPropertyPaneButton.js ***!
  \**************************************************************************/
/*! exports provided: PropertyPaneButtonType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneButtonType", function() { return PropertyPaneButtonType; });
// Copyright (c) Microsoft. All rights reserved.
/**
 * Enum for all the supported button types.
 *
 * @public
 */
var PropertyPaneButtonType;
(function (PropertyPaneButtonType) {
    /**
     * Optional completion action.
     *
     * @remarks
     * Typically used at the end of a form or task when paired with the Primary button OR
     * as a standalone button to undo an action.
     * Examples: "Done" button which closes a container but doesn't make a server call or
     * an "Undo" button when a user is uploading a file in OneDrive.
     */
    PropertyPaneButtonType[PropertyPaneButtonType["Normal"] = 0] = "Normal";
    /**
     * Preferred completion action when paired with a Standard button.
     *
     * @remarks
     * Typically used at the end of a task or form.
     * Examples: "Create", "Save", "Send" which makes a server call.
     */
    PropertyPaneButtonType[PropertyPaneButtonType["Primary"] = 1] = "Primary";
    /**
     * Hero button.
     */
    PropertyPaneButtonType[PropertyPaneButtonType["Hero"] = 2] = "Hero";
    /**
     * Always used as a set with both Standard and Primary compound buttons.
     *
     * @remarks
     * Typically used in a confirmation dialog.
     * Examples: A confirmation dialog when a user discards a form or task with a possible
     * significant time investment such as an email or a complex form
     */
    PropertyPaneButtonType[PropertyPaneButtonType["Compound"] = 3] = "Compound";
    /**
     * Optional actions.
     *
     * @remarks
     * Typically used in a command bar at the top of a view, panel and inside an inline command bar.
     * Examples: Command bar at the top of OneDrive, Outlook, SharePoint. Inline command bar on the
     * top of SharePoint web parts.
     */
    PropertyPaneButtonType[PropertyPaneButtonType["Command"] = 4] = "Command";
    /**
     * Same usage as Command button, when real estate does not allow for icons + labels or as secondary
     * actions within the command bar.
     *
     * @remarks
     * Typically used in Command bar in small and medium responsive web breakpoints. Also used on objects.
     * Examples: OneDrive small and medium responsive web breakpoint Command Bars and view icons within the
     * Command Bar. In SharePoint and OneDrive, Cards with social actions and images which allow users to
     * access the image picker. In SharePoint, formatting experiences such as formatting a story within the
     * Authoring experience. In Calendar, in the bottom of an event creation Callout when clicking inside
     * an empty time range.
     */
    PropertyPaneButtonType[PropertyPaneButtonType["Icon"] = 5] = "Icon";
})(PropertyPaneButtonType || (PropertyPaneButtonType = {}));


/***/ }),

/***/ "fJhm":
/*!*****************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneCheckBox/PropertyPaneCheckbox.js ***!
  \*****************************************************************************/
/*! exports provided: PropertyPaneCheckbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneCheckbox", function() { return PropertyPaneCheckbox; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "jVqW");
// Copyright (c) Microsoft. All rights reserved.

/**
 * Helper method to create a Checkbox on the PropertyPane.
 * @param targetProperty - Target property the checkbox is associated to.
 * @param properties - Strongly typed Checkbox properties.
 *
 * @public
 */
function PropertyPaneCheckbox(targetProperty, properties) {
    return {
        type: _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneFieldType"].CheckBox,
        targetProperty: targetProperty,
        properties: properties
    };
}


/***/ }),

/***/ "faye":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_faye__;

/***/ }),

/***/ "fglE":
/*!**********************************************!*\
  !*** external "@ms/uifabric-styling-bundle" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_fglE__;

/***/ }),

/***/ "h6Kt":
/*!**************************************************************!*\
  !*** ./lib/propertyPaneDynamicData/IDynamicConfiguration.js ***!
  \**************************************************************/
/*! exports provided: DynamicDataSharedDepth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicDataSharedDepth", function() { return DynamicDataSharedDepth; });
/**
 * Enum for the possible values of shared depth of the dynamic data reference.
 *
 * @public
 */
var DynamicDataSharedDepth;
(function (DynamicDataSharedDepth) {
    /**
     * Indicates that nothing is shared.
     */
    DynamicDataSharedDepth[DynamicDataSharedDepth["None"] = 0] = "None";
    /**
     * Indicates that the dynamic data source is shared.
     */
    DynamicDataSharedDepth[DynamicDataSharedDepth["Source"] = 1] = "Source";
    /**
     * Indicates that both the dynamic data source and the property are shared.
     */
    DynamicDataSharedDepth[DynamicDataSharedDepth["Property"] = 2] = "Property";
})(DynamicDataSharedDepth || (DynamicDataSharedDepth = {}));


/***/ }),

/***/ "j2/K":
/*!*******************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js ***!
  \*******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "jOlS":
/*!************************************************!*\
  !*** external "@microsoft/load-themed-styles" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_jOlS__;

/***/ }),

/***/ "jVqW":
/*!************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneField/IPropertyPaneField.js ***!
  \************************************************************************/
/*! exports provided: PropertyPaneFieldType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneFieldType", function() { return PropertyPaneFieldType; });
// Copyright (c) Microsoft. All rights reserved.
/**
 * Enum for all the supported PropertyPane field types.
 *
 * Names should be consistent with those in office-ui-fabric-react, be careful to get letter casing correct.
 *
 * @public
 */
var PropertyPaneFieldType;
(function (PropertyPaneFieldType) {
    /**
     * Custom field.
     */
    PropertyPaneFieldType[PropertyPaneFieldType["Custom"] = 1] = "Custom";
    /**
     * Checkbox field.
     */
    PropertyPaneFieldType[PropertyPaneFieldType["CheckBox"] = 2] = "CheckBox";
    /**
     * TextField field.
     */
    PropertyPaneFieldType[PropertyPaneFieldType["TextField"] = 3] = "TextField";
    /**
     * Toggle field.
     */
    PropertyPaneFieldType[PropertyPaneFieldType["Toggle"] = 5] = "Toggle";
    /**
     * Dropdown field.
     */
    PropertyPaneFieldType[PropertyPaneFieldType["Dropdown"] = 6] = "Dropdown";
    /**
     * Label field.
     */
    PropertyPaneFieldType[PropertyPaneFieldType["Label"] = 7] = "Label";
    /**
     * Slider field.
     */
    PropertyPaneFieldType[PropertyPaneFieldType["Slider"] = 8] = "Slider";
    /**
     * Heading field.
     */
    PropertyPaneFieldType[PropertyPaneFieldType["Heading"] = 9] = "Heading";
    /**
     * Choice Group field.
     */
    PropertyPaneFieldType[PropertyPaneFieldType["ChoiceGroup"] = 10] = "ChoiceGroup";
    /**
     * Button field.
     */
    PropertyPaneFieldType[PropertyPaneFieldType["Button"] = 11] = "Button";
    /**
     * Horizontal Rule field.
     */
    PropertyPaneFieldType[PropertyPaneFieldType["HorizontalRule"] = 12] = "HorizontalRule";
    /**
     * Link field.
     */
    PropertyPaneFieldType[PropertyPaneFieldType["Link"] = 13] = "Link";
    /**
     * Dynamic data field.
     * @public
     */
    PropertyPaneFieldType[PropertyPaneFieldType["DynamicField"] = 14] = "DynamicField";
    /**
     * Dynamic Text Field
     *
     * @beta
     * @deprecated - Please use DynamicField
     */
    PropertyPaneFieldType[PropertyPaneFieldType["DynamicTextField"] = 15] = "DynamicTextField";
    /**
     * A set of dynamic fields.
     * @public
     */
    PropertyPaneFieldType[PropertyPaneFieldType["DynamicFieldSet"] = 16] = "DynamicFieldSet";
    /**
     * Spin button
     *
     * @alpha
     */
    PropertyPaneFieldType[PropertyPaneFieldType["SpinButton"] = 17] = "SpinButton";
})(PropertyPaneFieldType || (PropertyPaneFieldType = {}));


/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: _PropertyPaneController, PropertyPaneFieldType, PropertyPaneCustomField, PropertyPaneButtonType, PropertyPaneButton, PropertyPaneCheckbox, PropertyPaneChoiceGroup, PropertyPaneDropdownOptionType, PropertyPaneDropdown, PropertyPaneDynamicField, PropertyPaneDynamicFieldSet, PropertyPaneHorizontalRule, PropertyPaneLabel, PopupWindowPosition, PropertyPaneLink, PropertyPaneSlider, PropertyPaneTextField, PropertyPaneDynamicTextField, PropertyPaneToggle, PropertyPaneSpinButton, DynamicDataSharedDepth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _propertyPaneController_PropertyPaneController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./propertyPaneController/PropertyPaneController */ "626p");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_PropertyPaneController", function() { return _propertyPaneController_PropertyPaneController__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneField/IPropertyPaneField */ "jVqW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneFieldType", function() { return _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_1__["PropertyPaneFieldType"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneCustomField_PropertyPaneCustomField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneCustomField/PropertyPaneCustomField */ "7ncH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneCustomField", function() { return _propertyPaneFields_propertyPaneCustomField_PropertyPaneCustomField__WEBPACK_IMPORTED_MODULE_2__["PropertyPaneCustomField"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneButton_IPropertyPaneButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneButton/IPropertyPaneButton */ "eNgD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneButtonType", function() { return _propertyPaneFields_propertyPaneButton_IPropertyPaneButton__WEBPACK_IMPORTED_MODULE_3__["PropertyPaneButtonType"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneButton_PropertyPaneButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneButton/PropertyPaneButton */ "XFyi");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneButton", function() { return _propertyPaneFields_propertyPaneButton_PropertyPaneButton__WEBPACK_IMPORTED_MODULE_4__["PropertyPaneButton"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneCheckBox_PropertyPaneCheckbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneCheckBox/PropertyPaneCheckbox */ "fJhm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneCheckbox", function() { return _propertyPaneFields_propertyPaneCheckBox_PropertyPaneCheckbox__WEBPACK_IMPORTED_MODULE_5__["PropertyPaneCheckbox"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneChoiceGroup_PropertyPaneChoiceGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneChoiceGroup/PropertyPaneChoiceGroup */ "voF1");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneChoiceGroup", function() { return _propertyPaneFields_propertyPaneChoiceGroup_PropertyPaneChoiceGroup__WEBPACK_IMPORTED_MODULE_6__["PropertyPaneChoiceGroup"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneDropdown_IPropertyPaneDropdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneDropdown/IPropertyPaneDropdown */ "CB9j");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDropdownOptionType", function() { return _propertyPaneFields_propertyPaneDropdown_IPropertyPaneDropdown__WEBPACK_IMPORTED_MODULE_7__["PropertyPaneDropdownOptionType"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneDropdown_PropertyPaneDropdown__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneDropdown/PropertyPaneDropdown */ "v2eY");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDropdown", function() { return _propertyPaneFields_propertyPaneDropdown_PropertyPaneDropdown__WEBPACK_IMPORTED_MODULE_8__["PropertyPaneDropdown"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneDynamicField_PropertyPaneDynamicField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneDynamicField/PropertyPaneDynamicField */ "xFAS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDynamicField", function() { return _propertyPaneFields_propertyPaneDynamicField_PropertyPaneDynamicField__WEBPACK_IMPORTED_MODULE_9__["PropertyPaneDynamicField"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneDynamicFieldSet_PropertyPaneDynamicFieldSet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneDynamicFieldSet/PropertyPaneDynamicFieldSet */ "Q0xv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDynamicFieldSet", function() { return _propertyPaneFields_propertyPaneDynamicFieldSet_PropertyPaneDynamicFieldSet__WEBPACK_IMPORTED_MODULE_10__["PropertyPaneDynamicFieldSet"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneHorizontalRule_PropertyPaneHorizontalRule__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneHorizontalRule/PropertyPaneHorizontalRule */ "UK6p");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneHorizontalRule", function() { return _propertyPaneFields_propertyPaneHorizontalRule_PropertyPaneHorizontalRule__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneHorizontalRule"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneLabel_PropertyPaneLabel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneLabel/PropertyPaneLabel */ "tj0H");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneLabel", function() { return _propertyPaneFields_propertyPaneLabel_PropertyPaneLabel__WEBPACK_IMPORTED_MODULE_12__["PropertyPaneLabel"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneLink_IPropertyPaneLink__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneLink/IPropertyPaneLink */ "OtTU");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PopupWindowPosition", function() { return _propertyPaneFields_propertyPaneLink_IPropertyPaneLink__WEBPACK_IMPORTED_MODULE_13__["PopupWindowPosition"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneLink_PropertyPaneLink__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneLink/PropertyPaneLink */ "9kCM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneLink", function() { return _propertyPaneFields_propertyPaneLink_PropertyPaneLink__WEBPACK_IMPORTED_MODULE_14__["PropertyPaneLink"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneSlider_PropertyPaneSlider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneSlider/PropertyPaneSlider */ "BHlC");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneSlider", function() { return _propertyPaneFields_propertyPaneSlider_PropertyPaneSlider__WEBPACK_IMPORTED_MODULE_15__["PropertyPaneSlider"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneTextField_PropertyPaneTextField__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneTextField/PropertyPaneTextField */ "DWke");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneTextField", function() { return _propertyPaneFields_propertyPaneTextField_PropertyPaneTextField__WEBPACK_IMPORTED_MODULE_16__["PropertyPaneTextField"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneDynamicTextField_PropertyPaneDynamicTextField__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneDynamicTextField/PropertyPaneDynamicTextField */ "t0B8");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDynamicTextField", function() { return _propertyPaneFields_propertyPaneDynamicTextField_PropertyPaneDynamicTextField__WEBPACK_IMPORTED_MODULE_17__["PropertyPaneDynamicTextField"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneToggle_PropertyPaneToggle__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneToggle/PropertyPaneToggle */ "zvYO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneToggle", function() { return _propertyPaneFields_propertyPaneToggle_PropertyPaneToggle__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneToggle"]; });

/* harmony import */ var _propertyPaneFields_propertyPaneSpinButton_PropertyPaneSpinButton__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./propertyPaneFields/propertyPaneSpinButton/PropertyPaneSpinButton */ "n50X");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneSpinButton", function() { return _propertyPaneFields_propertyPaneSpinButton_PropertyPaneSpinButton__WEBPACK_IMPORTED_MODULE_19__["PropertyPaneSpinButton"]; });

/* harmony import */ var _propertyPaneDynamicData_IDynamicConfiguration__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./propertyPaneDynamicData/IDynamicConfiguration */ "h6Kt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DynamicDataSharedDepth", function() { return _propertyPaneDynamicData_IDynamicConfiguration__WEBPACK_IMPORTED_MODULE_20__["DynamicDataSharedDepth"]; });

/**
 * SharePoint Framework property pane.
 *
 * @remarks
 * Helps create the property pane for the SharePoint components such as web parts, canvas etc.,
 *
 * @packagedocumentation
 */























/***/ }),

/***/ "n50X":
/*!*********************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneSpinButton/PropertyPaneSpinButton.js ***!
  \*********************************************************************************/
/*! exports provided: PropertyPaneSpinButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneSpinButton", function() { return PropertyPaneSpinButton; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "jVqW");
// Copyright (c) Microsoft. All rights reserved.

/**
 * Helper method to create a SpinButton on the property pane.
 * @param targetProperty - Target property the spin button is associated to.
 * @param properties - Strongly typed spin button properties.
 *
 * @alpha
 */
function PropertyPaneSpinButton(targetProperty, properties) {
    return {
        type: _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneFieldType"].SpinButton,
        targetProperty: targetProperty,
        properties: properties
    };
}


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

/***/ "t0B8":
/*!*********************************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneDynamicTextField/PropertyPaneDynamicTextField.js ***!
  \*********************************************************************************************/
/*! exports provided: PropertyPaneDynamicTextField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDynamicTextField", function() { return PropertyPaneDynamicTextField; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "jVqW");
// Copyright (c) Microsoft. All rights reserved.

/**
 * Helper method to create a Dynamic TextField on the PropertyPane.
 * @param targetProperty - Target property the dynamic textfield is associated to.
 * @param properties - Properties of the PropertyPaneDynamicTextField.
 *
 * @beta
 * @deprecated - This has been replaced by PropertyPaneDynamicField
 */
function PropertyPaneDynamicTextField(targetProperty, properties) {
    return {
        type: _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneFieldType"].DynamicTextField,
        targetProperty: targetProperty,
        // Properties are fixed up in BaseClientSideWebPart._internalGetPropertyPaneData()
        properties: properties
    };
}


/***/ }),

/***/ "tj0H":
/*!***********************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneLabel/PropertyPaneLabel.js ***!
  \***********************************************************************/
/*! exports provided: PropertyPaneLabel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneLabel", function() { return PropertyPaneLabel; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "jVqW");
// Copyright (c) Microsoft. All rights reserved.

/**
 * Helper method to create a Label on the PropertyPane.
 * @param targetProperty - Target property the label is associated to.
 * @param properties - Strongly typed Label properties.
 *
 * @public
 */
function PropertyPaneLabel(targetProperty, properties) {
    return {
        type: _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneFieldType"].Label,
        targetProperty: targetProperty,
        properties: properties
    };
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

/***/ "v2eY":
/*!*****************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneDropdown/PropertyPaneDropdown.js ***!
  \*****************************************************************************/
/*! exports provided: PropertyPaneDropdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDropdown", function() { return PropertyPaneDropdown; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "jVqW");
// Copyright (c) Microsoft. All rights reserved.

/**
 * Helper method to create a Dropdown on the PropertyPane.
 * @param targetProperty - Target property the dropdown is associated to.
 * @param properties - Strongly typed Dropdown properties.
 *
 * @public
 */
function PropertyPaneDropdown(targetProperty, properties) {
    return {
        type: _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneFieldType"].Dropdown,
        targetProperty: targetProperty,
        properties: properties
    };
}


/***/ }),

/***/ "voF1":
/*!***********************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneChoiceGroup/PropertyPaneChoiceGroup.js ***!
  \***********************************************************************************/
/*! exports provided: PropertyPaneChoiceGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneChoiceGroup", function() { return PropertyPaneChoiceGroup; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "jVqW");
// Copyright (c) Microsoft. All rights reserved.

/**
 * Helper method to create a Choice Group on the PropertyPane.
 * @param targetProperty - Target property the choice group is associated to.
 * @param properties - Strongly typed Choice Group properties.
 *
 * @public
 */
function PropertyPaneChoiceGroup(targetProperty, properties) {
    return {
        type: _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneFieldType"].ChoiceGroup,
        targetProperty: targetProperty,
        properties: properties
    };
}


/***/ }),

/***/ "vpy3":
/*!*******************************!*\
  !*** external "resx-strings" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vpy3__;

/***/ }),

/***/ "wxtz":
/*!****************************************!*\
  !*** external "@microsoft/decorators" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_wxtz__;

/***/ }),

/***/ "xFAS":
/*!*************************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneDynamicField/PropertyPaneDynamicField.js ***!
  \*************************************************************************************/
/*! exports provided: PropertyPaneDynamicField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDynamicField", function() { return PropertyPaneDynamicField; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "jVqW");
// Copyright (c) Microsoft. All rights reserved.

/**
 * Helper method to create a Dynamic Data widget on the PropertyPane for a dynamic field.
 *
 * @param targetProperty - Target property the Dynamic Data widget is associated to.
 * @param options - Options to enable customized values for callback, filters etc.,
 *                  for the dynamic field.
 * @public
 */
function PropertyPaneDynamicField(targetProperty, properties) {
    return {
        type: _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneFieldType"].DynamicField,
        targetProperty: targetProperty,
        properties: properties
    };
}


/***/ }),

/***/ "zvYO":
/*!*************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneToggle/PropertyPaneToggle.js ***!
  \*************************************************************************/
/*! exports provided: PropertyPaneToggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneToggle", function() { return PropertyPaneToggle; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "jVqW");
// Copyright (c) Microsoft. All rights reserved.

/**
 * Helper method to create a Toggle on the PropertyPane.
 * @param targetProperty - Target property the toggle is associated to.
 * @param properties - Strongly typed Toggle properties.
 *
 * @public
 */
function PropertyPaneToggle(targetProperty, properties) {
    return {
        type: _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneFieldType"].Toggle,
        targetProperty: targetProperty,
        properties: properties
    };
}


/***/ })

/******/ })}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));;


/***/ }),

/***/ "@microsoft/decorators":
/*!****************************************!*\
  !*** external "@microsoft/decorators" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_decorators__;

/***/ }),

/***/ "@microsoft/load-themed-styles":
/*!************************************************!*\
  !*** external "@microsoft/load-themed-styles" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_load_themed_styles__;

/***/ }),

/***/ "@microsoft/office-ui-fabric-react-bundle":
/*!***********************************************************!*\
  !*** external "@microsoft/office-ui-fabric-react-bundle" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_office_ui_fabric_react_bundle__;

/***/ }),

/***/ "@microsoft/sp-component-base":
/*!***********************************************!*\
  !*** external "@microsoft/sp-component-base" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_component_base__;

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

/***/ }),

/***/ "@ms/uifabric-styling-bundle":
/*!**********************************************!*\
  !*** external "@ms/uifabric-styling-bundle" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_uifabric_styling_bundle__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom__;

/***/ })

/******/ })});;
//# sourceMappingURL=sp-property-pane_en-us.js.map