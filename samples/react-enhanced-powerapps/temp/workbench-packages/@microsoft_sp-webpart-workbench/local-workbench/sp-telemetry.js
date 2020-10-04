define("8217e442-8ed3-41fd-957d-b112e841286a_0.8.24", ["@microsoft/sp-lodash-subset","@microsoft/sp-core-library","@microsoft/sp-diagnostics","@ms/odsp-utilities-bundle"], function(__WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_y88i__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"sp-telemetry": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({"vendors~sp-client-telemetry-aria":"vendors~sp-client-telemetry-aria","sp-client-telemetry-aria":"sp-client-telemetry-aria","vendors~sp-client-telemetry-aria-webjs":"vendors~sp-client-telemetry-aria-webjs","sp-client-telemetry-aria-webjs":"sp-client-telemetry-aria-webjs"}[chunkId]||chunkId) + "_" + {"vendors~sp-client-telemetry-aria":"5faa53a8670d587e1ef4","sp-client-telemetry-aria":"08869d8e4fa227dc23f3","vendors~sp-client-telemetry-aria-webjs":"4b81a960d8104512ac97","sp-client-telemetry-aria-webjs":"248b979973305f881e1b"}[chunkId] + ".js"
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
/******/ 	var jsonpArray = window["webpackJsonp_8217e442_8ed3_41fd_957d_b112e841286a_0_8_24"] = window["webpackJsonp_8217e442_8ed3_41fd_957d_b112e841286a_0_8_24"] || [];
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
/******/ 	  var regex = (typeof spScriptNamePattern !== 'undefined') ? spScriptNamePattern : new RegExp('\\/sp-telemetry(_[a-z0-9-]+)*\\.js', 'i');
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

/***/ "4Fgs":
/*!************************************!*\
  !*** ./lib/ABExperimentWrapper.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * We need to wrap ABExperiment since it does not comply with TSDoc
 * documentation requirements for apis.
 * @internal
 */
var ABExperimentWrapper = /** @class */ (function (_super) {
    __extends(ABExperimentWrapper, _super);
    function ABExperimentWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ABExperimentWrapper;
}(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["ABExperiment"]));
/* harmony default export */ __webpack_exports__["default"] = (ABExperimentWrapper);


/***/ }),

/***/ "5yjk":
/*!*****************************************!*\
  !*** ./lib/TelemetrySettingsManager.js ***!
  \*****************************************/
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
var TelemetrySettingsManager = /** @class */ (function () {
    function TelemetrySettingsManager() {
    }
    TelemetrySettingsManager.initialize = function (settings) {
        this.settings = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"])(settings);
        this._initialized = true;
        this._normalizeContextIds();
    };
    TelemetrySettingsManager.updateSettings = function (settings) {
        this.settings = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__["merge"])(this.settings, settings);
        this._normalizeContextIds();
    };
    Object.defineProperty(TelemetrySettingsManager, "isInitialized", {
        get: function () {
            return this._initialized;
        },
        enumerable: true,
        configurable: true
    });
    TelemetrySettingsManager._normalizeId = function (id) {
        var guid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(id);
        return guid ? guid.toString() : id;
    };
    TelemetrySettingsManager._normalizeContextIds = function () {
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
    TelemetrySettingsManager._initialized = false;
    return TelemetrySettingsManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (TelemetrySettingsManager);


/***/ }),

/***/ "Pk8u":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Pk8u__;

/***/ }),

/***/ "RrtT":
/*!**************************!*\
  !*** ./lib/Telemetry.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ABExperimentWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ABExperimentWrapper */ "4Fgs");
/* harmony import */ var _AriaLogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AriaLogger */ "n5Pd");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _TelemetrySettingsManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TelemetrySettingsManager */ "5yjk");
/* harmony import */ var _Api_BeaconHandlers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Api/BeaconHandlers */ "p6/0");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__);
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */







// Killswitch Guid for stop logging BEACONHANDLER
var BEACONHANDLER_KILLSWITCH = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__["Guid"].parse('c2150266-825e-4777-a629-3e7cb79c91f4');
/**
 * Telemetry class initializes the telemetry pipeline and connect to backend server.
 * Telemetry contains a set of internal APIs that collects data and reports data via
 * the pipeline. The APIs consist of
 *  -- TraceLogger - for logging diagnostic information
 *  -- EngagementLogger - for tracking user interaction with a feature
 *  -- QOS - quality of service, i.e. collecting statistics for how often an operation succeeds/fails
 *  -- PerformanceLogger - for tracking performance data.
 *
 * @internal
 */
var Telemetry = /** @class */ (function () {
    function Telemetry() {
    }
    Object.defineProperty(Telemetry, "buildNumber", {
        /**
         * The build number of the manifests provided by the initial page load
         */
        get: function () {
            return Telemetry._buildNumber;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initializes the telemetry pipelines based on telemetry settings.
     * Workload name indicates which workload the telemetry data belongs to.
     */
    Telemetry.initialize = function (workloadName, settings) {
        if (!Telemetry._isInitialized) {
            this._workload = workloadName;
            this._originalSession = settings.correlationId;
            _TelemetrySettingsManager__WEBPACK_IMPORTED_MODULE_4__["default"].initialize(settings);
            // This is the telemetry settings with normalized Ids after TelemetrySettingsManager initialize.
            var telemetrySettings = _TelemetrySettingsManager__WEBPACK_IMPORTED_MODULE_4__["default"].settings;
            if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__["_SPKillSwitch"].isActivated(BEACONHANDLER_KILLSWITCH, '07/17/2019', 'StopBeaconLogging')) {
                if (Telemetry._shouldEnable(settings.environment)) {
                    var beaconHandler = new _Api_BeaconHandlers__WEBPACK_IMPORTED_MODULE_5__["default"]();
                    _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["BeaconCache"].addToLoggingManager(this._workload, beaconHandler);
                    _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Beacon"].addToLoggingManager();
                }
            }
            window['disableBeaconLogToConsole'] = true; // tslint:disable-line:no-string-literal
            Telemetry._initializeExperiments(telemetrySettings);
            Telemetry._buildNumber = settings.buildNumber;
            Telemetry._isInitialized = true;
        }
    };
    /**
     * Initializes the telemetry pipelines that depend on odsp-telemetry
     */
    Telemetry.registerTelemetryBackend = function () {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"]._addHandler(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Engagement"]);
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_QosLogger"].instance.setLogger(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Qos"]); // tslint:disable-line:no-any
        Telemetry._initializeAria(this._workload);
    };
    /**
     * Loads odsp-telemetry dependencies and
     * processes all the logs in real time (QoS, Engagement and Performance)
     */
    Telemetry.startRealTimeProcessing = function () {
        Telemetry.registerTelemetryBackend();
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].startRealTimeProcessing();
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"].startRealTimeProcessing();
    };
    Object.defineProperty(Telemetry, "isInitialized", {
        /**
         * Returns true if telemetry has been already initialized.
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
    Telemetry.updateSettings = function (settings, workloadName) {
        if (!Telemetry.isInitialized) {
            return;
        }
        var prevSiteId = _TelemetrySettingsManager__WEBPACK_IMPORTED_MODULE_4__["default"].settings.siteId;
        var prevWebId = _TelemetrySettingsManager__WEBPACK_IMPORTED_MODULE_4__["default"].settings.webId;
        _TelemetrySettingsManager__WEBPACK_IMPORTED_MODULE_4__["default"].updateSettings(settings);
        if (!this._originalSession) {
            this._originalSession = settings.correlationId;
        }
        var isDifferentWorkLoad = workloadName && this._workload !== workloadName;
        if (isDifferentWorkLoad) {
            this._workload = workloadName;
            Telemetry._updateBeaconSettings();
        }
        if (isDifferentWorkLoad ||
            _TelemetrySettingsManager__WEBPACK_IMPORTED_MODULE_4__["default"].settings.siteId !== prevSiteId ||
            _TelemetrySettingsManager__WEBPACK_IMPORTED_MODULE_4__["default"].settings.webId !== prevWebId) {
            // Re-initialize the Aria logger and experiments if doing cross-site in-page navigation
            Telemetry._initializeAria(this._workload, true /** update aria logger settings */);
            Telemetry._initializeExperiments(_TelemetrySettingsManager__WEBPACK_IMPORTED_MODULE_4__["default"].settings);
        }
        if (settings.buildNumber) {
            Telemetry._buildNumber = settings.buildNumber;
        }
    };
    Telemetry._initializeAria = function (workloadName, update) {
        if (update === void 0) { update = false; }
        var settings = _TelemetrySettingsManager__WEBPACK_IMPORTED_MODULE_4__["default"].settings;
        if (settings && Telemetry._shouldEnable(settings.environment)) {
            var token = Telemetry._getAriaToken(workloadName, settings.environment);
            if (token) {
                var authenticated = !!settings.loginName;
                var ariaContext = {
                    isAuthenticated: authenticated,
                    accountType: authenticated ? _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["AccountType"].Business : _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["AccountType"].BusinessAnonymous,
                    market: settings.currentUICultureName,
                    session: settings.correlationId,
                    version: settings.buildNumber,
                    manifest: settings.clientSideApplicationId,
                    userId: settings.systemUserKey,
                    siteSubscriptionId: settings.siteSubscriptionId,
                    siteId: settings.siteId,
                    webId: settings.webId,
                    webTemplateId: settings.webTemplateId,
                    farmLabel: settings.farmLabel,
                    environment: settings.environment,
                    workload: workloadName,
                    completenessCallbackEndpoint: settings.completenessCallbackEndpoint,
                    originalSession: this._originalSession
                };
                if (update) {
                    _AriaLogger__WEBPACK_IMPORTED_MODULE_2__["default"].update(token, ariaContext);
                }
                else {
                    _AriaLogger__WEBPACK_IMPORTED_MODULE_2__["default"].initialize(token, ariaContext);
                }
            }
        }
    };
    Telemetry._shouldEnable = function (env) {
        return !!env && location.hostname !== 'localhost' && true;
    };
    Telemetry._getAriaToken = function (workloadName, env) {
        var workloadTokens = this._workloadsAriaTokens.default;
        if (workloadName.toLowerCase() === 'sphomenext') {
            workloadTokens = this._workloadsAriaTokens.sphome;
        }
        var token;
        switch (env.toLowerCase()) {
            case 'edog':
            case 'prodbubble':
                token = workloadTokens.ppeToken;
                break;
            default:
                // Prod/DProd/etc all go to Prod Aria tenant.
                // Env value can tell the data apart.
                token = workloadTokens.prodToken;
                break;
        }
        return token;
    };
    Telemetry._initializeExperiments = function (settings) {
        _ABExperimentWrapper__WEBPACK_IMPORTED_MODULE_1__["default"].Init({
            userLoginName: settings.loginName,
            farmLabel: settings.farmLabel,
            siteSubscriptionId: settings.siteSubscriptionId,
            siteId: settings.siteId,
            webId: settings.webId
        });
    };
    Telemetry._updateBeaconSettings = function () {
        _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["BeaconCache"].eventNamePrefix = this._workload;
        _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Beacon"].updateSettings(this._workload);
    };
    Telemetry._isInitialized = false;
    Telemetry._workloadsAriaTokens = {
        default: {
            ppeToken: '930040d5f2d14c649c8f4a22a062a2af-a8806003-7416-4799-9a3a-31de703592e5-6968',
            prodToken: '28f004ff2be44e8997a6f113043d583d-3f663b9a-4911-45b4-be6d-e450ca91e808-7336'
        },
        sphome: {
            ppeToken: '956b7a4e25714a6e9cd155df35b54244-719463e8-67d7-419b-b4ba-8dc8355ac519-6720',
            prodToken: '230b2349e5114b9bbfb4e41e8bb0bd31-a49e91ac-3be8-4d87-862e-63473299dfdf-7397'
        }
    };
    return Telemetry;
}());
/* harmony default export */ __webpack_exports__["default"] = (Telemetry);


/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "kJO1":
/*!******************************************************!*\
  !*** ./lib/Api/Performance/BasePerformanceLogger.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__);



var PERFORMANCE_LOGGER;
var PRIVATECDN_AUTHORITY = 'https://privatecdn.sharepointonline.com/';
var PRIVATECDN_STAGING_AUTHORITY = 'https://privatecdn-staging.sharepointonline.com/';
var PUBLICCDN_AUTHORITY = 'https://publiccdn.sharepointonline.com/';
var PUBLICCDN_STAGING_AUTHORITY = 'publiccdn-staging.sharepointonline.com';
// VROOM thumbnail URL regex, return thumbnail from alt stream cache if available before redirecting to MeTA
var VROOM_META_CACHE_REGEX = /(\/thumbnails\/\d\/(.*?)\/content\/?\?(.*?)preferNoRedirect=(.*?)$)/i;
// Media Thumbnail URL regex. Core service responsible for generating the thumbnail.
var META_REGEX = /(.svc.ms\/transform\/thumbnail\/?(|(\?(.*?)))$)/i;
// getPreview.ashx end point to DocViz service. This service is under deprecation process.
var DOCVIZ_REGEX = /(\/_layouts\/15\/getpreview.ashx\/?(|(\?(.*?)))$)/i;
var CONNECTIONTYPE_KEY = 'spConnectionType';
var PRIVATECDNENABLED_KEY = 'PrivateCDNEnabled';
var PUBLICCDNENABLED_KEY = 'PublicCDNEnabled';
// Dimention name capturing CDN status for current tenant.
var CDNSTATUS = 'CDNStatus';
// CND is not enabled for current tenant
var CDNDISABLED = 'Disabled';
// Both Public and private CDN are enabled for current tenant.
var PRIVATEPUBLIC = 'PrivatePublic';
// Only Private CDN is enabled for current tenant.
var PRIVATE = 'Private';
// Only Public CDN is enabled for current tenant.
var PUBLIC = 'Public';
var CDNSTATUS_KILLSWITCH = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].parse('7da3f7ec-90b4-45b0-b4bc-40376bd3c304');
var IGNORE_NAV_START_OFFSET = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].parse('28e3189f-2ba9-4534-9c22-381d532f5b79');
/**
 * Usage:
 * 1. Begin an application session with a aggregatable name (e.g. level1.level2.level3) at the very beginning.
 *  e.g.
 *    BasePerformanceLogger.initializeApplication('ContosoApp.Page1')
 *  Only one application per page can be created.
 * 2. To monitor a component as part of EUPL:
 * 2.1 Add the following at the component render start time.
 *    BasePerformanceLogger.addComponent('contosoWebPart1');
 *    BasePerformanceLogger.startMarkForComponent('contosoWebPart1');
 * 2.2 Add the following at the component render end time.
 *    BasePerformanceLogger.endMarkForComponent('contosoWebPart1');
 * 3. To monitor a request:
 * 3.1 Add the following at request start time:
 *    BasePerformanceLogger.startMarkForApi('call1_uniqueId', 'someUrl1');
 * 3.2 Add the following at request end time:
 *    BasePerformanceLogger.endMarkForApi('call1_uniqueId', 'call1', 'someUrl1', response);
 *
 * Note1: due to server side limitation, only the first 4 (soon will be 10) components'
 * data is send to server. The rest can be dumped to console if
 * window.sessionStorage["enableRUMOneDebugging"] == true.
 * Note2: do not include component time that do not affect EUPL (like async time spent.)
 *
 * @preapproved @internal
 */
var BasePerformanceLogger = /** @class */ (function () {
    function BasePerformanceLogger() {
    }
    /**
     * Initialize the application with a name. All perf data is reset for non-fullPageLoad.
     * @param applicationName - name of the application
     * @param pageTransitionType - indicates page transition type
     * @param serverVersion - SharePoint server version
     * @param approvedControls - Approved controls whose EUPL will be measured separately
     */
    BasePerformanceLogger.initializeApplication = function (applicationName, pageTransitionType, serverVersion, approvedControls) {
        if (pageTransitionType === void 0) { pageTransitionType = 4 /* fullPageLoad */; }
        // for full page load, new logger instance is created, we don't need to reset it
        // However for in page navigation scenario, we need to ensure that current page logger data is reset
        var fullPageLoad = pageTransitionType === 4 /* fullPageLoad */;
        // For cross app navigation we need to preserve the cross app navigation start time and app start time.
        var appStartTime = this.getCrossAppNavigationStartTime();
        var crossAppNavigationStartTime = this.getApplicationStartTime();
        if (fullPageLoad === false) {
            if (this.isRunning()) {
                // We are nevigating away without completing perf data collection for the current page
                var serverUrl = this._logger.getPerformanceDataPropertyValue('ServerUrl');
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerbose(this._logSource, "Performance data could not be collected for current page " + serverUrl + " before resetting");
            }
            this._logger.resetLogger();
            this._logger._keyMetrics = /* tslint:disable-line:no-any */ BasePerformanceLogger._defaultKeyMetrics.slice();
            this._rumOneData = {};
            this._tempData = {};
            delete this._approvedControls;
        }
        if (pageTransitionType === 10 /* crossAppNavigation */) {
            this.markCrossAppNavigationStart(crossAppNavigationStartTime);
            this.markApplicationStart(appStartTime);
        }
        this._addEnabledFlights();
        this._pageTransitionType = pageTransitionType;
        this._logger._rumoneData.PageTransitionType = this._pageTransitionType; /* tslint:disable-line:no-any */
        this._notifyListeners();
        this._reset(applicationName);
        this._approvedControls = approvedControls;
        if (serverVersion) {
            this._logger.writeServerVersion(serverVersion);
        }
        this._notifyListeners();
        if (!!sessionStorage.getItem('spfx-debug')) {
            this._logger.excludePageForPerfData();
        }
    };
    Object.defineProperty(BasePerformanceLogger, "fullPageLoad", {
        /**
         * Indicate whether the performance data is for a full page load or in place page navigation.
         */
        get: function () {
            return this._pageTransitionType === 4 /* fullPageLoad */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePerformanceLogger, "KeyMetrics", {
        get: function () {
            return this._logger.KeyMetrics;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a key metric for the performance logger to collect
     * @param keyMetric - key metric to collect
     */
    BasePerformanceLogger.addKeyMetric = function (keyMetric) {
        if (this._logger.isRunning()) {
            this._logger.addExpectedKeyMetric(keyMetric);
        }
    };
    /**
     * Add a component to track its performance.
     * @param tag - The identifier that identifies the component in the performance data stream.
     */
    BasePerformanceLogger.addComponent = function (tag) {
        if (!this._shouldRunComponent(tag)) {
            return;
        }
        this._logger.addExpectedControl(tag);
        this._notifyListeners();
    };
    /**
     * Record component start time.
     * @param tag - The identifier that identifies the component in the performance data stream.
     */
    BasePerformanceLogger.startMarkForComponent = function (tag, startTime) {
        if (startTime === void 0) { startTime = this.now(); }
        if (!this._shouldRunComponent(tag)) {
            return;
        }
        this.saveTempData(tag + this._componentStartTimeKey, startTime);
        this.addComponentBreakdown(tag, 'start', startTime);
        this._notifyListeners();
    };
    /**
     * Record component end time.
     * @param tag - The identifier that identifies the component in the performance data stream.
     * @param waitForPaint - Optional argument which lets you mark the end of component after the repaint.
     */
    BasePerformanceLogger.endMarkForComponent = function (tag, waitForPaint) {
        var _this = this;
        if (waitForPaint) {
            return this.waitForPaint(function () { return BasePerformanceLogger.endMarkForComponentWithTimestamp(tag, _this.now()); });
        }
        else {
            return BasePerformanceLogger.endMarkForComponentWithTimestamp(tag, this.now());
        }
    };
    /**
     * Logs Control Performance metrics to console.
     * @param tag - The identifier that identifies the component in the performance data stream.
     * @param label - User friendly console operation description.
     * @param componentId - Id of the component.
     * @param alias - Alias of the component.
     */
    BasePerformanceLogger.logPerformanceMetricToConsole = function (tag, label, componentId, alias) {
        var curStartTime = this.getComponentStartTime(tag);
        var curEndTime = this.getComponentEndTime(tag);
        var duration = curEndTime - curStartTime;
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerbose(this._logSource, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format('{0} for component {1} ({2}) took {3} ms', label, componentId, alias, duration));
    };
    /**
     * Record component end time.
     * @param tag - The identifier that identifies the component in the performance data stream.
     * @param endTime - the timestamp recorded at some point in time. Allows adding end marks after the
     * component is done loading.
     */
    BasePerformanceLogger.endMarkForComponentWithTimestamp = function (tag, endTime, overwrite) {
        if (!this._shouldRunComponent(tag)) {
            return;
        }
        if (!this.readTempData(tag + this._componentEndTimeKey) || overwrite) {
            var controlStartTime = this.getComponentStartTime(tag);
            this.reportControlData(tag, controlStartTime, endTime);
            this.saveTempData(tag + this._componentEndTimeKey, endTime);
            this._markComponentCore(tag, 'end', endTime);
            this._notifyListeners();
        }
    };
    /**
     * Record a time in the performance data stream for the component.
     * @param tag - The identifier that identifies the component in the performance data stream.
     * @param name - The name of the mark
     */
    BasePerformanceLogger.markComponent = function (tag, name, timeStamp) {
        if (timeStamp === void 0) { timeStamp = this.now(); }
        if (!this._shouldRunComponent(tag)) {
            return;
        }
        if (this._markComponentCore(tag, name, timeStamp)) {
            this._notifyListeners();
        }
    };
    BasePerformanceLogger.markComponentModuleLoaded = function (tag, timeStamp) {
        if (timeStamp === void 0) { timeStamp = this.now(); }
        if (!this._shouldRunComponent(tag)) {
            return;
        }
        var nowTime = this._markComponentCore(tag, 'modulesLoaded', timeStamp);
        if (nowTime === null || nowTime === undefined) {
            return;
        }
        if (!this._lastModuleLoadedDuration || nowTime > this._lastModuleLoadedDuration) {
            this._lastModuleLoadedDuration = nowTime;
            this.setPerformanceProperty('lastModuleLoaded', nowTime);
        }
        this._notifyListeners();
    };
    /**
     * Returns the millisecond from navigationStart to last component's module loaded time.
     */
    BasePerformanceLogger.getLastModuleLoadedDuration = function () {
        return this._lastModuleLoadedDuration;
    };
    BasePerformanceLogger.skipComponent = function (name) {
        this._componentsToSkip.add(name);
    };
    BasePerformanceLogger.clearComponentToSkip = function (name) {
        this._componentsToSkip.delete(name);
    };
    BasePerformanceLogger.clearComponentsToSkip = function () {
        this._componentsToSkip.clear();
    };
    BasePerformanceLogger.shouldSkipComponent = function (tag) {
        var shouldSkipTag = false;
        this._componentsToSkip.forEach(function (name) {
            shouldSkipTag = shouldSkipTag || (tag.lastIndexOf(name, 0) === 0);
        });
        return shouldSkipTag;
    };
    // @todo #191154 Integrate it into HttpClient.
    /**
     * Record a request start time.
     * @param tag - The identifier that uniquely identifies the request in the
     * performance data stream, used to calculate the duration. Not persisted in RumOne.
     * @param requestUrl - The url of the request.
     *
     */
    BasePerformanceLogger.startMarkForApi = function (tag, startTime) {
        if (startTime === void 0) { startTime = this.now(); }
        if (!this.isRunning()) {
            return;
        }
        this.saveTempData(tag + this._apiStartTimeKey, startTime);
        this._notifyListeners();
    };
    // @todo #191154 Integrate it into HttpClient.
    /**
     * Record a request end time.
     * @param tag - The identifier that uniquely identifies the request in the
     * performance data stream, used to calculate the duration. Not persisted in RumOne.
     * @param name - The name to aggregate the data. Persisted in RumOne stream.
     * @param requestUrl - The url of the request.
     * @param response - The response from the request.
     *
     */
    BasePerformanceLogger.endMarkForApi = function (tag, name, requestUrl, response, endTime) {
        if (endTime === void 0) { endTime = this.now(); }
        if (!this.isRunning()) {
            return;
        }
        var startTime = this.getApiStartTime(tag);
        if (startTime === undefined) {
            return;
        }
        var apiData = {
            url: requestUrl,
            duration: endTime - startTime,
            correlationId: response.headers.get('SPRequestGuid'),
            status: response.status,
            startTime: startTime.toString(),
            endTime: endTime.toString(),
            name: name
        };
        // log a API call perf data object for each API call before EUPL complete
        this._logger.writeAPICallPerformanceData(apiData);
        // Record the last API call end time as app data fetch end
        this.saveTempData(tag + this._apiEndTimeKey, endTime);
        BasePerformanceLogger._updateDataFetch(startTime, endTime);
        this._notifyListeners();
    };
    /**
     * This is only used in internal Test suite.
     * @internal
     */
    BasePerformanceLogger._getMaxDataFetchTime = function () {
        return this._logger.getPerformanceDataPropertyValue('DataFetch');
    };
    /**
     * Mark the current time associated with the provided tag.
     * @param tag - The identifier of the time
     * @param ignoreMarkKey - Indicates if the tag name should not append 'Mark' string
     */
    BasePerformanceLogger.mark = function (tag, ignoreMarkKey) {
        if (ignoreMarkKey === void 0) { ignoreMarkKey = false; }
        this._mark(tag, ignoreMarkKey);
    };
    /**
     * Mark sp-loader start time
     */
    BasePerformanceLogger.markSpLoaderStart = function (startTime) {
        if (startTime === void 0) { startTime = this.now(); }
        this.setPerformanceProperty(this._spLoaderStartKey, startTime);
    };
    /**
     * Mark the navigate to app start time
     * @param startTime - the time that marks the navigate to app start
     */
    BasePerformanceLogger.markCrossAppNavigationStart = function (startTime) {
        if (startTime === void 0) { startTime = this.now(true); }
        this.setPerformanceProperty(this._crossAppNavigationStartKey, startTime);
    };
    /**
     * Mark application start time
     */
    BasePerformanceLogger.markApplicationStart = function (startTime) {
        if (startTime === void 0) { startTime = this.now(true); }
        this._mark(this._applicationStartKey);
        this._setPerformancePropertyWithEUPLBreakdown(this._applicationStartKey, startTime);
    };
    /**
     * Get the navigate to app start time
     */
    BasePerformanceLogger.getCrossAppNavigationStartTime = function () {
        return this._logger.getPerformanceDataPropertyValue(this._crossAppNavigationStartKey);
    };
    /**
     * Get the application start time
     */
    BasePerformanceLogger.getApplicationStartTime = function () {
        return this._logger.getPerformanceDataPropertyValue(this._applicationStartKey);
    };
    /**
     * Get the recorded component start time.
     * @param tag - The identifier that identifies the component in the performance data stream.
     */
    BasePerformanceLogger.getComponentStartTime = function (tag) {
        return this.readTempData(tag + this._componentStartTimeKey);
    };
    /**
     * Get the recorded component end time.
     * @param tag - The identifier that identifies the component in the performance data stream.
     */
    BasePerformanceLogger.getComponentEndTime = function (tag) {
        return this.readTempData(tag + this._componentEndTimeKey);
    };
    /**
     * Get the recorded request start time.
     * @param tag - The identifier that identifies the request in the performance data stream.
     */
    BasePerformanceLogger.getApiStartTime = function (tag) {
        return this.readTempData(tag + this._apiStartTimeKey);
    };
    /**
     * Get the recorded request end time.
     * @param tag - The identifier that identifies the request in the performance data stream.
     */
    BasePerformanceLogger.getApiEndTime = function (tag) {
        return this.readTempData(tag + this._apiEndTimeKey);
    };
    // @todo VSO:237921 - use the correct typings
    // We can't directly use them, as that will cause a dependency for 3rd parties
    /**
     * Get the performance data for the debugger console.
     *
     * @internal
     */
    BasePerformanceLogger.getPerformanceData = function () {
        return this._logger.getPerformanceData();
    };
    /**
     * Subscribe to updates to the performance data.
     *
     * @internal
     */
    BasePerformanceLogger.addListener = function (onDataCallback) {
        this._listeners.push(onDataCallback);
    };
    /**
     * Unsubscribe from updates to the performance data.
     *
     * @internal
     */
    BasePerformanceLogger.removeListener = function (onDataCallback) {
        var index = this._listeners.indexOf(onDataCallback);
        if (index > -1) {
            this._listeners.splice(index, 1);
        }
    };
    /**
     * Return current time offset since page navigation started.
     * For in page navigation if correctly adjust offset
     * @param ignoreNavOffset - When set to true, time returned will ingore navigation offset.
     */
    BasePerformanceLogger.now = function (ignoreNavOffset) {
        var navStartOffset = BasePerformanceLogger.readTempData(BasePerformanceLogger._navigationStartOffsetKey) || 0;
        if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPKillSwitch"].isActivated(IGNORE_NAV_START_OFFSET, '2019/11/05', 'Ignore navigation start offset') &&
            !!ignoreNavOffset) {
            navStartOffset = 0;
        }
        if (!!window.performance && window.performance.now && typeof window.performance.now === 'function') {
            return (Math.round(window.performance.now()) - navStartOffset);
        }
        else if (!!window.performance && window.performance.timing && window.performance.timing.navigationStart) {
            return (Date.now() - window.performance.timing.navigationStart - navStartOffset);
        }
        // This should be very limited case to old browser versions or platforms not supporting performance API
        // We should still get some number for such cases
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerbose(BasePerformanceLogger._logSource, "High resolution performance API not supported");
        var perfStartTime = BasePerformanceLogger.readTempData('perfStartTime') || 0;
        return (Date.now() - perfStartTime);
    };
    BasePerformanceLogger.setScenarioId = function (scenarioId) {
        if (this.isRunning()) {
            this._scenarioId = scenarioId;
            this._logger.writeScenarioId(this._scenarioId, true);
        }
    };
    BasePerformanceLogger.getScenarioId = function () {
        return this._scenarioId;
    };
    Object.defineProperty(BasePerformanceLogger, "waitOnAddingExpectedControl", {
        set: function (shouldWait) {
            this._logger.waitOnAddingExpectedControl = shouldWait;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Determines if the RUMONELogger is running
     */
    BasePerformanceLogger.isRunning = function () {
        return this._logger.isRunning();
    };
    /**
     * Records data fetch time
     * @param dataFetchTime - The data fetch timen.
     */
    BasePerformanceLogger.writeDataFetchTime = function (dataFetchTime) {
        this._logger.writeDataFetchTime(dataFetchTime);
    };
    /**
     * Records Server Side Latency
     * @param duration - The time duration.
     * @param iisLatency - The IIs Latency time.
     */
    BasePerformanceLogger.writeServerSideLatency = function (duration, iisLatency) {
        this._logger.writeServerSideLatency(duration, iisLatency);
    };
    /**
     * Records the Server Correlation ID
     * @param correlationId - The value of the Correlaition ID.
     */
    BasePerformanceLogger.writeServerCorrelationId = function (correlationId) {
        this._logger.writeServerCorrelationId(correlationId);
    };
    /**
     * Records App Cache
     * @param appCache - The App Cache value to be registered.
     */
    BasePerformanceLogger.writeAppCache = function (appCache) {
        this._logger.writeAppCache(appCache);
    };
    /**
     * Records Pre Render Time
     * @param preRenderTime - The pre render time to be recorded.
     */
    BasePerformanceLogger.writePreRenderTime = function (preRenderTime) {
        this._logger.writePreRenderTime(preRenderTime);
    };
    /**
     * Records Render Time
     * @param renderTime - The render time to be recorded.
     * @param overwrite - Determines if any previous value for Render Time should be overwritten.
     */
    BasePerformanceLogger.writeRenderTime = function (renderTime, overwrite) {
        this._logger.writeRenderTime(renderTime, overwrite);
    };
    /**
   * Records Time To Fist Byte
   * @param timeToFirstByte - Time to first byte (TTFB) to be recorded.
   */
    BasePerformanceLogger.writeTimeToFirstByte = function (timeToFirstByte) {
        var performaceData = BasePerformanceLogger.getPerformanceData(); /* tslint:disable-line:no-any */
        performaceData.TTFB = timeToFirstByte;
    };
    /**
     * Add Server Metrics
     * @param metric - A dictionary of the metrics to be added.
     * @param overwrite - Determines if any previous value for this metrics should be overwritten.
     */
    BasePerformanceLogger.addServerMetrics = function (metric, overwrite) {
        this._logger.addServerMetrics(metric, overwrite);
    };
    /**
     * Add additional performance breakdown to the web part. Often added using startMarkForComponent or alternate API
     * DO NOT use this API for fixed key data unrelated to components, rather use setPerformanceProperty API.
     *
     * @param tag - The tag of the component. This should match with tag used for other component related API
     *              like startMarkForComponent
     * @param key - The marker to capture additional timing stage about component. The final key in EUPLBreakdown
     *              dictionary would be tag.key
     * @param value - The value of the time to record
     * @param overwrite - Determines if any previous value for this name should be overwritten.
     */
    BasePerformanceLogger.addComponentBreakdown = function (tag, key, value, overwrite) {
        this._logger.addEUPLBreakdown(tag + "." + key, value, overwrite);
    };
    /**
     * Read performance breakdown value of the given component.
     * @param tag - The name of the EUPL breakdown. Persisted in RumOne stream.
     * @param key - The name of the EUPL breakdown. Persisted in RumOne stream.
     * @returns value of the breakdown if exist, undefined otherwise
     */
    BasePerformanceLogger.readComponentBreakdown = function (tag, key) {
        return this._logger.readEUPLBreakdown(tag + "." + key);
    };
    /**
     * Allows the browser to repaint, then invokes a callback.
     * Note: Here, we timeout after animation frame to ensure our code executes after paint, not before.
     * @param onDidPaintcallback - callback function invoked after the browser has repainted.
     */
    BasePerformanceLogger.waitForPaint = function (onDidPaintcallback) {
        requestAnimationFrame(function () {
            setTimeout(onDidPaintcallback);
        });
    };
    /**
     * Set Render property for a given name. It invokes setPerformanceProperty() after the browser has repainted.
     * @param tag - The column name to store the data. Persisted in RumOne stream.
     */
    BasePerformanceLogger.setPerformancePropertyAfterRepaint = function (tag) {
        this.waitForPaint(function () { return BasePerformanceLogger.setPerformanceProperty(tag); });
    };
    /**
     * Get performance property for given name, if set using setPerformanceProperty.
     * @param name - The name of the performance property. Persisted in RumOne stream.
     */
    BasePerformanceLogger.getPerformanceProperty = function (name) {
        return this._logger.getPerformanceDataPropertyValue(name);
    };
    /**
     * Set performance property for given name. This will be added as seperate flatten column to the performance data.
     * Do not use random name, such as guid or timestamp, which is not unique across rows.
     * @param name - The column name to store the data. Persisted in RumOne stream.
     * @param value - The value of the performance propetry.
     * @param addToExisting - If true and value is number, will be added to existing value set before using same name.
     */
    BasePerformanceLogger.setPerformanceProperty = function (name, value, addToExisting) {
        if (value === undefined) {
            value = this.now();
        }
        // Add value to existing measurement
        if (addToExisting && typeof value === 'number') {
            var existingValue = this.getPerformanceProperty(name);
            if (existingValue && typeof existingValue === 'number') {
                value += existingValue;
            }
        }
        this._logger.setPerformanceDataPropertyValue(name, value);
    };
    /**
     * Collect W3c Performance Timings
     */
    BasePerformanceLogger.collectW3CPerfTimings = function () {
        this._logger.collectW3CPerfTimings();
    };
    /**
     * Collect W3c Resource Timings
     */
    BasePerformanceLogger.collectW3cResourceTimings = function () {
        this._logger.collectW3cResourceTimings();
    };
    /**
     * Collect control data
    */
    BasePerformanceLogger.readFullEUPLBreakDown = function () {
        return this._logger.readEUPLBreakdown();
    };
    /**
     * Get the time associated with the tag.
     * @param tag - The identifier of the time
     */
    BasePerformanceLogger.getMark = function (tag, ignoreMarkKey) {
        if (ignoreMarkKey === void 0) { ignoreMarkKey = false; }
        return this._getMark(tag, ignoreMarkKey);
    };
    /**
     * Add adhoc performance markers, these markers will not be reported via telemetry,
     * they are only accessible from debugger.
     * And this function needs to be called synchronously.
     * @param tag - The identifier of the time
     */
    BasePerformanceLogger.devMark = function (tag) {
        if (window.performance && window.performance.mark) {
            window.performance.mark(tag);
        }
    };
    /**
     * Cosmos does not support dynamic column. We want to duplicate data in EUPLBreakdown for key markers.
     */
    BasePerformanceLogger._setPerformancePropertyWithEUPLBreakdown = function (name, value) {
        this.setPerformanceProperty(name, value);
        this._logger.addEUPLBreakdown(name, value);
    };
    BasePerformanceLogger.saveTempData = function (key, value) {
        BasePerformanceLogger._tempData[key] = value;
    };
    BasePerformanceLogger.readTempData = function (key) {
        return BasePerformanceLogger._tempData[key];
    };
    BasePerformanceLogger._shouldRunComponent = function (tag) {
        return this.isRunning() && !this.shouldSkipComponent(tag);
    };
    Object.defineProperty(BasePerformanceLogger, "_logger", {
        get: function () {
            this._ensureInitialized();
            return PERFORMANCE_LOGGER;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize the logger.
     * The logger is not initialized in the constructor for lazy initialization.
     */
    BasePerformanceLogger._ensureInitialized = function () {
        if (!PERFORMANCE_LOGGER) {
            // Lazy initialization
            PERFORMANCE_LOGGER = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["RumOneLogger"].getRUMOneLogger();
            // Save default key metrics. They get overwritten and RumOneLogger.resetLogger() does not reset them properly.
            BasePerformanceLogger._defaultKeyMetrics = PERFORMANCE_LOGGER.KeyMetrics.slice(); /* tslint:disable-line:no-any */
            PERFORMANCE_LOGGER.registerEUPLComputedHandler(this._EUPLComputedHandler.bind(this));
        }
    };
    BasePerformanceLogger.reportControlData = function (tag, startTime, endTime) {
        if (!this.isRunning) {
            return;
        }
        var controlPerformanceData = {
            controlId: tag,
            startTime: startTime,
            endTime: endTime,
            renderTimeCalculator: this._renderTimeCalculator.bind(this),
            renderTimeRequiredDataChecker: this._renderTimeRequiredDataChecker.bind(this),
            renderTime: undefined,
            ignoreForEUPL: true,
            needFlatten: false
        };
        this._logger.writeControlPerformanceData(controlPerformanceData);
        this._notifyListeners();
    };
    BasePerformanceLogger._renderTimeRequiredDataChecker = function (rumone, controlData) {
        return (rumone && controlData && !isNaN(controlData.endTime));
    };
    /**
     * call back function, exected by RUMOne to compute render time for the control
     */
    BasePerformanceLogger._renderTimeCalculator = function (rumone, controlData) {
        if (rumone && controlData && controlData.endTime) {
            var renderTime = controlData.endTime;
            if (!isNaN(renderTime) && renderTime < 0) {
                var error = new Error("Component " + controlData.controlId + " render time " + renderTime + " is negative\n              ( StartTime: " + controlData.startTime + "\n              endTime: " + controlData.endTime + " pageTransitionType: " + this.fullPageLoad.toString() + ")");
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logError(this._logSource, error, 'negativeRenderTime');
                return 0;
            }
            return renderTime;
        }
        else {
            return 0;
        }
    };
    /**
     * Mark the current time associated with the provided tag.
     * @param tag - The identifier of the time
     */
    BasePerformanceLogger._mark = function (tag, ignoreMarkKey) {
        if (ignoreMarkKey === void 0) { ignoreMarkKey = false; }
        var markName = tag + (ignoreMarkKey ? '' : this._markKey);
        this._logger.mark(markName);
        this._notifyListeners();
    };
    /**
     * Get the time associated with the tag.
     * @param tag - The identifier of the time
     */
    BasePerformanceLogger._getMark = function (tag, ignoreMarkKey) {
        if (ignoreMarkKey === void 0) { ignoreMarkKey = false; }
        var markName = tag + (ignoreMarkKey ? '' : this._markKey);
        return this._logger.getMarkerTime(markName);
    };
    BasePerformanceLogger._updateDataFetch = function (startTime, endTime) {
        if (startTime && endTime) {
            var previousDuration = BasePerformanceLogger._getMaxDataFetchTime();
            var newDuration = endTime - startTime;
            if (!previousDuration || newDuration > previousDuration) {
                this._rumOneData.DataFetch = newDuration;
                this._logger.writeDataFetchTime(newDuration, true);
            }
        }
    };
    BasePerformanceLogger._markComponentCore = function (tag, name, markTime) {
        if (markTime === void 0) { markTime = this.now(); }
        var startTime = this.getComponentStartTime(tag);
        if (startTime === undefined) {
            return undefined;
        }
        this._logger.addEUPLBreakdown(tag + "." + name, markTime);
        return markTime;
    };
    BasePerformanceLogger._notifyListeners = function () {
        this._listeners.forEach(function (listner) {
            try {
                listner();
            }
            catch (err) {
                // empty
            }
        });
    };
    BasePerformanceLogger._reset = function (applicationName, elapsedTime) {
        if (elapsedTime === void 0) { elapsedTime = this.now(); }
        this.saveTempData('perfStartTime', Date.now());
        // Add time elapsed since full page navigation started to compute now offset from nav start
        var navOffset = elapsedTime;
        if (this.fullPageLoad) {
            navOffset = 0;
        }
        else if (this._pageTransitionType === 10 /* crossAppNavigation */) {
            navOffset = this.getCrossAppNavigationStartTime();
        }
        this.saveTempData(this._navigationStartOffsetKey, navOffset);
        this._setPerformancePropertyWithEUPLBreakdown(this._navigationStartOffsetKey, navOffset);
        this.clearComponentsToSkip();
        this._lastModuleLoadedDuration = undefined;
        this.setScenarioId(applicationName);
    };
    /**
     * Notified when RUMOneLogger has finished calculating EUPL and ready to upload Performance data.
     */
    BasePerformanceLogger._EUPLComputedHandler = function (eupl) {
        var _this = this;
        this._collectSPFXPerformanceMarkers();
        this.collectW3CPerfTimings();
        this._collectImageNetworkPerformance();
        this._collectConnectionInfo();
        if (this.fullPageLoad) {
            this.collectW3cResourceTimings();
        }
        this._collectFirstPaintInfo();
        this._collectServiceWorkerInfo();
        this._collectCDNInfo();
        if (this._approvedControls && this._approvedControls.size) {
            var approvedEUPL = void 0;
            var hasUnApprovedControl_1 = false;
            var controls = this._logger.readControlPerformanceData();
            if (controls.length) {
                var approvedControls = controls.filter(function (control) {
                    // TODO: prchando - This needs to be generalized, probably by adding a name to the control besides id
                    // ControlId: "WebPart.NewsWebPart.f8956e10-0fdb-4f62-9da6-da344b586820"
                    if (control.controlId.indexOf('WebPart.') !== 0) {
                        return false; // Not a web part control
                    }
                    var nameEndIndex = control.controlId.indexOf('.', 8);
                    if (nameEndIndex === -1) {
                        return false;
                    }
                    var controlName = control.controlId.substring(0, nameEndIndex + 1); // Match up to period
                    var isApproved = _this._approvedControls.has(controlName);
                    hasUnApprovedControl_1 = hasUnApprovedControl_1 || !isApproved;
                    return isApproved;
                });
                if (approvedControls.length) {
                    approvedControls.sort(function (c1, c2) {
                        return c2.endTime - c1.endTime; // Desending sorting b-a
                    });
                    approvedEUPL = approvedControls[0].endTime;
                }
                else if (!hasUnApprovedControl_1) {
                    // Niether approved nor unpproved control found, so considering approved category
                    approvedEUPL = eupl;
                }
            }
            if (approvedEUPL !== undefined) {
                this.setPerformanceProperty('ApprovedControlsEUPL', approvedEUPL);
            }
            else {
                // This page contains at least one unapproved control but no approved control.
                this.setPerformanceProperty('UnapprovedControlsEUPL', eupl);
            }
        }
    };
    /**
    * Collect SPFX Performance markers into performance data as first class column
    */
    BasePerformanceLogger._collectSPFXPerformanceMarkers = function () {
        var perfMarksKey = 'spfxPerfMarks';
        var perfMarks = window[perfMarksKey];
        if (perfMarks) {
            for (var markKey in perfMarks) {
                if (markKey && !isNaN(perfMarks[markKey])) {
                    this.setPerformanceProperty(markKey, perfMarks[markKey]);
                }
            }
            // All done, clear this so next page does not mix with it.
            // Making it empty so that if data comes after post flush, it does not throw.
            window[perfMarksKey] = {};
        }
    };
    /**
     * Measure time taken to load viewport images from getPreview or MeTA service
     */
    BasePerformanceLogger._collectImageNetworkPerformance = function () {
        if (!window.performance) {
            return;
        }
        var imagePerfEntries = window.performance.getEntriesByType('resource')
            .filter(function (perfEntry) {
            return perfEntry.duration > 0;
        });
        for (var index = 0; index < imagePerfEntries.length; index++) {
            var perfEntry = imagePerfEntries[index];
            var serviceName = undefined;
            if (VROOM_META_CACHE_REGEX.test(perfEntry.name)) {
                serviceName = 'VROOMMeTACache';
            }
            else if (META_REGEX.test(perfEntry.name)) {
                serviceName = 'MeTA';
            }
            else if (DOCVIZ_REGEX.test(perfEntry.name)) {
                serviceName = 'DocViz';
            }
            else if (this._isUrlPrivateCDNThumbnail(perfEntry.name)) {
                serviceName = 'PrivateCDN';
            }
            else if (this._isUrlPublicCDNThumbnail(perfEntry.name)) {
                serviceName = 'PublicCDN';
            }
            if (serviceName) {
                var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"]('ThumbnailLoadDuration');
                qosMonitor.writeSuccess({
                    service: serviceName,
                    duration: perfEntry.duration
                });
            }
        }
    };
    BasePerformanceLogger._isUrlPrivateCDNThumbnail = function (url) {
        return url
            && (url.indexOf(PRIVATECDN_AUTHORITY) === 0 || url.indexOf(PRIVATECDN_STAGING_AUTHORITY) === 0)
            && url.indexOf('_eat_=') > -1
            && url.indexOf('_oat_=') > -1
            && url.indexOf('width=') > -1;
    };
    BasePerformanceLogger._isUrlPublicCDNThumbnail = function (url) {
        return url
            && (url.indexOf(PUBLICCDN_AUTHORITY) === 0 || url.indexOf(PUBLICCDN_STAGING_AUTHORITY) === 0)
            && url.indexOf('width=') > -1;
    };
    /**
     * Collect information about Network connection type e.g. 4g, 3g.
     * For more info: https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API
     */
    BasePerformanceLogger._collectConnectionInfo = function () {
        // tslint:disable: no-any
        var nav = navigator;
        var connection = nav.connection || nav.mozConnection || nav.webkitConnection;
        // tslint:enable: no-any
        if (connection && connection.effectiveType) {
            this._logger.setPerformanceDataPropertyValue(CONNECTIONTYPE_KEY, connection.effectiveType);
        }
        else {
            // Not supported on every browser
            this._logger.setPerformanceDataPropertyValue(CONNECTIONTYPE_KEY, 'N/A');
        }
    };
    /**
    * Capture flights enabled for performance logging.
    * Note: Flights only explicitly opted for perf measurement are captured here
    * Add flight to _flightsOptedABTesting to opt in for logging
    */
    BasePerformanceLogger._addEnabledFlights = function () {
        var allEnabledFlights = [];
        for (var index = 0; this._flightsOptedABTesting && index < this._flightsOptedABTesting.length; index++) {
            var flight = this._flightsOptedABTesting[index];
            if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isEnabled(flight)) {
                allEnabledFlights.push(flight.toString());
            }
        }
        this._logger.addFlights(allEnabledFlights);
    };
    BasePerformanceLogger._collectFirstPaintInfo = function () {
        var _this = this;
        if (window.performance && window.performance.getEntriesByType) {
            var paintMetrics = window.performance.getEntriesByType('paint');
            paintMetrics.forEach(function (performanceEntry, i, entries) {
                if ('first-paint' === performanceEntry.name) {
                    _this.setPerformanceProperty('firstPaint', performanceEntry.startTime);
                }
                else if ('first-contentful-paint' === performanceEntry.name) {
                    _this.setPerformanceProperty('firstContentfulPaint', performanceEntry.startTime);
                }
            });
        }
    };
    BasePerformanceLogger._collectServiceWorkerInfo = function () {
        if (window.performance && window.performance.getEntriesByType) {
            // Collecting data to get service worker boot time
            var serviceWorkerMetric = performance.getEntriesByType('navigation');
            if (serviceWorkerMetric.length) {
                // Get service worker state
                var serviceWorkerState = sessionStorage.getItem('serviceworkerstate') || 'unknown';
                // Push service worker data only for full page load type 4
                this.setPerformanceProperty('serviceworkerstate', serviceWorkerState);
                this.setPerformanceProperty('sw.workerstart', String(serviceWorkerMetric[0].workerStart));
                this.setPerformanceProperty('sw.fetchstart', String(serviceWorkerMetric[0].fetchStart));
                this.setPerformanceProperty('sw.requeststart', String(serviceWorkerMetric[0].requestStart));
                this.setPerformanceProperty('serviceworkerincubationflight', String(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isEnabled(1531)));
                this.setPerformanceProperty('serviceworkercommonflight', String(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isEnabled(1620)));
                this.setPerformanceProperty('serviceworkerexperimentationflight', String(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isEnabled(1612)));
                this.setPerformanceProperty('serviceworkerexperimentationvalue', String(this._collectServiceWorkerExperimentData()));
            }
        }
    };
    /**
     * Add CDNStatus dimension to the Performance telementry
     */
    BasePerformanceLogger._collectCDNInfo = function () {
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPKillSwitch"].isActivated(CDNSTATUS_KILLSWITCH, '2019/10/25', 'WEX Captrue CDN Status to Perf telemetry')) {
            return;
        }
        var privateEnabled = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["SPAlternativeUrls"].tryGetAlternativeUrl(PRIVATECDNENABLED_KEY) &&
            'true' === _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["SPAlternativeUrls"].tryGetAlternativeUrl(PRIVATECDNENABLED_KEY).toLowerCase();
        var publicEnabled = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["SPAlternativeUrls"].tryGetAlternativeUrl(PUBLICCDNENABLED_KEY) &&
            'true' === _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["SPAlternativeUrls"].tryGetAlternativeUrl(PUBLICCDNENABLED_KEY).toLowerCase();
        var cdnStatus = CDNDISABLED;
        if (privateEnabled && publicEnabled) {
            cdnStatus = PRIVATEPUBLIC;
        }
        else if (privateEnabled || publicEnabled) {
            cdnStatus = privateEnabled ? PRIVATE : PUBLIC;
        }
        this.setPerformanceProperty(CDNSTATUS, cdnStatus);
    };
    BasePerformanceLogger._collectServiceWorkerExperimentData = function () {
        var serviceWorkerExperiment = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["ABExperiment"]({
            name: 'CommonServiceWorkerExperiment',
            startDate: '8/19/2019'
        });
        return String(serviceWorkerExperiment.IsExperimentOn());
    };
    BasePerformanceLogger.extensionsInitializedMetricName = 'ExtensionsInitialized';
    BasePerformanceLogger._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogSource"].create('BasePerformanceLogger');
    BasePerformanceLogger._rumOneData = {};
    BasePerformanceLogger._tempData = {}; /* tslint:disable-line:no-any */
    BasePerformanceLogger._componentStartTimeKey = 'ComponentStartTime';
    BasePerformanceLogger._componentEndTimeKey = 'ComponentEndTime';
    BasePerformanceLogger._apiStartTimeKey = 'ApiStartTime';
    BasePerformanceLogger._apiEndTimeKey = 'ApiEndTime';
    BasePerformanceLogger._markKey = 'Mark';
    BasePerformanceLogger._spLoaderStartKey = 'spLoaderStart';
    BasePerformanceLogger._applicationStartKey = 'appStart';
    BasePerformanceLogger._navigationStartOffsetKey = 'navigationStartOffset';
    BasePerformanceLogger._crossAppNavigationStartKey = 'crossAppNavigationStart';
    BasePerformanceLogger._listeners = [];
    BasePerformanceLogger._componentsToSkip = new Set();
    BasePerformanceLogger._pageTransitionType = 0 /* none */;
    /**
     * List of flights which needs to be tracked along with performance data
     * It will allow compare perf data with and without flight enabled.
     */
    BasePerformanceLogger._flightsOptedABTesting = [
        125 /* SppplatRequireJsLoader */,
        242 /* ListViewWebPartWithItemsView */,
        944 /* WexWebPartCacheXGeoClientWriteBack */,
        1069 /* SharePointSitesPrefetchPersonalContext */,
        1073 /* ClientSideRecommendedNews */,
        1265 /* SPHomeServiceContextPrefetch */,
        1309 /* SPClientSuiteNavCommon */,
        1336 /* AbbreviationPagesPrototype */,
        1338 /* NextGenPage */,
        1353 /* WEXIncreaseWebPartPreloadCount */,
        1357 /* SPPLATClientLoaderDeassemblyfication */,
        1599 /* SOXEventsDeferCheckPermission */,
        1612 /* SpClientServiceWorkerExperimentation */,
        1617 /* IDCEnableRenderCompleteAPICallForWebPartThumbnail */,
        1618 /* SPPPlatPaintStarvationSPClient */,
        1658 /* WexLegacyFabricLocalFont */,
        1697 /* WEXImproveEditPerf */,
        1540 /* WEXNewsFilterForOtherSources */,
        1240 /* SPPagesSuiteSearchBox */,
        1455 /* SPHomeSuiteSearchBox */,
        1373 /* WEXDeferredComponentsDispatchTimeout */,
        1077 /* SPFxDelayExtensionsLoading */,
        1136 /* O365ShellModuleJSClient */,
        1204 /* SOXSyncLoadWebpartInViewport */,
        1737 /* WEXCacheThumbnails */,
        1751 /* SPFxJsonParse2 */,
        1760 /* WEXMinimizeViewPortLoadOverhead */,
        1279 /* WexPagePerfLoadingIndicator */
    ];
    return BasePerformanceLogger;
}());
/* harmony default export */ __webpack_exports__["default"] = (BasePerformanceLogger);


/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: _EngagementLogger, _QosMonitor, _PerformanceLogger, _Telemetry, _ABExperiment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_EngagementLogger", function() { return _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_EngagementLogger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_QosMonitor", function() { return _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]; });

/* harmony import */ var _Api_Performance_BasePerformanceLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Api/Performance/BasePerformanceLogger */ "kJO1");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_PerformanceLogger", function() { return _Api_Performance_BasePerformanceLogger__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Telemetry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Telemetry */ "RrtT");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_Telemetry", function() { return _Telemetry__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _ABExperimentWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ABExperimentWrapper */ "4Fgs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_ABExperiment", function() { return _ABExperimentWrapper__WEBPACK_IMPORTED_MODULE_3__["default"]; });







/***/ }),

/***/ "n5Pd":
/*!***************************!*\
  !*** ./lib/AriaLogger.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */


/**
 * @internal
 */
var AriaLogger = /** @class */ (function () {
    function AriaLogger() {
    }
    AriaLogger.initialize = function (tenantToken, context) {
        var useNewAriaSdkSPWeb = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isEnabled(1614 /*SPPPlatUseLatestAriaSdkSPClient */);
        if (useNewAriaSdkSPWeb) {
            Promise.all(/*! import() | sp-client-telemetry-aria-webjs */[__webpack_require__.e("vendors~sp-client-telemetry-aria-webjs"), __webpack_require__.e("sp-client-telemetry-aria-webjs")]).then(__webpack_require__.bind(null, /*! ./ariaWebJsWrapper */ "8Gis")).then(function (_a) {
                var ariaWebJsWrapper = _a.ariaWebJsWrapper;
                AriaLogger.ariaLoggerDisposer = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["AriaLoggerCore"].Init(tenantToken, context, ariaWebJsWrapper);
            });
        }
        else {
            Promise.all(/*! import() | sp-client-telemetry-aria */[__webpack_require__.e("vendors~sp-client-telemetry-aria"), __webpack_require__.e("sp-client-telemetry-aria")]).then(__webpack_require__.bind(null, /*! ./ariaWrapper */ "GdB4")).then(function (_a) {
                var ariaWrapper = _a.ariaWrapper;
                AriaLogger.ariaLoggerDisposer = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["AriaLoggerCore"].Init(tenantToken, context, ariaWrapper);
            });
        }
    };
    AriaLogger.update = function (tenantToken, context) {
        if (AriaLogger.ariaLoggerDisposer && typeof AriaLogger.ariaLoggerDisposer === 'function') {
            AriaLogger.ariaLoggerDisposer();
        }
        AriaLogger.initialize(tenantToken, context);
    };
    return AriaLogger;
}());
/* harmony default export */ __webpack_exports__["default"] = (AriaLogger);


/***/ }),

/***/ "p6/0":
/*!***********************************!*\
  !*** ./lib/Api/BeaconHandlers.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @copyright Microsoft Corporation.All rights reserved.
 * @file BeaconHandlers.ts
 * BeasonHandlers represents the contract for application logger
 */

/**
 * @internal
 */
var BeaconHandlers = /** @class */ (function () {
    function BeaconHandlers() {
    }
    BeaconHandlers._getResultTypeSuffix = function (resultType) {
        'use strict';
        if (resultType === _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["ResultTypeEnum"].Success) {
            return '.Success';
        }
        else if (resultType === _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["ResultTypeEnum"].Failure) {
            return '.Failure';
        }
        else if (resultType === _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["ResultTypeEnum"].ExpectedFailure) {
            return '.ExpectedFailure';
        }
        return '';
    };
    // ignore these events, or they will show up under UnknownEvent
    BeaconHandlers.prototype.ignoredEventsHandler = function (event) {
        return _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Nav"].isTypeOf(event) || _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["PLTHttpRequest"].isTypeOf(event);
    };
    BeaconHandlers.prototype.qosEventNameHandler = function (event, currentName) {
        var name = currentName;
        if (event.data) {
            if (event.eventType === _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["ClonedEventType"].Start) {
                name += '.Start';
            }
            else if (event.eventType === _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["ClonedEventType"].End) {
                if (event.data.resultCode) {
                    name += '.' + event.data.resultCode;
                }
                name += BeaconHandlers._getResultTypeSuffix(event.data.resultType);
            }
            else {
                name += '.no_EventType';
            }
        }
        return name;
    };
    /* tslint:disable-next-line:no-any */
    BeaconHandlers.prototype.qosEventExtraDataHandler = function (event, qosData) {
        return;
    };
    return BeaconHandlers;
}());
/* harmony default export */ __webpack_exports__["default"] = (BeaconHandlers);


/***/ }),

/***/ "ut3N":
/*!********************************************!*\
  !*** external "@microsoft/sp-diagnostics" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ut3N__;

/***/ }),

/***/ "y88i":
/*!********************************************!*\
  !*** external "@ms/odsp-utilities-bundle" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_y88i__;

/***/ })

/******/ })});;
//# sourceMappingURL=sp-telemetry.js.map