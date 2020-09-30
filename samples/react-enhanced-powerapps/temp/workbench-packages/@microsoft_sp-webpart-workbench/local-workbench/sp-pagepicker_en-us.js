define("e795d530-8fb6-425c-b864-b86735dbae1d_1.3.24", ["@microsoft/load-themed-styles","@microsoft/office-ui-fabric-react-bundle","@microsoft/sp-core-library","@microsoft/sp-diagnostics","@microsoft/sp-http","@microsoft/sp-lodash-subset","@microsoft/sp-page-context","@ms/i18n-utilities","@ms/odsp-utilities-bundle","@ms/sp-telemetry","@ms/uifabric-styling-bundle","react","react-dom"], function(__WEBPACK_EXTERNAL_MODULE__microsoft_load_themed_styles__, __WEBPACK_EXTERNAL_MODULE__microsoft_office_ui_fabric_react_bundle__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_core_library__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_diagnostics__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_http__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_lodash_subset__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_page_context__, __WEBPACK_EXTERNAL_MODULE__ms_i18n_utilities__, __WEBPACK_EXTERNAL_MODULE__ms_odsp_utilities_bundle__, __WEBPACK_EXTERNAL_MODULE__ms_sp_telemetry__, __WEBPACK_EXTERNAL_MODULE__ms_uifabric_styling_bundle__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./sp-pagepicker.js");
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
      "DialogTitle": "Insert link",
      "UrlTextFieldLabel": "Address",
      "UrlTextFieldAriaLabel": "Web address to link to",
      "UrlTextFieldError": "This link type is not supported.",
      "TitleTextFieldLabel": "Text to display",
      "RecentPagesLabel": "Most recent pages on this site",
      "SearchForPagesLabel": "Pages on this site that match your search",
      "RecentSpacesLabel": "Most recent spaces on this site",
      "SearchForSpacesLabel": "Spaces on this site that match your search",
      "NoResultLabel": "No items match your search",
      "TryAgainLabel": "Try a different keyword",
      "OpenLinkInNewTabLabel": "Open link in a new tab",
      "SaveButtonLabel": "Save",
      "CancelButtonLabel": "Cancel",
      "UnlinkButtonLabel": "Remove link",
      "TitleSuggestionsColumnName": "Title",
      "EditorSuggestionsColumnName": "Modified by",
      "ModifiedSuggestionsColumnName": "Modified",
      "PageContentContainsSearchText": "\"{0}\" found in page contents",
      "CurrentPage": "(current page)",
      "SearchTextFieldLabel": "Search",
      "SearchPagesTextFieldPlaceholder": "Enter keywords to search for pages on this site",
      "SearchSpacesTextFieldPlaceholder": "Enter keywords to search for spaces on this site",
      "DialogAriaDescription": "Insert a link to a page on the current site or to a page on another site.",
      "SuggestionsListAriaLabel": "Select a page from the {0} list. Press the Up and Down arrow keys to navigate through the pages. Press the Space key to select a page. When a page is selected, the page link will be used in the Link input box, and, if there is no text in the Text to display input box, the page title will be used.",
      "SaveButtonDisabledScreenReaderAlert": "The Save button is not available because an invalid web address was entered.",
      "SaveButtonEnabledScreenReaderAlert": "The Save button is available.",
      "PageIsSelectedScreenReaderAlert": "The page {0} is selected.",
      "IsSearching": "Searching...",
      "SearchResultsShowing": "Search results are displayed. Press Tab to go to the Search results list.",
      "RecentPagesShowing": "A list of recent pages is displayed. Press Tab to go to the Recent pages list."
    }
  };

  strings.default = strings;
  return strings;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sp-pagepicker.js":
/*!**************************!*\
  !*** ./sp-pagepicker.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! @ms/sp-telemetry */ "@ms/sp-telemetry"),__webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "@microsoft/office-ui-fabric-react-bundle"),__webpack_require__(/*! @microsoft/sp-lodash-subset */ "@microsoft/sp-lodash-subset"),__webpack_require__(/*! @microsoft/sp-core-library */ "@microsoft/sp-core-library"),__webpack_require__(/*! @microsoft/sp-page-context */ "@microsoft/sp-page-context"),__webpack_require__(/*! @ms/i18n-utilities */ "@ms/i18n-utilities"),__webpack_require__(/*! react */ "react"),__webpack_require__(/*! react-dom */ "react-dom"),__webpack_require__(/*! @ms/uifabric-styling-bundle */ "@ms/uifabric-styling-bundle"),__webpack_require__(/*! @microsoft/load-themed-styles */ "@microsoft/load-themed-styles"),__webpack_require__(/*! @microsoft/sp-diagnostics */ "@microsoft/sp-diagnostics"),__webpack_require__(/*! @microsoft/sp-http */ "@microsoft/sp-http"),__webpack_require__(/*! resx-strings */ "../lib/resx-strings/en-us.js"),__webpack_require__(/*! @ms/odsp-utilities-bundle */ "@ms/odsp-utilities-bundle")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(__WEBPACK_EXTERNAL_MODULE__2q6Q__, __WEBPACK_EXTERNAL_MODULE_KL1q__, __WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_X_PM__, __WEBPACK_EXTERNAL_MODULE_Ycni__, __WEBPACK_EXTERNAL_MODULE_cDcd__, __WEBPACK_EXTERNAL_MODULE_faye__, __WEBPACK_EXTERNAL_MODULE_fglE__, __WEBPACK_EXTERNAL_MODULE_jOlS__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_vlQI__, __WEBPACK_EXTERNAL_MODULE_vpy3__, __WEBPACK_EXTERNAL_MODULE_y88i__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"sp-pagepicker": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({"vendors~page-picker-component":"vendors~page-picker-component","page-picker-component":"page-picker-component"}[chunkId]||chunkId) + "_" + {"vendors~page-picker-component":"de94b10886fcc0ee733b","page-picker-component":"bfb64b9159e86e7599cf"}[chunkId] + ".js"
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
/******/ 	var jsonpArray = window["webpackJsonpe795d530_8fb6_425c_b864_b86735dbae1d_1_3_24"] = window["webpackJsonpe795d530_8fb6_425c_b864_b86735dbae1d_1_3_24"] || [];
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
/******/ 	  var regex = (typeof spScriptNamePattern !== 'undefined') ? spScriptNamePattern : new RegExp('\\/sp-pagepicker(_[a-z0-9-]+)*\\.js', 'i');
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

/***/ "+DwJ":
/*!***************************!*\
  !*** ./lib/PagePicker.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */
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


var PagePicker = /** @class */ (function () {
    function PagePicker(config) {
        this._pagePickerComponentPromise = Promise.all(/*! import() | page-picker-component */[__webpack_require__.e("vendors~page-picker-component"), __webpack_require__.e("page-picker-component")]).then(__webpack_require__.bind(null, /*! ./PagePickerComponent */ "pWhw")).then(function (pagePickerComponent) {
            return new Promise(function (resolveComponent) {
                var pagePickerElement = react__WEBPACK_IMPORTED_MODULE_0__["createElement"](pagePickerComponent.default, __assign({}, config, { ref: resolveComponent }));
                react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](pagePickerElement, document.createElement('div'));
            });
        });
    }
    PagePicker.prototype.open = function (link) {
        this._pagePickerComponentPromise.then(function (pagePickerComponent) {
            pagePickerComponent.open(link);
        });
    };
    PagePicker.prototype.close = function () {
        this._pagePickerComponentPromise.then(function (pagePickerComponent) {
            pagePickerComponent.close();
        });
    };
    return PagePicker;
}());
/* harmony default export */ __webpack_exports__["default"] = (PagePicker);


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

var KillSwitches = /** @class */ (function () {
    function KillSwitches() {
    }
    KillSwitches.isAlphaSortPageResultsActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('704ce08d-87ce-4dda-962c-f133f11de766'), '07/30/2019', 'Alpha sort search results from link data provider for in line pager picker in RTE');
    };
    KillSwitches.isTelSupportKillSwitchActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('beaf1f0c-92ac-47d0-bbca-08c36d3cc619'), '08/14/2019', 'tel link support for link tab for in line page picker in RTE');
    };
    return KillSwitches;
}());
/* harmony default export */ __webpack_exports__["default"] = (KillSwitches);


/***/ }),

/***/ "2q6Q":
/*!***********************************!*\
  !*** external "@ms/sp-telemetry" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2q6Q__;

/***/ }),

/***/ "9AK6":
/*!***********************************************************!*\
  !*** ./lib/copied/search/enums/SearchAPISortDirection.js ***!
  \***********************************************************/
/*! exports provided: SearchAPISortDirection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchAPISortDirection", function() { return SearchAPISortDirection; });
/**
 * @file SearchAPISortDirection.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */
var SearchAPISortDirection = /** @class */ (function () {
    function SearchAPISortDirection() {
    }
    SearchAPISortDirection.ascending = 0;
    SearchAPISortDirection.descending = 1;
    return SearchAPISortDirection;
}());



/***/ }),

/***/ "C6Tv":
/*!************************************************!*\
  !*** ./lib/dataProviders/ILinkDataProvider.js ***!
  \************************************************/
/*! exports provided: RECENT_PAGES_LIMIT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECENT_PAGES_LIMIT", function() { return RECENT_PAGES_LIMIT; });
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */
var RECENT_PAGES_LIMIT = 20;


/***/ }),

/***/ "H9dZ":
/*!************************************!*\
  !*** ./lib/copied/search/index.js ***!
  \************************************/
/*! exports provided: SearchAPIRequest, SearchAPISortDirection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SearchAPIRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SearchAPIRequest */ "I1PX");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchAPIRequest", function() { return _SearchAPIRequest__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _enums_SearchAPISortDirection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums/SearchAPISortDirection */ "9AK6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchAPISortDirection", function() { return _enums_SearchAPISortDirection__WEBPACK_IMPORTED_MODULE_1__["SearchAPISortDirection"]; });





/***/ }),

/***/ "I1PX":
/*!***********************************************!*\
  !*** ./lib/copied/search/SearchAPIRequest.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__);
/**
 * @file SearchAPIRequest.ts
 * @copyright (c) Microsoft Corporation.  All rights reserved.
 */





/*
* Provides a simple wrapper for the SharePoint Search REST API.
*/
var SearchAPIRequest = /** @class */ (function () {
    function SearchAPIRequest(serviceScope, isMockMode, qosPrefix) {
        if (isMockMode === void 0) { isMockMode = false; }
        if (qosPrefix === void 0) { qosPrefix = ''; }
        this._serviceScope = serviceScope;
        this._isMockMode = isMockMode;
        this._qosPrefix = qosPrefix;
    }
    SearchAPIRequest.prototype.getSearchQueryResponse = function (options) {
        var _this = this;
        // @todo: rename SearchDataProviderGetResponse monitor to SearchAPIRequest
        var _qosMonitor = this._qosPrefix
            ? new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"](this._qosPrefix + ".SearchDataProviderGetResponse")
            : new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"]('SearchDataProviderGetResponse');
        if (this._isMockMode) {
            _qosMonitor.writeSuccess();
            return Promise.resolve(this.mockResponse);
        }
        else {
            return this._getRawSearchQueryResponse(options)
                .then(function (rawResponse) {
                try {
                    var simplifiedResult = _this._simplifyResultForTemplating(rawResponse);
                    _qosMonitor.writeSuccess();
                    return Promise.resolve(simplifiedResult);
                }
                catch (er) {
                    _qosMonitor.writeUnexpectedFailure('FailedToSimplifySearchResult');
                    return Promise.reject(er);
                }
            }, function (error) {
                _qosMonitor.writeUnexpectedFailure('FailedSearchPOST');
                return Promise.reject(error);
            });
        }
    };
    SearchAPIRequest.prototype.getManagedPropertiesQueryResponse = function (options) {
        var _qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"]('ManagedPropertiesRequest');
        if (this._isMockMode) {
            _qosMonitor.writeSuccess();
            return Promise.resolve([]);
        }
        else {
            return this._getRawSearchQueryResponse(options)
                .then(function (rawResponse) {
                var refiners = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["has"])(rawResponse.PrimaryQueryResult, 'RefinementResults.Refiners')
                    ? rawResponse.PrimaryQueryResult.RefinementResults.Refiners : [];
                var entries = refiners.length > 0 ? refiners[0].Entries : [];
                var managedProperties = entries.map(function (entry) { return entry.RefinementName; });
                _qosMonitor.writeSuccess();
                return Promise.resolve(managedProperties);
            })
                .catch(function (error) {
                _qosMonitor.writeUnexpectedFailure('ManagedPropertiesRequestFailed');
                return Promise.reject(error);
            });
        }
    };
    SearchAPIRequest.prototype._getRawSearchQueryResponse = function (options) {
        var _this = this;
        // set default ClientType if one not already provided
        options.ClientType = options.ClientType || 'ModernWebPart';
        var body = '{ "request": ' + (options ? JSON.stringify(options) : '{}') + ' }';
        var headers = new Headers();
        headers.append('Accept', 'application/json;odata=nometadata');
        headers.append('Content-type', 'application/json;charset=utf-8');
        headers.append('OData-Version', '3.0');
        return new Promise(function (complete, reject) {
            _this._serviceScope.whenFinished(function () {
                var pageContext = _this._serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__["PageContext"].serviceKey);
                var spHttpClient = _this._serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].serviceKey);
                var postUrl = pageContext.web.absoluteUrl + "/_api/search/postquery";
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logVerbose(SearchAPIRequest._LogSource, "postUrl=" + postUrl);
                spHttpClient.post(postUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, {
                    body: body, headers: headers
                }).then(function (response) {
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logVerbose(SearchAPIRequest._LogSource, "response status=" + response.status.toString());
                    if (response.status >= 200 && response.status <= 299) {
                        return response.json();
                    }
                    else {
                        // Not a response within the 200 range so extract the error from the response.
                        response.json().then(function (errorBody) {
                            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logVerbose(SearchAPIRequest._LogSource, "response error=" + errorBody.error.message, 'BadSearchResponse');
                            reject(new Error(errorBody.error.message));
                        });
                    }
                }).then(function (response) {
                    complete(response);
                }).catch(function (error) {
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logVerbose(SearchAPIRequest._LogSource, "response error=" + error.message, 'UnexpectedSearchError');
                    reject(error);
                });
            });
        });
    };
    /*
    * The result format from the SharePoint Search REST API provides type information at the field
    * level that is useful for some, but makes client side templating a little cumbersome. This function
    * simplifies the result format by removing the metadata information.
    */
    SearchAPIRequest.prototype._simplifyResultForTemplating = function (searchResult) {
        var parsedData = {};
        try {
            var parsedRows = [];
            var rows = searchResult.PrimaryQueryResult.RelevantResults.Table.Rows;
            for (var r = 0; r < rows.length; r++) {
                var parsedRow = {};
                var cells = rows[r].Cells; // get the cells
                for (var c = 0; c < cells.length; c++) {
                    var cell = cells[c];
                    var cellKey = cell.Key;
                    parsedRow[cellKey] = cell.Value;
                }
                parsedRows.push(parsedRow);
            }
            parsedData.rows = parsedRows;
        }
        catch (ex) {
            parsedData.rows = []; // invalid data format or empty result
        }
        return parsedData;
    };
    SearchAPIRequest._LogSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_LogSource"].create('SearchAPIRequest');
    return SearchAPIRequest;
}());
/* harmony default export */ __webpack_exports__["default"] = (SearchAPIRequest);


/***/ }),

/***/ "KL1q":
/*!***********************************************************!*\
  !*** external "@microsoft/office-ui-fabric-react-bundle" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_KL1q__;

/***/ }),

/***/ "M7Bk":
/*!***********************************************!*\
  !*** ./lib/dataProviders/LinkDataProvider.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/i18n-utilities */ "Ycni");
/* harmony import */ var _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/KillSwitches */ "+ORw");
/* harmony import */ var _copied_search__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../copied/search */ "H9dZ");
/* harmony import */ var _ILinkDataProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ILinkDataProvider */ "C6Tv");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */







// @todo VSO #408771 Avoid to copy files from sp-component-utilities for Page Picker


var LinkDataProvider = /** @class */ (function () {
    function LinkDataProvider(serviceScope, subContentTypeId, qosPrefix) {
        this._sitePageContentTypeId = '0x0101009D1CB255DA76424F860D91F20E6C4118';
        this._pageContext = serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__["PageContext"].serviceKey);
        this._httpClient = serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].serviceKey);
        this._searchAPIRequest = new _copied_search__WEBPACK_IMPORTED_MODULE_7__["SearchAPIRequest"](serviceScope, false /* isMockMode */, qosPrefix || '');
        if (subContentTypeId) {
            this._sitePageContentTypeId += subContentTypeId;
        }
    }
    LinkDataProvider.prototype.getPageLinksByTitle = function (userInput) {
        var _this = this;
        var keyWords = userInput.trim().split(/\s+/);
        return Promise.all([
            this._getPageLinksByCAMLQuery(this._buildTitleFilter(keyWords)),
            this._getPageLinksBySearch(keyWords)
        ]).then(function (_a) {
            var camlQueryLinks = _a[0], searchLinks = _a[1];
            // Combine CAML query links and Search links
            var suggestionLinks = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["uniqBy"])(camlQueryLinks.concat(searchLinks), function (link) { return link.id && link.id.toString(); });
            // Sort page links by modified date in descending order
            return suggestionLinks.sort(_this._modifiedDateSort);
        });
    };
    LinkDataProvider.prototype.getPageTitleMatchLinks = function (userInput) {
        var _this = this;
        var keyWords = userInput.trim().split(/\s+/);
        return this._getPageLinksByCAMLQuery(this._buildTitleFilter(keyWords))
            .then(function (camlQueryLinks) {
            if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_6__["default"].isAlphaSortPageResultsActivated()) {
                return camlQueryLinks.sort(_this._modifiedDateSort);
            }
            else {
                return camlQueryLinks.sort(_this._alphaSort);
            }
        });
    };
    LinkDataProvider.prototype.getSortedRecentPageLinks = function () {
        var _this = this;
        return this.getRecentPageLinks()
            .then(function (recentLinks) {
            if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_6__["default"].isAlphaSortPageResultsActivated()) {
                return recentLinks;
            }
            else {
                return recentLinks.sort(_this._alphaSort);
            }
        });
    };
    LinkDataProvider.prototype.getRecentPageLinks = function () {
        return this._getPageLinksByCAMLQuery(this._buildRecentPageFilter());
    };
    LinkDataProvider.prototype._alphaSort = function (suggestionA, suggestionB) {
        return suggestionA.title.localeCompare(suggestionB.title);
    };
    LinkDataProvider.prototype._modifiedDateSort = function (suggestionA, suggestionB) {
        var dateNumberA = suggestionA.lastModifiedDate
            ? new Date(suggestionA.lastModifiedDate).getTime()
            : 0;
        var dateNumberB = suggestionB.lastModifiedDate
            ? new Date(suggestionB.lastModifiedDate).getTime()
            : 0;
        return dateNumberB - dateNumberA;
    };
    LinkDataProvider.prototype._getPageLinksByCAMLQuery = function (filter) {
        var _this = this;
        var monitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5__["_QosMonitor"]('PagePicker.GetPageLinksByCAMLQuery');
        var queryUrl = this._pageContext.web.absoluteUrl +
            '/_api/lists/EnsureClientRenderedSitePagesLibrary/RenderListDataAsStream';
        var body = JSON.stringify({
            parameters: {
                __metadata: { type: 'SP.RenderListDataParameters' },
                DatesInUtc: true,
                ViewXml: this._compactCAMLQuery(this._buildCAMLQuery(filter))
            }
        });
        // These headers are critical to request data with CAML.
        var headers = {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose',
            'Odata-Version': '3.0'
        };
        return this._httpClient.post(queryUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, { body: body, headers: headers })
            .then(this._checkStatus)
            .then(function (response) { return response.json(); })
            .then(function (pages) {
            monitor.writeSuccess();
            return pages.Row
                .filter(function (page) { return page.Title && page.EncodedAbsUrl; })
                .map(function (page) { return ({
                id: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(page.UniqueId),
                isSearchResult: false,
                lastEditor: page.Editor[0].title,
                lastModifiedDate: _this._getLastModifiedDateDesc(page.Modified),
                title: page.Title,
                url: page.EncodedAbsUrl
            }); });
        })
            .catch(function (error) {
            monitor.writeUnexpectedFailure('GetPageLinksByCAMLQueryFail', error);
            return [];
        });
    };
    LinkDataProvider.prototype._checkStatus = function (response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }
        else {
            // @todo #392737 add better error message for requesting query and search API
            return Promise.reject(new Error('Status Code: ' + response.status));
        }
    };
    /**
     * Compact CAML query string for less transfer payload.
     * Copied from libraries/sp-component-utilities/src/dataProviders/event/EventCAMLQueryBuilder.ts
     * @param camlQuery The CAML query string.
     */
    LinkDataProvider.prototype._compactCAMLQuery = function (camlQuery) {
        return camlQuery
            // Replace `" />` to `"/>` to reduce one space.
            .replace(/" \/>/g, '"/>')
            // Trim spaces on each line.
            .split(/(?:\r\n|\r|\n)/).map(function (line) { return line.trim(); }).join('');
    };
    /**
     * Encodes a string for use in HTML text.
     * Not recommended for attribute values or anything that might be used in a URL.
     * Copied from odsp-common/odsp-utilities/src/local/encoding/HtmlEncoding.ts
     * @param text The text to encode.
     */
    LinkDataProvider.prototype._htmlEncode = function (text) {
        var htmlCodeRegExp = /[<>&'"\\]/g;
        var codes = {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            '\'': '&#39;',
            '\\': '&#92;'
        };
        return text ? text.replace(htmlCodeRegExp, function (match) { return codes[match]; }) : '';
    };
    LinkDataProvider.prototype._buildCAMLQuery = function (filter) {
        return "\n      <View>\n        <ViewFields>\n          <FieldRef Name=\"Editor\"/>\n          <FieldRef Name=\"EncodedAbsUrl\"/>\n          <FieldRef Name=\"Modified\"/>\n          <FieldRef Name=\"Title\"/>\n          <FieldRef Name=\"UniqueId\"/>\n        </ViewFields>\n        " + filter + "\n      </View>\n    ";
    };
    LinkDataProvider.prototype._buildTitleFilter = function (keyWords) {
        return "\n      <Query>\n        <Where>\n          <And>\n            " + this._buildTitleFilterInternal(keyWords, 0) + "\n            <BeginsWith>\n              <FieldRef Name='ContentTypeId'/>\n              <Value Type='Computed'>" + this._sitePageContentTypeId + "</Value>\n            </BeginsWith>\n          </And>\n        </Where>\n        <OrderBy>\n          <FieldRef Name=\"Modified\" Ascending=\"False\" />\n        </OrderBy>\n      </Query>\n    ";
    };
    LinkDataProvider.prototype._buildTitleFilterInternal = function (keyWords, index) {
        return "\n      <And>\n        <Contains>\n          <FieldRef Name=\"Title\"/>\n          <Value Type=\"Text\">" + this._htmlEncode(keyWords[index]) + "</Value>\n        </Contains>\n        " + (index < keyWords.length - 1
            ? this._buildTitleFilterInternal(keyWords, index + 1)
            : "<IsNotNull><FieldRef Name=\"EncodedAbsUrl\"/></IsNotNull>") + "\n      </And>\n    ";
    };
    LinkDataProvider.prototype._buildRecentPageFilter = function () {
        return "\n      <Query>\n        <Where>\n          <And>\n            <IsNotNull><FieldRef Name=\"EncodedAbsUrl\"/></IsNotNull>\n            <BeginsWith>\n              <FieldRef Name='ContentTypeId'/>\n              <Value Type='Computed'>" + this._sitePageContentTypeId + "</Value>\n            </BeginsWith>\n          </And>\n        </Where>\n        <OrderBy>\n          <FieldRef Name=\"Modified\" Ascending=\"False\" />\n        </OrderBy>\n      </Query>\n      <RowLimit>" + _ILinkDataProvider__WEBPACK_IMPORTED_MODULE_8__["RECENT_PAGES_LIMIT"] + "</RowLimit>\n    ";
    };
    LinkDataProvider.prototype._getPageLinksBySearch = function (keyWords) {
        var _this = this;
        var monitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5__["_QosMonitor"]('PagePicker.GetPageLinksBySearch');
        return this._searchAPIRequest
            .getSearchQueryResponse({
            QueryTemplate: this._buildSearchQueryTemplate(keyWords),
            SelectProperties: [
                'DefaultEncodingURL',
                'EditorOwsUser',
                'ModifiedOwsDate',
                'Title',
                'UniqueID'
            ],
            TrimDuplicates: true
        })
            .then(function (searchResults) {
            monitor.writeSuccess();
            return searchResults.rows
                .filter(function (pageResult) { return pageResult.Title && pageResult.DefaultEncodingURL; })
                .map(function (pageResult) { return ({
                id: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(pageResult.UniqueID),
                isSearchResult: true,
                lastEditor: _this._getPersonName(pageResult.EditorOwsUser, pageResult.ModifiedBy),
                lastModifiedDate: pageResult.ModifiedOwsDate
                    ? _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_4__["LocaleFormat"].formatDate(new Date(pageResult.ModifiedOwsDate), { skeleton: 'yMMMd' })
                    : '',
                title: pageResult.Title,
                url: pageResult.DefaultEncodingURL
            }); });
        })
            .catch(function (error) {
            monitor.writeUnexpectedFailure('GetPageLinksBySearchFail', error);
            return [];
        });
    };
    LinkDataProvider.prototype._buildSearchQueryTemplate = function (keyWords) {
        var queryTemplateString = keyWords.reduce(
        // A double quotation mark within the quoted string MUST be represented by two double quotation marks
        function (template, keyWord) { return template + ("\"" + keyWord.replace(/"/g, '""') + "\" AND "); }, '');
        queryTemplateString += "SiteID:" + this._pageContext.site.id.toString() + " AND ";
        queryTemplateString += "WebId:" + this._pageContext.web.id.toString() + " AND ";
        queryTemplateString += "ContentTypeId:" + this._sitePageContentTypeId + "*";
        return queryTemplateString;
    };
    /**
     * Copied from sp-client/libraries/sp-component-utilities/src/dataProviders/search/PersonaSettingsCache.ts
     * It's to get the person name from the search result.
     */
    LinkDataProvider.prototype._getPersonName = function (owsId, author) {
        var name;
        if (!owsId && author) {
            var info = author.split(';');
            if (info.length > 0) {
                name = info[info.length - 1];
            }
        }
        else if (owsId) {
            var info = owsId.split(' | ');
            if (info.length >= 2) {
                name = info[1];
            }
        }
        return name;
    };
    /**
     * get local time from UTC+0 date string
     * @param dateString
     * @param timeZone
     */
    LinkDataProvider.prototype._utcToLocal = function (dateString, timeZone) {
        var dateObject = new Date(dateString);
        var utcSPDate = new _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_4__["SPDate"]({
            fullYear: dateObject.getUTCFullYear(),
            month: dateObject.getUTCMonth(),
            date: dateObject.getUTCDate(),
            hours: dateObject.getUTCHours(),
            minutes: dateObject.getUTCMinutes(),
            seconds: dateObject.getUTCSeconds(),
            milliseconds: dateObject.getUTCMilliseconds()
        });
        var localSPDate = utcSPDate.convertFromUTC(timeZone);
        return new Date(localSPDate.fullYear, localSPDate.month, localSPDate.date, localSPDate.hours, localSPDate.minutes, localSPDate.seconds);
    };
    LinkDataProvider.prototype._getLastModifiedDateDesc = function (dateString) {
        var timeZone = this._pageContext.user.preferUserTimeZone
            ? this._pageContext.user.timeZoneInfo
            : this._pageContext.web.timeZoneInfo;
        return dateString ? _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_4__["LocaleFormat"].formatDate(this._utcToLocal(dateString, timeZone), { skeleton: 'yMMMd' }) : '';
    };
    return LinkDataProvider;
}());
/* harmony default export */ __webpack_exports__["default"] = (LinkDataProvider);


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

/***/ "X+PM":
/*!*********************************************!*\
  !*** external "@microsoft/sp-page-context" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_X_PM__;

/***/ }),

/***/ "Ycni":
/*!*************************************!*\
  !*** external "@ms/i18n-utilities" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Ycni__;

/***/ }),

/***/ "cDcd":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_cDcd__;

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
/*! exports provided: LinkDataProvider, PagePicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dataProviders_LinkDataProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataProviders/LinkDataProvider */ "M7Bk");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LinkDataProvider", function() { return _dataProviders_LinkDataProvider__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _PagePicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PagePicker */ "+DwJ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PagePicker", function() { return _PagePicker__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * PagePicker modules index
 */




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

/***/ "y88i":
/*!********************************************!*\
  !*** external "@ms/odsp-utilities-bundle" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_y88i__;

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
//# sourceMappingURL=sp-pagepicker_en-us.js.map