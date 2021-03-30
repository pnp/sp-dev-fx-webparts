(window["webpackJsonp_85093aa7_8c12_4683_91aa_47cd5e2654db_2_5_0"] = window["webpackJsonp_85093aa7_8c12_4683_91aa_47cd5e2654db_2_5_0"] || []).push([["sp-canvas-edit"],{

/***/ "+LOX":
/*!***********************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/toolbar/Toolbar.js ***!
  \***********************************************************/
/*! exports provided: Toolbar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Toolbar", function() { return Toolbar; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Toolbar_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Toolbar.scss */ "Hcv0");





var Toolbar = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Toolbar, _super);
    function Toolbar(props) {
        var _this = _super.call(this, props) || this;
        _this._directionalHint = _this.props.directionalHint;
        return _this;
    }
    Toolbar.prototype.componentDidMount = function () {
        if (this.props.toolbarDidMount) {
            this.props.toolbarDidMount(this);
        }
    };
    Toolbar.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, fixedPosition = _a.fixedPosition;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["FocusZone"], { isCircularNavigation: true },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: className || 'CanvasControlToolbar', "data-automation-id": 'canvas-control-toolbar', style: fixedPosition, role: 'toolbar', ref: function (ref) { return (_this._domElement = ref); } },
                this._configurationButton,
                this._moveHandle,
                this._duplicateButton,
                this._deleteButton)));
    };
    Toolbar.prototype.getHeight = function () {
        return this._domElement ? this._domElement.clientHeight : 0;
    };
    Object.defineProperty(Toolbar.prototype, "toolBarElement", {
        get: function () {
            return this._domElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toolbar.prototype, "_deleteButton", {
        get: function () {
            if (!this.props.deleteButton) {
                return false;
            }
            var _a = this.props.deleteButton, title = _a.title, onClick = _a.onClick;
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_3__["ToolbarButton"], { canBeActive: false, fabricIconKey: 'Trash', onClick: onClick, title: title, automationId: 'deleteButton', directionalHint: this._directionalHint }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toolbar.prototype, "_configurationButton", {
        get: function () {
            if (!this.props.configurationButton) {
                return undefined;
            }
            var _a = this.props.configurationButton, fabricIconKey = _a.fabricIconKey, title = _a.title, onClick = _a.onClick;
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_3__["ToolbarButton"], { canBeActive: false, fabricIconKey: fabricIconKey + "Edit", onClick: onClick, title: title, automationId: 'configureButton', directionalHint: this._directionalHint }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toolbar.prototype, "_moveHandle", {
        get: function () {
            if (!this.props.moveButton) {
                return undefined;
            }
            var _a = this.props.moveButton, dragHandleTag = _a.dragHandleTag, title = _a.title;
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_3__["ToolbarButton"], { canBeActive: false, fabricIconKey: 'Move', title: title, automationId: 'moveButton', dragHandleTag: dragHandleTag, directionalHint: this._directionalHint }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toolbar.prototype, "_duplicateButton", {
        get: function () {
            if (!this.props.duplicateButton) {
                return undefined;
            }
            var title = this.props.duplicateButton.title;
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_3__["ToolbarButton"], { fabricIconKey: 'Copy', onClick: this.props.duplicateButton.onClick, title: title, directionalHint: this._directionalHint }));
        },
        enumerable: true,
        configurable: true
    });
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], Toolbar.prototype, "getHeight", null);
    return Toolbar;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));



/***/ }),

/***/ "//O0":
/*!***********************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasToolbox/CanvasToolbox.js ***!
  \***********************************************************************/
/*! exports provided: CanvasToolbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasToolbox", function() { return CanvasToolbox; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DeferredCanvasToolbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DeferredCanvasToolbox */ "7JSu");




var CanvasToolbox = /** @class */ (function () {
    function CanvasToolbox() {
    }
    /**
     * Render Toolbox component, and resolve the toolbox reference when it finishes rendering.
     * @param toolboxProps - The props of Toolbox component
     * @returns - The Promise which resolves the Toolbox reference for open/close actions.
     */
    CanvasToolbox.render = function (toolboxProps) {
        return new Promise(function (resolve) {
            var toolboxComponent = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_DeferredCanvasToolbox__WEBPACK_IMPORTED_MODULE_3__["DeferredToolboxComponent"], {
                deferredProps: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, toolboxProps, { instanceRef: function (instance) { return resolve(CanvasToolbox._toolboxRef = instance); } })
            });
            react_dom__WEBPACK_IMPORTED_MODULE_2__["render"](toolboxComponent, CanvasToolbox._toolboxContainer);
            // When ref exists, it means the previous rendered toolbox is still mounted, we can return the ref directly.
            // Because if toolboxProps doesn't change, instanceRef will not be called twice.
            // When toolboxProps changes, we cannot omit ReactDOM.render as we need still need to update Toolbox pros.
            if (CanvasToolbox._toolboxRef) {
                resolve(CanvasToolbox._toolboxRef);
            }
        });
    };
    CanvasToolbox.close = function () {
        if (CanvasToolbox._toolboxRef) {
            CanvasToolbox._toolboxRef.closeToolbox();
        }
    };
    Object.defineProperty(CanvasToolbox, "_toolboxContainer", {
        get: function () {
            if (!CanvasToolbox._toolboxContainerInternal ||
                !document.body.contains(CanvasToolbox._toolboxContainerInternal)) {
                CanvasToolbox._toolboxContainerInternal = document.createElement('div');
                document.body.appendChild(CanvasToolbox._toolboxContainerInternal);
            }
            return CanvasToolbox._toolboxContainerInternal;
        },
        enumerable: true,
        configurable: true
    });
    return CanvasToolbox;
}());



/***/ }),

/***/ "/M9o":
/*!*******************************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasZonePropertyPane/CanvasZoneEmphasisButton.module.scss.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./CanvasZoneEmphasisButton.module.css */ "NbyJ");
var styles = {
    emphasisPickerButton: 'emphasisPickerButton_4098c40d',
    isNone: 'isNone_4098c40d',
    isSelected: 'isSelected_4098c40d'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "/g48":
/*!*********************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasDragZone/index-edit.js ***!
  \*********************************************************************/
/*! exports provided: CanvasSectionDragZoneUtils, CanvasWebPartDragZoneUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CanvasSectionDragZoneUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasSectionDragZoneUtils */ "l9Wn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasSectionDragZoneUtils", function() { return _CanvasSectionDragZoneUtils__WEBPACK_IMPORTED_MODULE_0__["CanvasSectionDragZoneUtils"]; });

/* harmony import */ var _CanvasWebPartDragZoneUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasWebPartDragZoneUtils */ "DjSq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasWebPartDragZoneUtils", function() { return _CanvasWebPartDragZoneUtils__WEBPACK_IMPORTED_MODULE_1__["CanvasWebPartDragZoneUtils"]; });





/***/ }),

/***/ "4RHQ":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Styling.js ***!
  \*********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Styling.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "533C":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/sp-canvas/canvas/editChunk/canvasDragZone/CanvasDragZone.module.css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".dragIconContainer_ce2c2874{position:absolute;top:0;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;text-align:center;font-size:32px;color:\"[theme:neutralLighterAlt, default: #faf9f8]\";pointer-events:none}.dragIconContainer_ce2c2874,.dragIconContainer_ce2c2874 .dragIcon_ce2c2874{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.dragIconContainer_ce2c2874 .dragIcon_ce2c2874{width:50px;height:50px;background-color:\"[theme:themePrimary, default: #0078d4]\";-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.dragIconContainer_ce2c2874 .dragIcon_ce2c2874 .ms-Icon{font-size:32px;padding:9px}.dragIconContainer_ce2c2874 .dragText_ce2c2874{height:22px;padding:4px;max-width:200px;font-size:15px!important;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;background-color:rgba(0,0,0,.5);color:#fff;font-family:Segoe UI Light WestEuropean,Segoe UI Light,Segoe WP Light,Segoe UI,Segoe WP,Tahoma,Arial,sans-serif}.dragIconContainer_ce2c2874 .singleColumn_ce2c2874:before{content:\"\\F1D3\"}.dragIconContainer_ce2c2874 .doubleColumn_ce2c2874:before{content:\"\\F1D4\"}.dragIconContainer_ce2c2874 .tripleColumn_ce2c2874:before{content:\"\\F1D5\"}.dragIconContainer_ce2c2874 .columnLeftTwoThirds_ce2c2874:before{content:\"\\F1D6\"}.dragIconContainer_ce2c2874 .columnRightTwoThirds_ce2c2874:before{content:\"\\F1D7\"}.disabledArea_ce2c2874{position:relative}.disabledArea_ce2c2874:before{background-color:\"[theme:neutralSecondary, default: #605e5c]\";content:\"\";display:block;position:absolute;height:100%;width:100%;z-index:100;opacity:.6}", ""]);



/***/ }),

/***/ "5zIm":
/*!******************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasToolboxHint/LayoutCanvasToolboxHint.scss.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./LayoutCanvasToolboxHint.css */ "R6FH");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "9MOG":
/*!************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/toolbar/Toolbar.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./Toolbar.css */ "jOYA");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "CtN6":
/*!*****************************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasZonePropertyPane/canvasZonePropertyPaneStrings.resx.js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_dxPPhXzV27f2yBrPm3n1CQ';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "DNmk":
/*!******************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasStore/CanvasStoreEditActions.js ***!
  \******************************************************************************/
/*! exports provided: CanvasStoreEditActions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasStoreEditActions", function() { return CanvasStoreEditActions; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-page-context */ "X+PM");
/* harmony import */ var _microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../common/KillSwitches */ "17t3");
/* harmony import */ var _canvasStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../canvasStore */ "yRr9");
/* harmony import */ var _canvasControl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../canvasControl */ "iO6m");
/* harmony import */ var _canvasLayout__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../canvasLayout */ "yPt8");
/* harmony import */ var _a11y_CanvasA11yConstants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../a11y/CanvasA11yConstants */ "AqUB");
/* harmony import */ var _canvasComponent__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../canvasComponent */ "j0qU");
/* harmony import */ var _shouldExcludeFromToolbox__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./shouldExcludeFromToolbox */ "Vp7h");
/* harmony import */ var _canvasSection__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../canvasSection */ "JqQl");
/* harmony import */ var _common_ComponentPerfLogger__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../common/ComponentPerfLogger */ "RtnV");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../common/Flights */ "qRiB");
/* harmony import */ var _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../loc/CanvasStrings.resx */ "K08d");
/* harmony import */ var _webPartFactory_WebPartFactory__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../webPartFactory/WebPartFactory */ "v9l7");
/* harmony import */ var _canvasToolbox_CanvasToolbox__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../canvasToolbox/CanvasToolbox */ "//O0");
/* harmony import */ var _canvasToolbox_ToolboxConstants__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../canvasToolbox/ToolboxConstants */ "OfOi");
/* harmony import */ var _canvasToolbox_RteToolboxItemData__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../canvasToolbox/RteToolboxItemData */ "d67+");
/* harmony import */ var _SmoothTasksQueue__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./SmoothTasksQueue */ "gVme");

























var SECTION_ITEM_GROUPID = '19ede092-2988-4759-9b2f-5396b160ce68';
var CANVAS_ELEMENT_DELETION = 'canvasElementDeleted';
var CanvasStoreEditActions = /** @class */ (function () {
    function CanvasStoreEditActions() {
    }
    CanvasStoreEditActions._isWebPartSerializationV1Enabled = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPFlight"].isEnabled(974 /*SPPPLATClientSideWebPartSerializationV1*/);
    };
    CanvasStoreEditActions.addRTEInCanvas = function (rteCanvasControl, store, shouldPersistData) {
        if (shouldPersistData === void 0) { shouldPersistData = true; }
        var spaceNormalizedInnerHtml;
        var shouldAddRTE;
        if (rteCanvasControl.innerHTML) {
            spaceNormalizedInnerHtml = rteCanvasControl.innerHTML.replace(CanvasStoreEditActions._REMOVE_HTMLTAGS_REGEX, '');
            spaceNormalizedInnerHtml = spaceNormalizedInnerHtml.replace(CanvasStoreEditActions._REMOVE_SPACES_REGEX, '');
            shouldAddRTE = spaceNormalizedInnerHtml !== '';
        }
        // We do not want to add empty RTE.
        if (shouldAddRTE) {
            store.addControlToCanvas(rteCanvasControl, true, shouldPersistData);
        }
    };
    CanvasStoreEditActions.getToolBoxItem = function (canvasFields, id) {
        var toolboxItems = CanvasStoreEditActions
            .getToolboxItems(canvasFields, "WebPart" /* WebPart */, _canvasLayout__WEBPACK_IMPORTED_MODULE_12__["undefinedControlPosition"]);
        var currentIndex = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__["findIndex"])(toolboxItems, function (toolboxItem) {
            return id === toolboxItem.itemData.webPartId;
        });
        if (currentIndex !== -1) {
            return Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__["clone"])(toolboxItems[currentIndex].itemData);
        }
        return undefined;
    };
    CanvasStoreEditActions.getEventName = function (eventName) {
        return "Canvas." + eventName + ".Click";
    };
    CanvasStoreEditActions.getSectionToolboxItems = function (canvasFields, position) {
        var items = [
            {
                description: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxOneColumnPart,
                displayName: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxOneColumnPart,
                itemData: CanvasStoreEditActions._createSectionItemProps(_canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].OneColumn, position),
                id: 'SingleColumnSectionToolboxItem',
                msIconName: 'SingleColumn',
                groupId: SECTION_ITEM_GROUPID
            },
            {
                description: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxTwoColumnPart,
                displayName: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxTwoColumnPart,
                itemData: CanvasStoreEditActions._createSectionItemProps(_canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].TwoColumns, position),
                id: 'DoubleColumnSectionToolboxItem',
                msIconName: 'DoubleColumn',
                groupId: SECTION_ITEM_GROUPID
            },
            {
                description: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxThreeColumnPart,
                displayName: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxThreeColumnPart,
                itemData: CanvasStoreEditActions._createSectionItemProps(_canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].ThreeColumns, position),
                id: 'TripleColumnSectionToolboxItem',
                msIconName: 'TripleColumn',
                groupId: SECTION_ITEM_GROUPID
            },
            {
                description: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxOneThirdLeftColumnPart,
                displayName: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxOneThirdLeftColumnPart,
                itemData: CanvasStoreEditActions._createSectionItemProps(_canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].OneThirdColumnLeft, position),
                id: 'ColumnRightTwoThirdsSectionToolboxItem',
                msIconName: 'ColumnRightTwoThirds',
                groupId: SECTION_ITEM_GROUPID
            },
            {
                description: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxOneThirdRightColumnPart,
                displayName: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxOneThirdRightColumnPart,
                itemData: CanvasStoreEditActions._createSectionItemProps(_canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].OneThirdColumnRight, position),
                id: 'ColumnLeftTwoThirdsSectionToolboxItem',
                msIconName: 'ColumnLeftTwoThirds',
                groupId: SECTION_ITEM_GROUPID
            }
        ];
        if (canvasFields.siteSupportsFullWidth) {
            items.push({
                description: !canvasFields.canAddFullWidthSection ? _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxFullWidthColumnTooltipText : '',
                displayName: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxFullWidthColumnPart,
                itemData: CanvasStoreEditActions._createSectionItemProps(_canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].FullWidth, position),
                id: 'FullWidthSectionToolboxItem',
                msIconName: 'FullWidth',
                groupId: SECTION_ITEM_GROUPID,
                disabled: !canvasFields.canAddFullWidthSection
            });
        }
        items.push({
            description: !canvasFields.canAddVerticalSection ? _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxVerticalColumnToolTipText : '',
            displayName: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxVerticalColumnPart,
            itemData: this._createSectionItemProps(_canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].OneColumn, CanvasStoreEditActions._verticalSectionToolboxPosition),
            id: 'VerticalSectionToolboxItem',
            msIconName: 'ColumnVerticalSection',
            groupId: SECTION_ITEM_GROUPID,
            disabled: !canvasFields.canAddVerticalSection
        });
        return items;
    };
    CanvasStoreEditActions.getToolboxItems = function (canvasFields, type, position) {
        if (type === "Section" /* Section */) {
            return CanvasStoreEditActions.getSectionToolboxItems(canvasFields, position);
        }
        var qos = _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].createQosScope('LoadWebPartsInToolbox');
        try {
            var toolboxItems_1 = type === "WebPart" /* WebPart */
                ? [Object(_canvasToolbox_RteToolboxItemData__WEBPACK_IMPORTED_MODULE_23__["getRteToolboxItemData"])(position)]
                : [];
            _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].getManifestMap(canvasFields).forEach(function (manifest, cid) {
                if (Object(_shouldExcludeFromToolbox__WEBPACK_IMPORTED_MODULE_15__["shouldExcludeFromToolbox"])(manifest, canvasFields.pageContext)) {
                    return;
                }
                var i = 0;
                for (var _i = 0, _a = manifest.preconfiguredEntries; _i < _a.length; _i++) {
                    var entry = _a[_i];
                    var itemProps = {
                        controlType: _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone,
                        id: undefined,
                        position: position,
                        webPartId: cid,
                        webPartData: CanvasStoreEditActions._extractWebPartData(manifest, entry),
                        webPartManifest: manifest
                    };
                    var iconUrl = entry.iconImageUrl;
                    if (iconUrl && !_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["UrlUtilities"].isDataUrl(iconUrl)) {
                        iconUrl = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["UrlUtilities"].resolve(iconUrl, manifest.loaderConfig.internalModuleBaseUrls[0]);
                    }
                    var displayName = entry.title.default;
                    if (itemProps.webPartManifest &&
                        itemProps.webPartManifest.id === '31e9537e-f9dc-40a4-8834-0e3b7df418bc') {
                        displayName = _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].YammerHighlightsWebpartTitle;
                    }
                    // Todo#661360 Fix workaround left-over
                    var toolboxItem = {
                        itemData: itemProps,
                        description: entry.description.default,
                        displayName: displayName,
                        msIconName: entry.officeFabricIconFontName,
                        imageSrc: iconUrl,
                        id: manifest.id + "_" + i++,
                        groupId: entry.groupId
                    };
                    if (type !== "FullWidth" /* FullWidth */ || _canvasSection__WEBPACK_IMPORTED_MODULE_16__["CanvasFullWidthSection"].isFullWidthControl(itemProps)) {
                        toolboxItems_1.push(toolboxItem);
                    }
                }
            });
            qos.writeSuccess();
            return toolboxItems_1;
        }
        catch (err) {
            _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].handleMonitoredException(qos, err);
            return [];
        }
    };
    CanvasStoreEditActions.tryMatchContentHandlerAndSplit = function (innerHTML, position, data, store) {
        var pasteMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"]('RTEOnPasteFromExternalSource');
        var tryGetWebPartResult = _webPartFactory_WebPartFactory__WEBPACK_IMPORTED_MODULE_20__["WebPartFactory"].getWebPart(data, store);
        if (tryGetWebPartResult.webPartResultType !== "SUCCESS" /* SUCCESS */) {
            if (tryGetWebPartResult.webPartResultType === "FileTypeNotSupported" /* FILE_TYPE_NOT_SUPPORTED */) {
                pasteMonitor.writeExpectedFailure(tryGetWebPartResult.webPartResultType);
            }
            else {
                pasteMonitor.writeUnexpectedFailure(tryGetWebPartResult.webPartResultType);
            }
            return;
        }
        pasteMonitor.writeSuccess();
        var webPartProps = tryGetWebPartResult.webPartDataProps;
        var rteCanvasContent = {
            controlType: _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].RTE,
            id: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].newGuid().toString(),
            position: _canvasLayout__WEBPACK_IMPORTED_MODULE_12__["undefinedControlPosition"],
            innerHTML: innerHTML
        };
        this._addRTEAndWebPart(position, rteCanvasContent, webPartProps, store);
    };
    CanvasStoreEditActions.createFluidWebPart = function (componentUrl, innerHTML, position, store) {
        var fluidEmbedManifest = _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].getManifestMap(store.canvasFields).get('aa986256-02ae-4e20-b2ab-76de490e3d5d');
        var fluidControl = {
            position: position,
            controlType: _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone,
            id: undefined,
            webPartId: fluidEmbedManifest.id,
            webPartData: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, CanvasStoreEditActions._extractWebPartData(fluidEmbedManifest, fluidEmbedManifest.preconfiguredEntries[0]), { properties: { componentUrl: componentUrl } }),
            webPartManifest: fluidEmbedManifest
        };
        if (innerHTML !== undefined) {
            CanvasStoreEditActions._addRTEAndWebPart(position, {
                controlType: _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].RTE,
                id: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].newGuid().toString(),
                position: _canvasLayout__WEBPACK_IMPORTED_MODULE_12__["undefinedControlPosition"],
                innerHTML: innerHTML
            }, fluidControl, store);
        }
        else {
            store.addControlToCanvas(fluidControl, true);
        }
    };
    CanvasStoreEditActions._convertClickItemInfo = function (info) {
        if (info.size === "Small" /* Small */) {
            return {
                source: info.size,
                view: '',
                queryLength: info.query.length.toString()
            };
        }
        else {
            return {
                source: info.size,
                view: info.query ? 'Search' : info.view.type,
                queryLength: info.query.length.toString()
            };
        }
    };
    CanvasStoreEditActions._byFeaturedOrNonExisting = function (item, existingWebPartIds) {
        return _canvasToolbox_ToolboxConstants__WEBPACK_IMPORTED_MODULE_22__["FEATURED_ITEM_IDS_FOR_TOPIC_PAGE"].indexOf(item.id) > -1
            || (_canvasToolbox_ToolboxConstants__WEBPACK_IMPORTED_MODULE_22__["TOPIC_ITEM_IDS"].indexOf(item.id) > -1
                // existingWebPartsIds contains web part ids that do not have suffix _index
                && existingWebPartIds.indexOf(item.id.substr(0, item.id.length - 2)) === -1);
    };
    CanvasStoreEditActions._shouldUpdateToolboxForTopicPage = function () {
        return _common_Flights__WEBPACK_IMPORTED_MODULE_18__["Flights"].isTopicPageEnabled()
            && !_common_KillSwitches__WEBPACK_IMPORTED_MODULE_9__["KillSwitches"].isToolboxSupportTopicPage.isActivated();
    };
    CanvasStoreEditActions._addRTEAndWebPart = function (position, rteCanvasControl, itemPropsWebPart, store) {
        var controls = store.canvasLayout.fetchAllControls();
        var currentIndex = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__["findIndex"])(controls, function (control) {
            return (position.zoneIndex === control.position.zoneIndex &&
                position.sectionIndex === control.position.sectionIndex &&
                position.controlIndex === control.position.controlIndex &&
                position.sectionFactor === control.position.sectionFactor);
        });
        var nextIndex = currentIndex + 1;
        var nextControlPosition;
        if (nextIndex < controls.length &&
            controls[nextIndex].position.zoneIndex === position.zoneIndex &&
            controls[nextIndex].position.sectionIndex === position.sectionIndex) {
            // If the zone indexes and section indexes are same, then it means that
            // the next control is in same section as the current control
            nextControlPosition = controls[nextIndex].position;
            itemPropsWebPart.position = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__["clone"])(nextControlPosition);
            // We don't want to persist the data immediately when this gets called when web part is added by drag and drop,
            // web part zone will notify canvas once the web part is mounted and initialized.
            store.addControlToCanvas(itemPropsWebPart, true /* shouldRender */, !_common_Flights__WEBPACK_IMPORTED_MODULE_18__["Flights"].isPageUndoRedoFlightEnabled() /* shouldPersistData */);
            rteCanvasControl.position = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__["clone"])(nextControlPosition);
            CanvasStoreEditActions.addRTEInCanvas(rteCanvasControl, store, !_common_Flights__WEBPACK_IMPORTED_MODULE_18__["Flights"].isPageUndoRedoFlightEnabled() /* shouldPersistData */);
        }
        else {
            // If there is no control after the current control in the same section, then create
            // a new position and add the control
            nextControlPosition = {
                zoneIndex: position.zoneIndex,
                sectionIndex: position.sectionIndex,
                sectionFactor: position.sectionFactor,
                controlIndex: position.controlIndex === undefined ? undefined : position.controlIndex + 1,
                layoutIndex: position.layoutIndex
            };
            rteCanvasControl.position = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__["clone"])(nextControlPosition);
            CanvasStoreEditActions.addRTEInCanvas(rteCanvasControl, store, !_common_Flights__WEBPACK_IMPORTED_MODULE_18__["Flights"].isPageUndoRedoFlightEnabled() /* shouldPersistData */);
            itemPropsWebPart.position = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_4__["clone"])(nextControlPosition);
            // We don't want to persist the data immediately when this get called when web part is added by drag and drop,
            // web part zone will notify canvas once the web part is mounted and initialized.
            store.addControlToCanvas(itemPropsWebPart, true /* shouldRender */, !_common_Flights__WEBPACK_IMPORTED_MODULE_18__["Flights"].isPageUndoRedoFlightEnabled() /* shouldPersistData */);
        }
    };
    CanvasStoreEditActions._markWebPartDeletion = function (canvasFields, control) {
        canvasFields.webPartManager.onWebPartDelete(control.id);
        var webPartData = control.webPartData;
        if (webPartData && _canvasStore__WEBPACK_IMPORTED_MODULE_10__["EUPL_APPROVED_WEB_PARTS"].has(webPartData.id)) {
            canvasFields.euplApprovedWebpartCount--;
        }
    };
    CanvasStoreEditActions._renderAfterDeletionAndAdjustFocus = function (canvasFields, position, onDelete) {
        var elementToFocusOnDismiss = CanvasStoreEditActions._findHintBeforePosition(canvasFields, position);
        onDelete();
        var confirmationMessage = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_7__["StringHelper"].format(_loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].DeleteConfirmationLabel, _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].SectionAriaLabel);
        canvasFields.a11yManager.alert(confirmationMessage);
        canvasFields.render(function () {
            if (elementToFocusOnDismiss) {
                elementToFocusOnDismiss.focus();
            }
        });
        canvasFields.handleCanvasChanged();
    };
    CanvasStoreEditActions._extractWebPartData = function (manifest, // tslint:disable-line:no-any
    entry // tslint:disable-line:no-any
    ) {
        // Todo#661360 Fix workaround left-over
        var webPartData = {
            id: manifest.id,
            instanceId: undefined,
            title: entry.title.default,
            description: entry.description.default,
            dataVersion: entry.dataVersion,
            properties: entry.properties
        };
        return webPartData;
    };
    CanvasStoreEditActions._createSectionItemProps = function (controlType, position) {
        return {
            controlType: controlType,
            position: position,
            id: undefined // Todo#661360 Fix workaround left-over
        };
    };
    CanvasStoreEditActions._scroll = function (canvasFields, start, end, duration, time) {
        if (time === void 0) { time = 0; }
        var diff = end - start;
        var deltaTime = 20;
        if (time < duration) {
            requestAnimationFrame(function () {
                time += deltaTime;
                canvasFields.scrollableParent.scrollTop = CanvasStoreEditActions._calculateEasing(time, start, diff, duration);
                CanvasStoreEditActions._scroll(canvasFields, start, end, duration, time);
            });
        }
    };
    CanvasStoreEditActions._scrollElementIntoView = function (canvasFields, frameBottom, element, duration, margin, parentClientRect, elementClientRect) {
        var scrollPosition = elementClientRect.bottom - canvasFields.canvasElement.getBoundingClientRect().top;
        var frameTop = Math.max(0, parentClientRect.top);
        var offset = frameTop - frameBottom + canvasFields.scrollThreshold + margin;
        var newScrollTop = scrollPosition + offset + canvasFields.scrollThreshold;
        CanvasStoreEditActions._scroll(canvasFields, canvasFields.scrollableParent.scrollTop, newScrollTop, duration);
    };
    CanvasStoreEditActions._findHintBeforePosition = function (canvasFields, position) {
        var isZone = position.controlIndex === undefined && position.zoneIndex !== undefined;
        var elementToDelete;
        if (isZone) {
            elementToDelete = canvasFields.a11yManager.getElementByA11yId(Object(_a11y_CanvasA11yConstants__WEBPACK_IMPORTED_MODULE_13__["getCanvasZoneA11yId"])(position.zoneIndex.toString()));
        }
        else {
            var control = canvasFields.getControl(position);
            elementToDelete = control
                ? canvasFields.a11yManager.getElementByA11yId(Object(_a11y_CanvasA11yConstants__WEBPACK_IMPORTED_MODULE_13__["getControlZoneA11yId"])(control.id))
                : undefined;
        }
        if (elementToDelete) {
            var hints = canvasFields.a11yManager.getElementsByA11yClass(_a11y_CanvasA11yConstants__WEBPACK_IMPORTED_MODULE_13__["canvasA11yClasses"].toolboxHint);
            for (var i = 0; i < hints.length - 1; i++) {
                // Check if the control element is between the current hint and the next one
                /* tslint:disable:no-bitwise */
                var isHintBeforeZone = (elementToDelete.compareDocumentPosition(hints[i]) & Node.DOCUMENT_POSITION_PRECEDING) !== 0;
                var isNextHintAfterZone = (elementToDelete.compareDocumentPosition(hints[i + 1]) &
                    (Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY)) !==
                    0;
                /* tslint:enable:no-bitwise */
                if (isHintBeforeZone && isNextHintAfterZone) {
                    return hints[i];
                }
            }
        }
        return undefined;
    };
    CanvasStoreEditActions._openDialogMessage = function (title, message, onConfirmation, onDismiss) {
        _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_6__["DialogUtility"].showConfirmationDialog(title, false, /* element */ onConfirmation, onDismiss, message, true /* ignoreExternalFocus */);
    };
    /**
     * Calculates the easing number using the quadratic in-out formula
     */
    CanvasStoreEditActions._calculateEasing = function (time, start, diff, duration) {
        time /= duration / 2;
        if (time < 1) {
            return (diff / 2) * time * time + start;
        }
        else {
            --time;
            return (-diff / 2) * (time * (time - 2) - 1) + start;
        }
    };
    CanvasStoreEditActions._cloneControl = function (control) {
        var duplicateControlData = control.serialize();
        duplicateControlData.addedFromPersistedData = true;
        var newId = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].newGuid().toString();
        duplicateControlData.id = newId;
        if (duplicateControlData.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone) {
            duplicateControlData.webPartData.instanceId = newId;
        }
        return duplicateControlData;
    };
    CanvasStoreEditActions._isNoConfirmationExperimentOn = function () {
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_18__["Flights"].isPageUndoRedoFlightEnabled()) {
            if (!CanvasStoreEditActions._deleteConfirmationExperiment) {
                CanvasStoreEditActions._deleteConfirmationExperiment = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_8__["_ABExperiment"]({
                    name: 'NoConfirmationsOnDeleteWithPagesUndo',
                    startDate: '08/13/2019'
                });
            }
            return CanvasStoreEditActions._deleteConfirmationExperiment.IsExperimentOn() ||
                !!sessionStorage.getItem('spfx-debug'); // force for tests to avoid experiment faking;
        }
        return false;
    };
    CanvasStoreEditActions._afterReadModeSwitched = function (canvasFields) {
        canvasFields.selectedControlIdInternal = undefined;
        void canvasFields.propertyPaneLoader.propertyPane.then(function (propertyPane) {
            propertyPane.requestAction(undefined, 2 /* Close */);
        });
        CanvasStoreEditActions.closeToolbox(canvasFields);
    };
    CanvasStoreEditActions._verticalSectionToolboxPosition = Object(_canvasComponent__WEBPACK_IMPORTED_MODULE_14__["CreateEmptyZoneLayout"])(1, // Zone index
    1, // Section index
    undefined, // Control index
    _canvasLayout__WEBPACK_IMPORTED_MODULE_12__["CanvasLayout"].verticalLayoutIndex);
    CanvasStoreEditActions._REMOVE_HTMLTAGS_REGEX = new RegExp(/<([^>]+)>|&nbsp;/g);
    CanvasStoreEditActions._REMOVE_SPACES_REGEX = new RegExp(/\\s+/g);
    CanvasStoreEditActions.setDisplayModeCore = function (canvasFields, newMode) {
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_18__["Flights"].isEditTransitionPerFrame()) {
            var setDisplayModeTasks = canvasFields.canvasControls
                .map(function (control) {
                var controlComponent = canvasFields.getControlComponentById(control.id);
                return controlComponent ? function () { return controlComponent.setDisplayMode(newMode); } : function () { return Promise.resolve(undefined); };
            });
            return Object(_SmoothTasksQueue__WEBPACK_IMPORTED_MODULE_24__["runTasksWithoutBlockingAnimation"])([
                function () { return new Promise(function (resolve) {
                    if (newMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Read) {
                        CanvasStoreEditActions._afterReadModeSwitched(canvasFields);
                    }
                    canvasFields.render(resolve);
                }); }
            ].concat(setDisplayModeTasks))
                .then(function () {
                if (_common_Flights__WEBPACK_IMPORTED_MODULE_18__["Flights"].isAnchorFlightEnabled() && newMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Read) {
                    _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPEventManager"].instance.raiseEvent('anchorEvent', { action: "FinishRegistration" /* FinishRegistration */ });
                }
            });
        }
        else {
            for (var _i = 0, _a = canvasFields.canvasControls; _i < _a.length; _i++) {
                var control = _a[_i];
                var controlComponent = canvasFields.getControlComponentById(control.id);
                if (controlComponent) {
                    void controlComponent.setDisplayMode(newMode);
                }
            }
            if (newMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Read) {
                CanvasStoreEditActions._afterReadModeSwitched(canvasFields);
            }
            if (_common_Flights__WEBPACK_IMPORTED_MODULE_18__["Flights"].isPageUndoRedoFlightEnabled() &&
                !_common_KillSwitches__WEBPACK_IMPORTED_MODULE_9__["KillSwitches"].tryReloadCanvasComponentWhenFailure.isActivated() &&
                canvasFields.isDOMManipulated) {
                canvasFields.disposeAndRender();
            }
            else {
                canvasFields.render();
            }
            return Promise.resolve();
        }
    };
    CanvasStoreEditActions.moveControl = function (canvasFields, control, newControlPosition) {
        // If the move is within the same layout index, let layout handle the move
        if (control.position.layoutIndex === newControlPosition.layoutIndex) {
            canvasFields.canvasLayout.moveControl(control, newControlPosition);
        }
        else {
            // Todo#661360 Fix workaround left-over
            canvasFields.canvasLayouts.get(control.position.layoutIndex).removeControl(control.position);
            control.position = newControlPosition;
            if (control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone) {
                control.id = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].newGuid().toString();
            }
            // Todo#661360 Fix workaround left-over
            canvasFields.canvasLayouts.get(newControlPosition.layoutIndex).addControl(control);
            canvasFields.render();
            if (_common_Flights__WEBPACK_IMPORTED_MODULE_18__["Flights"].isPageUndoRedoFlightEnabled()) {
                canvasFields.handleCanvasChanged({
                    selectedControlId: control.id
                });
            }
        }
    };
    CanvasStoreEditActions.openToolbox = function (canvasFields, type, position, target, onClose) {
        var qos = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"]('Canvas.openToolbox');
        _common_ComponentPerfLogger__WEBPACK_IMPORTED_MODULE_17__["ComponentPerfLogger"].getInstance().start('ToolboxRender', 'ToolboxComponentDownload');
        var items = [];
        var errorMessage;
        var featuredIds;
        if (CanvasStoreEditActions._shouldUpdateToolboxForTopicPage() && canvasFields.pageLayoutType === 'Topic') {
            featuredIds = _canvasToolbox_ToolboxConstants__WEBPACK_IMPORTED_MODULE_22__["FEATURED_ITEM_IDS_FOR_TOPIC_PAGE"];
            try {
                var existingWebPartIds_1 = canvasFields.canvasControls
                    .filter(function (control) { return control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone; })
                    .map(function (control) { return control.webPartData.id; });
                // Topic page only need featured web parts and non-existing topic web parts.
                // This is a quick solution for internal demo, will be replaced in future.
                items = CanvasStoreEditActions.getToolboxItems(canvasFields, type, position)
                    .filter(function (item) { return CanvasStoreEditActions._byFeaturedOrNonExisting(item, existingWebPartIds_1); });
            }
            catch (e) {
                errorMessage = _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxErrorMessage;
            }
        }
        else {
            featuredIds = _canvasToolbox_ToolboxConstants__WEBPACK_IMPORTED_MODULE_22__["FEATURED_ITEM_IDS"];
            try {
                items = CanvasStoreEditActions.getToolboxItems(canvasFields, type, position);
            }
            catch (e) {
                errorMessage = _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].ToolboxErrorMessage;
            }
        }
        var toolboxProps = {
            items: errorMessage ? new Error(errorMessage) : items,
            onClickItem: function (itemProps, info) {
                return CanvasStoreEditActions.handleToolboxItemClick(canvasFields, itemProps, info);
            },
            onCloseToolbox: function () {
                canvasFields.toolboxOpenPosition = undefined;
                if (onClose) {
                    onClose();
                }
            },
            a11yManager: canvasFields.a11yManager,
            cultureName: canvasFields.serviceScope.consume(_microsoft_sp_page_context__WEBPACK_IMPORTED_MODULE_5__["PageContext"].serviceKey).cultureInfo.currentUICultureName,
            componentPerfLogger: _common_ComponentPerfLogger__WEBPACK_IMPORTED_MODULE_17__["ComponentPerfLogger"].getInstance(),
            featuredIds: featuredIds,
            // Quick solution for internal demo, will be refined in future.
            pageLayoutType: canvasFields.pageLayoutType
        };
        canvasFields.toolboxOpenPosition = position;
        _canvasToolbox_CanvasToolbox__WEBPACK_IMPORTED_MODULE_21__["CanvasToolbox"].render(toolboxProps)
            .then(function (ref) {
            _common_ComponentPerfLogger__WEBPACK_IMPORTED_MODULE_17__["ComponentPerfLogger"].getInstance().markStage('ToolboxRender', 'ToolboxChunkDownload');
            if (type === "WebPart" /* WebPart */) {
                ref.openWebPartToolbox(target, _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].bottomCenter);
            }
            else {
                ref.openSectionToolbox(target, _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].rightTopEdge);
            }
            qos.writeSuccess();
        })
            .catch(function (error) { return qos.writeUnexpectedFailure(error); });
    };
    CanvasStoreEditActions.closeToolbox = function (canvasFields) {
        _canvasToolbox_CanvasToolbox__WEBPACK_IMPORTED_MODULE_21__["CanvasToolbox"].close();
        canvasFields.toolboxOpenPosition = undefined;
    };
    CanvasStoreEditActions.handleConfigureButtonClicked = function (canvasFields, id) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEvent(CanvasStoreEditActions.getEventName('ConfigureControl'));
        var isCurrentlySelected = canvasFields.selectedControlIdInternal === id;
        // Only toggle the Property Pane if the currently selected control's configure button is clicked.
        var controlComponent = canvasFields.getControlComponentById(id);
        if (controlComponent) {
            controlComponent.handleConfigureButtonClicked(isCurrentlySelected);
            // Set private member so we don't call requestPropertyPaneAction twice.
            canvasFields.selectedControlIdInternal = id;
            canvasFields.editedZoneIndex = undefined; // Todo#661360 Fix workaround left-over
            canvasFields.render();
        }
    };
    CanvasStoreEditActions.handleDuplicateControlButtonClicked = function (canvasFields, id) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEvent(CanvasStoreEditActions.getEventName('DuplicateControl'));
        var canvasControl = canvasFields.getControlComponentById(id);
        if (!canvasControl) {
            return;
        }
        var duplicateControlData = CanvasStoreEditActions._cloneControl(canvasControl);
        // Todo#661360 Fix workaround left-over
        var newLayoutIndex = _canvasLayout__WEBPACK_IMPORTED_MODULE_12__["CanvasLayout"].generateNewLayoutIndex(canvasFields.canvasLayout
            .fetchZone(duplicateControlData.position.zoneIndex)
            .fetchAllControls()
            .filter(function (control) { return control.position.sectionIndex === duplicateControlData.position.sectionIndex; })
            .map(function (control) {
            return { index: control.position.controlIndex };
        }), duplicateControlData.position.controlIndex, true);
        duplicateControlData.position = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, duplicateControlData.position, { controlIndex: newLayoutIndex });
        _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].addControlToCanvas(canvasFields, duplicateControlData, true);
    };
    CanvasStoreEditActions.handleDuplicateZoneButtonClicked = function (canvasFields, id) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEvent(CanvasStoreEditActions.getEventName('DuplicateZone'));
        var originalZone = canvasFields.canvasLayout.fetchZone(+id);
        var newLayoutIndex = _canvasLayout__WEBPACK_IMPORTED_MODULE_12__["CanvasLayout"].generateNewLayoutIndex(canvasFields.canvasLayout.zones, originalZone.index, true);
        originalZone.fetchAllControls(true).forEach(function (control) {
            var canvasControl = canvasFields.getControlComponentById(control.id);
            if (canvasControl) {
                var duplicateControlData = CanvasStoreEditActions._cloneControl(canvasControl);
                duplicateControlData.position = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, duplicateControlData.position, { zoneIndex: newLayoutIndex });
                _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].addControlToCanvas(canvasFields, duplicateControlData, false);
            }
            else if (!control.id && !control.controlType) {
                var duplicateControlData = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, control);
                duplicateControlData.position = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, duplicateControlData.position, { zoneIndex: newLayoutIndex });
                _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].addControlToCanvas(canvasFields, duplicateControlData, false);
            }
        });
        canvasFields.render();
        canvasFields.handleCanvasChanged();
    };
    CanvasStoreEditActions.handleConfigureZoneButtonClicked = function (canvasFields, id, zoneFocusHandler) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEvent(CanvasStoreEditActions.getEventName('ConfigureZone'));
        var isCurrentlySelected = canvasFields.editedZoneIndex === id;
        void canvasFields.propertyPaneLoader
            .propertyPane
            .then(function (propertyPaneController) {
            propertyPaneController.requestAction(id, isCurrentlySelected ? 3 /* Toggle */ : 1 /* Open */);
        });
        canvasFields.editedZoneIndex = id;
        canvasFields.editedZoneFocusHandler = zoneFocusHandler;
    };
    CanvasStoreEditActions.handleDeleteControlButtonClicked = function (canvasFields, position) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEvent(CanvasStoreEditActions.getEventName('DeleteControl'));
        canvasFields.selectedLayoutIndex = position.layoutIndex;
        var selectedControl = canvasFields.getControl(position);
        void canvasFields.propertyPaneLoader
            .propertyPane
            .then(function (propertyPaneController) {
            // Todo#661360 Fix workaround left-over
            var consumerId = selectedControl.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone
                ? canvasFields.selectedControlIdInternal
                : undefined;
            propertyPaneController.requestAction(consumerId);
        });
        canvasFields.selectedControlIdInternal = selectedControl.id;
        if (CanvasStoreEditActions._isNoConfirmationExperimentOn()) {
            CanvasStoreEditActions._deleteControl(canvasFields, position);
        }
        else {
            canvasFields.positionCandidateForDeletion = position;
            CanvasStoreEditActions._openDialogMessage(_loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].DeleteConfirmationDialogTitle, _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].DeleteConfirmationDialogMessage, function () { return CanvasStoreEditActions._handleDeleteControlDialogConfirmationDeprecated(canvasFields); }, function () { return CanvasStoreEditActions._handleDeleteControlDialogDismissDeprecated(canvasFields); });
        }
    };
    CanvasStoreEditActions.handleDeleteZoneButtonClicked = function (canvasFields, position) {
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEvent(CanvasStoreEditActions.getEventName('DeleteZone'));
        if (CanvasStoreEditActions._isNoConfirmationExperimentOn()) {
            CanvasStoreEditActions._deleteZone(canvasFields, position);
        }
        else {
            canvasFields.zoneDeleteQos = _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].createQosScope('DeleteZone');
            canvasFields.selectedControlIdInternal = undefined;
            canvasFields.positionCandidateForDeletion = position;
            CanvasStoreEditActions._openDialogMessage(_loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].DeleteConfirmationDialogTitle, _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].DeleteZoneConfirmationDialogMessage, function () { return CanvasStoreEditActions._handleDeleteZoneDialogConfirmationDeprecated(canvasFields); }, function () { return CanvasStoreEditActions._handleDeleteZoneDialogDismissDeprecated(canvasFields); });
        }
    };
    CanvasStoreEditActions.handleToolboxItemClick = function (canvasFields, itemProps, info) {
        var isZone = !(itemProps.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].RTE || itemProps.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone);
        var extraData = {};
        if (isZone && itemProps.position.layoutIndex === _canvasLayout__WEBPACK_IMPORTED_MODULE_12__["CanvasLayout"].verticalLayoutIndex) {
            var eventNameVS = 'VerticalSection';
            extraData.alias = eventNameVS;
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEvent(CanvasStoreEditActions.getEventName(eventNameVS));
        }
        var qos = _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].createQosScope('ToolboxItemClicked');
        if (canvasFields.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit) {
            canvasFields.selectedControlIdInternal = itemProps.id = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].newGuid().toString();
            _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].addControlToCanvas(canvasFields, itemProps);
            // Notify all the web parts to resize when vertical section is added
            if (itemProps.position.layoutIndex === _canvasLayout__WEBPACK_IMPORTED_MODULE_12__["CanvasLayout"].verticalLayoutIndex) {
                canvasFields.webPartManager.notifyWebPartContainerResize();
            }
            if (isZone) {
                canvasFields.selectedZoneIndex = itemProps.position.zoneIndex;
            }
            canvasFields.render();
            if (!_common_Flights__WEBPACK_IMPORTED_MODULE_18__["Flights"].isPageUndoRedoFlightEnabled() || itemProps.controlType !== _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone) {
                // We don't want to notify the change for web part. There is an implicit logic in WebPartZone
                // which will serialize the web part right after it's mounted and notify the change.
                // We need to make sure there is only one change notified when web part is added.
                canvasFields.handleCanvasChanged();
            }
            qos.writeSuccess(extraData);
            if (itemProps.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEventWithLogEntry(new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_LogEntry"]('Toolbox', 'AddWebPart', _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_LogType"].Event, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ manifestId: itemProps.webPartManifest.id }, CanvasStoreEditActions._convertClickItemInfo(info))));
            }
            else if (itemProps.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].RTE) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEventWithLogEntry(new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_LogEntry"]('Toolbox', 'AddRTE', _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_LogType"].Event, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ source: info.size }, CanvasStoreEditActions._convertClickItemInfo(info))));
            }
        }
        else {
            var error = new Error('handleToolboxItemClicked invoked in read mode');
            // This method should never be invoked when in DisplayMode.Read since the Toolbox should not be visible.
            qos.writeUnexpectedFailure('ReadMode', error, extraData);
        }
    };
    CanvasStoreEditActions.pollActiveElement = function (canvasFields) {
        var activeElement = document.activeElement;
        if (activeElement && activeElement.tagName !== 'IFRAME') {
            window.clearInterval(canvasFields.pollId);
        }
        else if (canvasFields.oldActiveElement !== activeElement && canvasFields.hoveredControlId) {
            canvasFields.oldActiveElement = activeElement;
            canvasFields.selectedControlIdInternal = canvasFields.hoveredControlId;
        }
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
    CanvasStoreEditActions.scrollIntoView = function (canvasFields, type, element, duration, margin, allowScrollUp) {
        if (margin === void 0) { margin = 0; }
        if (!canvasFields.scrollableParent || !element) {
            return;
        }
        var parentClientRect = canvasFields.scrollableParent.getBoundingClientRect();
        var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var frameBottom = Math.min(viewportHeight, parentClientRect.bottom);
        var elementClientRect = element.getBoundingClientRect();
        // 'partial' checks bottom to see if the element is partially hidden after adding, if it is scroll into view
        // 'full checks if the entire web part is hidden, if it is scroll into view
        if ((type === 'partial' ? elementClientRect.bottom : elementClientRect.top) > frameBottom ||
            (allowScrollUp && frameBottom > elementClientRect.top)) {
            CanvasStoreEditActions._scrollElementIntoView(canvasFields, frameBottom, element, duration, margin, parentClientRect, elementClientRect);
        }
    };
    CanvasStoreEditActions.reclaimFocus = function (canvasFields) {
        var selectedControlId = canvasFields.selectedControlIdInternal;
        if (selectedControlId) {
            var controlComponent = canvasFields.getControlComponentById(selectedControlId);
            if (controlComponent) {
                controlComponent.focus();
            }
        }
        else if (canvasFields.editedZoneIndex && canvasFields.editedZoneFocusHandler) {
            // This is a callback method that sets focus on the respective zone when the property pane closes
            canvasFields.editedZoneFocusHandler();
        }
    };
    /**
     * IFrame's swallow pointer events, so this is a workaround to detect when focus has shifted to
     * an IFrame. Additionally, to compensate for IFrame to IFrame interactions we poll for the document.activeElement.
     * If document.activeElement is not the same as it was in the last poll then the focus has shifted from the IFrame.
     * If the new document.activeElement is an IFrame continue polling, otherwise we can stop polling because focus
     * is back inside of the current document.
     */
    CanvasStoreEditActions.handleWindowBlur = function (canvasFields, e) {
        if (canvasFields.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit &&
            canvasFields.hoveredControlId &&
            document.activeElement &&
            document.activeElement.tagName === 'IFRAME') {
            canvasFields.selectedControlIdInternal = canvasFields.hoveredControlId;
            canvasFields.oldActiveElement = document.activeElement;
            // Before setting a new interval clear the last one, this prevents more than one poll to be active.
            window.clearInterval(canvasFields.pollId);
            canvasFields.pollId = window.setInterval(function () { return CanvasStoreEditActions.pollActiveElement(canvasFields); }, 250);
        }
    };
    CanvasStoreEditActions.updateControl = function (canvasFields, newCanvasControl) {
        var layoutIndex = newCanvasControl.position.layoutIndex;
        var layout = layoutIndex ? canvasFields.canvasLayouts.get(layoutIndex) : canvasFields.canvasLayout;
        return layout.updateControl(newCanvasControl);
    };
    CanvasStoreEditActions.handleRteChanged = function (canvasFields, newCanvasControl, newSelection, shouldUpdate) {
        if (shouldUpdate === void 0) { shouldUpdate = true; }
        var hasControlUpdated = CanvasStoreEditActions.updateControl(canvasFields, newCanvasControl);
        if (hasControlUpdated && shouldUpdate) {
            if (!_common_Flights__WEBPACK_IMPORTED_MODULE_18__["Flights"].isPageUndoRedoFlightEnabled() || _common_KillSwitches__WEBPACK_IMPORTED_MODULE_9__["KillSwitches"].rteTypePerfWithUndo.isActivated()) {
                // Make sure updated control data is reflected to WebPartZone props.
                canvasFields.render();
            }
            canvasFields.handleCanvasChanged({
                selectedControlId: newCanvasControl.id,
                selectedRteState: {
                    selection: newSelection
                }
            });
        }
    };
    /**
     * @deprecated - It should be removed then PageUndoRedo flight is graduated.
     */
    CanvasStoreEditActions.handleRteChangedDeprecated = function (canvasFields, newCanvasControl) {
        CanvasStoreEditActions.updateControl(canvasFields, newCanvasControl);
        canvasFields.handleCanvasChanged();
    };
    CanvasStoreEditActions.handleWebPartChanged = function (canvasFields, wpInstanceId) {
        var handleCanvasChanged = canvasFields.handleCanvasChanged;
        var newCanvasControl = canvasFields.getControlComponentById(wpInstanceId).serialize();
        // For newly added web parts, they might manipulate the property bag after initialization which brings multiple
        // changes being tracked. The changes happen before web parts finalize their property bag should not be tracked.
        // E.g. Adding Image web part by Blob which will be uploaded by Image web part itself and be reflected to its
        // property bag.
        var shouldSkipUpdate = newCanvasControl.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone &&
            _webPartFactory_WebPartFactory__WEBPACK_IMPORTED_MODULE_20__["WebPartFactory"].shouldExcludeFromWebPartUpdate(newCanvasControl);
        if (!shouldSkipUpdate) {
            newCanvasControl.addedFromPersistedData = true;
            var hasControlUpdated = CanvasStoreEditActions.updateControl(canvasFields, newCanvasControl);
            if (hasControlUpdated) {
                // Make sure updated control data is reflected to WebPartZone props.
                canvasFields.render();
                handleCanvasChanged({
                    selectedControlId: wpInstanceId
                });
            }
        }
    };
    CanvasStoreEditActions._deleteControl = function (canvasFields, position) {
        var qos = _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].createQosScope('DeleteWebPart');
        try {
            var control = canvasFields.getControl(position);
            if (control && _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone === control.controlType) {
                CanvasStoreEditActions._markWebPartDeletion(canvasFields, control);
            }
            CanvasStoreEditActions._renderAfterDeletionAndAdjustFocus(canvasFields, position, function () {
                canvasFields.canvasLayout.removeControl(position);
                document.dispatchEvent(new CustomEvent(CANVAS_ELEMENT_DELETION));
            });
        }
        catch (err) {
            _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].handleMonitoredException(qos, err);
        }
    };
    CanvasStoreEditActions._deleteZone = function (canvasFields, position) {
        var zoneDeleteQos = _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].createQosScope('DeleteZone');
        try {
            var zone = canvasFields.canvasLayout.fetchZone(position.zoneIndex);
            zone.fetchAllControls()
                .forEach(function (control) {
                if (control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone) {
                    CanvasStoreEditActions._markWebPartDeletion(canvasFields, control);
                }
            });
            CanvasStoreEditActions._renderAfterDeletionAndAdjustFocus(canvasFields, position, function () {
                canvasFields.canvasLayout.removeZone(position.zoneIndex);
                document.dispatchEvent(new CustomEvent(CANVAS_ELEMENT_DELETION));
            });
            // Notify all the web parts to resize when vertical section is deleted
            if (position.layoutIndex === _canvasLayout__WEBPACK_IMPORTED_MODULE_12__["CanvasLayout"].verticalLayoutIndex) {
                canvasFields.selectedLayoutIndex = _canvasLayout__WEBPACK_IMPORTED_MODULE_12__["CanvasLayout"].firstLayoutIndex;
                canvasFields.webPartManager.notifyWebPartContainerResize();
            }
            zoneDeleteQos.writeSuccess();
        }
        catch (err) {
            _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].handleMonitoredException(canvasFields.zoneDeleteQos, err);
        }
    };
    /**
     * @deprecated - It should be removed then PageUndoRedo flight is graduated.
     */
    CanvasStoreEditActions._deleteControlDeprecated = function (canvasFields, layout) {
        canvasFields.deletedControlLayout = layout;
        var control = canvasFields.getControl(canvasFields.deletedControlLayout);
        if (control && _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone === control.controlType) {
            canvasFields.webPartsCount--;
            var webPartData = control.webPartData;
            if (webPartData && _canvasStore__WEBPACK_IMPORTED_MODULE_10__["EUPL_APPROVED_WEB_PARTS"].has(webPartData.id)) {
                canvasFields.euplApprovedWebpartCount--;
            }
        }
        canvasFields.canvasLayout.removeControl(canvasFields.deletedControlLayout);
        if (canvasFields.canvasControls.length === 0) {
            // Todo#661360 Fix workaround left-over
            void canvasFields.propertyPaneLoader
                .propertyPane
                .then(function (propertyPaneController) {
                propertyPaneController.requestAction(undefined, 2 /* Close */);
            });
        }
        canvasFields.render();
        canvasFields.handleCanvasChanged();
    };
    /**
     * @deprecated - It should be removed then PageUndoRedo flight is graduated.
     */
    CanvasStoreEditActions._handleDeleteControlDialogConfirmationDeprecated = function (canvasFields) {
        var qos = _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].createQosScope('DeleteWebPart');
        var selectedControl;
        try {
            selectedControl = canvasFields.getControl(canvasFields.positionCandidateForDeletion);
            if (selectedControl.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone) {
                var controlComponent = canvasFields.getControlComponentById(selectedControl.id);
                controlComponent.handleDeleteButtonClicked();
            }
            CanvasStoreEditActions._closeDialogMessageDeprecated(canvasFields, _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].WebPartAriaLabel);
            var qosData = void 0;
            if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].parse('08ab6e8c-f88b-4cb5-b84f-8393f07ea145'), '08/19/2019', 'Log web part delete extra info.')) {
                var control = canvasFields.getControl(canvasFields.positionCandidateForDeletion);
                if (control && _canvasControl__WEBPACK_IMPORTED_MODULE_11__["CanvasControlType"].WebPartZone === control.controlType) {
                    qosData = { alias: control.id };
                }
            }
            CanvasStoreEditActions._deleteControlDeprecated(canvasFields, canvasFields.positionCandidateForDeletion);
            qos.writeSuccess(qosData);
        }
        catch (err) {
            _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].handleMonitoredException(qos, err, selectedControl);
        }
    };
    /**
     * @deprecated - It should be removed then PageUndoRedo flight is graduated.
     */
    CanvasStoreEditActions._handleDeleteControlDialogDismissDeprecated = function (canvasFields) {
        canvasFields.positionCandidateForDeletion = _canvasLayout__WEBPACK_IMPORTED_MODULE_12__["undefinedControlPosition"];
        CanvasStoreEditActions._closeDialogMessageDeprecated(canvasFields);
    };
    /**
     * @deprecated - It should be removed then PageUndoRedo flight is graduated.
     */
    CanvasStoreEditActions._handleDeleteZoneDialogConfirmationDeprecated = function (canvasFields) {
        try {
            // remove the indexed zone from dataMap
            canvasFields.canvasLayout.removeZone(canvasFields.positionCandidateForDeletion.zoneIndex);
            CanvasStoreEditActions._closeDialogMessageDeprecated(canvasFields, _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].SectionAriaLabel);
            canvasFields.render();
            canvasFields.handleCanvasChanged();
            // Notify all the web parts to resize when vertical section is deleted
            if (canvasFields.positionCandidateForDeletion.layoutIndex === _canvasLayout__WEBPACK_IMPORTED_MODULE_12__["CanvasLayout"].verticalLayoutIndex) {
                canvasFields.webPartManager.notifyWebPartContainerResize();
            }
            canvasFields.zoneDeleteQos.writeSuccess();
        }
        catch (err) {
            _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].handleMonitoredException(canvasFields.zoneDeleteQos, err);
        }
    };
    /**
     * @deprecated - It should be removed then PageUndoRedo flight is graduated.
     */
    CanvasStoreEditActions._handleDeleteZoneDialogDismissDeprecated = function (canvasFields) {
        try {
            canvasFields.positionCandidateForDeletion = _canvasLayout__WEBPACK_IMPORTED_MODULE_12__["undefinedControlPosition"];
            CanvasStoreEditActions._closeDialogMessageDeprecated(canvasFields);
            canvasFields.zoneDeleteQos.writeSuccess();
        }
        catch (err) {
            _canvasStore__WEBPACK_IMPORTED_MODULE_10__["CanvasStoreCommonActions"].handleMonitoredException(canvasFields.zoneDeleteQos, err);
        }
    };
    /**
     * @deprecated - It should be removed then PageUndoRedo flight is graduated.
     */
    CanvasStoreEditActions._closeDialogMessageDeprecated = function (canvasFields, label) {
        if (label) {
            var confirmationMessage = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_7__["StringHelper"].format(_loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_19__["default"].DeleteConfirmationLabel, label);
            canvasFields.a11yManager.alert(confirmationMessage);
        }
    };
    return CanvasStoreEditActions;
}());



/***/ }),

/***/ "DjSq":
/*!*************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasDragZone/CanvasWebPartDragZoneUtils.js ***!
  \*************************************************************************************/
/*! exports provided: CanvasWebPartDragZoneUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasWebPartDragZoneUtils", function() { return CanvasWebPartDragZoneUtils; });
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CanvasDragZoneConstants */ "9S6n");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/Flights */ "qRiB");
/* harmony import */ var _CanvasDragIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CanvasDragIcon */ "nRzo");
/* harmony import */ var _canvasLayout_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../canvasLayout/index */ "yPt8");
/* harmony import */ var _webPartFactory_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../webPartFactory/index */ "ZsUb");
/* harmony import */ var _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CanvasDragZone.resx */ "lozE");
/* harmony import */ var _CanvasDragZone_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CanvasDragZone.module.scss */ "dczX");









var WEB_PART_DRAG_ZONE_STRINGS = {
    // Pass empty handleTitle to avoid two tooltips on hover. Tooltip now comes from toolbar item
    handleTitle: '',
    moveStarted: _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_7__["default"].DragZoneMoveStarted,
    moveComplete: _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_7__["default"].DragZoneMoveComplete,
    moveCancelled: _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_7__["default"].DragZoneMoveCancelled,
    moveNotAllowed: _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_7__["default"].DragZoneMoveNotAllowedAriaLabel,
    moveInsideLevel: [
        _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_7__["default"].DragZoneMoveInsideLevelControl,
        _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_7__["default"].DragZoneMoveInsideLevelSection,
        _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_7__["default"].DragZoneMoveInsideLevelZone
    ]
};
var CanvasWebPartDragZoneUtils = /** @class */ (function () {
    function CanvasWebPartDragZoneUtils(getStore) {
        var _this = this;
        this._dragIcon = new _CanvasDragIcon__WEBPACK_IMPORTED_MODULE_4__["CanvasDragIcon"]();
        this.getDragZoneProps = function () {
            return {
                treeLevelTagsBottomUp: [
                    _CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_2__["CanvasDragZoneConstants"].controlZoneDragTag,
                    _CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_2__["CanvasDragZoneConstants"].sectionDragTag,
                    _CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_2__["CanvasDragZoneConstants"].zoneDragTag
                ],
                dropPositionOffsetBottomPx: _CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_2__["CanvasDragZoneConstants"].LINE_OFFSET_BOTTOM,
                dropPositionOffsetTopPx: _CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_2__["CanvasDragZoneConstants"].LINE_OFFSET_TOP,
                onMoved: _this._onWebPartMoved,
                onMoveStart: _this._onWebPartMoveStart,
                onDropFromExternalSource: _this._handleDropFromExternalSource,
                getDropEffectFromDragEvent: _this._getDropEffectFromDragEvent,
                canDropOnEmptyParent: true,
                dragHandleTags: [
                    _CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_2__["CanvasDragZoneConstants"].webPartButtonDragHandleTag,
                    _CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_2__["CanvasDragZoneConstants"].webPartBorderDragHandleTag,
                    _CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_2__["CanvasDragZoneConstants"].webPartInsideDragHandleTag
                ],
                icon: _this._dragIcon.HTMLIcon,
                dragZoneStrings: WEB_PART_DRAG_ZONE_STRINGS,
                disallowedTag: _CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_2__["CanvasDragZoneConstants"].fullWidthSectionTag,
                disallowedClassName: _CanvasDragZone_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].disabledArea,
                scrollIntoView: _this._store.scrollIntoView,
                onMoving: _this._onWebPartMoving
            };
        };
        /**
       * Handler called by the DragZone when a webpart has been picked up and the drag has started
       * @param position The position of the webpart before the move started
       */
        this._onWebPartMoveStart = function (position) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_EngagementLogger"].logEvent('Canvas.MoveControl.Click');
            if (!CanvasWebPartDragZoneUtils._isValidWebpartPosition(position)) {
                return;
            }
            var layoutIndex = _this._store.selectedLayoutIndex;
            CanvasWebPartDragZoneUtils._fixPositionForVerticalSection(position, layoutIndex);
            _this._previouslySelectedLayoutIndex = layoutIndex;
            var control = _this._getControlFromDragZonePosition(position);
            if (control) {
                _this._dragIcon.setMoveIconBasedOnControl(control);
            }
        };
        this._onWebPartMoving = function (disallowed) {
            if (disallowed) {
                _this._dragIcon.setDisallowedIcon();
            }
            else {
                _this._dragIcon.setToPreviousState();
            }
        };
        /**
       * Handler called by the DragZone when a webpart has been dropped to a new position.
       * The position of the webpart consists of an array with 3 items: zoneIndex, sectionIndex, controlIndex.
       * @param oldPosition - the position of the webpart before it is moved
       * @param newPosition - the position of the webpart after it is moved
       */
        this._onWebPartMoved = function (oldPosition, newPosition) {
            if ((oldPosition === newPosition && _this._isSameLayout()) ||
                !CanvasWebPartDragZoneUtils._isValidWebpartPosition(oldPosition) ||
                !CanvasWebPartDragZoneUtils._isValidWebpartPosition(newPosition) ||
                (CanvasWebPartDragZoneUtils._droppedOnTheSamePosition(oldPosition, newPosition) && _this._isSameLayout())) {
                return;
            }
            var moveMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('CanvasControlMove');
            try {
                CanvasWebPartDragZoneUtils._fixPositionForVerticalSection(newPosition, _this._store.selectedLayoutIndex);
                CanvasWebPartDragZoneUtils._fixPositionForVerticalSection(oldPosition, _this._previouslySelectedLayoutIndex);
                var oldControl = _this._getControlFromDragZonePosition(oldPosition, true);
                if (!oldControl) {
                    throw new Error('ControlNotFound');
                }
                var newCanvasPosition = _this._getNewPositionFromDragZonePosition(newPosition);
                oldControl.position = _canvasLayout_index__WEBPACK_IMPORTED_MODULE_5__["CanvasLayout"].cloneMerge(oldControl.position, {
                    layoutIndex: _this._previouslySelectedLayoutIndex
                });
                _this._store.moveControl(oldControl, newCanvasPosition);
                moveMonitor.writeSuccess();
            }
            catch (err) {
                moveMonitor.writeUnexpectedFailure('ExceptionMovingControl', err);
            }
        };
        this._handleDropFromExternalSource = function (data, droppedPosition, droppedAtTheEndOfSection) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_EngagementLogger"].logEvent('Canvas.HandleDropFromExternal.Drop');
            var controlPosition = _this._getNewPositionFromDragZonePosition(droppedPosition, droppedAtTheEndOfSection);
            if (data instanceof DataTransferItemList) {
                for (var i = 0; i < data.length; i++) {
                    _this._addDroppedDataToCanvas(data[i].getAsFile(), controlPosition);
                }
            }
        };
        this._getDropEffectFromDragEvent = function (evt) {
            var dragEventDropEffect = 'all';
            var data = evt && evt.dataTransfer && evt.dataTransfer.items;
            if (data instanceof DataTransferItemList) {
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    if (!dataItem || !dataItem.type || !dataItem.type.match(RegExp('^image/|^application/|^video/'))) {
                        dragEventDropEffect = 'none';
                        break;
                    }
                }
            }
            return dragEventDropEffect;
        };
        this._getNewPositionFromDragZonePosition = function (position, addAtTheEnd) {
            var zone = CanvasWebPartDragZoneUtils._getZoneFromDragZonePosition(position, _this._store.canvasLayout);
            var section = zone && CanvasWebPartDragZoneUtils._getSectionFromDragZonePosition(position, zone);
            var controlIndex = position[0];
            if (section.controls.length === 0) {
                controlIndex = 1;
            }
            else if (controlIndex === section.controls.length || addAtTheEnd) {
                // Todo#661360 Fix workaround left-over
                controlIndex = section.controls[section.controls.length - 1].position.controlIndex + 1;
            }
            else {
                controlIndex = section.controls[controlIndex].position.controlIndex;
            }
            var newCanvasPosition = {
                controlIndex: controlIndex,
                sectionIndex: section.index,
                sectionFactor: section.factor,
                zoneIndex: zone.index,
                layoutIndex: _this._store.selectedLayoutIndex
            };
            return newCanvasPosition;
        };
        this._getControlFromDragZonePosition = function (position, isWebPartMoved) {
            var layout = _this._store.canvasLayout;
            if (isWebPartMoved) {
                layout = _this._store.canvasLayouts.get(_this._previouslySelectedLayoutIndex);
            }
            // Todo#661360 Fix workaround left-over
            var zone = CanvasWebPartDragZoneUtils._getZoneFromDragZonePosition(position, layout);
            var section = CanvasWebPartDragZoneUtils._getSectionFromDragZonePosition(position, zone);
            var ctrlIdx = position[0];
            if (!section.controls || section.controls.length <= ctrlIdx) {
                return undefined;
            }
            else {
                return section.controls[ctrlIdx];
            }
        };
        this._addDroppedDataToCanvas = function (data, controlPosition) {
            var dropMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('CanvasOnDropFromExternalSource');
            try {
                var webPartResult = _webPartFactory_index__WEBPACK_IMPORTED_MODULE_6__["WebPartFactory"].getWebPart(data, _this._store);
                // If we succesfully generated WebPartData object based on dropped data
                if (webPartResult.webPartResultType === "SUCCESS" /* SUCCESS */) {
                    // Set the position to drop
                    webPartResult.webPartDataProps.position = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__["clone"])(controlPosition);
                    // Add a new web part into the Canvas with the generated webPartDataProps
                    // We don't want to persist the data immediately when this get called when web part is added by drag and drop,
                    // web part zone will notify canvas once the web part is mounted and initialized.
                    _this._store.addControlToCanvas(webPartResult.webPartDataProps, true /* shouldRender */, !_common_Flights__WEBPACK_IMPORTED_MODULE_3__["Flights"].isPageUndoRedoFlightEnabled() /* shouldPersistData */);
                    dropMonitor.writeSuccess();
                }
                else if (webPartResult.webPartResultType === "FileTypeNotSupported" /* FILE_TYPE_NOT_SUPPORTED */) {
                    dropMonitor.writeExpectedFailure(webPartResult.webPartResultType);
                }
                else {
                    dropMonitor.writeUnexpectedFailure(webPartResult.webPartResultType);
                }
            }
            catch (err) {
                dropMonitor.writeUnexpectedFailure('ExceptionDragAndDrop', err);
            }
        };
        this._isSameLayout = function () {
            return _this._store.selectedLayoutIndex === _this._previouslySelectedLayoutIndex;
        };
        this._getStore = getStore;
    }
    CanvasWebPartDragZoneUtils._isValidWebpartPosition = function (position) {
        return position && position.length === 3;
    };
    CanvasWebPartDragZoneUtils._droppedOnTheSamePosition = function (oldPosition, newPosition) {
        // if the new position is right before or after the current position, the resulting move would be a no op
        var oldControlIndex = oldPosition[0], oldSectionIndex = oldPosition[1], oldZoneIndex = oldPosition[2];
        var newControlIndex = newPosition[0], newSectionIndex = newPosition[1], newZoneIndex = newPosition[2];
        return (oldZoneIndex === newZoneIndex &&
            oldSectionIndex === newSectionIndex &&
            (oldControlIndex === newControlIndex - 1 || oldControlIndex === newControlIndex));
    };
    CanvasWebPartDragZoneUtils._getZoneFromDragZonePosition = function (position, layout) {
        var zoneIndex = position[2];
        var zone = layout.zones && layout.zones.length > zoneIndex && layout.zones[zoneIndex];
        if (!zone) {
            // all of these exceptions are to stop the rest of the logic because this is a breaking issue.
            // they are caught at the top and logged to QoS
            throw new Error("ZoneNotFound, zoneIndex: " + zoneIndex);
        }
        return zone;
    };
    CanvasWebPartDragZoneUtils._getSectionFromDragZonePosition = function (position, zone) {
        var sectionIndex = position[1];
        var section = zone.sections && zone.sections.length > sectionIndex && zone.sections[sectionIndex];
        if (!section) {
            throw new Error('SectionNotFound, sectionIndex: ${sectionIndex}');
        }
        return section;
    };
    CanvasWebPartDragZoneUtils._fixPositionForVerticalSection = function (position, selectedLayoutIndex) {
        // The drag zone does not have idea about the second layout so we need to fix the zone index.
        // VSO#611985: Introduce the layout index in drag zone control
        if (selectedLayoutIndex === _canvasLayout_index__WEBPACK_IMPORTED_MODULE_5__["CanvasLayout"].verticalLayoutIndex) {
            position[2] = 0;
        }
    };
    Object.defineProperty(CanvasWebPartDragZoneUtils.prototype, "_store", {
        get: function () {
            return this._getStore();
        },
        enumerable: true,
        configurable: true
    });
    return CanvasWebPartDragZoneUtils;
}());



/***/ }),

/***/ "F9/O":
/*!**********************************************************!*\
  !*** ./lib/sp-canvas/common/ControlsInOneRow.module.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ControlsInOneRow.module.css */ "pl+P");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "HCd6":
/*!******************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/SPRteTouchDevice.js ***!
  \******************************************************************/
/*! exports provided: SPRteTouchDevice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPRteTouchDevice", function() { return SPRteTouchDevice; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _SPRte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SPRte */ "Lb2a");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */


/**
 * @class SPRteTouchDevice class. This component is used as a canvas control for touch devices.
 */
var SPRteTouchDevice = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SPRteTouchDevice, _super);
    function SPRteTouchDevice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._handleSelectionChange = function (range, forceUpdate) {
            if (range) {
                _this.setState({ currentSubmenuOpen: undefined });
                if (_this._restoreOnFocus()) {
                    _this._updateFormattingBar(false);
                    return;
                }
            }
            if (!range) {
                return;
            }
            else {
                _this._updateSelection(range, forceUpdate);
            }
        };
        return _this;
    }
    SPRteTouchDevice.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
    };
    SPRteTouchDevice.prototype._afterEditorCreated = function (editor) {
        _super.prototype._afterEditorCreated.call(this, editor);
    };
    SPRteTouchDevice.prototype._initState = function () {
        this.state = {
            displayMode: this.props.displayMode,
            formattingBarPosition: this._isHoverStateFlightOnAndBorderDraggableKSOff
                ? SPRteTouchDevice._getFormattingBarDefaultPosition(this._isRtl)
                : SPRteTouchDevice._getFormattingBarDefaultPositionDeprecated(this._isRtl),
            isFormattingBarHidden: false
        };
    };
    Object.defineProperty(SPRteTouchDevice.prototype, "_formattingBarPosition", {
        get: function () {
            return this._floatingFormattingBarPosition;
        },
        enumerable: true,
        configurable: true
    });
    SPRteTouchDevice.prototype._handleScroll = function () {
        this._handleScrollWithFloatingFormattingBar();
    };
    return SPRteTouchDevice;
}(_SPRte__WEBPACK_IMPORTED_MODULE_1__["SPRte"]));



/***/ }),

/***/ "Hcv0":
/*!****************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/toolbar/Toolbar.scss.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./Toolbar.css */ "9MOG");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "LBkn":
/*!************************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasZonePropertyPane/CanvasZonePropertyPaneControl.js ***!
  \************************************************************************************************/
/*! exports provided: CanvasZonePropertyPaneControl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasZonePropertyPaneControl", function() { return CanvasZonePropertyPaneControl; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-webpart-base */ "br4S");
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _canvasControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../canvasControl */ "iO6m");
/* harmony import */ var _canvasLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../canvasLayout */ "yPt8");
/* harmony import */ var _CanvasZoneEmphasisPicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CanvasZoneEmphasisPicker */ "ws9o");
/* harmony import */ var _canvasZonePropertyPaneStrings_resx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./canvasZonePropertyPaneStrings.resx */ "CtN6");
/* harmony import */ var _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../loc/CanvasStrings.resx */ "K08d");









/**
 * Implements IPropertyPaneConsumer (internal and not exported from sp-webpart-base).
 *
 * This is a temporary pattern.
 */
var CanvasZonePropertyPaneControl = /** @class */ (function () {
    function CanvasZonePropertyPaneControl(zone, render, variantsModuleLoader, layoutIndex) {
        var _this = this;
        this._handleEmphasisChanged = function (emphasis) {
            if (emphasis !== _this._zone.emphasis) {
                var controlEmphasis = {
                    zoneEmphasis: emphasis,
                    sectionEmphasis: undefined,
                    controlEmphasis: undefined
                };
                _this._zone.changeEmphasis(controlEmphasis);
                _this._render();
            }
        };
        this._zone = zone;
        this._render = render;
        this._variantsModuleLoader = variantsModuleLoader;
        this._layoutIndex = layoutIndex;
    }
    CanvasZonePropertyPaneControl.prototype._isPropertyPaneReactive = function () {
        return true;
    };
    CanvasZonePropertyPaneControl.prototype._loadPropertyPaneResources = function () {
        /* no-op */
    };
    CanvasZonePropertyPaneControl.prototype._getPropertyPaneData = function () {
        // Todo#661360 Fix workaround left-over
        return Promise.resolve({
            webPartId: this._zone.id,
            title: _canvasZonePropertyPaneStrings_resx__WEBPACK_IMPORTED_MODULE_7__["default"].SectionPropertyPaneTitle,
            configuration: {
                pages: this._getProperyPanePages()
            },
            dynamicConfiguration: undefined,
            onPropertyPaneFieldChanged: undefined,
            onConfigurationEvent: undefined,
            onRendered: undefined,
            properties: {},
            isReactive: this._isPropertyPaneReactive()
        });
    };
    CanvasZonePropertyPaneControl.prototype._onPropertyPaneFieldChanged = function (propertyPath, newValue) {
        this._zone.changeZone(newValue);
        this._render();
    };
    CanvasZonePropertyPaneControl.prototype._onPropertyPaneLifeCycleEvent = function (event) {
        if (event === 4 /* Closed */ || event === 3 /* Opened */) {
            this._render();
        }
    };
    Object.defineProperty(CanvasZonePropertyPaneControl.prototype, "_emphasisPickerControl", {
        get: function () {
            var controlProps = {
                onColorChanged: this._handleEmphasisChanged,
                activeColor: this._zone.emphasis || 0 /* None */,
                variantsModuleLoader: this._variantsModuleLoader
            };
            var canvasEmphasisPicker = react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CanvasZoneEmphasisPicker__WEBPACK_IMPORTED_MODULE_6__["CanvasZoneEmphasisPicker"], controlProps);
            return Object(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__["PropertyPaneCustomField"])({
                key: 'EmphasisPickerControl',
                onRender: function (element) { return react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](canvasEmphasisPicker, element); }
            });
        },
        enumerable: true,
        configurable: true
    });
    CanvasZonePropertyPaneControl.prototype._getProperyPanePages = function () {
        var currentColumnSize = this._zone.layoutType;
        var groups = [];
        if (this._layoutIndex === _canvasLayout__WEBPACK_IMPORTED_MODULE_5__["CanvasLayout"].firstLayoutIndex) {
            groups.push({
                groupName: _canvasZonePropertyPaneStrings_resx__WEBPACK_IMPORTED_MODULE_7__["default"].SectionPropertyPaneColumnGroupName,
                groupFields: [
                    Object(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__["PropertyPaneChoiceGroup"])('selectedLayout', {
                        options: [
                            {
                                checked: _canvasControl__WEBPACK_IMPORTED_MODULE_4__["CanvasControlType"].OneColumn === currentColumnSize,
                                iconProps: {
                                    officeFabricIconFontName: 'SingleColumn'
                                },
                                key: _canvasControl__WEBPACK_IMPORTED_MODULE_4__["CanvasControlType"].OneColumn,
                                text: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_8__["default"].ToolboxOneColumnPart
                            },
                            {
                                checked: _canvasControl__WEBPACK_IMPORTED_MODULE_4__["CanvasControlType"].TwoColumns === currentColumnSize,
                                iconProps: {
                                    officeFabricIconFontName: 'DoubleColumn'
                                },
                                key: _canvasControl__WEBPACK_IMPORTED_MODULE_4__["CanvasControlType"].TwoColumns,
                                text: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_8__["default"].ToolboxTwoColumnPart
                            },
                            {
                                checked: _canvasControl__WEBPACK_IMPORTED_MODULE_4__["CanvasControlType"].ThreeColumns === currentColumnSize,
                                iconProps: {
                                    officeFabricIconFontName: 'TripleColumn'
                                },
                                key: _canvasControl__WEBPACK_IMPORTED_MODULE_4__["CanvasControlType"].ThreeColumns,
                                text: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_8__["default"].ToolboxThreeColumnPart
                            },
                            {
                                checked: _canvasControl__WEBPACK_IMPORTED_MODULE_4__["CanvasControlType"].OneThirdColumnLeft === currentColumnSize,
                                iconProps: {
                                    officeFabricIconFontName: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["getRTL"])() ? 'ColumnLeftTwoThirds' : 'ColumnRightTwoThirds'
                                },
                                key: _canvasControl__WEBPACK_IMPORTED_MODULE_4__["CanvasControlType"].OneThirdColumnLeft,
                                text: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_8__["default"].ToolboxOneThirdLeftColumnPart
                            },
                            {
                                checked: _canvasControl__WEBPACK_IMPORTED_MODULE_4__["CanvasControlType"].OneThirdColumnRight === currentColumnSize,
                                iconProps: {
                                    officeFabricIconFontName: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["getRTL"])() ? 'ColumnRightTwoThirds' : 'ColumnLeftTwoThirds'
                                },
                                key: _canvasControl__WEBPACK_IMPORTED_MODULE_4__["CanvasControlType"].OneThirdColumnRight,
                                text: _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_8__["default"].ToolboxOneThirdRightColumnPart
                            }
                        ]
                    })
                ]
            });
        }
        groups.push({
            groupName: _canvasZonePropertyPaneStrings_resx__WEBPACK_IMPORTED_MODULE_7__["default"].SectionBackgroundPropertyColumnGroupName,
            groupFields: [this._emphasisPickerControl]
        });
        return [
            {
                groups: groups
            }
        ];
    };
    return CanvasZonePropertyPaneControl;
}());



/***/ }),

/***/ "Lb2a":
/*!*******************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/SPRte.js ***!
  \*******************************************************/
/*! exports provided: SPRte */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPRte", function() { return SPRte; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ms/sp-a11y */ "ytfe");
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ms/sp-rte */ "RX6m");
/* harmony import */ var _ms_sp_rte__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../common/Flights */ "qRiB");
/* harmony import */ var _SPRteStyles_styles__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./SPRteStyles.styles */ "lHr1");
/* harmony import */ var _SPRte_resx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./SPRte.resx */ "fy9q");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../common/KillSwitches */ "17t3");
/* harmony import */ var _common_Constants__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../common/Constants */ "+zV1");

















/**
 * @class TextWebPart class. This component is used as a canvas control.
 */
var SPRte = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SPRte, _super);
    function SPRte(props) {
        var _this = _super.call(this, props, { editor: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["CKTextEditor"], config: new _ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["BaseRteConfiguration"](), loader: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["CKTextEditor"].moduleLoader }) || this;
        _this.TAG_NAME = 'Canvas.';
        _this.scrollIntoView = function (options) {
            if (_this._editorElement) {
                _this._editorElement.scrollIntoView(options);
                return true;
            }
            return false;
        };
        _this._restoreScrollTopOnNextFocus = false;
        _this._isPasting = false;
        // Adding a debounce for scroll handler so that it doesnt get called multiple times
        _this._handleScroll = _this._async.debounce(_this._handleScroll, 100);
        return _this;
    }
    SPRte._getFormattingBarDefaultPosition = function (isRtl) {
        if (isRtl === void 0) { isRtl = false; }
        var left = isRtl ? 254 : -8;
        var top = -44;
        var position = 'absolute';
        var right = undefined;
        return { left: left, top: top, position: position, right: right };
    };
    SPRte._getFormattingBarDefaultPositionDeprecated = function (isRtl) {
        if (isRtl === void 0) { isRtl = false; }
        var left = isRtl ? 254 : undefined;
        // top: -36 default position of format bar
        var top = -36;
        var position = 'absolute';
        var right = undefined;
        return { left: left, top: top, position: position, right: right };
    };
    SPRte.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        if (this.props.store &&
            this.props.store.canvasFields.doesUserHaveEditPermission) {
            // Load event gets called inconsistently, so we need to set timeout to ensure it gets called
            this._async.setTimeout(this._onSPRteLoad.bind(this), 4000);
        }
        // This removes the placeholder when switched from read to edit button
        // when RTE is not empty
        if (this._editorElement &&
            !!this.props.innerHTML &&
            this._editorElement.getAttribute('placeholder')) {
            this._editorElement.removeAttribute('placeholder');
        }
        if (this._isHoverStateFlightOnAndBorderDraggableKSOff) {
            SPRte._TOOLBAR_DEFAULT_POSITION.left = -8;
            SPRte._TOOLBAR_DEFAULT_POSITION.top = -44;
        }
    };
    SPRte.prototype.componentDidUpdate = function (prevProps, prevState) {
        _super.prototype.componentDidUpdate.call(this, prevProps, prevState);
        if (this._isEdit && this.props.store && this._scrollableParent) {
            this._formattingBar
                ? this._scrollableParent.addEventListener('scroll', this._handleScroll)
                : this._scrollableParent.removeEventListener('scroll', this._handleScroll);
        }
        if (this._isEdit || this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit) {
            this._loadAndInstantiatePropertyPaneControl();
        }
        // when RTE is not selected formatting bar needs to be updated
        if ( true && !this._isRTESelected && !this.state.isFormattingBarHidden) {
            // We need to force hide RTE to avoid stack overflow
            this._updateFormattingBar(true, true);
        }
        if (!this.state.currentSubmenuOpen && this._isPropertyPaneOpen && this._isRTESelected) {
            this._changePropertyPaneState(5 /* Refresh */);
        }
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled() &&
            this.props.innerHTML &&
            this._editorElement &&
            this._editorElement.getAttribute('placeholder')) {
            this._editorElement.removeAttribute('placeholder');
        }
    };
    SPRte.prototype.focus = function () {
        this._currentScrollTop = this._scrollableParent.scrollTop;
        _super.prototype.focus.call(this);
        // We need to restore the scroll after focus to avoid jumpiness
        this._scrollableParent.scrollTop = this._currentScrollTop;
        // We need to set focus twice on the editor. The first time is needed to fix the scroll top
        // at the right position but focus switches back to property pane as the drop downs and color
        // picker steal the focus back. The next is delayed focus which actually puts the focus
        // back on the editor.
        if (this._isPropertyPaneOpen) {
            this._setDelayedFocus();
        }
    };
    SPRte.prototype.updateSelection = function (range) {
        _super.prototype._updateSelection.call(this, range);
    };
    SPRte.prototype.handlePropertyPaneOpenOrClose = function () {
        if (this.props.store) {
            this.props.store.handlePropertyPaneOpenOrClose();
        }
    };
    SPRte.prototype.getPredictedUrl = function (title) {
        var _this = this;
        return this._getComputedFileName(title).then(function (fileName) {
            var pageContext = _this.props.store.pageContext;
            var absoluteUrl = pageContext.web && pageContext.web.absoluteUrl + '/' || '/';
            return Promise.resolve(absoluteUrl + 'SitePages/' + fileName + (".aspx?" + _common_Constants__WEBPACK_IMPORTED_MODULE_16__["WIKI_TITLE"] + "=" + encodeURI(title)));
        });
    };
    /**
     * Return the serialized instance of this control
     */
    SPRte.prototype.serialize = function () {
        var serialization = JSON.parse(JSON.stringify(this.props.control));
        serialization.innerHTML = this.innerHTML;
        return serialization;
    };
    SPRte.prototype.tryUpdate = function (innerHTML, selection) {
        var _this = this;
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled() && !_common_KillSwitches__WEBPACK_IMPORTED_MODULE_15__["KillSwitches"].rteTypePerfWithUndo.isActivated() && this._editor) {
            var currentHTML = this.innerHTML;
            // Trim the text before comparison because CKEditor will always append a blank line after the returned HTML.
            if (innerHTML === undefined || currentHTML === undefined || currentHTML.trim() !== innerHTML.trim()) {
                this._editor.setData(innerHTML || '', function () {
                    if (_this._editor && selection && selection !== _this._currentSelection) {
                        _this._editor.setSelection(selection);
                    }
                });
            }
        }
    };
    Object.defineProperty(SPRte.prototype, "_spFeatureInstanceId", {
        get: function () {
            return this.props.control.id;
        },
        enumerable: true,
        configurable: true
    });
    SPRte.prototype._handleKeyDown = function (evt) {
        _super.prototype._handleKeyDown.call(this, evt);
        // Open the property pane on Alt+P
        if (_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_6__["Keyboard"].isKey(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["KeyCodes"].p, evt, { alt: true })) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEvent(this.TAG_NAME + 'PropertyPane.Focus', evt.type);
            this._changePropertyPaneState(1 /* Open */);
            _ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["BaseRte"]._preventEventDefaultBehaviour(evt);
        }
    };
    SPRte.prototype._createNewEditor = function (innerHTML, startupFocus) {
        return this._options.editor.createNewEditor({
            config: this._config,
            currentHTML: innerHTML,
            editorElement: this._editorElement,
            selectionChangeCallback: this._handleSelectionChange,
            textChangeCallback: this._handleTextChange.bind(this),
            startUpFocus: startupFocus,
            onFluidPasteCallback: _common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isFluidPasteEnabled() ? this._onFluidPaste.bind(this) : undefined,
            onImagePasteCallBack: this._onImagePaste.bind(this),
            onPasteCallback: this._onPaste.bind(this),
            onHeadingPasteCallback: this._onHeadingPaste.bind(this),
            onEmbedPasteCallback: this._onEmbedPaste.bind(this),
            onContextMenuCallBack: this._onContextualMenu.bind(this),
            isDemoteHeadingsInRTEEnabled: this._isDemoteHeadingsInRTEEnabled(),
            autocompleteRegexesMatch: [this._wikiPagePickerRegexMatch.bind(this), this._topicPickerRegexMatch.bind(this)],
            autocompletePageSuggestions: this._suggestionsCallback.bind(this),
            autocompleteHTMLToInsert: this._selectedItemHTMLToInsert.bind(this),
            rteInsertLinkOnKeyDown: this._wikiInsertLinkOnKeyDown.bind(this)
        });
    };
    SPRte.prototype._onImagePaste = function (imageResult) {
        _super.prototype._onImagePaste.call(this, imageResult);
        if (imageResult.isImageValid) {
            // Hide the formatting bar on image paste to avoid two formatting bars showing at the same time.
            this._updateFormattingBar(true, true);
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEvent(this.TAG_NAME + 'ImageCopyPaste');
            this.props.store.tryMatchContentHandlerAndSplit(this.props.control.id, imageResult.innerHTML, this.props.control.position, imageResult.imageBlob);
        }
    };
    SPRte.prototype._formatOrPrepare = function (formatKey) {
        _super.prototype._formatOrPrepare.call(this, formatKey);
        if (this._isDemoteHeadingsInRTEEnabled() &&
            this._wasHeadingPasted &&
            formatKey.match('h[1-4]')) {
            // This logs that user has used heading after paste
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEvent('FormatHeadingsAfterPaste.Click');
        }
    };
    SPRte.prototype._onEmbedPaste = function (isPasteInProgress, url) {
        var _this = this;
        // Assign to a deferred callback so embed behavior will be triggered after the text of RTE has been updated.
        // This separate the changes between RTE and web part creation and makes the change stack cleaner.
        this._embedPasteCallback = function () {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEvent(_this.TAG_NAME + 'EmbedCodeCopyPaste');
            _this.props.store.tryMatchContentHandlerAndSplit(_this.props.control.id, '', _this.props.control.position, url);
        };
        if (!_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled()) {
            this._embedPasteCallback();
        }
    };
    SPRte.prototype._postEditorCreatedHandlerComplete = function () {
        if (!this.props.control.addedFromPersistedData) {
            this.focus();
        }
    };
    SPRte.prototype._openLinkDialog = function (defaultAddress) {
        if (defaultAddress === void 0) { defaultAddress = ''; }
        _super.prototype._openLinkDialog.call(this, defaultAddress);
        this._currentScrollTop = this._scrollableParent.scrollTop;
    };
    SPRte.prototype._restoreOnFocus = function () {
        var restore = _super.prototype._restoreOnFocus.call(this);
        if (this._restoreScrollTopOnNextFocus && this._currentScrollTop) {
            this._restoreScrollTopOnNextFocus = false;
            this._scrollableParent.scrollTop = this._currentScrollTop;
            restore = true;
        }
        return restore;
    };
    SPRte.prototype._handleTextChange = function () {
        _super.prototype._handleTextChange.call(this);
        if (this._editorElement.getAttribute('placeholder')) {
            this._editorElement.removeAttribute('placeholder');
        }
        else if (this._editorElement.innerHTML === SPRte._EMPTY_RTE_HTML) {
            if (this._placeholder !== undefined) {
                this._editorElement.setAttribute('placeholder', this._placeholder);
            }
            else {
                this._editorElement.removeAttribute('placeholder');
            }
        }
        if (this._isPasting) {
            this._onAfterPaste();
        }
        var onChange = this.props.onChange;
        if (this._isEdit && onChange) {
            var newControl = this.serialize();
            if (newControl.innerHTML !== this.props.innerHTML) {
                onChange(newControl, this._currentSelection);
            }
        }
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled() && this._embedPasteCallback) {
            this._embedPasteCallback();
            this._embedPasteCallback = undefined;
        }
    };
    SPRte.prototype._afterEditorCreated = function (editor) {
        _super.prototype._afterEditorCreated.call(this, editor);
        if (this._editorElement.innerHTML !== SPRte._EMPTY_RTE_HTML) {
            this._editorElement.removeAttribute('placeholder');
        }
    };
    Object.defineProperty(SPRte.prototype, "_placeholder", {
        get: function () {
            if (this._isEdit) {
                return _SPRte_resx__WEBPACK_IMPORTED_MODULE_14__["default"].TextWebPartPlaceholder;
            }
        },
        enumerable: true,
        configurable: true
    });
    SPRte.prototype._formattingBarButtons = function () {
        var _this = this;
        var alignButtons = [
            this._getFormatButtonProps('alignLeft', this.getFormatHandler(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["Format"].AlignLeft)),
            this._getFormatButtonProps('alignCenter', this.getFormatHandler(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["Format"].AlignCenter)),
            this._getFormatButtonProps('alignRight', this.getFormatHandler(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["Format"].AlignRight))
        ];
        var bulletButtons = [
            this._getFormatButtonProps('bullet', this.getFormatHandler(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["Format"].Bullet)),
            this._getFormatButtonProps('list', this.getFormatHandler(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["Format"].List))
        ];
        var buttons = [
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["DeferredToolbarSubmenu"], { a11yManagerId: this.props.a11yManagerId, key: 'format', buttons: this._formatSubmenuButtons, isOpen: this.state.currentSubmenuOpen === 'format', isWide: true, onOpen: function () {
                    _this._isSelectionChangeFromToolbar = true;
                    _this.setState({ currentSubmenuOpen: 'format' });
                }, onClose: this._handleCloseSubmenu, onBlur: this._handleFormattingBarBlur }),
            this._renderFormatButton('bold', this.getFormatHandler(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["Format"].Bold)),
            this._renderFormatButton('italic', this.getFormatHandler(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["Format"].Italic)),
            this._renderFormatButton('underline', this.getFormatHandler(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["Format"].Underline)),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["DeferredToolbarSubmenu"], { a11yManagerId: this.props.a11yManagerId, key: 'align', buttons: alignButtons, isOpen: this.state.currentSubmenuOpen === 'align', onOpen: function () {
                    _this._isSelectionChangeFromToolbar = true;
                    _this.setState({ currentSubmenuOpen: 'align' });
                }, onClose: this._handleCloseSubmenu, onBlur: this._handleFormattingBarBlur }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["DeferredToolbarSubmenu"], { a11yManagerId: this.props.a11yManagerId, key: 'bullet', buttons: bulletButtons, isOpen: this.state.currentSubmenuOpen === 'bullet', onOpen: function () {
                    _this._isSelectionChangeFromToolbar = true;
                    _this.setState({ currentSubmenuOpen: 'bullet' });
                }, onClose: this._handleCloseSubmenu, onBlur: this._handleFormattingBarBlur }),
            this._renderFormatButton('link', this._handleLink),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_9__["ToolbarButton"], { key: 'more', canBeActive: false, fabricIconKey: 'More', onClick: this._openPropertyPane, title: _SPRte_resx__WEBPACK_IMPORTED_MODULE_14__["default"].FormattingBarMoreButtonTitle, automationId: 'more-button', onBlur: this._handleFormattingBarBlur })
        ];
        return buttons;
    };
    Object.defineProperty(SPRte.prototype, "_isPropertyPaneOpen", {
        get: function () {
            return Boolean(this.props.store.propertyPaneController && this.props.store.propertyPaneController.isOpen());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Hide/Show the formatting bar and update the formatting bar position if needed.
     * If the editor is not focused, hide the formatting bar
     * If the selection is collapsed the formatting bar will render in a static location
     * If the selection is not collapsed the formatting bar will appear near the selection
     * @param forceHide is for force hiding the toolbar even if it is active element. This is
     * added specifically for a scenario e.g. after image paste, we would like to hide the
     * formatting bar forcefully
     */
    SPRte.prototype._updateFormattingBar = function (isHidden, forceHide) {
        if (!this._editorElement) {
            return;
        }
        var updatePosition = true;
        var newState = {
            formattingBarPosition: {
                left: SPRte._TOOLBAR_DEFAULT_POSITION.left,
                top: SPRte._TOOLBAR_DEFAULT_POSITION.top,
                position: SPRte._TOOLBAR_DEFAULT_POSITION.position,
                right: SPRte._TOOLBAR_DEFAULT_POSITION.right
            },
            isFormattingBarHidden: isHidden
        };
        if (isHidden && this._formattingbarElement) {
            // If the editor or a toolbar button has the focus, don't hide the toolbar
            // However, hide the toolbar if the forceHide flag is true
            if (!forceHide &&
                this._editorElement &&
                document.activeElement &&
                document.activeElement === this._editorElement) {
                isHidden = false;
            }
            else {
                var buttonNodes = this._formattingbarElement.querySelectorAll('.ToolbarButton');
                for (var i = 0; i < buttonNodes.length; i++) {
                    if (this._isSelectionChangeFromToolbar ||
                        (document.activeElement && document.activeElement.isEqualNode(buttonNodes[i]))) {
                        this._isSelectionChangeFromToolbar = false;
                        newState.isFormattingBarHidden = false;
                        newState.formattingBarPosition = this.state.formattingBarPosition;
                        isHidden = false;
                        // Don't update the position if isHidden got overriden because a button was clicked
                        updatePosition = false;
                        break;
                    }
                }
            }
            if (isHidden && document.activeElement && !document.activeElement.isContentEditable) {
                // This makes the contenteditable element non-editable
                var selection = window.getSelection();
                if (selection) {
                    selection.removeAllRanges();
                }
            }
        }
        if (!isHidden) {
            newState.isFormattingBarHidden = false;
            if (updatePosition) {
                newState.formattingBarPosition = this._formattingBarPosition;
            }
        }
        if (!this._isFloatingRTEToolbarEnabled() ||
            (this._isFloatingRTEToolbarEnabled() && this._isFormattingBarStateChanged(newState))) {
            this.setState(newState);
        }
    };
    SPRte.prototype._onBeforePaste = function () {
        this._currentScrollTop = this._scrollableParent.scrollTop;
        this._isPasting = true;
    };
    SPRte.prototype._handleScroll = function () {
        if (this._isFloatingRTEToolbarEnabled() &&
            this.state.formattingBarPosition &&
            this._scrollableParentTop !== this.state.formattingBarPosition.top) {
            this._handleScrollWithFloatingFormattingBar();
        }
        else {
            if (this.state.formattingBarPosition) {
                var isFloating = this.state.formattingBarPosition.position === 'fixed';
                if (this._shouldFormattingBarFloat ? !isFloating : isFloating) {
                    var newState = {
                        formattingBarPosition: this._formattingBarPosition
                    };
                    this.setState(newState);
                }
            }
        }
    };
    SPRte.prototype._handlePagePickerSave = function (link) {
        _super.prototype._handlePagePickerSave.call(this, link);
        this._fixScrollTop();
    };
    SPRte.prototype._handlePagePickerUnlink = function () {
        _super.prototype._handlePagePickerUnlink.call(this);
        this._fixScrollTop();
    };
    SPRte.prototype._handleScrollWithFloatingFormattingBar = function () {
        if (this._shouldFormattingBarFloat) {
            this.setState({ formattingBarPosition: this._formattingBarPositionWithScroll });
        }
        else if (this._editorElement) {
            var scrollableParentTop = this._scrollableParentTop;
            var rteRect = this._rteRect;
            if (scrollableParentTop > rteRect.bottom) {
                // Hide the formatting bar if not in the view port
                this.setState({ isFormattingBarHidden: true });
            }
            else {
                this.setState({
                    formattingBarPosition: this._isHoverStateFlightOnAndBorderDraggableKSOff
                        ? SPRte._getFormattingBarDefaultPosition(this._isRtl)
                        : SPRte._getFormattingBarDefaultPositionDeprecated(this._isRtl)
                });
            }
        }
    };
    Object.defineProperty(SPRte.prototype, "_formattingBarPosition", {
        get: function () {
            if (this._isFloatingRTEToolbarEnabled()) {
                return this._floatingFormattingBarPosition;
            }
            else {
                // At the last column, the formatting bar should float towards right
                var floatRight = (this._isRtl && !this._shouldFloatFormattingBar()) || (!this._isRtl && this._shouldFloatFormattingBar());
                var left = floatRight ? undefined : SPRte._TOOLBAR_DEFAULT_POSITION.left;
                var top_1 = SPRte._TOOLBAR_DEFAULT_POSITION.top;
                var right = floatRight ? 0 : SPRte._TOOLBAR_DEFAULT_POSITION.right;
                var position = 'absolute';
                var isFloating = false;
                if (this._isHoverStateFlightOnAndBorderDraggableKSOff && floatRight) {
                    right = -8;
                }
                if (this._formattingbarElement) {
                    if (this._editor && this._currentSelection && this._currentSelection.start !== this._currentSelection.end) {
                        // Use range.end - 1, because getBounds returns left:0 when the selection ends at the end of line
                        var startBounds = this._editor.getBounds(this._currentSelection.start);
                        var endBounds = this._editor.getBounds(Math.max(0, this._currentSelection.end - 1));
                        if (startBounds.top === endBounds.top) {
                            isFloating = true;
                            endBounds.left = startBounds.left <= endBounds.left ? endBounds.left : this._editorElement.offsetWidth;
                            var toolbarLeft = (startBounds.left + endBounds.left) / 2 - this._formattingbarWidth / 2;
                            var controlZoneWidth = this._editorElement.offsetWidth + SPRte._CONTROLZONE_PADDING_HORIZONTAL * 2;
                            if (toolbarLeft + this._formattingbarWidth <= controlZoneWidth) {
                                left = SPRte._TOOLBAR_DEFAULT_POSITION.left === undefined
                                    ? undefined
                                    : Math.max(toolbarLeft, SPRte._TOOLBAR_DEFAULT_POSITION.left);
                            }
                            else {
                                left = controlZoneWidth - this._formattingbarWidth;
                            }
                            // If the floating top is too close to the fixed top (<line-height), use the fixed top to avoid funkiness
                            top_1 = startBounds.top < SPRte._LINE_HEIGHT
                                ? SPRte._TOOLBAR_DEFAULT_POSITION.top
                                : startBounds.top + SPRte._TOOLBAR_DEFAULT_POSITION.top;
                            position = 'absolute';
                            if (left === 0) {
                                if (this._isRtl && !this._shouldFloatFormattingBar()) {
                                    right = undefined;
                                }
                                else if (this._shouldFloatFormattingBar()) {
                                    // At the last column, the formatting bar should float towards right
                                    left = undefined;
                                    right = 0;
                                }
                            }
                        }
                    }
                    // Even if the formatting bar element doesn't exist, we can still calculate the floating bar position
                    if (!isFloating && this._shouldFormattingBarFloat) {
                        if (floatRight) {
                            right = right === undefined
                                ? undefined
                                : (right +
                                    window.innerWidth -
                                    this._rteRect.right -
                                    SPRte._CONTROLZONE_PADDING_HORIZONTAL);
                        }
                        else {
                            left = SPRte._TOOLBAR_DEFAULT_POSITION.left === undefined
                                ? undefined
                                : (SPRte._TOOLBAR_DEFAULT_POSITION.left +
                                    this._rteRect.left -
                                    SPRte._CONTROLZONE_PADDING_HORIZONTAL);
                        }
                        // Adding 10px offset to avoid interfering with the command bar
                        top_1 = this._scrollableParentTop + SPRte._TOP_OFFSET;
                        position = 'fixed';
                    }
                }
                return { left: left, top: top_1, position: position, right: right };
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRte.prototype, "_floatingFormattingBarPosition", {
        get: function () {
            if (!this._shouldFormattingBarFloat) {
                return this._isHoverStateFlightOnAndBorderDraggableKSOff
                    ? SPRte._getFormattingBarDefaultPosition(this._isRtl)
                    : SPRte._getFormattingBarDefaultPositionDeprecated(this._isRtl);
            }
            else {
                return this._formattingBarPositionWithScroll;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRte.prototype, "_formattingBarPositionWithScroll", {
        get: function () {
            var formattingParPosition = SPRte._getFormattingBarDefaultPosition(this._isRtl);
            formattingParPosition.top = this._scrollableParentTop;
            if (!this._isRtl) {
                formattingParPosition.left = this._rteRect.left - SPRte._CONTROLZONE_PADDING_HORIZONTAL;
            }
            else {
                formattingParPosition.right = this._rteRect.right - SPRte._CONTROLZONE_PADDING_HORIZONTAL;
            }
            formattingParPosition.position = 'fixed';
            return formattingParPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRte.prototype, "_isHoverStateFlightOnAndBorderDraggableKSOff", {
        get: function () {
            var store = this.props.store;
            return store && store.canvasFields && store.canvasFields.isCleanSelectionEnabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRte.prototype, "_isRTESelected", {
        get: function () {
            return this.props.store.selectedControlId === this.props.control.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRte.prototype, "_emphasisClassName", {
        get: function () {
            var _a = this.props.control, emphasisTheme = _a.emphasisTheme, theme = _a.theme;
            if (emphasisTheme && theme) {
                var classNames = _SPRteStyles_styles__WEBPACK_IMPORTED_MODULE_13__["SPRteStyles"].getClassNames({
                    root: 'cke_editable',
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
    Object.defineProperty(SPRte.prototype, "_scrollableParent", {
        get: function () {
            return this.props.store.scrollableParent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRte.prototype, "_scrollableParentTop", {
        get: function () {
            return this._scrollableParent && this._scrollableParent.getBoundingClientRect().top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRte.prototype, "_rteRect", {
        get: function () {
            return this._editorElement && this._editorElement.getBoundingClientRect();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRte.prototype, "_shouldFormattingBarFloat", {
        get: function () {
            if (this._editorElement) {
                var scrollableParentTop = this._scrollableParentTop;
                var rteRect = this._rteRect;
                // We need to float the formatting bar only when the RTE is in the viewport
                return rteRect.top <= scrollableParentTop && scrollableParentTop <= rteRect.bottom;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    SPRte.prototype._fixScrollTop = function () {
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_15__["KillSwitches"].fixScrollPositionForLinkCommandInRTE.isActivated()) {
            this._scrollableParent.scrollTop = this._currentScrollTop;
        }
    };
    SPRte.prototype._onFluidPaste = function (componentUrl, rteData) {
        this.props.store.createFluidWebPart(componentUrl, rteData, this.props.control.position);
    };
    SPRte.prototype._setDelayedFocus = function () {
        var _this = this;
        this._async.setTimeout(function () { return _this._focusCore(); }, 0);
    };
    SPRte.prototype._isFormattingBarStateChanged = function (newState) {
        return (this.state.formattingBarPosition && newState.formattingBarPosition &&
            !Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_7__["isEqual"])(this.state.formattingBarPosition, newState.formattingBarPosition)) ||
            this.state.isFormattingBarHidden !== newState.isFormattingBarHidden;
    };
    SPRte.prototype._onAfterPaste = function () {
        var _this = this;
        _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEvent(this.TAG_NAME + 'CopyPaste');
        this._isPasting = false;
        // Fix the scroll. This might happen too fast before the scroll is messed up, so we will do it again after a delay
        // Having this can reduce flakiness (the scroll jumping for a very short period of time)
        this._scrollableParent.scrollTop = this._currentScrollTop;
        // A small delay to make sure we're fixing the scroll after it's messed up
        window.setTimeout(function () {
            // Resetting scroll to where it was before paste
            _this._scrollableParent.scrollTop = _this._currentScrollTop;
            // If pasted block is large and the cursor goes out of view, scroll to show the cursor on the bottom
            var range = _this._editor ? _this._editor.getSelection() : undefined;
            if (_this._editor && range) {
                var viewportHeight = document.documentElement
                    ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
                    : undefined;
                var cursorTop = _this._editor.getBounds(range.start).top;
                var editorTop = _this._editorElement.getBoundingClientRect().top;
                if (viewportHeight !== undefined && editorTop + cursorTop > viewportHeight) {
                    _this._scrollableParent.scrollTop =
                        _this._currentScrollTop + editorTop + cursorTop - viewportHeight + SPRte._LINE_HEIGHT;
                }
            }
        }, 10);
    };
    SPRte.prototype._shouldFloatFormattingBar = function () {
        var position = this.props.control.position;
        return position && position.sectionIndex === 3;
    };
    SPRte.prototype._isDemoteHeadingsInRTEEnabled = function () {
        var isDemoteHeadingsEnabled = _common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isDemoteHeadingsInRTEWithExperimentEnabled();
        if (isDemoteHeadingsEnabled && !this._demoteHeadingsExp) {
            this._demoteHeadingsExp = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_11__["_ABExperiment"]({
                name: 'DemoteHeadingsOnRTEPasteExperiment',
                startDate: '05/24/2019'
            });
        }
        return isDemoteHeadingsEnabled && this._demoteHeadingsExp.isOn();
    };
    SPRte.prototype._isFloatingRTEToolbarEnabled = function () {
        if (!_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isRTEFloatingToolbarWithExperimentEnabled()) {
            return false;
        }
        else if (!this._rteFloatingToolbarExp) {
            this._rteFloatingToolbarExp = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_11__["_ABExperiment"]({
                name: 'FloatingRTEToolbarExperiment',
                startDate: '11/04/2019'
            });
        }
        return this._rteFloatingToolbarExp.IsExperimentOn();
    };
    Object.defineProperty(SPRte.prototype, "_isPropertyPaneLoadedAndSelected", {
        get: function () {
            return this._spRtePropertyPanePromise && this._isRTESelected;
        },
        enumerable: true,
        configurable: true
    });
    SPRte.prototype._openPropertyPane = function () {
        this._changePropertyPaneState(3 /* Toggle */);
    };
    SPRte.prototype._changePropertyPaneState = function (propertyPaneState) {
        // We need to make sure that property pane is already loaded and
        // RTE is selected before we change the state
        if (this._isPropertyPaneLoadedAndSelected && this.props.store.propertyPaneController) {
            this.props.store.propertyPaneController.requestAction(this.props.control.id, propertyPaneState);
        }
    };
    SPRte.prototype._loadAndInstantiatePropertyPaneControl = function () {
        var _this = this;
        if (!this._spRtePropertyPanePromise) {
            this._spRtePropertyPanePromise =
                Promise.all(/*! import() | sp-rte-propertypane */[__webpack_require__.e("vendors~sp-rte-propertypane"), __webpack_require__.e("sp-rte-propertypane")]).then(__webpack_require__.bind(null, /*! ./PropertyPane/SPRtePropertyPaneControl */ "lruL"))
                    .then(function (spRtePropertyPane) {
                    if (_this.props.store.propertyPaneController) {
                        _this.props.store.propertyPaneController.registerConsumer(_this.props.control.id, new spRtePropertyPane.SPRtePropertyPaneControl(_this));
                    }
                });
        }
    };
    SPRte.prototype._getComputedFileName = function (title) {
        var _this = this;
        var pageContext = this.props.store.pageContext;
        var absoluteUrl = pageContext.web && pageContext.web.absoluteUrl || '/';
        var apiUrl = "/_api/SP.Publishing.SitePageService.ComputeFileName('" + title + "')";
        var requestUrl = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_10__["Uri"].concatenate(absoluteUrl, apiUrl);
        var httpClient = this.props.serviceScope.consume(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_5__["SPHttpClient"].serviceKey);
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_QosMonitor"]('ComputeFileName');
        var correlationId;
        return httpClient.get(requestUrl, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_5__["SPHttpClient"].configurations.v1)
            .then(function (response) {
            correlationId = response.correlationId;
            if (response.ok) {
                qosMonitor.writeSuccess();
                return response.json();
            }
            else {
                qosMonitor.writeExpectedFailure('ComputeFileNameFailedWithNoResponse', undefined, {
                    correlationId: correlationId
                });
            }
        })
            .then(function (response) {
            return response.value;
        })
            .catch(function (error) {
            qosMonitor.writeExpectedFailure('ComputeFileNameFailed', error, {
                correlationId: correlationId
            });
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_TraceLogger"].logErrorData({
                source: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["BaseRte"].logSource,
                error: error,
                serviceScope: _this.props.serviceScope
            });
            throw error;
        });
    };
    Object.defineProperty(SPRte.prototype, "_isEdit", {
        get: function () {
            return _common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isEditTransitionPerFrame() || this.state.displayMode === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["DisplayMode"].Edit;
        },
        enumerable: true,
        configurable: true
    });
    SPRte._TOOLBAR_DEFAULT_POSITION = {
        left: 0,
        top: -36,
        position: 'absolute',
        right: undefined
    };
    SPRte._CONTROLZONE_PADDING_HORIZONTAL = 8;
    SPRte._LINE_HEIGHT = 23;
    SPRte._TOP_OFFSET = 10;
    SPRte._EMPTY_RTE_HTML = '<p><br></p>';
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["autobind"]
    ], SPRte.prototype, "_handleKeyDown", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["autobind"]
    ], SPRte.prototype, "_postEditorCreatedHandlerComplete", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["autobind"]
    ], SPRte.prototype, "_afterEditorCreated", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["autobind"]
    ], SPRte.prototype, "_onBeforePaste", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["autobind"]
    ], SPRte.prototype, "_handleScroll", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["autobind"]
    ], SPRte.prototype, "_handlePagePickerSave", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["autobind"]
    ], SPRte.prototype, "_handlePagePickerUnlink", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["autobind"]
    ], SPRte.prototype, "_onAfterPaste", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["autobind"]
    ], SPRte.prototype, "_openPropertyPane", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["autobind"]
    ], SPRte.prototype, "_changePropertyPaneState", null);
    return SPRte;
}(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_8__["BaseRte"]));



/***/ }),

/***/ "NbyJ":
/*!***************************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasZonePropertyPane/CanvasZoneEmphasisButton.module.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./CanvasZoneEmphasisButton.module.css */ "eKJH");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "OAft":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Tooltip/Tooltip.js ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: Tooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return Tooltip; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Tooltip_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tooltip.base */ "QZCX");
/* harmony import */ var _Tooltip_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tooltip.styles */ "xhMI");



var Tooltip = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Tooltip_base__WEBPACK_IMPORTED_MODULE_1__["TooltipBase"], _Tooltip_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'Tooltip'
});
//# sourceMappingURL=Tooltip.js.map

/***/ }),

/***/ "OfOi":
/*!**************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasToolbox/ToolboxConstants.js ***!
  \**************************************************************************/
/*! exports provided: FEATURED_ITEM_IDS, FEATURED_ITEM_IDS_FOR_TOPIC_PAGE, TOPIC_ITEM_IDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FEATURED_ITEM_IDS", function() { return FEATURED_ITEM_IDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FEATURED_ITEM_IDS_FOR_TOPIC_PAGE", function() { return FEATURED_ITEM_IDS_FOR_TOPIC_PAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOPIC_ITEM_IDS", function() { return TOPIC_ITEM_IDS; });
/* harmony import */ var _RteToolboxItemData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RteToolboxItemData */ "d67+");

// tslint:disable-next-line:export-name
var FEATURED_ITEM_IDS =  true
    ? [
        // For SPO
        _RteToolboxItemData__WEBPACK_IMPORTED_MODULE_0__["RTE_TOOLBOX_ITEM_ID"],
        'd1d91016-032f-456d-98a4-721247c305e8_0',
        'b7dd04e1-19ce-4b24-9132-b60a1c2b910d_0',
        '6410b3b6-d440-4663-8744-378976dc041e_0',
        '490d7c76-1824-45b2-9de3-676421c997fa_0',
        'daf0b71c-6de8-4ef7-b511-faae7c388708_0' // Highlighted content
    ]
    : undefined;
var FEATURED_ITEM_IDS_FOR_TOPIC_PAGE = [
    _RteToolboxItemData__WEBPACK_IMPORTED_MODULE_0__["RTE_TOOLBOX_ITEM_ID"],
    'd1d91016-032f-456d-98a4-721247c305e8_0',
    '275c0095-a77e-4f6d-a2a0-6a7626911518_1' // Stream
];
var TOPIC_ITEM_IDS = [
    '81ce1eba-74ad-4f0d-a692-2133b98bc308_0',
    '29991a50-6f14-42e0-9536-aef85d91b05c_0',
    '9346e298-66c6-4122-853c-a1eef08b5827_0',
    'fa421970-1f49-4de7-a804-51cf66e13f4b_0' // Other Topics
];


/***/ }),

/***/ "P4Am":
/*!*********************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasDragZone/CanvasDragZone.module.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./CanvasDragZone.module.css */ "533C");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "QZCX":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Tooltip/Tooltip.base.js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! exports provided: TooltipBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipBase", function() { return TooltipBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Callout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Callout */ "cEYc");
/* harmony import */ var _Callout__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Callout__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/DirectionalHint */ "zCYU");
/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_4__);





var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var TooltipBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TooltipBase, _super);
    function TooltipBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onRenderContent = function (props) {
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("p", { className: _this._classNames.subText }, props.content);
        };
        return _this;
    }
    TooltipBase.prototype.render = function () {
        var _a = this.props, className = _a.className, calloutProps = _a.calloutProps, directionalHint = _a.directionalHint, directionalHintForRTL = _a.directionalHintForRTL, styles = _a.styles, id = _a.id, maxWidth = _a.maxWidth, _b = _a.onRenderContent, onRenderContent = _b === void 0 ? this._onRenderContent : _b, targetElement = _a.targetElement, theme = _a.theme;
        this._classNames = getClassNames(styles, {
            theme: theme,
            className: className || (calloutProps && calloutProps.className),
            beakWidth: calloutProps && calloutProps.beakWidth,
            gapSpace: calloutProps && calloutProps.gapSpace,
            maxWidth: maxWidth
        });
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Callout__WEBPACK_IMPORTED_MODULE_3__["Callout"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ target: targetElement, directionalHint: directionalHint, directionalHintForRTL: directionalHintForRTL }, calloutProps, Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getNativeProps"])(this.props, _Utilities__WEBPACK_IMPORTED_MODULE_2__["divProperties"], ['id']), { className: this._classNames.root }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: this._classNames.content, id: id, role: "tooltip", onMouseEnter: this.props.onMouseEnter, onMouseLeave: this.props.onMouseLeave }, onRenderContent(this.props, this._onRenderContent))));
    };
    // Specify default props values
    TooltipBase.defaultProps = {
        directionalHint: _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_4__["DirectionalHint"].topCenter,
        maxWidth: '364px',
        calloutProps: {
            isBeakVisible: true,
            beakWidth: 16,
            gapSpace: 0,
            setInitialFocus: true,
            doNotLayer: false
        }
    };
    return TooltipBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=Tooltip.base.js.map

/***/ }),

/***/ "R6FH":
/*!**************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasToolboxHint/LayoutCanvasToolboxHint.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./LayoutCanvasToolboxHint.css */ "oDBz");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "RX6m":
/*!*************************************!*\
  !*** ./lib/fakeComponents/spRte.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error('@ms/sp-rte has not been initialized');


/***/ }),

/***/ "RtnV":
/*!*****************************************************!*\
  !*** ./lib/sp-canvas/common/ComponentPerfLogger.js ***!
  \*****************************************************/
/*! exports provided: ComponentPerfLogger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentPerfLogger", function() { return ComponentPerfLogger; });
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__);
// Copyright (c) Microsoft. All rights reserved.


/**
 * This class is supposed to use monitoring multi stage perf. It's alternative for RUMOne, because RUMOne take
 * too much cost when it comes to storage in Aria/MDM.
 * Use ComponentPerfLogger to measure performance of individual component, irrespective of within or outside
 * the viewport. RUMOne is useful only in the context of page load and any control loaded during that period.
 * @preapproved @internal
 */
var ComponentPerfLogger = /** @class */ (function () {
    function ComponentPerfLogger() {
        this._scenarioQoS = new Map();
    }
    ComponentPerfLogger.getInstance = function () {
        if (!ComponentPerfLogger._instance) {
            ComponentPerfLogger._instance = new ComponentPerfLogger();
        }
        return ComponentPerfLogger._instance;
    };
    /**
     * To start an perf log to monitor multi stage perf.
     */
    ComponentPerfLogger.prototype.start = function (scenarioName, firstStageName) {
        var scenarioQoS = this._scenarioQoS.get(scenarioName);
        if (scenarioQoS) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logVerbose(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogSource"].create('ComponentPerfLogger.start'), _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["StringHelper"].format('duplicate call ComponentPerfLogger.start={0} or scenario={1} name duplicated.', scenarioName, firstStageName));
            var latestQoS = scenarioQoS[scenarioQoS.length - 1];
            latestQoS.writeExpectedFailure('CallStartDuplicate');
            this._scenarioQoS.delete(scenarioName);
        }
        this._scenarioQoS.set(scenarioName, [
            new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"](this._generateQoSName(scenarioName, firstStageName))
        ]);
    };
    /**
     * return: true means markStage successfully while false means it is failure.
     */
    ComponentPerfLogger.prototype.markStage = function (scenarioName, stageName) {
        var scenarioQoS = this._scenarioQoS.get(scenarioName);
        if (!scenarioQoS || scenarioQoS.length <= 0) {
            var error = new Error(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_1__["StringHelper"].format('Wrong usage: should call start first with scenarioName={0} and stageName={1}', scenarioName, stageName));
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogSource"].create('ComponentPerfLogger.markStage'), error);
            return false;
        }
        var latestQoS = scenarioQoS[scenarioQoS.length - 1];
        latestQoS.writeSuccess();
        var newStageQoS = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"](this._generateQoSName(scenarioName, stageName));
        scenarioQoS.push(newStageQoS);
        return true;
    };
    /**
     * return: true means markStage successfully while false means it is failure.
     */
    ComponentPerfLogger.prototype.end = function (scenarioName) {
        var scenarioQoS = this._scenarioQoS.get(scenarioName);
        if (!scenarioQoS || scenarioQoS.length <= 0) {
            var error = new Error('Wrong usage: should call start first with scenarioName=' + scenarioName);
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogSource"].create('ComponentPerfLogger.end'), error);
            return false;
        }
        var lastQoS = scenarioQoS[scenarioQoS.length - 1];
        lastQoS.writeSuccess();
        this._scenarioQoS.delete(scenarioName);
        return true;
    };
    ComponentPerfLogger.prototype._generateQoSName = function (prefixName, lastName) {
        return 'Perf.' + prefixName + '.' + lastName;
    };
    return ComponentPerfLogger;
}());



/***/ }),

/***/ "UJDV":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Utilities.js ***!
  \***********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Utilities.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "VaVC":
/*!**********************************************!*\
  !*** ./lib/fakeComponents/contentHandler.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error('@ms/content-handler has not been initialized');


/***/ }),

/***/ "Vp7h":
/*!********************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasStore/shouldExcludeFromToolbox.js ***!
  \********************************************************************************/
/*! exports provided: shouldExcludeFromToolbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldExcludeFromToolbox", function() { return shouldExcludeFromToolbox; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Webpart IDs
 */
var CONNECTORS_ID = '893a257e-9c92-49bc-8a36-2f6bb058da34';
var O365_VIDEO_ID = '275c0095-a77e-4f6d-a2a0-6a7626911518';
var LINK_PREVIEW_ID = '6410b3b6-d440-4663-8744-378976dc041e';
var PLANNER_ID = '39c4c1c2-63fa-41be-8cc2-f6c0b49b253d';
var SAVED_FOR_LATER_ID = '9ac82c99-6122-45e3-8fc6-b83d3cf1c0a8';
var ONPREM_EXCLUDE_WEBPART_FROM_TOOLBOX = new Set([O365_VIDEO_ID, LINK_PREVIEW_ID]);
var EXCLUDE_WEBPART_FROM_TOOLBOX = new Set([SAVED_FOR_LATER_ID]);
var SAVED_FOR_LATER_FLIGHT = 1468; /*ClientSideWebPartSaveForLater */
/**
 * Various grouping of webpart IDs
 */
var GROUP_ONLY_PARTS = new Set([CONNECTORS_ID, PLANNER_ID]);
function shouldExcludeFromToolbox(manifest, pageContext) {
    if (false) {}
    // SAVED_FOR_LATER_FLIGHT is used to hide the webpart, for the stage flight hasn't reached.
    // TODO: VSO #737533
    if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(SAVED_FOR_LATER_FLIGHT) && EXCLUDE_WEBPART_FROM_TOOLBOX.has(manifest.id)) {
        return true;
    }
    return manifest.hiddenFromToolbox ||
        missingRequiredGroup(manifest, pageContext) ||
        _missingSupportSharePointWebPart(manifest);
}
function missingRequiredGroup(manifest, pageContext) {
    var hasGroup = Boolean(pageContext && pageContext.site && pageContext.site.group && pageContext.site.group.id);
    return !hasGroup && GROUP_ONLY_PARTS.has(manifest.id);
}
function _missingSupportSharePointWebPart(manifest) {
    if (!manifest.supportedHosts) {
        // If there is no value we default to false for back compat
        return false;
    }
    var missingSupportedHost = true;
    for (var _i = 0, _a = manifest.supportedHosts; _i < _a.length; _i++) {
        var supportedHost = _a[_i];
        if (supportedHost === 'SharePointWebPart') {
            missingSupportedHost = false;
            break;
        }
    }
    return missingSupportedHost;
}


/***/ }),

/***/ "ZsUb":
/*!***********************************************!*\
  !*** ./lib/sp-canvas/webPartFactory/index.js ***!
  \***********************************************/
/*! exports provided: WebPartFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WebPartFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebPartFactory */ "v9l7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebPartFactory", function() { return _WebPartFactory__WEBPACK_IMPORTED_MODULE_0__["WebPartFactory"]; });




/***/ }),

/***/ "cEYc":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Callout.js ***!
  \*********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Callout.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "d67+":
/*!****************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasToolbox/RteToolboxItemData.js ***!
  \****************************************************************************/
/*! exports provided: RTE_TOOLBOX_ITEM_ID, getRteToolboxItemData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RTE_TOOLBOX_ITEM_ID", function() { return RTE_TOOLBOX_ITEM_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRteToolboxItemData", function() { return getRteToolboxItemData; });
/* harmony import */ var _canvasControl_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../canvasControl/index */ "iO6m");
/* harmony import */ var _RteToolboxItemDataStrings_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RteToolboxItemDataStrings.resx */ "w6ZW");


var RTE_TOOLBOX_ITEM_ID = 'RTE';
function getRteToolboxItemData(position) {
    return {
        id: RTE_TOOLBOX_ITEM_ID,
        description: _RteToolboxItemDataStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TextWebpartDescription,
        displayName: _RteToolboxItemDataStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TextWebPartDisplayName,
        msIconName: 'Font',
        groupId: 'cf066440-0614-43d6-98ae-0b31cf14c7c3',
        itemData: {
            controlType: _canvasControl_index__WEBPACK_IMPORTED_MODULE_0__["CanvasControlType"].RTE,
            id: RTE_TOOLBOX_ITEM_ID,
            innerHTML: '',
            position: position
        }
    };
}


/***/ }),

/***/ "dczX":
/*!*************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasDragZone/CanvasDragZone.module.scss.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./CanvasDragZone.module.css */ "P4Am");
var styles = {
    dragIconContainer: 'dragIconContainer_ce2c2874',
    dragIcon: 'dragIcon_ce2c2874',
    dragText: 'dragText_ce2c2874',
    singleColumn: 'singleColumn_ce2c2874',
    doubleColumn: 'doubleColumn_ce2c2874',
    tripleColumn: 'tripleColumn_ce2c2874',
    columnLeftTwoThirds: 'columnLeftTwoThirds_ce2c2874',
    columnRightTwoThirds: 'columnRightTwoThirds_ce2c2874',
    disabledArea: 'disabledArea_ce2c2874'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "eKJH":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/sp-canvas/canvas/editChunk/canvasZonePropertyPane/CanvasZoneEmphasisButton.module.css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".emphasisPickerButton_4098c40d{width:66px;height:66px}.emphasisPickerButton_4098c40d i{font-size:20px}.emphasisPickerButton_4098c40d.isNone_4098c40d{outline:1px solid}.emphasisPickerButton_4098c40d.isSelected_4098c40d{-webkit-box-shadow:inset 0 0 0 4px \"[theme:neutralTertiaryAlt, default: #c8c6c4]\",inset 0 0 0 8px \"[theme:white, default: #ffffff]\";box-shadow:inset 0 0 0 4px \"[theme:neutralTertiaryAlt, default: #c8c6c4]\",inset 0 0 0 8px \"[theme:white, default: #ffffff]\"}.emphasisPickerButton_4098c40d:hover{-webkit-box-shadow:inset 0 0 0 4px \"[theme:neutralLight, default: #edebe9]\",inset 0 0 0 8px \"[theme:white, default: #ffffff]\";box-shadow:inset 0 0 0 4px \"[theme:neutralLight, default: #edebe9]\",inset 0 0 0 8px \"[theme:white, default: #ffffff]\"}.emphasisPickerButton_4098c40d:focus{-webkit-box-shadow:inset 0 0 0 1px \"[theme:neutralSecondary, default: #605e5c]\",inset 0 0 0 5px \"[theme:neutralTertiaryAlt, default: #c8c6c4]\",inset 0 0 0 9px \"[theme:white, default: #ffffff]\";box-shadow:inset 0 0 0 1px \"[theme:neutralSecondary, default: #605e5c]\",inset 0 0 0 5px \"[theme:neutralTertiaryAlt, default: #c8c6c4]\",inset 0 0 0 9px \"[theme:white, default: #ffffff]\"}", ""]);



/***/ }),

/***/ "fy9q":
/*!************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/SPRte.resx.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_MwrtOXTlcgEoK/GDGf1eQg';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "gVme":
/*!************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasStore/SmoothTasksQueue.js ***!
  \************************************************************************/
/*! exports provided: runTasksWithoutBlockingAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runTasksWithoutBlockingAnimation", function() { return runTasksWithoutBlockingAnimation; });
function _runTasks(tasks, onComplete) {
    var task = tasks.shift();
    if (task) {
        // `requestAnimationFrame` ensures only one control's setDisplayMode is called  per frame. `setTimeout` make sure
        // the javascript execution will not block the rendering of the frame. After one tasks is run, it queues another
        // one after next animation frame. So users will be able to see frames rendered reliably while the synchronous
        // code is executed.
        requestAnimationFrame(function () {
            setTimeout(function () {
                void task().then(function () {
                    _runTasks(tasks, onComplete);
                });
            }, 0);
        });
    }
    else {
        onComplete();
    }
}
function runTasksWithoutBlockingAnimation(tasks) {
    return new Promise(function (resolve) {
        _runTasks(tasks, resolve);
    });
}


/***/ }),

/***/ "h4ae":
/*!**************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasToolboxHint/CanvasToolboxHint.styles.js ***!
  \**************************************************************************************/
/*! exports provided: CanvasToolboxHintStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasToolboxHintStyles", function() { return CanvasToolboxHintStyles; });
/* harmony import */ var _common_StyleHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/StyleHelpers */ "wFVB");

var CanvasToolboxHintStyles = /** @class */ (function () {
    function CanvasToolboxHintStyles() {
    }
    CanvasToolboxHintStyles.getClassNames = function (props) {
        return Object(_common_StyleHelpers__WEBPACK_IMPORTED_MODULE_0__["getClassNames"])(CanvasToolboxHintStyles._getStyles, props);
    };
    CanvasToolboxHintStyles._getStyles = function (props) {
        var theme = props.theme, root = props.root;
        var palette = theme.palette;
        return {
            root: [
                root,
                {
                    selectors: {
                        '&::before': {
                            borderTopColor: palette.neutralTertiary
                        },
                        '&:hover::before, &:focus::before': {
                            borderTopColor: palette.themePrimary
                        },
                        '&:hover .CanvasToolboxHint-plusButton, &:focus .CanvasToolboxHint-plusButton': {
                            backgroundColor: palette.themePrimary,
                            boxShadow: '0 0 4px 0 ' + palette.themeDark,
                            color: palette.white
                        }
                    }
                }
            ],
            plusButton: [
                'CanvasToolboxHintEmphasis-plusButton',
                {
                    backgroundColor: palette.neutralTertiary,
                    boxShadow: '0 0 4px 0 ' + palette.blackTranslucent40,
                    color: palette.white
                }
            ]
        };
    };
    return CanvasToolboxHintStyles;
}());



/***/ }),

/***/ "jOYA":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/sp-canvas/canvas/editChunk/toolbar/Toolbar.css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".CanvasControlToolbar{position:absolute;top:0;width:32px;z-index:1}[dir=ltr] .CanvasControlToolbar{left:-40px}[dir=rtl] .CanvasControlToolbar{right:-40px}[dir=ltr] .CanvasControlToolbar{padding-right:10px}[dir=rtl] .CanvasControlToolbar{padding-left:10px}", ""]);



/***/ }),

/***/ "l9Wn":
/*!*************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasDragZone/CanvasSectionDragZoneUtils.js ***!
  \*************************************************************************************/
/*! exports provided: CanvasSectionDragZoneUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasSectionDragZoneUtils", function() { return CanvasSectionDragZoneUtils; });
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasDragZoneConstants */ "9S6n");
/* harmony import */ var _CanvasDragIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CanvasDragIcon */ "nRzo");
/* harmony import */ var _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CanvasDragZone.resx */ "lozE");




var SECTION_DRAG_ZONE_STRINGS = {
    // Pass empty handleTitle to avoid two tooltips on hover. Tooltip now comes from toolbar item
    handleTitle: '',
    moveStarted: _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_3__["default"].DragZoneMoveStarted,
    moveComplete: _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_3__["default"].DragZoneMoveCompleteZone,
    moveCancelled: _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_3__["default"].DragZoneMoveCancelled,
    moveNotAllowed: _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_3__["default"].DragZoneMoveNotAllowedAriaLabel,
    moveInsideLevel: [_CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_3__["default"].DragZoneMoveInsideLevelControl]
};
var CanvasSectionDragZoneUtils = /** @class */ (function () {
    function CanvasSectionDragZoneUtils(getStore) {
        var _this = this;
        this._dragIcon = new _CanvasDragIcon__WEBPACK_IMPORTED_MODULE_2__["CanvasDragIcon"]();
        this.getDragZoneProps = function () {
            return {
                treeLevelTagsBottomUp: [_CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_1__["CanvasDragZoneConstants"].zoneDragTag],
                dropPositionOffsetBottomPx: _CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_1__["CanvasDragZoneConstants"].LINE_OFFSET_BOTTOM,
                dropPositionOffsetTopPx: _CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_1__["CanvasDragZoneConstants"].LINE_OFFSET_TOP,
                onMoved: _this._onZoneMoved,
                onMoveStart: _this._onZoneMoveStart,
                canDropOnEmptyParent: false,
                dragHandleTags: [_CanvasDragZoneConstants__WEBPACK_IMPORTED_MODULE_1__["CanvasDragZoneConstants"].zoneDragHandleTag],
                icon: _this._dragIcon.HTMLIcon,
                dragZoneStrings: SECTION_DRAG_ZONE_STRINGS,
                scrollIntoView: _this._store.scrollIntoView
            };
        };
        /**
         * Handler called by the DragZone when a zone has been picked up and the drag has started
         * @param position The position of the zone before the move started
         */
        this._onZoneMoveStart = function (position) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_EngagementLogger"].logEvent('Canvas.MoveZone.Click');
            if (!CanvasSectionDragZoneUtils._isValidZonePosition(position)) {
                return;
            }
            var layout = _this._store.canvasLayout;
            var zones = layout.zones;
            var oldZone = zones[position[0]];
            _this._dragIcon.setMoveIconBasedOnZone(oldZone);
        };
        /**
         * Handler called by the DragZone when a zone has been dropped to a new position.
         * The position of the zone consists of an array with one item, the zone index in the layout
         * @param oldPosition - The position of the zone before it is moved
         * @param newPosition - The position of the zone after it is moved
         */
        this._onZoneMoved = function (oldPosition, newPosition) {
            // if the new position is right before or after the current position, the resulting move would be a no op
            if (oldPosition === newPosition ||
                !CanvasSectionDragZoneUtils._isValidZonePosition(oldPosition) ||
                !CanvasSectionDragZoneUtils._isValidZonePosition(newPosition) ||
                oldPosition[0] === newPosition[0] - 1 ||
                oldPosition[0] === newPosition[0]) {
                return;
            }
            var moveMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('CanvasZoneMove');
            var layout = _this._store.canvasLayout;
            var zones = layout.zones;
            try {
                var oldIndex = oldPosition[0];
                var newIndex = newPosition[0];
                var oldZone = zones[oldIndex];
                var newZoneIndex = 0;
                // if the newIndex exists just get the newZoneIndex from the zone there
                if (newIndex < zones.length) {
                    newZoneIndex = zones[newIndex].index;
                }
                else {
                    newZoneIndex = zones[zones.length - 1].index + 1;
                }
                layout.moveZone(oldZone, newZoneIndex);
                moveMonitor.writeSuccess();
            }
            catch (err) {
                moveMonitor.writeUnexpectedFailure('ExceptionMovingZone', err);
            }
        };
        this._getStore = getStore;
    }
    /**
     * A zone position contains [zoneIndex] so the position object must have a length of exactly 1.
     * @param position The position to be evaluated as a valid zone position
     */
    CanvasSectionDragZoneUtils._isValidZonePosition = function (position) {
        return position && position.length === 1;
    };
    Object.defineProperty(CanvasSectionDragZoneUtils.prototype, "_store", {
        get: function () {
            return this._getStore();
        },
        enumerable: true,
        configurable: true
    });
    return CanvasSectionDragZoneUtils;
}());



/***/ }),

/***/ "lozE":
/*!******************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasDragZone/CanvasDragZone.resx.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_+b5qGTPD+RXDByAXIV1Ykg';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "m0cW":
/*!**************************************************!*\
  !*** ./lib/sp-canvas/common/ControlsInOneRow.js ***!
  \**************************************************/
/*! exports provided: ControlsInOneRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlsInOneRow", function() { return ControlsInOneRow; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ControlsInOneRow_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ControlsInOneRow.module.scss */ "sscl");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__);
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file ControlsInOneRow.tsx
 */




/**
 * ControlsInOneRow aligns the property pane controls in one row
 */
var ControlsInOneRow = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ControlsInOneRow, _super);
    function ControlsInOneRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // SPPPLAT VSO#392476: Align the controls in one row in property pane
    // Todo: Remove this class when property pane supports aligning controls in one row
    ControlsInOneRow.prototype.render = function () {
        var _a;
        var cssClass = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["css"])(_ControlsInOneRow_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].controlsInOneRow, (_a = {}, _a[_ControlsInOneRow_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].spaceInBetween] = this.props.spaceInBetween, _a));
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: cssClass }, this.props.children);
    };
    return ControlsInOneRow;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));



/***/ }),

/***/ "nRzo":
/*!*************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasDragZone/CanvasDragIcon.js ***!
  \*************************************************************************/
/*! exports provided: CanvasDragIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasDragIcon", function() { return CanvasDragIcon; });
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _canvasControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../canvasControl */ "iO6m");
/* harmony import */ var _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../loc/CanvasStrings.resx */ "K08d");
/* harmony import */ var _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CanvasDragZone.resx */ "lozE");
/* harmony import */ var _CanvasDragZone_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CanvasDragZone.module.scss */ "dczX");





var CanvasDragIcon = /** @class */ (function () {
    function CanvasDragIcon() {
        this._icon = this._getDefaultIcon();
    }
    CanvasDragIcon._extractLabelFromRTE = function (control) {
        var domParser = new DOMParser();
        var docToParse = domParser.parseFromString(control.innerHTML || '', 'text/html');
        var element = docToParse.firstElementChild && docToParse.firstElementChild;
        return (element && element.innerText) || _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_3__["default"].DragIconFallbackRTEText;
    };
    Object.defineProperty(CanvasDragIcon.prototype, "HTMLIcon", {
        get: function () {
            return this._icon;
        },
        enumerable: true,
        configurable: true
    });
    CanvasDragIcon.prototype.setMoveIconBasedOnControl = function (control) {
        if (!control) {
            return;
        }
        var iconControl = this._getTagByInternalId(CanvasDragIcon.ICON_INTERNAL_ID);
        var textControl = this._getTagByInternalId(CanvasDragIcon.TEXT_INTERNAL_ID);
        if (control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_1__["CanvasControlType"].RTE) {
            iconControl.className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["getIconClassName"])('Font');
            textControl.innerText = CanvasDragIcon._extractLabelFromRTE(control);
        }
        else if (control.controlType === _canvasControl__WEBPACK_IMPORTED_MODULE_1__["CanvasControlType"].WebPartZone) {
            if (control &&
                control.webPartManifest &&
                control.webPartManifest.preconfiguredEntries &&
                control.webPartManifest.preconfiguredEntries.length > 0) {
                var entry = control.webPartManifest.preconfiguredEntries[0]; // tslint:disable-line:no-any
                iconControl.className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["getIconClassName"])(entry.officeFabricIconFontName);
            }
            textControl.innerText = control && control.webPartData && control.webPartData.title;
        }
        this._className = iconControl.className;
        this._innerText = textControl.innerText || textControl.innerHTML;
    };
    CanvasDragIcon.prototype.setMoveIconBasedOnZone = function (zone) {
        if (!zone) {
            return;
        }
        var iconControl = this._getTagByInternalId(CanvasDragIcon.ICON_INTERNAL_ID);
        var textControl = this._getTagByInternalId(CanvasDragIcon.TEXT_INTERNAL_ID);
        if (!iconControl || !textControl) {
            return;
        }
        iconControl.className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["getIconClassName"])('Edit');
        var text;
        switch (zone.layoutType) {
            case _canvasControl__WEBPACK_IMPORTED_MODULE_1__["CanvasControlType"].FullWidth:
                text = _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].ToolboxFullWidthColumnPart;
                iconControl.className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["getIconClassName"])('FullWidth');
                break;
            case _canvasControl__WEBPACK_IMPORTED_MODULE_1__["CanvasControlType"].OneColumn:
                text = _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].ToolboxOneColumnPart;
                iconControl.className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["getIconClassName"])('SingleColumn');
                break;
            case _canvasControl__WEBPACK_IMPORTED_MODULE_1__["CanvasControlType"].OneThirdColumnLeft:
                text = _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].ToolboxOneThirdLeftColumnPart;
                iconControl.className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["getIconClassName"])('ColumnRightTwoThirds');
                break;
            case _canvasControl__WEBPACK_IMPORTED_MODULE_1__["CanvasControlType"].OneThirdColumnRight:
                text = _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].ToolboxOneThirdRightColumnPart;
                iconControl.className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["getIconClassName"])('ColumnLeftTwoThirds');
                break;
            case _canvasControl__WEBPACK_IMPORTED_MODULE_1__["CanvasControlType"].ThreeColumns:
                text = _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].ToolboxThreeColumnPart;
                iconControl.className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["getIconClassName"])('TripleColumn');
                break;
            case _canvasControl__WEBPACK_IMPORTED_MODULE_1__["CanvasControlType"].TwoColumns:
                text = _loc_CanvasStrings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].ToolboxTwoColumnPart;
                iconControl.className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["getIconClassName"])('DoubleColumn');
                break;
            default:
                text = '';
                if (true) {
                    throw new Error('A new layout has been added, need to add drag icon string');
                }
        }
        textControl.innerText = text;
        this._className = iconControl.className;
        this._innerText = text;
    };
    CanvasDragIcon.prototype.setDisallowedIcon = function () {
        var iconControl = this._getTagByInternalId(CanvasDragIcon.ICON_INTERNAL_ID);
        var textControl = this._getTagByInternalId(CanvasDragIcon.TEXT_INTERNAL_ID);
        iconControl.className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["getIconClassName"])('StatusErrorFull');
        textControl.innerText = _CanvasDragZone_resx__WEBPACK_IMPORTED_MODULE_3__["default"].DragZoneMoveNotAllowed;
    };
    CanvasDragIcon.prototype.setToPreviousState = function () {
        var iconControl = this._getTagByInternalId(CanvasDragIcon.ICON_INTERNAL_ID);
        var textControl = this._getTagByInternalId(CanvasDragIcon.TEXT_INTERNAL_ID);
        iconControl.className = this._className;
        textControl.innerText = this._innerText;
    };
    CanvasDragIcon.prototype._getDefaultIcon = function () {
        var dragIcon = document.createElement('div');
        dragIcon.className = _CanvasDragZone_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].dragIconContainer;
        var iconContainer = document.createElement('div');
        iconContainer.className = _CanvasDragZone_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].dragIcon;
        var iconElement = document.createElement('i');
        iconElement.setAttribute(CanvasDragIcon.DATA_INTERNAL_ID, CanvasDragIcon.ICON_INTERNAL_ID);
        iconContainer.appendChild(iconElement);
        var textContainer = document.createElement('div');
        textContainer.className = _CanvasDragZone_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].dragText;
        textContainer.classList.add('ms-fontSize-m');
        textContainer.setAttribute(CanvasDragIcon.DATA_INTERNAL_ID, CanvasDragIcon.TEXT_INTERNAL_ID);
        dragIcon.appendChild(iconContainer);
        dragIcon.appendChild(textContainer);
        document.body.appendChild(dragIcon);
        return dragIcon;
    };
    CanvasDragIcon.prototype._getTagByInternalId = function (internalId) {
        return this._icon.querySelector("[" + CanvasDragIcon.DATA_INTERNAL_ID + "='" + internalId + "']");
    };
    CanvasDragIcon.ICON_INTERNAL_ID = 'iconControl';
    CanvasDragIcon.TEXT_INTERNAL_ID = 'textControl';
    CanvasDragIcon.DATA_INTERNAL_ID = 'data-internal-id';
    return CanvasDragIcon;
}());



/***/ }),

/***/ "oDBz":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/sp-canvas/canvas/editChunk/canvasToolboxHint/LayoutCanvasToolboxHint.css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".CanvasToolboxHint{background:0 0;border:none;cursor:pointer;opacity:0;overflow:visible;outline:0;padding:0;position:relative;-webkit-transition:all .3s ease;transition:all .3s ease;color:\"[theme:neutralTertiary, default: #a19f9d]\"}.CanvasToolboxHint:not(.AlignedHint){width:100%}.CanvasToolboxHint .CanvasToolboxHint-plusButtonWrapper .CanvasToolboxHint-plusButton{border-radius:50%;padding:0;text-align:center;-webkit-transition:all .3s ease;transition:all .3s ease}.CanvasToolboxHint .CanvasToolboxHint-plusButtonWrapper .CanvasToolboxHint-plusButton.CanvasToolboxHint-plusButtonZone{position:absolute;font-size:14px;height:23px;line-height:23px;width:23px;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.CanvasToolboxHint .CanvasToolboxHint-plusButtonWrapper .CanvasToolboxHint-plusButton.CanvasToolboxHint-plusButtonZone-clean{position:absolute;color:\"[theme:bodyText, default: #323130]\";opacity:1;border-radius:0;font-size:14px;height:32px;line-height:32px;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%);width:32px}.CanvasToolboxHint .CanvasToolboxHint-plusButtonWrapper .CanvasToolboxHint-plusButton.CanvasToolboxHint-plusButtonSection{position:relative;font-size:14px;height:23px;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%);line-height:23px;top:0;width:23px}.CanvasToolboxHint .CanvasToolboxHint-plusButtonWrapper .CanvasToolboxHint-plusButton .ms-Icon{position:relative}.CanvasToolboxHint:before{border-top-width:1px;border-top-style:dashed;content:\"\";height:0;position:absolute;top:0;width:100%;-webkit-transition:all .3s ease;transition:all .3s ease}[dir=ltr] .CanvasToolboxHint:before{left:0}[dir=rtl] .CanvasToolboxHint:before{right:0}.CanvasToolboxHint.ZoneHint{display:block;position:relative;height:0}.CanvasToolboxHint.ZoneHint .CanvasToolboxHint-plusButton:not(.CanvasToolboxHint-plusButtonZone-clean){-webkit-box-shadow:0 0 2px 4px \"[theme:neutralLighter, default: #f3f2f1]\";box-shadow:0 0 2px 4px \"[theme:neutralLighter, default: #f3f2f1]\";background-color:\"[theme:neutralTertiary, default: #a19f9d]\";color:\"[theme:white, default: #ffffff]\";z-index:1}.CanvasToolboxHint.ZoneHint:focus:before,.CanvasToolboxHint.ZoneHint:hover:before{border-top-color:\"[theme:themePrimary, default: #0078d4]\"}.CanvasToolboxHint.ZoneHint:focus .CanvasToolboxHint-plusButton,.CanvasToolboxHint.ZoneHint:hover .CanvasToolboxHint-plusButton{background-color:\"[theme:themePrimary, default: #0078d4]\"}.CanvasToolboxHint.ZoneHint:focus .CanvasToolboxHint-plusButton.CanvasToolboxHint-plusButtonZone-clean,.CanvasToolboxHint.ZoneHint:hover .CanvasToolboxHint-plusButton.CanvasToolboxHint-plusButtonZone-clean{color:\"[theme:white, default: #ffffff]\"}.CanvasToolboxHint.ZoneHint.zone-active-clean:before{border-top-color:\"[theme:neutralTertiary, default: #a19f9d]\"}.CanvasToolboxHint.ZoneHint.zone-selected:before{border-top-color:\"[theme:themePrimary, default: #0078d4]\"}.CanvasToolboxHint.ZoneHint.zone-active-clean+.CanvasZoneContainer--selected:before{color:\"[theme:neutralTertiary, default: #a19f9d]\"}.CanvasToolboxHint.ZoneHint.zone-active-clean:before,.CanvasToolboxHint.ZoneHint.zone-selected:before{border-top-width:1px;border-top-style:solid}.CanvasToolboxHint.ZoneHint.zone-active-clean .CanvasToolboxHint-plusButton,.CanvasToolboxHint.ZoneHint.zone-selected .CanvasToolboxHint-plusButton{background-color:\"[theme:themePrimary, default: #0078d4]\";opacity:1}.CanvasToolboxHint.ZoneHint.zone-active-clean .CanvasToolboxHint-plusButton.CanvasToolboxHint-plusButtonZone-clean,.CanvasToolboxHint.ZoneHint.zone-selected .CanvasToolboxHint-plusButton.CanvasToolboxHint-plusButtonZone-clean{background:0 0;color:\"[theme:bodyText, default: #323130]\"}.CanvasToolboxHint.ZoneHint.zone-active-clean:focus .CanvasToolboxHint-plusButtonZone-clean,.CanvasToolboxHint.ZoneHint.zone-active-clean:hover .CanvasToolboxHint-plusButtonZone-clean,.CanvasToolboxHint.ZoneHint.zone-selected:focus .CanvasToolboxHint-plusButtonZone-clean,.CanvasToolboxHint.ZoneHint.zone-selected:hover .CanvasToolboxHint-plusButtonZone-clean{border-radius:0;opacity:1;background-color:\"[theme:themePrimary, default: #0078d4]\";color:\"[theme:white, default: #ffffff]\"}.CanvasToolboxHint.ZoneHint.zone-active-clean+.CanvasZoneContainer--nonselected:before,.CanvasToolboxHint.ZoneHint.zone-selected+.CanvasZoneContainer--nonselected:before{border-top:none}.CanvasToolboxHint.SectionHint .CanvasToolboxHint-plusButton{opacity:1}.CanvasToolboxHint.SectionHint:before{border-top-width:1px;border-top-style:solid;top:calc(50% - 1px)}.Canvas>.CanvasToolboxHint:first-of-type:last-of-type,.Canvas>.CanvasToolboxHint:first-of-type:last-of-type .CanvasToolboxHint-plusButton,.CanvasSection:hover button.CanvasToolboxHint:first-of-type:last-of-type,.CanvasToolboxHint.is-visible,.CanvasToolboxHint.zone-active .CanvasToolboxHint-plusButton,.CanvasToolboxHint:focus,.CanvasToolboxHint:focus .CanvasToolboxHint-plusButton,.CanvasToolboxHint:hover,.CanvasToolboxHint:hover .CanvasToolboxHint-plusButton,.CanvasZone--selected button.CanvasToolboxHint:first-of-type:last-of-type,.EmptyCanvasHint button.CanvasToolboxHint:first-of-type{opacity:1}@media screen and (-ms-high-contrast:active){.CanvasToolboxHint{color:#1aebff}.CanvasToolboxHint:focus .CanvasToolboxHint-plusButton{border:3px dotted #1aebff;-webkit-box-sizing:content-box;box-sizing:content-box}}@media screen and (-ms-high-contrast:black-on-white){.CanvasToolboxHint{color:#37006e}.CanvasToolboxHint:focus .CanvasToolboxHint-plusButton{border:3px dotted #1aebff;-webkit-box-sizing:content-box;box-sizing:content-box}}", ""]);



/***/ }),

/***/ "ogac":
/*!****************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/SPRteDataLayer.js ***!
  \****************************************************************/
/*! exports provided: withDataControlled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withDataControlled", function() { return withDataControlled; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/Flights */ "qRiB");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/KillSwitches */ "17t3");




/**
 * The high order component to wrap SPRte to overcome the performance challenges of re-rendering
 * when data is updated from the RTE components.
 *
 * Challenge of doing it inside RTE components:
 * Previously we were doing the [React controlled component](https://reactjs.org/docs/forms.html#controlled-components)
 * pattern where any data update should notify parent and trigger a re-render to keep the props update-to-date.
 * This is to make sure in `componentDidUpdate` we can compare props with previous props to know if anything needs to
 * be updated.
 *
 * However, re-rendering costs a lot when canvas is large. We were re-rendering the whole CanvasComponent in
 * the begining. But it turns out even re-rendering single RTE instance per typing is expensive enough.
 *
 * While `componentWillReceiveProps` is discoraged, now there is no easy way in a React component class to know how
 * re-render is triggered among 3 typical ways: Re-render by parent, state updates, or forceUpdate(). In order to set
 * the RTE data when the data is updated from upper level (e.g. through undo-redo), we need to know whether the data
 * is different than the one that is currently rendered at the exact time the component is re-rendered by its parent.
 *
 * Thus, we extract and decouple this logic out into this high order component. We're recording the latest data by
 * injecting `onChange` callback. Since this functional component has no state, it will render ONLY when it is
 * re-rendered by its parent. Then we use React `useEffect` hook to invoke the SPRte API to try update the data.
 *
 * @param component - The RTE component class that needs to be wrapped for data controlling.
 */
function withDataControlled(// tslint:disable-line:export-name
component) {
    if (!_common_Flights__WEBPACK_IMPORTED_MODULE_2__["Flights"].isPageUndoRedoFlightEnabled() || _common_KillSwitches__WEBPACK_IMPORTED_MODULE_3__["KillSwitches"].rteTypePerfWithUndo.isActivated()) {
        return component;
    }
    var innerHTML;
    return react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](function (props, ref) {
        function handleChange(newControl, newSelection) {
            if (newControl.innerHTML !== innerHTML) {
                innerHTML = newControl.innerHTML;
            }
            props.onChange(newControl, newSelection);
        }
        react__WEBPACK_IMPORTED_MODULE_1__["useEffect"](function () {
            if (ref && ref.current) {
                // If component is rendered by parent, try to update the data after the rendering.
                ref.current.tryUpdate(props.innerHTML, props.selection);
            }
        });
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](component, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props, { ref: ref, onChange: handleChange }));
    });
}


/***/ }),

/***/ "pL8B":
/*!****************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/index-deferred.js ***!
  \****************************************************************/
/*! exports provided: SPRte, SPRteTouchDevice, withDataControlled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SPRte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SPRte */ "Lb2a");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPRte", function() { return _SPRte__WEBPACK_IMPORTED_MODULE_0__["SPRte"]; });

/* harmony import */ var _SPRteTouchDevice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SPRteTouchDevice */ "HCd6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPRteTouchDevice", function() { return _SPRteTouchDevice__WEBPACK_IMPORTED_MODULE_1__["SPRteTouchDevice"]; });

/* harmony import */ var _SPRteDataLayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SPRteDataLayer */ "ogac");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withDataControlled", function() { return _SPRteDataLayer__WEBPACK_IMPORTED_MODULE_2__["withDataControlled"]; });






/***/ }),

/***/ "pl+P":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/sp-canvas/common/ControlsInOneRow.module.css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".controlsInOneRow_f5946091{display:-webkit-box;display:-ms-flexbox;display:flex}.controlsInOneRow_f5946091.spaceInBetween_f5946091{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}", ""]);



/***/ }),

/***/ "sscl":
/*!**************************************************************!*\
  !*** ./lib/sp-canvas/common/ControlsInOneRow.module.scss.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ControlsInOneRow.module.css */ "F9/O");
var styles = {
    controlsInOneRow: 'controlsInOneRow_f5946091',
    spaceInBetween: 'spaceInBetween_f5946091'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "v9l7":
/*!********************************************************!*\
  !*** ./lib/sp-canvas/webPartFactory/WebPartFactory.js ***!
  \********************************************************/
/*! exports provided: WebPartFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebPartFactory", function() { return WebPartFactory; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_content_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/content-handler */ "VaVC");
/* harmony import */ var _ms_content_handler__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_content_handler__WEBPACK_IMPORTED_MODULE_2__);
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */



var WebPartFactory = /** @class */ (function () {
    function WebPartFactory() {
    }
    /**
     * Given the data of a web part control, return whether the web part has finished adding phrase according
     * to its properties.
     * Ideally, web part should only make one time change to the property bag, but there're exceptions.
     * Note: This is implicit logic between undo-redo and web part properties. If web part changes its property structure,
     * This will return falsy results which will downgrade undo-redo experience. But there will not be data loss since it
     * only happens to newly added web part with falsy `addedFromPersistedData` and manual save/publish action will force
     * all the controls to be serialized properly.
     * @param control - The web part control data.
     */
    WebPartFactory.shouldExcludeFromWebPartUpdate = function (control) {
        var addedFromPersistedData = control.addedFromPersistedData, webPartManifest = control.webPartManifest;
        if (!webPartManifest || addedFromPersistedData) {
            return false;
        }
        switch (webPartManifest.id) {
            case (WebPartFactory._getManifestId("Image" /* Image */)):
                // Image web part is added as a blob and it is still uploading the image.
                // It will setDirty once image is uploaded or failed upload.
                return !!control.webPartData.properties.imageBlob;
            case (WebPartFactory._getManifestId("YouTube" /* YouTube */)):
                // When Embed web part is added, it generates and stores cached properties.
                // The absence of the cached data means Embed web part is still in the adding phrase.
                return !control.webPartData.properties.cachedEmbedCode;
            case (WebPartFactory._getManifestId("Document" /* Document */)):
                // When Document web part is added, it uploads the file and generates metadata for this file.
                // The absence of metadata means the Document web part is still in the adding pharse.
                return !control.webPartData.properties.uniqueId;
            default:
                return false;
        }
    };
    WebPartFactory.getWebPart = function (data, store) {
        var monitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_1__["_QosMonitor"]('ContentHandler.getWebPart');
        var webPartType = _ms_content_handler__WEBPACK_IMPORTED_MODULE_2__["ContentHandler"].getWebPartType(data);
        if (webPartType === "None" /* None */) {
            monitor.writeExpectedFailure("FileTypeNotSupported" /* FILE_TYPE_NOT_SUPPORTED */);
            return { webPartResultType: "FileTypeNotSupported" /* FILE_TYPE_NOT_SUPPORTED */ };
        }
        var manifestId = this._getManifestId(webPartType);
        var itemPropsWebPart = store.getToolBoxItem(manifestId);
        if (!itemPropsWebPart) {
            monitor.writeUnexpectedFailure("CanvasStoreError" /* CANVAS_STORE_ERROR */, undefined, { manifestId: manifestId });
            return { webPartResultType: "CanvasStoreError" /* CANVAS_STORE_ERROR */ };
        }
        itemPropsWebPart.webPartData.properties = _ms_content_handler__WEBPACK_IMPORTED_MODULE_2__["ContentHandler"].getWebPartProperties(webPartType, data);
        if (!itemPropsWebPart.webPartData.properties) {
            monitor.writeUnexpectedFailure("UnexpectedError" /* UNEXPECTED_ERROR */, undefined, { manifestId: manifestId });
            return { webPartResultType: "UnexpectedError" /* UNEXPECTED_ERROR */ };
        }
        monitor.writeSuccess();
        return { webPartDataProps: itemPropsWebPart, webPartResultType: "SUCCESS" /* SUCCESS */ };
    };
    WebPartFactory._getManifestId = function (webPartType) {
        return WebPartFactory._webPartToManifestDict.get(webPartType).toString();
    };
    WebPartFactory._webPartToManifestDict = new Map([
        ["Image" /* Image */, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('d1d91016-032f-456d-98a4-721247c305e8')],
        ["YouTube" /* YouTube */, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('544dd15b-cf3c-441b-96da-004d5a8cea1d')],
        ["Document" /* Document */, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('b7dd04e1-19ce-4b24-9132-b60a1c2b910d')],
        ["LinkPreview" /* LinkPreview */, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('6410b3b6-d440-4663-8744-378976dc041e')],
        ["Stream" /* Stream */, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('275c0095-a77e-4f6d-a2a0-6a7626911518')]
    ]);
    return WebPartFactory;
}());



/***/ }),

/***/ "vclg":
/*!*******************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasToolboxHint/CanvasToolboxHint.js ***!
  \*******************************************************************************/
/*! exports provided: CanvasToolboxHint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasToolboxHint", function() { return CanvasToolboxHint; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var office_ui_fabric_react_lib_components_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Tooltip/Tooltip */ "OAft");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _a11y_CanvasA11yConstants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../a11y/CanvasA11yConstants */ "AqUB");
/* harmony import */ var _common_CanvasAlignmentStyles_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../common/CanvasAlignmentStyles.styles */ "PBv6");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../common/KillSwitches */ "17t3");
/* harmony import */ var _LayoutCanvasToolboxHint_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./LayoutCanvasToolboxHint.scss */ "5zIm");
/* harmony import */ var _CanvasToolboxHint_styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./CanvasToolboxHint.styles */ "h4ae");













var CanvasToolboxHint = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CanvasToolboxHint, _super);
    function CanvasToolboxHint(props) {
        var _this = _super.call(this, props) || this;
        _this._handlePlusButtonRef = function (ref) {
            // Force re-render tooltip host once plus button is mounted or it won't be anchored correctly
            if (ref && !_this.state.plusButtonRendered) {
                _this.setState({
                    plusButtonRendered: true
                });
            }
            _this._canvasToolPlusButton = ref;
        };
        _this._handleClick = function () {
            var store = _this.props.store;
            store.selectedControlId = undefined;
            if (_this.props.layout && _this.props.layout.zoneIndex) {
                store.selectedZoneIndex = _this.props.layout.zoneIndex;
            }
            var logPrefix = _this._isWebpartHint ? 'WebPart' : 'Section';
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_EngagementLogger"].logEvent(logPrefix + "Hint.Click");
            if (_this._canvasToolPlusButton) {
                store.openToolbox(_this.props.layout, _this._isWebpartHint ? "WebPart" /* WebPart */ : "Section" /* Section */, _this._canvasToolPlusButton, 
                // Use the close handler to hide the hint
                _this.props.isVisible ? undefined : _this._handleToolboxClose);
            }
            // @todo #427215
            // It is using async chain to open/close the toolbox.
            // We defer to set ToolboxHint visible to ensure it is really visible.
            // It will be resolved after adopt ToolboxHint inside the async flow.
            setTimeout(function () {
                return _this.setState({
                    isVisible: true
                });
            });
        };
        _this._handleToolboxClose = function () {
            _this.setState({
                isVisible: false
            });
        };
        CanvasToolboxHint._isCleanSelectionModel = props.store.canvasFields.isCleanSelectionEnabled;
        _this.state = _this._getState(props);
        return _this;
    }
    CanvasToolboxHint._offsetRight = function (elem, withVerticalSection) {
        var clientWidth = elem.clientWidth, offsetLeft = elem.offsetLeft, parentElement = elem.parentElement;
        var offsetRight;
        if (!parentElement || !parentElement.offsetParent) {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_TraceLogger"].logError(CanvasToolboxHint._logSource, new Error('_offsetRight: element is detached'));
            return 0;
        }
        if (withVerticalSection) {
            offsetRight = parentElement.offsetParent.clientWidth - parentElement.clientWidth - parentElement.offsetLeft;
        }
        else {
            offsetRight = parentElement.offsetParent.clientWidth - clientWidth - parentElement.offsetLeft - offsetLeft;
        }
        return offsetRight;
    };
    CanvasToolboxHint._isTouchEnabled = function () {
        var platform = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_7__["PlatformDetection"]();
        return platform.isAndroid || platform.isIOS;
    };
    CanvasToolboxHint.prototype.componentDidMount = function () {
        this._setFocus();
    };
    CanvasToolboxHint.prototype.componentDidUpdate = function (prevProps) {
        this._setFocus();
        if ((!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_10__["KillSwitches"].updateZoneHintAfterVSDeletion.isActivated() &&
            this.props.isVSPresent !== prevProps.isVSPresent) ||
            this.props.store.canvasFields.isVerticalSectionPresent) {
            var cachedOffset = this._offset; // costly reflow calculation
            if (this.state.offset !== cachedOffset) {
                this.setState({
                    offset: cachedOffset
                });
            }
        }
    };
    CanvasToolboxHint.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.isVisible !== this.props.isVisible) {
            this.setState(this._getState(nextProps));
        }
    };
    CanvasToolboxHint.prototype.render = function () {
        var _this = this;
        var _a = this.props, adjacentZoneState = _a.adjacentZoneState, ariaLabel = _a.ariaLabel, layout = _a.layout, shouldCenterAlign = _a.shouldCenterAlign, theme = _a.theme, type = _a.type;
        var emphasisClassNames;
        if (theme) {
            emphasisClassNames = _CanvasToolboxHint_styles__WEBPACK_IMPORTED_MODULE_12__["CanvasToolboxHintStyles"].getClassNames({
                root: 'CanvasToolboxHintEmphasis',
                theme: theme
            });
        }
        var store = this.props.store;
        var toolboxOpenPosition = store.canvasFields.toolboxOpenPosition;
        var isZoneSelected = !!toolboxOpenPosition && toolboxOpenPosition.sectionIndex === layout.sectionIndex;
        var hintClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["css"])('CanvasToolboxHint', emphasisClassNames ? emphasisClassNames.root : undefined, {
            'is-visible': this.state.isVisible,
            'zone-selected': adjacentZoneState === 3 /* Selected */ || isZoneSelected,
            'zone-active': !CanvasToolboxHint._isCleanSelectionModel
                && adjacentZoneState === 2 /* Active */,
            'zone-active-clean': CanvasToolboxHint._isCleanSelectionModel
                && adjacentZoneState === 2 /* Active */
        });
        var hintButtonWrapperClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["css"])('CanvasToolboxHint-plusButtonWrapper', {
            centerAlign: !!shouldCenterAlign
        });
        var buttonTypeClassName;
        switch (type) {
            case 1 /* Zone */:
                hintClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["css"])(hintClassName, 'ZoneHint', { 'ZoneHint-clean': CanvasToolboxHint._isCleanSelectionModel });
                buttonTypeClassName = CanvasToolboxHint._isCleanSelectionModel ?
                    'CanvasToolboxHint-plusButtonZone-clean' : 'CanvasToolboxHint-plusButtonZone';
                break;
            case 2 /* Section */:
                hintClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["css"])(hintClassName, 'SectionHint');
                buttonTypeClassName = 'CanvasToolboxHint-plusButtonSection';
                break;
            case 0 /* None */:
            default:
                break;
        }
        var plusButtonClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["css"])('CanvasToolboxHint-plusButton', buttonTypeClassName, emphasisClassNames ? emphasisClassNames.plusButton : undefined);
        var alignedClassNames;
        if (type === 1 /* Zone */) {
            alignedClassNames = shouldCenterAlign ? _common_CanvasAlignmentStyles_styles__WEBPACK_IMPORTED_MODULE_9__["CanvasAlignmentStyles"].getHintClassNames({
                root: hintClassName,
                offset: -this.state.offset
            }) : undefined;
        }
        if (store.displayMode !== _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_6__["DisplayMode"].Edit) {
            return false;
        }
        else {
            var tooltip = !CanvasToolboxHint._isTouchEnabled() &&
                this.state.isTooltipVisible && (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](office_ui_fabric_react_lib_components_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], { content: ariaLabel, targetElement: this._canvasToolPlusButton, calloutProps: { gapSpace: 1 }, directionalHint: CanvasToolboxHint._isCleanSelectionModel ? _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["DirectionalHint"].rightCenter : undefined }));
            return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("button", { "aria-haspopup": true, "aria-label": ariaLabel, className: alignedClassNames ? alignedClassNames.root : hintClassName, "data-automation-id": this._isWebpartHint ? 'toolboxHint-webPart' : 'toolboxHint-zone', "data-sp-a11y-class": _a11y_CanvasA11yConstants__WEBPACK_IMPORTED_MODULE_8__["canvasA11yClasses"].toolboxHint, onClick: this._handleClick, onFocus: function () { return _this._toggleTooltip(true); }, onBlur: function () { return _this._toggleTooltip(false); }, onMouseEnter: function () { return _this._toggleTooltip(true); }, onMouseLeave: function () { return _this._toggleTooltip(false); } },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: hintButtonWrapperClassName },
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: plusButtonClassName, ref: this._handlePlusButtonRef },
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["Icon"], { iconName: 'Add' }))),
                tooltip));
        }
    };
    Object.defineProperty(CanvasToolboxHint.prototype, "_offset", {
        get: function () {
            if (this._domNode) {
                if (Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_5__["getRTL"])()) {
                    return CanvasToolboxHint._offsetRight(this._domNode, true);
                }
                else if (this._domNode.parentElement) {
                    return this._domNode.parentElement.offsetLeft;
                }
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    CanvasToolboxHint.prototype.focus = function () {
        var _this = this;
        /**
         * Setting a 0ms timeout to let the browser drawing finish before we set focus to an element.
         * Chrome's event queue lags more than IE's in this particular instance. Without this timeout
         * the focus will not be correct set in Chrome.
         */
        window.setTimeout(function () {
            if (_this._domNode) {
                _this._domNode.focus();
            }
        }, 0);
    };
    CanvasToolboxHint.prototype._setFocus = function () {
        this._domNode = react_dom__WEBPACK_IMPORTED_MODULE_3__["findDOMNode"](this);
        if (this.props.shouldFocus) {
            this.focus();
        }
    };
    CanvasToolboxHint.prototype._getState = function (props) {
        var nextOffset = this.state && this.state.offset;
        // Only recalc the offset if visible and with vertical section
        if (props.store.canvasFields.isVerticalSectionPresent &&
            props.isVisible) {
            nextOffset = this._offset;
        }
        return {
            isVisible: !!props.isVisible,
            plusButtonRendered: false,
            isTooltipVisible: false,
            offset: nextOffset
        };
    };
    CanvasToolboxHint.prototype._toggleTooltip = function (isTooltipVisible) {
        if (this.state.isTooltipVisible !== isTooltipVisible) {
            this.setState({ isTooltipVisible: isTooltipVisible });
        }
    };
    Object.defineProperty(CanvasToolboxHint.prototype, "_isWebpartHint", {
        get: function () {
            return !!(this.props.layout && this.props.layout.sectionIndex);
        },
        enumerable: true,
        configurable: true
    });
    CanvasToolboxHint._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_4__["_LogSource"].create('CanvasToolboxHint');
    return CanvasToolboxHint;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]));



/***/ }),

/***/ "w6ZW":
/*!****************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasToolbox/RteToolboxItemDataStrings.resx.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_zNkNsILQ4Z9dR/KbRxmJKg';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "ws9o":
/*!*******************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasZonePropertyPane/CanvasZoneEmphasisPicker.js ***!
  \*******************************************************************************************/
/*! exports provided: CanvasZoneEmphasisPicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasZoneEmphasisPicker", function() { return CanvasZoneEmphasisPicker; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CanvasZoneEmphasisButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CanvasZoneEmphasisButton */ "xIUr");
/* harmony import */ var _common_ControlsInOneRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/ControlsInOneRow */ "m0cW");
/* harmony import */ var _canvasZonePropertyPaneStrings_resx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./canvasZonePropertyPaneStrings.resx */ "CtN6");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file EmphasisColorPicker.tsx
 */






/**
 * CanvasZoneEmphasisPicker as color picker component for property pane to customize zone emphasis
 */
var CanvasZoneEmphasisPicker = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CanvasZoneEmphasisPicker, _super);
    /**
     * Constructs an instance of CanvasZoneEmphasisPicker
     */
    function CanvasZoneEmphasisPicker(props) {
        var _this = _super.call(this, props) || this;
        _this._handleColorChanged = function (color) {
            _this.props.onColorChanged(color);
        };
        return _this;
    }
    /**
     * Renders CanvasZoneEmphasisPicker
     */
    CanvasZoneEmphasisPicker.prototype.render = function () {
        var buttons = [
            this._getCanvasSectionBackgroundButton(_canvasZonePropertyPaneStrings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].SectionBackgroundNoneButtonLabel, 'noneBackgroundColorButton', 0 /* None */),
            this._getCanvasSectionBackgroundButton(_canvasZonePropertyPaneStrings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].SectionBackgroundNeutralButtonLabel, 'neutralBackgroundColorButton', 1 /* Neutral */),
            this._getCanvasSectionBackgroundButton(_canvasZonePropertyPaneStrings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].SectionBackgroundSoftButtonLabel, 'softBackgroundColorButton', 2 /* Soft */),
            this._getCanvasSectionBackgroundButton(_canvasZonePropertyPaneStrings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].SectionBackgroundStrongButtonLabel, 'strongBackgroundColorButton', 3 /* Strong */)
        ];
        return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_ControlsInOneRow__WEBPACK_IMPORTED_MODULE_4__["ControlsInOneRow"], { spaceInBetween: true }, buttons);
    };
    CanvasZoneEmphasisPicker.prototype._getCanvasSectionBackgroundButton = function (title, id, themeType) {
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_CanvasZoneEmphasisButton__WEBPACK_IMPORTED_MODULE_3__["CanvasZoneEmphasisButton"], { key: title, title: title, id: id, themeType: themeType, isColorActive: themeType === this.props.activeColor, onButtonClick: this._handleColorChanged, variantsModuleLoader: this.props.variantsModuleLoader }));
    };
    return CanvasZoneEmphasisPicker;
}(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["BaseComponent"]));



/***/ }),

/***/ "xIUr":
/*!*******************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/canvasZonePropertyPane/CanvasZoneEmphasisButton.js ***!
  \*******************************************************************************************/
/*! exports provided: CanvasZoneEmphasisButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasZoneEmphasisButton", function() { return CanvasZoneEmphasisButton; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_CanvasEmphasis_CanvasEmphasisStyles_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/CanvasEmphasis/CanvasEmphasisStyles.styles */ "Vb88");
/* harmony import */ var _common_CanvasEmphasis_CanvasEmphasis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/CanvasEmphasis/CanvasEmphasis */ "pJUF");
/* harmony import */ var _CanvasZoneEmphasisButton_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CanvasZoneEmphasisButton.module.scss */ "/M9o");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file CanvasZoneEmphasisButton.tsx
 */








/**
 * Represents a button for CanvasZoneEmphasisButton. This represents property pane button
 * for customizing canvas zone emphasis
 */
var CanvasZoneEmphasisButton = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CanvasZoneEmphasisButton, _super);
    /**
     * Constructs an instance of CanvasZoneEmphasisButton
     */
    function CanvasZoneEmphasisButton(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            emphasisTheme: _this.props.theme
        };
        return _this;
    }
    CanvasZoneEmphasisButton.prototype.componentDidMount = function () {
        this._updateEmphasisTheme(this.props.theme); // Todo#661360 Fix workaround left-over
    };
    CanvasZoneEmphasisButton.prototype.UNSAFE_componentWillUpdate = function (nextProps) {
        if (!Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__["isEqual"])(this.props.theme, nextProps.theme)) {
            this._updateEmphasisTheme(nextProps.theme); // Todo#661360 Fix workaround left-over
        }
    };
    /**
     * Renders the color picker group for CanvasZoneEmphasisButton
     */
    CanvasZoneEmphasisButton.prototype.render = function () {
        var _a;
        var _b = this.props, id = _b.id, isColorActive = _b.isColorActive, onButtonClick = _b.onButtonClick, themeType = _b.themeType, theme = _b.theme, title = _b.title;
        var classNames;
        if (this.state.emphasisTheme) {
            classNames = _common_CanvasEmphasis_CanvasEmphasisStyles_styles__WEBPACK_IMPORTED_MODULE_4__["CanvasEmphasisStyles"].getClassNames({
                root: 'Emphasis',
                theme: this.state.emphasisTheme
            });
        }
        var buttonClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_CanvasZoneEmphasisButton_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].emphasisPickerButton, classNames && classNames.root, (_a = {},
            _a[_CanvasZoneEmphasisButton_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].isSelected] = isColorActive,
            _a[_CanvasZoneEmphasisButton_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].isNone] = themeType === 0 /* None */,
            _a));
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["Customizer"], { settings: { theme: theme }, key: title },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["TooltipHost"], { content: title, id: id, calloutProps: { gapSpace: 0 } },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["IconButton"], { ariaLabel: title, "aria-describedby": id, className: buttonClassName, "data-automation-id": id, iconProps: { iconName: 'Font' }, onClick: function () { return onButtonClick(themeType); } }))));
    };
    CanvasZoneEmphasisButton.prototype._updateEmphasisTheme = function (theme) {
        var _this = this;
        var themeType = this.props.themeType;
        // Using 'void' to indicate that we are not interested in the returned value.
        void _common_CanvasEmphasis_CanvasEmphasis__WEBPACK_IMPORTED_MODULE_5__["CanvasEmphasis"].getVariantThemeForEmphasis(themeType, theme, this.props.variantsModuleLoader).then(function (t) {
            _this.setState({
                emphasisTheme: t
            });
        });
    };
    CanvasZoneEmphasisButton = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["customizable"])('CanvasZoneEmphasisButton', ['theme'])
    ], CanvasZoneEmphasisButton);
    return CanvasZoneEmphasisButton;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]));



/***/ }),

/***/ "xhMI":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Tooltip/Tooltip.styles.js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var getStyles = function (props) {
    var className = props.className, _a = props.beakWidth, beakWidth = _a === void 0 ? 16 : _a, _b = props.gapSpace, gapSpace = _b === void 0 ? 0 : _b, maxWidth = props.maxWidth, theme = props.theme;
    var palette = theme.palette, semanticColors = theme.semanticColors, fonts = theme.fonts, effects = theme.effects;
    // The math here is done to account for the 45 degree rotation of the beak
    var tooltipGapSpace = -(Math.sqrt((beakWidth * beakWidth) / 2) + gapSpace);
    return {
        root: [
            'ms-Tooltip',
            theme.fonts.medium,
            _Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationClassNames"].fadeIn200,
            {
                background: semanticColors.menuBackground,
                boxShadow: effects.elevation8,
                padding: '8px',
                maxWidth: maxWidth,
                selectors: {
                    ':after': {
                        content: "''",
                        position: 'absolute',
                        bottom: tooltipGapSpace,
                        left: tooltipGapSpace,
                        right: tooltipGapSpace,
                        top: tooltipGapSpace,
                        zIndex: 0
                    }
                }
            },
            className
        ],
        content: [
            'ms-Tooltip-content',
            fonts.small,
            {
                position: 'relative',
                zIndex: 1,
                color: palette.neutralPrimary,
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                overflow: 'hidden'
            }
        ],
        subText: [
            'ms-Tooltip-subtext',
            {
                // Using inherit here to avoid unintentional global overrides of the <p> tag.
                fontSize: 'inherit',
                fontWeight: 'inherit',
                color: 'inherit',
                margin: 0
            }
        ]
    };
};
//# sourceMappingURL=Tooltip.styles.js.map

/***/ }),

/***/ "zCYU":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/common/DirectionalHint.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/common/DirectionalHint.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ })

}]);
//# sourceMappingURL=chunk.sp-canvas-edit_7833b0118fe685da1388.js.map