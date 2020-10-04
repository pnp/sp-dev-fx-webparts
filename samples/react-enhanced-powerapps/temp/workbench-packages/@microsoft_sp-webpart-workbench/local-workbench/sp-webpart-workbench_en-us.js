define("8be81a5c-af38-4bb2-af97-afa3b64dfbed_1.11.0", ["@microsoft/load-themed-styles","@microsoft/office-ui-fabric-react-bundle","@microsoft/sp-application-base","@microsoft/sp-core-library","@microsoft/sp-loader","@microsoft/sp-webpart-base","@ms/sp-a11y","@ms/sp-canvas","@ms/sp-telemetry","react","react-dom"], function(__WEBPACK_EXTERNAL_MODULE__microsoft_load_themed_styles__, __WEBPACK_EXTERNAL_MODULE__microsoft_office_ui_fabric_react_bundle__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_application_base__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_core_library__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_loader__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_webpart_base__, __WEBPACK_EXTERNAL_MODULE__ms_sp_a11y__, __WEBPACK_EXTERNAL_MODULE__ms_sp_canvas__, __WEBPACK_EXTERNAL_MODULE__ms_sp_telemetry__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./sp-webpart-workbench.js");
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
    "_NAR8NFw8cblGJm9t5CjqOw": {
      "SuccessfullyLoadedText": "Successfully loaded debug manifests.",
      "ErrorLoadingText": "Failed to load debug manifests: {0}"
    },
    "_vd/LT/qfiQhbHFfeM1GtlA": {
      "FetchFailedError": "Fetching webpats failed with error \"{0}\". Render of a cached workbench may fail.",
      "CanvasInitializationError": "Initializing canvas failed with error \"{0}\".",
      "UnknownError": "An unknown error occurred \"{0}\"."
    },
    "_FQya7ZjwIyrOEutOa+omIA": {
      "Title": "Warning",
      "SubText": "Your web part will not appear in the toolbox. Please make sure \"gulp serve\" is running in a web part project. Please refresh the page once \"gulp serve\" is running.",
      "OkButtonText": "OK",
      "ClickHerePrefix": "Click ",
      "ClickHereLink": "here",
      "ClickHereSuffix": " for more information."
    },
    "_1JArBGDet5Uj9pJOV/9sFw": {
      "UrlTextBoxPlaceholder": "Enter a URL to view in Mobile Preview Tool.",
      "ScreenReaderMobilePreviewEntered": "You have entered the Mobile Preview Tool. If you want to preview a different page, enter the URL in URL text field. To close the tool and go back to Workbench, press Escape.",
      "ScreenReaderDevicePickerEntered": "Use left and right arrow keys to choose a device to change the preview screen size.",
      "ScreenReaderDevicePickerSelectionChanged": "Press Enter to choose this device.",
      "Width": "Width",
      "Height": "Height"
    },
    "_8EVKOH1av6NjR/ZNfdafrw": {
      "WebPartData": "Web Part Data",
      "ClassicPages": "Classic Pages",
      "ModernPages": "Modern Pages",
      "Close": "Close",
      "WebPartDataHelpInfoLink": "Learn about provisioning SharePoint assets from your SharePoint client-side web part"
    },
    "_IusqdbcSoVYQiit3+QRSxw": {
      "Office365Title": "Office 365",
      "SharePointWorkbenchTitle": "SharePoint Workbench",
      "ScreenReaderDisplayModeSwitchToEditMode": "Switched from preview mode to edit mode.",
      "ScreenReaderDisplayModeSwitchToReadMode": "Switched from edit mode to preview mode."
    },
    "_nCtJlVOXBHa59LgYtajnjA": {
      "Save": "Save",
      "SaveAltText": "Use to save the current workbench state.",
      "Discard": "Discard",
      "DiscardAltText": "Use to discard the current workbench state.",
      "Mobile": "Mobile",
      "MobleAltText": "Use to open the mobile preview tool for a cell phone.",
      "Tablet": "Tablet",
      "TabletAltText": "Use to open the mobile preview tool for a tablet.",
      "Preview": "Preview",
      "PreviewAltText": "Use to switch from edit mode to preview mode.",
      "Edit": "Edit",
      "EditAltText": "Use to switch to edit mode.",
      "WebPartData": "Web part data",
      "WebPartDataAltText": "Display the serialized web part data."
    }
  };

  strings.default = strings;
  return strings;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sp-webpart-workbench.js":
/*!*********************************!*\
  !*** ./sp-webpart-workbench.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! @ms/sp-canvas */ "@ms/sp-canvas"),__webpack_require__(/*! @ms/sp-telemetry */ "@ms/sp-telemetry"),__webpack_require__(/*! @microsoft/sp-application-base */ "@microsoft/sp-application-base"),__webpack_require__(/*! @microsoft/sp-loader */ "@microsoft/sp-loader"),__webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "@microsoft/office-ui-fabric-react-bundle"),__webpack_require__(/*! @microsoft/sp-core-library */ "@microsoft/sp-core-library"),__webpack_require__(/*! @microsoft/sp-webpart-base */ "@microsoft/sp-webpart-base"),__webpack_require__(/*! react */ "react"),__webpack_require__(/*! react-dom */ "react-dom"),__webpack_require__(/*! @microsoft/load-themed-styles */ "@microsoft/load-themed-styles"),__webpack_require__(/*! resx-strings */ "../lib/resx-strings/en-us.js"),__webpack_require__(/*! @ms/sp-a11y */ "@ms/sp-a11y")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(__WEBPACK_EXTERNAL_MODULE__1_jj__, __WEBPACK_EXTERNAL_MODULE__2q6Q__, __WEBPACK_EXTERNAL_MODULE_GPet__, __WEBPACK_EXTERNAL_MODULE_I6O9__, __WEBPACK_EXTERNAL_MODULE_KL1q__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_br4S__, __WEBPACK_EXTERNAL_MODULE_cDcd__, __WEBPACK_EXTERNAL_MODULE_faye__, __WEBPACK_EXTERNAL_MODULE_jOlS__, __WEBPACK_EXTERNAL_MODULE_vpy3__, __WEBPACK_EXTERNAL_MODULE_ytfe__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"sp-webpart-workbench": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({"vendors~uifabric-variants":"vendors~uifabric-variants"}[chunkId]||chunkId) + "_" + {"vendors~uifabric-variants":"bcce34d2bfa5cbafe865"}[chunkId] + ".js"
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
/******/ 	var jsonpArray = window["webpackJsonp_8be81a5c_af38_4bb2_af97_afa3b64dfbed_1_11_0"] = window["webpackJsonp_8be81a5c_af38_4bb2_af97_afa3b64dfbed_1_11_0"] || [];
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
/******/ 	  var regex = (typeof spScriptNamePattern !== 'undefined') ? spScriptNamePattern : new RegExp('\\/sp-webpart-workbench(_[a-z0-9-]+)*\\.js', 'i');
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
/******/ 	return __webpack_require__(__webpack_require__.s = "E+gO");
/******/ })
/************************************************************************/
/******/ ({

/***/ "+THm":
/*!*************************************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewDimensionInput/MobilePreviewDimensionInput.module.scss.js ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./MobilePreviewDimensionInput.module.css */ "h7Vj");
var styles = {
    xField: 'xField_cce73b93',
    yField: 'yField_cce73b93',
    mobilePreviewTextfieldXY: 'mobilePreviewTextfieldXY_cce73b93',
    xyTextfields: 'xyTextfields_cce73b93',
    xyLabels: 'xyLabels_cce73b93'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "/DFU":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/components/mobilePreview/mobilePreviewHeaderBar/mobilePreviewDeviceTypeSelector/MobilePreviewDeviceTypeSelector.module.css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".mobilePreviewDeviceIcon_4e248641{color:#a19f9d;margin:auto;padding:auto;font-size:40px;line-height:50px}.mobilePreviewDeviceIcon_4e248641:hover{cursor:pointer;color:#767676}.navBarItemRight_4e248641{font-size:14px;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;height:40px;line-height:40px;position:relative;float:right;margin:0}", ""]);



/***/ }),

/***/ "/UwG":
/*!***********************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewHeaderBar/MobilePreviewHeaderBar.module.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./MobilePreviewHeaderBar.module.css */ "oSGF");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "01ek":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/Dialog.styles.js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var GlobalClassNames = {
    root: 'ms-Dialog'
};
var getStyles = function (props) {
    var _a;
    var className = props.className, containerClassName = props.containerClassName, _b = props.dialogDefaultMinWidth, dialogDefaultMinWidth = _b === void 0 ? '288px' : _b, _c = props.dialogDefaultMaxWidth, dialogDefaultMaxWidth = _c === void 0 ? '340px' : _c, hidden = props.hidden, theme = props.theme;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        root: [classNames.root, theme.fonts.medium, className],
        main: [
            {
                width: dialogDefaultMinWidth,
                outline: '3px solid transparent',
                selectors: (_a = {},
                    _a["@media (min-width: " + _Styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMinMedium"] + "px)"] = {
                        width: 'auto',
                        maxWidth: dialogDefaultMaxWidth,
                        minWidth: dialogDefaultMinWidth
                    },
                    _a)
            },
            !hidden && { display: 'flex' },
            containerClassName
        ]
    };
};
//# sourceMappingURL=Dialog.styles.js.map

/***/ }),

/***/ "04mm":
/*!***************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/prop-types/15.6.0/node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  var invariant = __webpack_require__(/*! fbjs/lib/invariant */ "ypis");
  var warning = __webpack_require__(/*! fbjs/lib/warning */ "Q+bF");
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "DVb/");
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "0HQZ":
/*!***************************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewHeaderBar/MobilePreviewHeaderBar.module.scss.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./MobilePreviewHeaderBar.module.css */ "/UwG");
var styles = {
    mobilePreviewNavBar: 'mobilePreviewNavBar_232392bf',
    navBarItems: 'navBarItems_232392bf',
    navBarItemSm: 'navBarItemSm_232392bf',
    navBarItemMd: 'navBarItemMd_232392bf',
    navBarItem: 'navBarItem_232392bf',
    'ms-Grid': 'ms-Grid_232392bf',
    navBarItemRight: 'navBarItemRight_232392bf',
    mobilePreviewTitle: 'mobilePreviewTitle_232392bf',
    mobilePreviewXIcon: 'mobilePreviewXIcon_232392bf',
    col: 'col_232392bf'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "1+jj":
/*!********************************!*\
  !*** external "@ms/sp-canvas" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1_jj__;

/***/ }),

/***/ "14dw":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/components/mobilePreview/mobilePreviewClickStop/MobilePreviewClickStop.module.css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".clickStop_ad5c4140{border-width:0 2px;border-style:solid;height:30px;line-height:30px;position:absolute}.clickStop_ad5c4140:hover{background-color:#c8c8c8;cursor:pointer}.clickStopSelected_ad5c4140{background-color:#c8c8c8}.navBarItem_ad5c4140{border-color:#fff;float:left;margin-right:18px;font-size:14px;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box;display:block}", ""]);



/***/ }),

/***/ "15YF":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/Dialog.base.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: DialogBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogBase", function() { return DialogBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DialogContent_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DialogContent.types */ "F+OE");
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Modal */ "67Sy");
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utilities/decorators/withResponsiveMode */ "jiHw");
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _DialogContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DialogContent */ "Nio4");






var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();

var DefaultModalProps = {
    isDarkOverlay: false,
    isBlocking: false,
    className: '',
    containerClassName: '',
    topOffsetFixed: false
};
var DefaultDialogContentProps = {
    type: _DialogContent_types__WEBPACK_IMPORTED_MODULE_3__["DialogType"].normal,
    className: '',
    topButtonsProps: []
};
var DialogBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DialogBase, _super);
    function DialogBase(props) {
        var _this = _super.call(this, props) || this;
        _this._getSubTextId = function () {
            var _a = _this.props, ariaDescribedById = _a.ariaDescribedById, modalProps = _a.modalProps, dialogContentProps = _a.dialogContentProps, subText = _a.subText;
            var id = ariaDescribedById || (modalProps && modalProps.subtitleAriaId);
            if (!id) {
                id = (subText || (dialogContentProps && dialogContentProps.subText)) && _this._defaultSubTextId;
            }
            return id;
        };
        _this._getTitleTextId = function () {
            var _a = _this.props, ariaLabelledById = _a.ariaLabelledById, modalProps = _a.modalProps, dialogContentProps = _a.dialogContentProps, title = _a.title;
            var id = ariaLabelledById || (modalProps && modalProps.titleAriaId);
            if (!id) {
                id = (title || (dialogContentProps && dialogContentProps.title)) && _this._defaultTitleTextId;
            }
            return id;
        };
        _this._id = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getId"])('Dialog');
        _this._defaultTitleTextId = _this._id + '-title';
        _this._defaultSubTextId = _this._id + '-subText';
        if (true) {
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["warnDeprecations"])('Dialog', props, {
                isOpen: 'hidden',
                type: 'dialogContentProps.type',
                subText: 'dialogContentProps.subText',
                contentClassName: 'dialogContentProps.className',
                topButtonsProps: 'dialogContentProps.topButtonsProps',
                className: 'modalProps.className',
                isDarkOverlay: 'modalProps.isDarkOverlay',
                isBlocking: 'modalProps.isBlocking',
                containerClassName: 'modalProps.containerClassName',
                onDismissed: 'modalProps.onDismissed',
                onLayerDidMount: 'modalProps.layerProps.onLayerDidMount',
                ariaDescribedById: 'modalProps.subtitleAriaId',
                ariaLabelledById: 'modalProps.titleAriaId'
            });
        }
        return _this;
    }
    DialogBase.prototype.render = function () {
        var _a = this.props, className = _a.className, containerClassName = _a.containerClassName, contentClassName = _a.contentClassName, elementToFocusOnDismiss = _a.elementToFocusOnDismiss, firstFocusableSelector = _a.firstFocusableSelector, forceFocusInsideTrap = _a.forceFocusInsideTrap, styles = _a.styles, hidden = _a.hidden, ignoreExternalFocusing = _a.ignoreExternalFocusing, isBlocking = _a.isBlocking, isClickableOutsideFocusTrap = _a.isClickableOutsideFocusTrap, isDarkOverlay = _a.isDarkOverlay, isOpen = _a.isOpen, onDismiss = _a.onDismiss, onDismissed = _a.onDismissed, onLayerDidMount = _a.onLayerDidMount, responsiveMode = _a.responsiveMode, subText = _a.subText, theme = _a.theme, title = _a.title, topButtonsProps = _a.topButtonsProps, type = _a.type, minWidth = _a.minWidth, maxWidth = _a.maxWidth, modalProps = _a.modalProps;
        var mergedLayerProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, (modalProps ? modalProps.layerProps : { onLayerDidMount: onLayerDidMount }));
        if (onLayerDidMount && !mergedLayerProps.onLayerDidMount) {
            mergedLayerProps.onLayerDidMount = onLayerDidMount;
        }
        var dialogDraggableClassName;
        var dragOptions;
        // if we are draggable, make sure we are using the correct
        // draggable classname and selectors
        if (modalProps && modalProps.dragOptions && !modalProps.dragOptions.dragHandleSelector) {
            dialogDraggableClassName = 'ms-Dialog-draggable-header';
            dragOptions = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, modalProps.dragOptions, { dragHandleSelector: "." + dialogDraggableClassName });
        }
        else {
            dragOptions = modalProps && modalProps.dragOptions;
        }
        var mergedModalProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, DefaultModalProps, modalProps, { layerProps: mergedLayerProps, dragOptions: dragOptions });
        var dialogContentProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, DefaultDialogContentProps, this.props.dialogContentProps, { draggableHeaderClassName: dialogDraggableClassName });
        var classNames = getClassNames(styles, {
            theme: theme,
            className: className || mergedModalProps.className,
            containerClassName: containerClassName || mergedModalProps.containerClassName,
            hidden: hidden,
            dialogDefaultMinWidth: minWidth,
            dialogDefaultMaxWidth: maxWidth
        });
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Modal__WEBPACK_IMPORTED_MODULE_4__["Modal"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ elementToFocusOnDismiss: elementToFocusOnDismiss, firstFocusableSelector: firstFocusableSelector, forceFocusInsideTrap: forceFocusInsideTrap, ignoreExternalFocusing: ignoreExternalFocusing, isClickableOutsideFocusTrap: isClickableOutsideFocusTrap, onDismissed: onDismissed, responsiveMode: responsiveMode }, mergedModalProps, { isDarkOverlay: isDarkOverlay !== undefined ? isDarkOverlay : mergedModalProps.isDarkOverlay, isBlocking: isBlocking !== undefined ? isBlocking : mergedModalProps.isBlocking, isOpen: isOpen !== undefined ? isOpen : !hidden, className: classNames.root, containerClassName: classNames.main, onDismiss: onDismiss ? onDismiss : mergedModalProps.onDismiss, subtitleAriaId: this._getSubTextId(), titleAriaId: this._getTitleTextId() }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_DialogContent__WEBPACK_IMPORTED_MODULE_6__["DialogContent"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ titleId: this._defaultTitleTextId, subTextId: this._defaultSubTextId, title: title, subText: subText, showCloseButton: isBlocking !== undefined ? !isBlocking : !mergedModalProps.isBlocking, topButtonsProps: topButtonsProps ? topButtonsProps : dialogContentProps.topButtonsProps, type: type !== undefined ? type : dialogContentProps.type, onDismiss: onDismiss ? onDismiss : dialogContentProps.onDismiss, className: contentClassName || dialogContentProps.className }, dialogContentProps), this.props.children)));
    };
    DialogBase.defaultProps = {
        hidden: true
    };
    DialogBase = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_5__["withResponsiveMode"]
    ], DialogBase);
    return DialogBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=Dialog.base.js.map

/***/ }),

/***/ "1JM4":
/*!**************************************************************!*\
  !*** ./lib/components/mobilePreview/MobilePreviewDevices.js ***!
  \**************************************************************/
/*! exports provided: mobilePreviewDevices */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mobilePreviewDevices", function() { return mobilePreviewDevices; });
/**
 * Input to the MobilePreview component for which device options to have
 */
/* tslint:disable */
var mobilePreviewDevices = {
    /* tslint:enable */
    phones: [
        { name: 'iPhone 6 Plus', width: 414, height: 736 },
        { name: 'Samsung Galaxy S6/S7', width: 360, height: 640 },
        { name: 'iPhone 5', width: 320, height: 568 },
        { name: 'Microsoft Lumia 1520', width: 432, height: 768 }
    ],
    tablets: [
        { name: 'Microsoft Surface Pro 3', width: 1440, height: 960 },
        { name: 'Microsoft Surface Pro', width: 1280, height: 720 },
        { name: 'iPad', width: 1024, height: 768 },
        { name: 'iPad Pro', width: 1366, height: 1024 },
        { name: 'Samsung Galaxy Tab', width: 1280, height: 800 }
    ],
    desktops: []
};


/***/ }),

/***/ "1dCo":
/*!*****************************************************************************!*\
  !*** ./lib/components/serializedCanvasView/SerializedCanvasView.module.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./SerializedCanvasView.module.css */ "O48R");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "2Jnp":
/*!************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/prop-types/15.6.0/node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(/*! fbjs/lib/emptyFunction */ "xvdx");
var invariant = __webpack_require__(/*! fbjs/lib/invariant */ "ypis");
var warning = __webpack_require__(/*! fbjs/lib/warning */ "Q+bF");
var assign = __webpack_require__(/*! object-assign */ "sjay");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "DVb/");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "04mm");

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (  true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : undefined;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "2X7w":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Layer/Layer.styles.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var GlobalClassNames = {
    root: 'ms-Layer',
    rootNoHost: 'ms-Layer--fixed',
    content: 'ms-Layer-content'
};
var getStyles = function (props) {
    var className = props.className, isNotHost = props.isNotHost, theme = props.theme;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        root: [
            classNames.root,
            theme.fonts.medium,
            isNotHost && [
                classNames.rootNoHost,
                {
                    position: 'fixed',
                    zIndex: _Styling__WEBPACK_IMPORTED_MODULE_0__["ZIndexes"].Layer,
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    visibility: 'hidden'
                }
            ],
            className
        ],
        content: [
            classNames.content,
            {
                visibility: 'visible'
            }
        ]
    };
};
//# sourceMappingURL=Layer.styles.js.map

/***/ }),

/***/ "2pUL":
/*!************************************************************************!*\
  !*** ./lib/components/workbenchCommandBar/WorkbenchCommandBar.resx.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_nCtJlVOXBHa59LgYtajnjA';
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

/***/ "2zVY":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Overlay.js ***!
  \*********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Overlay.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

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

/***/ "3Qht":
/*!**********************************!*\
  !*** ./lib/workbench.module.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./workbench.module.css */ "F2A3");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "47A5":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/components/canvasHost/CanvasHost.module.css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".belowHeader_3f3fd3c2,.canvasHost_3f3fd3c2,.content_3f3fd3c2{position:absolute;left:0;top:0;right:0;bottom:0}.belowHeader_3f3fd3c2,.content_3f3fd3c2{overflow:hidden}.content_3f3fd3c2{transition:margin-right .6s ease;-webkit-transition:margin-right .6s ease;padding:10px 30px;overflow-y:auto}.hasHeader_3f3fd3c2 .belowHeader_3f3fd3c2{top:50px}.hasCommandBar_3f3fd3c2 .content_3f3fd3c2{top:40px}.canvasHost_3f3fd3c2 .NavPane_3f3fd3c2{width:220px;right:auto}", ""]);



/***/ }),

/***/ "4RHQ":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Styling.js ***!
  \*********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Styling.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "4azF":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/DraggableZone/index.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: DraggableZone, getClassNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DraggableZone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DraggableZone */ "nDaQ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DraggableZone", function() { return _DraggableZone__WEBPACK_IMPORTED_MODULE_0__["DraggableZone"]; });

/* harmony import */ var _DraggableZone_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DraggableZone.styles */ "rp3K");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getClassNames", function() { return _DraggableZone_styles__WEBPACK_IMPORTED_MODULE_1__["getClassNames"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "5jyc":
/*!******************************************************************!*\
  !*** ./lib/components/serializedCanvasView/encodingUtilities.js ***!
  \******************************************************************/
/*! exports provided: htmlEncode, getReactLines */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "htmlEncode", function() { return htmlEncode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReactLines", function() { return getReactLines; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/**
 * It'd be nice to eventually replace this functionality with a real editor/renderer
 */

function htmlEncode(str) {
    if (str) {
        return str
            .replace(/\&/g, '&amp;')
            .replace(/\</g, '&lt;')
            .replace(/\>/g, '&gt;');
    }
    else {
        return str;
    }
}
function getReactLines(str) {
    if (str) {
        if (typeof str === 'string') {
            str = str.split('\n');
        }
        var encodedLines = str.map(function (line) { return htmlEncode(line).replace(/\s/g, '&nbsp;'); });
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { dangerouslySetInnerHTML: { __html: encodedLines.join('<br />') } }));
    }
}


/***/ }),

/***/ "67Sy":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Modal.js ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: default, Modal, ModalBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Modal_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Modal/index */ "y2VM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return _components_Modal_index__WEBPACK_IMPORTED_MODULE_0__["Modal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalBase", function() { return _components_Modal_index__WEBPACK_IMPORTED_MODULE_0__["ModalBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _components_Modal_index__WEBPACK_IMPORTED_MODULE_0__["Modal"]; });



//# sourceMappingURL=Modal.js.map

/***/ }),

/***/ "799H":
/*!********************************************************************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewHeaderBar/mobilePreviewDeviceTypeSelector/MobilePreviewDeviceTypeSelector.module.scss.js ***!
  \********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./MobilePreviewDeviceTypeSelector.module.css */ "DJsF");
var styles = {
    mobilePreviewDeviceIcon: 'mobilePreviewDeviceIcon_4e248641',
    navBarItemRight: 'navBarItemRight_4e248641'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "7Arc":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Layer/Layer.base.js ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: LayerBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayerBase", function() { return LayerBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Fabric__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Fabric */ "jN8F");
/* harmony import */ var _Fabric__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Fabric__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Layer_notification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Layer.notification */ "nACv");






var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["classNamesFunction"])();
var LayerBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LayerBase, _super);
    function LayerBase(props) {
        var _this = _super.call(this, props) || this;
        _this._rootRef = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._createLayerElement = function () {
            var hostId = _this.props.hostId;
            var doc = Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["getDocument"])(_this._rootRef.current);
            var host = _this._getHost();
            if (!doc || !host) {
                return;
            }
            // If one was already existing, remove.
            _this._removeLayerElement();
            var layerElement = doc.createElement('div');
            var classNames = _this._getClassNames();
            layerElement.className = classNames.root;
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["setPortalAttribute"])(layerElement);
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["setVirtualParent"])(layerElement, _this._rootRef.current);
            _this.props.insertFirst ? host.insertBefore(layerElement, host.firstChild) : host.appendChild(layerElement);
            _this.setState({
                hostId: hostId,
                layerElement: layerElement
            }, function () {
                var _a = _this.props, onLayerDidMount = _a.onLayerDidMount, onLayerMounted = _a.onLayerMounted;
                if (onLayerMounted) {
                    onLayerMounted();
                }
                if (onLayerDidMount) {
                    onLayerDidMount();
                }
            });
        };
        _this.state = {};
        if (true) {
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["warnDeprecations"])('Layer', props, {
                onLayerMounted: 'onLayerDidMount'
            });
        }
        return _this;
    }
    LayerBase.prototype.componentDidMount = function () {
        var hostId = this.props.hostId;
        this._createLayerElement();
        if (hostId) {
            Object(_Layer_notification__WEBPACK_IMPORTED_MODULE_5__["registerLayer"])(hostId, this._createLayerElement);
        }
    };
    LayerBase.prototype.render = function () {
        var layerElement = this.state.layerElement;
        var classNames = this._getClassNames();
        var eventBubblingEnabled = this.props.eventBubblingEnabled;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: "ms-layer", ref: this._rootRef }, layerElement &&
            react_dom__WEBPACK_IMPORTED_MODULE_2__["createPortal"](react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Fabric__WEBPACK_IMPORTED_MODULE_3__["Fabric"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, !eventBubblingEnabled && _getFilteredEvents(), { className: classNames.content }), this.props.children), layerElement)));
    };
    LayerBase.prototype.componentDidUpdate = function () {
        if (this.props.hostId !== this.state.hostId) {
            this._createLayerElement();
        }
    };
    LayerBase.prototype.componentWillUnmount = function () {
        var hostId = this.props.hostId;
        this._removeLayerElement();
        if (hostId) {
            Object(_Layer_notification__WEBPACK_IMPORTED_MODULE_5__["unregisterLayer"])(hostId, this._createLayerElement);
        }
    };
    LayerBase.prototype._removeLayerElement = function () {
        var onLayerWillUnmount = this.props.onLayerWillUnmount;
        var layerElement = this.state.layerElement;
        if (onLayerWillUnmount) {
            onLayerWillUnmount();
        }
        if (layerElement && layerElement.parentNode) {
            var parentNode = layerElement.parentNode;
            if (parentNode) {
                parentNode.removeChild(layerElement);
            }
        }
    };
    LayerBase.prototype._getClassNames = function () {
        var _a = this.props, className = _a.className, styles = _a.styles, theme = _a.theme;
        var classNames = getClassNames(styles, {
            theme: theme,
            className: className,
            isNotHost: !this.props.hostId
        });
        return classNames;
    };
    LayerBase.prototype._getHost = function () {
        var hostId = this.props.hostId;
        var doc = Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["getDocument"])(this._rootRef.current);
        if (!doc) {
            return undefined;
        }
        if (hostId) {
            return doc.getElementById(hostId);
        }
        else {
            var defaultHostSelector = Object(_Layer_notification__WEBPACK_IMPORTED_MODULE_5__["getDefaultTarget"])();
            return defaultHostSelector ? doc.querySelector(defaultHostSelector) : doc.body;
        }
    };
    LayerBase.defaultProps = {
        onLayerDidMount: function () { return undefined; },
        onLayerWillUnmount: function () { return undefined; }
    };
    LayerBase = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["customizable"])('Layer', ['theme', 'hostId'])
    ], LayerBase);
    return LayerBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

var _onFilterEvent = function (ev) {
    // We should just be able to check ev.bubble here and only stop events that are bubbling up. However, even though mouseenter and
    //    mouseleave do NOT bubble up, they are showing up as bubbling. Therefore we stop events based on event name rather than ev.bubble.
    if (ev.eventPhase === Event.BUBBLING_PHASE && ev.type !== 'mouseenter' && ev.type !== 'mouseleave') {
        ev.stopPropagation();
    }
};
var _filteredEventProps;
function _getFilteredEvents() {
    if (!_filteredEventProps) {
        _filteredEventProps = {};
        [
            'onClick',
            'onContextMenu',
            'onDoubleClick',
            'onDrag',
            'onDragEnd',
            'onDragEnter',
            'onDragExit',
            'onDragLeave',
            'onDragOver',
            'onDragStart',
            'onDrop',
            'onMouseDown',
            'onMouseEnter',
            'onMouseLeave',
            'onMouseMove',
            'onMouseOver',
            'onMouseOut',
            'onMouseUp',
            'onKeyDown',
            'onKeyPress',
            'onKeyUp',
            'onFocus',
            'onBlur',
            'onChange',
            'onInput',
            'onInvalid',
            'onSubmit'
        ].forEach(function (name) { return (_filteredEventProps[name] = _onFilterEvent); });
    }
    return _filteredEventProps;
}
//# sourceMappingURL=Layer.base.js.map

/***/ }),

/***/ "7wuK":
/*!*************************************************************!*\
  !*** ./lib/components/canvasHost/CanvasHost.module.scss.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./CanvasHost.module.css */ "iVx4");
var styles = {
    canvasHost: 'canvasHost_3f3fd3c2',
    belowHeader: 'belowHeader_3f3fd3c2',
    content: 'content_3f3fd3c2',
    hasHeader: 'hasHeader_3f3fd3c2',
    hasCommandBar: 'hasCommandBar_3f3fd3c2',
    NavPane: 'NavPane_3f3fd3c2'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "88pY":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Layer.js ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: Layer, LayerBase, LayerHost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "G0Zq");
/* harmony import */ var _components_Layer_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Layer/index */ "qEgt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return _components_Layer_index__WEBPACK_IMPORTED_MODULE_1__["Layer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayerBase", function() { return _components_Layer_index__WEBPACK_IMPORTED_MODULE_1__["LayerBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayerHost", function() { return _components_Layer_index__WEBPACK_IMPORTED_MODULE_1__["LayerHost"]; });



//# sourceMappingURL=Layer.js.map

/***/ }),

/***/ "8AXX":
/*!**********************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/spfx-core/sp-property-pane/lib/propertyPaneController/PropertyPaneController.module.css ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PropertyPaneController.module.css */ "p9PU");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "8S/1":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/DialogFooter.styles.js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var GlobalClassNames = {
    actions: 'ms-Dialog-actions',
    action: 'ms-Dialog-action',
    actionsRight: 'ms-Dialog-actionsRight'
};
var getStyles = function (props) {
    var className = props.className, theme = props.theme;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        actions: [
            classNames.actions,
            {
                position: 'relative',
                width: '100%',
                minHeight: '24px',
                lineHeight: '24px',
                margin: '16px 0 0',
                fontSize: '0',
                selectors: {
                    '.ms-Button': {
                        lineHeight: 'normal'
                    }
                }
            },
            className
        ],
        action: [
            classNames.action,
            {
                margin: '0 4px'
            }
        ],
        actionsRight: [
            classNames.actionsRight,
            {
                textAlign: 'right',
                marginRight: '-4px',
                fontSize: '0'
            }
        ]
    };
};
//# sourceMappingURL=DialogFooter.styles.js.map

/***/ }),

/***/ "9yj+":
/*!*******************************************************************!*\
  !*** ./lib/components/workbenchCommandBar/WorkbenchCommandBar.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WorkbenchCommandBar.resx */ "2pUL");




var WorkbenchCommandBar = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WorkbenchCommandBar, _super);
    function WorkbenchCommandBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkbenchCommandBar.prototype.render = function () {
        var items = this.props.isEditing ? [
            {
                key: 'save',
                name: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].Save,
                icon: 'Save',
                ariaLabel: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].Save,
                title: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].SaveAltText,
                onClick: this.props.savePage,
                'data-automation-id': 'workbench-command-bar-save'
            },
            {
                key: 'discard',
                name: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].Discard,
                icon: 'RevToggleKey',
                ariaLabel: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].Discard,
                title: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].DiscardAltText,
                onClick: this.props.clearPage,
                'data-automation-id': 'workbench-command-bar-discard'
            },
            {
                key: 'wpData',
                name: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].WebPartData,
                icon: 'TriangleUp12',
                ariaLabel: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].WebPartData,
                title: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].WebPartDataAltText,
                onClick: this.props.onClickSerializeCanvasView,
                'data-automation-id': 'workbench-command-bar-serialize'
            }
        ] : [];
        var farItems = this.props.isEditing ? [
            {
                key: 'mobilePreview',
                name: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].Mobile,
                icon: 'CellPhone',
                ariaLabel: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].Mobile,
                title: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].MobleAltText,
                onClick: this.props.onClickMobileView,
                'data-automation-id': 'workbench-command-bar-mobile-cellphone'
            },
            {
                key: 'tabletPreview',
                name: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].Tablet,
                icon: 'Tablet',
                ariaLabel: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].Tablet,
                title: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].TabletAltText,
                onClick: this.props.onClickTabletView,
                'data-automation-id': 'workbench-command-bar-mobile-tablet'
            },
            {
                key: 'preview',
                name: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].Preview,
                icon: 'View',
                ariaLabel: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].Preview,
                title: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].PreviewAltText,
                onClick: this.props.toggleEdit,
                'data-automation-id': 'workbench-command-bar-preview',
                'data-sp-a11y-id': 'previewButton'
            }
        ] : [
            {
                key: 'edit',
                name: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].Edit,
                icon: 'Edit',
                ariaLabel: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].Edit,
                title: _WorkbenchCommandBar_resx__WEBPACK_IMPORTED_MODULE_3__["default"].EditAltText,
                onClick: this.props.toggleEdit,
                'data-automation-id': 'workbench-command-bar-edit',
                'data-sp-a11y-id': 'editButton'
            }
        ];
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["CommandBar"], { "aria-live": 'polite', items: items, farItems: farItems, role: 'toolbar' }));
    };
    return WorkbenchCommandBar;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (WorkbenchCommandBar);


/***/ }),

/***/ "A9Rn":
/*!*********************************************!*\
  !*** ./lib/components/error/ErrorDialog.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Dialog */ "glo3");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ErrorDialog_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ErrorDialog.resx */ "eNti");
// @copyright Microsoft Corporation. All rights reserved.





/**
 * Error dialog for the workbench.
 */
var ErrorDialog = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ErrorDialog, _super);
    function ErrorDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showDialog: false
        };
        return _this;
    }
    ErrorDialog.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_1__["Dialog"], { hidden: !this.state.showDialog, dialogContentProps: {
                title: _ErrorDialog_resx__WEBPACK_IMPORTED_MODULE_4__["default"].Title,
                subText: _ErrorDialog_resx__WEBPACK_IMPORTED_MODULE_4__["default"].SubText,
                type: office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_1__["DialogType"].largeHeader
            }, modalProps: {
                isBlocking: false
            } },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", null, _ErrorDialog_resx__WEBPACK_IMPORTED_MODULE_4__["default"].ClickHerePrefix),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["Link"], { href: 'https://dev.office.com/sharepoint/docs/spfx/web-parts/get-started/build-a-hello-world-web-part' }, _ErrorDialog_resx__WEBPACK_IMPORTED_MODULE_4__["default"].ClickHereLink),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", null, _ErrorDialog_resx__WEBPACK_IMPORTED_MODULE_4__["default"].ClickHereSuffix),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_1__["DialogFooter"], null,
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["PrimaryButton"], { onClick: this._close, "data-automation-id": 'GulpServeWarningOkButton', text: _ErrorDialog_resx__WEBPACK_IMPORTED_MODULE_4__["default"].OkButtonText }))));
    };
    ErrorDialog.prototype.open = function () {
        this.setState({ showDialog: true });
    };
    ErrorDialog.prototype._close = function () {
        this.setState({ showDialog: false });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], ErrorDialog.prototype, "open", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], ErrorDialog.prototype, "_close", null);
    return ErrorDialog;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (ErrorDialog);


/***/ }),

/***/ "BGHn":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/components/mobilePreview/mobilePreviewDeviceView/MobilePreviewDeviceView.module.css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".mobilePreviewDevice_7d904bbf{border-color:#797775;border-radius:15px;border-style:solid;position:relative;margin:70px auto auto}.mobilePreviewPortrait_7d904bbf{border-width:60px 16px}.mobilePreviewLandscape_7d904bbf{border-width:16px 60px}.mobilePreviewTablet_7d904bbf{border-width:40px}.mobilePreviewIframe_7d904bbf{background-color:#fff;width:100%;height:100%;position:absolute;border:none}", ""]);



/***/ }),

/***/ "Bgjg":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Layer/Layer.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: Layer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return Layer; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Layer_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layer.base */ "7Arc");
/* harmony import */ var _Layer_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Layer.styles */ "2X7w");



var Layer = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Layer_base__WEBPACK_IMPORTED_MODULE_1__["LayerBase"], _Layer_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'Layer',
    fields: ['hostId', 'theme', 'styles']
});
//# sourceMappingURL=Layer.js.map

/***/ }),

/***/ "CNvk":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/DialogContent.base.js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DialogContentBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogContentBase", function() { return DialogContentBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DialogContent_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DialogContent.types */ "F+OE");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Button */ "xk/t");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _DialogFooter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DialogFooter */ "T/ax");
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utilities/decorators/withResponsiveMode */ "jiHw");
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_6__);







var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var DialogFooterType = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_DialogFooter__WEBPACK_IMPORTED_MODULE_5__["DialogFooter"], null).type;
var DialogContentBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DialogContentBase, _super);
    function DialogContentBase(props) {
        return _super.call(this, props) || this;
    }
    DialogContentBase.prototype.render = function () {
        var _a = this.props, showCloseButton = _a.showCloseButton, className = _a.className, closeButtonAriaLabel = _a.closeButtonAriaLabel, onDismiss = _a.onDismiss, subTextId = _a.subTextId, subText = _a.subText, titleId = _a.titleId, title = _a.title, type = _a.type, styles = _a.styles, theme = _a.theme, draggableHeaderClassName = _a.draggableHeaderClassName;
        var classNames = getClassNames(styles, {
            theme: theme,
            className: className,
            isLargeHeader: type === _DialogContent_types__WEBPACK_IMPORTED_MODULE_3__["DialogType"].largeHeader,
            isClose: type === _DialogContent_types__WEBPACK_IMPORTED_MODULE_3__["DialogType"].close,
            draggableHeaderClassName: draggableHeaderClassName
        });
        var groupings = this._groupChildren();
        var subTextContent;
        if (subText) {
            subTextContent = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("p", { className: classNames.subText, id: subTextId }, subText));
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.content },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.header },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("p", { className: classNames.title, id: titleId, role: "heading", "aria-level": 2 }, title),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.topButton },
                    this.props.topButtonsProps.map(function (props, index) { return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Button__WEBPACK_IMPORTED_MODULE_4__["IconButton"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ key: props.uniqueId || index }, props))); }),
                    (type === _DialogContent_types__WEBPACK_IMPORTED_MODULE_3__["DialogType"].close || (showCloseButton && type !== _DialogContent_types__WEBPACK_IMPORTED_MODULE_3__["DialogType"].largeHeader)) && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Button__WEBPACK_IMPORTED_MODULE_4__["IconButton"], { className: classNames.button, iconProps: { iconName: 'Cancel' }, ariaLabel: closeButtonAriaLabel, onClick: onDismiss })))),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.inner },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.innerContent },
                    subTextContent,
                    groupings.contents),
                groupings.footers)));
    };
    // @TODO - typing the footers as an array of DialogFooter is difficult because
    // casing "child as DialogFooter" causes a problem because
    // "Neither type 'ReactElement<any>' nor type 'DialogFooter' is assignable to the other."
    DialogContentBase.prototype._groupChildren = function () {
        var groupings = {
            footers: [],
            contents: []
        };
        react__WEBPACK_IMPORTED_MODULE_1__["Children"].map(this.props.children, function (child) {
            if (typeof child === 'object' && child !== null && child.type === DialogFooterType) {
                groupings.footers.push(child);
            }
            else {
                groupings.contents.push(child);
            }
        });
        return groupings;
    };
    DialogContentBase.defaultProps = {
        showCloseButton: false,
        className: '',
        topButtonsProps: [],
        closeButtonAriaLabel: 'Close'
    };
    DialogContentBase = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_6__["withResponsiveMode"]
    ], DialogContentBase);
    return DialogContentBase;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=DialogContent.base.js.map

/***/ }),

/***/ "DJsF":
/*!****************************************************************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewHeaderBar/mobilePreviewDeviceTypeSelector/MobilePreviewDeviceTypeSelector.module.css ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./MobilePreviewDeviceTypeSelector.module.css */ "/DFU");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "DVb/":
/*!*************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/prop-types/15.6.0/node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "E+gO":
/*!***********************************!*\
  !*** ./lib/spWebpartWorkbench.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/sp-a11y */ "ytfe");
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_application_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-application-base */ "GPet");
/* harmony import */ var _microsoft_sp_application_base__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_application_base__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_error_ErrorDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/error/ErrorDialog */ "A9Rn");
/* harmony import */ var _components_workbench_Workbench__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/workbench/Workbench */ "xqig");
/* harmony import */ var _stores_PageStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./stores/PageStore */ "jCMC");
/* harmony import */ var _spWebpartWorkbench_resx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./spWebpartWorkbench.resx */ "mPVl");
/* harmony import */ var _workbench_module_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./workbench.module.scss */ "g3Fb");

/* tslint:disable-next-line:no-unused-variable */











var DEBUG_MANIFESTS_URLS_TO_TRY = [
    'https://localhost:4321/temp/manifests.js',
    'http://localhost:4321/temp/manifests.js'
];
// tslint:disable:export-name
/**
 * Web part workbench.
 *
 * The application class here is exported as default so that the framework knows how to start the application
 */
var SpWebpartWorkbench = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SpWebpartWorkbench, _super);
    function SpWebpartWorkbench() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpWebpartWorkbench.prototype.onLoad = function () {
        var _this = this;
        this._pageStore = new _stores_PageStore__WEBPACK_IMPORTED_MODULE_9__["PageStore"](this.context.serviceScope);
        if (window.ENVIRONMENTTYPE !== 'Local') { // tslint:disable-line:no-any
            // Only attempt to load debug manifests if we're running on a SharePoint box
            var debugManifestsPromise = _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__["SPComponentLoader"]._loadDebugManifestsForWorkbench(DEBUG_MANIFESTS_URLS_TO_TRY[0]);
            var _loop_1 = function (i) {
                debugManifestsPromise.catch(function (error) {
                    // If one debug URL fails, try the next one
                    return _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_5__["SPComponentLoader"]._loadDebugManifestsForWorkbench(DEBUG_MANIFESTS_URLS_TO_TRY[i]);
                });
            };
            for (var i = 1; i < DEBUG_MANIFESTS_URLS_TO_TRY.length; i++) {
                _loop_1(i);
            }
            debugManifestsPromise.then(function () {
                console.debug(_spWebpartWorkbench_resx__WEBPACK_IMPORTED_MODULE_10__["default"].SuccessfullyLoadedText); // tslint:disable-line:no-console
                _this._pageStore.setPageReady();
            }).catch(function (error) {
                // If all debug URLs fail, display an error message
                var errorMessage = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__["Text"].format(_spWebpartWorkbench_resx__WEBPACK_IMPORTED_MODULE_10__["default"].ErrorLoadingText, error.toString());
                console.error(errorMessage); // tslint:disable-line:no-console
                _this._renderErrorDialog();
                _this._pageStore.setPageReady();
            });
        }
        else {
            // Otherwise they should already be loaded
            this._pageStore.setPageReady();
        }
        return Promise.resolve();
    };
    SpWebpartWorkbench.prototype.onRender = function () {
        var a11yManager = _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3__["A11yManager"].create(this.domElement);
        react_dom__WEBPACK_IMPORTED_MODULE_2__["render"](
        // The wrapping div exists because of an issue in SpPageChrome in sp-application-BaseApplication
        // Because the css rule for :global .SPPageChrome-app > div affects the top div of every application
        // VSO #380657 - Fix Fabric Styling for SpPageChrome
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_components_workbench_Workbench__WEBPACK_IMPORTED_MODULE_8__["WorkBench"], { pageStore: this._pageStore, a11yManagerId: a11yManager.id })), this.domElement);
    };
    SpWebpartWorkbench.prototype._renderErrorDialog = function () {
        if (!this._errorDialog) {
            var div = document.createElement('div');
            this._errorDialog = react_dom__WEBPACK_IMPORTED_MODULE_2__["render"](react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_components_error_ErrorDialog__WEBPACK_IMPORTED_MODULE_7__["default"], null), div);
            document.body.insertBefore(div, document.body.lastChild.nextSibling);
        }
        this._errorDialog.open();
    };
    return SpWebpartWorkbench;
}(_microsoft_sp_application_base__WEBPACK_IMPORTED_MODULE_4__["BaseApplication"]));
/* harmony default export */ __webpack_exports__["default"] = (SpWebpartWorkbench);


/***/ }),

/***/ "E3i5":
/*!**************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/spfx-core/sp-property-pane/lib/propertyPaneController/PropertyPaneController.module.scss.js ***!
  \**************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PropertyPaneController.module.css */ "8AXX");
var styles = {
    showPane: 'showPane_d3785813',
    showPaneNarrow: 'showPaneNarrow_d3785813',
    spPropertyPaneContainer: 'spPropertyPaneContainer_d3785813',
    shrinkContent: 'shrinkContent_d3785813'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "Empi":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Pivot/Pivot.base.js ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: PivotBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PivotBase", function() { return PivotBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Button */ "xk/t");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _FocusZone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../FocusZone */ "su0C");
/* harmony import */ var _FocusZone__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_FocusZone__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _PivotItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PivotItem */ "gx3r");
/* harmony import */ var _Pivot_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Pivot.types */ "hlWT");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Icon */ "UfSG");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_Icon__WEBPACK_IMPORTED_MODULE_7__);









var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
/**
 *  Usage:
 *
 *     <Pivot>
 *       <PivotItem headerText="Foo">
 *         <Label>Pivot #1</Label>
 *       </PivotItem>
 *       <PivotItem headerText="Bar">
 *         <Label>Pivot #2</Label>
 *       </PivotItem>
 *       <PivotItem headerText="Bas">
 *         <Label>Pivot #3</Label>
 *       </PivotItem>
 *     </Pivot>
 */
var PivotBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PivotBase, _super);
    function PivotBase(props) {
        var _this = _super.call(this, props) || this;
        _this._focusZone = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._renderPivotLink = function (linkCollection, link, selectedKey) {
            var itemKey = link.itemKey, headerButtonProps = link.headerButtonProps;
            var tabId = linkCollection.keyToTabIdMapping[itemKey];
            var onRenderItemLink = link.onRenderItemLink;
            var linkContent;
            var isSelected = selectedKey === itemKey;
            if (onRenderItemLink) {
                linkContent = onRenderItemLink(link, _this._renderLinkContent);
            }
            else {
                linkContent = _this._renderLinkContent(link);
            }
            var contentString = link.headerText || '';
            contentString += link.itemCount ? ' (' + link.itemCount + ')' : '';
            // Adding space supplementary for icon
            contentString += link.itemIcon ? ' xx' : '';
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Button__WEBPACK_IMPORTED_MODULE_3__["CommandButton"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, headerButtonProps, { id: tabId, key: itemKey, className: isSelected ? _this._classNames.linkIsSelected : _this._classNames.link, onClick: _this._onLinkClick.bind(_this, itemKey), onKeyPress: _this._onKeyPress.bind(_this, itemKey), ariaLabel: link.ariaLabel, role: "tab", "aria-selected": isSelected, name: link.headerText, keytipProps: link.keytipProps, "data-content": contentString }), linkContent));
        };
        _this._renderLinkContent = function (link) {
            var itemCount = link.itemCount, itemIcon = link.itemIcon, headerText = link.headerText;
            var classNames = _this._classNames;
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: classNames.linkContent },
                itemIcon !== undefined && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: classNames.icon },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Icon__WEBPACK_IMPORTED_MODULE_7__["Icon"], { iconName: itemIcon }))),
                headerText !== undefined && react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: classNames.text },
                    " ",
                    link.headerText),
                itemCount !== undefined && react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: classNames.count },
                    " (",
                    itemCount,
                    ")")));
        };
        _this._warnDeprecations({
            initialSelectedKey: 'defaultSelectedKey',
            initialSelectedIndex: 'defaultSelectedIndex'
        });
        _this._pivotId = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getId"])('Pivot');
        var links = _this._getPivotLinks(props).links;
        var _a = props.defaultSelectedKey, defaultSelectedKey = _a === void 0 ? props.initialSelectedKey : _a, _b = props.defaultSelectedIndex, defaultSelectedIndex = _b === void 0 ? props.initialSelectedIndex : _b;
        var selectedKey;
        if (defaultSelectedKey) {
            selectedKey = defaultSelectedKey;
        }
        else if (typeof defaultSelectedIndex === 'number') {
            selectedKey = links[defaultSelectedIndex].itemKey;
        }
        else if (links.length) {
            selectedKey = links[0].itemKey;
        }
        _this.state = {
            selectedKey: selectedKey
        };
        return _this;
    }
    /**
     * Sets focus to the first pivot tab.
     */
    PivotBase.prototype.focus = function () {
        if (this._focusZone.current) {
            this._focusZone.current.focus();
        }
    };
    PivotBase.prototype.render = function () {
        var linkCollection = this._getPivotLinks(this.props);
        var selectedKey = this._getSelectedKey(linkCollection);
        var divProps = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getNativeProps"])(this.props, _Utilities__WEBPACK_IMPORTED_MODULE_2__["divProperties"]);
        this._classNames = this._getClassNames(this.props);
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, divProps),
            this._renderPivotLinks(linkCollection, selectedKey),
            selectedKey && this._renderPivotItem(linkCollection, selectedKey)));
    };
    PivotBase.prototype._getSelectedKey = function (linkCollection) {
        var propsSelectedKey = this.props.selectedKey;
        if (this._isKeyValid(linkCollection, propsSelectedKey) || propsSelectedKey === null) {
            return propsSelectedKey;
        }
        var stateSelectedKey = this.state.selectedKey;
        if (this._isKeyValid(linkCollection, stateSelectedKey)) {
            return stateSelectedKey;
        }
        if (linkCollection.links.length) {
            return linkCollection.links[0].itemKey;
        }
        return undefined;
    };
    /**
     * Renders the set of links to route between pivots
     */
    PivotBase.prototype._renderPivotLinks = function (linkCollection, selectedKey) {
        var _this = this;
        var items = linkCollection.links.map(function (l) { return _this._renderPivotLink(linkCollection, l, selectedKey); });
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_FocusZone__WEBPACK_IMPORTED_MODULE_4__["FocusZone"], { componentRef: this._focusZone, direction: _FocusZone__WEBPACK_IMPORTED_MODULE_4__["FocusZoneDirection"].horizontal },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: this._classNames.root, role: "tablist" }, items)));
    };
    /**
     * Renders the current Pivot Item
     */
    PivotBase.prototype._renderPivotItem = function (linkCollection, itemKey) {
        if (this.props.headersOnly || !itemKey) {
            return null;
        }
        var index = linkCollection.keyToIndexMapping[itemKey];
        var selectedTabId = linkCollection.keyToTabIdMapping[itemKey];
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { role: "tabpanel", "aria-labelledby": selectedTabId, className: this._classNames.itemContainer }, react__WEBPACK_IMPORTED_MODULE_1__["Children"].toArray(this.props.children)[index]));
    };
    /**
     * Gets the set of PivotLinks as array of IPivotItemProps
     * The set of Links is determined by child components of type PivotItem
     */
    PivotBase.prototype._getPivotLinks = function (props) {
        var _this = this;
        var result = {
            links: [],
            keyToIndexMapping: {},
            keyToTabIdMapping: {}
        };
        react__WEBPACK_IMPORTED_MODULE_1__["Children"].map(react__WEBPACK_IMPORTED_MODULE_1__["Children"].toArray(props.children), function (child, index) {
            if (_isPivotItem(child)) {
                var pivotItem = child;
                var _a = pivotItem.props, linkText = _a.linkText, pivotItemProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_a, ["linkText"]);
                var itemKey = pivotItem.props.itemKey || index.toString();
                result.links.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ 
                    // Use linkText (deprecated) if headerText is not provided
                    headerText: linkText }, pivotItemProps, { itemKey: itemKey }));
                result.keyToIndexMapping[itemKey] = index;
                result.keyToTabIdMapping[itemKey] = _this._getTabId(itemKey, index);
            }
            else {
                Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["warn"])('The children of a Pivot component must be of type PivotItem to be rendered.');
            }
        });
        return result;
    };
    /**
     * Generates the Id for the tab button.
     */
    PivotBase.prototype._getTabId = function (itemKey, index) {
        if (this.props.getTabId) {
            return this.props.getTabId(itemKey, index);
        }
        return this._pivotId + ("-Tab" + index);
    };
    /**
     * whether the key exists in the pivot items.
     */
    PivotBase.prototype._isKeyValid = function (linkCollection, itemKey) {
        return itemKey !== undefined && itemKey !== null && linkCollection.keyToIndexMapping[itemKey] !== undefined;
    };
    /**
     * Handles the onClick event on PivotLinks
     */
    PivotBase.prototype._onLinkClick = function (itemKey, ev) {
        ev.preventDefault();
        this._updateSelectedItem(itemKey, ev);
    };
    /**
     * Handle the onKeyPress eventon the PivotLinks
     */
    PivotBase.prototype._onKeyPress = function (itemKey, ev) {
        if (ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].enter) {
            ev.preventDefault();
            this._updateSelectedItem(itemKey);
        }
    };
    /**
     * Updates the state with the new selected index
     */
    PivotBase.prototype._updateSelectedItem = function (itemKey, ev) {
        this.setState({
            selectedKey: itemKey
        });
        var linkCollection = this._getPivotLinks(this.props);
        if (this.props.onLinkClick && linkCollection.keyToIndexMapping[itemKey] >= 0) {
            var index = linkCollection.keyToIndexMapping[itemKey];
            // React.Element<any> cannot directly convert to PivotItem.
            var item = react__WEBPACK_IMPORTED_MODULE_1__["Children"].toArray(this.props.children)[index];
            if (_isPivotItem(item)) {
                this.props.onLinkClick(item, ev);
            }
        }
    };
    PivotBase.prototype._getClassNames = function (props) {
        var theme = props.theme;
        var rootIsLarge = props.linkSize === _Pivot_types__WEBPACK_IMPORTED_MODULE_6__["PivotLinkSize"].large;
        var rootIsTabs = props.linkFormat === _Pivot_types__WEBPACK_IMPORTED_MODULE_6__["PivotLinkFormat"].tabs;
        return getClassNames(props.styles, {
            theme: theme,
            rootIsLarge: rootIsLarge,
            rootIsTabs: rootIsTabs
        });
    };
    return PivotBase;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

function _isPivotItem(item) {
    // In theory, we should be able to just check item.type === PivotItem.
    // However, under certain unclear circumstances (see https://github.com/OfficeDev/office-ui-fabric-react/issues/10785),
    // the object identity is different despite the function implementation being the same.
    return (!!item &&
        typeof item === 'object' &&
        !!item.type &&
        item.type.name === _PivotItem__WEBPACK_IMPORTED_MODULE_5__["PivotItem"].name);
}
//# sourceMappingURL=Pivot.base.js.map

/***/ }),

/***/ "F+OE":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/DialogContent.types.js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: ResponsiveMode, DialogType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogType", function() { return DialogType; });
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/decorators/withResponsiveMode */ "jiHw");
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResponsiveMode", function() { return _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_0__["ResponsiveMode"]; });


 // Exported because the type is an optional prop and not exported otherwise.
/**
 * {@docCategory Dialog}
 */
var DialogType;
(function (DialogType) {
    /** Standard dialog */
    DialogType[DialogType["normal"] = 0] = "normal";
    /** Dialog with large header banner */
    DialogType[DialogType["largeHeader"] = 1] = "largeHeader";
    /** Dialog with an 'x' close button in the upper-right corner */
    DialogType[DialogType["close"] = 2] = "close";
})(DialogType || (DialogType = {}));
//# sourceMappingURL=DialogContent.types.js.map

/***/ }),

/***/ "F2A3":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/workbench.module.css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".SPPageChromeNoFlexbox-app{top:0!important;height:100%!important}", ""]);



/***/ }),

/***/ "FI3s":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/DialogContent.styles.js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var GlobalClassNames = {
    contentLgHeader: 'ms-Dialog-lgHeader',
    close: 'ms-Dialog--close',
    subText: 'ms-Dialog-subText',
    header: 'ms-Dialog-header',
    headerLg: 'ms-Dialog--lgHeader',
    button: 'ms-Dialog-button ms-Dialog-button--close',
    inner: 'ms-Dialog-inner',
    content: 'ms-Dialog-content',
    title: 'ms-Dialog-title'
};
var getStyles = function (props) {
    var _a, _b, _c;
    var className = props.className, theme = props.theme, isLargeHeader = props.isLargeHeader, isClose = props.isClose, hidden = props.hidden, isMultiline = props.isMultiline, draggableHeaderClassName = props.draggableHeaderClassName;
    var palette = theme.palette, fonts = theme.fonts, effects = theme.effects, semanticColors = theme.semanticColors;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        content: [
            isLargeHeader && [
                classNames.contentLgHeader,
                {
                    borderTop: "4px solid " + palette.themePrimary
                }
            ],
            isClose && classNames.close,
            {
                flexGrow: 1,
                overflowY: 'hidden' // required for allowScrollOnElement
            },
            className
        ],
        subText: [
            classNames.subText,
            fonts.medium,
            {
                margin: '0 0 24px 0',
                color: semanticColors.bodySubtext,
                lineHeight: '1.5',
                wordWrap: 'break-word',
                fontWeight: _Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].regular
            }
        ],
        header: [
            classNames.header,
            {
                position: 'relative',
                width: '100%',
                boxSizing: 'border-box'
            },
            isClose && classNames.close,
            draggableHeaderClassName && [
                draggableHeaderClassName,
                {
                    cursor: 'move'
                }
            ]
        ],
        button: [
            classNames.button,
            hidden && {
                selectors: {
                    '.ms-Icon.ms-Icon--Cancel': {
                        color: semanticColors.buttonText,
                        fontSize: _Styling__WEBPACK_IMPORTED_MODULE_0__["IconFontSizes"].medium
                    }
                }
            }
        ],
        inner: [
            classNames.inner,
            {
                padding: '0 24px 24px',
                selectors: (_a = {},
                    _a["@media (min-width: " + _Styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMinSmall"] + "px) and (max-width: " + _Styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMaxSmall"] + "px)"] = {
                        padding: '0 16px 16px'
                    },
                    _a)
            }
        ],
        innerContent: [
            classNames.content,
            {
                position: 'relative',
                width: '100%'
            }
        ],
        title: [
            classNames.title,
            fonts.xLarge,
            {
                color: semanticColors.bodyText,
                margin: '0',
                padding: '16px 46px 20px 24px',
                lineHeight: 'normal',
                selectors: (_b = {},
                    _b["@media (min-width: " + _Styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMinSmall"] + "px) and (max-width: " + _Styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMaxSmall"] + "px)"] = {
                        padding: '16px 46px 16px 16px'
                    },
                    _b)
            },
            isLargeHeader && {
                color: semanticColors.menuHeader
            },
            isMultiline && { fontSize: fonts.xxLarge.fontSize }
        ],
        topButton: [
            {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                position: 'absolute',
                top: '0',
                right: '0',
                padding: '15px 15px 0 0',
                selectors: (_c = {
                        '> *': {
                            flex: '0 0 auto'
                        },
                        '.ms-Dialog-button': {
                            color: semanticColors.buttonText
                        },
                        '.ms-Dialog-button:hover': {
                            color: semanticColors.buttonTextHovered,
                            borderRadius: effects.roundedCorner2
                        }
                    },
                    _c["@media (min-width: " + _Styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMinSmall"] + "px) and (max-width: " + _Styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMaxSmall"] + "px)"] = {
                        padding: '15px 8px 0 0'
                    },
                    _c)
            }
        ]
    };
};
//# sourceMappingURL=DialogContent.styles.js.map

/***/ }),

/***/ "G0Zq":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/version.js ***!
  \*********************************************************************************************************************************************************************************************************/
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

/***/ "GPet":
/*!*************************************************!*\
  !*** external "@microsoft/sp-application-base" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_GPet__;

/***/ }),

/***/ "GRb1":
/*!*********************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewRotate/MobilePreviewRotate.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _MobilePreviewRotate_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MobilePreviewRotate.module.scss */ "Kfc4");
/* harmony import */ var _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mobilePreview/MobilePreview */ "mEUM");





var MobilePreviewRotate = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MobilePreviewRotate, _super);
    function MobilePreviewRotate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MobilePreviewRotate.prototype.render = function () {
        var rotateIconClass = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["getIconClassName"])('Refresh'), _MobilePreviewRotate_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewRotateIcon);
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("a", { role: 'button', onClick: this._onClickRotate },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: rotateIconClass }))));
    };
    MobilePreviewRotate.prototype._onClickRotate = function () {
        var orientation = this.props.currentOrientation === _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__["DeviceOrientation"].Portrait
            ? _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__["DeviceOrientation"].Landscape
            : _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__["DeviceOrientation"].Portrait;
        this.props.onRotate(orientation);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], MobilePreviewRotate.prototype, "_onClickRotate", null);
    return MobilePreviewRotate;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (MobilePreviewRotate);


/***/ }),

/***/ "HhZF":
/*!*****************************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewDeviceView/MobilePreviewDeviceView.module.scss.js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./MobilePreviewDeviceView.module.css */ "qXzK");
var styles = {
    mobilePreviewDevice: 'mobilePreviewDevice_7d904bbf',
    mobilePreviewPortrait: 'mobilePreviewPortrait_7d904bbf',
    mobilePreviewLandscape: 'mobilePreviewLandscape_7d904bbf',
    mobilePreviewTablet: 'mobilePreviewTablet_7d904bbf',
    mobilePreviewIframe: 'mobilePreviewIframe_7d904bbf'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "I6O9":
/*!***************************************!*\
  !*** external "@microsoft/sp-loader" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_I6O9__;

/***/ }),

/***/ "IXlb":
/*!************************************************************************************!*\
  !*** ./lib/components/serializedCanvasView/serializedWebPart/SerializedWebPart.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-webpart-base */ "br4S");
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _encodingUtilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../encodingUtilities */ "5jyc");
/* harmony import */ var _SerializedWebPart_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SerializedWebPart.module.scss */ "gWJr");
/* harmony import */ var _SerializedCanvasView_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../SerializedCanvasView.module.scss */ "SJC/");







var SerializedWebPart = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SerializedWebPart, _super);
    function SerializedWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SerializedWebPart.prototype.render = function () {
        var serializedString = _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__["WebPartDataConverter"].convertWebPartDataToHtml(this.props.serializedWebPart);
        var escapedSerializedString = Object(_encodingUtilities__WEBPACK_IMPORTED_MODULE_4__["htmlEncode"])(serializedString);
        /**
         * Web Part XML schema for client side web parts in classic SharePoint pages
         */
        var webPartXmlLines = ['<webParts>',
            '  <webPart xmlns="http://schemas.microsoft.com/WebPart/v3">',
            '    <metaData>',
            '      <type name="Microsoft.SharePoint.WebPartPages.ClientSideWebPart,',
            '        Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" />',
            '      <importErrorMessage>Cannot Import WebPart</importErrorMessage>',
            '    </metaData>',
            '    <data>',
            '      <properties>',
            "        <property name=\"Title\" type=\"string\">" + this.props.serializedWebPart.title + "</property>",
            "        <property name=\"Description\" type=\"string\">" + this.props.serializedWebPart.description + "</property>",
            "        <property name=\"IconUrl\" type=\"string\">" + '' + "</property>",
            "        <property name=\"ClientSideWebPartId\">" + this.props.serializedWebPart.id + "</property>",
            "        <property name=\"ClientSideWebPartData\" type=\"string\">" + escapedSerializedString + "</property>",
            '      </properties>',
            '    </data>',
            '  </webPart>',
            '</webParts>'];
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("p", { key: this.props.serializedWebPart.instanceId, className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_SerializedWebPart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].serializedWebPartItem, _SerializedCanvasView_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].serializedTextArea) }, Object(_encodingUtilities__WEBPACK_IMPORTED_MODULE_4__["getReactLines"])(webPartXmlLines)));
    };
    return SerializedWebPart;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (SerializedWebPart);


/***/ }),

/***/ "IbqH":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/components/workbench/Workbench.module.css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".workbench_ecefc8ba{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;color:#323130;font-family:\"Segoe UI Web (West European)\",Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;font-size:14px;position:absolute;top:0;right:0;bottom:0;left:0;overflow-x:hidden}.workbench_ecefc8ba button,.workbench_ecefc8ba input,.workbench_ecefc8ba textarea{font-family:inherit}.header_ecefc8ba{background:#000;height:50px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.headerMenu_ecefc8ba{background-color:#0075c7;font-size:30px;height:50px;left:0;text-align:center;width:50px}.headerMenu_ecefc8ba,.headerTitle_ecefc8ba{color:#fff;line-height:50px;position:absolute;top:0}.headerTitle_ecefc8ba{font-size:21px;font-weight:100;left:66px}.headerTitle_ecefc8ba em{border-right:1px solid #666;font-style:normal;margin-right:12px;padding-right:20px}.headerPerson_ecefc8ba{background-color:#a6a6a6;border-left:5px solid #b6cfd8;color:#fff;font-size:48px;height:50px;line-height:50px;position:absolute;right:0;text-align:center;width:50px}.pageContent_ecefc8ba{border:1px solid #e5e5e5;border-bottom:0;bottom:0;margin:0 auto;max-width:924px;position:absolute;top:106px}[dir=ltr] .pageContent_ecefc8ba{transition:right 367ms cubic-bezier(.1,.9,.2,1);-webkit-transition:right 367ms cubic-bezier(.1,.9,.2,1)}[dir=rtl] .pageContent_ecefc8ba{transition:left 367ms cubic-bezier(.1,.9,.2,1);-webkit-transition:left 367ms cubic-bezier(.1,.9,.2,1)}[dir=ltr] .pageContent_ecefc8ba{left:16px}[dir=ltr] .pageContent_ecefc8ba,[dir=rtl] .pageContent_ecefc8ba{right:16px}[dir=rtl] .pageContent_ecefc8ba{left:16px}[dir=ltr] .commandBar_ecefc8ba{transition:padding-right 367ms cubic-bezier(.1,.9,.2,1);-webkit-transition:padding-right 367ms cubic-bezier(.1,.9,.2,1)}[dir=rtl] .commandBar_ecefc8ba{transition:padding-left 367ms cubic-bezier(.1,.9,.2,1);-webkit-transition:padding-left 367ms cubic-bezier(.1,.9,.2,1)}[dir=ltr] .commandBar_ecefc8ba{padding-right:0}[dir=rtl] .commandBar_ecefc8ba{padding-left:0}", ""]);



/***/ }),

/***/ "JeCB":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/components/mobilePreview/mobilePreviewHeaderBar/mobilePreviewURLEntry/MobilePreviewURLEntry.module.css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".mobilePreviewURLbar_c813d82f{height:100%;padding:5px;width:100%}.mobilePreviewTextfield_c813d82f{position:absolute;left:0;width:calc(100% - 135px)}.mobilePreviewURLbutton_c813d82f{position:absolute;right:0;margin:6px;background-color:#c8c8c8;border:1px solid #c8c8c8;border-radius:2px;top:4px}.mobilePreviewURLbutton_c813d82f:hover{background-color:#a6a6a6}.mobilePreviewURLbutton_c813d82f:active,.mobilePreviewURLbutton_c813d82f:focus{background-color:#c8c8c8;border:1px solid #a6a6a6}", ""]);



/***/ }),

/***/ "KL1q":
/*!***********************************************************!*\
  !*** external "@microsoft/office-ui-fabric-react-bundle" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_KL1q__;

/***/ }),

/***/ "Kfc4":
/*!*********************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewRotate/MobilePreviewRotate.module.scss.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./MobilePreviewRotate.module.css */ "LOn4");
var styles = {
    mobilePreviewRotateIcon: 'mobilePreviewRotateIcon_6f509719'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


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

/***/ "LHcL":
/*!********************************************************************************************!*\
  !*** ./lib/components/serializedCanvasView/serializedWebPart/SerializedWebPart.module.css ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./SerializedWebPart.module.css */ "dTHp");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "LOn4":
/*!*****************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewRotate/MobilePreviewRotate.module.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./MobilePreviewRotate.module.css */ "aC/U");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "M4Nb":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/components/mobilePreview/mobilePreviewClickStopBar/MobilePreviewClickStopBar.module.css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".clickStopNavBar_bff7f315{background-color:#f3f2f1;color:#323130;height:30px;border:solid #c8c6c4;border-width:1px 0 0;-webkit-box-sizing:content-box;box-sizing:content-box;font-size:14px;font-weight:400;margin:0;-webkit-box-shadow:none;box-shadow:none;padding:0 10px;width:100%;outline:1px solid transparent}.navBarItems_bff7f315{display:block;list-style:none;margin:0 7px 0 0;padding:0}.mobilePreviewDeviceTitle_bff7f315{width:200px;margin:auto;text-align:center;padding:4px;position:relative}", ""]);



/***/ }),

/***/ "MEDa":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/components/mobilePreview/mobilePreviewDimensionInput/MobilePreviewDimensionInput.module.css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".xField_cce73b93{left:15px}.yField_cce73b93{left:140px}.mobilePreviewTextfieldXY_cce73b93{margin:10px;position:absolute;top:15px;width:114px}.mobilePreviewTextfieldXY_cce73b93 .xyTextfields_cce73b93{color:#605e5c;min-width:20px;width:50px;right:0;height:28px;border:1px solid;font-size:12px;padding:6px 10px 8px;outline:0}.mobilePreviewTextfieldXY_cce73b93 .xyLabels_cce73b93,.mobilePreviewTextfieldXY_cce73b93 .xyTextfields_cce73b93{position:absolute;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;-webkit-box-shadow:none;box-shadow:none}.mobilePreviewTextfieldXY_cce73b93 .xyLabels_cce73b93{color:#c8c6c4;font-size:20px;left:0;padding:0;font-weight:400;display:block}", ""]);



/***/ }),

/***/ "MJgn":
/*!*********************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreview/MobilePreview.module.scss.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./MobilePreview.module.css */ "ihq1");
var styles = {
    mobilePreviewContainer: 'mobilePreviewContainer_303c30c9',
    mobilePreviewDeviceContainer: 'mobilePreviewDeviceContainer_303c30c9'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "Mstc":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Modal/Modal.base.js ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: ModalBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalBase", function() { return ModalBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _FocusTrapZone_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FocusTrapZone/index */ "WEvm");
/* harmony import */ var _FocusTrapZone_index__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_FocusTrapZone_index__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Modal_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Modal.styles */ "fcBF");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Overlay */ "2zVY");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Overlay__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Layer */ "88pY");
/* harmony import */ var _Popup_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Popup/index */ "YCiU");
/* harmony import */ var _Popup_index__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_Popup_index__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utilities/decorators/withResponsiveMode */ "jiHw");
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Callout_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Callout/index */ "UO3J");
/* harmony import */ var _Callout_index__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_Callout_index__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _Icon_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Icon/index */ "n8DK");
/* harmony import */ var _Icon_index__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_Icon_index__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _utilities_DraggableZone_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utilities/DraggableZone/index */ "4azF");












// @TODO - need to change this to a panel whenever the breakpoint is under medium (verify the spec)
var DefaultLayerProps = {
    eventBubblingEnabled: false
};
var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var ModalBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ModalBase, _super);
    function ModalBase(props) {
        var _this = _super.call(this, props) || this;
        _this._focusTrapZone = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        // Allow the user to scroll within the modal but not on the body
        _this._allowScrollOnModal = function (elt) {
            if (elt) {
                Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["allowScrollOnElement"])(elt, _this._events);
            }
            else {
                _this._events.off(_this._scrollableContent);
            }
            _this._scrollableContent = elt;
        };
        _this._onModalContextMenuClose = function () {
            _this.setState({ isModalMenuOpen: false });
        };
        _this._onModalClose = function () {
            _this._lastSetX = 0;
            _this._lastSetY = 0;
            _this.setState({
                isModalMenuOpen: false,
                isInKeyboardMoveMode: false,
                isOpen: false,
                x: 0,
                y: 0
            });
            if (_this.props.dragOptions) {
                _this._events.off(window, 'keyup', _this._onKeyUp, true /* useCapture */);
            }
            // Call the onDismiss callback
            if (_this.props.onDismissed) {
                _this.props.onDismissed();
            }
        };
        _this._onDragStart = function () {
            _this.setState({ isModalMenuOpen: false, isInKeyboardMoveMode: false });
        };
        _this._onDrag = function (_, ui) {
            var _a = _this.state, x = _a.x, y = _a.y;
            _this.setState({ x: x + ui.delta.x, y: y + ui.delta.y });
        };
        _this._onDragStop = function () {
            _this.focus();
        };
        _this._onKeyUp = function (event) {
            // Need to handle the CTRL + ALT + SPACE key during keyup due to FireFox bug:
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1220143
            // Otherwise it would continue to fire a click even if the event was cancelled
            // during mouseDown.
            if (event.altKey && event.ctrlKey && event.keyCode === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].space) {
                // Since this is a global handler, we should make sure the target is within the dialog
                // before opening the dropdown
                if (Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["elementContains"])(_this._scrollableContent, event.target)) {
                    _this.setState({ isModalMenuOpen: !_this.state.isModalMenuOpen });
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        };
        // We need a global onKeyDown event when we are in the move mode so that we can
        // handle the key presses and the components inside the modal do not get the events
        _this._onKeyDown = function (event) {
            if (event.altKey && event.ctrlKey && event.keyCode === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].space) {
                // CTRL + ALT + SPACE is handled during keyUp
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            if (_this.state.isModalMenuOpen && (event.altKey || event.keyCode === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].escape)) {
                _this.setState({ isModalMenuOpen: false });
            }
            if (_this.state.isInKeyboardMoveMode && (event.keyCode === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].escape || event.keyCode === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].enter)) {
                _this.setState({ isInKeyboardMoveMode: false });
                event.preventDefault();
                event.stopPropagation();
            }
            if (_this.state.isInKeyboardMoveMode) {
                var handledEvent = true;
                var delta = _this._getMoveDelta(event);
                switch (event.keyCode) {
                    case _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].escape:
                        _this.setState({ x: _this._lastSetX, y: _this._lastSetY });
                    case _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].enter: {
                        _this._lastSetX = 0;
                        _this._lastSetY = 0;
                        _this.setState({ isInKeyboardMoveMode: false });
                        break;
                    }
                    case _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].up: {
                        _this.setState({
                            y: _this.state.y - delta
                        });
                        break;
                    }
                    case _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].down: {
                        _this.setState({
                            y: _this.state.y + delta
                        });
                        break;
                    }
                    case _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].left: {
                        _this.setState({
                            x: _this.state.x - delta
                        });
                        break;
                    }
                    case _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].right: {
                        _this.setState({
                            x: _this.state.x + delta
                        });
                        break;
                    }
                    default: {
                        handledEvent = false;
                    }
                }
                if (handledEvent) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        };
        _this._onEnterKeyboardMoveMode = function () {
            _this._lastSetX = _this.state.x;
            _this._lastSetY = _this.state.y;
            _this.setState({ isInKeyboardMoveMode: true, isModalMenuOpen: false });
            _this._events.on(window, 'keydown', _this._onKeyDown, true /* useCapture */);
        };
        _this._onExitKeyboardMoveMode = function () {
            _this._lastSetX = 0;
            _this._lastSetY = 0;
            _this.setState({ isInKeyboardMoveMode: false });
            _this._events.off(window, 'keydown', _this._onKeyDown, true /* useCapture */);
        };
        _this.state = {
            id: Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getId"])('Modal'),
            isOpen: props.isOpen,
            isVisible: props.isOpen,
            hasBeenOpened: props.isOpen,
            x: 0,
            y: 0
        };
        _this._lastSetX = 0;
        _this._lastSetY = 0;
        _this._warnDeprecations({
            onLayerDidMount: 'layerProps.onLayerDidMount'
        });
        return _this;
    }
    // tslint:disable-next-line function-name
    ModalBase.prototype.UNSAFE_componentWillReceiveProps = function (newProps) {
        clearTimeout(this._onModalCloseTimer);
        // Opening the dialog
        if (newProps.isOpen) {
            if (!this.state.isOpen) {
                // First Open
                this.setState({
                    isOpen: true
                });
                // Add a keyUp handler for all key up events when the dialog is open
                if (newProps.dragOptions) {
                    this._events.on(window, 'keyup', this._onKeyUp, true /* useCapture */);
                }
            }
            else {
                // Modal has been opened
                // Reopen during closing
                this.setState({
                    hasBeenOpened: true,
                    isVisible: true
                });
                if (newProps.topOffsetFixed) {
                    var dialogMain = document.getElementsByClassName('ms-Dialog-main');
                    var modalRectangle = void 0;
                    if (dialogMain.length > 0) {
                        modalRectangle = dialogMain[0].getBoundingClientRect();
                        this.setState({
                            modalRectangleTop: modalRectangle.top
                        });
                    }
                }
            }
        }
        // Closing the dialog
        if (!newProps.isOpen && this.state.isOpen) {
            this._onModalCloseTimer = this._async.setTimeout(this._onModalClose, parseFloat(_Modal_styles__WEBPACK_IMPORTED_MODULE_4__["animationDuration"]) * 1000);
            this.setState({
                isVisible: false
            });
        }
    };
    ModalBase.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (!prevProps.isOpen && !prevState.isVisible) {
            this.setState({
                isVisible: true
            });
        }
    };
    ModalBase.prototype.render = function () {
        var _a = this.props, className = _a.className, containerClassName = _a.containerClassName, scrollableContentClassName = _a.scrollableContentClassName, elementToFocusOnDismiss = _a.elementToFocusOnDismiss, firstFocusableSelector = _a.firstFocusableSelector, forceFocusInsideTrap = _a.forceFocusInsideTrap, ignoreExternalFocusing = _a.ignoreExternalFocusing, isBlocking = _a.isBlocking, isClickableOutsideFocusTrap = _a.isClickableOutsideFocusTrap, isDarkOverlay = _a.isDarkOverlay, onDismiss = _a.onDismiss, layerProps = _a.layerProps, overlay = _a.overlay, responsiveMode = _a.responsiveMode, titleAriaId = _a.titleAriaId, styles = _a.styles, subtitleAriaId = _a.subtitleAriaId, theme = _a.theme, topOffsetFixed = _a.topOffsetFixed, onLayerDidMount = _a.onLayerDidMount, isModeless = _a.isModeless, dragOptions = _a.dragOptions;
        var _b = this.state, isOpen = _b.isOpen, isVisible = _b.isVisible, hasBeenOpened = _b.hasBeenOpened, modalRectangleTop = _b.modalRectangleTop, x = _b.x, y = _b.y, isInKeyboardMoveMode = _b.isInKeyboardMoveMode;
        if (!isOpen) {
            return null;
        }
        var layerClassName = layerProps === undefined ? '' : layerProps.className;
        var classNames = getClassNames(styles, {
            theme: theme,
            className: className,
            containerClassName: containerClassName,
            scrollableContentClassName: scrollableContentClassName,
            isOpen: isOpen,
            isVisible: isVisible,
            hasBeenOpened: hasBeenOpened,
            modalRectangleTop: modalRectangleTop,
            topOffsetFixed: topOffsetFixed,
            isModeless: isModeless,
            layerClassName: layerClassName,
            isDefaultDragHandle: dragOptions && !dragOptions.dragHandleSelector
        });
        var mergedLayerProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, DefaultLayerProps, this.props.layerProps, { onLayerDidMount: layerProps && layerProps.onLayerDidMount ? layerProps.onLayerDidMount : onLayerDidMount, insertFirst: isModeless, className: classNames.layer });
        var modalContent = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_FocusTrapZone_index__WEBPACK_IMPORTED_MODULE_3__["FocusTrapZone"], { componentRef: this._focusTrapZone, className: classNames.main, elementToFocusOnDismiss: elementToFocusOnDismiss, isClickableOutsideFocusTrap: isModeless || isClickableOutsideFocusTrap || !isBlocking, ignoreExternalFocusing: ignoreExternalFocusing, forceFocusInsideTrap: isModeless ? !isModeless : forceFocusInsideTrap, firstFocusableSelector: firstFocusableSelector, focusPreviouslyFocusedInnerElement: true, onBlur: isInKeyboardMoveMode ? this._onExitKeyboardMoveMode : undefined },
            dragOptions && isInKeyboardMoveMode && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.keyboardMoveIconContainer }, dragOptions.keyboardMoveIconProps ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Icon_index__WEBPACK_IMPORTED_MODULE_10__["Icon"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, dragOptions.keyboardMoveIconProps))) : (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Icon_index__WEBPACK_IMPORTED_MODULE_10__["Icon"], { iconName: "move", className: classNames.keyboardMoveIcon })))),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { ref: this._allowScrollOnModal, className: classNames.scrollableContent, "data-is-scrollable": true },
                dragOptions && this.state.isModalMenuOpen && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](dragOptions.menu, { items: [
                        { key: 'move', text: dragOptions.moveMenuItemText, onClick: this._onEnterKeyboardMoveMode },
                        { key: 'close', text: dragOptions.closeMenuItemText, onClick: this._onModalClose }
                    ], onDismiss: this._onModalContextMenuClose, alignTargetEdge: true, coverTarget: true, directionalHint: _Callout_index__WEBPACK_IMPORTED_MODULE_9__["DirectionalHint"].topLeftEdge, directionalHintFixed: true, shouldFocusOnMount: true, target: this._scrollableContent })),
                this.props.children)));
        // @temp tuatology - Will adjust this to be a panel at certain breakpoints
        if (responsiveMode >= _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_8__["ResponsiveMode"].small) {
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Layer__WEBPACK_IMPORTED_MODULE_6__["Layer"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, mergedLayerProps),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Popup_index__WEBPACK_IMPORTED_MODULE_7__["Popup"], { role: isModeless || !isBlocking ? 'dialog' : 'alertdialog', "aria-modal": !isModeless, ariaLabelledBy: titleAriaId, ariaDescribedBy: subtitleAriaId, onDismiss: onDismiss },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.root },
                        !isModeless && react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Overlay__WEBPACK_IMPORTED_MODULE_5__["Overlay"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ isDarkThemed: isDarkOverlay, onClick: isBlocking ? undefined : onDismiss }, overlay)),
                        dragOptions ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_utilities_DraggableZone_index__WEBPACK_IMPORTED_MODULE_11__["DraggableZone"], { handleSelector: dragOptions.dragHandleSelector || "." + classNames.main.split(' ')[0], preventDragSelector: "button", onStart: this._onDragStart, onDragChange: this._onDrag, onStop: this._onDragStop, position: { x: x, y: y } }, modalContent)) : (modalContent)))));
        }
        return null;
    };
    ModalBase.prototype.focus = function () {
        if (this._focusTrapZone.current) {
            this._focusTrapZone.current.focus();
        }
    };
    ModalBase.prototype._getMoveDelta = function (event) {
        var delta = 10;
        if (event.shiftKey) {
            if (!event.ctrlKey) {
                delta = 50;
            }
        }
        else if (event.ctrlKey) {
            delta = 1;
        }
        return delta;
    };
    ModalBase.defaultProps = {
        isOpen: false,
        isDarkOverlay: true,
        isBlocking: false,
        className: '',
        containerClassName: ''
    };
    ModalBase = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_8__["withResponsiveMode"]
    ], ModalBase);
    return ModalBase;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=Modal.base.js.map

/***/ }),

/***/ "Nio4":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/DialogContent.js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! exports provided: DialogContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogContent", function() { return DialogContent; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DialogContent_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DialogContent.base */ "CNvk");
/* harmony import */ var _DialogContent_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DialogContent.styles */ "FI3s");



var DialogContent = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_DialogContent_base__WEBPACK_IMPORTED_MODULE_1__["DialogContentBase"], _DialogContent_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, { scope: 'DialogContent' });
//# sourceMappingURL=DialogContent.js.map

/***/ }),

/***/ "O/9W":
/*!*********************************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewClickStopBar/MobilePreviewClickStopBar.module.scss.js ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./MobilePreviewClickStopBar.module.css */ "wkab");
var styles = {
    clickStopNavBar: 'clickStopNavBar_bff7f315',
    navBarItems: 'navBarItems_bff7f315',
    mobilePreviewDeviceTitle: 'mobilePreviewDeviceTitle_bff7f315'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "O48R":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/components/serializedCanvasView/SerializedCanvasView.module.css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".container_83d6c9d1{min-width:90vw!important}.content_83d6c9d1{height:70vh}.pivotItem_83d6c9d1{overflow-y:scroll;height:66vh}.learnMoreLink_83d6c9d1{position:absolute;margin-top:20px!important;z-index:1}.serializedTextArea_83d6c9d1{font-family:monospace}", ""]);



/***/ }),

/***/ "OfIR":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/Dialog.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: Dialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dialog", function() { return Dialog; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Dialog_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dialog.base */ "15YF");
/* harmony import */ var _Dialog_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dialog.styles */ "01ek");



var Dialog = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Dialog_base__WEBPACK_IMPORTED_MODULE_1__["DialogBase"], _Dialog_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, { scope: 'Dialog' });
//# sourceMappingURL=Dialog.js.map

/***/ }),

/***/ "Q+bF":
/*!************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/fbjs/0.8.17/node_modules/fbjs/lib/warning.js ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(/*! ./emptyFunction */ "xvdx");

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (true) {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),

/***/ "Q1Zz":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Pivot/Pivot.styles.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_1__);


var globalClassNames = {
    count: 'ms-Pivot-count',
    icon: 'ms-Pivot-icon',
    linkIsSelected: 'is-selected',
    link: 'ms-Pivot-link',
    linkContent: 'ms-Pivot-linkContent',
    root: 'ms-Pivot',
    rootIsLarge: 'ms-Pivot--large',
    rootIsTabs: 'ms-Pivot--tabs',
    text: 'ms-Pivot-text'
};
var linkStyles = function (props) {
    var _a, _b;
    var rootIsLarge = props.rootIsLarge, rootIsTabs = props.rootIsTabs;
    var _c = props.theme, semanticColors = _c.semanticColors, fonts = _c.fonts;
    return [
        fonts.medium,
        {
            color: semanticColors.actionLink,
            display: 'inline-block',
            lineHeight: 44,
            height: 44,
            marginRight: 8,
            padding: '0 8px',
            textAlign: 'center',
            position: 'relative',
            backgroundColor: 'transparent',
            border: 0,
            borderRadius: 0,
            selectors: (_a = {
                    ':before': {
                        backgroundColor: 'transparent',
                        bottom: 0,
                        content: '""',
                        height: 2,
                        left: 8,
                        position: 'absolute',
                        right: 8,
                        transition: "left " + _Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].durationValue2 + " " + _Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].easeFunction2 + ",\n                      right " + _Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].durationValue2 + " " + _Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].easeFunction2
                    },
                    ':after': {
                        color: 'transparent',
                        content: 'attr(data-content)',
                        display: 'block',
                        fontWeight: _Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].bold,
                        height: 1,
                        overflow: 'hidden',
                        visibility: 'hidden'
                    },
                    ':hover': {
                        backgroundColor: semanticColors.buttonBackgroundHovered,
                        color: semanticColors.buttonTextHovered,
                        cursor: 'pointer'
                    },
                    ':active': {
                        backgroundColor: semanticColors.buttonBackgroundPressed,
                        color: semanticColors.buttonTextHovered
                    },
                    ':focus': {
                        outline: 'none'
                    }
                },
                _a["." + _Utilities__WEBPACK_IMPORTED_MODULE_1__["IsFocusVisibleClassName"] + " &:focus"] = {
                    outline: "1px solid " + semanticColors.focusBorder
                },
                _a["." + _Utilities__WEBPACK_IMPORTED_MODULE_1__["IsFocusVisibleClassName"] + " &:focus:after"] = {
                    content: 'attr(data-content)',
                    position: 'relative',
                    border: 0
                },
                _a)
        },
        rootIsLarge && {
            fontSize: fonts.large.fontSize
        },
        rootIsTabs && [
            {
                marginRight: 0,
                height: 44,
                lineHeight: 44,
                backgroundColor: semanticColors.buttonBackground,
                padding: '0 10px',
                verticalAlign: 'top',
                selectors: (_b = {
                        ':focus': {
                            outlineOffset: '-1px'
                        }
                    },
                    _b["." + _Utilities__WEBPACK_IMPORTED_MODULE_1__["IsFocusVisibleClassName"] + " &:focus::before"] = {
                        height: 'auto',
                        background: 'transparent',
                        transition: 'none'
                    },
                    _b)
            }
        ]
    ];
};
var getStyles = function (props) {
    var _a, _b, _c;
    var className = props.className, rootIsLarge = props.rootIsLarge, rootIsTabs = props.rootIsTabs, theme = props.theme;
    var semanticColors = theme.semanticColors, fonts = theme.fonts;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(globalClassNames, theme);
    return {
        root: [
            classNames.root,
            fonts.medium,
            _Styling__WEBPACK_IMPORTED_MODULE_0__["normalize"],
            {
                position: 'relative',
                color: semanticColors.link,
                whiteSpace: 'nowrap'
            },
            rootIsLarge && classNames.rootIsLarge,
            rootIsTabs && classNames.rootIsTabs,
            className
        ],
        link: [
            classNames.link
        ].concat(linkStyles(props), [
            rootIsTabs && {
                selectors: {
                    '&:hover, &:focus': {
                        color: semanticColors.buttonTextCheckedHovered
                    },
                    '&:active, &:hover': {
                        color: semanticColors.primaryButtonText,
                        backgroundColor: semanticColors.primaryButtonBackground
                    }
                }
            }
        ]),
        linkIsSelected: [
            classNames.link,
            classNames.linkIsSelected
        ].concat(linkStyles(props), [
            {
                fontWeight: _Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].semibold,
                selectors: (_a = {
                        ':before': {
                            backgroundColor: semanticColors.inputBackgroundChecked,
                            selectors: (_b = {},
                                _b[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                                    backgroundColor: 'Highlight'
                                },
                                _b)
                        },
                        ':hover::before': {
                            left: 0,
                            right: 0
                        }
                    },
                    _a[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                        color: 'Highlight'
                    },
                    _a)
            },
            rootIsTabs && {
                backgroundColor: semanticColors.primaryButtonBackground,
                color: semanticColors.primaryButtonText,
                fontWeight: _Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].regular,
                selectors: (_c = {
                        ':before': {
                            backgroundColor: 'transparent',
                            transition: 'none',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            content: '""',
                            height: 'auto'
                        },
                        ':hover': {
                            backgroundColor: semanticColors.primaryButtonBackgroundHovered,
                            color: semanticColors.primaryButtonText
                        },
                        '&:active': {
                            backgroundColor: semanticColors.primaryButtonBackgroundPressed,
                            color: semanticColors.primaryButtonText
                        }
                    },
                    _c[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                        fontWeight: _Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].semibold,
                        color: 'HighlightText',
                        background: 'Highlight',
                        MsHighContrastAdjust: 'none'
                    },
                    _c)
            }
        ]),
        linkContent: [
            classNames.linkContent,
            {
                flex: '0 1 100%',
                selectors: {
                    '& > * ': {
                        marginLeft: 4
                    },
                    '& > *:first-child': {
                        marginLeft: 0
                    }
                }
            }
        ],
        text: [
            classNames.text,
            {
                display: 'inline-block',
                verticalAlign: 'top'
            }
        ],
        count: [
            classNames.count,
            {
                display: 'inline-block',
                verticalAlign: 'top'
            }
        ],
        icon: classNames.icon
    };
};
//# sourceMappingURL=Pivot.styles.js.map

/***/ }),

/***/ "R3cu":
/*!******************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/prop-types/15.6.0/node_modules/prop-types/index.js ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "2Jnp")(isValidElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "SJC/":
/*!*********************************************************************************!*\
  !*** ./lib/components/serializedCanvasView/SerializedCanvasView.module.scss.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./SerializedCanvasView.module.css */ "1dCo");
var styles = {
    container: 'container_83d6c9d1',
    content: 'content_83d6c9d1',
    pivotItem: 'pivotItem_83d6c9d1',
    learnMoreLink: 'learnMoreLink_83d6c9d1',
    serializedTextArea: 'serializedTextArea_83d6c9d1'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "T/ax":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/DialogFooter.js ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: DialogFooter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogFooter", function() { return DialogFooter; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DialogFooter_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DialogFooter.base */ "ugPr");
/* harmony import */ var _DialogFooter_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DialogFooter.styles */ "8S/1");



var DialogFooter = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_DialogFooter_base__WEBPACK_IMPORTED_MODULE_1__["DialogFooterBase"], _DialogFooter_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, { scope: 'DialogFooter' });
//# sourceMappingURL=DialogFooter.js.map

/***/ }),

/***/ "TUfI":
/*!*************************************************!*\
  !*** ./lib/components/canvasHost/CanvasHost.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_sp_canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/sp-canvas */ "1+jj");
/* harmony import */ var _ms_sp_canvas__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_canvas__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_sp_property_pane_lib_propertyPaneController_PropertyPaneController_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-property-pane/lib/propertyPaneController/PropertyPaneController.module.scss */ "E3i5");
/* harmony import */ var _CanvasHost_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CanvasHost.module.scss */ "7wuK");
/* harmony import */ var _CanvasHost_resx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CanvasHost.resx */ "eJuQ");





/* tslint:disable-next-line:max-line-length */



var CanvasHost = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CanvasHost, _super);
    function CanvasHost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CanvasHost.prototype.componentDidMount = function () {
        var _this = this;
        var variantsModuleLoader = function () { return __webpack_require__.e(/*! import() | uifabric-variants */ "vendors~uifabric-variants").then(__webpack_require__.bind(null, /*! @uifabric/variants/lib/variants */ "AUlf")); };
        var canvasOptions = {
            variantsModuleLoader: variantsModuleLoader,
            serviceScope: this.props.store.serviceScope,
            mode: this._getDisplayMode(),
            pageLayoutType: 'workbench'
        };
        this._canvasPromise = _ms_sp_canvas__WEBPACK_IMPORTED_MODULE_2__["Canvas"].instantiateCanvas(this._canvasElement, canvasOptions).then(function (canvas) {
            _this._canvas = canvas;
            _this._afterCanvasInitialized();
        });
    };
    CanvasHost.prototype.componentDidUpdate = function (props) {
        var _this = this;
        var mode = this._getDisplayMode();
        if (this._canvas) {
            this._canvasPromise.then(function () { return _this._canvas.setDisplayMode(mode); }).catch(function (error) { return console.error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Text"].format(_CanvasHost_resx__WEBPACK_IMPORTED_MODULE_7__["default"].CanvasInitializationError, error)); });
        }
    };
    CanvasHost.prototype.render = function () {
        var _this = this;
        var _a;
        var rootClass = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])(_CanvasHost_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].canvasHost, (_a = {},
            _a[_CanvasHost_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].hasHeader] = this.props.hasOfficeHeader,
            _a[_CanvasHost_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].hasCommandBar] = this.props.hasCommandBar,
            _a));
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: rootClass },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _CanvasHost_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].belowHeader },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _CanvasHost_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].content },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { ref: function (canvasElement) { return _this._canvasElement = canvasElement; } })))));
    };
    CanvasHost.prototype._getDisplayMode = function () {
        return this.props.isEditing ? _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Edit : _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Read;
    };
    CanvasHost.prototype._clearPage = function () {
        this._canvas.render(this._getDisplayMode()).catch(function (error) { return console.error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Text"].format(_CanvasHost_resx__WEBPACK_IMPORTED_MODULE_7__["default"].UnknownError, error)); });
        // Removing the property pane with slide effect, when discard is clicked.
        var propertyPaneContainer = document.getElementById('propertyPaneContainer');
        if (propertyPaneContainer) {
            propertyPaneContainer.classList.remove(_microsoft_sp_property_pane_lib_propertyPaneController_PropertyPaneController_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].showPane);
            // This is to see the slide effect of the property pane and then empty the container.
            window.setTimeout(function () {
                while (propertyPaneContainer.firstChild) {
                    propertyPaneContainer.removeChild(propertyPaneContainer.firstChild);
                }
            }, 1000);
        }
    };
    CanvasHost.prototype._afterCanvasInitialized = function () {
        var _this = this;
        // Don't render webparts until the page is ready
        this.props.store.getPageReadyPromise().then(function () {
            var render = function () {
                _this.props.store.setClearCallback(_this._clearPage);
                _this.props.store.setSerializeCallback(_this._canvas.serializeAsJson);
                return _this._canvas.renderDeprecated(_this._getDisplayMode(), _this.props.store.getPageState());
            };
            // Fetch webparts before rendering to avoid a race condition.
            return _this._canvas.fetchWebparts(true)
                .then(render)
                .catch(function (error) {
                console.error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Text"].format(_CanvasHost_resx__WEBPACK_IMPORTED_MODULE_7__["default"].FetchFailedError, error));
                return render();
            });
        }).catch(function (error) { return console.error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Text"].format(_CanvasHost_resx__WEBPACK_IMPORTED_MODULE_7__["default"].UnknownError, error)); });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["autobind"]
    ], CanvasHost.prototype, "_clearPage", null);
    return CanvasHost;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (CanvasHost);


/***/ }),

/***/ "TqY/":
/*!********************************************************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewHeaderBar/mobilePreviewDeviceTypeSelector/MobilePreviewDeviceTypeSelector.js ***!
  \********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _MobilePreviewDeviceTypeSelector_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MobilePreviewDeviceTypeSelector.module.scss */ "799H");
/* harmony import */ var _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mobilePreview/MobilePreview */ "mEUM");





var MobilePreviewDeviceTypeSelector = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MobilePreviewDeviceTypeSelector, _super);
    function MobilePreviewDeviceTypeSelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MobilePreviewDeviceTypeSelector.prototype.render = function () {
        var _this = this;
        var spanClassNameMobile = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["getIconClassName"])('CellPhone'), _MobilePreviewDeviceTypeSelector_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewDeviceIcon);
        var spanClassNameTablet = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["getIconClassName"])('Tablet'), _MobilePreviewDeviceTypeSelector_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewDeviceIcon);
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _MobilePreviewDeviceTypeSelector_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].navBarItemRight },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("a", { tabIndex: 0, role: 'button', onClick: function () { return _this.props.onChangeDeviceType(_mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__["DeviceType"].Phone); } },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: spanClassNameMobile }))),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _MobilePreviewDeviceTypeSelector_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].navBarItemRight },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("a", { tabIndex: 0, role: 'button', onClick: function () { return _this.props.onChangeDeviceType(_mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__["DeviceType"].Tablet); } },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: spanClassNameTablet })))));
    };
    return MobilePreviewDeviceTypeSelector;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (MobilePreviewDeviceTypeSelector);


/***/ }),

/***/ "U7Cf":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Pivot/Pivot.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: Pivot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pivot", function() { return Pivot; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Pivot_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pivot.base */ "Empi");
/* harmony import */ var _Pivot_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pivot.styles */ "Q1Zz");



/**
 * The Pivot control and related tabs pattern are used for navigating frequently accessed,
 * distinct content categories. Pivots allow for navigation between two or more content
 * views and relies on text headers to articulate the different sections of content.
 */
var Pivot = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Pivot_base__WEBPACK_IMPORTED_MODULE_1__["PivotBase"], _Pivot_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'Pivot'
});
//# sourceMappingURL=Pivot.js.map

/***/ }),

/***/ "UJDV":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Utilities.js ***!
  \***********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Utilities.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "UMKU":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/components/mobilePreview/mobilePreview/MobilePreview.module.css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".mobilePreviewContainer_303c30c9{-webkit-box-sizing:border-box;position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.87);z-index:2147483647;box-sizing:border-box;padding:0;font-family:Segoe UI Semilight WestEuropean,Segoe UI Semilight,Segoe UI,Tahoma,Arial,sans-serif}.mobilePreviewContainer_303c30c9:after,.mobilePreviewContainer_303c30c9:before{display:table;content:\"\";line-height:0}.mobilePreviewContainer_303c30c9:after{clear:both}.mobilePreviewDeviceContainer_303c30c9{position:relative;height:calc(100% - 71px);-webkit-box-align:center;-ms-flex-align:center;align-items:center;overflow:auto;display:-webkit-box;display:-ms-flexbox;display:flex}", ""]);



/***/ }),

/***/ "UO3J":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Callout/index.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/components/Callout/index.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "UfSG":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Icon.js ***!
  \******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Icon.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = pkg.workaround_Icon;

/***/ }),

/***/ "VCun":
/*!***************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewHeaderBar/MobilePreviewHeaderBar.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _MobilePreviewHeaderBar_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MobilePreviewHeaderBar.module.scss */ "0HQZ");
/* harmony import */ var _mobilePreviewURLEntry_MobilePreviewURLEntry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mobilePreviewURLEntry/MobilePreviewURLEntry */ "mwW1");
/* harmony import */ var _mobilePreviewDeviceTypeSelector_MobilePreviewDeviceTypeSelector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mobilePreviewDeviceTypeSelector/MobilePreviewDeviceTypeSelector */ "TqY/");






var MobilePreviewHeaderBar = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MobilePreviewHeaderBar, _super);
    function MobilePreviewHeaderBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MobilePreviewHeaderBar.prototype.render = function () {
        var mobilePreviewURLEntry = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mobilePreviewURLEntry_MobilePreviewURLEntry__WEBPACK_IMPORTED_MODULE_4__["default"], { onChangeURL: this.props.onChangeURL, onClickURLSubmit: this.props.onClickURLSubmit });
        var mobilePreviewDeviceTypeSelector = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mobilePreviewDeviceTypeSelector_MobilePreviewDeviceTypeSelector__WEBPACK_IMPORTED_MODULE_5__["default"], { onChangeDeviceType: this.props.onChangeDeviceType });
        var navBarItemMdClass = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])('ms-hiddenMdDown', _MobilePreviewHeaderBar_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].navBarItemMd);
        var navBarItemRightClass = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_MobilePreviewHeaderBar_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].navBarItem, _MobilePreviewHeaderBar_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].navBarItemRight);
        var xClass = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["getIconClassName"])('Cancel'), _MobilePreviewHeaderBar_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewXIcon);
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _MobilePreviewHeaderBar_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewNavBar },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _MobilePreviewHeaderBar_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].navBarItems },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _MobilePreviewHeaderBar_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].navBarItemSm },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: _MobilePreviewHeaderBar_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewTitle }, "Mobile Preview")),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: navBarItemMdClass }, mobilePreviewURLEntry),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _MobilePreviewHeaderBar_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].col },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: navBarItemRightClass },
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("a", { role: 'button', onClick: this.props.onExit },
                            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: xClass }))),
                    mobilePreviewDeviceTypeSelector))));
    };
    return MobilePreviewHeaderBar;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (MobilePreviewHeaderBar);


/***/ }),

/***/ "WEvm":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/FocusTrapZone/index.js ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/components/FocusTrapZone/index.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "Wey0":
/*!************************************************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewHeaderBar/mobilePreviewURLEntry/MobilePreviewURLEntry.module.scss.js ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./MobilePreviewURLEntry.module.css */ "e+nV");
var styles = {
    mobilePreviewURLbar: 'mobilePreviewURLbar_c813d82f',
    mobilePreviewTextfield: 'mobilePreviewTextfield_c813d82f',
    mobilePreviewURLbutton: 'mobilePreviewURLbutton_c813d82f'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "Wh1g":
/*!*********************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewClickStopBar/MobilePreviewClickStopBar.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mobilePreviewClickStop_MobilePreviewClickStop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../mobilePreviewClickStop/MobilePreviewClickStop */ "dAx5");
/* harmony import */ var _MobilePreviewClickStopBar_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MobilePreviewClickStopBar.module.scss */ "O/9W");
/* harmony import */ var _MobilePreview_resx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../MobilePreview.resx */ "mpgQ");






var MobilePreviewClickStopBar = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MobilePreviewClickStopBar, _super);
    function MobilePreviewClickStopBar(props) {
        return _super.call(this, props) || this;
    }
    MobilePreviewClickStopBar.prototype.render = function () {
        var props = this.props;
        var deviceDiv = [];
        var _loop_1 = function (device) {
            var selected = false;
            if (device === props.currentDevice) {
                selected = true;
            }
            deviceDiv.push(react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mobilePreviewClickStop_MobilePreviewClickStop__WEBPACK_IMPORTED_MODULE_3__["default"], { key: device.name, device: device, onClick: function () { return props.onSelectClickStop(device); }, selected: selected, orientation: props.currentOrientation, deviceType: this_1.props.deviceType }));
        };
        var this_1 = this;
        for (var _i = 0, _a = props.devices; _i < _a.length; _i++) {
            var device = _a[_i];
            _loop_1(device);
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _MobilePreviewClickStopBar_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].clickStopNavBar, "data-sp-a11y-alertonfocusin": _MobilePreview_resx__WEBPACK_IMPORTED_MODULE_5__["default"].ScreenReaderDevicePickerEntered },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["FocusZone"], { direction: _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["FocusZoneDirection"].horizontal },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("ul", { className: _MobilePreviewClickStopBar_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].navBarItems },
                    deviceDiv,
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { id: 'clickStopBarLabel', className: _MobilePreviewClickStopBar_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].mobilePreviewDeviceTitle }, props.currentDevice.name)))));
    };
    return MobilePreviewClickStopBar;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (MobilePreviewClickStopBar);


/***/ }),

/***/ "YCiU":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Popup/index.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/components/Popup/index.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = pkg.workaround_PopupIndex;

/***/ }),

/***/ "aC/U":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/components/mobilePreview/mobilePreviewRotate/MobilePreviewRotate.module.css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".mobilePreviewRotateIcon_6f509719{color:#edebe9;position:absolute;right:30px;top:15px;font-size:50px;margin:5px;cursor:pointer;font-weight:100}", ""]);



/***/ }),

/***/ "br4S":
/*!*********************************************!*\
  !*** external "@microsoft/sp-webpart-base" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_br4S__;

/***/ }),

/***/ "cDcd":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_cDcd__;

/***/ }),

/***/ "dAx5":
/*!***************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewClickStop/MobilePreviewClickStop.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "R3cu");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mobilePreview/MobilePreview */ "mEUM");
/* harmony import */ var _MobilePreviewClickStop_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MobilePreviewClickStop.module.scss */ "oK8S");
/* harmony import */ var _MobilePreview_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../MobilePreview.resx */ "mpgQ");







var MobilePreviewClickStop = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MobilePreviewClickStop, _super);
    function MobilePreviewClickStop(props) {
        return _super.call(this, props) || this;
    }
    MobilePreviewClickStop.prototype.render = function () {
        var _this = this;
        var _a;
        var effectiveWidth = this.props.device.width;
        if (this.props.deviceType === _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__["DeviceType"].Phone) {
            if (this.props.orientation === _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__["DeviceOrientation"].Landscape) {
                effectiveWidth = this.props.device.height;
            }
        }
        else if (this.props.deviceType === _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__["DeviceType"].Tablet) {
            if (this.props.orientation === _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__["DeviceOrientation"].Portrait) {
                effectiveWidth = this.props.device.height;
            }
        }
        var leftCalc = "calc(50% - " + effectiveWidth / 2 + "px)";
        var divStyle = {
            width: effectiveWidth,
            left: leftCalc
        };
        var className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["css"])(_MobilePreviewClickStop_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].navBarItem, _MobilePreviewClickStop_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].clickStop, (_a = {},
            _a[_MobilePreviewClickStop_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].clickStopSelected] = this.props.selected,
            _a));
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("li", { className: className, role: 'button', "aria-label": this.props.device.name, tabIndex: 0, onClick: this._handleClick, onKeyDown: this._handleKeyDown, style: divStyle, onFocus: this._handleFocus, ref: function (c) { return _this._mainDiv = c; } }));
    };
    MobilePreviewClickStop.prototype._handleFocus = function () {
        // If the focus is set to the button and the button is not selected, read that Enter key can be used to select
        if (document.activeElement === this._mainDiv && !this.props.selected) {
            this.context.a11yManager.alert(_MobilePreview_resx__WEBPACK_IMPORTED_MODULE_6__["default"].ScreenReaderDevicePickerSelectionChanged);
        }
    };
    MobilePreviewClickStop.prototype._handleClick = function () {
        this.props.onClick(this.props.device);
    };
    MobilePreviewClickStop.prototype._handleKeyDown = function (evt) {
        // Call click handler on Enter
        if (evt.keyCode === 13) {
            this._handleClick();
        }
    };
    MobilePreviewClickStop.contextTypes = {
        a11yManager: prop_types__WEBPACK_IMPORTED_MODULE_2__["object"]
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], MobilePreviewClickStop.prototype, "_handleFocus", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], MobilePreviewClickStop.prototype, "_handleClick", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], MobilePreviewClickStop.prototype, "_handleKeyDown", null);
    return MobilePreviewClickStop;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (MobilePreviewClickStop);


/***/ }),

/***/ "dTHp":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/components/serializedCanvasView/serializedWebPart/SerializedWebPart.module.css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".serializedWebPartItem_0c56850c{margin:20px 0}", ""]);



/***/ }),

/***/ "dh7u":
/*!**************************************************************************!*\
  !*** ./lib/components/serializedCanvasView/SerializedCanvasView.resx.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_8EVKOH1av6NjR/ZNfdafrw';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "e+nV":
/*!********************************************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewHeaderBar/mobilePreviewURLEntry/MobilePreviewURLEntry.module.css ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./MobilePreviewURLEntry.module.css */ "JeCB");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "eJuQ":
/*!******************************************************!*\
  !*** ./lib/components/canvasHost/CanvasHost.resx.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_vd/LT/qfiQhbHFfeM1GtlA';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "eNti":
/*!**************************************************!*\
  !*** ./lib/components/error/ErrorDialog.resx.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_FQya7ZjwIyrOEutOa+omIA';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "faye":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_faye__;

/***/ }),

/***/ "fcBF":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Modal/Modal.styles.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: animationDuration, getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animationDuration", function() { return animationDuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var animationDuration = _Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].durationValue2;
var globalClassNames = {
    root: 'ms-Modal',
    main: 'ms-Dialog-main',
    scrollableContent: 'ms-Modal-scrollableContent',
    isOpen: 'is-open',
    layer: 'ms-Modal-Layer'
};
var getStyles = function (props) {
    var _a;
    var className = props.className, containerClassName = props.containerClassName, scrollableContentClassName = props.scrollableContentClassName, isOpen = props.isOpen, isVisible = props.isVisible, hasBeenOpened = props.hasBeenOpened, modalRectangleTop = props.modalRectangleTop, theme = props.theme, topOffsetFixed = props.topOffsetFixed, isModeless = props.isModeless, layerClassName = props.layerClassName, isDefaultDragHandle = props.isDefaultDragHandle;
    var palette = theme.palette, effects = theme.effects, fonts = theme.fonts;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(globalClassNames, theme);
    return {
        root: [
            classNames.root,
            fonts.medium,
            {
                backgroundColor: 'transparent',
                position: isModeless ? 'absolute' : 'fixed',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                pointerEvents: 'none',
                transition: "opacity " + animationDuration
            },
            topOffsetFixed &&
                hasBeenOpened && {
                alignItems: 'flex-start'
            },
            isOpen && classNames.isOpen,
            isVisible && {
                opacity: 1,
                pointerEvents: 'auto'
            },
            className
        ],
        main: [
            classNames.main,
            {
                boxShadow: effects.elevation64,
                borderRadius: effects.roundedCorner2,
                backgroundColor: palette.white,
                boxSizing: 'border-box',
                position: 'relative',
                textAlign: 'left',
                outline: '3px solid transparent',
                maxHeight: '100%',
                overflowY: 'auto',
                zIndex: isModeless ? _Styling__WEBPACK_IMPORTED_MODULE_0__["ZIndexes"].Layer : undefined
            },
            topOffsetFixed &&
                hasBeenOpened && {
                top: modalRectangleTop
            },
            isDefaultDragHandle && {
                cursor: 'move'
            },
            containerClassName
        ],
        scrollableContent: [
            classNames.scrollableContent,
            {
                overflowY: 'auto',
                flexGrow: 1,
                maxHeight: '100vh',
                selectors: (_a = {},
                    _a['@supports (-webkit-overflow-scrolling: touch)'] = {
                        maxHeight: window.innerHeight
                    },
                    _a)
            },
            scrollableContentClassName
        ],
        layer: isModeless && [
            layerClassName,
            classNames.layer,
            {
                position: 'static',
                width: 'unset',
                height: 'unset'
            }
        ],
        keyboardMoveIconContainer: {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            padding: '3px 0px'
        },
        keyboardMoveIcon: {
            fontSize: fonts.xLargePlus.fontSize,
            width: '24px'
        }
    };
};
//# sourceMappingURL=Modal.styles.js.map

/***/ }),

/***/ "g3Fb":
/*!**************************************!*\
  !*** ./lib/workbench.module.scss.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./workbench.module.css */ "3Qht");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "gWJr":
/*!************************************************************************************************!*\
  !*** ./lib/components/serializedCanvasView/serializedWebPart/SerializedWebPart.module.scss.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./SerializedWebPart.module.css */ "LHcL");
var styles = {
    serializedWebPartItem: 'serializedWebPartItem_0c56850c'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "glKC":
/*!****************************************************!*\
  !*** ./lib/components/workbench/Workbench.resx.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_IusqdbcSoVYQiit3+QRSxw';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "glo3":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/index.js ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: Dialog, DialogBase, DialogContent, DialogContentBase, DialogFooter, DialogFooterBase, ResponsiveMode, DialogType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "OfIR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Dialog", function() { return _Dialog__WEBPACK_IMPORTED_MODULE_0__["Dialog"]; });

/* harmony import */ var _Dialog_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dialog.base */ "15YF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogBase", function() { return _Dialog_base__WEBPACK_IMPORTED_MODULE_1__["DialogBase"]; });

/* harmony import */ var _DialogContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DialogContent */ "Nio4");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogContent", function() { return _DialogContent__WEBPACK_IMPORTED_MODULE_2__["DialogContent"]; });

/* harmony import */ var _DialogContent_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DialogContent.base */ "CNvk");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogContentBase", function() { return _DialogContent_base__WEBPACK_IMPORTED_MODULE_3__["DialogContentBase"]; });

/* harmony import */ var _DialogFooter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DialogFooter */ "T/ax");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogFooter", function() { return _DialogFooter__WEBPACK_IMPORTED_MODULE_4__["DialogFooter"]; });

/* harmony import */ var _DialogFooter_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DialogFooter.base */ "ugPr");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogFooterBase", function() { return _DialogFooter_base__WEBPACK_IMPORTED_MODULE_5__["DialogFooterBase"]; });

/* harmony import */ var _DialogContent_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DialogContent.types */ "F+OE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResponsiveMode", function() { return _DialogContent_types__WEBPACK_IMPORTED_MODULE_6__["ResponsiveMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogType", function() { return _DialogContent_types__WEBPACK_IMPORTED_MODULE_6__["DialogType"]; });








//# sourceMappingURL=index.js.map

/***/ }),

/***/ "gx3r":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Pivot/PivotItem.js ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: PivotItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PivotItem", function() { return PivotItem; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);



var PivotItem = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PivotItem, _super);
    function PivotItem(props) {
        var _this = _super.call(this, props) || this;
        _this._warnDeprecations({
            linkText: 'headerText'
        });
        return _this;
    }
    PivotItem.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getNativeProps"])(this.props, _Utilities__WEBPACK_IMPORTED_MODULE_2__["divProperties"])), this.props.children);
    };
    return PivotItem;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=PivotItem.js.map

/***/ }),

/***/ "h3Ql":
/*!*********************************************************************!*\
  !*** ./lib/components/serializedCanvasView/SerializedCanvasView.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Dialog */ "glo3");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_sp_canvas__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/sp-canvas */ "1+jj");
/* harmony import */ var _ms_sp_canvas__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_canvas__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var office_ui_fabric_react_lib_components_Pivot_Pivot__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Pivot/Pivot */ "U7Cf");
/* harmony import */ var office_ui_fabric_react_lib_components_Pivot_PivotItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Pivot/PivotItem */ "gx3r");
/* harmony import */ var _serializedWebPart_SerializedWebPart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./serializedWebPart/SerializedWebPart */ "IXlb");
/* harmony import */ var _encodingUtilities__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./encodingUtilities */ "5jyc");
/* harmony import */ var _SerializedCanvasView_resx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SerializedCanvasView.resx */ "dh7u");
/* harmony import */ var _SerializedCanvasView_module_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SerializedCanvasView.module.scss */ "SJC/");











var SerializedCanvasView = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SerializedCanvasView, _super);
    function SerializedCanvasView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SerializedCanvasView.prototype.render = function () {
        var webpartDataCollection = (this.props.getSerializedData)
            ? JSON.parse(decodeURI(this.props.getSerializedData(true) || '[]'))
                .filter(function (controlData) { return controlData.controlType === _ms_sp_canvas__WEBPACK_IMPORTED_MODULE_4__["CanvasControlType"].WebPartZone; })
                .map(function (controlData) { return controlData.webPartData; })
            : [];
        var serializedData = (this.props.getSerializedData) ? this.props.getSerializedData(false) : '';
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_2__["Dialog"], { hidden: !this.props.isVisible, onDismiss: this.props.closeCallback, dialogContentProps: {
                type: office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_2__["DialogType"].normal,
                title: _SerializedCanvasView_resx__WEBPACK_IMPORTED_MODULE_9__["default"].WebPartData,
                className: _SerializedCanvasView_module_scss__WEBPACK_IMPORTED_MODULE_10__["default"].content
            }, modalProps: {
                isBlocking: false,
                className: _SerializedCanvasView_module_scss__WEBPACK_IMPORTED_MODULE_10__["default"].container
            } },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null,
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_components_Pivot_Pivot__WEBPACK_IMPORTED_MODULE_5__["Pivot"], null,
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_components_Pivot_PivotItem__WEBPACK_IMPORTED_MODULE_6__["PivotItem"], { linkText: _SerializedCanvasView_resx__WEBPACK_IMPORTED_MODULE_9__["default"].ModernPages },
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _SerializedCanvasView_module_scss__WEBPACK_IMPORTED_MODULE_10__["default"].pivotItem },
                            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("p", { className: _SerializedCanvasView_module_scss__WEBPACK_IMPORTED_MODULE_10__["default"].serializedTextArea }, Object(_encodingUtilities__WEBPACK_IMPORTED_MODULE_8__["getReactLines"])(serializedData)))),
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_components_Pivot_PivotItem__WEBPACK_IMPORTED_MODULE_6__["PivotItem"], { linkText: _SerializedCanvasView_resx__WEBPACK_IMPORTED_MODULE_9__["default"].ClassicPages },
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _SerializedCanvasView_module_scss__WEBPACK_IMPORTED_MODULE_10__["default"].pivotItem }, webpartDataCollection.map(function (webpartData) {
                            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_serializedWebPart_SerializedWebPart__WEBPACK_IMPORTED_MODULE_7__["default"], { key: webpartData.instanceId, serializedWebPart: webpartData });
                        })))),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["Link"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ className: _SerializedCanvasView_module_scss__WEBPACK_IMPORTED_MODULE_10__["default"].learnMoreLink }, {
                    href: 'https://dev.office.com/sharepoint/docs/' +
                        'spfx/web-parts/get-started/provision-sp-assets-from-package',
                    target: '_blank'
                } /* VSO:391730 Remove this workaround */), _SerializedCanvasView_resx__WEBPACK_IMPORTED_MODULE_9__["default"].WebPartDataHelpInfoLink)),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_2__["DialogFooter"], null,
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["Button"], { onClick: this.props.closeCallback }, _SerializedCanvasView_resx__WEBPACK_IMPORTED_MODULE_9__["default"].Close))));
    };
    return SerializedCanvasView;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (SerializedCanvasView);


/***/ }),

/***/ "h7Vj":
/*!*********************************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewDimensionInput/MobilePreviewDimensionInput.module.css ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./MobilePreviewDimensionInput.module.css */ "MEDa");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "hlWT":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Pivot/Pivot.types.js ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: PivotLinkFormat, PivotLinkSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PivotLinkFormat", function() { return PivotLinkFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PivotLinkSize", function() { return PivotLinkSize; });
/**
 * {@docCategory Pivot}
 */
var PivotLinkFormat;
(function (PivotLinkFormat) {
    /**
     * Display Pivot Links as links
     */
    PivotLinkFormat[PivotLinkFormat["links"] = 0] = "links";
    /**
     * Display Pivot Links as Tabs
     */
    PivotLinkFormat[PivotLinkFormat["tabs"] = 1] = "tabs";
})(PivotLinkFormat || (PivotLinkFormat = {}));
/**
 * {@docCategory Pivot}
 */
var PivotLinkSize;
(function (PivotLinkSize) {
    /**
     * Display Link using normal font size
     */
    PivotLinkSize[PivotLinkSize["normal"] = 0] = "normal";
    /**
     * Display links using large font size
     */
    PivotLinkSize[PivotLinkSize["large"] = 1] = "large";
})(PivotLinkSize || (PivotLinkSize = {}));
//# sourceMappingURL=Pivot.types.js.map

/***/ }),

/***/ "iVx4":
/*!*********************************************************!*\
  !*** ./lib/components/canvasHost/CanvasHost.module.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./CanvasHost.module.css */ "47A5");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "ihq1":
/*!*****************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreview/MobilePreview.module.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./MobilePreview.module.css */ "UMKU");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

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

/***/ "jCMC":
/*!*********************************!*\
  !*** ./lib/stores/PageStore.js ***!
  \*********************************/
/*! exports provided: PageStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageStore", function() { return PageStore; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);


var PageStore = /** @class */ (function () {
    function PageStore(serviceScope) {
        var _this = this;
        this._PAGE_DATA_KEY = 'sp_webpart_workbench_state';
        this._pageReadyPromise = new Promise(function (resolve) {
            _this._resolvePageReady = resolve;
        });
        this._serviceScope = serviceScope;
        window.setInterval(this.savePageState, 3 * 1000);
    }
    Object.defineProperty(PageStore.prototype, "serviceScope", {
        get: function () {
            return this._serviceScope;
        },
        enumerable: true,
        configurable: true
    });
    PageStore.prototype.getSerializeCallback = function () {
        return this._serializePage;
    };
    PageStore.prototype.setSerializeCallback = function (callback) {
        this._serializePage = callback;
        /* tslint:disable:no-string-literal */
        if (window['SP']) {
            window['SP'].logSerializedPageState = callback;
            /* tslint:enable:no-string-literal */
        }
    };
    PageStore.prototype.setClearCallback = function (callback) {
        this._clearPage = callback;
    };
    PageStore.prototype.savePageState = function () {
        if (this._serializePage) {
            sessionStorage.setItem(this._PAGE_DATA_KEY, this._serializePage());
        }
    };
    PageStore.prototype.clearPageState = function () {
        sessionStorage.removeItem(this._PAGE_DATA_KEY);
        if (this._clearPage) {
            this._clearPage();
        }
    };
    PageStore.prototype.getPageState = function () {
        return sessionStorage.getItem(this._PAGE_DATA_KEY);
    };
    PageStore.prototype.getPageReadyPromise = function () {
        return this._pageReadyPromise;
    };
    PageStore.prototype.setPageReady = function () {
        this._resolvePageReady();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], PageStore.prototype, "getSerializeCallback", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], PageStore.prototype, "setSerializeCallback", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], PageStore.prototype, "setClearCallback", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], PageStore.prototype, "savePageState", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], PageStore.prototype, "clearPageState", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], PageStore.prototype, "getPageState", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], PageStore.prototype, "getPageReadyPromise", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], PageStore.prototype, "setPageReady", null);
    return PageStore;
}());



/***/ }),

/***/ "jN8F":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Fabric.js ***!
  \********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Fabric.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "jOlS":
/*!************************************************!*\
  !*** external "@microsoft/load-themed-styles" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_jOlS__;

/***/ }),

/***/ "jiHw":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode.js ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/utilities/decorators/withResponsiveMode.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = pkg.workaround_withResponsiveMode;

/***/ }),

/***/ "l73h":
/*!*************************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewDimensionInput/MobilePreviewDimensionInput.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _MobilePreviewDimensionInput_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MobilePreviewDimensionInput.module.scss */ "+THm");
/* harmony import */ var _MobilePreview_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../MobilePreview.resx */ "mpgQ");





var MobilePreviewDimensionInput = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MobilePreviewDimensionInput, _super);
    function MobilePreviewDimensionInput(props) {
        return _super.call(this, props) || this;
    }
    MobilePreviewDimensionInput.prototype.render = function () {
        var xContainerClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_MobilePreviewDimensionInput_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewTextfieldXY, _MobilePreviewDimensionInput_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].xField);
        var yContainerClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_MobilePreviewDimensionInput_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewTextfieldXY, _MobilePreviewDimensionInput_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].yField);
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: xContainerClassName },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("label", { className: _MobilePreviewDimensionInput_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].xyLabels }, _MobilePreview_resx__WEBPACK_IMPORTED_MODULE_4__["default"].Width + ":"),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("input", { "aria-label": _MobilePreview_resx__WEBPACK_IMPORTED_MODULE_4__["default"].Width, className: _MobilePreviewDimensionInput_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].xyTextfields, onChange: this.props.onChangedX, value: this.props.currentDevice.width.toString() })),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: yContainerClassName },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("label", { className: _MobilePreviewDimensionInput_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].xyLabels }, _MobilePreview_resx__WEBPACK_IMPORTED_MODULE_4__["default"].Height + ":"),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("input", { "aria-label": _MobilePreview_resx__WEBPACK_IMPORTED_MODULE_4__["default"].Height, className: _MobilePreviewDimensionInput_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].xyTextfields, onChange: this.props.onChangedY, value: this.props.currentDevice.height.toString() }))));
    };
    return MobilePreviewDimensionInput;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (MobilePreviewDimensionInput);


/***/ }),

/***/ "m5yc":
/*!*****************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewDeviceView/MobilePreviewDeviceView.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _MobilePreviewDeviceView_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MobilePreviewDeviceView.module.scss */ "HhZF");
/* harmony import */ var _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mobilePreview/MobilePreview */ "mEUM");





var MobilePreviewDeviceView = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MobilePreviewDeviceView, _super);
    function MobilePreviewDeviceView(props) {
        return _super.call(this, props) || this;
    }
    MobilePreviewDeviceView.prototype.render = function () {
        var formStyle = {
            width: this.props.currentDevice.width,
            height: this.props.currentDevice.height
        };
        var mobilePreviewClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_MobilePreviewDeviceView_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewDevice, this.props.deviceType === _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__["DeviceType"].Tablet ? _MobilePreviewDeviceView_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewTablet :
            this.props.currentOrientation === _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__["DeviceOrientation"].Portrait ? _MobilePreviewDeviceView_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewPortrait :
                _MobilePreviewDeviceView_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewLandscape);
        if (this.props.deviceType === _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__["DeviceType"].Phone) {
            if (this.props.currentOrientation === _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__["DeviceOrientation"].Landscape) {
                formStyle.width = this.props.currentDevice.height;
                formStyle.height = this.props.currentDevice.width;
            }
        }
        if (this.props.deviceType === _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__["DeviceType"].Tablet) {
            if (this.props.currentOrientation === _mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_4__["DeviceOrientation"].Portrait) {
                formStyle.width = this.props.currentDevice.height;
                formStyle.height = this.props.currentDevice.width;
            }
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: mobilePreviewClassName, style: formStyle },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("iframe", { className: _MobilePreviewDeviceView_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewIframe, src: this.props.url })));
    };
    return MobilePreviewDeviceView;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (MobilePreviewDeviceView);


/***/ }),

/***/ "mEUM":
/*!*********************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreview/MobilePreview.js ***!
  \*********************************************************************/
/*! exports provided: DeviceType, DeviceOrientation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceType", function() { return DeviceType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceOrientation", function() { return DeviceOrientation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _MobilePreviewDevices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MobilePreviewDevices */ "1JM4");
/* harmony import */ var _mobilePreviewClickStopBar_MobilePreviewClickStopBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mobilePreviewClickStopBar/MobilePreviewClickStopBar */ "Wh1g");
/* harmony import */ var _mobilePreviewHeaderBar_MobilePreviewHeaderBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../mobilePreviewHeaderBar/MobilePreviewHeaderBar */ "VCun");
/* harmony import */ var _mobilePreviewDeviceView_MobilePreviewDeviceView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../mobilePreviewDeviceView/MobilePreviewDeviceView */ "m5yc");
/* harmony import */ var _mobilePreviewDimensionInput_MobilePreviewDimensionInput__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../mobilePreviewDimensionInput/MobilePreviewDimensionInput */ "l73h");
/* harmony import */ var _mobilePreviewRotate_MobilePreviewRotate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../mobilePreviewRotate/MobilePreviewRotate */ "GRb1");
/* harmony import */ var _MobilePreview_module_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MobilePreview.module.scss */ "MJgn");
/* harmony import */ var _MobilePreview_resx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../MobilePreview.resx */ "mpgQ");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file MobilePreview
 * Shows a view of the user's page in a mobile device-sized iframe.
 * The frame size is configurable through click stops set to the size of popular device
 * forms, X and Y dimension input boxes, and options to rotate the device and switch
 * between mobile, tablet and desktop sizes. There is also an option to view an alternate
 * URL of the user's input in the frame.
 */











var DeviceType;
(function (DeviceType) {
    DeviceType[DeviceType["Phone"] = 0] = "Phone";
    DeviceType[DeviceType["Tablet"] = 1] = "Tablet";
})(DeviceType || (DeviceType = {}));
var DeviceOrientation;
(function (DeviceOrientation) {
    DeviceOrientation[DeviceOrientation["Portrait"] = 0] = "Portrait";
    DeviceOrientation[DeviceOrientation["Landscape"] = 1] = "Landscape";
})(DeviceOrientation || (DeviceOrientation = {}));
var MobilePreview = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MobilePreview, _super);
    function MobilePreview(props) {
        var _this = _super.call(this, props) || this;
        // Store string from url textfield outside of state so we don't change the iframe URL until the user clicks submit
        _this.inProgressURL = '';
        if (!_this.props.devices) {
            _this.devices = _MobilePreviewDevices__WEBPACK_IMPORTED_MODULE_3__["mobilePreviewDevices"];
        }
        else {
            _this.devices = _this.props.devices;
        }
        var deviceType = _this.props.deviceType || DeviceType.Phone;
        /**
         * Pick a default device for now, which will be changed later
         * A current device is needed before sorting can happen
        */
        _this.defaultPhone = _this.devices.phones[_this.devices.phones.length - 1];
        _this.defaultTablet = _this.devices.tablets[_this.devices.tablets.length - 1];
        _this.state = {
            currentOrientation: deviceType === DeviceType.Phone ?
                DeviceOrientation.Portrait : DeviceOrientation.Landscape,
            currentDevice: deviceType === DeviceType.Phone ? _this.defaultPhone : _this.defaultTablet,
            deviceType: deviceType,
            url: window.location.href + '?Mode=Read'
        };
        _this._sortDevices();
        return _this;
    }
    MobilePreview.prototype.render = function () {
        var _this = this;
        this._sortDevices();
        var mobilePreviewClickStopBar = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mobilePreviewClickStopBar_MobilePreviewClickStopBar__WEBPACK_IMPORTED_MODULE_4__["default"], { currentDevice: this.state.currentDevice, currentOrientation: this.state.currentOrientation, devices: this.state.deviceType === DeviceType.Phone ? this.devices.phones : this.devices.tablets, deviceType: this.state.deviceType, onSelectClickStop: this._onClickstopChangeForm });
        var mobilePreviewHeaderBar = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mobilePreviewHeaderBar_MobilePreviewHeaderBar__WEBPACK_IMPORTED_MODULE_5__["default"], { onChangeURL: this._onChangedURLField, onExit: this.props.onExit, onClickURLSubmit: this._onClickURL, onChangeDeviceType: this._onClickChangeDeviceType });
        var mobilePreviewDeviceView = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mobilePreviewDeviceView_MobilePreviewDeviceView__WEBPACK_IMPORTED_MODULE_6__["default"], { currentDevice: this.state.currentDevice, currentOrientation: this.state.currentOrientation, deviceType: this.state.deviceType, url: this.state.url });
        var mobilePreviewDimensionInput = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mobilePreviewDimensionInput_MobilePreviewDimensionInput__WEBPACK_IMPORTED_MODULE_7__["default"], { currentDevice: this.state.currentDevice, onChangedX: this._onChangedX, onChangedY: this._onChangedY });
        var mobilePreviewRotate = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mobilePreviewRotate_MobilePreviewRotate__WEBPACK_IMPORTED_MODULE_8__["default"], { onRotate: this._onClickRotate, currentOrientation: this.state.currentOrientation });
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["FocusTrapZone"], null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { "data-sp-a11y-zone": '1', "data-sp-a11y-alertonfocusin": _MobilePreview_resx__WEBPACK_IMPORTED_MODULE_10__["default"].ScreenReaderMobilePreviewEntered, className: _MobilePreview_module_scss__WEBPACK_IMPORTED_MODULE_9__["default"].mobilePreviewContainer, ref: function (c) { return _this._mainDiv = c; } },
                mobilePreviewHeaderBar,
                mobilePreviewClickStopBar,
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _MobilePreview_module_scss__WEBPACK_IMPORTED_MODULE_9__["default"].mobilePreviewDeviceContainer },
                    mobilePreviewDimensionInput,
                    mobilePreviewRotate,
                    mobilePreviewDeviceView))));
    };
    MobilePreview.prototype.componentDidMount = function () {
        if (this._mainDiv) {
            this._mainDiv.addEventListener('keydown', this._handleKeyDown, true);
        }
    };
    MobilePreview.prototype._onClickstopChangeForm = function (device) {
        this.setState({
            currentDevice: device,
            currentOrientation: this.state.currentOrientation,
            deviceType: this.state.deviceType,
            url: this.state.url
        });
    };
    MobilePreview.prototype._onClickRotate = function (orientation) {
        this.setState({
            currentDevice: this.state.currentDevice,
            currentOrientation: orientation,
            deviceType: this.state.deviceType,
            url: this.state.url
        });
    };
    MobilePreview.prototype._onClickChangeDeviceType = function (type) {
        this.setState({
            currentDevice: type === DeviceType.Phone ? this.defaultPhone : this.defaultTablet,
            currentOrientation: type === DeviceType.Phone ? DeviceOrientation.Portrait : DeviceOrientation.Landscape,
            deviceType: type,
            url: this.state.url
        });
    };
    MobilePreview.prototype._onChangedX = function (event) {
        var heightTarget = event.target;
        var customDevice = {
            name: 'Custom Device',
            width: +heightTarget.value,
            height: this.state.currentDevice.height
        };
        this.setState({
            currentDevice: customDevice,
            currentOrientation: this.state.currentOrientation,
            deviceType: this.state.deviceType,
            url: this.state.url
        });
    };
    MobilePreview.prototype._onChangedY = function (event) {
        var heightTarget = event.target;
        var customDevice = {
            name: 'Custom Device',
            height: +heightTarget.value,
            width: this.state.currentDevice.width
        };
        this.setState({
            currentDevice: customDevice,
            currentOrientation: this.state.currentOrientation,
            deviceType: this.state.deviceType,
            url: this.state.url
        });
    };
    MobilePreview.prototype._onChangedURLField = function (value) {
        this.inProgressURL = value;
    };
    MobilePreview.prototype._onClickURL = function () {
        if (this.inProgressURL === '' || this.inProgressURL === undefined) {
            return;
        }
        this.setState({
            currentDevice: this.state.currentDevice,
            currentOrientation: this.state.currentOrientation,
            deviceType: this.state.deviceType,
            url: this.inProgressURL
        });
    };
    MobilePreview.prototype._handleKeyDown = function (evt) {
        // On Escape press, close the preview panel
        if (evt.keyCode === 27) {
            this.props.onExit();
        }
    };
    /**
     * Used to sort devices by either height or width depending on the orientation of the device. This is necessary
     * because the clickstops will only show up/function properly if they are rendered in order from greatest to
     * smallest length.
     */
    MobilePreview.prototype._sortDevices = function () {
        if (this.state.deviceType === DeviceType.Phone) {
            this.devices.phones.sort(this._comparePhones);
            this.defaultPhone = this.devices.phones[this.devices.phones.length - 1];
        }
        else {
            this.devices.tablets.sort(this._compareTablets);
            this.defaultTablet = this.devices.tablets[this.devices.tablets.length - 1];
        }
    };
    MobilePreview.prototype._comparePhones = function (deviceA, deviceB) {
        var aMeasure = deviceA.width;
        var bMeasure = deviceB.width;
        if (this.state.currentOrientation === DeviceOrientation.Landscape) {
            aMeasure = deviceA.height;
            bMeasure = deviceB.height;
        }
        return bMeasure - aMeasure;
    };
    MobilePreview.prototype._compareTablets = function (deviceA, deviceB) {
        var aMeasure = deviceA.height;
        var bMeasure = deviceB.height;
        if (this.state.currentOrientation === DeviceOrientation.Landscape) {
            aMeasure = deviceA.width;
            bMeasure = deviceB.width;
        }
        return bMeasure - aMeasure;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], MobilePreview.prototype, "_onClickstopChangeForm", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], MobilePreview.prototype, "_onClickRotate", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], MobilePreview.prototype, "_onClickChangeDeviceType", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], MobilePreview.prototype, "_onChangedX", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], MobilePreview.prototype, "_onChangedY", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], MobilePreview.prototype, "_onChangedURLField", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], MobilePreview.prototype, "_onClickURL", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], MobilePreview.prototype, "_handleKeyDown", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], MobilePreview.prototype, "_sortDevices", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], MobilePreview.prototype, "_comparePhones", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], MobilePreview.prototype, "_compareTablets", null);
    return MobilePreview;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (MobilePreview);


/***/ }),

/***/ "mPVl":
/*!****************************************!*\
  !*** ./lib/spWebpartWorkbench.resx.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_NAR8NFw8cblGJm9t5CjqOw';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "mRDm":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Layer/LayerHost.js ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: LayerHost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayerHost", function() { return LayerHost; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Layer_notification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Layer.notification */ "nACv");




var LayerHost = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LayerHost, _super);
    function LayerHost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayerHost.prototype.shouldComponentUpdate = function () {
        return false;
    };
    LayerHost.prototype.componentDidMount = function () {
        Object(_Layer_notification__WEBPACK_IMPORTED_MODULE_3__["notifyHostChanged"])(this.props.id);
    };
    LayerHost.prototype.componentWillUnmount = function () {
        Object(_Layer_notification__WEBPACK_IMPORTED_MODULE_3__["notifyHostChanged"])(this.props.id);
    };
    LayerHost.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props, { className: Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["css"])('ms-LayerHost', this.props.className) }));
    };
    return LayerHost;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=LayerHost.js.map

/***/ }),

/***/ "mpgQ":
/*!************************************************************!*\
  !*** ./lib/components/mobilePreview/MobilePreview.resx.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_1JArBGDet5Uj9pJOV/9sFw';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "mwW1":
/*!************************************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewHeaderBar/mobilePreviewURLEntry/MobilePreviewURLEntry.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _MobilePreviewURLEntry_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MobilePreviewURLEntry.module.scss */ "Wey0");
/* harmony import */ var _MobilePreview_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../MobilePreview.resx */ "mpgQ");





var MobilePreviewURLEntry = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MobilePreviewURLEntry, _super);
    function MobilePreviewURLEntry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MobilePreviewURLEntry.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _MobilePreviewURLEntry_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewURLbar },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["TextField"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ className: _MobilePreviewURLEntry_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewTextfield, onChange: this._validateAndCompleteURL }, { placeholder: _MobilePreview_resx__WEBPACK_IMPORTED_MODULE_4__["default"].UrlTextBoxPlaceholder } /* VSO:391730 Remove this workaround */)),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["Button"], { className: _MobilePreviewURLEntry_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mobilePreviewURLbutton, onClick: this.props.onClickURLSubmit }, "View Preview")));
    };
    /**
     * If the URL is not valid, an error page displays as it would in the browser. As such, no additional validation is
     * conducted here aside from not allowing a blank entry.
     */
    MobilePreviewURLEntry.prototype._validateAndCompleteURL = function (event, value) {
        if (!value || value === '') {
            return;
        }
        var regex = /https?:\/\//;
        if (!regex.test(value)) {
            value = 'http://' + value;
        }
        this.props.onChangeURL(value);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], MobilePreviewURLEntry.prototype, "_validateAndCompleteURL", null);
    return MobilePreviewURLEntry;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (MobilePreviewURLEntry);


/***/ }),

/***/ "n8DK":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Icon/index.js ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/components/Icon/index.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = pkg.workaround_IconIndex;

/***/ }),

/***/ "nACv":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Layer/Layer.notification.js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: registerLayer, unregisterLayer, notifyHostChanged, setDefaultTarget, getDefaultTarget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerLayer", function() { return registerLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unregisterLayer", function() { return unregisterLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notifyHostChanged", function() { return notifyHostChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefaultTarget", function() { return setDefaultTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultTarget", function() { return getDefaultTarget; });
var _layersByHostId = {};
var _defaultHostSelector;
/**
 * Register a layer for a given host id
 * @param hostId Id of the layer host
 * @param layer Layer instance
 */
function registerLayer(hostId, callback) {
    if (!_layersByHostId[hostId]) {
        _layersByHostId[hostId] = [];
    }
    _layersByHostId[hostId].push(callback);
}
/**
 * Unregister a layer for a given host id
 * @param hostId Id of the layer host
 * @param layer Layer instance
 */
function unregisterLayer(hostId, callback) {
    if (_layersByHostId[hostId]) {
        var idx = _layersByHostId[hostId].indexOf(callback);
        if (idx >= 0) {
            _layersByHostId[hostId].splice(idx, 1);
            if (_layersByHostId[hostId].length === 0) {
                delete _layersByHostId[hostId];
            }
        }
    }
}
/**
 * Used for notifying applicable Layers that a host is available/unavailable and to re-evaluate Layers that
 * care about the specific host.
 */
function notifyHostChanged(id) {
    if (_layersByHostId[id]) {
        _layersByHostId[id].forEach(function (callback) { return callback(); });
    }
}
/**
 * Sets the default target selector to use when determining the host in which
 * Layered content will be injected into. If not provided, an element will be
 * created at the end of the document body.
 *
 * Passing in a falsey value will clear the default target and reset back to
 * using a created element at the end of document body.
 */
function setDefaultTarget(selector) {
    _defaultHostSelector = selector;
}
/**
 * Get the default target selector when determining a host
 */
function getDefaultTarget() {
    return _defaultHostSelector;
}
//# sourceMappingURL=Layer.notification.js.map

/***/ }),

/***/ "nDaQ":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/DraggableZone/DraggableZone.js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DraggableZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DraggableZone", function() { return DraggableZone; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DraggableZone_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DraggableZone.styles */ "rp3K");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_3__);




var eventMapping = {
    touch: {
        start: 'touchstart',
        move: 'touchmove',
        stop: 'touchend'
    },
    mouse: {
        start: 'mousedown',
        move: 'mousemove',
        stop: 'mouseup'
    }
};
var DraggableZone = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DraggableZone, _super);
    function DraggableZone(props) {
        var _this = _super.call(this, props) || this;
        _this._currentEventType = eventMapping.mouse;
        _this._events = [];
        _this._onMouseDown = function (event) {
            var onMouseDown = react__WEBPACK_IMPORTED_MODULE_1__["Children"].only(_this.props.children).props.onMouseDown;
            if (onMouseDown) {
                onMouseDown(event);
            }
            _this._currentEventType = eventMapping.mouse;
            return _this._onDragStart(event);
        };
        _this._onMouseUp = function (event) {
            var onMouseUp = react__WEBPACK_IMPORTED_MODULE_1__["Children"].only(_this.props.children).props.onMouseUp;
            if (onMouseUp) {
                onMouseUp(event);
            }
            _this._currentEventType = eventMapping.mouse;
            return _this._onDragStop(event);
        };
        _this._onTouchStart = function (event) {
            var onTouchStart = react__WEBPACK_IMPORTED_MODULE_1__["Children"].only(_this.props.children).props.onTouchStart;
            if (onTouchStart) {
                onTouchStart(event);
            }
            _this._currentEventType = eventMapping.touch;
            return _this._onDragStart(event);
        };
        _this._onTouchEnd = function (event) {
            var onTouchEnd = react__WEBPACK_IMPORTED_MODULE_1__["Children"].only(_this.props.children).props.onTouchEnd;
            if (onTouchEnd) {
                onTouchEnd(event);
            }
            _this._currentEventType = eventMapping.touch;
            _this._onDragStop(event);
        };
        _this._onDragStart = function (event) {
            // Only handle left click for dragging
            if (typeof event.button === 'number' && event.button !== 0) {
                return false;
            }
            // If the target doesn't match the handleSelector OR
            // if the target does match the preventDragSelector, bail out
            if ((_this.props.handleSelector && !_this._matchesSelector(event.target, _this.props.handleSelector)) ||
                (_this.props.preventDragSelector && _this._matchesSelector(event.target, _this.props.preventDragSelector))) {
                return;
            }
            // Remember the touch identifier if this is a touch event so we can
            // distinguish between individual touches in multitouch scenarios
            // by remembering which touch point we were given
            _this._touchId = _this._getTouchId(event);
            var position = _this._getControlPosition(event);
            if (position === undefined) {
                return;
            }
            var dragData = _this._createDragDataFromPosition(position);
            _this.props.onStart && _this.props.onStart(event, dragData);
            _this.setState({
                isDragging: true,
                lastPosition: position
            });
            // hook up the appropriate mouse/touch events to the body to ensure
            // smooth dragging
            _this._events = [
                Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["on"])(document.body, _this._currentEventType.move, _this._onDrag),
                Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["on"])(document.body, _this._currentEventType.stop, _this._onDragStop)
            ];
        };
        _this._onDrag = function (event) {
            // Prevent scrolling on mobile devices
            if (event.type === 'touchmove') {
                event.preventDefault();
            }
            var position = _this._getControlPosition(event);
            if (!position) {
                return;
            }
            // create the updated drag data from the position data
            var updatedData = _this._createUpdatedDragData(_this._createDragDataFromPosition(position));
            var updatedPosition = updatedData.position;
            _this.props.onDragChange && _this.props.onDragChange(event, updatedData);
            _this.setState({
                position: updatedPosition,
                lastPosition: position
            });
        };
        _this._onDragStop = function (event) {
            if (!_this.state.isDragging) {
                return;
            }
            var position = _this._getControlPosition(event);
            if (!position) {
                return;
            }
            var baseDragData = _this._createDragDataFromPosition(position);
            // Set dragging to false and reset the lastPosition
            _this.setState({
                isDragging: false,
                lastPosition: undefined
            });
            _this.props.onStop && _this.props.onStop(event, baseDragData);
            if (_this.props.position) {
                _this.setState({
                    position: _this.props.position
                });
            }
            // Remove event handlers
            _this._events.forEach(function (dispose) { return dispose(); });
        };
        _this.state = {
            isDragging: false,
            position: _this.props.position || { x: 0, y: 0 },
            lastPosition: undefined
        };
        return _this;
    }
    DraggableZone.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.position && (!prevProps.position || this.props.position !== prevProps.position)) {
            this.setState({ position: this.props.position });
        }
    };
    DraggableZone.prototype.componentWillUnmount = function () {
        this._events.forEach(function (dispose) { return dispose(); });
    };
    DraggableZone.prototype.render = function () {
        var child = react__WEBPACK_IMPORTED_MODULE_1__["Children"].only(this.props.children);
        var props = child.props;
        var position = this.props.position;
        var _a = this.state, statePosition = _a.position, isDragging = _a.isDragging;
        var x = statePosition.x;
        var y = statePosition.y;
        if (position && !isDragging) {
            x = position.x;
            y = position.y;
        }
        return react__WEBPACK_IMPORTED_MODULE_1__["cloneElement"](child, {
            style: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props.style, { transform: "translate(" + x + "px, " + y + "px)" }),
            className: Object(_DraggableZone_styles__WEBPACK_IMPORTED_MODULE_2__["getClassNames"])(props.className, this.state.isDragging).root,
            onMouseDown: this._onMouseDown,
            onMouseUp: this._onMouseUp,
            onTouchStart: this._onTouchStart,
            onTouchEnd: this._onTouchEnd
        });
    };
    /**
     * Get the control position based off the event that fired
     * @param event - The event to get offsets from
     */
    DraggableZone.prototype._getControlPosition = function (event) {
        var touchObj = this._getActiveTouch(event);
        // did we get the right touch?
        if (this._touchId !== undefined && !touchObj) {
            return undefined;
        }
        var eventToGetOffset = touchObj || event;
        return {
            x: eventToGetOffset.clientX,
            y: eventToGetOffset.clientY
        };
    };
    /**
     * Get the active touch point that we have saved from the event's TouchList
     * @param event - The event used to get the TouchList for the active touch point
     */
    DraggableZone.prototype._getActiveTouch = function (event) {
        return ((event.targetTouches && this._findTouchInTouchList(event.targetTouches)) ||
            (event.changedTouches && this._findTouchInTouchList(event.changedTouches)));
    };
    /**
     * Get the initial touch identifier associated with the given event
     * @param event - The event that contains the TouchList
     */
    DraggableZone.prototype._getTouchId = function (event) {
        var touch = (event.targetTouches && event.targetTouches[0]) || (event.changedTouches && event.changedTouches[0]);
        if (touch) {
            return touch.identifier;
        }
    };
    /**
     * Returns if an element (or any of the element's parents) match the given selector
     */
    DraggableZone.prototype._matchesSelector = function (element, selector) {
        if (!element || element === document.body) {
            return false;
        }
        /* tslint:disable-next-line:no-string-literal */
        var matchesSelectorFn = element.matches || element.webkitMatchesSelector || element.msMatchesSelector /* for IE */;
        if (!matchesSelectorFn) {
            return false;
        }
        return matchesSelectorFn.call(element, selector) || this._matchesSelector(element.parentElement, selector);
    };
    /**
     * Attempts to find the Touch that matches the identifier  we stored in dragStart
     * @param touchList The TouchList to look for the stored identifier from dragStart
     */
    DraggableZone.prototype._findTouchInTouchList = function (touchList) {
        if (this._touchId === undefined) {
            return;
        }
        for (var i = 0; i < touchList.length; i++) {
            if (touchList[i].identifier === this._touchId) {
                return touchList[i];
            }
        }
        return undefined;
    };
    /**
     * Create DragData based off of the last known position and the new position passed in
     * @param position The new position as part of the drag
     */
    DraggableZone.prototype._createDragDataFromPosition = function (position) {
        var lastPosition = this.state.lastPosition;
        // If we have no lastPosition, use the given position
        // for last position
        if (lastPosition === undefined) {
            return {
                delta: { x: 0, y: 0 },
                lastPosition: position,
                position: position
            };
        }
        return {
            delta: {
                x: position.x - lastPosition.x,
                y: position.y - lastPosition.y
            },
            lastPosition: lastPosition,
            position: position
        };
    };
    /**
     * Creates an updated DragData based off the current position and given baseDragData
     * @param baseDragData The base DragData (gotten from _createDragDataFromPosition) used to calculate the updated positions
     */
    DraggableZone.prototype._createUpdatedDragData = function (baseDragData) {
        var position = this.state.position;
        return {
            position: {
                x: position.x + baseDragData.delta.x,
                y: position.y + baseDragData.delta.y
            },
            delta: baseDragData.delta,
            lastPosition: position
        };
    };
    return DraggableZone;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=DraggableZone.js.map

/***/ }),

/***/ "nfKY":
/*!***********************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewClickStop/MobilePreviewClickStop.module.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./MobilePreviewClickStop.module.css */ "14dw");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "oK8S":
/*!***************************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewClickStop/MobilePreviewClickStop.module.scss.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./MobilePreviewClickStop.module.css */ "nfKY");
var styles = {
    clickStop: 'clickStop_ad5c4140',
    clickStopSelected: 'clickStopSelected_ad5c4140',
    navBarItem: 'navBarItem_ad5c4140'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "oSGF":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/components/mobilePreview/mobilePreviewHeaderBar/MobilePreviewHeaderBar.module.css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".mobilePreviewNavBar_232392bf{color:#323130;background-color:#f3f2f1;height:50px;font-size:14px;font-weight:400;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;-webkit-box-shadow:none;box-shadow:none;padding:0 10px;width:100%;outline:1px solid transparent}.navBarItems_232392bf{-webkit-box-sizing:border-box;box-sizing:border-box;display:block;list-style:none;margin:0 7px 0 0;padding:0}.navBarItems_232392bf:after,.navBarItems_232392bf:before{display:table;content:\"\";line-height:0}.navBarItems_232392bf:after{clear:both}.navBarItemSm_232392bf{width:50%}@media (min-width:480px){.navBarItemSm_232392bf{width:50%}}@media (min-width:640px){.navBarItemSm_232392bf{width:25%}}@media (min-width:640px){.navBarItemMd_232392bf{width:50%}}.navBarItem_232392bf,.navBarItemMd_232392bf,.navBarItemSm_232392bf{min-height:1px;-webkit-box-sizing:border-box;margin-right:0;float:left;font-size:14px;padding:0;box-sizing:border-box;display:block;height:40px;line-height:40px;position:relative}[dir=ltr] .navBarItem_232392bf,[dir=ltr] .navBarItemMd_232392bf,[dir=ltr] .navBarItemSm_232392bf{float:left}[dir=rtl] .navBarItem_232392bf,[dir=rtl] .navBarItemMd_232392bf,[dir=rtl] .navBarItemSm_232392bf{float:right}.navBarItem_232392bf .ms-Grid_232392bf,.navBarItemMd_232392bf .ms-Grid_232392bf,.navBarItemSm_232392bf .ms-Grid_232392bf{padding:0}.navBarItemRight_232392bf{float:right;margin:0}.mobilePreviewTitle_232392bf{line-height:50px;margin-left:15px;font-size:xx-large}.mobilePreviewXIcon_232392bf{color:#a19f9d;border-color:#c8c6c4;font-size:30px;border-left-width:1px;margin:auto auto auto 30px;line-height:50px}.mobilePreviewXIcon_232392bf:hover{cursor:pointer;color:#767676}.col_232392bf{position:relative;min-height:1px;padding-left:8px;padding-right:8px;-webkit-box-sizing:border-box;box-sizing:border-box;width:50%}[dir=ltr] .col_232392bf{float:left}[dir=rtl] .col_232392bf{float:right}.col_232392bf .ms-Grid_232392bf{padding:0}@media (min-width:480px){.col_232392bf{width:50%}}@media (min-width:640px){.col_232392bf{width:25%}}", ""]);



/***/ }),

/***/ "p9PU":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!/Users/runner/work/1/s/spfx-core/sp-property-pane/lib/propertyPaneController/PropertyPaneController.module.css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, "[id^=spPropertyPaneContainer].showPane_d3785813{width:340px}[id^=spPropertyPaneContainer].showPaneNarrow_d3785813{width:320px}[id^=spPropertyPaneContainerNoFlexbox].spPropertyPaneContainer_d3785813{position:absolute;top:50px;bottom:0;z-index:999}[dir=ltr] [id^=spPropertyPaneContainerNoFlexbox].spPropertyPaneContainer_d3785813{right:-340px}[dir=rtl] [id^=spPropertyPaneContainerNoFlexbox].spPropertyPaneContainer_d3785813{left:-340px}[dir=ltr] [id^=spPropertyPaneContainerNoFlexbox].showPane_d3785813{right:0}[dir=rtl] [id^=spPropertyPaneContainerNoFlexbox].showPane_d3785813{left:0}[dir=ltr] [id^=spPropertyPaneContainerNoFlexbox].showPaneNarrow_d3785813{right:0}[dir=rtl] [id^=spPropertyPaneContainerNoFlexbox].showPaneNarrow_d3785813{left:0}[dir=ltr] [id^=spPageChromeAppDiv].shrinkContent_d3785813{right:340px}[dir=rtl] [id^=spPageChromeAppDiv].shrinkContent_d3785813{left:340px}[dir=ltr] [id^=workbenchPageContent].shrinkContent_d3785813{right:340px}[dir=rtl] [id^=workbenchPageContent].shrinkContent_d3785813{left:340px}[dir=ltr] [id^=workbenchCommandBar].shrinkContent_d3785813{padding-right:340px}[dir=rtl] [id^=workbenchCommandBar].shrinkContent_d3785813{padding-left:340px}", ""]);



/***/ }),

/***/ "qEgt":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Layer/index.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: Layer, LayerBase, LayerHost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layer */ "Bgjg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return _Layer__WEBPACK_IMPORTED_MODULE_0__["Layer"]; });

/* harmony import */ var _Layer_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layer.base */ "7Arc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayerBase", function() { return _Layer_base__WEBPACK_IMPORTED_MODULE_1__["LayerBase"]; });

/* harmony import */ var _LayerHost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LayerHost */ "mRDm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayerHost", function() { return _LayerHost__WEBPACK_IMPORTED_MODULE_2__["LayerHost"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "qXzK":
/*!*************************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewDeviceView/MobilePreviewDeviceView.module.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./MobilePreviewDeviceView.module.css */ "BGHn");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "rp3K":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/DraggableZone/DraggableZone.styles.js ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getClassNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClassNames", function() { return getClassNames; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_1__);


var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["memoizeFunction"])(function (className, isDragging) {
    return {
        root: Object(_Styling__WEBPACK_IMPORTED_MODULE_1__["mergeStyles"])(className, isDragging && {
            touchAction: 'none',
            selectors: {
                '& *': {
                    userSelect: 'none'
                }
            }
        })
    };
});
//# sourceMappingURL=DraggableZone.styles.js.map

/***/ }),

/***/ "sjay":
/*!***********************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/object-assign/4.1.1/node_modules/object-assign/index.js ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "su0C":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/FocusZone.js ***!
  \***********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/FocusZone.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

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

/***/ "ugPr":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/DialogFooter.base.js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DialogFooterBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogFooterBase", function() { return DialogFooterBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);



var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var DialogFooterBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DialogFooterBase, _super);
    function DialogFooterBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DialogFooterBase.prototype.render = function () {
        var _a = this.props, className = _a.className, styles = _a.styles, theme = _a.theme;
        this._classNames = getClassNames(styles, {
            theme: theme,
            className: className
        });
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: this._classNames.actions },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: this._classNames.actionsRight }, this._renderChildrenAsActions())));
    };
    DialogFooterBase.prototype._renderChildrenAsActions = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_1__["Children"].map(this.props.children, function (child) { return (child ? react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: _this._classNames.action }, child) : null); });
    };
    return DialogFooterBase;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=DialogFooter.base.js.map

/***/ }),

/***/ "vpy3":
/*!*******************************!*\
  !*** external "resx-strings" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vpy3__;

/***/ }),

/***/ "wXxL":
/*!*******************************************************!*\
  !*** ./lib/components/workbench/Workbench.module.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./Workbench.module.css */ "IbqH");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "wkab":
/*!*****************************************************************************************************!*\
  !*** ./lib/components/mobilePreview/mobilePreviewClickStopBar/MobilePreviewClickStopBar.module.css ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./MobilePreviewClickStopBar.module.css */ "M4Nb");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "x+gc":
/*!***********************************************************!*\
  !*** ./lib/components/workbench/Workbench.module.scss.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./Workbench.module.css */ "wXxL");
var styles = {
    workbench: 'workbench_ecefc8ba',
    header: 'header_ecefc8ba',
    headerMenu: 'headerMenu_ecefc8ba',
    headerTitle: 'headerTitle_ecefc8ba',
    headerPerson: 'headerPerson_ecefc8ba',
    pageContent: 'pageContent_ecefc8ba',
    commandBar: 'commandBar_ecefc8ba'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "xk/t":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Button.js ***!
  \********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Button.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "xqig":
/*!***********************************************!*\
  !*** ./lib/components/workbench/Workbench.js ***!
  \***********************************************/
/*! exports provided: WorkBench */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkBench", function() { return WorkBench; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "R3cu");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/sp-a11y */ "ytfe");
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _workbenchCommandBar_WorkbenchCommandBar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../workbenchCommandBar/WorkbenchCommandBar */ "9yj+");
/* harmony import */ var _canvasHost_CanvasHost__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../canvasHost/CanvasHost */ "TUfI");
/* harmony import */ var _mobilePreview_mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../mobilePreview/mobilePreview/MobilePreview */ "mEUM");
/* harmony import */ var _serializedCanvasView_SerializedCanvasView__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../serializedCanvasView/SerializedCanvasView */ "h3Ql");
/* harmony import */ var _Workbench_resx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Workbench.resx */ "glKC");
/* harmony import */ var _Workbench_module_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Workbench.module.scss */ "x+gc");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file Workbench.tsx
 * The top level file for the Workbench. The Workbench is a tool that SharePoint
 * developers use to test their Web Parts. It is designed to make development
 * efficient by providing a production-like evironment for the developer to
 * test their Web Part and quickly make changes.
 */













// Killswitch Guid to disable PerformanceLogger if it is too noisy.
var WB_PERFORMANCELOGGER_KILLSWITCH = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["Guid"].parse('c00b3fb2-b04d-4852-9496-deb7857c4335');
var WorkBench = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WorkBench, _super);
    function WorkBench(props, context) {
        var _this = _super.call(this, props, context) || this;
        var urlParams = new _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["UrlQueryParameterCollection"](window.location.href);
        _this.state = {
            displayMobilePreview: false,
            showSerializedCanvasView: false,
            mobilePreviewDeviceType: _mobilePreview_mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_9__["DeviceType"].Phone,
            isEditing: (urlParams.getValue('Mode') !== 'Read'),
            officeHeaderTitle: _Workbench_resx__WEBPACK_IMPORTED_MODULE_11__["default"].Office365Title,
            hasOfficeHeader: false,
            hasCommandBar: false
        };
        _this._a11yManager = _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3__["A11yManager"].getInstanceById(_this.props.a11yManagerId);
        if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["_SPKillSwitch"].isActivated(WB_PERFORMANCELOGGER_KILLSWITCH, '08/09/2019', 'StopPerformanceLogger')) {
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6__["_PerformanceLogger"].initializeApplication('WorkBenchApplication');
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6__["_PerformanceLogger"].addComponent(WorkBench._applicationTag);
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6__["_PerformanceLogger"].startMarkForComponent(WorkBench._applicationTag);
        }
        return _this;
    }
    WorkBench.prototype.getChildContext = function () {
        return {
            a11yManager: this._a11yManager
        };
    };
    WorkBench.prototype.render = function () {
        var mobilePreview = undefined;
        var pageStore = this.props.pageStore;
        if (this.state.displayMobilePreview) {
            mobilePreview = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_mobilePreview_mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_9__["default"], { onExit: this._closeMobilePreview, deviceType: this.state.mobilePreviewDeviceType });
        }
        var serializeCallback = pageStore.getSerializeCallback();
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["css"])(_Workbench_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].workbench, 'is-focusVisible') },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _Workbench_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].header },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _Workbench_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].headerMenu },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["Icon"], { iconName: 'Waffle' })),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _Workbench_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].headerTitle },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("em", null, this.state.officeHeaderTitle),
                    _Workbench_resx__WEBPACK_IMPORTED_MODULE_11__["default"].SharePointWorkbenchTitle),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _Workbench_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].headerPerson },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["Icon"], { iconName: 'Contact' }))),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null,
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { id: 'workbenchCommandBar', className: _Workbench_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].commandBar },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_workbenchCommandBar_WorkbenchCommandBar__WEBPACK_IMPORTED_MODULE_7__["default"], { isEditing: this.state.isEditing, onClickMobileView: this._onClickMobileView, onClickTabletView: this._onClickTabletView, toggleEdit: this._toggleEdit, clearPage: pageStore.clearPageState, savePage: pageStore.savePageState, onClickSerializeCanvasView: this._onClickSerializeCanvasView })),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { id: 'workbenchPageContent', className: _Workbench_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].pageContent },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_canvasHost_CanvasHost__WEBPACK_IMPORTED_MODULE_8__["default"], { store: pageStore, isEditing: this.state.isEditing, hasOfficeHeader: this.state.hasOfficeHeader, hasCommandBar: this.state.hasCommandBar }))),
            mobilePreview,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_serializedCanvasView_SerializedCanvasView__WEBPACK_IMPORTED_MODULE_10__["default"], { getSerializedData: function (json) { return (serializeCallback) ? serializeCallback(json) : undefined; }, isVisible: this.state.showSerializedCanvasView, closeCallback: this._closeClickSerializeCanvasView })));
    };
    // Putting _PerformanceLogger.endMarkForComponent in a callback of 'setTimeout' will ensure that the
    // Browser has gone through a render cycle, which means it actually painted pixels, before we stop the perf logger.
    WorkBench.prototype.componentDidMount = function () {
        if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["_SPKillSwitch"].isActivated(WB_PERFORMANCELOGGER_KILLSWITCH, '08/09/2019', 'StopPerformanceLogger')) {
            setTimeout(function () { return _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6__["_PerformanceLogger"].endMarkForComponent(WorkBench._applicationTag); }, 0);
        }
    };
    WorkBench.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.state.isEditing !== prevState.isEditing) {
            if (this.state.isEditing) {
                this._a11yManager.focusById('previewButton');
                this._a11yManager.alert(_Workbench_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ScreenReaderDisplayModeSwitchToEditMode);
            }
            else {
                this._a11yManager.focusById('editButton');
                this._a11yManager.alert(_Workbench_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ScreenReaderDisplayModeSwitchToReadMode);
            }
        }
    };
    WorkBench.prototype._toggleEdit = function () {
        this.setState({
            isEditing: !this.state.isEditing
        });
    };
    WorkBench.prototype._onClickMobileView = function () {
        this.setState({
            displayMobilePreview: true,
            mobilePreviewDeviceType: _mobilePreview_mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_9__["DeviceType"].Phone
        });
        this._setSuiteNavZIndex('0');
    };
    WorkBench.prototype._onClickSerializeCanvasView = function () {
        this.setState({
            showSerializedCanvasView: true
        });
    };
    WorkBench.prototype._closeClickSerializeCanvasView = function () {
        this.setState({
            showSerializedCanvasView: false
        });
    };
    WorkBench.prototype._onClickTabletView = function () {
        this.setState({
            displayMobilePreview: true,
            mobilePreviewDeviceType: _mobilePreview_mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_9__["DeviceType"].Tablet
        });
        this._setSuiteNavZIndex('0');
    };
    WorkBench.prototype._closeMobilePreview = function () {
        this.setState({
            displayMobilePreview: false,
            mobilePreviewDeviceType: _mobilePreview_mobilePreview_MobilePreview__WEBPACK_IMPORTED_MODULE_9__["DeviceType"].Phone
        });
        this._setSuiteNavZIndex('5');
    };
    /**
     * Sets the z-index of the suite nav.
     * Purpose of this is so that the suite nav doesn't cover up the mobile preview header.
     * Should find a better way to achieve this.
     */
    WorkBench.prototype._setSuiteNavZIndex = function (value) {
        var suiteNav = document.getElementById('SuiteNavPlaceHolder');
        if (suiteNav) {
            suiteNav.style.zIndex = value;
        }
    };
    WorkBench.childContextTypes = {
        a11yManager: prop_types__WEBPACK_IMPORTED_MODULE_2__["object"].isRequired
    };
    WorkBench._applicationTag = 'WorkBenchApplication.Host';
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["autobind"]
    ], WorkBench.prototype, "_toggleEdit", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["autobind"]
    ], WorkBench.prototype, "_onClickMobileView", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["autobind"]
    ], WorkBench.prototype, "_onClickSerializeCanvasView", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["autobind"]
    ], WorkBench.prototype, "_closeClickSerializeCanvasView", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["autobind"]
    ], WorkBench.prototype, "_onClickTabletView", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["autobind"]
    ], WorkBench.prototype, "_closeMobilePreview", null);
    return WorkBench;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));



/***/ }),

/***/ "xvdx":
/*!******************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/fbjs/0.8.17/node_modules/fbjs/lib/emptyFunction.js ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ "y2VM":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Modal/index.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: Modal, ModalBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal */ "zzdt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return _Modal__WEBPACK_IMPORTED_MODULE_0__["Modal"]; });

/* harmony import */ var _Modal_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal.base */ "Mstc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalBase", function() { return _Modal_base__WEBPACK_IMPORTED_MODULE_1__["ModalBase"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "ypis":
/*!**************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/fbjs/0.8.17/node_modules/fbjs/lib/invariant.js ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (true) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ "ytfe":
/*!******************************!*\
  !*** external "@ms/sp-a11y" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ytfe__;

/***/ }),

/***/ "zzdt":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Modal/Modal.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: Modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return Modal; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Modal_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal.base */ "Mstc");
/* harmony import */ var _Modal_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modal.styles */ "fcBF");



var Modal = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Modal_base__WEBPACK_IMPORTED_MODULE_1__["ModalBase"], _Modal_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'Modal'
});
//# sourceMappingURL=Modal.js.map

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

/***/ "@microsoft/sp-application-base":
/*!*************************************************!*\
  !*** external "@microsoft/sp-application-base" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_application_base__;

/***/ }),

/***/ "@microsoft/sp-core-library":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_core_library__;

/***/ }),

/***/ "@microsoft/sp-loader":
/*!***************************************!*\
  !*** external "@microsoft/sp-loader" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_loader__;

/***/ }),

/***/ "@microsoft/sp-webpart-base":
/*!*********************************************!*\
  !*** external "@microsoft/sp-webpart-base" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_webpart_base__;

/***/ }),

/***/ "@ms/sp-a11y":
/*!******************************!*\
  !*** external "@ms/sp-a11y" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_a11y__;

/***/ }),

/***/ "@ms/sp-canvas":
/*!********************************!*\
  !*** external "@ms/sp-canvas" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_canvas__;

/***/ }),

/***/ "@ms/sp-telemetry":
/*!***********************************!*\
  !*** external "@ms/sp-telemetry" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_telemetry__;

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
//# sourceMappingURL=sp-webpart-workbench_en-us.js.map