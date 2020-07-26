define("3157040b-4feb-40c4-9fe5-ec3b41d679ff_0.1.0", ["@ms/sp-telemetry","@microsoft/sp-core-library","@microsoft/sp-page-context","@ms/sp-component-utilities","@microsoft/sp-http"], function(__WEBPACK_EXTERNAL_MODULE__2q6Q__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_X_PM__, __WEBPACK_EXTERNAL_MODULE_hiL___, __WEBPACK_EXTERNAL_MODULE_vlQI__) { return /******/ (function(modules) { // webpackBootstrap
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

/***/ "2q6Q":
/*!***********************************!*\
  !*** external "@ms/sp-telemetry" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2q6Q__;

/***/ }),

/***/ "6+wH":
/*!***********************************************************!*\
  !*** ./lib/sphome/SPHomeMicroserviceNotAvailableError.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @internal
 */
var SPHomeMicroserviceNotAvailableError = /** @class */ (function () {
    function SPHomeMicroserviceNotAvailableError(message) {
        this.name = 'SPHomeMicroserviceNotAvailableError';
        this.message = 'SPHome Microservice not available in this environment';
        this.message = message || this.message;
    }
    return SPHomeMicroserviceNotAvailableError;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPHomeMicroserviceNotAvailableError);


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

/***/ "bDzi":
/*!****************************************!*\
  !*** ./lib/sphome/SPHomeHttpClient.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _SPHomeMicroserviceNotAvailableError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SPHomeMicroserviceNotAvailableError */ "6+wH");







// Window Variables
var TOKEN_EXP_OFFSET = 15000; // 15 seconds
var SPHOME_CLIENT_CONTEXT = '_spHomeClientContext';
var TOKEN_PREFETCH_COMPLETE = '_spHomeClientContextLoaded';
/**
 * SPHomeHttpClient is used to perform REST calls to the SharePoint Home microservice.
 * For API documentation see https://aka.ms/sphomeapidoc
 * It abstracts the fetching of tokens and passing the correct headers
 * when calling the microservice.
 * @internal
 */
var SPHomeHttpClient = /** @class */ (function () {
    function SPHomeHttpClient(serviceScope) {
        var _this = this;
        this._isServiceAvailable = undefined;
        this._hasPrefetchedToken = false;
        if (this._isPrefetchTokenFlightEnabled) {
            this._initializeFromPrefetchedToken = new Promise(function (resolve, reject) {
                window[TOKEN_PREFETCH_COMPLETE] = function () {
                    var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('SpHomeClientContextPrefetch');
                    try {
                        _this._initializeWithPrefetchedToken();
                        if (!_this._hasPrefetchedToken) {
                            qosMonitor.writeUnexpectedFailure('NoPrefetchedToken');
                        }
                        else {
                            qosMonitor.writeSuccess();
                        }
                    }
                    catch (error) {
                        qosMonitor.writeUnexpectedFailure('Unexpected', error);
                        reject(error);
                    }
                    resolve();
                };
            });
        }
        serviceScope.whenFinished(function () {
            _this._spHttpClient = serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__["SPHttpClient"].serviceKey);
            _this._httpClient = serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"].serviceKey);
            _this._pageContext = serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_4__["PageContext"].serviceKey);
            if (_this._isPrefetchTokenFlightEnabled) {
                _this._initializeWithPrefetchedToken();
            }
        });
    }
    SPHomeHttpClient.prototype.get = function (path, version) {
        var _this = this;
        return this._fetchTokenIfExpired().then(function () {
            return _this._httpClient.get(_this._generateUrl(path, version), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"].configurations.v1, _this._getRequestOptions());
        });
    };
    SPHomeHttpClient.prototype.post = function (path, body, version) {
        var _this = this;
        if (body === void 0) { body = ''; }
        return this._fetchTokenIfExpired().then(function () {
            return _this._httpClient.post(_this._generateUrl(path, version), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"].configurations.v1, _this._getRequestOptions({ body: body }));
        });
    };
    Object.defineProperty(SPHomeHttpClient.prototype, "isServiceAvailable", {
        get: function () {
            var _this = this;
            // Use cached value since _fetchTokenIfExpired will otherwise
            // retry even if it already determined that service isn't available.
            if (this._isServiceAvailable !== undefined) {
                return Promise.resolve(this._isServiceAvailable);
            }
            else {
                return this._fetchTokenIfExpired()
                    .then(function () {
                    _this._isServiceAvailable = true;
                    return _this._isServiceAvailable;
                })
                    .catch(function (error) {
                    _this._isServiceAvailable = false;
                    return _this._isServiceAvailable;
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    SPHomeHttpClient.prototype._generateUrl = function (path, version) {
        if (version === void 0) { version = 1; }
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Text"].format(SPHomeHttpClient.MICROSERVICE_ENDPOINT, this._url, version, path);
    };
    SPHomeHttpClient.prototype._isTokenValid = function () {
        return this._tokenExpiry && this._tokenExpiry > new Date();
    };
    /**
     * To talk with the microservice we need three pieces of information:
     * - the url of the microservice to talk to
     * - the token to pass to the microservice for authentication
     * - the payload we need to pass to the microservice so it understands how
     *   to talk to sharepoint
     * These all come from the same endpoint and can be fetched in a single request
     */
    SPHomeHttpClient.prototype._getTokenAndMicroserviceDetails = function () {
        var _this = this;
        var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('SPHomeHttpClient');
        var correlationId;
        var url = this._pageContext.web.absoluteUrl + "/_api/sphomeservice/context?$expand=Token,Payload";
        return this._spHttpClient.get(url, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_2__["SPHttpClient"].configurations.v1)
            .then(function (response) {
            correlationId = response.correlationId ? response.correlationId.toString() : undefined;
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                qosMonitor.writeUnexpectedFailure('FailedResponse', error, {
                    correlationId: correlationId,
                    Status: response.status
                });
                throw error;
            }
        })
            .then(function (response) {
            if (!response.Token || !response.Token.access_token) {
                _this._isServiceAvailable = false;
                throw new _SPHomeMicroserviceNotAvailableError__WEBPACK_IMPORTED_MODULE_5__["default"]();
            }
            _this._isServiceAvailable = true;
            _this._token = response.Token.access_token;
            _this._tokenExpiry = new Date((Number(response.Token.expires_on) * 1000) - TOKEN_EXP_OFFSET);
            _this._payload = response.Payload;
            _this._url = response.Urls[0];
            _this._alreadyGettingTokenPromise = undefined;
            qosMonitor.writeSuccess();
        })
            .catch(function (error) {
            if (error instanceof _SPHomeMicroserviceNotAvailableError__WEBPACK_IMPORTED_MODULE_5__["default"]) {
                qosMonitor.writeExpectedFailure('NotAvailable', error, { correlationId: correlationId });
            }
            else {
                qosMonitor.writeUnexpectedFailure('SPHomeHttpClient', error, { correlationId: correlationId });
            }
            _this._alreadyGettingTokenPromise = undefined;
            throw error;
        });
    };
    SPHomeHttpClient.prototype._getRequestOptions = function (options) {
        if (options === void 0) { options = {}; }
        options.headers = options.headers || {};
        options.headers['Authorization'] = "Bearer " + this._token; // tslint:disable-line:no-string-literal
        options.headers['SPHome-ApiContext'] = this._payload;
        options.headers['Content-Type'] = 'application/json';
        options.headers['SPHome-ClientType'] = 'PagesWeb';
        return options;
    };
    SPHomeHttpClient.prototype._initializeWithPrefetchedToken = function () {
        var qosMonitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('InitializeSpHomeClientContext');
        try {
            if (!this._hasPrefetchedToken) {
                if (window[SPHOME_CLIENT_CONTEXT]
                    && window[SPHOME_CLIENT_CONTEXT] !== []) {
                    var spHomeClientContext = window[SPHOME_CLIENT_CONTEXT];
                    var token = spHomeClientContext.Token;
                    this._token = token && token.AccessToken;
                    this._payload = spHomeClientContext.Payload;
                    this._url = spHomeClientContext.Urls && spHomeClientContext.Urls[0];
                    this._tokenExpiry =
                        token
                            && token.ExpiresOn
                            && new Date((Number(spHomeClientContext.Token.ExpiresOn) * 1000) - TOKEN_EXP_OFFSET);
                    this._hasPrefetchedToken = true;
                    qosMonitor.writeSuccess();
                }
                else {
                    if (window[SPHOME_CLIENT_CONTEXT] === []) {
                        qosMonitor.writeUnexpectedFailure('SPHomeClientContextNotAvailable', new Error('EmptyTokenReturned'));
                    }
                    else {
                        qosMonitor.writeExpectedFailure('SPHomeClientContextNotAvailable', new Error('TokenNotAvailable'));
                    }
                }
            }
        }
        catch (error) {
            this._hasPrefetchedToken = false;
            qosMonitor.writeUnexpectedFailure('InitializeSPHomeClientContextFailed', error.message);
        }
        return this._hasPrefetchedToken;
    };
    SPHomeHttpClient.prototype._fetchTokenIfExpired = function () {
        if (this._isTokenValid()) {
            return Promise.resolve();
        }
        if (!this._alreadyGettingTokenPromise) {
            if (this._isPrefetchTokenFlightEnabled) {
                var promiseRaceMap = new Map();
                promiseRaceMap.set(0 /* PrefetchToken */, this._initializeFromPrefetchedToken);
                promiseRaceMap.set(1 /* MicroServiceToken */, this._getTokenAndMicroserviceDetails());
                this._alreadyGettingTokenPromise =
                    _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_1__["SmartRace"].race(promiseRaceMap).then(function (raceResponse) {
                        return raceResponse.raceResponseAsync;
                    }).catch(function (error) {
                        throw error;
                    });
            }
            else {
                this._alreadyGettingTokenPromise = this._getTokenAndMicroserviceDetails();
            }
        }
        return this._alreadyGettingTokenPromise;
    };
    Object.defineProperty(SPHomeHttpClient.prototype, "_isPrefetchTokenFlightEnabled", {
        get: function () {
            return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["_SPFlight"].isEnabled(1265 /* SPHomeServiceContextPrefetch */);
        },
        enumerable: true,
        configurable: true
    });
    SPHomeHttpClient.serviceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["ServiceKey"].create('sp-component-utilities:SPHomeHttpClient', SPHomeHttpClient);
    SPHomeHttpClient.MICROSERVICE_ENDPOINT = '{0}/api/v{1}/{2}';
    return SPHomeHttpClient;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPHomeHttpClient);


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
/*! exports provided: SPHomeHttpClient, SPHomeMicroserviceNotAvailableError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sphome_SPHomeHttpClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sphome/SPHomeHttpClient */ "bDzi");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPHomeHttpClient", function() { return _sphome_SPHomeHttpClient__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _sphome_SPHomeMicroserviceNotAvailableError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sphome/SPHomeMicroserviceNotAvailableError */ "6+wH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPHomeMicroserviceNotAvailableError", function() { return _sphome_SPHomeMicroserviceNotAvailableError__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "vlQI":
/*!*************************************!*\
  !*** external "@microsoft/sp-http" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vlQI__;

/***/ })

/******/ })});;
//# sourceMappingURL=sp-home-http-client.js.map