(window["webpackJsonpbdb0f5dd_3bb4_4b93_b12a_71aa9e20bb09_0_3_24"] = window["webpackJsonpbdb0f5dd_3bb4_4b93_b12a_71aa9e20bb09_0_3_24"] || []).push([["spanchor-anchorserivce"],{

/***/ "+8VW":
/*!********************************************!*\
  !*** ./lib/anchorService/AnchorService.js ***!
  \********************************************/
/*! exports provided: AnchorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnchorService", function() { return AnchorService; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/sp-a11y */ "ytfe");
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Microsoft. All rights reserved.
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



var AnchorService = /** @class */ (function () {
    function AnchorService() {
        var _this = this;
        this._componentIdToAnchorDataMap = new Map();
        this._anchorIdToAnchorDataMap = new Map();
        /**
         * Register anchors of a component with the anchor service.
         *
         * @param uniqueId - A unique id among the page identifying which component is requesting anchors
         * @param anchorList - The list of anchors in the component
         */
        this.register = function (uniqueId, anchorList) {
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNonemptyString(uniqueId, 'uniqueId');
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Validate"].isNotNullOrUndefined(anchorList, 'anchorList');
            _this._componentIdToAnchorDataMap.set(uniqueId, anchorList.map(function (anchorData) { return (__assign({}, anchorData, { anchorId: undefined })); }));
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_EngagementLogger"].logEventWithLogEntry({
                moduleName: 'AnchorService',
                logFeature: 'Register',
                logType: _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogType"].Event,
                logProperties: { anchorCount: String(anchorList.length) }
            });
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(AnchorService._logSource, "Component '" + uniqueId + "' registered with " + anchorList.length + " anchors");
        };
        /**
         * Delete a component's anchors from the Anchor Service.
         *
         * @param uniqueId - The same id provided during registration
         */
        this.unregister = function (uniqueId) {
            var anchorDataList = _this._componentIdToAnchorDataMap.get(uniqueId);
            if (!anchorDataList) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(AnchorService._logSource, new Error("Trying to unregister a non-exists component '" + uniqueId + "'"));
                return;
            }
            else {
                anchorDataList.forEach(function (anchorData) {
                    if (anchorData.anchorId) {
                        if (anchorData.onDisposeAnchorId) {
                            anchorData.onDisposeAnchorId(anchorData.anchorTargetElement, anchorData.anchorId);
                        }
                        _this._anchorIdToAnchorDataMap.delete(anchorData.anchorId);
                    }
                });
                _this._componentIdToAnchorDataMap.delete(uniqueId);
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_EngagementLogger"].logEvent('AnchorService.Unregister');
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(AnchorService._logSource, "Successfully unregistered component '" + uniqueId + "'");
            }
        };
        /**
         * Notify the Anchor Service that all the anchors in the page have finished their registration.
         */
        this.finishRegistration = function () {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(AnchorService._logSource, 'finishRegistration invoked');
            var anchorList = [];
            _this._componentIdToAnchorDataMap.forEach(function (anchorData) { return anchorList = anchorList.concat(anchorData); });
            anchorList.sort(AnchorService._compareAnchorLocation);
            _this._anchorIdToAnchorDataMap.clear();
            var anchorIdIndexMap = new Map();
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_EngagementLogger"].logEventWithLogEntry({
                moduleName: 'AnchorService',
                logFeature: 'FinishRegistration',
                logType: _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogType"].Event,
                logProperties: { anchorCount: String(anchorList.length) }
            });
            var publicAnchorDataList = anchorList.map(function (currAnchor) {
                var anchorId = AnchorService.sanitizeAnchorId(currAnchor.suggestedAnchorId);
                if (!anchorId) { // If suggestedAnchorId only contains special characters
                    anchorId = AnchorService.DEFAULT_ANCHOR_NAME;
                }
                anchorId = _this._handleCollision(anchorId, anchorIdIndexMap);
                // The reference to all the IInternalAnchorData will be preserved during array flatten
                currAnchor.anchorId = anchorId;
                _this._anchorIdToAnchorDataMap.set(anchorId, currAnchor);
                if (currAnchor.onReceiveAnchorId) {
                    currAnchor.onReceiveAnchorId(currAnchor.anchorTargetElement, anchorId);
                }
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logVerbose(AnchorService._logSource, "Anchor ID '" + anchorId + "' allocated");
                return {
                    anchorText: currAnchor.suggestedAnchorId,
                    anchoredElementTagName: currAnchor.anchorTargetElement.tagName,
                    anchorId: anchorId
                };
            });
            var eventArgs = {
                action: "AnchorsUpdated" /* AnchorsUpdated */,
                sortedAnchors: publicAnchorDataList
            };
            if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('2d8219b8-db55-4bc9-9e40-1a90d6592f32'), '10/14/2019', 'SOX_LoadAnchorServiceImmediatelyWhenAnchorOnPage')) {
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.raiseStickyEvent('anchorEvent', eventArgs);
            }
            else {
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPEventManager"].instance.raiseEvent('anchorEvent', eventArgs);
            }
        };
    }
    /**
     * Sanitize a suggested anchor id for use in the URL fragment identifier.
     *
     * @param text - The input text to clean
     */
    AnchorService.sanitizeAnchorId = function (text) {
        var sanitizedAnchorId = text
            ? text.trim()
                .toLowerCase()
                .replace(AnchorService._unsafeCharacters, '-')
                .replace(/-{2,}/g, '-') // Replace two or more consecutive '-' with only one '-'
                .replace(/^-+|-+$/g, '') // Trim '-' at the start and the end
                .substring(0, AnchorService.MAX_ID_LENGTH)
            : '';
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_EngagementLogger"].logEventWithLogEntry({
            moduleName: 'AnchorService',
            logFeature: 'SanitizeAnchor',
            logType: _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogType"].Event,
            logProperties: {
                rawAnchorIdLength: String(text.length),
                sanitizedAnchorIdLength: String(sanitizedAnchorId.length)
            }
        });
        return sanitizedAnchorId;
    };
    /**
     * Compare anchors according to their order in the DOM tree.
     */
    AnchorService._compareAnchorLocation = function (a, b) {
        /* tslint:disable-next-line:no-bitwise max-line-length */
        return (a.anchorTargetElement.compareDocumentPosition(b.anchorTargetElement) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
    };
    /**
     * Get the HTMLElement that an anchor ID points to.
     */
    AnchorService.prototype.getElementByAnchorId = function (anchorId) {
        var anchor = this._anchorIdToAnchorDataMap.get(anchorId);
        return anchor && anchor.anchorTargetElement;
    };
    /**
     * Scroll target anchor into view.
     * @param anchorId the anchorId to be scrolled.
     * @returns true if succeeded to scroll, otherwise false.
     */
    AnchorService.prototype.scrollTo = function (anchorId) {
        var anchor = this._anchorIdToAnchorDataMap.get(anchorId);
        if (anchor) {
            anchor.anchorTargetElement.scrollIntoView();
            _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_2__["Focus"].focusTo(anchor.anchorTargetElement);
            return true;
        }
        return false;
    };
    AnchorService.prototype._handleCollision = function (id, indexMap) {
        // Check whether we have encounter the same sanitized id before, if so,
        // add a numbering suffix to it according to their order in the DOM tree
        var result = id;
        var currentIndex = 0;
        while (indexMap.has(result)) {
            id = result;
            currentIndex = indexMap.get(id) || 0;
            result = id + '-' + currentIndex;
        }
        indexMap.set(id, currentIndex + 1);
        indexMap.set(result, 1);
        return result;
    };
    AnchorService._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('AnchorService');
    AnchorService._unsafeCharacters = /[`"'<>#%{}|\\^~\/\[\];?:@=&\s\0]/g;
    // This length limit is decided considering the following facts:
    //  1. Most browsers support url length up to 2000 chars
    //    (https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers).
    //  2. SharePoint url type list column has length limit of 256 chars.
    //  3. Web part property marked with url type metadata will be saved in database and length limit is 400 chars
    //    (V_STORE_MAX_FULLURL in Sporel).
    //  4. Google typically displays the first 50–60 characters of a title tag.
    // To avoid cutting-off user's semantic content, and control the risk of whole url exceeding length limitation,
    // the following maximum length is picked.
    AnchorService.MAX_ID_LENGTH = 128;
    AnchorService.DEFAULT_ANCHOR_NAME = 'anchor';
    return AnchorService;
}());



/***/ }),

/***/ "Obl3":
/*!*************************************************!*\
  !*** ./lib/anchorService/AnchorServiceQueue.js ***!
  \*************************************************/
/*! exports provided: AnchorServiceQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnchorServiceQueue", function() { return AnchorServiceQueue; });
/* harmony import */ var _AnchorService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnchorService */ "+8VW");
// Copyright (c) Microsoft. All rights reserved.

/**
 * AnchorServiceQueue handles anchor events and calls anchorService APIs correspondingly.
 * It ensures the API calls to anchor service are invoked in a correct sequence.
 */
var AnchorServiceQueue = /** @class */ (function () {
    function AnchorServiceQueue() {
        var _this = this;
        this._register = function (uniqueId, anchorList) {
            _this._anchorService.register(uniqueId, anchorList);
            _this._pendingRegistrations.delete(uniqueId);
            _this._checkFinishRegistration();
        };
        this._unregister = function (uniqueId) {
            _this._anchorService.unregister(uniqueId);
            _this._pendingRegistrations.delete(uniqueId);
            _this._checkFinishRegistration();
        };
        this._finishRegistration = function () {
            if (!_this._pendingFinishRegistration) {
                _this._pendingFinishRegistration = true;
            }
            _this._checkFinishRegistration();
        };
        this._pendingFinishRegistration = false;
        this._pendingRegistrations = new Set();
        this._anchorService = new _AnchorService__WEBPACK_IMPORTED_MODULE_0__["AnchorService"]();
    }
    AnchorServiceQueue.prototype.initialize = function (eventsQueue) {
        var _this = this;
        eventsQueue.forEach(function (anchorEvent) { _this.handleAnchorEvent(anchorEvent); });
    };
    AnchorServiceQueue.prototype.scrollTo = function (anchorId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var scroll = function () {
                if (_this._anchorService.scrollTo(anchorId)) {
                    resolve();
                }
                else {
                    reject(new Error('Failed to find anchor to scroll'));
                }
            };
            if (!_this._pendingFinishRegistration) {
                scroll();
            }
            else {
                _this._resolveScroll = scroll;
            }
        });
    };
    AnchorServiceQueue.prototype.handleAnchorEvent = function (anchorEvent) {
        switch (anchorEvent.action) {
            case "ReserveRegistration" /* ReserveRegistration */:
                this._reserveRegistration(anchorEvent.uniqueId);
                break;
            case "Register" /* Register */:
                this._register(anchorEvent.uniqueId, anchorEvent.anchorList);
                break;
            case "Unregister" /* Unregister */:
                this._unregister(anchorEvent.uniqueId);
                break;
            case "FinishRegistration" /* FinishRegistration */:
                this._finishRegistration();
        }
    };
    AnchorServiceQueue.prototype._reserveRegistration = function (uniqueId) {
        this._pendingRegistrations.add(uniqueId);
    };
    AnchorServiceQueue.prototype._checkFinishRegistration = function () {
        if (this._pendingFinishRegistration && !this._pendingRegistrations.size) {
            this._anchorService.finishRegistration();
            this._pendingFinishRegistration = false;
            if (this._resolveScroll) {
                this._resolveScroll();
                this._resolveScroll = undefined;
            }
        }
    };
    return AnchorServiceQueue;
}());



/***/ }),

/***/ "nE28":
/*!************************************!*\
  !*** ./lib/anchorService/index.js ***!
  \************************************/
/*! exports provided: AnchorServiceQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnchorServiceQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnchorServiceQueue */ "Obl3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnchorServiceQueue", function() { return _AnchorServiceQueue__WEBPACK_IMPORTED_MODULE_0__["AnchorServiceQueue"]; });




/***/ })

}]);
//# sourceMappingURL=chunk.spanchor-anchorserivce_0cb759df5975eee2ed05.js.map