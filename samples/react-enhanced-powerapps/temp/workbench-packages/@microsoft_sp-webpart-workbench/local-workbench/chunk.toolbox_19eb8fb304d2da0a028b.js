(window["webpackJsonp_5388ac31_7915_4ba6_a021_0f8808dd5784_0_0_1"] = window["webpackJsonp_5388ac31_7915_4ba6_a021_0f8808dd5784_0_0_1"] || []).push([["toolbox"],{

/***/ "+ium":
/*!*********************************************!*\
  !*** ./lib/toolboxItem/ToolboxItemLarge.js ***!
  \*********************************************/
/*! exports provided: ToolboxItemLarge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxItemLarge", function() { return ToolboxItemLarge; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ToolboxItemBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToolboxItemBase */ "+FXA");
/* harmony import */ var _ToolboxItemLarge_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ToolboxItemLarge.module.scss */ "x0iz");




function ToolboxItemLarge(props) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ToolboxItemBase__WEBPACK_IMPORTED_MODULE_2__["ToolboxItemBase"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props, { titleLineCount: 3, itemClassName: _ToolboxItemLarge_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].item, itemStyles: { height: 128 }, flexBoxClassName: _ToolboxItemLarge_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].flexBox, iconClassName: _ToolboxItemLarge_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].icon, titleClassName: _ToolboxItemLarge_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].title, "data-item-size": 'large' })));
}


/***/ }),

/***/ "00Tc":
/*!***************************************************!*\
  !*** ./lib/toolboxGroup/ToolboxGroupUtilities.js ***!
  \***************************************************/
/*! exports provided: categorizeGroups, categorizeGroupsForTopicPage, getFeaturedGroup, getAlphabeticalGroup, getTopicGroup, getSectionGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "categorizeGroups", function() { return categorizeGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "categorizeGroupsForTopicPage", function() { return categorizeGroupsForTopicPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFeaturedGroup", function() { return getFeaturedGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAlphabeticalGroup", function() { return getAlphabeticalGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTopicGroup", function() { return getTopicGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSectionGroup", function() { return getSectionGroup; });
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _toolboxData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toolboxData */ "b6WH");


var PREDEFINED_GROUP_IDS = new Set(_toolboxData__WEBPACK_IMPORTED_MODULE_1__["Group"].PREDEFINED_GROUPS.map(function (_a) {
    var id = _a[0];
    return id;
}));
function categorizeGroups(items, featuredIds) {
    // @todo #461149: Leverage item.isInternal to enforce third-party connector web parts to others category.
    var groups = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_0__["groupBy"])(items, function (item) { return PREDEFINED_GROUP_IDS.has(item.groupId) ? item.groupId : _toolboxData__WEBPACK_IMPORTED_MODULE_1__["Group"].OTHER_GROUP[0]; });
    var result = _toolboxData__WEBPACK_IMPORTED_MODULE_1__["Group"].PREDEFINED_GROUPS
        .map(function (_a) {
        var groupId = _a[0], title = _a[1];
        return ({
            title: title,
            groupId: groupId,
            items: groups[groupId] || []
        });
    })
        .filter(function (group) { return group.items.length > 0; });
    var featuredGroup = getFeaturedGroup(items, featuredIds);
    return featuredGroup.items.length > 0 ? [featuredGroup].concat(result) : result;
}
function categorizeGroupsForTopicPage(items, topicPageFeaturedIds) {
    var topicGroup = getTopicGroup(items, topicPageFeaturedIds);
    var featuredGroup = getFeaturedGroup(items, topicPageFeaturedIds);
    return featuredGroup.items.length > 0 ? [featuredGroup].concat([topicGroup]) : [topicGroup];
}
function getFeaturedGroup(items, featuredIds) {
    var featuredItems = items
        .filter(function (item) { return featuredIds.indexOf(item.id) > -1; })
        .sort(function (a, b) { return featuredIds.indexOf(a.id) - featuredIds.indexOf(b.id); });
    return {
        title: _toolboxData__WEBPACK_IMPORTED_MODULE_1__["Group"].FEATURED_GROUP[1],
        groupId: _toolboxData__WEBPACK_IMPORTED_MODULE_1__["Group"].FEATURED_GROUP[0],
        items: featuredItems
    };
}
function getAlphabeticalGroup(items, featuredIds) {
    var alphabeticalItems = items.filter(function (item) { return featuredIds.indexOf(item.id) === -1; });
    return {
        title: _toolboxData__WEBPACK_IMPORTED_MODULE_1__["Group"].ALPHABETICAL_GROUP[1],
        groupId: _toolboxData__WEBPACK_IMPORTED_MODULE_1__["Group"].ALPHABETICAL_GROUP[0],
        items: alphabeticalItems
    };
}
function getTopicGroup(items, topicPageFeaturedIds) {
    var topicItems = items.filter(function (item) { return topicPageFeaturedIds.indexOf(item.id) === -1; });
    return {
        title: _toolboxData__WEBPACK_IMPORTED_MODULE_1__["Group"].TOPIC_GROUP[1],
        groupId: _toolboxData__WEBPACK_IMPORTED_MODULE_1__["Group"].TOPIC_GROUP[0],
        items: topicItems
    };
}
function getSectionGroup(items) {
    return {
        title: _toolboxData__WEBPACK_IMPORTED_MODULE_1__["Group"].SECTION_GROUP[1],
        groupId: _toolboxData__WEBPACK_IMPORTED_MODULE_1__["Group"].SECTION_GROUP[0],
        items: items
    };
}


/***/ }),

/***/ "0OY+":
/*!***********************************************************!*\
  !*** ./lib/toolboxGroup/ToolboxGroupLarge.module.scss.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolboxGroupLarge.module.css */ "s7ZS");
var styles = {
    flexGroup: 'flexGroup_de1a8cca',
    grid: 'grid_de1a8cca',
    eightColumnWide: 'eightColumnWide_de1a8cca',
    sevenColumnWide: 'sevenColumnWide_de1a8cca',
    sixColumnWide: 'sixColumnWide_de1a8cca',
    fiveColumnWide: 'fiveColumnWide_de1a8cca',
    fourColumnWide: 'fourColumnWide_de1a8cca'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "1++t":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxChrome/ToolboxChrome.module.css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".chrome_7c8000bf{height:100%;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.chrome_7c8000bf .searchBox_7c8000bf{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;margin-bottom:0;border-width:0;-webkit-box-sizing:border-box;box-sizing:border-box;height:33px;border-bottom:1px solid;border-color:\"[theme:neutrallight, default: #edebe9]\";width:100%}[dir=ltr] .chrome_7c8000bf .searchBox_7c8000bf{padding-right:32px}[dir=rtl] .chrome_7c8000bf .searchBox_7c8000bf{padding-left:32px}.chrome_7c8000bf .searchBox_7c8000bf:hover{border-color:\"[theme:neutralLight, default: #edebe9]\"}.chrome_7c8000bf .farButton_7c8000bf{-webkit-box-sizing:border-box;box-sizing:border-box;width:32px;height:32px;position:absolute;top:0}[dir=ltr] .chrome_7c8000bf .farButton_7c8000bf{right:0}[dir=rtl] .chrome_7c8000bf .farButton_7c8000bf{left:0}.chrome_7c8000bf .commandBar_7c8000bf{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.chrome_7c8000bf .content_7c8000bf{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;overflow-y:scroll;height:100%}", ""]);



/***/ }),

/***/ "1Ic1":
/*!***********************************!*\
  !*** ./lib/toolboxError/index.js ***!
  \***********************************/
/*! exports provided: ToolboxError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToolboxErrorAnimationLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToolboxErrorAnimationLayer */ "T4HN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxError", function() { return _ToolboxErrorAnimationLayer__WEBPACK_IMPORTED_MODULE_0__["ToolboxErrorAnimationLayer"]; });




/***/ }),

/***/ "1Ugj":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxSmall/ToolboxSmall.module.css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".noResults_656fc4f3{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;font-size:13px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:13px}.calloutContent_656fc4f3{height:330px}.noTopicResults_656fc4f3{display:inline-block}.noTopicResults_656fc4f3:not(.fluent_656fc4f3){padding:0 12px}.noTopicResults_656fc4f3.fluent_656fc4f3{padding:0 16px}", ""]);



/***/ }),

/***/ "4G67":
/*!******************************************************!*\
  !*** ./lib/toolboxSmall/ToolboxSmall.module.scss.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolboxSmall.module.css */ "AKYj");
var styles = {
    noResults: 'noResults_656fc4f3',
    calloutContent: 'calloutContent_656fc4f3',
    noTopicResults: 'noTopicResults_656fc4f3',
    fluent: 'fluent_656fc4f3'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "5FlS":
/*!***********************************!*\
  !*** ./lib/toolboxGroup/index.js ***!
  \***********************************/
/*! exports provided: ToolboxGroupLarge, ToolboxGroupSmall, ToolboxGroupLargeWithMessage, categorizeGroups, getAlphabeticalGroup, getFeaturedGroup, getSectionGroup, getTopicGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToolboxGroupLarge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToolboxGroupLarge */ "gTvL");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxGroupLarge", function() { return _ToolboxGroupLarge__WEBPACK_IMPORTED_MODULE_0__["ToolboxGroupLarge"]; });

/* harmony import */ var _ToolboxGroupSmall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToolboxGroupSmall */ "sJc3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxGroupSmall", function() { return _ToolboxGroupSmall__WEBPACK_IMPORTED_MODULE_1__["ToolboxGroupSmall"]; });

/* harmony import */ var _ToolboxGroupLargeWithMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToolboxGroupLargeWithMessage */ "SIGF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxGroupLargeWithMessage", function() { return _ToolboxGroupLargeWithMessage__WEBPACK_IMPORTED_MODULE_2__["ToolboxGroupLargeWithMessage"]; });

/* harmony import */ var _ToolboxGroupUtilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ToolboxGroupUtilities */ "00Tc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "categorizeGroups", function() { return _ToolboxGroupUtilities__WEBPACK_IMPORTED_MODULE_3__["categorizeGroups"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAlphabeticalGroup", function() { return _ToolboxGroupUtilities__WEBPACK_IMPORTED_MODULE_3__["getAlphabeticalGroup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFeaturedGroup", function() { return _ToolboxGroupUtilities__WEBPACK_IMPORTED_MODULE_3__["getFeaturedGroup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSectionGroup", function() { return _ToolboxGroupUtilities__WEBPACK_IMPORTED_MODULE_3__["getSectionGroup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTopicGroup", function() { return _ToolboxGroupUtilities__WEBPACK_IMPORTED_MODULE_3__["getTopicGroup"]; });







/***/ }),

/***/ "6eS9":
/*!******************************************!*\
  !*** ./lib/toolboxLarge/ViewCategory.js ***!
  \******************************************/
/*! exports provided: ViewCategory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewCategory", function() { return ViewCategory; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _toolboxData_Group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toolboxData/Group */ "Wako");
/* harmony import */ var _toolboxGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../toolboxGroup */ "5FlS");
/* harmony import */ var _toolboxItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../toolboxItem */ "nKzV");
/* harmony import */ var _ToolboxConstants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ToolboxConstants */ "9dZo");
/* harmony import */ var _ToolboxFlights__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ToolboxFlights */ "r+VS");
/* harmony import */ var _loc_TopicPageToolboxStrings_resx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../loc/TopicPageToolboxStrings.resx */ "FZKA");









var ViewCategory = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ViewCategory, _super);
    function ViewCategory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewCategory.prototype.render = function () {
        var _this = this;
        var groupIndex = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__["findIndex"])(this.props.groups, function (group) { return group.groupId === _this.props.view.groupId; });
        var toolboxGroup = this.props.groups[groupIndex];
        if (toolboxGroup.items.length === 0) {
            if (this._shouldUpdateForTopicPage && toolboxGroup.groupId === _toolboxData_Group__WEBPACK_IMPORTED_MODULE_3__["TOPIC_GROUP"][0]) {
                return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_toolboxGroup__WEBPACK_IMPORTED_MODULE_4__["ToolboxGroupLargeWithMessage"], { groupName: toolboxGroup.title, hasHeader: false, message: _loc_TopicPageToolboxStrings_resx__WEBPACK_IMPORTED_MODULE_8__["default"].EmptyTopicWebParts }));
            }
        }
        var itemViews = toolboxGroup.items
            .map(function (item) {
            return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_toolboxItem__WEBPACK_IMPORTED_MODULE_5__["ToolboxItemLarge"], { key: item.id, item: item, onClick: _this.props.onClickItem });
        });
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_toolboxGroup__WEBPACK_IMPORTED_MODULE_4__["ToolboxGroupLarge"], { groupName: toolboxGroup.title, hasHeader: false }, itemViews));
    };
    Object.defineProperty(ViewCategory.prototype, "_shouldUpdateForTopicPage", {
        get: function () {
            return Object(_ToolboxFlights__WEBPACK_IMPORTED_MODULE_7__["isTopicPageEnabled"])() && this.props.pageLayoutType === _ToolboxConstants__WEBPACK_IMPORTED_MODULE_6__["TOPIC_PAGE_LAYOUT_NAME"];
        },
        enumerable: true,
        configurable: true
    });
    return ViewCategory;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));



/***/ }),

/***/ "7A7I":
/*!******************************************************!*\
  !*** ./lib/toolboxLarge/ToolboxLarge.module.scss.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolboxLarge.module.css */ "o44a");
var styles = {
    toolboxLargeContainer: 'toolboxLargeContainer_99ca968f',
    modalScrollContent: 'modalScrollContent_99ca968f',
    screenReaderAlert: 'screenReaderAlert_99ca968f',
    menuCommandBar: 'menuCommandBar_99ca968f',
    fluent: 'fluent_99ca968f',
    selectedItem: 'selectedItem_99ca968f',
    commandBarButton: 'commandBarButton_99ca968f'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "7yau":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxItem/ToolboxItemSmall.module.css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".item_650b9e1d{width:33.3%;height:88px}.flexBox_650b9e1d{padding:10px 6px 0}.flexBox_650b9e1d>*+*{margin-top:10px}.icon_650b9e1d{width:82px;height:28px;min-height:28px;font-size:28px;line-height:28px}.title_650b9e1d{font-size:12px}", ""]);



/***/ }),

/***/ "84rq":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxLarge/ViewSearch.module.css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".noResultFoundContainer_c69e41a5{height:100%}.noResultFound_c69e41a5{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.noResultFoundIcon_c69e41a5{margin-bottom:18px;font-size:32px}[dir=ltr] .noResultFoundIcon_c69e41a5{margin-right:14px}[dir=rtl] .noResultFoundIcon_c69e41a5{margin-left:14px}.noResultFoundLabelContainer_c69e41a5{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.noResultLabel_c69e41a5{font-size:21px;font-weight:100;margin-bottom:4px}.noResultLabel_c69e41a5,.tryAgainLabel_c69e41a5{color:\"[theme:neutralSecondary, default: #605e5c]\"}.tryAgainLabel_c69e41a5{font-size:17px;font-weight:300}", ""]);



/***/ }),

/***/ "9dZo":
/*!*********************************!*\
  !*** ./lib/ToolboxConstants.js ***!
  \*********************************/
/*! exports provided: TOPIC_PAGE_LAYOUT_NAME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOPIC_PAGE_LAYOUT_NAME", function() { return TOPIC_PAGE_LAYOUT_NAME; });
// tslint:disable-next-line:export-name
var TOPIC_PAGE_LAYOUT_NAME = 'Topic';


/***/ }),

/***/ "A+bi":
/*!****************************************!*\
  !*** ./lib/toolboxLarge/ViewSearch.js ***!
  \****************************************/
/*! exports provided: ViewSearch, EmptySearchResultComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewSearch", function() { return ViewSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmptySearchResultComponent", function() { return EmptySearchResultComponent; });
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _toolboxGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toolboxGroup */ "5FlS");
/* harmony import */ var _toolboxItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toolboxItem */ "nKzV");
/* harmony import */ var _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ToolboxLargeStrings.resx */ "gKQq");
/* harmony import */ var _ViewSearch_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ViewSearch.module.scss */ "OKAE");






function ViewSearch(props) {
    if (props.items.length === 0) {
        // Work around to use an empty group to hold the space when search filters out no items.
        // Pending on @todo VSO#414796 for the final search experience.
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _ViewSearch_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].noResultFoundContainer },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_toolboxGroup__WEBPACK_IMPORTED_MODULE_2__["ToolboxGroupLarge"], { groupName: 'empty', hasHeader: false, key: 'toolboxGroup-empty' }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](EmptySearchResultComponent, null)));
    }
    var itemViews = props.items
        .map(function (item) {
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_toolboxItem__WEBPACK_IMPORTED_MODULE_3__["ToolboxItemLarge"], { key: item.id, item: item, onClick: props.onClickItem });
    });
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_toolboxGroup__WEBPACK_IMPORTED_MODULE_2__["ToolboxGroupLarge"], { groupName: _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_4__["default"].ToolboxCategorySearchResults, hasHeader: false }, itemViews));
}
function EmptySearchResultComponent() {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _ViewSearch_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].noResultFound },
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["Icon"], { iconName: 'Search', className: _ViewSearch_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].noResultFoundIcon }),
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _ViewSearch_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].noResultFoundLabelContainer },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _ViewSearch_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].noResultLabel }, _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_4__["default"].NoResultLabel),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _ViewSearch_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tryAgainLabel }, _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_4__["default"].TryAgainLabel))));
}


/***/ }),

/***/ "AFEX":
/*!************************************!*\
  !*** ./lib/ToolboxKillSwitches.js ***!
  \************************************/
/*! exports provided: isToolboxSupportTopicPageKillSwitchActivated */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isToolboxSupportTopicPageKillSwitchActivated", function() { return isToolboxSupportTopicPageKillSwitchActivated; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/**
* @copyright Microsoft Corporation. All rights reserved.
*/

// tslint:disable-next-line:export-name
function isToolboxSupportTopicPageKillSwitchActivated() {
    return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('56e04eac-3e3f-4426-87bb-1fa0ec359a7c'), '10/17/2019', 'SOX_TopicPageForToolbox');
}


/***/ }),

/***/ "AKYj":
/*!**************************************************!*\
  !*** ./lib/toolboxSmall/ToolboxSmall.module.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolboxSmall.module.css */ "1Ugj");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "AgJP":
/*!**************************************************************!*\
  !*** ./lib/toolboxSection/ToolboxSectionCore.module.scss.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolboxSectionCore.module.css */ "SpX9");
var styles = {
    callout: 'callout_3c8b5cde'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "BRq8":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxItem/ToolboxItemLarge.module.css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".item_d73652a8{height:100%;width:100%;border-width:2px}.flexBox_d73652a8{padding:23px 8px 0}.flexBox_d73652a8>*+*{margin-top:8px}.icon_d73652a8{width:82px;height:32px;min-height:32px;font-size:32px;line-height:32px}.title_d73652a8{font-size:14px}", ""]);



/***/ }),

/***/ "C6B0":
/*!******************************************************!*\
  !*** ./lib/toolboxGroup/ToolboxGroupStrings.resx.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_2TT4IG31kAjRqhD0h5kPOg';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "C6wz":
/*!****************************************************!*\
  !*** ./lib/toolboxChrome/ToolboxChrome.module.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolboxChrome.module.css */ "1++t");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "C9I6":
/*!***********************************!*\
  !*** ./lib/toolboxLarge/index.js ***!
  \***********************************/
/*! exports provided: ToolboxLarge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToolboxLargeAnimationLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToolboxLargeAnimationLayer */ "MRk2");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxLarge", function() { return _ToolboxLargeAnimationLayer__WEBPACK_IMPORTED_MODULE_0__["ToolboxLargeAnimationLayer"]; });




/***/ }),

/***/ "CUwB":
/*!*****************************************************!*\
  !*** ./lib/toolboxItem/ToolboxItemLarge.module.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolboxItemLarge.module.css */ "BRq8");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "FSMX":
/*!**************************************************!*\
  !*** ./lib/toolboxError/ToolboxError.module.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolboxError.module.css */ "XSkU");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "FZKA":
/*!*************************************************!*\
  !*** ./lib/loc/TopicPageToolboxStrings.resx.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_zDS3cQTDcaCVKAjHsvuOzg';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "GqUw":
/*!******************************************!*\
  !*** ./lib/toolbox/ToolboxItemsLayer.js ***!
  \******************************************/
/*! exports provided: ToolboxItemsLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxItemsLayer", function() { return ToolboxItemsLayer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _toolboxError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toolboxError */ "1Ic1");
/* harmony import */ var _toolboxGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../toolboxGroup */ "5FlS");
/* harmony import */ var _toolboxGroup_ToolboxGroupUtilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../toolboxGroup/ToolboxGroupUtilities */ "00Tc");
/* harmony import */ var _toolboxLoading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../toolboxLoading */ "NpD7");
/* harmony import */ var _ToolboxConstants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ToolboxConstants */ "9dZo");
/* harmony import */ var _ToolboxFlights__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ToolboxFlights */ "r+VS");
/* harmony import */ var _ToolboxProviderLayer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ToolboxProviderLayer */ "ntxq");










/**
 * The toolbox items layer to dispatch the state of load the items.
 *
 * - If the items are not loaded, show ToolboxLoading.
 * - If the items are failed to load, show ToolboxError.
 * - If the items are loaded successfully, show Toolbox.
 */
var ToolboxItemsLayer = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToolboxItemsLayer, _super);
    function ToolboxItemsLayer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = _this._getState(props.items);
        return _this;
    }
    ToolboxItemsLayer.prototype.componentDidMount = function () {
        this._markStageToolboxRenderEnd();
    };
    ToolboxItemsLayer.prototype.componentDidUpdate = function () {
        this._markStageToolboxRenderEnd();
    };
    ToolboxItemsLayer.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.items !== this.props.items) {
            this.setState(this._getState(nextProps.items));
        }
    };
    ToolboxItemsLayer.prototype.render = function () {
        var items = this.state.items;
        if (items === undefined) {
            return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_toolboxLoading__WEBPACK_IMPORTED_MODULE_6__["ToolboxLoading"], { className: '', controller: this.props.controller, calloutTarget: this.props.calloutTarget, calloutDirectionalHint: this.props.calloutDirectionalHint, onDismiss: this.props.onDismiss }));
        }
        else if (Array.isArray(items)) {
            var groups = Object(_ToolboxFlights__WEBPACK_IMPORTED_MODULE_8__["isTopicPageEnabled"])() && this.props.pageLayoutType === _ToolboxConstants__WEBPACK_IMPORTED_MODULE_7__["TOPIC_PAGE_LAYOUT_NAME"]
                ? Object(_toolboxGroup_ToolboxGroupUtilities__WEBPACK_IMPORTED_MODULE_5__["categorizeGroupsForTopicPage"])(items, this.props.featuredIds)
                : Object(_toolboxGroup__WEBPACK_IMPORTED_MODULE_4__["categorizeGroups"])(items, this.props.featuredIds);
            return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_ToolboxProviderLayer__WEBPACK_IMPORTED_MODULE_9__["ToolboxProviderLayer"], { controller: this.props.controller, items: items, groups: groups, a11yManager: this.props.a11yManager, onCloseToolbox: this.props.onCloseToolbox, calloutTarget: this.props.calloutTarget, calloutDirectionalHint: this.props.calloutDirectionalHint, onDismiss: this.props.onDismiss, onClickItem: this._clickItem, featuredIds: this.props.featuredIds, pageLayoutType: this.props.pageLayoutType }));
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_toolboxError__WEBPACK_IMPORTED_MODULE_3__["ToolboxError"], { className: '', controller: this.props.controller, message: items.message, a11yManager: this.props.a11yManager, calloutTarget: this.props.calloutTarget, calloutDirectionalHint: this.props.calloutDirectionalHint, onDismiss: this.props.onDismiss }));
        }
    };
    ToolboxItemsLayer.prototype._getState = function (items) {
        var _this = this;
        if (Array.isArray(items)) {
            var sortedItems = items
                .sort(function (a, b) { return a.displayName.localeCompare(b.displayName, _this.props.cultureName); });
            return {
                items: sortedItems,
                mapToolboxItemIdToData: new Map(sortedItems.map(function (map) { return [map.id, map.itemData]; }))
            };
        }
        else {
            return {
                items: items,
                mapToolboxItemIdToData: undefined
            };
        }
    };
    ToolboxItemsLayer.prototype._clickItem = function (toolboxItemId, info) {
        if (!this.state.mapToolboxItemIdToData) {
            // The `props.items` is not available yet, how does click item action come from?
            return;
        }
        var data = this.state.mapToolboxItemIdToData.get(toolboxItemId);
        if (!data) {
            // It is clicking on an non-existing toolbox item. How does it happen?
            return;
        }
        // The canvas is modifying the original object. We need to clone the control here.
        // This could be finally fixed after leverage item ID in toolbox click handler.
        this.props.onClickItem(data, info);
        // Close the toolbox after handling the click item logics.
        this.props.onCloseToolbox();
    };
    ToolboxItemsLayer.prototype._markStageToolboxRenderEnd = function () {
        if (this.props.componentPerfLogger && this.state.items !== undefined) {
            this.props.componentPerfLogger.end('ToolboxRender');
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], ToolboxItemsLayer.prototype, "_clickItem", null);
    return ToolboxItemsLayer;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));



/***/ }),

/***/ "LcaF":
/*!**************************************!*\
  !*** ./lib/toolboxLarge/ViewHome.js ***!
  \**************************************/
/*! exports provided: ViewHome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewHome", function() { return ViewHome; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _toolboxData_Group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toolboxData/Group */ "Wako");
/* harmony import */ var _toolboxGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toolboxGroup */ "5FlS");
/* harmony import */ var _toolboxItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../toolboxItem */ "nKzV");
/* harmony import */ var _ToolboxConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ToolboxConstants */ "9dZo");
/* harmony import */ var _ToolboxFlights__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ToolboxFlights */ "r+VS");
/* harmony import */ var _loc_TopicPageToolboxStrings_resx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../loc/TopicPageToolboxStrings.resx */ "FZKA");








var ViewHome = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ViewHome, _super);
    function ViewHome() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewHome.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null, this._renderGroups()));
    };
    ViewHome.prototype._renderGroups = function () {
        var _this = this;
        return this.props.groups.map(function (group) {
            if (group.items.length === 0) {
                if (_this._shouldUpdateForTopicPage && group.groupId === _toolboxData_Group__WEBPACK_IMPORTED_MODULE_2__["TOPIC_GROUP"][0]) {
                    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_toolboxGroup__WEBPACK_IMPORTED_MODULE_3__["ToolboxGroupLargeWithMessage"], { groupName: group.title, hasHeader: true, message: _loc_TopicPageToolboxStrings_resx__WEBPACK_IMPORTED_MODULE_7__["default"].EmptyTopicWebParts }));
                }
            }
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_toolboxGroup__WEBPACK_IMPORTED_MODULE_3__["ToolboxGroupLarge"], { groupName: group.title, hasHeader: true, key: group.groupId, onClickSeeAll: function () { return _this._switchToCategoryView(group.groupId); } }, _this._renderItems(group.items)));
        });
    };
    ViewHome.prototype._renderItems = function (items) {
        var _this = this;
        return items.map(function (item) {
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_toolboxItem__WEBPACK_IMPORTED_MODULE_4__["ToolboxItemLarge"], { key: item.id, item: item, onClick: _this.props.onClickItem });
        });
    };
    ViewHome.prototype._switchToCategoryView = function (groupId) {
        this.props.onSwitchView({
            type: "Category" /* Category */,
            groupId: groupId,
            previousView: this.props.view
        });
    };
    Object.defineProperty(ViewHome.prototype, "_shouldUpdateForTopicPage", {
        get: function () {
            return Object(_ToolboxFlights__WEBPACK_IMPORTED_MODULE_6__["isTopicPageEnabled"])() && this.props.pageLayoutType === _ToolboxConstants__WEBPACK_IMPORTED_MODULE_5__["TOPIC_PAGE_LAYOUT_NAME"];
        },
        enumerable: true,
        configurable: true
    });
    return ViewHome;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "LjmC":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxGroup/ToolboxGroupLargeWithMessage.module.css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".noTopicResults_5015de4f{display:inline-block}.noTopicResults_5015de4f:not(.fluent_5015de4f){padding:0 12px}.noTopicResults_5015de4f.fluent_5015de4f{padding:0 16px}", ""]);



/***/ }),

/***/ "MRk2":
/*!********************************************************!*\
  !*** ./lib/toolboxLarge/ToolboxLargeAnimationLayer.js ***!
  \********************************************************/
/*! exports provided: ToolboxLargeAnimationLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxLargeAnimationLayer", function() { return ToolboxLargeAnimationLayer; });
/* harmony import */ var _toolboxAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toolboxAnimation */ "Xs01");
/* harmony import */ var _ToolboxLargeSearchLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToolboxLargeSearchLayer */ "b4B8");


// tslint:disable-next-line:variable-name
var ToolboxLargeAnimationLayer = Object(_toolboxAnimation__WEBPACK_IMPORTED_MODULE_0__["animation"])(_ToolboxLargeSearchLayer__WEBPACK_IMPORTED_MODULE_1__["ToolboxLargeSearchLayer"], 4 /* Large */);


/***/ }),

/***/ "N03I":
/*!**************************************!*\
  !*** ./lib/toolboxLarge/ViewSort.js ***!
  \**************************************/
/*! exports provided: ViewSort */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewSort", function() { return ViewSort; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _toolboxGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toolboxGroup */ "5FlS");
/* harmony import */ var _toolboxItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toolboxItem */ "nKzV");




var ViewSort = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ViewSort, _super);
    function ViewSort() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewSort.prototype.render = function () {
        var _this = this;
        var itemViews = this.props.items
            .map(function (item) {
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_toolboxItem__WEBPACK_IMPORTED_MODULE_3__["ToolboxItemLarge"], { key: item.id, item: item, onClick: _this.props.onClickItem });
        });
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_toolboxGroup__WEBPACK_IMPORTED_MODULE_2__["ToolboxGroupLarge"], { groupName: '', hasHeader: false }, itemViews));
    };
    return ViewSort;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "N3LY":
/*!******************************************************************!*\
  !*** ./lib/toolboxGroup/ToolboxGroupLargeWithMessage.module.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolboxGroupLargeWithMessage.module.css */ "LjmC");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "NB1n":
/*!********************************************************!*\
  !*** ./lib/toolboxChrome/ToolboxChrome.module.scss.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolboxChrome.module.css */ "C6wz");
var styles = {
    chrome: 'chrome_7c8000bf',
    searchBox: 'searchBox_7c8000bf',
    farButton: 'farButton_7c8000bf',
    commandBar: 'commandBar_7c8000bf',
    content: 'content_7c8000bf'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "OKAE":
/*!****************************************************!*\
  !*** ./lib/toolboxLarge/ViewSearch.module.scss.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ViewSearch.module.css */ "SCJu");
var styles = {
    noResultFoundContainer: 'noResultFoundContainer_c69e41a5',
    noResultFound: 'noResultFound_c69e41a5',
    noResultFoundIcon: 'noResultFoundIcon_c69e41a5',
    noResultFoundLabelContainer: 'noResultFoundLabelContainer_c69e41a5',
    noResultLabel: 'noResultLabel_c69e41a5',
    tryAgainLabel: 'tryAgainLabel_c69e41a5'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "PC1Q":
/*!********************************************************!*\
  !*** ./lib/toolboxChrome/ToolboxChromeStrings.resx.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_4SOrKBlkyRLkXWcT6txoow';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "QLFM":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxSection/ToolboxSectionCore.module.css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".callout_3c8b5cde{height:auto}", ""]);



/***/ }),

/***/ "RPhW":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxLarge/ToolboxLarge.module.css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".toolboxLargeContainer_99ca968f{margin:24px;height:712px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.modalScrollContent_99ca968f{height:100%}.screenReaderAlert_99ca968f{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.menuCommandBar_99ca968f .ms-CommandBar{padding:0}.menuCommandBar_99ca968f .ms-CommandBar-primaryCommands{margin:0 4px}.menuCommandBar_99ca968f:not(.fluent_99ca968f){height:40px;background-color:\"[theme:neutralLight, default: #edebe9]\"}.menuCommandBar_99ca968f.fluent_99ca968f{background-color:\"[theme:white, default: #ffffff]\"}.menuCommandBar_99ca968f.fluent_99ca968f .ms-CommandBar{height:60px}.menuCommandBar_99ca968f:not(.fluent_99ca968f) .ms-Button-textContainer{font-size:17px}.menuCommandBar_99ca968f.fluent_99ca968f .ms-Button-textContainer .ms-Button-label{font-size:\"[theme:xLargeFontSize, default: 20px]\";font-weight:\"[theme:xLargeFontWeight, default: 600]\";color:\"[theme:neutralPrimary, default: #323130]\"}.selectedItem_99ca968f{font-weight:600;background-color:\"[theme:neutralLight, default: #edebe9]\"}.commandBarButton_99ca968f{background-color:\"[theme:white, default: #ffffff]\"}", ""]);



/***/ }),

/***/ "SCJu":
/*!************************************************!*\
  !*** ./lib/toolboxLarge/ViewSearch.module.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ViewSearch.module.css */ "84rq");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "SIGF":
/*!**********************************************************!*\
  !*** ./lib/toolboxGroup/ToolboxGroupLargeWithMessage.js ***!
  \**********************************************************/
/*! exports provided: ToolboxGroupLargeWithMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxGroupLargeWithMessage", function() { return ToolboxGroupLargeWithMessage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ToolboxFlights__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ToolboxFlights */ "r+VS");
/* harmony import */ var _ToolboxGroupLarge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ToolboxGroupLarge */ "gTvL");
/* harmony import */ var _ToolboxGroupLargeWithMessage_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ToolboxGroupLargeWithMessage.module.scss */ "kqS2");






var ToolboxGroupLargeWithMessage = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToolboxGroupLargeWithMessage, _super);
    function ToolboxGroupLargeWithMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolboxGroupLargeWithMessage.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ToolboxGroupLarge__WEBPACK_IMPORTED_MODULE_4__["ToolboxGroupLarge"], { groupName: this.props.groupName, hasHeader: this.props.hasHeader }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_ToolboxGroupLargeWithMessage_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].noTopicResults, Object(_ToolboxFlights__WEBPACK_IMPORTED_MODULE_3__["isFluentEnabled"])() && _ToolboxGroupLargeWithMessage_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].fluent) }, this.props.message)));
    };
    return ToolboxGroupLargeWithMessage;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "SISZ":
/*!********************************************!*\
  !*** ./lib/toolboxChrome/ToolboxChrome.js ***!
  \********************************************/
/*! exports provided: ToolboxChrome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxChrome", function() { return ToolboxChrome; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var office_ui_fabric_react_lib_components_SearchBox_SearchBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/SearchBox/SearchBox */ "zrE1");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ToolboxChrome_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ToolboxChrome.module.scss */ "NB1n");
/* harmony import */ var _ToolboxChromeStrings_resx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ToolboxChromeStrings.resx */ "PC1Q");








var ToolboxChrome = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToolboxChrome, _super);
    function ToolboxChrome() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._searchBoxContainer = null; // tslint:disable-line:no-null-keyword
        _this._commandBar = react__WEBPACK_IMPORTED_MODULE_3__["createRef"]();
        return _this;
    }
    ToolboxChrome.prototype.componentDidMount = function () {
        var _this = this;
        if (this._searchBoxContainer) {
            // @todo VSO#425615: Remove hack to move the cursor to the end of input.
            var inputDOMNode = react_dom__WEBPACK_IMPORTED_MODULE_4__["findDOMNode"](this._searchBoxContainer);
            if (inputDOMNode && inputDOMNode instanceof Element) {
                var input = inputDOMNode.querySelector('input');
                if (input) {
                    var valueLength = input.value.length;
                    input.setSelectionRange(valueLength, valueLength);
                }
            }
        }
        // This is a workaround to remeasure the command bar width to avoid collapsed button group.
        // Later, we should consumer the animation context for remeasurement and avoid `setTimeout`.
        setTimeout(function () {
            if (_this._commandBar.current) {
                _this._commandBar.current.remeasure();
            }
        }, 300);
    };
    ToolboxChrome.prototype.render = function () {
        var _this = this;
        var ariaLabel = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_5__["StringHelper"].format(_ToolboxChromeStrings_resx__WEBPACK_IMPORTED_MODULE_7__["default"].ToolboxSearchAccessibleLabelTemplate, this.props.searchQuery ? _ToolboxChromeStrings_resx__WEBPACK_IMPORTED_MODULE_7__["default"].ToolboxSearchEscapeAccessibleLabel : '');
        return (react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(this.props.className, _ToolboxChrome_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].chrome), ref: function (instance) { return _this._searchBoxContainer = instance; } },
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](office_ui_fabric_react_lib_components_SearchBox_SearchBox__WEBPACK_IMPORTED_MODULE_2__["SearchBox"], { ariaLabel: ariaLabel, placeholder: _ToolboxChromeStrings_resx__WEBPACK_IMPORTED_MODULE_7__["default"].ToolboxSearchLabel, onChange: function (event, value) { return _this.props.onChange(value || ''); }, onSearch: this.props.onSearch, onEscape: this._handleEscape, value: this.props.searchQuery, className: _ToolboxChrome_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].searchBox, "data-automation-id": 'toolbox-searchBox' }),
            this._renderCommandBar(),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", { className: _ToolboxChrome_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].content, "data-automation-id": 'spPageCanvasLargeToolboxBody' }, this.props.children),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["IconButton"], { className: _ToolboxChrome_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].farButton, iconProps: this.props.farButton.iconProps, onClick: this.props.farButton.onClick, title: this.props.farButton.title, ariaLabel: this.props.farButton.ariaLabel, ariaDescription: this.props.farButton.ariaDescription, "data-automation-id": 'toolbox-farButton' })));
    };
    ToolboxChrome.prototype._renderCommandBar = function () {
        if (!this.props.commandBar) {
            return null; // tslint:disable-line:no-null-keyword
        }
        return (react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["CommandBar"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props.commandBar, { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(this.props.commandBar.className, _ToolboxChrome_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].commandBar), componentRef: this._commandBar })));
    };
    ToolboxChrome.prototype._handleEscape = function () {
        if (this.props.searchQuery) {
            this.props.onChange('');
        }
        else if (this.props.onEscape) {
            this.props.onEscape();
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], ToolboxChrome.prototype, "_handleEscape", null);
    return ToolboxChrome;
}(react__WEBPACK_IMPORTED_MODULE_3__["PureComponent"]));



/***/ }),

/***/ "SpX9":
/*!**********************************************************!*\
  !*** ./lib/toolboxSection/ToolboxSectionCore.module.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolboxSectionCore.module.css */ "QLFM");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "St2D":
/*!*************************************************!*\
  !*** ./lib/toolboxSection/ToolboxItemsLayer.js ***!
  \*************************************************/
/*! exports provided: ToolboxItemsLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxItemsLayer", function() { return ToolboxItemsLayer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ToolboxSectionCore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ToolboxSectionCore */ "k8VM");




var ToolboxItemsLayer = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToolboxItemsLayer, _super);
    function ToolboxItemsLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolboxItemsLayer.prototype.componentDidMount = function () {
        this._markStageToolboxRenderEnd();
    };
    ToolboxItemsLayer.prototype.componentDidUpdate = function () {
        this._markStageToolboxRenderEnd();
    };
    ToolboxItemsLayer.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_ToolboxSectionCore__WEBPACK_IMPORTED_MODULE_3__["ToolboxSectionCore"], { items: this.props.items, a11yManager: this.props.a11yManager, calloutTarget: this.props.calloutTarget, calloutDirectionalHint: this.props.calloutDirectionalHint, onDismiss: this.props.onDismiss, onCloseToolbox: this.props.onCloseToolbox, onClickItem: this._handleClickItem }));
    };
    ToolboxItemsLayer.prototype._handleClickItem = function (sectionItemId) {
        var clickedItem = this.props.items
            .filter(function (item) { return item.id === sectionItemId; })[0];
        if (!clickedItem) {
            // It is clicking on an non-existing section item. How does it happen?
            return;
        }
        // The canvas is modifying the original object. We need to clone the control here.
        // This could be finally fixed after leverage item ID in toolbox click handler.
        this.props.onClickItem(clickedItem.itemData);
        // Close the toolbox after handling the click item logics.
        this.props.onCloseToolbox();
    };
    ToolboxItemsLayer.prototype._markStageToolboxRenderEnd = function () {
        if (this.props.componentPerfLogger) {
            this.props.componentPerfLogger.end('ToolboxRender');
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], ToolboxItemsLayer.prototype, "_handleClickItem", null);
    return ToolboxItemsLayer;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));



/***/ }),

/***/ "T4HN":
/*!********************************************************!*\
  !*** ./lib/toolboxError/ToolboxErrorAnimationLayer.js ***!
  \********************************************************/
/*! exports provided: ToolboxErrorAnimationLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxErrorAnimationLayer", function() { return ToolboxErrorAnimationLayer; });
/* harmony import */ var _toolboxAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toolboxAnimation */ "Xs01");
/* harmony import */ var _ToolboxError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToolboxError */ "VjZh");


// tslint:disable-next-line:variable-name
var ToolboxErrorAnimationLayer = Object(_toolboxAnimation__WEBPACK_IMPORTED_MODULE_0__["animation"])(_ToolboxError__WEBPACK_IMPORTED_MODULE_1__["ToolboxError"], 2 /* Error */);


/***/ }),

/***/ "TBAh":
/*!*********************************************!*\
  !*** ./lib/toolboxItem/ToolboxItemSmall.js ***!
  \*********************************************/
/*! exports provided: ToolboxItemSmall */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxItemSmall", function() { return ToolboxItemSmall; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ToolboxItemBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToolboxItemBase */ "+FXA");
/* harmony import */ var _ToolboxItemSmall_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ToolboxItemSmall.module.scss */ "ZPLP");




function ToolboxItemSmall(props) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ToolboxItemBase__WEBPACK_IMPORTED_MODULE_2__["ToolboxItemBase"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props, { titleLineCount: 2, itemClassName: _ToolboxItemSmall_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].item, itemStyles: { height: 88 }, flexBoxClassName: _ToolboxItemSmall_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].flexBox, iconClassName: _ToolboxItemSmall_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].icon, titleClassName: _ToolboxItemSmall_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].title, "data-item-size": 'small' })));
}


/***/ }),

/***/ "U6dd":
/*!******************************************!*\
  !*** ./lib/toolboxSmall/ToolboxSmall.js ***!
  \******************************************/
/*! exports provided: ToolboxSmall */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxSmall", function() { return ToolboxSmall; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _toolboxCallout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toolboxCallout */ "GNkg");
/* harmony import */ var _toolboxChrome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../toolboxChrome */ "veAR");
/* harmony import */ var _toolboxData_Group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../toolboxData/Group */ "Wako");
/* harmony import */ var _toolboxGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../toolboxGroup */ "5FlS");
/* harmony import */ var _toolboxItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../toolboxItem */ "nKzV");
/* harmony import */ var _ToolboxConstants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ToolboxConstants */ "9dZo");
/* harmony import */ var _ToolboxFlights__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../ToolboxFlights */ "r+VS");
/* harmony import */ var _loc_TopicPageToolboxStrings_resx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../loc/TopicPageToolboxStrings.resx */ "FZKA");
/* harmony import */ var _ToolboxSmall_module_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ToolboxSmall.module.scss */ "4G67");
/* harmony import */ var _ToolboxSmallStrings_resx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ToolboxSmallStrings.resx */ "guoG");













var ToolboxSmall = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToolboxSmall, _super);
    function ToolboxSmall(props) {
        var _this = _super.call(this, props) || this;
        _this.state = _this._getState(props.items);
        return _this;
    }
    ToolboxSmall.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.items !== this.props.items) {
            this.setState(this._getState(nextProps.items));
        }
    };
    ToolboxSmall.prototype.render = function () {
        var itemsNotFound = (this.state.featuredGroup.items.length === 0 &&
            this.state.mainGroup.items.length === 0);
        var expandButtonProps = {
            ariaLabel: _ToolboxSmallStrings_resx__WEBPACK_IMPORTED_MODULE_12__["default"].ToolboxExpandButtonAriaLabel,
            iconProps: { iconName: 'fullScreen' },
            onClick: this.props.onExpandToolbox,
            title: _ToolboxSmallStrings_resx__WEBPACK_IMPORTED_MODULE_12__["default"].ToolboxExpandButtonTitle
        };
        var toolboxSmallContent = (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_toolboxChrome__WEBPACK_IMPORTED_MODULE_4__["ToolboxChrome"], { onSearch: this.props.onFilter, onChange: this.props.onFilterDebounce, onEscape: this.props.onCloseToolbox, searchQuery: this.props.query, farButton: expandButtonProps, className: _ToolboxSmall_module_scss__WEBPACK_IMPORTED_MODULE_11__["default"].calloutContent },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["FocusZone"], { direction: _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["FocusZoneDirection"].horizontal, isCircularNavigation: true },
                this._renderGroup(this.state.featuredGroup),
                this._renderGroup(this.state.mainGroup),
                itemsNotFound && this._itemsNotFound)));
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_toolboxCallout__WEBPACK_IMPORTED_MODULE_3__["ToolboxCallout"], { onDismiss: this.props.onDismiss, target: this.props.calloutTarget, className: this.props.className, directionalHint: this.props.calloutDirectionalHint }, toolboxSmallContent));
    };
    ToolboxSmall.prototype._renderGroup = function (group) {
        var _this = this;
        if (group.items.length === 0) {
            if (this._shouldUpdateForTopicPage && group.groupId === _toolboxData_Group__WEBPACK_IMPORTED_MODULE_5__["TOPIC_GROUP"][0]) {
                // When search web part in small toolbox, if the result is empty
                // Topic group show nothing
                if (this.props.query && this.props.query !== '') {
                    return false;
                }
                else {
                    return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_toolboxGroup__WEBPACK_IMPORTED_MODULE_6__["ToolboxGroupSmall"], { key: group.groupId, groupName: group.title, hasHeader: true },
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_ToolboxSmall_module_scss__WEBPACK_IMPORTED_MODULE_11__["default"].noTopicResults, Object(_ToolboxFlights__WEBPACK_IMPORTED_MODULE_9__["isFluentEnabled"])() && _ToolboxSmall_module_scss__WEBPACK_IMPORTED_MODULE_11__["default"].fluent) }, _loc_TopicPageToolboxStrings_resx__WEBPACK_IMPORTED_MODULE_10__["default"].EmptyTopicWebParts)));
                }
            }
            return false;
        }
        var items = group.items.map(function (item) {
            return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_toolboxItem__WEBPACK_IMPORTED_MODULE_7__["ToolboxItemSmall"], { key: item.id, item: item, onClick: _this._handleClickItem });
        });
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_toolboxGroup__WEBPACK_IMPORTED_MODULE_6__["ToolboxGroupSmall"], { key: group.groupId, groupName: group.title, hasHeader: true }, items));
    };
    Object.defineProperty(ToolboxSmall.prototype, "_itemsNotFound", {
        get: function () {
            return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", { className: _ToolboxSmall_module_scss__WEBPACK_IMPORTED_MODULE_11__["default"].noResults }, _ToolboxSmallStrings_resx__WEBPACK_IMPORTED_MODULE_12__["default"].ToolboxNoItemsFound));
        },
        enumerable: true,
        configurable: true
    });
    ToolboxSmall.prototype._handleClickItem = function (toolboxItemId) {
        this.props.onClickItem(toolboxItemId, {
            size: "Small" /* Small */,
            query: this.props.query
        });
    };
    ToolboxSmall.prototype._getState = function (items) {
        var featuredGroup = Object(_toolboxGroup__WEBPACK_IMPORTED_MODULE_6__["getFeaturedGroup"])(items, this.props.featuredIds);
        var mainGroup = this._shouldUpdateForTopicPage
            ? Object(_toolboxGroup__WEBPACK_IMPORTED_MODULE_6__["getTopicGroup"])(items, this.props.featuredIds)
            : Object(_toolboxGroup__WEBPACK_IMPORTED_MODULE_6__["getAlphabeticalGroup"])(items, this.props.featuredIds);
        return {
            featuredGroup: featuredGroup,
            mainGroup: mainGroup
        };
    };
    Object.defineProperty(ToolboxSmall.prototype, "_shouldUpdateForTopicPage", {
        get: function () {
            return Object(_ToolboxFlights__WEBPACK_IMPORTED_MODULE_9__["isTopicPageEnabled"])() && this.props.pageLayoutType === _ToolboxConstants__WEBPACK_IMPORTED_MODULE_8__["TOPIC_PAGE_LAYOUT_NAME"];
        },
        enumerable: true,
        configurable: true
    });
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], ToolboxSmall.prototype, "_handleClickItem", null);
    return ToolboxSmall;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));



/***/ }),

/***/ "UAnW":
/*!*****************************************!*\
  !*** ./lib/toolbox/ToolboxSizeLayer.js ***!
  \*****************************************/
/*! exports provided: ToolboxSizeLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxSizeLayer", function() { return ToolboxSizeLayer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _toolboxLarge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../toolboxLarge */ "C9I6");
/* harmony import */ var _toolboxSmall__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../toolboxSmall */ "msj5");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 */







var ToolboxSizeLayer = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToolboxSizeLayer, _super);
    function ToolboxSizeLayer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            size: "Small" /* Small */
        };
        return _this;
    }
    ToolboxSizeLayer.prototype.render = function () {
        switch (this.state.size) {
            case "Small" /* Small */:
                return (react__WEBPACK_IMPORTED_MODULE_4__["createElement"](_toolboxSmall__WEBPACK_IMPORTED_MODULE_6__["ToolboxSmall"], { className: '', items: this.props.items, controller: this.props.controller, onExpandToolbox: this._expandToolbox, onCloseToolbox: this.props.onCloseToolbox, calloutTarget: this.props.calloutTarget, calloutDirectionalHint: this.props.calloutDirectionalHint, onDismiss: this.props.onDismiss, onClickItem: this.props.onClickItem, featuredIds: this.props.featuredIds, pageLayoutType: this.props.pageLayoutType }));
            case "Large" /* Large */:
                return (react__WEBPACK_IMPORTED_MODULE_4__["createElement"](_toolboxLarge__WEBPACK_IMPORTED_MODULE_5__["ToolboxLarge"], { className: '', controller: this.props.controller, items: this.props.items, groups: this.props.groups, onCollapseToolbox: this._collapseToolbox, onCloseToolbox: this.props.onCloseToolbox, onClickItem: this.props.onClickItem, a11yManager: this.props.a11yManager, pageLayoutType: this.props.pageLayoutType }));
            default:
                throw new Error('Unknown toolbox mode');
        }
    };
    ToolboxSizeLayer.prototype._expandToolbox = function () {
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEventWithLogEntry(new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogEntry"]('Toolbox', 'ExpandToolbox', _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogType"].Event, {
            itemCount: this.props.items.length.toString()
        }));
        this.setState({
            size: "Large" /* Large */
        });
    };
    ToolboxSizeLayer.prototype._collapseToolbox = function () {
        _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEventWithLogEntry(new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogEntry"]('Toolbox', 'CollapseToolbox', _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogType"].Event, {
            itemCount: this.props.items.length.toString()
        }));
        this.setState({
            size: "Small" /* Small */
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], ToolboxSizeLayer.prototype, "_expandToolbox", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], ToolboxSizeLayer.prototype, "_collapseToolbox", null);
    return ToolboxSizeLayer;
}(react__WEBPACK_IMPORTED_MODULE_4__["PureComponent"]));



/***/ }),

/***/ "VjZh":
/*!******************************************!*\
  !*** ./lib/toolboxError/ToolboxError.js ***!
  \******************************************/
/*! exports provided: ToolboxError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxError", function() { return ToolboxError; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _toolboxCallout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toolboxCallout */ "GNkg");
/* harmony import */ var _ToolboxError_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToolboxError.module.scss */ "jVW0");



function ToolboxError(props) {
    props.a11yManager.alert(props.message);
    var toolboxErrorContent = (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _ToolboxError_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].error }, props.message));
    // @todo #241904 Update the UI with design approved error state
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_toolboxCallout__WEBPACK_IMPORTED_MODULE_1__["ToolboxCallout"], { className: props.className, onDismiss: props.onDismiss, target: props.calloutTarget, directionalHint: props.calloutDirectionalHint }, toolboxErrorContent));
}


/***/ }),

/***/ "Wako":
/*!**********************************!*\
  !*** ./lib/toolboxData/Group.js ***!
  \**********************************/
/*! exports provided: CONNECTOR_GROUP, OTHER_GROUP, PREDEFINED_GROUPS, FEATURED_GROUP, ALPHABETICAL_GROUP, TOPIC_GROUP, SECTION_GROUP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONNECTOR_GROUP", function() { return CONNECTOR_GROUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OTHER_GROUP", function() { return OTHER_GROUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PREDEFINED_GROUPS", function() { return PREDEFINED_GROUPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FEATURED_GROUP", function() { return FEATURED_GROUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALPHABETICAL_GROUP", function() { return ALPHABETICAL_GROUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOPIC_GROUP", function() { return TOPIC_GROUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SECTION_GROUP", function() { return SECTION_GROUP; });
/* harmony import */ var _GroupStrings_resx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GroupStrings.resx */ "s6s4");
/* harmony import */ var _loc_TopicPageToolboxStrings_resx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../loc/TopicPageToolboxStrings.resx */ "FZKA");


var CONNECTOR_GROUP = [
    '507ffa9b-29db-4d59-93fe-0e240510f718',
    _GroupStrings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ToolboxCategoryConnectors
];
var OTHER_GROUP = [
    '5c03119e-3074-46fd-976b-c60198311f70',
    _GroupStrings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ToolboxCategoryOther
];
var PREDEFINED_GROUPS = [
    [
        'cf066440-0614-43d6-98ae-0b31cf14c7c3',
        _GroupStrings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ToolboxCategoryTextMediaAndContent
    ],
    [
        '1edbd9a8-0bfb-4aa2-9afd-14b8c45dd489',
        _GroupStrings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ToolboxCategoryDiscovery
    ],
    [
        '75e22ed5-fa14-4829-850a-c890608aca2d',
        _GroupStrings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ToolboxCategoryCommunicationAndCollaboration
    ],
    [
        '1bc7927e-4a5e-4520-b540-71305c79c20a',
        _GroupStrings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ToolboxCategoryPlanningAndProcess
    ],
    [
        '4aca9e90-eff5-4fa1-bac7-728f5f157b66',
        _GroupStrings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ToolboxCategoryBusinessIntelligence
    ],
    [
        '070951d7-94da-4db8-b06e-9d581f1f55b1',
        _GroupStrings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ToolboxCategorySiteTools
    ],
    CONNECTOR_GROUP,
    OTHER_GROUP
];
var FEATURED_GROUP = [
    'bff4383a-b0d8-4403-ae06-a49d288cda10',
    _GroupStrings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ToolboxGroupNameFeatured
];
var ALPHABETICAL_GROUP = [
    'cb7d0165-c1a5-4869-b988-840e29071e51',
    _GroupStrings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ToolboxGroupNameAlphabetical
];
var TOPIC_GROUP = [
    '21e314a7-2de9-4154-83ae-701fe33d928a',
    _loc_TopicPageToolboxStrings_resx__WEBPACK_IMPORTED_MODULE_1__["default"].TopicGroupName
];
var SECTION_GROUP = [
    '3d729643-8911-485d-8b0e-fc9d4c83acbd',
    _GroupStrings_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ToolboxGroupNameSection
];


/***/ }),

/***/ "XSkU":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxError/ToolboxError.module.css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".error_81f50d0c{background-color:\"[theme:errorBackground, default: rgba(232,17,35,.2)]\";font-weight:600;font-size:12px;letter-spacing:1px;padding:0 12px}", ""]);



/***/ }),

/***/ "XcfF":
/*!******************************************************!*\
  !*** ./lib/toolboxGroup/ToolboxGroupBase.module.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolboxGroupBase.module.css */ "z9Wc");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "Z+Fo":
/*!***************************************************!*\
  !*** ./lib/toolboxLarge/ToolboxLargeViewLayer.js ***!
  \***************************************************/
/*! exports provided: ALL_BY_CATEGORY_KEY, ALL_A_TO_Z_KEY, ToolboxLargeViewLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_BY_CATEGORY_KEY", function() { return ALL_BY_CATEGORY_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_A_TO_Z_KEY", function() { return ALL_A_TO_Z_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxLargeViewLayer", function() { return ToolboxLargeViewLayer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var office_ui_fabric_react_lib_components_Modal_Modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Modal/Modal */ "zzdt");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _toolboxChrome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../toolboxChrome */ "veAR");
/* harmony import */ var _ToolboxFlights__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ToolboxFlights */ "r+VS");
/* harmony import */ var _ViewCategory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ViewCategory */ "6eS9");
/* harmony import */ var _ViewHome__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ViewHome */ "LcaF");
/* harmony import */ var _ViewSearch__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ViewSearch */ "A+bi");
/* harmony import */ var _ViewSort__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ViewSort */ "N03I");
/* harmony import */ var _ToolboxLarge_module_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ToolboxLarge.module.scss */ "7A7I");
/* harmony import */ var _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ToolboxLargeStrings.resx */ "gKQq");















var ALL_BY_CATEGORY_KEY = 'allByCategory';
var ALL_A_TO_Z_KEY = 'allAToZ';
var ToolboxLargeViewLayer = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToolboxLargeViewLayer, _super);
    function ToolboxLargeViewLayer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            view: {
                type: "Home" /* Home */,
                previousView: undefined
            }
        };
        return _this;
    }
    ToolboxLargeViewLayer.prototype.render = function () {
        var _this = this;
        var titleAriaId = Math.random().toString().substr(2);
        var title = _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].LargeToolboxAriaTitle;
        var collapseButtonProps = {
            iconProps: { iconName: 'BackToWindow' },
            onClick: this.props.onCollapseToolbox,
            title: _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].ToolboxCollapseButtonDescription,
            ariaLabel: _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].ToolboxCollapseButtonAriaLabel,
            ariaDescription: _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].ToolboxCollapseButtonDescription
        };
        var commandBarProps = {
            items: this._commandBarItems,
            className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_ToolboxLarge_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"].menuCommandBar, Object(_ToolboxFlights__WEBPACK_IMPORTED_MODULE_8__["isFluentEnabled"])() && _ToolboxLarge_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"].fluent)
        };
        return (react__WEBPACK_IMPORTED_MODULE_6__["createElement"](office_ui_fabric_react_lib_components_Modal_Modal__WEBPACK_IMPORTED_MODULE_5__["Modal"], { onDismiss: this.props.onCloseToolbox, containerClassName: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_ToolboxLarge_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"].toolboxLargeContainer, this.props.className), isOpen: true, isBlocking: false, titleAriaId: titleAriaId, scrollableContentClassName: _ToolboxLarge_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"].modalScrollContent },
            react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_toolboxChrome__WEBPACK_IMPORTED_MODULE_7__["ToolboxChrome"], { searchQuery: this.props.query, farButton: collapseButtonProps, onChange: function (query) { return _this.props.onFilterItems(query, /* shouldDebounce */ true, 'Large'); }, onSearch: function (query) { return _this.props.onFilterItems(query, /* shouldDebounce */ false, 'Large'); }, onEscape: this.props.onCloseToolbox, commandBar: commandBarProps }, this._toolboxBody),
            react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("p", { id: titleAriaId, className: _ToolboxLarge_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"].screenReaderAlert }, title)));
    };
    Object.defineProperty(ToolboxLargeViewLayer.prototype, "_commandBarItems", {
        get: function () {
            var _this = this;
            var _a, _b;
            var _c = this._selectedCategory, selectedCategoryKey = _c[0], selectedCategoryName = _c[1];
            var subMenuForGroup = this.props.groups
                .map(function (toolboxLargeGroup) {
                var _a;
                return ({
                    key: toolboxLargeGroup.groupId,
                    name: toolboxLargeGroup.title,
                    className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])((_a = {},
                        _a[_ToolboxLarge_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"].selectedItem] = toolboxLargeGroup.groupId === selectedCategoryKey,
                        _a)),
                    onClick: _this._handleChangeCategoryMenu
                });
            });
            var subMenuForView = [{
                    key: ALL_BY_CATEGORY_KEY,
                    name: _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].ToolboxCategoryAllCategory,
                    className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])((_a = {},
                        _a[_ToolboxLarge_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"].selectedItem] = ALL_BY_CATEGORY_KEY === selectedCategoryKey,
                        _a)),
                    onClick: this._handleChangeCategoryMenu
                }, {
                    key: ALL_A_TO_Z_KEY,
                    name: _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].ToolboxCategorySortingCategory,
                    className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])((_b = {},
                        _b[_ToolboxLarge_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"].selectedItem] = ALL_A_TO_Z_KEY === selectedCategoryKey,
                        _b)),
                    onClick: this._handleChangeCategoryMenu
                }];
            var commandBarButtonClassName = Object(_ToolboxFlights__WEBPACK_IMPORTED_MODULE_8__["isFluentEnabled"])() ? _ToolboxLarge_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"].commandBarButton : '';
            var backButton = {
                className: commandBarButtonClassName,
                key: 'BackButton',
                ariaLabel: _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].BackButtonAriaLabel,
                iconProps: { iconName: 'ChromeBack' },
                disabled: !this.props.query && this.state.view.previousView === undefined,
                onClick: this._handleBackClick,
                'data-automation-id': 'toolbox-back-button'
            };
            var commandBarMenus = [
                backButton,
                {
                    className: commandBarButtonClassName,
                    key: 'CategoryContextualMenu',
                    name: selectedCategoryName,
                    subMenuProps: {
                        items: subMenuForView.concat(subMenuForGroup),
                        beakWidth: 10,
                        isBeakVisible: true
                    },
                    role: 'navigation',
                    ariaLabel: _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__["StringHelper"].format(_ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].DropDownMenuAriaLabel, selectedCategoryName)
                }
            ];
            return commandBarMenus;
        },
        enumerable: true,
        configurable: true
    });
    ToolboxLargeViewLayer.prototype._handleChangeCategoryMenu = function (ev, item) {
        if (!item) {
            return;
        }
        switch (item.key) {
            case ALL_BY_CATEGORY_KEY: {
                this._switchView({
                    type: "Home" /* Home */,
                    previousView: this.state.view
                });
                var message = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__["StringHelper"].format(_ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].SwitchCategoryAlert, _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].ToolboxCategoryAllCategory);
                this.props.a11yManager.alert(message);
                break;
            }
            case ALL_A_TO_Z_KEY: {
                this._switchView({
                    type: "Sort" /* Sort */,
                    sortBy: 'alphabet',
                    previousView: this.state.view
                });
                var message = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__["StringHelper"].format(_ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].SwitchCategoryAlert, _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].ToolboxCategorySortingCategory);
                this.props.a11yManager.alert(message);
                break;
            }
            // Switch to specified category view.
            default: {
                this._switchView({
                    type: "Category" /* Category */,
                    groupId: item.key,
                    previousView: this.state.view
                });
                var message = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__["StringHelper"].format(_ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].SwitchCategoryAlert, this._getCategoryName(item.key));
                this.props.a11yManager.alert(message);
            }
        }
    };
    Object.defineProperty(ToolboxLargeViewLayer.prototype, "_selectedCategory", {
        get: function () {
            var selectedCategoryKey;
            var selectedCategoryName;
            if (this.props.query) {
                // For search view, we don't show a corresponding choice but update the title.
                selectedCategoryKey = '';
                selectedCategoryName = _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].ToolboxCategorySearchResults;
            }
            else if (this.state.view.type === "Home" /* Home */) {
                selectedCategoryKey = ALL_BY_CATEGORY_KEY;
                selectedCategoryName = _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].ToolboxCategoryAllCategory;
            }
            else if (this.state.view.type === "Sort" /* Sort */) {
                selectedCategoryKey = ALL_A_TO_Z_KEY;
                selectedCategoryName = _ToolboxLargeStrings_resx__WEBPACK_IMPORTED_MODULE_14__["default"].ToolboxCategorySortingCategory;
            }
            else {
                selectedCategoryKey = this.state.view.groupId;
                selectedCategoryName = this._getCategoryName(this.state.view.groupId);
            }
            return [selectedCategoryKey, selectedCategoryName];
        },
        enumerable: true,
        configurable: true
    });
    ToolboxLargeViewLayer.prototype._getCategoryName = function (groupId) {
        var groupIndex = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__["findIndex"])(this.props.groups, function (group) { return group.groupId === groupId; });
        if (groupIndex >= 0) {
            return this.props.groups[groupIndex].title;
        }
        else {
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_TraceLogger"].logError(ToolboxLargeViewLayer._logSource, new Error("Something went wrong with categorizing groups, group not found by given id: " + groupId));
            return '';
        }
    };
    ToolboxLargeViewLayer.prototype._handleBackClick = function () {
        if (this.props.query) {
            this.props.onFilterItems('', /* shouldDebounce */ false);
        }
        else if (this.state.view.previousView) {
            this._switchView(this.state.view.previousView);
        }
    };
    Object.defineProperty(ToolboxLargeViewLayer.prototype, "_toolboxBody", {
        get: function () {
            if (this.props.query) {
                return (react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_ViewSearch__WEBPACK_IMPORTED_MODULE_11__["ViewSearch"], { items: this.props.items, onClickItem: this._clickItemInToolboxLarge }));
            }
            switch (this.state.view.type) {
                case "Home" /* Home */:
                    return (react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_ViewHome__WEBPACK_IMPORTED_MODULE_10__["ViewHome"], { view: this.state.view, groups: this.props.groups, onClickItem: this._clickItemInToolboxLarge, onSwitchView: this._switchView, pageLayoutType: this.props.pageLayoutType }));
                case "Sort" /* Sort */:
                    return (react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_ViewSort__WEBPACK_IMPORTED_MODULE_12__["ViewSort"], { view: this.state.view, items: this.props.items, onClickItem: this._clickItemInToolboxLarge }));
                case "Category" /* Category */:
                    return (react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_ViewCategory__WEBPACK_IMPORTED_MODULE_9__["ViewCategory"], { view: this.state.view, groups: this.props.groups, onClickItem: this._clickItemInToolboxLarge, pageLayoutType: this.props.pageLayoutType }));
                default: {
                    return null; // tslint:disable-line:no-null-keyword
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ToolboxLargeViewLayer.prototype._switchView = function (view) {
        // Clear the search query to avoid the search view.
        this.props.onFilterItems('', /* shouldDebounce */ false);
        if (view.previousView !== undefined && this._isSameView(view, view.previousView)) {
            // It is possible that, we are switch to a view with `previousView` set to the same view.
            // Concretely, it is search view currently. There is a `previousView` with the search view.
            // The user chooses the same view as the `previousView` from the dropdown menu.
            // So, instead of pushing a new view to history stack, it goes back to `previousView` directly.
            this.setState({ view: view.previousView });
        }
        else {
            this.setState({ view: view });
        }
    };
    ToolboxLargeViewLayer.prototype._isSameView = function (view1, view2) {
        if (view1.type === "Category" /* Category */ && view2.type === "Category" /* Category */) {
            return view1.groupId === view2.groupId;
        }
        else {
            return view1.type === view2.type;
        }
    };
    ToolboxLargeViewLayer.prototype._clickItemInToolboxLarge = function (toolboxItemId) {
        this.props.onClickItem(toolboxItemId, {
            size: "Large" /* Large */,
            query: this.props.query,
            view: this.state.view
        });
    };
    ToolboxLargeViewLayer._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogSource"].create('Toolbox');
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], ToolboxLargeViewLayer.prototype, "_handleChangeCategoryMenu", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], ToolboxLargeViewLayer.prototype, "_handleBackClick", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], ToolboxLargeViewLayer.prototype, "_switchView", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], ToolboxLargeViewLayer.prototype, "_clickItemInToolboxLarge", null);
    return ToolboxLargeViewLayer;
}(react__WEBPACK_IMPORTED_MODULE_6__["PureComponent"]));



/***/ }),

/***/ "ZPLP":
/*!*********************************************************!*\
  !*** ./lib/toolboxItem/ToolboxItemSmall.module.scss.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolboxItemSmall.module.css */ "wFRG");
var styles = {
    item: 'item_650b9e1d',
    flexBox: 'flexBox_650b9e1d',
    icon: 'icon_650b9e1d',
    title: 'title_650b9e1d'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "b4B8":
/*!*****************************************************!*\
  !*** ./lib/toolboxLarge/ToolboxLargeSearchLayer.js ***!
  \*****************************************************/
/*! exports provided: ToolboxLargeSearchLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxLargeSearchLayer", function() { return ToolboxLargeSearchLayer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _toolboxSearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toolboxSearch */ "ZFqg");
/* harmony import */ var _ToolboxLargeViewLayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ToolboxLargeViewLayer */ "Z+Fo");




function ToolboxLargeSearchLayer(props) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_toolboxSearch__WEBPACK_IMPORTED_MODULE_2__["SearchConsumer"], null, function (searchContext) { return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ToolboxLargeViewLayer__WEBPACK_IMPORTED_MODULE_3__["ToolboxLargeViewLayer"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props, searchContext)); }));
}


/***/ }),

/***/ "b6WH":
/*!**********************************!*\
  !*** ./lib/toolboxData/index.js ***!
  \**********************************/
/*! exports provided: Group */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Group */ "Wako");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Group", function() { return _Group__WEBPACK_IMPORTED_MODULE_0__; });

// tslint:disable-next-line:export-name



/***/ }),

/***/ "el64":
/*!***********************************************!*\
  !*** ./lib/toolboxItem/ToolboxItemSection.js ***!
  \***********************************************/
/*! exports provided: ToolboxItemSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxItemSection", function() { return ToolboxItemSection; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ToolboxItemBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToolboxItemBase */ "+FXA");
/* harmony import */ var _ToolboxItemSmall_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ToolboxItemSmall.module.scss */ "ZPLP");




function ToolboxItemSection(props) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ToolboxItemBase__WEBPACK_IMPORTED_MODULE_2__["ToolboxItemBase"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props, { titleLineCount: 2, itemClassName: _ToolboxItemSmall_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].item, itemStyles: { height: 88 }, flexBoxClassName: _ToolboxItemSmall_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].flexBox, iconClassName: _ToolboxItemSmall_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].icon, titleClassName: _ToolboxItemSmall_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].title })));
}


/***/ }),

/***/ "feLs":
/*!**********************************************!*\
  !*** ./lib/toolboxGroup/ToolboxGroupBase.js ***!
  \**********************************************/
/*! exports provided: ToolboxGroupBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxGroupBase", function() { return ToolboxGroupBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ToolboxFlights__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ToolboxFlights */ "r+VS");
/* harmony import */ var _ToolboxGroupBase_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ToolboxGroupBase.module.scss */ "ogcG");
/* harmony import */ var _ToolboxGroupStrings_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ToolboxGroupStrings.resx */ "C6B0");







var ToolboxGroupBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToolboxGroupBase, _super);
    function ToolboxGroupBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolboxGroupBase.prototype.render = function () {
        var sectionAriaLabel = _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["StringHelper"].format(_ToolboxGroupStrings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].ToolboxGroupAriaLabel, this.props.groupName);
        return (react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("section", { "aria-label": sectionAriaLabel, role: 'list', className: _ToolboxGroupBase_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].toolboxGroup },
            this._banner,
            this._content,
            this._shouldShowSeeAllButton && this._seeAllButton));
    };
    Object.defineProperty(ToolboxGroupBase.prototype, "_banner", {
        get: function () {
            return this.props.hasHeader &&
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("header", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_ToolboxGroupBase_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].header, Object(_ToolboxFlights__WEBPACK_IMPORTED_MODULE_4__["isFluentEnabled"])() && _ToolboxGroupBase_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].fluent) }, this.props.groupName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolboxGroupBase.prototype, "_seeAllButton", {
        get: function () {
            return (react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["ActionButton"], { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_ToolboxGroupBase_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seeAllButton, Object(_ToolboxFlights__WEBPACK_IMPORTED_MODULE_4__["isFluentEnabled"])() && _ToolboxGroupBase_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].fluent), styles: { root: { height: 32, position: 'absolute' } }, onClick: this.props.onClickSeeAll, ariaLabel: _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_2__["StringHelper"].format(_ToolboxGroupStrings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].ToolboxGroupSeeAllButtonAriaLabel, this.props.groupName) }, _ToolboxGroupStrings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].ToolboxGroupSeeAllButtonLabel));
        },
        enumerable: true,
        configurable: true
    });
    return ToolboxGroupBase;
}(react__WEBPACK_IMPORTED_MODULE_3__["PureComponent"]));



/***/ }),

/***/ "gKQq":
/*!******************************************************!*\
  !*** ./lib/toolboxLarge/ToolboxLargeStrings.resx.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_WVn4QXYnL8WpGCqr2C9ySA';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "gTvL":
/*!***********************************************!*\
  !*** ./lib/toolboxGroup/ToolboxGroupLarge.js ***!
  \***********************************************/
/*! exports provided: ToolboxGroupLarge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxGroupLarge", function() { return ToolboxGroupLarge; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ToolboxGroupBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ToolboxGroupBase */ "feLs");
/* harmony import */ var _ToolboxGroupLarge_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ToolboxGroupLarge.module.scss */ "0OY+");





var MIN_LARGE_GROUP_COLUMNS = 4;
var RESPONSIVE_BREAK_POINTS_MIN = [
    // 718px = 128(toolboxItemWidth)x5 + 24(toolboxMargin)x2 + 30(in case of scroll bar)
    [718, MIN_LARGE_GROUP_COLUMNS + 1],
    [846, MIN_LARGE_GROUP_COLUMNS + 2],
    [974, MIN_LARGE_GROUP_COLUMNS + 3],
    [1102, MIN_LARGE_GROUP_COLUMNS + 4],
    [Number.MAX_VALUE, MIN_LARGE_GROUP_COLUMNS + 5] // Should never show 9 columns.
];
var ToolboxGroupLarge = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToolboxGroupLarge, _super);
    function ToolboxGroupLarge(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            numberOfColumns: _this._calcColumnNumber(window.innerWidth)
        };
        return _this;
    }
    ToolboxGroupLarge.prototype.componentDidMount = function () {
        window.addEventListener('resize', this._handleWindowResize);
    };
    ToolboxGroupLarge.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this._handleWindowResize);
    };
    Object.defineProperty(ToolboxGroupLarge.prototype, "_content", {
        get: function () {
            return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["FocusZone"], { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_ToolboxGroupLarge_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].flexGroup, this._widthClassName) }, this._responsiveChildren));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolboxGroupLarge.prototype, "_shouldShowSeeAllButton", {
        get: function () {
            return react__WEBPACK_IMPORTED_MODULE_2__["Children"].count(this._responsiveChildren) < react__WEBPACK_IMPORTED_MODULE_2__["Children"].count(this.props.children);
        },
        enumerable: true,
        configurable: true
    });
    ToolboxGroupLarge.prototype._handleWindowResize = function () {
        if (window.innerWidth) {
            var windowWidth = window.innerWidth;
            if (windowWidth) {
                this.setState({ numberOfColumns: this._calcColumnNumber(windowWidth) });
            }
        }
    };
    ToolboxGroupLarge.prototype._calcColumnNumber = function (windowWidth) {
        var responsiveIndex = 0;
        while (windowWidth >= RESPONSIVE_BREAK_POINTS_MIN[responsiveIndex][0]) {
            responsiveIndex++;
        }
        return responsiveIndex + MIN_LARGE_GROUP_COLUMNS;
    };
    Object.defineProperty(ToolboxGroupLarge.prototype, "_responsiveChildren", {
        get: function () {
            var _this = this;
            // If see all callback is valid, slice children and render group in one-line mode,
            // otherwise render all children in multiple line.
            var slicedItems = Boolean(this.props.onClickSeeAll)
                ? react__WEBPACK_IMPORTED_MODULE_2__["Children"].toArray(this.props.children).slice(0, this.state.numberOfColumns)
                : react__WEBPACK_IMPORTED_MODULE_2__["Children"].toArray(this.props.children);
            return slicedItems.map(function (child, index) {
                return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: _ToolboxGroupLarge_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].grid, key: "grid-" + _this._generateKeyFromReactChild(child, index) }, child);
            });
        },
        enumerable: true,
        configurable: true
    });
    ToolboxGroupLarge.prototype._generateKeyFromReactChild = function (child, index) {
        if (child) {
            /* tslint:disable-next-line:no-any */
            var elementKey = child.key;
            if (elementKey) {
                return elementKey;
            }
            else {
                return child.toString();
            }
        }
        else {
            return index;
        }
    };
    Object.defineProperty(ToolboxGroupLarge.prototype, "_widthClassName", {
        get: function () {
            switch (this.state.numberOfColumns) {
                case 4: {
                    return _ToolboxGroupLarge_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].fourColumnWide;
                }
                case 5: {
                    return _ToolboxGroupLarge_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].fiveColumnWide;
                }
                case 6: {
                    return _ToolboxGroupLarge_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].sixColumnWide;
                }
                case 7: {
                    return _ToolboxGroupLarge_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].sevenColumnWide;
                }
                default: {
                    return _ToolboxGroupLarge_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].eightColumnWide;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], ToolboxGroupLarge.prototype, "_handleWindowResize", null);
    return ToolboxGroupLarge;
}(_ToolboxGroupBase__WEBPACK_IMPORTED_MODULE_3__["ToolboxGroupBase"]));



/***/ }),

/***/ "guoG":
/*!******************************************************!*\
  !*** ./lib/toolboxSmall/ToolboxSmallStrings.resx.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_CZsUWMvZilAKKAfwQSdzKQ';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "jVW0":
/*!******************************************************!*\
  !*** ./lib/toolboxError/ToolboxError.module.scss.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolboxError.module.css */ "FSMX");
var styles = {
    error: 'error_81f50d0c'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "k8VM":
/*!**************************************************!*\
  !*** ./lib/toolboxSection/ToolboxSectionCore.js ***!
  \**************************************************/
/*! exports provided: ToolboxSectionCore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxSectionCore", function() { return ToolboxSectionCore; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _toolboxCallout_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toolboxCallout/index */ "GNkg");
/* harmony import */ var _toolboxGroup_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../toolboxGroup/index */ "5FlS");
/* harmony import */ var _toolboxItem_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../toolboxItem/index */ "nKzV");
/* harmony import */ var _ToolboxSectionCore_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ToolboxSectionCore.module.scss */ "AgJP");







var ToolboxSectionCore = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToolboxSectionCore, _super);
    function ToolboxSectionCore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolboxSectionCore.prototype.render = function () {
        var toolboxSectionContent = (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["FocusZone"], { direction: _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["FocusZoneDirection"].horizontal, isCircularNavigation: true }, this._renderGroup(Object(_toolboxGroup_index__WEBPACK_IMPORTED_MODULE_4__["getSectionGroup"])(this.props.items))));
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_toolboxCallout_index__WEBPACK_IMPORTED_MODULE_3__["ToolboxCallout"], { onDismiss: this.props.onCloseToolbox, className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(this.props.className, _ToolboxSectionCore_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].callout), target: this.props.calloutTarget, directionalHint: this.props.calloutDirectionalHint }, toolboxSectionContent));
    };
    ToolboxSectionCore.prototype._renderGroup = function (group) {
        var _this = this;
        if (group.items.length === 0) {
            return false;
        }
        var items = group.items.map(function (item) {
            return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_toolboxItem_index__WEBPACK_IMPORTED_MODULE_5__["ToolboxItemSection"], { key: item.id, item: item, onClick: _this.props.onClickItem });
        });
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_toolboxGroup_index__WEBPACK_IMPORTED_MODULE_4__["ToolboxGroupSmall"], { key: group.groupId, groupName: group.title, hasHeader: true }, items));
    };
    return ToolboxSectionCore;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));



/***/ }),

/***/ "kqS2":
/*!**********************************************************************!*\
  !*** ./lib/toolboxGroup/ToolboxGroupLargeWithMessage.module.scss.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolboxGroupLargeWithMessage.module.css */ "N3LY");
var styles = {
    noTopicResults: 'noTopicResults_5015de4f',
    fluent: 'fluent_5015de4f'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "lZN9":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxGroup/ToolboxGroupLarge.module.css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".flexGroup_de1a8cca{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.grid_de1a8cca{width:128px;height:128px}.eightColumnWide_de1a8cca{width:1024px}.sevenColumnWide_de1a8cca{width:896px}.sixColumnWide_de1a8cca{width:768px}.fiveColumnWide_de1a8cca{width:640px}.fourColumnWide_de1a8cca{width:512px}", ""]);



/***/ }),

/***/ "msj5":
/*!***********************************!*\
  !*** ./lib/toolboxSmall/index.js ***!
  \***********************************/
/*! exports provided: ToolboxSmall */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToolboxSmallAnimationLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToolboxSmallAnimationLayer */ "uxSn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxSmall", function() { return _ToolboxSmallAnimationLayer__WEBPACK_IMPORTED_MODULE_0__["ToolboxSmallAnimationLayer"]; });




/***/ }),

/***/ "nKzV":
/*!**********************************!*\
  !*** ./lib/toolboxItem/index.js ***!
  \**********************************/
/*! exports provided: ToolboxItemSmall, ToolboxItemLarge, ToolboxItemSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToolboxItemSmall__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToolboxItemSmall */ "TBAh");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxItemSmall", function() { return _ToolboxItemSmall__WEBPACK_IMPORTED_MODULE_0__["ToolboxItemSmall"]; });

/* harmony import */ var _ToolboxItemLarge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToolboxItemLarge */ "+ium");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxItemLarge", function() { return _ToolboxItemLarge__WEBPACK_IMPORTED_MODULE_1__["ToolboxItemLarge"]; });

/* harmony import */ var _ToolboxItemSection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToolboxItemSection */ "el64");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxItemSection", function() { return _ToolboxItemSection__WEBPACK_IMPORTED_MODULE_2__["ToolboxItemSection"]; });






/***/ }),

/***/ "nLsw":
/*!*****************************************************!*\
  !*** ./lib/toolboxSmall/ToolboxSmallSearchLayer.js ***!
  \*****************************************************/
/*! exports provided: ToolboxSmallSearchLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxSmallSearchLayer", function() { return ToolboxSmallSearchLayer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _toolboxSearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toolboxSearch */ "ZFqg");
/* harmony import */ var _ToolboxSmall__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ToolboxSmall */ "U6dd");




function renderToolbox(props, searchContext) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ToolboxSmall__WEBPACK_IMPORTED_MODULE_3__["ToolboxSmall"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props, { ref: undefined, query: searchContext.query, items: searchContext.items, onFilter: function (query) { return searchContext.onFilterItems(query, /* shouldDebounce */ false, 'Small'); }, onFilterDebounce: function (query) { return searchContext.onFilterItems(query, /* shouldDebounce */ true, 'Small'); } })));
}
function ToolboxSmallSearchLayer(props) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_toolboxSearch__WEBPACK_IMPORTED_MODULE_2__["SearchConsumer"], null, function (searchContext) { return renderToolbox(props, searchContext); }));
}


/***/ }),

/***/ "ntxq":
/*!*********************************************!*\
  !*** ./lib/toolbox/ToolboxProviderLayer.js ***!
  \*********************************************/
/*! exports provided: ToolboxProviderLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxProviderLayer", function() { return ToolboxProviderLayer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _toolboxSearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toolboxSearch */ "ZFqg");
/* harmony import */ var _ToolboxSizeLayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ToolboxSizeLayer */ "UAnW");




function ToolboxProviderLayer(props) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_toolboxSearch__WEBPACK_IMPORTED_MODULE_2__["SearchProvider"], { items: props.items, a11yManager: props.a11yManager },
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ToolboxSizeLayer__WEBPACK_IMPORTED_MODULE_3__["ToolboxSizeLayer"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props))));
}


/***/ }),

/***/ "o44a":
/*!**************************************************!*\
  !*** ./lib/toolboxLarge/ToolboxLarge.module.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolboxLarge.module.css */ "RPhW");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "ogcG":
/*!**********************************************************!*\
  !*** ./lib/toolboxGroup/ToolboxGroupBase.module.scss.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolboxGroupBase.module.css */ "XcfF");
var styles = {
    toolboxGroup: 'toolboxGroup_33eb404d',
    header: 'header_33eb404d',
    fluent: 'fluent_33eb404d',
    seeAllButton: 'seeAllButton_33eb404d'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "r+VS":
/*!*******************************!*\
  !*** ./lib/ToolboxFlights.js ***!
  \*******************************/
/*! exports provided: isFluentEnabled, isTopicPageEnabled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFluentEnabled", function() { return isFluentEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTopicPageEnabled", function() { return isTopicPageEnabled; });
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ToolboxKillSwitches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToolboxKillSwitches */ "AFEX");
// Copyright (c) Microsoft Corporation. All rights reserved.



function isToolboxFluentKillSwitchActivated() {
    return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(
    // Use the same kill switch id with the kill switch id of Toolbox in FluentScope
    _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('b7369ea0-90b4-4183-8f1a-d7e1361154eb'), '8/19/2019', 'SOX_FluentForToolbox');
}
function isFluentEnabled() {
    return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1248) && !isToolboxFluentKillSwitchActivated();
}
function isTopicPageEnabled() {
    return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1336)
        && _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPFlight"].isEnabled(1684)
        && !Object(_ToolboxKillSwitches__WEBPACK_IMPORTED_MODULE_1__["isToolboxSupportTopicPageKillSwitchActivated"])();
}


/***/ }),

/***/ "s6s4":
/*!**********************************************!*\
  !*** ./lib/toolboxData/GroupStrings.resx.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_NS+5Kf9zpnH1/LStsp+Tfw';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "s7ZS":
/*!*******************************************************!*\
  !*** ./lib/toolboxGroup/ToolboxGroupLarge.module.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolboxGroupLarge.module.css */ "lZN9");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "sJc3":
/*!***********************************************!*\
  !*** ./lib/toolboxGroup/ToolboxGroupSmall.js ***!
  \***********************************************/
/*! exports provided: ToolboxGroupSmall */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxGroupSmall", function() { return ToolboxGroupSmall; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ToolboxGroupBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToolboxGroupBase */ "feLs");



var ToolboxGroupSmall = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToolboxGroupSmall, _super);
    function ToolboxGroupSmall() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ToolboxGroupSmall.prototype, "_content", {
        get: function () {
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null, this.props.children));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolboxGroupSmall.prototype, "_shouldShowSeeAllButton", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return ToolboxGroupSmall;
}(_ToolboxGroupBase__WEBPACK_IMPORTED_MODULE_2__["ToolboxGroupBase"]));



/***/ }),

/***/ "uxSn":
/*!********************************************************!*\
  !*** ./lib/toolboxSmall/ToolboxSmallAnimationLayer.js ***!
  \********************************************************/
/*! exports provided: ToolboxSmallAnimationLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxSmallAnimationLayer", function() { return ToolboxSmallAnimationLayer; });
/* harmony import */ var _toolboxAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toolboxAnimation */ "Xs01");
/* harmony import */ var _ToolboxSmallSearchLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToolboxSmallSearchLayer */ "nLsw");


// tslint:disable-next-line:variable-name
var ToolboxSmallAnimationLayer = Object(_toolboxAnimation__WEBPACK_IMPORTED_MODULE_0__["animation"])(_ToolboxSmallSearchLayer__WEBPACK_IMPORTED_MODULE_1__["ToolboxSmallSearchLayer"], 3 /* Small */);


/***/ }),

/***/ "veAR":
/*!************************************!*\
  !*** ./lib/toolboxChrome/index.js ***!
  \************************************/
/*! exports provided: ToolboxChrome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToolboxChrome__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToolboxChrome */ "SISZ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxChrome", function() { return _ToolboxChrome__WEBPACK_IMPORTED_MODULE_0__["ToolboxChrome"]; });




/***/ }),

/***/ "wFRG":
/*!*****************************************************!*\
  !*** ./lib/toolboxItem/ToolboxItemSmall.module.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolboxItemSmall.module.css */ "7yau");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "wPTN":
/*!*************************************!*\
  !*** ./lib/toolboxSection/index.js ***!
  \*************************************/
/*! exports provided: ToolboxSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToolboxItemsLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToolboxItemsLayer */ "St2D");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxSection", function() { return _ToolboxItemsLayer__WEBPACK_IMPORTED_MODULE_0__["ToolboxItemsLayer"]; });

// @todo#680770 create section toolbox animation layer.



/***/ }),

/***/ "x0iz":
/*!*********************************************************!*\
  !*** ./lib/toolboxItem/ToolboxItemLarge.module.scss.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolboxItemLarge.module.css */ "CUwB");
var styles = {
    item: 'item_d73652a8',
    flexBox: 'flexBox_d73652a8',
    icon: 'icon_d73652a8',
    title: 'title_d73652a8'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "z9Wc":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxGroup/ToolboxGroupBase.module.css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".toolboxGroup_33eb404d{clear:both;position:relative}.header_33eb404d{letter-spacing:1px}[dir=ltr] .header_33eb404d{text-align:left}[dir=rtl] .header_33eb404d{text-align:right}.header_33eb404d:not(.fluent_33eb404d){color:\"[theme:neutralPrimary, default: #323130]\";background-color:\"[theme:neutralLighter, default: #f3f2f1]\";font-weight:600;height:32px;line-height:32px;padding:0 12px}.header_33eb404d.fluent_33eb404d{font-size:\"[theme:mediumPlusFontSize, default: 16px]\";font-weight:\"[theme:mediumPlusFontWeight, default: 400]\";font-weight:600;color:\"[theme:neutralSecondary, default: #605e5c]\";height:40px;line-height:40px;padding:0 16px;border-top:1px solid \"[theme:neutrallight, default: #edebe9]\"}.seeAllButton_33eb404d{height:32px;color:\"[theme:themeDarkAlt, default: #106ebe]\";position:absolute;top:0}[dir=ltr] .seeAllButton_33eb404d{right:0}[dir=rtl] .seeAllButton_33eb404d{left:0}.seeAllButton_33eb404d.fluent_33eb404d{font-size:\"[theme:mediumFontSize, default: 14px]\";font-weight:\"[theme:mediumFontWeight, default: 400]\"}", ""]);



/***/ })

}]);
//# sourceMappingURL=chunk.toolbox_19eb8fb304d2da0a028b.js.map