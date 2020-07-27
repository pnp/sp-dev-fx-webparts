define("bdb0f5dd-3bb4-4b93-b12a-71aa9e20bb09_0.3.24", ["@microsoft/office-ui-fabric-react-bundle","@microsoft/sp-lodash-subset","@microsoft/sp-core-library","react","@microsoft/load-themed-styles","@ms/sp-deferred-component","@microsoft/sp-diagnostics","@ms/odsp-utilities-bundle","@ms/sp-a11y"], function(__WEBPACK_EXTERNAL_MODULE_KL1q__, __WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_cDcd__, __WEBPACK_EXTERNAL_MODULE_jOlS__, __WEBPACK_EXTERNAL_MODULE_qjmy__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_y88i__, __WEBPACK_EXTERNAL_MODULE_ytfe__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"sp-anchor": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({"spanchor-anchorserivce":"spanchor-anchorserivce","spanchor-anchorzone":"spanchor-anchorzone"}[chunkId]||chunkId) + "_" + {"spanchor-anchorserivce":"0cb759df5975eee2ed05","spanchor-anchorzone":"5bd65bb5475a5563fa1a"}[chunkId] + ".js"
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
/******/ 	var jsonpArray = window["webpackJsonpbdb0f5dd_3bb4_4b93_b12a_71aa9e20bb09_0_3_24"] = window["webpackJsonpbdb0f5dd_3bb4_4b93_b12a_71aa9e20bb09_0_3_24"] || [];
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
/******/ 	  var regex = (typeof spScriptNamePattern !== 'undefined') ? spScriptNamePattern : new RegExp('\\/sp-anchor(_[a-z0-9-]+)*\\.js', 'i');
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

/***/ "Ausc":
/*!**********************************************************!*\
  !*** ./lib/anchorServiceManager/AnchorServiceManager.js ***!
  \**********************************************************/
/*! exports provided: AnchorServiceManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnchorServiceManager", function() { return AnchorServiceManager; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AnchorServiceLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AnchorServiceLoader */ "bpkh");
// Copyright (c) Microsoft. All rights reserved.



var logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('AnchorServiceProxy');
/**
 * AnchorServiceManager should be used as a singleton from serviceKey, it is
 *  1. an observer listening to anchor events.
 *  2. a manager offering APIs to interact with anchors.
 */
var AnchorServiceManager = /** @class */ (function () {
    function AnchorServiceManager() {
        var _this = this;
        this.componentId = 'bdb0f5dd-3bb4-4b93-b12a-71aa9e20bb09';
        this.instanceId = 'e1163200-0719-4a64-9f9a-bc6592953704';
        this.isDisposed = false;
        this._queuedEvents = [];
        this._handleAnchorEvent = function (eventArgs) {
            if (_this._anchorServiceQueue) {
                // if anchorServiceQueue is loaded, let anchorServiceQueue to handle the event
                try {
                    _this._anchorServiceQueue.handleAnchorEvent(eventArgs);
                }
                catch (error) {
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(logSource, error, 'HandleAnchorEventFailed');
                }
            }
            else if (eventArgs.action !== "FinishRegistration" /* FinishRegistration */) {
                // if anchorServiceQueue is not loaded, queue up the upcoming events(except for finishRegistration event)
                _this._queuedEvents.push(eventArgs);
            }
            else if (eventArgs.action === "FinishRegistration" /* FinishRegistration */ && _this._queuedEvents.length > 0) {
                // Only when finishRegistration event arrives and there are other events queued up, AnchorServiceQueue is loaded
                _this._queuedEvents.push(eventArgs);
                _this._anchorServiceLoader.delayLoad()
                    .then(function (anchorServiceQueue) {
                    _this._anchorServiceQueue = anchorServiceQueue;
                    _this._anchorServiceQueue.initialize(_this._queuedEvents);
                }).catch(function (error) {
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(logSource, error, 'InitializeAnchorQueueFail');
                });
            }
        };
        this._anchorEvent = new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["SPEvent"]('anchorEvent');
        this._anchorServiceLoader = new _AnchorServiceLoader__WEBPACK_IMPORTED_MODULE_2__["AnchorServiceLoader"]();
        this._anchorEvent.add(this, this._handleAnchorEvent);
    }
    AnchorServiceManager.prototype.dispose = function () {
        this._anchorEvent.remove(this, this._handleAnchorEvent);
        this.isDisposed = true;
    };
    AnchorServiceManager.prototype.scrollTo = function (anchorId) {
        var monitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('AnchorService');
        return this._anchorServiceLoader.load()
            .then(function (anchorServiceQueue) { return anchorServiceQueue.scrollTo(anchorId); })
            .then(function () { return monitor.writeSuccess(); })
            .catch(function (error) {
            monitor.writeExpectedFailure('FailToScroll', error);
            throw error;
        });
    };
    AnchorServiceManager.serviceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["ServiceKey"].create('sp-anchor:AnchorServiceProxy', AnchorServiceManager);
    return AnchorServiceManager;
}());



/***/ }),

/***/ "Bs35":
/*!*******************************************!*\
  !*** ./lib/anchorServiceManager/index.js ***!
  \*******************************************/
/*! exports provided: AnchorServiceManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnchorServiceManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnchorServiceManager */ "Ausc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnchorServiceManager", function() { return _AnchorServiceManager__WEBPACK_IMPORTED_MODULE_0__["AnchorServiceManager"]; });

 // tslint:disable-line:export-name


/***/ }),

/***/ "KL1q":
/*!***********************************************************!*\
  !*** external "@microsoft/office-ui-fabric-react-bundle" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_KL1q__;

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

/***/ "bpkh":
/*!*********************************************************!*\
  !*** ./lib/anchorServiceManager/AnchorServiceLoader.js ***!
  \*********************************************************/
/*! exports provided: AnchorServiceLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnchorServiceLoader", function() { return AnchorServiceLoader; });
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__);

var DELAY_LOAD_ANCHORSERVICE_TIME_MILLISECONDS = 5000;
var AnchorServiceLoader = /** @class */ (function () {
    function AnchorServiceLoader() {
        this._cancelDelay = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["noop"];
    }
    AnchorServiceLoader.prototype.load = function () {
        if (!this._anchorServiceQueuePromise) {
            this._anchorServiceQueuePromise = this._load();
        }
        else {
            // Previous load()/delayLoad() calls has initialized _anchorServiceQueuePromise.
            // If the promise is initialized with delay, cancel the delay and start loading immediately.
            this._cancelDelay();
        }
        return this._anchorServiceQueuePromise;
    };
    AnchorServiceLoader.prototype.delayLoad = function () {
        if (!this._anchorServiceQueuePromise) {
            this._anchorServiceQueuePromise =
                this._delay(DELAY_LOAD_ANCHORSERVICE_TIME_MILLISECONDS).then(this._load);
        }
        return this._anchorServiceQueuePromise;
    };
    AnchorServiceLoader.prototype._delay = function (time) {
        var _this = this;
        return new Promise(function (resolve) {
            var timeoutId = setTimeout(function () { return resolve(); }, time);
            _this._cancelDelay = function () {
                resolve();
                clearTimeout(timeoutId);
                _this._cancelDelay = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["noop"];
            };
        });
    };
    AnchorServiceLoader.prototype._load = function () {
        return __webpack_require__.e(/*! import() | spanchor-anchorserivce */ "spanchor-anchorserivce").then(__webpack_require__.bind(null, /*! ../anchorService */ "nE28"))
            .then(function (module) { return (new module.AnchorServiceQueue()); });
    };
    return AnchorServiceLoader;
}());



/***/ }),

/***/ "cDcd":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_cDcd__;

/***/ }),

/***/ "gFv8":
/*!*****************************************!*\
  !*** ./lib/deferredAnchorZone/index.js ***!
  \*****************************************/
/*! exports provided: DeferredAnchorZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DeferredAnchorZone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DeferredAnchorZone */ "raDT");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredAnchorZone", function() { return _DeferredAnchorZone__WEBPACK_IMPORTED_MODULE_0__["DeferredAnchorZone"]; });

 // tslint:disable-line:export-name


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
/*! exports provided: AnchorServiceManager, DeferredAnchorZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _anchorServiceManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./anchorServiceManager */ "Bs35");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnchorServiceManager", function() { return _anchorServiceManager__WEBPACK_IMPORTED_MODULE_0__["AnchorServiceManager"]; });

/* harmony import */ var _deferredAnchorZone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deferredAnchorZone */ "gFv8");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredAnchorZone", function() { return _deferredAnchorZone__WEBPACK_IMPORTED_MODULE_1__["DeferredAnchorZone"]; });

// Copyright (c) Microsoft. All rights reserved.




/***/ }),

/***/ "qjmy":
/*!********************************************!*\
  !*** external "@ms/sp-deferred-component" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_qjmy__;

/***/ }),

/***/ "raDT":
/*!******************************************************!*\
  !*** ./lib/deferredAnchorZone/DeferredAnchorZone.js ***!
  \******************************************************/
/*! exports provided: DeferredAnchorZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredAnchorZone", function() { return DeferredAnchorZone; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_sp_deferred_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-deferred-component */ "qjmy");
/* harmony import */ var _ms_sp_deferred_component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_deferred_component__WEBPACK_IMPORTED_MODULE_1__);
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


var DeferredAnchorZone = /** @class */ (function (_super) {
    __extends(DeferredAnchorZone, _super);
    function DeferredAnchorZone(props) {
        var _this = _super.call(this, props) || this;
        var eventArgs = {
            action: "ReserveRegistration" /* ReserveRegistration */,
            uniqueId: _this.props.deferredProps.componentId
        };
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.raiseEvent('anchorEvent', eventArgs);
        return _this;
    }
    DeferredAnchorZone.prototype._renderPlaceHolder = function () {
        return this.props.children;
    };
    DeferredAnchorZone.prototype._internalLoad = function () {
        // tslint:disable-next-line:no-string-based-set-timeout
        return __webpack_require__.e(/*! import() | spanchor-anchorzone */ "spanchor-anchorzone").then(__webpack_require__.bind(null, /*! ../anchorZone */ "dvy9"))
            .then(function (module) { return module.AnchorZone; });
    };
    return DeferredAnchorZone;
}(_ms_sp_deferred_component__WEBPACK_IMPORTED_MODULE_1__["_DeferredComponent"]));



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

/***/ }),

/***/ "ytfe":
/*!******************************!*\
  !*** external "@ms/sp-a11y" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ytfe__;

/***/ })

/******/ })});;
//# sourceMappingURL=sp-anchor.js.map