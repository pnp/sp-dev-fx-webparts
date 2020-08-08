define("dd6f4302-b840-4db3-919d-e8bcba06daaa_0.1.0", ["@microsoft/sp-core-library","@ms/sp-component-utilities"], function(__WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_hiL___) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "mwqp");
/******/ })
/************************************************************************/
/******/ ({

/***/ "DAU6":
/*!*******************************!*\
  !*** ./lib/ContentHandler.js ***!
  \*******************************/
/*! exports provided: ContentHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentHandler", function() { return ContentHandler; });
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _UrlUtility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UrlUtility */ "z7It");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */



/**
 * This library handles dynamic creation of web parts based on content from external sources.
 *
 * @internal
 *
 */
var ContentHandler = /** @class */ (function () {
    function ContentHandler() {
    }
    ContentHandler.getWebPartType = function (data) {
        var webPartType = "None" /* None */;
        if (data instanceof (Blob) && data.type) {
            if (data.type.match(ContentHandler.dataTypeImageRegExp)) {
                webPartType = "Image" /* Image */;
            }
            else if (data.type.match(ContentHandler.dataTypeFileRegExp)) {
                webPartType = "Document" /* Document */;
            }
        }
        else if (_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["UrlUtility"].isYoutubeURL(data)) {
            webPartType = "YouTube" /* YouTube */;
        }
        else if (_UrlUtility__WEBPACK_IMPORTED_MODULE_2__["default"].isStreamURL(data)) {
            webPartType = "Stream" /* Stream */;
        }
        else if (_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["UrlUtility"].isValidURL(data)) {
            webPartType = "LinkPreview" /* LinkPreview */;
        }
        return webPartType;
    };
    ContentHandler.getWebPartProperties = function (webPartType, data) {
        var id = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].newGuid().toString();
        switch (webPartType) {
            case "Image" /* Image */:
                return { id: id, imageBlob: data, linkUrl: '' };
            case "Document" /* Document */:
                return { id: id, externalFile: data };
            case "YouTube" /* YouTube */:
                return { id: id, embedCode: data };
            case "Stream" /* Stream */:
                return { id: id, videoSource: data, isStream: true };
            case "LinkPreview" /* LinkPreview */:
                /*
                  When we paste a link, we don't want the link to stay there
                  So we'll need to change the linkPreviewComponentMode to onlyShowPreview
                  Which is a enum type with the value 2
          
                  This is copied from webparts\sp-publishing-webparts\src\webparts\linkPreviewWebPart\LinkPreview.tsx:
                  export const enum LinkPreviewComponentMode {
                    showBoth = 0,
                    onlyShowLink,
                    onlyShowPreview
                  }
                */
                return { id: id, url: data, linkPreviewComponentMode: 2 };
        }
        return undefined;
    };
    ContentHandler.dataTypeImageRegExp = RegExp('^image/');
    ContentHandler.dataTypeFileRegExp = RegExp('^application/|^video/');
    return ContentHandler;
}());



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

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "fCCa":
/*!*****************************!*\
  !*** ./lib/KillSwitches.js ***!
  \*****************************/
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
    KillSwitches.urlUtilityRefactor = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["KillSwitch"]('77727f04-2ebb-4f7a-b916-692003f4dec7' /* '10/01/2019', 'Refactor URL utilities' */);
    return KillSwitches;
}());



/***/ }),

/***/ "hiL/":
/*!*********************************************!*\
  !*** external "@ms/sp-component-utilities" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_hiL___;

/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: ContentHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ContentHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContentHandler */ "DAU6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContentHandler", function() { return _ContentHandler__WEBPACK_IMPORTED_MODULE_0__["ContentHandler"]; });

/**
 *
 * This library handles dynamic creation of web parts based on content from external sources.
 *
 * @packagedocumentation
 */



/***/ }),

/***/ "z7It":
/*!***************************!*\
  !*** ./lib/UrlUtility.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-resource-path/lib/SPResourcePath */ "SzMl");
/* harmony import */ var _ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _KillSwitches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KillSwitches */ "fCCa");
// @copyright (c) Microsoft Corporation. All rights reserved.


var UrlUtility = /** @class */ (function () {
    function UrlUtility() {
    }
    Object.defineProperty(UrlUtility, "_getSecureProtocolRegExp", {
        get: function () {
            if (this._secureProtocolRegExp === undefined) {
                this._secureProtocolRegExp = /^https:\/\//i;
            }
            return this._secureProtocolRegExp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UrlUtility, "_getMicrosoftStreamRegExp", {
        get: function () {
            if (this._microsoftStreamRegExp === undefined) {
                this._microsoftStreamRegExp = /^.*microsoftstream.*/i;
            }
            return this._microsoftStreamRegExp;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @returns whether URL is a Stream URL.
     */
    UrlUtility.isStreamURL = function (embedCode) {
        if (_KillSwitches__WEBPACK_IMPORTED_MODULE_1__["KillSwitches"].urlUtilityRefactor.isActivated()) {
            var streamURLRegExp = /^https:\/\/.*microsoftstream.*/i;
            return streamURLRegExp.test(embedCode);
        }
        else {
            var resourcePath = new _ms_sp_resource_path_lib_SPResourcePath__WEBPACK_IMPORTED_MODULE_0__["SPResourcePath"](embedCode);
            if (!this._getSecureProtocolRegExp.test(resourcePath.authority)) {
                return false;
            }
            return this._getMicrosoftStreamRegExp.test(resourcePath.domain);
        }
    };
    return UrlUtility;
}());
/* harmony default export */ __webpack_exports__["default"] = (UrlUtility);


/***/ })

/******/ })});;
//# sourceMappingURL=content-handler-library.js.map