define("1c6c9123-7aac-41f3-a376-3caea41ed83f_1.11.0", ["@ms/sp-telemetry","@microsoft/sp-dynamic-data","@microsoft/sp-lodash-subset","@microsoft/sp-core-library","@microsoft/sp-page-context","@microsoft/load-themed-styles","@microsoft/sp-diagnostics","@microsoft/sp-http","resx-strings"], function(__WEBPACK_EXTERNAL_MODULE__2q6Q__, __WEBPACK_EXTERNAL_MODULE__84nK__, __WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_X_PM__, __WEBPACK_EXTERNAL_MODULE_jOlS__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_vlQI__, __WEBPACK_EXTERNAL_MODULE_vpy3__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"sp-loader": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({"systemjs-component-loader":"systemjs-component-loader","vendors~debug-prompt-components~developer-tools":"vendors~debug-prompt-components~developer-tools","vendors~debug-prompt-components":"vendors~debug-prompt-components","debug-prompt-components":"debug-prompt-components","vendors~developer-tools":"vendors~developer-tools","developer-tools":"developer-tools"}[chunkId]||chunkId) + "_" + {"systemjs-component-loader":"4d33b29bebc2c1b30f73","vendors~debug-prompt-components~developer-tools":"1fa2255043e597bacac7","vendors~debug-prompt-components":"c4b749fa1a51d5641fb3","debug-prompt-components":"17bbb014fcf45c438f42","vendors~developer-tools":"cc7828ac84706bf8bb53","developer-tools":"73a010dc401f6d4dbb94"}[chunkId] + ".js"
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
/******/ 	var jsonpArray = window["webpackJsonp_1c6c9123_7aac_41f3_a376_3caea41ed83f_1_11_0"] = window["webpackJsonp_1c6c9123_7aac_41f3_a376_3caea41ed83f_1_11_0"] || [];
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
/******/ 	  var regex = (typeof spScriptNamePattern !== 'undefined') ? spScriptNamePattern : new RegExp('\\/sp-loader(_[a-z0-9-]+)*\\.js', 'i');
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

/***/ "++S4":
/*!*****************************************************!*\
  !*** ./lib/requirejs/SPRequireJsComponentLoader.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _loader_BaseComponentLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../loader/BaseComponentLoader */ "Uk6p");
/* harmony import */ var _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error/ErrorBuilder */ "ff4n");
/* harmony import */ var _error_SPLoaderError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../error/SPLoaderError */ "BBmw");
/* harmony import */ var _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../stores/ComponentStore */ "eaMA");
/* harmony import */ var _utilities_LoadComponentExecutor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities/LoadComponentExecutor */ "td2X");
/* harmony import */ var _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/telemetryConstants */ "4mHd");
/* harmony import */ var _utilities_ComponentOverrider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities/ComponentOverrider */ "A8iV");
/* harmony import */ var _loader_loadComponent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../loader/loadComponent */ "aghm");
/* harmony import */ var _RequireJsLoader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./RequireJsLoader */ "TUD0");
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
// Copyright (c) Microsoft. All rights reserved.











/**
 * The component loader for SPFx.
 * This implementation uses RequireJS as the internal module loader.
 *
 * @alpha
 */
var SPRequireJsComponentLoader = /** @class */ (function (_super) {
    __extends(SPRequireJsComponentLoader, _super);
    // Initialization
    /**
     * @internal
     */
    function SPRequireJsComponentLoader(serviceScope, systemJsFallbackLoader) {
        var _this = _super.call(this, serviceScope) || this;
        _this._requireJsLoader = serviceScope.consume(_RequireJsLoader__WEBPACK_IMPORTED_MODULE_10__["default"].serviceKey);
        _this._systemJsFallbackLoader = systemJsFallbackLoader;
        _this._loadComponentExecutor = new _utilities_LoadComponentExecutor__WEBPACK_IMPORTED_MODULE_6__["default"](_this._loadComponentWithExecutor.bind(_this));
        _this._loadComponentExecutor.setAlternativeExecutor(systemJsFallbackLoader.executor);
        systemJsFallbackLoader.executor.setAlternativeExecutor(_this._loadComponentExecutor);
        return _this;
    }
    // Public API
    SPRequireJsComponentLoader.prototype.loadScript = function (url, options) {
        var _a;
        try {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(url, 'url');
        }
        catch (error) {
            return Promise.reject(error);
        }
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_7__["loadScriptQosScenarioName"]);
        if (options === undefined) {
            options = {};
        }
        if (typeof options === 'string') {
            var error = _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildLoadScriptWithStringError();
            qosMonitor.writeExpectedFailure('OptionsAsString', error);
            return Promise.reject(error);
        }
        if (options.globalExportsName) {
            this._requireJsLoader.requireConfig({
                shim: (_a = {},
                    _a[url.replace(/\.js$/, '')] = {
                        exports: options.globalExportsName
                    },
                    _a)
            });
        }
        return this._requireJsLoader.requireLoad(url, options.globalExportsName)
            .then(function (module) {
            qosMonitor.writeSuccess();
            return module;
        })
            .catch(function (e) {
            qosMonitor.writeUnexpectedFailure('RequireLoad', e);
            throw e;
        });
    };
    SPRequireJsComponentLoader.prototype.loadComponent = function (manifest) {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_7__["loadComponentQosScenarioName"]);
        var qosExtraData = this._buildQosExtraData(manifest);
        return this._loadComponentExecutor.loadComponent(manifest)
            .then(function (componentLoaded) {
            var component = componentLoaded.component, requireJsError = componentLoaded.requireJsError;
            if (requireJsError) {
                qosExtraData.loader = 'systemjs-fallback';
            }
            qosMonitor.writeSuccess(qosExtraData);
            return component;
        })
            .catch(function (requireJsError) {
            return _this._handleLoadComponentError(requireJsError, manifest, qosMonitor, qosExtraData);
        });
    };
    // Internal/private API
    SPRequireJsComponentLoader.prototype._overrideComponent = function (componentId, componentModule) {
        _utilities_ComponentOverrider__WEBPACK_IMPORTED_MODULE_8__["default"].overrideComponent(componentId, componentModule, this._serviceScope, _RequireJsLoader__WEBPACK_IMPORTED_MODULE_10__["default"].serviceKey);
    };
    SPRequireJsComponentLoader.prototype._unloadComponent = function (manifest) {
        if (_stores_ComponentStore__WEBPACK_IMPORTED_MODULE_5__["default"].instance.tryGetComponent(manifest.id, manifest.version)) {
            _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_5__["default"].instance.deleteComponent(manifest.id, manifest.version);
            this._requireJsLoader.requireDelete(manifest);
        }
    };
    /**
     * This functions tries to load the component with RequireJS, and if the killswitch is not enabled and the load fails,
     * will set up the component to be loaded with SystemJS.
     */
    SPRequireJsComponentLoader.prototype._loadComponentWithExecutor = function (manifest) {
        var _this = this;
        return Object(_loader_loadComponent__WEBPACK_IMPORTED_MODULE_9__["default"])(manifest, this._requireJsLoader)
            .then(function (component) {
            return {
                component: component
            };
        })
            .catch(function (requireJsError) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_7__["loadComponentLogSource"], "RequireJS failed to load component \"" + manifest.id + "\". Trying again with SystemJS.");
            // Remove the component from the store to ensure that SystemJS doesn't assume it's already loaded
            _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_5__["default"].instance.deleteComponent(manifest.id, manifest.version);
            return _this._systemJsFallbackLoader.loadComponent(manifest)
                .then(function (component) {
                return {
                    component: component,
                    requireJsError: requireJsError
                };
            })
                .catch(function () {
                // The systemjs error was already logged by the systemjs loader
                throw requireJsError;
            });
        });
    };
    SPRequireJsComponentLoader.prototype._buildQosExtraData = function (manifest) {
        return {
            manifestId: manifest.id,
            version: manifest.version,
            alias: manifest.alias,
            isInternal: manifest.isInternal,
            isDebug: manifest._isDebug,
            loader: 'requirejs'
        };
    };
    SPRequireJsComponentLoader.prototype._handleLoadComponentError = function (error, manifest, qosMonitor, qosExtraData) {
        if (error instanceof _error_SPLoaderError__WEBPACK_IMPORTED_MODULE_4__["default"] && error.isExpected) {
            qosMonitor.writeExpectedFailure(undefined, error, qosExtraData);
        }
        else {
            qosMonitor.writeUnexpectedFailure(undefined, error, qosExtraData);
        }
        // If it fails to load, the caller can then call loadComponent() again and not hit the cache
        _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_5__["default"].instance.deleteComponent(manifest.id, manifest.version);
        throw error;
    };
    return SPRequireJsComponentLoader;
}(_loader_BaseComponentLoader__WEBPACK_IMPORTED_MODULE_2__["BaseComponentLoader"]));
/* harmony default export */ __webpack_exports__["default"] = (SPRequireJsComponentLoader);


/***/ }),

/***/ "2clK":
/*!***************************************************!*\
  !*** ./lib/DeveloperTools/DeveloperToolsProxy.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file DeveloperToolsProxy.ts
 */
/**
 * Developer tools.
 * Allows to register tabs in the developer tools.
 *
 * @internal
 */
var DeveloperToolsProxy = /** @class */ (function () {
    function DeveloperToolsProxy() {
    }
    /**
     * Initializes the developer tools with an implementation.
     * Must be called once before it can be used.
     */
    DeveloperToolsProxy.initialize = function (developerToolsLoader) {
        DeveloperToolsProxy._instance = developerToolsLoader;
        DeveloperToolsProxy._instance.initialize();
    };
    /**
     * {@inheritDoc  IDeveloperTools.registerDeveloperToolsTab}
     */
    DeveloperToolsProxy.registerDeveloperToolsTab = function (developerToolsTab) {
        DeveloperToolsProxy._instance.registerDeveloperToolsTab(developerToolsTab);
    };
    return DeveloperToolsProxy;
}());
/* harmony default export */ __webpack_exports__["default"] = (DeveloperToolsProxy);


/***/ }),

/***/ "2q6Q":
/*!***********************************!*\
  !*** external "@ms/sp-telemetry" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2q6Q__;

/***/ }),

/***/ "4mHd":
/*!*********************************************!*\
  !*** ./lib/utilities/telemetryConstants.js ***!
  \*********************************************/
/*! exports provided: loadScriptQosScenarioName, loadComponentQosScenarioName, loadComponentImplQosScenarioName, loadPathDependencyQosScenarioName, emptyComponentErrorTagName, configureSystemJsErrorTagName, loadComponentDependenciesErrorTagName, loadPathDependenciesErrorTagName, spStarterLogSource, startApplicationLogSource, loadComponentLogSource, loadScriptLogSource, resolveAddressLogSource, componentStoreLogSource, manifestStoreLogSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadScriptQosScenarioName", function() { return loadScriptQosScenarioName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadComponentQosScenarioName", function() { return loadComponentQosScenarioName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadComponentImplQosScenarioName", function() { return loadComponentImplQosScenarioName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadPathDependencyQosScenarioName", function() { return loadPathDependencyQosScenarioName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyComponentErrorTagName", function() { return emptyComponentErrorTagName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configureSystemJsErrorTagName", function() { return configureSystemJsErrorTagName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadComponentDependenciesErrorTagName", function() { return loadComponentDependenciesErrorTagName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadPathDependenciesErrorTagName", function() { return loadPathDependenciesErrorTagName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spStarterLogSource", function() { return spStarterLogSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startApplicationLogSource", function() { return startApplicationLogSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadComponentLogSource", function() { return loadComponentLogSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadScriptLogSource", function() { return loadScriptLogSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveAddressLogSource", function() { return resolveAddressLogSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "componentStoreLogSource", function() { return componentStoreLogSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "manifestStoreLogSource", function() { return manifestStoreLogSource; });
// ISPComponentLoader.loadComponent
var loadScriptQosScenarioName = 'SPComponentLoader.loadScript';
var loadComponentQosScenarioName = 'SPComponentLoader.loadComponent';
var loadComponentImplQosScenarioName = 'SPComponentLoader._loadComponentImpl';
var loadPathDependencyQosScenarioName = 'SPComponentLoader.loadPathDependency';
var emptyComponentErrorTagName = 'EmptyComponent';
var configureSystemJsErrorTagName = 'ConfigureSystemJs';
var loadComponentDependenciesErrorTagName = 'LoadComponentDependencies';
var loadPathDependenciesErrorTagName = 'LoadPathDependencies';
// Log sources
var spStarterLogSource = { id: 'SPStarter.start' };
var startApplicationLogSource = { id: 'SPComponentLoader.startApplication' };
var loadComponentLogSource = { id: 'SPComponentLoader.loadComponent' };
var loadScriptLogSource = { id: 'SPComponentLoader.loadScript' };
var resolveAddressLogSource = { id: 'resolveAddress' };
var componentStoreLogSource = { id: 'ComponentStore' };
var manifestStoreLogSource = { id: 'ManifestStore' };


/***/ }),

/***/ "5TKm":
/*!************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/raw-loader/0.5.1/node_modules/raw-loader!./blobs/requirejs/2.1.20/require.min.js ***!
  \************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\r\n RequireJS 2.1.20 Copyright (c) 2010-2015, The Dojo Foundation All Rights Reserved.\r\n Available via the MIT or new BSD license.\r\n see: http://github.com/jrburke/requirejs for details\r\n*/\r\nvar requirejs,require,define;\r\n(function(ba){function G(b){return\"[object Function]\"===K.call(b)}function H(b){return\"[object Array]\"===K.call(b)}function v(b,c){if(b){var d;for(d=0;d<b.length&&(!b[d]||!c(b[d],d,b));d+=1);}}function T(b,c){if(b){var d;for(d=b.length-1;-1<d&&(!b[d]||!c(b[d],d,b));d-=1);}}function t(b,c){return fa.call(b,c)}function n(b,c){return t(b,c)&&b[c]}function A(b,c){for(var d in b)if(t(b,d)&&c(b[d],d))break}function U(b,c,d,e){c&&A(c,function(c,i){if(d||!t(b,i))e&&\"object\"===typeof c&&c&&!H(c)&&!G(c)&&!(c instanceof\r\nRegExp)?(b[i]||(b[i]={}),U(b[i],c,d,e)):b[i]=c});return b}function u(b,c){return function(){return c.apply(b,arguments)}}function ca(b){throw b;}function da(b){if(!b)return b;var c=ba;v(b.split(\".\"),function(b){c=c[b]});return c}function B(b,c,d,e){c=Error(c+\"\\nhttp://requirejs.org/docs/errors.html#\"+b);c.requireType=b;c.requireModules=e;d&&(c.originalError=d);return c}function ga(b){function c(a,j,b){var f,l,c,d,h,e,g,i,j=j&&j.split(\"/\"),p=k.map,m=p&&p[\"*\"];if(a){a=a.split(\"/\");l=a.length-1;k.nodeIdCompat&&\r\nQ.test(a[l])&&(a[l]=a[l].replace(Q,\"\"));\".\"===a[0].charAt(0)&&j&&(l=j.slice(0,j.length-1),a=l.concat(a));l=a;for(c=0;c<l.length;c++)if(d=l[c],\".\"===d)l.splice(c,1),c-=1;else if(\"..\"===d&&!(0===c||1===c&&\"..\"===l[2]||\"..\"===l[c-1])&&0<c)l.splice(c-1,2),c-=2;a=a.join(\"/\")}if(b&&p&&(j||m)){l=a.split(\"/\");c=l.length;a:for(;0<c;c-=1){h=l.slice(0,c).join(\"/\");if(j)for(d=j.length;0<d;d-=1)if(b=n(p,j.slice(0,d).join(\"/\")))if(b=n(b,h)){f=b;e=c;break a}!g&&(m&&n(m,h))&&(g=n(m,h),i=c)}!f&&g&&(f=g,e=i);f&&(l.splice(0,\r\ne,f),a=l.join(\"/\"))}return(f=n(k.pkgs,a))?f:a}function d(a){z&&v(document.getElementsByTagName(\"script\"),function(j){if(j.getAttribute(\"data-requiremodule\")===a&&j.getAttribute(\"data-requirecontext\")===h.contextName)return j.parentNode.removeChild(j),!0})}function p(a){var j=n(k.paths,a);if(j&&H(j)&&1<j.length)return j.shift(),h.require.undef(a),h.makeRequire(null,{skipMap:!0})([a]),!0}function g(a){var j,c=a?a.indexOf(\"!\"):-1;-1<c&&(j=a.substring(0,c),a=a.substring(c+1,a.length));return[j,a]}function i(a,\r\nj,b,f){var l,d,e=null,i=j?j.name:null,k=a,p=!0,m=\"\";a||(p=!1,a=\"_@r\"+(K+=1));a=g(a);e=a[0];a=a[1];e&&(e=c(e,i,f),d=n(q,e));a&&(e?m=d&&d.normalize?d.normalize(a,function(a){return c(a,i,f)}):-1===a.indexOf(\"!\")?c(a,i,f):a:(m=c(a,i,f),a=g(m),e=a[0],m=a[1],b=!0,l=h.nameToUrl(m)));b=e&&!d&&!b?\"_unnormalized\"+(O+=1):\"\";return{prefix:e,name:m,parentMap:j,unnormalized:!!b,url:l,originalName:k,isDefine:p,id:(e?e+\"!\"+m:m)+b}}function r(a){var j=a.id,b=n(m,j);b||(b=m[j]=new h.Module(a));return b}function s(a,\r\nj,b){var f=a.id,c=n(m,f);if(t(q,f)&&(!c||c.defineEmitComplete))\"defined\"===j&&b(q[f]);else if(c=r(a),c.error&&\"error\"===j)b(c.error);else c.on(j,b)}function w(a,b){var c=a.requireModules,f=!1;if(b)b(a);else if(v(c,function(b){if(b=n(m,b))b.error=a,b.events.error&&(f=!0,b.emit(\"error\",a))}),!f)e.onError(a)}function x(){R.length&&(v(R,function(a){var b=a[0];\"string\"===typeof b&&(h.defQueueMap[b]=!0);C.push(a)}),R=[])}function y(a){delete m[a];delete V[a]}function F(a,b,c){var f=a.map.id;a.error?a.emit(\"error\",\r\na.error):(b[f]=!0,v(a.depMaps,function(f,d){var e=f.id,h=n(m,e);h&&(!a.depMatched[d]&&!c[e])&&(n(b,e)?(a.defineDep(d,q[e]),a.check()):F(h,b,c))}),c[f]=!0)}function D(){var a,b,c=(a=1E3*k.waitSeconds)&&h.startTime+a<(new Date).getTime(),f=[],l=[],e=!1,i=!0;if(!W){W=!0;A(V,function(a){var h=a.map,g=h.id;if(a.enabled&&(h.isDefine||l.push(a),!a.error))if(!a.inited&&c)p(g)?e=b=!0:(f.push(g),d(g));else if(!a.inited&&(a.fetched&&h.isDefine)&&(e=!0,!h.prefix))return i=!1});if(c&&f.length)return a=B(\"timeout\",\r\n\"Load timeout for modules: \"+f,null,f),a.contextName=h.contextName,w(a);i&&v(l,function(a){F(a,{},{})});if((!c||b)&&e)if((z||ea)&&!X)X=setTimeout(function(){X=0;D()},50);W=!1}}function E(a){t(q,a[0])||r(i(a[0],null,!0)).init(a[1],a[2])}function I(a){var a=a.currentTarget||a.srcElement,b=h.onScriptLoad;a.detachEvent&&!Y?a.detachEvent(\"onreadystatechange\",b):a.removeEventListener(\"load\",b,!1);b=h.onScriptError;(!a.detachEvent||Y)&&a.removeEventListener(\"error\",b,!1);return{node:a,id:a&&a.getAttribute(\"data-requiremodule\")}}\r\nfunction J(){var a;for(x();C.length;){a=C.shift();if(null===a[0])return w(B(\"mismatch\",\"Mismatched anonymous define() module: \"+a[a.length-1]));E(a)}h.defQueueMap={}}var W,Z,h,L,X,k={waitSeconds:7,baseUrl:\"./\",paths:{},bundles:{},pkgs:{},shim:{},config:{}},m={},V={},$={},C=[],q={},S={},aa={},K=1,O=1;L={require:function(a){return a.require?a.require:a.require=h.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?q[a.map.id]=a.exports:a.exports=q[a.map.id]={}},\r\nmodule:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return n(k.config,a.map.id)||{}},exports:a.exports||(a.exports={})}}};Z=function(a){this.events=n($,a.id)||{};this.map=a;this.shim=n(k.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};Z.prototype={init:function(a,b,c,f){f=f||{};if(!this.inited){this.factory=b;if(c)this.on(\"error\",c);else this.events.error&&(c=u(this,function(a){this.emit(\"error\",a)}));\r\nthis.depMaps=a&&a.slice(0);this.errback=c;this.inited=!0;this.ignore=f.ignore;f.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0;h.startTime=(new Date).getTime();var a=this.map;if(this.shim)h.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],u(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?\r\nthis.callPlugin():this.load()}},load:function(){var a=this.map.url;S[a]||(S[a]=!0,h.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;var f=this.exports,l=this.factory;if(this.inited)if(this.error)this.emit(\"error\",this.error);else{if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(G(l)){if(this.events.error&&this.map.isDefine||e.onError!==ca)try{f=h.execCb(c,l,b,f)}catch(d){a=d}else f=h.execCb(c,l,b,f);this.map.isDefine&&\r\nvoid 0===f&&((b=this.module)?f=b.exports:this.usingExports&&(f=this.exports));if(a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?\"define\":\"require\",w(this.error=a)}else f=l;this.exports=f;if(this.map.isDefine&&!this.ignore&&(q[c]=f,e.onResourceLoad))e.onResourceLoad(h,this.map,this.depMaps);y(c);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit(\"defined\",this.exports),this.defineEmitComplete=\r\n!0)}}else t(h.defQueueMap,c)||this.fetch()}},callPlugin:function(){var a=this.map,b=a.id,d=i(a.prefix);this.depMaps.push(d);s(d,\"defined\",u(this,function(f){var l,d;d=n(aa,this.map.id);var g=this.map.name,P=this.map.parentMap?this.map.parentMap.name:null,p=h.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(f.normalize&&(g=f.normalize(g,function(a){return c(a,P,!0)})||\"\"),f=i(a.prefix+\"!\"+g,this.map.parentMap),s(f,\"defined\",u(this,function(a){this.init([],function(){return a},\r\nnull,{enabled:!0,ignore:!0})})),d=n(m,f.id)){this.depMaps.push(f);if(this.events.error)d.on(\"error\",u(this,function(a){this.emit(\"error\",a)}));d.enable()}}else d?(this.map.url=h.nameToUrl(d),this.load()):(l=u(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),l.error=u(this,function(a){this.inited=!0;this.error=a;a.requireModules=[b];A(m,function(a){0===a.map.id.indexOf(b+\"_unnormalized\")&&y(a.map.id)});w(a)}),l.fromText=u(this,function(f,c){var d=a.name,g=i(d),P=M;c&&(f=c);P&&\r\n(M=!1);r(g);t(k.config,b)&&(k.config[d]=k.config[b]);try{e.exec(f)}catch(m){return w(B(\"fromtexteval\",\"fromText eval for \"+b+\" failed: \"+m,m,[b]))}P&&(M=!0);this.depMaps.push(g);h.completeLoad(d);p([d],l)}),f.load(a.name,p,l,k))}));h.enable(d,this);this.pluginMaps[d.id]=d},enable:function(){V[this.map.id]=this;this.enabling=this.enabled=!0;v(this.depMaps,u(this,function(a,b){var c,f;if(\"string\"===typeof a){a=i(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=\r\nn(L,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;s(a,\"defined\",u(this,function(a){this.undefed||(this.defineDep(b,a),this.check())}));this.errback?s(a,\"error\",u(this,this.errback)):this.events.error&&s(a,\"error\",u(this,function(a){this.emit(\"error\",a)}))}c=a.id;f=m[c];!t(L,c)&&(f&&!f.enabled)&&h.enable(a,this)}));A(this.pluginMaps,u(this,function(a){var b=n(m,a.id);b&&!b.enabled&&h.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=\r\n[]);c.push(b)},emit:function(a,b){v(this.events[a],function(a){a(b)});\"error\"===a&&delete this.events[a]}};h={config:k,contextName:b,registry:m,defined:q,urlFetched:S,defQueue:C,defQueueMap:{},Module:Z,makeModuleMap:i,nextTick:e.nextTick,onError:w,configure:function(a){a.baseUrl&&\"/\"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+=\"/\");var b=k.shim,c={paths:!0,bundles:!0,config:!0,map:!0};A(a,function(a,b){c[b]?(k[b]||(k[b]={}),U(k[b],a,!0,!0)):k[b]=a});a.bundles&&A(a.bundles,function(a,b){v(a,\r\nfunction(a){a!==b&&(aa[a]=b)})});a.shim&&(A(a.shim,function(a,c){H(a)&&(a={deps:a});if((a.exports||a.init)&&!a.exportsFn)a.exportsFn=h.makeShimExports(a);b[c]=a}),k.shim=b);a.packages&&v(a.packages,function(a){var b,a=\"string\"===typeof a?{name:a}:a;b=a.name;a.location&&(k.paths[b]=a.location);k.pkgs[b]=a.name+\"/\"+(a.main||\"main\").replace(ha,\"\").replace(Q,\"\")});A(m,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=i(b,null,!0))});if(a.deps||a.callback)h.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;\r\na.init&&(b=a.init.apply(ba,arguments));return b||a.exports&&da(a.exports)}},makeRequire:function(a,j){function g(c,d,p){var k,n;j.enableBuildCallback&&(d&&G(d))&&(d.__requireJsBuild=!0);if(\"string\"===typeof c){if(G(d))return w(B(\"requireargs\",\"Invalid require call\"),p);if(a&&t(L,c))return L[c](m[a.id]);if(e.get)return e.get(h,c,a,g);k=i(c,a,!1,!0);k=k.id;return!t(q,k)?w(B(\"notloaded\",'Module name \"'+k+'\" has not been loaded yet for context: '+b+(a?\"\":\". Use require([])\"))):q[k]}J();h.nextTick(function(){J();\r\nn=r(i(null,a));n.skipMap=j.skipMap;n.init(c,d,p,{enabled:!0});D()});return g}j=j||{};U(g,{isBrowser:z,toUrl:function(b){var d,e=b.lastIndexOf(\".\"),j=b.split(\"/\")[0];if(-1!==e&&(!(\".\"===j||\"..\"===j)||1<e))d=b.substring(e,b.length),b=b.substring(0,e);return h.nameToUrl(c(b,a&&a.id,!0),d,!0)},defined:function(b){return t(q,i(b,a,!1,!0).id)},specified:function(b){b=i(b,a,!1,!0).id;return t(q,b)||t(m,b)}});a||(g.undef=function(b){x();var c=i(b,a,!0),e=n(m,b);e.undefed=!0;d(b);delete q[b];delete S[c.url];\r\ndelete $[b];T(C,function(a,c){a[0]===b&&C.splice(c,1)});delete h.defQueueMap[b];e&&(e.events.defined&&($[b]=e.events),y(b))});return g},enable:function(a){n(m,a.id)&&r(a).enable()},completeLoad:function(a){var b,c,d=n(k.shim,a)||{},e=d.exports;for(x();C.length;){c=C.shift();if(null===c[0]){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);E(c)}h.defQueueMap={};c=n(m,a);if(!b&&!t(q,a)&&c&&!c.inited){if(k.enforceDefine&&(!e||!da(e)))return p(a)?void 0:w(B(\"nodefine\",\"No define call for \"+a,null,[a]));E([a,\r\nd.deps||[],d.exportsFn])}D()},nameToUrl:function(a,b,c){var d,g,i;(d=n(k.pkgs,a))&&(a=d);if(d=n(aa,a))return h.nameToUrl(d,b,c);if(e.jsExtRegExp.test(a))d=a+(b||\"\");else{d=k.paths;a=a.split(\"/\");for(g=a.length;0<g;g-=1)if(i=a.slice(0,g).join(\"/\"),i=n(d,i)){H(i)&&(i=i[0]);a.splice(0,g,i);break}d=a.join(\"/\");d+=b||(/^data\\:|\\?/.test(d)||c?\"\":\".js\");d=(\"/\"===d.charAt(0)||d.match(/^[\\w\\+\\.\\-]+:/)?\"\":k.baseUrl)+d}return k.urlArgs?d+((-1===d.indexOf(\"?\")?\"?\":\"&\")+k.urlArgs):d},load:function(a,b){e.load(h,\r\na,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if(\"load\"===a.type||ia.test((a.currentTarget||a.srcElement).readyState))N=null,a=I(a),h.completeLoad(a.id)},onScriptError:function(a){var b=I(a);if(!p(b.id))return w(B(\"scripterror\",\"Script error for: \"+b.id,a,[b.id]))}};h.require=h.makeRequire();return h}var e,x,y,D,I,E,N,J,r,O,ja=/(\\/\\*([\\s\\S]*?)\\*\\/|([^:]|^)\\/\\/(.*)$)/mg,ka=/[^.]\\s*require\\s*\\(\\s*[\"']([^'\"\\s]+)[\"']\\s*\\)/g,Q=/\\.js$/,ha=/^\\.\\//;x=Object.prototype;var K=\r\nx.toString,fa=x.hasOwnProperty,z=!!(\"undefined\"!==typeof window&&\"undefined\"!==typeof navigator&&window.document),ea=!z&&\"undefined\"!==typeof importScripts,ia=z&&\"PLAYSTATION 3\"===navigator.platform?/^complete$/:/^(complete|loaded)$/,Y=\"undefined\"!==typeof opera&&\"[object Opera]\"===opera.toString(),F={},s={},R=[],M=!1;if(\"undefined\"===typeof define){if(\"undefined\"!==typeof requirejs){if(G(requirejs))return;s=requirejs;requirejs=void 0}\"undefined\"!==typeof require&&!G(require)&&(s=require,require=\r\nvoid 0);e=requirejs=function(b,c,d,p){var g,i=\"_\";!H(b)&&\"string\"!==typeof b&&(g=b,H(c)?(b=c,c=d,d=p):b=[]);g&&g.context&&(i=g.context);(p=n(F,i))||(p=F[i]=e.s.newContext(i));g&&p.configure(g);return p.require(b,c,d)};e.config=function(b){return e(b)};e.nextTick=\"undefined\"!==typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=e);e.version=\"2.1.20\";e.jsExtRegExp=/^\\/|:|\\?|\\.js$/;e.isBrowser=z;x=e.s={contexts:F,newContext:ga};e({});v([\"toUrl\",\"undef\",\"defined\",\"specified\"],\r\nfunction(b){e[b]=function(){var c=F._;return c.require[b].apply(c,arguments)}});if(z&&(y=x.head=document.getElementsByTagName(\"head\")[0],D=document.getElementsByTagName(\"base\")[0]))y=x.head=D.parentNode;e.onError=ca;e.createNode=function(b){var c=b.xhtml?document.createElementNS(\"http://www.w3.org/1999/xhtml\",\"html:script\"):document.createElement(\"script\");c.type=b.scriptType||\"text/javascript\";c.charset=\"utf-8\";c.async=!0;return c};e.load=function(b,c,d){var p=b&&b.config||{},g;if(z){g=e.createNode(p,\r\nc,d);if(p.onNodeCreated)p.onNodeCreated(g,p,c,d);g.setAttribute(\"data-requirecontext\",b.contextName);g.setAttribute(\"data-requiremodule\",c);g.attachEvent&&!(g.attachEvent.toString&&0>g.attachEvent.toString().indexOf(\"[native code\"))&&!Y?(M=!0,g.attachEvent(\"onreadystatechange\",b.onScriptLoad)):(g.addEventListener(\"load\",b.onScriptLoad,!1),g.addEventListener(\"error\",b.onScriptError,!1));g.src=d;J=g;D?y.insertBefore(g,D):y.appendChild(g);J=null;return g}if(ea)try{importScripts(d),b.completeLoad(c)}catch(i){b.onError(B(\"importscripts\",\r\n\"importScripts failed for \"+c+\" at \"+d,i,[c]))}};z&&!s.skipDataMain&&T(document.getElementsByTagName(\"script\"),function(b){y||(y=b.parentNode);if(I=b.getAttribute(\"data-main\"))return r=I,s.baseUrl||(E=r.split(\"/\"),r=E.pop(),O=E.length?E.join(\"/\")+\"/\":\"./\",s.baseUrl=O),r=r.replace(Q,\"\"),e.jsExtRegExp.test(r)&&(r=I),s.deps=s.deps?s.deps.concat(r):[r],!0});define=function(b,c,d){var e,g;\"string\"!==typeof b&&(d=c,c=b,b=null);H(c)||(d=c,c=null);!c&&G(d)&&(c=[],d.length&&(d.toString().replace(ja,\"\").replace(ka,\r\nfunction(b,d){c.push(d)}),c=(1===d.length?[\"require\"]:[\"require\",\"exports\",\"module\"]).concat(c)));if(M){if(!(e=J))N&&\"interactive\"===N.readyState||T(document.getElementsByTagName(\"script\"),function(b){if(\"interactive\"===b.readyState)return N=b}),e=N;e&&(b||(b=e.getAttribute(\"data-requiremodule\")),g=F[e.getAttribute(\"data-requirecontext\")])}g?(g.defQueue.push([b,c,d]),g.defQueueMap[b]=!0):R.push([b,c,d])};define.amd={jQuery:!0};e.exec=function(b){return eval(b)};e(s)}})(this);\r\n"

/***/ }),

/***/ "84nK":
/*!*********************************************!*\
  !*** external "@microsoft/sp-dynamic-data" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__84nK__;

/***/ }),

/***/ "8N74":
/*!********************************!*\
  !*** ./lib/loc/Common.resx.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_fVUay/3ENa56/o3BfjRdrw';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "A8iV":
/*!*********************************************!*\
  !*** ./lib/utilities/ComponentOverrider.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stores/ComponentStore */ "eaMA");
/* harmony import */ var _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stores/ManifestStore */ "Eke5");
/* harmony import */ var _componentConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./componentConstants */ "kd3Z");




var ComponentOverrider = /** @class */ (function () {
    function ComponentOverrider() {
    }
    /**
     * Given a component id and a component module, it sets the component in the loader, therefore being
     * available without the need of loading it separately.
     * Should only be used when initializing the loader.
     *
     * @param componentId - Id of the component to override. There should be only one version of the component.
     * @param componentModule - Component module.
     */
    ComponentOverrider.overrideComponent = function (componentId, componentModule, serviceScope, moduleLoaderServiceKey) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(componentId, 'componentId');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(componentModule, 'componentModule');
        // Needed for React16 rollout. Should be removed with version aware assembly manifests.
        var version = ComponentOverrider.getReactVersionIfNecessary(componentId);
        var manifest = _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_2__["default"].instance.tryGetManifest(componentId, version);
        // VSO bug 295355 makes it possible that manifest for odspUtilitiesBundle may not exist.
        if (!manifest) {
            return;
        }
        serviceScope.consume(moduleLoaderServiceKey).ensure(manifest, componentModule);
        _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_1__["default"].instance.storeLoadedComponent(manifest.id, manifest.version, componentModule);
    };
    /**
     * This is necessary because assemblies don't advertise the component version, and it may be the case where the page
     * requires both React 15 and React 16 manifests, but assemblies never have React 15 anymore.  When assemblies have
     * a deeper understanding of the versions that are included in them, this can be removed.
     */
    ComponentOverrider.getReactVersionIfNecessary = function (componentId) {
        if (componentId === _componentConstants__WEBPACK_IMPORTED_MODULE_3__["reactComponentId"] || componentId === _componentConstants__WEBPACK_IMPORTED_MODULE_3__["reactDomComponentId"]) {
            return _componentConstants__WEBPACK_IMPORTED_MODULE_3__["react16Version"];
        }
        else {
            return undefined;
        }
    };
    return ComponentOverrider;
}());
/* harmony default export */ __webpack_exports__["default"] = (ComponentOverrider);


/***/ }),

/***/ "ASbA":
/*!****************************************!*\
  !*** ./lib/utilities/isCorsEnabled.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isCorsEnabled; });
// https://spo*.akamaihd.net/
var corsMatch = /^https:\/\/spo.*?\.akamaihd\.net\/?[^?]/;
/**
 * Given a URL, determines if that URL resource is served with the
 * Access-Control-Allow-Origin: * CORS header.
 */
function isCorsEnabled(src) {
    return !!src && src.search(corsMatch) === 0;
}


/***/ }),

/***/ "AtZb":
/*!*************************************!*\
  !*** ./lib/debug/showDebugError.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return showDebugError; });
/* harmony import */ var _ensureDebugComponents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ensureDebugComponents */ "X2Mq");

function showDebugError(innerError, errorText, title) {
    return Object(_ensureDebugComponents__WEBPACK_IMPORTED_MODULE_0__["default"])().then(function (debugComponents) {
        debugComponents.showError(innerError, errorText, title);
    });
}


/***/ }),

/***/ "AvvH":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@microsoft/loader-raw-script/1.2.182/node_modules/@microsoft/loader-raw-script/lib!./blobs/systemjs/0.19.25/dist/system.spfx.js ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global) {
  eval('/*\r\n * SystemJS v0.19.25\r\n */\r\n!function(){function e(){!function(e){function t(e,n){if("string"!=typeof e)throw new TypeError("URL must be a string");var r=String(e).replace(/^\\s+|\\s+$/g,"").match(/^([^:\\/?#]+:)?(?:\\/\\/(?:([^:@\\/?#]*)(?::([^:@\\/?#]*))?@)?(([^:\\/?#]*)(?::(\\d*))?))?([^?#]*)(\\?[^#]*)?(#[\\s\\S]*)?/);if(!r)throw new RangeError("Invalid URL format");var a=r[1]||"",o=r[2]||"",s=r[3]||"",i=r[4]||"",l=r[5]||"",u=r[6]||"",d=r[7]||"",c=r[8]||"",f=r[9]||"";if(void 0!==n){var m=n instanceof t?n:new t(n),p=!a&&!i&&!o;!p||d||c||(c=m.search),p&&"/"!==d[0]&&(d=d?(!m.host&&!m.username||m.pathname?"":"/")+m.pathname.slice(0,m.pathname.lastIndexOf("/")+1)+d:m.pathname);var h=[];d.replace(/^(\\.\\.?(\\/|$))+/,"").replace(/\\/(\\.(\\/|$))+/g,"/").replace(/\\/\\.\\.$/,"/../").replace(/\\/?[^\\/]*/g,function(e){"/.."===e?h.pop():h.push(e)}),d=h.join("").replace(/^\\//,"/"===d[0]?"/":""),p&&(u=m.port,l=m.hostname,i=m.host,s=m.password,o=m.username),a||(a=m.protocol)}"file:"==a&&(d=d.replace(/\\\\/g,"/")),this.origin=i?a+(""!==a||""!==i?"//":"")+i:"",this.href=a+(a&&i||"file:"==a?"//":"")+(""!==o?o+(""!==s?":"+s:"")+"@":"")+i+d+c+f,this.protocol=a,this.username=o,this.password=s,this.host=i,this.hostname=l,this.port=u,this.pathname=d,this.search=c,this.hash=f}e.URLPolyfill=t}("undefined"!=typeof self?self:global),function(e){function t(e,t){return e instanceof Error?(e.message=t+"\\n	"+e.message,Error.call(e,e.message)):e=t+"\\n	"+e,e}function n(e,n,r){try{new Function(e).call(r)}catch(a){throw t(a,"Evaluating "+n)}}function r(){}function a(t){this._loader={loaderObj:this,loads:[],modules:{},importPromises:{},moduleRecords:{}},z(this,"global",{get:function(){return e}})}function o(){a.call(this),this.paths={}}function s(e,t){var n,r="",a=0;for(var o in e){var s=o.split("*");if(s.length>2)throw new TypeError("Only one wildcard in a path is permitted");if(1==s.length){if(t==o)return e[o];if(t.substr(0,o.length-1)==o.substr(0,o.length-1)&&(t.length<o.length||t[o.length-1]==o[o.length-1])&&"/"==e[o][e[o].length-1])return e[o].substr(0,e[o].length-1)+(t.length>o.length?"/"+t.substr(o.length):"")}else{var i=s[0].length;i>=a&&t.substr(0,s[0].length)==s[0]&&t.substr(t.length-s[1].length)==s[1]&&(a=i,r=o,n=t.substr(s[0].length,t.length-s[1].length-s[0].length))}}var l=e[r];return"string"==typeof n&&(l=l.replace("*",n)),l}function i(){}function l(){o.call(this),J.call(this)}function u(){}function d(e,t){l.prototype[e]=t(l.prototype[e]||function(){})}function c(e){J=e(J||function(){})}function f(e){for(var t=[],n=[],r=0,a=e.length;a>r;r++){var o=I.call(t,e[r]);-1===o?(t.push(e[r]),n.push([r])):n[o].push(r)}return{names:t,indices:n}}function m(e){var t={};if("object"==typeof e||"function"==typeof e)if(C){var n;for(var r in e)(n=Object.getOwnPropertyDescriptor(e,r))&&z(t,r,n)}else{var a=e&&e.hasOwnProperty;for(var r in e)(!a||e.hasOwnProperty(r))&&(t[r]=e[r])}return t["default"]=e,z(t,"__useDefault",{value:!0}),t}function p(e,t,n){for(var r in t)n&&r in e||(e[r]=t[r]);return e}function h(e,t,n){for(var r in t){var a=t[r];r in e?a instanceof Array&&e[r]instanceof Array?e[r]=[].concat(n?a:e[r]).concat(n?e[r]:a):"object"==typeof a&&null!==a&&"object"==typeof e[r]?e[r]=p(p({},e[r]),a,n):n||(e[r]=a):e[r]=a}}function g(e){this.warnings&&"undefined"!=typeof console&&console.warn}function v(e,t){for(var n=e.split(".");n.length;)t=t[n.shift()];return t}function y(){if(H[this.baseURL])return H[this.baseURL];"/"!=this.baseURL[this.baseURL.length-1]&&(this.baseURL+="/");var e=new F(this.baseURL,L);return this.baseURL=e.href,H[this.baseURL]=e}function b(e,t){var n,r=0;for(var a in e)if(t.substr(0,a.length)==a&&(t.length==a.length||"/"==t[a.length])){var o=a.split("/").length;if(r>=o)continue;n=a,r=o}return n}function w(e){this.set("@system-env",this.newModule({browser:O,node:!!this._nodeRequire,production:e,"default":!0}))}function x(e){return("."!=e[0]||!!e[1]&&"/"!=e[1]&&"."!=e[1])&&"/"!=e[0]&&!e.match(B)}function S(e,t){return t&&(t=t.replace(/#/g,"%05")),new F(e,t||X).href.replace(/%05/g,"#")}function E(e,t){return new F(t,y.call(e)).href}function j(e,t){if(!x(e))return S(e,t);var n=b(this.map,e);if(n&&(e=this.map[n]+e.substr(n.length),!x(e)))return S(e);if(this.has(e))return e;if("@node/"==e.substr(0,6)&&-1!=Z.indexOf(e.substr(6))){if(!this._nodeRequire)throw new TypeError("Error loading "+e+". Can only load node core modules in Node.");return this.set(e,this.newModule(m(this._nodeRequire(e.substr(6))))),e}var r=s(this.paths,e);return r&&!x(r)?S(r):E(this,r||e)}function _(e){var t=e.match(V);return t&&"System.register"==e.substr(t[0].length,15)}function k(){return{name:null,deps:null,originalIndices:null,declare:null,execute:null,executingRequire:!1,declarative:!1,normalizedDeps:null,groupIndex:null,evaluated:!1,module:null,esModule:null,esmExports:!1}}function P(t){if("string"==typeof t)return v(t,e);if(!(t instanceof Array))throw new Error("Global exports must be a string or array.");for(var n={},r=!0,a=0;a<t.length;a++){var o=v(t[a],e);r&&(n["default"]=o,r=!1),n[t[a].split(".").pop()]=o}return n}var R="undefined"==typeof window&&"undefined"!=typeof self&&"undefined"!=typeof importScripts,O="undefined"!=typeof window&&"undefined"!=typeof document,M="undefined"!=typeof process&&"undefined"!=typeof process.platform&&!!process.platform.match(/^win/);e.console||(e.console={assert:function(){}});var z,I=Array.prototype.indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(this[t]===e)return t;return-1};!function(){try{Object.defineProperty({},"a",{})&&(z=Object.defineProperty)}catch(e){z=function(e,t,n){try{e[t]=n.value||n.get.call(e)}catch(r){}}}}();var L;if("undefined"!=typeof document&&document.getElementsByTagName){if(L=document.baseURI,!L){var A=document.getElementsByTagName("base");L=A[0]&&A[0].href||window.location.href}L=L.split("#")[0].split("?")[0],L=L.substr(0,L.lastIndexOf("/")+1)}else if("undefined"!=typeof process&&process.cwd)L="file://"+(M?"/":"")+process.cwd()+"/",M&&(L=L.replace(/\\\\/g,"/"));else{if("undefined"==typeof location)throw new TypeError("No environment baseURI");L=e.location.href}var F=e.URLPolyfill||e.URL;z(r.prototype,"toString",{value:function(){return"Module"}}),function(){function o(e){return{status:"loading",name:e,linkSets:[],dependencies:[],metadata:{}}}function s(e,t,n){return new Promise(c({step:n.address?"fetch":"locate",loader:e,moduleName:t,moduleMetadata:n&&n.metadata||{},moduleSource:n.source,moduleAddress:n.address}))}function i(e,t,n,r){return new Promise(function(a,o){a(e.loaderObj.normalize(t,n,r))}).then(function(t){var n;if(e.modules[t])return n=o(t),n.status="linked",n.module=e.modules[t],n;for(var r=0,a=e.loads.length;a>r;r++)if(n=e.loads[r],n.name==t)return n;return n=o(t),e.loads.push(n),l(e,n),n})}function l(e,t){u(e,t,Promise.resolve().then(function(){return e.loaderObj.locate({name:t.name,metadata:t.metadata})}))}function u(e,t,n){d(e,t,n.then(function(n){return"loading"==t.status?(t.address=n,e.loaderObj.fetch({name:t.name,metadata:t.metadata,address:n})):void 0}))}function d(t,r,a){a.then(function(a){return"loading"==r.status?Promise.resolve(t.loaderObj.translate({name:r.name,metadata:r.metadata,address:r.address,source:a})).then(function(e){return r.source=e,t.loaderObj.instantiate({name:r.name,metadata:r.metadata,address:r.address,source:e})}).then(function(a){if(void 0===a)return r.address=r.address||"<Anonymous Module "+ ++j+">",r.isDeclarative=!0,E.call(t.loaderObj,r).then(function(t){var a=e.System,o=a.register;a.register=function(e,t,n){"string"!=typeof e&&(n=t,t=e),r.declare=n,r.depsList=t},n(t,r.address,{}),a.register=o});if("object"!=typeof a)throw TypeError("Invalid instantiate return value");r.depsList=a.deps||[],r.execute=a.execute,r.isDeclarative=!1}).then(function(){r.dependencies=[];for(var e=r.depsList,n=[],a=0,o=e.length;o>a;a++)(function(e,a){n.push(i(t,e,r.name,r.address).then(function(t){if(r.dependencies[a]={key:e,value:t.name},"linked"!=t.status)for(var n=r.linkSets.concat([]),o=0,s=n.length;s>o;o++)m(n[o],t)}))})(e[a],a);return Promise.all(n)}).then(function(){r.status="loaded";for(var e=r.linkSets.concat([]),t=0,n=e.length;n>t;t++)h(e[t],r)}):void 0})["catch"](function(e){r.status="failed",r.exception=e;for(var t=r.linkSets.concat([]),n=0,a=t.length;a>n;n++)g(t[n],r,e)})}function c(e){return function(t,n){var r=e.loader,a=e.moduleName,s=e.step;if(r.modules[a])throw new TypeError(\'"\'+a+\'" already exists in the module table\');for(var i,c=0,m=r.loads.length;m>c;c++)if(r.loads[c].name==a&&(i=r.loads[c],"translate"!=s||i.source||(i.address=e.moduleAddress,d(r,i,Promise.resolve(e.moduleSource))),i.linkSets.length&&i.linkSets[0].loads[0].name==i.name))return i.linkSets[0].done.then(function(){t(i)});var p=i||o(a);p.metadata=e.moduleMetadata;var h=f(r,p);r.loads.push(p),t(h.done),"locate"==s?l(r,p):"fetch"==s?u(r,p,Promise.resolve(e.moduleAddress)):(p.address=e.moduleAddress,d(r,p,Promise.resolve(e.moduleSource)))}}function f(e,t){var n={loader:e,loads:[],startingLoad:t,loadingCount:0};return n.done=new Promise(function(e,t){n.resolve=e,n.reject=t}),m(n,t),n}function m(e,t){if("failed"!=t.status){for(var n=0,r=e.loads.length;r>n;n++)if(e.loads[n]==t)return;e.loads.push(t),t.linkSets.push(e),"loaded"!=t.status&&e.loadingCount++;for(var a=e.loader,n=0,r=t.dependencies.length;r>n;n++)if(t.dependencies[n]){var o=t.dependencies[n].value;if(!a.modules[o])for(var s=0,i=a.loads.length;i>s;s++)if(a.loads[s].name==o){m(e,a.loads[s]);break}}}}function p(e){var t=!1;try{w(e,function(n,r){g(e,n,r),t=!0})}catch(n){g(e,null,n),t=!0}return t}function h(e,t){if(e.loadingCount--,!(e.loadingCount>0)){var n=e.startingLoad;if(e.loader.loaderObj.execute===!1){for(var r=[].concat(e.loads),a=0,o=r.length;o>a;a++){var t=r[a];t.module=t.isDeclarative?{name:t.name,module:_({}),evaluated:!0}:{module:_({})},t.status="linked",v(e.loader,t)}return e.resolve(n)}var s=p(e);s||e.resolve(n)}}function g(e,n,r){var a=e.loader;e:if(n)if(e.loads[0].name==n.name)r=t(r,"Error loading "+n.name);else{for(var o=0;o<e.loads.length;o++)for(var s=e.loads[o],i=0;i<s.dependencies.length;i++){var l=s.dependencies[i];if(l.value==n.name){r=t(r,"Error loading "+n.name+\' as "\'+l.key+\'" from \'+s.name);break e}}r=t(r,"Error loading "+n.name+" from "+e.loads[0].name)}else r=t(r,"Error linking "+e.loads[0].name);for(var u=e.loads.concat([]),o=0,d=u.length;d>o;o++){var n=u[o];a.loaderObj.failed=a.loaderObj.failed||[],-1==I.call(a.loaderObj.failed,n)&&a.loaderObj.failed.push(n);var c=I.call(n.linkSets,e);if(n.linkSets.splice(c,1),0==n.linkSets.length){var f=I.call(e.loader.loads,n);-1!=f&&e.loader.loads.splice(f,1)}}e.reject(r)}function v(e,t){if(e.loaderObj.trace){e.loaderObj.loads||(e.loaderObj.loads={});var n={};t.dependencies.forEach(function(e){n[e.key]=e.value}),e.loaderObj.loads[t.name]={name:t.name,deps:t.dependencies.map(function(e){return e.key}),depMap:n,address:t.address,metadata:t.metadata,source:t.source,kind:t.isDeclarative?"declarative":"dynamic"}}t.name&&(e.modules[t.name]=t.module);var r=I.call(e.loads,t);-1!=r&&e.loads.splice(r,1);for(var a=0,o=t.linkSets.length;o>a;a++)r=I.call(t.linkSets[a].loads,t),-1!=r&&t.linkSets[a].loads.splice(r,1);t.linkSets.splice(0,t.linkSets.length)}function y(e,t,n){try{var a=t.execute()}catch(o){return void n(t,o)}return a&&a instanceof r?a:void n(t,new TypeError("Execution must define a Module instance"))}function b(e,t,n){var r=e._loader.importPromises;return r[t]=n.then(function(e){return r[t]=void 0,e},function(e){throw r[t]=void 0,e})}function w(e,t){var n=e.loader;if(e.loads.length)for(var r=e.loads.concat([]),a=0;a<r.length;a++){var o=r[a],s=y(e,o,t);if(!s)return;o.module={name:o.name,module:s},o.status="linked",v(n,o)}}function x(e,t){return t.module.module}function S(){}function E(){throw new TypeError("ES6 transpilation is only provided in the dev module loader build.")}var j=0;a.prototype={constructor:a,define:function(e,t,n){if(this._loader.importPromises[e])throw new TypeError("Module is already loading.");return b(this,e,new Promise(c({step:"translate",loader:this._loader,moduleName:e,moduleMetadata:n&&n.metadata||{},moduleSource:t,moduleAddress:n&&n.address})))},"delete":function(e){var t=this._loader;return delete t.importPromises[e],delete t.moduleRecords[e],t.modules[e]?delete t.modules[e]:!1},get:function(e){return this._loader.modules[e]?(S(this._loader.modules[e],[],this),this._loader.modules[e].module):void 0},has:function(e){return!!this._loader.modules[e]},"import":function(e,t,n){"object"==typeof t&&(t=t.name);var r=this;return Promise.resolve(r.normalize(e,t)).then(function(e){var t=r._loader;return t.modules[e]?(S(t.modules[e],[],t._loader),t.modules[e].module):t.importPromises[e]||b(r,e,s(t,e,{}).then(function(n){return delete t.importPromises[e],x(t,n)}))})},load:function(e){var t=this._loader;return t.modules[e]?Promise.resolve():t.importPromises[e]||b(this,e,new Promise(c({step:"locate",loader:t,moduleName:e,moduleMetadata:{},moduleSource:void 0,moduleAddress:void 0})).then(function(){delete t.importPromises[e]}))},module:function(e,t){var n=o();n.address=t&&t.address;var r=f(this._loader,n),a=Promise.resolve(e),s=this._loader,i=r.done.then(function(){return x(s,n)});return d(s,n,a),i},newModule:function(e){if("object"!=typeof e)throw new TypeError("Expected object");var t=new r,n=[];if(Object.getOwnPropertyNames&&null!=e)n=Object.getOwnPropertyNames(e);else for(var a in e)n.push(a);for(var o=0;o<n.length;o++)(function(n){z(t,n,{configurable:!1,enumerable:!0,get:function(){return e[n]},set:function(){throw new Error("Module exports cannot be changed externally.")}})})(n[o]);return Object.freeze&&Object.freeze(t),t},set:function(e,t){if(!(t instanceof r))throw new TypeError("Loader.set("+e+", module) must be a module");this._loader.modules[e]={module:t}},normalize:function(e,t,n){return e},locate:function(e){return e.name},fetch:function(e){},translate:function(e){return e.source},instantiate:function(e){}};var _=a.prototype.newModule}();var D;i.prototype=a.prototype,o.prototype=new i;var T;if("undefined"!=typeof XMLHttpRequest)T=function(e,t,n,r){function a(){n(s.responseText)}function o(){r(new Error("XHR error"+(s.status?" ("+s.status+(s.statusText?" "+s.statusText:"")+")":"")+" loading "+e))}var s=new XMLHttpRequest,i=!0,l=!1;if(!("withCredentials"in s)){var u=/^(\\w+:)?\\/\\/([^\\/]+)/.exec(e);u&&(i=u[2]===window.location.host,u[1]&&(i&=u[1]===window.location.protocol))}i||"undefined"==typeof XDomainRequest||(s=new XDomainRequest,s.onload=a,s.onerror=o,s.ontimeout=o,s.onprogress=function(){},s.timeout=0,l=!0),s.onreadystatechange=function(){4===s.readyState&&(0==s.status?s.responseText?a():(s.addEventListener("error",o),s.addEventListener("load",a)):200===s.status?a():o())},s.open("GET",e,!0),s.setRequestHeader&&(s.setRequestHeader("Accept","application/x-es-module, */*"),t&&("string"==typeof t&&s.setRequestHeader("Authorization",t),s.withCredentials=!0)),l?setTimeout(function(){s.send()},0):s.send(null)};else if("undefined"!=typeof require&&"undefined"!=typeof process){var q;T=function(e,t,n,r){if("file:///"!=e.substr(0,8))throw new Error(\'Unable to fetch "\'+e+\'". Only file URLs of the form file:/// allowed running in Node.\');return q=q||require("fs"),e=M?e.replace(/\\//g,"\\\\").substr(8):e.substr(7),q.readFile(e,function(e,t){if(e)return r(e);var a=t+"";"\\ufeff"===a[0]&&(a=a.substr(1)),n(a)})}}else{if("undefined"==typeof self||"undefined"==typeof self.fetch)throw new TypeError("No environment fetch API available.");T=function(e,t,n,r){var a={headers:{Accept:"application/x-es-module, */*"}};t&&("string"==typeof t&&(a.headers.Authorization=t),a.credentials="include"),fetch(e,a).then(function(e){if(e.ok)return e.text();throw new Error("Fetch error: "+e.status+" "+e.statusText)}).then(n,r)}}o.prototype.fetch=function(e){return new Promise(function(t,n){T(e.address,void 0,t,n)})};(function(){function t(t){var r=this;return Promise.resolve(e["typescript"==r.transpiler?"ts":r.transpiler]||(r.pluginLoader||r)["import"](r.transpiler)).then(function(e){e.__useDefault&&(e=e["default"]);var a;return a=e.Compiler?n:e.createLanguageService?s:o,"(function(__moduleName){"+a.call(r,t,e)+\'\\n})("\'+t.name+\'");\\n//# sourceURL=\'+t.address+"!transpiled"})}function n(e,t){var n=this.traceurOptions||{};n.modules="instantiate",n.script=!1,void 0===n.sourceMaps&&(n.sourceMaps="inline"),n.filename=e.address,n.inputSourceMap=e.metadata.sourceMap,n.moduleName=!1;var a=new t.Compiler(n);return r(e.source,a,n.filename)}function r(e,t,n){try{return t.compile(e,n)}catch(r){if(r.length)throw r[0];throw r}}function o(e,t){var n=this.babelOptions||{};return n.modules="system",void 0===n.sourceMap&&(n.sourceMap="inline"),n.inputSourceMap=e.metadata.sourceMap,n.filename=e.address,n.code=!0,n.ast=!1,t.transform(e.source,n).code}function s(e,t){var n=this.typescriptOptions||{};return n.target=n.target||t.ScriptTarget.ES5,void 0===n.sourceMap&&(n.sourceMap=!0),n.sourceMap&&n.inlineSourceMap!==!1&&(n.inlineSourceMap=!0),n.module=t.ModuleKind.System,t.transpile(e.source,n,e.address)}return a.prototype.transpiler="traceur",t})();u.prototype=o.prototype,l.prototype=new u,l.prototype.constructor=l,l.prototype.instantiate=function(){};var J,C=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(U){C=!1}var N,$=["main","format","defaultExtension","meta","map","basePath","depCache"];!function(){function n(e){var t=e.source.lastIndexOf("\\n"),n="global"!=e.metadata.format,r=e.metadata.sourceMap;if(r){if("object"!=typeof r)throw new TypeError("load.metadata.sourceMap must be set to an object.");r=JSON.stringify(r)}return(n?"(function(System, SystemJS, require) {":"")+e.source+(n?"\\n})(System, System);":"")+("\\n//# sourceURL="!=e.source.substr(t,15)?"\\n//# sourceURL="+e.address+(r?"!transpiled":""):"")+(r&&i&&"\\n//# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(r)))||"")}function r(t,n){s=n,0==u++&&(l=e.System),e.System=e.SystemJS=t}function a(){0==--u&&(e.System=e.SystemJS=l),s=void 0}function o(e){m||(m=document.head||document.body||document.documentElement);var o=document.createElement("script");o.text=n(e,!1);var s,i=window.onerror;if(window.onerror=function(n){s=t(n,"Evaluating "+e.address)},r(this,e),e.metadata.integrity&&o.setAttribute("integrity",e.metadata.integrity),e.metadata.nonce&&o.setAttribute("nonce",e.metadata.nonce),m.appendChild(o),m.removeChild(o),a(),window.onerror=i,s)throw s}var s,i="undefined"!=typeof btoa;d("pushRegister_",function(){return function(e){return s?(this.reduceRegister_(s,e),!0):!1}});var l,u=0;N=function(e){if(e.source){if((e.metadata.integrity||e.metadata.nonce)&&c)return o.call(this,e);try{r(this,e),s=e,(0,eval)(n(e)),a()}catch(i){throw a(),t(i,"Evaluating "+e.address)}}};var c=!1;if(O&&"undefined"!=typeof document&&document.getElementsByTagName){var f=document.getElementsByTagName("script");$__curScript=f[f.length-1],window.chrome&&window.chrome.extension||navigator.userAgent.match(/^Node\\.js/)||(c=!0)}var m}();var B=/^[^\\/]+:\\/\\//,H={},X=new F(L);c(function(e){return function(){e.call(this),this.baseURL=L.substr(0,L.lastIndexOf("/")+1),this.map={},this.paths={},this.warnings=!1,this.defaultJSExtensions=!1,this.pluginFirst=!1,this.loaderErrorStack=!1,this.set("@empty",this.newModule({})),w.call(this,!1)}}),"undefined"==typeof require||"undefined"==typeof process||process.browser||(l.prototype._nodeRequire=require);var Z=["assert","buffer","child_process","cluster","console","constants","crypto","dgram","dns","domain","events","fs","http","https","module","net","os","path","process","punycode","querystring","readline","repl","stream","string_decoder","sys","timers","tls","tty","url","util","vm","zlib"];d("normalize",function(e){return function(e,t,n){var r=j.call(this,e,t);return n||!this.defaultJSExtensions||".js"==r.substr(r.length-3,3)||x(r)||(r+=".js"),r}});var G="undefined"!=typeof XMLHttpRequest;d("locate",function(e){return function(t){return Promise.resolve(e.call(this,t)).then(function(e){return G?e.replace(/#/g,"%23"):e})}}),d("fetch",function(){return function(e){return new Promise(function(t,n){T(e.address,e.metadata.authorization,t,n)})}}),d("import",function(e){return function(t,n,r){return n&&n.name&&g.call(this,"SystemJS.import(name, { name: parentName }) is deprecated for SystemJS.import(name, parentName), while importing "+t+" from "+n.name),e.call(this,t,n,r).then(function(e){return e.__useDefault?e["default"]:e})}}),d("translate",function(e){return function(t){return"detect"==t.metadata.format&&(t.metadata.format=void 0),e.call(this,t)}}),d("instantiate",function(e){return function(e){if("json"==e.metadata.format&&!this.builder){var t=e.metadata.entry=k();t.deps=[],t.execute=function(){try{return JSON.parse(e.source)}catch(t){throw new Error("Invalid JSON file "+e.name)}}}}}),l.prototype.env="development";var W;l.prototype.config=function(e){function t(e){for(var t in e)if(hasOwnProperty.call(e,t))return!0}var n=this;if("loaderErrorStack"in e&&(W=$__curScript,e.loaderErrorStack?$__curScript=void 0:$__curScript=W),"warnings"in e&&(n.warnings=e.warnings),e.transpilerRuntime===!1&&(n._loader.loadedTranspilerRuntime=!0),e.baseURL){if(t(n.packages)||t(n.meta)||t(n.depCache)||t(n.bundles)||t(n.packageConfigPaths))throw new TypeError("Incorrect configuration order. The baseURL must be configured with the first SystemJS.config call.");n.baseURL=e.baseURL,y.call(n)}if(e.defaultJSExtensions&&(n.defaultJSExtensions=e.defaultJSExtensions,g.call(n,"The defaultJSExtensions configuration option is deprecated, use packages configuration instead.")),e.pluginFirst&&(n.pluginFirst=e.pluginFirst),e.production&&w.call(n,!0),e.paths)for(var r in e.paths)n.paths[r]=e.paths[r];if(e.map){var a="";for(var r in e.map){var o=e.map[r];if("string"!=typeof o){a+=(a.length?", ":"")+\'"\'+r+\'"\';var s=n.defaultJSExtensions&&".js"!=r.substr(r.length-3,3),i=n.decanonicalize(r);s&&".js"==i.substr(i.length-3,3)&&(i=i.substr(0,i.length-3));var l="";for(var u in n.packages)i.substr(0,u.length)==u&&(!i[u.length]||"/"==i[u.length])&&l.split("/").length<u.split("/").length&&(l=u);l&&n.packages[l].main&&(i=i.substr(0,i.length-n.packages[l].main.length-1));var u=n.packages[i]=n.packages[i]||{};u.map=o}else n.map[r]=o}a&&g.call(n,"The map configuration for "+a+\' uses object submaps, which is deprecated in global map.\\nUpdate this to use package contextual map with configs like SystemJS.config({ packages: { "\'+r+\'": { map: {...} } } }).\')}if(e.packageConfigPaths){for(var d=[],c=0;c<e.packageConfigPaths.length;c++){var f=e.packageConfigPaths[c],m=Math.max(f.lastIndexOf("*")+1,f.lastIndexOf("/")),s=n.defaultJSExtensions&&".js"!=f.substr(m-3,3),p=n.decanonicalize(f.substr(0,m));s&&".js"==p.substr(p.length-3,3)&&(p=p.substr(0,p.length-3)),d[c]=p+f.substr(m)}n.packageConfigPaths=d}if(e.bundles)for(var r in e.bundles){for(var v=[],c=0;c<e.bundles[r].length;c++){var s=n.defaultJSExtensions&&".js"!=e.bundles[r][c].substr(e.bundles[r][c].length-3,3),b=n.decanonicalize(e.bundles[r][c]);s&&".js"==b.substr(b.length-3,3)&&(b=b.substr(0,b.length-3)),v.push(b)}n.bundles[r]=v}if(e.packages)for(var r in e.packages){if(r.match(/^([^\\/]+:)?\\/\\/$/))throw new TypeError(\'"\'+r+\'" is not a valid package name.\');var i=j.call(n,r);"/"==i[i.length-1]&&(i=i.substr(0,i.length-1)),n.packages[i]=n.packages[i]||{};var u=e.packages[r];u.modules&&(g.call(n,"Package "+r+\' is configured with "modules", which is deprecated as it has been renamed to "meta".\'),u.meta=u.modules,delete u.modules),"object"==typeof u.main&&(u.map=u.map||{},u.map["./@main"]=u.main,u.main["default"]=u.main["default"]||"./",u.main="@main");for(var S in u)-1==I.call($,S)&&g.call(n,\'"\'+S+\'" is not a valid package configuration option in package \'+r);h(n.packages[i],u)}for(var E in e){var o=e[E];if("baseURL"!=E&&"map"!=E&&"packages"!=E&&"bundles"!=E&&"paths"!=E&&"warnings"!=E&&"packageConfigPaths"!=E&&"loaderErrorStack"!=E)if("object"!=typeof o||o instanceof Array)n[E]=o;else{n[E]=n[E]||{};for(var r in o)if("meta"==E&&"*"==r[0])n[E][r]=o[r];else if("meta"==E){var _=j.call(n,r);n.defaultJSExtensions&&".js"!=_.substr(_.length-3,3)&&!x(_)&&(_+=".js"),n[E][_]=o[r]}else if("depCache"==E){var s=n.defaultJSExtensions&&".js"!=r.substr(r.length-3,3),i=n.decanonicalize(r);s&&".js"==i.substr(i.length-3,3)&&(i=i.substr(0,i.length-3)),n[E][i]=o[r]}else n[E][r]=o[r]}}},function(){function e(e,t){var n,r,a=0;for(var o in e.packages)t.substr(0,o.length)!==o||t.length!==o.length&&"/"!==t[o.length]||(r=o.split("/").length,r>a&&(n=o,a=r));return n}function t(e,t,n,r,a){if(!r||"/"==r[r.length-1]||a||t.defaultExtension===!1)return r;if(r.match(interpolationRegEx))return r;var o=!1;if(t.meta&&p(t.meta,r,function(e,t,n){return 0==n||e.lastIndexOf("*")!=e.length-1?o=!0:void 0}),!o&&e.meta&&p(e.meta,n+"/"+r,function(e,t,n){return 0==n||e.lastIndexOf("*")!=e.length-1?o=!0:void 0}),o)return r;var s="."+(t.defaultExtension||"js");return r.substr(r.length-s.length)!=s?r+s:r}function n(e,n,r,o,s){if(!o){if(!n.main)return r+(e.defaultJSExtensions?".js":"");o="./"==n.main.substr(0,2)?n.main.substr(2):n.main}if(n.map){var i="./"+o,l=b(n.map,i);if(l||(i="./"+t(e,n,r,o,s),i!="./"+o&&(l=b(n.map,i))),l)return a(e,n,r,l,i,s)}return r+"/"+t(e,n,r,o,s)}function r(e,t,n){if("."==e)throw new Error("Package "+n+\' has a map entry for "." which is not permitted.\');if(t.substr(0,e.length)==e&&"/"!=e[e.length-1]&&"/"==t[e.length])throw new Error("Package "+n+\' has a recursive map for "\'+e+\'" which is not permitted.\')}function a(e,n,a,o,s,i){var l=n.map[o];if("object"==typeof l)throw new Error("Synchronous conditional normalization not supported sync normalizing "+o+" in "+a);if(r(o,l,a),"string"!=typeof l&&(l=o=s),r(o,l,a),"."==l)l=a;else if("./"==l.substr(0,2))return a+"/"+t(e,n,a,l.substr(2)+s.substr(o.length),i);return e.normalizeSync(l+s.substr(o.length),a+"/")}function o(e,n,r,a,o){if(!a){if(!n.main)return Promise.resolve(r+(e.defaultJSExtensions?".js":""));a="./"==n.main.substr(0,2)?n.main.substr(2):n.main}var s,l;return n.map&&(s="./"+a,l=b(n.map,s),l||(s="./"+t(e,n,r,a,o),s!="./"+a&&(l=b(n.map,s)))),(l?i(e,n,r,l,s,o):Promise.resolve()).then(function(s){return s?Promise.resolve(s):Promise.resolve(r+"/"+t(e,n,r,a,o))})}function s(e,n,r,a,o,s,i){if("."==o)o=r;else if("./"==o.substr(0,2))return Promise.resolve(r+"/"+t(e,n,r,o.substr(2)+s.substr(a.length),i)).then(function(t){return interpolateConditional.call(e,t,r+"/")});return e.normalize(o+s.substr(a.length),r+"/")}function i(e,t,n,a,o,i){var l=t.map[a];return"string"==typeof l?(r(a,l,n),s(e,t,n,a,l,o,i)):e.builder?Promise.resolve(n+"/#:"+o):e["import"](t.map["@env"]||"@system-env",n).then(function(e){for(var t in l){var n="~"==t[0],r=v(n?t.substr(1):t,e);if(!n&&r||n&&!r)return l[t]}}).then(function(l){if(l){if("string"!=typeof l)throw new Error("Unable to map a package conditional to a package conditional.");return r(a,l,n),s(e,t,n,a,l,o,i)}})}function u(e){var t=e.lastIndexOf("*"),n=Math.max(t+1,e.lastIndexOf("/"));return{length:n,regEx:new RegExp("^("+e.substr(0,n).replace(/[.+?^${}()|[\\]\\\\]/g,"\\\\$&").replace(/\\*/g,"[^\\\\/]+")+")(\\\\/|$)"),wildcard:-1!=t}}function f(e,t){for(var n,r,a=!1,o=0;o<e.packageConfigPaths.length;o++){var s=e.packageConfigPaths[o],i=y[s]||(y[s]=u(s));if(!(t.length<i.length)){var l=t.match(i.regEx);!l||n&&(a&&i.wildcard||!(n.length<l[1].length))||(n=l[1],a=!i.wildcard,r=n+s.substr(i.length))}}return n?{packageName:n,configPath:r}:void 0}function m(e,t,n){var r=e.pluginLoader||e;return(r.meta[n]=r.meta[n]||{}).format="json",r.load(n).then(function(){var a=r.get(n)["default"];a.systemjs&&(a=a.systemjs),a.modules&&(a.meta=a.modules,g.call(e,"Package config file "+n+\' is configured with "modules", which is deprecated as it has been renamed to "meta".\'));for(var o in a)-1==I.call($,o)&&delete a[o];var s=e.packages[t]=e.packages[t]||{};if(h(s,a,!0),a.depCache){for(var i in a.depCache){var l;l="./"==i.substr(0,2)?t+"/"+i.substr(2):j.call(e,i),e.depCache[l]=(e.depCache[l]||[]).concat(a.depCache[i])}delete a.depCache}return"object"==typeof s.main&&(s.map=s.map||{},s.map["./@main"]=s.main,s.main["default"]=s.main["default"]||"./",s.main="@main"),s})}function p(e,t,n){var r;for(var a in e){var o="./"==a.substr(0,2)?"./":"";if(o&&(a=a.substr(2)),r=a.indexOf("*"),-1!==r&&a.substr(0,r)==t.substr(0,r)&&a.substr(r+1)==t.substr(t.length-a.length+r+1)&&n(a,e[o+a],a.split("/").length))return}var s=e[t]&&e.hasOwnProperty&&e.hasOwnProperty(t)?e[t]:e["./"+t];s&&n(s,s,0)}c(function(e){return function(){e.call(this),this.packages={},this.packageConfigPaths=[]}}),l.prototype.normalizeSync=l.prototype.decanonicalize=l.prototype.normalize,d("decanonicalize",function(t){return function(n,r){if(this.builder)return t.call(this,n,r,!0);var a=t.call(this,n,r);if(!this.defaultJSExtensions)return a;var o=e(this,a),s=this.packages[o],i=s&&s.defaultExtension;return void 0==i&&s&&s.meta&&p(s.meta,a.substr(o),function(e,t,n){return 0==n||e.lastIndexOf("*")!=e.length-1?(i=!1,!0):void 0}),(i===!1||i&&".js"!=i)&&".js"!=n.substr(n.length-3,3)&&".js"==a.substr(a.length-3,3)&&(a=a.substr(0,a.length-3)),a}}),d("normalizeSync",function(t){return function(r,o,s){g.call(this,"SystemJS.normalizeSync has been deprecated for SystemJS.decanonicalize.");var i=this;if(s=s===!0,o)var l=e(i,o)||i.defaultJSExtensions&&".js"==o.substr(o.length-3,3)&&e(i,o.substr(0,o.length-3));var u=l&&i.packages[l];if(u&&"."!=r[0]){var d=u.map,c=d&&b(d,r);if(c&&"string"==typeof d[c])return a(i,u,l,c,r,s)}var m=i.defaultJSExtensions&&".js"!=r.substr(r.length-3,3),p=t.call(i,r,o);m&&".js"!=p.substr(p.length-3,3)&&(m=!1),m&&(p=p.substr(0,p.length-3));var h=f(i,p),v=h&&h.packageName||e(i,p);if(!v)return p+(m?".js":"");var y=p.substr(v.length+1);return n(i,i.packages[v]||{},v,y,s)}}),d("normalize",function(t){return function(n,r,a){var s=this;return a=a===!0,Promise.resolve().then(function(){if(r)var t=e(s,r)||s.defaultJSExtensions&&".js"==r.substr(r.length-3,3)&&e(s,r.substr(0,r.length-3));var o=t&&s.packages[t];if(o&&"./"!=n.substr(0,2)){var l=o.map,u=l&&b(l,n);if(u)return i(s,o,t,u,n,a)}return Promise.resolve()}).then(function(i){if(i)return i;var l=s.defaultJSExtensions&&".js"!=n.substr(n.length-3,3),u=t.call(s,n,r);l&&".js"!=u.substr(u.length-3,3)&&(l=!1),l&&(u=u.substr(0,u.length-3));var d=f(s,u),c=d&&d.packageName||e(s,u);if(!c)return Promise.resolve(u+(l?".js":""));var p=s.packages[c],h=p&&(p.configured||!d);return(h?Promise.resolve(p):m(s,c,d.configPath)).then(function(e){var t=u.substr(c.length+1);return o(s,e,c,t,a)})})}});var y={};d("locate",function(t){return function(n){var r=this;return Promise.resolve(t.call(this,n)).then(function(t){var a=e(r,n.name);if(a){var o=r.packages[a],s=n.name.substr(a.length+1);o.format&&(n.metadata.format=n.metadata.format||o.format);var i={};if(o.meta){var l=0;p(o.meta,s,function(e,t,n){n>l&&(l=n),h(i,t,n&&l>n)}),h(n.metadata,i)}}return t})}})}(),function(){function t(){if(s&&"interactive"===s.script.readyState)return s.load;for(var e=0;e<u.length;e++)if("interactive"==u[e].script.readyState)return s=u[e],s.load}function n(e,t){return new Promise(function(e,n){t.metadata.integrity&&n(new Error("Subresource integrity checking is not supported in web workers.")),i=t;try{importScripts(t.address)}catch(r){i=null,n(r)}i=null,t.metadata.entry||n(new Error(t.address+" did not call System.register or AMD define")),e("")})}if("undefined"!=typeof document)var r=document.getElementsByTagName("head")[0];var a,o,s,i=null,l=r&&function(){var e=document.createElement("script"),t="undefined"!=typeof opera&&"[object Opera]"===opera.toString();return e.attachEvent&&!(e.attachEvent.toString&&e.attachEvent.toString().indexOf("[native code")<0)&&!t}(),u=[],c=0,f=[];d("pushRegister_",function(e){return function(n){return e.call(this,n)?!1:(i?this.reduceRegister_(i,n):l?this.reduceRegister_(t(),n):c?f.push(n):this.reduceRegister_(null,n),!0)}}),d("fetch",function(t){return function(i){var d=this;return"json"!=i.metadata.format&&i.metadata.scriptLoad&&(O||R)?R?n(d,i):new Promise(function(t,n){function m(e){if(!g.readyState||"loaded"==g.readyState||"complete"==g.readyState){\r\nif(c--,i.metadata.entry||f.length){if(!l){for(var r=0;r<f.length;r++)d.reduceRegister_(i,f[r]);f=[]}}else d.reduceRegister_(i);h(),i.metadata.entry||i.metadata.bundle||n(new Error(i.name+" did not call System.register or AMD define. If loading a global module configure the global name via the meta exports property for script injection support.")),t("")}}function p(e){h(),n(new Error("Unable to load script "+i.address))}function h(){if(e.System=a,e.require=o,g.detachEvent){g.detachEvent("onreadystatechange",m);for(var t=0;t<u.length;t++)u[t].script==g&&(s&&s.script==g&&(s=null),u.splice(t,1))}else g.removeEventListener("load",m,!1),g.removeEventListener("error",p,!1);r.removeChild(g)}var g=document.createElement("script");g.async=!0,i.metadata.crossOrigin&&(g.crossOrigin=i.metadata.crossOrigin),i.metadata.integrity&&g.setAttribute("integrity",i.metadata.integrity),l?(g.attachEvent("onreadystatechange",m),u.push({script:g,load:i})):(g.addEventListener("load",m,!1),g.addEventListener("error",p,!1)),c++,a=e.System,o=e.require,g.src=i.address,r.appendChild(g)}):t.call(this,i)}})}();var V=/^(\\s*\\/\\*[^\\*]*(\\*(?!\\/)[^\\*]*)*\\*\\/|\\s*\\/\\/[^\\n]*|\\s*"[^"]+"\\s*;?|\\s*\'[^\']+\'\\s*;?)*\\s*/;!function(){function t(e,n,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==I.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var a=0,o=e.normalizedDeps.length;o>a;a++){var s=e.normalizedDeps[a],i=n.defined[s];if(i&&!i.evaluated){var l=e.groupIndex+(i.declarative!=e.declarative);if(null===i.groupIndex||i.groupIndex<l){if(null!==i.groupIndex&&(r[i.groupIndex].splice(I.call(r[i.groupIndex],i),1),0==r[i.groupIndex].length))throw new Error("Mixed dependency cycle detected");i.groupIndex=l}t(i,n,r)}}}}function n(e,n){var r=n.defined[e];if(!r.module){r.groupIndex=0;var a=[];t(r,n,a);for(var o=!!r.declarative==a.length%2,i=a.length-1;i>=0;i--){for(var l=a[i],d=0;d<l.length;d++){var c=l[d];o?s(c,n):u(c,n)}o=!o}}}function a(){}function o(e,t){return t[e]||(t[e]={name:e,dependencies:[],exports:new a,importers:[]})}function s(t,n){if(!t.module){var r=n._loader.moduleRecords,a=t.module=o(t.name,r),i=t.module.exports,l=t.declare.call(e,function(e,t){if(a.locked=!0,"object"==typeof e)for(var n in e)i[n]=e[n];else i[e]=t;for(var r=0,o=a.importers.length;o>r;r++){var s=a.importers[r];if(!s.locked){var l=I.call(s.dependencies,a);s.setters[l](i)}}return a.locked=!1,t},{id:t.name});if(a.setters=l.setters,a.execute=l.execute,!a.setters||!a.execute)throw new TypeError("Invalid System.register form for "+t.name);for(var u=0,d=t.normalizedDeps.length;d>u;u++){var c,f=t.normalizedDeps[u],m=n.defined[f],p=r[f];p?c=p.exports:m&&!m.declarative?c=m.esModule:m?(s(m,n),p=m.module,c=p.exports):c=n.get(f),p&&p.importers?(p.importers.push(a),a.dependencies.push(p)):a.dependencies.push(null);for(var h=t.originalIndices[u],g=0,v=h.length;v>g;++g){var y=h[g];a.setters[y]&&a.setters[y](c)}}}}function i(e,t){var n,r=t.defined[e];if(r)r.declarative?p(e,[],t):r.evaluated||u(r,t),n=r.module.exports;else if(n=t.get(e),!n)throw new Error("Unable to load dependency "+e+".");return(!r||r.declarative)&&n&&n.__useDefault?n["default"]:n}function u(t,n){if(!t.module){var a={},o=t.module={exports:a,id:t.name};if(!t.executingRequire)for(var s=0,l=t.normalizedDeps.length;l>s;s++){var d=t.normalizedDeps[s],c=n.defined[d];c&&u(c,n)}t.evaluated=!0;var f=t.execute.call(e,function(e){for(var r=0,a=t.deps.length;a>r;r++)if(t.deps[r]==e)return i(t.normalizedDeps[r],n);var o=n.normalizeSync(e,t.name);if(-1!=I.call(t.normalizedDeps,o))return i(o,n);throw new Error("Module "+e+" not declared as a dependency of "+t.name)},a,o);f&&(o.exports=f),a=o.exports,a&&(a.__esModule||a instanceof r)?t.esModule=a:t.esmExports&&a!==e?t.esModule=m(a):t.esModule={"default":a}}}function p(t,n,r){var a=r.defined[t];if(a&&!a.evaluated&&a.declarative){n.push(t);for(var o=0,s=a.normalizedDeps.length;s>o;o++){var i=a.normalizedDeps[o];-1==I.call(n,i)&&(r.defined[i]?p(i,n,r):r.get(i))}a.evaluated||(a.evaluated=!0,a.module.execute.call(e))}}l.prototype.register=function(e,t,n){if("string"!=typeof e&&(n=t,t=e,e=null),"boolean"==typeof n)return this.registerDynamic.apply(this,arguments);var r=k();r.name=e&&(this.decanonicalize||this.normalize).call(this,e),r.declarative=!0,r.deps=t,r.declare=n,this.pushRegister_({amd:!1,entry:r})},l.prototype.registerDynamic=function(e,t,n,r){"string"!=typeof e&&(r=n,n=t,t=e,e=null);var a=k();a.name=e&&(this.decanonicalize||this.normalize).call(this,e),a.deps=t,a.execute=r,a.executingRequire=n,this.pushRegister_({amd:!1,entry:a})},d("reduceRegister_",function(){return function(e,t){if(t){var n=t.entry,r=e&&e.metadata;if(n.name&&(n.name in this.defined||(this.defined[n.name]=n),r&&(r.bundle=!0)),!n.name||e&&n.name==e.name){if(!r)throw new TypeError("Invalid System.register call. Anonymous System.register calls can only be made by modules loaded by SystemJS.import and not via script tags.");if(r.entry)throw"register"==r.format?new Error("Multiple anonymous System.register calls in module "+e.name+". If loading a bundle, ensure all the System.register calls are named."):new Error("Module "+e.name+" interpreted as "+r.format+" module format, but called System.register.");r.format||(r.format="register"),r.entry=n}}}}),c(function(e){return function(){e.call(this),this.defined={},this._loader.moduleRecords={}}}),z(a,"toString",{value:function(){return"Module"}}),d("delete",function(e){return function(t){return delete this._loader.moduleRecords[t],delete this.defined[t],e.call(this,t)}}),d("fetch",function(e){return function(t){return this.defined[t.name]?(t.metadata.format="defined",""):(t.metadata.deps=t.metadata.deps||[],e.call(this,t))}}),d("translate",function(e){return function(t){return t.metadata.deps=t.metadata.deps||[],Promise.resolve(e.call(this,t)).then(function(e){return("register"==t.metadata.format||!t.metadata.format&&_(t.source))&&(t.metadata.format="register"),e})}}),d("instantiate",function(e){return function(t){"detect"==t.metadata.format&&(t.metadata.format=void 0),e.call(this,t);var r,a=this;if(a.defined[t.name])r=a.defined[t.name],r.declarative||(r.deps=r.deps.concat(t.metadata.deps));else if(t.metadata.entry)r=t.metadata.entry,r.deps=r.deps.concat(t.metadata.deps);else if(!(a.builder&&t.metadata.bundle||"register"!=t.metadata.format&&"esm"!=t.metadata.format&&"es6"!=t.metadata.format)){if("undefined"!=typeof N&&N.call(a,t),!t.metadata.entry&&!t.metadata.bundle)throw new Error(t.name+" detected as "+t.metadata.format+" but didn\'t execute.");r=t.metadata.entry,r&&t.metadata.deps&&(r.deps=r.deps.concat(t.metadata.deps))}r||(r=k(),r.deps=t.metadata.deps,r.execute=function(){}),a.defined[t.name]=r;var o=f(r.deps);r.deps=o.names,r.originalIndices=o.indices,r.name=t.name,r.esmExports=t.metadata.esmExports!==!1;for(var s=[],i=0,l=r.deps.length;l>i;i++)s.push(Promise.resolve(a.normalize(r.deps[i],t.name)));return Promise.all(s).then(function(e){return r.normalizedDeps=e,{deps:r.deps,execute:function(){return n(t.name,a),p(t.name,[],a),a.defined[t.name]=void 0,a.newModule(r.declarative?r.module.exports:r.esModule)}}})}})}();var K="undefined"!=typeof self?"self":"global";d("fetch",function(e){return function(t){return t.metadata.exports&&!t.metadata.format&&(t.metadata.format="global"),e.call(this,t)}}),d("instantiate",function(e){return function(t){var n=this;if(t.metadata.format||(t.metadata.format="global"),"global"==t.metadata.format&&!t.metadata.registered){var r=k();t.metadata.entry=r,r.deps=[];for(var a in t.metadata.globals){var o=t.metadata.globals[a];o&&r.deps.push(o)}r.execute=function(e,r,a){var o;if(t.metadata.globals){o={};for(var s in t.metadata.globals)t.metadata.globals[s]&&(o[s]=e(t.metadata.globals[s]))}var i=t.metadata.exports;i&&(t.source+="\\n"+K+\'["\'+i+\'"] = \'+i+";");var l=n.get("@@global-helpers").prepareGlobal(a.id,i,o);try{N.call(n,t)}catch(u){throw l(),u}return l()}}return e.call(this,t)}}),d("reduceRegister_",function(e){return function(t,n){if(n||!t.metadata.exports)return e.call(this,t,n);t.metadata.format="global";var r=t.metadata.entry=k();r.deps=t.metadata.deps;var a=P(t.metadata.exports);r.execute=function(){return a}}}),c(function(t){return function(){function n(t){if(Object.keys)Object.keys(e).forEach(t);else for(var n in e)s.call(e,n)&&t(n)}function r(t){n(function(n){if(-1==I.call(i,n)){try{var r=e[n]}catch(a){i.push(n)}t(n,r)}})}var a=this;t.call(a);var o,s=Object.prototype.hasOwnProperty,i=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];a.set("@@global-helpers",a.newModule({prepareGlobal:function(t,n,a){var s=e.define;e.define=void 0;var i;if(a){i={};for(var l in a)i[l]=e[l],e[l]=a[l]}return n||(o={},r(function(e,t){o[e]=t})),function(){var t;if(n)t=P(n);else{t={};var a,l;r(function(e,n){o[e]!==n&&"undefined"!=typeof n&&(t[e]=n,"undefined"!=typeof a?l||a===n||(l=!0):a=n)}),t=l?t:a}if(i)for(var u in i)e[u]=i[u];return e.define=s,t}}}))}}),function(){function t(e){function t(e,t){for(var n=0;n<e.length;n++)if(e[n][0]<t.index&&e[n][1]>t.index)return!0;return!1}r.lastIndex=a.lastIndex=o.lastIndex=0;var n,s=[],i=[],l=[];if(e.length/e.split("\\n").length<200){for(;n=o.exec(e);)i.push([n.index,n.index+n[0].length]);for(;n=a.exec(e);)t(i,n)||l.push([n.index,n.index+n[0].length])}for(;n=r.exec(e);)if(!t(i,n)&&!t(l,n)){var u=n[1].substr(1,n[1].length-2);if(u.match(/"|\'/))continue;"/"==u[u.length-1]&&(u=u.substr(0,u.length-1)),s.push(u)}return s}var n=/(?:^\\uFEFF?|[^$_a-zA-Z\\xA0-\\uFFFF.])(exports\\s*(\\[[\'"]|\\.)|module(\\.exports|\\[\'exports\'\\]|\\["exports"\\])\\s*(\\[[\'"]|[=,\\.]))/,r=/(?:^\\uFEFF?|[^$_a-zA-Z\\xA0-\\uFFFF."\'])require\\s*\\(\\s*("[^"\\\\]*(?:\\\\.[^"\\\\]*)*"|\'[^\'\\\\]*(?:\\\\.[^\'\\\\]*)*\')\\s*\\)/g,a=/(^|[^\\\\])(\\/\\*([\\s\\S]*?)\\*\\/|([^:]|^)\\/\\/(.*)$)/gm,o=/("[^"\\\\\\n\\r]*(\\\\.[^"\\\\\\n\\r]*)*"|\'[^\'\\\\\\n\\r]*(\\\\.[^\'\\\\\\n\\r]*)*\')/g,s=/^\\#\\!.*/;d("instantiate",function(a){return function(o){var i=this;if(o.metadata.format||(n.lastIndex=0,r.lastIndex=0,(r.exec(o.source)||n.exec(o.source))&&(o.metadata.format="cjs")),"cjs"==o.metadata.format){var l=o.metadata.deps,u=o.metadata.cjsRequireDetection===!1?[]:t(o.source);for(var d in o.metadata.globals)o.metadata.globals[d]&&u.push(o.metadata.globals[d]);var c=k();o.metadata.entry=c,c.deps=u,c.executingRequire=!0,c.execute=function(t,n,r){function a(e){return"/"==e[e.length-1]&&(e=e.substr(0,e.length-1)),t.apply(this,arguments)}if(a.resolve=function(e){return i.get("@@cjs-helpers").requireResolve(e,r.id)},!o.metadata.cjsDeferDepsExecute)for(var u=0;u<l.length;u++)a(l[u]);var d=i.get("@@cjs-helpers").getPathVars(r.id),c={exports:n,args:[a,n,r,d.filename,d.dirname,e,e]},f="(function(require, exports, module, __filename, __dirname, global, GLOBAL";if(o.metadata.globals)for(var m in o.metadata.globals)c.args.push(a(o.metadata.globals[m])),f+=", "+m;var p=e.define;e.define=void 0,e.__cjsWrapper=c,o.source=f+") {"+o.source.replace(s,"")+"\\n}).apply(__cjsWrapper.exports, __cjsWrapper.args);",N.call(i,o),e.__cjsWrapper=void 0,e.define=p}}return a.call(i,o)}})}(),c(function(e){return function(){function t(e){return"file:///"==e.substr(0,8)?e.substr(7+!!M):r&&e.substr(0,r.length)==r?e.substr(r.length):e}var n=this;if(e.call(n),"undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var r=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");n.set("@@cjs-helpers",n.newModule({requireResolve:function(e,r){return t(n.normalizeSync(e,r))},getPathVars:function(e){var n,r=e.lastIndexOf("!");n=-1!=r?e.substr(0,r):e;var a=n.split("/");return a.pop(),a=a.join("/"),{filename:t(n),dirname:t(a)}}}))}}),d("fetch",function(t){return function(n){return n.metadata.scriptLoad&&O&&(e.define=this.amdDefine),t.call(this,n)}}),c(function(t){return function(){function n(e,t){e=e.replace(s,"");var n=e.match(u),r=(n[1].split(",")[t]||"require").replace(c,""),a=f[r]||(f[r]=new RegExp(i+r+l,"g"));a.lastIndex=0;for(var o,d=[];o=a.exec(e);)d.push(o[2]||o[3]);return d}function r(e,t,n,a){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof t&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var s=o.defaultJSExtensions&&".js"!=e.substr(e.length-3,3),i=o.decanonicalize(e,a);s&&".js"==i.substr(i.length-3,3)&&(i=i.substr(0,i.length-3));var l=o.get(i);if(!l)throw new Error(\'Module not already loaded loading "\'+e+\'" as \'+i+(a?\' from "\'+a+\'".\':"."));return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var u=[],d=0;d<e.length;d++)u.push(o["import"](e[d],a));Promise.all(u).then(function(e){t&&t.apply(null,e)},n)}function a(t,a,s){function i(t,n,i){function c(e,n,a){return"string"==typeof e&&"function"!=typeof n?t(e):r.call(o,e,n,a,i.id)}for(var f=[],m=0;m<a.length;m++)f.push(t(a[m]));i.uri=i.id,i.config=function(){},-1!=d&&f.splice(d,0,i),-1!=u&&f.splice(u,0,n),-1!=l&&(c.toUrl=function(e){var t=o.defaultJSExtensions&&".js"!=e.substr(e.length-3,3),n=o.decanonicalize(e,i.id);return t&&".js"==n.substr(n.length-3,3)&&(n=n.substr(0,n.length-3)),n},f.splice(l,0,c));var p=e.require;e.require=r;var h=s.apply(-1==u?e:n,f);return e.require=p,"undefined"==typeof h&&i&&(h=i.exports),"undefined"!=typeof h?h:void 0}"string"!=typeof t&&(s=a,a=t,t=null),a instanceof Array||(s=a,a=["require","exports","module"].splice(0,s.length)),"function"!=typeof s&&(s=function(e){return function(){return e}}(s)),void 0===a[a.length-1]&&a.pop();var l,u,d;-1!=(l=I.call(a,"require"))&&(a.splice(l,1),t||(a=a.concat(n(s.toString(),l)))),-1!=(u=I.call(a,"exports"))&&a.splice(u,1),-1!=(d=I.call(a,"module"))&&a.splice(d,1);var c=k();c.name=t&&(o.decanonicalize||o.normalize).call(o,t),c.deps=a,c.execute=i,o.pushRegister_({amd:!0,entry:c})}var o=this;t.call(this);var s=/(\\/\\*([\\s\\S]*?)\\*\\/|([^:]|^)\\/\\/(.*)$)/gm,i="(?:^|[^$_a-zA-Z\\\\xA0-\\\\uFFFF.])",l="\\\\s*\\\\(\\\\s*(\\"([^\\"]+)\\"|\'([^\']+)\')\\\\s*\\\\)",u=/\\(([^\\)]*)\\)/,c=/^\\s+|\\s+$/g,f={};a.amd={},d("reduceRegister_",function(e){return function(t,n){if(!n||!n.amd)return e.call(this,t,n);var r=t&&t.metadata,a=n.entry;if(r&&(r.format="amd"),a.name)r&&(r.entry||r.bundle?r.entry&&r.entry.name&&(r.entry=void 0):r.entry=a,r.bundle=!0),a.name in this.defined||(this.defined[a.name]=a);else{if(!r)throw new TypeError("Unexpected anonymous AMD define.");if(r.entry&&!r.entry.name)throw new Error("Multiple anonymous defines in module "+t.name);r.entry=a}}}),o.amdDefine=a,o.amdRequire=r}}),function(){var t=/(?:^\\uFEFF?|[^$_a-zA-Z\\xA0-\\uFFFF.])define\\s*\\(\\s*("[^"]+"\\s*,\\s*|\'[^\']+\'\\s*,\\s*)?\\s*(\\[(\\s*(("[^"]+"|\'[^\']+\')\\s*,|\\/\\/.*\\r?\\n|\\/\\*(.|\\s)*?\\*\\/))*(\\s*("[^"]+"|\'[^\']+\')\\s*,?)?(\\s*(\\/\\/.*\\r?\\n|\\/\\*(.|\\s)*?\\*\\/))*\\s*\\]|function\\s*|{|[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*\\))/;d("instantiate",function(n){return function(r){var a=this;if("amd"==r.metadata.format||!r.metadata.format&&r.source.match(t))if(r.metadata.format="amd",a.builder||a.execute===!1)r.metadata.execute=function(){return r.metadata.builderExecute.apply(this,arguments)};else{var o=e.define;e.define=this.amdDefine;try{N.call(a,r)}finally{e.define=o}if(!r.metadata.entry&&!r.metadata.bundle)throw new TypeError("AMD module "+r.name+" did not define")}return n.call(a,r)}})}(),function(){function e(e,t){if(t){var n;if(e.pluginFirst){if(-1!=(n=t.lastIndexOf("!")))return t.substr(n+1)}else if(-1!=(n=t.indexOf("!")))return t.substr(0,n);return t}}function t(e,t){var n,r,a=t.lastIndexOf("!");return-1!=a?(e.pluginFirst?(n=t.substr(a+1),r=t.substr(0,a)):(n=t.substr(0,a),r=t.substr(a+1)||n.substr(n.lastIndexOf(".")+1)),{argument:n,plugin:r}):void 0}function n(e,t,n,r){return r&&".js"==t.substr(t.length-3,3)&&(t=t.substr(0,t.length-3)),e.pluginFirst?n+"!"+t:t+"!"+n}function r(e,t){return e.defaultJSExtensions&&".js"!=t.substr(t.length-3,3)}function a(a){return function(o,s,i){var l=this;s=e(this,s);var u=t(l,o);if(!u)return a.call(this,o,s,i);var d=l.normalizeSync(u.argument,s,!0),c=l.normalizeSync(u.plugin,s,!0);return n(l,d,c,r(l,u.argument))}}d("decanonicalize",a),d("normalizeSync",a),d("normalize",function(a){return function(o,s,i){var l=this;s=e(this,s);var u=t(l,o);return u?Promise.all([l.normalize(u.argument,s,!0),l.normalize(u.plugin,s)]).then(function(e){return n(l,e[0],e[1],r(l,u.argument))}):a.call(l,o,s,i)}}),d("locate",function(e){return function(t){var n,r=this,a=t.name;return r.pluginFirst?-1!=(n=a.indexOf("!"))&&(t.metadata.loader=a.substr(0,n),t.name=a.substr(n+1)):-1!=(n=a.lastIndexOf("!"))&&(t.metadata.loader=a.substr(n+1),t.name=a.substr(0,n)),e.call(r,t).then(function(e){return-1==n&&t.metadata.loader?r.normalize(t.metadata.loader,t.name).then(function(n){return t.metadata.loader=n,e}):e}).then(function(e){var n=t.metadata.loader;if(!n)return e;if(t.name==n)throw new Error("Plugin "+n+" cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.");if(r.defined&&r.defined[a])return e;var o=r.pluginLoader||r;return o["import"](n).then(function(n){return t.metadata.loaderModule=n,t.address=e,n.locate?n.locate.call(r,t):e})})}}),d("fetch",function(e){return function(t){var n=this;return t.metadata.loaderModule&&t.metadata.loaderModule.fetch&&"defined"!=t.metadata.format?(t.metadata.scriptLoad=!1,t.metadata.loaderModule.fetch.call(n,t,function(t){return e.call(n,t)})):e.call(n,t)}}),d("translate",function(e){return function(t){var n=this;return t.metadata.loaderModule&&t.metadata.loaderModule.translate&&"defined"!=t.metadata.format?Promise.resolve(t.metadata.loaderModule.translate.call(n,t)).then(function(r){var a=t.metadata.sourceMap;if(a){if("object"!=typeof a)throw new Error("load.metadata.sourceMap must be set to an object.");var o=t.name.split("!")[0];a.file=o+"!transpiled",(!a.sources||a.sources.length<=1)&&(a.sources=[o])}return"string"==typeof r?t.source=r:g.call(this,"Plugin "+t.metadata.loader+" should return the source in translate, instead of setting load.source directly. This support will be deprecated."),e.call(n,t)}):e.call(n,t)}}),d("instantiate",function(e){return function(t){var n=this,r=!1;return t.metadata.loaderModule&&t.metadata.loaderModule.instantiate&&!n.builder&&"defined"!=t.metadata.format?Promise.resolve(t.metadata.loaderModule.instantiate.call(n,t,function(t){if(r)throw new Error("Instantiate must only be called once.");return r=!0,e.call(n,t)})).then(function(a){return r?a:(t.metadata.entry=k(),t.metadata.entry.execute=function(){return a},t.metadata.entry.deps=t.metadata.deps,t.metadata.format="defined",e.call(n,t))}):e.call(n,t)}})}(),function(){d("fetch",function(e){return function(t){var n=t.metadata.alias,r=t.metadata.deps||[];if(n){t.metadata.format="defined";var a=k();return this.defined[t.name]=a,a.declarative=!0,a.deps=r.concat([n]),a.declare=function(e){return{setters:[function(t){for(var n in t)e(n,t[n]);t.__useDefault&&(a.module.exports.__useDefault=!0)}],execute:function(){}}},""}return e.call(this,t)}})}(),function(){function e(e,t,n){for(var r,a=t.split(".");a.length>1;)r=a.shift(),e=e[r]=e[r]||{};r=a.shift(),r in e||(e[r]=n)}c(function(e){return function(){this.meta={},e.call(this)}}),d("locate",function(e){return function(t){var n,r=this.meta,a=t.name,o=0;for(var s in r)if(n=s.indexOf("*"),-1!==n&&s.substr(0,n)===a.substr(0,n)&&s.substr(n+1)===a.substr(a.length-s.length+n+1)){var i=s.split("/").length;i>o&&(o=i),h(t.metadata,r[s],o!=i)}return r[a]&&h(t.metadata,r[a]),e.call(this,t)}});var t=/^(\\s*\\/\\*[^\\*]*(\\*(?!\\/)[^\\*]*)*\\*\\/|\\s*\\/\\/[^\\n]*|\\s*"[^"]+"\\s*;?|\\s*\'[^\']+\'\\s*;?)+/,n=/\\/\\*[^\\*]*(\\*(?!\\/)[^\\*]*)*\\*\\/|\\/\\/[^\\n]*|"[^"]+"\\s*;?|\'[^\']+\'\\s*;?/g;d("translate",function(r){return function(a){var o=a.source.match(t);if(o)for(var s=o[0].match(n),i=0;i<s.length;i++){var l=s[i],u=l.length,d=l.substr(0,1);if(";"==l.substr(u-1,1)&&u--,\'"\'==d||"\'"==d){var c=l.substr(1,l.length-3),f=c.substr(0,c.indexOf(" "));if(f){var m=c.substr(f.length+1,c.length-f.length-1);"[]"==f.substr(f.length-2,2)?(f=f.substr(0,f.length-2),a.metadata[f]=a.metadata[f]||[],a.metadata[f].push(m)):a.metadata[f]instanceof Array?(g.call(this,"Module "+a.name+\' contains deprecated "deps \'+m+\'" meta syntax.\\nThis should be updated to "deps[] \'+m+\'" for pushing to array meta.\'),a.metadata[f].push(m)):e(a.metadata,f,m)}else a.metadata[c]=!0}}return r.call(this,a)}})}(),function(){c(function(e){return function(){e.call(this),this.depCache={}}}),d("locate",function(e){return function(t){var n=this,r=n.depCache[t.name];if(r)for(var a=0;a<r.length;a++)n["import"](r[a],t.name);return e.call(n,t)}})}(),D=new l,e.SystemJS=D,D.version="0.19.25 for SPFx","object"==typeof exports&&(module.exports=a),e.Reflect=e.Reflect||{},e.Reflect.Loader=e.Reflect.Loader||a,e.Reflect.global=e.Reflect.global||e,e.LoaderPolyfill=a,D||(D=new o,D.constructor=o),"object"==typeof exports&&(module.exports=D),e.System=D}("undefined"!=typeof self?self:global)}var t="undefined"==typeof Promise;if("undefined"!=typeof document){var n=document.getElementsByTagName("script");if($__curScript=n[n.length-1],t){var r=$__curScript.src,a=r.substr(0,r.lastIndexOf("/")+1);window.systemJSBootstrap=e,document.write(\'<script type="text/javascript" src="\'+a+\'system-polyfills.js"></script>\')}else e()}else if("undefined"!=typeof importScripts){var a="";try{throw new Error("_")}catch(o){o.stack.replace(/(?:at|@).*(http.+):[\\d]+:[\\d]+/,function(e,t){$__curScript={src:t},a=t.replace(/\\/[^\\/]*$/,"/")})}t&&importScripts(a+"system-polyfills.js"),e()}else $__curScript="undefined"!=typeof __filename?{src:__filename}:null,e()}();\r\n');
}.call(exports, (function() { return this; }())))

/***/ }),

/***/ "BBmw":
/*!************************************!*\
  !*** ./lib/error/SPLoaderError.js ***!
  \************************************/
/*! exports provided: SPLoaderErrorCode, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPLoaderErrorCode", function() { return SPLoaderErrorCode; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Error_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Error.resx */ "Z6P1");
/* harmony import */ var _loc_Common_resx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../loc/Common.resx */ "8N74");
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



/*
 * sp-loader error codes.
 */
var SPLoaderErrorCode;
(function (SPLoaderErrorCode) {
    SPLoaderErrorCode[SPLoaderErrorCode["loadComponentMaxRetriesError"] = 0] = "loadComponentMaxRetriesError";
    SPLoaderErrorCode[SPLoaderErrorCode["loadComponentError"] = 1] = "loadComponentError";
    SPLoaderErrorCode[SPLoaderErrorCode["loadComponentReturnsEmptyError"] = 2] = "loadComponentReturnsEmptyError";
    SPLoaderErrorCode[SPLoaderErrorCode["loadComponentReturnsDefaultEmptyError"] = 3] = "loadComponentReturnsDefaultEmptyError";
    SPLoaderErrorCode[SPLoaderErrorCode["loadComponentDependencyError"] = 4] = "loadComponentDependencyError";
    SPLoaderErrorCode[SPLoaderErrorCode["manifestNotFoundError"] = 5] = "manifestNotFoundError";
    SPLoaderErrorCode[SPLoaderErrorCode["loadPathDependencyBlockedByAnotherDependencyError"] = 6] = "loadPathDependencyBlockedByAnotherDependencyError";
    SPLoaderErrorCode[SPLoaderErrorCode["moduleHasUndeclaredDependencyError"] = 7] = "moduleHasUndeclaredDependencyError";
    SPLoaderErrorCode[SPLoaderErrorCode["loadEntryPointError"] = 8] = "loadEntryPointError";
    SPLoaderErrorCode[SPLoaderErrorCode["loadPathDependencyError"] = 9] = "loadPathDependencyError";
    SPLoaderErrorCode[SPLoaderErrorCode["loadComponentDependencyFailoverPathError"] = 10] = "loadComponentDependencyFailoverPathError";
    SPLoaderErrorCode[SPLoaderErrorCode["loadScriptWithStringError"] = 11] = "loadScriptWithStringError";
    SPLoaderErrorCode[SPLoaderErrorCode["urlStatusLocalhostFileNotFoundError"] = 12] = "urlStatusLocalhostFileNotFoundError";
    SPLoaderErrorCode[SPLoaderErrorCode["urlStatusFileNotFoundError"] = 13] = "urlStatusFileNotFoundError";
    SPLoaderErrorCode[SPLoaderErrorCode["urlStatusForbiddenError"] = 14] = "urlStatusForbiddenError";
    SPLoaderErrorCode[SPLoaderErrorCode["urlStatusClientErrorError"] = 15] = "urlStatusClientErrorError";
    SPLoaderErrorCode[SPLoaderErrorCode["urlStatusServerErrorError"] = 16] = "urlStatusServerErrorError";
    SPLoaderErrorCode[SPLoaderErrorCode["urlStatusLocalhostNetworkErrorError"] = 17] = "urlStatusLocalhostNetworkErrorError";
    SPLoaderErrorCode[SPLoaderErrorCode["urlStatusDocLibNetworkErrorError"] = 18] = "urlStatusDocLibNetworkErrorError";
    SPLoaderErrorCode[SPLoaderErrorCode["urlStatusHttpsNetworkErrorError"] = 19] = "urlStatusHttpsNetworkErrorError";
    SPLoaderErrorCode[SPLoaderErrorCode["urlStatusNetworkErrorError"] = 20] = "urlStatusNetworkErrorError";
    SPLoaderErrorCode[SPLoaderErrorCode["urlStatusUndefinedError"] = 21] = "urlStatusUndefinedError";
    SPLoaderErrorCode[SPLoaderErrorCode["failedToCreateGlobalVariable"] = 22] = "failedToCreateGlobalVariable";
    SPLoaderErrorCode[SPLoaderErrorCode["dependencyLoadError"] = 23] = "dependencyLoadError";
    SPLoaderErrorCode[SPLoaderErrorCode["missingPathDependencyError"] = 24] = "missingPathDependencyError";
})(SPLoaderErrorCode || (SPLoaderErrorCode = {}));
/**
 * sp-loader errors.
 *
 * @internal
 */
var SPLoaderError = /** @class */ (function (_super) {
    __extends(SPLoaderError, _super);
    function SPLoaderError(errorCode, innerError, isExpected) {
        var params = []; // tslint:disable-line:no-any
        for (var _i = 3 // tslint:disable-line:no-any
        ; _i < arguments.length // tslint:disable-line:no-any
        ; _i++ // tslint:disable-line:no-any
        ) {
            params[_i - 3] = arguments[_i]; // tslint:disable-line:no-any
        }
        var _this = _super.call(this, SPLoaderErrorCode[errorCode], _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format.apply(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"], [SPLoaderError._errorCodeToMessageMap.get(errorCode)].concat(params))) || this;
        // Manually set the prototype, as we can no longer extend built-in classes like Error, Array, Map, etc
        // tslint:disable-next-line:max-line-length
        // [https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work](https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work)
        //
        // Note: the prototype must also be set on any classes which extend this one
        _this.__proto__ = SPLoaderError.prototype; // tslint:disable-line:no-any
        _this._loaderErrorCode = errorCode;
        _this.innerError = innerError;
        // If the inner error is expected, the error is expected.
        // Otherwise, look at the flag, or set the default to false.
        if (_this.innerError instanceof SPLoaderError) {
            _this._isExpected = _this.innerError.isExpected;
        }
        _this._isExpected = _this._isExpected || isExpected || false;
        return _this;
    }
    Object.defineProperty(SPLoaderError.prototype, "id", {
        /**
         * Error id.
         */
        get: function () {
            return this._loaderErrorCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPLoaderError.prototype, "category", {
        /**
         * Error category.
         */
        get: function () {
            return 'SPLoaderError';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPLoaderError.prototype, "isExpected", {
        /**
         * True if the error is an expected error.
         * This can happen when it's surfacing an error that happened in the loader,
         * or there is a transient network problem.
         */
        get: function () {
            return this._isExpected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Error id to string map
     */
    SPLoaderError._errorCodeToMessageMap = new Map([
        [SPLoaderErrorCode.loadComponentMaxRetriesError, _loc_Common_resx__WEBPACK_IMPORTED_MODULE_2__["default"].loadComponentMaxRetriesError],
        [SPLoaderErrorCode.loadComponentError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].loadComponentError],
        [SPLoaderErrorCode.loadComponentReturnsEmptyError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].loadComponentReturnsEmptyError],
        [SPLoaderErrorCode.loadComponentReturnsDefaultEmptyError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].loadComponentReturnsDefaultEmptyError],
        [SPLoaderErrorCode.loadComponentDependencyError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].loadComponentDependencyError],
        [SPLoaderErrorCode.manifestNotFoundError, _loc_Common_resx__WEBPACK_IMPORTED_MODULE_2__["default"].manifestNotFoundError],
        // tslint:disable-next-line:max-line-length
        [SPLoaderErrorCode.loadPathDependencyBlockedByAnotherDependencyError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].loadPathDependencyBlockedByAnotherDependencyError],
        [SPLoaderErrorCode.moduleHasUndeclaredDependencyError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].moduleHasUndeclaredDependencyError],
        [SPLoaderErrorCode.loadEntryPointError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].loadEntryPointError],
        [SPLoaderErrorCode.loadPathDependencyError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].loadPathDependencyError],
        [SPLoaderErrorCode.loadComponentDependencyFailoverPathError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].loadComponentDependencyFailoverPathError],
        [SPLoaderErrorCode.loadScriptWithStringError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].loadScriptWithStringError],
        [SPLoaderErrorCode.urlStatusLocalhostFileNotFoundError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].urlStatusLocalhostFileNotFoundError],
        [SPLoaderErrorCode.urlStatusFileNotFoundError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].urlStatusFileNotFoundError],
        [SPLoaderErrorCode.urlStatusForbiddenError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].urlStatusForbiddenError],
        [SPLoaderErrorCode.urlStatusClientErrorError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].urlStatusClientErrorError],
        [SPLoaderErrorCode.urlStatusServerErrorError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].urlStatusServerErrorError],
        [SPLoaderErrorCode.urlStatusLocalhostNetworkErrorError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].urlStatusLocalhostNetworkErrorError],
        // Note that the doclib error shows the standard network error message
        [SPLoaderErrorCode.urlStatusDocLibNetworkErrorError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].urlStatusNetworkErrorError],
        [SPLoaderErrorCode.urlStatusHttpsNetworkErrorError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].urlStatusHttpsNetworkErrorError],
        [SPLoaderErrorCode.urlStatusNetworkErrorError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].urlStatusNetworkErrorError],
        [SPLoaderErrorCode.urlStatusUndefinedError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].urlStatusUndefinedError],
        [SPLoaderErrorCode.failedToCreateGlobalVariable, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].failedToCreateGlobalVariableError],
        [SPLoaderErrorCode.dependencyLoadError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].dependencyLoadError],
        [SPLoaderErrorCode.missingPathDependencyError, _Error_resx__WEBPACK_IMPORTED_MODULE_1__["default"].missingPathDependencyError]
    ] /* fix this typecast, VSO:397687 */);
    return SPLoaderError;
}(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["SPError"]));
/* harmony default export */ __webpack_exports__["default"] = (SPLoaderError);


/***/ }),

/***/ "Edzh":
/*!***************************************!*\
  !*** ./lib/systemjs/normalizeName.js ***!
  \***************************************/
/*! exports provided: default, normalizeFailoverPathName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeFailoverPathName", function() { return normalizeFailoverPathName; });
/* harmony import */ var _utilities_normalizeComponentId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/normalizeComponentId */ "jLfe");

/**
 * This is the base URL for components that will be sent to SystemJS.
 * SystemJS removes the base URL in order to get the right identifier.
 *
 * By having two different base URLs we can differentiate when we are importing components
 * and when it's an accidental import.
 */
var _componentBaseUrl = 'https://component-id.invalid/';
/**
 * Given a manifest, or a manifest and a name, normalizes the name for usage
 * in stores and SystemJS.
 *
 * This is used in order to support versioning for components, and uniquely
 * identify non-component dependencies.
 *
 * Current behavior:
 * Returns <manifestId>_<manifestVersion>.
 * If a name is provided returns the <manifestId>_<manifestVersion>/<name>.
 * It prepends 'https://component-id.invalid/' in order to make it an absolute URL.
 *
 * Final behavior:
 * For a manifest, normalized name will be <componentId>-<version>
 * If a name is provided, normalized name will be <componentId>-<version>-<name>
 */
function normalizeName(manifest, name) {
    if (name) {
        return _componentBaseUrl + [normalizeManifestId(manifest), name].join('/');
    }
    else {
        return _componentBaseUrl + normalizeManifestId(manifest);
    }
}
function normalizeManifestId(manifest) {
    return Object(_utilities_normalizeComponentId__WEBPACK_IMPORTED_MODULE_0__["default"])(manifest.id, manifest.version);
}
/**
 * This is only used for components that have a failover path (so far, react and react-dom).
 * As the failover path is used when there is no component, they work via its name,
 * but as opposed to the 'path' dependencies, they are unique in SPFx, like a component.
 *
 * They return the name directly, prepended by the component base URL.
 */
function normalizeFailoverPathName(name) {
    return _componentBaseUrl + name;
}


/***/ }),

/***/ "Eke5":
/*!*************************************!*\
  !*** ./lib/stores/ManifestStore.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utilities/telemetryConstants */ "4mHd");
/* harmony import */ var _debug_confirmDebugAllowed__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../debug/confirmDebugAllowed */ "MqKS");
/* harmony import */ var _utilities_normalizeComponentId__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../utilities/normalizeComponentId */ "jLfe");
/* harmony import */ var _utilities_componentConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities/componentConstants */ "kd3Z");
/* harmony import */ var _Stores_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Stores.resx */ "dJ1A");
/* harmony import */ var _loc_Common_resx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../loc/Common.resx */ "8N74");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file ManifestStore.ts
 */








/**
 * This class maintains a cache of the manifests on the current page.
 *
 * @internal
 */
var ManifestStore = /** @class */ (function () {
    function ManifestStore() {
        /**
         * Map from component id to array of manifest store indexes.
         * This allows to store manifests for different versions of the same component.
         *
         * @remarks
         * Example: `'d1d91016-032f-456d-98a4-721247c305e8' -->[ Version(1.0.0), Version(2.0.0) ]`
         */
        this._manifestVersions = new Map();
        /**
         * Map from manifest store index string to manifest store entry.
         * Manifest store index is generated through logic in utilities/normalizeComponentId (`<id>_<version>`)
         * e.g. `'d1d91016-032f-456d-98a4-721247c305e8_1.0.0' --> { ManifestStoreEntry }`
         */
        this._manifests = new Map();
        /**
         * Set of all the component ids that have their manifest pinned.
         * If a component id has its manifest pinned, no other manifest can be added for that component id,
         * regardless of version or debug manifest.
         *
         * @remarks
         *
         * Example: `{ '1c6c9123-7aac-41f3-a376-3caea41ed83f', '7263c7d0-1d6a-45ec-8d85-d4d1d234171b' }`
         */
        this._pinnedManifests = new Set();
    }
    Object.defineProperty(ManifestStore, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new ManifestStore();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Register the preloaded manifests on the manifest store.
     *
     * @param preloadedData - The preloaded data
     */
    ManifestStore.prototype.registerPreloadedManifests = function (preloadedData) {
        if (preloadedData && preloadedData.manifests && preloadedData.manifests.length) {
            this.registerManifests(preloadedData.manifests, true);
        }
        /* tslint:disable-next-line:no-any */
        var globalManifests = window.g_webPartManifests;
        if (globalManifests && globalManifests.length) {
            this.registerManifests(globalManifests, true);
        }
    };
    /**
     * Register debug manifests on the manifest store.
     *
     * @param manifests - A dictionary of debug manifests.
     */
    ManifestStore.prototype.registerDebugManifests = function (manifests) {
        if (manifests) {
            for (var _i = 0, manifests_1 = manifests; _i < manifests_1.length; _i++) {
                var manifest = manifests_1[_i];
                this._addDebugManifest(manifest);
            }
        }
    };
    /**
     * Return a manifest by its component id and version.
     *
     * @remarks
     * If version is not provided, it will return the only available version. If more than
     * one version is available and version is not provided, returns undefined.
     *
     * Only return a debug manifest is debug is allowed. If a manifest isn't found by
     * the provided id, return undefined.
     *
     * @param id        - The component id of the manifest to retrieve.
     * @param version   - The version of the component of the manifest to retrieve.
     * @param shouldLog - True if failures should be logged. Defaults to true.
     * @returns           The retrieved manifest, or undefined if one could not be found.
     */
    ManifestStore.prototype.tryGetManifest = function (id, version, shouldLog) {
        if (shouldLog === void 0) { shouldLog = true; }
        try {
            return this._getManifest(id, version, shouldLog);
        }
        catch (e) {
            return undefined;
        }
    };
    /**
     * Return a manifest by its component id and version.
     *
     * @remarks
     * If version is not provided, it will return the only available version. If more than
     * one version is available and version is not provided, the function throws.
     *
     * Only return a debug manifest is debug is allowed. If a manifest isn't found by
     * the provided id, the function throws.
     *
     * @param id      - The component id of the manifest to retrieve.
     * @param version - The version of the component of the manifest to retrieve.
     * @returns         The retrieved manifest, or undefined if one could not be found.
     */
    ManifestStore.prototype.getManifest = function (id, version) {
        return this._getManifest(id, version, true);
    };
    /**
     * Get all registered manifests.
     *
     * @returns The registered manifests.
     */
    ManifestStore.prototype.getRegisteredManifests = function () {
        var _this = this;
        var result = [];
        this._manifests.forEach(function (manifestEntry) {
            var manifest = _this._getManifestFromStoreEntry(manifestEntry);
            if (manifest) {
                result.push(manifest);
            }
        });
        return result;
    };
    /**
     * Removes all manifests that are not considered essential, and registers all the manifests passed as input.
     * Essential manifests are assembly-related manifest, and debug manifests.
     *
     * @param manifests - Manifests to add.
     */
    ManifestStore.prototype.replaceManifests = function (manifests) {
        this._removeAllManifests();
        this.registerManifests(manifests, false);
    };
    /**
     * Returns a map of manifest IDs to manifests.
     *
     * @returns A map of manifest IDs to manifests.
     */
    ManifestStore.prototype._getManifestMap = function () {
        return this._manifests;
    };
    /**
     * Loads additional manifests into the manifest store, updating existing manifests.
     *
     * @param manifests - The manifests to load into the store.
     */
    ManifestStore.prototype.registerManifests = function (manifests, overwriteExisting) {
        var _this = this;
        manifests.forEach(function (manifest) { return _this._addManifest(manifest, overwriteExisting); });
    };
    /**
     * Pins the manifest for a specific component id.
     * That means that no other manifest can be added for the specified component id.
     *
     * @remarks
     * This is used by assemblies to ensure that debug manifests are not replacing components already in use.
     *
     * @param componentId - Component id with only one manifest, which will be pinned.
     */
    ManifestStore.prototype._pinManifest = function (componentId) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(componentId, 'componentId');
        this._pinnedManifests.add(componentId);
    };
    /**
     * Given a component id and version, requests its manifest (and all its dependencies) to SharePoint
     * through a REST API.
     * @param id - Id of the requested component
     * @param version - Optional. Version of the requested component
     * @returns Promise with the requested manifest. Rejects the promise if the manifest was not found.
     */
    ManifestStore.prototype.requestManifest = function (id, version) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(this._manifestProvider, 'manifestProvider');
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["manifestStoreLogSource"], "Requesting manifest with id: \"" + id + "\" and version: \"" + version + "\"");
        return this._manifestProvider.tryGetManifest(id, version).then(function (manifests) {
            _this.registerManifests(manifests, false);
            // This will reject the promise if the manifest is not present
            return _this.getManifest(id, version);
        }).catch(function (error) {
            throw new Error(_this._getManifestNotFoundErrorMessage(id, version));
        });
    };
    /**
     * Given a component id and version, requests its manifest (and all its dependencies) to SharePoint
     * through a REST API.
     * @param ids - List of ids and (optionally) versions of the manifests to request.
     * @returns Promise with the requested manifests. Rejects the promise if the manifest was not found.
     */
    ManifestStore.prototype.requestManifests = function (ids) {
        var _this = this;
        var retVal = [];
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(this._manifestProvider, 'manifestProvider');
        return this._manifestProvider.tryGetManifests(ids).then(function (manifests) {
            _this.registerManifests(manifests, false);
            // This will reject the promise if any of the manifests is not present
            ids.forEach(function (id) {
                retVal.push(_this.getManifest(id.id, id.version));
            });
            return retVal;
        });
    };
    /**
     * Sets the manifest provider.
     * This is used to request manifests in the server if they are not found in the manifest store.
     *
     * @remarks
     * This must be set once by SPApplicationLoader. If it is called more than once it does nothing.
     */
    ManifestStore.prototype._setManifestProvider = function (manifestProvider) {
        if (!this._manifestProvider) {
            this._manifestProvider = manifestProvider;
        }
    };
    ManifestStore.prototype._isManifestPinned = function (componentId) {
        return this._pinnedManifests.has(componentId);
    };
    ManifestStore.prototype._removeAllManifests = function () {
        var _this = this;
        this._manifests.forEach(function (manifestEntry) { return _this._removeManifest(manifestEntry.id, manifestEntry.version); });
    };
    /**
     * Removes a manifest from the manifest store based on its id.
     * If it's a pinned manifest or a debug manifest it will skip it.
     *
     * @param id - Id of the manifest to remove.
     * @param version - Version of the manifest to remove.
     * @returns true if the manifest was removed.
     */
    ManifestStore.prototype._removeManifest = function (id, version) {
        if (this._pinnedManifests.has(id)) {
            return false;
        } // If it's a pinned manifest, it should not be removed
        // React 16 Rollout - NavigationOrchestrator.navigate replaces all manifests. The use case with React 15/16 breaks
        // because React 15 *may* not come from the server preloaded data
        if (id === _utilities_componentConstants__WEBPACK_IMPORTED_MODULE_5__["reactComponentId"] || id === _utilities_componentConstants__WEBPACK_IMPORTED_MODULE_5__["reactDomComponentId"]) {
            return false;
        }
        var versionObj = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Version"].parse(version);
        var index = this._createIndex(id, versionObj);
        var entry = this._manifests.get(index);
        if (!entry) {
            return false;
        } // If there is no entry, nothing gets removed
        if (entry.debugManifest) {
            return false;
        } // If this is a debug manifest, don't remove it
        this._manifests.delete(index);
        if (this._manifestVersions.get(id).length === 1) { // Only one version. Remove the reference to the id.
            this._manifestVersions.delete(id);
        }
        else { // More than one version. Remove only the specific version.
            this._manifestVersions.set(id, this._manifestVersions.get(id).filter(function (v) { return !v.equals(versionObj); }));
        }
        return true;
    };
    /**
     * Internal implementation of `getManifest` that toggles whether failures should be logged or not.
     */
    ManifestStore.prototype._getManifest = function (id, version, shouldLog) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(id, 'id');
        var index = this._getExistingIndex(id, version);
        if (!index) {
            var errorMessage = this._getManifestNotFoundErrorMessage(id, version);
            if (shouldLog) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["manifestStoreLogSource"], errorMessage);
            }
            throw new Error(errorMessage);
        }
        // after here, the compiler will assume index != undefined
        var manifestEntry = this._manifests.get(index);
        if (manifestEntry) {
            var manifest = this._getManifestFromStoreEntry(manifestEntry);
            if (manifest) {
                return manifest;
            }
        }
        throw new Error(this._getManifestNotFoundErrorMessage(id, version));
    };
    ManifestStore.prototype._getManifestNotFoundErrorMessage = function (id, version) {
        if (!version) {
            return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_Stores_resx__WEBPACK_IMPORTED_MODULE_6__["default"].manifestNotFoundByIdError, id);
        }
        else {
            return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_loc_Common_resx__WEBPACK_IMPORTED_MODULE_7__["default"].manifestNotFoundError, id, version);
        }
    };
    ManifestStore.prototype._getManifestFromStoreEntry = function (manifestEntry) {
        var allowDebug = Object(_debug_confirmDebugAllowed__WEBPACK_IMPORTED_MODULE_3__["peekDebugAllowed"])({ manifestsRequested: true, loaderRequested: false });
        if (manifestEntry) {
            if (allowDebug && manifestEntry.debugManifest) {
                return manifestEntry.debugManifest;
            }
            else {
                return manifestEntry.manifest;
            }
        }
        else {
            return undefined;
        }
    };
    ManifestStore.prototype._addManifest = function (manifest, overwriteExisting) {
        this._internalAddManifest(manifest, false, overwriteExisting);
    };
    ManifestStore.prototype._addDebugManifest = function (manifest) {
        this._internalAddManifest(manifest, true);
    };
    ManifestStore.prototype._internalAddManifest = function (manifest, isDebug, overwriteExisting) {
        // If a manifest is pinned, no other manifest for the same component id can be added
        if (this._isManifestPinned(manifest.id)) {
            return;
        }
        // Pin all internal manifests so third parties cannot override them.
        // This behavior is disabled when the debugging flight is enabled, for internal development.
        if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isDebugFlightEnabled && manifest.isInternal
            // React has an internal manifest but it can have multiple versions at the same time
            && manifest.id !== _utilities_componentConstants__WEBPACK_IMPORTED_MODULE_5__["reactComponentId"] && manifest.id !== _utilities_componentConstants__WEBPACK_IMPORTED_MODULE_5__["reactDomComponentId"]) {
            this._pinManifest(manifest.id);
        }
        if (isDebug) {
            manifest._isDebug = true;
        }
        var index = this._getExistingIndex(manifest.id, manifest.version);
        var existingEntry = index ? this._manifests.get(index) : undefined;
        if (existingEntry) {
            if (isDebug) {
                existingEntry.debugManifest = manifest;
            }
            else {
                if (overwriteExisting || !existingEntry.manifest) {
                    existingEntry.manifest = manifest;
                }
            }
        }
        else {
            this._addManifestToVersionsMap(manifest);
            var newIndex = this._createIndexFromManifest(manifest);
            this._manifests.set(newIndex, {
                id: manifest.id,
                version: manifest.version,
                manifest: isDebug ? undefined : manifest,
                debugManifest: isDebug ? manifest : undefined
            });
        }
    };
    /**
     * Adds the manifest to the versions map.
     *
     * If the component id is not present in the map, adds a new entry in the map.
     * If the id and version are already present, it does nothing.
     */
    ManifestStore.prototype._addManifestToVersionsMap = function (manifest) {
        var version = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Version"].parse(manifest.version);
        if (!this._manifestVersions.has(manifest.id)) {
            this._manifestVersions.set(manifest.id, [version]);
        }
        else {
            var versions = this._manifestVersions.get(manifest.id);
            for (var _i = 0, versions_1 = versions; _i < versions_1.length; _i++) {
                var existingVersion = versions_1[_i];
                if (existingVersion.equals(version)) {
                    return; // early return
                }
            }
            this._manifestVersions.set(manifest.id, versions.concat(version));
        }
    };
    /**
     * Returns the index for a component id and version.
     * The index might not be for the same version, but a compatible one.
     *
     * If an index is not found, returns undefined.
     * If an index is request without a version, and there are multiple versions,
     * returns an error.
     * If more than one compatible version is found, an error is logged and
     * returns the highest compatible version.
     */
    ManifestStore.prototype._getExistingIndex = function (id, versionString) {
        if (!versionString) {
            return this._getUniqueManifestStoreIndex(id);
        }
        if (this._manifestVersions.has(id)) {
            var versions = this._manifestVersions.get(id);
            var version_1 = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Version"].parse(versionString);
            var validVersions = versions.filter(function (currentVersion) { return currentVersion.satisfies(version_1); });
            if (!validVersions || validVersions.length < 1) {
                return undefined;
            }
            else if (validVersions.length === 1) {
                return this._createIndex(id, validVersions[0]);
            }
            else { // if (validVersions.length > 1)
                // If there is a debug manifest, use that one. Otherwise log error.
                var debugIndex = this._findDebugIndex(id, validVersions);
                if (debugIndex) {
                    return debugIndex;
                }
                else {
                    var error = new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_Stores_resx__WEBPACK_IMPORTED_MODULE_6__["default"].tooManyCompatibleVersionsError, validVersions.length, validVersions.join(', '), id, versionString));
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["manifestStoreLogSource"], error);
                    // Sort by greatest version first, and return the first version
                    var returnVersion = validVersions.sort(function (version1, version2) {
                        return -1 * _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Version"].compare(version1, version2);
                    })[0];
                    return this._createIndex(id, returnVersion);
                }
            }
        }
        return undefined;
    };
    /**
     * Gets the manifest store index for a component id without version.
     *
     * If no version is found for the id, returns undefined.
     * If there are too many manifests for the component id, logs an error and returns undefined.
     */
    ManifestStore.prototype._getUniqueManifestStoreIndex = function (id) {
        var versions = this._manifestVersions.get(id);
        if (!versions || versions.length < 1) {
            return undefined;
        }
        else if (versions.length === 1) {
            return this._createIndex(id, versions[0]);
        }
        else { // if (versions.length > 1)
            // If there is a debug manifest, use that one. Otherwise log error.
            var debugIndex = this._findDebugIndex(id, versions);
            if (debugIndex) {
                return debugIndex;
            }
            else {
                var error = new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_Stores_resx__WEBPACK_IMPORTED_MODULE_6__["default"].tooManyManifestsError, versions.length, versions.join(', '), id));
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["manifestStoreLogSource"], error);
                return undefined;
            }
        }
    };
    ManifestStore.prototype._createIndexFromManifest = function (manifest) {
        return this._createIndex(manifest.id, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Version"].parse(manifest.version));
    };
    ManifestStore.prototype._createIndex = function (id, version) {
        return Object(_utilities_normalizeComponentId__WEBPACK_IMPORTED_MODULE_4__["default"])(id, version.toString());
    };
    ManifestStore.prototype._findDebugIndex = function (id, versions) {
        var _this = this;
        return versions.reduce(function (previous, validVersion) {
            var index = _this._createIndex(id, validVersion);
            var manifestStoreEntry = _this._manifests.get(index);
            if (manifestStoreEntry && manifestStoreEntry.debugManifest) {
                return index;
            }
            else {
                return previous;
            }
        }, undefined);
    };
    return ManifestStore;
}());
/* harmony default export */ __webpack_exports__["default"] = (ManifestStore);


/***/ }),

/***/ "F+Lb":
/*!************************************!*\
  !*** ./lib/stores/AddressStore.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Copyright (c) Microsoft. All rights reserved.
/**
 * Stores the address for each module by its normalized name.
 * This is used for SystemJS to know how to locate each module.
 */
var AddressStore = /** @class */ (function () {
    function AddressStore() {
        /**
         * Map from normalized name to address
         */
        this._addressMap = new Map();
        this._reverseAddressMap = new Map();
    }
    Object.defineProperty(AddressStore, "instance", {
        get: function () {
            if (!AddressStore._instance) {
                AddressStore._instance = new AddressStore();
            }
            return AddressStore._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns an address for a module, given its normalized name.
     * @param normalizedName - Normalized name
     */
    AddressStore.prototype.tryGetAddress = function (normalizedName) {
        return this._addressMap.get(normalizedName);
    };
    /**
     * Returns the normalized name for a given address.
     * If the address hasn't been set in the AddressStore, it returns undefined
     * @param address - Address
     */
    AddressStore.prototype.getNormalizedName = function (address) {
        if (this._reverseAddressMap.has(address)) {
            return this._reverseAddressMap.get(address);
        }
        else {
            return undefined;
        }
    };
    /**
     * Set a mapping from a module's normalized name to the module address.
     *
     * @remarks
     * If the address has been set for a previous module's normalized name, when searching for that address
     * the original module's normalized name will be returned.
     * @param normalizedName - Module normalized name
     * @param address - Module address
     */
    AddressStore.prototype.set = function (normalizedName, address) {
        // Multiple normalized names can point to the same address
        if (!this._addressMap.has(normalizedName)) {
            this._addressMap.set(normalizedName, address);
        }
        // An address can point only to one normalized name
        // For implementation purposes, this is the first one that is registered
        // RequireJsLoader.configure handles this case
        if (!this._reverseAddressMap.has(address)) {
            this._reverseAddressMap.set(address, normalizedName);
        }
    };
    return AddressStore;
}());
/* harmony default export */ __webpack_exports__["default"] = (AddressStore);


/***/ }),

/***/ "FcGP":
/*!*************************************!*\
  !*** ./lib/starter/Starter.resx.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_C14mR9Diz4DseFaa7aiq6A';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "GV8Z":
/*!***********************************!*\
  !*** ./lib/debug/DebugManager.js ***!
  \***********************************/
/*! exports provided: DebugManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DebugManager", function() { return DebugManager; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _confirmDebugAllowed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./confirmDebugAllowed */ "MqKS");
/* harmony import */ var _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../stores/ManifestStore */ "Eke5");
/* harmony import */ var _showDebugError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./showDebugError */ "AtZb");
/* harmony import */ var _DebugManager_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DebugManager.resx */ "cLCj");





/**
 * Put debug data in a session variable so it gets cleared when the browser or tab is closed.
 */
var SPFX_DEBUG_SESSION_VAR_ID = 'spfx-debug';
/**
 * The ?debugManifestsFile query parameter
 */
var DEBUG_MANIFESTS_FILE_QUERY_PARAM_NAME = 'debugManifestsFile';
/**
 * The ?loader query parameter. This is replacing the ?moduleLoader query parameter
 */
var LOADER_QUERY_PARAM_NAME = 'loader';
/**
 * Resets the debug state. Mutually exclusive to all other debug parameters.
 */
var RESET_QUERY_PARAM_NAME = 'reset';
var LOADER_EXPORTS_NAME = 'spModuleLoader';
var EMPTY_DEBUG_LOAD_RESULT = {
    debugLoader: undefined,
    debugManifests: undefined,
    registerAsNonDebug: false
};
/**
 * Provides APIs to manage debug scripts.
 *
 * This is used in order to provide security measures before running arbitrary code, and to provide
 * improved debugging experience when a debug loader is used.
 *
 * @internal
 */
var DebugManager = /** @class */ (function () {
    function DebugManager() {
    }
    /**
     * Checks if debug scripts are requested.
     * This method is the first thing called after flights are initialized in SPStarter.start() and should not be called
     * anywhere else.
     *
     * The following cases are supported (in order):
     *  - If the ?reset query parameter is present, clear the debug data and load the page normally.
     *  - If there is SPFX Debug session data containing the testMode property, load the scripts specified in the
     *      session data and return the debug loader and/or manifests. This case is only used for integration tests. The
     *      session data will get set externally by the test harness.
     *  - If the ?loader and/or the ?debugManifestsFile query parameter is present, prompt for
     *      consent and, if consent is granted, load the scripts, record the URLs in the SPFX Debug session data, and
     *      return the debug loader and/or manifests.
     *  - If there is SPFX Debug session data containing a loader URL and/or a manifests file URL, prompt for consent and,
     *      if consent is granted, load the scripts and return the debug loader and/or debug manifests.
     *  - In all other cases, return with no debug loader or manifests.
     *
     * @param componentLoader - The component loader to use to load debug scripts.
     * @param debugData - If defined, the currently executing loader is already a debug loader and the
     *  specified debug data was loaded by the non-debug loader. If the currently executing loader is already a debug
     *  loader, just set these manifests in the manifest store and return.
     *
     * @returns Promise optionally resolving to a debug loader.
     */
    DebugManager.initialize = function (componentLoader, debugData) {
        if (debugData) {
            Object(_confirmDebugAllowed__WEBPACK_IMPORTED_MODULE_1__["dangerouslyEnableDebug"])();
            DebugManager._registerManifests(debugData.debugManifests || [], debugData.registerAsNonDebug);
            return Promise.resolve(EMPTY_DEBUG_LOAD_RESULT);
        }
        if (!DebugManager._initializationPromise) {
            var spfxDebugSessionVarData_1 = {};
            var isSpfxDebugEnabled = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isDebugFlightEnabled;
            var queryParameters = new URL(window.location.href).searchParams;
            try {
                spfxDebugSessionVarData_1 = JSON.parse(sessionStorage.getItem(SPFX_DEBUG_SESSION_VAR_ID) || '{}');
            }
            catch (e) {
                // Error parsing session data. Assume there is no debug session data.
            }
            DebugManager._initializationPromise = DebugManager._handleDebugParameters(componentLoader, spfxDebugSessionVarData_1, queryParameters, isSpfxDebugEnabled).then(function (debugLoadResult) {
                // Always re-save the session data before continuing
                spfxDebugSessionVarData_1.loaderUrl = DebugManager._debugLoaderUrl;
                spfxDebugSessionVarData_1.manifestsFileUrl = DebugManager._debugManifestsFileUrl;
                try {
                    var serializedDebugSessionData = JSON.stringify(spfxDebugSessionVarData_1);
                    if (serializedDebugSessionData !== '{}') {
                        sessionStorage.setItem(SPFX_DEBUG_SESSION_VAR_ID, serializedDebugSessionData);
                    }
                    else {
                        sessionStorage.removeItem(SPFX_DEBUG_SESSION_VAR_ID);
                    }
                }
                catch (e) {
                    // If we get an error saving the debug session data, don't interrupt the rest of the initialization flow
                }
                return debugLoadResult;
            });
        }
        return DebugManager._initializationPromise;
    };
    DebugManager.loadAndRegisterManifestsFile = function (componentLoader, manifestsFileUrl, registerAsNonDebug) {
        return componentLoader.loadScript(manifestsFileUrl).then(function (manifestScript) {
            var manifests = manifestScript.getManifests();
            DebugManager._registerManifests(manifests, registerAsNonDebug);
            return manifests;
        });
    };
    DebugManager._handleDebugParameters = function (componentLoader, spfxDebugSessionVarData, queryParameters, isSpfxDebugEnabled) {
        return new Promise(function (resolve) {
            if (queryParameters.get(RESET_QUERY_PARAM_NAME) !== null) {
                // The ?reset query parameter is present, clear the debug data and load the page normally.
                spfxDebugSessionVarData.testMode = undefined;
                sessionStorage.removeItem(SPFX_DEBUG_SESSION_VAR_ID);
                resolve(EMPTY_DEBUG_LOAD_RESULT);
            }
            else if (isSpfxDebugEnabled && spfxDebugSessionVarData.testMode) {
                // The test mode session property is set
                Object(_confirmDebugAllowed__WEBPACK_IMPORTED_MODULE_1__["dangerouslyEnableDebug"])();
                DebugManager._debugManifestsFileUrl = spfxDebugSessionVarData.manifestsFileUrl;
                DebugManager._debugLoaderUrl = spfxDebugSessionVarData.loaderUrl;
                DebugManager._getDebugScripts(componentLoader, resolve, /* registerAsNonDebug */ false);
            }
            else {
                // We aren't in test mode, so keep going with the normal debug loader flow
                DebugManager._handleNonTestModeDebugParameters(componentLoader, spfxDebugSessionVarData, queryParameters, isSpfxDebugEnabled, resolve);
            }
        });
    };
    DebugManager._handleNonTestModeDebugParameters = function (componentLoader, spfxDebugSessionVarData, queryParameters, isSpfxDebugEnabled, resolve) {
        var debugManifestsFileUrl = queryParameters.get(DEBUG_MANIFESTS_FILE_QUERY_PARAM_NAME) ||
            spfxDebugSessionVarData.manifestsFileUrl ||
            undefined;
        var debugLoaderUrl = isSpfxDebugEnabled
            ? (queryParameters.get(LOADER_QUERY_PARAM_NAME) || spfxDebugSessionVarData.loaderUrl || undefined)
            : undefined;
        if (debugLoaderUrl || debugManifestsFileUrl) {
            Object(_confirmDebugAllowed__WEBPACK_IMPORTED_MODULE_1__["confirmDebugAllowed"])({
                loaderRequested: !!debugLoaderUrl,
                manifestsRequested: !!debugManifestsFileUrl
            }).then(function (allowed) {
                if (allowed) {
                    // Save the debug URLs onto the DebugManager's state so they will be written to the debug
                    // session data
                    DebugManager._debugLoaderUrl = debugLoaderUrl;
                    DebugManager._debugManifestsFileUrl = debugManifestsFileUrl;
                    DebugManager._getDebugScripts(componentLoader, resolve, /* registerAsNonDebug */ false);
                }
                else {
                    resolve(EMPTY_DEBUG_LOAD_RESULT);
                }
            }).catch(console.error);
        }
        else {
            // No debug scripts requested.
            resolve(EMPTY_DEBUG_LOAD_RESULT);
        }
    };
    DebugManager._getDebugScripts = function (componentLoader, resolve, registerAsNonDebug) {
        var loaderUrl = DebugManager._debugLoaderUrl;
        var manifestFileUrl = DebugManager._debugManifestsFileUrl;
        var debugLoaderPromise = loaderUrl
            ? DebugManager._loadLoader(componentLoader, loaderUrl)
            : Promise.resolve(undefined);
        var debugManifestsFilePromise = manifestFileUrl
            ? DebugManager.loadAndRegisterManifestsFile(componentLoader, manifestFileUrl, registerAsNonDebug)
            : Promise.resolve(undefined);
        // Wrap errors so we know where the error came from
        debugLoaderPromise = debugLoaderPromise.catch(function (error) {
            throw { errorSource: 'loader', error: error };
        });
        debugManifestsFilePromise = debugManifestsFilePromise.catch(function (error) {
            throw { errorSource: 'manifestsFile', error: error };
        });
        Promise.all([debugLoaderPromise, debugManifestsFilePromise])
            .then(function (_a) {
            var debugLoader = _a[0], debugManifests = _a[1];
            resolve({ debugLoader: debugLoader, debugManifests: debugManifests, registerAsNonDebug: registerAsNonDebug });
        })
            .catch(function (error) {
            if (error instanceof Error) {
                Object(_showDebugError__WEBPACK_IMPORTED_MODULE_3__["default"])(error, _DebugManager_resx__WEBPACK_IMPORTED_MODULE_4__["default"].errorLoadingDebugScriptUnknown, _DebugManager_resx__WEBPACK_IMPORTED_MODULE_4__["default"].errorLoadingUnknownTitle).catch(console.error);
            }
            else {
                var errorText = _DebugManager_resx__WEBPACK_IMPORTED_MODULE_4__["default"].errorLoadingDebugScriptUnknown;
                var title = _DebugManager_resx__WEBPACK_IMPORTED_MODULE_4__["default"].errorLoadingUnknownTitle;
                switch (error.errorSource) {
                    case 'loader':
                        errorText = DebugManager._getUrlErrorText(loaderUrl || '', LOADER_QUERY_PARAM_NAME);
                        title = _DebugManager_resx__WEBPACK_IMPORTED_MODULE_4__["default"].errorLoadingDebugLoaderTitle;
                        break;
                    case 'manifestsFile':
                        errorText = DebugManager._getUrlErrorText(manifestFileUrl || '', DEBUG_MANIFESTS_FILE_QUERY_PARAM_NAME);
                        title = _DebugManager_resx__WEBPACK_IMPORTED_MODULE_4__["default"].errorLoadingDebugManifestTitle;
                        break;
                }
                Object(_showDebugError__WEBPACK_IMPORTED_MODULE_3__["default"])(error.error, errorText, title).catch(console.error);
            }
        });
    };
    DebugManager._loadLoader = function (componentLoader, loaderUrl) {
        // This deletes the variable window.spModuleLoader created by the assembly
        delete window[LOADER_EXPORTS_NAME];
        // Delete all existing webpackJsonp globals before loading a new assembly
        for (var _i = 0, _a = Object.keys(window); _i < _a.length; _i++) {
            var globalName = _a[_i];
            if (globalName.match(/^webpackJsonp/i)) {
                delete window[globalName];
            }
        }
        return componentLoader.loadScript(loaderUrl, { globalExportsName: LOADER_EXPORTS_NAME });
    };
    DebugManager._getUrlErrorText = function (url, paramName) {
        var isMalformed = !url.match(/^https?\:\/\//);
        var isHttps = !isMalformed && !!url.match(/^https/);
        return isMalformed
            ? _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_DebugManager_resx__WEBPACK_IMPORTED_MODULE_4__["default"].errorLoadingDebugScriptMalformed, url)
            : _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(isHttps ? _DebugManager_resx__WEBPACK_IMPORTED_MODULE_4__["default"].errorLoadingDebugScriptHTTPS : _DebugManager_resx__WEBPACK_IMPORTED_MODULE_4__["default"].errorLoadingDebugScriptHTTP, paramName);
    };
    DebugManager._registerManifests = function (manifests, registerAsNonDebug) {
        if (registerAsNonDebug) {
            _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_2__["default"].instance.registerManifests(manifests, false);
        }
        else {
            _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_2__["default"].instance.registerDebugManifests(manifests);
        }
    };
    return DebugManager;
}());



/***/ }),

/***/ "H/UD":
/*!**********************************************************************************************!*\
  !*** ./lib/DeveloperTools/BrowserDeveloperToolsWarning/BrowserDeveloperToolsWarning.resx.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_fwMQe6Xe08yEeCPNxngd+g';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "HLbO":
/*!***************************************!*\
  !*** ./lib/utilities/KillSwitches.js ***!
  \***************************************/
/*! exports provided: KillSwitches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KillSwitches", function() { return KillSwitches; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */

var KillSwitches = /** @class */ (function () {
    function KillSwitches() {
    }
    KillSwitches.isDangerouslyEnableDebugKillSwitchActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('e0187f01-1210-45a0-9865-716fedd0630a'), '07/17/19', 'Enable debug when using debug loader');
    };
    KillSwitches.isRequireJSKillSwitchActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('75a2ce70-9731-4020-8b9f-9920bb5a036e'), '11/6/2019', 'Use requirejs instead of systemjs to load');
    };
    return KillSwitches;
}());



/***/ }),

/***/ "IG7x":
/*!****************************************************!*\
  !*** ./lib/DeveloperTools/DeveloperToolsLoader.js ***!
  \****************************************************/
/*! exports provided: initialize, registerDeveloperToolsTab, toggleDeveloperTools */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerDeveloperToolsTab", function() { return registerDeveloperToolsTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleDeveloperTools", function() { return toggleDeveloperTools; });
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file DeveloperToolsLoader.ts
 */
var F12_KEYCODE = 123;
var MAC_PLATFORM_IDENTIFIER = 'MacIntel';
var _listenerHasBeenRegistered = false;
var _developerTools;
var _developerToolsTabsBacklog = [];
function initialize() {
    if (!_listenerHasBeenRegistered) {
        document.documentElement.addEventListener('keydown', function (event) {
            var isMac = navigator.platform === MAC_PLATFORM_IDENTIFIER;
            // Detect ctrl+F12 for any platform, and detect ⌘+F12 on macs
            if (((event.ctrlKey && !event.metaKey) || (isMac && event.metaKey && !event.ctrlKey)) &&
                !event.altKey &&
                event.keyCode === F12_KEYCODE) {
                // ctrl+F12
                toggleDeveloperTools();
                event.preventDefault();
            }
        });
        _listenerHasBeenRegistered = true;
    }
}
/**
 * Registers a tab in the developer tools. The developer tools are invoked by pressing "CTRL+F12".
 *
 * @param developerToolsTab - The tab definition.
 *
 * @internal
 */
function registerDeveloperToolsTab(developerToolsTab) {
    if (_developerTools) {
        _developerTools.registerDeveloperToolsTab(developerToolsTab);
    }
    else {
        _developerToolsTabsBacklog.push(developerToolsTab);
    }
}
/**
 * Shows/hides the developer tools panel.
 *
 * @internal
 */
function toggleDeveloperTools() {
    if (_developerTools) {
        _developerTools.toggleDeveloperTools();
    }
    else {
        // tslint:disable-next-line:no-require-ensure (this code doesn't support the import(...) pattern)
        Promise.all(/*! require.ensure | developer-tools */[__webpack_require__.e("vendors~debug-prompt-components~developer-tools"), __webpack_require__.e("vendors~developer-tools"), __webpack_require__.e("developer-tools")]).then((function (require) {
            _initializeDeveloperTools(__webpack_require__(/*! ./DeveloperTools */ "PVnk").default);
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
    }
}
function _initializeDeveloperTools(developerToolsClass) {
    _developerTools = developerToolsClass.instance;
    _developerTools.initialize();
    _developerToolsTabsBacklog.forEach(function (developerToolsTab) {
        _developerTools.registerDeveloperToolsTab(developerToolsTab);
    });
    _developerTools.showHideDeveloperTools(true);
}


/***/ }),

/***/ "Inam":
/*!****************************************!*\
  !*** ./lib/systemjs/SystemsJs.resx.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_a4wKXyUGuAbOcWmuhzMXpg';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "JWqh":
/*!*****************************************!*\
  !*** ./lib/utilities/BrowserSupport.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utilities_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utilities.resx */ "lcN8");


var BrowserSupport = /** @class */ (function () {
    function BrowserSupport() {
    }
    BrowserSupport.getBrowserCompatibility = function () {
        var browserInfo = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_BrowserDetection"].getBrowserInformation();
        // IE9 (and older versions) are unreliable and Pages doesn't work properly
        if (browserInfo.browser === 4 /* IE */ &&
            browserInfo.browserVersion && browserInfo.browserVersion.major <= 9) {
            return {
                supportLevel: 3 /* Blocked */,
                warning: _Utilities_resx__WEBPACK_IMPORTED_MODULE_1__["default"].ie9OrOlderNotSupportedError
            };
        }
        if (browserInfo.browser === 3 /* Firefox */ &&
            browserInfo.browserVersion && browserInfo.browserVersion.major <= 43) {
            return {
                supportLevel: 3 /* Blocked */,
                warning: _Utilities_resx__WEBPACK_IMPORTED_MODULE_1__["default"].firefox43OrOlderNotSupportedError
            };
        }
        // Old versions of Firefox (<44) have a bug where the Headers object is defined,
        // but it lacks Headers.forEach method. This bug is also impact instances of Firefox 44/45
        // fetch polyfill handles the case where Headers are just not present (IE/Safari)
        if (typeof Headers !== 'undefined' &&
            typeof Headers.prototype.forEach === 'undefined') {
            return {
                supportLevel: 3 /* Blocked */,
                warning: undefined
            };
        }
        return {
            supportLevel: 0 /* None */,
            warning: undefined
        };
    };
    return BrowserSupport;
}());
/* harmony default export */ __webpack_exports__["default"] = (BrowserSupport);


/***/ }),

/***/ "KZU3":
/*!*****************************************!*\
  !*** ./lib/loader/SPComponentLoader.js ***!
  \*****************************************/
/*! exports provided: SPComponentLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPComponentLoader", function() { return SPComponentLoader; });
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Microsoft. All rights reserved.

/**
 * Component loader.
 * Needs to be initialized with an implemented `ISPComponentLoader`.
 *
 * @public
 */
var SPComponentLoader = /** @class */ (function () {
    function SPComponentLoader() {
    }
    /**
     * Initializes the component loader with an implementation.
     * Must be called once before it can be used.
     *
     * @internal
     */
    SPComponentLoader._initialize = function (componentLoader) {
        SPComponentLoader._instance = componentLoader;
    };
    /**
     * {@inheritDoc  ISPComponentLoader._startApplication}
     *
     * @internal
     */
    SPComponentLoader._startApplication = function (preloadedData) {
        return SPComponentLoader._instance._startApplication(preloadedData);
    };
    // Public API
    /**
     * {@inheritDoc  ISPComponentLoader.loadCss}
     */
    SPComponentLoader.loadCss = function (url) {
        return SPComponentLoader._instance.loadCss(url);
    };
    /**
     * {@inheritDoc  ISPComponentLoader.loadScript}
     */
    SPComponentLoader.loadScript = function (url, options) {
        return SPComponentLoader._instance.loadScript(url, options);
    };
    /**
     * {@inheritDoc  ISPComponentLoader.loadComponent}
     */
    SPComponentLoader.loadComponent = function (manifest) {
        return SPComponentLoader._instance.loadComponent(manifest);
    };
    // Alpha API
    /**
     * {@inheritDoc  ISPComponentLoader.loadComponentById}
     *
     * @public
     */
    SPComponentLoader.loadComponentById = function (id, version) {
        return SPComponentLoader._instance.loadComponentById(id, version);
    };
    /**
     * {@inheritDoc  ISPComponentLoader.registerManifests}
     *
     * @alpha
     */
    SPComponentLoader.registerManifests = function (manifests) {
        return SPComponentLoader._instance.registerManifests(manifests);
    };
    /**
     * {@inheritDoc  ISPComponentLoader.manifestReferences}
     *
     * @internal
     */
    SPComponentLoader._getManifestReferences = function () {
        return SPComponentLoader._instance._manifestReferences;
    };
    /**
     * Returns static copies of all the manifests.
     *
     * @public
     */
    SPComponentLoader.getManifests = function () {
        var retVal = [];
        SPComponentLoader._instance._manifestReferences.forEach(function (manifest) {
            retVal.push(Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"])(manifest));
        });
        return retVal;
    };
    /**
     * {@inheritDoc  ISPComponentLoader.tryGetLoadedComponent}
     *
     * @alpha
     */
    SPComponentLoader.tryGetLoadedComponent = function (manifest) {
        return SPComponentLoader._instance.tryGetLoadedComponent(manifest);
    };
    /**
     * {@inheritDoc  ISPComponentLoader.tryGetManifestById}
     *
     * @alpha
     */
    SPComponentLoader.tryGetManifestById = function (id, version) {
        return SPComponentLoader._instance.tryGetManifestById(id, version);
    };
    /**
     * {@inheritdoc ManifestStore.requestManifest}
     *
     * @alpha
     */
    SPComponentLoader.requestManifest = function (id, version) {
        return SPComponentLoader._instance.requestManifest(id, version);
    };
    // Internal methods
    /**
     * {@inheritDoc  ISPComponentLoader._loadDebugManifestsForWorkbench}
     *
     * @internal
     */
    SPComponentLoader._loadDebugManifestsForWorkbench = function (manifestsFileUrl) {
        return SPComponentLoader._instance._loadDebugManifestsForWorkbench(manifestsFileUrl);
    };
    return SPComponentLoader;
}());



/***/ }),

/***/ "MqKS":
/*!******************************************!*\
  !*** ./lib/debug/confirmDebugAllowed.js ***!
  \******************************************/
/*! exports provided: confirmDebugAllowed, dangerouslyEnableDebug, peekDebugAllowed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "confirmDebugAllowed", function() { return confirmDebugAllowed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dangerouslyEnableDebug", function() { return dangerouslyEnableDebug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peekDebugAllowed", function() { return peekDebugAllowed; });
/* harmony import */ var _ensureDebugComponents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ensureDebugComponents */ "X2Mq");

/**
 * State of whether debug is allowed or not. "Undefined" means we haven't asked,
 *  "false" means debug is prohibited, and "true" means debug is allowed.
 */
var _loaderResponse = undefined;
var _manifestsResponse = undefined;
var _debugAllowedPromise;
function confirmDebugAllowed(options) {
    if (_requiresPrompt(options)) {
        if (!_debugAllowedPromise) {
            _debugAllowedPromise = new Promise(function (resolve) {
                // Download the prompt
                Object(_ensureDebugComponents__WEBPACK_IMPORTED_MODULE_0__["default"])().then(function (debugComponents) {
                    // Show the prompt
                    return debugComponents.showDebugPrompt(options).then(function (allowed) {
                        _debugAllowedPromise = undefined;
                        if (options.loaderRequested) {
                            _loaderResponse = allowed;
                        }
                        if (options.manifestsRequested) {
                            _manifestsResponse = allowed;
                        }
                        resolve(allowed);
                    });
                }).catch(console.error);
            });
            return _debugAllowedPromise;
        }
        else {
            throw new Error('Debug prompt is currently being shown and cannot be shown again until it has been dismissed.');
        }
    }
    else {
        return Promise.resolve(peekDebugAllowed(options));
    }
}
function dangerouslyEnableDebug() {
    _loaderResponse = true;
    _manifestsResponse = true;
}
function peekDebugAllowed(options) {
    return ((!options.loaderRequested || _loaderResponse === true) &&
        (!options.manifestsRequested || _manifestsResponse === true));
}
function _requiresPrompt(options) {
    // Only show the prompt if we don't already know if it's been approved or declined
    return ((options.loaderRequested && _loaderResponse === undefined) ||
        (options.manifestsRequested && _manifestsResponse === undefined));
}


/***/ }),

/***/ "Pk8u":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Pk8u__;

/***/ }),

/***/ "PypK":
/*!*************************************************!*\
  !*** ./lib/requirejs/SystemJsFallbackLoader.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stores/ComponentStore */ "eaMA");
/* harmony import */ var _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stores/ManifestStore */ "Eke5");
/* harmony import */ var _systemjs_normalizeName__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../systemjs/normalizeName */ "Edzh");
/* harmony import */ var _utilities_LoadComponentExecutor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/LoadComponentExecutor */ "td2X");




var SystemJsFallbackLoader = /** @class */ (function () {
    function SystemJsFallbackLoader(serviceScope) {
        this._isInitialized = false;
        this._serviceScope = serviceScope;
        this._executor = new _utilities_LoadComponentExecutor__WEBPACK_IMPORTED_MODULE_3__["default"](this._loadComponentImpl.bind(this));
    }
    Object.defineProperty(SystemJsFallbackLoader.prototype, "executor", {
        get: function () {
            return this._executor;
        },
        enumerable: true,
        configurable: true
    });
    SystemJsFallbackLoader.prototype.loadComponent = function (manifest) {
        return this._executor.loadComponent(manifest);
    };
    SystemJsFallbackLoader.prototype._loadComponentImpl = function (manifest) {
        var _this = this;
        return this._ensureInitialized().then(function () {
            // At this point we are on a best-effort basis once RequireJS fails to load the component.
            // This is overly expensive but it "just works" to ensure that SystemJS has everything that's needed.
            // Loading a component twice could lead to unexpected behavior and race condition issues.
            _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_0__["default"].instance.getAllComponentReferences().forEach(function (value, key) {
                _this._systemJsLoader._ensure(Object(_systemjs_normalizeName__WEBPACK_IMPORTED_MODULE_2__["normalizeFailoverPathName"])(key), value);
            });
            _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_1__["default"].instance.getRegisteredManifests().forEach(function (m) {
                _this._systemJsLoader.configure(m);
            });
            return _this._systemJsComponentLoader.loadComponent(manifest).then(function (module) {
                _this._restoreGlobals();
                return module;
            }, function (error) {
                _this._restoreGlobals();
                throw error;
            });
        });
    };
    SystemJsFallbackLoader.prototype._ensureInitialized = function () {
        var _this = this;
        if (this._isInitialized) {
            return Promise.resolve();
        }
        this._saveGlobals();
        return __webpack_require__.e(/*! import() | systemjs-component-loader */ "systemjs-component-loader").then(__webpack_require__.bind(null, /*! ../systemjs/index */ "dcIE")).then(function (module) {
            _this._systemJsComponentLoader = new module.SPSystemJsComponentLoader(_this._serviceScope);
            _this._systemJsLoader = _this._serviceScope.consume(module.SystemJsLoader.serviceKey);
            _this._restoreGlobals();
            _this._isInitialized = true;
        });
    };
    SystemJsFallbackLoader.prototype._saveGlobals = function () {
        this.requirejs = SystemJsFallbackLoader._window.requirejs;
        this.require = SystemJsFallbackLoader._window.require;
        this.define = SystemJsFallbackLoader._window.define;
    };
    SystemJsFallbackLoader.prototype._restoreGlobals = function () {
        SystemJsFallbackLoader._window.requirejs = this.requirejs;
        SystemJsFallbackLoader._window.require = this.require;
        SystemJsFallbackLoader._window.define = this.define;
    };
    SystemJsFallbackLoader._window = window;
    return SystemJsFallbackLoader;
}());
/* harmony default export */ __webpack_exports__["default"] = (SystemJsFallbackLoader);


/***/ }),

/***/ "QcRg":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/raw-loader/0.5.1/node_modules/raw-loader!./lib/DeveloperTools/BrowserDeveloperToolsWarning/BrowserDeveloperToolsWarning.css ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".heading{font-size:70px;font-family:Helvetica,Arial,sans-serif;font-weight:700;color:red;-webkit-text-stroke:2px #000}.otherLines{font-size:15px;font-family:Helvetica,Arial,sans-serif;font-weight:700}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9EZXZlbG9wZXJUb29scy9Ccm93c2VyRGV2ZWxvcGVyVG9vbHNXYXJuaW5nL0Jyb3dzZXJEZXZlbG9wZXJUb29sc1dhcm5pbmcuc2NzcyIsIiRzdGRpbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUNFLFVBQUEsS0FDQSxZQUFBLFNDQXNCLENEQXRCLEtDQTZCLENEQTdCLFdBQ0EsWUFBQSxJQUNBLE1BQUEsSUFDQSxvQkFBQSxJQUFBLEtBR0YsWUFDRSxVQUFBLEtBQ0EsWUFBQSxTQ0RzQixDREN0QixLQ0Q2QixDREM3QixXQUNBLFlBQUEifQ== */"

/***/ }),

/***/ "R8e+":
/*!****************************************!*\
  !*** ./lib/requirejs/normalizeName.js ***!
  \****************************************/
/*! exports provided: default, normalizeFailoverPathName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeFailoverPathName", function() { return normalizeFailoverPathName; });
/* harmony import */ var _utilities_normalizeComponentId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/normalizeComponentId */ "jLfe");

/**
 * Given a manifest, or a manifest and a name, normalizes the name for usage
 * in stores and RequireJS.
 *
 * This is used in order to support versioning for components, and uniquely
 * identify non-component dependencies.
 *
 * Behavior:
 * Returns <manifestId>_<manifestVersion>.
 * If a name is provided returns the <manifestId>_<manifestVersion>/<name>.
 */
function normalizeName(manifest, name) {
    if (name) {
        return _normalizeManifestId(manifest) + "/" + name;
    }
    else {
        return _normalizeManifestId(manifest);
    }
}
function _normalizeManifestId(manifest) {
    return Object(_utilities_normalizeComponentId__WEBPACK_IMPORTED_MODULE_0__["default"])(manifest.id, manifest.version);
}
/**
 * This is only used for components that have a failover path (so far, react and react-dom).
 * As the failover path is used when there is no component, they work via its name,
 * but as opposed to the 'path' dependencies, they are unique in SPFx, like a component.
 *
 * They return the name directly, prepended by the component base URL.
 */
function normalizeFailoverPathName(name) {
    return name;
}


/***/ }),

/***/ "TUD0":
/*!******************************************!*\
  !*** ./lib/requirejs/RequireJsLoader.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stores/ManifestStore */ "Eke5");
/* harmony import */ var _stores_AddressStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../stores/AddressStore */ "F+Lb");
/* harmony import */ var _utilities_resolveAddress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/resolveAddress */ "W2kl");
/* harmony import */ var _utilities_isCorsEnabled__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities/isCorsEnabled */ "ASbA");
/* harmony import */ var _normalizeName__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./normalizeName */ "R8e+");
/* harmony import */ var _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../error/ErrorBuilder */ "ff4n");
/* harmony import */ var _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities/telemetryConstants */ "4mHd");
/* harmony import */ var _utilities_SPLoaderFlights__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utilities/SPLoaderFlights */ "dQRF");
// Copyright (c) Microsoft. All rights reserved.
/// <reference path="./requirejs.d.ts" />










var REQUIREJS_LOAD_TIMEOUT_IN_SECONDS = 90;
/**
 * Loader for RequireJS.
 * Provides the instance of RequireJS and allows methods for configuration.
 */
var RequireJsLoader = /** @class */ (function () {
    function RequireJsLoader(serviceScope) {
        this._configuredFailoverPaths = [];
        /**
         * Map to track duplicate module names, in the form { newModuleName -> originalModuleName }
         * There are case where 2 different components have different ids, but are pointing to the same script.
         * RequireJS doesn't accept that, so before calling require([modules], callback) it gets the original
         * module name, so it will load the right component.
         */
        this._duplicateModuleNames = new Map();
        this._checkDependencies = this._checkDependencies.bind(this);
        this._initialize();
    }
    Object.defineProperty(RequireJsLoader.prototype, "loadEntryPointErrorProcessors", {
        get: function () {
            return [this._checkDependencies];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequireJsLoader.prototype, "loadComponentDependencyErrorProcessors", {
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequireJsLoader.prototype, "loadPathDependencyErrorProcessors", {
        get: function () {
            return [this._checkDependencies];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Ensures that the module is present in RequireJS for the component manifest.
     * In order to do so, it removes any pre-existing module that was already loaded.
     */
    RequireJsLoader.prototype.ensure = function (manifest, module) {
        var name = Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(manifest);
        return this._ensure(name, module);
    };
    /**
     * Calls actual RequireJS config()
     */
    RequireJsLoader.prototype.requireConfig = function (config) {
        this._requirejs.config(config);
    };
    RequireJsLoader.prototype.load = function (manifest, name, globalName) {
        return this.requireLoad(Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(manifest, name), globalName)
            .then(function (module) {
            if (!name && manifest.loaderConfig.exportName) { // Only do this for the entry point, that has no name
                return module[manifest.loaderConfig.exportName];
            }
            else {
                return module;
            }
        });
    };
    RequireJsLoader.prototype.loadFromFailoverPath = function (name) {
        return this.requireLoad(Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["normalizeFailoverPathName"])(name));
    };
    /**
     * Calls RequireJS require()
     * Catches exceptions and returns a rejected promise with the error from RequireJS
     */
    RequireJsLoader.prototype.requireLoad = function (name, globalName) {
        var _this = this;
        // Check if the module name points to a duplicate script
        if (this._duplicateModuleNames.has(name)) {
            name = this._duplicateModuleNames.get(name);
        }
        try {
            return this._requirePromise(name).then(function (module) {
                return _this._ensureProperModuleLoaded(name, module, globalName);
            }).catch(function (error) {
                return _this._handleRequireJsError(name, error, globalName);
            });
        }
        catch (error) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadComponentLogSource"], error, RequireJsLoader._requireEventName);
            return Promise.reject(error);
        }
    };
    RequireJsLoader.prototype.delete = function (manifest) {
        return this.requireDelete(manifest);
    };
    /**
     * Calls RequireJS undef() with the name matching the input manifest.
     * Also removes the script tag from the head, so RequireJS will request the script again.
     */
    RequireJsLoader.prototype.requireDelete = function (manifest) {
        var normalizedName = Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(manifest);
        this._requirejs.undef(normalizedName);
        var scriptTags = document.getElementsByTagName('script');
        for (var i = 0; i < scriptTags.length; i++) {
            var scriptTag = scriptTags[i];
            if (normalizedName === scriptTag.getAttribute('data-requiremodule')) {
                scriptTag.parentNode.removeChild(scriptTag);
                break;
            }
        }
    };
    /**
     * For a module name, returns the URL that RequireJS is configured with.
     * @param name - Module name to request the URL from.
     */
    RequireJsLoader.prototype.getConfiguredUrl = function (name) {
        return this.requireContext.config.paths[name];
    };
    /**
     * Sets the config for RequireJS. Handles global exports, renames the dependencies.
     * Also sets AddressStore with the right mapping between script and URL.
     */
    RequireJsLoader.prototype.configure = function (manifest) {
        var resources = manifest.loaderConfig.scriptResources;
        var pathConfig = {};
        var currentMapConfig = {};
        var shimConfig = {};
        for (var name_1 in resources) {
            if (resources.hasOwnProperty(name_1)) {
                this._configureResource(name_1, resources[name_1], manifest, pathConfig, currentMapConfig, shimConfig);
            }
        }
        var normalizedName = Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(manifest);
        var mapConfig = {};
        mapConfig[normalizedName] = currentMapConfig;
        this.requireConfig({
            paths: pathConfig,
            map: mapConfig,
            shim: shimConfig
        });
        // There's a global __spfxPreloadedModules that may host the define arguments for preloaded components.
        // This ensures that RequireJS will automatically load them if they are present.
        if (RequireJsLoader._window.define &&
            RequireJsLoader._window.__spfxPreloadedModules &&
            RequireJsLoader._window.__spfxPreloadedModules.hasOwnProperty(normalizedName)) {
            var args = RequireJsLoader._window.__spfxPreloadedModules[normalizedName];
            RequireJsLoader._window.define(args.id, args.deps, args.f);
            delete RequireJsLoader._window.__spfxPreloadedModules[normalizedName];
        }
    };
    /**
       * Gets an array of missing dependencies hat failed to load.
       */
    RequireJsLoader.prototype.getMissingDependencies = function (moduleName) {
        var registryEntry = this.requireContext.registry[moduleName];
        var missingDependencies = [];
        if (registryEntry) {
            for (var _i = 0, _a = registryEntry.depMaps; _i < _a.length; _i++) {
                var dependency = _a[_i];
                if (this.requireContext.defined.hasOwnProperty(dependency.id) &&
                    this.requireContext.defined[dependency.id] === undefined) {
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadComponentLogSource"], new Error("Dependency \"" + dependency.id + "\" not found for module \"" + moduleName + "\""), RequireJsLoader._requireEventName);
                    missingDependencies.push(dependency.id);
                }
            }
        }
        return missingDependencies;
    };
    /**
     * Ensures that the module is present in RequireJS with the defined name.
     * In order to do so, it removes any pre-existing module that was already loaded.
     */
    RequireJsLoader.prototype._ensure = function (name, module) {
        this._requirejs.undef(name);
        this._define(name, [], function () { return module; });
        this._requirejs([name]);
    };
    RequireJsLoader.prototype._configureResource = function (name, resource, manifest, pathConfig, mapConfig, shimConfig) {
        if (resource.type === 'component') {
            var componentResource = resource;
            this._configureComponentResource(name, componentResource, manifest, pathConfig, mapConfig, shimConfig);
        }
        else { // path or localizedPath
            this._configurePathResource(name, resource, manifest, pathConfig, mapConfig, shimConfig);
        }
    };
    RequireJsLoader.prototype._configurePathResource = function (name, resource, manifest, pathConfig, mapConfig, shimConfig) {
        // Step 1: Set map configuration with the normalized name.
        // The normalized name of the entry point is the name of the component (i.e. <id>_<version>)
        // Other path dependencies have the resource name appended (i.e. <id>_<version>/<name>)
        var normalizedName;
        if (name === manifest.loaderConfig.entryModuleId) { // the entry point of the module
            normalizedName = Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(manifest);
        }
        else {
            normalizedName = Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(manifest, name);
            mapConfig[name] = normalizedName;
        }
        // Step 2: Set path configuration with the URL of the resource.
        // If the URL for the resource is already used by another manifest, we re-use that normalized name.
        var address = this._resolveAddress(manifest, name);
        var existingNormalizedNameForAddress = _stores_AddressStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.getNormalizedName(address);
        if (existingNormalizedNameForAddress) {
            mapConfig[name] = existingNormalizedNameForAddress;
            this._duplicateModuleNames.set(normalizedName, existingNormalizedNameForAddress);
        }
        else {
            pathConfig[normalizedName] = address;
            _stores_AddressStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.set(normalizedName, address);
        }
        // Step 3: Set shim configuration with global names and dependencies, if applicable.
        // Only path configurations (not localized path configurations) support it.
        var pathResource = resource;
        if (pathResource) {
            // There are some issues with JQuery and Yammer using RequireJS that we can self-recover.
            // This does nothing if JQuery or Yammer are not dependencies of the component.
            this._fixUpJQueryKnownIssues(name, manifest, pathResource, manifest.loaderConfig.scriptResources);
            this._fixUpYammerKnownIssues(name, manifest, pathResource);
            if (pathResource.globalName) {
                shimConfig[normalizedName] = {
                    exports: pathResource.globalName,
                    deps: pathResource.globalDependencies
                };
            }
        }
    };
    RequireJsLoader.prototype._configureComponentResource = function (name, moduleConfiguration, manifest, pathConfig, mapConfig, shimConfig) {
        // Map the dependency to the normalized name of the component.
        var resourceManifest = _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_2__["default"].instance.tryGetManifest(moduleConfiguration.id, moduleConfiguration.version);
        if (resourceManifest) {
            mapConfig[name] = Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(resourceManifest);
        }
        if (moduleConfiguration.failoverPath) {
            // Multiple components can have the same dependencies with failover paths. Configure only once.
            if (this._configuredFailoverPaths.indexOf(name) === -1) {
                var normalizedName = Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["normalizeFailoverPathName"])(name);
                // Store the address both in RequireJS and the AddressStore for the SPFx loader.
                pathConfig[normalizedName] = this._resolveAddress(manifest, name);
                _stores_AddressStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.set(normalizedName, this._resolveAddress(manifest, name));
                this._configuredFailoverPaths.push(name);
            }
        }
    };
    RequireJsLoader.prototype._fixUpJQueryKnownIssues = function (name, manifest, resource, resources) {
        var jqueryString = 'jquery';
        var jQueryString = 'jQuery';
        var jqueryuiString = 'jqueryui';
        // Fix-up: Some customers declared jQuery dependency without explicitly declaring a global name in the manifest
        // Fix-up: Some customers declared the global as 'jquery' instead of 'jQuery'
        // RequireJS doesn't work properly in either of those cases
        this._fixWrongGlobalName(name, jqueryString, jqueryString, jQueryString, manifest, resource);
        // Fix-up: Some customers declare JQuery UI without the dependency on JQuery
        if (name.toLowerCase() === jqueryuiString &&
            (!resource.globalDependencies || resource.globalDependencies.length === 0)) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadComponentLogSource"], "Fixing up JQueryUI path dependency for component \"" + manifest.id + "\" (" + manifest.alias + ")");
            if (resources[jqueryString]) {
                resource.globalDependencies = [jqueryString];
            }
            else if (resources[jQueryString]) {
                resource.globalDependencies = [jQueryString];
            }
            else {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadComponentLogSource"], "Didn't find JQuery path dependency in \"" + manifest.id + "\" (" + manifest.alias + ") to fix JQuery UI");
            }
        }
    };
    RequireJsLoader.prototype._fixUpYammerKnownIssues = function (name, manifest, resource) {
        // Fix-up: Some customers declared yammer dependency without explicitly declaring a global name in the manifest
        // Fix-up: Some customers declared the global as 'yammer' instead of 'yam'
        var yammerString = 'yammer';
        var yamString = 'yam';
        this._fixWrongGlobalName(name, yammerString, yammerString, yamString, manifest, resource);
    };
    RequireJsLoader.prototype._fixWrongGlobalName = function (name, expectedName, knownBadName, expectedGlobalName, manifest, resource) {
        if ((name.toLowerCase() === expectedName && !resource.globalName)
            || resource.globalName === knownBadName) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadComponentLogSource"], "Fixing up wrong \"" + name + "\" path dependency for component \"" + manifest.id + "\" (" + manifest.alias + ")");
            resource.globalName = expectedGlobalName;
        }
    };
    Object.defineProperty(RequireJsLoader.prototype, "requireContext", {
        get: function () {
            return this._requirejs.s.contexts._; // tslint:disable-line:no-any
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Executes require([moduleName]) with the provided module name, returning a promise instead of callbacks.
     * @param moduleName - Name of the module to load with require()
     */
    RequireJsLoader.prototype._requirePromise = function (moduleName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._requirejs([moduleName], function (module) { return resolve(module); }, function (error) { return reject(error); });
        });
    };
    /**
     * If RequireJS is not loaded already, it will load it.
     * If it's loaded, it just takes the necessary variables from the window.
     */
    RequireJsLoader.prototype._initialize = function () {
        if (!this._isRequireJsLoaded()) {
            this._loadRequireJs();
        }
        else {
            this._setRequireJsLocalVariables();
        }
        var config = { waitSeconds: REQUIREJS_LOAD_TIMEOUT_IN_SECONDS };
        // <script crossorigin="anonymous"> enables scripts be transparent to service workers
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1106 /* AkamaiCrossOrigin */)) {
            config.onNodeCreated = function (node, c, moduleName, url) {
                if (Object(_utilities_isCorsEnabled__WEBPACK_IMPORTED_MODULE_5__["default"])(url)) {
                    node.setAttribute('crossorigin', 'anonymous');
                }
            };
        }
        // Ensure that the wait time for load is enough
        this.requireConfig(config);
    };
    RequireJsLoader.prototype._loadRequireJs = function () {
        if (!_utilities_SPLoaderFlights__WEBPACK_IMPORTED_MODULE_9__["default"]._loadRequireJSOnWindow()) {
            // Load RequireJS
            var requirejs_1 =  false
                ? undefined
                : __webpack_require__(/*! exports-loader?requirejs,require,define!../../blobs/requirejs/2.1.20/require.min */ "esv8");
            // Set the output in the window, for compatibility
            RequireJsLoader._window.requirejs = requirejs_1.requirejs;
            RequireJsLoader._window.require = requirejs_1.require;
            RequireJsLoader._window.define = requirejs_1.define;
        }
        else {
            // using raw-loader ensures the module is loaded with the correct global (window) context
             false
                ? undefined
                : eval.call(window, __webpack_require__(/*! !raw-loader!../../blobs/requirejs/2.1.20/require.min */ "5TKm"));
        }
        // Provide a base configuration for RequireJS
        var requireJsConfig = {
            baseUrl: RequireJsLoader._invalidBaseUrl
        };
        this._setRequireJsLocalVariables();
        this.requireConfig(requireJsConfig);
    };
    /**
     * Returns true if RequireJS has been loaded and is in the window variable
     */
    RequireJsLoader.prototype._isRequireJsLoaded = function () {
        return (RequireJsLoader._window.requirejs !== undefined &&
            RequireJsLoader._window.require !== undefined &&
            RequireJsLoader._window.define !== undefined);
    };
    /**
     * Sets the needed RequireJS variables in the RequireJsLoader to avoid going to the window
     * variable every time.
     */
    RequireJsLoader.prototype._setRequireJsLocalVariables = function () {
        this._requirejs = RequireJsLoader._window.requirejs;
        this._define = RequireJsLoader._window.define;
    };
    /**
     * Helper method for RequireJS loader.
     * RequireJS takes addresses without the js extension, so this calls the real resolveAddress and removes that
     */
    RequireJsLoader.prototype._resolveAddress = function (manifest, resourceName) {
        var address = Object(_utilities_resolveAddress__WEBPACK_IMPORTED_MODULE_4__["default"])(manifest, resourceName);
        // Remove .js extension in the end
        address = address.replace(/.js$/, '');
        return address;
    };
    /**
     * Resolves with the correct loaded module, when applicable.
     *
     * If the module is defined by a global variable, it returns the object in the global variable.
     * If the module has been loaded correctly, it returns the loaded module.
     * If the module failed to load and it's an SPFx component, we try to load a different version of the same component.
     *
     * This happens because if the version in the manifest and the version in the module name don't match,
     * RequireJS has a weird behavior where it loads the component but doesn't return it.
     */
    // tslint:disable-next-line:no-any
    RequireJsLoader.prototype._ensureProperModuleLoaded = function (moduleName, module, globalName) {
        if (globalName) {
            if (window.hasOwnProperty(globalName)) {
                var returnValue = window[globalName]; // tslint:disable-line:no-any
                this._ensure(moduleName, returnValue);
                return Promise.resolve(returnValue);
            }
            else {
                // Current customers may load path dependencies with the wrong global name.
                // If the global variable is not found, return an empty object to "succeed" the load.
                var error = _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_7__["default"].buildScriptFailedToCreateGlobalError(globalName, this.getConfiguredUrl(moduleName));
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadComponentLogSource"], error);
                // Public warning to advertise the configuration mistake, without failing the load.
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Log"].warn(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadComponentLogSource"].id, error.message);
                return Promise.resolve({});
            }
        }
        else if (module === undefined && this._isSpfxComponent(moduleName)) {
            return this._requireLoadForDifferentModuleId(moduleName);
        }
        else {
            return Promise.resolve(module);
        }
    };
    /**
     * When RequireJS rejects the load with an error, it can be due to different root causes.
     * If the module is set in the global, the load may fail but the module be correctly loaded in the global scope,
     * in that case we fix up RequireJS internals and return the global object.
     *
     * If there is a version mismatch between the version in the manifest and the version in the JS code,
     * RequireJS may fail.
     * In that case we try to load a different version of the same component.
     *
     * Otherwise, it rejects with the original error.
     */
    RequireJsLoader.prototype._handleRequireJsError = function (moduleName, error, globalName) {
        if (globalName && window.hasOwnProperty(globalName)) {
            var returnValue = window[globalName]; // tslint:disable-line:no-any
            this._ensure(moduleName, returnValue);
            return Promise.resolve(returnValue);
        }
        else if (this._isOrphanedVersionLoaded(moduleName)) {
            return this._requireLoadForDifferentModuleId(moduleName, error);
        }
        else {
            return Promise.reject(error);
        }
    };
    /**
     * Returns true if RequireJS loaded a module that matches the component id with a different version.
     * This only applies to to mismatches between manifest and bundle, not between 2 different manifest versions.
     */
    RequireJsLoader.prototype._isOrphanedVersionLoaded = function (moduleName) {
        var _this = this;
        var componentId = this._extractComponentIdFromModuleName(moduleName);
        // tslint:disable-next-line:no-any
        var registry = this.requireContext.registry;
        var registryIds = Object.keys(registry);
        // The loaded module doesn't match the requested one, but it's the same component's entry point
        return registryIds
            .map(function (id) { return moduleName !== id && id.indexOf(componentId) === 0 && _this._isSpfxComponent(id); })
            .reduce(function (prev, curr) { return prev || curr; }, false);
    };
    /**
     * Returns true if the module name corresponds to an SPFx component.
     * SPFx components have module name in the form of "<componentId>_<version>"
     */
    RequireJsLoader.prototype._isSpfxComponent = function (moduleName) {
        if (moduleName.split('/').length > 1) {
            return false; // This is a path dependency, not a component itself
        }
        var substrings = moduleName.split('_');
        return substrings.length === 2 && _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].isValid(substrings[0]) && _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Version"].isValid(substrings[1]);
    };
    /**
     * Returns the component id out of the module name.
     * Module names are generated based on "<componentId>_<version>"
     */
    RequireJsLoader.prototype._extractComponentIdFromModuleName = function (moduleName) {
        return moduleName.split('_')[0];
    };
    /**
     * Looks at the path to see if it is a provider hosted app.  If it is, it modifies the existing
     * module name to match the provider hosted app js module name and then loads the component.  If
     * its not that case it looks at the registry of RequireJS to find another version of the same
     * component as moduleName, if found, it configures RequireJS with the same dependency resolution
     * (that comes from the manifest) and ensuring that the path points only to the found version,
     * and it loads the component.
     */
    RequireJsLoader.prototype._requireLoadForDifferentModuleId = function (moduleName, error) {
        // tslint:disable-next-line:no-any
        var registry = this.requireContext.registry;
        var requirejsInternalConfig = this.requireContext.config;
        var requestedComponentId = this._extractComponentIdFromModuleName(moduleName);
        var requestedPath = requirejsInternalConfig.paths[moduleName];
        if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('5A521104-FCA6-4265-97B7-F3D955EE9923'), '04/25/2019', 'Loading SaaS solutions with RequireJS') &&
            requestedPath.indexOf('/sp-provider-hosted-web-part') !== -1) {
            // The provider hosted web part has js files with a fixed guid (given below), but
            // each instance of a webpart gets it's own unique guid which doesn't match the JS.
            // Therefore when we see this we replace it automatically and retry
            var loadedModuleName = '4fca678e-55b6-46c8-b823-dd875dfdb951_1.0.0';
            this._replaceModuleInConfig(requirejsInternalConfig, loadedModuleName, moduleName, requestedPath);
            // Load the right component
            return this._requirePromise(loadedModuleName);
        }
        else {
            for (var _i = 0, _a = Object.keys(registry); _i < _a.length; _i++) {
                var loadedModuleName = _a[_i];
                var loadedComponentId = this._extractComponentIdFromModuleName(loadedModuleName);
                if (requestedComponentId === loadedComponentId && moduleName !== loadedModuleName) {
                    this._replaceModuleInConfig(requirejsInternalConfig, loadedModuleName, moduleName, requirejsInternalConfig.paths[moduleName]);
                    // Load the right component
                    return this._requirePromise(loadedModuleName);
                }
            }
        }
        // if no component found
        return Promise.reject(error ? error : new Error("Unknown error when loading module \"" + moduleName + "\""));
    };
    RequireJsLoader.prototype._replaceModuleInConfig = function (requirejsInternalConfig, existingModuleName, moduleName, modulePath) {
        // Create a RequireJS configuration for the other version of the component
        var map = {}; // Definition from requirejs.d.ts
        map[existingModuleName] = requirejsInternalConfig.map[moduleName];
        var paths = {};
        paths[existingModuleName] = modulePath;
        this._requirejs.config({
            map: map,
            paths: paths
        });
        // Remove the definition (including the <script> tag) of any previously load of the same component
        // Otherwise RequireJS can't load the module again
        this._requirejs.undef(moduleName);
        this._requirejs.undef(existingModuleName);
        // Avoid two path entries going to the same path
        requirejsInternalConfig.paths[moduleName] = "SPFx: Use " + existingModuleName + " instead";
    };
    /**
     * Checks the that all dependencies for a module are found.
     * If the response is not successful, it throws the appropriate error.
     * @param manifest - Manifest where the resource is defined
     * @param name - Name of the resource to check
     */
    RequireJsLoader.prototype._checkDependencies = function (manifest, name) {
        var moduleName = Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(manifest, name);
        var missingDependencies = this.getMissingDependencies(moduleName);
        if (missingDependencies.length > 0) {
            return Promise.reject(_error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_7__["default"].buildModuleHasFailedDependencyError(moduleName, missingDependencies.join(', ')));
        }
        return Promise.resolve();
    };
    RequireJsLoader.serviceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["ServiceKey"].create('sp-loader:RequireJsLoader', RequireJsLoader);
    RequireJsLoader._requireEventName = 'RequireJS.require';
    /**
     * This is the configured base URL for RequireJS.
     * When a user tries to call RequireJS with a relative path, an error will show this as the base URL.
     *
     * Example:
     * require("myModule") => Error: https://relative-path.invalid/myModule not found
     */
    RequireJsLoader._invalidBaseUrl = 'https://relative-path.invalid/';
    RequireJsLoader._window = window;
    return RequireJsLoader;
}());
/* harmony default export */ __webpack_exports__["default"] = (RequireJsLoader);


/***/ }),

/***/ "U29/":
/*!****************************************!*\
  !*** ./lib/systemjs/SystemJsLoader.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stores/ManifestStore */ "Eke5");
/* harmony import */ var _stores_AddressStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../stores/AddressStore */ "F+Lb");
/* harmony import */ var _utilities_resolveAddress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/resolveAddress */ "W2kl");
/* harmony import */ var _utilities_isCorsEnabled__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities/isCorsEnabled */ "ASbA");
/* harmony import */ var _normalizeName__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./normalizeName */ "Edzh");
/* harmony import */ var _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/telemetryConstants */ "4mHd");
/* harmony import */ var _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../error/ErrorBuilder */ "ff4n");
/* harmony import */ var _SystemsJs_resx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SystemsJs.resx */ "Inam");
// Copyright (c) Microsoft. All rights reserved.
/// <reference path="./es-module-loader.d.ts" />










/**
 * Loader for SystemJS.
 * Provides the instance of SystemJS and allows methods for configuration.
 */
var SystemJsLoader = /** @class */ (function () {
    function SystemJsLoader(serviceScope) {
        this._configuredFailoverPaths = [];
        this._checkEntryPointDependenciesError = this._checkEntryPointDependenciesError.bind(this);
        this._initialize();
    }
    Object.defineProperty(SystemJsLoader.prototype, "loadEntryPointErrorProcessors", {
        get: function () {
            return [this._checkEntryPointDependenciesError];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemJsLoader.prototype, "loadComponentDependencyErrorProcessors", {
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemJsLoader.prototype, "loadPathDependencyErrorProcessors", {
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    SystemJsLoader.prototype.ensure = function (manifest, module) {
        var name = Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(manifest);
        return this._ensure(name, module);
    };
    /**
     * If a module hasn't been loaded with the specified name,
     * it created a new module and sets it in SystemJS
     */
    SystemJsLoader.prototype._ensure = function (name, module) {
        var system = this._system;
        if (!system.has(name)) {
            system.set(name, system.newModule(module));
        }
    };
    SystemJsLoader.prototype.delete = function (manifest) {
        return this._delete(Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(manifest));
    };
    /**
     * If a module has been loaded with the specified name,
     * it delete it from SystemJS
     */
    SystemJsLoader.prototype._delete = function (name) {
        var system = this._system;
        if (system.has(name)) {
            system.delete(name);
        }
    };
    /**
     * Calls actual System.config()
     */
    SystemJsLoader.prototype.systemConfig = function (config) {
        this._originalSystemConfig.call(this._system, config);
    };
    SystemJsLoader.prototype.load = function (manifest, name, globalName) {
        var _this = this;
        return this.systemImport(Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(manifest, name))
            .then(function (module) {
            var retValue = module;
            // Save "exportedModuleName" in SystemJS
            if (!name && manifest.loaderConfig.exportName) {
                retValue = module[manifest.loaderConfig.exportName];
                _this._ensure(Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(manifest, manifest.loaderConfig.exportName), retValue);
            }
            return retValue;
        });
    };
    SystemJsLoader.prototype.loadFromFailoverPath = function (name) {
        return this.systemImport(Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["normalizeFailoverPathName"])(name));
    };
    /**
     * Calls System.import()
     * Catches exceptions and returns a rejected promise with the error from SystemJS
     */
    SystemJsLoader.prototype.systemImport = function (name) {
        try {
            return this._system.import(name);
        }
        catch (error) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_7__["loadComponentLogSource"], error, SystemJsLoader.systemImportEventName);
            return Promise.reject(error);
        }
    };
    /** Calls System.delete() with the name matching the input manifest */
    SystemJsLoader.prototype.systemDelete = function (manifest) {
        this._system.delete(Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(manifest));
    };
    /**
     * Sets the config for SystemJS. Handles global exports, renames the dependencies.
     * Also sets AddressStore with the right mapping between script and URL.
     */
    SystemJsLoader.prototype.configure = function (manifest) {
        var resources = manifest.loaderConfig.scriptResources;
        var depsMap = {};
        // Used only for failover paths. So far, this impacts react and react-dom on debug manifests.
        var globalDepsMap = {};
        for (var name_1 in resources) {
            if (resources[name_1].type === 'component') {
                var moduleConfiguration = resources[name_1];
                var resourceManifest = _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_2__["default"].instance.tryGetManifest(moduleConfiguration.id, moduleConfiguration.version);
                if (resourceManifest) {
                    depsMap[name_1] = Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(resourceManifest);
                }
                if (moduleConfiguration.failoverPath) {
                    if (this._configuredFailoverPaths.indexOf(name_1) === -1) {
                        var normalizedName = Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["normalizeFailoverPathName"])(name_1);
                        _stores_AddressStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.set(normalizedName, Object(_utilities_resolveAddress__WEBPACK_IMPORTED_MODULE_4__["default"])(manifest, name_1));
                        globalDepsMap[name_1] = normalizedName;
                        this._configuredFailoverPaths.push(name_1);
                    }
                }
            }
            else { // path or localizedPath
                var normalizedName = void 0;
                if (name_1 === manifest.loaderConfig.entryModuleId) { // the entry point of the module
                    normalizedName = Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(manifest);
                }
                else {
                    normalizedName = Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(manifest, name_1);
                    depsMap[name_1] = normalizedName;
                }
                var address = Object(_utilities_resolveAddress__WEBPACK_IMPORTED_MODULE_4__["default"])(manifest, name_1);
                _stores_AddressStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.set(normalizedName, address);
                var resource = resources[name_1];
                this._configureMetadata(normalizedName, address, resource);
            }
        }
        var packages = {};
        packages[Object(_normalizeName__WEBPACK_IMPORTED_MODULE_6__["default"])(manifest)] = {
            map: depsMap,
            defaultExtension: false
        };
        var config = {
            packages: packages
        };
        this.systemConfig(config);
        if (Object.keys(globalDepsMap).length) {
            this.systemConfig({
                map: globalDepsMap
            });
        }
    };
    /**
     * Returns the dependencies of a component, as detected by SystemJS when importing the module.
     * This method ignores the manifest dependencies and looks only at the JS file instead.
     * Used as a helper to find mismatching dependencies.
     *
     * @returns Array with the dependencies in a component. Empty array if dependencies could not be found.
     */
    SystemJsLoader.prototype.getDependencies = function (manifest) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(manifest, 'manifest');
        var defined = this._system.defined; // tslint:disable-line:no-any
        // Empirically, this is saved in 'https://relative-path.invalid/<id>_<version>'
        var definedName = this.getDefinedId(manifest);
        var componentDefinition = defined[definedName];
        if (!componentDefinition) {
            return [];
        }
        return componentDefinition.deps;
    };
    /**
     * Executes the base configuration for SystemJS. It should be private but it's public
     * so STS pages can modify scriptLoad to be false.
     */
    SystemJsLoader.prototype._baseSystemConfig = function (pluginName, scriptLoad) {
        var systemConfig = {
            meta: {
                '*': {
                    loader: pluginName,
                    scriptLoad: scriptLoad
                }
            }
        };
        this.systemConfig(systemConfig);
    };
    SystemJsLoader.prototype._initialize = function () {
        this._system = this._loadSystemJs();
        this._setCustomLoader(SystemJsLoader.pluginName, this._system);
        // Create a default SystemJS config that passes everything to our loader.
        var systemConfig = {
            baseURL: SystemJsLoader._invalidBaseUrl,
            defaultJsExtensions: false
        };
        this.systemConfig(systemConfig);
        this._baseSystemConfig(SystemJsLoader.pluginName, true);
    };
    SystemJsLoader.prototype._loadSystemJs = function () {
        // Load SystemJS
        var system =  false
            ? undefined
            // tslint:disable-next-line:max-line-length
            : __webpack_require__(/*! @microsoft/loader-raw-script!../../blobs/systemjs/0.19.25/dist/system.spfx */ "AvvH");
        // Hide System.config()
        this._originalSystemConfig = system.config;
        system.config = function (config) {
            throw new Error(_SystemsJs_resx__WEBPACK_IMPORTED_MODULE_9__["default"].systemConfigDisabledError);
        };
        return system;
    };
    SystemJsLoader.prototype._setCustomLoader = function (pluginName, system) {
        var loader = {
            /**
             * locate returns an address for a module name.
             * In the case of components it takes the normalized name, which is an absolute URL.
             * SystemJS gets the name as 'https://component-id.invalid/<id>', which has an entry
             * in the AddressStore.
             * If the AddressStore doesn't have an entry for the name, locate leaves the name unmodified.
             * This supports the scenario where people call System.import() with an absolute URL.
             * System.import() with a relative URL is not supported and will fail to fetch the module,
             * as the base URL is 'https://relative-path.invalid/'
             */
            locate: function (module) {
                var address = _stores_AddressStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.tryGetAddress(module.name);
                if (address) {
                    return address;
                }
                else {
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_7__["loadComponentLogSource"], "Address not found for module name: " + module.name + ". Using it as absolute URL.");
                    // If we don't have the address mapped, assume the name IS the URL to grab it
                    return module.name;
                }
            }
        };
        // Load the loader as a system module and then set the system config. We need to do this is this order, otherwise
        // SystemJS will try to load our loader with itself, and will throw.
        system.set(pluginName, system.newModule(loader));
    };
    /**
     * Returns the id used by SystemJS in System.defined.
     * This allows to browse through SystemJS internals for additional data, like the JS dependencies.
     */
    SystemJsLoader.prototype.getDefinedId = function (manifest) {
        return SystemJsLoader._invalidBaseUrl + manifest.id + '_' + manifest.version;
    };
    /**
     * Configures the SystemJS metadata with the crossOrigin parameter,
     * and if the resource has a globalName; sets the global name configuration.
     * The crossOrigin parameter is needed for the SPFx service worker to transparently
     * read cross-domain resources.
     */
    SystemJsLoader.prototype._configureMetadata = function (normalizedName, address, resource) {
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isEnabled(1106 /* AkamaiCrossOrigin */)) {
            var meta = {};
            // Support global names
            if (resource.globalName) {
                meta[normalizedName] = {
                    format: 'global',
                    exports: resource.globalName
                };
            }
            if (Object(_utilities_isCorsEnabled__WEBPACK_IMPORTED_MODULE_5__["default"])(address)) {
                (meta[normalizedName] || (meta[normalizedName] = {})).crossOrigin = 'anonymous';
            }
            var globalConfig = {
                meta: meta
            };
            this.systemConfig(globalConfig);
        }
        else {
            // Support global names
            if (resource && resource.globalName) {
                var meta = {};
                meta[normalizedName] = {
                    format: 'global',
                    exports: resource.globalName
                };
                var globalConfig = {
                    meta: meta
                };
                this.systemConfig(globalConfig);
            }
        }
    };
    /**
     * Checks if the loaded JS dependencies match with dependencies declared in the manifest.
     * This can happen when a component is re-built but the manifest hasn't been modified.
     * If missing dependencies are found, it throws with an error stating the first mismatch.
     *
      * @param manifest - Manifest to check
      * @param name - Name of the entry point. Unused in this function.
     */
    SystemJsLoader.prototype._checkEntryPointDependenciesError = function (manifest, name) {
        var dependencies = this.getDependencies(manifest);
        var resources = manifest.loaderConfig.scriptResources;
        dependencies.forEach(function (depName) {
            if (!resources[depName]) {
                throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_8__["default"].buildModuleHasUndeclaredDependencyError(manifest, depName);
            }
        });
        return Promise.resolve();
    };
    SystemJsLoader.serviceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["ServiceKey"].create('sp-loader:SystemJsLoader', SystemJsLoader);
    SystemJsLoader.pluginName = 'sp-loader-resolver';
    SystemJsLoader.systemImportEventName = 'System.import';
    /**
     * This is the configured base URL for SystemJS.
     * When a user tries to call SystemJS with a relative path, an error will show this as the base URL.
     *
     * Example:
     * System.import("myModule") => Error: https://relative-path.invalid/myModule not found
     */
    SystemJsLoader._invalidBaseUrl = 'https://relative-path.invalid/';
    return SystemJsLoader;
}());
/* harmony default export */ __webpack_exports__["default"] = (SystemJsLoader);


/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "Uk6p":
/*!*******************************************!*\
  !*** ./lib/loader/BaseComponentLoader.js ***!
  \*******************************************/
/*! exports provided: BaseComponentLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseComponentLoader", function() { return BaseComponentLoader; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _debug_DebugManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../debug/DebugManager */ "GV8Z");
/* harmony import */ var _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stores/ComponentStore */ "eaMA");
/* harmony import */ var _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../stores/ManifestStore */ "Eke5");
/* harmony import */ var _utilities_componentConstants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/componentConstants */ "kd3Z");
/* harmony import */ var _utilities_KillSwitches__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities/KillSwitches */ "HLbO");
/* harmony import */ var _utilities_PlatformLoader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities/PlatformLoader */ "fjGJ");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */







/**
 * The base class for a component loader.
 * Contains all implementation of the component loader that is agnostic to the internal module loader.
 *
 * @alpha
 */
var BaseComponentLoader = /** @class */ (function () {
    // Initialization
    /**
     * @internal
     */
    function BaseComponentLoader(serviceScope) {
        this._isInitialized = false;
        if (!BaseComponentLoader._headElement) {
            BaseComponentLoader._headElement = document.getElementsByTagName('head')[0];
        }
        this._serviceScope = serviceScope;
    }
    /**
     * This is called by the page scripts to start loading the framework. Do not call it from your own code.
     * @internal
     */
    BaseComponentLoader.prototype._startApplication = function (preloadedData) {
        return _utilities_PlatformLoader__WEBPACK_IMPORTED_MODULE_6__["default"].startApplication(preloadedData, this._serviceScope).then(function (application) {
            // Normally non-SPFx environments locate their SPFx host application via a window variable
            // that our startup code assigns like this:
            //
            //   global.moduleLoaderPromise = global.spModuleLoader.start(spClientSidePageContext, handleFailure)
            //
            // However, in the case of the modern ListView, the "listview-spfx-host" loads after the main scripts,
            // which creates a race condition where window.moduleLoaderPromise sometimes might not be assigned yet
            // when their code tries to read it.  In that situation, they can register a callback like this:
            //
            // if (window['moduleLoaderPromise']) {
            //   window['moduleLoaderPromise'].then((application) => {
            //     doSomething(application);
            //   });
            // } else {
            //   window['_spLoaderCallback'] = function(application) {
            //     doSomething(application);
            //   };
            // }
            //
            /* tslint:disable:no-string-literal */
            if (window['_spLoaderCallback']) {
                var _spLoaderCallback = window['_spLoaderCallback'];
                _spLoaderCallback(application);
            }
            /* tslint:enable:no-string-literal */
            return application;
        });
    };
    /**
     * Initializes the component loader.
     * Registers all manifests (including debug manifests, if it applies)
     * and sets up internal logic before allowing to load components.
     * @internal
     */
    BaseComponentLoader.prototype._initialize = function (preloadedData, bundledComponents, debugData) {
        if (this._isInitialized) {
            return;
        }
        // Set before the promise to ensure the async code is not called twice
        this._isInitialized = true;
        _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.registerPreloadedManifests(preloadedData);
        // We need to register the debug manifests before overriding the components
        if (debugData.debugManifests) {
            if (!debugData.registerAsNonDebug && !_utilities_KillSwitches__WEBPACK_IMPORTED_MODULE_5__["KillSwitches"].isDangerouslyEnableDebugKillSwitchActivated()) {
                _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.registerDebugManifests(debugData.debugManifests || []);
            }
            else {
                _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.registerManifests(debugData.debugManifests || [], debugData.registerAsNonDebug);
            }
        }
        this._listViewHostWorkaround(preloadedData);
        // Pins the bundled components except when it's using a debug loader
        if (!debugData.debugLoader) {
            this._pinBundledComponents(bundledComponents);
        }
        this._overrideComponents(bundledComponents);
    };
    /**
     * Try and get a reference to a loaded component from a manifest.
     *
     * @param manifest - Manifest of the module to load.
     * @returns A reference to a component module by id and version or, if it does not exist, undefined.
     */
    BaseComponentLoader.prototype.tryGetLoadedComponent = function (manifest) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(manifest, 'manifest');
        return _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_2__["default"].instance.tryGetComponentReference(manifest.id, manifest.version);
    };
    /**
     * Resolve a component id and version, and load it.
     * If a manifest cannot be found, it requests the manifest to the server through the REST API.
     * If a manifest is not found and not present in the server, it rejects the promise.
     *
     * @param id      - The id of the component to load.
     * @param version - The version of the component to load. If version is not defined, the method
     *                    will load any version of the component.
     * @returns         A promise containing the loaded module.
     *
     * @alpha
     */
    BaseComponentLoader.prototype.loadComponentById = function (id, version) {
        var _this = this;
        var parsedId;
        try {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(id, 'id');
            parsedId = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(id).toString();
        }
        catch (error) {
            return Promise.reject(error);
        }
        var manifest = _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.tryGetManifest(parsedId, version);
        if (manifest) {
            return this.loadComponent(manifest);
        }
        else {
            return _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.requestManifest(parsedId, version)
                .then(function (newManifest) { return _this.loadComponent(newManifest); });
        }
    };
    /**
     * Registers manifests in the manifest store.
     *
     * @param manifests - The manifests to register in the store.
     *
     * @alpha
     */
    BaseComponentLoader.prototype.registerManifests = function (manifests) {
        _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.registerManifests(manifests, false);
    };
    Object.defineProperty(BaseComponentLoader.prototype, "_manifestReferences", {
        /**
       * All registered manifests.
       * Note that this returns the actual manifests, so modifying the
       * returned objects modifies the primary data, not a copy
       *
       * @readonly
       * @internal
       */
        get: function () {
            return _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.getRegisteredManifests();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Inserts a <link ... /> tag for a stylesheet.
     *
     * @param url - The CSS file URL.
     */
    BaseComponentLoader.prototype.loadCss = function (url) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(url, 'url');
        var linkTag = document.createElement('link');
        linkTag.rel = 'stylesheet';
        linkTag.type = 'text/css';
        linkTag.href = url;
        BaseComponentLoader._headElement.appendChild(linkTag);
    };
    // Internal methods
    /**
     * {@inheritDoc  ISPComponentLoader._loadDebugManifestsForWorkbench}
     *
     * @internal
     */
    BaseComponentLoader.prototype._loadDebugManifestsForWorkbench = function (manifestsFileUrl) {
        return _debug_DebugManager__WEBPACK_IMPORTED_MODULE_1__["DebugManager"].loadAndRegisterManifestsFile(this, manifestsFileUrl, /* registerAsNonDebug */ true).then();
    };
    /**
     * Get a component manifest from the component id and version.
     *
     * @param id      - GUID id of the component.
     * @param version - Version of the component. If version is not defined, the method
     *                    will return the manifest for any version of the component.
     * @returns         Manifest for the component.
     *
     * @alpha
     */
    BaseComponentLoader.prototype.tryGetManifestById = function (id, version) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(id, 'id');
        var parsedId = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(id).toString();
        return _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.tryGetManifest(parsedId, version);
    };
    /**
     * {@inheritdoc ManifestStore.requestManifest}
     *
     * @alpha
     */
    BaseComponentLoader.prototype.requestManifest = function (id, version) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(id, 'id');
        var parsedId = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(id).toString();
        return _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.requestManifest(parsedId, version);
    };
    /**
     * {@inheritDoc  ISPComponentLoader._unloadComponents}
     *
     * @internal
     */
    BaseComponentLoader.prototype._unloadComponents = function () {
        var _this = this;
        _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.getRegisteredManifests().forEach(function (manifest) {
            _this._unloadComponent(manifest);
        });
    };
    /**
     * SystemJS component loader overrides this function with a workaround required for the loader to work with
     * ListView pages.
     * @virtual
     */
    BaseComponentLoader.prototype._listViewHostWorkaround = function (preloadedData) {
        // Do nothing
    };
    /**
     * Pins the manifest for each component that is bundled in the assembly.
     * See ManifestStore._pinManifest() for details about pinning.
     */
    BaseComponentLoader.prototype._pinBundledComponents = function (bundledComponents) {
        for (var id in bundledComponents) {
            // Different versions of React may be loaded by components at a later time, so we should not pin that manifest.
            // React / ReactDOM are the only non-SPFx, non-internal packages that we add on an assembly.
            if (bundledComponents.hasOwnProperty(id) && id !== _utilities_componentConstants__WEBPACK_IMPORTED_MODULE_4__["reactComponentId"] && id !== _utilities_componentConstants__WEBPACK_IMPORTED_MODULE_4__["reactDomComponentId"]) {
                _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance._pinManifest(id);
            }
        }
    };
    /**
     * Overrides component definitions with existing components.
     * This is used for the assemblies to set up all the data.
     * This is dependent on the internal module loader (SystemJS, RequireJS) so each implementation has to write its own.
     */
    BaseComponentLoader.prototype._overrideComponents = function (bundledComponents) {
        var _this = this;
        Object.keys(bundledComponents).forEach(function (key) {
            _this._overrideComponent(key, bundledComponents[key]);
        });
    };
    return BaseComponentLoader;
}());



/***/ }),

/***/ "W2kl":
/*!*****************************************!*\
  !*** ./lib/utilities/resolveAddress.js ***!
  \*****************************************/
/*! exports provided: default, resolvePath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return resolveAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvePath", function() { return resolvePath; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stores_LocaleStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stores/LocaleStore */ "XZXY");
/* harmony import */ var _telemetryConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./telemetryConstants */ "4mHd");
/* harmony import */ var _Utilities_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Utilities.resx */ "lcN8");





/**
 * Given a manifest and a resource name returns the URL to the resource.
 *
 * For path or localizedPath dependencies, it returns the full URL to the resource.
 * For component dependencies, it returns the full URL to the failover path,
 * or returns an empty string if it doesn't exist.
 *
 * If the resource name is not present in the loader config, it throws an error.
 */
function resolveAddress(manifest, resourceName) {
    _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(manifest, 'manifest');
    _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(resourceName, 'resourceName');
    if (!manifest.loaderConfig.scriptResources.hasOwnProperty(resourceName)) {
        var error = new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Utilities_resx__WEBPACK_IMPORTED_MODULE_4__["default"].resourceNotFoundError, resourceName, manifest.id, manifest.alias));
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(_telemetryConstants__WEBPACK_IMPORTED_MODULE_3__["resolveAddressLogSource"], error);
        throw error;
    }
    var moduleConfiguration = manifest.loaderConfig.scriptResources[resourceName];
    var address = resolveModuleConfiguration(resourceName, moduleConfiguration);
    // Prepend the base URL if this isn't a fully-qualified URL.
    if (!address.match(/^https?\:\/\//i)) {
        // Replace this with shared URL concatenation logic. VSO#249681
        var moduleBaseUrl = manifest.loaderConfig.internalModuleBaseUrls[0].replace(/\/+$/, '');
        address = moduleBaseUrl + "/" + address;
    }
    return address;
}
/**
 * Resolves a IModuleConfiguration to a URL
 *
 * Take a look at the IModuleConfiguration documentation for more information.
 */
function resolveModuleConfiguration(moduleName, moduleConfiguration) {
    if (moduleConfiguration) {
        switch (moduleConfiguration.type) {
            case 'component':
                var failoverPath = moduleConfiguration.failoverPath;
                if (!failoverPath) {
                    throw new Error(_Utilities_resx__WEBPACK_IMPORTED_MODULE_4__["default"].noFailoverPathError);
                }
                return resolvePath(failoverPath);
            case 'path':
                return resolvePath(moduleConfiguration.path);
            case 'localizedPath':
                return resolvePath(resolveLocalizedModuleConfiguration(moduleConfiguration));
            case null: // tslint:disable-line:no-null-keyword
            case undefined:
            default: // tslint:disable-line:no-switch-case-fall-through
                return moduleName;
        }
    }
    else {
        return moduleName;
    }
}
/**
 * Resolves a path to the default or debug version of a script.
 *
 * If a debug version is present, it uses that. Otherwise uses the default one.
 * If the path is a string, it returns it unchanged.
 */
function resolvePath(path) {
    if (typeof path === 'string') {
        return path;
    }
    else {
        if (path.debug) {
            return path.debug;
        }
        else {
            return path.default;
        }
    }
}
/**
 * Resolves a localized module config to a path.
 */
function resolveLocalizedModuleConfiguration(moduleConfiguration) {
    // Workaround for temporary issue in SPOREL. VSO#279843
    var currentLocale = _stores_LocaleStore__WEBPACK_IMPORTED_MODULE_2__["default"].getLocale();
    if (moduleConfiguration.paths) {
        // This only applies when testing production manifests without the server
        if (currentLocale) {
            for (var locale in moduleConfiguration.paths) {
                if (locale && locale.toUpperCase() === currentLocale.toUpperCase() && moduleConfiguration.paths[locale]) {
                    return moduleConfiguration.paths[locale];
                }
            }
        }
    }
    return moduleConfiguration.defaultPath;
}


/***/ }),

/***/ "X+PM":
/*!*********************************************!*\
  !*** external "@microsoft/sp-page-context" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_X_PM__;

/***/ }),

/***/ "X2Mq":
/*!********************************************!*\
  !*** ./lib/debug/ensureDebugComponents.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ensureDebugComponents; });
var _debugComponentsPromise;
function ensureDebugComponents() {
    if (!_debugComponentsPromise) {
        _debugComponentsPromise = Promise.all(/*! import() | debug-prompt-components */[__webpack_require__.e("vendors~debug-prompt-components~developer-tools"), __webpack_require__.e("vendors~debug-prompt-components"), __webpack_require__.e("debug-prompt-components")]).then(__webpack_require__.bind(null, /*! ./debugComponents */ "bEFm"));
    }
    return _debugComponentsPromise;
}


/***/ }),

/***/ "XZXY":
/*!***********************************!*\
  !*** ./lib/stores/LocaleStore.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
  * @internal
  */
var LocaleStore = /** @class */ (function () {
    function LocaleStore() {
    }
    LocaleStore.getLocale = function () {
        return LocaleStore._locale;
    };
    LocaleStore.setLocale = function (locale) {
        LocaleStore._locale = locale;
    };
    LocaleStore._locale = undefined;
    return LocaleStore;
}());
/* harmony default export */ __webpack_exports__["default"] = (LocaleStore);


/***/ }),

/***/ "Y/fc":
/*!****************************************!*\
  !*** ./lib/stores/ManifestProvider.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__);




/**
 * @internal
 */
var ManifestProvider = /** @class */ (function () {
    function ManifestProvider(serviceScope, webAbsoluteUrl) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(serviceScope, 'serviceScope');
        this._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('ManifestProvider');
        this._webAbsoluteUrl = webAbsoluteUrl;
        this._pageContext = serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__["PageContext"].serviceKey);
        this._httpClient = serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__["SPHttpClient"].serviceKey);
    }
    /**
     * Given a component id and version, requests its manifest (and all its dependencies) to SharePoint
     * through a REST API.
     * Returns a promise with all the manifests.
     * @param componentId - Id of the requested component
     * @param version - Optional. Version of the requested component
     */
    ManifestProvider.prototype.tryGetManifest = function (componentId, version) {
        return this.tryGetManifests([{ id: componentId, version: version }]);
    };
    /**
     * Given an array of ids and versions, requests their manifest (and all their dependencies) to SharePoint
     * through a REST API.
     * Returns a promise with all the manifests.
     * @param ids - Array with all the id and version pairs
     */
    ManifestProvider.prototype.tryGetManifests = function (ids) {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('ManifestProvider.tryGetManifests');
        var webUrl = (this._pageContext.web && this._pageContext.web.absoluteUrl) || this._webAbsoluteUrl;
        return this._httpClient.post(webUrl + ManifestProvider._restApiUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__["SPHttpClient"].configurations.v1, {
            body: JSON.stringify({ components: ids })
        }).then(function (response) {
            if (!response.ok) {
                var error = new Error("GetClientSideComponents failed with HTTP status " + response.status);
                qosMonitor.writeUnexpectedFailure('UnsuccessfulResponse', error, { statusCode: response.status, correlationId: response.correlationId });
                throw error;
            }
            qosMonitor.writeSuccess({ correlationId: response.correlationId });
            return response.json().then(_this._extractManifests);
        }).catch(function (error) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(_this._logSource, error);
            qosMonitor.writeUnexpectedFailure(undefined, error);
            throw error;
        });
    };
    ManifestProvider.prototype._extractManifests = function (response) {
        return response.value
            .filter(function (qr) { return qr.Status === 0 && !!qr.Manifest; }) // Remove query results that weren't successful or empty manifests
            .map(function (qr) { return JSON.parse(qr.Manifest); }); // Create the manifest object out of the string
    };
    ManifestProvider._restApiUrl = '/_api/web/GetClientSideComponents';
    return ManifestProvider;
}());
/* harmony default export */ __webpack_exports__["default"] = (ManifestProvider);


/***/ }),

/***/ "Z6P1":
/*!*********************************!*\
  !*** ./lib/error/Error.resx.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_HyNcqqy05+791EWZRJ/Erg';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "aghm":
/*!*************************************!*\
  !*** ./lib/loader/loadComponent.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadComponent; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error/ErrorBuilder */ "ff4n");
/* harmony import */ var _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../stores/ComponentStore */ "eaMA");
/* harmony import */ var _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../stores/ManifestStore */ "Eke5");
/* harmony import */ var _utilities_resolveAddress__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities/resolveAddress */ "W2kl");
/* harmony import */ var _utilities_ResourceUrlChecker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/ResourceUrlChecker */ "cnPT");
/* harmony import */ var _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities/telemetryConstants */ "4mHd");
/* harmony import */ var _Loader_resx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Loader.resx */ "qoaT");
/* harmony import */ var _loc_Common_resx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../loc/Common.resx */ "8N74");











var FIRST_RETRY = 1;
var MAX_NUMBER_RETRIES = 3;
var LOAD_COMPONENT_IMPL_EVENT_NAME = 'loadComponentImpl';
/**
 * Loads a component from a manifest.
 *
 * @param manifest - Manifest of the module to load.
 * @returns          A promise containing the loaded module.
 */
function loadComponent(manifest, moduleLoader) {
    if (!manifest) {
        return Promise.reject(new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Loader_resx__WEBPACK_IMPORTED_MODULE_9__["default"].isUndefinedValidateError, 'manifest')));
    }
    // If the module has already been cached, return the cached value. Might not have been resolved yet
    var cachedModule = _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_4__["default"].instance.tryGetComponent(manifest.id, manifest.version);
    if (cachedModule) {
        return cachedModule;
    }
    var componentPromise = _loadComponentRetryStrategy(manifest, FIRST_RETRY, MAX_NUMBER_RETRIES, moduleLoader).catch(function (error) {
        // If it fails to load, the caller can then call loadComponent() again and not hit the cache
        _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_4__["default"].instance.deleteComponent(manifest.id, manifest.version);
        throw error;
    });
    // Synchronously store the component in the Component Store
    // This allows other callers to use the cached execution when trying to load it as a dependency.
    // If the execution failed, it would asynchronously delete it from the Component Store so it can be requested again.
    _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_4__["default"].instance.storeComponent(manifest.id, manifest.version, componentPromise);
    return componentPromise;
}
function _loadComponentRetryStrategy(manifest, currentRetryNumber, maxNumberRetries, moduleLoader) {
    if (currentRetryNumber === 1) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadComponentLogSource"], _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Loader_resx__WEBPACK_IMPORTED_MODULE_9__["default"].loadComponentLog, manifest.id, manifest.alias, manifest.version));
    }
    else {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadComponentLogSource"], _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Loader_resx__WEBPACK_IMPORTED_MODULE_9__["default"].loadComponentRetryLog, manifest.id, manifest.alias, currentRetryNumber, maxNumberRetries));
    }
    return _loadComponentImpl(manifest, moduleLoader)
        .then(function (component) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadComponentLogSource"], _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Loader_resx__WEBPACK_IMPORTED_MODULE_9__["default"].loadComponentEndLog, manifest.id, manifest.alias, manifest.version));
        return component;
    })
        .catch(function (error) {
        // If the attempt to load fails, the module loader deletes the module to try to load it again
        // Otherwise, the retry will get the module from the cache, thus failing again.
        moduleLoader.delete(manifest);
        if (currentRetryNumber < maxNumberRetries) {
            return _loadComponentRetryStrategy(manifest, currentRetryNumber + 1, maxNumberRetries, moduleLoader);
        }
        else {
            // All retries failed, so the user behavior will be affected. Log error instead of verbose
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadComponentLogSource"], new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_loc_Common_resx__WEBPACK_IMPORTED_MODULE_10__["default"].loadComponentMaxRetriesError, manifest.id, manifest.alias, maxNumberRetries)));
            throw error;
        }
    });
}
/**
 * Private method to load component.
 * Assumes that the manifest is not undefined, and the component hasn't been loaded yet.
 *
 * Configures the module loader for this component, loads the dependencies and the entry point,
 * and in case of failure it rejects the promise.
 */
function _loadComponentImpl(manifest, moduleLoader) {
    try {
        moduleLoader.configure(manifest);
    }
    catch (error) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadComponentLogSource"], error.message, LOAD_COMPONENT_IMPL_EVENT_NAME);
        return Promise.reject(error);
    }
    var componentDeps = [];
    var pathDeps = [];
    try {
        componentDeps = _loadComponentDependencies(manifest, moduleLoader);
    }
    catch (error) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadComponentLogSource"], error.message, LOAD_COMPONENT_IMPL_EVENT_NAME);
        return Promise.reject(error);
    }
    try {
        pathDeps = _loadPathDependencies(manifest, moduleLoader);
    }
    catch (error) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadComponentLogSource"], error.message, LOAD_COMPONENT_IMPL_EVENT_NAME);
        return Promise.reject(error);
    }
    // If any dependency fails, the result for the entry point is not reliable, so the load fails
    return Promise.all(componentDeps.concat(pathDeps)).then(function (components) {
        // If the component doesn't have an entryModuleId, we can return an empty object
        // This is used for component that only load dependencies but have no code, like JSOM
        if (!manifest.loaderConfig.entryModuleId) {
            moduleLoader.ensure(manifest, {});
            return {};
        }
        return _loadEntryPoint(manifest, moduleLoader).then(function (entryPoint) {
            _validateComponentIsNotEmptyOrThrow(entryPoint, manifest);
            return entryPoint;
        });
    }).catch(function (e) {
        throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildLoadComponentError(manifest, e);
    });
}
/**
 * Checks if the component is not empty (or does not have a default properties that is empty).
 * If either case happens, it throws an error
 */
function _validateComponentIsNotEmptyOrThrow(component, manifest) {
    if (Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(component)) {
        throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildLoadComponentReturnsEmptyError(manifest);
    }
    var defaultObject = component.default; // tslint:disable-line:no-any
    if (defaultObject && Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(defaultObject) && !defaultObject.prototype) {
        throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildLoadComponentReturnsDefaultEmptyError(manifest);
    }
}
/**
 * Loads all component dependencies for a component.
 * If the dependency can't be found and it has a failover path, it will load it
 * from the path.
 *
 * Returns an array with the promises for all the component dependencies
 */
function _loadComponentDependencies(manifest, moduleLoader) {
    var depPromises = [];
    var resources = manifest.loaderConfig.scriptResources;
    var _loop_1 = function (name_1) {
        if (resources[name_1].type === 'component' && !resources[name_1].shouldNotPreload) {
            var moduleConfiguration_1 = resources[name_1];
            var resourceManifest = _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_5__["default"].instance.tryGetManifest(moduleConfiguration_1.id, moduleConfiguration_1.version);
            if (resourceManifest) {
                var dep = loadComponent(resourceManifest, moduleLoader).catch(function (e) {
                    throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildLoadComponentDependencyError(manifest, e);
                });
                depPromises.push(dep);
            }
            else { // if (!resourceManifest)
                if (moduleConfiguration_1.failoverPath) {
                    var dep = moduleLoader.loadFromFailoverPath(name_1)
                        .catch(function (e) {
                        return _processLoadErrors(manifest, name_1, [_utilities_ResourceUrlChecker__WEBPACK_IMPORTED_MODULE_7__["default"].checkResourceUrl].concat(moduleLoader.loadComponentDependencyErrorProcessors), function () { return _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildLoadComponentDependencyFailoverPathError(manifest, name_1, Object(_utilities_resolveAddress__WEBPACK_IMPORTED_MODULE_6__["resolvePath"])(moduleConfiguration_1.failoverPath), e); });
                    });
                    depPromises.push(dep);
                }
                else { // if (!moduleConfiguration.failoverPath)
                    var dep = _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_5__["default"].instance.requestManifest(moduleConfiguration_1.id, moduleConfiguration_1.version)
                        .then(function (m) { return loadComponent(m, moduleLoader); })
                        .catch(function (e) { return Promise.reject(_error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildManifestNotFoundError(moduleConfiguration_1)); });
                    depPromises.push(dep);
                }
            }
        }
    };
    for (var name_1 in resources) {
        _loop_1(name_1);
    }
    return depPromises;
}
/**
 * Loads all paths dependencies for a component, excluding the entry point.
 * If a path dependency is marked as shouldNotPreload, it is skipped
 */
function _loadPathDependencies(manifest, moduleLoader) {
    var resources = manifest.loaderConfig.scriptResources;
    var loadedPathDependencies = new Map();
    for (var name_2 in resources) {
        if ((resources[name_2].type === 'path' || resources[name_2].type === 'localizedPath')
            && !resources[name_2].shouldNotPreload) {
            if (name_2 !== manifest.loaderConfig.entryModuleId) {
                // tslint:disable-next-line:no-floating-promises - This is partially handled, but should be refactored
                _loadPathDependency(manifest, name_2, loadedPathDependencies, moduleLoader);
            }
        }
    }
    var loadedPathDependenciesValues = [];
    loadedPathDependencies.forEach(function (value) {
        loadedPathDependenciesValues.push(value);
    });
    return loadedPathDependenciesValues;
}
/**
 * Loads a single path dependency.
 * If there are any global dependencies, the requested path dependency will be loaded after its dependencies
 * in a serial way.
 * If the path dependency is requested more than once, it just returns the original promise.
 */
function _loadPathDependency(manifest, name, loadedPathDependencies, moduleLoader) {
    // If already requested, return the existing promise
    var loadedPathDependency = loadedPathDependencies.get(name);
    if (loadedPathDependency) {
        return loadedPathDependency;
    }
    var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadPathDependencyQosScenarioName"]);
    var qosExtraData = {
        name: name,
        manifestId: manifest.id,
        version: manifest.version,
        alias: manifest.alias,
        isInternal: manifest.isInternal
    };
    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_8__["loadComponentLogSource"], _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Loader_resx__WEBPACK_IMPORTED_MODULE_9__["default"].loadPathDependencyLog, name, manifest.id, manifest.alias));
    var resources = manifest.loaderConfig.scriptResources;
    var pathConfig = resources[name];
    if (!pathConfig) {
        return Promise.reject(_error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildMissingPathDependencyError(manifest, name));
    }
    var loadPromise;
    if (pathConfig.globalDependencies) {
        var depPromises = pathConfig.globalDependencies
            .map(function (dep) { return _loadPathDependency(manifest, dep, loadedPathDependencies, moduleLoader); });
        loadPromise = Promise.all(depPromises).then(function () {
            return _moduleLoaderLoadPathDependency(manifest, name, moduleLoader);
        }, function () {
            throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildLoadPathDependencyBlockedError(manifest, name);
        });
    }
    else {
        loadPromise = _moduleLoaderLoadPathDependency(manifest, name, moduleLoader);
    }
    loadedPathDependencies.set(name, loadPromise);
    return loadPromise.then(function (load) {
        qosMonitor.writeSuccess(qosExtraData);
        return load;
    }, function (error) {
        qosMonitor.writeUnexpectedFailure(undefined, error, qosExtraData);
        throw error;
    });
}
/**
 * Auxiliary method to call the module loader on a path dependency.
 * Used only inside _loadPathDependency
 */
function _moduleLoaderLoadPathDependency(manifest, name, moduleLoader) {
    var globalName = manifest.loaderConfig.scriptResources[name].globalName;
    return moduleLoader.load(manifest, name, globalName)
        .catch(function (e) {
        return _processLoadErrors(manifest, name, [_utilities_ResourceUrlChecker__WEBPACK_IMPORTED_MODULE_7__["default"].checkResourceUrl].concat(moduleLoader.loadPathDependencyErrorProcessors), function () { return _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildLoadPathDependencyError(manifest, name, e); });
    });
}
/**
 * Loads the entry point for a component.
 * If it fails, it tries to identify the root cause of the error.
 */
function _loadEntryPoint(manifest, moduleLoader) {
    return moduleLoader.load(manifest).catch(function (e) {
        return _processLoadErrors(manifest, manifest.loaderConfig.entryModuleId, [_utilities_ResourceUrlChecker__WEBPACK_IMPORTED_MODULE_7__["default"].checkResourceUrl].concat(moduleLoader.loadEntryPointErrorProcessors), function () { return _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildLoadEntryPointError(manifest, e); });
    });
}
function _processLoadErrors(manifest, name, errorProcessors, buildDefaultError) {
    return Promise.all(errorProcessors.map(function (errorProcessor) { return errorProcessor(manifest, name); }))
        .then(
    // Default error handling
    function () {
        throw buildDefaultError();
    }, function (e) { throw e; });
}


/***/ }),

/***/ "cLCj":
/*!****************************************!*\
  !*** ./lib/debug/DebugManager.resx.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_FmFyAWZ1md7Z1R+V8t2S2Q';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "cnPT":
/*!*********************************************!*\
  !*** ./lib/utilities/ResourceUrlChecker.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _resolveAddress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolveAddress */ "W2kl");
/* harmony import */ var _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error/ErrorBuilder */ "ff4n");




var UrlStatus;
(function (UrlStatus) {
    UrlStatus[UrlStatus["Undefined"] = 0] = "Undefined";
    UrlStatus[UrlStatus["OK"] = 1] = "OK";
    UrlStatus[UrlStatus["FileNotFound"] = 2] = "FileNotFound";
    UrlStatus[UrlStatus["Forbidden"] = 3] = "Forbidden";
    UrlStatus[UrlStatus["ClientError"] = 4] = "ClientError";
    UrlStatus[UrlStatus["ServerError"] = 5] = "ServerError";
    UrlStatus[UrlStatus["NetworkError"] = 6] = "NetworkError";
})(UrlStatus || (UrlStatus = {}));
/**
 * Checks if a resource URL is accessible and throws the right error for each case.
 *
 * In the case of localhost errors, it provides guidance on usage of 'gulp' to solve them.
 */
var ResourceUrlChecker = /** @class */ (function () {
    function ResourceUrlChecker() {
    }
    /**
     * Checks the resource URL for the HTTP response status code.
     * If the response is not successful, it throws the appropriate error.
     * @param manifest - Manifest where the resource is defined
     * @param name - Name of the resource to check
     */
    ResourceUrlChecker.checkResourceUrl = function (manifest, name) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(manifest, 'manifest');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(name, 'name');
        var url = Object(_resolveAddress__WEBPACK_IMPORTED_MODULE_2__["default"])(manifest, name);
        return ResourceUrlChecker._getUrlStatus(url).then(function (urlStatus) {
            if (urlStatus !== UrlStatus.OK) {
                return ResourceUrlChecker._throwUrlStatusError(urlStatus, manifest, name, url);
            }
            return Promise.resolve();
        });
    };
    ResourceUrlChecker._throwUrlStatusError = function (urlStatus, manifest, resourceName, url) {
        switch (urlStatus) {
            case UrlStatus.FileNotFound:
                if (url.match(ResourceUrlChecker.localhostUrlRegex)) {
                    throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildUrlStatusLocalhostFileNotFoundError(manifest, resourceName, url);
                }
                else {
                    throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildUrlStatusFileNotFoundError(manifest, resourceName, url);
                }
            case UrlStatus.Forbidden:
                throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildUrlStatusForbiddenError(manifest, resourceName, url);
            case UrlStatus.ClientError:
                throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildUrlStatusClientErrorError(manifest, resourceName, url);
            case UrlStatus.ServerError:
                throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildUrlStatusServerErrorError(manifest, resourceName, url);
            case UrlStatus.NetworkError:
                if (url.match(ResourceUrlChecker.localhostUrlRegex)) {
                    throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildUrlStatusLocalhostNetworkErrorError(manifest, resourceName, url);
                }
                else if (url.match(ResourceUrlChecker.tenantUrlRegex)) {
                    throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildUrlStatusDocLibNetworkErrorError(manifest, resourceName, url);
                }
                else if (url.match(ResourceUrlChecker.httpsUrlRegex)) {
                    throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildUrlStatusHttpsNetworkErrorError(manifest, resourceName, url);
                }
                else {
                    throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildUrlStatusNetworkErrorError(manifest, resourceName, url);
                }
            case UrlStatus.Undefined:
            default: // tslint:disable-line:no-switch-case-fall-through
                throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildUrlStatusUndefinedError(manifest, resourceName, url);
        }
    };
    // This is not using HttpClient because it might not be initialized at this time.
    // Do not use this code outside of sp-loader
    ResourceUrlChecker._getUrlStatus = function (url) {
        var requestInit = {
            method: 'HEAD',
            mode: 'cors'
        };
        var request = new Request(url, requestInit);
        return window.fetch(request).then(function (response) {
            var httpStatusCode = response.status;
            if (httpStatusCode >= 200 && httpStatusCode < 300) {
                return UrlStatus.OK;
            }
            if (httpStatusCode === 404) {
                return UrlStatus.FileNotFound;
            }
            if (httpStatusCode === 403) {
                return UrlStatus.Forbidden;
            }
            if (httpStatusCode >= 400 && httpStatusCode < 500) {
                return UrlStatus.ClientError;
            }
            if (httpStatusCode >= 500 && httpStatusCode < 600) {
                return UrlStatus.ServerError;
            }
            return UrlStatus.Undefined;
        }).catch(function (error) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(ResourceUrlChecker._logSource, error);
            return UrlStatus.NetworkError;
        });
    };
    ResourceUrlChecker._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('ResourceUrlChecker');
    ResourceUrlChecker.localhostUrlRegex = /^http[s]?:\/\/localhost/;
    ResourceUrlChecker.tenantUrlRegex = /^http[s]?:\/\/[a-zA-Z0-9]+.sharepoint.com/;
    ResourceUrlChecker.httpsUrlRegex = /^https:\/\//;
    return ResourceUrlChecker;
}());
/* harmony default export */ __webpack_exports__["default"] = (ResourceUrlChecker);


/***/ }),

/***/ "dJ1A":
/*!***********************************!*\
  !*** ./lib/stores/Stores.resx.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_ZZX3HYmO09A0dtXnoncSkA';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "dQRF":
/*!******************************************!*\
  !*** ./lib/utilities/SPLoaderFlights.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Class to expose flight checks on sp-loader
 *
 * @internal
 */
var SPLoaderFlights = /** @class */ (function () {
    function SPLoaderFlights() {
    }
    /**
     * Returns true if the SPFx should use the new boot sequence, which will support cross-app navigation.
     *
     * @internal
     */
    SPLoaderFlights._useNewBootSequence = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(182 /* SppplatCrossAppNavigation */);
    };
    SPLoaderFlights._loadRequireJSOnWindow = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1723 /* WexRequireJSLoadOnWindow */);
    };
    return SPLoaderFlights;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPLoaderFlights);


/***/ }),

/***/ "eaMA":
/*!**************************************!*\
  !*** ./lib/stores/ComponentStore.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utilities/telemetryConstants */ "4mHd");
/* harmony import */ var _utilities_normalizeComponentId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../utilities/normalizeComponentId */ "jLfe");
/* harmony import */ var _Stores_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Stores.resx */ "dJ1A");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file ComponentStore.ts
 */






/**
 * Stores component modules by id and version.
 * Used by the component loader to retrieve already loaded components.
 */
var ComponentStore = /** @class */ (function () {
    function ComponentStore() {
        this._componentMap = new Map(); // tslint:disable-line:no-any
        /**
         * References to the resolved value of the promises in the _componentMap.
         */
        this._componentReferenceMap = new Map(); // tslint:disable-line:no-any
    }
    Object.defineProperty(ComponentStore, "instance", {
        get: function () {
            if (!ComponentStore._instance) {
                ComponentStore._instance = new ComponentStore();
            }
            return ComponentStore._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a promise of the component module by id and version.
     *
     * If the component is not found, returns undefined.
     */
    ComponentStore.prototype.tryGetComponent = function (id, version) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(id, 'id');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(version, 'version');
        return this._componentMap.get(this._getKey(id, version));
    };
    /**
     * Try and get a reference to a loaded component module by id and version.
     *
     * @param id - The component manifest id.
     * @param version - The component manifest version.
     * @returns A reference to a component module by id and version or, if it does not exist, undefined.
     */
    ComponentStore.prototype.tryGetComponentReference = function (id, version) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(id, 'id');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(version, 'version');
        return this._componentReferenceMap.get(this._getKey(id, version));
    };
    /**
     * Returns the maps with all the loaded component.
     *
     * @remarks
     * This is not meant to be used as the regular behavior of ComponentStore as it's exposing its internals.
     * This exists only to ensure the SystemJS side-loader knows about all components loaded by RequireJS.
     */
    ComponentStore.prototype.getAllComponentReferences = function () {
        return this._componentReferenceMap;
    };
    /**
     * Returns a promise of the component module by id.
     *
     * If a component is not found, returns undefined.
     * If there are too many components for the id, returns undefined.
     *
     * Don't use this method, use getComponent() instead.
     * This method is only used by the DeveloperToolsLoader for react and office-ui-fabric-react
     * when those haven't been loaded yet, as the version might not be known at the time.
     */
    ComponentStore.prototype.tryGetComponentById = function (id, shouldLog) {
        if (shouldLog === void 0) { shouldLog = true; }
        try {
            return this._getComponentById(id, shouldLog);
        }
        catch (e) {
            return undefined;
        }
    };
    /**
     * Returns a promise of the component module by id.
     *
     * If a component is not found, throws an error.
     * If there are too many components for the id, throws an error.
     *
     * Don't use this method, use getComponent() instead.
     * This method is only used by the DeveloperToolsLoader for react and office-ui-fabric-react
     * when those haven't been loaded yet, as the version might not be known at the time.
     */
    ComponentStore.prototype.getComponentById = function (id) {
        return this._getComponentById(id, true);
    };
    /**
     * Stores a component module.
     *
     * @param id - Component id
     * @param version - Component version
     * @param modulePromise - Promise of the component module, as it might have been not fully loaded yet.
     */
    ComponentStore.prototype.storeComponent = function (id, version, modulePromise) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(id, 'id');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(version, 'version');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(modulePromise, 'modulePromise');
        var key = this._getKey(id, version);
        if (!this._componentMap.has(key)) {
            // tslint:disable-next-line:no-floating-promises - this can't throw
            modulePromise.then(function (mod) {
                // If deleteComponent has been invoked before this promise could resolve, skip adding the reference
                if (_this._componentMap.has(key)) {
                    _this._componentReferenceMap.set(key, mod);
                }
            });
            this._componentMap.set(key, modulePromise);
        }
    };
    /**
     * Stores an already loaded component module.
     *
     * @param id - Component id
     * @param version - Component version
     * @param modulePromise - Promise of the component module, as it might have been not fully loaded yet.
     */
    ComponentStore.prototype.storeLoadedComponent = function (id, version, module) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(id, 'id');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(version, 'version');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(module, 'module');
        var key = this._getKey(id, version);
        if (!this._componentMap.has(key)) {
            this._componentMap.set(key, Promise.resolve(module));
            this._componentReferenceMap.set(key, module);
        }
    };
    /**
     * Deletes a component from the store, if it exists.
     *
     * @param id - Component id
     * @param version - Component version
     */
    ComponentStore.prototype.deleteComponent = function (id, version) {
        var key = this._getKey(id, version);
        if (this._componentMap.has(key)) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["componentStoreLogSource"], _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Stores_resx__WEBPACK_IMPORTED_MODULE_4__["default"].deleteComponentLog, id, version));
            this._componentMap.delete(key);
        }
        if (this._componentReferenceMap.has(key)) {
            this._componentReferenceMap.delete(key);
        }
    };
    /**
     * Internal implementation of `getManifest` that toggles whether failures should be logged or not.
     */
    ComponentStore.prototype._getComponentById = function (id, shouldLog) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(id, 'id');
        var returnValue = undefined;
        this._componentMap.forEach(function (value, index) {
            // Check whether the index string is prefixed with the Guid that we are looking for
            if (index.indexOf(id) === 0) {
                if (!returnValue) {
                    returnValue = value;
                }
                else {
                    var error = new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Stores_resx__WEBPACK_IMPORTED_MODULE_4__["default"].tooManyComponentsError, id));
                    if (shouldLog) {
                        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["componentStoreLogSource"], error);
                    }
                    throw error;
                }
            }
        });
        if (!returnValue) {
            var error = new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Stores_resx__WEBPACK_IMPORTED_MODULE_4__["default"].noComponentFoundError, id));
            if (shouldLog) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["componentStoreLogSource"], error);
            }
            throw error;
        }
        return returnValue;
    };
    ComponentStore.prototype._getKey = function (id, version) {
        return Object(_utilities_normalizeComponentId__WEBPACK_IMPORTED_MODULE_3__["default"])(id, version);
    };
    return ComponentStore;
}());
/* harmony default export */ __webpack_exports__["default"] = (ComponentStore);


/***/ }),

/***/ "esv8":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/exports-loader/0.6.4/node_modules/exports-loader?requirejs,require,define!./blobs/requirejs/2.1.20/require.min.js ***!
  \*********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/*
 RequireJS 2.1.20 Copyright (c) 2010-2015, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs,require,define;
(function(ba){function G(b){return"[object Function]"===K.call(b)}function H(b){return"[object Array]"===K.call(b)}function v(b,c){if(b){var d;for(d=0;d<b.length&&(!b[d]||!c(b[d],d,b));d+=1);}}function T(b,c){if(b){var d;for(d=b.length-1;-1<d&&(!b[d]||!c(b[d],d,b));d-=1);}}function t(b,c){return fa.call(b,c)}function n(b,c){return t(b,c)&&b[c]}function A(b,c){for(var d in b)if(t(b,d)&&c(b[d],d))break}function U(b,c,d,e){c&&A(c,function(c,i){if(d||!t(b,i))e&&"object"===typeof c&&c&&!H(c)&&!G(c)&&!(c instanceof
RegExp)?(b[i]||(b[i]={}),U(b[i],c,d,e)):b[i]=c});return b}function u(b,c){return function(){return c.apply(b,arguments)}}function ca(b){throw b;}function da(b){if(!b)return b;var c=ba;v(b.split("."),function(b){c=c[b]});return c}function B(b,c,d,e){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=e;d&&(c.originalError=d);return c}function ga(b){function c(a,j,b){var f,l,c,d,h,e,g,i,j=j&&j.split("/"),p=k.map,m=p&&p["*"];if(a){a=a.split("/");l=a.length-1;k.nodeIdCompat&&
Q.test(a[l])&&(a[l]=a[l].replace(Q,""));"."===a[0].charAt(0)&&j&&(l=j.slice(0,j.length-1),a=l.concat(a));l=a;for(c=0;c<l.length;c++)if(d=l[c],"."===d)l.splice(c,1),c-=1;else if(".."===d&&!(0===c||1===c&&".."===l[2]||".."===l[c-1])&&0<c)l.splice(c-1,2),c-=2;a=a.join("/")}if(b&&p&&(j||m)){l=a.split("/");c=l.length;a:for(;0<c;c-=1){h=l.slice(0,c).join("/");if(j)for(d=j.length;0<d;d-=1)if(b=n(p,j.slice(0,d).join("/")))if(b=n(b,h)){f=b;e=c;break a}!g&&(m&&n(m,h))&&(g=n(m,h),i=c)}!f&&g&&(f=g,e=i);f&&(l.splice(0,
e,f),a=l.join("/"))}return(f=n(k.pkgs,a))?f:a}function d(a){z&&v(document.getElementsByTagName("script"),function(j){if(j.getAttribute("data-requiremodule")===a&&j.getAttribute("data-requirecontext")===h.contextName)return j.parentNode.removeChild(j),!0})}function p(a){var j=n(k.paths,a);if(j&&H(j)&&1<j.length)return j.shift(),h.require.undef(a),h.makeRequire(null,{skipMap:!0})([a]),!0}function g(a){var j,c=a?a.indexOf("!"):-1;-1<c&&(j=a.substring(0,c),a=a.substring(c+1,a.length));return[j,a]}function i(a,
j,b,f){var l,d,e=null,i=j?j.name:null,k=a,p=!0,m="";a||(p=!1,a="_@r"+(K+=1));a=g(a);e=a[0];a=a[1];e&&(e=c(e,i,f),d=n(q,e));a&&(e?m=d&&d.normalize?d.normalize(a,function(a){return c(a,i,f)}):-1===a.indexOf("!")?c(a,i,f):a:(m=c(a,i,f),a=g(m),e=a[0],m=a[1],b=!0,l=h.nameToUrl(m)));b=e&&!d&&!b?"_unnormalized"+(O+=1):"";return{prefix:e,name:m,parentMap:j,unnormalized:!!b,url:l,originalName:k,isDefine:p,id:(e?e+"!"+m:m)+b}}function r(a){var j=a.id,b=n(m,j);b||(b=m[j]=new h.Module(a));return b}function s(a,
j,b){var f=a.id,c=n(m,f);if(t(q,f)&&(!c||c.defineEmitComplete))"defined"===j&&b(q[f]);else if(c=r(a),c.error&&"error"===j)b(c.error);else c.on(j,b)}function w(a,b){var c=a.requireModules,f=!1;if(b)b(a);else if(v(c,function(b){if(b=n(m,b))b.error=a,b.events.error&&(f=!0,b.emit("error",a))}),!f)e.onError(a)}function x(){R.length&&(v(R,function(a){var b=a[0];"string"===typeof b&&(h.defQueueMap[b]=!0);C.push(a)}),R=[])}function y(a){delete m[a];delete V[a]}function F(a,b,c){var f=a.map.id;a.error?a.emit("error",
a.error):(b[f]=!0,v(a.depMaps,function(f,d){var e=f.id,h=n(m,e);h&&(!a.depMatched[d]&&!c[e])&&(n(b,e)?(a.defineDep(d,q[e]),a.check()):F(h,b,c))}),c[f]=!0)}function D(){var a,b,c=(a=1E3*k.waitSeconds)&&h.startTime+a<(new Date).getTime(),f=[],l=[],e=!1,i=!0;if(!W){W=!0;A(V,function(a){var h=a.map,g=h.id;if(a.enabled&&(h.isDefine||l.push(a),!a.error))if(!a.inited&&c)p(g)?e=b=!0:(f.push(g),d(g));else if(!a.inited&&(a.fetched&&h.isDefine)&&(e=!0,!h.prefix))return i=!1});if(c&&f.length)return a=B("timeout",
"Load timeout for modules: "+f,null,f),a.contextName=h.contextName,w(a);i&&v(l,function(a){F(a,{},{})});if((!c||b)&&e)if((z||ea)&&!X)X=setTimeout(function(){X=0;D()},50);W=!1}}function E(a){t(q,a[0])||r(i(a[0],null,!0)).init(a[1],a[2])}function I(a){var a=a.currentTarget||a.srcElement,b=h.onScriptLoad;a.detachEvent&&!Y?a.detachEvent("onreadystatechange",b):a.removeEventListener("load",b,!1);b=h.onScriptError;(!a.detachEvent||Y)&&a.removeEventListener("error",b,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}
function J(){var a;for(x();C.length;){a=C.shift();if(null===a[0])return w(B("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));E(a)}h.defQueueMap={}}var W,Z,h,L,X,k={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},m={},V={},$={},C=[],q={},S={},aa={},K=1,O=1;L={require:function(a){return a.require?a.require:a.require=h.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?q[a.map.id]=a.exports:a.exports=q[a.map.id]={}},
module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return n(k.config,a.map.id)||{}},exports:a.exports||(a.exports={})}}};Z=function(a){this.events=n($,a.id)||{};this.map=a;this.shim=n(k.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};Z.prototype={init:function(a,b,c,f){f=f||{};if(!this.inited){this.factory=b;if(c)this.on("error",c);else this.events.error&&(c=u(this,function(a){this.emit("error",a)}));
this.depMaps=a&&a.slice(0);this.errback=c;this.inited=!0;this.ignore=f.ignore;f.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0;h.startTime=(new Date).getTime();var a=this.map;if(this.shim)h.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],u(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?
this.callPlugin():this.load()}},load:function(){var a=this.map.url;S[a]||(S[a]=!0,h.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;var f=this.exports,l=this.factory;if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(G(l)){if(this.events.error&&this.map.isDefine||e.onError!==ca)try{f=h.execCb(c,l,b,f)}catch(d){a=d}else f=h.execCb(c,l,b,f);this.map.isDefine&&
void 0===f&&((b=this.module)?f=b.exports:this.usingExports&&(f=this.exports));if(a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",w(this.error=a)}else f=l;this.exports=f;if(this.map.isDefine&&!this.ignore&&(q[c]=f,e.onResourceLoad))e.onResourceLoad(h,this.map,this.depMaps);y(c);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=
!0)}}else t(h.defQueueMap,c)||this.fetch()}},callPlugin:function(){var a=this.map,b=a.id,d=i(a.prefix);this.depMaps.push(d);s(d,"defined",u(this,function(f){var l,d;d=n(aa,this.map.id);var g=this.map.name,P=this.map.parentMap?this.map.parentMap.name:null,p=h.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(f.normalize&&(g=f.normalize(g,function(a){return c(a,P,!0)})||""),f=i(a.prefix+"!"+g,this.map.parentMap),s(f,"defined",u(this,function(a){this.init([],function(){return a},
null,{enabled:!0,ignore:!0})})),d=n(m,f.id)){this.depMaps.push(f);if(this.events.error)d.on("error",u(this,function(a){this.emit("error",a)}));d.enable()}}else d?(this.map.url=h.nameToUrl(d),this.load()):(l=u(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),l.error=u(this,function(a){this.inited=!0;this.error=a;a.requireModules=[b];A(m,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&y(a.map.id)});w(a)}),l.fromText=u(this,function(f,c){var d=a.name,g=i(d),P=M;c&&(f=c);P&&
(M=!1);r(g);t(k.config,b)&&(k.config[d]=k.config[b]);try{e.exec(f)}catch(m){return w(B("fromtexteval","fromText eval for "+b+" failed: "+m,m,[b]))}P&&(M=!0);this.depMaps.push(g);h.completeLoad(d);p([d],l)}),f.load(a.name,p,l,k))}));h.enable(d,this);this.pluginMaps[d.id]=d},enable:function(){V[this.map.id]=this;this.enabling=this.enabled=!0;v(this.depMaps,u(this,function(a,b){var c,f;if("string"===typeof a){a=i(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=
n(L,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;s(a,"defined",u(this,function(a){this.undefed||(this.defineDep(b,a),this.check())}));this.errback?s(a,"error",u(this,this.errback)):this.events.error&&s(a,"error",u(this,function(a){this.emit("error",a)}))}c=a.id;f=m[c];!t(L,c)&&(f&&!f.enabled)&&h.enable(a,this)}));A(this.pluginMaps,u(this,function(a){var b=n(m,a.id);b&&!b.enabled&&h.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=
[]);c.push(b)},emit:function(a,b){v(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};h={config:k,contextName:b,registry:m,defined:q,urlFetched:S,defQueue:C,defQueueMap:{},Module:Z,makeModuleMap:i,nextTick:e.nextTick,onError:w,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=k.shim,c={paths:!0,bundles:!0,config:!0,map:!0};A(a,function(a,b){c[b]?(k[b]||(k[b]={}),U(k[b],a,!0,!0)):k[b]=a});a.bundles&&A(a.bundles,function(a,b){v(a,
function(a){a!==b&&(aa[a]=b)})});a.shim&&(A(a.shim,function(a,c){H(a)&&(a={deps:a});if((a.exports||a.init)&&!a.exportsFn)a.exportsFn=h.makeShimExports(a);b[c]=a}),k.shim=b);a.packages&&v(a.packages,function(a){var b,a="string"===typeof a?{name:a}:a;b=a.name;a.location&&(k.paths[b]=a.location);k.pkgs[b]=a.name+"/"+(a.main||"main").replace(ha,"").replace(Q,"")});A(m,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=i(b,null,!0))});if(a.deps||a.callback)h.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;
a.init&&(b=a.init.apply(ba,arguments));return b||a.exports&&da(a.exports)}},makeRequire:function(a,j){function g(c,d,p){var k,n;j.enableBuildCallback&&(d&&G(d))&&(d.__requireJsBuild=!0);if("string"===typeof c){if(G(d))return w(B("requireargs","Invalid require call"),p);if(a&&t(L,c))return L[c](m[a.id]);if(e.get)return e.get(h,c,a,g);k=i(c,a,!1,!0);k=k.id;return!t(q,k)?w(B("notloaded",'Module name "'+k+'" has not been loaded yet for context: '+b+(a?"":". Use require([])"))):q[k]}J();h.nextTick(function(){J();
n=r(i(null,a));n.skipMap=j.skipMap;n.init(c,d,p,{enabled:!0});D()});return g}j=j||{};U(g,{isBrowser:z,toUrl:function(b){var d,e=b.lastIndexOf("."),j=b.split("/")[0];if(-1!==e&&(!("."===j||".."===j)||1<e))d=b.substring(e,b.length),b=b.substring(0,e);return h.nameToUrl(c(b,a&&a.id,!0),d,!0)},defined:function(b){return t(q,i(b,a,!1,!0).id)},specified:function(b){b=i(b,a,!1,!0).id;return t(q,b)||t(m,b)}});a||(g.undef=function(b){x();var c=i(b,a,!0),e=n(m,b);e.undefed=!0;d(b);delete q[b];delete S[c.url];
delete $[b];T(C,function(a,c){a[0]===b&&C.splice(c,1)});delete h.defQueueMap[b];e&&(e.events.defined&&($[b]=e.events),y(b))});return g},enable:function(a){n(m,a.id)&&r(a).enable()},completeLoad:function(a){var b,c,d=n(k.shim,a)||{},e=d.exports;for(x();C.length;){c=C.shift();if(null===c[0]){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);E(c)}h.defQueueMap={};c=n(m,a);if(!b&&!t(q,a)&&c&&!c.inited){if(k.enforceDefine&&(!e||!da(e)))return p(a)?void 0:w(B("nodefine","No define call for "+a,null,[a]));E([a,
d.deps||[],d.exportsFn])}D()},nameToUrl:function(a,b,c){var d,g,i;(d=n(k.pkgs,a))&&(a=d);if(d=n(aa,a))return h.nameToUrl(d,b,c);if(e.jsExtRegExp.test(a))d=a+(b||"");else{d=k.paths;a=a.split("/");for(g=a.length;0<g;g-=1)if(i=a.slice(0,g).join("/"),i=n(d,i)){H(i)&&(i=i[0]);a.splice(0,g,i);break}d=a.join("/");d+=b||(/^data\:|\?/.test(d)||c?"":".js");d=("/"===d.charAt(0)||d.match(/^[\w\+\.\-]+:/)?"":k.baseUrl)+d}return k.urlArgs?d+((-1===d.indexOf("?")?"?":"&")+k.urlArgs):d},load:function(a,b){e.load(h,
a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||ia.test((a.currentTarget||a.srcElement).readyState))N=null,a=I(a),h.completeLoad(a.id)},onScriptError:function(a){var b=I(a);if(!p(b.id))return w(B("scripterror","Script error for: "+b.id,a,[b.id]))}};h.require=h.makeRequire();return h}var e,x,y,D,I,E,N,J,r,O,ja=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ka=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,Q=/\.js$/,ha=/^\.\//;x=Object.prototype;var K=
x.toString,fa=x.hasOwnProperty,z=!!("undefined"!==typeof window&&"undefined"!==typeof navigator&&window.document),ea=!z&&"undefined"!==typeof importScripts,ia=z&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,Y="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),F={},s={},R=[],M=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(G(requirejs))return;s=requirejs;requirejs=void 0}"undefined"!==typeof require&&!G(require)&&(s=require,require=
void 0);e=requirejs=function(b,c,d,p){var g,i="_";!H(b)&&"string"!==typeof b&&(g=b,H(c)?(b=c,c=d,d=p):b=[]);g&&g.context&&(i=g.context);(p=n(F,i))||(p=F[i]=e.s.newContext(i));g&&p.configure(g);return p.require(b,c,d)};e.config=function(b){return e(b)};e.nextTick="undefined"!==typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=e);e.version="2.1.20";e.jsExtRegExp=/^\/|:|\?|\.js$/;e.isBrowser=z;x=e.s={contexts:F,newContext:ga};e({});v(["toUrl","undef","defined","specified"],
function(b){e[b]=function(){var c=F._;return c.require[b].apply(c,arguments)}});if(z&&(y=x.head=document.getElementsByTagName("head")[0],D=document.getElementsByTagName("base")[0]))y=x.head=D.parentNode;e.onError=ca;e.createNode=function(b){var c=b.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");c.type=b.scriptType||"text/javascript";c.charset="utf-8";c.async=!0;return c};e.load=function(b,c,d){var p=b&&b.config||{},g;if(z){g=e.createNode(p,
c,d);if(p.onNodeCreated)p.onNodeCreated(g,p,c,d);g.setAttribute("data-requirecontext",b.contextName);g.setAttribute("data-requiremodule",c);g.attachEvent&&!(g.attachEvent.toString&&0>g.attachEvent.toString().indexOf("[native code"))&&!Y?(M=!0,g.attachEvent("onreadystatechange",b.onScriptLoad)):(g.addEventListener("load",b.onScriptLoad,!1),g.addEventListener("error",b.onScriptError,!1));g.src=d;J=g;D?y.insertBefore(g,D):y.appendChild(g);J=null;return g}if(ea)try{importScripts(d),b.completeLoad(c)}catch(i){b.onError(B("importscripts",
"importScripts failed for "+c+" at "+d,i,[c]))}};z&&!s.skipDataMain&&T(document.getElementsByTagName("script"),function(b){y||(y=b.parentNode);if(I=b.getAttribute("data-main"))return r=I,s.baseUrl||(E=r.split("/"),r=E.pop(),O=E.length?E.join("/")+"/":"./",s.baseUrl=O),r=r.replace(Q,""),e.jsExtRegExp.test(r)&&(r=I),s.deps=s.deps?s.deps.concat(r):[r],!0});define=function(b,c,d){var e,g;"string"!==typeof b&&(d=c,c=b,b=null);H(c)||(d=c,c=null);!c&&G(d)&&(c=[],d.length&&(d.toString().replace(ja,"").replace(ka,
function(b,d){c.push(d)}),c=(1===d.length?["require"]:["require","exports","module"]).concat(c)));if(M){if(!(e=J))N&&"interactive"===N.readyState||T(document.getElementsByTagName("script"),function(b){if("interactive"===b.readyState)return N=b}),e=N;e&&(b||(b=e.getAttribute("data-requiremodule")),g=F[e.getAttribute("data-requirecontext")])}g?(g.defQueue.push([b,c,d]),g.defQueueMap[b]=!0):R.push([b,c,d])};define.amd={jQuery:!0};e.exec=function(b){return eval(b)};e(s)}})(this);


/*** EXPORTS FROM exports-loader ***/
exports["requirejs"] = (requirejs);
exports["require"] = (require);
exports["define"] = (define);

/***/ }),

/***/ "ff4n":
/*!***********************************!*\
  !*** ./lib/error/ErrorBuilder.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SPLoaderError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SPLoaderError */ "BBmw");
/* harmony import */ var _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/telemetryConstants */ "4mHd");
/* harmony import */ var _Error_resx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Error.resx */ "Z6P1");
/**
 * This class builds specific errors for sp-loader.
 * This is short-hand for all the error creation, so the production code looks cleaner.
 */




var loadComponentImplEventName = 'loadComponentImpl';
var ErrorBuilder = /** @class */ (function () {
    function ErrorBuilder() {
    }
    ErrorBuilder.buildLoadComponentError = function (manifest, error) {
        // <value>Failed to load component "{0}" ({1}).
        // Original error: {2}</value>
        return this.buildErrorWithVerboseLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].loadComponentError, error, false, _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadComponentLogSource"], loadComponentImplEventName, manifest.id, manifest.alias, error.message);
    };
    ErrorBuilder.buildLoadComponentReturnsEmptyError = function (manifest) {
        // <value>loadComponent() returned an empty object for component "{0}" ({1}).</value>
        return this.buildErrorWithVerboseLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].loadComponentReturnsEmptyError, undefined, false, _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadComponentLogSource"], loadComponentImplEventName, manifest.id, manifest.alias);
    };
    ErrorBuilder.buildLoadComponentReturnsDefaultEmptyError = function (manifest) {
        // <value>loadComponent() returned an object with an empty default property for component "{0}" ({1}).</value>
        return this.buildErrorWithVerboseLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].loadComponentReturnsDefaultEmptyError, undefined, false, _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadComponentLogSource"], loadComponentImplEventName, manifest.id, manifest.alias);
    };
    ErrorBuilder.buildLoadComponentDependencyError = function (manifest, error) {
        // <value>Failed to load component dependency "{0}" from component "{1}" ({2}).
        // Original error: {3}</value>
        return this.buildErrorWithVerboseLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].loadComponentDependencyError, error, false, _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadComponentLogSource"], loadComponentImplEventName, manifest.id, manifest.alias, error.message);
    };
    ErrorBuilder.buildManifestNotFoundError = function (moduleConfiguration) {
        // <value>Manifest not found for component id "{0}" and version "{1}".</value>
        return this.buildErrorWithVerboseLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].manifestNotFoundError, undefined, false, _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadComponentLogSource"], undefined, moduleConfiguration.id, moduleConfiguration.version);
    };
    ErrorBuilder.buildLoadPathDependencyBlockedError = function (manifest, name) {
        // tslint:disable-next-line:max-line-length
        // <value>Failed to load path dependency "{0}" from component "{1}" ({2}) due to another dependency that failed to load.</value>
        return this.buildErrorWithVerboseLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].loadPathDependencyBlockedByAnotherDependencyError, undefined, false, _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadComponentLogSource"], undefined, name, manifest.id, manifest.alias);
    };
    ErrorBuilder.buildModuleHasUndeclaredDependencyError = function (manifest, dependencyName) {
        // tslint:disable-next-line:max-line-length
        // <value>The entry point for component "{0}" ({1}) has a dependency on "{2}" that is not declared in the manifest.</value>
        return this.buildErrorWithErrorLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].moduleHasUndeclaredDependencyError, undefined, true, // This is an error when building the manifest/JS so it's an expected error
        _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadComponentLogSource"], undefined, manifest.id, manifest.alias, dependencyName);
    };
    ErrorBuilder.buildLoadEntryPointError = function (manifest, error) {
        // <value>Failed to load entry point from component "{0}" ({1}).
        // Original error: {2}</value>
        return this.buildErrorWithVerboseLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].loadEntryPointError, error, false, _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadComponentLogSource"], undefined, manifest.id, manifest.alias, error.message);
    };
    ErrorBuilder.buildLoadPathDependencyError = function (manifest, dependencyName, error) {
        // <value>Failed to load path dependency "{0}" from component "{1}" ({2}).
        // Original error: {3}</value>
        return this.buildErrorWithVerboseLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].loadPathDependencyError, error, false, _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadComponentLogSource"], undefined, dependencyName, manifest.id, manifest.alias, error.message);
    };
    ErrorBuilder.buildMissingPathDependencyError = function (manifest, dependencyName) {
        // <value>Missing path dependency "{0}" from component "{1}" ({2}). Existing path dependencies: {3}</value>
        return this.buildErrorWithVerboseLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].missingPathDependencyError, undefined, true, _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadComponentLogSource"], undefined, dependencyName, manifest.id, manifest.alias, Object.keys(manifest.loaderConfig.scriptResources).join(_Error_resx__WEBPACK_IMPORTED_MODULE_3__["default"].listSeparator));
    };
    ErrorBuilder.buildLoadComponentDependencyFailoverPathError = function (manifest, dependencyName, failoverPath, error) {
        // <value>Failed to load component dependency "{0}" with failover path "{1}" from component "{2}" ({3}).
        // Original error: {4}</value>
        return this.buildErrorWithVerboseLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].loadComponentDependencyFailoverPathError, error, false, _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadComponentLogSource"], undefined, dependencyName, failoverPath, manifest.id, manifest.alias, error.message);
    };
    ErrorBuilder.buildLoadScriptWithStringError = function () {
        // <value>loadScript function doesn't allow a string as 2nd parameter. Use ILoadScriptOptions instead.</value>
        return this.buildErrorWithErrorLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].loadScriptWithStringError, undefined, true, // Expected error, as it is caused by a wrong input from the user
        _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadScriptLogSource"], undefined);
    };
    ErrorBuilder.buildUrlStatusLocalhostFileNotFoundError = function (manifest, resourceName, url) {
        // tslint:disable-next-line:max-line-length
        // <value>Failed to load URL '{3}' for resource '{2}' in component '{0}' ({1}). The file was not found in the server.
        // Make sure that you are running 'gulp serve'.</value>
        return this.buildErrorWithErrorLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].urlStatusLocalhostFileNotFoundError, undefined, true, // Expected error, as it is caused by a user action (not running gulp serve)
        _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadScriptLogSource"], undefined, manifest.id, manifest.alias, resourceName, url);
    };
    ErrorBuilder.buildUrlStatusFileNotFoundError = function (manifest, resourceName, url) {
        // tslint:disable-next-line:max-line-length
        // <value>Failed to load URL '{3}' for resource '{2}' in component '{0}' ({1}). The file was not found in the server.</value>
        return this.buildErrorWithErrorLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].urlStatusFileNotFoundError, undefined, true, // Expected error, as it is caused by a wrong URL in the manifest
        _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadScriptLogSource"], undefined, manifest.id, manifest.alias, resourceName, url);
    };
    ErrorBuilder.buildUrlStatusForbiddenError = function (manifest, resourceName, url) {
        // tslint:disable-next-line:max-line-length
        // <value>Failed to load URL '{3}' for resource '{2}' in component '{0}' ({1}). The access to the file is forbidden.</value>
        return this.buildErrorWithErrorLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].urlStatusForbiddenError, undefined, true, // Expected error, as it is caused by accessing a URL/CDN without permission
        _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadScriptLogSource"], undefined, manifest.id, manifest.alias, resourceName, url);
    };
    ErrorBuilder.buildUrlStatusClientErrorError = function (manifest, resourceName, url) {
        // tslint:disable-next-line:max-line-length
        // <value>Failed to load URL '{3}' for resource '{2}' in component '{0}' ({1}). There was an error requesting the file.</value>
        return this.buildErrorWithErrorLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].urlStatusClientErrorError, undefined, false, // Unexpected error
        _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadScriptLogSource"], undefined, manifest.id, manifest.alias, resourceName, url);
    };
    ErrorBuilder.buildUrlStatusServerErrorError = function (manifest, resourceName, url) {
        // tslint:disable-next-line:max-line-length
        // <value>Failed to load URL '{3}' for resource '{2}' in component '{0}' ({1}). There was a problem in the server.</value>
        return this.buildErrorWithErrorLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].urlStatusServerErrorError, undefined, false, // Unexpected error
        _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadScriptLogSource"], undefined, manifest.id, manifest.alias, resourceName, url);
    };
    ErrorBuilder.buildUrlStatusLocalhostNetworkErrorError = function (manifest, resourceName, url) {
        // tslint:disable-next-line:max-line-length
        // <value>Failed to load URL '{3}' for resource '{2}' in component '{0}' ({1}). There was a network problem.
        // Make sure that you are running 'gulp serve' and you have run 'gulp trust-dev-cert'.</value>
        return this.buildErrorWithErrorLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].urlStatusLocalhostNetworkErrorError, undefined, true, // Expected error, as it is caused by a user action (not running gulp serve)
        _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadScriptLogSource"], undefined, manifest.id, manifest.alias, resourceName, url);
    };
    ErrorBuilder.buildUrlStatusDocLibNetworkErrorError = function (manifest, resourceName, url) {
        // tslint:disable-next-line:max-line-length
        // <value>Failed to load URL '{3}' for resource '{2}' in component '{0}' ({1}). There was a network problem.</value>
        return this.buildErrorWithErrorLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].urlStatusDocLibNetworkErrorError, undefined, true, // Expected error, as it is caused by the tenant admin not enabling CDN
        _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadScriptLogSource"], undefined, manifest.id, manifest.alias, resourceName, url);
    };
    ErrorBuilder.buildUrlStatusHttpsNetworkErrorError = function (manifest, resourceName, url) {
        // tslint:disable-next-line:max-line-length
        // <value>Failed to load URL '{3}' for resource '{2}' in component '{0}' ({1}). There was a network problem.
        // This may be a problem with a HTTPS certificate. Make sure you have the right certificate.</value>
        return this.buildErrorWithErrorLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].urlStatusHttpsNetworkErrorError, undefined, true, _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadScriptLogSource"], undefined, manifest.id, manifest.alias, resourceName, url);
    };
    ErrorBuilder.buildUrlStatusNetworkErrorError = function (manifest, resourceName, url) {
        // tslint:disable-next-line:max-line-length
        // <value>Failed to load URL '{3}' for resource '{2}' in component '{0}' ({1}). There was a network problem.</value>
        return this.buildErrorWithErrorLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].urlStatusNetworkErrorError, undefined, true, _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadScriptLogSource"], undefined, manifest.id, manifest.alias, resourceName, url);
    };
    ErrorBuilder.buildUrlStatusUndefinedError = function (manifest, resourceName, url) {
        // tslint:disable-next-line:max-line-length
        // <value>Failed to load URL '{3}' for resource '{2}' in component '{0}' ({1}) because of unknown problems.</value>
        return this.buildErrorWithErrorLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].urlStatusUndefinedError, undefined, false, // Unexpected error
        _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadScriptLogSource"], undefined, manifest.id, manifest.alias, resourceName, url);
    };
    ErrorBuilder.buildScriptFailedToCreateGlobalError = function (globalName, scriptUrl) {
        return this.buildErrorWithErrorLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].failedToCreateGlobalVariable, undefined, false, _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadScriptLogSource"], undefined, globalName, scriptUrl);
    };
    ErrorBuilder.buildModuleHasFailedDependencyError = function (resource, dependency) {
        // <value>Failed to load module '{0}' because dependency {1} was not loaded</value>
        return this.buildErrorWithErrorLog(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["SPLoaderErrorCode"].dependencyLoadError, undefined, true, // Unexpected error
        _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_2__["loadScriptLogSource"], undefined, resource, dependency);
    };
    ErrorBuilder.buildErrorWithVerboseLog = function (errorCode, innerError, isExpected, source, eventName) {
        var params = []; // tslint:disable-line:no-any
        for (var _i = 5 // tslint:disable-line:no-any
        ; _i < arguments.length // tslint:disable-line:no-any
        ; _i++ // tslint:disable-line:no-any
        ) {
            params[_i - 5] = arguments[_i]; // tslint:disable-line:no-any
        }
        var error = new (_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["default"].bind.apply(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["default"], [void 0, errorCode, innerError, isExpected].concat(params)))();
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(source, error.message, eventName);
        return error;
    };
    ErrorBuilder.buildErrorWithErrorLog = function (errorCode, innerError, isExpected, source, eventName) {
        var params = []; // tslint:disable-line:no-any
        for (var _i = 5 // tslint:disable-line:no-any
        ; _i < arguments.length // tslint:disable-line:no-any
        ; _i++ // tslint:disable-line:no-any
        ) {
            params[_i - 5] = arguments[_i]; // tslint:disable-line:no-any
        }
        var error = new (_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["default"].bind.apply(_SPLoaderError__WEBPACK_IMPORTED_MODULE_1__["default"], [void 0, errorCode, innerError, isExpected].concat(params)))();
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(source, error, eventName);
        return error;
    };
    return ErrorBuilder;
}());
/* harmony default export */ __webpack_exports__["default"] = (ErrorBuilder);


/***/ }),

/***/ "fjGJ":
/*!*****************************************!*\
  !*** ./lib/utilities/PlatformLoader.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _loader_SPComponentLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../loader/SPComponentLoader */ "KZU3");
/* harmony import */ var _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../stores/ComponentStore */ "eaMA");
/* harmony import */ var _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../stores/ManifestStore */ "Eke5");
/* harmony import */ var _componentConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./componentConstants */ "kd3Z");
/* harmony import */ var _SPLoaderFlights__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SPLoaderFlights */ "dQRF");
/* harmony import */ var _Utilities_resx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Utilities.resx */ "lcN8");
// Copyright (c) Microsoft. All rights reserved.








var TIMEOUT_IN_MILLISECONDS = 10000;
// QoS constants
var startApplicationQosScenarioName = 'SPApplicationLoader.startApplication';
var platformFailedToLoadFailure = 'PlatformFailedToLoad';
var invalidPlatformFailure = 'InvalidPlatform';
var applicationManagerStartFailure = 'ApplicationManager.Start';
var navigatorFailure = 'Navigator.navigateToApplication';
var timeoutExpectedFailure = 'Timeout';
var startLogSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('SPApplicationLoader.start');
/**
 * Platform loader.
 * Includes logic to load SPFX application platform and start applications from it.
 *
 * @internal
 */
var PlatformLoader = /** @class */ (function () {
    function PlatformLoader() {
    }
    /**
     * Loads the application platform and starts the application configured in the preloaded data.
     * Relies in SPComponentLoader to load the framework and the application components.
     *
     * @param preloadedData - Application preloaded data. Must include the application id.
     */
    PlatformLoader.startApplication = function (preloadedData, serviceScope) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(preloadedData.clientSideApplicationId, 'preloadedData.clientSideApplicationId');
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](startApplicationQosScenarioName);
        setTimeout(function () {
            if (!qosMonitor.hasEnded) {
                qosMonitor.writeExpectedFailure(timeoutExpectedFailure);
            }
        }, TIMEOUT_IN_MILLISECONDS);
        return PlatformLoader._startApplication(preloadedData, serviceScope, qosMonitor);
    };
    PlatformLoader._startApplication = function (preloadedData, serviceScope, qosMonitor) {
        var _this = this;
        function error(message, failureId) {
            var err = new Error(message);
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(startLogSource, err);
            qosMonitor.writeUnexpectedFailure(failureId, err);
            throw err;
        }
        try {
            if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('5022967b-461d-4d29-9ec0-6e183f976681'), '2019/8/22', 'Log service worker state')) {
                // Get Service Worker State
                if (window.navigator.serviceWorker && window.navigator.serviceWorker.controller) {
                    sessionStorage.setItem('serviceworkerstate', String(window.navigator.serviceWorker.controller.state));
                }
                else {
                    sessionStorage.removeItem('serviceworkerstate');
                }
            }
        }
        catch (error) {
            qosMonitor.writeUnexpectedFailure('SetServiceWorkerStateError', error);
        }
        try {
            if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('fa9cc715-c765-4161-a202-dff5e2a3e0af'), '2018/2/26', 'Load platform synchronously')) {
                // Performance optimization: If sp-application-base comes from the assembly, don't load it asynchronously.
                var spAppBaseManifest = _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_4__["default"].instance.tryGetManifest(_componentConstants__WEBPACK_IMPORTED_MODULE_5__["spApplicationBaseComponentId"]);
                if (spAppBaseManifest) {
                    var assemblySpAppBase = _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_3__["default"].instance.tryGetComponentReference(spAppBaseManifest.id, spAppBaseManifest.version);
                    if (assemblySpAppBase) {
                        return this._executePlatformCode(assemblySpAppBase, preloadedData, serviceScope, qosMonitor, error);
                    }
                }
            }
            // sp-application-base was not loaded with the assembly. Load it asynchronously
            return this._loadSpApplicationBase(error).then(function (spApplicationBase) {
                return _this._executePlatformCode(spApplicationBase, preloadedData, serviceScope, qosMonitor, error);
            }, function (err) {
                // This is meant to catch errors in _loadSpApplicationBase, not in the then clause
                return error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Utilities_resx__WEBPACK_IMPORTED_MODULE_7__["default"].platformFailedToLoadError, _componentConstants__WEBPACK_IMPORTED_MODULE_5__["spApplicationBaseComponentId"], _componentConstants__WEBPACK_IMPORTED_MODULE_5__["spApplicationBaseName"]), platformFailedToLoadFailure);
            });
        }
        catch (error) {
            qosMonitor.writeUnexpectedFailure('SyncError', error);
            return Promise.reject(error);
        }
    };
    /**
     * Runs ApplicationManager.startApplication and properly catches errors coming from there.
     */
    PlatformLoader._executePlatformCode = function (spApplicationBase, preloadedData, serviceScope, qosMonitor, error) {
        if (_SPLoaderFlights__WEBPACK_IMPORTED_MODULE_6__["default"]._useNewBootSequence()) {
            return this._navigateToApplication(spApplicationBase, preloadedData, serviceScope, qosMonitor, error);
        }
        else {
            return this._runApplicationManager(spApplicationBase, preloadedData, serviceScope, qosMonitor, error);
        }
    };
    /**
     * Runs ApplicationManager.startApplication and properly catches errors coming from there.
     */
    PlatformLoader._runApplicationManager = function (spApplicationBase, preloadedData, serviceScope, qosMonitor, error) {
        if (spApplicationBase && spApplicationBase._ApplicationManager) {
            var applicationManager = new spApplicationBase._ApplicationManager(serviceScope);
            return applicationManager.startApplication(preloadedData).then(function (result) {
                qosMonitor.writeSuccess();
                return result;
            }).catch(function (e) {
                var err = new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Utilities_resx__WEBPACK_IMPORTED_MODULE_7__["default"].applicationFailedToInitializeError, e));
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(startLogSource, err);
                qosMonitor.writeExpectedFailure(applicationManagerStartFailure, err);
                throw err;
            });
        }
        else {
            return Promise.resolve().then(function () { return error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Utilities_resx__WEBPACK_IMPORTED_MODULE_7__["default"].platformFailedToLoadError, _componentConstants__WEBPACK_IMPORTED_MODULE_5__["spApplicationBaseComponentId"], _componentConstants__WEBPACK_IMPORTED_MODULE_5__["spApplicationBaseName"]), invalidPlatformFailure); });
        }
    };
    /**
     * Runs Navigator.navigateToApplication and properly catches errors coming from there.
     */
    PlatformLoader._navigateToApplication = function (spApplicationBase, preloadedData, serviceScope, qosMonitor, error) {
        if (spApplicationBase && spApplicationBase._Navigator) {
            var applicationManager = new spApplicationBase._Navigator(serviceScope);
            return applicationManager.navigateToApplication(preloadedData).then(function (result) {
                qosMonitor.writeSuccess();
                return result;
            }).catch(function (e) {
                var err = new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Utilities_resx__WEBPACK_IMPORTED_MODULE_7__["default"].applicationFailedToInitializeError, e));
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(startLogSource, err);
                qosMonitor.writeExpectedFailure(navigatorFailure, err);
                throw err;
            });
        }
        else {
            return Promise.resolve().then(function () { return error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Utilities_resx__WEBPACK_IMPORTED_MODULE_7__["default"].platformFailedToLoadError, _componentConstants__WEBPACK_IMPORTED_MODULE_5__["spApplicationBaseComponentId"], _componentConstants__WEBPACK_IMPORTED_MODULE_5__["spApplicationBaseName"]), invalidPlatformFailure); });
        }
    };
    /**
     * Loads sp-application-base component.
     * Rejects the promise if sp-application-base can't be loaded.
     */
    PlatformLoader._loadSpApplicationBase = function (error) {
        return _loader_SPComponentLoader__WEBPACK_IMPORTED_MODULE_2__["SPComponentLoader"].loadComponentById(_componentConstants__WEBPACK_IMPORTED_MODULE_5__["spApplicationBaseComponentId"])
            .catch(function (e) {
            return error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Utilities_resx__WEBPACK_IMPORTED_MODULE_7__["default"].platformFailedToLoadWithMessageError, _componentConstants__WEBPACK_IMPORTED_MODULE_5__["spApplicationBaseComponentId"], _componentConstants__WEBPACK_IMPORTED_MODULE_5__["spApplicationBaseName"], e.message), platformFailedToLoadFailure);
        });
    };
    return PlatformLoader;
}());
/* harmony default export */ __webpack_exports__["default"] = (PlatformLoader);


/***/ }),

/***/ "gsvc":
/*!***************************************************!*\
  !*** ./lib/systemjs/SPSystemJsComponentLoader.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _loader_BaseComponentLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../loader/BaseComponentLoader */ "Uk6p");
/* harmony import */ var _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error/ErrorBuilder */ "ff4n");
/* harmony import */ var _error_SPLoaderError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../error/SPLoaderError */ "BBmw");
/* harmony import */ var _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../stores/ComponentStore */ "eaMA");
/* harmony import */ var _utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities/telemetryConstants */ "4mHd");
/* harmony import */ var _utilities_ComponentOverrider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/ComponentOverrider */ "A8iV");
/* harmony import */ var _loader_loadComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../loader/loadComponent */ "aghm");
/* harmony import */ var _SystemJsLoader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SystemJsLoader */ "U29/");
// Copyright (c) Microsoft. All rights reserved.
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
 * The component loader for SPFx.
 * This implementation uses SystemJS as the internal module loader.
 *
 * @alpha
 */
var SPSystemJsComponentLoader = /** @class */ (function (_super) {
    __extends(SPSystemJsComponentLoader, _super);
    // Initialization
    /**
     * @internal
     */
    function SPSystemJsComponentLoader(serviceScope) {
        var _this = _super.call(this, serviceScope) || this;
        _this._systemJsLoader = serviceScope.consume(_SystemJsLoader__WEBPACK_IMPORTED_MODULE_9__["default"].serviceKey);
        return _this;
    }
    // Public API
    /**
     * Given a URL, load a script.
     *
     * @param url     - The script URL.
     * @param options - globalExportsName: If the script isn't an AMD module and loads a global member on the page,
     *                    specify the global member's name.
     * @returns         A promise containing the loaded module.
     */
    SPSystemJsComponentLoader.prototype.loadScript = function (url, options) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(url, 'url');
        if (typeof options === 'string') {
            throw _error_ErrorBuilder__WEBPACK_IMPORTED_MODULE_3__["default"].buildLoadScriptWithStringError();
        }
        var globalMetaConfig = {
            meta: {}
        };
        // This ensures that SystemJS can execute a script that doesn't have any output
        globalMetaConfig.meta[url] = {
            scriptLoad: false
        };
        if (options) {
            if (options.globalExportsName) {
                globalMetaConfig.meta[url] = {
                    format: 'global',
                    exports: options.globalExportsName
                };
            }
        }
        this._systemJsLoader.systemConfig(globalMetaConfig);
        return this._systemJsLoader.systemImport(url);
    };
    /**
     * Loads a component from a manifest.
     *
     * @param manifest - Manifest of the module to load.
     * @returns          A promise containing the loaded module.
     */
    SPSystemJsComponentLoader.prototype.loadComponent = function (manifest) {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](_utilities_telemetryConstants__WEBPACK_IMPORTED_MODULE_6__["loadComponentQosScenarioName"]);
        var qosExtraData = this._buildQosExtraData(manifest);
        return Object(_loader_loadComponent__WEBPACK_IMPORTED_MODULE_8__["default"])(manifest, this._systemJsLoader)
            .then(function (component) {
            qosMonitor.writeSuccess(qosExtraData);
            return component;
        })
            .catch(function (error) {
            return _this._handleLoadComponentError(error, manifest, qosMonitor, qosExtraData);
        });
    };
    SPSystemJsComponentLoader.prototype._overrideComponent = function (componentId, componentModule) {
        _utilities_ComponentOverrider__WEBPACK_IMPORTED_MODULE_7__["default"].overrideComponent(componentId, componentModule, this._serviceScope, _SystemJsLoader__WEBPACK_IMPORTED_MODULE_9__["default"].serviceKey);
    };
    SPSystemJsComponentLoader.prototype._unloadComponent = function (manifest) {
        if (_stores_ComponentStore__WEBPACK_IMPORTED_MODULE_5__["default"].instance.tryGetComponent(manifest.id, manifest.version)) {
            _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_5__["default"].instance.deleteComponent(manifest.id, manifest.version);
            this._systemJsLoader.systemDelete(manifest);
        }
    };
    /**
     * Workaround for ListView host app, as there are problems when using SystemJS and RequireJS together.
     * By configuring SystemJS scriptLoad = false it ensures that the "define" definition in the window is
     * the one from RequireJS
     * @override
     */
    SPSystemJsComponentLoader.prototype._listViewHostWorkaround = function (preloadedData) {
        if (preloadedData.clientSideApplicationId === 'b1ab4aaa-f779-405c-8683-d3a750b5d18d') {
            this._systemJsLoader._baseSystemConfig(_SystemJsLoader__WEBPACK_IMPORTED_MODULE_9__["default"].pluginName, /* scriptLoad */ false);
        }
    };
    SPSystemJsComponentLoader.prototype._buildQosExtraData = function (manifest) {
        return {
            manifestId: manifest.id,
            version: manifest.version,
            alias: manifest.alias,
            isInternal: manifest.isInternal,
            isDebug: manifest._isDebug,
            loader: 'systemjs'
        };
    };
    SPSystemJsComponentLoader.prototype._handleLoadComponentError = function (error, manifest, qosMonitor, qosExtraData) {
        if (error instanceof _error_SPLoaderError__WEBPACK_IMPORTED_MODULE_4__["default"] && error.isExpected) {
            qosMonitor.writeExpectedFailure(undefined, error, qosExtraData);
        }
        else {
            qosMonitor.writeUnexpectedFailure(undefined, error, qosExtraData);
        }
        // If it fails to load, the caller can then call loadComponent() again and not hit the cache
        _stores_ComponentStore__WEBPACK_IMPORTED_MODULE_5__["default"].instance.deleteComponent(manifest.id, manifest.version);
        throw error;
    };
    return SPSystemJsComponentLoader;
}(_loader_BaseComponentLoader__WEBPACK_IMPORTED_MODULE_2__["BaseComponentLoader"]));
/* harmony default export */ __webpack_exports__["default"] = (SPSystemJsComponentLoader);


/***/ }),

/***/ "jLfe":
/*!***********************************************!*\
  !*** ./lib/utilities/normalizeComponentId.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponentId; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Given a component id and version, gives a normalized string that includes both string and version.
 * Used internally to provide a common way to refer to id + version in different classes.
 *
 * Example:
 * { id: d1d91016-032f-456d-98a4-721247c305e8, version: 1.0.0 } -> d1d91016-032f-456d-98a4-721247c305e8_1.0.0
 */
function normalizeComponentId(id, version) {
    id = (typeof id === 'string') ? _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(id) : id;
    version = (typeof version === 'string') ? _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Version"].parse(version) : version;
    return id.toString() + "_" + version.toString();
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

/***/ "kd3Z":
/*!*********************************************!*\
  !*** ./lib/utilities/componentConstants.js ***!
  \*********************************************/
/*! exports provided: reactComponentId, reactDomComponentId, spApplicationBaseComponentId, listViewHostComponentId, classicPageAppComponentId, react16Version, spApplicationBaseName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactComponentId", function() { return reactComponentId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactDomComponentId", function() { return reactDomComponentId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spApplicationBaseComponentId", function() { return spApplicationBaseComponentId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listViewHostComponentId", function() { return listViewHostComponentId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classicPageAppComponentId", function() { return classicPageAppComponentId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "react16Version", function() { return react16Version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spApplicationBaseName", function() { return spApplicationBaseName; });
// IDs
var reactComponentId = '0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d';
var reactDomComponentId = 'aa0a46ec-1505-43cd-a44a-93f3a5aa460a';
var spApplicationBaseComponentId = '4df9bb86-ab0a-4aab-ab5f-48bf167048fb';
var listViewHostComponentId = 'b1ab4aaa-f779-405c-8683-d3a750b5d18d';
var classicPageAppComponentId = 'eb4b666b-5c29-4dad-9a99-23613f21a2b7';
// Versions
var react16Version = '16.8.5';
// Names
var spApplicationBaseName = '@microsoft/sp-application-base';


/***/ }),

/***/ "lcN8":
/*!*****************************************!*\
  !*** ./lib/utilities/Utilities.resx.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_KuTfBwDffam4eyPQEJupWw';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "mKTs":
/*!***************************************************************************************!*\
  !*** ./lib/DeveloperTools/BrowserDeveloperToolsWarning/showBrowserDevToolsWarning.js ***!
  \***************************************************************************************/
/*! exports provided: showBrowserDevToolsWarning */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showBrowserDevToolsWarning", function() { return showBrowserDevToolsWarning; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BrowserDeveloperToolsWarning_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BrowserDeveloperToolsWarning.resx */ "H/UD");


var WARNING_URL = 'https://technet.microsoft.com/en-us/library/bb794823.aspx';
function showBrowserDevToolsWarning() {
    var browserInfo = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_BrowserDetection"].getBrowserInformation();
    var warningHeading = _BrowserDeveloperToolsWarning_resx__WEBPACK_IMPORTED_MODULE_1__["default"].warningHeading;
    var warningLine1 = _BrowserDeveloperToolsWarning_resx__WEBPACK_IMPORTED_MODULE_1__["default"].warningLine1;
    var warningLine2 = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_BrowserDeveloperToolsWarning_resx__WEBPACK_IMPORTED_MODULE_1__["default"].warningLine2, WARNING_URL);
    if (browserInfo.browser === 1 /* Chrome */ ||
        browserInfo.browser === 3 /* Firefox */ ||
        browserInfo.browser === 5 /* Safari */) {
        var stylesCss =  false
            ? undefined
            : __webpack_require__(/*! !raw-loader!./BrowserDeveloperToolsWarning.css */ "QcRg");
        // Parse out the styles from the CSS file
        var headingCss = (stylesCss.match(/\.heading\s*{([^}]+)}/) || [])[1];
        var otherLinesCss = (stylesCss.match(/\.otherLines\s*{([^}]+)}/) || [])[1];
        // Formatting supported
        console.log("\n%c" + warningHeading + "%c\n" + warningLine1 + "\n\n" + warningLine2 + "\n\n", headingCss, otherLinesCss);
    }
    else {
        // No formatting
        console.log("\n" + warningHeading + "\n" + warningLine1 + "\n\n" + warningLine2 + "\n\n");
    }
}


/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: SPComponentLoader, _SPStarter, _SPLoaderFlights, _ManifestStore, _ManifestProvider, _RootServiceScopeBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loader_SPComponentLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader/SPComponentLoader */ "KZU3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPComponentLoader", function() { return _loader_SPComponentLoader__WEBPACK_IMPORTED_MODULE_0__["SPComponentLoader"]; });

/* harmony import */ var _starter_SPStarter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./starter/SPStarter */ "wMLj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_SPStarter", function() { return _starter_SPStarter__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _utilities_SPLoaderFlights__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities/SPLoaderFlights */ "dQRF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_SPLoaderFlights", function() { return _utilities_SPLoaderFlights__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stores/ManifestStore */ "Eke5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_ManifestStore", function() { return _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _stores_ManifestProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stores/ManifestProvider */ "Y/fc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_ManifestProvider", function() { return _stores_ManifestProvider__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _utilities_RootServiceScopeBuilder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utilities/RootServiceScopeBuilder */ "pydo");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_RootServiceScopeBuilder", function() { return _utilities_RootServiceScopeBuilder__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/**
 * The SharePoint Framework loader
 *
 * @remarks
 * Built on familiar standards such as RequireJS and WebPack,
 * the loader is the first part of the SharePoint Framework to load on a page.
 * It manages versioning and loading of client-side components.
 *
 * @packagedocumentation
 */
// Static proxies for the API








/***/ }),

/***/ "pydo":
/*!**************************************************!*\
  !*** ./lib/utilities/RootServiceScopeBuilder.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-dynamic-data */ "84nK");
/* harmony import */ var _microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__);
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





/**
 * Builds a new root service scope, initialized with the preloaded data.
 *
 * @remarks
 * This should only be created once, at the initialization of SPFx.
 *
 * @internal
 */
var RootServiceScopeBuilder = /** @class */ (function () {
    function RootServiceScopeBuilder() {
    }
    /**
     * Creates a root service scope and it initializes with SPFx services (page context, http clients)
     */
    RootServiceScopeBuilder.build = function (preloadedData) {
        var serviceScope = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["ServiceScope"].startNewRoot();
        serviceScope.provide(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_logSourceServiceKey"], RootServiceScopeBuilder._logSource);
        serviceScope.createDefaultAndProvide(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__["PageContext"].serviceKey);
        serviceScope.createDefaultAndProvide(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"].serviceKey);
        var spHttpClient = serviceScope.createDefaultAndProvide(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["SPHttpClient"].serviceKey);
        serviceScope.createDefaultAndProvide(_microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_1__["_DynamicDataUtilities"].IDynamicDataManagerServiceKey);
        var _graphContext = serviceScope.createDefaultAndProvide(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["_GraphHttpClientContext"].serviceKey);
        var digestCache = serviceScope.createDefaultAndProvide(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["DigestCache"].serviceKey);
        serviceScope.finish();
        this._initializeGraphHttpClient(_graphContext, preloadedData, spHttpClient);
        this._initializeDigestCache(digestCache, preloadedData);
        return serviceScope;
    };
    RootServiceScopeBuilder._initializeGraphHttpClient = function (graphContext, preloadedData, spHttpClient) {
        // We don't want to initialize AAD/Graph client assets for On-Prem/Workbench until
        // these scenarios are supported.
        if ( true && _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Environment"].type !== _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["EnvironmentType"].Local) {
            graphContext.initialize(preloadedData.spPageContextInfo.webServerRelativeUrl, preloadedData.spPageContextInfo.msGraphEndpointUrl, preloadedData.spPageContextInfo.webAbsoluteUrl);
            try {
                var redirectUri = RootServiceScopeBuilder.FLUID_DOMAINS.indexOf(window.location.host) > -1 ?
                    window.location.origin + '/spfxsinglesignon' :
                    window.location.origin + '/_forms/' + _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["_AadConstants"].SPFX_SINGLE_SIGN_ON_REPLY_URL;
                var _a = preloadedData.spPageContextInfo, aadInstanceUrl = _a.aadInstanceUrl, aadTenantId = _a.aadTenantId, aadUserId = _a.aadUserId, isAnonymousGuestUser = _a.isAnonymousGuestUser, isExternalGuestUser = _a.isExternalGuestUser, spfxOBOFlowEnabled = _a.spfxOBOFlowEnabled, userPrincipalName = _a.userPrincipalName;
                var defaultAadConfiguration = {
                    aadInstanceUrl: aadInstanceUrl,
                    aadTenantId: aadTenantId,
                    aadUserId: aadUserId,
                    redirectUri: redirectUri,
                    servicePrincipalId: '',
                    userPrincipalName: userPrincipalName
                };
                // Guest and External Users won't be able to retrieve tokens if a UPN is provided
                if (isAnonymousGuestUser || isExternalGuestUser) {
                    defaultAadConfiguration.userPrincipalName = undefined;
                }
                // @todo [VSO:SPPLAT:770273] [ADAL] Deprecate userPrincipalName property and add loginHint property
                if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(RootServiceScopeBuilder.upnGuestUserGuid, '9/4/19', 'Provide user email for guest and external users') &&
                    isAnonymousGuestUser || isExternalGuestUser) {
                    defaultAadConfiguration.userPrincipalName = preloadedData.spPageContextInfo.userEmail;
                }
                var preconfiguredAppConfiguration = __assign({}, defaultAadConfiguration, { servicePrincipalId: _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["_AadConstants"].PRE_AUTHORIZED_APP_PRINCIPAL_ID });
                if (spfxOBOFlowEnabled &&
                    _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_BrowserUtilities"].isMobileWebView() ||
                    _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_BrowserUtilities"].isWebViewHosted()) {
                    _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["_AadTokenProviders"]._initialize(new _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["AadTokenProvider"](__assign({}, defaultAadConfiguration, { servicePrincipalId: preloadedData.spPageContextInfo.spfx3rdPartyServicePrincipalId }), {
                        serverRelativeUrl: preloadedData.spPageContextInfo.webAbsoluteUrl,
                        spHttpClient: spHttpClient
                    }), preconfiguredAppConfiguration);
                }
                else {
                    _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["_AadTokenProviders"]._initialize(new _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["AadTokenProvider"](__assign({}, defaultAadConfiguration, { servicePrincipalId: preloadedData.spPageContextInfo.spfx3rdPartyServicePrincipalId })), preconfiguredAppConfiguration);
                }
            }
            catch (e) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logVerbose(this._logSource, 'AadTokenProviders: Failed to initialize');
            }
        }
    };
    RootServiceScopeBuilder._initializeDigestCache = function (digestCache, preloadedData) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(preloadedData, 'preloadedData');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(preloadedData.spPageContextInfo, 'preloadedData.spPageContextInfo');
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logVerbose(this._logSource, 'ServiceScopeBuilder: Added preloaded FormDigestValue to cache');
        if (preloadedData.spPageContextInfo) {
            var expirationTimestamp = void 0;
            // Value of serverTime is same as what comes as part of formDigestValue
            // but is in locale neutral ISO 8601 format. So it will get correctly
            // parsed by Date class irrespective of client locale.
            // serverTime is accurate to the order of ms, while DateTime which comes
            // as part of formDigestValue is trimmed to order of seconds. Subtract
            // 30s from expirationTimeStamp to avoid any timing errors b/w server and client
            var serverTimeInMs = new Date(preloadedData.spPageContextInfo.serverTime).getTime();
            expirationTimestamp = serverTimeInMs +
                (1000 * preloadedData.spPageContextInfo.formDigestTimeoutSeconds) -
                this.PRELOAD_DIGEST_EXPIRATION_SLOP_MS;
            digestCache.addDigestToCache(preloadedData.spPageContextInfo.webServerRelativeUrl, preloadedData.spPageContextInfo.formDigestValue, expirationTimestamp);
            digestCache.addDigestToCache(preloadedData.spPageContextInfo.webAbsoluteUrl, preloadedData.spPageContextInfo.formDigestValue, expirationTimestamp);
        }
    };
    /**
     * Log source for the root service scope
     */
    RootServiceScopeBuilder._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_LogSource"].create('RootServiceScope');
    RootServiceScopeBuilder.upnGuestUserGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('411f7ef9-c165-45db-b054-7a4692612643');
    // Estimates the lag between when the server generated the form digest, and when
    // performance.now() started measuring the browser page
    RootServiceScopeBuilder.PRELOAD_DIGEST_EXPIRATION_SLOP_MS = 30000; // 30 secs
    RootServiceScopeBuilder.FLUID_DOMAINS = [
        'dev.fluid.office.com',
        'dev.fluidpreview.office.net',
        'fluidpreview.office.net'
    ];
    return RootServiceScopeBuilder;
}());
/* harmony default export */ __webpack_exports__["default"] = (RootServiceScopeBuilder);


/***/ }),

/***/ "qoaT":
/*!***********************************!*\
  !*** ./lib/loader/Loader.resx.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_F4HRA/FKfb0X6JapWo2vTw';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "td2X":
/*!************************************************!*\
  !*** ./lib/utilities/LoadComponentExecutor.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var LoadComponentExecutor = /** @class */ (function () {
    // tslint:disable-next-line:no-any
    function LoadComponentExecutor(loadFunction) {
        this._pendingLoads = [];
        this._loadFunction = loadFunction;
    }
    LoadComponentExecutor.prototype.setAlternativeExecutor = function (executor) {
        this._alternativeExecutor = executor;
        executor._alternativeExecutor = this;
    };
    LoadComponentExecutor.prototype.loadComponent = function (manifest) {
        var _this = this;
        if (!this._canRunLoad()) {
            return new Promise(function (resolve, reject) {
                _this._pendingLoads.push(function () {
                    _this.loadComponent(manifest).then(resolve, reject);
                });
            });
        }
        this._incrementActiveLoads();
        return this._loadFunction(manifest).then(function (module) {
            _this._decrementActiveLoads();
            return module;
        }, function (error) {
            _this._decrementActiveLoads();
            throw error;
        });
    };
    Object.defineProperty(LoadComponentExecutor.prototype, "isRunning", {
        /**
         * Returns true if SystemJS is currently running any loadComponent() call.
         *
         * @remarks
         * This is used to ensure that SystemJS will not run while RequireJS is not done with all loads.
         */
        get: function () {
            return this._activeLoads > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * When called, executes all the loadComponent() calls that couldn't be executed before.
     *
     * @remarks
     * This is used to ensure that we don't run SystemJS while RequireJS is not done trying to load a component.
     */
    LoadComponentExecutor.prototype.processPendingLoads = function () {
        var _loadsToRun = this._pendingLoads;
        this._pendingLoads = [];
        _loadsToRun.forEach(function (load) { return load(); });
    };
    /**
     * Returns true if loadComponent() can be executed.
     *
     * @remarks
     * It just checks that RequireJS is not running at the time, as both can't work at the same time.
     */
    LoadComponentExecutor.prototype._canRunLoad = function () {
        return !this._alternativeExecutor || !this._alternativeExecutor.isRunning;
    };
    /**
     * Increments the number of active loads.
     */
    LoadComponentExecutor.prototype._incrementActiveLoads = function () {
        this._activeLoads++;
    };
    /**
     * Decrements the number of active loads.
     * When there are no active loads, it tries to load any pending request in RequireJS.
     */
    LoadComponentExecutor.prototype._decrementActiveLoads = function () {
        this._activeLoads--;
        if (this._activeLoads === 0 && this._alternativeExecutor) {
            this._alternativeExecutor.processPendingLoads();
        }
    };
    return LoadComponentExecutor;
}());
/* harmony default export */ __webpack_exports__["default"] = (LoadComponentExecutor);


/***/ }),

/***/ "ut3N":
/*!********************************************!*\
  !*** external "@microsoft/sp-diagnostics" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ut3N__;

/***/ }),

/***/ "vlQI":
/*!*************************************!*\
  !*** external "@microsoft/sp-http" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vlQI__;

/***/ }),

/***/ "vpy3":
/*!*******************************!*\
  !*** external "resx-strings" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vpy3__;

/***/ }),

/***/ "wMLj":
/*!**********************************!*\
  !*** ./lib/starter/SPStarter.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _debug_confirmDebugAllowed__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../debug/confirmDebugAllowed */ "MqKS");
/* harmony import */ var _debug_DebugManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../debug/DebugManager */ "GV8Z");
/* harmony import */ var _DeveloperTools_BrowserDeveloperToolsWarning_showBrowserDevToolsWarning__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DeveloperTools/BrowserDeveloperToolsWarning/showBrowserDevToolsWarning */ "mKTs");
/* harmony import */ var _DeveloperTools_DeveloperToolsLoader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../DeveloperTools/DeveloperToolsLoader */ "IG7x");
/* harmony import */ var _DeveloperTools_DeveloperToolsProxy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../DeveloperTools/DeveloperToolsProxy */ "2clK");
/* harmony import */ var _requirejs_SPRequireJsComponentLoader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../requirejs/SPRequireJsComponentLoader */ "++S4");
/* harmony import */ var _requirejs_SystemJsFallbackLoader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../requirejs/SystemJsFallbackLoader */ "PypK");
/* harmony import */ var _stores_LocaleStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../stores/LocaleStore */ "XZXY");
/* harmony import */ var _stores_ManifestProvider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../stores/ManifestProvider */ "Y/fc");
/* harmony import */ var _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../stores/ManifestStore */ "Eke5");
/* harmony import */ var _systemjs_SPSystemJsComponentLoader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../systemjs/SPSystemJsComponentLoader */ "gsvc");
/* harmony import */ var _utilities_BrowserSupport__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../utilities/BrowserSupport */ "JWqh");
/* harmony import */ var _utilities_componentConstants__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../utilities/componentConstants */ "kd3Z");
/* harmony import */ var _utilities_KillSwitches__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../utilities/KillSwitches */ "HLbO");
/* harmony import */ var _utilities_RootServiceScopeBuilder__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../utilities/RootServiceScopeBuilder */ "pydo");
/* harmony import */ var _Starter_resx__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Starter.resx */ "FcGP");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */



















// !!! Show the developer tools warning as soon as the page loads !!!
if (false) {}
var REQUIREJS_FLIGHT_ID = 125;
var ARIA_DISABLE_TELEMETRY_LOGGING_FLIGHT_ID = 1190;
var DEBUG_FLIGHTS_QUERY_PARAM = 'debugFlights';
var DEBUG_KILLSWITCHES_QUERY_PARAM = 'debugKillSwitches';
var COMPONENT_LOADER_GLOBAL_VARIABLE = '_spComponentLoader';
// QoS constants
var startQosScenarioName = 'SPComponentLoader.start';
/**
 * Bootstrapper for the application
 * @internal
 */
var SPStarter = /** @class */ (function () {
    function SPStarter() {
    }
    /**
     * Sets a map with the bundled components. These components will be added to the component loader
     * during initialization, so they won't need to be loaded afterwards.
     * The map is of the form `componentId: string -> component: Object`
     *
     * @internal
     */
    SPStarter._setBundledComponents = function (bundledComponents) {
        if (!SPStarter._bundledComponents) {
            SPStarter._bundledComponents = bundledComponents;
        }
        else {
            throw new Error('Bundled components can be only set once'); // TODO mpasarin: Localize
        }
    };
    /**
     * This is called by the page scripts to start loading the framework. Do not call it from your own code.
     *
     * @param handleFailure - Error handler function provided by the server to execute if there is SPFx can't be loaded.
     *  It may redirect to an error page or log error data in the console.
     * @param debugData - This parameter is used when the loader initializes a debug loader and
     *  should never be provided by any external callers.
     * @param skipTelemetry - Do not set this parameter to true unless it is a non-production scenario.
     */
    SPStarter.start = function (preloadedData, handleFailure, debugData, skipTelemetry) {
        var _this = this;
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_PerformanceLogger"].devMark('SPStarter.start');
        if (!preloadedData || !preloadedData.spPageContextInfo) {
            var error = new Error(_Starter_resx__WEBPACK_IMPORTED_MODULE_18__["default"].invalidPreloadedDataError);
            handleFailure({
                error: error,
                message: _Starter_resx__WEBPACK_IMPORTED_MODULE_18__["default"].loaderUserFriendlyError,
                operationName: 'InvalidPreloadedData'
            });
            return Promise.reject(error);
        }
        var correlationId = preloadedData.spPageContextInfo.CorrelationId;
        // Check for browser compatibility
        var browserCompatibility = SPStarter.getBrowserCompatibility();
        if (browserCompatibility.supportLevel === 3 /* Blocked */) {
            return this.handleError(new Error(browserCompatibility.warning), _Starter_resx__WEBPACK_IMPORTED_MODULE_18__["default"].browserNotSupportedError, 'BrowserNotSupported', correlationId, preloadedData);
        }
        // Initialize flights and killswitches
        this._initializeFlightsAndKillswitches(preloadedData);
        if (debugData &&
            !_utilities_KillSwitches__WEBPACK_IMPORTED_MODULE_16__["KillSwitches"].isDangerouslyEnableDebugKillSwitchActivated()) {
            Object(_debug_confirmDebugAllowed__WEBPACK_IMPORTED_MODULE_3__["dangerouslyEnableDebug"])();
        }
        var serviceScope = _utilities_RootServiceScopeBuilder__WEBPACK_IMPORTED_MODULE_17__["default"].build(preloadedData);
        _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_12__["default"].instance._setManifestProvider(new _stores_ManifestProvider__WEBPACK_IMPORTED_MODULE_11__["default"](serviceScope, preloadedData.spPageContextInfo.webAbsoluteUrl));
        var spLoader = __webpack_require__(/*! ../index */ "mwqp");
        var componentLoader = this._useRequireJs(preloadedData)
            ? new _requirejs_SPRequireJsComponentLoader__WEBPACK_IMPORTED_MODULE_8__["default"](serviceScope, new _requirejs_SystemJsFallbackLoader__WEBPACK_IMPORTED_MODULE_9__["default"](serviceScope))
            : new _systemjs_SPSystemJsComponentLoader__WEBPACK_IMPORTED_MODULE_13__["default"](serviceScope);
        var qosMonitor = undefined;
        try {
            // Initialize telemetry
            if (!skipTelemetry) {
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Log"]._initialize(new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogHandler"]());
            }
            SPStarter._initializeEnvironment(preloadedData);
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Session"]._initialize({ applicationId: preloadedData.spPageContextInfo.CorrelationId });
            if (!skipTelemetry) {
                SPStarter._initializeTelemetry(preloadedData);
                _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_PerformanceLogger"].markSpLoaderStart();
                // Ensure that Telemetry logs in real time, if not already doing so
                window.setTimeout(function () {
                    SPStarter._logDataInRealTime();
                }, SPStarter._realTimeProcessingWaitTime);
            }
            qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](startQosScenarioName);
            if (!preloadedData.buildNumber) {
                throw new Error('Missing build number in preloaded data.');
            }
            // Set locale
            _stores_LocaleStore__WEBPACK_IMPORTED_MODULE_10__["default"].setLocale(preloadedData.spPageContextInfo.currentUICultureName);
            // Initialize the proxies
            componentLoader._initialize(preloadedData, SPStarter._getBundledComponents(), debugData || {});
            spLoader.SPComponentLoader._initialize(componentLoader);
            window[COMPONENT_LOADER_GLOBAL_VARIABLE] = spLoader.SPComponentLoader;
        }
        catch (error) {
            return Promise.reject(error);
        }
        // Support "debugLayout" query param. This is used only for the Teams tab in SharePoint testing
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1086 /* SppplatTeamsTabWebPart */)) {
            var queryParams = new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["UrlQueryParameterCollection"](window.location.href);
            var debugLayout = queryParams.getValue('debugLayout');
            if (debugLayout && preloadedData.item) {
                // tslint:disable-next-line:no-string-literal
                preloadedData.item['PageLayoutType'] = debugLayout;
            }
        }
        return _debug_DebugManager__WEBPACK_IMPORTED_MODULE_4__["DebugManager"].initialize(componentLoader, debugData).then(function (debugLoadResult) {
            if (debugLoadResult.debugLoader) {
                // If we're loading a debug loader, call "start" on it instead of continuing with the normal initialization
                // flow
                componentLoader._unloadComponents();
                return debugLoadResult.debugLoader.start(preloadedData, handleFailure, debugLoadResult);
            }
            // Load the dev tools after the debug loader to reference the right diagnostics component
            _DeveloperTools_DeveloperToolsProxy__WEBPACK_IMPORTED_MODULE_7__["default"].initialize(_DeveloperTools_DeveloperToolsLoader__WEBPACK_IMPORTED_MODULE_6__);
            if (preloadedData.clientSideApplicationId) {
                // Start the application
                return spLoader.SPComponentLoader._startApplication(preloadedData).then(function (application) {
                    qosMonitor.writeSuccess();
                    return application;
                }).catch(function (error) {
                    if (error.message === 'Out of stack space') {
                        qosMonitor.writeExpectedFailure('ConflictingPolyfill', error);
                    }
                    else {
                        qosMonitor.writeUnexpectedFailure('StartApplication', error);
                    }
                    return _this.handleError(error, _Starter_resx__WEBPACK_IMPORTED_MODULE_18__["default"].loaderUserFriendlyError, 'StartApplication', correlationId, preloadedData);
                });
            }
            else {
                // If there is no application to load, just return void
                qosMonitor.writeSuccess();
                return Promise.resolve();
            }
        }).then(function (application) {
            // Log telemetry data from buffers to the server
            if (!skipTelemetry) {
                SPStarter._logDataInRealTime();
            }
            return application;
        }).catch(function (error) {
            if (qosMonitor) {
                qosMonitor.writeUnexpectedFailure(undefined, error);
            }
            if (!skipTelemetry) {
                SPStarter._logDataInRealTime();
            }
            return _this.handleError(error, _Starter_resx__WEBPACK_IMPORTED_MODULE_18__["default"].loaderUserFriendlyError, _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_Telemetry"].isInitialized ? 'ClientError' : 'ClientErrorBeforeTelemetry', correlationId, preloadedData);
        });
    };
    /**
     * Returns the support level for the browser.
     *
     * There are some specific browsers that we know don't work with SPFx, and some
     * features that the browser needs to support for SPFx. In those cases the page
     * shouldn't even try to load.
     *
     * This is intended to be called by the page scripts before start.
     * There is no need, and no use, to call it from your own code.
     */
    SPStarter.getBrowserCompatibility = function () {
        return _utilities_BrowserSupport__WEBPACK_IMPORTED_MODULE_14__["default"].getBrowserCompatibility();
    };
    SPStarter._logDataInRealTime = function () {
        if (!SPStarter._isTelemetryDisabled() && !SPStarter._isTelemetryLoggingInRealTime) {
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_Telemetry"].startRealTimeProcessing();
            SPStarter._isTelemetryLoggingInRealTime = true;
        }
    };
    /**
     * Returns the bundled components variable, after checking it exists.
     * If it doesn't exist, it throws an error as SPFx cannot be initialized without it.
     */
    SPStarter._getBundledComponents = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(SPStarter._bundledComponents, 'bundledComponents');
        return SPStarter._bundledComponents;
    };
    SPStarter._initializeEnvironment = function (preloadedData) {
        var type;
        /* tslint:disable:no-string-literal */
        if (window.location.hostname === 'localhost' ||
            window['ENVIRONMENTTYPE'] &&
                window['ENVIRONMENTTYPE'] === 'Local') {
            /* tslint:enable:no-string-literal */
            type = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["EnvironmentType"].Local;
        }
        else if (preloadedData.clientSideApplicationId === 'eb4b666b-5c29-4dad-9a99-23613f21a2b7') {
            // 'eb4b666b-5c29-4dad-9a99-23613f21a2b7' is the classic page application id.
            type = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["EnvironmentType"].ClassicSharePoint;
        }
        else {
            type = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["EnvironmentType"].SharePoint;
        }
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Environment"]._initialize({ type: type });
    };
    SPStarter._initializeTelemetry = function (preloadedData) {
        if (SPStarter._isTelemetryDisabled()) {
            return;
        }
        var clientSideApplicationId = preloadedData.clientSideApplicationId, item = preloadedData.item, manifests = preloadedData.manifests, spPageContextInfo = preloadedData.spPageContextInfo;
        var pageContextInfo = spPageContextInfo;
        var completenessUrls = pageContextInfo.completenessUrls, CorrelationId = pageContextInfo.CorrelationId, currentUICultureName = pageContextInfo.currentUICultureName, env = pageContextInfo.env, farmLabel = pageContextInfo.farmLabel, listId = pageContextInfo.listId, siteId = pageContextInfo.siteId, siteSubscriptionId = pageContextInfo.siteSubscriptionId, systemUserKey = pageContextInfo.systemUserKey, userLoginName = pageContextInfo.userLoginName, webId = pageContextInfo.webId, webTemplate = pageContextInfo.webTemplate;
        var listItemUniqueId = item && item.UniqueId;
        // The first manifest is always the application's manifest.
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_Telemetry"].initialize(manifests[0].alias, {
            environment: env,
            farmLabel: farmLabel,
            clientSideApplicationId: clientSideApplicationId || '',
            siteSubscriptionId: siteSubscriptionId,
            buildNumber: preloadedData.buildNumber,
            loginName: userLoginName,
            systemUserKey: systemUserKey,
            currentUICultureName: currentUICultureName,
            correlationId: CorrelationId,
            enableConsoleLog: SPStarter._isConsoleLogEnabled(),
            siteId: siteId,
            webId: webId,
            webTemplateId: webTemplate,
            completenessCallbackEndpoint: this._extractCompletenessCallbackEndpoint(completenessUrls),
            listId: listId,
            listItemUniqueId: listItemUniqueId
        });
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_Diagnostics"].initialize({
            enableConsoleLog: SPStarter._isConsoleLogEnabled(),
            siteId: siteId,
            webId: webId,
            listId: listId,
            listItemUniqueId: listItemUniqueId,
            correlationId: CorrelationId
        });
    };
    SPStarter._initializeFlightsAndKillswitches = function (preloadedData) {
        // Initialize flights and killswitches with the data from the server
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].initialize(preloadedData.spPageContextInfo.ExpFeatures);
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].initialize(preloadedData.spPageContextInfo.killSwitches);
        // Initialize debug flights and killswitches from the query params
        var allowDebugQueryParameter = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isDebugFlightEnabled
            || _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Environment"].type === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["EnvironmentType"].Local;
        if (allowDebugQueryParameter) {
            var queryParams = new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["UrlQueryParameterCollection"](window.location.href);
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].setDebugFlights(queryParams.getValue(DEBUG_FLIGHTS_QUERY_PARAM));
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].setDebugKillswitches(queryParams.getValue(DEBUG_KILLSWITCHES_QUERY_PARAM));
        }
    };
    SPStarter._isQueryParameterTrue = function (name) {
        var parameterValue;
        try {
            var queryParams = new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["UrlQueryParameterCollection"](window.location.href);
            parameterValue = queryParams.getValue(name) === 'true';
        }
        catch (error) {
            parameterValue = false;
        }
        return parameterValue;
    };
    SPStarter._isConsoleLogEnabled = function () {
        return SPStarter._isQueryParameterTrue('enableConsoleLog');
    };
    SPStarter._isTelemetryDisabled = function () {
        return (SPStarter._isQueryParameterTrue('disableTelemetry') ||
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(ARIA_DISABLE_TELEMETRY_LOGGING_FLIGHT_ID));
    };
    SPStarter._useRequireJs = function (preloadedData) {
        var clientSideApplicationId = preloadedData.clientSideApplicationId;
        var isFlightEnabled = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(REQUIREJS_FLIGHT_ID);
        var isKillSwitchEnabled = _utilities_KillSwitches__WEBPACK_IMPORTED_MODULE_16__["KillSwitches"].isRequireJSKillSwitchActivated();
        var isListViewApplication = clientSideApplicationId === _utilities_componentConstants__WEBPACK_IMPORTED_MODULE_15__["listViewHostComponentId"];
        var isClassicPageApplication = clientSideApplicationId === _utilities_componentConstants__WEBPACK_IMPORTED_MODULE_15__["classicPageAppComponentId"];
        // ListView app has a dependency on using requirejs
        if (isListViewApplication) {
            return true;
        }
        // Do not use requirejs in the classic page app
        if (isClassicPageApplication) {
            return false;
        }
        return isFlightEnabled && !isKillSwitchEnabled;
    };
    SPStarter.handleError = function (error, userFriendlyMessage, operationName, correlationId, preloadedData) {
        var errorInformation = {
            message: userFriendlyMessage,
            correlationId: correlationId,
            error: error,
            operationName: operationName
        };
        if (this._isRedirectDisabled(preloadedData)) {
            this._consoleErrorHandleFailure(errorInformation);
        }
        else {
            this._errorAspxHandleFailure(errorInformation);
        }
        return Promise.reject(error);
    };
    SPStarter._isRedirectDisabled = function (preloadedData) {
        return SPStarter._isQueryParameterTrue('noredir') ||
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Environment"].type === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["EnvironmentType"].ClassicSharePoint || // Classic pages
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Environment"].type === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["EnvironmentType"].Local || // Local workbench
            preloadedData.clientSideApplicationId === _utilities_componentConstants__WEBPACK_IMPORTED_MODULE_15__["listViewHostComponentId"]; // ListView application
    };
    SPStarter._consoleErrorHandleFailure = function (errorInformation) {
        console.error(errorInformation.message);
        if (errorInformation.correlationId) {
            console.error("Correlation Id: " + errorInformation.correlationId);
        }
        if (errorInformation.operationName) {
            console.error("Operation name: " + errorInformation.operationName);
        }
        if (errorInformation.error) {
            console.error(errorInformation.error.message);
            console.error("CALL STACK: " + errorInformation.error.stack);
        }
    };
    SPStarter._errorAspxHandleFailure = function (errorInformation) {
        window.location.href =
            '_layouts/15/error.aspx' +
                '?ErrorCorrelationId=' + encodeURIComponent(errorInformation.correlationId || '') +
                '&ErrorText=' + encodeURIComponent(errorInformation.message) +
                '&ErrorDetails=' + encodeURIComponent(errorInformation.error ? errorInformation.error.toString() : '') +
                '&Name=' + encodeURIComponent(errorInformation.operationName || 'DefaultOperation') +
                '&ErrorCategory=spfx';
    };
    SPStarter._extractCompletenessCallbackEndpoint = function (completenessUrls) {
        if (completenessUrls && completenessUrls.length > 0) {
            return completenessUrls[0] + "/api/collection";
        }
        else {
            return undefined;
        }
    };
    SPStarter._bundledComponents = undefined;
    SPStarter._isTelemetryLoggingInRealTime = false;
    SPStarter._realTimeProcessingWaitTime = 1 * 1000; // 1 second
    return SPStarter;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPStarter);


/***/ })

/******/ })});;
//# sourceMappingURL=sp-loader.js.map