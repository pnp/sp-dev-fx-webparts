define("0773bd53-a69e-4293-87e6-ba80ea4d614b_1.11.0", ["@ms/sp-telemetry","@microsoft/sp-component-base","@microsoft/sp-loader","@microsoft/sp-core-library","@microsoft/sp-diagnostics","resx-strings","@microsoft/decorators"], function(__WEBPACK_EXTERNAL_MODULE__2q6Q__, __WEBPACK_EXTERNAL_MODULE__7Awa__, __WEBPACK_EXTERNAL_MODULE_I6O9__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_vpy3__, __WEBPACK_EXTERNAL_MODULE_wxtz__) { return /******/ (function(modules) { // webpackBootstrap
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

/***/ "7Awa":
/*!***********************************************!*\
  !*** external "@microsoft/sp-component-base" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7Awa__;

/***/ }),

/***/ "I6O9":
/*!***************************************!*\
  !*** external "@microsoft/sp-loader" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_I6O9__;

/***/ }),

/***/ "M+WR":
/*!*********************************!*\
  !*** ./lib/ExtensionContext.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-component-base */ "7Awa");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__);
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
 * The base class for context objects for client-side extensions.
 *
 * @public
 */
var ExtensionContext = /** @class */ (function (_super) {
    __extends(ExtensionContext, _super);
    /** @internal */
    function ExtensionContext(parameters) {
        return _super.call(this, parameters) || this;
    }
    return ExtensionContext;
}(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__["BaseComponentContext"]));
/* harmony default export */ __webpack_exports__["default"] = (ExtensionContext);


/***/ }),

/***/ "OZJt":
/*!*********************************!*\
  !*** ./lib/ExtensionManager.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-component-base */ "7Awa");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-loader */ "I6O9");
/* harmony import */ var _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _BaseExtension__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BaseExtension */ "S021");
/* harmony import */ var _ExtensionStrings_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ExtensionStrings.resx */ "xYWa");







/**
 * `ExtensionManager` manages a collection of extensions and provides APIs to create, dispose
 * and access its managed extensions.
 *
 * @remarks
 * Any application that needs to use extensions, should use `ExtensionManager` to create those extensions
 * by passing in their `componentId` and properties. `ExtensionManager` takes care of loading modules and
 * creating the instances for the extensions and provides APIs to manage the created extensions.
 *
 * @internal
 */
var ExtensionManager = /** @class */ (function () {
    /**
     * Creates a new instance of `ExtensionManager`.
     *
     * @remarks
     * If you construct an instance of this class, you must dispose it by calling `ExtensionManager.dispose()`;
     * otherwise resource leaks may occur.
     *
     * @param serviceScope - The serviceScope provided by the caller application
     * @param expectedType - for validation purposes, a base class that the resulting object
     *   is expected to extend
     */
    function ExtensionManager(serviceScope, expectedType) {
        this._serviceScope = serviceScope;
        this._expectedType = expectedType;
        this._extensions = [];
    }
    /**
     * Creates an extension instance by loading its module based on the provided componentId and then creates an instance
     * of the extension by passing in the provided properties JSON and context creator.
     *
     * @remarks
     * The provided componentId is a Guid that identifies the module containing the extension (as its default export).
     * The module loader of SharePoint Framework will load the module if its manifest is found on the page
     * (for example, if the extension is installed) and create an instace of the extension and initialize it using
     * the provided contextCreator and propertiesJson. Since this process is asynchronous, the manager returns a promise
     * that resolves once the extension instance is ready.
     *
     * The extension will be disposed by `ExtensionManager.dispose()`.
     *
     * @param componentId - the client-side component ID for the extension.
     * @param propertiesJson - a text string containing an optional JSON object.
     * @param contextCreator - a callback function that constructs an appropriate ExtensionContext
     */
    ExtensionManager.prototype.createExtension = function (componentId, propertiesJson, contextCreator) {
        var _this = this;
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"]('Extension.Create', true);
        var manifest = _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_3__["SPComponentLoader"].tryGetManifestById(componentId);
        if (!manifest) {
            var manifestError = new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_ExtensionStrings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].manifestNotFound, componentId));
            qosMonitor.writeUnexpectedFailure('ManifestNotFound', manifestError, { componentId: componentId });
            return Promise.reject(manifestError);
        }
        var extraData = this._createQosExtraData(manifest);
        try {
            var instanceId = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].newGuid().toString();
            var loggingTag = "Extension." + manifest.id + "." + instanceId;
            var context_1 = contextCreator({
                manifest: manifest,
                parentServiceScope: this._serviceScope,
                instanceId: instanceId,
                loggingTag: loggingTag
            });
            var perfLogKeyCreate_1 = loggingTag + '.Extension.Create';
            var perfLogKeyScriptLoad_1 = loggingTag + '.Extension.ScriptLoad';
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__["_PerformanceLogger"].startMarkForComponent(perfLogKeyCreate_1);
            var error_1 = undefined;
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__["_PerformanceLogger"].startMarkForComponent(perfLogKeyScriptLoad_1);
            var createPromise = _microsoft_sp_loader__WEBPACK_IMPORTED_MODULE_3__["SPComponentLoader"].loadComponent(manifest).then(function (component) {
                _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__["_PerformanceLogger"].endMarkForComponent(perfLogKeyScriptLoad_1);
                _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__["_PerformanceLogger"].logPerformanceMetricToConsole(perfLogKeyScriptLoad_1, 'Extension.ScriptLoad', manifest.id, manifest.alias);
                var extensionClass = component.default;
                var extension = new extensionClass();
                if (!(extension instanceof _BaseExtension__WEBPACK_IMPORTED_MODULE_5__["default"])) {
                    error_1 = new Error(_ExtensionStrings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].expectingBaseExtension);
                    qosMonitor.writeExpectedFailure('DoesNotExtendBaseExtension', error_1, extraData);
                    throw error_1;
                }
                if (!(extension instanceof _this._expectedType)) {
                    error_1 = Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_ExtensionStrings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].wrongExtensionType, _this._expectedType));
                    qosMonitor.writeExpectedFailure('WrongExtensionType', error_1, extraData);
                    throw error_1;
                }
                return extension._init(context_1, propertiesJson).then(function () {
                    return extension;
                }).catch(function (e) {
                    error_1 = new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_ExtensionStrings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].extensionInitFailure, componentId));
                    qosMonitor.writeExpectedFailure('ExtensionInitFailure', error_1, extraData);
                    throw error_1;
                });
            }, function (e) {
                if (!error_1) {
                    error_1 = new Error(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_ExtensionStrings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].extensionLoadFailure, componentId));
                    qosMonitor.writeExpectedFailure('ExtensionLoadFailure', error_1, extraData);
                }
                throw error_1;
            }).then(function (extension) {
                qosMonitor.writeSuccess(extraData);
                _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__["_PerformanceLogger"].endMarkForComponent(perfLogKeyCreate_1);
                _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_4__["_PerformanceLogger"].logPerformanceMetricToConsole(perfLogKeyScriptLoad_1, 'Extension.Create', manifest.id, manifest.alias);
                _this._extensions.push(extension);
                return extension;
            });
            // Async Loading of legacy fabric core styles (for third-party backward compatibility).
            // We do not want to wait until the load finishes as it might effect actual page render time.
            // Wait on this call to complete only if there is considerable flicker on the page.
            var fabricLoadingPromise = (_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__["_ComponentBaseKillSwitches"].isStopLoadingLegacyFabricCSSKillSwitchActivated()
                ? _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__["_LegacyThirdPartyFabricCoreLoader"].load(manifest.isInternal)
                : _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__["_LegacyThirdPartyFabricCoreLoader"].forceLoad(manifest));
            fabricLoadingPromise.catch(function (e) { return _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logError(ExtensionManager._logSource, new Error("Failed to load legacy fabric core styles: " + e)); });
            return createPromise;
        }
        catch (e) {
            qosMonitor.writeUnexpectedFailure('UnhandledCreateError', e, extraData);
            // If the synchronous code throws an exception, reject the promise
            return Promise.reject(e);
        }
    };
    /**
     * Disposes any extensions that were created via `createExtension()`.
     * This is performed by calling `BaseExtension.dispose()` for each extension.
     */
    ExtensionManager.prototype.dispose = function () {
        if (!this._isDisposed) {
            this.disposeExtensions();
            delete this._serviceScope;
            delete this._extensions;
            delete this._expectedType;
        }
        this._isDisposed = true;
    };
    Object.defineProperty(ExtensionManager.prototype, "isDisposed", {
        /** {@inheritDoc @microsoft/sp-core-library#IDisposable.isDisposed} */
        get: function () {
            return this._isDisposed;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Disposes all extensions created using this extensions manager.
     */
    ExtensionManager.prototype.disposeExtensions = function () {
        for (var _i = 0, _a = this._extensions; _i < _a.length; _i++) {
            var extension = _a[_i];
            try {
                extension.dispose();
            }
            catch (e) {
                var manifest = extension.manifest;
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logError(ExtensionManager._logSource, new Error("Failed to dispose extension \"" + manifest.alias + "\"\n            + \" with id=" + manifest.id + ": " + e.message));
            }
        }
        this._extensions = [];
    };
    /**
     * Creates a new extra data object the `Extension.Create` QoS monitor.
     */
    ExtensionManager.prototype._createQosExtraData = function (manifest) {
        var qosExtraData = {
            alias: manifest.alias,
            isInternal: manifest.isInternal,
            manifestId: manifest.id,
            extensionType: manifest.extensionType
        };
        return qosExtraData;
    };
    ExtensionManager._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogSource"].create('ExtensionManager');
    return ExtensionManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (ExtensionManager);


/***/ }),

/***/ "S021":
/*!******************************!*\
  !*** ./lib/BaseExtension.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-component-base */ "7Awa");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_3__);
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
 * The base class for all client-side extensions.
 *
 * @public
 */
var BaseExtension = /** @class */ (function (_super) {
    __extends(BaseExtension, _super);
    /** @internal */
    function BaseExtension() {
        var _this = _super.call(this) || this;
        _this._properties = {};
        return _this;
    }
    /**
     * @internal
     */
    BaseExtension.prototype._init = function (context, propertiesJson) {
        var _this = this;
        this._initializeContext(context);
        this._deserializeProperties(propertiesJson);
        var logSource = this.context.serviceScope.consume(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_logSourceServiceKey"]);
        var perflogKey = logSource + '.Extension.Init';
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_PerformanceLogger"].startMarkForComponent(perflogKey);
        this._initializeExtensionType();
        this._initPromise = this.onInit().then(function () {
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_PerformanceLogger"].endMarkForComponent(perflogKey);
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_PerformanceLogger"].logPerformanceMetricToConsole(perflogKey, 'Extension.Init', _this.context.manifest.id, _this.context.manifest.alias);
        });
        return this._initPromise;
    };
    /**
     * This method can be overriden by different extension types (e.g. app customizers) to do specific initialization.
     *
     * @internal
     */
    BaseExtension.prototype._initializeExtensionType = function () {
        return;
    };
    Object.defineProperty(BaseExtension.prototype, "properties", {
        /**
         * Extension properties is a JavaScript object that are passed in by the application that initializes the extension.
         *
         * @remarks
         * Properties can be used in the extension code to define configurable behaviors. The application has control over
         * what properties to provide to an instance of the extension, however the most common way would be to have it
         * stored on the server as JSON and pass it as is to the extension on initialization.
         *
         * @readonly
         */
        get: function () {
            return this._properties;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This event method is called when the client-side extension is first activated on the page.
     */
    BaseExtension.prototype.onInit = function () {
        return Promise.resolve();
    };
    BaseExtension.prototype._deserializeProperties = function (propertiesJson) {
        this._properties = {};
        try {
            if (propertiesJson && propertiesJson.trim() !== '') {
                this._properties = JSON.parse(propertiesJson);
            }
        }
        catch (e) {
            // This exception occurs e.g. when the SPField.clientSideComponentProperties contains a malformed
            // JSON string.  It is an "expected" user error (i.e. bad data), not a bug in our code.
            var logSource = this.context.serviceScope.consume(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_logSourceServiceKey"]);
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logError(logSource, new Error("Failed to deserialize properties for extension \"" + this.context.manifest.alias + "\"\n          + \" with id=" + this.context.manifest.id + ": " + e.message));
        }
    };
    __decorate([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_0__["virtual"]
    ], BaseExtension.prototype, "_initializeExtensionType", null);
    __decorate([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_0__["virtual"]
    ], BaseExtension.prototype, "onInit", null);
    return BaseExtension;
}(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_3__["BaseComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (BaseExtension);


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
/*! exports provided: BaseExtension, ExtensionContext, _ExtensionManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseExtension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseExtension */ "S021");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseExtension", function() { return _BaseExtension__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _ExtensionContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExtensionContext */ "M+WR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExtensionContext", function() { return _ExtensionContext__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _ExtensionManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ExtensionManager */ "OZJt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_ExtensionManager", function() { return _ExtensionManager__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/**
 * SharePoint Framework support for building client-side extensions.
 *
 * @packagedocumentation
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

/***/ "vpy3":
/*!*******************************!*\
  !*** external "resx-strings" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vpy3__;

/***/ }),

/***/ "wxtz":
/*!****************************************!*\
  !*** external "@microsoft/decorators" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_wxtz__;

/***/ }),

/***/ "xYWa":
/*!**************************************!*\
  !*** ./lib/ExtensionStrings.resx.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_i/mWZag7vFX4034jbvvZkw';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ })

/******/ })});;
//# sourceMappingURL=sp-extension-base.js.map