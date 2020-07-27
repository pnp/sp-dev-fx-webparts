define("1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8_1.11.0", ["@microsoft/sp-core-library","@microsoft/sp-diagnostics","@microsoft/sp-dynamic-data"], function(__WEBPACK_EXTERNAL_MODULE__microsoft_sp_core_library__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_diagnostics__, __WEBPACK_EXTERNAL_MODULE__microsoft_sp_dynamic_data__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./sp-page-context.js");
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
    "_/GZrHjuQO4erDQbBRI2XSA": {
      "ddpSiteDataTitle": "Site properties",
      "ddpUserDataTitle": "Current user information",
      "ddpUrlDataTitle": "Query string",
      "ddvUserName": "User name",
      "ddvUserNameDesc": "The name of the user",
      "ddvUserEmail": "User email",
      "ddvUserEmailDesc": "The email of the current user",
      "ddvUserLogin": "Login name",
      "ddvUserLoginDesc": "The name that the user logged in with",
      "ddvSiteUrl": "Site link",
      "ddvSiteUrlDesc": "The URL of the current site",
      "ddvSiteCollectionUrl": "Site collection link",
      "ddvSiteCollectionUrlDesc": "The URL of the current site collection",
      "ddvListUrl": "List link",
      "ddvListUrlDesc": "The URL of the current list",
      "ddvItemId": "Item id",
      "ddvItemIdDesc": "The id of the current item",
      "ddvSiteClassification": "Site classification",
      "ddvSiteClassificationDesc": "The classification of the current site",
      "ddvSiteTitle": "Site title",
      "ddvSiteTitleDesc": "The title of the current site",
      "ddvSiteDescription": "Site description",
      "ddvSiteDescriptionDesc": "The description of the current site",
      "ddvSiteLogoUrl": "Site logo",
      "ddvSiteLogoUrlDesc": "The URL of the site logo",
      "ddvQueryParameters": "Query parameters",
      "ddvQueryParametersDesc": "The different query strings that are on the current URL",
      "ddvFragment": "URL fragment",
      "ddvFragmentDesc": "The part of the current URL that is after the #",
      "ddpSearchDataTitle": "Search",
      "ddvSearchQuery": "Search query",
      "ddvSearchQueryDesc": "The query used to get search results"
    }
  };

  strings.default = strings;
  return strings;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sp-page-context.js":
/*!****************************!*\
  !*** ./sp-page-context.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! @microsoft/sp-dynamic-data */ "@microsoft/sp-dynamic-data"),__webpack_require__(/*! @microsoft/sp-core-library */ "@microsoft/sp-core-library"),__webpack_require__(/*! @microsoft/sp-diagnostics */ "@microsoft/sp-diagnostics"),__webpack_require__(/*! resx-strings */ "../lib/resx-strings/en-us.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(__WEBPACK_EXTERNAL_MODULE__84nK__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_vpy3__) { return /******/ (function(modules) { // webpackBootstrap
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

/***/ "6ZP6":
/*!***********************!*\
  !*** ./lib/SPUser.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SPTimeZone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SPTimeZone */ "PL7Z");


/**
  * This class is primarily used with the `PageContext` class.  It provides contextual information
  * for the SharePoint user that is accessing the page.
  *
  * @public
  */
var SPUser = /** @class */ (function () {
    /**
     * @internal
     */
    function SPUser(data) {
        this._validate(data);
        this._displayName = data.displayName || '';
        this._email = data.email || '';
        this._isAnonymousGuestUser = data.isAnonymousGuestUser;
        this._isExternalGuestUser = data.isExternalGuestUser;
        this._loginName = data.loginName || '';
        // Remove the or statement when changes reach Prod everywhere.
        this._preferUserTimeZone = data.preferUserTimeZone || false;
        this._timeZone = data.timeZoneInfo ?
            new _SPTimeZone__WEBPACK_IMPORTED_MODULE_1__["default"](data.timeZoneInfo) : undefined;
        this._firstDayOfWeek = data.firstDayOfWeek;
    }
    /**
     * Returns a JSON serializable object.
     * @internal
     */
    SPUser.prototype._serialize = function () {
        return {
            loginName: this.loginName,
            displayName: this.displayName,
            email: this.email,
            isAnonymousGuestUser: this.isAnonymousGuestUser,
            firstDayOfWeek: this.firstDayOfWeek,
            isExternalGuestUser: this.isExternalGuestUser,
            preferUserTimeZone: this.preferUserTimeZone
        };
    };
    Object.defineProperty(SPUser.prototype, "displayName", {
        /**
         * The display name for the current user.
         *
         * @remarks
         * Example: `"John Doe"`
         */
        get: function () {
            return this._displayName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPUser.prototype, "email", {
        /**
         * The email address for the current user.
         *
         * @remarks
         * Example: `"example@contoso.com"`
         */
        get: function () {
            return this._email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPUser.prototype, "isAnonymousGuestUser", {
        /**
         * Returns if the current user is an anonymous guest.
         */
        get: function () {
            return this._isAnonymousGuestUser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPUser.prototype, "isExternalGuestUser", {
        /**
         * Returns true if the current user is an external guest.
         */
        get: function () {
            return this._isExternalGuestUser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPUser.prototype, "loginName", {
        /**
         * The login name for current user.
         *
         * @remarks
         * Example: on-premise user: `"domain\user"`, online user: `"user@domain.com"`
         */
        get: function () {
            return this._loginName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPUser.prototype, "preferUserTimeZone", {
        /**
         * This boolean represents if a the user or web's time zone settings should be used
         * to display the current time.
         */
        get: function () {
            return this._preferUserTimeZone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPUser.prototype, "timeZoneInfo", {
        /**
         * Returns the user's regional timezone settings or undefined if they haven't been set.
         *
         * @beta
         */
        get: function () {
            return this._timeZone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPUser.prototype, "firstDayOfWeek", {
        /**
         * Returns the user's regional first day of week setting or undefined if it hasn't been set.
         *
         * @beta
         */
        get: function () {
            // @todo VSO#490622: Consider better API structure to avoid confusing user with return value of undefined.
            return this._firstDayOfWeek;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Function that throws an exception if an ISPUserData object or its parameters are
     * null or undefined.
     *
     * @param data - Data used to construct an ISPUserData object
     */
    SPUser.prototype._validate = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data, 'ISPUserData object');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.isAnonymousGuestUser, 'isAnonymousGuestUser');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.isExternalGuestUser, 'isExternalGuestUser');
    };
    return SPUser;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPUser);


/***/ }),

/***/ "84nK":
/*!*********************************************!*\
  !*** external "@microsoft/sp-dynamic-data" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__84nK__;

/***/ }),

/***/ "CRGG":
/*!***********************!*\
  !*** ./lib/SPList.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SPPermission__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SPPermission */ "W9Pz");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);


/**
  * This class is primarily used with the `PageContext` class.  It provides contextual
  * information for the SharePoint list that hosts the page.
  *
  * @public
  */
var SPList = /** @class */ (function () {
    /**
     * @internal
     */
    function SPList(data) {
        this._validate(data);
        this._id = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].parse(data.id);
        this._permissions = new _SPPermission__WEBPACK_IMPORTED_MODULE_0__["default"](data.permissions);
        this._serverRelativeUrl = data.serverRelativeUrl;
        this._title = data.title;
    }
    /**
     * Returns a JSON serializable object.
     * @internal
     */
    SPList.prototype._serialize = function () {
        return {
            id: this.id.toString(),
            title: this.title,
            permissions: this.permissions._serialize(),
            serverRelativeUrl: this.serverRelativeUrl
        };
    };
    Object.defineProperty(SPList.prototype, "id", {
        /**
         * The GUID that identifies the SPList on the server. This property could be undefined
         * if the information isn't available.
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPList.prototype, "permissions", {
        /**
         * Return the SPPermission object that represents the set of permissions that the
         * current user has for interacting with the list.
         */
        get: function () {
            return this._permissions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPList.prototype, "serverRelativeUrl", {
        /**
         * Returns the server-relative URL for this `SPList`.
         *
         * @remarks
         * Example: "/sites/PubSite"
         */
        get: function () {
            return this._serverRelativeUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPList.prototype, "title", {
        /**
         * Returns the title for this `SPList`.
         */
        get: function () {
            return this._title;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Function that throws an exception if an `ISPListData` object or its parameters are
     * null or undefined.
     *
     * @param data - Data used to construct an `ISPListData` object
     */
    SPList.prototype._validate = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(data, 'ISPListData object');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(data.baseTemplate, 'baseTemplate');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].tryParse(data.id), 'id');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(data.permissions, 'permissions');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(data.serverRelativeUrl, 'serverRelativeUrl');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(data.title, 'title');
    };
    return SPList;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPList);


/***/ }),

/***/ "GLAT":
/*!*************************************!*\
  !*** ./lib/O365GroupAssociation.js ***!
  \*************************************/
/*! exports provided: O365GroupAssociationType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "O365GroupAssociationType", function() { return O365GroupAssociationType; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

/**
 * {@inheritDoc  O365GroupAssociation."type"}
 * @alpha
 */
var O365GroupAssociationType;
(function (O365GroupAssociationType) {
    O365GroupAssociationType[O365GroupAssociationType["Unknown"] = 0] = "Unknown";
    O365GroupAssociationType[O365GroupAssociationType["Private"] = 1] = "Private";
    O365GroupAssociationType[O365GroupAssociationType["Public"] = 2] = "Public";
})(O365GroupAssociationType || (O365GroupAssociationType = {}));
/**
  * This class is primarily used with the `PageContext` class. If the site is associated with an O365
  * group, this object provides contextual information about the group.
  *
  * @alpha
  */
var O365GroupAssociation = /** @class */ (function () {
    /**
     * @internal
     */
    function O365GroupAssociation(data) {
        this._validate(data);
        this._id = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(data.id);
        switch (data.type) {
            case 'Private':
                this._type = O365GroupAssociationType.Private;
                break;
            case 'Public':
                this._type = O365GroupAssociationType.Public;
                break;
            default:
                this._type = O365GroupAssociationType.Unknown;
                break;
        }
    }
    /**
     * Returns a JSON serializable object.
     * @internal
     */
    O365GroupAssociation.prototype._serialize = function () {
        return {
            id: this.id.toString(),
            type: this.type
        };
    };
    Object.defineProperty(O365GroupAssociation.prototype, "id", {
        /**
         * The GUID associated with the site's O365 Group.
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(O365GroupAssociation.prototype, "type", {
        /**
         * This enum identifies if the associated O365 Group private or public or unknown.
         */
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Function that throws an exception if an IO365GroupAssociationData object or its parameters are
     * null or undefined.
     *
     * @param data - Data used to construct an IO365GroupAssociationData object
     */
    O365GroupAssociation.prototype._validate = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data, 'IO365GroupData object');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.id, 'data.id');
    };
    return O365GroupAssociation;
}());
/* harmony default export */ __webpack_exports__["default"] = (O365GroupAssociation);


/***/ }),

/***/ "GPn3":
/*!***************************!*\
  !*** ./lib/SPListItem.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

/**
  * This class is primarily used with the `PageContext` class.  It provides contextual
  * information for the SharePoint list item that hosts the page.
  *
  * @public
  */
var SPListItem = /** @class */ (function () {
    /**
     * @internal
     */
    function SPListItem(data) {
        this._validate(data);
        this._id = data.id;
    }
    /**
     * Returns a JSON serializable object.
     * @internal
     */
    SPListItem.prototype._serialize = function () {
        return {
            id: this.id
        };
    };
    Object.defineProperty(SPListItem.prototype, "id", {
        /**
         * The number that identifies the `SPListItem` on the server.
         *
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Function that throws an exception if an `ISPListItemData` object or its parameters are
     * null or undefined.
     *
     * @param data - Data used to construct an `ISPListItemData` object
     */
    SPListItem.prototype._validate = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data, 'ISPListItemData object');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.id, 'id');
    };
    return SPListItem;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPListItem);


/***/ }),

/***/ "JRdv":
/*!**************************************************************!*\
  !*** ./lib/pageManager/SharePointPageContextDataProvider.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
  * The page context represents contextual information about the SharePoint page that
  * is currently being viewed, such as its site URL, the client-side application ID,
  * the current user, etc.  The page context objects themselves represent key information
  * that is needed e.g. to identify the site/web/list/listitem in a REST service call,
  * but it is not a full cache with invalidation and change notifications.

  * @alpha
  */
var SharePointPageContextDataProvider = /** @class */ (function () {
    function SharePointPageContextDataProvider() {
    }
    /**
     * Populates the webPart pageContext using the data from the app Page Context. AppPageContext
     * must be populated already.
     * @internal
     */
    SharePointPageContextDataProvider._createPageContextData = function (spPageContextInfo) {
        var pageContextData = {
            aadInfo: !!spPageContextInfo.aadInstanceUrl && !!spPageContextInfo.aadTenantId &&
                !!spPageContextInfo.aadUserId ? {
                instanceUrl: spPageContextInfo.aadInstanceUrl,
                tenantId: spPageContextInfo.aadTenantId,
                userId: spPageContextInfo.aadUserId
            } : undefined,
            cultureInfo: {
                currentCultureName: spPageContextInfo.currentCultureName,
                currentUICultureName: spPageContextInfo.currentUICultureName,
                isRightToLeft: document.documentElement.dir === 'rtl' ?
                    true :
                    false
            },
            list: spPageContextInfo.listId && spPageContextInfo.listId !== '' ? {
                baseTemplate: spPageContextInfo.listBaseTemplate,
                id: spPageContextInfo.listId,
                permissions: spPageContextInfo.listPermsMask,
                serverRelativeUrl: spPageContextInfo.listUrl,
                title: spPageContextInfo.listTitle
            } : undefined,
            listItem: spPageContextInfo.pageItemId && spPageContextInfo.pageItemId !== -1 ? {
                id: spPageContextInfo.pageItemId
            } : undefined,
            page: spPageContextInfo.socialBarEnabled ? {
                socialBarEnabled: spPageContextInfo.socialBarEnabled
            } : {},
            site: {
                absoluteUrl: spPageContextInfo.siteAbsoluteUrl,
                cdnPrefix: spPageContextInfo.cdnPrefix,
                classification: spPageContextInfo.siteClassification,
                correlationId: spPageContextInfo.CorrelationId,
                group: spPageContextInfo.groupId && spPageContextInfo.groupId !== '' ? {
                    id: spPageContextInfo.groupId,
                    type: spPageContextInfo.groupType
                } : undefined,
                id: spPageContextInfo.siteId,
                isNoScriptEnabled: spPageContextInfo.isNoScriptEnabled,
                recycleBinItemCount: spPageContextInfo.RecycleBinItemCount,
                serverRelativeUrl: spPageContextInfo.siteServerRelativeUrl,
                serverRequestPath: spPageContextInfo.serverRequestPath,
                sitePagesEnabled: spPageContextInfo.sitePagesEnabled
            },
            user: {
                isAnonymousGuestUser: spPageContextInfo.isAnonymousGuestUser,
                isExternalGuestUser: spPageContextInfo.isExternalGuestUser,
                displayName: spPageContextInfo.userDisplayName,
                email: spPageContextInfo.userEmail,
                loginName: spPageContextInfo.userLoginName,
                preferUserTimeZone: spPageContextInfo.preferUserTimeZone,
                timeZoneInfo: spPageContextInfo.userTimeZoneData ? {
                    daylightDate: spPageContextInfo.userTimeZoneData.DaylightDate,
                    daylightOffset: spPageContextInfo.userTimeZoneData.DaylightBias,
                    description: spPageContextInfo.userTimeZoneData.Description,
                    id: spPageContextInfo.userTimeZoneData.Id,
                    offset: spPageContextInfo.userTimeZoneData.Bias,
                    standardDate: spPageContextInfo.userTimeZoneData.StandardDate,
                    standardOffset: spPageContextInfo.userTimeZoneData.StandardBias
                } : undefined,
                // Server returns null if firstDayOfWeek setting is not configured or user doesn't have permission to access.
                firstDayOfWeek: typeof spPageContextInfo.userFirstDayOfWeek === 'number'
                    ? spPageContextInfo.userFirstDayOfWeek : undefined
            },
            web: {
                absoluteUrl: spPageContextInfo.webAbsoluteUrl,
                id: spPageContextInfo.webId,
                isAppWeb: spPageContextInfo.isAppWeb,
                language: spPageContextInfo.webLanguage,
                languageName: spPageContextInfo.webLanguageName,
                logoUrl: spPageContextInfo.webLogoUrl,
                permissions: spPageContextInfo.webPermMasks,
                serverRelativeUrl: spPageContextInfo.webServerRelativeUrl,
                templateName: spPageContextInfo.webTemplate,
                description: spPageContextInfo.webDescription,
                timeZoneInfo: spPageContextInfo.webTimeZoneData ? {
                    daylightDate: spPageContextInfo.webTimeZoneData.DaylightDate,
                    daylightOffset: spPageContextInfo.webTimeZoneData.DaylightBias,
                    description: spPageContextInfo.webTimeZoneData.Description,
                    id: spPageContextInfo.webTimeZoneData.Id,
                    offset: spPageContextInfo.webTimeZoneData.Bias,
                    standardDate: spPageContextInfo.webTimeZoneData.StandardDate,
                    standardOffset: spPageContextInfo.webTimeZoneData.StandardBias
                } : undefined,
                // Server returns null if firstDayOfWeek setting is not configured or user doesn't have permission to access.
                firstDayOfWeek: typeof spPageContextInfo.webFirstDayOfWeek === 'number'
                    ? spPageContextInfo.webFirstDayOfWeek : undefined,
                title: spPageContextInfo.webTitle
            },
            featureInfo: spPageContextInfo.featureInfo
        };
        pageContextData.site.sitePagesFeatureVersion = spPageContextInfo.sitePagesFeatureVersion;
        return pageContextData;
    };
    return SharePointPageContextDataProvider;
}());
/* harmony default export */ __webpack_exports__["default"] = (SharePointPageContextDataProvider);


/***/ }),

/***/ "JhOW":
/*!************************!*\
  !*** ./lib/SPField.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);


/**
 * A field represents the data model for a column in SharePoint list view.
 * @remarks
 *
 * This is the client-side equivalent for SharePoint `SPField` class. It is used with the
 * `@microsoft/sp-listview-extensibility` package.
 *
 * @public
 */
var SPField = /** @class */ (function () {
    /**
     * @internal
     */
    function SPField(data) {
        this._validate(data);
        this._id = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(data.id);
        this._internalName = data.internalName || '';
        this._fieldType = data.fieldType || '';
        this._required = data.isRequired;
        this._displayName = data.displayName || '';
        this._clientSideComponentId = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(data.clientSideComponentId);
        this._clientSideComponentProperties = data.clientSideComponentProperties || '';
    }
    Object.defineProperty(SPField.prototype, "id", {
        /**
         * The GUID identifier for this field.
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPField.prototype, "internalName", {
        /**
         * The internal name of the field. This name is usually used to find the field.
         */
        get: function () {
            return this._internalName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPField.prototype, "fieldType", {
        /**
         * The type of the field represented as a string
         */
        get: function () {
            return this._fieldType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPField.prototype, "isRequired", {
        /**
         * Whether the field is required for each list item in the list
         */
        get: function () {
            return this._required;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPField.prototype, "displayName", {
        /**
         * The display name of the field. This name is shown as column name in UI.
         */
        get: function () {
            return this._displayName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPField.prototype, "clientSideComponentId", {
        /**
         * The unique identifier of the client-side component associated with the field.
         */
        get: function () {
            return this._clientSideComponentId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPField.prototype, "clientSideComponentProperties", {
        /**
         * This property is only used when a `ClientSideComponentId` is specified.  It is optional.
         *
         * @remarks
         * If non-empty, the string must contain a JSON object with custom initialization properties
         * whose format and meaning are defined by the client-side component.
         */
        get: function () {
            return this._clientSideComponentProperties;
        },
        enumerable: true,
        configurable: true
    });
    SPField.prototype._validate = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data, 'ISPFieldData object');
        // ...
    };
    return SPField;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPField);


/***/ }),

/***/ "L14d":
/*!****************************!*\
  !*** ./lib/CultureInfo.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

/**
  * This class is primarily used with the `PageContext` class.  It provides culture info
  * for the current user of the application.
  *
  * @public
  */
var CultureInfo = /** @class */ (function () {
    /**
      * @internal
      */
    function CultureInfo(data) {
        this._validate(data);
        this._currentCultureName = data.currentCultureName;
        this._currentUICultureName = data.currentUICultureName;
        this._isRightToLeft = data.isRightToLeft;
    }
    /**
     * Returns a JSON serializable object.
     * @internal
     */
    CultureInfo.prototype._serialize = function () {
        return {
            currentCultureName: this.currentCultureName,
            currentUICultureName: this.currentUICultureName,
            isRightToLeft: this.isRightToLeft
        };
    };
    Object.defineProperty(CultureInfo.prototype, "currentCultureName", {
        /**
         * This string determines the language default format for dates, times, numbers, currency values,
         * the sorting order of text, casing conventions, and string comparisons.
         *
         * @remarks
         *
         * This property may be an empty string, but it will never be undefined.
         *
         * Example: If the currentCultureName is `"en-AU"` then the application could use this information
         * to display the date as 1/8 instead of 8/1.
         */
        get: function () {
            return this._currentCultureName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CultureInfo.prototype, "currentUICultureName", {
        /**
         * This string determines the default user interface language. This used for localization and
         * translation of text.
         *
         * @remarks
         * This property may have an empty string, but will never be undefined.
         *
         * Example: If the currentUICultureName is `"es-MX"`, then the application could use this
         * information to translate the word "hello" to "hola".
         */
        get: function () {
            return this._currentUICultureName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CultureInfo.prototype, "isRightToLeft", {
        /**
         * This boolean represents the dominant direction of written text for the default user
         * interface language.
         */
        get: function () {
            return this._isRightToLeft;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Function that throws an exception if an ICultureInfoData object or its parameters are
     * null or undefined.
     *
     * @param data - Data used to construct an ICultureInfoData object
     */
    CultureInfo.prototype._validate = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data, 'ICultureInfoData object');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.currentCultureName, 'currentCultureName');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.currentUICultureName, 'currentUICultureName');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.isRightToLeft, 'isRightToLeft');
    };
    return CultureInfo;
}());
/* harmony default export */ __webpack_exports__["default"] = (CultureInfo);


/***/ }),

/***/ "PL7Z":
/*!***************************!*\
  !*** ./lib/SPTimeZone.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

/**
  * It provides timezone information from SharePoint. A conversion from UTC to local
  * time can be calculated by using the following formula.
  *
  * @remarks
  *
  * ```
  * isDaylightSavingsTime = isCurrentDate after DaylightSavingsDate but before the StandardDate
  * LocalTime = UTCTime - Offset - (isDaylightSavingsTime ? daylightOffset : standardOffset)
  * June 11, 2 A.M. PST = June 11, 9 A.M. - (480 minutes) - (-60  minutes)
  * ```
  *
  * @beta
  */
var SPTimeZone = /** @class */ (function () {
    /**
     * @internal
     */
    function SPTimeZone(data) {
        this._validate(data);
        this._daylightDate = data.daylightDate;
        this._daylightOffset = data.daylightOffset;
        this._description = data.description;
        this._id = data.id;
        this._offset = data.offset;
        this._standardDate = data.standardDate;
        this._standardOffset = data.standardOffset;
    }
    Object.defineProperty(SPTimeZone.prototype, "daylightDate", {
        /**
         * Gets the date on which daylight time begins for the time zone.
         */
        get: function () {
            return this._daylightDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPTimeZone.prototype, "daylightOffset", {
        /**
         * Gets the offset in the number of minutes that daylight time for the time zone differs
         * from Coordinated Universal Time (UTC).
         */
        get: function () {
            return this._daylightOffset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPTimeZone.prototype, "description", {
        /**
         * Gets the description for the time zone.
         */
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPTimeZone.prototype, "id", {
        /**
         * Gets the ID of the time zone.
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPTimeZone.prototype, "offset", {
        /**
         * Gets the offset in the number of minutes that the time zone differs from Coordinated
         * Universal Time (UTC).
         */
        get: function () {
            return this._offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPTimeZone.prototype, "standardDate", {
        /**
         * Gets the date on which standard time begins for the time zone.
         */
        get: function () {
            return this._standardDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPTimeZone.prototype, "standardOffset", {
        /**
         * Gets the offset in the number of minutes that standard time for the time zone differs
         * from coordinated universal time (UTC).
         */
        get: function () {
            return this._standardOffset;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Function that throws an exception if an ISPTimeZoneData object or its parameters are
     * null or undefined.
     *
     * @param data - Data used to construct an ISPTimeZoneData object
     */
    SPTimeZone.prototype._validate = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data, 'ISPTimeZoneData object');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.daylightDate, 'daylightDate');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.daylightOffset, 'daylightOffset');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.description, 'description');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.id, 'id');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.offset, 'offset');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.standardDate, 'standardDate');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.standardOffset, 'standardOffset');
    };
    return SPTimeZone;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPTimeZone);


/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "W9Pz":
/*!*****************************!*\
  !*** ./lib/SPPermission.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Used to test whether the current user has a requested set of permissions.
 *
 * @remarks
 *
 * Specifies the built-in permissions available in SharePoint Foundation
 *
 * For more information, see:
 * {@link https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spbasepermissions.aspx}
 *
 * @public
 */
var SPPermission = /** @class */ (function () {
    function SPPermission(value) {
        if (!value || value.High === undefined || value.Low === undefined) {
            throw new Error('Must use an object with a Low and High number value');
        }
        this._value = value;
    }
    /**
     * Returns a JSON serializable object.
     * @internal
     */
    SPPermission.prototype._serialize = function () {
        return {
            value: this.value
        };
    };
    Object.defineProperty(SPPermission.prototype, "value", {
        /**
         * Returns the value of this SPPermission object
         */
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Function for testing whether a given permission mask has any of the requested permissions.
     * @param requestedPerms - Any number of SPPermission objects to be compared against the original
     */
    SPPermission.prototype.hasAnyPermissions = function () {
        var _this = this;
        var requestedPerms = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            requestedPerms[_i] = arguments[_i];
        }
        return (requestedPerms || []).some(function (permission) {
            return _this.hasPermission(permission);
        });
    };
    /**
     * Function for testing whether a given permission mask has all of the requested permissions.
     * @param requestedPerms - Any number of SPPermission objects to be compared against the original
     */
    SPPermission.prototype.hasAllPermissions = function () {
        var _this = this;
        var requestedPerms = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            requestedPerms[_i] = arguments[_i];
        }
        return (requestedPerms || []).every(function (permission) {
            return _this.hasPermission(permission);
        });
    };
    /**
     * Function for testing whether a given permission mask has the requested permission.
     * @param requestedPerm - The SPPermission object to be compared against the original
     */
    SPPermission.prototype.hasPermission = function (requestedPerm) {
        /* tslint:disable:no-bitwise */
        return requestedPerm &&
            ((requestedPerm.value.Low & this.value.Low) === requestedPerm.value.Low) &&
            ((requestedPerm.value.High & this.value.High) === requestedPerm.value.High);
        /* tslint:enable:no-bitwise */
    };
    /**
     * Has no permissions on the Web site. Not available through the user interface.
     */
    SPPermission.emptyMask = new SPPermission({ High: 0x0, Low: 0x0 });
    // list/document perms  =0x000000000000XXXX
    /**
     * View items in lists, documents in document libraries, and view Web discussion comments.
     */
    SPPermission.viewListItems = new SPPermission({ High: 0x0, Low: 0x1 });
    /**
     * Add items to lists, add documents to document libraries, and add Web discussion comments.
     */
    SPPermission.addListItems = new SPPermission({ High: 0x0, Low: 0x2 });
    /**
     * Edit items in lists, edit documents in document libraries, edit Web discussion comments in documents,
     * and customize web part Pages in document libraries.
     */
    SPPermission.editListItems = new SPPermission({ High: 0x0, Low: 0x4 });
    /**
     * Delete items from a list, documents from a document library, and Web discussion comments in documents.
     */
    SPPermission.deleteListItems = new SPPermission({ High: 0x0, Low: 0x8 });
    /**
     * Approve a minor version of a list item or document.
     */
    SPPermission.approveItems = new SPPermission({ High: 0x0, Low: 0x10 });
    /**
     * View the source of documents with server-side file handlers.
     */
    SPPermission.openItems = new SPPermission({ High: 0x0, Low: 0x20 });
    /**
     * View past versions of a list item or document.
     */
    SPPermission.viewVersions = new SPPermission({ High: 0x0, Low: 0x40 });
    /**
     * Delete past versions of a list item or document.
     */
    SPPermission.deleteVersions = new SPPermission({ High: 0x0, Low: 0x80 });
    /**
     * Discard or check in a document which is checked out to another user.
     */
    SPPermission.cancelCheckout = new SPPermission({ High: 0x0, Low: 0x100 });
    /**
     * Create, change, and delete personal views of lists.
     */
    SPPermission.managePersonalViews = new SPPermission({ High: 0x0, Low: 0x200 });
    /**
     * Create and delete lists, add or remove columns in a list, and add or remove public views of a list.
     */
    SPPermission.manageLists = new SPPermission({ High: 0x0, Low: 0x800 });
    /**
     * View forms, views, and application pages, and enumerate lists.
     */
    SPPermission.viewFormPages = new SPPermission({ High: 0x0, Low: 0x1000 });
    // web level perms      =0x0000XXXXXXXX0000,
    /**
     * Allow users to open a Web site, list, or folder to access items inside that container.
     */
    SPPermission.open = new SPPermission({ High: 0x0, Low: 0x20000 });
    /**
     * View pages in a Web site.
     */
    SPPermission.viewPages = new SPPermission({ High: 0x0, Low: 0x20000 });
    /**
     * View the layouts page?
     */
    SPPermission.layoutsPage = new SPPermission({ High: 0x0, Low: 0x21000 });
    /**
     * Add, change, or delete HTML pages or web part Pages, and edit the Web site using a SharePoint
     * Foundation–compatible editor.
     */
    SPPermission.addAndCustomizePages = new SPPermission({ High: 0x0, Low: 0x40000 });
    /**
     * Apply a theme or borders to the entire Web site.
     */
    SPPermission.applyThemeAndBorder = new SPPermission({ High: 0x0, Low: 0x80000 });
    /**
     * Apply a style sheet (.css file) to the Web site.
     */
    SPPermission.applyStyleSheets = new SPPermission({ High: 0x0, Low: 0x100000 });
    /**
     * View reports on Web site usage.
     */
    SPPermission.viewUsageData = new SPPermission({ High: 0x0, Low: 0x200000 });
    /**
     * Create a Web site using Self-Service Site Creation.
     */
    SPPermission.createSSCSite = new SPPermission({ High: 0x0, Low: 0x400000 });
    /**
     * Create subsites such as team sites, Meeting Workspace sites, and Document Workspace sites.
     */
    SPPermission.manageSubwebs = new SPPermission({ High: 0x0, Low: 0x800000 });
    /**
     * Create a group of users that can be used anywhere within the site collection.
     */
    SPPermission.createGroups = new SPPermission({ High: 0x0, Low: 0x1000000 });
    /**
     * Create and change permission levels on the Web site and assign permissions to users and groups.
     */
    SPPermission.managePermissions = new SPPermission({ High: 0x0, Low: 0x2000000 });
    /**
     * Enumerate files and folders in a Web site using Microsoft Office SharePoint Designer 2007 and WebDAV interfaces.
     */
    SPPermission.browseDirectories = new SPPermission({ High: 0x0, Low: 0x4000000 });
    /**
     * View information about users of the Web site.
     */
    SPPermission.browserUserInfo = new SPPermission({ High: 0x0, Low: 0x8000000 });
    /**
     * Add or remove personal web parts on a web part Page.
     */
    SPPermission.addDelPrivateWebParts = new SPPermission({ High: 0x0, Low: 0x10000000 });
    /**
     * Update web parts to display personalized information.
     */
    SPPermission.updatePersonalWebParts = new SPPermission({ High: 0x0, Low: 0x20000000 });
    /**
     * Grant the ability to perform all administration tasks for the Web site as well as manage content.
     *
     * @remarks
     * Activate, deactivate, or edit properties of Web site scoped Features through the object model or
     * through the user interface (UI). When granted on the root Web site of a site collection, activate,
     * deactivate, or edit properties of site collection scoped Features through the object model. To
     * browse to the Site Collection Features page and activate or deactivate site collection scoped
     * Features through the UI, you must be a site collection administrator.
     */
    SPPermission.manageWeb = new SPPermission({ High: 0x0, Low: 0x40000000 });
    /**
     * Use features that launch client applications; otherwise, users must work on documents locally and upload changes.
     */
    SPPermission.useClientIntegration = new SPPermission({ High: 0x10, Low: 0x0 });
    /**
     * Use SOAP, WebDAV, or Microsoft Office SharePoint Designer 2007 interfaces to access the Web site.
     */
    SPPermission.useRemoteAPIs = new SPPermission({ High: 0x20, Low: 0x0 });
    /**
     * Manage alerts for all users of the Web site.
     */
    SPPermission.manageAlerts = new SPPermission({ High: 0x40, Low: 0x0 });
    /**
     * Create e-mail alerts.
     */
    SPPermission.createAlerts = new SPPermission({ High: 0x80, Low: 0x0 });
    /**
     * Allows a user to change his or her user information, such as adding a picture.
     */
    SPPermission.editMyUserInfo = new SPPermission({ High: 0x100, Low: 0x0 });
    /**
     * Enumerate permissions on the Web site, list, folder, document, or list item.
     */
    SPPermission.enumeratePermissions = new SPPermission({ High: 0x40000000, Low: 0x0 });
    /**
     * Has all permissions on the Web site. Not available through the user interface.
     */
    SPPermission.fullMask = new SPPermission({ High: 0x7FFFFFFF, Low: 0xFFFFFFFF });
    return SPPermission;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPPermission);


/***/ }),

/***/ "ZcDP":
/*!*****************************************!*\
  !*** ./lib/AzureActiveDirectoryInfo.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

/**
  * This class is primarily used with the `PageContext` class. It provides information
  * useful for communicating with Azure Active Directory.
  *
  * @alpha
  */
var AzureActiveDirectoryInfo = /** @class */ (function () {
    /**
      * @internal
      */
    function AzureActiveDirectoryInfo(data) {
        this._validate(data);
        this._instanceUrl = data.instanceUrl ? data.instanceUrl : '';
        this._tenantId = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(data.tenantId);
        this._userId = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(data.userId);
    }
    /**
     * Returns a JSON serializable object.
     * @internal
     */
    AzureActiveDirectoryInfo.prototype._serialize = function () {
        return {
            tenantId: this.tenantId.toString(),
            userId: this.userId.toString(),
            instanceUrl: this.instanceUrl
        };
    };
    Object.defineProperty(AzureActiveDirectoryInfo.prototype, "instanceUrl", {
        /**
         * This string returns the URL of the sign in page used to authenticate with Azure Active Directory.
         */
        get: function () {
            return this._instanceUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AzureActiveDirectoryInfo.prototype, "tenantId", {
        /**
         * This Guid contains the Azure Active Directory's tenant id.
         */
        get: function () {
            return this._tenantId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AzureActiveDirectoryInfo.prototype, "userId", {
        /**
         * This Guid contains the Azure Active Directory's user id.
         */
        get: function () {
            return this._userId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Function that throws an exception if an IAzureActiveDirectoryInfoParameters object or its parameters are
     * null, undefined, or an invalid guid.
     *
     * @param data - Data used to construct an IAzureActiveDirectoryInfoParameters object
     */
    AzureActiveDirectoryInfo.prototype._validate = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data, 'IAzureActiveDirectoryInfo object');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(data.tenantId), 'tenantId');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(data.userId), 'userId');
    };
    return AzureActiveDirectoryInfo;
}());
/* harmony default export */ __webpack_exports__["default"] = (AzureActiveDirectoryInfo);


/***/ }),

/***/ "cnM3":
/*!*********************!*\
  !*** ./lib/Page.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Exposes information that is associated with the SharePoint web page that is currently being displayed.
 *
 * @remarks
 * The Page object provides access to information that is scoped to the current SharePoint web page, but not
 * stored with the underlying SPListItem. Note that the {@link PageContext.listItem} may be undefined for
 * pages that are not based on a SharePoint list, whereas the PageContext.page will never be undefined.
 *
 * The concept of a "page" is subjective and defined by the router for a particular client-side application.
 *
 * @alpha
 */
var Page = /** @class */ (function () {
    /**
     * @internal
     */
    function Page(data) {
        this._validate(data);
        this._socialBarEnabled = data.socialBarEnabled || false;
    }
    Object.defineProperty(Page.prototype, "socialBarEnabled", {
        /**
         * Returns true if the Social Bar is enabled.
         *
         * @remarks
         * The Social Bar will appear on all modern SharePoint pages with the exception of the home page of a site.
         * It will give users the ability to like a page, see the number of views, likes, and comments on a page,
         * and see the people who have liked a page.
         */
        get: function () {
            return this._socialBarEnabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Function that throws an exception if an IPageData object or its required
     * parameters are null or undefined.
     *
     * @param data - Data used to construct a IPageData object
     */
    Page.prototype._validate = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data, 'IPage object');
    };
    return Page;
}());
/* harmony default export */ __webpack_exports__["default"] = (Page);


/***/ }),

/***/ "ed5A":
/*!****************************!*\
  !*** ./lib/PageContext.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-dynamic-data */ "84nK");
/* harmony import */ var _microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _AzureActiveDirectoryInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AzureActiveDirectoryInfo */ "ZcDP");
/* harmony import */ var _CultureInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CultureInfo */ "L14d");
/* harmony import */ var _SPList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SPList */ "CRGG");
/* harmony import */ var _SPListItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SPListItem */ "GPn3");
/* harmony import */ var _SPSite__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SPSite */ "qdg7");
/* harmony import */ var _SPUser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SPUser */ "6ZP6");
/* harmony import */ var _SPWeb__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SPWeb */ "swVP");
/* harmony import */ var _SPFeatureInfo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SPFeatureInfo */ "x7V9");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./loc/Strings.resx */ "qITA");












/**
 * The SharePoint page context object.
 *
 * @remarks
 * The page context provides standard definitions for common SharePoint objects
 * that need to be shared between the client-side application, web parts, and other
 * components.  Typically the data is fetched via REST queries when navigating to a
 * new page, but it can also be preloaded by the web server, or filled from a custom
 * application cache.

 * @public
 */
var PageContext = /** @class */ (function () {
    function PageContext(serviceScope) {
        var _this = this;
        this._urlParser = document.createElement('a');
        this._isInitialized = false;
        this._serviceScope = serviceScope;
        this._serviceScope.whenFinished(function () {
            // Create the page context data source:
            // Note that the Initialize function is called multiple times, and each time
            // we mark the datasource as having changed.
            _this._pageContextDataSource = new _microsoft_sp_dynamic_data__WEBPACK_IMPORTED_MODULE_2__["_PageContextDataSource"](serviceScope);
            _this._pageContextDataSource.addPropertyHandler({
                id: PageContext._pageContextInfoId,
                dynamicDataFunctions: {
                    getPropertyDefinitions: _this._getPropertyDefinitions.bind(_this),
                    getPropertyValue: _this._getPropertyValue.bind(_this),
                    getAnnotatedPropertyValue: _this._getAnnotatedPropertyValue.bind(_this),
                    allowedEvents: function () { return []; }
                }
            });
        });
        this._getPropertyValue = this._getPropertyValue.bind(this);
    }
    /**
     * Initializes the Page Context.
     * @internal
     */
    // tslint:disable-next-line:no-any
    PageContext.prototype.initialize = function (options, legacyPageContext) {
        var _this = this;
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(options, 'options');
        try {
            this._aadInfo = options.aadInfo ? new _AzureActiveDirectoryInfo__WEBPACK_IMPORTED_MODULE_3__["default"](options.aadInfo) : undefined;
            this._cultureInfo = new _CultureInfo__WEBPACK_IMPORTED_MODULE_4__["default"](options.cultureInfo);
            this._list = options.list ? new _SPList__WEBPACK_IMPORTED_MODULE_5__["default"](options.list) : undefined;
            this._listItem = options.listItem ? new _SPListItem__WEBPACK_IMPORTED_MODULE_6__["default"](options.listItem) : undefined;
            this._site = new _SPSite__WEBPACK_IMPORTED_MODULE_7__["default"](options.site);
            this._user = new _SPUser__WEBPACK_IMPORTED_MODULE_8__["default"](options.user);
            this._web = new _SPWeb__WEBPACK_IMPORTED_MODULE_9__["default"](options.web);
            this._spFeatureInfo = new _SPFeatureInfo__WEBPACK_IMPORTED_MODULE_10__["default"](options.featureInfo);
            this._legacyPageContext = legacyPageContext;
        }
        catch (e) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(PageContext._logSource, e, 'initialize');
            throw e;
        }
        this._serviceScope.whenFinished(function () {
            // The datasource was initialized in the constructor because this initialize method is
            // called numerous times.
            _this._pageContextDataSource.notifyPropertyChanged(PageContext._pageContextUserDynamicProperty);
            _this._pageContextDataSource.notifyPropertyChanged(PageContext._pageContextSiteDataDynamicProperty);
            _this._pageContextDataSource.notifyPropertyChanged(PageContext._pageContextUserDynamicProperty);
        });
        this._isInitialized = true;
    };
    /**
     * Returns a JSON serializable object.
     * @internal
     */
    PageContext.prototype._serialize = function () {
        return {
            aadInfo: this.aadInfo ? this.aadInfo._serialize() : undefined,
            cultureInfo: this.cultureInfo._serialize(),
            list: this.list ? this.list._serialize() : undefined,
            listItem: this.listItem ? this.listItem._serialize() : undefined,
            site: this.site._serialize(),
            user: this.user._serialize(),
            web: this.web._serialize(),
            _featureInfo: this._featureInfo._serialize()
        };
    };
    /**
     * Sets the search query value for the page context dynamic data.
     * Updating the value triggers a notification to dynamic data consumers for that property.
     *
     * @param searchQuery - Search query to set.
     * @internal
     */
    PageContext.prototype._setSearchQuery = function (searchQuery) {
        // If the value is the same, do not update. This avoids unnecessary callbacks for the same value.
        if (this._isSearchDynamicDataEnabled() && this._searchQuery !== searchQuery) {
            this._searchQuery = searchQuery;
            this._pageContextDataSource.notifyPropertyChanged(PageContext._pageContextSearchDataDynamicProperty);
        }
    };
    Object.defineProperty(PageContext.prototype, "aadInfo", {
        /**
         * Contextual information for communicating with Azure Active Directory.
         * If the current page doesn't have an associated Azure Active Directory tenant, this
         * property will be undefined.
         */
        get: function () {
            return this._aadInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageContext.prototype, "cultureInfo", {
        /**
         * It provides culture info for the current user of the application.
         * This class is primarily used with the `PageContext` class.
         */
        get: function () {
            return this._cultureInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageContext.prototype, "list", {
        /**
         * Contextual information for the SharePoint list that is hosting the page.
         * If there is no list associated to the current page, this property will be undefined.
         */
        get: function () {
            return this._list;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageContext.prototype, "listItem", {
        /**
         * Contextual information for the SharePoint list item that is hosting the page.
         * If there is no list item associated to the current page, this property will be undefined.
         */
        get: function () {
            return this._listItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageContext.prototype, "page", {
        /**
         * Exposes information that is associated with the SharePoint web page that is currently being displayed.
         * @alpha
         */
        get: function () {
            return this._page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageContext.prototype, "site", {
        /**
         * Contextual information for the SharePoint site collection ("SPSite") that is hosting the page.
         */
        get: function () {
            return this._site;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageContext.prototype, "user", {
        /**
         * It provides contextual information for the SharePoint user that is accessing the page.
         * This class is primarily used with the `PageContext` class.
         */
        get: function () {
            return this._user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageContext.prototype, "web", {
        /**
         * Contextual information for the SharePoint site ("SPWeb") that is hosting the page.
         */
        get: function () {
            return this._web;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageContext.prototype, "_featureInfo", {
        /**
         * Contextual information for the features that are enabled on the SharePoint site
         * that is hosting the page.
         * @internal
         */
        get: function () {
            return this._spFeatureInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageContext.prototype, "legacyPageContext", {
        /**
         * An object providing classic SharePoint properties that may be required by certain legacy scripts.
         *
         * @remarks
         * This property is provided to facilitate migration of legacy code. It returns a JavaScript
         * object whose contents are similar to the `_spPageContextInfo` window variable from classic pages.
         * The contents of this variable may change in future releases of SharePoint.  For this reason,
         * new projects are encouraged to use the SharePoint Framework TypeScript APIs instead, since they
         * are fully documented and provide reliable backwards compatibility guarantees.
         *
         * NOTE: If certain functionality is exposed in the `legacyPageContext` but does not seem to have
         * a proper TypeScript API, please file an issue on GitHub.  The intention is that no modern application
         * should need to rely on the `legacyPageContext` object.
         */
        // tslint:disable-next-line:no-any
        get: function () {
            return this._legacyPageContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageContext.prototype, "isInitialized", {
        /**
         * Returns whether the `PageContext` has been initialized.
         */
        get: function () {
            return this._isInitialized;
        },
        enumerable: true,
        configurable: true
    });
    PageContext.prototype._getPropertyDefinitions = function () {
        var properties = [
            {
                id: PageContext._pageContextSiteDataDynamicProperty,
                title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddpSiteDataTitle
            },
            {
                id: PageContext._pageContextUserDynamicProperty,
                title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddpUserDataTitle
            },
            {
                id: PageContext._pageContextUrlDataDynamicProperty,
                title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddpUrlDataTitle
            }
        ];
        if (this._isSearchDynamicDataEnabled()) {
            properties.push({
                id: PageContext._pageContextSearchDataDynamicProperty,
                title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddpSearchDataTitle
            });
        }
        return properties;
    };
    PageContext.prototype._getPropertyValue = function (propertyId) {
        switch (propertyId) {
            case PageContext._pageContextUserDynamicProperty:
                return {
                    userName: this.user.displayName,
                    userEmail: this.user.email,
                    userLogin: this.user.loginName
                };
            case PageContext._pageContextSiteDataDynamicProperty:
                return {
                    siteUrl: this.web.absoluteUrl,
                    siteCollectionUrl: this.site.absoluteUrl,
                    listUrl: document && document.location && this.list && document.location.origin + this.list.serverRelativeUrl,
                    itemId: this.listItem && this.listItem.id,
                    siteClassification: this.site.classification,
                    siteTitle: this.web.title,
                    siteDescription: this.web.description,
                    siteLogoUrl: document && document.location && document.location.origin + this.web.logoUrl
                };
            case PageContext._pageContextUrlDataDynamicProperty:
                return {
                    queryParameters: this._getUrlQueryParameterCollection(),
                    fragment: this._getUrlFragmentIdentifier()
                };
            case PageContext._pageContextSearchDataDynamicProperty:
                return this._isSearchDynamicDataEnabled()
                    ? {
                        searchQuery: this._searchQuery
                    }
                    : undefined;
            default:
                return undefined;
        }
    };
    PageContext.prototype._getAnnotatedPropertyValue = function (propertyId) {
        var propMetadata = {};
        switch (propertyId) {
            case PageContext._pageContextUserDynamicProperty:
                propMetadata = {
                    userName: {
                        title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvUserName,
                        description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvUserNameDesc
                    },
                    userEmail: {
                        title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvUserEmail,
                        description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvUserEmailDesc
                    },
                    userLogin: {
                        title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvUserLogin,
                        description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvUserLoginDesc
                    }
                };
                break;
            case PageContext._pageContextSiteDataDynamicProperty:
                propMetadata = {
                    siteUrl: {
                        title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvSiteUrl,
                        description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvSiteUrlDesc
                    },
                    siteCollectionUrl: {
                        title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvSiteCollectionUrl,
                        description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvSiteCollectionUrlDesc
                    },
                    listUrl: {
                        title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvListUrl,
                        description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvListUrlDesc
                    },
                    itemId: {
                        title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvItemId,
                        description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvItemIdDesc
                    },
                    siteClassification: {
                        title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvSiteClassification,
                        description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvSiteClassificationDesc
                    },
                    siteTitle: {
                        title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvSiteTitle,
                        description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvSiteTitleDesc
                    },
                    siteDescription: {
                        title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvSiteDescription,
                        description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvSiteDescriptionDesc
                    },
                    siteLogoUrl: {
                        title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvSiteLogoUrl,
                        description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvSiteLogoUrlDesc
                    }
                };
                break;
            case PageContext._pageContextUrlDataDynamicProperty:
                propMetadata = {
                    queryParameters: {
                        title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvQueryParameters,
                        description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvQueryParametersDesc
                    },
                    fragment: {
                        title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvFragment,
                        description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvFragmentDesc
                    }
                };
                break;
            case PageContext._pageContextSearchDataDynamicProperty:
                if (this._isSearchDynamicDataEnabled()) {
                    propMetadata = {
                        searchQuery: {
                            title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvSearchQuery,
                            description: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].ddvSearchQueryDesc
                        }
                    };
                }
                else {
                    propMetadata = {};
                }
                break;
        }
        return {
            sampleValue: this._getPropertyValue(propertyId),
            metadata: propMetadata
        };
    };
    /**
     * Returns decoded key-value pair collection for the current page's query parameters.
     *
     * @remarks
     * If the key or value doesn't exist, it adds an empty string instead.
     */
    PageContext.prototype._getUrlQueryParameterCollection = function () {
        this._urlParser.href = window.location.href;
        var queryParams = this._urlParser.search.substring(1).split('&');
        var queryParamCollection = {};
        for (var _i = 0, queryParams_1 = queryParams; _i < queryParams_1.length; _i++) {
            var queryParam = queryParams_1[_i];
            if (queryParam !== '') {
                var params = queryParam.split('=');
                queryParamCollection[decodeURIComponent(params[0])] = decodeURIComponent(params[1] || '');
            }
        }
        return queryParamCollection;
    };
    /**
     * Returns the fragment identifier for the current page's url.
     */
    PageContext.prototype._getUrlFragmentIdentifier = function () {
        this._urlParser.href = window.location.href;
        return this._urlParser.hash.substring(1); // removing '#' which is at the 0 index.
    };
    PageContext.prototype._isSearchDynamicDataEnabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1626 /* CSISearchQueryExtension */);
    };
    /**
     * The service key for PageContext.
     */
    PageContext.serviceKey = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["ServiceKey"].create('sp-page-context:PageContext', PageContext);
    PageContext._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('PageContext');
    PageContext._pageContextInfoId = 'PageContextInfoProperties';
    PageContext._pageContextUserDynamicProperty = 'UserData';
    PageContext._pageContextSiteDataDynamicProperty = 'SiteData';
    PageContext._pageContextUrlDataDynamicProperty = 'UrlData';
    PageContext._pageContextSearchDataDynamicProperty = 'SearchData';
    return PageContext;
}());
/* harmony default export */ __webpack_exports__["default"] = (PageContext);


/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: Page, PageContext, SPWeb, SPSite, SPUser, SPField, SPList, _SPFeatureInfo, SPListItem, CultureInfo, O365GroupAssociation, O365GroupAssociationType, SPPermission, SharePointPageContextDataProvider, SPTimeZone, AzureActiveDirectoryInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page */ "cnM3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Page", function() { return _Page__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _PageContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageContext */ "ed5A");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageContext", function() { return _PageContext__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _SPWeb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SPWeb */ "swVP");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPWeb", function() { return _SPWeb__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _SPSite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SPSite */ "qdg7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPSite", function() { return _SPSite__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _SPUser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SPUser */ "6ZP6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPUser", function() { return _SPUser__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _SPField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SPField */ "JhOW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPField", function() { return _SPField__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _SPList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SPList */ "CRGG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPList", function() { return _SPList__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _SPFeatureInfo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SPFeatureInfo */ "x7V9");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_SPFeatureInfo", function() { return _SPFeatureInfo__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _SPListItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SPListItem */ "GPn3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPListItem", function() { return _SPListItem__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _CultureInfo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CultureInfo */ "L14d");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CultureInfo", function() { return _CultureInfo__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _O365GroupAssociation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./O365GroupAssociation */ "GLAT");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "O365GroupAssociation", function() { return _O365GroupAssociation__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "O365GroupAssociationType", function() { return _O365GroupAssociation__WEBPACK_IMPORTED_MODULE_10__["O365GroupAssociationType"]; });

/* harmony import */ var _SPPermission__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SPPermission */ "W9Pz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPPermission", function() { return _SPPermission__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _pageManager_SharePointPageContextDataProvider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pageManager/SharePointPageContextDataProvider */ "JRdv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SharePointPageContextDataProvider", function() { return _pageManager_SharePointPageContextDataProvider__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _SPTimeZone__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./SPTimeZone */ "PL7Z");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPTimeZone", function() { return _SPTimeZone__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _AzureActiveDirectoryInfo__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./AzureActiveDirectoryInfo */ "ZcDP");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AzureActiveDirectoryInfo", function() { return _AzureActiveDirectoryInfo__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/**
 * Page context services for the SharePoint Framework
 *
 * @remarks
 * The page context allows an application and its web parts to share common
 * data about the current page, such as its contents, URL, list, user, permissions,
 * navigation menu, etc.
 *
 * @packagedocumentation
 */

















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

/***/ "qdg7":
/*!***********************!*\
  !*** ./lib/SPSite.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _O365GroupAssociation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./O365GroupAssociation */ "GLAT");


/**
  * This class is primarily used with the `PageContext` class.  It provides contextual
  * information for the SharePoint site collection ("SPSite") that hosts the page.
  *
  * @public
  */
var SPSite = /** @class */ (function () {
    /**
     * @internal
     */
    function SPSite(data) {
        this._validate(data);
        this._absoluteUrl = data.absoluteUrl;
        this._cdnPrefix = data.cdnPrefix || '';
        this._classification = data.classification;
        this._correlationId = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(data.correlationId);
        this._group = data.group ? new _O365GroupAssociation__WEBPACK_IMPORTED_MODULE_1__["default"](data.group) : undefined;
        this._id = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(data.id);
        this._isNoScriptEnabled = data.isNoScriptEnabled;
        this._recycleBinItemCount = data.recycleBinItemCount;
        this._serverRelativeUrl = data.serverRelativeUrl;
        this._serverRequestPath = data.serverRequestPath;
        this._sitePagesEnabled = data.sitePagesEnabled;
        this._sitePagesFeatureVersion = data.sitePagesFeatureVersion ? data.sitePagesFeatureVersion : 0;
    }
    /**
     * Returns a JSON serializable object.
     * @internal
     */
    SPSite.prototype._serialize = function () {
        return {
            absoluteUrl: this.absoluteUrl,
            cdnPrefix: this.cdnPrefix,
            classification: this.classification,
            correlationId: this.correlationId.toString(),
            group: this.group ? this.group._serialize() : undefined,
            id: this.id.toString(),
            isNoScriptEnabled: this.isNoScriptEnabled,
            recycleBinItemCount: this.recycleBinItemCount,
            serverRelativeUrl: this.serverRelativeUrl,
            serverRequestPath: this.serverRequestPath,
            sitePagesEnabled: this.sitePagesEnabled
        };
    };
    Object.defineProperty(SPSite.prototype, "absoluteUrl", {
        /**
         * Returns the absolute URL for this SPSite.
         *
         * @remarks
         * Example: "https://example.com/sites/PubSite"
         */
        get: function () {
            return this._absoluteUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPSite.prototype, "cdnPrefix", {
        /**
         * Returns the prefix of the application's specified cdn or an empty string if there isn't one.
         */
        get: function () {
            return this._cdnPrefix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPSite.prototype, "classification", {
        /**
         * Returns the classification of the site.
         */
        get: function () {
            return this._classification;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPSite.prototype, "correlationId", {
        /**
         * Returns the correlation id to the current server request.
         */
        get: function () {
            return this._correlationId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPSite.prototype, "group", {
        /**
         * Contextual information about the O365 Group associated with this site.
         * If there is no O365Group associated with the current site, this property will be undefined.
         */
        get: function () {
            return this._group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPSite.prototype, "id", {
        /**
         * The GUID that identifies the SPSite on the server.
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPSite.prototype, "isNoScriptEnabled", {
        /**
         * Returns true if isNoScript has been enabled on the SPSite.
         */
        get: function () {
            return this._isNoScriptEnabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPSite.prototype, "recycleBinItemCount", {
        /**
         * The amount of items in the recycle bin.
         */
        get: function () {
            return this._recycleBinItemCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPSite.prototype, "serverRelativeUrl", {
        /**
         * Returns the server-relative URL for this SPSite.
         *
         * @remarks
         * Example: "/sites/PubSite"
         */
        get: function () {
            return this._serverRelativeUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPSite.prototype, "serverRequestPath", {
        /**
         * Returns serverRelativeUrl of the original request.
         *
         * @remarks
         * Example: "/teams/SPClientTest/SitePages/Home.aspx"
         */
        get: function () {
            return this._serverRequestPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPSite.prototype, "sitePagesEnabled", {
        /**
         * Returns true if SitePages are enabled on this SPSite.
         */
        get: function () {
            return this._sitePagesEnabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPSite.prototype, "sitePagesFeatureVersion", {
        /**
         * Returns site pages feature version number if defined on this SPSite.
         * Example, for version 16.0.4.0 this would return 4.
         *
         * @alpha
         */
        get: function () {
            return this._sitePagesFeatureVersion;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Function that throws an exception if an ISPSiteData object or its parameters are
     * null or undefined.
     *
     * @param data - Data used to construct an ISPSiteData object
     */
    SPSite.prototype._validate = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data, 'ISPSiteData object');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.absoluteUrl, 'absoluteUrl');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.classification, 'classification');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(data.correlationId), 'correlationId');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(data.id), 'id');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.isNoScriptEnabled, 'isNoScriptEnabled');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.recycleBinItemCount, 'recycleBinItemCount');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.serverRequestPath, 'serverRequestPath');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.serverRelativeUrl, 'serverRelativeUrl');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.sitePagesEnabled, 'sitePagesEnabled');
    };
    return SPSite;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPSite);


/***/ }),

/***/ "swVP":
/*!**********************!*\
  !*** ./lib/SPWeb.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SPPermission__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SPPermission */ "W9Pz");
/* harmony import */ var _SPTimeZone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SPTimeZone */ "PL7Z");



/**
  * This class is primarily used with the `PageContext` class. It provides contextual
  * information for the SharePoint site ("SPWeb") that hosts the page.
  *
  * @public
  */
var SPWeb = /** @class */ (function () {
    /**
     * @internal
     */
    function SPWeb(data) {
        this._validate(data);
        this._absoluteUrl = data.absoluteUrl;
        this._id = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse(data.id);
        this._isAppWeb = data.isAppWeb;
        this._language = data.language;
        this._languageName = data.languageName;
        this._logoUrl = data.logoUrl;
        this._permissions = new _SPPermission__WEBPACK_IMPORTED_MODULE_1__["default"](data.permissions);
        this._timeZone = data.timeZoneInfo ?
            new _SPTimeZone__WEBPACK_IMPORTED_MODULE_2__["default"](data.timeZoneInfo) : undefined;
        this._firstDayOfWeek = data.firstDayOfWeek;
        this._serverRelativeUrl = data.serverRelativeUrl;
        this._templateName = data.templateName || '';
        this._title = data.title || '';
        this._description = data.description || '';
    }
    /**
     * Returns a JSON serializable object.
     * @internal
     */
    SPWeb.prototype._serialize = function () {
        return {
            id: this.id.toString(),
            title: this.title,
            description: this.description,
            serverRelativeUrl: this.serverRelativeUrl,
            absoluteUrl: this.absoluteUrl,
            isAppWeb: this.isAppWeb,
            language: this.language,
            languageName: this.languageName,
            logoUrl: this.logoUrl,
            permissions: this.permissions._serialize(),
            templateName: this.templateName
        };
    };
    Object.defineProperty(SPWeb.prototype, "absoluteUrl", {
        /**
         * Returns the absolute URL for this SPWeb.
         * Example: `"https://example.com/sites/PubSite/SubWeb"`
         */
        get: function () {
            return this._absoluteUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPWeb.prototype, "id", {
        /**
         * The GUID that identifies the SPWeb on the server.
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPWeb.prototype, "isAppWeb", {
        /**
         * Returns true if this `SPWeb` the container web for an `SPApp`.
         */
        get: function () {
            return this._isAppWeb;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPWeb.prototype, "language", {
        /**
         * Returns the locale identifier (LCID) for the default language of the website.
         *
         * @remarks
         * Example: 1033 represents the locale identifier for en-US.
         */
        get: function () {
            return this._language;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPWeb.prototype, "languageName", {
        /**
         * Returns the language name for the default language of the website.
         *
         * @remarks
         * Example: en-US represents the English language in the US locale.
         */
        get: function () {
            // @todo: VS #789033, remove the fallback to empty string when server change returns languageName.
            return this._languageName || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPWeb.prototype, "logoUrl", {
        /**
         * Returns the absolute URL of the website logo.
         *
         * @remarks
         * Example:` https://example.com/sites/PubSite/SubWeb/logo.jpg`
         */
        get: function () {
            return this._logoUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPWeb.prototype, "permissions", {
        /**
         * Return the SPPermission object that represents the set of permissions that the
         * current user has for interacting with the web.
         */
        get: function () {
            return this._permissions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPWeb.prototype, "timeZoneInfo", {
        /**
         * Returns the web's regional timezone settings or undefined if they haven't been set.
         *
         * @beta
         */
        get: function () {
            return this._timeZone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPWeb.prototype, "firstDayOfWeek", {
        /**
         * Returns the web's regional first day of week setting or undefined if it hasn't been set.
         *
         * @beta
         */
        get: function () {
            // @todo VSO#490622: Consider better API structure to avoid confusing user with return value of undefined.
            return this._firstDayOfWeek;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPWeb.prototype, "serverRelativeUrl", {
        /**
         * Returns the server-relative URL for this SPWeb.
         *
         * @remarks
         * Example: `"/sites/PubSite/SubWeb"`
         */
        get: function () {
            return this._serverRelativeUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPWeb.prototype, "templateName", {
        /**
         * Returns the string representing the numeric identifier for the site definition or
         * site template that was used to create the site.
         *
         * @remarks
         * Example: `"1"` represents the team site template when creating a new site on SharePoint.
         */
        get: function () {
            return this._templateName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPWeb.prototype, "title", {
        /**
         * Returns the title of the current SPWeb.
         */
        get: function () {
            return this._title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPWeb.prototype, "description", {
        /**
         * Returns the description of the current SPWeb.
         */
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Function that throws an exception if an ISPWebData object or its parameters are
     * null or undefined.
     *
     * @param data - Data used to construct an ISPWebData object
     */
    SPWeb.prototype._validate = function (data) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data, 'ISPWebData object');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.absoluteUrl, 'absoluteUrl');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].tryParse(data.id), 'id');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.isAppWeb, 'isAppWeb');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.language, 'language');
        // @todo: VS #789033, enable validation of languageName when server change returns languageName.
        // Validate.isNotNullOrUndefined(data.languageName, 'languageName');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.logoUrl, 'logoUrl');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.permissions, 'permissions');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data.serverRelativeUrl, 'serverRelativeUrl');
    };
    return SPWeb;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPWeb);


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

/***/ "x7V9":
/*!******************************!*\
  !*** ./lib/SPFeatureInfo.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */

/**
  * This class is primarily used with the `PageContext` class. It provides contextual
  * information for the features enabled on the SharePoint site that hosts the page.
  *
  * @internal
  */
var SPFeatureInfo = /** @class */ (function () {
    /**
     * @param data - Raw JSON data from the html file
     */
    function SPFeatureInfo(data) {
        this._features = new Map();
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(data, 'ISPFeatureInfoData object');
        for (var key in data) {
            if (key !== undefined) {
                // tslint:disable-next-line:no-any
                var value = data[key];
                this._features.set(key, { version: value.Version, enabled: value.Enabled });
            }
        }
    }
    /**
     * Returns a JSON serializable object.
     */
    SPFeatureInfo.prototype._serialize = function () {
        var data = {};
        this._features.forEach(function (value, key) {
            data[key] = { Version: value.version, Enabled: value.enabled };
        });
        return data;
    };
    /**
     * Returns feature information for a given feature.
     * @param featureName - Name of a feature to lookup
     */
    SPFeatureInfo.prototype.get = function (featureName) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(featureName, 'featureName');
        return this._features.get(featureName);
    };
    return SPFeatureInfo;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPFeatureInfo);


/***/ })

/******/ })}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));;


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

/***/ "@microsoft/sp-dynamic-data":
/*!*********************************************!*\
  !*** external "@microsoft/sp-dynamic-data" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__microsoft_sp_dynamic_data__;

/***/ })

/******/ })});;
//# sourceMappingURL=sp-page-context_en-us.js.map