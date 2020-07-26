define("6e6e2204-49cb-4172-b923-32eaa7d8fe5b_0.1.0", ["@microsoft/sp-core-library","@microsoft/sp-http","resx-strings","@ms/odsp-utilities-bundle"], function(__WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_vlQI__, __WEBPACK_EXTERNAL_MODULE_vpy3__, __WEBPACK_EXTERNAL_MODULE_y88i__) { return /******/ (function(modules) { // webpackBootstrap
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

/***/ "+sVg":
/*!*****************************!*\
  !*** ./lib/SPDataSource.js ***!
  \*****************************/
/*! exports provided: SPDataSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPDataSource", function() { return SPDataSource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _BaseDataSource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BaseDataSource */ "7J3w");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loc/Strings.resx */ "qITA");





// @todo: VSO: 335499 Move data sources to odsp-datasources
/**
 * @internal
 */
var SPDataSource = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SPDataSource, _super);
    function SPDataSource(options) {
        var _this = _super.call(this, options) || this;
        _this._spHttpClient = options.spHttpClient;
        return _this;
    }
    /**
     * Issue an HTTP GET to a REST resource.
     *
     * Parameter values must be sanitized for the URL beforehand.
     * @param baseEndPoint - path to the site providing the api end point
     * @param apiRelativePath - REST endpoint which may include query string parameters
     * @param queryString - additional query string parameters not already in the apiRelativePath
     * @param dataSourceName - data source name for error output
     * @param dataSourceMethodName - data source method name for error output
     * @param headers - headers to append to the request
     * @param throwHttpClientResponse - Throw the response error rather than a generated error
     * @param skipJsonParse - Optionally skip JSON.parse of response
     */
    SPDataSource.prototype.get = function (baseEndPoint, apiRelativePath, queryString, dataSourceName, dataSourceMethodName, 
    // work-around a build issue, declaring "headers?: Header" adds whatwg-fetch dependency
    // @todo: VSO #339907 to resolve the issue so the "any" can be changed to "Header".
    headers, // tslint:disable-line:no-any
    throwHttpClientResponse, skipJsonParse) {
        var requestUrl = this.buildUrl(baseEndPoint, apiRelativePath, queryString);
        return this._getResponse(this._spHttpClient.get(requestUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, { headers: headers }), dataSourceName, dataSourceMethodName, throwHttpClientResponse, skipJsonParse);
    };
    /**
     * Issue an HTTP POST to a REST resource.
     *
     * URL related parameter values must be sanitized beforehand.
     * @param baseEndPoint - path to the site providing the api end point
     * @param apiRelativePath - REST endpoint which may include query string parameters
     * @param queryString - additional query string parameters not already in the apiRelativePath
     * @param body - JSON content to post to the REST API
     * @param dataSourceName - data source name for error output
     * @param dataSourceMethodName - data source method name for error output
     * @param headers - headers to append to the request
     * @param throwHttpClientResponse - include raw response as error output
     * @param skipJsonParse - Optionally skip JSON.parse of response
     */
    SPDataSource.prototype.post = function (baseEndPoint, apiRelativePath, queryString, body, dataSourceName, dataSourceMethodName, 
    // work-around a build issue, declaring "headers?: Header" adds whatwg-fetch dependency
    // @todo: VSO #339907 to resolve the issue so the "any" can be changed to "Header".
    headers, // tslint:disable-line:no-any
    throwHttpClientResponse, skipJsonParse) {
        var requestUrl = this.buildUrl(baseEndPoint, apiRelativePath, queryString);
        return this._getResponse(this._spHttpClient.post(requestUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, { body: body, headers: headers }), dataSourceName, dataSourceMethodName, throwHttpClientResponse, skipJsonParse);
    };
    /**
     * Issue an HTTP PATCH to a REST resource.
     *
     * URL related parameter values must be sanitized beforehand.
     * @param baseEndPoint - path to the site providing the api end point
     * @param apiRelativePath - REST endpoint which may include query string parameters
     * @param queryString - additional query string parameters not already in the apiRelativePath
     * @param body - JSON content to patch to the REST API
     * @param dataSourceName - data source name for error output
     * @param dataSourceMethodName - data source method name for error output
     * @param headers - headers to append to the request
     * @param throwHttpClientResponse - include raw response as error output
     * @param skipJsonParse - Optionally skip JSON.parse of response
     */
    SPDataSource.prototype.patch = function (baseEndPoint, apiRelativePath, queryString, body, dataSourceName, dataSourceMethodName, 
    // work-around a build issue, declaring "headers?: Header" adds whatwg-fetch dependency
    // @todo: VSO #339907 to resolve the issue so the "any" can be changed to "Header".
    headers, // tslint:disable-line:no-any
    throwHttpClientResponse, skipJsonParse) {
        var requestUrl = this.buildUrl(baseEndPoint, apiRelativePath, queryString);
        return this._getResponse(this._spHttpClient.fetch(requestUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, { body: body, headers: headers, method: 'PATCH' }), dataSourceName, dataSourceMethodName, throwHttpClientResponse, skipJsonParse);
    };
    SPDataSource.prototype._getResponse = function (promise, dataSourceName, dataSourceMethodName, throwHttpClientResponse, skipJsonParse) {
        return promise.then(function (response) {
            if (response.ok) {
                if (skipJsonParse) {
                    return {};
                }
                else {
                    return response.json();
                }
            }
            else {
                var errorMessage_1 = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_4__["default"].DataSourceResponseError, dataSourceName, dataSourceMethodName, response.status, response.statusMessage);
                if (throwHttpClientResponse) {
                    throw response;
                }
                else {
                    return response.json().then(function (error) {
                        throw {
                            message: errorMessage_1,
                            status: response.status,
                            correlationId: response.correlationId ? response.correlationId.toString() : '',
                            innerError: error
                        };
                    });
                }
            }
        });
    };
    return SPDataSource;
}(_BaseDataSource__WEBPACK_IMPORTED_MODULE_3__["BaseDataSource"]));



/***/ }),

/***/ "7J3w":
/*!*******************************!*\
  !*** ./lib/BaseDataSource.js ***!
  \*******************************/
/*! exports provided: BaseDataSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseDataSource", function() { return BaseDataSource; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

// @todo: VSO: 335499 Move data sources to odsp-datasources
/**
 * @internal
 */
var BaseDataSource = /** @class */ (function () {
    function BaseDataSource(options) {
        this._pageContext = options.pageContext;
    }
    BaseDataSource.prototype.buildUrl = function (webAbsoluteUrl, apiRelativePath, queryString) {
        var webUrl = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["UrlUtilities"].removeEndSlash(webAbsoluteUrl);
        var pathSeparator = apiRelativePath.indexOf('/') === 0 ? '' : '/';
        var queryStringSeparator = apiRelativePath.indexOf('?') > -1 ? '&' : '?';
        return "" + webUrl + pathSeparator + apiRelativePath + (queryString ? queryStringSeparator + queryString : '');
    };
    Object.defineProperty(BaseDataSource.prototype, "pageContext", {
        get: function () {
            return this._pageContext;
        },
        enumerable: true,
        configurable: true
    });
    return BaseDataSource;
}());



/***/ }),

/***/ "Qckh":
/*!****************************************!*\
  !*** ./lib/ODataQueryStringBuilder.js ***!
  \****************************************/
/*! exports provided: ODataQueryStringBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ODataQueryStringBuilder", function() { return ODataQueryStringBuilder; });
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__);

/**
 * @internal
 */
var ODataQueryStringBuilder = /** @class */ (function () {
    function ODataQueryStringBuilder() {
    }
    /**
     * Helper method to build a query string with OData options including $select, $filter, $top, $skip, $orderby
     * and $expand.
     * @param request - query options in IODataRequest format
     */
    ODataQueryStringBuilder.generateQueryString = function (request) {
        var queryString = request.queryString || '';
        var fields = request.fields ? request.fields.map(function (field) {
            return _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["UriEncoding"].encodeURIComponent(field);
        }).join(',') : undefined;
        queryString += this._generateOption(queryString, 'select', fields, false) +
            this._generateOption(queryString, 'filter', request.filter, true) +
            this._generateOption(queryString, 'top', request.top, true) +
            this._generateOption(queryString, 'skip', request.skip, true) +
            this._generateOption(queryString, 'orderby', request.orderBy, true) +
            this._generateOption(queryString, 'expand', request.expand, true);
        // remove the initial '&'
        if (queryString.indexOf('&') === 0) {
            queryString = queryString.slice(1);
        }
        return queryString;
    };
    ODataQueryStringBuilder._generateOption = function (queryString, option, value, sanitize) {
        if (value && queryString.indexOf("$" + option) === -1) {
            var stringValue = sanitize ? _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_0__["UriEncoding"].encodeRestUriStringToken(value.toString()) : value.toString();
            return "&$" + option + "=" + stringValue;
        }
        else {
            return '';
        }
    };
    return ODataQueryStringBuilder;
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

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: BaseDataSource, SPDataSource, ODataQueryStringBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseDataSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseDataSource */ "7J3w");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseDataSource", function() { return _BaseDataSource__WEBPACK_IMPORTED_MODULE_0__["BaseDataSource"]; });

/* harmony import */ var _SPDataSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SPDataSource */ "+sVg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPDataSource", function() { return _SPDataSource__WEBPACK_IMPORTED_MODULE_1__["SPDataSource"]; });

/* harmony import */ var _ODataQueryStringBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ODataQueryStringBuilder */ "Qckh");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ODataQueryStringBuilder", function() { return _ODataQueryStringBuilder__WEBPACK_IMPORTED_MODULE_2__["ODataQueryStringBuilder"]; });

// building blocks


// helpers



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

/******/ })});;
//# sourceMappingURL=sp-base-data-source.js.map