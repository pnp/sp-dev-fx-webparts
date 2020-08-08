(window["webpackJsonp_1c6c9123_7aac_41f3_a376_3caea41ed83f_1_11_0"] = window["webpackJsonp_1c6c9123_7aac_41f3_a376_3caea41ed83f_1_11_0"] || []).push([["developer-tools"],{

/***/ "+Tbi":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/DeveloperTools/Components/DeveloperModules/ManifestManager/ManifestDetails/ManifestDetails.module.css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".container_1812d3d7{display:block;height:100%}.manifestIdHeading_1812d3d7{font-size:large}.manifestTextBox_1812d3d7{width:100%;height:calc(100% - 3em);resize:none;border:none;outline:0}", ""]);



/***/ }),

/***/ "/WBS":
/*!******************************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceHeader/PerformanceHeader.module.scss.js ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PerformanceHeader.module.css */ "ug1O");
var styles = {
    headerTable: 'headerTable_aa6b7018',
    headerTableRows: 'headerTableRows_aa6b7018',
    hint: 'hint_aa6b7018',
    infoIcon: 'infoIcon_aa6b7018',
    msThemeLighter: 'msThemeLighter_aa6b7018'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "/aa2":
/*!************************************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceHeader/PerformanceLegend/PerformanceLegend.js ***!
  \************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PerformanceLegend.module.scss */ "2tqR");
/* harmony import */ var _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../PerformanceDisplay.resx */ "Ht0A");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file PerformanceLegend.tsx
 * The legend for the performance graph that shows what the different colored bars mean
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



var PerformanceLegend = /** @class */ (function (_super) {
    __extends(PerformanceLegend, _super);
    function PerformanceLegend() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PerformanceLegend.prototype.render = function () {
        var legendBlue = [_PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].colorSquare, _PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].msBlue].join(' ');
        var legendPurple = [_PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].colorSquare, _PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].msPurpleLight].join(' ');
        var legendDarkBlue = [_PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].colorSquare, _PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].msBlueMid].join(' ');
        var legendTeal = [_PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].colorSquare, _PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].msTealLight].join(' ');
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: _PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].legend },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].legendCells },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: legendBlue }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].ModulesLoadedLegendLabel)),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].legendCells },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: legendPurple }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].InitializationLegendLabel)),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].legendCells },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: legendDarkBlue }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].RenderTimeLegendLabel)),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].legendCells },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: legendTeal }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].DataFetchLegendLabel))))));
    };
    return PerformanceLegend;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (PerformanceLegend);


/***/ }),

/***/ "0ACd":
/*!******************************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceList/TraceListHeader/TraceListHeader.module.scss.js ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./TraceListHeader.module.css */ "B7gt");
var styles = {
    container: 'container_24968ab4',
    displayNone: 'displayNone_24968ab4',
    displayBlock: 'displayBlock_24968ab4',
    filterRow: 'filterRow_24968ab4',
    filterButton: 'filterButton_24968ab4',
    filterOverlay: 'filterOverlay_24968ab4',
    headerText: 'headerText_24968ab4',
    levelFilterOverlay: 'levelFilterOverlay_24968ab4',
    level: 'level_24968ab4',
    message: 'message_24968ab4',
    source: 'source_24968ab4',
    scope: 'scope_24968ab4',
    timestamp: 'timestamp_24968ab4'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "0Mm8":
/*!*********************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceDisplay.module.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./TraceDisplay.module.css */ "rtxV");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "1F0B":
/*!********************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceList/TraceList.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Stores/TraceDisplayStore */ "wTRJ");
/* harmony import */ var _TraceListHeader_TraceListHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TraceListHeader/TraceListHeader */ "EasO");
/* harmony import */ var _TraceListItem_TraceListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TraceListItem/TraceListItem */ "sHC+");
/* harmony import */ var _CsvRenderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CsvRenderer */ "jD7m");
/* harmony import */ var _TraceList_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TraceList.module.scss */ "t1El");
/* harmony import */ var _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../TraceDisplay.resx */ "JTsx");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file TraceList.tsx
 *
 * Sub-component for TraceDisplay. This component displays the log
 * events from the trace in table form.
 * It will show the name and the level, message, scope, source.
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







var TraceList = /** @class */ (function (_super) {
    __extends(TraceList, _super);
    function TraceList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TraceList.prototype.render = function () {
        var _this = this;
        var idCounter = 0;
        var displayedTraces = [];
        var levelFilters = this.props.filters.level;
        var scopeFilters = this.props.filters.scope;
        var sourceFilters = this.props.filters.source;
        if (!this.props.allTraces) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_TraceListHeader_TraceListHeader__WEBPACK_IMPORTED_MODULE_2__["default"], { filters: this.props.filters }),
                _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_6__["default"].EmptyTraceData);
        }
        this.props.allTraces.forEach(function (trace) {
            if (levelFilters[_Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_1__["LogLevel"][trace.level]] === false) {
                return;
            }
            if (trace.scope) {
                _this._addFilterLabel(trace.scope.id, scopeFilters);
                if (!scopeFilters[trace.scope.id]) {
                    return;
                }
            }
            else if (scopeFilters.none === false) {
                return;
            }
            if (trace.source) {
                _this._addFilterLabel(trace.source, sourceFilters);
                if (!sourceFilters[trace.source]) {
                    return;
                }
            }
            displayedTraces.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_TraceListItem_TraceListItem__WEBPACK_IMPORTED_MODULE_3__["default"], { key: idCounter, id: idCounter, trace: trace }));
            idCounter++;
        });
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _TraceList_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].container },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { onClick: function () { return Object(_CsvRenderer__WEBPACK_IMPORTED_MODULE_4__["triggerCsvDownload"])(_this.props.allTraces); } }, _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_6__["default"].ExportCSVButtonLabel),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_TraceListHeader_TraceListHeader__WEBPACK_IMPORTED_MODULE_2__["default"], { filters: this.props.filters }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: _TraceList_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].traceListItemsContainer }, displayedTraces)));
    };
    TraceList.prototype._addFilterLabel = function (filterLabel, multiFilter) {
        if (filterLabel && !(filterLabel in multiFilter)) {
            multiFilter[filterLabel] = true;
        }
    };
    return TraceList;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (TraceList);


/***/ }),

/***/ "1Qiv":
/*!***************************************************!*\
  !*** ./lib/DeveloperTools/DeveloperTools.resx.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_RPELcTeq3ZByqi3N5dt18w';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "20gl":
/*!****************************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceGraph/PerformanceGraph.module.scss.js ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PerformanceGraph.module.css */ "He+o");
var styles = {
    container: 'container_e27349df',
    tableDelimiter: 'tableDelimiter_e27349df',
    thDelimiter: 'thDelimiter_e27349df',
    tableRowPerfList: 'tableRowPerfList_e27349df',
    tableRowRightLight: 'tableRowRightLight_e27349df',
    tableRowName: 'tableRowName_e27349df',
    tableRowDuration: 'tableRowDuration_e27349df'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "2bRa":
/*!*************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceDisplay.module.scss.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./TraceDisplay.module.css */ "0Mm8");
var styles = {
    container: 'container_3d282470',
    traceListContainer: 'traceListContainer_3d282470'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "2tqR":
/*!************************************************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceHeader/PerformanceLegend/PerformanceLegend.module.scss.js ***!
  \************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PerformanceLegend.module.css */ "5AWF");
var styles = {
    legend: 'legend_39453fd9',
    legendCells: 'legendCells_39453fd9',
    colorSquare: 'colorSquare_39453fd9',
    msBlue: 'msBlue_39453fd9',
    msBlueMid: 'msBlueMid_39453fd9',
    msPurpleLight: 'msPurpleLight_39453fd9',
    msTealLight: 'msTealLight_39453fd9',
    msThemeTertiary: 'msThemeTertiary_39453fd9',
    msLightGreen: 'msLightGreen_39453fd9'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "3WYq":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceHeader/PerformanceLegend/PerformanceLegend.module.css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".legend_39453fd9{border:1px solid #767676;border-collapse:collapse;position:relative;margin:auto auto 10px}.legendCells_39453fd9{border:1px solid #767676;padding:2px 10px}.colorSquare_39453fd9{height:13px;width:13px;float:left;position:relative;margin-right:7px;top:3px}.msBlue_39453fd9{background-color:#0078d4}.msBlueMid_39453fd9{background-color:#00188f}.msPurpleLight_39453fd9{background-color:#b4a0ff}.msTealLight_39453fd9{background-color:#00b294}.msThemeTertiary_39453fd9{background-color:#71afe5}.msLightGreen_39453fd9{background-color:#77f70f}", ""]);



/***/ }),

/***/ "4D8N":
/*!*************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceDisplay.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PerformanceDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PerformanceDisplay.module.scss */ "NICg");
/* harmony import */ var _PerformanceGraph_PerformanceGraph__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PerformanceGraph/PerformanceGraph */ "bnUl");
/* harmony import */ var _PerformanceHeader_PerformanceHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PerformanceHeader/PerformanceHeader */ "fKXZ");
/* harmony import */ var _DataProviders_PerformanceDisplayStateProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../DataProviders/PerformanceDisplayStateProvider */ "B27l");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PerformanceDisplay.resx */ "Ht0A");
/**
 * @file PerformanceDisplay.tsx
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
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








var PerformanceDisplay = /** @class */ (function (_super) {
    __extends(PerformanceDisplay, _super);
    function PerformanceDisplay(props) {
        var _this = _super.call(this, props) || this;
        _this._setState = function () {
            _this.setState(_DataProviders_PerformanceDisplayStateProvider__WEBPACK_IMPORTED_MODULE_5__["PerformanceDisplayStateProvider"].getState());
        };
        _this.state = _DataProviders_PerformanceDisplayStateProvider__WEBPACK_IMPORTED_MODULE_5__["PerformanceDisplayStateProvider"].getState();
        return _this;
    }
    PerformanceDisplay.prototype.componentDidMount = function () {
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6__["_PerformanceLogger"].addListener(this._setState);
    };
    PerformanceDisplay.prototype.componentWillUnmount = function () {
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_6__["_PerformanceLogger"].removeListener(this._setState);
    };
    PerformanceDisplay.prototype.render = function () {
        if (this.state.errorMessage) {
            var errorMessageClass = [_PerformanceDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].errorMessage, _PerformanceDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].msFontColorRedDark].join(' ');
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: errorMessageClass },
                _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_7__["default"].GeneralErrorMessage,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("br", null),
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_7__["default"].ErrorMessagePrefix, this.state.errorMessage)));
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _PerformanceDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].performanceDisplayContainer },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_PerformanceHeader_PerformanceHeader__WEBPACK_IMPORTED_MODULE_4__["default"], { perfItems: this.state.perfItems, overallDuration: this.state.eupl }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _PerformanceDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].graphContainer },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_PerformanceGraph_PerformanceGraph__WEBPACK_IMPORTED_MODULE_3__["default"], { perfItems: this.state.perfItems, startTime: this.state.startTime, overallDuration: this.state.eupl }))));
        }
    };
    return PerformanceDisplay;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (PerformanceDisplay);


/***/ }),

/***/ "5AWF":
/*!********************************************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceHeader/PerformanceLegend/PerformanceLegend.module.css ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PerformanceLegend.module.css */ "3WYq");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "5iYD":
/*!*****************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/LoadingOrErrorModule/LoadingOrErrorModule.module.scss.js ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./LoadingOrErrorModule.module.css */ "rGrZ");
var styles = {
    module: 'module_2e9cfc27',
    loadingModule: 'loadingModule_2e9cfc27',
    errorText: 'errorText_2e9cfc27',
    screenReaderErrorMessage: 'screenReaderErrorMessage_2e9cfc27'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "6+on":
/*!****************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperToolsConsole.module.scss.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./DeveloperToolsConsole.module.css */ "A70Y");
var styles = {
    container: 'container_a4a15380',
    toolsArea: 'toolsArea_a4a15380',
    resizeBar: 'resizeBar_a4a15380',
    closeButton: 'closeButton_a4a15380'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "6FYO":
/*!**************************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceList/TraceListItem/TraceListItem.module.scss.js ***!
  \**************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./TraceListItem.module.css */ "94D7");
var styles = {
    container: 'container_6175b78d',
    blueBackground: 'blueBackground_6175b78d',
    itemDetails: 'itemDetails_6175b78d',
    verbose: 'verbose_6175b78d',
    info: 'info_6175b78d',
    warning: 'warning_6175b78d',
    error: 'error_6175b78d',
    message: 'message_6175b78d',
    source: 'source_6175b78d',
    scope: 'scope_6175b78d',
    timestamp: 'timestamp_6175b78d',
    redText: 'redText_6175b78d'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "7yKZ":
/*!****************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperToolsConsole.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react_lib_Pivot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/Pivot */ "dw6L");
/* harmony import */ var office_ui_fabric_react_lib_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! office-ui-fabric-react/lib/Button */ "xk/t");
/* harmony import */ var _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../Stores/DeveloperToolsConsoleStore */ "l3/d");
/* harmony import */ var _DeveloperModules_LoadingOrErrorModule_LoadingOrErrorModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DeveloperModules/LoadingOrErrorModule/LoadingOrErrorModule */ "lFVU");
/* harmony import */ var _DeveloperToolsConsole_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DeveloperToolsConsole.module.scss */ "6+on");
/* harmony import */ var _DeveloperTools_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../DeveloperTools.resx */ "1Qiv");
/**
 * @file DeveloperToolsConsole.tsx
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
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







var DeveloperToolsConsole = /** @class */ (function (_super) {
    __extends(DeveloperToolsConsole, _super);
    function DeveloperToolsConsole(props) {
        var _this = _super.call(this, props) || this;
        _this._onDrag = function (e) {
            var mouseEvent = e; // tslint:disable-line:no-any
            if (mouseEvent.pageY !== 0) {
                var clientHeight = document.documentElement.clientHeight;
                var height = (clientHeight - mouseEvent.pageY) / clientHeight;
                _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_3__["default"].resizeConsole(height);
            }
        };
        _this._setState = function () {
            _this.setState({
                topPosition: _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_3__["default"].height,
                visible: _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_3__["default"].visible,
                tabs: _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_3__["default"].tabs,
                selectedTabId: _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_3__["default"].selectedTabId
            });
        };
        _this.state = {
            topPosition: _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_3__["default"].height,
            visible: _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_3__["default"].visible,
            tabs: _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_3__["default"].tabs,
            selectedTabId: _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_3__["default"].selectedTabId
        };
        return _this;
    }
    DeveloperToolsConsole.prototype.componentDidMount = function () {
        _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_3__["default"].addListener(this._setState);
    };
    DeveloperToolsConsole.prototype.componentWillUnmount = function () {
        _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_3__["default"].removeListener(this._setState);
    };
    DeveloperToolsConsole.prototype.render = function () {
        var RENDER_NOTHING = null; // tslint:disable-line
        if (this.state.visible) {
            var tabs = this.state.tabs.map(function (tab, id) {
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_Pivot__WEBPACK_IMPORTED_MODULE_1__["PivotItem"], { linkText: tab.title },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_DeveloperModules_LoadingOrErrorModule_LoadingOrErrorModule__WEBPACK_IMPORTED_MODULE_4__["default"], { tab: tab }));
            });
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _DeveloperToolsConsole_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].container, style: { height: this.state.topPosition * 100 + "%" } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _DeveloperToolsConsole_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].resizeBar, draggable: true, onDrag: this._onDrag }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _DeveloperToolsConsole_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].toolsArea },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_Pivot__WEBPACK_IMPORTED_MODULE_1__["Pivot"], { linkSize: office_ui_fabric_react_lib_Pivot__WEBPACK_IMPORTED_MODULE_1__["PivotLinkSize"].normal, linkFormat: office_ui_fabric_react_lib_Pivot__WEBPACK_IMPORTED_MODULE_1__["PivotLinkFormat"].links }, tabs),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_Button__WEBPACK_IMPORTED_MODULE_2__["IconButton"], { className: _DeveloperToolsConsole_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].closeButton, iconProps: { iconName: 'Cancel' }, title: _DeveloperTools_resx__WEBPACK_IMPORTED_MODULE_6__["default"].closeDeveloperToolsAriaLabel, ariaLabel: _DeveloperTools_resx__WEBPACK_IMPORTED_MODULE_6__["default"].closeDeveloperToolsAriaLabel, onClick: function () { return _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_3__["default"].showHideConsole(false); } })));
        }
        else {
            return RENDER_NOTHING;
        }
    };
    return DeveloperToolsConsole;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (DeveloperToolsConsole);


/***/ }),

/***/ "8Mts":
/*!*********************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceDisplay.module.css ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PerformanceDisplay.module.css */ "Nlz3");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "94D7":
/*!**********************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceList/TraceListItem/TraceListItem.module.css ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./TraceListItem.module.css */ "AsGb");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "98wo":
/*!*************************************************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceGraph/PerformanceGraphItem/PerformanceGraphItem.module.css ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PerformanceGraphItem.module.css */ "A1Gj");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "A1Gj":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceGraph/PerformanceGraphItem/PerformanceGraphItem.module.css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".bar_247e761e{height:13px;margin:-6px 0 0;position:absolute}.bar_247e761e,.tableRowPerfList_247e761e{-webkit-box-sizing:border-box;box-sizing:border-box}.tableRowPerfList_247e761e{border:1px solid #767676;padding:5px;height:25px}.tableRowBottomLight_247e761e{border-bottom:1px solid #c8c8c8}.tableRowRightLight_247e761e{border-right:1px solid #c8c8c8}.tdDelimiter_247e761e{width:10%;border-spacing:0;z-index:1;border:1px solid #c8c8c8;border-top:0;border-left:0}", ""]);



/***/ }),

/***/ "A70Y":
/*!************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperToolsConsole.module.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./DeveloperToolsConsole.module.css */ "F9rm");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "AsGb":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceList/TraceListItem/TraceListItem.module.css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".container_6175b78d{display:block}.blueBackground_6175b78d{background:\"[theme:themeLighter, default: #deecf9]\"}.itemDetails_6175b78d{padding:0}.itemDetails_6175b78d li{display:inline-table}.verbose_6175b78d{width:5%;color:\"[theme:yellow, default: #ffb900]\"}.info_6175b78d{width:5%;color:\"[theme:orangeLighter, default: #ff8c00]\"}.warning_6175b78d{width:5%;color:\"[theme:orangeLight, default: #ea4300]\"}.error_6175b78d{width:5%;color:\"[theme:red, default: #e81123]\"}.message_6175b78d{width:40%}.scope_6175b78d,.source_6175b78d{width:20%}.timestamp_6175b78d{width:15%}.redText_6175b78d{color:\"[theme:red, default: #e81123]\"}", ""]);



/***/ }),

/***/ "B27l":
/*!*****************************************************************************!*\
  !*** ./lib/DeveloperTools/DataProviders/PerformanceDisplayStateProvider.js ***!
  \*****************************************************************************/
/*! exports provided: PerformanceDisplayStateProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerformanceDisplayStateProvider", function() { return PerformanceDisplayStateProvider; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_DeveloperModules_PerformanceDisplay_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../Components/DeveloperModules/PerformanceDisplay/PerformanceDisplay.resx */ "Ht0A");
/**
 * @file PerformanceDisplayStore.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */



var PerformanceDisplayStateProvider = /** @class */ (function () {
    function PerformanceDisplayStateProvider() {
    }
    /**
     * This function parses through performance data and puts together some performance data (_IPerfItem) objects for the
     * component to display. If errors are encountered, the _errorMessage variable is set and the function returns an
     * empty array. The component checks for the presence of an error message to determine if something went wrong.
     */
    PerformanceDisplayStateProvider.getState = function () {
        var perfItems = [];
        var toReturn = {
            perfItems: perfItems,
            startTime: 0,
            eupl: 0
        };
        // Wrap in a try/catch block to ensure we don't break the page if this throws
        try {
            // @todo VSO:237921 - use the correct typings
            var data = _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_1__["_PerformanceLogger"].getPerformanceData(); // tslint:disable-line:no-any
            if (!data || !data.W3cNavigationStart || !data.EUPL) {
                toReturn.errorMessage = _Components_DeveloperModules_PerformanceDisplay_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].ErrorAccessingPerfDataErrorMessage;
                console.debug(toReturn.errorMessage); // tslint:disable-line:no-console
                return toReturn;
            }
            // We are using performance API so start is always 0 corresponding to W3cNavigationStart
            toReturn.startTime = 0;
            toReturn.eupl = data.EUPL;
            // Would be really nice if JSON.tryParse existed ...
            var euplBreakdown = void 0;
            try {
                euplBreakdown = JSON.parse(data.EUPLBreakdown);
            }
            catch (error) { /* no-op */ }
            if (!euplBreakdown) {
                toReturn.errorMessage = _Components_DeveloperModules_PerformanceDisplay_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].ErrorParsingPercievedLatencyErrorMessage;
                console.debug(toReturn.errorMessage); // tslint:disable-line:no-console
                return toReturn;
            }
            var apiCallsData = void 0;
            try {
                apiCallsData = JSON.parse(data.APICalls);
            }
            catch (error) { /* no-op */ }
            if (!apiCallsData) {
                toReturn.errorMessage = _Components_DeveloperModules_PerformanceDisplay_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].ErrorParsingApiDataErrorMessage;
                console.debug(toReturn.errorMessage); // tslint:disable-line:no-console
                return toReturn;
            }
            if (data.W3cRedirectStart && data.W3cRedirectEnd) {
                perfItems.push({
                    id: 'RedirectResponse',
                    name: _Components_DeveloperModules_PerformanceDisplay_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].RedirectResponseLabel,
                    startVal: data.W3cRedirectStart - data.W3cNavigationStart,
                    duration: (data.W3cRedirectEnd - data.W3cRedirectStart),
                    breakdown: undefined
                });
            }
            perfItems.push({
                id: 'w3cResponseEnd',
                name: _Components_DeveloperModules_PerformanceDisplay_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].ServerResponseLabel,
                startVal: data.W3cRequestStart - data.W3cNavigationStart,
                duration: data.W3cResponseEnd - data.W3cRequestStart,
                breakdown: undefined
            });
            if (euplBreakdown.appStart) {
                perfItems.push({
                    id: 'appStart',
                    name: _Components_DeveloperModules_PerformanceDisplay_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].ApplicationInitializationLabel,
                    startVal: data.W3cResponseEnd - data.W3cNavigationStart,
                    duration: euplBreakdown.appStart - (data.W3cResponseEnd - data.W3cNavigationStart),
                    breakdown: undefined
                });
            }
            if (euplBreakdown.spLoaderStart) {
                perfItems.push({
                    id: 'scriptFetchEval',
                    name: _Components_DeveloperModules_PerformanceDisplay_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].ScriptFetchEvalLabel,
                    startVal: data.W3cResponseEnd - data.W3cNavigationStart,
                    duration: euplBreakdown.spLoaderStart - (data.W3cResponseEnd - data.W3cNavigationStart),
                    breakdown: undefined
                });
            }
            if (euplBreakdown.spLoaderStart && euplBreakdown.appStart) {
                perfItems.push({
                    id: 'spLoaderStart',
                    name: _Components_DeveloperModules_PerformanceDisplay_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].SpLoaderStartLabel,
                    startVal: euplBreakdown.spLoaderStart,
                    duration: euplBreakdown.appStart - euplBreakdown.spLoaderStart,
                    breakdown: undefined
                });
            }
            /**
             * Check if any web parts made API calls, and store them in a data structure per web part
             */
            var apiCalls = {};
            var endVals = {};
            for (var _i = 0, apiCallsData_1 = apiCallsData; _i < apiCallsData_1.length; _i++) {
                var apiCall = apiCallsData_1[_i];
                if (apiCall.name && apiCall.name.indexOf('WebPart') > -1) {
                    if (!apiCalls[apiCall.name]) {
                        apiCalls[apiCall.name] = [];
                        endVals[apiCall.name] = 0;
                    }
                    apiCalls[apiCall.name].push({
                        startVal: apiCall.startTime,
                        duration: apiCall.duration
                    });
                    // Find the latest ending API call for total duration calculation later on
                    endVals[apiCall.name] = Math.max(apiCall.startTime + apiCall.duration, endVals[apiCall.name]);
                }
            }
            /**
             * Get loading breakdown for each web part. Web parts have their loading times broken down further, so an
             * _IWebPartBreakdown object is put together for each one.
             */
            for (var i = 1; i <= 10; i++) {
                var webPart = data["Control" + i + "Id"];
                var renderEnd = data["Control" + i + "RenderTime"];
                var renderStart = euplBreakdown[webPart + ".start"];
                if (!webPart || isNaN(renderStart) || isNaN(renderEnd)) {
                    continue;
                }
                var initTime = euplBreakdown[webPart + ".init"];
                var moduleLoadedTime = euplBreakdown[webPart + ".modulesLoaded"];
                var loadingDelayed = euplBreakdown[webPart + ".loadingDelayed"];
                var inViewportLoading = euplBreakdown[webPart + ".inViewportLoading"];
                var wpBreakdown = {
                    dataFetch: apiCalls[webPart] || [],
                    render: {
                        startVal: inViewportLoading || initTime || moduleLoadedTime || renderStart,
                        duration: renderEnd - (inViewportLoading || initTime || moduleLoadedTime || renderStart)
                    }
                };
                if (moduleLoadedTime && initTime) {
                    // Get breakdown of loading data for web parts
                    if (!isNaN(moduleLoadedTime)) {
                        wpBreakdown.modulesLoaded = {
                            startVal: renderStart,
                            duration: moduleLoadedTime - renderStart
                        };
                    }
                    if (!isNaN(initTime)) {
                        wpBreakdown.init = {
                            startVal: inViewportLoading || moduleLoadedTime,
                            duration: initTime - (inViewportLoading || moduleLoadedTime)
                        };
                    }
                    if (!isNaN(inViewportLoading) && !isNaN(loadingDelayed)) {
                        wpBreakdown.lazyLoading = {
                            startVal: loadingDelayed,
                            duration: inViewportLoading - loadingDelayed
                        };
                    }
                }
                perfItems.push({
                    id: webPart,
                    name: "" + PerformanceDisplayStateProvider._getReadableWebpartName(webPart.replace('Load.', '')),
                    startVal: renderStart,
                    duration: renderEnd - renderStart,
                    breakdown: wpBreakdown
                });
            }
            return toReturn;
        }
        catch (error) {
            toReturn.errorMessage = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_Components_DeveloperModules_PerformanceDisplay_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].UnknownPerformanceDataErrorMessage, error);
            console.debug(toReturn.errorMessage); // tslint:disable-line:no-console
            return toReturn;
        }
    };
    /**
     * Splits the WebPart id to access the alias.
     */
    PerformanceDisplayStateProvider._getReadableWebpartName = function (id) {
        if (id.indexOf('WebPart.') === -1) {
            return id;
        }
        /**
         * idString is in the format of WebPart.manifestID.instanceID
         * Example: WebPart.QuickLinksWebPart.a3deb5fc-2f96-4621-9dfe-985955a33833
         * If there is a failure in getting a readable name from the id
         * (change in web parts manifest) log the error and display the
         * generic name 'web part' so data can still be shown.
         */
        try {
            var readableWebPartName = id.split('.')[1];
            return readableWebPartName;
        }
        catch (error) {
            return id;
        }
    };
    return PerformanceDisplayStateProvider;
}());



/***/ }),

/***/ "B7gt":
/*!**************************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceList/TraceListHeader/TraceListHeader.module.css ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./TraceListHeader.module.css */ "Giaa");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "Bxeg":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/DeveloperTools/Components/DeveloperModules/LoadingOrErrorModule/LoadingOrErrorModule.module.css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".loadingModule_2e9cfc27,.module_2e9cfc27{text-align:center;vertical-align:middle;height:100%;display:table;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.errorText_2e9cfc27,.loadingModule_2e9cfc27>div{display:table-cell;text-align:center;vertical-align:middle}.errorText_2e9cfc27{font-size:17px;font-weight:300}.screenReaderErrorMessage_2e9cfc27{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}", ""]);



/***/ }),

/***/ "CTwt":
/*!*******************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/ManifestManager/ManifestManager.module.scss.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ManifestManager.module.css */ "wRAh");
var styles = {
    container: 'container_ae8a8547',
    manifestListContainer: 'manifestListContainer_ae8a8547',
    manifestDetailsContainer: 'manifestDetailsContainer_ae8a8547',
    noManifestSelectedContainer: 'noManifestSelectedContainer_ae8a8547'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "DpMv":
/*!****************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceList/TraceList.module.css ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./TraceList.module.css */ "my3T");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "EasO":
/*!******************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceList/TraceListHeader/TraceListHeader.js ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/Styling */ "4RHQ");
/* harmony import */ var _Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../Stores/TraceDisplayStore */ "wTRJ");
/* harmony import */ var _TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TraceListHeader.module.scss */ "0ACd");
/* harmony import */ var _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../TraceDisplay.resx */ "JTsx");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file TraceListHeader.tsx
 * Sub-component for TraceList. The header displays the currently selected filters.
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





var TraceListHeader = /** @class */ (function (_super) {
    __extends(TraceListHeader, _super);
    function TraceListHeader(props) {
        var _this = _super.call(this, props) || this;
        _this._handleFilterChange = _this._handleFilterChange.bind(_this);
        // At page load time the default is to show no filter overlays
        _this.state = {
            filterToggles: { level: false, scope: false, source: false }
        };
        return _this;
    }
    TraceListHeader.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: _TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].container },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: _TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].timestamp }, _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].TimestampHeaderLabel),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: _TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].level },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { role: 'button', onClick: function () { return _this._toggleFilterStateForColumn('level'); }, className: _TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerText }, _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].LevelHeaderLabel),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { onClick: function () { return _this._toggleFilterStateForColumn('level'); }, className: [_TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterButton, Object(office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__["getIconClassName"])('Filter')].join(' ') }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: this._getFilterStyleForColumn('level'), id: 'levelFilterDropdown' }, Object.keys(this.props.filters.level).map(function (id) {
                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { key: id, className: _TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterRow },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: 'checkbox', name: 'level '.concat(id), "aria-checked": _this.props.filters.level[id], checked: _this.props.filters.level[id], onChange: _this._handleFilterChange }),
                        id);
                }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: _TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].scope },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { role: 'button', onClick: function () { return _this._toggleFilterStateForColumn('scope'); }, className: _TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerText }, _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].ScopeHeaderLabel),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { onClick: function () { return _this._toggleFilterStateForColumn('scope'); }, className: [_TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterButton, Object(office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__["getIconClassName"])('Filter')].join(' ') }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: this._getFilterStyleForColumn('scope'), id: 'scopeFilterDropdown' }, Object.keys(this.props.filters.scope).map(function (id) {
                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { key: id, className: _TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterRow },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: 'checkbox', name: 'scope '.concat(id), "aria-checked": _this.props.filters.scope[id], checked: _this.props.filters.scope[id], onChange: _this._handleFilterChange }),
                        id);
                }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: _TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].source },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { role: 'button', onClick: function () { return _this._toggleFilterStateForColumn('source'); }, className: _TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerText }, _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].SourceHeaderLabel),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { onClick: function () { return _this._toggleFilterStateForColumn('source'); }, className: [_TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterButton, Object(office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__["getIconClassName"])('Filter')].join(' ') }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: this._getFilterStyleForColumn('source'), id: 'sourceFilterDropdown' }, Object.keys(this.props.filters.source).map(function (id) {
                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { key: id, className: _TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterRow },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: 'checkbox', name: 'source '.concat(id), "aria-checked": _this.props.filters.source[id], checked: _this.props.filters.source[id], onChange: _this._handleFilterChange }),
                        id);
                }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: _TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].message }, _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].MessageHeaderLabel)));
    };
    /**
     * Returns the current display style for the dropdown filter overlays.
     */
    TraceListHeader.prototype._getFilterStyleForColumn = function (columnId) {
        var filterStyle = this.state.filterToggles[columnId]
            ? _TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].displayBlock
            : _TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].displayNone;
        return [_TraceListHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterOverlay, filterStyle].join(' ');
    };
    /**
     * Inverts the display status (None or Block) for the dropdown overlay column
     * that has the corresponding title of the param 'columnID'. Leaves all other
     * dropdown overlays unchanged.
     *
     * Ex: If columnId is 'level' and the current overlay display style is 'None', then the
     * display style for the level overlay will be changed to 'Block' and the other overlays
     * ('scope', 'source') will remain as is.
     */
    TraceListHeader.prototype._toggleFilterStateForColumn = function (columnId) {
        var filterToggles = { level: false, scope: false, source: false };
        for (var toggle in this.state.filterToggles) {
            if (this.state.filterToggles.hasOwnProperty(toggle)) {
                var value = this.state.filterToggles[toggle];
                filterToggles[toggle] = columnId === toggle ? !value : value;
            }
        }
        this.setState({ filterToggles: filterToggles });
    };
    TraceListHeader.prototype._handleFilterChange = function (event) {
        var all = 'all';
        var name = 'name';
        var eventTargetNameAttribute = event.target.getAttribute(name) || '';
        var filterDetailsTuple = eventTargetNameAttribute.split(' ');
        var filterType = filterDetailsTuple[0];
        var filterSubType = filterDetailsTuple[1];
        var subfilters = this.props.filters[filterType];
        if (filterSubType === all) {
            subfilters[all] = !subfilters[all];
            Object.keys(subfilters).forEach(function (element, count, array) {
                subfilters[element] = subfilters[all];
            });
        }
        else {
            subfilters[all] = false;
            subfilters[filterSubType] = !subfilters[filterSubType];
            var allTrue_1 = true;
            Object.keys(subfilters).forEach(function (key) {
                if (key !== all && subfilters[key] === false) {
                    allTrue_1 = false;
                }
            });
            if (allTrue_1) {
                subfilters[all] = true;
            }
        }
        _Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_2__["TraceDisplayStore"].instance.applyTraceFilter(this.props.filters);
    };
    return TraceListHeader;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (TraceListHeader);


/***/ }),

/***/ "F9rm":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/DeveloperTools/Components/DeveloperToolsConsole.module.css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".container_a4a15380{position:fixed;bottom:0;width:100%;background-color:#fff;opacity:.9;z-index:2147483647}.toolsArea_a4a15380{position:absolute;bottom:0;top:5px;width:100%}.toolsArea_a4a15380>div{height:100%}.toolsArea_a4a15380>div .ms-Pivot{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.toolsArea_a4a15380>div>div+div{padding:0 5px 5px;height:calc(100% - 50px);position:absolute;width:calc(100% - 10px)}.toolsArea_a4a15380>div>div+div>div{height:100%}.resizeBar_a4a15380{background-color:#2f4f4f;width:100%;height:5px;cursor:ns-resize}.closeButton_a4a15380{position:absolute!important;right:0;top:0}", ""]);



/***/ }),

/***/ "Giaa":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceList/TraceListHeader/TraceListHeader.module.css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".container_24968ab4{display:block;margin-top:0;margin-bottom:0}.displayNone_24968ab4{display:none}.displayBlock_24968ab4{display:block}.filterRow_24968ab4{width:100%}.filterButton_24968ab4{background:0 0;border:none;cursor:pointer;padding:13px 5px;font-size:1.25em;color:#2f4f4f}.filterOverlay_24968ab4{height:60%;width:20%;clear:left;position:absolute;z-index:200;background:#fff;border:solid;border-color:#696969;border-width:1px;overflow-y:auto}.headerText_24968ab4{float:left}.levelFilterOverlay_24968ab4{height:60%;width:10%;clear:left;position:absolute;z-index:200;background:#fff;border:solid;border-color:#696969;border-width:1px;overflow-y:auto}.level_24968ab4{width:5%}.message_24968ab4{width:40%}.scope_24968ab4,.source_24968ab4{width:20%}.timestamp_24968ab4{width:15%}", ""]);



/***/ }),

/***/ "Gu9P":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/DeveloperTools/Components/DeveloperModules/ManifestManager/ManifestManager.module.css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".container_ae8a8547{height:100%}.manifestListContainer_ae8a8547{border-right:2px solid grey;height:100%;width:500px;overflow-y:auto;overflow-x:hidden;float:left}.manifestDetailsContainer_ae8a8547{height:100%;padding:5px;overflow-x:hidden;overflow-y:auto}.noManifestSelectedContainer_ae8a8547{text-align:center;position:relative;font-size:30px;color:grey;display:table;width:100%;height:calc(100% - 10px);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.noManifestSelectedContainer_ae8a8547>div{display:table-cell;text-align:center;vertical-align:middle}", ""]);



/***/ }),

/***/ "He+o":
/*!************************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceGraph/PerformanceGraph.module.css ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PerformanceGraph.module.css */ "YXSK");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "Ht0A":
/*!******************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceDisplay.resx.js ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_g7G0QHJ5bQYlxe+lk+DcxA';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "JTsx":
/*!******************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceDisplay.resx.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_gqinlPQb8HZprTeCpwNz2w';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "MW+x":
/*!*************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceDisplay.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TraceDisplay_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TraceDisplay.module.scss */ "2bRa");
/* harmony import */ var _Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../Stores/TraceDisplayStore */ "wTRJ");
/* harmony import */ var _TraceList_TraceList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TraceList/TraceList */ "1F0B");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file TraceDisplay.tsx
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




var TraceDisplay = /** @class */ (function (_super) {
    __extends(TraceDisplay, _super);
    function TraceDisplay(props) {
        var _this = _super.call(this, props) || this;
        _this._setState = function () {
            _this.setState({
                filter: _Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_2__["default"].currentFilter
            });
        };
        _this.state = {
            filter: _Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_2__["default"].currentFilter
        };
        return _this;
    }
    TraceDisplay.prototype.componentDidMount = function () {
        _Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_2__["default"].addListener(this._setState);
    };
    TraceDisplay.prototype.componentWillUnmount = function () {
        _Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_2__["default"].removeListener(this._setState);
    };
    TraceDisplay.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _TraceDisplay_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].container },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _TraceDisplay_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].traceListContainer },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_TraceList_TraceList__WEBPACK_IMPORTED_MODULE_3__["default"], { allTraces: _Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_2__["default"].traces, filters: this.state.filter }))));
    };
    return TraceDisplay;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (TraceDisplay);


/***/ }),

/***/ "NICg":
/*!*************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceDisplay.module.scss.js ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PerformanceDisplay.module.css */ "8Mts");
var styles = {
    performanceDisplayContainer: 'performanceDisplayContainer_a9cacc4b',
    graphContainer: 'graphContainer_a9cacc4b',
    errorMessage: 'errorMessage_a9cacc4b',
    msFontColorRedDark: 'msFontColorRedDark_a9cacc4b'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "Nlz3":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceDisplay.module.css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".performanceDisplayContainer_a9cacc4b{position:absolute;width:100%;height:100%;overflow-y:scroll}.graphContainer_a9cacc4b{float:left;width:calc(100% - 1em);border:1px solid}.errorMessage_a9cacc4b{text-align:center;position:relative;top:50%;font-size:25px}.msFontColorRedDark_a9cacc4b{color:#a80000}", ""]);



/***/ }),

/***/ "PVnk":
/*!**********************************************!*\
  !*** ./lib/DeveloperTools/DeveloperTools.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "0ZZt");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Models_DeveloperToolsTab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Models/DeveloperToolsTab */ "hoe0");
/* harmony import */ var _Components_DeveloperToolsConsole__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/DeveloperToolsConsole */ "7yKZ");
/* harmony import */ var _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Stores/DeveloperToolsConsoleStore */ "l3/d");
/**
 * @file DeveloperTools.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */





var DeveloperTools = /** @class */ (function () {
    function DeveloperTools() {
    }
    Object.defineProperty(DeveloperTools, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new DeveloperTools();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    DeveloperTools.prototype.initialize = function () {
        var developerToolsDiv = document.createElement('div');
        document.body.appendChild(developerToolsDiv);
        react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Components_DeveloperToolsConsole__WEBPACK_IMPORTED_MODULE_3__["default"]), developerToolsDiv);
    };
    DeveloperTools.prototype.toggleDeveloperTools = function () {
        _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_4__["default"].showHideConsole(!_Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_4__["default"].visible);
    };
    DeveloperTools.prototype.showHideDeveloperTools = function (show) {
        _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_4__["default"].showHideConsole(show);
    };
    DeveloperTools.prototype.registerDeveloperToolsTab = function (developerToolsTab) {
        var tab = new _Models_DeveloperToolsTab__WEBPACK_IMPORTED_MODULE_2__["default"](developerToolsTab);
        _Stores_DeveloperToolsConsoleStore__WEBPACK_IMPORTED_MODULE_4__["default"].registerTab(tab);
    };
    return DeveloperTools;
}());
/* harmony default export */ __webpack_exports__["default"] = (DeveloperTools);


/***/ }),

/***/ "Tckj":
/*!*******************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/ManifestManager/ManifestManager.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react_lib_DetailsList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/DetailsList */ "hjiq");
/* harmony import */ var _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../../stores/ManifestStore */ "Eke5");
/* harmony import */ var _utilities_normalizeComponentId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../../utilities/normalizeComponentId */ "jLfe");
/* harmony import */ var _ManifestDetails_ManifestDetails__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ManifestDetails/ManifestDetails */ "tac/");
/* harmony import */ var _ManifestManager_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ManifestManager.module.scss */ "CTwt");
/* harmony import */ var _ManifestManager_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ManifestManager.resx */ "jMO4");
/**
 * @file ManifestManager.tsx
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
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







var ManifestManager = /** @class */ (function (_super) {
    __extends(ManifestManager, _super);
    function ManifestManager(props) {
        var _this = _super.call(this, props) || this;
        _this._selection = new office_ui_fabric_react_lib_DetailsList__WEBPACK_IMPORTED_MODULE_1__["Selection"]({
            getKey: function (item) { return item.id; },
            onSelectionChanged: function () {
                var selectedModule = _this._selection.getSelection()[0];
                if (!selectedModule) {
                    ManifestManager._selectedManifestId = undefined;
                }
                else {
                    ManifestManager._selectedManifestId = Object(_utilities_normalizeComponentId__WEBPACK_IMPORTED_MODULE_3__["default"])(selectedModule.id, selectedModule.version);
                }
                _this.setState(_this.getUpdatedState());
            }
        });
        _this.state = _this.getUpdatedState();
        return _this;
    }
    ManifestManager.prototype.render = function () {
        var selectedManifest = this.state.selectedManifest;
        var manifestDetailsBox = selectedManifest
            ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_ManifestDetails_ManifestDetails__WEBPACK_IMPORTED_MODULE_4__["default"], { manifest: selectedManifest })
            : react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ManifestManager_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].noManifestSelectedContainer },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, _ManifestManager_resx__WEBPACK_IMPORTED_MODULE_6__["default"].noManifestSelected));
        var columns = [{
                key: 'alias',
                name: 'alias',
                fieldName: 'alias',
                minWidth: 100,
                maxWidth: 150,
                onRender: function (item) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, (item.debugManifest || item.manifest).alias); }
            },
            {
                key: 'id',
                name: 'id',
                fieldName: 'id',
                minWidth: 300,
                maxWidth: 300
            }];
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ManifestManager_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].container },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ManifestManager_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].manifestListContainer },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_DetailsList__WEBPACK_IMPORTED_MODULE_1__["DetailsList"], { items: this.state.manifests, columns: columns, isHeaderVisible: false, selectionMode: office_ui_fabric_react_lib_DetailsList__WEBPACK_IMPORTED_MODULE_1__["SelectionMode"].single, selection: this._selection, setKey: 'set', constrainMode: office_ui_fabric_react_lib_DetailsList__WEBPACK_IMPORTED_MODULE_1__["ConstrainMode"].unconstrained })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ManifestManager_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].manifestDetailsContainer }, manifestDetailsBox));
    };
    ManifestManager.prototype.getUpdatedState = function () {
        var manifestMap = _stores_ManifestStore__WEBPACK_IMPORTED_MODULE_2__["default"].instance._getManifestMap();
        var manifests = [];
        manifestMap.forEach(function (entry) { return manifests.push(entry); });
        return {
            manifests: manifests,
            selectedManifest: ManifestManager._selectedManifestId ?
                manifestMap.get(ManifestManager._selectedManifestId) :
                undefined
        };
    };
    ManifestManager._selectedManifestId = undefined;
    return ManifestManager;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (ManifestManager);


/***/ }),

/***/ "WyRj":
/*!*******************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/ManifestManager/ManifestDetails/ManifestDetails.module.css ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ManifestDetails.module.css */ "+Tbi");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "YGYo":
/*!************************************************!*\
  !*** ./lib/DeveloperTools/Stores/BaseStore.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @file BaseStore.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */
/**
 * Contains common implementation for store
 */
var BaseStore = /** @class */ (function () {
    /**
     * Initializes a new instance of BaseStore
     */
    function BaseStore() {
        this._isDisposed = false;
        this._listeners = [];
        this._isDisposed = false;
    }
    /**
     * Add a listener to this store
     * @param listener - the listener callback
     */
    BaseStore.prototype.addListener = function (listener) {
        if (!this._isDisposed) {
            this._listeners.push(listener);
        }
    };
    /**
     * Removes a listener from the store
     * @param listener - the listener callback
     */
    BaseStore.prototype.removeListener = function (listener) {
        if (!this._isDisposed) {
            var listenerIdx = this._listeners.indexOf(listener);
            if (listenerIdx > -1) {
                this._listeners.splice(listenerIdx, 1);
            }
        }
    };
    /**
     * Removes all the registered listeners
     */
    BaseStore.prototype.removeAllListeners = function () {
        this._listeners = [];
    };
    /**
     * Removes a listener from the store
     * @param listener - the listener callback
     *
     * @return the count of listeners tied to this store
     */
    BaseStore.prototype.count = function () {
        return !this._isDisposed ? this._listeners.length : 0;
    };
    /**
     * Invokes all listeners tied to this store
     */
    BaseStore.prototype.emitChange = function () {
        if (!this._isDisposed) {
            this._listeners.forEach(function (listener) { return listener(); });
        }
    };
    /**
     * Disposes all listeners
     */
    BaseStore.prototype.dispose = function () {
        if (!this._isDisposed) {
            this._listeners.splice(0);
            this._listeners = [];
            this._isDisposed = true;
        }
    };
    return BaseStore;
}());
/* harmony default export */ __webpack_exports__["default"] = (BaseStore);


/***/ }),

/***/ "YXSK":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceGraph/PerformanceGraph.module.css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".container_e27349df{display:block;height:100%;width:100%}.tableDelimiter_e27349df{position:relative;float:left;width:100%;border-spacing:0;z-index:1}.thDelimiter_e27349df{height:100%;padding:5px;border:0;border-right:1px solid #c8c8c8;border-bottom:1px solid #767676;width:10%;text-align:right;vertical-align:text-top;font-weight:400;font-size:small;position:relative}.tableRowPerfList_e27349df{border:1px solid #767676;padding:5px;height:25px;-webkit-box-sizing:border-box;box-sizing:border-box}.tableRowRightLight_e27349df{border-right:1px solid #c8c8c8}.tableRowName_e27349df{min-width:250px;max-width:250px}.tableRowDuration_e27349df{min-width:70px;max-width:70px}", ""]);



/***/ }),

/***/ "bYAg":
/*!**********************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/LoadingOrErrorModule/LoadingOrErrorModule.resx.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_SxImp5ewsUToxeAHBkB+pw';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "bnUl":
/*!****************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceGraph/PerformanceGraph.js ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PerformanceGraphItem_PerformanceGraphItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PerformanceGraphItem/PerformanceGraphItem */ "gPmb");
/* harmony import */ var _PerformanceGraph_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PerformanceGraph.module.scss */ "20gl");
/* harmony import */ var _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../PerformanceDisplay.resx */ "Ht0A");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file PerformanceGraph.tsx
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




var PerformanceGraph = /** @class */ (function (_super) {
    __extends(PerformanceGraph, _super);
    function PerformanceGraph(props) {
        var _this = _super.call(this, props) || this;
        _this._scale = Math.ceil(_this.props.overallDuration / 100) * 100;
        return _this;
    }
    PerformanceGraph.prototype.render = function () {
        var _this = this;
        var graphBars = [];
        this.props.perfItems.map(function (item) {
            graphBars.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_PerformanceGraphItem_PerformanceGraphItem__WEBPACK_IMPORTED_MODULE_1__["default"], { key: item.id, perfItem: item, startTime: _this.props.startTime, overallDuration: _this._scale }));
        });
        /**
         * Horizontal lines on the graph that show the scale
         */
        var delimiters = [];
        for (var i = 1; i <= 10; i++) {
            delimiters.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { key: i, className: _PerformanceGraph_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].thDelimiter }, i * (this._scale / 10)));
        }
        var nameStyle = [
            _PerformanceGraph_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tableRowPerfList,
            _PerformanceGraph_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tableRowRightLight,
            _PerformanceGraph_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tableRowName
        ].join(' ');
        var durationStyle = [_PerformanceGraph_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tableRowPerfList, _PerformanceGraph_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tableRowDuration].join(' ');
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _PerformanceGraph_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].container },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: _PerformanceGraph_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tableDelimiter },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { className: nameStyle }, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_3__["default"].ItemsColumnHeader),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { className: durationStyle }, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_3__["default"].DurationColumnHeader),
                        delimiters)),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, graphBars))));
    };
    return PerformanceGraph;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (PerformanceGraph);


/***/ }),

/***/ "fFtQ":
/*!***********************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/ManifestManager/ManifestDetails/ManifestDetails.module.scss.js ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ManifestDetails.module.css */ "WyRj");
var styles = {
    container: 'container_1812d3d7',
    manifestIdHeading: 'manifestIdHeading_1812d3d7',
    manifestTextBox: 'manifestTextBox_1812d3d7'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "fKXZ":
/*!******************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceHeader/PerformanceHeader.js ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PerformanceLegend_PerformanceLegend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PerformanceLegend/PerformanceLegend */ "/aa2");
/* harmony import */ var _PerformanceHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PerformanceHeader.module.scss */ "/WBS");
/* harmony import */ var _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../PerformanceDisplay.resx */ "Ht0A");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file PerformanceHeader.tsx
 * Sub-component for PerformanceDisplay. This component gives an overview of the performance data
 * that is detailed in the graph.
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





var PerformanceHeader = /** @class */ (function (_super) {
    __extends(PerformanceHeader, _super);
    function PerformanceHeader(props) {
        var _this = _super.call(this, props) || this;
        _this._serverResponse = 0;
        _this._appStart = 0;
        _this._renderPageDuration = 0;
        _this._renderWebparts = 0;
        _this._hasWebParts = false;
        _this._getPerfTimings = _this._getPerfTimings.bind(_this);
        return _this;
    }
    PerformanceHeader.prototype.render = function () {
        this._getPerfTimings();
        // The legend has information about breakdown of webpart loading data
        // We only need to show it if there is web part data on the graph
        var legend = undefined;
        if (this._hasWebParts) {
            legend = react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_PerformanceLegend_PerformanceLegend__WEBPACK_IMPORTED_MODULE_2__["default"], null);
        }
        var tableStyle = [_PerformanceHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerTable, _PerformanceHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].msThemeLighter].join(' ');
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _PerformanceHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].hint }, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].PerformanceDataHint),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: tableStyle },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { className: _PerformanceHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerTableRows }, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].ServerResponseLabel),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { className: _PerformanceHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerTableRows }, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].AppLoadLabel),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { className: _PerformanceHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerTableRows }, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].PageRenderLabel),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { className: _PerformanceHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerTableRows }, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].RenderWebPartsLabel),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { className: _PerformanceHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerTableRows }, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].TotalRenderTimeLabel))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerTableRows }, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].MillisecondsUnitLabel, this._serverResponse)),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerTableRows }, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].MillisecondsUnitLabel, this._appStart)),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerTableRows }, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].MillisecondsUnitLabel, this._renderPageDuration)),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerTableRows }, this._hasWebParts
                            ? _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].MillisecondsUnitLabel, this._renderWebparts)
                            : _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].NAPlaceholder),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceHeader_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerTableRows }, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].MillisecondsUnitLabel, this.props.overallDuration))))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, legend)));
    };
    /**
     * Calculate overall load times for categories:
     * Server Response
     * App Load
     * Page Render
     * Web Parts Render
     * Total
     */
    PerformanceHeader.prototype._getPerfTimings = function () {
        var renderPageStart = Infinity;
        var renderPageEnd = 0;
        var webPartStart = Infinity;
        var webPartEnd = 0;
        this._hasWebParts = false;
        for (var _i = 0, _a = this.props.perfItems; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.id === 'w3cResponseEnd') {
                this._serverResponse = item.duration;
            }
            else if (item.id === 'appStart') {
                this._appStart = item.duration;
            }
            else if ((item.id).indexOf('Component') > -1) {
                // Find the earliest start time and latest end time of all components to get overall duration
                if (item.startVal < renderPageStart) {
                    renderPageStart = item.startVal;
                }
                if ((item.duration + item.startVal) > (renderPageEnd)) {
                    renderPageEnd = item.duration + item.startVal;
                }
            }
            else if ((item.id).indexOf('WebPart') > -1) {
                this._hasWebParts = true;
                // Find the earliest start time and latest end time of all web parts to get overall duration
                if (item.startVal < webPartStart) {
                    webPartStart = item.startVal;
                }
                if ((item.duration + item.startVal) > (webPartEnd)) {
                    webPartEnd = item.duration + item.startVal;
                }
            }
        }
        this._renderPageDuration = renderPageEnd - renderPageStart;
        this._renderWebparts = webPartEnd - webPartStart;
    };
    return PerformanceHeader;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (PerformanceHeader);


/***/ }),

/***/ "gPmb":
/*!*****************************************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceGraph/PerformanceGraphItem/PerformanceGraphItem.js ***!
  \*****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PerformanceGraphItem.module.scss */ "zoF1");
/* harmony import */ var _PerformanceHeader_PerformanceLegend_PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../PerformanceHeader/PerformanceLegend/PerformanceLegend.module.scss */ "2tqR");
/* harmony import */ var _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../PerformanceDisplay.resx */ "Ht0A");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file PerformanceGraphItem.tsx
 * Sub-component for PerformanceGraph. One of these exists for each bar in the graph.
 * Each bar has a start value and a width corresponding to some performance data.
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





var PerformanceGraphItem = /** @class */ (function (_super) {
    __extends(PerformanceGraphItem, _super);
    function PerformanceGraphItem(props) {
        var _this = _super.call(this, props) || this;
        _this._drawGraphBar = _this._drawGraphBar.bind(_this);
        return _this;
    }
    PerformanceGraphItem.prototype.render = function () {
        var nameStyle = [
            _PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tableRowPerfList,
            _PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tableRowBottomLight,
            _PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tableRowRightLight
        ].join(' ');
        var durationStyle = [_PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tableRowPerfList, _PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tableRowBottomLight].join(' ');
        var graphBar = [];
        var perfItem = this.props.perfItem;
        if (perfItem.breakdown) {
            /**
             * Graph bars are pushed into array and rendered in this specific order, which shouldn't be changed.
             * Don't care about showing the entire 'render' time, only what is left beyond init, modules loaded, etc.
             * That one gets rendered first so part of it can be covered up. This makes start time calculation much easier.
             */
            graphBar.push(this._drawGraphBar(perfItem.breakdown.render.startVal, perfItem.breakdown.render.duration, _PerformanceHeader_PerformanceLegend_PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].msBlueMid, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].RenderTimeLegendLabel + " " + perfItem.breakdown.render.duration + " ms"));
            if (perfItem.breakdown.modulesLoaded) {
                graphBar.push(this._drawGraphBar(perfItem.breakdown.modulesLoaded.startVal, perfItem.breakdown.modulesLoaded.duration, _PerformanceHeader_PerformanceLegend_PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].msBlue, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].ModuleLoadingTimeLabel + " " + perfItem.breakdown.modulesLoaded.duration + " ms"));
            }
            if (perfItem.breakdown.lazyLoading) {
                graphBar.push(this._drawGraphBar(perfItem.breakdown.lazyLoading.startVal, perfItem.breakdown.lazyLoading.duration, _PerformanceHeader_PerformanceLegend_PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].msLightGreen, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].ModuleLazyLoadingDelayLabel + " " + perfItem.breakdown.lazyLoading.duration + " ms"));
            }
            if (perfItem.breakdown.init) {
                graphBar.push(this._drawGraphBar(perfItem.breakdown.init.startVal, perfItem.breakdown.init.duration, _PerformanceHeader_PerformanceLegend_PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].msPurpleLight, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].InitializationTimeLabel + " " + perfItem.breakdown.init.duration + " ms"));
            }
            if (perfItem.breakdown.dataFetch) {
                for (var _i = 0, _a = perfItem.breakdown.dataFetch; _i < _a.length; _i++) {
                    var apiCall = _a[_i];
                    graphBar.push(this._drawGraphBar(apiCall.startVal, apiCall.duration, _PerformanceHeader_PerformanceLegend_PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].msTealLight, _PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].DataFetchTimeLabel + " " + apiCall.duration + " ms"));
                }
            }
        }
        else {
            graphBar.push(this._drawGraphBar(perfItem.startVal, perfItem.duration, _PerformanceHeader_PerformanceLegend_PerformanceLegend_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].msThemeTertiary, perfItem.name + " " + perfItem.duration + " ms"));
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: nameStyle }, this.props.perfItem.name),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: durationStyle }, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_4__["default"].MillisecondsUnitLabel, this.props.perfItem.duration)),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tdDelimiter }, graphBar),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tdDelimiter }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tdDelimiter }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tdDelimiter }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tdDelimiter }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tdDelimiter }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tdDelimiter }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tdDelimiter }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tdDelimiter }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { className: _PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tdDelimiter })));
    };
    /**
     * Creates a div to show the bar on the graph.
     * startVal: start time integer representing where the bar starts
     * duration: time duration integer representing width of the bar
     * barColor: class name specifying the color of the bar
     */
    PerformanceGraphItem.prototype._drawGraphBar = function (startVal, duration, barColor, tooltip) {
        /**
         * Calculate the left value and width by percentage so that they will always fit on the screen
         * and be scaled properly
         */
        var leftVal = ((startVal - this.props.startTime) / this.props.overallDuration);
        var widthVal = (duration / this.props.overallDuration);
        /**
         * nameTableWidth: The pixel width of the name & duration section of the table.
         * This needs to be factored into the calculation because the bars are absolutely positioned to cross table lines
         * so the position needs to be offset from the edge of the name/duration section of the table.
         */
        var nameTableWidth = '320px';
        var barStyling = {
            left: "calc(" + leftVal + " * (100% - " + nameTableWidth + ") + " + nameTableWidth + ")",
            width: "calc(" + widthVal + " * (100% - " + nameTableWidth + "))"
        };
        var barClass = [_PerformanceGraphItem_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].bar, barColor].join(' ');
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { key: "" + leftVal + widthVal, className: barClass, style: barStyling, title: tooltip });
    };
    return PerformanceGraphItem;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (PerformanceGraphItem);


/***/ }),

/***/ "gVY4":
/*!**************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceList/traceFormatting.js ***!
  \**************************************************************************************************/
/*! exports provided: formatTimestamp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatTimestamp", function() { return formatTimestamp; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../TraceDisplay.resx */ "JTsx");
/**
 * Functions for formatting fields of trace logs.
 */


// Not using i18n-utilities here because it doesn't handle milliseconds
function formatTimestamp(time) {
    var date = new Date(time);
    return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Text"].format(_TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TimestampFormat, 
    /*  Year */ date.getUTCFullYear(), 
    /* Month */ leftPadZeros(date.getUTCMonth() + 1, 2), // January is 0
    /*  Day  */ leftPadZeros(date.getUTCDate(), 2), 
    /*     Hour    */ leftPadZeros(date.getUTCHours(), 2), 
    /*    Minute   */ leftPadZeros(date.getUTCMinutes(), 2), 
    /*    Second   */ leftPadZeros(date.getUTCSeconds(), 2), 
    /* Millisecond */ leftPadZeros(date.getUTCMilliseconds(), 3));
}
function leftPadZeros(value, minLength) {
    var result = value.toString();
    for (var i = result.length; i < minLength; i++) {
        result = "0" + result;
    }
    return result;
}


/***/ }),

/***/ "hoe0":
/*!********************************************************!*\
  !*** ./lib/DeveloperTools/Models/DeveloperToolsTab.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DeveloperTools_resx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../DeveloperTools.resx */ "1Qiv");
/**
 * @file DeveloperToolsTab.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */

/**
 * Represents a developer tools tab. The developer console can be invoked with the "CTRL+F12"
 *  key combination.
 *
 * @internal
 */
var DeveloperToolsTab = /** @class */ (function () {
    function DeveloperToolsTab(parameters) {
        var _this = this;
        this._isLoading = false;
        this.loadComponent = function () {
            if (!_this._componentInitializer) {
                // If the component was passed in directly, resolve immediately
                return Promise.resolve(undefined);
            }
            if (!_this._componentInitializerPromise) {
                _this._isLoading = true;
                _this._componentInitializerPromise =
                    new Promise(_this._componentInitializer)
                        .then(function (component) {
                        _this._isLoading = false;
                        _this._component = component;
                    })
                        .catch(function (error) {
                        _this._isLoading = false;
                        _this._loadError = error;
                    });
            }
            return _this._componentInitializerPromise;
        };
        this._title = parameters.title;
        var componentParameters = parameters;
        var promiseParameters = parameters;
        if (promiseParameters.componentInitializer) {
            this._componentInitializer = promiseParameters.componentInitializer;
            this._isLoading = true;
        }
        else if (componentParameters.component) {
            this._component = componentParameters.component;
        }
        else {
            throw new Error(_DeveloperTools_resx__WEBPACK_IMPORTED_MODULE_0__["default"].missingDeveloperToolsTabInitFunctionError);
        }
    }
    Object.defineProperty(DeveloperToolsTab.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeveloperToolsTab.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeveloperToolsTab.prototype, "component", {
        get: function () {
            return this._component;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeveloperToolsTab.prototype, "loadError", {
        get: function () {
            return this._loadError;
        },
        enumerable: true,
        configurable: true
    });
    return DeveloperToolsTab;
}());
/* harmony default export */ __webpack_exports__["default"] = (DeveloperToolsTab);


/***/ }),

/***/ "jD7m":
/*!**********************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceList/CsvRenderer.js ***!
  \**********************************************************************************************/
/*! exports provided: triggerCsvDownload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triggerCsvDownload", function() { return triggerCsvDownload; });
/* harmony import */ var _Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Stores/TraceDisplayStore */ "wTRJ");
/* harmony import */ var _traceFormatting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./traceFormatting */ "gVY4");
/* harmony import */ var _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../TraceDisplay.resx */ "JTsx");



var HEADER = 'data:text/csv;charset=utf-8';
var NEWLINE = '\n';
var FILENAME = 'spfx_trace_logs.csv';
function triggerCsvDownload(traces) {
    var tracesLength = traces.length;
    if (tracesLength === 0) {
        return;
    }
    var csvContent = _generateCsvContent(traces);
    var link = document.createElement('a');
    link.setAttribute('href', encodeURI(HEADER + "," + csvContent));
    link.setAttribute('download', FILENAME);
    link.setAttribute('data-automation-id', 'trace-csv-download-anchor');
    document.body.appendChild(link);
    link.click(); // This will download the data file named "spfx_trace_logs.csv".
    document.body.removeChild(link);
}
function _generateCsvContent(traces) {
    var headerLine = [
        _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].TimestampHeaderLabel,
        _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].LevelHeaderLabel,
        _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].ScopeHeaderLabel,
        _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].SourceHeaderLabel,
        _TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_2__["default"].MessageHeaderLabel
    ].map(_escapeCsvField).join(',');
    return "" + headerLine + NEWLINE + traces.map(_generateCsvLine).join(NEWLINE);
}
function _generateCsvLine(trace) {
    var logEventArray = [
        Object(_traceFormatting__WEBPACK_IMPORTED_MODULE_1__["formatTimestamp"])(trace.timestamp),
        (trace.level) ? _Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_0__["LogLevel"][trace.level] : ' ',
        trace.source,
        (trace.message) ? trace.message : ((trace.error) ? trace.error.message : ' ')
    ];
    return logEventArray.map(_escapeCsvField).join(',');
}
function _escapeCsvField(rawField) {
    if (!rawField) {
        return ''; // If the field is undefined or empty, return an empty field
    }
    // Examples:
    // '"' -> '""""'
    // ',' -> '","'
    // '\n' -> '"\n"'
    // 'asdf"asdf' -> '"asdf""asdf"'
    // 'a"b,c\nd' -> '"a""b,c\nd"'
    var escapedField = rawField.replace(/(")/g, '""'); // Escape quotes to double quotes
    if (escapedField.match(/([,"\n])/)) { // Detect commas, quotes, and newlines
        escapedField = "\"" + escapedField + "\""; // Wrap the field in quotes if it contains any of those characters
    }
    return escapedField;
}


/***/ }),

/***/ "jMO4":
/*!************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/ManifestManager/ManifestManager.resx.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_sovI4qDAUPMnD4jg3Vsyfg';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "l3/d":
/*!*****************************************************************!*\
  !*** ./lib/DeveloperTools/Stores/DeveloperToolsConsoleStore.js ***!
  \*****************************************************************/
/*! exports provided: DeveloperToolsConsoleStore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeveloperToolsConsoleStore", function() { return DeveloperToolsConsoleStore; });
/* harmony import */ var _BaseStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseStore */ "YGYo");
/* harmony import */ var _Components_DeveloperModules_ManifestManager_ManifestManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../Components/DeveloperModules/ManifestManager/ManifestManager */ "Tckj");
/* harmony import */ var _Components_DeveloperModules_PerformanceDisplay_PerformanceDisplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../Components/DeveloperModules/PerformanceDisplay/PerformanceDisplay */ "4D8N");
/* harmony import */ var _Components_DeveloperModules_TraceDisplay_TraceDisplay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../Components/DeveloperModules/TraceDisplay/TraceDisplay */ "MW+x");
/* harmony import */ var _Models_DeveloperToolsTab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../Models/DeveloperToolsTab */ "hoe0");
/* harmony import */ var _Components_DeveloperModules_ManifestManager_ManifestManager_resx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../Components/DeveloperModules/ManifestManager/ManifestManager.resx */ "jMO4");
/* harmony import */ var _Components_DeveloperModules_PerformanceDisplay_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../Components/DeveloperModules/PerformanceDisplay/PerformanceDisplay.resx */ "Ht0A");
/* harmony import */ var _Components_DeveloperModules_TraceDisplay_TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../Components/DeveloperModules/TraceDisplay/TraceDisplay.resx */ "JTsx");
/**
 * @file DeveloperToolsConsoleStore.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
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








var DEFAULT_HEIGHT = 1 / 4;
var MIN_HEIGHT = 1 / 6;
var MAX_HEIGHT = 3 / 4;
var DeveloperToolsConsoleStore = /** @class */ (function (_super) {
    __extends(DeveloperToolsConsoleStore, _super);
    function DeveloperToolsConsoleStore() {
        var _this = _super.call(this) || this;
        _this._height = DEFAULT_HEIGHT;
        _this._visible = false;
        _this._selectedTabId = 0;
        _this._tabs = [
            new _Models_DeveloperToolsTab__WEBPACK_IMPORTED_MODULE_4__["default"]({
                title: _Components_DeveloperModules_TraceDisplay_TraceDisplay_resx__WEBPACK_IMPORTED_MODULE_7__["default"].TabTitle,
                component: _Components_DeveloperModules_TraceDisplay_TraceDisplay__WEBPACK_IMPORTED_MODULE_3__["default"]
            }),
            new _Models_DeveloperToolsTab__WEBPACK_IMPORTED_MODULE_4__["default"]({
                title: _Components_DeveloperModules_PerformanceDisplay_PerformanceDisplay_resx__WEBPACK_IMPORTED_MODULE_6__["default"].TabTitle,
                component: _Components_DeveloperModules_PerformanceDisplay_PerformanceDisplay__WEBPACK_IMPORTED_MODULE_2__["default"]
            }),
            new _Models_DeveloperToolsTab__WEBPACK_IMPORTED_MODULE_4__["default"]({
                title: _Components_DeveloperModules_ManifestManager_ManifestManager_resx__WEBPACK_IMPORTED_MODULE_5__["default"].tabTitle,
                component: _Components_DeveloperModules_ManifestManager_ManifestManager__WEBPACK_IMPORTED_MODULE_1__["default"]
            })
        ];
        return _this;
    }
    Object.defineProperty(DeveloperToolsConsoleStore, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new DeveloperToolsConsoleStore();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeveloperToolsConsoleStore.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeveloperToolsConsoleStore.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeveloperToolsConsoleStore.prototype, "selectedTabId", {
        get: function () {
            return this._selectedTabId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeveloperToolsConsoleStore.prototype, "tabs", {
        get: function () {
            return this._tabs;
        },
        enumerable: true,
        configurable: true
    });
    DeveloperToolsConsoleStore.prototype.resizeConsole = function (height) {
        var newHeight = this._height;
        if (height >= MAX_HEIGHT) {
            newHeight = MAX_HEIGHT;
        }
        else if (height <= MIN_HEIGHT) {
            newHeight = MIN_HEIGHT;
        }
        else {
            newHeight = height;
        }
        if (newHeight !== this._height) {
            this._height = newHeight;
            this.emitChange();
        }
    };
    DeveloperToolsConsoleStore.prototype.showHideConsole = function (show) {
        if (this._visible !== show) {
            this._visible = show;
            this.emitChange();
        }
    };
    DeveloperToolsConsoleStore.prototype.registerTab = function (tab) {
        this._tabs.push(tab);
        if (this._tabs.length === 1) {
            this._selectedTabId = 0;
        }
        this.emitChange();
    };
    return DeveloperToolsConsoleStore;
}(_BaseStore__WEBPACK_IMPORTED_MODULE_0__["default"]));

// instantiate the store so it can start listening to dispatch events
/* harmony default export */ __webpack_exports__["default"] = (DeveloperToolsConsoleStore.instance); // tslint:disable-line:export-name


/***/ }),

/***/ "lFVU":
/*!*****************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/LoadingOrErrorModule/LoadingOrErrorModule.js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react_lib_Spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/Spinner */ "0lYJ");
/* harmony import */ var office_ui_fabric_react_lib_Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! office-ui-fabric-react/lib/Utilities */ "UJDV");
/* harmony import */ var _LoadingOrErrorModule_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LoadingOrErrorModule.module.scss */ "5iYD");
/* harmony import */ var _LoadingOrErrorModule_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LoadingOrErrorModule.resx */ "bYAg");
/**
 * @file LoadingOrErrorModule.tsx
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
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





var LoadingOrErrorModule = /** @class */ (function (_super) {
    __extends(LoadingOrErrorModule, _super);
    function LoadingOrErrorModule(props) {
        return _super.call(this, props) || this;
    }
    LoadingOrErrorModule.prototype.componentDidMount = function () {
        var _this = this;
        this.props.tab.loadComponent()
            .then(function () {
            _this.forceUpdate();
        })
            .catch(function (error) {
            _this.forceUpdate();
        });
    };
    LoadingOrErrorModule.prototype.render = function () {
        var tab = this.props.tab;
        if (tab.isLoading) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _LoadingOrErrorModule_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].loadingModule },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_Spinner__WEBPACK_IMPORTED_MODULE_1__["Spinner"], { type: office_ui_fabric_react_lib_Spinner__WEBPACK_IMPORTED_MODULE_1__["SpinnerType"].large, label: _LoadingOrErrorModule_resx__WEBPACK_IMPORTED_MODULE_4__["default"].developerToolsTabLoadingText }));
        }
        else if (tab.loadError || !tab.component) {
            // tslint:disable-next-line:typedef
            var errorMessage = tab.loadError || _LoadingOrErrorModule_resx__WEBPACK_IMPORTED_MODULE_4__["default"].developerToolsTabLoadingUnknownError;
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _LoadingOrErrorModule_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].module },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { "aria-live": 'assertive', className: _LoadingOrErrorModule_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].screenReaderErrorMessage, "data-automation-id": 'error-message' }, errorMessage),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: Object(office_ui_fabric_react_lib_Utilities__WEBPACK_IMPORTED_MODULE_2__["css"])('ms-TextField-errorMessage', _LoadingOrErrorModule_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].errorText) }, errorMessage));
        }
        else {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](tab.component);
        }
    };
    return LoadingOrErrorModule;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (LoadingOrErrorModule);


/***/ }),

/***/ "my3T":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceList/TraceList.module.css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, "ul{padding:0}li{display:inline-table}.container_f5b519e4{height:100%;padding:0}.traceListItemsContainer_f5b519e4{height:80%;padding:0;overflow-y:auto;margin-top:0;margin-bottom:0}", ""]);



/***/ }),

/***/ "rGrZ":
/*!*************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/LoadingOrErrorModule/LoadingOrErrorModule.module.css ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./LoadingOrErrorModule.module.css */ "Bxeg");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "rtxV":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceDisplay.module.css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".container_3d282470{height:100%}.traceListContainer_3d282470{height:100%;width:100%;float:left}", ""]);



/***/ }),

/***/ "sHC+":
/*!**************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceList/TraceListItem/TraceListItem.js ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TraceListItem_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TraceListItem.module.scss */ "6FYO");
/* harmony import */ var _Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../Stores/TraceDisplayStore */ "wTRJ");
/* harmony import */ var _traceFormatting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../traceFormatting */ "gVY4");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file TraceListItem.tsx
 * Sub-component for TraceList. One of these exists for each row in the table.
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




var TraceListItem = /** @class */ (function (_super) {
    __extends(TraceListItem, _super);
    function TraceListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TraceListItem.prototype.render = function () {
        var styleDeclarations;
        var message;
        styleDeclarations = [_TraceListItem_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].container];
        if (this.props.id % 2 === 0) {
            styleDeclarations.push(_TraceListItem_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].blueBackground);
        }
        // Message property is a different property for Error logs.
        // @todo (SPPPlat VSO bug #259565) The Number casting is a workaround for a TypeScript bug.
        if (Number(this.props.trace.level) === _Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].error) {
            message = this.props.trace.error ? this.props.trace.error.message : this.props.trace.message;
            styleDeclarations.push(_TraceListItem_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].redText);
        }
        else {
            message = this.props.trace.message;
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { key: this.props.id, className: styleDeclarations.join(' ') },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: _TraceListItem_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].itemDetails },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: _TraceListItem_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].timestamp }, Object(_traceFormatting__WEBPACK_IMPORTED_MODULE_3__["formatTimestamp"])(this.props.trace.timestamp)),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: _TraceListItem_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"][_Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_2__["LogLevel"][this.props.trace.level]] }, _Stores_TraceDisplayStore__WEBPACK_IMPORTED_MODULE_2__["LogLevel"][this.props.trace.level]),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: _TraceListItem_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].scope }, this.props.trace.scope ? this.props.trace.scope.id : undefined),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: _TraceListItem_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].source }, this.props.trace.source),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: _TraceListItem_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].message }, message))));
    };
    return TraceListItem;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (TraceListItem);


/***/ }),

/***/ "t1El":
/*!********************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceList/TraceList.module.scss.js ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./TraceList.module.css */ "DpMv");
var styles = {
    container: 'container_f5b519e4',
    traceListItemsContainer: 'traceListItemsContainer_f5b519e4'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "tac/":
/*!***********************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/ManifestManager/ManifestDetails/ManifestDetails.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ManifestDetails_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ManifestDetails.module.scss */ "fFtQ");
/**
 * @file ManifestDetails.tsx
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
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


var ManifestDetails = /** @class */ (function (_super) {
    __extends(ManifestDetails, _super);
    function ManifestDetails() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ManifestDetails.prototype.render = function () {
        var manifest = this.props.manifest.debugManifest || this.props.manifest.manifest;
        var manifestText = manifest ? JSON.stringify(manifest, undefined, 2) : '';
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ManifestDetails_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].container },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ManifestDetails_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].manifestIdHeading }, this.props.manifest.id),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("textarea", { className: _ManifestDetails_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].manifestTextBox, readOnly: true, value: manifestText }));
    };
    return ManifestDetails;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (ManifestDetails);


/***/ }),

/***/ "ug1O":
/*!**************************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceHeader/PerformanceHeader.module.css ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PerformanceHeader.module.css */ "z2CW");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "wRAh":
/*!***************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/ManifestManager/ManifestManager.module.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ManifestManager.module.css */ "Gu9P");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "wTRJ":
/*!********************************************************!*\
  !*** ./lib/DeveloperTools/Stores/TraceDisplayStore.js ***!
  \********************************************************/
/*! exports provided: LogLevel, TraceDisplayStore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return LogLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TraceDisplayStore", function() { return TraceDisplayStore; });
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BaseStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseStore */ "YGYo");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file TraceDisplayStore.ts
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


var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["all"] = 0] = "all";
    LogLevel[LogLevel["verbose"] = 1] = "verbose";
    LogLevel[LogLevel["info"] = 2] = "info";
    LogLevel[LogLevel["warning"] = 3] = "warning";
    LogLevel[LogLevel["error"] = 4] = "error";
})(LogLevel || (LogLevel = {}));
/**
 *  Implementation for managing the data of user-selected filters and all trace data
 *  for a TraceDisplay.
 */
var TraceDisplayStore = /** @class */ (function (_super) {
    __extends(TraceDisplayStore, _super);
    function TraceDisplayStore() {
        var _this = _super.call(this) || this;
        _this._filter = {
            level: { all: true, verbose: true, info: true, warning: true, error: true, none: true },
            source: { all: true, none: true },
            scope: { all: true, none: true }
        };
        _this._traces = [];
        return _this;
    }
    Object.defineProperty(TraceDisplayStore, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new TraceDisplayStore();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TraceDisplayStore.prototype, "traces", {
        get: function () {
            var _this = this;
            var data = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_LogEvent"].logManager.events;
            this._traces = [];
            if (data) {
                data.forEach(function (value) {
                    if (value) {
                        _this._traces.push(value);
                    }
                });
            }
            return this._traces;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TraceDisplayStore.prototype, "currentFilter", {
        get: function () {
            return this._filter;
        },
        enumerable: true,
        configurable: true
    });
    TraceDisplayStore.prototype.applyTraceFilter = function (filter) {
        this._filter = filter;
        this.emitChange();
    };
    return TraceDisplayStore;
}(_BaseStore__WEBPACK_IMPORTED_MODULE_1__["default"]));

// instantiate the store so it can start listening to dispatch events
// tslint:disable:export-name
/* harmony default export */ __webpack_exports__["default"] = (TraceDisplayStore.instance);


/***/ }),

/***/ "z2CW":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceHeader/PerformanceHeader.module.css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".headerTable_aa6b7018{border:1px solid #767676;border-right:0;width:calc(100% - 1em);margin-bottom:10px;margin-top:5px;border-collapse:collapse}.headerTableRows_aa6b7018{text-align:center;border-right:1px solid #767676;border-bottom:1px solid #767676}.hint_aa6b7018{font-size:12px;margin:5px}.infoIcon_aa6b7018{margin-right:5px}.msThemeLighter_aa6b7018{background-color:#deecf9}", ""]);



/***/ }),

/***/ "zoF1":
/*!*****************************************************************************************************************************************************!*\
  !*** ./lib/DeveloperTools/Components/DeveloperModules/PerformanceDisplay/PerformanceGraph/PerformanceGraphItem/PerformanceGraphItem.module.scss.js ***!
  \*****************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PerformanceGraphItem.module.css */ "98wo");
var styles = {
    bar: 'bar_247e761e',
    tableRowPerfList: 'tableRowPerfList_247e761e',
    tableRowBottomLight: 'tableRowBottomLight_247e761e',
    tableRowRightLight: 'tableRowRightLight_247e761e',
    tdDelimiter: 'tdDelimiter_247e761e'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ })

}]);
//# sourceMappingURL=chunk.developer-tools_73a010dc401f6d4dbb94.js.map