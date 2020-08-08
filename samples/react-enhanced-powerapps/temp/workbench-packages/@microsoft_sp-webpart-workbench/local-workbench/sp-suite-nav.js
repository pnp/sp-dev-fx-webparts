define("f8a8ad94-4cf3-4a19-a76b-1cec9da00219_0.1.0", ["@ms/sp-telemetry","@microsoft/sp-loader","@microsoft/sp-lodash-subset","@microsoft/sp-core-library","@microsoft/sp-page-context","react","@microsoft/load-themed-styles","@microsoft/sp-diagnostics","@microsoft/sp-http","@microsoft/decorators","@ms/odsp-utilities-bundle"], function(__WEBPACK_EXTERNAL_MODULE__2q6Q__, __WEBPACK_EXTERNAL_MODULE_I6O9__, __WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_X_PM__, __WEBPACK_EXTERNAL_MODULE_cDcd__, __WEBPACK_EXTERNAL_MODULE_jOlS__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_vlQI__, __WEBPACK_EXTERNAL_MODULE_wxtz__, __WEBPACK_EXTERNAL_MODULE_y88i__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"sp-suite-nav": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({"vendors~sp-suite-nav-search-common":"vendors~sp-suite-nav-search-common","sp-suite-nav-search-common":"sp-suite-nav-search-common"}[chunkId]||chunkId) + "_" + {"vendors~sp-suite-nav-search-common":"fc1eea2e443c3fa5ba67","sp-suite-nav-search-common":"594c615e3d7a5b7dba67"}[chunkId] + ".js"
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
/******/ 	var jsonpArray = window["webpackJsonpf8a8ad94_4cf3_4a19_a76b_1cec9da00219_0_1_0"] = window["webpackJsonpf8a8ad94_4cf3_4a19_a76b_1cec9da00219_0_1_0"] || [];
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
/******/ 	  var regex = (typeof spScriptNamePattern !== 'undefined') ? spScriptNamePattern : new RegExp('\\/sp-suite-nav(_[a-z0-9-]+)*\\.js', 'i');
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

/***/ "019d":
/*!*********************************!*\
  !*** ./lib/O365ShellWrapper.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FlexPaneWrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FlexPaneWrapper */ "J5pV");
/* harmony import */ var _NavigationWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavigationWrapper */ "s77q");
/* harmony import */ var _O365ShellSettingsWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./O365ShellSettingsWrapper */ "0WS3");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file Wrapper around the O365Shell global, preventing other files from needing to access the global
 */



var O365ShellWrapper = /** @class */ (function () {
    function O365ShellWrapper() {
        this._postRenderSignal = new Promise(function () {
            return;
        });
        this.FlexPane = new _FlexPaneWrapper__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.Navigation = new _NavigationWrapper__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
    Object.defineProperty(O365ShellWrapper.prototype, "Settings", {
        get: function () {
            if (!this._o365ShellSettings) {
                if (this.DoesShellExist() && O365Shell.Settings) {
                    this._o365ShellSettings = new _O365ShellSettingsWrapper__WEBPACK_IMPORTED_MODULE_2__["default"]();
                }
            }
            return this._o365ShellSettings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(O365ShellWrapper.prototype, "Theme", {
        get: function () {
            if (this.DoesShellExist() && O365Shell.Theme) {
                return O365Shell.Theme;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(O365ShellWrapper.prototype, "Search", {
        get: function () {
            if (this.DoesShellExist() && O365Shell.Search) {
                return O365Shell.Search;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(O365ShellWrapper.prototype, "Extensibility", {
        get: function () {
            if (this.DoesShellExist() && O365Shell.Extensibility) {
                return O365Shell.Extensibility;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the data to be consumed by the O365Shell
     */
    O365ShellWrapper.prototype.SetData = function (shellData) {
        O365Shell.SetData(shellData);
    };
    /**
     * Instructs the 0365 shell to render
     */
    O365ShellWrapper.prototype.Render = function (renderSettings, postRendercallback) {
        O365Shell.Render(renderSettings, postRendercallback);
    };
    /**
     * Instructs the 0365 shell to render async
     */
    O365ShellWrapper.prototype.RenderAsync = function (renderSettings, renderCallback, postRenderCallback) {
        O365Shell.RenderAsync(renderSettings, renderCallback, postRenderCallback);
    };
    /**
     * Load shell plus (extra features like notifications). Only functions properly on SPO.
     */
    O365ShellWrapper.prototype.LoadShellPlus = function () {
        O365Shell.LoadShellPlus();
    };
    /**
     * Not provided by O365Shell. Tells whether the O365Shell global exists.
     */
    O365ShellWrapper.prototype.DoesShellExist = function () {
        return typeof O365Shell !== 'undefined';
    };
    /**
     * This is not provided by O365Shell. It invokes a given callback when a member/function
     * name is defined. This is useful when a component is trying to access a O365Shell
     * member but is not in charge of loading it.
     *
     * @params member name to be checked for avaliability
     * @parmas callback function to be called if the member is avaliable
     */
    O365ShellWrapper.prototype.OnHasMember = function (memberName, callback) {
        var _this = this;
        if (this._hasMember(memberName)) {
            callback();
        }
        else {
            /** Wait for the next render completition and call this method recursively to check if the member
             * is now available.
             */
            this._postRenderSignal.then(function () { return _this.OnHasMember(memberName, callback); });
        }
    };
    /**
     * Adds or updates a workload setting link
     *
     * @param settingLink link to add or update
     */
    O365ShellWrapper.prototype.AddOrUpdateWorkloadSettingLink = function (settingLink) {
        if (this.DoesShellExist() && this.Settings) {
            this.Settings.AddOrUpdateWorkloadSettingLink(settingLink);
        }
    };
    /**
     * Removes a workload setting link
     *
     * @param settingLinkID Id of link to be removed
     */
    O365ShellWrapper.prototype.RemoveWorkloadSettingLink = function (settingLinkID) {
        if (this.DoesShellExist() && this.Settings) {
            this.Settings.RemoveWorkloadSettingLink(settingLinkID);
        }
    };
    /**
     * Sets workload settings links
     *
     * @param settingsLinks array of links to be added
     */
    O365ShellWrapper.prototype.SetWorkloadSettingsLinks = function (settingsLinks) {
        if (this.DoesShellExist() && this.Settings) {
            this.Settings.SetWorkloadSettingsLinks(settingsLinks);
        }
    };
    /**
     * Gets the resource loader
     */
    O365ShellWrapper.prototype.GetResourceLoader = function () {
        return O365Shell.GetResourceLoader();
    };
    /**
    * This is not provided by O365Shell. It just checks if a given member/function name
    * is defined on the global shell object, as an alternative to if (O365Shell.Whatever) { ... }.
    */
    O365ShellWrapper.prototype._hasMember = function (memberName) {
        return this.DoesShellExist() && Boolean(O365Shell[memberName]);
    };
    return O365ShellWrapper;
}());
/* harmony default export */ __webpack_exports__["default"] = (O365ShellWrapper);


/***/ }),

/***/ "0Oc1":
/*!***********************************************!*\
  !*** ../sp-search-common/lib/getCleanPuid.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getCleanPuid; });
function getCleanPuid(puid) {
    return puid.lastIndexOf('|') > -1 && puid.indexOf('@') > -1
        ? puid.substring(puid.lastIndexOf('|') + 1, puid.indexOf('@'))
        : puid;
}


/***/ }),

/***/ "0WS3":
/*!*****************************************!*\
  !*** ./lib/O365ShellSettingsWrapper.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** Wrapper around the O365Shell.Settings global, preventing other files from needing to access the global */
var O365ShellSettingsWrapper = /** @class */ (function () {
    function O365ShellSettingsWrapper() {
    }
    O365ShellSettingsWrapper.prototype.AddOrUpdateWorkloadSettingLink = function (settingLink) {
        try {
            if (O365Shell && O365Shell.Settings) {
                return O365Shell.Settings.AddOrUpdateWorkloadSettingLink(settingLink);
            }
        }
        catch (e) {
            // fail silently
        }
    };
    O365ShellSettingsWrapper.prototype.RemoveWorkloadSettingLink = function (settingLinkID) {
        try {
            if (O365Shell && O365Shell.Settings) {
                return O365Shell.Settings.RemoveWorkloadSettingLink(settingLinkID);
            }
        }
        catch (e) {
            // fail silently
        }
    };
    O365ShellSettingsWrapper.prototype.SetWorkloadSettingsLinks = function (settingLink) {
        try {
            if (O365Shell && O365Shell.Settings) {
                return O365Shell.Settings.SetWorkloadSettingsLinks(settingLink);
            }
        }
        catch (e) {
            // fail silently
        }
    };
    return O365ShellSettingsWrapper;
}());
/* harmony default export */ __webpack_exports__["default"] = (O365ShellSettingsWrapper);


/***/ }),

/***/ "2q6Q":
/*!***********************************!*\
  !*** external "@ms/sp-telemetry" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2q6Q__;

/***/ }),

/***/ "5Oht":
/*!****************************************************!*\
  !*** ./lib/dataAccess/OnPremSuiteNavDataSource.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SuiteNavManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SuiteNavManager */ "FMHC");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__);



var OnPremSuiteNavDataSource = /** @class */ (function () {
    /**
     * Initializes a new instance of the SuiteNavManagerConfiguration
     * @TODO Task 161973 Add PageContext and set the
     * webPermissionMask/suiteNavData.UserDisplayName/webServerRelativeUrl/currentUICultureName
     */
    function OnPremSuiteNavDataSource(httpClient, currentUICultureName, webServerRelativeUrl) {
        this.suiteNavService = 1 /* OnPrem */;
        this._currentUICultureName = currentUICultureName;
        this._spHttpClient = httpClient;
        this._siteRelUrl = webServerRelativeUrl === '/' ? '' : webServerRelativeUrl;
    }
    // Downloads the OnPrem version of the SuiteNavData
    OnPremSuiteNavDataSource.prototype.loadData = function () {
        var _this = this;
        var url = this._siteRelUrl
            + '/_api/Microsoft.SharePoint.Portal.SuiteNavData.GetSuiteNavData?v=2&Locale='
            + this._currentUICultureName;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('OnPremSuiteNavDataSource');
        return this._spHttpClient.get(url, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__["SPHttpClient"].configurations.v1)
            .then(function (response) {
            if (response.status !== 200) {
                _this._logAndThrowSuiteNavLoadingError(qosMonitor, response);
            }
            return response.json().then(function (jsonString) {
                if (jsonString.value === '') {
                    _this._logAndThrowSuiteNavLoadingError(qosMonitor, response);
                }
                else {
                    qosMonitor.writeSuccess();
                    var suiteNavResponse = JSON.parse(jsonString.value);
                    // If the height of the suiteNav is not provided, assume that it is 50px
                    if (suiteNavResponse.NavBarData && !suiteNavResponse.NavBarData.Dimensions) {
                        suiteNavResponse.NavBarData.Dimensions = { Top: _SuiteNavManager__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_SUITENAV_HEIGHT"] };
                    }
                    return suiteNavResponse; // tslint:disable-line:no-any
                }
            });
        });
    };
    OnPremSuiteNavDataSource.prototype._logAndThrowSuiteNavLoadingError = function (qosMonitor, response) {
        var errorMessage = 'Failed to retrieve Hybrid SuiteNavData';
        var error = new Error(errorMessage);
        qosMonitor.writeUnexpectedFailure('FailedToRetrieveOnPremSuiteNavData', error, {
            responseStatus: response ? response.status : '',
            correlationId: response ? response.correlationId : ''
        });
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(OnPremSuiteNavDataSource._logSource, errorMessage);
        throw error;
    };
    // @TODO Bug 169685 change to readonly
    OnPremSuiteNavDataSource._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('OnPremSuiteNavDataSource');
    return OnPremSuiteNavDataSource;
}());
/* harmony default export */ __webpack_exports__["default"] = (OnPremSuiteNavDataSource);


/***/ }),

/***/ "7fwW":
/*!***********************************************!*\
  !*** ./lib/search/manageSearchBoxSettings.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return manageSearchBoxSettings; });
/* harmony import */ var _msfast_search_prefetch_lib_createAsyncTokenProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @msfast/search-prefetch/lib/createAsyncTokenProvider */ "D8Rd");
/* harmony import */ var _ms_sp_search_common_lib_getSharePointEnvironment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-search-common/lib/getSharePointEnvironment */ "cj/x");
/* harmony import */ var _createSearchInstrumenterOnce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createSearchInstrumenterOnce */ "A/Iv");
/* harmony import */ var _createSearchPrefetchStateOnce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createSearchPrefetchStateOnce */ "tFCy");
/* harmony import */ var _suiteSearchDispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./suiteSearchDispatcher */ "Cuz1");
/* harmony import */ var _asyncAppLevelUpdater__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./asyncAppLevelUpdater */ "oFNc");






function manageSearchBoxSettings(puid, asyncShell, asyncPageContext) {
    var instrumenter = Object(_createSearchInstrumenterOnce__WEBPACK_IMPORTED_MODULE_2__["default"])();
    var state = Object(_createSearchPrefetchStateOnce__WEBPACK_IMPORTED_MODULE_3__["default"])('@ms/sp-suite-nav', puid || '@ms/sp-suite-navFailedToProvidePuid');
    var asyncFeatures = fetchFeatures(asyncShell, asyncPageContext, instrumenter, state);
    var providerNames = ['BingForBusiness', 'Loki', 'SharePointSites', 'Substrate'];
    // The token providers are defer loaded to save bytes. The async token
    // providers below will hand over any token requests to the real token
    // providers when they are available.
    var asyncTokenProviders = providerNames.reduce(function (acc, name) { return (acc[name] = Object(_msfast_search_prefetch_lib_createAsyncTokenProvider__WEBPACK_IMPORTED_MODULE_0__["default"])(asyncFeatures.then(function (_a) {
        var tokenProviders = _a.tokenProviders;
        return tokenProviders[name];
    })),
        acc); }, {});
    return {
        searchBoxInstrumenter: instrumenter,
        searchBoxCache: state.cache,
        GetTokenRequestDictionary: function () { return asyncTokenProviders; }
    };
}
function fetchFeatures(asyncShell, asyncPageContext, instrumenter, state) {
    asyncPageContext.then(function (_a) {
        var legacyPageContext = _a.legacyPageContext;
        return instrumenter.setProps({
            hostAppId: 'SharePointShared',
            hostAppVersion: legacyPageContext.siteClientTag,
            hostAppEnvironment: legacyPageContext.env,
            spSiteSubscriptionId: legacyPageContext.siteSubscriptionId,
            spEnvironment: Object(_ms_sp_search_common_lib_getSharePointEnvironment__WEBPACK_IMPORTED_MODULE_1__["default"])(legacyPageContext.env, legacyPageContext.webAbsoluteUrl)
        });
    });
    return Promise
        .all([asyncShell, asyncPageContext])
        .then(function (_a) {
        var shell = _a[0], pageContext = _a[1];
        return Promise.all(/*! import() | sp-suite-nav-search-common */[__webpack_require__.e("vendors~sp-suite-nav-search-common"), __webpack_require__.e("sp-suite-nav-search-common")]).then(__webpack_require__.bind(null, /*! ./createConfiguredCommonSearchFeatures */ "gbBp")).then(function (features) { return (Object(_asyncAppLevelUpdater__WEBPACK_IMPORTED_MODULE_5__["resolveAppLevelUpdaterPromise"])(features.appLevelUpdater),
            features.default(shell, pageContext, instrumenter, state)); });
    });
}


/***/ }),

/***/ "A/Iv":
/*!****************************************************!*\
  !*** ./lib/search/createSearchInstrumenterOnce.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createSearchInstrumenterOnce; });
/* harmony import */ var _msfast_search_instrumentation_lib_createInstrumenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @msfast/search-instrumentation/lib/createInstrumenter */ "PleR");
/* harmony import */ var _msfast_search_logger_lib_performance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @msfast/search-logger/lib/performance */ "S9p2");


var instrumenter;
/**
 * Creates the search instrumenter the first time it is called. Returns the
 * created instance on next invocations.
 *
 * @alpha
 */
// tslint:disable-next-line:export-name
function createSearchInstrumenterOnce() {
    return instrumenter || (instrumenter = Object(_msfast_search_instrumentation_lib_createInstrumenter__WEBPACK_IMPORTED_MODULE_0__["default"])({
        perf: _msfast_search_logger_lib_performance__WEBPACK_IMPORTED_MODULE_1__,
        scenario: 'Unspecified'
    })); // tslint:disable-line:no-any
}


/***/ }),

/***/ "Cuz1":
/*!*********************************************!*\
  !*** ./lib/search/suiteSearchDispatcher.js ***!
  \*********************************************/
/*! exports provided: switchDispatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchDispatcher", function() { return switchDispatcher; });
/* harmony import */ var _msfast_search_dispatcher_lib_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @msfast/search-dispatcher/lib/dispatcher */ "bpGp");
/* harmony import */ var _msfast_search_dispatcher_lib_createDispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @msfast/search-dispatcher/lib/createDispatcher */ "Vht5");


var buffering = true;
var buffer = [];
var dispatcher = Object(_msfast_search_dispatcher_lib_createDispatcher__WEBPACK_IMPORTED_MODULE_1__["default"])();
var unregister = dispatcher.register(function (e) { return buffer.push(e); });
Object(_msfast_search_dispatcher_lib_dispatcher__WEBPACK_IMPORTED_MODULE_0__["setDispatcher"])(dispatcher);
/**
 * Switches the dispatcher to dispatch to. Returns any buffered events that
 * should be handed over to a logger.
 *
 * @alpha
 */
// tslint:disable-next-line:export-name
function switchDispatcher(nextDispatcher) {
    Object(_msfast_search_dispatcher_lib_dispatcher__WEBPACK_IMPORTED_MODULE_0__["setDispatcher"])(nextDispatcher);
    if (buffering) {
        buffering = false;
        dispatcher.unregister(unregister);
        var bufferCopy = buffer.slice(0);
        buffer = [];
        return bufferCopy;
    }
    return [];
}


/***/ }),

/***/ "D8Rd":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/createAsyncTokenProvider.js ***!
  \*************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createAsyncTokenProvider; });
function createAsyncTokenProvider(theAsyncTokenProvider) {
    var theProvider = null;
    return function asyncTokenProvider(spec) {
        return theProvider
            ? theProvider(spec)
            : theAsyncTokenProvider.then(function (provider) { return ((theProvider = provider), provider(spec)); });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlQXN5bmNUb2tlblByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NyZWF0ZUFzeW5jVG9rZW5Qcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQUMsT0FBTyxVQUFVLHdCQUF3QixDQUM5QyxxQkFBNkM7SUFFN0MsSUFBSSxXQUFXLEdBQXlCLElBQUksQ0FBQztJQUM3QyxPQUFPLFNBQVMsa0JBQWtCLENBQ2hDLElBQXdCO1FBRXhCLE9BQU8sV0FBVztZQUNoQixDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNuQixDQUFDLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUN4QixVQUFBLFFBQVEsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQTFDLENBQTBDLENBQ3ZELENBQUM7SUFDUixDQUFDLENBQUM7QUFDSixDQUFDIn0=

/***/ }),

/***/ "FMHC":
/*!********************************!*\
  !*** ./lib/SuiteNavManager.js ***!
  \********************************/
/*! exports provided: DEFAULT_SUITENAV_HEIGHT, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SUITENAV_HEIGHT", function() { return DEFAULT_SUITENAV_HEIGHT; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ms_odsp_utilities_lib_theming_SuiteNavTheming__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ms/odsp-utilities/lib/theming/SuiteNavTheming */ "aDzz");
/* harmony import */ var _ms_odsp_utilities_lib_theming_SuiteNavTheming__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_theming_SuiteNavTheming__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ms_odsp_utilities_lib_models_store_BaseDataStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ms/odsp-utilities/lib/models/store/BaseDataStore */ "IveV");
/* harmony import */ var _ms_odsp_utilities_lib_models_store_BaseDataStore__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_models_store_BaseDataStore__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ms_odsp_utilities_lib_models_store_DataStoreCachingType__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ms/odsp-utilities/lib/models/store/DataStoreCachingType */ "y91V");
/* harmony import */ var _ms_odsp_utilities_lib_models_store_DataStoreCachingType__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_models_store_DataStoreCachingType__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _models_IShellBaseTheme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./models/IShellBaseTheme */ "iIlt");
/* harmony import */ var _models_SuiteNavLinkIds__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./models/SuiteNavLinkIds */ "ogh3");
/* harmony import */ var _dataAccess_SPOSuiteNavDataSource__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./dataAccess/SPOSuiteNavDataSource */ "ZG7e");
/* harmony import */ var _dataAccess_OnPremSuiteNavDataSource__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dataAccess/OnPremSuiteNavDataSource */ "5Oht");
/* harmony import */ var _O365ShellWrapper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./O365ShellWrapper */ "019d");
/* harmony import */ var _search_manageSearchBoxSettings__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./search/manageSearchBoxSettings */ "7fwW");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file Data source for the suite nav.
 */
















/**
 * @internal
 */
var DEFAULT_SUITENAV_HEIGHT = '50px';
var CACHE_PREFIX = 'SPPPLATSuiteNav';
var SERVICE_KEY = 'SuiteNavService';
var DATA_KEY = 'Data';
var DATE_KEY = 'CacheDate';
var VERSION_KEY = 'CacheVersion';
var SESSION_KEY = 'CachedThisSession';
var THEME_KEY = 'ThemeData';
var REACT_SHELL_BOOTSTRAPPER_HOST = 'https://shellprod.msocdn.com';
var REACT_SHELL_BOOTSTRAPPER_PPE_HOST = 'https://shellppe.msocdn.com';
var REACT_SHELL_BOOTSTRAPPER_API = '/api/shellbootstrapper/business/oneshell';
// This constant can be used to invalidate the cache if we make incompatible changes
var CACHE_VERSION = 1;
var cache = new _ms_odsp_utilities_lib_models_store_BaseDataStore__WEBPACK_IMPORTED_MODULE_7___default.a(CACHE_PREFIX, _ms_odsp_utilities_lib_models_store_DataStoreCachingType__WEBPACK_IMPORTED_MODULE_8___default.a.local);
var logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_LogSource"].create('SuiteNavManager');
/**
 * @internal
 */
var SuiteNavManager = /** @class */ (function () {
    function SuiteNavManager(suiteNavDiv, serviceScope, isFullPageLoad) {
        if (isFullPageLoad === void 0) { isFullPageLoad = true; }
        var _this = this;
        this._suiteNavDiv = suiteNavDiv;
        this._serviceScope = serviceScope;
        this._isFullPageLoad = isFullPageLoad;
        serviceScope.whenFinished(function () {
            _this._httpClient = serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__["SPHttpClient"].serviceKey);
        });
    }
    /**
     * Loads the SuiteNav into the page by obtaining the data, building the model, getting the shell wrapper
     * and rendering it onto the page.
     */
    SuiteNavManager.prototype.loadSuiteNav = function (suiteNavConfig) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(suiteNavConfig, 'suiteNavConfig');
        if (isSuiteNavNewFlowFlightEnabled()) {
            this._initializeSuiteNavConfig(suiteNavConfig);
            this._completeSuiteNavNewFlow();
        }
        else {
            this._initializeSuiteNavConfig(suiteNavConfig);
            var o365ShellWrapper_1 = new _O365ShellWrapper__WEBPACK_IMPORTED_MODULE_14__["default"]();
            // If the shell has been successfully loaded before, always attempt to contact the server for fresh NavBarData
            this._suiteNavModelPromise = this._getSuiteNavModel(o365ShellWrapper_1.DoesShellExist());
            this._suiteNavModelPromise.then(function (suiteNavModel) {
                var suiteNavJSPromise = !o365ShellWrapper_1.DoesShellExist() ?
                    getSuiteNavShell(suiteNavModel.CssUrl, suiteNavModel.JsUrl, suiteNavModel) :
                    Promise.resolve(undefined);
                suiteNavJSPromise.then(function () {
                    setO365ShellData(o365ShellWrapper_1, suiteNavModel.NavBarData);
                    _this._renderSuiteNav(o365ShellWrapper_1);
                });
            });
        }
    };
    SuiteNavManager.prototype.loadSuiteNavNewFlow = function (suiteNavConfig) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(suiteNavConfig, 'suiteNavConfig');
        this._initializeSuiteNavConfig(suiteNavConfig);
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"]('SuiteNavManager');
        this._suiteNavLoadStart = _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_9__["_PerformanceLogger"].now();
        this.o365ShellWrapperPromise.then(function (o365Shell) { return _this._renderSuiteNav(o365Shell, qosMonitor); }).catch(function (errorMessage) {
            qosMonitor.writeUnexpectedFailure('SuiteNavManagerFailure', new Error(errorMessage));
        });
    };
    SuiteNavManager.prototype._initializeSuiteNavConfig = function (suiteNavConfig) {
        this._suiteNavManagerConfiguration = suiteNavConfig;
        if (this._suiteNavManagerConfiguration.updateSuiteNavHeight) {
            this._suiteNavManagerConfiguration.updateSuiteNavHeight(DEFAULT_SUITENAV_HEIGHT);
        }
        this._suiteNavManagerConfiguration.o365ShellRenderSettings.top = this._suiteNavDiv.id;
    };
    SuiteNavManager.prototype._completeSuiteNavNewFlow = function () {
        var _this = this;
        var o365ShellPromise = this.o365ShellWrapperPromise.then(function (o365Shell) {
            _this._renderSuiteNav(o365Shell);
            return o365Shell;
        });
        var suiteNavModelPromise = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].parse('0de83bec-9340-441f-a352-c61e2e1a062e'), '7/3/2019', 'SuiteNavManager_getSuiteNavModel') ?
            this._getSuiteNavModel(!!this._o365ShellWrapper) :
            this._getSuiteNavModel(this._setO365ShellDataCalledOnce ||
                !this._isFullPageLoad);
        Promise.all([o365ShellPromise, suiteNavModelPromise]).then(function (promiseResults) {
            var o365ShellPromiseResult = promiseResults[0];
            var suiteNavModelPromiseResult = promiseResults[1];
            if (o365ShellPromiseResult) {
                setO365ShellData(o365ShellPromiseResult, suiteNavModelPromiseResult.NavBarData);
                if (_this._shouldDelayLoadingResources()) {
                    setTimeout(function () { return o365ShellPromiseResult.GetResourceLoader().loadAll(); }, 5000 /** 5 seconds */);
                }
                _this._setO365ShellDataCalledOnce = true;
                if (!_this._isFullPageLoad) {
                    _this._onRender(o365ShellPromiseResult);
                    _this._onPostRender();
                }
            }
        });
    };
    /**
     * Gets the suite nav data. Tries to grab SPO and OnPrem version in parallel and if SPO fails then
     * the onPrem version is loaded.
     * @param webServerRelativeUrl - represents the SharePoint web server relative URL
     * @param cultureName - represents the name of the culture (e.g. 'en-us')
     * @returns a promise that resolves to a string containing the response from the Suite Nav service.
     */
    SuiteNavManager.prototype._getSuiteNavModel = function (forceFetchData) {
        var _this = this;
        var suiteNavModelPromise;
        forceFetchData = !!forceFetchData || this._wasPageRefreshed();
        if (!forceFetchData && this._isCacheValid() && !isCacheOutdated()) {
            suiteNavModelPromise = this._loadSuiteNavFromCache();
        }
        else {
            clearCache();
            suiteNavModelPromise = this._loadSuiteNavFromServer();
        }
        return suiteNavModelPromise.then(function (model) {
            model.NavBarData = _this._suiteNavManagerConfiguration.modifySuiteNavData(model);
            model.NavBarData.UserDisplayName = _this._getUserDisplayName(model.NavBarData.UserDisplayName);
            model.CacheToken = _this._suiteNavManagerConfiguration.cacheToken;
            model.UserIdentifier = _this._suiteNavManagerConfiguration.systemUserKey;
            model.NavBarData.AppBrandTheme = _models_IShellBaseTheme__WEBPACK_IMPORTED_MODULE_10__["DEFAULT_APP_BRAND_THEME"];
            updateCache(model, _this._suiteNavDataSource.suiteNavService);
            if (model && model.NavBarData && model.NavBarData.Dimensions && model.NavBarData.Dimensions.Top) {
                if (_this._suiteNavManagerConfiguration.updateSuiteNavHeight) {
                    _this._suiteNavManagerConfiguration.updateSuiteNavHeight(model.NavBarData.Dimensions.Top);
                }
            }
            return model;
        });
    };
    SuiteNavManager.prototype._wasPageRefreshed = function () {
        return window.performance &&
            window.performance.navigation &&
            window.performance.navigation.type === 1;
    };
    SuiteNavManager.prototype._loadSuiteNavFromCache = function () {
        var _this = this;
        return new Promise(function (complete) {
            cache.getValue(SERVICE_KEY) ===
                0 /* SPO */ ?
                _this._suiteNavDataSource = _this._createSPODataSource() :
                _this._suiteNavDataSource = _this._createOnPremDataSource();
            complete(cache.getValue(DATA_KEY));
        });
    };
    SuiteNavManager.prototype._loadSuiteNavFromServer = function () {
        var _this = this;
        this._suiteNavDataSource = this._createSPODataSource();
        var onPremDataSource = this._createOnPremDataSource();
        var onPremSuiteNavResponse = onPremDataSource.loadData();
        onPremSuiteNavResponse.catch(function () {
            createSuiteNavErrorLogEntry('loadData', 'Failed to retrieve Hybrid SuiteNavData');
        });
        return this._suiteNavDataSource.loadData().then(function (response) {
            return response;
        }).catch(function () {
            createSuiteNavErrorLogEntry('loadData', 'Failed to retrieve SPO SuiteNavData');
            _this._suiteNavDataSource = onPremDataSource;
            return onPremSuiteNavResponse;
        });
    };
    Object.defineProperty(SuiteNavManager.prototype, "o365ShellWrapperPromise", {
        get: function () {
            var _this = this;
            if (!this._o365ShellPromise) {
                if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].parse('1c270e87-f8ad-4bb4-8fa1-51f2458471d8'), '2019/10/28', 'Use preloaded suiteNav') // tslint:disable-line:max-line-length
                    && _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isEnabled(1136 /* O365ShellModuleJSClient */)) {
                    var o365ShellWrapper_2 = new _O365ShellWrapper__WEBPACK_IMPORTED_MODULE_14__["default"]();
                    if (o365ShellWrapper_2.DoesShellExist()) {
                        // VSO:793997 - Once the server-side code is in place, we should add a perf marker
                        this._suiteNavModuleLoaded = _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_9__["_PerformanceLogger"].now();
                        this._o365ShellWrapper = o365ShellWrapper_2;
                        this._o365ShellPromise = Promise.resolve(o365ShellWrapper_2);
                    }
                    else {
                        this._o365ShellPromise = _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__["SPComponentLoader"].loadScript(getShellBootstrapUrl()).then(function () {
                            if (o365ShellWrapper_2.DoesShellExist()) {
                                _this._suiteNavModuleLoaded = _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_9__["_PerformanceLogger"].now();
                                _this._o365ShellWrapper = o365ShellWrapper_2;
                                return _this._o365ShellWrapper;
                            }
                        });
                    }
                }
                else {
                    this._o365ShellPromise =
                        _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__["SPComponentLoader"].loadScript(getShellBootstrapUrl()).then(function () {
                            var o365ShellWrapper = new _O365ShellWrapper__WEBPACK_IMPORTED_MODULE_14__["default"]();
                            if (o365ShellWrapper.DoesShellExist()) {
                                _this._suiteNavModuleLoaded = _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_9__["_PerformanceLogger"].now();
                                _this._o365ShellWrapper = o365ShellWrapper;
                                return _this._o365ShellWrapper;
                            }
                        });
                }
            }
            return this._o365ShellPromise;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Renders the Suite Nav.
     * @param o365Shell - Represents the Suite Nav shell wrapper.
     * @param suiteNavData - Represents the Suite Nav data that will be used for
     * rendering.
     */
    SuiteNavManager.prototype._renderSuiteNav = function (o365Shell, qosMonitor) {
        var _this = this;
        if (o365Shell && !this._renderedOnce) {
            this._renderedOnce = true;
            if (this._isFullPageLoad) {
                if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isEnabled(1136 /* O365ShellModuleJSClient */)) {
                    this._onRender(o365Shell);
                    this._onPostRender();
                    this._setSearchBoxSettings(o365Shell);
                }
                else {
                    var renderSettings = this._getRenderSettings();
                    var shellRenderedResolver_1 = function () { return void 0; };
                    if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isEnabled(1455) /* isSearchBoxInHeaderFlighted */) {
                        renderSettings = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, renderSettings, Object(_search_manageSearchBoxSettings__WEBPACK_IMPORTED_MODULE_15__["default"])(this._suiteNavManagerConfiguration.userId, new Promise(function (r) { return shellRenderedResolver_1 = r; }), new Promise(function (resolve) { return _this._serviceScope.whenFinished(function () { return resolve(_this._serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__["PageContext"].serviceKey)); }); })));
                    }
                    o365Shell.RenderAsync(renderSettings, function () {
                        shellRenderedResolver_1(o365Shell);
                        _this._suiteNavRendered = _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_9__["_PerformanceLogger"].now();
                        if (qosMonitor) {
                            qosMonitor.writeSuccess({
                                suiteNavLoadStart: _this._suiteNavLoadStart,
                                suiteNavModuleLoaded: _this._suiteNavModuleLoaded,
                                suiteNavRendered: _this._suiteNavRendered
                            });
                        }
                        _this._onRender(o365Shell);
                    }, function () {
                        _this._onPostRender();
                    });
                }
            }
            else if (!isSuiteNavNewFlowFlightEnabled()) {
                this._onRender(o365Shell);
                this._onPostRender();
            }
            o365Shell.OnHasMember('LoadShellPlus', function () {
                _this._loadShellPlus(o365Shell);
            });
            if (o365Shell.Theme) {
                o365Shell.Theme.OnThemeChanged(function (themeData) {
                    return updateCachedThemeData(themeData);
                });
            }
            if (o365Shell.Extensibility && this._suiteNavManagerConfiguration.customButtonData) {
                this._suiteNavManagerConfiguration.customButtonData.forEach(function (buttonConfig) {
                    // Transform configuration data into the format required by the shell
                    var customButton = {
                        id: buttonConfig.id,
                        iconFontName: buttonConfig.iconFontName,
                        iconFontFamily: buttonConfig.iconFontFamily,
                        onHide: buttonConfig.onHide || (buttonConfig.getOnHide && buttonConfig.getOnHide(o365Shell)),
                        onShow: buttonConfig.onShow || (buttonConfig.getOnShow && buttonConfig.getOnShow(o365Shell)),
                        ariaLabel: buttonConfig.ariaLabel,
                        affordanceMenuItemText: buttonConfig.affordanceMenuItemText,
                        isStateless: buttonConfig.isStateless
                    };
                    o365Shell.Extensibility /*Defined at this point*/.AddOrUpdateCustomHeaderButton(customButton);
                });
            }
        }
    };
    SuiteNavManager.prototype._setSearchBoxSettings = function (o365Shell) {
        var _this = this;
        var shellRenderedResolver = function () { return void 0; };
        var searchBoxSettings = Object(_search_manageSearchBoxSettings__WEBPACK_IMPORTED_MODULE_15__["default"])(this._suiteNavManagerConfiguration.userId, new Promise(function (r) { return shellRenderedResolver = r; }), new Promise(function (resolve) { return _this._serviceScope.whenFinished(function () { return resolve(_this._serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__["PageContext"].serviceKey)); }); }));
        // tslint:disable:max-line-length
        if (o365Shell.Search) {
            if (searchBoxSettings.searchBoxCache) {
                o365Shell.Search.SetCache(searchBoxSettings.searchBoxCache);
            }
            if (searchBoxSettings.searchBoxInstrumenter) {
                o365Shell.Search.SetInstrumenter(searchBoxSettings.searchBoxInstrumenter);
            }
            if (searchBoxSettings.GetTokenRequestDictionary) {
                o365Shell.Search.SetTokenProviders(searchBoxSettings.GetTokenRequestDictionary());
            }
        }
        // tslint:enable:max-line-length
        shellRenderedResolver(o365Shell);
    };
    SuiteNavManager.prototype._getRenderSettings = function () {
        if (isSuiteNavNewFlowFlightEnabled()) {
            var cachedThemeData = getCachedThemeData();
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this._suiteNavManagerConfiguration.o365ShellRenderSettings, { initialRenderData: {
                    AppBrandTheme: cachedThemeData ? cachedThemeData : _models_IShellBaseTheme__WEBPACK_IMPORTED_MODULE_10__["DEFAULT_APP_BRAND_THEME"],
                    Culture: this._suiteNavManagerConfiguration.currentUICultureName,
                    CurrentMainLinkElementID: _models_SuiteNavLinkIds__WEBPACK_IMPORTED_MODULE_11__["default"].SITES,
                    IsConsumer: false,
                    ShellBootHost: getShellBootstrapHost(),
                    UserDisplayName: this._getUserDisplayName(this._suiteNavManagerConfiguration.userDisplayName),
                    UserID: this._suiteNavManagerConfiguration.userId,
                    WorkloadId: _models_SuiteNavLinkIds__WEBPACK_IMPORTED_MODULE_11__["default"].SHAREPOINT_WORKLOAD
                }, enableDelayLoading: this._shouldDelayLoadingResources() });
        }
        else {
            return this._suiteNavManagerConfiguration.o365ShellRenderSettings;
        }
    };
    SuiteNavManager.prototype._onRender = function (o365Shell) {
        var actionsMap = this._suiteNavManagerConfiguration.getActionsMap();
        if (actionsMap && Object.keys(actionsMap).length > 0) {
            o365Shell.Navigation.OnLinkClick(function (eventArgs) {
                var action = actionsMap && actionsMap[eventArgs.Id];
                if (action) {
                    action();
                }
            });
        }
        if (this._suiteNavManagerConfiguration.hamburgerCallback) {
            if (o365Shell.Navigation.OnHamburgerButtonClick) {
                o365Shell.Navigation.OnHamburgerButtonClick(this._suiteNavManagerConfiguration.hamburgerCallback);
            }
        }
    };
    SuiteNavManager.prototype._onPostRender = function () {
        if (this._suiteNavManagerConfiguration.suiteNavPostRenderCallback) {
            this._suiteNavManagerConfiguration.suiteNavPostRenderCallback();
        }
    };
    /**
      * LoadShellPlus will start downloading additional files required for notifications
      * and such. Once ShellPlus is ready, postRenderActions will be called.
      */
    SuiteNavManager.prototype._loadShellPlus = function (o365Shell) {
        return new Promise(function () {
            o365Shell.LoadShellPlus();
        }).catch(function (errorMessage) {
            createSuiteNavErrorLogEntry('loadShellPlus', errorMessage);
        });
    };
    SuiteNavManager.prototype._isCacheValid = function () {
        // Cached data is valid (still usable for rendering) if:
        // - the CSS URL and JS URL are present (if we're trying to load the real suite nav)
        // - the data is for the same user
        // - the cache version is the same
        // - the site client tag is the same (if it's different, the theme has changed)
        var model = cache.getValue(DATA_KEY);
        var oldVersion = cache.getValue(VERSION_KEY);
        var cssJsUrlPresent = model && model.NavBarData && (model.JsUrl.length > 0 && model.CssUrl.length > 0);
        var sameVersion = oldVersion === CACHE_VERSION;
        var sameUser = model && model.UserIdentifier === this._suiteNavManagerConfiguration.systemUserKey;
        var sameCacheToken = model && model.CacheToken === this._suiteNavManagerConfiguration.cacheToken;
        return cssJsUrlPresent && sameVersion && sameUser && sameCacheToken;
    };
    SuiteNavManager.prototype._createSPODataSource = function () {
        return new _dataAccess_SPOSuiteNavDataSource__WEBPACK_IMPORTED_MODULE_12__["default"](this._httpClient, this._suiteNavManagerConfiguration.currentUICultureName, this._suiteNavManagerConfiguration.webServerRelativeUrl);
    };
    SuiteNavManager.prototype._createOnPremDataSource = function () {
        return new _dataAccess_OnPremSuiteNavDataSource__WEBPACK_IMPORTED_MODULE_13__["default"](this._httpClient, this._suiteNavManagerConfiguration.currentUICultureName, this._suiteNavManagerConfiguration.webServerRelativeUrl);
    };
    SuiteNavManager.prototype._getUserDisplayName = function (userDisplayName) {
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].parse('8ac6cd01-3f2b-4639-a832-c9547f1495ad'), '3/13/2019', 'SuiteNavManager _getUserDisplayName')) {
            return userDisplayName;
        }
        else {
            userDisplayName = userDisplayName ||
                this._suiteNavManagerConfiguration && this._suiteNavManagerConfiguration.userDisplayName;
            return userDisplayName;
        }
    };
    SuiteNavManager.prototype._shouldDelayLoadingResources = function () {
        return !_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].parse('504b66e5-263c-4bfd-8ad2-5ee443d2fe14'), '8/21/2019', 'SuiteNavManager _shouldDelayLoadingResources');
    };
    return SuiteNavManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (SuiteNavManager);
function updateCache(model, service) {
    cache.setValue(DATA_KEY, model);
    cache.setValue(DATE_KEY, new Date());
    cache.setValue(VERSION_KEY, CACHE_VERSION);
    cache.setValue(SESSION_KEY, true, _ms_odsp_utilities_lib_models_store_DataStoreCachingType__WEBPACK_IMPORTED_MODULE_8___default.a.session);
    cache.setValue(SERVICE_KEY, service);
}
function clearCache() {
    cache.remove(DATA_KEY);
    cache.remove(DATE_KEY);
    cache.remove(VERSION_KEY);
    cache.remove(SERVICE_KEY);
}
function getCachedThemeData() {
    var cachedThemeData;
    var themeDataCache = cache.getValue(THEME_KEY);
    if (themeDataCache && themeDataCache.themeData) {
        cachedThemeData = themeDataCache.themeData;
    }
    return cachedThemeData;
}
function updateCachedThemeData(themeData) {
    var themeCache = {
        themeData: themeData,
        cacheDate: new Date()
    };
    cache.setValue(THEME_KEY, themeCache);
}
function getShellBootstrapHost() {
    var searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('usePPE') === 'true') {
        return "" + REACT_SHELL_BOOTSTRAPPER_PPE_HOST;
    }
    else {
        return "" + REACT_SHELL_BOOTSTRAPPER_HOST;
    }
}
function getShellBootstrapUrl() {
    return "" + getShellBootstrapHost() + REACT_SHELL_BOOTSTRAPPER_API;
}
function setO365ShellData(o365Shell, navBarData) {
    o365Shell.SetData(navBarData);
}
/**
 * Gets the O365Shell object, once it's loaded. This will also load the shell CSS
 */
function getSuiteNavShell(cssUrl, jsUrl, suiteNavModel) {
    _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(cssUrl, 'cssUrl');
    _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(jsUrl, 'jsUrl');
    var element = document.createElement('link');
    element.rel = 'stylesheet';
    element.type = 'text/css';
    element.href = cssUrl;
    document.head.appendChild(element);
    // Load themable CSS if we are rendering a fallback shell (e.g. on-prem)
    if (suiteNavModel && suiteNavModel.NavBarData && suiteNavModel.NavBarData.ClientData) {
        try {
            var clientData = JSON.parse(suiteNavModel.NavBarData.ClientData);
            if (clientData && clientData.IsFallbackShell) {
                Object(_ms_odsp_utilities_lib_theming_SuiteNavTheming__WEBPACK_IMPORTED_MODULE_6__["loadFallbackShellThemableCss"])();
            }
        }
        catch (errClientData) {
            // Ignore error parsing ClientData
        }
    }
    return _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__["SPComponentLoader"].loadScript(jsUrl);
}
function isCacheOutdated() {
    // "Outdated" means:
    // - it's more than 24 hours old
    // - it was not cached in the current browsing session (only applies if sessionStorage available)
    var cacheDate = Date.parse(cache.getValue(DATE_KEY));
    var currentDate = new Date();
    var cachedThisSession = cache.getValue(SESSION_KEY, _ms_odsp_utilities_lib_models_store_DataStoreCachingType__WEBPACK_IMPORTED_MODULE_8___default.a.session);
    return (isNaN(cacheDate) ||
        currentDate.getTime() - cacheDate > 24 * 60 * 60 * 1000 ||
        (_ms_odsp_utilities_lib_models_store_BaseDataStore__WEBPACK_IMPORTED_MODULE_7___default.a.hasStorageType(_ms_odsp_utilities_lib_models_store_DataStoreCachingType__WEBPACK_IMPORTED_MODULE_8___default.a.session) && !cachedThisSession));
}
/**
 * Create a log entry for logging
 * @param moduleName - represents the module that the logger was called in
 * @param errorMessage - represents the error string that occured
 */
function createSuiteNavErrorLogEntry(moduleName, errorMessage) {
    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_TraceLogger"].logVerbose(logSource, 'SuiteNavManager ' + moduleName + ' ' + errorMessage);
}
function isSuiteNavNewFlowFlightEnabled() {
    return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isEnabled(1309 /* SPClientSuiteNavCommon */);
}


/***/ }),

/***/ "I6O9":
/*!***************************************!*\
  !*** external "@microsoft/sp-loader" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_I6O9__;

/***/ }),

/***/ "IveV":
/*!************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/models/store/BaseDataStore.js ***!
  \************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DataStoreCachingType_1 = __webpack_require__(/*! ./DataStoreCachingType */ "y91V");
// DataStore class is used for transparent caching of data in memory and/or browser storage
// - Parameter defaultCachingType defines whether you want to use browser storage for all operations
// and which type of storage - session or local
// - Parameter dataStoreKey is used to prefix every key in browser storage. Actual key for browser storage
// will be dataStoreKey + key used in setValue method.
// - If DataStore is instantiated with some type of browser caching enabled - it will test if browser storage
// is available and use it. If it's not it will fall back to in-memory cache.
// - If DataStore is instantiated from two different places with same dataStoreKey and some type of
// browser storage caching, the memory storage will be shared as well as browser storage.
var DataStore = /** @class */ (function () {
    function DataStore(dataStoreKey, defaultCachingType) {
        if (defaultCachingType === void 0) { defaultCachingType = DataStoreCachingType_1.default.none; }
        DataStore.init();
        this.dataStoreKey = dataStoreKey;
        this.defaultCachingType = defaultCachingType;
        if (defaultCachingType === DataStoreCachingType_1.default.none) {
            this.dataStore = {};
        }
        else {
            var store = DataStore._dataStore[this.dataStoreKey];
            if (store === undefined) {
                DataStore._dataStore[this.dataStoreKey] = {};
            }
            this.dataStore = DataStore._dataStore[this.dataStoreKey];
        }
    }
    DataStore.hasStorageType = function (storageType) {
        DataStore.init();
        switch (storageType) {
            case DataStoreCachingType_1.default.none: return true;
            case DataStoreCachingType_1.default.sharedMemory: return true;
            case DataStoreCachingType_1.default.session: return !!DataStore._sessionStorage;
            case DataStoreCachingType_1.default.local: return !!DataStore._localStorage;
        }
        return false;
    };
    DataStore.init = function () {
        if (DataStore._initialized) {
            return;
        }
        // Need a try/catch since window.localStorage can throw.
        try {
            if ('localStorage' in window && window.localStorage && DataStore.testStorage(window.localStorage)) {
                DataStore._localStorage = window.localStorage;
            }
        }
        catch (exUsingLocalStorage) {
            // do nothing
        }
        try {
            if ('sessionStorage' in window && window.sessionStorage && DataStore.testStorage(window.sessionStorage)) {
                DataStore._sessionStorage = window.sessionStorage;
            }
        }
        catch (exUsingSessionStorage) {
            // do nothing
        }
        // Fallback logic
        if (DataStore._localStorage == null) {
            DataStore._localStorage = DataStore._sessionStorage;
        }
        DataStore._initialized = true;
    };
    /** Need to check whether the value in localStorage is of the correct type.
     * In Private Browsing in Safari, for example, localStorage is accessible,
     * but all of the non-built-in properties return undefined, and setting
     * such a property causes an exception.
     */
    DataStore.testStorage = function (storage) {
        var _testKey = "BrowserStorageTest";
        var _testValue = "1";
        var result = false;
        try {
            storage.setItem(_testKey, _testValue);
            if (storage.getItem(_testKey) === _testValue) {
                result = true;
            }
            storage.removeItem(_testKey);
        }
        catch (e) { /* no-op, return false */ }
        return result;
    };
    DataStore.prototype.setValue = function (key, value, cachingTypeOverride, normalizeKey) {
        if (normalizeKey === void 0) { normalizeKey = true; }
        key = normalizeKey ? this.normalizeKey(key) : key;
        this.dataStore[key] = value;
        var storage = this.getStorage(cachingTypeOverride);
        if (storage) {
            try {
                var objectsFound = [];
                var s = JSON.stringify(value, function (key, value) {
                    if (typeof value === 'object' && value !== null) {
                        if (objectsFound.indexOf(value) !== -1) {
                            // discard the key if circular dependency was found
                            return;
                        }
                        // Otherwise store value in the cache
                        objectsFound.push(value);
                    }
                    return value;
                });
                // empty cache
                objectsFound = null;
                storage.setItem(this.dataStoreKey + key, s);
            }
            catch (e) {
                // do nothing
            }
        }
    };
    DataStore.prototype.getValue = function (key, cachingTypeOverride, normalizeKey) {
        if (normalizeKey === void 0) { normalizeKey = true; }
        key = normalizeKey ? this.normalizeKey(key) : key;
        var value = this.dataStore[key];
        var storage = this.getStorage(cachingTypeOverride);
        if (value === undefined && storage) {
            var s = storage.getItem(this.dataStoreKey + key);
            if (s) {
                try {
                    value = JSON.parse(s);
                    this.dataStore[key] = value;
                }
                catch (e) {
                    value = undefined;
                }
            }
        }
        return value;
    };
    DataStore.prototype.remove = function (key, cachingTypeOverride, normalizeKey) {
        if (normalizeKey === void 0) { normalizeKey = true; }
        key = normalizeKey ? this.normalizeKey(key) : key;
        var storage = this.getStorage(cachingTypeOverride);
        if (storage) {
            storage.removeItem(this.dataStoreKey + key);
        }
        delete this.dataStore[key];
    };
    DataStore.prototype.getStorage = function (cachingTypeOverride) {
        var cachingType = cachingTypeOverride ? cachingTypeOverride : this.defaultCachingType;
        switch (cachingType) {
            case DataStoreCachingType_1.default.none:
                return null;
            case DataStoreCachingType_1.default.sharedMemory:
                return null;
            case DataStoreCachingType_1.default.session:
                return DataStore._sessionStorage;
            case DataStoreCachingType_1.default.local:
                return DataStore._localStorage;
        }
        return null;
    };
    DataStore.prototype.normalizeKey = function (key) {
        return key && key.toLowerCase() || '';
    };
    DataStore._sessionStorage = null;
    DataStore._localStorage = null;
    DataStore._dataStore = {};
    DataStore._initialized = false;
    return DataStore;
}());
exports.default = DataStore;
//# sourceMappingURL=BaseDataStore.js.map

/***/ }),

/***/ "J5pV":
/*!********************************!*\
  !*** ./lib/FlexPaneWrapper.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file Wrapper around the O365Shell.FlexPane global, preventing other files
 * from needing to access the global
 */

var FlexPaneWrapper = /** @class */ (function () {
    function FlexPaneWrapper() {
    }
    /* tslint:disable:no-any */
    FlexPaneWrapper.prototype.OnFlexPaneVisibilityChanged = function (callback) {
        /* tslint:enable:no-any */
        try {
            return O365Shell.FlexPane.OnFlexPaneVisibilityChanged(callback);
        }
        catch (e) {
            this._createFlexPaneWrapperErrorLogEntry('OnFlexPaneVisibilityChanged', e);
        }
    };
    FlexPaneWrapper.prototype.OpenFlexPaneForProvider = function (provider) {
        try {
            O365Shell.FlexPane.OpenFlexPaneForProvider(provider);
        }
        catch (e) {
            this._createFlexPaneWrapperErrorLogEntry('OpenFlexPaneForProvider', e);
        }
    };
    FlexPaneWrapper.prototype.CloseFlexPaneForProvider = function (provider) {
        try {
            O365Shell.FlexPane.CloseFlexPaneForProvider(provider);
        }
        catch (e) {
            this._createFlexPaneWrapperErrorLogEntry('CloseFlexPaneForProvider', e);
        }
    };
    /**
     * Create a log entry for logging
     * @param moduleName represents the module that the logger was called in
     * @param errorMessage represents the error string that occured
     * @returns a SuiteNav Error Log Entry
     */
    FlexPaneWrapper.prototype._createFlexPaneWrapperErrorLogEntry = function (moduleName, errorMessage) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(FlexPaneWrapper.logSource, 'FlexPaneWrapper ' + moduleName + ' ' + errorMessage);
    };
    FlexPaneWrapper.logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogSource"].create('FlexPaneWrapper');
    return FlexPaneWrapper;
}());
/* harmony default export */ __webpack_exports__["default"] = (FlexPaneWrapper);


/***/ }),

/***/ "Pk8u":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Pk8u__;

/***/ }),

/***/ "PleR":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-instrumentation/20191105.6.3/node_modules/@msfast/search-instrumentation/lib/createInstrumenter.js ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createInstrumenter; });
/* harmony import */ var _msfast_search_dispatcher_lib_createDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @msfast/search-dispatcher/lib/createDispatcher */ "Vht5");
/* harmony import */ var _msfast_search_prefetch_lib_generateGuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @msfast/search-prefetch/lib/generateGuid */ "sEEg");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var marks = [
    "markAppBoot",
    "markHeaderBoot",
    "markSbInteractive",
    "markSbReady",
    "markZeroQueryReady"
];
var markDependencies = {
    markAppBoot: [],
    markHeaderBoot: ["markAppBoot"],
    markSbInteractive: ["markHeaderBoot"],
    markSbReady: ["markSbInteractive"],
    markZeroQueryReady: ["markSbReady"],
    SbQuerySubmitted: ["markSbReady"],
    SerpFetchStart: ["SbQuerySubmitted"],
    SerpAnswerFetchDone: ["SerpFetchStart"],
    SerpFetchDone: ["SerpFetchStart"],
    SerpAnswersRenderDone: [
        "SerpFetchStart",
        "SbQuerySubmitted",
        "SerpAnswerFetchDone"
    ],
    SerpDataReady: ["SerpFetchStart", "SerpFetchDone"],
    SerpRenderDone: [
        "SerpFetchStart",
        "SerpDataReady",
        "SerpFetchDone",
        "SbQuerySubmitted"
    ]
};
var getNewConversationManager = function () {
    var activeConversation;
    var lastSubmittedConversation;
    var getNewConversation = function () {
        var logicalSearchIds = {};
        var submitted = false;
        var createLogicalSearchIdInternal = function (context) {
            var logicalSearchId = Object(_msfast_search_prefetch_lib_generateGuid__WEBPACK_IMPORTED_MODULE_1__["default"])();
            logicalSearchIds[context] = logicalSearchId;
            return logicalSearchId;
        };
        return {
            conversationId: Object(_msfast_search_prefetch_lib_generateGuid__WEBPACK_IMPORTED_MODULE_1__["default"])(),
            creationTime: Date.now(),
            getSubmittedState: function () {
                return submitted;
            },
            submit: function () {
                submitted = true;
            },
            createLogicalSearchId: createLogicalSearchIdInternal,
            getLogicalSearchId: function (context) {
                return (logicalSearchIds[context] || createLogicalSearchIdInternal(context));
            }
        };
    };
    var startConversationInternal = function () {
        // Store last conversation if it has been submitted
        if (activeConversation && activeConversation.getSubmittedState()) {
            lastSubmittedConversation = activeConversation;
        }
        var conversation = getNewConversation();
        activeConversation = conversation;
        return conversation;
    };
    return {
        startConversation: startConversationInternal,
        getActiveConversation: function () {
            if (!activeConversation || activeConversation.getSubmittedState()) {
                return startConversationInternal();
            }
            return activeConversation;
        },
        getLastSubmittedConversation: function () {
            // Return current conversation if it has been submitted
            if (activeConversation && activeConversation.getSubmittedState()) {
                return activeConversation;
            }
            // In some cases we are have not yet submitted any conversations,
            // for instance on a direct search url navigation. In these cases we create
            // and return a new conversation in the submitted state.
            if (!lastSubmittedConversation) {
                var conversation = getNewConversation();
                conversation.submit();
                lastSubmittedConversation = conversation;
            }
            return lastSubmittedConversation;
        }
    };
};
function createInstrumenter(initialProps) {
    var currentProps = initialProps;
    var doneMarks = {};
    var performanceMarks = marks.reduce(function (partialPerformanceMarks, mark, i) {
        partialPerformanceMarks[mark] = function () {
            if (!doneMarks[mark]) {
                doneMarks[mark] = true;
                currentProps.perf.mark(mark);
            }
            if (i) {
                try {
                    currentProps.perf.measure(marks[i - 1] + "-" + mark, marks[i - 1], mark);
                }
                catch (_a) {
                    /* not supported */
                }
            }
        };
        return partialPerformanceMarks;
    }, {});
    return __assign({}, Object(_msfast_search_dispatcher_lib_createDispatcher__WEBPACK_IMPORTED_MODULE_0__["default"])(), performanceMarks, { conversationManager: getNewConversationManager(), props: currentProps, setProps: function (newProps) {
            this.props = currentProps = __assign({}, this.props, newProps);
            this.dispatch(newProps);
            return currentProps;
        },
        mark: function (eventName) {
            var measureList = [];
            currentProps.perf.mark(eventName);
            var eventDependencies = markDependencies[eventName];
            for (var _i = 0, eventDependencies_1 = eventDependencies; _i < eventDependencies_1.length; _i++) {
                var dependency = eventDependencies_1[_i];
                try {
                    var measureName = dependency + "-" + eventName;
                    currentProps.perf.measure(measureName, dependency, eventName);
                    var measure = currentProps.perf.getEntriesByName(measureName).pop();
                    measure && measureList.push(measure);
                }
                catch (_a) {
                    /* Guard against measure requests where the prereq has not been fulfilled */
                }
            }
            return measureList;
        } });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlSW5zdHJ1bWVudGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NyZWF0ZUluc3RydW1lbnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sZ0RBQWdELENBQUM7QUFDOUUsT0FBTyxZQUFZLE1BQU0sMENBQTBDLENBQUM7QUFXcEUsSUFBTSxLQUFLLEdBQTBDO0lBQ25ELGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixvQkFBb0I7Q0FDckIsQ0FBQztBQUVGLElBQU0sZ0JBQWdCLEdBRWxCO0lBQ0YsV0FBVyxFQUFFLEVBQUU7SUFDZixjQUFjLEVBQUUsQ0FBQyxhQUFhLENBQUM7SUFDL0IsaUJBQWlCLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNyQyxXQUFXLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxrQkFBa0IsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUNuQyxnQkFBZ0IsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUNqQyxjQUFjLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztJQUNwQyxtQkFBbUIsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0lBQ3ZDLGFBQWEsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0lBQ2pDLHFCQUFxQixFQUFFO1FBQ3JCLGdCQUFnQjtRQUNoQixrQkFBa0I7UUFDbEIscUJBQXFCO0tBQ3RCO0lBQ0QsYUFBYSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO0lBQ2xELGNBQWMsRUFBRTtRQUNkLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsZUFBZTtRQUNmLGtCQUFrQjtLQUNuQjtDQUNGLENBQUM7QUFJRixJQUFNLHlCQUF5QixHQUErQjtJQUM1RCxJQUFJLGtCQUFpQyxDQUFDO0lBQ3RDLElBQUkseUJBQXdDLENBQUM7SUFFN0MsSUFBTSxrQkFBa0IsR0FBd0I7UUFDOUMsSUFBTSxnQkFBZ0IsR0FBNkIsRUFBRSxDQUFDO1FBQ3RELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV0QixJQUFNLDZCQUE2QixHQUFHLFVBQUMsT0FBK0I7WUFDcEUsSUFBTSxlQUFlLEdBQUcsWUFBWSxFQUFFLENBQUM7WUFDdkMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsZUFBZSxDQUFDO1lBQzVDLE9BQU8sZUFBZSxDQUFDO1FBQ3pCLENBQUMsQ0FBQztRQUVGLE9BQU87WUFDTCxjQUFjLEVBQUUsWUFBWSxFQUFFO1lBQzlCLFlBQVksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3hCLGlCQUFpQixFQUFFO2dCQUNqQixPQUFPLFNBQVMsQ0FBQztZQUNuQixDQUFDO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDbkIsQ0FBQztZQUNELHFCQUFxQixFQUFFLDZCQUE2QjtZQUNwRCxrQkFBa0IsRUFBRSxVQUFDLE9BQStCO2dCQUNsRCxPQUFPLENBQ0wsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksNkJBQTZCLENBQUMsT0FBTyxDQUFDLENBQ3BFLENBQUM7WUFDSixDQUFDO1NBQ0YsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUVGLElBQU0seUJBQXlCLEdBQUc7UUFDaEMsbURBQW1EO1FBQ25ELElBQUksa0JBQWtCLElBQUksa0JBQWtCLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtZQUNoRSx5QkFBeUIsR0FBRyxrQkFBa0IsQ0FBQztTQUNoRDtRQUVELElBQU0sWUFBWSxHQUFHLGtCQUFrQixFQUFFLENBQUM7UUFDMUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDO1FBQ2xDLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUMsQ0FBQztJQUVGLE9BQU87UUFDTCxpQkFBaUIsRUFBRSx5QkFBeUI7UUFDNUMscUJBQXFCLEVBQUU7WUFDckIsSUFBSSxDQUFDLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLGlCQUFpQixFQUFFLEVBQUU7Z0JBQ2pFLE9BQU8seUJBQXlCLEVBQUUsQ0FBQzthQUNwQztZQUNELE9BQU8sa0JBQWtCLENBQUM7UUFDNUIsQ0FBQztRQUNELDRCQUE0QixFQUFFO1lBQzVCLHVEQUF1RDtZQUN2RCxJQUFJLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLGlCQUFpQixFQUFFLEVBQUU7Z0JBQ2hFLE9BQU8sa0JBQWtCLENBQUM7YUFDM0I7WUFFRCxpRUFBaUU7WUFDakUsMkVBQTJFO1lBQzNFLHdEQUF3RDtZQUN4RCxJQUFJLENBQUMseUJBQXlCLEVBQUU7Z0JBQzlCLElBQU0sWUFBWSxHQUFHLGtCQUFrQixFQUFFLENBQUM7Z0JBQzFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDdEIseUJBQXlCLEdBQUcsWUFBWSxDQUFDO2FBQzFDO1lBRUQsT0FBTyx5QkFBeUIsQ0FBQztRQUNuQyxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLFVBQVUsa0JBQWtCLENBQ3hDLFlBQXFDO0lBRXJDLElBQUksWUFBWSxHQUE0QixZQUFZLENBQUM7SUFFekQsSUFBTSxTQUFTLEdBQXFELEVBQUUsQ0FBQztJQUV2RSxJQUFNLGdCQUFnQixHQUFxQixLQUFLLENBQUMsTUFBTSxDQUNyRCxVQUFDLHVCQUFrRCxFQUFFLElBQUksRUFBRSxDQUFTO1FBQ2xFLHVCQUF1QixDQUFDLElBQUksQ0FBQyxHQUFHO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3BCLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCO1lBRUQsSUFBSSxDQUFDLEVBQUU7Z0JBQ0wsSUFBSTtvQkFDRixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FDcEIsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBSSxJQUFNLEVBQ3pCLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUNMLENBQUM7aUJBQ0g7Z0JBQUMsV0FBTTtvQkFDTixtQkFBbUI7aUJBQ3BCO2FBQ0Y7UUFDSCxDQUFDLENBQUM7UUFFRixPQUFPLHVCQUF1QixDQUFDO0lBQ2pDLENBQUMsRUFFRCxFQUFFLENBQ2lCLENBQUM7SUFFdEIsb0JBQ0ssZ0JBQWdCLEVBQWdDLEVBQ2hELGdCQUFnQixJQUNuQixtQkFBbUIsRUFBRSx5QkFBeUIsRUFBRSxFQUNoRCxLQUFLLEVBQUUsWUFBWSxFQUNuQixRQUFRLEVBQVIsVUFBUyxRQUFzQztZQUM1QyxJQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksZ0JBQVEsSUFBSSxDQUFDLEtBQUssRUFBSyxRQUFRLENBQUUsQ0FBQztZQUNwRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sWUFBWSxDQUFDO1FBQ3RCLENBQUM7UUFDRCxJQUFJLEVBQUosVUFBSyxTQUEyQjtZQUM5QixJQUFNLFdBQVcsR0FBdUIsRUFBRSxDQUFDO1lBQzNDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWxDLElBQU0saUJBQWlCLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFdEQsS0FBeUIsVUFBaUIsRUFBakIsdUNBQWlCLEVBQWpCLCtCQUFpQixFQUFqQixJQUFpQixFQUFFO2dCQUF2QyxJQUFNLFVBQVUsMEJBQUE7Z0JBQ25CLElBQUk7b0JBQ0YsSUFBTSxXQUFXLEdBQU0sVUFBVSxTQUFJLFNBQVcsQ0FBQztvQkFDakQsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFFOUQsSUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDdEUsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3RDO2dCQUFDLFdBQU07b0JBQ04sNEVBQTRFO2lCQUM3RTthQUNGO1lBRUQsT0FBTyxXQUFXLENBQUM7UUFDckIsQ0FBQyxJQUNEO0FBQ0osQ0FBQyJ9

/***/ }),

/***/ "S9p2":
/*!********************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-logger/20191105.6.3/node_modules/@msfast/search-logger/lib/performance.js ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: measure, now, mark, getEntriesByType, getEntriesByName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "measure", function() { return measure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "now", function() { return now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mark", function() { return mark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntriesByType", function() { return getEntriesByType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntriesByName", function() { return getEntriesByName; });
var start = new Date().valueOf();
var marks = {};
var timeline = [];
var perfApiFeatureSupported = function (feature) {
    return window.performance && performance[feature];
};
var doMeasure = function (name, startMark, endMark) {
    try {
        window.performance.measure(name, startMark, endMark);
    }
    catch (e) {
        return null;
    }
    var measures = window.performance.getEntriesByName(name, "measure");
    if (measures.length > 0) {
        return measures[measures.length - 1];
    }
    return null;
};
var doApproximateMeasure = function (name, startMark, endMark) {
    var startMarkTime = marks[startMark];
    var endMarkTime = endMark ? marks[endMark] : now();
    if (startMarkTime && endMarkTime) {
        return {
            duration: endMarkTime - startMarkTime,
            entryType: "measure",
            name: name,
            startTime: startMarkTime,
            toJSON: function () {
                return null;
            }
        };
    }
    return null;
};
var doApproximateMark = function (name) {
    timeline.push({
        entryType: "mark",
        name: name,
        startTime: start,
        duration: 0,
        toJSON: function () {
            return null;
        }
    });
    marks[name] = now();
};
var measure = perfApiFeatureSupported("measure")
    ? doMeasure
    : doApproximateMeasure;
var now = perfApiFeatureSupported("now")
    ? performance.now.bind(window.performance)
    : function () { return new Date().valueOf() - start; };
var mark = perfApiFeatureSupported("mark")
    ? window.performance.mark.bind(window.performance)
    : doApproximateMark;
var getEntriesByType = perfApiFeatureSupported("getEntriesByType")
    ? window.performance.getEntriesByType.bind(window.performance)
    : function () { return []; };
var getEntriesByName = perfApiFeatureSupported("getEntriesByName")
    ? window.performance.getEntriesByName.bind(window.performance)
    : function () { return []; };


/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "Vht5":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-dispatcher/20191105.6.3/node_modules/@msfast/search-dispatcher/lib/createDispatcher.js ***!
  \*********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createDispatcher; });
/**
 * Creates a minimal dispatcher instance. Note that the dispatcher lacks
 * features like argument validation to keep it as tiny as possible.
 */
function createDispatcher() {
    var listeners = [];
    return {
        register: function (callback) {
            return "" + (listeners.push(callback) - 1);
        },
        unregister: function (id) {
            listeners[parseInt(id, 10)] = 0;
        },
        dispatch: function (payload) {
            listeners.forEach(function (listener) { return listener && listener(payload); });
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlRGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVEaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCO0lBQ3RDLElBQU0sU0FBUyxHQUFzQyxFQUFFLENBQUM7SUFDeEQsT0FBTztRQUNMLFFBQVEsRUFBUixVQUFTLFFBQThCO1lBQ3JDLE9BQU8sTUFBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFDO1FBQzNDLENBQUM7UUFDRCxVQUFVLEVBQVYsVUFBVyxFQUFVO1lBQ25CLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFDRCxRQUFRLEVBQVIsVUFBUyxPQUFVO1lBQ2pCLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUM7UUFDL0QsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDIn0=

/***/ }),

/***/ "X+PM":
/*!*********************************************!*\
  !*** external "@microsoft/sp-page-context" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_X_PM__;

/***/ }),

/***/ "ZG7e":
/*!*************************************************!*\
  !*** ./lib/dataAccess/SPOSuiteNavDataSource.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @file SPOSuiteNavDataSource.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */


var SPOSuiteNavDataSource = /** @class */ (function () {
    /**
     * Initializes a new instance of the SPO
     * @TODO Task 161973 Add PageContext and set the
     * webPermissionMask/suiteNavData.UserDisplayName/webServerRelativeUrl/currentUICultureName
     */
    function SPOSuiteNavDataSource(httpClient, currentUICultureName, webServerRelativeUrl) {
        this.suiteNavService = 0 /* SPO */;
        this._currentUICultureName = currentUICultureName;
        this._spHttpClient = httpClient;
        this._siteRelUrl = webServerRelativeUrl === '/' ? '' : webServerRelativeUrl;
    }
    // Downloads the SPO version of the SuiteNavData
    SPOSuiteNavDataSource.prototype.loadData = function () {
        var url = this._siteRelUrl
            + '/_layouts/15/online/handlers/SpoSuiteLinks.ashx?Locale='
            + this._currentUICultureName
            + '&v=2&mobilereq=0&msajax=1';
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('SPOSuiteNavDataSource');
        return this._spHttpClient.post(url, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, {})
            .then(function (response) {
            if (response.status !== 200 || response.headers.get('SharePointError')) {
                var errorMessage = 'Failed to retrieve SPO SuiteNavData';
                var error = new Error(errorMessage);
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(SPOSuiteNavDataSource._logSource, errorMessage);
                qosMonitor.writeUnexpectedFailure('FailedToRetrieveSPOSuiteNavData', error, {
                    responseStatus: response ? response.status : '',
                    correlationId: response ? response.correlationId : ''
                });
                return Promise.reject(errorMessage);
            }
            qosMonitor.writeSuccess();
            return response.json().then(function (jsonResponse) {
                return jsonResponse;
            });
        });
    };
    // @TODO Bug 169685 change to readonly
    SPOSuiteNavDataSource._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogSource"].create('SPOSuiteNavDataSource');
    return SPOSuiteNavDataSource;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPOSuiteNavDataSource);


/***/ }),

/***/ "aDzz":
/*!*********************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/theming/SuiteNavTheming.js ***!
  \*********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var load_themed_styles_1 = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");
function loadFallbackShellThemableCss() {
    var strCss = ".o365cs-base .o365cs-nav-contextMenu {" +
        "    background-color: '[theme:white, default:#ffffff]';" + // BackgroundOverlay
        "}\n" +
        ".o365cs-base-visibility" +
        "{" +
        "  visibility: visible;" +
        "}\n" +
        ".o365cs-base .ms-fcl-tdr," +
        ".o365cs-base .ms-fcl-tdr-h:hover," +
        ".o365cs-base .ms-fcl-tdr-f:focus" +
        "{" +
        "    color: '[theme:themeDarker, default:#104a7d]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-tdr," +
        ".o365cs-base .ms-bgc-tdr-h:hover," +
        ".o365cs-base .ms-bgc-tdr-f:focus" +
        "{" +
        "    background-color: '[theme:themeDarker, default:#104a7d]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-tdr," +
        ".o365cs-base .ms-bcl-tdr-h:hover," +
        ".o365cs-base .ms-bcl-tdr-f:focus" +
        "{" +
        "    border-color: '[theme:themeDarker, default:#104a7d]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-td," +
        ".o365cs-base .ms-fcl-td-h:hover," +
        ".o365cs-base .ms-fcl-td-f:focus" +
        "{" +
        "    color: '[theme:themeDark, default:#0d62aa]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-td," +
        ".o365cs-base .ms-bgc-td-h:hover," +
        ".o365cs-base .ms-bgc-td-f:focus" +
        "{" +
        "    background-color: '[theme:themeDark, default:#0d62aa]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-td," +
        ".o365cs-base .ms-bcl-td-h:hover," +
        ".o365cs-base .ms-bcl-td-f:focus" +
        "{" +
        "    border-color: '[theme:themeDark, default:#0d62aa]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-tda," +
        ".o365cs-base .ms-fcl-tda-h:hover," +
        ".o365cs-base .ms-fcl-tda-f:focus" +
        "{" +
        "    color: '[theme:themeDarkAlt, default:#106ebe]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-tda," +
        ".o365cs-base .ms-bgc-tda-h:hover," +
        ".o365cs-base .ms-bgc-tda-f:focus" +
        "{" +
        "    background-color: '[theme:themeDarkAlt, default:#106ebe]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-tda," +
        ".o365cs-base .ms-bcl-tda-h:hover," +
        ".o365cs-base .ms-bcl-tda-f:focus" +
        "{" +
        "    border-color: '[theme:themeDarkAlt, default:#106ebe]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-tp," +
        ".o365cs-base .ms-fcl-tp-h:hover," +
        ".o365cs-base .ms-fcl-tp-f:focus" +
        "{" +
        "    color: '[theme:themePrimary, default:#0078d7]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-tp," +
        ".o365cs-base .ms-bgc-tp-h:hover," +
        ".o365cs-base .ms-bgc-tp-f:focus," +
        ".o365cs-base.ms-bgc-tp" +
        "{" +
        "    background-color: '[theme:themePrimary, default:#0078d7]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-tp," +
        ".o365cs-base .ms-bcl-tp-h:hover," +
        ".o365cs-base .ms-bcl-tp-f:focus" +
        "{" +
        "    border-color: '[theme:themePrimary, default:#0078d7]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-ts," +
        ".o365cs-base .ms-fcl-ts-h:hover," +
        ".o365cs-base .ms-fcl-ts-f:focus" +
        "{" +
        "    color: '[theme:themeSecondary, default:#2b88d8]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-ts," +
        ".o365cs-base .ms-bgc-ts-h:hover," +
        ".o365cs-base .ms-bgc-ts-f:focus" +
        "{" +
        "    background-color: '[theme:themeSecondary, default:#2b88d8]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-ts," +
        ".o365cs-base .ms-bcl-ts-h:hover," +
        ".o365cs-base .ms-bcl-ts-f:focus" +
        "{" +
        "    border-color: '[theme:themeSecondary, default:#2b88d8]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-tt," +
        ".o365cs-base .ms-fcl-tt-h:hover," +
        ".o365cs-base .ms-fcl-tt-f:focus" +
        "{" +
        "    color: '[theme:themeTertiary, default:#71afe5]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-tt," +
        ".o365cs-base .ms-bgc-tt-h:hover," +
        ".o365cs-base .ms-bgc-tt-f:focus" +
        "{" +
        "    background-color: '[theme:themeTertiary, default:#71afe5]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-tt," +
        ".o365cs-base .ms-bcl-tt-h:hover," +
        ".o365cs-base .ms-bcl-tt-f:focus" +
        "{" +
        "    border-color: '[theme:themeTertiary, default:#71afe5]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-tl," +
        ".o365cs-base .ms-fcl-tl-h:hover," +
        ".o365cs-base .ms-fcl-tl-f:focus" +
        "{" +
        "    color: '[theme:themeLight, default:#c7e0f4]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-tl," +
        ".o365cs-base .ms-bgc-tl-h:hover," +
        ".o365cs-base .ms-bgc-tl-f:focus" +
        "{" +
        "    background-color: '[theme:themeLight, default:#c7e0f4]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-tl," +
        ".o365cs-base .ms-bcl-tl-h:hover," +
        ".o365cs-base .ms-bcl-tl-f:focus" +
        "{" +
        "    border-color: '[theme:themeLight, default:#c7e0f4]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-tlr," +
        ".o365cs-base .ms-fcl-tlr-h:hover," +
        ".o365cs-base .ms-fcl-tlr-f:focus" +
        "{" +
        "    color: '[theme:themeLighter, default:#deecf9]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-tlr," +
        ".o365cs-base .ms-bgc-tlr-h:hover," +
        ".o365cs-base .ms-bgc-tlr-f:focus" +
        "{" +
        "    background-color: '[theme:themeLighter, default:#deecf9]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-tlr," +
        ".o365cs-base .ms-bcl-tlr-h:hover," +
        ".o365cs-base .ms-bcl-tlr-f:focus" +
        "{" +
        "    border-color: '[theme:themeLighter, default:#deecf9]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-tlra," +
        ".o365cs-base .ms-fcl-tlra-h:hover," +
        ".o365cs-base .ms-fcl-tlra-f:focus" +
        "{" +
        "    color: '[theme:themeLighterAlt, default:#eff6fc]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-tlra," +
        ".o365cs-base .ms-bgc-tlra-h:hover," +
        ".o365cs-base .ms-bgc-tlra-f:focus" +
        "{" +
        "    background-color: '[theme:themeLighterAlt, default:#eff6fc]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-tlra," +
        ".o365cs-base .ms-bcl-tlra-h:hover," +
        ".o365cs-base .ms-bcl-tlra-f:focus" +
        "{" +
        "    border-color: '[theme:themeLighterAlt, default:#eff6fc]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-w," +
        ".o365cs-base .ms-fcl-w-h:hover," +
        ".o365cs-base .ms-fcl-w-f:focus" +
        "{" +
        "    color: '[theme:white, default:#ffffff]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-w," +
        ".o365cs-base .ms-bgc-w-h:hover," +
        ".o365cs-base .ms-bgc-w-f:focus," +
        ".o365cs-base.ms-bgc-w" +
        "{" +
        "    background-color: '[theme:white, default:#ffffff]';" + // backgroundOverlay
        "}\n" +
        ".o365cs-base .ms-bcl-w," +
        ".o365cs-base .ms-bcl-w-h:hover," +
        ".o365cs-base .ms-bcl-w-f:focus" +
        "{" +
        "    border-color: '[theme:white, default:#ffffff]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-b," +
        ".o365cs-base .ms-fcl-b-h:hover," +
        ".o365cs-base .ms-fcl-b-f:focus" +
        "{" +
        "    color: '[theme:black, default:#000000]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-b.o365cs-nav-closeButton" + // Special case for button to close app launcher, since app launcher is not themed
        "{" +
        "    color: #000000;" +
        "}\n" +
        ".o365cs-base .ms-bgc-b," +
        ".o365cs-base .ms-bgc-b-h:hover," +
        ".o365cs-base .ms-bgc-b-f:focus," +
        ".o365cs-base.ms-bgc-b" +
        "{" +
        "    background-color: '[theme:black, default:#000000]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-b," +
        ".o365cs-base .ms-bcl-b-h:hover," +
        ".o365cs-base .ms-bcl-b-f:focus" +
        "{" +
        "    border-color: '[theme:black, default:#000000]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-nd," +
        ".o365cs-base .ms-fcl-nd-h:hover," +
        ".o365cs-base .ms-fcl-nd-f:focus" +
        "{" +
        "    color: '[theme:neutralDark, default:#212121]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-nd," +
        ".o365cs-base .ms-bgc-nd-h:hover," +
        ".o365cs-base .ms-bgc-nd-f:focus" +
        "{" +
        "    background-color: '[theme:neutralDark, default:#212121]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-nd," +
        ".o365cs-base .ms-bcl-nd-h:hover," +
        ".o365cs-base .ms-bcl-nd-f:focus" +
        "{" +
        "    border-color: '[theme:neutralDark, default:#212121]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-np," +
        ".o365cs-base .ms-fcl-np-h:hover," +
        ".o365cs-base .ms-fcl-np-f:focus" +
        "{" +
        "    color: '[theme:neutralPrimary, default:#333333]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-np," +
        ".o365cs-base .ms-bgc-np-h:hover," +
        ".o365cs-base .ms-bgc-np-f:focus" +
        "{" +
        "    background-color: '[theme:neutralPrimary, default:#333333]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-np," +
        ".o365cs-base .ms-bcl-np-h:hover," +
        ".o365cs-base .ms-bcl-np-f:focus" +
        "{" +
        "    border-color: '[theme:neutralPrimary, default:#333333]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-ns," +
        ".o365cs-base .ms-fcl-ns-h:hover," +
        ".o365cs-base .ms-fcl-ns-f:focus" +
        "{" +
        "    color: '[theme:neutralSecondary, default:#666666]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-ns.o365cs-nav-moduleLabel" + // Special case for the module label in the unthemed app launcher
        "{" +
        "    color: #666666;" +
        "}\n" +
        ".o365cs-base .ms-bgc-ns," +
        ".o365cs-base .ms-bgc-ns-h:hover," +
        ".o365cs-base .ms-bgc-ns-f:focus" +
        "{" +
        "    background-color: '[theme:neutralSecondary, default:#666666]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-ns," +
        ".o365cs-base .ms-bcl-ns-h:hover," +
        ".o365cs-base .ms-bcl-ns-f:focus" +
        "{" +
        "    border-color: '[theme:neutralSecondary, default:#666666]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-nsa," +
        ".o365cs-base .ms-fcl-nsa-h:hover," +
        ".o365cs-base .ms-fcl-nsa-f:focus" +
        "{" +
        "    color: '[theme:neutralSecondaryAlt, default:#767676]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-nsa," +
        ".o365cs-base .ms-bgc-nsa-h:hover," +
        ".o365cs-base .ms-bgc-nsa-f:focus" +
        "{" +
        "    background-color: '[theme:neutralSecondaryAlt, default:#767676]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-nsa," +
        ".o365cs-base .ms-bcl-nsa-h:hover," +
        ".o365cs-base .ms-bcl-nsa-f:focus" +
        "{" +
        "    border-color: '[theme:neutralSecondaryAlt, default:#767676]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-nt," +
        ".o365cs-base .ms-fcl-nt-h:hover," +
        ".o365cs-base .ms-fcl-nt-f:focus" +
        "{" +
        "    color: '[theme:neutralTertiary, default:#a6a6a6]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-nt," +
        ".o365cs-base .ms-bgc-nt-h:hover," +
        ".o365cs-base .ms-bgc-nt-f:focus" +
        "{" +
        "    background-color: '[theme:neutralTertiary, default:#a6a6a6]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-nt," +
        ".o365cs-base .ms-bcl-nt-h:hover," +
        ".o365cs-base .ms-bcl-nt-f:focus" +
        "{" +
        "    border-color: '[theme:neutralTertiary, default:#a6a6a6]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-nta," +
        ".o365cs-base .ms-fcl-nta-h:hover," +
        ".o365cs-base .ms-fcl-nta-f:focus" +
        "{" +
        "    color: '[theme:neutralTertiaryAlt, default:#c8c8c8]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-nta," +
        ".o365cs-base .ms-bgc-nta-h:hover," +
        ".o365cs-base .ms-bgc-nta-f:focus" +
        "{" +
        "    background-color: '[theme:neutralTertiaryAlt, default:#c8c8c8]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-nta," +
        ".o365cs-base .ms-bcl-nta-h:hover," +
        ".o365cs-base .ms-bcl-nta-f:focus" +
        "{" +
        "    border-color: '[theme:neutralTertiaryAlt, default:#c8c8c8]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-nl," +
        ".o365cs-base .ms-fcl-nl-h:hover," +
        ".o365cs-base .ms-fcl-nl-f:focus" +
        "{" +
        "    color: '[theme:neutralLight, default:#eaeaea]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-nl," +
        ".o365cs-base .ms-bgc-nl-h:hover," +
        ".o365cs-base .ms-bgc-nl-f:focus" +
        "{" +
        "    background-color: '[theme:neutralLight, default:#eaeaea]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-nl," +
        ".o365cs-base .ms-bcl-nl-h:hover," +
        ".o365cs-base .ms-bcl-nl-f:focus" +
        "{" +
        "    border-color: '[theme:neutralLight, default:#eaeaea]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-nlr," +
        ".o365cs-base .ms-fcl-nlr-h:hover," +
        ".o365cs-base .ms-fcl-nlr-f:focus" +
        "{" +
        "    color: '[theme:neutralLighter, default:#f4f4f4]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-nlr," +
        ".o365cs-base .ms-bgc-nlr-h:hover," +
        ".o365cs-base .ms-bgc-nlr-f:focus," +
        ".o365cs-base.ms-bgc-nlr" +
        "{" +
        "    background-color: '[theme:neutralLighter, default:#f4f4f4]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-nlr," +
        ".o365cs-base .ms-bcl-nlr-h:hover," +
        ".o365cs-base .ms-bcl-nlr-f:focus" +
        "{" +
        "    border-color: '[theme:neutralLighter, default:#f4f4f4]';" +
        "}\n" +
        ".o365cs-base .ms-fcl-nlra," +
        ".o365cs-base .ms-fcl-nlra-h:hover," +
        ".o365cs-base .ms-fcl-nlra-f:focus" +
        "{" +
        "    color: '[theme:neutralLighterAlt, default:#f8f8f8]';" +
        "}\n" +
        ".o365cs-base .ms-bgc-nlra," +
        ".o365cs-base .ms-bgc-nlra-h:hover," +
        ".o365cs-base .ms-bgc-nlra-f:focus," +
        ".o365cs-base.ms-bgc-nlra" +
        "{" +
        "    background-color: '[theme:neutralLighterAlt, default:#f8f8f8]';" +
        "}\n" +
        ".o365cs-base .ms-bcl-nlra," +
        ".o365cs-base .ms-bcl-nlra-h:hover," +
        ".o365cs-base .ms-bcl-nlra-f:focus" +
        "{" +
        "    border-color: '[theme:neutralLighterAlt, default:#f8f8f8]';" +
        "}\n" +
        ".o365cs-base .o365cs-topnavLinkBackground-2" +
        "{" +
        "    background-color: transparent;" +
        "}\n" +
        ".o365cs-base .o365cs-topnavText," +
        ".o365cs-base .o365cs-topnavText:hover" +
        "{" +
        "    color: '[theme:suiteBarText, default:#ffffff]';" + // $SuiteBarText
        "}\n" +
        ".o365cs-base .o365cs-appLauncherBackground" +
        "{" +
        "    background-color: '[theme:themeDarker, default:#104a7d]';" +
        "}\n" +
        ".o365cs-nav-header16 .o365cs-navMenuButton" +
        "{" +
        "    color: '[theme:white, default:#ffffff]';" + // Should this be hardcoded to #ffffff?
        "}\n" +
        ".o365cs-base .o365cs-navMenuButton" +
        "{" +
        "    color: '[theme:suiteBarText, default:#ffffff]';" + // $SuiteBarText
        "}\n" +
        ".o365cs-base.o365cs-topnavBGImage" +
        "{" +
        "    background-position: center top;" +
        "    background-repeat: repeat-x;" +
        "    background-image: none;" + // $ThemeTopnavBackgroundImage
        "}\n" +
        ".o365cs-base.o365cs-topnavBGColor-2" +
        "{" +
        "    background-color: '[theme:suiteBarBackground, default:#000000]';" + // $ThemeTopnavBackgroundColor
        "}\n";
    load_themed_styles_1.loadStyles(strCss);
}
exports.loadFallbackShellThemableCss = loadFallbackShellThemableCss;
//# sourceMappingURL=SuiteNavTheming.js.map

/***/ }),

/***/ "bKG0":
/*!*********************************************!*\
  !*** ./lib/SuiteNavManagerConfiguration.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models_SuiteNavLinkIds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/SuiteNavLinkIds */ "ogh3");

/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file Represents a set of app specific configuration for the suite nav manager.
 */



var SUITE_NAV_USE_SPO_BEHAVIOR_KILL_SWITCH = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].parse('22F8084E-9DEB-4642-B63E-E70A7F87C998');
/**
 * SuiteNavManagerConfiguration for the BaseApplication.
 * @internal
 */
var SuiteNavManagerConfiguration = /** @class */ (function () {
    /**
     * Initializes a new instance of the SuiteNavManagerConfiguration.
     * @param suiteNavConfig - Data used to construct an instance of the SuiteNavManagerConfiguration.
     */
    function SuiteNavManagerConfiguration(suiteNavConfig) {
        this._currentUICultureName = suiteNavConfig.currentUICultureName;
        this._settingsLinks = suiteNavConfig.settingsData;
        this._signoutUrl = suiteNavConfig.signoutUrl;
        this._siteClientTag = suiteNavConfig.siteClientTag;
        this._systemUserKey = suiteNavConfig.systemUserKey;
        this._webServerRelativeUrl = suiteNavConfig.webServerRelativeUrl;
        this._isSuiteNavDisabled = !!suiteNavConfig.disableSuiteNav;
        this._isSuiteNavLoadingDeferred = !!suiteNavConfig.deferSuiteNavLoading;
        this._customButtonData = suiteNavConfig.customButtonData;
        this._o365ShellRenderSettings = {
            collapseO365Settings: true,
            disableDelayLoad: false,
            disableShellPlus: false,
            layout: 'Mouse',
            top: undefined // tslint:disable-line:no-any
        };
        if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].parse('bc792189-6879-4d06-9c7d-0fcac8abb279'), '04/05/2019', 'SuiteSearchBoxRenderSettings')) {
            var disableSearchBox = !_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].parse('E0B09CB0-1731-4AEC-BD7D-5F8EE2A10737'), '2019/10/08', 'Disable suite nav searchbox based on pagecontext setting')
                ? !!suiteNavConfig.disableSuiteNavSearchBox : false;
            this._o365ShellRenderSettings.enableSearchUX =
                SuiteNavManagerConfiguration.isSearchBoxInHeaderFlighted() && !disableSearchBox,
                this._o365ShellRenderSettings.initialSearchUXVisibility = false;
        }
        this._hamburgerMenuCallback = undefined;
        this._suiteNavPostRenderCallback = undefined;
        this._webTemplateId = suiteNavConfig.webTemplateId;
        this._userDisplayName = suiteNavConfig.userDisplayName;
    }
    SuiteNavManagerConfiguration.isSearchBoxInHeaderFlighted = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPFlight"].isEnabled(1455); // SPHomeSuiteSearchBox
    };
    SuiteNavManagerConfiguration.prototype.isSuiteNavDisabled = function () {
        return this._isSuiteNavDisabled;
    };
    /**
     * Function for disabling the suiteNav from loading
     */
    SuiteNavManagerConfiguration.prototype.disableSuiteNav = function () {
        this._isSuiteNavDisabled = true;
    };
    SuiteNavManagerConfiguration.prototype.isSuiteNavLoadingDeferred = function () {
        return this._isSuiteNavLoadingDeferred;
    };
    /**
     * Function for defering the suiteNav loading
     */
    SuiteNavManagerConfiguration.prototype.deferSuiteNavLoading = function () {
        this._isSuiteNavLoadingDeferred = true;
    };
    /**
     * Function for modifying the suite nav data that came back from the service.
     * @param suiteNavModel - Model is used to modify the resulting suiteNavData
     * @param themeDictionary - Color palette used to change the suiteNav theme colors
     * @returns the new SuiteNav data
     */
    SuiteNavManagerConfiguration.prototype.modifySuiteNavData = function (suiteNavModel) {
        var suiteNavData = suiteNavModel.NavBarData;
        if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].parse('5bafa34c-ba7d-4de4-97e8-1cdfb4ce051e'), '3/2/2018', 'Add SharePoint text in SuiteNav Banner')) {
            // This link is mandatory for showing the "SharePoint" text in the Modern SuiteNav.
            suiteNavData.CurrentMainLinkElementID = _models_SuiteNavLinkIds__WEBPACK_IMPORTED_MODULE_3__["default"].SITES;
        }
        suiteNavData.CurrentWorkloadSettingsSubLinks =
            this._settingsLinks && this._settingsLinks.length > 0 ? this._settingsLinks : undefined;
        suiteNavData.FeedbackLink = undefined;
        if (suiteNavData.SignOutLink && this._signoutUrl) {
            suiteNavData.SignOutLink.Url = this._signoutUrl;
        }
        if (suiteNavData.HelpLink) {
            suiteNavData.HelpLink.Url = 'https://go.microsoft.com/fwlink/p/?linkid=827181';
        }
        if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPKillSwitch"].isActivated(SUITE_NAV_USE_SPO_BEHAVIOR_KILL_SWITCH, '9/08/2017', 'SuiteNavUseSPOBehaviors')) {
            var webTemplate = this._webTemplateId;
            var isMySite = webTemplate === "21" /* mySite */ || webTemplate === "54" /* mySiteHost */;
            // Set SPOBehaviors to true outside of the MySites and MySiteHosts.
            // This prevents certain options from appearing in the nav bar
            // that should not be there, like the old Change The Look.
            suiteNavData.UseSPOBehaviors = !isMySite;
        }
        return suiteNavData;
    };
    /**
     * {@inheritDoc ISuiteNavManagerConfiguration.getActionsMap}
     */
    SuiteNavManagerConfiguration.prototype.getActionsMap = function () {
        return {};
    };
    Object.defineProperty(SuiteNavManagerConfiguration.prototype, "systemUserKey", {
        /**
         * Gets the systemUserKey token.
         * @returns the systemUserKey or empty string
         */
        get: function () {
            return this._systemUserKey || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiteNavManagerConfiguration.prototype, "userId", {
        /**
         * Gets the user Id
         */
        get: function () {
            if (this.systemUserKey !== '') {
                return this.systemUserKey.substring(this.systemUserKey.lastIndexOf('|') + 1, this.systemUserKey.indexOf('@'));
            }
            else {
                return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiteNavManagerConfiguration.prototype, "cacheToken", {
        /**
         * Gets the cache token.
         * @returns the site client tag or empty string
         */
        get: function () {
            /**
             * The site client tag will be something like '0$$16.0.3912.1218' -- the only part
             * we care about is before the $$. This number will be incremented if the user's theme changes.
             */
            var clientTag = this._siteClientTag;
            if (clientTag !== undefined) {
                return clientTag.substring(0, clientTag.indexOf('$$'));
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiteNavManagerConfiguration.prototype, "o365ShellRenderSettings", {
        /**
         * Gets the o365ShellRenderSettings for rendering the SuiteNav.
         * @returns _o365ShellRenderSettings
         */
        get: function () {
            return this._o365ShellRenderSettings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiteNavManagerConfiguration.prototype, "currentUICultureName", {
        /**
         * Property representing the culture name (e.g. "en-us")
         */
        get: function () {
            return this._currentUICultureName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiteNavManagerConfiguration.prototype, "webServerRelativeUrl", {
        /**
         * Represents the web server relative url where we would ping the Suite Nav service.
         */
        get: function () {
            return this._webServerRelativeUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiteNavManagerConfiguration.prototype, "userDisplayName", {
        get: function () {
            return this._userDisplayName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiteNavManagerConfiguration.prototype, "customButtonData", {
        /**
         * Data for any custom buttons to be added to the suite nav
         */
        get: function () {
            return this._customButtonData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiteNavManagerConfiguration.prototype, "hamburgerCallback", {
        get: function () {
            return this._hamburgerMenuCallback;
        },
        set: function (hamburgerCallback) {
            this._hamburgerMenuCallback = hamburgerCallback;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiteNavManagerConfiguration.prototype, "suiteNavPostRenderCallback", {
        get: function () {
            return this._suiteNavPostRenderCallback;
        },
        set: function (suiteNavPostRenderCallback) {
            this._suiteNavPostRenderCallback = suiteNavPostRenderCallback;
        },
        enumerable: true,
        configurable: true
    });
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], SuiteNavManagerConfiguration.prototype, "getActionsMap", null);
    return SuiteNavManagerConfiguration;
}());
/* harmony default export */ __webpack_exports__["default"] = (SuiteNavManagerConfiguration);


/***/ }),

/***/ "bpGp":
/*!***************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-dispatcher/20191105.6.3/node_modules/@msfast/search-dispatcher/lib/dispatcher.js ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: setDispatcher, getDispatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDispatcher", function() { return setDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDispatcher", function() { return getDispatcher; });
function noop() {
    return "";
}
var dummy = {
    register: noop,
    unregister: noop,
    dispatch: noop
};
var instance = dummy;
var contract = [
    "register",
    "unregister",
    "dispatch"
];
function setDispatcher(dispatcher) {
    if (!dispatcher) {
        throw new Error("Dispatcher argument must be a dispatcher instance.");
    }
    if (!contract.every(function (method) { return typeof dispatcher[method] === "function"; })) {
        throw new Error("Dispatcher argument must implement dispatcher interface.");
    }
    instance = dispatcher;
}
function getDispatcher() {
    return instance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLFNBQVMsSUFBSTtJQUNYLE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQztBQUVELElBQU0sS0FBSyxHQUEwQjtJQUNuQyxRQUFRLEVBQUUsSUFBSTtJQUNkLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFFBQVEsRUFBRSxJQUFJO0NBQ2YsQ0FBQztBQUNGLElBQUksUUFBUSxHQUEwQixLQUFLLENBQUM7QUFFNUMsSUFBTSxRQUFRLEdBQStDO0lBQzNELFVBQVU7SUFDVixZQUFZO0lBQ1osVUFBVTtDQUNYLENBQUM7QUFFRixNQUFNLFVBQVUsYUFBYSxDQUFDLFVBQWlDO0lBQzdELElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDZixNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7S0FDdkU7SUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsRUFBeEMsQ0FBd0MsQ0FBQyxFQUFFO1FBQ3ZFLE1BQU0sSUFBSSxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQztLQUM3RTtJQUVELFFBQVEsR0FBRyxVQUFVLENBQUM7QUFDeEIsQ0FBQztBQUVELE1BQU0sVUFBVSxhQUFhO0lBQzNCLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMifQ==

/***/ }),

/***/ "cDcd":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_cDcd__;

/***/ }),

/***/ "cj/x":
/*!***********************************************************!*\
  !*** ../sp-search-common/lib/getSharePointEnvironment.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getSharePointEnvironment; });
function getSharePointEnvironment(environment, webAbsoluteUrl) {
    return environment &&
        environment === 'prodbubble' &&
        webAbsoluteUrl &&
        webAbsoluteUrl.toLowerCase().indexOf('microsoft.sharepoint-df.com') > -1
        ? 'spdf'
        : environment;
}


/***/ }),

/***/ "iIlt":
/*!***************************************!*\
  !*** ./lib/models/IShellBaseTheme.js ***!
  \***************************************/
/*! exports provided: DEFAULT_APP_BRAND_THEME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_APP_BRAND_THEME", function() { return DEFAULT_APP_BRAND_THEME; });
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * Non-standard casing is to match what an external script expects.
 */
var DEFAULT_APP_BRAND_THEME = {
    Primary: '#0078D4'
};


/***/ }),

/***/ "jOlS":
/*!************************************************!*\
  !*** external "@microsoft/load-themed-styles" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_jOlS__;

/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: SuiteNavManager, DEFAULT_SUITENAV_HEIGHT, SuiteNavManagerConfiguration, BaseSearchBoxInitializer, shellSearch, createSearchInstrumenterOnce, createSearchPrefetchStateOnce, switchSearchDispatcher, asyncAppLevelUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SuiteNavManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SuiteNavManager */ "FMHC");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SuiteNavManager", function() { return _SuiteNavManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SUITENAV_HEIGHT", function() { return _SuiteNavManager__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_SUITENAV_HEIGHT"]; });

/* harmony import */ var _SuiteNavManagerConfiguration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SuiteNavManagerConfiguration */ "bKG0");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SuiteNavManagerConfiguration", function() { return _SuiteNavManagerConfiguration__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _search_BaseSearchBoxInitializer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search/BaseSearchBoxInitializer */ "vMVo");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseSearchBoxInitializer", function() { return _search_BaseSearchBoxInitializer__WEBPACK_IMPORTED_MODULE_2__["BaseSearchBoxInitializer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shellSearch", function() { return _search_BaseSearchBoxInitializer__WEBPACK_IMPORTED_MODULE_2__["search"]; });

/* harmony import */ var _search_createSearchInstrumenterOnce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./search/createSearchInstrumenterOnce */ "A/Iv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSearchInstrumenterOnce", function() { return _search_createSearchInstrumenterOnce__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _search_createSearchPrefetchStateOnce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./search/createSearchPrefetchStateOnce */ "tFCy");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSearchPrefetchStateOnce", function() { return _search_createSearchPrefetchStateOnce__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _search_suiteSearchDispatcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./search/suiteSearchDispatcher */ "Cuz1");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "switchSearchDispatcher", function() { return _search_suiteSearchDispatcher__WEBPACK_IMPORTED_MODULE_5__["switchDispatcher"]; });

/* harmony import */ var _search_asyncAppLevelUpdater__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./search/asyncAppLevelUpdater */ "oFNc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncAppLevelUpdater", function() { return _search_asyncAppLevelUpdater__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/**
 * Suite Nav library for applications
 *
 * @packagedocumentation
 */









/***/ }),

/***/ "oFNc":
/*!********************************************!*\
  !*** ./lib/search/asyncAppLevelUpdater.js ***!
  \********************************************/
/*! exports provided: resolveAppLevelUpdaterPromise, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveAppLevelUpdaterPromise", function() { return resolveAppLevelUpdaterPromise; });
var resolveAppLevelUpdaterPromise;
// tslint:disable-next-line:export-name
/* harmony default export */ __webpack_exports__["default"] = (new Promise(function (resolve) { return (resolveAppLevelUpdaterPromise = resolve); }));


/***/ }),

/***/ "ogh3":
/*!***************************************!*\
  !*** ./lib/models/SuiteNavLinkIds.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file Strings for the 'Id' option of suite nav links.
 * These are defined by the suite nav team and are used to correlate icons/colors with links.
 */
var SuiteNavLinkIds = /** @class */ (function () {
    function SuiteNavLinkIds() {
    }
    // Settings menu
    SuiteNavLinkIds.CUSTOM_SETTINGS_1 = 'WorkloadSettingsSubLinks1';
    SuiteNavLinkIds.CUSTOM_SETTINGS_2 = 'WorkloadSettingsSubLinks2';
    SuiteNavLinkIds.CUSTOM_SETTINGS_3 = 'WorkloadSettingsSubLinks3';
    SuiteNavLinkIds.FEEDBACK = 'ShellFeedback';
    SuiteNavLinkIds.DIAGNOSTICS = 'Diagnostics';
    SuiteNavLinkIds.O365_SETTINGS = 'ShellO365Settings'; // 'O365 settings'
    SuiteNavLinkIds.ADD_APP = 'SuiteMenu_zz5_MenuItemCreate'; // 'Add an app'
    SuiteNavLinkIds.CREATE_PAGE = 'SuiteMenu_MenuItemCreatePage'; // 'Create a publishing page'
    SuiteNavLinkIds.SITE_CONTENTS = 'SuiteMenu_zz6_MenuItem_ViewAllSiteContents'; // 'Site contents'
    SuiteNavLinkIds.SITE_SETTINGS = 'SuiteMenu_zz7_MenuItem_Settings'; // 'Site settings'
    SuiteNavLinkIds.USER_ACTIVITY = 'UserActivity'; // User activity dialog
    // Person menu
    SuiteNavLinkIds.ABOUT_ME = 'ShellAboutMe'; // 'About me'/'Edit profile'
    SuiteNavLinkIds.SETTINGS = 'ShellSettings'; // 'Account settings' (ODC)
    SuiteNavLinkIds.MY_SETTINGS = 'SuiteMenu_zz2_ID_PersonalInformation'; // 'My Settings' (ODB)
    SuiteNavLinkIds.SIGN_OUT = 'ShellSignout';
    // Help menu
    SuiteNavLinkIds.HELP = 'HelpLink';
    SuiteNavLinkIds.COMMUNITY = 'ShellCommunity';
    SuiteNavLinkIds.PRIVACY = 'ShellPrivacy';
    SuiteNavLinkIds.LEGAL = 'ShellLegal';
    // App switcher
    SuiteNavLinkIds.ADMIN = 'ShellAdmin';
    SuiteNavLinkIds.MAIL = 'ShellMail'; // 'Outlook'/'Outlook.com'
    SuiteNavLinkIds.CALENDAR = 'ShellCalendar';
    SuiteNavLinkIds.PEOPLE = 'ShellPeople';
    SuiteNavLinkIds.ONEDRIVE = 'ShellDocuments'; // 'OneDrive'
    SuiteNavLinkIds.SHAREPOINT = 'ShellSharepoint';
    SuiteNavLinkIds.WORD = 'ShellWordOnline';
    SuiteNavLinkIds.EXCEL = 'ShellExcelOnline';
    SuiteNavLinkIds.POWERPOINT = 'ShellPowerPointOnline';
    SuiteNavLinkIds.ONENOTE = 'ShellOneNoteOnline';
    SuiteNavLinkIds.SITES = 'ShellSites';
    SuiteNavLinkIds.YAMMER = 'ShellYammer';
    SuiteNavLinkIds.TASKS = 'ShellTasks';
    SuiteNavLinkIds.POWER_BI = 'ShellPowerBI';
    SuiteNavLinkIds.DELVE = 'ShellOfficeGraph'; // 'Delve'
    SuiteNavLinkIds.VIDEO = 'ShellVideo';
    SuiteNavLinkIds.ALCHEMY = 'ShellAlchemy';
    SuiteNavLinkIds.SMILE = 'ShellSendASmile';
    // Workload Id
    SuiteNavLinkIds.SHAREPOINT_WORKLOAD = 'Sharepoint';
    return SuiteNavLinkIds;
}());
/* harmony default export */ __webpack_exports__["default"] = (SuiteNavLinkIds);


/***/ }),

/***/ "s77q":
/*!**********************************!*\
  !*** ./lib/NavigationWrapper.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file Wrapper around the O365Shell.Navigation global, preventing other
 * files from needing to access the global
 */
var NavigationWrapper = /** @class */ (function () {
    function NavigationWrapper() {
    }
    NavigationWrapper.prototype.OnLinkClick = function (callback) {
        return O365Shell.Navigation.OnLinkClick(callback);
    };
    NavigationWrapper.prototype.OnHamburgerButtonClick = function (callback) {
        return O365Shell.Navigation.OnHamburgerButtonClick(callback);
    };
    return NavigationWrapper;
}());
/* harmony default export */ __webpack_exports__["default"] = (NavigationWrapper);


/***/ }),

/***/ "sEEg":
/*!*************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/generateGuid.js ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function () {
    var s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return (s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVHdWlkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2dlbmVyYXRlR3VpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZTtJQUNiLElBQU0sRUFBRSxHQUFHO1FBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQzthQUM3QyxRQUFRLENBQUMsRUFBRSxDQUFDO2FBQ1osU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQztJQUNGLE9BQU8sQ0FDTCxFQUFFLEVBQUU7UUFDSixFQUFFLEVBQUU7UUFDSixHQUFHO1FBQ0gsRUFBRSxFQUFFO1FBQ0osR0FBRztRQUNILEVBQUUsRUFBRTtRQUNKLEdBQUc7UUFDSCxFQUFFLEVBQUU7UUFDSixHQUFHO1FBQ0gsRUFBRSxFQUFFO1FBQ0osRUFBRSxFQUFFO1FBQ0osRUFBRSxFQUFFLENBQ0wsQ0FBQztBQUNKLENBQUMsRUFBQyJ9

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

/***/ "tFCy":
/*!*****************************************************!*\
  !*** ./lib/search/createSearchPrefetchStateOnce.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createSearchPrefetchStateOnce; });
/* harmony import */ var _ms_sp_search_common_lib_getCleanPuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-search-common/lib/getCleanPuid */ "0Oc1");

var state;
/**
 * Creates the search prefetch library state the first time it is called.
 * Returns the created state on next invocations.
 *
 * @alpha
 */
// tslint:disable-next-line:export-name
function createSearchPrefetchStateOnce(createdBy, puid) {
    if (state) {
        return state;
    }
    try {
        puid = Object(_ms_sp_search_common_lib_getCleanPuid__WEBPACK_IMPORTED_MODULE_0__["default"])(puid);
    }
    catch (_a) {
        puid = 'HostAppFailedToProvidePuid';
    }
    return state = {
        puid: puid || 'HostAppFailedToProvidePuid',
        cache: {
            createdBy: createdBy,
            createdAt: 0,
            participants: [],
            caches: {}
        }
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

/***/ "vMVo":
/*!************************************************!*\
  !*** ./lib/search/BaseSearchBoxInitializer.js ***!
  \************************************************/
/*! exports provided: search, BaseSearchBoxInitializer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "search", function() { return search; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseSearchBoxInitializer", function() { return BaseSearchBoxInitializer; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "mwqp");


function shouldSearchBoxBeVisible(appId) {
    // Global flight check for the search box in the header
    if (!___WEBPACK_IMPORTED_MODULE_1__["SuiteNavManagerConfiguration"].isSearchBoxInHeaderFlighted()) {
        return false;
    }
    switch (appId) {
        case '1f019ae1-2de1-4f44-b723-00a6ec1d7445':
            // sp-home app
            return true;
        case 'c1c115a8-896b-4a53-a73c-cde6b8ca00f8':
            // sp-search app
            return true;
        case '7497f5b1-726b-46d8-9798-6be6bbef75c5':
        // sp-system-pages app
        case 'b6917cb1-93a0-4b97-a84d-7cf49975d4ec':
            // sp-pages app, which has an extra flight check
            return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1240 /* SPPagesSuiteSearchBox */);
        case '9f012051-e030-4487-9eb7-3365d03be182':
            // sp-list-host
            return true;
        default:
            // To enable the search box in other apps, add their appId above.
            // Flight checks should live here so that we can know whether the
            // search box should be visible before we've even loaded the app.
            return false;
    }
}
function setSearchBoxVisibility(appId) {
    search().SetSearchBoxVisibility(shouldSearchBoxBeVisible(appId));
}
/** Gets the O365 shell. */
function shell() {
    // tslint:disable-next-line:no-string-literal
    return window['O365Shell'];
}
/**
 * Gets the O365 shell search shim.
 *
 * @alpha
 */
function search() {
    return shell().Search;
}
/**
 * Suite search box initializers should subclass this class.
 *
 * @alpha
 */
var BaseSearchBoxInitializer = /** @class */ (function () {
    function BaseSearchBoxInitializer() {
        this.disposeList = [];
        this.currentProps = {
            pathname: '',
            querySearchText: ''
        };
    }
    /**
     * Initializes the suite search box, and returns a function that, when called,
     * will dispose the search box, and hide/show it if the application being transitioned
     * into isn't/is enabled for the suite search box.
     */
    BaseSearchBoxInitializer.prototype.initialize = function (submitSearchHandler, asyncFeatures) {
        var _this = this;
        return this.suiteNavRendered().then(function () {
            setSearchBoxVisibility(_this.applicationId);
            _this.disposeList.push(manageSubmitSearchHandler(submitSearchHandler, asyncFeatures));
            if (asyncFeatures) {
                asyncFeatures.then(function (_a) {
                    var listenToRoute = _a.listenToRoute, getSearchRoute = _a.getSearchRoute;
                    var initialProps = getSearchRoute();
                    _this.onRouteInitialized(initialProps);
                    _this.currentProps = initialProps;
                    _this.disposeList.push(listenToRoute(function (props) {
                        _this.onRouteChanged(_this.currentProps, props);
                        _this.currentProps = props;
                    }));
                });
            }
            _this.onSuiteNavRendered();
            return function (nextApplicationId) {
                setSearchBoxVisibility(nextApplicationId);
                _this.disposeList.forEach(function (dispose) { return dispose(); });
            };
        });
    };
    BaseSearchBoxInitializer.prototype.onSearchBoxActivated = function (onSearchBoxActivated) {
        var token = search().OnSearchBoxActivated(onSearchBoxActivated);
        this.disposeList.push(function () { return search().RemoveOnSearchBoxActivated(token); });
    };
    return BaseSearchBoxInitializer;
}());

function manageSubmitSearchHandler(submitSearchHandler, asyncFeatures) {
    if (asyncFeatures) {
        asyncFeatures.then(function (_a) {
            var createSubmitSearchHandler = _a.createSubmitSearchHandler;
            return (submitSearchHandler = createSubmitSearchHandler(submitSearchHandler));
        });
    }
    var token = search().OnSubmitSearch(function (searchText, context) {
        /* tslint:disable:no-any */
        return submitSearchHandler(searchText, context);
    });
    return function () { return search().RemoveOnSubmitSearch(token); };
}


/***/ }),

/***/ "vlQI":
/*!*************************************!*\
  !*** external "@microsoft/sp-http" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vlQI__;

/***/ }),

/***/ "wxtz":
/*!****************************************!*\
  !*** external "@microsoft/decorators" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_wxtz__;

/***/ }),

/***/ "y88i":
/*!********************************************!*\
  !*** external "@ms/odsp-utilities-bundle" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_y88i__;

/***/ }),

/***/ "y91V":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/models/store/DataStoreCachingType.js ***!
  \*******************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DataStoreCachingType;
(function (DataStoreCachingType) {
    DataStoreCachingType[DataStoreCachingType["none"] = 0] = "none";
    DataStoreCachingType[DataStoreCachingType["session"] = 1] = "session";
    DataStoreCachingType[DataStoreCachingType["local"] = 2] = "local";
    DataStoreCachingType[DataStoreCachingType["sharedMemory"] = 3] = "sharedMemory";
})(DataStoreCachingType || (DataStoreCachingType = {}));
exports.default = DataStoreCachingType;
//# sourceMappingURL=DataStoreCachingType.js.map

/***/ })

/******/ })});;
//# sourceMappingURL=sp-suite-nav.js.map