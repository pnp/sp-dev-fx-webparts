define("4958ea79-6ff3-4480-8291-0932dd010869_1.11.0", ["@microsoft/sp-core-library","@microsoft/sp-extension-base","@microsoft/sp-diagnostics"], function(__WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_ZFc5__, __WEBPACK_EXTERNAL_MODULE_ut3N__) { return /******/ (function(modules) { // webpackBootstrap
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

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "ZFc5":
/*!***********************************************!*\
  !*** external "@microsoft/sp-extension-base" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ZFc5__;

/***/ }),

/***/ "g4sJ":
/*!********************************************!*\
  !*** ./lib/SearchQueryExtensionManager.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-extension-base */ "ZFc5");
/* harmony import */ var _microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _BaseSearchQueryModifier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BaseSearchQueryModifier */ "opha");
/* harmony import */ var _SearchQueryModifierContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SearchQueryModifierContext */ "tBLM");
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





/**
 * Manages SearchQueryModifier extensions.
 * This is used by sp-application-base:SearchQueryManager to process a search query through the modifiers.
 *
 * @internal
 */
var SearchQueryExtensionManager = /** @class */ (function () {
    function SearchQueryExtensionManager(serviceScope) {
        this._extensionManager = new _microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_2__["_ExtensionManager"](serviceScope, _BaseSearchQueryModifier__WEBPACK_IMPORTED_MODULE_3__["default"]);
        this._extensions = [];
    }
    /**
     * {@inheritDoc _ISearchQueryExtensionManager.initializeExtensions}
     */
    SearchQueryExtensionManager.prototype.initializeExtensions = function (customActions) {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('SearchQueryExtensionManager.initializeExtensions');
        var modifierCustomActions = this._getCustomActions(customActions)
            .filter(function (ca) { return ca.location === 'ClientSideExtension.SearchQueryModifier'; }) // VSO #770394 - Re-use the string
            .sort(function (ca1, ca2) { return (ca1.sequence || Number.MAX_VALUE) - (ca2.sequence || Number.MAX_VALUE); });
        var extensionPromises = modifierCustomActions.map(function (customAction) {
            return _this._extensionManager.createExtension(customAction.clientSideComponentId.toString(), customAction.clientSideComponentProperties, function (params) { return new _SearchQueryModifierContext__WEBPACK_IMPORTED_MODULE_4__["default"](params); });
        });
        return Promise.all(extensionPromises)
            .then(function (loadedExtensions) {
            _this._extensions = loadedExtensions;
            var numberOfExtensions = _this._extensions.length;
            qosMonitor.writeSuccess({ numberOfExtensions: numberOfExtensions });
            return numberOfExtensions;
        })
            .catch(function (e) {
            qosMonitor.writeUnexpectedFailure(undefined, e, { numberOfExtensions: 0 });
            throw e;
        });
    };
    /**
     * {@inheritDoc _ISearchQueryExtensionManager.getSearchQuery}
     */
    SearchQueryExtensionManager.prototype.getSearchQuery = function (queryText) {
        var _this = this;
        var result = Promise.resolve({
            queryText: queryText,
            originalQueryText: queryText
        });
        this._extensions.forEach(function (extension) {
            result = result.then(function (q) { return _this._processQuery(extension, q, queryText); });
        });
        return result.then(function (q) { return q.queryText; });
    };
    SearchQueryExtensionManager.prototype._processQuery = function (extension, query, originalQueryText) {
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('SearchQueryExtensionManager.processQuery');
        var extraData = {
            componentId: extension.componentId,
            alias: extension.manifest.alias
        };
        var timeoutPromise = new Promise(function (resolve) {
            setTimeout(function () {
                qosMonitor.writeExpectedFailure('Timeout', undefined, extraData);
                resolve(query);
            }, extension.timeout);
        });
        return Promise.race([
            timeoutPromise,
            extension.modifySearchQuery(__assign({}, query, { originalQueryText: originalQueryText }), _BaseSearchQueryModifier__WEBPACK_IMPORTED_MODULE_3__["SearchQueryScenario"].SearchResults)
        ])
            .then(function (q) {
            qosMonitor.writeSuccess(extraData);
            return q;
        })
            .catch(function (e) {
            qosMonitor.writeUnexpectedFailure(undefined, e, extraData);
            throw e;
        });
    };
    SearchQueryExtensionManager.prototype._getCustomActions = function (customActions) {
        return this._getDebugCustomActions().concat(customActions);
    };
    // Minimal code. Taken from ApplicationCustomizerLoader. Should be refactored. VSO #770394
    SearchQueryExtensionManager.prototype._getDebugCustomActions = function () {
        var result = [];
        var parameters = new URL(window.location.href).searchParams;
        var parameterValue = parameters.get('customActions');
        if (parameterValue) {
            var decodedParameterValue = decodeURIComponent(parameterValue);
            var queryValue = JSON.parse(decodedParameterValue);
            if (queryValue) {
                for (var _i = 0, _a = Object.keys(queryValue); _i < _a.length; _i++) {
                    var key = _a[_i];
                    var clientSideComponentId = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(key);
                    var location_1 = queryValue[key].location;
                    var sequence = queryValue[key].sequence;
                    result.push({
                        clientSideComponentId: clientSideComponentId.toString(),
                        location: location_1,
                        sequence: sequence
                    });
                }
            }
        }
        return result;
    };
    return SearchQueryExtensionManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (SearchQueryExtensionManager);


/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: BaseSearchQueryModifier, SearchQueryScenario, SearchQueryModifierContext, _SearchQueryExtensionManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseSearchQueryModifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseSearchQueryModifier */ "opha");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseSearchQueryModifier", function() { return _BaseSearchQueryModifier__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchQueryScenario", function() { return _BaseSearchQueryModifier__WEBPACK_IMPORTED_MODULE_0__["SearchQueryScenario"]; });

/* harmony import */ var _SearchQueryModifierContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchQueryModifierContext */ "tBLM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchQueryModifierContext", function() { return _SearchQueryModifierContext__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _SearchQueryExtensionManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchQueryExtensionManager */ "g4sJ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_SearchQueryExtensionManager", function() { return _SearchQueryExtensionManager__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/**
 * SharePoint Framework developer support for customizing search.
 *
 * @packagedocumentation
 */





/***/ }),

/***/ "opha":
/*!****************************************!*\
  !*** ./lib/BaseSearchQueryModifier.js ***!
  \****************************************/
/*! exports provided: SearchQueryScenario, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchQueryScenario", function() { return SearchQueryScenario; });
/* harmony import */ var _microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-extension-base */ "ZFc5");
/* harmony import */ var _microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_0__);
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
 * Scenario for the search query modifier.
 *
 * @beta
 */
var SearchQueryScenario;
(function (SearchQueryScenario) {
    /**
     * Search results scenario.
     */
    SearchQueryScenario[SearchQueryScenario["SearchResults"] = 1] = "SearchResults";
    /**
     * Search suggestions scenario.
     */
    SearchQueryScenario[SearchQueryScenario["SearchSuggestions"] = 2] = "SearchSuggestions";
})(SearchQueryScenario || (SearchQueryScenario = {}));
/**
 * This is the base class that third parties should extend when implementing
 * a client-side extension that can modify the search query.
 *
 * In the component manifest, the "extensionType" should be set to "SearchQueryModifier".
 *
 * @beta
 */
var BaseSearchQueryModifier = /** @class */ (function (_super) {
    __extends(BaseSearchQueryModifier, _super);
    function BaseSearchQueryModifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BaseSearchQueryModifier.prototype, "timeout", {
        /**
         * Timeout for the search query modifier in milliseconds.
         * If the execution takes longer than the timeout, the original query will be used instead of the modified one.
         *
         * @virtual
         */
        get: function () { return 10000; },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a modified search query.
     *
     * @param query - Query to modify.
     * @param scenario - Search scenario.
     * @returns - Modified query.
     *
     * @virtual
     */
    BaseSearchQueryModifier.prototype.modifySearchQuery = function (query, scenario) {
        return Promise.resolve(query);
    };
    return BaseSearchQueryModifier;
}(_microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_0__["BaseExtension"]));
/* harmony default export */ __webpack_exports__["default"] = (BaseSearchQueryModifier);


/***/ }),

/***/ "tBLM":
/*!*******************************************!*\
  !*** ./lib/SearchQueryModifierContext.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-extension-base */ "ZFc5");
/* harmony import */ var _microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_0__);
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
 * Context for the search query modifier extensions.
 *
 * @beta
 */
var SearchQueryModifierContext = /** @class */ (function (_super) {
    __extends(SearchQueryModifierContext, _super);
    function SearchQueryModifierContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SearchQueryModifierContext;
}(_microsoft_sp_extension_base__WEBPACK_IMPORTED_MODULE_0__["ExtensionContext"]));
/* harmony default export */ __webpack_exports__["default"] = (SearchQueryModifierContext);


/***/ }),

/***/ "ut3N":
/*!********************************************!*\
  !*** external "@microsoft/sp-diagnostics" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ut3N__;

/***/ })

/******/ })});;
//# sourceMappingURL=sp-search-extensibility.js.map