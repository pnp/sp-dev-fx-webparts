define("8494e7d7-6b99-47b2-a741-59873e42f16f_4.0.19", ["@microsoft/load-themed-styles","@microsoft/office-ui-fabric-react-bundle","@microsoft/sp-core-library","@microsoft/sp-diagnostics","@microsoft/sp-http","@microsoft/sp-lodash-subset","@microsoft/sp-page-context","@ms/i18n-utilities","@ms/odsp-utilities-bundle","@ms/sp-a11y","@ms/sp-telemetry","@ms/uifabric-styling-bundle","react","react-dom"], function(__WEBPACK_EXTERNAL_MODULE__microsoft_load_themed_styles__, __WEBPACK_EXTERNAL_MODULE__microsoft_office_ui_fabric_react_bundle__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_core_library__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_diagnostics__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_http__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_lodash_subset__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_page_context__, __WEBPACK_EXTERNAL_MODULE__ms_i18n_utilities__, __WEBPACK_EXTERNAL_MODULE__ms_odsp_utilities_bundle__, __WEBPACK_EXTERNAL_MODULE__ms_sp_a11y__, __WEBPACK_EXTERNAL_MODULE__ms_sp_telemetry__, __WEBPACK_EXTERNAL_MODULE__ms_uifabric_styling_bundle__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./sp-component-utilities.js");
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
    "_1Ou/gGCxybOVkfKauk4ZuQ": {
      "RelativeDateTime_DayAndTime": "{0} at {1}"
    },
    "_a3W+FXOqBm43qmT906SM6g": {
      "DialogCloseButtonLabel": "Close",
      "GenericErrorTitle": "Could not complete that action ",
      "DialogSaveButtonLabel": "Save",
      "DialogYesButtonLabel": "Yes",
      "DialogNoButtonLabel": "No"
    },
    "_hMVyVJ8VXd7+VBXtkz5V0w": {
      "CloseButtonAriaLabel": "Close"
    },
    "_tkE1T1OGzhOW2Gh5iEm/nQ": {
      "FileTypeIconAlternateText": "{0} file."
    },
    "_H+aT+QCAdZJ1mZZHM8TaAA": {
      "ErrorNoMorePromises": "***No more promises to handle in Smart Race."
    }
  };

  strings.default = strings;
  return strings;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sp-component-utilities.js":
/*!***********************************!*\
  !*** ./sp-component-utilities.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! @ms/sp-telemetry */ "@ms/sp-telemetry"),__webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "@microsoft/office-ui-fabric-react-bundle"),__webpack_require__(/*! @microsoft/sp-lodash-subset */ "@microsoft/sp-lodash-subset"),__webpack_require__(/*! @microsoft/sp-core-library */ "@microsoft/sp-core-library"),__webpack_require__(/*! @microsoft/sp-page-context */ "@microsoft/sp-page-context"),__webpack_require__(/*! @ms/i18n-utilities */ "@ms/i18n-utilities"),__webpack_require__(/*! react */ "react"),__webpack_require__(/*! react-dom */ "react-dom"),__webpack_require__(/*! @ms/uifabric-styling-bundle */ "@ms/uifabric-styling-bundle"),__webpack_require__(/*! @microsoft/load-themed-styles */ "@microsoft/load-themed-styles"),__webpack_require__(/*! @microsoft/sp-diagnostics */ "@microsoft/sp-diagnostics"),__webpack_require__(/*! @microsoft/sp-http */ "@microsoft/sp-http"),__webpack_require__(/*! resx-strings */ "../lib/resx-strings/en-us.js"),__webpack_require__(/*! @ms/odsp-utilities-bundle */ "@ms/odsp-utilities-bundle"),__webpack_require__(/*! @ms/sp-a11y */ "@ms/sp-a11y")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(__WEBPACK_EXTERNAL_MODULE__2q6Q__, __WEBPACK_EXTERNAL_MODULE_KL1q__, __WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_X_PM__, __WEBPACK_EXTERNAL_MODULE_Ycni__, __WEBPACK_EXTERNAL_MODULE_cDcd__, __WEBPACK_EXTERNAL_MODULE_faye__, __WEBPACK_EXTERNAL_MODULE_fglE__, __WEBPACK_EXTERNAL_MODULE_jOlS__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_vlQI__, __WEBPACK_EXTERNAL_MODULE_vpy3__, __WEBPACK_EXTERNAL_MODULE_y88i__, __WEBPACK_EXTERNAL_MODULE_ytfe__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"sp-component-utilities": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({"vendors~sp-dialog-utils~sp-feature-host":"vendors~sp-dialog-utils~sp-feature-host","vendors~sp-dialog-utils":"vendors~sp-dialog-utils","sp-dialog-utils":"sp-dialog-utils","vendors~sp-feature-host":"vendors~sp-feature-host","sp-feature-host":"sp-feature-host"}[chunkId]||chunkId) + "_" + {"vendors~sp-dialog-utils~sp-feature-host":"dd347dcc9f8c8d1c0f05","vendors~sp-dialog-utils":"38b1f7ae6797cb77c6d9","sp-dialog-utils":"8389648b1b7f16266e28","vendors~sp-feature-host":"d1916028515f09477960","sp-feature-host":"acf151f68eb7a37bca70"}[chunkId] + ".js"
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
/******/ 	var jsonpArray = window["webpackJsonp_8494e7d7_6b99_47b2_a741_59873e42f16f_4_0_19"] = window["webpackJsonp_8494e7d7_6b99_47b2_a741_59873e42f16f_4_0_19"] || [];
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
/******/ 	  var regex = (typeof spScriptNamePattern !== 'undefined') ? spScriptNamePattern : new RegExp('\\/sp-component-utilities(_[a-z0-9-]+)*\\.js', 'i');
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

/***/ "+ERe":
/*!**************************************!*\
  !*** ./lib/layouts/PreviewHelper.js ***!
  \**************************************/
/*! exports provided: PreviewHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviewHelper", function() { return PreviewHelper; });
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _SPConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SPConstants */ "bz/i");
/* harmony import */ var _PreviewUtility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PreviewUtility */ "yqC6");
/* harmony import */ var _ThumbnailUrlGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThumbnailUrlGenerator */ "KCwX");






var PreviewHelper = /** @class */ (function () {
    function PreviewHelper() {
    }
    /**
     * Returns true if the filetype is supported for preview.
     */
    PreviewHelper.hasThumbnailOrFileTypeSupportsPreview = function (fileType, thumbnail) {
        return (!!thumbnail || (!!fileType && _PreviewUtility__WEBPACK_IMPORTED_MODULE_4__["default"].getPreviewSupportedMap.has(fileType.toLowerCase())));
    };
    /**
     * Returns preview image URL for supported file extentions using getPreview.aspx service
     * Note: width parameter is scaled window.devicePixelRatio times to handle high DPI for example
     */
    PreviewHelper.getPreviewImageUrl = function (fileType, thumbnail, baseUrl, path, siteId, webId, uniqueId, width, isBannerImageUrl, callerId, originalWidth, originalHeight) {
        if (false) { var uri; }
        else {
            if (!isBannerImageUrl && _ThumbnailUrlGenerator__WEBPACK_IMPORTED_MODULE_5__["ThumbnailUrlGenerator"].instance.isVROOMThumbnailEnabled()) {
                var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"]("DocVizCaller");
                qosMonitor.writeSuccess({ 'service': callerId || 'unknown' });
            }
            var resolution = _PreviewUtility__WEBPACK_IMPORTED_MODULE_4__["default"].normalizeWidthToResolution(width);
            return PreviewHelper._generateGetPreviewImageUrl(fileType, baseUrl, path, siteId, webId, uniqueId, resolution, isBannerImageUrl, originalWidth, originalHeight);
        }
    };
    PreviewHelper.isImage = function (ext) {
        return _PreviewUtility__WEBPACK_IMPORTED_MODULE_4__["default"].isImage(ext);
    };
    PreviewHelper.isVideo = function (ext) {
        return _PreviewUtility__WEBPACK_IMPORTED_MODULE_4__["default"].isVideo(ext);
    };
    PreviewHelper._generateGetPreviewImageUrl = function (fileType, baseUrl, path, siteId, webId, uniqueId, resolution, isBannerImageUrl, originalWidth, originalHeight) {
        var uri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Uri"]((baseUrl && !!baseUrl.length)
            ? _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Uri"].concatenate(baseUrl, _SPConstants__WEBPACK_IMPORTED_MODULE_3__["spConstants"].previewHandlerPath)
            : _SPConstants__WEBPACK_IMPORTED_MODULE_3__["spConstants"].previewHandlerPath);
        if (!isNaN(resolution)) {
            uri.setQueryParameter(PreviewHelper.RESOLUTION, resolution.toString());
        }
        // Convert to guids for brevity as final URL should be minimal to fit in 255 SP URL limit
        var siteGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].tryParse(siteId);
        var webGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].tryParse(webId);
        var fileGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].tryParse(uniqueId);
        if (siteGuid && webGuid && fileGuid) {
            uri.setQueryParameter(PreviewHelper.GUID_SITE, siteGuid.toString().replace(/-/g, ''));
            uri.setQueryParameter(PreviewHelper.GUID_WEB, webGuid.toString().replace(/-/g, ''));
            uri.setQueryParameter(PreviewHelper.GUID_FILE, fileGuid.toString().replace(/-/g, ''));
        }
        else {
            uri.setQueryParameter(PreviewHelper.PATH, path);
        }
        if (!isBannerImageUrl) {
            uri.setQueryParameter(_PreviewUtility__WEBPACK_IMPORTED_MODULE_4__["default"].CLIENT_TYPE, _PreviewUtility__WEBPACK_IMPORTED_MODULE_4__["default"].MODERN_WEB_PART);
        }
        if (isBannerImageUrl && fileType) {
            uri.setQueryParameter(PreviewHelper.EXT, fileType);
            if (uri.toString().length >= 255) {
                uri.removeQueryParameter(PreviewHelper.EXT);
            }
        }
        if (isBannerImageUrl && originalWidth && originalHeight) {
            uri.setQueryParameter(PreviewHelper.ORIGINAL_WIDTH, originalWidth.toString());
            uri.setQueryParameter(PreviewHelper.ORIGINAL_HEIGHT, originalHeight.toString());
            if (uri.toString().length >= 255) {
                uri.removeQueryParameter(PreviewHelper.ORIGINAL_WIDTH);
                uri.removeQueryParameter(PreviewHelper.ORIGINAL_HEIGHT);
            }
        }
        return uri.toString();
    };
    PreviewHelper.RESOLUTION = 'resolution';
    PreviewHelper.GUID_SITE = 'guidSite';
    PreviewHelper.GUID_WEB = 'guidWeb';
    PreviewHelper.GUID_FILE = 'guidFile';
    PreviewHelper.PATH = 'path';
    PreviewHelper.EXT = 'ext';
    PreviewHelper.ORIGINAL_WIDTH = 'ow';
    PreviewHelper.ORIGINAL_HEIGHT = 'oh';
    PreviewHelper.WIDTH = 'width';
    PreviewHelper.WIDTH_SHORT = 'w';
    PreviewHelper.HEIGHT_SHORT = 'h';
    PreviewHelper.VIEWPORT_LEFT = 'vl';
    PreviewHelper.VIEWPORT_TOP = 'vt';
    PreviewHelper.VIEWPORT_WIDTH = 'vw';
    PreviewHelper.VIEWPORT_HEIGHT = 'vh';
    PreviewHelper.CALLER_STACK = 'cs';
    PreviewHelper.INPUT_FORMAT = 'inputFormat';
    PreviewHelper.DOCID = 'docid';
    return PreviewHelper;
}());



/***/ }),

/***/ "+ORw":
/*!************************************!*\
  !*** ./lib/common/KillSwitches.js ***!
  \************************************/
/*! exports provided: KillSwitches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KillSwitches", function() { return KillSwitches; });
/* harmony import */ var _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../performance/KillSwitch */ "k0Dt");

var KillSwitches = /** @class */ (function () {
    function KillSwitches() {
    }
    KillSwitches.newYoutubeUrlRegexKS = new _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_0__["KillSwitch"]('93326c3b-13a0-4ea5-9979-87eddec6d21a');
    KillSwitches.urlUtilityRefactor = new _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_0__["KillSwitch"]('77727f04-2ebb-4f7a-b916-692003f4dec7' /* '10/01/2019', 'Refactor URL utilities' */);
    return KillSwitches;
}());



/***/ }),

/***/ "+eAv":
/*!******************************************************************!*\
  !*** ./lib/fileTypeIcons/renderers/FileTypeIcons.module.scss.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./FileTypeIcons.module.css */ "YFf/");
var styles = {
    fileIcon: 'fileIcon_5159120a'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "0i2p":
/*!*****************************************************!*\
  !*** ./lib/fileTypeIcons/renderers/Strings.resx.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_tkE1T1OGzhOW2Gh5iEm/nQ';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "1OwT":
/*!******************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryHandrail.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegalleryhandrail_180cfb3e5546b592bbae46e48177fc02.png";

/***/ }),

/***/ "1r8z":
/*!**************************!*\
  !*** ./lib/SPUtility.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @file SPUtility.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */

var SPUtility = /** @class */ (function () {
    function SPUtility() {
    }
    /**
     * Utility method to construct user photo URL for specific size.
     * UserPhoto mapping is auto added into the Alternative URL map when private CDN is enabled.
     * @param email email address. It will be Decoded to ensure we use uniform URL for the user photo.
     * When email is missing, it will automatically lead to default doughboy image url.
     * @param size Parameter may have value S, L, M. If none or other is provided, S will be used by default.
     */
    SPUtility.getUserPhotoUrl = function (email, size) {
        return _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["SPAlternativeUrls"].getUserPhotoUrl(decodeURIComponent(email), size);
    };
    SPUtility.getWebPathOfFile = function (path) {
        if (path.indexOf('?') > 0) {
            if (path.search(new RegExp('\\?(w|W)(e|E)(b|B)=1')) > 0 ||
                path.search(new RegExp('\\&(w|W)(e|E)(b|B)=1')) > 0) {
                return path;
            }
            return path + '&web=1';
        }
        return path + '?web=1';
    };
    /**
     * Takes in a page version number and checks to see if the version represents a minor version
     */
    SPUtility.isPageOnMinorVersion = function (version) {
        var versionParts = version.split('.');
        if (versionParts.length !== 2) {
            throw new Error('Incorrect Version Format');
        }
        return !_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["StringHelper"].doesStringStartWith(versionParts[1], '0');
    };
    return SPUtility;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPUtility);


/***/ }),

/***/ "2oeR":
/*!******************************************!*\
  !*** ./lib/dialog/DialogUtility.resx.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_a3W+FXOqBm43qmT906SM6g';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "2q6Q":
/*!***********************************!*\
  !*** external "@ms/sp-telemetry" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2q6Q__;

/***/ }),

/***/ "2qYO":
/*!**********************************************!*\
  !*** ./lib/assets/reportDefaultImage4sm.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "reportdefaultimage4sm_9db9fb2df847a36ad3afdf7c12a379f5.png";

/***/ }),

/***/ "3adW":
/*!****************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryLounge.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegallerylounge_50d1492e4405d4163adeb0d1e1be664d.png";

/***/ }),

/***/ "4r+a":
/*!******************************************!*\
  !*** ./lib/dialog/DeferredPageDialog.js ***!
  \******************************************/
/*! exports provided: DeferredPageDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredPageDialog", function() { return DeferredPageDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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

// tslint:disable-next-line:variable-name
var DeferredComponent = react__WEBPACK_IMPORTED_MODULE_0__["lazy"](function () { return Promise.all(/*! import() | sp-dialog-utils */[__webpack_require__.e("vendors~sp-dialog-utils~sp-feature-host"), __webpack_require__.e("vendors~sp-dialog-utils"), __webpack_require__.e("sp-dialog-utils")]).then(__webpack_require__.bind(null, /*! ./PageDialog */ "vxt3"))
    .then(function (module) { return ({ default: module.PageDialog }); }); });
var DeferredPageDialog = /** @class */ (function (_super) {
    __extends(DeferredPageDialog, _super);
    function DeferredPageDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeferredPageDialog.prototype.render = function () {
        return !this.props.hidden
            ? (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], { fallback: false },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](DeferredComponent, __assign({}, this.props))))
            : false;
    };
    return DeferredPageDialog;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));



/***/ }),

/***/ "98T/":
/*!**************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryWood.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegallerywood_a11f7902d25eb53a224cf8deec3b450b.png";

/***/ }),

/***/ "ByVl":
/*!************************************************!*\
  !*** ./lib/extensionHelper/ExtensionHelper.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SPResourcePath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SPResourcePath */ "OLPK");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file ExtensionHelper.ts
 */


var ExtensionHelper = /** @class */ (function () {
    function ExtensionHelper() {
    }
    /**
     * Extracts the filename extension based on file path (supports url).
     * @param {Uri | SPResourcePath} path Uri or SPResourcePath of the object.
     * @returns {string | undefined} Lowercase extension or undefined if input doesn't have one.
     */
    ExtensionHelper.getExtension1 = function (path) {
        if (!path) {
            return undefined;
        }
        var filePath;
        if (path instanceof _SPResourcePath__WEBPACK_IMPORTED_MODULE_1__["SPResourcePath"]) {
            filePath = path.path;
        }
        else {
            filePath = path.getPath(true /*trim trailing slash*/);
        }
        var extensionStart = filePath.lastIndexOf('.');
        if (extensionStart > -1) {
            return filePath.substr(extensionStart + 1).toLowerCase();
        }
        return undefined;
    };
    /**
     * Extracts the extesion based on file path (supports url).
     * @deprecated Will be removed after all KillSwitches graduated and no consumers.
     * da076ae3-7818-4072-b784-5757bae50cd9 Fix Uri problem in sp-component-utilities
     * Please use getExtension1 instead.
     * @param {string} path Relative or absolute url of the object
     * @returns {string} Lower-case extension or undefined if input doesn't have one.
     */
    ExtensionHelper.getExtension = function (path) {
        if (!path) {
            return undefined;
        }
        var filePath = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Uri"](path).getPath(true /*trim trailing slash*/);
        var extensionStart = filePath.lastIndexOf('.');
        if (extensionStart > -1) {
            return filePath.substr(extensionStart + 1).toLowerCase();
        }
        return undefined;
    };
    /**
     * Joins extensions in set to form a comma-separated string list.
     * Can be used for local device file filtering etc.
     * @param {Set<string>} set Collection of extensions without starting dot
     * @returns {string} Comma-separated string like '.pptx,.docx' or undefined if empty set.
     */
    ExtensionHelper.joinExtensionString = function (set) {
        if (!set || set.size < 1) {
            return undefined;
        }
        var array = [];
        set.forEach(function (ext) { array.push(ext); });
        // ie. '.pptx,.docx'
        return "." + array.join(',.');
    };
    return ExtensionHelper;
}());
/* harmony default export */ __webpack_exports__["default"] = (ExtensionHelper);


/***/ }),

/***/ "CQB5":
/*!********************************************!*\
  !*** ./lib/assets/reportDefaultImage4.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "reportdefaultimage4_f0eb038bb481da67950b7b3b3dae3435.png";

/***/ }),

/***/ "Cy4Q":
/*!******************************!*\
  !*** ./lib/imaging/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "DXzA":
/*!********************************************!*\
  !*** ./lib/assets/reportDefaultImage2.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "reportdefaultimage2_7103f03ef61b6890cb9d2ce981a18325.png";

/***/ }),

/***/ "DeWO":
/*!***********************************************!*\
  !*** ./lib/assets/portfolioDefaultImage3.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfoliodefaultimage3_1374a83400de32f5b05589a37ba2aefa.png";

/***/ }),

/***/ "Dmv+":
/*!******************************************!*\
  !*** ./lib/dialog/DialogUtility.scss.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./DialogUtility.css */ "bO8f");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "DtM7":
/*!***************************************************!*\
  !*** ./lib/dateTimeHelper/DateTimeHelper.resx.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_1Ou/gGCxybOVkfKauk4ZuQ';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "ERKq":
/*!**************************************!*\
  !*** ./lib/assets/defaultImage5.jpg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "defaultimage5_54c10b05976d1cd6f3f2e2a05e41b97a.jpg";

/***/ }),

/***/ "Egrv":
/*!*****************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryPendant.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegallerypendant_b6e43b3f96d98c29d0300cec19b0a553.png";

/***/ }),

/***/ "Eq8N":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage1.jpg ***!
  \***************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "visualtemplateimage1_04cb013bb5cd57eb1d2dacad1a4608a9.jpg";

/***/ }),

/***/ "F2IJ":
/*!************************************************************************!*\
  !*** ./lib/fileTypeIcons/renderers/FileTypeIconDetailsListRenderer.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _FileTypeIconsLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FileTypeIconsLoader */ "aEnU");
/* harmony import */ var _FileTypeIcons_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FileTypeIcons.module.scss */ "+eAv");
/* harmony import */ var _Strings_resx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Strings.resx */ "0i2p");
/**
 * @file FileTypeIconDetailsListRenderer.tsx
 *
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */
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






var FileTypeIconDetailsListRenderer = /** @class */ (function (_super) {
    __extends(FileTypeIconDetailsListRenderer, _super);
    function FileTypeIconDetailsListRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileTypeIconDetailsListRenderer.prototype.componentDidMount = function () {
        var _this = this;
        this._icons = null; // tslint:disable-line:no-null-keyword
        _FileTypeIconsLoader__WEBPACK_IMPORTED_MODULE_3__["default"].loadIconsModule().then(function (icons) {
            _this._icons = icons;
            _this.forceUpdate();
        }).catch(function (error) { return _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(FileTypeIconDetailsListRenderer._logSource, error); });
    };
    FileTypeIconDetailsListRenderer.prototype.render = function () {
        if (!this._icons) {
            return false;
        }
        var _a = this.props, extension = _a.extension, _b = _a.sizeInPixels, sizeInPixels = _b === void 0 ? 16 : _b;
        var iconSrc = this._icons.getIconUrl(extension, sizeInPixels);
        var altText = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["StringHelper"].format(_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].FileTypeIconAlternateText, extension);
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _FileTypeIcons_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].fileIcon },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", { alt: altText, src: iconSrc, width: sizeInPixels, height: sizeInPixels })));
    };
    FileTypeIconDetailsListRenderer._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('FileTypeIconDetailsListRenderer');
    return FileTypeIconDetailsListRenderer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (FileTypeIconDetailsListRenderer);


/***/ }),

/***/ "GyUw":
/*!*********************************************!*\
  !*** ./lib/pageService/PageServiceError.js ***!
  \*********************************************/
/*! exports provided: PageServiceError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageServiceError", function() { return PageServiceError; });
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
 * Page service error with specific error code
 */
var PageServiceError = /** @class */ (function (_super) {
    __extends(PageServiceError, _super);
    function PageServiceError(code, error, message) {
        var _this = _super.call(this, "Page Service error with code: " + code + ". " + (error ? error.message : '') + (!!message ? message : '')) || this;
        // Note: the prototype must also be set on any classes which extend this one
        _this.__proto__ = PageServiceError.prototype; // tslint:disable-line:no-any
        _this._code = code;
        _this.stack = error && error.stack;
        return _this;
    }
    Object.defineProperty(PageServiceError.prototype, "code", {
        /**
         * get page service error code
         */
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    return PageServiceError;
}(Error));



/***/ }),

/***/ "H3mH":
/*!**********************************************!*\
  !*** ./lib/fileTypeIcons/FileTypeIconMap.js ***!
  \**********************************************/
/*! exports provided: DEFAULT_ICON_COLOR, DOCX_ICON_COLOR, ODP_ICON_COLOR, LISTITEM_ICON, ICONS, ICON_EXT_MAP, EXTENSIONS_TO_FILENAME_MAP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_ICON_COLOR", function() { return DEFAULT_ICON_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCX_ICON_COLOR", function() { return DOCX_ICON_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ODP_ICON_COLOR", function() { return ODP_ICON_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LISTITEM_ICON", function() { return LISTITEM_ICON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ICONS", function() { return ICONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ICON_EXT_MAP", function() { return ICON_EXT_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXTENSIONS_TO_FILENAME_MAP", function() { return EXTENSIONS_TO_FILENAME_MAP; });
/* harmony import */ var _uifabric_file_type_icons_lib_FileTypeIconMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/file-type-icons/lib/FileTypeIconMap */ "ntG8");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file Map from various file extensions to icon image url and icon color.
 * @todo 185513: [CSWP] How do webpart developers consume shared image assets
 */

var ACCBD_ICON_COLOR = '#A23739';
var CSV_ICON_COLOR = '#207347';
var DEFAULT_ICON_COLOR = '#C8C8C8';
var DOCX_ICON_COLOR = '#2B579A';
var FOLDER_ICON_COLOR = '#094AB2';
var HTML_ICON_COLOR = '#0078d4';
var SHARE_POINT_ICON_COLOR = '#038387';
var ODP_ICON_COLOR = '#D04727';
var ONE_ICON_COLOR = '#803A7A';
var PDF_ICON_COLOR = '#D76244';
var PUB_ICON_COLOR = '#077568';
var VECTOR_ICON_COLOR = '#3A56A0';
var XPS_ICON_COLOR = '#0EB5ED';
var XSN_ICON_COLOR = '#6A3889';
var LISTITEM_ICON = {
    color: DEFAULT_ICON_COLOR
};
var ICONS = [
    {
        color: ACCBD_ICON_COLOR,
        extensions: ['accdb', 'mdb']
    },
    {
        color: FOLDER_ICON_COLOR,
        extensions: ['7z', 'ace', 'arc', 'arj', 'dmg', 'gz', 'iso', 'lzh', 'pkg', 'rar', 'sit', 'tgz', 'tar', 'rar', 'z']
    },
    {
        color: SHARE_POINT_ICON_COLOR,
        extensions: ['aspx']
    },
    {
        color: DEFAULT_ICON_COLOR,
        /* tslint:disable:max-line-length */
        extensions: ['aif', 'aiff', 'aac', 'amr', 'au', 'awb', 'dct', 'dss', 'dvf', 'flac', 'gsm', 'm4a', 'm4p', 'mid', 'mmf', 'mp3', 'ogg', 'oga', 'ra', 'rm', 'wav', 'wma', 'wv']
    },
    {
        color: DEFAULT_ICON_COLOR,
        extensions: ['asp', 'bat', 'c', 'coffee', 'config', 'cpp', 'cs', 'cshtml', 'css', 'dat', 'fsx', 'h', 'inf', 'ini', 'java', 'js', 'json', 'less', 'log', 'manifest', 'master', 'nfo', 'php', 'prefs', 'preferences', 'ps', 'ps1', 'pss', 'py', 'rb', 'rdf', 'reg', 'ruby', 'sql', 'svn-base', 'vmg', 'webpart', 'wsp', 'vb']
    },
    {
        color: CSV_ICON_COLOR,
        extensions: ['csv']
    },
    {
        color: DOCX_ICON_COLOR,
        extensions: ['doc', 'docm', 'docx']
    },
    {
        color: DOCX_ICON_COLOR,
        extensions: ['dot', 'dotm', 'dotx']
    },
    {
        color: DEFAULT_ICON_COLOR,
        extensions: ['eml', 'msg', 'ost', 'pst']
    },
    {
        color: DEFAULT_ICON_COLOR,
        extensions: ['application', 'appref-ms', 'apk', 'app', 'appx', 'exe', 'ipa', 'msi', 'xap']
    },
    {
        color: DEFAULT_ICON_COLOR,
        extensions: ['ttf', 'otf', 'woff']
    },
    {
        color: HTML_ICON_COLOR,
        extensions: ['htm', 'html', 'mht']
    },
    {
        color: HTML_ICON_COLOR,
        extensions: ['lnk', 'link', 'url', 'website', 'webloc']
    },
    {
        color: DEFAULT_ICON_COLOR,
        extensions: ['3mf', '3ds', 'blend', 'cool', 'dae', 'df', 'dwfx', 'dwg', 'dxf', 'fbx', 'gltf', 'glb', 'layout', 'obj', 'off', 'max', 'ply', 'skp', 'stp', 'stl', 't', 'thl', 'x']
    },
    {
        color: CSV_ICON_COLOR,
        extensions: ['mpp']
    },
    {
        color: CSV_ICON_COLOR,
        extensions: ['mpt']
    },
    {
        color: CSV_ICON_COLOR,
        extensions: ['ods']
    },
    {
        color: DOCX_ICON_COLOR,
        extensions: ['odt']
    },
    {
        color: ONE_ICON_COLOR,
        extensions: ['one', 'onepkg', 'ms-one-stub', 'onetoc', 'onetoc2']
    },
    {
        color: PDF_ICON_COLOR,
        extensions: ['pdf']
    },
    {
        color: DEFAULT_ICON_COLOR,
        extensions: ['arw', 'bmp', 'cr2', 'crw', 'dcr', 'dds', 'dib', 'dng', 'erf', 'gif', 'ico', 'jfi', 'jfif', 'jif', 'jpe', 'jpeg', 'jpg', 'kdc', 'mrw', 'nef', 'orf', 'pct', 'pict', 'png', 'pns', 'psd', 'raw', 'tga', 'tif', 'tiff', 'wdp']
    },
    {
        color: ODP_ICON_COLOR,
        extensions: ['pot', 'potm', 'potx']
    },
    {
        color: ODP_ICON_COLOR,
        extensions: ['pps', 'ppsm', 'ppsx']
    },
    {
        color: ODP_ICON_COLOR,
        extensions: ['ppt', 'pptm', 'pptx']
    },
    {
        color: PUB_ICON_COLOR,
        extensions: ['pub']
    },
    {
        color: DEFAULT_ICON_COLOR,
        extensions: ['epub', 'rtf', 'wri']
    },
    {
        color: DEFAULT_ICON_COLOR,
        extensions: ['bak', 'bin', 'cab', 'cache', 'cat', 'cer', 'class', 'dat', 'db', 'dbg', 'dl_', 'dll', 'ithmb', 'jar', 'kb', 'kdc', 'ldt', 'lrprev', 'obj', 'ppa', 'ppam', 'pdb', 'rom', 'thm', 'thmx', 'vsl', 'xla', 'xlam', 'xll']
    },
    {
        color: DEFAULT_ICON_COLOR,
        extensions: ['log', 'md', 'readme', 'text', 'txt']
    },
    {
        color: VECTOR_ICON_COLOR,
        extensions: ['ai', 'dgn', 'pd', 'emf', 'eps', 'indd', 'indt', 'ps', 'svg', 'svgz', 'wmf']
    },
    {
        color: DEFAULT_ICON_COLOR,
        extensions: ['3gp', 'asf', 'avi', 'dvr-ms', 'flv', 'm1v', 'm4v', 'mkv', 'mod', 'mov', 'mm4p', 'mp2', 'mp2v', 'mp4', 'mpa', 'mpe', 'mpeg', 'mpg', 'mpv', 'mpv2', 'mts', 'ogg', 'qt', 'swf', 'ts', 'vob', 'webm', 'wlmp', 'wm', 'wmv', 'wmx']
        /* tslint:enable:max-line-length */
    },
    {
        color: VECTOR_ICON_COLOR,
        extensions: ['vsd', 'vsdm', 'vsdx', 'vdw']
    },
    {
        color: DEFAULT_ICON_COLOR,
        extensions: ['vss', 'vssm', 'vssx']
    },
    {
        color: VECTOR_ICON_COLOR,
        extensions: ['vst', 'vstm', 'vstx']
    },
    {
        color: CSV_ICON_COLOR,
        extensions: ['xls', 'xlsb', 'xlsm', 'xlsx']
    },
    {
        color: DEFAULT_ICON_COLOR,
        extensions: ['xlt', 'xltm', 'xltx']
    },
    {
        color: DEFAULT_ICON_COLOR,
        extensions: ['xaml', 'xml', 'xsl']
    },
    {
        color: XPS_ICON_COLOR,
        extensions: ['oxps', 'xps']
    },
    {
        color: XSN_ICON_COLOR,
        extensions: ['xsn']
    },
    {
        color: FOLDER_ICON_COLOR,
        extensions: ['zip']
    }
];
var ICON_EXT_MAP = {};
ICONS.forEach(function (icon) {
    if (icon.extensions) {
        icon.extensions.forEach(function (ext) {
            ICON_EXT_MAP[ext] = icon;
        });
    }
});
var iconTypes = Object.keys(_uifabric_file_type_icons_lib_FileTypeIconMap__WEBPACK_IMPORTED_MODULE_0__["FileTypeIconMap"]);
var EXTENSIONS_TO_FILENAME_MAP = {};
iconTypes.forEach(function (type) {
    var extensions = _uifabric_file_type_icons_lib_FileTypeIconMap__WEBPACK_IMPORTED_MODULE_0__["FileTypeIconMap"][type].extensions || [];
    extensions.forEach(function (extension) {
        EXTENSIONS_TO_FILENAME_MAP[extension] = type;
    });
});


/***/ }),

/***/ "Hp/x":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage7.jpg ***!
  \***************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "visualtemplateimage7_ba5b9de2887e9728f1b8325b5719a37b.jpg";

/***/ }),

/***/ "Ihzg":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolbarButton/ToolbarButton.css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".ToolbarButton{background-color:\"[theme:neutralPrimary, default: #323130]\";border:1px solid transparent;height:34px;overflow:hidden;padding:0 8px;position:relative;text-align:center;top:0;-webkit-transition:all .3s;transition:all .3s;-webkit-transition-property:background-color,color;transition-property:background-color,color;min-width:34px;color:\"[theme:neutralLighterAlt, default: #faf9f8]\";font-weight:400;font-size:14px}.ToolbarButton.ToolbarButtonStyleKillSwitch{margin-left:0;margin-right:0}.ToolbarButton .ms-Icon{font-size:16px;line-height:1.2}.ToolbarButton:hover{background-color:\"[theme:neutralSecondaryAlt, default: #8a8886]\";cursor:pointer}.ToolbarButton.ToolbarButton--active{background-color:\"[theme:themeSecondary, default: #2b88d8]\"}.ToolbarButton.ToolbarButton--active+.ToolbarButton--divider:after,.ToolbarButton.ToolbarButton--active.ToolbarButton--divider:after{border:\"[theme:themeSecondary, default: #2b88d8]\"}.ToolbarButton:active{background-color:\"[theme:themeDarkAlt, default: #106ebe]\"}.ToolbarButton.ToolbarButton--disabled,.ToolbarButton.ToolbarButton--disabled:hover{background-color:\"[theme:neutralPrimary, default: #323130]\";color:\"[theme:neutralSecondary, default: #605e5c]\"}.ToolbarButton.ToolbarButton--disabled .ms-Icon,.ToolbarButton.ToolbarButton--disabled:hover .ms-Icon{color:\"[theme:neutralSecondary, default: #605e5c]\"}.ToolbarButton:focus{border:1px solid;outline:0}@media screen and (-ms-high-contrast:active){.ToolbarButton:focus{border-color:3px dotted #1aebff;-webkit-box-sizing:border-box;box-sizing:border-box}}@media screen and (-ms-high-contrast:black-on-white){.ToolbarButton:focus{border-color:3px dotted #37006e;-webkit-box-sizing:border-box;box-sizing:border-box}}.ToolbarButton.ToolbarButton--divider:after{content:\"\";position:absolute;height:20px;top:6px}[dir=ltr] .ToolbarButton.ToolbarButton--divider:after{left:0}[dir=rtl] .ToolbarButton.ToolbarButton--divider:after{right:0}[dir=ltr] .ToolbarButton.ToolbarButton--divider:after{border-left:1px solid}[dir=rtl] .ToolbarButton.ToolbarButton--divider:after{border-right:1px solid}.ToolbarButtonTooltip{display:inline}.ToolbarButton--h2{font-size:21px;font-weight:100}.ToolbarButton--blockquote{font-style:italic}button.ToolbarButton--pre{font-family:monospace}", ""]);



/***/ }),

/***/ "IiD6":
/*!**************************************!*\
  !*** ./lib/assets/defaultImage2.jpg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "defaultimage2_a78ac777ce17eaf38eac4495ffa4778c.jpg";

/***/ }),

/***/ "IoHU":
/*!*********************************!*\
  !*** ./lib/decorators/index.js ***!
  \*********************************/
/*! exports provided: monitor, UnexpectedFailure, ExpectedFailure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _monitor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./monitor */ "qMPn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "monitor", function() { return _monitor__WEBPACK_IMPORTED_MODULE_0__["monitor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnexpectedFailure", function() { return _monitor__WEBPACK_IMPORTED_MODULE_0__["UnexpectedFailure"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExpectedFailure", function() { return _monitor__WEBPACK_IMPORTED_MODULE_0__["ExpectedFailure"]; });




/***/ }),

/***/ "JEku":
/*!**********************************************!*\
  !*** ./lib/assets/reportDefaultImage3sm.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "reportdefaultimage3sm_a62fe976f55223415b14dc8f642d316c.png";

/***/ }),

/***/ "JEu8":
/*!*****************************!*\
  !*** ./lib/models/index.js ***!
  \*****************************/
/*! exports provided: HubSiteSelectionOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ISiteReference__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ISiteReference */ "fmUt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HubSiteSelectionOption", function() { return _ISiteReference__WEBPACK_IMPORTED_MODULE_0__["HubSiteSelectionOption"]; });




/***/ }),

/***/ "JIqX":
/*!****************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryChairs.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegallerychairs_617495b0040e88752b70b2bdc4443c91.png";

/***/ }),

/***/ "JW2X":
/*!*******************************************!*\
  !*** ./lib/icsHelper/IcsFileGenerator.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IcsFileGenerator; });
/* harmony import */ var _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/i18n-utilities */ "Ycni");
/* harmony import */ var _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../performance/KillSwitch */ "k0Dt");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 * IcsFileGenerator to generate and download ics file.
 * @file IcsFileGenerator.ts
 */


var eventAllDayKillSwitch = new _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('c615c879-98b1-47cf-beb4-b5909937da88' /* '7/25/2019','SOX_EventIcsFileTimezoneFix' */);
var groupCalendarAllDayKillSwitch = new _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('5a511229-1361-450b-a2ac-61bdf600d687' /* '7/25/2019', 'SOX_GroupCalendarAllDayFix' */);
function IcsFileGenerator(event) {
    var file = getICSFile(event);
    var link = document.createElement('a');
    // This is for IE to download ics file as it doesn't support download attribute in tag a.
    // see http://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server.
    if (window.navigator.msSaveOrOpenBlob) {
        var blob = new Blob([file], { type: 'data:text/calendar;charset=utf8' });
        window.navigator.msSaveBlob(blob, event.name + ".ics");
    }
    else if ('download' in link) { // This is for other browsers which support the download attribute.
        link.download = event.name + ".ics";
        link.href = 'data:text/calendar;charset=utf8,' + encodeURIComponent(file);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    else {
        location.href = 'data:text/calendar;charset=utf8,' + encodeURIComponent(file);
    }
}
function getICSFile(event) {
    var lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN',
        formatProperty('METHOD', event.method),
        // Delete this line when graduating 5a511229-1361-450b-a2ac-61bdf600d687;
        !groupCalendarAllDayKillSwitch.isActivated() ? '' : formatProperty('TZID', event.timezone),
        'BEGIN:VEVENT',
        'DTSTAMP:' + generateDateTimeStamp(),
        formatProperty('UID', event.id),
        formatDate(event.allDayInfo, event.startDate, event.endDate),
        formatProperty('SUMMARY', event.name),
        formatDescription(event.plainText),
        formatHTMLContent(event.bodyContent),
        formatProperty('LOCATION', event.location),
        formatProperty('CREATED', getIOSString(event.createdtime)),
        formatProperty('LAST-MODIFIED', getIOSString(event.lastModified)),
        formatStatus(event.status),
        formatRecurrence(event.recurrence),
        formatOrganizer(event.organizer),
        formatCategories(event.categories)
    ].concat(formatAttendees(event.attendees), formatAttachments(event.attachments), [
        'END:VEVENT',
        'END:VCALENDAR'
    ]);
    return lines.join('\r\n');
}
function formatProperty(key, value) {
    if (value) {
        return key + ':' + value;
    }
    return undefined;
}
/**
 * Convert javascript date format to YYYYMMDDTHHMMSSZ.
 */
function generateDateTimeStamp() {
    var date = new Date();
    return getDateString(date) + "T" + getTimeString(date) + "Z";
}
function formatDate(allDayInfo, startDate, endDate) {
    if (allDayInfo) {
        // For all day event Outlook or apple calendar add one more day to end date, for example:
        // In ICS file startdate = 2017/1/1, enddate = 2017/1/3, it displays 2017/1/1-2017/1/2 from Outlook
        // or other calendar apps.
        if (!eventAllDayKillSwitch.isActivated()) {
            var normalizedEndDate = groupCalendarAllDayKillSwitch.isActivated() || allDayInfo.allDayFormat === "Inclusive" /* Inclusive */
                ? addOneDay(endDate)
                : endDate;
            var startDateString = getLocalDateString(startDate, allDayInfo.timezone);
            var endDateString = getLocalDateString(normalizedEndDate, allDayInfo.timezone);
            return "DTSTART;VALUE=DATE:" + startDateString + "\r\nDTEND;VALUE=DATE:" + endDateString;
        }
        else {
            return "DTSTART;VALUE=DATE:" + getDateString(startDate) + "\r\nDTEND;VALUE=DATE:" + getDateString(addOneDay(endDate));
        }
    }
    else {
        return 'DTSTART:' + getIOSString(startDate) +
            '\r\nDTEND:' + getIOSString(endDate);
    }
}
function addOneDay(date) {
    var newDate = new Date(date.getTime());
    newDate.setDate(date.getDate() + 1);
    return newDate;
}
/**
 * Convert javascript date format to YYYYMM.
 * @param date: A date need to be converted to string.
 */
function getDateString(date) {
    if (date) {
        return formatDateString(date.getFullYear(), date.getMonth(), date.getDate());
    }
    return undefined;
}
function getLocalDateString(date, timeZone) {
    if (!Boolean(date)) {
        return undefined;
    }
    if (timeZone === 'UTC') {
        return formatDateString(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    }
    var spDate = new _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_0__["SPDate"]({
        fullYear: date.getUTCFullYear(),
        month: date.getUTCMonth(),
        date: date.getUTCDate(),
        hours: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds(),
        milliseconds: date.getUTCMilliseconds()
    });
    var localSpDate = spDate.convertFromUTC(timeZone);
    return formatDateString(localSpDate.fullYear, localSpDate.month, localSpDate.date);
}
function formatDateString(year, month, date) {
    var monthString = ("0" + (month + 1)).substr(-2);
    var dateString = ("0" + date).substr(-2);
    return "" + year + monthString + dateString;
}
/**
 * Convert javascript date format to HHMMSS.
 * @param date: A date need to be converted to string.
 */
function getTimeString(date) {
    if (date) {
        return "" + date.getHours() + date.getMinutes() + date.getSeconds();
    }
    return undefined;
}
/**
 * Return the ISO date format, but has dashes and semi-colons removed. e.g.20120925T072912Z
 * @param date: A date need to be converted to string;
 */
function getIOSString(date) {
    if (date) {
        var result = date.toISOString().replace(/-|:|\./g, '');
        return result.substring(0, 15) + 'Z';
    }
    return undefined;
}
function formatStatus(status) {
    if (status && ['TENTATIVE', 'CONFIRMED', 'CANCELLED'].indexOf(status.toUpperCase()) !== -1) {
        return 'STATUS:' + status;
    }
    return undefined;
}
function formatAttendees(attendees) {
    if (attendees) {
        return attendees.map(function (attendee) {
            if (attendee.name && attendee.mailAddress) {
                return 'ATTENDEE;CN=' + attendee.name + ':mailto:' + attendee.mailAddress;
            }
            else {
                return undefined;
            }
        });
    }
    return [];
}
function formatOrganizer(organizer) {
    if (organizer) {
        return 'ORGANIZER;CN=' + organizer.name + ':mailto:' + organizer.mailAddress;
    }
    return undefined;
}
function formatCategories(categories) {
    if (categories) {
        return 'CATEGORIES:' + categories.join(',');
    }
    return undefined;
}
function formatAttachments(attachments) {
    if (attachments) {
        return attachments.map(function (attachment) {
            return 'ATTACH;ENCODING=BASE64;VALUE=BINARY;X-FILENAME=' + attachment.name +
                ';FMTTYPE=' + attachment.contentType +
                ':' + attachment.contentBytes;
        });
    }
    return [];
}
function formatHTMLContent(content) {
    if (content) {
        return 'X-ALT-DESC;FMTTYPE=text/html:' + removeSpace(content);
    }
    return undefined;
}
function formatDescription(content) {
    if (content) {
        return 'DESCRIPTION:' + content;
    }
    return undefined;
}
function formatRecurrence(recurrence) {
    if (recurrence) {
        var properties = [];
        for (var key in recurrence) {
            if (recurrence.hasOwnProperty(key)) {
                properties.push(key + "=" + recurrence[key]);
            }
        }
        return "RRULE:" + properties.join(';');
    }
}
/**
 * Remove whitespace from both sides of a line and empty block from html content.
 *
 * @example
 *
 * ```
 * <div> hello <div>
 *
 * <div> world </div>
 * ```
 *
 * will be
 *
 * ```
 * <div> hello </div>\n<div> world </div>
 * ```
 *
 * after process.
 */
function removeSpace(content) {
    var lines = content.replace(/\r\n/g, '\n').split('\n');
    var newContent = lines.map(function (line) { return line && line.trim(); });
    // Output `\n` string into the file. Outlook will parse it as line feed.
    return newContent.join('\\n');
}


/***/ }),

/***/ "Jw2e":
/*!***********************************************!*\
  !*** ./lib/assets/portfolioDefaultImage1.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfoliodefaultimage1_832788d3c5f425c025125872a7b5cd1b.png";

/***/ }),

/***/ "K5Q7":
/*!*****************************************************!*\
  !*** ./lib/viewportLoader/ViewportLoaderFactory.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewportLoaderV2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewportLoaderV2 */ "Lnzn");
// Copyright (c) Microsoft. All rights reserved.
var _a;

var ViewportLoaderFactory = /** @class */ (function () {
    function ViewportLoaderFactory() {
    }
    ViewportLoaderFactory.getViewportLoader = function (componentType) {
        ViewportLoaderFactory._ensureInitialized(componentType);
        return ViewportLoaderFactory._loaderMap.get(componentType);
    };
    ViewportLoaderFactory._ensureInitialized = function (componentType) {
        if (!ViewportLoaderFactory._loaderMap.has(componentType)) {
            // Create a viewport loader of specific component type
            var viewportLoader = new _ViewportLoaderV2__WEBPACK_IMPORTED_MODULE_0__["default"](ViewportLoaderFactory.eventNamePrefixes[componentType]);
            ViewportLoaderFactory._loaderMap.set(componentType, viewportLoader);
        }
    };
    ViewportLoaderFactory.eventNamePrefixes = (_a = {},
        _a[0 /* WebPart */] = 'WebPart',
        _a[1 /* Other */] = 'Component',
        _a);
    ViewportLoaderFactory._loaderMap = new Map();
    return ViewportLoaderFactory;
}());
/* harmony default export */ __webpack_exports__["default"] = (ViewportLoaderFactory);


/***/ }),

/***/ "KCwX":
/*!**********************************************!*\
  !*** ./lib/layouts/ThumbnailUrlGenerator.js ***!
  \**********************************************/
/*! exports provided: ThumbnailUrlGenerator, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThumbnailUrlGenerator", function() { return ThumbnailUrlGenerator; });
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _PreviewHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PreviewHelper */ "+ERe");
/* harmony import */ var _PreviewUtility__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PreviewUtility */ "yqC6");
/* harmony import */ var _SPResourcePath__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../SPResourcePath */ "OLPK");
/* harmony import */ var _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ThumbnailProviderType */ "b6+P");
/* harmony import */ var _extensionHelper_ExtensionHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../extensionHelper/ExtensionHelper */ "ByVl");
/* harmony import */ var _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../performance/KillSwitch */ "k0Dt");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_10__);
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var PRELOAD_IMAGES_KEY = '_preloadImages';
var AUTHORITY = 1; /* See UriPartial.authority*/
// VROOM thumbnail URL regex, return thumbnail from alt stream cache if available before redirecting to MeTA
var VROOM_META_CACHE_REGEX = /(\/thumbnails\/\d\/(.*?)\/content\/?\?(.*?)preferNoRedirect=(.*?)$)/i;
// VROOM thumbnail URL regex, always redirects to MeTA for thumbnail response.
var VROOM_META_REGEX = /(\/thumbnails\/\d\/(.*?)\/content\/?(|(\?(.*?)))$)/i;
// Media Thumbnail URL regex. Core service responsible for generating the thumbnail.
var META_REGEX = /(.svc.ms\/transform\/thumbnail\/?(|(\?(.*?)))$)/i;
// Private CDN Url regex.
var PRIVATE_CDN_REGEX = /(privatecdn.sharepointonline.com\/(.*?)\?(.*?)_oat_=(.*?)$)/i;
// getPreview.ashx end point to DocViz service. This service is under deprecation process.
var DOCVIZ_REGEX = /(\/_layouts\/15\/getpreview.ashx\/?(|(\?(.*?)))$)/i;
var useResourceAuthorityKillSwitch = new _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_9__["KillSwitch"]('7e3781c4-ab51-4e92-8793-6c284adda2a9'
/* '2019/09/11', 'Use resource authority URL instead of web authority URL to generate thumbnail.' */ );
var useSPResourcePathToParseSPResourceKillSwitch = new _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_9__["KillSwitch"]('9cc6aed6-9834-4790-b377-1162c1567113' /* '2019/10/18', 'UseSPResourcePathToParseSPResource' */);
/**
 * This class is the entry point for requesting thumbnail URL for given sharepoint resource
 * It's behavior depends on the timing of oauth token availability
 *  -> It needs oauth token to generate Media Service based thumbnail URL
 *  -> At SPPageApp load time, token is requested
 *  -> When request arrives for thumbnail, if token is resolved, Media Service url is returned
 *  -> If token is not available then getPreview.ashx based url is constructed
 *
 * NOTE: Caller of this API should not log thumbnail url in console or trace logger.
 */
var ThumbnailUrlGenerator = /** @class */ (function () {
    function ThumbnailUrlGenerator() {
        this._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogSource"].create('ThumbnailUrlGenerator');
    }
    /**
     * Returns true if the file type is supported by media service for thumbnail
     * @param fileType
     * @paaram includeProofTokenSupport - If true will also include extensions supported with proof token only.
     */
    ThumbnailUrlGenerator._isFileTypeSupportedByMediaService = function (fileType, includeProofTokenSupport) {
        if (includeProofTokenSupport === void 0) { includeProofTokenSupport = false; }
        return !!fileType
            && (_PreviewUtility__WEBPACK_IMPORTED_MODULE_5__["default"].mediaServiceSupportedMap.has(fileType.toLowerCase())
                || (includeProofTokenSupport && _PreviewUtility__WEBPACK_IMPORTED_MODULE_5__["default"].mediaServiceProofTokenSupportedMap.has(fileType.toLowerCase())));
    };
    ThumbnailUrlGenerator._isViewportNumberValid = function (viewportNumber) {
        return !(isNaN(viewportNumber) || viewportNumber === null);
    };
    /**
     * Returns true if given uri's hostname match my site pattern.
     * Note: Any site in the world can have my site pattern. Don't take
     * hard decision based on this method.
     * @param uri - uri under test.
     * @param currentUri - uri of the current host to compare against.
     */
    ThumbnailUrlGenerator._isMySiteHost = function (uri, currentUri) {
        var MY = '-my.';
        var domain = uri.domain.toLowerCase();
        return domain.indexOf(MY) > -1
            && domain.replace(MY, '') === currentUri.domain.toLowerCase();
    };
    ThumbnailUrlGenerator._replaceQueryValue = function (url, name, oldValue, newValue) {
        return url.replace(name + "=" + oldValue, name + "=" + newValue);
    };
    ThumbnailUrlGenerator._getSPResourceAuthority = function (request) {
        var webAbsoluteUri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Uri"](request.absoluteUrl);
        if (request.spResource) {
            if (!useSPResourcePathToParseSPResourceKillSwitch.isActivated()) {
                var resourcePath = new _SPResourcePath__WEBPACK_IMPORTED_MODULE_6__["SPResourcePath"](request.spResource);
                // Is Relative.
                if (resourcePath.format === _SPResourcePath__WEBPACK_IMPORTED_MODULE_6__["SPResourcePathFormat"].relative
                    || resourcePath.format === _SPResourcePath__WEBPACK_IMPORTED_MODULE_6__["SPResourcePathFormat"].serverRelative) {
                    return webAbsoluteUri;
                }
                else {
                    return new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Uri"](resourcePath.authority);
                }
            }
            else {
                var resourceUri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Uri"](request.spResource);
                // If spResource is relative URL, convert it to absolute URL using web absolute URL.
                if (!resourceUri.getScheme()) {
                    resourceUri.setScheme(webAbsoluteUri.getScheme());
                }
                if (!resourceUri.getAuthority()) {
                    resourceUri.setAuthority(webAbsoluteUri.getAuthority());
                }
                return resourceUri;
            }
        }
        else {
            // If spResource is null for some cases, fallback to web absolute URL.
            return webAbsoluteUri;
        }
    };
    Object.defineProperty(ThumbnailUrlGenerator, "instance", {
        /** ------------------- PUBLIC ------------------- **/
        get: function () {
            if (this._instance === undefined) {
                this._instance = new ThumbnailUrlGenerator();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize thumbnail url generator service scope.
     */
    ThumbnailUrlGenerator.prototype.initialize = function (serviceScope) {
        if (!this._serviceScope) {
            this._serviceScope = serviceScope;
            this._pageContext = this._serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_10__["PageContext"].serviceKey);
        }
    };
    /**
     * Returns true if the file extension is supported for thumbnail
     */
    ThumbnailUrlGenerator.prototype.isFileTypeSupported = function (fileType) {
        if (!fileType) {
            return false;
        }
        var normalizedType = fileType.toLowerCase();
        // SVG is not rendered correctly when served through preview service or thumbnail service.
        // The SVG images are usually small so we can always display SVG images directly.
        // When this kill switch is graduated, this block should be removed and 'svg' be removed from
        // the file type lists in `PreviewUtility`.
        if (normalizedType === 'svg') {
            return false;
        }
        return _PreviewUtility__WEBPACK_IMPORTED_MODULE_5__["default"].getPreviewSupportedMap.has(normalizedType)
            ||
                (this.isVROOMThumbnailEnabled()
                    && (ThumbnailUrlGenerator._isFileTypeSupportedByMediaService(normalizedType) || normalizedType === 'aspx'));
    };
    /**
     * @summary Get thumbnail Url for the given sharepoint resource.
     *
     * @description Ensure you first check file type is supported via
     * isFileTypeSupported or the code will attempt to fallback to spResource.
     */
    ThumbnailUrlGenerator.prototype.getThumbnailUrl = function (request) {
        if (!request) {
            throw new Error("Input parameter request is " + request);
        }
        if (request.unknwonThumbnailUrl) {
            return this._fromUnknwonThumbnailUrl(request);
        }
        var isViewportRequest = this._isViewportParametersSpecified(request);
        /**
         * Skip image preloading for SPImageFlight until
         * preloading considers viewport parameters
         *
         * VSO: 378286
         */
        if (!isViewportRequest) {
            var preloadedImage = this._getPreLoadedImage(request);
            if (preloadedImage) {
                return preloadedImage;
            }
        }
        if (request.spResource) {
            var defaultImage = _PreviewUtility__WEBPACK_IMPORTED_MODULE_5__["default"].getDefaultImage(new _SPResourcePath__WEBPACK_IMPORTED_MODULE_6__["SPResourcePath"](request.spResource), request.width);
            if (defaultImage) {
                return defaultImage;
            }
        }
        var isAspx = request.fileType && request.fileType.toLowerCase() === 'aspx';
        // Site page thumbnail needs to go through getPreview.
        if (request.thumbnail && !isAspx) {
            return request.thumbnail;
        }
        if (request.spResource && !isViewportRequest) {
            var thumbnailUrl = _PreviewUtility__WEBPACK_IMPORTED_MODULE_5__["default"].getAlternateUrl(new _SPResourcePath__WEBPACK_IMPORTED_MODULE_6__["SPResourcePath"](request.spResource), request.width, request.height);
            if (thumbnailUrl) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logVerboseData({
                    source: this._logSource,
                    message: 'Preview request served by alternate url',
                    serviceScope: this._serviceScope
                });
                return thumbnailUrl;
            }
        }
        // If file type is not supported by MeTA, it is most likely to fail with getPreview except excel
        // For scenarios where fileType is missing, we are going in favor of MeTa support to reduce getPreview URL.
        // Also for missing fileType there is no guarantee that getPreview will have 100% support.
        var ignoreFileType = !request.fileType;
        if (!isViewportRequest
            && (isAspx || ThumbnailUrlGenerator._isFileTypeSupportedByMediaService(request.fileType, true) || ignoreFileType)
            && this.isVROOMThumbnailEnabled()) {
            var resourceAuthority = !useResourceAuthorityKillSwitch.isActivated()
                ? ThumbnailUrlGenerator._getSPResourceAuthority(request)
                : new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Uri"](request.absoluteUrl);
            var vroomUrl = _PreviewUtility__WEBPACK_IMPORTED_MODULE_5__["default"].getVROOMItemUrl(request.siteId, request.webId, request.listId, request.uniqueId, resourceAuthority.getLeftPart(AUTHORITY), resourceAuthority.getAuthority(), request.spResource);
            return _PreviewUtility__WEBPACK_IMPORTED_MODULE_5__["default"].getVROOMThumbnailUrl(vroomUrl, request.width, request.height);
        }
        if (!this.isFileTypeSupported(request.fileType)) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logError(this._logSource, new Error("Unsupported type " + request.fileType + " called for thumbnail"));
            if (request.spResource) {
                return request.spResource;
            }
        }
        return this._fallbackToGetPreview(request);
    };
    /**
     * Update width of the thumbnail URL
     * @param thumbnailUrl - Thumbnail URL to be updated
     * @param newWidth  - new width to be applied. Width will be mapped to closest cache breakpoint
     */
    ThumbnailUrlGenerator.prototype.updateThumbnailWidth = function (thumbnailUrl, newWidth) {
        if (!thumbnailUrl || isNaN(newWidth) || newWidth <= 0) {
            return thumbnailUrl;
        }
        var normalizedWidth = _PreviewUtility__WEBPACK_IMPORTED_MODULE_5__["default"].normalizeWidth(newWidth);
        var thumbnailUri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Uri"](thumbnailUrl);
        var existingWidth;
        if (existingWidth = thumbnailUri.getQueryParameter(_PreviewHelper__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].WIDTH_SHORT)) {
            return ThumbnailUrlGenerator._replaceQueryValue(thumbnailUrl, _PreviewHelper__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].WIDTH_SHORT, existingWidth, normalizedWidth);
        }
        else if (existingWidth = thumbnailUri.getQueryParameter(_PreviewHelper__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].WIDTH)) {
            return ThumbnailUrlGenerator._replaceQueryValue(thumbnailUrl, _PreviewHelper__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].WIDTH, existingWidth, normalizedWidth);
        }
        else if (existingWidth = thumbnailUri.getQueryParameter(_PreviewHelper__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].RESOLUTION)) {
            return ThumbnailUrlGenerator._replaceQueryValue(thumbnailUrl, _PreviewHelper__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].RESOLUTION, existingWidth, _PreviewUtility__WEBPACK_IMPORTED_MODULE_5__["default"].normalizeWidthToResolution(newWidth));
        }
        else {
            // Width does not exist already, add it
            var provider = this.getThumbnailProvider(thumbnailUrl);
            switch (provider) {
                case _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].VROOMMeTACache:
                case _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].VROOMMeTA:
                    return _PreviewUtility__WEBPACK_IMPORTED_MODULE_5__["default"].updateVROOMCustomThumbnailSize(thumbnailUrl, newWidth);
                case _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].PrivateCDN:
                case _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].MeTA:
                    return thumbnailUrl + "&" + _PreviewHelper__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].WIDTH + "=" + normalizedWidth;
                case _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].DocViz:
                    return thumbnailUrl + "&" + _PreviewHelper__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].RESOLUTION + "=" + _PreviewUtility__WEBPACK_IMPORTED_MODULE_5__["default"].normalizeWidthToResolution(newWidth);
            }
        }
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logError(this._logSource, new Error('Could not add width to the URL'), 'updateThumbnailWidth');
        return thumbnailUrl;
    };
    /**
     * Get name of the thumbnail provider service for given thumbnail URL.
     * @param thumbnailUrl - Thumbnail URL
     * @param originalUrl - Original URL used to generate thumbnail URL.
     */
    ThumbnailUrlGenerator.prototype.getThumbnailProvider = function (thumbnailUrl, originalUrl) {
        if (!thumbnailUrl) {
            return _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].Unknown;
        }
        if (VROOM_META_CACHE_REGEX.test(thumbnailUrl)) {
            return _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].VROOMMeTACache;
        }
        else if (VROOM_META_REGEX.test(thumbnailUrl)) {
            return _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].VROOMMeTA;
        }
        else if (META_REGEX.test(thumbnailUrl)) {
            return _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].MeTA;
        }
        else if (PRIVATE_CDN_REGEX.test(thumbnailUrl)) {
            return _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].PrivateCDN;
        }
        else if (DOCVIZ_REGEX.test(thumbnailUrl)) {
            return _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].DocViz;
        }
        var thumnbnailUri = new _SPResourcePath__WEBPACK_IMPORTED_MODULE_6__["SPResourcePath"](thumbnailUrl);
        var currentUri = new _SPResourcePath__WEBPACK_IMPORTED_MODULE_6__["SPResourcePath"](window.location.href);
        if (ThumbnailUrlGenerator._isMySiteHost(thumnbnailUri, currentUri)) {
            return _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].MySite;
        }
        else if (originalUrl && originalUrl === thumbnailUrl) {
            return _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].Original;
        }
        else if (originalUrl && this.isStockImage(originalUrl)) {
            return _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].Stock;
        }
        var thumbnailDomain = thumnbnailUri.domain || '';
        var currentDomain = currentUri.domain.toLowerCase();
        if (thumbnailDomain.toLowerCase() === currentDomain) {
            return _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].SharePointHost;
        }
        // Every relative path is hosted on SharePoint.
        if (thumnbnailUri.format !== _SPResourcePath__WEBPACK_IMPORTED_MODULE_6__["SPResourcePathFormat"].absolute) {
            return _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].SharePointHost;
        }
        // Either external, vanity domain or other sub domain of Sharepoint we could not recognize.
        return _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].Unknown;
    };
    /**
     * Returns true if given path represents stock image.
     * Stock image path are virtual, actual Image URL is determinsed at runtime.
     * e.g. /_LAYOUTS/IMAGES/REPORTSITEDEFAULTIMAGE1.PNG
     * @param originalImagePath - Path of the origianal Image URL to check if it is default layout image.
     */
    ThumbnailUrlGenerator.prototype.isStockImage = function (originalImagePath) {
        if (originalImagePath) {
            if (originalImagePath instanceof _SPResourcePath__WEBPACK_IMPORTED_MODULE_6__["SPResourcePath"]) {
                return !!_PreviewUtility__WEBPACK_IMPORTED_MODULE_5__["default"].getDefaultImage(originalImagePath);
            }
            else {
                return !!_PreviewUtility__WEBPACK_IMPORTED_MODULE_5__["default"].getDefaultImageLegacy(originalImagePath);
            }
        }
        return false;
    };
    /**
     * Converts given getPreviewUrl to optimal thumbnail service possible
     * @param getPreviewUrl - getPreview.aspx thumbnail Url
     * @param calledId - Identification of the caller
     * @param width - Requested width of the thumbnail
     */
    ThumbnailUrlGenerator.prototype.fromGetPreview = function (getPreviewUrl, callerId, width) {
        if (width === void 0) { width = 400; }
        if (!DOCVIZ_REGEX.test(getPreviewUrl)) {
            return undefined;
        }
        var getPreviewUri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Uri"](getPreviewUrl);
        var baseUrl = getPreviewUri.getLeftPart(AUTHORITY);
        if (!baseUrl || baseUrl.length < 5) {
            // Relative URL can rely on current host
            var currentUri = new _SPResourcePath__WEBPACK_IMPORTED_MODULE_6__["SPResourcePath"](window.location.href);
            baseUrl = currentUri.authority;
        }
        var request = {
            fileType: getPreviewUri.getQueryParameter(_PreviewHelper__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].EXT),
            absoluteUrl: baseUrl,
            spResource: getPreviewUri.getQueryParameter(_PreviewHelper__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].PATH),
            siteId: getPreviewUri.getQueryParameter(_PreviewHelper__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].GUID_SITE),
            webId: getPreviewUri.getQueryParameter(_PreviewHelper__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].GUID_WEB),
            uniqueId: getPreviewUri.getQueryParameter(_PreviewHelper__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].GUID_FILE),
            width: width,
            callerId: callerId
        };
        if (!request.fileType && request.spResource) {
            request.fileType = _extensionHelper_ExtensionHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getExtension(request.spResource);
        }
        return this.getThumbnailUrl(request);
    };
    ThumbnailUrlGenerator.prototype.isVROOMThumbnailEnabled = function () {
        if (this._pageContext
            && this._pageContext.legacyPageContext
            && this._pageContext.legacyPageContext.MediaTAForThumbnail !== undefined) {
            return this._pageContext.legacyPageContext.MediaTAForThumbnail;
        }
        // TODO: Remove flight check once server change for legacyPageContext.MediaTAForThumbnail is rolled out 100%
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isEnabled(1395 /* WEXUsingVROOMThumbnailAPI */);
    };
    /** ------------------- PRIVATE ------------------- **/
    /**
     * Converts unknown url to best possible thumbnail service
     * @param request - Requested info about thumbnail
     */
    ThumbnailUrlGenerator.prototype._fromUnknwonThumbnailUrl = function (request) {
        var provider = this.getThumbnailProvider(request.unknwonThumbnailUrl);
        switch (provider) {
            case _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].DocViz:
                return this.fromGetPreview(request.unknwonThumbnailUrl, request.callerId, request.width);
            case _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].MeTA:
            case _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].VROOMMeTA:
            case _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].VROOMMeTACache:
            case _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].PrivateCDN:
                return this.updateThumbnailWidth(request.unknwonThumbnailUrl, request.width);
            case _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].SharePointHost:
            case _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].MySite:
                // We identidied that resouce is pointing to something in Sharepoint
                // Let API convert it into appropriate thumbnail URL
                if (!request.spResource) {
                    request.spResource = request.unknwonThumbnailUrl;
                }
                // Important to set undefined to avoid recursive call here.
                request.unknwonThumbnailUrl = undefined;
                return this.getThumbnailUrl(request);
            case _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].Stock:
            case _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_7__["ThumbnailProviderType"].Unknown:
                return request.unknwonThumbnailUrl;
            default:
                return request.unknwonThumbnailUrl;
        }
    };
    ThumbnailUrlGenerator.prototype._isViewportParametersSpecified = function (request) {
        return ThumbnailUrlGenerator._isViewportNumberValid(request.viewportHeight) &&
            ThumbnailUrlGenerator._isViewportNumberValid(request.viewportWidth) &&
            ThumbnailUrlGenerator._isViewportNumberValid(request.viewportTop) &&
            ThumbnailUrlGenerator._isViewportNumberValid(request.viewportLeft);
    };
    /**
     * This method redirects request to GetPreview service as fallback in the event of any failure or delay
     */
    ThumbnailUrlGenerator.prototype._fallbackToGetPreview = function (request) {
        return (_PreviewHelper__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].getPreviewImageUrl(request.fileType, request.thumbnail, request.absoluteUrl, request.spResource, request.siteId, request.webId, request.uniqueId, request.width, false, // isBannerImageUrl
        request.callerId));
    };
    /**
     * Get preloaded preview Url of the image if already loaded
     */
    ThumbnailUrlGenerator.prototype._getPreLoadedImage = function (request) {
        var preloadedUrl = undefined;
        if (request && request.spResource) {
            var preloadImageDictionary = this._getPreloadedDictionary();
            if (preloadImageDictionary) {
                preloadedUrl = this._readUrlFromDictionary(preloadImageDictionary, request.spResource);
                if (!preloadedUrl) {
                    var path = !_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].parse('945b42cc-9cc6-492e-9ab1-568c705046a7'), '2019/02/15', 'SOX_UseSPResourcePath') ? new _SPResourcePath__WEBPACK_IMPORTED_MODULE_6__["SPResourcePath"](request.spResource).path
                        : new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Uri"](request.spResource).getPath();
                    if (path) {
                        preloadedUrl = this._readUrlFromDictionary(preloadImageDictionary, path);
                    }
                }
            }
        }
        return this._validateResolution(preloadedUrl, request) ? preloadedUrl : undefined;
    };
    ThumbnailUrlGenerator.prototype._getPreloadedDictionary = function () {
        var preloadImageDictionary = window[PRELOAD_IMAGES_KEY];
        if (preloadImageDictionary && !this._isDecodedKeyAdded) {
            this._isDecodedKeyAdded = true;
            // e.g. Add key /teams/News/SitePages/Welcome to WEX.aspx for /teams/News/SitePages/Welcome%20to%20WEX.aspx
            for (var urlKey in preloadImageDictionary) {
                if (urlKey) {
                    var decodedUrlKey = void 0;
                    try {
                        decodedUrlKey = decodeURIComponent(urlKey);
                    }
                    catch (_a) {
                        decodedUrlKey = urlKey;
                    }
                    if (decodedUrlKey !== urlKey) {
                        preloadImageDictionary[decodedUrlKey] = preloadImageDictionary[urlKey];
                    }
                }
            }
        }
        return preloadImageDictionary;
    };
    /**
     * Ensure the preloaded image is close enough to the resolution requirement
     * @param preloadedUrl - Preloaded image Url
     * @param request - Thumbnail request containing resolution requirements
     */
    ThumbnailUrlGenerator.prototype._validateResolution = function (preloadedUrl, request) {
        if (!preloadedUrl) {
            return false;
        }
        if (!request.width) {
            return true;
        }
        var uri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Uri"](preloadedUrl);
        var resolution = uri.getQueryParameter('resolution');
        if (resolution) {
            var reqResolution = _PreviewUtility__WEBPACK_IMPORTED_MODULE_5__["default"].normalizeWidthToResolution(request.width);
            var actualResolution = Number(resolution);
            return !isNaN(actualResolution) && reqResolution <= actualResolution;
        }
        var widthParam = uri.getQueryParameter('w') || uri.getQueryParameter('width');
        if (widthParam) {
            var actualWidth = Number(widthParam);
            return !isNaN(actualWidth) && _PreviewUtility__WEBPACK_IMPORTED_MODULE_5__["default"].normalizeWidth(request.width) <= actualWidth;
        }
        return true;
    };
    ThumbnailUrlGenerator.prototype._readUrlFromDictionary = function (dictionary, key) {
        try {
            return dictionary[key] || dictionary[decodeURIComponent(key)];
        }
        catch (error) {
            return undefined;
        }
    };
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["autobind"]
    ], ThumbnailUrlGenerator.prototype, "_fallbackToGetPreview", null);
    return ThumbnailUrlGenerator;
}());

/* tslint:disable:export-name */
/* harmony default export */ __webpack_exports__["default"] = (ThumbnailUrlGenerator.instance);
/* tslint:enable:export-name */ 


/***/ }),

/***/ "KL1q":
/*!***********************************************************!*\
  !*** external "@microsoft/office-ui-fabric-react-bundle" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_KL1q__;

/***/ }),

/***/ "L9FC":
/*!******************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryCushions.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegallerycushions_305ae16131e9b5f466b5f69979dcddc6.png";

/***/ }),

/***/ "LDzE":
/*!************************************************!*\
  !*** ./lib/performance/DomMeasurementCache.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Performance optimized class to access Dom Measurement API
 */
var DomMeasurementCache = /** @class */ (function () {
    function DomMeasurementCache() {
    }
    Object.defineProperty(DomMeasurementCache, "viewportHeight", {
        get: function () {
            this._ensureInitialized();
            if (isNaN(this._viewportHeight)) {
                this._viewportHeight = window.innerHeight;
            }
            return this._viewportHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomMeasurementCache, "viewportWidth", {
        get: function () {
            this._ensureInitialized();
            if (isNaN(this._viewportWidth)) {
                this._viewportWidth = window.innerWidth;
            }
            return this._viewportWidth;
        },
        enumerable: true,
        configurable: true
    });
    DomMeasurementCache._initialize = function () {
        window.addEventListener('resize', _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["debounce"](this._onWindowResize, 50));
        this._initialized = true;
    };
    DomMeasurementCache._onWindowResize = function () {
        this._viewportHeight = undefined;
        this._viewportWidth = undefined;
    };
    DomMeasurementCache._ensureInitialized = function () {
        if (!this._initialized) {
            this._initialize();
        }
    };
    return DomMeasurementCache;
}());
/* harmony default export */ __webpack_exports__["default"] = (DomMeasurementCache);


/***/ }),

/***/ "Lnzn":
/*!************************************************!*\
  !*** ./lib/viewportLoader/ViewportLoaderV2.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Microsoft. All rights reserved.
/**
 * For reviewers: This second version of ViewportLoader was created to help transition
 * from a web part specific loader to a web part agnostic one. This loader avoids the
 * explicit use of web parts, but uses the same logic. Next PR will introduce a viewport
 * loader manager for viewport loaders of different types.
 */



var INTERSECTION_OBSERVER = 'IntersectionObserver';
/**
 * Class that helps lazy loading of components. This class centrally manages
 * registered components to be rendered lazily when in the viewport, i.e. Components
 * that are not in the viewport will not be rendered on the initial load. They will
 * be rendered only when the user scrolls to the component. This class manages the
 * scroll/resize event handling and notification to the components to render when
 * they are near the viewport.
 *
 * E.g. Modern pages' components in viewport will be loaded. All other components are
 * lazily loaded when the user scrolls the viewport and that particular component is
 * in the view.
 *
 * @internal
 */
var ViewportLoader = /** @class */ (function () {
    /**
     * Constructor of class.
     */
    function ViewportLoader(eventNamePrefix, stopObserver) {
        if (stopObserver === void 0) { stopObserver = false; }
        /**
         * Registered components.
         */
        this._components = new Set();
        this._observerMap = new Map();
        /**
         * This attribute managed the number of scroll event handlers that are registered to
         * a scrollable parent. When the number of events becomes zero, the event handler is
         * unregistered.
         */
        this.LAZY_LOADED_TRACKER_ATTRIBUTE = 'data-sp-component-lazycount';
        this.SCROLL = 'scroll';
        this.RESIZE = 'resize';
        this._isInitialized = false;
        this._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogSource"].create('ViewportLoader');
        this._isListeningWindow = false;
        /**
         * These are the components being loaded proactively by increasing viewport offset.
         * It is used to track when all are rendered so viewport offset can be increased further.
         */
        this._offsetComponentsToLoad = [];
        this._eventNamePrefix = eventNamePrefix;
        this._stopObserver = stopObserver;
        this._bind();
        if (!!window[INTERSECTION_OBSERVER]) {
            this._isObserverSupported = true;
            this._observer = new IntersectionObserver(this._onObserved, { threshold: [0.01] });
        }
        else {
            this._isObserverSupported = false;
        }
    }
    ViewportLoader.isSyncLoadWebpartInViewportFlightEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isEnabled(1204 /* SOXSyncLoadWebpartInViewport */);
    };
    ViewportLoader.prototype.optimizeViewportLoader = function () {
        return !this._stopObserver && this._isObserverSupported;
    };
    /**
     * Determines if a component should be lazily loaded and registers such components.
     */
    ViewportLoader.prototype.register = function (component, scrollableParent) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(component, 'component');
        component._registeredInViewport = false;
        if (!this._isInitialized) {
            this._initialize();
        }
        if (this.optimizeViewportLoader() && ViewportLoader.isSyncLoadWebpartInViewportFlightEnabled()) {
            this._components.add(component);
        }
        this._checkVisibilityAndRender(component, 1 /* viewport */);
        // The component is in the viewport and has started rendering.
        if (component._registeredInViewport) {
            return;
        }
        var domEl = component.domElement;
        // Use if scrollable parent is provided, as that is more performant.
        var parents = scrollableParent ? [scrollableParent] : this._findScrollableParents(domEl);
        // We want to listen to the scrollable parent's scroll event, if one exists.
        parents.forEach(function (parent) {
            var count = _this._updateRegisteredChildren(parent, 1);
            // We want to add event listener once per common scrollable parent of components.
            if (count === 1) {
                _this._listenEvents(parent);
            }
        });
        this._listenEvents(window);
        if (!this.optimizeViewportLoader() || !ViewportLoader.isSyncLoadWebpartInViewportFlightEnabled()) {
            this._components.add(component);
        }
        if (!!this._isViewportLoaded) {
            // By this time, Viewport loader has loaded all components registered and now received request to load one
            // more component. Mark _isViewportLoaded to false so we know ViewportLoader is again in the business of loading
            // outside the viewport.
            // Even in no more lazy state, we use this channel to load components to ensure we don't end up loading one
            // at far bottom of the page before one just below viewport.
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(this._logSource, 'Component to load after no more lazy state');
            this._isViewportLoaded = false;
            this._loadOutsideViewport();
        }
    };
    /**
     * Unregister a loaded component which should not be tracked any more.
     */
    ViewportLoader.prototype.unregister = function (component) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(component, 'unregister component');
        if (!this._components.has(component)) {
            return;
        }
        this._components.delete(component);
        var parents = this._findScrollableParents(component.domElement);
        parents.forEach(function (parent) {
            var count = _this._updateRegisteredChildren(parent, -1);
            if (count <= 0) {
                _this._unlistenEvents(parent);
            }
        });
        if (this._components.size === 0 && !!this._isViewportLoaded) {
            // Done loading all lazily loaded components.
            this._unlistenEvents(window);
            this._dispose();
        }
    };
    /**
     * Load registered components not in the viewport by gradually increasing viewport offset.
     */
    ViewportLoader.prototype.loadOutsideViewport = function () {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(this._logSource, "loadOutsideViewPort is called to load rest of the " + this._components.size + " components");
        this._loadOutsideViewport();
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
        this._renderComponentInViewport = this._renderComponentInViewport.bind(this);
        this._unlistenEvents = this._unlistenEvents.bind(this);
        this._updateRegisteredChildren = this._updateRegisteredChildren.bind(this);
        this._loadOutsideViewport = this._loadOutsideViewport.bind(this);
        this._onObserved = this._onObserved.bind(this);
    };
    /**
     * Render component if in the waiting queue of viewport loader
     */
    ViewportLoader.prototype._release = function (component) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(component, 'release component');
        if (this._components.has(component)) {
            this._renderComponentInViewport(component, 1 /* viewport */);
            this.unregister(component);
            return true;
        }
        return false;
    };
    /**
     * Event handler which is called upon scroll and resize events.
     */
    ViewportLoader.prototype._lazyLoaderEventHandler = function () {
        this._loadComponentsInViewport(2 /* scroll */);
    };
    ViewportLoader.prototype._loadComponentsInViewport = function (loadSource) {
        var _this = this;
        if (!this._components || this._components.size === 0) {
            return;
        }
        this._components.forEach(function (value) {
            _this._checkVisibilityAndRender(value, loadSource);
        });
    };
    /**
    * Handler to start rendering component if it is close enough to the viewport.
    */
    ViewportLoader.prototype._checkVisibilityAndRender = function (component, loadSource) {
        // This component has already been loaded, just unregister if not already.
        if (component._registeredInViewport) {
            this.unregister(component);
            return;
        }
        if (this.optimizeViewportLoader()) {
            this._observerMap.set(component.domElement, component);
            this._observer.observe(component.domElement);
            // Load sync if already in viewport
            this._onObserved(this._observer.takeRecords());
        }
        else if (this._isCloseToViewport(component.domElement)) {
            this._renderComponentInViewport(component, loadSource);
            this.unregister(component);
        }
    };
    ViewportLoader.prototype._onObserved = function (observedEntries) {
        var _this = this;
        observedEntries.forEach(function (entry) {
            if ((entry.isIntersecting || entry.intersectionRatio > 0) && entry.boundingClientRect) {
                _this._observer.unobserve(entry.target);
                var component = _this._observerMap.get(entry.target);
                if (component) {
                    _this._observerMap.delete(entry.target);
                    _this._release(component);
                }
            }
        });
    };
    /**
    * Check if component is close enough to the viewport to be shown.
    */
    ViewportLoader.prototype._isCloseToViewport = function (componentNode) {
        try {
            var parent_1 = this._findScrollableParent(componentNode);
            var _a = componentNode.getBoundingClientRect(), top_1 = _a.top, height = _a.height;
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
        // If we haven't found it, then use the slower method: compute styles to evaluate if overflow is set.
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
        this._lazyHandler = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["throttle"](this._lazyLoaderEventHandler, 100).bind(this);
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(this._logSource, 'ViewportLoader is Initialized');
        this._isInitialized = true;
    };
    ViewportLoader.prototype._dispose = function () {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(this._logSource, 'ViewportLoader is disposed');
        var timeSpent = (new Date()).getTime() - this._initTime.getTime();
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_EngagementLogger"].logEvent(this._eventNamePrefix + '.ViewportLoad.Completed', timeSpent.toString());
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
     * This record keeping is required to deregister event handler from the parent when there
     * are no children listening to events.
     */
    ViewportLoader.prototype._updateRegisteredChildren = function (element, count) {
        var lazyChilds = count + Number(element.getAttribute(this.LAZY_LOADED_TRACKER_ATTRIBUTE));
        if (count !== 0) {
            element.setAttribute(this.LAZY_LOADED_TRACKER_ATTRIBUTE, lazyChilds.toString());
        }
        return lazyChilds;
    };
    /**
     * Ask component to load.
     */
    ViewportLoader.prototype._renderComponentInViewport = function (component, loadSource) {
        if (component && !component._registeredInViewport) {
            component._onInViewport();
            if (loadSource === 1 /* viewport */) {
                component._registeredInViewport = true;
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(this._logSource, 'Component is loaded in initial viewport.');
            }
        }
    };
    /**
     * Load registered components not in the viewport, by gradually increasing viewport offset.
     * It also tracks when components are rendered to reduce the gap between increasing offset
     */
    ViewportLoader.prototype._loadOutsideViewport = function () {
        var _this = this;
        if (!this._components || this._components.size === 0) {
            // Done loading all components, take note of this state.
            this._isViewportLoaded = true;
            return;
        }
        if (this.optimizeViewportLoader()) {
            this._components.forEach(function (component) { return _this._release(component); });
            this._isViewportLoaded = true;
            return;
        }
        // All components rendered, empty the array for next lot and increase offset by 2 page height
        this._offsetComponentsToLoad = [];
        var documentHeight = window.innerHeight || document.documentElement.clientHeight;
        this._offset = this._offset + documentHeight * 2;
        this._components.forEach(function (component) {
            if (_this._isCloseToViewport(component.domElement)) {
                _this._offsetComponentsToLoad.push(component);
            }
        });
        // We are done increasing the offset, let viewport loader do its job now.
        this._loadComponentsInViewport(3 /* release */);
        // Check if more to be done
        if (this._components.size > 0) {
            // Not using setTimeout here to reduce wait period when components already rendered,
            // say because they are sync rendered.
            this._loadOutsideViewport();
        }
        else {
            // Done loading all components, take note of this state.
            this._isViewportLoaded = true;
        }
    };
    return ViewportLoader;
}());
/* harmony default export */ __webpack_exports__["default"] = (ViewportLoader);


/***/ }),

/***/ "MGNV":
/*!****************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryWallSm.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegallerywallsm_7d460a4fec0c23a97addacc986123456.png";

/***/ }),

/***/ "N8z2":
/*!**************************************!*\
  !*** ./lib/assets/defaultImage1.jpg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "defaultimage1_3a64abf959a8117e90fc500db8eed7df.jpg";

/***/ }),

/***/ "N9n9":
/*!********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/news/carousel/newsCarousel3.png ***!
  \********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "newscarousel3_36d49389bc80f2f8cc2c5e800e032e70.png";

/***/ }),

/***/ "NCyZ":
/*!****************************************!*\
  !*** ./lib/retryHelper/RetryHelper.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__);
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
};



var RetryHelper = /** @class */ (function () {
    function RetryHelper() {
    }
    /**
     * This function helps retry action with customized configuration.
     * @param retryTimes Maximum times to try the action
     * @param componentName Component name of the action. It is used for telemetry.
     * @param scenarioName Scenario name of the action. It is used for telemetry.
     * @param action The action to retry.
     */
    RetryHelper.retry = function (retryTimes, componentName, scenarioName, action) {
        return __awaiter(this, void 0, void 0, function () {
            var i, actionResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = retryTimes;
                        _a.label = 1;
                    case 1:
                        if (!i--) return [3 /*break*/, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, action()];
                    case 3:
                        actionResult = _a.sent();
                        if (i !== (retryTimes - 1)) {
                            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEvent(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["StringHelper"].format('{0}.{1}.retrySuccess', componentName, scenarioName));
                        }
                        return [2 /*return*/, actionResult];
                    case 4:
                        error_1 = _a.sent();
                        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogSource"].create(componentName), error_1, _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["StringHelper"].format('{0} retry (retryTimes={1}) failed', scenarioName, (retryTimes - i)));
                        if (i === 0) {
                            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEvent(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["StringHelper"].format('{0}.{1}.retryFailed, retry for {2} times', componentName, scenarioName, retryTimes));
                            throw error_1;
                        }
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return RetryHelper;
}());
/* harmony default export */ __webpack_exports__["default"] = (RetryHelper);


/***/ }),

/***/ "OLPK":
/*!*******************************!*\
  !*** ./lib/SPResourcePath.js ***!
  \*******************************/
/*! exports provided: SPResourcePath, SPResourcePathFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-resource-path/lib/SPResourcePath */ "SzMl");
/* harmony import */ var _ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPResourcePath", function() { return _ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_0__["SPResourcePath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPResourcePathFormat", function() { return _ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_0__["SPResourcePathFormat"]; });




/***/ }),

/***/ "OLYq":
/*!*************************************************!*\
  !*** ./lib/pageService/PageServiceEventArgs.js ***!
  \*************************************************/
/*! exports provided: PageServiceEventArgs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageServiceEventArgs", function() { return PageServiceEventArgs; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Microsoft Corporation. All rights reserved.
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

var PageServiceEventArgs = /** @class */ (function (_super) {
    __extends(PageServiceEventArgs, _super);
    function PageServiceEventArgs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PageServiceEventArgs;
}(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["SPEventArgs"]));



/***/ }),

/***/ "OZx+":
/*!********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/models/chrome/ChromeOptions.js ***!
  \********************************************************************************************************************************************************************************************/
/*! exports provided: ChromeControlType, NavPlacementType, HeaderLayoutType, UnifiedHeaderLayout, FooterLayout, FooterEmphasis */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChromeControlType", function() { return ChromeControlType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavPlacementType", function() { return NavPlacementType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderLayoutType", function() { return HeaderLayoutType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnifiedHeaderLayout", function() { return UnifiedHeaderLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterLayout", function() { return FooterLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterEmphasis", function() { return FooterEmphasis; });
/**
 * Types of supported chrome controls
 */
var ChromeControlType;
(function (ChromeControlType) {
    ChromeControlType[ChromeControlType["HEADER"] = 0] = "HEADER";
    ChromeControlType[ChromeControlType["NAV"] = 1] = "NAV";
    ChromeControlType[ChromeControlType["FOOTER"] = 2] = "FOOTER";
    ChromeControlType[ChromeControlType["SEARCHBOX"] = 3] = "SEARCHBOX";
})(ChromeControlType || (ChromeControlType = {}));
var NavPlacementType;
(function (NavPlacementType) {
    NavPlacementType[NavPlacementType["LEFT"] = 0] = "LEFT";
    NavPlacementType[NavPlacementType["HORIZONTAL"] = 1] = "HORIZONTAL";
})(NavPlacementType || (NavPlacementType = {}));
/**
 * @deprecated see UnifiedHeaderLayout
 * Defines supported layout type for composite header control.
 * Currently the layout type is indicated from nav placement.
 */
var HeaderLayoutType;
(function (HeaderLayoutType) {
    /** Composite header control takes full width of the page */
    HeaderLayoutType[HeaderLayoutType["FULLBLEED"] = 0] = "FULLBLEED";
    /** Composite header control is placed on a page with left nav */
    HeaderLayoutType[HeaderLayoutType["WITHLEFTNAV"] = 1] = "WITHLEFTNAV";
})(HeaderLayoutType || (HeaderLayoutType = {}));
/** The layout to use for the new UnifiedHeader, which replaces the old headers. */
var UnifiedHeaderLayout;
(function (UnifiedHeaderLayout) {
    /** @deprecated none, don't use the UnifiedHeader and fall back to the old headers */
    UnifiedHeaderLayout[UnifiedHeaderLayout["none"] = 0] = "none";
    /** Large */
    UnifiedHeaderLayout[UnifiedHeaderLayout["standard"] = 1] = "standard";
    /** Medium */
    UnifiedHeaderLayout[UnifiedHeaderLayout["compact"] = 2] = "compact";
    /** @deprecated not currently supported */
    UnifiedHeaderLayout[UnifiedHeaderLayout["minimal"] = 3] = "minimal";
})(UnifiedHeaderLayout || (UnifiedHeaderLayout = {}));
/**
 * The layout to use for the footer
 */
var FooterLayout;
(function (FooterLayout) {
    FooterLayout[FooterLayout["SIMPLE"] = 0] = "SIMPLE";
    FooterLayout[FooterLayout["EXTENDED"] = 1] = "EXTENDED";
    FooterLayout[FooterLayout["STACKED"] = 2] = "STACKED";
})(FooterLayout || (FooterLayout = {}));
/**
 * The emphasis to use in the footer.
 * Note that this is different than the enum ordering that fabric uses, in order
 * to have strong be the default for unset variants in the property flags
 */
var FooterEmphasis;
(function (FooterEmphasis) {
    FooterEmphasis[FooterEmphasis["Strong"] = 0] = "Strong";
    FooterEmphasis[FooterEmphasis["Neutral"] = 1] = "Neutral";
    FooterEmphasis[FooterEmphasis["Soft"] = 2] = "Soft";
    FooterEmphasis[FooterEmphasis["None"] = 3] = "None";
})(FooterEmphasis || (FooterEmphasis = {}));
//# sourceMappingURL=ChromeOptions.js.map

/***/ }),

/***/ "Op9h":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/collapsibleSection/CollapsibleSection.module.css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".sectionHeader_4b8744d8{background:0 0;border:none;cursor:pointer;width:100%;height:40px}.sectionLabel_4b8744d8{font-size:14px;font-weight:600;color:\"[theme:neutralPrimary, default: #323130]\";vertical-align:middle;cursor:pointer}[dir=ltr] .sectionLabel_4b8744d8{margin-left:20px}[dir=rtl] .sectionLabel_4b8744d8{margin-right:20px}[dir=ltr] .sectionLabel_4b8744d8{text-align:left}[dir=rtl] .sectionLabel_4b8744d8{text-align:right}.sectionIcon_4b8744d8{margin-top:8px}[dir=ltr] .sectionIcon_4b8744d8{float:left}[dir=rtl] .sectionIcon_4b8744d8{float:right}", ""]);



/***/ }),

/***/ "P0ji":
/*!**************************************!*\
  !*** ./lib/assets/defaultImage4.jpg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "defaultimage4_81bc4a8b72b50ed6d2c8ade310fbfd98.jpg";

/***/ }),

/***/ "PWeR":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/pageTemplates/sleekTemplateImageTile.jpg ***!
  \*****************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "sleektemplateimagetile_1beada90c670860d97a36422a258917a.jpg";

/***/ }),

/***/ "PdVp":
/*!******************************!*\
  !*** ./lib/layouts/index.js ***!
  \******************************/
/*! exports provided: PreviewUtility, PreviewHelper, ThumbnailProviderType, ThumbnailUrlGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PreviewUtility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PreviewUtility */ "yqC6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PreviewUtility", function() { return _PreviewUtility__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _PreviewHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PreviewHelper */ "+ERe");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PreviewHelper", function() { return _PreviewHelper__WEBPACK_IMPORTED_MODULE_1__["PreviewHelper"]; });

/* harmony import */ var _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThumbnailProviderType */ "b6+P");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThumbnailProviderType", function() { return _ThumbnailProviderType__WEBPACK_IMPORTED_MODULE_2__["ThumbnailProviderType"]; });

/* harmony import */ var _ThumbnailUrlGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThumbnailUrlGenerator */ "KCwX");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThumbnailUrlGenerator", function() { return _ThumbnailUrlGenerator__WEBPACK_IMPORTED_MODULE_3__["default"]; });







/***/ }),

/***/ "Pk8u":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Pk8u__;

/***/ }),

/***/ "Q67u":
/*!******************************************!*\
  !*** ./lib/multilingual/Multilingual.js ***!
  \******************************************/
/*! exports provided: Multilingual */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Multilingual", function() { return Multilingual; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pageService_PageService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pageService/PageService */ "j21u");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__);




var MULTILINGUAL_FLIGHT = 1199; /* Multilingual and Translation settings */
var PREFIX = 'Multilingual';
var LANGUAGE_PREFERENCE_COOKIE = 'siteLangPref';
var SETTINGS_DELIMITER = '.';
var VALUES_DELIMITER = '_';
var COOKIE_VALUE_INDEX = 2;
var SITE_ID_INDEX = 0;
var WEB_ID_INDEX = 1;
var CULTURE_INDEX = 2;
var LANGUAGE_SETTING_PARTS = 3;
var Multilingual = /** @class */ (function () {
    function Multilingual() {
    }
    Multilingual.isEnabled = function (serviceScope) {
        return Multilingual.isFlightEnabled() && Multilingual._isFeatureEnabled(serviceScope);
    };
    Multilingual.isFlightEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(MULTILINGUAL_FLIGHT);
    };
    Multilingual.getLanguageOverrides = function (serviceScope) {
        var matches = document.cookie.match(Multilingual._matchExpression);
        var result = [];
        Multilingual._ensureServices(serviceScope);
        var preferences = (matches && matches.length > COOKIE_VALUE_INDEX && matches[COOKIE_VALUE_INDEX]);
        if (preferences) {
            // unpack the language settings to a format easier to process
            var siteLanguageSettings = preferences.split(SETTINGS_DELIMITER);
            siteLanguageSettings.map(function (languageSetting) {
                var parts = languageSetting.split(VALUES_DELIMITER);
                if (parts.length === LANGUAGE_SETTING_PARTS) {
                    result.push({
                        SiteId: parts[SITE_ID_INDEX],
                        WebId: parts[WEB_ID_INDEX],
                        Culture: parts[CULTURE_INDEX]
                    });
                }
            });
        }
        return result;
    };
    /**
     * Get the current language language of the page or the web default.
     * Returns undefined if the multilingual feature is not enabled.
     */
    Multilingual.getPageLanguage = function (serviceScope) {
        var _this = this;
        if (!Multilingual.isEnabled(serviceScope)) {
            return Promise.resolve(undefined);
        }
        var monitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"](PREFIX + ".GetPageLanguage");
        Multilingual._ensureServices(serviceScope);
        return Multilingual._pageService.getCurrentItem()
            .then(function (clientForm) {
            // See if the page is a page translation and what language it was translated to.
            var translationLanguage = '';
            var sourceItemId = undefined;
            if (clientForm &&
                clientForm.item &&
                clientForm.item.properties) {
                var pageProperties = clientForm.item.properties;
                // @todo: VS #765535 - create a way to validate language code
                translationLanguage = pageProperties._SPTranslationLanguage || '';
                sourceItemId = pageProperties._SPTranslationSourceItemId;
            }
            if (!translationLanguage) {
                translationLanguage = _this._defaultLanguageName;
            }
            monitor.writeSuccess();
            return Promise.resolve({
                LanguageCode: translationLanguage.toLowerCase(),
                SourceItemId: sourceItemId
            });
        })
            .catch(function (error) {
            monitor.writeUnexpectedFailure('GetPageLanguageFailure', error);
            // fallback to web site language in case of failure
            return Promise.resolve({
                LanguageCode: _this._defaultLanguageName
            });
        });
    };
    Object.defineProperty(Multilingual, "_defaultLanguageName", {
        get: function () {
            // @todo: VS #789033 - remove fallback to cultureInfo.currentCultureName when languageName is available.
            return (Multilingual._pageContext.web.languageName ||
                Multilingual._pageContext.cultureInfo.currentCultureName).toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    Multilingual._isFeatureEnabled = function (serviceScope) {
        Multilingual._ensureServices(serviceScope);
        var feature = Multilingual._pageContext._featureInfo.get('MultilingualPages');
        return Boolean(feature && feature.enabled);
    };
    Multilingual._ensureServices = function (serviceScope) {
        if (!Multilingual._pageService) {
            serviceScope.whenFinished(function () {
                Multilingual._pageService = serviceScope.consume(_pageService_PageService__WEBPACK_IMPORTED_MODULE_2__["PageService"].serviceKey);
                Multilingual._pageContext = serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__["PageContext"].serviceKey);
            });
        }
    };
    Multilingual._matchExpression = new RegExp('(^|;) ?' + LANGUAGE_PREFERENCE_COOKIE + '=([^;]*)(;|$)');
    return Multilingual;
}());



/***/ }),

/***/ "Q6WH":
/*!**************************************************!*\
  !*** ./lib/browserUtilities/BrowserUtilities.js ***!
  \**************************************************/
/*! exports provided: BrowserUtilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserUtilities", function() { return BrowserUtilities; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file BrowserUtilities contains common utilities for browser related operations.
 */


var BrowserUtilities = /** @class */ (function () {
    function BrowserUtilities() {
    }
    BrowserUtilities.isWebViewHosted = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_BrowserUtilities"].isWebViewHosted();
    };
    BrowserUtilities.isTeamsHosted = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_BrowserUtilities"].isTeamsHosted();
    };
    BrowserUtilities.isTeamsWebViewHosted = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_BrowserUtilities"].isTeamsWebViewHosted();
    };
    BrowserUtilities.isTeamsBrowserHosted = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_BrowserUtilities"].isTeamsBrowserHosted();
    };
    BrowserUtilities.isSharePointiOSApp = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_BrowserUtilities"].isSharePointiOSApp();
    };
    BrowserUtilities.isMobileWebView = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_BrowserUtilities"].isMobileWebView();
    };
    BrowserUtilities.isMobileBrowser = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_BrowserUtilities"].isMobileBrowser();
    };
    BrowserUtilities.isEmbedded = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_BrowserUtilities"].isEmbedded();
    };
    BrowserUtilities.yieldToEventLoop = function (arg) {
        if (this._isPaintStarvationEnabled()) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(BrowserUtilities._logSource, 'yielding execution to event loop');
            // tslint:disable-next-line no-string-based-set-timeout
            return new Promise(function (resolve) { return setTimeout(function () { return resolve(arg); }, 0); });
        }
        else {
            return Promise.resolve(arg);
        }
    };
    BrowserUtilities.supportsServiceWorker = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_BrowserUtilities"].supportsServiceWorker();
    };
    BrowserUtilities.supportsNavigationPreload = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_BrowserUtilities"].supportsNavigationPreload();
    };
    BrowserUtilities._isPaintStarvationEnabled = function () {
        return (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('9E817C9A-1F6C-4917-878C-BD5AE7218CEC'), '07/02/2019', 'Fix paint starvation problem for SPClient') && _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1618 /*SPPPlatPaintStarvationSPClient */));
    };
    BrowserUtilities._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('BrowserUtilities');
    return BrowserUtilities;
}());



/***/ }),

/***/ "QZvf":
/*!**************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryWall.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegallerywall_e5b71c353989b7d37a6d628ac28479f9.png";

/***/ }),

/***/ "R+rM":
/*!******************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryLoungeSm.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegalleryloungesm_b893002b05f59bd94369e6b69550d5bd.png";

/***/ }),

/***/ "RCxI":
/*!********************************************!*\
  !*** ./lib/assets/reportDefaultImage5.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "reportdefaultimage5_ee2f09776d293cd0e49c078252aba4e7.png";

/***/ }),

/***/ "RGPq":
/*!****************************************!*\
  !*** ./lib/dialog/PageDialog.types.js ***!
  \****************************************/
/*! exports provided: DialogActionTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogActionTypes", function() { return DialogActionTypes; });
var DialogActionTypes;
(function (DialogActionTypes) {
    DialogActionTypes[DialogActionTypes["NONE"] = 0] = "NONE";
    DialogActionTypes[DialogActionTypes["CLOSE_ACTION"] = 1] = "CLOSE_ACTION";
    DialogActionTypes[DialogActionTypes["SAVE_ACTION"] = 2] = "SAVE_ACTION";
    DialogActionTypes[DialogActionTypes["CONFIRM_ACTION"] = 3] = "CONFIRM_ACTION";
})(DialogActionTypes || (DialogActionTypes = {}));


/***/ }),

/***/ "Rhzx":
/*!******************************************************************!*\
  !*** ./lib/collapsibleSection/CollapsibleSection.module.scss.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./CollapsibleSection.module.css */ "w34T");
var styles = {
    sectionHeader: 'sectionHeader_4b8744d8',
    sectionLabel: 'sectionLabel_4b8744d8',
    sectionIcon: 'sectionIcon_4b8744d8'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "RiH0":
/*!**********************************!*\
  !*** ./lib/retryHelper/index.js ***!
  \**********************************/
/*! exports provided: RetryHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RetryHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RetryHelper */ "NCyZ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RetryHelper", function() { return _RetryHelper__WEBPACK_IMPORTED_MODULE_0__["default"]; });

// tslint:disable:export-name



/***/ }),

/***/ "Ss4T":
/*!*********************************************!*\
  !*** ./lib/toolbarButton/ToolbarButton.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolbarButton.css */ "Ihzg");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "SzMl":
/*!**************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/sp-resource-path/0.7.2/node_modules/@ms/sp-resource-path/lib/SPResourcePath.js ***!
  \**************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @public
 */
var SPResourcePathFormat;
(function (SPResourcePathFormat) {
    SPResourcePathFormat[SPResourcePathFormat["absolute"] = 0] = "absolute";
    SPResourcePathFormat[SPResourcePathFormat["relative"] = 1] = "relative";
    SPResourcePathFormat[SPResourcePathFormat["serverRelative"] = 2] = "serverRelative";
})(SPResourcePathFormat = exports.SPResourcePathFormat || (exports.SPResourcePathFormat = {}));
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
exports.SPResourcePath = SPResourcePath;
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

/***/ "TUkU":
/*!****************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryWoodSm.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegallerywoodsm_c5ee96ed6fd1f2d9d1311ec2e02888c4.png";

/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "UY3P":
/*!*************************************************!*\
  !*** ./lib/assets/portfolioDefaultImage3sm.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfoliodefaultimage3sm_01b3fbe5d4c09ab226603928bac70160.png";

/***/ }),

/***/ "VMpG":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/news/carousel/newsCarousel1sm.png ***!
  \**********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "newscarousel1sm_18fd59a172858435a3a0fa05bd32dd74.png";

/***/ }),

/***/ "VibQ":
/*!*****************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryLampsSm.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegallerylampssm_1773f16fd7c9656d525a8b1cb3c55113.png";

/***/ }),

/***/ "WBWG":
/*!*******************************************!*\
  !*** ./lib/urlUtilities/toRelativeUrl.js ***!
  \*******************************************/
/*! exports provided: toRelativeUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRelativeUrl", function() { return toRelativeUrl; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "mwqp");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */

/**
 * Converts an input url to server-relative format
 * @param url Required non-empty URL
 * @see SPHome has a copy that must be kept in sync to avoid
 *  100+K bump even if by lib path.
 */
function toRelativeUrl(url) {
    return new _index__WEBPACK_IMPORTED_MODULE_0__["SPResourcePath"](url).path;
}


/***/ }),

/***/ "WUZl":
/*!**************************************************************!*\
  !*** ./lib/limitedLengthTextField/LimitedLengthTextField.js ***!
  \**************************************************************/
/*! exports provided: LimitedLengthTextField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LimitedLengthTextField", function() { return LimitedLengthTextField; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _screenReaderAlert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../screenReaderAlert */ "e/jN");
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CHARS_LEFT_READER_DELAY_IN_MILLISECONDS = 1000;
var LimitedLengthTextField = /** @class */ (function (_super) {
    __extends(LimitedLengthTextField, _super);
    function LimitedLengthTextField(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: props.defaultValue
        };
        _this._debouncedCharactersLeft =
            _this._async.debounce(_this._readCharactersLeft, CHARS_LEFT_READER_DELAY_IN_MILLISECONDS);
        return _this;
    }
    LimitedLengthTextField.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["TextField"], __assign({}, this.props, { description: this._charactersLeftMessage, onChange: this._handleChanged, value: this.state.value })));
    };
    Object.defineProperty(LimitedLengthTextField.prototype, "value", {
        get: function () {
            return this.state.value;
        },
        enumerable: true,
        configurable: true
    });
    LimitedLengthTextField.prototype._handleChanged = function (event, value) {
        this.setState({ value: value }, this._handleTextStateUpdated);
    };
    LimitedLengthTextField.prototype._handleTextStateUpdated = function () {
        var _a = this.props, maxLength = _a.maxLength, onChanged = _a.onChanged;
        var text = this.state.value;
        if (onChanged) {
            onChanged(text);
        }
        if (text) {
            if (text.length === maxLength) {
                try {
                    this._debouncedCharactersLeft.cancel();
                }
                catch (ex) {
                    // ignore, not critical
                }
                this._readCharactersLeft();
            }
            else {
                this._debouncedCharactersLeft(text);
            }
        }
    };
    Object.defineProperty(LimitedLengthTextField.prototype, "_charactersLeftMessage", {
        get: function () {
            var textCharactersCount = this.state.value ? this.state.value.length : 0;
            return this.props.getLimitedLengthMessage(this.props.maxLength - textCharactersCount);
        },
        enumerable: true,
        configurable: true
    });
    LimitedLengthTextField.prototype._readCharactersLeft = function () {
        _screenReaderAlert__WEBPACK_IMPORTED_MODULE_2__["ScreenReaderAlert"].read(this._charactersLeftMessage, 1 /* ReadAfterOtherContent */);
    };
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], LimitedLengthTextField.prototype, "_handleChanged", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], LimitedLengthTextField.prototype, "_readCharactersLeft", null);
    return LimitedLengthTextField;
}(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["BaseComponent"]));



/***/ }),

/***/ "X+PM":
/*!*********************************************!*\
  !*** external "@microsoft/sp-page-context" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_X_PM__;

/***/ }),

/***/ "Xr2F":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/screenReaderAlert/ScreenReaderAlert.module.css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".screenReaderAlert_e207ba1c{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}", ""]);



/***/ }),

/***/ "YEwp":
/*!*************************************************!*\
  !*** ./lib/assets/portfolioDefaultImage2sm.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfoliodefaultimage2sm_e09f7d0f631ecfc5bbb0a9d114055477.png";

/***/ }),

/***/ "YFf/":
/*!**************************************************************!*\
  !*** ./lib/fileTypeIcons/renderers/FileTypeIcons.module.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./FileTypeIcons.module.css */ "vINC");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "Ycni":
/*!*************************************!*\
  !*** external "@ms/i18n-utilities" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Ycni__;

/***/ }),

/***/ "Yf54":
/*!**********************************!*\
  !*** ./lib/pageService/index.js ***!
  \**********************************/
/*! exports provided: NavPlacementType, PageService, PageServiceError, PageServiceEventArgs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_odsp_datasources_lib_models_chrome_ChromeOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-datasources/lib/models/chrome/ChromeOptions */ "OZx+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavPlacementType", function() { return _ms_odsp_datasources_lib_models_chrome_ChromeOptions__WEBPACK_IMPORTED_MODULE_0__["NavPlacementType"]; });

/* harmony import */ var _PageService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageService */ "j21u");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageService", function() { return _PageService__WEBPACK_IMPORTED_MODULE_1__["PageService"]; });

/* harmony import */ var _PageServiceError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PageServiceError */ "GyUw");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageServiceError", function() { return _PageServiceError__WEBPACK_IMPORTED_MODULE_2__["PageServiceError"]; });

/* harmony import */ var _PageServiceEventArgs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PageServiceEventArgs */ "OLYq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageServiceEventArgs", function() { return _PageServiceEventArgs__WEBPACK_IMPORTED_MODULE_3__["PageServiceEventArgs"]; });







/***/ }),

/***/ "Yvvq":
/*!******************************************************!*\
  !*** ./lib/collapsibleSection/CollapsibleSection.js ***!
  \******************************************************/
/*! exports provided: CollapsibleSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollapsibleSection", function() { return CollapsibleSection; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CollapsibleSection_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CollapsibleSection.module.scss */ "Rhzx");
// Copyright (c) Microsoft Corporation. All rights reserved.
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CollapsibleSection = /** @class */ (function (_super) {
    __extends(CollapsibleSection, _super);
    function CollapsibleSection(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isExpanded: props.defaultExpanded
        };
        return _this;
    }
    CollapsibleSection.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
            this._renderSectionTitle(),
            this.state.isExpanded && this.props.children));
    };
    CollapsibleSection.prototype.focus = function () {
        if (this._ref) {
            this._ref.focus();
        }
    };
    CollapsibleSection.prototype._renderSectionTitle = function () {
        var rightToLeft = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["getRTL"])();
        var chevronIcon = this.state.isExpanded ? 'ChevronDown'
            : (rightToLeft ? 'ChevronLeft' : 'ChevronRight');
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: this.props.className },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: _CollapsibleSection_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].sectionHeader, "aria-expanded": this.state.isExpanded, onClick: this._onToggleExpand, ref: this._handleRef },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["Icon"], { className: _CollapsibleSection_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].sectionIcon, iconName: chevronIcon }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["Label"], { className: _CollapsibleSection_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].sectionLabel }, this.props.sectionLabel))));
    };
    CollapsibleSection.prototype._handleRef = function (ref) {
        this._ref = ref;
    };
    CollapsibleSection.prototype._onToggleExpand = function () {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    };
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], CollapsibleSection.prototype, "_handleRef", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], CollapsibleSection.prototype, "_onToggleExpand", null);
    return CollapsibleSection;
}(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["BaseComponent"]));



/***/ }),

/***/ "YzAc":
/*!*************************************!*\
  !*** ./lib/dialog/DialogUtility.js ***!
  \*************************************/
/*! exports provided: DialogUtility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogUtility", function() { return DialogUtility; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DialogUtility_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DialogUtility.scss */ "Dmv+");
/* harmony import */ var _DialogUtility_resx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DialogUtility.resx */ "2oeR");
/* harmony import */ var _DeferredPageDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DeferredPageDialog */ "4r+a");
/* harmony import */ var _PageDialog_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PageDialog.types */ "RGPq");






var DialogUtility = /** @class */ (function () {
    function DialogUtility() {
    }
    Object.defineProperty(DialogUtility, "dialog", {
        get: function () {
            return DialogUtility._dialog;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DialogUtility, "dialogDiv", {
        /*
         * Lazy create the div that renders the dialog
         */
        get: function () {
            if (!DialogUtility._dialogDiv) {
                // Ensures the div that renders dialog exists
                DialogUtility._dialogDiv = document.createElement('div');
                document.body.appendChild(DialogUtility._dialogDiv);
            }
            return DialogUtility._dialogDiv;
        },
        enumerable: true,
        configurable: true
    });
    /*
     * Display error message in a blocking modal dialog with a close button
     */
    DialogUtility.showError = function (errorData) {
        errorData.title = errorData.title ? errorData.title : _DialogUtility_resx__WEBPACK_IMPORTED_MODULE_3__["default"].GenericErrorTitle;
        errorData.actionType = _PageDialog_types__WEBPACK_IMPORTED_MODULE_5__["DialogActionTypes"].CLOSE_ACTION;
        errorData.name = 'showError';
        DialogUtility._dialog = react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_DeferredPageDialog__WEBPACK_IMPORTED_MODULE_4__["DeferredPageDialog"], errorData), DialogUtility.dialogDiv);
    };
    /*
     * Display setting message in a blocking modal dialog with a save button
     */
    DialogUtility.showDialog = function (title, element, callback, type) {
        DialogUtility._dialog = react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_DeferredPageDialog__WEBPACK_IMPORTED_MODULE_4__["DeferredPageDialog"], {
            title: title,
            contentElement: element,
            actionType: type || _PageDialog_types__WEBPACK_IMPORTED_MODULE_5__["DialogActionTypes"].SAVE_ACTION,
            callback: callback,
            name: 'showDialog'
        }), DialogUtility.dialogDiv);
    };
    /*
     * Display setting message in a blocking modal dialog with a yes/no option
    */
    DialogUtility.showConfirmationDialog = function (title, element, callback, cancelCallback, subText, ignoreExternalFocusing) {
        DialogUtility._dialog =
            react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_DeferredPageDialog__WEBPACK_IMPORTED_MODULE_4__["DeferredPageDialog"], {
                title: title,
                subText: subText,
                contentElement: element,
                actionType: _PageDialog_types__WEBPACK_IMPORTED_MODULE_5__["DialogActionTypes"].CONFIRM_ACTION,
                callback: callback,
                name: 'showConfirmationDialog',
                cancelCallback: cancelCallback,
                ignoreExternalFocusing: ignoreExternalFocusing === undefined ? true : ignoreExternalFocusing
            }), DialogUtility.dialogDiv);
    };
    /*
     * Show progress bar with a message in a blocking modal dialog
     */
    DialogUtility.showProgressBar = function (message) {
        DialogUtility._showProgressBarTimer = undefined;
        DialogUtility._dialog = react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_DeferredPageDialog__WEBPACK_IMPORTED_MODULE_4__["DeferredPageDialog"], {
            message: message,
            actionType: _PageDialog_types__WEBPACK_IMPORTED_MODULE_5__["DialogActionTypes"].NONE,
            name: 'showProgressBar'
        }), DialogUtility.dialogDiv);
    };
    DialogUtility.showProgressBarWithDelay = function (message) {
        DialogUtility._showProgressBarTimer = window.setTimeout(DialogUtility.showProgressBar, 500, message);
    };
    /*
     * Dismiss progress bar if any
     */
    DialogUtility.dismissProgressBar = function () {
        if (DialogUtility._showProgressBarTimer) {
            window.clearTimeout(DialogUtility._showProgressBarTimer);
            DialogUtility._showProgressBarTimer = undefined;
        }
        else {
            DialogUtility._dialog = react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_DeferredPageDialog__WEBPACK_IMPORTED_MODULE_4__["DeferredPageDialog"], {
                hidden: true
            }), DialogUtility.dialogDiv);
        }
    };
    return DialogUtility;
}());



/***/ }),

/***/ "Z675":
/*!*****************************!*\
  !*** ./lib/dialog/index.js ***!
  \*****************************/
/*! exports provided: DialogUtility, DialogActionTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DialogUtility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DialogUtility */ "YzAc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogUtility", function() { return _DialogUtility__WEBPACK_IMPORTED_MODULE_0__["DialogUtility"]; });

/* harmony import */ var _PageDialog_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageDialog.types */ "RGPq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogActionTypes", function() { return _PageDialog_types__WEBPACK_IMPORTED_MODULE_1__["DialogActionTypes"]; });





/***/ }),

/***/ "Ze8N":
/*!************************************!*\
  !*** ./lib/fileTypeIcons/Icons.js ***!
  \************************************/
/*! exports provided: DEFAULT_EXTENSION, DEFAULT_SIZE, FOLDER_EXTENSION, LIST_ITEM_EXTENSION, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EXTENSION", function() { return DEFAULT_EXTENSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SIZE", function() { return DEFAULT_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FOLDER_EXTENSION", function() { return FOLDER_EXTENSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LIST_ITEM_EXTENSION", function() { return LIST_ITEM_EXTENSION; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FileTypeIconMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FileTypeIconMap */ "H3mH");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file utility functions to get file icon image url and file icon color
 * based on the file extension. For icon image url, you can specify the size of the icon.
 * Default icon size is 32. All the supported extension types are defined at FileTypeIconMap.ts
 */


var DEFAULT_EXTENSION = 'genericfile';
var DEFAULT_SIZE = 32;
var FOLDER_EXTENSION = 'folder';
var LIST_ITEM_EXTENSION = 'listItem';
var BASE_URL = 'https://spoprod-a.akamaihd.net/files/fabric/assets/item-types';
var DEFAULT_PIXEL_RATIO_SUFFIX = '';
var DEFAULT_PIXEL_RATIO = 1;
var FLUENT_URL_SEGMENT = '-fluent';
var Icons = /** @class */ (function () {
    function Icons() {
    }
    /**
     * Get file type icon color from the file extension if it is defined in IconExtMap
     * @return icon color string for the file type based on its extension.
     * if the extension is not defined, return default color which is '6B6B6B'.
     */
    Icons.getIconColorFromExtension = function (extension) {
        'use strict';
        var icon = _FileTypeIconMap__WEBPACK_IMPORTED_MODULE_1__["ICON_EXT_MAP"][extension] || { color: _FileTypeIconMap__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_ICON_COLOR"] };
        return icon.color;
    };
    /**
     * Get file type icon url that is available at @uifabric/file-type-icons module.
     * @return icon url in the @uifabric/file-type-icons module. The default size is 32 by 32.
     */
    Icons.getIconUrl = function (extension, size) {
        if (size === void 0) { size = DEFAULT_SIZE; }
        var pixelRatioSuffix = DEFAULT_PIXEL_RATIO_SUFFIX;
        var devicePixelRatio = window.devicePixelRatio;
        if (devicePixelRatio > DEFAULT_PIXEL_RATIO && devicePixelRatio <= 1.5) {
            pixelRatioSuffix = '_1.5x';
        }
        else if (devicePixelRatio > 1.5 && devicePixelRatio <= 2) {
            pixelRatioSuffix = '_2x';
        }
        else if (devicePixelRatio > 2 && devicePixelRatio <= 3) {
            pixelRatioSuffix = '_3x';
        }
        else if (devicePixelRatio > 3) {
            pixelRatioSuffix = '_4x';
        }
        var iconName;
        if (extension === FOLDER_EXTENSION) {
            iconName = FOLDER_EXTENSION;
        }
        else if (extension === LIST_ITEM_EXTENSION) {
            iconName = 'splist';
        }
        else {
            iconName = _FileTypeIconMap__WEBPACK_IMPORTED_MODULE_1__["EXTENSIONS_TO_FILENAME_MAP"][extension] || DEFAULT_EXTENSION;
        }
        if (size > DEFAULT_SIZE &&
            devicePixelRatio > DEFAULT_PIXEL_RATIO &&
            // Only apply for integer ratios to avoid non-existent sizes from 1.5 etc.
            devicePixelRatio === Math.floor(devicePixelRatio)) {
            size /= devicePixelRatio;
        }
        var baseUrl = BASE_URL;
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1269 /*UseNewFluentIcons*/)) {
            baseUrl += FLUENT_URL_SEGMENT;
        }
        return baseUrl + "/" + size + pixelRatioSuffix + "/" + iconName + ".png";
    };
    return Icons;
}());
/* harmony default export */ __webpack_exports__["default"] = (Icons);


/***/ }),

/***/ "ZzUU":
/*!********************************************!*\
  !*** ./lib/assets/reportDefaultImage1.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "reportdefaultimage1_9c5a39f9e081c6e44e752f1a2791affc.png";

/***/ }),

/***/ "a9vk":
/*!********************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryCushionsSm.png ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegallerycushionssm_411ebbd9f24473c6637ba6eb5eb604cd.png";

/***/ }),

/***/ "aEnU":
/*!**************************************************!*\
  !*** ./lib/fileTypeIcons/FileTypeIconsLoader.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var FileTypeIconsLoader = /** @class */ (function () {
    function FileTypeIconsLoader() {
    }
    FileTypeIconsLoader.loadIconsModule = function () {
        return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./Icons */ "Ze8N")).then(function (icons) { return icons.default; });
    };
    return FileTypeIconsLoader;
}());
/* harmony default export */ __webpack_exports__["default"] = (FileTypeIconsLoader);


/***/ }),

/***/ "aW6M":
/*!**********************************************!*\
  !*** ./lib/coachmarkUtility/IFeatureHost.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "aY6P":
/*!*****************************************!*\
  !*** ./lib/collapsibleSection/index.js ***!
  \*****************************************/
/*! exports provided: CollapsibleSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CollapsibleSection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CollapsibleSection */ "Yvvq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CollapsibleSection", function() { return _CollapsibleSection__WEBPACK_IMPORTED_MODULE_0__["CollapsibleSection"]; });




/***/ }),

/***/ "aq00":
/*!**************************************************!*\
  !*** ./lib/coachmarkUtility/CoachmarkUtility.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */


/**
 * Unified control utility managing all coachmarks on a page regardless of which component is calling for it.
 * Manages localstorage/deferred loading/display sequence.
 * When consuming, call serviceScope.consume(coachmarkUtility.serviceKey) to get reference for the singleton.
 */
var CoachmarkUtility = /** @class */ (function () {
    function CoachmarkUtility() {
    }
    CoachmarkUtility.prototype.attachTeachingBubble = function (origHostProps) {
        return this._deferLoadingFeatureHostControl.then(function (featureHostControl) {
            var hostProps = featureHostControl.normalizeTeachingBubbleProps(origHostProps);
            return featureHostControl.attachFeatureHost(hostProps);
        });
    };
    CoachmarkUtility.prototype.attachCoachmark = function (origHostProps) {
        return this._deferLoadingFeatureHostControl.then(function (featureHostControl) {
            var hostProps = featureHostControl.normalizeCoachmarkHostProps(origHostProps);
            return featureHostControl.attachFeatureHost(hostProps);
        });
    };
    CoachmarkUtility.prototype.dismiss = function (localStorageKey, shouldSetLocalStorageKey) {
        this._deferLoadingFeatureHostControl.then(function (featureHostControl) {
            featureHostControl.dismissFeatureHost(localStorageKey, shouldSetLocalStorageKey);
        }).catch(function (error) { return _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(CoachmarkUtility._logSource, error); });
    };
    Object.defineProperty(CoachmarkUtility.prototype, "_deferLoadingFeatureHostControl", {
        get: function () {
            return Promise.all(/*! import() | sp-feature-host */[__webpack_require__.e("vendors~sp-dialog-utils~sp-feature-host"), __webpack_require__.e("vendors~sp-feature-host"), __webpack_require__.e("sp-feature-host")]).then(__webpack_require__.bind(null, /*! ./FeatureHostControl */ "6n3h")).then(function (featureHostControl) { return featureHostControl.default; });
        },
        enumerable: true,
        configurable: true
    });
    CoachmarkUtility.serviceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["ServiceKey"].create('sp-component-utilities:CoachmarkUtility', CoachmarkUtility);
    CoachmarkUtility._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('CoachmarkUtility');
    return CoachmarkUtility;
}());
/* harmony default export */ __webpack_exports__["default"] = (CoachmarkUtility);


/***/ }),

/***/ "b6+P":
/*!**********************************************!*\
  !*** ./lib/layouts/ThumbnailProviderType.js ***!
  \**********************************************/
/*! exports provided: ThumbnailProviderType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThumbnailProviderType", function() { return ThumbnailProviderType; });
/**
 * @file ThumbnailProviderType.ts
 * @copyright Microsoft Corporation. All rights reserved.
 */
/**
 * Type of the thumbnail URL service.
 */
var ThumbnailProviderType;
(function (ThumbnailProviderType) {
    /**
     * Unknwon URL type, possibly full path
     */
    ThumbnailProviderType[ThumbnailProviderType["Unknown"] = 0] = "Unknown";
    /**
     * URL served via private Content delivery network (CDN)
     */
    ThumbnailProviderType[ThumbnailProviderType["PrivateCDN"] = 1] = "PrivateCDN";
    /**
     * URL's pointing getPreview.aspx end point served by DocViz service.
     * This service is under deprecation process.
     */
    ThumbnailProviderType[ThumbnailProviderType["DocViz"] = 2] = "DocViz";
    /**
     * Media thumbnail micro service. This is core service for generating thumbnail.
     */
    ThumbnailProviderType[ThumbnailProviderType["MeTA"] = 3] = "MeTA";
    /**
     * Thumbnail Url is hosted on my site.
     */
    ThumbnailProviderType[ThumbnailProviderType["MySite"] = 4] = "MySite";
    /**
     * Thumbnail URL is same as original full Image path.
     */
    ThumbnailProviderType[ThumbnailProviderType["Original"] = 5] = "Original";
    /***
     * Actual type of the thumbnail provider is not known but it is hosted on same SharePoint host.
     */
    ThumbnailProviderType[ThumbnailProviderType["SharePointHost"] = 6] = "SharePointHost";
    /**
     * Thumbnail URL is representing stock image, hosted as static asset.
     */
    ThumbnailProviderType[ThumbnailProviderType["Stock"] = 7] = "Stock";
    /**
     * Always redirects to MeTA for thumbnail response.
     * it always redirects to MeTA.
     */
    ThumbnailProviderType[ThumbnailProviderType["VROOMMeTA"] = 8] = "VROOMMeTA";
    /**
     * VROOM thumbnail URL return response from alt stream cache if available before redirecting to MeTA.
     * This is similar to VROOMMeTA except it first leverage the cache before redirect.
     */
    ThumbnailProviderType[ThumbnailProviderType["VROOMMeTACache"] = 9] = "VROOMMeTACache";
})(ThumbnailProviderType || (ThumbnailProviderType = {}));


/***/ }),

/***/ "bMgq":
/*!***********************************************!*\
  !*** ./lib/assets/portfolioDefaultImage2.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfoliodefaultimage2_73f48f661024afc0e17ab6198432fcdc.png";

/***/ }),

/***/ "bO8f":
/*!**************************************!*\
  !*** ./lib/dialog/DialogUtility.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./DialogUtility.css */ "zcWH");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "bz/i":
/*!****************************!*\
  !*** ./lib/SPConstants.js ***!
  \****************************/
/*! exports provided: spConstants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spConstants", function() { return spConstants; });
var visioExtensions = ['vsdx', 'vsdm', 'vsd'];
var documentExtensions = ['doc', 'docx', 'xls', 'xlsx', 'pot', 'potx', 'ppt', 'pptx']
    .concat( true ? visioExtensions : undefined);
var documentExtensionsSet = new Set(documentExtensions);
var imageExtensions = ['gif', 'jpg', 'jpeg', 'bmp', 'dib', 'tif', 'tiff', 'ico', 'png', 'jxr',
    'svg'];
// @DMichon, VSO:418061 re-use InstantViewerHelper.ts from odsp-utilites when it merges
var previewableExtensions = [
    // tslint:disable-next-line:max-line-length
    // https://techcommunity.microsoft.com/t5/OneDrive-for-Business/Announcing-New-File-Viewers-Available-for-OneDrive-For-Business/m-p/60040
    // Documents:
    'csv', 'doc', 'docm', 'docx', 'dotx', 'eml', 'msg', 'odp', 'ods', 'odt', 'pdf', 'pot', 'potm', 'potx', 'pps', 'ppsx',
    'ppt', 'pptm', 'pptx', 'rtf', 'vsd', 'vsdx', 'xls', 'xlsb', 'xlsm', 'xlsx',
    // non-browser viewable images:
    'ai', 'arw', 'cr2', 'eps', 'erf', 'mrw', 'nef', 'orf', 'psd',
    // Video:
    '3gp', 'm4v', 'mov', 'mp4', 'wmv',
    // 3D:
    '3mf', 'fbx', 'obj', 'ply', 'stl',
    // Native:
    'cool', 'gltf', 'glb',
    // Medical:
    'dcm', 'dcm30', 'dic', 'dicm', 'dicom',
    // Text and code:
    'abap', 'ada', 'adp', 'ahk', 'as', 'as3', 'asc', 'ascx', 'asm', 'asp', 'awk', 'bash', 'bash_login', 'bash_logout',
    'bash_profile', 'bashrc', 'bat', 'bib', 'bsh', 'build', 'builder', 'c', 'c++', 'capfile', 'cc', 'cfc', 'cfm', 'cfml',
    'cl', 'clj', 'cls', 'cmake', 'cmd', 'coffee', 'cpp', 'cpt', 'cpy', 'cs', 'cshtml', 'cson', 'csproj', 'css', 'ctp',
    'cxx', 'd', 'ddl', 'di', 'dif', 'diff', 'disco', 'dml', 'dtd', 'dtml', 'el', 'emakefile', 'erb', 'erl', 'f', 'f90',
    'f95', 'fs', 'fsi', 'fsscript', 'fsx', 'gemfile', 'gemspec', 'gitconfig', 'go', 'groovy', 'gvy', 'h', 'h++', 'haml',
    'handlebars', 'hbs', 'hcp', 'hh', 'hpp', 'hrl', 'hs', 'htc', 'hxx', 'idl', 'iim', 'inc', 'inf', 'ini', 'inl', 'ipp',
    'irbrc', 'jade', 'jav', 'java', 'js', 'jsp', 'jsx', 'l', 'less', 'lhs', 'lisp', 'log', 'lst', 'ltx', 'lua', 'm',
    'make', 'markdn', 'markdown', 'md', 'mdown', 'mkdn', 'ml', 'mli', 'mll', 'mly', 'mm', 'mud', 'nfo', 'opml',
    'osascript', 'out', 'p', 'pas', 'patch', 'php', 'php2', 'php3', 'php4', 'php5', 'phtml', 'pl', 'plist', 'pm', 'pod',
    'pp', 'profile', 'properties', 'ps1', 'pt', 'py', 'pyw', 'r', 'rake', 'rb', 'rbx', 'rc', 're', 'readme', 'reg',
    'rest', 'resw', 'resx', 'rhtml', 'rjs', 'rprofile', 'rpy', 'rss', 'rst', 'rxml', 's', 'sass', 'scala', 'scm',
    'sconscript', 'sconstruct', 'script', 'scss', 'sgml', 'sh', 'shtml', 'sml', 'sql', 'sty', 'tcl', 'tex', 'text',
    'textile', 'tld', 'tli', 'tmpl', 'tpl', 'txt', 'vb', 'vi', 'vim', 'wsdl', 'xhtml', 'xml', 'xoml', 'xsd', 'xsl',
    'xslt', 'yaml', 'yaws', 'yml', 'zsh'
];
var previewableExtensionsSet = new Set(previewableExtensions);
var spConstants = {
    get documentExtensions() {
        return spConstants.isPreviewableExtensionsEnabled() ? previewableExtensions : documentExtensions;
    },
    get documentExtensionsSet() {
        return spConstants.isPreviewableExtensionsEnabled() ? previewableExtensionsSet : documentExtensionsSet;
    },
    embedPath: '/_layouts/15/embed.aspx',
    filePickerActivityFetchLimit: 250,
    filePickerMaxRowCount: 20,
    genericFile: 'genericFile',
    imageExtensions: imageExtensions,
    imageExtensionsSet: new Set(imageExtensions),
    /** Enabled in SPO other than Gallatin */
    isPreviewableExtensionsEnabled: function () {
        if (false) {}
        else {
            var origin_1 = location.origin ? location.origin.toLowerCase() : undefined;
            if (origin_1) {
                return origin_1.indexOf('.cn') !== origin_1.length - 3;
            }
            return true;
        }
    },
    officeDocumentExtensionsSet: documentExtensionsSet,
    oneDrivePath: '/_layouts/15/onedrive.aspx',
    previewHandlerPath: '/_layouts/15/getpreview.ashx',
    // video file extensions within the support preview file types
    videoExtensions: ['3gp', 'asf', 'avi', 'mod', 'mov', 'mp4', 'mpeg', 'mpg', 'mts', 'ts', 'vob', 'wmv'],
    wacPath: '/_layouts/15/wopiframe.aspx'
};


/***/ }),

/***/ "cDcd":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_cDcd__;

/***/ }),

/***/ "e/jN":
/*!****************************************!*\
  !*** ./lib/screenReaderAlert/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ScreenReaderAlert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ScreenReaderAlert */ "etMW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenReaderAlert", function() { return _ScreenReaderAlert__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _ScreenReaderAlertProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ScreenReaderAlertProps */ "rgtK");
/* harmony import */ var _ScreenReaderAlertProps__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ScreenReaderAlertProps__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _ScreenReaderAlertProps__WEBPACK_IMPORTED_MODULE_1__) if(["ScreenReaderAlert","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _ScreenReaderAlertProps__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "eikI":
/*!*****************************************************************!*\
  !*** ./lib/dateTimeHelper/getRelativeDateTimeStringForLists.js ***!
  \*****************************************************************/
/*! exports provided: getRelativeDateTimeStringForLists, isSameDay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRelativeDateTimeStringForLists", function() { return getRelativeDateTimeStringForLists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSameDay", function() { return isSameDay; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/i18n-utilities */ "Ycni");
/* harmony import */ var _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DateTimeHelper_resx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DateTimeHelper.resx */ "DtM7");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */



var ONE_SECOND = 1000;
var ONE_MINUTE = 60 * ONE_SECOND;
var ONE_HOUR = 60 * ONE_MINUTE;
function _getModifiedDate(millisecondsDifference, future) {
    if (!future) {
        millisecondsDifference = -millisecondsDifference;
    }
    return new Date(Date.now() + millisecondsDifference);
}
/**
 * Returns the formatted and localized relative date/time string for a list's relative date/time string.
 *
 * @param relativeDateTimeJSString: list server-processed date value string
 */
function getRelativeDateTimeStringForLists(relativeDateTimeJSString) {
    var codes = relativeDateTimeJSString.split('|');
    if (codes[0] === '0') {
        // Passthrough case
        return codes[1];
    }
    var future = codes[1] === '1';
    var timeBucket = codes[2];
    var timeValue = codes.length >= 4 ? codes[3] : undefined;
    var timeValueNumber = Number(timeValue);
    var timeValue2 = codes.length >= 5 ? codes[4] : undefined;
    switch (timeBucket) {
        case '1':
            // a few seconds
            return _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_1__["LocaleFormat"].formatRelativeTimeApproximate(_getModifiedDate(ONE_SECOND, future));
        case '2':
            // about a minute
            return _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_1__["LocaleFormat"].formatRelativeTimeApproximate(_getModifiedDate(ONE_MINUTE, future));
        case '3':
            // x minutes
            return _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_1__["LocaleFormat"].formatRelativeTime(future ? timeValueNumber : -timeValueNumber, 'minute');
        case '4':
            // about an hour
            return _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_1__["LocaleFormat"].formatRelativeTimeApproximate(_getModifiedDate(ONE_HOUR, future));
        case '5':
            // tomorrow/yesterday or tomorrow at x/yesterday at x
            var dayString = _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_1__["LocaleFormat"].formatRelativeTime(future ? 1 : -1, 'day');
            return timeValue
                ? _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_DateTimeHelper_resx__WEBPACK_IMPORTED_MODULE_2__["default"].RelativeDateTime_DayAndTime, dayString, timeValue)
                : dayString;
        case '6':
            // x hours
            return _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_1__["LocaleFormat"].formatRelativeTimeApproximate(_getModifiedDate(timeValueNumber * ONE_HOUR, future));
        case '7':
            // day and time
            return timeValue2
                ? _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_DateTimeHelper_resx__WEBPACK_IMPORTED_MODULE_2__["default"].RelativeDateTime_DayAndTime, timeValue, timeValue2)
                : timeValue;
        case '8':
            // x days
            return _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_1__["LocaleFormat"].formatRelativeTime(future ? timeValueNumber : -timeValueNumber, 'day');
        case '9':
            // today
            return _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_1__["LocaleFormat"].formatRelativeTime(0, 'day');
    }
}
/**
 * Return if two dates are on the same day.
 * @param date1: The first date.
 * @param date2: The second date.
 */
function isSameDay(date1, date2) {
    if (!date1 || !date2) {
        return false;
    }
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}


/***/ }),

/***/ "ekGN":
/*!*********************************!*\
  !*** ./lib/SPFormatDateTime.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/i18n-utilities */ "Ycni");
/* harmony import */ var _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @file SPFormatDateTime.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */

var SPFormatDateTime = /** @class */ (function () {
    function SPFormatDateTime() {
    }
    SPFormatDateTime.formatTimestampToDisplayDate = function (timestamp, pageContext, options) {
        var pc = pageContext;
        var timezone = pc.user.preferUserTimeZone
            ? pc.user.timeZoneInfo
            : pc.web.timeZoneInfo;
        var date = new Date(timestamp);
        var spDateInUTC = new _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_0__["SPDate"]({
            fullYear: date.getUTCFullYear(),
            month: date.getUTCMonth(),
            date: date.getUTCDate(),
            hours: date.getUTCHours(),
            minutes: date.getUTCMinutes(),
            seconds: date.getUTCSeconds(),
            milliseconds: date.getUTCMilliseconds(),
            timezoneOffset: 0
        });
        var spDateInUserTimeZone = spDateInUTC.convertFromUTC(timezone);
        // instead of origin date object, fakeDateToDisplay is an incorrect timestamp on JS Date object
        // because the time respect to user/web timezone is displayed
        var fakeDateToDisplay = new Date(spDateInUserTimeZone.fullYear, spDateInUserTimeZone.month, spDateInUserTimeZone.date, spDateInUserTimeZone.hours, spDateInUserTimeZone.minutes, spDateInUserTimeZone.seconds, spDateInUserTimeZone.milliseconds);
        return _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_0__["LocaleFormat"].formatDate(fakeDateToDisplay, options);
    };
    return SPFormatDateTime;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPFormatDateTime);


/***/ }),

/***/ "ercE":
/*!************************************!*\
  !*** ./lib/smartRace/SmartRace.js ***!
  \************************************/
/*! exports provided: SmartRace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmartRace", function() { return SmartRace; });
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loc/Strings.resx */ "p6S7");
/**
 * @file SmartRace.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */

var SmartRace = /** @class */ (function () {
    function SmartRace() {
    }
    SmartRace.race = function (promiseRaceMap) {
        // If there are no more promises left to race, let's inform the caller
        if (promiseRaceMap.size <= 0) {
            throw new Error(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ErrorNoMorePromises);
        }
        // In order to know which promise is resolved/rejected,
        // let's map each promise in the race to always return
        // IRaceResponse; using its index we'll know who resolved/rejected
        var promisesToRace = [];
        promiseRaceMap.forEach(function (promise, key) {
            promisesToRace[key] = promise.then(function () {
                return ({ raceResponseAsync: promise, raceIndex: key });
            }).catch(function () {
                throw ({ raceResponseAsync: promise, raceIndex: key });
            });
        });
        return Promise.race(promisesToRace).then(function (response) {
            return response;
        }).catch(function (error) {
            // Remove the rejected promise from the race
            promiseRaceMap.delete(error.raceIndex);
            return SmartRace.race(promiseRaceMap);
        });
    };
    return SmartRace;
}());



/***/ }),

/***/ "erqz":
/*!******************************************!*\
  !*** ./lib/remoteWebFileGetter/index.js ***!
  \******************************************/
/*! exports provided: RemoteWebFileGetter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RemoteWebFileGetter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RemoteWebFileGetter */ "fBMy");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RemoteWebFileGetter", function() { return _RemoteWebFileGetter__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "etMW":
/*!****************************************************!*\
  !*** ./lib/screenReaderAlert/ScreenReaderAlert.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ScreenReaderAlert_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ScreenReaderAlert.module.scss */ "twtR");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file Screen Reader Alert component.
 */
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
 * This is a screen reader alert component for developers to easily add screen reader feature to their web site.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions Live Region in MDN}
 *
 * All functionalities of this component are tested through Narrator in Windows 10.
 *
 * @example - Use as React component to read based on React state.
 *  <ScreenReaderAlert message={ message } />
 * @example - Use static method to read based on any event.
 *  ScreenReaderAlert.read(message)
 */
var ScreenReaderAlert = /** @class */ (function (_super) {
    __extends(ScreenReaderAlert, _super);
    function ScreenReaderAlert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * This is an API for developers to read screen reader message.
     * It is typically to be called when there is no React component or DOM element to attach ScreenReaderAlert component.
     *
     * @param message - is the string that will be read by screen reader. Nothing will be done when string is empty.
     * @param readingMode - is how the string will announced categorized by aggressive alert and polite announce.
     *  default value is ReadingMode.ReadAfterOtherContent
     */
    ScreenReaderAlert.read = function (message, readingMode) {
        if (message) {
            var alertText = document.createTextNode(message);
            var alertNode = ScreenReaderAlert.getDedicatedDomNode(readingMode || 1 /* ReadAfterOtherContent */);
            alertNode.appendChild(alertText);
        }
    };
    ScreenReaderAlert.getDedicatedDomNode = function (readingMode) {
        if (ScreenReaderAlert._alertNode) {
            document.body.removeChild(ScreenReaderAlert._alertNode);
        }
        var alertNode = document.createElement('div');
        alertNode.setAttribute('data-automation-id', 'screen-reader-alert-static');
        alertNode.classList.add(_ScreenReaderAlert_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].screenReaderAlert);
        switch (readingMode) {
            case 1 /* ReadAfterOtherContent */:
                alertNode.setAttribute('aria-live', 'polite');
                break;
            case 2 /* ReadImmediately */:
                alertNode.setAttribute('role', 'alert');
                alertNode.setAttribute('aria-live', 'assertive');
                break;
        }
        document.body.appendChild(alertNode);
        ScreenReaderAlert._alertNode = alertNode;
        return ScreenReaderAlert._alertNode;
    };
    ScreenReaderAlert.prototype.componentDidMount = function () {
        ScreenReaderAlert.read(this.props.message, this.props.readingMode);
    };
    ScreenReaderAlert.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.message !== this.props.message || prevProps.indicator !== this.props.indicator) {
            ScreenReaderAlert.read(this.props.message, this.props.readingMode);
        }
    };
    ScreenReaderAlert.prototype.render = function () {
        return false; // Not rendering anything but call `read` method to read the message in React life-cycles.
    };
    return ScreenReaderAlert;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (ScreenReaderAlert);


/***/ }),

/***/ "f+8y":
/*!********************************!*\
  !*** ./lib/md5Hash/Md5Hash.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Md5Hash; });
/**
 * @file Md5Hasher.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */
// VSO:315448 to clean up this temporary implementation.
/* tslint:disable:typedef */
/* tslint:disable:no-bitwise */
// https://css-tricks.com/snippets/javascript/javascript-md5/
// this is just here until we can re-add the hash module to SPClient
/**
 * Create an MD5 hash from an input string.
 *
 * @param stringTohash - The string to hash.
 *
 * @returns - A hashed string.
 */
function Md5Hash(stringTohash) {
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    stringTohash = Utf8Encode(stringTohash);
    var x = ConvertToWordArray(stringTohash);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }
    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    return temp.toLowerCase();
}
function RotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
}
function AddUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
        if (lResult & 0x40000000) {
            return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
        }
        else {
            return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        }
    }
    else {
        return (lResult ^ lX8 ^ lY8);
    }
}
function F(x, y, z) { return (x & y) | ((~x) & z); }
function G(x, y, z) { return (x & z) | (y & (~z)); }
function H(x, y, z) { return (x ^ y ^ z); }
function I(x, y, z) { return (y ^ (x | (~z))); }
function FF(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
}
function GG(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
}
function HH(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
}
function II(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
}
function ConvertToWordArray(stringTohash) {
    var lWordCount;
    var lMessageLength = stringTohash.length;
    var lNumberOfWordsTemp1 = lMessageLength + 8;
    var lNumberOfWordsTemp2 = (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = (lWordArray[lWordCount] | (stringTohash.charCodeAt(lByteCount) << lBytePosition));
        lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
}
function WordToHex(lValue) {
    var wordToHexValue = '', wordToHexValueTemp = '', lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        wordToHexValueTemp = '0' + lByte.toString(16);
        wordToHexValue = wordToHexValue + wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2);
    }
    return wordToHexValue;
}
function Utf8Encode(stringTohash) {
    stringTohash = stringTohash.replace(/\r\n/g, '\n');
    var utftext = '';
    for (var n = 0; n < stringTohash.length; n++) {
        var c = stringTohash.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
}


/***/ }),

/***/ "fBMy":
/*!********************************************************!*\
  !*** ./lib/remoteWebFileGetter/RemoteWebFileGetter.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SPResourcePath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SPResourcePath */ "OLPK");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _extensionHelper_ExtensionHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../extensionHelper/ExtensionHelper */ "ByVl");
/**
 * @file RemoteWebFileGetter.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @remark For looking up the SharePoint file metadata such as Site and Web IDs
 */







var CONTEXT_WEB_PATH = '/_api/web/';
var DEFAULT_SELECT_FIELDS = '&$select=ListId,Name,ServerRelativeUrl,SiteId,UniqueId,WebId';
var GENERIC_FILE_ENDPOINT_PATH = "GetFileByUrl(@url)";
var IMAGE_ENDPOINT_PATH = "GetListByServerRelativeUrl(@listUrl)/RenderListDataAsStream";
var LIST_BASIC_RENDER_OPTION = 7;
var LIST_MEDIA_SERVICE_RENDER_OPTION = 4096;
var REMOTE_WEB_PATH = '/_api/SP.RemoteWeb(@remoteWeb)/';
var VROOM_API_PATH = '/_api/v2.0';
var VROOM_DEFAULT_EXPAND = 'sharepointIds';
var VROOM_DEFAULT_SELECT = 'createdBy,lastModifiedDateTime,name,sharepointIds,webDavUrl,webUrl';
var RemoteWebFileGetter = /** @class */ (function () {
    function RemoteWebFileGetter(serviceScope) {
        var _this = this;
        this._serviceScope = serviceScope;
        serviceScope.whenFinished(function () {
            _this._pageContext = serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__["PageContext"].serviceKey);
            _this._absoluteWebUri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Uri"](_this._pageContext.web.absoluteUrl);
            _this._httpClient = serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"].serviceKey);
            _this._spHttpClient = serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__["SPHttpClient"].serviceKey);
        });
    }
    RemoteWebFileGetter._getVroomEndpoint = function (absoluteFileUrl, webUrl, graphIds, sharepointIds, extraFields) {
        var itemPath;
        if (graphIds) {
            // If the caller had actual graph drive and item ids, use /drives/ API
            itemPath = "/drives/" + graphIds.driveId + "/items/" + graphIds.itemId;
        }
        else if (sharepointIds) {
            var trimBrackets = function (guid) {
                // This will handle the common case of including brackets. Will not address URL-encoded brackets.
                var parsed = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].tryParse(guid);
                return parsed && parsed.toString();
            };
            // If not, and we have the sharepoint GUIDs, use /sites/ API
            itemPath = "/sites/" + new _SPResourcePath__WEBPACK_IMPORTED_MODULE_1__["SPResourcePath"](absoluteFileUrl).domain + "," + trimBrackets(sharepointIds.siteId) + "," + trimBrackets(sharepointIds.webId) + "/items/" + trimBrackets(sharepointIds.uniqueId) + "/driveItem";
        }
        else {
            // If we only have a path, use /shares/ API
            // Compute the token by URL-safe base64 encoding the UTF-8 representation
            var sharesToken = btoa(unescape(encodeURIComponent(absoluteFileUrl)))
                .replace(/=+$/g, '')
                .replace(/[+]/g, '-')
                .replace(/\//g, '_');
            itemPath = "/shares/u!" + sharesToken + "/driveItem";
        }
        var baseUrl = "" + _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Uri"].concatenate(webUrl, VROOM_API_PATH) + itemPath;
        return baseUrl + "?expand=" + VROOM_DEFAULT_EXPAND + "&select=" + VROOM_DEFAULT_SELECT;
    };
    /**
     * Uses the Vroom /shares/ or /sites/ API to look up information about a file.
     * This has the following advantages over getFileByUrl:
     * - All returned URLs will have any unsafe characters escaped and be properly spec-compliant
     * - Returns the URL of the target SPWeb without requiring special processing
     * - webUrl handles more WAC scenarios than ServerRedirectedEmbedUrl, e.g. XLS files
     * - Can obtain MediaTA service properties, e.g. thumbnail URL
     */
    RemoteWebFileGetter.prototype.getFileViaVroom = function (absoluteResourcePath, sharepointIds, graphIds, extraFields) {
        var fileUri = new _SPResourcePath__WEBPACK_IMPORTED_MODULE_1__["SPResourcePath"](absoluteResourcePath);
        var webDomain = this._absoluteWebUri.getLeftPart(1 /* UriPartial.authority */);
        if (fileUri.authority === webDomain) {
            return this._spHttpClient.get(RemoteWebFileGetter._getVroomEndpoint(absoluteResourcePath, webDomain, graphIds, sharepointIds, extraFields), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__["SPHttpClient"].configurations.v1, { /* plain */}).then(function (response) { return response.json(); });
        }
        else {
            // If we are requesting the file in a different geo location of the current tenant, we will use
            // AAD data provider to call the GetFileByUrl API in that geo location.
            var geoLocationDomainUrl = fileUri.authority;
            var aadHttpClient = new _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__["AadHttpClient"](this._serviceScope, geoLocationDomainUrl, {
                configuration: _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__["_AadTokenProviders"].preAuthorizedConfiguration
            });
            var headers = new Headers();
            headers.append('Accept', 'application/json');
            return aadHttpClient.get(RemoteWebFileGetter._getVroomEndpoint(absoluteResourcePath, geoLocationDomainUrl, graphIds, sharepointIds, extraFields), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__["AadHttpClient"].configurations.v1, {
                headers: headers
            }).then(function (response) { return response.json(); });
        }
    };
    RemoteWebFileGetter.prototype.getFileByUrl = function (absolutefileUrl, extraFields) {
        return this._getFileByUrl(absolutefileUrl, extraFields);
    };
    RemoteWebFileGetter.prototype.getImageFileDataByUrl = function (absolutefileUrl, fetchCaption) {
        return this._getImageFileDataCore(absolutefileUrl, fetchCaption);
    };
    Object.defineProperty(RemoteWebFileGetter.prototype, "_genericFilePathSegment", {
        get: function () {
            return this._webPathSegment + GENERIC_FILE_ENDPOINT_PATH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RemoteWebFileGetter.prototype, "_imagePathSegment", {
        get: function () {
            return this._webPathSegment + IMAGE_ENDPOINT_PATH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RemoteWebFileGetter.prototype, "_webPathSegment", {
        get: function () {
            return !this._pageContext.site.isNoScriptEnabled ? CONTEXT_WEB_PATH : REMOTE_WEB_PATH;
        },
        enumerable: true,
        configurable: true
    });
    RemoteWebFileGetter.prototype._getFileByUrl = function (absolutefileUrl, extraFields) {
        var fileUri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Uri"](absolutefileUrl);
        if (fileUri.getHost() === this._absoluteWebUri.getHost()) {
            return this._spHttpClient.post(this._getFileEndpoint(absolutefileUrl, extraFields, this._absoluteWebUri.toString()), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__["SPHttpClient"].configurations.v1, { /* plain */}).then(function (response) { return response.json(); });
        }
        else {
            // If we are requesting the file in a different geo location of the current tenant, we will use
            // AAD data provider to call the GetFileByUrl API in that geo location.
            var geoLocationDomainUrl = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Uri"](absolutefileUrl).getLeftPart(1 /* UriPartial.authority */);
            var aadHttpClient = new _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__["AadHttpClient"](this._serviceScope, geoLocationDomainUrl, {
                configuration: _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__["_AadTokenProviders"].preAuthorizedConfiguration
            });
            var headers = new Headers();
            headers.append('Accept', 'application/json;odata=nometadata');
            headers.append('OData-Version', '3.0');
            return aadHttpClient.post(this._getFileEndpoint(absolutefileUrl, extraFields, geoLocationDomainUrl), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__["AadHttpClient"].configurations.v1, {
                headers: headers
            }).then(function (response) { return response.json(); });
        }
    };
    RemoteWebFileGetter.prototype._getFileEndpoint = function (absolutefileUrl, extraFields, webUrl) {
        var encodedFileUrl = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["UriEncoding"].encodeRestUriStringToken(absolutefileUrl);
        var preSelectUrl = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Uri"].concatenate(webUrl ? webUrl : this._absoluteWebUri.toString(), this._genericFilePathSegment) + ("?@remoteWeb='" + encodedFileUrl + "'&@url='" + encodedFileUrl + "'");
        var extraFieldsAsString = extraFields && extraFields.join(',');
        if (extraFieldsAsString) {
            return "" + preSelectUrl + DEFAULT_SELECT_FIELDS + "," + extraFieldsAsString + "&$expand=" + extraFieldsAsString;
        }
        else {
            return "" + preSelectUrl + DEFAULT_SELECT_FIELDS;
        }
    };
    RemoteWebFileGetter.prototype._getImageFileDataCore = function (absolutefileUrl, processIfNoCaption) {
        var _this = this;
        var monitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5__["_QosMonitor"]('RemoteWebFileGetter.getImageFileDataByUrl');
        try {
            return this._constructPostRequest(absolutefileUrl, processIfNoCaption)
                .then(function (response) { return response.json(); })
                .then(function (listResponse) {
                var row;
                if (!listResponse.ListData ||
                    !listResponse.ListData.Row ||
                    !(row = listResponse.ListData.Row[0])) {
                    monitor.writeExpectedFailure('ItemNotFound');
                    return Promise.resolve(undefined);
                }
                var metadataJson = row.MediaServiceMetadata || row.MediaServiceFastMetadata;
                if (metadataJson) {
                    var metadata = JSON.parse(metadataJson);
                    if (metadata.imageCaption && metadata.imageCaption.caption) {
                        monitor.writeSuccess({
                            'confidence': metadata.imageCaption.confidence,
                            'processIfNoCaption': processIfNoCaption
                        });
                        return Promise.resolve(metadata);
                    }
                    else if (!processIfNoCaption && metadata.photo && metadata.photo.height && metadata.photo.width) {
                        monitor.writeSuccess();
                        return Promise.resolve(metadata);
                    }
                }
                if (processIfNoCaption) {
                    return _this._processMedia(absolutefileUrl, listResponse)
                        .then(function (analysisResult) {
                        monitor.writeSuccess();
                        return Promise.resolve(analysisResult);
                    })
                        .catch(function (error) {
                        monitor.writeUnexpectedFailure('ReprocessError', error);
                        return Promise.resolve(undefined);
                    });
                }
                else {
                    monitor.writeExpectedFailure('NoMetadataDespiteReprocess');
                    return Promise.resolve(undefined);
                }
            });
        }
        catch (error) {
            monitor.writeUnexpectedFailure('CatchAll', error);
            return undefined;
        }
    };
    RemoteWebFileGetter.prototype._constructPostRequest = function (absolutefileUrl, processIfNoCaption) {
        var serverRelativeUrl = !_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].parse('da076ae3-7818-4072-b784-5757bae50cd9'), '02/15/2019', 'Fix Uri problem in sp-component-utilities') ? new _SPResourcePath__WEBPACK_IMPORTED_MODULE_1__["SPResourcePath"](absolutefileUrl).path
            : new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Uri"](absolutefileUrl).getPath();
        var encodedServerRelativeUrl = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["UriEncoding"].encodeRestUriStringToken(serverRelativeUrl);
        var encodedFileUrl = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["UriEncoding"].encodeRestUriStringToken(absolutefileUrl);
        var finalUrl = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Uri"].concatenate(this._absoluteWebUri.toString(), this._imagePathSegment) +
            ("?View=&@remoteWeb='" + encodedFileUrl + "'&@listUrl='" + encodedServerRelativeUrl + "'");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json;odata=verbose');
        headers.append('Accept', 'application/json;odata=nometadata');
        headers.append('OData-Version', '3.0');
        var renderOptions = LIST_BASIC_RENDER_OPTION;
        if (processIfNoCaption) {
            renderOptions += LIST_MEDIA_SERVICE_RENDER_OPTION;
        }
        return this._spHttpClient.post(finalUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__["SPHttpClient"].configurations.v1, { body: JSON.stringify({
                parameters: {
                    __metadata: { type: 'SP.RenderListDataParameters' },
                    AllowMultipleValueFilterForTaxonomyFields: true,
                    RenderOptions: renderOptions,
                    ViewXml: "<View Scope=\"RecursiveAll\">\n                <Query>\n                  <Where>\n                    <And>\n                      <Eq>\n                        <FieldRef Name=\"FileRef\"/>\n                        <Value Type=\"Url\">" + serverRelativeUrl + "</Value>\n                      </Eq>\n                      <Eq>\n                        <FieldRef Name=\"FSObjType\" />\n                        <Value Type=\"Integer\">0</Value>\n                    </Eq>\n                    </And>\n                  </Where>\n                </Query>\n                <ViewFields>\n                  <FieldRef Name=\"MediaServiceFastMetadata\"/>\n                  <FieldRef Name=\"MediaServiceMetadata\"/>\n                  <FieldRef Name=\"Editor\" />\n                  <FieldRef Name=\"FileLeafRef\" />\n                  <FieldRef Name=\"File_x0020_Type\" />\n                  <FieldRef Name=\"ID\" />\n                  <FieldRef Name=\"UniqueID\" />\n                </ViewFields>\n                <RowLimit Paged=\"FALSE\">1</RowLimit>\n              </View>"
                }
            }),
            headers: headers
        });
    };
    RemoteWebFileGetter.prototype._processMedia = function (absolutefileUrl, listResponse) {
        var _this = this;
        var monitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5__["_QosMonitor"]('RemoteWebFileGetter._processMedia');
        try {
            var serviceUri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Uri"](listResponse.ListSchema['.mediaBaseUrl']);
            serviceUri.setPath('analyze');
            serviceUri.setQueryParameter('provider', 'spo');
            serviceUri.setQueryParameter('profile', 'imagecaption');
            var row = listResponse.ListData.Row[0];
            var extension = _extensionHelper_ExtensionHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getExtension(row.FileRef);
            serviceUri.setQueryParameter('extension', extension);
            serviceUri.setQueryParameter('docid', row['.spItemUrl']);
            return this._httpClient.post(serviceUri.toString().concat("&" + listResponse.ListSchema['.driveAccessToken']), // token already encoded
            _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_4__["SPHttpClient"].configurations.v1, { /* plain */}).then(function (response) {
                if (response.ok) {
                    return response.json()
                        .then(function () {
                        monitor.writeSuccess();
                        return _this._getImageFileDataCore(absolutefileUrl, /*processIfNoCaption*/ false);
                    });
                }
                else {
                    response.json().then(function (data) {
                        monitor.writeUnexpectedFailure('AnalyzeFailed', new Error(JSON.stringify(data.error || data['odata.error'])), {
                            'x-correlationid': response.headers && response.headers.get('x-correlationid'),
                            statusCode: response.status
                        });
                    }).catch(function (error) { return monitor.writeUnexpectedFailure('AnalyzeResponseJsonFailed', error); });
                    return Promise.resolve(undefined);
                }
            })
                .catch(function (error) {
                monitor.writeUnexpectedFailure('PostPromiseCatch', error);
                return Promise.resolve(undefined);
            });
        }
        catch (error) {
            monitor.writeUnexpectedFailure('MainCatch', error);
            return Promise.resolve(undefined);
        }
    };
    return RemoteWebFileGetter;
}());
/* harmony default export */ __webpack_exports__["default"] = (RemoteWebFileGetter);


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

/***/ "fmUt":
/*!**************************************!*\
  !*** ./lib/models/ISiteReference.js ***!
  \**************************************/
/*! exports provided: HubSiteSelectionOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HubSiteSelectionOption", function() { return HubSiteSelectionOption; });
// Copyright (c) Microsoft Corporation. All rights reserved.
var HubSiteSelectionOption;
(function (HubSiteSelectionOption) {
    HubSiteSelectionOption["ThisSite"] = "ThisSite";
    HubSiteSelectionOption["AllAssociatedSites"] = "AllAssociatedSites";
})(HubSiteSelectionOption || (HubSiteSelectionOption = {}));


/***/ }),

/***/ "gTJx":
/*!********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/news/carousel/newsCarousel1.png ***!
  \********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "newscarousel1_dd67705c0de60773a9409e628c97c356.png";

/***/ }),

/***/ "h4kn":
/*!***************************************!*\
  !*** ./lib/coachmarkUtility/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CoachmarkUtility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CoachmarkUtility */ "aq00");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CoachmarkUtility", function() { return _CoachmarkUtility__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _IFeatureHost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IFeatureHost */ "aW6M");
/* harmony import */ var _IFeatureHost__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_IFeatureHost__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _IFeatureHost__WEBPACK_IMPORTED_MODULE_1__) if(["CoachmarkUtility","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _IFeatureHost__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "hjoG":
/*!**************************************!*\
  !*** ./lib/assets/defaultImage3.jpg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "defaultimage3_7fecb8f412edf6de89f1b7becf43ed94.jpg";

/***/ }),

/***/ "iah3":
/*!********************************************!*\
  !*** ./lib/toolbarButton/ToolbarButton.js ***!
  \********************************************/
/*! exports provided: ButtonState, ToolbarButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonState", function() { return ButtonState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarButton", function() { return ToolbarButton; });
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ToolbarButton_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ToolbarButton.scss */ "klbR");
/* harmony import */ var _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../performance/KillSwitch */ "k0Dt");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file The button component used by toolbars on the Canvas.
 * It implements all common functionalities expected of a toolbar button.
 * It is used in the Canvas control toolbar and Rich Text Editor formatting bar.
 */
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





var ButtonState;
(function (ButtonState) {
    ButtonState[ButtonState["Active"] = 0] = "Active";
    ButtonState[ButtonState["Disabled"] = 1] = "Disabled";
    ButtonState[ButtonState["Normal"] = 2] = "Normal";
})(ButtonState || (ButtonState = {}));
var isUpdateStyleKillSwitch = new _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_4__["KillSwitch"]('a1407278-ae25-4ea8-a41f-713a4595b174' /* '10/10/2019', 'Update Toolbar Button Style' */);
/**
 * The button component used by toolbars on the Canvas.
 * @alpha
 */
var ToolbarButton = /** @class */ (function (_super) {
    __extends(ToolbarButton, _super);
    function ToolbarButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolbarButton._isTouchEnabled = function () {
        var platform = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["PlatformDetection"]();
        return platform.isAndroid || platform.isIOS;
    };
    /**
     * Renders ToolbarButton
     */
    ToolbarButton.prototype.render = function () {
        return (!ToolbarButton._isTouchEnabled() ?
            (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["TooltipHost"], { hostClassName: 'ToolbarButtonTooltip', content: this.props.title, calloutProps: __assign({}, this.props.calloutProps, { gapSpace: 0 }), directionalHint: this.props.directionalHint, role: 'presentation' }, this._toolbarButton)) :
            this._toolbarButton);
    };
    Object.defineProperty(ToolbarButton.prototype, "_toolbarButton", {
        get: function () {
            var buttonClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["css"])('ToolbarButton', this.props.className, {
                'ToolbarButton--disabled': !!this.props.disabled,
                'ToolbarButton--active': !!this.props.isActive,
                'ToolbarButtonStyleKillSwitch': !isUpdateStyleKillSwitch.isActivated()
            });
            // For touch devices, onclick is not working properly as the selection gets lost
            // so we have to use onMouseDown instead
            var onClick = ToolbarButton._isTouchEnabled() ? undefined : this.props.onClick;
            var onMouseDown = ToolbarButton._isTouchEnabled() ? this.props.onClick : this.props.onMouseDown;
            var buttonNativeProps = this.props.buttonProps
                ? Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["getNativeProps"])(this.props.buttonProps, _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["buttonProperties"])
                : undefined;
            return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("button", __assign({}, buttonNativeProps, { type: 'button', "aria-label": this.props.title, "aria-disabled": this.props.disabled ? true : undefined, "aria-pressed": this.props.canBeActive && !!this.props.isActive ? this.props.isActive : undefined, className: buttonClassName, onClick: onClick, onMouseDown: onMouseDown, tabIndex: this.props.tabIndex, "data-automation-id": this.props.automationId, onKeyDown: this.props.onKeyDown ? this.props.onKeyDown : undefined, onBlur: this.props.onBlur, "data-drag-handle": this.props.dragHandleTag }),
                this._getButtonImage(),
                this.props.label));
        },
        enumerable: true,
        configurable: true
    });
    ToolbarButton.prototype._getButtonImage = function () {
        // @todo 198107: Clean this up when mdl2 icons are in
        if (this.props.imageIconUrl) {
            return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("img", { src: this.props.imageIconUrl, height: 16, width: 16, alt: this.props.imageIconAltText });
        }
        else if (this.props.svgIcon) {
            return this.props.svgIcon;
        }
        else {
            var iconClass = void 0;
            if (this.props.fabricIconKey) {
                iconClass = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["getIconClassName"])(this.props.fabricIconKey);
            }
            return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("i", { className: iconClass || this.props.iconClassName });
        }
    };
    /**
     * Default properties for a ToolbarButton
     */
    /* tslint:disable:member-access */
    ToolbarButton.defaultProps = {
        // optional fields default values
        canBeActive: true,
        className: 'CanvasControlToolbar-item',
        disabled: false,
        isActive: false,
        buttonProps: {},
        calloutProps: {}
    };
    return ToolbarButton;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]));



/***/ }),

/***/ "j+LK":
/*!***************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryLamps.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegallerylamps_6de54d21a5e3bf5497f79f0cbc74d0da.png";

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

/***/ "j21u":
/*!****************************************!*\
  !*** ./lib/pageService/PageService.js ***!
  \****************************************/
/*! exports provided: PageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageService", function() { return PageService; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PageServiceError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PageServiceError */ "GyUw");
/* harmony import */ var _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../performance/KillSwitch */ "k0Dt");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var filterHiddenPagePropertiesKillSwitch = new _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_3__["KillSwitch"]('a16ab68d-83b2-45b0-9f1b-135d3b3587a6' /* '10/22/2019', 'SOX_FilterHiddenPageProperties' */);
/**
 * PageService provides service offered from the current page
 */
var PageService = /** @class */ (function () {
    function PageService() {
    }
    PageService._filterHiddenFields = function (clientForm) {
        clientForm.fields = clientForm.fields.filter(function (field) {
            if (field.schema && field.schema.Hidden) {
                return field.schema.Hidden !== true;
            }
            else {
                return true;
            }
        });
        return clientForm;
    };
    Object.defineProperty(PageService.prototype, "isInitialized", {
        get: function () {
            return !!this._serviceProvider;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize Page Service, provides the actual implementation.
     * Note you should call initialize directly if the page service provider is fully loaded
     *
     * @param pageServiceProvider
     */
    PageService.prototype.initialize = function (pageServiceProvider) {
        this._serviceProvider = pageServiceProvider;
    };
    /**
     * Sets the page service provider loader.
     * This enables defer loading of page service provider implementation.
     *
     * @param loader
     */
    PageService.prototype.initializeServiceProviderLoader = function (loader) {
        this._serviceProviderLoader = loader;
    };
    /**
     * @see IPageServiceProvider
     */
    PageService.prototype.getCurrentItem = function () {
        if (!filterHiddenPagePropertiesKillSwitch.isActivated()) {
            return this._serviceProvider.getCurrentItem().then(function (clientForm) {
                return PageService._filterHiddenFields(clientForm);
            });
        }
        else {
            return this._serviceProvider.getCurrentItem();
        }
    };
    /**
     * @see IPageServiceProvider
     */
    PageService.prototype.updateCurrentItem = function () {
        return !filterHiddenPagePropertiesKillSwitch.isActivated()
            ? this._serviceProvider.updateCurrentItem().then(function (clientForm) {
                return PageService._filterHiddenFields(clientForm);
            })
            : this._serviceProvider.updateCurrentItem();
    };
    /**
     * @see IPageServiceProvider
     */
    PageService.prototype.openPageSettingsPanel = function () {
        return this._serviceProvider.openPageSettingsPanel();
    };
    /**
     * @see IPageServiceProvider
     */
    PageService.prototype.saveCurrentItem = function (clientForm) {
        return this._serviceProvider.saveCurrentItem(clientForm);
    };
    /**
     * @see IPageServiceProvider
     */
    PageService.prototype.getChromeOptions = function () {
        return this._serviceProvider.getChromeOptions();
    };
    /**
     * @see IPageServiceProvider
     */
    PageService.prototype.getPagePublishInfo = function () {
        return this._serviceProvider.getPagePublishInfo();
    };
    /**
     * @see IPageServiceProvider
     */
    PageService.prototype.subscribe = function (observer, eventType, handler) {
        this._serviceProvider.subscribe(observer, eventType, handler);
        return Promise.resolve();
    };
    /**
     * @see IPageServiceProvider
     */
    PageService.prototype.unsubscribe = function (observer, eventType, handler) {
        this._serviceProvider.unsubscribe(observer, eventType, handler);
        return Promise.resolve();
    };
    /**
     * @see IPageServiceProvider
     */
    PageService.prototype.getAutoSaver = function () {
        return this._serviceProvider.getAutoSaver();
    };
    /**
    * @see IPageServiceProvider
    */
    PageService.prototype.getClientFormProvider = function () {
        return this._serviceProvider.getClientFormProvider();
    };
    /**
    * @see IPageServiceProvider
    */
    PageService.prototype.getItemUpdateQueue = function () {
        return this._serviceProvider.getItemUpdateQueue();
    };
    /**
     * The service key for PageService
     */
    PageService.serviceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["ServiceKey"].create('sp-component-utilities:PageService', PageService);
    PageService.logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('PageService');
    __decorate([
        withErrorHandling
    ], PageService.prototype, "getCurrentItem", null);
    __decorate([
        withErrorHandling
    ], PageService.prototype, "updateCurrentItem", null);
    __decorate([
        withErrorHandling
    ], PageService.prototype, "openPageSettingsPanel", null);
    __decorate([
        withErrorHandling
    ], PageService.prototype, "saveCurrentItem", null);
    __decorate([
        withErrorHandling
    ], PageService.prototype, "getChromeOptions", null);
    __decorate([
        withErrorHandling
    ], PageService.prototype, "getPagePublishInfo", null);
    __decorate([
        withErrorHandling
    ], PageService.prototype, "subscribe", null);
    __decorate([
        withErrorHandling
    ], PageService.prototype, "unsubscribe", null);
    __decorate([
        withErrorHandling
    ], PageService.prototype, "getAutoSaver", null);
    return PageService;
}());

/**
 * This is a decorator to do generic error handling for page service calls
 * It also intialize the page service if it hasn't been intialized.
 *
 * Example:
 *  @withErrorHandling
 *  public getFieldData(fieldName: string): Promise<any>
 *     ...
 *   }
 */
// tslint:disable:no-any
function withErrorHandling(target, propertyKey, descriptor) {
    var handleError = function (ex) {
        ex = ex || new _PageServiceError__WEBPACK_IMPORTED_MODULE_2__["PageServiceError"](1 /* ServiceNotInitialized */);
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(PageService.logSource, ex);
        return Promise.reject(ex);
    };
    return {
        value: function _callService() {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // tslint:enable:no-any
            if (this._serviceProvider) {
                return descriptor.value.apply(this, args);
            }
            else if (this._serviceProviderLoader) {
                return this._serviceProviderLoader().then(function (pageServiceProvider) {
                    _this.initialize(pageServiceProvider);
                    return descriptor.value.apply(_this, args);
                }).catch(handleError);
            }
            else {
                handleError();
            }
        }
    };
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

/***/ "k0Dt":
/*!***************************************!*\
  !*** ./lib/performance/KillSwitch.js ***!
  \***************************************/
/*! exports provided: KillSwitch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KillSwitch", function() { return KillSwitch; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Class representing kill switch information.
 */
var KillSwitch = /** @class */ (function () {
    /**
     * Specify date and description within comment section
     * e.g. ('efc0bbdb-5840-4f29-ae06-6415236103a5' /* '4/9/2019', 'SOX_EventDataPickerAutoFocus' *\/)
     *
     *
     * @param guid - Guid of the kill switch. It is highly recommended to use lowercase without {} for best performance
     */
    function KillSwitch(guid) {
        this._guid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(guid);
    }
    /**
     * Returns true if kill switch has been activated.
     */
    KillSwitch.prototype.isActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(this._guid, '', '');
    };
    return KillSwitch;
}());



/***/ }),

/***/ "keR4":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage11.jpg ***!
  \****************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "visualtemplateimage11_458f6bd95a911dafdd65ff6b77d4844f.jpg";

/***/ }),

/***/ "klbR":
/*!*************************************************!*\
  !*** ./lib/toolbarButton/ToolbarButton.scss.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolbarButton.css */ "Ss4T");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "lMrs":
/*!**********************************************!*\
  !*** ./lib/assets/reportDefaultImage5sm.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "reportdefaultimage5sm_ee54b634fecfc72d3306c927e833d118.png";

/***/ }),

/***/ "lsgA":
/*!*******************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryPendantSm.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegallerypendantsm_2d57ff8ec4b521893ee7f5206a518693.png";

/***/ }),

/***/ "medE":
/*!********************************!*\
  !*** ./lib/icsHelper/index.js ***!
  \********************************/
/*! exports provided: IcsFileGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IcsFileGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IcsFileGenerator */ "JW2X");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IcsFileGenerator", function() { return _IcsFileGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sortablejs */ "rBYt");
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sortablejs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Sortable", function() { return sortablejs__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _browserUtilities_BrowserUtilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./browserUtilities/BrowserUtilities */ "Q6WH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BrowserUtilities", function() { return _browserUtilities_BrowserUtilities__WEBPACK_IMPORTED_MODULE_1__["BrowserUtilities"]; });

/* harmony import */ var _dateTimeHelper_getRelativeDateTimeStringForLists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dateTimeHelper/getRelativeDateTimeStringForLists */ "eikI");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRelativeDateTimeStringForLists", function() { return _dateTimeHelper_getRelativeDateTimeStringForLists__WEBPACK_IMPORTED_MODULE_2__["getRelativeDateTimeStringForLists"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSameDay", function() { return _dateTimeHelper_getRelativeDateTimeStringForLists__WEBPACK_IMPORTED_MODULE_2__["isSameDay"]; });

/* harmony import */ var _decorators_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./decorators/index */ "IoHU");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "monitor", function() { return _decorators_index__WEBPACK_IMPORTED_MODULE_3__["monitor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnexpectedFailure", function() { return _decorators_index__WEBPACK_IMPORTED_MODULE_3__["UnexpectedFailure"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExpectedFailure", function() { return _decorators_index__WEBPACK_IMPORTED_MODULE_3__["ExpectedFailure"]; });

/* harmony import */ var _dialog_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dialog/index */ "Z675");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogUtility", function() { return _dialog_index__WEBPACK_IMPORTED_MODULE_4__["DialogUtility"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogActionTypes", function() { return _dialog_index__WEBPACK_IMPORTED_MODULE_4__["DialogActionTypes"]; });

/* harmony import */ var _events_ScrollEventHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./events/ScrollEventHandler */ "wg71");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScrollEventHandler", function() { return _events_ScrollEventHandler__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _extensionHelper_ExtensionHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./extensionHelper/ExtensionHelper */ "ByVl");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExtensionHelper", function() { return _extensionHelper_ExtensionHelper__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _fileTypeIcons_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./fileTypeIcons/index */ "rn0h");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Icons", function() { return _fileTypeIcons_index__WEBPACK_IMPORTED_MODULE_7__["Icons"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EXTENSION", function() { return _fileTypeIcons_index__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_EXTENSION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SIZE", function() { return _fileTypeIcons_index__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_SIZE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FOLDER_EXTENSION", function() { return _fileTypeIcons_index__WEBPACK_IMPORTED_MODULE_7__["FOLDER_EXTENSION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LIST_ITEM_EXTENSION", function() { return _fileTypeIcons_index__WEBPACK_IMPORTED_MODULE_7__["LIST_ITEM_EXTENSION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FileTypeIconDetailsListRenderer", function() { return _fileTypeIcons_index__WEBPACK_IMPORTED_MODULE_7__["FileTypeIconDetailsListRenderer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FileTypeIconsLoader", function() { return _fileTypeIcons_index__WEBPACK_IMPORTED_MODULE_7__["FileTypeIconsLoader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_ICON_COLOR", function() { return _fileTypeIcons_index__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_ICON_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DOCX_ICON_COLOR", function() { return _fileTypeIcons_index__WEBPACK_IMPORTED_MODULE_7__["DOCX_ICON_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ODP_ICON_COLOR", function() { return _fileTypeIcons_index__WEBPACK_IMPORTED_MODULE_7__["ODP_ICON_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LISTITEM_ICON", function() { return _fileTypeIcons_index__WEBPACK_IMPORTED_MODULE_7__["LISTITEM_ICON"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ICONS", function() { return _fileTypeIcons_index__WEBPACK_IMPORTED_MODULE_7__["ICONS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ICON_EXT_MAP", function() { return _fileTypeIcons_index__WEBPACK_IMPORTED_MODULE_7__["ICON_EXT_MAP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EXTENSIONS_TO_FILENAME_MAP", function() { return _fileTypeIcons_index__WEBPACK_IMPORTED_MODULE_7__["EXTENSIONS_TO_FILENAME_MAP"]; });

/* harmony import */ var _icsHelper_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./icsHelper/index */ "medE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IcsFileGenerator", function() { return _icsHelper_index__WEBPACK_IMPORTED_MODULE_8__["IcsFileGenerator"]; });

/* harmony import */ var _imaging_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./imaging/index */ "Cy4Q");
/* harmony import */ var _imaging_index__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_imaging_index__WEBPACK_IMPORTED_MODULE_9__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _imaging_index__WEBPACK_IMPORTED_MODULE_9__) if(["ScrollEventHandler","ExtensionHelper","Md5Hash","ButtonState","ToolbarButton","SPFormatDateTime","SPUtility","toRelativeUrl","ViewportLoaderServiceKey","Sortable","DomMeasurementCache","KillSwitch","SmartRace","LimitedLengthTextField","BrowserUtilities","getRelativeDateTimeStringForLists","isSameDay","monitor","UnexpectedFailure","ExpectedFailure","DialogUtility","DialogActionTypes","Icons","DEFAULT_EXTENSION","DEFAULT_SIZE","FOLDER_EXTENSION","LIST_ITEM_EXTENSION","FileTypeIconDetailsListRenderer","FileTypeIconsLoader","DEFAULT_ICON_COLOR","DOCX_ICON_COLOR","ODP_ICON_COLOR","LISTITEM_ICON","ICONS","ICON_EXT_MAP","EXTENSIONS_TO_FILENAME_MAP","IcsFileGenerator","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _imaging_index__WEBPACK_IMPORTED_MODULE_9__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _layouts_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./layouts/index */ "PdVp");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PreviewUtility", function() { return _layouts_index__WEBPACK_IMPORTED_MODULE_10__["PreviewUtility"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PreviewHelper", function() { return _layouts_index__WEBPACK_IMPORTED_MODULE_10__["PreviewHelper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThumbnailProviderType", function() { return _layouts_index__WEBPACK_IMPORTED_MODULE_10__["ThumbnailProviderType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThumbnailUrlGenerator", function() { return _layouts_index__WEBPACK_IMPORTED_MODULE_10__["ThumbnailUrlGenerator"]; });

/* harmony import */ var _md5Hash_Md5Hash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./md5Hash/Md5Hash */ "f+8y");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Md5Hash", function() { return _md5Hash_Md5Hash__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _models_index__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./models/index */ "JEu8");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HubSiteSelectionOption", function() { return _models_index__WEBPACK_IMPORTED_MODULE_12__["HubSiteSelectionOption"]; });

/* harmony import */ var _multilingual_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./multilingual/index */ "x3Od");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Multilingual", function() { return _multilingual_index__WEBPACK_IMPORTED_MODULE_13__["Multilingual"]; });

/* harmony import */ var _smartRace_SmartRace__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./smartRace/SmartRace */ "ercE");
/* empty/unused harmony star reexport *//* harmony import */ var _pageService__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pageService */ "Yf54");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavPlacementType", function() { return _pageService__WEBPACK_IMPORTED_MODULE_15__["NavPlacementType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageService", function() { return _pageService__WEBPACK_IMPORTED_MODULE_15__["PageService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageServiceError", function() { return _pageService__WEBPACK_IMPORTED_MODULE_15__["PageServiceError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageServiceEventArgs", function() { return _pageService__WEBPACK_IMPORTED_MODULE_15__["PageServiceEventArgs"]; });

/* harmony import */ var _retryHelper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./retryHelper */ "RiH0");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RetryHelper", function() { return _retryHelper__WEBPACK_IMPORTED_MODULE_16__["RetryHelper"]; });

/* harmony import */ var _coachmarkUtility_index__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./coachmarkUtility/index */ "h4kn");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _coachmarkUtility_index__WEBPACK_IMPORTED_MODULE_17__) if(["ScrollEventHandler","ExtensionHelper","Md5Hash","ButtonState","ToolbarButton","SPFormatDateTime","SPUtility","toRelativeUrl","ViewportLoaderServiceKey","Sortable","DomMeasurementCache","KillSwitch","SmartRace","LimitedLengthTextField","BrowserUtilities","getRelativeDateTimeStringForLists","isSameDay","monitor","UnexpectedFailure","ExpectedFailure","DialogUtility","DialogActionTypes","Icons","DEFAULT_EXTENSION","DEFAULT_SIZE","FOLDER_EXTENSION","LIST_ITEM_EXTENSION","FileTypeIconDetailsListRenderer","FileTypeIconsLoader","DEFAULT_ICON_COLOR","DOCX_ICON_COLOR","ODP_ICON_COLOR","LISTITEM_ICON","ICONS","ICON_EXT_MAP","EXTENSIONS_TO_FILENAME_MAP","IcsFileGenerator","PreviewUtility","PreviewHelper","ThumbnailProviderType","ThumbnailUrlGenerator","HubSiteSelectionOption","Multilingual","NavPlacementType","PageService","PageServiceError","PageServiceEventArgs","RetryHelper","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _coachmarkUtility_index__WEBPACK_IMPORTED_MODULE_17__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _collapsibleSection_index__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./collapsibleSection/index */ "aY6P");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CollapsibleSection", function() { return _collapsibleSection_index__WEBPACK_IMPORTED_MODULE_18__["CollapsibleSection"]; });

/* harmony import */ var _remoteWebFileGetter_index__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./remoteWebFileGetter/index */ "erqz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RemoteWebFileGetter", function() { return _remoteWebFileGetter_index__WEBPACK_IMPORTED_MODULE_19__["RemoteWebFileGetter"]; });

/* harmony import */ var _screenReaderAlert_index__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./screenReaderAlert/index */ "e/jN");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _screenReaderAlert_index__WEBPACK_IMPORTED_MODULE_20__) if(["ScrollEventHandler","ExtensionHelper","Md5Hash","ButtonState","ToolbarButton","SPFormatDateTime","SPUtility","toRelativeUrl","ViewportLoaderServiceKey","Sortable","DomMeasurementCache","KillSwitch","SmartRace","LimitedLengthTextField","BrowserUtilities","getRelativeDateTimeStringForLists","isSameDay","monitor","UnexpectedFailure","ExpectedFailure","DialogUtility","DialogActionTypes","Icons","DEFAULT_EXTENSION","DEFAULT_SIZE","FOLDER_EXTENSION","LIST_ITEM_EXTENSION","FileTypeIconDetailsListRenderer","FileTypeIconsLoader","DEFAULT_ICON_COLOR","DOCX_ICON_COLOR","ODP_ICON_COLOR","LISTITEM_ICON","ICONS","ICON_EXT_MAP","EXTENSIONS_TO_FILENAME_MAP","IcsFileGenerator","PreviewUtility","PreviewHelper","ThumbnailProviderType","ThumbnailUrlGenerator","HubSiteSelectionOption","Multilingual","NavPlacementType","PageService","PageServiceError","PageServiceEventArgs","RetryHelper","CollapsibleSection","RemoteWebFileGetter","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _screenReaderAlert_index__WEBPACK_IMPORTED_MODULE_20__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _SPConstants__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./SPConstants */ "bz/i");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spConstants", function() { return _SPConstants__WEBPACK_IMPORTED_MODULE_21__["spConstants"]; });

/* harmony import */ var _SPResourcePath__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./SPResourcePath */ "OLPK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPResourcePath", function() { return _SPResourcePath__WEBPACK_IMPORTED_MODULE_22__["SPResourcePath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPResourcePathFormat", function() { return _SPResourcePath__WEBPACK_IMPORTED_MODULE_22__["SPResourcePathFormat"]; });

/* harmony import */ var _UrlUtility__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./UrlUtility */ "z7It");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UrlUtility", function() { return _UrlUtility__WEBPACK_IMPORTED_MODULE_23__["UrlUtility"]; });

/* harmony import */ var _toolbarButton_ToolbarButton__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./toolbarButton/ToolbarButton */ "iah3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonState", function() { return _toolbarButton_ToolbarButton__WEBPACK_IMPORTED_MODULE_24__["ButtonState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolbarButton", function() { return _toolbarButton_ToolbarButton__WEBPACK_IMPORTED_MODULE_24__["ToolbarButton"]; });

/* harmony import */ var _SPFormatDateTime__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./SPFormatDateTime */ "ekGN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPFormatDateTime", function() { return _SPFormatDateTime__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony import */ var _SPUtility__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./SPUtility */ "1r8z");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPUtility", function() { return _SPUtility__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony import */ var _urlUtilities_toRelativeUrl__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./urlUtilities/toRelativeUrl */ "WBWG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRelativeUrl", function() { return _urlUtilities_toRelativeUrl__WEBPACK_IMPORTED_MODULE_27__["toRelativeUrl"]; });

/* harmony import */ var _viewportLoader_ViewportLoaderServiceKey__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./viewportLoader/ViewportLoaderServiceKey */ "pv5M");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewportLoaderServiceKey", function() { return _viewportLoader_ViewportLoaderServiceKey__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony import */ var _performance_DomMeasurementCache__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./performance/DomMeasurementCache */ "LDzE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DomMeasurementCache", function() { return _performance_DomMeasurementCache__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony import */ var _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./performance/KillSwitch */ "k0Dt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KillSwitch", function() { return _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_30__["KillSwitch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SmartRace", function() { return _smartRace_SmartRace__WEBPACK_IMPORTED_MODULE_14__["SmartRace"]; });

/* harmony import */ var _limitedLengthTextField_LimitedLengthTextField__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./limitedLengthTextField/LimitedLengthTextField */ "WUZl");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LimitedLengthTextField", function() { return _limitedLengthTextField_LimitedLengthTextField__WEBPACK_IMPORTED_MODULE_31__["LimitedLengthTextField"]; });





































/***/ }),

/***/ "nKow":
/*!********************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryHandrailSm.png ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegalleryhandrailsm_bc4c5296fd3d22ae526bbafde58beda7.png";

/***/ }),

/***/ "nmwW":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImageTile.jpg ***!
  \******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "visualtemplateimagetile_dd44c1102298a75b52a1145a4665dd95.jpg";

/***/ }),

/***/ "ntG8":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/file-type-icons/7.1.3_052fcf153ec79c77e0d1778fd73206f7/node_modules/@uifabric/file-type-icons/lib/FileTypeIconMap.js ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: FileTypeIconMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileTypeIconMap", function() { return FileTypeIconMap; });
/**
 * Enumeration of icon file names, and what extensions they map to.
 * Please keep items alphabetical. Items without extensions may require specific logic in the code to map.
 * Always use getFileTypeIconProps to get the most up-to-date icon at the right pixel density.
 */
var FileTypeIconMap = {
    accdb: {
        extensions: ['accdb', 'mdb']
    },
    archive: {
        extensions: ['7z', 'ace', 'arc', 'arj', 'dmg', 'gz', 'iso', 'lzh', 'pkg', 'rar', 'sit', 'tgz', 'tar', 'z']
    },
    audio: {
        extensions: [
            'aif',
            'aiff',
            'aac',
            'amr',
            'au',
            'awb',
            'dct',
            'dss',
            'dvf',
            'flac',
            'gsm',
            'm4a',
            'm4p',
            'mid',
            'mmf',
            'mp3',
            'oga',
            'ra',
            'rm',
            'wav',
            'wma',
            'wv'
        ]
    },
    channelfolder: {},
    calendar: {
        extensions: ['ical', 'icalendar', 'ics', 'ifb', 'vcs']
    },
    code: {
        extensions: [
            'abap',
            'ada',
            'adp',
            'ahk',
            'as',
            'as3',
            'asc',
            'ascx',
            'asm',
            'asp',
            'awk',
            'bash',
            'bash_login',
            'bash_logout',
            'bash_profile',
            'bashrc',
            'bat',
            'bib',
            'bsh',
            'build',
            'builder',
            'c',
            'c++',
            'capfile',
            'cc',
            'cfc',
            'cfm',
            'cfml',
            'cl',
            'clj',
            'cls',
            'cmake',
            'cmd',
            'coffee',
            'config',
            'cpp',
            'cpt',
            'cpy',
            'cs',
            'cshtml',
            'cson',
            'csproj',
            'css',
            'ctp',
            'cxx',
            'd',
            'ddl',
            'di',
            'disco',
            'dml',
            'dtd',
            'dtml',
            'el',
            'emakefile',
            'erb',
            'erl',
            'f',
            'f90',
            'f95',
            'fs',
            'fsi',
            'fsscript',
            'fsx',
            'gemfile',
            'gemspec',
            'gitconfig',
            'go',
            'groovy',
            'gvy',
            'Hcp',
            'h',
            'h++',
            'haml',
            'handlebars',
            'hbs',
            'hh',
            'hpp',
            'hrl',
            'hs',
            'htc',
            'hxx',
            'idl',
            'iim',
            'inc',
            'inf',
            'ini',
            'inl',
            'ipp',
            'irbrc',
            'jade',
            'jav',
            'java',
            'js',
            'json',
            'jsp',
            'jsx',
            'l',
            'less',
            'lhs',
            'lisp',
            'log',
            'lst',
            'ltx',
            'lua',
            'm',
            'mak',
            'make',
            'manifest',
            'master',
            'md',
            'markdn',
            'markdown',
            'mdown',
            'mkdn',
            'ml',
            'mli',
            'mll',
            'mly',
            'mm',
            'mud',
            'nfo',
            'opml',
            'osascript',
            'p',
            'pas',
            'patch',
            'php',
            'php2',
            'php3',
            'php4',
            'php5',
            'phtml',
            'pl',
            'pm',
            'pod',
            'pp',
            'profile',
            'ps1',
            'ps1xml',
            'psd1',
            'psm1',
            'pss',
            'pt',
            'py',
            'pyw',
            'r',
            'rake',
            'rb',
            'rbx',
            'rc',
            'rdf',
            're',
            'reg',
            'rest',
            'resw',
            'resx',
            'rhtml',
            'rjs',
            'rprofile',
            'rpy',
            'rss',
            'rst',
            'ruby',
            'rxml',
            's',
            'sass',
            'scala',
            'scm',
            'sconscript',
            'sconstruct',
            'script',
            'scss',
            'sgml',
            'sh',
            'shtml',
            'sml',
            'svn-base',
            'swift',
            'sql',
            'sty',
            'tcl',
            'tex',
            'textile',
            'tld',
            'tli',
            'tmpl',
            'tpl',
            'vb',
            'vi',
            'vim',
            'vmg',
            'webpart',
            'wsp',
            'wsdl',
            'xhtml',
            'xoml',
            'xsd',
            'xslt',
            'yaml',
            'yaws',
            'yml',
            'zsh'
        ]
    },
    contact: {
        extensions: ['vcf']
    },
    css: {},
    csv: {
        extensions: ['csv']
    },
    docset: {},
    docx: {
        extensions: ['doc', 'docm', 'docx', 'docb']
    },
    dotx: {
        extensions: ['dot', 'dotm', 'dotx']
    },
    email: {
        extensions: ['eml', 'msg', 'ost', 'pst']
    },
    exe: {
        extensions: ['application', 'appref-ms', 'apk', 'app', 'appx', 'exe', 'ipa', 'msi', 'xap']
    },
    folder: {},
    font: {
        extensions: ['ttf', 'otf', 'woff']
    },
    fluid: {
        extensions: ['b', 'fluid']
    },
    genericfile: {},
    html: {
        extensions: ['htm', 'html', 'mht']
    },
    link: {
        extensions: ['lnk', 'link', 'url', 'website', 'webloc']
    },
    linkedfolder: {},
    splist: {
        extensions: ['listitem']
    },
    model: {
        extensions: [
            '3ds',
            '3mf',
            'blend',
            'cool',
            'dae',
            'df',
            'dwfx',
            'dwg',
            'dxf',
            'fbx',
            'glb',
            'gltf',
            'holo',
            'layer',
            'layout',
            'max',
            'mtl',
            'obj',
            'off',
            'ply',
            'skp',
            'stp',
            'stl',
            't',
            'thl',
            'x'
        ]
    },
    mpp: {
        extensions: ['mpp']
    },
    mpt: {
        extensions: ['mpt']
    },
    multiple: {},
    one: {
        extensions: ['one'] // this is a format for exported single - file notebook pages
    },
    onetoc: {
        extensions: ['ms-one-stub', 'onetoc', 'onetoc2', 'onepkg'] // this icon represents a complete, logical notebook.
    },
    pdf: {
        extensions: ['pdf']
    },
    photo: {
        extensions: [
            'arw',
            'bmp',
            'cr2',
            'crw',
            'dcr',
            'dds',
            'dib',
            'dng',
            'erf',
            'gif',
            'heic',
            'heif',
            'ico',
            'jfi',
            'jfif',
            'jif',
            'jpe',
            'jpeg',
            'jpg',
            'kdc',
            'mrw',
            'nef',
            'orf',
            'pct',
            'pict',
            'png',
            'pns',
            'psd',
            'raw',
            'tga',
            'tif',
            'tiff',
            'wdp'
        ]
    },
    photo360: {},
    potx: {
        extensions: ['pot', 'potm', 'potx']
    },
    powerbi: {
        extensions: ['pbids', 'pbix']
    },
    ppsx: {
        extensions: ['pps', 'ppsm', 'ppsx']
    },
    pptx: {
        extensions: ['ppt', 'pptm', 'pptx', 'sldx', 'sldm']
    },
    presentation: {
        extensions: ['odp', 'gslides', 'key']
    },
    pub: {
        extensions: ['pub']
    },
    spo: {
        extensions: ['aspx']
    },
    sponews: {},
    spreadsheet: {
        extensions: ['odc', 'ods', 'gsheet', 'numbers']
    },
    rtf: {
        extensions: ['epub', 'gdoc', 'odt', 'rtf', 'wri', 'pages']
    },
    sharedfolder: {},
    sway: {},
    sysfile: {
        extensions: [
            'bak',
            'bin',
            'cab',
            'cache',
            'cat',
            'cer',
            'class',
            'dat',
            'db',
            'dbg',
            'dl_',
            'dll',
            'ithmb',
            'jar',
            'kb',
            'ldt',
            'lrprev',
            'pkpass',
            'ppa',
            'ppam',
            'pdb',
            'rom',
            'thm',
            'thmx',
            'vsl',
            'xla',
            'xlam',
            'xlb',
            'xll'
        ]
    },
    txt: {
        extensions: ['dif', 'diff', 'readme', 'out', 'plist', 'properties', 'text', 'txt']
    },
    vaultclosed: {},
    vaultopen: {},
    vector: {
        extensions: [
            'ai',
            'cvs',
            'dgn',
            'gdraw',
            'pd',
            'emf',
            'eps',
            'fig',
            'ind',
            'indd',
            'indt',
            'indb',
            'ps',
            'svg',
            'svgz',
            'wmf',
            'oxps',
            'xps',
            'xd',
            'sketch'
        ]
    },
    video: {
        extensions: [
            '3g2',
            '3gp',
            '3gp2',
            '3gpp',
            'asf',
            'avi',
            'dvr-ms',
            'flv',
            'm1v',
            'm4v',
            'mkv',
            'mod',
            'mov',
            'mm4p',
            'mp2',
            'mp2v',
            'mp4',
            'mpa',
            'mpe',
            'mpeg',
            'mpg',
            'mpv',
            'mpv2',
            'mts',
            'ogg',
            'qt',
            'swf',
            'ts',
            'vob',
            'webm',
            'wlmp',
            'wm',
            'wmv',
            'wmx'
        ]
    },
    video360: {},
    vsdx: {
        extensions: ['vdx', 'vsd', 'vsdm', 'vsdx', 'vsw', 'vdw']
    },
    vssx: {
        extensions: ['vss', 'vssm', 'vssx']
    },
    vstx: {
        extensions: ['vst', 'vstm', 'vstx', 'vsx']
    },
    xlsx: {
        extensions: ['xlc', 'xls', 'xlsb', 'xlsm', 'xlsx']
    },
    xltx: {
        extensions: ['xlt', 'xltm', 'xltx']
    },
    xml: {
        extensions: ['xaml', 'xml', 'xsl']
    },
    xsn: {
        extensions: ['xsn']
    },
    zip: {
        extensions: ['zip']
    }
};
//# sourceMappingURL=FileTypeIconMap.js.map

/***/ }),

/***/ "o5ir":
/*!******************************************************!*\
  !*** ./lib/assets/portfolioImageGalleryChairsSm.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfolioimagegallerychairssm_5eab4e4091ef32e7fe1ab7af9bed8986.png";

/***/ }),

/***/ "olQP":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage8.jpg ***!
  \***************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "visualtemplateimage8_31ac4b01e16273a1c7ab48a7bb5b391e.jpg";

/***/ }),

/***/ "p6S7":
/*!*******************************************!*\
  !*** ./lib/smartRace/loc/Strings.resx.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_H+aT+QCAdZJ1mZZHM8TaAA';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "pv5M":
/*!********************************************************!*\
  !*** ./lib/viewportLoader/ViewportLoaderServiceKey.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ViewportLoaderFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewportLoaderFactory */ "K5Q7");
// Copyright (c) Microsoft. All rights reserved.


var ViewportLoaderServiceKey = /** @class */ (function () {
    function ViewportLoaderServiceKey() {
    }
    // TODO: VSO#753417 Get componentType from serviceScope rather than specifying WebPart here
    ViewportLoaderServiceKey.serviceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["ServiceKey"].createCustom('sp-component-utilities:ViewportLoader', function (serviceScope) { return _ViewportLoaderFactory__WEBPACK_IMPORTED_MODULE_1__["default"].getViewportLoader(0 /* WebPart */); });
    return ViewportLoaderServiceKey;
}());
/* harmony default export */ __webpack_exports__["default"] = (ViewportLoaderServiceKey);


/***/ }),

/***/ "pvS+":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage9.jpg ***!
  \***************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "visualtemplateimage9_567524b28cce48792d37bad4a16732d2.jpg";

/***/ }),

/***/ "qMPn":
/*!***********************************!*\
  !*** ./lib/decorators/monitor.js ***!
  \***********************************/
/*! exports provided: UnexpectedFailure, ExpectedFailure, monitor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnexpectedFailure", function() { return UnexpectedFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpectedFailure", function() { return ExpectedFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "monitor", function() { return monitor; });
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @copyright (c) Microsoft Corporation. All rights reserved.
 * @file monitor.ts
 */

function normalizeError(error) {
    if (error instanceof Error) {
        return error;
    }
    else {
        return new Error(error);
    }
}
/**
 * The unexpected failure for QoS monitor.
 */
var UnexpectedFailure = /** @class */ (function () {
    function UnexpectedFailure(tagNameSuffix, innerError, extraData) {
        this._tagNameSuffix = tagNameSuffix;
        this._innerError = normalizeError(innerError);
        this._extraData = extraData;
    }
    Object.defineProperty(UnexpectedFailure.prototype, "tagNameSuffix", {
        get: function () { return this._tagNameSuffix; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UnexpectedFailure.prototype, "innerError", {
        get: function () { return this._innerError; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UnexpectedFailure.prototype, "extraData", {
        get: function () { return this._extraData; },
        enumerable: true,
        configurable: true
    });
    return UnexpectedFailure;
}());

/**
 * The expected failure for QoS monitor.
 */
var ExpectedFailure = /** @class */ (function () {
    function ExpectedFailure(tagNameSuffix, innerError, extraData) {
        this._tagNameSuffix = tagNameSuffix;
        this._innerError = normalizeError(innerError);
        this._extraData = extraData;
    }
    Object.defineProperty(ExpectedFailure.prototype, "tagNameSuffix", {
        get: function () { return this._tagNameSuffix; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpectedFailure.prototype, "innerError", {
        get: function () { return this._innerError; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpectedFailure.prototype, "extraData", {
        get: function () { return this._extraData; },
        enumerable: true,
        configurable: true
    });
    return ExpectedFailure;
}());

/**
 * QoS monitor decorator.
 * @param scenarioName - The scenario name for QoS monitor.
 */
function monitor(scenarioName) {
    return function (target, key, descriptor) {
        if (descriptor.value) {
            var originalFunction_1 = descriptor.value; // tslint:disable-line:no-any
            descriptor.value = function monitorWrapper() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"](scenarioName);
                // @todo Support the synchronous method with try-catch block.
                var promise = originalFunction_1.apply(this, args);
                return promise.then(function (result) {
                    qosMonitor.writeSuccess();
                    return result;
                }, function (error) {
                    if (error instanceof ExpectedFailure) {
                        qosMonitor.writeExpectedFailure(error.tagNameSuffix, error.innerError, error.extraData);
                        throw error.innerError;
                    }
                    else if (error instanceof UnexpectedFailure) {
                        qosMonitor.writeUnexpectedFailure(error.tagNameSuffix, error.innerError, error.extraData);
                        throw error.innerError;
                    }
                    else {
                        qosMonitor.writeUnexpectedFailure('UnexpectedFailure', error);
                        throw error;
                    }
                });
            };
        }
    };
}


/***/ }),

/***/ "qYVA":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage10.jpg ***!
  \****************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "visualtemplateimage10_bf6fbb7366aabf60cd5f5ee9d94dcde9.jpg";

/***/ }),

/***/ "qaT1":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage2.jpg ***!
  \***************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "visualtemplateimage2_870ddf27487a87390d27fe88d023969c.jpg";

/***/ }),

/***/ "rBYt":
/*!********************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/sortablejs/1.4.2/node_modules/sortablejs/Sortable.js ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */


(function (factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else {}
})(function () {
	"use strict";

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,

		scrollEl,
		scrollParentEl,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		RSPACE = /\s+/g,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,

		supportDraggable = !!('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		slice = [].slice,

		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy
				;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							if (el === win) {
								win.scrollTo(win.pageXOffset + vx * speed, win.pageYOffset + vy * speed);
							} else {
								vy && (el.scrollTop += vy * speed);
								vx && (el.scrollLeft += vx * speed);
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			var group = options.group;

			if (!group || typeof group != 'object') {
				group = options.group = {name: group};
			}

			['pull', 'put'].forEach(function (key) {
				if (!(key in group)) {
					group[key] = true;
				}
			});

			options.groups = ' ' + group.name + (group.put.join ? ' ' + group.put.join(' ') : '') + ' ';
		}
	;



	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;


		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			ignore: 'a, img',
			filter: null,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = target,
				filter = options.filter;


			if (type === 'mousedown' && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}

			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			// get the index of the dragged element within its parent
			oldIndex = _index(target);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, oldIndex);
					evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, oldIndex);
						return true;
					}
				});

				if (filter) {
					evt.preventDefault();
					return; // cancel dnd
				}
			}


			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}


			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				activeGroup = options.group;

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = true;

					// Chosen item
					_toggleClass(dragEl, _this.options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(touch);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}
			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Touch */touch) {
			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					document.selection.empty();
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				// Apply effect
				_toggleClass(dragEl, this.options.ghostClass, true);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, oldIndex);
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY),
					parent = target,
					groupName = ' ' + this.options.group.name + '',
					i = touchDragOverListeners.length;

				if (parent) {
					do {
						if (parent[expando] && parent[expando].options.groups.indexOf(groupName) > -1) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				var touch = evt.touches ? evt.touches[0] : evt,
					dx = touch.clientX - tapEvt.clientX,
					dy = touch.clientY - tapEvt.clientY,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var dataTransfer = evt.dataTransfer,
				options = this.options;

			this._offUpEvents();

			if (activeGroup.pull == 'clone') {
				cloneEl = dragEl.cloneNode(true);
				_css(cloneEl, 'display', 'none');
				rootEl.insertBefore(cloneEl, dragEl);
			}

			if (useFallback) {

				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', this._onTouchMove);
					_on(document, 'touchend', this._onDrop);
					_on(document, 'touchcancel', this._onDrop);
				} else {
					// Old brwoser
					_on(document, 'mousemove', this._onTouchMove);
					_on(document, 'mouseup', this._onDrop);
				}

				this._loopId = setInterval(this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(this, dataTransfer, dragEl);
				}

				_on(document, 'drop', this);
				setTimeout(this._dragStarted, 0);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				revert,
				options = this.options,
				group = options.group,
				groupPut = group.put,
				isOwner = (activeGroup === group),
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			moved = true;

			if (activeGroup && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: activeGroup.pull && groupPut && (
						(activeGroup.name === group.name) || // by Name
						(groupPut.indexOf && ~groupPut.indexOf(activeGroup.name)) // by Array
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (revert) {
					_cloneHide(true);

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (target = _ghostIsLast(el, evt))
				) {

					if (target) {
						if (target.animated) {
							return;
						}

						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect) !== false) {
						if (!dragEl.contains(el)) {
							el.appendChild(dragEl);
							parentEl = el; // actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					}


					var targetRect = target.getBoundingClientRect(),
						width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = /left|right|inline/.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect),
						after
					;

					if (moveVector !== false) {
						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(isOwner);

						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}
						else if (floating) {
							var elTop = dragEl.offsetTop,
								tgTop = target.offsetTop;

							if (elTop === tgTop) {
								after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
							} else {
								after = tgTop > elTop;
							}
						} else {
							after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
						}

						if (!dragEl.contains(el)) {
							if (after && !nextSibling) {
								el.appendChild(dragEl);
							} else {
								target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
							}
						}

						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			// Unbind events
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode.removeChild(ghostEl);

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl);

						if (newIndex >= 0) {
							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);

							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, rootEl, oldIndex, newIndex);
						}
					}
					else {
						// Remove clone
						cloneEl && cloneEl.parentNode.removeChild(cloneEl);

						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						if (newIndex === null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}

				// Nulling
				rootEl =
				dragEl =
				parentEl =
				ghostEl =
				nextEl =
				cloneEl =

				scrollEl =
				scrollParentEl =

				tapEvt =
				touchEvt =

				moved =
				newIndex =

				lastEl =
				lastCSS =

				activeGroup =
				Sortable.active = null;
			}
		},


		handleEvent: function (/**Event*/evt) {
			var type = evt.type;

			if (type === 'dragover' || type === 'dragenter') {
				if (dragEl) {
					this._onDragOver(evt);
					_globalDragOver(evt);
				}
			}
			else if (type === 'drop' || type === 'dragend') {
				this._onDrop(evt);
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(state) {
		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');
			!state && cloneEl.state && rootEl.insertBefore(cloneEl, dragEl);
			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			do {
				if (
					(tag === '>*' && el.parentNode === ctx) || (
						(tag === '' || el.nodeName.toUpperCase() == tag) &&
						(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
					)
				) {
					return el;
				}
			}
			while (el !== ctx && (el = el.parentNode));
		}

		return null;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, false);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, false);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(RSPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(RSPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, fromEl, startIndex, newIndex) {
		var evt = document.createEvent('Event'),
			options = (sortable || rootEl[expando]).options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
				rect = lastEl.getBoundingClientRect();

		return ((evt.clientY - (rect.top + rect.height) > 5) || (evt.clientX - (rect.right + rect.width) > 5)) && lastEl; // min delta
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent
	 * @param  {HTMLElement} el
	 * @return {number}
	 */
	function _index(el) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if (el.nodeName.toUpperCase() !== 'TEMPLATE') {
				index++;
			}
		}

		return index;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}


	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		index: _index
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.4.2';
	return Sortable;
});


/***/ }),

/***/ "rcdJ":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/news/carousel/newsCarousel3sm.png ***!
  \**********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "newscarousel3sm_4b3282c0ce203d8273bc4ed6c946abcf.png";

/***/ }),

/***/ "rgtK":
/*!*********************************************************!*\
  !*** ./lib/screenReaderAlert/ScreenReaderAlertProps.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "rn0h":
/*!************************************!*\
  !*** ./lib/fileTypeIcons/index.js ***!
  \************************************/
/*! exports provided: Icons, DEFAULT_EXTENSION, DEFAULT_SIZE, FOLDER_EXTENSION, LIST_ITEM_EXTENSION, FileTypeIconDetailsListRenderer, FileTypeIconsLoader, DEFAULT_ICON_COLOR, DOCX_ICON_COLOR, ODP_ICON_COLOR, LISTITEM_ICON, ICONS, ICON_EXT_MAP, EXTENSIONS_TO_FILENAME_MAP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Icons */ "Ze8N");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Icons", function() { return _Icons__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EXTENSION", function() { return _Icons__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_EXTENSION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SIZE", function() { return _Icons__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_SIZE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FOLDER_EXTENSION", function() { return _Icons__WEBPACK_IMPORTED_MODULE_0__["FOLDER_EXTENSION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LIST_ITEM_EXTENSION", function() { return _Icons__WEBPACK_IMPORTED_MODULE_0__["LIST_ITEM_EXTENSION"]; });

/* harmony import */ var _FileTypeIconMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FileTypeIconMap */ "H3mH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_ICON_COLOR", function() { return _FileTypeIconMap__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_ICON_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DOCX_ICON_COLOR", function() { return _FileTypeIconMap__WEBPACK_IMPORTED_MODULE_1__["DOCX_ICON_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ODP_ICON_COLOR", function() { return _FileTypeIconMap__WEBPACK_IMPORTED_MODULE_1__["ODP_ICON_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LISTITEM_ICON", function() { return _FileTypeIconMap__WEBPACK_IMPORTED_MODULE_1__["LISTITEM_ICON"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ICONS", function() { return _FileTypeIconMap__WEBPACK_IMPORTED_MODULE_1__["ICONS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ICON_EXT_MAP", function() { return _FileTypeIconMap__WEBPACK_IMPORTED_MODULE_1__["ICON_EXT_MAP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EXTENSIONS_TO_FILENAME_MAP", function() { return _FileTypeIconMap__WEBPACK_IMPORTED_MODULE_1__["EXTENSIONS_TO_FILENAME_MAP"]; });

/* harmony import */ var _renderers_FileTypeIconDetailsListRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderers/FileTypeIconDetailsListRenderer */ "F2IJ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FileTypeIconDetailsListRenderer", function() { return _renderers_FileTypeIconDetailsListRenderer__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _FileTypeIconsLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FileTypeIconsLoader */ "aEnU");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FileTypeIconsLoader", function() { return _FileTypeIconsLoader__WEBPACK_IMPORTED_MODULE_3__["default"]; });







/***/ }),

/***/ "rszi":
/*!********************************************!*\
  !*** ./lib/assets/reportDefaultImage3.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "reportdefaultimage3_9d414de8477674c853e22dedfb52d774.png";

/***/ }),

/***/ "swXh":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/pageTemplates/visualTemplateTitleImage.jpg ***!
  \*******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "visualtemplatetitleimage_3a6339a73efa56181ef9eba350f881c3.jpg";

/***/ }),

/***/ "twtR":
/*!****************************************************************!*\
  !*** ./lib/screenReaderAlert/ScreenReaderAlert.module.scss.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ScreenReaderAlert.module.css */ "wu3P");
var styles = {
    screenReaderAlert: 'screenReaderAlert_e207ba1c'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "uRS8":
/*!**********************************************!*\
  !*** ./lib/assets/reportDefaultImage1sm.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "reportdefaultimage1sm_601c87cbf4b8611b6125ed237800b8a7.png";

/***/ }),

/***/ "ut3N":
/*!********************************************!*\
  !*** external "@microsoft/sp-diagnostics" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ut3N__;

/***/ }),

/***/ "vINC":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/fileTypeIcons/renderers/FileTypeIcons.module.css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".fileIcon_5159120a{width:16px!important}", ""]);



/***/ }),

/***/ "vlQI":
/*!*************************************!*\
  !*** external "@microsoft/sp-http" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vlQI__;

/***/ }),

/***/ "vp2G":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/news/carousel/newsCarousel2sm.png ***!
  \**********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "newscarousel2sm_f1b85f2aa10810312802f358baa62f1b.png";

/***/ }),

/***/ "vpy3":
/*!*******************************!*\
  !*** external "resx-strings" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vpy3__;

/***/ }),

/***/ "w34T":
/*!**************************************************************!*\
  !*** ./lib/collapsibleSection/CollapsibleSection.module.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./CollapsibleSection.module.css */ "Op9h");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "w5Sh":
/*!********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/news/carousel/newsCarousel2.png ***!
  \********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "newscarousel2_b68b932066056adee1d1deac3be94ebf.png";

/***/ }),

/***/ "wg71":
/*!******************************************!*\
  !*** ./lib/events/ScrollEventHandler.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



/**
 * Common scroll event handler to optimize multiple individual handlers and cost of calculating ClientRect.
 * It also optimizes calculating scrollable parents.
 * It also notifies on window resize besides scroll event
 *
 * @internal
 */
var ScrollEventHandler = /** @class */ (function () {
    /**
     * Private Constructor of singleton class
     */
    function ScrollEventHandler() {
        this._eventListeners = new Set();
        this._isListeningWindow = false;
        this._lazyHandler = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__["throttle"](this._scrollEventHandler, 10).bind(this);
    }
    /**
    * Traverses up the DOM tree for the element with the data-is-scrollable=true attribute,
    * or return the window object.
    */
    ScrollEventHandler._findScrollableParent = function (startingElement) {
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
            var styles = getComputedStyle(el);
            if (styles) {
                var overflowY = styles.getPropertyValue('overflow-y');
                if (overflowY && (overflowY === this.SCROLL || overflowY === 'auto')) {
                    return el;
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
    Object.defineProperty(ScrollEventHandler, "instance", {
        get: function () {
            // Lazy initialize the singleton
            if (ScrollEventHandler._instance === undefined) {
                ScrollEventHandler._instance = new ScrollEventHandler();
            }
            return ScrollEventHandler._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Reset scroll event handler
     */
    ScrollEventHandler.prototype.reset = function () {
        var _this = this;
        this._eventListeners.forEach(function (callback) {
            // The first parameter is not used in the call. A random item from `_scrollableParents` is passed to it.
            _this.unregister(_this._scrollableParents[0], callback);
        });
        this._scrollableParents = [];
        this._cachedClientRect = undefined;
    };
    /**
     * Register an element to receive notification on scroll event
     *
     * @param element - Element for which scroll event is desired
     * @param callbackFunction - Callback function for handling event
     * @param scrollableParent - Optional scrollable Parent if already known
     */
    ScrollEventHandler.prototype.register = function (element, callbackFunction, scrollableParent) {
        var _this = this;
        // Use if scrollable parent is provided, as that is more performant.
        if (!this._scrollableParents || !this._scrollableParents.length) {
            this._scrollableParents =
                scrollableParent ? [scrollableParent] : this._findScrollableParents(element);
        }
        // We want to listen to the scrollable parent's scroll event, if one exists.
        this._scrollableParents.forEach(function (parent, index, allParents) {
            var totalRegisteredCount = _this._updateRegisteredChildren(parent, 1);
            // First time: add event listener
            if (totalRegisteredCount === 1) {
                _this._listenEvents(parent);
            }
        });
        this._listenEvents(window);
        this._eventListeners.add(callbackFunction);
    };
    /**
     * Unregister a loaded element which should not be tracked any more.
     */
    ScrollEventHandler.prototype.unregister = function (element, callbackFunction) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(callbackFunction, 'unregister callback function');
        if (!this._eventListeners.has(callbackFunction)) {
            return;
        }
        this._eventListeners.delete(callbackFunction);
        var parents = this._scrollableParents && this._scrollableParents.length
            ? this._scrollableParents
            : this._findScrollableParents(element);
        parents.forEach(function (parent, index, allParents) {
            var count = _this._updateRegisteredChildren(parent, -1);
            if (count <= 0) {
                // This was the last listener for this parent, unregister event
                _this._unlistenEvents(parent);
            }
        });
        if (this._eventListeners.size === 0) {
            this._unlistenEvents(window);
        }
    };
    /**
     * Event handler which is called upon scroll and resize events.
     */
    ScrollEventHandler.prototype._scrollEventHandler = function (event) {
        var _this = this;
        // Optimize calculating getBoundingClientRect
        if (!this._cachedClientRect || this._cacheExpired) {
            this._cachedClientRect = this._scrollableParents[this._scrollableParents.length - 1].getBoundingClientRect();
            this._cachedClientRectAge = Date.now();
        }
        this._eventListeners.forEach(function (listener) {
            listener(event, _this._cachedClientRect);
        });
    };
    /**
    * Returns all scrollable parents between element and the body of the document.
    * It is often one but in case of Classic pages there might be intermediate parents.
    */
    ScrollEventHandler.prototype._findScrollableParents = function (startingElement) {
        var parents = [];
        var parent = startingElement;
        while (parent) {
            parent = ScrollEventHandler._findScrollableParent(parent);
            if (parent) {
                parents.push(parent);
                parent = parent.parentElement;
            }
        }
        return parents.length ? parents : [document.body];
    };
    /**
    * Start listening to scroll and resize events. It is safe to call this API multiple times on a DOM
    * element, it does not lead to multiple attached events.
    */
    ScrollEventHandler.prototype._listenEvents = function (parent) {
        if (!parent) {
            return;
        }
        var isWindow = parent === window;
        if (!isWindow || (isWindow && !this._isListeningWindow)) {
            this._addEventListener(parent);
            if (isWindow) {
                this._isListeningWindow = true;
            }
        }
    };
    /**
     * Add Listener to scroll and resize events for given element or window
     */
    ScrollEventHandler.prototype._addEventListener = function (element) {
        element.addEventListener(ScrollEventHandler.SCROLL, this._lazyHandler, false);
        element.addEventListener(ScrollEventHandler.RESIZE, this._lazyHandler, false);
    };
    /**
    * Stop listening to scroll and resize events.
    */
    ScrollEventHandler.prototype._unlistenEvents = function (parent) {
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
    ScrollEventHandler.prototype._removeEventListener = function (element) {
        element.removeEventListener(ScrollEventHandler.SCROLL, this._lazyHandler);
        element.removeEventListener(ScrollEventHandler.RESIZE, this._lazyHandler);
    };
    /**
     * It keeps track of how many lazily loaded children are registered to a scrollable parent.
     * This record keeping is required to deregister event handler from the parent when There
     * are no children listening to events.
     */
    ScrollEventHandler.prototype._updateRegisteredChildren = function (scrollableParent, count) {
        var lazyChildrenCount = count + Number(scrollableParent.getAttribute(ScrollEventHandler._eventTrackerAttribute));
        if (lazyChildrenCount > 0) {
            scrollableParent.setAttribute(ScrollEventHandler._eventTrackerAttribute, lazyChildrenCount.toString());
        }
        else {
            scrollableParent.removeAttribute(ScrollEventHandler._eventTrackerAttribute);
        }
        return lazyChildrenCount;
    };
    Object.defineProperty(ScrollEventHandler.prototype, "_cacheExpired", {
        get: function () {
            return (Date.now() - this._cachedClientRectAge >= ScrollEventHandler.CACHE_EXPIRED);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This attribute managed the number of scroll event handlers that are registered to
     * a scrollable parent. When the number of events becomes zero, the event handler is
     * unregistered.
     */
    ScrollEventHandler._eventTrackerAttribute = 'data-sp-scroll-event-listener';
    ScrollEventHandler.SCROLL = 'scroll';
    ScrollEventHandler.RESIZE = 'resize';
    ScrollEventHandler.CACHE_EXPIRED = 100;
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], ScrollEventHandler.prototype, "register", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], ScrollEventHandler.prototype, "_findScrollableParents", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], ScrollEventHandler.prototype, "_unlistenEvents", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], ScrollEventHandler.prototype, "_updateRegisteredChildren", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], ScrollEventHandler, "_findScrollableParent", null);
    return ScrollEventHandler;
}());
/* harmony default export */ __webpack_exports__["default"] = (ScrollEventHandler);


/***/ }),

/***/ "wsap":
/*!*************************************************!*\
  !*** ./lib/assets/portfolioDefaultImage1sm.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "portfoliodefaultimage1sm_fb7b79fac00ee5ec15909064ec506efc.png";

/***/ }),

/***/ "wu3P":
/*!************************************************************!*\
  !*** ./lib/screenReaderAlert/ScreenReaderAlert.module.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ScreenReaderAlert.module.css */ "Xr2F");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "x3Od":
/*!***********************************!*\
  !*** ./lib/multilingual/index.js ***!
  \***********************************/
/*! exports provided: Multilingual */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Multilingual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Multilingual */ "Q67u");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Multilingual", function() { return _Multilingual__WEBPACK_IMPORTED_MODULE_0__["Multilingual"]; });




/***/ }),

/***/ "y88i":
/*!********************************************!*\
  !*** external "@ms/odsp-utilities-bundle" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_y88i__;

/***/ }),

/***/ "yqC6":
/*!***************************************!*\
  !*** ./lib/layouts/PreviewUtility.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _extensionHelper_ExtensionHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../extensionHelper/ExtensionHelper */ "ByVl");
/* harmony import */ var _ThumbnailUrlGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThumbnailUrlGenerator */ "KCwX");
/* harmony import */ var _SPConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SPConstants */ "bz/i");
/* harmony import */ var _performance_DomMeasurementCache__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../performance/DomMeasurementCache */ "LDzE");
/* harmony import */ var _SPResourcePath__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../SPResourcePath */ "OLPK");
/* harmony import */ var _urlUtilities_toRelativeUrl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../urlUtilities/toRelativeUrl */ "WBWG");
/* harmony import */ var _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../performance/KillSwitch */ "k0Dt");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_10__);











var DEFAULT_IMAGE1_JPG = __webpack_require__(/*! ../assets/defaultImage1.jpg */ "N8z2");
var DEFAULT_IMAGE2_JPG = __webpack_require__(/*! ../assets/defaultImage2.jpg */ "IiD6");
var DEFAULT_IMAGE3_JPG = __webpack_require__(/*! ../assets/defaultImage3.jpg */ "hjoG");
var DEFAULT_IMAGE4_JPG = __webpack_require__(/*! ../assets/defaultImage4.jpg */ "P0ji");
var DEFAULT_IMAGE5_JPG = __webpack_require__(/*! ../assets/defaultImage5.jpg */ "ERKq");
var DEFAULT_PORTFOLIO1_PNG = __webpack_require__(/*! ../assets/portfolioDefaultImage1.png */ "Jw2e");
var DEFAULT_PORTFOLIO2_PNG = __webpack_require__(/*! ../assets/portfolioDefaultImage2.png */ "bMgq");
var DEFAULT_PORTFOLIO3_PNG = __webpack_require__(/*! ../assets/portfolioDefaultImage3.png */ "DeWO");
var DEFAULT_IMAGE1_PNG = __webpack_require__(/*! ../assets/reportDefaultImage1.png */ "ZzUU");
var DEFAULT_IMAGE2_PNG = __webpack_require__(/*! ../assets/reportDefaultImage2.png */ "DXzA");
var DEFAULT_IMAGE3_PNG = __webpack_require__(/*! ../assets/reportDefaultImage3.png */ "rszi");
var DEFAULT_IMAGE4_PNG = __webpack_require__(/*! ../assets/reportDefaultImage4.png */ "CQB5");
var DEFAULT_IMAGE5_PNG = __webpack_require__(/*! ../assets/reportDefaultImage5.png */ "RCxI");
var DEFAULT_IMAGE1_JPG_SM = DEFAULT_IMAGE1_JPG;
var DEFAULT_IMAGE2_JPG_SM = DEFAULT_IMAGE2_JPG;
var DEFAULT_IMAGE3_JPG_SM = DEFAULT_IMAGE3_JPG;
var DEFAULT_IMAGE4_JPG_SM = DEFAULT_IMAGE4_JPG;
var DEFAULT_IMAGE5_JPG_SM = DEFAULT_IMAGE5_JPG;
var DEFAULT_PORTFOLIO1_PNG_SM = __webpack_require__(/*! ../assets/portfolioDefaultImage1sm.png */ "wsap");
var DEFAULT_PORTFOLIO2_PNG_SM = __webpack_require__(/*! ../assets/portfolioDefaultImage2sm.png */ "YEwp");
var DEFAULT_PORTFOLIO3_PNG_SM = __webpack_require__(/*! ../assets/portfolioDefaultImage3sm.png */ "UY3P");
var DEFAULT_IMAGE1_PNG_SM = __webpack_require__(/*! ../assets/reportDefaultImage1sm.png */ "uRS8");
var DEFAULT_IMAGE2_PNG_SM = DEFAULT_IMAGE2_PNG;
var DEFAULT_IMAGE3_PNG_SM = __webpack_require__(/*! ../assets/reportDefaultImage3sm.png */ "JEku");
var DEFAULT_IMAGE4_PNG_SM = __webpack_require__(/*! ../assets/reportDefaultImage4sm.png */ "2qYO");
var DEFAULT_IMAGE5_PNG_SM = __webpack_require__(/*! ../assets/reportDefaultImage5sm.png */ "lMrs");
var DEFAULT_NEWS_CAROUSEL1 = __webpack_require__(/*! @ms/odsp-media/dist/media/images/news/carousel/newsCarousel1.png */ "gTJx");
var DEFAULT_NEWS_CAROUSEL2 = __webpack_require__(/*! @ms/odsp-media/dist/media/images/news/carousel/newsCarousel2.png */ "w5Sh");
var DEFAULT_NEWS_CAROUSEL3 = __webpack_require__(/*! @ms/odsp-media/dist/media/images/news/carousel/newsCarousel3.png */ "N9n9");
var DEFAULT_NEWS_CAROUSEL1_SM = __webpack_require__(/*! @ms/odsp-media/dist/media/images/news/carousel/newsCarousel1sm.png */ "VMpG");
var DEFAULT_NEWS_CAROUSEL2_SM = __webpack_require__(/*! @ms/odsp-media/dist/media/images/news/carousel/newsCarousel2sm.png */ "vp2G");
var DEFAULT_NEWS_CAROUSEL3_SM = __webpack_require__(/*! @ms/odsp-media/dist/media/images/news/carousel/newsCarousel3sm.png */ "rcdJ");
/**
 * SP item ids (web, site, list and file) based vroom API template
 */
/* tslint:disable-next-line:max-line-length */
var VROOM_API_IDS_TEMPLATE = '{.spHost}/_api/v2.1/sites/{DomainName},{SPSite.Id},{SPWeb.Id}/lists/{SPList.Id}/items/{SPListItem.UniqueId}/driveItem';
/**
 * SP item ids (web, site and file) based vroom API template
 */
/* tslint:disable-next-line:max-line-length */
var VROOM_API_3_IDS_TEMPLATE = '{.spHost}/_api/v2.1/sites/{DomainName},{SPSite.Id},{SPWeb.Id}/items/{SPListItem.UniqueId}/driveItem';
/**
 * SP resource relative url based vroom API template
 * DO NOT use v2.1. sharePoint: URL is deprecated in v2.1.
 * Until !share{base64Url} API is ported in v2.1 as supported for Site pages, we continue on this template.
 */
var VROOM_API_URL_TEMPLATE = '{.spHost}/_api/v2.0/sharePoint:{.resourceUrl}:/driveItem';
var THUMBNAIL_SIZE_PREFIX = '/thumbnails/0/c';
var VROOM_CLIENTTYPE_KS = new _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_9__["KillSwitch"]('e8bd05c3-a9a2-46d6-a415-0395a8cedf5c'
/*, '2019/11/01', 'Add client type query param to VROOM thumbnail API calls' */ );
var useStringForGetDefaultImageKillSwitch = new _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_9__["KillSwitch"]('08995e5a-7554-4c37-a868-a43a1b817a1b' /* '2019/11/08', 'useStringForGetDefaultImageKillSwitch' */);
/**
 * Internal Utility for PreviewHelper and ThumbnailUrlGenerator class
 * @internal
 */
var PreviewUtility = /** @class */ (function () {
    function PreviewUtility() {
    }
    Object.defineProperty(PreviewUtility, "smallestBreakPointWidth", {
        get: function () {
            return 400;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PreviewUtility, "getPreviewSupportedMap", {
        get: function () {
            return ( true ? PreviewUtility._getPreviewSupportedMap : undefined);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns alternatate URL for the given URL. It takes care of encoded/decoded URL.
     * Note: width and height parameters are scaled window.devicePixelRatio times
     *
     * @param spResourcePath Relative path of the sharepoint resource. It works for
     * absolute URL but recommended to use relative Url as authority is always subject
     * to change upon tenant migration.
     * @param width Optional width if provided will be appended as width query parameter
     * @param height Optional height if provided will be appended as width query parameter
     */
    PreviewUtility.getAlternateUrl = function (resourcePath, width, height) {
        // contract of getPriverImageUrl is not well defined. It is possible that the method is called
        // with either encoded or decoded URI. The key in the map is produced on the server,
        // hence, if the original URI was decoded on the client, we need to check whether the original
        // encoded URI was used as a key.
        // this is mostly redundant call, but it is a cheap enough workaround to avoid changing the logic
        // in every place the helper is being invoked from.
        var alternativeUrl = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["SPAlternativeUrls"].tryGetAlternativeUrl(resourcePath.value)
            || _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["SPAlternativeUrls"].tryGetAlternativeUrl(encodeURI(resourcePath.value));
        if (!alternativeUrl) {
            try {
                alternativeUrl = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["SPAlternativeUrls"].tryGetAlternativeUrl(decodeURI(resourcePath.value));
            }
            catch (error) { /* no op */ }
        }
        if (!alternativeUrl) {
            if (resourcePath.authority) {
                var relativePath = resourcePath.path;
                alternativeUrl =
                    _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["SPAlternativeUrls"].tryGetAlternativeUrl(relativePath) ||
                        _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["SPAlternativeUrls"].tryGetAlternativeUrl(encodeURI(relativePath));
                if (!alternativeUrl) {
                    try {
                        alternativeUrl = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["SPAlternativeUrls"].tryGetAlternativeUrl(decodeURI(relativePath));
                    }
                    catch (error) { /* no op */ }
                }
            }
        }
        if (alternativeUrl &&
            !isNaN(width) &&
            _ThumbnailUrlGenerator__WEBPACK_IMPORTED_MODULE_4__["default"].isFileTypeSupported(_extensionHelper_ExtensionHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getExtension1(resourcePath))) {
            var uri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["Uri"](alternativeUrl);
            // Map width to the nearest resolution breakpoint, if no height requested
            if (isNaN(height)) {
                width = PreviewUtility.normalizeWidth(width);
            }
            uri.setQueryParameter('width', Math.round(width).toString());
            if (!isNaN(height)) {
                uri.setQueryParameter('height', PreviewUtility.normalizeHeight(height).toString());
            }
            alternativeUrl = uri.toString();
        }
        return alternativeUrl;
    };
    /**
     * Normalizes width based on device pixel ration and supported width breakpoints
     */
    PreviewUtility.normalizeWidth = function (width) {
        return PreviewUtility._getWidthByMeTACache(PreviewUtility.scaleByPixelRatio(width));
    };
    /**
     * Normalizes width based on device pixel ration and supported width breakpoints
     */
    PreviewUtility.normalizeHeight = function (height) {
        return PreviewUtility.scaleByPixelRatio(height);
    };
    PreviewUtility.normalizeWidthToResolution = function (width) {
        return PreviewUtility._widthToResolution(PreviewUtility.scaleByPixelRatio(width));
    };
    PreviewUtility.isImage = function (ext) {
        // make quick lookup table to check if a file type is an image
        if (!PreviewUtility._imageExtensions) {
            PreviewUtility._imageExtensions = {};
            PreviewUtility._createLookupEntries(_SPConstants__WEBPACK_IMPORTED_MODULE_5__["spConstants"].imageExtensions, PreviewUtility._imageExtensions);
        }
        return !!ext && !!PreviewUtility._imageExtensions[ext.toLowerCase()];
    };
    PreviewUtility.isVideo = function (ext) {
        // make quick lookup table to check if a file type is a video
        if (!PreviewUtility._videoExtensions) {
            PreviewUtility._videoExtensions = {};
            PreviewUtility._createLookupEntries(_SPConstants__WEBPACK_IMPORTED_MODULE_5__["spConstants"].videoExtensions, PreviewUtility._videoExtensions);
        }
        return !!ext && !!PreviewUtility._videoExtensions[ext.toLowerCase()];
    };
    /**
     * Returns default image url if path is pointing to it
     * According to width, it will use different sets of images
     * Note: width parameter is scaled window.devicePixelRatio times
     */
    PreviewUtility.getDefaultImage = function (resourcePath, width) {
        if (!resourcePath) {
            return undefined;
        }
        if (PreviewUtility.defaultImageUrlMap.hasOwnProperty(resourcePath.path)) {
            width = width || _performance_DomMeasurementCache__WEBPACK_IMPORTED_MODULE_6__["default"].viewportWidth;
            if (PreviewUtility.scaleByPixelRatio(width) <= PreviewUtility.widthForSmallImage) {
                return PreviewUtility.defaultSmallImageUrlMap[resourcePath.path];
            }
            else {
                return PreviewUtility.defaultImageUrlMap[resourcePath.path];
            }
        }
        else {
            var serverRelativePath = resourcePath.path;
            if (resourcePath.path) {
                serverRelativePath = serverRelativePath.toUpperCase();
                var indexOfLayouts = serverRelativePath.indexOf('/_LAYOUTS/IMAGES/');
                if (indexOfLayouts > -1) {
                    serverRelativePath = serverRelativePath.substr(indexOfLayouts);
                    if (PreviewUtility.defaultImageUrlMap.hasOwnProperty(serverRelativePath)) {
                        return PreviewUtility.defaultImageUrlMap[serverRelativePath];
                    }
                }
            }
        }
        return undefined;
    };
    /**
     * Returns default image url if path is pointing to it
     * @deprecated Will be removed after all KillSwitches (https://aka.ms/AA47fv3) graduated and no consumers.
     * Please use getDefaultImage1 instead.
     * According to width, it will use different sets of images
     * Note: width parameter is scaled window.devicePixelRatio times
     */
    PreviewUtility.getDefaultImageLegacy = function (path, width) {
        if (!useStringForGetDefaultImageKillSwitch.isActivated) {
            return !path ? undefined : this.getDefaultImage(new _SPResourcePath__WEBPACK_IMPORTED_MODULE_7__["SPResourcePath"](path), width);
        }
        else {
            if (!path) {
                return undefined;
            }
            if (PreviewUtility.defaultImageUrlMap.hasOwnProperty(path)) {
                width = width || _performance_DomMeasurementCache__WEBPACK_IMPORTED_MODULE_6__["default"].viewportWidth;
                if (PreviewUtility.scaleByPixelRatio(width) <= PreviewUtility.widthForSmallImage) {
                    return PreviewUtility.defaultSmallImageUrlMap[path];
                }
                else {
                    return PreviewUtility.defaultImageUrlMap[path];
                }
            }
            else {
                var serverRelativePath = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["Uri"](path).getPath();
                if (serverRelativePath) {
                    serverRelativePath = serverRelativePath.toUpperCase();
                    var indexOfLayouts = serverRelativePath.indexOf('/_LAYOUTS/IMAGES/');
                    if (indexOfLayouts > -1) {
                        serverRelativePath = serverRelativePath.substr(indexOfLayouts);
                        if (PreviewUtility.defaultImageUrlMap.hasOwnProperty(serverRelativePath)) {
                            return PreviewUtility.defaultImageUrlMap[serverRelativePath];
                        }
                    }
                }
            }
            return undefined;
        }
    };
    /**
     * Get default image based on the index for Hero web part
     * Note: width parameter is scaled window.devicePixelRatio times
     */
    PreviewUtility.getDefaultImageById = function (id, width) {
        var small = width !== undefined &&
            PreviewUtility.scaleByPixelRatio(width) <= PreviewUtility.widthForSmallImage;
        switch (id) {
            case 0:
                return small ? DEFAULT_IMAGE1_JPG_SM : DEFAULT_IMAGE1_JPG;
            case 1:
                return small ? DEFAULT_IMAGE2_JPG_SM : DEFAULT_IMAGE2_JPG;
            case 2:
                return small ? DEFAULT_IMAGE3_JPG_SM : DEFAULT_IMAGE3_JPG;
            case 3:
                return small ? DEFAULT_IMAGE4_JPG_SM : DEFAULT_IMAGE4_JPG;
            case 4:
                return small ? DEFAULT_IMAGE5_JPG_SM : DEFAULT_IMAGE5_JPG;
            case 5:
                return small ? DEFAULT_PORTFOLIO1_PNG_SM : DEFAULT_PORTFOLIO1_PNG;
            case 6:
                return small ? DEFAULT_PORTFOLIO2_PNG_SM : DEFAULT_PORTFOLIO2_PNG;
            case 7:
                return small ? DEFAULT_PORTFOLIO3_PNG_SM : DEFAULT_PORTFOLIO3_PNG;
            default:
                return undefined;
        }
    };
    /**
     * Get stock images for the news carousel web part
     * @param id index for the image to get
     * @param width pixel width of the web part
     */
    PreviewUtility.getDefaultNewsCarouselImageById = function (id, width) {
        var small = width !== undefined &&
            PreviewUtility.scaleByPixelRatio(width) <= PreviewUtility.widthForSmallImage;
        switch (id) {
            case 0:
                return small ? DEFAULT_NEWS_CAROUSEL1_SM : DEFAULT_NEWS_CAROUSEL1;
            case 1:
                return small ? DEFAULT_NEWS_CAROUSEL2_SM : DEFAULT_NEWS_CAROUSEL2;
            case 2:
                return small ? DEFAULT_NEWS_CAROUSEL3_SM : DEFAULT_NEWS_CAROUSEL3;
            default:
                return undefined;
        }
    };
    PreviewUtility.scaleByPixelRatio = function (width) {
        if (width && window.devicePixelRatio && !isNaN(window.devicePixelRatio)) {
            return Math.round(width * window.devicePixelRatio);
        }
        else {
            return width;
        }
    };
    /**
     * Generate VROOM based thumbnail URL
     * @param vroomItemUrl - VROOM URL representing drive item
     * @param width - Width of the thumbnail
     * @param height - Height of the thumbnail
     * @param resolution - Alternative to widht/height
     */
    PreviewUtility.getVROOMThumbnailUrl = function (vroomItemUrl, width, height, resolution) {
        // TODO: VSO#683066 Allow specifying only width or height when generating a scaled thumbnail
        var largeDummyDimention = 99999;
        var normalizedDimension = this.normalizeDimension(width, height, resolution);
        var finalWidth;
        var finalHeight;
        if (vroomItemUrl) {
            if (normalizedDimension.width || normalizedDimension.height) {
                finalWidth = normalizedDimension.width || largeDummyDimention;
                finalHeight = normalizedDimension.height || largeDummyDimention;
            }
            else {
                finalWidth = PreviewUtility.smallestBreakPointWidth;
                finalHeight = largeDummyDimention;
            }
            if (!VROOM_CLIENTTYPE_KS.isActivated()) {
                if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_10__["_SPFlight"].isEnabled(1737 /* WEXCacheThumbnails */)) {
                    // tslint:disable-next-line: max-line-length
                    return vroomItemUrl + "/thumbnails/0/c" + finalWidth + "x" + finalHeight + "/content?preferNoRedirect=true&" + PreviewUtility.PREFER + "=" + PreviewUtility.EXTEND_CACHE_MAXAGE + "&" + PreviewUtility.CLIENT_TYPE + "=" + PreviewUtility.MODERN_WEB_PART;
                }
                // tslint:disable-next-line: max-line-length
                return vroomItemUrl + "/thumbnails/0/c" + finalWidth + "x" + finalHeight + "/content?preferNoRedirect=true&" + PreviewUtility.CLIENT_TYPE + "=" + PreviewUtility.MODERN_WEB_PART;
            }
            return vroomItemUrl + "/thumbnails/0/c" + finalWidth + "x" + finalHeight + "/content?preferNoRedirect=true";
        }
        return undefined;
    };
    /**
     * Generates VROOM Item URL for given resource.
     * @param siteId - SiteId of the resource, required if spResourcePath is not provided
     * @param webId - WebId of the resource, required if spResourcePath is not provided
     * @param listId - listId of the resource, required if spResourcePath is not provided
     * @param uniqueId - uniqueId of the resource, required if spResourcePath is not provided
     * @param spHostBaseUrl - Base URL to the SP Host
     * @param domainName - Domain name of the SP Host, required if spResourcePath is not provided
     * @param spResourcePath - Path to the resource. used when Guids are not available.
     * @param callerId - Identification of the caller. This will be used for telemetry purpose only.
     */
    PreviewUtility.getVROOMItemUrl = function (siteId, webId, listId, uniqueId, spHostBaseUrl, domainName, spResourcePath, callerId) {
        var vroomItemUrl;
        if (spHostBaseUrl && domainName && siteId && webId && listId && uniqueId) {
            vroomItemUrl = VROOM_API_IDS_TEMPLATE.replace('{.spHost}', spHostBaseUrl);
            vroomItemUrl = vroomItemUrl.replace('{DomainName}', domainName);
            vroomItemUrl = vroomItemUrl.replace('{SPSite.Id}', siteId);
            vroomItemUrl = vroomItemUrl.replace('{SPWeb.Id}', webId);
            listId = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["trimEnd"](_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["trimStart"](listId, '{'), '}');
            vroomItemUrl = vroomItemUrl.replace('{SPList.Id}', listId);
            uniqueId = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["trimEnd"](_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["trimStart"](uniqueId, '{'), '}');
            vroomItemUrl = vroomItemUrl.replace('{SPListItem.UniqueId}', uniqueId);
        }
        else if (spHostBaseUrl && domainName && siteId && webId && uniqueId) {
            vroomItemUrl = VROOM_API_3_IDS_TEMPLATE.replace('{.spHost}', spHostBaseUrl);
            vroomItemUrl = vroomItemUrl.replace('{DomainName}', domainName);
            vroomItemUrl = vroomItemUrl.replace('{SPSite.Id}', siteId);
            vroomItemUrl = vroomItemUrl.replace('{SPWeb.Id}', webId);
            uniqueId = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["trimEnd"](_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["trimStart"](uniqueId, '{'), '}');
            vroomItemUrl = vroomItemUrl.replace('{SPListItem.UniqueId}', uniqueId);
        }
        else if (spHostBaseUrl && spResourcePath) {
            // TODO: Replace with shares: template but caution is not supported for .aspx Site Page
            if (spResourcePath.indexOf('?') > -1) {
                // Collect data for analysis
                var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"]('ThumbnailRequestWithQuery');
                qosMonitor.writeSuccess({
                    service: callerId || 'Unknown',
                    source: spResourcePath
                });
                spResourcePath = spResourcePath.split('?')[0];
            }
            if (spResourcePath.indexOf('#') > -1) {
                // Collect data for analysis
                var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"]('ThumbnailRequestWithHash');
                qosMonitor.writeSuccess({
                    service: callerId || 'Unknown',
                    source: spResourcePath
                });
            }
            vroomItemUrl = VROOM_API_URL_TEMPLATE.replace('{.spHost}', spHostBaseUrl);
            vroomItemUrl = vroomItemUrl.replace('{.resourceUrl}', Object(_urlUtilities_toRelativeUrl__WEBPACK_IMPORTED_MODULE_8__["toRelativeUrl"])(spResourcePath));
        }
        return vroomItemUrl;
    };
    /**
     * Update VROOM custom thumbnail width after normalizing given width by devicePixelRatio and MeTA cache size
     * @param thumbnailUrl - Original VROOM thumbnail url
     * @param newWidth - new raw width to be updated
     */
    PreviewUtility.updateVROOMCustomThumbnailSize = function (thumbnailUrl, newWidth) {
        if (!thumbnailUrl || isNaN(newWidth) || newWidth <= 0) {
            return thumbnailUrl;
        }
        var lovercaseUrl = thumbnailUrl.toLowerCase();
        var index = lovercaseUrl.indexOf(THUMBNAIL_SIZE_PREFIX);
        if (index < 0) {
            return thumbnailUrl;
        }
        var endIndex = thumbnailUrl.indexOf('x', index + THUMBNAIL_SIZE_PREFIX.length);
        if (endIndex <= index) {
            return thumbnailUrl;
        }
        var original = thumbnailUrl.substr(index, endIndex - index);
        return thumbnailUrl.replace(original, "" + THUMBNAIL_SIZE_PREFIX + this.normalizeWidth(newWidth));
    };
    /**
     * Normalize requested width and height to closest breakpoint respecting device pixel ratio
     * When width and height both dimension are specified, it is not mapped to break point
     * Such scenarios URL performance might be slow compared to request by width or height
     * @param width - Requested width of the thumbnail
     * @param height  - Requested height of the thumbnail
     * @param resolution - Alternative legacy docviz dimension
     */
    PreviewUtility.normalizeDimension = function (width, height, resolution) {
        if (!height && width) {
            width = PreviewUtility.normalizeWidth(width);
        }
        else if (height && !width) {
            height = PreviewUtility.normalizeWidth(height);
        }
        else if (width && height) {
            // Since client has requested specific aspect ratio, we will not map to the breakpoint width
            width = PreviewUtility.scaleByPixelRatio(width);
            height = PreviewUtility.scaleByPixelRatio(height);
        }
        else if (resolution !== undefined) {
            width = this._getWidthByResolution(resolution);
        }
        else {
            // Caller did not specifiy any dimension, will default to smallest breakpoint
            width = PreviewUtility.smallestBreakPointWidth;
        }
        return { width: width, height: height };
    };
    /**
     * Maps given resolution to the max width
     */
    PreviewUtility._getWidthByResolution = function (resolution) {
        if (isNaN(resolution)) {
            return 300;
        }
        var width = 300;
        switch (resolution) {
            case 0:
                width = 300;
                break;
            case 1:
                width = 480;
                break;
            case 2:
                width = 750;
                break;
            case 3:
                width = 1024;
                break;
            case 4:
                width = 1600;
                break;
            case 5:
            case 6:
                width = 2560;
                break;
        }
        return width;
    };
    PreviewUtility._widthToResolution = function (width) {
        if (isNaN(width)) {
            // No resolution will be the same as 300px
            return undefined;
        }
        var resolution = 0;
        if (width <= 300) {
            resolution = 0;
        }
        else if (width <= 480) {
            resolution = 1;
        }
        else if (width <= 750) {
            resolution = 2;
        }
        else if (width <= 1024) {
            resolution = 3;
        }
        else if (width <= 1600) {
            resolution = 4;
        }
        else {
            resolution = 5;
        }
        return resolution;
    };
    PreviewUtility._createLookupEntries = function (extensions, lookup) {
        for (var i = 0; i < extensions.length; i++) {
            lookup[extensions[i]] = true;
        }
    };
    /**
     * Convert requested width to nearest breakpoint supported by MeTA cache.
     * @param width - Requested width
     */
    PreviewUtility._getWidthByMeTACache = function (width) {
        if (isNaN(width)) {
            return PreviewUtility.smallestBreakPointWidth;
        }
        if (width <= PreviewUtility.smallestBreakPointWidth) {
            return PreviewUtility.smallestBreakPointWidth;
        }
        else if (width <= 960) {
            return 960;
        }
        else if (width <= 1600) {
            return 1600;
        }
        else {
            return 2560;
        }
    };
    PreviewUtility.CLIENT_TYPE = 'clientType';
    PreviewUtility.MODERN_WEB_PART = 'modernWebPart';
    PreviewUtility.PREFER = 'prefer';
    PreviewUtility.EXTEND_CACHE_MAXAGE = 'extendCacheMaxAge';
    // VSO # 372188: Office documents disabled for oauth authentication for missing support from Media service
    PreviewUtility.mediaServiceProofTokenSupportedMap = new Set([
        // officeconversionrasterizer
        'doc',
        'docx',
        'ppt',
        'pptx',
        'pptm',
        'potx',
        'potm',
        'pot',
        'ppsx',
        'ppsxm',
        'pps',
        'odt',
        'odp'
    ]);
    /**
     * List of file types supported by Media TA service for thumbnail
     */
    PreviewUtility.mediaServiceSupportedMap = new Set([
        // officeconversionrasterizer
        // VSO # 372188: Office documents disabled due to missing oauth authentication support from Media service
        // 'doc',
        // 'docx',
        // 'xlsx',
        // 'xlsm',
        // 'xls',
        // 'ppt',
        // 'pptx',
        // 'pptm',
        // 'potx',
        // 'potm',
        // 'pot', //
        // 'ppsx',
        // 'ppsxm',
        // 'pps', //
        // 'odt', //
        // 'ods', //
        // 'odp', //
        'rtf',
        'csv',
        // openxmlrasterizer
        'pano',
        'fppx',
        'hcp',
        // email
        'eml',
        'msg',
        // imagemagickrasterizer
        'ai',
        'cur',
        'epdf',
        'epi',
        'eps',
        'epsf',
        'epsi',
        'ico',
        'icon',
        'log',
        'mat',
        'pdf',
        'pdfa',
        'pict',
        'ps',
        'psb',
        'psd',
        'svg',
        'svgz',
        'txt',
        'xbm',
        'xcf',
        'xpm',
        // video rasterizer
        'mts',
        'm2ts',
        'mpg',
        'mpeg',
        'mp4',
        'mov',
        'wmv',
        'avi',
        'asf',
        'm4v',
        '3gp',
        '3g2',
        '3gp2',
        '3gpp',
        'm1v',
        'm2v',
        'ts',
        'mp4v',
        'ogg',
        'webm',
        'movie',
        // thumbnailinterop
        'bmp',
        'png',
        // ico exists under imagemagickrasterizer above
        'jpeg',
        'jpg',
        'jfif',
        'tiff',
        'tif',
        // 'gif', // excluded to support animated gifs
        'wmp',
        'arw',
        'cr2',
        'erf',
        'mef',
        'mrw',
        'nef',
        'orf',
        'nrw',
        'pef',
        'raw',
        'rw2',
        'rw1',
        'sr2',
        // 3d files
        'cool',
        'fbx',
        'obj',
        'ply',
        'stl',
        '3mf',
        // dicom rasterizer
        'dcm',
        'dcm30',
        'dic',
        'dicm',
        'dicom'
    ]);
    // https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support
    PreviewUtility._browserViewableImageExtensions = [
        'bmp',
        'jpeg',
        'jpg',
        'png',
        'svg',
        'tif',
        'tiff'
    ];
    PreviewUtility._onPremImageMap = new Set(PreviewUtility._browserViewableImageExtensions.concat('gif'));
    PreviewUtility._getPreviewSupportedMap = new Set([
        '3gp',
        '3g2',
        '3gp2',
        'asf',
        'ai',
        'aspx',
        'avi',
        'docm',
        'docx',
        'dotx',
        'dotm',
        'dv',
        'emf',
        'eps',
        // 'gif', // excluded to support animated gifs
        'ismv',
        'm2v',
        'm2ts',
        'mov',
        'mod',
        'mp4',
        'mpeg',
        'mpg',
        'mts',
        'pdf',
        'pptm',
        'pptx',
        'potm',
        'potx',
        'ppsm',
        'ppsx',
        'psd',
        'ts',
        'vob',
        'wmf',
        'wmv',
        'xesc',
        'xlsm',
        'xlsx'
    ].concat(PreviewUtility._browserViewableImageExtensions));
    /* tslint:disable:max-line-length */
    PreviewUtility.defaultImageUrlMap = {
        '/_LAYOUTS/IMAGES/REPORTSITEDEFAULTIMAGE1.PNG': DEFAULT_IMAGE1_PNG,
        '/_LAYOUTS/IMAGES/REPORTSITEDEFAULTIMAGE2.PNG': DEFAULT_IMAGE2_PNG,
        '/_LAYOUTS/IMAGES/REPORTSITEDEFAULTIMAGE3.PNG': DEFAULT_IMAGE3_PNG,
        '/_LAYOUTS/IMAGES/REPORTSITEDEFAULTIMAGE4.PNG': DEFAULT_IMAGE4_PNG,
        '/_LAYOUTS/IMAGES/REPORTSITEDEFAULTIMAGE5.PNG': DEFAULT_IMAGE5_PNG,
        '/_LAYOUTS/IMAGES/PORTFOLIOSITEDEFAULTIMAGE1.PNG': DEFAULT_PORTFOLIO1_PNG,
        '/_LAYOUTS/IMAGES/PORTFOLIOSITEDEFAULTIMAGE2.PNG': DEFAULT_PORTFOLIO2_PNG,
        '/_LAYOUTS/IMAGES/PORTFOLIOSITEDEFAULTIMAGE3.PNG': DEFAULT_PORTFOLIO3_PNG,
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYCHAIRS.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryChairs.png */ "JIqX"),
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYCUSHIONS.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryCushions.png */ "L9FC"),
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYHANDRAIL.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryHandrail.png */ "1OwT"),
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYLAMPS.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryLamps.png */ "j+LK"),
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYLOUNGE.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryLounge.png */ "3adW"),
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYPENDANT.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryPendant.png */ "Egrv"),
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYWALL.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryWall.png */ "QZvf"),
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYWOOD.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryWood.png */ "98T/"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATETITLEIMAGE.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateTitleImage.jpg */ "swXh"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATEIMAGE1.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage1.jpg */ "Eq8N"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATEIMAGE2.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage2.jpg */ "qaT1"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATEIMAGE7.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage7.jpg */ "Hp/x"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATEIMAGE8.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage8.jpg */ "olQP"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATEIMAGE9.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage9.jpg */ "pvS+"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATEIMAGE10.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage10.jpg */ "qYVA"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATEIMAGE11.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage11.jpg */ "keR4"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATEIMAGETILE.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImageTile.jpg */ "nmwW"),
        '/_LAYOUTS/IMAGES/SLEEKTEMPLATEIMAGETILE.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/sleekTemplateImageTile.jpg */ "PWeR")
    };
    PreviewUtility.defaultSmallImageUrlMap = {
        '/_LAYOUTS/IMAGES/REPORTSITEDEFAULTIMAGE1.PNG': DEFAULT_IMAGE1_PNG_SM,
        '/_LAYOUTS/IMAGES/REPORTSITEDEFAULTIMAGE2.PNG': DEFAULT_IMAGE2_PNG_SM,
        '/_LAYOUTS/IMAGES/REPORTSITEDEFAULTIMAGE3.PNG': DEFAULT_IMAGE3_PNG_SM,
        '/_LAYOUTS/IMAGES/REPORTSITEDEFAULTIMAGE4.PNG': DEFAULT_IMAGE4_PNG_SM,
        '/_LAYOUTS/IMAGES/REPORTSITEDEFAULTIMAGE5.PNG': DEFAULT_IMAGE5_PNG_SM,
        '/_LAYOUTS/IMAGES/PORTFOLIOSITEDEFAULTIMAGE1.PNG': DEFAULT_PORTFOLIO1_PNG_SM,
        '/_LAYOUTS/IMAGES/PORTFOLIOSITEDEFAULTIMAGE2.PNG': DEFAULT_PORTFOLIO2_PNG_SM,
        '/_LAYOUTS/IMAGES/PORTFOLIOSITEDEFAULTIMAGE3.PNG': DEFAULT_PORTFOLIO3_PNG_SM,
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYCHAIRS.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryChairsSm.png */ "o5ir"),
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYCUSHIONS.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryCushionsSm.png */ "a9vk"),
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYHANDRAIL.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryHandrailSm.png */ "nKow"),
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYLAMPS.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryLampsSm.png */ "VibQ"),
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYLOUNGE.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryLoungeSm.png */ "R+rM"),
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYPENDANT.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryPendantSm.png */ "lsgA"),
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYWALL.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryWallSm.png */ "MGNV"),
        '/_LAYOUTS/IMAGES/PORTFOLIOIMAGEGALLERYWOOD.PNG': __webpack_require__(/*! ../assets/portfolioImageGalleryWoodSm.png */ "TUkU"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATEIMAGE1.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage1.jpg */ "Eq8N"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATEIMAGE2.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage2.jpg */ "qaT1"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATEIMAGE7.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage7.jpg */ "Hp/x"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATEIMAGE8.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage8.jpg */ "olQP"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATEIMAGE9.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage9.jpg */ "pvS+"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATEIMAGE10.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage10.jpg */ "qYVA"),
        '/_LAYOUTS/IMAGES/VISUALTEMPLATEIMAGE11.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/visualTemplateImage11.jpg */ "keR4"),
        '/_LAYOUTS/IMAGES/SLEEKTEMPLATEIMAGETILE.JPG': __webpack_require__(/*! @ms/odsp-media/dist/media/images/pageTemplates/sleekTemplateImageTile.jpg */ "PWeR")
    };
    /* tslint:enable:max-line-length */
    PreviewUtility.widthForSmallImage = 450;
    return PreviewUtility;
}());
/* harmony default export */ __webpack_exports__["default"] = (PreviewUtility);


/***/ }),

/***/ "ytfe":
/*!******************************!*\
  !*** external "@ms/sp-a11y" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ytfe__;

/***/ }),

/***/ "z7It":
/*!***************************!*\
  !*** ./lib/UrlUtility.js ***!
  \***************************/
/*! exports provided: UrlUtility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UrlUtility", function() { return UrlUtility; });
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-resource-path/lib/SPResourcePath */ "SzMl");
/* harmony import */ var _ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/KillSwitches */ "+ORw");
// @copyright (c) Microsoft Corporation. All rights reserved.



var UrlUtility = /** @class */ (function () {
    function UrlUtility() {
    }
    Object.defineProperty(UrlUtility, "_getProtocolRegExp", {
        get: function () {
            if (!UrlUtility._protocolRegExp) {
                UrlUtility._protocolRegExp = /^http:\/\//i;
            }
            return UrlUtility._protocolRegExp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UrlUtility, "_getSecureProtocolRegExp", {
        get: function () {
            if (!UrlUtility._secureProtocolRegExp) {
                UrlUtility._secureProtocolRegExp = /^https:\/\//i;
            }
            return UrlUtility._secureProtocolRegExp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UrlUtility, "_getAnyProtocolRegExp", {
        get: function () {
            if (!UrlUtility._anyProtocolRegExp) {
                UrlUtility._anyProtocolRegExp = /^http:\/\/|^https:\/\//i;
            }
            return UrlUtility._anyProtocolRegExp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UrlUtility, "_getYoutubePathRegExp", {
        get: function () {
            if (!UrlUtility._youtubePathRegExp) {
                UrlUtility._youtubePathRegExp = /^\/watch\?v\=.*/i;
            }
            return UrlUtility._youtubePathRegExp;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Utility method to ensure the schema of the URL is the wanted one.
     * If the provided url does not have a schema, the default schema will be added to it.
     *
     * @param url The URL to enure its schema is there and valid.
     * @param validSchemas The allowed URL schemas. If nothing provided, all schemas will be considered as correct.
     * @param defaultSchema Set to this schema if no schema found in URL, default value is https.
     *
     * @returns the URL with the valid schema or returns undefined if the given URL has invalid schema.
     */
    UrlUtility.ensureSchema = function (url, validSchemas, defaultSchema) {
        if (defaultSchema === void 0) { defaultSchema = 'https'; }
        if (!url || !url.trim()) {
            return '';
        }
        var uri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["Uri"](url);
        var scheme = uri.getScheme();
        if (!scheme) {
            if (defaultSchema.toLowerCase() === 'mailto') {
                return "mailto:" + url;
            }
            return defaultSchema + "://" + url;
        }
        else {
            if (validSchemas
                && !validSchemas.some(function (validSchema) { return validSchema.toLocaleLowerCase() === scheme.toLocaleLowerCase(); })) {
                return undefined;
            }
            return url;
        }
    };
    /**
     * @returns
     * whether the URL starts with https at online SP.
     * whether the URL starts with http|https at onprem SP.
     */
    UrlUtility.isValidURL = function (embedCode) {
        if (!embedCode) {
            return false;
        }
        if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_2__["KillSwitches"].urlUtilityRefactor.isActivated()) {
            var _protocolRegExp = /^http:\/\/|^https:\/\//i;
            return _protocolRegExp.test(embedCode);
        }
        else {
            var authority = new _ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_1__["SPResourcePath"](embedCode).authority;
            return UrlUtility._getAnyProtocolRegExp.test(authority);
        }
    };
    /**
     * @returns whether URL is a YouTube video URL
     * It is either a *youtu.be* URL or a *www.youtube.com/watch?v=* URL
     */
    UrlUtility.isYoutubeURL = function (embedCode) {
        if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_2__["KillSwitches"].urlUtilityRefactor.isActivated()) {
            var youtubeURLRegExp = _common_KillSwitches__WEBPACK_IMPORTED_MODULE_2__["KillSwitches"].newYoutubeUrlRegexKS.isActivated()
                ? /^https:\/\/(www.youtube.com\/.*|youtu.be\/.*)/i
                : /^https:\/\/(www.youtube.com\/watch\?v\=.*|youtu.be\/.*)/i;
            return youtubeURLRegExp.test(embedCode);
        }
        else {
            var resourcePath = new _ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_1__["SPResourcePath"](embedCode);
            if (!UrlUtility._getSecureProtocolRegExp.test(resourcePath.authority)) {
                return false;
            }
            var domain = resourcePath.domain.toLowerCase();
            if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_2__["KillSwitches"].newYoutubeUrlRegexKS.isActivated()) {
                return !!resourcePath.path &&
                    (domain === UrlUtility._youtubeUrl ||
                        domain === UrlUtility._youtuUrl);
            }
            else {
                return domain === UrlUtility._youtuUrl ||
                    (domain === UrlUtility._youtubeUrl &&
                        UrlUtility._getYoutubePathRegExp.test(resourcePath.path));
            }
        }
    };
    /**
     * Currently, they must be https URLs. If approvedDomains
     * is empty, then by default the embedCode is valid.
     *
     * This method is only used to validate the input URL or src URL of an iframe.
     * It will not validate the entire iframe code.
     *
     * @param embedCode - user's URL needing validation.
     * @param approvedDomains - an array of the accepted domains in regex string format
     * @returns whether embedCode is one of approvedDomains.
     */
    UrlUtility.isApprovedURL = function (embedCode, approvedDomains) {
        if (approvedDomains.length === 0) {
            /**
             * If not expecting specific domains, return true. Non-http validation
             * will occur in conjunction with this function in other parts of the code.
             */
            return true;
        }
        for (var _i = 0, approvedDomains_1 = approvedDomains; _i < approvedDomains_1.length; _i++) {
            var domain = approvedDomains_1[_i];
            var _protocolRegExp = new RegExp('^https://' + domain, 'i');
            if (_protocolRegExp.test(embedCode)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @returns whether the URL begins with http.
     */
    UrlUtility.startsWithHttp = function (embedCode) {
        if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_2__["KillSwitches"].urlUtilityRefactor.isActivated()) {
            var _protocolRegExp = /^http:\/\//i;
            return _protocolRegExp.test(embedCode);
        }
        else {
            var resourcePath = new _ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_1__["SPResourcePath"](embedCode);
            return UrlUtility._getProtocolRegExp.test(resourcePath.authority);
        }
    };
    /**
     * @returns the hostname from a URL input.
     */
    UrlUtility.getHostnameFromUrl = function (url) {
        if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_2__["KillSwitches"].urlUtilityRefactor.isActivated()) {
            var hostname = '';
            if (url) {
                var regExpResult = /^\s*(http:\/\/|\/\/|https:\/\/)[^\/]+/i.exec(url);
                if (regExpResult && regExpResult.length) {
                    hostname = regExpResult[0].replace(/^\s*(http:\/\/|\/\/|https:\/\/)/i, '');
                }
            }
            return hostname;
        }
        else {
            var resourcePath = new _ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_1__["SPResourcePath"](url);
            var authority = resourcePath.authority.trim();
            if (/^\/\//i.test(authority) ||
                UrlUtility._getProtocolRegExp.test(authority) ||
                UrlUtility._getSecureProtocolRegExp.test(authority)) {
                return resourcePath.domain;
            }
            return '';
        }
    };
    /**
     * Generate the absolute URL
     */
    UrlUtility.absolutizeUrl = function (url, noDecode) {
        if (noDecode === void 0) { noDecode = false; }
        var a = document.createElement('a');
        a.href = url;
        return noDecode ? a.href : decodeURIComponent(a.href);
    };
    /**
     * Generate the relative URL
     */
    UrlUtility.relativizeUrl = function (url) {
        var a = document.createElement('a');
        a.href = url;
        if (a.hostname !== location.hostname) {
            return a.href;
        }
        var rel = a.pathname +
            a.search +
            a.hash;
        // HACK: IE/Opera doesn't add the leading slash
        return rel.charAt(0) === '/' ? rel : '/' + rel;
    };
    UrlUtility._youtubeUrl = 'www.youtube.com';
    UrlUtility._youtuUrl = 'youtu.be';
    return UrlUtility;
}());



/***/ }),

/***/ "zcWH":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/dialog/DialogUtility.css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, "[dir=ltr] .dialogSpinner{left:100px}[dir=rtl] .dialogSpinner{right:100px}.progressIcon{position:absolute;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);padding-bottom:15px;font-family:-webkit-pictograph;text-align:center;background-color:\"[theme:white, default: #ffffff]\"}[dir=ltr] .progressIcon{left:50%}[dir=rtl] .progressIcon{right:50%}.progressIcon .ms-Icon{display:block;font-size:26px;margin:8px 0;color:\"[theme:themePrimary, default: #0078d4]\"}.progressIcon [data-icon-name=Sync]{-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0)}to{-webkit-transform:rotate(1turn)}}@keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.dialogMessage-label{font-size:21px!important;color:\"[theme:themePrimary, default: #0078d4]\"!important;text-align:center!important}.ms-dialogMainOverride .ms-Dialog-title{color:\"[theme:themePrimary, default: #0078d4]\"}", ""]);



/***/ })

/******/ })}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));;


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

/***/ "@ms/i18n-utilities":
/*!*************************************!*\
  !*** external "@ms/i18n-utilities" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_i18n_utilities__;

/***/ }),

/***/ "@ms/odsp-utilities-bundle":
/*!********************************************!*\
  !*** external "@ms/odsp-utilities-bundle" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_odsp_utilities_bundle__;

/***/ }),

/***/ "@ms/sp-a11y":
/*!******************************!*\
  !*** external "@ms/sp-a11y" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_a11y__;

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
//# sourceMappingURL=sp-component-utilities_en-us.js.map