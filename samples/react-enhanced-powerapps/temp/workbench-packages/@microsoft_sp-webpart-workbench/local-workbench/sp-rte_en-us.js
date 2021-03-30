define("8404d628-4817-4b3a-883e-1c5a4d07892e_1.11.0", ["@microsoft/load-themed-styles","@microsoft/office-ui-fabric-react-bundle","@microsoft/sp-core-library","@microsoft/sp-diagnostics","@microsoft/sp-loader","@microsoft/sp-lodash-subset","@ms/odsp-utilities-bundle","@ms/sp-a11y","@ms/sp-component-utilities","@ms/sp-dataproviders","@ms/sp-safehtml","react","react-dom"], function(__WEBPACK_EXTERNAL_MODULE__microsoft_load_themed_styles__, __WEBPACK_EXTERNAL_MODULE__microsoft_office_ui_fabric_react_bundle__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_core_library__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_diagnostics__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_loader__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_lodash_subset__, __WEBPACK_EXTERNAL_MODULE__ms_odsp_utilities_bundle__, __WEBPACK_EXTERNAL_MODULE__ms_sp_a11y__, __WEBPACK_EXTERNAL_MODULE__ms_sp_component_utilities__, __WEBPACK_EXTERNAL_MODULE__ms_sp_dataproviders__, __WEBPACK_EXTERNAL_MODULE__ms_sp_safehtml__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./sp-rte.js");
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
    "_acoNwVeh/QF9PsLoQfUb2A": {
      "FormattingBarAlignCenterButtonTitle": "Center",
      "FormattingBarAlignLeftButtonTitle": "Align left",
      "FormattingBarAlignRightButtonTitle": "Align right",
      "FormattingBarBoldButtonTitle": "Bold ({0}+B)",
      "FormattingBarBulletListButtonTitle": "Bulleted list",
      "FormattingBarClearFormattingButtonTitle": "Clear all formatting",
      "FormattingBarConfirmAction": "Action {0} performed.",
      "FormattingBarConfirmActionOnSelection": "Action {0} performed on selected text: {1}",
      "FormattingBarNormalTextButtonTitle": "Normal text",
      "FormattingBarHeading2ButtonTitle": "Heading 1",
      "FormattingBarHeading3ButtonTitle": "Heading 2",
      "FormattingBarHeading4ButtonTitle": "Heading 3",
      "FormattingBarQuoteButtonTitle": "Pull quote",
      "FormattingBarItalicButtonTitle": "Italic ({0}+I)",
      "FormattingBarLinkButtonTitle": "Hyperlink ({0}+ K)",
      "FormattingBarNumberedListButtonTitle": "Numbered list",
      "FormattingBarUnderlineButtonTitle": "Underline ({0}+U)",
      "FormattingBarUnlinkButtonTitle": "Remove link",
      "UndoButtonTitle": "Undo ({0}+Z)",
      "RedoButtonTitle": "Redo ({0}+Y)",
      "FormattingBarAccessibleLabel": "Formatting",
      "LinkDialogErrorNotSupportedLink": "This link type is not supported.",
      "LinkDialogTextFieldAriaLabel": "Web address to link to",
      "LinkDialogTextFieldLabel": "Web address:",
      "LinkDialogDisplayTextFieldLabel": "Text to display:",
      "LinkDialogTitle": "Insert link",
      "RichTextEditorAriaLabel": "Text editor. Use Alt+F10 to go to toolbars.",
      "RichTextEditorTitle": "Text editor",
      "RichTextEditorIframeTitle": "{0} {1}",
      "RichTextLinkDialogCancelButtonLabel": "Cancel",
      "RichTextLinkDialogSaveButtonLabel": "Save",
      "RichTextNavigationAltF10Keys": "{0} {1}",
      "ToolbarNavigationArrowKeys": "Use arrow keys to navigate inside the toolbar.",
      "ToolbarNavigationTabKeys": "Use tab to switch between toolbars.",
      "ToolbarNavigationShiftTabKey": "Use shift + tab to navigate back to textbox",
      "ImagesInTableNotSupported": "Can't paste an image inside of a table. Try pasting the image outside of the table.",
      "MultiImagePasteInIENotSupported": "Can't paste images that are within a table or wrapped with text. Copy just the image, without the table or text, and try again.",
      "InvalidImageSource": "Can't paste images because the source does not exist or is invalid. Try pasting from a different location.",
      "CloseWarningText": "Close warning {0} ",
      "LoadingText": "Pasting...",
      "AddRowAboveText": "Insert above",
      "AddRowBelowText": "Insert below",
      "DeleteRowText": "Delete row",
      "AddColumnLeftText": "Insert left",
      "AddColumnRightText": "Insert right",
      "AddRowAboveShortcutText": "{0} ({1}+Shift+A)",
      "AddRowBelowShortcutText": "{0} ({1}+Shift+Z)",
      "DeleteRowShortcutText": "{0} ({1}+Shift+D)",
      "StrikeThroughButtonLabel": "Strikethrough",
      "SuperscriptButtonLabel": "Superscript",
      "SubscriptButtonLabel": "Subscript",
      "JustifyButtonLabel": "Justify",
      "IncreaseIndentButtonLabel": "Increase indent",
      "DecreaseIndentButtonLabel": "Decrease indent",
      "FontSizeDropDownLabel": "Font size",
      "TableTitle": "Table",
      "TableButtonLabel": "Insert table",
      "InsertRowBeforeButtonLabel": "Insert above",
      "InsertRowAfterButtonLabel": "Insert below",
      "InsertColumnLeftButtonLabel": "Insert left",
      "InsertColumnRightButtonLabel": "Insert right",
      "DeleteRowButtonLabel": "Delete row",
      "DeleteColumnButtonLabel": "Delete column",
      "DeleteTableButtonLabel": "Delete table",
      "FontColorLabel": "Font color",
      "HightlightLabel": "Highlight color",
      "SimpleTableButtonLabel": "Plain",
      "TableWithHeaderBorderLabel": "Subtle header",
      "TableWithFilledHeaderLabel": "Header",
      "TableWithBandedRowsLabel": "Alternating rows",
      "TableWithBandedRowsAndColumnsLabel": "Column header",
      "SimpleTableButtonThemeLabel": "Theme-colored plain",
      "TableWithHeaderBorderThemeLabel": "Theme-colored subtle header",
      "TableWithFilledHeaderThemeLabel": "Theme-colored header",
      "TableWithBandedRowsThemeLabel": "Theme-colored alternating rows",
      "TableWithBandedRowsAndColumnsThemeLabel": "Theme-colored column header",
      "AlignTableLeftLabel": "Align table left",
      "AlignTableCenterLabel": "Align table center",
      "AlignTableRightLabel": "Align table right",
      "RTEPagePickerSaveAction": "The link {0} is added.",
      "RTEPagePickerUnlinkAction": "The link {0} is removed.",
      "FormattingBarPreButtonTitle": "Monospaced",
      "CommandShortcutOnMac": "⌘",
      "ControlShortcutOnWin": "Ctrl",
      "SuggestedPageLabel": "Suggested pages",
      "WikiLinkingCoachMarkTitle": "Add links even faster!",
      "WikiLinkingCoachMarkContent": "Type [[ where you want a link to appear, and you'll be able to select from a list of pages on your site. Or, you can enter a link by typing [[your link name | URL]]. ",
      "WikiLinkingCoachMarkButton": "Got it"
    }
  };

  strings.default = strings;
  return strings;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sp-rte.js":
/*!*******************!*\
  !*** ./sp-rte.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! @microsoft/sp-loader */ "@microsoft/sp-loader"),__webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "@microsoft/office-ui-fabric-react-bundle"),__webpack_require__(/*! @ms/sp-safehtml */ "@ms/sp-safehtml"),__webpack_require__(/*! @microsoft/sp-lodash-subset */ "@microsoft/sp-lodash-subset"),__webpack_require__(/*! @ms/sp-dataproviders */ "@ms/sp-dataproviders"),__webpack_require__(/*! @microsoft/sp-core-library */ "@microsoft/sp-core-library"),__webpack_require__(/*! react */ "react"),__webpack_require__(/*! react-dom */ "react-dom"),__webpack_require__(/*! @ms/sp-component-utilities */ "@ms/sp-component-utilities"),__webpack_require__(/*! @microsoft/load-themed-styles */ "@microsoft/load-themed-styles"),__webpack_require__(/*! @microsoft/sp-diagnostics */ "@microsoft/sp-diagnostics"),__webpack_require__(/*! resx-strings */ "../lib/resx-strings/en-us.js"),__webpack_require__(/*! @ms/odsp-utilities-bundle */ "@ms/odsp-utilities-bundle"),__webpack_require__(/*! @ms/sp-a11y */ "@ms/sp-a11y")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(__WEBPACK_EXTERNAL_MODULE_I6O9__, __WEBPACK_EXTERNAL_MODULE_KL1q__, __WEBPACK_EXTERNAL_MODULE_NEVa__, __WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_QZHX__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_cDcd__, __WEBPACK_EXTERNAL_MODULE_faye__, __WEBPACK_EXTERNAL_MODULE_hiL___, __WEBPACK_EXTERNAL_MODULE_jOlS__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_vpy3__, __WEBPACK_EXTERNAL_MODULE_y88i__, __WEBPACK_EXTERNAL_MODULE_ytfe__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"sp-rte": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({"sp-rte-wikipagesuggestions":"sp-rte-wikipagesuggestions","vendors~sp-canvas-sp-ckeditor":"vendors~sp-canvas-sp-ckeditor","vendors~sp-canvas-sp-ckeditor-flight":"vendors~sp-canvas-sp-ckeditor-flight"}[chunkId]||chunkId) + "_" + {"sp-rte-wikipagesuggestions":"361526e24a24257ae3cd","vendors~sp-canvas-sp-ckeditor":"33dffec44149ff1bc3ef","vendors~sp-canvas-sp-ckeditor-flight":"a0a5b907351e4aa5e9db"}[chunkId] + ".js"
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
/******/ 	var jsonpArray = window["webpackJsonp_8404d628_4817_4b3a_883e_1c5a4d07892e_1_11_0"] = window["webpackJsonp_8404d628_4817_4b3a_883e_1c5a4d07892e_1_11_0"] || [];
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
/******/ 	  var regex = (typeof spScriptNamePattern !== 'undefined') ? spScriptNamePattern : new RegExp('\\/sp-rte(_[a-z0-9-]+)*\\.js', 'i');
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
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__);


var KillSwitches = /** @class */ (function () {
    function KillSwitches() {
    }
    KillSwitches.isTitleMatchSearchKillSwitchActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('052734c4-9204-4c4e-863d-7f74f901f6aa'), '07/18/2019', 'Inline page picker search using only CAML query');
    };
    KillSwitches.selectionChangeFix = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('1f7fc5b4-a34b-4177-a2b4-c865cc3b089b' /* '09/04/2019', 'WEX_selection_change' */);
    KillSwitches.removeSelectionChangeHandlers = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('0f968d1c-5322-47a7-ac8a-41a7630d3446' /* '11/06/2019', 'WEX_remove_selection_change_handler' */);
    /**
     * 07/30/2019
     * Fix RTE instance ready issue for setData
     */
    KillSwitches.ensureInstanceReady = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('6f522622-3f51-457b-b9a8-0206e88f3594' /*, 07/30/2019, Ensure_Instance_Ready */);
    KillSwitches.fixChangeEventNotGettingCalledForNonEnglishLangInCK = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('93d8627a-1624-4907-8520-1c84292e0cc4'
    /*, 10/02/2019, Fix_Change_Event_Not_Getting_Called_ForNonEnglishLangInCK */ );
    KillSwitches.rteToolboxOverlayKillSwitch = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('b01d9f45-648a-4fa0-b1dc-b76f28d9d227' /*, 09/03/2019, Rte toolbox overlay text box in IE11*/);
    KillSwitches.fixBoldFontWeightForIEAndFirefox = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('19501c78-0e11-4693-ada0-33fa54036423' /*, 10/21/2019, Fix font bold weight for IE and Firefox*/);
    KillSwitches.openPropertyPaneOnlyInEdit = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('6274049c-7758-44d3-b734-bf49c43c8bc7' /* '11/06/2019', 'Only open property pane in edit mode' */);
    KillSwitches.debounceSelectionChangeHandler = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('9e979668-5856-42f4-8150-726da18449b7' /*, 11/07/2019, Debounce selection change handler*/);
    KillSwitches.rteTypePerfWithUndo = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["KillSwitch"]('e15d451c-709d-4d3b-86c7-b630734e3a7b' /* '11/07/2019', 'Fix rte typing perf under undo-redo' */);
    return KillSwitches;
}());
/* harmony default export */ __webpack_exports__["default"] = (KillSwitches);


/***/ }),

/***/ "0szf":
/*!*************************************!*\
  !*** ./lib/rte/baseRte/BaseRte.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./BaseRte.css */ "IKxL");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "4x8+":
/*!******************************************************************!*\
  !*** ./lib/toolbar/DeferredComponents/DeferredToolbarSubmenu.js ***!
  \******************************************************************/
/*! exports provided: DeferredToolbarSubmenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredToolbarSubmenu", function() { return DeferredToolbarSubmenu; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


// tslint:disable-next-line:variable-name
var DeferredToolbarSubmenuComponent = react__WEBPACK_IMPORTED_MODULE_1__["lazy"](function () { return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../toolbarSubMenu/ToolbarSubmenu */ "fHAL"))
    .then(function (module) { return ({ default: module.ToolbarSubmenu }); }); });
var DeferredToolbarSubmenu = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DeferredToolbarSubmenu, _super);
    function DeferredToolbarSubmenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeferredToolbarSubmenu.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Suspense"], { fallback: false },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](DeferredToolbarSubmenuComponent, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props))));
    };
    return DeferredToolbarSubmenu;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "7w0S":
/*!**************************************!*\
  !*** ./lib/rte/common/TextParser.js ***!
  \**************************************/
/*! exports provided: TextParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextParser", function() { return TextParser; });
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * A collection of helper methods related to text parsing.
 */
var ZERO_WIDTH_SPACE = /\u200B/g;
var TextParser = /** @class */ (function () {
    function TextParser() {
    }
    TextParser.removeZeroWidthSpaces = function (text) {
        return text.replace(ZERO_WIDTH_SPACE, '');
    };
    return TextParser;
}());



/***/ }),

/***/ "Ayuq":
/*!**********************************************************!*\
  !*** ./lib/rte/formattingbar/SPRteFormattingBar.scss.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./SPRteFormattingBar.css */ "HuUu");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "Bd75":
/*!*********************************!*\
  !*** ./lib/common/Utilities.js ***!
  \*********************************/
/*! exports provided: Utilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utilities", function() { return Utilities; });
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rte_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rte/loc/RteStrings.resx */ "Dj9n");
// Copyright (c) Microsoft. All rights reserved.


var MAC_PLATFORM_IDENTIFIER = 'MacIntel';
var Utilities = /** @class */ (function () {
    function Utilities() {
    }
    Utilities.isTouchEnabled = function () {
        var platform = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["PlatformDetection"]();
        return platform.isAndroid || platform.isIOS;
    };
    Utilities.ShortcutText = function () {
        var isMac = navigator.platform === MAC_PLATFORM_IDENTIFIER;
        return isMac ? _rte_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].CommandShortcutOnMac : _rte_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].ControlShortcutOnWin;
    };
    return Utilities;
}());



/***/ }),

/***/ "Dj9n":
/*!****************************************!*\
  !*** ./lib/rte/loc/RteStrings.resx.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_acoNwVeh/QF9PsLoQfUb2A';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "HuUu":
/*!******************************************************!*\
  !*** ./lib/rte/formattingbar/SPRteFormattingBar.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./SPRteFormattingBar.css */ "iHOP");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "Hw4Z":
/*!******************************************!*\
  !*** ./lib/rte/ckeditor/CKTextEditor.js ***!
  \******************************************/
/*! exports provided: CKTextEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CKTextEditor", function() { return CKTextEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_sp_safehtml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/sp-safehtml */ "NEVa");
/* harmony import */ var _ms_sp_safehtml__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_safehtml__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _CKLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CKLoader */ "fdBK");
/* harmony import */ var _CKTextEditor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CKTextEditor.scss */ "jQov");
/* harmony import */ var _CKTextEditor_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CKTextEditor.types */ "bGc9");
/* harmony import */ var _common_ImageUtilities__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/ImageUtilities */ "x5Sg");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common/Flights */ "w4+A");
/* harmony import */ var _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./CKTableHelpers */ "zvHu");
/* harmony import */ var _common_AllowedClassNames__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common/AllowedClassNames */ "PhK/");
/* harmony import */ var _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../loc/RteStrings.resx */ "Dj9n");
/* harmony import */ var _ElementPath__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ElementPath */ "wpGb");
/* harmony import */ var _common_TextParser__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../common/TextParser */ "7w0S");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../common/KillSwitches */ "+ORw");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */

















/**
 * Implementation of IRichTextEditor for CKEditor @4.5.11
 */
var CKTextEditor = /** @class */ (function () {
    function CKTextEditor(options, onReadyCallback) {
        var _this = this;
        this.tryMatchText = function (delegate, range) {
            if (!range) {
                var selection = _this._editor.getSelection();
                if (selection) {
                    var ranges = selection.getRanges();
                    if (ranges && ranges.length) {
                        range = ranges[0];
                    }
                }
            }
            if (range) {
                if (!range.collapsed) {
                    return undefined;
                }
                return CKEDITOR.plugins.textMatch.match(range, delegate);
            }
            return undefined;
        };
        this._handlePaste = function (evt) {
            var evtData = evt && evt.data;
            var pastedData = evtData && evt.data.dataValue;
            try {
                if (_common_Flights__WEBPACK_IMPORTED_MODULE_9__["default"].isFluidPasteEnabled() &&
                    _this._onFluidPasteCallback &&
                    CKTextEditor._FLUID_PASTE_REGEX.test(pastedData)) {
                    var fluidAttribute = 'fluid-url';
                    // CK is doing some manipulation which is dropping the clipboard data we need so we're grabbing the raw data
                    pastedData = evt.data.dataTransfer && evt.data.dataTransfer._ && evt.data.dataTransfer._.nativeHtmlCache || '';
                    var tempDoc = document.implementation.createHTMLDocument();
                    var div = tempDoc.createElement('div');
                    // Ideally we sanitize this as well, but Scriptor is using a non-standard attribute
                    // Shouldn't be an issue since we never insert the div nor is it from the original document
                    div.innerHTML = pastedData;
                    var fluidUrl = div.querySelector("[" + fluidAttribute + "]");
                    _this._onFluidPasteCallback(fluidUrl && fluidUrl.getAttribute(fluidAttribute) || '', _this._extractHTMLAfterSelection());
                    // Null out values since we aren't supporting any other copy from Scriptor scenarios right now
                    evt.data.dataValue = pastedData = '';
                }
                if (pastedData) {
                    // Sanitize the pasted html
                    pastedData = _ms_sp_safehtml__WEBPACK_IMPORTED_MODULE_4__["SafeHtml"].clean(pastedData);
                    if (_this._isDemoteHeadingsInRTEEnabled) {
                        // This will convert headings H(n-1) -> H(n)
                        var headings = pastedData.match(CKTextEditor._HEADINGS_REGEX);
                        var headingLevel = 4;
                        if (headings && headings.length > 0) {
                            if (_this._onHeadingPasteCallback) {
                                _this._onHeadingPasteCallback();
                            }
                            for (var tag = headingLevel; tag > 1; tag--) {
                                if (pastedData.indexOf("h" + (tag - 1)) !== -1) {
                                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEvent(CKTextEditor._HEADING_PASTE);
                                    pastedData = pastedData.replace("h" + (tag - 1), "h" + tag);
                                }
                            }
                        }
                    }
                    evt.data.dataValue = pastedData;
                }
                // On Table paste
                if (pastedData) {
                    var tables = pastedData.match(CKTextEditor._TABLE_REGEX);
                    if (tables && tables.length > 0) {
                        // Log the table paste event
                        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEvent('Table.Paste');
                        var extraParagraph = '<p></p>';
                        // This makes sure we show a scroll bar on narrow devices
                        for (var _i = 0, tables_1 = tables; _i < tables_1.length; _i++) {
                            var table = tables_1[_i];
                            var outerDiv = new CKEDITOR.dom.element('div');
                            outerDiv.addClass(_CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].canvasRteResponsiveTableClassName);
                            outerDiv.setHtml(table);
                            var getTables = outerDiv.getElementsByTag('table');
                            var tableElement = getTables && getTables.getItem(0);
                            if (tableElement) {
                                if (tableElement.hasAttribute('style')) {
                                    tableElement.removeAttribute('style');
                                }
                                outerDiv = _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].wrapTableInDiv(tableElement, outerDiv);
                                var selection = _this._editor.getSelection();
                                if (selection) {
                                    var startElement = selection.getStartElement();
                                    var parent_1 = _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].findParent(startElement, _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].tableWrapperDivClass);
                                    if (parent_1 || (startElement && startElement.hasClass(_CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].tableWrapperDivClass))) {
                                        // Stop the event to prevent default table paste, inserting instead
                                        evt.stop();
                                        _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].insertTableAfterWrapper(startElement, outerDiv, parent_1, _this._editor);
                                    }
                                }
                            }
                            pastedData = pastedData.replace(table, outerDiv.getOuterHtml());
                        }
                        // Cursor positioning around tables is difficult. We add extra paragraphs before and after to reduce friction.
                        pastedData = extraParagraph + pastedData + extraParagraph;
                        evt.data.dataValue = pastedData;
                        _this._onImagePasteInsideTable(pastedData);
                    }
                    var imagesWithSrc = pastedData.match(CKTextEditor._IMAGE_REGEX_WITH_SRC);
                    if (imagesWithSrc && imagesWithSrc.length > 0) {
                        _this._onImagePasteInDataValue(evt, imagesWithSrc, pastedData);
                    }
                    else if (_this._onImagePasteCallBack) {
                        // Check if image is pasted without src
                        var imagesWithoutSrc = pastedData.match(CKTextEditor._IMAGE_REGEX_WITHOUT_CLOSING_TAG);
                        if (imagesWithoutSrc) {
                            _this._onImagePasteCallBack({ isImageValid: false, errorCode: 2 /* InvalidImageSource */ });
                        }
                    }
                    // evt.data.dataValue is not used because copied hyperlinks include <a> tag
                    var pastedUrl = '';
                    if (evtData &&
                        evt.data.dataTransfer &&
                        evt.data.dataTransfer.getData('Text')) {
                        pastedUrl = _ms_sp_safehtml__WEBPACK_IMPORTED_MODULE_4__["SafeHtml"].clean(evt.data.dataTransfer.getData('Text'));
                    }
                    _this._linkContentHandler(evt, pastedUrl);
                }
                else if (evt.data.dataTransfer &&
                    // if drag & drop kill switch is not activated and method is drop
                    // then we don't want to enter this loop because that will create 2 images
                    evt.data.method !== 'drop') {
                    // We don't want to support both files and pasted data because pasting tables from powerpoint and
                    // excel In Edge pastes table as image file that in not desirable behavior
                    for (var i = 0; i < evt.data.dataTransfer.getFilesCount(); i++) {
                        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEvent(CKTextEditor._IMAGE_PASTE);
                        _this._onImagePasteInChrome(evt.data.dataTransfer.getFile(i));
                    }
                }
                // After paste is buggy and does not get called every time. Adding this to make sure
                // the spinner goes away
                _this._handleAfterPaste();
            }
            catch (error) {
                if (_this._pasteQosMonitor) {
                    _this._pasteQosMonitor.writeUnexpectedFailure('PasteInRTEFailed', error);
                    _this._pasteQosMonitor = undefined;
                }
            }
        };
        this._initAutocomplete = function (itemsLimit) {
            if (itemsLimit === void 0) { itemsLimit = 20; }
            if (_this._autocompletePageSuggestions && _this._autocompleteHTMLToInsert) {
                var configs = {
                    textTestCallback: function (range) {
                        if (_this._autocompleteRegexMatches) {
                            for (var _i = 0, _a = _this._autocompleteRegexMatches; _i < _a.length; _i++) {
                                var match = _a[_i];
                                if (match) {
                                    // If tryMatchText doesn't have a match the object will be undefined.
                                    // this will return the first successful match.
                                    var regexMatch = _this.tryMatchText(match, range);
                                    if (regexMatch) {
                                        return regexMatch;
                                    }
                                }
                            }
                        }
                        else {
                            // Don't do anything if _autocompleteRegexMatches is null.
                            return undefined;
                        }
                    },
                    dataCallback: _this._autocompletePageSuggestions,
                    itemsLimit: itemsLimit,
                    itemTemplate: _ms_sp_safehtml__WEBPACK_IMPORTED_MODULE_4__["SafeHtml"].clean("<li data-id=\"{id}\" class=\"suggestionItemContainer\" title=\"{name}\"         aria-label=\"{name}\" aria-selected=\"false\"><div class=\"pageLabel\">{name}</div></li>")
                };
                _this._pagePickerAutocomplete = new CKEDITOR.plugins.autocomplete(_this._editor, configs);
                _this._pagePickerAutocomplete.getHtmlToInsert = _this._autocompleteHTMLToInsert;
                _this._pagePickerAutocomplete.view.element.setAttribute('aria-label', _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_12__["default"].SuggestedPageLabel);
                _this._pagePickerAutocomplete.view.element.setAttribute('data-automation-id', 'inLinePagePicker');
                _this._pagePickerAutocomplete.view.on('change-selectedItemId', function (evt) { return _this._setAriaSelected(evt, _this); });
                _this._pagePickerAutocomplete.model.on('change-selectedItemId', function (evt) { return _this._setAriaSelected(evt, _this); });
            }
        };
        this._handleTextChange = function () {
            if (_this._onTextChange) {
                _this._onTextChange();
            }
        };
        this._triggerChangeEvent = function () {
            try {
                var newData = _this._editor.getSnapshot();
                //  Checking if content changes can be skipped as change event does not guarantee
                //  this (see docs https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-change).
                if (newData !== _this._currentComposedHTML) {
                    _this._currentComposedHTML = newData;
                    _this._editor.fire('change');
                    if (_this._changeEventQosMonitor && !_this._changeEventQosMonitor.hasEnded) {
                        _this._changeEventQosMonitor.writeSuccess();
                    }
                }
                else if (_this._changeEventQosMonitor && !_this._changeEventQosMonitor.hasEnded) {
                    _this._changeEventQosMonitor.writeExpectedFailure('DataNotChanged');
                }
            }
            catch (error) {
                if (_this._changeEventQosMonitor && !_this._changeEventQosMonitor.hasEnded) {
                    _this._changeEventQosMonitor.writeUnexpectedFailure('TriggerChangeEventFailed', error);
                }
            }
        };
        this._config = options.config;
        this._editorElement = options.editorElement;
        this._handleSelectionChange = options.selectionChangeCallback;
        this._onTextChange = options.textChangeCallback;
        this._onReadyCallback = onReadyCallback;
        this._startupFocus = options.startUpFocus || false;
        this._onFluidPasteCallback = options.onFluidPasteCallback;
        this._onImagePasteCallBack = options.onImagePasteCallBack;
        this._onPasteCallback = options.onPasteCallback;
        this._onEmbedPasteCallback = options.onEmbedPasteCallback;
        this._onContextMenuCallBack = options.onContextMenuCallBack;
        this._isDemoteHeadingsInRTEEnabled = options.isDemoteHeadingsInRTEEnabled || false;
        this._onHeadingPasteCallback = options.onHeadingPasteCallback;
        this._extraPlugins = 'justify,tableresize,indentblock,textmatch';
        this._async = new _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["Async"](this);
        // Checking any of the possible suggestion matches.
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_9__["default"].isWikiFeatureFlightEnabled() || _common_Flights__WEBPACK_IMPORTED_MODULE_9__["default"].isAbbreviationFlightEnabled()) {
            this._extraPlugins += ',autocomplete,textwatcher';
            this._autocompleteRegexMatches = options.autocompleteRegexesMatch;
            this._autocompletePageSuggestions = options.autocompletePageSuggestions;
            this._autocompleteHTMLToInsert = options.autocompleteHTMLToInsert;
            this._insertLinkCallback = options.rteInsertLinkOnKeyDown;
        }
        // CK editor 4.8.0 is calling state change event too many times which is
        // hanging IE. So we need to debounce the event handler.
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["_BrowserDetection"].getBrowserInformation().browser === 4 /* IE */) {
            this._handleSelectionChange = this._async.debounce(this._handleSelectionChange, 100);
        }
        // Clicking inside the editor has become slow since this method gets called a lot.
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_15__["default"].debounceSelectionChangeHandler.isActivated()) {
            this._handleSelectionChangeConvert = this._async.debounce(this._handleSelectionChangeConvert, 100);
        }
        this._initialize(options.currentHTML);
        this._blockStyles = this._config.supportedFormatsArray.filter(function (format) {
            return format.isBlockStyle;
        });
    }
    /**
     * Preload ck editor
     */
    CKTextEditor.preloadEditor = function () {
        try {
            // Using 'void' to indicate we are not interested in the returned value.
            // This is an expected floating promise because we're trying to pre-load the CKEditor module without using it.
            // When next time the loadModule is called, the CKEditor module will be ready to use.
            void CKTextEditor.moduleLoader.loadModule();
        }
        catch (error) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logError(CKTextEditor.logSource, error);
        }
    };
    /**
     * @return Promise of the instance that resolves once the editor is loaded on the element
     *
     * Static wrapper for constructing an instance
     */
    CKTextEditor.createNewEditor = function (options) {
        return new Promise(function (resolve) {
            CKTextEditor.moduleLoader.loadModule()
                .then(function () {
                var editor = new CKTextEditor(options, function () { return resolve(editor); });
            })
                .catch(function (error) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logError(CKTextEditor.logSource, error);
            });
        });
    };
    CKTextEditor._isExternalImage = function (src) {
        return Boolean(src && src.indexOf('file://') === -1);
    };
    CKTextEditor._getSelectedLink = function (editor) {
        var selection = editor.getSelection();
        var selectedElement = selection.getSelectedElement();
        if (!selectedElement || !selectedElement.is('a')) {
            var ranges = selection.getRanges();
            if (ranges && ranges.length) {
                ranges[0].shrink(CKEDITOR.SHRINK_TEXT);
                selectedElement = editor.elementPath(ranges[0].getCommonAncestor()).contains('a', true);
            }
        }
        return selectedElement;
    };
    CKTextEditor._getSelectedText = function (editor) {
        var sel = editor.getSelection();
        if (sel) {
            var startElement = sel.getStartElement();
            // Return the start element inner text if it is already a link
            if (startElement) {
                var startElementValue = startElement.$;
                if (startElement && startElement.getName() === 'a') {
                    return startElementValue.innerText;
                }
            }
            // Otherwise, just return the selected text
            return sel.getSelectedText();
        }
        else {
            return undefined;
        }
    };
    CKTextEditor._isImagePastedInsideTableWithMultiplePasteEnabled = function (firstString, secondString) {
        return !!((firstString.match(CKTextEditor._TABLE_REGEX_WITHOUT_CLOSING_TAG) &&
            !firstString.match(CKTextEditor._TABLE_REGEX_WITHOUT_OPENING_TAG)) ||
            (!secondString.match(CKTextEditor._TABLE_REGEX_WITHOUT_CLOSING_TAG) &&
                secondString.match(CKTextEditor._TABLE_REGEX_WITHOUT_OPENING_TAG)));
    };
    CKTextEditor._stripOutImageSource = function (content, imageSrc) {
        return content.replace(imageSrc, '');
    };
    CKTextEditor.prototype.clearFormatting = function (start, end) {
        // Remove format command in ck editor only removes inline formats
        this.format(start, end, { removeFormat: true });
        // To remove block formats as well, we need to clear formats manually
        var sel = this._editor.getSelection();
        if (sel) {
            var ckRange = sel.getRanges();
            if (ckRange && ckRange.length > 0) {
                var formatsToClear = {};
                for (var _i = 0, _a = this._blockStyles; _i < _a.length; _i++) {
                    var format = _a[_i];
                    formatsToClear[format.editorKey] = false;
                }
                this.format(start, end, formatsToClear, true);
            }
        }
    };
    CKTextEditor.prototype.destroy = function () {
        if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_15__["default"].removeSelectionChangeHandlers.isActivated() && this._editorElement) {
            this._editorElement.removeEventListener('keyup', this._fakeSelectionChange);
            this._editorElement.removeEventListener('mouseup', this._fakeSelectionChange);
        }
        var data = this._editor.getData();
        this._editor.destroy();
        return data;
    };
    CKTextEditor.prototype.focus = function () {
        this._editor.focus();
    };
    CKTextEditor.prototype.getSelectedLink = function () {
        var selectedLink = CKTextEditor._getSelectedLink(this._editor);
        var link;
        if (selectedLink && selectedLink.$) {
            link = selectedLink.$.getAttribute('href');
        }
        return link || '';
    };
    CKTextEditor.prototype.getSelectedLinkAttribute = function (attribute) {
        var selectedLink = CKTextEditor._getSelectedLink(this._editor);
        if (selectedLink && selectedLink.$) {
            return selectedLink.$.getAttribute(attribute);
        }
        else {
            // Return null to keep consistent with Element.getAttribute.
            return null; // tslint:disable-line:no-null-keyword
        }
    };
    Object.defineProperty(CKTextEditor.prototype, "isTableSelected", {
        get: function () {
            var sel = this._editor.getSelection();
            var startElement = sel && sel.getStartElement();
            return Boolean(startElement && startElement.getName() === 'table');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CKTextEditor.prototype, "isTableContentsSelected", {
        get: function () {
            var sel = this._editor.getSelection();
            var startElement = sel && sel.getStartElement();
            return Boolean(startElement && startElement.getAscendant('table'));
        },
        enumerable: true,
        configurable: true
    });
    CKTextEditor.prototype.isTableStyleApplied = function (className) {
        var sel = this._editor.getSelection();
        var startElement = sel && sel.getStartElement();
        var table = startElement && startElement.getAscendant('table');
        return Boolean(table && table.hasClass(className));
    };
    /**
     * @param start - Start position of selection
     * @param end - End position of selection
     * @param formats - Map of key:value pairs for formats to apply
     * @param applyAllFormatsToLine - Forces all formats to be applied to the whole line(s). If not provided,
     * formats are divided into two buckets (line vs non-line) based on their isLine field
     *
     * A unified method for applying formats to any selection
     */
    CKTextEditor.prototype.format = function (start, end, formats, applyAllFormatsToLine) {
        /* tslint:disable-next-line:forin */
        for (var formatKey in formats) {
            var command = this._editor.getCommand(formatKey);
            if (command) {
                if (formats[formatKey] !== (command.state === CKEDITOR.TRISTATE_ON)) {
                    if (formatKey === 'link') {
                        if (formats[formatKey] === false) {
                            // Unlink
                            this._editor.execCommand(formatKey, formats[formatKey]);
                        }
                        else {
                            var linkProps = {
                                linkValue: formats[formatKey],
                                linkText: formats[CKTextEditor._TEXT_FORMAT_KEY],
                                shouldOpenInNewTab: formats[CKTextEditor._TAB_FORMAT_KEY]
                            };
                            if (_common_Flights__WEBPACK_IMPORTED_MODULE_9__["default"].isWikiFeatureFlightEnabled()) {
                                linkProps.linkClass = formats[CKTextEditor._CLASS_FORMAT_KEY];
                                linkProps.linkId = formats[CKTextEditor._LINK_ID_FORMAT_KEY];
                                linkProps.placeHolderLinkTitle = formats[CKTextEditor._LINK_PLACEHOLDER_KEY];
                            }
                            this._editor.execCommand(formatKey, linkProps);
                        }
                    }
                    else {
                        this._editor.execCommand(formatKey, formats[formatKey]);
                    }
                }
            }
        }
    };
    CKTextEditor.prototype.getBounds = function (position) {
        var left = 0, top = 0;
        // We are using window's selection object rather than CK editor because
        // the one coming from editor is not accurate
        var selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            var range = selection.getRangeAt(0);
            var selectionRect = range && range.getBoundingClientRect();
            if (selectionRect) {
                var editorRect = this._editorElement.getBoundingClientRect();
                left = selectionRect.left - editorRect.left;
                top = selectionRect.top - editorRect.top;
            }
        }
        return { left: left, top: top };
    };
    CKTextEditor.prototype.getFormatValue = function (start, end, format) {
        if (format.key === 'link') {
            var selectedLink = CKTextEditor._getSelectedLink(this._editor);
            return selectedLink ? selectedLink.getAttribute('href') : false;
        }
        return false;
    };
    CKTextEditor.prototype.getSelection = function () {
        var sel = this._editor.getSelection();
        if (sel) {
            var ranges = sel ? sel.getRanges() : undefined;
            if (ranges && ranges.length) {
                if (this._editor.element.contains(ranges[0].getCommonAncestor())) {
                    this._lastSelectedRanges = ranges;
                }
                return {
                    start: ranges[0].startOffset,
                    startContainerPath: Object(_ElementPath__WEBPACK_IMPORTED_MODULE_13__["generateElementPath"])(ranges[0].root, ranges[0].startContainer),
                    end: ranges[0].endOffset,
                    endContainerPath: Object(_ElementPath__WEBPACK_IMPORTED_MODULE_13__["generateElementPath"])(ranges[0].root, ranges[0].endContainer),
                    text: CKTextEditor._getSelectedText(this._editor)
                };
            }
        }
        return undefined;
    };
    CKTextEditor.prototype.getText = function (range) {
        return this._editor.getData();
    };
    CKTextEditor.prototype.setData = function (innerHTML, callback) {
        var options = {
            noSnapshot: true,
            callback: callback
        };
        this._editor.setData(innerHTML, options);
    };
    CKTextEditor.prototype.getHTML = function () {
        return this._editor.getData();
    };
    /**
     * @param format - Name of the format to apply from SPRTE_FORMATS
     * @param start - Start value of range
     * @param end - End value of range
     *
     * @return A dictionary of string=>boolean indicating if the format is applied to the given range
     */
    CKTextEditor.prototype.isFormatAppliedToRange = function (start, end, format) {
        // CKEditor is not refreshing the align table command correctly so we have to do this manually
        this._updateTableAlignCommandState();
        var command = this._editor.getCommand(format.editorKey);
        return command && command.state === CKEDITOR.TRISTATE_ON;
    };
    CKTextEditor.prototype.onReady = function (callback) {
        this._onReadyCallback = callback;
    };
    CKTextEditor.prototype.setSelection = function (range) {
        this.focus();
        var sel = this._editor.getSelection();
        if (sel) {
            if (_common_Flights__WEBPACK_IMPORTED_MODULE_9__["default"].isPageUndoRedoFlightEnabled()) {
                // This is setting the offset of selectedElement if it exists
                var ckRange = sel.getRanges();
                if (ckRange && ckRange.length > 0 && range.start !== -1) {
                    try {
                        var startContainerPath = range.startContainerPath, endContainerPath = range.endContainerPath, start = range.start, end = range.end;
                        if (startContainerPath && startContainerPath.length && endContainerPath && endContainerPath.length) {
                            var startContainer = Object(_ElementPath__WEBPACK_IMPORTED_MODULE_13__["getElementFromPath"])(ckRange[0].root, startContainerPath);
                            var endContainer = Object(_ElementPath__WEBPACK_IMPORTED_MODULE_13__["getElementFromPath"])(ckRange[0].root, endContainerPath);
                            if (startContainer && endContainer) {
                                ckRange[0].setStart(startContainer, start);
                                ckRange[0].setEnd(endContainer, end);
                                ckRange[0].select();
                                sel.selectRanges(ckRange);
                            }
                        }
                    }
                    catch (error) {
                        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logError(CKTextEditor.logSource, error);
                    }
                }
            }
            else {
                if (this._lastSelectedRanges) {
                    sel.selectRanges(this._lastSelectedRanges);
                }
                else {
                    // This is setting the offset of selectedElement if it exists
                    var ckRange = sel.getRanges();
                    if (ckRange && ckRange.length > 0 && range.start !== -1) {
                        ckRange[0].startOffset = range.start;
                        ckRange[0].endOffset = range.end;
                        try {
                            sel.selectRanges(ckRange);
                        }
                        catch (error) {
                            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logError(CKTextEditor.logSource, error);
                        }
                    }
                }
            }
        }
    };
    Object.defineProperty(CKTextEditor.prototype, "appliedFontSize", {
        get: function () {
            var fontSizeStr = this._getCssPropertyValue('font-size');
            if (fontSizeStr) {
                var fontArr = fontSizeStr ? fontSizeStr.split('px') : undefined;
                if (fontArr) {
                    return fontArr[0];
                }
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CKTextEditor.prototype, "appliedFontColor", {
        get: function () {
            return this._appliedPropertyValue('color');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CKTextEditor.prototype, "noColor", {
        get: function () {
            return 'noColor';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CKTextEditor.prototype, "appliedHighlightColor", {
        get: function () {
            return this._appliedPropertyValue('background-color');
        },
        enumerable: true,
        configurable: true
    });
    CKTextEditor.prototype.isContainerInList = function () {
        var selection = this._editor.getSelection();
        if (selection) {
            var ranges = selection.getRanges();
            if (ranges && ranges.length) {
                var parentNode = ranges[0].startContainer.$.parentNode;
                return (parentNode) ? parentNode.nodeName === 'LI' : false;
            }
        }
        return false;
    };
    CKTextEditor.prototype.deleteContentsInContainer = function (regex, startContainer) {
        if (!startContainer) {
            var selection = this._editor.getSelection();
            if (selection) {
                var ranges = selection.getRanges();
                if (ranges && ranges.length) {
                    startContainer = ranges[0].startContainer;
                }
            }
        }
        if (startContainer) {
            var oldText = startContainer.$.textContent || '';
            var newText = _common_TextParser__WEBPACK_IMPORTED_MODULE_14__["TextParser"].removeZeroWidthSpaces(oldText).replace(regex, '');
            startContainer.setText(newText);
        }
    };
    CKTextEditor.prototype._initialize = function (currentHTML) {
        this._editorElement.contentEditable = 'true';
        var pluginsToBeRemoved = 'menubutton,scayt,liststyle,magicline,link';
        // Roll the table selection only with new flight
        if (!_common_Flights__WEBPACK_IMPORTED_MODULE_9__["default"].isExternalCKEditorFlightEnabled()) {
            pluginsToBeRemoved += ',tableselection';
        }
        // data-interception is used to override fast routing and force open page in new tab.
        var config = {
            allowedContent: 'strong b em i u h2 h3 h4 blockquote ul ol li a[href, target, data-interception, data-sprte-link];\
        p li(ql-align-*,ql-indent-*,quote-true); *{text-align}; pre',
            on: {
                change: this._handleTextChange,
                selectionChange: this._handleSelectionChangeConvert
            },
            // CK editor 4.7.0 requires toolbar as necessary plugin.
            removePlugins: pluginsToBeRemoved,
            extraPlugins: 'justify,textmatch',
            removeButtons: '',
            stylesSet: false,
            toolbar: [],
            startupFocus: this._startupFocus
        };
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_9__["default"].isWikiFeatureFlightEnabled() && config.on) {
            config.on.key = this._handleKeyDown.bind(this);
        }
        // An exclamation mark (!) used before !href in the property list means that it is required
        // If an element does not have it, this rule should not be applied, the <a> tag will be removed.
        config.allowedContent = {
            'strong b em i u s sub sup': true,
            'p h2 h3 h4 blockquote ul ol li pre': {
                styles: 'text-align, margin-left, margin-right'
            },
            a: {
                attributes: (_common_Flights__WEBPACK_IMPORTED_MODULE_9__["default"].isWikiFeatureFlightEnabled()) ?
                    'title, !href, target, data-interception, data-sprte-link'
                    : '!href, target, data-interception',
                classes: (_common_Flights__WEBPACK_IMPORTED_MODULE_9__["default"].isWikiFeatureFlightEnabled()) ?
                    [CKTextEditor.placeHolderLinkClass, CKTextEditor.wikiLinkClass] :
                    ''
            },
            span: {
                classes: _common_Flights__WEBPACK_IMPORTED_MODULE_9__["default"].isFluentFlightEnabled()
                    ? _common_AllowedClassNames__WEBPACK_IMPORTED_MODULE_11__["spanClassNamesArray"].concat(_common_AllowedClassNames__WEBPACK_IMPORTED_MODULE_11__["fluentOnlySpanClassNamesArray"]).join(',')
                    : _common_AllowedClassNames__WEBPACK_IMPORTED_MODULE_11__["spanClassNamesArray"].join(',')
            }
        };
        config.allowedContent = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, config.allowedContent, { img: {
                attributes: 'src'
            } });
        /* If the flight is enabled for table paste, then add tables to allowed content
           Links, Lists and other formats are supported inside the table and tabbing allows you
           to create new rows */
        var allowedStyles = 'width,border,line-height,margin-bottom,margin-top;\
          ,margin-left,margin-right,font-size,border-bottom,border-left;\
          border-top,border-right,text-align';
        config.extraAllowedContent = {
            'tbody thead tfoot tr th td caption col colgroup footer': true,
            table: {
                attributes: 'width,border,cellpadding,cellspacing,align',
                styles: '*',
                classes: [
                    _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].canvasRteTableClassName,
                    'simpleTableStyleTheme,borderHeaderTableStyleTheme,filledHeaderTableStyleTheme,bandedRowTableStyleTheme,\
            bandedRowColumnTableStyleTheme,simpleTableStyleNeutral,borderHeaderTableStyleNeutral,\
            filledHeaderTableStyleNeutral,bandedRowTableStyleNeutral,bandedRowColumnTableStyleNeutral'
                ].join(',')
            },
            tr: {
                attributes: 'height,rowspan,colspan,align',
                styles: allowedStyles
            },
            td: {
                attributes: 'width,colspan,rowspan,align,valign',
                styles: allowedStyles
            },
            th: {
                attributes: 'align,valign',
                styles: allowedStyles
            },
            'td p': {
                attributes: 'align',
                styles: 'text-align'
            },
            'th p': {
                attributes: 'align',
                styles: 'text-align'
            },
            div: {
                classes: [
                    _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].canvasRteResponsiveTableClassName,
                    _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].tableWrapperDivClass,
                    _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].tableLeftAlign,
                    _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].tableCenterAlign,
                    _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].tableRightAlign
                ].join(','),
                styles: 'display'
            }
        };
        /* Add key strokes for table manipulation operations. VSO#305254: Workaround we are doing to enable these
        operations is by disabling context menu in ckeditor.js file in temporary-patches. We will use that file until
        ck editor adds a config option to disable context menu in the next version */
        config.keystrokes = [
            [CKEDITOR.CTRL + CKEDITOR.SHIFT + 68, 'rowDelete'],
            [CKEDITOR.CTRL + CKEDITOR.SHIFT + 65, 'rowInsertBefore'],
            [CKEDITOR.CTRL + CKEDITOR.SHIFT + 90, 'rowInsertAfter'] // Ctrl+Shift+Z
        ];
        // VSO#372510: CK Editor4.7.0 does provide this option but it doesnt work well. I have
        // kept this for reference but I still have to do hack of removing context menu
        // from ckeditor.js
        config.enableContextMenu = false;
        config.disallowedContent = 'script; *[on*]';
        config.extraPlugins = this._extraPlugins;
        config.disableNativeSpellChecker = false;
        this._editor = CKEDITOR.inline(this._editorElement, config);
        this._editor.setData(currentHTML);
        this._addCustomToolbarCommands(currentHTML);
    };
    CKTextEditor.prototype._addCustomToolbarCommands = function (html) {
        var _this = this;
        // Add our own link and unlink command
        this._editor.addCommand('unlink', {
            exec: function (editor) {
                var linkStyle = new CKEDITOR.style({
                    element: 'a',
                    type: CKEDITOR.STYLE_INLINE,
                    alwaysRemoveElement: 1
                });
                editor.removeStyle(linkStyle);
                return true;
            }
        });
        this._editor.addCommand('link', {
            contextSensitive: true,
            exec: function (editor, data) {
                if (!data || (!data.linkText && !data.linkValue)) {
                    editor.execCommand('unlink');
                }
                else {
                    var linkValue = data.linkValue, placeHolderLinkTitle = data.placeHolderLinkTitle;
                    var elem = CKTextEditor._getSelectedLink(editor);
                    if (elem) {
                        elem.setAttribute('href', linkValue);
                        elem.setAttribute('data-cke-saved-href', linkValue);
                        elem.setText(data.linkText);
                        elem.setAttribute('target', '_blank');
                        if (_common_Flights__WEBPACK_IMPORTED_MODULE_9__["default"].isWikiFeatureFlightEnabled()) {
                            elem.setAttribute(_CKTextEditor_types__WEBPACK_IMPORTED_MODULE_7__["HTMLAttribute"].Title, linkValue);
                            if (placeHolderLinkTitle) {
                                elem.setAttribute(_CKTextEditor_types__WEBPACK_IMPORTED_MODULE_7__["HTMLAttribute"].Class, CKTextEditor.placeHolderLinkClass);
                            }
                        }
                        // data-interception is used to override fast routing and force open page in new tab.
                        elem.setAttribute('data-interception', data.shouldOpenInNewTab ? 'off' : 'on');
                        elem.setAttribute('target', data.shouldOpenInNewTab ? '_blank' : '_self');
                    }
                    else {
                        var shouldOpenInNewTabProps = {};
                        shouldOpenInNewTabProps = {
                            target: data.shouldOpenInNewTab ? '_blank' : '_self',
                            'data-interception': data.shouldOpenInNewTab ? 'off' : 'on'
                        };
                        var attributes = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ href: linkValue, 'data-cke-saved-href': linkValue, target: '_blank' }, shouldOpenInNewTabProps);
                        if (_common_Flights__WEBPACK_IMPORTED_MODULE_9__["default"].isWikiFeatureFlightEnabled()) {
                            attributes[_CKTextEditor_types__WEBPACK_IMPORTED_MODULE_7__["HTMLAttribute"].Title] = data.linkValue;
                            if (data.linkId) {
                                attributes[_CKTextEditor_types__WEBPACK_IMPORTED_MODULE_7__["HTMLAttribute"].DataLink] = data.linkId;
                            }
                            if (placeHolderLinkTitle) {
                                attributes[_CKTextEditor_types__WEBPACK_IMPORTED_MODULE_7__["HTMLAttribute"].Class] = CKTextEditor.placeHolderLinkClass;
                            }
                        }
                        var linkStyle = new CKEDITOR.style({
                            name: 'link',
                            element: 'a',
                            type: CKEDITOR.STYLE_INLINE,
                            attributes: attributes
                        });
                        // If the linkText is not the selected text, create a new dom element and insert it in the editor
                        if (CKTextEditor._getSelectedText(editor) !== data.linkText || data.linkText === '') {
                            var element = new CKEDITOR.dom.element('a');
                            if (data.linkText && data.linkText !== '') {
                                element.setText(data.linkText);
                            }
                            else {
                                // Insert the new element with text same as url
                                element.setText(linkValue);
                            }
                            element.setAttributes(attributes);
                            editor.insertElement(element);
                        }
                        else {
                            editor.applyStyle(linkStyle);
                        }
                    }
                }
                return true;
            },
            refresh: function (editor, path) {
                var element = path.lastElement && path.lastElement.getAscendant('a', true);
                if (element && element.getName() === 'a' && element.getAttribute('href') && element.getChildCount()) {
                    this.setState(CKEDITOR.TRISTATE_ON);
                }
                else {
                    this.setState(CKEDITOR.TRISTATE_OFF);
                }
            }
        });
        this._editor.addCommand('fontSize', {
            contextSensitive: true,
            exec: function (editor, size) {
                // Remove the typecast when fluent flight is graduated
                var mappedValue = _common_Flights__WEBPACK_IMPORTED_MODULE_9__["default"].isFluentFlightEnabled() ?
                    CKTextEditor._fluentFontSizeMap.get(size) :
                    CKTextEditor._fontSizeMap.get(size);
                var sizeStyle = new CKEDITOR.style({
                    element: 'span',
                    attributes: { class: "fontSize" + mappedValue },
                    overrides: [{ element: 'span', attributes: { class: /^fontSize/ } }]
                });
                editor.applyStyle(sizeStyle);
                return true;
            }
        });
        this._editor.addCommand('customTable', {
            exec: function (editor, tableData) {
                var table = new CKEDITOR.dom.element('table');
                var tbody = new CKEDITOR.dom.element('tbody');
                var tr = new CKEDITOR.dom.element('tr');
                var outerDiv = new CKEDITOR.dom.element('div');
                outerDiv.addClass(_CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].canvasRteResponsiveTableClassName);
                for (var j = 0; j < tableData.columns; ++j) {
                    var td = new CKEDITOR.dom.element('td');
                    // Appending a br makes the tr in Edge start out at the appropriate height.
                    var br = new CKEDITOR.dom.element('br');
                    br.appendTo(td);
                    td.appendTo(tr);
                }
                tr.appendTo(tbody);
                for (var i = 1; i < tableData.rows; ++i) {
                    var trCopy = tr.clone(true, true);
                    trCopy.appendTo(tbody);
                }
                tbody.appendTo(table);
                table.setAttribute('title', _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_12__["default"].TableTitle);
                outerDiv = _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].wrapTableInDiv(table, outerDiv);
                // We don't want to insert a table inside the same wrapper div as another table
                // because alignment will not function properly.
                // So we check if the cursor is in a table wrapping div and insert it after if so.
                var selection = editor.getSelection();
                if (selection) {
                    var startElement = selection.getStartElement();
                    var parent_2 = _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].findParent(startElement, _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].tableWrapperDivClass);
                    _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].insertTableAfterWrapper(startElement, outerDiv, parent_2, editor);
                }
                else {
                    _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].insertExtraParagraph(outerDiv);
                    editor.insertElement(outerDiv);
                }
                return true;
            }
        });
        this._editor.addCommand('tableCustomDelete', {
            exec: function (editor) {
                var editorElementPath = editor && editor.elementPath();
                var table = editorElementPath && editorElementPath.contains('table', true);
                if (table) {
                    var parent_3 = _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].findParent(table, _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].tableWrapperDivClass);
                    if (parent_3) {
                        parent_3.$.outerHTML = '';
                    }
                }
                return true;
            }
        });
        this._editor.addCommand('tableStyle', {
            contextSensitive: true,
            exec: function (editor, styleData) {
                var editorElementPath = editor && editor.elementPath();
                var table = editorElementPath && editorElementPath.contains('table', true);
                _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].setTableStyle(table, styleData.tableStyle, styleData.styleColor, editor);
                return true;
            }
        });
        // We need to add same three commands here because of different refresh status.
        // The buttons in the editor needs to know exactly which class is applied to indicate
        // which format is active.
        this._editor.addCommand('alignCenterTable', {
            contextSensitive: true,
            exec: function (editor, alignType) {
                _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].setTableAlignment(editor, alignType);
                return true;
            }
        });
        this._editor.addCommand('alignRightTable', {
            contextSensitive: true,
            exec: function (editor, alignType) {
                _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].setTableAlignment(editor, alignType);
                return true;
            }
        });
        this._editor.addCommand('alignLeftTable', {
            contextSensitive: true,
            exec: function (editor, alignType) {
                _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].setTableAlignment(editor, alignType);
                return true;
            }
        });
        this._editor.addCommand('fontColor', {
            contextSensitive: true,
            exec: function (editor, fontColor) {
                if (fontColor === _this.noColor) {
                    editor.execCommand('removeFontColor');
                }
                else {
                    var colorStyle = new CKEDITOR.style({
                        element: 'span',
                        attributes: { class: "fontColor" + fontColor },
                        overrides: [{ element: 'span', attributes: { class: /^fontColor/ } }],
                        childRule: function (element) {
                            // This makes sure that <a> tag wraps <span> so that font color gets applied
                            return !element.is('a');
                        }
                    });
                    editor.applyStyle(colorStyle);
                }
                return true;
            },
            refresh: function (editor, path) {
                var element = path.lastElement;
                if (element.getComputedStyle('color')) {
                    editor.getCommand('fontColor').setState(CKEDITOR.TRISTATE_ON);
                }
                else {
                    editor.getCommand('fontColor').setState(CKEDITOR.TRISTATE_OFF);
                }
            }
        });
        this._editor.addCommand('removeFontColor', {
            exec: function (editor) {
                var colorStyle = new CKEDITOR.style({
                    element: 'span',
                    attributes: { class: /^fontColor/ },
                    overrides: [{ element: 'span', attributes: { class: /^fontColor/ } }]
                });
                editor.removeStyle(colorStyle);
                return true;
            }
        });
        this._editor.addCommand('highlightColor', {
            contextSensitive: true,
            exec: function (editor, color) {
                if (color === _this.noColor) {
                    return editor.execCommand('removeHighlightColor');
                }
                else {
                    var colorStyle = new CKEDITOR.style({
                        element: 'span',
                        attributes: { class: "highlightColor" + color },
                        overrides: [{ element: 'span', attributes: { class: /^highlightColor/ } }]
                    });
                    editor.applyStyle(colorStyle);
                    return true;
                }
            }
        });
        this._editor.addCommand('removeHighlightColor', {
            contextSensitive: true,
            exec: function (editor) {
                var colorStyle = new CKEDITOR.style({
                    element: 'span',
                    attributes: { class: /^highlightColor/ },
                    overrides: [{ element: 'span', attributes: { class: /^highlightColor/ } }]
                });
                editor.removeStyle(colorStyle);
                return true;
            }
        });
        this._editor.addCommand('pre', {
            contextSensitive: true,
            exec: function (editor, applyFormat) {
                var preFormatStyle = new CKEDITOR.style({
                    element: 'pre'
                });
                // CK editor returns an object when false is passed to the command so we need
                // to explicitely check for 'true' rather than checking if applyFormat is set
                if (applyFormat === true) {
                    editor.applyStyle(preFormatStyle);
                }
                else {
                    editor.removeStyle(preFormatStyle);
                }
                return true;
            },
            refresh: function (editor, path) {
                var preCommand = 'pre';
                var element = path.lastElement && path.lastElement.getAscendant(preCommand, true);
                if (element && element.getName() === preCommand) {
                    editor.getCommand(preCommand).setState(CKEDITOR.TRISTATE_ON);
                }
                else {
                    editor.getCommand(preCommand).setState(CKEDITOR.TRISTATE_OFF);
                }
            }
        });
        this._editor.addCommand('heading2', this._getHeadingCommandDefinition('h2'));
        this._editor.addCommand('heading3', this._getHeadingCommandDefinition('h3'));
        this._editor.addCommand('heading4', this._getHeadingCommandDefinition('h4'));
        this._editor.on('blur', this._handleSelectionChangeConvert);
        this._editor.on('loaded', this._handlePluginsLoaded);
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_15__["default"].ensureInstanceReady.isActivated()) {
            this._editor.on('instanceReady', this._handleInstanceReady.bind(this, html));
        }
        else {
            this._editor.on('instanceReady', this._handleInstanceReady.bind(this));
        }
        this._editor.on('paste', this._handlePaste);
        this._editor.on('beforePaste', this._onBeforePaste);
        this._editor.on('afterPaste', this._handleAfterPaste);
        var self = this;
        // For some reason, the handlers don't work here properly with ckeditor so we need to use
        // inline methods
        this._editor.on('contentDom', function () {
            this.editable().attachListener(this.editable(), 'contextmenu', function (evt) {
                var target = evt.data.getTarget() && evt.data.getTarget().$;
                if (target) {
                    var tagName = target.tagName;
                    var parentTagName = target.parentElement && target.parentElement.tagName;
                    if (tagName === 'TD' || parentTagName === 'TD') {
                        evt.stop();
                        evt.data.preventDefault();
                        if (self._onContextMenuCallBack) {
                            self._onContextMenuCallBack(true, target);
                        }
                    }
                }
            }, undefined, undefined, 0);
            var editableList = this.document.find('div.cke_editable');
            for (var editableIndex = 0; editableIndex < editableList.count(); editableIndex++) {
                var editable = editableList.getItem(editableIndex);
                var tableList = editable && editable.find('table');
                _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].constructTableComponentOnLoad(tableList, this);
            }
        });
    };
    CKTextEditor.prototype._handleSelectionChangeConvert = function (evt) {
        var sel = this._editor.getSelection();
        var newRange = undefined;
        var forceUpdate = false;
        if (evt) {
            switch (evt.name) {
                case 'selectionChange':
                    sel = evt.data.selection;
                    break;
                case 'blur':
                    sel = undefined;
                    break;
            }
            var ranges = sel ? sel.getRanges() : undefined;
            newRange =
                ranges && ranges.length
                    ? {
                        start: ranges[0].startOffset,
                        startContainerPath: Object(_ElementPath__WEBPACK_IMPORTED_MODULE_13__["generateElementPath"])(ranges[0].root, ranges[0].startContainer),
                        end: ranges[0].endOffset,
                        endContainerPath: Object(_ElementPath__WEBPACK_IMPORTED_MODULE_13__["generateElementPath"])(ranges[0].root, ranges[0].endContainer),
                        text: CKTextEditor._getSelectedText(this._editor)
                    }
                    : undefined;
            // Changes in selected element are invisible to SPRte, so we signal it through forceUpdate
            forceUpdate = Boolean(ranges &&
                ranges.length &&
                this._lastSelectedRanges &&
                this._lastSelectedRanges.length &&
                ranges[0].startContainer !== this._lastSelectedRanges[0].startContainer);
        }
        if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_15__["default"].selectionChangeFix.isActivated() || (newRange || forceUpdate)) {
            // This is getting called even while rendering RTE. We need to call this only when range changes
            // or we want to force update
            this._handleSelectionChange(newRange, forceUpdate);
        }
    };
    CKTextEditor.prototype._handleKeyDown = function (evt) {
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_9__["default"].isWikiFeatureFlightEnabled() && this._insertLinkCallback) {
            var url = this._insertLinkCallback(evt.data.keyCode);
            if (url && url.length) {
                this._linkContentHandler(evt, url);
            }
        }
    };
    CKTextEditor.prototype._isHeadingActive = function (tagName, path) {
        path = path || this._editor.elementPath();
        var element = path.lastElement && path.lastElement.getAscendant(tagName, true);
        return element && element.getName() === tagName;
    };
    CKTextEditor.prototype._getHeadingCommandDefinition = function (tagName) {
        var isHeadingActive = this._isHeadingActive;
        return {
            contextSensitive: true,
            exec: function (editor) {
                var styleDef;
                switch (tagName) {
                    case 'h2':
                        styleDef = editor.config.format_h2;
                        break;
                    case 'h3':
                        styleDef = editor.config.format_h3;
                        break;
                    case 'h4':
                        styleDef = editor.config.format_h4;
                        break;
                }
                if (!styleDef) {
                    return false;
                }
                var style = new CKEDITOR.style(styleDef);
                if (isHeadingActive(tagName)) {
                    editor.removeStyle(style);
                }
                else {
                    editor.applyStyle(style);
                }
                return true;
            },
            refresh: function (editor, path) {
                this.setState(isHeadingActive(tagName, path) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
            }
        };
    };
    CKTextEditor.prototype._fakeSelectionChange = function (evt) {
        /* tslint:disable-next-line:no-any */
        this._handleSelectionChangeConvert(evt);
    };
    CKTextEditor.prototype._handlePluginsLoaded = function (evt) {
        var _loop_1 = function (command) {
            if (this_1._config.supportedFormatsArray.filter(function (format) {
                return format.editorKey === command;
            }).length) {
                this_1._editor.commands[command].on('state', this_1._handleSelectionChangeConvert);
            }
        };
        var this_1 = this;
        // If the command is used by us, fire selectionChange handler if command state changes to update button states
        for (var command in this._editor.commands) {
            _loop_1(command);
        }
        // Fire selectionChange on keyup and mouseup events
        if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_15__["default"].removeSelectionChangeHandlers.isActivated() && this._editorElement) {
            // These handlers are slowing down typing and there seems to be no affect on editor
            // if we remove them.
            this._editorElement.addEventListener('keyup', this._fakeSelectionChange);
            this._editorElement.addEventListener('mouseup', this._fakeSelectionChange);
        }
    };
    CKTextEditor.prototype._appliedPropertyValue = function (propertyValue) {
        var color = this._getCssPropertyValue(propertyValue);
        if (color) {
            return CKEDITOR.tools.convertRgbToHex(color);
        }
        return undefined;
    };
    CKTextEditor.prototype._handleInstanceReady = function (html) {
        if (this._onReadyCallback) {
            this._onReadyCallback();
        }
        var ensureInstanceReadyKSActivated = _common_KillSwitches__WEBPACK_IMPORTED_MODULE_15__["default"].ensureInstanceReady.isActivated();
        if (!ensureInstanceReadyKSActivated && html && this._editor.getData() !== html) {
            this._editor.setData(html);
        }
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_9__["default"].isWikiFeatureFlightEnabled()) {
            this._initAutocomplete();
        }
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_15__["default"].fixChangeEventNotGettingCalledForNonEnglishLangInCK.isActivated()) {
            // CK editor does not call change event with MS IME for Japanese and other languages in IE and edge
            // Related issue: https://github.com/ckeditor/ckeditor4/issues/676
            if (!(CKEDITOR.env.ie || CKEDITOR.env.edge)) {
                return;
            }
            var editable = this._editor.editable();
            this._currentComposedHTML = this._editor.getSnapshot();
            if (!this._changeEventQosMonitor) {
                this._changeEventQosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"]('TriggerChangeEventInIEOrEdgeForNonEnglishLanguages');
            }
            editable.on('compositionstart', this._triggerChangeEvent);
            editable.on('compositionupdate', this._triggerChangeEvent);
            editable.on('compositionend', this._triggerChangeEvent);
        }
    };
    CKTextEditor.prototype._handleAfterPaste = function () {
        var _this = this;
        this._async.setTimeout(function () {
            try {
                if (_this._onPasteCallback && !_this._isAfterPasteCalled) {
                    _this._onPasteCallback(false);
                    _this._isAfterPasteCalled = true;
                }
                if (_this._pasteQosMonitor) {
                    _this._pasteQosMonitor.writeSuccess();
                    _this._pasteQosMonitor = undefined;
                }
            }
            catch (error) {
                if (_this._pasteQosMonitor) {
                    _this._pasteQosMonitor.writeUnexpectedFailure('FailedAfterPaste', error);
                    _this._pasteQosMonitor = undefined;
                }
            }
        }, CKTextEditor._PASTETIMEOUT);
    };
    CKTextEditor.prototype._onBeforePaste = function () {
        var _this = this;
        if (!this._pasteQosMonitor) {
            this._pasteQosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"]('PasteInRTE');
        }
        // We need to add timeout to avoid spinner from showing up while pasting
        // small amount of text
        this._async.setTimeout(function () {
            if (_this._onPasteCallback) {
                _this._onPasteCallback(true);
                _this._isAfterPasteCalled = false;
            }
        }, CKTextEditor._PASTETIMEOUT);
    };
    CKTextEditor.prototype._handleGenericUrl = function (pastedData) {
        if (this._onEmbedPasteCallback) {
            this._onEmbedPasteCallback(true /* isPasteInProgress */, pastedData);
        }
    };
    CKTextEditor.prototype._onImagePasteInDataValue = function (evt, images, pastedData) {
        /*
         * The logic for pasting one image is different since it breaks the RTE on selection.
         * we need to call _handleImageWithMixedContentPaste if:
         * - multiple images are pasted
         * - any image is pasted inside a table
         * - single image with text
         */
        var rteDataWithoutImages;
        var rteDataWithoutImagesLength;
        rteDataWithoutImages = this._removeImagesFromPasteData(pastedData);
        rteDataWithoutImagesLength = rteDataWithoutImages.length;
        if (images &&
            (images.length > 1 || rteDataWithoutImagesLength || this._isImagePastedInsideTable(pastedData))) {
            this._handleImageWithMixedContentPaste(evt, images, pastedData);
        }
        else {
            if (rteDataWithoutImagesLength === 0) {
                this._handleImageOnlyPaste(evt, images);
            }
            else {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEvent('ImageWrappedWithText.Paste');
                if (this._onImagePasteCallBack) {
                    this._onImagePasteCallBack({ isImageValid: false, errorCode: 2 /* InvalidImageSource */ });
                }
            }
        }
    };
    CKTextEditor.prototype._handleImageOnlyPaste = function (evt, images) {
        var splitedRTEData = this._extractHTMLAfterSelection();
        if (splitedRTEData) {
            for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
                var img = images_1[_i];
                var matchedSources = img.match(CKTextEditor._IMAGE_REGEX_SRC);
                var src = matchedSources && matchedSources[1] ? matchedSources[1] : undefined;
                if (src && CKTextEditor._isExternalImage(src)) {
                    evt.cancel();
                    evt.stop();
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEvent(CKTextEditor._IMAGE_PASTE);
                    var rteData = splitedRTEData || '';
                    if (this._onImagePasteCallBack) {
                        this._onImagePasteCallBack({
                            isImageValid: true,
                            imageBlob: this._handleBase64Image(src),
                            innerHTML: rteData
                        });
                    }
                }
                else {
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEvent('InvalidImageFile.Paste');
                    if (this._onImagePasteCallBack) {
                        this._onImagePasteCallBack({ isImageValid: false, errorCode: 2 /* InvalidImageSource */ });
                    }
                }
            }
        }
        else {
            // no-op. When `_extractHTMLAfterSelection` returns undefined, it has already invoked _onImagePasteCallBack
            // and reported error.
        }
    };
    CKTextEditor.prototype._handleImageWithMixedContentPaste = function (evt, images, pastedData) {
        var imagesWithSrc = pastedData.match(CKTextEditor._IMAGE_REGEX) || pastedData.match(CKTextEditor._IMAGE_REGEX_WITHOUT_CLOSING_TAG);
        var editorData = {
            preImageData: '',
            postImageData: ''
        };
        var remainderContent = pastedData;
        // We need to traverse the content backwards because CanvasStore.AddControlToCanvas() adds the
        // last control first. For example, if we have text1, Image web part, text2 so the controls will be
        // added in the canvas as text2 first, Image web part and then RTE1. This will mantain the order
        // of the content.
        for (var i = images.length - 1; i >= 0; i--) {
            var imageWithSrc = imagesWithSrc ? imagesWithSrc[i] : undefined;
            var matchedSource = images[i].match(CKTextEditor._IMAGE_REGEX_SRC);
            var src = matchedSource ? matchedSource[1] : undefined;
            if (src && CKTextEditor._isExternalImage(src) && imageWithSrc !== undefined) {
                evt.cancel();
                evt.stop();
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEvent(CKTextEditor._IMAGE_PASTE);
                // We should always use last index to handle repeated images.
                var lastIndex = remainderContent.lastIndexOf(imageWithSrc);
                editorData.preImageData = remainderContent.substr(0, lastIndex);
                editorData.postImageData = remainderContent.substr(lastIndex + imageWithSrc.length);
                var isImagePastedInTable = CKTextEditor._isImagePastedInsideTableWithMultiplePasteEnabled(editorData.preImageData, editorData.postImageData);
                if (!isImagePastedInTable &&
                    this._onImagePasteCallBack &&
                    CKTextEditor._IMAGE_REGEX_BASE64.test(src)) {
                    this._onImagePasteCallBack({
                        isImageValid: true,
                        imageBlob: this._handleBase64Image(src),
                        innerHTML: editorData.postImageData
                    });
                    remainderContent = editorData.preImageData;
                }
                else {
                    remainderContent = CKTextEditor._stripOutImageSource(remainderContent, imageWithSrc);
                    if (this._onImagePasteCallBack) {
                        var errorCode = isImagePastedInTable ?
                            1 /* PastedInTable */ :
                            2 /* InvalidImageSource */;
                        this._onImagePasteCallBack({ isImageValid: false, errorCode: errorCode });
                    }
                }
            }
            else {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEvent('InvalidImageFile.Paste');
                if (imageWithSrc !== undefined) {
                    remainderContent = CKTextEditor._stripOutImageSource(remainderContent, imageWithSrc);
                }
                if (this._onImagePasteCallBack) {
                    this._onImagePasteCallBack({ isImageValid: false, errorCode: 2 /* InvalidImageSource */ });
                }
            }
        }
        var innerHTML = this._editor.getData();
        innerHTML += remainderContent;
        this._editor.setData(innerHTML);
    };
    CKTextEditor.prototype._handleBase64Image = function (src) {
        var contentType = Object(_common_ImageUtilities__WEBPACK_IMPORTED_MODULE_8__["Base64MimeType"])(src);
        var b64Data = src.split(',').pop();
        return b64Data !== undefined ? Object(_common_ImageUtilities__WEBPACK_IMPORTED_MODULE_8__["Base64toBlob"])(b64Data, contentType) : undefined;
    };
    CKTextEditor.prototype._onImagePasteInsideTable = function (pastedData) {
        if (this._isImagePastedInsideTable(pastedData)) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEvent('ImageInsideTable.Paste');
            if (this._onImagePasteCallBack) {
                this._onImagePasteCallBack({ isImageValid: false, errorCode: 1 /* PastedInTable */ });
            }
        }
    };
    CKTextEditor.prototype._setAriaSelected = function (evt, editor) {
        if (editor._pagePickerAutocomplete) {
            var itemId = evt.data.toString();
            var suggestions = editor._pagePickerAutocomplete.view.element.$.children;
            for (var i = 0; i < suggestions.length; i++) {
                suggestions[i].setAttribute('aria-selected', String(suggestions[i].getAttribute('data-id') === itemId));
            }
        }
    };
    /**
     * Returns true if the image is pasted inside the table
     */
    CKTextEditor.prototype._isImagePastedInsideTable = function (data) {
        var tables = data.match(CKTextEditor._TABLE_REGEX);
        if (tables) {
            for (var _i = 0, tables_2 = tables; _i < tables_2.length; _i++) {
                var table = tables_2[_i];
                if (table.match(CKTextEditor._IMAGE_REGEX) || table.match(CKTextEditor._IMAGE_REGEX_WITHOUT_CLOSING_TAG)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Splits the pasted content into array. The method would be useful when we support
     * images wrapped with text
     */
    CKTextEditor.prototype._removeImagesFromPasteData = function (pastedData) {
        var images = pastedData.match(CKTextEditor._IMAGE_REGEX) || pastedData.match(CKTextEditor._IMAGE_REGEX_WITHOUT_CLOSING_TAG);
        if (!images) {
            return [];
        }
        var data = [];
        var temp = [];
        for (var _i = 0, images_2 = images; _i < images_2.length; _i++) {
            var img = images_2[_i];
            temp = pastedData.split(img);
            if (temp.length > 1) {
                // This can be an empty string which happens when image is at the beginning of the string being split
                if (temp[0]) {
                    data.push(temp[0]);
                }
                pastedData = temp[1];
            }
        }
        if (temp[1]) {
            data.push(temp[1]);
        }
        return data;
    };
    /**
     * Extract the data after current selection as HTML string.
     * The extracted part will be removed from the current editor.
     *
     * @returns - The extracted text. It returns undefined if image is HTML or the selection is not valid.
     */
    CKTextEditor.prototype._extractHTMLAfterSelection = function () {
        var innerHTML = this._editor.getData();
        // Block the image paste if the html or parent element is not valid
        if (this._validHTML(innerHTML) && this._isCurrentSelectionTagValid()) {
            var sel = this._editor.getSelection();
            var range = sel.getRanges()[0];
            if (range) {
                range.setEndAfter(this._editor.element);
                var rangeContentElement = range.extractContents();
                return rangeContentElement.getHtml() || '';
            }
        }
        this._handleAfterPaste();
        if (this._onImagePasteCallBack) {
            this._onImagePasteCallBack({ isImageValid: false, errorCode: 3 /* InvalidHTML */ });
        }
        return undefined;
    };
    CKTextEditor.prototype._isCurrentSelectionTagValid = function () {
        // Check the current selection tag name
        var tagName = this._editor.getSelection().getStartElement().$ && this._editor.getSelection().getStartElement().$.tagName;
        if (tagName === 'A') {
            return false;
        }
        // Check if the parent is also valid
        var parentElement = this._editor.getSelection().getStartElement().$.parentElement;
        tagName = parentElement ? parentElement.tagName : undefined;
        return Boolean(tagName && CKTextEditor._INVALID_TAGS.indexOf(tagName) === -1);
    };
    CKTextEditor.prototype._validHTML = function (html) {
        html = html.replace(/<[^>]*\/\s?>/g, ''); // Remove all self closing tags
        html = html.replace(/<(br|hr|img).*?>/g, ''); // Remove all <br>, <hr>, and <img> tags
        var openingTags = html.match(/<[^\/].*?>/g) || []; // Get remaining opening tags
        var closingTags = html.match(/<\/.+?>/g) || []; // Get remaining closing tags
        return openingTags.length === closingTags.length ? true : false;
    };
    CKTextEditor.prototype._linkContentHandler = function (evt, linkUrl) {
        var shouldHandleLinkPreview = CKTextEditor._GENERIC_URL_REGEX.test(linkUrl);
        var shouldHandleYoutubeEmbed = CKTextEditor._YOUTUBE_HTTPS_REGEX.test(linkUrl);
        if (shouldHandleLinkPreview || shouldHandleYoutubeEmbed) {
            evt.data.dataValue = '<a href="' + linkUrl + '">' + linkUrl + '</a>';
            this._handleGenericUrl(linkUrl);
        }
    };
    CKTextEditor.prototype._onImagePasteInChrome = function (src) {
        var data = this._extractHTMLAfterSelection();
        if (data) {
            if (this._onImagePasteCallBack) {
                this._onImagePasteCallBack({ isImageValid: true, imageBlob: src, innerHTML: data });
            }
        }
    };
    CKTextEditor.prototype._getActualBackgroundColor = function (elem, value) {
        // Background color is not inherited so we need to traverse the parent element
        // in case the color is applied to parent
        while (elem && (value === 'transparent' || value === 'rgba(0, 0, 0, 0)') && elem !== this._editorElement) {
            elem = elem.parentElement;
        }
        return elem ? window.getComputedStyle(elem).backgroundColor : 'transparent';
    };
    CKTextEditor.prototype._getCssPropertyValue = function (propertyValue) {
        var selection = this._editor.getSelection();
        if (selection) {
            var startElement = selection.getStartElement();
            var selectedText = selection.getSelectedText();
            if (startElement) {
                var value = window.getComputedStyle(startElement.$).getPropertyValue(propertyValue);
                if (propertyValue === 'background-color') {
                    return this._getActualBackgroundColor(startElement.$, value) || undefined;
                }
                else if (
                // For font-size, we need to check if the style overlaps in children divs
                propertyValue === 'font-size' &&
                    selectedText !== '' &&
                    this._isOverlappingStyles(startElement.$, value, 'fontSize', propertyValue)) {
                    return undefined;
                }
                return value;
            }
        }
        return undefined;
    };
    CKTextEditor.prototype._isOverlappingStyles = function (element, styleValue, className, propertyValue) {
        // We need to check if the style overlaps in children divs or not
        var children = element.querySelectorAll("span[class*=" + className + "]");
        for (var i = 0; i < children.length; i++) {
            var childValue = window.getComputedStyle(children[i]).getPropertyValue(propertyValue);
            if (childValue !== styleValue) {
                return true;
            }
        }
        return false;
    };
    CKTextEditor.prototype._updateTableAlignCommandState = function () {
        var sel = this._editor && this._editor.getSelection();
        if (sel) {
            var startElement = sel.getStartElement();
            _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].setAlignTableCommandState(startElement, _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].tableCenterAlign, this._editor.getCommand('alignCenterTable'));
            _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].setAlignTableCommandState(startElement, _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].tableLeftAlign, this._editor.getCommand('alignLeftTable'));
            _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].setAlignTableCommandState(startElement, _CKTableHelpers__WEBPACK_IMPORTED_MODULE_10__["default"].tableRightAlign, this._editor.getCommand('alignRightTable'));
        }
    };
    CKTextEditor.moduleLoader = new _CKLoader__WEBPACK_IMPORTED_MODULE_5__["default"]();
    CKTextEditor.placeHolderLinkClass = 'ms-missinglink'; // keep in sync with CSS and server
    CKTextEditor.wikiLinkClass = 'ms-wikilink'; // This is applied on server
    CKTextEditor.logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogSource"].create('SPRteCKTextEditor');
    CKTextEditor._IMAGE_REGEX = new RegExp('<img.+?/>', 'gi');
    CKTextEditor._IMAGE_REGEX_WITHOUT_CLOSING_TAG = new RegExp('<img.+?>', 'gi');
    CKTextEditor._TABLE_REGEX = new RegExp('<table([\\w\\W]+?)/table>', 'gi');
    CKTextEditor._TABLE_REGEX_WITHOUT_CLOSING_TAG = new RegExp('<table.+?>', 'gi');
    CKTextEditor._TABLE_REGEX_WITHOUT_OPENING_TAG = new RegExp('</table>', 'gi');
    // _IMAGE_REGEX_WITH_SRC returns all <img> tags in the content along with their source
    CKTextEditor._IMAGE_REGEX_WITH_SRC = new RegExp('<img.*?src="(.*?)"', 'gi');
    // _IMAGE_REGEX_WITH_SRC returns the source from <img> tag
    CKTextEditor._IMAGE_REGEX_SRC = new RegExp('<img.*?src="(.*?)"', 'i');
    CKTextEditor._IMAGE_REGEX_BASE64 = new RegExp('^data:', 'i');
    CKTextEditor._GENERIC_URL_REGEX = new RegExp('^https://.*|^http://.*', 'i');
    CKTextEditor._YOUTUBE_HTTPS_REGEX = new RegExp('^https://(www\.youtube\.com/.*|youtu\.be/.*)', 'i');
    CKTextEditor._HEADINGS_REGEX = new RegExp('<h[1-4].+?>(.*)<\/h[1-4]+>', 'gi');
    CKTextEditor._FLUID_PASTE_REGEX = new RegExp('<!--ScriptorStartFragment-->');
    CKTextEditor._IMAGE_PASTE = 'Image.Paste';
    CKTextEditor._HEADING_PASTE = 'DemoteHeading.Paste';
    CKTextEditor._PASTETIMEOUT = 5;
    CKTextEditor._INVALID_TAGS = ['TD', 'TR', 'OL', 'LI'];
    CKTextEditor._TEXT_FORMAT_KEY = 'linkText';
    CKTextEditor._CLASS_FORMAT_KEY = 'linkClass';
    CKTextEditor._TAB_FORMAT_KEY = 'shouldOpenInNewTab';
    CKTextEditor._LINK_ID_FORMAT_KEY = 'linkId';
    CKTextEditor._LINK_PLACEHOLDER_KEY = 'linkPlaceHolder';
    CKTextEditor._fontSizeMap = new Map([
        ["12" /* Small */, 'Small'],
        ["14" /* Medium */, 'Medium'],
        ["15" /* MediumPlus */, 'MediumPlus'],
        ["17" /* Large */, 'Large'],
        ["21" /* XLarge */, 'XLarge'],
        ["24" /* XLargePlus */, 'XLargePlus'],
        ["28" /* XxLarge */, 'XxLarge'],
        ["36" /* XxLargePlus */, 'XxLargePlus'],
        ["32" /* XxxLarge */, 'XxxLarge'],
        ["42" /* Super */, 'Super']
    ]);
    CKTextEditor._fluentFontSizeMap = new Map([
        ["10" /* XSmall */, 'XSmall'],
        ["12" /* Small */, 'Small'],
        ["12" /* Small */, 'Small'],
        ["14" /* Medium */, 'Medium'],
        ["16" /* MediumPlus */, 'MediumPlus'],
        ["18" /* Large */, 'Large'],
        ["20" /* XLarge */, 'XLarge'],
        ["24" /* XLargePlus */, 'XLargePlus'],
        ["28" /* XxLarge */, 'XxLarge'],
        ["36" /* XxLargePlus */, 'XxLargePlus'],
        ["32" /* XxxLarge */, 'XxxLarge'],
        ["42" /* Super */, 'Super'],
        ["68" /* Mega */, 'Mega']
    ]);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], CKTextEditor.prototype, "_initialize", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], CKTextEditor.prototype, "_handleSelectionChangeConvert", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], CKTextEditor.prototype, "_isHeadingActive", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], CKTextEditor.prototype, "_getHeadingCommandDefinition", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], CKTextEditor.prototype, "_fakeSelectionChange", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], CKTextEditor.prototype, "_handlePluginsLoaded", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], CKTextEditor.prototype, "_handleInstanceReady", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], CKTextEditor.prototype, "_handleAfterPaste", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], CKTextEditor.prototype, "_onBeforePaste", null);
    return CKTextEditor;
}());



/***/ }),

/***/ "I6O9":
/*!***************************************!*\
  !*** external "@microsoft/sp-loader" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_I6O9__;

/***/ }),

/***/ "IKxL":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/rte/baseRte/BaseRte.css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".cke_editable{cursor:text;padding:0 2px;min-height:68px;margin:0 0 -16px}.rte-webpart{overflow:hidden}.rte--edit a{pointer-events:none}.rte--read{min-height:0}.rte--read .canvasRteResponsiveTableSelected{border:1px solid \"[theme:neutraltertiary, default: #a6a6a6]\"}.cke_editable:focus{outline:0}.cke_editable:focus td[class*=cke_table-faked-selection]{background:\"[theme:themeLight, default: #c7e0f4]\"!important;border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px;border-style:solid}.fontWeightStrongForIEFireFox strong,.fontWeightStrong strong{font-weight:700}.cke_editable blockquote,.cke_editable div,.cke_editable h2,.cke_editable h3,.cke_editable h4,.cke_editable ol,.cke_editable p,.cke_editable ul{-webkit-font-smoothing:antialiased;line-height:1.3;margin:0 0 16px;word-wrap:break-word}.cke_editable .cke_table-faked-selection{background:\"[theme:themeLight, default: #c7e0f4]\"!important;border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px;border-style:solid}.cke_editable div,.cke_editable p{font-size:15px;font-weight:400}.cke_editable h2,.cke_editable h3,.cke_editable h4{font-weight:100!important}.cke_editable h2{font-size:24px}.cke_editable h3{font-size:21px}.cke_editable h4{font-size:17px;font-weight:300}.cke_editable ol,.cke_editable ul{font-size:15px;font-weight:400;padding:0;margin-left:0!important}.cke_editable ol li,.cke_editable ul li{margin-bottom:8px}.cke_editable ol{list-style-type:decimal}.cke_editable ul{list-style-type:disc}.cke_editable ol ol,.cke_editable ul ul{margin-top:8px;margin-bottom:8px}.cke_editable ul li ul li{list-style-type:circle}.cke_editable ul li ul li ul li{list-style-type:square}.cke_editable blockquote,.cke_editable div.quote-true{border-left:none;border-right:none;font-weight:100;font-size:24px;font-style:italic;margin:28px 0;padding:32px;text-align:center;font-family:Segoe UI Light WestEuropean,Segoe UI Light,Segoe WP Light,Segoe UI,Segoe WP,Tahoma,Arial,sans-serif}.cke_editable blockquote p{font-size:24px;margin:0}.cke_editable a{text-decoration:underline}.cke_editable i{font-style:italic}.cke_editable u{text-decoration:underline}@media screen and (min-width:480px){.cke_editable h2{font-size:28px}.cke_editable h3{font-size:24px}.cke_editable h4{font-size:21px}.cke_editable blockquote,.cke_editable div.quote-true{font-size:24px}}@media screen and (min-width:1024px){.cke_editable h2{font-size:28px}.cke_editable h3{font-size:24px}.cke_editable h4{font-size:21px}.cke_editable div,.cke_editable ol,.cke_editable p,.cke_editable ul{font-size:17px;font-weight:300;line-height:1.3}.cke_editable td,.cke_editable td p,.cke_editable th,.cke_editable th p{font-size:15px;font-weight:400}}.cke_editable:not(:focus):before{content:attr(placeholder);font-size:17px;font-weight:300;line-height:1.3;display:block}.isFluentRTE div,.isFluentRTE p{font-size:18px;font-weight:400;line-height:1.4}.isFluentRTE h2,.isFluentRTE h3,.isFluentRTE h4{font-weight:600!important}.isFluentRTE h2{font-size:28px}.isFluentRTE h3{font-size:24px}.isFluentRTE h4{font-size:20px;font-weight:600}.isFluentRTE ol,.isFluentRTE ul{font-size:18px;font-weight:400}.isFluentRTE blockquote,.isFluentRTE blockquote p,.isFluentRTE div.quote-true{font-weight:600;font-size:20px;line-height:1.4}.isFluentRTE td,.isFluentRTE td ol,.isFluentRTE td p,.isFluentRTE td ul,.isFluentRTE th,.isFluentRTE th p{font-size:16px;font-weight:400}.isFluent:not(:focus):before{content:attr(placeholder);font-size:18px;font-weight:400;line-height:1.4;display:block}", ""]);



/***/ }),

/***/ "KL1q":
/*!***********************************************************!*\
  !*** external "@microsoft/office-ui-fabric-react-bundle" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_KL1q__;

/***/ }),

/***/ "Kx4S":
/*!*******************************************************!*\
  !*** ./lib/rte/common/DeferredWikiPageSuggestions.js ***!
  \*******************************************************/
/*! exports provided: WikiPageSuggestionsLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WikiPageSuggestionsLoader", function() { return WikiPageSuggestionsLoader; });
function WikiPageSuggestionsLoader() {
    return __webpack_require__.e(/*! import() | sp-rte-wikipagesuggestions */ "sp-rte-wikipagesuggestions").then(__webpack_require__.bind(null, /*! ../ckeditor/WikiPageSuggestions */ "n2+o"))
        .then(function (module) { return module.WikiPageSuggestions; });
}


/***/ }),

/***/ "MxJZ":
/*!*****************************************!*\
  !*** ./lib/rte/baseRte/BaseRte.scss.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./BaseRte.css */ "0szf");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "NEVa":
/*!**********************************!*\
  !*** external "@ms/sp-safehtml" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_NEVa__;

/***/ }),

/***/ "PhK/":
/*!*********************************************!*\
  !*** ./lib/rte/common/AllowedClassNames.js ***!
  \*********************************************/
/*! exports provided: spanClassNamesArray, fluentOnlySpanClassNamesArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spanClassNamesArray", function() { return spanClassNamesArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fluentOnlySpanClassNamesArray", function() { return fluentOnlySpanClassNamesArray; });
var spanClassNamesArray = [
    'fontSizeSmall', 'fontSizeMedium', 'fontSizeMediumPlus', 'fontSizeLarge', 'fontSizeXLarge',
    'fontSizeXLargePlus', 'fontSizeXxLarge', 'fontSizeXxxLarge', 'fontSizeXxLargePlus', 'fontSizeSuper',
    'fontColorRedDark', 'fontColorRed', 'fontColorYellow', 'fontColorYellowLight', 'fontColorGreenLight',
    'fontColorGreen', 'fontColorBlueLight', 'fontColorBlue', 'fontColorBlueDark', 'fontColorPurple',
    'fontColorNeutralDark', 'fontColorNeutralPrimary', 'fontColorNeutralPrimaryAlt', 'fontColorNeutralSecondary',
    'fontColorNeutralTertiary', 'fontColorThemeDarker', 'fontColorThemeDark',
    'fontColorThemeDarkAlt', 'fontColorThemePrimary', 'fontColorThemeSecondary',
    'highlightColorYellow', 'highlightColorGreen', 'highlightColorAqua', 'highlightColorMagenta',
    'highlightColorBlue', 'highlightColorRed', 'highlightColorDarkBlue', 'highlightColorTeal',
    'highlightColorDarkGreen', 'highlightColorPurple', 'highlightColorMaroon', 'highlightColorGold',
    'highlightColorDarkGrey', 'highlightColorGrey', 'highlightColorBlack'
];
var fluentOnlySpanClassNamesArray = [
    'fontSizeXSmall',
    'fontSizeMega'
];


/***/ }),

/***/ "Pk8u":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Pk8u__;

/***/ }),

/***/ "QZHX":
/*!***************************************!*\
  !*** external "@ms/sp-dataproviders" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_QZHX__;

/***/ }),

/***/ "Qyis":
/*!*********************************!*\
  !*** ./lib/rte/a11y/RteA11y.js ***!
  \*********************************/
/*! exports provided: getFocusableChildren, isElementFocusable, getFocusableParent, getFirstFocusableChild, getFocusableDescendants, getFocusableSiblings, getNextFocusableElement, getPrevFocusableElement, isElementFocusableChildOf, navigateInside, navigateTo, navigateOutOf, ariaAlert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFocusableChildren", function() { return getFocusableChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElementFocusable", function() { return isElementFocusable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFocusableParent", function() { return getFocusableParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstFocusableChild", function() { return getFirstFocusableChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFocusableDescendants", function() { return getFocusableDescendants; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFocusableSiblings", function() { return getFocusableSiblings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNextFocusableElement", function() { return getNextFocusableElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPrevFocusableElement", function() { return getPrevFocusableElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElementFocusableChildOf", function() { return isElementFocusableChildOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigateInside", function() { return navigateInside; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigateTo", function() { return navigateTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigateOutOf", function() { return navigateOutOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ariaAlert", function() { return ariaAlert; });
/* harmony import */ var _RteA11y_module_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RteA11y.module.scss */ "iGqh");

function getFocusableChildren(elem, ignoreTabIndex) {
    if (ignoreTabIndex === void 0) { ignoreTabIndex = false; }
    var children = [];
    for (var _i = 0, _a = getFocusableDescendants(elem, ignoreTabIndex); _i < _a.length; _i++) {
        var descendant = _a[_i];
        if (isElementFocusableChildOf(descendant, elem)) {
            children.push(descendant);
        }
    }
    return children;
}
function isElementFocusable(elem, ignoreTabIndex) {
    if (ignoreTabIndex === void 0) { ignoreTabIndex = false; }
    var tagName = elem.tagName.toLowerCase();
    if (elem &&
        !elem.hidden &&
        elem.offsetParent &&
        window.getComputedStyle(elem).display !== 'none' &&
        window.getComputedStyle(elem).visibility !== 'hidden') {
        var tabIndexValue = elem.getAttribute('tabindex');
        var tabIndex = tabIndexValue === null ? undefined : parseInt(tabIndexValue, 10);
        if (!ignoreTabIndex && tabIndex !== undefined && tabIndex < 0) {
            return false;
        }
        if ((tagName === 'a' && !!elem.href) || elem.isContentEditable) {
            return true;
        }
        if ((tagName === 'button' || tagName === 'input' || tagName === 'select' || tagName === 'textarea') &&
            !elem.disabled) {
            return true;
        }
        /**
         * There are few cases like office-ui-fabric-react's dropdown control, which do not
         * use the conventional HTML elements to create dropdown. Instead they are using a
         * data attribute 'is-focusable' and making it focusable. Hence to respect those elements
         * added this check. Check this only when the 'ignoreTabIndex' is true, this is because when
         * user doesn't want to ignore tabindexes then tabindex will get preference over this attribute.
         */
        if (ignoreTabIndex && elem.getAttribute('data-is-focusable') === 'true') {
            return true;
        }
        if (!ignoreTabIndex && tabIndex !== undefined && tabIndex > -1) {
            return true;
        }
    }
    return false;
}
function getFocusableParent(elem, topElement) {
    if (topElement === void 0) { topElement = document.body; }
    var parent = elem.parentElement;
    while (parent && !isElementFocusable(parent) && parent !== topElement) {
        parent = parent.parentElement;
    }
    return parent;
}
function queryFocusableSelector(elem) {
    /* tslint:disable:quotemark */
    var selector = "button,input,textarea,select,a[href]:not([href='']),\
      [tabindex],[contenteditable='true'], [data-is-focusable='true']";
    /* tslint:enable:quotemark */
    return elem.querySelectorAll(selector);
}
function getFirstFocusableChild(elem, ignoreTabIndex) {
    if (ignoreTabIndex === void 0) { ignoreTabIndex = false; }
    var nodes = queryFocusableSelector(elem);
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (isElementFocusable(node, ignoreTabIndex)) {
            return node;
        }
    }
    return undefined;
}
function getFocusableDescendants(elem, ignoreTabIndex) {
    if (ignoreTabIndex === void 0) { ignoreTabIndex = false; }
    var descendants = [];
    var nodes = queryFocusableSelector(elem);
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (isElementFocusable(node, ignoreTabIndex)) {
            descendants.push(node);
        }
    }
    return descendants;
}
function getFocusableSiblings(elem, topElement) {
    if (topElement === void 0) { topElement = document.body; }
    var focusableParent = getFocusableParent(elem, topElement);
    var children = focusableParent ? getFocusableChildren(focusableParent) : [];
    // Remove input element and start the list from its next sibling
    var siblings = [];
    var insertPointer = 0;
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var child = children_1[_i];
        if (child !== elem) {
            siblings.splice(insertPointer++, 0, child);
        }
        else {
            insertPointer = 0;
        }
    }
    return siblings;
}
function getNextFocusableElement(elem, topElement) {
    if (topElement === void 0) { topElement = document.body; }
    var siblings = getFocusableSiblings(elem, topElement);
    return siblings[0];
}
function getPrevFocusableElement(elem, topElement) {
    if (topElement === void 0) { topElement = document.body; }
    var siblings = getFocusableSiblings(elem, topElement);
    return siblings[siblings.length - 1];
}
function isElementFocusableChildOf(elem, ancestor) {
    var parent = elem.parentElement;
    while (parent && parent.tagName !== 'BODY') {
        if (parent !== ancestor) {
            return true;
        }
        if (isElementFocusable(parent)) {
            break;
        }
        parent = parent.parentElement;
    }
    return false;
}
function navigateInside(elem) {
    var children = getFocusableChildren(elem);
    if (children.length) {
        children[0].focus();
        return true;
    }
    else {
        return false;
    }
}
function navigateTo(elem) {
    if (isElementFocusable(elem)) {
        elem.focus();
        return true;
    }
    else {
        return navigateInside(elem);
    }
}
function navigateOutOf(elem, topElement) {
    if (topElement === void 0) { topElement = document.body; }
    topElement = topElement || document.body;
    var focusableParent = getFocusableParent(elem, topElement);
    if (focusableParent) {
        focusableParent.focus();
    }
}
var ariaAlertElementId = 'aria_alert_' +
    Math.random()
        .toString()
        .substr(2);
function ariaAlert(message) {
    var oldAlert = document.querySelector('#' + ariaAlertElementId);
    if (oldAlert) {
        document.body.removeChild(oldAlert);
    }
    var alertNode = document.createElement('p');
    alertNode.classList.add(_RteA11y_module_scss__WEBPACK_IMPORTED_MODULE_0__["default"].screenReaderOnly);
    alertNode.setAttribute('role', 'alert');
    alertNode.setAttribute('id', ariaAlertElementId);
    var alertText = document.createTextNode(message);
    alertNode.appendChild(alertText);
    document.body.appendChild(alertNode);
}


/***/ }),

/***/ "SiiP":
/*!**********************************************!*\
  !*** ./lib/rte/common/DeferredPagePicker.js ***!
  \**********************************************/
/*! exports provided: default, DeferredLinkDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredLinkDataProvider", function() { return DeferredLinkDataProvider; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__);



var _pagePickerComponentId = 'e795d530-8fb6-425c-b864-b86735dbae1d';
var DeferredPagePicker = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DeferredPagePicker, _super);
    function DeferredPagePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeferredPagePicker.getInstance = function () {
        return this._getInstance();
    };
    DeferredPagePicker.prototype.create = function (config) {
        return new this._classType(config);
    };
    DeferredPagePicker.prototype._internalLoad = function () {
        return _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["SPComponentLoader"].loadComponentById(_pagePickerComponentId).then(function (module) {
            return module.PagePicker;
        });
    };
    return DeferredPagePicker;
}(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_DeferredClass"]));
/* harmony default export */ __webpack_exports__["default"] = (DeferredPagePicker);
var DeferredLinkDataProvider = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DeferredLinkDataProvider, _super);
    function DeferredLinkDataProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeferredLinkDataProvider.getInstance = function () {
        return this._getInstance();
    };
    DeferredLinkDataProvider.prototype.create = function (serviceScope) {
        return new this._classType(serviceScope);
    };
    DeferredLinkDataProvider.prototype._internalLoad = function () {
        return _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["SPComponentLoader"].loadComponentById(_pagePickerComponentId).then(function (module) {
            return module.LinkDataProvider;
        });
    };
    return DeferredLinkDataProvider;
}(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_DeferredClass"]));



/***/ }),

/***/ "TTLS":
/*!*****************************************!*\
  !*** ./lib/rte/a11y/RteA11y.module.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./RteA11y.module.css */ "u2U9");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "bGc9":
/*!************************************************!*\
  !*** ./lib/rte/ckeditor/CKTextEditor.types.js ***!
  \************************************************/
/*! exports provided: HTMLAttribute, SuggestionTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTMLAttribute", function() { return HTMLAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuggestionTypes", function() { return SuggestionTypes; });
var HTMLAttribute;
(function (HTMLAttribute) {
    HTMLAttribute["Title"] = "title";
    HTMLAttribute["DataLink"] = "data-sprte-link";
    HTMLAttribute["Class"] = "class";
})(HTMLAttribute || (HTMLAttribute = {}));
// Enum used to identify the suggestion type.
var SuggestionTypes;
(function (SuggestionTypes) {
    SuggestionTypes[SuggestionTypes["PageSuggestion"] = 0] = "PageSuggestion";
    SuggestionTypes[SuggestionTypes["TopicSuggestion"] = 1] = "TopicSuggestion";
})(SuggestionTypes || (SuggestionTypes = {}));


/***/ }),

/***/ "cDcd":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_cDcd__;

/***/ }),

/***/ "dFtb":
/*!*******************************************!*\
  !*** ./lib/rte/ckeditor/CKTextEditor.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./CKTextEditor.css */ "dU01");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "dU01":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/rte/ckeditor/CKTextEditor.css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".cke .cke_top{display:none}.cke_editable{overflow:hidden}[dir=ltr] .cke_editable{text-align:left}[dir=rtl] .cke_editable{text-align:right}.cke_editable .canvasRteResponsiveTable{overflow-x:auto;clear:both}.cke_editable .canvasRteResponsiveTable td[class*=cke_table-faked-selection]{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px;border-style:solid}.cke_editable .canvasRteResponsiveTable .simpleTableStyleNeutral{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid;border-collapse:collapse;color:\"[theme:neutralPrimary, default: #333333]\"}.cke_editable .canvasRteResponsiveTable .simpleTableStyleNeutral :not(.rteEmphasis){background-color:transparent}.cke_editable .canvasRteResponsiveTable .simpleTableStyleNeutral td,.cke_editable .canvasRteResponsiveTable .simpleTableStyleNeutral th,.cke_editable .canvasRteResponsiveTable .simpleTableStyleNeutral tr{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral tr:first-child{border-bottom-width:3px!important;border-color:\"[theme:neutralPrimary, default: #333333]\"!important}.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral tr:first-child td,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral tr:first-child td a,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral tr:first-child td p,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral tr:first-child th,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral tr:first-child th p{font-weight:700}.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral td,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral th,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral tr{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral tr:first-child{background-color:\"[theme:neutralPrimary, default: #333333]\"}.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral tr:first-child td,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral tr:first-child td a,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral tr:first-child td p,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral tr:first-child th,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral tr:first-child th p{color:\"[theme:white, default: #ffffff]\";font-weight:700}.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral td,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral th,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral tr{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr:first-child{background-color:\"[theme:neutralPrimary, default: #333333]\"}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr:first-child td,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr:first-child td a,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr:first-child td p,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr:first-child th,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr:first-child th p{color:\"[theme:white, default: #ffffff]\";font-weight:700}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr:nth-child(2n){background-color:\"[theme:neutralQuaternaryAlt, default: #dadada]\"}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral td,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral th,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child{background-color:\"[theme:neutralPrimary, default: #333333]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child td,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child td a,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child td p,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child th,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child th p{color:\"[theme:white, default: #ffffff]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:nth-child(2n){background-color:\"[theme:neutralQuaternaryAlt, default: #dadada]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child td,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child td a,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child td p,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child th,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child th p{font-weight:700}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:not(:first-child) td:first-child{background-color:\"[theme:neutralTertiaryAlt, default: #c8c8c8]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral td,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral th,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .simpleTableStyleTheme{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px!important;border-style:solid;border-collapse:collapse;color:\"[theme:neutralPrimary, default: #333333]\"}.cke_editable .canvasRteResponsiveTable .simpleTableStyleTheme :not(.rteEmphasis){background-color:transparent}.cke_editable .canvasRteResponsiveTable .simpleTableStyleTheme td,.cke_editable .canvasRteResponsiveTable .simpleTableStyleTheme th,.cke_editable .canvasRteResponsiveTable .simpleTableStyleTheme tr{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme tr:first-child{border-bottom-width:3px!important;border-color:\"[theme:themePrimary, default: #0078d4]\"!important}.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme tr:first-child td,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme tr:first-child td a,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme tr:first-child td p,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme tr:first-child th,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme tr:first-child th p{font-weight:700}.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme td,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme th,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme tr{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme tr:first-child{background-color:\"[theme:themePrimary, default: #0078d4]\"}.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme tr:first-child td,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme tr:first-child td a,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme tr:first-child td p,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme tr:first-child th,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme tr:first-child th p{color:\"[theme:white, default: #ffffff]\";font-weight:700}.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme td,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme th,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme tr{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr:first-child{background-color:\"[theme:themePrimary, default: #0078d4]\"}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr:first-child td,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr:first-child td a,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr:first-child td p,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr:first-child th,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr:first-child th p{color:\"[theme:white, default: #ffffff]\";font-weight:700}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr:nth-child(2n){background-color:\"[theme:themeLighter, default: #deecf9]\"}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme td,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme th,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child{background-color:\"[theme:themePrimary, default: #0078d4]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child td,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child td a,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child td p,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child th,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child th p{color:\"[theme:white, default: #ffffff]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:nth-child(2n){background-color:\"[theme:themeLighter, default: #deecf9]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child td,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child td a,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child td p,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child th,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child th p{font-weight:700}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:not(:first-child) td:first-child{background-color:\"[theme:themeLight, default: #c7e0f4]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme td,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme th,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px!important;border-style:solid}.cke_editable .tableWrapper{display:block;margin:0}.cke_editable .tableCenterAlign table{margin:0 auto}[dir=ltr] .cke_editable .tableLeftAlign table{margin-left:0}[dir=ltr] [dir=rtl] .cke_editable .tableLeftAlign table,[dir=rtl] .cke_editable .tableLeftAlign table{margin-right:0}[dir=rtl] [dir=rtl] .cke_editable .tableLeftAlign table{margin-left:0}[dir=ltr] [dir=rtl] .cke_editable .tableLeftAlign table{margin-left:auto}[dir=rtl] [dir=rtl] .cke_editable .tableLeftAlign table{margin-right:auto}[dir=ltr] .cke_editable .tableRightAlign table{margin-right:0}[dir=rtl] .cke_editable .tableRightAlign table{margin-left:0}[dir=ltr] .cke_editable .tableRightAlign table{margin-left:auto}[dir=rtl] .cke_editable .tableRightAlign table{margin-right:auto}[dir=ltr] [dir=rtl] .cke_editable .tableRightAlign table{margin-left:0}[dir=rtl] [dir=rtl] .cke_editable .tableRightAlign table{margin-right:0}div[data-cke-temp=\"1\"]{width:2px!important}div[data-cke-temp=\"1\"]:hover{background-color:\"[theme:themePrimary, default: #0078d4]\"!important;opacity:1!important;display:block!important}.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>tr>th{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px!important;border-style:solid}.cke_show_borders .canvasRteResponsiveTable table.cke_show_border,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>tr>th{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid}[dir=ltr] .cke_editable ol,[dir=ltr] .cke_editable ul{padding-left:50px}[dir=rtl] .cke_editable ol,[dir=rtl] .cke_editable ul{padding-right:50px}[dir=ltr] .cke_editable li:before{margin-left:-19px}[dir=rtl] .cke_editable li:before{margin-right:-19px}[dir=ltr] .cke_editable li:before{margin-right:4px}[dir=rtl] .cke_editable li:before{margin-left:4px}[dir=ltr] .cke_editable li:before{text-align:right}[dir=rtl] .cke_editable li:before{text-align:left}.cke_editable ol{counter-reset:item}.cke_editable ol>li{counter-increment:item}.cke_editable ol ol>li{display:block}.cke_editable ol ol>li:before{content:counter(item,lower-alpha) \". \"}.cke_editable table,.cke_editable td,.cke_editable th,.cke_editable tr{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid;border-collapse:collapse}.cke_editable table{margin-bottom:10px}.cke_editable td,.cke_editable td p,.cke_editable th,.cke_editable th p{font-size:15px;color:\"[theme:neutralPrimary, default: #333333]\";white-space:normal;font-weight:400;margin:0}.cke_editable th{font-weight:600;text-align:center}.cke_editable td,.cke_editable th{padding-top:8px;padding-bottom:8px;width:75px}[dir=ltr] .cke_editable td,[dir=ltr] .cke_editable th{padding-left:8px}[dir=rtl] .cke_editable td,[dir=rtl] .cke_editable th{padding-right:8px}[dir=ltr] .cke_editable td,[dir=ltr] .cke_editable th{padding-right:16px}[dir=ltr] [dir=rtl] .cke_editable td,[dir=ltr] [dir=rtl] .cke_editable th,[dir=rtl] .cke_editable td,[dir=rtl] .cke_editable th{padding-left:16px}[dir=rtl] [dir=rtl] .cke_editable td,[dir=rtl] [dir=rtl] .cke_editable th{padding-right:16px}[dir=ltr] [dir=rtl] .cke_editable td,[dir=ltr] [dir=rtl] .cke_editable th{padding-right:8px}[dir=rtl] [dir=rtl] .cke_editable td,[dir=rtl] [dir=rtl] .cke_editable th{padding-left:8px}.cke_editable td[valign=top]{padding-top:8px;padding-bottom:0}[dir=ltr] .cke_editable td[valign=top]{padding-left:8px}[dir=rtl] .cke_editable td[valign=top]{padding-right:8px}[dir=ltr] .cke_editable td[valign=top]{padding-right:16px}[dir=rtl] .cke_editable td[valign=top]{padding-left:16px}.cke_editable td[valign=bottom]{padding-top:0;padding-bottom:8px}[dir=ltr] .cke_editable td[valign=bottom]{padding-left:8px}[dir=rtl] .cke_editable td[valign=bottom]{padding-right:8px}[dir=ltr] .cke_editable td[valign=bottom]{padding-right:16px}[dir=rtl] .cke_editable td[valign=bottom]{padding-left:16px}.cke_editable td[align=center],.cke_editable td p[style*=\"text-align:center\"],.cke_editable td p[style*=\"text-align: center\"]{padding:8px 16px}.cke_editable td[align=left],.cke_editable td p[style*=\"text-align:left\"],.cke_editable td p[style*=\"text-align: left\"]{padding:8px 16px 8px 8px}.cke_editable td[align=right],.cke_editable td p[style*=\"text-align:right\"],.cke_editable td p[style*=\"text-align: right\"]{padding:8px 8px 8px 16px}.cke_editable tr td th:nth-last-child(n+20):first-child,.cke_editable tr td th:nth-last-child(n+20):first-child~*{padding:4px!important;font-size:10px!important}[dir=ltr] .cke_editable .ql-indent-1{padding-left:40px}[dir=rtl] .cke_editable .ql-indent-1{padding-right:40px}[dir=ltr] .cke_editable li.ql-indent-1{padding-left:59px}[dir=rtl] .cke_editable li.ql-indent-1{padding-right:59px}[dir=ltr] .cke_editable .ql-indent-2{padding-left:80px}[dir=rtl] .cke_editable .ql-indent-2{padding-right:80px}[dir=ltr] .cke_editable li.ql-indent-2{padding-left:99px}[dir=rtl] .cke_editable li.ql-indent-2{padding-right:99px}[dir=ltr] .cke_editable .ql-indent-3{padding-left:120px}[dir=rtl] .cke_editable .ql-indent-3{padding-right:120px}[dir=ltr] .cke_editable li.ql-indent-3{padding-left:139px}[dir=rtl] .cke_editable li.ql-indent-3{padding-right:139px}[dir=ltr] .cke_editable .ql-indent-4{padding-left:160px}[dir=rtl] .cke_editable .ql-indent-4{padding-right:160px}[dir=ltr] .cke_editable li.ql-indent-4{padding-left:179px}[dir=rtl] .cke_editable li.ql-indent-4{padding-right:179px}[dir=ltr] .cke_editable .ql-indent-5{padding-left:200px}[dir=rtl] .cke_editable .ql-indent-5{padding-right:200px}[dir=ltr] .cke_editable li.ql-indent-5{padding-left:219px}[dir=rtl] .cke_editable li.ql-indent-5{padding-right:219px}[dir=ltr] .cke_editable .ql-indent-6{padding-left:240px}[dir=rtl] .cke_editable .ql-indent-6{padding-right:240px}[dir=ltr] .cke_editable li.ql-indent-6{padding-left:259px}[dir=rtl] .cke_editable li.ql-indent-6{padding-right:259px}[dir=ltr] .cke_editable .ql-indent-7{padding-left:280px}[dir=rtl] .cke_editable .ql-indent-7{padding-right:280px}[dir=ltr] .cke_editable li.ql-indent-7{padding-left:299px}[dir=rtl] .cke_editable li.ql-indent-7{padding-right:299px}[dir=ltr] .cke_editable .ql-indent-8{padding-left:320px}[dir=rtl] .cke_editable .ql-indent-8{padding-right:320px}[dir=ltr] .cke_editable li.ql-indent-8{padding-left:339px}[dir=rtl] .cke_editable li.ql-indent-8{padding-right:339px}[dir=ltr] .cke_editable .ql-align-right{text-align:right}[dir=rtl] .cke_editable .ql-align-right{text-align:left}.cke_editable .ql-align-center{text-align:center}.cke_editable .fontColorRedDark{color:\"[theme:redDark, default: #a80000]\"}.cke_editable .fontColorRed{color:\"[theme:red, default: #e81123]\"}.cke_editable .fontColorYellow{color:\"[theme:yellow, default: #ffb900]\"}.cke_editable .fontColorYellowLight{color:\"[theme:yellowLight, default: #fff100]\"}.cke_editable .fontColorGreenLight{color:\"[theme:greenLight, default: #bad80a]\"}.cke_editable .fontColorGreen{color:\"[theme:green, default: #107c10]\"}.cke_editable .fontColorBlueLight{color:\"[theme:blueLight, default: #00bcf2]\"}.cke_editable .fontColorBlue{color:\"[theme:blue, default: #0078d4]\"}.cke_editable .fontColorBlueDark{color:\"[theme:blueDark, default: #002050]\"}.cke_editable .fontColorPurple{color:\"[theme:purple, default: #5c2d91]\"}.cke_editable .fontColorNeutralDark{color:\"[theme:neutralDark, default: #212121]\"}.cke_editable .fontColorNeutralPrimary{color:\"[theme:neutralPrimary, default: #333333]\"}.cke_editable .fontColorNeutralPrimaryAlt{color:\"[theme:neutralPrimaryAlt, default: #3c3c3c]\"}.cke_editable .fontColorNeutralSecondary{color:\"[theme:neutralSecondary, default: #666666]\"}.cke_editable .fontColorNeutralTertiary{color:\"[theme:neutralTertiary, default: #a6a6a6]\"}.cke_editable .fontColorThemeDarker{color:\"[theme:themeDarker, default: #004578]\"}.cke_editable .fontColorThemeDark{color:\"[theme:themeDark, default: #005a9e]\"}.cke_editable .fontColorThemeDarkAlt{color:\"[theme:themeDarkAlt, default: #106ebe]\"}.cke_editable .fontColorThemePrimary{color:\"[theme:themePrimary, default: #0078d4]\"}.cke_editable .fontColorThemeSecondary{color:\"[theme:themeSecondary, default: #2b88d8]\"}.cke_editable .fontSizeSmall{font-size:12px}.cke_editable .fontSizeMedium{font-size:14px}.cke_editable .fontSizeMediumPlus{font-size:15px}.cke_editable .fontSizeLarge{font-size:17px}.cke_editable .fontSizeXLarge{font-size:21px}.cke_editable .fontSizeXLargePlus{font-size:24px}.cke_editable .fontSizeXxLarge{font-size:28px}.cke_editable .fontSizeXxxLarge{font-size:32px}.cke_editable .fontSizeXxLargePlus{font-size:36px}.cke_editable .fontSizeSuper{font-size:42px}.cke_editable .fontSizeMedium,.cke_editable .fontSizeMediumPlus,.cke_editable .fontSizeSmall,.cke_editable .fontSizeSuper,.cke_editable .fontSizeXxLargePlus,.cke_editable .fontSizeXxxLarge{line-height:1.3}.cke_editable .highlightColorYellow{background-color:#ff0}.cke_editable .highlightColorGreen{background-color:#0f0}.cke_editable .highlightColorAqua{background-color:#0ff}.cke_editable .highlightColorMagenta{background-color:#f0f}.cke_editable .highlightColorBlue{background-color:#00f}.cke_editable .highlightColorRed{background-color:red}.cke_editable .highlightColorDarkBlue{background-color:navy}.cke_editable .highlightColorTeal{background-color:teal}.cke_editable .highlightColorDarkGreen{background-color:green}.cke_editable .highlightColorPurple{background-color:purple}.cke_editable .highlightColorMaroon{background-color:maroon}.cke_editable .highlightColorGold{background-color:olive}.cke_editable .highlightColorDarkGrey{background-color:grey}.cke_editable .highlightColorGrey{background-color:silver}.cke_editable .highlightColorBlack{background-color:#000}@media only screen and (max-width:640px){.cke_editable table,.cke_editable td,.cke_editable th{padding:8px!important;white-space:normal}.cke_editable table{max-width:600px!important}.cke_editable td p,.cke_editable td p span,.cke_editable th p,.cke_editable th p span{font-size:12px!important}}.cke_editable .ms-missinglink{text-decoration:none;background-image:-webkit-gradient(linear,left top,right top,color-stop(75%,\"[theme:themePrimary, default: #0078d4]\"),color-stop(75%,transparent));background-image:linear-gradient(90deg,\"[theme:themePrimary, default: #0078d4]\" 75%,transparent 0);background-position:0 1.12em;background-repeat:repeat-x;background-size:8px 1px}.isFluentRTE td,.isFluentRTE td p,.isFluentRTE th,.isFluentRTE th p{font-size:18px;font-weight:400}.isFluentRTE .fontSizeXSmall{font-size:10px}.isFluentRTE .fontSizeSmall{font-size:12px}.isFluentRTE .fontSizeMedium{font-size:14px}.isFluentRTE .fontSizeMediumPlus{font-size:16px}.isFluentRTE .fontSizeLarge{font-size:18px}.isFluentRTE .fontSizeXLarge{font-size:20px}.isFluentRTE .fontSizeXLargePlus{font-size:24px}.isFluentRTE .fontSizeXxLarge{font-size:28px}.isFluentRTE .fontSizeXxxLarge{font-size:32px}.isFluentRTE .fontSizeXxLargePlus{font-size:36px}.isFluentRTE .fontSizeSuper{font-size:42px}.isFluentRTE .fontSizeMega{font-size:68px}.isFluentRTE .fontSizeMedium,.isFluentRTE .fontSizeMediumPlus,.isFluentRTE .fontSizeMega,.isFluentRTE .fontSizeSmall,.isFluentRTE .fontSizeSuper,.isFluentRTE .fontSizeXSmall,.isFluentRTE .fontSizeXxLargePlus,.isFluentRTE .fontSizeXxxLarge{line-height:1.4}", ""]);



/***/ }),

/***/ "fHAL":
/*!******************************************************!*\
  !*** ./lib/toolbar/toolbarSubMenu/ToolbarSubmenu.js ***!
  \******************************************************/
/*! exports provided: ToolbarSubmenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarSubmenu", function() { return ToolbarSubmenu; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/sp-a11y */ "ytfe");
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ToolbarSubmenu_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ToolbarSubmenu.scss */ "sjA7");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file Contains ToolbarSubmenu class which is used to group related buttons in toolbar
 */






var DISPLAYBUTTON = 'displayButton';
/**
 * @class Submenu can be used in as toolbar item just like a button, to group a number of related buttons
 * that do different variations of an action (like text alignment). Only one of the buttons in a submenu
 * can be active at a time. The icon shown in the closed state is the icon of the active button
 */
var ToolbarSubmenu = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToolbarSubmenu, _super);
    function ToolbarSubmenu(props) {
        var _this = _super.call(this, props) || this;
        _this._menuElementRef = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._menuId = "ToolbarSubMenu_" + ++ToolbarSubmenu._INSTANCE_COUNT;
        if (props.a11yManagerId) {
            _this._a11yManager = _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3__["A11yManager"].getInstanceById(props.a11yManagerId);
        }
        // Submenu closed by default
        _this.state = {
            isOpen: props.isOpen
        };
        return _this;
    }
    ToolbarSubmenu.prototype.componentDidMount = function () {
        document.addEventListener('click', this._handleDocumentClick);
    };
    ToolbarSubmenu.prototype.componentDidUpdate = function (prevProps, prevState) {
        /**
         * If the user has navigated via keyboard,
         * Ensure focus isn't lost when navigating out of a submenu via the left/right arrow keys.
         * Set the focus back to the submenu active button.
         */
        if (this._isKeyboardNav && !this.state.isOpen && this._focusElement) {
            // Fall back to static focus method if a11yManager does not exist
            if (this._a11yManager) {
                this._a11yManager.focusTo(this._focusElement);
            }
            else {
                _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3__["Focus"].focusTo(this._focusElement);
            }
            this._focusElement = undefined;
            this._isKeyboardNav = false;
        }
        if (this._isKeyboardNav && this.state.isOpen && this._menuElement) {
            // Fall back to static focus method if a11yManager does not exist
            if (this._a11yManager) {
                this._a11yManager.focusInside(this._menuElement);
            }
            else {
                _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3__["Focus"].focusInside(this._menuElement);
            }
            // We need to reset this to false every time a user is navigating inside the submenu
            // It will be set to true when user uses down arrow key to open the submenu
            this._isKeyboardNav = false;
        }
    };
    ToolbarSubmenu.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (this.props.isOpen !== nextProps.isOpen) {
            this.setState({ isOpen: nextProps.isOpen });
        }
    };
    ToolbarSubmenu.prototype.componentWillUnmount = function () {
        document.removeEventListener('click', this._handleDocumentClick);
    };
    /**
     *  Render the submenu, depending on its open state
     */
    ToolbarSubmenu.prototype.render = function () {
        var _this = this;
        var openedCssClass = this.state.isOpen ? 'is-open' : '';
        var wideCssClass = this.props.isWide ? 'ToolbarSubmenu--wide' : '';
        var activeButton = this._getActiveButton();
        this._bindButtonClickHandlers();
        var buttonElements = [];
        this.props.buttons.forEach(function (buttonProps, index) {
            buttonElements.push(react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["ToolbarButton"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, buttonProps, { tabIndex: _this.state.isOpen ? 0 : -1, isActive: buttonProps === activeButton ? true : buttonProps.isActive, buttonProps: {
                    role: 'menuitem',
                    'aria-posinset': index + 1,
                    'aria-setsize': _this.props.buttons.length
                } })));
        });
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: "ToolbarSubmenu " + openedCssClass + " " + wideCssClass },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_4__["ToolbarButton"], { className: 'ToolbarSubmenu-displayButton', fabricIconKey: activeButton.fabricIconKey, iconClassName: activeButton.iconClassName, key: 'displayButton', onClick: this._handleClickOnDisplayButton, label: activeButton.label, tabIndex: this.state.isOpen ? -1 : 0, title: activeButton.title, onKeyDown: this._handleSubmenuItemsKeyDown, automationId: DISPLAYBUTTON, onBlur: this.props.onBlur, buttonProps: {
                    'aria-haspopup': true,
                    'aria-expanded': this.state.isOpen,
                    'aria-controls': this._menuId
                } }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["Icon"], { className: 'ToolbarSubmenu-caret', iconName: 'CaretDownSolid8' }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["FocusZone"], { isCircularNavigation: true },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { id: this._menuId, role: 'menu', className: 'ToolbarSubmenu-menuItems', ref: this._menuElementRef, onKeyDown: this._handleSubmenuKeyDown, "data-automation-id": 'subMenuContainer' }, buttonElements))));
    };
    Object.defineProperty(ToolbarSubmenu.prototype, "_menuElement", {
        get: function () {
            return this._menuElementRef.current;
        },
        enumerable: true,
        configurable: true
    });
    ToolbarSubmenu.prototype._bindButtonClickHandlers = function () {
        // Bind submenu button click handler to the exisiting one for each button
        // This makes sure the submenu closes after the action is done
        for (var _i = 0, _a = this.props.buttons; _i < _a.length; _i++) {
            var buttonProps = _a[_i];
            buttonProps.onClick = this._handleOnButtonClick.bind(this, buttonProps.onClick);
        }
    };
    /**
     * Return the props of the currently active button
     */
    ToolbarSubmenu.prototype._getActiveButton = function () {
        for (var _i = 0, _a = this.props.buttons; _i < _a.length; _i++) {
            var button = _a[_i];
            if (button.isActive) {
                return button;
            }
        }
        // No active button found, return the first one
        return this.props.buttons[0];
    };
    ToolbarSubmenu.prototype._handleSubmenuKeyDown = function (e) {
        if (this.state.isOpen && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
            this._isKeyboardNav = true;
            this._handleCloseSubmenu();
        }
    };
    ToolbarSubmenu.prototype._handleSubmenuItemsKeyDown = function (e) {
        if (e.key === 'ArrowDown') {
            this._isKeyboardNav = true;
            this._handleOpenSubmenu();
        }
    };
    ToolbarSubmenu.prototype._handleClickOnDisplayButton = function () {
        if (this.state.isOpen) {
            this._handleCloseSubmenu();
        }
        else {
            this._handleOpenSubmenu();
        }
    };
    ToolbarSubmenu.prototype._handleOpenSubmenu = function () {
        this._focusElement = document.activeElement;
        if (this.props.onOpen) {
            this.props.onOpen();
        }
        this.setState({ isOpen: true });
    };
    ToolbarSubmenu.prototype._handleCloseSubmenu = function (isDocumentClick) {
        this.setState({ isOpen: false });
        if (this.props.onClose) {
            this.props.onClose(isDocumentClick);
        }
    };
    /**
     * @param onClickAction - The original onClick callback passed for the button
     *
     * Closes the submenu after calling the action of the button
     * All the button props must be updated to use this function as their onClick handler
     */
    ToolbarSubmenu.prototype._handleOnButtonClick = function (onClickCallback) {
        onClickCallback();
        // Close the submenu to the OnClick behavior of each button
        this._handleCloseSubmenu();
    };
    ToolbarSubmenu.prototype._handleDocumentClick = function (evt) {
        var currentTarget = evt.target;
        if (this.state.isOpen &&
            currentTarget.getAttribute('data-automation-id') !== DISPLAYBUTTON &&
            currentTarget.parentElement &&
            currentTarget.parentElement.getAttribute('data-automation-id') !== DISPLAYBUTTON) {
            this._handleCloseSubmenu(true);
        }
    };
    ToolbarSubmenu._INSTANCE_COUNT = 0;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], ToolbarSubmenu.prototype, "_bindButtonClickHandlers", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], ToolbarSubmenu.prototype, "_handleSubmenuKeyDown", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], ToolbarSubmenu.prototype, "_handleSubmenuItemsKeyDown", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], ToolbarSubmenu.prototype, "_handleClickOnDisplayButton", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], ToolbarSubmenu.prototype, "_handleOpenSubmenu", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], ToolbarSubmenu.prototype, "_handleCloseSubmenu", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], ToolbarSubmenu.prototype, "_handleOnButtonClick", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], ToolbarSubmenu.prototype, "_handleDocumentClick", null);
    return ToolbarSubmenu;
}(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));



/***/ }),

/***/ "faye":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_faye__;

/***/ }),

/***/ "fdBK":
/*!**************************************!*\
  !*** ./lib/rte/ckeditor/CKLoader.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/Flights */ "w4+A");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */


var CKEDITOR_PATH_KEY = 'CKEDITOR_BASEPATH';
var CKLoader = /** @class */ (function () {
    function CKLoader() {
    }
    CKLoader._setup = function () {
        CKEDITOR.disableAutoInline = true;
    };
    CKLoader.prototype.loadModule = function () {
        if (!CKLoader._editorPromise) {
            var externalCKEditorFlightEnabled = _common_Flights__WEBPACK_IMPORTED_MODULE_1__["default"].isExternalCKEditorFlightEnabled();
            var editorPath = __webpack_require__.p + (externalCKEditorFlightEnabled ? "sp-ckeditor-flight_63f8561c403ce08093093b1812fb05db/" : "sp-ckeditor_a3550c2a938d3893b1442ccfa2e98e42/");
            window[CKEDITOR_PATH_KEY] = editorPath;
            if (externalCKEditorFlightEnabled) {
                // prettier-ignore
                CKLoader._editorPromise = __webpack_require__.e(/*! import() | sp-canvas-sp-ckeditor-flight */ "vendors~sp-canvas-sp-ckeditor-flight").then(__webpack_require__.t.bind(null, /*! @ms/sp-ckeditor-flight */ "Arrh", 7));
            }
            else {
                // prettier-ignore
                CKLoader._editorPromise = __webpack_require__.e(/*! import() | sp-canvas-sp-ckeditor */ "vendors~sp-canvas-sp-ckeditor").then(__webpack_require__.t.bind(null, /*! @ms/sp-ckeditor */ "5CF4", 7));
            }
        }
        CKLoader._editorPromise = CKLoader._editorPromise
            .then(function (editor) {
            CKLoader._setup();
            return editor;
        })
            .catch(function (error) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(CKLoader.logSource, error);
            throw (error);
        });
        return CKLoader._editorPromise;
    };
    CKLoader.logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogSource"].create('SPRteCKLoader');
    return CKLoader;
}());
/* harmony default export */ __webpack_exports__["default"] = (CKLoader);


/***/ }),

/***/ "hiL/":
/*!*********************************************!*\
  !*** external "@ms/sp-component-utilities" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_hiL___;

/***/ }),

/***/ "iGqh":
/*!*********************************************!*\
  !*** ./lib/rte/a11y/RteA11y.module.scss.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./RteA11y.module.css */ "TTLS");
var styles = {
    screenReaderOnly: 'screenReaderOnly_41a5c7a7'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "iHOP":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/rte/formattingbar/SPRteFormattingBar.css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".rteFlyout-visible{position:absolute;z-index:2;-webkit-box-shadow:0 0 5px 0 #c8c8c8;box-shadow:0 0 5px 0 #c8c8c8;top:-45px;font-weight:400}@media (max-width:720px){.rteFlyout-visible .rteFlyout-button{padding:10px;font-size:11px}}.rteFlyout-visible .rteFlyout-button:hover{background:#0078d4}.rteFlyout-visible .rteFlyout-button .ms-Icon{padding:13px;color:#767676;font-size:14px!important}.rteFlyout-visible .rteFlyout-button:hover .ms-Icon{color:#fff}.rteFlyout-visible .rteFlyout-button img{vertical-align:middle;display:inline-block}.rteFlyout-visible .stack-panel-class{background:\"[theme:neutralPrimary, default: #323130]\"}.rteFlyout-button{background-color:transparent;border-width:0;padding:0;cursor:pointer!important}.stack-panel-class{white-space:nowrap}.SPRteFormattingBar{-webkit-animation-name:ms-fadeIn,ms-slideUpIn10;animation-name:ms-fadeIn,ms-slideUpIn10;-webkit-animation-duration:167ms;animation-duration:167ms;-webkit-animation-timing-function:cubic-bezier(.1,.25,.75,.9);animation-timing-function:cubic-bezier(.1,.25,.75,.9);-webkit-animation-fill-mode:both;animation-fill-mode:both;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;background-color:\"[theme:neutralPrimary, default: #323130]\";-webkit-transition:all 367ms cubic-bezier(.1,.9,.2,1);transition:all 367ms cubic-bezier(.1,.9,.2,1);min-width:418px;max-width:none}@media (prefers-reduced-motion:reduce){.SPRteFormattingBar{-webkit-animation:none;animation:none}}[dir=ltr] .SPRteFormattingBar .ToolbarButton,[dir=ltr] .SPRteFormattingBar .ToolbarSubmenu{float:left}[dir=rtl] .SPRteFormattingBar .ToolbarButton,[dir=rtl] .SPRteFormattingBar .ToolbarSubmenu{float:right}.SPRteFormattingBar.faded{display:none}.SPRteFormattingBar-divider{height:16px;margin-top:8px;width:0;border-right:1px solid}[dir=ltr] .SPRteFormattingBar-divider{float:left}[dir=rtl] .SPRteFormattingBar-divider{float:right}.msIcon_h2_temp:after{content:\"H2\";font-size:16px;font-style:normal;font-weight:600}.button_quote_temp .ms-Icon{font-size:28px!important;font-weight:100;line-height:1.7!important}.formattingBarFocusZone{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;width:100%}.button_linkRemove_temp .ms-Icon:after{content:\"x\";font-family:Arial}[dir=ltr] .button_linkRemove_temp .ms-Icon:after{margin-left:-5px}[dir=rtl] .button_linkRemove_temp .ms-Icon:after{margin-right:-5px}[dir=ltr] .button_linkRemove_temp .ms-Icon:after{margin-right:5px}[dir=rtl] .button_linkRemove_temp .ms-Icon:after{margin-left:5px}", ""]);



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

/***/ "jQov":
/*!***********************************************!*\
  !*** ./lib/rte/ckeditor/CKTextEditor.scss.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./CKTextEditor.css */ "dFtb");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "k/1b":
/*!**************************************!*\
  !*** ./lib/rte/common/RegexMatch.js ***!
  \**************************************/
/*! exports provided: RegexMatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegexMatch", function() { return RegexMatch; });
/* harmony import */ var _TextParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextParser */ "7w0S");

/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * A collection of helper methods related to text parsing.
 */
var RegexMatch = /** @class */ (function () {
    function RegexMatch() {
    }
    RegexMatch.match = function (regex, text, offset) {
        var slice = _TextParser__WEBPACK_IMPORTED_MODULE_0__["TextParser"].removeZeroWidthSpaces(text.slice(0, offset));
        var match = slice.match(regex);
        return (match) ? { start: match.index, end: offset } : undefined;
    };
    return RegexMatch;
}());



/***/ }),

/***/ "k/9N":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolbar/toolbarSubMenu/ToolbarSubmenu.css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".ToolbarSubmenu{width:44px;position:relative}.ToolbarSubmenu .ToolbarButton{width:44px}[dir=ltr] .ToolbarSubmenu-displayButton{padding-right:20px}[dir=rtl] .ToolbarSubmenu-displayButton{padding-left:20px}.ToolbarSubmenu-caret{color:\"[theme:neutralLighterAlt, default: #faf9f8]\";font-size:8px;pointer-events:none;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:1}[dir=ltr] .ToolbarSubmenu-caret{right:4px}[dir=rtl] .ToolbarSubmenu-caret{left:4px}.ToolbarSubmenu-menuItems{display:none;position:absolute;top:34px}[dir=ltr] .ToolbarSubmenu-menuItems .ToolbarButton{padding-right:20px}[dir=rtl] .ToolbarSubmenu-menuItems .ToolbarButton{padding-left:20px}.ToolbarSubmenu--wide{width:160px!important}.ToolbarSubmenu--wide .ToolbarButton{width:100%}[dir=ltr] .ToolbarSubmenu--wide .ToolbarButton{text-align:left}[dir=rtl] .ToolbarSubmenu--wide .ToolbarButton{text-align:right}.ToolbarSubmenu.is-open .ToolbarSubmenu-menuItems{display:block}", ""]);



/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: Format, BaseRte, BaseRteConfiguration, CKTextEditor, WebPartRte, Utilities, DeferredToolbarSubmenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rte_baseRte_BaseRte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rte/baseRte/BaseRte */ "oubO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Format", function() { return _rte_baseRte_BaseRte__WEBPACK_IMPORTED_MODULE_0__["Format"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseRte", function() { return _rte_baseRte_BaseRte__WEBPACK_IMPORTED_MODULE_0__["BaseRte"]; });

/* harmony import */ var _rte_baseRte_BaseRteConfiguration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rte/baseRte/BaseRteConfiguration */ "wG+9");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseRteConfiguration", function() { return _rte_baseRte_BaseRteConfiguration__WEBPACK_IMPORTED_MODULE_1__["BaseRteConfiguration"]; });

/* harmony import */ var _rte_ckeditor_CKTextEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rte/ckeditor/CKTextEditor */ "Hw4Z");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CKTextEditor", function() { return _rte_ckeditor_CKTextEditor__WEBPACK_IMPORTED_MODULE_2__["CKTextEditor"]; });

/* harmony import */ var _rte_webPartRte_WebPartRte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rte/webPartRte/WebPartRte */ "yH57");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebPartRte", function() { return _rte_webPartRte_WebPartRte__WEBPACK_IMPORTED_MODULE_3__["WebPartRte"]; });

/* harmony import */ var _common_Utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/Utilities */ "Bd75");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Utilities", function() { return _common_Utilities__WEBPACK_IMPORTED_MODULE_4__["Utilities"]; });

/* harmony import */ var _toolbar_DeferredComponents_DeferredToolbarSubmenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toolbar/DeferredComponents/DeferredToolbarSubmenu */ "4x8+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredToolbarSubmenu", function() { return _toolbar_DeferredComponents_DeferredToolbarSubmenu__WEBPACK_IMPORTED_MODULE_5__["DeferredToolbarSubmenu"]; });

/// <reference path="../custom-typings/ckeditor/index.d.ts" />








/***/ }),

/***/ "nwhz":
/*!*************************************!*\
  !*** ./lib/rte/common/MatchLink.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TextParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextParser */ "7w0S");
/* harmony import */ var _RegexMatch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RegexMatch */ "k/1b");
/**
 * @copyright (c) Microsoft Corporation. All rights reserved.
 * Detects valid urls in the RTE
 * https://github.com/microsoft/roosterjs/blob/master/packages/roosterjs-editor-dom/lib/utils/matchLink.ts
 */


var MatchLink = /** @class */ (function () {
    function MatchLink() {
    }
    Object.defineProperty(MatchLink, "testHttpRegex", {
        get: function () {
            return MatchLink._testHttpRegex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatchLink, "httpExcludeRegex", {
        get: function () {
            return MatchLink._httpExcludeRegEx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatchLink, "linkMatchRules", {
        get: function () {
            return MatchLink._linkMatchRules;
        },
        enumerable: true,
        configurable: true
    });
    MatchLink._testHttpRegex = /^https:\/\/.*|^http:\/\/.*/i;
    MatchLink._label = '[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';
    MatchLink._domainName = "(?:" + MatchLink._label + "\\.)*" + MatchLink._label;
    MatchLink._domainPort = MatchLink._domainName + "(?:\\:[0-9]+)?";
    MatchLink._domainPortWithUrl = MatchLink._domainPort + "(?:[\\/\\?]\\S*)?";
    MatchLink._matchUrlRegex = new RegExp("(http:\\/\\/|www\\.|https:\\/\\/)" + MatchLink._domainPortWithUrl + "$", 'i');
    MatchLink._httpExcludeRegEx = new RegExp("^[^?]+%[^0-9a-f]+|^[^?]+%[0-9a-f][^0-9a-f]*|^[^?]+%00|^[^?]+%$|^https?:\\/\\/[^?\\/]+@|^www\\.[^?\\/]+@|,", 'i');
    MatchLink._mailToRegex = /mailto:\S+@\S+\.\S+$/i;
    // Commented out protocols will be include them in the future if needed
    // private static readonly _notesRegex: RegExp = /notes:\/\/\S+$/i;
    // private static readonly _fileRegex: RegExp = /file:\/\/\/?\S+$/i;
    // private static readonly _telRegex: RegExp = /tel:\+?[0-9]+(\-?[0-9]*)*(p[0-9]+)*/i;
    MatchLink._linkMatchRules = {
        url: {
            match: MatchLink._matchUrlRegex,
            testRegexMatch: function (text, offset) { return MatchLink._externalLinkRegexMatch(text, offset); },
            isURL: true
        },
        mailto: {
            match: MatchLink._mailToRegex,
            testRegexMatch: function (text, offset) { return _RegexMatch__WEBPACK_IMPORTED_MODULE_1__["RegexMatch"].match(MatchLink._mailToRegex, text, offset); },
            isURL: false
        }
    };
    MatchLink.normalizeUrl = function (url) {
        if (url && url.length) {
            return MatchLink._testHttpRegex.test(url) ? url : 'https://' + url;
        }
    };
    MatchLink._externalLinkRegexMatch = function (text, offset) {
        var slice = _TextParser__WEBPACK_IMPORTED_MODULE_0__["TextParser"].removeZeroWidthSpaces(text.slice(0, offset));
        var match = MatchLink._matchURL(slice);
        return (match) ? { start: match.index, end: offset } : undefined;
    };
    MatchLink._matchURL = function (url) {
        var matches = url.match(MatchLink._matchUrlRegex);
        if (matches && !MatchLink._httpExcludeRegEx.test(matches[0])) {
            return matches;
        }
    };
    return MatchLink;
}());
/* harmony default export */ __webpack_exports__["default"] = (MatchLink);


/***/ }),

/***/ "o7Cv":
/*!*******************************************************!*\
  !*** ./lib/toolbar/toolbarSubMenu/ToolbarSubmenu.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolbarSubmenu.css */ "k/9N");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "oubO":
/*!************************************!*\
  !*** ./lib/rte/baseRte/BaseRte.js ***!
  \************************************/
/*! exports provided: CREATE_EDITOR_MONITOR, CREATE_EDITOR_MONITOR_FAILURE, Format, BaseRte */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATE_EDITOR_MONITOR", function() { return CREATE_EDITOR_MONITOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATE_EDITOR_MONITOR_FAILURE", function() { return CREATE_EDITOR_MONITOR_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Format", function() { return Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseRte", function() { return BaseRte; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ms/sp-a11y */ "ytfe");
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ms_sp_safehtml__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ms/sp-safehtml */ "NEVa");
/* harmony import */ var _ms_sp_safehtml__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_safehtml__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _common_DeferredPagePicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/DeferredPagePicker */ "SiiP");
/* harmony import */ var _formattingbar_SPRteFormattingBar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../formattingbar/SPRteFormattingBar */ "vNVH");
/* harmony import */ var _ckeditor_CKTextEditor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../ckeditor/CKTextEditor */ "Hw4Z");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _toolbar_toolbarSubMenu_ToolbarSubmenu__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../toolbar/toolbarSubMenu/ToolbarSubmenu */ "fHAL");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../common/Flights */ "w4+A");
/* harmony import */ var _a11y_RteA11y__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../a11y/RteA11y */ "Qyis");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../common/KillSwitches */ "+ORw");
/* harmony import */ var _common_Utilities__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../common/Utilities */ "Bd75");
/* harmony import */ var _common_MatchLink__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../common/MatchLink */ "nwhz");
/* harmony import */ var _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../loc/RteStrings.resx */ "Dj9n");
/* harmony import */ var _BaseRte_scss__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./BaseRte.scss */ "MxJZ");
/* harmony import */ var _common_DeferredWikiPageSuggestions__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../common/DeferredWikiPageSuggestions */ "Kx4S");
/* harmony import */ var _ckeditor_CKTextEditor_types__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../ckeditor/CKTextEditor.types */ "bGc9");
/* harmony import */ var _common_RegexMatch__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../common/RegexMatch */ "k/1b");
/* harmony import */ var _ms_sp_dataproviders__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ms/sp-dataproviders */ "QZHX");
/* harmony import */ var _ms_sp_dataproviders__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_dataproviders__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _ckeditor_TopicSuggestions__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../ckeditor/TopicSuggestions */ "x7RT");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */


























var CLICK_ACTION = '.Click';
var BUTTON_NAME = 'Button';
var CREATE_EDITOR_MONITOR = 'CreateNewEditor';
var CREATE_EDITOR_MONITOR_FAILURE = 'EditorFailedToLoad';
var CREATE_EDITOR_MONITOR_EXPECTED = 'CanvasUnmounted';
var Format;
(function (Format) {
    Format["Undo"] = "undo";
    Format["Redo"] = "redo";
    Format["ClearFormatting"] = "clearFormatting";
    Format["Bold"] = "bold";
    Format["Italic"] = "italic";
    Format["Underline"] = "underline";
    Format["Bullet"] = "bullet";
    Format["List"] = "list";
    Format["AlignLeft"] = "alignLeft";
    Format["AlignCenter"] = "alignCenter";
    Format["AlignRight"] = "alignRight";
    Format["Link"] = "link";
    Format["UnLink"] = "unlink";
    Format["NormalText"] = "normalText";
    Format["H2"] = "h2";
    Format["H3"] = "h3";
    Format["H4"] = "h4";
    Format["Blockquote"] = "blockquote";
    Format["Pre"] = "pre";
    Format["Superscipt"] = "superscript";
    Format["Subscript"] = "subscript";
    Format["Justify"] = "justify";
    Format["Outdent"] = "outdent";
    Format["Indent"] = "indent";
    Format["Strike"] = "strike";
    Format["FontSize"] = "fontSize";
    Format["CustomTable"] = "customTable";
    Format["RowInserBefore"] = "rowInsertBefore";
    Format["RowInsertAfter"] = "rowInsertAfter";
    Format["ColumnInsertBefore"] = "columnInsertBefore";
    Format["ColumnInsertAfter"] = "columnInsertAfter";
    Format["RowDelete"] = "rowDelete";
    Format["ColumnDelete"] = "columnDelete";
    Format["TableDelete"] = "tableDelete";
    Format["TableCustomDelete"] = "tableCustomDelete";
    Format["FontColor"] = "fontColor";
    Format["HighlightColor"] = "highlightColor";
    Format["TableStyle"] = "tableStyle";
    Format["SimpleTableStyleTheme"] = "simpleTableStyleTheme";
    Format["BorderHeaderTableStyleTheme"] = "borderHeaderTableStyleTheme";
    Format["FilledHeaderTableStyleTheme"] = "filledHeaderTableStyleTheme";
    Format["BandedRowTableStyleTheme"] = "bandedRowTableStyleTheme";
    Format["BandedRowColumnTableStyleTheme"] = "bandedRowColumnTableStyleTheme";
    Format["SimpleTableStyleNeutral"] = "simpleTableStyleNeutral";
    Format["BorderHeaderTableStyleNeutral"] = "borderHeaderTableStyleNeutral";
    Format["FilledHeaderTableStyleNeutral"] = "filledHeaderTableStyleNeutral";
    Format["BandedRowTableStyleNeutral"] = "bandedRowTableStyleNeutral";
    Format["BandedRowColumnTableStyleNeutral"] = "bandedRowColumnTableStyleNeutral";
    Format["AlignTableLeft"] = "alignLeftTable";
    Format["AlignTableRight"] = "alignRightTable";
    Format["AlignTableCenter"] = "alignCenterTable";
})(Format || (Format = {}));
var autoCompleteTriggers;
(function (autoCompleteTriggers) {
    autoCompleteTriggers["pageLink"] = "[[";
    autoCompleteTriggers["topic"] = "#";
})(autoCompleteTriggers || (autoCompleteTriggers = {}));
/**
 * @class Rich Text Editor class. This component wraps around all the RTE logic including the formatting bar.
 */
/* tslint:disable:max-line-length */
var BaseRte = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BaseRte, _super);
    function BaseRte(props, rteOptions) {
        var _this = _super.call(this, props) || this;
        _this._editorElementRef = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._formattingBarRef = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._editorWrapperRef = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._recentTopics = [];
        _this._prevTopicsSuggestions = [];
        // @todo Hardcoding this for now. Language is english. Bug for it https://onedrive.visualstudio.com/CSI/_workitems/edit/794727/
        _this._LANGUAGE_ID = '1033';
        // Max number of topics to get.
        _this._MAX_TOPICS_TO_FETCH = 5;
        _this._initWikiPageSuggestions = function () {
            _this._inLinePickerPromise = Object(_common_DeferredWikiPageSuggestions__WEBPACK_IMPORTED_MODULE_21__["WikiPageSuggestionsLoader"])()
                .then(function (chunk) {
                _this._wikiPageSuggestions = chunk;
            })
                .catch(function (error) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_TraceLogger"].logError(BaseRte.logSource, error);
            });
        };
        _this._initLinkDataProvider = function () {
            var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_QosMonitor"]('RecentPagesSuggestions');
            _this._linkProviderPromise = _common_DeferredPagePicker__WEBPACK_IMPORTED_MODULE_9__["DeferredLinkDataProvider"].getInstance()
                .load()
                .then(function () {
                _this._linkDataProvider = _common_DeferredPagePicker__WEBPACK_IMPORTED_MODULE_9__["DeferredLinkDataProvider"].getInstance().create(_this.props.serviceScope);
                return _this._getRecentPageSuggestions();
            })
                .then(function (links) {
                var recentPages = BaseRte.makePageSuggestions(links, false);
                _this._recentPages = recentPages;
                _this._prevSuggestions = recentPages;
                qosMonitor.writeSuccess();
            })
                .catch(function (error) {
                qosMonitor.writeUnexpectedFailure('LoadRecentPagesFail', error);
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_TraceLogger"].logError(BaseRte.logSource, error);
            });
        };
        _this._wikiPagePickerRegexMatch = function (text, offset) {
            if (_common_Flights__WEBPACK_IMPORTED_MODULE_14__["default"].isWikiFeatureFlightEnabled()) {
                return _common_RegexMatch__WEBPACK_IMPORTED_MODULE_23__["RegexMatch"].match(BaseRte._PAGE_PICKER_REGEX, text, offset);
            }
            else {
                return undefined; // As we have multiple regex now, if the flight is not enabled we don't want to return matches here.
            }
        };
        _this._topicPickerRegexMatch = function (text, offset) {
            if (_common_Flights__WEBPACK_IMPORTED_MODULE_14__["default"].isAbbreviationFlightEnabled()) {
                return _common_RegexMatch__WEBPACK_IMPORTED_MODULE_23__["RegexMatch"].match(BaseRte._TOPIC_PICKER_REGEX, text, offset);
            }
            else {
                return undefined; // As we have multiple regex now, if the flight is not enabled we don't want to return matches here.
            }
        };
        _this._suggestionsCallback = function (matchInfo, callback) {
            if (_this._editor) {
                if (matchInfo.query.charAt(0) === autoCompleteTriggers.topic) {
                    var topicSuggestionPromise = _ckeditor_TopicSuggestions__WEBPACK_IMPORTED_MODULE_25__["TopicSuggestions"].topicPickerCallback(_this, _this.TAG_NAME, matchInfo, callback);
                    if (topicSuggestionPromise) {
                        topicSuggestionPromise
                            .then(function (suggestions) { _this._prevTopicsSuggestions = suggestions; })
                            .catch(function (error) { _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_TraceLogger"].logError(BaseRte.logSource, error); });
                    }
                }
                else {
                    var suggestionsPromise = _this._wikiPageSuggestions.pagePickerCallback(_this, _this.TAG_NAME, matchInfo, callback);
                    if (suggestionsPromise) {
                        suggestionsPromise
                            .then(function (suggestions) { _this._prevSuggestions = suggestions; })
                            .catch(function (error) { _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_TraceLogger"].logError(BaseRte.logSource, error); });
                    }
                }
            }
        };
        _this._selectedItemHTMLToInsert = function (item) {
            var insertHtml;
            if (item.suggestionType === _ckeditor_CKTextEditor_types__WEBPACK_IMPORTED_MODULE_22__["SuggestionTypes"].TopicSuggestion) {
                insertHtml = "<a href=\"" + item.url + "\" target=\"_self\" title=\"" + item.url + "\" data-sprte-link=\"" + item.id + "\">" + item.name + "</a>";
                return _ms_sp_safehtml__WEBPACK_IMPORTED_MODULE_8__["SafeHtml"].clean(insertHtml);
            }
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_EngagementLogger"].logEvent(_this.TAG_NAME + 'CreateSharePointPageLinkByKeyboardShortcut.SelectSuggestion');
            insertHtml = "<a href=\"" + item.url + "\" target=\"_self\" title=\"" + item.url + "\" data-sprte-link=\"" + item.id + "\">" + item.name + "</a>";
            return _ms_sp_safehtml__WEBPACK_IMPORTED_MODULE_8__["SafeHtml"].clean(insertHtml);
        };
        _this._formatList = function (evt, delRegex, formatFunction) {
            if (_this._editor) {
                _this._editor.deleteContentsInContainer(delRegex);
                formatFunction();
                BaseRte._preventEventDefaultBehaviour(evt);
            }
        };
        _this._unorderedListRegexMatch = function (text, offset) {
            return _common_RegexMatch__WEBPACK_IMPORTED_MODULE_23__["RegexMatch"].match(BaseRte._UNORDERED_LIST_REGEX, text, offset);
        };
        _this._orderedListRegexMatch = function (text, offset) {
            return _common_RegexMatch__WEBPACK_IMPORTED_MODULE_23__["RegexMatch"].match(BaseRte._ORDERED_LIST_REGEX, text, offset);
        };
        _this._wikiInsertLinkRegexMatch = function (text, offset) {
            return _common_RegexMatch__WEBPACK_IMPORTED_MODULE_23__["RegexMatch"].match(BaseRte._PAGE_LINKING_REGEX, text, offset);
        };
        _this._closeCoachMark = function () {
            _this.props.serviceScope.consume(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_12__["CoachmarkUtility"].serviceKey)
                .dismiss(BaseRte._wikiLinkingLocalStorage);
        };
        _this._acknowledgeCoachmarkAndLog = function () {
            _this._closeCoachMark();
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_EngagementLogger"].logEvent(_this.TAG_NAME + 'WikiLinkingCoachMark.Acknowledge');
        };
        _this._addWikiLinkingCoachMark = function () {
            var serviceScope = _this.props.serviceScope;
            if (serviceScope && _this._editor) {
                _this.props.serviceScope.consume(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_12__["CoachmarkUtility"].serviceKey)
                    .attachCoachmark({
                    positioningContainerProps: {
                        directionalHint: _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["DirectionalHint"].topLeftEdge,
                        directionalHintForRTL: _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["DirectionalHint"].topRightEdge
                    },
                    content: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].WikiLinkingCoachMarkContent,
                    localStorageKey: BaseRte._wikiLinkingLocalStorage,
                    target: _this._editorElement,
                    teachingBubbleProps: {
                        headline: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].WikiLinkingCoachMarkTitle,
                        hasCondensedHeadline: true,
                        primaryButtonProps: {
                            text: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].WikiLinkingCoachMarkButton,
                            onClick: _this._acknowledgeCoachmarkAndLog
                        }
                    }
                })
                    .catch(function (error) { return _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_TraceLogger"].logError(BaseRte.logSource, error, 'AttachCoachmark'); });
            }
        };
        _this._initState();
        _this._instanceId = ++BaseRte._instanceCount;
        _this._options = props.options || rteOptions;
        _this._config = _this._options.config;
        _this._restoreSelectionOnNextFocus = false;
        _this._buttonStates = new Map();
        _this._selectionInitiated = false;
        _this._selectionShouldEnd = false;
        _this._isRtl = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["getRTL"])();
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_14__["default"].isAbbreviationFlightEnabled()) {
            _this._topicSuggestionDataProvider = new _ms_sp_dataproviders__WEBPACK_IMPORTED_MODULE_24__["TopicSuggestionSearchDataProvider"](_this.props.serviceScope);
        }
        if (_this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["DisplayMode"].Edit && !_this._editor) {
            // Using 'void' to indicate we are not interested in the returned value.
            // This is an expected floating promise because we're trying to pre-load the CKEditor module without using it.
            // When next time the loadModule is called, the CKEditor module will be ready to use.
            void _this._options.loader.loadModule();
        }
        _this._formatMap = new Map([
            [Format.Undo, _this._handleUndo],
            [Format.Redo, _this._handleRedo],
            [Format.ClearFormatting, _this._handleClearFormatting],
            [Format.Bold, _this._handleBold],
            [Format.Italic, _this._handleItalic],
            [Format.Underline, _this._handleUnderline],
            [Format.Bullet, _this._handleListBullets],
            [Format.List, _this._handleListNumbered],
            [Format.AlignLeft, _this._handleAlignLeft],
            [Format.AlignRight, _this._handleAlignRight],
            [Format.AlignCenter, _this._handleAlignCenter],
            [Format.Link, _this._handleLink],
            [Format.NormalText, _this._handlePlainText],
            [Format.H2, _this._handleHeading2],
            [Format.H3, _this._handleHeading3],
            [Format.H4, _this._handleHeading4],
            [Format.Blockquote, _this._handleQuote],
            [Format.Strike, _this._handleStrikeThrough],
            [Format.Subscript, _this._handleSubscript],
            [Format.Superscipt, _this._handleSuperscript],
            [Format.Justify, _this._handleJustify],
            [Format.Indent, _this._handleIndent],
            [Format.Outdent, _this._handleOutdent],
            [Format.FontSize, _this._handleFontSize],
            [Format.CustomTable, _this._handleTable],
            [Format.RowInserBefore, _this._handleTableCommands],
            [Format.RowInsertAfter, _this._handleTableCommands],
            [Format.ColumnInsertBefore, _this._handleTableCommands],
            [Format.ColumnInsertAfter, _this._handleTableCommands],
            [Format.RowDelete, _this._handleTableCommands],
            [Format.ColumnDelete, _this._handleTableCommands],
            [Format.TableDelete, _this._handleTableCommands],
            [Format.TableCustomDelete, _this._handleTableCommands],
            [Format.FontColor, _this._handleFontColor],
            [Format.HighlightColor, _this._handleHighlightColor],
            [Format.UnLink, _this._handleUnlinkCommand],
            [Format.SimpleTableStyleTheme, _this._handleTableStyles],
            [Format.BorderHeaderTableStyleTheme, _this._handleTableStyles],
            [Format.FilledHeaderTableStyleTheme, _this._handleTableStyles],
            [Format.BandedRowTableStyleTheme, _this._handleTableStyles],
            [Format.BandedRowColumnTableStyleTheme, _this._handleTableStyles],
            [Format.SimpleTableStyleNeutral, _this._handleTableStyles],
            [Format.BorderHeaderTableStyleNeutral, _this._handleTableStyles],
            [Format.FilledHeaderTableStyleNeutral, _this._handleTableStyles],
            [Format.BandedRowTableStyleNeutral, _this._handleTableStyles],
            [Format.BandedRowColumnTableStyleNeutral, _this._handleTableStyles],
            [Format.AlignTableCenter, _this._handleAlignTableCenter],
            [Format.AlignTableRight, _this._handleAlignTableRight],
            [Format.AlignTableLeft, _this._handleAlignTableLeft],
            [Format.Pre, _this._handlePreformatted]
        ] /* fix this typecast, VSO:397687 */);
        // Keyup handler is getting called multiple times, which is affecting RTE performance while typing.
        _this._handleKeyUp = _this._async.debounce(_this._handleKeyUp, 200);
        return _this;
    }
    BaseRte._preventEventDefaultBehaviour = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
    };
    BaseRte.prototype.getFormatHandler = function (format) {
        return this._formatMap.get(format);
    };
    BaseRte.prototype.render = function () {
        var formattingBar;
        var html;
        var className;
        if (this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["DisplayMode"].Read) {
            className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["css"])(this._config.editorElementClassName, 'rte--read');
            html = _common_Flights__WEBPACK_IMPORTED_MODULE_14__["default"].isPageUndoRedoFlightEnabled()
                ? this.props.innerHTML
                : (this._previousHTML || this.props.innerHTML);
        }
        else if (this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["DisplayMode"].Edit) {
            className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["css"])('rte--edit', 'disable-link');
        }
        var browserInfo = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["_BrowserDetection"].getBrowserInformation();
        var isIE = browserInfo.browser === 4 /* IE */;
        var isFireFox = browserInfo.browser === 3 /* Firefox */;
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_16__["default"].fixBoldFontWeightForIEAndFirefox.isActivated() && (isIE || isFireFox)) {
            // Font weight is 400 in IE and Firefox but it is 700 in other browsers so we
            // need to set the weight explictely.
            className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["css"])(className, 'fontWeightStrongForIEFireFox');
        }
        else if (isIE) {
            // Font weight is not getting set in IE so we have to apply class to set it
            className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["css"])(className, 'fontWeightStrong');
        }
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_14__["default"].isFluentFlightEnabled()) {
            className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["css"])(className, 'isFluentRTE');
        }
        // Do not render a formatting bar if the control is not in edit mode and the
        // formatting bar is hidden
        var isEditMode = this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["DisplayMode"].Edit;
        if (isEditMode && !this.state.isFormattingBarHidden) {
            formattingBar = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_formattingbar_SPRteFormattingBar__WEBPACK_IMPORTED_MODULE_10__["SPRteFormattingBar"], { buttons: this._formattingBarButtons(), position: this.state.formattingBarPosition, onKeyDown: this._handleFormattingBarKeyDown, componentRef: this._formattingBarRef }));
        }
        var errorMessage;
        if (isIE) {
            errorMessage = _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].MultiImagePasteInIENotSupported;
        }
        else if (this._imagePasteErrorCode) {
            switch (this._imagePasteErrorCode) {
                case 2 /* InvalidImageSource */:
                    errorMessage = _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].InvalidImageSource;
                    break;
                case 1 /* PastedInTable */:
                    errorMessage = _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ImagesInTableNotSupported;
                    break;
            }
        }
        var contentElement = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { "data-automation-id": 'textBox', role: isEditMode ? 'textbox' : undefined, "aria-multiline": isEditMode || undefined, dangerouslySetInnerHTML: html ? { __html: html } : undefined, className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["css"])(className, this._emphasisClassName ? this._emphasisClassName : undefined), onKeyUp: this._handleKeyUp, ref: this._editorElementRef, "data-sp-a11y-checker-user-fixable": isEditMode, placeholder: this._placeholder }));
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { "data-sp-feature-tag": 'Rich Text Editor', "data-sp-feature-instance-id": this._spFeatureInstanceId, className: 'rte-webpart', ref: this._editorWrapperRef },
            this.state.isContextMenuVisible && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["ContextualMenu"], { shouldFocusOnMount: true, target: this.state.contextMenuTarget, onDismiss: this._onContextualMenuDismiss, directionalHint: this._isRtl ? _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["DirectionalHint"].bottomRightEdge : _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["DirectionalHint"].bottomLeftEdge, items: this._contextMenuItems })),
            this.state.isImageWrappedWithText && this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["DisplayMode"].Edit && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["MessageBar"], { messageBarType: _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["MessageBarType"].warning, ariaLabel: errorMessage, dismissButtonAriaLabel: _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].CloseWarningText, errorMessage), onDismiss: this._onMessageBarDismiss }, errorMessage)),
            this.state.isPasteInProgress && react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["Spinner"], { type: _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["SpinnerType"].large, label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].LoadingText }),
            contentElement,
            formattingBar));
    };
    BaseRte.prototype.getPredictedUrl = function (title) {
        return Promise.resolve('');
    };
    BaseRte.prototype.componentDidMount = function () {
        if (this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["DisplayMode"].Edit) {
            var innerHTML = this.props.innerHTML;
            var focusEditorOnMount = this.props.focusEditorOnMount;
            this._initializeEditor(innerHTML || '', focusEditorOnMount || false, /* startupFocus */ this._postEditorCreatedHandlerComplete /* onAfterInitialize */);
        }
    };
    BaseRte.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        if (this.state.displayMode !== prevState.displayMode) {
            this._createEditor();
        }
        if (this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["DisplayMode"].Edit) {
            if (this._formattingBar) {
                this._formattingbarElement = react_dom__WEBPACK_IMPORTED_MODULE_2__["findDOMNode"](this._formattingBar);
                this._formattingbarWidth = this._formattingbarElement.offsetWidth || this._formattingbarWidth;
            }
            else {
                this._formattingbarElement = undefined;
            }
        }
        if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_16__["default"].rteTypePerfWithUndo.isActivated() &&
            _common_Flights__WEBPACK_IMPORTED_MODULE_14__["default"].isPageUndoRedoFlightEnabled() &&
            this._editor &&
            this.props.innerHTML !== prevProps.innerHTML) {
            var innerHTML = this.props.innerHTML;
            // Trim the text before comparison because CKEditor will always append a blank line after the returned HTML.
            if (innerHTML === undefined || this._text === undefined || this._text.trim() !== innerHTML.trim()) {
                this._editor.setData(innerHTML || '', function () {
                    var selection = _this.props.selection;
                    if (_this._editor && selection && selection !== _this._currentSelection) {
                        _this._editor.setSelection(selection);
                    }
                });
            }
        }
    };
    BaseRte.prototype.componentWillUnmount = function () {
        if (this._editor) {
            if (_common_Flights__WEBPACK_IMPORTED_MODULE_14__["default"].isPageUndoRedoFlightEnabled()) {
                this._editor.destroy();
            }
            else {
                this._previousHTML = this._editor.destroy();
            }
            this._editor = undefined;
            if (this._editorElement) {
                this._editorElement.removeEventListener('paste', this._onBeforePaste, true);
                this._editorElement.removeEventListener('keydown', this._handleKeyDown);
            }
            document.removeEventListener('mouseup', this._checkSelectionChange);
            if (this._editorElement) {
                this._editorElement.removeAttribute('contenteditable');
                this._editorElement.removeEventListener('focus', this._handleEditorFocus);
            }
            if (this._createNewEditorMonitor && !this._createNewEditorMonitor.hasEnded) {
                this._createNewEditorMonitor.writeExpectedFailure(CREATE_EDITOR_MONITOR_EXPECTED);
            }
        }
        if (this._imagePasteErrorCode) {
            this._imagePasteErrorCode = undefined;
        }
        this._wasHeadingPasted = false;
    };
    BaseRte.prototype.UNSAFE_componentWillUpdate = function (nextProps, nextState) {
        if (this.state.displayMode !== nextState.displayMode) {
            if (nextState.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["DisplayMode"].Read) {
                // Switching from Edit mode to Read mode. Remove the editor instance
                this.componentWillUnmount();
            }
        }
        else if (nextState.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["DisplayMode"].Edit && this._editor) {
            /* Re-evaluate button activeness map before every render
            We assume that we only need to change activeness if the focus is inside the editor
            IMPORTANT: this._editor.focus() should not be called during state-transition, because it will trigger
            selection-change and cause another state-transition which is forbidden by React */
            this._setButtonStates();
        }
    };
    BaseRte.prototype.focusFormattingBar = function () {
        if (this._formattingbarElement) {
            Object(_a11y_RteA11y__WEBPACK_IMPORTED_MODULE_15__["navigateInside"])(this._formattingbarElement);
        }
    };
    BaseRte.prototype.setDisplayMode = function (newMode) {
        if (this.state.displayMode !== newMode) {
            this.setState({
                displayMode: newMode,
                formattingBarPosition: undefined,
                isFormattingBarHidden: true
            });
        }
    };
    BaseRte.prototype.getPageSuggestions = function (query) {
        if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_16__["default"].isTitleMatchSearchKillSwitchActivated()) {
            return this._linkDataProvider.getPageLinksByTitle(query);
        }
        else {
            return this._linkDataProvider.getPageTitleMatchLinks(query);
        }
    };
    BaseRte.prototype.getTopicSuggestions = function (query) {
        return this._topicSuggestionDataProvider.getTopicSuggestions(query, this._LANGUAGE_ID, this._MAX_TOPICS_TO_FETCH);
    };
    Object.defineProperty(BaseRte.prototype, "innerHTML", {
        get: function () {
            return this._text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRte.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRte.prototype, "recentPages", {
        get: function () {
            return this._recentPages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRte.prototype, "prevSuggestions", {
        get: function () {
            return this._prevSuggestions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRte.prototype, "recentTopics", {
        get: function () {
            return this._recentTopics;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRte.prototype, "prevTopics", {
        get: function () {
            return this._prevTopicsSuggestions;
        },
        enumerable: true,
        configurable: true
    });
    BaseRte.prototype.isFormatActive = function (format) {
        if (format) {
            return this._isFormatActiveLocal(format.toString());
        }
        return false;
    };
    Object.defineProperty(BaseRte.prototype, "fontSizeStyle", {
        get: function () {
            if (this._editor) {
                return this._editor.appliedFontSize;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRte.prototype, "fontColor", {
        get: function () {
            if (this._editor) {
                return this._editor.appliedFontColor;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRte.prototype, "highlightColor", {
        get: function () {
            if (this._editor) {
                return this._editor.appliedHighlightColor;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRte.prototype, "isTableContentsSelected", {
        get: function () {
            if (this._editor) {
                return this._editor.isTableContentsSelected;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRte.prototype, "isLinkSelected", {
        get: function () {
            return !!(this._editor && this._editor.getSelectedLink());
        },
        enumerable: true,
        configurable: true
    });
    BaseRte.prototype.removeFontColorFormat = function () {
        if (this._editor) {
            this._applyFormat('fontColor', { fontColor: this._editor.noColor });
        }
    };
    BaseRte.prototype.removeHighlightColor = function () {
        if (this._editor) {
            this._applyFormat('highlightColor', { highlightColor: this._editor.noColor });
        }
    };
    Object.defineProperty(BaseRte.prototype, "_emphasisClassName", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRte.prototype, "_spFeatureInstanceId", {
        get: function () {
            return this._instanceId + "_RTE";
        },
        enumerable: true,
        configurable: true
    });
    BaseRte.prototype._initState = function () {
        this.state = {
            displayMode: this.props.displayMode,
            formattingBarPosition: undefined,
            isFormattingBarHidden: true,
            selectedText: '',
            isImageWrappedWithText: false,
            isPasteInProgress: false,
            isContextMenuVisible: false
        };
    };
    BaseRte.prototype.focus = function () {
        this._focusCore();
    };
    BaseRte.prototype._focusCore = function () {
        if (this._editor) {
            this._editor.focus();
        }
    };
    BaseRte.prototype._postEditorCreatedHandlerComplete = function () {
        // to be overridden in sub-classes
    };
    BaseRte.prototype._createNewEditor = function (innerHTML, startUpFocus) {
        return this._options.editor.createNewEditor({
            config: this._config,
            currentHTML: innerHTML,
            editorElement: this._editorElement,
            selectionChangeCallback: this._handleSelectionChange,
            textChangeCallback: this._handleTextChange.bind(this),
            startUpFocus: startUpFocus,
            onImagePasteCallBack: this._onImagePaste.bind(this),
            onPasteCallback: this._onPaste.bind(this),
            onHeadingPasteCallback: this._onHeadingPaste.bind(this),
            onContextMenuCallBack: this._onContextualMenu.bind(this),
            autocompleteRegexesMatch: [this._wikiPagePickerRegexMatch.bind(this), this._topicPickerRegexMatch.bind(this)],
            autocompletePageSuggestions: this._suggestionsCallback.bind(this),
            autocompleteHTMLToInsert: this._selectedItemHTMLToInsert.bind(this),
            rteInsertLinkOnKeyDown: this._wikiInsertLinkOnKeyDown.bind(this)
        });
    };
    BaseRte.prototype._afterEditorCreated = function (editor) {
        this._editor = editor;
        this._updateCurrentSelection();
        if (this._editorElement) {
            this._editorElement.addEventListener('paste', this._onBeforePaste, true);
            this._editorElement.addEventListener('keydown', this._handleKeyDown);
        }
        document.addEventListener('mouseup', this._checkSelectionChange);
        if (this._editorElement) {
            this._editorElement.setAttribute('aria-label', _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].RichTextEditorAriaLabel);
            this._editorElement.setAttribute('title', _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].RichTextEditorTitle);
            this._editorElement.addEventListener('focus', this._handleEditorFocus);
            this._editorElement.addEventListener('blur', this._handleEditorBlur);
        }
        // Sprte link dialog was removed in this PR https://onedrive.visualstudio.com/SPPPlat/_git/sp-client/pullrequest/273467?_a=overview
        // in case we need to add it back
        this._initPagePicker();
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_14__["default"].isWikiFeatureFlightEnabled()) {
            if (!this._linkDataProvider && !this._linkProviderPromise) {
                this._initLinkDataProvider();
            }
            if (!this._inLinePickerPromise && !this._wikiPageSuggestions) {
                this._initWikiPageSuggestions();
            }
        }
    };
    /**
   * @param formatKey - Name of the format to apply
   */
    BaseRte.prototype._formatOrPrepare = function (formatKey) {
        var _this = this;
        this.focus();
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_EngagementLogger"].logEvent(this._engagementLoggerClickTagName(formatKey), CLICK_ACTION);
        var format = this._config.formats.get(formatKey);
        // Check if the format is masked and skip action
        if (format && format.maskedBy) {
            for (var _i = 0, _a = format.maskedBy; _i < _a.length; _i++) {
                var maskingFormat = _a[_i];
                if (this._buttonStates.get(maskingFormat) === _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_12__["ButtonState"].Active) {
                    return;
                }
            }
        }
        var range = this._editor ? this._editor.getSelection() : undefined;
        if (this._editor && range && format) {
            var _b = [range.start, range.end], start_1 = _b[0], end_1 = _b[1];
            var isApplied = this._editor.isFormatAppliedToRange(start_1, end_1, format);
            // If the format was applied and clean-up method cleaned it, then we're done
            if (!(this._cleanupBeforeFormatting(start_1, end_1, format) && isApplied)) {
                var formats_1 = {};
                formats_1[format.editorKey] = isApplied ? false : format.editorValue !== undefined ? format.editorValue : true;
                if (_common_Flights__WEBPACK_IMPORTED_MODULE_14__["default"].isExternalCKEditorFlightEnabled() && this._editor.isTableContentsSelected) {
                    this._async.setTimeout(function () {
                        // There seems to be an issue with Table selection plugin running into undefined error
                        // if formatting is done quickly
                        if (_this._editor) {
                            _this._editor.format(start_1, end_1, formats_1);
                        }
                    }, 0);
                }
                else {
                    this._editor.format(start_1, end_1, formats_1);
                }
                this._finalizeAction(formatKey);
            }
        }
    };
    BaseRte.prototype._openLinkDialog = function (defaultAddress) {
        var _this = this;
        if (defaultAddress === void 0) { defaultAddress = ''; }
        // Using 'void' to indicate that we are not interested in the returned value.
        void this._pagePickerPromise.then(function () {
            return _this._pagePicker.open({
                title: _this._currentSelection && _this._currentSelection.text ? _this._currentSelection.text : '',
                url: defaultAddress,
                shouldOpenInNewTab: _this._editor ? _this._editor.getSelectedLinkAttribute('target') === '_blank' : false
            });
        });
    };
    BaseRte.prototype._onSPRteLoad = function (e) {
        if (this._config.editorElementClassName === BaseRte._CKEDITOR_CLASS) {
            // Preload ck editor on load event to improve performance
            _ckeditor_CKTextEditor__WEBPACK_IMPORTED_MODULE_11__["CKTextEditor"].preloadEditor();
        }
    };
    BaseRte.prototype._initPagePicker = function () {
        var _this = this;
        // We need to init the Page Picker after editor is created since we need `this._editableDiv` to
        // set the focus back to RTE when closing the Page Picker dialog.
        this._pagePickerPromise = _common_DeferredPagePicker__WEBPACK_IMPORTED_MODULE_9__["default"].getInstance()
            .load()
            .then(function () {
            return (_this._pagePicker = _common_DeferredPagePicker__WEBPACK_IMPORTED_MODULE_9__["default"].getInstance().create({
                onSelect: _this._handlePagePickerSave,
                onUnlink: _this._handlePagePickerUnlink,
                serviceScope: _this.props.serviceScope,
                elementToFocusOnDismiss: _this._editorElement
            }));
        });
    };
    BaseRte.prototype._wikiInsertLinkOnKeyDown = function (keyCode) {
        if (this._editor && (keyCode === _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["KeyCodes"].space || keyCode === _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["KeyCodes"].enter)) {
            var wikiExternalLinkMatch = this._editor.tryMatchText(this._wikiInsertLinkRegexMatch);
            if (wikiExternalLinkMatch) {
                return this._wikiPageSuggestions.insertLinkCallback(this, this._editor, this.TAG_NAME, wikiExternalLinkMatch);
            }
            for (var _i = 0, _a = Object.keys(_common_MatchLink__WEBPACK_IMPORTED_MODULE_18__["default"].linkMatchRules); _i < _a.length; _i++) {
                var schema = _a[_i];
                var rule = _common_MatchLink__WEBPACK_IMPORTED_MODULE_18__["default"].linkMatchRules[schema];
                var linkMatch = this._editor.tryMatchText(rule.testRegexMatch);
                if (linkMatch) {
                    this._formatLinkShortcut(linkMatch, rule);
                    if (rule.isURL) {
                        return linkMatch.text;
                    }
                }
            }
        }
    };
    BaseRte.prototype._updateCurrentSelection = function () {
        if (this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["DisplayMode"].Edit) {
            if (this._editor) {
                this._currentSelection = this._editor.getSelection() || this._currentSelection;
            }
        }
    };
    BaseRte.prototype._handleTextChange = function () {
        this._updateCurrentSelection();
    };
    BaseRte.prototype._finalizeAction = function (ariaActionName) {
        if (ariaActionName) {
            this._ariaConfirmAction(ariaActionName);
        }
        this._updateActiveButtons();
    };
    BaseRte.prototype._onImagePaste = function (imageResult) {
        if (!imageResult.isImageValid) {
            this._imagePasteErrorCode = imageResult.errorCode;
            this.setState({ isImageWrappedWithText: true });
        }
        else {
            this.setState({ isImageWrappedWithText: false });
        }
    };
    BaseRte.prototype._onContextualMenu = function (isRightClicked, target) {
        this.setState({
            isContextMenuVisible: isRightClicked,
            contextMenuTarget: target
        });
    };
    BaseRte.prototype._onPaste = function (isPasteInProgress) {
        this.setState({ isPasteInProgress: isPasteInProgress });
    };
    BaseRte.prototype._onHeadingPaste = function () {
        this._wasHeadingPasted = true;
    };
    Object.defineProperty(BaseRte.prototype, "_placeholder", {
        /**
         * Define a placeholder to be shown in RTE when it is empty and not focused.
         * The implementation lies in .scss file using content: attr(placeholder).
         */
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if a selection change should initiate, then:
     * - If the selection was marked for completion, completes it
     * - Otherwise, markes the selection as initiated to be completed later
     */
    BaseRte.prototype._handleSelectionChange = function (range, forceUpdate) {
        if (range) {
            this.setState({ currentSubmenuOpen: undefined });
            if (this._restoreOnFocus()) {
                this._updateFormattingBar(false);
                return;
            }
        }
        if (!range && this._isRTESelected) {
            // We do not want to hide the toolbar when RTE is selected
        }
        else if (!range) {
            this._updateFormattingBar(true);
        }
        else {
            this._updateSelection(range, forceUpdate);
        }
    };
    Object.defineProperty(BaseRte.prototype, "_isRTESelected", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    BaseRte.prototype._updateSelection = function (range, forceUpdate) {
        if (!this._currentSelection || this.state.isFormattingBarHidden) {
            this._currentSelection = range;
            this._updateFormattingBar(false);
        }
        else if (forceUpdate ||
            this._currentSelection.start !== range.start ||
            this._currentSelection.end !== range.end) {
            // Initiate a selection and complete it if it was marked for completion
            this._selectionInitiated = true;
            if (this._selectionShouldEnd) {
                this._currentSelection = range;
                this._updateFormattingBar(false);
                // Reset initiation flag because selection change is already handled
                this._selectionInitiated = false;
            }
            // Clear completion flag for future events
            this._selectionShouldEnd = false;
        }
    };
    BaseRte.prototype._restoreOnFocus = function () {
        var restore = false;
        if (this._restoreSelectionOnNextFocus && this._currentSelection) {
            this._restoreSelectionOnNextFocus = false;
            if (this._editor) {
                this._editor.setSelection(this._currentSelection);
            }
            restore = true;
        }
        return restore;
    };
    BaseRte.prototype._onBeforePaste = function () {
        /* EMPTY BLOCK */
    };
    BaseRte.prototype._handleKeyDown = function (evt) {
        if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_7__["Keyboard"].isTab(evt) || _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_7__["Keyboard"].isShiftTab(evt)) {
            if (this._shouldIndentOnTab) {
                BaseRte._preventEventDefaultBehaviour(evt);
                if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_7__["Keyboard"].isTab(evt)) {
                    this._handleIndent();
                }
                else if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_7__["Keyboard"].isShiftTab(evt)) {
                    this._handleOutdent();
                }
            }
        }
        else if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_7__["Keyboard"].isKey(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["KeyCodes"].f10, evt, { alt: true }) && this._formattingbarElement) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_EngagementLogger"].logEvent(this.TAG_NAME + 'ToolbarByKeyboardShortcut.Focus', evt.type);
            Object(_a11y_RteA11y__WEBPACK_IMPORTED_MODULE_15__["navigateInside"])(this._formattingbarElement);
            var screenReaderInstruction = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].RichTextNavigationAltF10Keys, _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolbarNavigationArrowKeys, _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolbarNavigationTabKeys);
            Object(_a11y_RteA11y__WEBPACK_IMPORTED_MODULE_15__["ariaAlert"])(screenReaderInstruction);
            BaseRte._preventEventDefaultBehaviour(evt);
        }
        else if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_7__["Keyboard"].isKey('K'.charCodeAt(0), evt, { ctrl: true })) {
            this._handleLink();
            BaseRte._preventEventDefaultBehaviour(evt);
        }
        else if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_7__["Keyboard"].isKey(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["KeyCodes"].space, evt) && this._editor) {
            if (!this._editor.isContainerInList()) {
                if (this._editor.tryMatchText(this._unorderedListRegexMatch)) {
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_EngagementLogger"].logEvent(this.TAG_NAME + 'UnorderedListByKeyboardShortcut', evt.type);
                    this._formatList(evt, BaseRte._DEL_UNORDERED_LIST_REGEX, this._handleListBullets);
                }
                else if (this._editor.tryMatchText(this._orderedListRegexMatch)) {
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_EngagementLogger"].logEvent(this.TAG_NAME + 'OrderedListByKeyboardShortcut', evt.type);
                    this._formatList(evt, BaseRte._DEL_ORDERED_LIST_REGEX, this._handleListNumbered);
                }
            }
        }
    };
    BaseRte.prototype._handleLink = function () {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_EngagementLogger"].logEvent(this._engagementLoggerClickTagName('link'), CLICK_ACTION);
        this._isSelectionChangeFromToolbar = true;
        if (this._editor) {
            if (_common_Flights__WEBPACK_IMPORTED_MODULE_14__["default"].isWikiFeatureFlightEnabled()) {
                this._addWikiLinkingCoachMark();
            }
            this._currentSelection = this._editor.getSelection();
            this._openLinkDialog(this._editor.getSelectedLinkAttribute('href')); // Todo#661360 Fix workaround left-over
        }
    };
    BaseRte.prototype._handleFormattingBarKeyDown = function (evt) {
        if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_7__["Keyboard"].isEscape(evt)) {
            if (this._editorElement && !this._editorElement.isEqualNode(document.activeElement)) {
                this.focus();
                BaseRte._preventEventDefaultBehaviour(evt);
            }
        }
    };
    /**
     * Hide/Show the formatting bar and update the formatting bar position if needed.
     */
    BaseRte.prototype._updateFormattingBar = function (isHidden) {
        /* EMPTY BLOCK */
    };
    BaseRte.prototype._engagementLoggerClickTagName = function (key) {
        return this.TAG_NAME + key + BUTTON_NAME + CLICK_ACTION;
    };
    BaseRte.prototype._handleFormattingBarBlur = function (evt) {
        this._hideFormattingBarOnBlur(evt.relatedTarget);
    };
    BaseRte.prototype._formattingBarButtons = function () {
        var _this = this;
        var buttons = [
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_toolbar_toolbarSubMenu_ToolbarSubmenu__WEBPACK_IMPORTED_MODULE_13__["ToolbarSubmenu"], { a11yManagerId: this.props.a11yManagerId, key: 'format', buttons: this._formatSubmenuButtons, isOpen: this.state.currentSubmenuOpen === 'format', isWide: true, onOpen: function () {
                    _this._isSelectionChangeFromToolbar = true;
                    _this.setState({ currentSubmenuOpen: 'format' });
                }, onClose: this._handleCloseSubmenu, onBlur: this._handleFormattingBarBlur }),
            this._renderFormatButton('bold', this._handleBold),
            this._renderFormatButton('italic', this._handleItalic),
            this._renderFormatButton('underline', this._handleUnderline),
            this._renderFormatButton('bullet', this._handleListBullets),
            this._renderFormatButton('list', this._handleListNumbered),
            this._renderFormatButton('alignLeft', this._handleAlignLeft),
            this._renderFormatButton('alignCenter', this._handleAlignCenter),
            this._renderFormatButton('alignRight', this._handleAlignRight),
            this._renderFormatButton('link', this._handleLink),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_12__["ToolbarButton"], { key: 'clearFormatting', canBeActive: false, fabricIconKey: 'ClearFormatting', onClick: this._handleClearFormatting, title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].FormattingBarClearFormattingButtonTitle, automationId: 'clearFormatting-button', onBlur: this._handleFormattingBarBlur })
        ];
        return buttons;
    };
    Object.defineProperty(BaseRte.prototype, "_formatSubmenuButtons", {
        get: function () {
            var formatSubmenuButtons = [
                {
                    canBeActive: true,
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].FormattingBarNormalTextButtonTitle,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].FormattingBarNormalTextButtonTitle,
                    onClick: this._handlePlainText,
                    automationId: 'normalText-button'
                },
                this._getFormatButtonProps('h2', this._handleHeading2),
                this._getFormatButtonProps('h3', this._handleHeading3),
                this._getFormatButtonProps('h4', this._handleHeading4),
                this._getFormatButtonProps('blockquote', this._handleQuote),
                this._getFormatButtonProps('pre', this._handlePreformatted)
            ];
            return formatSubmenuButtons;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRte.prototype, "_isPropertyPaneOpen", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    BaseRte.prototype._renderFormatButton = function (formatKey, onClick) {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_12__["ToolbarButton"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ key: formatKey }, this._getFormatButtonProps(formatKey, onClick))));
    };
    BaseRte.prototype._getFormatButtonProps = function (formatKey, onClick) {
        // todo#661360 Canvas: Fix workaround left-over when we enable strict null checks
        var format = this._config.formats.get(formatKey);
        var button = format.button;
        return {
            fabricIconKey: button.fabricIconKey,
            iconClassName: button.iconClassName,
            onClick: onClick,
            canBeActive: button.canBeActive,
            isActive: this._isFormatActiveLocal(format.key),
            disabled: this._buttonStates.get(format.key) === _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_12__["ButtonState"].Disabled,
            title: button.title,
            label: button.label,
            className: button.className,
            automationId: formatKey + '-button',
            onBlur: this._handleFormattingBarBlur
        };
    };
    BaseRte.prototype._isFormatActiveLocal = function (format) {
        // We do not have 1:1 mapping of CK command and RTE commands for table styles
        // since there is only table style command, so button states won't get updated
        // We have to explicitely check if the class associated with the format is applied or not
        if (this._editor &&
            this.isTableContentsSelected &&
            this._editor.isTableStyleApplied(format) &&
            format.indexOf('TableStyle') !== -1) {
            return true;
        }
        return this._buttonStates.get(format) === _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_12__["ButtonState"].Active;
    };
    BaseRte.prototype._getRecentPageSuggestions = function () {
        return this._linkDataProvider.getSortedRecentPageLinks();
    };
    BaseRte.prototype._handleCloseSubmenu = function (isDocumentClick) {
        this.setState({ currentSubmenuOpen: undefined });
        // We want to close the formatting bar if the user clicked outside the editor
        if (isDocumentClick) {
            this._updateFormattingBar(true);
        }
    };
    Object.defineProperty(BaseRte.prototype, "_editorElement", {
        get: function () {
            return this._editorElementRef.current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRte.prototype, "_editorWrapper", {
        get: function () {
            return this._editorWrapperRef.current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRte.prototype, "_formattingBar", {
        get: function () {
            return this._formattingBarRef.current;
        },
        enumerable: true,
        configurable: true
    });
    BaseRte.prototype._handlePagePickerSave = function (link) {
        if (this._editor && this._currentSelection) {
            this._editor.format(this._currentSelection.start, this._currentSelection.end, {
                link: link.url,
                linkText: link.title,
                shouldOpenInNewTab: link.shouldOpenInNewTab
            });
        }
        Object(_a11y_RteA11y__WEBPACK_IMPORTED_MODULE_15__["ariaAlert"])(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].RTEPagePickerSaveAction, link.title));
        this._restoreSelectionOnNextFocus = true;
    };
    BaseRte.prototype._handlePagePickerUnlink = function () {
        if (this._editor && this._currentSelection) {
            var linkText = this._currentSelection.text || '';
            this._editor.format(this._currentSelection.start, this._currentSelection.end, { link: false });
            Object(_a11y_RteA11y__WEBPACK_IMPORTED_MODULE_15__["ariaAlert"])(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].RTEPagePickerUnlinkAction, linkText));
        }
        this._restoreSelectionOnNextFocus = true;
    };
    Object.defineProperty(BaseRte.prototype, "_text", {
        get: function () {
            return this._editor ? this._editor.getHTML() : this.props.innerHTML;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRte.prototype, "_contextMenuItems", {
        get: function () {
            var shortcutText = _common_Utilities__WEBPACK_IMPORTED_MODULE_17__["Utilities"].ShortcutText();
            // VSO#477199: Get icons for right click menu for table
            var items = [
                this._getContextMenuItem(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].AddRowAboveText, 'InsertRowsAbove', 'rowInsertBefore', _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].AddRowAboveShortcutText, _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].AddRowAboveText, shortcutText)),
                this._getContextMenuItem(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].AddRowBelowText, 'InsertRowsBelow', 'rowInsertAfter', _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].AddRowBelowShortcutText, _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].AddRowBelowText, shortcutText)),
                this._getContextMenuItem(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].DeleteRowText, 'DeleteRows', 'rowDelete', _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].DeleteRowShortcutText, _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].DeleteRowText, shortcutText))
            ];
            items.push(this._getContextMenuItem(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].AddColumnLeftText, 'InsertColumnsLeft', 'columnInsertBefore'));
            items.push(this._getContextMenuItem(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].AddColumnRightText, 'InsertColumnsRight', 'columnInsertAfter'));
            items.push(this._getContextMenuItem(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].DeleteColumnButtonLabel, 'DeleteColumns', 'columnDelete'));
            items.push(this._getContextMenuItem(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].DeleteTableButtonLabel, 'DeleteTable', 'tableCustomDelete'));
            return items;
        },
        enumerable: true,
        configurable: true
    });
    BaseRte.prototype._createEditor = function () {
        if (this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["DisplayMode"].Edit) {
            var innerHTML = this.props.innerHTML;
            /**
            * Switching from Read mode to Edit mode. Create a new editor
            * If SPRte has previously been in edit mode during the same session we want to use the saved HTML.
            * The props value is used if the editor is switching to edit mode for the first time since
            * _previousHTML will be null.
            */
            var html = _common_Flights__WEBPACK_IMPORTED_MODULE_14__["default"].isPageUndoRedoFlightEnabled()
                ? (innerHTML || '')
                : (this._previousHTML || innerHTML || '');
            if (!this._editor &&
                (_common_Flights__WEBPACK_IMPORTED_MODULE_14__["default"].isPageUndoRedoFlightEnabled() || html)) {
                this._initializeEditor(html, /* innerHTML */ false, /* startupFocus */ this._setButtonStates /* onAfterInitialize */);
            }
        }
    };
    BaseRte.prototype._getContextMenuItem = function (key, iconName, operation, title) {
        var _this = this;
        return {
            key: key,
            name: key,
            title: title ? title : key,
            iconProps: {
                iconName: iconName
            },
            onClick: function () {
                if (_this._editor) {
                    _this._formatOrPrepare(operation);
                }
            }
        };
    };
    Object.defineProperty(BaseRte.prototype, "_shouldIndentOnTab", {
        get: function () {
            return Boolean(this._editor && !this._editor.isTableContentsSelected);
        },
        enumerable: true,
        configurable: true
    });
    BaseRte.prototype._initializeEditor = function (innerHTML, startupFocus, onAfterInitialize) {
        var _this = this;
        if (!this._createNewEditorMonitor) {
            this._createNewEditorMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_QosMonitor"](CREATE_EDITOR_MONITOR);
        }
        // CK editor won't load correctly in Karma, so we avoid creating it in that case
        if (true) {
            this._createNewEditor(innerHTML, startupFocus)
                .then(function (editor) {
                if (_this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["DisplayMode"].Edit) {
                    _this._afterEditorCreated(editor);
                    onAfterInitialize();
                    _this._createNewEditorMonitor.writeSuccess();
                }
                else {
                    // Switching the display mode is now async in canvas, so we need to make sure
                    // if the mode has been switched here, then destroy the editor
                    editor.destroy();
                    if (_this._editorElement) {
                        // Destroying the editor causes ckeditable to get removed so
                        // adding it back
                        _this._editorElement.classList.add(BaseRte._CKEDITOR_CLASS);
                        _this._editorElement.removeAttribute('contenteditable');
                        _this._createNewEditorMonitor.writeExpectedFailure('DisplayMode Switched');
                    }
                }
            })
                .catch(function (error) {
                _this._createNewEditorMonitor.writeUnexpectedFailure(CREATE_EDITOR_MONITOR_FAILURE, error, {
                    innerHTML: _this.props.innerHTML
                });
            });
        }
    };
    BaseRte.prototype._ariaConfirmAction = function (formatKeyOrName) {
        var format = this._config.formats.get(formatKeyOrName);
        var name = format && format.button.title ? format.button.title : formatKeyOrName;
        var message = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].FormattingBarConfirmAction, name);
        if (this._currentSelection &&
            this._currentSelection.start !== this._currentSelection.end &&
            !(format && format.isLine)) {
            var text = this._editor ? this._editor.getText(this._currentSelection) : '';
            message = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].FormattingBarConfirmActionOnSelection, name, text);
        }
        Object(_a11y_RteA11y__WEBPACK_IMPORTED_MODULE_15__["ariaAlert"])(message);
    };
    /**
     * Note: keyup and mouseup can happen before or after selection-change depending on the user input
     * That's why we need to mark these events in separate flags (_selectionInitiated and _selectionShouldEnd)
     * Whenever one of them happens, we check if the other one has happened so we could complete the action
     *
     * Checks if a selection change should complete, then:
     * - If the selection was already initiated, completes it
     * - Otherwise, markes the selection to be completed after initiation
     */
    BaseRte.prototype._checkSelectionChange = function () {
        if (this._editor) {
            this._selectionShouldEnd = true;
            if (this._selectionInitiated) {
                var range = this._editor.getSelection();
                this._currentSelection = range;
                this._updateFormattingBar(false);
                // Reset completion flag because selection change is already handled
                this._selectionShouldEnd = false;
            }
            // Reset initiation flag for future events
            this._selectionInitiated = false;
        }
    };
    BaseRte.prototype._handleClearFormatting = function () {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_EngagementLogger"].logEvent(this._engagementLoggerClickTagName('ClearFormatting'), CLICK_ACTION);
        this.focus();
        var range = this._currentSelection;
        if (range) {
            var _a = [range.start, range.end], start = _a[0], end = _a[1];
            if (this._editor) {
                this._editor.clearFormatting(start, end);
            }
            this._finalizeAction(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].FormattingBarClearFormattingButtonTitle);
        }
    };
    BaseRte.prototype._handleUndo = function () {
        this._formatOrPrepare('undo');
    };
    BaseRte.prototype._handleRedo = function () {
        this._formatOrPrepare('redo');
    };
    BaseRte.prototype._applyFormat = function (formatType, value, label) {
        if (this._editor && this._currentSelection) {
            var logEntry = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_LogEntry"]('RTE', formatType, _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_LogType"].Event, {
                value: value[formatType]
            });
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_EngagementLogger"].logEventWithLogEntry(logEntry);
            this.focus();
            this._editor.format(this._currentSelection.start, this._currentSelection.end, value);
            this._finalizeAction(label);
        }
    };
    BaseRte.prototype._handleFontSize = function (config) {
        // VSO#400452: Selecting a font size and start typing does not work
        this._applyFormat(config.format, config.value, _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].FontSizeDropDownLabel);
    };
    BaseRte.prototype._handleFontColor = function (config) {
        this._applyFormat(config.format, config.value, _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].FontColorLabel);
    };
    BaseRte.prototype._handleHighlightColor = function (config) {
        this._applyFormat(config.format, config.value, _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].HightlightLabel);
    };
    BaseRte.prototype._handleAlignCenter = function () {
        this._formatOrPrepare('alignCenter');
    };
    BaseRte.prototype._handleAlignLeft = function () {
        this._formatOrPrepare(this._isRtl ? 'alignRight' : 'alignLeft');
    };
    BaseRte.prototype._handleAlignRight = function () {
        this._formatOrPrepare(this._isRtl ? 'alignLeft' : 'alignRight');
    };
    BaseRte.prototype._handleAlignTableCenter = function () {
        this._applyFormat(Format.AlignTableCenter, { alignCenterTable: "alignCenter" /* AlignCenter */ });
    };
    BaseRte.prototype._handleAlignTableLeft = function () {
        this._applyFormat(Format.AlignTableLeft, { alignLeftTable: "alignLeft" /* AlignLeft */ });
    };
    BaseRte.prototype._handleAlignTableRight = function () {
        this._applyFormat(Format.AlignTableRight, { alignRightTable: "alignRight" /* AlignRight */ });
    };
    BaseRte.prototype._handleBold = function () {
        this._formatOrPrepare('bold');
    };
    BaseRte.prototype._handleHeading2 = function () {
        this._clearFormatting();
        this._formatOrPrepare('h2');
    };
    BaseRte.prototype._handleHeading3 = function () {
        this._clearFormatting();
        this._formatOrPrepare('h3');
    };
    BaseRte.prototype._handleHeading4 = function () {
        this._clearFormatting();
        this._formatOrPrepare('h4');
    };
    BaseRte.prototype._clearFormatting = function () {
        this._handleClearFormatting();
    };
    BaseRte.prototype._handleItalic = function () {
        this._formatOrPrepare('italic');
    };
    BaseRte.prototype._handleListBullets = function () {
        this._formatOrPrepare('bullet');
    };
    BaseRte.prototype._handleListNumbered = function () {
        this._formatOrPrepare('list');
    };
    BaseRte.prototype._handleStrikeThrough = function () {
        this._formatOrPrepare('strike');
    };
    BaseRte.prototype._handleSuperscript = function () {
        this._formatOrPrepare('superscript');
    };
    BaseRte.prototype._handleSubscript = function () {
        this._formatOrPrepare('subscript');
    };
    BaseRte.prototype._handleJustify = function () {
        this._formatOrPrepare('justify');
    };
    BaseRte.prototype._handleIndent = function () {
        this._formatOrPrepare('indent');
    };
    BaseRte.prototype._handleOutdent = function () {
        this._formatOrPrepare('outdent');
    };
    BaseRte.prototype._handleTable = function (config) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_EngagementLogger"].logEvent(this._engagementLoggerClickTagName(config.format), CLICK_ACTION);
        if (this._editor && this._currentSelection) {
            this._editor.format(this._currentSelection.start, this._currentSelection.end, config.value);
        }
    };
    BaseRte.prototype._handleTableCommands = function (config) {
        this._formatOrPrepare(config.format);
    };
    BaseRte.prototype._handleTableStyles = function (config) {
        this._applyFormat(config.format, config.value);
    };
    BaseRte.prototype._handleUnlinkCommand = function () {
        this._handlePagePickerUnlink();
    };
    BaseRte.prototype._handlePlainText = function () {
        this.focus();
        this._clearFormatting();
        if (this._currentSelection) {
            // Use the clean method for any styling format
            var blockStyles = this._config.supportedFormatsArray.filter(function (format) {
                return format.isBlockStyle;
            });
            this._cleanupBeforeFormatting(this._currentSelection.start, this._currentSelection.end, blockStyles[0]);
            this._finalizeAction();
        }
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_EngagementLogger"].logEvent(this._engagementLoggerClickTagName('PlainText'), CLICK_ACTION);
    };
    BaseRte.prototype._handleQuote = function () {
        this._clearFormatting();
        this._formatOrPrepare('blockquote');
    };
    BaseRte.prototype._handlePreformatted = function () {
        this._clearFormatting();
        this._formatOrPrepare('pre');
    };
    BaseRte.prototype._handleUnderline = function () {
        this._formatOrPrepare('underline');
    };
    /**
     * Clean up the existing formatting of given range before applying the new format, by doing:
     *  - Clear all styling formats if new format is also a styling format
     *  - Clear all the formats masked by the new format
     *
     * @param start - Start of the range getting formatted
     * @param end - End of the range getting formatted
     * @param newFormat - Name of new format being applied
     *
     * @return if the newFormat was cleared as a result of clean-up
     */
    BaseRte.prototype._cleanupBeforeFormatting = function (start, end, newFormat) {
        var formatsToClear = {};
        // If this is a styling format, clear all styling formats
        if (newFormat.isBlockStyle) {
            var blockStyles = this._config.supportedFormatsArray.filter(function (format) {
                return format.isBlockStyle;
            });
            for (var _i = 0, blockStyles_1 = blockStyles; _i < blockStyles_1.length; _i++) {
                var format = blockStyles_1[_i];
                formatsToClear[format.editorKey] = false;
            }
        }
        // Clear all formats masked by this format
        if (newFormat.masks) {
            for (var _a = 0, _b = newFormat.masks; _a < _b.length; _a++) {
                var maskedFormatKey = _b[_a];
                var format = this._config.formats.get(maskedFormatKey);
                if (format) {
                    formatsToClear[format.editorKey] = false;
                }
            }
        }
        if (this._editor) {
            this._editor.format(start, end, formatsToClear, true);
        }
        return formatsToClear.hasOwnProperty(newFormat.editorKey);
    };
    BaseRte.prototype._onMessageBarDismiss = function () {
        this.setState({ isImageWrappedWithText: false });
    };
    BaseRte.prototype._onContextualMenuDismiss = function () {
        this.setState({ isContextMenuVisible: false });
    };
    BaseRte.prototype._handleEditorFocus = function (evt) {
        this._restoreOnFocus();
    };
    BaseRte.prototype._handleEditorBlur = function (evt) {
        var _this = this;
        this._async.setTimeout(function () {
            // We need to set timeout here because there is a race condition with the way ckeditor
            // is calling onblur which causes formatting to not go away
            // CKEditor Bug # https://dev.ckeditor.com/ticket/17013#comment:1
            return _this._hideFormattingBarOnBlur(evt.relatedTarget);
        }, 100);
    };
    BaseRte.prototype._hideFormattingBarOnBlur = function (target) {
        /*
         Hide the foramtting bar if the user clicked/focused somewhere else
         on the page
        */
        var elem = target;
        /*
         this._handleEditorBlur calls this method and this might be a case where the editor is
         present but formatting bar is undefined, so adding a null check for this
        */
        if ((this._editorElement && this._editorElement.contains(elem)) ||
            (this._formattingbarElement && this._formattingbarElement.contains(elem)) ||
            this._isPropertyPaneOpen ||
            /*
             Event target in safari is the Canvas Zone not the editor or the formatting bar. So we need to check
             for the selected classname
            */
            (elem && elem.className === 'ControlZone ControlZone--edit ControlZone--selected')) {
            return;
        }
        else {
            this._updateFormattingBar(true);
        }
    };
    BaseRte.prototype._handleKeyUp = function (evt) {
        this._checkSelectionChange();
        this._updateActiveButtons();
    };
    BaseRte.prototype._setButtonStates = function () {
        var range = this._editor ? this._editor.getSelection() : undefined;
        if (this._editor && range) {
            /* Make a map to keep track of updated buttons. Its goal is to minimize the number
            of calls to isFormatAppliedToRange (equal to the number of currently non-masked formats) */
            var updatedFormats = new Map();
            for (var _i = 0, _a = this._config.supportedFormatsArray; _i < _a.length; _i++) {
                var format = _a[_i];
                updatedFormats.set(format.key, false);
            }
            // First figure out the state of masking formats and their masked formats
            var maskingFormats = this._config.supportedFormatsArray.filter(function (format) {
                return !!format.masks;
            });
            for (var _b = 0, maskingFormats_1 = maskingFormats; _b < maskingFormats_1.length; _b++) {
                var maskingFormat = maskingFormats_1[_b];
                if (!updatedFormats.get(maskingFormat.key)) {
                    var isActive = this._editor.isFormatAppliedToRange(range.start, range.end, maskingFormat);
                    this._buttonStates.set(maskingFormat.key, isActive ? _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_12__["ButtonState"].Active : _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_12__["ButtonState"].Normal);
                    updatedFormats.set(maskingFormat.key, true);
                    if (isActive && maskingFormat.masks) {
                        for (var _c = 0, _d = maskingFormat.masks; _c < _d.length; _c++) {
                            var maskedFormat = _d[_c];
                            this._buttonStates.set(maskedFormat, _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_12__["ButtonState"].Disabled);
                            updatedFormats.set(maskedFormat, true);
                        }
                    }
                }
            }
            // Figure out activeness for the rest of the formats
            for (var _e = 0, _f = this._config.supportedFormatsArray; _e < _f.length; _e++) {
                var format = _f[_e];
                if (!updatedFormats.get(format.key)) {
                    var isActive = this._editor.isFormatAppliedToRange(range.start, range.end, format);
                    this._buttonStates.set(format.key, isActive ? _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_12__["ButtonState"].Active : _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_12__["ButtonState"].Normal);
                }
            }
        }
        if (this._isRtl) {
            var left = this._buttonStates.get('alignLeft');
            var right = this._buttonStates.get('alignRight');
            this._buttonStates.set('alignLeft', right);
            this._buttonStates.set('alignRight', left);
        }
    };
    BaseRte.prototype._formatLinkShortcut = function (match, rule) {
        if (this._editor) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_EngagementLogger"].logEvent(this.TAG_NAME + 'ExternalLinkByEntityRecognition');
            this._editor.format(match.range.endOffset, match.range.endOffset, {
                link: (rule.isURL) ? _common_MatchLink__WEBPACK_IMPORTED_MODULE_18__["default"].normalizeUrl(match.text) : match.text,
                linkText: match.text,
                shouldOpenInNewTab: false
            });
            match.range.extractContents(true /** mergeThen */);
            if (rule.isURL) {
                match.text = _common_MatchLink__WEBPACK_IMPORTED_MODULE_18__["default"].normalizeUrl(match.text);
            }
        }
    };
    /**
     * This should be called whenever the activeness of buttons could have changed
     * It rerenders the component to make sure the change is rendered
     */
    BaseRte.prototype._updateActiveButtons = function () {
        this.forceUpdate();
    };
    BaseRte.logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_5__["_LogSource"].create('BaseRte');
    BaseRte._PAGE_PICKER_REGEX = /\[{2}(?!\s|\|)((?!(\||\]{2}|\[{2})).)+$|\[{2}$/;
    BaseRte._TOPIC_PICKER_REGEX = /#(?!\s|\|)((?!(#)).)+$|#$/;
    BaseRte._PAGE_LINKING_REGEX = /\[{2}(?!\s|\|)((?!(\||\]{2}|\[{2})).)+(\|\s*((?!(\s|\]{2}|\[{2})).)+)?\]{2}$|\[{2}$/;
    BaseRte._ORDERED_LIST_REGEX = /^1\.$/;
    BaseRte._DEL_ORDERED_LIST_REGEX = /^1\./;
    BaseRte._UNORDERED_LIST_REGEX = /(^-$)|(^\*$)/;
    BaseRte._DEL_UNORDERED_LIST_REGEX = /(^\*)|(^-)/;
    BaseRte._URL_VALIDATION_REGEX = new RegExp('((^https?://)|(^ftp://)|(^file://)|(^mailto:)|(^news:)|(^pnm://)|(^mms://)|(^/)|(^#)|(^\\\\)).+', 'i');
    BaseRte._SERVICESCOPE_PROP_KEY = 'serviceScope';
    BaseRte._COMPONENTREF_PROP_KEY = 'componentRef';
    BaseRte._SELECTION_PROP_KEY = 'selection';
    BaseRte._CKEDITOR_CLASS = 'cke_editable';
    BaseRte._instanceCount = 0;
    BaseRte._wikiLinkingLocalStorage = 'DismissedWikiLinkingCoachmark';
    BaseRte.makePageSuggestions = function (links, isNewPage) {
        var autoSuggestions = links.map(function (val) {
            val.name = val.title;
            val.isNewPage = isNewPage;
            val.suggestionType = _ckeditor_CKTextEditor_types__WEBPACK_IMPORTED_MODULE_22__["SuggestionTypes"].PageSuggestion;
            return val;
        });
        return autoSuggestions;
    };
    BaseRte.makeTopicSuggestions = function (topics) {
        var autoSuggestions = topics.value.map(function (val) {
            val.name = val.Name;
            val.id = val.EntityId; // CKEditor needs a property called id to render.
            val.suggestionType = _ckeditor_CKTextEditor_types__WEBPACK_IMPORTED_MODULE_22__["SuggestionTypes"].TopicSuggestion;
            val.url = ''; // Topics don't have a URL, but ISuggestion does have one, so leaving it empty.
            return val;
        });
        return autoSuggestions;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "removeFontColorFormat", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "removeHighlightColor", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_postEditorCreatedHandlerComplete", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_onSPRteLoad", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_initPagePicker", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_onContextualMenu", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleSelectionChange", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_updateSelection", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_onBeforePaste", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleKeyDown", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleLink", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleFormattingBarKeyDown", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"] /* tslint:disable-next-line:no-any */
    ], BaseRte.prototype, "_handleFormattingBarBlur", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_getFormatButtonProps", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleCloseSubmenu", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handlePagePickerSave", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handlePagePickerUnlink", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_getContextMenuItem", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_checkSelectionChange", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleClearFormatting", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleUndo", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleRedo", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleFontSize", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleFontColor", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleHighlightColor", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleAlignCenter", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleAlignLeft", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleAlignRight", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleAlignTableCenter", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleAlignTableLeft", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleAlignTableRight", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleBold", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleHeading2", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleHeading3", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleHeading4", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleItalic", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleListBullets", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleListNumbered", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleStrikeThrough", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleSuperscript", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleSubscript", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleJustify", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleIndent", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleOutdent", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleTable", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleTableCommands", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleTableStyles", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleUnlinkCommand", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handlePlainText", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleQuote", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handlePreformatted", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleUnderline", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_onMessageBarDismiss", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_onContextualMenuDismiss", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleEditorFocus", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleEditorBlur", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_handleKeyUp", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], BaseRte.prototype, "_setButtonStates", null);
    return BaseRte;
}(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["BaseComponent"]));



/***/ }),

/***/ "rYEu":
/*!*****************************************************!*\
  !*** ./lib/rte/webPartRte/CKEditorForWebPartRte.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ckeditor_CKTextEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ckeditor/CKTextEditor */ "Hw4Z");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/Flights */ "w4+A");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */




var CKEditorForWebPartRte = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CKEditorForWebPartRte, _super);
    function CKEditorForWebPartRte(options, onReadyCallback) {
        var _this = _super.call(this, options, onReadyCallback) || this;
        /* tslint:disable:max-line-length */
        var pluginsToBeRemoved = 'contextmenu,menubutton,scayt,liststyle,tableselection,tabletools,magicline,link,resize,autogrow,elementspath,divarea';
        /* tslint:enable:max-line-length */
        _this._ckEditorConfig = {
            disableNativeSpellChecker: false,
            on: {
                change: _this._onTextChange,
                selectionChange: _this._handleSelectionChangeConvert
            },
            removePlugins: "tableselection," + pluginsToBeRemoved,
            extraPlugins: 'justify,placeholdertext',
            placeholder: options.placeholder,
            removeButtons: '',
            stylesSet: false,
            toolbar: [],
            startupFocus: _this._startupFocus,
            fullPage: false,
            resize_enabled: false,
            width: '100%',
            height: 200,
            title: false
        };
        _this._onKeyDownCallBack = options.onKeyDownCallBack;
        // Disable the editor content filer to allow all contents.
        // See http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter for document.
        _this._ckEditorConfig.allowedContent = true;
        _this._initialize(options.currentHTML);
        return _this;
    }
    CKEditorForWebPartRte.createNewEditor = function (options) {
        return new Promise(function (resolve) {
            CKEditorForWebPartRte.moduleLoader
                .loadModule()
                .then(function () {
                var editor = new CKEditorForWebPartRte(options, function () { return resolve(editor); });
            })
                .catch(function (error) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(CKEditorForWebPartRte.logSource, error);
            });
        });
    };
    CKEditorForWebPartRte.prototype._initialize = function (currentHTML) {
        if (!this._ckEditorConfig) {
            return;
        }
        var textPart = document.createElement('textarea');
        this._editorElement.appendChild(textPart);
        this._editor = CKEDITOR.replace(textPart, this._ckEditorConfig);
        this._editor.setData(currentHTML);
        // CKeditor in iframe mode will stop alt+F10 keyboard event propagation.
        // We need to listen to this event with ckeditor instance.
        if (!_common_Flights__WEBPACK_IMPORTED_MODULE_3__["default"].isWikiFeatureFlightEnabled()) {
            this._editor.on('key', this._handleKeyDown.bind(this));
        }
        this._addCustomToolbarCommands();
    };
    CKEditorForWebPartRte.prototype._handleKeyDown = function (ev) {
        var keyboardEvent = ev.data && ev.data.domEvent && ev.data.domEvent.$;
        if (keyboardEvent && this._onKeyDownCallBack) {
            this._onKeyDownCallBack(keyboardEvent);
            if (keyboardEvent.defaultPrevented) {
                // In case of prevent default, the default handle logic inside ckeditor should also be prevented.
                ev.cancel();
            }
        }
    };
    CKEditorForWebPartRte.logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('CKEditorForWebPartRte');
    return CKEditorForWebPartRte;
}(_ckeditor_CKTextEditor__WEBPACK_IMPORTED_MODULE_2__["CKTextEditor"]));
/* harmony default export */ __webpack_exports__["default"] = (CKEditorForWebPartRte);


/***/ }),

/***/ "sjA7":
/*!***********************************************************!*\
  !*** ./lib/toolbar/toolbarSubMenu/ToolbarSubmenu.scss.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolbarSubmenu.css */ "o7Cv");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


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

/***/ "u2U9":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/rte/a11y/RteA11y.module.css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".screenReaderOnly_41a5c7a7{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}", ""]);



/***/ }),

/***/ "ut3N":
/*!********************************************!*\
  !*** external "@microsoft/sp-diagnostics" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ut3N__;

/***/ }),

/***/ "vNVH":
/*!*****************************************************!*\
  !*** ./lib/rte/formattingbar/SPRteFormattingBar.js ***!
  \*****************************************************/
/*! exports provided: SPRteFormattingBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPRteFormattingBar", function() { return SPRteFormattingBar; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _SPRteFormattingBar_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SPRteFormattingBar.scss */ "Ayuq");
/* harmony import */ var _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../loc/RteStrings.resx */ "Dj9n");

/**
 * @copyright Microsoft Corporation. All rights reserved. *
 */




/**
 * @class The formatting bar for the SPRte exposes text editing actions.
 */
var SPRteFormattingBar = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SPRteFormattingBar, _super);
    function SPRteFormattingBar(props) {
        var _this = _super.call(this, props) || this;
        _this._domNodeRef = react__WEBPACK_IMPORTED_MODULE_2__["createRef"]();
        _this.state = {
            isFaded: false
        };
        return _this;
    }
    SPRteFormattingBar.prototype.componentDidMount = function () {
        if (this.props.onKeyDown) {
            this._domNode.addEventListener('keydown', this.props.onKeyDown);
        }
    };
    SPRteFormattingBar.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        var oldPosition = this.props.position;
        var newPosition = nextProps.position;
        if (oldPosition && newPosition && oldPosition.top !== newPosition.top) {
            this.setState({
                isFaded: true
            });
        }
    };
    SPRteFormattingBar.prototype.componentDidUpdate = function () {
        var _this = this;
        if (this.state.isFaded) {
            this._clearTimeOut();
            this._fadeFormatBarTimeOut = this._async.setTimeout(function () {
                _this.setState({
                    isFaded: false
                });
            }, 300);
        }
    };
    SPRteFormattingBar.prototype.componentWillUnmount = function () {
        this._clearTimeOut();
    };
    /**
     * Renders the formatting bar in the position given in props
     * Formatting bar renders on top left side of the control by default
     * If there is a text selection the bar renders above the selection
     */
    SPRteFormattingBar.prototype.render = function () {
        var style = this.props.position;
        var className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])('SPRteFormattingBar', 'rteFlyout-visible', 'stack-panel-class', {
            faded: this.state.isFaded
        });
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { role: 'toolbar', "aria-label": _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_4__["default"].FormattingBarAccessibleLabel, className: className, ref: this._domNodeRef, style: style, "data-automation-id": 'toolbar' },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["FocusZone"], { isCircularNavigation: true, className: 'formattingBarFocusZone' }, this.props.buttons)));
    };
    Object.defineProperty(SPRteFormattingBar.prototype, "_domNode", {
        get: function () {
            return this._domNodeRef.current;
        },
        enumerable: true,
        configurable: true
    });
    SPRteFormattingBar.prototype._clearTimeOut = function () {
        if (this._fadeFormatBarTimeOut) {
            clearTimeout(this._fadeFormatBarTimeOut);
            this._fadeFormatBarTimeOut = undefined;
        }
    };
    return SPRteFormattingBar;
}(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["BaseComponent"]));



/***/ }),

/***/ "vpy3":
/*!*******************************!*\
  !*** external "resx-strings" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vpy3__;

/***/ }),

/***/ "w4+A":
/*!*******************************!*\
  !*** ./lib/common/Flights.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

var Flights = /** @class */ (function () {
    function Flights() {
    }
    /**
     * Bumps CKEditor to 4.13.0
     * If this flight is pulled, it will revert to 4.11.4
     */
    Flights.isExternalCKEditorFlightEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1755 /* WEXCkeditorNewVersion  */);
    };
    Flights.isAnchorFlightEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1232 /* SOXAnchorService */);
    };
    Flights.isPageUndoRedoFlightEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1457 /* WEXModernUndoRedo */);
    };
    Flights.isWikiFeatureFlightEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1600 /* EnterpriseWikiScenariosInRTE */);
    };
    Flights.isFluentFlightEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1248 /* EnableFluentTheme */);
    };
    Flights.isFluidPasteEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1698 /* SPPPLATFluidEmbedWebPart */);
    };
    Flights.isAbbreviationFlightEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1336 /* CSI KM Annotations */);
    };
    return Flights;
}());
/* harmony default export */ __webpack_exports__["default"] = (Flights);


/***/ }),

/***/ "wG+9":
/*!*************************************************!*\
  !*** ./lib/rte/baseRte/BaseRteConfiguration.js ***!
  \*************************************************/
/*! exports provided: BaseRteConfiguration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseRteConfiguration", function() { return BaseRteConfiguration; });
/* harmony import */ var _common_Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/Utilities */ "Bd75");
/* harmony import */ var _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../loc/RteStrings.resx */ "Dj9n");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__);
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */



/**
 * Static class for SPRte configuratoion
 * Note: We assume all RTE instances share the same configuration by design
 * Should this change in the future, we'll need to change this to non-static design
 */
var BaseRteConfiguration = /** @class */ (function () {
    function BaseRteConfiguration() {
        var shortcutText = _common_Utilities__WEBPACK_IMPORTED_MODULE_0__["Utilities"].ShortcutText();
        this._supportedFormatsArray = [
            {
                key: 'bold',
                editorKey: 'bold',
                browserKey: 'bold',
                isBlockStyle: false,
                isLine: false,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    fabricIconKey: 'Bold',
                    shortcut: 'Ctrl+B',
                    title: _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarBoldButtonTitle, shortcutText)
                }
            },
            {
                key: 'italic',
                editorKey: 'italic',
                browserKey: 'italic',
                isBlockStyle: false,
                isLine: false,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    fabricIconKey: 'Italic',
                    shortcut: 'Ctrl+I',
                    title: _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarItalicButtonTitle, shortcutText)
                }
            },
            {
                key: 'underline',
                editorKey: 'underline',
                browserKey: 'underline',
                isBlockStyle: false,
                isLine: false,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    fabricIconKey: 'Underline',
                    shortcut: 'Ctrl+U',
                    title: _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarUnderlineButtonTitle, shortcutText)
                }
            },
            {
                key: 'link',
                editorKey: 'link',
                isBlockStyle: false,
                isLine: false,
                isEditorNative: true,
                masks: ['underline'],
                button: {
                    canBeActive: true,
                    fabricIconKey: 'Link',
                    shortcut: 'Ctrl+K',
                    title: _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarLinkButtonTitle, shortcutText)
                }
            },
            {
                key: 'alignLeft',
                editorKey: 'justifyleft',
                browserKey: 'justifyLeft',
                isBlockStyle: false,
                isLine: true,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    fabricIconKey: 'AlignLeft',
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarAlignLeftButtonTitle
                }
            },
            {
                key: 'alignCenter',
                editorKey: 'justifycenter',
                browserKey: 'justifyCenter',
                isBlockStyle: false,
                isLine: true,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    fabricIconKey: 'AlignCenter',
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarAlignCenterButtonTitle
                }
            },
            {
                key: 'alignRight',
                editorKey: 'justifyright',
                browserKey: 'justifyRight',
                isBlockStyle: false,
                isLine: true,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    fabricIconKey: 'AlignRight',
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarAlignRightButtonTitle
                }
            },
            {
                key: 'bullet',
                editorKey: 'bulletedlist',
                browserKey: 'insertUnorderedList',
                isBlockStyle: true,
                isLine: true,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    fabricIconKey: 'BulletedList',
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarBulletListButtonTitle
                }
            },
            {
                key: 'list',
                editorKey: 'numberedlist',
                browserKey: 'insertOrderedList',
                isBlockStyle: true,
                isLine: true,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    fabricIconKey: 'NumberedList',
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarNumberedListButtonTitle
                }
            },
            {
                key: 'h2',
                editorKey: 'heading2',
                isBlockStyle: true,
                isLine: true,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarHeading2ButtonTitle,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarHeading2ButtonTitle,
                    className: 'ToolbarButton--h2'
                }
            },
            {
                key: 'h3',
                editorKey: 'heading3',
                isBlockStyle: true,
                isLine: true,
                isEditorNative: false,
                button: {
                    canBeActive: true,
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarHeading3ButtonTitle,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarHeading3ButtonTitle,
                    className: 'ToolbarButton--h3'
                }
            },
            {
                key: 'h4',
                editorKey: 'heading4',
                isBlockStyle: true,
                isLine: true,
                isEditorNative: false,
                button: {
                    canBeActive: true,
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarHeading4ButtonTitle,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarHeading4ButtonTitle,
                    className: 'ToolbarButton--h4'
                }
            },
            {
                key: 'blockquote',
                editorKey: 'blockquote',
                isBlockStyle: true,
                isLine: true,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarQuoteButtonTitle,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarQuoteButtonTitle,
                    className: 'ToolbarButton--blockquote'
                }
            },
            {
                key: 'undo',
                editorKey: 'undo',
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    title: _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].UndoButtonTitle, shortcutText),
                    label: _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].UndoButtonTitle, shortcutText),
                    fabricIconKey: 'Undo'
                }
            },
            {
                key: 'redo',
                editorKey: 'redo',
                isEditorNative: true,
                button: {
                    title: _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["StringHelper"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].RedoButtonTitle, shortcutText),
                    label: _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["StringHelper"].format((_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].RedoButtonTitle), shortcutText),
                    fabricIconKey: 'Redo'
                }
            },
            {
                key: 'strike',
                editorKey: 'strike',
                isBlockStyle: false,
                isLine: false,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].StrikeThroughButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].StrikeThroughButtonLabel,
                    fabricIconKey: 'Strikethrough'
                }
            },
            {
                key: 'subscript',
                editorKey: 'subscript',
                isBlockStyle: false,
                isLine: false,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].SubscriptButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].SubscriptButtonLabel,
                    fabricIconKey: 'Subscript'
                }
            },
            {
                key: 'superscript',
                editorKey: 'superscript',
                isBlockStyle: false,
                isLine: false,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].SuperscriptButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].SuperscriptButtonLabel,
                    fabricIconKey: 'Superscript'
                }
            },
            {
                key: 'justify',
                editorKey: 'justifyblock',
                isBlockStyle: false,
                isLine: true,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].JustifyButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].JustifyButtonLabel,
                    fabricIconKey: 'CollapseMenu'
                    // @todo: VSO#395060: Get the right icon from fabric for justify
                }
            },
            {
                key: 'indent',
                editorKey: 'indent',
                isBlockStyle: false,
                isLine: true,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].IncreaseIndentButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].IncreaseIndentButtonLabel,
                    fabricIconKey: 'IncreaseIndentLegacy'
                }
            },
            {
                key: 'outdent',
                editorKey: 'outdent',
                isBlockStyle: false,
                isLine: true,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].DecreaseIndentButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].DecreaseIndentButtonLabel,
                    fabricIconKey: 'DecreaseIndentLegacy'
                }
            },
            {
                key: 'customTable',
                editorKey: 'customTable',
                isEditorNative: true,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableButtonLabel
                }
            },
            {
                key: 'rowInsertBefore',
                editorKey: 'rowInsertBefore',
                isEditorNative: true,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].InsertRowBeforeButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].InsertRowBeforeButtonLabel,
                    fabricIconKey: 'InsertRowsAbove'
                }
            },
            {
                key: 'rowInsertAfter',
                editorKey: 'rowInsertAfter',
                isEditorNative: true,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].InsertRowAfterButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].InsertRowAfterButtonLabel,
                    fabricIconKey: 'InsertRowsBelow'
                }
            },
            {
                key: 'columnInsertBefore',
                editorKey: 'columnInsertBefore',
                isEditorNative: true,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].InsertColumnLeftButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].InsertColumnLeftButtonLabel,
                    fabricIconKey: 'InsertColumnsLeft'
                }
            },
            {
                key: 'columnInsertAfter',
                editorKey: 'columnInsertAfter',
                isEditorNative: true,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].InsertColumnRightButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].InsertColumnRightButtonLabel,
                    fabricIconKey: 'InsertColumnsRight'
                }
            },
            {
                key: 'rowDelete',
                editorKey: 'rowDelete',
                isEditorNative: true,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].DeleteRowButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].DeleteRowButtonLabel,
                    fabricIconKey: 'DeleteRows'
                }
            },
            {
                key: 'columnDelete',
                editorKey: 'columnDelete',
                isEditorNative: true,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].DeleteColumnButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].DeleteColumnButtonLabel,
                    fabricIconKey: 'DeleteColumns'
                }
            },
            {
                key: 'tableCustomDelete',
                editorKey: 'tableCustomDelete',
                isEditorNative: true,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].DeleteTableButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].DeleteTableButtonLabel,
                    fabricIconKey: 'DeleteTable'
                }
            },
            {
                key: 'tableDelete',
                editorKey: 'tableDelete',
                isEditorNative: true,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].DeleteTableButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].DeleteTableButtonLabel,
                    fabricIconKey: 'DeleteTable'
                }
            },
            {
                key: 'unlink',
                editorKey: 'unlink',
                isEditorNative: false,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarUnlinkButtonTitle,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarUnlinkButtonTitle,
                    fabricIconKey: 'RemoveLink'
                }
            },
            {
                key: 'simpleTableStyleTheme',
                editorKey: 'tableStyle',
                isEditorNative: false,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].SimpleTableButtonThemeLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].SimpleTableButtonThemeLabel
                }
            },
            {
                key: 'borderHeaderTableStyleTheme',
                editorKey: 'tableStyle',
                isEditorNative: false,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithHeaderBorderThemeLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithHeaderBorderThemeLabel
                }
            },
            {
                key: 'filledHeaderTableStyleTheme',
                editorKey: 'tableStyle',
                isEditorNative: false,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithFilledHeaderThemeLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithFilledHeaderThemeLabel
                }
            },
            {
                key: 'bandedRowTableStyleTheme',
                editorKey: 'tableStyle',
                isEditorNative: false,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithBandedRowsThemeLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithBandedRowsThemeLabel
                }
            },
            {
                key: 'bandedRowColumnTableStyleTheme',
                editorKey: 'tableStyle',
                isEditorNative: false,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithBandedRowsAndColumnsThemeLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithBandedRowsAndColumnsThemeLabel
                }
            },
            {
                key: 'simpleTableStyleNeutral',
                editorKey: 'tableStyle',
                isEditorNative: false,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].SimpleTableButtonLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].SimpleTableButtonLabel
                }
            },
            {
                key: 'borderHeaderTableStyleNeutral',
                editorKey: 'tableStyle',
                isEditorNative: false,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithHeaderBorderLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithHeaderBorderLabel
                }
            },
            {
                key: 'filledHeaderTableStyleNeutral',
                editorKey: 'tableStyle',
                isEditorNative: false,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithFilledHeaderLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithFilledHeaderLabel
                }
            },
            {
                key: 'bandedRowTableStyleNeutral',
                editorKey: 'tableStyle',
                isEditorNative: false,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithBandedRowsLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithBandedRowsLabel
                }
            },
            {
                key: 'bandedRowColumnTableStyleNeutral',
                editorKey: 'tableStyle',
                isEditorNative: false,
                button: {
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithBandedRowsAndColumnsLabel,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableWithBandedRowsAndColumnsLabel
                }
            },
            {
                key: 'alignLeftTable',
                editorKey: 'alignLeftTable',
                browserKey: 'alignLeftTable',
                isBlockStyle: false,
                isLine: true,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    fabricIconKey: 'AlignHorizontalLeft',
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].AlignTableLeftLabel
                }
            },
            {
                key: 'alignCenterTable',
                editorKey: 'alignCenterTable',
                browserKey: 'alignCenterTable',
                isBlockStyle: false,
                isLine: true,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    fabricIconKey: 'AlignHorizontalCenter',
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].AlignTableCenterLabel
                }
            },
            {
                key: 'alignRightTable',
                editorKey: 'alignRightTable',
                browserKey: 'alignRightTable',
                isBlockStyle: false,
                isLine: true,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    fabricIconKey: 'AlignHorizontalRight',
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].AlignTableRightLabel
                }
            },
            {
                key: 'pre',
                editorKey: 'pre',
                isBlockStyle: true,
                isLine: true,
                isEditorNative: true,
                button: {
                    canBeActive: true,
                    title: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarPreButtonTitle,
                    label: _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].FormattingBarPreButtonTitle,
                    className: 'ToolbarButton--pre'
                }
            }
        ];
        // Build a map to look up formats by their key quickly
        this._formats = new Map();
        for (var _i = 0, _a = this._supportedFormatsArray; _i < _a.length; _i++) {
            var format = _a[_i];
            this._formats.set(format.key, format);
        }
        // Populate 'maskedBy' field of all formats based on 'masks' fields
        var maskingFormats = this._supportedFormatsArray.filter(function (format) {
            return !!format.masks;
        });
        for (var _b = 0, maskingFormats_1 = maskingFormats; _b < maskingFormats_1.length; _b++) {
            var maskingFormat = maskingFormats_1[_b];
            if (maskingFormat.masks) {
                for (var _c = 0, _d = maskingFormat.masks; _c < _d.length; _c++) {
                    var maskedFormatKey = _d[_c];
                    var maskedFormat = this._formats.get(maskedFormatKey);
                    if (maskedFormat) {
                        if (!maskedFormat.maskedBy) {
                            maskedFormat.maskedBy = [maskingFormat.key];
                        }
                        else {
                            maskedFormat.maskedBy.push(maskingFormat.key);
                        }
                    }
                }
            }
        }
    }
    Object.defineProperty(BaseRteConfiguration.prototype, "editorElementClassName", {
        get: function () {
            return 'cke_editable';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRteConfiguration.prototype, "formats", {
        get: function () {
            return this._formats;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRteConfiguration.prototype, "supportedFormatsArray", {
        get: function () {
            return this._supportedFormatsArray;
        },
        enumerable: true,
        configurable: true
    });
    return BaseRteConfiguration;
}());



/***/ }),

/***/ "wpGb":
/*!*****************************************!*\
  !*** ./lib/rte/ckeditor/ElementPath.js ***!
  \*****************************************/
/*! exports provided: generateElementPath, getElementFromPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateElementPath", function() { return generateElementPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementFromPath", function() { return getElementFromPath; });
/**
 * Generate an index path from root element to the target element.
 *
 * @example. In following CKEditor element structure, the path of `target` element will be [1, 2, 1]
 * <root>
 *   <p>example</p>
 *   <div>
 *     <target>some text</target>
 *   </div>
 * </root>
 */
function generateElementPath(root, target) {
    var path = [];
    if (!root.contains(target)) {
        return undefined;
    }
    while (target !== undefined && !target.equals(root)) {
        var parent_1 = target.getParent();
        if (parent_1) {
            var children = parent_1.getChildren();
            var index = -1;
            for (var i = 0; i < parent_1.getChildCount(); i++) {
                if (children.getItem(i).equals(target)) {
                    index = i;
                    break;
                }
            }
            path.push(index);
            target = parent_1;
        }
        else {
            break;
        }
    }
    return path;
}
/**
 * Find the target element by applying the index path to a given root element.
 */
function getElementFromPath(root, path) {
    var target = root;
    while (path && path.length && target) {
        var index = path.pop(); // It's not undefined because path.length > 0.
        target = target.getChildren().getItem(index);
    }
    return target || undefined;
}


/***/ }),

/***/ "x5Sg":
/*!******************************************!*\
  !*** ./lib/rte/common/ImageUtilities.js ***!
  \******************************************/
/*! exports provided: Base64MimeType, Base64toBlob */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base64MimeType", function() { return Base64MimeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base64toBlob", function() { return Base64toBlob; });
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * A collection of helper methods related to image.
 */
/**
 * Gets the mime type from the string.
 */
function Base64MimeType(encoded) {
    var result = undefined;
    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
        result = mime[1];
    }
    return result;
}
/**
 * Converts base 64 image to blob.
 */
function Base64toBlob(b64Data, contentType) {
    if (contentType === void 0) { contentType = ''; }
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    var length = byteCharacters.length;
    var byteNumbers;
    for (var offset = 0; offset < length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        byteNumbers = [];
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
        byteNumbers.length = 0;
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}


/***/ }),

/***/ "x7RT":
/*!**********************************************!*\
  !*** ./lib/rte/ckeditor/TopicSuggestions.js ***!
  \**********************************************/
/*! exports provided: TopicSuggestions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopicSuggestions", function() { return TopicSuggestions; });
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _baseRte_BaseRte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../baseRte/BaseRte */ "oubO");
/**
 * @copyright (c) Microsoft Corporation.  All rights reserved.
 */


var HASHTAG_SYMBOL_POSITION = 1;
/**
 * This class contains a callback that manage how Topic suggestions
 * are retrieved to be used in BaseRte, using previous suggestions if needed.
 */
var TopicSuggestions = /** @class */ (function () {
    function TopicSuggestions() {
    }
    TopicSuggestions.topicPickerCallback = function (rte, tagName, matchInfo, callback) {
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('TopicSearchFailure');
        var title = matchInfo.query.substring(HASHTAG_SYMBOL_POSITION).trim();
        if (!title.length) { // no query yet
            qosMonitor.writeSuccess(); // nothing to fail.
            callback(rte.recentTopics);
        }
        else { // picker with title as query
            callback(rte.prevTopics || []);
            var previousSuggestions = rte.getTopicSuggestions(title)
                .then(function (topicSuggestionResult) {
                var autoSuggestions = _baseRte_BaseRte__WEBPACK_IMPORTED_MODULE_1__["BaseRte"].makeTopicSuggestions(topicSuggestionResult);
                callback(autoSuggestions);
                qosMonitor.writeSuccess();
                return autoSuggestions;
            })
                .catch(function (error) {
                qosMonitor.writeUnexpectedFailure('SearchTopicFail', error);
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(_baseRte_BaseRte__WEBPACK_IMPORTED_MODULE_1__["BaseRte"].logSource, error);
                return rte.recentTopics;
            });
            return previousSuggestions;
        }
    };
    return TopicSuggestions;
}());



/***/ }),

/***/ "y88i":
/*!********************************************!*\
  !*** external "@ms/odsp-utilities-bundle" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_y88i__;

/***/ }),

/***/ "yH57":
/*!******************************************!*\
  !*** ./lib/rte/webPartRte/WebPartRte.js ***!
  \******************************************/
/*! exports provided: WebPartRte */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebPartRte", function() { return WebPartRte; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ms/sp-a11y */ "ytfe");
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _baseRte_BaseRte__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../baseRte/BaseRte */ "oubO");
/* harmony import */ var _baseRte_BaseRteConfiguration__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../baseRte/BaseRteConfiguration */ "wG+9");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common/KillSwitches */ "+ORw");
/* harmony import */ var _CKEditorForWebPartRte__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./CKEditorForWebPartRte */ "rYEu");
/* harmony import */ var _a11y_RteA11y__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../a11y/RteA11y */ "Qyis");
/* harmony import */ var _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../loc/RteStrings.resx */ "Dj9n");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */













/**
 * WebPartRte component. This component is used inside webparts.
 *
 * @internal
 */
var WebPartRte = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WebPartRte, _super);
    function WebPartRte(props) {
        var _this = _super.call(this, props, WebPartRte.defaultOptions) || this;
        _this.TAG_NAME = 'WebPartRte.';
        return _this;
    }
    WebPartRte._getFormattingBarDefaultPosition = function (isRtl) {
        if (isRtl === void 0) { isRtl = false; }
        var left = isRtl ? undefined : 0;
        // The default height of RTE textarea plus border is 202. We have to do this because the order of textarea and
        // formattingbar in the BaseRte is inverted. And we should change the BaseRte as less as possible.
        var top = -202;
        var position = 'relative';
        var right = isRtl ? 0 : undefined;
        return { left: left, top: top, position: position, right: right };
    };
    WebPartRte.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
    };
    WebPartRte.prototype.focus = function () {
        _super.prototype.focus.call(this);
    };
    WebPartRte.prototype._initState = function () {
        this.state = {
            displayMode: this.props.displayMode,
            formattingBarPosition: WebPartRte._getFormattingBarDefaultPosition(this._isRtl),
            isFormattingBarHidden: false
        };
    };
    WebPartRte.prototype._createNewEditor = function (innerHTML, startUpFocus) {
        return this._options.editor.createNewEditor({
            config: this._config,
            currentHTML: innerHTML,
            editorElement: this._editorElement,
            selectionChangeCallback: this._handleSelectionChange,
            textChangeCallback: this._handleTextChange.bind(this),
            startUpFocus: startUpFocus,
            onImagePasteCallBack: function () {
                /* no-op */
            },
            onPasteCallback: function () {
                /* no-op */
            },
            onContextMenuCallBack: function () {
                /* no-op */
            },
            onKeyDownCallBack: this._handleEditorKeyDown,
            placeholder: this.props.placeholder
        });
    };
    WebPartRte.prototype._afterEditorCreated = function (editor) {
        this._editor = editor;
        this._handleTextChange();
        var formattingbarElement = react_dom__WEBPACK_IMPORTED_MODULE_1__["findDOMNode"](this._formattingBar);
        // Prevent a11y manager to handle "tab" and "shift+tab" event from formatting bar.
        // When pressing shift+tab in Edge, a11y manager fails to correctly set focus into the editor input.
        formattingbarElement.setAttribute('data-sp-a11y-skipkeys', String(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["KeyCodes"].tab));
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_9__["default"].rteToolboxOverlayKillSwitch.isActivated()) {
            this._editorWrapper.style.position = 'relative';
            this._editorWrapper.style.height = formattingbarElement.offsetHeight + this._editorElement.offsetHeight + "px";
            this._editorElement.style.position = 'absolute';
            this._editorElement.style.top = formattingbarElement.offsetHeight + "px";
            this._editorElement.style.width = '100%';
            formattingbarElement.style.position = 'absolute';
            formattingbarElement.style.top = "0";
        }
        else {
            // These code is to adjust the position of RTE textarea and formattingbar. The RTE textarea is ahead of the
            // formattingbar in the BaseRte. We need to change their orders.
            this._editorElement.style.position = 'relative';
            this._editorElement.style.top = formattingbarElement.offsetHeight + "px";
            formattingbarElement.style.top = "-" + this._editorElement.offsetHeight + "px";
        }
        // Keyboard event dispatched from iframe will not be captured by element outside the iframe.
        // At the same time, we want to capture the keystroke ALT + F10 which is used to navigate inside formattingbar
        // before canvas captures it. So it handles the keydown event in iframe and then re-dispatch the event on iframe.
        var iframe = this._editorElement.querySelector('iframe');
        if (iframe && iframe.contentDocument) {
            iframe.contentDocument.addEventListener('paste', this._onBeforePaste, true);
            var ariaLabel = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Text"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_12__["default"].RichTextEditorIframeTitle, this.props.ariaLabel || '', _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_12__["default"].RichTextEditorAriaLabel);
            // Make iframe provide contextual information by set title attribute http://webaim.org/techniques/frames/
            iframe.setAttribute('title', ariaLabel);
        }
        this._initPagePicker();
    };
    WebPartRte.prototype._finalizeAction = function (ariaActionName) {
        _super.prototype._finalizeAction.call(this, ariaActionName);
        // We need to pass the current RTE content back to the webPart which uses WebPartRte.
        if (this.props.onChanged) {
            var newValue = this._editor ? this._editor.getHTML() : this.props.innerHTML;
            if (newValue) {
                this.props.onChanged(newValue);
            }
        }
    };
    /**
     * Here is the a11y design of webPartRte:
     *
     * Keyboard:
     *   1. Focus on textbox, pressing TAB or shift-TAB will move focus outside the textbox.
     *      a. TAB goes to formattingBar.
     *      b. Shift + TAB goes to previous control.
     *      c. Press TAB on formattingBar goes to next control.
     *   2. Focus on textbox, pressing Alt + F10 will move focus to formattingBar. (Same as TextWebpart)
     *   3. Focus on formattingBar, pressing Escape will exit the webpart. (It’s captured by framework)
     *   4. Focus on formattingBar, pressing Shift + TAB will move focus back to textbox
     *   5. Focus in textbox (iframe) will not be lost. The keystroke for canvas still works.
     *      E.g. Escape to exit webpart, Alt + P to go to property pane).
     *
     * Screen reader:
     *   1. Focus on textbox, pressing Alt + F10, screen reader will tell user to:
     *      a. Use arrow keys to navigate inside formattingBar. (same as TextWebpart)
     *      b. Use Shift + TAB to move focus back to textbox. (different with TextWebpart)
     *   2. Focus on textbox, screen reader read instruction of pressing Alt + F10 to go to the formattingBar.
     */
    /**
     * WebpartRte doesn't need to handle the keydown event captured in BaseRte,
     * so we override this handle function as empty.
     * Instead, WebpartRte directly listens to ckeditor instance, and handles keydown event with private handler.
     */
    WebPartRte.prototype._handleKeyDown = function (evt) {
        /* no-op */
    };
    /**
     * The callback to handle keydown event inside ckeditor.
     * @param evt - the keyboard event.
     */
    WebPartRte.prototype._handleEditorKeyDown = function (evt) {
        if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_6__["Keyboard"].isKey(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["KeyCodes"].f10, evt, { alt: true }) && this._formattingbarElement) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEvent(this.TAG_NAME + 'ToolbarByKeyboardShortcut.Focus', evt.type);
            Object(_a11y_RteA11y__WEBPACK_IMPORTED_MODULE_11__["navigateInside"])(this._formattingbarElement);
            var screenReaderInstruction = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Text"].format(_loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_12__["default"].RichTextNavigationAltF10Keys, _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_12__["default"].ToolbarNavigationArrowKeys, _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_12__["default"].ToolbarNavigationShiftTabKey);
            Object(_a11y_RteA11y__WEBPACK_IMPORTED_MODULE_11__["ariaAlert"])(screenReaderInstruction);
            evt.stopPropagation();
            evt.preventDefault();
        }
        else if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_6__["Keyboard"].isKey('K'.charCodeAt(0), evt, { ctrl: true })) {
            this._handleLink();
            evt.stopPropagation();
            evt.preventDefault();
        }
        else if (!_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_6__["Keyboard"].isKey(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["KeyCodes"].tab, evt) &&
            !_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_6__["Keyboard"].isKey(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["KeyCodes"].tab, evt, { shift: true })) {
            this._redispatchKeyboardEvent(evt);
        }
    };
    /**
     * Re-dispatch the event inside iframe so that framework can capture the keyboard event in RTE.
     * It is to make sure keystroke for canvas used to exit webpart or jump to property pane can work as expected.
     * There is an issue of chrome http://stackoverflow.com/questions/8942678/keyboardevent-in-chrome-keycode-is-0
     * As workaround it initializes an Event instead of KeyboardEvent and it is merged with the necessary values
     * from the event being re-dispatched.
     */
    WebPartRte.prototype._redispatchKeyboardEvent = function (evt) {
        var emptyEvent = document.createEvent('Event');
        emptyEvent.initEvent(evt.type, true, true);
        var clonedEvent = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["merge"])(emptyEvent, {
            keyCode: evt.keyCode,
            code: evt.code,
            which: evt.which,
            altKey: evt.altKey,
            ctrlKey: evt.ctrlKey
        });
        if (this._editorElement) {
            this._editorElement.dispatchEvent(clonedEvent);
        }
    };
    WebPartRte.defaultOptions = {
        editor: _CKEditorForWebPartRte__WEBPACK_IMPORTED_MODULE_10__["default"],
        config: new _baseRte_BaseRteConfiguration__WEBPACK_IMPORTED_MODULE_8__["BaseRteConfiguration"](),
        loader: _CKEditorForWebPartRte__WEBPACK_IMPORTED_MODULE_10__["default"].moduleLoader
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["autobind"]
    ], WebPartRte.prototype, "_handleEditorKeyDown", null);
    return WebPartRte;
}(_baseRte_BaseRte__WEBPACK_IMPORTED_MODULE_7__["BaseRte"]));



/***/ }),

/***/ "ytfe":
/*!******************************!*\
  !*** external "@ms/sp-a11y" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ytfe__;

/***/ }),

/***/ "zvHu":
/*!********************************************!*\
  !*** ./lib/rte/ckeditor/CKTableHelpers.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../loc/RteStrings.resx */ "Dj9n");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__);



var CKTableHelpers = /** @class */ (function () {
    function CKTableHelpers() {
    }
    CKTableHelpers.selectTable = function (editor, table) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(table, 'table');
        var selection = editor && editor.getSelection();
        if (selection) {
            selection.selectElement(table);
        }
    };
    CKTableHelpers.insertTableAfterWrapper = function (startElement, outerDiv, parent, editor) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(startElement, 'startElement');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(outerDiv, 'outerDiv');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(editor, 'editor');
        if (parent) {
            outerDiv.insertAfter(parent);
            CKTableHelpers.insertExtraParagraph(outerDiv);
        }
        else if (startElement && startElement.hasClass(CKTableHelpers.tableWrapperDivClass)) {
            outerDiv.insertAfter(startElement);
            CKTableHelpers.insertExtraParagraph(outerDiv);
        }
        else {
            editor.insertElement(outerDiv);
            CKTableHelpers.insertExtraParagraph(outerDiv);
        }
    };
    CKTableHelpers.insertExtraParagraph = function (outerDiv) {
        // Cursor positioning around tables is difficult. We add extra paragraphs before to reduce friction.
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(outerDiv, 'outerDiv');
        var extraParagraph = new CKEDITOR.dom.element('p');
        var paragraphContent = new CKEDITOR.dom.element('br');
        paragraphContent.appendTo(extraParagraph);
        extraParagraph.insertBefore(outerDiv);
    };
    CKTableHelpers.constructTableComponentOnLoad = function (tableList, editor) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(tableList, 'tableList');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(editor, 'editor');
        for (var tableListIndex = 0; tableListIndex < tableList.count(); tableListIndex++) {
            var table = tableList.getItem(tableListIndex);
            var outerDiv = CKTableHelpers.findParent(table, CKTableHelpers.canvasRteResponsiveTableClassName);
            if (!outerDiv) {
                outerDiv = new CKEDITOR.dom.element('div');
                outerDiv.addClass(CKTableHelpers.canvasRteResponsiveTableClassName);
                table.appendTo(outerDiv);
            }
            if (!table) {
                return;
            }
            table.setAttribute('title', _loc_RteStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TableTitle);
            var tableWrapper = table.getParent();
            if ((tableWrapper && !tableWrapper.hasClass(CKTableHelpers.tableWrapperDivClass)) || !tableWrapper) {
                outerDiv = CKTableHelpers.wrapTableInDiv(table, outerDiv);
            }
        }
    };
    CKTableHelpers.wrapTableInDiv = function (table, outerDiv) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(table, 'table');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(outerDiv, 'outerDiv');
        // The table wrapper div helps align the table
        var tableWrapperDiv = CKTableHelpers.generateWrappers(CKTableHelpers.tableWrapperDivClass);
        table.appendTo(tableWrapperDiv);
        tableWrapperDiv.appendTo(outerDiv);
        return outerDiv;
    };
    CKTableHelpers.generateWrappers = function (className) {
        var wrapper = new CKEDITOR.dom.element('div');
        if (className) {
            wrapper.addClass(className);
        }
        wrapper.setHtml('');
        return wrapper;
    };
    CKTableHelpers.setTableStyle = function (table, styleType, colorSuffix, editor) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(table, 'table');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(styleType, 'styleType');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(colorSuffix, 'color');
        CKTableHelpers._removeTableStyles(table, "Theme" /* Theme */);
        CKTableHelpers._removeTableStyles(table, "Neutral" /* Neutral */);
        var tableStyleClassName;
        var boldHeader = true;
        switch (styleType) {
            case "borderHeaderTableStyle" /* BorderHeaderTableStyle */:
                tableStyleClassName = CKTableHelpers.borderHeaderTableStyle;
                break;
            case "filledHeaderTableStyle" /* FilledHeaderTableStyle */:
                tableStyleClassName = CKTableHelpers.filledHeaderTableStyle;
                break;
            case "bandedRowTableStyle" /* BandedRowTableStyle */:
                tableStyleClassName = CKTableHelpers.bandedRowTableStyle;
                break;
            case "bandedRowColumnTableStyle" /* BandedRowColumnTableStyle */:
                tableStyleClassName = CKTableHelpers.bandedRowColumnTableStyle;
                break;
            default:
                tableStyleClassName = CKTableHelpers.simpleTableStyle;
                boldHeader = false;
                break;
        }
        // This sets up the classname for table style based on color theme or neutral
        tableStyleClassName += colorSuffix;
        table.addClass(tableStyleClassName);
        CKTableHelpers._setTableRowTextStyle(editor, table, boldHeader);
    };
    CKTableHelpers.setTableAlignment = function (editor, alignType) {
        var table = editor && editor.elementPath() && editor.elementPath().contains('table', true);
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(table, 'table');
        var ascendant = CKTableHelpers.findParent(table, CKTableHelpers.tableWrapperDivClass);
        if (ascendant) {
            // Remove the old class before applying the new one
            var tableAlignClasses = [
                CKTableHelpers.tableCenterAlign,
                CKTableHelpers.tableLeftAlign,
                CKTableHelpers.tableRightAlign
            ];
            CKTableHelpers._removeAllClassesFromList(tableAlignClasses, ascendant);
            var alignClass = void 0;
            switch (alignType) {
                case "alignCenter" /* AlignCenter */:
                    alignClass = CKTableHelpers.tableCenterAlign;
                    break;
                case "alignLeft" /* AlignLeft */:
                    alignClass = CKTableHelpers.tableLeftAlign;
                    break;
                case "alignRight" /* AlignRight */:
                    alignClass = CKTableHelpers.tableRightAlign;
                    break;
            }
            if (alignClass) {
                ascendant.addClass(alignClass);
            }
        }
    };
    CKTableHelpers.setAlignTableCommandState = function (element, className, command) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(command, 'command');
        if (element) {
            var ascendant = CKTableHelpers.findParent(element, CKTableHelpers.tableWrapperDivClass);
            if (ascendant && ascendant.hasClass(className)) {
                command.setState(CKEDITOR.TRISTATE_ON);
            }
            else {
                command.setState(CKEDITOR.TRISTATE_OFF);
            }
        }
        else {
            command.setState(CKEDITOR.TRISTATE_OFF);
        }
    };
    CKTableHelpers.findParent = function (element, className) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(element, 'element');
        var parent = element.getParent();
        while (parent) {
            if (parent.hasClass(className)) {
                return parent;
            }
            parent = parent.getParent();
        }
        return parent;
    };
    CKTableHelpers._removeTableStyles = function (table, color) {
        var tableStyleClasses = [
            CKTableHelpers.simpleTableStyle + color,
            CKTableHelpers.borderHeaderTableStyle + color,
            CKTableHelpers.filledHeaderTableStyle + color,
            CKTableHelpers.bandedRowTableStyle + color,
            CKTableHelpers.bandedRowColumnTableStyle + color
        ];
        CKTableHelpers._removeAllClassesFromList(tableStyleClasses, table);
    };
    CKTableHelpers._removeAllClassesFromList = function (classList, element) {
        classList.forEach(function (className) {
            // Multi arg remove does not work in IE
            element.$.classList.remove(className);
        });
    };
    CKTableHelpers._setTableRowTextStyle = function (editor, table, boldHeader) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(editor, 'editor');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(table, 'table');
        var selection = editor.getSelection();
        if (selection) {
            var preStylingSelectedRange = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["cloneDeep"])(selection.getRanges());
            var tableBody = table.getFirst();
            var tableRow = tableBody && tableBody.getFirst();
            if (!tableRow) {
                return;
            }
            selection.selectElement(tableRow);
            if (document.queryCommandState('bold') && !boldHeader) {
                // We need to call document's execCommand because the editor one does not
                // work here for some reason.
                document.execCommand('bold', false);
            }
            else if (!document.queryCommandState('bold') && boldHeader) {
                // Bold the first table row text
                editor.execCommand('bold');
            }
            if (preStylingSelectedRange) {
                selection.selectRanges(preStylingSelectedRange);
            }
        }
    };
    CKTableHelpers.canvasRteTableClassName = 'canvasRteTable';
    CKTableHelpers.canvasRteResponsiveTableClassName = 'canvasRteResponsiveTable';
    CKTableHelpers.tableWrapperDivClass = 'tableWrapper';
    CKTableHelpers.tableCenterAlign = 'tableCenterAlign';
    CKTableHelpers.tableLeftAlign = 'tableLeftAlign';
    CKTableHelpers.tableRightAlign = 'tableRightAlign';
    CKTableHelpers.simpleTableStyle = 'simpleTableStyle';
    CKTableHelpers.borderHeaderTableStyle = 'borderHeaderTableStyle';
    CKTableHelpers.filledHeaderTableStyle = 'filledHeaderTableStyle';
    CKTableHelpers.bandedRowTableStyle = 'bandedRowTableStyle';
    CKTableHelpers.bandedRowColumnTableStyle = 'bandedRowColumnTableStyle';
    return CKTableHelpers;
}());
/* harmony default export */ __webpack_exports__["default"] = (CKTableHelpers);


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

/***/ "@ms/sp-component-utilities":
/*!*********************************************!*\
  !*** external "@ms/sp-component-utilities" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_component_utilities__;

/***/ }),

/***/ "@ms/sp-dataproviders":
/*!***************************************!*\
  !*** external "@ms/sp-dataproviders" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_dataproviders__;

/***/ }),

/***/ "@ms/sp-safehtml":
/*!**********************************!*\
  !*** external "@ms/sp-safehtml" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_safehtml__;

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
//# sourceMappingURL=sp-rte_en-us.js.map