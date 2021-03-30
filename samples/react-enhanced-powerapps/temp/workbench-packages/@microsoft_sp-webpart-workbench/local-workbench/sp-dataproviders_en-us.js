define("1cea229f-b208-4202-8014-22503d92a019_0.1.0", ["@microsoft/office-ui-fabric-react-bundle","@microsoft/sp-core-library","@microsoft/sp-diagnostics","@microsoft/sp-http","@microsoft/sp-loader","@microsoft/sp-lodash-subset","@microsoft/sp-page-context","@ms/i18n-utilities","@ms/odsp-utilities-bundle","@ms/sp-base-data-source","@ms/sp-component-utilities","@ms/sp-home-http-client","@ms/sp-list-data-source","@ms/sp-list-field-data-source","@ms/sp-list-item-data-source","@ms/sp-list-view-data-source","@ms/sp-telemetry"], function(__WEBPACK_EXTERNAL_MODULE__microsoft_office_ui_fabric_react_bundle__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_core_library__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_diagnostics__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_http__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_loader__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_lodash_subset__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_page_context__, __WEBPACK_EXTERNAL_MODULE__ms_i18n_utilities__, __WEBPACK_EXTERNAL_MODULE__ms_odsp_utilities_bundle__, __WEBPACK_EXTERNAL_MODULE__ms_sp_base_data_source__, __WEBPACK_EXTERNAL_MODULE__ms_sp_component_utilities__, __WEBPACK_EXTERNAL_MODULE__ms_sp_home_http_client__, __WEBPACK_EXTERNAL_MODULE__ms_sp_list_data_source__, __WEBPACK_EXTERNAL_MODULE__ms_sp_list_field_data_source__, __WEBPACK_EXTERNAL_MODULE__ms_sp_list_item_data_source__, __WEBPACK_EXTERNAL_MODULE__ms_sp_list_view_data_source__, __WEBPACK_EXTERNAL_MODULE__ms_sp_telemetry__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./sp-dataproviders.js");
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
    "_fUkdGpCBq7+yVPCVLIvH7w": {
      "UnknownErrorMessage": "Unknown error happens.",
      "DataNotExistErrorMessage": "This Events list no longer exists. Try a different Events list."
    },
    "_FwR/TcOLpUrNV4IF1KFk6Q": {
      "ListDataProviderTitle": "List",
      "ErrorInvalidListRequestType": "Invalid ListRequestType value."
    },
    "_wlHX5Qmt7B5I/LejUjEhdw": {
      "HelpItem1Title": "Keep your team updated with news on your team site",
      "HelpItem1Description": "From the site home page you'll be able to quickly author a news post – a status update, trip report, or even just highlight a document with some additional context provided to the team.",
      "HelpItem1Url": "https://go.microsoft.com/fwlink/p/?linkid=827920",
      "HelpItem2Title": "What is a team site?",
      "HelpItem2Description": "A SharePoint team site connects you and your team to the content, information, and apps you rely on every day. For example, you can use a team site to store and collaborate on files or to create and manage lists of information. On a team site home page, you can view links to important team files, apps, and web pages and see recent site activity in the activity feed.",
      "HelpItem2Url": "https://go.microsoft.com/fwlink/p/?linkid=827918",
      "HelpItem3Title": "Add a page to a site",
      "HelpItem3Description": "Using pages is a great way to share ideas using images, Excel, Word and PowerPoint documents, video, and more. You can create and publish pages quickly and easily, and they look great on any device. When you create a page, you add and customize web parts with a toolbox available right in the editing pane. And, you can publish with just a click.",
      "HelpItem3Url": "https://go.microsoft.com/fwlink/p/?linkid=827919",
      "HelpItemModernizedTitle": "Welcome to the new team site experience",
      "HelpItemModernizedDescription": "Quickly author a new news post, a status update, or a trip report on the new team site home page.",
      "HelpItemAuthor": "SharePoint",
      "NewsDataProviderTitle": "News",
      "NewsDigestDataProviderTitle": "NewsDigest",
      "HubNewsDataProviderTitle": "Hub News",
      "MyNewsDataProviderTitle": "My News",
      "ViewCountsDataProviderTitle": "View Counts",
      "MultiSiteNewsDataProviderTitle": "Multi-site News",
      "CallToActionContributorTitle": "Create a news post",
      "CallToActionViewerTitle": "No news posts are available right now",
      "CallToActionContributorDescription": "Keep your audience engaged by sharing your latest updates.",
      "CallToActionViewerDescription": "Check back later to see the latest News.",
      "EmptyStateArticleTitle": "Title of news post",
      "EmptyStateArticleDescription": "Preview that shows the first few lines of the article.",
      "EmptyStateArticleAuthor": "Author name",
      "EmptyStatePublishedRelativeTime": "A few seconds ago",
      "AutofillArticleTitle": "Automatic",
      "CarouselStockTitle1": "Build successful portals",
      "CarouselStockTitle2": "Modern SharePoint branding",
      "CarouselStockTitle3": "SharePoint News reaches more users"
    },
    "_aoF309oHcGYroBc7qbZoFw": {
      "PageDataProviderTitle": "***Page"
    },
    "_xZD2C+AxjFVYc3B/c/QO/A": {
      "SearchDataProviderTitle": "Search"
    }
  };

  strings.default = strings;
  return strings;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sp-dataproviders.js":
/*!*****************************!*\
  !*** ./sp-dataproviders.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! @ms/sp-home-http-client */ "@ms/sp-home-http-client"),__webpack_require__(/*! @ms/sp-list-field-data-source */ "@ms/sp-list-field-data-source"),__webpack_require__(/*! @ms/sp-telemetry */ "@ms/sp-telemetry"),__webpack_require__(/*! @ms/sp-base-data-source */ "@ms/sp-base-data-source"),__webpack_require__(/*! @microsoft/sp-loader */ "@microsoft/sp-loader"),__webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "@microsoft/office-ui-fabric-react-bundle"),__webpack_require__(/*! @ms/sp-list-data-source */ "@ms/sp-list-data-source"),__webpack_require__(/*! @microsoft/sp-lodash-subset */ "@microsoft/sp-lodash-subset"),__webpack_require__(/*! @ms/sp-list-item-data-source */ "@ms/sp-list-item-data-source"),__webpack_require__(/*! @microsoft/sp-core-library */ "@microsoft/sp-core-library"),__webpack_require__(/*! @microsoft/sp-page-context */ "@microsoft/sp-page-context"),__webpack_require__(/*! @ms/i18n-utilities */ "@ms/i18n-utilities"),__webpack_require__(/*! @ms/sp-list-view-data-source */ "@ms/sp-list-view-data-source"),__webpack_require__(/*! @ms/sp-component-utilities */ "@ms/sp-component-utilities"),__webpack_require__(/*! @microsoft/sp-diagnostics */ "@microsoft/sp-diagnostics"),__webpack_require__(/*! @microsoft/sp-http */ "@microsoft/sp-http"),__webpack_require__(/*! resx-strings */ "../lib/resx-strings/en-us.js"),__webpack_require__(/*! @ms/odsp-utilities-bundle */ "@ms/odsp-utilities-bundle")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(__WEBPACK_EXTERNAL_MODULE__1B___, __WEBPACK_EXTERNAL_MODULE__0GzW__, __WEBPACK_EXTERNAL_MODULE__2q6Q__, __WEBPACK_EXTERNAL_MODULE__9iOe__, __WEBPACK_EXTERNAL_MODULE_I6O9__, __WEBPACK_EXTERNAL_MODULE_KL1q__, __WEBPACK_EXTERNAL_MODULE_OVKu__, __WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_SQ4g__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_X_PM__, __WEBPACK_EXTERNAL_MODULE_Ycni__, __WEBPACK_EXTERNAL_MODULE_c2YK__, __WEBPACK_EXTERNAL_MODULE_hiL___, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_vlQI__, __WEBPACK_EXTERNAL_MODULE_vpy3__, __WEBPACK_EXTERNAL_MODULE_y88i__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"sp-dataproviders": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({"sp-queryablemanagedproperties":"sp-queryablemanagedproperties","sp-retrievablemanagedproperties":"sp-retrievablemanagedproperties"}[chunkId]||chunkId) + "_" + {"sp-queryablemanagedproperties":"661a700ddfc131c0f713","sp-retrievablemanagedproperties":"e9d1012718b8b8f122f8"}[chunkId] + ".js"
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
/******/ 	var jsonpArray = window["webpackJsonp_1cea229f_b208_4202_8014_22503d92a019_0_1_0"] = window["webpackJsonp_1cea229f_b208_4202_8014_22503d92a019_0_1_0"] || [];
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
/******/ 	  var regex = (typeof spScriptNamePattern !== 'undefined') ? spScriptNamePattern : new RegExp('\\/sp-dataproviders(_[a-z0-9-]+)*\\.js', 'i');
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

/***/ "+1B/":
/*!******************************************!*\
  !*** external "@ms/sp-home-http-client" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1B___;

/***/ }),

/***/ "/3i9":
/*!******************************************************!*\
  !*** ./lib/dataProviders/news/MyNewsDataProvider.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_NewsDataSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/NewsDataSource */ "aE90");
/* harmony import */ var _DataProviderFlights__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DataProviderFlights */ "Xkwe");
/* harmony import */ var _MicroServiceNewsDataProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MicroServiceNewsDataProvider */ "ugjH");
/* harmony import */ var _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilities/NewsUtilities */ "JpAn");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loc/Strings.resx */ "AOs8");
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
 * @internal
 */
var MyNewsDataProvider = /** @class */ (function (_super) {
    __extends(MyNewsDataProvider, _super);
    function MyNewsDataProvider(options) {
        var _this = _super.call(this, options) || this;
        _this.id = 'myNews';
        _this.title = _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_4__["default"].MyNewsDataProviderTitle;
        return _this;
    }
    Object.defineProperty(MyNewsDataProvider.prototype, "qosMonitorLabel", {
        get: function () {
            return 'MyNewsDataSource';
        },
        enumerable: true,
        configurable: true
    });
    MyNewsDataProvider.prototype.executeRequest = function (requestInfo) {
        if (!_DataProviderFlights__WEBPACK_IMPORTED_MODULE_1__["default"].isFilterForOtherSitesEnabled()) {
            return this._sphomeHttpClient.get(this.getMicroservicePath(requestInfo));
        }
        else {
            return this._sphomeHttpClient.post(this.getMicroservicePath(requestInfo), _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_3__["NewsUtilities"].getFilterQueryBody(requestInfo.filterKQLQuery));
        }
    };
    MyNewsDataProvider.prototype.getMicroservicePath = function (requestInfo) {
        var endpointPath = !_DataProviderFlights__WEBPACK_IMPORTED_MODULE_1__["default"].isFilterForOtherSitesEnabled()
            ? 'news'
            : 'news/filtered';
        var queryParams = "start=" + requestInfo.skip + "&count=" + requestInfo.count;
        queryParams += Object(_models_NewsDataSource__WEBPACK_IMPORTED_MODULE_0__["_appendAudienceFilteringQueryParam"])(requestInfo);
        queryParams += Object(_models_NewsDataSource__WEBPACK_IMPORTED_MODULE_0__["_appendLanguageOverrideQueryParam"])(requestInfo);
        return endpointPath + "?" + queryParams;
    };
    return MyNewsDataProvider;
}(_MicroServiceNewsDataProvider__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (MyNewsDataProvider);


/***/ }),

/***/ "/Lye":
/*!**************************************************************!*\
  !*** ./lib/dataProviders/page/PageMetadataProviderLoader.js ***!
  \**************************************************************/
/*! exports provided: PageMetadataProviderLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageMetadataProviderLoader", function() { return PageMetadataProviderLoader; });
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0__);

var PageMetadataProviderLoader = /** @class */ (function () {
    function PageMetadataProviderLoader() {
    }
    PageMetadataProviderLoader.load = function (options) {
        if (!PageMetadataProviderLoader._promise) {
            // tslint:disable-next-line:max-line-length
            PageMetadataProviderLoader._promise = _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0__["SPComponentLoader"].loadComponentById(PageMetadataProviderLoader._dataProviderComponentId)
                .then(function (module) {
                return new module.PageDataProvider(options);
            });
        }
        return PageMetadataProviderLoader._promise;
    };
    PageMetadataProviderLoader._dataProviderComponentId = '1cea229f-b208-4202-8014-22503d92a019';
    return PageMetadataProviderLoader;
}());



/***/ }),

/***/ "0GzW":
/*!************************************************!*\
  !*** external "@ms/sp-list-field-data-source" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0GzW__;

/***/ }),

/***/ "0oRV":
/*!*****************************************************!*\
  !*** ./lib/dataProviders/search/KQLQueryBuilder.js ***!
  \*****************************************************/
/*! exports provided: AUDIENCE_TARGET_KQL_QUERY, KQLQueryBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUDIENCE_TARGET_KQL_QUERY", function() { return AUDIENCE_TARGET_KQL_QUERY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KQLQueryBuilder", function() { return KQLQueryBuilder; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _search_enums_SearchAPISortDirection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../search/enums/SearchAPISortDirection */ "zDft");
/* harmony import */ var _common_TokenUtilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/TokenUtilities */ "YoTJ");
/* harmony import */ var _DataProvidersKillSwitches__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DataProvidersKillSwitches */ "evK2");
// Copyright (c) Microsoft Corporation. All rights reserved.






var CREATED = 'Created';
var LAST_MODIFIED = 'LastModifiedTime';
var DEFAULT_SOURCE_ID = '8413CD39-2156-4E00-B54D-11EFD9ABDB89';
var CONTACT_SEARCH_STRING = 'ContentTypeId:0x0106*';
var WIKI_SEARCH_STRING = 'ContentTypeId:0x010108*';
var WEBPART_SEARCH_STRING = 'ContentTypeId:0x01010901*';
var MODERN_SEARCH_STRING = 'ContentTypeId:0x0101009D1CB255DA76424F860D91F20E6C4118*';
var PUBLISHING_SEARCH_STRING = 'ContentTypeId:0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF39*';
var DOCUMENT_SEARCH_STRING = 'IsDocument:1';
var EVENT_SEARCH_STRING = 'ContentTypeId:0x0102*';
var ISSUE_SEARCH_STRING = 'ContentTypeId:0x0103*';
var TASK_SEARCH_STRING = 'ContentTypeId:0x0108*';
var LINK_SEARCH_STRING = 'ContentTypeId:0x0105*';
var VIDEO_SEARCH_STRING = 'ContentTypeId:0x010100F3754F12A9B6490D9622A01FE9D8F012*';
// Search schema limit for managed properties
// https://technet.microsoft.com/en-us/library/cc262787(v=office.15).aspx#Search
var MANAGED_PROPERTIES_LIMIT = 50000;
/**
 * @internal
 */
var AUDIENCE_TARGET_KQL_QUERY = '(ModernAudienceAadObjectIds:{User.Audiences} OR NOT IsAudienceTargeted:true)';
/**
 * @internal
 */
var KQLQueryBuilder = /** @class */ (function () {
    function KQLQueryBuilder() {
    }
    /**
     * @deprecated retire with kill switch e494e871-d9a3-42d6-b143-1f4ca7049af2.
     */
    KQLQueryBuilder.getTimeZoneId = function (minOffsetFromGMT) {
        return this._timeZoneLookupTable[minOffsetFromGMT.toString()] || 2; // default to GMT
    };
    KQLQueryBuilder.generateKqlFromFilters = function (p) {
        /*
         * Like filter types are arranged together so that they can be OR'd together.  For example:
         *   (title:"SharePoint*" OR title:"Office*") AND modifiedby:"Henry Ford"
         */
        var kql = '';
        var isFilteringByDate = false;
        if (!p || !p.query || !p.query.filters) {
            return { expr: kql, isFilteringByDate: isFilteringByDate };
        }
        /*
         * Like filter types are arranged together so that they can be OR'd together.  For example:
         *   (title:"SharePoint*" OR title:"Office*") AND modifiedby:"Henry Ford"
         */
        // create a copy (not deep) to preserve the original sort order
        var filters = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__["clone"])(p.query.filters);
        // remove any undefined filters
        var i = filters.length;
        while (i--) {
            if ((filters[i].value === undefined || filters[i].value === '') &&
                (filters[i].userType === undefined || filters[i].userType === 2 /* SpecificUser */)) {
                filters.splice(i, 1);
            }
        }
        // sort the filters so like filter types are next to each other
        filters = filters.sort(function (a, b) {
            return a.filterType - b.filterType;
        });
        var inParens = false;
        for (var j = 0; j < filters.length; j++) {
            // insert appropriate operator to separate expressions
            if (j > 0) {
                kql += " " + (inParens ? 'OR' : 'AND') + " ";
            }
            var filter = filters[j];
            var nextFilter = j < filters.length - 1 ? filters[j + 1] : {};
            // if not in parens and having more than one filter left,
            // check to see if we should open parens by peeking ahead at the next filter
            if (!inParens
                && nextFilter.value !== undefined // there are more filters after this one
                && filter.filterType === nextFilter.filterType) { // next filter is the same as this one
                kql += '(';
                inParens = true;
            }
            var filterExpr = this._kqlFilter(filter, p.queryableManagedProperties);
            kql += filterExpr.expr;
            isFilteringByDate = isFilteringByDate || filterExpr.isFilteringByDate;
            // if in parens and not having another matching filter type, close the parens
            if (inParens
                && filter.filterType !== nextFilter.filterType) { // next filter is not the same as this one
                kql += ')';
                inParens = false;
            }
        }
        if (kql.length > 0) {
            kql += ' AND';
        }
        return { expr: kql, isFilteringByDate: isFilteringByDate };
    };
    // For usage, please refer to the test case
    //   'should build queryTemplate using filters and filterGroups' in KQLQueryBuilder.test.ts.
    KQLQueryBuilder.generateKqlFromFilterGroup = function (p) {
        if (!p || !p.query || !p.query.filterGroup) {
            return { expr: '', isFilteringByDate: false };
        }
        var filterExpr = this._buildFilterGroupExpr(p.query.filterGroup, p.queryableManagedProperties);
        if (filterExpr.expr.length > 0) {
            filterExpr.expr += ' AND';
        }
        return filterExpr;
    };
    KQLQueryBuilder.generateQuery = function (p, pageContext) {
        var _this = this;
        /*
         * Most of the query options are implemented in the KQL query passed to the QueryTemplate search option.
         */
        var kql = '';
        if (!p || !p.query) {
            return { queryTemplate: kql };
        }
        var isFilteringByDate = false;
        var hasFilters = false;
        if (p.query.advancedQueryText) {
            kql = p.query.advancedQueryText;
        }
        else if (p.query.filterGroup) {
            var filterExpr = this.generateKqlFromFilterGroup(p);
            kql = filterExpr.expr;
            isFilteringByDate = filterExpr.isFilteringByDate;
        }
        else if (p.query.filters) {
            var filterExpr = this.generateKqlFromFilters(p);
            kql = filterExpr.expr;
            isFilteringByDate = filterExpr.isFilteringByDate;
        }
        if (kql.length > 0) {
            hasFilters = true;
        }
        if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('1eb42384-bc78-4ca7-81e1-307af0fe4bdf'), '01/17/2019', 'Refactor to generate content location KQL query.')) {
            // set the scope of the search
            kql += " " + this.generateContentLocationKqlQuery(p);
        }
        else {
            // set the scope of the search
            switch (p.query.contentLocation) {
                case 5 /* AllSitesInTheHub */:
                    kql += " " + this._siteCriteria(p.hubSiteId, 'DepartmentId');
                    break;
                case 1 /* CurrentSite */:
                    kql += " (" + this._siteCriteria(p.siteId, 'SiteID') + " AND " + this._siteCriteria(p.webId, 'WebId') + ")";
                    break;
                case 2 /* CurrentSiteCollection */:
                    kql += " " + this._siteCriteria(p.siteId, 'SiteID');
                    break;
                case 99 /* SelectedSites */:
                    if (p.siteIds && p.siteIds.length > 0) {
                        var exps = p.siteIds.map(function (site) { return "(" + _this._siteCriteria(site.siteId, 'SiteID') + " AND " + _this._siteCriteria(site.webId, 'WebId') + ")"; });
                        kql += " (" + exps.join(' OR ') + ")";
                    }
                    break;
                case 3 /* AllSites */:
                    // no criteria on SiteName
                    break;
            }
        }
        // Generate KQL for Content and Document Type
        kql += this._generateContentKql(p, hasFilters);
        var timeZoneId = undefined;
        if (isFilteringByDate) {
            if (_DataProvidersKillSwitches__WEBPACK_IMPORTED_MODULE_5__["default"].isSearchRespectsUserTimeZoneKillSwitchActivated()) {
                var dt = new Date();
                var minOffsetFromGMT = dt.getTimezoneOffset(); // output like -330
                timeZoneId = this.getTimeZoneId(minOffsetFromGMT);
            }
            else {
                timeZoneId = pageContext.user.preferUserTimeZone
                    ? pageContext.user.timeZoneInfo.id
                    : pageContext.web.timeZoneInfo.id;
            }
        }
        if (p.audienceTarget) {
            kql = kql.trim() + (" " + AUDIENCE_TARGET_KQL_QUERY);
        }
        return { queryTemplate: kql.trim(), timeZoneId: timeZoneId };
    };
    KQLQueryBuilder.generateContentLocationKqlQuery = function (options) {
        var _this = this;
        switch (options.query.contentLocation) {
            case 5 /* AllSitesInTheHub */:
                return "" + this._siteCriteria(options.hubSiteId, 'DepartmentId');
            case 1 /* CurrentSite */:
                return "(" + this._siteCriteria(options.siteId, 'SiteID') + " AND " + this._siteCriteria(options.webId, 'WebId') + ")";
            case 2 /* CurrentSiteCollection */:
                return "" + this._siteCriteria(options.siteId, 'SiteID');
            case 99 /* SelectedSites */:
                if (options.siteIds && options.siteIds.length > 0) {
                    var exps = options.siteIds.map(function (site) { return "(" + _this._siteCriteria(site.siteId, 'SiteID') + " AND " + _this._siteCriteria(site.webId, 'WebId') + ")"; });
                    return "(" + exps.join(' OR ') + ")";
                }
        }
        return '';
    };
    KQLQueryBuilder.generateSearchAPIQueryOptions = function (kql, timeZoneId, p) {
        var enableDynamicGroups = p.isPrivateGroup;
        if (!enableDynamicGroups &&
            p.query) {
            enableDynamicGroups = p.query.contentLocation === 3 /* AllSites */ ||
                p.query.contentLocation === 5 /* AllSitesInTheHub */;
        }
        /*
         * Set EnableDynamicGroups:True will cause an extra latency overhead on the query since we
         * need to look up all dynamic groups that a user is member of before sending the query down to
         * the search farm. The overhead of potentially two roundtrips to AAD to fetch the groups can
         * be a few 100s  milliseconds. Plus we're contributing to AAD traffic volume, which could
         * cause AAD throttling of SharePoint.
         */
        var enableDynamicGroupsString = enableDynamicGroups ? 'True' : 'False';
        /*
         * Set EnableMultiGeoSearchString:True will cause an extra latency overhead on the query since we
         * need to query all the locations' index. In MSIT it will cause about 3000 milliseconds latency since MSIT
         * has the most locations.  In other Prod tenants, the latency would be lower.
         *
         * https://docs.microsoft.com/en-us/sharepoint/dev/solution-guidance/multigeo-search
         */
        var enableMultiGeoSearchString = p.enableMultiGeoSearch ? 'True' : 'False';
        var options = {
            ClientType: p.clientType,
            QueryTemplate: kql,
            TimeZoneId: timeZoneId,
            // reduce the content returned by the Search API to only those columns used
            // see OOTBSchemaOSS.cs for a list of possible fields to query against
            SelectProperties: [
                'ContentType',
                'ContentTypeId',
                'Title',
                'EditorOwsUser',
                'ModifiedBy',
                'LastModifiedBy',
                'FileExtension',
                'FileType',
                'Path',
                'SiteName',
                'SiteTitle',
                'PictureThumbnailURL',
                'DefaultEncodingURL',
                'LastModifiedTime',
                'ListID',
                'ListItemID',
                // To provide to getpreview.ashx (getpreviewhandler.ashx.cs)
                'SiteID',
                'WebId',
                'UniqueID'
            ],
            Properties: [
                { Name: 'TrimSelectProperties', Value: { StrVal: '1', QueryPropertyValueTypeIndex: 1 } },
                { Name: 'EnableDynamicGroups', Value: { BoolVal: enableDynamicGroupsString, QueryPropertyValueTypeIndex: 3 } },
                { Name: 'EnableMultiGeoSearch', Value: { BoolVal: enableMultiGeoSearchString, QueryPropertyValueTypeIndex: 3 } }
            ]
        };
        options.SourceId = DEFAULT_SOURCE_ID;
        options.TrimDuplicates = false;
        // only return these additional fields if querying for Contact content type
        if (kql.indexOf(CONTACT_SEARCH_STRING) > -1) {
            options.SelectProperties.push('UserName', 'WorkEmail', 'OrgNames', 'JobTitle', 'WorkPhone', 'MobilePhone');
        }
        // add created and LastModifiedTime fields to output to assist in debugging date filter output
        if (p.query && p.query.filters) {
            var filters = p.query.filters;
            var includeCreatedField = false;
            var includeLastModifiedField = false;
            for (var i = 0; i < filters.length; i++) {
                var filter = filters[i];
                switch (filter.filterType) {
                    case 8 /* RecentlyAdded */:
                        includeCreatedField = true;
                        break;
                    case 7 /* RecentlyChanged */:
                        includeLastModifiedField = true;
                        break;
                }
            }
            if (includeCreatedField) {
                options.SelectProperties.push(CREATED);
            }
            if (includeLastModifiedField) {
                options.SelectProperties.push(LAST_MODIFIED);
            }
        }
        // selectProperties is an array of output fields to be added to the request
        if (p.selectProperties) {
            var mapSelected = {};
            for (var i = 0; i < options.SelectProperties.length; i++) {
                mapSelected[options.SelectProperties[i]] = true;
            }
            for (var i = 0; i < p.selectProperties.length; i++) {
                this._addSelectField(options.SelectProperties, p.selectProperties[i], mapSelected);
            }
        }
        if (p.maxItemsPerPage) {
            options.RowLimit = p.maxItemsPerPage;
            options.RowsPerPage = p.maxItemsPerPage;
        }
        if (p.startRow) {
            options.StartRow = p.startRow;
        }
        if (p.query) {
            switch (p.query.sortType) {
                case 1 /* MostRecent */:
                    options.SortList = [{
                            Property: LAST_MODIFIED,
                            Direction: _search_enums_SearchAPISortDirection__WEBPACK_IMPORTED_MODULE_3__["SearchAPISortDirection"].descending
                        }];
                    break;
                case 2 /* MostViewed */:
                    options.SortList = [{
                            Property: 'ViewsLifeTime',
                            Direction: _search_enums_SearchAPISortDirection__WEBPACK_IMPORTED_MODULE_3__["SearchAPISortDirection"].descending
                        }];
                    break;
                case 3 /* Trending */:
                    options.SortList = [{
                            Property: 'ViewsRecent',
                            Direction: _search_enums_SearchAPISortDirection__WEBPACK_IMPORTED_MODULE_3__["SearchAPISortDirection"].descending
                        }];
                    break;
                case 4 /* FieldAscending */:
                case 5 /* FieldDescending */:
                    if (p.query.sortField) {
                        options.SortList = [{
                                Property: p.query.sortField,
                                Direction: p.query.sortType === 4 /* FieldAscending */ ?
                                    _search_enums_SearchAPISortDirection__WEBPACK_IMPORTED_MODULE_3__["SearchAPISortDirection"].ascending : _search_enums_SearchAPISortDirection__WEBPACK_IMPORTED_MODULE_3__["SearchAPISortDirection"].descending
                            }];
                    }
                    break;
            }
        }
        return options;
    };
    KQLQueryBuilder.generateSearchAPIQueryOptionsForManagedProperties = function (p) {
        var query = p.query;
        var options = query.managedPropertiesRefinerOptions;
        var limit = !isNaN(options.limit) ? options.limit : MANAGED_PROPERTIES_LIMIT;
        var matchText = options.managedPropertyMatchText ? "*" + options.managedPropertyMatchText + "*" : '*';
        var encodedMatchText = btoa(Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__["unescape"])(encodeURIComponent(matchText)));
        var path;
        switch (query.contentLocation) {
            case 1 /* CurrentSite */:
                path = p.webAbsoluteUrl;
                break;
            case 2 /* CurrentSiteCollection */:
                path = p.siteAbsoluteUrl;
                break;
            case 3 /* AllSites */:
            default:
                path = new URL(p.webAbsoluteUrl).origin;
        }
        var kql = "path:\"" + path + "\" " + this._generateContentKql(p, false);
        var searchAPIQueryOptions = {
            ClientType: p.clientType,
            SourceId: DEFAULT_SOURCE_ID,
            Querytext: kql,
            Refiners: "ManagedProperties(filter3i=" + limit + "/0/" + encodedMatchText + ",sort=name/ascending)",
            EnableQueryRules: false,
            ProcessBestBets: false,
            ProcessPersonalFavorites: false,
            Properties: [
                {
                    'Name': 'EnableDynamicGroups',
                    'Value': {
                        'BoolVal': 'False',
                        'QueryPropertyValueTypeIndex': 3 // BooleanType
                    }
                },
                {
                    'Name': 'ClientFunction',
                    'Value': {
                        'StrVal': 'SchemaLookup',
                        'QueryPropertyValueTypeIndex': 1 // StringType
                    }
                }
            ]
        };
        return searchAPIQueryOptions;
    };
    KQLQueryBuilder._buildFilterGroupExpr = function (filterGroup, queryableManagedProperties) {
        var _this = this;
        var kql = '';
        var isFilteringByDate = false;
        if (filterGroup.filters) {
            filterGroup.filters.forEach(function (filter) {
                if ((filter.value === undefined || filter.value === '') &&
                    (filter.userType === undefined || filter.userType === 2 /* SpecificUser */)) {
                    return;
                }
                var filterExpr = _this._kqlFilter(filter, queryableManagedProperties);
                isFilteringByDate = isFilteringByDate || filterExpr.isFilteringByDate;
                kql = _this._chainKqlFilterExpr(kql, filterExpr, filterGroup.logicalOperator);
            });
        }
        if (filterGroup.filterGroups) {
            filterGroup.filterGroups.forEach(function (group) {
                var filterExpr = _this._buildFilterGroupExpr(group, queryableManagedProperties);
                isFilteringByDate = isFilteringByDate || filterExpr.isFilteringByDate;
                kql = _this._chainKqlFilterExpr(kql, filterExpr, filterGroup.logicalOperator);
            });
        }
        if (kql) {
            kql += ')';
        }
        return { expr: kql, isFilteringByDate: isFilteringByDate };
    };
    KQLQueryBuilder._chainKqlFilterExpr = function (currentKql, filterExpr, logicalOperator) {
        var newKql = currentKql;
        if (filterExpr.expr) {
            if (!newKql) {
                newKql = '(';
            }
            else {
                newKql += " " + logicalOperator + " ";
            }
            newKql += filterExpr.expr;
        }
        return newKql;
    };
    KQLQueryBuilder._generateContentKql = function (options, hasFilters) {
        var query = options.query, languageCode = options.languageCode;
        var kql = '';
        var newsSearchString = "(" + MODERN_SEARCH_STRING + " AND PromotedState=2)";
        // image or picture or has an image file extension
        var imageSearchString = "(FileType=" + _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2__["spConstants"].imageExtensions.join(' OR FileType=') + ")";
        var pagesKql = "(" + WIKI_SEARCH_STRING + " OR " + WEBPART_SEARCH_STRING + " OR " + MODERN_SEARCH_STRING + " OR " + PUBLISHING_SEARCH_STRING + ")";
        // if content types are not specified then default to searching for documents
        var contentTypes = query.contentTypes || [1 /* Document */];
        var findAllContentTypes = false;
        if (contentTypes.indexOf(99 /* All */) > -1) {
            findAllContentTypes = true;
            if (query.contentLocation === 3 /* AllSites */ && !hasFilters) {
                kql += '*';
            }
        }
        var findDocuments = false;
        var findPages = false;
        var findNews = false;
        if (!findAllContentTypes) {
            var op = '';
            for (var i = 0; i < contentTypes.length; ++i) {
                if (i === 1) {
                    op = ' OR';
                }
                switch (contentTypes[i]) {
                    case 1 /* Document */:
                        findDocuments = true;
                        kql = this._appendCriteriaUniquely(kql, op, DOCUMENT_SEARCH_STRING);
                        break;
                    case 2 /* Page */:
                        findPages = true;
                        kql = this._appendCriteriaUniquely(kql, op, pagesKql);
                        break;
                    case 10 /* News */:
                        findNews = true;
                        kql = this._appendCriteriaUniquely(kql, op, newsSearchString);
                        break;
                    case 4 /* Event */:
                        kql = this._appendCriteriaUniquely(kql, op, EVENT_SEARCH_STRING);
                        break;
                    case 5 /* Issue */:
                        kql = this._appendCriteriaUniquely(kql, op, ISSUE_SEARCH_STRING);
                        break;
                    case 6 /* Task */:
                        kql = this._appendCriteriaUniquely(kql, op, TASK_SEARCH_STRING);
                        break;
                    case 7 /* Link */:
                        kql = this._appendCriteriaUniquely(kql, op, LINK_SEARCH_STRING);
                        break;
                    case 8 /* Contact */:
                        kql = this._appendCriteriaUniquely(kql, op, CONTACT_SEARCH_STRING);
                        break;
                    case 3 /* Video */:
                        kql = this._appendCriteriaUniquely(kql, op, VIDEO_SEARCH_STRING);
                        break;
                    case 9 /* Image */:
                        kql = this._appendCriteriaUniquely(kql, op, imageSearchString);
                        break;
                }
                // Exclude pages when searching for documents only.  Without this, the search criteria for documents
                // would return pages in its results as well. This takes out modern pages, classic pages, system pages,
                // PublishingImages (of type aspx but content type images), and pages in SiteAssets
                if (findDocuments && !findPages) {
                    kql += ' AND NOT (FileType:aspx OR FileType:html OR FileType:htm OR FileType:mhtml)';
                }
                if (findPages && !findDocuments) {
                    kql += " AND NOT (FileType:one OR FileType:onepkg OR FileType:ms-one-stub OR FileType:onetoc OR FileType:onetoc2)"; /* tslint:disable-line:max-line-length */
                }
            }
        }
        // @todo: VSTS #764958 - KQLQueryBuilder should be using a string array to build up the query
        // Support identifying pages translated to the user's language preference
        if (languageCode && (findAllContentTypes ||
            findPages ||
            (findNews && !_DataProvidersKillSwitches__WEBPACK_IMPORTED_MODULE_5__["default"].filterNewsByLanguage.isActivated()))) {
            kql += " AND ("
                // include translations in the user preferred language
                + ("SPTranslationLanguage:" + languageCode + " ")
                // a base language page with no translation available
                + ("OR (NOT SPTranslatedLanguages:" + languageCode + " AND NOT SPIsTranslation:true)")
                + ")";
        }
        if (findDocuments || findAllContentTypes) {
            // default to finding all document types
            var documentTypes = query.documentTypes || [99 /* Any */];
            if (documentTypes.indexOf(99 /* Any */) === -1) {
                var op = '';
                for (var i = 0; i < documentTypes.length; ++i) {
                    if (i === 1) {
                        op = ' OR';
                    }
                    // document extensions are in sync with those found in /common/fileTypeIcons/FileTypeIconMap.ts
                    switch (documentTypes[i]) {
                        case 1 /* Word */:
                            kql = this._appendCriteriaUniquely(kql, op, this._documentTypeCriteria(['doc', 'docm', 'docx']));
                            break;
                        case 2 /* Excel */:
                            kql = this._appendCriteriaUniquely(kql, op, this._documentTypeCriteria(['xls', 'xlsb', 'xlsm', 'xlsx']));
                            break;
                        case 3 /* PowerPoint */:
                            kql = this._appendCriteriaUniquely(kql, op, this._documentTypeCriteria(['pot', 'potx', 'ppt', 'pptm', 'pptx']));
                            break;
                        case 4 /* OneNote */:
                            kql = this._appendCriteriaUniquely(kql, op, this._documentTypeCriteria(['one', 'onepkg', 'ms-one-stub', 'onetoc', 'onetoc2']));
                            break;
                        case 5 /* Visio */:
                            kql = this._appendCriteriaUniquely(kql, op, this._documentTypeCriteria(['vsd', 'vsdm', 'vsdx', 'vdw']));
                            break;
                        case 10 /* PDF */:
                            kql = this._appendCriteriaUniquely(kql, op, this._documentTypeCriteria(['pdf']));
                            break;
                    }
                }
            }
        }
        return kql && " (" + kql.trim() + ")";
    };
    KQLQueryBuilder._addSelectField = function (fields, field, mapSelected) {
        if (!mapSelected[field]) {
            mapSelected[field] = true;
            fields.push(field);
        }
    };
    KQLQueryBuilder._siteCriteria = function (id, field) {
        // the second expression is needed because WebId or SiteID may have braces stored in its value
        return "(" + field + ":" + id + " OR " + field + ":{" + id + "})";
    };
    // Only add criteria to the KQL expression if the criteria has not been added already.
    KQLQueryBuilder._appendCriteriaUniquely = function (kql, op, criteria) {
        if (kql.indexOf(criteria) === -1) {
            kql += op + " " + criteria;
        }
        return kql;
    };
    // generate KQL syntax for a filter setting
    KQLQueryBuilder._kqlFilter = function (filter, queryableManagedProperties) {
        var expr = ' ';
        var isFilteringByDate = false;
        if (filter && (filter.value !== undefined || filter.userType !== undefined)) {
            var value = filter.value !== undefined ? filter.value.toString() : '';
            var filterType = filter.filterType;
            var dateField = void 0;
            switch (filterType) {
                case 1 /* TitleContaining */:
                    expr += value ? "title:\"" + value + "\"" : '';
                    break;
                case 2 /* AnyTextContaining */:
                    expr += value ? "\"" + value + "\"" : '';
                    break;
                case 3 /* TaggedWith */:
                    expr += value ? "tags:\"" + value + "\"" : '';
                    break;
                case 4 /* CreatedBy */:
                    if (filter.userType === 1 /* CurrentUser */) {
                        expr += 'createdby:{User}';
                    }
                    else if (value) {
                        if (_common_TokenUtilities__WEBPACK_IMPORTED_MODULE_4__["default"].isValidMeToken(value)) {
                            expr += 'createdby:{User}';
                        }
                        else {
                            expr += "createdby:\"" + value + "\"";
                        }
                    }
                    break;
                case 5 /* ModifiedBy */:
                    if (filter.userType === 1 /* CurrentUser */) {
                        expr += 'modifiedby:{User}';
                    }
                    else if (value) {
                        if (_common_TokenUtilities__WEBPACK_IMPORTED_MODULE_4__["default"].isValidMeToken(value)) {
                            expr += 'modifiedby:{User}';
                        }
                        else {
                            expr += "modifiedby:\"" + value + "\"";
                        }
                    }
                    break;
                case 8 /* RecentlyAdded */:
                    dateField = CREATED;
                    break;
                case 7 /* RecentlyChanged */:
                    dateField = LAST_MODIFIED;
                    break;
                case 6 /* Field */:
                    if (queryableManagedProperties) {
                        var result = this._managedPropertyFilter(filter, queryableManagedProperties);
                        expr += result.expr;
                        isFilteringByDate = result.isFilteringByDate;
                    }
                    break;
            }
            // Let the Search API handle rationalizing local time by using convenient date variables.
            // Also handles localizing what is the start date of the week.
            if (dateField) {
                isFilteringByDate = true;
                switch (this._filterSince(value)) {
                    case 1 /* Today */:
                        expr += dateField + "=today";
                        break;
                    case 2 /* Yesterday */:
                        expr += "(" + dateField + "=today OR " + dateField + "=yesterday)";
                        break;
                    case 3 /* ThisWeek */:
                        expr += dateField + "=\"this week\"";
                        break;
                    case 4 /* ThisMonth */:
                        expr += dateField + "=\"this month\"";
                        break;
                    case 5 /* LastMonth */:
                        expr += "(" + dateField + "=\"this month\" OR " + dateField + "=\"last month\")";
                        break;
                    case 6 /* ThisYear */:
                        expr += dateField + "=\"this year\"";
                        break;
                    case 7 /* LastYear */:
                        expr += "(" + dateField + "=\"this year\" OR " + dateField + "=\"last year\")";
                        break;
                }
            }
        }
        return {
            expr: expr.trim(),
            isFilteringByDate: isFilteringByDate
        };
    };
    KQLQueryBuilder._filterSince = function (value) {
        try {
            return parseInt(value, 10);
        }
        catch (ex) {
            return 4 /* ThisMonth */; // return the default
        }
    };
    KQLQueryBuilder._documentTypeCriteria = function (exts) {
        return "(FileType:" + exts.join(' OR FileType:') + ")";
    };
    KQLQueryBuilder._managedPropertyFilter = function (filter, queryableManagedProperties) {
        var type = filter.fieldInfo || queryableManagedProperties[filter.fieldname];
        // If field is custom managed properties and its data type is not available, treat it as Text type.
        type = type || 1 /* Text */;
        var value = this._parseManagedFieldValue(filter.value, type);
        var expr = '';
        var isFilteringByDate = type === 4 /* DateTime */;
        // blank entry considered valid criteria only for Equals, NotEqual and Between
        if (value.trim() === '' && (filter.op !== 1 /* Equals */ &&
            filter.op !== 2 /* NotEqual */ &&
            filter.op !== 9 /* Between */)) {
            return {
                expr: '',
                isFilteringByDate: false // No date value provided
            };
        }
        switch (filter.op) {
            case 3 /* BeginsWith */:
                // remove surrounding quotes
                var unquoted = value.substr(1, value.length - 2);
                expr = filter.fieldname + "=\"" + unquoted + "*\"";
                break;
            case 9 /* Between */:
                // written so that if only one side of the expression is provided then it is still filtered
                // this will help give instant feedback as the entries are composed
                var value2 = this._parseManagedFieldValue(filter.value2, type);
                if (value.trim() !== '' && value2.trim() !== '') {
                    expr = filter.fieldname + ">=" + value + " AND " + filter.fieldname + "<=" + value2;
                }
                else if (value.trim() !== '') {
                    expr = filter.fieldname + ">=" + value;
                }
                else if (value2.trim() !== '') {
                    expr = filter.fieldname + "<=" + value2;
                }
                break;
            case 5 /* Contains */:
                expr = filter.fieldname + ":" + value;
                break;
            case 6 /* DoesNotContain */:
                expr = "-" + filter.fieldname + ":" + value;
                break;
            // not supported by KQL
            // case FilterOperator.EndsWith:
            case 1 /* Equals */:
                expr = filter.fieldname + "=" + value;
                break;
            case 8 /* GreaterThan */:
                expr = filter.fieldname + ">" + value;
                break;
            case 10 /* GreaterThanOrEqualTo */:
                expr = filter.fieldname + ">=" + value;
                break;
            case 7 /* LessThan */:
                expr = filter.fieldname + "<" + value;
                break;
            case 11 /* LessThanOrEqualTo */:
                expr = filter.fieldname + "<=" + value;
                break;
            case 2 /* NotEqual */:
                expr = "-" + filter.fieldname + "=" + value;
                break;
        }
        return {
            expr: expr,
            isFilteringByDate: isFilteringByDate
        };
    };
    // Ensure the format of our entry can be interpreted by KQL.
    // This function returns an empty string if it can't evaluate a result from the input.
    KQLQueryBuilder._parseManagedFieldValue = function (entry, type) {
        var result = '';
        switch (type) {
            case 4 /* DateTime */:
                if (typeof entry === 'string' && _common_TokenUtilities__WEBPACK_IMPORTED_MODULE_4__["default"].isValidTodayToken(entry)) {
                    var offset = entry.substr('[today]'.length) || '';
                    result = offset ? "{Today" + offset + "}" : '{Today}';
                    return result;
                }
                var dt = new Date(entry.toString());
                // is a date object?
                if (Object.prototype.toString.call(dt) === '[object Date]') {
                    // is a valid date?
                    if (!isNaN(dt.getTime())) {
                        // date format that KQL expects
                        result = "\"" + dt.toISOString() + "\"";
                    }
                }
                break;
            case 3 /* Decimal */:
            case 7 /* Double */:
                var n = parseFloat(entry.toString());
                if (!isNaN(n)) {
                    result = n.toString();
                }
                break;
            case 2 /* Integer */:
                var i = parseInt(entry.toString(), 10);
                if (!isNaN(i)) {
                    result = i.toString();
                }
                break;
            case 1 /* Text */:
                if (typeof entry === 'string' && _common_TokenUtilities__WEBPACK_IMPORTED_MODULE_4__["default"].isValidMeToken(entry)) {
                    result = '{User}';
                }
                else {
                    result = "\"" + entry.toString().trim() + "\"";
                }
                break;
            case 5 /* YesNo */:
                result = (entry ? 'true' : 'false');
                break;
            default:
                // unsupported type, return empty string
                break;
        }
        return result;
    };
    // Deprecates this variable with kill switch e494e871-d9a3-42d6-b143-1f4ca7049af2.
    // see SPRegionalSettings.TimeZones property
    // https://msdn.microsoft.com/library/microsoft.sharepoint.spregionalsettings.timezones.aspx
    // table is condensed to the first timezone id matching a given offset in minutes
    KQLQueryBuilder._timeZoneLookupTable = {
        '0': 2,
        '60': 3,
        //       4,     (GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna
        '120': 5,
        //       6,     (GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague
        //       7,     (GMT+02:00) Minsk
        '-180': 8,
        '-240': 9,
        '-300': 10,
        '-360': 11,
        '-420': 12,
        '-480': 13,
        '-540': 14,
        '-600': 15,
        '-660': 16,
        '720': 17,
        '600': 18,
        '570': 19,
        '540': 20,
        '480': 21,
        '420': 22,
        '330': 23,
        '240': 24,
        '210': 25,
        '180': 26,
        //      27,     (GMT+02:00) Jerusalem
        '-210': 28,
        '-60': 29,
        '-120': 30,
        //      31,     (GMT) Casablanca, Monrovia, Reykjavik
        //      32,     (GMT-03:00) Buenos Aires, Georgetown
        //      33,     (GMT-04:00) Caracas, La Paz
        //      34,     (GMT-05:00) Indiana (East)
        //      35,     (GMT-05:00) Bogota, Lima, Quito, Rio Branco
        //      36,     (GMT-06:00) Saskatchewan
        //      37,     (GMT-06:00) Guadalajara, Mexico City, Monterrey
        //      38,     (GMT-07:00) Arizona
        '-720': 39,
        //      40,     (GMT+12:00) Fiji Is., Kamchatka, Marshall Is.
        '660': 41,
        //      42,     (GMT+10:00) Hobart
        //      43,     (GMT+10:00) Guam, Port Moresby
        //      44,     (GMT+09:30) Darwin
        //      45,     (GMT+08:00) Beijing, Chongqing, Hong Kong S.A.R., Urumqi
        '360': 46,
        //      47,     (GMT+05:00) Islamabad, Karachi, Tashkent
        '270': 48,
        //      49,     (GMT+02:00) Cairo
        //      50,     (GMT+02:00) Harare, Pretoria
        //      51,     (GMT+03:00) Moscow, St. Petersburg, Volgograd
        //      53,     (GMT-01:00) Cape Verde Is.
        //      54,     (GMT+04:00) Baku
        //      55,     (GMT-06:00) Central America
        //      56,     (GMT+03:00) Nairobi
        //      57,     (GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb
        //      58,     (GMT+05:00) Ekaterinburg
        //      59,     (GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius
        //      60,     (GMT-03:00) Greenland
        '390': 61,
        '345': 62,
        //      63,     (GMT+08:00) Irkutsk, Ulaan Bataar
        //      64,     (GMT+07:00) Krasnoyarsk
        //      65,     (GMT-04:00) Santiago
        //      66,     (GMT+05:30) Sri Jayawardenepura
        '780': 67 // (GMT+13:00) Nuku'alofa
        //      68,     (GMT+10:00) Vladivostok
        //      69,     (GMT+01:00) West Central Africa
        //      70,     (GMT+09:00) Yakutsk
        //      71,     (GMT+06:00) Astana, Dhaka
        //      72,     (GMT+09:00) Seoul
        //      73,     (GMT+08:00) Perth
        //      74,     (GMT+03:00) Kuwait, Riyadh
        //      75,     (GMT+08:00) Taipei
        //      76,     (GMT+10:00) Canberra, Melbourne, Sydney
        //      77,     (GMT-07:00) Chihuahua, La Paz, Mazatlan
        //      78,     (GMT-08:00) Tijuana, Baja California
        //      79,     (GMT+02:00) Amman
        //      80,     (GMT+02:00) Beirut
        //      81,     (GMT-04:00) Manaus
        //      82,     (GMT+03:00) Tbilisi
        //      83,     (GMT+02:00) Windhoek
        //      84,     (GMT+04:00) Yerevan
    };
    return KQLQueryBuilder;
}());



/***/ }),

/***/ "1/hL":
/*!**********************************************************!*\
  !*** ./lib/dataProviders/event/EventCAMLQueryBuilder.js ***!
  \**********************************************************/
/*! exports provided: buildCAMLQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildCAMLQuery", function() { return buildCAMLQuery; });
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @copyright (c) Microsoft Corporation. All rights reserved.
 * @file EventCAMLQueryBuilder.ts
 */


/**
 * Compact CAML query string for less transfer payload.
 * @param camlQuery The CAML query string.
 */
function compact(camlQuery) {
    return camlQuery
        // Replace `" />` to `"/>` to reduce one space.
        .replace(/" \/>/g, '"/>')
        // Trim spaces on each line.
        .split(/(?:\r\n|\r|\n)/).map(function (line) { return line.trim(); }).join('');
}
function addOneDay(dateString) {
    // @todo SPDate.addDay(1).toISOString(SPTimeZone.UserPrefer): string
    var date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
}
function buildRowLimitQuery(query) {
    return query.rowLimit
        ? "\n      <RowLimit Paged=\"TRUE\">\n        " + query.rowLimit + "\n      </RowLimit>\n    "
        : '';
}
function buildCategoryQuery(query) {
    return query.category
        ? "\n      <Eq>\n        <FieldRef Name='Category' />\n        <Value Type='Choice'>" + _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["HtmlEncoding"].encodeText(query.category) + "</Value>\n      </Eq>\n    "
        : '';
}
function buildStartEndDateQuery(query, timeZone) {
    // Any events have overlap with the date range [startDate, endDate] should be shown.
    // From code aspect, the events finish after `startDate` should show.
    var startDateQuery = "\n      <Geq>\n        <FieldRef Name=\"EndDate\" />\n        <Value IncludeTimeValue=\"True\" Type=\"DateTime\">\n          " + (query.startDate || '<Today />') + "\n        </Value>\n      </Geq>\n    ";
    // The `endDate` is optional. When it is available, the events start before `endDate` should show.
    var endDateQuery = query.endDate
        ? "\n      <Lt>\n        <FieldRef Name=\"EventDate\" />\n        <Value IncludeTimeValue=\"True\" Type=\"DateTime\">\n          " + addOneDay(query.endDate) + "\n        </Value>\n      </Lt>\n    "
        : '';
    var allDayStartDate = query.startDate
        ? convertToUTCDateISOString(query.startDate, timeZone)
        : '<Today />';
    var allDayEndDate = query.endDate ? convertToUTCDateISOString(addOneDay(query.endDate), timeZone) : '';
    // TODO #623058: allDayStartDateQuery builder and startDateQuery builder look very similar,
    // need to reduce the duplicated code.
    var allDayStartDateQuery = "\n        <Geq>\n          <FieldRef Name=\"EndDate\" />\n          <Value IncludeTimeValue=\"True\" Type=\"DateTime\">\n            " + allDayStartDate + "\n          </Value>\n        </Geq>\n      ";
    var allDayEndDateQuery = query.endDate
        ? "\n      <Lt>\n        <FieldRef Name=\"EventDate\" />\n        <Value IncludeTimeValue=\"True\" Type=\"DateTime\">\n          " + allDayEndDate + "\n        </Value>\n      </Lt>\n    "
        : '';
    if (endDateQuery) {
        return "\n      <Or>\n        <And>\n          <Eq>\n            <FieldRef Name=\"fAllDayEvent\" />\n            <Value Type=\"Boolean\">0</Value>\n          </Eq>\n          <And>\n            " + startDateQuery + "\n            " + endDateQuery + "\n          </And>\n        </And>\n        <And>\n          <Eq>\n            <FieldRef Name=\"fAllDayEvent\" />\n            <Value Type=\"Boolean\">1</Value>\n          </Eq>\n          <And>\n            " + allDayStartDateQuery + "\n            " + allDayEndDateQuery + "\n          </And>\n        </And>\n      </Or>\n      ";
    }
    else {
        return "\n      <Or>\n        <And>\n          <Eq>\n            <FieldRef Name=\"fAllDayEvent\" />\n            <Value Type=\"Boolean\">0</Value>\n          </Eq>\n          " + startDateQuery + "\n        </And>\n        <And>\n          <Eq>\n            <FieldRef Name=\"fAllDayEvent\" />\n            <Value Type=\"Boolean\">1</Value>\n          </Eq>\n          " + allDayStartDateQuery + "\n        </And>\n      </Or>";
    }
}
function buildFilterQuery(query, timeZone) {
    var categoryQuery = buildCategoryQuery(query);
    var startEndDateQuery = buildStartEndDateQuery(query, timeZone);
    if (categoryQuery) {
        return "\n      <And>\n        " + startEndDateQuery + "\n        " + categoryQuery + "\n      </And>\n    ";
    }
    else {
        return startEndDateQuery;
    }
}
function excludeRecurrenceEvents(query) {
    return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPFlight"].isEnabled(1634 /* SOXEventsQueryOptOutRecurrent*/)
        // This Neq query is work around for some sites having events with fRecurrence = null
        // @example https://icm.ad.msft.net/imp/v3/incidents/details/111662419/home
        ? "\n      <And>\n        " + query + "\n        <Neq>\n          <FieldRef Name=\"fRecurrence\" />\n          <Value Type=\"Boolean\">1</Value>\n        </Neq>\n      </And>\n    "
        : "\n      <And>\n        " + query + "\n        <Eq>\n          <FieldRef Name=\"fRecurrence\" />\n          <Value Type=\"Boolean\">0</Value>\n        </Eq>\n      </And>\n    ";
}
// tslint:disable-next-line:export-name
function buildCAMLQuery(query, timeZone) {
    // @todo 332365 Allow the caller to specify the request fields.
    return compact("\n    <View>\n      <ViewFields>\n        <FieldRef Name=\"Category\" />\n        <FieldRef Name=\"EndDate\" />\n        <FieldRef Name=\"EventDate\" />\n        <FieldRef Name=\"ID\" />\n        <FieldRef Name=\"Location\" />\n        <FieldRef Name=\"Title\" />\n        <FieldRef Name=\"fAllDayEvent\" />\n      </ViewFields>\n      <Query>\n        <Where>\n          " + excludeRecurrenceEvents(buildFilterQuery(query, timeZone)) + "\n        </Where>\n      </Query>\n      " + buildRowLimitQuery(query) + "\n    </View>\n  ");
}
/**
 * @param dateString The date string, e.g. 2018-09-27
 * @param timeZone The timeZone that user are using.
 *
 * @returns ISODateStringFormat.
 */
function convertToUTCDateISOString(dateString, timeZone) {
    var date = new Date(dateString);
    // When user type 2018-09-28 (2018-09-28T00:00:00.000Z), and the timezone that user are using is Pacific Time,
    // the offset is 480. The actual UTC date string should be 2018-09-27T16:00:00.000Z.
    // What we need to do is minus the timeZone.Offset.
    date.setMinutes(date.getMinutes() - timeZone.offset);
    return date.toISOString();
}


/***/ }),

/***/ "2Rre":
/*!**************************************************************!*\
  !*** ./lib/dataProviders/news/models/NewsDataProviderIds.js ***!
  \**************************************************************/
/*! exports provided: news, viewCounts, currentViewCounts, hubNews, newsDigest, multiSiteNews, myNews, staleViewCounts, managedProperties */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "news", function() { return news; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewCounts", function() { return viewCounts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentViewCounts", function() { return currentViewCounts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hubNews", function() { return hubNews; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newsDigest", function() { return newsDigest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiSiteNews", function() { return multiSiteNews; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "myNews", function() { return myNews; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staleViewCounts", function() { return staleViewCounts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "managedProperties", function() { return managedProperties; });
/**
 * @file NewsDataProviderIds.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */
/** @public */
var news = 'news';
/** @public */
var viewCounts = 'viewCounts';
/** @public */
var currentViewCounts = 'currentViewCounts';
/** @public */
var hubNews = 'hubNews';
/** @public */
var newsDigest = 'newsDigest';
/** @public */
var multiSiteNews = 'multiSiteNews';
/** @public */
var myNews = 'myNews';
/** @public */
var staleViewCounts = 'staleViewCounts';
// remove when managedPropertyDataProviderKS (1beb250b-56c1-4ce8-b8d8-7b3d5ef585f7) is graduated
/** @public */
var managedProperties = 'managedProperties';


/***/ }),

/***/ "2q6Q":
/*!***********************************!*\
  !*** external "@ms/sp-telemetry" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2q6Q__;

/***/ }),

/***/ "3p+P":
/*!***********************************************************!*\
  !*** ./lib/dataProviders/event/EventsListDataProvider.js ***!
  \***********************************************************/
/*! exports provided: EventsListDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsListDataProvider", function() { return EventsListDataProvider; });
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Strings_resx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Strings.resx */ "Rbn4");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// More error code from sporel: %SDXROOT%\sporel\projectserver\webproj\shared\Common\SPErrorCode.cs.
var EXPECTED_FAILURE_ERROR_CODE = [
    -2130575322,
    -2147024891 // Access denied.
];
/**
 * @internal
 */
var EventsListDataProvider = /** @class */ (function () {
    function EventsListDataProvider(serviceScope) {
        this._serviceScope = serviceScope;
    }
    EventsListDataProvider.prototype.getEventsLists = function () {
        var _this = this;
        return this._afterServiceScopeFinished()
            .then(function (_a) {
            var pageContext = _a.pageContext, httpClient = _a.httpClient;
            var webAbsoluteUrl = pageContext.web.absoluteUrl;
            var endpointUrl = webAbsoluteUrl + "/_api/web/Lists?$filter=BaseTemplate eq 106&$select=Id,Title";
            return httpClient.get(endpointUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1)
                .then(_this._parseResponse)
                .then(function (json) { return json.value; });
        });
    };
    EventsListDataProvider.prototype.ensureEventsList = function () {
        var _this = this;
        return this._afterServiceScopeFinished()
            .then(function (_a) {
            var pageContext = _a.pageContext, httpClient = _a.httpClient;
            var webAbsoluteUrl = pageContext.web.absoluteUrl;
            var endpointUrl = webAbsoluteUrl + "/_api/Lists/EnsureEventsList?$select=Title,Id";
            return httpClient.post(endpointUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, {})
                .then(_this._parseResponse);
        });
    };
    // @todo: VSO #368348 - Cache events permission check result to get better performance
    EventsListDataProvider.prototype.getEventsListPermission = function (listId) {
        var _this = this;
        if (!listId) {
            return Promise.resolve(undefined);
        }
        return this._afterServiceScopeFinished()
            .then(function (_a) {
            var pageContext = _a.pageContext, httpClient = _a.httpClient;
            var webAbsoluteUrl = pageContext.web.absoluteUrl;
            var url = webAbsoluteUrl + "/_api/web/Lists(guid'" + listId + "')/EffectiveBasePermissions";
            return httpClient.get(url, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1)
                .then(_this._parseResponse)
                .then(function (data) { return new _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0__["SPPermission"](data); })
                .catch(function (error) {
                EXPECTED_FAILURE_ERROR_CODE.forEach(function (errorCode) {
                    if (error.code.indexOf(String(errorCode)) !== -1) {
                        throw new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2__["ExpectedFailure"]("SPErrorCode_" + error.code, error.message, { correlationId: error.correlationId ? error.correlationId.toString() : undefined });
                    }
                });
                return Promise.reject(error);
            });
        });
    };
    EventsListDataProvider.prototype._afterServiceScopeFinished = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._serviceScope.whenFinished(function () {
                resolve({
                    pageContext: _this._serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0__["PageContext"].serviceKey),
                    httpClient: _this._serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].serviceKey)
                });
            });
        });
    };
    EventsListDataProvider.prototype._parseResponse = function (response) {
        if (response.status >= 200 && response.status < 300) {
            if (response.status === 204) { // 204 No Content
                return Promise.resolve();
            }
            else {
                return response.json();
            }
        }
        else {
            return response.json()
                .then(function (result) {
                var responseError = result.error || {
                    code: 'UnknownErrorCode',
                    message: _Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].UnknownErrorMessage
                };
                var eventError = {
                    correlationId: response.correlationId,
                    httpStatus: response.status,
                    code: responseError.code,
                    message: typeof responseError.message === 'string'
                        ? responseError.message
                        : responseError.message.value
                };
                throw eventError;
            });
        }
    };
    __decorate([
        Object(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2__["monitor"])('EventDataProvider.GetEventsLists')
    ], EventsListDataProvider.prototype, "getEventsLists", null);
    __decorate([
        Object(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2__["monitor"])('EventDataProvider.EnsureEventsList')
    ], EventsListDataProvider.prototype, "ensureEventsList", null);
    __decorate([
        Object(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2__["monitor"])('EventDataProvider.GetEventsListPermission')
    ], EventsListDataProvider.prototype, "getEventsListPermission", null);
    return EventsListDataProvider;
}());



/***/ }),

/***/ "3smo":
/*!******************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/spfx-tools/loader-cased-file/lib?name=icon_[name:lower]_[hash:8].[ext]!./lib/dataProviders/news/assets/helpitemimg1.png ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "icon_helpitemimg1_c0dba21d.png";

/***/ }),

/***/ "5qZt":
/*!**********************************************************!*\
  !*** ./lib/dataProviders/news/NewsSearchDataProvider.js ***!
  \**********************************************************/
/*! exports provided: NewsSearchDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsSearchDataProvider", function() { return NewsSearchDataProvider; });
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities/NewsUtilities */ "JpAn");
/* harmony import */ var _search_enums_SearchAPISortDirection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../search/enums/SearchAPISortDirection */ "zDft");
/* harmony import */ var _search_SearchDataProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../search/SearchDataProvider */ "dU3L");
// @copyright (c) Microsoft Corporation. All rights reserved.
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




/**
 * @internal
 */
var NewsSearchDataProvider = /** @class */ (function (_super) {
    __extends(NewsSearchDataProvider, _super);
    function NewsSearchDataProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewsSearchDataProvider._requestNewsData = function (options) {
        var sitePageContentTypeId = '0x0101009D1CB255DA76424F860D91F20E6C4118';
        var ctAndPromotedState = "ContentTypeId:" + sitePageContentTypeId + "* AND PromotedState:2";
        var queryTemplate = [];
        if (!options.uniqueIdGuids) {
            queryTemplate.push("{searchterms} " + ctAndPromotedState);
        }
        else {
            // To keep the search request small (due to limit of characters),
            // only requesting UniqueIds across all sites on the entire tenant
            // NewsWebPart._refreshPinnedItemMetadata desambiguates and picks
            // the correct one based on SiteId, WebId, ListId and UniqueId
            queryTemplate.push(ctAndPromotedState + " AND (");
            options.uniqueIdGuids.forEach((function (guid, index) {
                if (index === 0) {
                    queryTemplate.push("UniqueID:" + guid.toString());
                }
                else {
                    queryTemplate.push(" OR UniqueID:" + guid.toString());
                }
                queryTemplate.push(" OR UniqueID:{" + guid.toString() + "}");
            }));
            queryTemplate.push(")");
        }
        return NewsSearchDataProvider._request(options, queryTemplate.join());
    };
    NewsSearchDataProvider._request = function (options, queryTemplate) {
        var dataProvider = new NewsSearchDataProvider({ serviceScope: options.serviceScope });
        return dataProvider.requestData({
            searchOptions: {
                query: {
                    contentLocation: options.contentLocation
                }
            },
            searchAPIQueryOptions: {
                Properties: [
                    { Name: 'EnableDynamicGroups', Value: { BoolVal: true, QueryPropertyValueTypeIndex: 3 } },
                    { Name: 'EnableMultiGeoSearch', Value: { BoolVal: true, QueryPropertyValueTypeIndex: 3 } }
                ],
                Querytext: options.searchText || '',
                QueryTemplate: queryTemplate,
                RowLimit: options.rowLimit,
                SelectProperties: [
                    'CreatedBy',
                    'AuthorOWSUSER',
                    'Description',
                    'PictureThumbnailURL',
                    'FirstPublishedDate',
                    'Title',
                    'FileName',
                    'ListItemId',
                    'OriginalPath',
                    'Path',
                    'SiteTitle',
                    'SPSiteURL',
                    'SPWebUrl',
                    'ViewCountLifetime',
                    'UniqueID',
                    'SiteID',
                    'WebId',
                    'ListId'
                ],
                SortList: [
                    { Property: 'LastModifiedTime', Direction: _search_enums_SearchAPISortDirection__WEBPACK_IMPORTED_MODULE_2__["SearchAPISortDirection"].descending }
                ],
                StartRow: options.startRow,
                TrimDuplicates: true
            }
        });
    };
    NewsSearchDataProvider.prototype._mapResponse = function (searchResult) {
        var result = _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_1__["NewsUtilities"].extractNewsItemsFromSearch(searchResult.rows, this._pageContext);
        return Promise.resolve(result);
    };
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["autobind"]
    ], NewsSearchDataProvider.prototype, "_mapResponse", null);
    return NewsSearchDataProvider;
}(_search_SearchDataProvider__WEBPACK_IMPORTED_MODULE_3__["SearchDataProvider"]));



/***/ }),

/***/ "78D3":
/*!***************************************************************!*\
  !*** ./lib/dataProviders/page/WPDataExtractorDataProvider.js ***!
  \***************************************************************/
/*! exports provided: _getWebPartDataFromPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getWebPartDataFromPage", function() { return _getWebPartDataFromPage; });
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PageMetadataProviderLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageMetadataProviderLoader */ "/Lye");


/**
 * Gets the serialized information stored in a webpart
 * @internal
 */
// tslint:disable-next-line:export-name
function _getWebPartDataFromPage(props) {
    // tslint:disable-next-line:max-line-length
    var pageRelativeUrl = props.pageRelativeUrl, webPartInstanceId = props.webPartInstanceId, componentName = props.componentName, webPartAlias = props.webPartAlias, defaultWebPartData = props.defaultWebPartData, serviceScope = props.serviceScope, processWebPartDataCallback = props.processWebPartDataCallback;
    var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"](componentName + ".ParseWebPartDataFromPage");
    var dataProviderOptions = { serviceScope: serviceScope };
    var pageDataProvider = _PageMetadataProviderLoader__WEBPACK_IMPORTED_MODULE_1__["PageMetadataProviderLoader"].load(dataProviderOptions);
    // tslint:disable-next-line:max-line-length
    return pageDataProvider.then(function (dataProvider) {
        return dataProvider.requestData({ pageRelativeUrl: pageRelativeUrl });
    }).then(function (response) {
        var firstResponse = response[0];
        var legacyResponseKey = 'CanvasJson1';
        var jsonToParse = firstResponse[legacyResponseKey] || firstResponse;
        if (!jsonToParse) {
            _handleStockContent(qosMonitor, webPartAlias);
        }
        // Having ICanvasControl here, limits the option of using
        // sp-dataproviders, using any for now.
        // @todo Link to the bug: https://onedrive.visualstudio.com/CSI/_workitems/edit/794727
        return JSON.parse(jsonToParse); // tslint:disable-line:no-any
    }).then(function (canvasControls) {
        return _getWebPartByUniqueId(webPartInstanceId, canvasControls);
    }).then(function (control) {
        var webPartData;
        if (control) {
            webPartData = control.webPartData; // tslint:disable-line:no-any
        }
        if (webPartData) {
            webPartData.instanceId = webPartInstanceId;
            if (processWebPartDataCallback) {
                webPartData = processWebPartDataCallback(webPartData);
            }
            qosMonitor.writeSuccess(_logData(webPartAlias));
        }
        else {
            var noInstanceError = new Error('NoInstanceDataFound');
            qosMonitor.writeUnexpectedFailure(noInstanceError.message, noInstanceError, _logData(webPartAlias));
            throw noInstanceError;
        }
        return webPartData;
    }).catch(function (ex) {
        if (!qosMonitor.hasEnded) {
            qosMonitor.writeUnexpectedFailure('FailedToParse', ex, _logData(webPartAlias));
        }
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__["_EngagementLogger"].logEvent(componentName + ".LoadDefaultWebPartData");
        return defaultWebPartData;
    }).then(function (webPartData) { return webPartData; });
}
function _getWebPartByUniqueId(webPartUniqueId, canvasControls // tslint:disable-line:no-any
) {
    if (canvasControls) {
        for (var _i = 0, canvasControls_1 = canvasControls; _i < canvasControls_1.length; _i++) {
            var control = canvasControls_1[_i];
            if (control.id === webPartUniqueId) {
                return control;
            }
        }
    }
    return undefined;
}
function _logData(webPartAlias) {
    return { 'webpart': webPartAlias };
}
function _handleStockContent(qosMonitor, webPartAlias) {
    var stockContentError = new Error('StockContent');
    qosMonitor.writeExpectedFailure(stockContentError.message, stockContentError, _logData(webPartAlias));
    throw stockContentError;
}


/***/ }),

/***/ "7REe":
/*!**************************************************************!*\
  !*** ./lib/dataProviders/viewcount/ViewCountDataProvider.js ***!
  \**************************************************************/
/*! exports provided: ViewCountDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewCountDataProvider", function() { return ViewCountDataProvider; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_sp_home_http_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-home-http-client */ "+1B/");
/* harmony import */ var _ms_sp_home_http_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_home_http_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _SearchViewCountDataProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SearchViewCountDataProvider */ "B5tG");




var viewCountsQOSName = 'ExchangeViewCountsFetch';
var viewCountsQOSFallbackName = 'ExchangeViewCountsFetchSearchFallback';
var viewCountsThroughSearchQOSName = 'SearchViewCountsFetch';
var viewCountsThroughSearchQOSNameFailed = 'SearchViewCountsFetchFailed';
/**
 * @internal
 */
var ViewCountDataProvider = /** @class */ (function () {
    function ViewCountDataProvider(serviceScope) {
        var _this = this;
        serviceScope.whenFinished(function () {
            _this._sphomeHttpClient = serviceScope.consume(_ms_sp_home_http_client__WEBPACK_IMPORTED_MODULE_1__["SPHomeHttpClient"].serviceKey);
            _this._searchViewCountDataProvider = new _SearchViewCountDataProvider__WEBPACK_IMPORTED_MODULE_3__["SearchViewCountDataProvider"]({ serviceScope: serviceScope });
        });
    }
    ViewCountDataProvider.prototype.getViewCounts = function (items) {
        var _this = this;
        if (  false || items.length === 0) {
            return Promise.resolve([]);
        }
        var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"](viewCountsQOSName);
        var body = this._requestForItem(items);
        return this._sphomeHttpClient.post('documents/metadata', JSON.stringify(body))
            .then(function (response) { return response.json(); })
            .then(function (responseJson) {
            qosMonitor.writeSuccess();
            return items.map(function (item) { return _this._addMicroserviceViewCount(item, responseJson.Items); });
        }).catch(function (error) {
            qosMonitor.writeUnexpectedFailure(viewCountsQOSFallbackName, error);
            return _this._fallbackToSearch(items);
        });
    };
    ViewCountDataProvider.prototype._addMicroserviceViewCount = function (item, response) {
        var _this = this;
        var matchedResponse = response.filter(function (serverItem) {
            return _this._guidEquals(serverItem.Site.ItemReference.SiteId, item.siteId) &&
                _this._guidEquals(serverItem.Site.ItemReference.WebId, item.webId) &&
                _this._guidEquals(serverItem.UniqueId, item.uniqueId);
        })[0];
        if (matchedResponse && matchedResponse.Views !== undefined) {
            item.viewCount = matchedResponse.Views;
        }
        return item;
    };
    ViewCountDataProvider.prototype._addSearchViewCount = function (item, response) {
        var _this = this;
        var matchedResponse = response.filter(function (serverItem) {
            return _this._guidEquals(serverItem.siteId, item.siteId) &&
                _this._guidEquals(serverItem.webId, item.webId) &&
                _this._guidEquals(serverItem.uniqueId, item.uniqueId);
        })[0];
        if (matchedResponse && matchedResponse.viewCount !== undefined) {
            item.viewCount = Number(matchedResponse.viewCount);
        }
        return item;
    };
    ViewCountDataProvider.prototype._buildSearchQuery = function (items) {
        var sitePageContentTypeId = '0x0101009D1CB255DA76424F860D91F20E6C4118';
        return ("ContentTypeId:" + sitePageContentTypeId + "* AND (" +
            items.map(function (item) {
                return "(ListItemId:" + item.listItemId + " AND WebId:" + item.webId + " AND SiteId:" + item.siteId + ")";
            }).join(' OR ') +
            ')');
    };
    ViewCountDataProvider.prototype._fallbackToSearch = function (items) {
        var _this = this;
        var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"](viewCountsThroughSearchQOSName);
        return this._searchViewCountDataProvider
            .requestData({
            searchAPIQueryOptions: {
                QueryTemplate: this._buildSearchQuery(items),
                RowLimit: items.length,
                SelectProperties: [
                    'UniqueID',
                    'SiteID',
                    'WebId',
                    'ListItemId',
                    'ViewCountLifetime'
                ],
                TrimDuplicates: true
            }
        }).then(function (results) {
            qosMonitor.writeSuccess();
            return items.map(function (item) { return _this._addSearchViewCount(item, results); });
        }).catch(function (error) {
            // If something fails, let's silently log the error
            qosMonitor.writeUnexpectedFailure(viewCountsThroughSearchQOSNameFailed, error);
            return Promise.resolve([]);
        });
    };
    ViewCountDataProvider.prototype._guidEquals = function (firstGuidString, secondGuidString) {
        var firstGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(firstGuidString);
        var secondGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(secondGuidString);
        return firstGuid && secondGuid && firstGuid.equals(secondGuid);
    };
    ViewCountDataProvider.prototype._requestForItem = function (items) {
        return [].concat.apply([], items.map(function (item) {
            return [{
                    'Site': {
                        'ItemReference': {
                            'SiteId': item.siteId,
                            'WebId': item.webId,
                            'Type': 'SiteReference'
                        },
                        'Type': 'Site'
                    },
                    'Library': {
                        'ListId': item.listId,
                        'Type': 'Library'
                    },
                    'UniqueId': item.uniqueId,
                    'Type': 'Document'
                }, {
                    'Site': {
                        'ItemReference': {
                            'SiteId': item.siteId,
                            'WebId': item.webId,
                            'Type': 'GroupReference'
                        },
                        'Type': 'Site'
                    },
                    'Library': {
                        'ListId': item.listId,
                        'Type': 'Library'
                    },
                    'UniqueId': item.uniqueId,
                    'Type': 'Document'
                }];
        }));
    };
    ViewCountDataProvider.serviceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["ServiceKey"].create('sp-dataproviders:ViewCountDataProvider', ViewCountDataProvider);
    return ViewCountDataProvider;
}());



/***/ }),

/***/ "7dHj":
/*!**************************************************!*\
  !*** ./lib/dataProviders/page/PageDataSource.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_sp_base_data_source__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-base-data-source */ "9iOe");
/* harmony import */ var _ms_sp_base_data_source__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_base_data_source__WEBPACK_IMPORTED_MODULE_1__);
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
 * @internal
 */
var PageDataSource = /** @class */ (function (_super) {
    __extends(PageDataSource, _super);
    function PageDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageDataSource.prototype.getPageJsonBlob = function (webAbsoluteUrl, pageUrl, queryString) {
        return this.get(webAbsoluteUrl, "_api/sitepages/pages/GetByUrl('" + _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["UriEncoding"].encodeRestUriStringToken(pageUrl) + "')", queryString, 'PageDataSource', 'getPageJsonBlob')
            .then(function (jsonData) { return [jsonData]; });
    };
    PageDataSource.prototype.getPageCanvasContent = function (relativePageUrl) {
        return this.get('/', // baseEndPoint
        relativePageUrl, // apiRelativePath
        'asjson=1', // backfill query to avoid Chrome caching JSON as regular page response
        'PageDataSource', // dataSourceName
        'getPageCanvasContent') // dataSourceMethodName
            .then(function (jsonData) { return jsonData.page.Content.CanvasContent1; });
    };
    return PageDataSource;
}(_ms_sp_base_data_source__WEBPACK_IMPORTED_MODULE_1__["SPDataSource"]));
/* harmony default export */ __webpack_exports__["default"] = (PageDataSource);


/***/ }),

/***/ "7gDu":
/*!*************************************************************!*\
  !*** ./lib/dataProviders/page/TemplatePanelDataProvider.js ***!
  \*************************************************************/
/*! exports provided: TemplatePanelDataSource, TemplateSelectedPageCopyDataSource, TemplateSelectedPageAsJsonDataSource, TemplatePanelDataProvider, TemplatePanelSelectedPageCopyDataProvider, TemplatePanelSelectedPageAsJsonDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplatePanelDataSource", function() { return TemplatePanelDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateSelectedPageCopyDataSource", function() { return TemplateSelectedPageCopyDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateSelectedPageAsJsonDataSource", function() { return TemplateSelectedPageAsJsonDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplatePanelDataProvider", function() { return TemplatePanelDataProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplatePanelSelectedPageCopyDataProvider", function() { return TemplatePanelSelectedPageCopyDataProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplatePanelSelectedPageAsJsonDataProvider", function() { return TemplatePanelSelectedPageAsJsonDataProvider; });
/* harmony import */ var _ms_sp_base_data_source__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-base-data-source */ "9iOe");
/* harmony import */ var _ms_sp_base_data_source__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_base_data_source__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BaseDataProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseDataProvider */ "L/SE");
/**
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


/**
 * @internal
 */
var TemplatePanelDataSource = /** @class */ (function (_super) {
    __extends(TemplatePanelDataSource, _super);
    function TemplatePanelDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TemplatePanelDataSource.prototype.getPages = function (webAbsoluteUrl) {
        return this.get(webAbsoluteUrl, '_api/sitepages/pages/templates', 'asjson=1', 'TemplatePanelDataSource', 'getPages')
            .then(this._getDataArray);
    };
    TemplatePanelDataSource.prototype._getDataArray = function (jsonData) {
        return [jsonData];
    };
    return TemplatePanelDataSource;
}(_ms_sp_base_data_source__WEBPACK_IMPORTED_MODULE_0__["SPDataSource"]));

/**
 * @internal
 */
var TemplateSelectedPageCopyDataSource = /** @class */ (function (_super) {
    __extends(TemplateSelectedPageCopyDataSource, _super);
    function TemplateSelectedPageCopyDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TemplateSelectedPageCopyDataSource.prototype.getPage = function (webAbsoluteUrl, id) {
        return this.get(webAbsoluteUrl, "_api/sitepages/pages(" + id + ")", '$select=CanvasContent1,LayoutWebpartsContent', 'TemplateCopyDataSource', 'getPage')
            .then(this._getDataArray);
    };
    TemplateSelectedPageCopyDataSource.prototype._getDataArray = function (jsonData) {
        return [jsonData];
    };
    return TemplateSelectedPageCopyDataSource;
}(_ms_sp_base_data_source__WEBPACK_IMPORTED_MODULE_0__["SPDataSource"]));

/**
 * @internal
 */
var TemplateSelectedPageAsJsonDataSource = /** @class */ (function (_super) {
    __extends(TemplateSelectedPageAsJsonDataSource, _super);
    function TemplateSelectedPageAsJsonDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TemplateSelectedPageAsJsonDataSource.prototype.getPage = function (pageAbsoluteUrl) {
        return this.get(pageAbsoluteUrl, '', 'as=json', 'TemplateSelectedPageAsJsonDataSource', 'getPage')
            .then(this._getDataArray);
    };
    TemplateSelectedPageAsJsonDataSource.prototype._getDataArray = function (jsonData) {
        return [jsonData];
    };
    return TemplateSelectedPageAsJsonDataSource;
}(_ms_sp_base_data_source__WEBPACK_IMPORTED_MODULE_0__["SPDataSource"]));

/**
 * @internal
 */
var TemplatePanelDataProvider = /** @class */ (function (_super) {
    __extends(TemplatePanelDataProvider, _super);
    function TemplatePanelDataProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 'PageTemplates';
        _this.title = 'Template Data Provider';
        return _this;
    }
    TemplatePanelDataProvider.prototype.getItems = function (request) {
        if (!this._templatePanelDataSource) {
            this._templatePanelDataSource = new TemplatePanelDataSource({ spHttpClient: this.spHttpClient });
        }
        return this._templatePanelDataSource.getPages(request.webAbsoluteUrl);
    };
    return TemplatePanelDataProvider;
}(_BaseDataProvider__WEBPACK_IMPORTED_MODULE_1__["BaseDataProvider"]));

/**
 * @internal
 */
var TemplatePanelSelectedPageCopyDataProvider = /** @class */ (function (_super) {
    __extends(TemplatePanelSelectedPageCopyDataProvider, _super);
    function TemplatePanelSelectedPageCopyDataProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 'PageTemplatesCopy';
        _this.title = 'Template Copy Data Provider';
        return _this;
    }
    TemplatePanelSelectedPageCopyDataProvider.prototype.getItems = function (request) {
        if (!this._templateSelectedPageCopyDataSource) {
            this._templateSelectedPageCopyDataSource =
                new TemplateSelectedPageCopyDataSource({ spHttpClient: this.spHttpClient });
        }
        return this._templateSelectedPageCopyDataSource.getPage(request.webAbsoluteUrl, request.page.Id);
    };
    return TemplatePanelSelectedPageCopyDataProvider;
}(_BaseDataProvider__WEBPACK_IMPORTED_MODULE_1__["BaseDataProvider"]));

/**
 * @internal
 */
var TemplatePanelSelectedPageAsJsonDataProvider = /** @class */ (function (_super) {
    __extends(TemplatePanelSelectedPageAsJsonDataProvider, _super);
    function TemplatePanelSelectedPageAsJsonDataProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 'PageTemplatesAsJson';
        _this.title = 'Template As Json Data Provider';
        return _this;
    }
    TemplatePanelSelectedPageAsJsonDataProvider.prototype.getItems = function (request) {
        if (!this._templateSelectedPageAsJsonDataSource) {
            this._templateSelectedPageAsJsonDataSource =
                new TemplateSelectedPageAsJsonDataSource({ spHttpClient: this.spHttpClient });
        }
        return this._templateSelectedPageAsJsonDataSource.getPage(request.page.AbsoluteUrl);
    };
    return TemplatePanelSelectedPageAsJsonDataProvider;
}(_BaseDataProvider__WEBPACK_IMPORTED_MODULE_1__["BaseDataProvider"]));



/***/ }),

/***/ "8GMp":
/*!*****************************************************!*\
  !*** ./lib/dataProviders/search/SearchUtilities.js ***!
  \*****************************************************/
/*! exports provided: sanitizeSearchQueryParameter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sanitizeSearchQueryParameter", function() { return sanitizeSearchQueryParameter; });
// Copyright (c) Microsoft Corporation. All rights reserved.
/**
 * @internal
 * This function is used to sanitize parameters that used for search.
 * There are some characters that search is not supported as described in the doc:
 * https://docs.microsoft.com/en-us/sharepoint/dev/general-development/keyword-query-language-kql-syntax-reference
 * @param value - The value of the parameter for search query.
 */
// tslint:disable-next-line:export-name
function sanitizeSearchQueryParameter(value) {
    if (!value) {
        return '';
    }
    // Spacial character * means prefix matching, which must not have any content after it.
    // Spacial characters {, }, " need to be in pairs in query template.
    // Query template contains only one of them is invalid.
    var charactersInvalidateQueryTemplate = '[*{}"]';
    var regex = new RegExp(charactersInvalidateQueryTemplate, 'g');
    return value.replace(regex, ' ');
}


/***/ }),

/***/ "8xPP":
/*!****************************************************************!*\
  !*** ./lib/dataProviders/location/BingLocationDataProvider.js ***!
  \****************************************************************/
/*! exports provided: BingLocationDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BingLocationDataProvider", function() { return BingLocationDataProvider; });
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__);
// @copyright (c) Microsoft Corporation. All rights reserved.





var LOCATION_SUGGESTIONS_COUNT = 5;
var BING_API_APPID = 'DEFC13FBC2E876A56E00AD5BDB9B690CD6B55B16';
var AUTO_SUGGEST_ENDPOINT = 'https://www.bingapis.com/api/v6/Places/AutoSuggest';
var BINGMAP_KEY = 'AmOSPT8X9eXz5u_8hQauiEyLHFJOG522w2XBbewYRhDtcEAUpsVIbvpApHbDAtyA';
var LOCATION_ENDPOINT = 'https://dev.virtualearth.net/REST/v1/Locations';
/**
* Provides a location data provider from the Bing API.
* @internal
*/
var BingLocationDataProvider = /** @class */ (function () {
    function BingLocationDataProvider(options) {
        this._httpClient = options.serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"].serviceKey);
        this._cultureName = options.serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__["PageContext"].serviceKey).cultureInfo.currentUICultureName;
        this._qosPrefix = options.qosPrefix;
    }
    BingLocationDataProvider.prototype.getLocationSuggestions = function (location, suggestionsCount) {
        if (suggestionsCount === void 0) { suggestionsCount = LOCATION_SUGGESTIONS_COUNT; }
        var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__["_QosMonitor"](this._qosPrefix + ".BingLocationDataProvider.GetLocationSuggestions");
        var uri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["Uri"](AUTO_SUGGEST_ENDPOINT);
        uri.setQueryParameter('q', location);
        uri.setQueryParameter('appid', BING_API_APPID);
        uri.setQueryParameter('structuredaddress', 'true');
        uri.setQueryParameter('setmkt', this._cultureName);
        uri.setQueryParameter('setlang', this._cultureName);
        uri.setQueryParameter('count', String(suggestionsCount));
        // Currently there's a problem with China and Japan locations, so hard code below query to mitigate the issue.
        if (this._cultureName.toLowerCase() === 'zh-cn') {
            uri.setQueryParameter('localmapview', '40.173091266970914,116.1689437866211,39.68604237738654,116.63105621337891');
            uri.setQueryParameter('localcircularview', '39.9295,116.4,100');
        }
        else if (this._cultureName.toLowerCase() === 'ja-jp') {
            uri.setQueryParameter('localmapview', '36.266035662679684,139.24756548070306,35.10266624641582,140.5796577658593');
            uri.setQueryParameter('localcircularview', '39.9785614013672,116.308280944824,100');
        }
        return this._httpClient.get(uri.toString(), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"].configurations.v1)
            .catch(function (error) { return Promise.reject(new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_3__["UnexpectedFailure"]('NetworkError', error)); })
            .then(this._parseResponse)
            .then(function (response) {
            if (response && response.value) {
                qosMonitor.writeSuccess();
                return response.value.filter(function (bingLocation) { return bingLocation.address; });
            }
            else {
                qosMonitor.writeUnexpectedFailure('BingLocationDataProvider: value data does not exist in response.');
            }
        });
    };
    BingLocationDataProvider.prototype.getLocationInfo = function (location, maxResult) {
        if (maxResult === void 0) { maxResult = 1; }
        var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__["_QosMonitor"](this._qosPrefix + ".BingLocationDataProvider.GetLocationInfo");
        var uri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["Uri"](LOCATION_ENDPOINT);
        uri.setQueryParameter('query', location);
        uri.setQueryParameter('o', 'json');
        uri.setQueryParameter('c', this._cultureName);
        uri.setQueryParameter('maxResults', maxResult.toString());
        uri.setQueryParameter('key', BINGMAP_KEY);
        return this._httpClient.get(uri.toString(), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"].configurations.v1)
            .catch(function (error) {
            qosMonitor.writeUnexpectedFailure('BingLocationDataProvider.getLocationInfo: network error.');
            return Promise.reject(new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_3__["UnexpectedFailure"]('NetworkError', error));
        })
            .then(this._parseResponse)
            .then(function (response) {
            try {
                var bingMapLocationList = response.resourceSets[0].resources.map(function (resource) { return ({
                    name: resource.name,
                    coordinates: {
                        latitude: resource.point.coordinates[0],
                        longitude: resource.point.coordinates[1]
                    }
                }); });
                qosMonitor.writeSuccess();
                return bingMapLocationList;
            }
            catch (error) {
                qosMonitor.writeUnexpectedFailure('BingLocationDataProvider.getLocationInfo: invalid response.');
                return Promise.reject(error);
            }
        });
    };
    BingLocationDataProvider.prototype._parseResponse = function (response) {
        if (response.ok) {
            return response.json()
                .catch(function (error) { return Promise.reject(new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_3__["UnexpectedFailure"]('FailedToParseResponse', error, { statusCode: response.status })); });
        }
        else {
            return response.json()
                .catch(function (error) { return Promise.reject(new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_3__["UnexpectedFailure"]('FailedToParseError', error, { statusCode: response.status })); })
                .then(function (error) { return Promise.reject(new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_3__["UnexpectedFailure"]('RequestFailure', JSON.stringify(error), { statusCode: response.status })); });
        }
    };
    return BingLocationDataProvider;
}());



/***/ }),

/***/ "9iOe":
/*!******************************************!*\
  !*** external "@ms/sp-base-data-source" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9iOe__;

/***/ }),

/***/ "A8lX":
/*!****************************************************!*\
  !*** ./lib/dataProviders/list/loc/Strings.resx.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_FwR/TcOLpUrNV4IF1KFk6Q';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "AOs8":
/*!****************************************************!*\
  !*** ./lib/dataProviders/news/loc/Strings.resx.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_wlHX5Qmt7B5I/LejUjEhdw';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "B5tG":
/*!********************************************************************!*\
  !*** ./lib/dataProviders/viewcount/SearchViewCountDataProvider.js ***!
  \********************************************************************/
/*! exports provided: SearchViewCountDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchViewCountDataProvider", function() { return SearchViewCountDataProvider; });
/* harmony import */ var _search_SearchDataProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../search/SearchDataProvider */ "dU3L");
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
 * @internal
 */
var SearchViewCountDataProvider = /** @class */ (function (_super) {
    __extends(SearchViewCountDataProvider, _super);
    function SearchViewCountDataProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchViewCountDataProvider.prototype._mapResponse = function (searchResult) {
        return Promise.resolve(searchResult.rows.map(function (row) {
            return {
                listItemId: row.ListItemId,
                siteId: row.SiteID,
                webId: row.WebId,
                uniqueId: row.UniqueID,
                viewCount: row.ViewCountLifetime
            };
        }));
    };
    return SearchViewCountDataProvider;
}(_search_SearchDataProvider__WEBPACK_IMPORTED_MODULE_0__["SearchDataProvider"]));



/***/ }),

/***/ "BDTi":
/*!*****************************************************!*\
  !*** ./lib/dataProviders/likes/LikeDataProvider.js ***!
  \*****************************************************/
/*! exports provided: LikeDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LikeDataProvider", function() { return LikeDataProvider; });
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__);



/**
 * @public
 */
var LikeDataProvider = /** @class */ (function () {
    function LikeDataProvider(spHttpClient) {
        this._spHttpClient = spHttpClient;
    }
    LikeDataProvider._getPageUrl = function (likeRequest) {
        var siteUrl = likeRequest.siteUrl, listId = likeRequest.listId, listItemId = likeRequest.listItemId;
        return _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["Uri"].concatenate(siteUrl || '', "/_api/web/lists('" + listId + "')", "/GetItemById(" + listItemId + ")");
    };
    LikeDataProvider.prototype.isPageLikedByUser = function (likeRequest) {
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('IsPageLikedByUser');
        var pageUrl = LikeDataProvider._getPageUrl(likeRequest);
        return this._getPageUserLikes(pageUrl)
            .then(function (likeChunk) {
            qosMonitor.writeSuccess();
            return likeChunk && likeChunk.isLikedByUser;
        })
            .catch(function (error) {
            qosMonitor.writeUnexpectedFailure('Unexpected', error);
            return Promise.reject(false);
        });
    };
    LikeDataProvider.prototype.likePage = function (likeRequest) {
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('LikePageAPI');
        var pageUrl = LikeDataProvider._getPageUrl(likeRequest);
        return this._likePageRequest(pageUrl)
            .then(function (response) { return response.ok; })
            .then(function () { return qosMonitor.writeSuccess(); })
            .catch(function (error) {
            qosMonitor.writeUnexpectedFailure('LikePageAPIFailed', error);
            return Promise.reject(error);
        });
    };
    LikeDataProvider.prototype.unlikePage = function (likeRequest) {
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('UnlikePageAPI');
        var pageUrl = LikeDataProvider._getPageUrl(likeRequest);
        return this._unlikePageRequest(pageUrl)
            .then(function (response) { return response.ok; })
            .then(function () { return qosMonitor.writeSuccess(); })
            .catch(function (error) {
            qosMonitor.writeUnexpectedFailure('UnlikePageAPIFailed', error);
            return Promise.reject(error);
        });
    };
    LikeDataProvider.prototype._likePageRequest = function (pageUrl) {
        return this._toggleLikePageRequest(pageUrl, true);
    };
    LikeDataProvider.prototype._toggleLikePageRequest = function (pageUrl, isLike) {
        return this._spHttpClient.post(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["Uri"].concatenate(pageUrl, isLike ? '/like' : '/unlike'), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, {});
    };
    LikeDataProvider.prototype._unlikePageRequest = function (pageUrl) {
        return this._toggleLikePageRequest(pageUrl, false);
    };
    LikeDataProvider.prototype._getPageUserLikes = function (pageUrl) {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('GetPageUserLike');
        return this._getPageLikesRequest(pageUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            var likeChunk = _this._convertServerLikesResponse(json);
            qosMonitor.writeSuccess();
            return likeChunk;
        }).catch(function (error) {
            qosMonitor.writeUnexpectedFailure('GetPageUserLikeFailed', error);
            return Promise.reject(error);
        });
    };
    LikeDataProvider.prototype._getPageLikesRequest = function (pageUrl) {
        var pageLikesWithCount = '/likedByInformation?$expand=likedby&$top=1';
        return this._spHttpClient.get(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["Uri"].concatenate(pageUrl, pageLikesWithCount), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1);
    };
    LikeDataProvider.prototype._convertServerLikesResponse = function (response) {
        return !response || !response.likedBy ? undefined : {
            count: response.likeCount || 0,
            likes: response.likedBy,
            isLikedByUser: response.isLikedByUser,
            nextLink: response['likedBy@odata.nextLink']
        };
    };
    return LikeDataProvider;
}());



/***/ }),

/***/ "EEym":
/*!***********************************************************************!*\
  !*** ./lib/dataProviders/Topics/TopicSuggestionSearchDataProvider.js ***!
  \***********************************************************************/
/*! exports provided: TopicSuggestionSearchDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopicSuggestionSearchDataProvider", function() { return TopicSuggestionSearchDataProvider; });
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__);
/**
 * @copyright (c) Microsoft Corporation.  All rights reserved.
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




var TOPIC_SUGGESTION_SEARCH_API_URL = 'knowledgebase/entities/suggestions(query=\'{0}\',lcid={1},count={2})';
var VERSION_NUMBER = 2;
var SP_HOME_HTTP_CLIENT_COMPONENT_ID = '3157040b-4feb-40c4-9fe5-ec3b41d679ff';
var ERROR_MESSAGE = 'Invalid argument languageId or count';
/**
 * This class retrieves Topic suggestions of an specific query from the API.
 */
/**
 *  @internal
 */
var TopicSuggestionSearchDataProvider = /** @class */ (function () {
    function TopicSuggestionSearchDataProvider(serviceScope) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(serviceScope, 'serviceScope');
        this._serviceScope = serviceScope;
        this._spHomeHttpClientPromise = this._loadSPHomeHttpClient();
    }
    TopicSuggestionSearchDataProvider.prototype.getTopicSuggestions = function (queryString, languageId, count) {
        return __awaiter(this, void 0, void 0, function () {
            var qosMonitor, formatedUrl;
            var _this = this;
            return __generator(this, function (_a) {
                qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"](TopicSuggestionSearchDataProvider._qosTag);
                if (languageId.length === 0 || count < 1) {
                    qosMonitor.writeUnexpectedFailure(TopicSuggestionSearchDataProvider._qosTag, new Error(ERROR_MESSAGE));
                    throw new Error(ERROR_MESSAGE);
                }
                formatedUrl = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(TOPIC_SUGGESTION_SEARCH_API_URL, queryString, languageId, count);
                return [2 /*return*/, this._spHomeHttpClientPromise.then(function (spHomeHttpClient) {
                        return spHomeHttpClient.get(formatedUrl, VERSION_NUMBER)
                            .then(function (response) {
                            if (response.ok) {
                                qosMonitor.writeSuccess();
                                _this._topicSuggestionData = response.json();
                                return _this._topicSuggestionData;
                            }
                            else {
                                var error = new Error(response.statusText + response.status);
                                qosMonitor.writeUnexpectedFailure(TopicSuggestionSearchDataProvider._qosTag, error);
                                throw error;
                            }
                        });
                    })
                        .catch(function (error) {
                        qosMonitor.writeUnexpectedFailure(TopicSuggestionSearchDataProvider._qosTag, error);
                        return Promise.reject(error);
                    })];
            });
        });
    };
    TopicSuggestionSearchDataProvider.prototype._loadSPHomeHttpClient = function () {
        var _this = this;
        return _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0__["SPComponentLoader"].loadComponentById(SP_HOME_HTTP_CLIENT_COMPONENT_ID)
            .then(function (module) {
            return new module.SPHomeHttpClient(_this._serviceScope);
        })
            .catch(function (error) {
            throw new Error();
        });
    };
    TopicSuggestionSearchDataProvider._qosTag = 'CSIKM.HashTagging.DP';
    return TopicSuggestionSearchDataProvider;
}());



/***/ }),

/***/ "EpRq":
/*!*********************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/spfx-tools/loader-cased-file/lib?name=icon_[name:lower]_[hash:8].[ext]!./lib/dataProviders/news/assets/helpitemimg3-2x.png ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "icon_helpitemimg3-2x_ef307bcc.png";

/***/ }),

/***/ "GEDN":
/*!******************************************************************!*\
  !*** ./lib/dataProviders/news/ExchangeViewCountsDataProvider.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _viewcount__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../viewcount */ "WzQS");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__);



var SERVER_MAX_ITEMS_PER_REQUEST = 10;
/**
* Provides a simple data provider for the SharePoint Search REST API.
* @internal
*/
var ExchangeViewCountsDataProvider = /** @class */ (function () {
    function ExchangeViewCountsDataProvider(options) {
        var _this = this;
        this.id = 'ExchangeViewCounts';
        this.title = '';
        this.options = options;
        this.options.serviceScope.whenFinished(function () {
            _this._pageContext = _this.options.serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__["PageContext"].serviceKey);
            _this._viewCountDataSource = _this.options.serviceScope.consume(_viewcount__WEBPACK_IMPORTED_MODULE_0__["ViewCountDataProvider"].serviceKey);
        });
    }
    ExchangeViewCountsDataProvider._getViewCountFromCacheIfAvailable = function (newsItem) {
        if (this._viewCountCache.hasOwnProperty(newsItem.uniqueId)) {
            newsItem.viewCounts = this._viewCountCache[newsItem.uniqueId];
        }
    };
    ExchangeViewCountsDataProvider._cacheViewCounts = function (newsItems) {
        var _this = this;
        newsItems.forEach(function (newsItem) {
            if (newsItem.uniqueId !== undefined) {
                _this._viewCountCache[newsItem.uniqueId] = newsItem.viewCounts;
            }
        });
    };
    ExchangeViewCountsDataProvider.prototype.requestData = function (newsItems) {
        var newsItemChunks = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["chunk"])(newsItems, SERVER_MAX_ITEMS_PER_REQUEST);
        return Promise.all(newsItemChunks.map(this._createRequestForItems.bind(this))).then(function () { return newsItems; });
    };
    ExchangeViewCountsDataProvider.prototype._addViewCountsToItems = function (newsItems, results) {
        return newsItems.filter(this._needsViewCount).map(function (newsItem) {
            var viewCount = results.filter(function (result) {
                return result.uniqueId === newsItem.uniqueId ||
                    (result.siteId === newsItem.siteId &&
                        result.webId === newsItem.webId &&
                        result.listItemId === Number(newsItem.listItemId));
            })[0];
            newsItem.viewCounts = viewCount !== undefined ? Number(viewCount.viewCount) : undefined;
            return newsItem;
        });
    };
    ExchangeViewCountsDataProvider.prototype._createRequestForItems = function (newsItems) {
        var _this = this;
        return this._viewCountDataSource.getViewCounts(this._buildRequest(newsItems))
            .then(function (results) {
            newsItems = _this._addViewCountsToItems(newsItems, results);
            ExchangeViewCountsDataProvider._cacheViewCounts(newsItems);
            return newsItems;
        });
    };
    ExchangeViewCountsDataProvider.prototype._buildRequest = function (newsItems) {
        var siteId = this._pageContext.site.id.toString();
        var webId = this._pageContext.web.id.toString();
        return newsItems.filter(this._needsViewCount).map(function (newsItem) {
            return {
                listItemId: Number(newsItem.listItemId) || 0,
                uniqueId: newsItem.uniqueId,
                siteId: newsItem.siteId || siteId,
                webId: newsItem.webId || webId,
                listId: newsItem.listId
            };
        });
    };
    ExchangeViewCountsDataProvider.prototype._needsViewCount = function (newsItem) {
        ExchangeViewCountsDataProvider._getViewCountFromCacheIfAvailable(newsItem);
        var vc = newsItem.viewCounts;
        return vc === undefined || vc === null || typeof (vc) !== 'number';
    };
    ExchangeViewCountsDataProvider._viewCountCache = {};
    return ExchangeViewCountsDataProvider;
}());
/* harmony default export */ __webpack_exports__["default"] = (ExchangeViewCountsDataProvider);


/***/ }),

/***/ "GoGY":
/*!*******************************************************!*\
  !*** ./lib/dataProviders/news/HubNewsDataProvider.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_NewsDataSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/NewsDataSource */ "aE90");
/* harmony import */ var _DataProviderFlights__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DataProviderFlights */ "Xkwe");
/* harmony import */ var _MicroServiceNewsDataProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MicroServiceNewsDataProvider */ "ugjH");
/* harmony import */ var _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilities/NewsUtilities */ "JpAn");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loc/Strings.resx */ "AOs8");
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
 * @internal
 */
var HubNewsDataProvider = /** @class */ (function (_super) {
    __extends(HubNewsDataProvider, _super);
    function HubNewsDataProvider(options) {
        var _this = _super.call(this, options) || this;
        _this.id = 'hubNews';
        _this.title = _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_4__["default"].HubNewsDataProviderTitle;
        return _this;
    }
    Object.defineProperty(HubNewsDataProvider.prototype, "qosMonitorLabel", {
        get: function () {
            return 'HubNewsDataSource';
        },
        enumerable: true,
        configurable: true
    });
    /* tslint:disable-next-line:no-any */
    HubNewsDataProvider.prototype.extractMicroserviceNewsItems = function (data) {
        return _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_3__["NewsUtilities"].extractMicroserviceNewsItems(data, this._pageContext, true /*fallbackToCurrentSite*/);
    };
    HubNewsDataProvider.prototype.executeRequest = function (requestInfo) {
        if (!_DataProviderFlights__WEBPACK_IMPORTED_MODULE_1__["default"].isFilterForOtherSitesEnabled()) {
            return this._sphomeHttpClient.get(this.getMicroservicePath(requestInfo));
        }
        else {
            return this._sphomeHttpClient.post(this.getMicroservicePath(requestInfo), _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_3__["NewsUtilities"].getFilterQueryBody(requestInfo.filterKQLQuery));
        }
    };
    HubNewsDataProvider.prototype.getMicroservicePath = function (requestInfo) {
        var endpointPath = !_DataProviderFlights__WEBPACK_IMPORTED_MODULE_1__["default"].isFilterForOtherSitesEnabled()
            ? 'news/hub'
            : 'news/hub/filtered';
        var queryParams = "departmentId=" + requestInfo.hubId + "&start=" + requestInfo.skip + "&count=" + requestInfo.count;
        queryParams += Object(_models_NewsDataSource__WEBPACK_IMPORTED_MODULE_0__["_appendAudienceFilteringQueryParam"])(requestInfo);
        queryParams += Object(_models_NewsDataSource__WEBPACK_IMPORTED_MODULE_0__["_appendLanguageOverrideQueryParam"])(requestInfo);
        return endpointPath + "?" + queryParams;
    };
    return HubNewsDataProvider;
}(_MicroServiceNewsDataProvider__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (HubNewsDataProvider);


/***/ }),

/***/ "I6O9":
/*!***************************************!*\
  !*** external "@microsoft/sp-loader" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_I6O9__;

/***/ }),

/***/ "IEFF":
/*!******************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/spfx-tools/loader-cased-file/lib?name=icon_[name:lower]_[hash:8].[ext]!./lib/dataProviders/news/assets/helpitemimg3.png ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "icon_helpitemimg3_7f442b60.png";

/***/ }),

/***/ "IIPt":
/*!**********************************************************!*\
  !*** ./lib/dataProviders/search/PersonaSettingsCache.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DataProvidersKillSwitches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DataProvidersKillSwitches */ "evK2");


/**
 * This creates a cache of persona setting. Settings are retrieved from the cache based on name
 * @internal
 */
var PersonaSettingsCache = /** @class */ (function () {
    function PersonaSettingsCache() {
    }
    PersonaSettingsCache.prototype.getPerson = function (owsId, author) {
        var person;
        var name;
        var email;
        var accountName;
        var useAccountName = !_DataProvidersKillSwitches__WEBPACK_IMPORTED_MODULE_1__["default"].wexUserAccountNameForPhoto.isActivated();
        if (!owsId && author) {
            var info = author.split(';');
            if (info.length > 0) {
                name = info[info.length - 1];
            }
        }
        else if (owsId) {
            var info = owsId.split(' | ');
            if (info.length >= 2) {
                email = info[0];
                name = info[1];
            }
            // Some users have Work email Id different from login Id. e.g. FirstName.LastName@mywork.com and flast@mywork.com
            // API like userphoto resolving accountName using WorkEmail find it hard when it is different from alias.
            // Secondly client also end up using two different URL for same user, hence two copy for save user photo.
            if (useAccountName && info.length >= 3 && info[2]) {
                // e.g. '693A30232E667C6D656D6207C62656E7061707040E636F6D i:0#.f|membership|user@contoso.com'
                var accountNameInfo = info[2].split(' ');
                if (accountNameInfo.length > 1 && accountNameInfo[1].length > 1) { // e.g. 'i:0#.f|membership|user@contoso.com'
                    accountName = this._getAccountNameFromClaim(accountNameInfo[1]); // e.g. user@contoso.com
                }
            }
        }
        person = { name: name };
        if (useAccountName && accountName) {
            person.profileImageSrc = _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["SPUtility"].getUserPhotoUrl(accountName);
        }
        if (email) {
            person.email = email;
            if (!useAccountName || !person.profileImageSrc) {
                person.profileImageSrc = _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["SPUtility"].getUserPhotoUrl(email);
            }
        }
        else {
            if (name) {
                person.initials = this._getEditorInitials(name);
            }
            else if (!useAccountName || !person.profileImageSrc) {
                // when server doesn't return editorName, fall back to default profile image.
                person.profileImageSrc = _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["SPUtility"].getUserPhotoUrl();
            }
        }
        return person;
    };
    /**
     * Get the user's initials based on display name
     */
    PersonaSettingsCache.prototype._getEditorInitials = function (name) {
        var result;
        if (name) {
            // throw away alias surrounded by parens, then separate the names
            var words = name.split('(')[0].trim().split(' ');
            switch (words.length) {
                case 1:
                    result = words[0].substring(0, 2);
                    break;
                default:
                    result = words[0].charAt(0) + words[words.length - 1].charAt(0);
                    break;
            }
            result = result.toUpperCase();
        }
        return result;
    };
    /**
     * Retrieve account name from the claim.
     * @example 'i:0h.f|membership|alias\@contoso.com' should return alias\@contoso.com
     */
    PersonaSettingsCache.prototype._getAccountNameFromClaim = function (claim) {
        if (claim) {
            var index = claim.lastIndexOf('|');
            if (index >= 0) {
                return claim.substr(index + 1);
            }
        }
        return undefined;
    };
    return PersonaSettingsCache;
}());
/* harmony default export */ __webpack_exports__["default"] = (PersonaSettingsCache);


/***/ }),

/***/ "JEu8":
/*!*****************************!*\
  !*** ./lib/models/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "JpAn":
/*!***********************************************************!*\
  !*** ./lib/dataProviders/news/utilities/NewsUtilities.js ***!
  \***********************************************************/
/*! exports provided: NewsUtilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsUtilities", function() { return NewsUtilities; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../loc/Strings.resx */ "AOs8");
/* harmony import */ var _AssetsHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AssetsHelper */ "MFri");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */







var CALLER_ID = 'newsProcessBannerImageUrl';
var DEFAULT_EMPTY_STATE_ITEM_COUNT = 3;
var NO_THUMBNAIL = '';
var ORG_NEWS_MULTI_SITE_DETAILS_KEY = 'organizationNewsSiteReference';
/**
* Provides simple utilities to work with INewsItems and DataProviders for News
* @internal
*/
var NewsUtilities = /** @class */ (function () {
    function NewsUtilities() {
    }
    NewsUtilities.cacheViewCountsValue = function (absoluteUrl, listItemId, viewCounts) {
        var currentValue = NewsUtilities.viewCountsDictionary[absoluteUrl + '/' + listItemId];
        if (currentValue === undefined || currentValue < viewCounts) {
            NewsUtilities.viewCountsDictionary[absoluteUrl + '/' + listItemId] = viewCounts;
        }
    };
    // public only for unit test access
    NewsUtilities._internalGetTeamSiteHelpItems = function (count, serviceScope) {
        var maxCount = count !== undefined && count <= DEFAULT_EMPTY_STATE_ITEM_COUNT
            ? count
            : DEFAULT_EMPTY_STATE_ITEM_COUNT;
        var result = [];
        var isHomepageModernized = false;
        if (serviceScope) {
            serviceScope.whenFinished(function () {
                var pageContext = serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__["PageContext"].serviceKey);
                isHomepageModernized = pageContext.legacyPageContext.IsHomepageModernized;
            });
        }
        var data = [
            {
                description: isHomepageModernized ? _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].HelpItemModernizedDescription : _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].HelpItem1Description,
                title: isHomepageModernized ? _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].HelpItemModernizedTitle : _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].HelpItem1Title,
                url: isHomepageModernized
                    ? NewsUtilities._mdrnHelpUrl
                    : _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].HelpItem1Url
            },
            { description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].HelpItem2Description, title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].HelpItem2Title, url: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].HelpItem2Url },
            { description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].HelpItem3Description, title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].HelpItem3Title, url: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].HelpItem3Url }
        ];
        for (var index = 0; index < maxCount; index++) {
            var helpGuid = 'f7752afa-9c69-49c8-bc62-5b5b35d01775';
            var imageKey = isHomepageModernized && index === 0 ? 'Modern' : "" + (index + 1);
            result.push({
                author: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].HelpItemAuthor,
                authorInitial: 'SP',
                authorAccountName: '',
                description: data[index].description,
                image: _AssetsHelper__WEBPACK_IMPORTED_MODULE_6__["AssetsHelper"].getIconUrl('HelpImg' + imageKey),
                publishedOn: new Date(),
                publishedOnRelativeTime: '',
                title: data[index].title,
                url: data[index].url,
                listItemId: '',
                viewCounts: undefined,
                isHelpArticle: true,
                uniqueId: helpGuid,
                siteId: helpGuid,
                webId: helpGuid
            });
        }
        return result;
    };
    NewsUtilities.getEmptyStateItems = function (emptyStateType, serviceScope, count, width) {
        switch (emptyStateType) {
            case 2 /* CommSite */:
                return NewsUtilities.getCommSiteHelpArticles(count);
            case 1 /* TeamSite */:
                return NewsUtilities._internalGetTeamSiteHelpItems(count, serviceScope);
            case 3 /* Carousel */:
                return NewsUtilities.getEmptyCarouselItems(count, width);
            default:
                return [];
        }
    };
    NewsUtilities.getCommSiteHelpArticles = function (count) {
        var maxCount = count !== undefined && count <= DEFAULT_EMPTY_STATE_ITEM_COUNT
            ? count
            : DEFAULT_EMPTY_STATE_ITEM_COUNT;
        var result = [];
        for (var index = 0; index < maxCount; index++) {
            var randomGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].newGuid().toString();
            result.push({
                author: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].EmptyStateArticleAuthor,
                authorAccountName: '',
                description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].EmptyStateArticleDescription,
                image: NewsUtilities._getEmptyArticleImageSrc(),
                publishedOn: undefined,
                publishedOnRelativeTime: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].EmptyStatePublishedRelativeTime,
                title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].EmptyStateArticleTitle,
                url: undefined,
                listItemId: '',
                viewCounts: undefined,
                isHelpArticle: true,
                uniqueId: randomGuid,
                siteId: randomGuid,
                webId: randomGuid
            });
        }
        return result;
    };
    NewsUtilities.getEmptyCarouselItems = function (count, width) {
        var maxCount = count !== undefined && count <= DEFAULT_EMPTY_STATE_ITEM_COUNT
            ? count
            : DEFAULT_EMPTY_STATE_ITEM_COUNT;
        var result = [];
        var titles = [
            _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].CarouselStockTitle1,
            _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].CarouselStockTitle2,
            _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].CarouselStockTitle3
        ];
        for (var index = 0; index < maxCount; index++) {
            var randomGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].newGuid().toString();
            result.push({
                author: '',
                authorAccountName: '',
                description: '',
                image: _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["PreviewUtility"].getDefaultNewsCarouselImageById(index, width),
                publishedOn: undefined,
                publishedOnRelativeTime: '',
                title: titles[index],
                url: undefined,
                listItemId: '',
                viewCounts: undefined,
                isHelpArticle: true,
                uniqueId: randomGuid,
                siteId: randomGuid,
                webId: randomGuid
            });
        }
        return result;
    };
    Object.defineProperty(NewsUtilities, "autofillItem", {
        get: function () {
            var randomGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].newGuid().toString();
            return {
                author: '',
                authorAccountName: '',
                description: '',
                image: NewsUtilities._getEmptyArticleImageSrc(),
                publishedOn: undefined,
                publishedOnRelativeTime: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].EmptyStatePublishedRelativeTime,
                title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].AutofillArticleTitle,
                url: undefined,
                listItemId: '',
                viewCounts: undefined,
                isHelpArticle: true,
                uniqueId: randomGuid,
                siteId: randomGuid,
                webId: randomGuid
            };
        },
        enumerable: true,
        configurable: true
    });
    NewsUtilities.getTipActionNewsItem = function (isContributor, webAbsoluteUrl) {
        var randomGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].newGuid().toString();
        return {
            author: '',
            authorAccountName: '',
            description: isContributor ? _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].CallToActionContributorDescription : _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].CallToActionViewerDescription,
            image: '',
            isContributorActionCard: isContributor,
            publishedOn: undefined,
            publishedOnRelativeTime: '',
            title: isContributor ? _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].CallToActionContributorTitle : _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].CallToActionViewerTitle,
            url: isContributor ?
                _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Uri"].concatenate(webAbsoluteUrl, '/_layouts/15/CreateSitePage.aspx?source=') +
                    _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["UriEncoding"].encodeURIComponent(window.location.pathname) +
                    '&promotedState=1'
                : _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].HelpItem1Url,
            listItemId: '',
            viewCounts: undefined,
            isHelpArticle: true,
            uniqueId: randomGuid,
            siteId: randomGuid,
            webId: randomGuid
        };
    };
    /* tslint:disable-next-line:no-any */
    NewsUtilities.extractNewsItemsFromSearch = function (data, pageContext) {
        return data.map(function (result) {
            var siteId = result.SiteID ? _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(result.SiteID).toString() : undefined;
            var webId = result.WebId ? _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(result.WebId).toString() : undefined;
            var listId = result.ListId ? _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(result.ListId).toString() : undefined;
            var uniqueId = result.UniqueID ? _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(result.UniqueID).toString() : undefined;
            var viewCountLifetime = result.ViewCountLifetime;
            var viewCounts = (typeof viewCountLifetime === 'number') ? viewCountLifetime : undefined;
            var authoritativeSite = NewsUtilities.tryGetAuthoritativeSiteDetails(siteId, webId, pageContext);
            var siteUrl = result.SPWebUrl;
            var imageUrl = NewsUtilities._handleDefaultBanner(result.PictureThumbnailURL);
            return {
                author: NewsUtilities._getUserDisplayNameFromSearch(result.CreatedBy),
                authorAccountName: result.AuthorOWSUSER,
                description: result.Description || '',
                isAuthoritative: !!authoritativeSite,
                image: imageUrl || NO_THUMBNAIL,
                publishedOn: new Date(result.FirstPublishedDate),
                publishedOnRelativeTime: '',
                title: result.Title || result.FileName,
                url: NewsUtilities.encodeSegments(result.Path),
                listItemId: result.ListItemId,
                originalSourceItemId: undefined,
                originalSourceUrl: NewsUtilities.encodeSegments(result.OriginalPath),
                path: result.Path,
                siteTitle: NewsUtilities._getSiteTitle(result, siteId, webId, pageContext),
                siteUrl: siteUrl,
                viewCounts: viewCounts,
                isHelpArticle: false,
                uniqueId: uniqueId,
                siteId: siteId,
                webId: webId,
                listId: listId
            };
        });
    };
    /* tslint:disable-next-line:no-any */
    NewsUtilities.extractNewsItems = function (data, pageContext) {
        return data.map(function (result) {
            var normalizeId = function (id) { return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(id).toString(); };
            var siteId = result.SiteID ? normalizeId(result.SiteID) : pageContext.site.id.toString();
            var webId = result.WebId ? normalizeId(result.WebId) : pageContext.web.id.toString();
            var listId = result.ListId ? normalizeId(result.ListId) :
                (pageContext.list && pageContext.list.id && pageContext.list.id.toString());
            var uniqueId = result.UniqueId ? normalizeId(result.UniqueId) :
                (pageContext.listItem && pageContext.listItem.id && pageContext.listItem.id.toString());
            var authoritativeSite = NewsUtilities.tryGetAuthoritativeSiteDetails(siteId, webId, pageContext);
            var BannerImageUrl = result.BannerImageUrl, BannerThumbnailUrl = result.BannerThumbnailUrl;
            var imageUrl;
            if (NewsUtilities._consistentDefaultThumbnail.isActivated() &&
                BannerThumbnailUrl) {
                imageUrl = BannerThumbnailUrl;
            }
            else {
                imageUrl = NewsUtilities._handleDefaultBanner(BannerThumbnailUrl || BannerImageUrl);
            }
            return {
                author: result.CreatedBy.Name,
                authorAccountName: result.CreatedBy.AccountName,
                description: (result.Description) ? result.Description : '',
                isAuthoritative: !!authoritativeSite,
                image: imageUrl || NO_THUMBNAIL,
                publishedOn: new Date(result.FirstPublished),
                publishedOnRelativeTime: '',
                title: result.Title || result.FileName,
                url: NewsUtilities.encodeSegments(result.AbsoluteUrl),
                listItemId: result.Id,
                originalSourceItemId: result.OriginalSourceItemId,
                originalSourceUrl: NewsUtilities.encodeSegments(result.OriginalSourceUrl),
                path: result.Path && result.Path.DecodedUrl,
                siteTitle: authoritativeSite
                    ? NewsUtilities._getSiteTitle(result, siteId, webId, pageContext)
                    : undefined,
                siteUrl: pageContext.web.absoluteUrl,
                viewCounts: undefined,
                isHelpArticle: false,
                uniqueId: uniqueId,
                siteId: siteId,
                webId: webId,
                listId: listId
            };
        });
    };
    NewsUtilities.extractMicroserviceNewsItems = function (data, /* tslint:disable-line:no-any */ pageContext, fallbackToCurrentSite) {
        return data.map(function (result) {
            var siteId;
            var webId;
            var listId;
            var itemReference = result.Site && result.Site.ItemReference;
            var library = result.Library;
            var siteGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(itemReference
                && itemReference.SiteId);
            siteId = siteGuid && siteGuid.toString() ||
                (fallbackToCurrentSite && pageContext.site.id.toString());
            var webGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(itemReference
                && itemReference.WebId);
            webId = webGuid && webGuid.toString() ||
                (fallbackToCurrentSite && pageContext.web.id.toString());
            var listGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(library && library.ListId);
            listId = listGuid && listGuid.toString();
            var uniqueId = result.UniqueId ? _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(result.UniqueId).toString() : undefined;
            var authoritativeSite = NewsUtilities.tryGetAuthoritativeSiteDetails(siteId, webId, pageContext);
            var siteUrl = result.Site && result.Site.Url
                ? result.Site.Url
                : result.SiteUrl || pageContext.site.absoluteUrl;
            var imageUrl = NewsUtilities._handleDefaultBanner(result.ImageUrl);
            return {
                author: (result.Author && result.Author.Title) ? result.Author.Title : '',
                authorAccountName: (result.Author && result.Author.AccountName) ? result.Author.AccountName : '',
                description: result.Description,
                isAuthoritative: result.IsAuthoritativeNews || !!authoritativeSite,
                image: imageUrl || NO_THUMBNAIL,
                publishedOn: new Date(result.FirstPublishedDate),
                publishedOnRelativeTime: '',
                title: result.Title,
                url: NewsUtilities.encodeSegments(result.Url),
                viewCounts: undefined,
                isHelpArticle: false,
                siteTitle: NewsUtilities._getSiteTitle(result, siteId, webId, pageContext),
                siteUrl: siteUrl,
                listItemId: result.ListItemId,
                originalSourceItemId: result.OriginalSourceItemId,
                originalSourceUrl: NewsUtilities.encodeSegments(result.OriginalSourceUrl),
                path: result.Path && result.Path.DecodedUrl,
                uniqueId: uniqueId,
                siteId: siteId,
                webId: webId,
                listId: listId
            };
        });
    };
    /**
     *
     * @param bannerImageUrl - PictureThumbnailUrl from search
     * @param defaultUniqueId - News article's guid
     * @param pageContext - PageContext for the current site
     * @param imageWidth - width of the container
     * @param siteId - Site ID that the article was posted to
     * @param webId - Web ID that the article was posted to
     * @param contextBaseUrl - Absolute URL of site that the article was posted to
     */
    NewsUtilities.processBannerImageUrlPart = function (bannerImageUrl, defaultUniqueId, pageContext, imageWidth, siteId, webId, contextBaseUrl) {
        var monitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('News.processBannerImageUrlPart');
        try {
            var result = NewsUtilities._processBannerImageUrlPartCore(bannerImageUrl, defaultUniqueId, pageContext, imageWidth, monitor, siteId, webId, contextBaseUrl);
            if (!monitor.hasEnded) {
                monitor.writeSuccess();
            }
            return result;
        }
        catch (ex) {
            var extraData = {
                defaultUniqueId: defaultUniqueId,
                imageWidth: imageWidth
            };
            if (siteId) {
                // tslint:disable:no-string-literal
                extraData['siteId'] = siteId;
            }
            if (webId) {
                extraData['webId'] = siteId;
                // tslint:enable:no-string-literal
            }
            monitor.writeUnexpectedFailure('UrlError', ex, extraData);
            return ''; // Treat as no thumbnail
        }
    };
    NewsUtilities.isPrefetchStale = function (pageUrl) {
        if (this._initialUrl === undefined) {
            this._initialUrl = pageUrl;
            return false;
        }
        else {
            return true;
        }
    };
    NewsUtilities.extractParamFromUrl = function (param, pageUrl) {
        var queryStringParameterTitleExtractor = new RegExp("[?&]" + param + "=([^?&]+)(&|$)");
        return queryStringParameterTitleExtractor.test(pageUrl) ?
            decodeURIComponent(queryStringParameterTitleExtractor.exec(pageUrl)[1])
            : undefined;
    };
    NewsUtilities.isNewsItemInList = function (newsList, newsPost) {
        if (!newsList || !newsPost) {
            return false;
        }
        return newsList.some(function (item, index) {
            return item && NewsUtilities.getNewsItemKey(item, "" + index) === NewsUtilities.getNewsItemKey(newsPost, "" + index);
        });
    };
    NewsUtilities.getPaddingCount = function (requestInfo, realNewsCount) {
        var paddingCount = 0;
        if (requestInfo.emptyItemType) {
            paddingCount = requestInfo.count - realNewsCount;
            paddingCount = requestInfo.emptyItemsCount ? Math.min(requestInfo.emptyItemsCount, paddingCount) : paddingCount;
        }
        return paddingCount;
    };
    NewsUtilities.hasSameSetOfPosts = function (newsList1, newsList2) {
        if (!newsList1 ||
            !newsList2 ||
            newsList1.length !== newsList2.length) {
            return false;
        }
        var areEqual = true;
        newsList1.every(function (item1) {
            areEqual = areEqual && newsList2.some(function (item2) {
                return item1.url === item2.url;
            });
            return areEqual;
        });
        return areEqual;
    };
    NewsUtilities.hasSameOrderOfPosts = function (newsList1, newsList2) {
        if (!newsList1 ||
            !newsList2 ||
            newsList1.length !== newsList2.length) {
            return false;
        }
        for (var index = 0; index < newsList1.length; index++) {
            if (newsList1[index] !== newsList2[index]) {
                return false;
            }
        }
        return true;
    };
    NewsUtilities.didRenderedPropertiesChange = function (updatedItem, currentItem) {
        return updatedItem && currentItem && (updatedItem.description !== currentItem.description ||
            updatedItem.image !== currentItem.image ||
            updatedItem.title !== currentItem.title);
    };
    NewsUtilities.getNewsItemKey = function (item, helpArticleKey) {
        return item.isHelpArticle ? helpArticleKey : item.siteId + "-" + item.webId + "-" + item.listId + "-" + item.uniqueId;
    };
    NewsUtilities.tryGetAuthoritativeSiteDetails = function (siteId, webId, pageContext) {
        if (!siteId ||
            !webId ||
            !pageContext.legacyPageContext ||
            !pageContext.legacyPageContext[ORG_NEWS_MULTI_SITE_DETAILS_KEY]) {
            return undefined;
        }
        var siteGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(siteId);
        var webGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(webId);
        if (!siteGuid || !webGuid) {
            return undefined;
        }
        var orgSites;
        if (pageContext.legacyPageContext[ORG_NEWS_MULTI_SITE_DETAILS_KEY]) {
            orgSites = pageContext.legacyPageContext[ORG_NEWS_MULTI_SITE_DETAILS_KEY];
        }
        for (var _i = 0, orgSites_1 = orgSites; _i < orgSites_1.length; _i++) {
            var site = orgSites_1[_i];
            if (NewsUtilities._isSiteAuthoritative(siteGuid, webGuid, site)) {
                return site;
            }
        }
        return undefined;
    };
    Object.defineProperty(NewsUtilities, "isOnSeeAllPage", {
        get: function () {
            var currentUri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Uri"](window.location.href);
            return _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["StringHelper"].doesStringEndWith(currentUri.getPath(true).toLowerCase(), '/_layouts/15/news.aspx');
        },
        enumerable: true,
        configurable: true
    });
    NewsUtilities.getFilterQueryBody = function (filterQuery) {
        if (filterQuery === void 0) { filterQuery = ''; }
        return JSON.stringify(filterQuery);
    };
    NewsUtilities.encodeSegments = function (url) {
        if (!url) {
            return url;
        }
        // Avoid the encodeSegments call from removing the trailing slash from the input url
        // as some sites require it to correctly navigate to the page.
        var endingSlash = (!this._restoreTrailingSlashOnNewsLink.isActivated() && url.substring(url.length - 1) === '/') ? '/' : '';
        var resourcePath = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["SPResourcePath"](url);
        if (!resourcePath.authority && !resourcePath.domain) {
            return url;
        }
        var aspxRegex = new RegExp('.+\.aspx');
        var encodedURLRegex = new RegExp('^(?:[^%]|%[0-9A-Fa-f]{2})+$');
        var encodedSegments = resourcePath.segments
            .filter(function (seg) { return !!seg; })
            .map(function (seg) {
            try {
                if (aspxRegex.test(seg)) {
                    var segToEncode = aspxRegex.exec(encodedURLRegex.test(seg) ? decodeURIComponent(seg) : seg)[0];
                    return seg.replace(aspxRegex, encodeURIComponent(segToEncode));
                }
                else {
                    return seg;
                }
            }
            catch (_a) {
                // Exception handling for Malform URL with single %. If not handled by encodedURLRegex
                return seg;
            }
        });
        return _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Uri"].concatenate.apply(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Uri"], [resourcePath.authority].concat(encodedSegments)) + endingSlash;
    };
    NewsUtilities._shouldDeprecateDocViz = function () {
        return _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["ThumbnailUrlGenerator"].isVROOMThumbnailEnabled();
    };
    NewsUtilities._isSiteAuthoritative = function (siteGuid, webGuid, siteDetails) {
        var authoritativeNewsSiteGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(siteDetails.SiteId);
        var authoritativeNewsWebGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(siteDetails.WebId);
        return authoritativeNewsSiteGuid && authoritativeNewsWebGuid &&
            siteGuid.equals(authoritativeNewsSiteGuid) && webGuid.equals(authoritativeNewsWebGuid);
    };
    NewsUtilities._getSiteTitle = function (data, /* tslint:disable-line:no-any */ siteId, webId, pageContext) {
        var title = data.SiteTitle;
        if (!title) {
            var siteGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(siteId);
            var webGuid = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(webId);
            var useContextWebTitle = siteGuid && webGuid &&
                siteGuid.equals(pageContext.site.id) &&
                webGuid.equals(pageContext.web.id);
            if (useContextWebTitle) {
                title = pageContext.web.title;
            }
        }
        return title;
    };
    NewsUtilities._getUserDisplayNameFromSearch = function (user) {
        var displayName = user;
        var parts = user && user.split('|');
        if (parts && parts.length > 1) {
            displayName = parts[1];
        }
        return displayName || '';
    };
    NewsUtilities._handleDefaultBanner = function (imageUrl) {
        if (NewsUtilities._isDefaultBannerImage(imageUrl)) {
            return NO_THUMBNAIL;
        }
        return imageUrl;
    };
    NewsUtilities._extractImageFromBanner = function (bannerImageUrl) {
        var parts = bannerImageUrl.split(', ');
        var index = parts.length > 1 ? 1 : 0;
        return parts[index].trim();
    };
    NewsUtilities._isDefaultBannerImage = function (bannerImageUrl) {
        return (!bannerImageUrl ||
            _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["StringHelper"].doesStringEndWith(NewsUtilities._extractImageFromBanner(bannerImageUrl), '/images/sitepagethumbnail.png'));
    };
    /**
     *
     * @param bannerImageUrl - PictureThumbnailUrl from search
     * @param defaultUniqueId - News article's guid
     * @param pageContext - PageContext for the current site
     * @param imageWidth - width of the container
     * @param monitor - Reliability monitor
     * @param siteId - Site ID that the article was posted to
     * @param webId - Web ID that the article was posted to
     * @param contextBaseUrl - Absolute URL of site that the article was posted to
     */
    NewsUtilities._processBannerImageUrlPartCore = function (bannerImageUrl, defaultUniqueId, pageContext, imageWidth, monitor, siteId, webId, contextBaseUrl) {
        var imageUrlPart = NewsUtilities._extractImageFromBanner(bannerImageUrl);
        var absoluteUrl = contextBaseUrl || pageContext.web.absoluteUrl;
        var logPrefix = CALLER_ID + ":";
        var externalBanner = NewsUtilities._tryGetExternalBanner(imageUrlPart, absoluteUrl, logPrefix);
        if (externalBanner) {
            monitor.writeExpectedFailure('External');
            return externalBanner;
        }
        if (NewsUtilities._isDefaultBannerImage(imageUrlPart)) {
            monitor.writeExpectedFailure('NoThumbnail');
            return '';
        }
        var imageResource = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["SPResourcePath"](imageUrlPart);
        var path = imageResource.path.toLowerCase();
        var provider = _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["ThumbnailUrlGenerator"].getThumbnailProvider(imageUrlPart);
        if (provider === _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["ThumbnailProviderType"].DocViz) {
            // Url already points to the GetPreview service.
            // Use the correct resoultion query string parameter.
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(NewsUtilities._logSource, logPrefix + " already from GetPreview");
            if (NewsUtilities._shouldDeprecateDocViz()) {
                var thumbnailUrl = _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["ThumbnailUrlGenerator"].fromGetPreview(imageUrlPart, CALLER_ID, imageWidth);
                if (thumbnailUrl) {
                    return thumbnailUrl;
                }
            }
            var resolution = _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["PreviewUtility"].normalizeWidthToResolution(imageWidth);
            var imageUri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Uri"](imageUrlPart);
            imageUri.setQueryParameter(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].RESOLUTION, resolution.toString());
            return imageUri.toString();
        }
        // If this is not a Xsite image, force the Url to use the path by setting uniqueId to undefined
        var absoluteUri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Uri"](absoluteUrl);
        var uniqueId = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["StringHelper"].doesStringStartWith(path, absoluteUri.getPath().toLowerCase()) ?
            undefined : defaultUniqueId;
        if (NewsUtilities._shouldDeprecateDocViz()) {
            // WEXReWriteBannerImageUrl: Don't process again if server already mapped to Thumbnail Service.
            if (provider !== _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["ThumbnailProviderType"].Unknown && provider !== _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["ThumbnailProviderType"].Original) {
                return _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["ThumbnailUrlGenerator"].updateThumbnailWidth(imageUrlPart, imageWidth);
            }
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(NewsUtilities._logSource, logPrefix + " final ThumbnailUrlGenerator.getThumbnailUrl");
            var request = {
                absoluteUrl: absoluteUrl,
                fileType: _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["ExtensionHelper"].getExtension1(imageResource),
                spResource: path,
                siteId: siteId || pageContext.site.id.toString(),
                webId: webId || pageContext.web.id.toString(),
                uniqueId: uniqueId,
                width: imageWidth,
                callerId: CALLER_ID
            };
            return _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["ThumbnailUrlGenerator"].getThumbnailUrl(request);
        }
        else {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(NewsUtilities._logSource, logPrefix + " final preview helper");
            // We get the getPreview Url
            return _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["PreviewHelper"].getPreviewImageUrl(imageUrlPart.split('.').pop(), /* extension */ undefined, /* thumbnail */ absoluteUrl, path, siteId || pageContext.site.id.toString(), webId || pageContext.web.id.toString(), uniqueId, imageWidth, // higher res width for all,
            false, // isBannerImageUrl
            CALLER_ID);
        }
    };
    /**
     * Returns image from different host as is or undefiend if on same host.
     * @param imageUrlPart - URL of image from data source
     * @param absoluteUrl - Absolute URL of site that the article was posted to
     * @param logPrefix - prefix for logging
     */
    NewsUtilities._tryGetExternalBanner = function (imageUrlPart, absoluteUrl, logPrefix) {
        var imageResourcePath = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["SPResourcePath"](imageUrlPart);
        var imageUriHost = NO_THUMBNAIL;
        if (imageResourcePath) {
            imageUriHost = imageResourcePath.authority;
        }
        var currentContextHost = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["SPResourcePath"](absoluteUrl).authority;
        if (imageUriHost !== '' &&
            !_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["StringHelper"].equalsCaseInsensitive(currentContextHost, imageUriHost)) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(NewsUtilities._logSource, logPrefix + " cross host");
            var hasQuery = imageUrlPart.indexOf('?') > -1;
            return hasQuery ? imageUrlPart : (imageUrlPart + '?');
        }
        return undefined;
    };
    NewsUtilities._getEmptyArticleImageSrc = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1621 /* WEXNewsUseRichImage */)
            ? '' : 'none';
    };
    NewsUtilities.viewCountsDictionary = {};
    NewsUtilities._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('NewsUtilities');
    NewsUtilities._mdrnHelpUrl = ' https://go.microsoft.com/fwlink/?linkid=2103711';
    NewsUtilities._consistentDefaultThumbnail = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["KillSwitch"]('be8edbe5-9eb0-4417-935f-b27da1d87c08'
    /* '08/21/2019', 'WEX_HandleDefaultNewsThumbnail' */
    );
    NewsUtilities._restoreTrailingSlashOnNewsLink = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["KillSwitch"]('136b604b-9799-4c29-ba1e-80d5dd636fe3'
    /* '11/05/2019', 'WEX_RestoreTrailingSlashOnNewsLink' */
    );
    return NewsUtilities;
}());



/***/ }),

/***/ "KL1q":
/*!***********************************************************!*\
  !*** external "@microsoft/office-ui-fabric-react-bundle" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_KL1q__;

/***/ }),

/***/ "L/SE":
/*!***********************************************!*\
  !*** ./lib/dataProviders/BaseDataProvider.js ***!
  \***********************************************/
/*! exports provided: BaseDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseDataProvider", function() { return BaseDataProvider; });
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);



/**
 * Provides a helper base class for a data provider in order to reduce line count.
 *
 * @internal
 */
// tslint:disable-next-line:no-any
var BaseDataProvider = /** @class */ (function () {
    function BaseDataProvider(options) {
        this._options = options;
        this._serviceScope = options.serviceScope;
        // The constructor is returned via the DataProviderLoader.  The receiver can call it with ServiceScope
        // and receive the instance returned here.
        return this;
    }
    // Format of data changes per the request so return is an "any".
    BaseDataProvider.prototype.requestData = function (request) {
        var _this = this;
        return this.resolveServices().then(function () { return _this.getItems(request); });
    };
    BaseDataProvider.prototype.resolveServices = function () {
        var _this = this;
        return new Promise(function (complete, reject) {
            _this._serviceScope.whenFinished(function () {
                _this._pageContext = _this._serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0__["PageContext"].serviceKey);
                _this._baseEndPoint = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["UrlUtilities"].removeEndSlash(_this._pageContext.web.absoluteUrl);
                if (_this._options.useHttpClient) {
                    _this._httpClient = _this._serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"].serviceKey);
                }
                else {
                    _this._spHttpClient = _this._serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].serviceKey);
                }
                if (_this._options.requiresTokenProvider) {
                    _this._tokenProvider = _this._serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["OAuthTokenProvider"].serviceKey);
                }
                complete();
            });
        });
    };
    Object.defineProperty(BaseDataProvider.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDataProvider.prototype, "httpClient", {
        get: function () {
            return this._httpClient;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDataProvider.prototype, "spHttpClient", {
        get: function () {
            return this._spHttpClient;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDataProvider.prototype, "pageContext", {
        get: function () {
            return this._pageContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDataProvider.prototype, "tokenProvider", {
        get: function () {
            return this._tokenProvider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDataProvider.prototype, "baseEndPoint", {
        get: function () {
            return this._baseEndPoint;
        },
        enumerable: true,
        configurable: true
    });
    return BaseDataProvider;
}());



/***/ }),

/***/ "M0r2":
/*!**********************************************************!*\
  !*** ./lib/dataProviders/page/PageSearchDataProvider.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _search_PersonaSettingsCache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../search/PersonaSettingsCache */ "IIPt");
/* harmony import */ var _search_SearchDataProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../search/SearchDataProvider */ "dU3L");
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




/**
 * @internal
 */
var PageSearchDataProvider = /** @class */ (function (_super) {
    __extends(PageSearchDataProvider, _super);
    function PageSearchDataProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageSearchDataProvider.prototype._initVariables = function () {
        this._personaSettingsCache = new _search_PersonaSettingsCache__WEBPACK_IMPORTED_MODULE_2__["default"]();
    };
    PageSearchDataProvider.prototype._mapResponse = function (searchResults) {
        var _this = this;
        var results = searchResults.rows.map(function (row) { return ({
            id: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].tryParse(row.UniqueID),
            lastEditor: _this._personaSettingsCache.getPerson(row.EditorOwsUser, row.ModifiedBy),
            lastModifiedDate: row.ModifiedOwsDate && new Date(row.ModifiedOwsDate),
            title: row.Title,
            url: row.DefaultEncodingURL
        }); });
        return Promise.resolve(results);
    };
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["autobind"]
    ], PageSearchDataProvider.prototype, "_mapResponse", null);
    return PageSearchDataProvider;
}(_search_SearchDataProvider__WEBPACK_IMPORTED_MODULE_3__["SearchDataProvider"]));
/* harmony default export */ __webpack_exports__["default"] = (PageSearchDataProvider);


/***/ }),

/***/ "MFri":
/*!**********************************************************!*\
  !*** ./lib/dataProviders/news/utilities/AssetsHelper.js ***!
  \**********************************************************/
/*! exports provided: AssetsHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssetsHelper", function() { return AssetsHelper; });
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */
var AssetsHelper = /** @class */ (function () {
    function AssetsHelper() {
    }
    /**
     * get icon url from the assets folder based on the key.
     * @return icon url in src/webparts/Newsreel/assets folder.
     * auto return retina icon url for retina device.
     */
    AssetsHelper.getIconUrl = function (key) {
        'use strict';
        if (key === AssetsHelper._modernizedImageKey &&
            !AssetsHelper._assetIconsMap[this._modernizedImageKey]) {
            var modernImgUrl = __webpack_require__(/*! @ms/odsp-media/dist/media/images/news/Modernize_News.svg */ "cWOI");
            AssetsHelper._assetIconsMap[this._modernizedImageKey] = [
                modernImgUrl,
                modernImgUrl
            ];
        }
        var icons = AssetsHelper._assetIconsMap[key];
        var index = (window.devicePixelRatio >= 2 && icons.length >= 2) ? 1 : 0;
        return icons[index];
    };
    /* tslint:disable:max-line-length */
    AssetsHelper._assetIconsMap = {
        'HelpImg1': [
            __webpack_require__(/*! !@microsoft/loader-cased-file?name=icon_[name:lower]_[hash:8].[ext]!../assets/helpitemimg1.png */ "3smo"),
            __webpack_require__(/*! !@microsoft/loader-cased-file?name=icon_[name:lower]_[hash:8].[ext]!../assets/helpitemimg1-2x.png */ "XoXQ")
        ],
        'HelpImg2': [
            __webpack_require__(/*! !@microsoft/loader-cased-file?name=icon_[name:lower]_[hash:8].[ext]!../assets/helpitemimg2.png */ "knSg"),
            __webpack_require__(/*! !@microsoft/loader-cased-file?name=icon_[name:lower]_[hash:8].[ext]!../assets/helpitemimg2-2x.png */ "OYS5")
        ],
        'HelpImg3': [
            __webpack_require__(/*! !@microsoft/loader-cased-file?name=icon_[name:lower]_[hash:8].[ext]!../assets/helpitemimg3.png */ "IEFF"),
            __webpack_require__(/*! !@microsoft/loader-cased-file?name=icon_[name:lower]_[hash:8].[ext]!../assets/helpitemimg3-2x.png */ "EpRq")
        ]
    };
    /* tslint:enable:max-line-length */
    AssetsHelper._modernizedImageKey = 'HelpImgModern';
    return AssetsHelper;
}());



/***/ }),

/***/ "NRPc":
/*!*************************************************************!*\
  !*** ./lib/dataProviders/news/models/NewsEmptyStateType.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// @Copyright (c) Microsoft Corporation.  All rights reserved.


/***/ }),

/***/ "O1uH":
/*!******************************************************!*\
  !*** ./lib/dataProviders/blogs/BlogsDataProvider.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utilities_BlogsUtilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utilities/BlogsUtilities */ "R7iS");






/**
 * @internal
 */
var BlogsDataProvider = /** @class */ (function () {
    function BlogsDataProvider(options) {
        var _this = this;
        this.id = 'Blogs';
        this.title = 'Blogs';
        this.options = options;
        this.options.serviceScope.whenFinished(function () {
            _this._spHttpClient = _this.options.serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__["SPHttpClient"].serviceKey);
            _this._pageContext = _this.options.serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__["PageContext"].serviceKey);
            _this._absoluteUrl = _this._pageContext && _this._pageContext.web.absoluteUrl;
        });
        if (!_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Locale"].language) {
            _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Locale"].language = 'en-us';
        }
        return this;
    }
    BlogsDataProvider.prototype.requestData = function (requestInfo) {
        var _this = this;
        var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('BlogsDataSource.getBlogsItems');
        return this._spHttpClient.get(this._getBlogsItemsUrl(!this.options.drafts, requestInfo), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__["SPHttpClient"].configurations.v1, {}).then(function (response) {
            qosMonitor.writeSuccess();
            return response.json();
        }).catch(function (error) {
            qosMonitor.writeUnexpectedFailure('Unexpected', error);
            return error;
        }).then(function (response) {
            var data = [];
            if (response.value && response.value.length !== 0) {
                data = _utilities_BlogsUtilities__WEBPACK_IMPORTED_MODULE_5__["BlogsUtilities"].extractBlogsItems(response.value, _this._pageContext);
            }
            if (_this.options.drafts) {
                data = data.filter(function (item, index, array) {
                    return _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["SPUtility"].isPageOnMinorVersion(item.version);
                });
                data.sort(function (item1, item2) {
                    return (item1.publishedOn < item2.publishedOn) ? 1 : -1;
                });
            }
            return data;
        });
    };
    // VSO:400919 Blogs and News have the same data
    BlogsDataProvider.prototype._getBlogsItemsUrl = function (published, requestInfo) {
        var webUrl = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["UriEncoding"].escapeUrlForCallback(this._absoluteUrl);
        var publishedQuery = "?promotedstate=2&published=true&$skip=" + (requestInfo.skip || 0) +
            ((requestInfo.count > 0 ? "&$top=" + requestInfo.count : "") + "&$expand=CreatedBy") +
            "&$select=Description,BannerImageUrl,BannerThumbnailUrl,AbsoluteUrl,FirstPublished,Title,FileName,Id,UniqueId,ListId"; // tslint:disable-line: max-line-length
        var draftsQuery = "?published=false&$skip=" + (requestInfo.skip || 0) + (requestInfo.count > 0 ?
            "&$top=" + requestInfo.count : "") + "&$expand=CreatedBy,ModifiedRelativeTime&$select=PromotedState,Version," +
            "Description,BannerImageUrl,BannerThumbnailUrl,AbsoluteUrl,Modified,Title,FileName,Id,UniqueId,ListId" +
            '&$filter=PromotedState%20ge%201%20';
        return webUrl + '/_api/sitepages/pages/feed' + (published ? publishedQuery : draftsQuery);
    };
    return BlogsDataProvider;
}());
/* harmony default export */ __webpack_exports__["default"] = (BlogsDataProvider);


/***/ }),

/***/ "OVKu":
/*!******************************************!*\
  !*** external "@ms/sp-list-data-source" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_OVKu__;

/***/ }),

/***/ "OYS5":
/*!*********************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/spfx-tools/loader-cased-file/lib?name=icon_[name:lower]_[hash:8].[ext]!./lib/dataProviders/news/assets/helpitemimg2-2x.png ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "icon_helpitemimg2-2x_5a055172.png";

/***/ }),

/***/ "Pk8u":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Pk8u__;

/***/ }),

/***/ "QaIw":
/*!**********************************************************!*\
  !*** ./lib/dataProviders/news/NewsDigestDataProvider.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_NewsDataProviderIds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/NewsDataProviderIds */ "2Rre");

/**
 * Represents the NewsDigest data provider.
 * @internal
 */
var NewsDigestDataProvider = /** @class */ (function () {
    function NewsDigestDataProvider(options) {
        this.id = _models_NewsDataProviderIds__WEBPACK_IMPORTED_MODULE_0__["newsDigest"];
        this.title = 'NewsDigest';
        this.options = options;
    }
    NewsDigestDataProvider.prototype.requestData = function (requestInfo) {
        var response = this.options.newsItems || [];
        return Promise.resolve(response);
    };
    return NewsDigestDataProvider;
}());
/* harmony default export */ __webpack_exports__["default"] = (NewsDigestDataProvider);


/***/ }),

/***/ "R3v1":
/*!**************************************************************!*\
  !*** ./lib/dataProviders/bookmarks/BookmarksDataProvider.js ***!
  \**************************************************************/
/*! exports provided: BookmarksDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookmarksDataProvider", function() { return BookmarksDataProvider; });
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__);


var addBookmarkQOSName = 'AddBookmark';
var removeBookmarkQOSName = 'RemoveBookmark';
var isBookmarkedQOSName = 'IsBookmarked';
/**
 * @internal
 */
// Keep in sync with apps/sp-pages/src/chunks/sp-pages-social/bookmarks/BookmarksDataProvider.ts
var BookmarksDataProvider = /** @class */ (function () {
    function BookmarksDataProvider(qosComponentName, serviceScope) {
        this._qosComponentName = qosComponentName;
        this._serviceScope = serviceScope;
    }
    BookmarksDataProvider.prototype.addBookmark = function (url) {
        var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](this._qosComponentName + '.' + addBookmarkQOSName);
        var body = url;
        return this._loadSPHomeHttpClient()
            .then(function (_sphomeHttpClient) { return _sphomeHttpClient.post('documents/followed/add', JSON.stringify(body)); })
            .then(function (response) { return response.ok; })
            .then(function (ok) {
            qosMonitor.writeSuccess();
            return ok;
        }).catch(function (error) {
            qosMonitor.writeUnexpectedFailure(addBookmarkQOSName);
            return false;
        });
    };
    BookmarksDataProvider.prototype.removeBookmark = function (url) {
        var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](this._qosComponentName + '.' + removeBookmarkQOSName);
        var body = decodeURI(url);
        return this._loadSPHomeHttpClient()
            .then(function (_sphomeHttpClient) { return _sphomeHttpClient.post('documents/followed/remove', JSON.stringify(body)); })
            .then(function (response) { return response.ok; })
            .then(function (ok) {
            qosMonitor.writeSuccess();
            return ok;
        }).catch(function (error) {
            qosMonitor.writeUnexpectedFailure(removeBookmarkQOSName);
            return false;
        });
    };
    BookmarksDataProvider.prototype.isBookmarked = function (bookmarkCard) {
        var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"](this._qosComponentName + '.' + isBookmarkedQOSName);
        return this._isBookmarkedRequest(bookmarkCard)
            .then(function (response) {
            qosMonitor.writeSuccess();
            return response.json();
        })
            .then(function (data) {
            return data.SavedForLater;
        }).catch(function (error) {
            qosMonitor.writeUnexpectedFailure(isBookmarkedQOSName);
            return false;
        });
    };
    BookmarksDataProvider.prototype._isBookmarkedRequest = function (bookmarkCard) {
        var apiUrl = "document/metadata?siteId=" + bookmarkCard.siteId + "&webId=" + bookmarkCard.webId +
            ("&listId=" + bookmarkCard.listId + "&uniqueId=" + bookmarkCard.listItemUniqueId + "&url=" + bookmarkCard.url) +
            (bookmarkCard.groupId ? "&groupId=" + bookmarkCard.groupId : '');
        return this._loadSPHomeHttpClient()
            .then(function (_sphomeHttpClient) { return _sphomeHttpClient.get(apiUrl); });
    };
    BookmarksDataProvider.prototype._loadSPHomeHttpClient = function () {
        var _this = this;
        if (this._spHomeHttpClient) {
            return Promise.resolve(this._spHomeHttpClient);
        }
        var componentId = '3157040b-4feb-40c4-9fe5-ec3b41d679ff'; // sp-home-http-client
        if (!this._alreadyGettingSPHomeHttpClientPromise) {
            this._alreadyGettingSPHomeHttpClientPromise = _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0__["SPComponentLoader"].loadComponentById(componentId)
                .then(function (module) {
                _this._spHomeHttpClient = new module.SPHomeHttpClient(_this._serviceScope);
                return _this._spHomeHttpClient;
            });
        }
        return this._alreadyGettingSPHomeHttpClientPromise;
    };
    return BookmarksDataProvider;
}());



/***/ }),

/***/ "R7iS":
/*!*************************************************************!*\
  !*** ./lib/dataProviders/blogs/utilities/BlogsUtilities.js ***!
  \*************************************************************/
/*! exports provided: BlogsUtilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlogsUtilities", function() { return BlogsUtilities; });
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _news_utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../news/utilities/NewsUtilities */ "JpAn");


/**
 * Contains utility functions that are used by BlogsDataProvider.
 * @internal
 */
var BlogsUtilities = /** @class */ (function () {
    function BlogsUtilities() {
    }
    BlogsUtilities.extractBlogsItems = function (data, pageContext) {
        var blogsItems = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var result = data_1[_i];
            var blogsItem = {
                author: result.CreatedBy.Name,
                authorAccountName: result.CreatedBy.AccountName,
                description: (result.Description) ? result.Description : '',
                image: BlogsUtilities._getImageUrl(pageContext, result),
                publishedOn: !result.FirstPublished ? new Date(result.Modified) : new Date(result.FirstPublished),
                publishedOnRelativeTime: !result.FirstPublishedRelativeTime
                    ? (Object(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["getRelativeDateTimeStringForLists"])(result.ModifiedRelativeTime) || '')
                    : (Object(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["getRelativeDateTimeStringForLists"])(result.FirstPublishedRelativeTime) || ''),
                title: result.Title || result.FileName,
                url: result.AbsoluteUrl,
                listItemId: result.Id,
                viewCounts: undefined,
                isHelpArticle: false,
                version: result.Version,
                uniqueId: result.UniqueId,
                siteId: result.SiteID || pageContext.site.id.toString(),
                webId: result.WebId || pageContext.web.id.toString()
            };
            blogsItems.push(blogsItem);
        }
        return blogsItems;
    };
    BlogsUtilities._getImageUrl = function (pageContext, result) {
        if (result.BannerThumbnailUrl) {
            return result.BannerThumbnailUrl;
        }
        return !result.BannerImageUrl
            ? ''
            : _news_utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_1__["NewsUtilities"].processBannerImageUrlPart(result.BannerImageUrl, result.UniqueId, pageContext, _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["PreviewUtility"].smallestBreakPointWidth);
    };
    return BlogsUtilities;
}());



/***/ }),

/***/ "Rbn4":
/*!*************************************************!*\
  !*** ./lib/dataProviders/event/Strings.resx.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_fUkdGpCBq7+yVPCVLIvH7w';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "S/19":
/*!*****************************!*\
  !*** ./lib/search/index.js ***!
  \*****************************/
/*! exports provided: SearchAPIRequest, SearchAPISortDirection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SearchAPIRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SearchAPIRequest */ "rOX9");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchAPIRequest", function() { return _SearchAPIRequest__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _enums_SearchAPISortDirection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums/SearchAPISortDirection */ "zDft");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchAPISortDirection", function() { return _enums_SearchAPISortDirection__WEBPACK_IMPORTED_MODULE_1__["SearchAPISortDirection"]; });





/***/ }),

/***/ "SQ4g":
/*!***********************************************!*\
  !*** external "@ms/sp-list-item-data-source" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_SQ4g__;

/***/ }),

/***/ "SkGr":
/*!***********************************************************!*\
  !*** ./lib/dataProviders/event/EventTimeZoneUtilities.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/i18n-utilities */ "Ycni");
/* harmony import */ var _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__);
// @copyright (c) Microsoft Corporation. All rights reserved.


var EventTimeZoneUtilities = /** @class */ (function () {
    function EventTimeZoneUtilities() {
    }
    /**
     * Utility function to convert utc response date string to utc date object
     * @param dateString represents the date string
     * @param timeZone represents the timezone information
     * @param isAllDay represents whether the event is all day event. true means all day and false means not all day.
     * @returns the utc timezone date information
     */
    EventTimeZoneUtilities.dateStringToUTCDate = function (dateString, timeZone, isAllDay) {
        if (EventTimeZoneUtilities._allDayKillSwitch.isActivated()) {
            return new Date(dateString);
        }
        var date = new Date(EventTimeZoneUtilities.ensureISOTimestamp(dateString));
        if (!isAllDay) {
            return date;
        }
        // When all-day, the h/min/s/ms data are 0, and should be treaded as local time(user's timezone)
        var localSPDate = new _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_0__["SPDate"]({
            fullYear: date.getUTCFullYear(),
            month: date.getUTCMonth(),
            date: date.getUTCDate(),
            hours: date.getUTCHours(),
            minutes: date.getUTCMinutes(),
            seconds: date.getUTCSeconds(),
            milliseconds: date.getUTCMilliseconds()
        });
        var utcSPDate = localSPDate.convertToUTC(timeZone);
        var utcDate = new Date(Date.UTC(utcSPDate.fullYear, utcSPDate.month, utcSPDate.date, utcSPDate.hours, utcSPDate.minutes, utcSPDate.seconds, utcSPDate.milliseconds));
        return utcDate;
    };
    /**
     * Utility function to convert utc response date string to local date object
     * @param dateString represents the date string
     * @param timeZone represents the timezone information
     * @param isAllDay represents whether the event is all day event. true means all day and false means not all day.
     * @returns the local timezone date information
     */
    EventTimeZoneUtilities.dateStringToLocalDate = function (dateString, timeZone, isAllDay) {
        var date = new Date(EventTimeZoneUtilities.ensureISOTimestamp(dateString));
        if (!timeZone) {
            return date;
        }
        var utcSPDate = new _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_0__["SPDate"]({
            fullYear: date.getUTCFullYear(),
            month: date.getUTCMonth(),
            date: date.getUTCDate(),
            hours: date.getUTCHours(),
            minutes: date.getUTCMinutes(),
            seconds: date.getUTCSeconds(),
            milliseconds: date.getUTCMilliseconds()
        });
        // When all-day, the h/min/s/ms data are 0, and should be treaded as local time(user's timezone)
        var localSPDate = isAllDay ? utcSPDate : utcSPDate.convertFromUTC(timeZone);
        return new Date(localSPDate.fullYear, localSPDate.month, localSPDate.date, localSPDate.hours, localSPDate.minutes, localSPDate.seconds);
    };
    /**
     * Utility function to convert local timezone to utc timezone
     * @param date represents the local timezone date string
     * @param timeZone represents the timezone information
     * @returns the utc timezone date information
     */
    EventTimeZoneUtilities.localToUtc = function (date, timeZone) {
        if (!timeZone) {
            return date;
        }
        var spDate = new _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_0__["SPDate"]({
            fullYear: date.getFullYear(),
            date: date.getDate(),
            month: date.getMonth(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        });
        var utcSPDate = spDate.convertToUTC(timeZone);
        var utcDate = new Date(Date.UTC(utcSPDate.fullYear, utcSPDate.month, utcSPDate.date, utcSPDate.hours, utcSPDate.minutes, utcSPDate.seconds));
        return utcDate;
    };
    /**
     * The function converts dateString which misses Z at the end to ISO timestamp format.
     * The ISO timestamp format is like 'YYYY-MM-DDThh:mm:ssZ'.
     * The date time return from Search REST API in some sites is like '2018-12-05T21:00:00.0000000'
     * which misses Z at the end.
     * @param dateString - dateString of an event
     * @return parsed ISO dateString.
     */
    EventTimeZoneUtilities.ensureISOTimestamp = function (dateString) {
        // Check if dateString is ISO format
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?[0-9]*Z$/i.test(dateString)) {
            return dateString;
            // Check if dateString only misses the Z from ISO format
        }
        else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?[0-9]*$/i.test(dateString)) {
            return dateString.substring(0, 19) + "Z";
        }
        else {
            throw new Error("EventTimeZoneUtilities: date time string " + dateString + " is not supported");
        }
    };
    EventTimeZoneUtilities._allDayKillSwitch = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('5a511229-1361-450b-a2ac-61bdf600d687' /* '7/25/2019', 'SOX_GroupCalendarAllDayFix' */);
    return EventTimeZoneUtilities;
}());
/* harmony default export */ __webpack_exports__["default"] = (EventTimeZoneUtilities);


/***/ }),

/***/ "TYqH":
/*!*****************************************************************!*\
  !*** ./lib/dataProviders/news/utilities/NewsDigestUtilities.js ***!
  \*****************************************************************/
/*! exports provided: NewsDigestUtilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsDigestUtilities", function() { return NewsDigestUtilities; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__);





/**
* Provides utilities to work with News Digest First run experience
* @internal
*/
var NewsDigestUtilities = /** @class */ (function () {
    function NewsDigestUtilities(pageContext, spHttpClient, newsDigestBubbleType) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(pageContext, 'pageContext');
        this._pageContext = pageContext;
        this._spHttpClient = spHttpClient;
        this._newsDigestBubbleType = newsDigestBubbleType;
        this._absoluteUrl = this._pageContext.web.absoluteUrl;
        return this;
    }
    Object.defineProperty(NewsDigestUtilities.prototype, "_newsDigestFirstExperienceBitRestApiUrl", {
        get: function () {
            return this._absoluteUrl + '/_api/SP.Directory.DirectorySession/GetGraphUser(principalName='
                + '\''
                + _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["UriEncoding"].encodeURIComponent(this._pageContext.user.loginName)
                + '\')';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewsDigestUtilities.prototype, "_newsDigestFirstExperienceBitRestUrl", {
        get: function () {
            return this._newsDigestFirstExperienceBitRestApiUrl
                + '?$select='
                + this._newsDigestBubbleType;
        },
        enumerable: true,
        configurable: true
    });
    NewsDigestUtilities.readCachedFirstRunExperience = function (key) {
        var firstRun = window.localStorage.getItem(key);
        if (!firstRun) {
            return undefined;
        }
        return firstRun === 'true' ? true : false;
    };
    NewsDigestUtilities.prototype.writeCachedFirstRunExperience = function (firstRunExperience) {
        var key = this._newsDigestBubbleType;
        var firstRun = window.localStorage.getItem(key);
        var firstRunString = String(firstRunExperience);
        if (firstRun !== firstRunString) {
            try {
                window.localStorage.setItem(key, firstRunString);
            }
            catch (error) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logError(NewsDigestUtilities._logSource, error);
            }
        }
    };
    NewsDigestUtilities.prototype.showFirstRun = function () {
        var firstRunExpeienceCache = NewsDigestUtilities.readCachedFirstRunExperience(this._newsDigestBubbleType);
        if (firstRunExpeienceCache === true) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logVerbose(NewsDigestUtilities._logSource, this._newsDigestBubbleType + ' is true in the local storage');
            return Promise.resolve(false);
        }
        else if (firstRunExpeienceCache === false) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logVerbose(NewsDigestUtilities._logSource, this._newsDigestBubbleType + ' is false in the local storage');
            return Promise.resolve(true);
        }
        else {
            return this.getFirstRunBitApi();
        }
    };
    NewsDigestUtilities.prototype.setFirstRunSeen = function (newsDigestFirstRunSeenByUser) {
        var _this = this;
        var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('SetNewsDigestFirstRunExperienceAPI');
        var data = {};
        data[this._newsDigestBubbleType] = Boolean(newsDigestFirstRunSeenByUser);
        var contentType = 'application/json; odata=minimalmetadata';
        var headers = new Headers();
        headers.append('Accept', "*/*, " + contentType);
        headers.append('Content-Type', contentType);
        headers.append('X-HTTP-Method', 'PATCH');
        headers.append('X-ClientType', 'NewsDigest_SetFirstRunBit');
        return this._spHttpClient.post(this._newsDigestFirstExperienceBitRestApiUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__["SPHttpClient"].configurations.v1, {
            body: JSON.stringify(data),
            headers: headers
        }).then(function (response) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logVerbose(NewsDigestUtilities._logSource, "Set news digest first run bit to API: " + newsDigestFirstRunSeenByUser);
            qosMonitor.writeSuccess();
            _this.writeCachedFirstRunExperience(newsDigestFirstRunSeenByUser);
        }).catch(function (error) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logError(NewsDigestUtilities._logSource, error);
            qosMonitor.writeUnexpectedFailure('SetNewsDigestFirstRunExperienceAPI', error);
            throw error;
        });
    };
    NewsDigestUtilities.prototype.getFirstRunBitApi = function () {
        var _this = this;
        var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('GetNewsDigestFirstRunExperienceAPI');
        var headers = new Headers();
        headers.append('X-ClientType', 'NewsDigest_GetFirstRunBit');
        return this._spHttpClient.get(this._newsDigestFirstExperienceBitRestUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__["SPHttpClient"].configurations.v1, {
            headers: headers
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            var newsDigestFirstExperienceBit = data[_this._newsDigestBubbleType];
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logVerbose(NewsDigestUtilities._logSource, "Get news digest first run bit from API, status: " + newsDigestFirstExperienceBit);
            qosMonitor.writeSuccess();
            _this.writeCachedFirstRunExperience(newsDigestFirstExperienceBit);
            return !newsDigestFirstExperienceBit;
        }).catch(function (error) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logError(NewsDigestUtilities._logSource, error);
            qosMonitor.writeUnexpectedFailure('FailedToGetNewsDigestFirstExperienceError', error);
            return false;
        });
    };
    NewsDigestUtilities._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_LogSource"].create('NewsDigestFirstRunDataProvider');
    return NewsDigestUtilities;
}());



/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "Uv9d":
/*!****************************************************!*\
  !*** ./lib/dataProviders/page/loc/Strings.resx.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_aoF309oHcGYroBc7qbZoFw';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "WzQS":
/*!**********************************************!*\
  !*** ./lib/dataProviders/viewcount/index.js ***!
  \**********************************************/
/*! exports provided: ViewCountDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewCountDataProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewCountDataProvider */ "7REe");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewCountDataProvider", function() { return _ViewCountDataProvider__WEBPACK_IMPORTED_MODULE_0__["ViewCountDataProvider"]; });




/***/ }),

/***/ "X+PM":
/*!*********************************************!*\
  !*** external "@microsoft/sp-page-context" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_X_PM__;

/***/ }),

/***/ "Xkwe":
/*!**************************************************!*\
  !*** ./lib/dataProviders/DataProviderFlights.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
// @copyright Microsoft Corporation. All rights reserved.

var DataProviderFlights = /** @class */ (function () {
    function DataProviderFlights() {
    }
    DataProviderFlights.isFilterForOtherSitesEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1540 /* WEXNewsFilterForOtherSources */);
    };
    DataProviderFlights.isHCWPSPViewReplaceSPQueryEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1489 /* SOXHCWPSPViewReplaceSPQuery */);
    };
    return DataProviderFlights;
}());
/* harmony default export */ __webpack_exports__["default"] = (DataProviderFlights);


/***/ }),

/***/ "XoXQ":
/*!*********************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/spfx-tools/loader-cased-file/lib?name=icon_[name:lower]_[hash:8].[ext]!./lib/dataProviders/news/assets/helpitemimg1-2x.png ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "icon_helpitemimg1-2x_296a0ca6.png";

/***/ }),

/***/ "Y4on":
/*!******************************************!*\
  !*** ./lib/dataProviders/event/index.js ***!
  \******************************************/
/*! exports provided: EventDataProvider, EventsSearchDataProvider, EventsListDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventDataProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventDataProvider */ "pKc4");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventDataProvider", function() { return _EventDataProvider__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _EventsSearchDataProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventsSearchDataProvider */ "x7Ly");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventsSearchDataProvider", function() { return _EventsSearchDataProvider__WEBPACK_IMPORTED_MODULE_1__["EventsSearchDataProvider"]; });

/* harmony import */ var _EventsListDataProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventsListDataProvider */ "3p+P");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventsListDataProvider", function() { return _EventsListDataProvider__WEBPACK_IMPORTED_MODULE_2__["EventsListDataProvider"]; });






/***/ }),

/***/ "Ycni":
/*!*************************************!*\
  !*** external "@ms/i18n-utilities" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Ycni__;

/***/ }),

/***/ "YoTJ":
/*!****************************************************!*\
  !*** ./lib/dataProviders/common/TokenUtilities.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @internal
 */
var TokenUtilities = /** @class */ (function () {
    function TokenUtilities() {
    }
    TokenUtilities.isValidMeToken = function (value) {
        var regex = new RegExp('^\\[me\\]$', 'i');
        return regex.test(value);
    };
    TokenUtilities.isValidTodayToken = function (value) {
        var regex = new RegExp('^\\[today\\]([\\+|\\-]\\d+$)?$', 'i');
        return regex.test(value);
    };
    return TokenUtilities;
}());
/* harmony default export */ __webpack_exports__["default"] = (TokenUtilities);


/***/ }),

/***/ "aE90":
/*!*********************************************************!*\
  !*** ./lib/dataProviders/news/models/NewsDataSource.js ***!
  \*********************************************************/
/*! exports provided: newsDataSourceProp, _appendAudienceFilteringQueryParam, _appendLanguageOverrideQueryParam, _getExtraDataForLogging */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newsDataSourceProp", function() { return newsDataSourceProp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_appendAudienceFilteringQueryParam", function() { return _appendAudienceFilteringQueryParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_appendLanguageOverrideQueryParam", function() { return _appendLanguageOverrideQueryParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getExtraDataForLogging", function() { return _getExtraDataForLogging; });
/* harmony import */ var _DataProvidersKillSwitches__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../DataProvidersKillSwitches */ "evK2");
/* harmony import */ var _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/NewsUtilities */ "JpAn");


/**
 * @internal
 */
var newsDataSourceProp = 'newsDataSourceProp';
var audienceFilterQueryParam = 'filterByAudience';
/**
 * @internal
 * @returns Query string portion for audience targeting if requested or empty
 * @param requestInfo - request metadata which contains audienceTargetingEnabled flag
 */
function _appendAudienceFilteringQueryParam(requestInfo) {
    if (requestInfo.audienceTargetingEnabled) {
        return "&" + audienceFilterQueryParam + "=true";
    }
    return '';
}
/**
 * @internal
 * @returns Query string portion for multilingual page language override
 * @param requestInfo - request metadata which contains audienceTargetingEnabled flag
 */
function _appendLanguageOverrideQueryParam(requestInfo) {
    var languageOverride = requestInfo.languageOverride;
    if (languageOverride) {
        return "&languageOverride=" + languageOverride;
    }
    return '';
}
/**
 * @internal
 * @returns Extra data for QoS monitor logging for audience targeting status
 * @param requestInfo - request metadata which contains audienceTargetingEnabled flag,
 *  KQL and CAML filter queries if any available
 */
function _getExtraDataForLogging(requestInfo, pageContext) {
    var extraData = {
        'audienceTargetingEnabled': !!requestInfo.audienceTargetingEnabled,
        'isOnSeeAllPage': _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_1__["NewsUtilities"].isOnSeeAllPage,
        // map isLanguageOverride value to Qos_extraData_isAdvancedMode as an existing field must be used for Jarvis chart
        'isAdvanceMode': !!requestInfo.languageOverride
    };
    if (_DataProvidersKillSwitches__WEBPACK_IMPORTED_MODULE_0__["default"].reuseAliasFieldForFilters.isActivated()) {
        // TODO: Using the string literal to KS changes,
        // Remove tslint disable while graduating KS 9052fbee-52a4-4153-b9e0-6133c6b74f4e WEX_NewsFiltersReuseAliasField
        /* tslint:disable:no-string-literal */
        extraData['filterCAMLQueryAdded'] = !!requestInfo.serializedFilterQuery;
        extraData['filterKQLQueryAdded'] = !!requestInfo.filterKQLQuery;
        /* tslint:disable:no-string-literal */
    }
    else {
        var filterAddedInfo = 'noFilter';
        if (!!requestInfo.serializedFilterQuery) {
            filterAddedInfo = 'filterCAMLQueryAdded';
        }
        else if (!!requestInfo.filterKQLQuery) {
            filterAddedInfo = 'filterKQLQueryAdded';
        }
        // TODO: Using the string literal to KS changes,
        // Remove tslint disable while graduating KS 9052fbee-52a4-4153-b9e0-6133c6b74f4e WEX_NewsFiltersReuseAliasField
        extraData['alias'] = filterAddedInfo; /* tslint:disable-line:no-string-literal */
    }
    if (pageContext
        && pageContext.legacyPageContext
        && pageContext.legacyPageContext.isHubSite) {
        extraData.service = 'HubSite';
    }
    return extraData;
}


/***/ }),

/***/ "c2YK":
/*!***********************************************!*\
  !*** external "@ms/sp-list-view-data-source" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_c2YK__;

/***/ }),

/***/ "cWOI":
/*!************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-media/2.0.115/node_modules/@ms/odsp-media/dist/media/images/news/Modernize_News.svg ***!
  \************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "modernize_news_a3fe9f83e59c20415da4c571d192296b.svg";

/***/ }),

/***/ "dONd":
/*!*******************************************************************************!*\
  !*** ./lib/dataProviders/search/managedProperty/DeferredManagedProperties.js ***!
  \*******************************************************************************/
/*! exports provided: DeferredManagedProperties */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredManagedProperties", function() { return DeferredManagedProperties; });
/**
 * @public
 */
var DeferredManagedProperties = /** @class */ (function () {
    function DeferredManagedProperties() {
    }
    DeferredManagedProperties.ensureQueryableManagedProperties = function () {
        if (!DeferredManagedProperties._loadedQueryableManagedPropertiesPromise) {
            DeferredManagedProperties._loadedQueryableManagedPropertiesPromise = __webpack_require__.e(/*! import() | sp-queryablemanagedproperties */ "sp-queryablemanagedproperties").then(__webpack_require__.bind(null, /*! ./QueryableManagedProperties */ "n9CK")).then(function (module) {
                return module.default;
            });
        }
        return DeferredManagedProperties._loadedQueryableManagedPropertiesPromise;
    };
    DeferredManagedProperties.ensureRetrievableManagedProperties = function () {
        if (!DeferredManagedProperties._loadedRetrievableManagedPromise) {
            DeferredManagedProperties._loadedRetrievableManagedPromise = __webpack_require__.e(/*! import() | sp-retrievablemanagedproperties */ "sp-retrievablemanagedproperties").then(__webpack_require__.bind(null, /*! ./RetrievableManagedProperties */ "oz+a")).then(function (module) {
                return module.default;
            });
        }
        return DeferredManagedProperties._loadedRetrievableManagedPromise;
    };
    return DeferredManagedProperties;
}());



/***/ }),

/***/ "dU3L":
/*!********************************************************!*\
  !*** ./lib/dataProviders/search/SearchDataProvider.js ***!
  \********************************************************/
/*! exports provided: SearchDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchDataProvider", function() { return SearchDataProvider; });
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _search_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../search/index */ "S/19");
/* harmony import */ var _KQLQueryBuilder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./KQLQueryBuilder */ "0oRV");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loc/Strings.resx */ "wlCg");







/**
* Provides a simple data provider for the SharePoint Search REST API.
* @internal
*/
var SearchDataProvider = /** @class */ (function () {
    function SearchDataProvider(options) {
        var _this = this;
        this.id = 'Search';
        this.title = _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].SearchDataProviderTitle;
        this.options = options;
        this.options.serviceScope.whenFinished(function () {
            _this._spHttpClient = _this.options.serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_3__["SPHttpClient"].serviceKey);
            _this._pageContext = _this.options.serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__["PageContext"].serviceKey);
            _this._initVariables();
        });
        this._searchAPIRequest = new _search_index__WEBPACK_IMPORTED_MODULE_4__["SearchAPIRequest"](options.serviceScope, false /* isMockMode */, options.qosPrefix || '');
        // Set fall back locale language when it is not defined.
        if (!_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["Locale"].language) {
            _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["Locale"].language = 'en-us';
        }
        // The constructor is returned via the DataProviderLoader.  The receiver can call it with ServiceScope
        // and receive the instance returned here.
        return this;
    }
    SearchDataProvider.prototype.requestData = function (options) {
        var searchAPIQueryOptions = null; /* tslint:disable-line:no-null-keyword */
        // Determine if request is for getting managed properties.
        if (Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["has"])(options.searchOptions, 'query.managedPropertiesRefinerOptions')) {
            searchAPIQueryOptions =
                _KQLQueryBuilder__WEBPACK_IMPORTED_MODULE_5__["KQLQueryBuilder"].generateSearchAPIQueryOptionsForManagedProperties(options.searchOptions);
            return this._searchAPIRequest
                .getManagedPropertiesQueryResponse(searchAPIQueryOptions)
                .catch(function (error) { return Promise.reject(error); });
        }
        if (options.returnCachedValues) {
            return this._returnCachedResults();
        }
        if (!!options.searchAPIQueryOptions) {
            searchAPIQueryOptions = options.searchAPIQueryOptions;
        }
        else if (!!options.searchOptions) {
            var def = _KQLQueryBuilder__WEBPACK_IMPORTED_MODULE_5__["KQLQueryBuilder"].generateQuery(options.searchOptions, this._pageContext);
            searchAPIQueryOptions =
                _KQLQueryBuilder__WEBPACK_IMPORTED_MODULE_5__["KQLQueryBuilder"].generateSearchAPIQueryOptions(def.queryTemplate, def.timeZoneId, options.searchOptions);
        }
        if (!searchAPIQueryOptions) {
            return Promise.resolve([]);
        }
        return this._searchAPIRequest.getSearchQueryResponse(searchAPIQueryOptions)
            .then(this._mapResponse)
            .catch(function (error) { return Promise.reject(error); });
    };
    /*
     * Override to initialize variables based on IDataProviderOptions of your data provider.
     */
    SearchDataProvider.prototype._initVariables = function () {
        // Default behavior is a noop.
    };
    /*
     * Override to convert the search response properties to the appropriate data type array for your data provider.
     */
    SearchDataProvider.prototype._mapResponse = function (searchResult) {
        // Default behavior is no transformation.
        return Promise.resolve(searchResult);
    };
    /**
     * Override to return cached results if no need to query for search API
     */
    SearchDataProvider.prototype._returnCachedResults = function () {
        return Promise.resolve([]);
    };
    return SearchDataProvider;
}());



/***/ }),

/***/ "evK2":
/*!********************************************************!*\
  !*** ./lib/dataProviders/DataProvidersKillSwitches.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__);
// @copyright Microsoft Corporation. All rights reserved.


var DataProvidersKillSwitches = /** @class */ (function () {
    function DataProvidersKillSwitches() {
    }
    DataProvidersKillSwitches.isSearchRespectsUserTimeZoneKillSwitchActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('e494e871-d9a3-42d6-b143-1f4ca7049af2'), '5/31/2019', 'Search respects user timezone instead of browser timezone');
    };
    DataProvidersKillSwitches.updateModifiedDate = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('cec65011-7112-45b9-a22c-1ad9406afd03' /* '08/30/2019',
    'use newly configured property (modified date) to display modified date'*/);
    DataProvidersKillSwitches.wexUserAccountNameForPhoto = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('94c0c1ee-88fc-4d18-b9e5-37306447b5d3' /* '10/11/2019',
    'Use Account name to collect get user profile photo'*/);
    DataProvidersKillSwitches.reuseAliasFieldForFilters = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('9052fbee-52a4-4153-b9e0-6133c6b74f4e' /* '10/23/2019', 'WEX_NewsFiltersReuseAliasField' */);
    DataProvidersKillSwitches.filterNewsByLanguage = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('a2635f1e-9279-4b5c-8567-011f1226d87f' /* '10/28/2019', 'WEX_FilterNewsByLanguage' */);
    DataProvidersKillSwitches.isDataProviderRetries = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('30497c16-b2e4-4775-911c-c68052694375' /*'10/28/2019', 'WEX_DataRetriesKillSwitch' */);
    return DataProvidersKillSwitches;
}());
/* harmony default export */ __webpack_exports__["default"] = (DataProvidersKillSwitches);


/***/ }),

/***/ "g25W":
/*!****************************************************!*\
  !*** ./lib/dataProviders/page/PageDataProvider.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseDataProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseDataProvider */ "L/SE");
/* harmony import */ var _PageDataSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageDataSource */ "7dHj");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loc/Strings.resx */ "Uv9d");
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
 * @internal
 */
var PageDataProvider = /** @class */ (function (_super) {
    __extends(PageDataProvider, _super);
    function PageDataProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 'Page';
        _this.title = _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].PageDataProviderTitle;
        return _this;
    }
    PageDataProvider.prototype.getItems = function (request) {
        if (!this._pageDataSource) {
            this._pageDataSource = new _PageDataSource__WEBPACK_IMPORTED_MODULE_1__["default"]({ spHttpClient: this.spHttpClient });
        }
        return this._pageDataSource.getPageCanvasContent(request.pageRelativeUrl)
            .then(function (canvasJson) { return [canvasJson]; });
    };
    return PageDataProvider;
}(_BaseDataProvider__WEBPACK_IMPORTED_MODULE_0__["BaseDataProvider"]));
/* harmony default export */ __webpack_exports__["default"] = (PageDataProvider);


/***/ }),

/***/ "gnrN":
/*!****************************************************!*\
  !*** ./lib/dataProviders/list/CAMLQueryBuilder.js ***!
  \****************************************************/
/*! exports provided: CAMLQueryBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAMLQueryBuilder", function() { return CAMLQueryBuilder; });
/* harmony import */ var _common_TokenUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/TokenUtilities */ "YoTJ");
/**
 * @file CAMLQueryBuilder.ts
 * @copyright (c) Microsoft Corporation. All rights reserved.
 */

var TITLE_CONTAINING_FIELD_NAME = 'Title';
var CREATED_BY_FIELD_NAME = 'Author';
var PAGE_AUTHOR_FIELD_NAME = '_AuthorByline';
var MODIFIED_BY_FIELD_NAME = 'Editor';
var RECENTLY_ADDED_FIELD_NAME = 'Created';
var RECENTLY_CHANGED_FIELD_NAME = 'Modified';
var MODIFIED_FIELD_NAME = 'Modified';
/**
 * @internal
 */
var CAMLQueryBuilder = /** @class */ (function () {
    function CAMLQueryBuilder() {
    }
    /**
     * Helper method to build CAML query XML.
     * @param options - query options in IListOptions format
     */
    CAMLQueryBuilder.generateCAMLQuery = function (options, encodeForGETRequest) {
        var _this = this;
        // set defaults
        options = options || {};
        options.documentTypes = options.documentTypes || [99 /* Any */];
        options.fields = options.fields
            || ['Editor', 'FileLeafRef', 'File_x0020_Type', 'ID', 'Modified', 'Title', 'UniqueID'];
        options.filters = options.filters || [];
        options.fieldDictionary = options.fieldDictionary || {};
        var criteria = [];
        var criteriaClose = [];
        var foundAny = false;
        options.documentTypes.map(function (documentType) {
            switch (documentType) {
                case 99 /* Any */:
                    foundAny = true;
                    break;
                case 1 /* Word */:
                    // @todo: VSO #340007 - share these string lists with KQLQueryBuilder instead of having them in two places
                    criteria.push(_this._documentTypeCriteria(['doc', 'docm', 'docx']));
                    break;
                case 2 /* Excel */:
                    criteria.push(_this._documentTypeCriteria(['xls', 'xlsb', 'xlsm', 'xlsx']));
                    break;
                case 3 /* PowerPoint */:
                    criteria.push(_this._documentTypeCriteria(['pot', 'potx', 'ppt', 'pptm', 'pptx']));
                    break;
                case 4 /* OneNote */:
                    criteria.push(_this._documentTypeCriteria(['one', 'onepkg', 'ms-one-stub', 'onetoc', 'onetoc2']));
                    break;
                case 5 /* Visio */:
                    criteria.push(_this._documentTypeCriteria(['vsd', 'vsdm', 'vsdx', 'vdw']));
                    break;
                case 10 /* PDF */:
                    criteria.push(_this._documentTypeCriteria(['pdf']));
                    break;
            }
        });
        if (foundAny) {
            // Ignore other document type criteria if DocumentType.Any is also selected.
            criteria = [];
        }
        if (criteria.length) {
            criteria = ['<And><In><FieldRef Name="File_x0020_Type" /><Values>'].concat(criteria, '</Values></In>');
            criteriaClose.push('</And>');
        }
        if (options.contentTypes && options.contentTypes.indexOf(10 /* News */) > -1) {
            // PromotedState of news page item is 2.
            criteria.push("<And><Eq><FieldRef Name=\"PromotedState\" /><Value Type=\"Integer\">2</Value></Eq>");
            criteriaClose.push('</And>');
        }
        var sortField = options.sortField || MODIFIED_FIELD_NAME;
        var sortOrderAscending = 'true';
        if (sortField === MODIFIED_FIELD_NAME) {
            sortOrderAscending = 'false';
        }
        var rowLimit = '';
        if (options.maxItemsPerPage) {
            // @todo: consider using paging retrieval of data
            rowLimit = "<RowLimit Paged=\"false\">" + options.maxItemsPerPage + "</RowLimit>";
        }
        var viewFields = options.fields.map(function (field) { return "<FieldRef Name=\"" + field + "\" />"; }).join('');
        return '<View Scope="RecursiveAll"\>' +
            '<Query>' +
            CAMLQueryBuilder.generateCAMLFilter(options, criteria, criteriaClose, encodeForGETRequest) +
            '<OrderBy>' +
            (
            // @todo: consider supporting multiple field sorts either automatically or by user selection
            "<FieldRef Name=\"" + sortField + "\" Ascending=\"" + sortOrderAscending + "\" />") +
            '</OrderBy>' +
            '</Query>' +
            '<ViewFields>' +
            viewFields +
            '</ViewFields>' +
            rowLimit +
            '</View>';
    };
    /**
     * Helper method to build CAML query XML.
     * @param options - query options in IListOptions format
     * @param criteria - optional criteria to be added to the filter CAML
     * @param criteriaClose - optional closing markup only required if criteria was provided
     */
    CAMLQueryBuilder.generateCAMLFilter = function (options, criteria, criteriaClose, encodeForGETRequest) {
        var _this = this;
        criteria = criteria || [];
        criteriaClose = criteriaClose || [];
        // If filterGroup is specified, will build CAML filter from filter group instead of filters
        if (options.filterGroup) {
            var filterCriteria = this._generateCriteriaFromFilterGroup(options.filterGroup, options.fieldDictionary, encodeForGETRequest);
            return ('<Where>' +
                criteria.join('') +
                (filterCriteria ? '<And>' : '') +
                filterCriteria +
                '<Eq>' +
                // exclude folders from results
                '<FieldRef Name="FSObjType" />' +
                '<Value Type="Integer">0</Value>' +
                '</Eq>' +
                (filterCriteria ? '</And>' : '') +
                criteriaClose.join('') +
                '</Where>');
        }
        var sameTypeAndNameFiltersMap = new Map();
        options.filters.map(function (filter) {
            if (filter) {
                var filterFieldName = _this._generateFieldName(filter);
                var filterCriteria = _this._generateCriteria(filter, options.fieldDictionary, encodeForGETRequest);
                if (filterFieldName && filterCriteria) {
                    if (!sameTypeAndNameFiltersMap.get(filter.filterType)) {
                        sameTypeAndNameFiltersMap.set(filter.filterType, new Map());
                    }
                    if (!sameTypeAndNameFiltersMap.get(filter.filterType).get(filterFieldName)) {
                        sameTypeAndNameFiltersMap.get(filter.filterType).set(filterFieldName, []);
                    }
                    sameTypeAndNameFiltersMap.get(filter.filterType).get(filterFieldName).push(filterCriteria);
                }
            }
        });
        sameTypeAndNameFiltersMap.forEach(function (sameNameFiltersMap) {
            sameNameFiltersMap.forEach(function (filters) {
                // 1. Generate the <Or> tags within the filters of the same type and field name.
                // 2. Generate <And> tags for filters generated from step 1.
                criteria.push("<And>" + _this._combineCriteria(filters, 'Or'));
                criteriaClose.push('</And>');
            });
        });
        return '<Where>' +
            criteria.join('') + '<Eq>' +
            // exclude folders from results
            '<FieldRef Name="FSObjType" />' +
            '<Value Type="Integer">0</Value>' +
            '</Eq>' + criteriaClose.join('') +
            '</Where>';
    };
    CAMLQueryBuilder._generateCriteriaFromFilterGroup = function (filterGroup, fieldDictionary, encodeForGETRequest) {
        var _this = this;
        var resultCriteria = '';
        // Build criteria from filters
        if (filterGroup.filters) {
            resultCriteria = filterGroup.filters.reduce(function (previousCriteria, currentFilter) {
                var currentCriteria = _this._generateCriteria(currentFilter, fieldDictionary, encodeForGETRequest);
                return CAMLQueryBuilder._appendCriteria(filterGroup.logicalOperator, previousCriteria, currentCriteria);
            }, resultCriteria);
        }
        // Build criteria from groups
        if (filterGroup.filterGroups) {
            resultCriteria = filterGroup.filterGroups.reduce(function (previousCriteria, currentFilterGroup) {
                var currentCriteria = _this._generateCriteriaFromFilterGroup(currentFilterGroup, fieldDictionary);
                return CAMLQueryBuilder._appendCriteria(filterGroup.logicalOperator, previousCriteria, currentCriteria);
            }, resultCriteria);
        }
        return resultCriteria;
    };
    CAMLQueryBuilder._appendCriteria = function (logicalOperator, previousCriteria, currentCriteria) {
        var normalizedOperator = logicalOperator === "AND" /* And */ ? 'And' : 'Or';
        if (previousCriteria && currentCriteria) {
            return "<" + normalizedOperator + ">" + previousCriteria + currentCriteria + "</" + normalizedOperator + ">";
        }
        else {
            return previousCriteria + currentCriteria;
        }
    };
    CAMLQueryBuilder._generateFieldName = function (filter) {
        switch (filter.filterType) {
            case 1 /* TitleContaining */:
                return TITLE_CONTAINING_FIELD_NAME;
            case 4 /* CreatedBy */:
                return CREATED_BY_FIELD_NAME;
            case 9 /* PageAuthorByline */:
                return PAGE_AUTHOR_FIELD_NAME;
            case 5 /* ModifiedBy */:
                return MODIFIED_BY_FIELD_NAME;
            case 8 /* RecentlyAdded */:
                return RECENTLY_ADDED_FIELD_NAME;
            case 7 /* RecentlyChanged */:
                return RECENTLY_CHANGED_FIELD_NAME;
            case 6 /* Field */:
                return filter.fieldname;
        }
        return '';
    };
    CAMLQueryBuilder._generateCriteria = function (filter, fieldDictionary, encodeForGETRequest) {
        var encodedValue = filter.value ?
            this._encodeUserEntryForXML(filter.value.toString(), encodeForGETRequest) :
            '';
        switch (filter.filterType) {
            case 1 /* TitleContaining */:
                return encodedValue
                    ? "<Contains><FieldRef Name=\"Title\"/><Value Type=\"Text\">" + encodedValue + "</Value></Contains>"
                    : '';
            case 4 /* CreatedBy */:
                return this._userTypeCriteria(filter.userType, encodedValue, CREATED_BY_FIELD_NAME, filter.op);
            case 9 /* PageAuthorByline */:
                return this._userTypeCriteria(filter.userType, encodedValue, PAGE_AUTHOR_FIELD_NAME, filter.op);
            case 5 /* ModifiedBy */:
                return this._userTypeCriteria(filter.userType, encodedValue, MODIFIED_BY_FIELD_NAME, filter.op);
            case 8 /* RecentlyAdded */:
                return this._dateTimeTypeCriteria(filter.value, RECENTLY_ADDED_FIELD_NAME);
            case 7 /* RecentlyChanged */:
                return this._dateTimeTypeCriteria(filter.value, RECENTLY_CHANGED_FIELD_NAME);
            case 6 /* Field */:
                return this._fieldTypeCriteria(filter, fieldDictionary, encodeForGETRequest);
        }
        return '';
    };
    CAMLQueryBuilder._encodeUserEntryForXML = function (entry, encodeForGETRequest) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(entry));
        if (encodeForGETRequest) {
            // .replace(new RegExp('\'', 'g'), '%27%27') is required because encodeURIComponent does not encode
            // the ' (single quote) character. For reference, see:
            // https://alanristic.wordpress.com/2013/02/16/javascript-escape-vs-encodeuri-vs-encodeuricomponent/
            // Additionaly, we need to escape the ' (single quote character) for proper CAML to SQL query execution
            // That is achieved by appending another ' before the original one. Therefore encoding ' as %27%27
            // https://stackoverflow.com/questions/1586560/how-do-i-escape-a-single-quote-in-sql-server
            return encodeURIComponent(div.innerHTML).replace(new RegExp('\'', 'g'), '%27%27');
        }
        return div.innerHTML;
    };
    CAMLQueryBuilder._documentTypeCriteria = function (extensions) {
        return extensions.map(function (extension) {
            return "<Value Type=\"Text\">" + extension + "</Value>";
        }).join('');
    };
    CAMLQueryBuilder._getISODateString = function (date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    };
    CAMLQueryBuilder._getDateTimeTypeComparisonValueElement = function (field, startDate, endDate) {
        return [
            '<And>',
            this._comparisonElement('Geq', field, "<Value Type=\"DateTime\">" + this._getISODateString(startDate) + "</Value>"),
            this._comparisonElement('Leq', field, "<Value Type=\"DateTime\">" + this._getISODateString(endDate) + "</Value>"),
            '</And>'
        ].join('');
    };
    CAMLQueryBuilder._dateTimeTypeCriteria = function (entry, field) {
        var today = new Date();
        if (typeof entry === 'number') {
            switch (entry) {
                case 1 /* Today */:
                    return this._comparisonElement('Eq', field, '<Value Type="DateTime"><Today /></Value>');
                case 2 /* Yesterday */:
                    return this._comparisonElement('Eq', field, '<Value Type="DateTime"><Today OffsetDays="-1" /></Value>');
                case 3 /* ThisWeek */:
                    var thisWeekBegin = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                    return this._getDateTimeTypeComparisonValueElement(field, thisWeekBegin, today);
                case 4 /* ThisMonth */:
                    var thisMonthBegin = new Date(today.getFullYear(), today.getMonth(), 1);
                    var thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                    return this._getDateTimeTypeComparisonValueElement(field, thisMonthBegin, thisMonthEnd);
                case 5 /* LastMonth */:
                    var lastMonthBegin = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                    var lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
                    return this._getDateTimeTypeComparisonValueElement(field, lastMonthBegin, lastMonthEnd);
                case 6 /* ThisYear */:
                    var thisYearBegin = new Date(today.getFullYear(), 0, 1);
                    var thisYearEnd = new Date(today.getFullYear(), 11, 31);
                    return this._getDateTimeTypeComparisonValueElement(field, thisYearBegin, thisYearEnd);
                case 7 /* LastYear */:
                    var lastYearBegin = new Date(today.getFullYear() - 1, 0, 1);
                    var lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);
                    return this._getDateTimeTypeComparisonValueElement(field, lastYearBegin, lastYearEnd);
            }
        }
        return '';
    };
    CAMLQueryBuilder._userTypeCriteria = function (type, entry, field, op) {
        switch (op) {
            case 12 /* IsNull */:
                return this._comparisonElement('IsNull', field, '');
            case 1 /* Equals */:
            default:
                var currentUserCriteria = this._comparisonElement('Eq', field, '<Value Type="Integer"><UserID Type="Integer" /></Value>');
                if (type === 1 /* CurrentUser */) {
                    return currentUserCriteria;
                }
                else if (type === 2 /* SpecificUser */ && entry) {
                    return _common_TokenUtilities__WEBPACK_IMPORTED_MODULE_0__["default"].isValidMeToken(entry)
                        ? currentUserCriteria
                        : this._comparisonElement('Eq', field, "<Value Type=\"User\">" + entry.toString() + "</Value>");
                }
                return '';
        }
    };
    CAMLQueryBuilder._criteriaElement = function (operator, fieldInfo, value, encodeForGETRequest) {
        var fieldValue = encodeForGETRequest ? this._encodeUserEntryForXML(value, encodeForGETRequest) : value;
        var valueElement = "<Value Type=\"" + fieldInfo.TypeAsString + "\">" + fieldValue + "</Value>";
        if (fieldInfo.FieldTypeKind === 20 /* User */ &&
            _common_TokenUtilities__WEBPACK_IMPORTED_MODULE_0__["default"].isValidMeToken(fieldValue)) {
            valueElement = '<Value Type="Integer"><UserID Type="Integer" /></Value>';
        }
        else if (fieldInfo.FieldTypeKind === 4 /* DateTime */ &&
            _common_TokenUtilities__WEBPACK_IMPORTED_MODULE_0__["default"].isValidTodayToken(fieldValue)) {
            var offsetStr = fieldValue.substr('[today]'.length) || '0';
            var offset = parseInt(offsetStr, 0);
            valueElement = "<Value Type=\"DateTime\"><Today OffsetDays=\"" + offset + "\" /></Value>";
        }
        return this._comparisonElement(operator, fieldInfo.InternalName, valueElement);
    };
    CAMLQueryBuilder._comparisonElement = function (operator, field, valueElement) {
        return "<" + operator + "><FieldRef Name=\"" + field + "\"/>" + valueElement + "</" + operator + ">";
    };
    // <In> operator cannot handle MultiChoice and MultiTaxonomy field so we build include function with <Or>.
    CAMLQueryBuilder._includeElement = function (fieldInfo, values, encodeForGETRequest) {
        var _this = this;
        var criteria = values.map(function (value) {
            if (!value) {
                return "<IsNull><FieldRef Name=\"" + fieldInfo.InternalName + "\"/></IsNull>";
            }
            else {
                return _this._criteriaElement('Eq', fieldInfo, value, encodeForGETRequest);
            }
        });
        return this._combineCriteria(criteria, 'Or');
    };
    CAMLQueryBuilder._combineCriteria = function (criteria, operator) {
        if (!criteria || criteria.length === 0) {
            return '';
        }
        var criteriaString = '';
        for (var index = 1; index < criteria.length; index++) {
            criteriaString += "<" + operator + ">";
        }
        criteriaString += criteria[0];
        for (var index = 1; index < criteria.length; index++) {
            criteriaString += criteria[index] + "</" + operator + ">";
        }
        return criteriaString;
    };
    CAMLQueryBuilder._fieldTypeCriteria = function (filter, fieldDictionary, encodeForGETRequest) {
        var _this = this;
        if (!filter.fieldInfo && !fieldDictionary) {
            return '';
        }
        var fieldInfo = filter.fieldInfo || fieldDictionary[filter.fieldname];
        if (!fieldInfo) {
            return '';
        }
        var value = this._parseListFieldValue(filter.value, fieldInfo.FieldTypeKind);
        // blank entry considered valid criteria only for Equals, NotEqual and Between
        if (value.trim() === '' && (filter.op !== 1 /* Equals */ &&
            filter.op !== 2 /* NotEqual */ &&
            filter.op !== 9 /* Between */)) {
            return '';
        }
        var expr = '';
        switch (filter.op) {
            case 3 /* BeginsWith */:
                expr = this._criteriaElement('BeginsWith', fieldInfo, value, encodeForGETRequest);
                break;
            case 9 /* Between */:
                // written so that if only one side of the expression is provided then it is still filtered
                // this will help give instant feedback as the entries are composed
                var value2 = this._parseListFieldValue(filter.value2, fieldInfo.FieldTypeKind);
                if (value.trim() !== '' && value2.trim() !== '') {
                    expr = '<And>' +
                        this._criteriaElement('Geq', fieldInfo, value, encodeForGETRequest) +
                        this._criteriaElement('Leq', fieldInfo, value2, encodeForGETRequest) +
                        '</And>';
                }
                else if (value.trim() !== '') {
                    expr = this._criteriaElement('Geq', fieldInfo, value, encodeForGETRequest);
                }
                else if (value2.trim() !== '') {
                    expr = this._criteriaElement('Leq', fieldInfo, value2, encodeForGETRequest);
                }
                break;
            case 5 /* Contains */:
                expr = this._criteriaElement('Contains', fieldInfo, value, encodeForGETRequest);
                break;
            // not supported by CAML
            // case FilterOperator.DoesNotContain:
            case 1 /* Equals */:
                if (filter.values && filter.values.length > 0) {
                    expr = this._includeElement(fieldInfo, filter.values.map(function (filterValue) { return _this._parseListFieldValue(filterValue, fieldInfo.FieldTypeKind); }), encodeForGETRequest);
                }
                else {
                    expr = this._criteriaElement('Eq', fieldInfo, value, encodeForGETRequest);
                }
                break;
            case 8 /* GreaterThan */:
                expr = this._criteriaElement('Gt', fieldInfo, value, encodeForGETRequest);
                break;
            case 10 /* GreaterThanOrEqualTo */:
                expr = this._criteriaElement('Geq', fieldInfo, value, encodeForGETRequest);
                break;
            case 7 /* LessThan */:
                expr = this._criteriaElement('Lt', fieldInfo, value, encodeForGETRequest);
                break;
            case 11 /* LessThanOrEqualTo */:
                expr = this._criteriaElement('Leq', fieldInfo, value, encodeForGETRequest);
                break;
            case 2 /* NotEqual */:
                expr = this._criteriaElement('Neq', fieldInfo, value, encodeForGETRequest);
                break;
        }
        return expr;
    };
    // Parse entry and reformat it as needed for valid CAML.
    //
    // @todo: This code is currently a near copy of  _parseManagedPropertyFieldValue in KQLQueryBuilder. Need to
    // determine whether it is practical to merge the two or if they should remain separate to allow each to evolve for
    // their particular situations. For example, we may end up supporting more data types in CAML that are not
    // applicable to KQL.
    CAMLQueryBuilder._parseListFieldValue = function (entry, type) {
        var result = '';
        if (entry === undefined) {
            return result;
        }
        switch (type) {
            case 4 /* DateTime */:
                if (typeof entry === 'string' && _common_TokenUtilities__WEBPACK_IMPORTED_MODULE_0__["default"].isValidTodayToken(entry)) {
                    result = entry.trim();
                    break;
                }
                var dt = new Date(entry.toString());
                // is a date object?
                if (Object.prototype.toString.call(dt) === '[object Date]') {
                    // is a valid date?
                    if (!isNaN(dt.getTime())) {
                        // date format that CAML expects
                        result = "" + dt.toISOString();
                    }
                }
                break;
            case 9 /* Number */:
            case 10 /* Currency */:
                var n = parseFloat(entry.toString());
                if (!isNaN(n)) {
                    result = n.toString();
                }
                break;
            case 1 /* Integer */:
            case 5 /* Counter */:
                var i = parseInt(entry.toString(), 10);
                if (!isNaN(i)) {
                    result = i.toString();
                }
                break;
            case 20 /* User */:
            case 2 /* Text */:
            default:
                result = "" + entry.toString().trim();
                break;
        }
        return this._encodeUserEntryForXML(result);
    };
    return CAMLQueryBuilder;
}());



/***/ }),

/***/ "h10f":
/*!****************************************************!*\
  !*** ./lib/dataProviders/news/NewsDataProvider.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _models_NewsDataSource__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/NewsDataSource */ "aE90");
/* harmony import */ var _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utilities/NewsUtilities */ "JpAn");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loc/Strings.resx */ "AOs8");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */







var PageRequestHeaders = /** @class */ (function () {
    function PageRequestHeaders(method) {
        this['OData-Version'] = '3.0';
        this['If-Match'] = '*';
        this['X-HTTP-Method'] = method;
    }
    return PageRequestHeaders;
}());
/**
 * Provides a simple data provider for the SharePoint Search REST API.
 * @internal
 */
var NewsDataProvider = /** @class */ (function () {
    function NewsDataProvider(options) {
        var _this = this;
        this.id = 'News';
        this.title = _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].NewsDataProviderTitle;
        this.options = options;
        this.options.serviceScope.whenFinished(function () {
            _this._spHttpClient = _this.options.serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__["SPHttpClient"].serviceKey);
            _this._pageContext = _this.options.serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__["PageContext"].serviceKey);
            _this._absoluteUrl = _this._pageContext === undefined ? undefined : _this._pageContext.web.absoluteUrl;
        });
        if (!_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Locale"].language) {
            _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["Locale"].language = 'en-us';
        }
        return this;
    }
    NewsDataProvider.prototype.requestData = function (requestInfo) {
        var _this = this;
        var extraData = Object(_models_NewsDataSource__WEBPACK_IMPORTED_MODULE_4__["_getExtraDataForLogging"])(requestInfo);
        var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('NewsreelDataSource.getNewsItems');
        return this.executeRequest(requestInfo)
            .then(function (response) {
            extraData.correlationId = response.correlationId;
            extraData.responseStatus = response.status;
            extraData.message = response.statusMessage;
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error(response.statusText);
            }
        }).then(function (response) {
            var paddingCount = _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_5__["NewsUtilities"].getPaddingCount(requestInfo, response.value ? response.value.length : 0);
            var data = (response.value && response.value.length > 0) ?
                _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_5__["NewsUtilities"].extractNewsItems(response.value, _this._pageContext) :
                [];
            data = data.concat(_utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_5__["NewsUtilities"].getEmptyStateItems(requestInfo.emptyItemType, _this.options.serviceScope, paddingCount, requestInfo.webpartWidth));
            qosMonitor.writeSuccess(extraData);
            return data;
        }).catch(function (error) {
            qosMonitor.writeUnexpectedFailure('Unexpected', error, extraData);
            throw error;
        });
    };
    NewsDataProvider.prototype.executeRequest = function (requestInfo) {
        var body = {
            metadataFilter: requestInfo.serializedFilterQuery,
            languageOverride: requestInfo.languageOverride
        };
        var optionsToPass = {
            body: JSON.stringify(body),
            headers: new PageRequestHeaders('POST') /*request headers*/
        };
        return this._spHttpClient.post(this._getNewsItemsUrl(requestInfo), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__["SPHttpClient"].configurations.v1, optionsToPass);
    };
    NewsDataProvider.prototype._getNewsItemsUrl = function (requestInfo) {
        var webUrl = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["UriEncoding"].escapeUrlForCallback(this._absoluteUrl);
        var newsApi = '/_api/sitepages/pages/' +
            (requestInfo.audienceTargetingEnabled ? 'FeedTargeted' : 'feed') +
            '?promotedstate=2&published=true';
        var skip = '&$skip=' + (requestInfo.skip ? requestInfo.skip.toString() : '0');
        var top = '&$top=' + ((requestInfo.count > 0) ? requestInfo.count.toString() : '');
        var expand = '&$expand=CreatedBy';
        // tslint:disable-next-line: max-line-length
        var select = '&$select=Description,BannerImageUrl,BannerThumbnailUrl,AbsoluteUrl,FirstPublished,Title,FileName,Id,UniqueId,ListId,OriginalSourceItemId,OriginalSourceUrl,Path';
        return webUrl + newsApi + skip + top + expand + select;
    };
    return NewsDataProvider;
}());
/* harmony default export */ __webpack_exports__["default"] = (NewsDataProvider);


/***/ }),

/***/ "hiL/":
/*!*********************************************!*\
  !*** external "@ms/sp-component-utilities" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_hiL___;

/***/ }),

/***/ "jrLr":
/*!************************************!*\
  !*** ./lib/dataProviders/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseDataProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseDataProvider */ "L/SE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseDataProvider", function() { return _BaseDataProvider__WEBPACK_IMPORTED_MODULE_0__["BaseDataProvider"]; });

/* harmony import */ var _bookmarks_BookmarksDataProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bookmarks/BookmarksDataProvider */ "R3v1");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BookmarksDataProvider", function() { return _bookmarks_BookmarksDataProvider__WEBPACK_IMPORTED_MODULE_1__["BookmarksDataProvider"]; });

/* harmony import */ var _likes_LikeDataProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./likes/LikeDataProvider */ "BDTi");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LikeDataProvider", function() { return _likes_LikeDataProvider__WEBPACK_IMPORTED_MODULE_2__["LikeDataProvider"]; });

/* harmony import */ var _news_utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./news/utilities/NewsUtilities */ "JpAn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsUtilities", function() { return _news_utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_3__["NewsUtilities"]; });

/* harmony import */ var _news_models_NewsDataProviderIds__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./news/models/NewsDataProviderIds */ "2Rre");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "news", function() { return _news_models_NewsDataProviderIds__WEBPACK_IMPORTED_MODULE_4__["news"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "viewCounts", function() { return _news_models_NewsDataProviderIds__WEBPACK_IMPORTED_MODULE_4__["viewCounts"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "currentViewCounts", function() { return _news_models_NewsDataProviderIds__WEBPACK_IMPORTED_MODULE_4__["currentViewCounts"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hubNews", function() { return _news_models_NewsDataProviderIds__WEBPACK_IMPORTED_MODULE_4__["hubNews"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "newsDigest", function() { return _news_models_NewsDataProviderIds__WEBPACK_IMPORTED_MODULE_4__["newsDigest"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "multiSiteNews", function() { return _news_models_NewsDataProviderIds__WEBPACK_IMPORTED_MODULE_4__["multiSiteNews"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "myNews", function() { return _news_models_NewsDataProviderIds__WEBPACK_IMPORTED_MODULE_4__["myNews"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staleViewCounts", function() { return _news_models_NewsDataProviderIds__WEBPACK_IMPORTED_MODULE_4__["staleViewCounts"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "managedProperties", function() { return _news_models_NewsDataProviderIds__WEBPACK_IMPORTED_MODULE_4__["managedProperties"]; });

/* harmony import */ var _news_models_NewsDataSource__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./news/models/NewsDataSource */ "aE90");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "newsDataSourceProp", function() { return _news_models_NewsDataSource__WEBPACK_IMPORTED_MODULE_5__["newsDataSourceProp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_appendAudienceFilteringQueryParam", function() { return _news_models_NewsDataSource__WEBPACK_IMPORTED_MODULE_5__["_appendAudienceFilteringQueryParam"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_appendLanguageOverrideQueryParam", function() { return _news_models_NewsDataSource__WEBPACK_IMPORTED_MODULE_5__["_appendLanguageOverrideQueryParam"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_getExtraDataForLogging", function() { return _news_models_NewsDataSource__WEBPACK_IMPORTED_MODULE_5__["_getExtraDataForLogging"]; });

/* harmony import */ var _news_models_NewsEmptyStateType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./news/models/NewsEmptyStateType */ "NRPc");
/* harmony import */ var _news_models_NewsEmptyStateType__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_news_models_NewsEmptyStateType__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _news_models_NewsEmptyStateType__WEBPACK_IMPORTED_MODULE_6__) if(["BaseDataProvider","BookmarksDataProvider","LikeDataProvider","NewsUtilities","ExchangeViewCountsDataProvider","HubNewsDataProvider","MicroServiceNewsDataProvider","NewsDataProvider","NewsDigestDataProvider","NewsDigestUtilities","NewsSearchDataProvider","MultiSiteNewsDataProvider","MyNewsDataProvider","TokenUtilities","DeferredManagedProperties","KQLQueryBuilder","AUDIENCE_TARGET_KQL_QUERY","SearchDataProvider","PersonaSettingsCache","sanitizeSearchQueryParameter","CAMLQueryBuilder","ListDataProvider","ContentRollupDataProvider","PageDataProvider","PageDataSource","_getWebPartDataFromPage","PageSearchDataProvider","BlogsDataProvider","RecentDocumentsDataProvider","BingLocationDataProvider","TopicSuggestionSearchDataProvider","news","viewCounts","currentViewCounts","hubNews","newsDigest","multiSiteNews","myNews","staleViewCounts","managedProperties","newsDataSourceProp","_appendAudienceFilteringQueryParam","_appendLanguageOverrideQueryParam","_getExtraDataForLogging","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _news_models_NewsEmptyStateType__WEBPACK_IMPORTED_MODULE_6__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _news_ExchangeViewCountsDataProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./news/ExchangeViewCountsDataProvider */ "GEDN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExchangeViewCountsDataProvider", function() { return _news_ExchangeViewCountsDataProvider__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _news_HubNewsDataProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./news/HubNewsDataProvider */ "GoGY");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HubNewsDataProvider", function() { return _news_HubNewsDataProvider__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _news_MicroServiceNewsDataProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./news/MicroServiceNewsDataProvider */ "ugjH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MicroServiceNewsDataProvider", function() { return _news_MicroServiceNewsDataProvider__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _news_NewsDataProvider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./news/NewsDataProvider */ "h10f");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsDataProvider", function() { return _news_NewsDataProvider__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _news_NewsDigestDataProvider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./news/NewsDigestDataProvider */ "QaIw");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsDigestDataProvider", function() { return _news_NewsDigestDataProvider__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _news_utilities_NewsDigestUtilities__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./news/utilities/NewsDigestUtilities */ "TYqH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsDigestUtilities", function() { return _news_utilities_NewsDigestUtilities__WEBPACK_IMPORTED_MODULE_12__["NewsDigestUtilities"]; });

/* harmony import */ var _news_NewsSearchDataProvider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./news/NewsSearchDataProvider */ "5qZt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsSearchDataProvider", function() { return _news_NewsSearchDataProvider__WEBPACK_IMPORTED_MODULE_13__["NewsSearchDataProvider"]; });

/* harmony import */ var _news_MultiSiteNewsDataProvider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./news/MultiSiteNewsDataProvider */ "y8rg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiSiteNewsDataProvider", function() { return _news_MultiSiteNewsDataProvider__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _news_MyNewsDataProvider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./news/MyNewsDataProvider */ "/3i9");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MyNewsDataProvider", function() { return _news_MyNewsDataProvider__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _common_TokenUtilities__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./common/TokenUtilities */ "YoTJ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TokenUtilities", function() { return _common_TokenUtilities__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _search_managedProperty_DeferredManagedProperties__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./search/managedProperty/DeferredManagedProperties */ "dONd");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredManagedProperties", function() { return _search_managedProperty_DeferredManagedProperties__WEBPACK_IMPORTED_MODULE_17__["DeferredManagedProperties"]; });

/* harmony import */ var _search_KQLQueryBuilder__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./search/KQLQueryBuilder */ "0oRV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KQLQueryBuilder", function() { return _search_KQLQueryBuilder__WEBPACK_IMPORTED_MODULE_18__["KQLQueryBuilder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AUDIENCE_TARGET_KQL_QUERY", function() { return _search_KQLQueryBuilder__WEBPACK_IMPORTED_MODULE_18__["AUDIENCE_TARGET_KQL_QUERY"]; });

/* harmony import */ var _search_SearchDataProvider__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./search/SearchDataProvider */ "dU3L");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchDataProvider", function() { return _search_SearchDataProvider__WEBPACK_IMPORTED_MODULE_19__["SearchDataProvider"]; });

/* harmony import */ var _search_PersonaSettingsCache__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./search/PersonaSettingsCache */ "IIPt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaSettingsCache", function() { return _search_PersonaSettingsCache__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _search_SearchUtilities__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./search/SearchUtilities */ "8GMp");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sanitizeSearchQueryParameter", function() { return _search_SearchUtilities__WEBPACK_IMPORTED_MODULE_21__["sanitizeSearchQueryParameter"]; });

/* harmony import */ var _list_CAMLQueryBuilder__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./list/CAMLQueryBuilder */ "gnrN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CAMLQueryBuilder", function() { return _list_CAMLQueryBuilder__WEBPACK_IMPORTED_MODULE_22__["CAMLQueryBuilder"]; });

/* harmony import */ var _list_ListDataProvider__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./list/ListDataProvider */ "mBlM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ListDataProvider", function() { return _list_ListDataProvider__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _contentRollup_ContentRollupDataProvider__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./contentRollup/ContentRollupDataProvider */ "wWkW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContentRollupDataProvider", function() { return _contentRollup_ContentRollupDataProvider__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony import */ var _event_index__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./event/index */ "Y4on");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventDataProvider", function() { return _event_index__WEBPACK_IMPORTED_MODULE_25__["EventDataProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventsSearchDataProvider", function() { return _event_index__WEBPACK_IMPORTED_MODULE_25__["EventsSearchDataProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventsListDataProvider", function() { return _event_index__WEBPACK_IMPORTED_MODULE_25__["EventsListDataProvider"]; });

/* harmony import */ var _page_PageDataProvider__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./page/PageDataProvider */ "g25W");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageDataProvider", function() { return _page_PageDataProvider__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony import */ var _page_PageDataSource__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./page/PageDataSource */ "7dHj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageDataSource", function() { return _page_PageDataSource__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony import */ var _page_WPDataExtractorDataProvider__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./page/WPDataExtractorDataProvider */ "78D3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_getWebPartDataFromPage", function() { return _page_WPDataExtractorDataProvider__WEBPACK_IMPORTED_MODULE_28__["_getWebPartDataFromPage"]; });

/* harmony import */ var _page_PageSearchDataProvider__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./page/PageSearchDataProvider */ "M0r2");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageSearchDataProvider", function() { return _page_PageSearchDataProvider__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony import */ var _page_TemplatePanelDataProvider__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./page/TemplatePanelDataProvider */ "7gDu");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplatePanelDataSource", function() { return _page_TemplatePanelDataProvider__WEBPACK_IMPORTED_MODULE_30__["TemplatePanelDataSource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateSelectedPageCopyDataSource", function() { return _page_TemplatePanelDataProvider__WEBPACK_IMPORTED_MODULE_30__["TemplateSelectedPageCopyDataSource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateSelectedPageAsJsonDataSource", function() { return _page_TemplatePanelDataProvider__WEBPACK_IMPORTED_MODULE_30__["TemplateSelectedPageAsJsonDataSource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplatePanelDataProvider", function() { return _page_TemplatePanelDataProvider__WEBPACK_IMPORTED_MODULE_30__["TemplatePanelDataProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplatePanelSelectedPageCopyDataProvider", function() { return _page_TemplatePanelDataProvider__WEBPACK_IMPORTED_MODULE_30__["TemplatePanelSelectedPageCopyDataProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplatePanelSelectedPageAsJsonDataProvider", function() { return _page_TemplatePanelDataProvider__WEBPACK_IMPORTED_MODULE_30__["TemplatePanelSelectedPageAsJsonDataProvider"]; });

/* harmony import */ var _blogs_BlogsDataProvider__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./blogs/BlogsDataProvider */ "O1uH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BlogsDataProvider", function() { return _blogs_BlogsDataProvider__WEBPACK_IMPORTED_MODULE_31__["default"]; });

/* harmony import */ var _recentDocuments_RecentDocumentsDataProvider__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./recentDocuments/RecentDocumentsDataProvider */ "ojNL");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RecentDocumentsDataProvider", function() { return _recentDocuments_RecentDocumentsDataProvider__WEBPACK_IMPORTED_MODULE_32__["RecentDocumentsDataProvider"]; });

/* harmony import */ var _location_BingLocationDataProvider__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./location/BingLocationDataProvider */ "8xPP");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BingLocationDataProvider", function() { return _location_BingLocationDataProvider__WEBPACK_IMPORTED_MODULE_33__["BingLocationDataProvider"]; });

/* harmony import */ var _Topics_TopicSuggestionSearchDataProvider__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./Topics/TopicSuggestionSearchDataProvider */ "EEym");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TopicSuggestionSearchDataProvider", function() { return _Topics_TopicSuggestionSearchDataProvider__WEBPACK_IMPORTED_MODULE_34__["TopicSuggestionSearchDataProvider"]; });

/* harmony import */ var _viewcount__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./viewcount */ "WzQS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewCountDataProvider", function() { return _viewcount__WEBPACK_IMPORTED_MODULE_35__["ViewCountDataProvider"]; });

// building blocks


// like data provider

// news data providers and models



















// ListDataProvider exports


// ContentRollupDataProvider exports

// Event exports





// TemplatePanelDataProvider exports

// Blogs


// BingLocationDataProvider exports

// TopicDataProvider




/***/ }),

/***/ "knSg":
/*!******************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/spfx-tools/loader-cased-file/lib?name=icon_[name:lower]_[hash:8].[ext]!./lib/dataProviders/news/assets/helpitemimg2.png ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "icon_helpitemimg2_4dca3af9.png";

/***/ }),

/***/ "mBlM":
/*!****************************************************!*\
  !*** ./lib/dataProviders/list/ListDataProvider.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_sp_base_data_source__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-base-data-source */ "9iOe");
/* harmony import */ var _ms_sp_base_data_source__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_base_data_source__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BaseDataProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../BaseDataProvider */ "L/SE");
/* harmony import */ var _DataProviderFlights__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DataProviderFlights */ "Xkwe");
/* harmony import */ var _ms_sp_list_data_source__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/sp-list-data-source */ "OVKu");
/* harmony import */ var _ms_sp_list_data_source__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_list_data_source__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ms_sp_list_field_data_source__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ms/sp-list-field-data-source */ "0GzW");
/* harmony import */ var _ms_sp_list_field_data_source__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_list_field_data_source__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ms_sp_list_item_data_source__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ms/sp-list-item-data-source */ "SQ4g");
/* harmony import */ var _ms_sp_list_item_data_source__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_list_item_data_source__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ms_sp_list_view_data_source__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ms/sp-list-view-data-source */ "c2YK");
/* harmony import */ var _ms_sp_list_view_data_source__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_list_view_data_source__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./loc/Strings.resx */ "A8lX");
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









// @todo: VSO# 339962 - Cross site CAML queries. (see odsp-datasources ListItemRequester)
// @todo: VSO# 339965 - Get items from a persisted CAML view. (see odsp-datasources ListItemRequester)
/**
 * Provides a data provider for the SharePoint _api/web/lists endpoint.
 * @internal
 */
var ListDataProvider = /** @class */ (function (_super) {
    __extends(ListDataProvider, _super);
    function ListDataProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 'List';
        _this.title = _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_8__["default"].ListDataProviderTitle;
        _this._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogSource"].create('ListDataProvider');
        return _this;
    }
    ListDataProvider.prototype.getItems = function (request) {
        var _this = this;
        switch (request.requestType) {
            case 1 /* List */:
                if (!this._listDataSource) {
                    this._listDataSource = new _ms_sp_list_data_source__WEBPACK_IMPORTED_MODULE_4__["ListDataSource"]({ spHttpClient: this.spHttpClient });
                }
                return this._listDataSource.getListsForWeb(this.baseEndPoint, _ms_sp_base_data_source__WEBPACK_IMPORTED_MODULE_1__["ODataQueryStringBuilder"].generateQueryString(request));
            case 2 /* Item */:
                if (!this._listItemDataSource) {
                    this._listItemDataSource = new _ms_sp_list_item_data_source__WEBPACK_IMPORTED_MODULE_6__["ListItemDataSource"]({ spHttpClient: this.spHttpClient });
                }
                if (_DataProviderFlights__WEBPACK_IMPORTED_MODULE_3__["default"].isHCWPSPViewReplaceSPQueryEnabled()) {
                    if (request.viewId) {
                        if (!this._listViewDataSource) {
                            this._listViewDataSource = new _ms_sp_list_view_data_source__WEBPACK_IMPORTED_MODULE_7__["ListViewDataSource"]({ spHttpClient: this.spHttpClient });
                        }
                        return this._listViewDataSource.updateViewXml(this.baseEndPoint, request.id, request.viewId, request.caml).then(function () {
                            return _this._listItemDataSource.getItemsForList(_this.baseEndPoint, request.id, request.title, request.isDefaultDocumentLibrary, request.renderOptions, undefined, undefined, undefined, undefined, request.audienceTarget, request.viewId);
                        });
                    }
                    else {
                        return this._listItemDataSource.getItemsForList(this.baseEndPoint, request.id, request.title, request.isDefaultDocumentLibrary, request.renderOptions, request.caml, undefined, undefined, undefined, request.audienceTarget);
                    }
                }
                else {
                    return this._listItemDataSource.getItemsForList(this.baseEndPoint, request.id, request.title, request.isDefaultDocumentLibrary, request.renderOptions, request.caml, undefined, undefined, undefined, request.audienceTarget);
                }
            case 3 /* Field */:
                if (!this._listFieldDataSource) {
                    this._listFieldDataSource = new _ms_sp_list_field_data_source__WEBPACK_IMPORTED_MODULE_5__["ListFieldDataSource"]({ spHttpClient: this.spHttpClient });
                }
                return this._listFieldDataSource.getFieldsForList(this.baseEndPoint, request.id, _ms_sp_base_data_source__WEBPACK_IMPORTED_MODULE_1__["ODataQueryStringBuilder"].generateQueryString(request));
            default:
                var error = new Error(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_8__["default"].ErrorInvalidListRequestType);
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(this._logSource, error);
                return Promise.reject(error);
        }
    };
    /**
     * Add a view for the list.
     *
     * @param listId - GUID identifying which list to add the view
     */
    ListDataProvider.prototype.addView = function (listId) {
        if (!this._listViewDataSource) {
            this._listViewDataSource = new _ms_sp_list_view_data_source__WEBPACK_IMPORTED_MODULE_7__["ListViewDataSource"]({ spHttpClient: this.spHttpClient });
        }
        return this._listViewDataSource.addView(this.baseEndPoint, listId);
    };
    return ListDataProvider;
}(_BaseDataProvider__WEBPACK_IMPORTED_MODULE_2__["BaseDataProvider"]));
/* harmony default export */ __webpack_exports__["default"] = (ListDataProvider);


/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dataProviders_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataProviders/index */ "jrLr");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _dataProviders_index__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _dataProviders_index__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _models_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/index */ "JEu8");
/* harmony import */ var _models_index__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_models_index__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _models_index__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _models_index__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _search_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search/index */ "S/19");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchAPIRequest", function() { return _search_index__WEBPACK_IMPORTED_MODULE_2__["SearchAPIRequest"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchAPISortDirection", function() { return _search_index__WEBPACK_IMPORTED_MODULE_2__["SearchAPISortDirection"]; });






/***/ }),

/***/ "ojNL":
/*!**************************************************************************!*\
  !*** ./lib/dataProviders/recentDocuments/RecentDocumentsDataProvider.js ***!
  \**************************************************************************/
/*! exports provided: RecentDocumentsDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecentDocumentsDataProvider", function() { return RecentDocumentsDataProvider; });
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__);




var ONE_NOTE_EXTENSION = 'one';
// Use a random GUID as X-Office-Version
var OFFICE_VERSION = 'aec61d34-20ca-455f-ba08-4fbe7e366f81';
// From	\ocscommon\dll\Definitions\Applications\ApplicationInfo.cs, SPO is 120
var OFFICE_APPLICATION = '120';
// spo web platform
var OFFICE_PLATOFRM = 'Web';
/**
 * A data provider that queries the MRU API for the user's recent documents
 * @internal
 */
var RecentDocumentsDataProvider = /** @class */ (function () {
    function RecentDocumentsDataProvider() {
        this.id = 'RecentDocuments';
        this.title = 'Recent documents';
    }
    RecentDocumentsDataProvider.prototype.requestData = function (requestInfo) {
        var _this = this;
        var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('RecentDocumentsDataProvider.getRecentDocuments');
        return requestInfo.authToken.then(function (token) {
            return fetch(_this._getApiUrl(requestInfo), _this._getHttpConfig(token));
        }).then(function (response) {
            qosMonitor.writeSuccess();
            return response.json();
        }).catch(function (error) {
            qosMonitor.writeUnexpectedFailure('Unexpected', error);
            return undefined;
        }).then(function (jsonResponse) {
            if (jsonResponse && jsonResponse.documents && jsonResponse.documents.items) {
                return jsonResponse.documents.items.map(function (document) {
                    var accessDate = new Date(document.time_stamp);
                    var filePathUrl = document.url.substring(0, document.url.lastIndexOf('/'));
                    // document.extension is not specified by the MRU API for OneNote documents
                    var extension = document.app === 'OneNote' ? ONE_NOTE_EXTENSION : document.extension;
                    var documentUri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["Uri"](document.url);
                    documentUri.setQueryParameter('web', '1');
                    return {
                        fileName: document.title,
                        fileUrl: documentUri.toString(),
                        filePathSegments: document.display_path,
                        filePathUrl: filePathUrl,
                        fileType: document.app,
                        fileExtension: extension,
                        lastAccessedRelative: accessDate
                    };
                });
            }
            return [];
        });
    };
    RecentDocumentsDataProvider.prototype._getApiUrl = function (requestInfo) {
        var url = 'https://ocws.officeapps.live.com/ocs/v2';
        var endpoint = '/recent/docs';
        var queryParams = !_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["Killswitch"].isActivated('fd0c24f6-2874-457c-ae79-2f14e38bb8fd', '6/27/19', 'Add PDF viewer to recent documents')
            ? "apps=Word,Excel,PowerPoint,Visio,OneNote,Sway,PdfViewer&show=" + (requestInfo.numDocsToRequest || 50) + "&sort=Date"
            : "apps=Word,Excel,PowerPoint,Visio,OneNote,Sway&show=" + (requestInfo.numDocsToRequest || 50) + "&sort=Date";
        return "" + url + endpoint + "?" + queryParams;
    };
    RecentDocumentsDataProvider.prototype._getHttpConfig = function (authToken) {
        var headers = new Headers();
        headers.set('Authorization', "Bearer " + authToken);
        if (!RecentDocumentsDataProvider._addHeadersKillSwitch.isActivated()) {
            headers.set('Content-Type', 'application/json');
            headers.set('X-Office-Application', OFFICE_APPLICATION);
            headers.set('X-Office-Platform', OFFICE_PLATOFRM);
            headers.set('X-Office-Version', OFFICE_VERSION);
            headers.set('X-CorrelationId', _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Guid"].newGuid().toString());
        }
        return {
            headers: headers
        };
    };
    RecentDocumentsDataProvider._addHeadersKillSwitch = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["KillSwitch"]('22806b18-595c-4349-b135-92c5c7c1613d'
    /*'7/12/2019', 'add required HTTP headers' */ );
    return RecentDocumentsDataProvider;
}());



/***/ }),

/***/ "pKc4":
/*!******************************************************!*\
  !*** ./lib/dataProviders/event/EventDataProvider.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _EventCAMLQueryBuilder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EventCAMLQueryBuilder */ "1/hL");
/* harmony import */ var _EventTimeZoneUtilities__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EventTimeZoneUtilities */ "SkGr");
/* harmony import */ var _Strings_resx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Strings.resx */ "Rbn4");
/**
 * @copyright (c) Microsoft Corporation. All rights reserved.
 * @file EventDataProvider.ts
 */
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










/**
 * Data provider to retrieve and manipulate SharePoint event list.
 * TODO VSO #333107: Make Event Data Provider generic
 * @internal
 */
var EventDataProvider = /** @class */ (function () {
    function EventDataProvider(options) {
        this.id = 'Event';
        this.title = 'EventDataProvider';
        /**
         * The map from event URI to event item ETag value.
         * This value is maintained inside data provider.
         *
         * @remarks
         * The event URI constructs as `${webAbsoluteUrl}/_api/web/Lists(guid'${listGuid}')/items(${eventId})`
         */
        this._eventToETag = new Map();
        this.options = options;
        this._serviceScope = options.serviceScope;
    }
    EventDataProvider.prototype.requestData = function (requestOptions) {
        var _this = this;
        if (!requestOptions.listId) {
            return Promise.resolve([]);
        }
        // Start date must NOT be after end date, otherwise it produces inaccurate and confusing results.
        if (requestOptions.startDate &&
            requestOptions.endDate &&
            new Date(requestOptions.startDate) > new Date(requestOptions.endDate)) {
            return Promise.resolve([]);
        }
        // These headers are critical to request data with CAML.
        var headers = {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose',
            'Odata-Version': '3.0'
        };
        var timeZone;
        return this._afterServiceScopeFinished()
            .then(function (_a) {
            var pageContext = _a.pageContext, httpClient = _a.httpClient;
            var webAbsoluteUrl = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["UrlUtilities"].removeEndSlash(pageContext.web.absoluteUrl);
            timeZone = _this._getTimeZoneFromPageContext(pageContext);
            var listGuid = requestOptions.listId.toString();
            var queryString = _this._buildQueryString(requestOptions);
            var url = webAbsoluteUrl + "/_api/web/Lists(guid'" + listGuid + "')/RenderListDataAsStream?" + queryString;
            var body = JSON.stringify({
                parameters: {
                    __metadata: { type: 'SP.RenderListDataParameters' },
                    DatesInUtc: true,
                    RenderOptions: 3,
                    ViewXml: Object(_EventCAMLQueryBuilder__WEBPACK_IMPORTED_MODULE_6__["buildCAMLQuery"])(requestOptions, timeZone)
                }
            });
            return httpClient.post(url, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, { body: body, headers: headers });
        })
            .then(this._parseResponse)
            .then(function (response) {
            if (response && response.ListData && response.ListData.Row instanceof Array) {
                return response.ListData.Row.map(function (row) { return ({
                    id: row.ID,
                    category: row.Category,
                    title: _this._htmlDecode(row.Title),
                    description: undefined,
                    // fAllDayEvent.value has two values: '1' and '0', which represent all day event and not all day event.
                    startTime: _EventTimeZoneUtilities__WEBPACK_IMPORTED_MODULE_7__["default"].dateStringToLocalDate(row.EventDate, timeZone, row['fAllDayEvent.value'] === '1'),
                    endTime: _EventTimeZoneUtilities__WEBPACK_IMPORTED_MODULE_7__["default"].dateStringToLocalDate(row.EndDate, timeZone, row['fAllDayEvent.value'] === '1'),
                    allDay: row['fAllDayEvent.value'] === '1',
                    location: _this._htmlDecode(row.Location),
                    attendees: undefined,
                    prevPageQuery: _this._constructPageQuery(response.ListData.PrevHref),
                    nextPageQuery: _this._constructPageQuery(response.ListData.NextHref),
                    // Following fields needn't be retrieved with CAML provider.
                    geolocation: undefined,
                    linkUrl: '',
                    linkName: '',
                    bannerUrl: undefined,
                    webName: '',
                    webUrl: ''
                }); });
            }
            else {
                throw new Error(_Strings_resx__WEBPACK_IMPORTED_MODULE_8__["default"].DataNotExistErrorMessage);
            }
        });
    };
    // @todo VSO#628881 merge requestEventItem and requestUTCEventItem into one API
    EventDataProvider.prototype.requestEventItem = function (listId, eventId) {
        return this._requestEventItem(listId, eventId, false /* useUTC */);
    };
    EventDataProvider.prototype.requestUTCEventItem = function (webAbsoluteUrl, listId, eventId) {
        return this._requestEventItem(listId, eventId, true /* useUTC */, webAbsoluteUrl);
    };
    EventDataProvider.prototype.updateEventItem = function (listId, eventId, event) {
        var _this = this;
        var eventUri;
        var timeZone;
        return this._afterServiceScopeFinished()
            .then(function (_a) {
            var pageContext = _a.pageContext, httpClient = _a.httpClient;
            timeZone = _this._getTimeZoneFromPageContext(pageContext);
            var webAbsoluteUrl = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["UrlUtilities"].removeEndSlash(pageContext.web.absoluteUrl);
            eventUri = webAbsoluteUrl + "/_api/web/Lists(guid'" + listId.toString() + "')/items(" + eventId + ")";
            var headers = {
                'If-Match': _this._eventToETag.get(eventUri),
                'X-HTTP-Method': 'MERGE',
                'Content-Type': 'application/json;charset=utf-8'
            };
            return _this._constructEventPayload(event, timeZone)
                .then(function (eventPayload) {
                var body = JSON.stringify(eventPayload);
                return httpClient.post(eventUri, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, { headers: headers, body: body });
            });
        })
            .then(function (response) { return _this._parseResponse(response).then(function () { return response; }); })
            .then(function (response) { _this._eventToETag.set(eventUri, response.headers.get('ETag')); });
    };
    EventDataProvider.prototype.deleteEventItem = function (listId, eventId) {
        var _this = this;
        var eventUri;
        return this._afterServiceScopeFinished()
            .then(function (_a) {
            var pageContext = _a.pageContext, httpClient = _a.httpClient;
            var webAbsoluteUrl = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["UrlUtilities"].removeEndSlash(pageContext.web.absoluteUrl);
            eventUri = webAbsoluteUrl + "/_api/web/Lists(guid'" + listId.toString() + "')/items(" + eventId + ")";
            var headers = {
                'If-Match': _this._eventToETag.get(eventUri)
            };
            return httpClient.fetch(eventUri, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, {
                headers: headers,
                method: 'DELETE'
            });
        })
            .then(this._parseResponse)
            .then(function () { _this._eventToETag.delete(eventUri); })
            .catch(function (error) {
            // Delete event error due to skype meeting link.
            // @todo: SOX VSO #359886 to investigate the root cause, for instance, capture the error and log it.
            if (error.code === '-2130575234, Microsoft.SharePoint.SPException') {
                _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__["_EngagementLogger"].logEvent('EventDataProvider.DeleteEventItemFailure.HasSkypeLink');
            }
            else {
                throw error;
            }
        });
    };
    EventDataProvider.prototype.createEventItem = function (listId, event) {
        var _this = this;
        var webAbsoluteUrl;
        var timeZone;
        var listGuid = listId.toString();
        return this._afterServiceScopeFinished()
            .then(function (_a) {
            var pageContext = _a.pageContext, httpClient = _a.httpClient;
            webAbsoluteUrl = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["UrlUtilities"].removeEndSlash(pageContext.web.absoluteUrl);
            timeZone = _this._getTimeZoneFromPageContext(pageContext);
            var select = [
                'Attachments',
                'BannerUrl',
                'Category',
                'Description',
                'EffectiveBasePermissions',
                'EndDate',
                'EventDate',
                'fAllDayEvent',
                'Geolocation',
                'ID',
                'Location',
                'ParticipantsPickerId',
                'Title',
                'Workspace',
                'fRecurrence'
            ];
            var url = webAbsoluteUrl + "/_api/web/Lists(guid'" + listGuid + "')/items?$select=" + select.join(',');
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            };
            return _this._constructEventPayload(event, timeZone)
                .then(function (eventPayload) {
                var body = JSON.stringify(eventPayload);
                return httpClient.post(url, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, { headers: headers, body: body });
            });
        })
            .then(this._parseResponse)
            .then(function (responseEvent) {
            var eventUri = webAbsoluteUrl + "/_api/web/Lists(guid'" + listGuid + "')/items(" + responseEvent.ID + ")";
            _this._eventToETag.set(eventUri, responseEvent['@odata.etag']);
            return _this._mapRESTResponseEvent(responseEvent, timeZone);
        });
    };
    EventDataProvider.prototype.getAllCategories = function (listId) {
        var getCategoriesPromises = Promise.all([
            this.getInUsedCategories(listId),
            this.getPreDefinedCategories(listId)
        ]);
        return getCategoriesPromises
            .then(function (_a) {
            var inUsedCategories = _a[0], predefinedCategories = _a[1];
            return Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["uniq"])(inUsedCategories.concat(predefinedCategories.categories)).sort();
        });
    };
    EventDataProvider.prototype.getPreDefinedCategories = function (listId) {
        var _this = this;
        return this._afterServiceScopeFinished()
            .then(function (_a) {
            var pageContext = _a.pageContext, httpClient = _a.httpClient;
            var webAbsoluteUrl = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["UrlUtilities"].removeEndSlash(pageContext.web.absoluteUrl);
            var url = webAbsoluteUrl + "/_api/web/Lists(guid'" + listId.toString() + "')/fields/GetByInternalNameOrTitle('Category')";
            return httpClient.get(url, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1)
                .then(_this._parseResponse)
                .then(function (categories) {
                return {
                    categories: categories.Choices.slice(),
                    type: categories.TypeAsString
                };
            });
        });
    };
    EventDataProvider.prototype.getInUsedCategories = function (listId) {
        var _this = this;
        return this._afterServiceScopeFinished()
            .then(function (_a) {
            var pageContext = _a.pageContext, httpClient = _a.httpClient;
            var webAbsoluteUrl = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["UrlUtilities"].removeEndSlash(pageContext.web.absoluteUrl);
            return _this._getViewId(webAbsoluteUrl, listId.toString(), httpClient)
                .then(function (viewId) { return _this._getCategoriesFromView(webAbsoluteUrl, listId.toString(), httpClient, viewId); });
        });
    };
    EventDataProvider.prototype.convertDisplayedDateToUTC = function (date) {
        var _this = this;
        return this._afterServiceScopeFinished()
            .then(function (_a) {
            var pageContext = _a.pageContext;
            return _EventTimeZoneUtilities__WEBPACK_IMPORTED_MODULE_7__["default"].localToUtc(date, _this._getTimeZoneFromPageContext(pageContext));
        });
    };
    EventDataProvider.prototype._getViewId = function (webAbsoluteUrl, listId, httpClient) {
        // For events list, its default view is Calendar type, to get the distinct value of Category column,
        // we need tabular view with BaseViewId === 1
        // @todo: ensure view?
        // @todo: cache view id
        var endpointUrl = webAbsoluteUrl + "/_api/web/Lists/GetById('" + listId + "')/Views?$select=Id&$filter=BaseViewId eq '1'";
        return httpClient.get(endpointUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1)
            .then(this._parseResponse)
            .then(function (json) {
            if (json.value && json.value.length > 0) {
                return json.value[0].Id;
            }
            else {
                // @todo: Loc of error message
                return Promise.reject(new Error('No view is found.'));
            }
        });
    };
    EventDataProvider.prototype._getCategoriesFromView = function (webAbsoluteUrl, listId, httpClient, viewId) {
        var _this = this;
        var endpointUrl = webAbsoluteUrl + "/_api/web/Lists/GetById('" + listId + "')/RenderListFilterData" +
            ("?FieldInternalName='Category'&ViewId='" + viewId + "'");
        return httpClient.post(endpointUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, {})
            .then(function (response) {
            if (response.ok) {
                return response.text();
            }
            else {
                // @todo: have better way to handle this response?
                throw new Error(JSON.stringify(response));
            }
        })
            .then(function (text) {
            // Response text is like <SELECT id="..." ><OPTION  SELECTED Value="Business">Business</OPTION>...</SELECT>.
            // Use regular expression to extract all Value attribute.
            var regex = new RegExp("Value=\"([^\"]*)", 'g');
            var values = text.match(regex);
            // Parse Value attribute, e.g. parse Value="Business" to Business.
            // Decode the HTML attribute value.
            var categories = values.map(function (val) { return val.replace(regex, '$1'); }).map(_this._htmlDecode);
            // This is to remove duplicated "" which represents All and Empty cases
            // @todo: handle these 2 cases if required
            return Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["uniq"])(categories);
        });
    };
    EventDataProvider.prototype._mapRESTResponseEvent = function (event, timeZone, useUTC) {
        var _this = this;
        if (useUTC === void 0) { useUTC = false; }
        return this._getEventAttachments(event)
            .then(function (attachments) { return ({
            id: event.ID.toString(),
            category: event.Category,
            title: event.Title,
            description: event.Description,
            startTime: useUTC
                ? _EventTimeZoneUtilities__WEBPACK_IMPORTED_MODULE_7__["default"].dateStringToUTCDate(event.EventDate, timeZone, event.fAllDayEvent)
                : _EventTimeZoneUtilities__WEBPACK_IMPORTED_MODULE_7__["default"].dateStringToLocalDate(event.EventDate, timeZone, event.fAllDayEvent),
            endTime: useUTC
                ? _EventTimeZoneUtilities__WEBPACK_IMPORTED_MODULE_7__["default"].dateStringToUTCDate(event.EndDate, timeZone, event.fAllDayEvent)
                : _EventTimeZoneUtilities__WEBPACK_IMPORTED_MODULE_7__["default"].dateStringToLocalDate(event.EndDate, timeZone, event.fAllDayEvent),
            location: event.Location,
            attendees: _this._mapRESTResponsePeople(event.ParticipantsPicker),
            bannerUrl: event.BannerUrl ? event.BannerUrl.Url : '',
            attachments: attachments,
            linkName: event.Workspace ? event.Workspace.Description : '',
            linkUrl: event.Workspace ? event.Workspace.Url : '',
            isAllDayEvent: event.fAllDayEvent,
            geolocation: event.Geolocation
                ? {
                    latitude: event.Geolocation.Latitude,
                    longitude: event.Geolocation.Longitude
                }
                : undefined,
            permission: new _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0__["SPPermission"](event.EffectiveBasePermissions),
            isRecurrence: event.fRecurrence,
            // @todo 335770 Move the prev/next page query information inside data provider.
            prevPageQuery: undefined,
            nextPageQuery: undefined,
            webName: '',
            webUrl: ''
        }); });
    };
    EventDataProvider.prototype._getEventAttachments = function (responseEvent) {
        var _this = this;
        return this._afterServiceScopeFinished()
            .then(function (_a) {
            var pageContext = _a.pageContext, httpClient = _a.httpClient;
            var webAbsoluteUrl = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["UrlUtilities"].removeEndSlash(pageContext.web.absoluteUrl);
            if (!responseEvent.Attachments) {
                return Promise.resolve([]);
            }
            else {
                var batch_1 = httpClient.beginBatch();
                var paths = responseEvent.AttachmentFiles.map(function (attachment) { return attachment.ServerRelativeUrl; });
                var batchPromises_1 = paths.map(function (path) {
                    var url = webAbsoluteUrl + "/_api/web/getFileByUrl('" + path + "')";
                    var headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=utf-8'
                    };
                    return batch_1.get(url, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClientBatch"].configurations.v1, { headers: headers })
                        .then(function (response) { return _this._parseResponse(response); });
                });
                return batch_1.execute()
                    .then(function () { return Promise.all(batchPromises_1); })
                    .then(_this._mapRESTAttachments);
            }
        });
    };
    EventDataProvider.prototype._constructEventPayload = function (event, timeZone) {
        return this._getEventPeopleIds(event.attendees)
            .then(function (ids) {
            var payload = {
                // tslint:disable:no-null-keyword
                Title: event.title,
                Category: event.category ? event.category : null,
                Description: event.description,
                Location: event.location,
                EventDate: _EventTimeZoneUtilities__WEBPACK_IMPORTED_MODULE_7__["default"].localToUtc(event.startTime, timeZone).toISOString(),
                EndDate: _EventTimeZoneUtilities__WEBPACK_IMPORTED_MODULE_7__["default"].localToUtc(event.endTime, timeZone).toISOString(),
                fAllDayEvent: event.isAllDayEvent,
                Workspace: {
                    Description: event.linkName,
                    Url: event.linkUrl
                },
                BannerUrl: {
                    Url: event.bannerUrl
                },
                ParticipantsPickerId: ids,
                Geolocation: event.geolocation
                    ? {
                        Latitude: event.geolocation.latitude,
                        Longitude: event.geolocation.longitude
                    }
                    // When its value is undefined, it must store null to list item, otherwise list item won't be updated.
                    : null,
                // tslint:enable:no-null-keyword
                fRecurrence: event.isRecurrence
            };
            if (false) {}
            return payload;
        });
    };
    EventDataProvider.prototype._getEventPeopleIds = function (users) {
        var _this = this;
        if (users.length > 0) {
            return this._afterServiceScopeFinished()
                .then(function (_a) {
                var pageContext = _a.pageContext, httpClient = _a.httpClient;
                var webAbsoluteUrl = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["UrlUtilities"].removeEndSlash(pageContext.web.absoluteUrl);
                var batch = httpClient.beginBatch();
                var batchPromises = users.map(function (user) {
                    // The @param syntax is used to workaround the api issue that replaces `\` with '/'.
                    var url = webAbsoluteUrl + "/_api/web/ensureUser(@user)?@user='" + encodeURIComponent(user.id) + "'";
                    return batch.get(url, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClientBatch"].configurations.v1)
                        .then(_this._parseResponse)
                        .then(function (participantsPicker) { return participantsPicker.Id; });
                });
                return batch.execute().then(function () { return Promise.all(batchPromises); });
            });
        }
        else {
            return Promise.resolve([]);
        }
    };
    /**
     * If event items are on current site then webAbsoluteUrl can be calculated from pageContext here.
     * For hub site roll up scenario, event items could come from other sites. In this case we can't
     * calculate it here and should pass it as a parameter.
     */
    EventDataProvider.prototype._requestEventItem = function (listId, eventId, useUTC, webAbsoluteUrl) {
        var _this = this;
        if (useUTC === void 0) { useUTC = false; }
        var eventUri;
        var timeZone;
        return this._afterServiceScopeFinished()
            .then(function (_a) {
            var pageContext = _a.pageContext, httpClient = _a.httpClient;
            timeZone = _this._getTimeZoneFromPageContext(pageContext);
            webAbsoluteUrl = webAbsoluteUrl || _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["UrlUtilities"].removeEndSlash(pageContext.web.absoluteUrl);
            // @todo: investigate if there is a way to request fields even if they are missing in part of items,
            // but most of them are having the fields.
            var select = [
                'Attachments',
                'BannerUrl',
                'Category',
                'Description',
                'EffectiveBasePermissions',
                'EndDate',
                'EventDate',
                'fAllDayEvent',
                'ID',
                'Location',
                'ParticipantsPicker/Name',
                'ParticipantsPicker/Title',
                'Title',
                'Workspace',
                'fRecurrence'
            ];
            if (true) {
                // For on-prem, geolocation field is optional and features depending on it are cut.
                // Only fetch this filed for online.
                select.push('Geolocation');
            }
            var expand = [
                'AttachmentFiles',
                'ParticipantsPicker'
            ];
            var queryString = "$select=" + select.join(',') + "&$expand=" + expand.join(',');
            eventUri = webAbsoluteUrl + "/_api/web/Lists(guid'" + listId.toString() + "')/items(" + eventId + ")";
            var url = eventUri + "/?" + queryString;
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            };
            return httpClient.get(url, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, { headers: headers });
        })
            .then(this._parseResponse)
            .then(function (responseEvent) {
            _this._eventToETag.set(eventUri, responseEvent['@odata.etag']);
            return _this._mapRESTResponseEvent(responseEvent, timeZone, useUTC);
        });
    };
    EventDataProvider.prototype._afterServiceScopeFinished = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._serviceScope.whenFinished(function () {
                resolve({
                    pageContext: _this._serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_0__["PageContext"].serviceKey),
                    httpClient: _this._serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].serviceKey)
                });
            });
        });
    };
    EventDataProvider.prototype._parseResponse = function (response) {
        if (response.status >= 200 && response.status < 300) {
            if (response.status === 204) { // 204 No Content
                return Promise.resolve();
            }
            else {
                return response.json();
            }
        }
        else {
            return response.json()
                .then(function (result) {
                var responseError = result.error || {
                    code: 'UnknownErrorCode',
                    message: _Strings_resx__WEBPACK_IMPORTED_MODULE_8__["default"].UnknownErrorMessage
                };
                var eventError = {
                    correlationId: response.correlationId,
                    httpStatus: response.status,
                    code: responseError.code,
                    message: typeof responseError.message === 'string'
                        ? responseError.message
                        : responseError.message.value
                };
                throw eventError;
            });
        }
    };
    EventDataProvider.prototype._buildQueryString = function (requestOptions) {
        if (requestOptions.pageQuery) {
            // If we get page query, we could skip other query string parameters.
            return requestOptions.pageQuery;
        }
        else {
            var queries = [];
            if (requestOptions.orderBy) {
                queries.push(['SortField', requestOptions.orderBy.field], ['SortDir', requestOptions.orderBy.direction]);
            }
            return queries.map(function (query) { return query.join('='); }).join('&');
        }
    };
    EventDataProvider.prototype._mapRESTResponsePeople = function (eventPeople) {
        if (!eventPeople) {
            return [];
        }
        else {
            if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Guid"].parse('da87ad9b-1b2a-4139-889e-413063d9d714'), '8/22/2018', 'Remove unused property email, role, imageUrl')) {
                return eventPeople.map(function (info) { return ({
                    id: info.Name,
                    name: info.Title
                }); });
            }
            else {
                return eventPeople.map(function (info) { return ({
                    id: info.Name,
                    name: info.Title,
                    email: undefined,
                    role: info.JobTitle,
                    imageUrl: info.Picture
                }); });
            }
        }
    };
    EventDataProvider.prototype._mapRESTAttachments = function (attachments) {
        if (!attachments) {
            return [];
        }
        else {
            return attachments.map(function (attachment) { return ({
                fileName: attachment.Name,
                fileSize: attachment.Length,
                filePreviewUrl: attachment.LinkingUri,
                fileRelativeUrl: attachment.ServerRelativeUrl
            }); });
        }
    };
    EventDataProvider.prototype._constructPageQuery = function (pageQuery) {
        if (pageQuery) {
            return pageQuery
                // Strip off the first `?` character.
                .substr(1)
                // Fix up the empty view GUID. If we are sending this, the end point is not happy.
                .replace('&View=00000000-0000-0000-0000-000000000000', '');
        }
        else {
            return '';
        }
    };
    EventDataProvider.prototype._getTimeZoneFromPageContext = function (context) {
        return context.user.preferUserTimeZone
            ? context.user.timeZoneInfo
            : context.web.timeZoneInfo;
    };
    EventDataProvider.prototype._htmlDecode = function (str) {
        if (false) {}
        else if (str) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(str, 'text/html');
            return doc.body.innerText;
        }
        else {
            return str;
        }
    };
    __decorate([
        Object(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_5__["monitor"])('EventDataProvider.RequestData')
    ], EventDataProvider.prototype, "requestData", null);
    __decorate([
        Object(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_5__["monitor"])('EventDataProvider.UpdateEventItem')
    ], EventDataProvider.prototype, "updateEventItem", null);
    __decorate([
        Object(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_5__["monitor"])('EventDataProvider.DeleteEventItem')
    ], EventDataProvider.prototype, "deleteEventItem", null);
    __decorate([
        Object(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_5__["monitor"])('EventDataProvider.CreateEventItem')
    ], EventDataProvider.prototype, "createEventItem", null);
    __decorate([
        Object(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_5__["monitor"])('EventDataProvider.GetPreDefinedCategories')
    ], EventDataProvider.prototype, "getPreDefinedCategories", null);
    __decorate([
        Object(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_5__["monitor"])('EventDataProvider.GetInUsedCategories')
    ], EventDataProvider.prototype, "getInUsedCategories", null);
    __decorate([
        Object(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_5__["monitor"])('EventDataProvider.GetEventAttachments')
    ], EventDataProvider.prototype, "_getEventAttachments", null);
    __decorate([
        Object(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_5__["monitor"])('EventDataProvider.GetEventPeopleIds')
    ], EventDataProvider.prototype, "_getEventPeopleIds", null);
    __decorate([
        Object(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_5__["monitor"])('EventDataProvider.RequestEventItem')
    ], EventDataProvider.prototype, "_requestEventItem", null);
    return EventDataProvider;
}());
/* harmony default export */ __webpack_exports__["default"] = (EventDataProvider);


/***/ }),

/***/ "rOX9":
/*!****************************************!*\
  !*** ./lib/search/SearchAPIRequest.js ***!
  \****************************************/
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
* Provides a simple wrapper for the SharePoint Search REST API.
* @internal
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
                var simplifiedResult = _this._simplifyResultForTemplating(rawResponse);
                _qosMonitor.writeSuccess();
                return simplifiedResult;
            })
                .catch(function (error) {
                var correlationIdKey = 'correlationId';
                _qosMonitor.writeUnexpectedFailure('FailedSearchPOST', error, {
                    'correlationId': error[correlationIdKey]
                });
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
                _qosMonitor.writeUnexpectedFailure('ManagedPropertiesRequestFailed', error);
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
        return this._afterServiceScopeFinished().then(function (_a) {
            var pageContext = _a.pageContext, spHttpClient = _a.spHttpClient;
            var postUrl = pageContext.web.absoluteUrl + "/_api/search/postquery";
            return spHttpClient.post(postUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, { body: body, headers: headers })
                .then(_this._parseResponse);
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
    SearchAPIRequest.prototype._afterServiceScopeFinished = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._serviceScope.whenFinished(function () {
                resolve({
                    pageContext: _this._serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_2__["PageContext"].serviceKey),
                    spHttpClient: _this._serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].serviceKey)
                });
            });
        });
    };
    SearchAPIRequest.prototype._parseResponse = function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        else {
            return response.json().then(function (error) {
                var errorMessage = "BadSearchResponse: statusMessage=" + response.statusMessage;
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logVerbose(SearchAPIRequest._LogSource, errorMessage + ", response inner error=" + JSON.stringify(error));
                throw {
                    message: errorMessage,
                    status: response.status,
                    correlationId: response.correlationId ? response.correlationId.toString() : '',
                    innerError: error
                };
            });
        }
    };
    SearchAPIRequest._LogSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_LogSource"].create('SearchAPIRequest');
    return SearchAPIRequest;
}());
/* harmony default export */ __webpack_exports__["default"] = (SearchAPIRequest);


/***/ }),

/***/ "ugjH":
/*!****************************************************************!*\
  !*** ./lib/dataProviders/news/MicroServiceNewsDataProvider.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_sp_home_http_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/sp-home-http-client */ "+1B/");
/* harmony import */ var _ms_sp_home_http_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_home_http_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _DataProvidersKillSwitches__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../DataProvidersKillSwitches */ "evK2");
/* harmony import */ var _models_NewsDataSource__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./models/NewsDataSource */ "aE90");
/* harmony import */ var _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utilities/NewsUtilities */ "JpAn");







var AZURE_FRONT_DOOR_HANDLING = 'AzureFrontDoorHeadersMissing';
var RESPONSE_NOT_OK = 'ResponseNotOk';
var TOKEN_NOT_AVAILABLE = 'TokenNotAvailable';
/**
 * @internal
 */
var MicroServiceNewsDataProvider = /** @class */ (function () {
    function MicroServiceNewsDataProvider(options) {
        var _this = this;
        this._maxRetryCount = 3;
        this.options = options;
        this.options.serviceScope.whenFinished(function () {
            _this._pageContext = _this.options.serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_1__["PageContext"].serviceKey);
            _this._sphomeHttpClient = _this.options.serviceScope.consume(_ms_sp_home_http_client__WEBPACK_IMPORTED_MODULE_2__["SPHomeHttpClient"].serviceKey);
        });
    }
    MicroServiceNewsDataProvider.prototype.requestData = function (requestInfo) {
        var _this = this;
        var retryCount = 0;
        return this._requestDataWithRetry(requestInfo, retryCount)
            .catch(function (error) {
            if (++retryCount < _this._maxRetryCount &&
                _this.shouldRetryDataFetch(error)) {
                return _this._requestDataWithRetry(requestInfo, retryCount);
            }
            throw error;
        });
    };
    Object.defineProperty(MicroServiceNewsDataProvider.prototype, "isMicroserviceUnavailable", {
        get: function () {
            return this._sphomeHttpClient.isServiceAvailable;
        },
        enumerable: true,
        configurable: true
    });
    /* tslint:disable-next-line:no-any */
    MicroServiceNewsDataProvider.prototype.extractMicroserviceNewsItems = function (data) {
        return _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_6__["NewsUtilities"].extractMicroserviceNewsItems(data, this._pageContext);
    };
    MicroServiceNewsDataProvider.prototype.shouldRetryDataFetch = function (error) {
        return (error.message !== AZURE_FRONT_DOOR_HANDLING
            && error.message !== RESPONSE_NOT_OK
            && error.message !== TOKEN_NOT_AVAILABLE);
    };
    MicroServiceNewsDataProvider.prototype._requestDataWithRetry = function (requestInfo, retryCount) {
        var _this = this;
        var extraData = Object(_models_NewsDataSource__WEBPACK_IMPORTED_MODULE_5__["_getExtraDataForLogging"])(requestInfo, this._pageContext);
        extraData.retryCount = retryCount;
        var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"](this.qosMonitorLabel + ".getNewsItems");
        return this.executeRequest(requestInfo)
            .then(function (response) {
            extraData.URL = response.url;
            extraData.MSCV = response.headers.get('MS-CV');
            var browserInfo = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_BrowserDetection"].getBrowserInformation();
            // Extra check for IE as IE11 does not add the CORS Origin header
            // https://medium.com/@mozak104/how-to-solve-ie-edge-cors-error-f52e57778252
            var isResponseExtraDataOk = (browserInfo.browser === 4 /* IE */ || extraData.URL) &&
                extraData.MSCV;
            if (response.ok && isResponseExtraDataOk) {
                return response.json();
            }
            else {
                extraData.statusCode = response.status.toString();
                var errorCode = isResponseExtraDataOk ? RESPONSE_NOT_OK : AZURE_FRONT_DOOR_HANDLING;
                var error = _DataProvidersKillSwitches__WEBPACK_IMPORTED_MODULE_4__["default"].isDataProviderRetries.isActivated()
                    ? new Error(response.statusText)
                    : new Error(errorCode);
                isResponseExtraDataOk
                    ? qosMonitor.writeUnexpectedFailure(RESPONSE_NOT_OK, error, extraData)
                    : qosMonitor.writeUnexpectedFailure(AZURE_FRONT_DOOR_HANDLING, error, extraData);
                throw error;
            }
        })
            .then(function (responseJson) {
            var paddingCount = _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_6__["NewsUtilities"].getPaddingCount(requestInfo, responseJson.Items ? responseJson.Items.length : 0);
            var data = (!responseJson.Items || responseJson.Items.length === 0)
                ? []
                : _this.extractMicroserviceNewsItems(responseJson.Items);
            data = data.concat(_utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_6__["NewsUtilities"].getEmptyStateItems(requestInfo.emptyItemType, _this.options.serviceScope, paddingCount, requestInfo.webpartWidth));
            qosMonitor.writeSuccess(extraData);
            return data;
        })
            .catch(function (error) {
            if (!qosMonitor.hasEnded
                && (_DataProvidersKillSwitches__WEBPACK_IMPORTED_MODULE_4__["default"].isDataProviderRetries.isActivated() || extraData.retryCount === 0)) {
                if (error instanceof _ms_sp_home_http_client__WEBPACK_IMPORTED_MODULE_2__["SPHomeMicroserviceNotAvailableError"]) {
                    qosMonitor.writeUnexpectedFailure(TOKEN_NOT_AVAILABLE, error, extraData);
                }
                else {
                    qosMonitor.writeUnexpectedFailure('Unexpected', error, extraData);
                }
            }
            throw error;
        });
    };
    return MicroServiceNewsDataProvider;
}());
/* harmony default export */ __webpack_exports__["default"] = (MicroServiceNewsDataProvider);


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

/***/ "wWkW":
/*!**********************************************************************!*\
  !*** ./lib/dataProviders/contentRollup/ContentRollupDataProvider.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DataProvidersKillSwitches__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DataProvidersKillSwitches */ "evK2");
/* harmony import */ var _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/i18n-utilities */ "Ycni");
/* harmony import */ var _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _search_PersonaSettingsCache__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../search/PersonaSettingsCache */ "IIPt");
/* harmony import */ var _search_SearchDataProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../search/SearchDataProvider */ "dU3L");
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







/**
* TODO: Consider moving this logic to ContentRollupWebPart.ts
* @internal
*/
var ContentRollupDataProvider = /** @class */ (function (_super) {
    __extends(ContentRollupDataProvider, _super);
    function ContentRollupDataProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContentRollupDataProvider.prototype._initVariables = function () {
        this._personaSettingsCache = new _search_PersonaSettingsCache__WEBPACK_IMPORTED_MODULE_5__["default"]();
    };
    ContentRollupDataProvider.prototype._mapResponse = function (searchResult) {
        var result = [];
        var extensions = ['aspx', 'html', 'htm'];
        for (var _i = 0, _a = searchResult.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            var editor = this._personaSettingsCache.getPerson(row.EditorOwsUser, row.ModifiedBy);
            var webPath = extensions.indexOf(row.FileExtension) > -1 ?
                row.Path : _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2__["SPUtility"].getWebPathOfFile(row.Path);
            var modifiedDate = row.LastModifiedTime;
            /**
             * SitePath is returned as two parts separated by a semi-colon.
             * Example:
             * https://contoso.sharepoint.com/sites/teamsite/sitepages/;com.sharepoint.contoso./sites/teamsite/sitepages/
             * The first value is the one we want for SitePath.
             */
            var sitePath = row.SitePath;
            if (sitePath) {
                sitePath = sitePath.split(';')[0];
            }
            var formattedDate = !_DataProvidersKillSwitches__WEBPACK_IMPORTED_MODULE_3__["default"].updateModifiedDate.isActivated()
                ? _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_2__["SPFormatDateTime"].formatTimestampToDisplayDate(modifiedDate, this._pageContext, { skeleton: 'yMMMd' })
                : this._formatTimestampToDisplayDate(modifiedDate);
            var item = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__["extend"](row, {
                Name: editor.name,
                Email: editor.email,
                ProfileImageSrc: editor.profileImageSrc,
                Initials: editor.initials,
                InitialsColor: editor.initials,
                WebPath: webPath,
                ModifiedDate: formattedDate,
                SitePath: sitePath
            });
            if (item.SiteName) {
                item.SiteName = encodeURI(item.SiteName);
            }
            result.push(item);
        }
        /* tslint:disable:no-any */
        return new Promise(function (resolve, reject) {
            return resolve(result);
        });
        /* tslint:enable: no-any */
    };
    ContentRollupDataProvider.prototype._formatTimestampToDisplayDate = function (timestamp) {
        if (!timestamp) {
            return '';
        }
        var timezone = this._pageContext.user.preferUserTimeZone
            ? this._pageContext.user.timeZoneInfo
            : this._pageContext.web.timeZoneInfo;
        var date = new Date(timestamp);
        var spDateInUTC = new _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_4__["SPDate"]({
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
        var fakeDateToDisplay = new Date(spDateInUserTimeZone.fullYear, spDateInUserTimeZone.month, spDateInUserTimeZone.date, spDateInUserTimeZone.hours, spDateInUserTimeZone.minutes, spDateInUserTimeZone.seconds, spDateInUserTimeZone.milliseconds);
        return _ms_i18n_utilities__WEBPACK_IMPORTED_MODULE_4__["LocaleFormat"].formatDate(fakeDateToDisplay, { skeleton: 'yMMMd' });
    };
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["autobind"]
    ], ContentRollupDataProvider.prototype, "_mapResponse", null);
    return ContentRollupDataProvider;
}(_search_SearchDataProvider__WEBPACK_IMPORTED_MODULE_6__["SearchDataProvider"]));
/* harmony default export */ __webpack_exports__["default"] = (ContentRollupDataProvider);


/***/ }),

/***/ "wlCg":
/*!******************************************************!*\
  !*** ./lib/dataProviders/search/loc/Strings.resx.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_xZD2C+AxjFVYc3B/c/QO/A';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "x7Ly":
/*!*************************************************************!*\
  !*** ./lib/dataProviders/event/EventsSearchDataProvider.js ***!
  \*************************************************************/
/*! exports provided: EventsSearchDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsSearchDataProvider", function() { return EventsSearchDataProvider; });
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _search_SearchDataProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../search/SearchDataProvider */ "dU3L");
/* harmony import */ var _EventTimeZoneUtilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventTimeZoneUtilities */ "SkGr");
// @copyright (c) Microsoft Corporation. All rights reserved.
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



/**
* @internal
*/
var EventsSearchDataProvider = /** @class */ (function (_super) {
    __extends(EventsSearchDataProvider, _super);
    function EventsSearchDataProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EventsSearchDataProvider, "selectProperties", {
        get: function () {
            return [
                'EventsRollUpCategory',
                'EventsRollUpEndDate',
                'EventsRollUpStartDate',
                'IsAllDayEvent',
                'ListID',
                'ListItemID',
                'Location',
                'SiteTitle',
                'SPWebUrl',
                'Title'
            ];
        },
        enumerable: true,
        configurable: true
    });
    EventsSearchDataProvider.prototype._mapResponse = function (searchResult) {
        var timeZone = this._pageContext.user.preferUserTimeZone
            ? this._pageContext.user.timeZoneInfo
            : this._pageContext.web.timeZoneInfo;
        var result = searchResult.rows.map(function (row) {
            var isAllDayEvent = row.IsAllDayEvent === 'true';
            var startTime = _EventTimeZoneUtilities__WEBPACK_IMPORTED_MODULE_2__["default"].dateStringToLocalDate(row.EventsRollUpStartDate.toString(), timeZone, isAllDayEvent);
            var endTime = _EventTimeZoneUtilities__WEBPACK_IMPORTED_MODULE_2__["default"].dateStringToLocalDate(row.EventsRollUpEndDate.toString(), timeZone, isAllDayEvent);
            return {
                endTime: endTime,
                isAllDayEvent: isAllDayEvent,
                startTime: startTime,
                id: row.ListItemID,
                attendees: undefined,
                bannerUrl: undefined,
                category: row.EventsRollUpCategory ? row.EventsRollUpCategory.toString() : '',
                description: undefined,
                geolocation: undefined,
                linkName: undefined,
                linkUrl: undefined,
                listId: row.ListID,
                location: row.Location ? row.Location.toString() : '',
                nextPageQuery: undefined,
                prevPageQuery: undefined,
                title: row.Title,
                webName: row.SiteTitle ? row.SiteTitle : '',
                webUrl: row.SPWebUrl ? row.SPWebUrl.toString() : ''
            };
        });
        return Promise.resolve(result);
    };
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["autobind"]
    ], EventsSearchDataProvider.prototype, "_mapResponse", null);
    return EventsSearchDataProvider;
}(_search_SearchDataProvider__WEBPACK_IMPORTED_MODULE_1__["SearchDataProvider"]));



/***/ }),

/***/ "y88i":
/*!********************************************!*\
  !*** external "@ms/odsp-utilities-bundle" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_y88i__;

/***/ }),

/***/ "y8rg":
/*!*************************************************************!*\
  !*** ./lib/dataProviders/news/MultiSiteNewsDataProvider.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_NewsDataSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/NewsDataSource */ "aE90");
/* harmony import */ var _DataProviderFlights__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DataProviderFlights */ "Xkwe");
/* harmony import */ var _MicroServiceNewsDataProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MicroServiceNewsDataProvider */ "ugjH");
/* harmony import */ var _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utilities/NewsUtilities */ "JpAn");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loc/Strings.resx */ "AOs8");
/**
 * @copyright Microsoft Corporation. All rights reserved.
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
 * @internal
 */
var MultiSiteNewsDataProvider = /** @class */ (function (_super) {
    __extends(MultiSiteNewsDataProvider, _super);
    function MultiSiteNewsDataProvider(options) {
        var _this = _super.call(this, options) || this;
        _this.id = 'MultiSiteNews';
        _this.title = _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].MultiSiteNewsDataProviderTitle;
        return _this;
    }
    Object.defineProperty(MultiSiteNewsDataProvider.prototype, "qosMonitorLabel", {
        get: function () {
            return 'MultiSiteNewsDataSource';
        },
        enumerable: true,
        configurable: true
    });
    MultiSiteNewsDataProvider.prototype.requestData = function (requestInfo) {
        if (requestInfo.siteList.length === 0) {
            return Promise.resolve(this._getNewsItemsWithPadding(requestInfo, 0));
        }
        return _super.prototype.requestData.call(this, requestInfo);
    };
    MultiSiteNewsDataProvider.prototype.executeRequest = function (requestInfo) {
        return this._sphomeHttpClient.post(this.getMicroservicePath(requestInfo), this._getSiteListAndFilterBody(requestInfo.siteList, requestInfo.filterKQLQuery));
    };
    MultiSiteNewsDataProvider.prototype.getMicroservicePath = function (requestInfo) {
        var endpointPath = !_DataProviderFlights__WEBPACK_IMPORTED_MODULE_2__["default"].isFilterForOtherSitesEnabled()
            ? 'news/sites'
            : 'news/sites/filtered';
        var mainSiteUrlQuery = "mainSiteUrl=" + this._pageContext.site.absoluteUrl + "&";
        var queryParams = "start=" + requestInfo.skip + "&count=" + requestInfo.count;
        queryParams += Object(_models_NewsDataSource__WEBPACK_IMPORTED_MODULE_1__["_appendAudienceFilteringQueryParam"])(requestInfo);
        queryParams += Object(_models_NewsDataSource__WEBPACK_IMPORTED_MODULE_1__["_appendLanguageOverrideQueryParam"])(requestInfo);
        var queryCurrentSite = this._shouldQueryCurrentSite(requestInfo.siteList);
        return endpointPath + "?" + (queryCurrentSite ? mainSiteUrlQuery : '') + queryParams;
    };
    MultiSiteNewsDataProvider.prototype._getNewsItemsWithPadding = function (requestInfo, newsCount) {
        var paddingCount = _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_4__["NewsUtilities"].getPaddingCount(requestInfo, newsCount);
        return _utilities_NewsUtilities__WEBPACK_IMPORTED_MODULE_4__["NewsUtilities"].getEmptyStateItems(requestInfo.emptyItemType, this.options.serviceScope, paddingCount, requestInfo.webpartWidth);
    };
    MultiSiteNewsDataProvider.prototype._shouldQueryCurrentSite = function (siteList) {
        var currentSiteId = this._pageContext.site.id.toString();
        var currentWebId = this._pageContext.web.id.toString();
        return _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["findIndex"](siteList, function (site) {
            return site.ItemReference.SiteId === currentSiteId && site.ItemReference.WebId === currentWebId;
        }) > -1;
    };
    MultiSiteNewsDataProvider.prototype._getSiteListAndFilterBody = function (siteList, filterKQLQuery) {
        if (!_DataProviderFlights__WEBPACK_IMPORTED_MODULE_2__["default"].isFilterForOtherSitesEnabled()) {
            return JSON.stringify(siteList.map(function (site) {
                return {
                    Type: 'Site',
                    ItemReference: {
                        Type: 'SiteReference',
                        SiteId: site.ItemReference.SiteId,
                        WebId: site.ItemReference.WebId
                    }
                };
            }));
        }
        else {
            var referenceListItems = siteList.map(function (site) {
                return {
                    Type: 'SiteReference',
                    SiteId: site.ItemReference.SiteId,
                    WebId: site.ItemReference.WebId
                };
            });
            return JSON.stringify({
                ReferenceList: referenceListItems,
                FilterQuery: filterKQLQuery
            });
        }
    };
    return MultiSiteNewsDataProvider;
}(_MicroServiceNewsDataProvider__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (MultiSiteNewsDataProvider);


/***/ }),

/***/ "zDft":
/*!****************************************************!*\
  !*** ./lib/search/enums/SearchAPISortDirection.js ***!
  \****************************************************/
/*! exports provided: SearchAPISortDirection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchAPISortDirection", function() { return SearchAPISortDirection; });
/**
 * @internal
 */
var SearchAPISortDirection = /** @class */ (function () {
    function SearchAPISortDirection() {
    }
    SearchAPISortDirection.ascending = 0;
    SearchAPISortDirection.descending = 1;
    return SearchAPISortDirection;
}());



/***/ })

/******/ })}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));;


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

/***/ "@ms/sp-base-data-source":
/*!******************************************!*\
  !*** external "@ms/sp-base-data-source" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_base_data_source__;

/***/ }),

/***/ "@ms/sp-component-utilities":
/*!*********************************************!*\
  !*** external "@ms/sp-component-utilities" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_component_utilities__;

/***/ }),

/***/ "@ms/sp-home-http-client":
/*!******************************************!*\
  !*** external "@ms/sp-home-http-client" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_home_http_client__;

/***/ }),

/***/ "@ms/sp-list-data-source":
/*!******************************************!*\
  !*** external "@ms/sp-list-data-source" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_list_data_source__;

/***/ }),

/***/ "@ms/sp-list-field-data-source":
/*!************************************************!*\
  !*** external "@ms/sp-list-field-data-source" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_list_field_data_source__;

/***/ }),

/***/ "@ms/sp-list-item-data-source":
/*!***********************************************!*\
  !*** external "@ms/sp-list-item-data-source" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_list_item_data_source__;

/***/ }),

/***/ "@ms/sp-list-view-data-source":
/*!***********************************************!*\
  !*** external "@ms/sp-list-view-data-source" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_list_view_data_source__;

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
//# sourceMappingURL=sp-dataproviders_en-us.js.map