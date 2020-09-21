(window["webpackJsonp_974a7777_0990_4136_8fa6_95d80114c2e0_1_11_0"] = window["webpackJsonp_974a7777_0990_4136_8fa6_95d80114c2e0_1_11_0"] || []).push([["sp-webpart-base-iframedwebpartcontroller"],{

/***/ "1BD2":
/*!****************************************************************************!*\
  !*** ./lib/chunks/IframedWebPartController/IframedPropertyPane.module.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./IframedPropertyPane.module.css */ "ayGF");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "CL8W":
/*!*************************************************************************!*\
  !*** ./lib/chunks/IframedWebPartController/IframedWebPartController.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _IframedPropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IframedPropertyPane.module.scss */ "Ove4");
/* harmony import */ var _ReservedIframeQueryParamKeys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ReservedIframeQueryParamKeys */ "DZz/");





var LOG_SOURCE = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_LogSource"].create('IframedWebPartController');
var WEBPART_IFRAME_ID_PREFIX = 'dom-isolated-webpart';
var PROPERTYPANE_IFRAME_ID = 'dom-isolated-property-pane';
var IFRAMED_PROPERTYPANE_CONTAINER_ID = 'spIFramePropertyPaneContainer';
var IframedWebPartController = /** @class */ (function () {
    function IframedWebPartController(host) {
        this._iframeSrcUrl = undefined;
        this._iframedWebparts = new Map();
        this._host = host;
        this._ppIframeElement = undefined;
        this._updateWebPartData = this._updateWebPartData.bind(this);
        this._updateWebPartDisplayMode = this._updateWebPartDisplayMode.bind(this);
        this._iframeEventListener = this._iframeEventListener.bind(this);
        window.addEventListener('message', this._iframeEventListener);
    }
    /**
     * Delete references an iframed web part.
     */
    IframedWebPartController.prototype.deleteWebPart = function (instanceId) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNonemptyString(instanceId, 'instanceId');
        var metadata = this._iframedWebparts.get(instanceId);
        // Send message to the iframed property pane if it exists.
        var iframePropertyPaneElement = document.getElementById(PROPERTYPANE_IFRAME_ID);
        if (iframePropertyPaneElement && iframePropertyPaneElement.contentWindow) {
            var messageToPropertyPane = {
                instanceId: instanceId,
                action: "iframeDeleteWebPart" /* DeleteWebPart */
            };
            iframePropertyPaneElement.contentWindow.postMessage(messageToPropertyPane, metadata.url);
        }
        this.requestPropertyPaneAction(2 /* Close */);
        this._iframedWebparts.delete(instanceId);
    };
    /**
     * Get the instanceId's of all the iframed webparts.
     */
    IframedWebPartController.prototype.getAllInstanceIds = function () {
        var instanceIds = [];
        this._iframedWebparts.forEach(function (value, key) {
            instanceIds.push(key);
        });
        return instanceIds;
    };
    /**
     * Send a message to the iframed webpart to notify that their container
     * has been resized.
     */
    IframedWebPartController.prototype.notifyContainerResize = function (instanceId) {
        // @todo #VS0:617678 Add support for "notifyContrainerResize"
    };
    IframedWebPartController.prototype.startDirtyBitTimer = function (instanceId) {
        // This lifecycle event is manually handled when a web part property is changed.
    };
    /**
     *  @param domainUrl - the domain from which the web part should be loaded.
     *  Returns an iframe that points to a SpWebApplication that loads the webpart.
     *  @param pageContext - Page context reference.
     *  @param webPartManagerContext - web part manager context.
     */
    IframedWebPartController.prototype.loadWebPart = function (domainUrl, pageContext, webPartManagerContext) {
        this._iframeSrcUrl = this._generateIframeSrcUrl(domainUrl, pageContext, webPartManagerContext);
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(webPartManagerContext.webPartData, 'webPartData');
        var metadata = {
            origin: domainUrl,
            url: this._iframeSrcUrl,
            webPartData: webPartManagerContext.webPartData,
            webPartElementId: WEBPART_IFRAME_ID_PREFIX + "-" + webPartManagerContext.instanceId,
            displayMode: webPartManagerContext.displayMode,
            addedFromPersistedData: !!webPartManagerContext.addedFromPersistedData
        };
        // This instanceId appears twice if we are loading the property pane of an already rendered
        // webpart, in that case we do not need to write twice.
        if (!this._iframedWebparts.has(webPartManagerContext.instanceId)) {
            // Fill in the initial values on the web part data if we are creating the web part's instance.
            if (!webPartManagerContext.addedFromPersistedData) {
                metadata.webPartData.dataVersion = '1.0';
                // Note: Same instance id should be passed as 'newWebPartInstanceId' to the iframe.
                metadata.webPartData.instanceId = webPartManagerContext.instanceId;
            }
            this._iframedWebparts.set(webPartManagerContext.instanceId, metadata);
        }
        webPartManagerContext.domElement.innerHTML = "<div>\n      <iframe\n        id=" + metadata.webPartElementId + "\n        src=" + this._addFilteredQueryParamsFromHostPage(metadata.url) + "\n        class=" + _IframedPropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].iframeWebPart + "\n        scrolling=\"no\"\n      ></iframe>\n    </div>";
    };
    /**
     * To open a property pane for a web part that has been loaded into an iframe, we create a sibling dom element on the
     * page and render the property pane into it. We use the same method of loading an iframe with the addition of a
     * query parameter, 'openPropertyPane=true'. By default 'openPropertyPane' is undefined and thus false.
     * @param instanceId - the instanceId of the corresponding web part.
     * @param propertyPaneState - the desired state of the property pane.
     */
    IframedWebPartController.prototype.requestPropertyPaneAction = function (propertyPaneState, instanceId) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(propertyPaneState, 'propertyPaneState');
        switch (propertyPaneState) {
            case 1 /* Open */:
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNonemptyString(instanceId, 'instanceId');
                if (!this._ppIframeElement) { // No-Iframe element is present on the page
                    this._createPropertyPaneElement(instanceId);
                }
                this._showPropertyPane(instanceId);
                break;
            case 2 /* Close */:
                if (this._ppIframeElement) {
                    this._hidePropertyPane(instanceId);
                }
                break;
            case 3 /* Toggle */:
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNonemptyString(instanceId, 'instanceId');
                if (this._iframedPropertyPaneContainer &&
                    this._iframedPropertyPaneContainer.classList.contains(_IframedPropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].showPane)) {
                    this._hidePropertyPane(instanceId);
                }
                else {
                    // Create the iframed property pane element if none exists.
                    if (!this._iframedPropertyPaneContainer) {
                        this._createPropertyPaneElement(instanceId);
                    }
                    this._showPropertyPane(instanceId);
                }
                break;
            case 4 /* Default */:
                break;
        }
    };
    /**
     * Returns the most recently saved WebPartData for the web part associated
     * with the 'instanceId'.
     */
    IframedWebPartController.prototype.serialize = function (instanceId) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNonemptyString(instanceId, 'instanceId');
        var metadata = this._iframedWebparts.get(instanceId);
        return metadata.webPartData;
    };
    /**
     * Handles the ClientSideWebPartManager's request to set the displayMode for a web part
     * in an iframe. (Saves the displayMode and sends a message to the iframe window).
     */
    IframedWebPartController.prototype.setDisplayMode = function (displayMode, instanceId) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(displayMode, 'displayMode');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNonemptyString(instanceId, 'instanceId');
        var messageToRenderedWebPart = {
            instanceId: instanceId,
            action: "iframeSetDisplayMode" /* SetDisplayMode */,
            displayMode: displayMode
        };
        // Save the display mode in case the web part has not yet rendered, after rendering has completed
        // a message will be sent to the IframedWebPartController requesting the 'displayMode'.
        var metadata = this._iframedWebparts.get(instanceId);
        metadata.displayMode = displayMode;
        // Send a message to the iframed window containing the rendered web part
        // No need to validate the iframe exists because it may not have been rendered yet if
        // this is the first time the page is loaded.
        var iframeWebPartElement = document.getElementById(metadata.webPartElementId);
        if (iframeWebPartElement && iframeWebPartElement.contentWindow) {
            iframeWebPartElement.contentWindow.postMessage(messageToRenderedWebPart, metadata.url);
        }
    };
    /**
     *  Returns the url that loads the webpart with instanceId and componentId on the 'webPartManagerContext'.
     *  @param domainUrl - the domain from which the web part should be loaded.
     *  @param pageContext - Page context reference.
     *  @param webPartManagerContext - web part manager context.
     */
    IframedWebPartController.prototype._generateIframeSrcUrl = function (domainUrl, pageContext, webPartManagerContext) {
        var iframeSrcUrl = domainUrl + "/_layouts/15/webpart.aspx?";
        // If the web part is being added from the persisted data it means that the web part instance
        // already exists on the page otherwise we are creating a new instance for the web part.
        if (webPartManagerContext.addedFromPersistedData) {
            iframeSrcUrl += _ReservedIframeQueryParamKeys__WEBPACK_IMPORTED_MODULE_4__["ReservedIframeQueryParamKeys"].List + "=%7B";
            iframeSrcUrl += pageContext.list.id;
            iframeSrcUrl += "%7D&" + _ReservedIframeQueryParamKeys__WEBPACK_IMPORTED_MODULE_4__["ReservedIframeQueryParamKeys"].Id + "=";
            iframeSrcUrl += pageContext.listItem.id;
            iframeSrcUrl += "&" + _ReservedIframeQueryParamKeys__WEBPACK_IMPORTED_MODULE_4__["ReservedIframeQueryParamKeys"].WebPartInstanceId + "=";
            iframeSrcUrl += webPartManagerContext.instanceId;
        }
        else {
            iframeSrcUrl += _ReservedIframeQueryParamKeys__WEBPACK_IMPORTED_MODULE_4__["ReservedIframeQueryParamKeys"].NewWebPartInstanceId + "=";
            iframeSrcUrl += webPartManagerContext.instanceId;
        }
        iframeSrcUrl += "&" + _ReservedIframeQueryParamKeys__WEBPACK_IMPORTED_MODULE_4__["ReservedIframeQueryParamKeys"].ParentWindowOrigin + "=";
        iframeSrcUrl += window.location.origin;
        iframeSrcUrl += "&" + _ReservedIframeQueryParamKeys__WEBPACK_IMPORTED_MODULE_4__["ReservedIframeQueryParamKeys"].ComponentId + "=";
        iframeSrcUrl += webPartManagerContext.manifest.id;
        iframeSrcUrl += "&" + _ReservedIframeQueryParamKeys__WEBPACK_IMPORTED_MODULE_4__["ReservedIframeQueryParamKeys"].HostedInCanvas;
        return iframeSrcUrl;
    };
    /**
     * Creates an iframe HTML element, sets the source url to load an application that will
     * display the property pane associated with the given parameters, and add the iframed
     * element as a child to the page chrome. This method will not show the property pane by
     * default, 'showPropetyPane' should be called after.
     * @param instanceId
     */
    IframedWebPartController.prototype._createPropertyPaneElement = function (instanceId) {
        if (!this._pageContentElement) {
            this._pageContentElement = document.getElementById('spPageChromeAppDiv');
        }
        if (!this._iframedPropertyPaneContainer) {
            this._iframedPropertyPaneContainer = document.createElement('div');
            this._iframedPropertyPaneContainer.id = IFRAMED_PROPERTYPANE_CONTAINER_ID;
            this._iframedPropertyPaneContainer.className = _IframedPropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].spIFramePropertyPaneContainer;
        }
        var metadata = this._iframedWebparts.get(instanceId);
        this._iframeSrcUrl = metadata.url;
        this._iframeSrcUrl += "&" + _ReservedIframeQueryParamKeys__WEBPACK_IMPORTED_MODULE_4__["ReservedIframeQueryParamKeys"].OpenPropertyPane + "=true";
        this._iframedPropertyPaneContainer.innerHTML = "\n      <iframe\n        id=" + PROPERTYPANE_IFRAME_ID + "\n        src=" + this._addFilteredQueryParamsFromHostPage(this._iframeSrcUrl) + "\n        class=" + _IframedPropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].iframePropertyPane + "\n      ></iframe>";
        var parent = this._pageContentElement.parentElement;
        parent.appendChild(this._iframedPropertyPaneContainer);
        this._ppIframeElement = document.getElementById(PROPERTYPANE_IFRAME_ID);
    };
    /**
     * Event listener that takes actions on behalf of iframed webparts.
     */
    IframedWebPartController.prototype._iframeEventListener = function (event) {
        if (this._iframedWebparts.has(event.data.instanceId)) {
            var metadata = this._iframedWebparts.get(event.data.instanceId);
            var currentOrigin = new URL(event.origin).origin;
            if (currentOrigin.toLowerCase() === event.origin.toLowerCase()) {
                var eventData = event.data;
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(eventData.action, 'action');
                switch (eventData.action) {
                    case "iframeRequestDisplayMode" /* RequestDisplayMode */:
                        this._updateWebPartDisplayMode(eventData.instanceId);
                        break;
                    case "iframeSetDimensions" /* SetDimensions */:
                        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(eventData.height, 'height');
                        var iframeWebPartElement = document.getElementById(metadata.webPartElementId);
                        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(iframeWebPartElement, 'iframedWebPartElement');
                        iframeWebPartElement.style.height = eventData.height + "px";
                        break;
                    case "iframeUpdateWebPartData" /* UpdateWebPartData */:
                        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(eventData.webPartData, 'webPartData');
                        this._updateWebPartData(eventData.instanceId, eventData.webPartData, "iframeUpdateWebPartData" /* UpdateWebPartData */);
                        break;
                    case "iframeUpdatePropertyPaneData" /* UpdatePropertyPaneData */:
                        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Validate"].isNotNullOrUndefined(eventData.webPartData, 'webPartData');
                        this._updateWebPartData(eventData.instanceId, eventData.webPartData, "iframeUpdatePropertyPaneData" /* UpdatePropertyPaneData */);
                        break;
                    case "iframePropertyPaneLifeCycle" /* UpdatePropertyPaneLifeCycle */:
                        switch (eventData.propertyPaneLifeCycleEvent) {
                            case 4 /* Closed */:
                                this._hidePropertyPane(event.data.instanceId);
                        }
                        break;
                    case "webPartRenderedInPropertyPaneIframe" /* WebPartRenderedInPropertyPaneIframe */:
                        var data = {
                            instanceId: event.data.instanceId,
                            action: "iframeRequestPropertyPaneAction" /* RequestPropertyPaneAction */,
                            propertyPaneAction: 5 /* Refresh */,
                            webPartData: metadata.webPartData
                        };
                        this._ppIframeElement.contentWindow.postMessage(data, metadata.url);
                        break;
                    default:
                        break;
                }
            }
        }
    };
    /**
     * Sends a message to an iframed webpart requesting the 'displayMode' set by the ClientSideWebPartManager.
     *
     * When an iframe loads a webpart in an iframe it has the context of the webpart's 'displayMode', but the
     * iframe does not. Thus, after a webpart loads in an iframed, we send a message to the IframedWebPartController
     * asking for the display mode, which is then sent to the iframe via a window message.
     *
     */
    IframedWebPartController.prototype._updateWebPartDisplayMode = function (instanceId) {
        var metadata = this._iframedWebparts.get(instanceId);
        var messageToIframe = {
            instanceId: instanceId,
            displayMode: metadata.displayMode,
            action: "iframeSetDisplayMode" /* SetDisplayMode */
        };
        var iframeWebPartElement = document.getElementById(metadata.webPartElementId);
        if (iframeWebPartElement && iframeWebPartElement.contentWindow) {
            iframeWebPartElement.contentWindow.postMessage(messageToIframe, metadata.url);
        }
    };
    /**
     * Sends a message to the iframed web part to update it's web part data if the incoming
     * webPartData differs from the currently saved reference.
     * There are two scenarios:
     *    1. the property pane has been updated and is sending a message to the rendered web part
     *    2. the rendered web part has been updated and is sending a message to the property pane
     *  - we use the param 'action' to differentiate the difference and use the correct element id
     *    of the property pane or the web part.
     *
     * @param instanceId - web part instance id
     * @param webPartData - the incoming web part data.
     */
    IframedWebPartController.prototype._updateWebPartData = function (instanceId, webPartData, action) {
        var metadata = this._iframedWebparts.get(instanceId);
        // Only send a message if the webPartData differs from the last webPartData we sent
        if (!_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["isEqual"](webPartData, metadata.webPartData)) {
            metadata.webPartData = webPartData;
            this._iframedWebparts.set(instanceId, metadata);
            this._host.setDirty(instanceId);
            var message = {
                instanceId: instanceId,
                webPartData: webPartData,
                action: "iframeSetWebPartData" /* SetWebPartData */
            };
            switch (action) {
                case "iframeUpdatePropertyPaneData" /* UpdatePropertyPaneData */:
                    // The propertyPane iframe may not be open
                    var iframePropertyPaneElement = document.getElementById(PROPERTYPANE_IFRAME_ID);
                    if (iframePropertyPaneElement && iframePropertyPaneElement.contentWindow) {
                        iframePropertyPaneElement.contentWindow.postMessage(message, metadata.url);
                    }
                    break;
                case "iframeUpdateWebPartData" /* UpdateWebPartData */:
                    var iframeWebPartElement = document.getElementById(metadata.webPartElementId);
                    if (iframeWebPartElement && iframeWebPartElement.contentWindow) {
                        iframeWebPartElement.contentWindow.postMessage(message, metadata.url);
                    }
                    break;
                default:
                    _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_TraceLogger"].logError(LOG_SOURCE, new Error('Invalid parameter "action"'));
                    break;
            }
        }
    };
    IframedWebPartController.prototype._hidePropertyPane = function (webPartInstanceId) {
        if (this._iframedPropertyPaneContainer) {
            if (webPartInstanceId) {
                var eventData = {
                    // Pass the instanceId so we know which web part to
                    // configure when we the property pane is opened.
                    instanceId: webPartInstanceId,
                    action: "iframeRequestPropertyPaneAction" /* RequestPropertyPaneAction */,
                    propertyPaneAction: 2 /* Close */
                };
                var metadata = this._iframedWebparts.get(webPartInstanceId);
                // This message is being listened for in SpWebPartApplication._openPropertyPaneListener
                if (this._ppIframeElement && this._ppIframeElement.contentWindow) {
                    this._ppIframeElement.contentWindow.postMessage(eventData, metadata.url);
                }
            }
            this._iframedPropertyPaneContainer.classList.remove(_IframedPropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].showPane);
            this._iframedPropertyPaneContainer.classList.add(_IframedPropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].hidePane);
            this._pageContentElement.classList.remove(_IframedPropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].shrinkContent);
        }
    };
    /**
     * Adds and removes the neccessary styles to show the iframed property pane container.
     * Also posts a message to the window element so that the PropertyPaneController
     * can show the property pane content.
     * @param webPartInstanceId - instanceId so we know which property pane to open
     */
    IframedWebPartController.prototype._showPropertyPane = function (webPartInstanceId) {
        var _this = this;
        if (webPartInstanceId && this._iframedWebparts.has(webPartInstanceId)) {
            var metadata_1 = this._iframedWebparts.get(webPartInstanceId);
            // Update the src property in the iframe
            // (This is important if there are two iframed web parts on the page)
            this._ppIframeElement.src = metadata_1.url + "&openPropertyPane=true";
            var eventData_1 = {
                // Pass the instanceId so we know which web part to
                // configure when we the property pane is opened.
                instanceId: webPartInstanceId,
                action: "iframeRequestPropertyPaneAction" /* RequestPropertyPaneAction */,
                propertyPaneAction: 1 /* Open */
            };
            // This message is being listened for in SpWebPartApplication._openPropertyPaneListener
            if (this._ppIframeElement &&
                this._ppIframeElement.contentWindow &&
                this._ppIframeElement.contentDocument) {
                this._ppIframeElement.contentDocument.onload = (function () {
                    _this._ppIframeElement.contentWindow.postMessage(eventData_1, metadata_1.url);
                }).bind(this);
            }
        }
        this._iframedPropertyPaneContainer.classList.add(_IframedPropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].showPane);
        this._iframedPropertyPaneContainer.classList.remove(_IframedPropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].hidePane);
        this._pageContentElement.classList.add(_IframedPropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].shrinkContent);
    };
    /**
     * Adds the non-reserved query params from the host page to the iframe url.
     *
     * @param url - current iframe url.
     */
    IframedWebPartController.prototype._addFilteredQueryParamsFromHostPage = function (url) {
        var reservedKeys = Object
            .keys(_ReservedIframeQueryParamKeys__WEBPACK_IMPORTED_MODULE_4__["ReservedIframeQueryParamKeys"])
            .map(function (key) { return _ReservedIframeQueryParamKeys__WEBPACK_IMPORTED_MODULE_4__["ReservedIframeQueryParamKeys"][key]; });
        var searchParams = new URL(window.location.href).searchParams;
        for (var _i = 0, reservedKeys_1 = reservedKeys; _i < reservedKeys_1.length; _i++) {
            var param = reservedKeys_1[_i];
            if (searchParams.has(param)) {
                searchParams.delete(param);
            }
        }
        return url + "&" + searchParams.toString();
    };
    return IframedWebPartController;
}());
/* harmony default export */ __webpack_exports__["default"] = (IframedWebPartController);


/***/ }),

/***/ "DZz/":
/*!*****************************************************************************!*\
  !*** ./lib/chunks/IframedWebPartController/ReservedIframeQueryParamKeys.js ***!
  \*****************************************************************************/
/*! exports provided: ReservedIframeQueryParamKeys */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReservedIframeQueryParamKeys", function() { return ReservedIframeQueryParamKeys; });
/**
 * Enum which contains the reserved query string keys which are used by the
 * framework while constructing the iframe url.
 *
 * @internalremarks - Not making the enum 'const' because we cannot enumerate
 * the list.
 */
var ReservedIframeQueryParamKeys;
(function (ReservedIframeQueryParamKeys) {
    ReservedIframeQueryParamKeys["List"] = "list";
    ReservedIframeQueryParamKeys["Id"] = "id";
    ReservedIframeQueryParamKeys["WebPartInstanceId"] = "webPartInstanceId";
    ReservedIframeQueryParamKeys["NewWebPartInstanceId"] = "newWebPartInstanceId";
    ReservedIframeQueryParamKeys["ParentWindowOrigin"] = "parentWindowOrigin";
    ReservedIframeQueryParamKeys["ComponentId"] = "componentId";
    ReservedIframeQueryParamKeys["HostedInCanvas"] = "hostedInCanvas";
    ReservedIframeQueryParamKeys["OpenPropertyPane"] = "openPropertyPane";
})(ReservedIframeQueryParamKeys || (ReservedIframeQueryParamKeys = {}));


/***/ }),

/***/ "Ove4":
/*!********************************************************************************!*\
  !*** ./lib/chunks/IframedWebPartController/IframedPropertyPane.module.scss.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./IframedPropertyPane.module.css */ "1BD2");
var styles = {
    spIFramePropertyPaneContainer: 'spIFramePropertyPaneContainer_d650a156',
    showPane: 'showPane_d650a156',
    hidePane: 'hidePane_d650a156',
    shrinkContent: 'shrinkContent_d650a156',
    iframeWebPart: 'iframeWebPart_d650a156',
    iframePropertyPane: 'iframePropertyPane_d650a156'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "ayGF":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/chunks/IframedWebPartController/IframedPropertyPane.module.css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".spIFramePropertyPaneContainer_d650a156{top:0;width:340px;position:relative;z-index:999;transition:width 367ms cubic-bezier(.1,.9,.2,1);-webkit-transition:width 367ms cubic-bezier(.1,.9,.2,1)}[id^=spIFramePropertyPaneContainer].showPane_d650a156{bottom:0;background-color:\"[theme:bodyBackground, default: #ffffff]\"}[dir=ltr] [id^=spIFramePropertyPaneContainer].showPane_d650a156{right:0}[dir=rtl] [id^=spIFramePropertyPaneContainer].showPane_d650a156{left:0}[dir=ltr] [id^=spIFramePropertyPaneContainer].showPane_d650a156{border-left-width:1px}[dir=rtl] [id^=spIFramePropertyPaneContainer].showPane_d650a156{border-right-width:1px}[dir=ltr] [id^=spIFramePropertyPaneContainer].showPane_d650a156{border-left-style:solid}[dir=rtl] [id^=spIFramePropertyPaneContainer].showPane_d650a156{border-right-style:solid}[dir=ltr] [id^=spIFramePropertyPaneContainer].showPane_d650a156{border-left-color:\"[theme:neutralLight, default: #edebe9]\"}[dir=rtl] [id^=spIFramePropertyPaneContainer].showPane_d650a156{border-right-color:\"[theme:neutralLight, default: #edebe9]\"}[id^=spIFramePropertyPaneContainer].showPane_d650a156 button{display:block}[id^=spIFramePropertyPaneContainer].hidePane_d650a156{width:0;transition:width 367ms cubic-bezier(.1,.9,.2,1);-webkit-transition:width 367ms cubic-bezier(.1,.9,.2,1)}[dir=ltr] [id^=spPageChromeAppDiv].shrinkContent_d650a156{right:340px}[dir=rtl] [id^=spPageChromeAppDiv].shrinkContent_d650a156{left:340px}.iframeWebPart_d650a156{width:100%;height:100%;height:-webkit-fill;height:-moz-fill;border:0}.iframePropertyPane_d650a156{width:100%;height:100%;float:left;border:none}", ""]);



/***/ })

}]);
//# sourceMappingURL=chunk.sp-webpart-base-iframedwebpartcontroller_7b23fd1a387aca8e56a1.js.map