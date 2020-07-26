define("7263c7d0-1d6a-45ec-8d85-d4d1d234171b_1.11.0", ["@microsoft/sp-lodash-subset"], function(__WEBPACK_EXTERNAL_MODULE__microsoft_sp_lodash_subset__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./sp-core-library.js");
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
    "_gIErrcTokcw+/VVwa+ReIA": {
      "invalidEnvironmentTypeError": "***EnvironmentType is invalid",
      "invalidGuidStringError": "***Invalid GUID string: \"{0}\"",
      "isFalseValidateError": "***The value for \"{0}\" is false",
      "isNullValidateError": "***The value for \"{0}\" must not be null",
      "isUndefinedValidateError": "***The value for \"{0}\" must not be undefined",
      "isEmptyStringValidateError": "***The value for \"{0}\" must not be an empty string",
      "isDisposedValidateError": "***The \"{0}\" object cannot be used because it has been disposed.",
      "invalidVersionStringError": "***Invalid version string: \"{0}\"",
      "logVerboseLevelMessage": "***{0}: VERBOSE {1}",
      "logInfoLevelMessage": "***{0}: {1}",
      "logWarningLevelMessage": "***{0}: WARNING {1}",
      "logErrorLevelMessage": "***{0}: ERROR: {1}",
      "serviceScopeConsumingBeforeFinished": "***Cannot consume services because the scope is not finished yet",
      "serviceScopeConsumingDuringAutoCreation": "***Cannot consume services during ServiceScope autocreation",
      "serviceScopeAlreadyFinishedError": "***The ServiceScope is already finished",
      "serviceScopeProvideServiceAfterFinishedError": "***Cannot register service because the scope is already finished",
      "serviceScopeProvideServiceThatAlreadyExists": "***The service key \"{0}\" has already been registered in this scope",
      "spErrorInnerErrorText": "***INNERERROR:",
      "spErrorCallStackText": "***CALLSTACK:",
      "spErrorLogPropertiesText": "***LOGPROPERTIES:"
    }
  };

  strings.default = strings;
  return strings;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sp-core-library.js":
/*!****************************!*\
  !*** ./sp-core-library.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! @microsoft/sp-lodash-subset */ "@microsoft/sp-lodash-subset"),__webpack_require__(/*! resx-strings */ "../lib/resx-strings/en-us.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(__WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_vpy3__) { return /******/ (function(modules) { // webpackBootstrap
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

/***/ "2Wio":
/*!*****************************!*\
  !*** ./lib/SPKillSwitch.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Guid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Guid */ "UCHU");

/**
 * This class supports Microsoft's internal deployment workflow.
 *
 * @internal
 */
var SPKillSwitch = /** @class */ (function () {
    function SPKillSwitch() {
    }
    /**
     * RESERVED FOR INTERNAL USAGE.  This method is invoked automatically by the system shell.
     * The application code should not call it directly.
     */
    SPKillSwitch.initialize = function (killSwitchGuids) {
        this._isInitialized = true;
        this._activatedKillSwitches = new Map();
        if (killSwitchGuids) {
            for (var _i = 0, _a = Object.keys(killSwitchGuids); _i < _a.length; _i++) {
                var killSwitchGuid = _a[_i];
                var normalizedKillSwitchGuid = _Guid__WEBPACK_IMPORTED_MODULE_0__["default"].tryParse(killSwitchGuid);
                if (normalizedKillSwitchGuid) {
                    this._activatedKillSwitches.set(normalizedKillSwitchGuid.toString(), true);
                }
            }
        }
    };
    /**
     * RESERVED FOR INTERNAL USAGE.  This method is invoked automatically by the system shell.
     * The application code should not call it directly.
     */
    SPKillSwitch.setDebugKillswitches = function (debugKillswitches) {
        if (!this._isInitialized && !false) {
            throw new Error('Killswitches are not initialized. Can\'t set debug killswitched.');
        }
        // 'debugKillSwitches' value is expected to be a comma separated guild list.
        if (debugKillswitches && debugKillswitches.length) {
            try {
                for (var _i = 0, _a = debugKillswitches.split(',').map(function (value) { return _Guid__WEBPACK_IMPORTED_MODULE_0__["default"].tryParse(value); }); _i < _a.length; _i++) {
                    var killSwitch = _a[_i];
                    if (killSwitch) {
                        this._activatedKillSwitches.set(killSwitch.toString(), true);
                    }
                }
            }
            catch (error) {
                // If an exception is thrown, we'll log the error
                console.log("Error parsing killSwitches query string parameter: " + error);
            }
        }
    };
    /**
     * Returns true if the switch is activated.
     * @param killSwitchGuid - identifier for the kill switch
     * @param date - This parameter does not impact return value of the function.  It
     *        documents the date when the kill switch was introduced, to facilitate bulk cleanup.
     *        The date should be updated if additional fixes are made inside the block.
     * @param featureName - This parameter does not impact return value of the function.
     *        It is an informational tag to facilitate bulk cleanup, e.g. by allowing teams
     *        to search for switches related to their feature.
     * @returns true if the switch is activated, i.e. we should revert to the old behavior
     */
    SPKillSwitch.isActivated = function (killSwitchGuid, date, featureName) {
        if (!this._isInitialized && !false) {
            throw new Error("Killswitches are not initialized. Killswitch requested: " + killSwitchGuid);
        }
        if (!killSwitchGuid) {
            return false;
        }
        return !!this._activatedKillSwitches.get(killSwitchGuid.toString());
    };
    SPKillSwitch._isInitialized = false;
    SPKillSwitch._activatedKillSwitches = new Map();
    return SPKillSwitch;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPKillSwitch);


/***/ }),

/***/ "480N":
/*!******************************************!*\
  !*** ./lib/SPCoreLibraryStrings.resx.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_gIErrcTokcw+/VVwa+ReIA';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "4Ndb":
/*!************************!*\
  !*** ./lib/Version.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Text */ "OFYJ");
/* harmony import */ var _Validate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Validate */ "wAtz");
/* harmony import */ var _SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SPCoreLibraryStrings.resx */ "480N");



/**
 * Represents a version number with two, three, or four parts.
 *
 * @remarks
 * This class represents versions that follow the string format of `MAJOR.MINOR[.PATCH[.REVISION]]`
 * where the MAJOR, MINOR, PATCH and REVISION parts are integers. PATCH and REVISION are optional.
 * Leading zero digits are allowed, but they are discarded.  Missing parts are treated
 * as zeroes for comparisons.
 *
 * Examples: `1.0`, `1.0.0`, `1.0.0.0`, `1.01`, `01.02.03`, `001.002.003.004`
 *
 * @public
 */
var Version = /** @class */ (function () {
    /**
     * WARNING: Use Version.tryParse instead of the constructor. The constructor does not do any validation.
     *
     * @param major - the major version
     * @param minor - the minor version
     * @param patch - the patch number
     * @param revision - the revision number
     */
    function Version(major, minor, patch, revision) {
        this._major = major;
        this._minor = minor;
        this._patch = patch;
        this._revision = revision;
    }
    /**
     * Test whether a string is a valid version specifier.
     *
     * @param versionString - The version string
     * @returns true if the versionString is a valid version specifier
     */
    Version.isValid = function (versionString) {
        return Version.tryParse(versionString) !== undefined;
    };
    /**
     * Constructs a new Version instance using the version string.  An exception is thrown
     * if the string cannot be parsed.
     *
     * @param versionString - A version string
     * @returns a new Version object
     */
    Version.parse = function (versionString) {
        var version = Version.tryParse(versionString);
        if (version) {
            return version;
        }
        throw new Error(_Text__WEBPACK_IMPORTED_MODULE_0__["default"].format(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].invalidVersionStringError, versionString));
    };
    /**
     * Attempts to parse the input string to construct a new Version object.
     * If the string cannot be parsed, then undefined is returned.
     *
     * @param versionString - A version string
     * @returns The Version object, or undefined if the string could not be parsed.
     */
    Version.tryParse = function (versionString) {
        if (versionString) {
            var versionRegex = /^([0-9]+)\.([0-9]+)(?:\.([0-9]+)(?:\.([0-9]+))?)?$/g;
            /* tslint:disable-next-line:no-null-keyword */
            var regexExecRes = versionRegex.exec(versionString);
            if (regexExecRes) {
                return new Version(parseInt(regexExecRes[1], 10), parseInt(regexExecRes[2], 10), regexExecRes[3] !== undefined ? parseInt(regexExecRes[3], 10) : undefined, regexExecRes[4] !== undefined ? parseInt(regexExecRes[4], 10) : undefined);
            }
        }
        return undefined;
    };
    /**
     * Compares two Version objects to determine which version is newer.
     *
     * @param v1 - The first version class for comparison
     * @param v2 - The second version class for comparison
     * @returns  -1 if the first input is less than the second input;
     *            0 if the first input is equal to the second input;
     *            1 if the first input is greater than the second input.
     */
    Version.compare = function (v1, v2) {
        _Validate__WEBPACK_IMPORTED_MODULE_1__["default"].isNotNullOrUndefined(v1, 'v1');
        _Validate__WEBPACK_IMPORTED_MODULE_1__["default"].isNotNullOrUndefined(v2, 'v2');
        if (v1.major !== v2.major) {
            return v1.major > v2.major ? 1 : -1;
        }
        if (v1.minor !== v2.minor) {
            return v1.minor > v2.minor ? 1 : -1;
        }
        if ((v1.patch || 0) !== (v2.patch || 0)) {
            return (v1.patch || 0) > (v2.patch || 0) ? 1 : -1;
        }
        if ((v1.revision || 0) !== (v2.revision || 0)) {
            return (v1.revision || 0) > (v2.revision || 0) ? 1 : -1;
        }
        return 0;
    };
    /**
     * Get the version from given manifest.
     * @param manifest - The manifest where to get version.
     * @returns - The version of the manifest or undefined if version cannot be obtained.
     * @internal
     */
    Version._tryParseSPFxVersion = function (manifest) {
        try {
            // tslint:disable-next-line:no-any
            var resource = manifest.loaderConfig.scriptResources['@microsoft/sp-core-library'];
            return Version.parse(resource.version);
        }
        catch (err) {
            return undefined;
        }
    };
    Object.defineProperty(Version.prototype, "major", {
        /**
         * Returns the first component of the version string.
         *
         * @remarks
         * Typically a change in the major version number indicates a compatibility
         * break with previous versions.
         */
        get: function () {
            return this._major;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "minor", {
        /**
         * Returns the second component of the version string.
         *
         * @remarks
         * Typically a change in the minor version number indicates that new features
         * were added, while remaining backwards compatible with previous releases.
         */
        get: function () {
            return this._minor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "patch", {
        /**
         * The third number in the version string, or undefined if unspecified.
         *
         * @remarks
         * Typically a change in the patch version number indicates a small fix that
         * does not affect the compatibility contract for the library.  For a .NET
         * System.Version object, this is referred to as the "build" number.
         */
        get: function () {
            return this._patch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "revision", {
        /**
         * The fourth number in the version string, or undefined if unspecified.
         *
         * @remarks
         * This number is not part of the Semantic Versioning (SemVer) standard used
         * in JavaScript, but it is used by .NET version numbers.
         */
        get: function () {
            return this._revision;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Tests whether this version is less than (i.e. older than) the input parameter.
     *
     * @remarks
     *
     * Examples:
     *
     * ```
     * 0.9.9 lessThan 1.0.0 -> true;
     * 2.0   lessThan 2.0.0 -> false;
     * 3.0   lessThan 3.0.1 -> true;
     * 04.01 lessThan 4.1   -> false
     * ```
     *
     * @param compareWith - The version to compare with
     * @returns A boolean indicating if this version is less than the input parameter
     */
    Version.prototype.lessThan = function (compareWith) {
        return Version.compare(this, compareWith) < 0;
    };
    /**
     * Tests whether this version is greater than (i.e. newer than) the input parameter.
     *
     * @remarks
     *
     * Examples:
     *
     * ```
     * 1.0.0 greaterThan 0.0.9 -> true;
     * 2.0   greaterThan 2.0.0 -> false;
     * 3.0.1 greaterThan 3.0   -> true
     * ```
     *
     * @param compareWith - The version to compare with
     * @returns A boolean indicating if this version is greater than the input parameter
     */
    Version.prototype.greaterThan = function (compareWith) {
        return Version.compare(this, compareWith) > 0;
    };
    /**
     * Tests whether this version is equal to the input parameter.
     *
     * @remarks
     *
     * Examples:
     *
     * ```
     * 1.0.0 equals 1.0.0 -> true;
     * 2.0.1 equals 2.0.0 -> false;
     * 3.0   equals 3.0.0 -> true;
     * 04.01 equals 4.1   -> true
     * ```
     *
     * @param compareWith - The version to compare with
     * @returns A boolean indicating if this version is equal to the input parameter
     */
    Version.prototype.equals = function (compareWith) {
        return Version.compare(this, compareWith) === 0;
    };
    /**
     * Tests whether this version satisfies the compatibility requirements of the input version,
     * i.e. is backwards compatible.
     *
     * @remarks
     * In order to satisfy the compatibility requirements, this object must have the same
     * major version number as the input parameter, and it must NOT be older than the
     * input parameter.
     *
     * Examples:
     *
     * ```
     * 1.0.0 satisfies 1.0.0 -> true;
     * 1.1.0 satisfies 1.0.0 -> true;
     * 2.0.0 satisfies 1.0.0 -> false;
     * 1.0.0 satisfies 1.1.0 -> false
     * ```
     *
     * @param compareWith - The version to compare with
     * @returns A boolean indicating if this version is compatible with the input parameter
     */
    Version.prototype.satisfies = function (compareWith) {
        _Validate__WEBPACK_IMPORTED_MODULE_1__["default"].isNotNullOrUndefined(compareWith, 'compareWith');
        return this.major === compareWith.major && !this.lessThan(compareWith);
    };
    /**
     * Returns a string representation of the version.
     *
     * @remarks
     * The value is normalized and may be different from the original string (e.g. leading zeroes
     * may be removed).  However, the number of version parts will be unchanged.
     */
    Version.prototype.toString = function () {
        var str = this.major + "." + this.minor;
        if (this.patch !== undefined) {
            str += "." + this.patch;
            if (this.revision !== undefined) {
                str += "." + this.revision;
            }
        }
        return str;
    };
    return Version;
}());
/* harmony default export */ __webpack_exports__["default"] = (Version);


/***/ }),

/***/ "5cYQ":
/*!************************************************!*\
  !*** ./lib/url/UrlQueryParameterCollection.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */
/**
 * Provides features for storing and retrieving URL query parameters.
 *
 * @remarks
 * The URL can be server-relative, and it can also be an empty or null string.
 * The query parameters must start with "?" to indicate the first query parameter and
 * use "&" for all subsequent parameters. The class also supports fragments.
 *
 * Edge case behavior:
 *
 * Empty value (www.example.com/?test=) stores key and empty value
 * No equals in queryParam (www.example.com/?test) stores key and undefined value
 * Empty queryParam (www.example.com/?&debug=on) stores undefined key and value
 * Query param with only equals (www.example.com/?=&debug=on stores empty string key and value
 *
 * @privateRemarks
 * The design of this class was that it could split the URL out into a data structure, and the user
 * could add items to the data structure (TBD), and then another (TBD) function would rebuild the URL.
 * This weird design would ensure that e.g. if no change was made to the data structure, then the
 * round trip wouldn't change the characters in the URL at all, which might be useful e.g. if we're
 * comparing URLs.
 *
 * @deprecated Use the URLSearchParams browser API instead.  The SharePoint Framework includes a
 * polyfill for older browsers.
 * @public
 */
var UrlQueryParameterCollection = /** @class */ (function () {
    function UrlQueryParameterCollection(url) {
        this._queryParameterList = this._getUrlQueryParameterArray(url);
    }
    /**
     * Returns the value of the first matching query parameter or undefined if the key doesn't exist.
     *
     * @remarks
     * Examples:
     * ```
     * this._queryParameterList = [
     * {key: TEST, value: done},
     * {key: DEBUG, value: false},
     * {key: TEST, value: notdone}]
     *   getValue('TEST') ---> 'done'
     *   getValue('debug')  ---> 'false'
     *   getValue('lost')  ---> undefined
     * ```
     * @param param - the case insensitive key for the desired query parameter value.
     */
    UrlQueryParameterCollection.prototype.getValue = function (param) {
        for (var _i = 0, _a = this._queryParameterList; _i < _a.length; _i++) {
            var queryParam = _a[_i];
            if (param === undefined) {
                if (queryParam.key === undefined) {
                    return queryParam.value;
                }
                continue;
            }
            else if (param.toUpperCase() === queryParam.key) {
                return queryParam.value;
            }
        }
        return undefined;
    };
    /**
     * Returns the values of all of the matching query parameters or undefined if the key doesn't exist.
     *
     * @remarks
     * Examples:
     * ```
     * this._queryParameterList = [
     * {key: TEST, value: done},
     * {key: DEBUG, value: false},
     * {key: TEST, value: notdone}]
     *   getValues('TEST') ---> ['done', 'notdone']
     *   getValues('debug')  ---> ['false']
     *   getValues('lost')  ---> undefined
     * ```
     * @param param - the case insensitive key for the desired query parameter value.
     */
    UrlQueryParameterCollection.prototype.getValues = function (param) {
        var queryParams = [];
        for (var _i = 0, _a = this._queryParameterList; _i < _a.length; _i++) {
            var queryParam = _a[_i];
            if (param === undefined) {
                if (queryParam.key === undefined) {
                    queryParams.push(queryParam.value);
                }
                continue;
            }
            else if (param.toUpperCase() === queryParam.key) {
                queryParams.push(queryParam.value);
            }
        }
        return queryParams.length > 0 ? queryParams : undefined;
    };
    UrlQueryParameterCollection.prototype._getUrlQueryParameterArray = function (url) {
        var queryParameterList = [];
        var urlParser = document.createElement('a');
        urlParser.href = url;
        var queryParams = urlParser.search.substring(1).split('&');
        for (var _i = 0, queryParams_1 = queryParams; _i < queryParams_1.length; _i++) {
            var queryParam = queryParams_1[_i];
            if (queryParam !== '') {
                var equalsIndex = queryParam.indexOf('=');
                var key = void 0;
                var value = void 0;
                if (equalsIndex < 0) {
                    key = queryParam;
                    value = undefined;
                }
                else if (equalsIndex === 0) {
                    key = '';
                    value = queryParam.length === 1 ? '' : queryParam.substring(1);
                }
                else {
                    key = queryParam.substring(0, equalsIndex);
                    value =
                        queryParam.substring(equalsIndex).length === 1 ?
                            '' :
                            queryParam.substring(equalsIndex + 1);
                }
                queryParameterList.push({
                    key: decodeURIComponent(key.toUpperCase()),
                    value: value
                });
            }
            else {
                queryParameterList.push({
                    key: undefined,
                    value: undefined
                });
            }
        }
        return queryParameterList;
    };
    return UrlQueryParameterCollection;
}());
/* harmony default export */ __webpack_exports__["default"] = (UrlQueryParameterCollection);


/***/ }),

/***/ "6T9R":
/*!*******************************!*\
  !*** ./lib/events/SPEvent.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Validate */ "wAtz");
/* harmony import */ var _SPEventManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SPEventManager */ "kYSd");


/**
 * Represents a framework event that components can subscribe to.
 *
 * @remarks
 * Examples of events in a web application might include: the user clicking a button, the system navigating to
 * another page, or an item being added/removed from an abstract collection.  The SharePoint Framework
 * represents events using instances of the SPEvent object, one for each kind of event.  The SPEvent object
 * is typically exposed as a property of an associated class (e.g. the button that can be clicked).
 * When a component is interested in an event, it calls add() to register an event handler callback that
 * will be invoked each time the event occurs.  The handler receives an SPEventArgs parameter that may
 * provide additional details about what happened.  This is analogous to the browser's Document Object Model
 * (DOM) events.  The main difference is the ISPEventObserver feature, which tracks which component subscribed
 * to each event, and automatically unsubscribes the handler when the component is disposed.
 *
 * When an event is raised, all handlers are invoked synchronously.  The order in which event handlers
 * are called is unspecified.  The event handler callback must catch any exceptions that occur during
 * processing; an uncaught exception will not prevent other handlers from executing, but it will be
 * reported as a problem with the associated component.
 *
 * @public
 */
var SPEvent = /** @class */ (function () {
    /**
     * @internal
     */
    function SPEvent(name) {
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNonemptyString(name, 'name');
        this._name = name;
    }
    /**
     * Registers a callback that will be invoked whenever the event occurs.
     *
     * @remarks
     * The same object can add multiple event handlers to the same event. Since BaseComponent implements
     * the ISPEventObserver interface, a web part or extension can pass itself as the observer. This will cause
     * the event handler to be automatically unsubscribed when the web part or extension is disposed.
     *
     * @param observer - Indicates the object that is subscribing to the event: When the object is disposed,
     *   the event handler will be automatically removed.  This object is also used for diagnostic purposes,
     *   e.g. detecting if the event handler failed to catch an exception.
     * @param eventHandler - A callback function that will be invoked whenever the event occurs
     */
    SPEvent.prototype.add = function (observer, eventHandler) {
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNotNullOrUndefined(observer, 'component');
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNotNullOrUndefined(eventHandler, 'eventHandler');
        _SPEventManager__WEBPACK_IMPORTED_MODULE_1__["default"].instance.registerEvent(this._name, observer, eventHandler);
    };
    /**
     * Unregisters a callback that was registered using add().
     *
     * @remarks
     * If the event handler has already been removed, or if it was never added, then this
     * method has no effect.
     *
     * @param observer - This must be the same observer that was passed to the add() function.
     * @param eventHandler - The event handler to remove; this must be the same object instance
     *   that was passed to the add() function.
     */
    SPEvent.prototype.remove = function (observer, eventHandler) {
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNotNullOrUndefined(observer, 'component');
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNotNullOrUndefined(eventHandler, 'eventHandler');
        _SPEventManager__WEBPACK_IMPORTED_MODULE_1__["default"].instance.unregisterEvent(this._name, observer, eventHandler);
    };
    /**
     * Returns the number of listeners to the event
     * @internal
     */
    SPEvent.prototype._listenerCount = function () {
        return _SPEventManager__WEBPACK_IMPORTED_MODULE_1__["default"].instance._listenerCount(this._name);
    };
    return SPEvent;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPEvent);


/***/ }),

/***/ "BHcV":
/*!***********************************!*\
  !*** ./lib/events/SPEventArgs.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * The base class for event arguments used with the {@link SPEvent} class.
 *
 * @remarks
 * If certain event types need to provide additional details, they will define a
 * subclass of SPEventArgs.
 *
 * @public
 */
var SPEventArgs = /** @class */ (function () {
    function SPEventArgs() {
    }
    return SPEventArgs;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPEventArgs);


/***/ }),

/***/ "Btg7":
/*!*********************************!*\
  !*** ./lib/url/UrlUtilities.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Validate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Validate */ "wAtz");
// Copyright (c) Microsoft. All rights reserved.


var URL_PROTOCOL_REGEX = /^\w+\:\/\//;
// data:[<mediatype>][;base64],<data>
var BASE64_IMAGE_REGEX = /^data:(\w+\/\w+(\+\w+)?)?(;charset=[\w-]+)?(;base64)?,.*/i;
/**
 * Common helper functions for working with URLs.  These utilities are intended to be simple,
 * small, and very broadly applicable.
 *
 * @alpha
 */
var UrlUtilities = /** @class */ (function () {
    function UrlUtilities() {
    }
    /**
     * If the provided URL is relative, resolve it under the provided base URL. If the provided URL is absolute,
     * return it.
     *
     * @remarks
     * Examples:
     * ```
     *   resolve('/foo/bar.js', 'http://cdn.com/path/')               ---> 'http://cdn.com/path/foo/bar.js'
     *   resolve('http://cdn.com/foo/bar.js', 'http://cdn.com/path/') ---> 'http://cdn.com/foo/bar.js'
     *   resolve('/foo/bar.js', 'path/')                              ---> 'path/foo/bar.js'
     * ```
     * @param url - the URL to be resolved
     * @param baseUrl - the base URL to use if the URL is relative
     */
    UrlUtilities.resolve = function (url, baseUrl) {
        _Validate__WEBPACK_IMPORTED_MODULE_1__["default"].isNonemptyString(url, 'url');
        _Validate__WEBPACK_IMPORTED_MODULE_1__["default"].isNonemptyString(baseUrl, 'baseUrl');
        // If the icon URL doesn't start with a protocol handler (i.e. - "http://") assume it's a relative URL and
        //  append it to the loaderConfig's internalModuleBaseUrl
        var isRelativeUrl = UrlUtilities.isRelativeUrl(url);
        if (isRelativeUrl) {
            return UrlUtilities.removeEndSlash(baseUrl) + "/" + UrlUtilities.removeLeadingSlash(url);
        }
        else {
            return url;
        }
    };
    /**
     * Removes any slash characters from the end of the URL.
     *
     * @remarks
     * This function assumes that the input is already a valid absolute or server-relative URL.
     *
     * Examples:
     * ```
     *   removeEndSlash('http://example.com/') ---> 'http://example.com'
     *   removeEndSlash('/example')            ---> '/example'
     *   removeEndSlash('/')                   ---> ''
     * ```
     * @param url - the URL to be normalized
     */
    UrlUtilities.removeEndSlash = function (url) {
        return _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["trimEnd"](url, '/');
    };
    /**
     * Removes any slash characters from the beginning of the URL.
     *
     * @remarks
     * This function assumes that the input is already a valid absolute or server-relative URL.
     *
     * Examples:
     * ```
     *   removeLeadingSlash('/example/path.js') ---> 'example/path.js'
     *   removeLeadingSlash('example/')         ---> 'example/'
     *   removeLeadingSlash('/')                ---> ''
     * ```
     * @param url - the URL to be normalized
     */
    UrlUtilities.removeLeadingSlash = function (url) {
        return _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["trimStart"](url, '/');
    };
    /**
     * Converts a variable to an OData string literal suitable for usage in a REST URL.
     *
     * @remarks
     * The returned string will be enclosed in single quotes, and any single quotes
     * will be escaped.
     *
     * Example usage:
     *
     * ```
     * const url = "/_api/web/GetFolderByServerRelativeUrl("
     *       + UrlUtilities.convertToODataStringLiteral("/SitePages/Alice's%20Page")
     *       + ")/Files";
     *
     *  // Produces this URL:
     *  // "/_api/web/GetFolderByServerRelativeUrl('/SitePages/Alice''s%20Page')/Files"
     * ```
     *
     * @privateRemarks
     * Standard reference:
     * https://tools.oasis-open.org/version-control/
     *   browse/wsvn/odata/trunk/spec/ABNF/odata-abnf-construction-rules.txt
     * SQUOTE-in-string = SQUOTE SQUOTE ; two consecutive single quotes represent
     *   one within a string literal
     */
    UrlUtilities.convertToODataStringLiteral = function (value) {
        _Validate__WEBPACK_IMPORTED_MODULE_1__["default"].isNotNullOrUndefined(value, 'value');
        value = value.replace(/'/g, "''");
        value = "'" + value + "'";
        return value;
    };
    /**
     * Detects if a string represents a correctly formatted data URL.
     *
     * @remarks
     *
     * Examples:
     * ```
     *   isDataUrl('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D') ---> true
     *   isDataUrl('data:,Hello%2C%20World!')                         ---> true
     *   isDataUrl('data:image/png;base64,iVBORw0KGgoAA')             ---> true
     *   isDataUrl('http://contoso.com')                              ---> false
     *   isDataUrl('/foo/bar')                                        ---> false
     * ```
     *
     * Information on data URLs can be found at https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
     */
    UrlUtilities.isDataUrl = function (url) {
        _Validate__WEBPACK_IMPORTED_MODULE_1__["default"].isNotNullOrUndefined(url, 'url');
        return !!url.match(BASE64_IMAGE_REGEX);
    };
    /**
     * Detects if a url is relative
     *
     * @remarks
     * This function assumes that the input is already a valid absolute or server-relative URL.
     *
     * Examples:
     * ```
     *   isRelativeUrl('/example/path.aspx')  ---> true
     *   isRelativeUrl('http://contoso.com')  ---> false
     * ```
     */
    UrlUtilities.isRelativeUrl = function (url) {
        return !url.match(URL_PROTOCOL_REGEX);
    };
    return UrlUtilities;
}());
/* harmony default export */ __webpack_exports__["default"] = (UrlUtilities);


/***/ }),

/***/ "DXUK":
/*!****************************!*\
  !*** ./lib/envoy/Envoy.js ***!
  \****************************/
/*! exports provided: Envoy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Envoy", function() { return Envoy; });
/**
 * Envoy is a ProxyHandler implementation designed to proxy an object
 * and all its subproperties. Envoy automatically creates new Proxies
 * when it encounters un-proxied objects in the root object hierarchy.
 *
 * @internal
 */
var Envoy = /** @class */ (function () {
    /**
     * @virtual
     */
    function Envoy() {
    }
    /**
     * Create the root Proxy object.
     *
     * @param args - Optional. Any additional arguments.
     *
     * @returns A new object Proxy.
     *
     * @virtual Override if the constructor is also overridden.
     */
    Envoy.create = function (obj) {
        // Construct a new instance of the child class
        /* tslint:disable-next-line:no-any */
        return new Proxy(obj, new this());
    };
    /**
     * Check whether a value is an object.
     *
     * @param obj - Value to test.
     *
     * @returns A boolean indicating whether obj is an object.
     */
    Envoy._isObject = function (obj) {
        return obj && typeof obj === 'object';
    };
    /**
     * ProxyHandler.get implementation.
     *
     * @param obj - Proxied object.
     * @param prop - The name of the property to get.
     *
     * @returns The value of `prop` on `obj`.
     *
     * @remarks Returns true if prop is `__isProxy__`.
     */
    Envoy.prototype.get = function (obj, prop) {
        // Identify the current object is a proxy
        if (prop === '__isProxy__') {
            return true;
        }
        var retVal = obj[prop];
        if (Envoy._isObject(retVal)) {
            if (!retVal.__isProxy__) {
                retVal = obj[prop] = this.onNewEnvoy(prop, retVal);
            }
        }
        return this.onGetValue(prop, retVal);
    };
    /**
     * ProxyHandler.set implementation.
     *
     * @param obj - Proxied object.
     * @param prop - Property name.
     * @param val - Value to set.
     *
     * @returns A value indicating whether the property was set.
     */
    Envoy.prototype.set = function (obj, prop, val) {
        if (Envoy._isObject(val)) {
            var oldVal = obj[prop];
            // It's possible `oldVal` is not an object but `val` is an object if
            // the value of `prop` is loosely typed
            if (Envoy._isObject(oldVal) && oldVal.__isProxy__) {
                obj[prop] = this.onBeforeSetValue(prop, val);
            }
            else {
                obj[prop] = this.onNewEnvoy(prop, this.onBeforeSetValue(prop, val));
            }
        }
        else {
            obj[prop] = this.onBeforeSetValue(prop, val);
        }
        this.onSetValue(prop, obj[prop]);
        return true;
    };
    /**
     * Invoked when retrieving any value from the proxied
     * object.
     *
     * @param prop - Property name.
     * @param val - Property value.
     *
     * @returns The value to return from the proxy.
     *
     * @remarks onGetValue is not called when checking the
     * `__isProxy__` property.
     *
     * @virtual
     */
    Envoy.prototype.onGetValue = function (prop, val) {
        return val;
    };
    /**
     * Invoked when a new Envoy Proxy needs to be created.
     *
     * @param val - Object to proxy.
     * @param prop - Property name for val on the parent object.
     *
     * @returns A new proxied object.
     *
     * @virtual Override if the constructor is also overridden.
     */
    Envoy.prototype.onNewEnvoy = function (prop, val) {
        // Constructing a new instance of the child class
        /* tslint:disable-next-line: no-any */
        return new Proxy(val, new this.constructor());
    };
    /**
     * Invoked before setting any value on the proxied
     * object.
     *
     * @param prop - Property name.
     * @param val - Property value.
     *
     * @returns The value to set on the proxy.
     *
     * @virtual
     */
    Envoy.prototype.onBeforeSetValue = function (prop, val) {
        return val;
    };
    /**
     * Invoked after a property is set on the proxied object.
     *
     * @param prop - Property name.
     * @param val - Property value.
     *
     * @virtual
     */
    Envoy.prototype.onSetValue = function (prop, val) {
        // default implementation is a no-op
    };
    return Envoy;
}());



/***/ }),

/***/ "FtfD":
/*!****************************!*\
  !*** ./lib/DisplayMode.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Copyright (c) Microsoft. All rights reserved.
/**
 * Indicates whether a visual control should display itself for reading or for editing.
 *
 * @public
 */
var DisplayMode;
(function (DisplayMode) {
    /**
     * The page, control, or editing surface is in a mode intended for reading.  It may have some interactive
     * features, but the authoring controls are not enabled.
     */
    DisplayMode[DisplayMode["Read"] = 1] = "Read";
    /**
     * The page, control, or editing surface is in a mode intended for authoring new content.  It may display
     * editing panels or other controls that are not part of the normal reading experience.
     */
    DisplayMode[DisplayMode["Edit"] = 2] = "Edit";
})(DisplayMode || (DisplayMode = {}));
/* harmony default export */ __webpack_exports__["default"] = (DisplayMode);


/***/ }),

/***/ "JJKV":
/*!*************************!*\
  !*** ./lib/SPFlight.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */
// This character is allowed to go unencoded in a URL and commonly represents "NOT" logic in boolean algebra
// Reference: http://www.faqs.org/rfcs/rfc1738.html
var DISABLED_FLIGHT_PREFIX = '!';
// Debug flight id. This flight is only enabled for internal Microsoft tenants like the eDog tenant. This flight
// is used for debug level testing and should not be enabled for PROD customer tenants due security reasons.
// Enabling this flight on PROD customer tenants can deem them vulnerable to script injection.
var SPFX_DEBUG_FLIGHT_ID = 205;
/**
 * NOT FOR USE BY THIRD PARTY DEVELOPERS
 *
 * This class supports Microsoft's internal deployment workflow.
 * For more information, see https://microsoft.sharepoint.com/teams/odsp/_layouts/OneNote.aspx
 * ?id=/teams/odsp/Shared%20Documents/MI-6%20Team/MI-6%20Team/Global/SPO%20Flighting
 *
 * @privateRemarks
 * SPFlight is currently being reexported by sp-client-base.  For GA, this will be sorted out by
 * VSO 278235 which will move this class back into sp-client-base (sp-core-library).
 *
 * @internal
 */
var SPFlight = /** @class */ (function () {
    function SPFlight() {
    }
    /**
     * RESERVED FOR INTERNAL USAGE.  This method is invoked automatically by the system shell.
     * The application code should not call it directly.
     */
    SPFlight.initialize = function (flights) {
        this._isInitialized = true;
        this._enabledFlightsMap = flights || [];
        this._forceEnabledFlights = [];
        this._forceDisabledFlights = [];
    };
    Object.defineProperty(SPFlight, "isDebugFlightEnabled", {
        /**
         * Return true if the debug flight is enabled.
         */
        get: function () {
            return SPFlight.isEnabled(SPFX_DEBUG_FLIGHT_ID);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * RESERVED FOR INTERNAL USAGE.  This method is invoked automatically by the system shell.
     * The application code should not call it directly.
     */
    SPFlight.setDebugFlights = function (debugFlights) {
        if (!this._isInitialized) {
            throw new Error('Flights are not initialized. Can\'t set debug flights.');
        }
        // If allowQueryFlights then parse the 'debugFlights' query string parameter for any flights to enable for
        // the session. 'debugFlights' is expected to be a comma separated list. We store the flights as given
        // to avoid needing to do any bitmask conversions during translation and just check the
        // feature ID directly.
        if (debugFlights && debugFlights.length > 0) {
            try {
                var debugFlightStrings = debugFlights.split(',');
                this._forceEnabledFlights = debugFlightStrings
                    .filter(function (value) { return value[0] !== DISABLED_FLIGHT_PREFIX; })
                    .map(function (value) { return parseInt(value, 10); })
                    .filter(function (value) { return !isNaN(value); });
                this._forceDisabledFlights = debugFlightStrings
                    .filter(function (value) { return value[0] === DISABLED_FLIGHT_PREFIX; })
                    .map(function (value) { return parseInt(value.slice(1), 10); })
                    .filter(function (value) { return !isNaN(value); });
                console.log("Debug flights are enabled.");
                if (this._forceEnabledFlights.length > 0) {
                    console.log("Enabled flights: " + this._forceEnabledFlights.join(', '));
                }
                if (this._forceDisabledFlights.length > 0) {
                    console.log("Disabled flights: " + this._forceDisabledFlights.join(', '));
                }
            }
            catch (error) {
                // If an exception is thrown, we'll log the error and clear debug flights
                this._forceEnabledFlights = [];
                this._forceDisabledFlights = [];
                console.log("Error parsing debugFlights query string parameter: " + error);
            }
        }
        this._validateDebugFlights();
    };
    /**
     * NOT FOR USE BY THIRD PARTY DEVELOPERS
     *
     * This function will determine if a flight is enabled in the global list.
     */
    SPFlight.isEnabled = function (flight) {
        if (!this._isInitialized && !false) {
            throw new Error("Flights are not initialized. Flight requested: " + flight);
        }
        if (!flight || flight < 0) {
            return false;
        }
        // Debug flights override existing flight information
        if (this._forceEnabledFlights.indexOf(flight) !== -1) {
            return true;
        }
        if (this._forceDisabledFlights.indexOf(flight) !== -1) {
            return false;
        }
        // Determines which set of bitMasks should be used to determine if a flight is enabled.
        /* tslint:disable:no-bitwise */
        var enabledFlightsIndex = flight >> 5;
        if (enabledFlightsIndex < 0 || enabledFlightsIndex >= this._enabledFlightsMap.length) {
            return false;
        }
        // Masks the flight number and determines if the flight is turned on within that mask.
        var bitMask = 1 << (flight & 31);
        return (this._enabledFlightsMap[enabledFlightsIndex] & bitMask) !== 0;
        /* tslint:enable:no-bitwise */
    };
    SPFlight._validateDebugFlights = function () {
        var debugFlightsSet = new Set(this._forceEnabledFlights.concat(this._forceDisabledFlights));
        // If size is smaller than the sum of its parts, it means that there is a duplicate number in both arrays
        if (debugFlightsSet.size < (this._forceEnabledFlights.length + this._forceDisabledFlights.length)) {
            throw new Error('There are flights that are forced to be both enabled and disabled');
        }
    };
    SPFlight._isInitialized = false;
    /**
     * List of SharePoint flight feature IDs that are forced to be enabled
     * through the debugFlights query string parameter.
     */
    SPFlight._forceEnabledFlights = [];
    /**
     * List of SharePoint flight feature IDs that are forced to be disabled
     * through the debugFlights query string parameter.
     */
    SPFlight._forceDisabledFlights = [];
    /**
     * Array of bits (indexed by flight number, where 1 means that flight is enabled).
     */
    SPFlight._enabledFlightsMap = [];
    return SPFlight;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPFlight);


/***/ }),

/***/ "KfQ9":
/*!********************************************!*\
  !*** ./lib/deferredClass/DeferredClass.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file Abstract class for deferred class code.
 */
/**
 * `DeferredClass` is a generic class to define the pattern of code loaded after the initial code download.
 *
 * @remarks
 * Example:
 * ```
 * class DeferredFoo extends DeferredClass<typeof Foo, Foo> {
 *
 *   // Static members do not inherit the generic types so we do this to correctly enforce the right typing.
 *   public static instance() DeferredFoo {
 *     return this._instance;
 *   }
 *
 *   public create(arg1: string, arg2: number): Foo {
 *     return new this._classType(arg1, arg2);
 *   }
 *
 *   protected _internalLoad(): Promise<Type> {
 *     // code to lazy load e.g. require.ensure(...)
 *     // or import(...)
 *     // or SPComponentLoader.loadComponentById(...).then(
 *     // (module: typeof DeferredFooModuleType) => { return module.DeferredFoo; });
 *   }
 * }
 * ```
 *
 * @param Type - The type of the Instance object. This type should define how you create an instance
 *   of the deferred class.
 * @param Instance - The interface of the deferred class.
 *
 * @internal
 */
var DeferredClass = /** @class */ (function () {
    /**
     * Singleton instance.
     */
    function DeferredClass() {
        var _this = this;
        this._onAfterLoadPromise = new Promise(function (resolve) { return _this._resolveOnAfterLoadCallbacks = resolve; });
    }
    /**
     * Initialize, if needed, the _internalInstance singleton.
     *
     * @returns - The singleton instance.
     */
    // tslint:disable-next-line:no-any
    DeferredClass._getInstance = function () {
        if (!this._internalInstance) {
            // Cast this to any in order to call the constructor for the derived class
            // tslint:disable-next-line:no-any
            this._internalInstance = new this();
        }
        return this._internalInstance;
    };
    Object.defineProperty(DeferredClass.prototype, "isLoaded", {
        /**
         * @returns Whether or not the code has been loaded.
         */
        get: function () {
            return !!this._classType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeferredClass.prototype, "shouldLoad", {
        /**
         * @returns Whether or not the code should load. Value should not change during the lifecycle of an instance.
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Loads the deferred chunk. After the returned promise is resolved, DeferredClass.create can be used
     * to create an instance of the deferred class.
     *
     * @returns - The Promise used for loading the code. If DeferredClass.shouldLoad has been overriden
     *   and returns false, then a rejected Promise is returned.
     */
    DeferredClass.prototype.load = function () {
        var _this = this;
        if (!this._loadPromise) {
            // shouldLoad is not expected to change during the lifecycle of this instance
            if (this.shouldLoad) {
                this._loadPromise = this._internalLoad();
                // tslint:disable-next-line:no-floating-promises - This promise isn't floating
                this._loadPromise.then(function (type) {
                    _this._classType = type;
                    _this._resolveOnAfterLoadCallbacks();
                });
            }
            else {
                this._loadPromise = Promise.reject(new Error('shouldLoad returns false'));
            }
        }
        return this._loadPromise;
    };
    /**
     * Returns a thenable Promise to be resolved after the code has finished loading. Use this for cases where
     * you do not want to invoke code loading but want to be notified when the code has loaded.
     *
     * @returns - A promise resolved after the code loads.
     */
    DeferredClass.prototype.onAfterLoad = function () {
        return this._onAfterLoadPromise;
    };
    return DeferredClass;
}());
/* harmony default export */ __webpack_exports__["default"] = (DeferredClass);


/***/ }),

/***/ "LcA1":
/*!**************************************!*\
  !*** ./lib/log/DefaultLogHandler.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Text */ "OFYJ");
/* harmony import */ var _SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../SPCoreLibraryStrings.resx */ "480N");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */


/**
 * The redirectable implementation for the Log class.
 */
// @TODO: VSO 285419 will clean this up.
var DefaultLogHandler = /** @class */ (function () {
    function DefaultLogHandler() {
    }
    /* tslint:disable:no-console */
    DefaultLogHandler.prototype.verbose = function (source, message, scope) {
        if (true) {
            console.log(_Text__WEBPACK_IMPORTED_MODULE_0__["default"].format(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].logVerboseLevelMessage, source, message));
        }
    };
    DefaultLogHandler.prototype.info = function (source, message, scope) {
        if (true) {
            console.info(_Text__WEBPACK_IMPORTED_MODULE_0__["default"].format(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].logInfoLevelMessage, source, message));
        }
    };
    DefaultLogHandler.prototype.warn = function (source, message, scope) {
        if (true) {
            console.warn(_Text__WEBPACK_IMPORTED_MODULE_0__["default"].format(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].logWarningLevelMessage, source, message));
        }
    };
    DefaultLogHandler.prototype.error = function (source, error, scope) {
        if (true) {
            console.error(_Text__WEBPACK_IMPORTED_MODULE_0__["default"].format(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].logErrorLevelMessage, source, error.message));
        }
    };
    return DefaultLogHandler;
}());
/* harmony default export */ __webpack_exports__["default"] = (DefaultLogHandler);


/***/ }),

/***/ "OFYJ":
/*!*********************!*\
  !*** ./lib/Text.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SPCoreLibraryStrings.resx */ "480N");

/**
 * Operations for working with strings that contain text.
 *
 * @remarks
 * The utilities provided by this class are intended to be simple, small, and very
 * broadly applicable.
 *
 * @public
 */
var Text = /** @class */ (function () {
    function Text() {
    }
    /**
     * Format a string by substituting parameters.
     *
     * @remarks
     * This function replaces template parameters such as `"{0}"` or `"{1}"` with the
     * corresponding argument.  If the value is null or undefined, it will be replaced
     * by the word `"null"` or `"undefined"`.  The format string s must not be null or
     * undefined.
     *
     * Usage example:
     *
     * `Text.format("hello {0}!", "world")` will return `"hello world!"`
     */
    Text.format = function (s) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        // We can't use  Validate.isNotNullOrUndefined() here because Validate
        // relies on Text.format() for reporting errors and can cause a stack overflow
        if (s === null) { // tslint:disable-line:no-null-keyword
            throw new Error(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].isNullValidateError.replace('{0}', 's'));
        }
        if (s === undefined) {
            throw new Error(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedValidateError.replace('{0}', 's'));
        }
        return s.replace(Text.FORMAT_REGEX, function (match) {
            // The matchID is the numeric value contained in the brackets. {01} gets converted to 1.
            var matchId = parseInt(match.replace(Text.FORMAT_ARGS_REGEX, ''), 10);
            // The matchValue is the string contained in the values' matchId index.
            // If matchId = 1 and values = ['the', 'bear', 'ate'], then matchValue = 'bear'
            var matchValue = values[matchId];
            // If you index outside of the values array, return the original matchId in brackets
            if (matchId >= values.length || matchId < 0) {
                matchValue = match;
            }
            // Logic to convert null and undefined into readable strings
            /* tslint:disable-next-line:no-null-keyword */
            if (matchValue === null) {
                matchValue = 'null';
            }
            else if (matchValue === undefined) {
                matchValue = 'undefined';
            }
            return matchValue;
        });
    };
    /**
     * Returns the input string, with all instances of `searchValue` replaced by `replaceValue`.
     *
     * @remarks
     * Note that JavaScript's `string.replace()` only replaces the first match, unless a
     * global RegExp is provided.
     *
     * @param input         - The string to be modified
     * @param searchValue   - The value to search for
     * @param replaceValue  - The replacement text
     */
    Text.replaceAll = function (input, searchValue, replaceValue) {
        return input.split(searchValue).join(replaceValue);
    };
    // Regex that finds {#} so it can be replaced by the arguments in string format
    Text.FORMAT_REGEX = /\{\d+\}/g;
    // Regex that finds { and } so they can be removed on a lookup for string format
    Text.FORMAT_ARGS_REGEX = /[\{\}]/g;
    return Text;
}());
/* harmony default export */ __webpack_exports__["default"] = (Text);


/***/ }),

/***/ "PYTr":
/*!*****************************************************!*\
  !*** ./lib/serviceScope/serviceKeys/ServiceKeys.js ***!
  \*****************************************************/
/*! exports provided: ServiceKeys */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceKeys", function() { return ServiceKeys; });
/* harmony import */ var _ServiceKey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ServiceKey */ "XxFD");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */

/**
 * Centralized list of service keys used.
 * Maintaining all the service keys here, would make consumption of services
 * free of any cyclic dependencies.
 *
 * @internal
 */
var ServiceKeys = /** @class */ (function () {
    function ServiceKeys() {
    }
    /**
     * A unique ServiceKey to identify the ParentIframeCommunicator as a service in the ServiceScope.
     *
     * @remarks
     * This is a slightly special case where we can't provide a default implementation because it depends
     * on a context which only exists in the isolated web part scenario. Hence, consuming this service key
     * in non-isolated scenarios will throw the below error.
     */
    ServiceKeys.parentIFrameCommunicatorServiceKey = _ServiceKey__WEBPACK_IMPORTED_MODULE_0__["default"].createCustom('isolated-webpart-application:ParentIframeCommunicator', function () { throw new Error('ParentIframeCommunicator cannot be consumed until it is provided.'); });
    return ServiceKeys;
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

/***/ "Qn+G":
/*!*********************************!*\
  !*** ./lib/BrowserUtilities.js ***!
  \*********************************/
/*! exports provided: BrowserUtilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserUtilities", function() { return BrowserUtilities; });
/* harmony import */ var _SPKillSwitch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SPKillSwitch */ "2Wio");
/* harmony import */ var _Guid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Guid */ "UCHU");


/**
 * BrowserUtilities contains common utilities for browser related operations.
 * @internal
 */
var BrowserUtilities = /** @class */ (function () {
    function BrowserUtilities() {
    }
    BrowserUtilities.isWebViewHosted = function () {
        if (typeof BrowserUtilities._isWebViewHosted === 'undefined') {
            BrowserUtilities._isWebViewHosted =
                BrowserUtilities.isMobileWebView() ||
                    BrowserUtilities.isTeamsWebViewHosted() ||
                    (/[?&]env=WebView/.test(location.search));
        }
        return BrowserUtilities._isWebViewHosted;
    };
    BrowserUtilities.isTeamsWebViewHosted = function () {
        if (typeof BrowserUtilities._isTeamsWebView === 'undefined') {
            var ua = navigator.userAgent;
            BrowserUtilities._isTeamsWebView =
                /* Electron WebView (scoped to Microsoft Teams for now) */
                // tslint:disable-next-line:max-line-length
                /Teams\/((?:(\d+)\.)?(?:(\d+)\.)?(?:(\d+)\.\d+)).* Electron\/((?:(\d+)\.)?(?:(\d+)\.)?(?:(\d+)\.\d+))/.test(ua) ||
                    (/[?&]env=TeamsWebView/.test(location.search));
        }
        return BrowserUtilities._isTeamsWebView;
    };
    /**
     * When SharePoint is hosted in Teams, it can either be in :
     *    1. Teams Desktop Client: Electron Webview
     *    2. Teams in Browser: Iframe
     *
     * Desktop Client is identifiable via the user-agent.
     * However, for Teams in Browser, since we cannot leverage user-agent,
     * we'll be using window.name property to get the host iframe's name,
     * which when equal to "embedded-page-container" lets us know that
     * SharePoint is currently running in Teams in Browser.
     */
    BrowserUtilities.isTeamsBrowserHosted = function () {
        if (typeof BrowserUtilities._isTeamsBrowser === 'undefined') {
            BrowserUtilities._isTeamsBrowser = false;
            try {
                BrowserUtilities._isTeamsBrowser = (window.name === 'embedded-page-container');
            }
            catch (e) { /* no-op */ }
        }
        return BrowserUtilities._isTeamsBrowser;
    };
    /**
     * Return true, if SharePoint is hosted in Teams, either Webview or Browser
     */
    BrowserUtilities.isTeamsHosted = function () {
        if (_SPKillSwitch__WEBPACK_IMPORTED_MODULE_0__["default"].isActivated(_Guid__WEBPACK_IMPORTED_MODULE_1__["default"].parse('0100eb79-e269-4683-b118-81ca4eaaa794'), '10/16/2019', 'Check SharePoint hosted in Teams in Browser')) {
            return BrowserUtilities.isTeamsWebViewHosted();
        }
        return BrowserUtilities.isTeamsWebViewHosted() || BrowserUtilities.isTeamsBrowserHosted();
    };
    BrowserUtilities.isSharePointiOSApp = function () {
        if (typeof BrowserUtilities._isSharePointiOSApp === 'undefined') {
            var userAgent = navigator.userAgent;
            BrowserUtilities._isSharePointiOSApp =
                /* iOS WebView */
                /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/.test(userAgent) ||
                    BrowserUtilities._isTestMobileWebView();
            if (this._isMobileIntuneBrowser(userAgent)) {
                BrowserUtilities._isSharePointiOSApp = false;
            }
        }
        return BrowserUtilities._isSharePointiOSApp;
    };
    BrowserUtilities.isMobileWebView = function () {
        if (typeof BrowserUtilities._isMobileWebView === 'undefined') {
            var ua = navigator.userAgent;
            BrowserUtilities._isMobileWebView =
                /* iOS WebView */
                this.isSharePointiOSApp() ||
                    /* Android WebView (Lollipop+older) */
                    /(Android ).*; wv/.test(ua) ||
                    /(Android ).* Version\/((?:(\d+)\.)?(?:(\d+)\.)?(?:(\d+)\.\d+))/.test(ua) ||
                    /* Windows WebView (C# and JavaScript-based apps) */
                    ((navigator.userAgent.indexOf(BrowserUtilities._sharePointDesktopString) === -1) &&
                        (/(Windows ).*; WebView\/((?:(\d+)\.)?(?:(\d+)\.)?(?:(\d+)\.\d+))/.test(ua) ||
                            /(Windows ).*; MSAppHost\/((?:(\d+)\.)?(?:(\d+)\.)?(?:(\d+)\.\d+))/.test(ua))) ||
                    BrowserUtilities._isTestMobileWebView();
            if (this._isMobileIntuneBrowser(navigator.userAgent)) {
                BrowserUtilities._isMobileWebView = false;
            }
        }
        return BrowserUtilities._isMobileWebView;
    };
    BrowserUtilities.isMobileBrowser = function () {
        if (typeof BrowserUtilities._isMobileBrowser === 'undefined') {
            //
            // NOTE:
            // Currently matching hosted Android WebKit, iPhone/iPod Mobile Safari and IE Mobile.
            // May be extended to cover other mobile browsers as necessary. Not a perfect science.
            //
            BrowserUtilities._isMobileBrowser = BrowserUtilities.isWebViewHosted() ||
                /(Android|iPhone|iPod|IEMobile|BlackBerry)/.test(navigator.userAgent) ||
                (/[?&]env=Mobile/.test(location.search));
        }
        return BrowserUtilities._isMobileBrowser;
    };
    BrowserUtilities.isEmbedded = function () {
        if (typeof BrowserUtilities._isEmbedded === 'undefined') {
            if (BrowserUtilities.isWebViewHosted() || /[?&]PageVersion=[^&]/.test(location.search)) {
                BrowserUtilities._isEmbedded = true;
            }
            else if (navigator.userAgent.indexOf('ManagedBrowser') > -1) {
                BrowserUtilities._isEmbedded = false;
            }
            else {
                try {
                    var isIframeOrPhantomJS = (window.parent &&
                        window.parent !== window &&
                        navigator.userAgent.indexOf('PhantomJS/') === -1);
                    BrowserUtilities._isEmbedded = isIframeOrPhantomJS || /[?&]env=Embedded/.test(location.search);
                }
                catch (e) {
                    BrowserUtilities._handleErrorForParentWindowCheck();
                }
            }
        }
        return BrowserUtilities._isEmbedded;
    };
    BrowserUtilities.supportsServiceWorker = function () {
        return BrowserUtilities._serviceWorkerProperty in navigator;
    };
    BrowserUtilities.supportsNavigationPreload = function () {
        // ServiceWorkerRegistration is available on global window object
        return !!window.ServiceWorkerRegistration &&
            BrowserUtilities._navigationPreloadProperty in window.ServiceWorkerRegistration.prototype;
    };
    BrowserUtilities._isTestMobileWebView = function () {
        return (/[?&]env=MobileWebView/.test(location.search));
    };
    BrowserUtilities._isMobileIntuneBrowser = function (userAgent) {
        return navigator.userAgent.indexOf('ManagedBrowser') > -1;
    };
    BrowserUtilities._handleErrorForParentWindowCheck = function () {
        //
        // Accessing window.parent x-domain throws - then window.parent !== window,
        // and we can assume we are hosted in an x-domain iframe
        //
        BrowserUtilities._isEmbedded = true;
    };
    BrowserUtilities._sharePointDesktopString = 'SharePointDesktop';
    BrowserUtilities._serviceWorkerProperty = 'serviceWorker';
    BrowserUtilities._navigationPreloadProperty = 'navigationPreload';
    return BrowserUtilities;
}());



/***/ }),

/***/ "UCHU":
/*!*********************!*\
  !*** ./lib/Guid.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Validate */ "wAtz");
/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Text */ "OFYJ");
/* harmony import */ var _SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SPCoreLibraryStrings.resx */ "480N");



/**
 * This class represents a globally unique identifier, as described by
 * IETF RFC 4122.
 *
 * @remarks
 * The input string is normalized and validated, which provides
 * important guarantees that simplify other code that works with the GUID.
 * This class also provides basic support for generating a pseudo-random GUID;
 * however, be aware that the uniqueness depends on the browser's `Math.random()`
 * function and may be not be suitable for some applications.
 *
 * See {@link https://www.ietf.org/rfc/rfc4122.txt | RFC4122} for more information.
 *
 * @public
 */
var Guid = /** @class */ (function () {
    /**
     * Use `Guid.parse()` or `Guid.tryParse()` instead of the constructor.
     * @param guid - a normalized, already valid Guid string
     */
    function Guid(guid) {
        this._guid = guid;
    }
    /**
     * Returns a new Guid instance with a pseudo-randomly generated GUID, according
     * to the version 4 UUID algorithm from RFC 4122.
     *
     * @returns A new unique Guid object
     */
    Guid.newGuid = function (randomNumberGenerator) {
        return new Guid(Guid._generateGuid(randomNumberGenerator));
    };
    /**
     * Parses the input string to construct a new Guid object.
     * If the string cannot be parsed, then an error is thrown.
     *
     * @remarks
     * Example syntaxes accepted by this function:
     *
     * - `"d5369f3bbd7a412a9c0f7f0650bb5489"`
     *
     * - `"d5369f3b-bd7a-412a-9c0f-7f0650bb5489"`
     *
     * - `"{d5369f3b-bd7a-412a-9c0f-7f0650bb5489}"`
     *
     * - `"/Guid(d5369f3b-bd7a-412a-9c0f-7f0650bb5489)/"`
     *
     * @param guid - The input string.
     * @returns A valid Guid object
     */
    Guid.parse = function (guidString) {
        var guid = Guid.tryParse(guidString);
        if (!guid) {
            throw new Error(_Text__WEBPACK_IMPORTED_MODULE_1__["default"].format(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].invalidGuidStringError, guidString));
        }
        return guid;
    };
    /**
     * Attempts to parse the input string to construct a new Guid object.
     * If the string cannot be parsed, then undefined is returned.
     *
     * @remarks
     * Example syntaxes accepted by this function:
     *
     * - `"d5369f3bbd7a412a9c0f7f0650bb5489"`
     *
     * - `"d5369f3b-bd7a-412a-9c0f-7f0650bb5489"`
     *
     * - `"{d5369f3b-bd7a-412a-9c0f-7f0650bb5489}"`
     *
     * - `"/Guid(d5369f3b-bd7a-412a-9c0f-7f0650bb5489)/"`
     *
     * @param guid - The input string.
     * @returns The Guid object, or undefined if the string could not be parsed.
     */
    Guid.tryParse = function (guid) {
        if (guid) {
            guid = Guid._normalize(guid);
            if (Guid._guidRegEx.test(guid)) {
                return new Guid(guid);
            }
        }
        return undefined;
    };
    /**
     * Indicates whether a GUID is valid, i.e. whether it would be successfully
     * parsed by `Guid.tryParse()`.  This function is cheaper than `Guid.tryParse()`
     * because it does not construct a Guid object.
     *
     * @param guid - The input string.
     * @returns true, if the Guid is valid.
     */
    Guid.isValid = function (guid) {
        if (guid) {
            guid = Guid._normalize(guid);
            if (Guid._guidRegEx.test(guid)) {
                return true;
            }
        }
        return false;
    };
    /**
     * SharePoint can have guids in the form:
     *   - `Guid(...)`
     *   - `{...}`
     * _normalize transforms guids in this format to the standard
     * guid format.
     *
     * Example: `Guid(d5369f3b-bd7a-412a-9c0f-7f0650bb5489)` becomes `d5369f3b-bd7a-412a-9c0f-7f0650bb5489`
     * Example: `{d5369f3b-bd7a-412a-9c0f-7f0650bb5489}` becomes `d5369f3b-bd7a-412a-9c0f-7f0650bb5489`
     *
     * @param guid - Guid to be normalized, could already be normalized.
     * @returns Normalized guid.
     */
    Guid._normalize = function (guid) {
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNonemptyString(guid, 'guid');
        // Check for Guid(...) and strip
        var result = /^Guid\((.*)\)/i.exec(guid); /* tslint:disable-line:no-null-keyword */
        if (result) {
            guid = result[1];
        }
        // Check for and strip leading or trailing curly braces
        if (guid.length === 38) {
            guid = guid.substr(1, 36);
        }
        return guid.toLowerCase();
    };
    /**
     * Creates a new guid.
     *
     * @returns A valid guid (according to RFC4122)
     */
    Guid._generateGuid = function (randomNumberGenerator) {
        return 'AAAAAAAA-AAAA-4AAA-BAAA-AAAAAAAAAAAA'.replace(/[AB]/g, 
        // Callback for String.replace() when generating a guid.
        function (character) {
            var randomNumber = randomNumberGenerator ? randomNumberGenerator.generate() : Math.random();
            /* tslint:disable:no-bitwise */
            var num = randomNumber * 16 | 0;
            // Check for 'A' in template string because the first characters in the
            // third and fourth blocks must be specific characters (according to "version 4" UUID from RFC 4122)
            var masked = character === 'A' ? num : (num & 0x3 | 0x8);
            return masked.toString(16);
        });
    };
    /**
     * Compare this instance to another Guid instance
     *
     * @returns True if this instance and the specified Guid object
     * represent the same value.
     */
    Guid.prototype.equals = function (guid) {
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNotNullOrUndefined(guid, 'guid');
        return guid && this._guid.toString() === guid.toString();
    };
    /**
     * Returns a string representation of the GUID
     *
     * @returns The GUID value in lowercase hexadecimal without braces.
     *
     * Example: `'d5369f3b-bd7a-412a-9c0f-7f0650bb5489'`
     */
    Guid.prototype.toString = function () {
        return this._guid;
    };
    /**
     * Returns a new empty Guid instance.
     *
     * @returns A new empty Guid object.
     */
    Guid.empty = new Guid('00000000-0000-0000-0000-000000000000');
    Guid._guidRegEx = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
    return Guid;
}());
/* harmony default export */ __webpack_exports__["default"] = (Guid);


/***/ }),

/***/ "XxFD":
/*!****************************************!*\
  !*** ./lib/serviceScope/ServiceKey.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Text */ "OFYJ");
/* harmony import */ var _Validate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Validate */ "wAtz");


var SERVICEKEY_LASTID_WINDOW_VAR = '_SPFX_ServiceKey_lastId';
/**
 * The ServiceKey is a lookup key that is used when calling {@link ServiceScope.consume}
 * to fetch a dependency.
 *
 * @remarks
 * Every service key also provides a default implementation of the dependency, which will
 * be automatically created in the root scope if the dependency is not found.  Providing a default
 * implementation ensures that new dependencies can be safely introduced without inadvertently
 * breaking components that are loaded by an older host that does not provide the new dependency.
 *
 * @public
 */
var ServiceKey = /** @class */ (function () {
    function ServiceKey(id, name, defaultCreator) {
        this.id = id;
        this.name = name;
        this.defaultCreator = defaultCreator;
    }
    /**
     * Constructs a new ServiceKey whose default implementation will be a new instance of
     * a TypeScript class that accepts the standard constructor parameter.
     *
     * @remarks
     * If you want to specify custom constructor parameters, use {@link ServiceKey.createCustom}
     * instead.
     *
     * @param name - A name such as "my-package.IMyService" which should be unique across packages.
     * @param serviceClass - the TypeScript class that implements the service.
     * @returns the newly created ServiceKey
     */
    ServiceKey.create = function (name, serviceClass) {
        // (createCustom() will validate name)
        _Validate__WEBPACK_IMPORTED_MODULE_1__["default"].isNotNullOrUndefined(serviceClass, 'serviceClass');
        return ServiceKey.createCustom(name, function (serviceScope) {
            return new serviceClass(serviceScope);
        });
    };
    /**
     * Constructs a new ServiceKey whose default implementation will be obtained
     * by invoking the specified callback.
     *
     * @param name - A name such as "my-package.IMyService" which should be unique across packages.
     * @param defaultCreator - a callback that returns an object that implements the T interface
     * @returns the newly created service key
     */
    ServiceKey.createCustom = function (name, defaultCreator) {
        _Validate__WEBPACK_IMPORTED_MODULE_1__["default"].isNonemptyString(name, 'name');
        _Validate__WEBPACK_IMPORTED_MODULE_1__["default"].isNotNullOrUndefined(defaultCreator, 'defaultCreator');
        var numericId;
        var lastId = window[SERVICEKEY_LASTID_WINDOW_VAR];
        if (lastId !== undefined && typeof (lastId) === 'number') {
            numericId = lastId + 1;
            // It seems inconceivable that we would increment all the way up to MAX_SAFE_INTEGER,
            // but nonetheless let's make sure that incrementing is actually producing something new
            if (numericId === lastId) {
                throw new Error('ServiceKey.createCustom() counter overflow');
            }
        }
        else {
            numericId = 1;
        }
        window[SERVICEKEY_LASTID_WINDOW_VAR] = numericId;
        // For example if name="sp-http:SPHttpClient 2" and numericId=5 then the generated ID would be:
        // "sp-http:SPHttpClient2_5".
        var id = _Text__WEBPACK_IMPORTED_MODULE_0__["default"].replaceAll(name, ' ', '') + '_' + numericId;
        return new ServiceKey(id, name, defaultCreator);
    };
    return ServiceKey;
}());
/* harmony default export */ __webpack_exports__["default"] = (ServiceKey);


/***/ }),

/***/ "Y40n":
/*!***********************************!*\
  !*** ./lib/ClientManifestData.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _serviceScope_ServiceKey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./serviceScope/ServiceKey */ "XxFD");

/**
 * ClientManifestData contains Component's Manifest.
 * Used for logging the calling component's manifest when communicating with external services.
 *
 * @internal
 */
var ClientManifestData = /** @class */ (function () {
    function ClientManifestData(serviceScope, manifest) {
        this.manifest = manifest;
    }
    ClientManifestData.serviceKey = _serviceScope_ServiceKey__WEBPACK_IMPORTED_MODULE_0__["default"].create('sp-core-library:ClientManifestData', ClientManifestData);
    return ClientManifestData;
}());
/* harmony default export */ __webpack_exports__["default"] = (ClientManifestData);


/***/ }),

/***/ "ZY2i":
/*!************************!*\
  !*** ./lib/SPError.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Validate */ "wAtz");
/* harmony import */ var _SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SPCoreLibraryStrings.resx */ "480N");
// Copyright (c) Microsoft. All rights reserved.
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
 * The purpose of this class is to help make the SharePoint framework errors more robust.
 * On top of the base Error class functionality, this class adds the concept of error codes.
 * The error code could be a non-localized immutable string or an error number. All the
 * SharePoint framework code is expected to use this class for raising errors.
 *
 * References:
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error}
 *
 * {@link http://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript}
 *
 * @alpha
 */
var SPError = /** @class */ (function (_super) {
    __extends(SPError, _super);
    /**
     * Constructor for the SPError class.
     *
     * @param errorCode - a numeric or string error code.
     * @param message - detailed error message.
     * @param logData - (optional) additional data that can be used to troubleshoot rare to repro bugs.
     *
     */
    function SPError(errorCode, message, logProperties) {
        var _this = _super.call(this, message) || this;
        // Manually set the prototype, as we can no longer extend built-in classes like Error, Array, Map, etc
        // tslint:disable-next-line:max-line-length
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        //
        // Note: the prototype must also be set on any classes which extend this one
        _this.__proto__ = SPError.prototype; // tslint:disable-line:no-any
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNonemptyString(errorCode, 'errorCode');
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNonemptyString(message, 'message');
        _this._errorCode = errorCode;
        _this.message = message;
        _this._logProperties = logProperties;
        // IE doesn't get a stack unless you throw an error explictly. Throwing an SPError will not get you the stack.
        _this.stack = (new Error()).stack || SPError._generateErrorStackForIE();
        return _this;
    }
    Object.defineProperty(SPError.prototype, "id", {
        /**
         * Error id.
         * e.g. Value of the enum.
         */
        get: function () {
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPError.prototype, "category", {
        /**
         * Error category.
         */
        get: function () {
            return 'SPError';
        },
        enumerable: true,
        configurable: true
    });
    // Useful for generating an error stack on IE11 for SPError
    SPError._generateErrorStackForIE = function () {
        try {
            throw new Error();
        }
        catch (e) {
            return e.stack;
        }
    };
    /**
     * Return a string equivalent of the error for display purposes.
     *
     * @returns string representation of the error.
     */
    SPError.prototype.toStringForUI = function () {
        return this._toString(true);
    };
    /**
     * Return a string equivalent of the error for logging purposes.
     *
     * @returns string representation of the error.
     */
    SPError.prototype.toString = function () {
        return this._toString();
    };
    /**
     * Return a string equivalent of the error for logging or display purposes.
     *
     * @returns string representation of the error.
     */
    SPError.prototype._toString = function (logDebug) {
        if (!this._errorString) {
            var errorMessageArray = [
                "[" + this.category + "." + this._errorCode + "]:",
                "" + this.message,
                ''
            ];
            if (logDebug || true) {
                // For now support only one level exception hierarchy.
                if (this.innerError) {
                    errorMessageArray = errorMessageArray.concat([
                        _SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].spErrorInnerErrorText,
                        this.innerError.message
                    ]);
                }
                if (this.stack) {
                    errorMessageArray = errorMessageArray.concat([
                        _SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].spErrorCallStackText,
                        this.stack
                    ]);
                }
                if (this._logProperties) {
                    errorMessageArray = errorMessageArray.concat([
                        _SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].spErrorLogPropertiesText,
                        JSON.stringify(this._logProperties)
                    ]);
                }
            }
            this._errorString = errorMessageArray.join('\r\n');
        }
        return this._errorString;
    };
    return SPError;
}(Error));
/* harmony default export */ __webpack_exports__["default"] = (SPError);


/***/ }),

/***/ "bd35":
/*!******************************************!*\
  !*** ./lib/serviceScope/ServiceScope.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Text */ "OFYJ");
/* harmony import */ var _SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../SPCoreLibraryStrings.resx */ "480N");


/**
 * The service locator pattern used by the SharePoint Framework.
 *
 * @remarks
 * ServiceScope provides a formalized way for components to register and consume dependencies
 * ("services"), and to enable different implementations to be registered in different scopes.
 * This improves modularity by decoupling components from their dependencies in an extensible way.
 *
 * For example, suppose that various components need access to an IPageManager instance.  We could
 * simply make the PageManager a singleton (i.e. global variable), but this will not work e.g. if
 * we need to create a pop-up dialog that requires a second PageManager instance.  A better solution
 * would be to add the PageManager as a constructor parameter for each component that requires it,
 * however then we immediately face the problem that any code that calls these constructors
 * also needs a PageManager parameter.  In an application with many such dependencies, business
 * logic that ties together many subsystems would eventually pick up a constructor parameter
 * for every possible dependency, which is awkward.  A natural solution would be to move all the
 * dependencies into a class with name like "ApplicationContext", and then pass this around as our
 * constructor parameter.  This enables the PageManager to be passed to classes that need it
 * without cluttering the intermediary classes that don't.  However, it still has a design problem
 * that "ApplicationContext" has hard-coded dependencies on many unrelated things.  A more flexible
 * approach is to make it a dictionary that can look up items for consumers/providers who know the
 * right lookup key (i.e. ServiceKey).  This is the popular "service locator" design pattern,
 * familiar from the SPContext API in classic SharePoint.
 *
 * ServiceScope takes this idea a step further in two important ways:  First, it provides a scoping
 * mechanism so that e.g. if we have two different pages, they can each provide a unique PageManager
 * instance while still sharing other common dependencies.  Secondly, it allows for a ServiceKey
 * to provide a default implementation of the dependency.  This is important for API stability in
 * our modular client-side environment:  For example, suppose that version 2.0 of our application
 * introduced a new IDiagnosticTracing interface that a version 2.0 component will expect to consume.
 * If the version 2.0 component gets loaded by an older 1.0 application, it would fail.  We could
 * fix this by requiring each consumer to check for any missing dependencies and handle that case,
 * but it would require a lot of checks.  A better solution is to ensure that a default implementation
 * always exists, perhaps just a trivial behavior, so that components can assume that consume() will
 * always return some object that implements the contract.
 *
 * Usage: ServiceScope instances are created by calling either ServiceScope.startNewRoot() or
 * ServiceScope.startNewChild().  They are initially in an "unfinished" state, during which provide()
 * can be called to register service keys, but consume() is disallowed.  After ServiceScope.finish()
 * is called, consume() is allowed and provide() is now disallowed.  These semantics ensure that
 * ServiceScope.consume() always returns the same result for the same key, and does not depend on
 * order of initialization.  It also allows us to support circular dependencies without worrying
 * about infinite loops.  (Circular dependencies are best avoided, however this is difficult to
 * guarantee when working with components that were contributed by various third parties without
 * any coordination.)  To avoid mistakes, it's best to always call consume() inside a callback from
 * serviceScope.whenFinished().
 *
 * @public
 */
var ServiceScope = /** @class */ (function () {
    function ServiceScope(parent) {
        this._parent = parent;
        this._registrations = {};
        this._pendingCallbacks = [];
        this._finished = false;
        this._autocreating = false;
    }
    /**
     * Create a new root-level ServiceScope.  Only root-level scopes have the ability to autocreate
     * default implementations of ServiceKeys.
     *
     * @returns the newly created root ServiceScope
     */
    ServiceScope.startNewRoot = function () {
        return new ServiceScope(undefined);
    };
    /**
     * This is a shorthand function that is equivalent to constructing a new instance of the
     * simpleServiceClass, then registering it by calling ServiceScope.provide().
     *
     * @param serviceKey - the key that can be used later to consume the service
     * @param simpleServiceClass - the TypeScript class to be constructed
     * @returns a newly constructed instance of simpleServiceClass
     */
    ServiceScope.prototype.createAndProvide = function (serviceKey, simpleServiceClass) {
        return this.provide(serviceKey, new simpleServiceClass(this));
    };
    /**
     * This is a shorthand function that constructs the default implementation of the specified
     * serviceKey, and then registers it by calling ServiceScope.provide().
     *
     * @param serviceKey - the key that can be used later to consume the service
     * @returns a service instance that was constructed using ServiceKey.defaultCreator
     */
    ServiceScope.prototype.createDefaultAndProvide = function (serviceKey) {
        var service = serviceKey.defaultCreator(this);
        return this.provide(serviceKey, service);
    };
    /**
     * Consumes a service from the service scope.
     *
     * @remarks
     * Components should call this function to "consume" a dependency, i.e. look up the serviceKey
     * and return the registered service instance.  If the instance cannot be found, then a default
     * instance will be automatically created and registered with the root ServiceScope.
     *
     * @param serviceKey - the key that was used when provide() was called to register the service
     * @returns the service instance
     */
    ServiceScope.prototype.consume = function (serviceKey) {
        if (!this._finished) {
            throw new Error(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].serviceScopeConsumingBeforeFinished);
        }
        if (this._autocreating) {
            throw new Error(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].serviceScopeConsumingDuringAutoCreation);
        }
        var registration = this._registrations[serviceKey.id];
        if (registration) {
            return registration.service;
        }
        if (this._parent) {
            return this._parent.consume(serviceKey);
        }
        // We've reached the root scope without finding the service.  Construct a default instance
        var autocreatedService = undefined;
        this._autocreating = true;
        try {
            autocreatedService = serviceKey.defaultCreator(this);
            this._registerService(serviceKey, autocreatedService);
        }
        finally {
            this._autocreating = false;
        }
        if (autocreatedService === undefined) {
            throw Error('ServiceKey must have an type');
        }
        this._processPendingCallbacks();
        return autocreatedService;
    };
    /**
     * Completes the initialization sequence for a service scope.
     *
     * @remarks
     * When a ServiceScope is first started, it is in an "unfinished" state where provide() is
     * allowed but consume() is disallowed.  After calling finish(), then consume() is allowed
     * but provide() is disallowed.
     *
     * This formalism prevents a number of complex situations that could lead to bugs.  For example,
     * supposed that Scope2 is a child of Scope1, and Scope1 provides instance A1 of interface A.
     * If someone consumes A1 from Scope2 (via inheritance) before Scope2.provide() is called
     * with A2, then a subsequent call to Scope2.consume() might return a different result than
     * the previous call.  This nondeterminism could cause unpredictable results that are
     * difficult to diagnose.
     */
    ServiceScope.prototype.finish = function () {
        if (this._finished) {
            throw new Error(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].serviceScopeAlreadyFinishedError);
        }
        this._finished = true;
        this._processPendingCallbacks();
    };
    /**
     * Returns the parent of the current ServiceScope, or undefined if this is a root scope.
     *
     * @returns the parent service scope
     */
    ServiceScope.prototype.getParent = function () {
        return this._parent;
    };
    /**
     * Defer an operation until after {@link ServiceScope.finish} has completed.
     *
     * @remarks
     * It is an error to call ServiceScope.consume() before finish() has been called.
     * The most reliable way to protect your component against this error is to perform the
     * consume() calls inside a whenFinished() callback.  If the service scope is already
     * finished, then the callback will be executed immediately; otherwise, it will be executed
     * later when the scope is finished.
     *
     * NOTE: This is not an asynchronous callback.  ServiceScope initialization is typically
     * inexpensive and short lived. However, the control flow often threads through numerous
     * constructors and base classes, which can be simplified using whenFinished().
     *
     * @param callback - A block of code that needs to call ServiceScope.consume()
     */
    ServiceScope.prototype.whenFinished = function (callback) {
        if (this._finished && !this._autocreating) {
            callback();
        }
        else {
            this._pendingCallbacks.push(callback);
        }
    };
    /**
     * Add a new service to a service scope.
     *
     * @remarks
     * ServiceScope.provide() is used to register an implementation of the given serviceKey
     * for the current scope.  It may only be used when the ServiceScope is in an "unfinished"
     * state, i.e. before finish() has been called.
     *
     * @param serviceKey - the key that will later be used to consume the service
     * @param service - the service instance that is being registered
     * @returns the same object that was passed as the "service" parameter
     */
    ServiceScope.prototype.provide = function (serviceKey, service) {
        if (this._finished) {
            throw new Error(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].serviceScopeProvideServiceAfterFinishedError);
        }
        if (this._registrations[serviceKey.id]) {
            throw new Error(_Text__WEBPACK_IMPORTED_MODULE_0__["default"].format(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].serviceScopeProvideServiceThatAlreadyExists, serviceKey.name));
        }
        this._registerService(serviceKey, service);
        return service;
    };
    /**
     * Constructs a new ServiceScope that is a child of the current scope.
     *
     * @remarks
     * The service scopes form a tree structure, such that when consuming a service,
     * if the key is not explicitly provided by a child scope, the parent hierarchy
     * will be consulted.
     *
     * @returns the newly created root ServiceScope
     */
    ServiceScope.prototype.startNewChild = function () {
        return new ServiceScope(this);
    };
    Object.defineProperty(ServiceScope.prototype, "_isFinished", {
        /**
         * Indicates whether the current servicescope is finished or not.
         *
         * @internal
         */
        get: function () {
            return this._finished;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Registers a service to the ServiceScope.
     * @internal
     */
    ServiceScope.prototype._registerService = function (serviceKey, service) {
        this._registrations[serviceKey.id] = { serviceKey: serviceKey, service: service };
    };
    ServiceScope.prototype._processPendingCallbacks = function () {
        var pendingCallbacks = this._pendingCallbacks;
        this._pendingCallbacks = [];
        for (var _i = 0, pendingCallbacks_1 = pendingCallbacks; _i < pendingCallbacks_1.length; _i++) {
            var pendingCallback = pendingCallbacks_1[_i];
            pendingCallback();
        }
    };
    return ServiceScope;
}());
/* harmony default export */ __webpack_exports__["default"] = (ServiceScope);


/***/ }),

/***/ "gLQp":
/*!************************!*\
  !*** ./lib/log/Log.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DefaultLogHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefaultLogHandler */ "LcA1");

/**
 * A basic redirectable logging system.
 *
 * @remarks
 * The Log class provides static methods for logging messages at different levels (verbose,
 * info, warning, error) and with context information. Context information helps identify
 * which component generated the messages and allows for filtering of log events.  In a
 * SharePoint Framework application, these messages will appear on the developer dashboard.
 *
 * @public
 */
var Log = /** @class */ (function () {
    function Log() {
    }
    /**
     * Configures the logger with a different target.
     *
     * @internal
     */
    // @TODO: VSO 285419 will clean up this contract.
    Log._initialize = function (logHandler) {
        Log._logHandler = logHandler;
    };
    /**
     * Logs a message which contains detailed information that is generally only needed for
     * troubleshooting.
     * @param   source - the source from where the message is logged, e.g., the class name.
     *          The source provides context information for the logged message.
     *          If the source's length is more than 20, only the first 20 characters are kept.
     * @param   message - the message to be logged
     *          If the message's length is more than 100, only the first 100 characters are kept.
     * @param   scope - the service scope that the source uses. A service scope can provide
      *         more context information (e.g., web part information) to the logged message.
     */
    Log.verbose = function (source, message, scope) {
        Log._logHandler.verbose(source, message, scope);
    };
    /**
     * Logs a general informational message.
     * @param   source - the source from where the message is logged, e.g., the class name.
     *          The source provides context information for the logged message.
     *          If the source's length is more than 20, only the first 20 characters are kept.
     * @param   message - the message to be logged
     *          If the message's length is more than 100, only the first 100 characters are kept.
     * @param   scope - the service scope that the source uses. A service scope can provide
      *         more context information (e.g., web part information) to the logged message.
     */
    Log.info = function (source, message, scope) {
        Log._logHandler.info(source, message, scope);
    };
    /**
     * Logs a warning.
     * @param   source - the source from where the message is logged, e.g., the class name.
     *          The source provides context information for the logged message.
     *          If the source's length is more than 20, only the first 20 characters are kept.
     * @param   message - the message to be logged
     *          If the message's length is more than 100, only the first 100 characters are kept.
     * @param   scope - the service scope that the source uses. A service scope can provide
      *         more context information (e.g., web part information) to the logged message.
     */
    Log.warn = function (source, message, scope) {
        Log._logHandler.warn(source, message, scope);
    };
    /**
     * Logs an error.
     * @param   source - the source from where the error is logged, e.g., the class name.
     *          The source provides context information for the logged error.
     *          If the source's length is more than 20, only the first 20 characters are kept.
     * @param   error - the error to be logged
     * @param   scope - the service scope that the source uses. A service scope can provide
      *         more context information (e.g., web part information) to the logged error.
     */
    Log.error = function (source, error, scope) {
        Log._logHandler.error(source, error, scope);
    };
    Log._logHandler = new _DefaultLogHandler__WEBPACK_IMPORTED_MODULE_0__["default"]();
    return Log;
}());
/* harmony default export */ __webpack_exports__["default"] = (Log);


/***/ }),

/***/ "jjO0":
/*!************************!*\
  !*** ./lib/Session.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Guid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Guid */ "UCHU");
/* harmony import */ var _Validate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Validate */ "wAtz");
/* harmony import */ var _log_Log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./log/Log */ "gLQp");



/**
 * Provides access to the application's browser session and active page.
 *
 * @public
 */
var Session = /** @class */ (function () {
    function Session() {
    }
    /**
     * This is called once by the system during startup to initialize the Session object.
     * @internal
     */
    Session._initialize = function (data) {
        _Validate__WEBPACK_IMPORTED_MODULE_1__["default"].isNotNullOrUndefined(data, 'data');
        Session._applicationId = _Guid__WEBPACK_IMPORTED_MODULE_0__["default"].tryParse(data.applicationId) || _Guid__WEBPACK_IMPORTED_MODULE_0__["default"].empty;
        var pageIdGuid = _Guid__WEBPACK_IMPORTED_MODULE_0__["default"].tryParse(data.pageId);
        if (!pageIdGuid) {
            _log_Log__WEBPACK_IMPORTED_MODULE_2__["default"].warn('Session', 'The pageId parameter was undefined or invalid. Generating a new Guid');
            pageIdGuid = _Guid__WEBPACK_IMPORTED_MODULE_0__["default"].newGuid();
        }
        Session._pageId = pageIdGuid;
    };
    /**
     * This is called by the framework to indicate that the current page has changed.
     * @internal
     */
    Session._changePage = function () {
        Session._pageId = _Guid__WEBPACK_IMPORTED_MODULE_0__["default"].newGuid();
    };
    Object.defineProperty(Session, "applicationId", {
        /**
         * A unique identifier for the current instance of the client-side application.
         *
         * @remarks
         * A unique identifier used to correlate logging and other diagnostic information. Its lifetime
         * persists for the duration of the client-side application instance, i.e. it begins with the
         * server request that renders the page, and ends e.g. when the browser tab is closed or F5 is
         * pressed to reload the page.  Note that if the application's router supports in-place navigation
         * (via the history.pushState() API), the application session persists across these transitions.
         */
        get: function () {
            return this._applicationId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Session, "pageId", {
        /**
         * A unique identifier for the current page within the client-side application.
         *
         * @remarks
         * A unique identifier used to correlate logging and other diagnostic information.  Whereas the
         * {@link Session.applicationId} tracks the entire lifetime of the client-side application instance,
         * the pageId tracks an individual "page" that is rendered.
         *
         * For example, suppose that the application initially loads PageA, then the user does in-place
         * navigation (via the history.pushState() API) to PageB, then navigates back to PageA, and finally
         * they close the browser tab. During this sequence, the applicationId will remain the same, however
         * the pageId will change on each navigation.  The 3 different pageId values are used by the diagnostics
         * e.g. to track success/failure statistics for PageA independently of PageB.
         *
         * The concept of a page is subjective and defined by the router for a particular application.
         */
        get: function () {
            return this._pageId;
        },
        enumerable: true,
        configurable: true
    });
    return Session;
}());
/* harmony default export */ __webpack_exports__["default"] = (Session);


/***/ }),

/***/ "kYSd":
/*!**************************************!*\
  !*** ./lib/events/SPEventManager.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Validate */ "wAtz");
/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Text */ "OFYJ");
/* harmony import */ var _log_Log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../log/Log */ "gLQp");



/**
 * Manager for the eventing system.
 *
 * Allows to register/unregister event handlers to events, and raises those events.
 * The events are identified by its name as a string, and it doesn't provide type safety for the event arguments.
 *
 * There are two types of events: regular and sticky.
 * Sticky events are events that once raised, every listener that subscribed to the event will be automatically
 * executed as if the event was raised.
 * Sticky events are useful for framework-level notification, like when a system is initialized (every listener will
 * know the system is initialized).
 *
 * This is an internal architecture underlying the SPEvent class, which provides a handy way to register and unregister
 * events, and provides the type safety. This class should not be exposed to third-parties directly.
 *
 * @internal
 */
var SPEventManager = /** @class */ (function () {
    function SPEventManager() {
        this._listeners = new Map();
        this._raisedEvents = new Map();
    }
    Object.defineProperty(SPEventManager, "instance", {
        /**
         * Instance of the SPEventManager.
         */
        get: function () {
            if (!this._instance) {
                this._instance = new SPEventManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Raises an event.
     *
     * After this is called, all components registered under the event will execute their callback.
     * @param eventName - Name of the event
     * @param eventArgs - Arguments of the event
     * @alpha
     */
    SPEventManager.prototype.raiseEvent = function (eventName, eventArgs) {
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNonemptyString(eventName, 'eventName');
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNotNullOrUndefined(eventArgs, 'eventArgs');
        return this._raiseEventInternal(eventName, eventArgs);
    };
    /**
     * Raises a sticky event.
     * Sticky events are stored, so when new listeners are added to the event, they will be immediately notified.
     *
     * After this is called, all components registered under the event will execute their callback.
     * @param eventName - Name of the event
     * @param eventArgs - Arguments of the event
     * @alpha
     */
    SPEventManager.prototype.raiseStickyEvent = function (eventName, eventArgs) {
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNonemptyString(eventName, 'eventName');
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNotNullOrUndefined(eventArgs, 'eventArgs');
        // Save the last event raised for each event name
        this._raisedEvents.set(eventName, eventArgs);
        return this._raiseEventInternal(eventName, eventArgs);
    };
    /**
     * Registers an event handler for an event.
     * @param eventName - Name of the event to register to.
     * @param observer - Component that is registering the event.
     * @param eventHandler - Function to handle the event.
     */
    SPEventManager.prototype.registerEvent = function (eventName, observer, eventHandler) {
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNonemptyString(eventName, 'eventName');
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNotNullOrUndefined(observer, 'observer');
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNotNullOrUndefined(eventHandler, 'eventHandler');
        if (!this._listeners.has(eventName)) {
            this._listeners.set(eventName, []);
        }
        this._listeners.get(eventName).push({ observer: observer, eventHandler: eventHandler });
        // If an event has been raised and an observer registers later, it will execute the handler
        // This is to support cases when a component gets loaded after the page loads, so they can know
        // the page had a navigation, and potentially placeholders were already set up.
        if (this._raisedEvents.has(eventName)) {
            eventHandler.call(observer, this._raisedEvents.get(eventName));
        }
    };
    /**
     * Removes an event handler from the event listeners list.
     * The event handler passed as input must be the first one that was used to register to the event.
     *
     * @remarks
     * If this is requested without adding an event handler first, it logs an error.
     *
     * @param eventName - Name of the event to remove the event handler from.
     * @param observer - Component that is deregistering from the event.
     * @param eventHandler - Function to handle the event. Used to remove it from the list of listeners.
     */
    SPEventManager.prototype.unregisterEvent = function (eventName, observer, eventHandler) {
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNonemptyString(eventName, 'eventName');
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNotNullOrUndefined(observer, 'observer');
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNotNullOrUndefined(eventHandler, 'eventHandler');
        if (!this._listeners.has(eventName)) {
            return;
        }
        var listeners = this._listeners.get(eventName);
        var filteredListeners = listeners.filter(function (el) { return el.observer !== observer || el.eventHandler !== eventHandler; });
        if (filteredListeners.length === listeners.length) {
            var errorMessage = _Text__WEBPACK_IMPORTED_MODULE_1__["default"].format(
            // TODO VSO:#394928 Localize error messages
            'Failed to remove event handler for component "{0}". Event handler was not registered.', observer.componentId);
            _log_Log__WEBPACK_IMPORTED_MODULE_2__["default"].error(SPEventManager._logSource, new Error(errorMessage));
        }
        this._listeners.set(eventName, filteredListeners);
    };
    /**
     * Removes all information from an event from the Event Manager, including all listeners.
     *
     * @param eventName - Name of the event to remove.
     */
    SPEventManager.prototype.removeEvent = function (eventName) {
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNonemptyString(eventName, 'eventName');
        this._listeners.delete(eventName);
    };
    /**
     * Removes all information for all events whose id starts with the provided prefix from the Event Manager.
     * This removes all listeners for all events that match.
     *
     * @param eventNamePrefix - Prefix for the event names.
     */
    SPEventManager.prototype.removeEventsByPrefix = function (eventNamePrefix) {
        var _this = this;
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNonemptyString(eventNamePrefix, 'eventNamePrefix');
        var matchedKeys = [];
        this._listeners.forEach(function (value, key) {
            if (key.indexOf(eventNamePrefix) === 0) {
                matchedKeys.push(key);
            }
        });
        matchedKeys.forEach(function (key) { return _this._listeners.delete(key); });
    };
    /**
     * Returns the number of listeners for a particular event
     *
     * @internal
     */
    SPEventManager.prototype._listenerCount = function (eventName) {
        if (!this._listeners.has(eventName)) {
            return 0;
        }
        return this._listeners.get(eventName).length;
    };
    /**
     * Private function to raise an event.
     * This include the shared functionality between raising sticky and regular events.
     *
     * After this is called, all components registered under the event will execute their callback.
     * @param eventName - Name of the event
     * @param eventArgs - Arguments of the event
     */
    SPEventManager.prototype._raiseEventInternal = function (eventName, eventArgs) {
        var _this = this;
        if (!this._listeners.has(eventName)) {
            return;
        }
        this._listeners.get(eventName).forEach(function (listener) {
            if (listener.observer.isDisposed) {
                _this.unregisterEvent(eventName, listener.observer, listener.eventHandler);
            }
            else {
                try {
                    listener.eventHandler.call(listener.observer, eventArgs);
                }
                catch (e) {
                    var errorMessage = _Text__WEBPACK_IMPORTED_MODULE_1__["default"].format(
                    // TODO VSO:#394928 Localize error messages
                    'Failed to execute event handler for component "{0}"', listener.observer.componentId);
                    _log_Log__WEBPACK_IMPORTED_MODULE_2__["default"].error(SPEventManager._logSource, new Error(errorMessage));
                }
            }
        });
    };
    SPEventManager._logSource = 'SPEventManager';
    return SPEventManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPEventManager);


/***/ }),

/***/ "lGl9":
/*!******************************!*\
  !*** ./lib/JsonUtilities.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Copyright (c) Microsoft. All rights reserved.
/**
 * Utililty code to help manipulate JSON objects/strings.
 * See {@link http://www.json.org} for more information.
 *
 * @alpha
 */
var JsonUtilities = /** @class */ (function () {
    function JsonUtilities() {
    }
    /**
     * Encode a json string such that it can be safely transported over a network and be processed
     * in the server side code. And also safely transported back to the client and consumed by
     * JSON.parse().
     *
     * @param json - the json string to encode.
     */
    JsonUtilities.encode = function (json) {
        // Note from Manish:
        // Need for this stems from the
        // fact that JSON.stringify() does not encode all the required characters to make it safe to be
        // transported over a network. Neither does it provide an option to. Further, one might think
        // that JSON is a subset of Javascript, but it turns out that it is not. It allows for certain
        // characters that are treated as syntax errors in Javascript. On top of that the .Net WCF
        // javascript deserializer expects the JSON strings in certain format for it deserialize them
        // correctly. All in all, we need to do some special encoding to transport JSON strings over the
        // network.
        //
        // See https://github.com/judofyr/timeless/commit/9212af0a8d2124b92a7e4c6355007e4b4b0ae71d
        if (!json) {
            return undefined;
        }
        JsonUtilities._escapableChars.lastIndex = 0;
        return JsonUtilities._escapableChars.test(json) ? json.replace(this._escapableChars, function (a) {
            var c = JsonUtilities._substibuteChars[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) : json;
    };
    /**
     * The list of characters that need to be escaped and their substitute characters
     */
    /* tslint:disable:max-line-length */
    JsonUtilities._escapableChars = /[\\\"\'\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    /* tslint:enable:max-line-length */
    JsonUtilities._substibuteChars = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\'': '\\\'',
        '\\': '\\\\'
    };
    return JsonUtilities;
}());
/* harmony default export */ __webpack_exports__["default"] = (JsonUtilities);


/***/ }),

/***/ "loEg":
/*!************************************************************!*\
  !*** ./lib/serviceScope/provider/RandomNumberGenerator.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ServiceKey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ServiceKey */ "XxFD");

/**
 * This is the default implementation of {@link IRandomNumberGenerator} that simply
 * calls Math.random().
 *
 * @public
 */
var RandomNumberGenerator = /** @class */ (function () {
    function RandomNumberGenerator(serviceScope) {
        // (this constructor is currently unused, but it is required by the
        // ServiceKey.create() contract)
    }
    /** {@inheritDoc IRandomNumberGenerator.generate} */
    RandomNumberGenerator.prototype.generate = function () {
        return Math.random();
    };
    /**
     * The service key for IRandomNumberGenerator.
     */
    RandomNumberGenerator.serviceKey = _ServiceKey__WEBPACK_IMPORTED_MODULE_0__["default"].create('sp-core-library:RandomNumberGenerator', RandomNumberGenerator);
    return RandomNumberGenerator;
}());
/* harmony default export */ __webpack_exports__["default"] = (RandomNumberGenerator);


/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: _BrowserDetection, DisplayMode, _ClientManifestData, Guid, JsonUtilities, Text, Version, Validate, UrlUtilities, UrlQueryParameterCollection, TimeProvider, RandomNumberGenerator, ServiceKey, ServiceScope, Session, Environment, EnvironmentType, _SPFlight, _SPKillSwitch, SPError, Log, SPEvent, SPEventArgs, _SPEventManager, Event, EventArgs, _DeferredClass, _BrowserUtilities, _Envoy, _ServiceKeys */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventArgs", function() { return EventArgs; });
/* harmony import */ var _BrowserDetection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BrowserDetection */ "yDiH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_BrowserDetection", function() { return _BrowserDetection__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _DisplayMode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DisplayMode */ "FtfD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DisplayMode", function() { return _DisplayMode__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _ClientManifestData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ClientManifestData */ "Y40n");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_ClientManifestData", function() { return _ClientManifestData__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Guid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Guid */ "UCHU");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Guid", function() { return _Guid__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _JsonUtilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./JsonUtilities */ "lGl9");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JsonUtilities", function() { return _JsonUtilities__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Text */ "OFYJ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return _Text__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _Version__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Version */ "4Ndb");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Version", function() { return _Version__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _Validate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Validate */ "wAtz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Validate", function() { return _Validate__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _url_UrlUtilities__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./url/UrlUtilities */ "Btg7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UrlUtilities", function() { return _url_UrlUtilities__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _url_UrlQueryParameterCollection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./url/UrlQueryParameterCollection */ "5cYQ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UrlQueryParameterCollection", function() { return _url_UrlQueryParameterCollection__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _serviceScope_provider_TimeProvider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./serviceScope/provider/TimeProvider */ "o07N");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeProvider", function() { return _serviceScope_provider_TimeProvider__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _serviceScope_provider_RandomNumberGenerator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./serviceScope/provider/RandomNumberGenerator */ "loEg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RandomNumberGenerator", function() { return _serviceScope_provider_RandomNumberGenerator__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _serviceScope_ServiceKey__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./serviceScope/ServiceKey */ "XxFD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ServiceKey", function() { return _serviceScope_ServiceKey__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _serviceScope_ServiceScope__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./serviceScope/ServiceScope */ "bd35");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ServiceScope", function() { return _serviceScope_ServiceScope__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _Session__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Session */ "jjO0");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Session", function() { return _Session__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _Environment__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Environment */ "uB+2");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Environment", function() { return _Environment__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EnvironmentType", function() { return _Environment__WEBPACK_IMPORTED_MODULE_15__["EnvironmentType"]; });

/* harmony import */ var _SPFlight__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./SPFlight */ "JJKV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_SPFlight", function() { return _SPFlight__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _SPKillSwitch__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./SPKillSwitch */ "2Wio");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_SPKillSwitch", function() { return _SPKillSwitch__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _SPError__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./SPError */ "ZY2i");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPError", function() { return _SPError__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _log_Log__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./log/Log */ "gLQp");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Log", function() { return _log_Log__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _events_SPEvent__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./events/SPEvent */ "6T9R");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPEvent", function() { return _events_SPEvent__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _events_SPEventArgs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./events/SPEventArgs */ "BHcV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPEventArgs", function() { return _events_SPEventArgs__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _events_SPEventManager__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./events/SPEventManager */ "kYSd");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_SPEventManager", function() { return _events_SPEventManager__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _deferredClass_DeferredClass__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./deferredClass/DeferredClass */ "KfQ9");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_DeferredClass", function() { return _deferredClass_DeferredClass__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _BrowserUtilities__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./BrowserUtilities */ "Qn+G");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_BrowserUtilities", function() { return _BrowserUtilities__WEBPACK_IMPORTED_MODULE_24__["BrowserUtilities"]; });

/* harmony import */ var _envoy_Envoy__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./envoy/Envoy */ "DXUK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_Envoy", function() { return _envoy_Envoy__WEBPACK_IMPORTED_MODULE_25__["Envoy"]; });

/* harmony import */ var _serviceScope_serviceKeys_ServiceKeys__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./serviceScope/serviceKeys/ServiceKeys */ "PYTr");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_ServiceKeys", function() { return _serviceScope_serviceKeys_ServiceKeys__WEBPACK_IMPORTED_MODULE_26__["ServiceKeys"]; });

/**
 * SharePoint Framework core libraries.
 *
 * @remarks
 * This package provides a foundation of core classes that ensure a consistent character
 * across all the other SharePoint Framework APIs.  Because this package is a dependency
 * of every other package, its design prioritizes small code size and broad applicability,
 * versus flexibility or richness of features.
 *
 * @packagedocumentation
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




















// Events



// Backwards compatibility for bundles that referenced the originally shipped names
// "Event" and "EventArgs" (which turned out to conflict with the DOM API).


/**
 * DO NOT USE THIS DEFINITION.
 * @remarks
 * This is a backwards compatibility shim for legacy third-party bundles that imported the
 * old "Event" class.  It was renamed to solve a naming conflict with the brower DOM "Event".
 * @internal @preapproved
 * @deprecated Use the SPEvent class instead.
 */
var Event = /** @class */ (function (_super) {
    __extends(Event, _super);
    function Event() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Event;
}(_events_SPEvent__WEBPACK_IMPORTED_MODULE_20__["default"]));

/**
 * DO NOT USE THIS DEFINITION.
 * @remarks
 * This is a backwards compatibility shim for legacy third-party bundles that imported the
 * old "EventArgs" class.  It was renamed to solve a naming conflict with the brower DOM "Event".
 * @internal @preapproved
 * @deprecated Use the SPEvent class instead.
 */
var EventArgs = /** @class */ (function (_super) {
    __extends(EventArgs, _super);
    function EventArgs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EventArgs;
}(_events_SPEventArgs__WEBPACK_IMPORTED_MODULE_21__["default"]));







/***/ }),

/***/ "o07N":
/*!***************************************************!*\
  !*** ./lib/serviceScope/provider/TimeProvider.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ServiceKey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ServiceKey */ "XxFD");

/**
 * This is the default implementation of {@link ITimeProvider} that simply
 * calls the real browser APIs.
 *
 * @public
 */
var TimeProvider = /** @class */ (function () {
    function TimeProvider(serviceScope) {
        // (this constructor is currently unused, but it is required by the
        // ServiceKey.create() contract)
    }
    /** {@inheritDoc ITimeProvider.getDate} */
    TimeProvider.prototype.getDate = function () {
        return new Date();
    };
    /** {@inheritDoc ITimeProvider.getTimestamp} */
    TimeProvider.prototype.getTimestamp = function () {
        return performance.now();
    };
    /**
     * The service key for ITimeProvider.
     */
    TimeProvider.serviceKey = _ServiceKey__WEBPACK_IMPORTED_MODULE_0__["default"].create('sp-core-library:TimeProvider', TimeProvider);
    return TimeProvider;
}());
/* harmony default export */ __webpack_exports__["default"] = (TimeProvider);


/***/ }),

/***/ "uB+2":
/*!****************************!*\
  !*** ./lib/Environment.js ***!
  \****************************/
/*! exports provided: EnvironmentType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnvironmentType", function() { return EnvironmentType; });
/* harmony import */ var _Validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Validate */ "wAtz");
/* harmony import */ var _SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SPCoreLibraryStrings.resx */ "480N");


/**
 * Indicates the general type of environment where the SharePoint Framework is running.
 *
 * @remarks
 * This enum is used by the {@link Environment."type"} property.  It provides a way to distinguish
 * environments where certain functionality may be limited or disabled.
 *
 * @public
 */
var EnvironmentType;
(function (EnvironmentType) {
    /**
     * Indicates that the SharePoint Framework is running inside a test harness, e.g. a unit test.
     * There may be no user interaction at all, and network access in general may be disabled.
     */
    EnvironmentType[EnvironmentType["Test"] = 0] = "Test";
    /**
     * Indicates that the SharePoint Framework is running on a page from a "localhost" web server,
     * for example the SharePoint Workbench when hosted via "gulp serve".  SharePoint REST API calls
     * will not be available, and in general network access may not authenticate properly.
     * Certain page context information may be using mock values for testing.
     */
    EnvironmentType[EnvironmentType["Local"] = 1] = "Local";
    /**
     * Indicates that the SharePoint Framework is running on a modern SharePoint web page,
     * with full framework functionality.  This is the normal usage scenario.
     */
    EnvironmentType[EnvironmentType["SharePoint"] = 2] = "SharePoint";
    /**
     * Indicates that the framework was hosted by a classic server-rendered SharePoint page.
     * Some functionality may be limited, e.g. various extensibility APIs may not be supported.
     */
    EnvironmentType[EnvironmentType["ClassicSharePoint"] = 3] = "ClassicSharePoint";
})(EnvironmentType || (EnvironmentType = {}));
/**
 * Information about the system environment where the SharePoint Framework is running.
 * @public
 */
var Environment = /** @class */ (function () {
    function Environment() {
    }
    /**
     * This is called once by the system during startup to initialize the Environment object.
     * @internal
     */
    Environment._initialize = function (data) {
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNotNullOrUndefined(data, 'data');
        Environment._type = data.type;
        _Validate__WEBPACK_IMPORTED_MODULE_0__["default"].isNotNullOrUndefined(Environment._type, 'environmentType');
        if (!EnvironmentType.hasOwnProperty(data.type.toString())) {
            throw new Error(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].invalidEnvironmentTypeError);
        }
    };
    Object.defineProperty(Environment, "type", {
        /**
         * Indicates the general type of environment where the SharePoint Framework is running.
         */
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return Environment;
}());
/* harmony default export */ __webpack_exports__["default"] = (Environment);


/***/ }),

/***/ "vpy3":
/*!*******************************!*\
  !*** external "resx-strings" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vpy3__;

/***/ }),

/***/ "wAtz":
/*!*************************!*\
  !*** ./lib/Validate.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Text */ "OFYJ");
/* harmony import */ var _SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SPCoreLibraryStrings.resx */ "480N");


/**
 * Performs common validation tests for properties and function parameters.
 *
 * @remarks
 *
 * This class implements provides a standard way to validate properties and function parameters.
 * Unlike debug assertions, Validate checks are always performed and will always throw an error,
 * even in a production release.  As such, be careful not to overuse these checks in a way
 * that might impact performance.
 *
 * @public
 */
var Validate = /** @class */ (function () {
    function Validate() {
    }
    /**
     * Throws an exception if the specified value is not true.
     * @param value - the value to check
     * @param variableName - the program variable name, which will be mentioned in the error message
     */
    Validate.isTrue = function (value, variableName) {
        if (!value) {
            throw new Error(_Text__WEBPACK_IMPORTED_MODULE_0__["default"].format(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].isFalseValidateError, variableName));
        }
    };
    /**
     * Throws an exception if the specified value is null or undefined.
     * @param value - the value to check
     * @param variableName - the program variable name, which will be mentioned in the error message
     */
    /* tslint:disable:no-any */
    Validate.isNotNullOrUndefined = function (value, variableName) {
        /* tslint:enable:no-any */
        /* tslint:disable:no-null-keyword */
        if (value === null) {
            /* tslint:enable:no-null-keyword */
            throw new Error(_Text__WEBPACK_IMPORTED_MODULE_0__["default"].format(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].isNullValidateError, variableName));
        }
        if (value === undefined) {
            throw new Error(_Text__WEBPACK_IMPORTED_MODULE_0__["default"].format(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefinedValidateError, variableName));
        }
    };
    /**
     * Throws an exception if the specified string is null, undefined, or an empty string.
     * @param value - the value to check
     * @param variableName - the program variable name, which will be mentioned in the error message
     */
    Validate.isNonemptyString = function (value, variableName) {
        Validate.isNotNullOrUndefined(value, variableName);
        if (!value || value && value.length === 0) {
            throw new Error(_Text__WEBPACK_IMPORTED_MODULE_0__["default"].format(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].isEmptyStringValidateError, variableName));
        }
    };
    /**
     * Throws an exception if the specified object has been disposed.
     * @param value - the value to check
     * @param className - the class name, which will be mentioned in the error message
     */
    Validate.isNotDisposed = function (value, className) {
        if (value.isDisposed) {
            throw new Error(_Text__WEBPACK_IMPORTED_MODULE_0__["default"].format(_SPCoreLibraryStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].isDisposedValidateError, className));
        }
    };
    return Validate;
}());
/* harmony default export */ __webpack_exports__["default"] = (Validate);
/*
  Internal notes:
  - We will improve the exception and localization of error messages in VSO #163788
  - Do not add validation algorithms (e.g. isZipCode()) to this file; it should only
    provide basic checks similar to Assert
*/


/***/ }),

/***/ "yDiH":
/*!*********************************!*\
  !*** ./lib/BrowserDetection.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Version */ "4Ndb");

/**
 * Provides with information from the browser.
 * @internal
 */
var BrowserDetection = /** @class */ (function () {
    function BrowserDetection() {
    }
    /**
     * Returns information from the browser, calculated from the user agent.
     *
     * @param userAgent - Optional. If provided, it will calculate the data from the input parameter,
     *                      instead of the user agent from the browser.
     * @returns Browser information, with browser and OS data.
     */
    BrowserDetection.getBrowserInformation = function (userAgent) {
        var agent = userAgent || BrowserDetection.getUserAgent();
        return BrowserDetection.buildBrowserInformation(agent);
    };
    BrowserDetection.getUserAgent = function () {
        return (window && window.navigator && navigator.userAgent) || '';
    };
    BrowserDetection.buildBrowserInformation = function (userAgent) {
        var agent = userAgent.toLowerCase();
        var browserInfo = {
            browser: 0 /* Other */,
            browserVersion: undefined,
            os: 0 /* Other */,
            osVersion: undefined,
            userAgent: userAgent
        };
        browserInfo = BrowserDetection.fillBrowser(browserInfo, agent);
        browserInfo = BrowserDetection.fillOS(browserInfo, agent);
        return browserInfo;
    };
    BrowserDetection.fillBrowser = function (browserInfo, userAgent) {
        var browser = 0 /* Other */;
        var browserVersion = undefined;
        // Fill the values here
        var match;
        if (match = /msie (\d+)([\d.]*)/.exec(userAgent)) {
            // IE <= 10 has something like "MSIE 9" in the user agent.
            // This is also what newer versions do in compatibility mode.
            browser = 4 /* IE */;
        }
        else if (match = /trident.*rv:(\d+)([\d.]*)/.exec(userAgent)) {
            // This is IE 11. Sample user agent contains:
            // Trident/7.0; other stuff... rv:11.0
            browser = 4 /* IE */;
        }
        else if (match = /edge\/(\d+)([\d.]*)/.exec(userAgent)) {
            // This is Edge (it pretends to be Chrome and Safari).
            browser = 2 /* Edge */;
        }
        else if (match = /edg\/(\d+)([\d.]*)/.exec(userAgent)) {
            // This is Edge Chromium.
            browser = 6 /* EdgeChromium */;
        }
        else if (match = /(?:firefox|fxios)\/(\d+)([\d.]*)/.exec(userAgent)) {
            browser = 3 /* Firefox */;
        }
        else if (match = /(?:chrome|crios)\/(\d+)([\d.]*)/.exec(userAgent)) {
            // Note: lots of random browsers say they're Chrome and will end up in this bucket
            browser = 1 /* Chrome */;
        }
        else if (match = /safari\/(\d+)/.exec(userAgent)) {
            browser = 5 /* Safari */;
            match = /version\/(\d+)([\d.]*)/.exec(userAgent);
        }
        // Some other browser categories:
        //   IE Mobile: /iemobile\/(\d+)/
        //   IE Mobile in desktop mode: contains WPDesktop; get version from Trident version
        //   Opera (currently goes into Chrome bucket): /opr\/(\d+)/
        // Parse the captured version number for user's browser.
        if (match) {
            var browserMajor = parseInt(match[1], 10) || 0;
            var browserMinor = '0';
            var browserMinorVersion = match[2];
            if (browserMinorVersion) {
                var minorStart = browserMinorVersion.indexOf('.');
                if (minorStart >= 0 && minorStart < browserMinorVersion.length - 1) {
                    browserMinor = browserMinorVersion.substr(minorStart + 1);
                }
            }
            browserVersion = _Version__WEBPACK_IMPORTED_MODULE_0__["default"].parse(browserMajor + "." + browserMinor);
        }
        browserInfo.browser = browser;
        browserInfo.browserVersion = browserVersion;
        return browserInfo;
    };
    BrowserDetection.fillOS = function (browserInfo, userAgent) {
        var os = 0 /* Other */;
        var osVersion = undefined;
        // OS versions comes first as some UserAgents override the version for mismatching Windows versions (7, 8.1)
        var osVersionMatch = /[\s\(](os|os x|windows phone|windows nt|android) ([\d._]+)/.exec(userAgent);
        osVersion = osVersionMatch ? osVersionMatch[2] : undefined;
        // Parse device which gives hints about os / mobile state.
        // Windows Phone IE sometimes pretends to be Android, so explicitly check for Windows Phone first.
        // (wpdesktop is used by Windows Phone in desktop mode.)
        var deviceMatch = userAgent.match(/windows phone|wpdesktop/) || userAgent.match(/ipad|iphone|ipod|android/);
        if (deviceMatch) {
            var device = deviceMatch[0];
            if (device === 'windows phone' || device === 'wpdesktop') {
                os = 6 /* WindowsPhone */;
            }
            if (device === 'android') {
                os = 1 /* Android */;
            }
            if (device === 'ipad' || device === 'ipod' || device === 'iphone') {
                os = 2 /* IOS */;
            }
        }
        else {
            if (userAgent.indexOf('macintosh') !== -1) {
                os = 4 /* Mac */;
            }
            if (userAgent.indexOf('windows nt') !== -1) {
                os = 5 /* Windows */;
            }
            if (/(windows 8\.1|windows nt 6\.3)/.test(userAgent)) {
                os = 5 /* Windows */;
                osVersion = '8.1';
            }
            if (userAgent.indexOf('windows nt 10') !== -1) {
                os = 5 /* Windows */;
                osVersion = '10';
            }
            if (userAgent.indexOf('windows nt 6.1') !== -1) {
                os = 5 /* Windows */;
                osVersion = '7';
            }
        }
        browserInfo.os = os;
        browserInfo.osVersion = osVersion;
        return browserInfo;
    };
    return BrowserDetection;
}());
/* harmony default export */ __webpack_exports__["default"] = (BrowserDetection);


/***/ })

/******/ })}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));;


/***/ }),

/***/ "@microsoft/sp-lodash-subset":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_lodash_subset__;

/***/ })

/******/ })});;
//# sourceMappingURL=sp-core-library_en-us.js.map