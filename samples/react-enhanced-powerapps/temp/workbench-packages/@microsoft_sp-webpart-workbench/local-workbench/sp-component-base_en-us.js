define("467dc675-7cc5-4709-8aac-78e3b71bd2f6_1.11.0", ["@microsoft/decorators","@microsoft/load-themed-styles","@microsoft/sp-core-library","@microsoft/sp-diagnostics","@microsoft/sp-dynamic-data","@microsoft/sp-http","@microsoft/sp-lodash-subset","@microsoft/sp-page-context"], function(__WEBPACK_EXTERNAL_MODULE__microsoft_decorators__, __WEBPACK_EXTERNAL_MODULE__microsoft_load_themed_styles__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_core_library__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_diagnostics__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_dynamic_data__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_http__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_lodash_subset__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_page_context__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./sp-component-base.js");
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
      "SourceAlreadyInitialized": "***Source has already been initialized.",
      "NoSendEventWhenAllowedEventsIsNonEmpty": "***\"sendEvent()\" must be defined, when the \"allowedEvents()\" returns a non-empty value.",
      "DynamicDataSourceManagerIsDisposed": "***Dynamic Data Source Manager has been disposed.",
      "DynamicDataSourceManagerIsNotInitialized": "***Dynamic Data Source Manager has not been initialized.",
      "DynamicDataSourceIsNotInitialized": "***Dynamic Data Source has not been initialized.",
      "InvalidEvent": "***\"{0}\" event is not allowed on the source \"{1}\""
    }
  };

  strings.default = strings;
  return strings;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sp-component-base.js":
/*!******************************!*\
  !*** ./sp-component-base.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! @microsoft/sp-dynamic-data */ "@microsoft/sp-dynamic-data"),__webpack_require__(/*! @microsoft/sp-lodash-subset */ "@microsoft/sp-lodash-subset"),__webpack_require__(/*! @microsoft/sp-core-library */ "@microsoft/sp-core-library"),__webpack_require__(/*! @microsoft/sp-page-context */ "@microsoft/sp-page-context"),__webpack_require__(/*! @microsoft/load-themed-styles */ "@microsoft/load-themed-styles"),__webpack_require__(/*! @microsoft/sp-diagnostics */ "@microsoft/sp-diagnostics"),__webpack_require__(/*! @microsoft/sp-http */ "@microsoft/sp-http"),__webpack_require__(/*! resx-strings */ "../lib/resx-strings/en-us.js"),__webpack_require__(/*! @microsoft/decorators */ "@microsoft/decorators")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(__WEBPACK_EXTERNAL_MODULE__84nK__, __WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_X_PM__, __WEBPACK_EXTERNAL_MODULE_jOlS__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_vlQI__, __WEBPACK_EXTERNAL_MODULE_vpy3__, __WEBPACK_EXTERNAL_MODULE_wxtz__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"sp-component-base": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({"legacy-third-party-fabric-core-localfont":"legacy-third-party-fabric-core-localfont"}[chunkId]||chunkId) + "_" + {"legacy-third-party-fabric-core-localfont":"5472f7912c912f40cd45"}[chunkId] + ".js"
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
/******/ 	var jsonpArray = window["webpackJsonp_467dc675_7cc5_4709_8aac_78e3b71bd2f6_1_11_0"] = window["webpackJsonp_467dc675_7cc5_4709_8aac_78e3b71bd2f6_1_11_0"] || [];
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
/******/ 	  var regex = (typeof spScriptNamePattern !== 'undefined') ? spScriptNamePattern : new RegExp('\\/sp-component-base(_[a-z0-9-]+)*\\.js', 'i');
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

/***/ "+NTl":
/*!********************************!*\
  !*** ./lib/DynamicProperty.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-dynamic-data */ "84nK");
/* harmony import */ var _microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DynamicDataProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DynamicDataProvider */ "LUHn");




/**
 * Serializable object that simplifies usage of a DynamicProperty.
 *
 * @remarks
 * This is built for usage in web part properties, and modified through the property pane.
 * Can be initialized with a default callback.
 * Web parts initialize with the render method so if the 3rd party developer does nothing, a change in the
 * DynamicProperty will re-render the web part automatically.
 *
 * @public
 */
var DynamicProperty = /** @class */ (function () {
    /**
     * Create a new DynamicProperty object.
     * @param provider - DynamicDataProvider.
     * @param callback - Optional. Default callback to be registered for updates in the DynamicDataSource.
     */
    function DynamicProperty(provider, callback) {
        this._hasValue = false;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(provider, 'provider');
        // tslint:disable-next-line:no-string-literal
        this['__type'] = DynamicProperty._TYPE_NAME;
        this._provider = provider;
        this._callbacks = new Set();
        this._pendingCallbacks = new Set();
        if (callback) {
            // The default callback will be added once a source is configured
            this._pendingCallbacks.add(callback);
            this._defaultCallback = callback;
        }
        else {
            this._defaultCallback = undefined;
        }
        this._onSourcesChanged = this._onSourcesChangedCallback.bind(this);
        this._cloneDeep = this._cloneDeep.bind(this);
        this._provider.registerAvailableSourcesChanged(this._onSourcesChanged);
    }
    /**
     * Sets the value of the DynamicProperty to be a reference to a DynamicDynamicSource
     * and property.  The reference is of the form `<source>:<property>:<path>`.
     * @param reference - Id of the DynamicDataSource and property.
     */
    DynamicProperty.prototype.setReference = function (reference) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(reference, 'id');
        this._value = undefined;
        this._hasValue = false;
        // Potentially changing the source. Remove all callbacks, change the source, and add callbacks again.
        var callbacks = new Set();
        this._callbacks.forEach(function (callback) { return callbacks.add(callback); });
        this._callbacks.forEach(function (callback) { return _this.unregister(callback); });
        this._reference = new _microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2__["DynamicDataReference"](reference);
        this._sourceId = this._getSourceId();
        callbacks.forEach(function (callback) { return _this.register(callback); });
        // The source has changed, so act if a new source was added
        this._onSourcesChangedCallback();
    };
    /**
     * Sets a static value in the DynamicProperty.
     * @param value - Value for the DynamicProperty.
     */
    DynamicProperty.prototype.setValue = function (value) {
        var _this = this;
        // Removing the source. Remove all callback, set the value, and add the callback again so they are not lost.
        // Callbacks will be stored in the pending callbacks list.
        var callbacks = this._callbacks;
        callbacks.forEach(function (callback) { return _this.unregister(callback); });
        this._value = value;
        this._reference = undefined;
        this._sourceId = undefined;
        this._hasValue = true;
        callbacks.forEach(function (callback) { return _this.register(callback); });
    };
    Object.defineProperty(DynamicProperty.prototype, "isDisposed", {
        /**
         * {@inheritDoc @microsoft/sp-core-library#IDisposable.isDisposed}
         */
        get: function () {
            return this._isDisposed;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * {@inheritDoc @microsoft/sp-core-library#IDisposable.dispose}
     */
    DynamicProperty.prototype.dispose = function () {
        var _this = this;
        if (!this._isDisposed) {
            this._provider.unregisterAvailableSourcesChanged(this._onSourcesChanged);
            if (this._defaultCallback) {
                this.unregister(this._defaultCallback);
                delete this._defaultCallback;
            }
            this._callbacks.forEach(function (callback) { return _this.unregister(callback); });
            delete this._callbacks;
            delete this._onSourcesChanged;
            delete this._pendingCallbacks;
            delete this._provider;
            delete this._reference;
            delete this._sourceId;
            this._isDisposed = true;
        }
    };
    /**
     * Returns a serializable version of the object.
     * To be used when `JSON.stringify()` is called on the object (i.e. during Web Part serialization)
     *
     * @remarks
     * This doesn't follow the naming rule for internal methods because the JavaScript engine needs this exact name.
     *
     * @internal
     */
    DynamicProperty.prototype.toJSON = function () {
        if (this._hasValue) {
            return {
                __type: DynamicProperty._TYPE_NAME,
                value: this._value
            };
        }
        else {
            return {
                __type: DynamicProperty._TYPE_NAME,
                reference: this._reference
            };
        }
    };
    Object.defineProperty(DynamicProperty.prototype, "reference", {
        /**
         * DynamicDataReference string that the DynamicProperty object points to.
         * The reference is of the form `<source>:<property>:<path>`.
         *
         * @remarks
         * If the DynamicProperty is set up with static data, this returns undefined.
         */
        get: function () {
            return this._hasValue ? undefined : this._reference.reference;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicProperty.prototype, "value", {
        /**
         * Returns the value of the DynamicProperty object, if it has a non-dynamic value.
         * Used for serialization purposes. The proper API to access the value of the object is `tryGetValue()`
         *
         * @internal
         */
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the value of the object.
     *
     * @remarks
     * If the value is an array, then the first element of the array is returned;
     * otherwise, the value itself is returned.
     *
     * NOTE: This api will never return an array.  To retrieve an array value,
     * use the {@link DynamicProperty.tryGetValues} API.
     *
     * @returns the value associated with the dynamic property or
     * undefined if the source or the data doesn't exist.
     */
    DynamicProperty.prototype.tryGetValue = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotDisposed(this, 'DynamicData');
        var value = this._getData();
        if (Array.isArray(value)) {
            value = value[0];
        }
        return value;
    };
    /**
     * Returns the value of the object.
     *
     * @remarks
     * If the value is NOT an array, then an array is returned with the value being the single entry;
     * otherwise, the value itself is returned.  If the property is undefined or cannot be found,
     * an empty array will be returned.
     *
     * NOTE: This api will always return an array and it assumes that the array is homogeneous.
     * To retrieve a non-array value, use the {@link DynamicProperty.tryGetValue} API.
     *
     * @returns the value associated with the dynamic property or
     * an empty array if the source or the data doesn't exist.
     */
    DynamicProperty.prototype.tryGetValues = function () {
        // tslint:disable-next-line:no-any
        var value = this._getData();
        // OK, time for some massaging of the return.
        if (value) {
            // If there is a value returned, but it isn't an array, create an array and
            // make this the return value the sole contents of the array
            if (!Array.isArray(value)) {
                value = [value];
            }
        }
        else {
            // In this case, we are saying that there is no value.  For this scenario
            // we simply return an empty array.
            value = [];
        }
        return value;
    };
    /**
     * Returns the DynamicDataSource that the DynamicProperty object refers to.
     * Returns undefined if the source doesn't exist.
     */
    DynamicProperty.prototype.tryGetSource = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotDisposed(this, 'DynamicData');
        return this._hasValue ? undefined : this._provider.tryGetSource(this._sourceId);
    };
    /**
     * Registers a callback function for updates on the associated DynamicDataSource.
     * @param callback - Callback function to register.
     */
    DynamicProperty.prototype.register = function (callback) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotDisposed(this, 'DynamicData');
        if (!this._hasValue && this._sourceId && !!this._provider.tryGetSource(this._sourceId)) {
            this._provider.registerPropertyChanged(this._sourceId, this._getPropertyToRegister(), callback);
            this._callbacks.add(callback);
        }
        else {
            this._pendingCallbacks.add(callback);
        }
    };
    /**
     * Unregisters a callback function for updates on the associated DynamicDataSource.
     * The callback function must be the same it was registered with.
     * @param callback - Callback function to unregister.
     */
    DynamicProperty.prototype.unregister = function (callback) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotDisposed(this, 'DynamicData');
        if (!this._hasValue && this._sourceId && !!this._provider.tryGetSource(this._sourceId)) {
            this._provider.unregisterPropertyChanged(this._sourceId, this._getPropertyToRegister(), callback);
        }
        this._pendingCallbacks.delete(callback);
        this._callbacks.delete(callback);
    };
    /**
     * Returns true if the object has a default callback.
     */
    DynamicProperty.prototype.hasDefaultCallback = function () {
        return !!this._defaultCallback;
    };
    /**
     * Removes the registration for the default callback.
     *
     * @remarks
     * This can be useful for advanced users who only want their custom callbacks.
     */
    DynamicProperty.prototype.removeDefaultCallback = function () {
        if (this._defaultCallback) {
            this.unregister(this._defaultCallback);
            this._defaultCallback = undefined;
        }
    };
    /**
     * Returns the id of the DynamicDataSource if the DynamicProperty has a reference set.
     *
     * @internal
     */
    DynamicProperty.prototype._getSourceId = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotDisposed(this, 'DynamicData');
        return this._hasValue ? '' : this._reference.sourceId;
    };
    /**
     * Returns the property name of the DynamicDataSource that the DynamicProperty points to.
     *
     * NOTE: This is accessed from the property pane code while building the DynamicDataWidget.
     * @internal
     */
    DynamicProperty.prototype._getProperty = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotDisposed(this, 'DynamicData');
        return this._hasValue ? '' : this._reference.property;
    };
    /**
     * Returns the path from the property that the object points to, if applicable.
     * If not applicable, returns an empty string.
     *
     * @internal
     */
    DynamicProperty.prototype._getPropertyPath = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotDisposed(this, 'DynamicData');
        return this._hasValue ? '' : this._reference.propertyPath || '';
    };
    /**
     * Returns a deep cloned version of the current instance.
     *
     * @remarks
     * Since the dynamic property is maintaining an instance of the DynamicDataProvider,
     * which which when serialized will result in 'Maximum call stack size exceeded' based
     * on what kind of sources they hold references to.
     *
     * For example, if the dynamicDataProvider is holding PageContext source, which internally
     * has serviceScope in its state. Deep cloning this source would result in the above mentioned
     * error.
     *
     * Hence we would want to just clone the dynamicDataProvider not deep clone it.
     *
     * @returns - Custom deep Cloned version of the current instance.
     *
     * @internal
     */
    // tslint:disable-next-line:no-any
    DynamicProperty.prototype._cloneDeep = function (instance) {
        return _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["cloneDeepWith"](instance, function (prop) {
            if (prop instanceof _DynamicDataProvider__WEBPACK_IMPORTED_MODULE_3__["default"]) {
                return prop;
            }
        });
    };
    /**
     * Returns the property name of the DynamicDataSource that the DynamicProperty points to.
     *
     * @remarks
     * Removes the array notation from the property name, if any, before it is being registered.
     * This is to avoid any mismatch between the strings passed by the source when it notifies
     * a property change, as the source doesn't pass any array notation with the property name.
     * Array notation is only for internal representaion, for a property whose value is an array type.
     */
    DynamicProperty.prototype._getPropertyToRegister = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotDisposed(this, 'DynamicData');
        // Split the property string on the array notation to get
        // the property name. If the array notation is not present,
        // then the original string is returned in the array.
        return this._getProperty().split(DynamicProperty._arrayRegex)[0];
    };
    /**
     * Callback when the DynamicDataSources list changes.
     * It registers the pending callbacks into the DynamicDataProvidere.
     */
    DynamicProperty.prototype._onSourcesChangedCallback = function () {
        var _this = this;
        if (!this._hasValue && this._sourceId && !!this._provider.tryGetSource(this._sourceId)) {
            var callbacksToAdd = this._pendingCallbacks;
            this._pendingCallbacks = new Set();
            callbacksToAdd.forEach(function (callback) {
                _this.register(callback);
                callback();
            });
        }
    };
    DynamicProperty.prototype._getData = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotDisposed(this, 'DynamicData');
        return this._hasValue ? this._value : this._provider._getData(this._reference);
    };
    /**
     * Constant with the type name of the DynamicProperty.
     * @internal
     */
    DynamicProperty._TYPE_NAME = 'DynamicProperty';
    DynamicProperty._arrayRegex = new RegExp(/\[\*\]$/);
    return DynamicProperty;
}());
/* harmony default export */ __webpack_exports__["default"] = (DynamicProperty);


/***/ }),

/***/ "+ORw":
/*!************************************!*\
  !*** ./lib/common/KillSwitches.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

/**
 * @internal
 */
var KillSwitches = /** @class */ (function () {
    function KillSwitches() {
    }
    /**
     * Killswitch to safe guard dynamic data beta apis.
     */
    KillSwitches.isDynamicDataGetPropertyValueKillSwitchActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('da3884a2-af48-4d82-b18e-4904e5950fb3'), '08/30/2018', 'Safe guarding the dynamic data beta api - getPropertyValue');
    };
    /**
     * Killswitch to safe guard the logic to force load the legacy fabric css for
     * third party components.
     */
    KillSwitches.isStopLoadingLegacyFabricCSSKillSwitchActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('57b771ed-2b57-41c2-aaaa-0e21c587c6dc'), '02/21/2019', 'Stop loading legacy fabric css on newer 3rd party components');
    };
    /**
     * Killswitch to fix an issue where if the dynamic data value returned has cascading
     * arrays, quering for a property, of type array, multiples levels inside, is not returning
     * correct data.
     */
    KillSwitches.isFixingCascadingArraysinDynamicDataKillSwitchActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('1549b8ee-81b7-4c30-ab6f-e802342edb74'), '08/19/2019', 'Fix cascading arrays in dynamic data property values.');
    };
    /** Indicates whether or not the kill switch to disable having preallocated placeholders
    * for application customizers.
    */
    KillSwitches.isPreallocatedPlaceholdersforApplicationCustomizersKSActive = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('1c3df98e-4897-4682-87f1-f3eac5f9c71b'), '08/29/2019', 'Disable preallocated placeholders for application customizers');
    };
    KillSwitches.isAddSpecificityToLegacyWebPartKSActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('85414001-4b2b-4b68-9a3a-3fafc7635a18'), '11/19/2019', 'Add a ms-SPLegacyWebPart class to legacy web part');
    };
    return KillSwitches;
}());
/* harmony default export */ __webpack_exports__["default"] = (KillSwitches);


/***/ }),

/***/ "84nK":
/*!*********************************************!*\
  !*** external "@microsoft/sp-dynamic-data" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__84nK__;

/***/ }),

/***/ "E99v":
/*!*******************************!*\
  !*** ./lib/ShimmerFactory.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_shimmer_module_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/shimmer.module.scss */ "OGZ7");

// These constants are taken from generic shimmer design.
var SHIMMER_WIDTH_DEFAULT = 100;
var SHIMMER_HEIGHT_DEFAULT = 100;
var SHIMMER_RECTANGLE_HEIGHT_MAX = 16;
var SHIMMER_RECTANGLE_COUNT = 4;
var SHIMMER_ELEMENT_COUNT = 2 * SHIMMER_RECTANGLE_COUNT + 1;
var RECTANGLE_X = 8;
var SHIMMER_MAIN_RECTANGLE_SIZE_RATIO = 0.9;
var RECTANGLE_1_LENGTH = 20;
var RECTANGLE_2_LENGTH = 40;
var RECTANGLE_3_LENGTH = 90;
var RECTANGLE_4_LENGTH = 80;
/**
 * Class to create shimmers for applications.
 *
 * @internal
 */
var ShimmerFactory = /** @class */ (function () {
    function ShimmerFactory() {
    }
    /**
     *  Method that creates a shimmer for applications using an svg.
     * @param width - Width of the shimmer
     * @param height - Height of the shimmer
     * @param componentTag - ID for the shimmer
     * @param loadingMessage - Displays message when the shimmer loads
     */
    ShimmerFactory.createShimmer = function (width, height, componentTag, loadingMessage, containerMargin) {
        if (containerMargin === void 0) { containerMargin = undefined; }
        width = width || SHIMMER_WIDTH_DEFAULT;
        height = height || SHIMMER_HEIGHT_DEFAULT;
        var shimmerContainerDiv = document.createElement('div');
        shimmerContainerDiv.className = _styles_shimmer_module_scss__WEBPACK_IMPORTED_MODULE_0__["default"].shimmerContainer;
        var shimmerDiv = document.createElement('div');
        var mainRectangleHeight = height * SHIMMER_MAIN_RECTANGLE_SIZE_RATIO;
        var rectangleHeight = mainRectangleHeight / SHIMMER_ELEMENT_COUNT;
        rectangleHeight = Math.min(SHIMMER_RECTANGLE_HEIGHT_MAX, rectangleHeight);
        var gap = 2 * rectangleHeight;
        var rectangle1Y = rectangleHeight;
        var rectangle2Y = rectangle1Y + gap;
        var rectangle3Y = rectangle2Y + gap;
        var rectangle4Y = rectangle3Y + gap;
        var className = _styles_shimmer_module_scss__WEBPACK_IMPORTED_MODULE_0__["default"].shimmerElementFill;
        /* tslint:disable:max-line-length */
        shimmerDiv.innerHTML =
            "<svg width=" + width + " height=" + height + " viewBox=\"0 0 " + width + " " + height + "\" version=\"1.1\"\n        xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n        <title>" + loadingMessage + "</title>\n        <g id=" + componentTag + "_Shimmer stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n          <rect x=\"0\" y=\"0\" width=" + width + " height=" + height + "></rect>\n          " + ShimmerFactory._shimmerRect(componentTag + '_1', className, RECTANGLE_X, rectangle1Y, RECTANGLE_1_LENGTH, rectangleHeight) + "\n          " + ShimmerFactory._shimmerRect(componentTag + '_2', className, RECTANGLE_X, rectangle2Y, RECTANGLE_2_LENGTH, rectangleHeight) + "\n          " + ShimmerFactory._shimmerRect(componentTag + '_3', className, RECTANGLE_X, rectangle3Y, RECTANGLE_3_LENGTH, rectangleHeight) + "\n          " + ShimmerFactory._shimmerRect(componentTag + '_4', className, RECTANGLE_X, rectangle4Y, RECTANGLE_4_LENGTH, rectangleHeight) + "\n        </g>\n      </svg>";
        if (containerMargin !== undefined) {
            shimmerContainerDiv.style.margin = containerMargin + '';
        }
        /* tslint:enable:max-line-length */
        shimmerContainerDiv.appendChild(shimmerDiv);
        var shimmerAccessibilityContainerDiv = document.createElement('div');
        shimmerAccessibilityContainerDiv.setAttribute('role', 'status');
        shimmerAccessibilityContainerDiv.setAttribute('aria-live', 'polite');
        shimmerContainerDiv.appendChild(shimmerAccessibilityContainerDiv);
        return shimmerContainerDiv;
    };
    ShimmerFactory._shimmerRect = function (id, className, x, y, width, height) {
        return "<rect id=" + id + " class=" + className + " x=" + x + " y=" + y + " width=\"" + width + "%\" height=" + height + ">\n      <animate\n      attributeName=\"opacity\"\n      dur=\"1s\"\n      values=\"0.2;0.5;0.9\"\n      repeatCount=\"indefinite\"\n      begin=\"0\"/>\n    </rect>";
    };
    return ShimmerFactory;
}());
/* harmony default export */ __webpack_exports__["default"] = (ShimmerFactory);


/***/ }),

/***/ "HJNy":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/styles/shimmer.module.css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".shimmerContainer_0558e041{position:relative;width:100%;margin:5px;height:100%;background-color:transparent}.shimmerElementFill_0558e041{fill:#f4f4f4}", ""]);



/***/ }),

/***/ "He8Z":
/*!***************************************!*\
  !*** ./lib/styles/shimmer.module.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./shimmer.module.css */ "HJNy");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "LUHn":
/*!************************************!*\
  !*** ./lib/DynamicDataProvider.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-dynamic-data */ "84nK");
/* harmony import */ var _microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/KillSwitches */ "+ORw");






/**
 * The Dynamic Data Provider allows components to consume Dynamic Data.
 * It allows components to request Dynamic Data sources and register/unregister to those.
 *
 * @public
 */
var DynamicDataProvider = /** @class */ (function () {
    function DynamicDataProvider() {
        this._isDisposed = false;
        this._isInitialized = false;
        this._isSourcesChangedEventListenerAdded = false;
    }
    /**
     * Initializes the Dynamic Data Provider for a specific component.
     *
     * @param component - Component that is going to use the Dynamic Data Provider.
     *
     * @internal
     */
    DynamicDataProvider.prototype._initialize = function (component, serviceScope) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(component, 'component');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(serviceScope, 'serviceScope');
        this._component = component;
        // Initialize all the required datastructures
        this._pendingRegistrations = new Set();
        this._dynamicDataManager = serviceScope.consume(_microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2__["_DynamicDataUtilities"].IDynamicDataManagerServiceKey);
        this._isInitialized = true;
        // Method bindings
        this._onSourcesChanged = this._onSourcesChanged.bind(this);
    };
    /**
     * Disposes the Dynamic Data Provider.
     */
    DynamicDataProvider.prototype.dispose = function () {
        if (!this._isDisposed) {
            delete this._pendingRegistrations;
            this._dynamicDataManager.sourcesChangedEvent.remove(this._component, this._onSourcesChanged);
            delete this._dynamicDataManager;
            delete this._component;
            this._isInitialized = false;
            this._isDisposed = true;
        }
    };
    Object.defineProperty(DynamicDataProvider.prototype, "isDisposed", {
        /**
         * Returns true if the Dynamic Data Provider is disposed.
         */
        get: function () {
            return this._isDisposed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicDataProvider.prototype, "_dynamicDataSourceId", {
        /**
         * Returns the dynamic data source id for the current instance of the component.
         * @internal
         */
        get: function () {
            return this._component._dynamicDataSourceId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Registers a callback for updates when a Dynamic Data source is changed.
     * This happens when any property is updated within the source.
     *
     * @privateRemarks
     * We register the source, only if the source is available else defer the registration
     * to when the availableSources change.
     *
     * @param sourceId - Id of the Dynamic Data Source.
     * @param callback - Function to execute when the source updates its data.
     */
    DynamicDataProvider.prototype.registerSourceChanged = function (sourceId, callback) {
        this._assertNotDisposed();
        this._assertInitialized();
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(sourceId, 'sourceId');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(callback, 'callback');
        var availableSourceIds = this.getAvailableSources().map(function (source) { return source.id; });
        if (availableSourceIds.indexOf(sourceId) !== -1) { // requested source is available
            this._dynamicDataManager.registerSourceChanged(sourceId, this._component, callback);
            this._logFeatureEntry('RegisterSourceChanged', { 'sourceId': sourceId });
        }
        else { // requested source is NOT available
            this._addPendingRegistration({ id: sourceId, callback: callback });
        }
    };
    /**
     * Unregisters a callback for updates when a Dynamic Data source is changed.
     *
     * @param sourceId - Id of the Dynamic Data Source.
     * @param callback - Function to remove from the registration. Must be the same it was registered with.
     */
    DynamicDataProvider.prototype.unregisterSourceChanged = function (sourceId, callback) {
        this._assertNotDisposed();
        this._assertInitialized();
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(sourceId, 'sourceId');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(callback, 'callback');
        var registration = { id: sourceId, callback: callback };
        if (!this._pendingRegistrations.has(registration)) { // Source is already registered.
            this._dynamicDataManager.unregisterSourceChanged(sourceId, this._component, callback);
            this._logFeatureEntry('UnregisterSourceChanged', { 'sourceId': sourceId });
        }
        else { // Source is in pending state
            this._removePendingRegistration(registration);
        }
    };
    /**
     * Registers a callback for updates when a property is changed in a Dynamic Data source.
     *
     * @privateRemarks
     * We register the source, only if the source is available else defer the registration
     * to when the availableSources change.
     *
     * @param sourceId - Id of the Dynamic Data Source.
     * @param propertyId - Id of the property of the source.
     * @param callback - Function to execute when the source updates its data.
     */
    DynamicDataProvider.prototype.registerPropertyChanged = function (sourceId, propertyId, callback) {
        this._assertNotDisposed();
        this._assertInitialized();
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(sourceId, 'sourceId');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(propertyId, 'propertyId');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(callback, 'callback');
        var availableSourceIds = this.getAvailableSources().map(function (source) { return source.id; });
        if (availableSourceIds.indexOf(sourceId) !== -1) { // requested source is available
            this._dynamicDataManager.registerPropertyChanged(sourceId, propertyId, this._component, callback);
            this._logFeatureEntry('RegisterPropertyChanged', { 'sourceId': sourceId, 'propertyId': propertyId });
        }
        else { // requested source is NOT available
            this._addPendingRegistration({ id: sourceId, propertyId: propertyId, callback: callback });
        }
    };
    /**
     * Unregisters a callback for updates when a property is changed in a Dynamic Data source.
     *
     * @privateRemarks
     * If the sourceId is present in _registeredSourcesForPropertyChanged then
     *    it removes from sourceID from the set _registeredSourcesForPropertyChanged and
     *    invokes unregisterPropertyChanged event on the DynamicDataManager
     *
     * else if the sourceId is present in _pendingSourcesForPropertyChanged then
     *    it just removes the sourceId from the set _pendingSourcesForPropertyChanged
     *
     * @param sourceId - Id of the Dynamic Data Source.
     * @param propertyId - Id of the property of the source.
     * @param callback - Function to remove from the registration. Must be the same it was registered with.
     */
    DynamicDataProvider.prototype.unregisterPropertyChanged = function (sourceId, propertyId, callback) {
        this._assertNotDisposed();
        this._assertInitialized();
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(sourceId, 'sourceId');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(propertyId, 'propertyId');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(callback, 'callback');
        var registration = { id: sourceId, callback: callback, propertyId: propertyId };
        if (!this._pendingRegistrations.has(registration)) { // registration is in pending state.
            this._dynamicDataManager.unregisterPropertyChanged(sourceId, propertyId, this._component, callback);
            this._logFeatureEntry('UnregisterPropertyChanged', { 'sourceId': sourceId, 'propertyId': propertyId });
        }
        else { // Already registered.
            this._removePendingRegistration(registration);
        }
    };
    /**
     * Registers a callback to an event that raises when the list of available Dynamic Data Sources is updated.
     *
     * @param callback - Function to execute when the sources are updated.
     */
    DynamicDataProvider.prototype.registerAvailableSourcesChanged = function (callback) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(callback, 'callback');
        this._assertNotDisposed();
        this._assertInitialized();
        this._dynamicDataManager.sourcesChangedEvent.add(this._component, callback);
    };
    /**
     * Unregisters a callback to an event that raises when the list of available Dynamic Data Sources is updated.
     *
     * @privateRemarks
     * This api is used by the consumer of the dynamic data.
     *
     * @param callback - Function to remove from the registration. Must be the same it was registered with.
     */
    DynamicDataProvider.prototype.unregisterAvailableSourcesChanged = function (callback) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(callback, 'callback');
        this._assertNotDisposed();
        this._assertInitialized();
        this._dynamicDataManager.sourcesChangedEvent.remove(this._component, callback);
    };
    /**
     * Returns a list with all available Dynamic Data Sources.
     *
     * @returns Read-only array with all available sources.
     */
    DynamicDataProvider.prototype.getAvailableSources = function () {
        this._assertNotDisposed();
        this._assertInitialized();
        return this._dynamicDataManager.getSources();
    };
    /**
     * Returns a list of all the available Dynamic Data Sources which have same component id.
     *
     * @returns Read-only array of available sources with same component id.
     * @alpha
     */
    DynamicDataProvider.prototype.getAvailableSourcesByComponentId = function (componentId) {
        this._assertNotDisposed();
        this._assertInitialized();
        var sources = [];
        this._dynamicDataManager.getSources().forEach(function (source) {
            if (componentId.equals(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(source.metadata.componentId) || _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].empty)) {
                sources.push(source);
            }
        });
        return sources;
    };
    /**
     * Returns a Dynamic Data Source, by its id.
     * If the source is not present, it returns undefined.
     *
     * @param id - Id of the Dynamic Data Source.
     */
    DynamicDataProvider.prototype.tryGetSource = function (id) {
        this._assertNotDisposed();
        this._assertInitialized();
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(id, 'id');
        return this._dynamicDataManager.tryGetSource(id);
    };
    /**
     * Returns specific data from a source based on a Dynamic Data reference.
     *
     * @param dataReference - Dynamic Data Reference.
     * @internal
     */
    DynamicDataProvider.prototype._getData = function (dataReference) {
        this._assertNotDisposed();
        this._assertInitialized();
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(dataReference, 'dataReference');
        var dataSource = this._dynamicDataManager.tryGetSource(dataReference.sourceId);
        if (!dataSource) {
            return undefined;
        }
        var data = dataSource.getPropertyValue(dataReference.property); // tslint:disable-line:no-any
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_4__["default"].isDynamicDataGetPropertyValueKillSwitchActivated()) {
            if (data && dataReference.propertyPath) {
                // multiple levels of sub-properties are separated by '.' in the property path.
                var subpaths = dataReference.propertyPath.split('.');
                subpaths.forEach(function (subpath) {
                    // If sub-property yields to an array value, then the path to the sub-property
                    // will have [*] appended after the name of the sub-property.
                    // Hence separating out to get the subPropertyName.
                    var subpathElements = subpath.split(DynamicDataProvider._jsonPathArrayRegex);
                    var subProperty = subpathElements[0];
                    // If the supplied reference has an array([*]) notation, then we extract the data
                    // accordingly. [*] means all the entries and if there is a number instead of the '*'
                    // then extract that specific entry.
                    if (data) {
                        if (Array.isArray(data)) {
                            if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_4__["default"].isFixingCascadingArraysinDynamicDataKillSwitchActivated()) {
                                var dataItems_1 = []; /* tslint:disable-line:no-any */
                                data.forEach(function (item) {
                                    if (item.hasOwnProperty(subProperty)) {
                                        dataItems_1.push(item[subProperty]);
                                    }
                                });
                                /*
                                 * If a specific entry is asked, we return it else we return all the entries,
                                 * essentially it is treated as [*].
                                 */
                                var index = subpathElements[1];
                                if (subpathElements.length > 1) {
                                    /**
                                     * This means that the current subpath element is an array type, an array inside an array.
                                     * Since the subpath element is an array, we are normalizing the existing dataItems object
                                     * i.e., dataItems will have an array of array objects.
                                     */
                                    var tempDataItems_1 = []; /* tslint:disable-line:no-any */
                                    dataItems_1.forEach(function (dataItem) {
                                        dataItem.forEach(function (internalItem) { return tempDataItems_1.push(internalItem); });
                                    });
                                    dataItems_1 = tempDataItems_1;
                                }
                                if (!isNaN(parseInt(index, 10))) {
                                    data = dataItems_1[index];
                                }
                                else {
                                    data = dataItems_1;
                                }
                            }
                            else {
                                var dataItems_2 = []; /* tslint:disable-line:no-any */
                                data.forEach(function (item) {
                                    if (item.hasOwnProperty(subProperty)) {
                                        dataItems_2.push(item[subProperty]);
                                    }
                                });
                                // If a specific entry is asked, we return it else (essentially it is treated as [*])
                                // we return all the entries.
                                // Index variable below is typed as any because, it could either take
                                // a string for * in [*] or a number or undefined subpathElements length is < 1.
                                var index = subpathElements[1]; // tslint:disable-line:no-any
                                if (subpathElements.length && !isNaN(parseInt(index, 10))) {
                                    data = dataItems_2[index];
                                }
                                else {
                                    data = dataItems_2;
                                }
                            }
                        }
                        else if (data.hasOwnProperty(subProperty)) { // data is an object type
                            data = data[subProperty];
                        }
                        else {
                            // If the control is here, it means that the subProperty was not found in data.
                            // Hence the next iteration would get data as undefined.
                            data = undefined;
                        }
                    }
                });
            }
        }
        else { // KillSwitch Activated, falling back to old logic.
            if (dataReference.propertyPath) {
                var subpaths = dataReference.propertyPath.split('.');
                subpaths.forEach(function (subpath) {
                    var sps = subpath.split(DynamicDataProvider._jsonPathArrayRegex);
                    sps.forEach(function (sp) {
                        if (!!sp) {
                            data = data[sp];
                        }
                    });
                });
            }
        }
        return data;
    };
    DynamicDataProvider.prototype._onSourcesChanged = function () {
        var _this = this;
        var availableSourceIds = this.getAvailableSources().map(function (source) { return source.id; });
        // Registering to sourceChanged event
        this._pendingRegistrations.forEach(function (src) {
            // register to sourceChanged event, if the source is available and
            // the pending source does not have a propertyId on it.
            if (availableSourceIds.indexOf(src.id) !== -1 && !src.propertyId) { // Source is available
                if (!src.propertyId) { // No propertyId, means register to sourceChanged event.
                    _this._dynamicDataManager.registerSourceChanged(src.id, _this._component, src.callback);
                    _this._logFeatureEntry('RegisterSourceChanged', { 'sourceId': src.id });
                }
                else { // With propertyId, means register to propertyChanged event.
                    _this._dynamicDataManager.registerPropertyChanged(src.id, src.propertyId, _this._component, src.callback);
                    _this._logFeatureEntry('RegisterPropertyChanged', { 'sourceId': src.id, 'propertyId': src.propertyId });
                }
                _this._pendingRegistrations.delete(src);
            }
        });
    };
    DynamicDataProvider.prototype._assertNotDisposed = function () {
        if (this.isDisposed) {
            throw new Error('Dynamic Data Provider has been disposed');
        }
    };
    DynamicDataProvider.prototype._assertInitialized = function () {
        if (!this._isInitialized) {
            throw new Error('Dynamic Data Provider has not been initialized.');
        }
    };
    /**
     * Adds the registration to the pending registrations if not already added.
     * Also adds a listener to the _DynamicDataManager's sourcesChangedEvent.
     */
    DynamicDataProvider.prototype._addPendingRegistration = function (registration) {
        if (!this.isRegistrationPending(registration)) {
            this._pendingRegistrations.add({
                id: registration.id,
                propertyId: registration.propertyId,
                callback: registration.callback
            });
        }
        if (!this._isSourcesChangedEventListenerAdded) {
            this._dynamicDataManager.sourcesChangedEvent.add(this._component, this._onSourcesChanged);
            this._isSourcesChangedEventListenerAdded = true;
        }
    };
    /**
     * Removes the pending registration and then, if there are no more pending registrations
     * remove the 'sourcesChangedEvent' listener.
     */
    DynamicDataProvider.prototype._removePendingRegistration = function (registration) {
        this._pendingRegistrations.delete(registration);
        if (this._pendingRegistrations.size === 0) {
            this._dynamicDataManager.sourcesChangedEvent.remove(this._component, this._onSourcesChanged);
            this._isSourcesChangedEventListenerAdded = false;
        }
    };
    /**
     * Returns true if the incoming source is already added to the _pendingRegistrations set.
     *
     * @param incomingRegistration - registration to be checked.
     */
    DynamicDataProvider.prototype.isRegistrationPending = function (incomingRegistration) {
        var found = false;
        this._pendingRegistrations.forEach(function (existingRegistration) {
            if (Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__["isEqual"])(existingRegistration, incomingRegistration)) {
                found = true;
            }
        });
        return found;
    };
    /**
     * Logs a feature event with any extra data from the producer of the event.
     * @param logFeature - Name of the feature to log.
     * @param contextualProps - Contextual log properties of the feature event.
     */
    DynamicDataProvider.prototype._logFeatureEntry = function (logFeature, contextualProps) {
        var isInternal = this._component.manifest.isInternal || false;
        var logProperties = {
            'alias': this._component.manifest.alias,
            'isInternal': isInternal.toString()
        };
        var logEntry = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogEntry"]('DynamicDataProvider', logFeature, _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogType"].Event, _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__["merge"](logProperties, contextualProps));
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_EngagementLogger"].logEventWithLogEntry(logEntry);
    };
    /**
     * Regular expression to evaluate arrays in a json path expression.
     * @internal
     */
    DynamicDataProvider._jsonPathArrayRegex = new RegExp(/\[|\]/);
    return DynamicDataProvider;
}());
/* harmony default export */ __webpack_exports__["default"] = (DynamicDataProvider);


/***/ }),

/***/ "OGZ7":
/*!*******************************************!*\
  !*** ./lib/styles/shimmer.module.scss.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./shimmer.module.css */ "He8Z");
var styles = {
    shimmerContainer: 'shimmerContainer_0558e041',
    shimmerElementFill: 'shimmerElementFill_0558e041'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "Pk8u":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Pk8u__;

/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "UdP8":
/*!********************************************!*\
  !*** ./lib/themeProvider/ThemeProvider.js ***!
  \********************************************/
/*! exports provided: ThemeChangedEventArgs, ThemeProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeChangedEventArgs", function() { return ThemeChangedEventArgs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return ThemeProvider; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
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
 * The object passed when the IThemeProvider.themeChangedEvent is raised.
 *
 * @public
 */
var ThemeChangedEventArgs = /** @class */ (function (_super) {
    __extends(ThemeChangedEventArgs, _super);
    function ThemeChangedEventArgs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ThemeChangedEventArgs;
}(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["SPEventArgs"]));

/**
 * The ThemeProvider class provides the capability to get different themes from the Framework. Themes can be provided
 * in different contexts, e.g. Canvas sections may provide a variant of the global theme in some contexts.
 *
 * @public
 */
var ThemeProvider = /** @class */ (function () {
    /**
     * Construct a new instance of the ThemeProvider class.
     *
     * @param serviceScope - The current service scope.
     * @param theme - Theme to provide.
     */
    function ThemeProvider(serviceScope, theme) {
        this._id = ThemeProvider._instanceCount++;
        this.themeChangedEvent = new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["SPEvent"](this._themeChangedEventName);
        if (theme) {
            this._theme = Object.freeze(theme);
        }
    }
    Object.defineProperty(ThemeProvider.prototype, "_themeChangedEventName", {
        get: function () {
            return ThemeProvider._themeChangedEventNameLiteral + this._id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clear the currently set theme and raise the themeChangedEvent.
     *
     * @internal
     */
    ThemeProvider.prototype._clearTheme = function () {
        this._theme = undefined;
        this._raiseEvent();
    };
    /**
     * Change the theme and raise the themeChangedEvent.
     *
     * @param theme - The new theme.
     *
     * @internal
     */
    ThemeProvider.prototype._setTheme = function (theme) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(theme, 'theme');
        this._theme = Object.freeze(theme);
        this._raiseEvent();
    };
    /**
     * If set, get the current scoped theme.
     */
    ThemeProvider.prototype.tryGetTheme = function () {
        return this._theme;
    };
    ThemeProvider.prototype._raiseEvent = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.raiseEvent(this._themeChangedEventName, { theme: this._theme });
    };
    /**
     * The service key for ThemeProvider.
     */
    ThemeProvider.serviceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["ServiceKey"].create('sp-component-base.ThemeProvider', ThemeProvider);
    ThemeProvider._themeChangedEventNameLiteral = 'ThemeProvider.themeChangedEvent';
    /**
     * Used to register a unique event for each ThemeProvider instance by appending
     * the instance count to themeChangedEventNameLiteral.
     */
    ThemeProvider._instanceCount = 0;
    return ThemeProvider;
}());



/***/ }),

/***/ "UtAH":
/*!******************************!*\
  !*** ./lib/BaseComponent.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/KillSwitches */ "+ORw");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * The base class for client-side components such as BaseClientSideWebPart or BaseExtension.
 *
 * @public
 */
var BaseComponent = /** @class */ (function () {
    /** @internal */
    function BaseComponent() {
        this._isDisposed = false;
        // empty block
    }
    Object.defineProperty(BaseComponent.prototype, "_dynamicDataSourceId", {
        /**
         * Returns the dynamic data source id for the current instance of the component.
         *
         * @internal
         */
        get: function () {
            return this.manifest.componentType + "." + this.manifest.id + "." + this.instanceId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Disposes the component.
     *
     * @remarks
     * Third-party code generally does not need to call this method; it's invoked
     * automatically when the lifecycle ends for a web part or extension.  To perform
     * custom cleanup when your component is disposed, override the {@link BaseComponent.onDispose}
     * method.
     */
    BaseComponent.prototype.dispose = function () {
        if (!this._isDisposed) {
            this.onDispose();
            this.context.dispose();
            delete this.context;
            this._isDisposed = true;
        }
    };
    Object.defineProperty(BaseComponent.prototype, "isDisposed", {
        /**
         * Returns true if the component has been already disposed.
         */
        get: function () {
            return this._isDisposed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "manifest", {
        /**
         * Provides access to the manifest for the client-side component.
         * @remarks
         * Child classes can override this with more specialized manifest types.
         */
        get: function () {
            return this.context.manifest;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This event method is called at the end of the component's lifecycle.
     * It provides an opportunity to release any associated resources, cancel any
     * outstanding requests, etc.
     */
    BaseComponent.prototype.onDispose = function () {
        // (empty block)
    };
    Object.defineProperty(BaseComponent.prototype, "instanceId", {
        /**
         * A unique identifier for the instance of the component.
         *
         * @remarks
         * A component implementation can be loaded multiple times on the page.
         * For example, if the component is a charting web part, multiple instances of this web part
         * could be added to the SharePoint canvas.  The instanceId uniquely identifies each
         * of these instances.
         */
        get: function () { return this.context.instanceId; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "componentId", {
        /**
         * Returns the component identifier as defined in the component’s associated manifest.
         *
         * @remarks
         * Each client-side component has an associated manifest that is used by the sp-loader to load its scripts,
         * and which may include additional metadata about the component.  The manifest is uniquely identified using
         * a text string containing a lower case GUID value.
         */
        get: function () { return this.context.manifest.id; },
        enumerable: true,
        configurable: true
    });
    /**
     * @internal
     */
    BaseComponent.prototype._initializeContext = function (context) {
        this.context = context;
        this.onProvideServices(context.serviceScope);
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_1__["default"].isPreallocatedPlaceholdersforApplicationCustomizersKSActive()) {
            /*
             * Calling finish on an already finished servicescope will throw.
             * Hence, checking it before finishing the servicescope.
             *
             * In the case of ApplicationCustomizers, it's context is calling 'finish'
             * on the service scope. Hence, it is required to have the below check.
             */
            if (!context.serviceScope._isFinished) {
                context.serviceScope.finish();
            }
        }
        else {
            context.serviceScope.finish();
        }
        this.context._initializeDynamicData(this, context.serviceScope);
    };
    /**
     * This event method allows a component to add custom services to its
     * {@link @microsoft/sp-core-library#ServiceScope}.
     *
     * @remarks
     * This event method is fired before {@link @microsoft/sp-core-library#ServiceScope | ServiceScope.finish()}
     * is called, allowing the component to provide custom services.
     *
     * @alpha
     */
    BaseComponent.prototype.onProvideServices = function (serviceScope) {
        // empty block
    };
    __decorate([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_0__["virtual"]
    ], BaseComponent.prototype, "manifest", null);
    __decorate([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_0__["virtual"]
    ], BaseComponent.prototype, "onDispose", null);
    __decorate([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_0__["virtual"]
    ], BaseComponent.prototype, "onProvideServices", null);
    return BaseComponent;
}());
/* harmony default export */ __webpack_exports__["default"] = (BaseComponent);


/***/ }),

/***/ "WWPs":
/*!*****************************************!*\
  !*** ./lib/DynamicDataSourceManager.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-dynamic-data */ "84nK");
/* harmony import */ var _microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/KillSwitches */ "+ORw");
/* harmony import */ var _DynamicDataProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DynamicDataProvider */ "LUHn");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loc/Strings.resx */ "qITA");








/**
 * The Dynamic Data Source Manager is responsible for:
 *  - Constructing the dynamic data source
 *  - Allowing initialization of the dynamic data source by a component
 *  - Allowing data source to update its metadata and notify when data has been updated.
 *
 * @public
 */
var DynamicDataSourceManager = /** @class */ (function () {
    function DynamicDataSourceManager() {
        this._src = undefined;
        this._isDisposed = false;
        this._isInitialized = false;
        this._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogSource"].create('DynamicDataSourceManager');
    }
    /**
     * Initializes the Dynamic Data source manager for a specific component.
     *
     * @param component - Component on which the source is being constructed.
     *
     * @internal
     */
    DynamicDataSourceManager.prototype._initialize = function (component, serviceScope) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(component, 'component');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(serviceScope, 'serviceScope');
        this._component = component;
        this._dynamicDataManager = serviceScope.consume(_microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2__["_DynamicDataUtilities"].IDynamicDataManagerServiceKey);
        this._isInitialized = true;
    };
    /**
     * Disposes the resources held by the Dynamic Data source.
     */
    DynamicDataSourceManager.prototype.dispose = function () {
        if (!this._isDisposed) {
            if (this._src) {
                this._dynamicDataManager.removeSource(this._src.id);
                delete this._src;
            }
            delete this._dynamicDataManager;
            delete this._component;
            this._isInitialized = false;
            this._isDisposed = true;
        }
    };
    Object.defineProperty(DynamicDataSourceManager.prototype, "isDisposed", {
        /**
         * Returns true if the DynamicDataSourceManager is disposed.
         */
        get: function () {
            return this._isDisposed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicDataSourceManager.prototype, "_source", {
        /**
         * Returns the source of DynamicDataSourceManager.
         * @internal
         */
        get: function () {
            return this._src;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initializes the Dynamic Data Source for the component.
     *
     * @param callableFunctions - Set of methods that are exposed through the Dynamic Data Source
     */
    DynamicDataSourceManager.prototype.initializeSource = function (callableFunctions) {
        this._assertNotDisposed();
        this._assertInitialized();
        if (!!this._src) {
            throw new Error(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].SourceAlreadyInitialized);
        }
        this._callableFunctions = callableFunctions;
        this._src = this._buildSource(this._component);
        this._dynamicDataManager.addSource(this._src);
        this._logFeatureEntry('DynamicDataSourceInitialized', { sourceId: this._src.id });
    };
    /**
     * Notifies that this source has updated its properties.
     *
     * When invoked, it enables to broadcast the notification to all the consumers who have
     * registered to this notification from this source.
     */
    DynamicDataSourceManager.prototype.notifySourceChanged = function () {
        this._assertNotDisposed();
        this._assertInitialized();
        this._assertSourceExists();
        this._dynamicDataManager.notifySourceChanged(this._src.id);
    };
    /**
     * Notifies that this source has updated a specific property.
     *
     * When invoked, it enables to broadcast the notification to all the consumers who have
     * registered to this notification from this source.
     *
     * @param propertyId - Id of the updated property in the source.
     */
    DynamicDataSourceManager.prototype.notifyPropertyChanged = function (propertyId) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(propertyId, 'propertyId');
        this._assertNotDisposed();
        this._assertInitialized();
        this._assertSourceExists();
        this._dynamicDataManager.notifyPropertyChanged(this._src.id, propertyId);
    };
    /**
     * Updates the metadata of the Dynamic Data Source.
     * It allows to update fields like title or description.
     * Auto-generated fields like alias, componentId or instanceId cannot be updated.
     *
     * @param metadata - Partial of the metadata.
     */
    DynamicDataSourceManager.prototype.updateMetadata = function (metadata) {
        this._assertNotDisposed();
        this._assertInitialized();
        this._assertSourceExists();
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(metadata, 'metadata');
        // Ensure that auto-generated properties are not updated.
        metadata.alias = undefined;
        metadata.componentId = undefined;
        metadata.instanceId = undefined;
        Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__["merge"])(this._src.metadata, metadata);
    };
    Object.defineProperty(DynamicDataSourceManager.prototype, "sourceId", {
        /**
         * Returns the Id of the current DataSource.
         * If the component did not initialize as a dynamic data source, then it returns an empty string.
         */
        get: function () {
            return this._src ? this._src.id : '';
        },
        enumerable: true,
        configurable: true
    });
    DynamicDataSourceManager.prototype._buildSource = function (component) {
        // If the source is returning non-empty allowed events then, it has to define
        // 'sendEvent' event handler as well.
        if (this._callableFunctions.allowedEvents &&
            this._callableFunctions.allowedEvents.length > 0) {
            if (!this._callableFunctions.sendEvent) {
                throw new Error(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].NoSendEventWhenAllowedEventsIsNonEmpty);
            }
        }
        return {
            id: this._component._dynamicDataSourceId,
            metadata: this._buildMetadata(component),
            // Return a clone to ensure that the consumer doesn't modify values in the source
            getPropertyDefinitions: this._getPropertyDefinitions.bind(this),
            getPropertyValue: this._getPropertyValue.bind(this),
            getAnnotatedPropertyValue: this._getAnnotatedPropertyValue.bind(this),
            // async callbacks
            getPropertyDefinitionsAsync: this._getPropertyDefinitionsAsync.bind(this),
            getPropertyValueAsync: this._getPropertyValueAsync.bind(this),
            getAnnotatedPropertyValueAsync: this._getAnnotatedPropertyValueAsync.bind(this),
            allowedEventsAsync: this._allowedEventsAsync.bind(this),
            sendEvent: this._sendEvent.bind(this)
        };
    };
    /**
     * This is the allowedEvents() that the DynamicDataSource actually exposes.
     * It does a copy of the data to ensure the consumer doesn't modify the source.
     */
    DynamicDataSourceManager.prototype._allowedEvents = function () {
        return this._callableFunctions.allowedEvents ?
            Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__["cloneDeep"])(this._callableFunctions.allowedEvents()) : undefined;
    };
    /**
     * This is the sendEvent() that the consumer invokes to send an event to the source, with data.
     * @param eventName - Name of the event
     * @param data - Associated data
     */
    DynamicDataSourceManager.prototype._sendEvent = function (eventName, data) {
        this._assertValidEvent(eventName);
        this._callableFunctions.sendEvent(eventName, data);
    };
    /**
     * This is the getPropertyDefinitions() that the DynamicDataSource actually exposes.
     * It does a copy of the data to ensure the consumer doesn't modify the source.
     * This assumes that the component has dynamic data and has a controller.
     */
    DynamicDataSourceManager.prototype._getPropertyDefinitions = function () {
        return Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__["cloneDeep"])(this._callableFunctions.getPropertyDefinitions());
    };
    /**
     * This is the getPropertyValue() that the DynamicDataSource actually exposes.
     * It does a copy of the data to ensure the consumer doesn't modify the source.
     * This assumes that the component has the source initialized.
     * If there is no value returned, it checks whether the propertyId is incorrect or the value is actually undefined.
     *
     * @remarks
     * If the property value associated with the property id, is an array then the
     * propertyId will have [*] notation appended at the end to support valid JSON Path notation.
     * Hence when reading the property id, we account for that and extract the name accordingly.
     */
    DynamicDataSourceManager.prototype._getPropertyValue = function (propertyId) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(propertyId, 'propertyId');
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_4__["default"].isDynamicDataGetPropertyValueKillSwitchActivated()) {
            var paths = propertyId.split(_DynamicDataProvider__WEBPACK_IMPORTED_MODULE_5__["default"]._jsonPathArrayRegex);
            try {
                // tslint:disable-next-line:no-any
                var propertyValue = this._callableFunctions.getPropertyValue(paths.shift());
                if (paths.length > 0) {
                    if (!isNaN(parseInt(paths[0], 10)) && Array.isArray(propertyValue)) {
                        propertyValue = propertyValue[paths[0]];
                    }
                }
                if (propertyValue === undefined) {
                    if (
                    // This code can be slow if there is a many property definitions (O(n) for number of properties).
                    // It's done this way to prioritize memory consumption instead of CPU cycles as this is an optional feature,
                    // so if it's not used there is no memory foorprint
                    this._callableFunctions
                        .getPropertyDefinitions()
                        .filter(function (def) { return def.id === propertyId; })
                        .length === 0 &&
                        this._src // Check that the source exists to get its title
                    ) {
                        throw new Error("Property \"" + propertyId + "\" doesn't exist in source \"" + this._src.metadata.title + "\"");
                    }
                }
                return Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__["cloneDeep"])(propertyValue);
            }
            catch (error) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logErrorData({
                    source: this._logSource,
                    error: error
                });
                return undefined;
            }
        }
        else { // KillSwitch Activated, falling back to old logic.
            // tslint:disable-next-line:no-any
            var propertyValue = this._callableFunctions.getPropertyValue(propertyId);
            if (propertyValue === undefined) {
                if (
                // This code can be slow if there is a many property definitions (O(n) for number of properties).
                // It's done this way to prioritize memory consumption instead of CPU cycles as this is an optional feature,
                // so if it's not used there is no memory foorprint
                this._callableFunctions
                    .getPropertyDefinitions()
                    .filter(function (def) { return def.id === propertyId; })
                    .length === 0 &&
                    this._src // Check that the source exists to get its title
                ) {
                    throw new Error("Property \"" + propertyId + "\" doesn't exist in source \"" + this._src.metadata.title + "\"");
                }
            }
            return Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__["cloneDeep"])(this._callableFunctions.getPropertyValue(propertyId));
        }
    };
    /**
     * Returns the real time value of the property.
     * @param propertyId - property id for which the value is requested.
     */
    DynamicDataSourceManager.prototype._getPropertyDefinitionsAsync = function () {
        return Promise.resolve(this._getPropertyDefinitions());
    };
    /**
     * Returns the real time value of the property.
     * @param propertyId - property id for which the value is requested.
     */
    DynamicDataSourceManager.prototype._getPropertyValueAsync = function (propertyId) {
        return Promise.resolve(this._getPropertyValue(propertyId));
    };
    /**
     * This is the allowedEvents() that the DynamicDataSource actually exposes.
     * It does a copy of the data to ensure the consumer doesn't modify the source.
     */
    DynamicDataSourceManager.prototype._allowedEventsAsync = function () {
        return Promise.resolve(this._allowedEvents());
    };
    /**
     * This is the getPropertyValueSchema() that the DynamicDataSource actually exposes.
     * It does a copy of the data to ensure the consumer doesn't modify the source.
     * If the source doesn't provide the annotated value, then it falls back to whatever
     * 'getPropertyValue' returns as the sample value and metadata would be undefined.
     *
     * @remarks
     * If the property value associated with the property id, is an array then the
     * propertyId will have [*] notation appended at the end to support valid JSON Path notation.
     * Hence when reading the property id, we account for that and extract the name accordingly.
     *
     * @param propertyId - property id for which the schema is requested.
     */
    DynamicDataSourceManager.prototype._getAnnotatedPropertyValue = function (propertyId) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(propertyId, 'propertyId');
        var annotatedPropertyValue;
        var getAnnotatedPropertyValue = this._callableFunctions.getAnnotatedPropertyValue;
        if (getAnnotatedPropertyValue) {
            var paths = propertyId.split(_DynamicDataProvider__WEBPACK_IMPORTED_MODULE_5__["default"]._jsonPathArrayRegex);
            try {
                // tslint:disable-next-line:no-any
                annotatedPropertyValue = this._callableFunctions.getAnnotatedPropertyValue(paths.shift());
                if (paths.length > 0) {
                    if (!isNaN(parseInt(paths[0], 10)) && Array.isArray(annotatedPropertyValue)) {
                        annotatedPropertyValue = annotatedPropertyValue[paths[0]];
                    }
                }
            }
            catch (error) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logErrorData({
                    source: this._logSource,
                    error: error
                });
                annotatedPropertyValue = undefined;
            }
        }
        if (!annotatedPropertyValue) {
            annotatedPropertyValue = {
                sampleValue: this._getPropertyValue(propertyId),
                metadata: undefined
            };
        }
        return annotatedPropertyValue;
    };
    /**
     * Returns the annotated value of the property.
     * @param propertyId - property id for which the value is requested.
     */
    DynamicDataSourceManager.prototype._getAnnotatedPropertyValueAsync = function (propertyId) {
        return Promise.resolve(this._getAnnotatedPropertyValue(propertyId));
    };
    DynamicDataSourceManager.prototype._buildMetadata = function (component) {
        var metadata = {
            title: component.manifest.alias,
            alias: component.manifest.alias,
            componentId: component.componentId,
            instanceId: component.instanceId
        };
        // Web parts have properties "title" and "description" that should go to the source by default.
        var componentWithMetadata = component; // tslint:disable-line:no-any
        if (componentWithMetadata.title) {
            metadata.title = componentWithMetadata.title;
        }
        if (componentWithMetadata.description) {
            metadata.description = componentWithMetadata.description;
        }
        return metadata;
    };
    /**
     * Asserts if the event is a valid event on the source.
     *
     * Its an invalid event in two cases:
     *  1. When '_allowedEvent()' api returns undefined
     *  2. When the event name is not one of the allowed events on the source.
     *
     * @param eventName - Name of the event.
     */
    DynamicDataSourceManager.prototype._assertValidEvent = function (eventName) {
        if (!this._allowedEvents() ||
            (Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__["findIndex"])(this._allowedEvents(), { name: eventName }) === -1)) {
            throw new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].InvalidEvent, eventName, this._src.metadata.title));
        }
    };
    DynamicDataSourceManager.prototype._assertNotDisposed = function () {
        if (this.isDisposed) {
            throw new Error(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].DynamicDataSourceManagerIsDisposed);
        }
    };
    DynamicDataSourceManager.prototype._assertInitialized = function () {
        if (!this._isInitialized) {
            throw new Error(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].DynamicDataSourceManagerIsNotInitialized);
        }
    };
    DynamicDataSourceManager.prototype._assertSourceExists = function () {
        if (!this._src) {
            throw new Error(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].DynamicDataSourceIsNotInitialized);
        }
    };
    /**
     * Logs a feature event.
     * @param logFeature - Name of the feature to log.
     * @param contextualProps - Contextual log properties of the feature event.
     */
    DynamicDataSourceManager.prototype._logFeatureEntry = function (logFeature, contextualProps) {
        var isInternal = this._component.manifest.isInternal || false;
        var logProperties = {
            'alias': this._component.manifest.alias,
            'isInternal': isInternal.toString()
        };
        var logEntry = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogEntry"]('DynamicDataSourceManager', logFeature, _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogType"].Event, _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__["merge"](logProperties, contextualProps));
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_EngagementLogger"].logEventWithLogEntry(logEntry);
    };
    return DynamicDataSourceManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (DynamicDataSourceManager);


/***/ }),

/***/ "X+PM":
/*!*********************************************!*\
  !*** external "@microsoft/sp-page-context" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_X_PM__;

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

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: BaseComponent, BaseComponentContext, DynamicDataProvider, DynamicDataSourceManager, DynamicProperty, _LegacyThirdPartyFabricCoreLoader, ThemeChangedEventArgs, ThemeProvider, _ComponentBaseKillSwitches, _ShimmerFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseComponent */ "UtAH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseComponent", function() { return _BaseComponent__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _BaseComponentContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseComponentContext */ "sIIZ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseComponentContext", function() { return _BaseComponentContext__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _DynamicDataProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DynamicDataProvider */ "LUHn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DynamicDataProvider", function() { return _DynamicDataProvider__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _DynamicDataSourceManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DynamicDataSourceManager */ "WWPs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DynamicDataSourceManager", function() { return _DynamicDataSourceManager__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _DynamicProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DynamicProperty */ "+NTl");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DynamicProperty", function() { return _DynamicProperty__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _LegacyThirdPartyFabricCoreLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LegacyThirdPartyFabricCoreLoader */ "y96G");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_LegacyThirdPartyFabricCoreLoader", function() { return _LegacyThirdPartyFabricCoreLoader__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _themeProvider_ThemeProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./themeProvider/ThemeProvider */ "UdP8");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThemeChangedEventArgs", function() { return _themeProvider_ThemeProvider__WEBPACK_IMPORTED_MODULE_6__["ThemeChangedEventArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return _themeProvider_ThemeProvider__WEBPACK_IMPORTED_MODULE_6__["ThemeProvider"]; });

/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/KillSwitches */ "+ORw");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_ComponentBaseKillSwitches", function() { return _common_KillSwitches__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _ShimmerFactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ShimmerFactory */ "E99v");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_ShimmerFactory", function() { return _ShimmerFactory__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/**
 * SharePoint Framework support for building client-side components
 *
 * @remarks
 * This package supports development of client-side components (e.g. web parts,
 * client-side extensions, and applications) built using the SharePoint Framework.
 * It defines the base classes and interfaces for functionality that is
 * common across all client-side component types.
 *
 * @packagedocumentation
 */








// ShimmerFactory



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

/***/ "sIIZ":
/*!*************************************!*\
  !*** ./lib/BaseComponentContext.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _DynamicDataProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DynamicDataProvider */ "LUHn");
/* harmony import */ var _DynamicDataSourceManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DynamicDataSourceManager */ "WWPs");






/**
 * The base class for context objects for client-side components.
 *
 * @remarks
 * A "context" object is a collection of well-known services and other
 * objects that are likely to be needed by business logic that interacts with a
 * associated component.  Each component type has its own specialized subclass
 * of BaseComponentContext, e.g. WebPartContext for web parts, ExtensionContext for
 * client-side extensions, and so on.
 *
 * @privateRemarks
 *
 * NOTE: The context object is a convenience that avoids the overhead of
 * properly factoring the dependencies for every class in a project.
 * If lots of members are added to the context without discipline, it can
 * easily devolve into a poor engineering practice (where "everything depends
 * on everything else").  Think carefully before adding more objects to the context object.
 * Is it really a core scenario?  Is it unnecessarily coupling your package to another
 * package?  Is there a better place to put the object?
 *
 * Only add data properties or well-defined classes with ubiquitous applicability.
 * Never add loose functions, callbacks, or settable properties to the context.
 *
 * @public
 */
var BaseComponentContext = /** @class */ (function () {
    /** @internal */
    function BaseComponentContext(parameters) {
        var _this = this;
        this._isDisposed = false;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(parameters, 'parameters');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(parameters.manifest, 'manifest');
        this.manifest = parameters.manifest;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(parameters.parentServiceScope, 'parentServiceScope');
        this._serviceScope = parameters.parentServiceScope.startNewChild();
        // TODO: VSO:507790 Reconcile this with ClientSideWebPartManager._createWebPartTag()
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(parameters.loggingTag, 'loggingTag');
        this.serviceScope.provide(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_logSourceServiceKey"], _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create(parameters.loggingTag));
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(parameters.instanceId, 'instanceId');
        this._instanceId = parameters.instanceId;
        this._httpClient = this.serviceScope.createDefaultAndProvide(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"].serviceKey);
        this._spHttpClient = this.serviceScope.createDefaultAndProvide(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["SPHttpClient"].serviceKey);
        this._msGraphClientFactory = this.serviceScope.createDefaultAndProvide(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["MSGraphClientFactory"].serviceKey);
        this._aadClientFactory = this.serviceScope.createDefaultAndProvide(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["AadHttpClientFactory"].serviceKey);
        this._aadTokenFactory = this.serviceScope.createDefaultAndProvide(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["AadTokenProviderFactory"].serviceKey);
        this.serviceScope.provide(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_ClientManifestData"].serviceKey, new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_ClientManifestData"](this.serviceScope, this.manifest));
        // Consume services
        this.serviceScope.whenFinished(function () {
            _this._pageContext = _this.serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__["PageContext"].serviceKey);
        });
        this._dynamicDataProvider = new _DynamicDataProvider__WEBPACK_IMPORTED_MODULE_4__["default"]();
        this._dynamicDataSourceManager = new _DynamicDataSourceManager__WEBPACK_IMPORTED_MODULE_5__["default"]();
    }
    Object.defineProperty(BaseComponentContext.prototype, "isDisposed", {
        /**
         * Returns true if the context is disposed.
         */
        get: function () {
            return this._isDisposed;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Disposes the base component context.
     */
    BaseComponentContext.prototype.dispose = function () {
        if (!this._isDisposed) {
            if (this._dynamicDataProvider) {
                this._dynamicDataProvider.dispose();
            }
            if (this._dynamicDataSourceManager) {
                this._dynamicDataSourceManager.dispose();
            }
            delete this._serviceScope;
            delete this._pageContext;
            delete this._dynamicDataProvider;
            delete this._dynamicDataSourceManager;
            this._isDisposed = true;
        }
    };
    Object.defineProperty(BaseComponentContext.prototype, "serviceScope", {
        /**
         * The associated {@link @microsoft/sp-core-library#ServiceScope} for this component.
         * @remarks
         * A child service scope is created for each client-side component.
         */
        get: function () { return this._serviceScope; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponentContext.prototype, "instanceId", {
        /**
         * {@inheritDoc BaseComponent.instanceId}
         */
        get: function () { return this._instanceId; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponentContext.prototype, "pageContext", {
        /**
         * The page context provides standard definitions for common SharePoint objects
         * that need to be shared between the client-side application, web parts, and other
         * components.
         */
        get: function () { return this._pageContext; },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a Dynamic Data Provider for the component.
     *
     * @param component - Component tied to the Dynamic Data Provider
     * @param serviceScope - ServiceScope to consume the Dynamic Data Manager from. Must be finished.
     * @internal
     */
    BaseComponentContext.prototype._initializeDynamicData = function (component, serviceScope) {
        this._dynamicDataProvider._initialize(component, serviceScope);
        this._dynamicDataSourceManager._initialize(component, serviceScope);
    };
    Object.defineProperty(BaseComponentContext.prototype, "dynamicDataProvider", {
        /**
         * Returns the Dynamic Data Provider associated with the component.
         */
        get: function () {
            return this._dynamicDataProvider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponentContext.prototype, "dynamicDataSourceManager", {
        /**
         * Returns the Dynamic Data Source Manager associated with the component.
         */
        get: function () {
            return this._dynamicDataSourceManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponentContext.prototype, "aadHttpClientFactory", {
        /**
         * The instance of AadHttpClientFactory created for this instance of component
         */
        get: function () {
            return this._aadClientFactory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponentContext.prototype, "aadTokenProviderFactory", {
        /**
         * The instance of AadTokenProviderFactory created for this instance of component
         */
        get: function () {
            return this._aadTokenFactory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponentContext.prototype, "msGraphClientFactory", {
        /**
         * The instance of MSGraphClientFactory created for this instance of component
         */
        get: function () {
            return this._msGraphClientFactory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponentContext.prototype, "httpClient", {
        /**
         * The instance of HttpClient created for this instance of component
         */
        get: function () {
            return this._httpClient;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponentContext.prototype, "spHttpClient", {
        /**
         * The instance of SpHttpClient created for this instance of component
         */
        get: function () {
            return this._spHttpClient;
        },
        enumerable: true,
        configurable: true
    });
    return BaseComponentContext;
}());
/* harmony default export */ __webpack_exports__["default"] = (BaseComponentContext);


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

/***/ "wxtz":
/*!****************************************!*\
  !*** external "@microsoft/decorators" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_wxtz__;

/***/ }),

/***/ "y96G":
/*!*************************************************!*\
  !*** ./lib/LegacyThirdPartyFabricCoreLoader.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/KillSwitches */ "+ORw");


// Copyright (c) Microsoft. All rights reserved.
/**
 * Class to load async chunks.
 *
 * @internal
 */
var LegacyThirdPartyFabricCoreLoader = /** @class */ (function () {
    function LegacyThirdPartyFabricCoreLoader() {
    }
    /**
     * Method to dynamically load the legacy third-party fabric core styles.
     * This method should be called only when a third-party component(web part or extension)
     * is being loaded on to the page.
     *
     * NOTE: Remove this method when the below killswitch is graduated from \@microsoft/sp-webpart-base.
     * 'isStopLoadingLegacyFabricCSSKillSwitchActivated' - '57b771ed-2b57-41c2-aaaa-0e21c587c6dc'
     *
     * @param isComponentInternal - indicates whether the requesting component is internal to Microsoft or not.
     */
    LegacyThirdPartyFabricCoreLoader.load = function (isComponentInternal) {
        if (!isComponentInternal && !LegacyThirdPartyFabricCoreLoader.isLoaded) {
            return __webpack_require__.e(/*! import() | legacy-third-party-fabric-core-localfont */ "legacy-third-party-fabric-core-localfont").then(__webpack_require__.bind(null, /*! ./chunks/legacy-third-party-fabric-core/FabricLocalFont */ "TL+I")).then(function () {
                LegacyThirdPartyFabricCoreLoader.isLoaded = true;
                return;
            });
        }
        else {
            return Promise.resolve();
        }
    };
    /**
     * Method to dynamically force load the legacy third-party fabric core styles.
     * All the below conditions are checked and needs to be true to force load the legacy css:
     *   1. Should be third party component (web part or extension)
     *   2. Should not be already loaded
     *   3. Component should ask to load the legacy css or if the component is built version \< 1.8
     *
     * @param manifest - component's manifest
     */
    LegacyThirdPartyFabricCoreLoader.forceLoad = function (manifest) {
        try {
            if (LegacyThirdPartyFabricCoreLoader._shouldLoad(manifest)) {
                return __webpack_require__.e(/*! import() | legacy-third-party-fabric-core-localfont */ "legacy-third-party-fabric-core-localfont").then(__webpack_require__.bind(null, /*! ./chunks/legacy-third-party-fabric-core/FabricLocalFont */ "TL+I")).then(function () {
                    LegacyThirdPartyFabricCoreLoader.isLoaded = true;
                    return;
                });
            }
            else {
                return Promise.resolve();
            }
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    /**
     * Method to check if the web part need to load the legacy css.
     * @param manifest - component's manifest
     */
    LegacyThirdPartyFabricCoreLoader.needLegacyFabricCss = function (manifest) {
        if (manifest.isInternal) {
            return false;
        }
        /*
         * If loadLegacyFabricCss is not specified by the component, then load the css
         * if the component is built before SPFx 1.8.2 or in some cases when we cannot get
         * the version of the SPFx.
         */
        if (manifest.loadLegacyFabricCss === undefined) {
            var version = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Version"]._tryParseSPFxVersion(manifest);
            if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_1__["default"].isAddSpecificityToLegacyWebPartKSActivated()) {
                return !version || version.lessThan(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Version"].parse('1.8.2'));
            }
            else {
                return !version || version.lessThan(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Version"].parse('1.8'));
            }
        }
        // Respect 'loadLegacyFabricCss' if a real value is provided.
        return manifest.loadLegacyFabricCss;
    };
    LegacyThirdPartyFabricCoreLoader._shouldLoad = function (manifest) {
        return !LegacyThirdPartyFabricCoreLoader.isLoaded || LegacyThirdPartyFabricCoreLoader.needLegacyFabricCss(manifest);
    };
    /**
     * Indicates whether the fabric-core styles are loaded on the page or not.
     */
    LegacyThirdPartyFabricCoreLoader.isLoaded = false;
    return LegacyThirdPartyFabricCoreLoader;
}());
/* harmony default export */ __webpack_exports__["default"] = (LegacyThirdPartyFabricCoreLoader);


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

/***/ "@microsoft/sp-dynamic-data":
/*!*********************************************!*\
  !*** external "@microsoft/sp-dynamic-data" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_dynamic_data__;

/***/ }),

/***/ "@microsoft/sp-http":
/*!*************************************!*\
  !*** external "@microsoft/sp-http" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_http__;

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

/***/ })

/******/ })});;
//# sourceMappingURL=sp-component-base_en-us.js.map