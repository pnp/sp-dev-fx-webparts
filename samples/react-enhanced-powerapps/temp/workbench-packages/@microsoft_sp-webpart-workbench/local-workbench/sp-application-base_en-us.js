define("4df9bb86-ab0a-4aab-ab5f-48bf167048fb_1.11.0", ["@microsoft/decorators","@microsoft/load-themed-styles","@microsoft/sp-component-base","@microsoft/sp-core-library","@microsoft/sp-diagnostics","@microsoft/sp-extension-base","@microsoft/sp-http","@microsoft/sp-loader","@microsoft/sp-lodash-subset","@microsoft/sp-page-context","@ms/odsp-utilities-bundle","@ms/sp-load-themed-styles","@ms/sp-suite-nav","@ms/sp-telemetry","@ms/uifabric-styling-bundle","react","react-dom"], function(__WEBPACK_EXTERNAL_MODULE__microsoft_decorators__, __WEBPACK_EXTERNAL_MODULE__microsoft_load_themed_styles__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_component_base__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_core_library__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_diagnostics__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_extension_base__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_http__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_loader__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_lodash_subset__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_page_context__, __WEBPACK_EXTERNAL_MODULE__ms_odsp_utilities_bundle__, __WEBPACK_EXTERNAL_MODULE__ms_sp_load_themed_styles__, __WEBPACK_EXTERNAL_MODULE__ms_sp_suite_nav__, __WEBPACK_EXTERNAL_MODULE__ms_sp_telemetry__, __WEBPACK_EXTERNAL_MODULE__ms_uifabric_styling_bundle__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./sp-application-base.js");
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
    "_tZTEjqMO7pBJoQSOs5iS2g": {
      "applicationFailedToLoadWithMessageError": "***Application failed to load. Id: \"{0}\".\r\nError: {1}",
      "applicationFailedToInitializeError": "***Error initializing application. Error: {0}",
      "clickToResolveIssueLinkText": "Click to provide additional credentials."
    }
  };

  strings.default = strings;
  return strings;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sp-application-base.js":
/*!********************************!*\
  !*** ./sp-application-base.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! @ms/sp-telemetry */ "@ms/sp-telemetry"),__webpack_require__(/*! @ms/sp-load-themed-styles */ "@ms/sp-load-themed-styles"),__webpack_require__(/*! @ms/sp-suite-nav */ "@ms/sp-suite-nav"),__webpack_require__(/*! @microsoft/sp-component-base */ "@microsoft/sp-component-base"),__webpack_require__(/*! @microsoft/sp-loader */ "@microsoft/sp-loader"),__webpack_require__(/*! @microsoft/sp-lodash-subset */ "@microsoft/sp-lodash-subset"),__webpack_require__(/*! @microsoft/sp-core-library */ "@microsoft/sp-core-library"),__webpack_require__(/*! @microsoft/sp-page-context */ "@microsoft/sp-page-context"),__webpack_require__(/*! @microsoft/sp-extension-base */ "@microsoft/sp-extension-base"),__webpack_require__(/*! react */ "react"),__webpack_require__(/*! react-dom */ "react-dom"),__webpack_require__(/*! @ms/uifabric-styling-bundle */ "@ms/uifabric-styling-bundle"),__webpack_require__(/*! @microsoft/load-themed-styles */ "@microsoft/load-themed-styles"),__webpack_require__(/*! @microsoft/sp-diagnostics */ "@microsoft/sp-diagnostics"),__webpack_require__(/*! @microsoft/sp-http */ "@microsoft/sp-http"),__webpack_require__(/*! resx-strings */ "../lib/resx-strings/en-us.js"),__webpack_require__(/*! @microsoft/decorators */ "@microsoft/decorators"),__webpack_require__(/*! @ms/odsp-utilities-bundle */ "@ms/odsp-utilities-bundle")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(__WEBPACK_EXTERNAL_MODULE__2q6Q__, __WEBPACK_EXTERNAL_MODULE__5z2F__, __WEBPACK_EXTERNAL_MODULE__6iXJ__, __WEBPACK_EXTERNAL_MODULE__7Awa__, __WEBPACK_EXTERNAL_MODULE_I6O9__, __WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_X_PM__, __WEBPACK_EXTERNAL_MODULE_ZFc5__, __WEBPACK_EXTERNAL_MODULE_cDcd__, __WEBPACK_EXTERNAL_MODULE_faye__, __WEBPACK_EXTERNAL_MODULE_fglE__, __WEBPACK_EXTERNAL_MODULE_jOlS__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_vlQI__, __WEBPACK_EXTERNAL_MODULE_vpy3__, __WEBPACK_EXTERNAL_MODULE_wxtz__, __WEBPACK_EXTERNAL_MODULE_y88i__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"sp-application-base": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({"sp-navigation-datastore":"sp-navigation-datastore"}[chunkId]||chunkId) + "_" + {"0":"8e7b2429e92574161315","sp-navigation-datastore":"9d74795ecd8739b0a79f"}[chunkId] + ".js"
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
/******/ 	var jsonpArray = window["webpackJsonp_4df9bb86_ab0a_4aab_ab5f_48bf167048fb_1_11_0"] = window["webpackJsonp_4df9bb86_ab0a_4aab_ab5f_48bf167048fb_1_11_0"] || [];
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
/******/ 	  var regex = (typeof spScriptNamePattern !== 'undefined') ? spScriptNamePattern : new RegExp('\\/sp-application-base(_[a-z0-9-]+)*\\.js', 'i');
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

/***/ "+AHM":
/*!***************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/logging/events/ResultTypeEnum.js ***!
  \***************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @ms/odsp-utilities/logging/events/ResultTypeEnum.js
var pkg = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
module.exports = {}
module.exports.ResultTypeEnum = pkg.ResultTypeEnum;
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "/HB6":
/*!*************************************************************!*\
  !*** ./lib/extensibility/placeholder/PlaceholderManager.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Placeholder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Placeholder */ "jZLx");
/* harmony import */ var _PlaceholderName__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlaceholderName */ "Cs6k");




/**
 * PlaceholderManager is a service registered with the application's root ServiceScope.
 * The host application uses this object to define the placeholders which will
 * be consumed by third-party extensions.  The PlaceholderCollection then obtains its
 * data from the PlaceholderManager.
 *
 * @internal
 */
var PlaceholderManager = /** @class */ (function () {
    function PlaceholderManager(serviceScope) {
        this._isEnabled = false;
        this._changedEvent = new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["SPEvent"](PlaceholderManager.placeholdersChangedEventName);
        this._placeholders = new Map();
        // Create the placeholders for all the names
        this._placeholders.set(_PlaceholderName__WEBPACK_IMPORTED_MODULE_2__["default"].Top, this._createPlaceholder(_PlaceholderName__WEBPACK_IMPORTED_MODULE_2__["default"].Top));
        this._placeholders.set(_PlaceholderName__WEBPACK_IMPORTED_MODULE_2__["default"].Bottom, this._createPlaceholder(_PlaceholderName__WEBPACK_IMPORTED_MODULE_2__["default"].Bottom));
    }
    Object.defineProperty(PlaceholderManager.prototype, "changedEvent", {
        /**
         * The event raised when the application changes placeholder definitions
         * @eventproperty
         */
        get: function () {
            return this._changedEvent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initializes the collection of placeholders for use by application customizers.
     */
    PlaceholderManager.prototype.initializePlaceholders = function (definitions) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(definitions, 'definitions');
        definitions.forEach(function (def) { return _this.addPlaceholder(def.name, def.domElement); });
    };
    /**
     * Adds a placeholder.
     * If a placeholder already existed for the same name, it replaces it.
     */
    PlaceholderManager.prototype.addPlaceholder = function (name, domElement) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isTrue(this.placeholders.has(name), 'placeholder exists');
        this._placeholders.get(name).attachToApplication(domElement);
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.raiseStickyEvent(PlaceholderManager.placeholdersChangedEventName, new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["SPEventArgs"]());
    };
    /**
     * Removes a placeholder.
     */
    PlaceholderManager.prototype.removePlaceholder = function (name) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isTrue(this.placeholders.has(name), 'placeholder exists');
        this._placeholders.get(name).detachFromApplication();
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.raiseStickyEvent(PlaceholderManager.placeholdersChangedEventName, new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["SPEventArgs"]());
    };
    Object.defineProperty(PlaceholderManager.prototype, "isEnabled", {
        /**
         * Returns true if the placeholders are enabled for the current application
         */
        get: function () {
            return this._isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Allows the application to set if placeholders are enabled for the current application
     * @internal
     */
    PlaceholderManager.prototype._enable = function () {
        this._isEnabled = true;
    };
    Object.defineProperty(PlaceholderManager.prototype, "placeholders", {
        /**
         * Returns a map from PlaceholderName to Placeholder for all active placeholders.
         */
        get: function () {
            return this._placeholders;
        },
        enumerable: true,
        configurable: true
    });
    PlaceholderManager.prototype._createPlaceholder = function (name) {
        return new _Placeholder__WEBPACK_IMPORTED_MODULE_1__["default"]({ name: name, domElement: document.createElement('div') }, this);
    };
    /**
     * The service key for PlaceholderManager.
     */
    PlaceholderManager.serviceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["ServiceKey"].create('sp-application-base:PlaceholderManager', PlaceholderManager);
    /**
     * SPEvent name for placeholders change
     */
    PlaceholderManager.placeholdersChangedEventName = 'placeholders.changedEvent';
    return PlaceholderManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (PlaceholderManager);


/***/ }),

/***/ "/Kpt":
/*!**************************************************************!*\
  !*** ./lib/extensibility/placeholder/PlaceholderProvider.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-component-base */ "7Awa");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_Killswitches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/Killswitches */ "dQCu");
/* harmony import */ var _PlaceholderManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PlaceholderManager */ "/HB6");
/* harmony import */ var _PlaceholderName__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PlaceholderName */ "Cs6k");





/**
 * Allows third-party components to discover and use SharePoint placeholders.  Placeholders
 * enable third-party components to render custom content into designated regions on the page.
 *
 * @remarks
 * Placeholders are designated regions on the page, identified by one of the predefined
 * {@link PlaceholderName} constants.  Different applications and pages might support different
 * placeholder names.  Placeholders can appear and disappear as the user interacts with the page,
 * for example via in-place navigation.  Third-party components should not assume that a given placeholder
 * will always be available.
 *
 * Use {@link PlaceholderProvider.tryCreateContent} to test whether a placeholder is
 * available and add content to it.   Use the {@link PlaceholderProvider.changedEvent} event
 * to discover when new placeholders appear.
 *
 * @public
 */
var PlaceholderProvider = /** @class */ (function () {
    /**
     * @internal
     */
    function PlaceholderProvider(serviceScope, applicationCustomizerContextParameters, componentTag) {
        var _this = this;
        this._placeholderContents = [];
        this._isDisposed = false;
        this._sequence = applicationCustomizerContextParameters.sequence;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('PlaceholderProvider');
        var preAllocatedApplicationCustomizerTopHeight = applicationCustomizerContextParameters.preAllocatedApplicationCustomizerTopHeight, preAllocatedApplicationCustomizerBottomHeight = applicationCustomizerContextParameters.preAllocatedApplicationCustomizerBottomHeight;
        this._componentTag = componentTag ? componentTag : '';
        if (!_common_Killswitches__WEBPACK_IMPORTED_MODULE_2__["Killswitches"].isPreallocatedPlaceholdersforApplicationCustomizersKSActive()) {
            /*
             * We're not using the whenFinished callback, as we know that at this point, the servicescope
             * in use is already finished in the ApplicationCustomizerContext.
             */
            this._placeholderManager = serviceScope.consume(_PlaceholderManager__WEBPACK_IMPORTED_MODULE_3__["default"].serviceKey);
            if (preAllocatedApplicationCustomizerTopHeight > 0) {
                this._preAllocatedTopPlaceholderContent =
                    this._preAllocateContent(_PlaceholderName__WEBPACK_IMPORTED_MODULE_4__["default"].Top, preAllocatedApplicationCustomizerTopHeight, qosMonitor);
            }
            if (preAllocatedApplicationCustomizerBottomHeight > 0) {
                this._preAllocatedBottomPlaceholderContent = this._preAllocateContent(_PlaceholderName__WEBPACK_IMPORTED_MODULE_4__["default"].Bottom, preAllocatedApplicationCustomizerBottomHeight, qosMonitor);
            }
            qosMonitor.writeSuccess({ name: name });
        }
        else {
            this._sequence = applicationCustomizerContextParameters.sequence;
            serviceScope.whenFinished(function () {
                _this._placeholderManager = serviceScope.consume(_PlaceholderManager__WEBPACK_IMPORTED_MODULE_3__["default"].serviceKey);
            });
        }
    }
    PlaceholderProvider.prototype.dispose = function () {
        if (!this._isDisposed) {
            this._placeholderContents.forEach(function (content) { return content.dispose(); });
            delete this._placeholderContents;
            delete this._placeholderManager;
        }
        this._isDisposed = true;
    };
    Object.defineProperty(PlaceholderProvider.prototype, "isDisposed", {
        get: function () {
            return this._isDisposed;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Tests whether the page contains the specified placeholder.  If so, a new PlaceholderContent
     * object is created, which allows the caller to render custom content inside the placeholder.
     *
     * @param name - The requested placeholder
     * @param options - Additional options, for example to detect when the placeholder is disposed.
     * @returns A new PlaceholderContent object, or undefined if the requested placeholder does not exist.
     *
     * @remarks
     *
     * The host application makes no guarantees about the availability of a given placeholder.
     * In situations where an expected placeholder is not available, the third-party extension
     * must handle it gracefully, e.g. by not rendering anything, or by choosing an alternative
     * placeholder.
     */
    PlaceholderProvider.prototype.tryCreateContent = function (name, options) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(PlaceholderProvider._logSource, "Creating placeholder content in placeholder \"" + name + "\"");
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('Placeholder.tryCreateContent');
        if (!_common_Killswitches__WEBPACK_IMPORTED_MODULE_2__["Killswitches"].isPreallocatedPlaceholdersforApplicationCustomizersKSActive()) {
            var content = void 0;
            if (name === _PlaceholderName__WEBPACK_IMPORTED_MODULE_4__["default"].Top && this._preAllocatedTopPlaceholderContent) {
                content = this._preAllocatedTopPlaceholderContent;
                this._preAllocatedTopPlaceholderContent = undefined;
            }
            else if (name === _PlaceholderName__WEBPACK_IMPORTED_MODULE_4__["default"].Bottom && this._preAllocatedBottomPlaceholderContent) {
                content = this._preAllocatedBottomPlaceholderContent;
                this._preAllocatedBottomPlaceholderContent = undefined;
            }
            if (content) {
                content._setOptions(options);
                this._postContentCreation(content, qosMonitor);
                content.domElement.innerHTML = '';
                return content;
            }
            return this._tryCreateContent(qosMonitor, name, options);
        }
        else {
            var placeholder = this._placeholderManager.placeholders.get(name);
            var content = void 0;
            try {
                content = placeholder.createPlaceholderContent(this._sequence, options);
            }
            catch (error) {
                qosMonitor.writeUnexpectedFailure('CreateContentFailed', error, { name: name });
                return undefined;
            }
            if (content) {
                this._placeholderContents.push(content);
                qosMonitor.writeSuccess({ name: name });
            }
            else {
                var error = new Error('Placeholder could not create new content');
                qosMonitor.writeUnexpectedFailure('CreateContentUndefined', error, { name: name });
            }
            return content;
        }
    };
    PlaceholderProvider.prototype._preAllocateContent = function (placeholderName, height, qosMonitor) {
        // There is a chance that someone is looking for placeholders before the PlaceholderProvider.changedEvent has fired.
        // This is a bug, and we should warn the user of this anti-pattern. The easiest thing to do is make sure that
        // the .changedEvent callback isn't empty.
        if (this._placeholderManager.changedEvent._listenerCount() === 0) {
            // This is a bad state to be in.  We should log this out:
            console.log('tryCreateContent was called, but PlaceholderProvider.changedEvent has no handlers. ' +
                'This is likely to cause an error in the future.  You should probably be calling ' +
                'tryCreateContent in the PlaceholderProvider.changedEvent callback.');
        }
        // Check if placeholders are enabled first.
        if (!this._placeholderManager.isEnabled || !this._placeholderManager.placeholders.has(placeholderName)) {
            var error = new Error("No placeholder found with the name '" + name + "'");
            qosMonitor.writeExpectedFailure('PlaceholderNotFound', error, { name: name });
            return undefined;
        }
        var placeholder = this._placeholderManager.placeholders.get(placeholderName);
        var preAllocatedContent = placeholder.createPlaceholderContent(this._sequence);
        // This should never really happen. But this gives an explicit failure to help debug issues quickly.
        if (!placeholder) {
            var error = new Error('Placeholder dictionary has only the key but not the value for the placeholder');
            qosMonitor.writeUnexpectedFailure('NoValueInPlaceholdersMap', error, { name: name });
            return undefined;
        }
        try {
            preAllocatedContent.domElement.style.height = height + 'px';
            var shimmer = _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__["_ShimmerFactory"].createShimmer(preAllocatedContent.domElement.clientWidth, height, _PlaceholderName__WEBPACK_IMPORTED_MODULE_4__["default"] + this._componentTag, '', 0);
            preAllocatedContent.domElement.appendChild(shimmer);
            qosMonitor.writeSuccess({ name: name });
        }
        catch (error) {
            qosMonitor.writeUnexpectedFailure('CreateContentFailed', error, { name: name });
        }
        return preAllocatedContent;
    };
    Object.defineProperty(PlaceholderProvider.prototype, "placeholderNames", {
        /**
         * Returns the names of the currently available placeholders.
         */
        get: function () {
            if (!this._placeholderManager.isEnabled) {
                return [];
            }
            var array = [];
            this._placeholderManager.placeholders.forEach(function (value, key) { return array.push(key); });
            return array;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceholderProvider.prototype, "changedEvent", {
        /**
         * This event is raised when the list of currently available placeholders is changed.
         *
         * @remarks
         * The application can change its list of available placeholders at any time. This means that the existing
         * placeholders may get disposed or new placeholders may be added. Use this event to discover new
         * placeholders when they appear.
         *
         * @eventproperty
         */
        get: function () {
            return this._placeholderManager.changedEvent;
        },
        enumerable: true,
        configurable: true
    });
    PlaceholderProvider.prototype._tryCreateContent = function (qosMonitor, name, options) {
        var placeholder = this._placeholderManager.placeholders.get(name);
        var content;
        try {
            content = placeholder.createPlaceholderContent(this._sequence, options);
        }
        catch (error) {
            qosMonitor.writeUnexpectedFailure('CreateContentFailed', error, { name: name });
            return undefined;
        }
        this._postContentCreation(content, qosMonitor);
        return content;
    };
    PlaceholderProvider.prototype._postContentCreation = function (content, qosMonitor) {
        if (content) {
            this._placeholderContents.push(content);
            qosMonitor.writeSuccess({ name: name });
        }
        else {
            var error = new Error('Placeholder could not create new content');
            qosMonitor.writeUnexpectedFailure('CreateContentUndefined', error, { name: name });
        }
    };
    PlaceholderProvider._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('PlaceholderProvider');
    return PlaceholderProvider;
}());
/* harmony default export */ __webpack_exports__["default"] = (PlaceholderProvider);


/***/ }),

/***/ "/TBc":
/*!**********************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/logging/events/Qos.event.js ***!
  \**********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @ms/odsp-utilities/logging/events/Qos.event.js
var pkg = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
module.exports = {}
module.exports.Qos = pkg.Qos;
module.exports.ResultTypeEnum = pkg.ResultTypeEnum;
module.exports.default = pkg.Qos;
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "/jhG":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/providers/theming/ApplyDeferredCustomizations.js ***!
  \**************************************************************************************************************************************************************************************************************/
/*! exports provided: applyDeferredFabricCustomizations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyDeferredFabricCustomizations", function() { return applyDeferredFabricCustomizations; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/odsp-utilities/lib/features/FeatureOverrides */ "6TYi");
/* harmony import */ var _ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FluentFeatures__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FluentFeatures */ "1/3F");
/* harmony import */ var _uifabric_utilities_lib_customizations_Customizations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @uifabric/utilities/lib/customizations/Customizations */ "KqfN");
/* harmony import */ var _uifabric_utilities_lib_customizations_Customizations__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_uifabric_utilities_lib_customizations_Customizations__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_odsp_utilities_lib_performance_PerformanceMarker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/odsp-utilities/lib/performance/PerformanceMarker */ "Oy+S");
/* harmony import */ var _ms_odsp_utilities_lib_performance_PerformanceMarker__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_performance_PerformanceMarker__WEBPACK_IMPORTED_MODULE_4__);





var appliedDeferredFabricCustomizations = false;
/** Applies Fabric MDL2 style Customization overrides for deferred components. */
function applyDeferredFabricCustomizations() {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var modules, mdl2Styles_1;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (appliedDeferredFabricCustomizations) {
                        return [2 /*return*/];
                    }
                    ;
                    if (!(!_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_1___default.a.isFeatureEnabled(_FluentFeatures__WEBPACK_IMPORTED_MODULE_2__["EnableFluentTheme"]) &&
                        !_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_1___default.a.isFeatureEnabled(_FluentFeatures__WEBPACK_IMPORTED_MODULE_2__["OnedriveFluentCustomization"]) &&
                        !_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_1___default.a.isFeatureEnabled(_FluentFeatures__WEBPACK_IMPORTED_MODULE_2__["EnableFluentStylingODC"]))) return [3 /*break*/, 2];
                    Object(_ms_odsp_utilities_lib_performance_PerformanceMarker__WEBPACK_IMPORTED_MODULE_4__["mark"])('FabricCustomizations_Deferred_AwaitLoad');
                    return [4 /*yield*/, __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./FabricDeferredCustomizations */ "sA9l"))];
                case 1:
                    modules = _a.sent();
                    Object(_ms_odsp_utilities_lib_performance_PerformanceMarker__WEBPACK_IMPORTED_MODULE_4__["mark"])('FabricCustomizations_Deferred_Start');
                    mdl2Styles_1 = {
                        ColorPicker: { styles: modules.ColorPickerStyles },
                        ColorRectangle: { styles: modules.ColorRectangleStyles },
                        ColorSlider: { styles: modules.ColorSliderStyles },
                        CompoundButton: { styles: modules.CompoundButtonStyles },
                        Checkbox: { styles: modules.CheckboxStyles },
                        ChoiceGroupOption: { styles: modules.ChoiceGroupOptionStyles },
                        ComboBox: { styles: modules.ComboBoxStyles },
                        Dropdown: { styles: modules.DropdownStyles },
                        ExpandingCard: { styles: modules.ExpandingCardStyles },
                        IconButton: { styles: modules.IconButtonStyles },
                        Panel: { styles: modules.PanelStyles },
                        Persona: { styles: modules.PersonaStyles },
                        PersonaCoin: { styles: modules.PersonaCoinStyles },
                        PlainCard: { styles: modules.PlainCardStyles },
                        Slider: { styles: modules.SliderStyles },
                        SpinButton: { styles: modules.SpinButtonStyles },
                        Toggle: { styles: modules.ToggleStyles }
                    };
                    appliedDeferredFabricCustomizations = true;
                    _uifabric_utilities_lib_customizations_Customizations__WEBPACK_IMPORTED_MODULE_3__["Customizations"].applyBatchedUpdates(function () {
                        for (var c in mdl2Styles_1) {
                            _uifabric_utilities_lib_customizations_Customizations__WEBPACK_IMPORTED_MODULE_3__["Customizations"].applyScopedSettings(c, mdl2Styles_1[c]);
                        }
                    }, true); // don't force a re-render
                    Object(_ms_odsp_utilities_lib_performance_PerformanceMarker__WEBPACK_IMPORTED_MODULE_4__["mark"])('FabricCustomizations_Deferred_End');
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=ApplyDeferredCustomizations.js.map

/***/ }),

/***/ "1/3/":
/*!*******************************************!*\
  !*** ./lib/error/SPGlobalErrorHandler.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Microsoft. All rights reserved.

/**
 * Global error handler.
 *
 * The purpose of this class is to help measure uncaught/async errors from within the app infra.
 *
 * @internal
 */
var SPGlobalErrorHandler = /** @class */ (function () {
    function SPGlobalErrorHandler() {
    }
    /**
     * Traces errors to _TraceLogger to measure the occurrence
     *
     * The signature matches window.onerror
     */
    SPGlobalErrorHandler.basicTracingHandler = function (message, filename, lineno, colno, error) {
        var eventName = 'window.onerror';
        if (filename && SPGlobalErrorHandler._isFromFile(filename, 'CKEDITOR')) {
            // CK editor gets special handling because we want to monitor any issues with Edge
            SPGlobalErrorHandler._logErrorFromFile(message, SPGlobalErrorHandler._ckLogSource, lineno, colno, error, eventName);
        }
        else {
            var genericError = error ||
                new Error("Error:" + message + ", file:" + filename + ", line:" + lineno + ", column:" + colno);
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(SPGlobalErrorHandler._genericLogSource, genericError, eventName);
        }
    };
    SPGlobalErrorHandler._isFromFile = function (filename, match) {
        return filename.length > 0 && filename.toUpperCase().indexOf(match) !== -1;
    };
    SPGlobalErrorHandler._logErrorFromFile = function (message, logSource, lineno, colno, error, eventName) {
        var fileError = error ||
            new Error("Error:" + message + ", line:" + lineno + ", column:" + colno);
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(logSource, fileError, eventName);
    };
    SPGlobalErrorHandler._ckLogSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogSource"].create('CKGlobalError');
    SPGlobalErrorHandler._genericLogSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogSource"].create('OtherGlobalError');
    return SPGlobalErrorHandler;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPGlobalErrorHandler);


/***/ }),

/***/ "1/3F":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/providers/theming/FluentFeatures.js ***!
  \*************************************************************************************************************************************************************************************************/
/*! exports provided: isOneDrive, EnableFluentStylingODC, EnableFluentStyling, OnedriveFluentCustomization, EnableFluentTheme, FluentGrays, EnableHoverCardFluent, isFluentActiveOD, isHoverCardFluentActive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOneDrive", function() { return isOneDrive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnableFluentStylingODC", function() { return EnableFluentStylingODC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnableFluentStyling", function() { return EnableFluentStyling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnedriveFluentCustomization", function() { return OnedriveFluentCustomization; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnableFluentTheme", function() { return EnableFluentTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FluentGrays", function() { return FluentGrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnableHoverCardFluent", function() { return EnableHoverCardFluent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFluentActiveOD", function() { return isFluentActiveOD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHoverCardFluentActive", function() { return isHoverCardFluentActive; });
/* harmony import */ var _ms_odsp_utilities_lib_features_Features__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities/lib/features/Features */ "Y2fW");
/* harmony import */ var _ms_odsp_utilities_lib_features_Features__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_features_Features__WEBPACK_IMPORTED_MODULE_0__);

var isOneDrive = window['_spPageContextInfo'] && window['_spPageContextInfo'].webTemplate === "21";
// ODC Features
var EnableFluentStylingODC = { ODC: 'EnableFluentStylingODC' }; // For ODC
// ODB Features
var EnableFluentStyling = { ODB: isOneDrive ? 1118 : -1118 }; // For ODB
var OnedriveFluentCustomization = { ODB: isOneDrive ? 1155 : -1155, ODC: null, Fallback: false }; // For ODB
// SP Features
var EnableFluentTheme = { ODB: isOneDrive ? -1248 : 1248, ODC: null, Fallback: false }; // For SP
var FluentGrays = { ODB: isOneDrive ? -1099 : 1099, ODC: null, Fallback: false }; // For SP
var EnableHoverCardFluent = { ODB: isOneDrive ? -1382 : 1382, ODC: false }; // For SP
var isFluentActiveOD = _ms_odsp_utilities_lib_features_Features__WEBPACK_IMPORTED_MODULE_0___default.a.isFeatureEnabled(EnableFluentStyling) || _ms_odsp_utilities_lib_features_Features__WEBPACK_IMPORTED_MODULE_0___default.a.isFeatureEnabled(EnableFluentStylingODC);
// We want to ship hover card in consistent design for both OneDrive and SharePoint.
// This is a workaround to enable fluent design only for hover card as SharePoint fluent is not ready to ship.
// We'll remove this flight once SharePoint fluent is shipped.
var isHoverCardFluentActive = _ms_odsp_utilities_lib_features_Features__WEBPACK_IMPORTED_MODULE_0___default.a.isFeatureEnabled(EnableHoverCardFluent);
//# sourceMappingURL=FluentFeatures.js.map

/***/ }),

/***/ "2fZ3":
/*!************************************!*\
  !*** ./lib/navigator/Navigator.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _BaseApplication__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../BaseApplication */ "n9Iz");
/* harmony import */ var _INavigationResult__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./INavigationResult */ "TNAb");
/* harmony import */ var _NavigationDataError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NavigationDataError */ "SClb");
/* harmony import */ var _NavigationDataProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NavigationDataProvider */ "o+Qb");
/* harmony import */ var _NavigationOrchestrator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NavigationOrchestrator */ "6JwG");
/* harmony import */ var _PrefetchedDataEventArgs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PrefetchedDataEventArgs */ "n9H6");
/* harmony import */ var _common_Killswitches__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/Killswitches */ "dQCu");











var navigateQosScenarioName = 'Navigator.navigate';
var navigateToPreloadedDataQosScenarioName = 'Navigator.navigateToPreloadedData';
var prefetchNavigationDataQosScenarioName = 'Navigator.prefetch';
/**
 * Navigator for SPFx applications.
 * It allows to navigate to a different URL that is backed by an SPFx application.
 *
 * Updates all SPFx-internal data structures with the information from the new URL.
 * This includes the page context, the manifest store, the session, telemetry and the themes.
 *
 * @internal
 */
var Navigator = /** @class */ (function () {
    function Navigator(serviceScope, applicationManager) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(serviceScope, 'serviceScope');
        this._navigationDataProvider = new _NavigationDataProvider__WEBPACK_IMPORTED_MODULE_7__["default"](serviceScope, function (data) {
            _this._validatePreloadedData(data);
        });
        this._navigationOrchestrator = new _NavigationOrchestrator__WEBPACK_IMPORTED_MODULE_8__["default"](serviceScope, applicationManager, this);
    }
    Object.defineProperty(Navigator.prototype, "preloadedData", {
        /**
         * Returns the preloaded data used by the current page.
         * Throws if it hasn't navigated to a page yet.
         */
        get: function () {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(this._preloadedData, 'preloadedData');
            return this._preloadedData;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Navigates to a new page.
     * Requests a JSON to SharePoint server and updates all SPFx related data with the new information.
     * This includes new manifests, page context, theme, telemetry settings.
     *
     * @param url - Destination URL
     * @param props - Optional Navigation properties
     */
    Navigator.prototype.navigate = function (url, props) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(url, 'url');
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"](navigateQosScenarioName);
        return this._navigationDataProvider.getData(url, props).then(function (response) {
            return response.preloadedData.then(function (preloadedData) {
                if (response.prefetchedData) {
                    _this._raisePrefetchDataEvent(url, preloadedData, response.prefetchedData);
                }
                return _this.navigateToPreloadedData(preloadedData);
            }).then(function (navigationResult) {
                if (navigationResult &&
                    navigationResult.operation === _INavigationResult__WEBPACK_IMPORTED_MODULE_5__["NavigationOperation"].Unsupported &&
                    !_common_Killswitches__WEBPACK_IMPORTED_MODULE_10__["Killswitches"].isNavigationDataErrorKSActive()) {
                    qosMonitor.writeExpectedFailure('Unsupported');
                }
                else {
                    qosMonitor.writeSuccess();
                }
                return navigationResult;
            });
        }).catch(function (error) {
            var isExpected = false;
            if (error instanceof _NavigationDataError__WEBPACK_IMPORTED_MODULE_6__["default"]) {
                isExpected = error.isExpected;
            }
            isExpected ?
                qosMonitor.writeExpectedFailure(undefined, error) :
                qosMonitor.writeUnexpectedFailure(undefined, error);
            throw error;
        });
    };
    /**
     * Prefetches page navigation data
     *
     * @remarks
     * This is a required optimization that allows applications to pre-emptively fetch navigation data
     * so as to allow faster transitions between spfx-based applications.
     *
     * @param url - Destination URL
     * @param props - Optional Navigation properties
     *
     * @returns A promise
     */
    Navigator.prototype.prefetch = function (url, props) {
        if (!_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["_SPLoaderFlights"]._useNewBootSequence()) {
            return Promise.resolve();
        }
        var prefetchProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props, { isPrefetchRequest: true });
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"](prefetchNavigationDataQosScenarioName);
        return this._navigationDataProvider.getData(url, prefetchProps).then(function (response) {
            qosMonitor.writeSuccess();
        }).catch(function (error) {
            qosMonitor.writeUnexpectedFailure(undefined, error);
        });
    };
    /**
     * Given a preloaded data object, it sets up all SPFx related data with the new information from the preloaded data.
     *
     * @remarks
     * This is necessary because ListView has its own router and will give us only the object itself.
     *
     * @param preloadedData - Preloaded data object
     */
    Navigator.prototype.navigateToPreloadedData = function (preloadedData) {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"](navigateToPreloadedDataQosScenarioName);
        try {
            this._validatePreloadedData(preloadedData);
            this._preloadedData = preloadedData;
            return this._navigationOrchestrator.navigate(preloadedData).then(function (navigationResult) {
                _this._preloadedData = navigationResult.preloadedData;
                qosMonitor.writeSuccess();
                return navigationResult;
            }).catch(function (error) {
                qosMonitor.writeUnexpectedFailure('AsyncError', error);
                throw error;
            });
        }
        catch (error) {
            qosMonitor.writeUnexpectedFailure('SyncError', error);
            return Promise.reject(error);
        }
    };
    /**
     * Given a preloaded data object, it sets up all SPFx related data with the new information from the preloaded data.
     * It returns a promise with the loaded application.
     *
     * @remarks
     * This is used by the PlatformLoader to bootstrap an application.
     *
     * @param preloadedData - Preloaded data object
     */
    Navigator.prototype.navigateToApplication = function (preloadedData) {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"](navigateToPreloadedDataQosScenarioName);
        try {
            if (_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["_SPLoaderFlights"]._useNewBootSequence()) {
                this._navigationDataProvider.buildId = this._getBuildId(preloadedData);
            }
            this._validatePreloadedData(preloadedData);
            // Starting the application requires a preloaded data object to already be set up.
            this._preloadedData = preloadedData;
            return this._navigationOrchestrator.navigate(preloadedData).then(function (navigationResult) {
                _this._preloadedData = navigationResult.preloadedData;
                qosMonitor.writeSuccess();
                return Promise.resolve(navigationResult.application);
            });
            // TODO fix this
        }
        catch (error) {
            qosMonitor.writeUnexpectedFailure(error);
            throw error;
        }
    };
    /**
     * This is an API used in the old boot sequence to load the application customizers after the application
     * has rendered. Once flight #182 (SppplatCrossAppNavigation) has been graduated this API should be removed.
     *
     * @internal
     */
    Navigator.prototype._loadApplicationCustomizers = function (preloadedData) {
        return this._navigationOrchestrator._loadApplicationCustomizers(preloadedData);
    };
    /**
     * Invalidates a cached resource by its URL. Any subsequent request for the resource
     * will be fetched from its origin and recached.
     *
     * @param url - URL to invalidate
     */
    Navigator.prototype.invalidate = function (url) {
        return this._navigationDataProvider.invalidate(url);
    };
    Navigator.prototype._validatePreloadedData = function (preloadedData) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(preloadedData, 'preloadedData');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(preloadedData.spPageContextInfo, 'preloadedData.spPageContextInfo');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(preloadedData.clientSideApplicationId, 'preloadedData.clientSideApplicationId');
        if (_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["_SPLoaderFlights"]._useNewBootSequence()) {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isTrue(  true || false, 'NavigationDataProvider.buildId');
        }
    };
    Navigator.prototype._raisePrefetchDataEvent = function (url, preloadedData, prefetchData) {
        prefetchData.then(function (data) {
            if (data) {
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPEventManager"].instance.raiseStickyEvent(_BaseApplication__WEBPACK_IMPORTED_MODULE_4__["default"]._prefetchedDataEventName, new _PrefetchedDataEventArgs__WEBPACK_IMPORTED_MODULE_9__["default"](preloadedData.clientSideApplicationId, url, data));
            }
        });
    };
    /**
     * Extracts the current build id from a string in the first manifest.
     * This is a temporary solution until a better solution is arrived at
     * such as including the build id at the root of the preload data.
     *
     * @param preloadedData - preload data for a given application
     */
    Navigator.prototype._getBuildId = function (preloadedData) {
        try {
            var baseUrl = preloadedData.manifests[0].loaderConfig.internalModuleBaseUrls[0];
            return baseUrl.slice(baseUrl.indexOf('sp-client-'), -1);
        }
        catch (error) {
            return '';
        }
    };
    return Navigator;
}());
/* harmony default export */ __webpack_exports__["default"] = (Navigator);


/***/ }),

/***/ "2mC7":
/*!**********************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/logging/events/Api.event.js ***!
  \**********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OneDrive:IgnoreCodeCoverage
Object.defineProperty(exports, "__esModule", { value: true });
var PairedEventBase_1 = __webpack_require__(/*! ../PairedEventBase */ "DAYU");
var Qos_event_1 = __webpack_require__(/*! ./Qos.event */ "/TBc");
var ResultTypeEnum_1 = __webpack_require__(/*! ./ResultTypeEnum */ "+AHM");
exports.ResultTypeEnum = ResultTypeEnum_1.ResultTypeEnum;
exports.Api = PairedEventBase_1.createPairedEvent({
    eventName: 'Api,Qos,',
    shortEventName: 'Api'
}, {
    url: 1 /* String */
}, Qos_event_1.Qos);
exports.default = exports.Api;
//# sourceMappingURL=Api.event.js.map

/***/ }),

/***/ "2q6Q":
/*!***********************************!*\
  !*** external "@ms/sp-telemetry" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2q6Q__;

/***/ }),

/***/ "3GMh":
/*!*************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/set-version/7.0.17/node_modules/@uifabric/set-version/lib/setVersion.js ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: setVersion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVersion", function() { return setVersion; });
// A packages cache that makes sure that we don't inject the same packageName twice in the same bundle -
// this cache is local to the module closure inside this bundle
var packagesCache = {};
// Cache access to window to avoid IE11 memory leak.
var _win = undefined;
try {
    _win = window;
}
catch (e) {
    /* no-op */
}
function setVersion(packageName, packageVersion) {
    if (typeof _win !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var packages = (_win.__packages__ = _win.__packages__ || {});
        // We allow either the global packages or local packages caches to invalidate so testing can
        // just clear the global to set this state
        if (!packages[packageName] || !packagesCache[packageName]) {
            packagesCache[packageName] = packageVersion;
            var versions = (packages[packageName] = packages[packageName] || []);
            versions.push(packageVersion);
        }
    }
}
//# sourceMappingURL=setVersion.js.map

/***/ }),

/***/ "3iG6":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/styleConstants.js ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: MinimumScreenSelector, MediumScreenSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinimumScreenSelector", function() { return MinimumScreenSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediumScreenSelector", function() { return MediumScreenSelector; });
/* harmony import */ var _uifabric_styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/styling */ "jQzw");
/* harmony import */ var _uifabric_styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_uifabric_styling__WEBPACK_IMPORTED_MODULE_0__);

var MinimumScreenSelector = Object(_uifabric_styling__WEBPACK_IMPORTED_MODULE_0__["getScreenSelector"])(0, _uifabric_styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMaxSmall"]);
var MediumScreenSelector = Object(_uifabric_styling__WEBPACK_IMPORTED_MODULE_0__["getScreenSelector"])(_uifabric_styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMinMedium"], _uifabric_styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMaxMedium"]);
//# sourceMappingURL=styleConstants.js.map

/***/ }),

/***/ "45U0":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/providers/theming/WebThemeProvider.js ***!
  \***************************************************************************************************************************************************************************************************/
/*! exports provided: WebThemeProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebThemeProvider", function() { return WebThemeProvider; });
/* harmony import */ var _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities/lib/async/Promise */ "MS/P");
/* harmony import */ var _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/odsp-utilities/lib/killswitch/Killswitch */ "WA4G");
/* harmony import */ var _ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_odsp_utilities_lib_theming_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/odsp-utilities/lib/theming/ThemeProvider */ "H4yp");
/* harmony import */ var _ms_odsp_utilities_lib_theming_ThemeProvider__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_theming_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _interfaces_WebTemplateType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../interfaces/WebTemplateType */ "vtqB");
/* harmony import */ var _ms_odsp_utilities_lib_theming_RgbaColor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/odsp-utilities/lib/theming/RgbaColor */ "w/WL");
/* harmony import */ var _ms_odsp_utilities_lib_theming_RgbaColor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_theming_RgbaColor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeUtilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeUtilities */ "ApOT");
// OneDrive:IgnoreCodeCoverage






/**
 * Provides theme data for the context web, either from a cache or from the server.
 */
var WebThemeProvider = /** @class */ (function () {
    function WebThemeProvider(params) {
        // Accessing _spPageContextInfo via window since this code needs to run before app boot.
        this._pageContext = params.pageContext ? params.pageContext : window["_spPageContextInfo"];
        this._getThemeDataSource = params.getThemeDataSource;
        this._themeProvider = new _ms_odsp_utilities_lib_theming_ThemeProvider__WEBPACK_IMPORTED_MODULE_2___default.a(this._loadTheme.bind(this));
    }
    /**
     * Loads a map from theme tokens (slots) to values (usually colors).
     * @param {boolean} forceUpdate If true, load fresh server data, ignoring the cache.
     */
    WebThemeProvider.prototype.loadThemeSlotsMap = function (forceUpdate) {
        var cacheToken = this._getThemeCacheToken();
        if (cacheToken) {
            return this._themeProvider.loadThemeTokenMap(cacheToken, forceUpdate);
        }
        else {
            // No theme.
            return _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_0___default.a.resolve();
        }
    };
    WebThemeProvider.prototype.loadFullFormattedThemeData = function (forceUpdate) {
        var _this = this;
        return this.loadFullThemeData(forceUpdate).then(function (result) {
            if (!result) {
                return undefined;
            }
            var palette = {};
            var themeDataPalette = result.palette;
            for (var key in themeDataPalette) {
                var color = themeDataPalette[key];
                if (color) {
                    palette[key] = _ms_odsp_utilities_lib_theming_RgbaColor__WEBPACK_IMPORTED_MODULE_4___default.a.toHtmlString(color);
                }
            }
            if (result.backgroundImageUri) {
                palette['backgroundImageUri'] = _ms_odsp_utilities_lib_theming_ThemeProvider__WEBPACK_IMPORTED_MODULE_2___default.a.getBackgroundUrl(result);
            }
            var theme = {
                palette: palette,
                isInverted: result.isInverted
            };
            if (!_ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_1__["Killswitch"].isActivated('9bb7294d-5899-412a-8d88-0aaea374b8b8', '09/03/2019', 'Apply theme defaults at source')) {
                theme = Object(_ThemeUtilities__WEBPACK_IMPORTED_MODULE_5__["applySpThemeDefaults"])(theme, _this._pageContext);
            }
            return theme;
        });
    };
    /**
     * @deprecated use loadFullFormattedThemeData instead
     * Loads relevant information about the site theme. For just the colors, use loadThemeTokenMap.
     * @param {boolean} forceUpdate If true, load fresh server data, ignoring the cache.
     */
    WebThemeProvider.prototype.loadFullThemeData = function (forceUpdate) {
        var cacheToken = this._getThemeCacheToken();
        if (cacheToken) {
            return this._themeProvider.loadThemeData(cacheToken, forceUpdate);
        }
        else {
            // No theme.
            var noThemeData = void 0;
            return _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(noThemeData);
        }
    };
    /**
     * Gets the theme cache token for the current page load.
     */
    WebThemeProvider.prototype._getThemeCacheToken = function () {
        var cacheToken;
        var pageContext = this._pageContext;
        // Return the themedCssFolderUrl instead of the themeCacheToken, since
        // we do not depend on the web or its version. Those would be needed if
        // we required foreground-image theming rules, as in classic theming.
        if (pageContext) {
            var webTemplate = Number(pageContext.webTemplate);
            var groupColor = webTemplate === _interfaces_WebTemplateType__WEBPACK_IMPORTED_MODULE_3__["WebTemplateType"].teamSite ||
                webTemplate === _interfaces_WebTemplateType__WEBPACK_IMPORTED_MODULE_3__["WebTemplateType"].group ? pageContext.groupColor : undefined;
            // If themedCssFolderUrl is null or empty, there is no web theme.
            // But if groupColor is set, we can extend that to a theme for the page.
            // Add the web template ID into a groupColor-based token since some templates
            // will behave differently (e.g. ODB will not apply the groupColor).
            var groupColorToken = groupColor ? groupColor + ";web#" + pageContext.webTemplate : null;
            cacheToken = pageContext.themedCssFolderUrl || groupColorToken || null;
        }
        return cacheToken;
    };
    /**
     * Loads the theme data from an appopriate data source.
     * @param {boolean} forceUpdate If true, load fresh server data, ignoring the cache.
     */
    WebThemeProvider.prototype._loadTheme = function (forceUpdate) {
        // Only load this module if it has been bundled with the app.
        // It is possible that this will load additional modules on demand.
        // This way, only SPO apps need a WebThemeDataSource.
        var shouldTheme = !!this._getThemeCacheToken();
        if (shouldTheme) {
            if (!this._themeDataSource) {
                this._themeDataSource = this._getThemeDataSource();
            }
            return this._themeDataSource.then(function (dataSource) {
                if (dataSource) {
                    return dataSource.loadTheme(forceUpdate);
                }
                return _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_0___default.a.resolve();
            });
        }
        return _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_0___default.a.resolve();
    };
    return WebThemeProvider;
}());

//# sourceMappingURL=WebThemeProvider.js.map

/***/ }),

/***/ "4QmI":
/*!*****************************************************************!*\
  !*** ./lib/extensibility/customAction/CustomActionLocations.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Constants for the custom action locations that are used with client-side extensions.
 *
 * For more info about custom actions, see this reference:
 * https://msdn.microsoft.com/en-us/library/office/ms460194.aspx
 *
 * @alpha
 */
var CustomActionLocations = /** @class */ (function () {
    function CustomActionLocations() {
    }
    /**
     * Used to register application customizers, which run when the browser page loads.
     *
     * Manifest extension type: "ApplicationCustomizer"
     * Base class:              BaseApplicationCustomizer
     */
    CustomActionLocations.APPLICATION_CUSTOMIZER = 'ClientSideExtension.ApplicationCustomizer';
    /**
     * Used to add menu items to the right-click context menu for the SharePoint list view.
     *
     * Manifest extension type: "ListViewCommandSet"
     * Base class:              BaseListViewCommandSet
     */
    CustomActionLocations.LISTVIEW_COMMANDSET_CONTEXTMENU = 'ClientSideExtension.ListViewCommandSet.ContextMenu';
    /**
     * Used to add menu items to the top menu for a SharePoint list view.
     *
     * Manifest extension type: "ListViewCommandSet"
     * Base class:              BaseListViewCommandSet
     */
    CustomActionLocations.LISTVIEW_COMMANDSET_COMMANDBAR = 'ClientSideExtension.ListViewCommandSet.CommandBar';
    /**
     * Used to add menu items to the SharePoint list view; the location is up to the application's
     * discretion.
     *
     * Manifest extension type: "ListViewCommandSet"
     * Base class:              BaseListViewCommandSet
     */
    CustomActionLocations.LISTVIEW_COMMANDSET_DEFAULT = 'ClientSideExtension.ListViewCommandSet';
    /**
     * Used to register search query modifier, to be used in search results pages and search suggestions.
     *
     * Manifest extension type: "SearchQueryModifier"
     * Base class:              BaseSearchQueryModifier
     */
    CustomActionLocations.SEARCH_QUERY_MODIFIER = 'ClientSideExtension.SearchQueryModifier';
    return CustomActionLocations;
}());
/* harmony default export */ __webpack_exports__["default"] = (CustomActionLocations);


/***/ }),

/***/ "5BLP":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/logging/RequestDurationLoggingHelper.js ***!
  \**********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// OneDrive:IgnoreCodeCoverage
var SimpleUri_1 = __webpack_require__(/*! ../uri/SimpleUri */ "DYAW");
/**
 * This function returns the request duration recording by the browser via window.performance.getEntries().
 * @param url
 * @param executeTimeStamp
 */
function getRequestEntryDurationMetrics(url, requestPerformanceStartTime) {
    if (!window || !window.performance || !url || !requestPerformanceStartTime) {
        return { duration: -1 };
    }
    try {
        var entries = performance.getEntriesByType("resource");
        // If targetOrigin is missing it means the url is relative. In order to compare urls with the ones we get from performance.getEntries()
        // we need to have a complete url, so pre-pend current origin to relative url.
        var targetOrigin = new SimpleUri_1.SimpleUri(url).authority;
        if (!targetOrigin) {
            var currentOrigin = window.location && new SimpleUri_1.SimpleUri(window.location.href).authority;
            url = currentOrigin + url;
        }
        var entry = void 0;
        // Performance entries are in chronological order of request starttime, we look back from end of the list to start from most recent entry.
        for (var i = entries.length - 1; i >= 0; i--) {
            var currentEntry = entries[i];
            // We want to find the request record that was made most-immediately after client initiated the request
            if (currentEntry.startTime < requestPerformanceStartTime) {
                break;
            }
            // Filter to entry that matches the request url
            if (decodeURIComponent(currentEntry.name) === decodeURIComponent(url)) {
                entry = currentEntry;
            }
        }
        if (entry) {
            var pickedMetrics = (function (_a) {
                var connectEnd = _a.connectEnd, connectStart = _a.connectStart, decodedBodySize = _a.decodedBodySize, domainLookupend = _a.domainLookupend, domainLookupStart = _a.domainLookupStart, _b = _a.duration, duration = _b === void 0 ? -1 : _b, // Default to -1 if not available to indicate error
                encodedBodySize = _a.encodedBodySize, fetchStart = _a.fetchStart, nextHopProtocol = _a.nextHopProtocol, redirectEnd = _a.redirectEnd, redirectStart = _a.redirectStart, requestStart = _a.requestStart, responseEnd = _a.responseEnd, responseStart = _a.responseStart, secureConnectionStart = _a.secureConnectionStart, startTime = _a.startTime, transferSize = _a.transferSize, workerStart = _a.workerStart;
                return ({
                    connectEnd: connectEnd,
                    connectStart: connectStart,
                    decodedBodySize: decodedBodySize,
                    domainLookupend: domainLookupend,
                    domainLookupStart: domainLookupStart,
                    duration: duration,
                    encodedBodySize: encodedBodySize,
                    fetchStart: fetchStart,
                    nextHopProtocol: nextHopProtocol,
                    redirectEnd: redirectEnd,
                    redirectStart: redirectStart,
                    requestStart: requestStart,
                    responseEnd: responseEnd,
                    responseStart: responseStart,
                    secureConnectionStart: secureConnectionStart,
                    startTime: startTime,
                    transferSize: transferSize,
                    workerStart: workerStart
                });
            })(entry);
            return pickedMetrics;
        }
        else {
            return { duration: -1 /* Default to -1 if not available to indicate error */ };
        }
    }
    catch (ex) {
        return { duration: -1 /* Default to -1 if not available to indicate error */ };
    }
}
exports.getRequestEntryDurationMetrics = getRequestEntryDurationMetrics;
//# sourceMappingURL=RequestDurationLoggingHelper.js.map

/***/ }),

/***/ "5UhA":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/Nav.styles.js ***!
  \****************************************************************************************************************************************************************************************************************/
/*! exports provided: NavStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavStyles", function() { return NavStyles; });
var NavStyles = function (props) {
    var theme = props.theme, isDisabled = props.isDisabled, isSelected = props.isSelected, isGroup = props.isGroup, isLink = props.isLink, _a = props.navHeight, navHeight = _a === void 0 ? 36 : _a;
    var palette = theme.palette;
    return {
        link: [
            {
                height: navHeight,
                lineHeight: navHeight + "px"
            },
            !isDisabled && {
                selectors: {
                    '.ms-Nav-compositeLink:hover &': {
                        backgroundColor: palette.neutralLighterAlt
                    }
                }
            },
            isSelected && {
                backgroundColor: palette.neutralLighter
            }
        ],
        chevronButton: [
            {
                lineHeight: navHeight + "px",
                selectors: {
                    '&:hover': {
                        backgroundColor: palette.neutralLighterAlt
                    },
                    '$compositeLink:hover &': {
                        backgroundColor: palette.neutralLighterAlt
                    }
                }
            },
            isGroup && {
                height: navHeight
            },
            isLink && {
                height: navHeight - 2
            }
        ],
        chevronIcon: {
            height: navHeight,
            lineHeight: navHeight + "px"
        }
    };
};
//# sourceMappingURL=Nav.styles.js.map

/***/ }),

/***/ "5aZ1":
/*!********************************************************!*\
  !*** ./lib/extensibility/BaseApplicationCustomizer.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-extension-base */ "ZFc5");
/* harmony import */ var _microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__);




/**
 * This is the base class that third parties should extend when implementing
 * a client-side extension that runs when an application is first starting.
 *
 * @remarks
 * In the component manifest, the "extensionType" should be set to "ApplicationCustomizer".
 *
 * Example usage scenarios for an application customizer might include: rendering custom
 * UI elements inside a SharePoint content placeholder, tracking page load statistics,
 * or automatically logging the user out after a certain time period.
 *
 * @public
 */
var BaseApplicationCustomizer = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BaseApplicationCustomizer, _super);
    function BaseApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Initialization code for all the application customizers.
     * Sets up the placeholder setup virtual function with the placeholder changed event.
     *
     * @internal
     */
    BaseApplicationCustomizer.prototype._initializeExtensionType = function () {
        _super.prototype._initializeExtensionType.call(this);
        // Set up if the extension doesn't override the function with a different signature.
        // As this function was added later there is a chance they already used the name.
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"]('BaseApplicationCustomizer.onPlaceholdersChanged.setUp');
        if (this.onPlaceholdersChanged.length === 1) {
            this._placeholdersChangedCallback = this.onPlaceholdersChanged.bind(this, this.context.placeholderProvider);
            this.context.placeholderProvider.changedEvent.add(this, this._placeholdersChangedCallback);
            qosMonitor.writeSuccess();
        }
        else {
            qosMonitor.writeExpectedFailure('DifferentSignature');
        }
    };
    /**
     * {@inheritDoc @microsoft/sp-component-base#BaseComponent.dispose}
     */
    BaseApplicationCustomizer.prototype.dispose = function () {
        if (this._placeholdersChangedCallback) {
            this.context.placeholderProvider.changedEvent.remove(this, this._placeholdersChangedCallback);
        }
        _super.prototype.dispose.call(this);
    };
    /**
     * This event method is called when the placeholders of the host application change, come into
     * existence, or disappear.
     */
    BaseApplicationCustomizer.prototype.onPlaceholdersChanged = function (placeholderProvider) {
        return;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseApplicationCustomizer.prototype, "onPlaceholdersChanged", null);
    return BaseApplicationCustomizer;
}(_microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_2__["BaseExtension"]));
/* harmony default export */ __webpack_exports__["default"] = (BaseApplicationCustomizer);


/***/ }),

/***/ "5z2F":
/*!********************************************!*\
  !*** external "@ms/sp-load-themed-styles" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5z2F__;

/***/ }),

/***/ "6/ec":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/Callout.styles.js ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: CalloutContentStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalloutContentStyles", function() { return CalloutContentStyles; });
var CalloutContentStyles = function (props) {
    var theme = props.theme;
    var palette = theme.palette;
    return {
        root: {
            border: "1px solid " + palette.neutralLight
        }
    };
};
//# sourceMappingURL=Callout.styles.js.map

/***/ }),

/***/ "6GSH":
/*!*******************************************!*\
  !*** ./lib/pageChrome/SPThemeProvider.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_odsp_datasources_lib_providers_theming_WebThemeProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/odsp-datasources/lib/providers/theming/WebThemeProvider */ "45U0");
/* harmony import */ var _ms_odsp_datasources_lib_providers_theming_ThemeInitializer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/odsp-datasources/lib/providers/theming/ThemeInitializer */ "Y/uW");
/* harmony import */ var _ms_odsp_datasources_lib_dataSources_theming_spList_WebThemeDataSource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/odsp-datasources/lib/dataSources/theming/spList/WebThemeDataSource */ "dL3a");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__);





/**
 * The class controls applying a theme to the current Page.
 * The theme is a web level setting, if a theme is applied this class with call loadThemedStyles
 * which will update the styles that are registered with load-themed-styles.
 *
 * @internal
 */
var SPThemeProvider = /** @class */ (function () {
    function SPThemeProvider(serviceScope) {
        var _this = this;
        serviceScope.whenFinished(function () {
            _this._pageContext = serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0__["PageContext"].serviceKey);
            _this._themeFactoryProvider = {
                webThemeProvider: function (pageContext) { return _this._getThemeProvider(pageContext); }
            };
        });
    }
    SPThemeProvider.prototype.loadThemedStyles = function (forceUpdate) {
        return _ms_odsp_datasources_lib_providers_theming_ThemeInitializer__WEBPACK_IMPORTED_MODULE_2__["ThemeInitializer"].initializeTheme(this._themeFactoryProvider, this._pageContext.legacyPageContext, forceUpdate);
    };
    SPThemeProvider.prototype._getThemeProvider = function (pageContext) {
        var _this = this;
        return new _ms_odsp_datasources_lib_providers_theming_WebThemeProvider__WEBPACK_IMPORTED_MODULE_1__["WebThemeProvider"]({
            pageContext: pageContext,
            getThemeDataSource: function () { return _this._getThemeDataSource(); }
        });
    };
    SPThemeProvider.prototype._getThemeDataSource = function () {
        var themeDataSource = new _ms_odsp_datasources_lib_dataSources_theming_spList_WebThemeDataSource__WEBPACK_IMPORTED_MODULE_3__["default"](this._pageContext.legacyPageContext);
        return _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__["Promise"].resolve(themeDataSource);
    };
    return SPThemeProvider;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPThemeProvider);


/***/ }),

/***/ "6JwG":
/*!*************************************************!*\
  !*** ./lib/navigator/NavigationOrchestrator.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _extensibility_SearchQueryManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../extensibility/SearchQueryManager */ "efvT");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ApplicationManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ApplicationManager */ "Q81X");
/* harmony import */ var _BaseApplication__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../BaseApplication */ "n9Iz");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/Flights */ "w4+A");
/* harmony import */ var _common_Killswitches__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/Killswitches */ "dQCu");
/* harmony import */ var _extensibility_ApplicationCustomizerLoader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../extensibility/ApplicationCustomizerLoader */ "Rr6l");
/* harmony import */ var _pageChrome_SPMasterChrome__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../pageChrome/SPMasterChrome */ "vt24");
/* harmony import */ var _pageChrome_SPPageChrome__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../pageChrome/SPPageChrome */ "KdXK");
/* harmony import */ var _pageChrome_SPThemeProvider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../pageChrome/SPThemeProvider */ "6GSH");
/* harmony import */ var _INavigationResult__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./INavigationResult */ "TNAb");















/**
 * It orchestrates all different steps to navigate to an SPFx application.
 *
 * This includes updating the Page Context, loading the application customizers, initializing the application, etc.
 */
var NavigationOrchestrator = /** @class */ (function () {
    /**
     * Creates a NavigationOrchestrator.
     *
     * @param serviceScope - Root service scope
     * @param applicationManager - Depending on the bootstrapping sequence, application manager is
     *                             injected or created inside.
     */
    function NavigationOrchestrator(serviceScope, applicationManager, navigator) {
        this._numAppsInitializedInSession = 0;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(serviceScope, 'serviceScope');
        this._serviceScope = serviceScope;
        this._applicationManager = applicationManager || new _ApplicationManager__WEBPACK_IMPORTED_MODULE_6__["default"](serviceScope, navigator);
        this._pageContext = serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__["PageContext"].serviceKey);
        this._searchQueryManager = serviceScope.consume(_extensibility_SearchQueryManager__WEBPACK_IMPORTED_MODULE_4__["default"].serviceKey);
        this._applicationCustomizerLoader = new _extensibility_ApplicationCustomizerLoader__WEBPACK_IMPORTED_MODULE_10__["default"](serviceScope);
    }
    /**
     * Raises an event for a page navigation.
     */
    NavigationOrchestrator.raiseNavigatedEvent = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.raiseStickyEvent(_BaseApplication__WEBPACK_IMPORTED_MODULE_7__["default"]._navigatedEventName, {});
    };
    /**
     * Does all the operation to navigate to a new preloaded data.
     *
     * @remarks
     * It assumes the preloaded data has already been validated. Not null, with a spPageContextInfo and an application id.
     */
    NavigationOrchestrator.prototype.navigate = function (preloadedData) {
        var _this = this;
        var currentAppId = this._applicationManager.currentApplicationId;
        var appLoaded = !currentAppId.equals(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].empty);
        var isSameApp = currentAppId.equals(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(preloadedData.clientSideApplicationId) || _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].empty);
        if (_common_Killswitches__WEBPACK_IMPORTED_MODULE_9__["Killswitches"].isInplaceNavigationKSActive()) {
            // Cross-app navigation is not supported without the new boot sequence. Return Unsupported.
            if (!_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["_SPLoaderFlights"]._useNewBootSequence()) {
                if (appLoaded && !isSameApp) {
                    return Promise.resolve({
                        preloadedData: preloadedData,
                        application: undefined,
                        operation: _INavigationResult__WEBPACK_IMPORTED_MODULE_14__["NavigationOperation"].Unsupported
                    });
                }
            }
        }
        else {
            var isAppIdSameOrEmpty = isSameApp || !appLoaded;
            var unsupportedReason = this._isNavigationSupportedWithReason(preloadedData, this._pageContext, isAppIdSameOrEmpty);
            if (unsupportedReason !== undefined) {
                return Promise.resolve({
                    preloadedData: preloadedData,
                    application: undefined,
                    operation: _INavigationResult__WEBPACK_IMPORTED_MODULE_14__["NavigationOperation"].Unsupported,
                    unsupportedReason: unsupportedReason
                });
            }
        }
        this._fixPreloadedDataItem(preloadedData);
        var isCrossSite = this._isCrossSite(preloadedData, this._pageContext);
        // TODO: demyren: VSO:428542 - clean up when moving to new PageContext
        this._pageContext.initialize(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__["SharePointPageContextDataProvider"]._createPageContextData(preloadedData.spPageContextInfo), preloadedData.spPageContextInfo);
        _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["_ManifestStore"].instance.replaceManifests(preloadedData.manifests);
        // Before initializing application customizers we should make sure that the page chrome is initialized.
        // Page chrome initializes the dialog manager.
        if (!_ApplicationManager__WEBPACK_IMPORTED_MODULE_6__["default"]._isChromelessApplication(preloadedData.clientSideApplicationId)) {
            if (_common_Flights__WEBPACK_IMPORTED_MODULE_8__["Flights"].useNewChromeSequence() && !this._masterChrome) {
                this._masterChrome = new _pageChrome_SPMasterChrome__WEBPACK_IMPORTED_MODULE_11__["default"]();
            }
            if (_common_Flights__WEBPACK_IMPORTED_MODULE_8__["Flights"].useNextGenSPA) {
                if (!this._pageChrome) {
                    this._pageChrome = new _pageChrome_SPPageChrome__WEBPACK_IMPORTED_MODULE_12__["default"](this._serviceScope, this._masterChrome);
                }
            }
            else {
                this._pageChrome = new _pageChrome_SPPageChrome__WEBPACK_IMPORTED_MODULE_12__["default"](this._serviceScope, this._masterChrome);
            }
        }
        if (isCrossSite && !_ApplicationManager__WEBPACK_IMPORTED_MODULE_6__["default"]._isChromelessApplication(preloadedData.clientSideApplicationId)) {
            if (_common_Killswitches__WEBPACK_IMPORTED_MODULE_9__["Killswitches"].themeProviderOverrideKSActive()) {
                var themeProvider = new _pageChrome_SPThemeProvider__WEBPACK_IMPORTED_MODULE_13__["default"](this._serviceScope);
                themeProvider.loadThemedStyles();
            }
            else if (appLoaded && isSameApp) {
                this._applicationManager.currentApplication._loadTheme();
            }
        }
        this._updateTelemetry(preloadedData);
        // Discouraging application developers to use spPageContextInfo and instead to use the Page Context API.
        preloadedData.spPageContextInfo = undefined;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Session"]._changePage();
        NavigationOrchestrator.raiseNavigatedEvent();
        if (_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["_SPLoaderFlights"]._useNewBootSequence()) {
            // If it's the same application, just return with the result.
            if (isSameApp) {
                this._initializeSearchQuery(preloadedData);
                // The application doesn't change, but the preloaded data has. We need to re-load the app customizers.
                if (this._applicationManager.currentApplication.delayExtensionsLoading()) {
                    this._initializeExtensionsContext(preloadedData);
                }
                else {
                    this._loadApplicationCustomizers(preloadedData);
                }
                return Promise.resolve({
                    preloadedData: preloadedData,
                    application: this._applicationManager.currentApplication,
                    operation: _INavigationResult__WEBPACK_IMPORTED_MODULE_14__["NavigationOperation"].UpdateContext
                });
            }
            else {
                _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5__["_PerformanceLogger"].markCrossAppNavigationStart();
                return this._applicationManager.startApplication(preloadedData, this._pageChrome).then(function (application) {
                    _this._numAppsInitializedInSession++;
                    _this._initializeSearchQuery(preloadedData);
                    // Load app customizers after the application has rendered to )ensure placeholders have been set up.
                    if (_this._applicationManager.currentApplication.delayExtensionsLoading()) {
                        _this._initializeExtensionsContext(preloadedData);
                    }
                    else {
                        _this._loadApplicationCustomizers(preloadedData);
                    }
                    return Promise.resolve({
                        preloadedData: preloadedData,
                        application: application,
                        operation: _INavigationResult__WEBPACK_IMPORTED_MODULE_14__["NavigationOperation"].LoadApplication
                    });
                });
            }
        }
        else {
            // In the old boot sequence, ApplicationManager calls Navigator, not the other way around
            // In this case, nobody will read the application property so it can be left undefined
            return Promise.resolve({
                preloadedData: preloadedData,
                application: undefined,
                operation: _INavigationResult__WEBPACK_IMPORTED_MODULE_14__["NavigationOperation"].UpdateContext
            });
        }
    };
    NavigationOrchestrator.prototype._initializeExtensionsContext = function (preloadedData) {
        if (this._appSupportsExtensions(preloadedData)) {
            this._applicationCustomizerLoader.initializeExtensionsContext(preloadedData.customActions);
        }
    };
    /**
     * Loads the application customizers for the current page.
     *
     * @remarks
     * This function is internal, and not private, because it needs to be used by the ApplicationManager when the
     * flight #182 (SppplatCrossAppNavigation) is off. Once the flight is graduated this function should be private.
     *
     * @param preloadedData - Preloaded data for the current page.
     *
     * @internal
     */
    NavigationOrchestrator.prototype._loadApplicationCustomizers = function (preloadedData) {
        if (this._appSupportsExtensions(preloadedData)) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(NavigationOrchestrator._logSource, 'Loading application customizers');
            return this._applicationCustomizerLoader.loadExtensions(preloadedData.customActions);
        }
        else {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(NavigationOrchestrator._logSource, 'Application Customizer is not supported for classic pages and workbench.');
            return Promise.resolve();
        }
    };
    /**
     * Every time the URL gets updated (and there is a navigation) the search query needs to be updated
     * in the page context.
     * It's done in an async way to include loading SearchQueryModifier extensions when necessary.
     *
     * Setting up the search query is disabled for applications that don't have this scenario.
     * If that situation changes (like SPHome supporting search scenario) the check will need to be revisited.
     */
    NavigationOrchestrator.prototype._initializeSearchQuery = function (preloadedData) {
        var _this = this;
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1626 /* CSISearchQueryExtension */) &&
            preloadedData.clientSideApplicationId !== NavigationOrchestrator.classicPagesComponentId &&
            preloadedData.clientSideApplicationId !== NavigationOrchestrator.workbenchComponentId &&
            preloadedData.clientSideApplicationId !== NavigationOrchestrator.spHomeComponentId) {
            return this._searchQueryManager.initialize(preloadedData)
                .then(function () { return _this._searchQueryManager.getSearchQuery(); })
                .then(function (query) { return _this._pageContext._setSearchQuery(query); });
        }
        return Promise.resolve();
    };
    NavigationOrchestrator.prototype._appSupportsExtensions = function (preloadedData) {
        if (preloadedData.clientSideApplicationId !== NavigationOrchestrator.classicPagesComponentId &&
            preloadedData.clientSideApplicationId !== NavigationOrchestrator.workbenchComponentId) {
            return true;
        }
        return false;
    };
    NavigationOrchestrator.prototype._updateTelemetry = function (preloadedData) {
        var _a = this._pageContext.legacyPageContext, correlationId = _a.correlationId, siteId = _a.siteId, webId = _a.webId;
        var emptyIdValueForMerge = ''; // merge inside updateSettings doesn't overwrite if undefined
        var listId = (this._pageContext.list && this._pageContext.list.id.toString()) ||
            emptyIdValueForMerge;
        var uniqueId = (preloadedData.item && preloadedData.item.UniqueId) ||
            emptyIdValueForMerge;
        // This will eventually be removed when the migration to Diagnostics is complete
        var manifestAlias = preloadedData && preloadedData.manifests && preloadedData.manifests.length > 0 ?
            preloadedData.manifests[0].alias :
            '';
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5__["_Telemetry"].updateSettings({
            siteId: siteId,
            webId: webId,
            listId: listId,
            listItemUniqueId: uniqueId,
            correlationId: correlationId
        }, manifestAlias /** used for workload name */);
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_Diagnostics"].updateSettings({
            siteId: siteId,
            webId: webId,
            listId: listId,
            listItemUniqueId: uniqueId,
            correlationId: correlationId
        });
    };
    /**
     * Returns true if a navigator from the page context to the new preloaded data is a cross-site navigation.
     * This operation needs to happen before updating the page context with the new preloaded data.
     */
    NavigationOrchestrator.prototype._isCrossSite = function (preloadedData, pageContext) {
        if (!pageContext.isInitialized) { // This happens in the first load.
            return false;
        }
        return !_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(preloadedData.spPageContextInfo.webId).equals(pageContext.web.id) ||
            !_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(preloadedData.spPageContextInfo.siteId).equals(pageContext.site.id);
    };
    NavigationOrchestrator.prototype._fixPreloadedDataItem = function (preloadedData) {
        var INVALID_PAGE_ITEM_ID = -1;
        // Use the preloadedData's item id if the spPageContextInfo item id is unavailable
        // The workbench can provide a list item via query string which will not be reflected in the
        // spPageContextInfo variable.
        if (preloadedData.spPageContextInfo.pageItemId === INVALID_PAGE_ITEM_ID &&
            preloadedData.item &&
            preloadedData.item.ID !== INVALID_PAGE_ITEM_ID) {
            preloadedData.spPageContextInfo.pageItemId = preloadedData.item.ID;
        }
        return preloadedData;
    };
    /**
     * Determines whether inplace navigation is supported.
     *
     * @param preloadedData - Application preloaded data
     * @param pageContext - Application context
     * @param isSameAppId - Whether the navigation is happening within the same app
     *
     * @returns True if navigation is supported else false
     */
    NavigationOrchestrator.prototype._isNavigationSupportedWithReason = function (preloadedData, pageContext, isSameAppId) {
        if (!_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["_SPLoaderFlights"]._useNewBootSequence()) {
            return isSameAppId ? undefined : _INavigationResult__WEBPACK_IMPORTED_MODULE_14__["NavigationUnsupportedReason"].AppTransitionNotEnabled;
        }
        var isDifferentLocale = pageContext.isInitialized &&
            pageContext.cultureInfo.currentUICultureName !== preloadedData.spPageContextInfo.currentUICultureName;
        // Navigation is supported if the target locale is the same and the target application id is same as current
        // application Id or the number of in-place navigations are within the threshold.
        if (isDifferentLocale) {
            return _INavigationResult__WEBPACK_IMPORTED_MODULE_14__["NavigationUnsupportedReason"].LocaleChange;
        }
        if (!isSameAppId && this._numAppsInitializedInSession > NavigationOrchestrator.maxSupportedAppsInSession) {
            return _INavigationResult__WEBPACK_IMPORTED_MODULE_14__["NavigationUnsupportedReason"].TransitionsExceeded;
        }
        return undefined;
    };
    NavigationOrchestrator.classicPagesComponentId = 'eb4b666b-5c29-4dad-9a99-23613f21a2b7';
    NavigationOrchestrator.workbenchComponentId = '8be81a5c-af38-4bb2-af97-afa3b64dfbed';
    NavigationOrchestrator.spHomeComponentId = '1f019ae1-2de1-4f44-b723-00a6ec1d7445';
    NavigationOrchestrator._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('NavigationOrchestrator');
    NavigationOrchestrator.maxSupportedAppsInSession = 15;
    return NavigationOrchestrator;
}());
/* harmony default export */ __webpack_exports__["default"] = (NavigationOrchestrator);


/***/ }),

/***/ "6TYi":
/*!***********************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/features/FeatureOverrides.js ***!
  \***********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @ms/odsp-utilities/features/FeatureOverrides.js
var pkg = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
module.exports = {}
module.exports.default = pkg.FeatureOverrides;
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "6cmh":
/*!********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/dataSources/base/ServerData.js ***!
  \********************************************************************************************************************************************************************************************/
/*! exports provided: SERVICEWORKER_DATASOURCE_HEADER_KEY, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SERVICEWORKER_DATASOURCE_HEADER_KEY", function() { return SERVICEWORKER_DATASOURCE_HEADER_KEY; });
/* harmony import */ var _ms_odsp_utilities_lib_async_Signal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities/lib/async/Signal */ "f2ns");
/* harmony import */ var _ms_odsp_utilities_lib_async_Signal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_async_Signal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_odsp_utilities_lib_uri_Uri__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/odsp-utilities/lib/uri/Uri */ "oQJL");
/* harmony import */ var _ms_odsp_utilities_lib_uri_Uri__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_uri_Uri__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_odsp_utilities_lib_encoding_UriEncoding__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/odsp-utilities/lib/encoding/UriEncoding */ "G7sL");
/* harmony import */ var _ms_odsp_utilities_lib_encoding_UriEncoding__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_encoding_UriEncoding__WEBPACK_IMPORTED_MODULE_2__);



var SERVICEWORKER_DATASOURCE_HEADER_KEY = "X-SERVICEWORKER-DATA-SOURCE";
function _parseBlobError(blob) {
    var signal = new _ms_odsp_utilities_lib_async_Signal__WEBPACK_IMPORTED_MODULE_0___default.a();
    var reader;
    var onLoad = function () {
        if (reader.result) {
            var response = void 0;
            try {
                response = JSON.parse(reader.result);
                signal.complete(response);
            }
            catch (error) {
                signal.complete({ message: 'Unable to parse blob result.' });
            }
        }
    };
    var onError = function () {
        signal.complete({ message: 'Unable to read blob error response.' });
    };
    try {
        reader = new FileReader();
        reader.addEventListener('load', onLoad);
        reader.addEventListener('error', onError);
        reader.readAsText(blob);
    }
    catch (error) {
        onError();
    }
    return signal.getPromise().then(function (errorData) {
        if (reader) {
            reader.removeEventListener('load', onLoad);
            reader.removeEventListener('error', onError);
        }
        return errorData;
    });
}
var ServerData = /** @class */ (function () {
    function ServerData(request, strUrl, params) {
        this._request = request;
        this._url = strUrl;
        this._webAbsoluteUrl = params && params.webAbsoluteUrl;
        this._isCanaryRequest = params && params.isCanaryRequest;
    }
    ServerData.prototype.getSourceUrl = function () {
        return this._url;
    };
    ServerData.prototype.getAllResponseHeaders = function () {
        return this._request.getAllResponseHeaders();
    };
    ServerData.prototype.getCorrelationId = function () {
        return this._request.getResponseHeader('SPRequestGuid');
    };
    ServerData.prototype.getGroupThrottle = function () {
        return this._request.getResponseHeader('SPGroupThrottle');
    };
    ServerData.prototype.getMSCorrelationVector = function () {
        return this._request.getResponseHeader("MS-CV");
    };
    ServerData.prototype.getServiceWorkerDataSourceHeader = function () {
        return this._request.getResponseHeader(SERVICEWORKER_DATASOURCE_HEADER_KEY);
    };
    ServerData.prototype.getServiceWorkerFetchInfoFromHeader = function () {
        return this._request.getResponseHeader('X-ServiceWorkerFetchInfo');
    };
    ServerData.prototype.getStatus = function () {
        try {
            // We read the status in a try catch to avoid issues
            // with IE implementation which throws a bogus exception
            return this._request.status;
        }
        catch (e) {
            // do nothing
        }
    };
    ServerData.prototype.getAuthenticationRedirect = function () {
        return this._request.getResponseHeader('X-Forms_Based_Auth_Required');
    };
    ServerData.prototype.getResponseType = function () {
        return this._request.responseType;
    };
    ServerData.prototype.getResponseText = function () {
        if (!this._request.responseType || this._request.responseType === 'text') {
            return this._request.responseText;
        }
        else {
            return this._request.response;
        }
    };
    ServerData.prototype.getErrorResponseText = function () {
        if (this._request.responseType === 'blob') {
            var errorData = {
                status: this._request.status,
                statusText: this._request.statusText,
                infected: undefined
            };
            if (this._request.getResponseHeader('x-virus-infected')) {
                errorData.infected = true;
            }
            return errorData;
        }
        else {
            return this.getResponseText();
        }
    };
    ServerData.prototype.parseError = function () {
        var _this = this;
        var signal = new _ms_odsp_utilities_lib_async_Signal__WEBPACK_IMPORTED_MODULE_0___default.a();
        if (!this._request.responseType || this._request.responseType === 'text') {
            signal.complete(this._request.responseText);
        }
        else if (this._request.responseType === 'blob') {
            _parseBlobError(this._request.response).then(function (response) {
                var errorData = {
                    data: response,
                    status: _this.getStatus(),
                    statusText: _this._request.statusText,
                    infected: !!_this._request.getResponseHeader('x-virus-infected')
                };
                signal.complete(errorData);
            });
        }
        else {
            signal.complete(this._request.response);
        }
        return signal.getPromise();
    };
    ServerData.prototype.getValue = function (key) {
        var value;
        switch (key) {
            case ServerData.DataValueKeys.SourceURL:
                value = this.getSourceUrl();
                break;
            case ServerData.DataValueKeys.CorrelationId:
                value = this.getCorrelationId();
                break;
            case ServerData.DataValueKeys.Status:
                value = this.getStatus();
                break;
            case ServerData.DataValueKeys.AuthenticationRedirect:
                value = this.getAuthenticationRedirect();
                break;
            case ServerData.DataValueKeys.ResponseText:
                value = this.getResponseText();
                break;
            case ServerData.DataValueKeys.ErrorResponseText:
                value = this.getErrorResponseText();
                break;
        }
        return value;
    };
    ServerData.prototype.getRedirectUrl = function () {
        if (this._isCanaryRequest) {
            if (this.getStatus() === 403) {
                if (this.shouldRedirectToErrorCustomPromptLocation()) {
                    return this.getRedirectToErrorCustomPromptLocation();
                }
                else {
                    return this.getRedirectLoginPageUrl();
                }
            }
            else {
                return this.getAccessDeniedRedirectUrl();
            }
        }
        else if (this.getStatus() === 403) {
            if (this.shouldRedirectToErrorCustomPromptLocation()) {
                return this.getRedirectToErrorCustomPromptLocation();
            }
        }
        else if (this.getStatus() === 401) {
            if (this.shouldRedirectToErrorCustomPromptLocation()) {
                return this.getRedirectToErrorCustomPromptLocation();
            }
        }
    };
    ServerData.prototype.getRedirectLoginPageUrl = function () {
        var redirectUrl;
        // if users hit 403 again, they're unauthenticated, try redirect to auth.
        var redirectLoginPageURL = this.getAuthenticationRedirect();
        if (redirectLoginPageURL) {
            var redirectLoginPageUri = new _ms_odsp_utilities_lib_uri_Uri__WEBPACK_IMPORTED_MODULE_1___default.a(redirectLoginPageURL);
            redirectLoginPageUri.setQueryParameter('ReturnUrl', _ms_odsp_utilities_lib_encoding_UriEncoding__WEBPACK_IMPORTED_MODULE_2___default.a.encodeURIComponent(window.location.href));
            redirectUrl = redirectLoginPageUri.toString();
        }
        return redirectUrl;
    };
    ServerData.prototype.getAccessDeniedRedirectUrl = function () {
        var redirectUrl;
        if (this._webAbsoluteUrl) {
            var redirectLoginPageURL = (this._webAbsoluteUrl) + '/_layouts/15/AccessDenied.aspx';
            if (redirectLoginPageURL) {
                var redirectLoginPageUri = new _ms_odsp_utilities_lib_uri_Uri__WEBPACK_IMPORTED_MODULE_1___default.a(redirectLoginPageURL);
                redirectLoginPageUri.setQueryParameter('Source', _ms_odsp_utilities_lib_encoding_UriEncoding__WEBPACK_IMPORTED_MODULE_2___default.a.encodeURIComponent(window.location.href));
                redirectLoginPageUri.setQueryParameter('Type', 'list');
                redirectLoginPageUri.setQueryParameter('correlation', _ms_odsp_utilities_lib_encoding_UriEncoding__WEBPACK_IMPORTED_MODULE_2___default.a.encodeURIComponent(this.getCorrelationId()));
                // todo: set list guid! (we don't have that info from server context yet).
                // the access denied page will still kind of work, except that we'll request access to the site, not the list.
                // redirectLoginPageUri.setQueryParameter('name', context.listName);
                // Ideally this should be using the navigation resource, but it is not guaranteed to be present here some
                // DataSources do not extend the base DataSource.
                redirectUrl = redirectLoginPageUri.toString();
            }
        }
        return redirectUrl;
    };
    ServerData.prototype.getRedirectToErrorCustomPromptLocation = function () {
        var reattestionPageUri = new _ms_odsp_utilities_lib_uri_Uri__WEBPACK_IMPORTED_MODULE_1___default.a(this._request.getResponseHeader('X-SPO-ErrorCustomPromptLocation'));
        reattestionPageUri.setQueryParameter('ReturnUrl', window.location.href);
        return reattestionPageUri.toString();
    };
    /**
     * If a 401/403 is returned, check for the SharePoint custom error code that indicates the
     * user needs to reattest and redirect to the custom prompt location.
     */
    ServerData.prototype.shouldRedirectToErrorCustomPromptLocation = function () {
        var spErrorCode = this._request.getResponseHeader('X-SPO-ErrorCode');
        var legacySharePointErrorCode = this._request.getResponseHeader('sharepointerror');
        return spErrorCode === '9.3' || legacySharePointErrorCode === '-2130575129';
    };
    ServerData.prototype.getResponseHeadersDictionary = function () {
        var headerMap = {};
        // Get the raw header string
        var headerString = this.getAllResponseHeaders();
        if (headerString) {
            // Convert the header string into an array of individual headers
            var arr = headerString.trim().split(/[\r\n]+/);
            if (arr && arr.length > 0) {
                // Create a map of header names to values
                arr.forEach(function (line) {
                    var parts = line.split(": ");
                    var header = parts.shift();
                    var value = parts.join(": ");
                    headerMap[header] = value;
                });
            }
        }
        return headerMap;
    };
    /* tslint:disable:variable-name */
    ServerData.DataValueKeys = {
        // (String) Original source url for this request.
        SourceURL: 'SourceUrl',
        // (String) SharePoint CorrelationId that corresponds with this request.
        CorrelationId: 'CorrelationId',
        // (Number) HTTP status code for this request
        Status: 'Status',
        // (String) URL to redirect to in case of an error
        AuthenticationRedirect: 'AuthenticationRedirect',
        // (String) Response text for this server request.
        ResponseText: 'ResponseText',
        // (String) Error Response for this server request.
        ErrorResponseText: 'ErrorResponseText',
        // (String) GroupThrottle Response for this server request.
        GroupThrottle: 'GroupThrottle'
    };
    return ServerData;
}());
/* harmony default export */ __webpack_exports__["default"] = (ServerData);
//# sourceMappingURL=ServerData.js.map

/***/ }),

/***/ "6iXJ":
/*!***********************************!*\
  !*** external "@ms/sp-suite-nav" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6iXJ__;

/***/ }),

/***/ "75qc":
/*!**************************************************!*\
  !*** ./lib/extensibility/ApplicationAccessor.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BaseApplication__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseApplication */ "n9Iz");


/**
 * Provides access to the client-side application that is currently running.
 *
 * @remarks
 * The client-side application determines the user experience for an entire web page.
 * (It is a client-side component with a manifest; however, the SharePoint Framework
 * does not enable third parties to create their own client-side applications at this time.)
 * Within a web page, at most one client-side application will be running at a time.
 * Certain in-place navigation transitions can cause the application to be unloaded
 * and replaced by a different application.
 *
 * The ApplicationAccessor class enables extensibility components such as extensions
 * and web parts to interact with the currently running application.  It acts as
 * a proxy for the real application object (the BaseApplication subclass), to ensure
 * that extensibility components only rely on interactions that would be portable
 * across all applications.
 *
 * @public
 */
var ApplicationAccessor = /** @class */ (function () {
    /**
     * Constructs a new instance of the {@link ApplicationAccessor} class.
     * @remarks
     * Third parties should not call this constructor.  Instead, use the ApplicationAccessor
     * instance from the component context, for example {@link BaseApplicationCustomizer.context}.
     */
    function ApplicationAccessor(serviceScope) {
        this._navigatedEvent = new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["SPEvent"](_BaseApplication__WEBPACK_IMPORTED_MODULE_1__["default"]._navigatedEventName);
        this._privateLayoutChangedEvent = new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["SPEvent"](_BaseApplication__WEBPACK_IMPORTED_MODULE_1__["default"]._layoutChangedEventName);
    }
    Object.defineProperty(ApplicationAccessor.prototype, "navigatedEvent", {
        /**
         * An event that is fired when the application's top-level page context navigates
         * to a new page.
         * @remarks
         * This event fires after the top-level {@link @microsoft/sp-page-context#PageContext} has navigated
         * to a new page.
         * @eventproperty
         */
        get: function () {
            return this._navigatedEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationAccessor.prototype, "_layoutChangedEvent", {
        /**
         * Event that gets raised every time the layout changes in a page
         * @eventproperty
         * @internal
         */
        get: function () {
            return this._privateLayoutChangedEvent;
        },
        enumerable: true,
        configurable: true
    });
    return ApplicationAccessor;
}());
/* harmony default export */ __webpack_exports__["default"] = (ApplicationAccessor);


/***/ }),

/***/ "7Awa":
/*!***********************************************!*\
  !*** external "@microsoft/sp-component-base" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7Awa__;

/***/ }),

/***/ "7Cl3":
/*!*********************************************************!*\
  !*** ./lib/extensibility/DialogManagerConfiguration.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

/**
 * A singleton class that allows the application to configure the behavior of dialog manager. If `@microsoft/sp-dialog`
 * package is loaded on the page and a dialog manager is instantiated on the page, it will look for this singleton
 * as its configuration.
 *
 * @internal
 */
var DialogManagerConfiguration = /** @class */ (function () {
    function DialogManagerConfiguration() {
    }
    Object.defineProperty(DialogManagerConfiguration, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new DialogManagerConfiguration();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DialogManagerConfiguration.prototype, "allowDialogs", {
        /**
         * If the application allows showing dialogs. Application can change this configuration in runtime. For example,
         * the application can decide to set this to false to block all dialogs based on its current state. If this property
         * is false, the dialog manager will deny all requests to show dialogs.
         *
         * Throws an error if allowDialogs is undefined.
         */
        get: function () {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(this._allowDialogs, 'allowDialogs');
            return this._allowDialogs;
        },
        /**
         * Sets the allowDialogs.
         * Throws an error in the parameter value is undefined.
         */
        set: function (value) {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(value, 'value');
            this._allowDialogs = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DialogManagerConfiguration.prototype, "domElement", {
        /**
         * The container div that the dialog manager will use to render the dialogs in.
         *
         * Throws an error if domElement is undefined.
         */
        get: function () {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(this._domElement, 'domElement');
            return this._domElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * initialize dialog manager configuration.
     *
     * @param domElement - The container element for dialogs
     * @param allowDialogs - Whether the dialogs should be allowed. This defaults to true and can be updated later using
     * allowDialogs property.
     */
    DialogManagerConfiguration.prototype.initialize = function (domElement, allowDialogs) {
        if (allowDialogs === void 0) { allowDialogs = true; }
        this._allowDialogs = allowDialogs;
        this._domElement = domElement;
    };
    /**
     * Disposes the current configuration. Use this when the application is being disposed. This will make sure that
     * this config is not re-used in case another application is loaded on the same page.
     * IMPORTANT NOTE: SPFx assumption is that there is only one active application on the page at a given time.
     */
    DialogManagerConfiguration.prototype.dispose = function () {
        this._allowDialogs = undefined;
        this._domElement = undefined;
    };
    return DialogManagerConfiguration;
}());
/* harmony default export */ __webpack_exports__["default"] = (DialogManagerConfiguration);


/***/ }),

/***/ "7Oog":
/*!********************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/telemetry-manager/0.12.6/node_modules/@ms/telemetry-manager/lib/CorrelationVector.js ***!
  \********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Guid = __webpack_require__(/*! @ms/utilities-guid/lib/Guid */ "FmHR");
var CorrelationVector = /** @class */ (function () {
    function CorrelationVector(parent, current) {
        if (parent) {
            this.root = parent.root;
            this.parent = parent.current;
        }
        else {
            this.root = this.parent = Guid.Empty;
        }
        if (current) {
            this.current = current;
        }
        else {
            this.current = Guid.generate();
        }
    }
    CorrelationVector._getCorrelationVector = function () {
        var rootVector;
        if (typeof window !== 'undefined') {
            rootVector = window.rootVector;
        }
        else if (typeof self !== 'undefined') {
            rootVector = self.rootVector;
        }
        return rootVector || new CorrelationVector();
    };
    CorrelationVector.prototype.toString = function () {
        return this.root + "#" + this.parent + "#" + this.current;
    };
    CorrelationVector.RootVector = CorrelationVector._getCorrelationVector();
    return CorrelationVector;
}());
exports.CorrelationVector = CorrelationVector;
//# sourceMappingURL=CorrelationVector.js.map

/***/ }),

/***/ "8Idf":
/*!************************************************************!*\
  !*** ./lib/frameworkPlaceholders/AadPlaceholderManager.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SPApplicationBase_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SPApplicationBase.resx */ "Cc0y");
/* harmony import */ var _extensibility_placeholder_PlaceholderProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../extensibility/placeholder/PlaceholderProvider */ "/Kpt");
/* harmony import */ var _extensibility_placeholder_PlaceholderName__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../extensibility/placeholder/PlaceholderName */ "Cs6k");
/* harmony import */ var _extensibility_placeholder_PlaceholderManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../extensibility/placeholder/PlaceholderManager */ "/HB6");





/**
 * This class sets up an a placeholder for scenarios that token acquisition fails and will require
 * end user interaction.
 * @internal
 */
var AadPlaceholderManager = /** @class */ (function () {
    function AadPlaceholderManager() {
    }
    /**
     * Sets up a placeholder (or alert if unavailable) for the token acquisition failure event.
     */
    AadPlaceholderManager.prototype.setUpTokenAcquistionFailurePlaceholder = function (application, serviceScope) {
        var _this = this;
        var tokenProvider = _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_0__["_AadTokenProviders"].configurable;
        var placeHolderProvider = new _extensibility_placeholder_PlaceholderProvider__WEBPACK_IMPORTED_MODULE_2__["default"](serviceScope, {
            sequence: 0,
            preAllocatedApplicationCustomizerBottomHeight: 0,
            preAllocatedApplicationCustomizerTopHeight: 0
        }, 'AAD Failure Placeholder'
        /* This placeholder should render over any other placeholder */ );
        var placeholderManager = serviceScope.consume(_extensibility_placeholder_PlaceholderManager__WEBPACK_IMPORTED_MODULE_4__["default"].serviceKey);
        placeHolderProvider.changedEvent.add(application, function () {
            if (!_this._aadPlaceHolderContent) {
                _this._aadPlaceHolderContent = placeHolderProvider.tryCreateContent(_extensibility_placeholder_PlaceholderName__WEBPACK_IMPORTED_MODULE_3__["default"].Top);
            }
        });
        tokenProvider.tokenAcquisitionEvent.add(application, function (eventArgs) {
            if (!placeholderManager.isEnabled) {
                _this._renderTokenAcquistionAlert(eventArgs);
            }
            else {
                if (_this._aadPlaceHolderContent) {
                    _this._renderTokenAcquistionPlaceholder(_this._aadPlaceHolderContent, eventArgs);
                }
                else {
                    _this._renderTokenAcquistionAlert(eventArgs);
                }
            }
        });
    };
    AadPlaceholderManager.prototype._renderTokenAcquistionPlaceholder = function (placeholderContent, eventArgs) {
        placeholderContent.domElement.setAttribute('style', 'text-align: center; padding: 10px; background-color:#fff4ce;');
        var errorMessageElement = document.createElement('span');
        errorMessageElement.innerText = eventArgs.message;
        placeholderContent.domElement.appendChild(errorMessageElement);
        if (eventArgs.redirectUrl) {
            var resolveLinkElement = document.createElement('a');
            resolveLinkElement.href = eventArgs.redirectUrl;
            resolveLinkElement.innerText = _SPApplicationBase_resx__WEBPACK_IMPORTED_MODULE_1__["default"].clickToResolveIssueLinkText;
            placeholderContent.domElement.appendChild(resolveLinkElement);
        }
    };
    AadPlaceholderManager.prototype._renderTokenAcquistionAlert = function (eventArgs) {
        if (confirm(eventArgs.message) && eventArgs.redirectUrl) {
            window.location.href = eventArgs.redirectUrl;
        }
    };
    return AadPlaceholderManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (AadPlaceholderManager);


/***/ }),

/***/ "8WDM":
/*!******************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/telemetry-manager/0.12.6/node_modules/@ms/telemetry-manager/lib/SingleEventBase.js ***!
  \******************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OneDrive:CoverageThreshold(0)
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tCkv");
var EventBase_1 = __webpack_require__(/*! ./EventBase */ "P/8H");
function logData(data, parent) {
    return new this(data, EventBase_1.ClonedEventType.Single, parent);
}
function logEmptyData(parent) {
    return new this(null, EventBase_1.ClonedEventType.Single, parent);
}
function createSingleEvent(props, metadata, baseClass) {
    var SingleEvent = /** @class */ (function (_super) {
        tslib_1.__extends(SingleEvent, _super);
        function SingleEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // tslint:disable-next-line:typedef
        SingleEvent.logData = metadata ? logData : logEmptyData;
        return SingleEvent;
    }(EventBase_1.EventBase));
    EventBase_1.addEventProps(SingleEvent.prototype, props, metadata || {}, baseClass);
    return SingleEvent;
}
exports.createSingleEvent = createSingleEvent;
//# sourceMappingURL=SingleEventBase.js.map

/***/ }),

/***/ "8qk/":
/*!*********************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/scope/Scope.js ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @ms/odsp-utilities/scope/Scope.js
var pkg = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
module.exports = {}
module.exports.default = pkg.Scope;
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "9259":
/*!******************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/styling/7.7.2/node_modules/@uifabric/styling/lib/styles/theme.js ***!
  \******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @uifabric/styling/styles/theme.js
var pkg = __webpack_require__(/*! @ms/uifabric-styling-bundle */ "fglE");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "93Rs":
/*!***************************************!*\
  !*** ./lib/BaseApplicationContext.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-component-base */ "7Awa");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _BaseApplication__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BaseApplication */ "n9Iz");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/Flights */ "w4+A");





/**
 * Context object for a client-side applications.
 *
 * @alpha
 */
var BaseApplicationContext = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BaseApplicationContext, _super);
    /** @internal */
    function BaseApplicationContext(parameters) {
        var _this = _super.call(this, parameters) || this;
        _this._disposed = false;
        _this._delayExtensionsLoading = false;
        _this._preloadedData = parameters.navigator.preloadedData;
        _this._navigator = parameters.navigator;
        _this._chrome = parameters.chrome;
        _this._loadType = parameters.loadType;
        _this._prefetchedDataEvent = new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["SPEvent"](_BaseApplication__WEBPACK_IMPORTED_MODULE_3__["default"]._prefetchedDataEventName);
        return _this;
    }
    /**
     * Diposes the application context
     */
    BaseApplicationContext.prototype.dispose = function () {
        if (this._disposed) {
            return;
        }
        if (this._navigator) {
            this._navigator = undefined;
        }
        if (this._chrome && !_common_Flights__WEBPACK_IMPORTED_MODULE_4__["Flights"].useNextGenSPA) {
            this._chrome.dispose();
        }
        _super.prototype.dispose.call(this);
        this._disposed = true;
    };
    /**
     * Sets the SuiteNav manager in the application context.
     */
    BaseApplicationContext.prototype.initializeSuiteNavManager = function (suiteNavManager) {
        this._suiteNavManager = suiteNavManager;
    };
    Object.defineProperty(BaseApplicationContext.prototype, "preloadedData", {
        /**
         * The preloaded data used by SPFx
         */
        get: function () { return this._preloadedData; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseApplicationContext.prototype, "navigator", {
        /**
         * The application navigator
         */
        get: function () { return this._navigator; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseApplicationContext.prototype, "chrome", {
        /**
         * The application page chrome
         */
        get: function () { return this._chrome; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseApplicationContext.prototype, "loadType", {
        /**
         * The application load type
         */
        get: function () { return this._loadType; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseApplicationContext.prototype, "prefetchedDataEvent", {
        /**
         * An event that gets fired when the application prefetched data is available.
         */
        get: function () { return this._prefetchedDataEvent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseApplicationContext.prototype, "suiteNavManager", {
        /**
         * The SuiteNav manager
         *
         * @remarks
         * The SuiteNav manager is defined only after the application starts rendering.
         * Chromeless application do not have a SuiteNav manager.
         */
        get: function () {
            return this._suiteNavManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseApplicationContext.prototype, "delayExtensionsLoading", {
        /**
         * Gets a value indicating whether or not extensions loading should be delayed.
         */
        get: function () { return this._delayExtensionsLoading; },
        /**
         * Sets a value to indicate whether or not extensions loading should be delayed.
         */
        set: function (delay) { this._delayExtensionsLoading = delay; },
        enumerable: true,
        configurable: true
    });
    return BaseApplicationContext;
}(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_1__["BaseComponentContext"]));
/* harmony default export */ __webpack_exports__["default"] = (BaseApplicationContext);


/***/ }),

/***/ "97Ok":
/*!*********************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/sp-resource-path/0.7.2/node_modules/@ms/sp-resource-path/lib-esm/index.js ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: SPResourcePath, SPResourcePathFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SPResourcePath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SPResourcePath */ "g/8y");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPResourcePath", function() { return _SPResourcePath__WEBPACK_IMPORTED_MODULE_0__["SPResourcePath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPResourcePathFormat", function() { return _SPResourcePath__WEBPACK_IMPORTED_MODULE_0__["SPResourcePathFormat"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "ApOT":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/providers/theming/ThemeUtilities.js ***!
  \*************************************************************************************************************************************************************************************************/
/*! exports provided: spLoadTheme, applySpThemeDefaults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spLoadTheme", function() { return spLoadTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applySpThemeDefaults", function() { return applySpThemeDefaults; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _uifabric_styling_lib_styles_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @uifabric/styling/lib/styles/theme */ "9259");
/* harmony import */ var _uifabric_styling_lib_styles_theme__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_uifabric_styling_lib_styles_theme__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_odsp_utilities_lib_features_Features__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/odsp-utilities/lib/features/Features */ "Y2fW");
/* harmony import */ var _ms_odsp_utilities_lib_features_Features__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_features_Features__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/odsp-utilities/lib/features/FeatureOverrides */ "6TYi");
/* harmony import */ var _ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _MDL2Theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MDL2Theme */ "IGvF");
/* harmony import */ var _FluentFeatures__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FluentFeatures */ "1/3F");






/**
 * A SharePoint wrapper for Fabric's loadTheme()
 * First merges the given theme with SharePoint's default theme before calling Fabric's loadTheme().
 */
function spLoadTheme(theme, pageContext) {
    return Object(_uifabric_styling_lib_styles_theme__WEBPACK_IMPORTED_MODULE_1__["loadTheme"])(applySpThemeDefaults(theme, pageContext));
}
/**
 * Merges the given theme on top of the default SharePoint theme.
 */
function applySpThemeDefaults(theme, pageContext) {
    // todo: this logic should move to sp-client masterpage
    pageContext && _ms_odsp_utilities_lib_features_Features__WEBPACK_IMPORTED_MODULE_2___default.a.initSPExpFeatures(pageContext.ExpFeatures);
    _ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_3___default.a.evaluateCanOverride();
    // Tealification
    if (_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_3___default.a.isFeatureEnabled({ ODB: _FluentFeatures__WEBPACK_IMPORTED_MODULE_5__["isOneDrive"] ? -1546 : 1546 /* TealifySP */, ODC: null, Fallback: false })) {
        var tealTheme = {
            palette: {
                themePrimary: "#03787c",
                themeLighterAlt: "#f0f9fa",
                themeLighter: "#c5e9ea",
                themeLight: "#98d6d8",
                themeTertiary: "#49aeb1",
                themeSecondary: "#13898d",
                themeDarkAlt: "#026d70",
                themeDark: "#025c5f",
                themeDarker: "#014446"
            }
        };
        theme = mergeThemes(tealTheme, theme);
    }
    // Fluent effects: applies shadows and rounded corner changes
    if (!_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_3___default.a.isFeatureEnabled(_FluentFeatures__WEBPACK_IMPORTED_MODULE_5__["EnableFluentTheme"]) &&
        !_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_3___default.a.isFeatureEnabled(_FluentFeatures__WEBPACK_IMPORTED_MODULE_5__["EnableFluentStyling"]) &&
        !_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_3___default.a.isFeatureEnabled(_FluentFeatures__WEBPACK_IMPORTED_MODULE_5__["EnableFluentStylingODC"])) {
        theme = mergeThemes({ effects: _MDL2Theme__WEBPACK_IMPORTED_MODULE_4__["MDL2Effects"] }, theme);
    }
    // Fluent font styles
    if (!_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_3___default.a.isFeatureEnabled(_FluentFeatures__WEBPACK_IMPORTED_MODULE_5__["EnableFluentTheme"]) &&
        !_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_3___default.a.isFeatureEnabled(_FluentFeatures__WEBPACK_IMPORTED_MODULE_5__["EnableFluentStyling"]) &&
        !_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_3___default.a.isFeatureEnabled(_FluentFeatures__WEBPACK_IMPORTED_MODULE_5__["EnableFluentStylingODC"])) {
        theme = mergeThemes({ fonts: _MDL2Theme__WEBPACK_IMPORTED_MODULE_4__["MDL2FontStyles"] }, theme);
    }
    // Fluent neutral palette:
    // If flight is on and the original neutral palette is being used, override with Fluent grays.
    // This is done in a separate flight so that we can test in dogfood/MSIT, but it may not
    //   go out to prod, because this is technically overriding (but not overwriting) customer data.
    // todo: decide whether this ships to prod
    // (This overrides more then just the neutral palette, but also some invariant colors.)
    if (!_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_3___default.a.isFeatureEnabled(_FluentFeatures__WEBPACK_IMPORTED_MODULE_5__["FluentGrays"]) &&
        !_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_3___default.a.isFeatureEnabled(_FluentFeatures__WEBPACK_IMPORTED_MODULE_5__["EnableFluentStyling"]) &&
        !_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_3___default.a.isFeatureEnabled(_FluentFeatures__WEBPACK_IMPORTED_MODULE_5__["EnableFluentStylingODC"])) {
        var p = theme.palette;
        // if there is no palette defined, or if the palette matches the default one
        if (!p ||
            (!p.black && !p.neutralPrimary && !p.white && !p.neutralQuaternary) ||
            (p.black && p.white && p.neutralPrimary && p.neutralQuaternary
                && p.black.indexOf('#000') === 0
                && p.white.toLowerCase().indexOf('#fff') === 0
                && p.neutralPrimary.indexOf('#333') === 0
                && p.neutralQuaternary.toLowerCase().indexOf('#d0d0d0') === 0)) {
            theme.palette = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, theme.palette, _MDL2Theme__WEBPACK_IMPORTED_MODULE_4__["MDL2Palette"]);
        }
    }
    return theme;
}
/**
 * Does the minimum (for SharePoint) to merge two partial Fabric themes
 */
function mergeThemes(originalTheme, themeOverrides) {
    originalTheme = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, originalTheme, themeOverrides, { effects: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, originalTheme.effects, themeOverrides.effects), 
        // not technically correct because there are many sub-objects, but SP doesn't care
        fonts: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, originalTheme.fonts, themeOverrides.fonts), palette: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, originalTheme.palette, themeOverrides.palette) });
    return originalTheme;
}
//# sourceMappingURL=ThemeUtilities.js.map

/***/ }),

/***/ "Cc0y":
/*!***************************************!*\
  !*** ./lib/SPApplicationBase.resx.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_tZTEjqMO7pBJoQSOs5iS2g';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "Crvl":
/*!*********************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/telemetry-manager/0.12.6/node_modules/@ms/telemetry-manager/lib/events/Trace.event.js ***!
  \*********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OneDrive:IgnoreCodeCoverage
Object.defineProperty(exports, "__esModule", { value: true });
var SingleEventBase_1 = __webpack_require__(/*! ../SingleEventBase */ "8WDM");
exports.Trace = SingleEventBase_1.createSingleEvent({
    eventName: 'Trace,',
    shortEventName: 'Trace',
    requiresParent: false
}, {
    message: 1 /* String */
});
//# sourceMappingURL=Trace.event.js.map

/***/ }),

/***/ "Cs6k":
/*!**********************************************************!*\
  !*** ./lib/extensibility/placeholder/PlaceholderName.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * The identifier for a content placeholder, which is a region on the
 * page where third-party extensibility components can render custom content.
 *
 * @remarks
 * For more information about placeholders, see {@link PlaceholderProvider}.
 *
 * @public
 */
var PlaceholderName;
(function (PlaceholderName) {
    /**
     * A region at the top of the page.
     * @privateRemarks
     * Used by Modern pages and Lists and libraries
     */
    PlaceholderName[PlaceholderName["Top"] = 1] = "Top";
    /**
     * A region at the bottom of the page.
     * @privateRemarks
     * Used by Modern pages and Lists and libraries
     */
    PlaceholderName[PlaceholderName["Bottom"] = 2] = "Bottom";
})(PlaceholderName || (PlaceholderName = {}));
/* harmony default export */ __webpack_exports__["default"] = (PlaceholderName);


/***/ }),

/***/ "DAYU":
/*!*********************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/logging/PairedEventBase.js ***!
  \*********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OneDrive:CoverageThreshold(75)
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tCkv");
tslib_1.__exportStar(__webpack_require__(/*! @ms/telemetry-manager/lib/PairedEventBase */ "xPj7"), exports);
//# sourceMappingURL=PairedEventBase.js.map

/***/ }),

/***/ "DXcd":
/*!*************************************************************!*\
  !*** ./lib/extensibility/placeholder/PlaceholderContent.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Represents custom content that is rendered inside a placeholder on a SharePoint page.
 *
 * @remarks
 * This object is returned by {@link PlaceholderProvider.tryCreateContent}.
 * It provides access to a Document Object Model (DOM) element where the owner can render
 * its custom content.
 *
 * @public
 */
var PlaceholderContent = /** @class */ (function () {
    /**
     * @internal
     */
    function PlaceholderContent(parameters) {
        this._disposeHandler = undefined;
        this._isDisposed = false;
        this._placeholder = parameters.placeholder;
        this._disposeHandler = parameters.options ? parameters.options.onDispose : undefined;
        this._domElement = parameters.domElement;
    }
    Object.defineProperty(PlaceholderContent.prototype, "name", {
        /**
         * Identifies the placeholder that this content was added to.
         *
         * @remarks
         * Example: PlaceholderName.Top
         */
        get: function () {
            return this._placeholder.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceholderContent.prototype, "domElement", {
        /**
         * The Document Object Model (DOM) element where the owner should render its custom content.
         *
         * @remarks
         * If the caller needs to be notified when the DOM element is disposed, use
         * the {@link IPlaceholderCreateContentOptions.onDispose} callback.
         */
        get: function () {
            return this._domElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the placeholder of the content. This is used when the placeholders are modifying and the content may
     * hang from a new placeholder object.
     * @param placeholder - Placeholder that own this placeholder content.
     *
     * @internal
     */
    PlaceholderContent.prototype._setPlaceholder = function (placeholder) {
        this._placeholder = placeholder;
    };
    /**
     * Sets the options of the content. This is used when a bottom or top preAllocatedContent is created.
     * @param options - Options that own this placeholder content.
     *
     * @internal
     */
    PlaceholderContent.prototype._setOptions = function (options) {
        this._disposeHandler = options && options.onDispose;
    };
    /**
     * Disposes the PlaceholderContent object and removes its attached DOM element from the page.
     *
     * @remarks
     * This method can be called to immediately dispose the attached DOM element. Otherwise, it
     * will be disposed by the application when the containing placeholder is disposed. Calling dispose()
     * invokes the {@link IPlaceholderCreateContentOptions.onDispose} callback, removes the associated
     * DOM element from the page, and disposes the PlaceholderContent object.
     */
    PlaceholderContent.prototype.dispose = function () {
        if (!this._isDisposed) {
            if (this._disposeHandler) {
                try {
                    this._disposeHandler(this);
                }
                catch (error) {
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(PlaceholderContent._logSource, new Error("The onDispose API threw an exception for placeholder '" + this._placeholder.name + "'. Error information is '" + error.message + "'")); // tslint:disable-line:max-line-length
                }
            }
            this._placeholder.removePlaceholderContent(this);
            delete this._domElement;
            delete this._placeholder;
            delete this._disposeHandler;
        }
        this._isDisposed = true;
    };
    Object.defineProperty(PlaceholderContent.prototype, "isDisposed", {
        get: function () {
            return this._isDisposed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceholderContent.prototype, "isVisible", {
        /**
         * Return true if this PlacholderContent object is visible.  If you create a placeholder
         * and the host page isn't displaying it, this will return false.
         */
        get: function () {
            return document.body.contains(this._domElement);
        },
        enumerable: true,
        configurable: true
    });
    PlaceholderContent._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogSource"].create('Placeholder');
    return PlaceholderContent;
}());
/* harmony default export */ __webpack_exports__["default"] = (PlaceholderContent);


/***/ }),

/***/ "DYAW":
/*!***********************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/uri/SimpleUri.js ***!
  \***********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sp_resource_path_1 = __webpack_require__(/*! @ms/sp-resource-path */ "97Ok");
exports.SimpleUri = sp_resource_path_1.SPResourcePath;
exports.UriFormat = sp_resource_path_1.SPResourcePathFormat;
exports.default = sp_resource_path_1.SPResourcePath;
//# sourceMappingURL=SimpleUri.js.map

/***/ }),

/***/ "FO0h":
/*!****************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/utilities-objects/0.10.2/node_modules/@ms/utilities-objects/lib/safeSerialize.js ***!
  \****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is a function you can call to safely serialize anything to JSON.
 * The built-in JSON.stringify() throws an exception for circular references and can't handle
 * many built-ins such as HTMLElements and the global window object.
 */
function safeSerialize(obj) {
    var str;
    try {
        var seenObjects_1 = [];
        str = JSON.stringify(obj, function (key, value) {
            if (value === window) {
                return '[window]';
            }
            else if (value instanceof HTMLElement) {
                return '[HTMLElement]';
            }
            else if (typeof value === 'function') {
                return '[function]';
            }
            else if (typeof value === 'object') {
                if (value === null) {
                    return value;
                }
                else if (seenObjects_1.indexOf(value) === -1) {
                    seenObjects_1.push(value);
                    return value;
                }
                else {
                    return '[circular]';
                }
            }
            else {
                return value;
            }
        });
    }
    catch (err) {
        // Note: we make this be a JSON string, so that consumers
        // can always call JSON.parse.
        str = JSON.stringify('[object]');
    }
    return str;
}
exports.safeSerialize = safeSerialize;
//# sourceMappingURL=safeSerialize.js.map

/***/ }),

/***/ "FkRh":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/GroupedList.styles.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: GroupHeaderStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupHeaderStyles", function() { return GroupHeaderStyles; });
/* harmony import */ var office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! office-ui-fabric-react/lib/Styling */ "xS3b");

var GroupHeaderStyles = function (props) {
    var compact = props.compact, theme = props.theme;
    var fonts = theme.fonts;
    var finalHeight = compact ? 32 : 42;
    return {
        groupHeaderContainer: {
            height: finalHeight
        },
        check: {
            height: finalHeight
        },
        expand: {
            height: finalHeight,
            fontSize: compact ? fonts.medium.fontSize : 18
        },
        title: {
            fontSize: compact ? fonts.large.fontSize : fonts.xLarge.fontSize,
            fontWeight: office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].semilight
        }
    };
};
//# sourceMappingURL=GroupedList.styles.js.map

/***/ }),

/***/ "FmHR":
/*!************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/utilities-guid/0.8.3/node_modules/@ms/utilities-guid/lib/Guid.js ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:no-bitwise
Object.defineProperty(exports, "__esModule", { value: true });
function generateUuidPart(length) {
    var str = '';
    while (str.length < length) {
        var num = Math.random() * 16;
        num = num | 0; // clear decimal
        str += num.toString(16);
    }
    return str;
}
/**
 * @public
 */
exports.Empty = '00000000-0000-0000-0000-000000000000';
/**
 * Return a v4 UUID as specified by RFC 4122 http://tools.ietf.org/html/rfc4122
 *
 * @public
 */
function generate() {
    var parts = [];
    parts.push(generateUuidPart(8));
    parts.push(generateUuidPart(4));
    // first digit must be 4 since we are using pseudorandom numbers
    var timeHighAndVersion = '4' + generateUuidPart(3);
    parts.push(timeHighAndVersion);
    // first digit must have first two bits set to 10
    var clockSeqHiAndReserved = generateUuidPart(4);
    // ClockSeqHiAndReserved is a base-16 string.
    var intVal = parseInt(clockSeqHiAndReserved[0], 16);
    intVal = intVal & 3; // clear out first two bits
    intVal = intVal | 8; // set first bit to 1
    clockSeqHiAndReserved = intVal.toString(16) + clockSeqHiAndReserved.substr(1);
    parts.push(clockSeqHiAndReserved);
    parts.push(generateUuidPart(12));
    return parts.join('-');
}
exports.generate = generate;
/**
 * Normalizes a GUID to lowercase. Returns '' if guid is not given.
 * @param includeBrackets - if true, add or keep brackets; if false, strip brackets
 *
 * @public
 */
function normalizeLower(guid, includeBrackets) {
    if (includeBrackets === void 0) { includeBrackets = false; }
    return guid ? _normalizeBrackets(guid.toLowerCase(), includeBrackets) : '';
}
exports.normalizeLower = normalizeLower;
/**
 * Normalizes a GUID to uppercase. Returns '' if guid is not given.
 * @param includeBrackets - if true, add or keep brackets; if false, strip brackets
 *
 * @public
 */
function normalizeUpper(guid, includeBrackets) {
    if (includeBrackets === void 0) { includeBrackets = false; }
    return guid ? _normalizeBrackets(guid.toUpperCase(), includeBrackets) : '';
}
exports.normalizeUpper = normalizeUpper;
/**
 * Normalizes the dashes in a GUID. Returns '' if the input is null, undefined, or does not contain
 * 32 hexadecimal characters.
 * @param guid - The GUID
 * @param includeBrackets - if true, output will contain brackets; if false, output will not
 *
 * @public
 */
function normalizeDashes(guid, includeBrackets) {
    if (includeBrackets === void 0) { includeBrackets = false; }
    if (guid) {
        var parsed = guid.replace(/[^A-Fa-f0-9]/g, '');
        if (parsed.length === 32) {
            return _normalizeBrackets(parsed.slice(0, 8) + "-" + parsed.slice(8, 12) + "-" + parsed.slice(12, 16) + "-" + parsed.slice(16, 20) + "-" + parsed.slice(20), includeBrackets);
        }
    }
    return '';
}
exports.normalizeDashes = normalizeDashes;
function _normalizeBrackets(guid, includeBrackets) {
    var match = guid.match(/^\{(.*)\}$/);
    if (match) {
        return includeBrackets ? match[0] : match[1];
    }
    return includeBrackets ? '{' + guid + '}' : guid;
}
//# sourceMappingURL=Guid.js.map

/***/ }),

/***/ "G61I":
/*!***************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/telemetry-manager/0.12.6/node_modules/@ms/telemetry-manager/lib/events/CaughtError.event.js ***!
  \***************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OneDrive:IgnoreCodeCoverage
Object.defineProperty(exports, "__esModule", { value: true });
var SingleEventBase_1 = __webpack_require__(/*! ../SingleEventBase */ "8WDM");
var Trace_event_1 = __webpack_require__(/*! ./Trace.event */ "Crvl");
exports.CaughtError = SingleEventBase_1.createSingleEvent({
    eventName: 'CaughtError,Trace,',
    shortEventName: 'CaughtError',
    critical: true,
    requiresParent: false
}, {
    stack: 1 /* String */,
    extraData: 4 /* Object */
}, Trace_event_1.Trace);
//# sourceMappingURL=CaughtError.event.js.map

/***/ }),

/***/ "G7sL":
/*!******************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/encoding/UriEncoding.js ***!
  \******************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @ms/odsp-utilities/encoding/UriEncoding.js
var pkg = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
module.exports = {}
module.exports.default = pkg.UriEncoding;
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "Gnpm":
/*!***********************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/utilities-objects/0.10.2/node_modules/@ms/utilities-objects/lib/deepCopy.js ***!
  \***********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a copy of the specified object by deeply cloning all of its properties.
 */
function deepCopy(object) {
    var refsCopied = [];
    function copyRecurse(obj) {
        var result = null;
        if (obj) {
            if (Array.isArray(obj)) {
                // @ts-ignore
                result = [];
            }
            else {
                // create clone of the object with same prototype chain
                result = Object.create(Object.getPrototypeOf(obj));
            }
            // iterate over all the properties in the object
            Object.keys(obj).forEach(function (key) {
                // recursively copy the object's properties if the property is an object
                var value = obj[key];
                if (typeof value === 'object') {
                    // @ts-ignore
                    if (refsCopied.indexOf(value) !== -1) {
                        throw new Error("Cannot perform DeepCopy() because a circular reference was encountered, object: " + obj + ", property: " + key);
                    }
                    // @ts-ignore
                    refsCopied.push(value);
                    // @ts-ignore
                    result[key] = copyRecurse(value);
                    refsCopied.pop();
                }
                else {
                    // @ts-ignore
                    result[key] = value;
                }
            });
        }
        return result;
    }
    return copyRecurse(object);
}
exports.deepCopy = deepCopy;
//# sourceMappingURL=deepCopy.js.map

/***/ }),

/***/ "Gr/1":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/TextField.styles.js ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: TextFieldStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextFieldStyles", function() { return TextFieldStyles; });
var TextFieldStyles = function (props) {
    var multiline = props.multiline;
    return {
        field: {
            padding: !multiline ? '0 12px' : '6px 8px'
        }
    };
};
//# sourceMappingURL=TextField.styles.js.map

/***/ }),

/***/ "H2L0":
/*!************************************************!*\
  !*** ./lib/pageChrome/SPPageChrome.module.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./SPPageChrome.module.css */ "VkOs");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "H4yp":
/*!*******************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/theming/ThemeProvider.js ***!
  \*******************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OneDrive:IgnoreCodeCoverage
Object.defineProperty(exports, "__esModule", { value: true });
var RgbaColor_1 = __webpack_require__(/*! ./RgbaColor */ "w/WL");
var ThemeCache_1 = __webpack_require__(/*! ./ThemeCache */ "pgz/");
var Promise_1 = __webpack_require__(/*! ../async/Promise */ "MS/P");
var Engagement_event_1 = __webpack_require__(/*! ../logging/events/Engagement.event */ "yEhF");
var Qos_event_1 = __webpack_require__(/*! ../logging/events/Qos.event */ "/TBc");
/**
 * Provides theme data, either from the local cache or from the server.
 */
var ThemeProvider = /** @class */ (function () {
    /**
     * Constructs a ThemeProvider which acts like the provided loadData function but with caching.
     * @param {() => Promise<IThemeData>} loadData Used to load data on a cache miss.
     */
    function ThemeProvider(loadData) {
        this._loadData = loadData;
    }
    ThemeProvider.getBackgroundUrl = function (data) {
        if (data) {
            return ThemeProvider._makeCssUrl(data.backgroundImageUri);
        }
        else {
            return 'none';
        }
    };
    /**
     * Given a URL, returns a string value which can be safely used as a
     * background-image value in a CSS rule. If the url is falsey, this
     * returns "none" to specify no background-image.
     * @param {string} url The URL of a background image.
     */
    ThemeProvider._makeCssUrl = function (url) {
        var cssUrlValue = "none";
        if (url) {
            cssUrlValue = 'url("' +
                ThemeProvider._escapeQuotesAndParentheses(url) +
                '")';
        }
        return cssUrlValue;
    };
    /**
     * Escapes single- and double-quotes along with parentheses so that the
     * resulting string is safe to use in a CSS background-image: url()
     * @param {string} str The string to escape.
     */
    ThemeProvider._escapeQuotesAndParentheses = function (str) {
        var replacements = { "'": "%27", '"': "%22", "(": "%28", ")": "%29" };
        var result = null;
        if (str != null) {
            result = str.replace(/(['"\(\)])/gm, function (match, capture) {
                return replacements[capture];
            });
        }
        return result;
    };
    /**
     * Loads the theme data and returns a map from theme tokens to replacement values.
     * Suitable for use with loadTheme in load-themed-styles.
     * @param {string} cacheToken Cache token used to validate cached data.
     * @param {boolean} forceUpdate Whether to force fresh data to be loaded and cached.
     */
    ThemeProvider.prototype.loadThemeTokenMap = function (cacheToken, forceUpdate) {
        return this.loadThemeData(cacheToken, forceUpdate).then(function (themeData) {
            var themeValues;
            if (themeData && themeData.palette) {
                themeValues = {};
                var palette = themeData.palette;
                for (var colorSlot in palette) {
                    var rgbaValue = palette[colorSlot];
                    themeValues[colorSlot] = rgbaValue ? RgbaColor_1.default.toHtmlString(rgbaValue) : null;
                }
                themeValues["backgroundImageUri"] =
                    ThemeProvider._makeCssUrl(themeData.backgroundImageUri);
            }
            return themeValues;
        }, function (error) { return null; }); // on error, return null
    };
    /**
     * Loads the theme data from the cache or via the a loadData method.
     * @param {string} cacheToken Cache token used to validate cached data.
     * @param {boolean} forceUpdate Whether to force fresh data to be loaded and cached.
     */
    ThemeProvider.prototype.loadThemeData = function (cacheToken, forceUpdate) {
        if (!forceUpdate && this._dataPromise) {
            return this._dataPromise;
        }
        var _this = this;
        var failureResultCode = null;
        var failureResultType = Qos_event_1.ResultTypeEnum.Failure;
        this._dataPromise = Qos_event_1.Qos.instrumentPromise(
        /*startSchema*/ { name: "ThemeProvider.LoadData" }, 
        /*createPromise*/ function () { return new Promise_1.default(function loadDataOnExecute(complete, error) {
            var previousData = null;
            if (!forceUpdate) {
                // Checks if we have valid cached data before returning it.
                previousData = ThemeCache_1.default.getCachedTheme(cacheToken);
            }
            // If we have previous data and an update is not forced, use that data.
            if (previousData) {
                Engagement_event_1.Engagement.logData({ name: "ThemeProvider.DataFromCache" });
                complete(previousData);
            }
            else {
                if (forceUpdate) {
                    Engagement_event_1.Engagement.logData({ name: "ThemeProvider.ForceUpdateData" });
                }
                Engagement_event_1.Engagement.logData({ name: "ThemeProvider.DataFromServer" });
                // Get updated data. Might result in a server call.
                _this._loadData(forceUpdate).done(function onComplete(themeData) {
                    if (themeData) {
                        if (themeData.cacheToken) {
                            ThemeCache_1.default.updateThemeCache(themeData, cacheToken);
                        }
                        complete(themeData);
                    }
                    else {
                        failureResultCode = "NoData";
                        if (error) {
                            error("No model returned");
                        }
                    }
                }, function onError(err) {
                    if (Promise_1.default.isCanceled(error)) {
                        failureResultCode = "Canceled";
                        failureResultType = Qos_event_1.ResultTypeEnum.ExpectedFailure;
                    }
                    else {
                        failureResultCode = "ServerLoadFailure";
                    }
                    if (error) {
                        error(err);
                    }
                });
            }
        }); }, 
        /*getCompleteSchema*/ null, 
        /*getErrorSchema*/ function getErrorSchema(error) {
            if (Promise_1.default.isCanceled(error)) {
                failureResultType = Qos_event_1.ResultTypeEnum.ExpectedFailure;
                failureResultCode = "Canceled";
            }
            return {
                resultType: failureResultType,
                resultCode: failureResultCode || "Other",
                error: error
            };
        });
        return this._dataPromise;
    };
    return ThemeProvider;
}());
exports.default = ThemeProvider;
//# sourceMappingURL=ThemeProvider.js.map

/***/ }),

/***/ "H6KY":
/*!*************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/logging/rumone/RUMOneLogger.js ***!
  \*************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @ms/odsp-utilities/logging/rumone/RUMOneLogger.js
var pkg = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
module.exports = {}
module.exports.default = pkg.RumOneLogger;
module.exports.RUMOneLogger = pkg.RumOneLogger;
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "HYQE":
/*!************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/theming/Shades.js ***!
  \************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RgbaColor_1 = __webpack_require__(/*! ./RgbaColor */ "w/WL");
var WhiteShadeTable = [0.537, 0.349, 0.216, 0.184, 0.145, 0.082, 0.043, 0.027]; // white fg
var BlackTintTable = [0.537, 0.45, 0.349, 0.216, 0.184, 0.145, 0.082, 0.043]; // black fg
var LumTintTable = [0.88, 0.77, 0.66, 0.55, 0.44, 0.33, 0.22, 0.11]; // light (strongen all)
var LumShadeTable = [0.11, 0.22, 0.33, 0.44, 0.55, 0.66, 0.77, 0.88]; // dark (soften all)
var ColorTintTable = [0.96, 0.84, 0.7, 0.4, 0.12]; // default soften
var ColorShadeTable = [0.1, 0.24, 0.44]; // default strongen
// If the given shade's luminance is below/above these values, we'll swap to using the White/Black tables above
var LowLuminanceThreshold = 0.2;
var HighLuminanceThreshold = 0.8;
/** Shades of a given color, from softest to strongest. */
var Shade;
(function (Shade) {
    Shade[Shade["Unshaded"] = 0] = "Unshaded";
    Shade[Shade["Shade1"] = 1] = "Shade1";
    Shade[Shade["Shade2"] = 2] = "Shade2";
    Shade[Shade["Shade3"] = 3] = "Shade3";
    Shade[Shade["Shade4"] = 4] = "Shade4";
    Shade[Shade["Shade5"] = 5] = "Shade5";
    Shade[Shade["Shade6"] = 6] = "Shade6";
    Shade[Shade["Shade7"] = 7] = "Shade7";
    Shade[Shade["Shade8"] = 8] = "Shade8";
    // remember to update isValidShade()!
})(Shade = exports.Shade || (exports.Shade = {}));
/**
 * Returns true if the argument is a valid Shade value
 * @param {Shade} shade The Shade value to validate.
 */
function isValidShade(shade) {
    return typeof shade === 'number' && shade >= Shade.Unshaded && shade <= Shade.Shade8;
}
exports.isValidShade = isValidShade;
function _isBlack(color) {
    return color.R === 0 && color.G === 0 && color.B === 0;
}
function _isWhite(color) {
    return color.R === 255 && color.G === 255 && color.B === 255;
}
function _darken(hsv, factor) {
    return {
        h: hsv.h,
        s: hsv.s,
        v: hsv.v - hsv.v * factor
    };
}
function _lighten(hsv, factor) {
    return {
        h: hsv.h,
        s: hsv.s - hsv.s * factor,
        v: hsv.v + (100 - hsv.v) * factor
    };
}
/**
 * Given a color and a shade specification, generates the requested shade of the color.
 * Logic:
 * if white
 *  darken via tables defined above
 * if black
 *  lighten
 * if light
 *  strongen
 * if dark
 *  soften
 * else default
 *  soften or strongen depending on shade#
 * @param {IColor} color The base color whose shade is to be computed
 * @param {Shade} shade The shade of the base color to compute
 * @param {Boolean} isInverted Default false. Whether the given theme is inverted (reverse strongen/soften logic)
 */
function getShade(color, shade, isInverted) {
    if (!color || shade === Shade.Unshaded || !isValidShade(shade)) {
        return color;
    }
    var _soften = _lighten;
    var _strongen = _darken;
    if (isInverted) {
        _soften = _darken;
        _strongen = _lighten;
    }
    var hsv = rgb2hsv(color);
    var hsl = hsv2hsl(hsv);
    var tableIndex = shade - 1;
    if (_isWhite(color)) { // white
        hsv = _darken(hsv, WhiteShadeTable[tableIndex]);
    }
    else if (_isBlack(color)) { // black
        hsv = _lighten(hsv, BlackTintTable[tableIndex]);
    }
    else if (hsl.l / 100 > HighLuminanceThreshold) { // light
        hsv = _strongen(hsv, LumShadeTable[tableIndex]);
    }
    else if (hsl.l / 100 < LowLuminanceThreshold) { // dark
        hsv = _soften(hsv, LumTintTable[tableIndex]);
    }
    else { // default
        if (tableIndex < ColorTintTable.length) {
            hsv = _soften(hsv, ColorTintTable[tableIndex]);
        }
        else {
            hsv = _strongen(hsv, ColorShadeTable[tableIndex - ColorTintTable.length]);
        }
    }
    return hsv2rgb(hsv);
}
exports.getShade = getShade;
function rgb2hsv(rgb) {
    var h = NaN;
    var s;
    var v;
    var R = rgb.R, G = rgb.G, B = rgb.B;
    var max = Math.max(R, G, B);
    var min = Math.min(R, G, B);
    var delta = max - min;
    // hue
    if (delta === 0) {
        h = 0;
    }
    else if (R === max) {
        h = ((G - B) / delta) % 6;
    }
    else if (G === max) {
        h = (B - R) / delta + 2;
    }
    else if (B === max) {
        h = (R - G) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) {
        h += 360;
    }
    s = Math.round((max === 0 ? 0 : delta / max) * 100);
    v = Math.round((max / 255) * 100);
    return { h: h, s: s, v: v };
}
function hsv2hsl(hsv) {
    var h = hsv.h, s = hsv.s, v = hsv.v;
    s /= 100;
    v /= 100;
    var l = (2 - s) * v;
    var sl = s * v;
    sl /= l <= 1 ? l : 2 - l;
    sl = sl || 0;
    l /= 2;
    return { h: h, s: sl * 100, l: l * 100 };
}
function hsv2rgb(hsv) {
    var h = hsv.h, s = hsv.s, v = hsv.v;
    s = s / 100;
    v = v / 100;
    var rgb = [];
    var c = v * s;
    var hh = h / 60;
    var x = c * (1 - Math.abs((hh % 2) - 1));
    var m = v - c;
    switch (Math.floor(hh)) {
        case 0:
            rgb = [c, x, 0];
            break;
        case 1:
            rgb = [x, c, 0];
            break;
        case 2:
            rgb = [0, c, x];
            break;
        case 3:
            rgb = [0, x, c];
            break;
        case 4:
            rgb = [x, 0, c];
            break;
        case 5:
            rgb = [c, 0, x];
            break;
    }
    return RgbaColor_1.default.fromRgba(Math.round(255 * (rgb[0] + m)), Math.round(255 * (rgb[1] + m)), Math.round(255 * (rgb[2] + m)));
}
//# sourceMappingURL=Shades.js.map

/***/ }),

/***/ "I6O9":
/*!***************************************!*\
  !*** external "@microsoft/sp-loader" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_I6O9__;

/***/ }),

/***/ "IGvF":
/*!********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/providers/theming/MDL2Theme.js ***!
  \********************************************************************************************************************************************************************************************/
/*! exports provided: MDL2Palette, MDL2Effects, MDL2FontStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDL2Palette", function() { return MDL2Palette; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDL2Effects", function() { return MDL2Effects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDL2FontStyles", function() { return MDL2FontStyles; });
var MDL2Palette = {
    neutralDark: '#212121',
    neutralPrimary: '#333333',
    neutralPrimaryAlt: '#3c3c3c',
    neutralSecondary: '#666666',
    neutralSecondaryAlt: '#767676',
    neutralTertiary: '#a6a6a6',
    neutralTertiaryAlt: '#c8c8c8',
    neutralQuaternary: '#d0d0d0',
    neutralQuaternaryAlt: '#dadada',
    neutralLight: '#eaeaea',
    neutralLighter: '#f4f4f4',
    neutralLighterAlt: '#f8f8f8',
    // Shared Colors
    red: '#e81123',
    redDark: '#a80000'
};
var MDL2Effects = {
    elevation4: '0 0 5px 0 rgba(0,0,0,.4)',
    elevation8: '0 0 5px 0 rgba(0,0,0,.4)',
    elevation16: '0 0 5px 0 rgba(0,0,0,.4)',
    elevation64: '0 0 5px 0 rgba(0,0,0,.4)',
    roundedCorner2: '0px'
};
var MDL2FontStyles = {
    tiny: {
        fontSize: 10,
        fontWeight: 600
    },
    xSmall: {
        fontSize: 11,
        fontWeight: 400
    },
    small: {
        fontSize: 12,
        fontWeight: 400
    },
    smallPlus: {
        fontSize: 13,
        fontWeight: 400
    },
    medium: {
        fontSize: 14,
        fontWeight: 400
    },
    mediumPlus: {
        fontSize: 15,
        fontWeight: 400
    },
    large: {
        fontSize: 17,
        fontWeight: 300
    },
    xLarge: {
        fontSize: 21,
        fontWeight: 100
    },
    xLargePlus: {
        fontSize: 21,
        fontWeight: 100
    },
    xxLarge: {
        fontSize: 28,
        fontWeight: 100
    },
    xxLargePlus: {
        fontSize: 28,
        fontWeight: 100
    },
    superLarge: {
        fontSize: 42,
        fontWeight: 100
    },
    mega: {
        fontSize: 72,
        fontWeight: 100
    }
};
//# sourceMappingURL=MDL2Theme.js.map

/***/ }),

/***/ "IPei":
/*!******************************************************************!*\
  !*** ./lib/extensibility/ApplicationCustomizerContextFactory.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ApplicationCustomizerContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ApplicationCustomizerContext */ "L9BA");
/* harmony import */ var _customAction_CustomActionLocations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./customAction/CustomActionLocations */ "4QmI");




var ApplicationCustomizerContextFactory = /** @class */ (function () {
    function ApplicationCustomizerContextFactory(serviceScope) {
        this.applicationCustomizerTopHeight = 'preAllocatedApplicationCustomizerTopHeight';
        this.applicationCustomizerBottomHeight = 'preAllocatedApplicationCustomizerBottomHeight';
        this._cache = {};
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(serviceScope, 'serviceScope');
        this._serviceScope = serviceScope;
    }
    ApplicationCustomizerContextFactory.prototype.initialize = function (customActions) {
        for (var _i = 0, customActions_1 = customActions; _i < customActions_1.length; _i++) {
            var customAction = customActions_1[_i];
            if (customAction.id) {
                var id = customAction.id.toString();
                if (id && customAction.location === _customAction_CustomActionLocations__WEBPACK_IMPORTED_MODULE_3__["default"].APPLICATION_CUSTOMIZER) {
                    if (!this._cache[id] || (this._cache[id] && this._cache[id].isDisposed)) {
                        this._cache[id] = this.createApplicationCustomizerContext(customAction);
                    }
                }
            }
        }
    };
    ApplicationCustomizerContextFactory.prototype.getApplicationCustomizerContext = function (customAction) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(customAction, 'customAction');
        if (customAction.id) {
            var id = customAction.id.toString();
            if (id) {
                if (this._cache[id] && !this._cache[id].isDisposed) {
                    return this._cache[id];
                }
                var appCustomizerContext = this.createApplicationCustomizerContext(customAction);
                this._cache[id] = appCustomizerContext;
                return appCustomizerContext;
            }
        }
        return this.createApplicationCustomizerContext(customAction);
    };
    ApplicationCustomizerContextFactory.prototype.clear = function () {
        this._cache = {};
    };
    ApplicationCustomizerContextFactory.prototype.createApplicationCustomizerContext = function (customAction, extensionContextParameters, includeAllParams) {
        if (extensionContextParameters === void 0) { extensionContextParameters = {}; }
        if (includeAllParams === void 0) { includeAllParams = true; }
        var componentId = customAction.clientSideComponentId.toString();
        var topHeight = 0;
        var bottomHeight = 0;
        if (customAction.hostProperties) {
            topHeight = parseInt(JSON.parse(customAction.hostProperties)[this.applicationCustomizerTopHeight], 10)
                || 0;
            bottomHeight = parseInt(JSON.parse(customAction.hostProperties)[this.applicationCustomizerBottomHeight], 10)
                || 0;
        }
        var applicationCustomizerContextParameters = {
            sequence: customAction.sequence !== undefined ? customAction.sequence : 65535,
            preAllocatedApplicationCustomizerTopHeight: topHeight,
            preAllocatedApplicationCustomizerBottomHeight: bottomHeight
        };
        var applicationCustomizerContext;
        if (includeAllParams) {
            var manifest = _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_1__["SPComponentLoader"].tryGetManifestById(componentId);
            if (!manifest) {
                var error = new Error("Custom action with component id \"" + componentId + "\" didn't have a manifest.");
                throw error;
            }
            var instanceId = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].newGuid().toString();
            var loggingTag = "Extension." + manifest.id + "." + instanceId;
            applicationCustomizerContext = new _ApplicationCustomizerContext__WEBPACK_IMPORTED_MODULE_2__["default"]({ manifest: manifest,
                parentServiceScope: this._serviceScope,
                instanceId: instanceId,
                loggingTag: loggingTag }, applicationCustomizerContextParameters);
        }
        else {
            applicationCustomizerContext = new _ApplicationCustomizerContext__WEBPACK_IMPORTED_MODULE_2__["default"](extensionContextParameters, applicationCustomizerContextParameters);
        }
        return applicationCustomizerContext;
    };
    return ApplicationCustomizerContextFactory;
}());
/* harmony default export */ __webpack_exports__["default"] = (ApplicationCustomizerContextFactory);


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

/***/ "J5U9":
/*!******************************************************************!*\
  !*** ./lib/extensibility/customAction/ClientSideCustomAction.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__);




/**
 * Client-side custom action.
 */
var ClientSideCustomAction = /** @class */ (function () {
    function ClientSideCustomAction() {
    }
    /**
     * Try to create a custom action from the preloaded custom action data. If there is a failure
     * to create the action, log an error and return undefined. We do not want to cause application
     * loading failures in case of custom action creation failures.
     *
     * @internal
     */
    ClientSideCustomAction._tryCreateFromPreloadedCustomAction = function (customAction) {
        var typedCustomAction = undefined;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('ClientSideCustomActions.CreateFromPreloadedCustomAction');
        try {
            typedCustomAction = new ClientSideCustomAction();
            var componentId = customAction.clientSideComponentId;
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(componentId, 'customAction.clientSideComponentId');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(customAction.location, 'customAction.location');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(componentId), 'customAction.clientSideComponentId as Guid');
            if (!_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["SPComponentLoader"].tryGetManifestById(componentId)) {
                var error = new Error("Custom action with component id \"" + componentId + "\" didn't have a manifest.");
                qosMonitor.writeUnexpectedFailure('ManifestNotFound', error, { customAction: componentId });
                throw error;
            }
            typedCustomAction.title = customAction.title;
            typedCustomAction.location = customAction.location;
            typedCustomAction.clientSideComponentId = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(componentId);
            typedCustomAction.clientSideComponentProperties = customAction.clientSideComponentProperties;
            typedCustomAction.registrationType = customAction.registrationType;
            typedCustomAction.registrationId = customAction.registrationId;
            typedCustomAction.sequence = customAction.sequence;
            typedCustomAction.hostProperties = customAction.hostProperties;
            typedCustomAction.requireSiteAdministrator = customAction.requireSiteAdministrator;
            typedCustomAction.id = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(customAction.id);
            var rights = customAction.rights;
            if (rights && rights.High !== undefined && rights.Low !== undefined) {
                typedCustomAction.rights = new _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__["SPPermission"](rights);
            }
            else {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(ClientSideCustomAction._logSource, "The rights object has invalid format. One of High or Low fields cannot be undefined. Object value is '" + JSON.stringify(rights)); // tslint:disable-line:max-line-length
            }
            qosMonitor.writeSuccess({
                customAction: typedCustomAction.tag
            });
            return typedCustomAction;
        }
        catch (error) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(ClientSideCustomAction._logSource, new Error("Failed to create client-side custom action. Error: " + error.message));
            qosMonitor.writeUnexpectedFailure('UnhandledCreateError', error, {
                customAction: customAction.clientSideComponentId
            });
            return undefined;
        }
    };
    /**
     * Try create custom action from query string debug data
     */
    ClientSideCustomAction._tryCreateFromDebugData = function (location, clientSideComponentId, clientSideComponentProperties, sequence, hostProperties) {
        try {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(clientSideComponentId, 'clientSideComponentId');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(location, 'location');
            var customAction = new ClientSideCustomAction();
            customAction.location = location;
            customAction.clientSideComponentId = clientSideComponentId;
            customAction.clientSideComponentProperties = clientSideComponentProperties;
            customAction.sequence = sequence;
            customAction.hostProperties = hostProperties;
            return customAction;
        }
        catch (error) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(ClientSideCustomAction._logSource, new Error("Failed to create client-side custom action. Error: " + error.message));
            return undefined;
        }
    };
    Object.defineProperty(ClientSideCustomAction.prototype, "tag", {
        /**
         * Returns a tag that should be used for logging and telemetry purposes.
         */
        get: function () {
            return this.location + "." + this.clientSideComponentId.toString();
        },
        enumerable: true,
        configurable: true
    });
    ClientSideCustomAction._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('ClientSideCustomAction');
    return ClientSideCustomAction;
}());
/* harmony default export */ __webpack_exports__["default"] = (ClientSideCustomAction);


/***/ }),

/***/ "JwFY":
/*!******************************************************!*\
  !*** ./lib/navigator/OnBeforeNavigationEventName.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
// Copyright (c) Microsoft. All rights reserved.


/**
 * Arguments for a pre in-place navigation event.
 *
 * @internal
 */
var OnBeforeNavigationEventName = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](OnBeforeNavigationEventName, _super);
    /**
     * Initializes a new instance of the OnBeforeNavigationEventName class
     * @param fromAppId - Component id of the application we're navigating from
     * @param toAppId - Component id of the application we're navigating to
     */
    function OnBeforeNavigationEventName(fromAppId, toAppId) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(fromAppId, 'fromAppId');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(toAppId, 'toAppId');
        _this = _super.call(this) || this;
        _this.fromAppId = fromAppId;
        _this.toAppId = toAppId;
        return _this;
    }
    return OnBeforeNavigationEventName;
}(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["SPEventArgs"]));
/* harmony default export */ __webpack_exports__["default"] = (OnBeforeNavigationEventName);


/***/ }),

/***/ "KdXK":
/*!****************************************!*\
  !*** ./lib/pageChrome/SPPageChrome.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/Flights */ "w4+A");
/* harmony import */ var _SPThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SPThemeProvider */ "6GSH");
/* harmony import */ var _error_SPGlobalErrorHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../error/SPGlobalErrorHandler */ "1/3/");
/* harmony import */ var _extensibility_DialogManagerConfiguration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../extensibility/DialogManagerConfiguration */ "7Cl3");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _SPPageChrome_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SPPageChrome.module.scss */ "LODL");








var SPPageChrome = /** @class */ (function () {
    function SPPageChrome(serviceScope, parentChrome) {
        this._isDisposed = false;
        this._masterChrome = parentChrome;
        this._createPageChrome();
        // The default configuration for dialog manager. This may be changed by the application later.
        // Note: This will not run if the application does not own the page chrome and hence must be called
        // by the application if they choose to use the dialog manager.
        _extensibility_DialogManagerConfiguration__WEBPACK_IMPORTED_MODULE_5__["default"].instance.initialize(this.dialogContainerDiv);
        this._spThemeProvider = new _SPThemeProvider__WEBPACK_IMPORTED_MODULE_3__["default"](serviceScope);
    }
    SPPageChrome.prototype.changeSuiteNavHeight = function (pixels) {
        var top = parseInt(pixels, 10) + 'px';
        this.suiteNavDiv.style.height = top;
    };
    Object.defineProperty(SPPageChrome.prototype, "themeProvider", {
        get: function () {
            return this._spThemeProvider;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Shows the page chrome in the current document.
     */
    SPPageChrome.prototype.show = function () {
        if (!this._isDisposed) {
            if (_common_Flights__WEBPACK_IMPORTED_MODULE_2__["Flights"].useNewChromeSequence()) {
                this._masterChrome.show();
                if (!_common_Flights__WEBPACK_IMPORTED_MODULE_2__["Flights"].useNextGenSPA) {
                    this._masterChrome.chromeDiv.appendChild(this.appAndPropertyPaneDiv);
                    this._masterChrome.chromeDiv.appendChild(this.dialogContainerDiv);
                }
            }
            else {
                document.body.appendChild(this._chromeDiv);
            }
        }
    };
    /**
     * Hides the page chrome in the current document.
     */
    SPPageChrome.prototype.hide = function () {
        if (!this._isDisposed) {
            if (_common_Flights__WEBPACK_IMPORTED_MODULE_2__["Flights"].useNewChromeSequence()) {
                if (!_common_Flights__WEBPACK_IMPORTED_MODULE_2__["Flights"].useNextGenSPA) {
                    this.appAndPropertyPaneDiv = this._masterChrome.chromeDiv.removeChild(this.appAndPropertyPaneDiv);
                    this.dialogContainerDiv = this._masterChrome.chromeDiv.removeChild(this.dialogContainerDiv);
                }
            }
            else {
                this._chromeDiv = document.body.removeChild(this._chromeDiv);
            }
        }
    };
    /**
     * Disposes the Chrome
     */
    SPPageChrome.prototype.dispose = function () {
        if (_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_1__["_SPLoaderFlights"]._useNewBootSequence() && !this._isDisposed) {
            delete this.appDiv;
            delete this.propertyPaneContainerDiv;
            if (this.appAndPropertyPaneDiv) {
                delete this.appAndPropertyPaneDiv;
            }
            delete this.dialogContainerDiv;
            if (!_common_Flights__WEBPACK_IMPORTED_MODULE_2__["Flights"].useNewChromeSequence()) {
                delete this.suiteNavDiv;
                delete this._chromeDiv;
            }
        }
        this._isDisposed = true;
    };
    Object.defineProperty(SPPageChrome.prototype, "isDisposed", {
        /**
         * Returns true if the object has already been disposed, otherwise false.
         */
        get: function () {
            return this._isDisposed;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates div elements that are used to render the Standard Page Chrome for
     * client-side applications. The structure of the Page Chrome is:
     *
     * SPPageChrome - Parent div for client-side applications
     * -SuiteNav - O365 SuiteNav
     * --App - Div Element where the application will be rendered.
     */
    SPPageChrome.prototype._createPageChrome = function () {
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6__["_PerformanceLogger"].devMark('SPPageChrome.createPageChrome');
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_2__["Flights"].useNewChromeSequence()) {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(this._masterChrome, 'masterChrome');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotDisposed(this._masterChrome, 'masterChrome');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(this._masterChrome.chromeDiv, 'chromeDiv');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(this._masterChrome.suiteNavDiv, 'suiteNavDiv');
            this.suiteNavDiv = this._masterChrome.suiteNavDiv;
        }
        else {
            // Page body
            document.body.className = 'ms-font-m';
            // Page Chrome div
            this._chromeDiv = document.createElement('div');
            this._chromeDiv.setAttribute('class', 'SPPageChrome');
            // SuiteNav div
            this.suiteNavDiv = document.createElement('div');
            this.suiteNavDiv.setAttribute('id', 'SuiteNavPlaceHolder');
            this._chromeDiv.appendChild(this.suiteNavDiv);
        }
        // Application div
        this.appDiv = document.createElement('div');
        this.appDiv.setAttribute('class', "SPPageChrome-app");
        this.appDiv.setAttribute('id', 'spPageChromeAppDiv');
        this.appDiv.setAttribute('data-sp-feature-tag', 'Page Chrome');
        this.appDiv.setAttribute('data-sp-feature-instance-id', '_Page Chrome');
        this.appDiv.setAttribute('data-sp-a11y-navigatebyhierarchy', 'true');
        // PropertyPaneContainer div
        this.propertyPaneContainerDiv = document.createElement('div');
        this.propertyPaneContainerDiv.setAttribute('class', "spPropertyPaneContainer " + _SPPageChrome_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].spPageContentTransition);
        this.propertyPaneContainerDiv.setAttribute('id', 'spPropertyPaneContainer');
        // Application and PropertyPane container div
        this.appAndPropertyPaneDiv = document.createElement('div');
        this.appAndPropertyPaneDiv.setAttribute('class', 'spAppAndPropertyPanelContainer');
        this.appAndPropertyPaneDiv.appendChild(this.appDiv);
        this.appAndPropertyPaneDiv.appendChild(this.propertyPaneContainerDiv);
        // Dialog Container Div
        this.dialogContainerDiv = document.createElement('div');
        this.dialogContainerDiv.setAttribute('id', 'spDialogContainerDiv');
        // Compose the page chrome
        if (!_common_Flights__WEBPACK_IMPORTED_MODULE_2__["Flights"].useNewChromeSequence()) {
            this._chromeDiv.appendChild(this.appAndPropertyPaneDiv);
            this._chromeDiv.appendChild(this.dialogContainerDiv);
            if (!window.onerror) {
                window.onerror = _error_SPGlobalErrorHandler__WEBPACK_IMPORTED_MODULE_4__["default"].basicTracingHandler;
            }
        }
        else if (_common_Flights__WEBPACK_IMPORTED_MODULE_2__["Flights"].useNextGenSPA) {
            this._masterChrome.chromeDiv.appendChild(this.appAndPropertyPaneDiv);
            this._masterChrome.chromeDiv.appendChild(this.dialogContainerDiv);
        }
    };
    return SPPageChrome;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPPageChrome);


/***/ }),

/***/ "KoPf":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/CommandBar.styles.js ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: CommandBarStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommandBarStyles", function() { return CommandBarStyles; });
var CommandBarStyles = function (props) {
    var theme = props.theme;
    return {
        root: [
            {
                height: 40,
                padding: '0 16px',
                backgroundColor: theme.palette.neutralLighter
            }
        ]
    };
};
//# sourceMappingURL=CommandBar.styles.js.map

/***/ }),

/***/ "KqfN":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/utilities/7.5.0_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/utilities/lib/customizations/Customizations.js ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @uifabric/utilities/customizations/Customizations.js
var pkg = __webpack_require__(/*! @ms/uifabric-styling-bundle */ "fglE");
module.exports = pkg._Utilities;

/***/ }),

/***/ "L9BA":
/*!***********************************************************!*\
  !*** ./lib/extensibility/ApplicationCustomizerContext.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-extension-base */ "ZFc5");
/* harmony import */ var _microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _placeholder_PlaceholderProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./placeholder/PlaceholderProvider */ "/Kpt");
/* harmony import */ var _ApplicationAccessor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ApplicationAccessor */ "75qc");
/* harmony import */ var _common_Killswitches__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/Killswitches */ "dQCu");





/**
 * The component context for {@link BaseApplicationCustomizer}.
 *
 * @public
 */
var ApplicationCustomizerContext = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ApplicationCustomizerContext, _super);
    /**
     * @internal
     */
    function ApplicationCustomizerContext(extensionContextParameters, applicationCustomizerContextParameters) {
        var _this = _super.call(this, extensionContextParameters) || this;
        if (!_common_Killswitches__WEBPACK_IMPORTED_MODULE_4__["Killswitches"].isPreallocatedPlaceholdersforApplicationCustomizersKSActive()) {
            _this.serviceScope.finish();
            _this._componentTag = "Extension." +
                (extensionContextParameters.manifest.alias + ".") +
                (extensionContextParameters.manifest.id + ".") +
                ((extensionContextParameters.manifest.isInternal ? 'internal' : 'external') + ".") +
                ("" + extensionContextParameters.instanceId);
            _this._placeholderProvider =
                new _placeholder_PlaceholderProvider__WEBPACK_IMPORTED_MODULE_2__["default"](_this.serviceScope, applicationCustomizerContextParameters, _this._componentTag);
        }
        else {
            _this._placeholderProvider =
                new _placeholder_PlaceholderProvider__WEBPACK_IMPORTED_MODULE_2__["default"](_this.serviceScope, { sequence: applicationCustomizerContextParameters.sequence });
        }
        _this._applicationAccessor = new _ApplicationAccessor__WEBPACK_IMPORTED_MODULE_3__["default"](_this.serviceScope);
        return _this;
    }
    Object.defineProperty(ApplicationCustomizerContext.prototype, "placeholderProvider", {
        /**
         * Exposes a collection of content placeholders for use by third parties.
         */
        get: function () {
            return this._placeholderProvider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationCustomizerContext.prototype, "application", {
        /**
         * Provides access to the client-side application that is currently running.
         */
        get: function () {
            return this._applicationAccessor;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @override
     */
    ApplicationCustomizerContext.prototype.dispose = function () {
        if (!this.isDisposed) {
            this._placeholderProvider.dispose();
            delete this._placeholderProvider;
            delete this._applicationAccessor;
        }
        _super.prototype.dispose.call(this);
    };
    return ApplicationCustomizerContext;
}(_microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_1__["ExtensionContext"]));
/* harmony default export */ __webpack_exports__["default"] = (ApplicationCustomizerContext);


/***/ }),

/***/ "L9tx":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/providers/theming/FabricCustomizations.js ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: applyDeferredFabricCustomizations, applyPltFabricCustomizations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyPltFabricCustomizations", function() { return applyPltFabricCustomizations; });
/* harmony import */ var _ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities/lib/features/FeatureOverrides */ "6TYi");
/* harmony import */ var _ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FluentFeatures__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FluentFeatures */ "1/3F");
/* harmony import */ var _uifabric_utilities_lib_customizations_Customizations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @uifabric/utilities/lib/customizations/Customizations */ "KqfN");
/* harmony import */ var _uifabric_utilities_lib_customizations_Customizations__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_uifabric_utilities_lib_customizations_Customizations__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_odsp_utilities_lib_performance_PerformanceMarker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/odsp-utilities/lib/performance/PerformanceMarker */ "Oy+S");
/* harmony import */ var _ms_odsp_utilities_lib_performance_PerformanceMarker__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_performance_PerformanceMarker__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_Breadcrumb_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/Breadcrumb.styles */ "gfci");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_Callout_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/Callout.styles */ "6/ec");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_CommandBar_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/CommandBar.styles */ "KoPf");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_CommandBarButton_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/CommandBarButton.styles */ "pOZB");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_ContextualMenu_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/ContextualMenu.styles */ "gbFv");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_DetailsColumn_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/DetailsColumn.styles */ "Zxcj");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_DefaultButton_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/DefaultButton.styles */ "wJnm");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_DetailsList_styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/DetailsList.styles */ "ym06");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_Dialog_styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/Dialog.styles */ "d7Tu");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_Facepile_styles__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/Facepile.styles */ "vgaU");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_GroupedList_styles__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/GroupedList.styles */ "FkRh");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_Label_styles__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/Label.styles */ "pOeb");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_Link_styles__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/Link.styles */ "syhi");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_MessageBar_styles__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/MessageBar.styles */ "mlpC");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_MessageBarButton_styles__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/MessageBarButton.styles */ "lom6");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_Nav_styles__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/Nav.styles */ "5UhA");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_TextField_styles__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/TextField.styles */ "Gr/1");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_PrimaryButton_styles__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/PrimaryButton.styles */ "M5i0");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_Pivot_styles__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/Pivot.styles */ "uwwA");
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_TeachingBubble_styles__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/TeachingBubble.styles */ "c4y9");
/* harmony import */ var _ApplyDeferredCustomizations__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./ApplyDeferredCustomizations */ "/jhG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyDeferredFabricCustomizations", function() { return _ApplyDeferredCustomizations__WEBPACK_IMPORTED_MODULE_24__["applyDeferredFabricCustomizations"]; });





 // SPList
 // sp-client
 // all
 // all
 // sp-client OUFR bundle
 // SPList
 // site homepage

 // SPList
 // publishing pages
 // SPList
 // web parts
 // web parts
 // all
 // all
 // all
 // SPList
 // publishing pages CommBar
 // site contents
 // just in case

var appliedPltFabricCustomizations = false;
/** Applies Fabric MDL2 style Customization overrides for PLT components */
function applyPltFabricCustomizations() {
    if (appliedPltFabricCustomizations) {
        return;
    }
    if (!_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_0___default.a.isFeatureEnabled(_FluentFeatures__WEBPACK_IMPORTED_MODULE_1__["EnableFluentTheme"]) &&
        !_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_0___default.a.isFeatureEnabled(_FluentFeatures__WEBPACK_IMPORTED_MODULE_1__["OnedriveFluentCustomization"]) &&
        !_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_0___default.a.isFeatureEnabled(_FluentFeatures__WEBPACK_IMPORTED_MODULE_1__["EnableFluentStylingODC"])) {
        Object(_ms_odsp_utilities_lib_performance_PerformanceMarker__WEBPACK_IMPORTED_MODULE_3__["mark"])('FabricCustomizations_PLT_Start');
        // this object copied from MDL2Styles.ts, the one with errors were removed because they weren't imported
        var mdl2Styles_1 = {
            Breadcrumb: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_Breadcrumb_styles__WEBPACK_IMPORTED_MODULE_4__["BreadcrumbStyles"] },
            CalloutContent: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_Callout_styles__WEBPACK_IMPORTED_MODULE_5__["CalloutContentStyles"] },
            CommandBar: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_CommandBar_styles__WEBPACK_IMPORTED_MODULE_6__["CommandBarStyles"] },
            CommandBarButton: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_CommandBarButton_styles__WEBPACK_IMPORTED_MODULE_7__["CommandBarButtonStyles"] },
            Check: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_DetailsList_styles__WEBPACK_IMPORTED_MODULE_11__["CheckStyles"] },
            ContextualMenu: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_ContextualMenu_styles__WEBPACK_IMPORTED_MODULE_8__["ContextualMenuStyles"] },
            DefaultButton: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_DefaultButton_styles__WEBPACK_IMPORTED_MODULE_10__["DefaultButtonStyles"] },
            DetailsColumn: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_DetailsColumn_styles__WEBPACK_IMPORTED_MODULE_9__["DetailsColumnStyles"] },
            DetailsHeader: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_DetailsList_styles__WEBPACK_IMPORTED_MODULE_11__["DetailsHeaderStyles"] },
            DetailsRow: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_DetailsList_styles__WEBPACK_IMPORTED_MODULE_11__["DetailsRowStyles"] },
            DetailsRowCheck: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_DetailsList_styles__WEBPACK_IMPORTED_MODULE_11__["DetailsRowCheckStyles"] },
            DialogContent: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_Dialog_styles__WEBPACK_IMPORTED_MODULE_12__["DialogContentStyles"] },
            DialogFooter: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_Dialog_styles__WEBPACK_IMPORTED_MODULE_12__["DialogFooterStyles"] },
            Facepile: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_Facepile_styles__WEBPACK_IMPORTED_MODULE_13__["FacepileStyles"] },
            GroupHeader: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_GroupedList_styles__WEBPACK_IMPORTED_MODULE_14__["GroupHeaderStyles"] },
            Label: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_Label_styles__WEBPACK_IMPORTED_MODULE_15__["LabelStyles"] },
            Link: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_Link_styles__WEBPACK_IMPORTED_MODULE_16__["LinkStyles"] },
            MessageBar: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_MessageBar_styles__WEBPACK_IMPORTED_MODULE_17__["MessageBarStyles"] },
            MessageBarButton: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_MessageBarButton_styles__WEBPACK_IMPORTED_MODULE_18__["MessageBarButtonStyles"] },
            Nav: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_Nav_styles__WEBPACK_IMPORTED_MODULE_19__["NavStyles"] },
            Pivot: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_Pivot_styles__WEBPACK_IMPORTED_MODULE_22__["PivotStyles"] },
            PrimaryButton: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_PrimaryButton_styles__WEBPACK_IMPORTED_MODULE_21__["PrimaryButtonStyles"] },
            TeachingBubble: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_TeachingBubble_styles__WEBPACK_IMPORTED_MODULE_23__["TeachingBubbleStyles"] },
            TeachingBubbleContent: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_TeachingBubble_styles__WEBPACK_IMPORTED_MODULE_23__["TeachingBubbleStyles"] },
            TextField: { styles: _uifabric_mdl2_theme_lib_mdl2_styles_TextField_styles__WEBPACK_IMPORTED_MODULE_20__["TextFieldStyles"] },
        };
        appliedPltFabricCustomizations = true;
        _uifabric_utilities_lib_customizations_Customizations__WEBPACK_IMPORTED_MODULE_2__["Customizations"].applyBatchedUpdates(function () {
            for (var c in mdl2Styles_1) {
                _uifabric_utilities_lib_customizations_Customizations__WEBPACK_IMPORTED_MODULE_2__["Customizations"].applyScopedSettings(c, mdl2Styles_1[c]);
            }
        });
        Object(_ms_odsp_utilities_lib_performance_PerformanceMarker__WEBPACK_IMPORTED_MODULE_3__["mark"])('FabricCustomizations_PLT_End');
    }
}
//# sourceMappingURL=FabricCustomizations.js.map

/***/ }),

/***/ "LCDl":
/*!********************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/set-version/7.0.17/node_modules/@uifabric/set-version/lib/index.js ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: setVersion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _setVersion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setVersion */ "3GMh");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setVersion", function() { return _setVersion__WEBPACK_IMPORTED_MODULE_0__["setVersion"]; });



Object(_setVersion__WEBPACK_IMPORTED_MODULE_0__["setVersion"])('@uifabric/set-version', '6.0.0');
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "LODL":
/*!****************************************************!*\
  !*** ./lib/pageChrome/SPPageChrome.module.scss.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./SPPageChrome.module.css */ "H2L0");
var styles = {
    spPageContentTransition: 'spPageContentTransition_8a76ec2e'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "M5i0":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/PrimaryButton.styles.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: PrimaryButtonStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrimaryButtonStyles", function() { return PrimaryButtonStyles; });
var PrimaryButtonStyles = function (props) {
    var theme = props.theme;
    if (!theme) {
        throw new Error('Theme is undefined or null.');
    }
    var palette = theme.palette;
    return {
        root: {
            border: 'none',
            backgroundColor: palette.themePrimary,
            color: palette.white
        },
        rootHovered: {
            backgroundColor: palette.themeDarkAlt
        },
        rootPressed: {
            backgroundColor: palette.themeDark
        },
        rootChecked: {
            backgroundColor: palette.themeDark
        }
    };
};
//# sourceMappingURL=PrimaryButton.styles.js.map

/***/ }),

/***/ "MS/P":
/*!***********************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/async/Promise.js ***!
  \***********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @ms/odsp-utilities/async/Promise.js
var pkg = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
module.exports = {}
module.exports.default = pkg.Promise;
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "OoZ+":
/*!************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/telemetry-manager/0.12.6/node_modules/@ms/telemetry-manager/lib/events/QosError.event.js ***!
  \************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OneDrive:IgnoreCodeCoverage
Object.defineProperty(exports, "__esModule", { value: true });
var SingleEventBase_1 = __webpack_require__(/*! ../SingleEventBase */ "8WDM");
var CaughtError_event_1 = __webpack_require__(/*! ./CaughtError.event */ "G61I");
var ResultTypeEnum_1 = __webpack_require__(/*! ./ResultTypeEnum */ "yq8I");
exports.ResultTypeEnum = ResultTypeEnum_1.ResultTypeEnum;
exports.QosError = SingleEventBase_1.createSingleEvent({
    eventName: 'QosError,CaughtError,Trace,',
    shortEventName: 'QosError',
    critical: true
}, {
    name: {
        isKey: true,
        type: 1 /* String */
    },
    resultCode: 1 /* String */,
    resultType: {
        typeRef: ResultTypeEnum_1.ResultTypeEnum,
        type: 6 /* Enum */
    }
}, CaughtError_event_1.CaughtError);
//# sourceMappingURL=QosError.event.js.map

/***/ }),

/***/ "Oy+S":
/*!***************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/performance/PerformanceMarker.js ***!
  \***************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// OneDrive:IgnoreCodeCoverage
var performance = window.performance;
var HighResolutionTimingSupported = !!performance && typeof performance.mark === 'function' &&
    typeof performance.clearMarks === 'function' &&
    typeof performance.now === 'function';
exports.HighResolutionTimingSupported = HighResolutionTimingSupported;
exports.MARKER_PREFIX = "EUPL.";
var _markCount = 0;
var _perfMarks = window['_perfMarks'] = window['_perfMarks'] || []; // used for browsers do not support native performance.mark
function mark(name, limit) {
    var markName = addPrefix(name);
    if (limit === null || limit === undefined || _markCount < limit) {
        if (HighResolutionTimingSupported) {
            performance.mark(markName);
        }
        else { // this is for browser does not support native performance.mark
            _perfMarks.push({
                name: markName,
                startTime: Date.now()
            });
        }
        _markCount++;
    }
}
exports.mark = mark;
function measure(name, startName, endName) {
    if (HighResolutionTimingSupported) {
        if (getMarkerTime(startName) > 0 && getMarkerTime(endName) > 0) {
            try {
                performance.measure(addPrefix(name), addPrefix(startName), addPrefix(endName));
            }
            catch (_a) {
                // Not important.
            }
        }
    }
}
exports.measure = measure;
function getMarkerTime(name) {
    var markName = addPrefix(name);
    if (HighResolutionTimingSupported) {
        var mark_1 = performance.getEntriesByName(markName);
        return mark_1 && mark_1.length > 0 ? Math.round(mark_1[0].startTime) : NaN;
    }
    else {
        var mark_2 = _perfMarks.filter(function (mark) { return mark.name === markName; })[0];
        return mark_2 && mark_2.startTime;
    }
}
exports.getMarkerTime = getMarkerTime;
function clearMarks(names) {
    var markNames = [];
    if (names) {
        markNames = names.map(addPrefix);
    }
    if (HighResolutionTimingSupported) {
        performance.getEntriesByType("mark").filter(function (mark) {
            if (markNames.length > 0) {
                return markNames.indexOf(mark.name) >= 0;
            }
            return mark.name.lastIndexOf(exports.MARKER_PREFIX, 0) === 0;
        }).forEach(function (mark) {
            performance.clearMarks(mark.name);
        });
    }
    else {
        _perfMarks = [];
    }
}
exports.clearMarks = clearMarks;
function getAllMarks() {
    'use strict';
    if (HighResolutionTimingSupported) {
        return performance.getEntriesByType("mark").filter(function (mark) {
            return mark.name.lastIndexOf(exports.MARKER_PREFIX, 0) === 0;
        });
    }
    else {
        return _perfMarks;
    }
}
exports.getAllMarks = getAllMarks;
function addPrefix(name) {
    return name.lastIndexOf(exports.MARKER_PREFIX, 0) === 0 ? name : exports.MARKER_PREFIX + name;
}
//# sourceMappingURL=PerformanceMarker.js.map

/***/ }),

/***/ "P/8H":
/*!************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/telemetry-manager/0.12.6/node_modules/@ms/telemetry-manager/lib/EventBase.js ***!
  \************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tCkv");
var Manager_1 = __webpack_require__(/*! ./Manager */ "rdzh");
var CorrelationVector_1 = __webpack_require__(/*! ./CorrelationVector */ "7Oog");
var assign_1 = __webpack_require__(/*! @ms/utilities-objects/lib/assign */ "vFq2");
// tslint:disable:no-bitwise
var _id = 0;
var ClonedEventType;
(function (ClonedEventType) {
    ClonedEventType[ClonedEventType["Single"] = 0] = "Single";
    ClonedEventType[ClonedEventType["Start"] = 1] = "Start";
    ClonedEventType[ClonedEventType["End"] = 2] = "End";
})(ClonedEventType = exports.ClonedEventType || (exports.ClonedEventType = {}));
var ValidationErrorType;
(function (ValidationErrorType) {
    ValidationErrorType[ValidationErrorType["NoParent"] = 1] = "NoParent";
})(ValidationErrorType = exports.ValidationErrorType || (exports.ValidationErrorType = {}));
var AccountType;
(function (AccountType) {
    AccountType[AccountType["Consumer"] = 0] = "Consumer";
    AccountType[AccountType["ConsumerAnonymous"] = 1] = "ConsumerAnonymous";
    AccountType[AccountType["Business"] = 2] = "Business";
    AccountType[AccountType["BusinessAnonymous"] = 3] = "BusinessAnonymous";
    AccountType[AccountType["Unknown"] = 4] = "Unknown";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
function addEventProps(eventPrototype, props, metadata, baseClass) {
    assign_1.assign(eventPrototype, props);
    var resultMetadata = {};
    for (var key in metadata) {
        if (Object.prototype.hasOwnProperty.call(metadata, key)) {
            var item = metadata[key];
            var result = resultMetadata[key] = (typeof item === 'number' ? { type: item } : item);
            result.definedInName = props.shortEventName;
            if (result.type === 2 /* Number */) {
                result.isMetric = true;
            }
        }
    }
    eventPrototype.metadata = baseClass ? tslib_1.__assign({}, baseClass.prototype.metadata, resultMetadata) : resultMetadata;
}
exports.addEventProps = addEventProps;
var managerSpecificEventTypes = new WeakMap(); // tslint:disable-line:no-any
var EventBase = /** @class */ (function () {
    function EventBase(data, startType, parent) {
        this.context = {};
        this.validationErrors = 0;
        this.data = {};
        this.context = tslib_1.__assign({}, this.addContext({}));
        this.id = _id++;
        this.enabled = this._isEnabled();
        // Set the parent id if needed
        if (parent) {
            this.parentId = parent.id;
        }
        else if (this.requiresParent) {
            this._addValidationError(ValidationErrorType.NoParent);
        }
        // Set the start time
        this.startTime = (data && data.startTimeOverride) || Manager_1.Manager.getTime();
        this.vector = new CorrelationVector_1.CorrelationVector(parent ? parent.vector : CorrelationVector_1.CorrelationVector.RootVector);
        // Set the data if we have it
        if (data) {
            this._setData(data);
        }
        // Send the start event
        this._logEvent(startType);
    }
    /**
     * This will return true if the event is enabled
     */
    EventBase.enabled = function () {
        return this.prototype._isEnabled();
    };
    /**
     * This will return true if the event is of this type
     * @param event {IEvent} The event to compare
     */
    EventBase.isTypeOf = function (event) {
        return event.eventName.indexOf(this.prototype.shortEventName + ',') >= 0;
    };
    EventBase.withManager = function (manager) {
        if (!manager || manager === Manager_1.Manager) {
            return this;
        }
        var eventTypesForManager = managerSpecificEventTypes.get(manager);
        if (!eventTypesForManager) {
            eventTypesForManager = new WeakMap();
            managerSpecificEventTypes.set(manager, eventTypesForManager);
        }
        var eventType = eventTypesForManager.get(this);
        if (eventType) {
            return eventType;
        }
        // @ts-ignore
        var EventWithManager = /** @class */ (function (_super) {
            tslib_1.__extends(EventWithManager, _super);
            function EventWithManager() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return EventWithManager;
        }((this)));
        // @ts-ignore
        EventWithManager.prototype.manager = manager;
        eventType = EventWithManager;
        eventTypesForManager.set(this, eventType);
        return eventType;
    };
    EventBase.withData = function (modifier) {
        if (!modifier) {
            return this;
        }
        var addData = typeof modifier !== 'function' ? function (data) { return (tslib_1.__assign({}, modifier, data)); } : modifier;
        // @ts-ignore
        var EventWithData = /** @class */ (function (_super) {
            tslib_1.__extends(EventWithData, _super);
            function EventWithData() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EventWithData.prototype.addData = function (data) {
                var localData = tslib_1.__assign({}, data, addData(data));
                return tslib_1.__assign({}, localData, _super.prototype.addData.call(this, localData));
            };
            return EventWithData;
        }((this)));
        return EventWithData;
    };
    EventBase.withContext = function (modifier) {
        if (!modifier) {
            return this;
        }
        var addContext = typeof modifier !== 'function' ? function (context) { return (tslib_1.__assign({}, modifier, context)); } : modifier;
        // @ts-ignore
        var EventWithContext = /** @class */ (function (_super) {
            tslib_1.__extends(EventWithContext, _super);
            function EventWithContext() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EventWithContext.prototype.addContext = function (context) {
                var localContext = tslib_1.__assign({}, context, addContext(context));
                return tslib_1.__assign({}, localContext, _super.prototype.addContext.call(this, localContext));
            };
            return EventWithContext;
        }((this)));
        return EventWithContext;
    };
    EventBase.from = function (sourceEventType) {
        if (!sourceEventType) {
            return this;
        }
        return this
            .withManager(sourceEventType.prototype.manager)
            .withContext(function (context) { return sourceEventType.prototype.addContext(context); })
            .withData(function (data) { return sourceEventType.prototype.addData(data); }); // tslint:disable-line:no-any
    };
    EventBase.prototype.addContext = function (context) {
        return copyObject(this.manager, context, {});
    };
    EventBase.prototype.addData = function (data) {
        return data;
    };
    EventBase.prototype._isEnabled = function () {
        // All events are enabled by default
        return !this.samplingFeature || Manager_1.Manager.isFeatureEnabled(this.samplingFeature);
    };
    EventBase.prototype._setData = function (data) {
        var stored = this.data;
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key in this.metadata) {
                processValue(this.manager, data, stored, key);
            }
        }
        assign_1.assign(this.data, this.addData(this.data));
    };
    EventBase.prototype._logEvent = function (eventType) {
        this.manager.logEvent(this, eventType);
    };
    EventBase.prototype._addValidationError = function (type) {
        this.validationErrors = this.validationErrors | type;
        this.manager.logValidationError(this, type);
    };
    return EventBase;
}());
exports.EventBase = EventBase;
function processValue(manager, source, target, key) {
    var value = source[key];
    switch (typeof value) {
        case 'string':
            // Allow the cleaner to know what it is being stored as
            // This might be used to always scrub values for a particular key
            var cleaned = manager.cleanString(value, key);
            if (cleaned !== undefined) {
                target[key] = cleaned;
            }
            return;
        case 'undefined':
            return;
        case 'object':
            // Need to handle ABExperiment objects
            if (value && Object.getPrototypeOf(value) === Object.prototype) {
                // Still overwrite
                target[key] = copyObject(manager, value, {});
            }
            else {
                target[key] = value;
            }
            return;
        default:
            target[key] = value;
            return;
    }
}
function copyObject(manager, source, target) {
    for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
        var key = _a[_i];
        processValue(manager, source, target, key);
    }
    return target;
}
var proto = EventBase.prototype;
proto.eventName = 'EventBase,';
proto.shortEventName = 'EventBase';
// All events are not critical by default
proto.critical = false;
// All events require parents by default
proto.requiresParent = true;
proto.manager = Manager_1.Manager;
//# sourceMappingURL=EventBase.js.map

/***/ }),

/***/ "PcWP":
/*!*******************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/utilities-error/0.10.2/node_modules/@ms/utilities-error/lib/ApiError.js ***!
  \*******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tCkv");
var CustomError_1 = __webpack_require__(/*! ./CustomError */ "S2tz");
/**
 * Custom error base class for the common scenario of generic errors that should be reported in
 * Quality of Service metrics.
 */
var ApiError = /** @class */ (function (_super) {
    tslib_1.__extends(ApiError, _super);
    function ApiError(props) {
        var _this = _super.call(this, props) || this;
        var innerError = props.innerError;
        var errorData = innerError instanceof ApiError ? {
            correlationId: innerError.correlationId,
            isExpected: innerError.isExpected,
            code: innerError.code
        } : {};
        var _a = props.correlationId, correlationId = _a === void 0 ? errorData.correlationId : _a, _b = props.isExpected, isExpected = _b === void 0 ? errorData.isExpected : _b, _c = props.code, code = _c === void 0 ? errorData.code : _c;
        _this.correlationId = correlationId;
        _this.isExpected = !!isExpected;
        _this.code = code || 'ApiError';
        return _this;
    }
    return ApiError;
}(CustomError_1.CustomError));
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map

/***/ }),

/***/ "Pk8u":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Pk8u__;

/***/ }),

/***/ "Q81X":
/*!***********************************!*\
  !*** ./lib/ApplicationManager.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ApplicationLoadType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ApplicationLoadType */ "fBGb");
/* harmony import */ var _BaseApplication__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BaseApplication */ "n9Iz");
/* harmony import */ var _navigator_OnBeforeNavigationEventName__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./navigator/OnBeforeNavigationEventName */ "JwFY");
/* harmony import */ var _navigator_Navigator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./navigator/Navigator */ "2fZ3");
/* harmony import */ var _pageChrome_SPPageChrome__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pageChrome/SPPageChrome */ "KdXK");
/* harmony import */ var _SPApplicationBase_resx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SPApplicationBase.resx */ "Cc0y");
// Copyright (c) Microsoft. All rights reserved.










// Qos constants
var startQosScenarioName = 'ApplicationManager.start';
var initializeQosScenarioName = 'ApplicationManager.initialize';
var applicationFailedToLoadFailure = 'ApplicationFailedToLoad';
var shellStartFailure = 'SPShell.Start';
/**
 * Application manager. Includes logic to load SPFX client-side applications.
 * @internal
 */
var ApplicationManager = /** @class */ (function () {
    /**
     * Creates an application manager.
     * @param serviceScope - Root service scope.
     */
    function ApplicationManager(serviceScope, navigator) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(serviceScope, 'serviceScope');
        this._serviceScope = serviceScope;
        this._navigator = navigator || new _navigator_Navigator__WEBPACK_IMPORTED_MODULE_7__["default"](this._serviceScope, this);
    }
    /**
     * Returns true if the current application is a chromeless application.
     *
     * @privateRemarks
     * PageChrome, SuiteNav and application render do not apply to chromeless applications, like
     * Classic pages and ListView application, and should not be called.
     * This is a temporary fix to prevent page chrome DOM and styles from getting inserted into
     * the list view host application.
     *
     * @internal
     */
    ApplicationManager._isChromelessApplication = function (componentId) {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Environment"].type === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["EnvironmentType"].ClassicSharePoint ||
            componentId === 'b1ab4aaa-f779-405c-8683-d3a750b5d18d';
    };
    Object.defineProperty(ApplicationManager.prototype, "currentApplicationId", {
        /**
         * Returns the currently loaded application.
         * Returns Guid.empty if no application is currently loaded.
         */
        get: function () {
            var appComponentId = this._currentApplication && this._currentApplication.componentId;
            return appComponentId ? _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(appComponentId) : _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].empty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationManager.prototype, "currentApplication", {
        /**
         * Returns the currently loaded application.
         * Returns Guid.empty if no application is currently loaded.
         */
        get: function () {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(this._currentApplication, 'currentApplication');
            return this._currentApplication;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Loads an application and starts its execution.
     *
     * @param preloadedData - Application preloaded data. Must include the application id.
     * @param pageChrome - Page Chrome in which the application will be rendered.
     */
    ApplicationManager.prototype.startApplication = function (preloadedData, pageChrome) {
        var _this = this;
        try {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(preloadedData.clientSideApplicationId, 'preloadedData.clientSideApplicationId');
        }
        catch (error) {
            return Promise.reject(error);
        }
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](startQosScenarioName);
        function error(message, failureId) {
            var err = new Error(message);
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(ApplicationManager._logSource, err);
            qosMonitor.writeUnexpectedFailure(failureId, err);
            throw err;
        }
        var applicationId = preloadedData.clientSideApplicationId;
        // This must run before calling Navigator.navigateToPreloadedData to ensure DialogManager is set up.
        if (!this._isChromelessApplication(applicationId) && !pageChrome) {
            pageChrome = new _pageChrome_SPPageChrome__WEBPACK_IMPORTED_MODULE_8__["default"](this._serviceScope);
        }
        var appManifest = _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["SPComponentLoader"].tryGetManifestById(applicationId);
        var appComponent = !!appManifest ? _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["SPComponentLoader"].tryGetLoadedComponent(appManifest) : undefined;
        if (appComponent) {
            // Application was loaded synchronously
            if (!_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["_SPLoaderFlights"]._useNewBootSequence()) {
                this._navigator.navigateToPreloadedData(preloadedData);
            }
            return this._initializeApplicationWithTelemetry(appComponent, applicationId, pageChrome, qosMonitor, error).then(function (app) {
                // When the flight is off we need to load the application customizers after the application has rendered.
                // This is to ensure that the placeholders have been set up before we execute the AC.
                if (!_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["_SPLoaderFlights"]._useNewBootSequence()) {
                    _this._navigator._loadApplicationCustomizers(preloadedData);
                }
                return app;
            });
        }
        else {
            // Application was not loaded synchronously. Request loading the application.
            var appComponentPromise = this._loadApplicationComponent(applicationId, error);
            if (!_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["_SPLoaderFlights"]._useNewBootSequence()) {
                this._navigator.navigateToPreloadedData(preloadedData);
            }
            return appComponentPromise.then(function (application) {
                return _this._initializeApplicationWithTelemetry(application, applicationId, pageChrome, qosMonitor, error).then(function (app) {
                    // When the flight is off we need to load the application customizers after the application has rendered.
                    // This is to ensure that the placeholders have been set up before we execute the AC.
                    if (!_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["_SPLoaderFlights"]._useNewBootSequence()) {
                        _this._navigator._loadApplicationCustomizers(preloadedData);
                    }
                    return app;
                });
            });
        }
    };
    ApplicationManager.prototype._raiseOnBeforeNavigationEventName = function (fromAppId, toAppId) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.raiseEvent(_BaseApplication__WEBPACK_IMPORTED_MODULE_5__["default"]._onBeforeNavigationEventName, new _navigator_OnBeforeNavigationEventName__WEBPACK_IMPORTED_MODULE_6__["default"](fromAppId, toAppId));
    };
    Object.defineProperty(ApplicationManager.prototype, "_applicationLoadType", {
        get: function () {
            return this._previousApplication ?
                _ApplicationLoadType__WEBPACK_IMPORTED_MODULE_4__["ApplicationLoadType"].InPlaceNavigation :
                _ApplicationLoadType__WEBPACK_IMPORTED_MODULE_4__["ApplicationLoadType"].FullPageLoad;
        },
        enumerable: true,
        configurable: true
    });
    ApplicationManager.prototype._shouldRaiseOnBeforeNavigationEvent = function () {
        return !_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('bc792189-6879-4d06-9c7d-0fcac8abb279'), '29/03/2019', 'RaiseOnBeforeNavigationEvent');
    };
    ApplicationManager.prototype._initializeApplicationWithTelemetry = function (application, applicationId, pageChrome, qosMonitor, error) {
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3__["_PerformanceLogger"].markApplicationStart();
        return this._initializeApplication(new application.default(), applicationId, pageChrome)
            .then(function (result) {
            qosMonitor.writeSuccess();
            return result;
        }).catch(function (e) {
            return error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_SPApplicationBase_resx__WEBPACK_IMPORTED_MODULE_9__["default"].applicationFailedToInitializeError, e), shellStartFailure);
        });
    };
    /**
     * Loads the application, defined by the application id passed as input.
     * Rejects the promise if the application can't be loaded.
     */
    ApplicationManager.prototype._loadApplicationComponent = function (applicationId, error) {
        return _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["SPComponentLoader"].loadComponentById(applicationId)
            .catch(function (e) {
            return error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_SPApplicationBase_resx__WEBPACK_IMPORTED_MODULE_9__["default"].applicationFailedToLoadWithMessageError, applicationId, e.message), applicationFailedToLoadFailure);
        });
    };
    ApplicationManager.prototype._isChromelessApplication = function (applicationId) {
        return ApplicationManager._isChromelessApplication(applicationId);
    };
    /**
     * Initializes the application.
     * It sets up the PageChrome and SuiteNav if necessary, initializes the application context
     * and renders the application if necessary.
     *
     * @param application - Application to initialize.
     * @param applicationId - Application component Id.
     * @param pageChrome - Application Page Chrome
     *
     * @returns A promise
     */
    ApplicationManager.prototype._initializeApplication = function (application, applicationId, pageChrome) {
        var _this = this;
        if (application['__type'] !== 'BaseApplication') { // tslint:disable-line:no-string-literal
            return Promise.reject(new Error('The application is not a subclass of BaseApplication'));
        }
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](initializeQosScenarioName);
        var applicationManifest = _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["SPComponentLoader"].tryGetManifestById(applicationId);
        var qosApplicationData = {
            alias: application.alias || applicationManifest.alias,
            isInternal: applicationManifest.isInternal,
            manifestId: applicationManifest.id
        };
        if (_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["_SPLoaderFlights"]._useNewBootSequence() && this._currentApplication) {
            this._previousApplication = this._currentApplication;
        }
        this._currentApplication = application;
        if (this._previousApplication) {
            if (this._shouldRaiseOnBeforeNavigationEvent()) {
                this._raiseOnBeforeNavigationEventName(this._previousApplication.componentId, applicationId);
            }
            this._previousApplication._unload();
        }
        try {
            return this._currentApplication._load({
                manifest: applicationManifest,
                parentServiceScope: this._serviceScope,
                navigator: this._navigator,
                instanceId: applicationManifest.id,
                loggingTag: "Application." + applicationManifest.id,
                chrome: pageChrome,
                loadType: this._applicationLoadType
            }).then(function () {
                if (_this._previousApplication) {
                    _this._previousApplication.dispose();
                    _this._previousApplication = undefined;
                }
                if (!_this._isChromelessApplication(applicationId)) {
                    _this._currentApplication._loadTheme();
                    _this._currentApplication._render();
                }
                qosMonitor.writeSuccess(qosApplicationData);
                return application;
            }).catch(function (e) {
                qosMonitor.writeUnexpectedFailure('AsyncError', e, qosApplicationData);
                return Promise.reject(e);
            });
        }
        catch (e) {
            qosMonitor.writeUnexpectedFailure('GeneralError', e, qosApplicationData);
            return Promise.reject(e);
        }
    };
    ApplicationManager._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('ApplicationManager');
    return ApplicationManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (ApplicationManager);


/***/ }),

/***/ "Qd2r":
/*!**************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/telemetry-manager/0.12.6/node_modules/@ms/telemetry-manager/lib/ErrorHelper.js ***!
  \**************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CaughtError_event_1 = __webpack_require__(/*! ./events/CaughtError.event */ "G61I");
var QosError_event_1 = __webpack_require__(/*! ./events/QosError.event */ "OoZ+");
var Verbose_event_1 = __webpack_require__(/*! ./events/Verbose.event */ "Yr1X");
var CircularBuffer_1 = __webpack_require__(/*! ./utilities/CircularBuffer */ "SE01");
var safeSerialize_1 = __webpack_require__(/*! @ms/utilities-objects/lib/safeSerialize */ "FO0h");
var MAX_VERBOSE_LOGS = 50;
var CANCELED = 'Canceled';
var _verboseLogs = new CircularBuffer_1.CircularBuffer(MAX_VERBOSE_LOGS);
function verbose(message, eventName) {
    _verboseLogs.push({
        name: eventName,
        message: message
    });
}
exports.verbose = verbose;
function logError(error, extraData, qosData) {
    if (!error || _isCanceled(error)) {
        return;
    }
    var message = getErrorMessage(error);
    var stack = error && typeof error === 'object' && ('stack' in error) && error.stack ? error.stack : '';
    var schema;
    while (schema = _verboseLogs.popOldest()) {
        Verbose_event_1.Verbose.logData(schema);
    }
    if (qosData && qosData.eventName) {
        QosError_event_1.QosError.logData({
            name: qosData.eventName,
            resultCode: qosData.resultCode,
            resultType: qosData.resultType,
            extraData: extraData || {},
            message: message,
            stack: stack
        });
    }
    else {
        CaughtError_event_1.CaughtError.logData({
            extraData: extraData || {},
            message: message,
            stack: stack
        });
    }
}
exports.logError = logError;
function log(error, eventName, resultCode, resultType) {
    logError(error, undefined, { eventName: eventName, resultCode: resultCode, resultType: resultType });
}
exports.log = log;
/**
 * Extract the error message from the error
 */
function getErrorMessage(error) {
    var message = '';
    if (error) {
        if (typeof (error) === 'object' && 'message' in error) {
            message = error.message;
        }
        else if (typeof (error) === 'object' && 'description' in error) {
            message = error.description;
        }
        else if (typeof (error) === 'object') {
            message = safeSerialize_1.safeSerialize(error);
        }
        else if (error.toString) {
            message = error.toString();
        }
    }
    return message;
}
exports.getErrorMessage = getErrorMessage;
function _isCanceled(error) {
    return error === CANCELED ||
        (!!error && typeof error === 'object' && ('name' in error) && error.name === CANCELED) ||
        (!!error && typeof error === 'object' && ('message' in error) && error.message === CANCELED);
}
//# sourceMappingURL=ErrorHelper.js.map

/***/ }),

/***/ "Rr6l":
/*!**********************************************************!*\
  !*** ./lib/extensibility/ApplicationCustomizerLoader.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-extension-base */ "ZFc5");
/* harmony import */ var _microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ApplicationCustomizerContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ApplicationCustomizerContext */ "L9BA");
/* harmony import */ var _ApplicationCustomizerContextFactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ApplicationCustomizerContextFactory */ "IPei");
/* harmony import */ var _BaseApplicationCustomizer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./BaseApplicationCustomizer */ "5aZ1");
/* harmony import */ var _customAction_ClientSideCustomAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./customAction/ClientSideCustomAction */ "J5U9");
/* harmony import */ var _customAction_CustomActionLocations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./customAction/CustomActionLocations */ "4QmI");
/* harmony import */ var _placeholder_PlaceholderManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./placeholder/PlaceholderManager */ "/HB6");
/* harmony import */ var _common_Killswitches__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common/Killswitches */ "dQCu");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../common/Flights */ "w4+A");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_13__);














/**
 * A helper class for loading ApplicationCustomizer extensions.
 */
var ApplicationCustomizerLoader = /** @class */ (function () {
    function ApplicationCustomizerLoader(serviceScope) {
        var _this = this;
        this._customActionFromPreloadedData = [];
        this._debugCustomActions = [];
        this._debugCustomizerLoaded = false;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(serviceScope, 'serviceScope');
        this._serviceScope = serviceScope;
        this._extensionManager = new _microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_2__["_ExtensionManager"](this._serviceScope, _BaseApplicationCustomizer__WEBPACK_IMPORTED_MODULE_7__["default"]);
        this._applicationCustomizerContextFactory = new _ApplicationCustomizerContextFactory__WEBPACK_IMPORTED_MODULE_6__["default"](this._serviceScope);
        // Initialize the placeholder manager.
        serviceScope.whenFinished(function () {
            _this._placeholderManager = serviceScope.consume(_placeholder_PlaceholderManager__WEBPACK_IMPORTED_MODULE_10__["default"].serviceKey);
            _this._placeholderManager._enable();
        });
        this._currentCustomActions = new Set();
        this._currentCustomActionsWithContext = new Set();
    }
    /**
     * This method is called when the client-side application is initializing and before it has
     * rendered. It loads the associated client-side extensions. It may perform asynchronous
     * operations.
     */
    ApplicationCustomizerLoader.prototype.loadExtensions = function (preloadedCustomActions) {
        var _this = this;
        var futureCustomActions = new Set(preloadedCustomActions);
        var hadCustomActions = this._currentCustomActions.size > 0;
        var hasDebugCustomActions = this._hasDebugCustomActions();
        // Will have custom actions include the debug ones to ensure those are always loaded
        var willHaveCustomActions = futureCustomActions.size > 0 || hasDebugCustomActions;
        var areCustomActionsEqual = (!hadCustomActions && !willHaveCustomActions) ||
            (hadCustomActions && willHaveCustomActions && Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__["isEqual"])(this._currentCustomActions, futureCustomActions));
        var extensionsDisposed = false;
        // If there were custom actions, dispose them before loading the new ones
        if (hadCustomActions && !areCustomActionsEqual) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(ApplicationCustomizerLoader._logSource, 'Disposing existing extensions');
            this.disposeExtensions();
            extensionsDisposed = true;
        }
        this._currentCustomActions = futureCustomActions;
        if ((willHaveCustomActions && !areCustomActionsEqual) || // If new custom actions are needed, load them
            (hasDebugCustomActions && extensionsDisposed) // If we disposed debug extensions, make sure they are reloaded
        ) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(ApplicationCustomizerLoader._logSource, 'Loading new extensions');
            return this._loadExtensions(preloadedCustomActions).then(function () { return _this._loadDebugCustomizerIfEnabled(); });
        }
        return this._loadDebugCustomizerIfEnabled();
    };
    /**
     * This method is called when the client-side application is initializing and before it has
     * rendered. It creates the contexts for the extensions and cache them without loading the extensions' components.
     * As part of creating the context, placeholders will be created and rendered.
     */
    ApplicationCustomizerLoader.prototype.initializeExtensionsContext = function (preloadedCustomActions) {
        var customActionFromPreloadedData = this._loadCustomActionsFromPreloadedData(preloadedCustomActions);
        var debugCustomActions = this._loadCustomActionsFromQueryParameter();
        var customActions = debugCustomActions.concat(customActionFromPreloadedData);
        var newCustomActionsSet = new Set(customActions);
        if (this._currentCustomActionsWithContext.size !== 0 &&
            !Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__["isEqual"])(this._currentCustomActionsWithContext, newCustomActionsSet)) {
            this.disposeExtensions();
            this._addExtensionsInitAsKeyMetric();
        }
        this._currentCustomActionsWithContext = newCustomActionsSet;
        this._applicationCustomizerContextFactory.initialize(customActions);
    };
    /**
     * Disposes all existing application customizers and their associated placeholder contents.
     */
    ApplicationCustomizerLoader.prototype.disposeExtensions = function () {
        this._extensionManager.disposeExtensions();
        this._debugCustomizerLoaded = false;
        if (!_common_Killswitches__WEBPACK_IMPORTED_MODULE_11__["Killswitches"].isClearClientSideCustomActionsKSActive()) {
            this._currentCustomActions.clear();
        }
        this._applicationCustomizerContextFactory.clear();
    };
    Object.defineProperty(ApplicationCustomizerLoader.prototype, "_customActions", {
        get: function () {
            return this._debugCustomActions.concat(this._customActionFromPreloadedData);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * If the debugging flight is enabled, automatically add the debug application customizer.
     */
    ApplicationCustomizerLoader.prototype._loadDebugCustomizerIfEnabled = function () {
        var _this = this;
        var debugApplicationCustomizerId = 'd29758ba-0fc0-4eac-bcfd-7fe5a7d0bc32';
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isDebugFlightEnabled &&
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1178 /* SppplatDebugExtension */) &&
            !this._debugCustomizerLoaded &&
            this._isDebugModeOn(/* params */ undefined)) {
            var customAction_1 = _customAction_ClientSideCustomAction__WEBPACK_IMPORTED_MODULE_8__["default"]._tryCreateFromDebugData('ClientSideExtension.ApplicationCustomizer', _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(debugApplicationCustomizerId), // component id
            undefined, // properties,
            0 // Sequence
            );
            if (customAction_1) {
                this._debugCustomizerLoaded = true;
                return _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_3__["_ManifestStore"].instance.requestManifest(debugApplicationCustomizerId).then(function () {
                    _this._createApplicationCustomizer(customAction_1);
                }).catch(function (error) {
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(ApplicationCustomizerLoader._logSource, error);
                });
            }
        }
        return Promise.resolve();
    };
    ApplicationCustomizerLoader.prototype._loadExtensions = function (preloadedCustomActions) {
        this._loadCustomActions(preloadedCustomActions);
        var extensionPromises = [];
        var customActions = this._customActions;
        for (var _i = 0, customActions_1 = customActions; _i < customActions_1.length; _i++) {
            var customAction = customActions_1[_i];
            if (customAction.location === _customAction_CustomActionLocations__WEBPACK_IMPORTED_MODULE_9__["default"].APPLICATION_CUSTOMIZER) {
                extensionPromises.push(this._createApplicationCustomizer(customAction));
            }
        }
        if (extensionPromises.length > 0) {
            this._addExtensionsInitAsKeyMetric();
        }
        return Promise.all(extensionPromises)
            .then(function () { return _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_13__["_PerformanceLogger"].setPerformanceProperty(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_13__["_PerformanceLogger"].extensionsInitializedMetricName); });
    };
    ApplicationCustomizerLoader.prototype._createApplicationCustomizer = function (customAction) {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('ApplicationCustomizer.Create');
        return this._extensionManager.createExtension(customAction.clientSideComponentId.toString(), customAction.clientSideComponentProperties, function (extensionContextParameters) {
            if (!_common_Killswitches__WEBPACK_IMPORTED_MODULE_11__["Killswitches"].isPreallocatedPlaceholdersforApplicationCustomizersKSActive()) {
                if (_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].delayExtensionsLoading) {
                    return _this._applicationCustomizerContextFactory.getApplicationCustomizerContext(customAction);
                }
                else {
                    return _this._applicationCustomizerContextFactory.createApplicationCustomizerContext(customAction, extensionContextParameters, false);
                }
            }
            else {
                return new _ApplicationCustomizerContext__WEBPACK_IMPORTED_MODULE_5__["default"](extensionContextParameters, {
                    sequence: customAction.sequence !== undefined ? customAction.sequence : 65535 // Max Sequence number
                });
            }
        }).then(function (extension) {
            qosMonitor.writeSuccess(_this._createQosExtraData(customAction));
            return extension;
        }).catch(function (error) {
            var err = new Error("Failed to create application customizer '" + customAction.tag + "'. Error information is '" + error.message + "'."); // tslint:disable-line:max-line-length
            qosMonitor.writeExpectedFailure('FailedCreateExtension', error, _this._createQosExtraData(customAction));
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(ApplicationCustomizerLoader._logSource, err);
            throw err;
        });
    };
    ApplicationCustomizerLoader.prototype._addExtensionsInitAsKeyMetric = function () {
        if (_common_Killswitches__WEBPACK_IMPORTED_MODULE_11__["Killswitches"].isAddExtensionsInitPerfMarkerKSActive() ||
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_13__["_PerformanceLogger"].KeyMetrics.indexOf(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_13__["_PerformanceLogger"].extensionsInitializedMetricName) > -1) {
            return;
        }
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_13__["_PerformanceLogger"].addKeyMetric(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_13__["_PerformanceLogger"].extensionsInitializedMetricName);
        /** Ensure we set a value to the key metric to avoid a timeout in perf logger */
        setTimeout(function () {
            if (!_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_13__["_PerformanceLogger"].getPerformanceProperty(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_13__["_PerformanceLogger"].extensionsInitializedMetricName)) {
                var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('ApplicationCustomizerLoader.ExtensionsInitializedTimeout');
                _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_13__["_PerformanceLogger"].setPerformanceProperty(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_13__["_PerformanceLogger"].extensionsInitializedMetricName);
                qosMonitor.writeSuccess();
            }
        }, 15000);
    };
    ApplicationCustomizerLoader.prototype._createQosExtraData = function (customAction) {
        return {
            customAction: customAction.tag
        };
    };
    /**
     * Loads custom actions from both the preloaded data and the query parameter.
     */
    ApplicationCustomizerLoader.prototype._loadCustomActions = function (customActions) {
        this._customActionFromPreloadedData = this._loadCustomActionsFromPreloadedData(customActions);
        this._debugCustomActions = this._loadCustomActionsFromQueryParameter();
    };
    /**
     * Reads the custom actions from the preloaded data and creates ClientSideCustomAction objects for them.
     * @param customActions - Custom actions from the preloaded data.
     * @returns Array with the processed custom actions.
     */
    ApplicationCustomizerLoader.prototype._loadCustomActionsFromPreloadedData = function (customActions) {
        var clientSideCustomActions = [];
        // There are scenarios when server side customActions object may not be present.
        // e.g., the client code gets shipped before the server code.
        // In this case we want to be tolerant and treat that as a condition with no
        // custom actions.
        if (!!customActions) {
            // Initialize all the custom actions.
            for (var _i = 0, customActions_2 = customActions; _i < customActions_2.length; _i++) {
                var customAction = customActions_2[_i];
                if (customAction.location === _customAction_CustomActionLocations__WEBPACK_IMPORTED_MODULE_9__["default"].APPLICATION_CUSTOMIZER) {
                    var clientSideCustomAction = _customAction_ClientSideCustomAction__WEBPACK_IMPORTED_MODULE_8__["default"]._tryCreateFromPreloadedCustomAction(customAction);
                    // A failure to create the custom action will log an error and keep going.
                    if (clientSideCustomAction) {
                        clientSideCustomActions.push(clientSideCustomAction);
                    }
                }
            }
        }
        return clientSideCustomActions;
    };
    ApplicationCustomizerLoader.prototype._hasDebugCustomActions = function () {
        var queryParameters = new URL(window.location.href).searchParams;
        return !!queryParameters.get('customActions') ||
            (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isDebugFlightEnabled &&
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1178 /* SppplatDebugExtension */) && // for debug extension
                this._isDebugModeOn(queryParameters));
    };
    ApplicationCustomizerLoader.prototype._isDebugModeOn = function (queryParameters) {
        if (!queryParameters) {
            queryParameters = new URL(window.location.href).searchParams;
        }
        if (sessionStorage.getItem('spfx-debug')) {
            // Don't load in TAB which monitor for unexpected files
            return !queryParameters.get('istabtest');
        }
        // Enable showing once ?debug is added as engineers typically do
        return !!queryParameters.get('debug');
    };
    ApplicationCustomizerLoader.prototype._loadCustomActionsFromQueryParameter = function () {
        // Example query parameter:
        // ?customActions={"e2d1da94-b7e9-4c57-9551-1e80a11a035b":{"location":"ClientSideExtension.
        //   ListViewCommandSet.ContextMenu","properties":{"message":"Hello"}}}
        //
        // Example deserialized JSON:
        // {
        //   "e2d1da94-b7e9-4c57-9551-1e80a11a035b": {                            // clientSideComponentId
        //     "location": "ClientSideExtension.ListViewCommandSet.ContextMenu",  // location
        //     "properties": { "message": "Hello" }                               // clientSideComponentProperties
        //    }
        // }
        var parameters = new URL(window.location.href).searchParams;
        var parameterValue = parameters.get('customActions');
        var clientSideCustomActions = [];
        if (parameterValue) {
            var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('ApplicationCustomizerLoader.parseQueryParam');
            try {
                var decodedParameterValue = decodeURIComponent(parameterValue);
                var queryValue = JSON.parse(decodedParameterValue);
                var missingManifestIds = [];
                if (queryValue) {
                    for (var _i = 0, _a = Object.keys(queryValue); _i < _a.length; _i++) {
                        var key = _a[_i];
                        var clientSideComponentId = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(key);
                        var location_1 = queryValue[key].location;
                        var properties = queryValue[key].properties;
                        var hostProperties = queryValue[key].hostProperties;
                        var sequence = queryValue[key].sequence;
                        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(clientSideComponentId, 'clientSideComponentId');
                        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(location_1, 'location');
                        if (!_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_3__["SPComponentLoader"].tryGetManifestById(clientSideComponentId.toString())) {
                            missingManifestIds.push(clientSideComponentId);
                            continue; // Try to parse additional custom actions
                        }
                        if (clientSideComponentId && location_1) {
                            var customActions = _customAction_ClientSideCustomAction__WEBPACK_IMPORTED_MODULE_8__["default"]._tryCreateFromDebugData(location_1, clientSideComponentId, properties ? JSON.stringify(properties) : '', sequence, hostProperties ? JSON.stringify(hostProperties) : '');
                            if (customActions) {
                                clientSideCustomActions.push(customActions);
                            }
                        }
                    }
                }
                if (missingManifestIds.length > 0) {
                    this._processMissingManifestsErrors(missingManifestIds, qosMonitor);
                }
                else {
                    qosMonitor.writeSuccess();
                }
            }
            catch (e) {
                this._processQueryParamParseErrors(e, parameterValue, qosMonitor);
            }
        }
        return clientSideCustomActions;
    };
    ApplicationCustomizerLoader.prototype._processMissingManifestsErrors = function (missingManifestIds, qosMonitor) {
        var errorMessage = 'Custom action component ids are specified by query parameters but ' +
            'matching manifests cannot be found.';
        var error = new Error(errorMessage + ' Ids: ' + missingManifestIds.join(', '));
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(ApplicationCustomizerLoader._logSource, error, 'parseCustomActionsQueryParameter');
        // NOTE: Normally SPFx code does not use console.error(), but in this scenario we are
        // talking directly to a developer.  They really need to see this string without the
        // truncating/scrubbing that is normally performed by the Dev Dashboard "Trace" tab.
        console.error(error.message);
        qosMonitor.writeExpectedFailure('ManifestNotFound', error);
    };
    ApplicationCustomizerLoader.prototype._processQueryParamParseErrors = function (error, parameterValue, qosMonitor) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(ApplicationCustomizerLoader._logSource, new Error('Failed to parse the "customActions" URL query parameter:' + error.message));
        // NOTE: Normally SPFx code does not use console.error(), but in this scenario we are
        // talking directly to a developer.  They really need to see this string without the
        // truncating/scrubbing that is normally performed by the Dev Dashboard "Trace" tab.
        console.error('The "customActions" URL query parameter is improperly formatted: '
            + decodeURIComponent(parameterValue));
        qosMonitor.writeExpectedFailure('ParseFailure', error);
    };
    ApplicationCustomizerLoader._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('ApplicationCustomizerLoader');
    return ApplicationCustomizerLoader;
}());
/* harmony default export */ __webpack_exports__["default"] = (ApplicationCustomizerLoader);


/***/ }),

/***/ "S2tz":
/*!**********************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/utilities-error/0.10.2/node_modules/@ms/utilities-error/lib/CustomError.js ***!
  \**********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base class for custom errors.
 * Derive sub-classes from this class to implement errors which support
 * strongly-typed constructors and visible fields.
 *
 * The pattern to extend Error properly is documented here:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 */
var CustomError = /** @class */ (function () {
    function CustomError(props) {
        if (props === void 0) { props = {}; }
        // The real error will be returned.
        var error = new Error(props.message || props.innerError && props.innerError.message);
        this.message = error.message;
        this.innerError = props.innerError;
        // Avoid using assign since some platforms (native) do not enumerate prototyped objects.
        for (var key in this) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                // @ts-ignore TOO BAD
                error[key] = this[key];
            }
        }
        var customErrorType = Object.getPrototypeOf(this);
        // @ts-ignore
        if (Error.captureStackTrace) {
            // @ts-ignore
            Error.captureStackTrace(error, customErrorType);
        }
        if (Object.setPrototypeOf) {
            // Force the error instance to use the custom prototype.
            // This works on all supported browsers, except PhantomJS.
            Object.setPrototypeOf(error, customErrorType);
            return error;
        }
    }
    return CustomError;
}());
exports.CustomError = CustomError;
// For Error, need to manually extend the built-in type since TypeScript does not emit the necessary output.
if (Object.setPrototypeOf) {
    // This works on all supported browsers, except PhantomJS.
    CustomError.prototype = Object.create(Error.prototype, {
        constructor: {
            value: Error,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    Object.setPrototypeOf(CustomError, Error);
}
//# sourceMappingURL=CustomError.js.map

/***/ }),

/***/ "SClb":
/*!**********************************************!*\
  !*** ./lib/navigator/NavigationDataError.js ***!
  \**********************************************/
/*! exports provided: NavigationErrorCode, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationErrorCode", function() { return NavigationErrorCode; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_Killswitches__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/Killswitches */ "dQCu");
// Copyright (c) Microsoft. All rights reserved.




/**
 * Web part error codes.
 *
 * @internal
 */
var NavigationErrorCode;
(function (NavigationErrorCode) {
    /**
     * Failure to fetch navigation data.
     */
    NavigationErrorCode[NavigationErrorCode["fetchData"] = 0] = "fetchData";
    /**
     * Failure to parse navigation data.
     */
    NavigationErrorCode[NavigationErrorCode["parseData"] = 1] = "parseData";
    /**
     * Unknown failure
     */
    NavigationErrorCode[NavigationErrorCode["unknown"] = 2] = "unknown";
})(NavigationErrorCode || (NavigationErrorCode = {}));
/**
 * Represents the contract of a Navigation Data Error.
 *
 * @internal
 */
var NavigationDataError = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](NavigationDataError, _super);
    function NavigationDataError(errorCode, errorMessage, innerError, isExpected, errorPayload) {
        if (isExpected === void 0) { isExpected = false; }
        var _this = _super.call(this, NavigationErrorCode[errorCode], errorMessage, errorPayload) || this;
        // Manually set the prototype, as we can no longer extend built-in classes like Error, Array, Map, etc
        // tslint:disable-next-line:max-line-length
        // [https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work](https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work)
        //
        // Note: the prototype must also be set on any classes which extend this one
        _this.__proto__ = NavigationDataError_1.prototype; // tslint:disable-line:no-any
        _this._errorId = errorCode;
        _this.innerError = innerError;
        _this._isExpected = isExpected;
        return _this;
    }
    NavigationDataError_1 = NavigationDataError;
    /**
     * Utility function to create an error response.
     * @param errorCode - Represents the navigation error code.
     * @param innerError - Represents the inner error.
     *
     * @returns An error object.
     */
    NavigationDataError.createNavigationError = function (errorCode, innerError) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(innerError, 'innerError');
        if (_common_Killswitches__WEBPACK_IMPORTED_MODULE_3__["Killswitches"].isNavigationDataErrorKSActive()) {
            return innerError;
        }
        var isExpected = NavigationDataError_1._isExpectedError(errorCode);
        var errorTemplate = NavigationDataError_1._errorTemplate(errorCode);
        var errorMessage = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Text"].format(errorTemplate, innerError.message);
        return new NavigationDataError_1(errorCode, errorMessage, innerError, isExpected);
    };
    NavigationDataError._isExpectedError = function (errorCode) {
        return errorCode === NavigationErrorCode.parseData;
    };
    NavigationDataError._errorTemplate = function (errorCode) {
        return NavigationDataError_1._errorCodeToTemplateMap[errorCode] || 'Failed to navigate. Error: {0}';
    };
    Object.defineProperty(NavigationDataError.prototype, "id", {
        /**
         * Gets the error Id.
         */
        get: function () {
            return this._errorId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationDataError.prototype, "category", {
        /**
         * Gets the error category.
         */
        get: function () {
            return 'NavigationDataError';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationDataError.prototype, "isExpected", {
        /**
         * Gets a value indicating whether the error is expected.
         */
        get: function () {
            return this._isExpected;
        },
        enumerable: true,
        configurable: true
    });
    var NavigationDataError_1;
    NavigationDataError._errorCodeToTemplateMap = new Map([
        [NavigationErrorCode.fetchData, 'Failed to retrieve navigation data. Error: {0}'],
        [NavigationErrorCode.parseData, 'Failed to parse navigation data. Error: {0}']
    ]);
    NavigationDataError = NavigationDataError_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["sealed"]
    ], NavigationDataError);
    return NavigationDataError;
}(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["SPError"]));
/* harmony default export */ __webpack_exports__["default"] = (NavigationDataError);


/***/ }),

/***/ "SE01":
/*!***************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/telemetry-manager/0.12.6/node_modules/@ms/telemetry-manager/lib/utilities/CircularBuffer.js ***!
  \***************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CircularBuffer = /** @class */ (function () {
    function CircularBuffer(size) {
        if (size <= 0) {
            throw new Error('Size must be positive');
        }
        this._size = size;
        this._buffer = new Array(size);
        this._length = 0;
        this._head = -1;
    }
    CircularBuffer.prototype.push = function (item) {
        if (this._length < this._size) {
            this._length++;
        }
        this._head++;
        if (this._head === this._size) {
            this._head = 0;
        }
        this._buffer[this._head] = item;
    };
    CircularBuffer.prototype.popOldest = function () {
        if (this._length === 0) {
            return null;
        }
        var tail = (this._head - this._length + 1 + this._size) % this._size;
        this._length--;
        return this._buffer[tail];
    };
    return CircularBuffer;
}());
exports.CircularBuffer = CircularBuffer;
//# sourceMappingURL=CircularBuffer.js.map

/***/ }),

/***/ "TNAb":
/*!********************************************!*\
  !*** ./lib/navigator/INavigationResult.js ***!
  \********************************************/
/*! exports provided: NavigationOperation, NavigationUnsupportedReason */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationOperation", function() { return NavigationOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationUnsupportedReason", function() { return NavigationUnsupportedReason; });
/**
 * Operation that gets executed from a navigation request.
 * This is used by SPFx applications to understand what are their next operations after navigating to a different page.
 *
 * @internal
 */
var NavigationOperation;
(function (NavigationOperation) {
    /**
     * This operation updates the SPFx context but doesn't act on the application.
     * This includes extensions lifecycle operations, changing the PageContext object, etc.
     */
    NavigationOperation[NavigationOperation["UpdateContext"] = 0] = "UpdateContext";
    /**
     * This operation loads a new SPFx application.
     * This implies that the previous application will be disposed.
     */
    NavigationOperation[NavigationOperation["LoadApplication"] = 1] = "LoadApplication";
    /**
     * This operation happens when the URL doesn't map to a SPFx application or the preloaded data is in a corrupted
     * state.
     * The current application is responsible for handling this case.
     * This can mean open the URL in a different tab/window, going to error.aspx, or displaying an error in the console.
     */
    NavigationOperation[NavigationOperation["Unsupported"] = 2] = "Unsupported";
})(NavigationOperation || (NavigationOperation = {}));
/**
 * Specific reasons navigations may be unsupported.
 *
 * @internal
 */
var NavigationUnsupportedReason;
(function (NavigationUnsupportedReason) {
    /**
     * Navigation was unsupported because the target url was not an SPFX application.
     */
    NavigationUnsupportedReason[NavigationUnsupportedReason["NonSPFX"] = 0] = "NonSPFX";
    /**
     * Since our applications aren't fully optimized to cleanup resources
     * we have a cap on the number of transitions before we should trigger
     * a full reload in order to flush the memory.
     */
    NavigationUnsupportedReason[NavigationUnsupportedReason["TransitionsExceeded"] = 1] = "TransitionsExceeded";
    /**
     * The target url points to a valid SPFX app however the locale is different
     * and we need to do a full reload to get scripts in the new locale.
     */
    NavigationUnsupportedReason[NavigationUnsupportedReason["LocaleChange"] = 2] = "LocaleChange";
    /**
     * App to App transitions have not yet been enabled for this user.
     */
    NavigationUnsupportedReason[NavigationUnsupportedReason["AppTransitionNotEnabled"] = 3] = "AppTransitionNotEnabled";
})(NavigationUnsupportedReason || (NavigationUnsupportedReason = {}));


/***/ }),

/***/ "U3aa":
/*!************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/dataSources/web/WebTemplateType.js ***!
  \************************************************************************************************************************************************************************************************/
/*! exports provided: WebTemplateType, isTeamSiteLike, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _interfaces_WebTemplateType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../interfaces/WebTemplateType */ "vtqB");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebTemplateType", function() { return _interfaces_WebTemplateType__WEBPACK_IMPORTED_MODULE_0__["WebTemplateType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTeamSiteLike", function() { return _interfaces_WebTemplateType__WEBPACK_IMPORTED_MODULE_0__["isTeamSiteLike"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _interfaces_WebTemplateType__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/**
     * DO NOT USE - moved to interfaces for better import location
     * @deprecated as of version 12.15.0
     */


//# sourceMappingURL=WebTemplateType.js.map

/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "VkOs":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/pageChrome/SPPageChrome.module.css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, "body{height:100vh;margin:0;padding:0}.SPPageChrome{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;height:100%}.SPPageChrome.withExternalSuiteNav{height:calc(100% - 50px)}#SuiteNavPlaceHolder{background-color:#333;width:100%;z-index:5}#SuiteNavPlaceHolder:empty{display:none}.SPPageChrome-app,.SPPageChrome-app>div{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;display:-webkit-box;display:-ms-flexbox;display:flex;max-width:100%}.SPPageChromeNoFlexbox-app{position:absolute;right:0;bottom:0;left:0;overflow:visible}.spAppAndPropertyPanelContainer{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;height:100%}.spAppAndPropertyPanelContainer .SPPageChrome-app{min-width:0}.spAppAndPropertyPanelContainer .spPropertyPaneContainer{-ms-flex-negative:0;flex-shrink:0}.spPropertyPaneContainer{width:0;position:relative;z-index:999}.spPropertyPaneContainerNoFlexbox{top:50px;position:fixed;right:-340px;bottom:0;z-index:999}.spPageContentTransition_8a76ec2e{transition:width 367ms cubic-bezier(.1,.9,.2,1);-webkit-transition:width 367ms cubic-bezier(.1,.9,.2,1)}@media print{#RecommendedItems,.commandBarWrapper,.headerViewClass,div[data-automationid=SimpleFooter],div[data-sp-feature-tag=\"Site header host\"],div[data-sp-feature-tag=Comments],div[data-sp-placeholder=Bottom],div[data-sp-placeholder=Top]{display:none}#SuiteNavPlaceHolder,.ms-HubNav{display:none!important}}", ""]);



/***/ }),

/***/ "VytQ":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/dataSources/base/GetDataError.js ***!
  \**********************************************************************************************************************************************************************************************/
/*! exports provided: GetDataError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetDataError", function() { return GetDataError; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _ms_utilities_error_lib_ApiError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/utilities-error/lib/ApiError */ "PcWP");
/* harmony import */ var _ms_utilities_error_lib_ApiError__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_utilities_error_lib_ApiError__WEBPACK_IMPORTED_MODULE_1__);


var GetDataError = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GetDataError, _super);
    function GetDataError(props) {
        var _this = this;
        var _a = props.errorData, _b = _a === void 0 ? {
            status: 0,
            code: ''
        } : _a, _c = _b.message, errorDataMessage = _c === void 0 ? undefined : _c, _d = _b.correlationId, correlationId = _d === void 0 ? undefined : _d, _e = _b.code, code = _e === void 0 ? undefined : _e, errorData = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_b, ["message", "correlationId", "code"]);
        var message = typeof errorDataMessage === 'object' ?
            errorDataMessage ?
                typeof errorDataMessage.value === 'string' ?
                    // Might be a localized error message structure.
                    errorDataMessage.value :
                    JSON.stringify(errorDataMessage) :
                "" + errorDataMessage :
            errorDataMessage;
        var finalProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ correlationId: correlationId,
            code: code,
            message: message }, props);
        _this = _super.call(this, finalProps) || this;
        _this.errorData = props.errorData;
        // Copy over all props from the `errorData`, so that this `Error` instance
        // appears to implement the same contract.
        for (var _i = 0, _f = Object.keys(errorData); _i < _f.length; _i++) {
            var key = _f[_i];
            _this[key] = errorData[key];
        }
        return _this;
    }
    return GetDataError;
}(_ms_utilities_error_lib_ApiError__WEBPACK_IMPORTED_MODULE_1__["ApiError"]));

//# sourceMappingURL=GetDataError.js.map

/***/ }),

/***/ "WA4G":
/*!*******************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/killswitch/Killswitch.js ***!
  \*******************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @ms/odsp-utilities/killswitch/Killswitch.js
var pkg = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
module.exports = {}
module.exports.Killswitch = pkg.Killswitch;
module.exports.getKillSwitch = pkg.getKillSwitch;
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "X+PM":
/*!*********************************************!*\
  !*** external "@microsoft/sp-page-context" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_X_PM__;

/***/ }),

/***/ "Y/uW":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/providers/theming/ThemeInitializer.js ***!
  \***************************************************************************************************************************************************************************************************/
/*! exports provided: flushStyles, ThemeInitializer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeInitializer", function() { return ThemeInitializer; });
/* harmony import */ var _ms_odsp_utilities_lib_features_Features__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities/lib/features/Features */ "Y2fW");
/* harmony import */ var _ms_odsp_utilities_lib_features_Features__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_features_Features__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_load_themed_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");
/* harmony import */ var _microsoft_load_themed_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_load_themed_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flushStyles", function() { return _microsoft_load_themed_styles__WEBPACK_IMPORTED_MODULE_1__["flush"]; });

/* harmony import */ var _ThemeProviderFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThemeProviderFactory */ "gdPU");
/* harmony import */ var _uifabric_styling_lib_styles_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @uifabric/styling/lib/styles/theme */ "9259");
/* harmony import */ var _uifabric_styling_lib_styles_theme__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_uifabric_styling_lib_styles_theme__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _FabricCustomizations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FabricCustomizations */ "L9tx");
/* harmony import */ var _ThemeUtilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeUtilities */ "ApOT");
// OneDrive:IgnoreCodeCoverage







var AsyncLoadStyles = { ODB: 141, ODC: null, Fallback: false };
function setFabricConfig() {
    var fabricConfig = window['FabricConfig'] = window['FabricConfig'] || {};
    fabricConfig.fontBaseUrl = '';
}
/**
 * Chooses the appropriate method of loading theme data for the current page.
 * As soon as the theme data is available, it will be set via the loadTheme
 * method of load-themed-styles.
 */
var ThemeInitializer = /** @class */ (function () {
    function ThemeInitializer() {
    }
    /**
     * Uses context information to load the appropriate theme.
     */
    ThemeInitializer.initializeTheme = function (injectedProviders, pageContext, forceUpdate) {
        window["__loadTheme"] = _uifabric_styling_lib_styles_theme__WEBPACK_IMPORTED_MODULE_3__["loadTheme"]; // so we can access it in console for testing purposes
        setFabricConfig();
        var _spModuleLink = window['_spModuleLink'];
        if (_ms_odsp_utilities_lib_features_Features__WEBPACK_IMPORTED_MODULE_0___default.a.isFeatureEnabled(AsyncLoadStyles) &&
            _spModuleLink && _spModuleLink.libraries && _spModuleLink.libraries.length > 0) {
            // since we have css concatenation now, we only need async loadStyles() for libmode, which is not covered by css concatenations
            Object(_microsoft_load_themed_styles__WEBPACK_IMPORTED_MODULE_1__["configureRunMode"])(1 /* async */);
        }
        // Apply Fabric component Customizations, which are independent of the theme
        Object(_FabricCustomizations__WEBPACK_IMPORTED_MODULE_4__["applyPltFabricCustomizations"])();
        // If there is a themeProvider, request and load the theme.
        var themeProvider = Object(_ThemeProviderFactory__WEBPACK_IMPORTED_MODULE_2__["getThemeProvider"])(injectedProviders, pageContext);
        if (themeProvider) {
            return themeProvider.loadFullFormattedThemeData(forceUpdate).then(function (value) {
                var theme = value || {};
                Object(_ThemeUtilities__WEBPACK_IMPORTED_MODULE_5__["spLoadTheme"])(theme);
                return value;
            });
        }
        else {
            var theme = {};
            Object(_ThemeUtilities__WEBPACK_IMPORTED_MODULE_5__["spLoadTheme"])(theme);
        }
    };
    return ThemeInitializer;
}());

//# sourceMappingURL=ThemeInitializer.js.map

/***/ }),

/***/ "Y2fW":
/*!***************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/features/Features.js ***!
  \***************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @ms/odsp-utilities/features/Features.js
var pkg = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
module.exports = {}
module.exports.default = pkg.Features;
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "Yr1X":
/*!***********************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/telemetry-manager/0.12.6/node_modules/@ms/telemetry-manager/lib/events/Verbose.event.js ***!
  \***********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OneDrive:IgnoreCodeCoverage
Object.defineProperty(exports, "__esModule", { value: true });
var SingleEventBase_1 = __webpack_require__(/*! ../SingleEventBase */ "8WDM");
var Trace_event_1 = __webpack_require__(/*! ./Trace.event */ "Crvl");
exports.Verbose = SingleEventBase_1.createSingleEvent({
    eventName: 'Verbose,Trace,',
    shortEventName: 'Verbose',
    requiresParent: false
}, {
    name: {
        isKey: true,
        type: 1 /* String */
    }
}, Trace_event_1.Trace);
//# sourceMappingURL=Verbose.event.js.map

/***/ }),

/***/ "ZFc5":
/*!***********************************************!*\
  !*** external "@microsoft/sp-extension-base" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ZFc5__;

/***/ }),

/***/ "Zxcj":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/DetailsColumn.styles.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: DetailsColumnStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsColumnStyles", function() { return DetailsColumnStyles; });
var DetailsColumnStyles = function (props) {
    var theme = props.theme;
    return {
        root: {
            height: 32
        },
        cellName: {
            fontWeight: theme.fonts.small.fontWeight,
            fontSize: theme.fonts.small.fontSize
        },
        filterChevron: {
            fontSize: theme.fonts.small.fontSize,
            paddingLeft: 4
        }
    };
};
//# sourceMappingURL=DetailsColumn.styles.js.map

/***/ }),

/***/ "bTkC":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/dataSources/base/DataRequestor.js ***!
  \***********************************************************************************************************************************************************************************************/
/*! exports provided: isQosEndSchemaOverride, DataRequestor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isQosEndSchemaOverride", function() { return isQosEndSchemaOverride; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataRequestor", function() { return DataRequestor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/odsp-utilities/lib/async/Promise */ "MS/P");
/* harmony import */ var _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_odsp_utilities_lib_async_Retry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/odsp-utilities/lib/async/Retry */ "q/xN");
/* harmony import */ var _ms_odsp_utilities_lib_async_Retry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_async_Retry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_odsp_utilities_lib_logging_events_Api_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/odsp-utilities/lib/logging/events/Api.event */ "2mC7");
/* harmony import */ var _ms_odsp_utilities_lib_logging_events_Api_event__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_logging_events_Api_event__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_odsp_utilities_lib_logging_events_Engagement_event__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/odsp-utilities/lib/logging/events/Engagement.event */ "yEhF");
/* harmony import */ var _ms_odsp_utilities_lib_logging_events_Engagement_event__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_logging_events_Engagement_event__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ms_odsp_utilities_lib_logging_events_Qos_event__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ms/odsp-utilities/lib/logging/events/Qos.event */ "/TBc");
/* harmony import */ var _ms_odsp_utilities_lib_logging_events_Qos_event__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_logging_events_Qos_event__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ms_odsp_utilities_lib_logging_rumone_RUMOneLogger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ms/odsp-utilities/lib/logging/rumone/RUMOneLogger */ "H6KY");
/* harmony import */ var _ms_odsp_utilities_lib_logging_rumone_RUMOneLogger__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_logging_rumone_RUMOneLogger__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ms_utilities_error_lib_ApiError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ms/utilities-error/lib/ApiError */ "PcWP");
/* harmony import */ var _ms_utilities_error_lib_ApiError__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ms_utilities_error_lib_ApiError__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ms_odsp_utilities_lib_uri_SimpleUri__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ms/odsp-utilities/lib/uri/SimpleUri */ "DYAW");
/* harmony import */ var _ms_odsp_utilities_lib_uri_SimpleUri__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_uri_SimpleUri__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ms_odsp_utilities_lib_logging_RequestDurationLoggingHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ms/odsp-utilities/lib/logging/RequestDurationLoggingHelper */ "5BLP");
/* harmony import */ var _ms_odsp_utilities_lib_logging_RequestDurationLoggingHelper__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_logging_RequestDurationLoggingHelper__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ServerConnection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ServerConnection */ "mUIx");
/* harmony import */ var _GetDataError__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./GetDataError */ "VytQ");












var currentWindow = typeof window !== 'undefined' ? window : undefined;
var performance = currentWindow && currentWindow.performance;
function isQosEndSchemaOverride(item) {
    return typeof item === 'object';
}
var DataRequestor = /** @class */ (function () {
    function DataRequestor(params, dependencies) {
        this._pageContext = dependencies ? dependencies.pageContext : params.pageContext;
        this._qosName = params.qosName;
        this._apiEvent = dependencies && dependencies.apiEvent || _ms_odsp_utilities_lib_logging_events_Api_event__WEBPACK_IMPORTED_MODULE_3___default.a;
        this._engagement = dependencies && dependencies.engagement || _ms_odsp_utilities_lib_logging_events_Engagement_event__WEBPACK_IMPORTED_MODULE_4__["Engagement"];
        this._normalizeErrors = !!params.normalizeErrors;
    }
    DataRequestor.parseJSON = function (responseText) {
        return responseText && JSON.parse(responseText) || undefined;
    };
    DataRequestor.prototype.getData = function (options) {
        var _this = this;
        var url = options.url, _a = options.parseResponse, parseResponse = _a === void 0 ? DataRequestor.parseJSON : _a, qosExtraData = options.qosExtraData, qosHandler = options.qosHandler, successQosHandler = options.successQosHandler, customQosLogger = options.customQosLogger, _b = options.additionalPostData, additionalPostData = _b === void 0 ? '' : _b, contentType = options.contentType, _c = options.method, method = _c === void 0 ? 'POST' : _c, _d = options.maxRetries, maxRetries = _d === void 0 ? 0 : _d, responseType = options.responseType, onUploadProgress = options.onUploadProgress, timeout = options.timeout, specifiedAuthToken = options.authToken, _e = options.noTimeoutInLastRetry, noTimeoutInLastRetry = _e === void 0 ? false : _e;
        var additionalHeaders = options.additionalHeaders, _f = options.crossSiteCollectionCall, crossSiteCollectionCall = _f === void 0 ? false : _f, _g = options.noRedirect, noRedirect = _g === void 0 ? false : _g, _h = options.needsRequestDigest, needsRequestDigest = _h === void 0 ? true : _h;
        var shouldRetry = true;
        var pageContext = this._pageContext;
        var getDataPromise = function (authToken) {
            // Add Authorization header to request if authToken exists on _spPageContext
            // and an Authorization header doesn't already exist on the request.
            if (authToken) {
                var authorizationHeaderValue = "Bearer " + authToken;
                // Add Authorization header if it doesn't exist already.
                if (additionalHeaders) {
                    var authorizationHeaderSpecified = false;
                    for (var headerKey in additionalHeaders) {
                        if (headerKey) {
                            if (headerKey.toLowerCase() === 'authorization') {
                                authorizationHeaderSpecified = true;
                            }
                        }
                    }
                    if (!authorizationHeaderSpecified) {
                        additionalHeaders['Authorization'] = authorizationHeaderValue;
                    }
                }
                else {
                    additionalHeaders = {
                        'Authorization': authorizationHeaderValue
                    };
                }
                // Since Authorization header is present, the request is cross-origin.
                crossSiteCollectionCall = true;
                needsRequestDigest = false;
                noRedirect = true;
            }
            var serverConnection = new _ServerConnection__WEBPACK_IMPORTED_MODULE_10__["default"](tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, (pageContext ? {
                webServerRelativeUrl: pageContext.webServerRelativeUrl,
                webAbsoluteUrl: crossSiteCollectionCall ? pageContext.webAbsoluteUrl : undefined,
                formDigest: {
                    // Pull current digest state from the page.
                    // This helps initial requests avoid extra server calls.
                    // Unit tests will need to spoof this in order to avoid the need to mock the digest response.
                    serverTime: pageContext.serverTime,
                    updateFormDigestPageLoaded: pageContext.updateFormDigestPageLoaded,
                    formDigestValue: pageContext.formDigestValue,
                    formDigestTimeoutSeconds: pageContext.formDigestTimeoutSeconds
                }
            } : {}), { needsRequestDigest: needsRequestDigest, engagement: _this._engagement, operationName: _this._qosName }));
            var qosNames = [];
            if (_this._qosName) {
                qosNames.push(_this._qosName);
            }
            if (options.qosName) {
                qosNames.push(options.qosName);
            }
            var qosName = qosNames.join('.');
            var logCustomQos = function (qosData) {
                if (customQosLogger) {
                    customQosLogger(qosData);
                }
            };
            var currentOrigin = currentWindow && currentWindow.location && new _ms_odsp_utilities_lib_uri_SimpleUri__WEBPACK_IMPORTED_MODULE_8__["SimpleUri"](currentWindow.location.href).authority;
            var targetOrigin = new _ms_odsp_utilities_lib_uri_SimpleUri__WEBPACK_IMPORTED_MODULE_8__["SimpleUri"](url).authority;
            var isCanceled;
            var lastApiEvent;
            var serviceWorkerDataSource;
            /* tslint:disable: no-any */
            var onExecute = function (complete, error) {
                /* tslint:enable: no-any */
                // forward declaration to shut up linter
                var doGetData;
                var onDataSuccess = function (apiEvent, requestPerformanceStartTime) { return function (serverData) {
                    var data;
                    var response = serverData.getResponseText();
                    serviceWorkerDataSource = serverData.getServiceWorkerDataSourceHeader();
                    var performanceMetrics = Object(_ms_odsp_utilities_lib_logging_RequestDurationLoggingHelper__WEBPACK_IMPORTED_MODULE_9__["getRequestEntryDurationMetrics"])(url, requestPerformanceStartTime);
                    var extraData = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, (qosExtraData || {}), { needsRequestDigest: needsRequestDigest, hasAuthToken: !!authToken, isCrossOrigin: !!currentOrigin && currentOrigin !== targetOrigin, CorrelationId: serverData.getCorrelationId(), HttpStatus: serverData.getStatus(), serviceWorkerDataSource: serviceWorkerDataSource || undefined, rawRequestDuration: performanceMetrics.duration, performanceEntry: JSON.stringify(performanceMetrics), serviceWorkerFetchInfo: serverData.getServiceWorkerFetchInfoFromHeader() || undefined });
                    var parsedResponse = false;
                    try {
                        var customQos = void 0;
                        if (isBlobResponse(responseType, response)) {
                            data = response;
                        }
                        else {
                            // This line could throw if the response does not have the expected data type.
                            // For example, there is at least one handler (SpoSuiteLinks.ashx) that will return
                            // an HTML error page rather than the expected JSON on error. We should count that case
                            // as a failure even though *something* was successfully returned.
                            data = parseResponse(response, serverData);
                            if (successQosHandler) {
                                var customQosResult = successQosHandler(data);
                                customQos = typeof customQosResult === 'string' ? {
                                    resultCode: customQosResult
                                } : customQosResult;
                            }
                        }
                        parsedResponse = true;
                        var qosData = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ resultType: _ms_odsp_utilities_lib_logging_events_Qos_event__WEBPACK_IMPORTED_MODULE_5__["ResultTypeEnum"].Success, extraData: extraData }, (customQos || {}));
                        apiEvent.end(qosData);
                        logCustomQos(qosData);
                    }
                    catch (ex) {
                        // The response did not parse properly.
                        var qosData = {
                            resultType: _ms_odsp_utilities_lib_logging_events_Qos_event__WEBPACK_IMPORTED_MODULE_5__["ResultTypeEnum"].Failure,
                            resultCode: 'InvalidJSON',
                            error: (typeof ex === 'object' ? JSON.stringify(ex) : ex),
                            extraData: extraData
                        };
                        apiEvent.end(qosData);
                        logCustomQos(qosData);
                        // let the caller know there was an error in parsing the data
                        error();
                    }
                    // pass the response to the caller
                    if (parsedResponse) {
                        try {
                            complete(data);
                        }
                        catch (ex) {
                            // the caller failed to handle the data
                            // no-op
                        }
                    }
                    serverConnection = undefined;
                }; };
                var onError = function (apiEvent, requestPerformanceStartTime) { return function (serverData, requestError) {
                    var performanceMetrics = Object(_ms_odsp_utilities_lib_logging_RequestDurationLoggingHelper__WEBPACK_IMPORTED_MODULE_9__["getRequestEntryDurationMetrics"])(url, requestPerformanceStartTime);
                    var extraData = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, (qosExtraData || {}), { needsRequestDigest: needsRequestDigest, hasAuthToken: !!authToken, isCrossOrigin: !!currentOrigin && currentOrigin !== targetOrigin, rawRequestDuration: performanceMetrics.duration, performanceEntry: JSON.stringify(performanceMetrics) });
                    if (!serverData) {
                        var qosData = void 0;
                        if (isCanceled) {
                            // serverData will be undefined if the request was aborted
                            qosData = {
                                resultType: _ms_odsp_utilities_lib_logging_events_Qos_event__WEBPACK_IMPORTED_MODULE_5__["ResultTypeEnum"].ExpectedFailure,
                                resultCode: 'RequestAborted',
                                extraData: extraData
                            };
                        }
                        else {
                            var code = 'Unknown';
                            var isExpected = true;
                            var status_1 = 0;
                            if (requestError) {
                                if (requestError instanceof _ms_utilities_error_lib_ApiError__WEBPACK_IMPORTED_MODULE_7__["ApiError"]) {
                                    code = requestError.code;
                                    isExpected = requestError.isExpected;
                                    status_1 = -1;
                                }
                            }
                            var errorData = {
                                status: status_1,
                                code: ''
                            };
                            // Request completed, but did not return data or a useful status code. This can happen for any number of reasons:
                            // CORS Rejection (we could make a guess about this by comparing url origins)
                            // Request blocked by client (e.g. extension)
                            // Request blocked by firewall
                            qosData = {
                                resultType: isExpected ?
                                    _ms_odsp_utilities_lib_logging_events_Qos_event__WEBPACK_IMPORTED_MODULE_5__["ResultTypeEnum"].ExpectedFailure :
                                    _ms_odsp_utilities_lib_logging_events_Qos_event__WEBPACK_IMPORTED_MODULE_5__["ResultTypeEnum"].Failure,
                                resultCode: code,
                                extraData: extraData
                            };
                            // Ensure that Promises that wrap the data request always complete.
                            error(_this._normalizeErrors ? new _GetDataError__WEBPACK_IMPORTED_MODULE_11__["GetDataError"]({
                                errorData: errorData,
                                innerError: requestError
                            }) : errorData);
                        }
                        apiEvent.end(qosData);
                        logCustomQos(qosData);
                        return;
                    }
                    var correlationId = serverData.getCorrelationId();
                    var groupThrottle = serverData.getGroupThrottle();
                    var MSCorrelationVector = serverData.getMSCorrelationVector();
                    var status = serverData.getStatus();
                    extraData = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, extraData, { CorrelationId: correlationId, HttpStatus: status, GroupThrottle: groupThrottle, MSCorrelationVector: MSCorrelationVector });
                    var resultType = _ms_odsp_utilities_lib_logging_events_Qos_event__WEBPACK_IMPORTED_MODULE_5__["ResultTypeEnum"].Failure;
                    var isOffline = typeof navigator !== 'undefined' && navigator.onLine === false;
                    if (status === 403 ||
                        status === 404 ||
                        status === 429 ||
                        status === 503 ||
                        status === -1 ||
                        (status === 0 && isOffline)) {
                        // no need to retry authentication errors...
                        // no need to retry document not found errors...
                        // no need to retry resource throttling errors... (we need to back away from it. 503 is SQL throttling)
                        // no need to retry if the request was missing parameters
                        // no need to retry if we are offline
                        shouldRetry = false;
                        resultType = _ms_odsp_utilities_lib_logging_events_Qos_event__WEBPACK_IMPORTED_MODULE_5__["ResultTypeEnum"].ExpectedFailure;
                    }
                    var parseQosError = function (response) {
                        var errorData = undefined;
                        if (typeof response === 'object' && typeof response.status === 'number') {
                            // Test to see if the response is already an IErrorData
                            errorData = response;
                        }
                        else if (typeof response === 'string') {
                            var parsedData = undefined;
                            try {
                                parsedData = JSON.parse(response);
                            }
                            catch (ex) {
                                // np-op
                            }
                            if (parsedData) {
                                if (typeof parsedData.error === 'string') {
                                    if (parsedData.error_description) {
                                        errorData = {
                                            code: "-1," + parsedData.error,
                                            message: parsedData.error_description
                                        };
                                    }
                                    else {
                                        errorData = {
                                            message: parsedData.error
                                        };
                                    }
                                }
                                else {
                                    errorData = (parsedData.error || parsedData['odata.error'] || { responseData: parsedData });
                                }
                            }
                        }
                        errorData = (errorData || {});
                        errorData.status = status;
                        var errorWithRedirect = errorData;
                        var payloadRedirectUrl = errorWithRedirect['@error.redirectUrl'];
                        var redirectUrl = serverData.getRedirectUrl() || payloadRedirectUrl;
                        if (redirectUrl) {
                            // If there is a process to handle the error, then it's expected.
                            resultType = _ms_odsp_utilities_lib_logging_events_Qos_event__WEBPACK_IMPORTED_MODULE_5__["ResultTypeEnum"].ExpectedFailure;
                        }
                        errorData.redirectUrl = redirectUrl;
                        if (correlationId) {
                            errorData.correlationId = correlationId;
                        }
                        if (groupThrottle) {
                            errorData.groupThrottle = groupThrottle;
                        }
                        var resultCode = "[" + status.toString() + "] " + (errorData.code || 'Unknown');
                        var qosEndOverride;
                        if (qosHandler) {
                            var qosHandlerResult = qosHandler(errorData);
                            if (!isQosEndSchemaOverride(qosHandlerResult)) {
                                resultCode = qosHandlerResult;
                            }
                            else {
                                qosEndOverride = qosHandlerResult;
                            }
                            if (status === 500 && (resultCode === 'DefaultDoclibNotFound' || resultCode === 'PrefetchWebMismatch')) {
                                shouldRetry = false;
                                resultType = _ms_odsp_utilities_lib_logging_events_Qos_event__WEBPACK_IMPORTED_MODULE_5__["ResultTypeEnum"].ExpectedFailure;
                            }
                        }
                        var errorMessage = JSON.stringify(errorData);
                        var qosData = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ resultType: resultType, error: errorMessage, resultCode: resultCode, extraData: extraData }, (qosEndOverride || {}));
                        apiEvent.end(qosData);
                        logCustomQos(qosData);
                        error(_this._normalizeErrors ? new _GetDataError__WEBPACK_IMPORTED_MODULE_11__["GetDataError"](tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ errorData: errorData }, (resultType === _ms_odsp_utilities_lib_logging_events_Qos_event__WEBPACK_IMPORTED_MODULE_5__["ResultTypeEnum"].ExpectedFailure ? {
                            isExpected: true
                        } : {}))) : errorData);
                    };
                    var responseType = serverData.getResponseType();
                    if (!responseType || responseType === 'text') {
                        var responseText = serverData.getResponseText();
                        parseQosError(responseText);
                    }
                    else {
                        serverData.parseError().then(parseQosError);
                    }
                }; };
                doGetData = function () {
                    var apiEvent = lastApiEvent = new _this._apiEvent({
                        url: url,
                        name: qosName
                    });
                    var requestPerformanceStartTime = performance && performance.now();
                    serverConnection.getServerDataFromUrl({
                        url: url,
                        successCallback: onDataSuccess(apiEvent, requestPerformanceStartTime),
                        failureCallback: onError(apiEvent, requestPerformanceStartTime),
                        uploadProgressCallback: onUploadProgress,
                        additionalPostData: additionalPostData,
                        method: method,
                        additionalHeaders: additionalHeaders,
                        contentType: contentType,
                        withCredentials: authToken ? false : undefined,
                        noRedirect: noRedirect,
                        responseType: responseType,
                        needsRequestDigest: needsRequestDigest
                    });
                };
                doGetData();
            };
            var rumOne = _ms_odsp_utilities_lib_logging_rumone_RUMOneLogger__WEBPACK_IMPORTED_MODULE_6__["RUMOneLogger"].getRUMOneLogger();
            var apiStartTime = Date.now();
            if (rumOne) {
                if (!Boolean(rumOne.readTempData('appDataFetchStart'))) {
                    // Record the App DataFetch start before the first API call
                    rumOne.saveTempData('appDataFetchStart', apiStartTime);
                }
            }
            return createPromise({
                timeout: timeout,
                onExecute: onExecute,
                maxRetries: maxRetries,
                noTimeoutInLastRetry: noTimeoutInLastRetry,
                canRetry: function () { return shouldRetry; },
                onCancel: function (isFinal) {
                    isCanceled = true;
                    if (serverConnection) {
                        serverConnection.abort();
                        if (isFinal) {
                            // do not dispose serverConnection when data requestor is in the middle of retries.
                            serverConnection.dispose();
                        }
                    }
                }
            }).then(function (result) {
                if (serverConnection) {
                    serverConnection.dispose();
                }
                return result;
            }, function (error) {
                if (serverConnection) {
                    serverConnection.dispose();
                }
                if (!lastApiEvent.endTime && _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_1___default.a.isCanceled(error)) {
                    // If we haven't fired the end event of the latest api event, then fire it now
                    lastApiEvent.end({
                        resultCode: 'PromiseCanceled',
                        resultType: _ms_odsp_utilities_lib_logging_events_Qos_event__WEBPACK_IMPORTED_MODULE_5__["ResultTypeEnum"].ExpectedFailure
                    });
                }
                return _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_1___default.a.reject(error);
            });
        };
        return _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(specifiedAuthToken ||
            (pageContext && (pageContext.getAuthToken && pageContext.getAuthToken() ||
                pageContext.authToken))).then(getDataPromise);
    };
    return DataRequestor;
}());

function createPromise(props) {
    var onExecute = props.onExecute, onCancel = props.onCancel, timeout = props.timeout, canRetry = props.canRetry, noTimeoutInLastRetry = props.noTimeoutInLastRetry;
    var numRetries = 0;
    var maxRetries = Math.max(props.maxRetries, 0);
    var promise;
    var createTimeoutPromise = function () {
        var promise = new _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_1___default.a(onExecute, function () {
            onCancel(numRetries >= maxRetries || !canRetry());
        });
        // when it is the last retry and noTimeoutInLastRetry is set to true, do not set timeout to allow calls to finish,
        // we at least can get data no matter how slow
        if (timeout && (!noTimeoutInLastRetry || numRetries < maxRetries)) {
            return _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_1___default.a.timeout(timeout, promise);
        }
        return promise;
    };
    if (numRetries < maxRetries) { // retry promise
        promise = _ms_odsp_utilities_lib_async_Retry__WEBPACK_IMPORTED_MODULE_2___default()({
            canRetry: canRetry,
            retries: maxRetries,
            callback: createTimeoutPromise,
            beforeRetry: function () {
                numRetries++;
            }
        });
    }
    else {
        promise = createTimeoutPromise();
    }
    return promise;
}
function isBlobResponse(responseType, response) {
    return responseType === 'blob' && response && typeof response === 'object';
}
/* harmony default export */ __webpack_exports__["default"] = (DataRequestor);
//# sourceMappingURL=DataRequestor.js.map

/***/ }),

/***/ "c4y9":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/TeachingBubble.styles.js ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: TeachingBubbleStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeachingBubbleStyles", function() { return TeachingBubbleStyles; });
/* harmony import */ var office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! office-ui-fabric-react/lib/Styling */ "xS3b");

var TeachingBubbleStyles = function (props) {
    var hasCondensedHeadline = props.hasCondensedHeadline, hasSmallHeadline = props.hasSmallHeadline, theme = props.theme;
    var palette = theme.palette, fonts = theme.fonts;
    var headlineSize = fonts.medium.fontSize;
    var headlineWeight = office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].semibold;
    if (!hasCondensedHeadline && !hasSmallHeadline) {
        headlineSize = fonts.xxLarge.fontSize;
        headlineWeight = office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].light;
    }
    return {
        headline: {
            fontSize: headlineSize,
            fontWeight: headlineWeight
        },
        footer: {
            selectors: {
                '.ms-Button:not(:first-child)': {
                    marginLeft: 20
                }
            }
        },
        closeButton: {
            backgroundColor: 'transparent',
            selectors: {
                '&:hover': {
                    backgroundColor: palette.themePrimary,
                    color: palette.black
                },
                '&:active': {
                    background: palette.themeDarkAlt,
                    color: palette.black
                }
            }
        }
    };
};
//# sourceMappingURL=TeachingBubble.styles.js.map

/***/ }),

/***/ "cDcd":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_cDcd__;

/***/ }),

/***/ "d7Tu":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/Dialog.styles.js ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: DialogContentStyles, DialogFooterStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogContentStyles", function() { return DialogContentStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogFooterStyles", function() { return DialogFooterStyles; });
/* harmony import */ var office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! office-ui-fabric-react/lib/Styling */ "xS3b");

var DialogContentStyles = function (props) {
    var theme = props.theme, isMultiline = props.isMultiline, isLargeHeader = props.isLargeHeader;
    var palette = theme.palette, fonts = theme.fonts;
    return {
        title: [
            fonts.xLarge,
            {
                padding: '20px 36px 20px 28px'
            },
            isLargeHeader && [
                fonts.xxLarge,
                {
                    padding: '26px 28px 28px'
                }
            ]
        ],
        topButton: {
            padding: '12px 12px 0 0',
            selectors: {
                '.ms-Dialog-button': {
                    color: palette.neutralSecondary
                },
                '.ms-Dialog-button:hover': {
                    color: palette.neutralDark
                }
            }
        },
        inner: {
            padding: isMultiline ? '0 20px 20px' : '0 28px 20px'
        },
        subText: {
            fontWeight: office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].semilight
        }
    };
};
var DialogFooterStyles = {
    actions: {
        margin: '20px 0 0'
    }
};
//# sourceMappingURL=Dialog.styles.js.map

/***/ }),

/***/ "dL3a":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/dataSources/theming/spList/WebThemeDataSource.js ***!
  \**************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _interfaces_ISpPageContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../interfaces/ISpPageContext */ "ePvV");
/* harmony import */ var _web_WebTemplateType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../web/WebTemplateType */ "U3aa");
/* harmony import */ var _base_DataRequestor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../base/DataRequestor */ "bTkC");
/* harmony import */ var _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/odsp-utilities/lib/async/Promise */ "MS/P");
/* harmony import */ var _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_odsp_utilities_lib_theming_FabricTheming__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/odsp-utilities/lib/theming/FabricTheming */ "g/d6");
/* harmony import */ var _ms_odsp_utilities_lib_theming_FabricTheming__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_theming_FabricTheming__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ms_odsp_utilities_lib_theming_RgbaColor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ms/odsp-utilities/lib/theming/RgbaColor */ "w/WL");
/* harmony import */ var _ms_odsp_utilities_lib_theming_RgbaColor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_theming_RgbaColor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ms_odsp_utilities_lib_theming_WebTheme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ms/odsp-utilities/lib/theming/WebTheme */ "wCO9");
/* harmony import */ var _ms_odsp_utilities_lib_theming_WebTheme__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_theming_WebTheme__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ms/odsp-utilities/lib/killswitch/Killswitch */ "WA4G");
/* harmony import */ var _ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ms/odsp-utilities/lib/features/FeatureOverrides */ "6TYi");
/* harmony import */ var _ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _providers_theming_FluentFeatures__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../providers/theming/FluentFeatures */ "1/3F");
// OneDrive:IgnoreCodeCoverage










var DEFAULT_THEME_COLOR = (!_ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_7__["Killswitch"].isActivated('a020a308-99f2-4254-96f6-b7098ed595ab', '04/05/2019', 'Allow null groupColor')) ?
    (_ms_odsp_utilities_lib_features_FeatureOverrides__WEBPACK_IMPORTED_MODULE_8___default.a.isFeatureEnabled({ ODB: _providers_theming_FluentFeatures__WEBPACK_IMPORTED_MODULE_9__["isOneDrive"] ? -1546 : 1546 /* TealifySP */, ODC: null, Fallback: false }) ? "#03787c" : '#0078d4') : '';
/**
 * Data source to load the theme data of the context web.
 */
var WebThemeDataSource = /** @class */ (function () {
    function WebThemeDataSource(pageContext) {
        this._pageContext = pageContext;
        this._dataRequestor = new _base_DataRequestor__WEBPACK_IMPORTED_MODULE_2__["DataRequestor"]({ qosName: 'WebThemeDataSource' }, { pageContext: pageContext });
    }
    /**
     * Gets a token which can be used to determine whether cached theme data is still valid.
     */
    WebThemeDataSource.prototype.getCacheToken = function () {
        // Token to let us know whether the cached theme data is relevant to the site.
        // If there is no explicit theme set, we will use the default themeColor of the site.
        var cacheToken = '';
        var pageContext = this._pageContext;
        // Return the themedCssFolderUrl instead of the themeCacheToken, since
        // we do not depend on the web or its version. Those would be needed if
        // we required foreground-image theming rules, as in classic theming.
        if (pageContext) {
            // If themedCssFolderUrl is null or empty, there is no web theme.
            // But if groupColor is set, we can extend that to a theme for the page.
            var webTemplate = Number(pageContext.webTemplate);
            var webColor = webTemplate !== _web_WebTemplateType__WEBPACK_IMPORTED_MODULE_1__["default"].mySite && webTemplate !== _web_WebTemplateType__WEBPACK_IMPORTED_MODULE_1__["default"].mySiteHost ?
                pageContext.groupColor : DEFAULT_THEME_COLOR;
            cacheToken = pageContext.themedCssFolderUrl || webColor;
        }
        return cacheToken;
    };
    /**
     * Returns a promise which provides the theme data for the web.
     * @param {boolean} forceUpdate If true, will return a new Promise with fresh data.
     */
    WebThemeDataSource.prototype.loadTheme = function (forceUpdate) {
        if (!forceUpdate && this._dataPromise) {
            return this._dataPromise;
        }
        if (!this.getCacheToken()) {
            // Return an undefined IThemeData to indicate no theme.
            return this._dataPromise = _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_3___default.a.resolve();
        }
        // If a theme was set on the web, load the theme from the server.
        // Otherwise, generate a Fabric theme from the default color of the web.
        this._dataPromise = this._pageContext.themedCssFolderUrl ?
            this.loadServerTheme() : this.loadGeneratedTheme();
        return this._dataPromise;
    };
    WebThemeDataSource.prototype.needsRequestDigest = function (url) {
        return false;
    };
    WebThemeDataSource.prototype.loadGeneratedTheme = function () {
        var htmlThemeColor = this._pageContext.groupColor || DEFAULT_THEME_COLOR;
        var rgbaThemeColor = _ms_odsp_utilities_lib_theming_RgbaColor__WEBPACK_IMPORTED_MODULE_5___default.a.fromHtmlColor(htmlThemeColor);
        if (rgbaThemeColor) {
            var fabTheme = {
                backgroundImageUri: null,
                cacheToken: htmlThemeColor,
                isDefault: false,
                isInverted: false,
                palette: _ms_odsp_utilities_lib_theming_FabricTheming__WEBPACK_IMPORTED_MODULE_4___default.a.generateFabricColors(rgbaThemeColor),
                version: "1"
            };
            return _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_3___default.a.resolve(fabTheme);
        }
        else {
            // Return no theme to indicate default theme values should be used.
            return _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_3___default.a.resolve();
        }
    };
    WebThemeDataSource.prototype.loadServerTheme = function () {
        var _this = this;
        var webUrl = Object(_interfaces_ISpPageContext__WEBPACK_IMPORTED_MODULE_0__["getSafeWebServerRelativeUrl"])(this._pageContext);
        var cultureName = this._pageContext.currentUICultureName;
        var endpointUrl = _ms_odsp_utilities_lib_theming_WebTheme__WEBPACK_IMPORTED_MODULE_6___default.a.makeWebThemeRestUrl(webUrl, cultureName);
        var parseResponse = function (responseText) {
            // This could throw if the handler returns an HTML error page or invalid JSON.
            // DataRequestor will count that as an error and call the error callback.
            _this._data = _ms_odsp_utilities_lib_theming_WebTheme__WEBPACK_IMPORTED_MODULE_6___default.a.processWebThemeRestResponse(responseText);
            return _this._data;
        };
        var dataPromise = this._dataRequestor.getData({
            url: endpointUrl,
            parseResponse: parseResponse,
            qosName: 'WebThemeDataSource.LoadData',
            method: "GET"
        });
        dataPromise.done(null, function () {
            // Remove reference to promise on error.
            _this._dataPromise = null;
        });
        return dataPromise;
    };
    return WebThemeDataSource;
}());
/* harmony default export */ __webpack_exports__["default"] = (WebThemeDataSource);
//# sourceMappingURL=WebThemeDataSource.js.map

/***/ }),

/***/ "dQCu":
/*!************************************!*\
  !*** ./lib/common/Killswitches.js ***!
  \************************************/
/*! exports provided: Killswitches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Killswitches", function() { return Killswitches; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

var Killswitches = /** @class */ (function () {
    function Killswitches() {
    }
    /**
     * Whether to allow apps to override default ThemeProvider when navigating
     */
    Killswitches.themeProviderOverrideKSActive = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('6a046c32-0f63-4e65-8980-cdce9e72a3ca'), '03/13/2019', 'Allow apps to override the default theme provider');
    };
    /**
     * Gets a value indicating whether in-place navigation killswitch is activated
     */
    Killswitches.isInplaceNavigationKSActive = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('021d49fb-ac33-484c-aa16-ccc1ea76bb26'), '03/06/2019', 'Support in-place navigation between applications');
    };
    /**
     * Gets a value indicating whether navigation data error killswitch is activated
     */
    Killswitches.isNavigationDataErrorKSActive = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('c6fd1a34-d63b-45a5-a5be-f6d768c9fb6e'), '03/04/2019', 'Raise navigation data error');
    };
    /**
     * Indicates whether the kill switch for polyfilling the theme's effects for OUFR 5 or below
     * is activated or not.
     */
    Killswitches.isPolyFillThemeEffectsKSActive = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('4fd05ab9-d901-495e-8cd8-960a3e6d97e8'), '03/21/2019', 'Polyfill theme effects for OUFR 5 or below');
    };
    /** Indicates whether or not the kill switch to disable having preallocated placeholders
     * for application customizers.
     */
    Killswitches.isPreallocatedPlaceholdersforApplicationCustomizersKSActive = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('1c3df98e-4897-4682-87f1-f3eac5f9c71b'), '08/29/2019', 'Disable preallocated placeholders for application customizers');
    };
    /** Indicates whether or not the kill switch to clear client side custom actions
     * is activated.
     */
    Killswitches.isClearClientSideCustomActionsKSActive = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('4e9a080e-fd38-4803-b45c-1786fd9c92d4'), '09/12/2019', 'ClearClientSideCustomActions');
    };
    /** Indicates whether or not the kill switch to add extensions init perf marker
    * is activated.
    */
    Killswitches.isAddExtensionsInitPerfMarkerKSActive = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('d5981877-9349-4048-be73-c26f2b69df96'), '11/08/2019', 'Add extensions init perf marker');
    };
    return Killswitches;
}());



/***/ }),

/***/ "ePvV":
/*!******************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/interfaces/ISpPageContext.js ***!
  \******************************************************************************************************************************************************************************************/
/*! exports provided: SearchBoxInNavBarType, SearchScopeType, SPWebPropertyFlags2, DEFAULT_LOGO_URL, getServerUrl, getSafeWebServerRelativeUrl, isGroupWebContext, isModernTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBoxInNavBarType", function() { return SearchBoxInNavBarType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchScopeType", function() { return SearchScopeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPWebPropertyFlags2", function() { return SPWebPropertyFlags2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LOGO_URL", function() { return DEFAULT_LOGO_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getServerUrl", function() { return getServerUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSafeWebServerRelativeUrl", function() { return getSafeWebServerRelativeUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGroupWebContext", function() { return isGroupWebContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isModernTemplate", function() { return isModernTemplate; });
/**
 * Search box in nav bar
 */
var SearchBoxInNavBarType;
(function (SearchBoxInNavBarType) {
    /** Default behavior will be AllPages */
    SearchBoxInNavBarType[SearchBoxInNavBarType["Default"] = 0] = "Default";
    /** Display search box in nav bar for all pages */
    SearchBoxInNavBarType[SearchBoxInNavBarType["AllPages"] = 1] = "AllPages";
    /** Display search box in nav bar for modern pages only */
    SearchBoxInNavBarType[SearchBoxInNavBarType["ModernOnly"] = 2] = "ModernOnly";
    /** Do not display search box in nav bar */
    SearchBoxInNavBarType[SearchBoxInNavBarType["Hidden"] = 3] = "Hidden";
})(SearchBoxInNavBarType || (SearchBoxInNavBarType = {}));
/**
 * Search box search scope
 * When the value is Default, it follows the existing search scope rule.
 * For example, hub site has hub scope, non-hub site has site scope.
 */
var SearchScopeType;
(function (SearchScopeType) {
    SearchScopeType[SearchScopeType["Default"] = 0] = "Default";
    SearchScopeType[SearchScopeType["Tenant"] = 1] = "Tenant";
    SearchScopeType[SearchScopeType["Hub"] = 2] = "Hub";
    SearchScopeType[SearchScopeType["Site"] = 3] = "Site";
})(SearchScopeType || (SearchScopeType = {}));
/**
 * Web property flags enum
 * property name matchs SPWebPropertyFlags2 definition in sts/stsom/SPWeb.cs
 */
var SPWebPropertyFlags2;
(function (SPWebPropertyFlags2) {
    /** Indicates whether site footer is enabled in this web */
    SPWebPropertyFlags2[SPWebPropertyFlags2["FooterEnabled"] = 2] = "FooterEnabled";
    /** Indicates whether mega menu is enabled on this web */
    SPWebPropertyFlags2[SPWebPropertyFlags2["MegaMenuEnabled"] = 128] = "MegaMenuEnabled";
    /** Indicates which emphasis is assigned to the footer when combined */
    SPWebPropertyFlags2[SPWebPropertyFlags2["FooterEmphasis0"] = 256] = "FooterEmphasis0";
    SPWebPropertyFlags2[SPWebPropertyFlags2["FooterEmphasis1"] = 512] = "FooterEmphasis1";
    /** Indicates which footer layout type is selected when combined */
    SPWebPropertyFlags2[SPWebPropertyFlags2["FooterLayout0"] = 1024] = "FooterLayout0";
    SPWebPropertyFlags2[SPWebPropertyFlags2["FooterLayout1"] = 2048] = "FooterLayout1";
})(SPWebPropertyFlags2 || (SPWebPropertyFlags2 = {}));
/** Default site logo URL */
var DEFAULT_LOGO_URL = '_layouts/15/images/siteicon.png';
/**
 * Gets the absolute URL of the server (like https://microsoft.sharepoint.com).
 * Input can be an ISpPageContext or other object containing absolute and server-relative web URLs.
 *
 * @example
 *  Returns "https://microsoft.sharepoint.com"
 *      getServerUrl({
 *          webAbsoluteUrl: "https://microsoft.sharepoint.com/sites/odsp",
 *          webServerRelativeUrl: "/sites/odsp"
 *      })
 *
 * Returns "http://server"
 *     getServerUrl({
 *          webAbsoluteUrl: "http://server",
 *          webServerRelativeUrl: "/"
 *     })
 */
function getServerUrl(pageContext) {
    'use strict';
    var webAbsoluteUrl = pageContext.webAbsoluteUrl, webServerRelativeUrl = pageContext.webServerRelativeUrl;
    // Handle cases like http://server site collection, where webServerRelativeUrl will be '/'
    return webServerRelativeUrl === '/' || webServerRelativeUrl === ''
        ? webAbsoluteUrl
        : webAbsoluteUrl.substring(0, webAbsoluteUrl.lastIndexOf(webServerRelativeUrl));
}
/**
 * In most cases, returns the webServerRelativeUrl as-is.
 * For the root web (http://server), returns ''.
 *
 * This function is needed because the root web's webServerRelativeUrl will be '/',
 * which is usually not desirable when combining with other paths. For example:
 *    Good:  '/myweb' + '/_api/contextinfo' => '/myweb/_api/contextinfo'
 *    Bad:   '/'      + '/_api/contextinfo' => '//_api/contextinfo'
 *    Fixed: ''       + '/_api/contextinfo' => '/_api/contextinfo'
 *
 * @param pageContext - An ISpPageContext or other object containing the server-relative URL of a web
 */
function getSafeWebServerRelativeUrl(pageContext) {
    'use strict';
    return pageContext.webServerRelativeUrl === '/' ? '' : pageContext.webServerRelativeUrl;
}
/**
 * Returns true if the current web is the root of a site collection associated with a group.
 * Otherwise it returns false.
 */
function isGroupWebContext(pageContext) {
    'use strict';
    return pageContext && !!pageContext.groupId &&
        pageContext.webAbsoluteUrl === pageContext.siteAbsoluteUrl;
}
/**
 * Returns true if the current web templates is one of the modern templates: STS#3, GROUP#0, SITEPAGEPUBLISHING#0.
 */
function isModernTemplate(pageContext) {
    var modernTemplates = ['STS#3', 'GROUP#0', 'SITEPAGEPUBLISHING#0'];
    return modernTemplates.indexOf(pageContext.webTemplateConfiguration) !== -1;
}
//# sourceMappingURL=ISpPageContext.js.map

/***/ }),

/***/ "efvT":
/*!*************************************************!*\
  !*** ./lib/extensibility/SearchQueryManager.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _customAction_CustomActionLocations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./customAction/CustomActionLocations */ "4QmI");




/**
 * Search query manager is used to get the search query in SPFx.
 * It supports Search query modifier extensions that can enrich the search query, and supports cases where the user
 * comes from classic pages to modern.
 *
 * @internal
 */
var SearchQueryManager = /** @class */ (function () {
    function SearchQueryManager(serviceScope) {
        this._isInitialized = false;
        this._serviceScope = serviceScope;
    }
    SearchQueryManager.prototype.initialize = function (preloadedData) {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('SearchQueryManager.initialize');
        this._preloadedData = preloadedData;
        this._queryParameters = new URL(window.location.href).searchParams;
        if (this._getUrlSearchQuery() && this._hasExtensions()) {
            return this._getExtensionManager().then(function (extensionManager) {
                return extensionManager.initializeExtensions(preloadedData.customActions)
                    .then(function (numberOfExtensions) {
                    _this._isInitialized = true;
                    qosMonitor.writeSuccess({ numberOfExtensions: numberOfExtensions });
                });
            })
                .catch(function (e) {
                qosMonitor.writeUnexpectedFailure(undefined, e, { numberOfExtensions: 0 });
                throw e;
            });
        }
        else {
            this._isInitialized = true;
            qosMonitor.writeSuccess({ numberOfExtensions: 0 });
            return Promise.resolve();
        }
    };
    SearchQueryManager.prototype.isInitialized = function () {
        return this._isInitialized;
    };
    /**
     * Get the search query from the current URL.
     */
    SearchQueryManager.prototype.getSearchQuery = function () {
        if (!this._isInitialized) {
            return Promise.reject(new Error('SearchQueryManager is not initialized'));
        }
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('SearchQueryManager.getSearchQuery');
        this._queryParameters = new URL(window.location.href).searchParams;
        var searchQuery = this._getUrlSearchQuery();
        if (searchQuery && this._hasExtensions()) {
            return this._getExtensionManager()
                .then(function (extensionManager) { return extensionManager.getSearchQuery(searchQuery); })
                .then(function (q) { qosMonitor.writeSuccess(); return q; })
                .catch(function (e) { qosMonitor.writeUnexpectedFailure(undefined, e); throw e; });
        }
        else {
            qosMonitor.writeSuccess();
            return Promise.resolve(searchQuery);
        }
    };
    SearchQueryManager.prototype._getUrlSearchQuery = function () {
        // If ?q is not present, ?k can be used (support cases coming from classic pages)
        return this._queryParameters.get('q') || this._queryParameters.get('k') || undefined;
    };
    /**
     * Returns true if there is any SearchQueryModifier extension.
     * When using query params, it just checks if there is any custom action regardless of type.
     * This is exclusively a debug scenario and it's faster and smaller code, considering this runs in a core scenario.
     */
    SearchQueryManager.prototype._hasExtensions = function () {
        return this._queryParameters.has('customActions') ||
            (!!this._preloadedData.customActions &&
                this._preloadedData.customActions.some(function (customAction) { return customAction.location === _customAction_CustomActionLocations__WEBPACK_IMPORTED_MODULE_3__["default"].SEARCH_QUERY_MODIFIER; }));
    };
    SearchQueryManager.prototype._getExtensionManager = function () {
        var _this = this;
        if (!this._extensionManagerPromise) {
            this._extensionManagerPromise = _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["SPComponentLoader"].loadComponentById('4958ea79-6ff3-4480-8291-0932dd010869')
                .then(function (spSearchExtensibility) {
                return new spSearchExtensibility._SearchQueryExtensionManager(_this._serviceScope);
            });
        }
        return this._extensionManagerPromise;
    };
    SearchQueryManager.serviceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["ServiceKey"].create('sp-application-base:SearchQueryManager', SearchQueryManager);
    return SearchQueryManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (SearchQueryManager);


/***/ }),

/***/ "f2ns":
/*!**********************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/async/Signal.js ***!
  \**********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @ms/odsp-utilities/async/Signal.js
var pkg = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
module.exports = {}
module.exports.Signal = pkg.Signal;
module.exports.default = pkg.Signal;
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "fBGb":
/*!************************************!*\
  !*** ./lib/ApplicationLoadType.js ***!
  \************************************/
/*! exports provided: ApplicationLoadType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationLoadType", function() { return ApplicationLoadType; });
// Copyright (c) Microsoft. All rights reserved.
/**
 * Determines the type of the application load.
 * This is used by SPFx applications to understand whether they were initiated as part of a
 * full page load or an in-place navigation.
 *
 * @internal
 */
var ApplicationLoadType;
(function (ApplicationLoadType) {
    /**
     * This informs the application that it was loaded as part of a full-page load.
     */
    ApplicationLoadType[ApplicationLoadType["FullPageLoad"] = 0] = "FullPageLoad";
    /**
     * This informs the application that it was loaded as part of an in-place navigation from
     * a different application.
     */
    ApplicationLoadType[ApplicationLoadType["InPlaceNavigation"] = 1] = "InPlaceNavigation";
})(ApplicationLoadType || (ApplicationLoadType = {}));


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

/***/ "g/8y":
/*!******************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/sp-resource-path/0.7.2/node_modules/@ms/sp-resource-path/lib-esm/SPResourcePath.js ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: SPResourcePathFormat, SPResourcePath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPResourcePathFormat", function() { return SPResourcePathFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPResourcePath", function() { return SPResourcePath; });
/**
 * @public
 */
var SPResourcePathFormat;
(function (SPResourcePathFormat) {
    SPResourcePathFormat[SPResourcePathFormat["absolute"] = 0] = "absolute";
    SPResourcePathFormat[SPResourcePathFormat["relative"] = 1] = "relative";
    SPResourcePathFormat[SPResourcePathFormat["serverRelative"] = 2] = "serverRelative";
})(SPResourcePathFormat || (SPResourcePathFormat = {}));
/**
 * Simplified implementation of a URI parser which does not attempt decoding of segments,
 * handling of query strings, or separation of the fragment. Intended for use on SharePoint
 * Resource Paths or other URL-like entities which may not actually conform to the URL
 * specification, but may be used for simple transformations of URLs.
 *
 * This class makes several assumptions about the format of input URLs:
 * - Absolute URLs begin with '<scheme>://<host>'
 * - Relative URLs being with '/'
 * - URLs never have a trailing '/'
 *
 * @public
 */
var SPResourcePath = /** @class */ (function () {
    /**
     * Creates an instance of SPResourcePath.
     *
     * @param value - A string representing a well-formed, decoded SharePoint resource path.
     */
    function SPResourcePath(value) {
        if (value === void 0) { value = ''; }
        var rootDelimeter = '//';
        var indexOfRootDelimeter = value.indexOf(rootDelimeter);
        var indexOfPathDelimeter = value.indexOf('/');
        // The root delimeter is the first instance of '//', unless preceded by a lone '/'
        var endIndexOfRootDelimeter = indexOfRootDelimeter > -1 && indexOfRootDelimeter <= indexOfPathDelimeter ?
            indexOfRootDelimeter + rootDelimeter.length :
            -1;
        var authority = getAuthority(value, endIndexOfRootDelimeter);
        var domain = authority && authority.slice(endIndexOfRootDelimeter);
        // By definition, everything after the authority is the path
        var path = value.slice(authority.length);
        var format = authority ?
            SPResourcePathFormat.absolute :
            path[0] === '/' ?
                SPResourcePathFormat.serverRelative :
                SPResourcePathFormat.relative;
        var segments = path.split('/');
        this.authority = authority;
        this.domain = domain;
        this.format = format;
        this.path = path;
        this.segments = segments;
        this.value = value;
    }
    return SPResourcePath;
}());

function getAuthority(value, endIndexOfRootDelimeter) {
    if (endIndexOfRootDelimeter > -1) {
        var indexOfNextSegment = value.indexOf('/', endIndexOfRootDelimeter);
        if (indexOfNextSegment > -1) {
            return value.slice(0, indexOfNextSegment);
        }
        else {
            return value;
        }
    }
    else {
        return '';
    }
}
//# sourceMappingURL=SPResourcePath.js.map

/***/ }),

/***/ "g/d6":
/*!*******************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/theming/FabricTheming.js ***!
  \*******************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RgbaColor_1 = __webpack_require__(/*! ./RgbaColor */ "w/WL");
var Shades_1 = __webpack_require__(/*! ./Shades */ "HYQE");
/**
 * Utility class with static methods to work with Fabric-style themes.
 */
var FabricTheming = /** @class */ (function () {
    function FabricTheming() {
    }
    /**
     * Generates a palette of Fabric colors from a primary RGB color value.
     * @param {RgbaColor} primaryRgb Primary RGB color used to generate a palette.
     * @param {boolean} inverted Whether the theme is inverted, with a dark background and light foreground.
     */
    FabricTheming.generateFabricColors = function (primaryRgb, inverted) {
        if (inverted === void 0) { inverted = false; }
        var generatedShades = {
            "themeDarker": Shades_1.Shade.Shade8,
            "themeDark": Shades_1.Shade.Shade7,
            "themeDarkAlt": Shades_1.Shade.Shade6,
            "themeLight": Shades_1.Shade.Shade3,
            "themeLighter": Shades_1.Shade.Shade2,
            "themeLighterAlt": Shades_1.Shade.Shade1,
            "themePrimary": Shades_1.Shade.Unshaded,
            "themeAccent": Shades_1.Shade.Unshaded,
            "themeSecondary": Shades_1.Shade.Shade5,
            "themeTertiary": Shades_1.Shade.Shade4
        };
        // Expected color slots. Start each defaulting to null to avoid warnings about missing slots.
        var colors = FabricTheming._getDefaultThemeTokenMap();
        // Starting points for the generated palette.
        var primaryColor = RgbaColor_1.default.fromRgba(primaryRgb.R, primaryRgb.G, primaryRgb.B);
        for (var shadeName in generatedShades) {
            var shade = generatedShades[shadeName];
            colors[shadeName] = Shades_1.getShade(primaryColor, shade, inverted);
        }
        var accent = colors["themeAccent"];
        colors["themeAccentTranslucent10"] = accent ?
            RgbaColor_1.default.fromRgba(accent.R, accent.G, accent.B, 0.1 * RgbaColor_1.default.maxComponent) : null;
        // Handle neutral slots for inverted themes
        if (inverted) {
            var invertedText = '#fff';
            var invertedNeutralQuaternary = '#4f4f4f';
            var invertedNeutralQuaternaryAlt = '#484848';
            var invertedNeutralColors = {
                'black': '#fff',
                'blackTranslucent40': '#66ffffff',
                'neutralDark': '#f4f4f4',
                'neutralPrimary': invertedText,
                'neutralPrimaryTranslucent50': '#7fffffff',
                'neutralPrimaryAlt': '#dadada',
                'neutralSecondary': '#d0d0d0',
                'neutralTertiary': '#c8c8c8',
                'neutralTertiaryAlt': '#6d6d6d',
                'neutralQuaternary': invertedNeutralQuaternary,
                'neutralQuaternaryAlt': invertedNeutralQuaternaryAlt,
                'cmdbarSelected': invertedNeutralQuaternary,
                'cmdbarSelectedHover': invertedNeutralQuaternaryAlt,
                'neutralLight': '#3f3f3f',
                'neutralLighter': '#313131',
                'neutralLighterAlt': '#282828',
                'white': '#1f1f1f',
                'whiteTranslucent40': '#661f1f1f',
                'error': '#f00',
                'errorBackground': '#7e3333'
            };
            for (var neutralSlot in invertedNeutralColors) {
                if (invertedNeutralColors.hasOwnProperty(neutralSlot)) {
                    colors[neutralSlot] =
                        RgbaColor_1.default.fromHtmlColor(invertedNeutralColors[neutralSlot]);
                }
            }
        }
        return colors;
    };
    FabricTheming._getDefaultThemeTokenMap = function () {
        return {
            backgroundOverlay: null,
            themeDarker: null,
            themeDark: null,
            themeDarkAlt: null,
            themePrimary: null,
            themeSecondary: null,
            themeTertiary: null,
            themeLight: null,
            themeLighter: null,
            themeLighterAlt: null,
            black: null,
            cmdbarSelected: null,
            cmdbarSelectedHover: null,
            neutralDark: null,
            neutralPrimary: null,
            neutralPrimaryAlt: null,
            neutralPrimaryTranslucent50: null,
            neutralSecondary: null,
            neutralSecondaryAlt: null,
            neutralTertiary: null,
            neutralTertiaryAlt: null,
            neutralQuaternary: null,
            neutralQuaternaryAlt: null,
            neutralLight: null,
            neutralLighter: null,
            neutralLighterAlt: null,
            white: null,
            blackTranslucent40: null,
            whiteTranslucent40: null,
            yellow: null,
            yellowLight: null,
            orange: null,
            orangeLight: null,
            redDark: null,
            red: null,
            magentaDark: null,
            magenta: null,
            magentaLight: null,
            purpleDark: null,
            purple: null,
            purpleLight: null,
            blueDark: null,
            blueMid: null,
            blue: null,
            blueLight: null,
            tealDark: null,
            teal: null,
            tealLight: null,
            greenDark: null,
            green: null,
            greenLight: null,
            error: null,
            errorBackground: null,
            success: null,
            successBackground: null,
            alert: null,
            alertBackground: null,
            infoBackground: null,
            info: null,
            orangeLighter: null
        };
    };
    return FabricTheming;
}());
exports.default = FabricTheming;
//# sourceMappingURL=FabricTheming.js.map

/***/ }),

/***/ "gbFv":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/ContextualMenu.styles.js ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: ContextualMenuStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextualMenuStyles", function() { return ContextualMenuStyles; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _styleConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styleConstants */ "3iG6");
var _a;


var CONTEXTUAL_MENU_ITEM_HEIGHT = 32;
var iconStyles = {
    maxHeight: CONTEXTUAL_MENU_ITEM_HEIGHT,
    fontSize: 14,
    width: 14,
    selectors: (_a = {},
        _a[_styleConstants__WEBPACK_IMPORTED_MODULE_1__["MinimumScreenSelector"]] = {
            fontSize: 18,
            width: 18
        },
        _a)
};
var ContextualMenuStyles = {
    subComponentStyles: {
        menuItem: {
            root: {
                height: CONTEXTUAL_MENU_ITEM_HEIGHT,
                lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT
            },
            splitPrimary: {
                height: CONTEXTUAL_MENU_ITEM_HEIGHT,
                lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT
            },
            splitMenu: {
                height: CONTEXTUAL_MENU_ITEM_HEIGHT,
                lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT,
                width: CONTEXTUAL_MENU_ITEM_HEIGHT // to match the numbers from the default styles
            },
            icon: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, iconStyles),
            checkmarkIcon: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, iconStyles),
            splitContainer: {
                height: CONTEXTUAL_MENU_ITEM_HEIGHT
            },
            subMenuIcon: {
                height: CONTEXTUAL_MENU_ITEM_HEIGHT,
                lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT
            }
        }
    }
};
//# sourceMappingURL=ContextualMenu.styles.js.map

/***/ }),

/***/ "gdPU":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/providers/theming/ThemeProviderFactory.js ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: getThemeProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getThemeProvider", function() { return getThemeProvider; });
/* harmony import */ var _ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities/lib/killswitch/Killswitch */ "WA4G");
/* harmony import */ var _ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_0__);
// OneDrive:IgnoreCodeCoverage


var _themeProvider;
var _themeProviderFactory;
/**
 * Uses context information to choose the appropriate theme provider, if any.
 * May return an undefined value if not theme provider is deemed appropriate.
 */
function getThemeProvider(themeProviders, spPageContext) {
    "use strict";
    if (!_themeProvider || _themeProviderFactory !== themeProviders) {
        _themeProvider = _instantiateThemeProvider(themeProviders, spPageContext);
        _themeProviderFactory = themeProviders;
    }
    return _themeProvider;
}
/**
 * Uses context information to choose the appropriate theme provider, if any.
 * May return an undefined value if no theme provider is deemed appropriate.
 */
function _instantiateThemeProvider(themeProviders, spPageContext) {
    "use strict";
    // Only load the theme on a SharePoint page which declares a theme.
    // This logic should be updated as more apps are able to provide a theme.
    var themeProvider;
    // Use window to get the pageContext since it might not be declared (e.g. ODC).
    var pageContext = spPageContext ? spPageContext : window['_spPageContextInfo'];
    if (!_ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_0__["Killswitch"].isActivated('a020a308-99f2-4254-96f6-b7098ed595ab', '04/05/2019', 'Allow null groupColor')) {
        if (pageContext) {
            themeProvider = themeProviders.webThemeProvider(pageContext);
        }
    }
    else {
        if (pageContext && (pageContext.themedCssFolderUrl || pageContext.groupColor)) {
            themeProvider = themeProviders.webThemeProvider(pageContext);
        }
    }
    return themeProvider;
}
//# sourceMappingURL=ThemeProviderFactory.js.map

/***/ }),

/***/ "gfci":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/Breadcrumb.styles.js ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: BreadcrumbStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbStyles", function() { return BreadcrumbStyles; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/Styling */ "xS3b");
/* harmony import */ var _styleConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styleConstants */ "3iG6");



var BreadcrumbStyles = function (props) {
    var _a;
    var theme = props.theme;
    var palette = theme.palette, fonts = theme.fonts;
    var stateSelectors = {
        ':hover': {
            backgroundColor: palette.neutralLighter,
            textDecoration: 'none'
        },
        ':active': {
            backgroundColor: palette.neutralTertiaryAlt,
            textDecoration: 'none'
        },
        '&:active:hover': {
            backgroundColor: palette.neutralQuaternary,
            textDecoration: 'none'
        }
    };
    var itemStyle = {
        lineHeight: 'normal',
        fontSize: fonts.xLarge.fontSize,
        outline: 'none',
        fontWeight: office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].light,
        color: palette.neutralPrimary,
        selectors: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]((_a = { '.ms-Fabric--isFocusVisible &:focus': {
                    // Necessary due to changes of Link component not using getFocusStyle.
                    outline: 'none'
                } }, _a[_styleConstants__WEBPACK_IMPORTED_MODULE_2__["MediumScreenSelector"]] = { fontSize: fonts.xLarge.fontSize, fontWeight: office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].regular, lineHeight: 'normal' }, _a[_styleConstants__WEBPACK_IMPORTED_MODULE_2__["MinimumScreenSelector"]] = { fontSize: fonts.xLarge.fontSize, fontWeight: office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].regular, lineHeight: 'normal' }, _a), stateSelectors)
    };
    var lastChildItem = {
        fontWeight: office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].light,
        color: palette.neutralPrimary
    };
    return {
        root: {
            marginTop: 23
        },
        itemLink: itemStyle,
        item: itemStyle,
        listItem: {
            selectors: {
                '&:last-child .ms-Breadcrumb-itemLink': lastChildItem,
                '&:last-child .ms-Breadcrumb-item': lastChildItem
            }
        },
        overflowButton: {
            color: palette.neutralSecondary,
            selectors: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, stateSelectors)
        }
    };
};
//# sourceMappingURL=Breadcrumb.styles.js.map

/***/ }),

/***/ "h/u7":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/logging/rumone/APICallPerformanceData.js ***!
  \***********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @ms/odsp-utilities/logging/rumone/APICallPerformanceData.js
var pkg = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
module.exports = {}
module.exports.default = pkg.APICallPerformanceData;
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "iKPr":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/version.js ***!
  \******************************************************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uifabric_set_version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/set-version */ "LCDl");
// office-ui-fabric-react@7.59.0
// Do not modify this file, the file is generated as part of publish. The checked in version is a placeholder only.

Object(_uifabric_set_version__WEBPACK_IMPORTED_MODULE_0__["setVersion"])('office-ui-fabric-react', '7.59.0');
//# sourceMappingURL=version.js.map

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

/***/ "jQzw":
/*!***********************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/styling/7.7.2/node_modules/@uifabric/styling/lib/index.js ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @uifabric/styling/index.js
var pkg = __webpack_require__(/*! @ms/uifabric-styling-bundle */ "fglE");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "jZLx":
/*!******************************************************!*\
  !*** ./lib/extensibility/placeholder/Placeholder.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PlaceholderContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlaceholderContent */ "DXcd");
/* harmony import */ var _PlaceholderName__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlaceholderName */ "Cs6k");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-component-base */ "7Awa");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_3__);




/**
 * Represents the placeholder div provided by the application
 *
 * @internal
 */
var Placeholder = /** @class */ (function () {
    function Placeholder(definition, manager) {
        // This array is kept ordered by sequence number
        this._entries = [];
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(definition, 'definition');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(definition.domElement, 'definition.domElement');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(manager, 'manager');
        this._name = definition.name;
        this._domElement = definition.domElement;
        this._applicationDomElement = undefined;
    }
    Object.defineProperty(Placeholder.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create a new placeholder content for this placeholder
     */
    Placeholder.prototype.createPlaceholderContent = function (sequence, options) {
        // Create a separate browser DOM node to host the third-party placeholder.
        // We found that, if we use a node from the ReactJS virtual DOM tree,
        // and in the child DOM tree the placeholder tries to load a different
        // version of ReactJS, that can break due to compatibility issues between
        // the two different verions of ReactJS.
        var contentDiv = document.createElement('div');
        if (!_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_3__["_ComponentBaseKillSwitches"].isAddSpecificityToLegacyWebPartKSActivated()) {
            // We will add legacy css style for all 3rd extensions.
            contentDiv.classList.add('ms-SPLegacyFabricBlock');
        }
        var position = this._addContentDiv(contentDiv, sequence);
        var placeholderContent = new _PlaceholderContent__WEBPACK_IMPORTED_MODULE_1__["default"]({
            placeholder: this,
            sequence: sequence,
            domElement: contentDiv,
            options: options
        });
        this._entries.splice(position, 0, { placeholderContent: placeholderContent, sequence: sequence });
        return placeholderContent;
    };
    Placeholder.prototype.removePlaceholderContent = function (placeholderContent) {
        for (var i = 0; i < this._entries.length; i++) {
            if (this._entries[i].placeholderContent === placeholderContent) {
                this._domElement.removeChild(this._entries[i].placeholderContent.domElement);
                this._entries.splice(i, 1);
                i--; // Because the current element was removed we should keep looking at the same index
            }
        }
    };
    Placeholder.prototype.attachToApplication = function (applicationDomElement) {
        this._applicationDomElement = applicationDomElement;
        this._applicationDomElement.appendChild(this._domElement);
    };
    Placeholder.prototype.detachFromApplication = function () {
        if (this._applicationDomElement) {
            this._applicationDomElement.appendChild(this._domElement);
            this._applicationDomElement = undefined;
        }
    };
    /**
     * Adds the DOM element of a placeholder content in the placeholder DIV element.
     * Returns the position inside of the placeholder where the content was placed.
     *
     * @param domElement - DOM element of the placeholder content
     * @param sequence - Sequence number of the placeholder content
     */
    Placeholder.prototype._addContentDiv = function (domElement, sequence) {
        // Keep the entries ordered by sequence number.
        // Bottom Placeholder is sorted by sequence number
        // in reverse order.
        var i;
        if (this.name === _PlaceholderName__WEBPACK_IMPORTED_MODULE_2__["default"].Bottom) {
            i = this._entries.length;
            while (i > 0 && sequence > this._entries[i - 1].sequence) {
                i--;
            }
        }
        else {
            i = 0;
            while (i < this._entries.length && sequence >= this._entries[i].sequence) {
                i++;
            }
        }
        if (i < this._entries.length) {
            var nextDiv = this._entries[i].placeholderContent.domElement;
            this._domElement.insertBefore(domElement, nextDiv);
        }
        else {
            this._domElement.appendChild(domElement);
        }
        return i;
    };
    return Placeholder;
}());
/* harmony default export */ __webpack_exports__["default"] = (Placeholder);


/***/ }),

/***/ "lom6":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/MessageBarButton.styles.js ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: MessageBarButtonStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageBarButtonStyles", function() { return MessageBarButtonStyles; });
var MessageBarButtonStyles = function (props) {
    var theme = props.theme;
    if (!theme) {
        throw new Error('Theme is undefined or null.');
    }
    var palette = theme.palette;
    return {
        root: {
            backgroundColor: palette.neutralQuaternaryAlt,
            height: 32,
            width: 'auto',
            minWidth: 84
        },
        rootHovered: {
            backgroundColor: palette.neutralTertiaryAlt
        },
        rootPressed: {
            backgroundColor: palette.neutralTertiary
        }
    };
};
//# sourceMappingURL=MessageBarButton.styles.js.map

/***/ }),

/***/ "mBgx":
/*!**************************************!*\
  !*** ./lib/LegacyFabric6Function.js ***!
  \**************************************/
/*! exports provided: makeSemanticColorsFromPalette, DefaultEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeSemanticColorsFromPalette", function() { return makeSemanticColorsFromPalette; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultEffects", function() { return DefaultEffects; });
// Copied from https://github.com/OfficeDev/office-ui-fabric-react/blob/6.0/packages/styling/src/styles/theme.ts#L181
// Used to generate fabric 6's styles.
// tslint:disable-next-line: export-name
function makeSemanticColorsFromPalette(p, isInverted, depComments) {
    var toReturn = {
        bodyBackground: p.white,
        bodyStandoutBackground: p.neutralLighterAlt,
        bodyFrameBackground: p.white,
        bodyFrameDivider: p.neutralLight,
        bodyText: p.neutralPrimary,
        bodyTextChecked: p.black,
        bodySubtext: p.neutralSecondary,
        bodyDivider: p.neutralLight,
        disabledBackground: p.neutralLighter,
        disabledText: p.neutralTertiary,
        disabledBodyText: p.neutralTertiary,
        disabledSubtext: p.neutralQuaternary,
        disabledBodySubtext: p.neutralTertiaryAlt,
        focusBorder: p.neutralSecondary,
        variantBorder: p.neutralLight,
        variantBorderHovered: p.neutralTertiary,
        defaultStateBackground: p.neutralLighterAlt,
        errorText: !isInverted ? p.redDark : '#ff5f5f',
        warningText: !isInverted ? '#333333' : '#ffffff',
        successText: !isInverted ? '#107C10' : '#92c353',
        errorBackground: !isInverted ? 'rgba(232, 17, 35, .2)' : 'rgba(232, 17, 35, .5)',
        blockingBackground: !isInverted ? 'rgba(234, 67, 0, .2)' : 'rgba(234, 67, 0, .5)',
        warningBackground: !isInverted ? 'rgba(255, 185, 0, .2)' : 'rgba(255, 251, 0, .6)',
        warningHighlight: !isInverted ? '#ffb900' : '#fff100',
        successBackground: !isInverted ? 'rgba(186, 216, 10, .2)' : 'rgba(186, 216, 10, .4)',
        inputBorder: p.neutralTertiary,
        inputBorderHovered: p.neutralPrimary,
        inputBackground: p.white,
        inputBackgroundChecked: p.themePrimary,
        inputBackgroundCheckedHovered: p.themeDarkAlt,
        inputForegroundChecked: p.white,
        inputFocusBorderAlt: p.themePrimary,
        smallInputBorder: p.neutralSecondary,
        inputText: p.neutralPrimary,
        inputTextHovered: p.neutralDark,
        inputPlaceholderText: p.neutralSecondary,
        buttonBackground: p.neutralLighter,
        buttonBackgroundChecked: p.neutralTertiaryAlt,
        buttonBackgroundHovered: p.neutralLight,
        buttonBackgroundCheckedHovered: p.neutralLight,
        buttonBackgroundPressed: p.neutralLight,
        buttonBackgroundDisabled: p.neutralLighter,
        buttonBorder: 'transparent',
        buttonText: p.neutralPrimary,
        buttonTextHovered: p.neutralDark,
        buttonTextChecked: p.neutralDark,
        buttonTextCheckedHovered: p.black,
        buttonTextPressed: p.neutralDark,
        buttonTextDisabled: p.neutralTertiary,
        buttonBorderDisabled: 'transparent',
        primaryButtonBackground: p.themePrimary,
        primaryButtonBackgroundHovered: p.themeDarkAlt,
        primaryButtonBackgroundPressed: p.themeDark,
        primaryButtonBackgroundDisabled: p.neutralLighter,
        primaryButtonBorder: 'transparent',
        primaryButtonText: p.white,
        primaryButtonTextHovered: p.white,
        primaryButtonTextPressed: p.white,
        primaryButtonTextDisabled: p.neutralQuaternary,
        accentButtonBackground: p.accent,
        accentButtonText: p.white,
        menuBackground: p.white,
        menuDivider: p.neutralTertiaryAlt,
        menuIcon: p.themePrimary,
        menuHeader: p.themePrimary,
        menuItemBackgroundHovered: p.neutralLighter,
        menuItemBackgroundPressed: p.neutralLight,
        menuItemText: p.neutralPrimary,
        menuItemTextHovered: p.neutralDark,
        listBackground: p.white,
        listText: p.neutralPrimary,
        listItemBackgroundHovered: p.neutralLighter,
        listItemBackgroundChecked: p.neutralLight,
        listItemBackgroundCheckedHovered: p.neutralQuaternaryAlt,
        listHeaderBackgroundHovered: p.neutralLighter,
        listHeaderBackgroundPressed: p.neutralLight,
        actionLink: p.neutralPrimary,
        actionLinkHovered: p.neutralDark,
        link: p.themePrimary,
        linkHovered: p.themeDarker,
        // Deprecated slots, second pass by _fixDeprecatedSlots() later for self-referential slots
        listTextColor: '',
        menuItemBackgroundChecked: p.neutralLight
    };
    return _fixDeprecatedSlots(toReturn, depComments);
}
// https://github.com/OfficeDev/office-ui-fabric-react/blob/6.0/packages/styling/src/styles/DefaultEffects.ts#L3
// tslint:disable-next-line: variable-name
var DefaultEffects = {
    // commented values are the defaults for Fluent
    elevation4: '0 0 5px 0 rgba(0,0,0,.4)',
    elevation8: '0 0 5px 0 rgba(0,0,0,.4)',
    elevation16: '0 0 5px 0 rgba(0,0,0,.4)',
    elevation64: '0 0 5px 0 rgba(0,0,0,.4)',
    roundedCorner2: '0px' // 2
};
function _fixDeprecatedSlots(s, depComments) {
    // Add @deprecated tag as comment if enabled
    var dep = '';
    if (depComments === true) {
        dep = ' /* @deprecated */';
    }
    s.listTextColor = s.listText + dep;
    s.menuItemBackgroundChecked += dep;
    return s;
}


/***/ }),

/***/ "mUIx":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/dataSources/base/ServerConnection.js ***!
  \**************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ServerData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ServerData */ "6cmh");
/* harmony import */ var _ms_odsp_utilities_lib_uri_Uri__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/odsp-utilities/lib/uri/Uri */ "oQJL");
/* harmony import */ var _ms_odsp_utilities_lib_uri_Uri__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_uri_Uri__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_odsp_utilities_lib_scope_Scope__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/odsp-utilities/lib/scope/Scope */ "8qk/");
/* harmony import */ var _ms_odsp_utilities_lib_scope_Scope__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_scope_Scope__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_odsp_utilities_lib_logging_rumone_APICallPerformanceData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/odsp-utilities/lib/logging/rumone/APICallPerformanceData */ "h/u7");
/* harmony import */ var _ms_odsp_utilities_lib_logging_rumone_APICallPerformanceData__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_logging_rumone_APICallPerformanceData__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_odsp_utilities_lib_logging_rumone_RUMOneLogger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/odsp-utilities/lib/logging/rumone/RUMOneLogger */ "H6KY");
/* harmony import */ var _ms_odsp_utilities_lib_logging_rumone_RUMOneLogger__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_logging_rumone_RUMOneLogger__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ms_odsp_utilities_lib_events_EventGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ms/odsp-utilities/lib/events/EventGroup */ "siCY");
/* harmony import */ var _ms_odsp_utilities_lib_events_EventGroup__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_events_EventGroup__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ms/odsp-utilities/lib/async/Promise */ "MS/P");
/* harmony import */ var _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ms/odsp-utilities/lib/killswitch/Killswitch */ "WA4G");
/* harmony import */ var _ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ms_utilities_error_lib_ApiError__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ms/utilities-error/lib/ApiError */ "PcWP");
/* harmony import */ var _ms_utilities_error_lib_ApiError__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ms_utilities_error_lib_ApiError__WEBPACK_IMPORTED_MODULE_8__);









// Seconds subtracted from request digest interval to compensate for client-server delay
var CLIENT_SERVER_BUFFER = 60;
var ServerConnection = /** @class */ (function () {
    function ServerConnection(params) {
        if (params === void 0) { params = {}; }
        this._scope = new _ms_odsp_utilities_lib_scope_Scope__WEBPACK_IMPORTED_MODULE_2___default.a();
        this._events = this._scope.attach(new _ms_odsp_utilities_lib_events_EventGroup__WEBPACK_IMPORTED_MODULE_5___default.a(this));
        // If the absolute URL is provided, it will be used for most requests.
        var webAbsoluteUrl = params.webAbsoluteUrl || params.webUrl;
        // The server-relative URL is used for caching request digests.
        // If it's not provided, try and calculate it from the absolute URL.
        this._webServerRelativeUrl = params.webServerRelativeUrl || (webAbsoluteUrl && new _ms_odsp_utilities_lib_uri_Uri__WEBPACK_IMPORTED_MODULE_1___default.a(webAbsoluteUrl).getPath());
        if (this._webServerRelativeUrl === '/') {
            this._webServerRelativeUrl = '';
        }
        if (webAbsoluteUrl) {
            this._webAbsoluteUrl = webAbsoluteUrl;
            this._alwaysGetDigest = true;
        }
        else {
            this._alwaysGetDigest = false;
        }
        this._needsRequestDigest = params.needsRequestDigest !== false;
        if (this._needsRequestDigest) {
            this._tryLoadDigest(params.formDigest);
        }
        this._requestCanaryForAuth = false;
        this._engagement = params.engagement;
        this._operationName = params.operationName;
    }
    ServerConnection._useServerTimeExpirationCheck = function () {
        var useServerTimeExpirationCheckKillswitch = !_ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_7__["Killswitch"].isActivated('561C4018-2C0E-4580-9779-F755E0ECC79A', '07/05/2019', 'Use serverTime to check canary expiration, instead of updateFormDigestPageLoaded');
        return useServerTimeExpirationCheckKillswitch;
    };
    ServerConnection._isXhrAborted = function (xhr) {
        try {
            // status isn't necessarily valid unless the readyState is true.
            if (xhr.readyState === 4 && (typeof (xhr.status) === 'undefined' || xhr.status === 0)) {
                return true;
            }
            if (xhr.isCancelled) {
                return true;
            }
        }
        catch (e) {
            return true;
        }
        return false;
    };
    ServerConnection._isValidFormDigest = function (formDigest) {
        // Value of serverTime is same as what comes as part of formDigestValue
        // but is in locale neutral ISO 8601 format. So it will get correctly
        // parsed by Date class irrespective of client locale.
        // serverTime is accurate to the order of ms, while DateTime which comes
        // as part of formDigestValue is trimmed to order of seconds. Subtract
        // 60 s from formDigestTimeoutSeconds to avoid any timing errors b/w
        // server and client.
        if (ServerConnection._useServerTimeExpirationCheck()) {
            return formDigest && formDigest.serverTime &&
                (Date.now() - new Date(formDigest.serverTime).getTime()) < (formDigest.formDigestTimeoutSeconds - CLIENT_SERVER_BUFFER) * 1000 /*convert to ms*/;
        }
        else {
            return formDigest && formDigest.updateFormDigestPageLoaded &&
                (Date.now() - formDigest.updateFormDigestPageLoaded.getTime()) < formDigest.formDigestTimeoutSeconds * 1000 /*convert to ms*/;
        }
    };
    ServerConnection.prototype.dispose = function () {
        this._scope.dispose();
    };
    ServerConnection.prototype.abort = function () {
        if (this._currentRequest) {
            // Add a custom field to this request object so we can pass the message to the OnReadyStateChange function that THIS specific XHR has been canceled!
            //  It's unclear to me is this is really needed.  Some documentation I have ready states 'Calling abort resets the object; the onreadystatechange
            //  event handler is removed, and readyState is changed to 0 (uninitialized).'  If this is the case, then the onreadystatechange should never be
            //  called and if it is then the state of the request is set to 0, which I handle below.
            // For completeness only I leave this here.  (Belt and suspenders).
            var request = this._currentRequest;
            request.isCancelled = true;
            // Now abort this XHR
            request.abort();
            this._currentRequest = undefined;
        }
    };
    ServerConnection.prototype.isRequestActive = function () {
        return !!this._currentRequest;
    };
    ServerConnection.prototype.getServerDataFromUrl = function (options) {
        var _this = this;
        var strUrl = options.url, successCallback = options.successCallback, failureCallback = options.failureCallback, uploadProgressCallback = options.uploadProgressCallback, additionalPostData = options.additionalPostData, _a = options.isRest, fRest = _a === void 0 ? true : _a, _b = options.method, method = _b === void 0 ? 'POST' : _b, withCredentials = options.withCredentials, additionalHeaders = options.additionalHeaders, contentType = options.contentType, noRedirect = options.noRedirect, responseType = options.responseType, _c = options.needsRequestDigest, needsRequestDigest = _c === void 0 ? this._needsRequestDigest : _c;
        var startTime = new Date().toISOString();
        var req = new XMLHttpRequest();
        req.open(method, strUrl, true);
        if (typeof withCredentials === 'boolean') {
            req.withCredentials = withCredentials;
        }
        if (responseType) {
            req.responseType = responseType;
        }
        // Set the Content Type
        if (contentType) {
            req.setRequestHeader('Content-Type', contentType);
        }
        else {
            if (fRest) {
                req.setRequestHeader('Content-Type', 'application/json;odata=verbose');
            }
            else {
                req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            }
        }
        var acceptHeaderSpecified = false;
        if (additionalHeaders) {
            for (var headerKey in additionalHeaders) {
                if (headerKey) {
                    req.setRequestHeader(headerKey, additionalHeaders[headerKey]);
                    if (headerKey.toLowerCase() === 'accept') {
                        acceptHeaderSpecified = true;
                    }
                }
            }
        }
        if (!acceptHeaderSpecified) {
            req.setRequestHeader('accept', 'application/json;odata=verbose');
        }
        // Remember this request so we can tell if we have a request in flight and so we can cancel it if needed.
        this._currentRequest = req;
        var onRequestDigestReady = function (requestDigest) {
            if (needsRequestDigest && requestDigest) {
                req.setRequestHeader('x-requestdigest', requestDigest);
            }
            _this._events.on(req, 'readystatechange', function () {
                _this._onReadyStateChange(req, strUrl, successCallback, failureCallback, noRedirect, startTime);
            });
            if (uploadProgressCallback && req.upload) {
                _this._events.on(req.upload, 'progress', function (event) {
                    uploadProgressCallback(event);
                });
            }
            req.send(additionalPostData);
        };
        if (needsRequestDigest) {
            this._ensureRequestDigest(onRequestDigestReady, failureCallback);
        }
        else {
            onRequestDigestReady();
        }
    };
    ServerConnection.prototype.ensureRequestDigest = function (callback, failureCallback) {
        this._ensureRequestDigest(callback, failureCallback);
    };
    ServerConnection.prototype._ensureRequestDigest = function (callback, failureCallback) {
        // if requestDigest is available and not expired then use it, otherwise get a new one
        var currentDigest = ServerConnection._formDigests[this._webServerRelativeUrl];
        if (!this._alwaysGetDigest && ServerConnection._isValidFormDigest(currentDigest)) {
            callback(currentDigest.formDigestValue);
        }
        else {
            this._ensureRequestDigestWorker(callback, failureCallback);
        }
    };
    ServerConnection.prototype._ensureRequestDigestWorker = function (callback, failureCallback) {
        var _this = this;
        var formDigestRequestTime = new Date();
        var serverConnection = new ServerConnection({
            needsRequestDigest: false,
            webServerRelativeUrl: this._webServerRelativeUrl,
            webUrl: undefined
        });
        if (!callback) {
            // no callback only means we're doing auth only request.
            serverConnection._requestCanaryForAuth = true;
        }
        var webUrl = this._webAbsoluteUrl || this._webServerRelativeUrl;
        if (typeof webUrl === 'string') {
            // If static promise does not exist, create it
            if (!ServerConnection._requestDigestPromise) {
                ServerConnection._requestDigestPromise = new _ms_odsp_utilities_lib_async_Promise__WEBPACK_IMPORTED_MODULE_6___default.a(function (complete, e) {
                    var onDataSuccess = function (serverData) {
                        var responseText = serverData.getResponseText();
                        var jsonObj = JSON.parse(responseText);
                        var requestDigest = jsonObj.d.GetContextWebInformation;
                        ServerConnection._formDigests[_this._webServerRelativeUrl] = {
                            serverTime: formDigestRequestTime.toISOString(),
                            formDigestValue: requestDigest.FormDigestValue,
                            formDigestTimeoutSeconds: requestDigest.FormDigestTimeoutSeconds - CLIENT_SERVER_BUFFER,
                            updateFormDigestPageLoaded: new Date()
                        };
                        complete(ServerConnection._formDigests[_this._webServerRelativeUrl].formDigestValue);
                        ServerConnection._requestDigestPromise = undefined;
                    };
                    var onDataError = function (serverData) {
                        if (callback) {
                            callback(undefined);
                        }
                        else if (failureCallback) {
                            failureCallback(serverData);
                        }
                        e(undefined);
                        ServerConnection._requestDigestPromise = undefined;
                    };
                    serverConnection.getServerDataFromUrl({
                        url: _ms_odsp_utilities_lib_uri_Uri__WEBPACK_IMPORTED_MODULE_1___default.a.concatenate(webUrl, '/_api/contextinfo'),
                        successCallback: onDataSuccess,
                        failureCallback: onDataError,
                        method: 'POST',
                        noRedirect: !!failureCallback
                    });
                });
            }
            ServerConnection._requestDigestPromise.then(function (requestDigest) {
                if (callback) {
                    callback(requestDigest);
                }
                return requestDigest;
            });
        }
        else if (failureCallback) {
            failureCallback(undefined, new _ms_utilities_error_lib_ApiError__WEBPACK_IMPORTED_MODULE_8__["ApiError"]({
                code: 'MissingWebForDigestAuth',
                isExpected: false
            }));
        }
    };
    ServerConnection.prototype._onReadyStateChange = function (req, strUrl, successCallback, failureCallback, noRedirect, startTime) {
        // Don't do anything unless the State is 'Ready' and this request has not yet been aborted.
        if (req.readyState !== 4) {
            return;
        }
        // undefined out the request that this object is holding onto.  This is the flag to let us know that we no longer have an active request.
        this._currentRequest = undefined;
        this._events.off(req);
        if (req.upload) {
            this._events.off(req.upload);
        }
        if (!ServerConnection._isXhrAborted(req)) {
            var serverData_1 = new _ServerData__WEBPACK_IMPORTED_MODULE_0__["default"](req, strUrl, {
                webAbsoluteUrl: this._webAbsoluteUrl || this._webServerRelativeUrl,
                isCanaryRequest: this._requestCanaryForAuth
            });
            var status_1 = serverData_1.getStatus();
            var rumOne = _ms_odsp_utilities_lib_logging_rumone_RUMOneLogger__WEBPACK_IMPORTED_MODULE_4__["RUMOneLogger"].getRUMOneLogger();
            var apiEndTime = Date.now();
            if (rumOne) {
                var apiData = new _ms_odsp_utilities_lib_logging_rumone_APICallPerformanceData__WEBPACK_IMPORTED_MODULE_3___default.a(strUrl, Number(req.getResponseHeader('SPClientServiceRequestDuration')), req.getResponseHeader('SPRequestGuid'), status_1, startTime, new Date().toISOString());
                rumOne.writeAPICallPerformanceData(apiData); // log a API call perf data object for each API call before EUPL complete
                rumOne.saveTempData('appDataFetchEnd', apiEndTime); // Record the last API call end time as app data fetch end
            }
            var shouldRedirectToErrorCustomPromptLocation = !noRedirect && serverData_1.shouldRedirectToErrorCustomPromptLocation();
            if (this._requestCanaryForAuth) {
                this._requestCanaryForAuth = false;
                if (status_1 === 403) {
                    var redirectUrl = serverData_1.getRedirectLoginPageUrl();
                    try {
                        if (shouldRedirectToErrorCustomPromptLocation) {
                            window.location.href = serverData_1.getRedirectToErrorCustomPromptLocation();
                        }
                        else {
                            failureCallback(serverData_1);
                        }
                    }
                    catch (e) {
                        // ignore
                    }
                    if (redirectUrl && !noRedirect) {
                        window.location.href = redirectUrl;
                    }
                }
                else {
                    var redirectUrl = serverData_1.getAccessDeniedRedirectUrl();
                    // we got form digest, so user is authenticated, they just don't have access to call the API requested
                    // let data source know about the error so it get properly accounted
                    try {
                        failureCallback(serverData_1);
                    }
                    catch (e) {
                        // ignore
                    }
                    if (redirectUrl && !noRedirect) {
                        if (this._engagement) {
                            this._engagement.logData({
                                name: "AccessDeniedRedirect",
                                isIntentional: false,
                                extraData: {
                                    originalOperation: this._operationName || ''
                                }
                            });
                        }
                        window.location.href = redirectUrl;
                    }
                }
                return;
            }
            if (status_1 === 200 || status_1 === 201 || status_1 === 204) { // success case
                successCallback(serverData_1);
                return;
            }
            else if (status_1 === 403) { // authentication required
                ServerConnection._requestDigestPromise = undefined;
                if (noRedirect) {
                    this._ensureRequestDigestWorker(undefined, function () { return failureCallback(serverData_1); }); // call Canary to check if the user has already signed in or ot.
                }
                else {
                    if (shouldRedirectToErrorCustomPromptLocation) {
                        window.location.href = serverData_1.getRedirectToErrorCustomPromptLocation();
                    }
                    else {
                        this._ensureRequestDigestWorker(undefined);
                    }
                }
                return;
            }
            else if (status_1 === 401) {
                if (shouldRedirectToErrorCustomPromptLocation) {
                    window.location.href = serverData_1.getRedirectToErrorCustomPromptLocation();
                }
            }
            failureCallback(serverData_1);
        }
        else {
            failureCallback(undefined, new _ms_utilities_error_lib_ApiError__WEBPACK_IMPORTED_MODULE_8__["ApiError"]({
                code: 'RequestAborted',
                isExpected: true
            }));
        }
    };
    /** Attempts to load or refresh the cached form digest with the params form digest data. */
    ServerConnection.prototype._tryLoadDigest = function (formDigest) {
        if (ServerConnection._isValidFormDigest(formDigest) && !_ms_odsp_utilities_lib_killswitch_Killswitch__WEBPACK_IMPORTED_MODULE_7__["Killswitch"].isActivated('0BD8A6FF-5CA5-45F8-BE49-C60C2C417F38', '07/08/2019', 'Refresh cached form digest the moment we get a valid one from params')) {
            ServerConnection._formDigests[this._webServerRelativeUrl] = formDigest;
            return;
        }
        // should start using the params data when:
        // params has valid form digest data and
        // - the cached form digest data is invalid or expired or
        // - the params digest data is fresher that the cached data.
        var cachedFormDigest = ServerConnection._formDigests[this._webServerRelativeUrl];
        if (ServerConnection._isValidFormDigest(formDigest) &&
            (!ServerConnection._isValidFormDigest(cachedFormDigest) ||
                (cachedFormDigest &&
                    (ServerConnection._useServerTimeExpirationCheck() ?
                        new Date(cachedFormDigest.serverTime).getTime() < new Date(formDigest.serverTime).getTime() :
                        cachedFormDigest.updateFormDigestPageLoaded.getTime() < formDigest.updateFormDigestPageLoaded.getTime())))) {
            ServerConnection._formDigests[this._webServerRelativeUrl] = formDigest;
        }
    };
    ServerConnection._formDigests = {};
    ServerConnection._requestDigestPromise = undefined;
    return ServerConnection;
}());
/* harmony default export */ __webpack_exports__["default"] = (ServerConnection);
//# sourceMappingURL=ServerConnection.js.map

/***/ }),

/***/ "mlpC":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/MessageBar.styles.js ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: MessageBarStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageBarStyles", function() { return MessageBarStyles; });
var MessageBarStyles = function (props) {
    return {
        actions: {
            margin: '8px 12px 8px 8px'
        },
        dismissSingleLine: {
            display: 'flex',
            alignItems: props.truncated ? 'flex-start' : 'center',
            marginRight: 8
        }
    };
};
//# sourceMappingURL=MessageBar.styles.js.map

/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: ApplicationCustomizerContext, BaseApplicationCustomizer, ApplicationAccessor, _DialogManagerConfiguration, _SearchQueryManager, PlaceholderContent, PlaceholderName, _Placeholder, PlaceholderProvider, _PlaceholderManager, BaseApplication, _OnBeforeNavigationEventName, BaseApplicationContext, _ApplicationManager, _Navigator, _NavigationOperation, _NavigationUnsupportedReason, _NavigationDataError, _NavigationErrorCode, _PrefetchedDataEventArgs, _ApplicationLoadType, _SPThemeProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _extensibility_ApplicationCustomizerContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extensibility/ApplicationCustomizerContext */ "L9BA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApplicationCustomizerContext", function() { return _extensibility_ApplicationCustomizerContext__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _extensibility_BaseApplicationCustomizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extensibility/BaseApplicationCustomizer */ "5aZ1");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseApplicationCustomizer", function() { return _extensibility_BaseApplicationCustomizer__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _extensibility_ApplicationAccessor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extensibility/ApplicationAccessor */ "75qc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApplicationAccessor", function() { return _extensibility_ApplicationAccessor__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _extensibility_DialogManagerConfiguration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extensibility/DialogManagerConfiguration */ "7Cl3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_DialogManagerConfiguration", function() { return _extensibility_DialogManagerConfiguration__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _extensibility_SearchQueryManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./extensibility/SearchQueryManager */ "efvT");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_SearchQueryManager", function() { return _extensibility_SearchQueryManager__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _extensibility_placeholder_PlaceholderContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./extensibility/placeholder/PlaceholderContent */ "DXcd");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlaceholderContent", function() { return _extensibility_placeholder_PlaceholderContent__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _extensibility_placeholder_PlaceholderName__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./extensibility/placeholder/PlaceholderName */ "Cs6k");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlaceholderName", function() { return _extensibility_placeholder_PlaceholderName__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _extensibility_placeholder_Placeholder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./extensibility/placeholder/Placeholder */ "jZLx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_Placeholder", function() { return _extensibility_placeholder_Placeholder__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _extensibility_placeholder_PlaceholderProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./extensibility/placeholder/PlaceholderProvider */ "/Kpt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlaceholderProvider", function() { return _extensibility_placeholder_PlaceholderProvider__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _extensibility_placeholder_PlaceholderManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./extensibility/placeholder/PlaceholderManager */ "/HB6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_PlaceholderManager", function() { return _extensibility_placeholder_PlaceholderManager__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _BaseApplication__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./BaseApplication */ "n9Iz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseApplication", function() { return _BaseApplication__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _navigator_OnBeforeNavigationEventName__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./navigator/OnBeforeNavigationEventName */ "JwFY");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_OnBeforeNavigationEventName", function() { return _navigator_OnBeforeNavigationEventName__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _BaseApplicationContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./BaseApplicationContext */ "93Rs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseApplicationContext", function() { return _BaseApplicationContext__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _ApplicationManager__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ApplicationManager */ "Q81X");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_ApplicationManager", function() { return _ApplicationManager__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _navigator_Navigator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./navigator/Navigator */ "2fZ3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_Navigator", function() { return _navigator_Navigator__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _navigator_INavigationResult__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./navigator/INavigationResult */ "TNAb");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_NavigationOperation", function() { return _navigator_INavigationResult__WEBPACK_IMPORTED_MODULE_15__["NavigationOperation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_NavigationUnsupportedReason", function() { return _navigator_INavigationResult__WEBPACK_IMPORTED_MODULE_15__["NavigationUnsupportedReason"]; });

/* harmony import */ var _navigator_NavigationDataError__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./navigator/NavigationDataError */ "SClb");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_NavigationDataError", function() { return _navigator_NavigationDataError__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_NavigationErrorCode", function() { return _navigator_NavigationDataError__WEBPACK_IMPORTED_MODULE_16__["NavigationErrorCode"]; });

/* harmony import */ var _navigator_PrefetchedDataEventArgs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./navigator/PrefetchedDataEventArgs */ "n9H6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_PrefetchedDataEventArgs", function() { return _navigator_PrefetchedDataEventArgs__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _ApplicationLoadType__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ApplicationLoadType */ "fBGb");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_ApplicationLoadType", function() { return _ApplicationLoadType__WEBPACK_IMPORTED_MODULE_18__["ApplicationLoadType"]; });

/* harmony import */ var _pageChrome_SPThemeProvider__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./pageChrome/SPThemeProvider */ "6GSH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_SPThemeProvider", function() { return _pageChrome_SPThemeProvider__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/**
 * SharePoint Framework support for building and extending client-side applications.
 *
 * @packagedocumentation
 */
// Application Customizer





// Placeholders





// Base application









// Page Chrome



/***/ }),

/***/ "n9H6":
/*!**************************************************!*\
  !*** ./lib/navigator/PrefetchedDataEventArgs.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
// Copyright (c) Microsoft. All rights reserved.


/**
 * Arguments for a prefetched data event.
 *
 * @internal
 */
var PrefetchedDataEventArgs = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PrefetchedDataEventArgs, _super);
    /**
     * Initializes a new instance of the PrefetchedDataEventArgs class
     * @param appId - Represents the application Id
     * @param url - Represents the page url
     * @param data - Represents the payload
     */
    function PrefetchedDataEventArgs(appId, url, data) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(appId, 'id');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(url, 'url');
        _this = _super.call(this) || this;
        _this.applicationId = appId;
        _this.url = url;
        _this.data = data;
        return _this;
    }
    return PrefetchedDataEventArgs;
}(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["SPEventArgs"]));
/* harmony default export */ __webpack_exports__["default"] = (PrefetchedDataEventArgs);


/***/ }),

/***/ "n9Iz":
/*!********************************!*\
  !*** ./lib/BaseApplication.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-component-base */ "7Awa");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ms_sp_suite_nav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ms/sp-suite-nav */ "6iXJ");
/* harmony import */ var _ms_sp_suite_nav__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_suite_nav__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ms_uifabric_styling_bundle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ms/uifabric-styling-bundle */ "fglE");
/* harmony import */ var _ms_uifabric_styling_bundle__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ms_uifabric_styling_bundle__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _LegacyFabric6Function__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./LegacyFabric6Function */ "mBgx");
/* harmony import */ var _BaseApplicationContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./BaseApplicationContext */ "93Rs");
/* harmony import */ var _frameworkPlaceholders_AadPlaceholderManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./frameworkPlaceholders/AadPlaceholderManager */ "8Idf");
/* harmony import */ var _ms_sp_load_themed_styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ms/sp-load-themed-styles */ "5z2F");
/* harmony import */ var _ms_sp_load_themed_styles__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_load_themed_styles__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _pageChrome_SPThemeProvider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pageChrome/SPThemeProvider */ "6GSH");
/* harmony import */ var _ApplicationLoadType__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ApplicationLoadType */ "fBGb");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./common/Flights */ "w4+A");
/* harmony import */ var _ApplicationManager__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./ApplicationManager */ "Q81X");

















var SUITE_NAV_USE_SPO_BEHAVIOR_KILL_SWITCH = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Guid"].parse('22F8084E-9DEB-4642-B63E-E70A7F87C998');
var USE_FABRIC_6_THEME_KILL_SWITCH = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Guid"].parse('daea60a7-5d4b-4c49-b79c-22ace7a63d5c');
var INJECT_GLOBAL_SETTINGS_KILL_SWITCH = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Guid"].parse('ced512a8-994b-4218-89b5-9e6b861bcd92');
// Qos constants
var loadQosScenarioName = 'BaseApplication.load';
var renderQosScenarioName = 'BaseApplication.render';
var unloadQosScenarioName = 'BaseApplication.unload';
// tslint:disable-next-line: no-any
function addChangeCallback(object, propertyName, onChange) {
    var hiddenPropertyName = "_sp_workaround" + propertyName;
    object[hiddenPropertyName] = object[propertyName];
    Object.defineProperty(object, propertyName, {
        set: function (value) {
            object[hiddenPropertyName] = value;
            if (onChange) {
                onChange(object[hiddenPropertyName]);
            }
        },
        get: function () { return object[hiddenPropertyName]; }
    });
}
/**
 * This is the system base class for client-side applications.  It manages the overall
 * life cycle of your application, and is the first entry point for your code to start
 * executing when the page loads.  The two main events are onLoad() which occurs first,
 * and onRender() which occurs after the application manager has initialized the environment
 * and completed rendering the page chrome.
 *
 * @alpha
 */
var BaseApplication = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BaseApplication, _super);
    function BaseApplication() {
        var _this = _super.call(this) || this;
        _this._handleThemeChange = function (changedTheme) {
            var expectedSemanticColors = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, changedTheme.semanticColors, Object(_LegacyFabric6Function__WEBPACK_IMPORTED_MODULE_9__["makeSemanticColorsFromPalette"])(changedTheme.palette, false, false));
            if (!Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_6__["isEqual"])(changedTheme.semanticColors, expectedSemanticColors)
                || !Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_6__["isEqual"])(changedTheme.effects, _ms_uifabric_styling_bundle__WEBPACK_IMPORTED_MODULE_8__["DefaultEffects"])) {
                Object(_ms_uifabric_styling_bundle__WEBPACK_IMPORTED_MODULE_8__["loadTheme"])(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, changedTheme, { semanticColors: expectedSemanticColors, effects: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, changedTheme.effects, _ms_uifabric_styling_bundle__WEBPACK_IMPORTED_MODULE_8__["DefaultEffects"]) }));
            }
        };
        // tslint:disable-next-line:no-string-literal
        _this['__type'] = 'BaseApplication';
        if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["_SPKillSwitch"].isActivated(INJECT_GLOBAL_SETTINGS_KILL_SWITCH, '11/23/2019', 'InjectFabricGlobalSettings')) {
            addChangeCallback(Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_6__["get"])(window, '__globalSettings__'), 'customizations', function (value) { return _this._handleThemeChange(value.settings.theme); });
            addChangeCallback(Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_6__["get"])(window, '__globalSettings__.customizations'), 'settings', function (value) { return _this._handleThemeChange(value.theme); });
            addChangeCallback(Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_6__["get"])(window, '__globalSettings__.customizations.settings'), 'theme', function (value) { return _this._handleThemeChange(value); });
        }
        return _this;
    }
    Object.defineProperty(BaseApplication.prototype, "domElement", {
        /**
         * Returns the DOM element where the application is expected to render its content.
         * The domElement will be undefined until the onRender() event occurs.
         *
         * @remarks
         * IMPORTANT: The application should not access DOM elements outside of this subtree,
         * as they are system-defined and may change over time.
         *
         * Throws an error if the domElement is undefined.
         */
        get: function () {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Validate"].isNotNullOrUndefined(this.context, 'context');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Validate"].isNotDisposed(this.context, 'context');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Validate"].isNotNullOrUndefined(this.context.chrome, 'chrome');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Validate"].isNotDisposed(this.context.chrome, 'chrome');
            return this.context.chrome.appDiv;
        },
        set: function (value) {
            throw new Error('The property cannot be assigned because it is read-only');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * RESERVED FOR INTERNAL USAGE. This method is invoked automatically by the application manager.
     * The application code should not call it directly.
     *
     * @internal
     */
    BaseApplication.prototype._load = function (contextParameters) {
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_QosMonitor"](loadQosScenarioName);
        try {
            var applicationContext = this._getApplicationContext(contextParameters);
            this._initializeContext(applicationContext);
            var aadPlaceholderManager = new _frameworkPlaceholders_AadPlaceholderManager__WEBPACK_IMPORTED_MODULE_11__["default"]();
            aadPlaceholderManager.setUpTokenAcquistionFailurePlaceholder(this, this.context.serviceScope);
            return this.onLoad()
                .then(function () {
                qosMonitor.writeSuccess();
            }).catch(function (e) {
                qosMonitor.writeExpectedFailure('onLoadFailure', e);
                throw e;
            });
        }
        catch (error) {
            qosMonitor.writeUnexpectedFailure('SyncError', error);
            return Promise.reject(error);
        }
    };
    /**
     * RESERVED FOR INTERNAL USAGE. This method is invoked automatically by the application manager
     * to render the application.
     * The application code should not call it directly.
     *
     * @internal
     */
    BaseApplication.prototype._render = function () {
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_QosMonitor"](renderQosScenarioName);
        try {
            // We load styles async by default, which is good for performance.
            // At this point in time we want to ensure that all styles in buffer are mounted before
            // rendering the app.
            _ms_sp_load_themed_styles__WEBPACK_IMPORTED_MODULE_12__["flush"]();
            this.context.chrome.show();
            var isFullPageLoad = _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__["_SPLoaderFlights"]._useNewBootSequence() && _common_Flights__WEBPACK_IMPORTED_MODULE_15__["Flights"].useNewChromeSequence() ?
                this.context.loadType === _ApplicationLoadType__WEBPACK_IMPORTED_MODULE_14__["ApplicationLoadType"].FullPageLoad :
                true;
            var suiteNavManager = new _ms_sp_suite_nav__WEBPACK_IMPORTED_MODULE_7__["SuiteNavManager"](this.context.chrome.suiteNavDiv, this.context.serviceScope, isFullPageLoad);
            this.context.initializeSuiteNavManager(suiteNavManager);
            var config = this.suiteNavConfiguration();
            if (!config.isSuiteNavDisabled()) {
                var useNewFlow = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["_SPFlight"].isEnabled(1309 /* SPClientSuiteNavCommon */)
                    && config.isSuiteNavLoadingDeferred();
                if (useNewFlow) {
                    suiteNavManager.loadSuiteNavNewFlow(config); // uses new suite nav flow
                }
                else {
                    suiteNavManager.loadSuiteNav(config);
                }
            }
            this.onRender();
            if (_common_Flights__WEBPACK_IMPORTED_MODULE_15__["Flights"].delayExtensionsLoading &&
                !this.context.delayExtensionsLoading &&
                this.context.navigator) {
                this.context.navigator._loadApplicationCustomizers(this.context.preloadedData);
            }
            qosMonitor.writeSuccess();
        }
        catch (error) {
            qosMonitor.writeExpectedFailure('onRenderError', error);
        }
    };
    /**
     * RESERVED FOR INTERNAL USAGE. This method is invoked by the application manager
     * to unload the application. The page chrome is still available at this point
     * The application code should not call it directly.
     *
     * @internal
     */
    BaseApplication.prototype._unload = function () {
        if (!_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__["_SPLoaderFlights"]._useNewBootSequence()) {
            return;
        }
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_QosMonitor"](unloadQosScenarioName);
        try {
            this.onUnload();
            qosMonitor.writeSuccess();
        }
        catch (error) {
            qosMonitor.writeExpectedFailure('onUnloadError', error);
        }
    };
    /**
     * RESERVED FOR INTERNAL USAGE. This method is invoked automatically by the application manager
     * to load the application specific theme.
     * The application code should not call it directly.
     *
     * @internal
     */
    BaseApplication.prototype._loadTheme = function () {
        var _this = this;
        // When cleaning up the killswitch, keep the check for isChromelessApplication here and remove the check from
        // other code calling this function
        if (!_ApplicationManager__WEBPACK_IMPORTED_MODULE_16__["default"]._isChromelessApplication(this.componentId)) {
            Object(_ms_uifabric_styling_bundle__WEBPACK_IMPORTED_MODULE_8__["registerOnThemeChangeCallback"])(this._handleThemeChange);
            var themeProvider = this._getThemeProvider();
            themeProvider.loadThemedStyles().then(function () {
                if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["_SPKillSwitch"].isActivated(USE_FABRIC_6_THEME_KILL_SWITCH, '11/21/2019', 'UseFabric6Theme')) {
                    // Workaround to use fabric 6's theme in fabric 7.
                    // makeSemanticColorsFromPalette is copied from fabric 6's branch.
                    _this._handleThemeChange(Object(_ms_uifabric_styling_bundle__WEBPACK_IMPORTED_MODULE_8__["getTheme"])());
                }
            });
        }
    };
    /**
     * RESERVED FOR INTERNAL USAGE.
     * Internal API to dispose the application.
     * See onDispose for more details
     */
    BaseApplication.prototype.dispose = function () {
        if (_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__["_SPLoaderFlights"]._useNewBootSequence() && this.context.chrome) {
            this.context.chrome.hide();
        }
        if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["_SPKillSwitch"].isActivated(USE_FABRIC_6_THEME_KILL_SWITCH, '11/21/2019', 'UseFabric6Theme')) {
            Object(_ms_uifabric_styling_bundle__WEBPACK_IMPORTED_MODULE_8__["removeOnThemeChangeCallback"])(this._handleThemeChange);
        }
        this.onDispose();
        _super.prototype.dispose.call(this);
    };
    /**
     * Returns browser compatibility information for the application.
     *
     * @remarks
     * The SharePoint Framework tracks browser compatibility for the application and the framework.
     * Taken together, this information will determine the experience for the end user.
     *
     * Implement this method to report the level of support that your application provides for the current web browser.
     * Since the User Agent field is impersonated by various browsers, it’s recommended for the implementation to test
     * individual API features rather than trying to identify specific releases of browsers.
     */
    BaseApplication.prototype.getBrowserCompatibility = function () {
        return {
            supportLevel: 0 /* None */,
            warning: undefined
        };
    };
    /**
     * This virtual function returns the default configuration and can be configured by applications
     * when required.
     */
    BaseApplication.prototype.suiteNavConfiguration = function () {
        var config = new _ms_sp_suite_nav__WEBPACK_IMPORTED_MODULE_7__["SuiteNavManagerConfiguration"](this._getSuiteNavManagerConfigurationData());
        config.updateSuiteNavHeight = this._suiteNavHeightHandler.bind(this);
        return config;
    };
    BaseApplication.prototype.delayExtensionsLoading = function () {
        return _common_Flights__WEBPACK_IMPORTED_MODULE_15__["Flights"].delayExtensionsLoading && this.context.delayExtensionsLoading;
    };
    /**
     * This virtual function returns the default application context and can be configured by applications
     * when required.
     *
     * @internal
     */
    BaseApplication.prototype._getApplicationContext = function (contextParameters) {
        return new _BaseApplicationContext__WEBPACK_IMPORTED_MODULE_10__["default"](contextParameters);
    };
    /**
     * This virtual function returns the default application theme provider and can be overridden by applications
     * when required.
     *
     * @internal
     */
    BaseApplication.prototype._getThemeProvider = function () {
        return new _pageChrome_SPThemeProvider__WEBPACK_IMPORTED_MODULE_13__["default"](this.context.serviceScope);
    };
    /**
     * This life cycle event occurs immediately after the application manager has loaded the application,
     * before the DOM is constructed.  Applications can use this event to load scripts
     * or start asynchronous operations that need to occur early in the lifecycle.
     * Inside the onLoad() event, applications may also modify the rendering of various
     * page chrome elements, for example by calling this.context.suiteNav.setComponentVisibility(false).
     */
    BaseApplication.prototype.onLoad = function () {
        // (implemented by subclass)
        return Promise.resolve();
    };
    /**
     * This lifecycle event occurs before hiding the application chrome. At this point the application still has
     * the DOM element available and can perform specific operations before the chrome is hidden from the view-port
     */
    BaseApplication.prototype.onUnload = function () {
        // (implemented by subclass)
    };
    /**
     * This lifecycle event occurs after the application manager has constructed the DOM for the page chrome.
     * At this time, the domElement property will be initialized, and the application can begin
     * rendering its own DOM elements.
     */
    BaseApplication.prototype.onRender = function () {
        // (implemented by subclass)
    };
    /**
     * This API is called at the end of the application lifecycle. It should be used to dispose any local
     * resources (i.e. DOM elements) that the application is holding onto.
     *
     * This API is expected to be called in scenarios like cross-application navigation
     * i.e. the host is transitioning from one application to another and disposes the application that is being
     * transitioned out.
     */
    BaseApplication.prototype.onDispose = function () {
        // (implemented by subclass)
    };
    /**
     * Provides the data necessary to construct an instance of SuiteNavManagerConfiguration
     * @internal
     */
    BaseApplication.prototype._getSuiteNavManagerConfigurationData = function () {
        var pageContext = this.context.pageContext;
        var webTemplateId;
        if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["_SPKillSwitch"].isActivated(SUITE_NAV_USE_SPO_BEHAVIOR_KILL_SWITCH, '9/08/2017', 'SuiteNavUseSPOBehaviors')) {
            webTemplateId = pageContext.legacyPageContext.webTemplateId;
        }
        var disableSuiteNavSearchBox = false;
        if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Guid"].parse('E0B09CB0-1731-4AEC-BD7D-5F8EE2A10737'), '10/08/2019', 'Disable suite nav search box based on pagecontext setting')) {
            disableSuiteNavSearchBox = pageContext.legacyPageContext.searchBoxInNavBar === 3 /* Hidden */;
        }
        return {
            currentUICultureName: pageContext.cultureInfo.currentUICultureName,
            disableSuiteNav: this._shouldDisableSuiteNav(),
            settingsData: pageContext.legacyPageContext.MenuData ?
                pageContext.legacyPageContext.MenuData.SettingsData :
                undefined,
            signoutUrl: pageContext.legacyPageContext.MenuData ?
                pageContext.legacyPageContext.MenuData.SignOutUrl :
                undefined,
            siteClientTag: pageContext.legacyPageContext.siteClientTag,
            systemUserKey: pageContext.legacyPageContext.systemUserKey,
            userDisplayName: pageContext.user.displayName,
            webServerRelativeUrl: pageContext.web.serverRelativeUrl,
            webTemplateId: webTemplateId,
            disableSuiteNavSearchBox: disableSuiteNavSearchBox
        };
    };
    /**
     * Causes the navigator to navigate to a new page
     *
     * @remarks
     * This will be removed soon. Please use navigator from application context
     * to invoke public APIs
     */
    BaseApplication.prototype._navigate = function (url, props) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Validate"].isNonemptyString(url, 'url');
        return this.context.navigator.navigate(url, props).then(function (res) {
            // When the flight is off we need to re-load the application customizers after the navigation has happened.
            // This is to map with the behavior for the first-time render of the application
            if (!_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__["_SPLoaderFlights"]._useNewBootSequence()) {
                _this.context.navigator._loadApplicationCustomizers(res.preloadedData);
            }
            return res;
        });
    };
    /**
     * Allows the navigator to reinitialize SPFx components with `_IPreloadedData`.
     *
     * @remarks
     * This will be removed soon. Please use navigator from application context
     * to invoke public APIs
     *
     * Navigation is an async operation but calling this API ignores the promise.
     * This is used by List application to change the context, so the framework will send the appropriate events
     * for the context change, but it doesn't impact the application.
     */
    BaseApplication.prototype._navigateToPreloadedData = function (preloadedData) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Validate"].isNotNullOrUndefined(preloadedData, 'preloadedData');
        this.context.navigator.navigateToPreloadedData(preloadedData).then(function () {
            // When the flight is off we need to re-load the application customizers after the navigation has happened.
            // This is to map with the behavior for the first-time render of the application
            if (!_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__["_SPLoaderFlights"]._useNewBootSequence()) {
                _this.context.navigator._loadApplicationCustomizers(preloadedData);
            }
        });
    };
    /**
     * Invalidates a cached resource by its URL. Any subsequent request for the resource
     * will be fetched from its origin and recached.
     *
     * @param url - URL to invalidate
     *
     * @remarks
     * This will be removed soon. Please use navigator from application context
     * to invoke public APIs
     */
    BaseApplication.prototype._invalidate = function (url) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Validate"].isNonemptyString(url, 'url');
        return this.context.navigator.invalidate(url);
    };
    /**
     * Raises an event for a layout change.
     */
    BaseApplication.prototype.raiseLayoutChangedEvent = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["_SPEventManager"].instance.raiseEvent(BaseApplication._layoutChangedEventName, {});
    };
    BaseApplication.prototype._shouldDisableSuiteNav = function () {
        var urlQueryParams = new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["UrlQueryParameterCollection"](window.location.href);
        return window.location.hostname === 'localhost' ||
            urlQueryParams.getValue('disableSuiteNav') === 'true' ?
            true :
            false;
    };
    /**
     * This is a handler to update Suite Nav container height, when sp-suite-nav wants to update it.
     *
     * @param height - Height of the suite nav bar container to be set.
     */
    BaseApplication.prototype._suiteNavHeightHandler = function (height) {
        if (this.context.chrome) {
            this.context.chrome.changeSuiteNavHeight(height);
        }
    };
    /**
     * SPEvent name for page navigation.
     * @internal
     */
    BaseApplication._navigatedEventName = 'application.navigatedEvent';
    /**
     * SPEvent name for layout changes.
     * @internal
     */
    BaseApplication._layoutChangedEventName = 'application.layoutChangedEvent';
    /**
     * SPEvent name for prefetched data availability.
     * @internal
     */
    BaseApplication._prefetchedDataEventName = 'application.prefetchedDataEvent';
    /**
     * SPEvent name for application pre in-place navigation.
     * @internal
     */
    BaseApplication._onBeforeNavigationEventName = 'application.onBeforeNavigationEventName';
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["override"]
    ], BaseApplication.prototype, "dispose", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseApplication.prototype, "getBrowserCompatibility", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseApplication.prototype, "suiteNavConfiguration", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseApplication.prototype, "delayExtensionsLoading", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseApplication.prototype, "_getApplicationContext", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseApplication.prototype, "_getThemeProvider", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseApplication.prototype, "onLoad", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseApplication.prototype, "onUnload", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseApplication.prototype, "onRender", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseApplication.prototype, "onDispose", null);
    return BaseApplication;
}(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (BaseApplication);


/***/ }),

/***/ "o+Qb":
/*!*************************************************!*\
  !*** ./lib/navigator/NavigationDataProvider.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _NavigationDataError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NavigationDataError */ "SClb");
// Copyright (c) Microsoft. All rights reserved.




/**
 * Navigation Data Provider for SPFx applications.
 * It fetches data required to initiate an SPFx Navigation operation. It also caches the navigation
 * data when appropriate
 *
 * @internal
 */
var NavigationDataProvider = /** @class */ (function () {
    function NavigationDataProvider(serviceScope, validator) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(serviceScope, 'serviceScope');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(validator, 'validator');
        this._spHttpClient = serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].serviceKey);
        this._dataValidator = validator;
    }
    Object.defineProperty(NavigationDataProvider.prototype, "buildId", {
        get: function () {
            return this._buildId;
        },
        /**
         * Keeps track of the build id the application is bootstrapped with.
         * Used to detect when the build id change while the app is
         * running, and to invalidate manifest caches containing the old build id.
         *
         * @param buildId - Build id the application was bootstrapped with.
         */
        set: function (buildId) {
            this._buildId = buildId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Issues a request to get data association with a given url
     *
     * @param url - URL of the page to fetch data for
     * @param requestType - The request type
     * @param props - Optional Navigation property bag
     *
     * @returns - A navigation data response promise
     */
    NavigationDataProvider.prototype.getData = function (url, props) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(url, 'url');
        return _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["_SPLoaderFlights"]._useNewBootSequence() ?
            this._getStore().then(function (store) { return store.getData(url, props); }) :
            Promise.resolve({
                preloadedData: this._fetchData(url)
            });
    };
    /**
     * Invalidates a cached resource by its URL. Any subsequent request for the resource
     * will be fetched from its origin and recached.
     *
     * @param url - URL to invalidate
     */
    NavigationDataProvider.prototype.invalidate = function (url) {
        return this._getStore().then(function (store) {
            store.remove(url);
        });
    };
    NavigationDataProvider.prototype._getStore = function () {
        var _this = this;
        if (this._navigationStore) {
            return Promise.resolve(this._navigationStore);
        }
        return this._navigationStorePromise || (this._navigationStorePromise = __webpack_require__.e(/*! import() | sp-navigation-datastore */ "sp-navigation-datastore").then(__webpack_require__.bind(null, /*! ./NavigationDataStore */ "oPyX"))
            .then(function (dataStore) {
            _this._navigationStore = new dataStore.default(NavigationDataProvider.storeKey, NavigationDataProvider.storeBuildIdKey, _this._buildId, function (url, headers) {
                return _this._fetchData(url, headers);
            }, _this._dataValidator);
            return _this._navigationStore;
        }));
    };
    /**
     * Loads a page from SharePoint.
     *
     * @param url - URL of the page to load.
     * @param requestHeaders - Optional request headers
     * @return Promise with the pertinent data for the request.
     */
    NavigationDataProvider.prototype._fetchData = function (url, requestHeaders) {
        // Using ?as=json to ensure that the browser doesn't return a cached request for the HTML
        return this._spHttpClient.get(url + (url.indexOf('?') === -1 ? '?' : '&') + 'as=json', _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, requestHeaders ? { headers: requestHeaders } : undefined).then(function (response) {
            if (!response.ok) {
                throw _NavigationDataError__WEBPACK_IMPORTED_MODULE_3__["default"].createNavigationError(_NavigationDataError__WEBPACK_IMPORTED_MODULE_3__["NavigationErrorCode"].fetchData, new Error(response.statusMessage));
            }
            else {
                return response.json().catch(function (error) {
                    throw _NavigationDataError__WEBPACK_IMPORTED_MODULE_3__["default"].createNavigationError(_NavigationDataError__WEBPACK_IMPORTED_MODULE_3__["NavigationErrorCode"].parseData, error);
                });
            }
        });
    };
    NavigationDataProvider.storeKey = 'sp-application-base:NavigationDataStore';
    NavigationDataProvider.storeBuildIdKey = 'sp-application-base:NavigationDataStore:buildId';
    return NavigationDataProvider;
}());
/* harmony default export */ __webpack_exports__["default"] = (NavigationDataProvider);


/***/ }),

/***/ "oQJL":
/*!*****************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/uri/Uri.js ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @ms/odsp-utilities/uri/Uri.js
var pkg = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
module.exports = {}
module.exports.default = pkg.Uri;
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "pOZB":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/CommandBarButton.styles.js ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: CommandBarButtonStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommandBarButtonStyles", function() { return CommandBarButtonStyles; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/Styling */ "xS3b");


var CommandBarButtonStyles = function (props) {
    var theme = props.theme;
    if (!theme) {
        throw new Error('Theme is undefined or null.');
    }
    var palette = theme.palette;
    return {
        root: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ backgroundColor: palette.neutralLighter }, Object(office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__["getFocusStyle"])(theme, { inset: 0 })),
        rootHovered: {
            backgroundColor: palette.neutralLight
        },
        rootPressed: {
            backgroundColor: palette.neutralQuaternaryAlt
        },
        rootExpanded: {
            backgroundColor: palette.neutralQuaternaryAlt
        },
        rootChecked: {
            backgroundColor: palette.neutralQuaternaryAlt
        },
        rootCheckedHovered: {
            backgroundColor: palette.neutralQuaternaryAlt
        },
        rootDisabled: {
            backgroundColor: palette.neutralLighter
        },
        splitButtonMenuButton: {
            backgroundColor: palette.neutralLighter,
            selectors: {
                ':hover': {
                    backgroundColor: palette.neutralLight
                }
            }
        },
        splitButtonMenuButtonChecked: {
            backgroundColor: palette.neutralQuaternaryAlt
        },
        splitButtonMenuButtonExpanded: {
            backgroundColor: palette.neutralQuaternaryAlt
        },
        splitButtonMenuButtonDisabled: {
            backgroundColor: palette.neutralLighter
        }
    };
};
//# sourceMappingURL=CommandBarButton.styles.js.map

/***/ }),

/***/ "pOeb":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/Label.styles.js ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: LabelStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LabelStyles", function() { return LabelStyles; });
/* harmony import */ var _uifabric_styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/styling */ "jQzw");
/* harmony import */ var _uifabric_styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_uifabric_styling__WEBPACK_IMPORTED_MODULE_0__);

var LabelStyles = {
    root: {
        fontWeight: _uifabric_styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].regular
    }
};
//# sourceMappingURL=Label.styles.js.map

/***/ }),

/***/ "pgz/":
/*!****************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/theming/ThemeCache.js ***!
  \****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OneDrive:IgnoreCodeCoverage
Object.defineProperty(exports, "__esModule", { value: true });
var BaseDataStore_1 = __webpack_require__(/*! ../models/store/BaseDataStore */ "IveV");
var DataStoreCachingType_1 = __webpack_require__(/*! ../models/store/DataStoreCachingType */ "y91V");
var THEME_CACHE_VERSION = '1.7';
var THEME_CACHE_PREFIX = 'odTheme';
var DATA_KEY = 'Data';
var TOKEN_KEY = 'CacheToken';
var VERSION_KEY = 'CacheVersion';
/**
 * Utility methods for caching theme data.
 */
var ThemeCache = /** @class */ (function () {
    function ThemeCache() {
    }
    /**
     * Clears the theme cache.
     */
    ThemeCache.clearThemeCache = function () {
        "use strict";
        var ds = ThemeCache.getThemeDataStore();
        ds.remove(DATA_KEY);
        ds.remove(TOKEN_KEY);
        ds.remove(VERSION_KEY);
    };
    /**
     * Reads the cached theme, if the cacheToken is compatible.
     * @param {string} cacheToken The cached value will only be returned if it has the same cache token.
     */
    ThemeCache.getCachedTheme = function (cacheToken) {
        "use strict";
        var cachedTheme;
        var ds = ThemeCache.getThemeDataStore();
        try {
            // Make sure the data was cached with the expected version and
            // the current theme cache token. Otherwise, return undefined.
            if (cacheToken === ds.getValue(TOKEN_KEY) &&
                THEME_CACHE_VERSION === ds.getValue(VERSION_KEY)) {
                cachedTheme = ds.getValue(DATA_KEY);
            }
        }
        catch (exReadCache) {
            // Ignore.
        }
        return cachedTheme;
    };
    /**
     * Updates the theme data in the cache.
     * @param {IThemeData} themeData The new theme data to cache.
     */
    ThemeCache.updateThemeCache = function (themeData, cacheToken) {
        "use strict";
        var ds = ThemeCache.getThemeDataStore();
        ds.setValue(DATA_KEY, themeData);
        ds.setValue(TOKEN_KEY, cacheToken || themeData.cacheToken);
        ds.setValue(VERSION_KEY, THEME_CACHE_VERSION);
    };
    /**
     * Returns an instance of the supporting data store for this cache.
     */
    ThemeCache.getThemeDataStore = function () {
        "use strict";
        return new BaseDataStore_1.default(THEME_CACHE_PREFIX, DataStoreCachingType_1.default.local);
    };
    return ThemeCache;
}());
exports.default = ThemeCache;
//# sourceMappingURL=ThemeCache.js.map

/***/ }),

/***/ "q/xN":
/*!*********************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/async/Retry.js ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Signal_1 = __webpack_require__(/*! ./Signal */ "f2ns");
/**
 * Retry allows you to invoke a callback a configurable number of times before giving up.
 */
function Retry(config) {
    var adjustRetries = config.adjustRetries, async = config.async, beforeRetry = config.beforeRetry, callback = config.callback, _a = config.canRetry, canRetry = _a === void 0 ? function () { return true; } : _a, delay = config.delay, resetAttemptsOnRestart = config.resetAttemptsOnRestart, retries = config.retries, shouldRestart = config.shouldRestart;
    var attempts = 0;
    var promise;
    var signal = new Signal_1.default(function () {
        promise.cancel();
    });
    function onSuccess(value) {
        if (shouldRestart && shouldRestart()) {
            if (resetAttemptsOnRestart) {
                attempts = 0;
            }
            callCallback();
        }
        else {
            signal.complete(value);
        }
    }
    function onError(error) {
        if (adjustRetries) {
            retries = adjustRetries(error);
        }
        if (attempts < retries && canRetry(error)) {
            attempts++;
            if (beforeRetry) {
                beforeRetry();
            }
            if (typeof delay === 'number' && async) {
                async.setTimeout(callCallback, delay);
            }
            else {
                callCallback();
            }
        }
        else {
            signal.error(error);
        }
    }
    function callCallback() {
        promise = callback();
        promise.then(onSuccess, onError);
    }
    callCallback();
    return signal.getPromise();
}
exports.default = Retry;
//# sourceMappingURL=Retry.js.map

/***/ }),

/***/ "rdzh":
/*!**********************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/telemetry-manager/0.12.6/node_modules/@ms/telemetry-manager/lib/Manager.js ***!
  \**********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tCkv");
var deepCopy_1 = __webpack_require__(/*! @ms/utilities-objects/lib/deepCopy */ "Gnpm");
var maxBufferSize = 100;
function getStartDate() {
    if (window.performance && window.performance.timing && window.performance.timing.navigationStart) {
        return new Date(window.performance.timing.navigationStart);
    }
    else {
        return new Date();
    }
}
var PrivateManager = /** @class */ (function () {
    function PrivateManager() {
        this._handlers = [];
        this._buffer = [];
        this._validationLoggers = [];
        this._featureEnablers = [];
    }
    Object.defineProperty(PrivateManager.prototype, "startDate", {
        get: function () {
            return getStartDate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivateManager.prototype, "startTime", {
        get: function () {
            var startDate = this.startDate;
            return startDate.getTime();
        },
        enumerable: true,
        configurable: true
    });
    PrivateManager.prototype.getTime = function () {
        return (new Date()).getTime();
    };
    /** This is the overrideable clean string function. Return undefined to drop a parameter altogether. */
    PrivateManager.prototype.cleanString = function (str) {
        return str;
    };
    PrivateManager.prototype.addLogHandler = function (handler) {
        var handlers = this._handlers;
        var buffer = this._buffer;
        handlers.push(handler);
        // Return the buffer so the handler can get missed events
        return buffer.slice();
    };
    PrivateManager.prototype.removeLogHandler = function (handler) {
        var handlers = this._handlers;
        for (var x = 0; x < handlers.length; x++) {
            if (handlers[x] === handler) {
                // Remove the handler
                handlers.splice(x, 1);
                break;
            }
        }
    };
    PrivateManager.prototype.logEvent = function (event, eventType) {
        var buffer = this._buffer;
        var handlers = this._handlers;
        // Clone the object (do it natively because the browser can mark it as a type)
        var clonedEvent = Object.freeze({
            data: deepCopy_1.deepCopy(event.data),
            context: tslib_1.__assign({}, event.context),
            id: event.id,
            enabled: event.enabled,
            critical: event.critical,
            endTime: event.endTime,
            eventName: event.eventName,
            shortEventName: event.shortEventName,
            parentId: event.parentId,
            startTime: event.startTime,
            eventType: eventType,
            metadata: event.metadata,
            vector: event.vector,
            validationErrors: event.validationErrors,
            isEventTypePrefixingDisabled: event.isEventTypePrefixingDisabled
        });
        // Add to the buffer
        buffer.push(clonedEvent);
        if (buffer.length > maxBufferSize) {
            buffer.splice(1, Infinity);
            // Make sure we have a handler before the buffer is overrun
            if (handlers.length === 0) {
                _handleBaseLoggingError(new Error('Logging buffer overflow hit before any logging handler was registered'));
            }
        }
        // Let handlers know the log event has completed
        for (var x = 0; x < handlers.length; x++) {
            try {
                handlers[x](clonedEvent);
            }
            catch (e) {
                _handleBaseLoggingError(e);
            }
        }
    };
    PrivateManager.prototype.addValidationErrorLogger = function (validationLogger) {
        var validationLoggers = this._validationLoggers;
        validationLoggers.push(validationLogger);
    };
    PrivateManager.prototype.removeValidationErrorLogger = function (validationLogger) {
        var validationLoggers = this._validationLoggers;
        var index = validationLoggers.indexOf(validationLogger);
        if (index > -1) {
            validationLoggers.splice(index, 1);
        }
    };
    PrivateManager.prototype.logValidationError = function (event, type) {
        var validationLoggers = this._validationLoggers;
        for (var _i = 0, validationLoggers_1 = validationLoggers; _i < validationLoggers_1.length; _i++) {
            var validationLogger = validationLoggers_1[_i];
            try {
                validationLogger(event, type);
            }
            catch (e) {
                _handleBaseLoggingError(e);
            }
        }
    };
    PrivateManager.prototype.isFeatureEnabled = function (feature) {
        var featureEnablers = this._featureEnablers;
        for (var _i = 0, featureEnablers_1 = featureEnablers; _i < featureEnablers_1.length; _i++) {
            var featureEnabler = featureEnablers_1[_i];
            if (featureEnabler(feature)) {
                return true;
            }
        }
        return false;
    };
    PrivateManager.prototype.addFeatureEnabler = function (featureEnabler) {
        var featureEnablers = this._featureEnablers;
        featureEnablers.push(featureEnabler);
    };
    PrivateManager.prototype.removeFeatureEnabler = function (featureEnabler) {
        var featureEnablers = this._featureEnablers;
        var index = featureEnablers.indexOf(featureEnabler);
        if (index > -1) {
            featureEnablers.splice(index, 1);
        }
    };
    PrivateManager.prototype.getStack = function () {
        var error;
        try {
            var w = window;
            if (w.______ExpectedError______) {
                w.______ExpectedError______();
            }
        }
        catch (e) {
            error = e;
        }
        return error && error.stack || undefined;
    };
    return PrivateManager;
}());
/**
 * Creates a new, private manager with its own event queue and handlers.
 */
function createManager() {
    return new PrivateManager();
}
exports.createManager = createManager;
function createDefaultGlobalManager() {
    var globalManager;
    if (typeof window !== 'undefined') {
        globalManager = window.ODSP_TELEMETRY_MANAGER = window.ODSP_TELEMETRY_MANAGER || createManager();
    }
    else if (typeof self !== 'undefined') {
        globalManager = self.ODSP_TELEMETRY_MANAGER = self.ODSP_TELEMETRY_MANAGER || createManager();
    }
    else {
        globalManager = createManager();
    }
    return globalManager;
}
/**
 * Gets the default/fallback telemetry manager for the running application.
 */
exports.Manager = createDefaultGlobalManager();
function _handleBaseLoggingError(error) {
    // TODO: Log somewhere
}
//# sourceMappingURL=Manager.js.map

/***/ }),

/***/ "siCY":
/*!***************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/events/EventGroup.js ***!
  \***************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @ms/odsp-utilities/events/EventGroup.js
var pkg = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
module.exports = {}
module.exports.default = pkg.EventGroup;
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "syhi":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/Link.styles.js ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! exports provided: LinkStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkStyles", function() { return LinkStyles; });
var LinkStyles = function (props) {
    var isDisabled = props.isDisabled;
    return {
        root: [
            !isDisabled && {
                selectors: {
                    '&:active, &:hover, &:active:hover': {
                        textDecoration: 'none'
                    }
                }
            }
        ]
    };
};
//# sourceMappingURL=Link.styles.js.map

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

/***/ "uwwA":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/Pivot.styles.js ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: PivotStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PivotStyles", function() { return PivotStyles; });
/* harmony import */ var office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! office-ui-fabric-react/lib/Styling */ "xS3b");

var PivotStyles = function (props) {
    var theme = props.theme, rootIsTabs = props.rootIsTabs;
    var palette = theme.palette;
    return {
        link: [
            !rootIsTabs && {
                height: 40,
                lineHeight: 40,
                selectors: {
                    ':hover': {
                        backgroundColor: 'transparent',
                        color: palette.neutralDark
                    },
                    ':active': {
                        backgroundColor: 'transparent'
                    }
                }
            }
        ],
        linkIsSelected: [
            !rootIsTabs && {
                height: 40,
                lineHeight: 40,
                selectors: {
                    ':hover': {
                        backgroundColor: 'transparent'
                    },
                    ':active': {
                        backgroundColor: 'transparent'
                    },
                    ':before': {
                        transition: "left " + office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].durationValue2 + " " + office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].easeFunction2 + ",\n                        right " + office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].durationValue2 + " " + office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].easeFunction2
                    },
                    ':hover::before': {
                        left: 8,
                        right: 8
                    }
                }
            }
        ]
    };
};
//# sourceMappingURL=Pivot.styles.js.map

/***/ }),

/***/ "vFq2":
/*!*********************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/utilities-objects/0.10.2/node_modules/@ms/utilities-objects/lib/assign.js ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tCkv");
/**
 * @public
 */
function assign(base, extension) {
    return tslib_1.__assign(base, extension);
}
exports.assign = assign;
//# sourceMappingURL=assign.js.map

/***/ }),

/***/ "vgaU":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/Facepile.styles.js ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: FacepileStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacepileStyles", function() { return FacepileStyles; });
var FacepileStyles = function (props) {
    var theme = props.theme;
    var palette = theme.palette;
    return {
        overflowButton: {
            backgroundColor: palette.neutralLight
        },
        descriptiveOverflowButton: {
            backgroundColor: palette.neutralLight
        }
    };
};
//# sourceMappingURL=Facepile.styles.js.map

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

/***/ "vt24":
/*!******************************************!*\
  !*** ./lib/pageChrome/SPMasterChrome.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Flights */ "w4+A");
/* harmony import */ var _error_SPGlobalErrorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../error/SPGlobalErrorHandler */ "1/3/");
// Copyright (c) Microsoft. All rights reserved.



var SPMasterChrome = /** @class */ (function () {
    function SPMasterChrome() {
        this._isVisible = false;
        this._isDisposed = false;
        this._createPageChrome();
    }
    /**
     * Shows the chrome.
     */
    SPMasterChrome.prototype.show = function () {
        if (!this._isDisposed && !this._isVisible) {
            document.body.appendChild(this._chromeDiv);
            this._isVisible = true;
        }
    };
    /**
     * Hides the chrome.
     */
    SPMasterChrome.prototype.hide = function () {
        if (!this._isDisposed && this._isVisible) {
            this._chromeDiv = document.body.removeChild(this._chromeDiv);
            this._isVisible = false;
        }
    };
    /**
     * Disposes the Chrome
     */
    SPMasterChrome.prototype.dispose = function () {
        if (!this._isDisposed) {
            this._chromeDiv = document.body.removeChild(this._chromeDiv);
            delete this._suiteNavDiv;
            delete this._chromeDiv;
            this._isDisposed = true;
        }
    };
    Object.defineProperty(SPMasterChrome.prototype, "chromeDiv", {
        /**
         * Gets the chrome div
         */
        get: function () {
            return this._chromeDiv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPMasterChrome.prototype, "suiteNavDiv", {
        /**
         * Gets the suite nav div
         */
        get: function () {
            return this._suiteNavDiv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPMasterChrome.prototype, "isDisposed", {
        /**
         * Returns true if the object has already been disposed, otherwise false.
         */
        get: function () {
            return this._isDisposed;
        },
        enumerable: true,
        configurable: true
    });
    SPMasterChrome.prototype._createPageChrome = function () {
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__["_PerformanceLogger"].devMark('SPPageChrome.createPageChromeMaster');
        // Page body
        document.body.className = 'ms-font-m';
        // Page Chrome div
        this._chromeDiv = document.createElement('div');
        var chromeDivClasses = 'SPPageChrome';
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_1__["Flights"].isFluentEnabled) {
            chromeDivClasses += ' isFluent';
        }
        else {
            chromeDivClasses += ' isNotFluent';
        }
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_1__["Flights"].preloadSuiteNav) {
            chromeDivClasses += ' withExternalSuiteNav';
        }
        this._chromeDiv.setAttribute('class', chromeDivClasses);
        // SuiteNav div
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_1__["Flights"].preloadSuiteNav) {
            this._suiteNavDiv = document.getElementById('SuiteNavPlaceholder');
        }
        else {
            this._suiteNavDiv = document.createElement('div');
            this._suiteNavDiv.setAttribute('id', 'SuiteNavPlaceHolder');
            this._chromeDiv.appendChild(this._suiteNavDiv);
        }
        if (!window.onerror) {
            window.onerror = _error_SPGlobalErrorHandler__WEBPACK_IMPORTED_MODULE_2__["default"].basicTracingHandler;
        }
    };
    return SPMasterChrome;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPMasterChrome);


/***/ }),

/***/ "vtqB":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/interfaces/WebTemplateType.js ***!
  \*******************************************************************************************************************************************************************************************/
/*! exports provided: WebTemplateType, isTeamSiteLike, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebTemplateType", function() { return WebTemplateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTeamSiteLike", function() { return isTeamSiteLike; });
// OneDrive:IgnoreCodeCoverage
/**
 * SharePoint SPWeb (subsite) template values, from WebTemplate in sts\stsom\Core\spwebtemplate.cs
 */
var WebTemplateType;
(function (WebTemplateType) {
    WebTemplateType[WebTemplateType["invalid"] = -1] = "invalid";
    /** Team collaboration site */
    WebTemplateType[WebTemplateType["teamSite"] = 1] = "teamSite";
    /** Meeting workspace site */
    WebTemplateType[WebTemplateType["meetings"] = 2] = "meetings";
    WebTemplateType[WebTemplateType["centralAdmin"] = 3] = "centralAdmin";
    WebTemplateType[WebTemplateType["wiki"] = 4] = "wiki";
    WebTemplateType[WebTemplateType["documentCenter"] = 7] = "documentCenter";
    WebTemplateType[WebTemplateType["blog"] = 9] = "blog";
    WebTemplateType[WebTemplateType["tenantAdmin"] = 16] = "tenantAdmin";
    WebTemplateType[WebTemplateType["app"] = 17] = "app";
    WebTemplateType[WebTemplateType["appCatalog"] = 18] = "appCatalog";
    /** Mysite personal web */
    WebTemplateType[WebTemplateType["mySite"] = 21] = "mySite";
    WebTemplateType[WebTemplateType["subgroup"] = 39] = "subgroup";
    WebTemplateType[WebTemplateType["publishingPortal"] = 52] = "publishingPortal";
    WebTemplateType[WebTemplateType["mySiteHost"] = 54] = "mySiteHost";
    WebTemplateType[WebTemplateType["enterpriseWiki"] = 56] = "enterpriseWiki";
    WebTemplateType[WebTemplateType["group"] = 64] = "group";
    /** POINTPUBLISHINGPERSONAL#1 aka Blog site */
    WebTemplateType[WebTemplateType["pointPublishingPersonal"] = 66] = "pointPublishingPersonal";
    /** SITEPAGEPUBLISHING#0 aka Communications site */
    WebTemplateType[WebTemplateType["sitePagePublishing"] = 68] = "sitePagePublishing";
    WebTemplateType[WebTemplateType["teamChannel"] = 69] = "teamChannel";
    WebTemplateType[WebTemplateType["projectWebAppSite"] = 6221] = "projectWebAppSite";
    WebTemplateType[WebTemplateType["contentCenter"] = 6001] = "contentCenter";
})(WebTemplateType || (WebTemplateType = {}));
/**
 * Returns true if the SPWeb Site is not ODB or Group site.
 */
function isTeamSiteLike(template) {
    'use strict';
    var templateEnum = Number(template);
    return templateEnum !== WebTemplateType.mySite && templateEnum !== WebTemplateType.group;
}
/* harmony default export */ __webpack_exports__["default"] = (WebTemplateType);
//# sourceMappingURL=WebTemplateType.js.map

/***/ }),

/***/ "w/WL":
/*!***************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/theming/RgbaColor.js ***!
  \***************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A color represented by red, green, blue, and alpha (opacity) components.
 */
var RgbaColor = /** @class */ (function () {
    /** Constructs a default RgbaColor. Use RgbaColor.fromRgba to specify components. */
    function RgbaColor() {
        this.R = 0;
        this.G = 0;
        this.B = 0;
        this.A = RgbaColor.maxComponent; // Default to fully opaque.
    }
    /**
     * Creates a copy of the given color.
     * @param {RgbaColor} c The color to clone.
     */
    RgbaColor.clone = function (c) {
        return RgbaColor.fromRgba(c.R, c.G, c.B, c.A);
    };
    /**
     * Returns true if the colors have identical component values of R, G, B, and A.
     * @param {RgbaColor} c1 The first color to compare.
     * @param {RgbaColor} c2 The second color to compare.
     */
    RgbaColor.equals = function (c1, c2) {
        var c1IsNull = !c1;
        var c2IsNull = !c2;
        if (c1IsNull || c2IsNull) {
            return c1IsNull && c2IsNull;
        }
        else {
            return c1.R === c2.R && c1.G === c2.G && c1.B === c2.B && c1.A === c2.A;
        }
    };
    /**
     * Creates an RgbaColor from red, green, blue, and alpha component values.
     * @param {number} r The red component value (between 0 and 255).
     * @param {number} g The green component value (between 0 and 255).
     * @param {number} b The blue component value (between 0 and 255).
     * @param {number} a The alpha component value (between 0 and 255).
     */
    RgbaColor.fromRgba = function (r, g, b, a) {
        var colorObj = new RgbaColor;
        colorObj.R = Math.round(r);
        colorObj.G = Math.round(g);
        colorObj.B = Math.round(b);
        colorObj.A = a != null ? Math.round(a) : RgbaColor.maxComponent;
        return colorObj;
    };
    /**
     * Converts an rgba string of type "rgba(number(0-255), number(0-255), number(0-255), number?(0-1))"
     * to an RgbaColor
     * @param rbga the string to be converted
     */
    RgbaColor.fromRgbaString = function (rbga) {
        var rgbaColor = new RgbaColor();
        if (/^rgb.+/.test(rbga)) {
            // Match all of the numbers that are contained within the string.
            var colorNumbers = rbga.match(/[\d.]+/g);
            rgbaColor = RgbaColor.fromRgba(Number(colorNumbers[0]), Number(colorNumbers[1]), Number(colorNumbers[2]), colorNumbers.length === 4 ? Number(colorNumbers[3]) * RgbaColor.maxComponent : null);
        }
        return rgbaColor;
    };
    /**
     * Parses an HTML color string in the formats #AARRGGBB, #RRGGBB, or #RGB.
     * @param {string} htmlColor The HTML color string to parse.
     */
    RgbaColor.fromHtmlColor = function (htmlColor) {
        function TwoHexCharsToNumber(str, index1, index2) {
            return parseInt(str.charAt(index1) + str.charAt(index2), 16);
        }
        var resultColor = new RgbaColor;
        if (typeof htmlColor === "string" && htmlColor.charAt(0) === "#") {
            switch (htmlColor.length) {
                case 9: // #AARRGGBB
                    resultColor.A = TwoHexCharsToNumber(htmlColor, 1, 2);
                    resultColor.R = TwoHexCharsToNumber(htmlColor, 3, 4);
                    resultColor.G = TwoHexCharsToNumber(htmlColor, 5, 6);
                    resultColor.B = TwoHexCharsToNumber(htmlColor, 7, 8);
                    break;
                case 7: // #RRGGBB
                    resultColor.R = TwoHexCharsToNumber(htmlColor, 1, 2);
                    resultColor.G = TwoHexCharsToNumber(htmlColor, 3, 4);
                    resultColor.B = TwoHexCharsToNumber(htmlColor, 5, 6);
                    break;
                case 4: // #RGB
                    resultColor.R = TwoHexCharsToNumber(htmlColor, 1, 1);
                    resultColor.G = TwoHexCharsToNumber(htmlColor, 2, 2);
                    resultColor.B = TwoHexCharsToNumber(htmlColor, 3, 3);
                    break;
            }
        }
        else if (/^rgb.+/.test(htmlColor)) {
            resultColor = RgbaColor.fromRgbaString(htmlColor);
        }
        return resultColor;
    };
    /**
     * Converts an RgbaColor into an HTML string suitable for use as a CSS color value.
     * @param {RgbaColor} c The color to convert.
     * @param {boolean} bFilterValue If true, this produces a string to in the #AARRGGBB format.
     */
    RgbaColor.toHtmlString = function (c, bFilterValue) {
        function ByteToHexString(b) {
            var byte = Number(b);
            if (!(byte >= 0 && byte <= RgbaColor.maxComponent)) {
                throw new Error("Argument must be a Number in [0, 255]");
            }
            var hex = byte.toString(16);
            if (byte < 16) {
                hex = "0" + hex;
            }
            return hex;
        }
        if (c.A < RgbaColor.maxComponent && !bFilterValue) {
            return "rgba(" +
                c.R.toString(10) + ", " +
                c.G.toString(10) + ", " +
                c.B.toString(10) + ", " +
                (c.A / RgbaColor.maxComponent).toFixed(2) + ")";
        }
        else {
            return "#" +
                (bFilterValue ? ByteToHexString(c.A) : "") +
                ByteToHexString(c.R) +
                ByteToHexString(c.G) +
                ByteToHexString(c.B);
        }
    };
    /**
     * The maximum value of an R, G, B, or A component in an RgbaColor.
     */
    RgbaColor.maxComponent = 255;
    return RgbaColor;
}());
exports.default = RgbaColor;
//# sourceMappingURL=RgbaColor.js.map

/***/ }),

/***/ "w4+A":
/*!*******************************!*\
  !*** ./lib/common/Flights.js ***!
  \*******************************/
/*! exports provided: Flights */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Flights", function() { return Flights; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

var Flights = /** @class */ (function () {
    function Flights() {
    }
    /**
     * Gets a value indicating whether the new chrome sequence is enabled
     */
    Flights.useNewChromeSequence = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1342 /* SppplatCrossAppChrome  */);
    };
    Object.defineProperty(Flights, "useNextGenSPA", {
        get: function () {
            return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1338) /* NextGenPage */ && _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1490 /* SPHomeNextGenPage */);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Flights, "isFluentEnabled", {
        get: function () {
            return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1248 /* EnableFluentTheme */);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Flights, "delayExtensionsLoading", {
        get: function () {
            return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1077 /* SPFxDelayExtensionsLoading */);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Flights, "preloadSuiteNav", {
        get: function () {
            return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1136 /* O365ShellModuleJSClient */);
        },
        enumerable: true,
        configurable: true
    });
    return Flights;
}());



/***/ }),

/***/ "wCO9":
/*!**************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/theming/WebTheme.js ***!
  \**************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OneDrive:IgnoreCodeCoverage
Object.defineProperty(exports, "__esModule", { value: true });
var FabricTheming_1 = __webpack_require__(/*! ./FabricTheming */ "g/d6");
var RgbaColor_1 = __webpack_require__(/*! ./RgbaColor */ "w/WL");
var UriEncoding_1 = __webpack_require__(/*! ../encoding/UriEncoding */ "G7sL");
/**
 * Utility methods which can be used to load the theme of a SharePoint site.
 */
var WebTheme = /** @class */ (function () {
    function WebTheme() {
    }
    /**
     * Constructs the URL of a REST endpoint which will return the web theme.
     * @param {IWebContextInfo} webContextInfo Context information about the web.
     * @param {string} cultureName Current UI culture.
     * @param {string} themeOverride URL to a temporary override theme (e.g. preview).
     */
    WebTheme.makeWebThemeRestUrl = function (webServerRelativeUrl, cultureName, themeOverride) {
        "use strict";
        var webUrl = webServerRelativeUrl;
        if (webUrl && webUrl[webUrl.length - 1] === '/') {
            // Trim trailing slash.
            webUrl = webUrl.substring(0, webUrl.length - 1);
        }
        webUrl = UriEncoding_1.default.escapeUrlForCallback(webUrl);
        var webThemeRestEndpoint = UriEncoding_1.default.escapeUrlForCallback(webUrl) +
            '/_api/SP.Web.GetContextWebThemeData?noImages=true&lcid=' +
            UriEncoding_1.default.encodeURIComponent(cultureName);
        if (themeOverride) {
            webThemeRestEndpoint += "&ThemeOverride=" + UriEncoding_1.default.encodeURIComponent(themeOverride);
        }
        return webThemeRestEndpoint;
    };
    /**
     * Constructs the URL of a REST endpoint which will return the web theme.
     * @param {IWebContextInfo} webContextInfo Context information about the web.
     */
    WebTheme.processWebThemeRestResponse = function (responseText) {
        // This could throw if the handler returns an HTML error page or invalis JSON.
        // DataSource will count that as an error and call the error callback.
        "use strict";
        var response = JSON.parse(responseText);
        var rawThemeData;
        if (response && response.d && response.d.GetContextWebThemeData) {
            rawThemeData = JSON.parse(response.d.GetContextWebThemeData);
        }
        var themeData = WebTheme.processRawThemeData(rawThemeData);
        return themeData;
    };
    /**
     * Converts an IThemeDataRaw into an IThemeData.
     * @param {IThemeDataRaw} themeData Raw theme data to process.
     */
    WebTheme.processRawThemeData = function (themeData) {
        "use strict";
        if (themeData) {
            var coerceToColor = WebTheme.coerceToColor;
            var setColorIfMissing = WebTheme.SetColorIfMissing;
            var colors = {};
            var inputColors = themeData.Palette ? themeData.Palette.Colors : {};
            colors = WebTheme.convertColorsToRgba(inputColors);
            var fabricColors = FabricTheming_1.default.generateFabricColors(colors['ContentAccent1'], themeData.IsInverted);
            var pageBG = coerceToColor(colors['PageBackground']) || null;
            var bgOverlay = coerceToColor(colors['BackgroundOverlay']) || null;
            var alpha40 = Math.round(0.4 * RgbaColor_1.default.maxComponent);
            for (var colorKey in fabricColors) {
                setColorIfMissing(colors, colorKey, fabricColors[colorKey]);
            }
            setColorIfMissing(colors, 'white', pageBG);
            // RgbaColor.fromRgba and RgbaColor.clone both return new objects.
            // This is important for avoiding duplicate filtering logic in the caching layer.
            setColorIfMissing(colors, 'primaryBackground', RgbaColor_1.default.clone(pageBG));
            setColorIfMissing(colors, 'primaryText', fabricColors['primaryText'] || coerceToColor('#333'));
            setColorIfMissing(colors, 'whiteTranslucent40', pageBG && RgbaColor_1.default.fromRgba(pageBG.R, pageBG.G, pageBG.B, alpha40));
            setColorIfMissing(colors, 'backgroundOverlay', bgOverlay);
            setColorIfMissing(colors, 'suiteBarBackground', coerceToColor(colors['SuiteBarBackground']) || null);
            setColorIfMissing(colors, 'suiteBarText', coerceToColor(colors['SuiteBarText']) || null);
            setColorIfMissing(colors, 'suiteBarDisabledText', coerceToColor(colors['SuiteBarDisabledText']) || null);
            setColorIfMissing(colors, 'topBarBackground', coerceToColor(colors['TopBarBackground']) || null);
            setColorIfMissing(colors, 'topBarText', coerceToColor(colors['TopBarText']) || null);
            setColorIfMissing(colors, 'topBarHoverText', coerceToColor(colors['TopBarHoverText']) || null);
            setColorIfMissing(colors, 'dialogBorder', coerceToColor(colors['DialogBorder']) || null);
            return {
                backgroundImageUri: themeData.BackgroundImageUri,
                cacheToken: themeData.ThemeCacheToken,
                isDefault: themeData.IsDefault,
                isInverted: themeData.IsInverted,
                palette: colors,
                version: themeData.Version
            };
        }
        return {
            backgroundImageUri: "",
            cacheToken: "",
            isDefault: true,
            isInverted: false,
            palette: {},
            version: ""
        };
    };
    WebTheme.convertColorsToRgba = function (colors) {
        var convertedColors = {};
        for (var colorKey in colors) {
            if (colors.hasOwnProperty(colorKey)) {
                var colorValue = WebTheme.coerceToColor(colors[colorKey]);
                // TODO: console.warn if colorValue is undefined?
                if (colorValue) {
                    convertedColors[colorKey] = colorValue;
                }
            }
        }
        return convertedColors;
    };
    /**
     * Coerces an HTML color string or a color object in raw web theme data into an RgbaColor.
     * @param {any} toColor Object to be converted into an RgbaColor.
     */
    WebTheme.coerceToColor = function (toColor) {
        "use strict";
        var resultColor;
        // Use duck typing to extract a color
        if (!toColor) {
            resultColor = null;
        }
        else if (typeof toColor === "string" || toColor instanceof String) {
            resultColor = RgbaColor_1.default.fromHtmlColor(String(toColor));
        }
        else if ("DefaultColor" in toColor) {
            resultColor = WebTheme.coerceToColor(toColor["DefaultColor"]);
        }
        else if ("R" in toColor && "G" in toColor && "B" in toColor) {
            resultColor = RgbaColor_1.default.fromRgba(toColor.R, toColor.G, toColor.B, toColor.A);
        }
        return resultColor;
    };
    WebTheme.SetColorIfMissing = function (palette, slot, color) {
        if (!(palette[slot])) {
            palette[slot] = color;
        }
    };
    return WebTheme;
}());
exports.default = WebTheme;
//# sourceMappingURL=WebTheme.js.map

/***/ }),

/***/ "wJnm":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/DefaultButton.styles.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: DefaultButtonStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultButtonStyles", function() { return DefaultButtonStyles; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/Styling */ "xS3b");


var DefaultButtonStyles = function (props) {
    var theme = props.theme;
    if (!theme) {
        throw new Error('Theme is undefined or null.');
    }
    var palette = theme.palette;
    return {
        root: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ backgroundColor: palette.neutralLighter, border: '1px solid transparent' }, Object(office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__["getFocusStyle"])(theme, { inset: 0, borderColor: palette.white })),
        rootHovered: {
            backgroundColor: palette.neutralLight,
            selectors: {
                '.ms-Button--primary': {
                    backgroundColor: palette.themeDarkAlt
                }
            }
        },
        rootPressed: {
            backgroundColor: palette.neutralTertiaryAlt
        },
        rootExpanded: {
            backgroundColor: palette.neutralTertiaryAlt
        },
        rootChecked: {
            backgroundColor: palette.neutralTertiaryAlt
        },
        rootDisabled: {
            backgroundColor: palette.neutralLighter,
            borderColor: 'transparent'
        },
        splitButtonMenuButton: {
            backgroundColor: palette.neutralLighter,
            border: '1px solid transparent'
        },
        splitButtonContainer: {
            selectors: {
                '.ms-Button--primary': {
                    backgroundColor: palette.themePrimary,
                    selectors: {
                        ':hover': {
                            background: palette.themeDarkAlt
                        }
                    }
                },
                '.ms-Button--primary + .ms-Button': {
                    backgroundColor: palette.themePrimary,
                    selectors: {
                        ':hover': {
                            background: palette.themeDarkAlt
                        }
                    }
                },
                '.ms-Button.is-disabled': {
                    backgroundColor: palette.neutralLighter
                },
                '.ms-Button.is-disabled + .ms-Button.is-disabled': {
                    backgroundColor: palette.neutralLighter,
                    border: 'none'
                }
            }
        }
    };
};
//# sourceMappingURL=DefaultButton.styles.js.map

/***/ }),

/***/ "wxtz":
/*!****************************************!*\
  !*** external "@microsoft/decorators" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_wxtz__;

/***/ }),

/***/ "xPj7":
/*!******************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/telemetry-manager/0.12.6/node_modules/@ms/telemetry-manager/lib/PairedEventBase.js ***!
  \******************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OneDrive:CoverageThreshold(75)
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tCkv");
var EventBase_1 = __webpack_require__(/*! ./EventBase */ "P/8H");
var Manager_1 = __webpack_require__(/*! ./Manager */ "rdzh");
var ResultTypeEnum_1 = __webpack_require__(/*! ./events/ResultTypeEnum */ "yq8I");
var ErrorHelper = __webpack_require__(/*! ./ErrorHelper */ "Qd2r");
var safeSerialize_1 = __webpack_require__(/*! @ms/utilities-objects/lib/safeSerialize */ "FO0h");
var schemaExceptionErrorCode = 'GetSchemaException';
var promiseCreationFailureErrorCode = 'PromiseCreationFailed';
var timeoutErrorCode = 'Timeout';
function generateQosResult(resultType, resultCode, error) {
    var schema = {
        resultType: resultType
    };
    if (resultCode) {
        schema.resultCode = resultCode;
    }
    if (error) {
        schema.error = error;
    }
    return schema;
}
var PairedEventBase = /** @class */ (function (_super) {
    tslib_1.__extends(PairedEventBase, _super);
    function PairedEventBase(data, parent) {
        return _super.call(this, data, EventBase_1.ClonedEventType.Start, parent) || this;
    }
    PairedEventBase.instrumentPromise = function (startSchema, createPromise, getCompleteSchema, getErrorSchema, // tslint:disable-line:no-any
    timeoutMs, timeoutSchema, parent) {
        var promise;
        var event = new this(startSchema, parent);
        if (timeoutMs) {
            event.setTimeout(timeoutMs, timeoutSchema);
        }
        var onComplete = function (result) {
            var schema;
            if (getCompleteSchema) {
                try {
                    schema = getCompleteSchema(result);
                }
                catch (e) {
                    schema = generateQosResult(ResultTypeEnum_1.ResultTypeEnum.Failure, schemaExceptionErrorCode, e.toString());
                }
            }
            else {
                schema = generateQosResult(ResultTypeEnum_1.ResultTypeEnum.Success);
            }
            event.end(schema);
        };
        var onError = function (errorArgs) {
            var schema;
            if (getErrorSchema) {
                try {
                    schema = getErrorSchema(errorArgs);
                }
                catch (e) {
                    schema = generateQosResult(ResultTypeEnum_1.ResultTypeEnum.Failure, schemaExceptionErrorCode, e.toString());
                }
            }
            else if (errorArgs) {
                var failureResultType = (errorArgs instanceof Error && errorArgs.name === 'Canceled') ?
                    ResultTypeEnum_1.ResultTypeEnum.ExpectedFailure : ResultTypeEnum_1.ResultTypeEnum.Failure;
                schema = generateQosResult(failureResultType, undefined, safeSerialize_1.safeSerialize(errorArgs));
            }
            else {
                schema = generateQosResult(ResultTypeEnum_1.ResultTypeEnum.Failure);
            }
            event.end(schema);
        };
        try {
            promise = createPromise();
        }
        catch (e) {
            event.end(generateQosResult(ResultTypeEnum_1.ResultTypeEnum.Failure, promiseCreationFailureErrorCode, e.toString()));
            throw e;
        }
        promise.then(onComplete, onError);
        return promise;
    };
    PairedEventBase.prototype.setTimeout = function (ms, data) {
        this._clearTimeout();
        if (!data) {
            data = generateQosResult(ResultTypeEnum_1.ResultTypeEnum.Failure, timeoutErrorCode);
        }
        /* tslint:disable-next-line:ban-native-functions */
        this.timeoutId = window.setTimeout(this.end.bind(this, data), ms);
    };
    PairedEventBase.prototype.verbose = function (message) {
        if (this.endTime) {
            // event already ended, no need to log anymore
            return;
        }
        if (this._isQosEvent()) {
            var qosSchema = this.data;
            ErrorHelper.verbose(message, qosSchema.name);
        }
    };
    PairedEventBase.prototype.end = function (data) {
        // Make sure end can only be called once
        if (!this.endTime) {
            if (data) {
                this._setData(data);
            }
            // Set the end time
            this.endTime = Manager_1.Manager.getTime();
            // Log the event end
            this._logEvent(EventBase_1.ClonedEventType.End);
            // If this is a QOS event log and contains an error message trigger the upload of logs by calling
            // the ErrorHelper
            if (this._isQosEvent()) {
                var qosSchema = this.data;
                if (qosSchema.error) {
                    ErrorHelper.log(qosSchema.error, qosSchema.name, qosSchema.resultCode, qosSchema.resultType);
                }
            }
            this._clearTimeout();
        }
    };
    PairedEventBase.prototype._clearTimeout = function () {
        if (this.timeoutId) {
            /* tslint:disable-next-line:ban-native-functions */
            window.clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
    };
    PairedEventBase.prototype._isQosEvent = function () {
        return this.eventName.indexOf('Qos,') >= 0;
    };
    return PairedEventBase;
}(EventBase_1.EventBase));
function createPairedEvent(props, metadata, baseClass) {
    var PairedEvent = /** @class */ (function (_super) {
        tslib_1.__extends(PairedEvent, _super);
        function PairedEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PairedEvent;
    }(PairedEventBase));
    EventBase_1.addEventProps(PairedEvent.prototype, props, metadata, baseClass);
    return PairedEvent;
}
exports.createPairedEvent = createPairedEvent;
//# sourceMappingURL=PairedEventBase.js.map

/***/ }),

/***/ "xS3b":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/Styling.js ***!
  \******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "iKPr");
/* harmony import */ var _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @uifabric/styling */ "jQzw");
/* harmony import */ var _uifabric_styling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_uifabric_styling__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));


//# sourceMappingURL=Styling.js.map

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

/***/ }),

/***/ "yEhF":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-utilities/28.18.1/node_modules/@ms/odsp-utilities/lib/logging/events/Engagement.event.js ***!
  \*****************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @ms/odsp-utilities/logging/events/Engagement.event.js
var pkg = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
module.exports = {}
module.exports.Engagement = pkg.Engagement;
module.exports.default = pkg.Engagement;
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "ym06":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/DetailsList.styles.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: CheckStyles, DetailsRowCheckStyles, DetailsHeaderStyles, DetailsRowStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckStyles", function() { return CheckStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsRowCheckStyles", function() { return DetailsRowCheckStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsHeaderStyles", function() { return DetailsHeaderStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsRowStyles", function() { return DetailsRowStyles; });
/* harmony import */ var office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! office-ui-fabric-react/lib/Styling */ "xS3b");

var CheckStyles = function (props) {
    var theme = props.theme, checked = props.checked;
    var palette = theme.palette;
    return {
        circle: [!checked && { color: palette.neutralTertiaryAlt }],
        check: [!checked && { color: palette.neutralTertiaryAlt }]
    };
};
var DetailsRowCheckStyles = function (props) {
    var isHeader = props.isHeader, compact = props.compact;
    var height = isHeader ? 32 : compact ? 32 : 42;
    return {
        check: {
            height: height
        }
    };
};
var DetailsHeaderStyles = {
    root: {
        height: 32,
        lineHeight: '32px'
    },
    check: {
        height: 32
    },
    cellIsCheck: {
        height: 32
    },
    cellIsGroupExpander: {
        height: 32
    }
};
var DetailsRowStyles = function (props) {
    var isSelected = props.isSelected;
    return {
        isRowHeader: [
            isSelected && {
                fontWeight: office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].regular
            }
        ]
    };
};
//# sourceMappingURL=DetailsList.styles.js.map

/***/ }),

/***/ "yq8I":
/*!************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/telemetry-manager/0.12.6/node_modules/@ms/telemetry-manager/lib/events/ResultTypeEnum.js ***!
  \************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ResultTypeEnum;
(function (ResultTypeEnum) {
    ResultTypeEnum[ResultTypeEnum["Success"] = 0] = "Success";
    ResultTypeEnum[ResultTypeEnum["Failure"] = 1] = "Failure";
    ResultTypeEnum[ResultTypeEnum["ExpectedFailure"] = 2] = "ExpectedFailure";
})(ResultTypeEnum = exports.ResultTypeEnum || (exports.ResultTypeEnum = {}));
//# sourceMappingURL=ResultTypeEnum.js.map

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

/***/ "@microsoft/sp-extension-base":
/*!***********************************************!*\
  !*** external "@microsoft/sp-extension-base" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_extension_base__;

/***/ }),

/***/ "@microsoft/sp-http":
/*!*************************************!*\
  !*** external "@microsoft/sp-http" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_http__;

/***/ }),

/***/ "@microsoft/sp-loader":
/*!***************************************!*\
  !*** external "@microsoft/sp-loader" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_loader__;

/***/ }),

/***/ "@microsoft/sp-lodash-subset":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_lodash_subset__;

/***/ }),

/***/ "@microsoft/sp-page-context":
/*!*********************************************!*\
  !*** external "@microsoft/sp-page-context" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_page_context__;

/***/ }),

/***/ "@ms/odsp-utilities-bundle":
/*!********************************************!*\
  !*** external "@ms/odsp-utilities-bundle" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_odsp_utilities_bundle__;

/***/ }),

/***/ "@ms/sp-load-themed-styles":
/*!********************************************!*\
  !*** external "@ms/sp-load-themed-styles" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_load_themed_styles__;

/***/ }),

/***/ "@ms/sp-suite-nav":
/*!***********************************!*\
  !*** external "@ms/sp-suite-nav" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_suite_nav__;

/***/ }),

/***/ "@ms/sp-telemetry":
/*!***********************************!*\
  !*** external "@ms/sp-telemetry" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_telemetry__;

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
//# sourceMappingURL=sp-application-base_en-us.js.map