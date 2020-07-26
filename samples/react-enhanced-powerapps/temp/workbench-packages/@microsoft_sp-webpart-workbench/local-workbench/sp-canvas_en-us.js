define("85093aa7-8c12-4683-91aa-47cd5e2654db_2.5.0", ["@microsoft/load-themed-styles","@microsoft/office-ui-fabric-react-bundle","@microsoft/sp-component-base","@microsoft/sp-core-library","@microsoft/sp-diagnostics","@microsoft/sp-http","@microsoft/sp-loader","@microsoft/sp-lodash-subset","@microsoft/sp-page-context","@microsoft/sp-webpart-base","@ms/odsp-utilities-bundle","@ms/sp-a11y","@ms/sp-anchor","@ms/sp-component-utilities","@ms/sp-deferred-component","@ms/sp-dragzone","@ms/sp-load-themed-styles","@ms/sp-safehtml","@ms/sp-telemetry","@ms/uifabric-styling-bundle","react","react-dom"], function(__WEBPACK_EXTERNAL_MODULE__microsoft_load_themed_styles__, __WEBPACK_EXTERNAL_MODULE__microsoft_office_ui_fabric_react_bundle__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_component_base__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_core_library__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_diagnostics__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_http__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_loader__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_lodash_subset__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_page_context__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_webpart_base__, __WEBPACK_EXTERNAL_MODULE__ms_odsp_utilities_bundle__, __WEBPACK_EXTERNAL_MODULE__ms_sp_a11y__, __WEBPACK_EXTERNAL_MODULE__ms_sp_anchor__, __WEBPACK_EXTERNAL_MODULE__ms_sp_component_utilities__, __WEBPACK_EXTERNAL_MODULE__ms_sp_deferred_component__, __WEBPACK_EXTERNAL_MODULE__ms_sp_dragzone__, __WEBPACK_EXTERNAL_MODULE__ms_sp_load_themed_styles__, __WEBPACK_EXTERNAL_MODULE__ms_sp_safehtml__, __WEBPACK_EXTERNAL_MODULE__ms_sp_telemetry__, __WEBPACK_EXTERNAL_MODULE__ms_uifabric_styling_bundle__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./sp-canvas.js");
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
    "_jP9TaPNRkCXWU4OplNcN+w": {
      "AriaWebPartOrSectionEnterTemplate": "{0}. Press Enter to navigate inside the {1}. When inside, use Alt+F10 to go to toolbar, use Alt+P to move focus to the property pane and use Escape to exit the {1}.  ",
      "CanvasZoneAriaWebpartName": "{0} Web Part",
      "DeleteZoneConfirmationDialogMessage": "Are you sure you want to delete this section and everything in it?",
      "DeleteConfirmationDialogTitle": "Delete Confirmation",
      "DeleteConfirmationDialogMessage": "Are you sure you want to delete this web part?",
      "TextWebPartDisplayName": "Text",
      "ToolbarNavigationArrowKeys": "Use arrow keys to navigate inside the toolbar.",
      "ToolboxErrorMessage": "There was an error fetching the web parts. Not all web parts may be available.",
      "ToolboxOneColumnPart": "One column",
      "ToolboxTwoColumnPart": "Two columns",
      "ToolboxThreeColumnPart": "Three columns",
      "ToolboxOneThirdRightColumnPart": "One-third right column",
      "ToolboxOneThirdLeftColumnPart": "One-third left column",
      "ToolboxFullWidthColumnPart": "Full-width section",
      "ToolboxVerticalColumnPart": "Vertical section",
      "ToolboxVerticalColumnToolTipText": "Can't add a vertical section because one already exists, or because there is a full-width column on the page.",
      "ToolboxFullWidthColumnTooltipText": "Can't add a full-width section because there is a vertical section on the page.",
      "WebPartAriaLabel": "web part",
      "SectionContextualAriaLabel": "{0}, {1} section containing {2}",
      "SectionAriaLabel": "section",
      "WebPartsInSectionLabel": "{0}, {1}",
      "ToolboxHintSectionTitleOnlyLayouts": "Add a new section",
      "EmptySectionAriaLabel": "no webpart",
      "SectionPositionAriaLabel": "Section {0} of {1}",
      "DeleteConfirmationLabel": "{0} has been deleted.",
      "CanvasVerticalSectionZoneLabel": "Section with vertical column layout",
      "YammerHighlightsWebpartTitle": "Highlights",
      "ToolbarDuplicateSectionTitle": "Duplicate section",
      "ToolbarDuplicateWebPartTitle": "Duplicate web part"
    },
    "_EJ1q3VoG+8ZXJZ4MxzV0eA": {
      "WebpartToolbarConfigButtonTitle": "Edit web part",
      "WebpartToolbarMoveButtonTitle": "Move web part",
      "WebpartToolbarDeleteButtonTitle": "Delete web part",
      "ToolboxHintTitleWithLayout": "Add a new web part in {0}",
      "ToolboxHintColumnOne": "column one",
      "ToolboxHintColumnTwo": "column two",
      "ToolboxHintColumnThree": "column three"
    },
    "_kfkx9h4IuXbYoZ4SdLEjrQ": {
      "ZoneToolbarConfigButtonTitle": "Edit section",
      "ZoneToolbarMoveButtonTitle": "Move section",
      "ZoneToolbarDeleteButtonTitle": "Delete section"
    },
    "_Y0A4BcyJyc+bxtmPl9owxQ": {
      "RTETitle": "Text"
    },
    "_RwfGwiICg7NIkBtVXtUA2A": {
      "AddedTemplate": "Added {0}",
      "DeletedTemplate": "Deleted {0} ",
      "EditedTemplate": "Edited {0}",
      "MovedTemplate": "Moved {0}",
      "EditedAndMovedTemplate": "Edited and moved {0}",
      "EmphasisChangeTemplate": "Changed section background from {0} to {1}"
    },
    "_+b5qGTPD+RXDByAXIV1Ykg": {
      "DragIconFallbackRTEText": "Text",
      "DragZoneHandleTitle": "Press Enter or Space to enter move mode",
      "DragZoneMoveStarted": "Press up arrow key to move up and down arrow key to move down. Press Enter to confirm the move. Press escape to cancel the move. ",
      "DragZoneMoveComplete": "Moved web part from {0} to {1}. ",
      "DragZoneMoveCompleteZone": "Moved section from {0} to {1}",
      "DragZoneMoveCancelled": "Move has been cancelled.",
      "DragZoneMoveNotAllowedAriaLabel": "Can't move any further in that direction, or move is not allowed to that section",
      "DragZoneMoveNotAllowed": "Move not allowed",
      "DragZoneMoveInsideLevelControl": "Position {0}",
      "DragZoneMoveInsideLevelSection": "Column {0}, position {1}",
      "DragZoneMoveInsideLevelZone": "Section {0}, column {1}, position {2}"
    },
    "_zNkNsILQ4Z9dR/KbRxmJKg": {
      "TextWebPartDisplayName": "Text",
      "TextWebpartDescription": "Add and format text"
    },
    "_dxPPhXzV27f2yBrPm3n1CQ": {
      "SectionPropertyPaneTitle": "Section",
      "SectionPropertyPaneColumnGroupName": "Layout options",
      "SectionBackgroundPropertyColumnGroupName": "Section background",
      "SectionBackgroundNeutralButtonLabel": "Neutral",
      "SectionBackgroundSoftButtonLabel": "Soft",
      "SectionBackgroundStrongButtonLabel": "Strong",
      "SectionBackgroundNoneButtonLabel": "None"
    },
    "_aldiWWnENoBI4mn+VYF4ZA": {
      "Title": "Widen your browser window",
      "Subtitle": "Editing is not available in a narrow browser window. Make the window wider to continue editing."
    },
    "_MwrtOXTlcgEoK/GDGf1eQg": {
      "FormattingBarMoreButtonTitle": "More",
      "TextWebPartPlaceholder": "Add your text here."
    },
    "_8hUJbMifOh43gp1+NrT4Ig": {
      "FormattingBarClearFormattingButtonTitle": "Clear all formatting",
      "FormattingBarNormalTextButtonTitle": "Normal text",
      "FormattingBarHeading2ButtonTitle": "Heading 1",
      "FormattingBarHeading3ButtonTitle": "Heading 2",
      "FormattingBarHeading4ButtonTitle": "Heading 3",
      "FormattingBarQuoteButtonTitle": "Pull quote",
      "RTESettingsText": "Text and table formatting",
      "FontDropDownText": "Font style",
      "ParagraphGroupText": "Paragraph",
      "FontSizeDropDownLabel": "Font size",
      "TableGroup": "Table",
      "InsertAndDeleteGroupLabel": "Insert and delete",
      "FontColorLabel": "Font color",
      "StandardColorLabel": "Standard colors",
      "DefaultColorLabel": "Automatic",
      "RedDarkLabel": "Dark red",
      "RedLabel": "Red",
      "YellowLabel": "Yellow",
      "GreenLightLabel": "Light green",
      "GreenLabel": "Green",
      "GreenDarkLabel": "Dark green",
      "BlueLightLabel": "Light blue",
      "BlueLabel": "Blue",
      "BlueDarkLabel": "Dark blue",
      "PurpleLabel": "Purple",
      "HightlightLabel": "Highlight color",
      "HightlightColorsLabel": "Highlight colors",
      "OrangeLabel": "Orange",
      "RemoveHighlightColor": "No color",
      "HyperlinkGroupLabel": "Hyperlink",
      "TealLabel": "Teal",
      "MagentaLabel": "Magenta",
      "AquaLabel": "Aqua",
      "MaroonLabel": "Maroon",
      "GoldLabel": "Gold",
      "GreyLabel": "Grey",
      "DarkGreyLabel": "Dark grey",
      "BlackLabel": "Black",
      "ThemeColorGroupLabel": "Theme colors",
      "ThemeDarkerLabel": "Theme darker",
      "ThemeDarkLabel": "Theme dark",
      "ThemeDarkAltLabel": "Theme dark alternate",
      "ThemePrimaryLabel": "Theme primary",
      "ThemeSecondaryLabel": "Theme secondary",
      "NeutralDarkLabel": "Neutral dark",
      "NeutralPrimaryLabel": "Neutral primary",
      "NeutralPrimaryAltLabel": "Neutral primary alternate",
      "NeutralSecondaryLabel": "Neutral secondary",
      "NeutralTertiaryLabel": "Neutral tertiary",
      "TableStylesGroupLabel": "Table styles",
      "AlignTableGroupLabel": "Table alignment",
      "FormattingBarPreButtonTitle": "Monospaced",
      "PropertyPaneButtonAriaLabel": "Group {0}, {1}",
      "PropertyPaneWikiLinkingLabel": "Tip: You can also add a hyperlink by typing [[ or [[your link name | URL]] where you want your link to appear."
    }
  };

  strings.default = strings;
  return strings;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sp-canvas.js":
/*!**********************!*\
  !*** ./sp-canvas.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! @ms/sp-telemetry */ "@ms/sp-telemetry"),__webpack_require__(/*! @ms/sp-load-themed-styles */ "@ms/sp-load-themed-styles"),__webpack_require__(/*! @microsoft/sp-component-base */ "@microsoft/sp-component-base"),__webpack_require__(/*! @microsoft/sp-loader */ "@microsoft/sp-loader"),__webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "@microsoft/office-ui-fabric-react-bundle"),__webpack_require__(/*! @ms/sp-safehtml */ "@ms/sp-safehtml"),__webpack_require__(/*! @microsoft/sp-lodash-subset */ "@microsoft/sp-lodash-subset"),__webpack_require__(/*! @microsoft/sp-core-library */ "@microsoft/sp-core-library"),__webpack_require__(/*! @microsoft/sp-page-context */ "@microsoft/sp-page-context"),__webpack_require__(/*! @microsoft/sp-webpart-base */ "@microsoft/sp-webpart-base"),__webpack_require__(/*! react */ "react"),__webpack_require__(/*! @ms/sp-anchor */ "@ms/sp-anchor"),__webpack_require__(/*! react-dom */ "react-dom"),__webpack_require__(/*! @ms/uifabric-styling-bundle */ "@ms/uifabric-styling-bundle"),__webpack_require__(/*! @ms/sp-component-utilities */ "@ms/sp-component-utilities"),__webpack_require__(/*! @ms/sp-dragzone */ "@ms/sp-dragzone"),__webpack_require__(/*! @microsoft/load-themed-styles */ "@microsoft/load-themed-styles"),__webpack_require__(/*! @ms/sp-deferred-component */ "@ms/sp-deferred-component"),__webpack_require__(/*! @microsoft/sp-diagnostics */ "@microsoft/sp-diagnostics"),__webpack_require__(/*! @microsoft/sp-http */ "@microsoft/sp-http"),__webpack_require__(/*! resx-strings */ "../lib/resx-strings/en-us.js"),__webpack_require__(/*! @ms/odsp-utilities-bundle */ "@ms/odsp-utilities-bundle"),__webpack_require__(/*! @ms/sp-a11y */ "@ms/sp-a11y")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(__WEBPACK_EXTERNAL_MODULE__2q6Q__, __WEBPACK_EXTERNAL_MODULE__5z2F__, __WEBPACK_EXTERNAL_MODULE__7Awa__, __WEBPACK_EXTERNAL_MODULE_I6O9__, __WEBPACK_EXTERNAL_MODULE_KL1q__, __WEBPACK_EXTERNAL_MODULE_NEVa__, __WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_X_PM__, __WEBPACK_EXTERNAL_MODULE_br4S__, __WEBPACK_EXTERNAL_MODULE_cDcd__, __WEBPACK_EXTERNAL_MODULE_dYC___, __WEBPACK_EXTERNAL_MODULE_faye__, __WEBPACK_EXTERNAL_MODULE_fglE__, __WEBPACK_EXTERNAL_MODULE_hiL___, __WEBPACK_EXTERNAL_MODULE_iiHs__, __WEBPACK_EXTERNAL_MODULE_jOlS__, __WEBPACK_EXTERNAL_MODULE_qjmy__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_vlQI__, __WEBPACK_EXTERNAL_MODULE_vpy3__, __WEBPACK_EXTERNAL_MODULE_y88i__, __WEBPACK_EXTERNAL_MODULE_ytfe__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"sp-canvas": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({"sp-canvas-edit":"sp-canvas-edit","vendors~sp-canvas-diff":"vendors~sp-canvas-diff","sp-canvas-diff":"sp-canvas-diff","vendors~sp-canvas-narrow-dialog":"vendors~sp-canvas-narrow-dialog","sp-canvas-narrow-dialog":"sp-canvas-narrow-dialog","vendors~sp-rte-propertypane":"vendors~sp-rte-propertypane","sp-rte-propertypane":"sp-rte-propertypane"}[chunkId]||chunkId) + "_" + {"sp-canvas-edit":"7833b0118fe685da1388","vendors~sp-canvas-diff":"c534cbeb565a153d1d5c","sp-canvas-diff":"fd041ee13e07f710ee84","vendors~sp-canvas-narrow-dialog":"46f63a5ec10caa4309a8","sp-canvas-narrow-dialog":"f11d0fa7ab9311b9acfd","vendors~sp-rte-propertypane":"c3add4a8f34393d29276","sp-rte-propertypane":"f0cf291fe70a4da71f47"}[chunkId] + ".js"
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
/******/ 	var jsonpArray = window["webpackJsonp_85093aa7_8c12_4683_91aa_47cd5e2654db_2_5_0"] = window["webpackJsonp_85093aa7_8c12_4683_91aa_47cd5e2654db_2_5_0"] || [];
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
/******/ 	  var regex = (typeof spScriptNamePattern !== 'undefined') ? spScriptNamePattern : new RegExp('\\/sp-canvas(_[a-z0-9-]+)*\\.js', 'i');
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

/***/ "+zV1":
/*!*******************************************!*\
  !*** ./lib/sp-canvas/common/Constants.js ***!
  \*******************************************/
/*! exports provided: WIKI_TITLE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WIKI_TITLE", function() { return WIKI_TITLE; });
/**
 * Wiki Title to be appended as query string to wiki links url
 * @internal
 */
// tslint:disable-next-line: export-name
var WIKI_TITLE = 'wikiTitle';


/***/ }),

/***/ "0/FH":
/*!******************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasSection/EmptyCanvasSection.js ***!
  \******************************************************************/
/*! exports provided: EmptyCanvasSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmptyCanvasSection", function() { return EmptyCanvasSection; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editChunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../editChunk */ "9s5w");
/* harmony import */ var _CanvasSection_resx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CanvasSection.resx */ "IGr+");
/* harmony import */ var _CanvasSection_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CanvasSection.scss */ "v3Ow");
/**
 * @file EmptyCanvasSection.tsx
 * @copyright (c) Microsoft Corporation. All rights reserved.
 */







var EmptyCanvasSection = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EmptyCanvasSection, _super);
    function EmptyCanvasSection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmptyCanvasSection.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])('CanvasSection', 'CanvasSection-sm12', 'CanvasSection-col', 'CanvasSection--edit'), "data-automation-id": 'CanvasSection' },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editChunk__WEBPACK_IMPORTED_MODULE_4__["DeferredCanvasToolboxHint"], { ariaLabel: _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["StringHelper"].format(_CanvasSection_resx__WEBPACK_IMPORTED_MODULE_5__["default"].ToolboxHintTitleWithLayout, _CanvasSection_resx__WEBPACK_IMPORTED_MODULE_5__["default"].ToolboxHintColumnOne), type: 2 /* Section */, layout: this.props.hintLayout, theme: this.props.theme, store: this.props.store })));
    };
    EmptyCanvasSection = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["customizable"])('EmptyCanvasSection', ['theme'])
    ], EmptyCanvasSection);
    return EmptyCanvasSection;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "17t3":
/*!**********************************************!*\
  !*** ./lib/sp-canvas/common/KillSwitches.js ***!
  \**********************************************/
/*! exports provided: KillSwitches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KillSwitches", function() { return KillSwitches; });
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__);

var KillSwitches = /** @class */ (function () {
    function KillSwitches() {
    }
    KillSwitches.tryReloadCanvasComponentWhenFailure = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["KillSwitch"]('58f114c5-8054-4705-99e3-bd4274f0116f' /* 11/08/2019', 'Try dispose and reload CanvasComponent when error' */);
    KillSwitches.isToolboxSupportTopicPage = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["KillSwitch"]('56e04eac-3e3f-4426-87bb-1fa0ec359a7c' /* 10/16/2019 'Update toolbox for topic page' */);
    KillSwitches.fixBoldFontWeightForIEAndFirefox = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["KillSwitch"]('19501c78-0e11-4693-ada0-33fa54036423' /*, 10/21/2019, Fix font bold weight for IE and Firefox*/);
    KillSwitches.openPropertyPaneOnlyInEdit = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["KillSwitch"]('6274049c-7758-44d3-b734-bf49c43c8bc7' /* '11/06/2019', 'Only open property pane in edit mode' */);
    KillSwitches.rteTypePerfWithUndo = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["KillSwitch"]('e15d451c-709d-4d3b-86c7-b630734e3a7b' /* '11/07/2019', 'Fix rte typing perf under undo-redo' */);
    KillSwitches.fixRenderCompleteInvokeTime = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["KillSwitch"]('18110eb8-1e6d-40a1-b167-33482218d5ef' /*, '11/7/2019', 'Fix render complete callback invoking on every update' */);
    KillSwitches.fixScrollPositionForLinkCommandInRTE = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["KillSwitch"]('53a527b8-5fe8-4930-9181-043d7ed8836a' /*, 11/06/2019, Fix scroll position for link command in RTE*/);
    KillSwitches.updateWebPartZoneInReadMode = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["KillSwitch"]('6a15a321-b972-4666-a31e-133109442ce8' /* 11/11/2019, Fix web part zone not re-render in-place nav */);
    KillSwitches.updateZoneHintAfterVSDeletion = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["KillSwitch"]('2d611da4-3ce5-4231-9a03-b244d7ba0680' /* 11/13/2019, update zone hint after vs deletion */);
    return KillSwitches;
}());



/***/ }),

/***/ "2+qN":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/sp-canvas/canvas/controlZone/LayoutControlZone.css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".ControlZone{position:relative}.CanvasZone:not(.CanvasZone--fullWidth) .ControlZone{padding:8px}.ControlZone .ControlZone-target{bottom:0;cursor:pointer;left:0;right:0;position:absolute;top:0}.ControlZone .ControlZone-target:focus{outline:0}.ControlZone .ControlZone-target.ControlZone-target--hidden{z-index:-1}.ControlZone:after{bottom:0;content:\"\";left:0;right:0;position:absolute;pointer-events:none;top:0;-webkit-transition:all .3s ease;transition:all .3s ease}.ControlZone.ControlZone--clean.ControlZone--overlay:after{pointer-events:auto;cursor:pointer}.ControlZone.ControlZone--overlay.ControlZone--move:after{cursor:move}.ControlZone .CanvasControlToolbar,.ControlZone:after{opacity:0;-webkit-transition:all .3s ease;transition:all .3s ease}.ControlZone.ControlZone--edit{outline:0;position:relative}.ControlZone.ControlZone--edit.ControlZone--selected .CanvasControlToolbar,.ControlZone.ControlZone--edit.ControlZone--selected:after,.ControlZone.ControlZone--edit:focus .CanvasControlToolbar,.ControlZone.ControlZone--edit:focus:after,.ControlZone.ControlZone--edit:hover .CanvasControlToolbar,.ControlZone.ControlZone--edit:hover:after{opacity:1}@media screen and (-ms-high-contrast:active){.ControlZone.ControlZone--selected:after{border:3px dotted #1aebff;-webkit-box-sizing:border-box;box-sizing:border-box}}@media screen and (-ms-high-contrast:black-on-white){.ControlZone.ControlZone--selected:after{border:3px dotted #37006e;-webkit-box-sizing:border-box;box-sizing:border-box}}.ControlZone.ControlZone--selected+button.CanvasToolboxHint{opacity:1}.ControlZone .ControlZone-drag{width:calc(100% + 16px);height:calc(100% + 16px);-webkit-transform:translate(-16px,-16px);transform:translate(-16px,-16px);position:absolute}.ControlZone .ControlZone--drag-show{pointer-events:auto}.ControlZone .ControlZone--drag-hide{pointer-events:none}.ControlZone .ControlZone--position{position:relative}.ControlZone .ControlZone--position .CanvasControlToolbar{top:-8px}[dir=ltr] .ControlZone .ControlZone--position .CanvasControlToolbar{left:-50px}[dir=rtl] .ControlZone .ControlZone--position .CanvasControlToolbar{right:-50px}.ControlZone .ControlZone-screenReaderOnly{position:absolute;text-indent:-9999px;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;border:0}", ""]);



/***/ }),

/***/ "2q6Q":
/*!***********************************!*\
  !*** external "@ms/sp-telemetry" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2q6Q__;

/***/ }),

/***/ "33d5":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/sp-canvas/canvas/canvasZone/CanvasZone.css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".CanvasZoneContainer{margin-top:1px}.CanvasZoneContainer.CanvasZoneContainer--hintUpdate{position:relative}.CanvasZoneContainer.CanvasZoneContainer--read{margin-top:0}.CanvasZoneContainer--nonselected:hover:before,.CanvasZoneContainer--selected:before{border:1px solid;-webkit-box-sizing:border-box;box-sizing:border-box;content:\"\";width:100%;position:absolute;bottom:-1px;top:-1px}.CanvasZoneContainer--selected .CanvasZoneToolbar-clean{display:block}.CanvasZoneContainer--selected:before{color:\"[theme:themePrimary, default: #0078d4]\"}.CanvasZoneContainer--nonselected .CanvasZoneToolbar-clean,.CanvasZoneContainer--selected .ControlZone:not(.ControlZone--selected):not(:focus) .CanvasControlToolbar{display:none}.CanvasZoneContainer--nonselected:hover:before{color:\"[theme:neutralTertiary, default: #a19f9d]\"}.CanvasZoneContainer--nonselected .ControlZone:not(.ControlZone--selected):not(:focus) .CanvasControlToolbar{display:none}.CanvasZone{max-width:1268px;padding:0 12px;margin:0}.CanvasZone.CanvasZone--expandTo1920{max-width:1712px}.CanvasZone.CanvasZone--read{margin-top:0}.CanvasZone:focus{outline:0}.CanvasZone.CanvasZone--centerAlign{margin:auto}.CanvasZone.CanvasZone--selected .CanvasSection--edit{min-height:160px}.CanvasZone.CanvasZone--selected .CanvasSection--edit:before{color:\"[theme:themePrimary, default: #0078d4]\";border-bottom:1px solid}[dir=ltr] .CanvasZone.CanvasZone--selected .CanvasSection--edit:before{border-left:1px solid}[dir=rtl] .CanvasZone.CanvasZone--selected .CanvasSection--edit:before{border-right:1px solid}.CanvasZone.CanvasZone--selected .CanvasZoneToolbar .CanvasControlToolbar-item{color:\"[theme:themePrimary, default: #0078d4]\"}@media screen and (-ms-high-contrast:active){.CanvasZone.CanvasZone--selected{border:3px dotted #1aebff;-webkit-box-sizing:border-box;box-sizing:border-box}}@media screen and (-ms-high-contrast:black-on-white){.CanvasZone.CanvasZone--selected{border:3px dotted #37006e;-webkit-box-sizing:border-box;box-sizing:border-box}}.CanvasZone.CanvasZone--controlSelected .CanvasSection--edit{min-height:160px}.CanvasZone.CanvasZone--controlSelected .CanvasSection--edit:before{color:\"[theme:neutralTertiary, default: #a19f9d]\";border-bottom:1px dashed}[dir=ltr] .CanvasZone.CanvasZone--controlSelected .CanvasSection--edit:before{border-left:1px dashed}[dir=rtl] .CanvasZone.CanvasZone--controlSelected .CanvasSection--edit:before{border-right:1px dashed}.CanvasZone.CanvasZone--controlSelected+button.CanvasToolboxHint{opacity:1}.CanvasZone.CanvasZone--fullWidth{max-width:100%;padding:0}.CanvasZone.CanvasZone--fullWidth .CanvasSection{padding-left:0;padding-right:0}.CanvasZone.CanvasZone--fullWidth.CanvasZone--fullWidth--read{margin-top:0}[dir=ltr] .CanvasZone.CanvasZone--fullWidth .CanvasToolboxHint-plusButtonWrapperOriginal{padding-left:32px}[dir=rtl] .CanvasZone.CanvasZone--fullWidth .CanvasToolboxHint-plusButtonWrapperOriginal{padding-right:32px}[dir=ltr] .CanvasZone.CanvasZone--fullWidth .CanvasToolboxHint-plusButtonWrapperOriginal{padding-right:16px}[dir=rtl] .CanvasZone.CanvasZone--fullWidth .CanvasToolboxHint-plusButtonWrapperOriginal{padding-left:16px}.CanvasZone.CanvasZone--fullWidth .centerAlign{margin:auto}.CanvasZone.CanvasZone--fullWidth .CanvasControlToolbar{border:1px solid \"[theme:neutrallight, default: #edebe9]\";top:8px}[dir=ltr] .CanvasZone.CanvasZone--fullWidth .CanvasControlToolbar{left:8px}[dir=rtl] .CanvasZone.CanvasZone--fullWidth .CanvasControlToolbar{right:8px}[dir=ltr] .CanvasZone.CanvasZone--fullWidth .CanvasControlToolbar{padding-right:2px}[dir=rtl] .CanvasZone.CanvasZone--fullWidth .CanvasControlToolbar{padding-left:2px}.CanvasZone .CanvasZoneToolbar,.CanvasZone .CanvasZoneToolbar-clean{margin-top:16px;position:absolute;width:32px}[dir=ltr] .CanvasZone .CanvasZoneToolbar-clean:not(.AlignedToolbar),[dir=ltr] .CanvasZone .CanvasZoneToolbar:not(.AlignedToolbar){left:-32px}[dir=rtl] .CanvasZone .CanvasZoneToolbar-clean:not(.AlignedToolbar),[dir=rtl] .CanvasZone .CanvasZoneToolbar:not(.AlignedToolbar){right:-32px}.CanvasZone .CanvasZoneToolbar-clean.FixedToolbar,.CanvasZone .CanvasZoneToolbar.FixedToolbar{margin-top:0;position:fixed;left:auto;right:auto}.CanvasZone .CanvasZoneToolbar-clean .CanvasControlToolbar-item,.CanvasZone .CanvasZoneToolbar .CanvasControlToolbar-item{background-color:transparent;color:\"[theme:bodyText, default: #323130]\";height:32px;min-width:32px;width:32px}.CanvasZone .CanvasZoneToolbar-clean .CanvasControlToolbar-item:focus,.CanvasZone .CanvasZoneToolbar-clean .CanvasControlToolbar-item:hover,.CanvasZone .CanvasZoneToolbar .CanvasControlToolbar-item:focus,.CanvasZone .CanvasZoneToolbar .CanvasControlToolbar-item:hover{background-color:\"[theme:themePrimary, default: #0078d4]\";color:\"[theme:white, default: #ffffff]\";cursor:pointer}.CanvasZone.CanvasZone--fullWidth--read .ControlZone{margin-top:0;margin-bottom:0}@media screen and (min-width:1024px){.CanvasZone--edit{display:-webkit-box;display:-ms-flexbox;display:flex}.CanvasZone--edit.CanvasZone--empty{height:320px}.CanvasZone--edit.CanvasZone--fullWidth{max-width:100%;padding:0;min-height:320px}.CanvasZone.CanvasZone--alignment{display:-webkit-box;display:-ms-flexbox;display:flex}.CanvasZone.CanvasZone--reflow{display:block}}@media screen and (min-width:641px){.CanvasZone{padding:0 16px}[dir=ltr] .CanvasZone{padding-right:8px}[dir=rtl] .CanvasZone{padding-left:8px}[dir=ltr] .CanvasZone.CanvasZone--edit{padding-left:40px}[dir=rtl] .CanvasZone.CanvasZone--edit{padding-right:40px}[dir=ltr] .CanvasZone.CanvasZone--edit{padding-right:16px}[dir=rtl] .CanvasZone.CanvasZone--edit{padding-left:16px}.CanvasZone.CanvasZone--edit.CanvasZone--fullWidth{max-width:100%;padding:0;min-height:320px}}@media print{.CanvasZone{display:-webkit-box;display:-ms-flexbox;display:flex}}.row{margin:0 -8px;-webkit-box-sizing:border-box;box-sizing:border-box}.row:after,.row:before{display:table;content:\"\";line-height:0}.row:after{clear:both}.CanvasZone--noMargin{margin:0}", ""]);



/***/ }),

/***/ "38oj":
/*!**************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasStore/DeferredCanvasStoreEditActions.js ***!
  \**************************************************************************************/
/*! exports provided: canvasStoreEditActionsLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasStoreEditActionsLoader", function() { return canvasStoreEditActionsLoader; });
function canvasStoreEditActionsLoader() {
    return __webpack_require__.e(/*! import() | sp-canvas-edit */ "sp-canvas-edit").then(__webpack_require__.bind(null, /*! ./CanvasStoreEditActions */ "DNmk"))
        .then(function (module) { return module.CanvasStoreEditActions; });
}


/***/ }),

/***/ "3Y08":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/sp-canvas/canvas/canvas/LayoutCanvas.css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".Canvas,.CanvasComponent{position:relative}.Canvas{padding:0}.Canvas>.CanvasToolboxHint .CanvasToolboxHint-plusButtonWrapperOriginal{padding:0 12px}.Canvas>.CanvasToolboxHint .CanvasToolboxHint-plusButtonWrapperOriginal.centerAlign{margin:auto}[dir=ltr] .Canvas--edit.Canvas--withLayout{margin-left:32px}[dir=rtl] .Canvas--edit.Canvas--withLayout{margin-right:32px}[dir=ltr] .Canvas--edit>.CanvasToolboxHint .CanvasToolboxHint-plusButtonWrapperOriginal{padding-left:32px}[dir=rtl] .Canvas--edit>.CanvasToolboxHint .CanvasToolboxHint-plusButtonWrapperOriginal{padding-right:32px}[dir=ltr] .Canvas--edit>.CanvasToolboxHint .CanvasToolboxHint-plusButtonWrapperOriginal{padding-right:16px}[dir=rtl] .Canvas--edit>.CanvasToolboxHint .CanvasToolboxHint-plusButtonWrapperOriginal{padding-left:16px}.Canvas-screenReaderOnly{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}", ""]);



/***/ }),

/***/ "4Mut":
/*!***********************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasLayout/undefinedControlPosition.js ***!
  \***********************************************************************/
/*! exports provided: undefinedControlPosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "undefinedControlPosition", function() { return undefinedControlPosition; });
var undefinedControlPosition = {
    zoneIndex: undefined,
    sectionIndex: undefined,
    controlIndex: undefined,
    layoutIndex: undefined
};


/***/ }),

/***/ "4Tcc":
/*!***************************************************!*\
  !*** ./lib/sp-canvas/canvas/webPartZone/index.js ***!
  \***************************************************/
/*! exports provided: WebPartZone, WebPartReservedHeight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WebPartReservedHeight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebPartReservedHeight */ "vP/3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebPartReservedHeight", function() { return _WebPartReservedHeight__WEBPACK_IMPORTED_MODULE_0__["WebPartReservedHeight"]; });

/* harmony import */ var _WebPartZone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WebPartZone */ "EZnn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebPartZone", function() { return _WebPartZone__WEBPACK_IMPORTED_MODULE_1__["WebPartZone"]; });





/***/ }),

/***/ "4hkP":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/sp-canvas/canvas/CanvasVerticalSection/CanvasVerticalSection.css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".CanvasVerticalSection{height:100%}[dir=ltr] .CanvasVerticalSection.isEdit{padding-left:32px}[dir=rtl] .CanvasVerticalSection.isEdit{padding-right:32px}.CanvasVerticalSection .CanvasZoneContainer{height:100%}.CanvasVerticalSection .CanvasZoneContainer.CanvasZoneContainer--hintUpdate{position:relative;margin-top:1px}.CanvasVerticalSection .CanvasZone{position:relative;height:100%}[dir=ltr] .CanvasVerticalSection .CanvasZone{padding-left:8px}[dir=rtl] .CanvasVerticalSection .CanvasZone{padding-right:8px}.CanvasVerticalSection .CanvasZone .CanvasSection--edit{padding-top:32px}.CanvasVerticalSection .CanvasZone .CanvasZoneToolbar,.CanvasVerticalSection .CanvasZone .CanvasZoneToolbar-clean{margin-top:0;margin-left:1px;width:auto;background-color:\"[theme:neutralLighter, default: #f3f2f1]\"}[dir=ltr] .CanvasVerticalSection .CanvasZone .CanvasZoneToolbar,[dir=ltr] .CanvasVerticalSection .CanvasZone .CanvasZoneToolbar-clean{left:0}[dir=rtl] .CanvasVerticalSection .CanvasZone .CanvasZoneToolbar,[dir=rtl] .CanvasVerticalSection .CanvasZone .CanvasZoneToolbar-clean{right:0}.CanvasVerticalSection>div{height:100%}@media screen and (min-width:1280px){[dir=ltr] .CanvasVerticalSection.isEdit{padding-left:0}[dir=rtl] .CanvasVerticalSection.isEdit{padding-right:0}[dir=ltr] .CanvasVerticalSection.CanvasZone--edit,[dir=ltr] .CanvasVerticalSection .CanvasZone.CanvasZone--edit{padding-right:8px}[dir=rtl] .CanvasVerticalSection.CanvasZone--edit,[dir=rtl] .CanvasVerticalSection .CanvasZone.CanvasZone--edit{padding-left:8px}}", ""]);



/***/ }),

/***/ "5Nkd":
/*!*************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasSection/CanvasSection.js ***!
  \*************************************************************/
/*! exports provided: CanvasSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasSection", function() { return CanvasSection; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _editChunk__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../editChunk */ "9s5w");
/* harmony import */ var _canvasLayout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../canvasLayout */ "yPt8");
/* harmony import */ var _controlZone__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../controlZone */ "QfGm");
/* harmony import */ var _canvasControl_CanvasControlFactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../canvasControl/CanvasControlFactory */ "aYeN");
/* harmony import */ var _canvasControl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../canvasControl */ "iO6m");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../common/Flights */ "qRiB");
/* harmony import */ var _CanvasSection_resx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./CanvasSection.resx */ "IGr+");
/* harmony import */ var _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../loc/CanvasStrings.resx */ "K08d");
/* harmony import */ var _CanvasSection_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./CanvasSection.scss */ "v3Ow");
/**
 * @file CanvasSectionComponent.tsx
 * @copyright (c) Microsoft Corporation. All rights reserved.
 */
















var SPACER_ID = '8654b779-4886-46d4-8ffb-b5ed960ee986';
var DIVIDER_ID = '2161a1c6-db61-4731-b97c-3cdb303f7cbb';
var HIDE_EDIT_BUTTON_WEBPART = new Set([]);
var HIDE_MOVE_BUTTON_WEBPART = new Set([SPACER_ID, DIVIDER_ID]);
/**
 * Represents a Section layout component
 */
var CanvasSection = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CanvasSection, _super);
    function CanvasSection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._controlComponents = [];
        return _this;
    }
    CanvasSection._createEmptyControlLayout = function (zoneIndex, sectionIndex, controlIndex, layoutIndex, sectionFactor) {
        return {
            zoneIndex: zoneIndex,
            sectionIndex: sectionIndex,
            controlIndex: controlIndex,
            layoutIndex: layoutIndex,
            sectionFactor: sectionFactor
        };
    };
    CanvasSection.prototype.render = function () {
        var _this = this;
        var store = this.props.store;
        var displayMode = store.displayMode;
        var _a = this.props, emphasisTheme = _a.emphasisTheme, section = _a.section, selectedPosition = _a.selectedPosition, theme = _a.theme, zoneIndex = _a.zoneIndex;
        var isSectionSelected = selectedPosition.zoneIndex === zoneIndex && selectedPosition.sectionIndex === section.index;
        isSectionSelected = isSectionSelected && selectedPosition.layoutIndex === this.props.layoutIndex;
        // Iterate through the controls and create control zone components
        var controls = section.controls;
        var numControls = controls.length;
        this._controlComponents = [];
        var isCleanSelectionEnabled = store.canvasFields.isCleanSelectionEnabled;
        controls.forEach(function (curCtrl, curIdx) {
            var control = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, curCtrl, { emphasisTheme: emphasisTheme,
                theme: theme });
            var isControlSelected = isSectionSelected && selectedPosition.controlIndex === control.position.controlIndex;
            var hideEditButton;
            var hideMoveButton;
            if (control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone) {
                var webPartId = control.webPartId;
                hideEditButton = HIDE_EDIT_BUTTON_WEBPART.has(webPartId);
                hideMoveButton = !isCleanSelectionEnabled && HIDE_MOVE_BUTTON_WEBPART.has(webPartId);
            }
            else {
                hideEditButton = true;
                hideMoveButton = false;
            }
            _this._controlComponents.push(react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_controlZone__WEBPACK_IMPORTED_MODULE_9__["ControlZone"], { displayMode: displayMode, emphasisTheme: emphasisTheme, isSelected: isControlSelected, controlDiff: _this._getControlDiff(control), key: control.id, theme: theme, control: _common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled() ? control : Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["cloneDeep"])(control), store: store },
                _canvasControl_CanvasControlFactory__WEBPACK_IMPORTED_MODULE_10__["CanvasControlFactory"].CreateCanvasControl(control, store),
                displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Edit && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editChunk__WEBPACK_IMPORTED_MODULE_7__["DeferredToolbar"], { directionalHint: !Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["getRTL"])() ? _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["DirectionalHint"].rightCenter : _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["DirectionalHint"].leftCenter, configurationButton: hideEditButton ? undefined : {
                        onClick: function () { return store.handleConfigureButtonClicked(control.id); },
                        title: _CanvasSection_resx__WEBPACK_IMPORTED_MODULE_13__["default"].WebpartToolbarConfigButtonTitle,
                        fabricIconKey: ''
                    }, moveButton: hideMoveButton ? undefined : {
                        title: _CanvasSection_resx__WEBPACK_IMPORTED_MODULE_13__["default"].WebpartToolbarMoveButtonTitle,
                        dragHandleTag: _editChunk__WEBPACK_IMPORTED_MODULE_7__["CanvasDragZoneConstants"].webPartButtonDragHandleTag
                    }, duplicateButton: !isCleanSelectionEnabled ? undefined : {
                        onClick: function () { return store.handleDuplicateControlButtonClicked(control.id); },
                        title: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].ToolbarDuplicateWebPartTitle
                    }, deleteButton: {
                        onClick: function () { return store.handleDeleteControlButtonClicked(control.position); },
                        title: _CanvasSection_resx__WEBPACK_IMPORTED_MODULE_13__["default"].WebpartToolbarDeleteButtonTitle
                    } })),
                "/>"));
            var nextControlIndex = curIdx + 1 === numControls
                ? // This is the last control, create a new control by incrementing the index
                    control.position.controlIndex + 1 // Todo#661360 Fix workaround left-over
                : // Get the next section index
                    controls[curIdx + 1].position.controlIndex;
            var nextCtrlPosition = CanvasSection._createEmptyControlLayout(control.position.zoneIndex, control.position.sectionIndex, nextControlIndex, control.position.layoutIndex, control.position.sectionFactor);
            _this._addToolBoxHint(nextCtrlPosition);
        });
        this._firstControlIdx = controls.length > 0 ? controls[0].position.controlIndex : _canvasLayout__WEBPACK_IMPORTED_MODULE_8__["CanvasLayout"].firstLayoutIndex;
        var firstControlLayout = {
            zoneIndex: zoneIndex,
            sectionIndex: section.index,
            controlIndex: this._firstControlIdx,
            sectionFactor: section.factor,
            // This will set the layout index on the first toolbox hint which passes it to toolboxProps
            layoutIndex: this.props.layoutIndex
        };
        var isReadMode = displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Read;
        var layoutSectionClassName = this._getLayoutSectionClassName(isReadMode, isSectionSelected);
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: layoutSectionClassName, ref: function (ref) { return (_this._domElement = ref); }, "data-automation-id": 'CanvasSection', "data-drag-tag": _editChunk__WEBPACK_IMPORTED_MODULE_7__["CanvasDragZoneConstants"].sectionDragTag, "data-drag-disallowed-area-tag": this._dragDisallowedAreaTag, "data-negative-space": true },
            this._getContentSelectionMechanism(firstControlLayout),
            this._controlComponents));
    };
    CanvasSection.prototype._addToolBoxHint = function (nextCtrlPosition) {
        this._controlComponents.push(react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editChunk__WEBPACK_IMPORTED_MODULE_7__["DeferredCanvasToolboxHint"], { ariaLabel: this._getToolboxHintAccessibleTitle(), layout: nextCtrlPosition, key: "hint." + nextCtrlPosition.controlIndex, type: 2 /* Section */, theme: this.props.emphasisTheme, store: this.props.store }));
    };
    CanvasSection.prototype._getLayoutSectionClassName = function (isReadMode, isSectionSelected) {
        var layoutSectionClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])('CanvasSection', 'CanvasSection-col', 'CanvasSection-sm12', "CanvasSection-xl" + (this.props.section.factor || 12), {
            'CanvasSection--edit': !isReadMode,
            'CanvasSection--read': isReadMode,
            'CanvasSection--selected': isSectionSelected,
            'CanvasSection--reflow': !!this.props.shouldResize
        });
        return layoutSectionClassName;
    };
    CanvasSection.prototype._shouldCenterAlignHint = function () {
        return false;
    };
    CanvasSection.prototype._getContentSelectionMechanism = function (firstControlLayout) {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editChunk__WEBPACK_IMPORTED_MODULE_7__["DeferredCanvasToolboxHint"], { ariaLabel: this._getToolboxHintAccessibleTitle(), layout: firstControlLayout, type: 2 /* Section */, theme: this.props.emphasisTheme, store: this.props.store }));
    };
    Object.defineProperty(CanvasSection.prototype, "_dragDisallowedAreaTag", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    CanvasSection.prototype._getToolboxHintAccessibleTitle = function () {
        var section = this.props.section;
        var columnNo = '';
        try {
            switch (section.index) {
                case 1:
                    columnNo = _CanvasSection_resx__WEBPACK_IMPORTED_MODULE_13__["default"].ToolboxHintColumnOne;
                    break;
                case 2:
                    columnNo = _CanvasSection_resx__WEBPACK_IMPORTED_MODULE_13__["default"].ToolboxHintColumnTwo;
                    break;
                case 3:
                    columnNo = _CanvasSection_resx__WEBPACK_IMPORTED_MODULE_13__["default"].ToolboxHintColumnThree;
                    break;
                default:
                    throw 'Unexpected Error';
            }
        }
        catch (err) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logError(CanvasSection._logSource, err, "Canvas section has undefined index");
        }
        return _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__["StringHelper"].format(_CanvasSection_resx__WEBPACK_IMPORTED_MODULE_13__["default"].ToolboxHintTitleWithLayout, columnNo);
    };
    CanvasSection.prototype._getControlDiff = function (control) {
        var canvasFields = this.props.store.canvasFields;
        return _common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageVersionEnabled() && canvasFields.controlDiffMap
            ? canvasFields.controlDiffMap.get(control.id)
            : undefined;
    };
    CanvasSection._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_LogSource"].create('CanvasSection');
    return CanvasSection;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));



/***/ }),

/***/ "5WXc":
/*!***********************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasAnimations/CanvasRevealObserver.js ***!
  \***********************************************************************/
/*! exports provided: CanvasRevealObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasRevealObserver", function() { return CanvasRevealObserver; });
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-webpart-base */ "br4S");
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);


/**
 * The CanvasRevealObserver observes any registered target elements and will invoke a callback when any part
 * of the target element "reveals" itself in the scrollable region of the Canvas.
 */
var CanvasRevealObserver = /** @class */ (function () {
    function CanvasRevealObserver() {
        var _this = this;
        this._observerCallback = function (entries) {
            entries.forEach(function (entry) {
                // A positive intersectionRatio indicates some portion of the target is overlapping the observer's root
                if (entry.intersectionRatio) {
                    var callback = _this._callbackMap.get(entry.target);
                    if (callback) {
                        callback(entry, _this);
                    }
                }
            });
        };
        this._observer = new IntersectionObserver(this._observerCallback, { threshold: [0, 0.01] });
        this._callbackMap = new Map();
    }
    CanvasRevealObserver.isAvailable = function () {
        if (CanvasRevealObserver._isAvailable === undefined) {
            CanvasRevealObserver._isAvailable = Boolean(  true &&
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["EnvironmentType"].ClassicSharePoint !== _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Environment"].type &&
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["EnvironmentType"].Local !== _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Environment"].type &&
                !_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_0__["ClientSideWebPartManager"].isMaintenanceMode &&
                window['IntersectionObserver'] // tslint:disable-line:no-string-literal
            );
        }
        return CanvasRevealObserver._isAvailable;
    };
    CanvasRevealObserver.prototype.observe = function (target, callback) {
        this._observer.observe(target);
        this._callbackMap.set(target, callback);
    };
    CanvasRevealObserver.prototype.unobserve = function (target) {
        this._observer.unobserve(target);
        this._callbackMap.delete(target);
    };
    return CanvasRevealObserver;
}());



/***/ }),

/***/ "5z2F":
/*!********************************************!*\
  !*** external "@ms/sp-load-themed-styles" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5z2F__;

/***/ }),

/***/ "7Awa":
/*!***********************************************!*\
  !*** external "@microsoft/sp-component-base" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7Awa__;

/***/ }),

/***/ "7JSu":
/*!*******************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasToolbox/DeferredCanvasToolbox.js ***!
  \*******************************************************************************/
/*! exports provided: DeferredCanvasToolbox, DeferredToolboxComponent, DeferredToolboxFullBleedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredCanvasToolbox", function() { return DeferredCanvasToolbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredToolboxComponent", function() { return DeferredToolboxComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredToolboxFullBleedComponent", function() { return DeferredToolboxFullBleedComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_sp_deferred_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/sp-deferred-component */ "qjmy");
/* harmony import */ var _ms_sp_deferred_component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_deferred_component__WEBPACK_IMPORTED_MODULE_3__);




var CANVAS_TOOLBOX_COMPONENT_ID = '5388ac31-7915-4ba6-a021-0f8808dd5784';
var DeferredCanvasToolbox = /** @class */ (function () {
    function DeferredCanvasToolbox() {
    }
    DeferredCanvasToolbox.loadModule = function () {
        if (!DeferredCanvasToolbox._loadedModule) {
            DeferredCanvasToolbox._loadedModule =  false
                ? undefined
                : _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_2__["SPComponentLoader"].loadComponentById(CANVAS_TOOLBOX_COMPONENT_ID);
        }
        return DeferredCanvasToolbox._loadedModule;
    };
    return DeferredCanvasToolbox;
}());

var DeferredToolboxComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DeferredToolboxComponent, _super);
    function DeferredToolboxComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeferredToolboxComponent.prototype._internalLoad = function () {
        return DeferredCanvasToolbox.loadModule().then(function (chunk) {
            return chunk.Toolbox;
        });
    };
    return DeferredToolboxComponent;
}(_ms_sp_deferred_component__WEBPACK_IMPORTED_MODULE_3__["_DeferredComponent"]));

// tslint:disable-next-line:variable-name
var DeferredToolboxFullBleed = react__WEBPACK_IMPORTED_MODULE_1__["lazy"](function () { return DeferredCanvasToolbox.loadModule()
    .then(function (module) { return ({ default: module.ToolboxFullBleed }); }); });
var DeferredToolboxFullBleedComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DeferredToolboxFullBleedComponent, _super);
    function DeferredToolboxFullBleedComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeferredToolboxFullBleedComponent.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Suspense"], { fallback: false },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](DeferredToolboxFullBleed, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props))));
    };
    return DeferredToolboxFullBleedComponent;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "7Sy0":
/*!***********************************************!*\
  !*** ./lib/sp-canvas/canvas/canvas/Canvas.js ***!
  \***********************************************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return Canvas; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/sp-a11y */ "ytfe");
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _canvasComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../canvasComponent */ "j0qU");
/* harmony import */ var _canvasStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../canvasStore */ "yRr9");
/* harmony import */ var _canvasControl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../canvasControl */ "iO6m");
/* harmony import */ var _editChunk__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../editChunk */ "9s5w");
/* harmony import */ var _LayoutCanvas_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./LayoutCanvas.scss */ "Tpr7");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../common/Flights */ "qRiB");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../common/KillSwitches */ "17t3");
/**
 * @copyright (c) Microsoft Corporation. All rights reserved.
 * Root class of canvas which initializes store and renders root react component "CanvasComponent"
 */












/**
 * SharePoint Client-side Applications can use the SharePoint Canvas to enable rich content authoring
 * as part of their experience. The SharePoint canvas provides Rich Text Editing capabilities, SharePoint
 * Client-side WebPart aggregation and hosting, and a beautiful railed design experience.
 *
 * @internal
 */
var Canvas = /** @class */ (function () {
    /**
     * Private constructor. Call instantiateCanvas() to create a new canvas control
     *
     * @param container - The host DOM container for the Canvas. When render() is invoked the Canvas will
     *   render into 'container'.
     * @param canvasOptions - The optional parameters of the Canvas.
     */
    function Canvas(container, canvasOptions) {
        var _this = this;
        /**
         * Serialize the current contents of the Canvas. The serialized string is in a HTML/JSON format understood by
         * SharePoint's Rich Text Field. The returned string can be crawled by search. Modifying the returned
         * string outside of the Canvas is not supported.
         *
         * @deprecated - It should be removed then PageUndoRedo flight is graduated.
         * @returns Serialized JSON string of the Canvas at the time the method is invoked.
         */
        this.serializeAsJson = function () {
            return _this._store.serializeAsJson();
        };
        /**
         * Serialize the current contents of the Canvas as Object.
         *
         * @param reserializeAll - Indicate whether canvas should go through all of the controls to serialize.
         * If it is true, it increases runtime cost but can always get latest data of canvas when there is still some
         *  operations that have not been populated.
         * If it is false, it will return the data that has been auto-populated and serialized recently.
         *
         * @returns Serialized object of the Canvas at the time the method is invoked.
         */
        this.serializeAsObject = function (reserializeAll) {
            if (reserializeAll === void 0) { reserializeAll = false; }
            return _this._store.serializeAsObject(reserializeAll);
        };
        this._render = function (callback, isUpdatingFromUpperLevel, hasTriedReload) {
            if (callback === void 0) { callback = undefined; }
            if (isUpdatingFromUpperLevel === void 0) { isUpdatingFromUpperLevel = false; }
            if (hasTriedReload === void 0) { hasTriedReload = false; }
            var coreElementProps = {
                store: _this._store,
                hasTriedReload: _common_Flights__WEBPACK_IMPORTED_MODULE_10__["Flights"].isPageUndoRedoFlightEnabled() && !_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["KillSwitches"].tryReloadCanvasComponentWhenFailure.isActivated()
                    ? hasTriedReload
                    : false
            };
            _this._store.canvasFields.isUpdatingFromUpperLevel = isUpdatingFromUpperLevel;
            var coreElement = react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_canvasComponent__WEBPACK_IMPORTED_MODULE_5__["CanvasComponent"], coreElementProps);
            react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](coreElement, _this._container, function () {
                window.dispatchEvent(_this._canvasRenderedEvent);
                _this._store.canvasFields.isUpdatingFromUpperLevel = false;
                if (callback) {
                    callback();
                }
            });
            if (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_11__["KillSwitches"].fixRenderCompleteInvokeTime.isActivated()) {
                // There are no web parts on the page, let Canvas Perf finish
                if (!_this._store.webPartsCount && _this._canvasPerformanceLogger) {
                    _this._store.onViewportWebPartsRendered(_this._canvasPerformanceLogger.now());
                    if (_common_Flights__WEBPACK_IMPORTED_MODULE_10__["Flights"].isAnchorFlightEnabled()) {
                        _this._store.onAllWebPartsRendered(_this._canvasPerformanceLogger.now());
                    }
                }
            }
        };
        /**
         * In most cases, CanvasComponent is directly rendered into the same DOM. This is the fallback when the
         * simple React render fails.
         */
        this._disposeAndRender = function () {
            // Unmount any existing Canvas instances
            _this._internalDispose();
            // React unmount works async, this is to make sure next render happens after the component being actually unmounted.
            setTimeout(function () {
                _this._render(undefined /* callback */, false /* isUpdatingFromUpperLevel */, true /* hasTriedReload */);
            });
        };
        this._container = container;
        this._canvasPerformanceLogger = canvasOptions.canvasPerformanceLogger;
        // Needed to do this try-catch, because IE doesn't have the Event constructor implemented,
        // so we fall back to legacy method in case trying to use the constructor errors out.
        try {
            this._canvasRenderedEvent = new Event('canvasRendered');
        }
        catch (_a) {
            this._canvasRenderedEvent = document.createEvent('Event');
            this._canvasRenderedEvent.initEvent('canvasRendered', false, false);
        }
        // Find parent A11yManager or create one
        var a11yManager;
        if (canvasOptions.a11yManagerId) {
            a11yManager = _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["A11yManager"].getInstanceById(canvasOptions.a11yManagerId);
        }
        if (!a11yManager) {
            a11yManager = _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["A11yManager"].create(container);
        }
        this._store = new _canvasStore__WEBPACK_IMPORTED_MODULE_6__["CanvasStore"]({
            serviceScope: canvasOptions.serviceScope,
            render: this._render,
            disposeAndRender: this._disposeAndRender,
            a11yManager: a11yManager,
            mode: canvasOptions.mode,
            canvasPerformanceLogger: this._canvasPerformanceLogger,
            serializedCanvas: canvasOptions.serializedCanvasContent,
            handleCanvasChanged: function (canvasState) {
                var handleCanvasChanged = canvasOptions.handleCanvasChanged;
                if (handleCanvasChanged) {
                    var content = _common_Flights__WEBPACK_IMPORTED_MODULE_10__["Flights"].isPageUndoRedoFlightEnabled() ? _this.serializeAsObject() : undefined;
                    handleCanvasChanged(content, canvasState);
                }
            },
            scrollThreshold: canvasOptions.scrollThreshold,
            onViewportRendered: canvasOptions.handleViewportRendered,
            shouldCenterAlign: canvasOptions.shouldCenterAlign,
            mobileBrowser: canvasOptions.mobileBrowser,
            isRootScrollableElement: canvasOptions.isRootScrollableElement,
            pageLayoutType: canvasOptions.pageLayoutType,
            variantsModuleLoader: canvasOptions.variantsModuleLoader,
            isViewportLoadingDisabled: undefined,
            doesUserHaveEditPermission: canvasOptions.doesUserHaveEditPermission,
            onRenderComplete: canvasOptions.handleRendered,
            isCleanSelectionEnabled: canvasOptions.isCleanSelectionEnabled && canvasOptions.isCleanSelectionEnabled()
                || false
        });
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_10__["Flights"].isPageVersionEnabled()) {
            this._pageContext = canvasOptions.serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__["PageContext"].serviceKey);
        }
    }
    /**
     * Construct a new instance of the Canvas.
     *
     * @param container - The host DOM container for the Canvas. When render() is invoked the Canvas will
     *   render into 'container'.
     * @param canvasOptions - The optional parameters of the Canvas.
     */
    Canvas.instantiateCanvas = function (container, canvasOptions) {
        var canvas = new Canvas(container, canvasOptions);
        if (canvasOptions.canvasPerformanceLogger) {
            canvasOptions.canvasPerformanceLogger.setPerformanceProperty('canvasInitiated');
        }
        if (canvasOptions.mode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Read) {
            return Promise.resolve(canvas);
        }
        else {
            return canvas._store.initializeForEditMode().then(function () { return canvas; });
        }
    };
    /**
      * Render the Canvas into its container DOM element. The Canvas will use the DisplayMode it was
      * constructed with.
      * If the Canvas has already been rendered once, the Canvas will clear its contents and then, if present,
      * use 'serializedCanvas' to rehydrate itself.
      *
      * @deprecated - It should be removed then PageUndoRedo flight is graduated.
      * @param serializedCanvas - Optional. The string must have been created by a previous instance of
      *   the Canvas. If absent, an empty Canvas will be rendered. If present, the Canvas will rehydrate
      *   to represent the state of the Canvas when serialized.
      */
    Canvas.prototype.renderDeprecated = function (displayMode, serializedCanvas) {
        var _this = this;
        if (this._canvasPerformanceLogger) {
            this._canvasPerformanceLogger.setPerformanceProperty('canvasRender');
        }
        var loadEditChunk;
        // Unmount any existing Canvas instances
        this._internalDispose();
        /**
         * @see CanvasStore.handleWindowBlur
         */
        if (displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit) {
            loadEditChunk = this._store.initializeForEditMode().then(function () {
                window.addEventListener('blur', _this._store.handleWindowBlur, true);
            });
        }
        this._store.deserialize(displayMode, serializedCanvas);
        if (loadEditChunk) {
            return loadEditChunk.then(function () { return _this._render(); });
        }
        else {
            this._render();
            return Promise.resolve();
        }
    };
    /**
     * Render the Canvas into its container DOM element. The Canvas will use the DisplayMode it was
     * constructed with.
     * If the Canvas has already been rendered once, the Canvas will clear its contents and then, if present,
     * use 'canvasContent' to rehydrate itself.
     *
     * @param canvasContent - Optional. The object must have been created by a previous instance of
     *   the Canvas. If absent, an empty Canvas will be rendered. If present, the Canvas will rehydrate
     *   to represent the state of the Canvas when serialized.
     * @param canvasState - Optional. The object must have been created by the current instance of the Canvas.
     *  If present, the canvas will leverage to update the state of the controls.
     */
    Canvas.prototype.render = function (displayMode, canvasContent, canvasState) {
        var _this = this;
        if (this._canvasPerformanceLogger) {
            this._canvasPerformanceLogger.setPerformanceProperty('canvasRender');
        }
        var loadEditChunk;
        if (!_common_Flights__WEBPACK_IMPORTED_MODULE_10__["Flights"].isPageUndoRedoFlightEnabled()) {
            // Unmount any existing Canvas instances
            this._internalDispose();
        }
        /**
         * @see CanvasStore.handleWindowBlur
         */
        if (displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit) {
            loadEditChunk = this._store.initializeForEditMode().then(function () {
                window.addEventListener('blur', _this._store.handleWindowBlur, true);
            });
        }
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_10__["Flights"].isPageVersionEnabled()) {
            // Clear diff type when canvas switch back to normal rendering.
            this._store.canvasFields.controlDiffMap = undefined;
            this._store.canvasFields.zoneDiffMap = undefined;
        }
        this._store.processCanvasContent(displayMode, canvasContent || []);
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_10__["Flights"].isPageUndoRedoFlightEnabled() && canvasState) {
            this._store.canvasFields.canvasState = canvasState;
            this._store.canvasFields.selectedControlIdInternal = canvasState.selectedControlId;
        }
        if (loadEditChunk) {
            return loadEditChunk.then(function () { return _this._render(undefined /* callback */, true /* isUpdatingFromUpperLevel */); });
        }
        else {
            this._render(undefined /* callback */, true /* isUpdatingFromUpperLevel */);
            return Promise.resolve();
        }
    };
    /**
     * Render a diff view given two versions of canvas content.
     *
     * @param canvasContentComparedFrom - The old version of the canvas content
     * @param canvasContentComparedTo - The new version of the canvas content
     * @param shouldRenderDiffIndicator - If it's true, it will render canvas showing the UI diff of two versions.
     *  If it's false, it will simply canvasContentComparedTo.
     * @returns - A promise of diff info which can be used to describe the detailed changes for the controls.
     */
    Canvas.prototype.renderDiff = function (canvasContentComparedFrom, canvasContentComparedTo, shouldRenderDiffIndicator) {
        var _this = this;
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_10__["Flights"].isPageVersionEnabled()) {
            canvasContentComparedFrom = canvasContentComparedFrom.filter(function (control) {
                return control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_7__["CanvasControlType"].WebPartZone || control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_7__["CanvasControlType"].RTE;
            });
            canvasContentComparedTo = canvasContentComparedTo.filter(function (control) {
                return control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_7__["CanvasControlType"].WebPartZone || control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_7__["CanvasControlType"].RTE;
            });
            // force flag in fetchWebparts will overwrite the check for edit mode. But will not fetch again if
            // manifests have been fetched.
            return Promise.all([Object(_editChunk__WEBPACK_IMPORTED_MODULE_8__["canvasDiffLoader"])(), this.fetchWebparts(true /* force */)])
                .then(function (_a) {
                var diffModules = _a[0];
                var controlDiffInfo = diffModules.getControlDiffInfo(canvasContentComparedFrom, canvasContentComparedTo, _canvasStore__WEBPACK_IMPORTED_MODULE_6__["CanvasStoreCommonActions"].getManifestMap(_this._store.canvasFields), _this._pageContext.cultureInfo.currentUICultureName.toLowerCase());
                var zoneDiffInfo = diffModules.getZoneDiffInfo(canvasContentComparedFrom, canvasContentComparedTo);
                if (shouldRenderDiffIndicator) {
                    var canvasContentToRender = diffModules.getCanvasContentToRender(canvasContentComparedFrom, canvasContentComparedTo, controlDiffInfo);
                    _this._store.canvasFields.controlDiffMap = diffModules.convertControlDiffToMap(controlDiffInfo);
                    _this._store.canvasFields.zoneDiffMap = diffModules.convertZoneDiffToMap(zoneDiffInfo);
                    _this._store.processCanvasContent(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Read, canvasContentToRender);
                    _this._render();
                }
                else {
                    // Trigger render without chaining the promises because the returned value of `renderDiff` only cares
                    // about the diff info.
                    void _this.render(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Read, canvasContentComparedTo);
                }
                return diffModules.sortDiffs(zoneDiffInfo.concat(controlDiffInfo));
            });
        }
        else {
            return Promise.reject(new Error('Feature not supported'));
        }
    };
    /**
     * Scroll to the canvas control given the instance id.
     * @param instanceId - The instance id of the canvas control to be scrolled to.
     * @returns - Whether the scroll is succeed
     *  true if the control exists and can be scrolled or false if the control doesn't exists or cannot be scrolled.
     */
    Canvas.prototype.scrollControlIntoView = function (instanceId, options) {
        var canvasFields = this._store.canvasFields;
        var targetControl = canvasFields.controlComponentMap
            ? this._store.canvasFields.controlComponentMap.get(instanceId)
            : undefined;
        if (!targetControl) {
            return false;
        }
        return targetControl.scrollIntoView(options);
    };
    Object.defineProperty(Canvas.prototype, "count", {
        /**
         * @returns The number of controls in the Canvas.
         */
        get: function () {
            return this._store.controlsProps.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "previewImageUrl", {
        /**
         * Get the preview image url generated from webpart manager if it is available.
         * The preview image is the first preview image provided by a webpart
         *
         * @returns the URL of the preview image
         */
        get: function () {
            return this._store.tryGeneratePreviewImageUrl();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "displayMode", {
        /**
         * Get the Canvas  DisplayMode.
         *
         * @returns The DisplayMode of the Canvas
         */
        get: function () {
            return this._store.displayMode;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Re-render the Canvas in a new DisplayMode.
     *
     * @param newMode - The desired DisplayMode of the Canvas
     */
    Canvas.prototype.setDisplayMode = function (newMode) {
        var _this = this;
        var qos = this._store.createQosScope('setDisplayMode');
        this._store.canvasFields.isUpdatingFromUpperLevel = true;
        return this._store.setDisplayMode(newMode)
            .then(function () {
            _this._store.canvasFields.isUpdatingFromUpperLevel = false;
            qos.writeSuccess();
        })
            .catch(function (error) {
            _this._store.canvasFields.isUpdatingFromUpperLevel = false;
            qos.writeUnexpectedFailure(undefined, error);
            return Promise.reject(error);
        });
    };
    /**
     * Unmount the Canvas from the container it was constructed with.
     */
    Canvas.prototype.dispose = function () {
        this._internalDispose();
        this._store.dispose();
    };
    /**
     * If the Canvas is in DisplayMode.Edit, asynchronously fetch web part manifests in the background. If the Canvas is
     *  not in DisplayMode.Edit, fetch can be forced.
     */
    Canvas.prototype.fetchWebparts = function (force) {
        return this._store.fetchWebParts(force);
    };
    /**
     * Transient method that hooks into `refetchWebPartsOnNextEdit` on
     * the canvas store.
     */
    Canvas.prototype.refetchWebPartsOnNextEdit = function () {
        this._store.refetchWebPartsOnNextEdit();
    };
    Canvas.prototype._internalDispose = function () {
        window.removeEventListener('blur', this._store.handleWindowBlur, true);
        react_dom__WEBPACK_IMPORTED_MODULE_1__["unmountComponentAtNode"](this._container);
    };
    return Canvas;
}());



/***/ }),

/***/ "7u9b":
/*!************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasZone/CanvasZone.resx.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_kfkx9h4IuXbYoZ4SdLEjrQ';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "85cM":
/*!*************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/narrowModeDialog/DeferredNarrowModeDialog.js ***!
  \*************************************************************************************/
/*! exports provided: DeferredNarrowModeDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredNarrowModeDialog", function() { return DeferredNarrowModeDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


// tslint:disable-next-line:variable-name
var DeferredComponent = react__WEBPACK_IMPORTED_MODULE_1__["lazy"](function () { return Promise.all(/*! import() | sp-canvas-narrow-dialog */[__webpack_require__.e("vendors~sp-canvas-narrow-dialog"), __webpack_require__.e("sp-canvas-narrow-dialog")]).then(__webpack_require__.bind(null, /*! ./NarrowModeDialog */ "HHXz"))
    .then(function (module) { return ({ default: module.NarrowModeDialog }); }); });
var DeferredNarrowModeDialog = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DeferredNarrowModeDialog, _super);
    function DeferredNarrowModeDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeferredNarrowModeDialog.prototype.render = function () {
        return this.props.isEnabled
            ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Suspense"], { fallback: false },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](DeferredComponent, null)))
            : false;
    };
    return DeferredNarrowModeDialog;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "90KS":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/sp-canvas/canvas/canvasSection/CanvasSection.css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".CanvasSection-col{position:relative;min-height:1px;padding-left:8px;padding-right:8px;-webkit-box-sizing:border-box;box-sizing:border-box}[dir=ltr] .CanvasSection-col{float:left}.CanvasSection-col .ms-Grid{padding:0}[dir=rtl] .CanvasSection-col{float:right}.CanvasSection-sm12{width:100%}@media (min-width:1024px){.CanvasSection-xl12{width:100%}}@media (min-width:1024px){.CanvasSection-xl11{width:91.66666666666666%}}@media (min-width:1024px){.CanvasSection-xl10{width:83.33333333333334%}}@media (min-width:1024px){.CanvasSection-xl9{width:75%}}@media (min-width:1024px){.CanvasSection-xl8{width:66.66666666666666%}}@media (min-width:1024px){.CanvasSection-xl7{width:58.333333333333336%}}@media (min-width:1024px){.CanvasSection-xl6{width:50%}}@media (min-width:1024px){.CanvasSection-xl5{width:41.66666666666667%}}@media (min-width:1024px){.CanvasSection-xl4{width:33.33333333333333%}}@media (min-width:1024px){.CanvasSection-xl3{width:25%}}@media (min-width:1024px){.CanvasSection-xl2{width:16.666666666666664%}}@media (min-width:1024px){.CanvasSection-xl1{width:8.333333333333332%}}@media screen and (min-width:1024px){.CanvasSection--edit{min-width:312px}.CanvasSection--edit:nth-child(n+2):before{content:\"\";position:absolute;height:100%;color:\"[theme:neutralTertiary, default: #a19f9d]\"}[dir=ltr] .CanvasSection--edit:nth-child(n+2):before{border-left:1px dashed}[dir=rtl] .CanvasSection--edit:nth-child(n+2):before{border-right:1px dashed}[dir=ltr] .CanvasSection--edit:nth-child(n+2):before{left:-1px}[dir=rtl] .CanvasSection--edit:nth-child(n+2):before{right:-1px}.CanvasSection--reflow{min-width:auto;width:100%}.CanvasSection--reflow:nth-child(n+2):before{content:\"\";left:0;right:0;width:100%;height:auto;border-bottom:1px dashed;border-left:none}}@media screen and (max-width:1023.99999px){.CanvasSection--edit:nth-child(n+2):before{content:\"\";position:absolute;left:0;right:0;width:100%;color:\"[theme:neutralTertiary, default: #a19f9d]\";border-bottom:1px dashed}}@media screen and (min-width:641px){.CanvasSection--read .ControlZone{margin-top:24px}.CanvasSection--read .ControlZone:last-of-type{margin-bottom:24px}}", ""]);



/***/ }),

/***/ "9S6n":
/*!**********************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasDragZone/CanvasDragZoneConstants.js ***!
  \**********************************************************************************/
/*! exports provided: CanvasDragZoneConstants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasDragZoneConstants", function() { return CanvasDragZoneConstants; });
/**
 * Canvas Drag zone constants
 * @internal
 */
var CanvasDragZoneConstants = /** @class */ (function () {
    function CanvasDragZoneConstants() {
    }
    // To align the drag zone horizontal line with zone line
    CanvasDragZoneConstants.LINE_OFFSET_BOTTOM = -1;
    CanvasDragZoneConstants.LINE_OFFSET_TOP = 3;
    CanvasDragZoneConstants.controlZoneDragTag = 'ControlZone';
    CanvasDragZoneConstants.sectionDragTag = 'CanvasSection';
    CanvasDragZoneConstants.zoneDragTag = 'CanvasZone';
    CanvasDragZoneConstants.webPartButtonDragHandleTag = 'WebpartButtonHandle';
    CanvasDragZoneConstants.webPartBorderDragHandleTag = 'WebpartBorderHandle';
    CanvasDragZoneConstants.webPartInsideDragHandleTag = 'WebpartInsideHandle';
    CanvasDragZoneConstants.zoneDragHandleTag = 'ZoneHandle';
    CanvasDragZoneConstants.fullWidthSectionTag = 'CanvasFullWidth';
    return CanvasDragZoneConstants;
}());



/***/ }),

/***/ "9s5w":
/*!*************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/index.js ***!
  \*************************************************/
/*! exports provided: canvasStoreEditActionsLoader, DeferredCanvasToolboxHint, DeferredCanvasDragZone, DeferredNarrowModeDialog, canvasZonePropertyPaneControlLoader, DeferredSPRte, DeferredSPRteTouchDevice, DeferredToolbar, canvasDiffLoader, DeferredDiffIndicator, DeferredDiffMessage, DeferredControlDiffIndicator, CanvasDragZoneConstants, DeferredCanvasToolbox, DeferredToolboxComponent, DeferredToolboxFullBleedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _canvasStore_DeferredCanvasStoreEditActions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvasStore/DeferredCanvasStoreEditActions */ "38oj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "canvasStoreEditActionsLoader", function() { return _canvasStore_DeferredCanvasStoreEditActions__WEBPACK_IMPORTED_MODULE_0__["canvasStoreEditActionsLoader"]; });

/* harmony import */ var _canvasToolboxHint_DeferredCanvasToolboxHint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvasToolboxHint/DeferredCanvasToolboxHint */ "aKqg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredCanvasToolboxHint", function() { return _canvasToolboxHint_DeferredCanvasToolboxHint__WEBPACK_IMPORTED_MODULE_1__["DeferredCanvasToolboxHint"]; });

/* harmony import */ var _canvasDragZone_DeferredCanvasDragZone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvasDragZone/DeferredCanvasDragZone */ "fT2f");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredCanvasDragZone", function() { return _canvasDragZone_DeferredCanvasDragZone__WEBPACK_IMPORTED_MODULE_2__["DeferredCanvasDragZone"]; });

/* harmony import */ var _narrowModeDialog_DeferredNarrowModeDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./narrowModeDialog/DeferredNarrowModeDialog */ "85cM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredNarrowModeDialog", function() { return _narrowModeDialog_DeferredNarrowModeDialog__WEBPACK_IMPORTED_MODULE_3__["DeferredNarrowModeDialog"]; });

/* harmony import */ var _canvasZonePropertyPane_canvasZonePropertyPaneControlLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./canvasZonePropertyPane/canvasZonePropertyPaneControlLoader */ "OSqv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "canvasZonePropertyPaneControlLoader", function() { return _canvasZonePropertyPane_canvasZonePropertyPaneControlLoader__WEBPACK_IMPORTED_MODULE_4__["canvasZonePropertyPaneControlLoader"]; });

/* harmony import */ var _sprte_DeferredSPRte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sprte/DeferredSPRte */ "nrsI");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredSPRte", function() { return _sprte_DeferredSPRte__WEBPACK_IMPORTED_MODULE_5__["DeferredSPRte"]; });

/* harmony import */ var _sprte_DeferredSPRteTouchDevice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sprte/DeferredSPRteTouchDevice */ "cPvr");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredSPRteTouchDevice", function() { return _sprte_DeferredSPRteTouchDevice__WEBPACK_IMPORTED_MODULE_6__["DeferredSPRteTouchDevice"]; });

/* harmony import */ var _toolbar_DeferredToolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./toolbar/DeferredToolbar */ "XaoL");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredToolbar", function() { return _toolbar_DeferredToolbar__WEBPACK_IMPORTED_MODULE_7__["DeferredToolbar"]; });

/* harmony import */ var _canvasDiff_DeferredCanvasDiff__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./canvasDiff/DeferredCanvasDiff */ "o0cL");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "canvasDiffLoader", function() { return _canvasDiff_DeferredCanvasDiff__WEBPACK_IMPORTED_MODULE_8__["canvasDiffLoader"]; });

/* harmony import */ var _canvasDiff_DeferredDiffIndicator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./canvasDiff/DeferredDiffIndicator */ "kGU/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredDiffIndicator", function() { return _canvasDiff_DeferredDiffIndicator__WEBPACK_IMPORTED_MODULE_9__["DeferredDiffIndicator"]; });

/* harmony import */ var _canvasDiff_DeferredDiffMessage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./canvasDiff/DeferredDiffMessage */ "kel/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredDiffMessage", function() { return _canvasDiff_DeferredDiffMessage__WEBPACK_IMPORTED_MODULE_10__["DeferredDiffMessage"]; });

/* harmony import */ var _canvasDiff_DeferredControlDiffIndicator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./canvasDiff/DeferredControlDiffIndicator */ "VTSE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredControlDiffIndicator", function() { return _canvasDiff_DeferredControlDiffIndicator__WEBPACK_IMPORTED_MODULE_11__["DeferredControlDiffIndicator"]; });

/* harmony import */ var _canvasDragZone_CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./canvasDragZone/CanvasDragZoneConstants */ "9S6n");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasDragZoneConstants", function() { return _canvasDragZone_CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_12__["CanvasDragZoneConstants"]; });

/* harmony import */ var _canvasToolbox_DeferredCanvasToolbox__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./canvasToolbox/DeferredCanvasToolbox */ "7JSu");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredCanvasToolbox", function() { return _canvasToolbox_DeferredCanvasToolbox__WEBPACK_IMPORTED_MODULE_13__["DeferredCanvasToolbox"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredToolboxComponent", function() { return _canvasToolbox_DeferredCanvasToolbox__WEBPACK_IMPORTED_MODULE_13__["DeferredToolboxComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredToolboxFullBleedComponent", function() { return _canvasToolbox_DeferredCanvasToolbox__WEBPACK_IMPORTED_MODULE_13__["DeferredToolboxFullBleedComponent"]; });

/**
 * All the code that should be deferred to edit mode are located in editChunk folder.
 * They will be bundled in to one sp-canvas-edit chunk which will be loaded in edit mode on demand.
 */
// All the loaders or deferred components that responsible for loading edit chunks on demand.












// Others that needs to be in main bundle such as constants and interfaces.




/***/ }),

/***/ "ADOM":
/*!******************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvas/LayoutCanvas.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./LayoutCanvas.css */ "3Y08");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "AS1P":
/*!*****************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasComponent/CanvasComponent.js ***!
  \*****************************************************************/
/*! exports provided: CanvasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasComponent", function() { return CanvasComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _editChunk__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../editChunk */ "9s5w");
/* harmony import */ var _canvasLayout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../canvasLayout */ "yPt8");
/* harmony import */ var _CreateEmptyZoneLayout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CreateEmptyZoneLayout */ "EEYx");
/* harmony import */ var _canvasZone__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../canvasZone */ "yf/r");
/* harmony import */ var _CanvasVerticalSection__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../CanvasVerticalSection */ "DlB5");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../common/Flights */ "qRiB");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../common/KillSwitches */ "17t3");
/* harmony import */ var _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../loc/CanvasStrings.resx */ "K08d");
/* harmony import */ var _CanvasComponent_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./CanvasComponent.scss */ "ox2b");
/**
 * @copyright (c) Microsoft Corporation. All rights reserved.
 * Root React component of canvas.
 */

















var CanvasComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CanvasComponent, _super);
    function CanvasComponent(props) {
        var _this = _super.call(this, props) || this;
        _this._zonesMap = new Map();
        _this._narrowMediaQuery = window.matchMedia('screen and (max-width: 640px)');
        _this._canvasMainRef = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._canvasWrapperRef = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._handleFocus = function (event) {
            if (_this.props.store.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["DisplayMode"].Edit) {
                var store = _this.props.store;
                var targetElement = event.target;
                if (_this._canvasWrapper && _this._canvasWrapper.contains(targetElement)) {
                    var layoutIndex = _this._canvasMain && _this._canvasMain.contains(targetElement)
                        ? _canvasLayout__WEBPACK_IMPORTED_MODULE_8__["CanvasLayout"].firstLayoutIndex
                        : _canvasLayout__WEBPACK_IMPORTED_MODULE_8__["CanvasLayout"].verticalLayoutIndex;
                    if (store.selectedLayoutIndex !== layoutIndex) {
                        store.selectedLayoutIndex = layoutIndex;
                        var eventType = 'mouseenter';
                        if (event.type !== eventType) {
                            _this.props.store.canvasFields.render();
                        }
                    }
                }
            }
        };
        _this._handleScroll = function () {
            /* Call scroll handler for each zone on Scroll*/
            _this._zonesMap.forEach(function (zoneControl, key) {
                if (zoneControl) {
                    zoneControl.handleScroll();
                }
            });
        };
        _this._handleNarrowMediaQuery = function () {
            _this.props.store.isNarrowMode = _this._narrowMediaQuery.matches;
        };
        _this._handleScroll = _this._async.debounce(_this._handleScroll, 50);
        return _this;
    }
    /**
     * It usually means the DOM elements have been manipulated and React cannot update the component.
     * We will try to remount the component one time to make things right.
     */
    CanvasComponent.prototype.componentDidCatch = function (error, errorInfo) {
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled() && !_common_KillSwitches__WEBPACK_IMPORTED_MODULE_13__["KillSwitches"].tryReloadCanvasComponentWhenFailure.isActivated()) {
            var qos = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"]('CanvasComponent.Mount');
            var canvasFields = this.props.store.canvasFields;
            if (!this.props.hasTriedReload) {
                canvasFields.disposeAndRender();
                canvasFields.isDOMManipulated = true;
                qos.writeExpectedFailure('OneTimeFailure', error, {
                    componentStack: errorInfo.componentStack
                });
            }
            else {
                qos.writeUnexpectedFailure('ConsistentFailure', error, {
                    componentStack: errorInfo.componentStack
                });
            }
        }
    };
    CanvasComponent.prototype.componentDidMount = function () {
        var qos = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"]('CanvasComponent.Mount');
        _super.prototype.componentDidMount.call(this);
        var store = this.props.store;
        var displayMode = store.displayMode;
        var performanceLogger = store.canvasFields.canvasPerformanceLogger;
        if (performanceLogger) {
            performanceLogger.setPerformanceProperty('canvasComponentMounted');
        }
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_TraceLogger"].logVerbose(CanvasComponent._logSource, "CanvasComponent is mounted");
        var isEdit = displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["DisplayMode"].Edit;
        var canvasElement = react_dom__WEBPACK_IMPORTED_MODULE_2__["findDOMNode"](this);
        store.canvasElement = canvasElement;
        store.mainCanvasElement = this._canvasMain;
        store.scrollableParent = this._findScrollableParent(canvasElement);
        if (isEdit && store.scrollableParent) {
            store.scrollableParent.addEventListener('scroll', this._handleScroll);
        }
        this._narrowMediaQuery.addListener(this._handleNarrowMediaQuery);
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_13__["KillSwitches"].fixRenderCompleteInvokeTime.isActivated()) {
            // There are no web parts on the page, let Canvas Perf finish
            if (!store.webPartsCount && performanceLogger) {
                store.onViewportWebPartsRendered(performanceLogger.now());
                if (_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isAnchorFlightEnabled()) {
                    store.onAllWebPartsRendered(performanceLogger.now());
                }
            }
        }
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isAnchorFlightEnabled() && displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["DisplayMode"].Read) {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["_SPEventManager"].instance.raiseEvent('anchorEvent', { action: "FinishRegistration" /* FinishRegistration */ });
        }
        qos.writeSuccess();
    };
    CanvasComponent.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var store = this.props.store;
        var displayMode = store.displayMode;
        if (displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["DisplayMode"].Edit && store.scrollableParent) {
            store.scrollableParent.removeEventListener('scroll', this._handleScroll);
        }
        this._narrowMediaQuery.removeListener(this._handleNarrowMediaQuery);
        store.clearRevealObserver();
    };
    CanvasComponent.prototype.componentDidUpdate = function () {
        var store = this.props.store;
        var displayMode = store.displayMode;
        if (displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["DisplayMode"].Edit && store.scrollableParent) {
            store.scrollableParent.addEventListener('scroll', this._handleScroll);
        }
        else if (displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["DisplayMode"].Read && store.scrollableParent) {
            store.scrollableParent.removeEventListener('scroll', this._handleScroll);
        }
        if (!store.mainCanvasElement) {
            store.mainCanvasElement = this._canvasMain;
        }
        if (!_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isEditTransitionPerFrame() && _common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isAnchorFlightEnabled() && displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["DisplayMode"].Read) {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["_SPEventManager"].instance.raiseEvent('anchorEvent', { action: "FinishRegistration" /* FinishRegistration */ });
        }
    };
    CanvasComponent.prototype.render = function () {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_TraceLogger"].logVerbose(CanvasComponent._logSource, "CanvasComponent _render() is called");
        var store = this.props.store;
        var displayMode = store.displayMode;
        var isEdit = displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["DisplayMode"].Edit;
        /**
         * Only set focus on a hint during the render after control is deleted.
         */
        store.deletedControlLayout = _canvasLayout__WEBPACK_IMPORTED_MODULE_8__["undefinedControlPosition"];
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: 'CanvasComponent' },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editChunk__WEBPACK_IMPORTED_MODULE_7__["DeferredNarrowModeDialog"], { isEnabled: isEdit && store.isNarrowMode }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editChunk__WEBPACK_IMPORTED_MODULE_7__["DeferredCanvasDragZone"], { isEdit: isEdit, store: store }, this._canvasContent)));
    };
    CanvasComponent.prototype._getClassName = function (className) {
        var _a;
        var shouldResize = this.props.store.shouldResize(_canvasLayout__WEBPACK_IMPORTED_MODULE_8__["CanvasLayout"].firstLayoutIndex);
        return Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])(className, (_a = {},
            _a[className + "--reflow"] = shouldResize,
            _a));
    };
    Object.defineProperty(CanvasComponent.prototype, "_isVSPresent", {
        get: function () {
            return !_common_KillSwitches__WEBPACK_IMPORTED_MODULE_13__["KillSwitches"].updateZoneHintAfterVSDeletion.isActivated() &&
                this.props.store.canvasFields.isVerticalSectionPresent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasComponent.prototype, "_canvasWrapper", {
        get: function () {
            return this._canvasWrapperRef.current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasComponent.prototype, "_canvasMain", {
        get: function () {
            return this._canvasMainRef.current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasComponent.prototype, "_zones", {
        get: function () {
            var store = this.props.store;
            var canvasLayout = store.canvasLayouts.get(_canvasLayout__WEBPACK_IMPORTED_MODULE_8__["CanvasLayout"].firstLayoutIndex);
            return canvasLayout ? canvasLayout.zones : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasComponent.prototype, "_zoneComponents", {
        get: function () {
            var _this = this;
            var store = this.props.store;
            var displayMode = store.displayMode;
            var deletedControlLayout = store.deletedControlLayout;
            var selectedLayout = store.canvasLayout.fetchCurrentSelection();
            var shouldCenterAlign = store.shouldCenterAlign;
            var isEdit = displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["DisplayMode"].Edit;
            // Iterate over the canvas zones and create layout zone components
            var zoneComponents = [];
            var zones = this._zones;
            var numZones = zones.length;
            var shouldResize = store.shouldResize(_canvasLayout__WEBPACK_IMPORTED_MODULE_8__["CanvasLayout"].firstLayoutIndex);
            zones.forEach(function (curZone, curIdx) {
                zoneComponents.push(react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_canvasZone__WEBPACK_IMPORTED_MODULE_10__["CanvasZone"], { componentRef: function (zoneControl) {
                        // old ref will be called with null arg when unmounting
                        if (zoneControl) {
                            _this._zonesMap.set(curZone.elementKey, zoneControl);
                        }
                        else {
                            _this._zonesMap.delete(curZone.elementKey);
                        }
                    }, fullWidth: _this._isFullWidthSectionEnabled(curZone), selectedPosition: selectedLayout, key: _common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled() ? curZone.id : curZone.elementKey, shouldCenterAlign: shouldCenterAlign, zone: curZone, layoutType: curZone.layoutType, zoneLabel: _this._getZoneAriaLabel(curIdx + 1, numZones), emphasis: curZone.emphasis, layoutIndex: _canvasLayout__WEBPACK_IMPORTED_MODULE_8__["CanvasLayout"].firstLayoutIndex, shouldResize: shouldResize, store: store, displayMode: store.displayMode }));
                var nextZoneIndex = curIdx + 1 === numZones
                    ? // This is the last zone, create a new Zone by incrementing the zoneIdx
                        curZone.index + 1
                    : // Get the next zone index
                        zones[curIdx + 1].index;
                var nextZoneLayout = Object(_CreateEmptyZoneLayout__WEBPACK_IMPORTED_MODULE_9__["CreateEmptyZoneLayout"])(nextZoneIndex);
                var zoneBeforeState = _this._getZoneSelectionState(selectedLayout, zones[curIdx].index);
                var zoneAfterState = curIdx < zones.length - 1
                    ? _this._getZoneSelectionState(selectedLayout, zones[curIdx + 1].index)
                    : 1 /* None */;
                // since the hint is at the intersection of two zones we need to make sure that the zone with the
                // higher precedence state is the one that imposes its state on the hint
                var adjacentZoneState = Math.max(zoneBeforeState, zoneAfterState);
                zoneComponents.push(react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editChunk__WEBPACK_IMPORTED_MODULE_7__["DeferredCanvasToolboxHint"], { adjacentZoneState: adjacentZoneState, ariaLabel: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].ToolboxHintSectionTitleOnlyLayouts, isVisible: true, key: "hint." + nextZoneIndex, layout: nextZoneLayout, shouldCenterAlign: shouldCenterAlign, shouldFocus: deletedControlLayout.zoneIndex === nextZoneIndex, type: 1 /* Zone */, store: store, isVSPresent: _this._isVSPresent }));
            });
            // Add an empty CanvasZone to always render a web part hint at the end of the Canvas
            if (isEdit) {
                var latestZoneIndex = numZones > 0 ? zones[numZones - 1].index + 1 : _canvasLayout__WEBPACK_IMPORTED_MODULE_8__["CanvasLayout"].firstLayoutIndex;
                // Specify Non-0 section index so it will render web part hint instead of section hint
                var emptySectionIndex = 1;
                var emptyCanvasSectionLayout = Object(_CreateEmptyZoneLayout__WEBPACK_IMPORTED_MODULE_9__["CreateEmptyZoneLayout"])(latestZoneIndex, emptySectionIndex);
                var emptyHintClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])('EmptyCanvasHint', 'withVerticalSection');
                zoneComponents.push(react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: numZones === 0 ? emptyHintClassName : undefined, key: 'LastHint' },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_canvasZone__WEBPACK_IMPORTED_MODULE_10__["EmptyCanvasZone"], { hintLayout: emptyCanvasSectionLayout, shouldCenterAlign: shouldCenterAlign, store: store })));
            }
            return zoneComponents;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasComponent.prototype, "_canvasContent", {
        get: function () {
            var store = this.props.store;
            var displayMode = store.displayMode;
            var shouldRenderWithVerticalSection = store.canvasFields.isVerticalSectionPresent;
            var deletedControlLayout = store.deletedControlLayout;
            var selectedLayout = store.canvasLayout.fetchCurrentSelection();
            var shouldCenterAlign = store.shouldCenterAlign;
            var isEdit = displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["DisplayMode"].Edit;
            var zones = this._zones;
            var shouldResize = store.shouldResize(_canvasLayout__WEBPACK_IMPORTED_MODULE_8__["CanvasLayout"].firstLayoutIndex);
            var shouldUpdateCanvasTop = !store.canvasFields.isVerticalSectionPresent &&
                !!store.isRootScrollableElement &&
                store.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["DisplayMode"].Edit;
            var className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])('Canvas', 'grid', 'Canvas--withLayout', {
                'Canvas--edit': isEdit,
                'UpdateEditTop': shouldUpdateCanvasTop
            });
            var firstZoneIdx = zones.length > 0 ? zones[0].index : _canvasLayout__WEBPACK_IMPORTED_MODULE_8__["CanvasLayout"].firstLayoutIndex;
            var firstZoneLayout = Object(_CreateEmptyZoneLayout__WEBPACK_IMPORTED_MODULE_9__["CreateEmptyZoneLayout"])(firstZoneIdx);
            var toolBoxHintHasFocus = deletedControlLayout.zoneIndex === firstZoneLayout.zoneIndex;
            var canvasContent = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: className, role: isEdit ? 'application' : undefined },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editChunk__WEBPACK_IMPORTED_MODULE_7__["DeferredCanvasToolboxHint"], { adjacentZoneState: zones.length > 0
                        ? this._getZoneSelectionState(selectedLayout, zones[0].index)
                        : 1 /* None */, ariaLabel: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].ToolboxHintSectionTitleOnlyLayouts, isVisible: true, layout: firstZoneLayout, shouldCenterAlign: shouldCenterAlign, shouldFocus: toolBoxHintHasFocus, type: 1 /* Zone */, store: store, isVSPresent: this._isVSPresent }),
                this._zoneComponents));
            var withVerticalSection = shouldRenderWithVerticalSection && !store.canvasFields.isFullWidthSectionPresent;
            var wrapperClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])(this._getClassName('CanvasComponentWrapper'), { 'CenterAligned': store.shouldCenterAlign });
            var wrapperProps = withVerticalSection
                ? {
                    className: wrapperClassName,
                    onFocus: this._handleFocus,
                    onMouseEnter: this._handleFocus,
                    ref: this._canvasWrapperRef
                }
                : {};
            var canvasComponentMainClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])(this._getClassName('CanvasComponentMain'), {
                'isEdit': displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["DisplayMode"].Edit
            });
            var canvasLayoutDataAutomationId = 'CanvasLayout';
            var canvasMainProps = withVerticalSection ?
                {
                    className: canvasComponentMainClassName,
                    ref: this._canvasMainRef,
                    'data-automation-id': canvasLayoutDataAutomationId
                } : {};
            canvasContent = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, wrapperProps),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, canvasMainProps), canvasContent),
                withVerticalSection && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])('CanvasVerticalSectionContainer', {
                        isEdit: displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["DisplayMode"].Edit,
                        'CanvasVerticalSectionContainer--reflow': shouldResize
                    }), "data-automation-id": canvasLayoutDataAutomationId },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_CanvasVerticalSection__WEBPACK_IMPORTED_MODULE_11__["CanvasVerticalSection"], { layoutIndex: _canvasLayout__WEBPACK_IMPORTED_MODULE_8__["CanvasLayout"].verticalLayoutIndex, store: store })))));
            return canvasContent;
        },
        enumerable: true,
        configurable: true
    });
    CanvasComponent.prototype._getZoneAriaLabel = function (zoneIndex, zonesLength) {
        return _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__["StringHelper"].format(_loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].SectionPositionAriaLabel, zoneIndex, zonesLength);
    };
    CanvasComponent.prototype._isFullWidthSectionEnabled = function (zone) {
        return zone.sections[0] && zone.sections[0].factor === 0 && this.props.store.siteSupportsFullWidth;
    };
    CanvasComponent.prototype._getZoneSelectionState = function (selectedLayout, zoneIndex) {
        if (!selectedLayout) {
            return 1 /* None */;
        }
        var isZoneSelected = selectedLayout.zoneIndex === zoneIndex;
        var isZoneActive = Boolean(selectedLayout.controlIndex) && isZoneSelected;
        // active > selected > focused. Keep these in order
        if (isZoneActive) {
            return 2 /* Active */;
        }
        if (isZoneSelected) {
            return 3 /* Selected */;
        }
        return 1 /* None */;
    };
    CanvasComponent.prototype._findScrollableParent = function (canvasElement) {
        return this._findScrollableParentOptimized(canvasElement) || this._findScrollableParentNormal(canvasElement);
    };
    /**
     * Find the optimized scrollable parent.
     * @param canvasElement - From which to find scrollable parent.
     * @returns - The optimized scrollable parent or undefined if not found.
     */
    CanvasComponent.prototype._findScrollableParentOptimized = function (canvasElement) {
        var DATA_IS_SCROLLABLE_ATTRIBUTE = 'data-is-scrollable';
        var canvasContainer = canvasElement;
        while (canvasContainer && canvasContainer.tagName !== 'BODY') {
            canvasContainer = canvasContainer.parentElement;
            if (canvasContainer && canvasContainer.getAttribute(DATA_IS_SCROLLABLE_ATTRIBUTE) === 'true') {
                return canvasContainer;
            }
        }
        return undefined;
    };
    /**
     * Find the scrollable parent by checking overflow-y attribute.
     * Return BODY element if no such elements.
     *
     * @param canvasElement - From which to find scrollable parent.
     * @returns - The scrollable parent that always exists as long as the canvasElement is attached to DOM.
     */
    CanvasComponent.prototype._findScrollableParentNormal = function (canvasElement) {
        var canvasContainer = canvasElement;
        while (canvasContainer && canvasContainer.tagName !== 'BODY') {
            if (!canvasContainer.parentElement) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_TraceLogger"].logError(CanvasComponent._logSource, new Error('Cannot find scrollable parent for canvasElement'));
                return canvasContainer;
            }
            else {
                canvasContainer = canvasContainer.parentElement;
                var overflowY = window.getComputedStyle(canvasContainer)['overflow-y'];
                if (overflowY === 'scroll' || overflowY === 'auto') {
                    return canvasContainer;
                }
            }
        }
        return canvasContainer;
    };
    CanvasComponent._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_LogSource"].create('CanvasComponent');
    return CanvasComponent;
}(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["BaseComponent"]));



/***/ }),

/***/ "AqUB":
/*!***************************************************!*\
  !*** ./lib/sp-canvas/a11y/CanvasA11yConstants.js ***!
  \***************************************************/
/*! exports provided: canvasA11yClasses, getControlZoneA11yId, getCanvasZoneA11yId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasA11yClasses", function() { return canvasA11yClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getControlZoneA11yId", function() { return getControlZoneA11yId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCanvasZoneA11yId", function() { return getCanvasZoneA11yId; });
var canvasA11yClasses = {
    toolboxHint: 'ToolboxHint'
};
function getControlZoneA11yId(controlId) {
    return "ControlZone_" + controlId;
}
function getCanvasZoneA11yId(zoneIndex) {
    return "CanvasZone_" + zoneIndex;
}


/***/ }),

/***/ "AsKj":
/*!***********************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasStore/CanvasContentDeserializer.js ***!
  \***********************************************************************/
/*! exports provided: stripOutNewLinesAndSpacesFromInnerHTML, replaceImageTagsInHtmlString, CanvasContentDeserializer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripOutNewLinesAndSpacesFromInnerHTML", function() { return stripOutNewLinesAndSpacesFromInnerHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceImageTagsInHtmlString", function() { return replaceImageTagsInHtmlString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasContentDeserializer", function() { return CanvasContentDeserializer; });
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-webpart-base */ "br4S");
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _canvasControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../canvasControl */ "iO6m");



/*
 * This method is used to cleanup any extra spaces or lines in HTML tags
 */
/* tslint:disable-next-line:export-name */
function stripOutNewLinesAndSpacesFromInnerHTML(innerHTML) {
    /* This is a regex to remove new lines and spaces between HTML Tags. */
    return innerHTML.replace(/>\s+</g, '><');
}
// @todo #302709 this method can be removed after using DomParser instead of document.createElement
function replaceImageTagsInHtmlString(htmlString) {
    // We use this complex regex because using a simple replace will make a self-closing spimg tag which isn't known
    // to browsers, because custom tag names can NOT be self-closing. Therefore, the browser will add a
    // closing </spimg> at the end and mess up the whole structure. For example <img src='1'><img src='2'> would
    // convert to '<spimg src='1'><spimg src='2'></spimg></spimg> which is nested.
    // WARNING; The following is a known regex for detecting html elements. Do NOT modify.
    // The regex is a moddified version of what is explained here:
    // http://haacked.com/archive/2004/10/25/usingregularexpressionstomatchhtml.aspx/
    return htmlString.replace(/<img((\s+[^\t\n\f \/>"'=]+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/gi, '<spimg$1></spimg>');
}
/**
 * This is to deserialize canvas content from string format into an Object.
 * @internal
 */
var CanvasContentDeserializer = /** @class */ (function () {
    function CanvasContentDeserializer() {
    }
    // VSO#696852 return type should be typed as ICanvasControl[] after PageUndoRedo flight is graduated.
    CanvasContentDeserializer.deserializeCanvas = function (serializedCanvas) {
        var qos = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('CanvasContentDeserialize');
        var row;
        try {
            if (serializedCanvas) {
                var controlAttribute = 'data-sp-canvascontrol';
                var tryJson = true;
                // Check to see if the serializedCanvas value is potentially HTML
                if (serializedCanvas.indexOf(controlAttribute) !== -1) {
                    var wrapper = document.createElement('div');
                    // Replace all IMG tags with SPIMG so the browser doesn't try to pre-load them.
                    // We want to avoid pre-loading because the browser tries to download the full-size image here which leads
                    // to duplicate download of the same image in two sizes. To make this work, WebPartDataConverter detects both
                    // IMG and SPIMG tags.
                    // @todo #302709 this trick can be removed after using DomParser instead of document.createElement
                    wrapper.innerHTML = replaceImageTagsInHtmlString(serializedCanvas);
                    // We need to cleanup the html to remove any extra lines or spaces
                    wrapper.innerHTML = stripOutNewLinesAndSpacesFromInnerHTML(wrapper.innerHTML);
                    var rows = wrapper.querySelectorAll("[" + controlAttribute + "]");
                    var rowLength = rows.length;
                    var controlDataCollection = [];
                    // If rowLength is 0 then serializedCanvas is either an empty canvas or JSON
                    if (rowLength > 0) {
                        tryJson = false;
                        for (var i = 0; i < rowLength; ++i) {
                            row = rows[i];
                            // Note: The legacy support exists for previously persisted data that have legacy structure
                            // We use data-sp-canvasdataversion attribute because it didn't exist in the legacy format
                            var isLegacyHtml = !row.hasAttribute('data-sp-canvasdataversion');
                            var controlProps = void 0;
                            if (isLegacyHtml) {
                                controlProps = CanvasContentDeserializer._deserializeLegacyCanvasControlHtml(row);
                            }
                            else {
                                controlProps = CanvasContentDeserializer._deserializeCanvasControlHtml(row);
                            }
                            if (controlProps) {
                                controlDataCollection.push(controlProps);
                            }
                        }
                        qos.writeSuccess();
                        return controlDataCollection;
                    }
                }
                if (tryJson) {
                    /**
                     * If tryJson is still true, checking the flight will indicate either serializedCanvas
                     * is empty (false) or JSON (true)
                     */
                    qos.writeSuccess();
                    return CanvasContentDeserializer._processCanvasContent(serializedCanvas);
                }
                else {
                    qos.writeUnexpectedFailure('Invalid format', undefined, {
                        serializedCanvas: serializedCanvas
                    });
                    return undefined;
                }
            }
        }
        catch (err) {
            qos.writeExpectedFailure('Exception', err, {
                errorControl: row ? row.outerHTML : undefined
            });
            return undefined;
        }
    };
    CanvasContentDeserializer._isValidControlType = function (controlProps) {
        return (controlProps.controlType >= 3 && controlProps.controlType <= 10) || !!controlProps.position;
    };
    /**
     * Deserializes the persisted html of canvas control in legacy format to ICanvasControl
     * In legacy format, data-sp-controldata attribute contains both canvas control data and web part data
     */
    CanvasContentDeserializer._deserializeLegacyCanvasControlHtml = function (row) {
        // ControlProps will be null in case of bad input
        var controlDataValue = row.getAttribute('data-sp-controldata');
        var controlProps = controlDataValue
            ? JSON.parse(decodeURI(controlDataValue))
            : undefined;
        if (controlProps) {
            if (!CanvasContentDeserializer._isValidControlType(controlProps)) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(CanvasContentDeserializer.logSource, "Invalid Control Type");
                return undefined;
            }
            controlProps.addedFromPersistedData = true;
            /**
             * Deserialize using the row's HTML because SafeHTML scrubs the serialized RTE HTML persisted in the
             * row, and does not scrub the attribute.
             */
            if (controlProps.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_2__["CanvasControlType"].RTE) {
                controlProps.innerHTML = row.innerHTML;
            }
            var webPartData = controlProps.webPartData;
            if (webPartData) {
                // Early versions of mobile clients only set htmlProperties instead of setting the div innerHTML
                var htmlString = webPartData.htmlProperties; /* tslint:disable-line:no-any */
                // If the div exists, we use its innerHTML instead of .htmlProperties
                var htmlPropsDiv = row.querySelector('[data-sp-htmlproperties]');
                if (htmlPropsDiv) {
                    htmlString = htmlPropsDiv.innerHTML;
                }
                // Replace all IMG tags with SPIMG so the browser doesn't try to pre-load them.
                if (htmlString) {
                    htmlString = replaceImageTagsInHtmlString(htmlString);
                }
                webPartData.serverProcessedContent = _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_1__["WebPartDataConverter"].convertServerProcessedHtmlToData(htmlString);
            }
        }
        return controlProps || undefined;
    };
    /**
     * Deserializes the persisted html for canvas control
     */
    CanvasContentDeserializer._deserializeCanvasControlHtml = function (row) {
        // ControlProps will be null in case of bad input
        var controlDataValue = row.getAttribute('data-sp-controldata');
        var controlProps = controlDataValue
            ? JSON.parse(decodeURI(controlDataValue))
            : undefined;
        if (!controlProps || !CanvasContentDeserializer._isValidControlType(controlProps)) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(CanvasContentDeserializer.logSource, "Invalid Control Type");
            return undefined;
        }
        controlProps.addedFromPersistedData = true;
        var webPartDiv = row.querySelector('[data-sp-webpart]');
        if (webPartDiv) {
            var webPartDivWrapper = document.createElement('div');
            webPartDivWrapper.appendChild(webPartDiv);
            controlProps.webPartData = _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_1__["WebPartDataConverter"].convertHtmlToWebPartData(webPartDivWrapper.innerHTML); // Todo#661360 Fix workaround left-over
        }
        else {
            var rteDiv = row.querySelector('[data-sp-rte]');
            if (rteDiv || controlProps.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_2__["CanvasControlType"].RTE) {
                controlProps.innerHTML = rteDiv ? rteDiv.innerHTML : row.innerHTML;
            }
        }
        return controlProps;
    };
    /**
     * Processes the Json object string generated by the ContentSerializer.ToJson
     * server API and constructs canvas control objects. No decodeURI required since
     * API doesn't encode content
     */
    CanvasContentDeserializer._processCanvasContent = function (serializedCanvas) {
        return JSON.parse(serializedCanvas);
    };
    CanvasContentDeserializer.logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogSource"].create('CanvasContentDeserializer');
    return CanvasContentDeserializer;
}());



/***/ }),

/***/ "BI4S":
/*!***************************************************!*\
  !*** ../sp-rte/lib/rte/ckeditor/CKTextEditor.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./CKTextEditor.css */ "g+B9");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "CI0h":
/*!****************************************************************!*\
  !*** ./lib/sp-canvas/canvas/controlZone/ControlZone.styles.js ***!
  \****************************************************************/
/*! exports provided: ControlZoneStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlZoneStyles", function() { return ControlZoneStyles; });
/* harmony import */ var _common_StyleHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/StyleHelpers */ "wFVB");

var ControlZoneStyles = /** @class */ (function () {
    function ControlZoneStyles() {
    }
    ControlZoneStyles.getEmphasisBackgroundClass = function (props) {
        return Object(_common_StyleHelpers__WEBPACK_IMPORTED_MODULE_0__["getClassNames"])(ControlZoneStyles._getEmphasisBackgroundStyle, props);
    };
    ControlZoneStyles._getEmphasisBackgroundStyle = function (props) {
        var root = props.root, theme = props.theme, shouldShowNewStyles = props.shouldShowNewStyles;
        var semanticColors = theme.semanticColors, palette = theme.palette;
        return {
            root: [
                root,
                {
                    selectors: {
                        '&:after': {
                            border: '1px solid',
                            borderColor: palette.neutralTertiary
                        }
                    }
                }
            ],
            emphasisBackground: [
                'ControlZone--emphasisBackground',
                {
                    backgroundColor: semanticColors.inputBackground,
                    margin: shouldShowNewStyles
                        ? undefined
                        : '-8px'
                }
            ],
            selected: [
                'ControlZone--selected', {
                    selectors: {
                        '&:after': {
                            borderColor: palette.themePrimary
                        }
                    }
                }
            ]
        };
    };
    return ControlZoneStyles;
}());



/***/ }),

/***/ "CQTG":
/*!********************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasZone/CanvasZone.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./CanvasZone.css */ "33d5");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "CRn6":
/*!**************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasSection/CanvasSection.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./CanvasSection.css */ "90KS");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "DlB5":
/*!*************************************************************!*\
  !*** ./lib/sp-canvas/canvas/CanvasVerticalSection/index.js ***!
  \*************************************************************/
/*! exports provided: CanvasVerticalSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CanvasVerticalSection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasVerticalSection */ "t874");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasVerticalSection", function() { return _CanvasVerticalSection__WEBPACK_IMPORTED_MODULE_0__["CanvasVerticalSection"]; });




/***/ }),

/***/ "EEYx":
/*!***********************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasComponent/CreateEmptyZoneLayout.js ***!
  \***********************************************************************/
/*! exports provided: CreateEmptyZoneLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateEmptyZoneLayout", function() { return CreateEmptyZoneLayout; });
function CreateEmptyZoneLayout(zoneIndex, sectionIndex, controlIndex, layoutIndex) {
    return {
        zoneIndex: zoneIndex,
        sectionIndex: sectionIndex,
        controlIndex: controlIndex,
        layoutIndex: layoutIndex
    };
}


/***/ }),

/***/ "EPam":
/*!*********************************************************!*\
  !*** ./lib/sp-canvas/canvas/controlZone/ControlZone.js ***!
  \*********************************************************/
/*! exports provided: ControlZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlZone", function() { return ControlZone; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/sp-a11y */ "ytfe");
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _a11y_CanvasA11yConstants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../a11y/CanvasA11yConstants */ "AqUB");
/* harmony import */ var _canvasControl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../canvasControl */ "iO6m");
/* harmony import */ var _canvasAnimations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../canvasAnimations */ "fqJ2");
/* harmony import */ var _editChunk__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../editChunk */ "9s5w");
/* harmony import */ var _canvasSection__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../canvasSection */ "JqQl");
/* harmony import */ var _ControlZone_styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ControlZone.styles */ "CI0h");
/* harmony import */ var _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../loc/CanvasStrings.resx */ "K08d");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../common/Flights */ "qRiB");















var ControlZone = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ControlZone, _super);
    function ControlZone(props) {
        var _this = _super.call(this, props) || this;
        /* tslint:disable-next-line:no-any */
        _this._handleControlFocus = function (e) {
            _this._selectControl();
            if (ControlZone._isCleanSelectionModel &&
                _this._childControlElement &&
                !_this._childControlElement.contains(document.activeElement)) {
                _this._childControlElement.focus();
            }
        };
        /* tslint:disable-next-line:no-any */
        _this._handleClickCapture = function (e) {
            _this._selectControl();
        };
        _this._handleKeydownCapture = function (evt) {
            var store = _this.props.store;
            if (_this.props.control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_8__["CanvasControlType"].WebPartZone) {
                _this._selectControl();
                if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["Keyboard"].isEscape(evt) && _this._domElement) {
                    store.a11yManager.focusTo(_this._domElement);
                    evt.stopPropagation();
                    evt.preventDefault();
                }
                else if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["Keyboard"].isKey(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["KeyCodes"].f10, evt, { alt: true }) && _this._toolbarElement) {
                    store.a11yManager.focusTo(_this._toolbarElement);
                    store.a11yManager.alert(_loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_13__["default"].ToolbarNavigationArrowKeys);
                    evt.stopPropagation();
                    evt.preventDefault();
                }
                else if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["Keyboard"].isKey(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["KeyCodes"].p, evt, { alt: true })) {
                    if (store.propertyPaneController) {
                        store.propertyPaneController.requestAction(_this.props.control.id, 1 /* Open */);
                    }
                    evt.stopPropagation();
                    evt.preventDefault();
                }
                else if (!_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["Keyboard"].isShiftTab(evt) ||
                    (_this._childControlElement && evt.target !== _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["Focus"].getFirstFocusableChild(_this._childControlElement))) {
                    store.a11yManager.skipEvent(evt);
                }
            }
        };
        _this._handleToolbarKeydown = function (evt) {
            if (_this._childControl && _this.props.control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_8__["CanvasControlType"].RTE) {
                _this._selectControl();
                // Only for RTE: pressing escape on toolbar takes the focus inside the editor
                if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["Keyboard"].isEscape(evt)) {
                    _this._childControl.focus();
                    evt.stopPropagation();
                    evt.preventDefault();
                }
                else if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["Keyboard"].isTab(evt)) {
                    // Focus on the formatting bar if tab is pressed on the toolbar
                    _this._childControl.focusFormattingBar();
                    evt.stopPropagation();
                    evt.preventDefault();
                }
            }
        };
        /* tslint:disable-next-line:no-any */
        _this._handleMouseOut = function (e) {
            _this.props.store.hoveredControlId = undefined;
        };
        /* tslint:disable-next-line:no-any */
        _this._handleMouseOver = function (e) {
            _this.props.store.hoveredControlId = _this.props.control.id;
        };
        /**
         * Invoke reveal if the hosted control is the RTE.
         * WebPartZone handles its own reveal based on web part loading.
         *
         * @param controlType - Current control type of the hosted control
         */
        _this._reveal = function (controlType) {
            if (_this._domElement && _canvasControl__WEBPACK_IMPORTED_MODULE_8__["CanvasControlType"].RTE === controlType && _canvasAnimations__WEBPACK_IMPORTED_MODULE_9__["CanvasRevealObserver"].isAvailable()) {
                _this.props.store.revealObserver.observe(_this._domElement, function (entry, observer) {
                    _this.setState({ isVisible: true });
                    observer.unobserve(entry.target);
                });
            }
        };
        _this._selectControl = function () {
            _this.props.store.selectedControlId = _this.props.control.id;
        };
        ControlZone._isCleanSelectionModel = props.store.canvasFields.isCleanSelectionEnabled;
        _this._isHoverStateFlightOnAndBorderDraggableKSOff = ControlZone._isCleanSelectionModel;
        _this.state = {
            isVisible: false
        };
        __webpack_require__(/*! ./LayoutControlZone.css */ "VQpE");
        return _this;
    }
    ControlZone.isWebPartOverlayNeeded = function (control) {
        if (control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_8__["CanvasControlType"].RTE) {
            return false;
        }
        else if (control.webPartManifest) {
            switch (control.webPartManifest.id) {
                /**
                 * Adding overlay for all web parts by extending this list
                 * Currently enforcing it on all but RTE
                 */
                // case 'd1d91016-032f-456d-98a4-721247c305e8': // image
                // case '544dd15b-cf3c-441b-96da-004d5a8cea1d': // Youtube HTML Embed
                // case '275c0095-a77e-4f6d-a2a0-6a7626911518': // Office 365 video
                //   return true;
                default:
                    return true;
            }
        }
        return false;
    };
    ControlZone.isWebPartExemptFromBackground = function (manifest) {
        if (!manifest) {
            return false;
        }
        var killSwitchId = ControlZone._emphasisWebPartManifestKillSwitchMap.get(manifest.id);
        var killed = Boolean(killSwitchId && _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].parse(killSwitchId), '2/24/2019', 'SectionEmphasis'));
        return Boolean(manifest.supportsThemeVariants && !killed);
    };
    ControlZone._getDragDisallowedAttribute = function (control) {
        if (!_canvasSection__WEBPACK_IMPORTED_MODULE_11__["CanvasFullWidthSection"].isFullWidthControl(control)) {
            return _editChunk__WEBPACK_IMPORTED_MODULE_10__["CanvasDragZoneConstants"].fullWidthSectionTag;
        }
        else {
            return undefined;
        }
    };
    ControlZone.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var _a = this.props, displayMode = _a.displayMode, emphasisTheme = _a.emphasisTheme, isSelected = _a.isSelected, control = _a.control;
        var isControlChanged = _common_Flights__WEBPACK_IMPORTED_MODULE_14__["Flights"].isPageUndoRedoFlightEnabled()
            ? !Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["isEqual"])(nextProps.control, control)
            : (!Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["isEqual"])(nextProps.control.position, control.position) ||
                !Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["isEqual"])(nextProps.control.emphasis, control.emphasis));
        return (displayMode !== nextProps.displayMode ||
            isSelected !== nextProps.isSelected ||
            isControlChanged ||
            !Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["isEqual"])(nextProps.emphasisTheme, emphasisTheme) ||
            this.state.isVisible !== nextState.isVisible ||
            this.props.controlDiff !== nextProps.controlDiff);
    };
    ControlZone.prototype.componentDidMount = function () {
        var store = this.props.store;
        var _a = this.props, control = _a.control, displayMode = _a.displayMode;
        if (store.selectedControlId === control.id && this._domElement) {
            // 500ms animation duration
            store.scrollIntoView('partial', this._domElement, 500, ControlZone._VERTICAL_MARGIN * 2);
            store.a11yManager.focusTo(this._domElement);
        }
        this._childControl = store.canvasFields.getControlComponentById(control.id);
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit === displayMode && this._toolbarElement && this._childControlElement) {
            this._toolbarElement.addEventListener('keydown', this._handleToolbarKeydown);
            this._childControlElement.addEventListener('keydown', this._handleKeydownCapture, true);
        }
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Read === displayMode) {
            this._reveal(control.controlType);
        }
    };
    ControlZone.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, control = _a.control, displayMode = _a.displayMode;
        if (prevProps.displayMode !== displayMode && this._toolbarElement && this._childControlElement) {
            if (displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit) {
                this._toolbarElement.addEventListener('keydown', this._handleToolbarKeydown);
                this._childControlElement.addEventListener('keydown', this._handleKeydownCapture, true);
            }
            else if (displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Read) {
                this._toolbarElement.removeEventListener('keydown', this._handleToolbarKeydown);
                this._childControlElement.removeEventListener('keydown', this._handleKeydownCapture, true);
                this._reveal(control.controlType);
            }
        }
        if (prevProps.control.position.sectionFactor !== control.position.sectionFactor) {
            this.props.store.webPartManager.notifyWebPartContainerResize(control.id);
        }
    };
    ControlZone.prototype.render = function () {
        var _this = this;
        var _a, _b;
        var _c = this.props, children = _c.children, control = _c.control, displayMode = _c.displayMode, emphasisTheme = _c.emphasisTheme, isSelected = _c.isSelected, theme = _c.theme;
        var controlType = control.controlType, id = control.id;
        var isReadMode = displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Read;
        var accessibleLabel = '';
        var ariaPrimaryLabelById = "cswpAccessibleLabel_" + id;
        // Keep ID in sync with BaseClientSideWebpart._renderWithAccessibileTitle,
        // where each webpart can provide contextual info based on its properties:
        // ie. "image of a house" instead of just "image"
        var ariaContextualLabelId = "cswpAccessibleLabelContextual_" + id;
        // Have to provide multiple IDs because IE doesn't care for aria-describedBy on DIVs
        var ariaLabelledBy;
        if (controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_8__["CanvasControlType"].WebPartZone) {
            // Want additional listed first since it will provide most contextual info
            ariaLabelledBy = ariaContextualLabelId;
        }
        else if (controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_8__["CanvasControlType"].RTE) {
            accessibleLabel =
                _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__["StringHelper"].format(_loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_13__["default"].CanvasZoneAriaWebpartName || '', _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_13__["default"].TextWebPartDisplayName || '') || '';
            // No contextual info available for text
            ariaLabelledBy = ariaPrimaryLabelById;
        }
        if (displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit) {
            accessibleLabel =
                _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_6__["StringHelper"].format(_loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_13__["default"].AriaWebPartOrSectionEnterTemplate || '', accessibleLabel, _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_13__["default"].WebPartAriaLabel) || '';
            if (controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_8__["CanvasControlType"].WebPartZone) {
                ariaLabelledBy += " " + ariaPrimaryLabelById;
            }
        }
        // If scroll animations are enabled we load the web parts hidden and then override the style when they are in view
        var shouldHideZone = _canvasAnimations__WEBPACK_IMPORTED_MODULE_9__["CanvasRevealObserver"].isAvailable() && _canvasControl__WEBPACK_IMPORTED_MODULE_8__["CanvasControlType"].RTE === controlType && _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Read === displayMode;
        var shouldShowOverLay = ControlZone._isCleanSelectionModel && !isReadMode && !isSelected && ControlZone.isWebPartOverlayNeeded(control);
        var controlZoneEmphasisBackgroundClass = _ControlZone_styles__WEBPACK_IMPORTED_MODULE_12__["ControlZoneStyles"].getEmphasisBackgroundClass({
            root: 'ControlZone--emphasis',
            theme: emphasisTheme || theme || Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["getTheme"])(),
            shouldShowNewStyles: this._isHoverStateFlightOnAndBorderDraggableKSOff
        });
        var emphasisBackgroundClassName = controlZoneEmphasisBackgroundClass.emphasisBackground;
        var emphasisSelectedClassName = controlZoneEmphasisBackgroundClass.selected;
        var isBackgroundEmphasisNeeded = Boolean(emphasisTheme &&
            !(control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_8__["CanvasControlType"].RTE ||
                ControlZone.isWebPartExemptFromBackground(control.webPartManifest)));
        var zoneClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["css"])('ControlZone', controlZoneEmphasisBackgroundClass.root, (_a = {
                'ControlZone--clean': ControlZone._isCleanSelectionModel,
                'ControlZone--edit': !isReadMode,
                'ControlZone--selected': isSelected,
                'Canvas-slideUpIn': isReadMode && this.state.isVisible,
                'ControlZone--overlay': shouldShowOverLay,
                'ControlZone--move': this._isHoverStateFlightOnAndBorderDraggableKSOff &&
                    shouldShowOverLay
            },
            _a[emphasisSelectedClassName] = isSelected,
            _a));
        return (
        /* tslint:disable-next-line:react-a11y-event-has-role */
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { "aria-labelledby": isReadMode ? undefined : ariaLabelledBy, className: zoneClassName, "data-automation-id": 'ControlZone', "data-drag-tag": _editChunk__WEBPACK_IMPORTED_MODULE_10__["CanvasDragZoneConstants"].controlZoneDragTag, "data-drag-disallowed-tag": ControlZone._getDragDisallowedAttribute(control), "data-sp-a11y-id": Object(_a11y_CanvasA11yConstants__WEBPACK_IMPORTED_MODULE_7__["getControlZoneA11yId"])(id), onClickCapture: !isReadMode && ControlZone._isCleanSelectionModel ? this._handleClickCapture : undefined, onFocus: !isReadMode && ControlZone._isCleanSelectionModel ? this._handleControlFocus : undefined, onMouseOut: this._handleMouseOut, onMouseOver: this._handleMouseOver, ref: function (ref) { return (_this._domElement = ref); }, style: shouldHideZone ? { opacity: 0 } : undefined, tabIndex: isReadMode ? undefined : 0 },
            this._isHoverStateFlightOnAndBorderDraggableKSOff &&
                shouldShowOverLay &&
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { "data-drag-handle": _editChunk__WEBPACK_IMPORTED_MODULE_10__["CanvasDragZoneConstants"].webPartInsideDragHandleTag }),
            !isReadMode &&
                this._isHoverStateFlightOnAndBorderDraggableKSOff &&
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["css"])('ControlZone-drag', {
                        'ControlZone--drag-show': isSelected,
                        'ControlZone--drag-hide': !isSelected
                    }), "data-drag-handle": _editChunk__WEBPACK_IMPORTED_MODULE_10__["CanvasDragZoneConstants"].webPartBorderDragHandleTag, role: 'presentation' }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { ref: function (ref) { return (_this._toolbarElement = ref); } }, children[1]),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["css"])((_b = {},
                    // Pull KS from the map above result in web part emphasis background
                    _b[emphasisBackgroundClassName] = isBackgroundEmphasisNeeded,
                    _b['ControlZone--position'] = this._isHoverStateFlightOnAndBorderDraggableKSOff,
                    _b)) },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: 'ControlZone-control', onClickCapture: !isReadMode && !ControlZone._isCleanSelectionModel ? this._handleClickCapture : undefined, onFocus: !isReadMode && !ControlZone._isCleanSelectionModel ? this._handleControlFocus : undefined, ref: function (ref) { return (_this._childControlElement = ref); }, "data-sp-a11y-checker-user-controllable": true }, children[0]),
                // which only provide view mode
                displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { id: ariaPrimaryLabelById, className: 'ControlZone-screenReaderOnly', "aria-hidden": true }, accessibleLabel))),
            this._diffIndicator));
    };
    Object.defineProperty(ControlZone.prototype, "_diffIndicator", {
        get: function () {
            var _a = this.props, control = _a.control, controlDiff = _a.controlDiff, emphasisTheme = _a.emphasisTheme, store = _a.store, theme = _a.theme;
            return _common_Flights__WEBPACK_IMPORTED_MODULE_14__["Flights"].isPageVersionEnabled() && controlDiff && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editChunk__WEBPACK_IMPORTED_MODULE_10__["DeferredControlDiffIndicator"], { theme: emphasisTheme || theme, controlDiff: controlDiff, control: control, store: store }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @ readOnly
     */
    ControlZone._VERTICAL_MARGIN = 22;
    ControlZone._emphasisWebPartManifestKillSwitchMap = new Map([
        // Bing Maps
        ['e377ea37-9047-43b9-8cdb-a761be2f8e09', '99038c4d-3300-4a01-8e35-a1af0c5ff5d9'],
        // Code Snippet
        ['7b317bca-c919-4982-af2f-8399173e5a1e', 'c9a7ac88-1557-48ee-998f-55435543a47b'],
        // Content Embed
        ['490d7c76-1824-45b2-9de3-676421c997fa', '47031505-fe44-4f9e-8aef-e7cb03d5468d'],
        // Countdown
        ['62cac389-787f-495d-beca-e11786162ef4', 'e72d01a8-5a24-4f09-abe9-ef7fe0002f8a'],
        // Divider
        ['2161a1c6-db61-4731-b97c-3cdb303f7cbb', '3624ff7b-36a8-421c-b999-6ad8b8d202df'],
        // Document Embed
        ['b7dd04e1-19ce-4b24-9132-b60a1c2b910d', 'b830d732-4977-4ba3-a62a-9686bf0cd2ce'],
        // Document Library
        ['f92bf067-bc19-489e-a556-7fe95f508720', '809074d6-218a-4e7c-8ce9-f3a47efcf880'],
        // Events
        ['20745d7d-8581-4a6c-bf26-68279bc123fc', '68743607-03a0-4250-8a2c-09a408ce7a58'],
        // Hero
        ['c4bd7b2f-7b6e-4599-8485-16504575f590', '1edbd9a8-0bfb-4aa2-9afd-14b8c45dd489'],
        // Highlighted Content
        ['daf0b71c-6de8-4ef7-b511-faae7c388708', '4983b01a-9d6d-4173-afd8-bae31b425adb'],
        // Image
        ['d1d91016-032f-456d-98a4-721247c305e8', '1633c14e-9a75-4211-bc80-ab989e6d4381'],
        // Image Gallery
        ['af8be689-990e-492a-81f7-ba3e4cd3ed9c', '58cbf27f-f17b-4e62-b763-eccc34d01a89'],
        // Link Preview
        ['6410b3b6-d440-4663-8744-378976dc041e', '3ef89e3f-3bd5-4c67-bf22-83b98b60acd1'],
        // Kindle Preview
        ['46698648-fcd5-41fc-9526-c7f7b2ace919', 'c9813cb2-7737-41d1-b4a3-1c02c3d4dba3'],
        // News
        ['8c88f208-6c77-4bdb-86a0-0c47b4316588', '77ad9908-2f19-4248-a668-e8bd5f3edb69'],
        // Office 365 video
        ['275c0095-a77e-4f6d-a2a0-6a7626911518', '79e8556f-8b93-4778-b3ee-da59684d641c'],
        // People
        ['7f718435-ee4d-431c-bdbf-9c4ff326f46e', '61b44e6e-86c0-4081-bcb6-d1b282f4b057'],
        // Quick Links
        ['c70391ea-0b10-4ee9-b2b4-006d3fcad0cd', 'dbf7f823-4030-47b2-a4ca-27218fde6433'],
        // Recent Documents
        ['b519c4f1-5cf7-4586-a678-2f1c62cc175a', 'd6b4ad1d-29a5-42c3-a7d2-b30e4f2533dc'],
        // Spacer
        ['8654b779-4886-46d4-8ffb-b5ed960ee986', '4ec8bfdb-619a-4933-a21f-a23ae3f32e36'],
        // Sites
        ['7cba020c-5ccb-42e8-b6fc-75b3149aba7b', 'd8489a68-6b60-4842-b391-28cc54355a95'],
        // SpOfficeFeedWebPart
        ['2f3b693c-1054-419c-af04-fee2782b414f', '5dc4f907-74ff-41a3-b3ad-96356f683ffb'],
        // Twitter
        ['f6fdf4f8-4a24-437b-a127-32e66a5dd9b4', '8fa3eab4-b9e5-4d02-a7a9-740a7c877717'],
        // Weather
        ['868ac3c3-cad7-4bd6-9a1c-14dc5cc8e823', '07042024-6fab-4ec4-a074-fa3ff5570f95'],
        // World Clock
        ['81b57906-cbed-4bb1-9823-2e3314f46f28', '14133cda-b276-492a-9b00-61b870c56a13'],
        // Youtube HTML Embed
        ['544dd15b-cf3c-441b-96da-004d5a8cea1d', '1979dc1a-1b86-452e-86ec-483dbd2ab3b8']
    ]);
    return ControlZone;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));



/***/ }),

/***/ "EZnn":
/*!*********************************************************!*\
  !*** ./lib/sp-canvas/canvas/webPartZone/WebPartZone.js ***!
  \*********************************************************/
/*! exports provided: WebPartZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebPartZone", function() { return WebPartZone; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-component-base */ "7Awa");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ms/sp-a11y */ "ytfe");
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _controlZone__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../controlZone */ "QfGm");
/* harmony import */ var _canvasAnimations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../canvasAnimations */ "fqJ2");
/* harmony import */ var _WebPartReservedHeight__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./WebPartReservedHeight */ "vP/3");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../common/Flights */ "qRiB");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../common/KillSwitches */ "17t3");
/* harmony import */ var _shouldFallbackSetWebPartData__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shouldFallbackSetWebPartData */ "NhzL");
/**
 * @file WebPartZone.ts
 * @copyright (c) Microsoft Corporation. All rights reserved.
 */
















var LOADWEBPARTTIME_MARKER = 'spLoadWebPartTime';
var WebPartZone = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WebPartZone, _super);
    function WebPartZone(props) {
        var _this = _super.call(this, props) || this;
        _this.handleConfigureButtonClicked = function (shouldToggle) {
            /**
             * Using _isLoaded flag instead of the promise because we want a click on the configure button to
             * no-op. If we had used a promise, the web part selection could have shifted by the time the
             * loading is complete and thus incorrectly change the context of the property pane. A no-op makes
             * sense because the web part would have no UI rendered yet, and the framework indicates the web part
             * is still in the process of loading.
             */
            if (_this._isLoaded && _this.props.store.webPartManager) {
                // Since it is a web part, we go through webpartmanager even though we have direct access to the
                // property pane controller, as in the case of isolated web parts, web part manager knows how to deal
                // with it.
                _this.props.store.webPartManager.requestPropertyPaneAction(_this.instanceId, shouldToggle ? 3 /* Toggle */ : 1 /* Open */);
            }
        };
        _this.scrollIntoView = function (options) {
            if (_this._webPartDiv) {
                _this._webPartDiv.scrollIntoView(options);
                return true;
            }
            return false;
        };
        _this._reloadWebPart = function (shouldDispose) {
            var store = _this.props.store;
            return _this._loadWebPartPromise = _this._loadWebPartPromise
                .then(function () { return new Promise(function (resolve) {
                if (shouldDispose && _this._webPartDiv) {
                    react_dom__WEBPACK_IMPORTED_MODULE_2__["unmountComponentAtNode"](_this._webPartDiv);
                    // unmountComponentAtNode is supposed to be synchronous. However, it's behaved as asynchronous in React 16.
                    // see https://github.com/facebook/react/issues/13690 for more information.
                    // This is workaround to avoid console warnings caused by DOM manipulation (by loadWebPart API)
                    //  while unmounting React node.
                    setTimeout(function () { return resolve(); });
                }
                else {
                    resolve();
                }
            }); })
                .then(function () { return _this._webPartManager.setWebPartData(_this._webPartManagerContext, _this.instanceId, shouldDispose); })
                .then(function () {
                store.selectedControlId = _this.instanceId;
            });
        };
        _this._loadWebPart = function () {
            var store = _this.props.store;
            var _a = _this.props.control, addedFromPersistedData = _a.addedFromPersistedData, id = _a.id;
            var context = _this._webPartManagerContext;
            var loadPartQos = store.createQosScope("WebPartZone.LoadWebPart");
            return _this._loadWebPartPromise = _this._webPartManager.loadWebPart(context).then(function () {
                loadPartQos.writeSuccess();
                try {
                    var handleWebPartChanged = store.handleWebPartChanged, propertyPaneController = store.propertyPaneController, selectedControlId = store.selectedControlId;
                    if (_this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__["DisplayMode"].Edit && id === selectedControlId && propertyPaneController) {
                        propertyPaneController.requestAction(id);
                    }
                    _this._isLoaded = true;
                    if (_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled() && !addedFromPersistedData) {
                        // Trigger serialization of the web part data and notify the changes when newly added web part is loaded.
                        // When web part is added to the canvas, the `addedFromPersistedData` flag is false, and the data is not
                        // serialized by the spfx framework. We want to specifically serialize and track the serialized data which
                        // contains serverProcessedData and so on. Otherwise, tracking the un-serialized data will trigger
                        // unnecessary update when this un-serialized data is used to
                        // update the web part data in undo-redo scenario.
                        handleWebPartChanged(id);
                    }
                }
                catch (err) {
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logError(WebPartZone._logSource, err, 'didMount.set');
                }
            }, function (error) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logError(WebPartZone._logSource, error, 'didMount.load');
                loadPartQos.writeUnexpectedFailure('Rejected', error);
            }).catch(function (error) { return loadPartQos.writeUnexpectedFailure('Unexpected Error', error); });
        };
        /**
         * @see IWebPartManagerContext
         */
        _this._onViewportWebPartsRendered = function (endTime) {
            _this.props.store.onViewportWebPartsRendered(endTime);
        };
        /**
        * @see IWebPartManagerContext
        */
        _this._onAllWebPartsRendered = function (endTime) {
            _this.props.store.onAllWebPartsRendered(endTime);
        };
        var _a = _this.props.store, serviceScope = _a.serviceScope, webPartManager = _a.webPartManager;
        var _b = _this.props.control, emphasisTheme = _b.emphasisTheme, theme = _b.theme, webPartData = _b.webPartData, webPartManifest = _b.webPartManifest;
        _this._webPartManager = webPartManager;
        _this._childScope = serviceScope.startNewChild();
        var providedTheme = emphasisTheme;
        if (!_controlZone__WEBPACK_IMPORTED_MODULE_9__["ControlZone"].isWebPartExemptFromBackground(webPartManifest) || !emphasisTheme) {
            providedTheme = theme;
        }
        // Theme should never be case to 'any' which means a breaking change.
        // Casting to ISPTheme here to workaround a typing mismatch issue caused by API extractor.
        _this._themeProvider = new _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_5__["ThemeProvider"](_this._childScope, providedTheme);
        _this._childScope.provide(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_5__["ThemeProvider"].serviceKey, _this._themeProvider);
        _this._childScope.finish();
        _this._latestWebPartData = webPartData;
        _this.state = {
            displayMode: props.displayMode,
            isVisible: false,
            shouldSetMinHeight: props.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__["DisplayMode"].Read
        };
        return _this;
    }
    WebPartZone.getDerivedStateFromProps = function (props, state) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { 
            // Once page enters into edit mode, we should not set min height any more which might preserve blank spaces
            // If the web part content is changed.
            shouldSetMinHeight: state.shouldSetMinHeight && props.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__["DisplayMode"].Read });
    };
    // @todo This is a workaround for deserialization of a Canvas without the manifests.
    // We need to think about a longer term solution.
    WebPartZone.prototype.componentDidMount = function () {
        // Attach the observer before we load so the spinner or shimmer will reveal
        this._reveal();
        var performanceLogger = this.props.store.canvasFields.canvasPerformanceLogger;
        var startTime = 0;
        if (performanceLogger) {
            startTime = performanceLogger.now();
        }
        void this._loadWebPart();
        if (performanceLogger) {
            // Measure total sync cost occurred loading webparts in canvas
            performanceLogger.setPerformanceProperty(LOADWEBPARTTIME_MARKER, performanceLogger.now() - startTime, true);
        }
    };
    WebPartZone.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.displayMode !== this.props.displayMode) {
            this._reveal();
        }
        var store = this.props.store;
        var _a = this.props.control, webPartData = _a.webPartData, webPartManifest = _a.webPartManifest;
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled() &&
            (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_13__["KillSwitches"].updateWebPartZoneInReadMode.isActivated() || store.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__["DisplayMode"].Edit) &&
            !Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_7__["isEqual"])(this._latestWebPartData, webPartData)) {
            this._latestWebPartData = webPartData;
            var shouldFallback = Object(_shouldFallbackSetWebPartData__WEBPACK_IMPORTED_MODULE_14__["shouldFallbackSetWebPartData"])(webPartManifest);
            void this._reloadWebPart(shouldFallback);
        }
    };
    WebPartZone.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        if (this._themeProvider) {
            var prevControl = this.props.control;
            var newControl = nextProps.control;
            if (!_controlZone__WEBPACK_IMPORTED_MODULE_9__["ControlZone"].isWebPartExemptFromBackground(prevControl.webPartManifest) || !newControl.emphasisTheme) {
                if (newControl.theme) {
                    // Theme should never be case to 'any' which means a breaking change.
                    // Casting to ISPTheme here to workaround a typing mismatch issue caused by API extractor.
                    this._themeProvider._setTheme(newControl.theme);
                }
            }
            else if (!Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_7__["isEqual"])(prevControl.emphasisTheme, newControl.emphasisTheme)) {
                // Theme should never be case to 'any' which means a breaking change.
                // Casting to ISPTheme here to workaround a typing mismatch issue caused by API extractor.
                this._themeProvider._setTheme(newControl.emphasisTheme);
            }
        }
        if (!_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled()) {
            if (_canvasAnimations__WEBPACK_IMPORTED_MODULE_10__["CanvasRevealObserver"].isAvailable()) {
                /*
                * Experiment on re-rendering the web part zone. If there are side effects
                * then we will need to wrap the WebPartZone in a reveal component.
                */
                return this.props.displayMode !== nextProps.displayMode || this.state.isVisible !== nextState.isVisible;
            }
            else {
                // Defer all updating to the web part manager and the web part
                return false;
            }
        }
        else {
            // With undo-redo, web part zone can update itself now by reloading the web part.
            return true;
        }
    };
    WebPartZone.prototype.render = function () {
        var _this = this;
        var isReadMode = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__["DisplayMode"].Read === this.props.displayMode;
        var shouldHideZone = _canvasAnimations__WEBPACK_IMPORTED_MODULE_10__["CanvasRevealObserver"].isAvailable() && isReadMode;
        var revealDivCss = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["css"])({
            'Canvas-slideUpIn': isReadMode && this.state.isVisible
        });
        var _a = this.props, control = _a.control, store = _a.store;
        var position = control.position, reservedHeight = control.reservedHeight, webPartData = control.webPartData, webPartId = control.webPartId, webPartManifest = control.webPartManifest;
        var shouldSetMinHeight = this.state.shouldSetMinHeight;
        // This minHeight style will be later removed by BaseClientSideWebPart.
        // See more documentation at WebPartReservedHeight.ts
        var minHeight = undefined;
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled()) {
            if (shouldSetMinHeight) {
                minHeight = _WebPartReservedHeight__WEBPACK_IMPORTED_MODULE_11__["WebPartReservedHeight"].getReservedHeight(control, store.isMobileBrowser);
            }
        }
        else {
            if (reservedHeight) {
                minHeight = reservedHeight + "px";
            }
            else if (shouldSetMinHeight &&
                webPartManifest &&
                webPartManifest.isInternal) {
                var columnType = 12 /* Full */;
                if (store.isMobileBrowser) {
                    columnType = 4 /* Third */;
                }
                else if (position.sectionFactor) {
                    columnType = position.sectionFactor;
                }
                var serializedHeight = _WebPartReservedHeight__WEBPACK_IMPORTED_MODULE_11__["WebPartReservedHeight"].getDefaultReservedHeight(webPartId, columnType);
                if (serializedHeight) {
                    minHeight = serializedHeight + "px";
                }
            }
        }
        var featureTag = webPartManifest && webPartData
            ? webPartManifest.alias + " web part (" + webPartData.title + ")"
            : undefined;
        var featureInstanceId = webPartData
            ? webPartData.instanceId
            : undefined;
        var webPartDiv = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { ref: function (htmlElement) { return _this._webPartDiv = htmlElement; }, style: {
                minHeight: minHeight,
                width: '100%'
            } }));
        if (_canvasAnimations__WEBPACK_IMPORTED_MODULE_10__["CanvasRevealObserver"].isAvailable()) {
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: revealDivCss, ref: function (elem) { return _this._revealDiv = elem; }, style: shouldHideZone ? { opacity: 0 } : undefined, "data-sp-feature-tag": featureTag, "data-sp-feature-instance-id": featureInstanceId }, webPartDiv));
        }
        else {
            return webPartDiv;
        }
    };
    WebPartZone.prototype.componentWillUnmount = function () {
        // The web part is loaded and initialized at `componentDidMount` of WebPartZone. So it's better
        // to be disposed at `componentWillUnmount` to keep the init-dispose loop inside same one react life cycle.
        this._webPartManager.disposeWebparts(this.instanceId);
        if (!this._webPartDiv) {
            return;
        }
        var didUnmount = react_dom__WEBPACK_IMPORTED_MODULE_2__["unmountComponentAtNode"](this._webPartDiv);
        this._webPartDiv = undefined;
        var logEntry = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_LogEntry"](WebPartZone._logSource.id, 'TryUnmountReactComponent', _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_LogType"].Event, {
            didUnmount: didUnmount.toString()
        });
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_EngagementLogger"].logEventWithLogEntry(logEntry);
        if (_canvasAnimations__WEBPACK_IMPORTED_MODULE_10__["CanvasRevealObserver"].isAvailable() && this._revealDiv) {
            this.props.store.revealObserver.unobserve(this._revealDiv);
        }
    };
    Object.defineProperty(WebPartZone.prototype, "instanceId", {
        get: function () {
            return this.props.control.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebPartZone.prototype, "isFocusable", {
        get: function () {
            return Boolean(this._webPartDiv && _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_8__["Focus"].getFirstFocusableChild(this._webPartDiv));
        },
        enumerable: true,
        configurable: true
    });
    WebPartZone.prototype.focus = function () {
        if (this._webPartDiv && !this.props.store.a11yManager.focusInside(this._webPartDiv)) {
            this.props.store.a11yManager.focusOutOf(this._webPartDiv);
        }
    };
    /**
     * @deprecated - It should be removed then PageUndoRedo flight is graduated.
     */
    WebPartZone.prototype.handleDeleteButtonClicked = function () {
        var _this = this;
        /**
         * If a web part was still in the process of loading and then the zone is deleted from the Canvas,
         * we still want to ensure the web part manager cleans up its references and disposes the web part.
         * Note: Using 'void' here to indicate that we are not interested in the returned value.
         */
        void this._loadWebPartPromise.then(function () { return _this._webPartManager.onWebPartDelete(_this.instanceId); });
    };
    WebPartZone.prototype.serialize = function () {
        /**
         * If the web part has not loaded, we can safely return the web part data we are trying to load with because
         * the data could not have been modified.
         */
        var webPartData = this._isLoaded
            ? this._webPartManager.serialize(this.instanceId).get(this.instanceId)
            : this.props.control.webPartData;
        var serialization = JSON.parse(JSON.stringify(this.props.control));
        serialization.webPartData = webPartData;
        if (this._webPartDiv &&
            (!_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled() || !Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_7__["isEqual"])(webPartData, this._latestWebPartData))) {
            serialization.reservedHeight = this._webPartDiv.clientHeight;
            serialization.reservedWidth = this._webPartDiv.clientWidth;
        }
        this._latestWebPartData = serialization.webPartData;
        return serialization;
    };
    WebPartZone.prototype.setDisplayMode = function (newDisplayMode) {
        var _this = this;
        var _a = this.props.control, webPartId = _a.webPartId, webPartManifest = _a.webPartManifest;
        this.setState({
            displayMode: newDisplayMode
        });
        // There is an improvement under undo-redo flight where web parts will no longer be disposed and reloaded when
        // the display mode is switched. This is the ideal rendering model but would break the web part rendering if
        // the web part has the assumption that web part will always be reloaded when display mode is switched.
        // The code below makes sure:
        // 1. For 1st part web parts, it's always opt-in the improved model thus it will not be reloaded when display mode
        //  is switched.
        // 2. For 3rd part web parts, it will only opt-in the improved model when the web part integrates undo-redo through
        //  the manifest flag "useFallbackWhenPropertiesUpdatedExternally". Once web part developers decides to opt-in undo-
        //  redo, they will be able to uncover the rendering issue (if there is one) and upgrade to the desired behavior
        //  which will avoid reloading the web part.
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled() &&
            this.state.displayMode !== newDisplayMode) {
            var shouldFallback = webPartManifest.isInternal
                ? false
                : Object(_shouldFallbackSetWebPartData__WEBPACK_IMPORTED_MODULE_14__["shouldFallbackSetWebPartData"])(webPartManifest);
            if (shouldFallback) {
                // Return as we will dispose and reload the web part, so there is no need to call the `setDisplayMode` API.
                return this._reloadWebPart(true /* shouldDispose */);
            }
        }
        var qos = this.props.store.createQosScope("SetWebPartDisplayModeTo" + newDisplayMode);
        var qosData = {
            alias: webPartManifest && webPartManifest.alias,
            webPartId: webPartId
        };
        var errorLogger = function (error, tag) {
            if (webPartManifest && webPartManifest.isInternal) {
                qos.writeUnexpectedFailure(tag, error, qosData);
            }
            else {
                qos.writeExpectedFailure(tag + "External", error, qosData);
            }
        };
        /**
         * The Canvas zone will switch mode, and then wait for the web part to fully render before asking
         * the web part manager to switch the mode of the web part.
         */
        return this._loadWebPartPromise
            .then(function () {
            _this._webPartManager.setDisplayMode(newDisplayMode, _this.instanceId);
            qos.writeSuccess();
        }, function (error) { return errorLogger(error, 'Rejected'); })
            .catch(function (error) { return errorLogger(error, 'AfterLoadCatchAll'); });
    };
    Object.defineProperty(WebPartZone.prototype, "_webPartManagerContext", {
        get: function () {
            var store = this.props.store;
            var pageContext = store.pageContext;
            var _a = this.props.control, addedFromPersistedData = _a.addedFromPersistedData, position = _a.position, reservedHeight = _a.reservedHeight, webPartData = _a.webPartData, webPartManifest = _a.webPartManifest;
            var displayMode = this.props.displayMode;
            return {
                domElement: this._webPartDiv,
                scrollableParent: store.scrollableParent,
                instanceId: this.instanceId,
                manifest: webPartManifest,
                displayMode: displayMode,
                webPartData: _common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled() ? Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_7__["cloneDeep"])(webPartData) : webPartData,
                webpartLoadExtraLogInfo: {
                    environmentType: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__["EnvironmentType"][_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__["Environment"].type],
                    siteType: pageContext && pageContext.web ? pageContext.web.templateName : '',
                    pageLayoutType: store.pageLayoutType,
                    columnType: position && position.sectionFactor ? position.sectionFactor.toString() : '',
                    displayMode: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__["DisplayMode"][store.displayMode],
                    webPartContainer: 'WebPartZone'
                },
                addedFromPersistedData: addedFromPersistedData,
                onViewportWebPartsRendered: this._onViewportWebPartsRendered,
                totalWebparts: store.webPartsCount,
                serviceScope: this._childScope,
                onAllWebPartsRendered: _common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isAnchorFlightEnabled() ? this._onAllWebPartsRendered : undefined,
                reservedHeight: reservedHeight
            };
        },
        enumerable: true,
        configurable: true
    });
    WebPartZone.prototype._reveal = function () {
        var _this = this;
        if (_canvasAnimations__WEBPACK_IMPORTED_MODULE_10__["CanvasRevealObserver"].isAvailable() && this.props.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__["DisplayMode"].Read && this._revealDiv) {
            this.props.store.revealObserver.observe(this._revealDiv, function (entry, observer) {
                _this.setState({ isVisible: true });
                observer.unobserve(entry.target);
            });
        }
    };
    WebPartZone.webPartManagerInitialized = false;
    WebPartZone._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_LogSource"].create('WebPartZone');
    return WebPartZone;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));



/***/ }),

/***/ "I6O9":
/*!***************************************!*\
  !*** external "@microsoft/sp-loader" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_I6O9__;

/***/ }),

/***/ "IGr+":
/*!******************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasSection/CanvasSection.resx.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_EJ1q3VoG+8ZXJZ4MxzV0eA';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "IGxH":
/*!*************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasStore/CanvasWebPartClassification.js ***!
  \*************************************************************************/
/*! exports provided: EUPL_APPROVED_WEB_PARTS, EUPL_CANDIDATE_WEB_PARTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EUPL_APPROVED_WEB_PARTS", function() { return EUPL_APPROVED_WEB_PARTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EUPL_CANDIDATE_WEB_PARTS", function() { return EUPL_CANDIDATE_WEB_PARTS; });
/**
 * This contains First tier of the first party performance approved web parts. These are most perofmrnace critical
 * baseline tracked as out of the box experience we provide to the end customer.
 */
var EUPL_APPROVED_WEB_PARTS = new Set([
    '20745d7d-8581-4a6c-bf26-68279bc123fc',
    'd1d91016-032f-456d-98a4-721247c305e8',
    'af8be689-990e-492a-81f7-ba3e4cd3ed9c',
    'c4bd7b2f-7b6e-4599-8485-16504575f590',
    '8c88f208-6c77-4bdb-86a0-0c47b4316588',
    'a5df8fdf-b508-4b66-98a6-d83bc2597f63',
    '0ef418ba-5d19-4ade-9db0-b339873291d0',
    '7f718435-ee4d-431c-bdbf-9c4ff326f46e',
    'c70391ea-0b10-4ee9-b2b4-006d3fcad0cd' // QuickLinksWebPart
]);
/**
 * These are candidates for first tier but haven't been optimized fully for performance
 * TODO: Collect Information for Perf pipeline
 */
var EUPL_CANDIDATE_WEB_PARTS = new Set([
    'eb95c819-ab8f-4689-bd03-0c2d65d47b1f',
    'daf0b71c-6de8-4ef7-b511-faae7c388708',
    '6676088b-e28e-4a90-b9cb-d0d0303cd2eb' // GroupCalendarWebPart
]);


/***/ }),

/***/ "JqQl":
/*!*****************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasSection/index.js ***!
  \*****************************************************/
/*! exports provided: EmptyCanvasSection, CanvasFullWidthSection, CanvasSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EmptyCanvasSection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EmptyCanvasSection */ "0/FH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmptyCanvasSection", function() { return _EmptyCanvasSection__WEBPACK_IMPORTED_MODULE_0__["EmptyCanvasSection"]; });

/* harmony import */ var _CanvasFullWidthSection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasFullWidthSection */ "K4PZ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasFullWidthSection", function() { return _CanvasFullWidthSection__WEBPACK_IMPORTED_MODULE_1__["CanvasFullWidthSection"]; });

/* harmony import */ var _CanvasSection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CanvasSection */ "5Nkd");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasSection", function() { return _CanvasSection__WEBPACK_IMPORTED_MODULE_2__["CanvasSection"]; });






/***/ }),

/***/ "K08d":
/*!*************************************************!*\
  !*** ./lib/sp-canvas/loc/CanvasStrings.resx.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_jP9TaPNRkCXWU4OplNcN+w';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "K4PZ":
/*!**********************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasSection/CanvasFullWidthSection.js ***!
  \**********************************************************************/
/*! exports provided: CanvasFullWidthSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasFullWidthSection", function() { return CanvasFullWidthSection; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CanvasSection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CanvasSection */ "5Nkd");
/* harmony import */ var _CanvasSection_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CanvasSection.scss */ "v3Ow");
/* harmony import */ var _canvasControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../canvasControl */ "iO6m");
/* harmony import */ var _editChunk__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../editChunk */ "9s5w");
/**
 * @file CanvasFullWidthSection.ts
 * @copyright (c) Microsoft Corporation. All rights reserved.
 */









var FULL_WIDTH_ITEM_IDS = [
    'd1d91016-032f-456d-98a4-721247c305e8',
    'c4bd7b2f-7b6e-4599-8485-16504575f590' // Hero
];
/**
 * Represents a full width section layout component
 */
var CanvasFullWidthSection = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CanvasFullWidthSection, _super);
    function CanvasFullWidthSection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._toolboxItems = [];
        return _this;
    }
    CanvasFullWidthSection.isFullWidth = function (position) {
        return position && position.sectionFactor === 0;
    };
    CanvasFullWidthSection.isFullWidthControl = function (control) {
        if (control && control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_6__["CanvasControlType"].WebPartZone) {
            // @todo [VSO:SPPPlat] #345537 Full bleed and hide in toolbox props missing from server.
            // Remove the web part id check from here when it works.
            return ((control.webPartManifest && control.webPartManifest.supportsFullBleed) ||
                FULL_WIDTH_ITEM_IDS.indexOf(control.webPartId) !== -1);
        }
        return false;
    };
    CanvasFullWidthSection.setFullWidthWebPartProperty = function (control, value) {
        // For full width, we need to set an extra property
        if (control.webPartData) {
            control.webPartData.properties.isFullWidth = value;
        }
    };
    CanvasFullWidthSection.prototype.componentDidMount = function () {
        if (this.props.store.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Edit) {
            this._openToolbox();
        }
    };
    CanvasFullWidthSection.prototype.componentDidUpdate = function () {
        var store = this.props.store;
        if (store.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Edit && !this._isToolboxOpen) {
            this._openToolbox();
        }
        else if (store.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Read) {
            this._isToolboxOpen = false;
        }
    };
    CanvasFullWidthSection.prototype._addToolBoxHint = function (nextCtrlPosition) {
        /**
         * Don't need to add toolbox hint
         */
    };
    CanvasFullWidthSection.prototype._getLayoutSectionClassName = function (isReadMode, isSectionSelected) {
        var layoutSectionClassName = _super.prototype._getLayoutSectionClassName.call(this, isReadMode, isSectionSelected);
        layoutSectionClassName += Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])({
            ' CanvasSectionFullWidth--read': isReadMode,
            ' CanvasSection--fullWidth': this.props.section.controls.length !== 0
        });
        return layoutSectionClassName;
    };
    CanvasFullWidthSection.prototype._shouldCenterAlignHint = function () {
        var store = this.props.store;
        return store.shouldCenterAlign;
    };
    CanvasFullWidthSection.prototype._getContentSelectionMechanism = function (firstControlLayout) {
        var store = this.props.store;
        return (this.props.section.controls.length === 0 &&
            store.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Edit && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editChunk__WEBPACK_IMPORTED_MODULE_7__["DeferredToolboxFullBleedComponent"], { items: this._toolboxItems, clickItem: function (control) { return store.addControlToCanvas(control, true /* shouldRender */); } })));
    };
    Object.defineProperty(CanvasFullWidthSection.prototype, "_dragDisallowedAreaTag", {
        get: function () {
            return _editChunk__WEBPACK_IMPORTED_MODULE_7__["CanvasDragZoneConstants"].fullWidthSectionTag;
        },
        enumerable: true,
        configurable: true
    });
    CanvasFullWidthSection.prototype._openToolbox = function () {
        this._isToolboxOpen = true;
        var _a = this.props, zoneIndex = _a.zoneIndex, section = _a.section, layoutIndex = _a.layoutIndex;
        var firstControlLayout = {
            zoneIndex: zoneIndex,
            sectionIndex: section.index,
            controlIndex: this._firstControlIdx,
            sectionFactor: section.factor,
            layoutIndex: layoutIndex
        };
        try {
            // Open full width toolbox on render
            this._openFullWidthToolbox(firstControlLayout);
        }
        catch (error) {
            // TODO#671414 Find a better practice of loading edit actions.
            this._isToolboxOpen = false;
        }
    };
    CanvasFullWidthSection.prototype._openFullWidthToolbox = function (position) {
        var store = this.props.store;
        this._toolboxItems = store.getToolboxItems("FullWidth" /* FullWidth */, position);
        this.forceUpdate();
    };
    return CanvasFullWidthSection;
}(_CanvasSection__WEBPACK_IMPORTED_MODULE_4__["CanvasSection"]));



/***/ }),

/***/ "KL1q":
/*!***********************************************************!*\
  !*** external "@microsoft/office-ui-fabric-react-bundle" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_KL1q__;

/***/ }),

/***/ "Kw1M":
/*!************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasZone/CanvasZone.scss.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./CanvasZone.css */ "CQTG");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "Lyn5":
/*!****************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasLayout/CanvasSectionPart.js ***!
  \****************************************************************/
/*! exports provided: CanvasSectionPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasSectionPart", function() { return CanvasSectionPart; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CanvasLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CanvasLayout */ "aNx7");
/* harmony import */ var _canvasControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../canvasControl */ "iO6m");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/Flights */ "qRiB");
/**
 * @file CanvasSectionPart.ts
 * @copyright (c) Microsoft Corporation. All rights reserved.
 */





/**
 * Represents the Canvas Section Layout Part
 */
var CanvasSectionPart = /** @class */ (function () {
    /**
     * Creates a new instance of a CanvasSectionPart
     * @param sectionIdx represents the section index
     */
    function CanvasSectionPart(sectionIdx, emphasis, factor) {
        this._index = sectionIdx;
        this._emphasis = emphasis;
        this._factor = factor;
        this._controlsMap = new Map();
    }
    Object.defineProperty(CanvasSectionPart.prototype, "emptySectionControl", {
        get: function () {
            return {
                controlType: undefined,
                id: CanvasSectionPart.emptySectionId,
                position: {
                    zoneIndex: undefined,
                    sectionIndex: this._index,
                    controlIndex: undefined,
                    sectionFactor: this._factor
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasSectionPart.prototype, "factor", {
        /**
         * Gets the section factor.
         * @returns The section factor.
         */
        get: function () {
            return this._factor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasSectionPart.prototype, "index", {
        /**
         * Gets the index associated with this section
         * @returns the section index
         */
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasSectionPart.prototype, "emphasis", {
        get: function () {
            return this._emphasis;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasSectionPart.prototype, "controls", {
        /**
         * Gets the controls associated with the current section
         * @returns the controls in that section
         */
        get: function () {
            var canvasControls = [];
            this._controlsMap.forEach(function (control) {
                canvasControls.push(control);
            });
            return canvasControls.sort(function (ctrl1, ctrl2) {
                return ctrl1.position.controlIndex - ctrl2.position.controlIndex; // Todo#661360 Fix workaround left-over
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a new control in the pertinent section
     * @param control represents the control to add
     * @returns id of control that was added
     */
    CanvasSectionPart.prototype.addControl = function (canvasControl) {
        if (canvasControl.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].WebPartZone ||
            canvasControl.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].RTE) {
            // If the control is undefined or isn't associated with a layout, return
            if (!_CanvasLayout__WEBPACK_IMPORTED_MODULE_2__["CanvasLayout"].isPositionValid(canvasControl.position)) {
                return undefined;
            }
            var curControlIndex = canvasControl.position.controlIndex;
            if (curControlIndex === undefined) {
                // Control index isnt defined, cannot proceed
                return undefined;
            }
            if (!_common_Flights__WEBPACK_IMPORTED_MODULE_4__["Flights"].isPageUndoRedoFlightEnabled() ||
                canvasControl.emphasis === undefined ||
                canvasControl.emphasis.sectionEmphasis !== this._emphasis) {
                // Update control's emphasis if it's not aligned with the section emphasis.
                canvasControl.emphasis = canvasControl.emphasis || {};
                canvasControl.emphasis = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, canvasControl.emphasis, { sectionEmphasis: this._emphasis });
            }
            // Get the pertinent control if available
            var sectionControl = this._controlsMap.get(curControlIndex);
            if (!sectionControl) {
                // This is a new control, add it to the sections
                this._controlsMap.set(curControlIndex, canvasControl);
            }
            else {
                // Attempting to add a new control above an existing control. Regenerate layout
                var layoutControlItems = this.controls.map(function (control) {
                    return {
                        index: control.position.controlIndex // Todo#661360 Fix workaround left-over
                    };
                });
                canvasControl.position = _CanvasLayout__WEBPACK_IMPORTED_MODULE_2__["CanvasLayout"].cloneMerge(canvasControl.position, {
                    zoneIndex: undefined,
                    sectionIndex: undefined,
                    controlIndex: _CanvasLayout__WEBPACK_IMPORTED_MODULE_2__["CanvasLayout"].generateNewLayoutIndex(layoutControlItems, curControlIndex)
                });
                if (canvasControl.position.controlIndex === undefined) {
                    // Could not generate a new index, cannot proceed
                    return undefined;
                }
                // Add the control and update the layout
                this._controlsMap.set(canvasControl.position.controlIndex, canvasControl);
            }
        }
        return canvasControl.id;
    };
    CanvasSectionPart.prototype.updateControl = function (control) {
        var controlIndex = control.position.controlIndex;
        if (controlIndex && !Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(this._controlsMap.get(controlIndex), control)) {
            this._controlsMap.set(controlIndex, control);
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Moves a control inside the section.
     * @param control The control to be moved
     * @param newControlPosition The position where the control will be moved to
     */
    CanvasSectionPart.prototype.moveControl = function (control, newControlPosition) {
        if (!control ||
            control.position.zoneIndex !== newControlPosition.zoneIndex ||
            control.position.sectionIndex !== newControlPosition.sectionIndex) {
            return undefined;
        }
        if (control.position.controlIndex !== undefined) {
            this._controlsMap.delete(control.position.controlIndex);
        }
        var siblingLayoutItems = this.controls.map(function (ctrl) {
            return {
                index: ctrl.position.controlIndex // Todo#661360 Fix workaround left-over
            };
        });
        control.position = _CanvasLayout__WEBPACK_IMPORTED_MODULE_2__["CanvasLayout"].cloneMerge(control.position, {
            // Todo#661360 Fix workaround left-over
            controlIndex: _CanvasLayout__WEBPACK_IMPORTED_MODULE_2__["CanvasLayout"].generateNewLayoutIndex(siblingLayoutItems, newControlPosition.controlIndex)
        });
        // Todo#661360 Fix workaround left-over
        this._controlsMap.set(control.position.controlIndex, control);
        return control.position;
    };
    /**
     * Removes a control
     * @param controlPosition represents the control to remove
     * @returns id of control that was removed
     */
    CanvasSectionPart.prototype.removeControl = function (controlPosition) {
        // If the control is undefined or isn't associated with a layout, return
        if (!controlPosition) {
            return undefined;
        }
        // Remove the control from the designated index
        var control = controlPosition.controlIndex !== undefined
            ? this._controlsMap.get(controlPosition.controlIndex)
            : undefined;
        if (!control) {
            // control not found, return
            return undefined;
        }
        // Remove the control from the layout
        if (control.position.controlIndex !== undefined) {
            this._controlsMap.delete(control.position.controlIndex);
        }
        return control.id;
    };
    /**
     * Fetches a control from the layout
     * @param controlPosition represents the position of the control
     * @returns the underlying control if available in the section
     */
    CanvasSectionPart.prototype.fetchControl = function (controlPosition) {
        // Verify its a valid layout
        if (!controlPosition || controlPosition.controlIndex === undefined) {
            return undefined;
        }
        return this._controlsMap.get(controlPosition.controlIndex);
    };
    /**
     * Fetch all controls that are available in that section
     * @returns all the controls associated with the section
     */
    CanvasSectionPart.prototype.fetchAllControls = function () {
        return this.controls;
    };
    /**
     * Determines if the underlying layout is empty
     * @returns true if the section is empty
     */
    CanvasSectionPart.prototype.isEmpty = function () {
        return this.fetchAllControls().length === 0;
    };
    /**
     * Disposes the section
     */
    CanvasSectionPart.prototype.dispose = function () {
        this._controlsMap.clear();
    };
    /**
     * Change the section factor of the section.
     *
     * @param newFactor - The new section factor.
     */
    CanvasSectionPart.prototype.changeFactor = function (newFactor) {
        this._controlsMap.forEach(function (control) {
            control.position = _CanvasLayout__WEBPACK_IMPORTED_MODULE_2__["CanvasLayout"].cloneMerge(control.position, {
                zoneIndex: undefined,
                sectionIndex: undefined,
                sectionFactor: newFactor,
                controlIndex: undefined,
                layoutIndex: undefined
            });
        });
        this._factor = newFactor;
    };
    /**
     * Change the emphasis of the section.
     *
     * @param emphasis - The new emphasis
     */
    CanvasSectionPart.prototype.changeEmphasis = function (emphasis) {
        this._controlsMap.forEach(function (control) {
            control.emphasis = _CanvasLayout__WEBPACK_IMPORTED_MODULE_2__["CanvasLayout"].cloneMerge(control.emphasis, emphasis);
        });
        this._emphasis = emphasis.sectionEmphasis;
    };
    return CanvasSectionPart;
}());



/***/ }),

/***/ "MCvD":
/*!*************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasDragZone/CanvasDragZone.js ***!
  \*************************************************************************/
/*! exports provided: CanvasDragZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasDragZone", function() { return CanvasDragZone; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_sp_dragzone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/sp-dragzone */ "iiHs");
/* harmony import */ var _ms_sp_dragzone__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_dragzone__WEBPACK_IMPORTED_MODULE_2__);



var CanvasDragZone = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CanvasDragZone, _super);
    function CanvasDragZone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CanvasDragZone.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ms_sp_dragzone__WEBPACK_IMPORTED_MODULE_2__["DragZone"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ isEnabled: this._isEnabled }, this._sectionDragZoneProps),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ms_sp_dragzone__WEBPACK_IMPORTED_MODULE_2__["DragZone"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ isEnabled: this._isEnabled }, this._webPartDragZoneProps), this.props.children)));
    };
    Object.defineProperty(CanvasDragZone.prototype, "_sectionDragZoneProps", {
        get: function () {
            var editModule = this.props.editModule;
            return this._isEditModuleEnabled(editModule)
                ? editModule.sectionDragZoneUtils.getDragZoneProps()
                : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasDragZone.prototype, "_webPartDragZoneProps", {
        get: function () {
            var editModule = this.props.editModule;
            return this._isEditModuleEnabled(editModule)
                ? editModule.webPartDragZoneUtils.getDragZoneProps()
                : {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Type guard that always ensure the edit module exists when it's enabled.
     */
    CanvasDragZone.prototype._isEditModuleEnabled = function (editModule) {
        return editModule.isEnabled;
    };
    Object.defineProperty(CanvasDragZone.prototype, "_isEnabled", {
        get: function () {
            return this.props.editModule.isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    return CanvasDragZone;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "NEVa":
/*!**********************************!*\
  !*** external "@ms/sp-safehtml" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_NEVa__;

/***/ }),

/***/ "NhzL":
/*!**************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/webPartZone/shouldFallbackSetWebPartData.js ***!
  \**************************************************************************/
/*! exports provided: shouldFallbackSetWebPartData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldFallbackSetWebPartData", function() { return shouldFallbackSetWebPartData; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

/**
 * A map that records kill switch ids for individual web parts so opted-in web parts could opt-out by activating
 * the corresponding kill switch. This map takes web part manifest ids as keys and kill switch ids as values.
 */
var _undoRedoWebPartManifestKillSwitchMap = new Map([
    // News
    ['8c88f208-6c77-4bdb-86a0-0c47b4316588', '04cd47e6-da49-42d6-96b9-292d7d4a2568']
]);
function isWebPartExemptFromDynamicDataUpdate(wpManifest) {
    var killSwitchId = _undoRedoWebPartManifestKillSwitchMap.get(wpManifest.id);
    return Boolean(killSwitchId && _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(killSwitchId), '07/31/2019', 'Web part is exempt from dynamic data update'));
}
/**
 * Definition of the useFallbackWhenPropertiesUpdatedExternally web part manifest flag:
 * - If true, the web part will be disposed and reloaded when the web part data is updated by an external source.
 * - If false, the web part data will be deserialized and the properties of the web part will be updated,
 *   onAfterPropertiesUpdatedExternally will be executed.
 * - If undefined, right now it defaults to true. VSO#739036 when undo redo flight (1457) is GA, it should default
 *   to false for web parts that are built with the latest SPFx version, and default to true for web parts that
 *   are built with old SPFx version.
 * @param wpManifest - The manifest of the web part.
 */
function shouldFallbackSetWebPartData(wpManifest) {
    if (isWebPartExemptFromDynamicDataUpdate(wpManifest)) {
        return true;
    }
    var useFallbackWhenPropertiesUpdatedExternally = wpManifest.useFallbackWhenPropertiesUpdatedExternally;
    if (useFallbackWhenPropertiesUpdatedExternally === undefined) {
        // Mark kill-switched code as comments instead of removing it when graduating the kill switch.
        return true;
        // VSO#739036 Enable below logic of SPFx version hard cut-off when undo-redo (Flight 1457) reaches GA
        // const version: Version | undefined = Version._tryParseSPFxVersion(wpManifest);
        // return !version || version.lessThan(Version.parse('2.0'));
    }
    else {
        return useFallbackWhenPropertiesUpdatedExternally;
    }
}


/***/ }),

/***/ "OSqv":
/*!******************************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasZonePropertyPane/canvasZonePropertyPaneControlLoader.js ***!
  \******************************************************************************************************/
/*! exports provided: canvasZonePropertyPaneControlLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasZonePropertyPaneControlLoader", function() { return canvasZonePropertyPaneControlLoader; });
var canvasZonePropertyPaneControlLoader = function () {
    return __webpack_require__.e(/*! import() | sp-canvas-edit */ "sp-canvas-edit").then(__webpack_require__.bind(null, /*! ./CanvasZonePropertyPaneControl */ "LBkn"))
        .then(function (module) { return module.CanvasZonePropertyPaneControl; });
};


/***/ }),

/***/ "PBv6":
/*!**************************************************************!*\
  !*** ./lib/sp-canvas/common/CanvasAlignmentStyles.styles.js ***!
  \**************************************************************/
/*! exports provided: CanvasAlignmentStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasAlignmentStyles", function() { return CanvasAlignmentStyles; });
/* harmony import */ var _common_StyleHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/StyleHelpers */ "wFVB");

var CanvasAlignmentStyles = /** @class */ (function () {
    function CanvasAlignmentStyles() {
    }
    CanvasAlignmentStyles.getToolbarClassNames = function (props) {
        return Object(_common_StyleHelpers__WEBPACK_IMPORTED_MODULE_0__["getClassNames"])(CanvasAlignmentStyles._getToolbarStyles, props);
    };
    CanvasAlignmentStyles.getHintClassNames = function (props) {
        return Object(_common_StyleHelpers__WEBPACK_IMPORTED_MODULE_0__["getClassNames"])(CanvasAlignmentStyles._getHintStyles, props);
    };
    CanvasAlignmentStyles._getToolbarStyles = function (props) {
        var offset = props.offset, root = props.root;
        return {
            root: [
                root,
                'AlignedToolbar',
                {
                    left: offset
                }
            ]
        };
    };
    CanvasAlignmentStyles._getHintStyles = function (props) {
        var offset = props.offset, root = props.root;
        var toolbarReservedWidth = 32;
        return {
            root: [
                root,
                'AlignedHint',
                {
                    left: offset + toolbarReservedWidth,
                    width: "calc(100% + " + -(offset + toolbarReservedWidth) + "px)"
                }
            ]
        };
    };
    return CanvasAlignmentStyles;
}());



/***/ }),

/***/ "Pk8u":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Pk8u__;

/***/ }),

/***/ "QfGm":
/*!***************************************************!*\
  !*** ./lib/sp-canvas/canvas/controlZone/index.js ***!
  \***************************************************/
/*! exports provided: ControlZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ControlZone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ControlZone */ "EPam");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ControlZone", function() { return _ControlZone__WEBPACK_IMPORTED_MODULE_0__["ControlZone"]; });




/***/ }),

/***/ "S64i":
/*!******************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/CanvasVerticalSection/CanvasVerticalSection.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./CanvasVerticalSection.css */ "4hkP");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "TOEr":
/*!*********************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasStore/CanvasStore.js ***!
  \*********************************************************/
/*! exports provided: CanvasStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasStore", function() { return CanvasStore; });
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-webpart-base */ "br4S");
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _editChunk__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../editChunk */ "9s5w");
/* harmony import */ var _CanvasFields__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CanvasFields */ "dYQ3");
/* harmony import */ var _canvasAnimations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../canvasAnimations */ "fqJ2");
/* harmony import */ var _canvasLayout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../canvasLayout */ "yPt8");
/* harmony import */ var _CanvasStoreCommonActions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./CanvasStoreCommonActions */ "zjII");
/* harmony import */ var _canvasWebPartHost__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../canvasWebPartHost */ "wB5c");
/* harmony import */ var _canvasComponent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../canvasComponent */ "j0qU");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../common/Flights */ "qRiB");
/* harmony import */ var _canvasControl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../canvasControl */ "iO6m");
/* harmony import */ var _CanvasContentDeserializer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./CanvasContentDeserializer */ "AsKj");
/* harmony import */ var _CorruptSectionFactorFixer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./CorruptSectionFactorFixer */ "kQ9N");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../common/KillSwitches */ "17t3");



















var CanvasStore = /** @class */ (function () {
    function CanvasStore(options) {
        var _this = this;
        this.handleToolboxItemClick = function (itemProps, info) {
            _this._canvasStoreEditAction.handleToolboxItemClick(_this.canvasFields, itemProps, info);
        };
        this.openToolbox = function (position, type, targetElement, onClose) {
            _this._canvasStoreEditAction
                .openToolbox(_this.canvasFields, type, position, targetElement, onClose);
        };
        this.closeToolbox = function () {
            _this._canvasStoreEditAction.closeToolbox(_this.canvasFields);
        };
        this.handleConfigureButtonClicked = function (id) {
            _this._canvasStoreEditAction.handleConfigureButtonClicked(_this.canvasFields, id);
        };
        this.handleDuplicateControlButtonClicked = function (id) {
            _this._canvasStoreEditAction.handleDuplicateControlButtonClicked(_this.canvasFields, id);
        };
        this.handleDuplicateZoneButtonClicked = function (id) {
            _this._canvasStoreEditAction.handleDuplicateZoneButtonClicked(_this.canvasFields, id);
        };
        this.handleConfigureZoneButtonClicked = function (id, zoneFocusHandler) {
            _this._canvasStoreEditAction.handleConfigureZoneButtonClicked(_this.canvasFields, id, zoneFocusHandler);
        };
        this.handleDeleteControlButtonClicked = function (layout) {
            _this._canvasStoreEditAction.handleDeleteControlButtonClicked(_this.canvasFields, layout);
        };
        this.handleDeleteZoneButtonClicked = function (layout) {
            _this._canvasStoreEditAction.handleDeleteZoneButtonClicked(_this.canvasFields, layout);
        };
        this.handleWebPartChanged = function (wpInstanceId) {
            _this._canvasStoreEditAction.handleWebPartChanged(_this.canvasFields, wpInstanceId);
        };
        this.addRTEInCanvas = function (rteCanvasControl) {
            _this._canvasStoreEditAction.addRTEInCanvas(rteCanvasControl, _this);
        };
        this.handleRteChanged = function (newCanvasControl, newSelection, shouldUpdate) {
            if (shouldUpdate === void 0) { shouldUpdate = true; }
            return _this._canvasStoreEditAction
                .handleRteChanged(_this.canvasFields, newCanvasControl, newSelection, shouldUpdate);
        };
        this.handleRteChangedDeprecated = function (newCanvasControl) {
            return _this._canvasStoreEditAction
                .handleRteChangedDeprecated(_this.canvasFields, newCanvasControl);
        };
        /**
         * IFrame's swallow pointer events, so this is a workaround to detect when focus has shifted to
         * an IFrame. Additionally, to compensate for IFrame to IFrame interactions we poll for the document.activeElement.
         * If document.activeElement is not the same as it was in the last poll then the focus has shifted from the IFrame.
         * If the new document.activeElement is an IFrame continue polling, otherwise we can stop polling because focus
         * is back inside of the current document.
         */
        this.handleWindowBlur = function (e) {
            _this._canvasStoreEditAction.handleWindowBlur(_this.canvasFields, e);
        };
        this.reclaimFocus = function () {
            _this._canvasStoreEditAction.reclaimFocus(_this.canvasFields);
        };
        this.handlePropertyPaneOpenOrClose = function () {
            _this.canvasFields.render();
        };
        /**
         * If needed, scrolls element into view after the element is added to the Canvas.
         * Note: Javascript scrollIntoView is not consistent cross-browser
         *
         * @param type - Specifies whether to scroll if the 'full' web part is visible or a 'partial' part of the web part
         *   is visible
         * @param element - A rendered element inside the Canvas to scroll to
         * @param duration - The length of time the animation should take. Frames are calculated by duration / delta time.
         * @param margin - Optional. Margin to be scrolled into view. If not provided, margin is not scrolled into view
         */
        this.scrollIntoView = function (type, element, duration, margin, allowScrollUp) {
            if (margin === void 0) { margin = 0; }
            _this._canvasStoreEditAction.scrollIntoView(_this.canvasFields, type, element, duration, margin, allowScrollUp);
        };
        this.addControlToCanvas = function (control, shouldRender, shouldPersistData) {
            if (shouldRender === void 0) { shouldRender = false; }
            if (shouldPersistData === void 0) { shouldPersistData = shouldRender; }
            _CanvasStoreCommonActions__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].addControlToCanvas(_this.canvasFields, control, shouldRender, shouldPersistData);
        };
        this.tryMatchContentHandlerAndSplit = function (rteInstanceId, // The id of the RTE instance where the paste happens.
        innerHTML, position, data) {
            // Because the rich text editor has been manipulated (text split) when matching content handler actions,
            // We need to make sure the data in the store is update to date and the change should be combined with actual
            // content handler changes when being bubbled to page. So changes caused content handler action will be treated
            // as one change.
            var controlComponent = _this.canvasFields.getControlComponentById(rteInstanceId);
            if (controlComponent) {
                _this.handleRteChanged(controlComponent.serialize(), undefined /* newSelection */, false /* shouldUpdate */);
            }
            return _this._canvasStoreEditAction.tryMatchContentHandlerAndSplit(innerHTML, position, data, _this);
        };
        this.createFluidWebPart = function (componentUrl, innerHTML, position) {
            _this._canvasStoreEditAction.createFluidWebPart(componentUrl, innerHTML, position, _this);
        };
        this._handleResize = function () {
            _this.canvasFields.isTouchEnabled = CanvasStore._isTouchEnabled();
            _this.canvasFields.render();
        };
        var serviceScope = options.serviceScope, render = options.render, mode = options.mode, a11yManager = options.a11yManager;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(serviceScope, 'serviceScope');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(render, 'render');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(mode, 'mode');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(a11yManager, 'a11yManager');
        this.canvasFields = new _CanvasFields__WEBPACK_IMPORTED_MODULE_7__["CanvasFields"]();
        this.canvasFields.a11yManager = a11yManager;
        this._handleViewportRendered = options.onViewportRendered;
        this.canvasFields.render = render;
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_13__["Flights"].isPageUndoRedoFlightEnabled() && !_common_KillSwitches__WEBPACK_IMPORTED_MODULE_17__["KillSwitches"].tryReloadCanvasComponentWhenFailure.isActivated()) {
            this.canvasFields.disposeAndRender = options.disposeAndRender;
        }
        this.canvasFields.controlComponentMap = new Map();
        this.canvasFields.displayMode = mode;
        this.canvasFields.shouldCenterAlign = options.shouldCenterAlign || false;
        this.canvasFields.handleCanvasChanged = options.handleCanvasChanged;
        this.canvasFields.scrollThreshold = options.scrollThreshold || 0;
        this.canvasFields.pageLayoutType = options.pageLayoutType || '';
        this.canvasFields.doesUserHaveEditPermission = options.doesUserHaveEditPermission;
        this.canvasFields.webPartManager = _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4__["ClientSideWebPartManagerFactory"].create(new _canvasWebPartHost__WEBPACK_IMPORTED_MODULE_11__["CanvasWebPartHost"]({
            serviceScope: serviceScope,
            handleResize: function () {
                var param = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    param[_i] = arguments[_i];
                }
                return _this.scrollIntoView.apply(_this, ['full'].concat(param));
            },
            isViewportLoadingDisabled: !!options.isViewportLoadingDisabled,
            handleWebPartChanged: _common_Flights__WEBPACK_IMPORTED_MODULE_13__["Flights"].isPageUndoRedoFlightEnabled()
                ? this.handleWebPartChanged
                : function () { return options.handleCanvasChanged(); },
            reclaimFocus: this.reclaimFocus,
            setSelectedWebPartId: function (id) {
                _this.canvasFields.selectedControlIdInternal = id;
            },
            handlePropertyPaneOpenOrClose: this.handlePropertyPaneOpenOrClose
        }));
        this.canvasFields.serviceScope = serviceScope;
        this._canvasFields.canvasPerformanceLogger = options.canvasPerformanceLogger;
        this._isMobileBrowser = !!options.mobileBrowser;
        this._isRootScrollableElement = !!options.isRootScrollableElement;
        this._handleRendered = options.onRenderComplete;
        this.canvasFields.isCleanSelectionEnabled = options.isCleanSelectionEnabled || false;
        this.canvasFields.isTouchEnabled = CanvasStore._isTouchEnabled();
        this.canvasFields.instantiateCanvasLayout(2, options.variantsModuleLoader);
        this.canvasFields.variantsModuleLoader = options.variantsModuleLoader;
        if (this.canvasFields.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit) {
            // Using 'void' to indicate that we are not interested in the returned value.
            // The current implementation of edit actions lazy-loading is highly relying on the logic to ensure that
            // before any edit API of CanvasStore is called, the edit actions is already loaded completed by calling
            // initializeForEditMode and it has to be finished before calling any edit APIs.
            // Todo#671414 Find a better way for edit actions lazy-load practice to ensure the code path is strictly safe.
            void this.initializeForEditMode();
        }
        this.canvasFields.serviceScope.whenFinished(function () {
            _this.canvasFields.pageContext = _this.canvasFields.serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_3__["PageContext"].serviceKey);
        });
        this.canvasFields.serializeDoc = new DOMParser().parseFromString('', 'text/html');
        window.addEventListener('resize', _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["debounce"](this._handleResize, 100));
    }
    CanvasStore._isValidControlType = function (controlProps) {
        return (controlProps.controlType >= 3 && controlProps.controlType <= 10) || !!controlProps.position;
    };
    CanvasStore._isTouchEnabled = function () {
        var platform = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_5__["PlatformDetection"]();
        return platform.isAndroid || platform.isIOS;
    };
    CanvasStore.prototype.initializeForEditMode = function () {
        var _this = this;
        if (!this._editInitPromise) {
            this._editInitPromise = Promise.resolve();
            // In case of unit tests, we will just load the file synchronously
            if (false) { var propertyPaneController; }
            else {
                if (!this._canvasStoreEditAction) {
                    this._editInitPromise = this._loadPropertyPaneModule()
                        .then(_editChunk__WEBPACK_IMPORTED_MODULE_6__["canvasStoreEditActionsLoader"])
                        .then(function (chunk) {
                        _this._canvasStoreEditAction = chunk;
                    });
                }
            }
        }
        return this._editInitPromise.then(function () {
            _this._afterEditActionFileLoaded();
        });
    };
    Object.defineProperty(CanvasStore.prototype, "a11yManager", {
        get: function () {
            return this.canvasFields.a11yManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "canvasFields", {
        get: function () {
            return this._canvasFields;
        },
        set: function (canvasFields) {
            this._canvasFields = canvasFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "controlsProps", {
        get: function () {
            return this.canvasFields.canvasControls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "canvasLayout", {
        get: function () {
            return this.canvasFields.canvasLayout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "canvasLayouts", {
        get: function () {
            return this.canvasFields.canvasLayouts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "deletedControlLayout", {
        get: function () {
            return this.canvasFields.deletedControlLayout;
        },
        set: function (layout) {
            this.canvasFields.deletedControlLayout = layout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "revealObserver", {
        get: function () {
            if (!this.canvasFields.revealObserver) {
                this.canvasFields.revealObserver = new _canvasAnimations__WEBPACK_IMPORTED_MODULE_8__["CanvasRevealObserver"]();
            }
            return this.canvasFields.revealObserver;
        },
        enumerable: true,
        configurable: true
    });
    CanvasStore.prototype.clearRevealObserver = function () {
        this.canvasFields.revealObserver = undefined;
    };
    Object.defineProperty(CanvasStore.prototype, "scrollableParent", {
        get: function () {
            return this.canvasFields.scrollableParent;
        },
        set: function (elem) {
            this.canvasFields.scrollableParent = elem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "displayMode", {
        get: function () {
            return this.canvasFields.displayMode;
        },
        enumerable: true,
        configurable: true
    });
    CanvasStore.prototype.setDisplayMode = function (newMode) {
        var _this = this;
        if (this.canvasFields.displayMode === newMode) {
            return Promise.resolve();
        }
        var promise = Promise.resolve();
        if (newMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit) {
            promise = this.initializeForEditMode();
        }
        this.canvasFields.displayMode = newMode;
        return promise.then(function () {
            return _this._canvasStoreEditAction.setDisplayModeCore(_this.canvasFields, newMode);
        });
    };
    CanvasStore.prototype.moveControl = function (control, newControlPosition) {
        this._canvasStoreEditAction.moveControl(this.canvasFields, control, newControlPosition);
    };
    Object.defineProperty(CanvasStore.prototype, "isNarrowMode", {
        get: function () {
            return this._isNarrowMode;
        },
        set: function (value) {
            this._isNarrowMode = value;
            this.canvasFields.render();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "siteSupportsFullWidth", {
        get: function () {
            return this.canvasFields.shouldCenterAlign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "shouldCenterAlign", {
        get: function () {
            return this.canvasFields.shouldCenterAlign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "isRootScrollableElement", {
        get: function () {
            return this._isRootScrollableElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "selectedZoneIndex", {
        // WEX! VSO:Task:312203 this should be merged with selectedControlId to create a canvasSelection object
        // when the CanvasStore.isLayoutSupported flight is removed
        get: function () {
            // Todo#661360 Fix workaround left-over
            return this.canvasLayout.controlsState.selectedZoneIndex;
        },
        set: function (zoneIndex) {
            this.canvasFields.selectedZoneIndex = zoneIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "scrollThreshold", {
        get: function () {
            return this.canvasFields.scrollThreshold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "pageContext", {
        get: function () {
            return this.canvasFields.pageContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "pageLayoutType", {
        get: function () {
            return this.canvasFields.pageLayoutType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "serviceScope", {
        get: function () {
            return this.canvasFields.serviceScope;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "canvasElement", {
        get: function () {
            return this.canvasFields.canvasElement;
        },
        set: function (elem) {
            this.canvasFields.canvasElement = elem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "mainCanvasElement", {
        get: function () {
            return this.canvasFields.mainCanvasElement;
        },
        set: function (elem) {
            this.canvasFields.mainCanvasElement = elem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "hoveredControlId", {
        get: function () {
            return this.canvasFields.hoveredControlId;
        },
        /**
         * The hoveredControlId keeps track of which control the pointer is currently over.
         * It is used as a workaround to track pointer events on web parts that have IFrames.
         */
        set: function (id) {
            this.canvasFields.hoveredControlId = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "selectedControlId", {
        get: function () {
            return this.canvasFields.selectedControlIdInternal;
        },
        set: function (id) {
            if (this.canvasFields.selectedControlIdInternal !== id) {
                this.canvasFields.selectedControlIdInternal = id;
                this.canvasFields.render();
            }
            if (id !== undefined && this.propertyPaneController && this.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit) {
                var isCurrentlyConfigured = this.propertyPaneController.currentlyConfiguredConsumerId === id;
                this.propertyPaneController.requestAction(id, isCurrentlyConfigured ? 5 /* Refresh */ : 4 /* Default */);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "webPartManager", {
        get: function () {
            return this.canvasFields.webPartManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "propertyPaneController", {
        get: function () {
            return this._propertyPaneController;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "isMobileBrowser", {
        get: function () {
            return this._isMobileBrowser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "selectedLayoutIndex", {
        get: function () {
            return this.canvasFields.selectedLayoutIndex
                ? this.canvasFields.selectedLayoutIndex
                : _canvasLayout__WEBPACK_IMPORTED_MODULE_9__["CanvasLayout"].firstLayoutIndex;
        },
        set: function (layoutIndex) {
            this.canvasFields.selectedLayoutIndex = layoutIndex;
        },
        enumerable: true,
        configurable: true
    });
    CanvasStore.prototype.shouldResize = function (layoutIndex) {
        var isPropertyPaneOpened = Boolean(this.propertyPaneController && this.propertyPaneController.isOpen());
        var canvasRect = this.canvasElement && this.canvasElement.getBoundingClientRect();
        return (this.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit &&
            layoutIndex === _canvasLayout__WEBPACK_IMPORTED_MODULE_9__["CanvasLayout"].firstLayoutIndex &&
            canvasRect &&
            canvasRect.width < CanvasStore.canvasMinWidth &&
            isPropertyPaneOpened);
    };
    CanvasStore.prototype.updateControl = function (newCanvasControl) {
        return this._canvasStoreEditAction.updateControl(this.canvasFields, newCanvasControl);
    };
    CanvasStore.prototype.getToolBoxItem = function (id) {
        return this._canvasStoreEditAction.getToolBoxItem(this.canvasFields, id);
    };
    CanvasStore.prototype.deserialize = function (displayMode, serializedCanvas) {
        var qos = this.createQosScope('Deserialize');
        var row;
        try {
            this.canvasFields.webPartsCount = 0;
            this.canvasFields.euplApprovedWebpartCount = 0;
            this.canvasFields.controlComponentMap = new Map();
            this._disposeCanvasLayouts();
            if (serializedCanvas) {
                var controlAttribute = 'data-sp-canvascontrol';
                var tryJson = true;
                // Check to see if the serializedCanvas value is potentially HTML
                if (serializedCanvas.indexOf(controlAttribute) !== -1) {
                    var wrapper = document.createElement('div');
                    // Replace all IMG tags with SPIMG so the browser doesn't try to pre-load them.
                    // We want to avoid pre-loading because the browser tries to download the full-size image here which leads
                    // to duplicate download of the same image in two sizes. To make this work, WebPartDataConverter detects both
                    // IMG and SPIMG tags.
                    // @todo #302709 this trick can be removed after using DomParser instead of document.createElement
                    wrapper.innerHTML = Object(_CanvasContentDeserializer__WEBPACK_IMPORTED_MODULE_15__["replaceImageTagsInHtmlString"])(serializedCanvas);
                    // We need to cleanup the html to remove any extra lines or spaces
                    wrapper.innerHTML = Object(_CanvasContentDeserializer__WEBPACK_IMPORTED_MODULE_15__["stripOutNewLinesAndSpacesFromInnerHTML"])(wrapper.innerHTML);
                    var rows = wrapper.querySelectorAll("[" + controlAttribute + "]");
                    var rowLength = rows.length;
                    // If rowLength is 0 then serializedCanvas is either an empty canvas or JSON
                    if (rowLength > 0) {
                        tryJson = false;
                        // Keeps track of the last zone/section that a WP has been added to in case any position data is missing
                        // Should stay as 1/1 for data loaded from non-layout page if there is no exception
                        var lastZoneIndex = 1, lastSectionIndex = 1, lastControlIndex = 1;
                        var hasNonLayoutData = false, hasLayoutData = false;
                        for (var i = 0; i < rowLength; ++i) {
                            row = rows[i];
                            // Note: The legacy support exists for previously persisted data that have legacy structure
                            // We use data-sp-canvasdataversion attribute because it didn't exist in the legacy format
                            var isLegacyHtml = !row.hasAttribute('data-sp-canvasdataversion');
                            var controlProps = void 0;
                            if (isLegacyHtml) {
                                controlProps = this._deserializeLegacyCanvasControlHtml(row);
                            }
                            else {
                                controlProps = this._deserializeCanvasControlHtml(row);
                            }
                            if (controlProps) {
                                if (_canvasLayout__WEBPACK_IMPORTED_MODULE_9__["CanvasLayout"].isPositionValid(controlProps.position)) {
                                    /** Make sure zoneIndex is updated in case any position data is found from a non-Layout page
                                     *  This value will be ignored in addControlToCanvas as controlProps.position is found
                                     */
                                    lastZoneIndex = controlProps.position.zoneIndex || lastZoneIndex;
                                    lastSectionIndex = controlProps.position.sectionIndex || lastSectionIndex;
                                    lastControlIndex = controlProps.position.controlIndex || lastControlIndex;
                                    hasLayoutData = true;
                                }
                                else {
                                    hasNonLayoutData = true;
                                    // The canvas control is saved without layout data.
                                    // Add the control without a specified position into the last section
                                    // zone/section loaded from a non-layout page should always be 1/1
                                    controlProps.position = Object(_canvasComponent__WEBPACK_IMPORTED_MODULE_12__["CreateEmptyZoneLayout"])(lastZoneIndex, lastSectionIndex, ++lastControlIndex);
                                }
                                if (hasLayoutData === hasNonLayoutData) {
                                    // only one of hasLayoutData and hasNonLayoutData is suppose to true
                                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_CanvasFields__WEBPACK_IMPORTED_MODULE_7__["CanvasFields"].logSource, "Canvas layout data mismatch is found");
                                }
                                _CanvasStoreCommonActions__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].addControlToCanvas(this.canvasFields, controlProps);
                            }
                        }
                    }
                }
                /**
                 * If tryJson is still true, checking the flight will indicate either serializedCanvas
                 * is empty (false) or JSON (true)
                 */
                if (tryJson) {
                    this.processCanvasContent(displayMode, JSON.parse(serializedCanvas));
                }
                if (this.canvasFields.canvasPerformanceLogger) {
                    this.canvasFields.canvasPerformanceLogger.setPerformanceProperty('CanvasEUPLApprovedWebParts', this.canvasFields.euplApprovedWebpartCount);
                    this.canvasFields.canvasPerformanceLogger.setPerformanceProperty('CanvasWebParts', this.canvasFields.webPartsCount);
                }
            }
            if (!_common_Flights__WEBPACK_IMPORTED_MODULE_13__["Flights"].isPageUndoRedoFlightEnabled()) {
                this._deleteUnmatchedCacheEntries();
            }
            qos.writeSuccess();
        }
        catch (err) {
            qos.writeExpectedFailure('Exception', err, {
                errorControl: row ? row.outerHTML : undefined
            });
        }
    };
    CanvasStore.prototype.processCanvasContent = function (displayMode, canvasContent) {
        var _this = this;
        this.canvasFields.webPartsCount = 0;
        this.canvasFields.euplApprovedWebpartCount = 0;
        if (!_common_Flights__WEBPACK_IMPORTED_MODULE_13__["Flights"].isPageUndoRedoFlightEnabled()) {
            this.canvasFields.controlComponentMap = new Map();
        }
        this._disposeCanvasLayouts();
        var canvasControls;
        try {
            // We are explicitly excluding metadata here as the ControlType of metadata is 0.
            // The metadata is not supposed to be rendered and will be added back during serialization stage.
            canvasControls = canvasContent
                .filter(function (control) { return control && control.controlType !== _canvasControl__WEBPACK_IMPORTED_MODULE_14__["CanvasControlType"].Metadata; });
            var badSectionWorkaround = new _CorruptSectionFactorFixer__WEBPACK_IMPORTED_MODULE_16__["CorruptSectionFactorFixer"](canvasControls);
            if (displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Read) {
                badSectionWorkaround.logEngagement();
            }
            else {
                canvasControls = badSectionWorkaround.getSectionFactorFixedControls();
            }
        }
        catch (error) {
            // Fall back when any error occurs.
            canvasControls = canvasContent;
        }
        if (canvasControls) {
            canvasControls.forEach(function (control, index) {
                control.addedFromPersistedData = true;
                // Fix up the deserialized position which is not reflecting our typing.
                if (!_canvasLayout__WEBPACK_IMPORTED_MODULE_9__["CanvasLayout"].isPositionValid(control.position)) {
                    control.position = Object(_canvasComponent__WEBPACK_IMPORTED_MODULE_12__["CreateEmptyZoneLayout"])(index + 1);
                }
                _this.addControlToCanvas(control);
            });
        }
        if (this.canvasFields.canvasPerformanceLogger) {
            this.canvasFields.canvasPerformanceLogger.setPerformanceProperty('CanvasEUPLApprovedWebParts', this.canvasFields.euplApprovedWebpartCount);
            this.canvasFields.canvasPerformanceLogger.setPerformanceProperty('CanvasWebParts', this.canvasFields.webPartsCount);
        }
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_13__["Flights"].isPageUndoRedoFlightEnabled()) {
            this._deleteUnmatchedCacheEntries();
        }
    };
    CanvasStore.prototype.dispose = function () {
        this.webPartManager.dispose();
        this.canvasLayout.dispose();
        window.removeEventListener('resize', this._handleResize);
    };
    /**
     * Iterates over the current canvas controls and serializes the control data
     * Note: We encodeURI the content and send it to the server. ContentSerializer.ToHtml
     * decodes this using HtmlUtility.Decode before transforming to Html
     * @deprecated - It should be removed then PageUndoRedo flight is graduated.
     */
    CanvasStore.prototype.serializeAsJson = function () {
        return JSON.stringify(this.serializeAsObject());
    };
    /**
   * Serialize the current contents of the Canvas as Object.
   *
   * @param forceReserialize - Indicate whether canvas should go through all of the controls to serialize.
   * If it is true, it increases runtime cost but can always get latest data of canvas when there is still some
   *  operations that have not been populated.
   * If it is false, it will return the data that has been auto-populated and serialized recently.
   *
   * @returns Serialized object of the Canvas at the time the method is invoked.
   */
    CanvasStore.prototype.serializeAsObject = function (forceReserialize) {
        if (forceReserialize === void 0) { forceReserialize = false; }
        var qos = _CanvasStoreCommonActions__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].createQosScope('Serialize');
        var controlData;
        var extraData = {
            // We are re-using the alias field that was created for serving SPFX web part QoS scenarios.
            // This is to avoid creating additional pre-aggregate sets in Jarvis in order to create dashboards to monitor
            // page core QoS monitors measured by undo-redo flag state.
            // This won't impact existing QoS scenarios as it's only added to this monitor.
            alias: _common_Flights__WEBPACK_IMPORTED_MODULE_13__["Flights"].isPageUndoRedoFlightEnabled() ? 'UndoRedoEnabled' : 'UndoRedoDisabled'
        };
        try {
            var emtpySectionCount = 0;
            var controlDataCollection = [];
            var tempDiv_1 = this._canvasFields.serializeDoc.createElement('div');
            var _loop_1 = function (control) {
                if (control.id === _canvasLayout__WEBPACK_IMPORTED_MODULE_9__["CanvasSectionPart"].emptySectionId) {
                    control.id = _common_Flights__WEBPACK_IMPORTED_MODULE_13__["Flights"].isPageUndoRedoFlightEnabled() ? "EMPTY_" + emtpySectionCount++ : undefined;
                    controlData = control;
                }
                else {
                    if (_common_Flights__WEBPACK_IMPORTED_MODULE_13__["Flights"].isPageUndoRedoFlightEnabled() && !forceReserialize) {
                        controlData = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"](control);
                    }
                    else {
                        // Todo#661360 Fix workaround left-over
                        var controlComponent = this_1.canvasFields.getControlComponentById(control.id);
                        controlData = controlComponent.serialize();
                    }
                    // We do not want to serialize the manifest.
                    if (controlData.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_14__["CanvasControlType"].WebPartZone) {
                        controlData.webPartManifest = undefined; // Todo#661360 Fix workaround left-over
                    }
                    // Themes are reinitialized at runtime
                    controlData.emphasisTheme = undefined;
                    controlData.theme = undefined;
                }
                if (!_common_Flights__WEBPACK_IMPORTED_MODULE_13__["Flights"].isPageUndoRedoFlightEnabled() &&
                    _canvasControl__WEBPACK_IMPORTED_MODULE_14__["CanvasControlType"].WebPartZone === controlData.controlType &&
                    controlData.webPartData.serverProcessedContent) {
                    var searchablePlainTexts_1 = controlData.webPartData.serverProcessedContent.searchablePlainTexts;
                    if (searchablePlainTexts_1) {
                        Object.keys(searchablePlainTexts_1).forEach(function (key) {
                            tempDiv_1.textContent = searchablePlainTexts_1[key];
                            searchablePlainTexts_1[key] = tempDiv_1.innerHTML;
                        });
                    }
                }
                controlDataCollection.push(controlData);
            };
            var this_1 = this;
            for (var _i = 0, _a = this._canvasFields.canvasControls; _i < _a.length; _i++) {
                var control = _a[_i];
                _loop_1(control);
            }
            qos.writeSuccess(extraData);
            return controlDataCollection;
        }
        catch (err) {
            if (controlData && controlData.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_14__["CanvasControlType"].WebPartZone) {
                extraData.id = controlData.webPartId;
            }
            _CanvasStoreCommonActions__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].handleMonitoredException(qos, err, extraData);
            throw err;
        }
    };
    CanvasStore.prototype.tryGeneratePreviewImageUrl = function () {
        var qos = _CanvasStoreCommonActions__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].createQosScope('GeneratePreviewImageUrl');
        try {
            var webpartIds = [];
            for (var _i = 0, _a = this._canvasFields.canvasControls; _i < _a.length; _i++) {
                var control = _a[_i];
                if (control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_14__["CanvasControlType"].WebPartZone) {
                    webpartIds.push(control.id);
                }
            }
            var previewUrl = this.webPartManager.tryGeneratePreviewImageUrl(webpartIds);
            qos.writeSuccess();
            return previewUrl;
        }
        catch (err) {
            var pathLengthErrorKey = 'PathLengthError';
            if (err && err.message && err.message.indexOf(pathLengthErrorKey) > -1) {
                // Expected since we can't enforce 3rd party callers to not exceed the length
                qos.writeExpectedFailure(pathLengthErrorKey, err);
                return undefined;
            }
            else {
                _CanvasStoreCommonActions__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].handleMonitoredException(qos, err);
            }
        }
    };
    Object.defineProperty(CanvasStore.prototype, "webPartsCount", {
        get: function () {
            return this.canvasFields.webPartsCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasStore.prototype, "variantsModuleLoader", {
        get: function () {
            return this._canvasFields.variantsModuleLoader;
        },
        enumerable: true,
        configurable: true
    });
    CanvasStore.prototype.onAllWebPartsRendered = function (endTime) {
        if (this._handleRendered) {
            this._handleRendered(endTime);
        }
    };
    CanvasStore.prototype.onViewportWebPartsRendered = function (endTime) {
        if (this._handleViewportRendered && endTime) {
            this._handleViewportRendered(endTime);
        }
    };
    /**
     * If the Canvas is in DisplayMode.Edit, asynchronously fetch web part manifests in the background. If the Canvas is
     *  not in DisplayMode.Edit, fetch can be forced.
     */
    CanvasStore.prototype.fetchWebParts = function (force) {
        var _this = this;
        if (!this.canvasFields.fetchedWebparts && (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit === this.canvasFields.displayMode || force)) {
            /**
             * We only need to fetch the web part manifests once per site. If the SPSite changed, then a full page
             * refresh would have happened thus resetting the value.
             */
            return this.webPartManager.fetchWebPartManifests()
                .then(function () {
                // Set sentinel so we don't attempt to fetch again
                _this.canvasFields.fetchedWebparts = true;
            });
        }
        else {
            return Promise.resolve();
        }
    };
    /**
     * Resets the state of the canvas store and webpart manager so
     * the next call to enter edit mode triggers a fresh fetch of
     * the webpart manifests.
     */
    CanvasStore.prototype.refetchWebPartsOnNextEdit = function () {
        this.canvasFields.fetchedWebparts = false;
        this.canvasFields.webPartManager.clearManifestPromise();
    };
    CanvasStore.prototype.getToolboxItems = function (type, position) {
        return this._canvasStoreEditAction.getToolboxItems(this.canvasFields, type, position);
    };
    CanvasStore.prototype.createQosScope = function (scope) {
        return _CanvasStoreCommonActions__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].createQosScope(scope);
    };
    /**
    * Call when page finished deserializing, sending event with available WebParts.
    * This event will be processed by the MySiteCacheWebPartManager.
    */
    CanvasStore.prototype._deleteUnmatchedCacheEntries = function () {
        if (this.canvasFields.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Read) {
            var instanceIds = this.canvasFields.canvasControls
                .filter(function (control) { return control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_14__["CanvasControlType"].WebPartZone; })
                .map(function (control) { return control.webPartData.instanceId; });
            var data = { detail: instanceIds };
            var event_1 = new CustomEvent('pageDeserializationFinished', data);
            window.dispatchEvent(event_1);
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_CanvasFields__WEBPACK_IMPORTED_MODULE_7__["CanvasFields"].logSource, "Triggered pageDeserializationFinished");
        }
    };
    /**
     * Deserializes the persisted html of canvas control in legacy format to ICanvasControl
     * In legacy format, data-sp-controldata attribute contains both canvas control data and web part data
     */
    CanvasStore.prototype._deserializeLegacyCanvasControlHtml = function (row) {
        // ControlProps will be null in case of bad input
        var controlDataValue = row.getAttribute('data-sp-controldata');
        var controlProps = controlDataValue
            ? JSON.parse(decodeURI(controlDataValue))
            : undefined;
        if (controlProps) {
            if (!CanvasStore._isValidControlType(controlProps)) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_CanvasFields__WEBPACK_IMPORTED_MODULE_7__["CanvasFields"].logSource, "Invalid Control Type");
                return undefined;
            }
            if (!_common_Flights__WEBPACK_IMPORTED_MODULE_13__["Flights"].isPageUndoRedoFlightEnabled()) {
                controlProps.addedFromPersistedData = true;
            }
            /**
             * Deserialize using the row's HTML because SafeHTML scrubs the serialized RTE HTML persisted in the
             * row, and does not scrub the attribute.
             */
            if (controlProps.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_14__["CanvasControlType"].RTE) {
                controlProps.innerHTML = row.innerHTML;
            }
            var webPartData = controlProps.webPartData;
            if (webPartData) {
                // Early versions of mobile clients only set htmlProperties instead of setting the div innerHTML
                var htmlString = webPartData.htmlProperties; /* tslint:disable-line:no-any */
                // If the div exists, we use its innerHTML instead of .htmlProperties
                var htmlPropsDiv = row.querySelector('[data-sp-htmlproperties]');
                if (htmlPropsDiv) {
                    htmlString = htmlPropsDiv.innerHTML;
                }
                // Replace all IMG tags with SPIMG so the browser doesn't try to pre-load them.
                if (htmlString) {
                    htmlString = Object(_CanvasContentDeserializer__WEBPACK_IMPORTED_MODULE_15__["replaceImageTagsInHtmlString"])(htmlString);
                }
                webPartData.serverProcessedContent = _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4__["WebPartDataConverter"].convertServerProcessedHtmlToData(htmlString);
            }
        }
        return controlProps || undefined;
    };
    /**
     * Deserializes the persisted html for canvas control
     */
    CanvasStore.prototype._deserializeCanvasControlHtml = function (row) {
        // ControlProps will be null in case of bad input
        var controlDataValue = row.getAttribute('data-sp-controldata');
        var controlProps = controlDataValue
            ? JSON.parse(decodeURI(controlDataValue))
            : undefined;
        if (!controlProps || !CanvasStore._isValidControlType(controlProps)) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(_CanvasFields__WEBPACK_IMPORTED_MODULE_7__["CanvasFields"].logSource, "Invalid Control Type");
            return undefined;
        }
        controlProps.addedFromPersistedData = true;
        var webPartDiv = row.querySelector('[data-sp-webpart]');
        if (webPartDiv) {
            var webPartDivWrapper = document.createElement('div');
            webPartDivWrapper.appendChild(webPartDiv);
            controlProps.webPartData = _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4__["WebPartDataConverter"].convertHtmlToWebPartData(webPartDivWrapper.innerHTML); // Todo#661360 Fix workaround left-over
        }
        else {
            var rteDiv = row.querySelector('[data-sp-rte]');
            if (rteDiv || controlProps.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_14__["CanvasControlType"].RTE) {
                controlProps.innerHTML = rteDiv ? rteDiv.innerHTML : row.innerHTML;
            }
        }
        return controlProps;
    };
    CanvasStore.prototype._afterEditActionFileLoaded = function () {
        // Using 'void' to indicate that we are not interested in the returned value.
        // This is expected floating promise because we're asynchronously fetching web part manifests in the background.
        // _fetchWebParts is a no-op if not in DisplayMode.Edit
        void this.fetchWebParts();
    };
    CanvasStore.prototype._disposeCanvasLayouts = function () {
        this.canvasLayouts.forEach(function (canvasLayout) {
            canvasLayout.dispose();
        });
    };
    CanvasStore.prototype._loadPropertyPaneModule = function () {
        var _this = this;
        return this.canvasFields.propertyPaneLoader
            .propertyPane
            .then(function (propertyPaneController) {
            _this._propertyPaneController = propertyPaneController;
        });
    };
    // This is the minimum width for multicolumn canvas(Original canvas without vertical section).
    // The canvas needs to reflow if the width decreases than this.
    CanvasStore.canvasMinWidth = 1024;
    return CanvasStore;
}());



/***/ }),

/***/ "Tpr7":
/*!**********************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvas/LayoutCanvas.scss.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./LayoutCanvas.css */ "ADOM");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "TtDe":
/*!*********************************************!*\
  !*** ./lib/sp-canvas/spRte/SPRteWrapper.js ***!
  \*********************************************/
/*! exports provided: SPRteWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPRteWrapper", function() { return SPRteWrapper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _canvas_editChunk_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../canvas/editChunk/index */ "9s5w");
/* harmony import */ var _SPRteRead__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SPRteRead */ "WvBr");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/Flights */ "qRiB");






var SPRteWrapper = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SPRteWrapper, _super);
    function SPRteWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this._readRte = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._editRte = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this.focus = function () {
            if (_this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit && _this._editRte.current) {
                _this._editRte.current.focus();
            }
        };
        _this.focusFormattingBar = function () {
            if (_this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit && _this._editRte.current) {
                _this._editRte.current.focusFormattingBar();
            }
        };
        _this.serialize = function () {
            if (_this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit && _this._editRte.current) {
                return _this._editRte.current.serialize();
            }
            else {
                var serialization = JSON.parse(JSON.stringify(_this.props.control));
                return serialization;
            }
        };
        _this.setDisplayMode = function (newMode) {
            return new Promise(function (resolve) {
                _this.setState({
                    displayMode: newMode
                }, resolve);
            });
        };
        _this.scrollIntoView = function (options) {
            if (_this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Read && _this._readRte.current) {
                _this._readRte.current.scrollIntoView(options);
                return true;
            }
            else if (_this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit && _this._editRte.current) {
                _this._editRte.current.scrollIntoView(options);
            }
            return false;
        };
        _this.state = {
            displayMode: props.store.displayMode
        };
        return _this;
    }
    SPRteWrapper.prototype.render = function () {
        var _a = this.props, control = _a.control, store = _a.store;
        if (this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Read) {
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_SPRteRead__WEBPACK_IMPORTED_MODULE_4__["SPRteRead"], { ref: this._readRte, control: control, isRenderingDiff: store.canvasFields.isRenderingDiff }));
        }
        else {
            var _b = store.canvasFields, isUpdatingFromUpperLevel = _b.isUpdatingFromUpperLevel, canvasState = _b.canvasState;
            // Update the selection range of RTE when rte data is overwritten.
            var selection = isUpdatingFromUpperLevel &&
                canvasState &&
                canvasState.selectedControlId === control.id &&
                canvasState.selectedRteState
                ? canvasState.selectedRteState.selection
                : undefined;
            var rteProps = {
                control: control,
                innerHTML: control.innerHTML,
                onChange: _common_Flights__WEBPACK_IMPORTED_MODULE_5__["Flights"].isPageUndoRedoFlightEnabled()
                    ? store.handleRteChanged
                    : store.handleRteChangedDeprecated,
                serviceScope: store.serviceScope,
                displayMode: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit,
                selection: selection,
                store: store,
                ref: this._editRte
            };
            if (store.canvasFields.isTouchEnabled) {
                return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_canvas_editChunk_index__WEBPACK_IMPORTED_MODULE_3__["DeferredSPRteTouchDevice"], rteProps);
            }
            else {
                return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_canvas_editChunk_index__WEBPACK_IMPORTED_MODULE_3__["DeferredSPRte"], rteProps);
            }
        }
    };
    return SPRteWrapper;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));



/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "V9Um":
/*!*********************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasWebPartHost/CanvasWebPartHost.js ***!
  \*********************************************************************/
/*! exports provided: CanvasWebPartHost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasWebPartHost", function() { return CanvasWebPartHost; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file Web part host for the SP Canvas.
 */


var VIEWPORT_LOADER_GENERALIZED_FLIGHT = 1314;
/**
 * CanvasWebPartHost is the IWebPartHost implementation used by the Canvas. Each Canvas
 * will instantiate their own CanvasWebPartHost, which means the web parts are scoped by
 * Canvas.
 */
var CanvasWebPartHost = /** @class */ (function () {
    /**
     * @param handleCanvasChanged - Optional. Callback invoked when web parts are interacted with.
     */
    function CanvasWebPartHost(options) {
        var _this = this;
        /**
         * @see IWebPartHost
         */
        this.propertyPaneLifeCycleEventCallback = function (event, data) {
            if (event === 3 /* Opened */) {
                /*
                 * Scroll web part back into with a 500ms animation and
                 * 44px additional margin (2 * the _VERTICAL_MARGIN property in ControlZone)
                 */
                _this._handleResize(document.querySelector('.ControlZone--selected'), 500, 44);
                if (_this._handlePropertyPaneOpenOrClose) {
                    _this._handlePropertyPaneOpenOrClose();
                }
            }
            else if (event === 4 /* Closed */ || event === 6 /* LostFocus */) {
                _this._reclaimFocus();
                if (_this._handlePropertyPaneOpenOrClose) {
                    _this._handlePropertyPaneOpenOrClose();
                }
            }
            else if (event === 7 /* ActiveWebPartChanged */ &&
                _this._setSelectedWebPartId &&
                data &&
                data.webPartData) {
                // Set the currently selected control Id to be the one configured in the property pane.
                // It may not be a webpart in this IWebPartHost.
                // This provides the currently selected WebPart Id for the WebPart manager to determine
                // if it should open/toggle the property pane for a WebPart.
                _this._setSelectedWebPartId(data.webPartData.instanceId);
            }
        };
        this._handleWebPartChanged = options.handleWebPartChanged;
        this._handleResize = options.handleResize;
        this._reclaimFocus = options.reclaimFocus;
        this._serviceScope = options.serviceScope;
        this._setSelectedWebPartId = options.setSelectedWebPartId;
        this._isViewportLoadingDisabled = options.isViewportLoadingDisabled;
        this._handlePropertyPaneOpenOrClose = options.handlePropertyPaneOpenOrClose;
        // If enabled, consume viewport loader handle from serviceScope.
        if (_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(VIEWPORT_LOADER_GENERALIZED_FLIGHT)) {
            options.serviceScope.whenFinished(function () {
                _this._viewportLoader = options.serviceScope.consume(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["ViewportLoaderServiceKey"].serviceKey);
            });
        }
    }
    Object.defineProperty(CanvasWebPartHost.prototype, "serviceScope", {
        /**
         * @see IWebPartHost
         */
        get: function () {
            return this._serviceScope;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasWebPartHost.prototype, "isViewportLoadingDisabled", {
        get: function () {
            return this._isViewportLoadingDisabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasWebPartHost.prototype, "viewportLoader", {
        get: function () {
            return this._viewportLoader;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @see IWebPartHost
     */
    CanvasWebPartHost.prototype.setDirty = function (wpInstanceId) {
        if (this._handleWebPartChanged) {
            this._handleWebPartChanged(wpInstanceId);
        }
    };
    return CanvasWebPartHost;
}());



/***/ }),

/***/ "VQpE":
/*!****************************************************************!*\
  !*** ./lib/sp-canvas/canvas/controlZone/LayoutControlZone.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./LayoutControlZone.css */ "2+qN");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "VTSE":
/*!***********************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasDiff/DeferredControlDiffIndicator.js ***!
  \***********************************************************************************/
/*! exports provided: DeferredControlDiffIndicator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredControlDiffIndicator", function() { return DeferredControlDiffIndicator; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DeferredCanvasDiff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DeferredCanvasDiff */ "o0cL");



// tslint:disable-next-line:variable-name
var DeferredComponent = react__WEBPACK_IMPORTED_MODULE_1__["lazy"](function () { return Object(_DeferredCanvasDiff__WEBPACK_IMPORTED_MODULE_2__["canvasDiffLoader"])().then(function (module) { return ({ default: module.ControlDiffIndicator }); }); });
/**
 * @internal
 */
function DeferredControlDiffIndicator(props) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Suspense"], { fallback: false },
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](DeferredComponent, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props))));
}


/***/ }),

/***/ "Vb88":
/*!****************************************************************************!*\
  !*** ./lib/sp-canvas/common/CanvasEmphasis/CanvasEmphasisStyles.styles.js ***!
  \****************************************************************************/
/*! exports provided: CanvasEmphasisStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasEmphasisStyles", function() { return CanvasEmphasisStyles; });
/* harmony import */ var _common_StyleHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/StyleHelpers */ "wFVB");

var CanvasEmphasisStyles = /** @class */ (function () {
    function CanvasEmphasisStyles() {
    }
    CanvasEmphasisStyles.getClassNames = function (props) {
        return Object(_common_StyleHelpers__WEBPACK_IMPORTED_MODULE_0__["getClassNames"])(CanvasEmphasisStyles._getStyles, props);
    };
    CanvasEmphasisStyles._getStyles = function (props) {
        var theme = props.theme, root = props.root;
        var semanticColors = theme.semanticColors;
        return {
            root: [
                root,
                {
                    backgroundColor: semanticColors.bodyBackground,
                    color: semanticColors.bodyText
                }
            ]
        };
    };
    return CanvasEmphasisStyles;
}());



/***/ }),

/***/ "VyBU":
/*!**********************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/CanvasVerticalSection/CanvasVerticalSection.scss.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./CanvasVerticalSection.css */ "S64i");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "WvBr":
/*!******************************************!*\
  !*** ./lib/sp-canvas/spRte/SPRteRead.js ***!
  \******************************************/
/*! exports provided: SPRteRead */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPRteRead", function() { return SPRteRead; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_sp_anchor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/sp-anchor */ "dYC/");
/* harmony import */ var _ms_sp_anchor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_anchor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _canvas_editChunk_sprte_SPRteStyles_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../canvas/editChunk/sprte/SPRteStyles.styles */ "lHr1");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/Flights */ "qRiB");
/* harmony import */ var _ms_sp_rte_lib_rte_baseRte_BaseRte_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ms/sp-rte/lib/rte/baseRte/BaseRte.scss */ "yld5");
/* harmony import */ var _ms_sp_rte_lib_rte_ckeditor_CKTextEditor_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ms/sp-rte/lib/rte/ckeditor/CKTextEditor.scss */ "aYb9");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/KillSwitches */ "17t3");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */










var CHECK_HEADING_REGEX = /<h\d/; // Used to scan html that possibly contains heading starting tag like `<h1`
var _CKEDITOR_CLASS = 'cke_editable';
/**
 * @class TextWebPart readonly class. This component is used as a canvas control in read mode
 */
var SPRteRead = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SPRteRead, _super);
    function SPRteRead(props) {
        var _this = _super.call(this, props) || this;
        _this._rootRef = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this.scrollIntoView = function (options) {
            if (_this._rootRef.current) {
                _this._rootRef.current.scrollIntoView(options);
                return true;
            }
            return false;
        };
        return _this;
    }
    /** @deprecated - to be removed with 55b57887-ffe4-428b-a825-672add6870cf */
    SPRteRead.prototype.serialize = function () {
        // This is needed by canvas control
        var serialization = JSON.parse(JSON.stringify(this.props.control));
        return serialization;
    };
    /** @deprecated - to be removed with 55b57887-ffe4-428b-a825-672add6870cf */
    SPRteRead.prototype.setDisplayMode = function (newMode) {
        /**
         * No-op but needed by a canvas control
         */
    };
    SPRteRead.prototype.render = function () {
        var _a;
        var control = this.props.control;
        var html = control.innerHTML;
        var className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_CKEDITOR_CLASS, 'rte--read', (_a = {},
            _a['isFluentRTE'] = _common_Flights__WEBPACK_IMPORTED_MODULE_6__["Flights"].isFluentFlightEnabled(),
            _a));
        var browserInfo = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["_BrowserDetection"].getBrowserInformation();
        var isIE = browserInfo.browser === 4 /* IE */;
        var isFireFox = browserInfo.browser === 3 /* Firefox */;
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_9__["KillSwitches"].fixBoldFontWeightForIEAndFirefox.isActivated() && (isIE || isFireFox)) {
            // Font weight is 400 in IE and Firefox but it is 700 in other browsers so we
            // need to set the weight explictely.
            className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(className, 'fontWeightStrongForIEFireFox');
        }
        var contentElement = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { "data-automation-id": 'textBox', dangerouslySetInnerHTML: html ? { __html: html } : undefined, className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(className, this._emphasisClassName ? this._emphasisClassName : undefined) }));
        var contentMayContainHeading = html ? CHECK_HEADING_REGEX.test(html) : false;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { ref: this._rootRef, "data-sp-feature-tag": 'Rich Text Editor', className: 'rte-webpart', "data-sp-feature-instance-id": control.id }, _common_Flights__WEBPACK_IMPORTED_MODULE_6__["Flights"].isAnchorFlightEnabled() && control.id && contentMayContainHeading && !this.props.isRenderingDiff
            ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ms_sp_anchor__WEBPACK_IMPORTED_MODULE_4__["DeferredAnchorZone"], { deferredProps: {
                    componentId: control.id,
                    anchorElementSelector: 'h1, h2, h3, h4, h5'
                } }, contentElement))
            : contentElement));
    };
    Object.defineProperty(SPRteRead.prototype, "_emphasisClassName", {
        get: function () {
            var _a = this.props.control, emphasisTheme = _a.emphasisTheme, theme = _a.theme;
            if (emphasisTheme && theme) {
                var classNames = _canvas_editChunk_sprte_SPRteStyles_styles__WEBPACK_IMPORTED_MODULE_5__["SPRteStyles"].getClassNames({
                    root: _CKEDITOR_CLASS,
                    emphasisTheme: emphasisTheme,
                    theme: theme
                });
                return classNames && classNames.root;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    return SPRteRead;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));



/***/ }),

/***/ "X+PM":
/*!*********************************************!*\
  !*** external "@microsoft/sp-page-context" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_X_PM__;

/***/ }),

/***/ "XaoL":
/*!*******************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/toolbar/DeferredToolbar.js ***!
  \*******************************************************************/
/*! exports provided: DeferredToolbar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredToolbar", function() { return DeferredToolbar; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


// tslint:disable-next-line:variable-name
var DeferredToolbarComponent = react__WEBPACK_IMPORTED_MODULE_1__["lazy"](function () { return __webpack_require__.e(/*! import() | sp-canvas-edit */ "sp-canvas-edit").then(__webpack_require__.bind(null, /*! ./Toolbar */ "+LOX"))
    .then(function (module) { return ({ default: module.Toolbar }); }); });
var DeferredToolbar = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DeferredToolbar, _super);
    function DeferredToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeferredToolbar.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Suspense"], { fallback: false },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](DeferredToolbarComponent, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props))));
    };
    return DeferredToolbar;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "aKD8":
/*!*********************************************!*\
  !*** ../sp-rte/lib/rte/baseRte/BaseRte.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./BaseRte.css */ "cp13");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "aKqg":
/*!***************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasToolboxHint/DeferredCanvasToolboxHint.js ***!
  \***************************************************************************************/
/*! exports provided: DeferredCanvasToolboxHint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredCanvasToolboxHint", function() { return DeferredCanvasToolboxHint; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_sp_load_themed_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/sp-load-themed-styles */ "5z2F");
/* harmony import */ var _ms_sp_load_themed_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_load_themed_styles__WEBPACK_IMPORTED_MODULE_3__);




// tslint:disable-next-line:variable-name
var DeferredComponent = react__WEBPACK_IMPORTED_MODULE_1__["lazy"](function () { return __webpack_require__.e(/*! import() | sp-canvas-edit */ "sp-canvas-edit").then(__webpack_require__.bind(null, /*! ./CanvasToolboxHint */ "vclg"))
    .then(function (module) {
    _ms_sp_load_themed_styles__WEBPACK_IMPORTED_MODULE_3__["flush"]();
    return {
        default: module.CanvasToolboxHint
    };
}); });
var DeferredCanvasToolboxHint = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DeferredCanvasToolboxHint, _super);
    function DeferredCanvasToolboxHint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeferredCanvasToolboxHint.prototype.render = function () {
        return this.props.store.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit
            ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Suspense"], { fallback: false },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](DeferredComponent, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props))))
            : false;
    };
    return DeferredCanvasToolboxHint;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));



/***/ }),

/***/ "aNx7":
/*!***********************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasLayout/CanvasLayout.js ***!
  \***********************************************************/
/*! exports provided: CanvasLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasLayout", function() { return CanvasLayout; });
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CanvasZonePart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CanvasZonePart */ "zkMK");
/* harmony import */ var _canvasControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../canvasControl */ "iO6m");
/* harmony import */ var _canvasSection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../canvasSection */ "JqQl");
/* harmony import */ var _undefinedControlPosition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./undefinedControlPosition */ "4Mut");
/**
 * @file CanvasLayout.ts
 * @copyright (c) Microsoft Corporation. All rights reserved.
 */






/**
 * Represents the Canvas Layout
 */
var CanvasLayout = /** @class */ (function () {
    /**
     * Creates a new instance of a CanvasLayout
     */
    function CanvasLayout(getControlComponentById, renderCallBack, layoutIndex) {
        this._getControlComponentById = getControlComponentById;
        this._render = renderCallBack;
        this.layoutIndex = layoutIndex;
        this._initialize();
    }
    /**
     * Utility function that creates the smallest index closest to the input index.
     * It will generate the average of the sortedChildren[currentIndex] and the one before it.
     * If currentIndex is the index of the first element in sortedChildren it will just return currentIndex/2
     * @param sortedChildren is a sorted Array
     * @param currentIdx is the current entry index
     * @returns the index closest to the current index
     */
    CanvasLayout.generateNewLayoutIndex = function (sortedChildren, currentIdx, below) {
        if (!sortedChildren) {
            return undefined; // Todo#661360 Fix workaround left-over
        }
        var sortedIndexes = sortedChildren.map(function (child) { return child.index; });
        if (below) {
            var newIndex_1;
            sortedIndexes.forEach(function (index, i) {
                if (index === currentIdx) {
                    newIndex_1 = i + 1;
                }
            });
            if (newIndex_1 && newIndex_1 < sortedIndexes.length) {
                currentIdx = sortedIndexes[newIndex_1];
            }
            else {
                currentIdx += 1;
            }
        }
        sortedIndexes = sortedIndexes.filter(function (item) { return item < currentIdx; });
        var newIdx = currentIdx;
        if (sortedIndexes.length > 0) {
            newIdx += sortedIndexes[sortedIndexes.length - 1];
        }
        return newIdx / 2;
    };
    CanvasLayout.cloneMerge = function (value1, value2) {
        return Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["merge"])({}, value1, value2);
    };
    /**
     * Check if the `position` is valid. It is valid if the `position` has positive `zoneIndex` field.
     *
     * On layout toolbox hint, the `sectionIndex` and `controlIndex` fields are `undefined`,
     * we only check `zoneIndex` here.
     */
    CanvasLayout.isPositionValid = function (position) {
        return Boolean(position && position.zoneIndex);
    };
    CanvasLayout.isFullWidthSection = function (controlType) {
        return controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].FullWidth;
    };
    Object.defineProperty(CanvasLayout.prototype, "zones", {
        /**
         * Gets the zones associated with the current layout
         * @returns the zones associated with the layout
         */
        get: function () {
            var canvasZones = [];
            this._zonePartMap.forEach(function (zone) {
                canvasZones.push(zone);
            });
            return canvasZones.sort(function (zone1, zone2) {
                return zone1.index - zone2.index;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasLayout.prototype, "controlsState", {
        /**
         * Gets the state information of specific layout controls
         */
        get: function () {
            return this._activeControlsState;
        },
        enumerable: true,
        configurable: true
    });
    CanvasLayout.prototype.fetchCurrentSelection = function () {
        var _this = this;
        if (this._activeControlsState.selectedControlId) {
            var selectedControl = this.fetchAllControls()
                .filter(function (control) { return control.id === _this._activeControlsState.selectedControlId; })[0];
            if (selectedControl) {
                if (!selectedControl.position.layoutIndex) {
                    // We need to update the layout index for old serialized controls
                    // which did not have layout index
                    selectedControl.position = CanvasLayout.cloneMerge(selectedControl.position, {
                        layoutIndex: CanvasLayout.firstLayoutIndex
                    });
                }
                return selectedControl.position;
            }
            return _undefinedControlPosition__WEBPACK_IMPORTED_MODULE_5__["undefinedControlPosition"];
        }
        else {
            return {
                sectionIndex: undefined,
                zoneIndex: this._activeControlsState.selectedZoneIndex,
                controlIndex: undefined,
                layoutIndex: undefined
            };
        }
    };
    /**
     * Fetch the CanvasZonePart, if it exists, with the provided index.
     * @param index @see IControlPosition.zoneIndex
     * @returns @see CanvasZonePart
     */
    CanvasLayout.prototype.fetchZone = function (index) {
        return this._zonePartMap.get(index); // Todo#661360 Fix workaround left-over
    };
    /**
     * Change the emphasis of the layout.
     *
     * @param emphasis - The new emphasis
     */
    CanvasLayout.prototype.changeEmphasis = function (emphasis) {
        /**
         * Not implemented
         */
        throw new Error('Not implemented');
    };
    Object.defineProperty(CanvasLayout.prototype, "isFullWidthSectionPresent", {
        get: function () {
            return this._fullWidthSectionsCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a new canvas control to the layout
     * If zone doesn't exist, then create a new zone
     * @param canvasControl represents the control to add
     * @returns Id of control that was added
     */
    CanvasLayout.prototype.addControl = function (canvasControl) {
        var qos = this._createQosScope('AddControl');
        // If there is no control, no position, or a zone then we cannot do anything.
        if (!canvasControl || !canvasControl.position || canvasControl.position.zoneIndex === undefined) {
            this._handleMonitoredException(qos, 'InvalidControl', new Error('Could not add control as there is no control, no position, or a zone'), canvasControl);
            return undefined;
        }
        try {
            var curZoneIndex = canvasControl.position.zoneIndex;
            var controlId = void 0;
            // Get the pertinent zone if available
            var zone = this._zonePartMap.get(curZoneIndex);
            if (!zone) {
                // Zone doesn't exist, create a new zone
                var newCanvasZone = new _CanvasZonePart__WEBPACK_IMPORTED_MODULE_2__["CanvasZonePart"](curZoneIndex, canvasControl.emphasis && canvasControl.emphasis.zoneEmphasis, this._getControlComponentById, this.layoutIndex);
                // If section index is not provided, then set to default section index
                if (canvasControl.position.sectionIndex === undefined) {
                    canvasControl.position = CanvasLayout.cloneMerge(canvasControl.position, {
                        sectionIndex: CanvasLayout.firstLayoutIndex
                    });
                }
                // Ok, now add the control and update the layout
                controlId = newCanvasZone.addControl(canvasControl);
                if (controlId) {
                    this._zonePartMap.set(curZoneIndex, newCanvasZone);
                }
            }
            else {
                // zone already exists, verify that section information is provided
                if (canvasControl.position.sectionIndex !== undefined) {
                    // Ok this is a valid section, add the control
                    controlId = zone.addControl(canvasControl);
                }
                else {
                    // Attempting to add a new zone above the existing zone. Generate a new zone index and add it
                    canvasControl.position = CanvasLayout.cloneMerge(canvasControl.position, {
                        zoneIndex: CanvasLayout.generateNewLayoutIndex(this.zones, curZoneIndex)
                    });
                    if (canvasControl.position.zoneIndex === undefined) {
                        // Could not generate a new control index, cannot proceed
                        this._handleMonitoredException(qos, 'ControlIndex', new Error('Could not generate a new control index'), canvasControl);
                        return undefined;
                    }
                    var newSecondaryZone = new _CanvasZonePart__WEBPACK_IMPORTED_MODULE_2__["CanvasZonePart"](canvasControl.position.zoneIndex, canvasControl.emphasis && canvasControl.emphasis.zoneEmphasis, this._getControlComponentById, this.layoutIndex);
                    canvasControl.position = CanvasLayout.cloneMerge(canvasControl.position, {
                        sectionIndex: CanvasLayout.firstLayoutIndex
                    });
                    // Add the control, and update the layout
                    controlId = newSecondaryZone.addControl(canvasControl);
                    if (controlId) {
                        this._zonePartMap.set(canvasControl.position.zoneIndex, newSecondaryZone);
                    }
                }
            }
            if (CanvasLayout.isFullWidthSection(canvasControl.controlType)) {
                ++this._fullWidthSectionsCount;
            }
            qos.writeSuccess();
            return controlId;
        }
        catch (err) {
            this._handleMonitoredException(qos, 'Exception', err, canvasControl);
            return undefined;
        }
    };
    CanvasLayout.prototype.updateControl = function (control) {
        var zone = this._zonePartMap.get(control.position.zoneIndex);
        if (zone) {
            return zone.updateControl(control);
        }
        else {
            return false;
        }
    };
    /**
     * Move the control to the new position. If the move is not within the same section It removes the control from the
     * old position and recreates it in the new one.
     * @param control The control to be moved
     * @param newControlPosition The position where the control will be moved to
     */
    CanvasLayout.prototype.moveControl = function (control, newControlPosition) {
        if (!control || !newControlPosition) {
            return;
        }
        var zoneIndex = control.position.zoneIndex;
        // if the move is within the same CanvasZone let the Zone handle the move
        if (zoneIndex === newControlPosition.zoneIndex) {
            var zone = this._zonePartMap.get(zoneIndex);
            if (zone) {
                zone.moveControl(control, newControlPosition);
            }
        }
        else {
            // if the move is to a different CanvasZone we need to remove the control and add it to the new location
            var isFullWidth = _canvasSection__WEBPACK_IMPORTED_MODULE_4__["CanvasFullWidthSection"].isFullWidth(newControlPosition);
            // Todo#661360 Fix workaround left-over
            var newControl = this._getControlComponentById(control.id).serialize();
            this._checkControlFullWidthProperty(newControlPosition, newControl);
            newControl.position = newControlPosition;
            newControl.addedFromPersistedData = true;
            this.removeControl(control.position);
            // The drag zone only knows about the data disallowed tag but for the web parts that do support
            // full width, we need to add this extra condition to make sure that we don't exceed more than
            // one web part on full width section. This creates a new zone when the user attempts to drag a
            // web part in full width section that is not empty.
            if (isFullWidth && !this._isZoneSectionEmpty(newControlPosition, 0)) {
                var curZoneIndex = newControl.position.zoneIndex;
                newControl.position = CanvasLayout.cloneMerge(newControl.position, {
                    zoneIndex: CanvasLayout.generateNewLayoutIndex(this.zones, curZoneIndex),
                    sectionIndex: CanvasLayout.firstLayoutIndex,
                    controlIndex: 1
                });
            }
            this.addControl(newControl);
        }
        this._render();
    };
    /**
     * Moves the zone to the new index. The newZoneIndex is calculated outside of the layout and should
     * be the index of the zone before which this zone is moved or the last zone index + 1 in case the
     * new location is the last one on the canvas
     */
    CanvasLayout.prototype.moveZone = function (zone, newZoneIndex) {
        if (!zone || !newZoneIndex) {
            return false;
        }
        this._zonePartMap.delete(zone.index);
        zone.changeZoneIndex(CanvasLayout.generateNewLayoutIndex(this.zones, newZoneIndex));
        this._zonePartMap.set(zone.index, zone);
        this._render();
        return true;
    };
    /**
     * Removes a control from the layout
     * @param controlPosition represents the control to remove
     * @returns Id of control that was removed
     */
    CanvasLayout.prototype.removeControl = function (controlPosition) {
        var qos = this._createQosScope('RemoveControl');
        if (!controlPosition) {
            this._handleMonitoredException(qos, 'InvalidPosition', new Error('Failed to remove control because control position is undefined'), controlPosition);
            return undefined;
        }
        try {
            var zone = this._zonePartMap.get(controlPosition.zoneIndex);
            if (!zone) {
                // Zone doesn't exist, cannot proceed
                this._handleMonitoredException(qos, 'InvalidZone', new Error('Failed to remove control because zone does not exist'), controlPosition);
                return undefined;
            }
            // remove the control from the zone
            var controlId = zone.removeControl(controlPosition);
            qos.writeSuccess();
            return controlId;
        }
        catch (err) {
            this._handleMonitoredException(qos, 'Exception', err, controlPosition);
            return undefined;
        }
    };
    /**
     * Removes a zone from the layout
     *
     * @param index Represents the index of the zone to remove
     */
    CanvasLayout.prototype.removeZone = function (index) {
        var zone = this._zonePartMap.get(index);
        if (zone && CanvasLayout.isFullWidthSection(zone.layoutType)) {
            --this._fullWidthSectionsCount;
        }
        if (zone) {
            zone.dispose();
        }
        // All controls have been removed by zone.dispose in disposeWebparts
        // So only removing from dataMap here
        this._zonePartMap.delete(index);
    };
    /**
     * Fetches a control from the layout
     * @param controlPosition represents the position of the control
     * @returns the underlying control if available
     */
    CanvasLayout.prototype.fetchControl = function (controlPosition) {
        var qos = this._createQosScope('FetchControl');
        // Verify it is a valid layout
        if (!controlPosition) {
            this._handleMonitoredException(qos, 'InvalidPosition', new Error('Failed to fetch control because control position is undefined'), controlPosition);
            return undefined;
        }
        try {
            var zone = this._zonePartMap.get(controlPosition.zoneIndex);
            if (!zone) {
                // Zone doesn't exist, cannot proceed
                this._handleMonitoredException(qos, 'InvalidZone', new Error('Failed to fetch control because zone does not exist'), controlPosition);
                return undefined;
            }
            qos.writeSuccess();
            return zone.fetchControl(controlPosition);
        }
        catch (err) {
            this._handleMonitoredException(qos, 'Exception', err, controlPosition);
            return undefined;
        }
    };
    /**
     * Fetch all controls that are available in the canvas
     * @returns all the controls associated with that layout
     */
    CanvasLayout.prototype.fetchAllControls = function () {
        var canvasControls = [];
        this.zones.forEach(function (zone) {
            var controls = zone.fetchAllControls();
            canvasControls = canvasControls.concat(controls);
        });
        return canvasControls;
    };
    /**
     * Determines if the underlying layout is empty
     * @returns true if the pertinent layout is empty
     */
    CanvasLayout.prototype.isEmpty = function () {
        return this.fetchAllControls().length === 0;
    };
    /**
     * Disposes the layout.
     */
    CanvasLayout.prototype.dispose = function () {
        this._zonePartMap.clear();
        this._resetActiveControlState();
    };
    CanvasLayout.prototype._isZoneSectionEmpty = function (position, index) {
        var zone = this._zonePartMap.get(position.zoneIndex);
        var sections = zone ? zone.sections : [];
        return sections && sections[index] && sections[index].isEmpty();
    };
    CanvasLayout.prototype._checkControlFullWidthProperty = function (newCanvasPosition, control) {
        if (_canvasSection__WEBPACK_IMPORTED_MODULE_4__["CanvasFullWidthSection"].isFullWidthControl(control)) {
            if (_canvasSection__WEBPACK_IMPORTED_MODULE_4__["CanvasFullWidthSection"].isFullWidth(newCanvasPosition)) {
                _canvasSection__WEBPACK_IMPORTED_MODULE_4__["CanvasFullWidthSection"].setFullWidthWebPartProperty(control, true);
            }
            else if (!_canvasSection__WEBPACK_IMPORTED_MODULE_4__["CanvasFullWidthSection"].isFullWidth(newCanvasPosition)) {
                _canvasSection__WEBPACK_IMPORTED_MODULE_4__["CanvasFullWidthSection"].setFullWidthWebPartProperty(control, false);
            }
        }
    };
    CanvasLayout.prototype._initialize = function () {
        this._zonePartMap = new Map();
        this._fullWidthSectionsCount = 0;
        this._resetActiveControlState();
    };
    CanvasLayout.prototype._createQosScope = function (scope) {
        return new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]("Canvas" + scope);
    };
    CanvasLayout.prototype._resetActiveControlState = function () {
        this._activeControlsState = {
            hoveredControlId: undefined,
            selectedControlId: undefined,
            selectedZoneIndex: undefined,
            deletedControlLayout: _undefinedControlPosition__WEBPACK_IMPORTED_MODULE_5__["undefinedControlPosition"],
            deleteCandidateControlLayout: _undefinedControlPosition__WEBPACK_IMPORTED_MODULE_5__["undefinedControlPosition"]
        };
    };
    CanvasLayout.prototype._handleMonitoredException = function (qos, failureTag, err, props) {
        var extraData; /* tslint:disable-line:no-any */
        if (props && props.controlType) {
            props = props;
            if (props && props.controlType !== _canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].RTE && props.controlType !== _canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].WebPartZone) {
                // We can add position for zone in extra data
                extraData = { ControlPosition: props.position };
            }
            if (props && props.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].WebPartZone) {
                extraData = {
                    id: props.webPartId,
                    alias: props.webPartManifest.alias
                };
            }
        }
        else {
            extraData = { ControlPosition: props };
        }
        qos.writeUnexpectedFailure(failureTag, err, extraData);
    };
    CanvasLayout.firstLayoutIndex = 1;
    CanvasLayout.verticalLayoutIndex = 2;
    return CanvasLayout;
}());



/***/ }),

/***/ "aYb9":
/*!*******************************************************!*\
  !*** ../sp-rte/lib/rte/ckeditor/CKTextEditor.scss.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./CKTextEditor.css */ "BI4S");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "aYeN":
/*!********************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasControl/CanvasControlFactory.js ***!
  \********************************************************************/
/*! exports provided: CanvasControlFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasControlFactory", function() { return CanvasControlFactory; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CanvasControlType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CanvasControlType */ "rRNS");
/* harmony import */ var _webPartZone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../webPartZone */ "4Tcc");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/Flights */ "qRiB");
/* harmony import */ var _spRte_SPRteRead__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../spRte/SPRteRead */ "WvBr");
/* harmony import */ var _editChunk__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../editChunk */ "9s5w");
/* harmony import */ var _spRte_SPRteWrapper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../spRte/SPRteWrapper */ "TtDe");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common/KillSwitches */ "17t3");










var CanvasControlFactory = /** @class */ (function () {
    function CanvasControlFactory() {
    }
    /**
     * Create web part or RTE to render.
     */
    CanvasControlFactory.CreateCanvasControl = function (control, store) {
        function getUpdateRefFunction(ref) {
            return function () {
                if (ref.current) {
                    // It's type workaround but in deprecated code which will be removed with flight 1697.
                    // tslint:disable-next-line:no-any
                    store.canvasFields.setControlComponentById(control.id, ref.current);
                }
            };
        }
        var displayMode = store.displayMode;
        switch (control.controlType) {
            case _CanvasControlType__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].RTE:
                if (_common_Flights__WEBPACK_IMPORTED_MODULE_5__["Flights"].isEditTransitionPerFrame()) {
                    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_spRte_SPRteWrapper__WEBPACK_IMPORTED_MODULE_8__["SPRteWrapper"], {
                        control: control,
                        ref: function (instance) { return store.canvasFields.setControlComponentById(control.id, instance); },
                        store: store
                    });
                }
                else {
                    var _a = store.canvasFields, isUpdatingFromUpperLevel = _a.isUpdatingFromUpperLevel, canvasState = _a.canvasState;
                    var isRtePerfFix = _common_Flights__WEBPACK_IMPORTED_MODULE_5__["Flights"].isPageUndoRedoFlightEnabled() &&
                        !_common_KillSwitches__WEBPACK_IMPORTED_MODULE_9__["KillSwitches"].rteTypePerfWithUndo.isActivated();
                    var rteRef = void 0;
                    var updateRef = void 0;
                    if (isRtePerfFix) {
                        rteRef = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
                        updateRef = getUpdateRefFunction(rteRef);
                    }
                    // Update the selection range of RTE when rte data is overwritten.
                    var selection = isUpdatingFromUpperLevel &&
                        canvasState &&
                        canvasState.selectedControlId === control.id &&
                        canvasState.selectedRteState
                        ? canvasState.selectedRteState.selection
                        : undefined;
                    var rteProps = {
                        control: control,
                        innerHTML: control.innerHTML,
                        // We need to pass a refObject instead of callback to let data layer get the reference to call RTE API.
                        ref: isRtePerfFix
                            ? rteRef
                            // It's type workaround but in deprecated code which will be removed with flight 1697.
                            // tslint:disable-next-line:no-any
                            : function (instance) { return store.canvasFields.setControlComponentById(control.id, instance); },
                        onChange: _common_Flights__WEBPACK_IMPORTED_MODULE_5__["Flights"].isPageUndoRedoFlightEnabled()
                            ? store.handleRteChanged
                            : store.handleRteChangedDeprecated,
                        serviceScope: store.serviceScope,
                        displayMode: displayMode,
                        selection: selection,
                        store: store
                    };
                    if (store.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Read) {
                        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_spRte_SPRteRead__WEBPACK_IMPORTED_MODULE_6__["SPRteRead"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, rteProps, { isRenderingDiff: store.canvasFields.isRenderingDiff }), updateRef);
                    }
                    else {
                        if (store.canvasFields.isTouchEnabled) {
                            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editChunk__WEBPACK_IMPORTED_MODULE_7__["DeferredSPRteTouchDevice"], rteProps, updateRef);
                        }
                        else {
                            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editChunk__WEBPACK_IMPORTED_MODULE_7__["DeferredSPRte"], rteProps, updateRef);
                        }
                    }
                }
            case _CanvasControlType__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].WebPartZone:
                return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_webPartZone__WEBPACK_IMPORTED_MODULE_4__["WebPartZone"], {
                    ref: function (instance) { return store.canvasFields.setControlComponentById(control.id, instance); },
                    displayMode: displayMode,
                    control: control,
                    store: store
                });
            default:
                return false;
        }
    };
    return CanvasControlFactory;
}());



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

/***/ "cPvr":
/*!**************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/DeferredSPRteTouchDevice.js ***!
  \**************************************************************************/
/*! exports provided: DeferredSPRteTouchDevice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredSPRteTouchDevice", function() { return DeferredSPRteTouchDevice; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


// tslint:disable
var DeferredSPRteComponentTouchDevice = react__WEBPACK_IMPORTED_MODULE_1__["lazy"](function () { return __webpack_require__.e(/*! import() | sp-canvas-edit */ "sp-canvas-edit").then(__webpack_require__.bind(null, /*! ./index-deferred */ "pL8B"))
    .then(function (module) { return ({
    default: module.withDataControlled(module.SPRteTouchDevice)
}); }); });
var DeferredSPRteTouchDevice = react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](function (props, ref) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Suspense"], { fallback: false },
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](DeferredSPRteComponentTouchDevice, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ ref: ref }, props))));
});


/***/ }),

/***/ "cp13":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!../sp-rte/lib/rte/baseRte/BaseRte.css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".cke_editable{cursor:text;padding:0 2px;min-height:68px;margin:0 0 -16px}.rte-webpart{overflow:hidden}.rte--edit a{pointer-events:none}.rte--read{min-height:0}.rte--read .canvasRteResponsiveTableSelected{border:1px solid \"[theme:neutraltertiary, default: #a6a6a6]\"}.cke_editable:focus{outline:0}.cke_editable:focus td[class*=cke_table-faked-selection]{background:\"[theme:themeLight, default: #c7e0f4]\"!important;border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px;border-style:solid}.fontWeightStrongForIEFireFox strong,.fontWeightStrong strong{font-weight:700}.cke_editable blockquote,.cke_editable div,.cke_editable h2,.cke_editable h3,.cke_editable h4,.cke_editable ol,.cke_editable p,.cke_editable ul{-webkit-font-smoothing:antialiased;line-height:1.3;margin:0 0 16px;word-wrap:break-word}.cke_editable .cke_table-faked-selection{background:\"[theme:themeLight, default: #c7e0f4]\"!important;border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px;border-style:solid}.cke_editable div,.cke_editable p{font-size:15px;font-weight:400}.cke_editable h2,.cke_editable h3,.cke_editable h4{font-weight:100!important}.cke_editable h2{font-size:24px}.cke_editable h3{font-size:21px}.cke_editable h4{font-size:17px;font-weight:300}.cke_editable ol,.cke_editable ul{font-size:15px;font-weight:400;padding:0;margin-left:0!important}.cke_editable ol li,.cke_editable ul li{margin-bottom:8px}.cke_editable ol{list-style-type:decimal}.cke_editable ul{list-style-type:disc}.cke_editable ol ol,.cke_editable ul ul{margin-top:8px;margin-bottom:8px}.cke_editable ul li ul li{list-style-type:circle}.cke_editable ul li ul li ul li{list-style-type:square}.cke_editable blockquote,.cke_editable div.quote-true{border-left:none;border-right:none;font-weight:100;font-size:24px;font-style:italic;margin:28px 0;padding:32px;text-align:center;font-family:Segoe UI Light WestEuropean,Segoe UI Light,Segoe WP Light,Segoe UI,Segoe WP,Tahoma,Arial,sans-serif}.cke_editable blockquote p{font-size:24px;margin:0}.cke_editable a{text-decoration:underline}.cke_editable i{font-style:italic}.cke_editable u{text-decoration:underline}@media screen and (min-width:480px){.cke_editable h2{font-size:28px}.cke_editable h3{font-size:24px}.cke_editable h4{font-size:21px}.cke_editable blockquote,.cke_editable div.quote-true{font-size:24px}}@media screen and (min-width:1024px){.cke_editable h2{font-size:28px}.cke_editable h3{font-size:24px}.cke_editable h4{font-size:21px}.cke_editable div,.cke_editable ol,.cke_editable p,.cke_editable ul{font-size:17px;font-weight:300;line-height:1.3}.cke_editable td,.cke_editable td p,.cke_editable th,.cke_editable th p{font-size:15px;font-weight:400}}.cke_editable:not(:focus):before{content:attr(placeholder);font-size:17px;font-weight:300;line-height:1.3;display:block}.isFluentRTE div,.isFluentRTE p{font-size:18px;font-weight:400;line-height:1.4}.isFluentRTE h2,.isFluentRTE h3,.isFluentRTE h4{font-weight:600!important}.isFluentRTE h2{font-size:28px}.isFluentRTE h3{font-size:24px}.isFluentRTE h4{font-size:20px;font-weight:600}.isFluentRTE ol,.isFluentRTE ul{font-size:18px;font-weight:400}.isFluentRTE blockquote,.isFluentRTE blockquote p,.isFluentRTE div.quote-true{font-weight:600;font-size:20px;line-height:1.4}.isFluentRTE td,.isFluentRTE td ol,.isFluentRTE td p,.isFluentRTE td ul,.isFluentRTE th,.isFluentRTE th p{font-size:16px;font-weight:400}.isFluent:not(:focus):before{content:attr(placeholder);font-size:18px;font-weight:400;line-height:1.4;display:block}", ""]);



/***/ }),

/***/ "dYC/":
/*!********************************!*\
  !*** external "@ms/sp-anchor" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_dYC___;

/***/ }),

/***/ "dYQ3":
/*!**********************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasStore/CanvasFields.js ***!
  \**********************************************************/
/*! exports provided: CanvasFields */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasFields", function() { return CanvasFields; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-webpart-base */ "br4S");
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _canvasLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../canvasLayout */ "yPt8");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/Flights */ "qRiB");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/KillSwitches */ "17t3");






var CanvasFields = /** @class */ (function () {
    function CanvasFields() {
        var _this = this;
        this.isDOMManipulated = false;
        this.webpartsCount = 0;
        /**
         * Total number of web parts in the canvas store to be loaded
         */
        this.webPartsCount = 0;
        /**
         * Total number of web parts approved for EUPL in canvas
         */
        this.euplApprovedWebpartCount = 0;
        this.isUpdatingFromUpperLevel = false; // TODO#705886 Refactor isUpdatingFromUpperLevel flag.
        this.isCleanSelectionEnabled = false;
        this.getControlComponentById = function (id) {
            return _this.controlComponentMap.get(id);
        };
        this.setControlComponentById = function (id, component) {
            if (component) {
                _this.controlComponentMap.set(id, component);
            }
            else {
                _this.controlComponentMap.delete(id);
            }
        };
    }
    Object.defineProperty(CanvasFields.prototype, "isRenderingDiff", {
        get: function () {
            return _common_Flights__WEBPACK_IMPORTED_MODULE_4__["Flights"].isPageVersionEnabled() && Boolean(this.controlDiffMap);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasFields.prototype, "positionCandidateForDeletion", {
        /**
         * @deprecated - It should be removed then PageUndoRedo flight is graduated.
         */
        get: function () {
            return this.canvasLayout.controlsState.deleteCandidateControlLayout;
        },
        /**
         * @deprecated - It should be removed then PageUndoRedo flight is graduated.
         */
        set: function (layout) {
            this.canvasLayout.controlsState.deleteCandidateControlLayout = layout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasFields.prototype, "deletedControlLayout", {
        get: function () {
            return this.canvasLayout.controlsState.deletedControlLayout;
        },
        set: function (layout) {
            this.canvasLayout.controlsState.deletedControlLayout = layout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasFields.prototype, "canvasControls", {
        get: function () {
            var canvasControls = [];
            this.canvasLayouts.forEach(function (layout) {
                canvasControls = canvasControls.concat(layout.fetchAllControls());
            });
            return canvasControls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasFields.prototype, "canAddFullWidthSection", {
        get: function () {
            return !this.isVerticalSectionPresent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasFields.prototype, "canAddVerticalSection", {
        get: function () {
            return !this.isVerticalSectionPresent && !this.isFullWidthSectionPresent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasFields.prototype, "isFullWidthSectionPresent", {
        get: function () {
            // Todo#661360 Fix workaround left-over
            return this.canvasLayouts.get(_canvasLayout__WEBPACK_IMPORTED_MODULE_3__["CanvasLayout"].firstLayoutIndex).isFullWidthSectionPresent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasFields.prototype, "siteSupportsFullWidth", {
        get: function () {
            return this.shouldCenterAlign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasFields.prototype, "selectedZoneIndex", {
        // WEX! VSO:Task:312203 this should be merged with selectedControlId to create a canvasSelection object
        // when the CanvasStore.isLayoutSupported flight is removed
        get: function () {
            return this.canvasLayout.controlsState.selectedZoneIndex; // Todo#661360 Fix workaround left-over
        },
        set: function (zoneIndex) {
            this.selectedControlIdInternal = undefined;
            this.canvasLayout.controlsState.selectedZoneIndex = zoneIndex;
            if (!_common_Flights__WEBPACK_IMPORTED_MODULE_4__["Flights"].isPageUndoRedoFlightEnabled() &&
                (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_5__["KillSwitches"].openPropertyPaneOnlyInEdit.isActivated() || this.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["DisplayMode"].Edit)) {
                var zoneId_1 = this.selectedLayoutIndex + "_" + zoneIndex;
                if (zoneId_1) {
                    void this.propertyPaneLoader
                        .propertyPane
                        .then(function (propertyPaneController) {
                        propertyPaneController.requestAction(zoneId_1);
                    });
                }
            }
            this.render();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasFields.prototype, "selectedControlIdInternal", {
        get: function () {
            return this.canvasLayout.controlsState.selectedControlId;
        },
        set: function (id) {
            this.canvasLayout.controlsState.selectedControlId = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasFields.prototype, "hoveredControlId", {
        get: function () {
            return this.canvasLayout.controlsState.hoveredControlId;
        },
        set: function (id) {
            this.canvasLayout.controlsState.hoveredControlId = id;
        },
        enumerable: true,
        configurable: true
    });
    CanvasFields.prototype.getControl = function (position) {
        return this.canvasLayout.fetchControl(position);
    };
    Object.defineProperty(CanvasFields.prototype, "canvasLayout", {
        get: function () {
            return this.getLayout(this.selectedLayoutIndex);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasFields.prototype, "propertyPaneLoader", {
        get: function () {
            return this.serviceScope.consume(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_1__["_PropertyPaneLoader"].serviceKey);
        },
        enumerable: true,
        configurable: true
    });
    CanvasFields.prototype.getLayout = function (layoutIndex) {
        // Todo#661360 Fix workaround left-over
        return this.canvasLayouts.get(layoutIndex || _canvasLayout__WEBPACK_IMPORTED_MODULE_3__["CanvasLayout"].firstLayoutIndex);
    };
    Object.defineProperty(CanvasFields.prototype, "isVerticalSectionPresent", {
        get: function () {
            return this.getLayout(_canvasLayout__WEBPACK_IMPORTED_MODULE_3__["CanvasLayout"].verticalLayoutIndex).zones.length !== 0;
        },
        enumerable: true,
        configurable: true
    });
    CanvasFields.prototype.instantiateCanvasLayout = function (numberOfLayouts, variantsModuleLoader) {
        var _this = this;
        this.canvasLayouts = new Map();
        for (var i = 1; i <= numberOfLayouts; i++) {
            this.canvasLayouts.set(i, new _canvasLayout__WEBPACK_IMPORTED_MODULE_3__["CanvasLayout"](this.getControlComponentById, function () {
                // If we have to re-render from a layout change, we should always notify something has changed
                _this.handleCanvasChanged();
                _this.render();
            }, i));
        }
    };
    CanvasFields.logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogSource"].create('CanvasStore');
    return CanvasFields;
}());



/***/ }),

/***/ "ez2G":
/*!*********************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvas/CanvasEngagementDataProvider.js ***!
  \*********************************************************************/
/*! exports provided: CanvasEngagementDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasEngagementDataProvider", function() { return CanvasEngagementDataProvider; });
/* harmony import */ var _canvasControl_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../canvasControl/index */ "iO6m");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/Flights */ "qRiB");


/**
 * This is to provide canvas engagement data.
 * @internal
 */
var CanvasEngagementDataProvider = /** @class */ (function () {
    function CanvasEngagementDataProvider() {
    }
    CanvasEngagementDataProvider.canvasEngagementData = function (serializedCanvas) {
        var canvasContent = [];
        if (serializedCanvas) {
            if (_common_Flights__WEBPACK_IMPORTED_MODULE_1__["Flights"].isPageUndoRedoFlightEnabled()) {
                canvasContent = serializedCanvas;
            }
            else {
                canvasContent = JSON.parse(serializedCanvas);
            }
        }
        var numberOfSections = 0;
        var numberOfWebParts = 0;
        var isRTEPresentOnPage = false;
        var isImagePresentOnPage = false;
        var otherWebParts = 0;
        var isSimplePage = false;
        var zoneIndices = new Set();
        canvasContent.forEach(function (control) {
            var isZone = !(control.controlType === _canvasControl_index__WEBPACK_IMPORTED_MODULE_0__["CanvasControlType"].RTE || control.controlType === _canvasControl_index__WEBPACK_IMPORTED_MODULE_0__["CanvasControlType"].WebPartZone);
            var position = control.position;
            if (position) {
                zoneIndices.add(position.zoneIndex);
            }
            if (!isZone) {
                numberOfWebParts++;
                if (control.controlType === _canvasControl_index__WEBPACK_IMPORTED_MODULE_0__["CanvasControlType"].RTE) {
                    isRTEPresentOnPage = true;
                }
                else if (control.webPartId === 'd1d91016-032f-456d-98a4-721247c305e8' /* Image */) {
                    isImagePresentOnPage = true;
                }
                else {
                    otherWebParts++;
                }
            }
        });
        /**
         * The definition of a simple page is it contains at least one RTE or image web part
         * and not any other web part on the page
         */
        if ((isRTEPresentOnPage || isImagePresentOnPage) && otherWebParts === 0) {
            isSimplePage = true;
        }
        numberOfSections += zoneIndices.size;
        return {
            'NumberOfSections': numberOfSections,
            'NumberOfWebParts': numberOfWebParts,
            'IsSimplePage': isSimplePage
        };
    };
    return CanvasEngagementDataProvider;
}());



/***/ }),

/***/ "fT2f":
/*!*********************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasDragZone/DeferredCanvasDragZone.js ***!
  \*********************************************************************************/
/*! exports provided: DeferredCanvasDragZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredCanvasDragZone", function() { return DeferredCanvasDragZone; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CanvasDragZone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CanvasDragZone */ "MCvD");



var DeferredCanvasDragZone = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DeferredCanvasDragZone, _super);
    function DeferredCanvasDragZone(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            editModule: undefined
        };
        return _this;
    }
    DeferredCanvasDragZone.prototype.componentDidMount = function () {
        this._tryEnsureEditModule();
    };
    DeferredCanvasDragZone.prototype.componentDidUpdate = function () {
        this._tryEnsureEditModule();
    };
    DeferredCanvasDragZone.prototype.render = function () {
        var editModule = this.props.isEdit && this.state.editModule
            ? tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ isEnabled: true }, this.state.editModule) : { isEnabled: false };
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_CanvasDragZone__WEBPACK_IMPORTED_MODULE_2__["CanvasDragZone"], { editModule: editModule }, this.props.children));
    };
    DeferredCanvasDragZone.prototype._tryEnsureEditModule = function () {
        // Only load module once when display changed to Edit.
        if (this.props.isEdit && !this._loadModulePromise) {
            this._loadModulePromise = this._loadEditModule();
        }
    };
    DeferredCanvasDragZone.prototype._loadEditModule = function () {
        var _this = this;
        return __webpack_require__.e(/*! import() | sp-canvas-edit */ "sp-canvas-edit").then(__webpack_require__.bind(null, /*! ./index-edit */ "/g48"))
            .then(function (module) {
            _this.setState({
                editModule: {
                    webPartDragZoneUtils: new module.CanvasWebPartDragZoneUtils(function () { return _this.props.store; }),
                    sectionDragZoneUtils: new module.CanvasSectionDragZoneUtils(function () { return _this.props.store; })
                }
            });
        });
    };
    return DeferredCanvasDragZone;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));



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

/***/ "fqJ2":
/*!********************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasAnimations/index.js ***!
  \********************************************************/
/*! exports provided: CanvasRevealObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CanvasRevealObserver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasRevealObserver */ "5WXc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasRevealObserver", function() { return _CanvasRevealObserver__WEBPACK_IMPORTED_MODULE_0__["CanvasRevealObserver"]; });




/***/ }),

/***/ "g+B9":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!../sp-rte/lib/rte/ckeditor/CKTextEditor.css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".cke .cke_top{display:none}.cke_editable{overflow:hidden}[dir=ltr] .cke_editable{text-align:left}[dir=rtl] .cke_editable{text-align:right}.cke_editable .canvasRteResponsiveTable{overflow-x:auto;clear:both}.cke_editable .canvasRteResponsiveTable td[class*=cke_table-faked-selection]{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px;border-style:solid}.cke_editable .canvasRteResponsiveTable .simpleTableStyleNeutral{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid;border-collapse:collapse;color:\"[theme:neutralPrimary, default: #333333]\"}.cke_editable .canvasRteResponsiveTable .simpleTableStyleNeutral :not(.rteEmphasis){background-color:transparent}.cke_editable .canvasRteResponsiveTable .simpleTableStyleNeutral td,.cke_editable .canvasRteResponsiveTable .simpleTableStyleNeutral th,.cke_editable .canvasRteResponsiveTable .simpleTableStyleNeutral tr{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral tr:first-child{border-bottom-width:3px!important;border-color:\"[theme:neutralPrimary, default: #333333]\"!important}.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral tr:first-child td,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral tr:first-child td a,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral tr:first-child td p,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral tr:first-child th,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral tr:first-child th p{font-weight:700}.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral td,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral th,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleNeutral tr{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral tr:first-child{background-color:\"[theme:neutralPrimary, default: #333333]\"}.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral tr:first-child td,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral tr:first-child td a,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral tr:first-child td p,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral tr:first-child th,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral tr:first-child th p{color:\"[theme:white, default: #ffffff]\";font-weight:700}.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral td,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral th,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleNeutral tr{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr:first-child{background-color:\"[theme:neutralPrimary, default: #333333]\"}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr:first-child td,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr:first-child td a,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr:first-child td p,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr:first-child th,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr:first-child th p{color:\"[theme:white, default: #ffffff]\";font-weight:700}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr:nth-child(2n){background-color:\"[theme:neutralQuaternaryAlt, default: #dadada]\"}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral td,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral th,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleNeutral tr{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child{background-color:\"[theme:neutralPrimary, default: #333333]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child td,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child td a,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child td p,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child th,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child th p{color:\"[theme:white, default: #ffffff]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:nth-child(2n){background-color:\"[theme:neutralQuaternaryAlt, default: #dadada]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child td,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child td a,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child td p,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child th,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:first-child th p{font-weight:700}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr:not(:first-child) td:first-child{background-color:\"[theme:neutralTertiaryAlt, default: #c8c8c8]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral td,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral th,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleNeutral tr{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .simpleTableStyleTheme{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px!important;border-style:solid;border-collapse:collapse;color:\"[theme:neutralPrimary, default: #333333]\"}.cke_editable .canvasRteResponsiveTable .simpleTableStyleTheme :not(.rteEmphasis){background-color:transparent}.cke_editable .canvasRteResponsiveTable .simpleTableStyleTheme td,.cke_editable .canvasRteResponsiveTable .simpleTableStyleTheme th,.cke_editable .canvasRteResponsiveTable .simpleTableStyleTheme tr{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme tr:first-child{border-bottom-width:3px!important;border-color:\"[theme:themePrimary, default: #0078d4]\"!important}.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme tr:first-child td,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme tr:first-child td a,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme tr:first-child td p,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme tr:first-child th,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme tr:first-child th p{font-weight:700}.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme td,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme th,.cke_editable .canvasRteResponsiveTable .borderHeaderTableStyleTheme tr{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme tr:first-child{background-color:\"[theme:themePrimary, default: #0078d4]\"}.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme tr:first-child td,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme tr:first-child td a,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme tr:first-child td p,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme tr:first-child th,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme tr:first-child th p{color:\"[theme:white, default: #ffffff]\";font-weight:700}.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme td,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme th,.cke_editable .canvasRteResponsiveTable .filledHeaderTableStyleTheme tr{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr:first-child{background-color:\"[theme:themePrimary, default: #0078d4]\"}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr:first-child td,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr:first-child td a,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr:first-child td p,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr:first-child th,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr:first-child th p{color:\"[theme:white, default: #ffffff]\";font-weight:700}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr:nth-child(2n){background-color:\"[theme:themeLighter, default: #deecf9]\"}.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme td,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme th,.cke_editable .canvasRteResponsiveTable .bandedRowTableStyleTheme tr{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px!important;border-style:solid}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child{background-color:\"[theme:themePrimary, default: #0078d4]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child td,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child td a,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child td p,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child th,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child th p{color:\"[theme:white, default: #ffffff]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:nth-child(2n){background-color:\"[theme:themeLighter, default: #deecf9]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child td,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child td a,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child td p,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child th,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:first-child th p{font-weight:700}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr:not(:first-child) td:first-child{background-color:\"[theme:themeLight, default: #c7e0f4]\"}.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme td,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme th,.cke_editable .canvasRteResponsiveTable .bandedRowColumnTableStyleTheme tr{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px!important;border-style:solid}.cke_editable .tableWrapper{display:block;margin:0}.cke_editable .tableCenterAlign table{margin:0 auto}[dir=ltr] .cke_editable .tableLeftAlign table{margin-left:0}[dir=ltr] [dir=rtl] .cke_editable .tableLeftAlign table,[dir=rtl] .cke_editable .tableLeftAlign table{margin-right:0}[dir=rtl] [dir=rtl] .cke_editable .tableLeftAlign table{margin-left:0}[dir=ltr] [dir=rtl] .cke_editable .tableLeftAlign table{margin-left:auto}[dir=rtl] [dir=rtl] .cke_editable .tableLeftAlign table{margin-right:auto}[dir=ltr] .cke_editable .tableRightAlign table{margin-right:0}[dir=rtl] .cke_editable .tableRightAlign table{margin-left:0}[dir=ltr] .cke_editable .tableRightAlign table{margin-left:auto}[dir=rtl] .cke_editable .tableRightAlign table{margin-right:auto}[dir=ltr] [dir=rtl] .cke_editable .tableRightAlign table{margin-left:0}[dir=rtl] [dir=rtl] .cke_editable .tableRightAlign table{margin-right:0}div[data-cke-temp=\"1\"]{width:2px!important}div[data-cke-temp=\"1\"]:hover{background-color:\"[theme:themePrimary, default: #0078d4]\"!important;opacity:1!important;display:block!important}.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleTheme>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleTheme>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleTheme>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleTheme>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleTheme>tr>th{border-color:\"[theme:themePrimary, default: #0078d4]\"!important;border-width:1px!important;border-style:solid}.cke_show_borders .canvasRteResponsiveTable table.cke_show_border,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowColumnTableStyleNeutral>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.bandedRowTableStyleNeutral>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.borderHeaderTableStyleNeutral>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.filledHeaderTableStyleNeutral>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border.simpleTableStyleNeutral>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>tbody>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>tbody>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>tfoot>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>tfoot>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>thead>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>thead>tr>th,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>tr>td,.cke_show_borders .canvasRteResponsiveTable table.cke_show_border>tr>th{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid}[dir=ltr] .cke_editable ol,[dir=ltr] .cke_editable ul{padding-left:50px}[dir=rtl] .cke_editable ol,[dir=rtl] .cke_editable ul{padding-right:50px}[dir=ltr] .cke_editable li:before{margin-left:-19px}[dir=rtl] .cke_editable li:before{margin-right:-19px}[dir=ltr] .cke_editable li:before{margin-right:4px}[dir=rtl] .cke_editable li:before{margin-left:4px}[dir=ltr] .cke_editable li:before{text-align:right}[dir=rtl] .cke_editable li:before{text-align:left}.cke_editable ol{counter-reset:item}.cke_editable ol>li{counter-increment:item}.cke_editable ol ol>li{display:block}.cke_editable ol ol>li:before{content:counter(item,lower-alpha) \". \"}.cke_editable table,.cke_editable td,.cke_editable th,.cke_editable tr{border-color:\"[theme:neutralPrimary, default: #333333]\"!important;border-width:1px!important;border-style:solid;border-collapse:collapse}.cke_editable table{margin-bottom:10px}.cke_editable td,.cke_editable td p,.cke_editable th,.cke_editable th p{font-size:15px;color:\"[theme:neutralPrimary, default: #333333]\";white-space:normal;font-weight:400;margin:0}.cke_editable th{font-weight:600;text-align:center}.cke_editable td,.cke_editable th{padding-top:8px;padding-bottom:8px;width:75px}[dir=ltr] .cke_editable td,[dir=ltr] .cke_editable th{padding-left:8px}[dir=rtl] .cke_editable td,[dir=rtl] .cke_editable th{padding-right:8px}[dir=ltr] .cke_editable td,[dir=ltr] .cke_editable th{padding-right:16px}[dir=ltr] [dir=rtl] .cke_editable td,[dir=ltr] [dir=rtl] .cke_editable th,[dir=rtl] .cke_editable td,[dir=rtl] .cke_editable th{padding-left:16px}[dir=rtl] [dir=rtl] .cke_editable td,[dir=rtl] [dir=rtl] .cke_editable th{padding-right:16px}[dir=ltr] [dir=rtl] .cke_editable td,[dir=ltr] [dir=rtl] .cke_editable th{padding-right:8px}[dir=rtl] [dir=rtl] .cke_editable td,[dir=rtl] [dir=rtl] .cke_editable th{padding-left:8px}.cke_editable td[valign=top]{padding-top:8px;padding-bottom:0}[dir=ltr] .cke_editable td[valign=top]{padding-left:8px}[dir=rtl] .cke_editable td[valign=top]{padding-right:8px}[dir=ltr] .cke_editable td[valign=top]{padding-right:16px}[dir=rtl] .cke_editable td[valign=top]{padding-left:16px}.cke_editable td[valign=bottom]{padding-top:0;padding-bottom:8px}[dir=ltr] .cke_editable td[valign=bottom]{padding-left:8px}[dir=rtl] .cke_editable td[valign=bottom]{padding-right:8px}[dir=ltr] .cke_editable td[valign=bottom]{padding-right:16px}[dir=rtl] .cke_editable td[valign=bottom]{padding-left:16px}.cke_editable td[align=center],.cke_editable td p[style*=\"text-align:center\"],.cke_editable td p[style*=\"text-align: center\"]{padding:8px 16px}.cke_editable td[align=left],.cke_editable td p[style*=\"text-align:left\"],.cke_editable td p[style*=\"text-align: left\"]{padding:8px 16px 8px 8px}.cke_editable td[align=right],.cke_editable td p[style*=\"text-align:right\"],.cke_editable td p[style*=\"text-align: right\"]{padding:8px 8px 8px 16px}.cke_editable tr td th:nth-last-child(n+20):first-child,.cke_editable tr td th:nth-last-child(n+20):first-child~*{padding:4px!important;font-size:10px!important}[dir=ltr] .cke_editable .ql-indent-1{padding-left:40px}[dir=rtl] .cke_editable .ql-indent-1{padding-right:40px}[dir=ltr] .cke_editable li.ql-indent-1{padding-left:59px}[dir=rtl] .cke_editable li.ql-indent-1{padding-right:59px}[dir=ltr] .cke_editable .ql-indent-2{padding-left:80px}[dir=rtl] .cke_editable .ql-indent-2{padding-right:80px}[dir=ltr] .cke_editable li.ql-indent-2{padding-left:99px}[dir=rtl] .cke_editable li.ql-indent-2{padding-right:99px}[dir=ltr] .cke_editable .ql-indent-3{padding-left:120px}[dir=rtl] .cke_editable .ql-indent-3{padding-right:120px}[dir=ltr] .cke_editable li.ql-indent-3{padding-left:139px}[dir=rtl] .cke_editable li.ql-indent-3{padding-right:139px}[dir=ltr] .cke_editable .ql-indent-4{padding-left:160px}[dir=rtl] .cke_editable .ql-indent-4{padding-right:160px}[dir=ltr] .cke_editable li.ql-indent-4{padding-left:179px}[dir=rtl] .cke_editable li.ql-indent-4{padding-right:179px}[dir=ltr] .cke_editable .ql-indent-5{padding-left:200px}[dir=rtl] .cke_editable .ql-indent-5{padding-right:200px}[dir=ltr] .cke_editable li.ql-indent-5{padding-left:219px}[dir=rtl] .cke_editable li.ql-indent-5{padding-right:219px}[dir=ltr] .cke_editable .ql-indent-6{padding-left:240px}[dir=rtl] .cke_editable .ql-indent-6{padding-right:240px}[dir=ltr] .cke_editable li.ql-indent-6{padding-left:259px}[dir=rtl] .cke_editable li.ql-indent-6{padding-right:259px}[dir=ltr] .cke_editable .ql-indent-7{padding-left:280px}[dir=rtl] .cke_editable .ql-indent-7{padding-right:280px}[dir=ltr] .cke_editable li.ql-indent-7{padding-left:299px}[dir=rtl] .cke_editable li.ql-indent-7{padding-right:299px}[dir=ltr] .cke_editable .ql-indent-8{padding-left:320px}[dir=rtl] .cke_editable .ql-indent-8{padding-right:320px}[dir=ltr] .cke_editable li.ql-indent-8{padding-left:339px}[dir=rtl] .cke_editable li.ql-indent-8{padding-right:339px}[dir=ltr] .cke_editable .ql-align-right{text-align:right}[dir=rtl] .cke_editable .ql-align-right{text-align:left}.cke_editable .ql-align-center{text-align:center}.cke_editable .fontColorRedDark{color:\"[theme:redDark, default: #a80000]\"}.cke_editable .fontColorRed{color:\"[theme:red, default: #e81123]\"}.cke_editable .fontColorYellow{color:\"[theme:yellow, default: #ffb900]\"}.cke_editable .fontColorYellowLight{color:\"[theme:yellowLight, default: #fff100]\"}.cke_editable .fontColorGreenLight{color:\"[theme:greenLight, default: #bad80a]\"}.cke_editable .fontColorGreen{color:\"[theme:green, default: #107c10]\"}.cke_editable .fontColorBlueLight{color:\"[theme:blueLight, default: #00bcf2]\"}.cke_editable .fontColorBlue{color:\"[theme:blue, default: #0078d4]\"}.cke_editable .fontColorBlueDark{color:\"[theme:blueDark, default: #002050]\"}.cke_editable .fontColorPurple{color:\"[theme:purple, default: #5c2d91]\"}.cke_editable .fontColorNeutralDark{color:\"[theme:neutralDark, default: #212121]\"}.cke_editable .fontColorNeutralPrimary{color:\"[theme:neutralPrimary, default: #333333]\"}.cke_editable .fontColorNeutralPrimaryAlt{color:\"[theme:neutralPrimaryAlt, default: #3c3c3c]\"}.cke_editable .fontColorNeutralSecondary{color:\"[theme:neutralSecondary, default: #666666]\"}.cke_editable .fontColorNeutralTertiary{color:\"[theme:neutralTertiary, default: #a6a6a6]\"}.cke_editable .fontColorThemeDarker{color:\"[theme:themeDarker, default: #004578]\"}.cke_editable .fontColorThemeDark{color:\"[theme:themeDark, default: #005a9e]\"}.cke_editable .fontColorThemeDarkAlt{color:\"[theme:themeDarkAlt, default: #106ebe]\"}.cke_editable .fontColorThemePrimary{color:\"[theme:themePrimary, default: #0078d4]\"}.cke_editable .fontColorThemeSecondary{color:\"[theme:themeSecondary, default: #2b88d8]\"}.cke_editable .fontSizeSmall{font-size:12px}.cke_editable .fontSizeMedium{font-size:14px}.cke_editable .fontSizeMediumPlus{font-size:15px}.cke_editable .fontSizeLarge{font-size:17px}.cke_editable .fontSizeXLarge{font-size:21px}.cke_editable .fontSizeXLargePlus{font-size:24px}.cke_editable .fontSizeXxLarge{font-size:28px}.cke_editable .fontSizeXxxLarge{font-size:32px}.cke_editable .fontSizeXxLargePlus{font-size:36px}.cke_editable .fontSizeSuper{font-size:42px}.cke_editable .fontSizeMedium,.cke_editable .fontSizeMediumPlus,.cke_editable .fontSizeSmall,.cke_editable .fontSizeSuper,.cke_editable .fontSizeXxLargePlus,.cke_editable .fontSizeXxxLarge{line-height:1.3}.cke_editable .highlightColorYellow{background-color:#ff0}.cke_editable .highlightColorGreen{background-color:#0f0}.cke_editable .highlightColorAqua{background-color:#0ff}.cke_editable .highlightColorMagenta{background-color:#f0f}.cke_editable .highlightColorBlue{background-color:#00f}.cke_editable .highlightColorRed{background-color:red}.cke_editable .highlightColorDarkBlue{background-color:navy}.cke_editable .highlightColorTeal{background-color:teal}.cke_editable .highlightColorDarkGreen{background-color:green}.cke_editable .highlightColorPurple{background-color:purple}.cke_editable .highlightColorMaroon{background-color:maroon}.cke_editable .highlightColorGold{background-color:olive}.cke_editable .highlightColorDarkGrey{background-color:grey}.cke_editable .highlightColorGrey{background-color:silver}.cke_editable .highlightColorBlack{background-color:#000}@media only screen and (max-width:640px){.cke_editable table,.cke_editable td,.cke_editable th{padding:8px!important;white-space:normal}.cke_editable table{max-width:600px!important}.cke_editable td p,.cke_editable td p span,.cke_editable th p,.cke_editable th p span{font-size:12px!important}}.cke_editable .ms-missinglink{text-decoration:none;background-image:-webkit-gradient(linear,left top,right top,color-stop(75%,\"[theme:themePrimary, default: #0078d4]\"),color-stop(75%,transparent));background-image:linear-gradient(90deg,\"[theme:themePrimary, default: #0078d4]\" 75%,transparent 0);background-position:0 1.12em;background-repeat:repeat-x;background-size:8px 1px}.isFluentRTE td,.isFluentRTE td p,.isFluentRTE th,.isFluentRTE th p{font-size:18px;font-weight:400}.isFluentRTE .fontSizeXSmall{font-size:10px}.isFluentRTE .fontSizeSmall{font-size:12px}.isFluentRTE .fontSizeMedium{font-size:14px}.isFluentRTE .fontSizeMediumPlus{font-size:16px}.isFluentRTE .fontSizeLarge{font-size:18px}.isFluentRTE .fontSizeXLarge{font-size:20px}.isFluentRTE .fontSizeXLargePlus{font-size:24px}.isFluentRTE .fontSizeXxLarge{font-size:28px}.isFluentRTE .fontSizeXxxLarge{font-size:32px}.isFluentRTE .fontSizeXxLargePlus{font-size:36px}.isFluentRTE .fontSizeSuper{font-size:42px}.isFluentRTE .fontSizeMega{font-size:68px}.isFluentRTE .fontSizeMedium,.isFluentRTE .fontSizeMediumPlus,.isFluentRTE .fontSizeMega,.isFluentRTE .fontSizeSmall,.isFluentRTE .fontSizeSuper,.isFluentRTE .fontSizeXSmall,.isFluentRTE .fontSizeXxLargePlus,.isFluentRTE .fontSizeXxxLarge{line-height:1.4}", ""]);



/***/ }),

/***/ "hiL/":
/*!*********************************************!*\
  !*** external "@ms/sp-component-utilities" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_hiL___;

/***/ }),

/***/ "iO6m":
/*!*****************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasControl/index.js ***!
  \*****************************************************/
/*! exports provided: CanvasControlType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CanvasControlType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasControlType */ "rRNS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasControlType", function() { return _CanvasControlType__WEBPACK_IMPORTED_MODULE_0__["CanvasControlType"]; });




/***/ }),

/***/ "iiHs":
/*!**********************************!*\
  !*** external "@ms/sp-dragzone" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_iiHs__;

/***/ }),

/***/ "j0qU":
/*!*******************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasComponent/index.js ***!
  \*******************************************************/
/*! exports provided: CanvasComponent, CreateEmptyZoneLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CanvasComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasComponent */ "AS1P");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasComponent", function() { return _CanvasComponent__WEBPACK_IMPORTED_MODULE_0__["CanvasComponent"]; });

/* harmony import */ var _CreateEmptyZoneLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateEmptyZoneLayout */ "EEYx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreateEmptyZoneLayout", function() { return _CreateEmptyZoneLayout__WEBPACK_IMPORTED_MODULE_1__["CreateEmptyZoneLayout"]; });





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

/***/ "kGU/":
/*!****************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasDiff/DeferredDiffIndicator.js ***!
  \****************************************************************************/
/*! exports provided: DeferredDiffIndicator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredDiffIndicator", function() { return DeferredDiffIndicator; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DeferredCanvasDiff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DeferredCanvasDiff */ "o0cL");



// tslint:disable-next-line:variable-name
var DeferredComponent = react__WEBPACK_IMPORTED_MODULE_1__["lazy"](function () { return Object(_DeferredCanvasDiff__WEBPACK_IMPORTED_MODULE_2__["canvasDiffLoader"])().then(function (module) { return ({ default: module.DiffIndicator }); }); });
/**
 * @internal
 */
function DeferredDiffIndicator(props) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Suspense"], { fallback: false },
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](DeferredComponent, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props))));
}


/***/ }),

/***/ "kQ9N":
/*!***********************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasStore/CorruptSectionFactorFixer.js ***!
  \***********************************************************************/
/*! exports provided: CorruptSectionFactorFixer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CorruptSectionFactorFixer", function() { return CorruptSectionFactorFixer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _canvasLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../canvasLayout */ "yPt8");




/**
 * This is workaround for [VSO#689576](https://onedrive.visualstudio.com/WEX!/_workitems/edit/689576)
 *  Canvas sometimes saves/displays in an unachievable layout (not 1, 1/2, 1/3, 2/3, but other)
 * [Pull request](https://onedrive.visualstudio.com/SPPPlat/_git/sp-client/pullrequest/234497?_a=overview)
 *  fixed the issue where section factor for newly added web part can be undefined unexpectedly.
 * CanvasLayout has assumption that all controls within same section should all have same section factor.
 * This workaround is to recover the web parts whose section factors are undefined while there is control
 *  within same section has defined section factor.
 * We added telemetry at the same time in hope this workaround can be removed some day when number is very low.
 */
var CorruptSectionFactorFixer = /** @class */ (function () {
    function CorruptSectionFactorFixer(controls) {
        var _this = this;
        this._controls = controls;
        // Fill layout index for old web parts.
        this._controls.forEach(function (control) {
            if (control.position.layoutIndex === undefined) {
                control.position = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, control.position, { layoutIndex: _canvasLayout__WEBPACK_IMPORTED_MODULE_3__["CanvasLayout"].firstLayoutIndex });
            }
        });
        this._isAnyControlInBadState = this._controls
            .some(function (control, index) { return _this._isControlWithBadSectionFactor(index); });
    }
    CorruptSectionFactorFixer.prototype.logEngagement = function () {
        var _this = this;
        var numberOfBadControls = this._controls
            .filter(function (control, index) { return _this._isControlWithBadSectionFactor(index); })
            .length;
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_EngagementLogger"].logEventWithLogEntry(new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogEntry"]('CanvasControls', 'CheckBadSectionFactor', _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogType"].Event, {
            numberOfBadControls: String(numberOfBadControls)
        }));
    };
    CorruptSectionFactorFixer.prototype.getSectionFactorFixedControls = function () {
        if (this._isAnyControlInBadState) {
            this._fixControlsWithBadSectionFactor();
        }
        return this._controls;
    };
    CorruptSectionFactorFixer.prototype._fixControlsWithBadSectionFactor = function () {
        var _this = this;
        this._controls.forEach(function (control, index) {
            control.position = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, control.position, { sectionFactor: _this._getExpectedSectionFactorForControlAt(index) });
        });
    };
    CorruptSectionFactorFixer.prototype._isControlWithBadSectionFactor = function (index) {
        return this._getExpectedSectionFactorForControlAt(index) !== this._controls[index].position.sectionFactor;
    };
    CorruptSectionFactorFixer.prototype._getExpectedSectionFactorForControlAt = function (currentIndex) {
        var current = this._controls[currentIndex];
        if (current.position.sectionFactor === undefined) {
            // The index of another control within same section whose section factor is defined.
            var goodControlIndex = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["findIndex"])(this._controls, function (control, index) {
                return index !== currentIndex &&
                    control.position.layoutIndex === current.position.layoutIndex &&
                    control.position.zoneIndex === current.position.zoneIndex &&
                    control.position.sectionIndex === current.position.sectionIndex &&
                    control.position.sectionFactor !== undefined;
            });
            if (goodControlIndex > -1) {
                return this._controls[goodControlIndex].position.sectionFactor;
            }
        }
        return current.position.sectionFactor;
    };
    return CorruptSectionFactorFixer;
}());



/***/ }),

/***/ "kel/":
/*!**************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasDiff/DeferredDiffMessage.js ***!
  \**************************************************************************/
/*! exports provided: DeferredDiffMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredDiffMessage", function() { return DeferredDiffMessage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DeferredCanvasDiff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DeferredCanvasDiff */ "o0cL");



// tslint:disable-next-line:variable-name
var DeferredComponent = react__WEBPACK_IMPORTED_MODULE_1__["lazy"](function () { return Object(_DeferredCanvasDiff__WEBPACK_IMPORTED_MODULE_2__["canvasDiffLoader"])().then(function (module) { return ({ default: module.DiffMessage }); }); });
/**
 * @internal
 */
function DeferredDiffMessage(props) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Suspense"], { fallback: false },
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](DeferredComponent, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props))));
}


/***/ }),

/***/ "khFG":
/*!************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasLayout/getZonePositionUniqString.js ***!
  \************************************************************************/
/*! exports provided: getZonePositionUniqString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getZonePositionUniqString", function() { return getZonePositionUniqString; });
function getZonePositionUniqString(zonePosition) {
    return zonePosition.layoutIndex + "_" + zonePosition.zoneIndex;
}


/***/ }),

/***/ "kvcB":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/sp-canvas/canvas/canvasComponent/CanvasComponent.css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".grid{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 8px}.grid:after,.grid:before{display:table;content:\"\";line-height:0}.grid:after{clear:both}.UpdateEditTop{margin-top:14px}.CanvasComponentWrapper{display:block;max-width:1648px}.CanvasComponentWrapper.CenterAligned{margin:0 auto}.CanvasComponentMain{width:100%}.CanvasVerticalSectionContainer{width:100%;min-width:312px;min-height:100%}.Canvas-slideUpIn{-webkit-animation-name:Canvas-fadeIn,Canvas-slideUp;animation-name:Canvas-fadeIn,Canvas-slideUp;-webkit-animation-duration:367ms;animation-duration:367ms;-webkit-animation-timing-function:cubic-bezier(.1,.9,.2,1);animation-timing-function:cubic-bezier(.1,.9,.2,1);-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-delay:.1s;animation-delay:.1s}@-webkit-keyframes Canvas-slideUp{0%{-webkit-transform:translate3d(0,20px,0);transform:translate3d(0,20px,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes Canvas-slideUp{0%{-webkit-transform:translate3d(0,20px,0);transform:translate3d(0,20px,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@-webkit-keyframes Canvas-fadeIn{0%{opacity:0}to{opacity:1}}@keyframes Canvas-fadeIn{0%{opacity:0}to{opacity:1}}@media screen and (min-width:1366px){.CanvasComponentWrapper{display:-webkit-box;display:-ms-flexbox;display:flex}.CanvasComponentWrapper.CanvasComponentWrapper--reflow{display:block}.CanvasComponentMain{width:75%}.CanvasComponentMain.isEdit{margin-top:32px}.CanvasComponentMain.CanvasComponentMain--reflow{width:100%}.CanvasVerticalSectionContainer{width:25%}.CanvasVerticalSectionContainer.CanvasVerticalSectionContainer--reflow{width:100%}[dir=ltr] .CanvasVerticalSectionContainer.CanvasVerticalSectionContainer--reflow{padding-left:32px}[dir=rtl] .CanvasVerticalSectionContainer.CanvasVerticalSectionContainer--reflow{padding-right:32px}}", ""]);



/***/ }),

/***/ "lHr1":
/*!********************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/SPRteStyles.styles.js ***!
  \********************************************************************/
/*! exports provided: SPRteStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPRteStyles", function() { return SPRteStyles; });
/* harmony import */ var _common_StyleHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/StyleHelpers */ "wFVB");

var SPRteStyles = /** @class */ (function () {
    function SPRteStyles() {
    }
    SPRteStyles.getClassNames = function (props) {
        return Object(_common_StyleHelpers__WEBPACK_IMPORTED_MODULE_0__["getClassNames"])(SPRteStyles._getStyles, props);
    };
    SPRteStyles._getStyles = function (props) {
        var emphasisTheme = props.emphasisTheme, theme = props.theme, root = props.root;
        var semanticColors = emphasisTheme.semanticColors;
        return {
            root: [
                root,
                'rteEmphasis',
                {
                    selectors: {
                        '& h2, & h3, & h4, & div, & p, & ol, & ul, & pre': {
                            color: semanticColors.bodyText
                        },
                        '& a': {
                            color: semanticColors.link,
                            selectors: {
                                '&.hover': {
                                    color: semanticColors.linkHovered
                                }
                            }
                        },
                        '& blockquote': {
                            color: semanticColors.bodySubtext,
                            borderBottom: "1px solid " + semanticColors.bodyDivider,
                            borderTop: "1px solid " + semanticColors.bodyDivider
                        },
                        '& table': {
                            // Tables need to get background color from global theme object
                            backgroundColor: theme.semanticColors.bodyBackground
                        },
                        '& td[class*="cke_table-faked-selection"]': {
                            color: semanticColors.bodyText + " !important"
                        },
                        '& .cke_editable:focus': {
                            selectors: {
                                '& .cke_table-faked-selection': {
                                    color: semanticColors.bodyText + " !important"
                                }
                            }
                        },
                        ':not(:focus):before': {
                            color: semanticColors.bodySubtext
                        },
                        '& pre': {
                            backgroundColor: semanticColors.bodyStandoutBackground,
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        },
                        '.vdd-removed': {
                            backgroundColor: semanticColors.errorBackground,
                            color: semanticColors.bodyText,
                            textDecoration: 'line-through',
                            textDecorationColor: semanticColors.errorText
                        },
                        '.vdd-added': {
                            backgroundColor: semanticColors.successBackground,
                            color: semanticColors.bodyText,
                            textDecoration: 'underline double',
                            textDecorationColor: semanticColors.successText
                        },
                        '.vdd-modified': {
                            backgroundColor: semanticColors.warningBackground,
                            color: semanticColors.bodyText,
                            textDecoration: 'underline wavy',
                            textDecorationColor: semanticColors.warningHighlight
                        }
                    }
                }
            ]
        };
    };
    return SPRteStyles;
}());



/***/ }),

/***/ "lJmH":
/*!*******************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasZone/CanvasZone.js ***!
  \*******************************************************/
/*! exports provided: CanvasZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasZone", function() { return CanvasZone; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ms/sp-a11y */ "ytfe");
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _canvasLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../canvasLayout */ "yPt8");
/* harmony import */ var _canvasSection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../canvasSection */ "JqQl");
/* harmony import */ var _editChunk__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../editChunk */ "9s5w");
/* harmony import */ var _canvasControl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../canvasControl */ "iO6m");
/* harmony import */ var _a11y_CanvasA11yConstants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../a11y/CanvasA11yConstants */ "AqUB");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../common/Flights */ "qRiB");
/* harmony import */ var _common_CanvasEmphasis_CanvasEmphasis__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../common/CanvasEmphasis/CanvasEmphasis */ "pJUF");
/* harmony import */ var _common_CanvasEmphasis_CanvasEmphasisStyles_styles__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../common/CanvasEmphasis/CanvasEmphasisStyles.styles */ "Vb88");
/* harmony import */ var _common_CanvasAlignmentStyles_styles__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../common/CanvasAlignmentStyles.styles */ "PBv6");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../common/KillSwitches */ "17t3");
/* harmony import */ var _CanvasZone_resx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./CanvasZone.resx */ "7u9b");
/* harmony import */ var _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../loc/CanvasStrings.resx */ "K08d");
/* harmony import */ var _CanvasZone_scss__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./CanvasZone.scss */ "Kw1M");
/**
 * @file CanvasZoneComponent.tsx
 * @copyright (c) Microsoft Corporation. All rights reserved.
 */




















/**
 * Represents a Zone layout component
 */
var CanvasZone = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CanvasZone, _super);
    function CanvasZone(props) {
        var _this = _super.call(this, props) || this;
        _this._domElementRef = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._focusableElementRef = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._registerPropertyPanePromise = Promise.resolve();
        _this.focus = function () {
            var store = _this.props.store;
            /**
             * Focus on the focusable child if specifically defined
             * Otherwise let a11yManager handle through standard logic
             */
            if (_this._focusableElementRef && _this._focusableElementRef.current) {
                _this._focusableElementRef.current.focus();
            }
            else if (_this._domElement) {
                store.a11yManager.focusTo(_this._domElement);
            }
        };
        _this.handleScroll = function () {
            var store = _this.props.store;
            var zoneRect = _this._domElement.getBoundingClientRect();
            var canvasRect = store.canvasElement.getBoundingClientRect();
            var stickTop = store.scrollableParent.getBoundingClientRect().top;
            // make the toolbar fixed if the fixed position is between top-bottom of current section
            var shouldToolbarStick = stickTop > zoneRect.top &&
                !!_this._toolbarComponent &&
                stickTop < zoneRect.bottom - _this._toolbarComponent.getHeight();
            if (shouldToolbarStick !== _this.state.isToolbarFixed) {
                _this.setState({
                    isToolbarFixed: shouldToolbarStick,
                    fixedPosition: shouldToolbarStick
                        ? {
                            top: stickTop,
                            left: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["getRTL"])() ? canvasRect.right - 32 /* toolbar width */ : canvasRect.left
                        }
                        : undefined
                });
            }
        };
        _this._refreshPropertyPane = function () {
            void _this._registerPropertyPanePromise
                .then(function () {
                var propertyPaneController = _this.props.store.propertyPaneController;
                if (propertyPaneController && propertyPaneController.isOpen() &&
                    (_common_KillSwitches__WEBPACK_IMPORTED_MODULE_16__["KillSwitches"].openPropertyPaneOnlyInEdit.isActivated() || _this.props.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Edit)) {
                    propertyPaneController.requestAction(_this._id, propertyPaneController.currentlyConfiguredConsumerId === _this._id
                        ? 5 /* Refresh */
                        : 4 /* Default */);
                }
            });
        };
        _this._ensurePropertyPaneRegistered = function () {
            var _a = _this.props, displayMode = _a.displayMode, store = _a.store, zone = _a.zone;
            var propertyPaneController = store.propertyPaneController;
            if (displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Edit && propertyPaneController) {
                _this._registerPropertyPanePromise = _this._registerPropertyPanePromise
                    .then(_editChunk__WEBPACK_IMPORTED_MODULE_9__["canvasZonePropertyPaneControlLoader"])
                    .then(function (control) {
                    propertyPaneController.registerConsumer(_this._id, new control(zone, function () {
                        store.canvasFields.handleCanvasChanged();
                        store.canvasFields.render();
                    }, store.variantsModuleLoader, _this.props.layoutIndex));
                });
            }
        };
        _this._handleToolbarDidMount = function (toolbar) {
            _this._toolbarComponent = toolbar;
        };
        _this._handleKeydownCapture = function (evt) {
            var store = _this.props.store;
            _this._isTabPressed = false;
            // We avoid calling stopPropagation here because controlZone keydown won't get called if we did
            // and shortcut keys on webparts won't work
            if (_this._domElement) {
                if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_5__["Keyboard"].isEscape(evt)) {
                    store.a11yManager.focusTo(_this._domElement);
                    store.a11yManager.alert(_this._zoneLabel);
                    evt.preventDefault();
                }
                else if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_5__["Keyboard"].isKey(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].f10, evt, { alt: true }) &&
                    _this._toolbarComponent &&
                    _this._toolbarComponent.toolBarElement) {
                    store.a11yManager.focusTo(_this._toolbarComponent.toolBarElement);
                    store.a11yManager.alert(_loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].ToolbarNavigationArrowKeys);
                    evt.preventDefault();
                }
                else if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_5__["Keyboard"].isKey(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].p, evt, { alt: true }) && _this._isCanvasZoneActive) {
                    _this._onToolbarEditClick();
                    evt.preventDefault();
                }
                else if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_5__["Keyboard"].isTab(evt) || _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_5__["Keyboard"].isShiftTab(evt)) {
                    _this._isTabPressed = true;
                }
                else if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_5__["Keyboard"].isEnter(evt) && evt.target === _this._domElement) {
                    _this._clearAccessibleLabel();
                }
            }
        };
        _this._handleZoneFocus = function (evt) {
            var displayMode = _this.props.displayMode;
            if (displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Edit &&
                document.activeElement &&
                (document.activeElement === _this._domElement || document.activeElement.parentElement === _this._domElement)) {
                if (_this.state.accessibleLabel === '') {
                    _this.setState({
                        accessibleLabel: _this._zoneLabel
                    });
                }
                _this._selectZone();
            }
            _this._updateHorizontalOffset();
        };
        _this._handleZoneBlur = function (evt) {
            var store = _this.props.store;
            // If the tab is pressed and user has navigated away from the zone, unselect it
            var relatedTarget = evt.relatedTarget;
            var target = evt.target;
            if (_this._isTabPressed && !_this._isChildElement(relatedTarget)) {
                store.selectedZoneIndex = -1;
            }
            _this._isTabPressed = false;
            if (_this._toolbarComponent &&
                _this._toolbarComponent.toolBarElement &&
                _this._toolbarComponent.toolBarElement.contains(relatedTarget) &&
                !_this._toolbarComponent.toolBarElement.contains(target) // Do Not alert if focusing moving within toolbar
            ) {
                store.a11yManager.alert(_loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].ToolbarNavigationArrowKeys);
            }
        };
        _this._onToolbarEditClick = function () {
            var _a = _this.props, store = _a.store, zone = _a.zone;
            if (zone && zone.index !== undefined) {
                store.handleConfigureZoneButtonClicked(_this._id, _this.focus);
                _this._selectZone();
            }
        };
        /* tslint:disable-next-line:no-any */
        _this._handleClickCapture = function (e) {
            if (e.target !== _this._domElement && e.target.getAttribute('data-negative-space') !== 'true') {
                return;
            }
            if (_this.props.zone && _this.props.zone.index !== undefined) {
                _this._selectZone();
            }
        };
        _this._clearAccessibleLabel = function () {
            // Clear the accessible text
            _this._async.setTimeout(function () {
                _this.setState({
                    accessibleLabel: ''
                });
            }, 100);
        };
        _this.state = {
            accessibleLabel: '',
            emphasisTheme: _this.props.theme,
            isToolbarFixed: false,
            horizontalOffset: _this._horizontalOffset
        };
        _this._id = props.zone.id;
        _this._isTabPressed = false;
        CanvasZone_1._isCleanSelectionModel = props.store.canvasFields.isCleanSelectionEnabled;
        return _this;
    }
    CanvasZone_1 = CanvasZone;
    CanvasZone.prototype.componentDidMount = function () {
        var _a = this.props, emphasis = _a.emphasis, selectedPosition = _a.selectedPosition, zone = _a.zone;
        this._ensurePropertyPaneRegistered();
        if (this._domElement) {
            this._domElement.addEventListener('keydown', this._handleKeydownCapture, true);
            this._domElement.addEventListener('focus', this._handleZoneFocus, true);
            this._domElement.addEventListener('blur', this._handleZoneBlur, true);
            if (zone &&
                document.activeElement &&
                selectedPosition.zoneIndex === zone.index &&
                !this._isChildElement(document.activeElement)) {
                this.focus();
                if (this._isZoneOnlySelected(this.props.selectedPosition)) {
                    this._refreshPropertyPane();
                }
            }
        }
        if (emphasis) {
            // Todo#661360 Fix workaround left-over
            this._updateEmphasisTheme(this.props.theme, emphasis);
        }
    };
    CanvasZone.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, emphasis = _a.emphasis, layoutType = _a.layoutType, theme = _a.theme;
        if ((_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled() || emphasis || emphasis === 0 /* None */) &&
            (prevProps.emphasis !== emphasis || !Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_6__["isEqual"])(prevProps.theme, theme))) {
            // The emphasis on zone needs to be updated if:
            // 1. The user has changed the emphasis on the zone
            // 2. If the theme passed in by @customizable is updated.
            this._updateEmphasisTheme(theme, emphasis); // Todo#661360 Fix workaround left-over
        }
        else if (!Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_6__["isEqual"])(prevProps.theme, theme)) {
            // We need to do this when there is no emphasis but theme changed from default
            // to the actual one set by user. If we don't do this, default theme gets picked up
            this.setState({
                emphasisTheme: theme
            });
        }
        this._updateHorizontalOffset();
        // It's not sufficient to only check registration in `componentDidMount`
        // Property pane is not loaded in read mode, we need to register it when property pane
        // is loaded after display mode is switched to edit.
        // CanvasZonePart can be re-constructed even it's the same CanvasZone component.
        if (prevProps.zone !== this.props.zone ||
            (prevProps.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Read && this.props.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Edit)) {
            this._ensurePropertyPaneRegistered();
        }
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled() &&
            (prevProps.emphasis !== emphasis ||
                prevProps.layoutType !== layoutType ||
                (!this._isZoneOnlySelected(prevProps.selectedPosition) && this._isZoneOnlySelected(this.props.selectedPosition)))) {
            // Update property pane if any of the zone property pane fields is changed.
            this._refreshPropertyPane();
        }
    };
    CanvasZone.prototype.componentWillUnmount = function () {
        var _this = this;
        if (this._domElement) {
            this._domElement.removeEventListener('keydown', this._handleKeydownCapture, true);
            this._domElement.removeEventListener('focus', this._handleZoneFocus, true);
            this._domElement.removeEventListener('blur', this._handleZoneBlur, true);
        }
        var propertyPaneController = this.props.store.propertyPaneController;
        if (propertyPaneController) {
            // Clear the property pane if it's opened for the current zone.
            void this._registerPropertyPanePromise
                .then(function () { return propertyPaneController.onConsumerDelete(_this._id); });
        }
    };
    CanvasZone.prototype.render = function () {
        var _a = this.props, displayMode = _a.displayMode, selectedPosition = _a.selectedPosition, store = _a.store, zone = _a.zone;
        var emphasisTheme = this.state.emphasisTheme;
        var classNames;
        classNames = _common_CanvasEmphasis_CanvasEmphasisStyles_styles__WEBPACK_IMPORTED_MODULE_14__["CanvasEmphasisStyles"].getClassNames({
            root: 'CanvasZoneContainerEmphasis',
            theme: emphasisTheme // Todo#661360 Fix workaround left-over
        });
        var isToolboxOpen = !!store.canvasFields.toolboxOpenPosition;
        var isControlWithinZoneSelected = Boolean(zone &&
            selectedPosition.zoneIndex === zone.index &&
            (!!selectedPosition.controlIndex || isToolboxOpen));
        isControlWithinZoneSelected =
            isControlWithinZoneSelected && selectedPosition.layoutIndex === this.props.layoutIndex;
        var isReadMode = displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Read;
        var containerSelected = this._isZoneOnlySelected(this.props.selectedPosition) || isControlWithinZoneSelected;
        var layoutZoneContainerClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])('CanvasZoneContainer', 'CanvasZoneContainer--hintUpdate', classNames ? classNames.root : undefined, {
            'CanvasZoneContainer--read': isReadMode,
            // Extra class for flighted control
            'CanvasZoneContainer--selected': this._isCleanSelectionModelEnabled && containerSelected,
            'CanvasZoneContainer--nonselected': this._isCleanSelectionModelEnabled && !containerSelected
        });
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: layoutZoneContainerClassName, onClickCapture: !isReadMode ? this._handleClickCapture : undefined, ref: this._domElementRef, "data-negative-space": true }, this._zoneContents));
    };
    Object.defineProperty(CanvasZone.prototype, "_isCleanSelectionModelEnabled", {
        get: function () {
            var displayMode = this.props.displayMode;
            var isReadMode = displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Read;
            return CanvasZone_1._isCleanSelectionModel && !isReadMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasZone.prototype, "_sectionComponents", {
        get: function () {
            // Iterate through the sections and create section layout components
            var store = this.props.store;
            var _a = this.props, fullWidth = _a.fullWidth, layoutIndex = _a.layoutIndex, selectedPosition = _a.selectedPosition, theme = _a.theme, zone = _a.zone;
            var emphasisTheme = this.state.emphasisTheme;
            // Iterate through the sections and create section layout components
            var sectionComponents = [];
            var sections = zone ? zone.sections : [];
            sections.forEach(function (curSection, curIdx) {
                var sectionComponentProps = {
                    emphasisTheme: emphasisTheme,
                    layoutIndex: layoutIndex,
                    section: curSection,
                    selectedPosition: selectedPosition,
                    theme: theme,
                    zoneIndex: zone.index,
                    store: store
                };
                if (fullWidth) {
                    sectionComponents.push(react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_canvasSection__WEBPACK_IMPORTED_MODULE_8__["CanvasFullWidthSection"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, sectionComponentProps, { key: curSection.index })));
                }
                else {
                    sectionComponents.push(react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_canvasSection__WEBPACK_IMPORTED_MODULE_8__["CanvasSection"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, sectionComponentProps, { key: curSection.index })));
                }
            });
            return sectionComponents;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasZone.prototype, "_zoneContents", {
        get: function () {
            var _a = this.props, displayMode = _a.displayMode, store = _a.store;
            var _b = this.props, fullWidth = _b.fullWidth, layoutIndex = _b.layoutIndex, selectedPosition = _b.selectedPosition, shouldCenterAlign = _b.shouldCenterAlign, zone = _b.zone;
            var emphasisTheme = this.state.emphasisTheme;
            var isZoneOnlySelected = Boolean(zone && selectedPosition.zoneIndex === zone.index && !selectedPosition.controlIndex);
            var isToolboxOpen = !!store.canvasFields.toolboxOpenPosition;
            var isControlWithinZoneSelected = Boolean(zone &&
                selectedPosition.zoneIndex === zone.index &&
                (!!selectedPosition.controlIndex || isToolboxOpen));
            isControlWithinZoneSelected =
                isControlWithinZoneSelected && selectedPosition.layoutIndex === this.props.layoutIndex;
            var classNames;
            classNames = _common_CanvasEmphasis_CanvasEmphasisStyles_styles__WEBPACK_IMPORTED_MODULE_14__["CanvasEmphasisStyles"].getClassNames({
                root: 'CanvasZoneContainerEmphasis',
                theme: emphasisTheme // Todo#661360 Fix workaround left-over
            });
            var isReadMode = displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["DisplayMode"].Read;
            var layoutZoneClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])('CanvasZone', 'row', 'CanvasZone--alignment', 'CanvasZone--noMargin', {
                'CanvasZone--edit': !isReadMode,
                'CanvasZone--fullWidth': !!fullWidth,
                'CanvasZone--fullWidth--read': !!fullWidth && isReadMode,
                'CanvasZone--read': isReadMode,
                'CanvasZone--selected': isZoneOnlySelected,
                'CanvasZone--controlSelected': isControlWithinZoneSelected,
                'CanvasZone--empty': zone.isEmpty(),
                'CanvasZone--centerAlign': !!shouldCenterAlign,
                'CanvasZone--reflow': !!this.props.shouldResize,
                'CanvasZone--expandTo1920': _common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].is1920ExpansionFlightEnabled()
            });
            var shouldAlignToolbar = this.props.layoutIndex === _canvasLayout__WEBPACK_IMPORTED_MODULE_7__["CanvasLayout"].firstLayoutIndex &&
                store.canvasFields.isVerticalSectionPresent;
            if (shouldAlignToolbar) {
                classNames = _common_CanvasAlignmentStyles_styles__WEBPACK_IMPORTED_MODULE_15__["CanvasAlignmentStyles"].getToolbarClassNames({
                    root: CanvasZone_1._isCleanSelectionModel ? 'CanvasZoneToolbar-clean' : 'CanvasZoneToolbar',
                    offset: -this.state.horizontalOffset // Todo#661360 Fix workaround left-over
                });
            }
            var zonePosition = {
                zoneIndex: zone.index,
                sectionIndex: undefined,
                controlIndex: undefined,
                layoutIndex: layoutIndex
            };
            var zoneId = zone.index.toString();
            var isVerticalSection = zone.layoutIndex === _canvasLayout__WEBPACK_IMPORTED_MODULE_7__["CanvasLayout"].verticalLayoutIndex;
            var zoneContents = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: layoutZoneClassName, "data-automation-id": 'CanvasZone', "data-drag-tag": _editChunk__WEBPACK_IMPORTED_MODULE_9__["CanvasDragZoneConstants"].zoneDragTag, "data-negative-space": true, tabIndex: isReadMode ? undefined : 0, "aria-label": isReadMode ? undefined : this.state.accessibleLabel, "data-sp-a11y-id": Object(_a11y_CanvasA11yConstants__WEBPACK_IMPORTED_MODULE_11__["getCanvasZoneA11yId"])(zone.index.toString()), ref: this._focusableElementRef },
                this._sectionComponents,
                !isReadMode && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editChunk__WEBPACK_IMPORTED_MODULE_9__["DeferredToolbar"], { directionalHint: !Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["getRTL"])() ? _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["DirectionalHint"].rightCenter : _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["DirectionalHint"].leftCenter, className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(CanvasZone_1._isCleanSelectionModel ? 'CanvasZoneToolbar-clean' : 'CanvasZoneToolbar', shouldAlignToolbar && classNames ? classNames.root : undefined, { FixedToolbar: !!this.state.isToolbarFixed }), configurationButton: {
                        onClick: this._onToolbarEditClick,
                        title: _CanvasZone_resx__WEBPACK_IMPORTED_MODULE_17__["default"].ZoneToolbarConfigButtonTitle,
                        fabricIconKey: this._configurationButtonFabricIconKey
                    }, deleteButton: {
                        onClick: function () { return store.handleDeleteZoneButtonClicked(zonePosition); },
                        title: _CanvasZone_resx__WEBPACK_IMPORTED_MODULE_17__["default"].ZoneToolbarDeleteButtonTitle
                    }, duplicateButton: !CanvasZone_1._isCleanSelectionModel || isVerticalSection ? undefined : {
                        onClick: function () { return store.handleDuplicateZoneButtonClicked(zoneId); },
                        title: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].ToolbarDuplicateSectionTitle
                    }, moveButton: isVerticalSection ? undefined : {
                        title: _CanvasZone_resx__WEBPACK_IMPORTED_MODULE_17__["default"].ZoneToolbarMoveButtonTitle,
                        dragHandleTag: _editChunk__WEBPACK_IMPORTED_MODULE_9__["CanvasDragZoneConstants"].zoneDragHandleTag
                    }, fixedPosition: this.state.fixedPosition, toolbarDidMount: this._handleToolbarDidMount })),
                this._diffIndicator));
            return zoneContents;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasZone.prototype, "_diffIndicator", {
        get: function () {
            if (!_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageVersionEnabled()) {
                return false;
            }
            var _a = this.props, fullWidth = _a.fullWidth, layoutIndex = _a.layoutIndex, store = _a.store, theme = _a.theme, zone = _a.zone;
            var _b = store.canvasFields, controlDiffMap = _b.controlDiffMap, zoneDiffMap = _b.zoneDiffMap;
            var zonePositionString = Object(_canvasLayout__WEBPACK_IMPORTED_MODULE_7__["getZonePositionUniqString"])({
                layoutIndex: layoutIndex,
                zoneIndex: zone.index
            });
            var zoneDiff = zoneDiffMap
                ? zoneDiffMap.get(zonePositionString)
                : undefined;
            if (!zoneDiff) {
                return false;
            }
            if (fullWidth) {
                var controlsInZone = zone.fetchAllControls();
                if (controlsInZone.length) {
                    var firstControlDiff = controlDiffMap
                        ? controlDiffMap.get(controlsInZone[0].id)
                        : undefined;
                    if (firstControlDiff && firstControlDiff.type !== "Identical" /* Identical */) {
                        // If it's full bleed web part, and there is a change on the CanvasZone as well, we should not
                        // render the diff indicator separately as the borders of web part and canvas zone are same.
                        // In this case, we will merge the changes that will be displayed and render indicator
                        // inside ControlZone (not here).
                        return false;
                    }
                }
            }
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editChunk__WEBPACK_IMPORTED_MODULE_9__["DeferredDiffIndicator"], { theme: theme, primaryDiff: zoneDiff }));
        },
        enumerable: true,
        configurable: true
    });
    CanvasZone.prototype._isZoneOnlySelected = function (selectedPosition) {
        var zone = this.props.zone;
        return Boolean(zone && selectedPosition.zoneIndex === zone.index && !selectedPosition.controlIndex);
    };
    Object.defineProperty(CanvasZone.prototype, "_domElement", {
        get: function () {
            return this._domElementRef.current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasZone.prototype, "_horizontalOffset", {
        get: function () {
            var store = this.props.store;
            if (store) {
                var mainCanvasElement = store.mainCanvasElement;
                var parentElement = mainCanvasElement &&
                    mainCanvasElement.firstElementChild;
                if (parentElement) {
                    if (Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["getRTL"])() && parentElement.offsetParent && parentElement.offsetParent.clientWidth) {
                        return parentElement.offsetParent.clientWidth - parentElement.offsetWidth - parentElement.offsetLeft;
                    }
                    else {
                        return parentElement.offsetLeft;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    CanvasZone.prototype._updateHorizontalOffset = function () {
        if (this.state.horizontalOffset !== this._horizontalOffset) {
            this.setState({
                horizontalOffset: this._horizontalOffset
            });
        }
    };
    CanvasZone.prototype._updateEmphasisTheme = function (theme, emphasis) {
        var _this = this;
        // Using 'void' to indicate that we are not interested in the returned value.
        void _common_CanvasEmphasis_CanvasEmphasis__WEBPACK_IMPORTED_MODULE_13__["CanvasEmphasis"].getVariantThemeForEmphasis(emphasis, theme, this.props.store.variantsModuleLoader).then(function (t) {
            _this.setState({
                emphasisTheme: t
            });
        });
    };
    Object.defineProperty(CanvasZone.prototype, "_isCanvasZoneActive", {
        get: function () {
            return Boolean(document.activeElement &&
                document.activeElement.parentElement &&
                this._domElement &&
                (document.activeElement === this._domElement || document.activeElement.parentElement === this._domElement));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasZone.prototype, "_zoneLabel", {
        get: function () {
            return _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__["StringHelper"].format(_loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].AriaWebPartOrSectionEnterTemplate || '', this._getSectionContextualAriaLabel(), _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].SectionAriaLabel);
        },
        enumerable: true,
        configurable: true
    });
    CanvasZone.prototype._getSectionContextualAriaLabel = function () {
        var zone = this.props.zone;
        var sections = zone.sections;
        var contextualLabel = '';
        sections.forEach(function (curSection) {
            var controls = curSection.controls;
            controls.forEach(function (control) {
                var webPartName = '';
                if (control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_10__["CanvasControlType"].RTE) {
                    webPartName =
                        _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__["StringHelper"].format(_loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].CanvasZoneAriaWebpartName, _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].TextWebPartDisplayName);
                }
                else {
                    webPartName = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__["StringHelper"].format(_loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].CanvasZoneAriaWebpartName, control.webPartData.title);
                }
                if (contextualLabel === '') {
                    contextualLabel = webPartName;
                }
                else {
                    contextualLabel = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__["StringHelper"].format(_loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].WebPartsInSectionLabel, contextualLabel, webPartName);
                }
            });
        });
        if (zone.isEmpty()) {
            contextualLabel = _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].EmptySectionAriaLabel;
        }
        return _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__["StringHelper"].format(_loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].SectionContextualAriaLabel, this.props.zoneLabel, this._getAccessibleSectionLabel(this.props.zone.layoutType), contextualLabel);
    };
    CanvasZone.prototype._selectZone = function () {
        var store = this.props.store;
        // We need to set the selected layout index before since the property pane
        // action is dependent on both selected layout index and selected zone index.
        store.selectedLayoutIndex = this.props.layoutIndex;
        // We need to re-render to update the selected control position
        store.canvasFields.render();
        store.selectedZoneIndex = this.props.zone.index;
    };
    CanvasZone.prototype._isChildElement = function (elem) {
        return this._domElement && this._domElement.contains(elem);
    };
    CanvasZone.prototype._getAccessibleSectionLabel = function (layoutType) {
        switch (layoutType) {
            case _canvasControl__WEBPACK_IMPORTED_MODULE_10__["CanvasControlType"].OneColumn:
                return _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].ToolboxOneColumnPart;
            case _canvasControl__WEBPACK_IMPORTED_MODULE_10__["CanvasControlType"].TwoColumns:
                return _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].ToolboxTwoColumnPart;
            case _canvasControl__WEBPACK_IMPORTED_MODULE_10__["CanvasControlType"].ThreeColumns:
                return _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].ToolboxThreeColumnPart;
            case _canvasControl__WEBPACK_IMPORTED_MODULE_10__["CanvasControlType"].OneThirdColumnRight:
                return _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].ToolboxOneThirdRightColumnPart;
            case _canvasControl__WEBPACK_IMPORTED_MODULE_10__["CanvasControlType"].OneThirdColumnLeft:
                return _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].ToolboxOneThirdLeftColumnPart;
            case _canvasControl__WEBPACK_IMPORTED_MODULE_10__["CanvasControlType"].FullWidth:
                return _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_18__["default"].ToolboxFullWidthColumnPart;
            default:
                return '';
        }
    };
    Object.defineProperty(CanvasZone.prototype, "_configurationButtonFabricIconKey", {
        get: function () {
            var _a = this.props.zone, layoutType = _a.layoutType, layoutIndex = _a.layoutIndex;
            var fabricIconKey = '';
            switch (layoutType) {
                case _canvasControl__WEBPACK_IMPORTED_MODULE_10__["CanvasControlType"].FullWidth:
                    fabricIconKey = 'FullWidth';
                    break;
                case _canvasControl__WEBPACK_IMPORTED_MODULE_10__["CanvasControlType"].OneColumn:
                    fabricIconKey = 'SingleColumn';
                    break;
                case _canvasControl__WEBPACK_IMPORTED_MODULE_10__["CanvasControlType"].OneThirdColumnLeft:
                    fabricIconKey = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["getRTL"])() ? 'ColumnLeftTwoThirds' : 'ColumnRightTwoThirds';
                    break;
                case _canvasControl__WEBPACK_IMPORTED_MODULE_10__["CanvasControlType"].OneThirdColumnRight:
                    fabricIconKey = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["getRTL"])() ? 'ColumnRightTwoThirds' : 'ColumnLeftTwoThirds';
                    break;
                case _canvasControl__WEBPACK_IMPORTED_MODULE_10__["CanvasControlType"].ThreeColumns:
                    fabricIconKey = 'TripleColumn';
                    break;
                case _canvasControl__WEBPACK_IMPORTED_MODULE_10__["CanvasControlType"].TwoColumns:
                    fabricIconKey = 'DoubleColumn';
                    break;
            }
            if (layoutIndex === _canvasLayout__WEBPACK_IMPORTED_MODULE_7__["CanvasLayout"].verticalLayoutIndex) {
                fabricIconKey = 'ColumnVerticalSection';
            }
            return fabricIconKey;
        },
        enumerable: true,
        configurable: true
    });
    var CanvasZone_1;
    CanvasZone = CanvasZone_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["customizable"])('CanvasZone', ['theme'])
    ], CanvasZone);
    return CanvasZone;
}(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));



/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: Canvas, CanvasControlType, CanvasContentDeserializer, CanvasEngagementDataProvider, DeferredDiffIndicator, DeferredDiffMessage, WIKI_TITLE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sp_canvas_canvas_canvas_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sp-canvas/canvas/canvas/Canvas */ "7Sy0");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return _sp_canvas_canvas_canvas_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"]; });

/* harmony import */ var _sp_canvas_canvas_canvasControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sp-canvas/canvas/canvasControl */ "iO6m");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasControlType", function() { return _sp_canvas_canvas_canvasControl__WEBPACK_IMPORTED_MODULE_2__["CanvasControlType"]; });

/* harmony import */ var _sp_canvas_canvas_canvasStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sp-canvas/canvas/canvasStore */ "yRr9");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasContentDeserializer", function() { return _sp_canvas_canvas_canvasStore__WEBPACK_IMPORTED_MODULE_3__["CanvasContentDeserializer"]; });

/* harmony import */ var _sp_canvas_canvas_canvas_CanvasEngagementDataProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sp-canvas/canvas/canvas/CanvasEngagementDataProvider */ "ez2G");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasEngagementDataProvider", function() { return _sp_canvas_canvas_canvas_CanvasEngagementDataProvider__WEBPACK_IMPORTED_MODULE_4__["CanvasEngagementDataProvider"]; });

/* harmony import */ var _sp_canvas_canvas_editChunk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sp-canvas/canvas/editChunk */ "9s5w");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredDiffIndicator", function() { return _sp_canvas_canvas_editChunk__WEBPACK_IMPORTED_MODULE_5__["DeferredDiffIndicator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredDiffMessage", function() { return _sp_canvas_canvas_editChunk__WEBPACK_IMPORTED_MODULE_5__["DeferredDiffMessage"]; });

/* harmony import */ var _sp_canvas_common_Constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sp-canvas/common/Constants */ "+zV1");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WIKI_TITLE", function() { return _sp_canvas_common_Constants__WEBPACK_IMPORTED_MODULE_6__["WIKI_TITLE"]; });


if (true) {
    var oldWebpackChunkLoad_1 = __webpack_require__.e;
    var SP_RTE_ID_1 = '8404d628-4817-4b3a-883e-1c5a4d07892e';
    var CONTENT_HANDLER_ID_1 = 'dd6f4302-b840-4db3-919d-e8bcba06daaa';
    var componentsLoaded_1 = false;
    __webpack_require__.e = function (chunkId) {
        if (componentsLoaded_1) {
            return oldWebpackChunkLoad_1(chunkId);
        }
        else {
            return Promise.all([
                _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0__["SPComponentLoader"].loadComponentById(SP_RTE_ID_1),
                _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_0__["SPComponentLoader"].loadComponentById(CONTENT_HANDLER_ID_1)
            ]).then(function (_a) {
                var spRte = _a[0], contentHandler = _a[1];
                var rteModuleId = /*require.resolve*/(/*! @ms/sp-rte */ "RX6m");
                var contentHandlerModuleId = /*require.resolve*/(/*! @ms/content-handler */ "VaVC");
                // Inject the async loaded components into the installedModule cache
                __webpack_require__.c[rteModuleId] = {
                    i: rteModuleId,
                    l: true,
                    exports: spRte
                };
                __webpack_require__.c[contentHandlerModuleId] = {
                    i: contentHandlerModuleId,
                    l: true,
                    exports: contentHandler
                };
                componentsLoaded_1 = true;
                return oldWebpackChunkLoad_1(chunkId);
            });
        }
    };
}








/***/ }),

/***/ "n6/h":
/*!************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasZone/EmptyCanvasZone.js ***!
  \************************************************************/
/*! exports provided: EmptyCanvasZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmptyCanvasZone", function() { return EmptyCanvasZone; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _canvasSection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../canvasSection */ "JqQl");
/* harmony import */ var _CanvasZone_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CanvasZone.scss */ "Kw1M");
/**
 * @file EmptyCanvasZone.tsx
 * @copyright (c) Microsoft Corporation. All rights reserved.
 *
 * A CanvasZone that only renders empty section to show web part ToolboxHint at bottom of the page in edit mode.
 */





var EmptyCanvasZone = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EmptyCanvasZone, _super);
    function EmptyCanvasZone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmptyCanvasZone.prototype.render = function () {
        var layoutZoneClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])('CanvasZone', 'row', 'CanvasZone--noMargin', 'CanvasZone--edit', {
            'CanvasZone--centerAlign': this.props.shouldCenterAlign
        });
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: layoutZoneClassName, "data-automation-id": 'CanvasZone' },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_canvasSection__WEBPACK_IMPORTED_MODULE_3__["EmptyCanvasSection"], { hintLayout: this.props.hintLayout, store: this.props.store })));
    };
    return EmptyCanvasZone;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "nrsI":
/*!***************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/DeferredSPRte.js ***!
  \***************************************************************/
/*! exports provided: DeferredSPRte */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredSPRte", function() { return DeferredSPRte; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


// tslint:disable
var DeferredSPRteComponent = react__WEBPACK_IMPORTED_MODULE_1__["lazy"](function () { return __webpack_require__.e(/*! import() | sp-canvas-edit */ "sp-canvas-edit").then(__webpack_require__.bind(null, /*! ./index-deferred */ "pL8B"))
    .then(function (module) { return ({
    default: module.withDataControlled(module.SPRte)
}); }); });
var DeferredSPRte = react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](function (props, ref) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Suspense"], { fallback: false },
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](DeferredSPRteComponent, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ ref: ref }, props))));
});


/***/ }),

/***/ "o0cL":
/*!*************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasDiff/DeferredCanvasDiff.js ***!
  \*************************************************************************/
/*! exports provided: canvasDiffLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasDiffLoader", function() { return canvasDiffLoader; });
function canvasDiffLoader() {
    return Promise.all(/*! import() | sp-canvas-diff */[__webpack_require__.e("vendors~sp-canvas-diff"), __webpack_require__.e("sp-canvas-diff")]).then(__webpack_require__.bind(null, /*! ./index-deferred */ "sO6Y"));
}


/***/ }),

/***/ "ox2b":
/*!**********************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasComponent/CanvasComponent.scss.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./CanvasComponent.css */ "rl1+");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "pJUF":
/*!***************************************************************!*\
  !*** ./lib/sp-canvas/common/CanvasEmphasis/CanvasEmphasis.js ***!
  \***************************************************************/
/*! exports provided: CanvasEmphasis */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasEmphasis", function() { return CanvasEmphasis; });
/**
 * Returns the variant emphasis for the control
 * The emphasis could be soft, variant, neutral or none. For details:
 * https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/variants
 */
var CanvasEmphasis = /** @class */ (function () {
    function CanvasEmphasis() {
    }
    CanvasEmphasis.getVariantThemeForEmphasis = function (color, theme, variantsModuleLoader) {
        return variantsModuleLoader().then(function (variants) {
            var t = theme;
            switch (color) {
                case 2 /* Soft */:
                    t = variants.getSoftVariant(theme);
                    break;
                case 3 /* Strong */:
                    t = variants.getStrongVariant(theme);
                    break;
                case 1 /* Neutral */:
                    t = variants.getNeutralVariant(theme);
                    break;
            }
            return t;
        });
    };
    return CanvasEmphasis;
}());



/***/ }),

/***/ "qRiB":
/*!*****************************************!*\
  !*** ./lib/sp-canvas/common/Flights.js ***!
  \*****************************************/
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
    Flights.isAnchorFlightEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1232 /* SOXAnchorService */);
    };
    Flights.isPageUndoRedoFlightEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1457 /* WEXModernUndoRedo */);
    };
    Flights.is1920ExpansionFlightEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1491 /* Canvas1920Expansion */);
    };
    Flights.isDemoteHeadingsInRTEWithExperimentEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1591 /* DemoteHeadingsInRTE */);
    };
    Flights.isRTEFloatingToolbarWithExperimentEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1595 /* RTEFloatingToolbar */);
    };
    Flights.isWikiFeatureFlightEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1600 /* EnterpriseWikiScenariosInRTE */);
    };
    Flights.isFluentFlightEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1248 /* EnableFluentTheme */);
    };
    Flights.isPageVersionEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1236 /* WEXPageVersionsAndDiff */);
    };
    Flights.isEditTransitionPerFrame = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1697 /* WEXImproveEditPerf */);
    };
    Flights.isFluidPasteEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1698 /* SPPPLATFluidEmbedWebPart */);
    };
    Flights.isTopicPageEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1336 /* AbbreviationPagesPrototype */) && _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1684 /* TopicPageEdit */);
    };
    return Flights;
}());



/***/ }),

/***/ "qjmy":
/*!********************************************!*\
  !*** external "@ms/sp-deferred-component" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_qjmy__;

/***/ }),

/***/ "rRNS":
/*!*****************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasControl/CanvasControlType.js ***!
  \*****************************************************************/
/*! exports provided: CanvasControlType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasControlType", function() { return CanvasControlType; });
/**
 * Represents the type the web part section
 *
 * @internal
 */
var CanvasControlType;
(function (CanvasControlType) {
    /**
     * Canvas metadata
     */
    CanvasControlType[CanvasControlType["Metadata"] = 0] = "Metadata";
    /**
     * web part zone
     */
    CanvasControlType[CanvasControlType["WebPartZone"] = 3] = "WebPartZone";
    /**
     * rich text web part
     */
    CanvasControlType[CanvasControlType["RTE"] = 4] = "RTE";
    /**
     * two column layout
     */
    CanvasControlType[CanvasControlType["TwoColumns"] = 5] = "TwoColumns";
    /**
     * three column layout
     */
    CanvasControlType[CanvasControlType["ThreeColumns"] = 6] = "ThreeColumns";
    /**
     * one third column right layout
     */
    CanvasControlType[CanvasControlType["OneThirdColumnRight"] = 7] = "OneThirdColumnRight";
    /**
     * one third column left layout
     */
    CanvasControlType[CanvasControlType["OneThirdColumnLeft"] = 8] = "OneThirdColumnLeft";
    /**
     * full width layout
     */
    CanvasControlType[CanvasControlType["FullWidth"] = 9] = "FullWidth";
    /**
     * one column layout
     */
    CanvasControlType[CanvasControlType["OneColumn"] = 10] = "OneColumn";
})(CanvasControlType || (CanvasControlType = {}));


/***/ }),

/***/ "rl1+":
/*!******************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasComponent/CanvasComponent.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./CanvasComponent.css */ "kvcB");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "s+EI":
/*!*************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasZone/CanvasZone.types.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "t874":
/*!*****************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/CanvasVerticalSection/CanvasVerticalSection.js ***!
  \*****************************************************************************/
/*! exports provided: CanvasVerticalSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasVerticalSection", function() { return CanvasVerticalSection; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _canvasZone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../canvasZone */ "yf/r");
/* harmony import */ var _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../loc/CanvasStrings.resx */ "K08d");
/* harmony import */ var _CanvasVerticalSection_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CanvasVerticalSection.scss */ "VyBU");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/Flights */ "qRiB");







function CanvasVerticalSection(props) {
    var layoutIndex = props.layoutIndex, store = props.store;
    var canvasLayout = store.canvasLayouts.get(props.layoutIndex);
    var canvasVerticalSectionZones = canvasLayout ? canvasLayout.zones : [];
    var zone = canvasVerticalSectionZones ? canvasVerticalSectionZones[0] : undefined;
    var verticalSectionClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])('CanvasVerticalSection', {
        'isEdit': store.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit
    });
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: verticalSectionClassName }, zone && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_canvasZone__WEBPACK_IMPORTED_MODULE_3__["CanvasZone"], { fullWidth: false, selectedPosition: store.canvasLayout.fetchCurrentSelection(), key: _common_Flights__WEBPACK_IMPORTED_MODULE_6__["Flights"].isPageUndoRedoFlightEnabled() ? zone.id : zone.elementKey, layoutType: zone.layoutType, zone: zone, shouldCenterAlign: store.shouldCenterAlign, zoneLabel: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_4__["default"].CanvasVerticalSectionZoneLabel, layoutIndex: layoutIndex, emphasis: canvasVerticalSectionZones[0].emphasis, store: store, displayMode: store.displayMode }))));
}


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

/***/ "v3Ow":
/*!******************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasSection/CanvasSection.scss.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./CanvasSection.css */ "CRn6");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "vP/3":
/*!*******************************************************************!*\
  !*** ./lib/sp-canvas/canvas/webPartZone/WebPartReservedHeight.js ***!
  \*******************************************************************/
/*! exports provided: WebPartReservedHeight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebPartReservedHeight", function() { return WebPartReservedHeight; });
// Extra small is for web parts that can set its height to 0, e.g., spacer web part.
var reservedHeightExtraSmall = new Map([[-1 /* Any */, 0]]);
// Small is for text, although size can vary per contents.
var reservedHeightSmall = new Map([[-1 /* Any */, 100]]);
// Medium is for web parts that typically display about half the size of a large web part, e.g., image web part
var reservedHeightMedium = new Map([
    [4 /* Third */, 200],
    [6 /* Half */, 300],
    [8 /* TwoThird */, 300],
    [12 /* Full */, 400]
]);
// Large is for web parts that return many rows of content, e.g., news web part.
var reservedHeightLarge = new Map([
    [4 /* Third */, 400],
    [6 /* Half */, 400],
    [8 /* TwoThird */, 500],
    [12 /* Full */, 600]
]);
// Web parts that are the large in size do not need to be in the list as a large size is reserved by default.
// Categorization of the web part to a size is an in-exact art as most web parts vary in size by content.
var webPartReservedHeights = new Map([
    // CodeSnippet
    ['7b317bca-c919-4982-af2f-8399173e5a1e', reservedHeightMedium],
    // Countdown
    ['62cac389-787f-495d-beca-e11786162ef4', reservedHeightMedium],
    // CustomMessage
    ['71c19a43-d08c-4178-8218-4df8554c0b0e', reservedHeightSmall],
    // Divider
    ['2161a1c6-db61-4731-b97c-3cdb303f7cbb', reservedHeightSmall],
    // Events
    ['20745d7d-8581-4a6c-bf26-68279bc123fc', reservedHeightMedium],
    // GroupCalendar
    ['6676088b-e28e-4a90-b9cb-d0d0303cd2eb', reservedHeightMedium],
    // Image
    ['d1d91016-032f-456d-98a4-721247c305e8', reservedHeightMedium],
    // ImageGallery
    ['af8be689-990e-492a-81f7-ba3e4cd3ed9c', reservedHeightMedium],
    // ImageViewer
    ['5e945ea8-0e6c-4f52-b7c2-75ae618396e5', reservedHeightMedium],
    // LinkPreview
    ['6410b3b6-d440-4663-8744-378976dc041e', reservedHeightMedium],
    // People
    ['7f718435-ee4d-431c-bdbf-9c4ff326f46e', reservedHeightMedium],
    // QuickLinks
    ['c70391ea-0b10-4ee9-b2b4-006d3fcad0cd', reservedHeightSmall],
    // Sites
    ['7cba020c-5ccb-42e8-b6fc-75b3149aba7b', reservedHeightMedium],
    // Spacer
    ['8654b779-4886-46d4-8ffb-b5ed960ee986', reservedHeightExtraSmall],
    // Text
    ['5d2d3b27-05b3-4dd0-b001-030b6c02bff8', reservedHeightSmall],
    // Text2D
    ['e30ff702-e1a4-4e02-8c11-3cce0139727a', reservedHeightSmall],
    // Weather
    ['868ac3c3-cad7-4bd6-9a1c-14dc5cc8e823', reservedHeightSmall],
    // World Clock
    ['e990b1eb-5816-42ed-afc5-4c8568db1196', reservedHeightSmall]
]);
var WebPartReservedHeight = /** @class */ (function () {
    function WebPartReservedHeight() {
    }
    // To be called for internal web parts only as we don't have any way to approximate the size of a
    // third party web part.
    // To be converted as private with undo-redo flight 1457
    WebPartReservedHeight.getDefaultReservedHeight = function (webPartId, columnType) {
        var map = webPartReservedHeights.get(webPartId) || reservedHeightLarge;
        return map.get(columnType) || map.get(-1 /* Any */);
    };
    WebPartReservedHeight.getReservedHeight = function (control, isMobileBrowser) {
        var position = control.position, reservedHeight = control.reservedHeight, webPartManifest = control.webPartManifest, webPartId = control.webPartId;
        if (reservedHeight) {
            return reservedHeight + "px";
        }
        else if (webPartManifest &&
            webPartManifest.isInternal) {
            var columnType = 12 /* Full */;
            if (isMobileBrowser) {
                columnType = 4 /* Third */;
            }
            else if (position.sectionFactor) {
                columnType = position.sectionFactor;
            }
            var serializedHeight = WebPartReservedHeight.getDefaultReservedHeight(webPartId, columnType);
            if (serializedHeight) {
                return serializedHeight + "px";
            }
        }
        return undefined;
    };
    return WebPartReservedHeight;
}());



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

/***/ "wB5c":
/*!*********************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasWebPartHost/index.js ***!
  \*********************************************************/
/*! exports provided: CanvasWebPartHost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CanvasWebPartHost__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasWebPartHost */ "V9Um");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasWebPartHost", function() { return _CanvasWebPartHost__WEBPACK_IMPORTED_MODULE_0__["CanvasWebPartHost"]; });




/***/ }),

/***/ "wFVB":
/*!**********************************************!*\
  !*** ./lib/sp-canvas/common/StyleHelpers.js ***!
  \**********************************************/
/*! exports provided: _classNamesFunc, getClassNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_classNamesFunc", function() { return _classNamesFunc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClassNames", function() { return getClassNames; });
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__);

var _classNamesFunc = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["classNamesFunction"])();
/**
 * Generate the IClassNames object for css in js.
 *
 * @param getStyleFunc - Function to generate the IRootStyle, or derivative, object
 * @param props - The properties passed when _classNamesFunc invokes getStyleFunc
 */
function getClassNames(getStyleFunc, props) {
    return _classNamesFunc(getStyleFunc, props);
}


/***/ }),

/***/ "y88i":
/*!********************************************!*\
  !*** external "@ms/odsp-utilities-bundle" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_y88i__;

/***/ }),

/***/ "yPt8":
/*!****************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasLayout/index.js ***!
  \****************************************************/
/*! exports provided: CanvasLayout, CanvasZonePart, CanvasSectionPart, getZonePositionUniqString, undefinedControlPosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CanvasLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasLayout */ "aNx7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasLayout", function() { return _CanvasLayout__WEBPACK_IMPORTED_MODULE_0__["CanvasLayout"]; });

/* harmony import */ var _CanvasZonePart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasZonePart */ "zkMK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasZonePart", function() { return _CanvasZonePart__WEBPACK_IMPORTED_MODULE_1__["CanvasZonePart"]; });

/* harmony import */ var _CanvasSectionPart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CanvasSectionPart */ "Lyn5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasSectionPart", function() { return _CanvasSectionPart__WEBPACK_IMPORTED_MODULE_2__["CanvasSectionPart"]; });

/* harmony import */ var _getZonePositionUniqString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getZonePositionUniqString */ "khFG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getZonePositionUniqString", function() { return _getZonePositionUniqString__WEBPACK_IMPORTED_MODULE_3__["getZonePositionUniqString"]; });

/* harmony import */ var _undefinedControlPosition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./undefinedControlPosition */ "4Mut");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "undefinedControlPosition", function() { return _undefinedControlPosition__WEBPACK_IMPORTED_MODULE_4__["undefinedControlPosition"]; });








/***/ }),

/***/ "yRr9":
/*!***************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasStore/index.js ***!
  \***************************************************/
/*! exports provided: CanvasContentDeserializer, CanvasFields, CanvasStore, CanvasStoreCommonActions, EUPL_APPROVED_WEB_PARTS, EUPL_CANDIDATE_WEB_PARTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CanvasContentDeserializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasContentDeserializer */ "AsKj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasContentDeserializer", function() { return _CanvasContentDeserializer__WEBPACK_IMPORTED_MODULE_0__["CanvasContentDeserializer"]; });

/* harmony import */ var _CanvasFields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasFields */ "dYQ3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasFields", function() { return _CanvasFields__WEBPACK_IMPORTED_MODULE_1__["CanvasFields"]; });

/* harmony import */ var _CanvasStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CanvasStore */ "TOEr");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasStore", function() { return _CanvasStore__WEBPACK_IMPORTED_MODULE_2__["CanvasStore"]; });

/* harmony import */ var _CanvasStoreCommonActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CanvasStoreCommonActions */ "zjII");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasStoreCommonActions", function() { return _CanvasStoreCommonActions__WEBPACK_IMPORTED_MODULE_3__["CanvasStoreCommonActions"]; });

/* harmony import */ var _CanvasWebPartClassification__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CanvasWebPartClassification */ "IGxH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EUPL_APPROVED_WEB_PARTS", function() { return _CanvasWebPartClassification__WEBPACK_IMPORTED_MODULE_4__["EUPL_APPROVED_WEB_PARTS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EUPL_CANDIDATE_WEB_PARTS", function() { return _CanvasWebPartClassification__WEBPACK_IMPORTED_MODULE_4__["EUPL_CANDIDATE_WEB_PARTS"]; });








/***/ }),

/***/ "yf/r":
/*!**************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasZone/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CanvasZone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasZone */ "lJmH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasZone", function() { return _CanvasZone__WEBPACK_IMPORTED_MODULE_0__["CanvasZone"]; });

/* harmony import */ var _CanvasZone_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasZone.types */ "s+EI");
/* harmony import */ var _CanvasZone_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_CanvasZone_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _CanvasZone_types__WEBPACK_IMPORTED_MODULE_1__) if(["CanvasZone","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _CanvasZone_types__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _EmptyCanvasZone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EmptyCanvasZone */ "n6/h");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmptyCanvasZone", function() { return _EmptyCanvasZone__WEBPACK_IMPORTED_MODULE_2__["EmptyCanvasZone"]; });






/***/ }),

/***/ "yld5":
/*!*************************************************!*\
  !*** ../sp-rte/lib/rte/baseRte/BaseRte.scss.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./BaseRte.css */ "aKD8");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "ytfe":
/*!******************************!*\
  !*** external "@ms/sp-a11y" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ytfe__;

/***/ }),

/***/ "zjII":
/*!**********************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasStore/CanvasStoreCommonActions.js ***!
  \**********************************************************************/
/*! exports provided: CanvasStoreCommonActions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasStoreCommonActions", function() { return CanvasStoreCommonActions; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _canvasLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../canvasLayout */ "yPt8");
/* harmony import */ var _canvasControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../canvasControl */ "iO6m");
/* harmony import */ var _CanvasWebPartClassification__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CanvasWebPartClassification */ "IGxH");
/* harmony import */ var _canvasSection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../canvasSection */ "JqQl");






var CanvasStoreCommonActions = /** @class */ (function () {
    function CanvasStoreCommonActions() {
    }
    CanvasStoreCommonActions.isFullWidth = function (position) {
        return _canvasSection__WEBPACK_IMPORTED_MODULE_5__["CanvasFullWidthSection"].isFullWidth(position);
    };
    CanvasStoreCommonActions.addControlToCanvas = function (canvasFields, control, shouldRender, shouldPersistData) {
        if (shouldRender === void 0) { shouldRender = false; }
        if (shouldPersistData === void 0) { shouldPersistData = shouldRender; }
        if (!control.id) {
            var instanceId = void 0;
            if (control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].WebPartZone &&
                control.webPartData &&
                (instanceId = control.webPartData.instanceId)) {
                control.id = instanceId;
            }
            else {
                control.id = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].newGuid().toString();
            }
        }
        if (control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].WebPartZone) {
            canvasFields.webPartsCount++;
            var webPartData = control.webPartData;
            if (webPartData && _CanvasWebPartClassification__WEBPACK_IMPORTED_MODULE_4__["EUPL_APPROVED_WEB_PARTS"].has(webPartData.id)) {
                canvasFields.euplApprovedWebpartCount++;
            }
        }
        /**
         * Always use the manifest from the loader when initializing web parts from persisted data.
         * Web parts added from the Toolbox will always be initialized with the loader's manifest.
         */
        if (control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].WebPartZone && control.addedFromPersistedData) {
            var manifest = CanvasStoreCommonActions.getManifestMap(canvasFields).get(control.webPartId);
            if (manifest) {
                control.webPartManifest = manifest;
            }
            else {
                var missingManifest = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]("WebPartManifestMissing");
                missingManifest.writeUnexpectedFailure(control.webPartId);
            }
        }
        if (CanvasStoreCommonActions.isFullWidth(control.position) &&
            _canvasSection__WEBPACK_IMPORTED_MODULE_5__["CanvasFullWidthSection"].isFullWidthControl(control)) {
            if (canvasFields.siteSupportsFullWidth) {
                _canvasSection__WEBPACK_IMPORTED_MODULE_5__["CanvasFullWidthSection"].setFullWidthWebPartProperty(control, true);
            }
            else {
                // Change the full width column to one column if the site doesn't support it
                // Todo#661360 Fix workaround left-over
                var sectionFactor = _canvasLayout__WEBPACK_IMPORTED_MODULE_2__["CanvasZonePart"].columnDefinitionMap.get(_canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].OneColumn).factor[0];
                var newPosition = _canvasLayout__WEBPACK_IMPORTED_MODULE_2__["CanvasLayout"].cloneMerge(control.position, {
                    sectionFactor: sectionFactor
                });
                control.position = newPosition;
                _canvasSection__WEBPACK_IMPORTED_MODULE_5__["CanvasFullWidthSection"].setFullWidthWebPartProperty(control, false);
            }
        }
        var layoutIndex = control.position.layoutIndex;
        canvasFields.getLayout(layoutIndex).addControl(control);
        if (shouldRender) {
            canvasFields.render();
        }
        if (shouldPersistData) {
            canvasFields.handleCanvasChanged();
        }
    };
    CanvasStoreCommonActions.createQosScope = function (scope) {
        return new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]("Canvas" + scope);
    };
    CanvasStoreCommonActions.handleMonitoredException = function (qos, err, extraData // tslint:disable-line:no-any
    ) {
        qos.writeUnexpectedFailure('Exception', err, extraData);
    };
    /* tslint:disable:no-any */
    CanvasStoreCommonActions.getManifestMap = function (canvasFields) {
        var tempMap = new Map();
        var manifests = canvasFields.webPartManager.getWebPartManifests();
        /* tslint:enable:no-any */
        for (var _i = 0, manifests_1 = manifests; _i < manifests_1.length; _i++) {
            var manifest = manifests_1[_i];
            tempMap.set(manifest.id, manifest);
        }
        return tempMap;
    };
    return CanvasStoreCommonActions;
}());



/***/ }),

/***/ "zkMK":
/*!*************************************************************!*\
  !*** ./lib/sp-canvas/canvas/canvasLayout/CanvasZonePart.js ***!
  \*************************************************************/
/*! exports provided: CanvasZonePart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasZonePart", function() { return CanvasZonePart; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _canvasControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../canvasControl */ "iO6m");
/* harmony import */ var _CanvasLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CanvasLayout */ "aNx7");
/* harmony import */ var _CanvasSectionPart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CanvasSectionPart */ "Lyn5");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/Flights */ "qRiB");
/**
 * @file CanvasZonePart.ts
 * @copyright (c) Microsoft Corporation. All rights reserved.
 */







/**
 * Represents a Canvas Zone Layout Part
 */
var CanvasZonePart = /** @class */ (function () {
    /**
     * Creates a new instance of a CanvasZonePart
     * @param zoneIdx represents the zone index
     */
    function CanvasZonePart(zoneIdx, emphasis, getControlComponentById, layoutIndex) {
        this._index = zoneIdx;
        this._emphasis = emphasis;
        this._sectionsMap = new Map();
        this._getControlComponentById = getControlComponentById;
        this._elementKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].newGuid().toString();
        this._layoutIndex = layoutIndex;
    }
    Object.defineProperty(CanvasZonePart.prototype, "index", {
        /**
         * Gets the index associated with this zone
         */
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasZonePart.prototype, "layoutIndex", {
        get: function () {
            return this._layoutIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasZonePart.prototype, "id", {
        /**
         * Gets the unique id associated with this zone
         */
        get: function () {
            return this._layoutIndex + "_" + this._index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasZonePart.prototype, "elementKey", {
        /**
         * Key used by react to identify the DOM element that this zone part will be props to.
         * Each CanvasZone needs a unique key that is persisted between serialization operations so react
         * can keep track of reordering operations
         */
        get: function () {
            return this._elementKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasZonePart.prototype, "sections", {
        /**
         * Gets the sections associated with the current zone
         * @returns all the sections in that zone
         */
        get: function () {
            var sections = [];
            this._sectionsMap.forEach(function (section) {
                sections.push(section);
            });
            return sections.sort(function (section1, section2) {
                return section1.index - section2.index;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasZonePart.prototype, "layoutType", {
        get: function () {
            if (!this._layoutType) {
                this._layoutType = this._getCurrentColumnSize();
            }
            return this._layoutType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasZonePart.prototype, "emphasis", {
        get: function () {
            return this._emphasis;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a new control in the pertinent zone.
     * If section doesnt exist then create a new section
     * @param canvasControl represents the control to add
     * @returns id of the control that was added
     */
    CanvasZonePart.prototype.addControl = function (canvasControl) {
        // If the control is undefined or isn't associated with a layout, return
        if (!_CanvasLayout__WEBPACK_IMPORTED_MODULE_4__["CanvasLayout"].isPositionValid(canvasControl.position)) {
            return undefined;
        }
        var curSectionIndex = canvasControl.position.sectionIndex;
        if (curSectionIndex === undefined) {
            // section isn't defined, cannot proceed
            return undefined;
        }
        var controlId;
        var sectionsToAdd = 1;
        var colDef = CanvasZonePart.columnDefinitionMap.get(canvasControl.controlType);
        if (colDef) {
            sectionsToAdd = colDef.sections;
        }
        if (!_common_Flights__WEBPACK_IMPORTED_MODULE_6__["Flights"].isPageUndoRedoFlightEnabled() ||
            canvasControl.emphasis === undefined ||
            canvasControl.emphasis.zoneEmphasis !== this._emphasis) {
            // Update control's emphasis if it's not aligned with the zone emphasis.
            canvasControl.emphasis = canvasControl.emphasis || {};
            canvasControl.emphasis = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, canvasControl.emphasis, { zoneEmphasis: this._emphasis });
        }
        for (var i = 0; i < sectionsToAdd; ++i, ++curSectionIndex) {
            // Get the pertinent section if available
            var section = this._sectionsMap.get(curSectionIndex);
            if (!section) {
                var factor = colDef && colDef.factor[i];
                if (factor === undefined || isNaN(factor)) {
                    factor = canvasControl.position.sectionFactor;
                }
                // Section doesn't exist, create a new section
                var newSection = new _CanvasSectionPart__WEBPACK_IMPORTED_MODULE_5__["CanvasSectionPart"](curSectionIndex, canvasControl.emphasis && canvasControl.emphasis.sectionEmphasis, factor);
                // If control index is not provided, then set to default index
                if (canvasControl.position.controlIndex === undefined) {
                    canvasControl.position = _CanvasLayout__WEBPACK_IMPORTED_MODULE_4__["CanvasLayout"].cloneMerge(canvasControl.position, {
                        zoneIndex: undefined,
                        sectionIndex: undefined,
                        controlIndex: _CanvasLayout__WEBPACK_IMPORTED_MODULE_4__["CanvasLayout"].firstLayoutIndex
                    });
                }
                // Ok, now add the control and update the layout
                controlId = newSection.addControl(canvasControl);
                if (controlId) {
                    this._sectionsMap.set(curSectionIndex, newSection);
                }
            }
            else {
                // section already exists, verify that the control information is provided
                if (canvasControl.position.controlIndex !== undefined) {
                    // Ok this is a valid control, add it
                    controlId = section.addControl(canvasControl);
                }
                else {
                    // Attempting to add a new section above a section that already exists.
                    // Generate a new section index and add it.
                    canvasControl.position = _CanvasLayout__WEBPACK_IMPORTED_MODULE_4__["CanvasLayout"].cloneMerge(canvasControl.position, {
                        zoneIndex: undefined,
                        sectionIndex: _CanvasLayout__WEBPACK_IMPORTED_MODULE_4__["CanvasLayout"].generateNewLayoutIndex(this.sections, curSectionIndex),
                        controlIndex: undefined
                    });
                    if (canvasControl.position.sectionIndex === undefined) {
                        // Could not generate a new index, cannot proceed
                        return undefined;
                    }
                    var newSecondarySection = new _CanvasSectionPart__WEBPACK_IMPORTED_MODULE_5__["CanvasSectionPart"](canvasControl.position.sectionIndex, canvasControl.emphasis && canvasControl.emphasis.sectionEmphasis);
                    canvasControl.position = _CanvasLayout__WEBPACK_IMPORTED_MODULE_4__["CanvasLayout"].cloneMerge(canvasControl.position, {
                        zoneIndex: undefined,
                        sectionIndex: undefined,
                        controlIndex: _CanvasLayout__WEBPACK_IMPORTED_MODULE_4__["CanvasLayout"].firstLayoutIndex
                    });
                    // Add the control and update the layout
                    controlId = newSecondarySection.addControl(canvasControl);
                    if (controlId && canvasControl.position.sectionIndex !== undefined) {
                        this._sectionsMap.set(canvasControl.position.sectionIndex, newSecondarySection);
                    }
                }
            }
        }
        return controlId;
    };
    CanvasZonePart.prototype.updateControl = function (control) {
        var section = this._sectionsMap.get(control.position.sectionIndex);
        if (section) {
            return section.updateControl(control);
        }
        else {
            return false;
        }
    };
    /**
     * Moves a control inside the zone.
     * @param control The control to be moved
     * @param newControlPosition The position where the control will be moved to
     */
    CanvasZonePart.prototype.moveControl = function (control, newControlPosition) {
        if (!control || control.position.zoneIndex !== newControlPosition.zoneIndex) {
            return undefined;
        }
        // if the move is within the same section let the section handle the move
        if (control.position.sectionIndex === newControlPosition.sectionIndex) {
            return this._moveControlInSection(control, newControlPosition);
        }
        else {
            // if the move is to a different section we need to remove the control and add it to the new location
            // Todo#661360 Fix workaround left-over
            var newControl = this._getControlComponentById(control.id).serialize();
            newControl.position = newControlPosition;
            newControl.addedFromPersistedData = true;
            this.removeControl(control.position);
            this.addControl(newControl);
            return this._moveControlInSection(newControl, newControlPosition);
        }
        return undefined;
    };
    /**
     * Removes a control
     * @param controlPosition represents the control to remove
     * @returns id of control that was removed
     */
    CanvasZonePart.prototype.removeControl = function (controlPosition) {
        // If the control is undefined or isn't associated with a layout, return
        if (!controlPosition) {
            return undefined;
        }
        // Todo#661360 Fix workaround left-over
        var section = this._sectionsMap.get(controlPosition.sectionIndex);
        if (!section) {
            // Section doesn't exist, cannot proceed
            return undefined;
        }
        // remove the control from the section
        var controlId = section.removeControl(controlPosition);
        return controlId;
    };
    /**
     * Fetches a control from the zone if available
     * @param controlPosition represents the position of the control
     * @returns the underlying control in the zone if available
     */
    CanvasZonePart.prototype.fetchControl = function (controlPosition) {
        // Verify its a valid layout
        if (!controlPosition) {
            return undefined;
        }
        // Todo#661360 Fix workaround left-over
        var section = this._sectionsMap.get(controlPosition.sectionIndex);
        if (!section) {
            // Section doesn't exist, cannot proceed
            return undefined;
        }
        return section.fetchControl(controlPosition);
    };
    /**
     * Fetch all controls that are available in that zone
     * @returns all the controls in that zone
     */
    CanvasZonePart.prototype.fetchAllControls = function (includeEmptySections) {
        var _this = this;
        if (includeEmptySections === void 0) { includeEmptySections = true; }
        var canvasControls = [];
        var sections = this.sections;
        sections.forEach(function (section) {
            var controls = section.fetchAllControls();
            if (includeEmptySections && controls.length === 0) {
                var emptySection = section.emptySectionControl;
                emptySection.position = _CanvasLayout__WEBPACK_IMPORTED_MODULE_4__["CanvasLayout"].cloneMerge(emptySection.position, {
                    zoneIndex: _this._index,
                    sectionIndex: undefined,
                    controlIndex: undefined,
                    layoutIndex: _this._layoutIndex
                });
                emptySection.emphasis = _CanvasLayout__WEBPACK_IMPORTED_MODULE_4__["CanvasLayout"].cloneMerge(emptySection.emphasis, {
                    zoneEmphasis: _this._emphasis,
                    sectionEmphasis: undefined,
                    controlEmphasis: undefined
                });
                controls.push(emptySection);
            }
            canvasControls = canvasControls.concat(controls);
        });
        return canvasControls;
    };
    /**
     * Change the emphasis of the zone.
     *
     * @param emphasis - The new emphasis
     */
    CanvasZonePart.prototype.changeEmphasis = function (emphasis) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_EngagementLogger"].logEvent('Canvas.ChangeEmphasis.Click');
        this._emphasis = emphasis.zoneEmphasis;
        this._sectionsMap.forEach(function (section) {
            section.changeEmphasis(emphasis);
        });
    };
    /**
     * Modify the current state of the zone to reflect new sections and/or section factors.
     *
     * @param zoneType - The key into the CanvasZonePart.columnDefinitionMap for the new section count
     *   and respective section factors.
     */
    CanvasZonePart.prototype.changeZone = function (zoneType) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_EngagementLogger"].logEvent('Canvas.ChangeZone.Click');
        // Todo#661360 Fix workaround left-over
        var colDef = CanvasZonePart.columnDefinitionMap.get(zoneType);
        var sections = this.sections;
        var sectionsLength = sections.length;
        if (colDef.sections > sectionsLength) {
            this._increaseSections(sections, colDef, zoneType);
        }
        else if (colDef.sections < sectionsLength) {
            this._reduceSections(sections, colDef);
        }
        else if (colDef.factor[0] !== sections[0].factor) {
            /**
             * Since the first factor of any IColumnDefinition with the same sections value is different
             * we can short circuit the logic to compare only the first factor.
             */
            sections.forEach(function (sectionPart, index) {
                sectionPart.changeFactor(colDef.factor[index]);
            });
        }
        this._layoutType = zoneType;
    };
    /**
     * Determines if the underlying layout is empty
     * @returns true if the zone is empty
     */
    CanvasZonePart.prototype.isEmpty = function () {
        return this.fetchAllControls(false).length === 0;
    };
    /**
     * Disposes the zone
     */
    CanvasZonePart.prototype.dispose = function () {
        this._sectionsMap.clear();
    };
    /**
     * Changes the zone index when the zone is moved
     */
    CanvasZonePart.prototype.changeZoneIndex = function (newZoneIndex) {
        this.fetchAllControls(false).forEach(function (control) {
            control.position = _CanvasLayout__WEBPACK_IMPORTED_MODULE_4__["CanvasLayout"].cloneMerge(control.position, {
                zoneIndex: newZoneIndex
            });
        });
        this._index = newZoneIndex;
    };
    CanvasZonePart.prototype._createQosScope = function (scope) {
        return new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]("Canvas" + scope);
    };
    CanvasZonePart.prototype._increaseSections = function (currentSections, columnDefinition, zoneType) {
        var qos = this._createQosScope('IncreaseSections');
        try {
            var currentSectionsLength = currentSections.length;
            // Change the section factor for the current sections.
            currentSections.forEach(function (sectionPart, index) {
                sectionPart.changeFactor(columnDefinition.factor[index]);
            });
            // Add new sections after the last one.
            var newSectionsLength = columnDefinition.sections;
            if (currentSections[currentSectionsLength - 1]) {
                var currentSectionIndex = currentSections[currentSectionsLength - 1].index + 1;
                for (var i = currentSectionsLength; i < newSectionsLength; ++i) {
                    var newSection = new _CanvasSectionPart__WEBPACK_IMPORTED_MODULE_5__["CanvasSectionPart"](currentSectionIndex, undefined, columnDefinition.factor[i]);
                    this._sectionsMap.set(currentSectionIndex++, newSection);
                }
            }
            else {
                var extraData = {
                    zoneType: zoneType,
                    layoutIndex: this.layoutIndex,
                    zoneIndex: this._index
                };
                var error = new Error('Last section does not exists' + currentSections);
                qos.writeUnexpectedFailure('Exception', error, extraData);
            }
            qos.writeSuccess();
        }
        catch (err) {
            qos.writeUnexpectedFailure('Exception', err);
        }
    };
    CanvasZonePart.prototype._reduceSections = function (currentSections, columnDefinition) {
        var _this = this;
        var qos = this._createQosScope('ReduceSections');
        try {
            var currentSectionsLength = currentSections.length;
            var lastSection_1 = currentSections[columnDefinition.sections - 1];
            var lastSectionLastControl = lastSection_1.controls[lastSection_1.controls.length - 1];
            var newSectionsLength = columnDefinition.sections;
            // Find the index of the last control in the section where we will move controls to.
            var controlIndex_1 = 1;
            if (lastSectionLastControl) {
                controlIndex_1 = lastSectionLastControl.position.controlIndex;
            }
            // Change the section factor for the sections left after the reduction.
            for (var i = 0; i < newSectionsLength; ++i) {
                currentSections[i].changeFactor(columnDefinition.factor[i]);
            }
            // Move the controls into the last remaining section after the reduction and dispose of the old sections.
            for (var i = currentSectionsLength - 1; i >= newSectionsLength; --i) {
                currentSections[i].controls.forEach(function (control) {
                    /**
                     * Moving the control currently will re-instantiate the web part due to the section being removed.
                     * Although the key on the WebPartZone will be the same as it was before, it is now a part of a new
                     * sub-tree so React can not reconcile the DOM by just moving the elements.
                     */
                    var controlComponent = _this._getControlComponentById(control.id);
                    // The control component could be undefined when the web part is not mounted after creation or being moved.
                    // Which also means the control has not been updated by user.
                    // We can then use the canvas control directly without serialization.
                    var newControl = controlComponent ? controlComponent.serialize() : control;
                    newControl.position = _CanvasLayout__WEBPACK_IMPORTED_MODULE_4__["CanvasLayout"].cloneMerge(newControl.position, {
                        zoneIndex: undefined,
                        sectionIndex: lastSection_1.index,
                        sectionFactor: lastSection_1.factor,
                        controlIndex: ++controlIndex_1,
                        layoutIndex: undefined
                    });
                    newControl.addedFromPersistedData = true;
                    lastSection_1.addControl(newControl);
                });
                currentSections[i].dispose();
                this._sectionsMap.delete(currentSections[i].index);
            }
            qos.writeSuccess();
        }
        catch (err) {
            qos.writeUnexpectedFailure('Exception', err);
        }
    };
    CanvasZonePart.prototype._getCurrentColumnSize = function () {
        var sections = this.sections;
        var sectionsLength = sections.length;
        var firstSectionFactor = sections[0].factor;
        /**
         * Since the first factor of any IColumnDefinition with the same sections value is different
         * we can use firstSectionFactor to compare to the first factor of the column definition.
         */
        var columnSize;
        if (sectionsLength === 1) {
            columnSize = firstSectionFactor === 0 ? _canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].FullWidth : _canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].OneColumn;
        }
        else if (sectionsLength === 2) {
            if (firstSectionFactor === 4) {
                columnSize = _canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].OneThirdColumnLeft;
            }
            else if (firstSectionFactor === 6) {
                columnSize = _canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].TwoColumns;
            }
            else if (firstSectionFactor === 8) {
                columnSize = _canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].OneThirdColumnRight;
            }
        }
        else if (sectionsLength === 3) {
            columnSize = _canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].ThreeColumns;
        }
        return columnSize; // Todo#661360 Fix workaround left-over
    };
    CanvasZonePart.prototype._moveControlInSection = function (control, newControlPosition) {
        var actualNewPosition = newControlPosition;
        var section = this._sectionsMap.get(newControlPosition.sectionIndex);
        if (section) {
            actualNewPosition = section.moveControl(control, newControlPosition);
        }
        return actualNewPosition;
    };
    CanvasZonePart.columnDefinitionMap = new Map([
        [_canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].OneColumn, { sections: 1, factor: [12] }],
        [_canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].FullWidth, { sections: 1, factor: [0] }],
        [_canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].TwoColumns, { sections: 2, factor: [6, 6] }],
        [_canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].ThreeColumns, { sections: 3, factor: [4, 4, 4] }],
        [_canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].OneThirdColumnRight, { sections: 2, factor: [8, 4] }],
        [_canvasControl__WEBPACK_IMPORTED_MODULE_3__["CanvasControlType"].OneThirdColumnLeft, { sections: 2, factor: [4, 8] }]
    ] /* fix this typecast, VSO:397687 */);
    return CanvasZonePart;
}());



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

/***/ "@microsoft/sp-webpart-base":
/*!*********************************************!*\
  !*** external "@microsoft/sp-webpart-base" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_webpart_base__;

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

/***/ "@ms/sp-anchor":
/*!********************************!*\
  !*** external "@ms/sp-anchor" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_anchor__;

/***/ }),

/***/ "@ms/sp-component-utilities":
/*!*********************************************!*\
  !*** external "@ms/sp-component-utilities" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_component_utilities__;

/***/ }),

/***/ "@ms/sp-deferred-component":
/*!********************************************!*\
  !*** external "@ms/sp-deferred-component" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_deferred_component__;

/***/ }),

/***/ "@ms/sp-dragzone":
/*!**********************************!*\
  !*** external "@ms/sp-dragzone" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_dragzone__;

/***/ }),

/***/ "@ms/sp-load-themed-styles":
/*!********************************************!*\
  !*** external "@ms/sp-load-themed-styles" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_load_themed_styles__;

/***/ }),

/***/ "@ms/sp-safehtml":
/*!**********************************!*\
  !*** external "@ms/sp-safehtml" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__ms_sp_safehtml__;

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
//# sourceMappingURL=sp-canvas_en-us.js.map