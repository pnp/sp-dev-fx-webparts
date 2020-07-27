define("974a7777-0990-4136-8fa6-95d80114c2e0_1.11.0", ["@microsoft/decorators","@microsoft/load-themed-styles","@microsoft/sp-component-base","@microsoft/sp-core-library","@microsoft/sp-diagnostics","@microsoft/sp-http","@microsoft/sp-loader","@microsoft/sp-lodash-subset","@microsoft/sp-page-context","@ms/sp-load-themed-styles","@ms/sp-telemetry"], function(__WEBPACK_EXTERNAL_MODULE__microsoft_decorators__, __WEBPACK_EXTERNAL_MODULE__microsoft_load_themed_styles__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_component_base__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_core_library__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_diagnostics__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_http__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_loader__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_lodash_subset__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_page_context__, __WEBPACK_EXTERNAL_MODULE__ms_sp_load_themed_styles__, __WEBPACK_EXTERNAL_MODULE__ms_sp_telemetry__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./sp-webpart-base.js");
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
    "_cUY5i3OR5M46pep9mRCR0g": {
      "ManifestDownloadFailed": "Manifests fail to download.",
      "ManifestNullError": "Manifest for the web part {0} is null.",
      "ManifestInvalidError": "Manifest for the web part {0} is invalid.",
      "ReadOnlyPropertyError": "This is a read-only property.",
      "BaseConstructError": "BaseClientSideWebPart is an abstract class and must be extended before use.",
      "ConstructLog": "Constructed web part: {0}.",
      "DisposeLog": "Disposed web part: {0}.",
      "MustOverrideRenderError": "Render method needs to be overriden in the derived class of web part {0}.",
      "NonBaseWebPartError": "Web part {0} must inherit from the BaseClientSideWebPart class.",
      "NotIntializedError": "Web part {0} was not initialized properly. Web parts must be instantiated using the ClientSideWebPartManager. Many web part features cannot be used till the initialization is complete.",
      "PropertyBagNullError": "Null property bag is not allowed for web part {0}. Empty property bag is supported.",
      "UndefinedModuleError": "Module is not loaded or not defined in the manifest for web part {0}.",
      "ModuleNotLoadedError": "Bootstrap module for web part {0} is not loaded. Module names exported by the bundle are '{1}'.",
      "IncorrectBoostrapModuleError": "Bootstrap module for web part {0} not of the correct type. Make sure to export your web part as 'export default WebPartName'.",
      "MissingExpectedWebPartMemberError": "The class for web part {0} is missing an expected member '{1}'.",
      "ScriptLoadErrorTemplate": "Unable to load web part {0} script resources due to: {1}.",
      "SerializationFailedError": "Serialization failed for web part {0}.",
      "RenderCompletedCallNotCalledError": "renderCompleted is not called for an asynchronously rendered web part {0}.",
      "FirstTimeRenderCalledMoreThanOnceError": "Attempted to call first time render more than once for the web part {0}. Please contact Microsoft developer support to resolve this.",
      "InvalidSPLinkAttributeFormatError": "Invalid SPLINK attribute value {0}",
      "InvalidSPLinkIndexError": "Invalid SPLINK index value {0}",
      "LoadingStatus": "Loading {0}...",
      "DisplayLoadingIndicator": "Displaying loading indicator",
      "ClearLoadingIndicator": "Clear loading indicator",
      "OnAfterDeserializeReturnedNull": "onAfterDeserialize for web part {0} returned null or undefined.",
      "OnInitReturnedNullPromise": "onInit method for web part {0} returned null or undefined Promise.",
      "GenericAccessibleLabelTemplate": "{0} web part",
      "StartedLoadingWebPart": "Started loading web part {0}.",
      "ModulesLoadedForWebPart": "Successfully loaded modules for web part {0}.",
      "CompletedLoadingWebPartManifests": "Successfully loaded webpart manifests.",
      "OnInitCompleted": "onInit method completed for web part {0}.",
      "StartedFirstTimeRender": "Started first time render for web part {0}.",
      "CompletedAsyncRender": "Completed async render for web part {0}.",
      "CompletedSyncRender": "Completed sync render for web part {0}.",
      "LazyEventOnNoLazyWebpart": "ViewportLoader._lazyHandler is invoked when there are no more web parts to load",
      "WebpartErrorSomethingWentWrong": "Something went wrong",
      "WebpartErrorSiteAdminAdvice": "If the problem persists, contact the site administrator and give them the information in Technical Details.",
      "WebpartErrorTechnicalDetails": "Technical Details",
      "WebpartErrorCallStackText": "CALL STACK:{0}{1}",
      "WebpartErrorErrorText": "ERROR:{0}{1}{0}{0}{2}",
      "LoadWebpartCalled": "Request {0} of {1} received to load web part {2}.",
      "WebpartDeleteRequested": "Webpart {0} is requested to delete.",
      "UnexpectedLoadRequestNegativeCount": "Unexpected negative value of _loadWebPartRequests.",
      "RenderPromiseUndefinedError": "Webpart {0} render callback promise for resolve or reject is undefined.",
      "RenderTimeout": "Webpart {0} render timeout."
    }
  };

  strings.default = strings;
  return strings;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sp-webpart-base.js":
/*!****************************!*\
  !*** ./sp-webpart-base.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! @ms/sp-telemetry */ "@ms/sp-telemetry"),__webpack_require__(/*! @ms/sp-load-themed-styles */ "@ms/sp-load-themed-styles"),__webpack_require__(/*! @microsoft/sp-component-base */ "@microsoft/sp-component-base"),__webpack_require__(/*! @microsoft/sp-loader */ "@microsoft/sp-loader"),__webpack_require__(/*! @microsoft/sp-lodash-subset */ "@microsoft/sp-lodash-subset"),__webpack_require__(/*! @microsoft/sp-core-library */ "@microsoft/sp-core-library"),__webpack_require__(/*! @microsoft/sp-page-context */ "@microsoft/sp-page-context"),__webpack_require__(/*! @microsoft/load-themed-styles */ "@microsoft/load-themed-styles"),__webpack_require__(/*! @microsoft/sp-diagnostics */ "@microsoft/sp-diagnostics"),__webpack_require__(/*! @microsoft/sp-http */ "@microsoft/sp-http"),__webpack_require__(/*! resx-strings */ "../lib/resx-strings/en-us.js"),__webpack_require__(/*! @microsoft/decorators */ "@microsoft/decorators")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(__WEBPACK_EXTERNAL_MODULE__2q6Q__, __WEBPACK_EXTERNAL_MODULE__5z2F__, __WEBPACK_EXTERNAL_MODULE__7Awa__, __WEBPACK_EXTERNAL_MODULE_I6O9__, __WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_X_PM__, __WEBPACK_EXTERNAL_MODULE_jOlS__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_vlQI__, __WEBPACK_EXTERNAL_MODULE_vpy3__, __WEBPACK_EXTERNAL_MODULE_wxtz__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"sp-webpart-base": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({"sp-webpart-base-iframedwebpartcontroller":"sp-webpart-base-iframedwebpartcontroller"}[chunkId]||chunkId) + "_" + {"sp-webpart-base-iframedwebpartcontroller":"7b23fd1a387aca8e56a1"}[chunkId] + ".js"
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
/******/ 	var jsonpArray = window["webpackJsonp_974a7777_0990_4136_8fa6_95d80114c2e0_1_11_0"] = window["webpackJsonp_974a7777_0990_4136_8fa6_95d80114c2e0_1_11_0"] || [];
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
/******/ 	  var regex = (typeof spScriptNamePattern !== 'undefined') ? spScriptNamePattern : new RegExp('\\/sp-webpart-base(_[a-z0-9-]+)*\\.js', 'i');
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

/***/ "+MWs":
/*!************************************!*\
  !*** ./lib/core/SpinnerFactory.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_spinner_module_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/spinner.module.scss */ "jxDd");

/**
 * @internal
 */
var SpinnerFactory = /** @class */ (function () {
    function SpinnerFactory() {
    }
    SpinnerFactory.createSpinner = function (loadingMessage) {
        var spinnerContainerDiv = document.createElement('div');
        spinnerContainerDiv.className = _styles_spinner_module_scss__WEBPACK_IMPORTED_MODULE_0__["default"].spinnerContainer;
        var spinnerDiv = document.createElement('div');
        spinnerDiv.className = _styles_spinner_module_scss__WEBPACK_IMPORTED_MODULE_0__["default"].spinner;
        spinnerDiv.innerHTML = "<svg class=" + _styles_spinner_module_scss__WEBPACK_IMPORTED_MODULE_0__["default"].spinnerSlice + " xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 21 21\">\n      <defs>\n        <style>\n          .slice {\n            fill: none;\n            stroke: currentColor;\n            stroke-miterlimit:10;\n            stroke-width:2px;\n          }\n        </style>\n      </defs>\n      <path class=\"slice\" d=\"M17.5,6.5a10,10,0,0,1,10,10\" transform=\"translate(-7 -6)\"/>\n    </svg>\n    <svg class=" + _styles_spinner_module_scss__WEBPACK_IMPORTED_MODULE_0__["default"].spinnerRing + " xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 21 21\">\n      <defs>\n        <style>\n          .ring {\n            fill: none;\n            stroke: currentColor;\n            stroke-miterlimit:10;\n            stroke-width:2px;\n          }\n        </style>\n      </defs>\n      <path class=\"ring\" d=\"M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z\" transform=\"translate(0.5 0.5)\"/>\n  </svg>";
        spinnerContainerDiv.appendChild(spinnerDiv);
        var spinnerLoadingMessageDiv = document.createElement('div');
        spinnerLoadingMessageDiv.className = _styles_spinner_module_scss__WEBPACK_IMPORTED_MODULE_0__["default"].spinnerLoadingMessage;
        spinnerLoadingMessageDiv.innerText = loadingMessage;
        spinnerContainerDiv.appendChild(spinnerLoadingMessageDiv);
        var spinnerAccessibilityContainerDiv = document.createElement('div');
        spinnerAccessibilityContainerDiv.setAttribute('role', 'status');
        spinnerAccessibilityContainerDiv.setAttribute('aria-live', 'polite');
        var spinnerAccessibilityMessageDiv = document.createElement('div');
        spinnerAccessibilityMessageDiv.className = _styles_spinner_module_scss__WEBPACK_IMPORTED_MODULE_0__["default"].spinnerAccessibilityMessage;
        spinnerAccessibilityMessageDiv.innerText = loadingMessage;
        spinnerAccessibilityContainerDiv.appendChild(spinnerAccessibilityMessageDiv);
        spinnerContainerDiv.appendChild(spinnerAccessibilityContainerDiv);
        return spinnerContainerDiv;
    };
    return SpinnerFactory;
}());
/* harmony default export */ __webpack_exports__["default"] = (SpinnerFactory);


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

var collectInViewportDataKS = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('2d3614db-85ff-4a96-b51c-7a7d530f365a');
var webPartTagKS = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('6d18e32c-abd5-40c1-8ce1-3fb551418901');
var asynRenderBindKS = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('fced9a5e-bb46-4688-b6ef-b9e80510f4e5');
var KillSwitches = /** @class */ (function () {
    function KillSwitches() {
    }
    KillSwitches.isAvoidingUnnecesaryWebPartRenderKillSwitchActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('16af4f13-a040-4557-9a79-f782a05ccd1f'), '01/09/2019', 'Avoiding unnecessary web part render');
    };
    KillSwitches.isLogWebPartLoadRenderDoneKillSwitchActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('08ab6e8c-f88b-4cb5-b84f-8393f07ea145'), '08/19/2019', 'Please not delete it [contact to qingliu for details] - Log web part load render done.');
    };
    KillSwitches.isDynamicDataDesrializationKSActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('19aaa441-68da-4d30-bcc8-4837283330fe'), '04/16/2019', 'Correctly initializng the dynamic properties during deserializing the web part.');
    };
    KillSwitches.isIE11IntersectionObserverBugFixEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('16159747-14da-4156-b68e-de24cd1344ad'), '8/19/2019', 'IE11IntersectionObserverBugFix');
    };
    KillSwitches.collectInViewportData = function () {
        return !_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(collectInViewportDataKS, '10/06/2019', 'Collect Data whether web part was loaded in viewport or outside');
    };
    KillSwitches.isWebPartLoadShimmerKSActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('ddb0baa6-36e3-49e8-bfbb-f042feb2199b'), '06/25/2019', 'Call only internal display loading indicator');
    };
    KillSwitches.isWebPartMinHeightResetKSActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('c63f214d-e196-4080-a6d8-02200fd1f949'), '07/30/2019', 'Set minimum height on the webpart only if it is not set earlier.');
    };
    KillSwitches.cacheWebPartManifestFetchKSActive = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('030e361a-ad38-48fa-91ac-5a14e930515d'), '09/23/2019', 'Cache web part manifests for cross-site navigation');
    };
    KillSwitches.isPaintStarvationKSActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('9E817C9A-1F6C-4917-878C-BD5AE7218CEC'), '07/02/2019', 'Fix paint starvation problem for SPClient');
    };
    KillSwitches.ensureWebPartTag = function () {
        return !_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(webPartTagKS, '9/11/2019', 'WPLoadExtraData');
    };
    KillSwitches.bindAsyncRenderActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(asynRenderBindKS, '9/23/2019', 'WPAsyncRenderBind');
    };
    KillSwitches.isCorrectedPainStarveKSActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('d43ce8eb-f953-4fbb-847b-a53f40b31eec'), '09/24/2019', 'InvertPaintStarveCheck');
    };
    return KillSwitches;
}());
/* harmony default export */ __webpack_exports__["default"] = (KillSwitches);


/***/ }),

/***/ "+wJ3":
/*!****************************************!*\
  !*** ./lib/core/BaseWebPartContext.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-component-base */ "7Awa");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_PropertyPaneAccessor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context/PropertyPaneAccessor */ "/csO");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */




/**
 * Web part context object. This object contains the contextual services available to a web part. e.g.
 * a contextual instance to the http client.
 *
 * This base is to be extended by UI-specific WebPart's base.
 *
 * @public
 */
var BaseWebPartContext = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BaseWebPartContext, _super);
    /** @internal */
    function BaseWebPartContext(parameters) {
        var _this = _super.call(this, parameters) || this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(parameters, 'webpart context');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(parameters.instanceId, 'webpart context instanceId');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(parameters.webPartTag, 'webpart context webPartTag');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(parameters.host, 'webpart context host');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(parameters.isPropertyPaneRenderedByWebPart, 'webpart context isPropertyPaneRenderedByWebPart');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(parameters.isPropertyPaneOpen, 'webpart context isPropertyPaneOpen');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(parameters.requestPropertyPaneAction, 'webpart context requestPropertyPaneAction');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(parameters.formFactor, 'webpart context form factor');
        _this._webPartTag = parameters.webPartTag;
        _this._host = parameters.host;
        _this._requestPropertyPaneAction = parameters.requestPropertyPaneAction;
        _this._isPropertyPaneRenderedByWebPart = parameters.isPropertyPaneRenderedByWebPart;
        _this._isPropertyPaneOpen = parameters.isPropertyPaneOpen;
        _this._privateDataUpdatedEvent = parameters._dataUpdatedEvent;
        _this._formFactor = parameters.formFactor;
        _this._propertyPaneAccessor = new _context_PropertyPaneAccessor__WEBPACK_IMPORTED_MODULE_3__["default"](function () { _this._requestPropertyPaneAction(_this.instanceId, 1 /* Open */, true); }, function () { _this._requestPropertyPaneAction(_this.instanceId, 2 /* Close */, true); }, function () { _this._requestPropertyPaneAction(_this.instanceId, 5 /* Refresh */, true); }, function (context) {
            _this._requestPropertyPaneAction(/* tslint:disable-line:no-any */ _this.instanceId, 6 /* OpenDetails */, true, context);
        }, function () { return _this._isPropertyPaneRenderedByWebPart(); }, function () { return _this._isPropertyPaneOpen(); });
        return _this;
    }
    Object.defineProperty(BaseWebPartContext.prototype, "webPartTag", {
        /**
         * Web part tag to be used for logging and telemetry.
         */
        get: function () { return this._webPartTag; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWebPartContext.prototype, "propertyPane", {
        /**
         * Accessor for common web part property pane operations.
         */
        get: function () { return this._propertyPaneAccessor; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWebPartContext.prototype, "formFactor", {
        /**
         * Form factor of the web part.
         *
         * @remarks
         * Web parts may behave differently based on its form factor.
         * E.g. a web part rendering as full size may want to set up different margins that when rendering in a canvas.
         *
         * @beta
         */
        get: function () { return this._formFactor; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWebPartContext.prototype, "host", {
        /**
         * Web part host.
         *
         * @alpha
         */
        get: function () { return this._host; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWebPartContext.prototype, "_dataUpdatedEvent", {
        /**
         * Web part properties updated event.
         *
         * @eventproperty
         * @internal
         */
        get: function () { return this._privateDataUpdatedEvent; },
        enumerable: true,
        configurable: true
    });
    return BaseWebPartContext;
}(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_1__["BaseComponentContext"]));
/* harmony default export */ __webpack_exports__["default"] = (BaseWebPartContext);


/***/ }),

/***/ "/csO":
/*!**************************************************!*\
  !*** ./lib/core/context/PropertyPaneAccessor.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file class to help access web part property pane APIs.
 */



/**
 * Web part context property pane accessor. Provides some most commonly used utilities
 * to access the property pane.
 *
 * @public
 */
var PropertyPaneAccessor = /** @class */ (function () {
    function PropertyPaneAccessor(openProperytPane, closePropertyPane, refresh, openDetails, // tslint:disable-line:no-any
    isRenderedByWebPart, isPropertyPaneOpen) {
        this._open = openProperytPane;
        this._close = closePropertyPane;
        this._refresh = refresh;
        this._openDetails = openDetails;
        this._isRenderedByWebPart = isRenderedByWebPart;
        this._isPropertyPaneOpen = isPropertyPaneOpen;
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.refresh = this.refresh.bind(this);
        this.openDetails = this.openDetails.bind(this);
        this.isRenderedByWebPart = this.isRenderedByWebPart.bind(this);
    }
    /**
     * Api to open the PropertyPane.
     */
    PropertyPaneAccessor.prototype.open = function () {
        this._open();
    };
    /**
     * Api to close the PropertyPane.
     */
    PropertyPaneAccessor.prototype.close = function () {
        this._close();
    };
    /**
     * Api to refresh the contents of the PropertyPane.
     * It's a no operation scenario if a web part is asking to refresh the property pane
     * while some other web part is being configured.
     */
    PropertyPaneAccessor.prototype.refresh = function () {
        this._refresh();
    };
    /**
     * Api to open the Details PropertyPane
     *
     * @param context - pass additional details as context to send back to the caller
     */
    PropertyPaneAccessor.prototype.openDetails = function (context) {
        this._openDetails(context);
    };
    /**
     * Returns true if the current property pane source is a web part and not the Canvas or any other source.
     */
    PropertyPaneAccessor.prototype.isRenderedByWebPart = function () {
        return this._isRenderedByWebPart();
    };
    /**
     * Returns true if the PropertyPane is open.
     */
    PropertyPaneAccessor.prototype.isPropertyPaneOpen = function () {
        return this._isPropertyPaneOpen();
    };
    PropertyPaneAccessor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["sealed"]
    ], PropertyPaneAccessor);
    return PropertyPaneAccessor;
}());
/* harmony default export */ __webpack_exports__["default"] = (PropertyPaneAccessor);


/***/ }),

/***/ "/oQI":
/*!*******************************************************************************************!*\
  !*** ../sp-property-pane/lib/propertyPaneFields/propertyPaneToggle/PropertyPaneToggle.js ***!
  \*******************************************************************************************/
/*! exports provided: PropertyPaneToggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneToggle", function() { return PropertyPaneToggle; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "3ZYD");
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


/***/ }),

/***/ "1a3C":
/*!*************************************************************************************************************!*\
  !*** ../sp-property-pane/lib/propertyPaneFields/propertyPaneDynamicFieldSet/PropertyPaneDynamicFieldSet.js ***!
  \*************************************************************************************************************/
/*! exports provided: PropertyPaneDynamicFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDynamicFieldSet", function() { return PropertyPaneDynamicFieldSet; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "3ZYD");
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

/***/ "2q6Q":
/*!***********************************!*\
  !*** external "@ms/sp-telemetry" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2q6Q__;

/***/ }),

/***/ "3+DO":
/*!********************************************!*\
  !*** ./lib/utils/ExecuteWithoutFailing.js ***!
  \********************************************/
/*! exports provided: executeWithoutFailing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "executeWithoutFailing", function() { return executeWithoutFailing; });
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * Execute the passed delegate and eat up the exception stack.
 */


/**
 * Execute the passed in delegate with a guarantee that no exception will leak out.
 * Do not use this normally. Only in error handling scenarios where you would like
 * to be defesive.
 * @param method - method to execute.
 * @param logSource - log source.
 */
/* tslint:disable:export-name */
function executeWithoutFailing(method, logSource) {
    /* tslint:enable:export-name */
    _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(method, 'method');
    try {
        method();
    }
    catch (e) {
        // Defensive code as this method should never ever throw
        if (logSource) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(logSource, new Error('Error: ' + e));
        }
    }
}


/***/ }),

/***/ "3ZYD":
/*!******************************************************************************************!*\
  !*** ../sp-property-pane/lib/propertyPaneFields/propertyPaneField/IPropertyPaneField.js ***!
  \******************************************************************************************/
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

/***/ "5z2F":
/*!********************************************!*\
  !*** external "@ms/sp-load-themed-styles" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5z2F__;

/***/ }),

/***/ "65Hp":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/core/styles/cswp-base.module.css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".errorBox_c25b5cc7{padding:12px 0;overflow:hidden;position:relative;top:0;left:0;right:0;z-index:1;display:inline-block}[dir=ltr] .errorBox_c25b5cc7{text-align:left}[dir=rtl] .errorBox_c25b5cc7{text-align:right}.errorBoxText_c25b5cc7{position:relative;display:inline-block;white-space:pre-wrap;color:#605e5c;font-weight:700}.detailsButton_c25b5cc7{text-transform:uppercase;color:#0078d4;border:none;background:0 0;margin-top:20px}[dir=ltr] .detailsButton_c25b5cc7{padding-left:0}[dir=rtl] .detailsButton_c25b5cc7{padding-right:0}.somethingWentWrongText_c25b5cc7{font-weight:400;color:#0078d4}.siteAdminText_c25b5cc7{font-weight:700;color:#0078d4}.screenReaderOnly_c25b5cc7{position:absolute;text-indent:-9999px;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;border:0}", ""]);



/***/ }),

/***/ "7Awa":
/*!***********************************************!*\
  !*** external "@microsoft/sp-component-base" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7Awa__;

/***/ }),

/***/ "7pKC":
/*!***********************************!*\
  !*** ./lib/PropertyPaneLoader.js ***!
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



/**
 * Loads the property pane module, asyncronously.
 * @internal
 */
var PropertyPaneLoader = /** @class */ (function () {
    function PropertyPaneLoader() {
        this._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('PropertyPaneLoader');
    }
    Object.defineProperty(PropertyPaneLoader.prototype, "propertyPane", {
        /**
         * Async property pane getter.
         */
        get: function () {
            var _this = this;
            if (!this._propertyPaneController) {
                var propertyPaneQosMonitor_1 = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('PropertyPaneLoader.loadPropertyPaneModule');
                if (false) { var propertyPaneController; }
                else {
                    return _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["SPComponentLoader"].loadComponentById(PropertyPaneLoader._propertyPaneModuleId)
                        .then(function (propertyPane) {
                        if (!_this._propertyPaneController) {
                            _this._propertyPaneController = new propertyPane._PropertyPaneController();
                        }
                        return Promise.resolve(_this._propertyPaneController);
                    })
                        .catch(function (error) {
                        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logErrorData({
                            source: _this._logSource,
                            error: error
                        });
                        propertyPaneQosMonitor_1.writeUnexpectedFailure('UnhandledError', error);
                        return Promise.reject(error);
                    });
                }
            }
            else {
                return Promise.resolve(this._propertyPaneController);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Service key to uniquely identify PropertyPaneLoader in the service scope.
     */
    PropertyPaneLoader.serviceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["ServiceKey"].create('sp-webpart-base:PropertyPaneLoader', PropertyPaneLoader);
    PropertyPaneLoader._propertyPaneModuleId = 'f9e737b7-f0df-4597-ba8c-3060f82380db';
    return PropertyPaneLoader;
}());
/* harmony default export */ __webpack_exports__["default"] = (PropertyPaneLoader);


/***/ }),

/***/ "AXNB":
/*!********************************************!*\
  !*** ./lib/core/styles/spinner.module.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./spinner.module.css */ "QCKo");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "Cfps":
/*!*******************************************************************************************!*\
  !*** ../sp-property-pane/lib/propertyPaneFields/propertyPaneSlider/PropertyPaneSlider.js ***!
  \*******************************************************************************************/
/*! exports provided: PropertyPaneSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneSlider", function() { return PropertyPaneSlider; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "3ZYD");
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

/***/ "E2Ji":
/*!*************************************************************************************************!*\
  !*** ../sp-property-pane/lib/propertyPaneFields/propertyPaneTextField/PropertyPaneTextField.js ***!
  \*************************************************************************************************/
/*! exports provided: PropertyPaneTextField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneTextField", function() { return PropertyPaneTextField; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "3ZYD");
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

/***/ "F78M":
/*!*******************************************************************************************!*\
  !*** ../sp-property-pane/lib/propertyPaneFields/propertyPaneButton/PropertyPaneButton.js ***!
  \*******************************************************************************************/
/*! exports provided: PropertyPaneButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneButton", function() { return PropertyPaneButton; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "3ZYD");
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

/***/ "FbpR":
/*!***************************************************!*\
  !*** ./lib/core/classicPages/ClassicPageUtils.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * This file contains code for the ClientSideWebPartManager. The webart host is expected to
 * load and manage webparts through the webpart manager APIs.
 */


/**
 * Utility class to help fixup web part DOM in classic pages to make the behaviour consistent.
 *
 * @internal
 */
var ClassicPageUtils = /** @class */ (function () {
    function ClassicPageUtils() {
    }
    /**
     * Disable all automatic postbacks by button clicks or enter in an input tag.
     */
    ClassicPageUtils.disableAutomaticPostbacks = function (domElement, env) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(domElement, 'domElement');
        if (env === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["EnvironmentType"].ClassicSharePoint) {
            /**
             * These are temporary fixes to disable the postbacks in classic pages. This works well with React
             * based web parts because the eventing happens through the React synthetic events and not the
             * browser native events. This may cause problems with non-React based web parts. We may need to
             * revisit this fix and come up with a better fix. . (SPPPLAT VSO#243894) tracks creating a better fix.
             */
            domElement.addEventListener('click', function (event) {
                event.preventDefault ? event.preventDefault() : (event.returnValue = false);
            }, true /* useCapture */);
            domElement.addEventListener('keydown', function (event) {
                if (event.keyCode === 13) {
                    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
                }
            }, true /* useCapture */);
        }
    };
    /**
     * Method to remove the unwanted old fabric styles from the page, which are being injected from the
     * server side. Permanent fix would be remove the server side injection.
     *
     * @todo (VSO SPPPLAT#258820) Remove fabric.min.css and related injections from the server side on the classic page.
     */
    ClassicPageUtils.removeFabricLinks = function () {
        var links = document.getElementsByTagName('link');
        if (links && links.length) {
            for (var i = 0; i < links.length; i++) {
                if (links[i] && links[i].href.indexOf('fabric.min.css') !== -1) {
                    var parentNode = links[i].parentNode;
                    if (parentNode) {
                        parentNode.removeChild(links[i]);
                    }
                }
            }
        }
    };
    return ClassicPageUtils;
}());
/* harmony default export */ __webpack_exports__["default"] = (ClassicPageUtils);


/***/ }),

/***/ "FxQH":
/*!*************************************************************!*\
  !*** ./lib/components/container/MinimalWebPartContainer.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_ClientSideWebPartManagerFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/ClientSideWebPartManagerFactory */ "wdlX");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */


/**
 * A basic container component to host a web part. This is the simplest component that can
 * host a web part. This should be used in scenarios where performance is key. Edit mode
 * is currently not supported in this container. And this container does not need ReactJS.
 *
 * @internal
 */
var MinimalWebPartContainer = /** @class */ (function () {
    function MinimalWebPartContainer(props) {
        this._validateProps(props);
        this._props = props;
        this._webPartManager = _core_ClientSideWebPartManagerFactory__WEBPACK_IMPORTED_MODULE_1__["default"].create(this._props.host);
    }
    Object.defineProperty(MinimalWebPartContainer.prototype, "webPartManager", {
        /**
         * Get the web part manager for this container.
         */
        get: function () {
            return this._webPartManager;
        },
        enumerable: true,
        configurable: true
    });
    MinimalWebPartContainer.prototype.render = function (domElement) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(domElement, 'domElement');
        this._domElement = domElement;
        // We create and append the web part container element to the document
        // so the initialization of the web part can execute as expected.
        // The reason we need the domElement appended to the document is because
        // we have not yet seperated the initlization of the web part from
        // the rendering, when this is no longer the case we may
        // remove this display change. @todo (SPPPLAT VSO#598054)
        //
        // Additionally, if we have the scenario where we want to render
        // the property pane instead of the web part, we need to change the
        // display to 'none' so that only the property pane content appears
        // in the document object and not the web part.
        if (this._props.openPropertyPane) {
            this._domElement.style.display = 'none';
        }
        else {
            this._domElement.style.display = 'block';
        }
        return this._renderWebPart(this._domElement).then(function () {
            if (_this._props.openPropertyPane) {
                _this._webPartManager.requestPropertyPaneAction(_this._props.webPartInstanceId, 1 /* Open */);
            }
            else { // Scenario: rendering the web part
                if (_this._props.requestDisplayModeStatus) {
                    _this._props.requestDisplayModeStatus();
                }
                if (_this._props.sendDimensionsToParent) {
                    window.setInterval(_this._sendDimensionsCallback.bind(_this), 200);
                }
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
    MinimalWebPartContainer.prototype.dispose = function () {
        this._webPartManager.disposeWebparts(this._props.webPartInstanceId);
        this._webPartManager.dispose();
    };
    MinimalWebPartContainer.prototype.setWebPartData = function (webPartData, instanceId) {
        var webPartManagerContext = this._getWebPartManagerContext(this._domElement, webPartData);
        this._webPartManager.setWebPartData(webPartManagerContext, instanceId);
    };
    /**
     * Invokes the ClientSideWebPartManager.serialize() function and returns the result.
     */
    MinimalWebPartContainer.prototype.serialize = function () {
        var serializedResult = this._webPartManager.serialize(this._props.webPartInstanceId);
        var webPartData = serializedResult.get(this._props.webPartInstanceId);
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(webPartData, 'webPartData');
        return webPartData;
    };
    /**
     * Sets the display mode of the web part in this instance of the MinimalWebPartContainer via the
     * ClientSideWebPartManager.
     *
     * @returns A promise indicating when the mode switch is complete. There can be a delay if the property
     *   pane chunk needs to be loaded.
     */
    MinimalWebPartContainer.prototype.setDisplayMode = function (displayMode) {
        return this._webPartManager._setDisplayMode(displayMode, this._props.webPartInstanceId);
    };
    /**
     * A call that trickle down to the PropertyPaneController to open/show the
     * property pane context. This is neccessary because the showPropertyPane method
     * in IframedWebPartController will only expose the iframed element but not take
     * care of showing the property pane content.
     */
    MinimalWebPartContainer.prototype.requestPropertyPaneAction = function (instanceId, propertyPaneAction, webPartData) {
        if (webPartData) {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(this._domElement, 'domElement');
            var webPartManagerContext = this._getWebPartManagerContext(this._domElement, webPartData);
            this._webPartManager.setWebPartData(webPartManagerContext, instanceId);
        }
        this._webPartManager.requestPropertyPaneAction(instanceId, propertyPaneAction);
    };
    /**
     * Returns the height of the element's content including content not visible on the screen due
     * to overflow.
     */
    MinimalWebPartContainer.prototype._getHeight = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(this._domElement, 'domElement');
        // The content measured will always be the only child of the 'domElement'.
        // This is because 'this._domElement' is initialized as an empty 'div' element
        // and the ClientSideWebPartManager renders the content into this div.
        var domElementChild = this._domElement.children.item(0);
        // We are using offset height as ooposed to the scroll height because, this way it would respect
        // the vertical scrollbars inside the web part itself, if any.
        return domElementChild.offsetHeight;
    };
    /**
     * Returns the width of the element's content including content not visible on the screen due
     * to overflow.
     */
    MinimalWebPartContainer.prototype._getWidth = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(this._domElement, 'domElement');
        // The content measured will always be the only child of the 'domElement'.
        // This is because 'this._domElement' is initialized as an empty 'div' element
        // and the ClientSideWebPartManager renders the content into this div.
        var domElementChild = this._domElement.children.item(0);
        // We are using offset width as opposed to the scroll width because, this way it would respect
        // the horizontal scrollbars inside the web part itself, if any.
        return domElementChild.offsetWidth;
    };
    MinimalWebPartContainer.prototype._sendDimensionsCallback = function () {
        // this callback is only called when 'this._props.sendDimensionsToParent' exists.
        this._props.sendDimensionsToParent(this._getHeight());
    };
    MinimalWebPartContainer.prototype._renderWebPart = function (domElement) {
        var _this = this;
        return this._webPartManager.loadWebPart(this._getWebPartManagerContext(domElement, this._props.webPartData))
            .catch(function (error) {
            _this._webPartManager.renderError(domElement, error);
        });
    };
    MinimalWebPartContainer.prototype._getWebPartManagerContext = function (domElement, webPartData) {
        return {
            domElement: domElement,
            instanceId: this._props.webPartInstanceId,
            manifest: this._props.manifest,
            displayMode: this._props.displayMode || (this._props.openPropertyPane ? _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["DisplayMode"].Edit : _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["DisplayMode"].Read),
            webPartData: webPartData,
            addedFromPersistedData: true,
            totalWebparts: 1,
            formFactor: this._props.formFactor,
            webpartLoadExtraLogInfo: {
                pageLayoutType: this._props.pageHostLayoutType,
                columnType: '0',
                displayMode: 'Read',
                webPartContainer: 'MinimalWebPartContainer'
            }
        };
    };
    MinimalWebPartContainer.prototype._validateProps = function (props) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(props, 'props');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(props.webPartData, 'props.webPartData');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(props.webPartInstanceId, 'props.webPartInstanceId');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(props.manifest, 'props.manifest');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(props.serviceScope, 'props.applicationContext.serviceScope');
    };
    return MinimalWebPartContainer;
}());
/* harmony default export */ __webpack_exports__["default"] = (MinimalWebPartContainer);


/***/ }),

/***/ "I6O9":
/*!***************************************!*\
  !*** external "@microsoft/sp-loader" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_I6O9__;

/***/ }),

/***/ "L5sm":
/*!***************************************************!*\
  !*** ./lib/components/host/MinimalWebPartHost.js ***!
  \***************************************************/
/*! exports provided: MinimalWebPartHost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinimalWebPartHost", function() { return MinimalWebPartHost; });
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */
/**
 * The minimal web part host is the simplest implementation needed to use the
 * Client Side Web Part Manager.
 *
 * @internal
 */
var MinimalWebPartHost = /** @class */ (function () {
    function MinimalWebPartHost(scope) {
        this.serviceScope = scope;
    }
    return MinimalWebPartHost;
}());



/***/ }),

/***/ "LHST":
/*!**************************************!*\
  !*** ./lib/core/loc/Strings.resx.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_cUY5i3OR5M46pep9mRCR0g';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "Lz2h":
/*!*****************************************************************************************!*\
  !*** ../sp-property-pane/lib/propertyPaneFields/propertyPaneLabel/PropertyPaneLabel.js ***!
  \*****************************************************************************************/
/*! exports provided: PropertyPaneLabel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneLabel", function() { return PropertyPaneLabel; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "3ZYD");
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

/***/ "Ncfj":
/*!************************************!*\
  !*** ./lib/core/teams/ITeamsJs.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "NdaM":
/*!**********************************************!*\
  !*** ./lib/core/WebPartLoadDataCollector.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../common/KillSwitches */ "+ORw");
// Copyright (c) Microsoft. All rights reserved.


var NOT_AVAILABLE_VALUE = 'N/A';
var WebPartLoadDataCollector = /** @class */ (function () {
    function WebPartLoadDataCollector() {
    }
    WebPartLoadDataCollector.collect = function (manifest, /* tslint:disable-line:no-any */ webPartTag, qosMonitor, pageContext, registeredInViewport) {
        var getTime = function (key) {
            return _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__["_PerformanceLogger"].readComponentBreakdown(webPartTag, key);
        };
        var start = getTime('start');
        var moduleLoaded = getTime('modulesLoaded');
        var loadingDelayed = getTime('loadingDelayed');
        var inViewportLoaded = getTime('inViewportLoading');
        var initialized = getTime('init');
        var end = getTime('end');
        var isSpinnyShown = !!getTime('displaySpinner');
        var cacheHit = getTime('CacheHit');
        var cacheMiss = getTime('CacheMiss');
        var prefetechedData = getTime('prefetchedData');
        var isCacheApplicable = Boolean(cacheHit || cacheMiss);
        var webPartCacheHit = isCacheApplicable ? (cacheHit ? 'true' : 'false') : 'N/A';
        var cacheMissReason = WebPartLoadDataCollector._getCacheMissReason(cacheHit, getTime);
        var isMultiGeo = Boolean(pageContext &&
            pageContext.legacyPageContext &&
            pageContext.legacyPageContext.isMultiGeoTenant);
        var perfBreakDown = _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__["_PerformanceLogger"].readFullEUPLBreakDown();
        var layoutID = NOT_AVAILABLE_VALUE;
        var dataProvider = NOT_AVAILABLE_VALUE;
        var dataProviderTime = _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__["_PerformanceLogger"].now();
        var layoutKey = "layout:" /* Layout */;
        var dataProviderKey = "dataProvider:" /* DataProvider */;
        // WebParts which have different layouts and dataproviders, will have perf marks such as
        // webPartTag.dataProvider: [dataProviderName]
        // webPartTag.Layout: [Layout]
        // The logic below will extract the data provider and layout, and log them for perf measurements.
        Object.keys(perfBreakDown).forEach(function (key) {
            if (key.indexOf(webPartTag) > -1) {
                // We only have 1 layout
                if (layoutID === NOT_AVAILABLE_VALUE && key.indexOf(layoutKey) > -1) {
                    layoutID = key.split(layoutKey)[1];
                    // Focus on primary data provider
                }
                else if (key.indexOf(dataProviderKey) > -1) {
                    // Pick earliest data provider, in case there are multiple
                    if (dataProvider === NOT_AVAILABLE_VALUE || perfBreakDown[key] < dataProviderTime) {
                        dataProvider = key.split(dataProviderKey)[1];
                        dataProviderTime = perfBreakDown[key];
                    }
                }
            }
        });
        if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_1__["default"].isLogWebPartLoadRenderDoneKillSwitchActivated() || !qosMonitor.hasEnded) {
            var viewportWait = loadingDelayed ? inViewportLoaded - loadingDelayed : 0;
            var extraData = {
                alias: manifest.alias,
                dataProvider: prefetechedData ? 'Prefetch' : dataProvider,
                isMultiGeo: isMultiGeo,
                initTime: Math.floor(initialized - inViewportLoaded),
                isInternal: manifest.isInternal,
                isSpinnyShown: isSpinnyShown,
                layout: layoutID,
                manifestId: manifest.id,
                moduleLoadTime: Math.floor(moduleLoaded - start),
                mySiteCacheHit: webPartCacheHit,
                cacheMissReason: cacheMissReason,
                renderTime: Math.floor(end - initialized),
                scenarioId: _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__["_PerformanceLogger"].getScenarioId(),
                viewportWait: viewportWait,
                isFullPage: _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__["_PerformanceLogger"].fullPageLoad
            };
            if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_1__["default"].collectInViewportData()) {
                extraData.tenantName = pageContext && pageContext.legacyPageContext
                    ? pageContext.legacyPageContext.tenantDisplayName : 'N/A';
                extraData.insideViewport = registeredInViewport;
            }
            qosMonitor.writeSuccess(extraData);
        }
    };
    WebPartLoadDataCollector._getCacheMissReason = function (cacheHit, getTime) {
        if (cacheHit) {
            return "N/A" /* NotApplicable */;
        }
        var mySiteCacheMissOnConfgMismatch = !!getTime('CacheMissConfigMismatch');
        var mySiteCacheMissOnLateFlush = !!getTime('LateFlush');
        var cachedWebPartNotFound = !!getTime('CachedWebPartNotFound');
        var cacheExpired = !!getTime('CacheExpired');
        var cacheMissReason = "NotSpecified" /* NotSpecified */;
        if (mySiteCacheMissOnConfgMismatch) {
            cacheMissReason = "CacheConfigMissmatch" /* CacheConfigMissmatch */;
        }
        else if (mySiteCacheMissOnLateFlush) {
            cacheMissReason = "LateFlush" /* LateFlush */;
        }
        else if (cachedWebPartNotFound) {
            cacheMissReason = "CachedItemNotFound" /* CachedItemNotFound */;
        }
        else if (cacheExpired) {
            cacheMissReason = "CacheExpired" /* CacheExpired */;
        }
        return cacheMissReason;
    };
    return WebPartLoadDataCollector;
}());
/* harmony default export */ __webpack_exports__["default"] = (WebPartLoadDataCollector);


/***/ }),

/***/ "NmNf":
/*!*****************************************************************************************************!*\
  !*** ../sp-property-pane/lib/propertyPaneFields/propertyPaneChoiceGroup/PropertyPaneChoiceGroup.js ***!
  \*****************************************************************************************************/
/*! exports provided: PropertyPaneChoiceGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneChoiceGroup", function() { return PropertyPaneChoiceGroup; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "3ZYD");
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

/***/ "OASt":
/*!**********************************************!*\
  !*** ./lib/core/ClientSideWebPartManager.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-component-base */ "7Awa");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ms_sp_load_themed_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ms/sp-load-themed-styles */ "5z2F");
/* harmony import */ var _ms_sp_load_themed_styles__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_load_themed_styles__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _PropertyPaneLoader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../PropertyPaneLoader */ "7pKC");
/* harmony import */ var _utils_ExecuteWithoutFailing__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/ExecuteWithoutFailing */ "3+DO");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../common/KillSwitches */ "+ORw");
/* harmony import */ var _BaseClientSideWebPart__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./BaseClientSideWebPart */ "evvI");
/* harmony import */ var _classicPages_ClassicPageUtils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./classicPages/ClassicPageUtils */ "FbpR");
/* harmony import */ var _ClientSideWebPartStatusRenderer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ClientSideWebPartStatusRenderer */ "aOlN");
/* harmony import */ var _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./error/SPWebPartError */ "ybLs");
/* harmony import */ var _IWebPartData__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./IWebPartData */ "jeXa");
/* harmony import */ var _loaders_IframedWebPartControllerLoader__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./loaders/IframedWebPartControllerLoader */ "VuYt");
/* harmony import */ var _ViewportLoaderUtility__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ViewportLoaderUtility */ "TIMW");
/* harmony import */ var _ViewportLoader__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./ViewportLoader */ "u2P9");
/* harmony import */ var _WebPartContext__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./WebPartContext */ "ruV7");
/* harmony import */ var _WebPartLoadDataCollector__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./WebPartLoadDataCollector */ "NdaM");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./loc/Strings.resx */ "LHST");
// Copyright (c) Microsoft. All rights reserved.
// This file contains code for the ClientSideWebPartManager. The web part host is expected to
// load and interact with web parts only through the web part manager APIs.
























var THUMBNAIL_MAX_URL_LENGTH = 255; // All SharePoint URL field types have this limit
var DOCVIZ_REGEX = /(\/_layouts\/15\/getpreview.ashx\/?(|(\?(.*?)))$)/i;
// Flight name is 'SppplatIframedWebPartControllerLoadingFeature'
var SPPPLAT_IFRAMED_WEBPART_CONTROLLER_FLIGHT_ID = 1147;
/**
 * The ClientSideWebPartManager is expected to be the public interface to client-side web parts. Each
 * host is expected to create an instance of this class and manage loading of all web parts in that host
 * through that one instance. e.g. On one page, if there are multiple Canvas objects, each one could have
 * one instance of this class. If the page hosts web parts without the Canvas, then the page can have an
 * instance of this class. Overall this class is expected to provide the following purpose:
 *
 *    - Orchestrates loading of one or more web parts in a host.
 *    - It takes care of loading web part dependencies asynchronously. Each web part loads completely
 *      independently of the other web parts in the host.
 *    - Keep a reference to all the loaded web parts and help provide bulk operations on the web parts.
 *    - Help manage memory leak type issues in one place.
 *    - Integrate the web parts with the PropertyPane and other external entities.
 *    - Help troubleshoot web parts during escalations.
 *
 * @internal
 */
var ClientSideWebPartManager = /** @class */ (function () {
    /**
     * Initialize the ClientSideWebPartManager.
     *
     * @param host - Reference to the host. A web part host is a component that is deemed capable of hosting a web
     * part. Any component that implements the IWebPartHost is allowed to host a web part.
     */
    function ClientSideWebPartManager(host) {
        /**
         * Dictionary of all the active web parts in this insance of the manager.
         */
        this._webparts = new Map();
        /**
         * Number of web parts asked to load, including web parts failed to load.
         */
        this._loadWebPartRequests = 0;
        /**
         * Web part status renderer instance scoped to this web part manager instance.
         */
        this._statusRenderer = new _ClientSideWebPartStatusRenderer__WEBPACK_IMPORTED_MODULE_14__["default"]();
        /**
         * Dictionary of all the iframed web parts in this instance of the manager.
         */
        this._iframedWebpartInstanceIds = new Set();
        this._propertyPaneConsumerQueue = new Map();
        /**
         * Number of web parts that has finished rendering, including those that have failed
         */
        this._webPartRenderedCount = 0;
        this._displayMode = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["DisplayMode"].Read;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(host, 'host');
        this._host = host;
        this._pageContext = host.serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_6__["PageContext"].serviceKey);
        this._onContainerResize = this._onContainerResize.bind(this);
        this._onPropertyPaneNotifications = this._onPropertyPaneNotifications.bind(this);
        this.requestPropertyPaneAction = this.requestPropertyPaneAction.bind(this);
        this.isPropertyPaneRenderedByWebPart = this.isPropertyPaneRenderedByWebPart.bind(this);
        this.isPropertyPaneOpen = this.isPropertyPaneOpen.bind(this);
        this._instantiateWebPart = this._instantiateWebPart.bind(this);
        this._handleErrorLoadingWebpart = this._handleErrorLoadingWebpart.bind(this);
        this._handleModulePromiseRejection = this._handleModulePromiseRejection.bind(this);
        this._onFirstTimeWebpartRender = this._onFirstTimeWebpartRender.bind(this);
        this._getViewportRenderedEndTime = this._getViewportRenderedEndTime.bind(this);
        // TODO: Remove along with graduation of flight WEXOptimizeViewportLoader
        this._getViewportRenderedEndTimeLegacy = this._getViewportRenderedEndTimeLegacy.bind(this);
        this._onAllWebpartsAdded = this._onAllWebpartsAdded.bind(this);
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isEnabled(1314 /* ViewportLoaderGeneralized */)) {
            this._viewportLoader = host.viewportLoader;
        }
        if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["default"].isIE11IntersectionObserverBugFixEnabled()) {
            this._deprecatedIsObserverEnabled = this._viewportLoader
                ? this._viewportLoader.optimizeViewportLoader()
                : _ViewportLoader__WEBPACK_IMPORTED_MODULE_19__["default"].optimizeViewportLoader();
        }
        if (ClientSideWebPartManager._webPartManagerList.length === 0) {
            this._initialzeOnResizeEventHandler();
        }
        ClientSideWebPartManager._webPartManagerList.push(this);
    }
    ClientSideWebPartManager._instanceOfBase = function (wp) {
        if (!wp) {
            return false;
        }
        else if (wp instanceof _BaseClientSideWebPart__WEBPACK_IMPORTED_MODULE_12__["default"]) {
            return true;
        }
        else {
            /* tslint:disable-next-line:no-string-literal */
            var objectType = wp['__type'];
            return objectType === 'BaseClientSideWebPart' || objectType === 'BaseMRClientSideWebPart';
        }
    };
    ClientSideWebPartManager._addPerfProperty = function (key, value, addToExistingValue) {
        if (addToExistingValue === void 0) { addToExistingValue = false; }
        if (addToExistingValue) {
            var previousValue = _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].getPerformanceProperty(key);
            if (previousValue && !isNaN(previousValue)) {
                value = value + previousValue;
            }
        }
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].setPerformanceProperty(key, value);
    };
    ClientSideWebPartManager._getWebPartTag = function (wp) {
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["default"].ensureWebPartTag()) {
            return wp && wp.context.webPartTag;
        }
        var errorReason;
        if (!ClientSideWebPartManager._instanceOfBase(wp)) {
            errorReason = 'WebpartTag requested for non-webpart';
        }
        else if (!wp.context) { // wp not being defined is checked by _instanceOfBase
            errorReason = 'WebpartTag requested for instance that is missing context';
        }
        if (errorReason) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logError(ClientSideWebPartManager._logSource, new Error(errorReason));
            return undefined;
        }
        return wp.context.webPartTag;
    };
    Object.defineProperty(ClientSideWebPartManager, "isMaintenanceMode", {
        /**
         * Returns true if the maintenanceMode query string parameter is provided.
         */
        get: function () {
            var urlParams = new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["UrlQueryParameterCollection"](window.location.href);
            return urlParams.getValue('maintenanceMode') === 'true';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Load a web part in the provided DOM element. Does the following steps
     *
     *    1. Validate params.
     *    2. Validate the web part manifest.
     *    3. Perform an async import of the web part modules from the provided manifest
     *      - i.e ClientSideWebPartManager._loadWebPartModules
     *    4. Instantiate and initialize the web part object
     *      - i.e. ClientSideWebPartManager._initializeWebPart
     *    5. Render the web part in the provided DOM element
     *      - i.e. ClientSideWebPartManager._renderWebPart
     *
     * If an error happens during any of the above steps, catch the error and log it.
     *
     * @param context - web part manager context.
     */
    ClientSideWebPartManager.prototype.loadWebPart = function (context) {
        var _this = this;
        this._loadWebPartRequests++;
        var instanceRequestCount = this._loadWebPartRequests;
        var loadModulePromise = undefined;
        var loadWebPartPromise = new Promise(function (resolve, reject) {
            _this._validateInput(context);
            // If this web part is being loaded in an iframe, load with IframedWebPartController.
            if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isEnabled(SPPPLAT_IFRAMED_WEBPART_CONTROLLER_FLIGHT_ID) &&
                // The next two conditions are neccessary because the same web part
                // will cross this path twice, once when determining if we should load in an
                // iframe and the second time is when we are loading the web part inside
                // the iframe.
                context.webpartLoadExtraLogInfo.pageLayoutType &&
                context.webpartLoadExtraLogInfo.pageLayoutType !== "Isolated" /* Isolated */ &&
                (context.manifest.isolationLevel === _IWebPartData__WEBPACK_IMPORTED_MODULE_16__["WebPartIsolationLevel"].DomIsolation ||
                    // 'isolatedDomain' is a string and we want to check if 'isolatedDomain' has value,
                    // instead of undefined or "".
                    !!context.manifest.isolatedDomain)) {
                _this._iframedWebpartInstanceIds.add(context.instanceId);
                var domainUrl_1 = _this._ensureUrl(context.manifest.isolatedDomain, _this._pageContext.site.absoluteUrl);
                return Object(_loaders_IframedWebPartControllerLoader__WEBPACK_IMPORTED_MODULE_17__["default"])().then(function (iframedWebPartControllerModule) {
                    if (!_this._iframedWebPartController) {
                        _this._iframedWebPartController = new iframedWebPartControllerModule(_this._host);
                    }
                    resolve(_this._iframedWebPartController.loadWebPart(domainUrl_1, _this._pageContext, context));
                }).catch(function (error) {
                    reject(error);
                });
            }
            else {
                // Performance and QoS markers
                var qosMonitor_1 = _this._createLoadQosMonitor();
                var webPartTag_1 = _this._createWebPartTag(context.manifest, context.instanceId);
                if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["default"].ensureWebPartTag()) {
                    try {
                        qosMonitor_1.extraData = {
                            'alias': context.manifest.alias,
                            'webPartTag': webPartTag_1
                        };
                    }
                    catch (e) { /* no-op for debugging */ }
                }
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
                    source: ClientSideWebPartManager._logSource,
                    message: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_22__["default"].LoadWebpartCalled, _this._loadWebPartRequests, context.totalWebparts, context.manifest.alias + "." + context.instanceId),
                    serviceScope: _this._host.serviceScope
                });
                _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].devMark("ClientSideWebPartManager.loadWebPart(" + webPartTag_1 + ").start");
                if (context.displayMode === undefined) {
                    context.displayMode = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["DisplayMode"].Read;
                }
                _this._displayMode = context.displayMode;
                var webpartLoadExtraData = context.webpartLoadExtraLogInfo;
                // We use webpartTag to make sure this one is unique for one kind of web part.
                webpartLoadExtraData.alias = _this._createWebPartTag(context.manifest, context.manifest.id);
                var logEntry = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogEntry"]('ClientSideWebPartManager', 'WebPartLoad', _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogType"].Event, webpartLoadExtraData);
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEventWithLogEntry(logEntry);
                // Step-2: Validate the web part manifest.
                // If manifest is null, we should display an error. This can be a legitimate case when the manifest has
                // been deleted or web part removed from the tenant level repository or the web part is not being shipped
                // anymore but some page still contains a reference to an instance of that web part.
                if (!_this._validateManifest(context.manifest, context.displayMode, webPartTag_1)) {
                    var error = _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartErrorCode"].ManifestInvalid, webPartTag_1);
                    _this.renderError(context.domElement, error);
                    reject(error);
                }
                var manifest_1 = context.manifest; /* tslint:disable-line:no-any */
                var instanceId_1 = context.instanceId;
                var domElement_1 = context.domElement;
                // If the web part has data, take the title from the data.
                // If the web part has just been created from the Toolbox, use the title from the picked up entry.
                // Otherwise we know nothing, use the title from the first pre-configured entry in the manifest.
                var title = context.webPartData && context.webPartData.title
                    ? context.webPartData.title
                    : (manifest_1.title && manifest_1.title.default /* tslint:disable-line:no-any */
                        ? manifest_1.title.default /* tslint:disable-line:no-any */
                        : manifest_1.preconfiguredEntries[0].title.default);
                if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["default"].isWebPartLoadShimmerKSActivated() && _this._statusRenderer._displayLoadingIndicator) {
                    _this._statusRenderer._displayLoadingIndicator(domElement_1, title, webPartTag_1, context.reservedHeight, manifest_1.isInternal);
                }
                else {
                    // Start the loading indicator
                    if (manifest_1.isInternal && _this._statusRenderer._displayLoadingIndicator) {
                        // call the internal version to write a performance marker when the loading indicator renders
                        // after the optional loading indicator wait time
                        _this._statusRenderer._displayLoadingIndicator(domElement_1, title, webPartTag_1, context.reservedHeight);
                    }
                    else {
                        _this._statusRenderer.displayLoadingIndicator(domElement_1, title);
                    }
                }
                // It is important that the 'startMarkForComponent' and 'endMarkForComponent'
                // performance logging are in the same method for readability.
                _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].startMarkForComponent(webPartTag_1);
                // Step-3: Load all the modules and dependencies for the web part.
                loadModulePromise = _this._loadWebPartModules(context, webPartTag_1, qosMonitor_1);
                loadModulePromise.then(function (baseComponent) {
                    _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].devMark("ClientSideWebPartManager.loadWebPart(" + webPartTag_1 + ").end");
                    // Step-4: Initialize the web part
                    try {
                        _this._initializeWebPart({
                            context: context,
                            moduleLibrary: baseComponent,
                            webPartTag: webPartTag_1,
                            qosMonitor: qosMonitor_1
                        });
                    }
                    catch (error) {
                        // Process error in Step-4 i.e. _renderWebPart.
                        // Error displaying is taken care of in 'this._initializeWebPart'
                        reject(error);
                        return;
                    }
                    // Step-5: Render the web part
                    return _this._renderWebPart({
                        context: context,
                        webPartTag: webPartTag_1,
                        qosMonitor: qosMonitor_1,
                        instanceRequestCount: instanceRequestCount
                    })
                        .then(function () {
                        _this._handleRenderComplete(webPartTag_1, manifest_1, qosMonitor_1, context, resolve);
                    }).catch(function (error) {
                        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["default"].isLogWebPartLoadRenderDoneKillSwitchActivated()
                            && error instanceof _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartError"] && error.id === _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartErrorCode"].RenderTimeout) {
                            qosMonitor_1.writeUnexpectedFailure('RenderTimeout', error);
                            // For Render timeout error case, we don't want show error message in web part zone
                            // and we still need perf data, so resolve it as success case.
                            _this._handleRenderComplete(webPartTag_1, manifest_1, qosMonitor_1, context, resolve);
                            return;
                        }
                        throw error;
                    }); // Process error in Step-5 i.e. _renderWebPart. (error display is taken care of there).
                })
                    .then(function () {
                    return _this._loadLegacyFabricCssIfRequired(context, qosMonitor_1);
                })
                    .catch(function (err) {
                    _this._handleModulePromiseRejection(manifest_1, instanceId_1, domElement_1, webPartTag_1, err, qosMonitor_1);
                    reject(err);
                });
            }
        });
        /**
         * We cannot assume the last web part will successfully load, and need to execute
         * _onAllWebpartsAdded to not break the page.
         *
         * If for some reason the promise rejected due to an invalid context we still pass a
         * fake context. Although if this happens, there are probably a lot more things broken.
         *
         * [VSO:SPPPlat:481999]
         */
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Environment"].type !== _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["EnvironmentType"].ClassicSharePoint &&
            context.totalWebparts &&
            context.totalWebparts === instanceRequestCount) {
            // Capture the timing all web part has been processed by framework.
            // This does not include variable web part's module loading initialization and rendering speed
            // but speed of the framework to process the web parts.
            ClientSideWebPartManager._addPerfProperty('allWebPartsAdded', _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].now());
            // If we were never able to load a module, use a rejected Promise.
            var addedPromise = loadModulePromise ||
                Promise.reject('No module promise');
            addedPromise.then(function () {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
                    source: ClientSideWebPartManager._logSource,
                    message: "All " + context.totalWebparts + " web parts requested to load, has been processed",
                    serviceScope: _this._host.serviceScope
                });
                _this._onAllWebpartsAdded(context);
            }, function () { return _this._onAllWebpartsAdded(context || { totalWebparts: 1 }); });
        }
        return loadWebPartPromise.then(function () {
            _this._onWebPartRendered(context, _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].now());
            return Promise.resolve();
        }, function (error) {
            _this._onWebPartRendered(context, _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].now());
            return Promise.reject(error);
        });
    };
    /**
     * Set a IPropertyPaneConsumer object into the set of the Client-side Web Part Manager's
     * managed web parts.
     *
     * @param id - A unique instance id.
     * @param control - A component which wants to use the property Pane.
     *
     * @internal
     */
    ClientSideWebPartManager.prototype.setPropertyPaneConsumer = function (id, control) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(id, 'id');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(control, 'control');
        this._webparts.set(id, control);
        this._registerWebPartAsPropertyPaneConsumer(id);
    };
    /**
     * Fetch web part manifests. This makes a REST call to load the current site's web parts into the module loader.
     */
    ClientSideWebPartManager.prototype.fetchWebPartManifests = function () {
        var _this = this;
        if (!this._toolboxManifestsPromise && (
        // If the webServerRelativeUrl is missing we don't have anything to do here.
        !this._pageContext.web ||
            !this._pageContext.web.serverRelativeUrl ||
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Environment"].type === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["EnvironmentType"].Local ||
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Environment"].type === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["EnvironmentType"].Test)) {
            this._toolboxManifestsPromise = Promise.resolve();
        }
        // if web parts have already been fetched we don't have anything to do here.
        if (!this._toolboxManifestsPromise) {
            var requestCorrelationId_1;
            var qosMonitor_2 = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"]('ClientSideWebPartManager.FetchWebParts');
            var requestUrl_1 = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["UrlUtilities"].removeEndSlash(this._pageContext.web.serverRelativeUrl) + "/_api/web/GetClientSideWebParts";
            this._host.serviceScope.whenFinished(function () {
                var httpClient = _this._host.serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["SPHttpClient"].serviceKey);
                _this._toolboxManifestsPromise = (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["default"].cacheWebPartManifestFetchKSActive() ?
                    _this._fetchManifestsWithCache(httpClient, requestUrl_1) :
                    httpClient.get(requestUrl_1, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["SPHttpClient"].configurations.v1)).then(function (response) {
                    requestCorrelationId_1 = response.correlationId ? response.correlationId.toString() : undefined;
                    if (response.ok) {
                        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["default"].cacheWebPartManifestFetchKSActive()) {
                            // .json() is only able to be called once on a response object, cache it
                            return response.jsonCached || (response.jsonCached = Promise.resolve(response.json()));
                        }
                        else {
                            return response.json();
                        }
                    }
                    else {
                        throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartErrorCode"].ManifestDownloadFailed);
                    }
                })
                    .then(function (value) {
                    var manifests = value.value.map(function (manifestObject) { return JSON.parse(manifestObject.Manifest); });
                    _this._disambiguateWebPartManifestLocales(manifests);
                    _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_4__["SPComponentLoader"].registerManifests(manifests);
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
                        source: ClientSideWebPartManager._logSource,
                        message: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_22__["default"].CompletedLoadingWebPartManifests,
                        serviceScope: _this._host.serviceScope
                    });
                    qosMonitor_2.writeSuccess();
                })
                    .catch(function (error) {
                    // Clear out the promise so we can try again if we enter edit mode again.
                    _this._toolboxManifestsPromise = undefined;
                    if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["default"].cacheWebPartManifestFetchKSActive()) {
                        _this._clearManifestCacheItem(requestUrl_1);
                    }
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logErrorData({
                        source: ClientSideWebPartManager._logSource,
                        error: error,
                        serviceScope: _this._host.serviceScope
                    });
                    qosMonitor_2.writeUnexpectedFailure('Rejected', error, {
                        correlationId: requestCorrelationId_1
                    });
                    throw error;
                });
            });
        }
        return this._toolboxManifestsPromise;
    };
    /**
     * Get list of active web part manifests.
     *
     * @returns - array of manifests.
     */
    ClientSideWebPartManager.prototype.getWebPartManifests = function () {
        var manifests = _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_4__["SPComponentLoader"]._getManifestReferences();
        var result = []; /* tslint:disable-line:no-any */
        if (manifests) {
            for (var _i = 0, manifests_1 = manifests; _i < manifests_1.length; _i++) {
                var manifest = manifests_1[_i];
                if (manifest && manifest.componentType === 'WebPart') {
                    result.push(manifest); /* tslint:disable-line:no-any */
                }
            }
        }
        return result;
    };
    /**
     * Set the display mode of the specified web part. If no web part id is specified, switch mode of all web parts.
     * If the display mode passed is same as the current mode, no change is applied.
     *
     * @param displayMode - the new DisplayMode.
     * @param instanceId - instance id of the web part.
     */
    ClientSideWebPartManager.prototype.setDisplayMode = function (displayMode, instanceId) {
        this._setDisplayMode(displayMode, instanceId);
    };
    /**
     * @internalremarks Only use this API if you need to immediately call property pane APIs after switching the mode.
     * @internal
     */
    ClientSideWebPartManager.prototype._setDisplayMode = function (displayMode, instanceId) {
        var _this = this;
        this._displayMode = displayMode;
        if (this._displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["DisplayMode"].Read) {
            this._closeIsolatedPropertyPaneIfRequired();
        }
        // We only want to indicate we have loaded, if needed, the property pane
        /* tslint:disable-next-line:no-any */
        var setDisplayModePromise = this._loadPropertyPaneModule();
        // Set the display mode for the requested or all web parts.
        this._executeForIdsOrAll(this._getArrayOrUndefined(instanceId), function (id, webPart) {
            if (webPart) {
                webPart._internalSetDisplayMode(displayMode);
            }
            else if (_this._iframedWebpartInstanceIds.has(id)) {
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(_this._iframedWebPartController, 'IFramedWebPartController is undefined');
                _this._iframedWebPartController.setDisplayMode(displayMode, id);
            }
        });
        // Start the dirty bit timer if required
        this._startDirtyBitTimer(displayMode);
        return setDisplayModePromise;
    };
    /**
     * Serialize the specified web part. If no web part is specified, serialize all web parts.
     *
     * @param instanceId - instance id of the web part.
     */
    ClientSideWebPartManager.prototype.serialize = function (instanceId) {
        var _this = this;
        var sd = new Map();
        this._executeForIdsOrAll(this._getArrayOrUndefined(instanceId), function (id, webPart) {
            if (webPart) {
                sd.set(id, webPart._internalSerialize());
            }
            else if (_this._iframedWebpartInstanceIds.has(id)) {
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(_this._iframedWebPartController, 'IFramedWebPartController is undefined');
                sd.set(id, _this._iframedWebPartController.serialize(id));
            }
        });
        return sd;
    };
    /**
     * Set the web part data for the specified web part.
     *
     * The setWebPartData API has 3 possible scenarios when the web part data is updated externally.
     * - Web part declares useFallbackWhenPropertiesUpdatedExternally manifest field as `true`, web part manager will
     *   trigger the default fallback logic which disposes the web part and reload it using the given context.
     * - Web part overrides `onAfterPropertiesUpdatedExternally` life cycle events, web part manager will first
     *   deserialize the web part data, then invokes the `onAfterPropertiesUpdatedExternally` event to allow web part to
     *   do their customized handling logic.
     * - If useFallbackWhenPropertiesUpdatedExternally manifest field is `false` or `undefined`, and web part does not
     *   override `onAfterPropertiesUpdatedExternally` life cycle events, web part manager will first deserialize the
     *   web part data, then invokes the `_refresh` life cycle to re-render the web part.
     *
     * @param webPartData - the new web part data.
     * @param instanceId - instance id of the web part.
     * @param shouldFallback - whether it should fallback to dispose & reload logic.
     * @returns - A promise that resolves immediately if fallback is not used, or returns the loadWebPart promise
     *  when fallback is used.
     */
    ClientSideWebPartManager.prototype.setWebPartData = function (context, instanceId, shouldFallback) {
        if (shouldFallback === void 0) { shouldFallback = false; }
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(context, 'web part manager context');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(instanceId, 'web part instance id');
        var wp = this._webparts.get(instanceId);
        var webPartData = context.webPartData;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(webPartData, 'web part data');
        if (wp && webPartData) {
            if (shouldFallback) {
                this.disposeWebparts(instanceId);
                return this.loadWebPart(context);
            }
            else {
                wp._internalSetWebPartData(webPartData);
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPEventManager"].instance.raiseEvent(this._getDataUpdatedEventName(webPartData.instanceId), {});
            }
        }
        return Promise.resolve();
    };
    /**
     * Dispose of the current webpart manager and all of the webparts it has loaded.
     */
    ClientSideWebPartManager.prototype.dispose = function () {
        this.disposeWebparts();
        var currentIdx = ClientSideWebPartManager._webPartManagerList.indexOf(this);
        if (currentIdx >= 0) {
            ClientSideWebPartManager._webPartManagerList.splice(currentIdx, 1);
        }
    };
    /**
     * Dispose the specified web part. If no web part is specified, dispose all web parts.
     *
     * @param instanceId - instance id of the web part.
     */
    ClientSideWebPartManager.prototype.disposeWebparts = function (instanceId) {
        var _this = this;
        this._executeForIdsOrAll(this._getArrayOrUndefined(instanceId), function (id, webPart) {
            if (webPart) {
                // Remove references to the web part from the manager before disposing it
                _this._deleteWebPart(id);
                // Actually dispose the web part
                Object(_utils_ExecuteWithoutFailing__WEBPACK_IMPORTED_MODULE_10__["executeWithoutFailing"])(function () { webPart._internalDispose(); }, ClientSideWebPartManager._logSource);
            }
            else if (_this._iframedWebpartInstanceIds.has(id)) {
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(_this._iframedWebPartController, 'IFramedWebPartController is undefined');
                _this._iframedWebPartController.deleteWebPart(id);
            }
        });
    };
    /*
     * Get the first web part with preview image url specified. If no web parts are specified, try to get the preview
     * image from all web parts.
     *
     * @param instanceIds - instance ids of the web parts.
     */
    ClientSideWebPartManager.prototype.tryGeneratePreviewImageUrl = function (instanceIds) {
        var _this = this;
        var candidatePreviewImageUrl;
        var previewImageUrl = undefined;
        var previewFromAlias = undefined;
        var monitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"]('ClientSideWebPartManager.tryGeneratePreviewImageUrl');
        this._executeForIdsOrAll(instanceIds, function (instanceId, webPart) {
            if (webPart) {
                // workaround for typescript targeting es5 only support for...of for array and string
                // also Map does not support some or every
                // @todo: Bug 222340 when switching to es6, use for...of and return after first match
                if (!previewImageUrl) {
                    var webPartThumbnail = webPart.previewImageUrl;
                    if (webPartThumbnail) {
                        previewFromAlias = webPart.context.manifest.alias;
                        if (webPartThumbnail.length < THUMBNAIL_MAX_URL_LENGTH) {
                            candidatePreviewImageUrl = webPartThumbnail;
                            // prefer non-canonical paths due to oAuth allowed end points
                            var normalizedPath = candidatePreviewImageUrl.toUpperCase();
                            /* tslint:disable-next-line:max-line-length */
                            // https://onedrive.visualstudio.com/_search?action=contents&text=authEndpoints&type=code&lp=custom-Collection&filters=ProjectFilters%7BOneDrive%20Service%7DRepositoryFilters%7Bnotify-server%7D&pageSize=25&result=DefaultCollection%2FOneDrive%20Service%2Fnotify-server%2FGBmaster%2F%2FActivity%2FOneDrive.Activity.DataAccess%2Fsrc%2FIdentity%2FSpoUserProvider.cs
                            var isSupportedByOAuth = (DOCVIZ_REGEX.test(normalizedPath)
                                || normalizedPath.indexOf('/_API/') >= 0);
                            if (isSupportedByOAuth) {
                                previewImageUrl = candidatePreviewImageUrl;
                            }
                        }
                        else {
                            var imageUrl = webPart.previewImageUrl;
                            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
                                source: ClientSideWebPartManager._logSource,
                                eventName: 'tryGeneratePreviewImageUrl',
                                message: previewFromAlias + " attempted preview URL of " + (imageUrl && imageUrl.length) + " chars."
                            });
                        }
                    }
                }
            }
            else if (_this._iframedWebpartInstanceIds.has(instanceId)) {
                // @todo: VSO#612911 - add support tryGeneratePreviewImageUrl for iframed webparts
                monitor.writeExpectedFailure('IframedPart');
                return undefined;
            }
        });
        var extraData = monitor && previewFromAlias
            ? { 'alias': previewFromAlias }
            : undefined;
        if (!previewImageUrl && candidatePreviewImageUrl) {
            previewImageUrl = candidatePreviewImageUrl;
            monitor.writeExpectedFailure('NonLayouts', undefined /* ex */, extraData);
        }
        if (!previewImageUrl && previewFromAlias) {
            monitor.writeUnexpectedFailure('PathTooLong', undefined /* ex */, extraData);
            // Ensure to adjust callers if changing this error message!
            throw new Error('tryGeneratePreviewImageUrl PathLengthError.');
        }
        if (!monitor.hasEnded) {
            monitor.writeSuccess(extraData);
        }
        return previewImageUrl;
    };
    /**
     * Request property pane to perform the given action.
     *
     * @param instanceId - web part instance id.
     * @param propertyPaneAction - indicates what action needs to be performed on the property pane.
     * @param renderedByWebPart - indicates whether the the property pane rendered by a web part or not.
     * @param context - pass additional context to property pane
     */
    ClientSideWebPartManager.prototype.requestPropertyPaneAction = function (instanceId, propertyPaneAction, renderedByWebPart, context /* tslint:disable-line:no-any */) {
        var _this = this;
        if (propertyPaneAction === void 0) { propertyPaneAction = 4 /* Default */; }
        if (this._iframedWebpartInstanceIds.has(instanceId)) { // Iframe controller scenario
            // Hiding the non-iframed property pane if open, before loading the iframed property pane.
            if (this._propertyPane && this._propertyPane.isOpen()) {
                this._propertyPane.requestAction(instanceId, 2 /* Close */, renderedByWebPart);
            }
            /* tslint:disable-next-line:no-any */
            this._iframedWebPartController.requestPropertyPaneAction(propertyPaneAction, instanceId);
        }
        else { // Default scenario
            // Hide the Iframed property pane before opening non-iframe scenario.
            // if no iframed property pane is present then this is a no-op.
            if (this._iframedWebPartController) {
                this._iframedWebPartController.requestPropertyPaneAction(2 /* Close */);
            }
            if (this._propertyPane) {
                this._propertyPane.requestAction(instanceId, propertyPaneAction, /* tslint:disable-line:no-any */ renderedByWebPart);
            }
            else if (propertyPaneAction === 6 /* OpenDetails */) {
                // If the properyPane is not loaded for OpenDetails Action,
                // We have to load the property pane and then execute the action.
                this._loadPropertyPaneModule(true).then(function () {
                    _this._propertyPane.requestAction(instanceId, propertyPaneAction, /* tslint:disable-line:no-any */ renderedByWebPart, context);
                });
            }
        }
    };
    /**
     * Returns true if the current property pane source is a web part and not the Canvas or any other source.
     */
    ClientSideWebPartManager.prototype.isPropertyPaneRenderedByWebPart = function () {
        return this._propertyPane && this._propertyPane.isRenderedByConsumer();
    };
    /**
     * Returns the state of the PropertyPane if it is open or not.
     */
    ClientSideWebPartManager.prototype.isPropertyPaneOpen = function () {
        return this._propertyPane && this._propertyPane.isOpen();
    };
    /**
      * Method to handle the web part delete action from the host. There is a key distinction between delete and dispose.
      * Delete implies that the web part has been deleted from the page and the web part should dispose all the server
      * side or other external resources attached to the web part. Dispose implies that an in-place navigation is
      * happening and the web part manager should delete the web part from its cache.
      *
      * @param instanceId - instance id of the webpart which is deleted.
      */
    ClientSideWebPartManager.prototype.onWebPartDelete = function (instanceId) {
        this.disposeWebparts(instanceId);
    };
    /**
     * Render an error message in the web part container div.  Also logs the error message to the IWebPartHost logger.
     */
    ClientSideWebPartManager.prototype.renderError = function (domElement, error) {
        var _this = this;
        Object(_utils_ExecuteWithoutFailing__WEBPACK_IMPORTED_MODULE_10__["executeWithoutFailing"])(function () {
            _this._statusRenderer.renderError(domElement, error);
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logErrorData({
                source: ClientSideWebPartManager._logSource,
                error: error,
                serviceScope: _this._host.serviceScope
            });
        }, ClientSideWebPartManager._logSource);
    };
    /**
     * Notify webparts that their container has resized.
     *
     * @param instanceId - if specified only notify one webpart that its container has resized
     */
    ClientSideWebPartManager.prototype.notifyWebPartContainerResize = function (instanceId) {
        var _this = this;
        this._executeForIdsOrAll(this._getArrayOrUndefined(instanceId), function (id, webPart) {
            if (webPart) {
                webPart._internalOnAfterResize();
            }
            else if (_this._iframedWebpartInstanceIds.has(id)) {
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(_this._iframedWebPartController, 'IFramedWebPartController is undefined');
                _this._iframedWebPartController.notifyContainerResize(id);
            }
        });
    };
    /**
     * Used to ensure the next request for webpart manifests makes a call to the server.
     */
    ClientSideWebPartManager.prototype.clearManifestPromise = function () {
        this._toolboxManifestsPromise = undefined;
    };
    /** ------------------- PROTECTED ------------------- **/
    /**
     * Generate web part context.
     */
    ClientSideWebPartManager.prototype._getWebPartContext = function (context) {
        var webPartTag = this._createWebPartTag(context.manifest, context.instanceId);
        var sdks = this._host.getAdditionalContextProperties &&
            this._host.getAdditionalContextProperties() ||
            {};
        var microsoftTeams = sdks.microsoftTeams && sdks.microsoftTeams.teamsJs;
        var parameters = {
            sdks: sdks,
            microsoftTeams: microsoftTeams,
            parentServiceScope: context.serviceScope || this._host.serviceScope,
            manifest: this._getManifestInstance(context),
            instanceId: context.instanceId,
            webPartTag: webPartTag,
            domElement: context.domElement,
            statusRenderer: this._statusRenderer,
            isPropertyPaneRenderedByWebPart: this.isPropertyPaneRenderedByWebPart,
            isPropertyPaneOpen: this.isPropertyPaneOpen,
            formFactor: context.formFactor || 0 /* Standard */,
            host: this._host,
            requestPropertyPaneAction: this.requestPropertyPaneAction,
            loggingTag: webPartTag,
            _dataUpdatedEvent: new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["SPEvent"](this._getDataUpdatedEventName(context.instanceId))
        };
        var webPartContext = new _WebPartContext__WEBPACK_IMPORTED_MODULE_20__["default"](parameters);
        return webPartContext;
    };
    /** ------------------- PRIVATE ------------------- **/
    /**
     * Loads the web part component and any dynamic dependencies.
     */
    ClientSideWebPartManager.prototype._loadWebPartModules = function (context, webPartTag, qosMonitor) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
            source: ClientSideWebPartManager._logSource,
            message: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_22__["default"].StartedLoadingWebPart, webPartTag),
            serviceScope: this._host.serviceScope
        });
        var modulePromise = _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_4__["SPComponentLoader"].loadComponent(context.manifest);
        var moduleLoadPromises = [];
        // Always push main module at first index.
        moduleLoadPromises.push(modulePromise);
        // Add any dynamic dependency web part has declared through metadata.
        this._loadDynamicComponentDependencies(context.webPartData, webPartTag, moduleLoadPromises);
        return Promise.all(moduleLoadPromises)
            .then(function (moduleLibraries) {
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].devMark("ClientSideWebPartManager.loadWebPart(" + webPartTag + ").end");
            return Promise.resolve(moduleLibraries[0]);
        })
            .catch(function (error) {
            // Reject promise only if main web part promise is rejected.
            return modulePromise;
        });
    };
    ClientSideWebPartManager.prototype._fetchManifestsWithCache = function (httpClient, requestUrl) {
        if (!ClientSideWebPartManager._manifestRequestPromiseCache[requestUrl]) {
            ClientSideWebPartManager._manifestRequestPromiseCache[requestUrl]
                = httpClient.get(requestUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["SPHttpClient"].configurations.v1);
        }
        return ClientSideWebPartManager._manifestRequestPromiseCache[requestUrl];
    };
    ClientSideWebPartManager.prototype._clearManifestCacheItem = function (requestUrl) {
        delete ClientSideWebPartManager._manifestRequestPromiseCache[requestUrl];
    };
    /**
     * Invoked whenever a web part is rendered including situations where any errors have occurred
     */
    ClientSideWebPartManager.prototype._onWebPartRendered = function (context, renderEndTime) {
        this._webPartRenderedCount++;
        var trackingCallback = !!(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Environment"].type !== _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["EnvironmentType"].ClassicSharePoint && context.totalWebparts);
        if (this._isObserverEnabled && trackingCallback) {
            this._onAllWebpartsAdded(context);
        }
        if (context.onAllWebPartsRendered) {
            var lastPartRendered = context.totalWebparts === this._webPartRenderedCount;
            // We do not support classic pages for this feature
            if (trackingCallback && lastPartRendered) {
                window.setTimeout(function () { return context.onAllWebPartsRendered(renderEndTime); }, 0);
            }
        }
    };
    /**
     * Workaround for a server issue - disambiguate manifest locales if they haven't already been disambiguated
     * (VSO#243888) tracks fixing this issue.
     */
    ClientSideWebPartManager.prototype._disambiguateWebPartManifestLocales = function (manifests) {
        // Attempt to disambiguate locale for each manifest if the server didn't already do that
        var currentLocale = this._pageContext.cultureInfo.currentUICultureName
            ? this._pageContext.cultureInfo.currentUICultureName.toLowerCase()
            : undefined;
        if (currentLocale) {
            // This should only get called once, so it doesn't need to be a private function.
            var disambiguateLocale_1 = function (values) {
                var foundMatch = undefined;
                for (var locale in values) {
                    if (locale && locale.toLowerCase() === currentLocale && values[locale]) {
                        foundMatch = values[locale];
                        break;
                    }
                }
                return {
                    default: foundMatch || values.default
                };
            };
            manifests.forEach(function (manifest) {
                if (manifest.componentType === 'WebPart') {
                    var wpManifest = manifest;
                    wpManifest.preconfiguredEntries.forEach(function (entry) {
                        entry.title = disambiguateLocale_1(entry.title);
                        entry.description = disambiguateLocale_1(entry.description);
                        if (entry.group) {
                            entry.group = disambiguateLocale_1(entry.group);
                        }
                    });
                }
            });
        }
    };
    /**
     * Validate and process input parameters.
     */
    ClientSideWebPartManager.prototype._validateInput = function (context) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(context, 'web part manager context');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(context.domElement, 'web part element');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(context.instanceId, 'web part instanceId');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(context.manifest, 'web part manifest');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isTrue(!this._webparts.get(context.instanceId), "Duplicate web part instanceId is not allowed: " + context.instanceId);
    };
    /**
     * Validate the web part manifest.
     */
    ClientSideWebPartManager.prototype._validateManifest = function (manifest, /* tslint:disable-line:no-any */ mode, webPartTag) {
        // If the manifest is null, then
        //    In read mode, we throw as the host should never attempt to load the webpart without the manifest.
        //    In edit mode, we should display an error
        if (!manifest) {
            if (mode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["DisplayMode"].Read) {
                throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartErrorCode"].ManifestNull, webPartTag);
            }
            else {
                return false;
            }
        }
        // Clone the manifest and then validate the clone. This way we make sure there are no functions and other
        // non-field based types in the manifest.
        /* tslint:disable-next-line:no-any */
        var cm = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["cloneDeep"](manifest);
        /* tslint:disable-next-line:triple-equals */
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isTrue(cm.manifestVersion == 2, 'Only version 2 manifests are currently supported');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isTrue(!!cm.id, 'web part id cannot be null or undefined');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].tryParse(cm.id), 'web part id has to be a GUID');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isTrue(!!cm.version, 'webp art version cannot be null or undefined');
        return true;
    };
    /**
     * Execute the provided callback for the list of provided web part ids. If no list if provided,
     * execute the callback on all web parts.
     */
    ClientSideWebPartManager.prototype._executeForIdsOrAll = function (instanceIds, callback) {
        var _this = this;
        if (instanceIds) {
            instanceIds.forEach(function (instanceId) {
                var webPart = _this._webparts.get(instanceId);
                callback(instanceId, webPart);
            });
        }
        else {
            this._webparts.forEach(function (webPart, instanceId) {
                // Check the type because the dictionary can have web parts or property pane controls
                if (ClientSideWebPartManager._instanceOfBase(webPart)) {
                    callback(instanceId, webPart);
                }
            });
            if (this._iframedWebPartController) {
                this._iframedWebPartController.getAllInstanceIds().forEach(function (instanceId) {
                    callback(instanceId);
                });
            }
        }
    };
    Object.defineProperty(ClientSideWebPartManager.prototype, "_isObserverEnabled", {
        get: function () {
            if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["default"].isIE11IntersectionObserverBugFixEnabled()) {
                return this._deprecatedIsObserverEnabled;
            }
            else {
                return this._viewportLoader
                    ? this._viewportLoader.optimizeViewportLoader()
                    : _ViewportLoader__WEBPACK_IMPORTED_MODULE_19__["default"].optimizeViewportLoader();
            }
        },
        enumerable: true,
        configurable: true
    });
    ClientSideWebPartManager.prototype._getLoadedModuleList = function (moduleLibrary) {
        var loadedModulesString = '';
        for (var m in moduleLibrary) {
            if (moduleLibrary.hasOwnProperty(m)) {
                if (loadedModulesString) {
                    loadedModulesString += ',';
                }
                loadedModulesString += "" + m;
            }
        }
        return loadedModulesString;
    };
    /**
     * This is a temporary implementation of updating the host that a web part has updated properties.
     * Currently we run a timer that regularly checks for updated properties and raises the dirty bit
     * handler to the host. todo (VSO SPPPLAT#200728) tracks fixing this scenario in a better way.
     */
    ClientSideWebPartManager.prototype._startDirtyBitTimer = function (mode) {
        var _this = this;
        // Clear the timer in read mode
        if (mode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["DisplayMode"].Read) {
            // Do not clear the dirty bit timer in classic pages as there are editable and non-editable
            // web parts on the page simultaneously. Note, only one web part can be truly editable at
            // any give time.
            if (this._dirtyBitTimer && _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Environment"].type !== _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["EnvironmentType"].ClassicSharePoint) {
                window.clearInterval(this._dirtyBitTimer);
                this._dirtyBitTimer = undefined;
            }
            // If required start the timer in edit mode
        }
        else if (!this._dirtyBitTimer) {
            this._dirtyBitTimer = window.setInterval(function () {
                _this._executeForIdsOrAll(undefined, function (_instanceId, wp) {
                    if (wp) {
                        wp._internalSetDirtyBit();
                    }
                    else if (_this._iframedWebpartInstanceIds.has(_instanceId)) {
                        _this._iframedWebPartController.startDirtyBitTimer(_instanceId);
                    }
                });
            }, 1000);
        }
    };
    /**
     * Creates a new extra data object for writing unexpected failures to QosMonitor.
     */
    ClientSideWebPartManager.prototype._createUnexpectedFailureExtraData = function (alias, instanceId, isInternal, manifestId) {
        var unexpectedFailureExtraData = {
            alias: alias,
            instanceId: instanceId,
            isInternal: isInternal,
            manifestId: manifestId
        };
        return unexpectedFailureExtraData;
    };
    /**
     * Creates a new QosMonitor with a scenario name specific to the web part type.
     */
    ClientSideWebPartManager.prototype._createLoadQosMonitor = function () {
        // Do NOT change this format without updating BingDat/Alerters first or escalations will ensue!!!
        return new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"]("WebPart.Load", true);
    };
    /**
     * Create the web part tag. Web part tag is a unique tag per web part instance and is used for logging and telemetry.
     */
    /* tslint:disable-next-line:no-any */
    ClientSideWebPartManager.prototype._createWebPartTag = function (manifest, instanceId) {
        return "WebPart." + manifest.alias + "." + (manifest.isInternal ? 'internal' : 'external') + "." + instanceId;
    };
    ClientSideWebPartManager.prototype._deleteWebPart = function (id) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(id, 'id');
        // Since the property pane is defer loaded, check if it exists/loaded before
        // using it.
        if (this._propertyPane) {
            this._propertyPane.onConsumerDelete(id);
        }
        var wp = this._webparts.get(id);
        if (wp && ClientSideWebPartManager._instanceOfBase(wp)) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
                source: ClientSideWebPartManager._logSource,
                message: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_22__["default"].WebpartDeleteRequested, ClientSideWebPartManager._getWebPartTag(wp)),
                serviceScope: this._host.serviceScope
            });
            this._loadWebPartRequests--;
            this._webPartRenderedCount--;
            if (this._loadWebPartRequests < 0) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logErrorData({
                    source: ClientSideWebPartManager._logSource,
                    error: new Error(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_22__["default"].UnexpectedLoadRequestNegativeCount),
                    serviceScope: this._host.serviceScope
                });
            }
        }
        this._webparts.delete(id);
    };
    /**
     * Get web part manifest instance from manifest. Promotes the pre-configured entries.
     */
    /* tslint:disable:no-any */
    ClientSideWebPartManager.prototype._getManifestInstance = function (context) {
        var manifest = context.manifest;
        var manifestClone = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["cloneDeep"](manifest);
        delete manifestClone.preconfiguredEntries;
        return manifestClone;
    };
    /* tslint:enable:no-any */
    /**
     * If non-non parameter passed, return array else return undefined.
     */
    ClientSideWebPartManager.prototype._getArrayOrUndefined = function (instanceId) {
        return instanceId ? [instanceId] : undefined;
    };
    ClientSideWebPartManager.prototype._initialzeOnResizeEventHandler = function () {
        window.addEventListener('resize', _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["debounce"](this._onContainerResize, 1000));
        window.addEventListener('message', this._onPropertyPaneNotifications);
    };
    /**
     * Window onresize event handler.
     */
    ClientSideWebPartManager.prototype._onContainerResize = function () {
        ClientSideWebPartManager._webPartManagerList.forEach(function (wpm) {
            wpm._webparts.forEach(function (wp) { wp._internalOnAfterResize(); });
        });
    };
    /**
     * Listener for window post message that the property pane.
     *
     * todo (SPPPLAT Bug #299413): Implement missing schema for property pane post messages
     * todo (SPPPLAT PBI #687467): Refactor IframedWebPartContoller
     */
    ClientSideWebPartManager.prototype._onPropertyPaneNotifications = function (event) {
        if (event && event.origin === window.location.origin) {
            switch (event.data) {
                case 'Property pane will open':
                    this._closeIsolatedPropertyPaneIfRequired();
                    break;
                case 'Property pane toggled':
                    this._onContainerResize();
                    break;
            }
        }
    };
    /**
     * When all web parts added, check if in viewport web parts are rendered
     * If so then notify viewport loader to load rest of the web parts gradually.
     */
    ClientSideWebPartManager.prototype._onAllWebpartsAdded = function (context, startTime) {
        var _this = this;
        if (this._isViewportRendered) {
            return;
        }
        // After 2 seconds let's timeout. If one bad web part is stuck for some reason, let it not
        // block rendering rest of the web parts on the page. 2 Second is good enough time given
        // for normal scenarios.
        var timeout = 2000;
        var endTime = this._getViewportRenderedEndTime();
        if (endTime || (startTime && (_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].now() - startTime) > timeout)) {
            this._isViewportRendered = true;
            var qosViewportLoad = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"]("Viewport.Load", true);
            if (endTime === undefined) {
                qosViewportLoad.writeExpectedFailure('Timed out waiting viewport web parts');
                endTime = _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].now();
            }
            else {
                qosViewportLoad.writeSuccess();
            }
            // Finish pending work in async manner so thread is freed for pending tasks.
            window.setTimeout(function () { _this._onViewportWebpartsLoaded(context, endTime); }, 0);
        }
        else if (!this._isObserverEnabled) {
            // Let's check again if rendering is completed
            window.setTimeout(function () { return _this._onAllWebpartsAdded(context, startTime ? startTime : _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].now()); }, 100);
        }
    };
    ClientSideWebPartManager.prototype._onViewportWebpartsLoaded = function (context, endTime) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(endTime, 'endTime');
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Environment"].type !== _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["EnvironmentType"].ClassicSharePoint) {
            // All web parts in the view port has rendered, now add those finally in the viewport.
            this._registerWebpartsInViewport();
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
                source: ClientSideWebPartManager._logSource,
                message: 'All Web parts in the viewports are rendered at ' + endTime,
                serviceScope: this._host.serviceScope
            });
        }
        // Let Canvas Renderer know that all viewport web parts are loaded
        if (context.onViewportWebPartsRendered) {
            context.onViewportWebPartsRendered(endTime);
        }
        if (context.totalWebparts || _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Environment"].type === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["EnvironmentType"].ClassicSharePoint) {
            if (this._viewportLoader) {
                this._viewportLoader.loadOutsideViewport();
            }
            else {
                _ViewportLoader__WEBPACK_IMPORTED_MODULE_19__["default"].deprecatedInstance.loadOutsideViewPort();
            }
        }
    };
    // TODO: Remove function along with graduation of flight WEXOptimizeViewportLoader
    ClientSideWebPartManager.prototype._getViewportRenderedEndTimeLegacy = function () {
        var _this = this;
        var isAllInViewportRendered = true;
        var endTime = undefined;
        var noWebPartInInitialViewport = true;
        this._webparts.forEach(function (wp) {
            var viewPortWebPart = wp;
            var webpartTag = ClientSideWebPartManager._getWebPartTag(wp);
            if (ClientSideWebPartManager._instanceOfBase(wp)
                && (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["default"].ensureWebPartTag() || webpartTag)
                && !_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].shouldSkipComponent(webpartTag)
                && _ViewportLoaderUtility__WEBPACK_IMPORTED_MODULE_18__["default"].isInInitialViewport(wp, _this._isObserverEnabled)) {
                noWebPartInInitialViewport = false;
                isAllInViewportRendered = isAllInViewportRendered ? viewPortWebPart._renderedOnce : isAllInViewportRendered;
                if (isAllInViewportRendered) { // Optimization check
                    var curEndTime = _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].getComponentEndTime(webpartTag);
                    if (curEndTime && (!endTime || curEndTime > endTime)) {
                        endTime = curEndTime;
                    }
                }
            }
        });
        if (noWebPartInInitialViewport) {
            return _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].now();
        }
        else {
            return isAllInViewportRendered ? endTime : undefined;
        }
    };
    /**
     * Return endtime of last rended web part if all web parts in the view port has rendered for current web part
     * manager instance, undefined otherwise.
     * Always remember hosting app can have multiple CSWPM instance.
     */
    ClientSideWebPartManager.prototype._getViewportRenderedEndTime = function () {
        if (!this._isObserverEnabled) {
            return this._getViewportRenderedEndTimeLegacy();
        }
        var endTime = undefined;
        var breakLoop = false;
        this._webparts.forEach(function (wp) {
            var viewPortWebPart = wp;
            var webpartTag = ClientSideWebPartManager._getWebPartTag(wp);
            if (!breakLoop &&
                ClientSideWebPartManager._instanceOfBase(wp) &&
                (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["default"].ensureWebPartTag() || webpartTag) &&
                !_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].shouldSkipComponent(webpartTag)) {
                if (!viewPortWebPart._renderedOnce && viewPortWebPart._registeredInViewport) {
                    endTime = undefined;
                    breakLoop = true;
                }
                else if (viewPortWebPart._renderedOnce && viewPortWebPart._registeredInViewport) {
                    var curEndTime = _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].getComponentEndTime(webpartTag);
                    if (curEndTime && (!endTime || curEndTime > endTime)) {
                        endTime = curEndTime;
                    }
                }
            }
        });
        return endTime;
    };
    /**
     * Add all web parts in the viewport to the EUPL calculation
     */
    ClientSideWebPartManager.prototype._registerWebpartsInViewport = function () {
        var _this = this;
        var externalWebpartsInViewport = 0; // Total external web parts in viewport.
        var internalWebpartsInViewport = 0; // Total internal web parts in viewport.
        var totalInternalWebParts = 0; // Total number of internal web parts in canvas.
        var totalExternalWebParts = 0; // Total number of external web parts in canvas.
        this._webparts.forEach(function (wp) {
            var viewPortWebPart = wp;
            if (ClientSideWebPartManager._instanceOfBase(wp)) {
                var isInternal = (wp.context && wp.context.manifest).isInternal;
                isInternal ? totalInternalWebParts++ : totalExternalWebParts++;
                if (_ViewportLoaderUtility__WEBPACK_IMPORTED_MODULE_18__["default"].isInInitialViewport(viewPortWebPart, _this._isObserverEnabled)) {
                    var webpartTag = ClientSideWebPartManager._getWebPartTag(wp);
                    if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["default"].ensureWebPartTag() || webpartTag) {
                        // Add web parts to EUPL if it is in the initial viewport
                        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].addComponent(webpartTag);
                    }
                    isInternal ? internalWebpartsInViewport++ : externalWebpartsInViewport++;
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
                        source: ClientSideWebPartManager._logSource,
                        message: "Web part " + webpartTag + " is added into EUPL calculation.",
                        serviceScope: _this._host.serviceScope
                    });
                }
            }
        });
    };
    /**
   * Converts Module library into Internal Web part object.
   * Throws Exception if unexpectd found
   */
    /* tslint:disable-next-line:no-any */
    ClientSideWebPartManager.prototype._instantiateWebPart = function (moduleLibrary, webPartTag) {
        var wp = moduleLibrary; /* tslint:disable-line:no-any */
        // The following code supports both types of web part modules. Those that are
        // exported as defaults in the webpart code. And those that are not exported
        // as defaults. i.e. This code helps support the case when there are multiple
        // web parts in a single bundle. !!!WARNING!!!  Changing this code without
        // careful vetting can cause serious regressions.
        // If the web part has a default export, use that.
        if (wp && wp.default) {
            wp = wp.default;
        }
        // Web part module not found. Stop any further processing.
        if (!wp) {
            throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartErrorCode"].ModuleNotLoaded, webPartTag, this._getLoadedModuleList(moduleLibrary));
        }
        // Try to go one more level deep if required.
        if (typeof (wp) !== 'function' && wp.default) {
            wp = wp.default;
        }
        // Stop any further processing if the type of the module is not correct.
        if (typeof (wp) !== 'function') {
            throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartError"].createWithLogProperties(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartErrorCode"].IncorrectBoostrapModule, { actualType: typeof (wp), wp: wp }, webPartTag);
        }
        var webPartInstace = new wp();
        if (!webPartInstace._internalInitialize) {
            throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartError"].createWithLogProperties(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartErrorCode"].MissingExpectedWebPartMemberError, { actualType: typeof (wp), wp: wp }, webPartTag, '_internalInitialize');
        }
        return webPartInstace;
    };
    /**
     * Handle when exception occurred loading web part
     */
    ClientSideWebPartManager.prototype._handleErrorLoadingWebpart = function (manifest, /* tslint:disable-line:no-any */ instanceId, domElement, ex, qosMonitor) {
        var _this = this;
        var wp = this._webparts.get(instanceId);
        if (wp) {
            Object(_utils_ExecuteWithoutFailing__WEBPACK_IMPORTED_MODULE_10__["executeWithoutFailing"])(function () { _this._statusRenderer.clearLoadingIndicator(domElement); }, ClientSideWebPartManager._logSource);
            Object(_utils_ExecuteWithoutFailing__WEBPACK_IMPORTED_MODULE_10__["executeWithoutFailing"])(function () { wp._internalDispose(); }, ClientSideWebPartManager._logSource);
            Object(_utils_ExecuteWithoutFailing__WEBPACK_IMPORTED_MODULE_10__["executeWithoutFailing"])(function () { _this._webparts.delete(instanceId); }, ClientSideWebPartManager._logSource);
        }
        Object(_utils_ExecuteWithoutFailing__WEBPACK_IMPORTED_MODULE_10__["executeWithoutFailing"])(function () {
            var extraData = _this._createUnexpectedFailureExtraData(manifest.alias, instanceId, manifest.isInternal, manifest.id);
            qosMonitor.writeUnexpectedFailure('UnhandledLoadError', ex, extraData);
        }, ClientSideWebPartManager._logSource);
        this.renderError(domElement, ex);
    };
    /**
     * handle when Module Promise is rejected
     */
    ClientSideWebPartManager.prototype._handleModulePromiseRejection = function (manifest, /* tslint:disable-line:no-any */ instanceId, domElement, webPartTag, error, qosMonitor) {
        var _this = this;
        Object(_utils_ExecuteWithoutFailing__WEBPACK_IMPORTED_MODULE_10__["executeWithoutFailing"])(function () {
            var extraData = _this._createUnexpectedFailureExtraData(manifest.alias, instanceId, manifest.isInternal, manifest.id);
            qosMonitor.writeUnexpectedFailure('ScriptLoad', error, extraData);
        }, ClientSideWebPartManager._logSource);
        this.renderError(domElement, error);
    };
    ClientSideWebPartManager.prototype._onFirstTimeWebpartRender = function (manifest, /* tslint:disable-line:no-any */ webPartTag, qosMonitor, context) {
        var inViewport;
        if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["default"].collectInViewportData()) {
            var webpart = this._webparts.get(context.instanceId);
            inViewport = webpart && webpart._registeredInViewport;
        }
        _WebPartLoadDataCollector__WEBPACK_IMPORTED_MODULE_21__["default"].collect(manifest, webPartTag, qosMonitor, this._pageContext, inViewport);
        _classicPages_ClassicPageUtils__WEBPACK_IMPORTED_MODULE_13__["default"].removeFabricLinks();
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
            source: ClientSideWebPartManager._logSource,
            message: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_22__["default"].ModulesLoadedForWebPart, webPartTag),
            serviceScope: this._host.serviceScope
        });
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["default"].isLogWebPartLoadRenderDoneKillSwitchActivated()) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEventWithLogEntry(new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogEntry"]('ClientSideWebPartManager', 'RenderDone', _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogType"].Event, {
                alias: this._createWebPartTag(context.manifest, context.manifest.id),
                displayMode: String(context.displayMode)
            }));
        }
    };
    ClientSideWebPartManager.prototype._getDataUpdatedEventName = function (webPartInstanceId) {
        return "WebPart_" + webPartInstanceId + "_dataUpdated";
    };
    ClientSideWebPartManager.prototype._initializeWebPart = function (options) {
        var context = options.context, moduleLibrary = options.moduleLibrary, webPartTag = options.webPartTag, qosMonitor = options.qosMonitor;
        try {
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].markComponentModuleLoaded(webPartTag);
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
                source: ClientSideWebPartManager._logSource,
                message: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_22__["default"].ModulesLoadedForWebPart, webPartTag),
                serviceScope: this._host.serviceScope
            });
            if (!moduleLibrary) {
                throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartErrorCode"].ModuleUndefined, webPartTag);
            }
            var wp = this._instantiateWebPart(moduleLibrary, webPartTag);
            // Actually initialize the web part.
            wp._internalInitialize(this._getWebPartContext(context), 
            // Tell the Web Part it will need to reinstate some properties from server processed content.
            !!context.addedFromPersistedData, context.displayMode);
            // Make sure the web part object is of the correct type.
            if (!ClientSideWebPartManager._instanceOfBase(wp)) {
                throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_15__["SPWebPartErrorCode"].NonBaseWebPart, webPartTag);
            }
            this._webparts.set(context.instanceId, wp);
            this._registerWebPartAsPropertyPaneConsumer(context.instanceId);
            // Start the dirty bit timer if required.
            this._startDirtyBitTimer(context.displayMode);
            // VSO#302772 Properly clone web part data
            var webPartData = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["cloneDeep"](context.webPartData);
            if (webPartData) {
                // Deserialize the web part data
                wp._internalDeserialize(webPartData);
            }
        }
        catch (error) {
            this._handleErrorLoadingWebpart(context.manifest, context.instanceId, context.domElement, error, qosMonitor);
            throw error;
        }
    };
    ClientSideWebPartManager.prototype._handleRenderComplete = function (webPartTag, manifest, /* tslint:disable-line:no-any */ qosMonitor, context, resolve) {
        // By this time assumption is web part has rendered something meaningful to the end user.
        // Web parts rendering with async resources are responsible to report this timing correctly by
        // overriding isRenderAsync to true.
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].endMarkForComponent(webPartTag);
        // Perform post render operation e.g. log telemetry data.
        this._onFirstTimeWebpartRender(manifest, webPartTag, qosMonitor, context);
        // Web part rendering completed successfully, resolve the promise.
        resolve();
    };
    ClientSideWebPartManager.prototype._renderWebPart = function (options) {
        var _this = this;
        var context = options.context, webPartTag = options.webPartTag, qosMonitor = options.qosMonitor, instanceRequestCount = options.instanceRequestCount;
        try {
            // Initialization step always occurs before render and initialization sets the
            // webpart into the '_webparts' map, thus we know it will always exist.
            var wp_1 = this._webparts.get(context.instanceId);
            // Each module loads styles in async mode by default, which is good for performance.
            // In Async mode it gets loaded in batch rather on each call for loadStyles
            // At this time we want to ensure that if any loadStyles request is in buffer is flushed
            // before component starts rendering.
            _ms_sp_load_themed_styles__WEBPACK_IMPORTED_MODULE_7__["flush"]();
            return this._loadPropertyPaneModule().then(function () {
                // internal render will write out specific failures
                var webpartFirstRenderPromise = wp_1._internalFirstTimeRender(
                // Passing scrollableParent as a perf optimization to avoiding discovering again.
                context.scrollableParent, qosMonitor);
                if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Environment"].type === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["EnvironmentType"].ClassicSharePoint &&
                    _ViewportLoaderUtility__WEBPACK_IMPORTED_MODULE_18__["default"].isInInitialViewport(wp_1, _this._isObserverEnabled)) {
                    // Add web parts to EUPL as it is in the initial viewport
                    // Always add for classic pages, otherwise RUMOneLogger will finish fast
                    _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_PerformanceLogger"].addComponent(webPartTag);
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
                        source: ClientSideWebPartManager._logSource,
                        message: "Web part " + webPartTag + " is added into EUPL calculation.",
                        serviceScope: _this._host.serviceScope
                    });
                }
                if (instanceRequestCount === 1 &&
                    _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Environment"].type === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["EnvironmentType"].ClassicSharePoint &&
                    !_this._host.isViewportLoadingDisabled) {
                    // Handle Classic page case here. In Classic page eath web part loads individually.
                    // So there is no advance knowledge of how many web parts to load. We start early to check.
                    _this._onAllWebpartsAdded(context);
                }
                return webpartFirstRenderPromise;
            }).catch(function (error) { throw error; });
        }
        catch (ex) {
            this._handleErrorLoadingWebpart(context.manifest, context.instanceId, context.domElement, ex, qosMonitor);
            return Promise.reject(ex);
        }
    };
    /**
     * Load all valid dynamic dependencies and adds into moduleLoadPromises param.
     *
     * This is the core of dynamic dependency web part has provided through metadata. Framework ensures that the such
     * dependency is loaded for the web part before it starts rendering. Ideally this component's js bundle should be
     * already downloaded by server script preloading feature for first few web parts in viewport.
     */
    ClientSideWebPartManager.prototype._loadDynamicComponentDependencies = function (webPartData, webPartTag, moduleLoadPromises) {
        if (webPartData
            && webPartData.serverProcessedContent
            && webPartData.serverProcessedContent.componentDependencies) {
            var componentDependencies = webPartData.serverProcessedContent.componentDependencies;
            if (componentDependencies) {
                for (var compDependency in componentDependencies) {
                    if (compDependency && componentDependencies[compDependency]) {
                        var componentId = componentDependencies[compDependency];
                        if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].tryParse(componentId)) {
                            var error = new Error("Web part (" + webPartTag + ") dynamic dependency " + componentId + " is not a valid guid");
                            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logErrorData({
                                source: ClientSideWebPartManager._logSource,
                                error: error,
                                serviceScope: this._host.serviceScope
                            });
                        }
                        else {
                            moduleLoadPromises.push(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_4__["SPComponentLoader"].loadComponentById(componentId));
                            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
                                source: ClientSideWebPartManager._logSource,
                                message: "Web part (" + webPartTag + ") loading dynamic dependency " + componentId + " started.",
                                serviceScope: this._host.serviceScope
                            });
                        }
                    }
                }
            }
        }
    };
    /**
     * Registers a component as a property pane consumer.
     * @param instanceId - Instance id of the consumer, to be registered with the property pane.
     */
    ClientSideWebPartManager.prototype._registerWebPartAsPropertyPaneConsumer = function (instanceId) {
        if (instanceId) {
            var wp = undefined;
            for (var _i = 0, _a = ClientSideWebPartManager._webPartManagerList; _i < _a.length; _i++) {
                var manager = _a[_i];
                wp = manager._webparts.get(instanceId);
                if (wp) {
                    if (this._propertyPane) {
                        this._propertyPane.registerConsumer(instanceId, wp);
                    }
                    else {
                        this._propertyPaneConsumerQueue.set(instanceId, wp);
                    }
                    break;
                }
            }
        }
    };
    /**
     * Creates an absolute url with the isolatedDomain parameter.
     * @param isolatedDomain - a domain without the protocol. Ex: "PrepSPO-appFEEAB5CE1CB0421FB1AAE5D09E0A8AAA.spgrid.com"
     * @param absoluteUrl - url with protocol that may or may not contain a path. Ex: "https://prepspo.spgrid.com"
     */
    ClientSideWebPartManager.prototype._ensureUrl = function (isolatedDomain, absoluteUrl) {
        if (!isolatedDomain) {
            return absoluteUrl;
        }
        // replace the domain in "https://domain/path" with isolatedDomain
        var slashAdded = false;
        if (absoluteUrl.charAt(absoluteUrl.length - 1) !== '/') {
            absoluteUrl = absoluteUrl + '/';
            slashAdded = true;
        }
        absoluteUrl = absoluteUrl.replace(ClientSideWebPartManager._domainRegex, "https://" + isolatedDomain + "/");
        if (slashAdded) {
            // Remove the ending slash
            absoluteUrl = absoluteUrl.substr(0, absoluteUrl.length - 1);
        }
        return absoluteUrl;
    };
    /**
     * Loads the property pane module asynchronously, if not already loaded.
     */
    ClientSideWebPartManager.prototype._loadPropertyPaneModule = function (renderDetailsPane) {
        var _this = this;
        if ((this._displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["DisplayMode"].Edit || renderDetailsPane ||
            // Classic pages behave differently, page and web part can be in different modes
            // hence tackling it in a different way. This is to fix a sev 1 so keeping the changes minimal.
            // We might revisit the logic in future, as required.
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Environment"].type === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["EnvironmentType"].ClassicSharePoint) &&
            !this._propertyPane) {
            var propertyPaneQosMonitor_1 = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"]('ClientSideWebPartManager._loadPropertyPaneModule');
            this._propertyPaneLoader = this._host.serviceScope.consume(_PropertyPaneLoader__WEBPACK_IMPORTED_MODULE_9__["default"].serviceKey);
            return this._propertyPaneLoader.propertyPane
                .then(function (propertyPane) {
                _this._propertyPane = propertyPane;
                _this._registerPendingPropertyPaneConsumers();
                return propertyPane;
            })
                .catch(function (error) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logErrorData({
                    source: ClientSideWebPartManager._logSource,
                    error: error
                });
                propertyPaneQosMonitor_1.writeUnexpectedFailure('UnhandledError', error);
                throw error;
            });
        }
        else {
            return Promise.resolve(undefined);
        }
    };
    ClientSideWebPartManager.prototype._registerPendingPropertyPaneConsumers = function () {
        var _this = this;
        this._propertyPaneConsumerQueue.forEach(function (consumer, instanceId) {
            _this._propertyPane.registerConsumer(instanceId, consumer);
        });
    };
    ClientSideWebPartManager.prototype._closeIsolatedPropertyPaneIfRequired = function () {
        ClientSideWebPartManager._webPartManagerList.forEach(function (cswpm) {
            if (cswpm._iframedWebPartController) {
                cswpm._iframedWebPartController.requestPropertyPaneAction(2 /* Close */);
            }
        });
    };
    /**
     * Load the fabric core library, for third-party web parts if required.
     * @param context - Current context of the web part manager
     * @param qosMonitor - qos monitor for the current flow
     */
    ClientSideWebPartManager.prototype._loadLegacyFabricCssIfRequired = function (context, qosMonitor) {
        var _this = this;
        var manifest = context.manifest;
        if (!_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__["_ComponentBaseKillSwitches"].isAddSpecificityToLegacyWebPartKSActivated()) {
            // We will add the classname for all 3rd party web parts, as many of 3rd party devs use the css not as
            // documentation required.
            if (_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__["_LegacyThirdPartyFabricCoreLoader"].needLegacyFabricCss(manifest) || !manifest.isInternal) {
                context.domElement.classList.add('ms-SPLegacyFabricBlock');
            }
        }
        if (!_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__["_ComponentBaseKillSwitches"].isStopLoadingLegacyFabricCSSKillSwitchActivated()) {
            /* tslint:disable-next-line:no-any */
            return _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__["_LegacyThirdPartyFabricCoreLoader"].forceLoad(manifest)
                .then(function () { return Promise.resolve(); })
                .catch(function (error) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logErrorData({
                    source: ClientSideWebPartManager._logSource,
                    error: error,
                    serviceScope: _this._host.serviceScope
                });
                qosMonitor.writeUnexpectedFailure('Error loading legacy-third-party-fabric-core.', error);
                Promise.reject(error);
            });
        }
        else {
            return _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__["_LegacyThirdPartyFabricCoreLoader"].load(context.manifest.isInternal)
                .then(function () { return Promise.resolve(); })
                .catch(function (error) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logErrorData({
                    source: ClientSideWebPartManager._logSource,
                    error: error,
                    serviceScope: _this._host.serviceScope
                });
                qosMonitor.writeUnexpectedFailure('Error loading legacy-third-party-fabric-core.', error);
                Promise.reject(error);
            });
        }
    };
    /**
     * Reference to the instances of all ClientSideWebPartManager instances in the app.
     */
    ClientSideWebPartManager._webPartManagerList = [];
    ClientSideWebPartManager._domainRegex = new RegExp('^https://[^/]*/');
    /*
     * Web part manager log source
     */
    ClientSideWebPartManager._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogSource"].create('ClientSideWebPartManager');
    ClientSideWebPartManager._manifestRequestPromiseCache = {};
    return ClientSideWebPartManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (ClientSideWebPartManager);


/***/ }),

/***/ "OHkx":
/*!****************************************!*\
  !*** ./lib/utils/ExecuteAndReThrow.js ***!
  \****************************************/
/*! exports provided: executeAndReThrow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "executeAndReThrow", function() { return executeAndReThrow; });
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * Execute the passed in delegate and re-throw the passed exception
 */


/**
 * Execute the passed in delegate and re-throw a custom error.
 * @param method - method to execute.
 * @param errorToThrow - custom error to throw.
 * @param logSource - log source.
 */
/* tslint:disable:export-name */
function executeAndReThrow(method, errorToThrow, logSource) {
    /* tslint:enable:export-name */
    _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(method, 'method');
    try {
        method();
    }
    catch (e) {
        // Defensive code as this method should never ever throw
        if (logSource) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(logSource, new Error('Error: ' + e));
        }
        errorToThrow.innerError = e;
        throw errorToThrow;
    }
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

/***/ "QCKo":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/core/styles/spinner.module.css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, "@-webkit-keyframes spin_08240f05{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}to{-webkit-transform:rotate(315deg);transform:rotate(315deg)}}@keyframes spin_08240f05{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}to{-webkit-transform:rotate(315deg);transform:rotate(315deg)}}.spinnerContainer_08240f05{position:relative;width:100%;padding:164px 0}.spinner_08240f05{position:relative;width:20px;height:20px;margin:auto}.spinnerRing_08240f05,.spinnerSlice_08240f05{position:absolute}.spinnerRing_08240f05{z-index:0;color:\"[theme:themeLight, default: #c7e0f4]\"}.spinnerSlice_08240f05{z-index:10;color:\"[theme:themePrimary, default: #0078d4]\";-webkit-animation:spin_08240f05 1.5s infinite;animation:spin_08240f05 1.5s infinite;-webkit-animation-timing-function:easeInOutCirc;animation-timing-function:easeInOutCirc}.spinnerLoadingMessage_08240f05{margin-top:10px;text-align:center;color:\"[theme:themePrimary, default: #0078d4]\"}.spinnerAccessibilityMessage_08240f05{position:absolute;width:1px;height:1px;margin:-1px;padding:0;border-width:0;overflow:hidden}", ""]);



/***/ }),

/***/ "TIMW":
/*!*******************************************!*\
  !*** ./lib/core/ViewportLoaderUtility.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Microsoft. All rights reserved.

// TODO: VSO740487 rename/move class
var ViewportLoaderUtility = /** @class */ (function () {
    function ViewportLoaderUtility() {
    }
    /**
     * Returns true if the component is in the initial page viewport.
     */
    ViewportLoaderUtility.isInInitialViewport = function (component, shouldOptimize) {
        if (shouldOptimize) {
            return component._registeredInViewport;
        }
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(component, 'component');
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        var top = component.domElement && component.domElement.getBoundingClientRect().top;
        var offsetFactor = 0.1;
        // 10% Offset from the bottom of the viewport for which we want to ignore from EUPL.
        // So component top should be at least 10% above from bottom to be counted into viewport
        var euplViewportOffset = Math.floor(viewportHeight * offsetFactor);
        return (window.pageYOffset + top) < (viewportHeight - euplViewportOffset);
    };
    return ViewportLoaderUtility;
}());
/* harmony default export */ __webpack_exports__["default"] = (ViewportLoaderUtility);


/***/ }),

/***/ "Ti3B":
/*!*********************************!*\
  !*** ./lib/core/BaseWebPart.js ***!
  \*********************************/
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
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_ExecuteAndReThrow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/ExecuteAndReThrow */ "OHkx");
/* harmony import */ var _utils_Object__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/Object */ "bfIN");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../common/KillSwitches */ "+ORw");
/* harmony import */ var _SPPropertyPane__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../SPPropertyPane */ "kj+3");
/* harmony import */ var _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./error/SPWebPartError */ "ybLs");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./loc/Strings.resx */ "LHST");
// Copyright (c) Microsoft. All rights reserved.













/**
 * This abstract class implements the UI-agnostic base functionality for a client-side web part.
 * The purpose is to allow a common core between 2D and MR WebParts.
 *
 * @privateRemarks
 * The _refresh() and _dynamicPropertyRefresh() API are the only API that are
 * mandatory to be implemented by our base WebPart classes.
 *
 * @public
 */
var BaseWebPart = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BaseWebPart, _super);
    /**
     * Constructor for the `BaseWebPart` class.
     *
     * @remarks
     * It is highly recommended that the web part use the OnInit API to perform any web part specific initialization.
     * Most of the web part features like this.context and this.properties are not available to be used before the
     * the onInit part of the web part loading lifecycle.
     */
    function BaseWebPart() {
        var _this = _super.call(this) || this;
        _this._initialized = false;
        _this._baseLogSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_LogSource"].create('BaseWebPart');
        /**
         * It makes sure we only log edit events once during one editing session.
         */
        _this._hasEditLogged = false;
        _this._emptyResolvedPromise = Promise.resolve();
        _this._disposeDynamicPropertiesIfRequired = _this._disposeDynamicPropertiesIfRequired.bind(_this);
        // Disallow instantiation of the base class by itself
        if (_this.constructor['name'] === 'BaseWebPart') { // tslint:disable-line:no-string-literal
            throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_10__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_10__["SPWebPartErrorCode"].BaseConstructError);
        }
        return _this;
    }
    Object.defineProperty(BaseWebPart.prototype, "previewImageUrl", {
        /**
         * This property points to the preview image for the web part. The base implementation returns undefined. Web parts
         * that want to provide a valid preview image url need to override this API. The preview image url can be used to
         * create a preview of the web part or of the page on which the web part is present.
         */
        get: function () { return undefined; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWebPart.prototype, "dataVersion", {
        /**
         * The value of this property is stored in the serialized data of the web part to allow developers to manage
         * versioning of their web part. The default version is 1.0
         */
        get: function () {
            return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Version"].parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWebPart.prototype, "displayMode", {
        /**
         * This property is the current display mode of the web part.
         *
         * @readonly
         */
        get: function () { return this._displayMode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWebPart.prototype, "properties", {
        /**
         * This property is the pointer to the custom property bag of the web part.
         *
         * @readonly
         */
        get: function () {
            if (this._initialized) {
                return this._properties;
            }
            else {
                throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_10__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_10__["SPWebPartErrorCode"].NotInitializedError);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWebPart.prototype, "propertiesMetadata", {
        /**
         * This property defines metadata for the web part property bag. The metadata can help SharePoint understand
         * the content of the properties better and perform relevant services on the data.
         *
         * @remarks
         * See {@link IWebPartPropertiesMetadata} for more information about how to define metadata
         */
        get: function () { return undefined; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWebPart.prototype, "disableReactivePropertyChanges", {
        /**
         * This property is used to change the web part's property pane interaction from Reactive to NonReactive.
         *
         * @remarks
         * The default behavior is Reactive.
         *
         * Reactive implies that changes made in the PropertyPane are transmitted to the web part instantly and the user can
         * see instant updates. This helps the page creator get instant feedback and decide if they should keep the new
         * configuration changes or not.
         *
         * NonReactive implies that the configuration changes are transmitted to the web part only after "Apply" PropertyPane
         * button is clicked.
         */
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWebPart.prototype, "accessibleTitle", {
        /**
         * This property points to the accessible title of web part made available to screen readers. The base implementation
         * returns that default title in the manifest. Web parts that want to provide more descriptive title containing
         * contextual information need to override this API.
         */
        get: function () { return this._getDefaultAccessibleTitle(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWebPart.prototype, "title", {
        /**
         * Title of the WebPart
         *
         * @readonly
         */
        get: function () { return this._title; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWebPart.prototype, "iconImageUrl", {
        /**
         * Icon image URL of the WebPart
         *
         * @internal
         */
        get: function () { return this._iconImageUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWebPart.prototype, "description", {
        /**
         * Description of the WebPart
         *
         * @readonly
         */
        get: function () { return this._description; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWebPart.prototype, "persistedProperties", {
        /**
         * This property is a pointer to the current set of properties which are already or needs to be persisted.
         *
         * @readonly
         */
        get: function () {
            return (this.disableReactivePropertyChanges && this._backupProperties) ?
                this._backupProperties : this.properties;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * API to get property pane configuration asynchronously.
     *
     * @internal
     */
    BaseWebPart.prototype._getPropertyPaneData = function (isDetails, context) {
        var _this = this;
        return this._loadPropertyPaneResources().then(function () {
            var configuration = isDetails ?
                _this.getDetailsPaneConfiguration(context) :
                _this.getPropertyPaneConfiguration();
            _this._fixUpDynamicDataConfiguration(configuration);
            return {
                webPartId: _this.context.instanceId,
                title: _this.title,
                isReactive: !_this.disableReactivePropertyChanges,
                configuration: configuration,
                properties: _this._cloneProperties(_this.properties),
                // Below methods are being overridden in the PropertyPane controller and hence
                // we do not need to bind it here. We still do not want to make it optional because
                // that could lead to unwanted bugs.
                onPropertyPaneFieldChanged: undefined,
                onConfigurationEvent: undefined,
                onRendered: _this.onPropertyPaneRendered,
                dynamicConfiguration: {
                    defaultCallback: (function () { _this._dynamicPropertyRefresh(); }).bind(_this),
                    dynamicDataProvider: _this.context.dynamicDataProvider
                }
            };
        });
    };
    /**
     * API to enable asynchronous loading of property pane related resources of a web part.
     *
     * @internal
     */
    BaseWebPart.prototype._loadPropertyPaneResources = function () {
        // Below promise will be undefined only when the web part is opening its property pane for the first time.
        if (!this._loadPropertyPaneResourcesPromise) {
            this._loadPropertyPaneResourcesPromise = this.loadPropertyPaneResources();
        }
        return this._loadPropertyPaneResourcesPromise;
    };
    /**
     * Internal API which is invoked when a property field is changed on the property pane.
     * This API is invoked only for the reactive property pane.
     *
     * @remarks
     * If the old value is of type DynamicProperty, but the new value is a static value
     * (This could happen when the 'targetProperty' is same for both a DynamicField on the
     * Dynamic Data Widget and a TextField which represents afore mentioned Dynamic Field
     * when the DD connection is removed by the end user on the property pane UI. In that
     * case, property pane sends in the static value which corresponds to the dynamic property(DP)
     * present before the DD connection is removed)
     *  then to respect the web part developer's choice of that target property being a DP,
     *  we create a new instace of DP and assign the incoming value as the static value
     *    then update the properties bag with the newly created DP instance.
     * else, update the properties bag with the new value for the property.
     *
     * @param propertyPath - JSON path of the property in the property bag.
     * @param newValue - New value of the property.
     *
     * @internal
     */
    BaseWebPart.prototype._onPropertyPaneFieldChanged = function (propertyPath, newValue, /* tslint:disable-line:no-any */ fieldType) {
        var _this = this;
        if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_8__["default"].isAvoidingUnnecesaryWebPartRenderKillSwitchActivated()) {
            // Create backupProperties if it is non-reactive property pane.
            if (this.disableReactivePropertyChanges && !this._backupProperties) {
                this._backupProperties = this._cloneProperties(this.properties);
            }
            var oldValue = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["get"](this._properties, propertyPath); // tslint:disable-line:no-any
            var newDynamicProperty = new _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"](// tslint:disable-line:no-any
            this.context.dynamicDataProvider, (function () { _this._dynamicPropertyRefresh(); }).bind(this));
            if (oldValue instanceof _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"] && !(newValue instanceof _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"])) {
                newDynamicProperty.setValue(newValue);
                newValue = newDynamicProperty;
            }
            this._updateProperty(propertyPath, newValue);
            this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
            this._afterPropertyUpdated(!this.disableReactivePropertyChanges);
        }
        else {
            var oldValue = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["get"](this._properties, propertyPath); // tslint:disable-line:no-any
            // TODO: Move the comments outside the method,
            // when the killswitch 'isAvoidingUnnecesaryWebPartRenderKillSwitchActivated' is graduated.
            // Property updates and web part re-rendering happens only in the following cases:
            //  case 1: when there is no change in the old and new value or
            //  case 2: when the event is coming from a button click(this is because, in this case
            //          regtardless of what newValue is we need to re-render the web part.)
            //  case 3: when the event is coming from a custom field(this is because, framework wouldn't
            //          know what exactly changed inside the custom field and we come to this spot in case
            //          case of custom field only when the web part specifically requests it.)
            if (!_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["isEqual"](oldValue, newValue) ||
                fieldType === _SPPropertyPane__WEBPACK_IMPORTED_MODULE_9__["PropertyPaneFieldType"].Button ||
                fieldType === _SPPropertyPane__WEBPACK_IMPORTED_MODULE_9__["PropertyPaneFieldType"].Custom) {
                // Create backupProperties if it is non-reactive property pane.
                if (this.disableReactivePropertyChanges && !this._backupProperties) {
                    this._backupProperties = this._cloneProperties(this.properties);
                }
                if (oldValue instanceof _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"] && !(newValue instanceof _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"])) {
                    var newDynamicProperty = new _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"](// tslint:disable-line:no-any
                    this.context.dynamicDataProvider, (function () { _this._dynamicPropertyRefresh(); }).bind(this));
                    newDynamicProperty.setValue(newValue);
                    newValue = newDynamicProperty;
                }
                this._updateProperty(propertyPath, newValue);
                this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
                this._afterPropertyUpdated(!this.disableReactivePropertyChanges);
            }
        }
    };
    /**
     * Internal API which is invoked when one of the predefined configuration events
     * (defined in `PropertyPaneLifeCycleEvent` enum.) is triggered.
     *
     * See PropertyPaneLifeCycleEvent for more details on the event definitions.
     *
     * @param event - Type of PropertyPaneLifeCycleEvent.
     * @param isOrWillPaneOpen - Indicates whether the pane is already open to configure or
     *  will open now, to be configured.
     *
     * @internal
     */
    BaseWebPart.prototype._onPropertyPaneLifeCycleEvent = function (event) {
        var _this = this;
        // Invoke the callback so that the host can handle the property pane life cycle event.
        if (this.context.host.propertyPaneLifeCycleEventCallback) {
            this.context.host.propertyPaneLifeCycleEventCallback(event, {
                webPartData: this._internalSerialize(),
                isPropertyPaneReactive: this._isPropertyPaneReactive()
            });
        }
        switch (event) {
            case 1 /* ConfigurationStart */:
                this._loadPropertyPaneResources().then(function () { return _this.onPropertyPaneConfigurationStart(); });
                break;
            case 2 /* ConfigurationComplete */:
                // Make sure we discard any backed up properties in the non-reactive mode.
                if (this.disableReactivePropertyChanges && this._backupProperties) {
                    // resetting the properties bag.
                    this._properties = this._backupProperties;
                    this._backupProperties = undefined;
                }
                this.onPropertyPaneConfigurationComplete();
                break;
            case 5 /* ApplyClicked */:
                // Updating the _backUpProperties with new set of properties.
                this._backupProperties = this.properties;
                this.onAfterPropertyPaneChangesApplied();
                this._afterPropertyUpdated(true);
                break;
        }
    };
    /**
     * Indicates whether the property pane is reactive or not.
     *
     * @remarks
     * The default behavior is Reactive.
     *
     * Reactive implies that changes made in the PropertyPane are transmitted to the web part instantly and the user can
     * see instant updates. This helps the page creator get instant feedback and decide if they should keep the new
     * configuration changes or not.
     *
     * NonReactive implies that the configuration changes are transmitted to the web part only after "Apply" PropertyPane
     * button is clicked.
     *
     * @internal
     */
    BaseWebPart.prototype._isPropertyPaneReactive = function () {
        return !this.disableReactivePropertyChanges;
    };
    /**
      * Internal API to serialize the web part properties.
      *
      * @internal
      */
    BaseWebPart.prototype._internalSerialize = function () {
        var _this = this;
        var data; // tslint:disable-line:no-any
        Object(_utils_ExecuteAndReThrow__WEBPACK_IMPORTED_MODULE_6__["executeAndReThrow"])(function () {
            _this.onBeforeSerialize();
            var propertiesJson = JSON.stringify(_this.properties);
            // Only log edit, if properties have changed and it haven't been logged.
            if (!_this._hasEditLogged && _this._initPropertiesSnapshot !== propertiesJson) {
                var isInternal = !!_this.context.manifest.isInternal;
                var logEntry = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_LogEntry"](_this._baseLogSource.id, 'WebPartEdited', _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_LogType"].Event, {
                    'alias': _this.context.manifest.alias,
                    'isInternal': isInternal.toString()
                });
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_EngagementLogger"].logEventWithLogEntry(logEntry);
                _this._hasEditLogged = true;
            }
            var serializedData = _this._serialize();
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Validate"].isNotNullOrUndefined(serializedData.dataVersion, 'serialized data version');
            // Avoid doing extra work if we know there is no dynamic data
            if (propertiesJson && propertiesJson.indexOf(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"]._TYPE_NAME) !== -1) {
                _this._serializeDynamicData(serializedData);
            }
            data = {
                // The serialized data wrapped by the framework
                id: _this.context.manifest.id,
                instanceId: _this.context.instanceId,
                title: _this.title,
                description: _this.description,
                // The serialized data provided by the web part
                serverProcessedContent: serializedData.serverProcessedContent,
                dynamicDataPaths: serializedData.dynamicDataPaths,
                dynamicDataValues: serializedData.dynamicDataValues,
                dataVersion: serializedData.dataVersion.toString(),
                properties: serializedData.properties
            };
        }, _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_10__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_10__["SPWebPartErrorCode"].SerializationFailed, this.context.webPartTag), this._baseLogSource);
        return data;
    };
    /**
     * Internal API to dispose the web part.
     *
     * See onDispose for more details.
     *
     * @internal
     */
    BaseWebPart.prototype._internalDispose = function () {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logVerbose(this._baseLogSource, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].DisposeLog, this.context.webPartTag));
        this._disposeDynamicPropertiesIfRequired();
        _super.prototype.dispose.call(this);
    };
    /**
     * Internal API triggered upon a resize of the DOM window's viewport
     *
     * @internal
     */
    BaseWebPart.prototype._internalOnAfterResize = function () {
        /* EMPTY BLOCK */
    };
    /**
     * Internal API to update the web part data.
     *
     * !!!WARNING!!! updating the web part data can be risky. If you end up updating the web part properties
     *  to an invalid format, this could cause the web part to persist invalid data format.
     *
     * @internal
     */
    BaseWebPart.prototype._internalSetWebPartData = function (webPartData) {
        var oldProperties = this.properties;
        this._internalDeserialize(webPartData);
        this.onAfterPropertiesUpdatedExternally(oldProperties);
    };
    /**
     * Internal API to switch the web part's display mode. This API updates the display mode and then re-renders the web
     * part in the new mode.
     * @internal
     */
    BaseWebPart.prototype._internalSetDisplayMode = function (newDisplayMode) {
        if (this._displayMode !== newDisplayMode) {
            var oldDisplayMode = this._displayMode;
            this._displayMode = newDisplayMode;
            this.onDisplayModeChanged(oldDisplayMode);
        }
    };
    /**
     * Internal API to set the dirty bit on the web part host if the web part properties have changed.
     * @internal
     */
    BaseWebPart.prototype._internalSetDirtyBit = function () {
        // This method could get invoked in classic pages in read mode also. Just ignore the call.
        if (this.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Read) {
            return;
        }
        var serializedState = this._internalSerialize();
        var newState = JSON.stringify(serializedState);
        // Don't set dirty bit the first time because the Canvas
        // would have done it when the webpart got added.
        if (!this._previousState) {
            this._previousState = newState;
        }
        else if (this._previousState !== newState && this.context.host.setDirty) {
            this.context.host.setDirty(this.context.instanceId, serializedState);
            this._previousState = newState;
        }
    };
    /**
     * This is the initial entry point, which is called by the `ClientSideWebPartManager` immediately
     * after the web part is constructed.  The initialization contract is internal.
     *
     * @param addedFromPersistedData - Tells the Web Part it will need to reinstate some properties
     * from server processed content (see BaseWebPart._reInstateServerProcessedData)
     *
     * @internal
     */
    BaseWebPart.prototype._internalInitialize = function (webPartContext, addedFromPersistedData, mode) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Validate"].isNotNullOrUndefined(webPartContext, 'webPartContext');
        /* tslint:enable:use-named-parameter */
        Object(_utils_Object__WEBPACK_IMPORTED_MODULE_7__["deepFreeze"])(webPartContext.manifest);
        _super.prototype._initializeContext.call(this, webPartContext);
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logVerbose(this._baseLogSource, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ConstructLog, webPartContext.webPartTag));
        // Bind the callbacks
        this.onDispose = this.onDispose.bind(this);
        this.onPropertyPaneRendered = this.onPropertyPaneRendered.bind(this);
        this._initialized = true;
        // Set the display mode of the web part
        this._displayMode = mode;
        // This is important for reinstating properties the way they were
        // before serialization. It must be set before any deserialization occurs.
        this._renderedFromPersistedData = addedFromPersistedData;
        if (!this._renderedFromPersistedData) {
            var isInternal = this.context.manifest.isInternal || false;
            var logEntry = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_LogEntry"](this._baseLogSource.id, 'WebPartAdded', _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_LogType"].Event, {
                'alias': this.context.manifest.alias,
                'isInternal': isInternal.toString()
            });
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_EngagementLogger"].logEventWithLogEntry(logEntry);
        }
    };
    /**
     * Internal base implementation of the web part data deserialization.
     *
     * @param data - web part data
     *
     * @internal
     */
    BaseWebPart.prototype._internalDeserialize = function (data) {
        if (data) {
            if (data.title) {
                this._title = data.title;
            }
            if (data.description) {
                this._description = data.description;
            }
            if (data.iconImageUrl) {
                this._iconImageUrl = data.iconImageUrl;
            }
            // For backward-compatibality, convert non-string versions to '1.0'
            // Because we used to serialize the version object in the early versions
            if (typeof data.dataVersion !== 'string') {
                data.dataVersion = '1.0';
            }
            // Note: it is okay not to create clones here
            var deserializedData = {
                properties: data.properties,
                serverProcessedContent: data.serverProcessedContent,
                dynamicDataPaths: data.dynamicDataPaths,
                dynamicDataValues: data.dynamicDataValues,
                dataVersion: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Version"].tryParse(data.dataVersion)
            };
            this._deserializeDynamicData(deserializedData);
            // Note: Initialization of DynamicProperties should always happen after the
            // properties are deserialized. This ensures that all the properties have proper
            // values constructed with types, if required.
            this._initializeDynamicPropertiesIfRequired(deserializedData.properties);
            /* tslint:disable-next-line:no-any */
            var deserializedPropsObject = this._reInstateServerProcessedData(deserializedData.properties, deserializedData.serverProcessedContent);
            // Give the web part an opportunity to deserialize the properties. If the web part
            // returns a valid property bag, use it as is else perform default deserialization.
            var fixedProps = this.onAfterDeserialize(deserializedPropsObject, deserializedData.dataVersion);
            // Cache the properties data just deserialized.
            this._initPropertiesSnapshot = JSON.stringify(deserializedPropsObject);
            if (!fixedProps) {
                throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_10__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_10__["SPWebPartErrorCode"].OnAfterDeserializeReturnedNull, this.context.webPartTag);
            }
            this._properties = fixedProps;
        }
    };
    /**
     * This event method is called when the web part is initialized.
     *
     * @remarks
     * This API should be overridden to perform long running operations e.g. data fetching from a remote service before
     * the initial rendering of the web part. The loading indicator is displayed during the lifetime of this method.
     * This API is called only once during the lifecycle of a web part.
     */
    BaseWebPart.prototype.onInit = function () {
        // Return a resolved promise by default
        return Promise.resolve(undefined);
    };
    /**
     * This event method is called when the display mode of a web part is changed.
     *
     * @remarks
     * The default implementation of this API calls
     * the web part render method to re-render the web part with the new display mode. If a web part developer does not
     * want a full re-render to happen on display mode change, they can override this API and perform specific updates
     * to the web part DOM to switch its display mode.
     *
     * @param oldDisplayMode - The old display mode.
     */
    BaseWebPart.prototype.onDisplayModeChanged = function (oldDisplayMode) {
        /* EMPTY BLOCK */
    };
    /**
     * This event method is called before the web part is serialized.
     *
     * @remarks
     * The default implementation is a no-op. The serialization
     * process serializes the web part property bag i.e. this.properties. This API gives the web part a chance to
     * update it's property bag before the serialization happens. Some web part's may keep their state other objects
     * or even in the DOM. If a web part needs to persist some of that state, it needs to override this API and update
     * the web part property bag to the latest state. If a web part updates the property bag with invalid property
     * values, those will get persisted. So that should be avoided. The web part property bag should always contain
     * valid property values.
     */
    BaseWebPart.prototype.onBeforeSerialize = function () {
        /* EMPTY BLOCK */
    };
    /**
     * This API is called after the web part is deserialized to an object, right before the property bag is populated.
     *
     * @remarks
     * The default implementation is a no-op. A web part developer can override this API if the deserialized object
     * does not fully reflect the initial state of the property bag. This gives the web part developer a chance to
     * populate the property bag right after the data is deserialized to an object.
     *
     * An important scenario to use deserialize is upgrading. An upgraded web part may load the data
     * that was serialized by an older version of the web part that supported a different schema of the property bag,
     * resulting the deserialized object to be incosistent with the current schema of the property bag. The developer
     * can use `onAfterDeserialize` to check the dataVersion and fix the property bag.
     *
     * @param deserializedObject - The object deserialized from the stored data. Note that the schema of  this object
     * is not necessarily consistent with the current property bag, because the serialization could have been done by
     * an older version of the web part
     * @param dataVersion - The data version of the stored data being deserialized. You can use this value to determine
     * if the data was serialized by an older web part. Web parts can define their data version by overriding the
     * dataVersion property.
     *
     * @returns The property bag of the web part
     */
    BaseWebPart.prototype.onAfterDeserialize = function (deserializedObject, dataVersion) {
        return deserializedObject;
    };
    /**
     * API to enable asynchronous loading of property pane related resources of the web part.
     *
     * @remarks
     * If not overridden by the web part, base web part resolves the promise immediately.
     *
     * It is called before any of the property pane apis are called and until this promise is resolved,
     * no other property pane related events are called except 'PropertyPaneConfigurationComplete'
     * as this event could be used by the web part to clean up any pending resources including the promise.
     *
     * @privateRemarks
     * This API is still in progress as we are still working on the overall design of how code splitting for
     * web parts should work. This API may change as the plans evolve.
     *
     * @alpha
     */
    BaseWebPart.prototype.loadPropertyPaneResources = function () {
        return this._emptyResolvedPromise;
    };
    /**
     * This API is used to ger the configuration to build the property pane for the web part. If the web part wants
     * to use the PropertyPane for configuration, this API needs to be overridden and the web part needs to return
     * the configuration for the PropertyPane.
     *
     * This API is not invoked until the 'loadPropertyPaneResources' promise is resolved.
     *
     * See IPropertyPane and other PropertyPane integration wiki documentation for more details.
     */
    BaseWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: []
        };
    };
    /**
     * This API is used to get the configuration to build the property pane for details.
     * If the web part wants to use the PropertyPane for details configuration,
     * this API needs to be overridden and the web part needs to return the configuration for details.
     *
     * This API is not invoked until the 'loadPropertyPaneResources' promise is resolved.
     *
     * See IPropertyPane and other PropertyPane integration wiki documentation for more details.
     *
     * @param context - additional context passed to getPropertyPaneDetailsConfiguration
     *
     * @alpha
     */
    BaseWebPart.prototype.getDetailsPaneConfiguration = function (context) {
        return {
            pages: []
        };
    };
    /**
     * This API should be used to refresh the contents of the PropertyPane.
     *
     * @remarks
     * This API is called at the end of the web part lifecycle on a page. It should be used to dispose any local
     * resources (i.e. DOM elements) that the web part is holding onto. This API is expected to be called in scenarios
     * like page navigation i.e. the host is transitioning from one page to another and disposes the page that is being
     * transitioned out.
     */
    BaseWebPart.prototype.onDispose = function () {
        /* EMPTY BLOCK */
    };
    /**
     * This API is invoked after updating the new value of the property in the property bag when the PropertyPane
     * is being used in Reactive mode.
     *
     * @param propertyPath - JSON path of the property in the property bag.
     *  In the case of custom field, if no target property is provided then a custom value is assigned,
     *  which will be in the form of `__CustomField_<key provided when the custom field is created>`.
     * @param oldValue - Old value of the property.
     *  This value could be undefined/empty in the case of custom field.
     * @param newValue - New value of the property.
     *  This value could be undefined/empty in the case of custom field.
     */
    BaseWebPart.prototype.onPropertyPaneFieldChanged = function (propertyPath, oldValue, newValue) {
        /* EMPTY BLOCK */
    };
    /**
     * This event method is invoked when the configuration starts on the PropertyPane.
     *
     * @remarks
     * This event method is invoked in the following cases:
     *
     *  - When the PropertyPane is opened.
     *
     *  - When the user switches web parts then the new web part gets this event.
     */
    BaseWebPart.prototype.onPropertyPaneConfigurationStart = function () {
        /* EMPTY BLOCK */
    };
    /**
     * This API is invoked when the configuration is completed on the PropertyPane.
     *
     * @remarks
     * This event method is invoked in the following cases:
     *
     *  - When the CONFIGURATION_COMPLETE_TIMEOUT((currently the value is 5 secs) elapses after the last change.
     *
     *  - When user clicks the "X" (close) button before the CONFIGURATION_COMPLETE_TIMEOUT elapses.
     *
     *  - When user clicks the 'Apply' button before the CONFIGURATION_COMPLETE_TIMEOUT elapses.
     *
     *  - When the user switches web parts then the current web part gets this event.
     */
    BaseWebPart.prototype.onPropertyPaneConfigurationComplete = function () {
        /* EMPTY BLOCK */
    };
    /**
     * This API is invoked after the changes made on the PropertyPane are applied when the PropertyPane is used in
     * Non-Reactive mode. This API is not invoked when the PropertyPane is used in Reactive mode.
     */
    BaseWebPart.prototype.onAfterPropertyPaneChangesApplied = function () {
        /* EMPTY BLOCK */
    };
    /**
     * This API is invoked when the PropertyPane is rendered.
     *
     * @privateRemarks
     * From framework standpoint, we do not want to allow this event handler to be passed in, and trigger it.
     * This api should be deprecated and then removed as part of refactoring.
     */
    BaseWebPart.prototype.onPropertyPaneRendered = function () {
        /* EMPTY BLOCK */
    };
    /**
     * This API is invoked after properties are updated by sources other than the property pane or the web part host.
     *
     * @alpha
     * @param prevProperties - The web part properties before the update.
     */
    BaseWebPart.prototype.onAfterPropertiesUpdatedExternally = function (prevProperties) {
        return this._refresh();
    };
    /**
     * @internal
     */
    BaseWebPart.prototype._internalGetData = function () {
        return this._emptyResolvedPromise;
    };
    /**
     * Gets default accessible title in the format `"<Web part name> web part"`, such as "Image web part".
     * Note: pulled into own method because TypeScript doesn't allow derived classes to call super protected properties.
     *
     * @internal
     */
    BaseWebPart.prototype._getDefaultAccessibleTitle = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].GenericAccessibleLabelTemplate, this.title);
    };
    /**
     * This method consumes the properties object from the serialized data and re-applies
     * the field values from the serverProcessedContent. This process will result in the
     * properties bag as it was when the serialization happened.
     */
    /* tslint:disable:no-any */
    BaseWebPart.prototype._reInstateServerProcessedData = function (deserializedProperties, serverProcessedContent) {
        /* tslint:enable:no-any */
        var _this = this;
        if (!deserializedProperties) {
            return {};
        }
        /* tslint:disable-next-line:no-any */
        var fixedProperties = deserializedProperties;
        if (!this._renderedFromPersistedData) {
            return fixedProperties;
        }
        // @privateRemarks Clear out the properties with isHtmlString metadata for security reasons. We only want to
        // propagate values from the serverProcessed content as they are security sanitized by the server. Note, there is a
        // scenario when an end user can update the list item with whatever data they like. In that case, they can
        // eliminate the serverProcessed content and that can cause a potential security hole. Hence, we always want
        // clear out the property values that have isHtmlString metadata.
        this._forEachPropertyWithMetaData(function (propPath, metadata) {
            // This is a temporary hack to make sure that the webparts published using the Mobile app keep rendering.
            // Currently, for those pages, the DocumentEmbedWebPart does not have HTMLProperties pupulated. Hence,
            // we are doing this work around to not unset the property bag.
            // (SPPPLAT VSO#289988) tracks removal of this code.
            if (_this.context.manifest.id !== 'b7dd04e1-19ce-4b24-9132-b60a1c2b910d'
                && metadata.isHtmlString) {
                _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["set"](fixedProperties, propPath, undefined);
            }
        }, fixedProperties);
        if (serverProcessedContent) {
            // Re-instate the server processed values in the specified path in the property bag.
            // There is a change that the new shape of the property bag is different. But the
            // the purpose of the inbuilt deserialization is to provide the same properties object
            // back to the web part that has the same shape as when the serialization happened.
            var htmlMaps = [
                serverProcessedContent.htmlStrings,
                serverProcessedContent.searchablePlainTexts,
                serverProcessedContent.imageSources,
                serverProcessedContent.links,
                serverProcessedContent.componentDependencies
            ];
            for (var _i = 0, htmlMaps_1 = htmlMaps; _i < htmlMaps_1.length; _i++) {
                var htmlMap = htmlMaps_1[_i];
                if (htmlMap) {
                    for (var propPath in htmlMap) { /* tslint:disable-line:forin */
                        // WARNING: This is critical code. Please do not modify without fully understanding the data pipeline
                        var value = htmlMap[propPath];
                        if (typeof value === 'string') {
                            _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["set"](fixedProperties, propPath, value);
                        }
                    }
                }
            }
        }
        return fixedProperties;
    };
    /**
     * Iterates and validates each metadata property before calling metadata processor.
     *
     * @param metadataProcessor - Callback handler to to process validated metadata.
     * @param properties - Optional Properies to process instead of default this.properties
     * @param iteration - Current iteration in case path is being iterated based on wildcard *
     */
    BaseWebPart.prototype._forEachPropertyWithMetaData = function (metadataProcessor, properties /* tslint:disable-line:no-any */) {
        if (this.propertiesMetadata) {
            var _loop_1 = function (propPath) {
                var metadata = this_1.propertiesMetadata[propPath];
                this_1._validateAndIteratePath(propPath, properties || this_1.properties, function (fixedPropPath, index) {
                    metadataProcessor(fixedPropPath, metadata, index);
                });
            };
            var this_1 = this;
            for (var propPath in this.propertiesMetadata) {
                _loop_1(propPath);
            }
        }
    };
    /**
     * Validates path and iterate over one or multiple wildcard paths
     *
     * @param propPath - Original property path provided in metadata
     * @param properties - Properties to look for the given path.
     * @param propertyPathHandler - Handler to process validated and fixed path
     */
    BaseWebPart.prototype._validateAndIteratePath = function (propPath, properties, /* tslint:disable-line:no-any */ propertyPathHandler) {
        var wildcardCount = (propPath.match(/\*/g) || []).length;
        if (wildcardCount > 1) {
            // Skip if there are more than one asterisks in the path (not supported)
            console.warn("Invalid property path: Multiple wildcards are not supported in property paths.\nEntry with path '" + propPath + "' got ignored in the properties metadata.");
            return;
        }
        else if (wildcardCount === 1) {
            var index = propPath.indexOf('[*]');
            if (index < -1) {
                console.warn("Invalid property path: Wildcards are only supported inside brackets to select array\nindices as in 'foo[*].bar'. Entry with path '" + propPath + "' got ignored in the properties metadata.");
                // Skip if the wildcard is not used for an array (not supported)
                return;
            }
            else {
                // Handle the array wildcard by generating each individual property path
                var arrayPath = propPath.substr(0, index);
                /* tslint:disable-next-line:no-any */
                var arrayInstance = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["get"](properties, arrayPath);
                if (!arrayInstance) {
                    console.warn("Invalid property path: Could not find an array named '" + arrayPath + "' in the properties.\nEntry with path '" + propPath + "' got ignored in the properties metadata.");
                    return;
                }
                else {
                    for (var i = 0; i < arrayInstance.length; i++) {
                        var fixedPropPath = propPath.replace('*', "" + i);
                        propertyPathHandler(fixedPropPath, i);
                    }
                }
            }
        }
        else {
            propertyPathHandler(propPath);
        }
    };
    /**
     * Iterates and validates each custom property path before calling custom metadata processor.
     *
     * @param metadata - Web part property metadata containing.
     * @param iteration - Current iteration in case path is being iterated based on wildcard *
     * @param customMetadataProcessor - Responsible for processing custom metadata properties.
     */
    BaseWebPart.prototype._foreachCustomMetadata = function (metadata, iteration, customMetadataProcessor, properties /* tslint:disable-line:no-any */) {
        if (metadata && metadata.customMetadata) {
            var _loop_2 = function (propName) {
                var propPath = metadata.customMetadata[propName];
                if (iteration !== undefined && propPath.indexOf('*') !== -1) {
                    // Custom metadata should be resolved with current iteration of wildcard
                    propPath = propPath.replace('*', iteration.toString());
                }
                this_2._validateAndIteratePath(propPath, properties || this_2.properties, function (fixedPropPath, customIteration) {
                    // Custom metadata should be resolved without iteration
                    if (customIteration === undefined && metadata.customMetadata) {
                        customMetadataProcessor(fixedPropPath, propName);
                    }
                });
            };
            var this_2 = this;
            for (var propName in metadata.customMetadata) {
                _loop_2(propName);
            }
        }
    };
    /**
     * Operations to be done after the property bag is updated.
     *
     * @param shouldRefresh - Indicating whether web part needs to be shouldRefresh or not.
     */
    BaseWebPart.prototype._afterPropertyUpdated = function (shouldRefresh) {
        this._internalSetDirtyBit();
        if (shouldRefresh) {
            this._refresh();
        }
    };
    /**
     * Fixes up a property pane configuration to use dynamic data. This happens in-place.
     * The fix-up consists on adding the necessary hooks to the web part that are required,
     * like the dynamic data provider, the render function and the object it refers to.
     *
     * @param configuration - Property pane configuration to fix up.
     */
    BaseWebPart.prototype._fixUpDynamicDataConfiguration = function (configuration) {
        var _this = this;
        configuration.pages.forEach(function (page) {
            page.groups.forEach(function (group) {
                // Checking if the group is PropertyPaneConditionalGroup, if yes then extracting
                // the required group from it.
                if ('primaryGroup' in group) {
                    var _a = group, primaryGroup = _a.primaryGroup, secondaryGroup = _a.secondaryGroup, showSecondaryGroup = _a.showSecondaryGroup;
                    group = showSecondaryGroup ? secondaryGroup : primaryGroup;
                }
                group = group;
                group.groupFields.forEach(function (field) {
                    if (field.type === _SPPropertyPane__WEBPACK_IMPORTED_MODULE_9__["PropertyPaneFieldType"].DynamicTextField) {
                        var props = field.properties;
                        props.dynamicDataProvider = _this.context.dynamicDataProvider;
                        props.changeCallback = (function () { _this._dynamicPropertyRefresh(); }).bind(_this);
                    }
                });
            });
        });
    };
    /**
     * The serializer for the exposed part of the web part data
     *
     * @privateRemarks
     * This serialize API is a public candidate for post-GA (after removing the input parameter)
     */
    BaseWebPart.prototype._serialize = function () {
        var _this = this;
        var serverProcessedContent = {
            htmlStrings: {},
            searchablePlainTexts: {},
            imageSources: {},
            links: {}
        };
        // Since we will end up mutating the property bag during serialization, we need to clone it.
        var properties = this._cloneProperties(this.persistedProperties);
        this._forEachPropertyWithMetaData(function (propPath, metadata, iteration) {
            // Remove fields with shouldNotPersist metadata
            if (metadata.shouldNotPersist) {
                _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["set"](properties, propPath, undefined);
            }
            // Use the property path as the key in server-processed content maps
            var key = propPath;
            // WARNING: This is critical code. Please do not modify without fully understanding the data pipeline
            var value = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["get"](properties, propPath);
            // Skip if the property is non-string or undefined
            if (serverProcessedContent && typeof value === 'string' && value !== undefined) {
                if (serverProcessedContent.htmlStrings && metadata.isHtmlString) {
                    serverProcessedContent.htmlStrings[key] = value;
                }
                else if (serverProcessedContent.searchablePlainTexts && metadata.isSearchablePlainText) {
                    serverProcessedContent.searchablePlainTexts[key] = value;
                }
                else if (serverProcessedContent.links && metadata.isLink) {
                    serverProcessedContent.links[key] = value;
                }
                else if (serverProcessedContent.imageSources && metadata.isImageSource) {
                    serverProcessedContent.imageSources[key] = value;
                }
                else if (metadata.isComponentDependency) {
                    if (!serverProcessedContent.componentDependencies) {
                        serverProcessedContent.componentDependencies = {};
                    }
                    serverProcessedContent.componentDependencies[key] = value;
                }
                if (metadata.customMetadata) {
                    _this._internalSerializeCustomMetadata(key, metadata, properties, serverProcessedContent, iteration);
                }
                // Unset the extracted property to avoid duplication
                _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["set"](properties, propPath, undefined);
            }
        });
        return {
            dataVersion: this.dataVersion,
            properties: properties,
            serverProcessedContent: serverProcessedContent
        };
    };
    /**
     * Serialize custom metadata as specified by web part
     *
     * @param propertyPath - Property path used as key of the serialized custom metadata
     * @param metadata - Web part property metadata
     * @param properties - Web part persisted properties
     * @param serverProcessedContent - Server processed data's custom metadata is updated
     * @param iteration - Current iteration in case path is being iterated based on wildcard *
     */
    BaseWebPart.prototype._internalSerializeCustomMetadata = function (propertyPath, metadata, properties, serverProcessedContent, iteration) {
        // Build custom metadata for the given property path
        var customMetadata = {};
        this._foreachCustomMetadata(metadata, iteration, function (customPropertyPath, customPropertyName) {
            var customValue = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["get"](properties, customPropertyPath);
            if (serverProcessedContent && customValue !== undefined) {
                // Insert custom metadata key and value
                customMetadata[customPropertyName] = customValue;
            }
        });
        if (!serverProcessedContent.customMetadata) {
            serverProcessedContent.customMetadata = {};
        }
        // Store serialized custom metadata for the given the property path.
        serverProcessedContent.customMetadata[propertyPath] = customMetadata;
    };
    /**
     * This function serializes the Dynamic Data objects from the web part properties into the serialized web part data.
     *
     * If there is a property "myDynamicProperty" in the property bag that points to `"PageContext:user"`,
     * the serialized data is updated as the following:
     * ```
     * serializedData = {
     *   dynamicDataPaths: {
     *     "myDynamicProperty": "PageContext:user"
     *   }
     * }
     * ```
     */
    BaseWebPart.prototype._serializeDynamicData = function (serializedData) {
        var props = serializedData.properties;
        var dynamicDataPaths = {};
        var dynamicDataValues = {}; // tslint:disable-line:no-any
        var key = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["findKey"](props, { __type: _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"]._TYPE_NAME });
        while (key) {
            var dynamicDataReference = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["get"](props, key + '.reference');
            var dynamicDataValue = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["get"](props, key + '.value');
            if (dynamicDataReference) {
                dynamicDataPaths[key] = dynamicDataReference;
                _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["unset"](props, key);
            }
            else if (dynamicDataValue !== undefined) {
                // Explicitly checking for 'undefined' because, empty string is a valid dynamicDataValue.
                dynamicDataValues[key] = dynamicDataValue;
                _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["unset"](props, key);
            }
            else {
                throw new Error('Dynamic Data is misconfigured');
            }
            key = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["findKey"](props, { __type: _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"]._TYPE_NAME });
        }
        serializedData.dynamicDataPaths = dynamicDataPaths;
        serializedData.dynamicDataValues = dynamicDataValues;
    };
    /**
     * This function deserializes the Dynamic Data objects from serialized web part data into web part properties.
     *
     * If the serializedData has a "dynamicDataPaths" or "dynamicDataValues" property,
     * it creates DynamicData objects for it.
     *
     * Example:
     * ```
     * serializedData = {
     *   dynamicDataPaths: {
     *     "myDynamicProperty": "PageContext:user"
     *   }
     * }
     * ```
     *
     * This will create a property "myDynamicProperty" in the web parts properties, with a new DynamicData object that
     * points at "PageContext:user"
     */
    BaseWebPart.prototype._deserializeDynamicData = function (data) {
        var _this = this;
        if (data.dynamicDataPaths) {
            for (var path in data.dynamicDataPaths) {
                if (data.dynamicDataPaths.hasOwnProperty(path)) {
                    var dynamicProperty = new _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"](// tslint:disable-line:no-any
                    this.context.dynamicDataProvider, (function () { _this._dynamicPropertyRefresh(); }).bind(this));
                    dynamicProperty.setReference(data.dynamicDataPaths[path]);
                    _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["set"](data.properties, path, dynamicProperty);
                }
            }
        }
        if (data.dynamicDataValues) {
            for (var path in data.dynamicDataValues) {
                if (data.dynamicDataValues.hasOwnProperty(path)) {
                    var dynamicProperty = new _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"](// tslint:disable-line:no-any
                    this.context.dynamicDataProvider, (function () { _this._dynamicPropertyRefresh(); }).bind(this));
                    dynamicProperty.setValue(data.dynamicDataValues[path]);
                    _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["set"](data.properties, path, dynamicProperty);
                }
            }
        }
    };
    /**
     * For each property in the serialized properties of the web part, we check if the property is declared
     * as dynamicProperty in the properties metadata of the web part.
     *  - If yes, then we check
     *    - if the value of it is an instance of DynamicProperty
     *      - If No, then we create and assign a DynamicProperty with the type given specified in the
     *        'dynamicPropertyType' property
     *      - else, it's a no-op.
     *  - If no, then it's a no-op
     *
     * While creating the DynamicProperty, we use the pre-configured value associated with that property from
     * the web part's property bag as the default value.
     * @param deSerializedProperties - deserialized properties of the web part.
     */
    BaseWebPart.prototype._initializeDynamicPropertiesIfRequired = function (deSerializedProperties) {
        var _this = this;
        var defaultDynamicPropertyValues = new Map([
            ['boolean', false],
            ['number', 0],
            ['string', ''],
            ['array', []],
            ['object', {}]
        ]);
        this._forEachPropertyWithMetaData(function (propPath, metadata) {
            if (metadata.dynamicPropertyType) {
                var propValue = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["get"](deSerializedProperties, propPath); /* tslint:disable-line:no-any */
                if (!(propValue instanceof _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"])) {
                    var dynamicProperty = void 0; /* tslint:disable-line:no-any */
                    switch (metadata.dynamicPropertyType) {
                        case 'boolean':
                            dynamicProperty = new _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"](_this.context.dynamicDataProvider, (function () { _this._dynamicPropertyRefresh(); }).bind(_this));
                            break;
                        case 'number':
                            dynamicProperty = new _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"](_this.context.dynamicDataProvider, (function () { _this._dynamicPropertyRefresh(); }).bind(_this));
                            break;
                        case 'string':
                            dynamicProperty = new _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"](_this.context.dynamicDataProvider, (function () { _this._dynamicPropertyRefresh(); }).bind(_this));
                            break;
                        case 'array':
                            dynamicProperty = new _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"](_this.context.dynamicDataProvider, (function () { _this._dynamicPropertyRefresh(); }).bind(_this));
                            break;
                        case 'object':
                            dynamicProperty = new _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"](_this.context.dynamicDataProvider, (function () { _this._dynamicPropertyRefresh(); }).bind(_this));
                            break;
                        default:
                            dynamicProperty = new _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"](/* tslint:disable-line:no-any */ _this.context.dynamicDataProvider, (function () { _this._dynamicPropertyRefresh(); }).bind(_this));
                            break;
                    }
                    if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_8__["default"].isDynamicDataDesrializationKSActivated()) {
                        propValue = propValue || defaultDynamicPropertyValues.get(metadata.dynamicPropertyType);
                    }
                    dynamicProperty.setValue(propValue);
                    _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["set"](deSerializedProperties, propPath, dynamicProperty);
                }
            }
        }, deSerializedProperties);
    };
    /**
     * Disposing the dynamic properties, for those which are declared as dynamic properties.
     *
     * @privateRemarks
     * We are disposing only the declared dynamic properties because we created them on behalf of
     * the web part and hence it is our responsiblity to clean them.
     */
    BaseWebPart.prototype._disposeDynamicPropertiesIfRequired = function () {
        var _this = this;
        this._forEachPropertyWithMetaData(function (propPath, metadata) {
            if (metadata.dynamicPropertyType) {
                var propValue = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["get"](_this.persistedProperties, propPath); /* tslint:disable-line:no-any */
                if (propValue instanceof _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"]) {
                    propValue.dispose();
                }
            }
        }, this.persistedProperties);
    };
    /**
     * Update the web part property if it is in the property bag.
     *
     * @param propertyPath - property path as expected by lodash update (https://lodash.com/docs#update).
     *   (e.g. 'o.a.b', 'o[0].a.b[1].c'). These paths are similar to those in the JSONPath spec described by
     *   Stefan Goessner at (http://goessner.net/articles/JsonPath/). Currently we plan to use lodash.get, has
     *   and update APIs which support paths. Some day we may migrate to using actual JSONPath.js. But that
     *   should not be an issue because the path formatting conventions are same in lodash and JSONPath.
     * @param newValue - new value entered by the user for the associated target property
     */
    BaseWebPart.prototype._updateProperty = function (propertyPath, newValue) {
        // should we check if this is a valid property path. For now maybe not.
        _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["update"](this.properties, propertyPath, function () { return newValue; });
    };
    /**
     * Using 'cloneDeepWith' because the web part properties bag will now serialize the
     * dynamic properties as well. One of the building blocks of these properties are dataProviders,
     * which when serialized will result in 'Maximum call stack size exceeded' based on what kind of
     * sources they hold references to.
     * Hence using cloneDeepWith, which lets us handle the special cases and in this case if the property
     * in question is a 'DynamicProperty' and we call '_cloneDeep' api on the dynamicProperty.
     */
    BaseWebPart.prototype._cloneProperties = function (propertiesToClone) {
        return _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["cloneDeepWith"](propertiesToClone, function (prop) {
            if (prop instanceof _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicProperty"]) {
                return prop._cloneDeep(prop); // tslint:disable-line:no-any
            }
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "previewImageUrl", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "propertiesMetadata", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "disableReactivePropertyChanges", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "accessibleTitle", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "onInit", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "onDisplayModeChanged", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "onBeforeSerialize", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "onAfterDeserialize", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "loadPropertyPaneResources", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "getPropertyPaneConfiguration", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "getDetailsPaneConfiguration", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "onDispose", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "onPropertyPaneFieldChanged", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "onPropertyPaneConfigurationStart", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "onPropertyPaneConfigurationComplete", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "onAfterPropertyPaneChangesApplied", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "onPropertyPaneRendered", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["virtual"]
    ], BaseWebPart.prototype, "onAfterPropertiesUpdatedExternally", null);
    return BaseWebPart;
}(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (BaseWebPart);


/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "UhTv":
/*!**********************************!*\
  !*** ./lib/core/ErrorMessage.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_cswp_base_module_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/cswp-base.module.scss */ "vGCF");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 */

/**
 * The error component used for rendering webpart errors.
 */
var ErrorMessage = /** @class */ (function () {
    function ErrorMessage(props) {
        this._props = props;
    }
    ErrorMessage.prototype.render = function () {
        var container = document.createElement('div');
        container.className = _styles_cswp_base_module_scss__WEBPACK_IMPORTED_MODULE_0__["default"].errorBox;
        container.setAttribute('role', 'alert');
        container.setAttribute('aria-live', 'assertive');
        var errorMessage = document.createElement('span');
        errorMessage.className = _styles_cswp_base_module_scss__WEBPACK_IMPORTED_MODULE_0__["default"].errorBoxText;
        errorMessage.innerText = this._props.errorMessage;
        container.appendChild(errorMessage);
        return container;
    };
    return ErrorMessage;
}());
/* harmony default export */ __webpack_exports__["default"] = (ErrorMessage);


/***/ }),

/***/ "VuYt":
/*!************************************************************!*\
  !*** ./lib/core/loaders/IframedWebPartControllerLoader.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IframedWebPartControllerLoader; });
/**
 * Async loader for the full size web part layout
 * @internal
 */
function IframedWebPartControllerLoader() {
    return __webpack_require__.e(/*! import() | sp-webpart-base-iframedwebpartcontroller */ "sp-webpart-base-iframedwebpartcontroller").then(__webpack_require__.bind(null, /*! ./../../chunks/IframedWebPartController/IframedWebPartController */ "CL8W")).then(function (iframedWebPartControllerModule) { return iframedWebPartControllerModule.default; });
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

/***/ "a39N":
/*!******************************************!*\
  !*** ./lib/core/FriendlyErrorMessage.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loc/Strings.resx */ "LHST");
/* harmony import */ var _styles_cswp_base_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/cswp-base.module.scss */ "vGCF");
/* harmony import */ var _ErrorMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ErrorMessage */ "UhTv");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 */



/**
 * The error friendly component used for rendering webpart errors.
 */
var FriendlyErrorMessage = /** @class */ (function () {
    function FriendlyErrorMessage(props) {
        this._toggleExpandedDetails = this._toggleExpandedDetails.bind(this);
        this._errorMessage = new _ErrorMessage__WEBPACK_IMPORTED_MODULE_2__["default"](props).render();
        this._errorMessage.style.display = 'none';
    }
    FriendlyErrorMessage.prototype.render = function () {
        // Create container element and append children components
        var container = document.createElement('div');
        container.className = _styles_cswp_base_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].errorBox;
        // Header text
        var headerContainer = document.createElement('div');
        var header = document.createElement('h2');
        header.className = _styles_cswp_base_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].somethingWentWrongText;
        header.innerText = _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].WebpartErrorSomethingWentWrong;
        headerContainer.appendChild(header);
        container.appendChild(header);
        // Supporting text
        var siteAdminText = document.createElement('span');
        siteAdminText.className = _styles_cswp_base_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].siteAdminText;
        siteAdminText.innerText = _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].WebpartErrorSiteAdminAdvice;
        container.appendChild(siteAdminText);
        // Button to reveal more details
        var buttonContainer = document.createElement('div');
        var techDetailsButton = document.createElement('button');
        techDetailsButton.className = _styles_cswp_base_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].detailsButton;
        techDetailsButton.innerText = _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].WebpartErrorTechnicalDetails;
        techDetailsButton.onclick = this._toggleExpandedDetails;
        buttonContainer.appendChild(techDetailsButton);
        container.appendChild(buttonContainer);
        // Detailed information that is initially hiddren. Display is toggled with button above.
        container.appendChild(this._errorMessage);
        return container;
    };
    FriendlyErrorMessage.prototype._toggleExpandedDetails = function () {
        if (this._errorMessage.style.display === 'none') {
            this._errorMessage.style.display = '';
        }
        else {
            this._errorMessage.style.display = 'none';
        }
    };
    return FriendlyErrorMessage;
}());
/* harmony default export */ __webpack_exports__["default"] = (FriendlyErrorMessage);


/***/ }),

/***/ "aOlN":
/*!*****************************************************!*\
  !*** ./lib/core/ClientSideWebPartStatusRenderer.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-component-base */ "7Awa");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loc/Strings.resx */ "LHST");
/* harmony import */ var _ErrorMessage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ErrorMessage */ "UhTv");
/* harmony import */ var _FriendlyErrorMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FriendlyErrorMessage */ "a39N");
/* harmony import */ var _classicPages_ClassicPageUtils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./classicPages/ClassicPageUtils */ "FbpR");
/* harmony import */ var _SpinnerFactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SpinnerFactory */ "+MWs");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../common/Flights */ "w4+A");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */













/**
 * This class provides the default implementation for displaying loading indicator and error messages
 * for web parts. The web part host can decide to provide custom implementation of how web parts display
 * loading indicators and error messages.
 *
 * @internal
 */
var ClientSideWebPartStatusRenderer = /** @class */ (function () {
    function ClientSideWebPartStatusRenderer() {
        this._errorId = 'cswp-error';
        this._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_LogSource"].create('ClientSideWebPartStatusRenderer');
        this._activeIndicatorCache = new Map();
    }
    ClientSideWebPartStatusRenderer_1 = ClientSideWebPartStatusRenderer;
    /**
     * Returns additional time out before showing the spinner
     *
     * loadingDelayed - Time when asked Viewport loader to check and load web part post module load.
     * inViewportLoaded - Time when web part was allowed to load by viewport loader.
     *
     * 1. If both loadingDelayed and inViewportLoaded are defined return the ViewportWait,
     *    difference between them would reflect total time in the waiting queue
     *    (i.e, inViewportLoaded - loadingDelayed).
     * 2. If only loadingDelayed is defined (i.e, the rendering of the webpart is still in the queue)
     *    return a timeout of 500ms.
     * 3. If both loadingDelayed and inViewportLoaded are undefined return 0 (i.e, let the things be as they are).
     *
     * @param webPartTag - event identifier used in written telemetry data for first party web
     * parts, e.g., 'WebPart.NewsWebPart.8dd9dec2-c6b3-4d4a-819e-2a5431e901f2'.
     */
    ClientSideWebPartStatusRenderer._getAdditionalTimeOut = function (webPartTag) {
        var loadingDelayed = _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__["_PerformanceLogger"].readComponentBreakdown(webPartTag, 'loadingDelayed');
        var inViewportLoaded = _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__["_PerformanceLogger"].readComponentBreakdown(webPartTag, 'inViewPortLoading');
        var timeout = 0;
        if (loadingDelayed && inViewportLoaded) {
            timeout = inViewportLoaded - loadingDelayed;
        }
        else if (loadingDelayed) {
            timeout = 500;
        }
        else {
            timeout = 0;
        }
        return timeout;
    };
    /**
      * Display a loading spinner.
      *
      * @param domElement - the web part container div.
      * @param loadingMessage - the message to be displayed when the loading spinner id displayed.
      * @param timeout - (optional) timeout to render the loading indicator. Default is 1500ms.
      *
      * @privateRemarks
      * First-party web parts should use _displayLoadingIndicator to log perf data.
      */
    ClientSideWebPartStatusRenderer.prototype.displayLoadingIndicator = function (domElement, loadingMessage, timeout) {
        this._createLoadingIndicator(domElement, loadingMessage, timeout);
    };
    /**
     * Display a loading indicator.
     *
     * @param domElement - the web part container div.
     * @param loadingMessage - the message to be displayed when the loading indicator id displayed.
     * @param performanceLogEventName - event identifier used in written telemetry data for first party web
     * parts, e.g., 'WebPart.NewsWebPart.8dd9dec2-c6b3-4d4a-819e-2a5431e901f2'.
     * @param isInternal - flag to indicate if web part is internal or external.
     * @param timeout - (optional) timeout to render the loading indicator. Default is 1500ms.
     *
     * @internal
     */
    ClientSideWebPartStatusRenderer.prototype._displayLoadingIndicator = function (domElement, loadingMessage, performanceLogEventName, reservedHeight, isInternal, timeout) {
        this._createLoadingIndicator(domElement, loadingMessage, reservedHeight, timeout, performanceLogEventName, isInternal);
    };
    /**
     * Clear the loading indicator.
     *
     * @param domElement - the web part container div.
     */
    ClientSideWebPartStatusRenderer.prototype.clearLoadingIndicator = function (domElement) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["Validate"].isNotNullOrUndefined(domElement, 'domElement');
        if (this._activeIndicatorCache.has(domElement)) {
            var cacheEntry = this._getCacheEntry(domElement);
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_TraceLogger"].logVerbose(this._logSource, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].ClearLoadingIndicator);
            if (cacheEntry.loadingTimer) {
                window.clearTimeout(cacheEntry.loadingTimer);
            }
            if (cacheEntry.placeholder) {
                // This is needed because some web parts (e.g. Yammer web part) render within the onInit() phase
                if (cacheEntry.placeholder.parentElement) {
                    cacheEntry.placeholder.parentElement.removeChild(cacheEntry.placeholder);
                }
            }
            this._activeIndicatorCache.delete(domElement);
        }
    };
    /**
     * Render the provided error message in the web part container div.
     * @param domElement - the web part container div.
     * @param error - the error message.
     */
    ClientSideWebPartStatusRenderer.prototype.renderError = function (domElement, error) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["Validate"].isNotNullOrUndefined(domElement, 'domElement');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["Validate"].isNotNullOrUndefined(error, 'error');
        var errorText = '';
        if (error instanceof _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["SPError"]) {
            errorText = error.toStringForUI();
        }
        else {
            var vanillaError = error;
            var stack = vanillaError.stack;
            var newLineSeparator = '\r\n';
            var callStack = stack ? _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].WebpartErrorCallStackText, newLineSeparator, stack) : '';
            errorText = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].WebpartErrorErrorText, newLineSeparator, "" + (vanillaError.message || error), callStack);
        }
        var cacheEntry = this._getCacheEntry(domElement);
        cacheEntry.isErrorBeingRendered = true;
        var errorComponent;
        if (false) {}
        else {
            errorComponent = new _ErrorMessage__WEBPACK_IMPORTED_MODULE_7__["default"]({ errorMessage: errorText }).render();
        }
        var divErr = domElement.querySelector("div[data-sp-id='" + this._errorId + "']");
        if (divErr) {
            divErr.style.display = 'block';
        }
        else {
            divErr = document.createElement('div');
            divErr.setAttribute('data-sp-id', this._errorId);
            this._clearChildren(domElement);
            domElement.appendChild(divErr);
            _classicPages_ClassicPageUtils__WEBPACK_IMPORTED_MODULE_9__["default"].disableAutomaticPostbacks(domElement, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["Environment"].type);
        }
        // clearError removes the data-automation-id
        divErr.setAttribute('data-automation-id', 'webPartError');
        divErr.innerHTML = '';
        divErr.appendChild(errorComponent);
    };
    /**
     * Clear the web part error message.
     * @param domElement - the web part container div.
     */
    ClientSideWebPartStatusRenderer.prototype.clearError = function (domElement) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["Validate"].isNotNullOrUndefined(domElement, 'domElement');
        if (!this._activeIndicatorCache.has(domElement)) {
            return;
        }
        var cacheEntry = this._activeIndicatorCache.get(domElement);
        if (cacheEntry && cacheEntry.isErrorBeingRendered) {
            cacheEntry.isErrorBeingRendered = false;
            var divErr = domElement.querySelector("div[data-sp-id='" + this._errorId + "']");
            if (divErr) {
                divErr.style.display = 'none';
                divErr.removeAttribute('data-automation-id');
            }
        }
    };
    ClientSideWebPartStatusRenderer.prototype._createLoadingIndicator = function (domElement, loadingMessage, reservedHeight, timeout, performanceLogEventName, isInternal) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["Validate"].isNotNullOrUndefined(domElement, 'domElement');
        if (!timeout || (timeout && isNaN(timeout))) {
            timeout = 1500; // milliseconds
        }
        // In most cases, we do not want to display the loading indicator immediately. We want to delay the
        // display of loading indicator to the point when the user will start noticing the slowness in the UI.
        var cacheEntry = this._getCacheEntry(domElement);
        // Clear if any earlier loading timer
        if (cacheEntry.loadingTimer) {
            window.clearTimeout(cacheEntry.loadingTimer);
        }
        if (!_common_Flights__WEBPACK_IMPORTED_MODULE_11__["Flights"].isLoadIndicatorOnDemandEnabled()) {
            // Start loading indicator without displaying. This placeholder will help InViewportLoader to approximate
            // how many web part to load at start
            this._renderLoadingIndicator(domElement, loadingMessage, reservedHeight, false, performanceLogEventName);
        }
        cacheEntry.loadingTimer = window.setTimeout(function () {
            if (performanceLogEventName && isInternal) {
                var additionalTimeOut = ClientSideWebPartStatusRenderer_1._getAdditionalTimeOut(performanceLogEventName);
                cacheEntry.loadingTimer = window.setTimeout(function () {
                    _this._showLoadingIndicator(domElement, loadingMessage, reservedHeight, performanceLogEventName, isInternal);
                }, additionalTimeOut);
            }
            else {
                _this._showLoadingIndicator(domElement, loadingMessage, reservedHeight, performanceLogEventName, isInternal);
            }
        }, timeout);
    };
    /**
     * Show the loading indicator
     *
     * @param domElement - the web part container div.
     * @param loadingMessage - the message to be displayed when the loading Indicator id displayed.
     * @param performanceLogEventName - event identifier used in written telemetry data for first party web
     * parts, e.g., 'WebPart.NewsWebPart.8dd9dec2-c6b3-4d4a-819e-2a5431e901f2'.
     */
    ClientSideWebPartStatusRenderer.prototype._showLoadingIndicator = function (domElement, loadingMessage, reservedHeight, performanceLogEventName, isInternal) {
        if (performanceLogEventName && isInternal) {
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__["_PerformanceLogger"].markComponent(performanceLogEventName, 'displaySpinner');
        }
        // This would set style of the loading Indicator and display it.
        this._renderLoadingIndicator(domElement, loadingMessage, reservedHeight, true, // remove this while graduating Flights.isLoadIndicatorOnDemandEnabled()
        performanceLogEventName);
    };
    ClientSideWebPartStatusRenderer.prototype._renderLoadingIndicator = function (domElement, loadingMessage, reservedHeight, showLoadingIndicator, // remove this while graduating Flights.isLoadIndicatorOnDemandEnabled()
    performanceLogEventName) {
        if (!this._activeIndicatorCache.has(domElement)) {
            return;
        }
        var cacheEntry = this._getCacheEntry(domElement);
        // Error is being rendered, don't render loading indicator
        if (cacheEntry.isErrorBeingRendered) {
            return;
        }
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_TraceLogger"].logVerbose(this._logSource, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].DisplayLoadingIndicator);
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_11__["Flights"].isLoadIndicatorOnDemandEnabled() ||
            !cacheEntry.placeholder) {
            cacheEntry.placeholder = this._createLoadingIndicatorElement(domElement, showLoadingIndicator, // remove this while graduating Flights.isLoadIndicatorOnDemandEnabled()
            loadingMessage, reservedHeight, performanceLogEventName);
        }
        else {
            if (!_common_Flights__WEBPACK_IMPORTED_MODULE_11__["Flights"].isLoadIndicatorOnDemandEnabled()) {
                cacheEntry.placeholder.style.display = showLoadingIndicator
                    ? 'block'
                    : 'none';
            }
        }
    };
    ClientSideWebPartStatusRenderer.prototype._getCacheEntry = function (domElement) {
        if (this._activeIndicatorCache.has(domElement)) {
            return this._activeIndicatorCache.get(domElement);
        }
        var cacheEntry = {
            loadingTimer: undefined,
            placeholder: undefined,
            isErrorBeingRendered: false
        };
        this._activeIndicatorCache.set(domElement, cacheEntry);
        return cacheEntry;
    };
    ClientSideWebPartStatusRenderer.prototype._createLoadingIndicatorElement = function (domElement, showLoadingIndicator, // remove this while graduating Flights.isLoadIndicatorOnDemandEnabled()
    loadingMessage, reservedHeight, performanceLogEventName) {
        this._clearChildren(domElement);
        var titleMessage = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].LoadingStatus, loadingMessage);
        var loadingIndicatorContainerDiv = performanceLogEventName
            ? _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_1__["_ShimmerFactory"].createShimmer(domElement.clientWidth, reservedHeight, performanceLogEventName, titleMessage)
            : this._createSpinnerElement(titleMessage, reservedHeight);
        // while graduating Flights.isLoadIndicatorOnDemandEnabled() just set
        // loadingIndicatorContainerDiv.style.display = 'block'
        loadingIndicatorContainerDiv.style.display =
            _common_Flights__WEBPACK_IMPORTED_MODULE_11__["Flights"].isLoadIndicatorOnDemandEnabled() || showLoadingIndicator
                ? 'block'
                : 'none';
        return domElement.appendChild(loadingIndicatorContainerDiv);
    };
    ClientSideWebPartStatusRenderer.prototype._createSpinnerElement = function (titleMessage, reservedHeight) {
        var spinnerElement = _SpinnerFactory__WEBPACK_IMPORTED_MODULE_10__["default"].createSpinner(titleMessage);
        if (reservedHeight !== undefined) {
            var parentElement = document.createElement('div');
            parentElement.style.maxHeight = reservedHeight + "px";
            parentElement.appendChild(spinnerElement);
            spinnerElement = parentElement;
        }
        return spinnerElement;
    };
    ClientSideWebPartStatusRenderer.prototype._clearChildren = function (element) {
        // We need to ensure that there are no child nodes. This works for all browsers.
        while (element.hasChildNodes()) {
            if (element.lastChild) {
                element.removeChild(element.lastChild);
            }
        }
    };
    var ClientSideWebPartStatusRenderer_1;
    ClientSideWebPartStatusRenderer = ClientSideWebPartStatusRenderer_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_2__["sealed"]
    ], ClientSideWebPartStatusRenderer);
    return ClientSideWebPartStatusRenderer;
}());
/* harmony default export */ __webpack_exports__["default"] = (ClientSideWebPartStatusRenderer);


/***/ }),

/***/ "bfIN":
/*!*****************************!*\
  !*** ./lib/utils/Object.js ***!
  \*****************************/
/*! exports provided: deepFreeze */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepFreeze", function() { return deepFreeze; });
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * Utililty code to help manipulate objects.
 */

/**
 * To make obj fully immutable, freeze each object in obj.
 * @remarks: this works only on pure JSON objects by design.
 * @param obj - object to freeze
 */
/* tslint:disable:export-name */
function deepFreeze(obj) {
    /* tslint:enable:export-name */
    if (!obj) {
        return undefined;
    }
    if (!Object.isFrozen(obj)) {
        Object.freeze(obj);
    }
    var depth = 0;
    var func = function (o) {
        // Do not go more than 5 level deep
        if (++depth > 5) {
            return;
        }
        var propNames = Object.getOwnPropertyNames(o);
        propNames.forEach(function (name) {
            var prop = o[name];
            if (typeof prop === 'object' && !!prop && !_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["isElement"](prop) && !Object.isFrozen(prop)) {
                func(prop);
            }
        });
    };
    func(obj);
    return obj;
}


/***/ }),

/***/ "evvI":
/*!*******************************************!*\
  !*** ./lib/core/BaseClientSideWebPart.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _BaseWebPart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BaseWebPart */ "Ti3B");
/* harmony import */ var _classicPages_ClassicPageUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./classicPages/ClassicPageUtils */ "FbpR");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../common/KillSwitches */ "+ORw");
/* harmony import */ var _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./error/SPWebPartError */ "ybLs");
/* harmony import */ var _ViewportLoader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ViewportLoader */ "u2P9");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./loc/Strings.resx */ "LHST");
/* harmony import */ var _styles_cswp_base_module_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./styles/cswp-base.module.scss */ "vGCF");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common/Flights */ "w4+A");
// Copyright (c) Microsoft. All rights reserved.













/**
 * This abstract class implements the the base functionality for a client-side web part. Every client-side web part
 * needs to inherit from this class.
 *
 * @remarks
 * Along with the base functionality, this class provides some APIs that can be
 * used by the web part. These APIs fall in two catagories.
 *
 * The first category of APIs provide data and functionality. Example, the web part context (i.e. this.context). This
 * API should be used to access contextual data relevant to this web part instance.
 *
 * The second category of APIs provide a base implementation for the web part lifecycle and can be overridden for an
 * updated implementation. The render() API is the only API that is mandatory to be implemented/overridden by a web
 * part. All other life cycle APIs have a base implementation and can be overridden based on the needs of the web part.
 * Please refer to the documentation of the individual APIs to make the right decision.
 *
 * @public
 */
var BaseClientSideWebPart = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BaseClientSideWebPart, _super);
    /**
     * Constructor for the BaseClientSideWebPart class.
     *
     * @remarks
     * It is highly recommended that the web part use the `onInit()` API to perform any web part specific
     * initialization.  Most of the web part features like this.context and `this.properties` are not
     * available to be used before the the `onInit()` part of the web part loading lifecycle.
     */
    function BaseClientSideWebPart() {
        var _this = _super.call(this) || this;
        _this._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogSource"].create('BaseClientSideWebPart');
        /**
         * True value reflects that web part is loaded as it was perceived in viewport.
         *
         * NOTE: Don't update it. This flag should be only read to know the lazy loading status.
         * NOTE: Don't use this flag to track position of the web part in viewport. Use this
         * flag only to track if web part rendering has been delayed or not.
         */
        _this._registeredInViewport = false;
        _this._asyncRenderQosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"]("WebPartAsyncRender");
        // Disallow instantiation of the base class by itself
        if (_this.constructor['name'] === 'BaseClientSideWebPart') { // tslint:disable-line:no-string-literal
            throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartErrorCode"].BaseConstructError);
        }
        _this._firstTimeRenderPromises = [];
        return _this;
    }
    Object.defineProperty(BaseClientSideWebPart.prototype, "domElement", {
        // Readonly protected properties. To change these to readonly once TypeScript supports that feature.
        /**
         * This property is a pointer to the root DOM element of the web part. This is a DIV element and contains the whole
         * DOM subtree of the web part.
         *
         * @readonly
         */
        get: function () { return this.context.domElement; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseClientSideWebPart.prototype, "width", {
        /**
         * This value is the available width of the area in which the web part can render itself.
         * Instead of "Element.clientWidth" which returns an integer, "getComputedStyle" returns
         * a number which is more accurate in sub-pixel.
         *
         * @remarks
         * {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth | clientWidth}
         * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseFloat | parseFloat}
         * {@link https://developer.mozilla.org/en/docs/Web/API/Window/getComputedStyle | getComputedStyle}
         *
         * @readonly
         * @alpha
         */
        get: function () {
            if (this._width === undefined) {
                var width = window.getComputedStyle(this.domElement).width;
                this._width = width ? parseFloat(width) : 0;
            }
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseClientSideWebPart.prototype, "renderedOnce", {
        /**
         * This property indicates whether the web part has been rendered once or not. After the first time rendering,
         * the value of this property is always true until a full re-render of the web part happens.
         *
         * @readonly
         */
        get: function () { return this._renderedOnce; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseClientSideWebPart.prototype, "renderedFromPersistedData", {
        /**
         * This property indicates whether the web part was rendered from the persisted data (serialized state from the
         * last time that the web part was saved) or not.
         *
         * @remarks
         * Example: When web part is added for the first time using toolbox then the value is false.
         *
         * @readonly
         */
        get: function () { return this._renderedFromPersistedData; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseClientSideWebPart.prototype, "canOpenPopupOnRender", {
        /**
         * This property indicates whether a web part can open a popup on initial render.
         *
         * @remarks
         * In some environments the host
         * re-renders the web parts frequently, and therefore opening popups during render will cause popups to open
         * repeatedly, which is a poor user experience. As an example, the classic SharePoint pages perform postbacks
         * causing the page to re-render on all button clicks.
         *
         * If a web part needs to open a popup on render, it should use this API before opening the popup. If this API
         * returns false, the web part should not open popup on initial render. Some web parts that open popups during
         * render are the document embed web part that pops up the file picker on initial render, embedded video web part
         * that pops up the PropertyPane on initial render.
         *
         * @readonly
         */
        get: function () {
            // @todo (SPPPLAT VSO#243602): if the classic page experience is usable, we should remove this API.
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseClientSideWebPart.prototype, "isRenderAsync", {
        /**
         * Indicates whether the web part is rendering in Async mode.
         *
         * @remarks
         * If the web part overrides this field to return true, then it needs to call renderCompleted API
         * after the web part rendering is complete.
         *
         * The default value is false.
         *
         * @virtual
         */
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    /**
     * Internal API to update the webpart upon a resize of the DOM window's viewport
     *
     * See onAfterResize for more details.
     *
     * @internal
     */
    BaseClientSideWebPart.prototype._internalOnAfterResize = function () {
        this._width = undefined;
        this.onAfterResize(this.width);
    };
    /**
     * Internal API for the first time render of the web part. The purpose of this API is to enforce initialization steps
     * before the actual render is called. This API is called only once during the web part loading lifecycle.
     *
     * @returns The promise indicates the render loop is finished (success or fail).
     *
     * @internal
     */
    BaseClientSideWebPart.prototype._internalFirstTimeRender = function (scrollableParent, qosMonitor) {
        var _this = this;
        /* tslint:enable:no-unused-variable */
        if (this._renderPromiseResolver) {
            throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartErrorCode"].FirstTimeRenderCalledMoreThanOnce, this.context.webPartTag);
        }
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
            source: this._logSource,
            message: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].StartedFirstTimeRender, this.context.webPartTag),
            serviceScope: this.context.serviceScope
        });
        return new Promise(function (resolve, reject) {
            // By this point in the lifecycle the web part should have a non-null property bag.
            if (!_this.properties && qosMonitor) {
                qosMonitor.writeUnexpectedFailure('PropertyBagNull');
                throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartErrorCode"].PropertyBagNull, _this.context.webPartTag);
            }
            // Ensure Web part occupy minimum space while loading, if specified
            var minHeight = _this._calculateMinimumHeight();
            if (minHeight) {
                _this.domElement.style.minHeight = minHeight + "px";
            }
            _this._renderPromiseResolver = resolve;
            _this._renderPromiseRejecter = reject;
            if (!_this.context.host.isViewportLoadingDisabled) {
                _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_PerformanceLogger"].markComponent(_this.context.webPartTag, 'loadingDelayed');
                _this._internalDelayedRender(scrollableParent);
            }
            else {
                _this._onInViewport();
            }
        });
    };
    /**
     * @internal
     */
    BaseClientSideWebPart.prototype._internalSetDisplayMode = function (newDisplayMode) {
        if (this.displayMode !== newDisplayMode) {
            // Switch display mode will change the canvas width of web part. Clear the cache of width here.
            this._width = undefined;
            this._renderedFromPersistedData = true;
        }
        _super.prototype._internalSetDisplayMode.call(this, newDisplayMode);
    };
    /**
     * @internal
     * {@inheritDoc BaseWebPart._internalInitialize}
     */
    BaseClientSideWebPart.prototype._internalInitialize = function (webPartContext, addedFromPersistedData, mode) {
        _super.prototype._internalInitialize.call(this, webPartContext, addedFromPersistedData, mode);
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["_SPFlight"].isEnabled(1314 /* ViewportLoaderGeneralized */)) {
            this._viewportLoader = webPartContext.host.viewportLoader;
        }
        this._renderedOnce = false;
        this['__type'] = 'BaseClientSideWebPart'; // tslint:disable-line:no-string-literal
        // Bind the callbacks
        this.render = this.render.bind(this);
        this.onDispose = this.onDispose.bind(this);
        this.renderError = this.renderError.bind(this);
        this.clearError = this.clearError.bind(this);
        this.renderCompleted = this.renderCompleted.bind(this);
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_6__["default"].bindAsyncRenderActivated()) {
            this._asyncRenderTimeout = this._asyncRenderTimeout.bind(this);
        }
    };
    /**
     * Calculates minimum height required for the web part to render with current width
     *
     * @internal @virtual
     */
    // This is a temporary workaround tracked by [VSO:SPPPlat] #378372
    BaseClientSideWebPart.prototype._calculateMinimumHeight = function () {
        if (this.context && this.context.manifest && this.context.manifest.isInternal) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logErrorData({
                source: this._logSource,
                error: new Error("Web part " + this.context.webPartTag + " should override _calculateMinimumHeight()"),
                serviceScope: this.context.serviceScope
            });
        }
        return undefined;
    };
    /**
     * This API should be called by web parts that perform Async rendering. Those web part are required to override
     * the isRenderAsync API and return true. One such example is web parts that render content in an IFrame. The
     * web part initiates the IFrame rendering in the `render()` API but the actual rendering is complete only after
     * the iframe loading completes.
     */
    BaseClientSideWebPart.prototype.renderCompleted = function () {
        this._renderCompleted();
    };
    /**
     * This event method is called when the display mode of a web part is changed.
     *
     * @remarks
     * The default implementation of this API calls
     * the web part render method to re-render the web part with the new display mode. If a web part developer does not
     * want a full re-render to happen on display mode change, they can override this API and perform specific updates
     * to the web part DOM to switch its display mode.
     *
     * @param oldDisplayMode - The old display mode.
     *
     * @virtual
     */
    BaseClientSideWebPart.prototype.onDisplayModeChanged = function (oldDisplayMode) {
        var _this = this;
        _super.prototype.onDisplayModeChanged.call(this, oldDisplayMode);
        if (oldDisplayMode === this.displayMode) {
            return;
        }
        // Note: this quirk has existed for a very long time now. Long enough that it can be considered
        // a part of the design :(. Consider the scenario when the page is loaded with "&Mode=Edit" query
        // string parameter. As per the original design, the host, say, the ModernPage in this case, should call
        // the ClientSideWebPartManager.loadWebPart API with "displayMode == Edit" value. But that is not
        // the case. The ModernPage calls loadWebPart with "displayMode == Read" and then calls
        // ClientSideWebPartManager.setDisplayMode(displayMode == Edit). This opens the door for race condition
        // bugs to occur. Especially as the web part loading lifecycle is becoming more complex. To avoid these
        // race conditions from happening we need to to make sure all the first time rendering promises are
        // resolved before this._renderWithAccessibleTitle can be called.
        if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Guid"].parse('222961df-4439-412b-9e41-2e659ae18ab6'), '5/11/2018', 'FirstRenderPromises')) {
            Promise.all(this._firstTimeRenderPromises).then(function () { _this._renderWithAccessibleTitle(); });
        }
        else {
            this._renderWithAccessibleTitle();
        }
    };
    /**
     * This API should be used to refresh the contents of the PropertyPane.
     *
     * @remarks
     * This API is called at the end of the web part lifecycle on a page. It should be used to dispose any local
     * resources (i.e. DOM elements) that the web part is holding onto. This API is expected to be called in scenarios
     * like page navigation i.e. the host is transitioning from one page to another and disposes the page that is being
     * transitioned out.
     *
     * @virtual
     */
    BaseClientSideWebPart.prototype.onDispose = function () {
        if (!this.context.host.isViewportLoadingDisabled && !this._registeredInViewport) {
            // tslint:disable-next-line:no-any
            this._viewportLoaderInstance.unregister(this);
        }
    };
    /**
     * This API is invoked when the web part container dom element width is changed, e.g. when the browser
     * browser window is resized and when the property pane is toggled open/close.
     *
     * @remarks
     * Web parts should utilize this method to perform operations such as potentially re-rendering components
     * based on the new available width for the web part.
     *
     * @alpha @virtual
     */
    BaseClientSideWebPart.prototype.onAfterResize = function (newWidth) {
        /* EMPTY BLOCK */
    };
    /**
     * This API should be used to render an error message in the web part display area. Also logs the error message
     * using the trace logger.
     *
     * @param error - An error object containing the error message to render.
     */
    BaseClientSideWebPart.prototype.renderError = function (error) {
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        this.context.statusRenderer.renderError(this.domElement, error);
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logError(this._logSource, error);
    };
    /**
     * This API should be used to clear the error message from the web part display area.
     */
    BaseClientSideWebPart.prototype.clearError = function () {
        this.context.statusRenderer.clearError(this.domElement);
    };
    /**
     * Internal API to trigger a refresh to the WebPart's visual rendition.
     * In this implementation of the BaseWebPart class we call the render API.
     *
     * @internal
     */
    BaseClientSideWebPart.prototype._refresh = function () {
        this._renderWithAccessibleTitle();
    };
    /**
     * Internal API triggered by a dynamic property's callback.
     * In this implementation of the BaseWebPart class we call the render API, only if rendered once.
     *
     * @internal
     */
    BaseClientSideWebPart.prototype._dynamicPropertyRefresh = function () {
        if (this.renderedOnce) {
            this.render();
        }
    };
    Object.defineProperty(BaseClientSideWebPart.prototype, "_viewportLoaderInstance", {
        /**
         * If the new ViewportLoader (V2) is available, use this.
         * Otherwise, return the singleton instance of the original ViewportLoader.
         *
         * @returns The appropriate viewport loader.
         */
        get: function () {
            return this._viewportLoader || _ViewportLoader__WEBPACK_IMPORTED_MODULE_8__["default"].deprecatedInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @privateRemarks
     * This method is overridden in the sp-spm library.
     * @internal
     */
    BaseClientSideWebPart.prototype._internalDelayedRender = function (scrollableParent) {
        // tslint:disable-next-line:no-any
        this._viewportLoaderInstance.register(this, scrollableParent);
        if (!this._registeredInViewport) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
                source: this._logSource,
                message: "Web part " + this.context.webPartTag + " is not in initial viewport, rendering delayed.",
                serviceScope: this.context.serviceScope
            });
        }
    };
    /**
     * The actual initialization and rendering of the Web part starts when it is close enough
     * to the Viewport
     */
    BaseClientSideWebPart.prototype._onInViewport = function () {
        var _this = this;
        if (!this.context.host.isViewportLoadingDisabled) {
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_PerformanceLogger"].markComponent(this.context.webPartTag, 'inViewportLoading');
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
                source: this._logSource,
                message: "Actually started first time render for web part " + this.context.webPartTag + ".",
                serviceScope: this.context.serviceScope
            });
        }
        // Render promise callback should be defined at this time.
        if (!this._renderPromiseResolver || !this._renderPromiseRejecter) {
            throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartErrorCode"].RenderPromiseUndefined, this.context.webPartTag);
        }
        // Perform web part initialization and then render the web part.
        var initPromise = this.onInit();
        if (!initPromise) {
            var error = _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartErrorCode"].OnInitReturnedNullPromise, this.context.webPartTag);
            this._renderPromiseRejecter(error);
            this._clearRenderPromises();
            return;
        }
        this._firstTimeRenderPromises.push(initPromise);
        initPromise
            .then(function () { return _this._yieldToEventLoop(); })
            .then(function () {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
                source: _this._logSource,
                message: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].OnInitCompleted, _this.context.webPartTag),
                serviceScope: _this.context.serviceScope
            });
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_PerformanceLogger"].markComponent(_this.context.webPartTag, 'init');
            var getDataPromise = Promise.resolve();
            // Perform web part initialization and then render the web part.
            getDataPromise = _this._internalGetData();
            if (!getDataPromise) {
                throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartErrorCode"].GetDataReturnedNullPromise, _this.context.webPartTag);
            }
            _this._firstTimeRenderPromises.push(getDataPromise);
            getDataPromise
                .then(function () { return _this._yieldToEventLoop(); })
                .then(function () {
                _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_PerformanceLogger"].markComponent(_this.context.webPartTag, 'getDataComplete');
                // Clear the loading indicator
                _this.context.statusRenderer.clearLoadingIndicator(_this.domElement);
                _this._renderWithAccessibleTitle();
                // Record the time framework has finished calling render(). By this time framework is accountable
                // for loading web part module through fasted CDN and loading web part data through appropriate
                // techniques like Web part cache and synchronous time to execute web part's render() method.
                _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_PerformanceLogger"].markComponent(_this.context.webPartTag, 'syncRender');
                // If rendering happened synchronously, simply complete the rendering cycle.
                // Else, create a new promise and wait for it to be resolved. The resolution
                // can happen when the web part completes the promise or when the timeout fires.
                if (!_this.isRenderAsync) {
                    _this._tryToLogLoadFirstRenderDone();
                    _this._resolveOrRejectOnRenderPromise();
                }
                else {
                    _this._startAsyncRenderGuardTimer();
                }
            });
        }).catch(function (e) {
            if (_this._renderPromiseRejecter) {
                _this._renderPromiseRejecter(e);
                _this._clearRenderPromises();
            }
        });
    };
    /**
     * Wraps render to ensure any type of rendering has access to the latest context
     * to provide the most accurate accessible info to screen readers.
     */
    BaseClientSideWebPart.prototype._renderWithAccessibleTitle = function () {
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_PerformanceLogger"].devMark("webpart(" + this.context.webPartTag + ")._renderWithAccessibleTitle");
        this.render();
        // The accessible label is only required in edit mode. It is also not required for mobile devices
        // which only provide view mode
        if (this.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Edit) {
            // Render the accessible description after and associate by ID to avoid re-rendering the whole zone
            // when webpart updates contextual info.
            var accessibleContext = this.accessibleTitle || this._getDefaultAccessibleTitle();
            if (accessibleContext) {
                // Keep ID in sync with ControlZone.render
                var contextualLabelId = "cswpAccessibleLabelContextual_" + this.context.instanceId;
                var accessibleDiv = this.domElement.querySelector("#" + contextualLabelId);
                var isNewLabelElement = !accessibleDiv;
                if (isNewLabelElement) {
                    accessibleDiv = document.createElement('div');
                    accessibleDiv.id = contextualLabelId;
                    accessibleDiv.className = _styles_cswp_base_module_scss__WEBPACK_IMPORTED_MODULE_10__["default"].screenReaderOnly;
                    accessibleDiv.setAttribute('aria-hidden', 'true');
                }
                accessibleDiv.textContent = accessibleContext;
                if (isNewLabelElement) {
                    this.domElement.appendChild(accessibleDiv);
                }
            }
            // Perform classic page fixup. It should only be called in edit mode otherwise it will
            // make anchor elements not working in view mode.
            _classicPages_ClassicPageUtils__WEBPACK_IMPORTED_MODULE_5__["default"].disableAutomaticPostbacks(this.domElement, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Environment"].type);
        }
        // Reset minHeight only if the KillSwitch is activated
        if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_6__["default"].isWebPartMinHeightResetKSActivated()) {
            // We are removing this statement as we are already resetting the minHeight post-render.
            // Also this is causing unnecessary resize, leading to janky rendering.
            this.domElement.style.minHeight = null; // tslint:disable-line:no-null-keyword
        }
    };
    /**
     * Start async guard timer. This timer is to help avoid losing performance markers for a web part
     * that renders asynchronously but does not call the `renderCompleted` API;
     */
    BaseClientSideWebPart.prototype._startAsyncRenderGuardTimer = function () {
        var _this = this;
        // Note: the timer is 25 seconds because after 30 seconds, the PerformanceLogger will auto expire
        // the log timer and we will lose data. This value needs to be smaller than that.
        this._clearAsyncRenderGuardTimer();
        this._asyncRenderGuardTimer = window.setTimeout(function () {
            _this._asyncRenderTimeout();
        }, 25000);
    };
    /**
     * Render completed.
     */
    BaseClientSideWebPart.prototype._renderCompleted = function () {
        if (this._asyncRenderGuardTimer) {
            this._tryToLogLoadFirstRenderDone();
            this._clearAsyncRenderGuardTimer();
            this._asyncRenderQosMonitor.writeSuccess({
                'alias': this.context.manifest.alias,
                'webPartId': this.context.manifest.id
            });
            this._resolveOrRejectOnRenderPromise();
        }
    };
    /**
     * Async render timed out. Log error information and
     */
    BaseClientSideWebPart.prototype._asyncRenderTimeout = function () {
        // There is a potential race condition when the async guard timer gets queued into the javascript
        // task queue right at the time when renderCompleted API gets called. Protect against that.
        if (this._asyncRenderGuardTimer) {
            this._clearAsyncRenderGuardTimer();
            // At this time we only log an error and fail the QOS monitor when the async guard timer fires.
            var error = _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartErrorCode"].RenderCompletedCallNotCalled, this.context.webPartTag);
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logErrorData({
                source: this._logSource,
                error: error,
                serviceScope: this.context.serviceScope
            });
            this._asyncRenderQosMonitor.writeUnexpectedFailure('Timeout', error, {
                'alias': this.context.manifest.alias,
                'webPartId': this.context.manifest.id,
                'instanceId': this.instanceId
            });
            this._resolveOrRejectOnRenderPromise(true);
        }
    };
    BaseClientSideWebPart.prototype._clearAsyncRenderGuardTimer = function () {
        if (this._asyncRenderGuardTimer) {
            window.clearTimeout(this._asyncRenderGuardTimer);
            this._asyncRenderGuardTimer = undefined;
        }
    };
    /**
     * This is called for every web part whether sync or async once rendering is completed.
     */
    BaseClientSideWebPart.prototype._resolveOrRejectOnRenderPromise = function (isReject) {
        this._renderedOnce = true;
        var message = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Text"].format(this.isRenderAsync ? _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].CompletedAsyncRender : _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].CompletedSyncRender, this.context.webPartTag);
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
            source: this._logSource,
            message: message,
            serviceScope: this.context.serviceScope
        });
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_PerformanceLogger"].devMark("webpart(" + this.context.webPartTag + ").complete");
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_6__["default"].isLogWebPartLoadRenderDoneKillSwitchActivated() && isReject) {
            if (this._renderPromiseRejecter) {
                this._renderPromiseRejecter(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_7__["SPWebPartErrorCode"].RenderTimeout, this.context.webPartTag));
            }
        }
        else {
            if (this._renderPromiseResolver) {
                this._renderPromiseResolver();
            }
        }
        this._clearRenderPromises();
    };
    BaseClientSideWebPart.prototype._clearRenderPromises = function () {
        this._renderPromiseResolver = undefined;
        this._renderPromiseRejecter = undefined;
        // Reset minHeight
        this.domElement.style.minHeight = null; // tslint:disable-line:no-null-keyword
    };
    BaseClientSideWebPart.prototype._tryToLogLoadFirstRenderDone = function () {
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_6__["default"].isLogWebPartLoadRenderDoneKillSwitchActivated() &&
            !this._renderedOnce &&
            !this._renderedFromPersistedData) {
            var logEntry = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogEntry"]('BaseClientSideWebPart', 'RenderDone', _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogType"].Event, {
                alias: "WebPart." + this.manifest.alias + "." + this.manifest.id,
                isInternal: (!!this.manifest.isInternal).toString(),
                isAsyncRender: this.isRenderAsync.toString()
            });
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEventWithLogEntry(logEntry);
        }
    };
    BaseClientSideWebPart.prototype._isPaintStarvationEnabled = function () {
        return (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_6__["default"].isPaintStarvationKSActivated() &&
            _common_Flights__WEBPACK_IMPORTED_MODULE_11__["Flights"].isPaintStravationEnabled());
    };
    BaseClientSideWebPart.prototype._yieldToEventLoop = function (arg) {
        var useInvertedCheck = !_common_KillSwitches__WEBPACK_IMPORTED_MODULE_6__["default"].isCorrectedPainStarveKSActivated();
        var isPaintStarvationOptimized = this._isPaintStarvationEnabled();
        if ((useInvertedCheck && isPaintStarvationOptimized)
            ||
                (!useInvertedCheck && !isPaintStarvationOptimized)) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerbose(this._logSource, 'yielding execution to event loop');
            // tslint:disable-next-line no-string-based-set-timeout
            return new Promise(function (resolve) { return setTimeout(function () { return resolve(arg); }, 0); });
        }
        else {
            return Promise.resolve(arg);
        }
    };
    return BaseClientSideWebPart;
}(_BaseWebPart__WEBPACK_IMPORTED_MODULE_4__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (BaseClientSideWebPart);


/***/ }),

/***/ "fNzW":
/*!***********************************************************************************************!*\
  !*** ../sp-property-pane/lib/propertyPaneFields/propertyPaneDropdown/PropertyPaneDropdown.js ***!
  \***********************************************************************************************/
/*! exports provided: PropertyPaneDropdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDropdown", function() { return PropertyPaneDropdown; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "3ZYD");
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

/***/ "htbj":
/*!******************************************!*\
  !*** ./lib/core/WebPartDataConverter.js ***!
  \******************************************/
/*! exports provided: WebPartDataConverter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebPartDataConverter", function() { return WebPartDataConverter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./error/SPWebPartError */ "ybLs");
// Copyright (c) Microsoft. All rights reserved.
/* tslint:disable:member-ordering */






/**
 * On the client, we need to support both HTML and and JSON format of the web part data. This is a utility
 * class to perform conversion between the two formats.
 *
 * @internal
 */
var WebPartDataConverter = /** @class */ (function () {
    function WebPartDataConverter() {
    }
    WebPartDataConverter_1 = WebPartDataConverter;
    Object.defineProperty(WebPartDataConverter, "_parsingDocument", {
        /**
         * A temporary document detached from the main document for HTML parsing (call createElement on this)
         *
         * Note: Using document.createElement will create the element on the running document of the page which is
         * dangerous, because when you set innerHTML on the element the content will immediately run on the page.
         * That causes a security issue because we might be parsing something that has a <script> tag (XSS attack).
         * In case of <img> tags, the image gets downloaded immediately which is also unwanted behavior. So, for
         * parsing purposes, we should never use document.createElement and insead use this._parsingDocument.createElement.
         *
         */
        get: function () {
            if (!this._tempDoc) {
                this._tempDoc = document.implementation.createHTMLDocument('tempDocument');
            }
            return this._tempDoc;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Is this string a html web part data ?
     */
    WebPartDataConverter.isWebPartHtml = function (htmlString) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Validate"].isNonemptyString(htmlString, 'htmlString');
        return htmlString.indexOf('<div') === 0 && htmlString.indexOf(WebPartDataConverter_1._webPartDataAttribute) !== -1;
    };
    /**
     * Converts an instance of IWebPartData to is corresponding persisted HTML element.
     * See WebPartDataConverter tests for examples.
     */
    WebPartDataConverter.convertWebPartDataToHtml = function (webpartData) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Validate"].isNotNullOrUndefined(webpartData, 'web part data');
        // Clone web part data because we will modify it for conversion
        var wpdata = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["cloneDeep"](webpartData);
        WebPartDataConverter_1._initializeIfNeeded();
        // Add the component id so the GUIDs get search indexed and we can look them up in search
        var componentIdDiv = WebPartDataConverter_1._wpComponentIdDiv.cloneNode();
        componentIdDiv.textContent = wpdata.id;
        var htmlPropsDiv = WebPartDataConverter_1._wpHtmlPropsDiv.cloneNode();
        htmlPropsDiv.innerHTML = WebPartDataConverter_1.convertServerProcessedDataToHtml(wpdata.serverProcessedContent);
        // Server-processed data is translated to html, so clear it out in the IWebPartData object to avoid duplication
        wpdata.serverProcessedContent = undefined;
        var wpHtmlDiv = WebPartDataConverter_1._wpDiv.cloneNode();
        // We don't need any attribute encoding because dom parser inherently encode/decodes when dealing with innerHTML
        wpHtmlDiv.setAttribute(WebPartDataConverter_1._webPartDataAttribute, JSON.stringify(wpdata));
        wpHtmlDiv.appendChild(componentIdDiv);
        wpHtmlDiv.appendChild(htmlPropsDiv);
        var wrapper = WebPartDataConverter_1._parsingDocument.createElement('div');
        wrapper.appendChild(wpHtmlDiv);
        return wrapper.innerHTML;
    };
    /**
     * Converts persisted html element for a web part to its corresponding IWebPartData instance.
     *
     * @remarks
     * Returns undefined in case of bad input.
     * See WebPartDataConverter tests for examples
     *
     * @param htmlString - html formatted web part data.
     * @param links - (optional) Array of the fixed up links. If provided, the values in this array
     *   take over the values in the HTML markup.
     */
    WebPartDataConverter.convertHtmlToWebPartData = function (htmlString, links) {
        var wpdata;
        var wrapper = WebPartDataConverter_1._parsingDocument.createElement('div');
        wrapper.innerHTML = htmlString.trim();
        // Use children (instead of childNodes) to avoid getting text nodes
        var wpHtmlDiv = wrapper.children[0];
        if (wpHtmlDiv && wpHtmlDiv.hasAttribute(WebPartDataConverter_1._webPartAttribute)) {
            var wpHtmlDivWebPartAttributeData = wpHtmlDiv.getAttribute(WebPartDataConverter_1._webPartDataAttribute);
            if (wpHtmlDivWebPartAttributeData) {
                wpdata = JSON.parse(wpHtmlDivWebPartAttributeData);
            }
            // In case of bad input, wpdata will be null
            if (wpdata) {
                var htmlPropsDiv = wpHtmlDiv.querySelector("[" + WebPartDataConverter_1._htmlPropertiesAttribute + "]");
                wpdata.serverProcessedContent =
                    WebPartDataConverter_1.convertServerProcessedHtmlToData(htmlPropsDiv.innerHTML, links);
            }
        }
        return wpdata || undefined;
    };
    /**
     * Convert server process data to an equivalent HTML stirng format that the SharePoint server
     * can process for search indexing, link fixup and SafeHTML processing.
     *
     * @remarks
     * HtmlStrings are search indexed. Links and ImageSources are setup for link fixup. All of these are
     * search indexed and passed through SafeHtml processing to sanitize the content.
     *
     * This method is expected to provide reverse processing as compared to `convertHtmltoServerProcessedData`.
     *
     * Input:
     *
     * ```
     * {
     *   htmlStrings: { 'prop1': 'value_of_prop1' },
     *   links: { 'prop2': 'http://www.contoso.com/page1.aspx' },
     *   imageSources: { 'prop3': 'http://www.contoso.com/imag.png' }
     * }
     * ```
     *
     * Output:
     *
     * ```
     * "<div data-sp-prop-name='prop1'>value_of_prop1</div>
     *  <link data-sp-prop-name='prop2' href='http://www.contoso.com/page1.aspx'>
     *  <img data-sp-prop-name='prop3' src='http://www.contoso.com/image.png'>"
     * ```
     */
    WebPartDataConverter.convertServerProcessedDataToHtml = function (serverContent) {
        var result = '';
        if (serverContent) {
            if (serverContent.htmlStrings) {
                result += WebPartDataConverter_1._convertServerProcessedDataToHtmlByType(serverContent.htmlStrings, 1 /* htmlString */);
            }
            if (serverContent.searchablePlainTexts) {
                result += WebPartDataConverter_1._convertServerProcessedDataToHtmlByType(serverContent.searchablePlainTexts, 4 /* searchablePlainText */);
            }
            if (serverContent.links) {
                result += WebPartDataConverter_1._convertServerProcessedDataToHtmlByType(serverContent.links, 2 /* link */);
            }
            if (serverContent.imageSources) {
                result += WebPartDataConverter_1._convertServerProcessedDataToHtmlByType(serverContent.imageSources, 3 /* imageSource */);
            }
        }
        return result;
    };
    WebPartDataConverter._convertServerProcessedDataToHtmlByType = function (properties, type) {
        var result = '';
        for (var propPath in properties) { /* tslint:disable-line:forin */
            var value = properties[propPath];
            result += WebPartDataConverter_1._getHtmlString(propPath, type, value);
        }
        return result;
    };
    /**
     * Convert an HTML string to its equivalent ISerializedServerProcessedData structure format.
     *
     * @remarks
     * This method is expected to provide reverse processing as compared to convertServerProcessedDataToHtml.
     *
     * Input:
     *
     * ```
     * "<div data-sp-prop-name='prop1'>value_of_prop1</div>
     *  <link data-sp-prop-name='prop2' href='http://www.contoso.com/page1.aspx'>
     *  <img data-sp-prop-name='prop3' src='http://www.contoso.com/image.png'>"
     * ```
     *
     * Output:
     *
     * ```
     * {
     *   htmlStrings: { 'prop1': 'value_of_prop1' },
     *   links: { 'prop2': 'http://www.contoso.com/page1.aspx' },
     *   imageSources: { 'prop3': 'http://www.contoso.com/imag.png' }
     * }
     * ```
     *
     * Array of the fixed up links. If provided, the values in this array take over the values in the HTML markup.
     */
    WebPartDataConverter.convertServerProcessedHtmlToData = function (htmlString, links) {
        var serverContent = {
            htmlStrings: {},
            searchablePlainTexts: {},
            links: {},
            imageSources: {}
        };
        if (!htmlString || htmlString === '') {
            return serverContent;
        }
        var tempNode = WebPartDataConverter_1._parsingDocument.createElement('DIV');
        tempNode.innerHTML = htmlString;
        var nodes = tempNode.children;
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var key = node.getAttribute(WebPartDataConverter_1._propNameAttribute);
            if (key) {
                switch (node.tagName) {
                    case 'DIV':
                        if (node.hasAttribute(WebPartDataConverter_1._searchablePlainTextAttribute) &&
                            serverContent.searchablePlainTexts) {
                            serverContent.searchablePlainTexts[key] = node.textContent;
                        }
                        else if (serverContent.htmlStrings) {
                            serverContent.htmlStrings[key] = node.innerHTML;
                        }
                        break;
                    case 'LINK':
                    case 'A':
                        if (links) {
                            WebPartDataConverter_1._extractSPLink(node, links, serverContent, key, false);
                        }
                        else {
                            var aTagAttribute = node.getAttribute('href');
                            if (aTagAttribute && serverContent.links) {
                                serverContent.links[key] = aTagAttribute;
                            }
                        }
                        break;
                    // Look for SPIMG because Canvas may replace IMG tags with SPIMG to prevent browser pre-loading
                    case 'IMG':
                    case 'SPIMG':
                        if (links) {
                            WebPartDataConverter_1._extractSPLink(node, links, serverContent, key, true);
                        }
                        else {
                            var srcAttribute = node.getAttribute('src');
                            if (serverContent.imageSources && srcAttribute) {
                                serverContent.imageSources[key] = srcAttribute;
                            }
                            // This is a temporary fix to make pages published with the mobile app functional.
                            // The mobile app sets the href attribute on the image tag instead of the src attribute.
                            // (SPPPLAT VSO#289988) tracks removal of this code.
                            var hrefAttribute = node.getAttribute('href');
                            if (hrefAttribute && serverContent && serverContent.imageSources &&
                                /* tslint:disable-next-line:no-null-keyword */
                                (serverContent.imageSources[key] === undefined || serverContent.imageSources[key] === null)) {
                                serverContent.imageSources[key] = hrefAttribute;
                            }
                        }
                        break;
                }
            }
        }
        return serverContent;
    };
    /**
     * Get the HTML equivalent string for a server processed prop type.
     */
    WebPartDataConverter._getHtmlString = function (propName, propType, propValue) {
        var htmlPropsString = '';
        if (propName && typeof propValue === 'string' && propValue) {
            switch (propType) {
                case 1 /* htmlString */:
                    var htmlDiv = this._parsingDocument.createElement('DIV');
                    htmlDiv.setAttribute(WebPartDataConverter_1._propNameAttribute, propName);
                    var sanitizedValue = WebPartDataConverter_1._normalizeHTML(propValue);
                    htmlDiv.innerHTML = sanitizedValue;
                    htmlPropsString = htmlDiv.outerHTML;
                    break;
                case 4 /* searchablePlainText */:
                    var plainTextDiv = this._parsingDocument.createElement('DIV');
                    plainTextDiv.setAttribute(WebPartDataConverter_1._propNameAttribute, propName);
                    plainTextDiv.setAttribute(WebPartDataConverter_1._searchablePlainTextAttribute, 'true');
                    plainTextDiv.textContent = propValue;
                    htmlPropsString = plainTextDiv.outerHTML;
                    break;
                case 2 /* link */:
                    var anchorDiv = this._parsingDocument.createElement('A');
                    anchorDiv.setAttribute(WebPartDataConverter_1._propNameAttribute, propName);
                    anchorDiv.setAttribute('href', propValue);
                    htmlPropsString = anchorDiv.outerHTML;
                    break;
                case 3 /* imageSource */:
                    var imgDiv = this._parsingDocument.createElement('IMG');
                    imgDiv.setAttribute(WebPartDataConverter_1._propNameAttribute, propName);
                    imgDiv.setAttribute('src', propValue);
                    htmlPropsString = imgDiv.outerHTML;
                    break;
            }
        }
        return htmlPropsString;
    };
    /**
     * We need to send valid html from client, because server should understand it to perform services. This method
     * normalizes html by doing basic validations and removing script tags. Returns empty string if passed invalid HTML.
     * Note that this is not a strict html validation, it just needs to make sure the page doesn't break so the
     * html value (or a valid part of it) gets to server for proper validation and sanitization
     */
    WebPartDataConverter._normalizeHTML = function (htmlString) {
        if (!htmlString || htmlString === '') {
            return htmlString;
        }
        var tempDiv = WebPartDataConverter_1._parsingDocument.createElement('DIV');
        /* This is a trick to detect invalid html. We put the html string inside a simple structure and check if the DOM
        created for the structure is as expected. If there are unexpected closing tags or characters in the html string
        the structure of this element will be messed up and one our checks would fail */
        tempDiv.innerHTML =
            "<div class='child1'></div>" +
                ("<div class='main'>" + htmlString + "</div>") +
                "<div class='child3'></div>";
        var children = tempDiv.children;
        if (!children[0] || children[0].className !== 'child1' ||
            !children[1] || children[1].className !== 'main' ||
            !children[2] || children[2].className !== 'child3') {
            return '';
        }
        // Remove script tags
        // @todo #286930 Make this more robust
        var mainDiv = children[1];
        var scriptTags = mainDiv.querySelectorAll('script');
        for (var i = 0; i < scriptTags.length; i++) {
            var scriptTag = scriptTags[0];
            if (scriptTag && scriptTag.parentElement) {
                scriptTag.parentElement.removeChild(scriptTag);
            }
        }
        return mainDiv.innerHTML;
    };
    WebPartDataConverter._initializeIfNeeded = function () {
        if (!WebPartDataConverter_1._wpDiv) {
            WebPartDataConverter_1._wpDiv = WebPartDataConverter_1._parsingDocument.createElement('div');
            WebPartDataConverter_1._wpDiv.setAttribute(WebPartDataConverter_1._webPartAttribute, '');
            WebPartDataConverter_1._wpDiv.setAttribute(WebPartDataConverter_1._webPartDataVersionAttribute, '1.0');
            // Note: data-sp-componentid attribute is looked up by the server for module pre-loading
            WebPartDataConverter_1._wpComponentIdDiv = WebPartDataConverter_1._parsingDocument.createElement('div');
            WebPartDataConverter_1._wpComponentIdDiv.setAttribute(WebPartDataConverter_1._componentIdAttribute, '');
            WebPartDataConverter_1._wpHtmlPropsDiv = WebPartDataConverter_1._parsingDocument.createElement('div');
            WebPartDataConverter_1._wpHtmlPropsDiv.setAttribute(WebPartDataConverter_1._htmlPropertiesAttribute, '');
        }
    };
    /**
     * Extract the link by processing the links array and the index in the data-sp-splink attribute whose
     * value should be of the format  `__SPLINK__<index>__` where index is the index in the links array.
     */
    WebPartDataConverter._extractSPLink = function (node, links, serverContent, key, isImage) {
        if (links.length <= 0) {
            return;
        }
        var spLinkAttribute = node.getAttribute('data-sp-splink');
        if (spLinkAttribute) {
            var result = WebPartDataConverter_1._linkPlaceHolderRegex.exec(spLinkAttribute);
            if (result) {
                var index = parseInt(result[1], 10);
                if (!isNaN(index) && !!links[index]) {
                    if (isImage && serverContent.imageSources) {
                        serverContent.imageSources[key] = links[index];
                    }
                    else if (serverContent.links) {
                        serverContent.links[key] = links[index];
                    }
                }
                else {
                    throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_4__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_4__["SPWebPartErrorCode"].InvalidSPLinkIndex, result[1]);
                }
            }
            else {
                throw _error_SPWebPartError__WEBPACK_IMPORTED_MODULE_4__["SPWebPartError"].create(_error_SPWebPartError__WEBPACK_IMPORTED_MODULE_4__["SPWebPartErrorCode"].InvalidSPLinkAttributeFormat, spLinkAttribute);
            }
        }
    };
    var WebPartDataConverter_1;
    WebPartDataConverter._componentIdAttribute = 'data-sp-componentid';
    WebPartDataConverter._htmlPropertiesAttribute = 'data-sp-htmlproperties';
    WebPartDataConverter._propNameAttribute = 'data-sp-prop-name';
    WebPartDataConverter._searchablePlainTextAttribute = 'data-sp-searchableplaintext';
    WebPartDataConverter._webPartAttribute = 'data-sp-webpart';
    WebPartDataConverter._webPartDataAttribute = 'data-sp-webpartdata';
    WebPartDataConverter._webPartDataVersionAttribute = 'data-sp-webpartdataversion';
    /*
     * Regular expression used to extract the integer value from the __SPLINK__<number>__ placeholder.
     */
    WebPartDataConverter._linkPlaceHolderRegex = /^__SPLINK__(\d+)__$/;
    WebPartDataConverter = WebPartDataConverter_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["sealed"]
    ], WebPartDataConverter);
    return WebPartDataConverter;
}());

/* harmony default export */ __webpack_exports__["default"] = (WebPartDataConverter);


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

/***/ "jeXa":
/*!**********************************!*\
  !*** ./lib/core/IWebPartData.js ***!
  \**********************************/
/*! exports provided: WebPartIsolationLevel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebPartIsolationLevel", function() { return WebPartIsolationLevel; });
// Copyright (c) Microsoft. All rights reserved.
/**
 * Enum describing different levels isolation supported for a web part.
 *
 * @alpha
 */
var WebPartIsolationLevel;
(function (WebPartIsolationLevel) {
    /**
     * Web part is not isolated.
     */
    WebPartIsolationLevel["None"] = "None";
    /**
     * Web part's DOM is isolated from the main page's DOM.
     */
    WebPartIsolationLevel["DomIsolation"] = "DomIsolation";
})(WebPartIsolationLevel || (WebPartIsolationLevel = {}));


/***/ }),

/***/ "jxDd":
/*!************************************************!*\
  !*** ./lib/core/styles/spinner.module.scss.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./spinner.module.css */ "AXNB");
var styles = {
    spinnerContainer: 'spinnerContainer_08240f05',
    spinner: 'spinner_08240f05',
    spinnerRing: 'spinnerRing_08240f05',
    spinnerSlice: 'spinnerSlice_08240f05',
    spin: 'spin_08240f05',
    spinnerLoadingMessage: 'spinnerLoadingMessage_08240f05',
    spinnerAccessibilityMessage: 'spinnerAccessibilityMessage_08240f05'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "kj+3":
/*!*******************************!*\
  !*** ./lib/SPPropertyPane.js ***!
  \*******************************/
/*! exports provided: PropertyPaneCustomField, PropertyPaneButton, PropertyPaneCheckbox, PropertyPaneChoiceGroup, PropertyPaneDropdown, PropertyPaneDynamicField, PropertyPaneDynamicFieldSet, PropertyPaneHorizontalRule, PropertyPaneLabel, PropertyPaneLink, PropertyPaneSlider, PropertyPaneTextField, PropertyPaneToggle, PropertyPaneDynamicTextField, PropertyPaneFieldType, PropertyPaneButtonType, PropertyPaneDropdownOptionType, DynamicDataSharedDepth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneCustomField", function() { return PropertyPaneCustomField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneButton", function() { return PropertyPaneButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneCheckbox", function() { return PropertyPaneCheckbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneChoiceGroup", function() { return PropertyPaneChoiceGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDropdown", function() { return PropertyPaneDropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDynamicField", function() { return PropertyPaneDynamicField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDynamicFieldSet", function() { return PropertyPaneDynamicFieldSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneHorizontalRule", function() { return PropertyPaneHorizontalRule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneLabel", function() { return PropertyPaneLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneLink", function() { return PropertyPaneLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneSlider", function() { return PropertyPaneSlider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneTextField", function() { return PropertyPaneTextField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneToggle", function() { return PropertyPaneToggle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDynamicTextField", function() { return PropertyPaneDynamicTextField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneFieldType", function() { return PropertyPaneFieldType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneButtonType", function() { return PropertyPaneButtonType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDropdownOptionType", function() { return PropertyPaneDropdownOptionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicDataSharedDepth", function() { return DynamicDataSharedDepth; });
/* harmony import */ var _microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneCustomField_PropertyPaneCustomField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-property-pane/lib/propertyPaneFields/propertyPaneCustomField/PropertyPaneCustomField */ "w8Nz");
/* harmony import */ var _microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneButton_PropertyPaneButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-property-pane/lib/propertyPaneFields/propertyPaneButton/PropertyPaneButton */ "F78M");
/* harmony import */ var _microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneCheckBox_PropertyPaneCheckbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-property-pane/lib/propertyPaneFields/propertyPaneCheckBox/PropertyPaneCheckbox */ "nwwH");
/* harmony import */ var _microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneChoiceGroup_PropertyPaneChoiceGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-property-pane/lib/propertyPaneFields/propertyPaneChoiceGroup/PropertyPaneChoiceGroup */ "NmNf");
/* harmony import */ var _microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneDropdown_PropertyPaneDropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-property-pane/lib/propertyPaneFields/propertyPaneDropdown/PropertyPaneDropdown */ "fNzW");
/* harmony import */ var _microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneDynamicField_PropertyPaneDynamicField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-property-pane/lib/propertyPaneFields/propertyPaneDynamicField/PropertyPaneDynamicField */ "tstL");
/* harmony import */ var _microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneDynamicFieldSet_PropertyPaneDynamicFieldSet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @microsoft/sp-property-pane/lib/propertyPaneFields/propertyPaneDynamicFieldSet/PropertyPaneDynamicFieldSet */ "1a3C");
/* harmony import */ var _microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneHorizontalRule_PropertyPaneHorizontalRule__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @microsoft/sp-property-pane/lib/propertyPaneFields/propertyPaneHorizontalRule/PropertyPaneHorizontalRule */ "vlHk");
/* harmony import */ var _microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneLabel_PropertyPaneLabel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @microsoft/sp-property-pane/lib/propertyPaneFields/propertyPaneLabel/PropertyPaneLabel */ "Lz2h");
/* harmony import */ var _microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneToggle_PropertyPaneToggle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @microsoft/sp-property-pane/lib/propertyPaneFields/propertyPaneToggle/PropertyPaneToggle */ "/oQI");
/* harmony import */ var _microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneDynamicTextField_PropertyPaneDynamicTextField__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @microsoft/sp-property-pane/lib/propertyPaneFields/propertyPaneDynamicTextField/PropertyPaneDynamicTextField */ "klin");
/* harmony import */ var _microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneTextField_PropertyPaneTextField__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @microsoft/sp-property-pane/lib/propertyPaneFields/propertyPaneTextField/PropertyPaneTextField */ "E2Ji");
/* harmony import */ var _microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneLink_PropertyPaneLink__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @microsoft/sp-property-pane/lib/propertyPaneFields/propertyPaneLink/PropertyPaneLink */ "w/wA");
/* harmony import */ var _microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneSlider_PropertyPaneSlider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @microsoft/sp-property-pane/lib/propertyPaneFields/propertyPaneSlider/PropertyPaneSlider */ "Cfps");














// ******************** Functions ********************
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
 * @deprecated This is obsolete now. This function has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
 */
function PropertyPaneCustomField(properties) {
    return Object(_microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneCustomField_PropertyPaneCustomField__WEBPACK_IMPORTED_MODULE_0__["PropertyPaneCustomField"])(properties);
}
/**
 * Helper method to create a Button on the PropertyPane.
 * @param targetProperty - Target property the Button is associated to.
 * @param properties - Strongly typed Button properties.
 *
 * @public
 * @deprecated This is obsolete now. This function has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
 */
function PropertyPaneButton(targetProperty, properties) {
    return Object(_microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneButton_PropertyPaneButton__WEBPACK_IMPORTED_MODULE_1__["PropertyPaneButton"])(targetProperty, properties);
}
/**
 * Helper method to create a Checkbox on the PropertyPane.
 * @param targetProperty - Target property the checkbox is associated to.
 * @param properties - Strongly typed Checkbox properties.
 *
 * @public
 * @deprecated This is obsolete now. This function has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
 */
function PropertyPaneCheckbox(targetProperty, properties) {
    return Object(_microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneCheckBox_PropertyPaneCheckbox__WEBPACK_IMPORTED_MODULE_2__["PropertyPaneCheckbox"])(targetProperty, properties);
}
/**
 * Helper method to create a Choice Group on the PropertyPane.
 * @param targetProperty - Target property the choice group is associated to.
 * @param properties - Strongly typed Choice Group properties.
 *
 * @public
 * @deprecated This is obsolete now. This function has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
 */
function PropertyPaneChoiceGroup(targetProperty, properties) {
    return Object(_microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneChoiceGroup_PropertyPaneChoiceGroup__WEBPACK_IMPORTED_MODULE_3__["PropertyPaneChoiceGroup"])(targetProperty, properties);
}
/**
 * Helper method to create a Dropdown on the PropertyPane.
 * @param targetProperty - Target property the dropdown is associated to.
 * @param properties - Strongly typed Dropdown properties.
 *
 * @public
 * @deprecated This is obsolete now. This function has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
 */
function PropertyPaneDropdown(targetProperty, properties) {
    return Object(_microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneDropdown_PropertyPaneDropdown__WEBPACK_IMPORTED_MODULE_4__["PropertyPaneDropdown"])(targetProperty, properties);
}
/**
 * Helper method to create a Dynamic Data widget on the PropertyPane for a dynamic field.
 *
 * @param targetProperty - Target property the Dynamic Data widget is associated to.
 * @param options - Options to enable customized values for callback, filters etc.,
 *                  for the dynamic field.
 * @public
 * @deprecated This is obsolete now. This function has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
 */
function PropertyPaneDynamicField(targetProperty, properties) {
    return Object(_microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneDynamicField_PropertyPaneDynamicField__WEBPACK_IMPORTED_MODULE_5__["PropertyPaneDynamicField"])(targetProperty, properties);
}
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
 * @deprecated This is obsolete now. This function has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
 */
function PropertyPaneDynamicFieldSet(properties) {
    return Object(_microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneDynamicFieldSet_PropertyPaneDynamicFieldSet__WEBPACK_IMPORTED_MODULE_6__["PropertyPaneDynamicFieldSet"])(properties);
}
/**
 * Helper method to create a Horizontal Rule on the PropertyPane.
 * @param properties - Strongly typed Horizontal Rule properties.
 *
 * @public
 * @deprecated This is obsolete now. This function has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
 */
function PropertyPaneHorizontalRule() {
    return Object(_microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneHorizontalRule_PropertyPaneHorizontalRule__WEBPACK_IMPORTED_MODULE_7__["PropertyPaneHorizontalRule"])();
}
/**
 * Helper method to create a Label on the PropertyPane.
 * @param targetProperty - Target property the label is associated to.
 * @param properties - Strongly typed Label properties.
 *
 * @public
 * @deprecated This is obsolete now. This function has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
 */
function PropertyPaneLabel(targetProperty, properties) {
    return Object(_microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneLabel_PropertyPaneLabel__WEBPACK_IMPORTED_MODULE_8__["PropertyPaneLabel"])(targetProperty, properties);
}
/**
 * Helper method to create a Link on the PropertyPane.
 * @param targetProperty - Target property the Link is associated to.
 * @param properties - Strongly typed Link properties.
 *
 * @public
 * @deprecated This is obsolete now. This function has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
 */
function PropertyPaneLink(targetProperty, properties) {
    return Object(_microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneLink_PropertyPaneLink__WEBPACK_IMPORTED_MODULE_12__["PropertyPaneLink"])(targetProperty, properties);
}
/**
 * Helper method to create a Slider on the PropertyPane.
 * @param targetProperty - Target property the slider is associated to.
 * @param properties - Strongly typed Slider properties.
 *
 * @public
 * @deprecated This is obsolete now. This function has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
 */
function PropertyPaneSlider(targetProperty, properties) {
    return Object(_microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneSlider_PropertyPaneSlider__WEBPACK_IMPORTED_MODULE_13__["PropertyPaneSlider"])(targetProperty, properties);
}
/**
 * Helper method to create a TextField on the PropertyPane.
 * @param targetProperty - Target property the textfield is associated to.
 * @param properties - Strongly typed TextField properties.
 *
 * @public
 * @deprecated This is obsolete now. This function has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
 */
function PropertyPaneTextField(targetProperty, properties) {
    return Object(_microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneTextField_PropertyPaneTextField__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneTextField"])(targetProperty, properties);
}
/**
 * Helper method to create a Toggle on the PropertyPane.
 * @param targetProperty - Target property the toggle is associated to.
 * @param properties - Strongly typed Toggle properties.
 *
 * @public
 * @deprecated This is obsolete now. This function has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
 */
function PropertyPaneToggle(targetProperty, properties) {
    return Object(_microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneToggle_PropertyPaneToggle__WEBPACK_IMPORTED_MODULE_9__["PropertyPaneToggle"])(targetProperty, properties);
}
/**
 * Helper method to create a Dynamic TextField on the PropertyPane.
 * @param targetProperty - Target property the dynamic textfield is associated to.
 * @param properties - Properties of the PropertyPaneDynamicTextField.
 *
 * @beta
 * @deprecated This has been replaced by PropertyPaneDynamicField and moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
 */
function PropertyPaneDynamicTextField(targetProperty, properties) {
    return Object(_microsoft_sp_property_pane_lib_propertyPaneFields_propertyPaneDynamicTextField_PropertyPaneDynamicTextField__WEBPACK_IMPORTED_MODULE_10__["PropertyPaneDynamicTextField"])(targetProperty, properties);
}
/**
 * Enum for all the supported PropertyPane field types.
 *
 * Names should be consistent with those in office-ui-fabric-react, be careful to get letter casing correct.
 *
 * @public
 * @deprecated This is obsolete now. This enum has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
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
/**
 * Enum for all the supported button types.
 *
 * @public
 * @deprecated This is obsolete now. This enum has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
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
/**
 * Specifies the type of option in a dropdown menu rendered by {@link PropertyPaneDropdown}.
 *
 * @public
 * @deprecated This is obsolete now. This enum has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
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
/**
 * Enum for the possible values of shared depth of the dynamic data reference.
 *
 * @public
 * @deprecated This is obsolete now. This enum has been moved to `@microsoft/sp-property-pane`.
 * Please consume it from there.
 * @internalremarks We have left the original implementation here to avoid breaking the public API contract.
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

/***/ "klin":
/*!***************************************************************************************************************!*\
  !*** ../sp-property-pane/lib/propertyPaneFields/propertyPaneDynamicTextField/PropertyPaneDynamicTextField.js ***!
  \***************************************************************************************************************/
/*! exports provided: PropertyPaneDynamicTextField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDynamicTextField", function() { return PropertyPaneDynamicTextField; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "3ZYD");
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

/***/ "l2n5":
/*!*************************************************************!*\
  !*** ./lib/core/ClientSideWebPartMaintenanceModeManager.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _classicPages_ClassicPageUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./classicPages/ClassicPageUtils */ "FbpR");
/* harmony import */ var _ClientSideWebPartManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ClientSideWebPartManager */ "OASt");
// Copyright (c) Microsoft. All rights reserved.
// This file contains code for the ClientSideWebPartMaintenanceModeManager.







var SP_MAINTENANCE_MODE_MANIFEST_ID = '88019639-8c06-4ba6-8545-03a1f38f8393';
/**
 * The ClientSideWebPartMaintenanceModeManager is the web part manager instance used
 * when the web parts are rendered in maintenance mode.
 *
 * @internal
 */
var ClientSideWebPartMaintenanceModeManager = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ClientSideWebPartMaintenanceModeManager, _super);
    /**
     * See ClientSideWebPartManager
     */
    function ClientSideWebPartMaintenanceModeManager(host) {
        var _this = _super.call(this, host) || this;
        _this._wpMaintenanceModeData = new Map();
        return _this;
    }
    /**
     * See ClientSideWebPartManager
     */
    ClientSideWebPartMaintenanceModeManager.prototype.loadWebPart = function (context) {
        this._loadWebPartInMaintenanceMode(context);
        this._wpMaintenanceModeData.set(context.instanceId, context.webPartData);
        return Promise.resolve();
    };
    /**
     * See ClientSideWebPartManager
     */
    ClientSideWebPartMaintenanceModeManager.prototype.serialize = function (instanceId) {
        return this._wpMaintenanceModeData;
    };
    /**
     * See ClientSideWebPartManager
     */
    ClientSideWebPartMaintenanceModeManager.prototype.dispose = function (instanceId) {
        if (instanceId) {
            this._wpMaintenanceModeData.delete(instanceId);
        }
        else {
            this._wpMaintenanceModeData = new Map();
        }
    };
    ClientSideWebPartMaintenanceModeManager.prototype._loadWebPartInMaintenanceMode = function (context) {
        // Create a disembodied context without an actual web part
        // (It is our responsibility to finish the service scope.)
        var webPartContext = this._getWebPartContext(context);
        webPartContext.serviceScope.finish();
        _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_3__["SPComponentLoader"].loadComponentById(SP_MAINTENANCE_MODE_MANIFEST_ID).then(function (uiComponentModule) {
            uiComponentModule.MaintenanceModeRenderer.render(webPartContext, context.webPartData).then(function () {
                _classicPages_ClassicPageUtils__WEBPACK_IMPORTED_MODULE_4__["default"].disableAutomaticPostbacks(context.domElement, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Environment"].type);
            });
        });
    };
    ClientSideWebPartMaintenanceModeManager = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["sealed"]
    ], ClientSideWebPartMaintenanceModeManager);
    return ClientSideWebPartMaintenanceModeManager;
}(_ClientSideWebPartManager__WEBPACK_IMPORTED_MODULE_5__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (ClientSideWebPartMaintenanceModeManager);


/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: BaseWebPartContext, WebPartContext, _teamsJs, WebPartIsolationLevel, _MinimalWebPartHost, BaseWebPart, BaseClientSideWebPart, ClientSideWebPartManager, ClientSideWebPartManagerFactory, _ClientSideWebPartStatusRenderer, WebPartDataConverter, _MinimalWebPartContainer, _PropertyPaneLoader, PropertyPaneCustomField, PropertyPaneButton, PropertyPaneCheckbox, PropertyPaneChoiceGroup, PropertyPaneDropdown, PropertyPaneDynamicField, PropertyPaneDynamicFieldSet, PropertyPaneHorizontalRule, PropertyPaneLabel, PropertyPaneLink, PropertyPaneSlider, PropertyPaneTextField, PropertyPaneToggle, PropertyPaneDynamicTextField, PropertyPaneFieldType, PropertyPaneButtonType, PropertyPaneDropdownOptionType, DynamicDataSharedDepth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_BaseWebPartContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/BaseWebPartContext */ "+wJ3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseWebPartContext", function() { return _core_BaseWebPartContext__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _core_WebPartContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/WebPartContext */ "ruV7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebPartContext", function() { return _core_WebPartContext__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _core_teams_ITeamsJs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/teams/ITeamsJs */ "Ncfj");
/* harmony import */ var _core_teams_ITeamsJs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_teams_ITeamsJs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_teamsJs", function() { return _core_teams_ITeamsJs__WEBPACK_IMPORTED_MODULE_2__["teamsJs"]; });

/* harmony import */ var _core_IWebPartData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/IWebPartData */ "jeXa");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebPartIsolationLevel", function() { return _core_IWebPartData__WEBPACK_IMPORTED_MODULE_3__["WebPartIsolationLevel"]; });

/* harmony import */ var _components_host_MinimalWebPartHost__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/host/MinimalWebPartHost */ "L5sm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_MinimalWebPartHost", function() { return _components_host_MinimalWebPartHost__WEBPACK_IMPORTED_MODULE_4__["MinimalWebPartHost"]; });

/* harmony import */ var _core_BaseWebPart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/BaseWebPart */ "Ti3B");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseWebPart", function() { return _core_BaseWebPart__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _core_BaseClientSideWebPart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/BaseClientSideWebPart */ "evvI");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseClientSideWebPart", function() { return _core_BaseClientSideWebPart__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _core_ClientSideWebPartManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/ClientSideWebPartManager */ "OASt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClientSideWebPartManager", function() { return _core_ClientSideWebPartManager__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _core_ClientSideWebPartManagerFactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/ClientSideWebPartManagerFactory */ "wdlX");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClientSideWebPartManagerFactory", function() { return _core_ClientSideWebPartManagerFactory__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _core_ClientSideWebPartStatusRenderer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core/ClientSideWebPartStatusRenderer */ "aOlN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_ClientSideWebPartStatusRenderer", function() { return _core_ClientSideWebPartStatusRenderer__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _core_WebPartDataConverter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/WebPartDataConverter */ "htbj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebPartDataConverter", function() { return _core_WebPartDataConverter__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SPPropertyPane */ "kj+3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneCustomField", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneCustomField"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneButton", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneButton"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneCheckbox", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneCheckbox"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneChoiceGroup", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneChoiceGroup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDropdown", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneDropdown"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDynamicField", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneDynamicField"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDynamicFieldSet", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneDynamicFieldSet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneHorizontalRule", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneHorizontalRule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneLabel", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneLabel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneLink", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneLink"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneSlider", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneSlider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneTextField", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneTextField"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneToggle", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneToggle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDynamicTextField", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneDynamicTextField"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneFieldType", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneFieldType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneButtonType", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneButtonType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDropdownOptionType", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["PropertyPaneDropdownOptionType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DynamicDataSharedDepth", function() { return _SPPropertyPane__WEBPACK_IMPORTED_MODULE_11__["DynamicDataSharedDepth"]; });

/* harmony import */ var _components_container_MinimalWebPartContainer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/container/MinimalWebPartContainer */ "FxQH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_MinimalWebPartContainer", function() { return _components_container_MinimalWebPartContainer__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _PropertyPaneLoader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./PropertyPaneLoader */ "7pKC");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_PropertyPaneLoader", function() { return _PropertyPaneLoader__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/**
 * SharePoint Framework support for building web parts.
 *
 * @remarks
 * This package defines the APIs used by developers to create a custom web part.
 * A web part is a reusable visual object that a page author can add to their content,
 * and customize using a property pane.  Examples of web parts include an embedded
 * video player, a map, a group calendar, a chart, etc.
 *
 * @packagedocumentation
 */
















/***/ }),

/***/ "nwwH":
/*!***********************************************************************************************!*\
  !*** ../sp-property-pane/lib/propertyPaneFields/propertyPaneCheckBox/PropertyPaneCheckbox.js ***!
  \***********************************************************************************************/
/*! exports provided: PropertyPaneCheckbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneCheckbox", function() { return PropertyPaneCheckbox; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "3ZYD");
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

/***/ "ruV7":
/*!************************************!*\
  !*** ./lib/core/WebPartContext.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _BaseWebPartContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BaseWebPartContext */ "+wJ3");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * Web part context.
 */




/**
 * Web part context object. This object contains the contextual services available to a web part. e.g.
 * a contextual instance to the http client.
 *
 * @public
 */
var WebPartContext = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WebPartContext, _super);
    /** @internal */
    function WebPartContext(parameters) {
        var _this = _super.call(this, parameters) || this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(parameters.domElement, "webpart context domElement");
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(parameters.statusRenderer, 'webpart context statusRenderer');
        _this._domElement = parameters.domElement;
        _this._statusRenderer = parameters.statusRenderer;
        // Assert the type to ignore the missing const enums in our internal teamsJs namespace
        _this._teams = parameters.microsoftTeams;
        _this._sdks = parameters.sdks;
        return _this;
    }
    Object.defineProperty(WebPartContext.prototype, "domElement", {
        /**
         * Reference to the DOM element that hosts this client-side component.
         */
        get: function () { return this._domElement; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebPartContext.prototype, "sdks", {
        /**
         * {@inheritdoc ISDKs}
         */
        get: function () {
            return this._sdks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebPartContext.prototype, "statusRenderer", {
        /**
         * Web part status renderer.
         */
        get: function () { return this._statusRenderer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebPartContext.prototype, "microsoftTeams", {
        /**
         * Contextual information about the current Microsoft Teams tab. This object will only be defined if
         * a component is being hosted in Microsoft Teams.
         *
         * @remarks
         * For more information, please see:
         * {@link https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/?view=msteams-client-js-latest}
         * @public
         * @deprecated - This function has been deprecated
         */
        get: function () {
            return this._teams;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @deprecated - This function has been deprecated
     *
     * @internal
     */
    WebPartContext.prototype._setTeams = function (teams) {
        this._teams = teams;
    };
    WebPartContext = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["sealed"]
    ], WebPartContext);
    return WebPartContext;
}(_BaseWebPartContext__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (WebPartContext);


/***/ }),

/***/ "s9GF":
/*!**********************************************!*\
  !*** ./lib/core/styles/cswp-base.module.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./cswp-base.module.css */ "65Hp");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

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

/***/ "tstL":
/*!*******************************************************************************************************!*\
  !*** ../sp-property-pane/lib/propertyPaneFields/propertyPaneDynamicField/PropertyPaneDynamicField.js ***!
  \*******************************************************************************************************/
/*! exports provided: PropertyPaneDynamicField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneDynamicField", function() { return PropertyPaneDynamicField; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "3ZYD");
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

/***/ "u2P9":
/*!************************************!*\
  !*** ./lib/core/ViewportLoader.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../common/Flights */ "w4+A");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../common/KillSwitches */ "+ORw");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loc/Strings.resx */ "LHST");
// Copyright (c) Microsoft. All rights reserved.






// TODO: VSO#421046 ViewportLoader adopt ScrollEventHandler after Ignite fork on 9/8/17
/**
 * The source which triggered loading of the web part.
 */
var WebPartLoadSource;
(function (WebPartLoadSource) {
    /**
     * Web part is loaded during register as it was found in viewport.
     */
    WebPartLoadSource[WebPartLoadSource["viewport"] = 1] = "viewport";
    /**
     * Web part is loaded due to scroll.
     */
    WebPartLoadSource[WebPartLoadSource["scroll"] = 2] = "scroll";
    /**
     * Web part is loaded for loading outside viewport once viewport web parts are rendered.
     */
    WebPartLoadSource[WebPartLoadSource["loadOutsideViewport"] = 3] = "loadOutsideViewport";
})(WebPartLoadSource || (WebPartLoadSource = {}));
var INTERSECTION_OBSERVER = 'IntersectionObserver';
/**
 * Class that helps lazy loading of web parts. This class centrally manages
 * registered web parts to be rendered lazily when in the viewport. i.e. Web parts
 * that are not in the view port will not be rendered on the initial load. They will
 * be rendered only when the user scrolls to the web part. This class manages the
 * scroll/resize event handling and notification to the web parts to render when
 * they are near the viewport.
 *
 * E.g. Modern pages web parts in viewport will be loaded. All other web parts are
 * lazily loaded when the user scrolls the view port and that perticular web part is
 * in the view.
 *
 * @internal
 */
var ViewportLoader = /** @class */ (function () {
    /**
    * Private Contructor of singleton class
    */
    function ViewportLoader() {
        /**
         * Registered web parts.
         */
        this._webparts = new Set();
        this._observerMap = new Map();
        /**
         * This attribute managed the number of scroll event handlers that are registered to
         * a scrollable parent. When the number of events becomes zero, the event handler is
         * unregistered.
         */
        this._lazyLoadedTrackerAttribute = 'data-sp-webpart-lazycount';
        this.SCROLL = 'scroll';
        this.RESIZE = 'resize';
        this._isInitialized = false;
        this._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogSource"].create('ViewportLoader');
        this._isListeningWindow = false;
        /**
         * These are the web parts being loaded proactivery by increasing viewport offset.
         * It is used to track when all are rendered so viewport offset can be increased further.
         */
        this._offsetWebpartsToLoad = [];
        this._bind();
        ViewportLoader._useIntersectionObserver = !!window[INTERSECTION_OBSERVER];
        if (ViewportLoader._useIntersectionObserver) {
            this._observer = new IntersectionObserver(this._onObserved, { threshold: [0.01] });
        }
    }
    Object.defineProperty(ViewportLoader, "deprecatedInstance", {
        /**
         * Singleton instance of the original, web part-specific viewport loader.
         */
        get: function () {
            // Lazy initialize the singleton
            if (ViewportLoader._instance === undefined) {
                ViewportLoader._instance = new ViewportLoader();
            }
            return ViewportLoader._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns true if the web part is in the initial page viewport.
     */
    ViewportLoader.isInInitialViewport = function (webpart) {
        if (ViewportLoader.optimizeViewportLoader()) {
            return webpart._registeredInViewport;
        }
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Validate"].isNotNullOrUndefined(webpart, 'webpart');
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        var top = webpart.domElement && webpart.domElement.getBoundingClientRect().top;
        // 10% Offset from the bottom of the viewport for which we want to ignore from EUPL.
        // So web part top should be at least 10% above from bottom to be counted into viewport
        var euplViewportOffset = Math.floor(viewportHeight * 0.1);
        if ((window.pageYOffset + top) < (viewportHeight - euplViewportOffset)) {
            return true;
        }
        return false;
    };
    ViewportLoader.optimizeViewportLoader = function () {
        if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_2__["default"].isIE11IntersectionObserverBugFixEnabled()) {
            return !!window[INTERSECTION_OBSERVER];
        }
        else {
            return ViewportLoader._useIntersectionObserver;
        }
    };
    /**
     * Determines if a web part should be lazily loaded and register such web parts.
     */
    ViewportLoader.prototype.register = function (webpart, scrollableParent) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Validate"].isNotNullOrUndefined(webpart, 'webpart');
        webpart._registeredInViewport = false;
        if (!this._isInitialized) {
            this._initialize();
        }
        if (ViewportLoader.optimizeViewportLoader() && _common_Flights__WEBPACK_IMPORTED_MODULE_1__["Flights"].isSyncLoadWebpartInViewportEnabled()) {
            this._webparts.add(webpart);
        }
        this._checkVisibilityAndRender(webpart, WebPartLoadSource.viewport);
        // The web part is in the view port and has started rendering.
        if (webpart._registeredInViewport) {
            return;
        }
        // Use if scrollable parent is provided, as that is more performant.
        var parents = scrollableParent ? [scrollableParent] : this._findScrollableParents(webpart.domElement);
        // We want to listen to the scrollable parent's scroll event, if one exists.
        parents.forEach(function (parent, index, allPatents) {
            var count = _this._updateRegisteredChildren(parent, 1);
            // We want to add event listener once per common scrollable parent of web parts.
            if (count === 1) {
                _this._listenEvents(parent);
            }
        });
        this._listenEvents(window);
        if (!ViewportLoader.optimizeViewportLoader() || !_common_Flights__WEBPACK_IMPORTED_MODULE_1__["Flights"].isSyncLoadWebpartInViewportEnabled()) {
            this._webparts.add(webpart);
        }
        if (!!this._noMoreLazy) {
            // By this time, Viewport loader has loaded all web parts registered and now received request to load one
            // more web part. Mark _noMoreLazy to false so we know ViewportLoader is again in the business of loading
            // outside the viewport.
            // Even in no more lazy state, we use this channel to load web parts to ensure we don't end up loading a web part
            // at far bottom of the page before one just below view port.
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(this._logSource, 'Web part to load after no more lazy state');
            this._noMoreLazy = false;
            this._loadOutsideViewPort();
        }
    };
    /**
     * Render web part if in the waiting queue of viewport loader
     * @param webPart
     */
    ViewportLoader.prototype.release = function (webPart) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Validate"].isNotNullOrUndefined(webPart, 'release Web part');
        if (this._webparts.has(webPart)) {
            this._renderWebpartInViewport(webPart, WebPartLoadSource.viewport);
            this.unregister(webPart);
            return true;
        }
        return false;
    };
    /**
     * Unregister a loaded web part which should not be tracked any more.
     */
    ViewportLoader.prototype.unregister = function (webpart) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Validate"].isNotNullOrUndefined(webpart, 'unregister Web part');
        if (!this._webparts.has(webpart)) {
            return;
        }
        this._webparts.delete(webpart);
        var parents = this._findScrollableParents(webpart.domElement);
        parents.forEach(function (parent, index, allParents) {
            var count = _this._updateRegisteredChildren(parent, -1);
            if (count <= 0) {
                _this._unlistenEvents(parent);
            }
        });
        if (this._webparts.size === 0 && !!this._noMoreLazy) {
            // Done loading all lazily loaded web parts.
            this._unlistenEvents(window);
            this._dispose();
        }
    };
    /**
     * Load registered web parts not in the viewport, by gradually increasing viewport offset.
     */
    ViewportLoader.prototype.loadOutsideViewPort = function () {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(this._logSource, "loadOutsideViewPort is called to load rest of the " + this._webparts.size + " web parts");
        this._loadOutsideViewPort();
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(this._logSource, "loadOutsideViewPort is completed");
    };
    /**
     * Bind all functions to this instance
     */
    ViewportLoader.prototype._bind = function () {
        this.register = this.register.bind(this);
        this.unregister = this.unregister.bind(this);
        this._checkVisibilityAndRender = this._checkVisibilityAndRender.bind(this);
        this._dispose = this._dispose.bind(this);
        this._findScrollableParent = this._findScrollableParent.bind(this);
        this._findScrollableParents = this._findScrollableParents.bind(this);
        this._initialize = this._initialize.bind(this);
        this._isCloseToViewport = this._isCloseToViewport.bind(this);
        this._renderWebpartInViewport = this._renderWebpartInViewport.bind(this);
        this._unlistenEvents = this._unlistenEvents.bind(this);
        this._updateRegisteredChildren = this._updateRegisteredChildren.bind(this);
        this._loadOutsideViewPort = this._loadOutsideViewPort.bind(this);
        this._onObserved = this._onObserved.bind(this);
    };
    /**
     * Event handler which is called upon scroll and resize events.
     */
    ViewportLoader.prototype._lazyLoaderEventHandler = function () {
        this._loadWebPartsInViewport(WebPartLoadSource.scroll);
    };
    ViewportLoader.prototype._loadWebPartsInViewport = function (loadSource) {
        var _this = this;
        if (!this._webparts || this._webparts.size === 0) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(this._logSource, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].LazyEventOnNoLazyWebpart, 'InViewportHandler');
            return;
        }
        this._webparts.forEach(function (value, index, theSet) {
            _this._checkVisibilityAndRender(value, loadSource);
        });
    };
    /**
    * Handler to start rendering web part if it is close enough to the viewport.
    */
    ViewportLoader.prototype._checkVisibilityAndRender = function (webPart, loadSource) {
        // This webpart has already been loaded, just unregister if not already.
        if (webPart._registeredInViewport) {
            this.unregister(webPart);
            return;
        }
        if (ViewportLoader.optimizeViewportLoader()) {
            this._observerMap.set(webPart.domElement, webPart);
            this._observer.observe(webPart.domElement);
            // Load sync if already in viewport
            this._onObserved(this._observer.takeRecords());
        }
        else if (this._isCloseToViewport(webPart.domElement)) {
            this._renderWebpartInViewport(webPart, loadSource);
            this.unregister(webPart);
        }
    };
    ViewportLoader.prototype._onObserved = function (observedEntries) {
        var _this = this;
        observedEntries.forEach(function (entry) {
            if ((entry.isIntersecting || entry.intersectionRatio > 0) && entry.boundingClientRect) {
                _this._observer.unobserve(entry.target);
                var webPart = _this._observerMap.get(entry.target);
                if (webPart) {
                    _this._observerMap.delete(entry.target);
                    _this.release(webPart);
                }
            }
        });
    };
    /**
    * Check if web part is close enough to the viewport to be shown.
    */
    ViewportLoader.prototype._isCloseToViewport = function (webpartNode) {
        try {
            var parent_1 = this._findScrollableParent(webpartNode);
            var _a = webpartNode.getBoundingClientRect(), top_1 = _a.top, height = _a.height;
            var documentHeight = window.innerHeight || document.documentElement.clientHeight;
            if (!parent_1) {
                // There is no overflow parent, check distance from window
                var topInOrAboveViewport = (top_1 - this._offset) <= documentHeight;
                var bottomNotAboveViewport = (top_1 + height + this._offset) >= 0;
                return topInOrAboveViewport && bottomNotAboveViewport;
            }
            // tslint:disable-next-line:no-use-before-declare
            var _b = parent_1.getBoundingClientRect(), parentTop = _b.top, parentHeight = _b.height;
            // Parent and viewport's intersection. 0 is top of the viewport
            var parentIntersectionTop = Math.max(0, parentTop);
            var parentIntersectionHeight = Math.min(parentTop + parentHeight, documentHeight) - parentIntersectionTop;
            // element's top relative to intersection
            var offsetTop = top_1 - parentIntersectionTop;
            var parentTopInOrAboveViewport = (offsetTop - this._offset) <= parentIntersectionHeight;
            var parentBottomNotAboveViewport = (offsetTop + height + this._offset) >= 0;
            return parentTopInOrAboveViewport && parentBottomNotAboveViewport;
        }
        catch (error) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(this._logSource, error);
            // We want to avoid lazy loading as a fallback
            return true;
        }
    };
    /**
    * Returns all scrollable parent DOM Elements of the given element
    */
    ViewportLoader.prototype._findScrollableParents = function (startingElement) {
        var parents = [];
        var parent = startingElement;
        while (parent) {
            parent = this._findScrollableParent(parent);
            if (parent) {
                parents.push(parent);
                parent = parent.parentElement;
            }
        }
        return parents;
    };
    /**
     * Traverses up the DOM tree for the element with the data-is-scrollable=true attribute,
     * or return the window object.
     */
    ViewportLoader.prototype._findScrollableParent = function (startingElement) {
        var DATA_IS_SCROLLABLE_ATTRIBUTE = 'data-is-scrollable';
        var el = startingElement;
        var body = document.body;
        // First do a quick scan for the scrollable attribute.
        while (el && el !== body) {
            if (el.getAttribute(DATA_IS_SCROLLABLE_ATTRIBUTE) === 'true') {
                return el;
            }
            el = el.parentElement;
        }
        // If we haven't found it, the use the slower method: compute styles to evaluate if overflow is set.
        el = startingElement;
        while (el && el !== body) {
            if (el.getAttribute(DATA_IS_SCROLLABLE_ATTRIBUTE) !== 'false') {
                var styles = getComputedStyle(el);
                if (styles) {
                    var overflowY = styles.getPropertyValue('overflow-y');
                    if (overflowY && (overflowY === this.SCROLL || overflowY === 'auto')) {
                        return el;
                    }
                }
            }
            el = el.parentElement;
        }
        // Fall back to window scroll.
        if (!el || el === body) {
            el = undefined;
        }
        return el;
    };
    ViewportLoader.prototype._initialize = function () {
        this._offset = 0;
        this._initTime = new Date();
        this._lazyHandler = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__["throttle"](this._lazyLoaderEventHandler, 100).bind(this);
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(this._logSource, 'ViewportLoader is Initialized');
        this._isInitialized = true;
    };
    ViewportLoader.prototype._dispose = function () {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(this._logSource, 'ViewportLoader is disposed');
        var timeSpent = (new Date()).getTime() - this._initTime.getTime();
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_EngagementLogger"].logEvent('Webpart.ViewportLoad.Completed', timeSpent.toString());
        this._isInitialized = false;
        this._initTime = undefined;
    };
    /**
    * Start listening to scroll and resize events. It is safe to call this API multiple times on a DOM
    * element, it does not lead to multiple attached events.
    */
    ViewportLoader.prototype._listenEvents = function (parent) {
        if (!parent) {
            return;
        }
        var isWindow = parent === window;
        if (!isWindow || (isWindow && !this._isListeningWindow)) {
            this._addEventListerer(parent);
            if (isWindow) {
                this._isListeningWindow = true;
            }
        }
    };
    /**
     * Add Listener to scroll and resize events for given element or window
     */
    ViewportLoader.prototype._addEventListerer = function (element) {
        element.addEventListener(this.SCROLL, this._lazyHandler, false);
        element.addEventListener(this.RESIZE, this._lazyHandler, false);
    };
    /**
    * Stop listening to scroll and resize events.
    */
    ViewportLoader.prototype._unlistenEvents = function (parent) {
        if (!parent) {
            return;
        }
        var isWindow = parent === window;
        if (!isWindow || (isWindow && this._isListeningWindow)) {
            this._removeEventListener(parent);
            if (isWindow) {
                this._isListeningWindow = false;
            }
        }
    };
    /**
     * Remove Listeners from scroll and resize events for given element or window
     */
    ViewportLoader.prototype._removeEventListener = function (element) {
        element.removeEventListener(this.SCROLL, this._lazyHandler);
        element.removeEventListener(this.RESIZE, this._lazyHandler);
    };
    /**
     * It keeps track of how many lazily loaded children are registered to a scrollable parent.
     * This record keeping is required to deregister event handler from the parent when There
     * are no children listening to events.
     */
    ViewportLoader.prototype._updateRegisteredChildren = function (element, count) {
        var lazyChilds = count + Number(element.getAttribute(this._lazyLoadedTrackerAttribute));
        if (count !== 0) {
            element.setAttribute(this._lazyLoadedTrackerAttribute, lazyChilds.toString());
        }
        return lazyChilds;
    };
    /**
     * Ask web part to load.
     */
    ViewportLoader.prototype._renderWebpartInViewport = function (webpart, loadSource) {
        if (webpart && !webpart._registeredInViewport) {
            webpart._onInViewport();
            switch (loadSource) {
                case WebPartLoadSource.viewport:
                    webpart._registeredInViewport = true;
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(this._logSource, 'Web part is loaded in initial viewport.');
                    break;
            }
        }
    };
    /**
     * Load registered web parts not in the viewport, by gradually increasing viewport offset.
     * It also tracks when web parts are rendered to reduce the gap between increasing offset
     */
    ViewportLoader.prototype._loadOutsideViewPort = function () {
        var _this = this;
        if (!this._webparts || this._webparts.size === 0) {
            // Done loading all web parts, take note of this state.
            this._noMoreLazy = true;
            return;
        }
        if (ViewportLoader.optimizeViewportLoader()) {
            this._webparts.forEach(function (webpart, index, theSet) { return ViewportLoader.deprecatedInstance.release(webpart); });
            this._noMoreLazy = true;
            return;
        }
        for (var index = 0; this._offsetWebpartsToLoad && index < this._offsetWebpartsToLoad.length; index++) {
            if (!this._offsetWebpartsToLoad[index]._renderedOnce) {
                // Stil some web part has not loaded, lets wait to recheck again after 100 ms
                window.setTimeout(this._loadOutsideViewPort, 100);
                return;
            }
        }
        // All web parts renderd, empty the array for next lot and increase offset by 2 page height
        this._offsetWebpartsToLoad = [];
        var documentHeight = window.innerHeight || document.documentElement.clientHeight;
        this._offset = this._offset + documentHeight * 2;
        this._webparts.forEach(function (webpart, index, theSet) {
            if (_this._isCloseToViewport(webpart.domElement)) {
                _this._offsetWebpartsToLoad.push(webpart);
            }
        });
        // We are done increasing the offset, let Viewport loader do it's job now.
        this._loadWebPartsInViewport(WebPartLoadSource.loadOutsideViewport);
        // Check if more to be done
        if (this._webparts.size > 0) {
            // Not using setTimeout here to reduce wait period when web parts already rendered,
            // say because they are sync rendered.
            this._loadOutsideViewPort();
        }
        else {
            // Done loading all web parts, take note of this state.
            this._noMoreLazy = true;
        }
    };
    return ViewportLoader;
}());
/* harmony default export */ __webpack_exports__["default"] = (ViewportLoader);


/***/ }),

/***/ "ut3N":
/*!********************************************!*\
  !*** external "@microsoft/sp-diagnostics" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ut3N__;

/***/ }),

/***/ "vGCF":
/*!**************************************************!*\
  !*** ./lib/core/styles/cswp-base.module.scss.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./cswp-base.module.css */ "s9GF");
var styles = {
    errorBox: 'errorBox_c25b5cc7',
    errorBoxText: 'errorBoxText_c25b5cc7',
    detailsButton: 'detailsButton_c25b5cc7',
    somethingWentWrongText: 'somethingWentWrongText_c25b5cc7',
    siteAdminText: 'siteAdminText_c25b5cc7',
    screenReaderOnly: 'screenReaderOnly_c25b5cc7'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "vlHk":
/*!***********************************************************************************************************!*\
  !*** ../sp-property-pane/lib/propertyPaneFields/propertyPaneHorizontalRule/PropertyPaneHorizontalRule.js ***!
  \***********************************************************************************************************/
/*! exports provided: PropertyPaneHorizontalRule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneHorizontalRule", function() { return PropertyPaneHorizontalRule; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "3ZYD");
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

/***/ "w/wA":
/*!***************************************************************************************!*\
  !*** ../sp-property-pane/lib/propertyPaneFields/propertyPaneLink/PropertyPaneLink.js ***!
  \***************************************************************************************/
/*! exports provided: PropertyPaneLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneLink", function() { return PropertyPaneLink; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "3ZYD");
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
    Flights.isPaintStravationEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1618 /* SPPPlatPaintStarvationSPClient */);
    };
    Flights.isSyncLoadWebpartInViewportEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1204 /* SOXSyncLoadWebpartInViewport */);
    };
    Flights.isLoadIndicatorOnDemandEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1279 /* WexPagePerfLoadingIndicator */);
    };
    return Flights;
}());



/***/ }),

/***/ "w8Nz":
/*!*****************************************************************************************************!*\
  !*** ../sp-property-pane/lib/propertyPaneFields/propertyPaneCustomField/PropertyPaneCustomField.js ***!
  \*****************************************************************************************************/
/*! exports provided: PropertyPaneCustomField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPaneCustomField", function() { return PropertyPaneCustomField; });
/* harmony import */ var _propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propertyPaneField/IPropertyPaneField */ "3ZYD");
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

/***/ "wdlX":
/*!*****************************************************!*\
  !*** ./lib/core/ClientSideWebPartManagerFactory.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ClientSideWebPartMaintenanceModeManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ClientSideWebPartMaintenanceModeManager */ "l2n5");
/* harmony import */ var _ClientSideWebPartManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ClientSideWebPartManager */ "OASt");




/**
 * The ClientSideWebPartManagerFactory is the web part manager instance used
 * when the web parts are rendered in maintenance mode.
 *
 * @internal
 */
var ClientSideWebPartManagerFactory = /** @class */ (function () {
    function ClientSideWebPartManagerFactory() {
    }
    ClientSideWebPartManagerFactory.create = function (host) {
        if (_ClientSideWebPartManager__WEBPACK_IMPORTED_MODULE_3__["default"].isMaintenanceMode) {
            return new _ClientSideWebPartMaintenanceModeManager__WEBPACK_IMPORTED_MODULE_2__["default"](host);
        }
        else {
            return new _ClientSideWebPartManager__WEBPACK_IMPORTED_MODULE_3__["default"](host);
        }
    };
    ClientSideWebPartManagerFactory = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["sealed"]
    ], ClientSideWebPartManagerFactory);
    return ClientSideWebPartManagerFactory;
}());
/* harmony default export */ __webpack_exports__["default"] = (ClientSideWebPartManagerFactory);


/***/ }),

/***/ "wxtz":
/*!****************************************!*\
  !*** external "@microsoft/decorators" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_wxtz__;

/***/ }),

/***/ "ybLs":
/*!******************************************!*\
  !*** ./lib/core/error/SPWebPartError.js ***!
  \******************************************/
/*! exports provided: SPWebPartErrorCode, SPWebPartError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPWebPartErrorCode", function() { return SPWebPartErrorCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPWebPartError", function() { return SPWebPartError; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../loc/Strings.resx */ "LHST");
/**
 * @copyright (c) Microsoft Corporation. All rights reserved.
 *
 * WellKnown error codes used by the SharePoint client webpart framework.
 */




/*
 * Web part error codes.
 */
var SPWebPartErrorCode;
(function (SPWebPartErrorCode) {
    // params: none
    SPWebPartErrorCode[SPWebPartErrorCode["ModuleUndefined"] = 0] = "ModuleUndefined";
    // params: web part tag, module list.
    SPWebPartErrorCode[SPWebPartErrorCode["ModuleNotLoaded"] = 1] = "ModuleNotLoaded";
    // params: web part tag.
    SPWebPartErrorCode[SPWebPartErrorCode["IncorrectBoostrapModule"] = 2] = "IncorrectBoostrapModule";
    // params: web part tag, method name
    SPWebPartErrorCode[SPWebPartErrorCode["MissingExpectedWebPartMemberError"] = 3] = "MissingExpectedWebPartMemberError";
    // params: web part tag.
    SPWebPartErrorCode[SPWebPartErrorCode["NonBaseWebPart"] = 4] = "NonBaseWebPart";
    // params: error message.
    SPWebPartErrorCode[SPWebPartErrorCode["ScriptLoadError"] = 5] = "ScriptLoadError";
    // params: none
    SPWebPartErrorCode[SPWebPartErrorCode["ManifestDownloadFailed"] = 6] = "ManifestDownloadFailed";
    // params: web part tag.
    SPWebPartErrorCode[SPWebPartErrorCode["ManifestNull"] = 7] = "ManifestNull";
    // params: web part instance id.
    SPWebPartErrorCode[SPWebPartErrorCode["ManifestInvalid"] = 8] = "ManifestInvalid";
    // params: none.
    SPWebPartErrorCode[SPWebPartErrorCode["BaseConstructError"] = 9] = "BaseConstructError";
    // params: web part tag.
    SPWebPartErrorCode[SPWebPartErrorCode["MustOverrideRender"] = 10] = "MustOverrideRender";
    // params: web part tag.
    SPWebPartErrorCode[SPWebPartErrorCode["NotInitializedError"] = 11] = "NotInitializedError";
    // params: web part tag.
    SPWebPartErrorCode[SPWebPartErrorCode["PropertyBagNull"] = 12] = "PropertyBagNull";
    // params:  web part tag.
    SPWebPartErrorCode[SPWebPartErrorCode["OnAfterDeserializeReturnedNull"] = 13] = "OnAfterDeserializeReturnedNull";
    // params:  web part tag.
    SPWebPartErrorCode[SPWebPartErrorCode["OnInitReturnedNullPromise"] = 14] = "OnInitReturnedNullPromise";
    // params: none.
    SPWebPartErrorCode[SPWebPartErrorCode["ReadOnlyProperty"] = 15] = "ReadOnlyProperty";
    // params: web part tag.
    SPWebPartErrorCode[SPWebPartErrorCode["SerializationFailed"] = 16] = "SerializationFailed";
    // params: web part tag.
    SPWebPartErrorCode[SPWebPartErrorCode["FirstTimeRenderCalledMoreThanOnce"] = 17] = "FirstTimeRenderCalledMoreThanOnce";
    // params: web part tag.
    SPWebPartErrorCode[SPWebPartErrorCode["RenderCompletedCallNotCalled"] = 18] = "RenderCompletedCallNotCalled";
    // params: invalid splink attribute format.
    SPWebPartErrorCode[SPWebPartErrorCode["InvalidSPLinkAttributeFormat"] = 19] = "InvalidSPLinkAttributeFormat";
    // params: splink index.
    SPWebPartErrorCode[SPWebPartErrorCode["InvalidSPLinkIndex"] = 20] = "InvalidSPLinkIndex";
    // params: web part tag.
    SPWebPartErrorCode[SPWebPartErrorCode["GetDataReturnedNullPromise"] = 21] = "GetDataReturnedNullPromise";
    // params: web part tag.
    SPWebPartErrorCode[SPWebPartErrorCode["RenderPromiseUndefined"] = 22] = "RenderPromiseUndefined";
    // params: web part tag.
    SPWebPartErrorCode[SPWebPartErrorCode["RenderTimeout"] = 23] = "RenderTimeout";
})(SPWebPartErrorCode || (SPWebPartErrorCode = {}));
/**
 * Web part errors.
 *
 * @internal
 */
var SPWebPartError = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SPWebPartError, _super);
    /**
     * Constructor for the SPWebPartError class.
     *
     * @param errorCode - a numeric error code of type SPWebPartErrorCode.
     * @param logProperties - (optional) additional properties that can be used to troubleshoot rare to repro bugs.
     * @param params - Error message params.
     *
     */
    /* tslint:disable:no-any */
    function SPWebPartError(errorCode, logProperties) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        var _this = this;
        var webPartErrorCode = errorCode;
        if (webPartErrorCode) {
            _this = _super.call(this, SPWebPartErrorCode[webPartErrorCode], _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Text"].format(SPWebPartError_1._errorCodeToMessageMap.get(webPartErrorCode), params), logProperties) || this;
            // Manually set the prototype, as we can no longer extend built-in classes like Error, Array, Map, etc
            // tslint:disable-next-line:max-line-length
            // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
            //
            // Note: the prototype must also be set on any classes which extend this one
            _this.__proto__ = SPWebPartError_1.prototype; // tslint:disable-line:no-any
            _this._id = webPartErrorCode;
        }
        return _this;
    }
    SPWebPartError_1 = SPWebPartError;
    Object.defineProperty(SPWebPartError.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPWebPartError.prototype, "category", {
        /**
         * Returns 'SPWebPartErrorCode'.
         */
        get: function () {
            return 'SPWebPartErrorCode';
        },
        enumerable: true,
        configurable: true
    });
    /* tslint:disable-next-line:no-any */
    SPWebPartError.create = function (errorCode) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return new SPWebPartError_1(errorCode, undefined, params);
    };
    SPWebPartError.createWithLogProperties = function (errorCode, logProperties) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        return new SPWebPartError_1(errorCode, logProperties, params);
    };
    var SPWebPartError_1;
    /**
     * Error id to string map
     */
    SPWebPartError._errorCodeToMessageMap = new Map([
        [SPWebPartErrorCode.ModuleUndefined, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].UndefinedModuleError],
        [SPWebPartErrorCode.ModuleNotLoaded, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].ModuleNotLoadedError],
        [SPWebPartErrorCode.IncorrectBoostrapModule, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].IncorrectBoostrapModuleError],
        [SPWebPartErrorCode.MissingExpectedWebPartMemberError, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].MissingExpectedWebPartMemberError],
        [SPWebPartErrorCode.NonBaseWebPart, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].NonBaseWebPartError],
        [SPWebPartErrorCode.ScriptLoadError, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].ScriptLoadErrorTemplate],
        [SPWebPartErrorCode.ManifestDownloadFailed, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].ManifestDownloadFailed],
        [SPWebPartErrorCode.ManifestNull, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].ManifestNullError],
        [SPWebPartErrorCode.ManifestInvalid, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].ManifestInvalidError],
        [SPWebPartErrorCode.BaseConstructError, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].BaseConstructError],
        [SPWebPartErrorCode.MustOverrideRender, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].MustOverrideRenderError],
        [SPWebPartErrorCode.NotInitializedError, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].NotIntializedError],
        [SPWebPartErrorCode.PropertyBagNull, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].PropertyBagNullError],
        [SPWebPartErrorCode.OnAfterDeserializeReturnedNull, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].OnAfterDeserializeReturnedNull],
        [SPWebPartErrorCode.OnInitReturnedNullPromise, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].OnInitReturnedNullPromise],
        [SPWebPartErrorCode.ReadOnlyProperty, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].ReadOnlyPropertyError],
        [SPWebPartErrorCode.SerializationFailed, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].SerializationFailedError],
        [SPWebPartErrorCode.FirstTimeRenderCalledMoreThanOnce, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].FirstTimeRenderCalledMoreThanOnceError],
        [SPWebPartErrorCode.RenderCompletedCallNotCalled, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].RenderCompletedCallNotCalledError],
        [SPWebPartErrorCode.InvalidSPLinkAttributeFormat, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].InvalidSPLinkAttributeFormatError],
        [SPWebPartErrorCode.InvalidSPLinkIndex, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].InvalidSPLinkIndexError],
        [SPWebPartErrorCode.RenderPromiseUndefined, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].RenderPromiseUndefinedError],
        [SPWebPartErrorCode.RenderTimeout, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].RenderTimeout]
    ] /* fix this typecast, VSO:397687 */);
    SPWebPartError = SPWebPartError_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["sealed"]
    ], SPWebPartError);
    return SPWebPartError;
}(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["SPError"]));



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

/***/ "@ms/sp-load-themed-styles":
/*!********************************************!*\
  !*** external "@ms/sp-load-themed-styles" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_load_themed_styles__;

/***/ }),

/***/ "@ms/sp-telemetry":
/*!***********************************!*\
  !*** external "@ms/sp-telemetry" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_telemetry__;

/***/ })

/******/ })});;
//# sourceMappingURL=sp-webpart-base_en-us.js.map