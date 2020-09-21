(window["webpackJsonpe795d530_8fb6_425c_b864_b86735dbae1d_1_3_24"] = window["webpackJsonpe795d530_8fb6_425c_b864_b86735dbae1d_1_3_24"] || []).push([["page-picker-component"],{

/***/ "3aqr":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/PagePickerSuggestionsNoResult.module.css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".noResultFoundContainer_3378467c{height:100%;padding:0 10px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.noResultFoundIcon_3378467c{margin-bottom:18px;font-size:32px}[dir=ltr] .noResultFoundIcon_3378467c{margin-right:14px}[dir=rtl] .noResultFoundIcon_3378467c{margin-left:14px}.noResultFoundLabelContainer_3378467c{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.noResultLabel_3378467c{font-size:21px;font-weight:100;margin-bottom:4px}.noResultLabel_3378467c,.tryAgainLabel_3378467c{color:\"[theme:neutralSecondary, default: #605e5c]\"}.tryAgainLabel_3378467c{font-size:14px;font-weight:400}", ""]);



/***/ }),

/***/ "6+Mi":
/*!*****************************************!*\
  !*** ./lib/PagePickerSuggestionsRow.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react_lib_DetailsList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/DetailsList */ "hjiq");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _PagePickerSuggestions_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PagePickerSuggestions.module.scss */ "YVB/");
/**
 * @copyright Microsoft Corporation. All rights reserved.
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PagePickerSuggestionsRow = /** @class */ (function (_super) {
    __extends(PagePickerSuggestionsRow, _super);
    function PagePickerSuggestionsRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PagePickerSuggestionsRow.prototype.render = function () {
        var _a;
        var suggestionsRowClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["css"])(_PagePickerSuggestions_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].suggestionsRow, (_a = {},
            _a[_PagePickerSuggestions_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].isRowSelected] = this.props.detailsRowProps.item.isSelected,
            _a));
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: suggestionsRowClassName, onClick: this._handleClick, onKeyDown: this._handleKeyDown },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](office_ui_fabric_react_lib_DetailsList__WEBPACK_IMPORTED_MODULE_1__["DetailsRow"], __assign({}, this.props.detailsRowProps))));
    };
    PagePickerSuggestionsRow.prototype._handleClick = function () {
        this.props.onSelect(this.props.detailsRowProps.item, this.props.detailsRowProps.itemIndex);
    };
    PagePickerSuggestionsRow.prototype._handleKeyDown = function (event) {
        if (event.key === 'Space') {
            this.props.onSelect(this.props.detailsRowProps.item, this.props.detailsRowProps.itemIndex);
        }
    };
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["autobind"]
    ], PagePickerSuggestionsRow.prototype, "_handleClick", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["autobind"]
    ], PagePickerSuggestionsRow.prototype, "_handleKeyDown", null);
    return PagePickerSuggestionsRow;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (PagePickerSuggestionsRow);


/***/ }),

/***/ "6G+p":
/*!*******************************************************************!*\
  !*** ./lib/copied/screenReaderAlert/ScreenReaderAlert.module.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ScreenReaderAlert.module.css */ "MrDM");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "ANju":
/*!***********************************************************!*\
  !*** ./lib/copied/screenReaderAlert/ScreenReaderAlert.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ScreenReaderAlertProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ScreenReaderAlertProps */ "RiH3");
/* harmony import */ var _ScreenReaderAlert_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ScreenReaderAlert.module.scss */ "Pc1x");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file Screen Reader Alert component.
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




/**
 * This is a screen reader alert component for developers to easily add screen reader feature to their web site.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions Live Region in MDN}
 *
 * All functionalities of this component are tested through:
 * 1. Narrator in Windows 10.
 * 2. JAWS 18.
 * 3. NVDA 2016.4.
 * 4. ChromeVOX v53.0.2784.4.
 *
 * @example
 * <ScreenReaderAlert message={ message } />
 */
var ScreenReaderAlert = /** @class */ (function (_super) {
    __extends(ScreenReaderAlert, _super);
    function ScreenReaderAlert() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * The index updated during each rendering to make React re-attach the DOM.
         *
         * It is critical to make React re-attach the DOM once we want it to read something. Simply updating the
         * text context inside DOM will cause different behavior in different screen readers or browsers.
         * Re-attaching the live region element is the most common way which is supported by most major screen reader
         * and browser combinations.
         */
        _this._renderIndex = 0;
        return _this;
    }
    /**
   * This is an API for developers to read screen reader message.
   * It is typically to be called when there is no React component or DOM element to attach ScreenReaderAlert component.
   */
    ScreenReaderAlert.read = function (message, readingMode) {
        if (ScreenReaderAlert.alertNode === undefined) {
            ScreenReaderAlert.alertNode = document.createElement('div');
            ScreenReaderAlert.alertNode.setAttribute('data-automation-id', 'screen-reader-alert-static');
            document.body.appendChild(ScreenReaderAlert.alertNode);
        }
        react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ScreenReaderAlert, { readingMode: readingMode !== undefined ? readingMode : 1 /* ReadAfterOtherContent */, indicator: ScreenReaderAlert.alertIndicator++, message: message }), ScreenReaderAlert.alertNode);
    };
    ScreenReaderAlert.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ScreenReaderAlert_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].screenReaderAlert, key: this._renderIndex++ }, this.props.message && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { role: this._role, "aria-live": _ScreenReaderAlertProps__WEBPACK_IMPORTED_MODULE_2__["ARIA_LIVE_MAPPING"].get(this.props.readingMode), "aria-atomic": true }, this.props.message))));
    };
    Object.defineProperty(ScreenReaderAlert.prototype, "_role", {
        get: function () {
            return this.props.readingMode === 2 /* ReadImmediately */ ? 'alert' : undefined;
        },
        enumerable: true,
        configurable: true
    });
    // The default props that will automatically be applied to this component.
    ScreenReaderAlert.defaultProps = _ScreenReaderAlertProps__WEBPACK_IMPORTED_MODULE_2__["defaultScreenReaderAlertProps"];
    ScreenReaderAlert.alertIndicator = 0;
    return ScreenReaderAlert;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (ScreenReaderAlert);


/***/ }),

/***/ "DsTs":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/PagePickerComponent.module.css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".linkDialogContainer_8e3b45f6{min-width:540px}.linkDialogContainer_8e3b45f6.isCompact_8e3b45f6{min-width:360px}.linkDialogContainer_8e3b45f6 .unlinkButton_8e3b45f6{margin-top:4px;font-size:14px}[dir=ltr] .linkDialogContainer_8e3b45f6 .unlinkButton_8e3b45f6{float:left}[dir=rtl] .linkDialogContainer_8e3b45f6 .unlinkButton_8e3b45f6{float:right}.linkDialogInput_8e3b45f6.ms-TextField{margin-bottom:2px}.linkDialogInput_8e3b45f6.ms-TextField.searchInput_8e3b45f6{margin-top:20px}.openLinkInNewTabCheckbox_8e3b45f6{margin-top:15px}.screenReaderOnly_8e3b45f6{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}", ""]);



/***/ }),

/***/ "ItMH":
/*!*********************************!*\
  !*** ./lib/PagePickerSearch.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _copied_screenReaderAlert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./copied/screenReaderAlert */ "JB+B");
/* harmony import */ var _dataProviders_LinkDataProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dataProviders/LinkDataProvider */ "M7Bk");
/* harmony import */ var _PagePickerSuggestions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PagePickerSuggestions */ "dNPk");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loc/Strings.resx */ "qITA");
/* harmony import */ var _PagePickerComponent_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PagePickerComponent.module.scss */ "bjXu");
/**
 * @copyright Microsoft Corporation. All rights reserved.
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var GET_PAGE_LINKS_DELAY_IN_MILLISECONDS = 400;
var NOT_EMPTY_REG_EXP = /\S/;
var MR_SPACES_SUB_CONTENT_TYPE = '0043153F945E98468297E67C3EEE43AB70';
var PagePickerSearch = /** @class */ (function (_super) {
    __extends(PagePickerSearch, _super);
    function PagePickerSearch(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isSuggestionLoading: false,
            searchInput: '',
            shouldReadScreenReaderAlert: false,
            shouldSearch: false,
            suggestions: []
        };
        var subContentTypeId = _this.props.isMixedRealityMode ? MR_SPACES_SUB_CONTENT_TYPE : undefined;
        _this._dataProvider =  false || ( true && _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Environment"].type === _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["EnvironmentType"].Local)
            ? new (__webpack_require__(/*! ./dataProviders/MockLinkDataProvider */ "OFYg").default)
            : new _dataProviders_LinkDataProvider__WEBPACK_IMPORTED_MODULE_4__["default"](_this.props.serviceScope, subContentTypeId, _this.props.qosPrefix || '');
        _this._operationId = 0;
        _this._renderSearchPageSuggestions =
            _this._async.debounce(_this._renderSearchPageSuggestions, GET_PAGE_LINKS_DELAY_IN_MILLISECONDS);
        return _this;
    }
    PagePickerSearch.prototype.render = function () {
        var suggestionsLabel = this.state.shouldSearch
            ? this.props.isMixedRealityMode ? _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].SearchForSpacesLabel : _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].SearchForPagesLabel
            : this.props.isMixedRealityMode ? _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].RecentSpacesLabel : _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].RecentPagesLabel;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("section", null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["TextField"], { className: !this.props.isMixedRealityMode
                    ? Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["css"])(_PagePickerComponent_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].linkDialogInput, _PagePickerComponent_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].searchInput)
                    : Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["css"])(_PagePickerComponent_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].linkDialogInput), "data-automation-id": 'pagePickerSearchTextField', label: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].SearchTextFieldLabel, onChange: this._handleSearchInputChanged, placeholder: this.props.isMixedRealityMode
                    ? _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].SearchSpacesTextFieldPlaceholder
                    : _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].SearchPagesTextFieldPlaceholder, value: this.state.searchInput }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_PagePickerSuggestions__WEBPACK_IMPORTED_MODULE_5__["default"], { isLoading: this.state.isSuggestionLoading, label: suggestionsLabel, onSuggestionSelect: this._handleSuggestionSelect, suggestions: this.state.suggestions, userInput: this.state.searchInput }),
            this.state.shouldReadScreenReaderAlert &&
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_copied_screenReaderAlert__WEBPACK_IMPORTED_MODULE_3__["ScreenReaderAlert"], { message: this._screenReaderAlert })));
    };
    PagePickerSearch.prototype.componentDidMount = function () {
        this.renderSuggestions(this.props.defaultQuery || '');
    };
    PagePickerSearch.prototype.renderSuggestions = function (searchInput) {
        var shouldSearch = NOT_EMPTY_REG_EXP.test(searchInput);
        this.setState({
            isSuggestionLoading: shouldSearch,
            searchInput: searchInput,
            shouldSearch: shouldSearch,
            suggestions: []
        });
        if (shouldSearch) {
            // Since _renderSearchPageSuggestions is a debounce function, we need to increment operationId here.
            this._renderSearchPageSuggestions(searchInput, ++this._operationId);
        }
        else {
            // Will show the recent pages if there is no user input for the search text field.
            this._renderRecentPageSuggestions();
        }
    };
    Object.defineProperty(PagePickerSearch.prototype, "_screenReaderAlert", {
        get: function () {
            if (this.state.isSuggestionLoading) {
                return _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].IsSearching;
            }
            else if (!this.state.suggestions || this.state.suggestions.length === 0) {
                return _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].NoResultLabel;
            }
            else if (this.state.shouldSearch) {
                return _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].SearchResultsShowing;
            }
            else {
                return _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].RecentPagesShowing;
            }
        },
        enumerable: true,
        configurable: true
    });
    PagePickerSearch.prototype._handleSearchInputChanged = function (event, searchInput) {
        // Will only read the screen reader alert after user typed something.
        this.setState({
            shouldReadScreenReaderAlert: true
        });
        this.renderSuggestions(searchInput);
    };
    PagePickerSearch.prototype._handleSuggestionSelect = function (link, selectedIndex) {
        this.setState(function (prevState) {
            var newSuggestions = prevState.suggestions
                .map(function (suggestion, index) {
                if (index === selectedIndex) {
                    return __assign({}, suggestion, { isSelected: true });
                }
                else {
                    return __assign({}, suggestion, { isSelected: false });
                }
            });
            return {
                suggestions: newSuggestions
            };
        });
        this.props.onSuggestionSelect(link);
    };
    PagePickerSearch.prototype._renderSearchPageSuggestions = function (value, operationId) {
        var _this = this;
        this._dataProvider.getPageLinksByTitle(value).then(function (links) {
            if (_this.props.isMixedRealityMode) {
                _this._removeCurrentUrl(links);
            }
            if (operationId === _this._operationId) {
                _this.setState({
                    isSuggestionLoading: false,
                    suggestions: links
                });
            }
        });
    };
    PagePickerSearch.prototype._renderRecentPageSuggestions = function () {
        var _this = this;
        var operationId = ++this._operationId;
        // We only send request to get recent pages once.
        if (!this._recentPageSuggestions) {
            this.setState({
                isSuggestionLoading: true
            });
            this._dataProvider.getRecentPageLinks().then(function (links) {
                if (_this.props.isMixedRealityMode) {
                    _this._removeCurrentUrl(links);
                }
                _this._recentPageSuggestions = links;
                if (operationId === _this._operationId) {
                    _this.setState({
                        isSuggestionLoading: false,
                        suggestions: _this._recentPageSuggestions
                    });
                }
            });
        }
        else {
            this.setState({
                isSuggestionLoading: false,
                suggestions: this._recentPageSuggestions
            });
        }
    };
    PagePickerSearch.prototype._removeCurrentUrl = function (links) {
        links.some(function (link, index) {
            var currentPageUrl = "" + window.location.origin + window.location.pathname;
            if (currentPageUrl === link.url) {
                links.splice(index, 1);
                return true;
            }
        });
    };
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["autobind"]
    ], PagePickerSearch.prototype, "renderSuggestions", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["autobind"]
    ], PagePickerSearch.prototype, "_handleSearchInputChanged", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["autobind"]
    ], PagePickerSearch.prototype, "_handleSuggestionSelect", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["autobind"]
    ], PagePickerSearch.prototype, "_renderSearchPageSuggestions", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["autobind"]
    ], PagePickerSearch.prototype, "_renderRecentPageSuggestions", null);
    return PagePickerSearch;
}(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["BaseComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (PagePickerSearch);


/***/ }),

/***/ "JB+B":
/*!***********************************************!*\
  !*** ./lib/copied/screenReaderAlert/index.js ***!
  \***********************************************/
/*! exports provided: ScreenReaderAlert, ARIA_LIVE_MAPPING, defaultScreenReaderAlertProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ScreenReaderAlert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ScreenReaderAlert */ "ANju");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenReaderAlert", function() { return _ScreenReaderAlert__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _ScreenReaderAlertProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ScreenReaderAlertProps */ "RiH3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ARIA_LIVE_MAPPING", function() { return _ScreenReaderAlertProps__WEBPACK_IMPORTED_MODULE_1__["ARIA_LIVE_MAPPING"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultScreenReaderAlertProps", function() { return _ScreenReaderAlertProps__WEBPACK_IMPORTED_MODULE_1__["defaultScreenReaderAlertProps"]; });





/***/ }),

/***/ "MrDM":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/copied/screenReaderAlert/ScreenReaderAlert.module.css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".screenReaderAlert_ec010a4f{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}", ""]);



/***/ }),

/***/ "OFYg":
/*!***************************************************!*\
  !*** ./lib/dataProviders/MockLinkDataProvider.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ILinkDataProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ILinkDataProvider */ "C6Tv");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */


var MockLinkDataProvider = /** @class */ (function () {
    function MockLinkDataProvider() {
    }
    MockLinkDataProvider.prototype.getPageLinksByTitle = function (userInput) {
        var fakeLinks = [];
        for (var i = 0; i < 10; i++) {
            fakeLinks.push({
                id: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].newGuid(),
                isSearchResult: Boolean(i % 2),
                lastEditor: 'Yusong Liu',
                lastModifiedDate: '4/27/2017',
                shouldOpenInNewTab: true,
                title: "fake text " + i,
                url: "https://fakeurl" + i + ".test"
            });
        }
        return Promise.resolve(fakeLinks);
    };
    MockLinkDataProvider.prototype.getRecentPageLinks = function () {
        var fakeLinks = [];
        for (var i = 0; i < _ILinkDataProvider__WEBPACK_IMPORTED_MODULE_1__["RECENT_PAGES_LIMIT"]; i++) {
            fakeLinks.push({
                id: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].newGuid(),
                isSearchResult: Boolean(i % 2),
                lastEditor: 'Yusong Liu',
                lastModifiedDate: '4/27/2017',
                shouldOpenInNewTab: true,
                title: "recent fake text " + i,
                url: "https://fakeurl" + i + ".test"
            });
        }
        return Promise.resolve(fakeLinks);
    };
    return MockLinkDataProvider;
}());
/* harmony default export */ __webpack_exports__["default"] = (MockLinkDataProvider);


/***/ }),

/***/ "PD0V":
/*!******************************************************!*\
  !*** ./lib/PagePickerSuggestionsNoResult.module.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PagePickerSuggestionsNoResult.module.css */ "3aqr");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "Pc1x":
/*!***********************************************************************!*\
  !*** ./lib/copied/screenReaderAlert/ScreenReaderAlert.module.scss.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ScreenReaderAlert.module.css */ "6G+p");
var styles = {
    screenReaderAlert: 'screenReaderAlert_ec010a4f'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "RiH3":
/*!****************************************************************!*\
  !*** ./lib/copied/screenReaderAlert/ScreenReaderAlertProps.js ***!
  \****************************************************************/
/*! exports provided: ARIA_LIVE_MAPPING, defaultScreenReaderAlertProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ARIA_LIVE_MAPPING", function() { return ARIA_LIVE_MAPPING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultScreenReaderAlertProps", function() { return defaultScreenReaderAlertProps; });
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */
var ARIA_LIVE_MAPPING = new Map();
ARIA_LIVE_MAPPING.set(1 /* ReadAfterOtherContent */, 'polite');
ARIA_LIVE_MAPPING.set(2 /* ReadImmediately */, 'assertive');
var defaultScreenReaderAlertProps = {
    message: '',
    readingMode: 1 /* ReadAfterOtherContent */,
    indicator: undefined
};


/***/ }),

/***/ "TzC+":
/*!**********************************************!*\
  !*** ./lib/PagePickerSuggestions.module.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PagePickerSuggestions.module.css */ "sD0o");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "Ug7T":
/*!*********************************************!*\
  !*** ./lib/PagePickerSuggestionsRowCell.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loc/Strings.resx */ "qITA");
/* harmony import */ var _PagePickerSuggestions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PagePickerSuggestions */ "dNPk");
/* harmony import */ var _PagePickerSuggestions_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PagePickerSuggestions.module.scss */ "YVB/");
/**
 * @copyright Microsoft Corporation. All rights reserved.
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





var PagePickerSuggestionsRowCell = /** @class */ (function (_super) {
    __extends(PagePickerSuggestionsRowCell, _super);
    function PagePickerSuggestionsRowCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PagePickerSuggestionsRowCell._isCurrentPage = function (itemUrl) {
        var currentPageUrl = "" + window.location.origin + window.location.pathname;
        return currentPageUrl === itemUrl;
    };
    PagePickerSuggestionsRowCell.prototype.render = function () {
        if (this.props.column.fieldName === _PagePickerSuggestions__WEBPACK_IMPORTED_MODULE_3__["TITLE_FIELD_NAME"]) {
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _PagePickerSuggestions_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].suggestionsTitleColumn, title: this.props.item.url },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _PagePickerSuggestions_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].suggestionsTitlePrimaryText },
                    this.props.item[this.props.column.fieldName],
                    PagePickerSuggestionsRowCell._isCurrentPage(this.props.item.url) &&
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: _PagePickerSuggestions_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].currentPage }, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].CurrentPage)),
                this.props.item.isSearchResult &&
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _PagePickerSuggestions_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].suggestionsTitleSecondaryText }, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].PageContentContainsSearchText, this.props.userInput))));
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: _PagePickerSuggestions_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].suggestionsOtherColumn, title: this.props.item[this.props.column.fieldName] }, this.props.item[this.props.column.fieldName]));
        }
    };
    return PagePickerSuggestionsRowCell;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (PagePickerSuggestionsRowCell);


/***/ }),

/***/ "YVB/":
/*!**************************************************!*\
  !*** ./lib/PagePickerSuggestions.module.scss.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PagePickerSuggestions.module.css */ "TzC+");
var styles = {
    suggestions: 'suggestions_e4c3b9b4',
    suggestionsList: 'suggestionsList_e4c3b9b4',
    suggestionsRow: 'suggestionsRow_e4c3b9b4',
    isRowSelected: 'isRowSelected_e4c3b9b4',
    suggestionsHeader: 'suggestionsHeader_e4c3b9b4',
    suggestionsTitleColumn: 'suggestionsTitleColumn_e4c3b9b4',
    suggestionsOtherColumn: 'suggestionsOtherColumn_e4c3b9b4',
    suggestionsTitlePrimaryText: 'suggestionsTitlePrimaryText_e4c3b9b4',
    suggestionsTitleSecondaryText: 'suggestionsTitleSecondaryText_e4c3b9b4',
    currentPage: 'currentPage_e4c3b9b4',
    spinner: 'spinner_e4c3b9b4'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "bjXu":
/*!************************************************!*\
  !*** ./lib/PagePickerComponent.module.scss.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PagePickerComponent.module.css */ "yMNK");
var styles = {
    linkDialogContainer: 'linkDialogContainer_8e3b45f6',
    isCompact: 'isCompact_8e3b45f6',
    unlinkButton: 'unlinkButton_8e3b45f6',
    linkDialogInput: 'linkDialogInput_8e3b45f6',
    searchInput: 'searchInput_8e3b45f6',
    openLinkInNewTabCheckbox: 'openLinkInNewTabCheckbox_8e3b45f6',
    screenReaderOnly: 'screenReaderOnly_8e3b45f6'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "dNPk":
/*!**************************************!*\
  !*** ./lib/PagePickerSuggestions.js ***!
  \**************************************/
/*! exports provided: TITLE_FIELD_NAME, MODIFIED_FIELD_NAME, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TITLE_FIELD_NAME", function() { return TITLE_FIELD_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODIFIED_FIELD_NAME", function() { return MODIFIED_FIELD_NAME; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var office_ui_fabric_react_lib_DetailsList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! office-ui-fabric-react/lib/DetailsList */ "hjiq");
/* harmony import */ var office_ui_fabric_react_lib_utilities_selection_interfaces__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! office-ui-fabric-react/lib/utilities/selection/interfaces */ "lQgf");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loc/Strings.resx */ "qITA");
/* harmony import */ var _PagePickerSuggestions_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PagePickerSuggestions.module.scss */ "YVB/");
/* harmony import */ var _PagePickerSuggestionsNoResult__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PagePickerSuggestionsNoResult */ "e1ov");
/* harmony import */ var _PagePickerSuggestionsRow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PagePickerSuggestionsRow */ "6+Mi");
/* harmony import */ var _PagePickerSuggestionsRowCell__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PagePickerSuggestionsRowCell */ "Ug7T");
/**
 * @copyright Microsoft Corporation. All rights reserved.
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var TITLE_FIELD_NAME = 'title';
var MODIFIED_FIELD_NAME = 'lastModifiedDate';
var PagePickerSuggestions = /** @class */ (function (_super) {
    __extends(PagePickerSuggestions, _super);
    function PagePickerSuggestions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PagePickerSuggestions.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["Label"], null, this.props.label),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _PagePickerSuggestions_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].suggestions, "data-automation-id": 'pagePickerSuggestions' }, this._renderSuggestionsContent())));
    };
    PagePickerSuggestions.prototype._renderSuggestionsContent = function () {
        if (this.props.isLoading) {
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["Spinner"], { className: _PagePickerSuggestions_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].spinner, size: _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["SpinnerSize"].large }));
        }
        else if (!this.props.suggestions || this.props.suggestions.length === 0) {
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_PagePickerSuggestionsNoResult__WEBPACK_IMPORTED_MODULE_7__["default"], null));
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_DetailsList__WEBPACK_IMPORTED_MODULE_2__["DetailsList"], { ariaLabel: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].SuggestionsListAriaLabel, this.props.label), checkboxVisibility: office_ui_fabric_react_lib_DetailsList__WEBPACK_IMPORTED_MODULE_2__["CheckboxVisibility"].hidden, className: _PagePickerSuggestions_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].suggestionsList, columns: PagePickerSuggestions._suggestionsColumns, compact: true, getKey: function (item) { return item.url; }, items: this.props.suggestions, layoutMode: office_ui_fabric_react_lib_DetailsList__WEBPACK_IMPORTED_MODULE_2__["DetailsListLayoutMode"].fixedColumns, onRenderItemColumn: this._renderRowCell, onRenderRow: this._renderRow, selectionMode: office_ui_fabric_react_lib_utilities_selection_interfaces__WEBPACK_IMPORTED_MODULE_3__["SelectionMode"].none }));
        }
    };
    PagePickerSuggestions.prototype._renderRow = function (props) {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_PagePickerSuggestionsRow__WEBPACK_IMPORTED_MODULE_8__["default"], { detailsRowProps: props, onSelect: this.props.onSuggestionSelect }));
    };
    PagePickerSuggestions.prototype._renderRowCell = function (item, index, column) {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_PagePickerSuggestionsRowCell__WEBPACK_IMPORTED_MODULE_9__["default"], { item: item, index: index, column: column, userInput: this.props.userInput }));
    };
    PagePickerSuggestions._suggestionsColumns = [
        {
            columnActionsMode: office_ui_fabric_react_lib_DetailsList__WEBPACK_IMPORTED_MODULE_2__["ColumnActionsMode"].disabled,
            fieldName: TITLE_FIELD_NAME,
            headerClassName: _PagePickerSuggestions_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].suggestionsHeader,
            isResizable: true,
            key: TITLE_FIELD_NAME,
            minWidth: 320,
            name: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].TitleSuggestionsColumnName
        },
        {
            columnActionsMode: office_ui_fabric_react_lib_DetailsList__WEBPACK_IMPORTED_MODULE_2__["ColumnActionsMode"].disabled,
            fieldName: MODIFIED_FIELD_NAME,
            headerClassName: _PagePickerSuggestions_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].suggestionsHeader,
            isResizable: true,
            key: MODIFIED_FIELD_NAME,
            minWidth: 90,
            name: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].ModifiedSuggestionsColumnName
        }
    ];
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], PagePickerSuggestions.prototype, "_renderSuggestionsContent", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], PagePickerSuggestions.prototype, "_renderRow", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], PagePickerSuggestions.prototype, "_renderRowCell", null);
    return PagePickerSuggestions;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (PagePickerSuggestions);


/***/ }),

/***/ "e1ov":
/*!**********************************************!*\
  !*** ./lib/PagePickerSuggestionsNoResult.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PagePickerSuggestionsNoResult; });
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loc/Strings.resx */ "qITA");
/* harmony import */ var _PagePickerSuggestionsNoResult_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PagePickerSuggestionsNoResult.module.scss */ "kyVz");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */




function PagePickerSuggestionsNoResult() {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _PagePickerSuggestionsNoResult_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].noResultFoundContainer },
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["Icon"], { iconName: 'Search', className: _PagePickerSuggestionsNoResult_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].noResultFoundIcon }),
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _PagePickerSuggestionsNoResult_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].noResultFoundLabelContainer },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _PagePickerSuggestionsNoResult_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].noResultLabel }, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].NoResultLabel),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _PagePickerSuggestionsNoResult_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tryAgainLabel }, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_2__["default"].TryAgainLabel))));
}


/***/ }),

/***/ "kyVz":
/*!**********************************************************!*\
  !*** ./lib/PagePickerSuggestionsNoResult.module.scss.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PagePickerSuggestionsNoResult.module.css */ "PD0V");
var styles = {
    noResultFoundContainer: 'noResultFoundContainer_3378467c',
    noResultFoundIcon: 'noResultFoundIcon_3378467c',
    noResultFoundLabelContainer: 'noResultFoundLabelContainer_3378467c',
    noResultLabel: 'noResultLabel_3378467c',
    tryAgainLabel: 'tryAgainLabel_3378467c'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "pWhw":
/*!************************************!*\
  !*** ./lib/PagePickerComponent.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react_lib_components_Checkbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Checkbox */ "O9ES");
/* harmony import */ var office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Dialog */ "glo3");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/KillSwitches */ "+ORw");
/* harmony import */ var _copied_screenReaderAlert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./copied/screenReaderAlert */ "JB+B");
/* harmony import */ var _PagePickerSearch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PagePickerSearch */ "ItMH");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./loc/Strings.resx */ "qITA");
/* harmony import */ var _PagePickerComponent_module_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PagePickerComponent.module.scss */ "bjXu");
/**
 * @copyright Microsoft Corporation. All rights reserved.
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var VALIDATE_URL_DELAY_IN_MILLISECONDS = 1000;
var DEFAULT_URL = 'https://';
var NOT_EMPTY_REG_EXP = /\S/;
var URL_REG_EXP = !_common_KillSwitches__WEBPACK_IMPORTED_MODULE_6__["default"].isTelSupportKillSwitchActivated()
    // tslint:disable-next-line:max-line-length
    ? new RegExp('((^https?:\/\/)|(^ftp:\/\/)|(^file:\/\/)|(^mailto:)|(^tel:)|(^news:)|(^pnm:\/\/)|(^mms:\/\/)|(^\/)|(^#)|(^\\\\)).+', 'i')
    // tslint:disable-next-line:max-line-length
    : new RegExp('((^https?:\/\/)|(^ftp:\/\/)|(^file:\/\/)|(^mailto:)|(^news:)|(^pnm:\/\/)|(^mms:\/\/)|(^\/)|(^#)|(^\\\\)).+', 'i');
var PagePickerComponent = /** @class */ (function (_super) {
    __extends(PagePickerComponent, _super);
    function PagePickerComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isEditing: false,
            isJustOpened: true,
            isOpen: false,
            isTitleUserInput: false,
            linkTitle: '',
            linkUrl: '',
            shouldOpenLinkInNewTab: false,
            urlTextFieldError: ''
        };
        _this._dialogAriaDescriptionId = "page-picker-description-" + Math.random().toString();
        _this._validateUrl =
            _this._async.debounce(_this._validateUrl, VALIDATE_URL_DELAY_IN_MILLISECONDS);
        // @todo #404392 autobind fail in unit test in Phantomjs
        _this._handleSave = _this._handleSave.bind(_this);
        _this._handleCancel = _this._handleCancel.bind(_this);
        _this._handleUnlink = _this._handleUnlink.bind(_this);
        return _this;
    }
    PagePickerComponent._getUrlErrorMessage = function (url) {
        return !URL_REG_EXP.test(url) ? _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].UrlTextFieldError : '';
    };
    PagePickerComponent._getContentStyles = function () {
        return {
            content: {
                width: '100%' // Override width since we use display: flex outside.
            }
        };
    };
    PagePickerComponent.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (!prevState.isOpen && this.state.isOpen) {
            this._getFocusBackFromCKEditor();
        }
    };
    PagePickerComponent.prototype.render = function () {
        var _a;
        var containerClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["css"])(_PagePickerComponent_module_scss__WEBPACK_IMPORTED_MODULE_10__["default"].linkDialogContainer, (_a = {},
            _a[_PagePickerComponent_module_scss__WEBPACK_IMPORTED_MODULE_10__["default"].isCompact] = this.props.compact,
            _a));
        var isSaveButtonDisabled = !URL_REG_EXP.test(this.state.linkUrl);
        var subtitleAriaId = !this.props.compact ? this._dialogAriaDescriptionId : '';
        var screenReaderAlert = '';
        if (!this.state.isJustOpened) {
            screenReaderAlert = isSaveButtonDisabled
                ? _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].SaveButtonDisabledScreenReaderAlert
                : _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].SaveButtonEnabledScreenReaderAlert;
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_2__["Dialog"], { dialogContentProps: {
                title: this.props.title || _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].DialogTitle,
                type: office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_2__["DialogType"].normal,
                styles: PagePickerComponent._getContentStyles
            }, hidden: !this.state.isOpen, modalProps: {
                containerClassName: containerClassName,
                isBlocking: true,
                subtitleAriaId: subtitleAriaId
            }, onDismiss: this._handleCancel, elementToFocusOnDismiss: this.props.elementToFocusOnDismiss },
            subtitleAriaId &&
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _PagePickerComponent_module_scss__WEBPACK_IMPORTED_MODULE_10__["default"].screenReaderOnly, id: subtitleAriaId }, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].DialogAriaDescription),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_copied_screenReaderAlert__WEBPACK_IMPORTED_MODULE_7__["ScreenReaderAlert"], { message: screenReaderAlert }),
            !this.props.isMixedRealityMode &&
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["TextField"], { ariaLabel: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].UrlTextFieldAriaLabel, className: _PagePickerComponent_module_scss__WEBPACK_IMPORTED_MODULE_10__["default"].linkDialogInput, componentRef: this._resolveRef('_urlTextField'), "data-automation-id": 'pagePickerUrlTextField', errorMessage: !this.state.isJustOpened ? this.state.urlTextFieldError : '', label: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].UrlTextFieldLabel, onChange: this._handleLinkUrlChanged, onKeyDown: this._handleKeyDown, placeholder: DEFAULT_URL, value: this.state.linkUrl }),
            !this.props.isMixedRealityMode &&
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["TextField"], { className: _PagePickerComponent_module_scss__WEBPACK_IMPORTED_MODULE_10__["default"].linkDialogInput, "data-automation-id": 'pagePickerTitleTextField', label: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].TitleTextFieldLabel, onChange: this._handleLinkTitleChanged, onKeyDown: this._handleKeyDown, value: this.state.linkTitle }),
            !this.props.compact &&
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_PagePickerSearch__WEBPACK_IMPORTED_MODULE_8__["default"], { isMixedRealityMode: this.props.isMixedRealityMode, serviceScope: this.props.serviceScope, qosPrefix: this.props.qosPrefix, onSuggestionSelect: this._handleSuggestionSelect, defaultQuery: this._getDefaultSearchQuery() }),
            !this.props.isMixedRealityMode && !this.props.compact &&
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_components_Checkbox__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], { "data-automation-id": 'pagePickerOpenLinkInNewTabCheckbox', checked: this.state.shouldOpenLinkInNewTab, className: _PagePickerComponent_module_scss__WEBPACK_IMPORTED_MODULE_10__["default"].openLinkInNewTabCheckbox, label: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].OpenLinkInNewTabLabel, onChange: this._handleCheckBoxChange }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_2__["DialogFooter"], null,
                this.state.isEditing &&
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["Link"], { className: _PagePickerComponent_module_scss__WEBPACK_IMPORTED_MODULE_10__["default"].unlinkButton, "data-automation-id": 'pagePickerUnlinkButton', onClick: this._handleUnlink }, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].UnlinkButtonLabel),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["PrimaryButton"], { "data-automation-id": 'pagePickerSaveButton', disabled: isSaveButtonDisabled, onClick: this._handleSave, text: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].SaveButtonLabel }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["DefaultButton"], { "data-automation-id": 'pagePickerCancelButton', onClick: this._handleCancel, text: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].CancelButtonLabel }))));
    };
    PagePickerComponent.prototype.open = function (link) {
        var isEditing = Boolean(link && link.title && link.url);
        var isTitleUserInput = Boolean(link && link.title);
        var absoluteUrl = '';
        if (link && link.url) {
            // We only support absolute URL in page picker.
            // If we got a server relative URL, we convert it to absolute URL.
            if (link.url[0] === '/') {
                absoluteUrl = window.location.protocol + "//" + window.location.host + link.url;
            }
            else {
                absoluteUrl = link.url;
            }
        }
        this.setState({
            isEditing: isEditing,
            isOpen: true,
            linkTitle: link ? link.title : '',
            linkUrl: absoluteUrl,
            isTitleUserInput: isTitleUserInput,
            isJustOpened: true,
            shouldOpenLinkInNewTab: link ? link.shouldOpenInNewTab : false,
            urlTextFieldError: PagePickerComponent._getUrlErrorMessage(absoluteUrl)
        });
    };
    PagePickerComponent.prototype.close = function () {
        this.setState({
            isOpen: false
        });
    };
    PagePickerComponent.prototype._handleSuggestionSelect = function (link) {
        this.setState(function (prevState) {
            var newState = {
                isJustOpened: false,
                linkUrl: link.url,
                urlTextFieldError: PagePickerComponent._getUrlErrorMessage(link.url)
            };
            if (!prevState.isTitleUserInput) {
                newState.linkTitle = link.title;
            }
            return newState;
        });
        _copied_screenReaderAlert__WEBPACK_IMPORTED_MODULE_7__["ScreenReaderAlert"].read(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_9__["default"].PageIsSelectedScreenReaderAlert, link.title));
    };
    PagePickerComponent.prototype._handleSave = function () {
        this.close();
        this.props.onSelect({
            title: NOT_EMPTY_REG_EXP.test(this.state.linkTitle) ? this.state.linkTitle : this.state.linkUrl,
            url: this.state.linkUrl,
            shouldOpenInNewTab: this.state.shouldOpenLinkInNewTab
        });
    };
    PagePickerComponent.prototype._handleCancel = function () {
        this.close();
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    };
    PagePickerComponent.prototype._handleUnlink = function () {
        this.close();
        if (this.props.onUnlink) {
            this.props.onUnlink();
        }
    };
    PagePickerComponent.prototype._handleKeyDown = function (event) {
        var _this = this;
        if (event.key === 'Enter' && URL_REG_EXP.test(this.state.linkUrl)) {
            this._async.setTimeout(function () {
                _this._handleSave();
            }, 0);
        }
    };
    PagePickerComponent.prototype._handleLinkUrlChanged = function (event, userInput) {
        this.setState(function (prevState) {
            var newState = {
                isJustOpened: false,
                linkUrl: userInput,
                urlTextFieldError: ''
            };
            // We will automatically change the text to display to match the URL if
            // it's empty or it's not a suggested link title.
            if (!prevState.isTitleUserInput && (!prevState.linkTitle || prevState.linkTitle === prevState.linkUrl)) {
                newState.linkTitle = userInput;
            }
            return newState;
        });
        this._validateUrl();
    };
    PagePickerComponent.prototype._handleLinkTitleChanged = function (event, userInput) {
        this.setState({
            isTitleUserInput: userInput !== '',
            linkTitle: userInput
        });
    };
    PagePickerComponent.prototype._handleCheckBoxChange = function (event, value) {
        this.setState({
            shouldOpenLinkInNewTab: value
        });
    };
    PagePickerComponent.prototype._getFocusBackFromCKEditor = function () {
        var _this = this;
        // Copied from sp-client/libraries/sp-canvas/src/sp-rte/formattingbar/SPRteLinkDialog.tsx
        // We need to add a timeout here because there is some kind of race condition with
        // some event handler for CK editor. The focus gets stolen if we focus too early.
        this._async.setTimeout(function () {
            if (_this._urlTextField) {
                _this._urlTextField.select();
                if (_this._urlTextField.value) {
                    _this._urlTextField.setSelectionStart(_this._urlTextField.value.length);
                    _this._urlTextField.setSelectionEnd(_this._urlTextField.value.length);
                }
                _this._urlTextField.focus();
            }
        }, 300);
    };
    PagePickerComponent.prototype._validateUrl = function () {
        this.setState(function (prevState) {
            var linkUrl = prevState.linkUrl;
            var uri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_5__["Uri"](prevState.linkUrl);
            var scheme = uri.getScheme();
            if (linkUrl && !scheme && !URL_REG_EXP.test(linkUrl)) {
                linkUrl = "" + DEFAULT_URL + linkUrl;
            }
            return {
                linkUrl: linkUrl,
                urlTextFieldError: PagePickerComponent._getUrlErrorMessage(linkUrl)
            };
        });
    };
    PagePickerComponent.prototype._getDefaultSearchQuery = function () {
        var _a = this.state, linkUrl = _a.linkUrl, linkTitle = _a.linkTitle;
        return NOT_EMPTY_REG_EXP.test(linkTitle)
            && (linkUrl === '' || linkUrl === DEFAULT_URL)
            ? linkTitle
            : '';
    };
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], PagePickerComponent.prototype, "open", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], PagePickerComponent.prototype, "close", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], PagePickerComponent.prototype, "_handleSuggestionSelect", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], PagePickerComponent.prototype, "_handleKeyDown", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], PagePickerComponent.prototype, "_handleLinkUrlChanged", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], PagePickerComponent.prototype, "_handleLinkTitleChanged", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], PagePickerComponent.prototype, "_handleCheckBoxChange", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], PagePickerComponent.prototype, "_getFocusBackFromCKEditor", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["autobind"]
    ], PagePickerComponent.prototype, "_validateUrl", null);
    return PagePickerComponent;
}(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["BaseComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (PagePickerComponent);


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

/***/ "sD0o":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/PagePickerSuggestions.module.css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".suggestions_e4c3b9b4{height:200px;border:1px solid \"[theme:neutraltertiary, default: #a19f9d]\";overflow:auto}.suggestions_e4c3b9b4:hover{border-color:\"[theme:neutralDark, default: #201f1e]\"}.suggestions_e4c3b9b4 .suggestionsList_e4c3b9b4{overflow:visible}.suggestionsRow_e4c3b9b4{cursor:pointer}.suggestionsRow_e4c3b9b4.isRowSelected_e4c3b9b4 .ms-DetailsRow{background-color:\"[theme:neutralLight, default: #edebe9]\"}.suggestionsHeader_e4c3b9b4,.suggestionsTitleColumn_e4c3b9b4{font-size:14px;color:\"[theme:neutralPrimary, default: #323130]\"}.suggestionsOtherColumn_e4c3b9b4{font-size:14px;color:\"[theme:neutralSecondary, default: #605e5c]\"}.suggestionsTitlePrimaryText_e4c3b9b4{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;padding-bottom:4px}.suggestionsTitleSecondaryText_e4c3b9b4{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;color:\"[theme:neutralTertiary, default: #a19f9d]\";font-size:12px}.currentPage_e4c3b9b4{font-size:12px}[dir=ltr] .currentPage_e4c3b9b4{padding-left:10px}[dir=rtl] .currentPage_e4c3b9b4{padding-right:10px}.spinner_e4c3b9b4{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;overflow:hidden}", ""]);



/***/ }),

/***/ "yMNK":
/*!********************************************!*\
  !*** ./lib/PagePickerComponent.module.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PagePickerComponent.module.css */ "DsTs");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ })

}]);
//# sourceMappingURL=chunk.page-picker-component_bfb64b9159e86e7599cf.js.map