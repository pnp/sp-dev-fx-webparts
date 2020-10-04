(window["webpackJsonp_85093aa7_8c12_4683_91aa_47cd5e2654db_2_5_0"] = window["webpackJsonp_85093aa7_8c12_4683_91aa_47cd5e2654db_2_5_0"] || []).push([["sp-rte-propertypane"],{

/***/ "/+z5":
/*!******************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/tableIcons/index.js ***!
  \******************************************************************/
/*! exports provided: TableIcons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TableIcons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TableIcons */ "Kw/A");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableIcons", function() { return _TableIcons__WEBPACK_IMPORTED_MODULE_0__["TableIcons"]; });




/***/ }),

/***/ "27As":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/sp-canvas/canvas/editChunk/sprte/PropertyPane/SPRteColorPicker.module.css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".pickerCallout_080ef78c{width:166px}.pickerLabel_080ef78c{display:block;margin-left:6px}.pickerLabel_080ef78c.isRTL_080ef78c{margin-right:6px}[dir=ltr] .buttonLabel_080ef78c{padding-left:10px}[dir=rtl] .buttonLabel_080ef78c{padding-right:10px}.previewSvg_080ef78c{width:20px;height:20px}.previewSvg_080ef78c.border_080ef78c{border:1px solid}.defaultSvg_080ef78c{padding:2px;border:1px solid}.defaultSvg_080ef78c.fillDefaultColor_080ef78c{fill:\"[theme:white, default: #ffffff]\"}.defaultSvg_080ef78c.fillThemeColor_080ef78c{fill:\"[theme:neutralPrimary, default: #323130]\";border:none}.defaultSvg_080ef78c.selected_080ef78c{width:12px;height:12px;border:4px solid}.colorPickerButton_080ef78c{background:0 0;padding-left:4px;padding-right:12px;border:none}.previewRectangle_080ef78c{width:100%;height:100%}.previewIcon_080ef78c{font-size:7px;padding-top:8px}[dir=ltr] .previewIcon_080ef78c{padding-left:7px}[dir=rtl] .previewIcon_080ef78c{padding-right:7px}", ""]);



/***/ }),

/***/ "2MlO":
/*!**************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/PropertyPane/SPRtePropertyPaneButton.js ***!
  \**************************************************************************************/
/*! exports provided: SPRtePropertyPaneButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPRtePropertyPaneButton", function() { return SPRtePropertyPaneButton; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _SPRtePropertyPaneButton_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SPRtePropertyPaneButton.module.scss */ "8uA0");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file SPRtePropertyPaneButton.tsx
 */





/**
 * SPRtePropertyPaneButton as button component used on the property pane of SPRte
 */
var SPRtePropertyPaneButton = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SPRtePropertyPaneButton, _super);
    /**
     * Constructs an instance of SPRtePropertyPaneButton
     */
    function SPRtePropertyPaneButton(props) {
        return _super.call(this, props) || this;
    }
    /**
     * Renders SPRtePropertyPaneButton
     */
    SPRtePropertyPaneButton.prototype.render = function () {
        var _a;
        var _b = this.props, onClick = _b.onClick, fabricIconKey = _b.fabricIconKey, title = _b.title, ariaLabel = _b.ariaLabel, isActive = _b.isActive, imageSrc = _b.imageSrc, isDisabled = _b.isDisabled, text = _b.text, automationId = _b.automationId, className = _b.className;
        var buttonAutomationId = automationId + '-propertyPaneButton';
        var buttonClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_SPRtePropertyPaneButton_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].sprtePropertyPaneButton, className ? _SPRtePropertyPaneButton_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"][className] : undefined, (_a = {},
            _a[_SPRtePropertyPaneButton_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].sprtePropertyPaneButtonActive] = isActive,
            _a[_SPRtePropertyPaneButton_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].imageButton] = !!imageSrc,
            _a[_SPRtePropertyPaneButton_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].iconButton] = fabricIconKey,
            _a[_SPRtePropertyPaneButton_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].textButton] = !!text && !imageSrc,
            _a[_SPRtePropertyPaneButton_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].disabled] = isDisabled,
            _a));
        var imageButtonClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_SPRtePropertyPaneButton_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].sprtePropertyPaneButtonImage);
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["TooltipHost"], { content: title, calloutProps: { gapSpace: 0 } }, fabricIconKey ? (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["IconButton"], { ariaLabel: ariaLabel, iconProps: { iconName: fabricIconKey }, onClick: onClick, disabled: isDisabled, className: buttonClassName, "data-automation-id": buttonAutomationId })) : (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["DefaultButton"], { ariaLabel: ariaLabel, onClick: onClick, disabled: isDisabled, className: buttonClassName, "data-automation-id": buttonAutomationId }, imageSrc && !fabricIconKey ? react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: imageButtonClassName }, imageSrc) : text))));
    };
    return SPRtePropertyPaneButton;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]));



/***/ }),

/***/ "75Tl":
/*!*******************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/PropertyPane/ColorPickerGroup.js ***!
  \*******************************************************************************/
/*! exports provided: ColorPickerGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorPickerGroup", function() { return ColorPickerGroup; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var office_ui_fabric_react_lib_components_SwatchColorPicker_SwatchColorPicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/SwatchColorPicker/SwatchColorPicker */ "TkxN");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SPRteColorPicker.module.scss */ "EGp2");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file ColorPickerGroup.tsx
 */





/**
 * Represents a group component for SPRteColorPicker. This group
 * includes the SwatchColorPicker and the associated label
 */
var ColorPickerGroup = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ColorPickerGroup, _super);
    /**
     * Constructs an instance of ColorPickerGroup
     */
    function ColorPickerGroup(props) {
        return _super.call(this, props) || this;
    }
    /**
     * Renders the color picker group for SPRteColorPicker
     */
    ColorPickerGroup.prototype.render = function () {
        var _a;
        var _b = this.props, dataAutomationId = _b.dataAutomationId, groupText = _b.groupText, groupColors = _b.groupColors, onColorChanged = _b.onColorChanged, selectedColor = _b.selectedColor;
        var pickerLabelCss = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].pickerLabel, (_a = {}, _a[_SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].isRTL] = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["getRTL"])(), _a));
        return (react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("label", { htmlFor: groupText, className: pickerLabelCss }, groupText),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](office_ui_fabric_react_lib_components_SwatchColorPicker_SwatchColorPicker__WEBPACK_IMPORTED_MODULE_2__["SwatchColorPicker"], { "data-automation-id": dataAutomationId, id: groupText, key: groupText, columnCount: 5, cellShape: 'square', onColorChanged: onColorChanged, colorCells: groupColors, selectedId: selectedColor })));
    };
    return ColorPickerGroup;
}(react__WEBPACK_IMPORTED_MODULE_3__["Component"]));



/***/ }),

/***/ "8kZZ":
/*!*****************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/PropertyPane/SPRtePropertyPaneUtilities.js ***!
  \*****************************************************************************************/
/*! exports provided: SPRtePropertyPaneUtilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPRtePropertyPaneUtilities", function() { return SPRtePropertyPaneUtilities; });
var SPRtePropertyPaneUtilities = /** @class */ (function () {
    function SPRtePropertyPaneUtilities() {
    }
    SPRtePropertyPaneUtilities.isColorTransparent = function (previewColor) {
        return previewColor === 'rgba(0, 0, 0, 0)' || previewColor === 'transparent';
    };
    return SPRtePropertyPaneUtilities;
}());



/***/ }),

/***/ "8uA0":
/*!**************************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/PropertyPane/SPRtePropertyPaneButton.module.scss.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./SPRtePropertyPaneButton.module.css */ "ow4o");
var styles = {
    sprtePropertyPaneButton: 'sprtePropertyPaneButton_ded7ec99',
    iconButton: 'iconButton_ded7ec99',
    imageButton: 'imageButton_ded7ec99',
    tableButtonInPane: 'tableButtonInPane_ded7ec99',
    sprtePropertyPaneButtonActive: 'sprtePropertyPaneButtonActive_ded7ec99',
    textButton: 'textButton_ded7ec99',
    disabled: 'disabled_ded7ec99',
    sprtePropertyPaneButtonImage: 'sprtePropertyPaneButtonImage_ded7ec99'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "EGp2":
/*!*******************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/PropertyPane/SPRteColorPicker.module.scss.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./SPRteColorPicker.module.css */ "bh0f");
var styles = {
    pickerCallout: 'pickerCallout_080ef78c',
    pickerLabel: 'pickerLabel_080ef78c',
    isRTL: 'isRTL_080ef78c',
    buttonLabel: 'buttonLabel_080ef78c',
    previewSvg: 'previewSvg_080ef78c',
    border: 'border_080ef78c',
    defaultSvg: 'defaultSvg_080ef78c',
    fillDefaultColor: 'fillDefaultColor_080ef78c',
    fillThemeColor: 'fillThemeColor_080ef78c',
    selected: 'selected_080ef78c',
    colorPickerButton: 'colorPickerButton_080ef78c',
    previewRectangle: 'previewRectangle_080ef78c',
    previewIcon: 'previewIcon_080ef78c'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "GlrF":
/*!*******************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/tableIcons/TableIcons.module.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./TableIcons.module.css */ "vfXv");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "Kw/A":
/*!***********************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/tableIcons/TableIcons.js ***!
  \***********************************************************************/
/*! exports provided: TableIcons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableIcons", function() { return TableIcons; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TableIcons.module.scss */ "QcUK");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);



var TableIcons = /** @class */ (function () {
    function TableIcons() {
    }
    /**
     * For theming, importing the SVGs as separate SVG files doesn't work because that makes it render as
     * its own document, and styling can't cross document boundaries. For this reason, we need to use inline SVGs
     */
    TableIcons.getSvgFromSrc = function (imageSrc) {
        switch (imageSrc) {
            case 'deleteColumn.svg':
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themeableSvgTableIcon, xmlns: 'http://www.w3.org/2000/svg', viewBox: '-19988 21347 28 33' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { id: 'Table', transform: 'translate(-21036.9 20446)' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls1, transform: 'translate(1057.4 915)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5, width: '10', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '9', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls2, transform: 'translate(1048.9 906)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5, width: '10', height: '28' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '9', height: '27' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3, transform: 'translate(1057.9 929) rotate(-90)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3, width: '28', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '27', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls2, transform: 'translate(1066.9 906)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5, width: '10', height: '28' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '9', height: '27' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls4, d: 'M-2.837,0V2.748H-5.581v.516h2.744V6h.512V3.264H.419V2.748H-2.325V0Z', transform: 'translate(1066.591 905.704) rotate(45)' }))));
            case 'deleteRow.svg':
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themeableSvgTableIcon, xmlns: 'http://www.w3.org/2000/svg', viewBox: '-20039 21352 33 28' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { id: 'Table', transform: 'translate(-19105 20303.6) rotate(90)' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls1, transform: 'translate(1057.4 915)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5, width: '10', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '9', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls1, transform: 'translate(1066.4 906)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5, width: '10', height: '28' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '9', height: '27' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls2, transform: 'translate(1048.4 906)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5, width: '10', height: '28' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '9', height: '27' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3, transform: 'translate(1057.4 929) rotate(-90)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5, width: '28', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '27', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls4, d: 'M-2.837,0V2.748H-5.581v.516h2.744V6h.512V3.264H.419V2.748H-2.325V0Z', transform: 'translate(1066.347 905.704) rotate(45)' }))));
            case 'deleteTable.svg':
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themeableSvgTableIcon, xmlns: 'http://www.w3.org/2000/svg', viewBox: '-19947 21352 28 28' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { id: 'Table', transform: 'translate(-19013 20303.6) rotate(90)' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls1), d: 'M.5.5H27.379V9.667H.5Z', transform: 'translate(1048.4 914.917)' }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls2), width: '28', height: '27', transform: 'translate(1048.4 906)' }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3), transform: 'translate(1048.4 915)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5), width: '10', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6), x: '0.5', y: '0.5', width: '9', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3), transform: 'translate(1048.4 906)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5), width: '10', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6), x: '0.5', y: '0.5', width: '9', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3), transform: 'translate(1057.4 915)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5), width: '10', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6), x: '0.5', y: '0.5', width: '9', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3), transform: 'translate(1057.4 906)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5), width: '10', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6), x: '0.5', y: '0.5', width: '9', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3), transform: 'translate(1066.4 915)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5), width: '10', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6), x: '0.5', y: '0.5', width: '9', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3), transform: 'translate(1066.4 906)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5), width: '10', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6), x: '0.5', y: '0.5', width: '9', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3), transform: 'translate(1048.4 924)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5), width: '10', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6), x: '0.5', y: '0.5', width: '9', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3), transform: 'translate(1057.4 924)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5), width: '10', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6), x: '0.5', y: '0.5', width: '9', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3), transform: 'translate(1066.4 924)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5), width: '10', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6), x: '0.5', y: '0.5', width: '9', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTable, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls4), d: 'M-2.837,0V2.748H-5.581v.516h2.744V6h.512V3.264H.419V2.748H-2.325V0Z', transform: 'translate(1075.091 910.961) rotate(45)' }))));
            case 'insertRowAbove.svg':
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themeableSvgTableIcon, xmlns: 'http://www.w3.org/2000/svg', viewBox: '-20219 21352 28 28' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { id: 'Table', transform: 'translate(-21267.4 20446)' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls1, d: 'M.5.5H27.379V9.667H.5Z', transform: 'translate(1048.4 914.917)' }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls2, transform: 'translate(1048.4 924)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5, width: '28', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '27', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3, transform: 'translate(1048.4 906)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5, width: '28', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '27', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls4, d: 'M-2.837,0V2.748H-5.581v.516h2.744V6h.512V3.264H.419V2.748H-2.325V0Z', transform: 'translate(1064.981 908)' }))));
            case 'insertRowBelow.svg':
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themeableSvgTableIcon, xmlns: 'http://www.w3.org/2000/svg', viewBox: '-20171 21352 28 28' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { id: 'Table', transform: 'translate(-19094.6 22286) rotate(180)' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls1, d: 'M.5.5H27.379V9.667H.5Z', transform: 'translate(1048.4 914.917)' }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls2, transform: 'translate(1048.4 924)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5, width: '28', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '27', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3, transform: 'translate(1048.4 906)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5, width: '28', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '27', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls4, d: 'M-2.837,0V2.748H-5.581v.516h2.744V6h.512V3.264H.419V2.748H-2.325V0Z', transform: 'translate(1064.981 908)' }))));
            case 'insertColumnLeft.svg':
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themeableSvgTableIcon, xmlns: 'http://www.w3.org/2000/svg', viewBox: '-20128 21352 28 28' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { id: 'Table', transform: 'translate(-21034 22428.4) rotate(-90)' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls1, d: 'M.5.5H27.379V9.667H.5Z', transform: 'translate(1048.4 914.917)' }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls1, transform: 'translate(1048.4 924)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5, width: '28', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '27', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3, transform: 'translate(1048.4 906)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5, width: '28', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '27', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls4, d: 'M-2.837,0V2.748H-5.581v.516h2.744V6h.512V3.264H.419V2.748H-2.325V0Z', transform: 'translate(1064.981 908)' }))));
            case 'insertColumnRight.svg':
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themeableSvgTableIcon, xmlns: 'http://www.w3.org/2000/svg', viewBox: '-20085 21352 28 28' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { id: 'Table', transform: 'translate(-19151 20303.6) rotate(90)' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls1, d: 'M.5.5H27.379V9.667H.5Z', transform: 'translate(1048.4 914.917)' }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls2, transform: 'translate(1048.4 924)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5, width: '28', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '27', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls3, transform: 'translate(1048.4 906)' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls5, width: '28', height: '10' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls6, x: '0.5', y: '0.5', width: '27', height: '9' })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cls4, d: 'M-2.837,0V2.748H-5.581v.516h2.744V6h.512V3.264H.419V2.748H-2.325V0Z', transform: 'translate(1064.981 908)' }))));
            case 'simpleTableStyleNeutral.svg':
                return TableIcons.simpleTableIcon(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].neutralPrimaryIcon);
            case 'borderHeaderTableStyleNeutral.svg':
                return TableIcons.borderHeaderTableStyle(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].neutralPrimaryIcon);
            case 'filledHeaderTableStyleNeutral.svg':
                return TableIcons.filledHeaderTableStyle(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].neutralPrimaryIcon);
            case 'bandedRowTableStyleNeutral.svg':
                return TableIcons.bandedRowTableStyle(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].neutralPrimaryIcon, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].neutralRows);
            case 'bandedRowColumnTableStyleNeutral.svg':
                return TableIcons.bandedRowColumnTableStyle(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].neutralPrimaryIcon, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].neutralRows, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].neutralLeftColumn);
            case 'simpleTableStyleTheme.svg':
                return TableIcons.simpleTableIcon(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themePrimaryIcon);
            case 'borderHeaderTableStyleTheme.svg':
                return TableIcons.borderHeaderTableStyle(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themePrimaryIcon);
            case 'filledHeaderTableStyleTheme.svg':
                return TableIcons.filledHeaderTableStyle(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themePrimaryIcon);
            case 'bandedRowTableStyleTheme.svg':
                return TableIcons.bandedRowTableStyle(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themePrimaryIcon, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themeRows);
            case 'bandedRowColumnTableStyleTheme.svg':
                return TableIcons.bandedRowColumnTableStyle(_TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themePrimaryIcon, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themeRows, _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themeLeftColumn);
            default:
                return false;
        }
    };
    TableIcons.simpleTableIcon = function (className) {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { xmlns: 'http://www.w3.org/2000/svg', x: '0px', y: '0px', viewBox: '0 0 48 48', className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themeableSvgTableIcon },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: className, 
                    /* tslint:disable:max-line-length */
                    d: 'M0,0v11.5v1v11v1v11v1V48h48V36.5v-1v-11v-1v-11v-1V0H0z M17,35.5v-11h15v11H17z M32,36.5V47H17V36.5H32zM17,23.5v-11h15v11H17z M17,11.5V1h15v10.5H17z M1,1h15v10.5H1V1z M1,12.5h15v11H1V12.5z M1,24.5h15v11H1V24.5z M1,36.5h15V47H1V36.5z M47,47H33V36.5h14V47z M47,35.5H33v-11h14V35.5z M47,23.5H33v-11h14V23.5z M33,11.5V1h14v10.5H33z' }))));
    };
    TableIcons.borderHeaderTableStyle = function (className) {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { xmlns: 'http://www.w3.org/2000/svg', x: '0px', y: '0px', viewBox: '0 0 48 48', className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themeableSvgTableIcon },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: className, 
                    /* tslint:disable:max-line-length */
                    d: 'M33,0h-1H17h-1H0v12v11.5v1v11v1V48h48V36.5v-1v-11v-1V12V0H33z M47,1v10H33V1H47z M32,1v10H17V1H32z M17,35.5v-11h15v11H17z M32,36.5V47H17V36.5H32z M17,23.5V13h15v10.5H17z M1,1h15v10H1V1z M1,13h15v10.5H1V13z M1,24.5h15v11H1V24.5zM1,36.5h15V47H1V36.5z M47,47H33V36.5h14V47z M47,35.5H33v-11h14V35.5z M33,23.5V13h14v10.5H33z' }))));
    };
    TableIcons.filledHeaderTableStyle = function (className) {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { xmlns: 'http://www.w3.org/2000/svg', x: '0px', y: '0px', viewBox: '0 0 48 48', className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themeableSvgTableIcon },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: className, 
                    /* tslint:disable:max-line-length */
                    d: 'M48,12V0H0v12h0v11.5v1v11v1V48h48V36.5v-1v-11v-1L48,12L48,12z M17,35.5v-11h15v11H17z M32,36.5V47H17V36.5H32z M17,23.5V13h15v10.5H17z M1,13h15v10.5H1V13z M1,24.5h15v11H1V24.5z M1,36.5h15V47H1V36.5z M47,47H33V36.5h14V47z M47,35.5H33v-11h14V35.5z M33,23.5V13h14v10.5H33z' }))));
    };
    TableIcons.bandedRowTableStyle = function (primaryClassName, rowClassName) {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { xmlns: 'http://www.w3.org/2000/svg', x: '0px', y: '0px', viewBox: '0 0 48 48', className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themeableSvgTableIcon },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { x: '1', y: '36.5', className: rowClassName, width: '46', height: '11' }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { x: '1', y: '13', className: rowClassName, width: '46', height: '11' }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: primaryClassName, 
                    /* tslint:disable:max-line-length */
                    d: 'M48,12V0H0v12h0v11.5v1v11v1V48h48V36.5v-1v-11v-1L48,12L48,12z M17,35.5v-11h15v11H17z M32,36.5V47H17V36.5H32z M17,23.5V13h15v10.5H17z M1,13h15v10.5H1V13z M1,24.5h15v11H1V24.5z M1,36.5h15V47H1V36.5z M47,47H33V36.5h14V47z M47,35.5H33v-11h14V35.5z M33,23.5V13h14v10.5H33z' }))));
    };
    TableIcons.bandedRowColumnTableStyle = function (primaryClassName, rowClassName, columnClassName) {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { xmlns: 'http://www.w3.org/2000/svg', x: '0px', y: '0px', viewBox: '0 0 48 48', className: _TableIcons_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].themeableSvgTableIcon },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { x: '16.9', y: '36.5', className: rowClassName, width: '30.1', height: '10.5' }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { x: '17', y: '13', className: rowClassName, width: '30', height: '11' }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { x: '1', y: '13', className: columnClassName, width: '15', height: '34' }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { className: primaryClassName, 
                    /* tslint:disable:max-line-length */
                    d: 'M48,12V0H0v12h0v11.5v1v11v1V48h48V36.5v-1v-11v-1L48,12L48,12z M17,35.5v-11h15v11H17z M32,36.5V47H17V36.5H32z M17,23.5V13h15v10.5H17z M1,13h15v10.5H1V13z M1,24.5h15v11H1V24.5z M1,36.5h15V47H1V36.5z M47,47H33V36.5h14V47z M47,35.5H33v-11h14V35.5z M33,23.5V13h14v10.5H33z' }))));
    };
    return TableIcons;
}());



/***/ }),

/***/ "QcUK":
/*!***********************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/tableIcons/TableIcons.module.scss.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./TableIcons.module.css */ "GlrF");
var styles = {
    themeableSvgTableIcon: 'themeableSvgTableIcon_90f184eb',
    cls1: 'cls1_90f184eb',
    cls6: 'cls6_90f184eb',
    cls2: 'cls2_90f184eb',
    cls3: 'cls3_90f184eb',
    cls4: 'cls4_90f184eb',
    cls5: 'cls5_90f184eb',
    deleteTable: 'deleteTable_90f184eb',
    neutralPrimaryIcon: 'neutralPrimaryIcon_90f184eb',
    neutralRows: 'neutralRows_90f184eb',
    neutralLeftColumn: 'neutralLeftColumn_90f184eb',
    themePrimaryIcon: 'themePrimaryIcon_90f184eb',
    themeRows: 'themeRows_90f184eb',
    themeLeftColumn: 'themeLeftColumn_90f184eb'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "YAWW":
/*!*******************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/PropertyPane/SPRteColorGroups.js ***!
  \*******************************************************************************/
/*! exports provided: SPRteColorGroups */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPRteColorGroups", function() { return SPRteColorGroups; });
/* harmony import */ var _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SPRtePropertyPane.resx */ "o5Yi");

var SPRteColorGroups = /** @class */ (function () {
    function SPRteColorGroups() {
    }
    SPRteColorGroups.getSelectedColor = function (colors, selectedColor) {
        var filteredArray = colors.filter(function (colorProp) { return colorProp.color === selectedColor; });
        return filteredArray[0] && filteredArray[0].color;
    };
    // This Map is required because we use classes for font colors instead of inline-style
    // This gives meaningful names to classes
    SPRteColorGroups.buildFontColorMap = function (theme) {
        var palette = theme.palette;
        return new Map([
            [palette.redDark, 'RedDark'],
            [palette.red, 'Red'],
            [palette.yellow, 'Yellow'],
            [palette.yellowLight, 'YellowLight'],
            [palette.greenLight, 'GreenLight'],
            [palette.green, 'Green'],
            [palette.blueLight, 'BlueLight'],
            [palette.blue, 'Blue'],
            [palette.blueDark, 'BlueDark'],
            [palette.purple, 'Purple'],
            [palette.neutralPrimary, 'NeutralPrimary'],
            [palette.neutralSecondary, 'NeutralSecondary'],
            [palette.neutralTertiary, 'NeutralTertiary'],
            [palette.neutralDark, 'NeutralDark'],
            [palette.neutralPrimaryAlt, 'NeutralPrimaryAlt'],
            [palette.themeDark, 'ThemeDark'],
            [palette.themeDarker, 'ThemeDarker'],
            [palette.themeDarkAlt, 'ThemeDarkAlt'],
            [palette.themePrimary, 'ThemePrimary'],
            [palette.themeSecondary, 'ThemeSecondary']
        ] /* fix this typecast, VSO:397687 */);
    };
    Object.defineProperty(SPRteColorGroups, "HighlightColorMap", {
        // This Map is required because we use classes for background colors instead of inline-style
        // This gives meaningful names to classes
        get: function () {
            return new Map([
                ["#FFFF00" /* Yellow */, 'Yellow'],
                ["#00FF00" /* Green */, 'Green'],
                ["#00FFFF" /* Aqua */, 'Aqua'],
                ["#FF00FF" /* Magenta */, 'Magenta'],
                ["#0000FF" /* Blue */, 'Blue'],
                ["#FF0000" /* Red */, 'Red'],
                ["#000080" /* DarkBlue */, 'DarkBlue'],
                ["#008080" /* Teal */, 'Teal'],
                ["#008000" /* DarkGreen */, 'DarkGreen'],
                ["#800080" /* Purple */, 'Purple'],
                ["#800000" /* Maroon */, 'Maroon'],
                ["#808000" /* Gold */, 'Gold'],
                ["#808080" /* DarkGrey */, 'DarkGrey'],
                ["#C0C0C0" /* Grey */, 'Grey'],
                ["#000000" /* Black */, 'Black']
            ] /* fix this typecast, VSO:397687 */);
        },
        enumerable: true,
        configurable: true
    });
    SPRteColorGroups.standardColorGroup = function (theme) {
        var palette = theme.palette;
        var standardColorGroup = {
            groupText: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].StandardColorLabel,
            groupColors: [
                { id: palette.redDark, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].RedDarkLabel, color: palette.redDark },
                { id: palette.red, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].RedLabel, color: palette.red },
                { id: palette.yellow, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].OrangeLabel, color: palette.yellow },
                { id: palette.yellowLight, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].YellowLabel, color: palette.yellowLight },
                { id: palette.greenLight, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].GreenLightLabel, color: palette.greenLight },
                { id: palette.green, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].GreenLabel, color: palette.green },
                { id: palette.blueLight, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].BlueLightLabel, color: palette.blueLight },
                { id: palette.blue, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].BlueLabel, color: palette.blue },
                { id: palette.blueDark, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].BlueDarkLabel, color: palette.blueDark },
                { id: palette.purple, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].PurpleLabel, color: palette.purple }
            ]
        };
        return standardColorGroup;
    };
    SPRteColorGroups.themeColorGroup = function (theme) {
        var palette = theme.palette;
        var themeColorGroup = {
            groupText: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ThemeColorGroupLabel,
            groupColors: [
                { id: palette.themeDarker, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ThemeDarkerLabel, color: palette.themeDarker },
                { id: palette.themeDark, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ThemeDarkLabel, color: palette.themeDark },
                { id: palette.themeDarkAlt, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ThemeDarkAltLabel, color: palette.themeDarkAlt },
                { id: palette.themePrimary, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ThemePrimaryLabel, color: palette.themePrimary },
                { id: palette.themeSecondary, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].ThemeSecondaryLabel, color: palette.themeSecondary },
                { id: palette.neutralTertiary, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].NeutralTertiaryLabel, color: palette.neutralTertiary },
                { id: palette.neutralSecondary, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].NeutralSecondaryLabel, color: palette.neutralSecondary },
                { id: palette.neutralPrimaryAlt, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].NeutralPrimaryAltLabel, color: palette.neutralPrimaryAlt },
                { id: palette.neutralPrimary, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].NeutralPrimaryLabel, color: palette.neutralPrimary },
                { id: palette.neutralDark, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].NeutralDarkLabel, color: palette.neutralDark }
            ]
        };
        return themeColorGroup;
    };
    SPRteColorGroups.highlightColorGroup = {
        groupText: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].HightlightColorsLabel,
        groupColors: [
            { id: "#FFFF00" /* Yellow */, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].YellowLabel, color: "#FFFF00" /* Yellow */ },
            { id: "#00FF00" /* Green */, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].GreenLabel, color: "#00FF00" /* Green */ },
            { id: "#00FFFF" /* Aqua */, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].AquaLabel, color: "#00FFFF" /* Aqua */ },
            { id: "#FF00FF" /* Magenta */, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].MagentaLabel, color: "#FF00FF" /* Magenta */ },
            { id: "#0000FF" /* Blue */, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].BlueLabel, color: "#0000FF" /* Blue */ },
            { id: "#FF0000" /* Red */, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].RedLabel, color: "#FF0000" /* Red */ },
            { id: "#000080" /* DarkBlue */, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].BlueDarkLabel, color: "#000080" /* DarkBlue */ },
            { id: "#008080" /* Teal */, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].TealLabel, color: "#008080" /* Teal */ },
            { id: "#008000" /* DarkGreen */, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].GreenDarkLabel, color: "#008000" /* DarkGreen */ },
            { id: "#800080" /* Purple */, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].PurpleLabel, color: "#800080" /* Purple */ },
            { id: "#800000" /* Maroon */, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].MaroonLabel, color: "#800000" /* Maroon */ },
            { id: "#808000" /* Gold */, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].GoldLabel, color: "#808000" /* Gold */ },
            { id: "#808080" /* DarkGrey */, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].DarkGreyLabel, color: "#808080" /* DarkGrey */ },
            { id: "#C0C0C0" /* Grey */, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].GreyLabel, color: "#C0C0C0" /* Grey */ },
            { id: "#000000" /* Black */, label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_0__["default"].BlackLabel, color: "#000000" /* Black */ }
        ]
    };
    return SPRteColorGroups;
}());



/***/ }),

/***/ "ai5L":
/*!*******************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/PropertyPane/SPRteColorPicker.js ***!
  \*******************************************************************************/
/*! exports provided: SPRteColorPicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPRteColorPicker", function() { return SPRteColorPicker; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SPRteColorPicker.module.scss */ "EGp2");
/* harmony import */ var _ColorPickerGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ColorPickerGroup */ "75Tl");
/* harmony import */ var _SPRteColorGroups__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SPRteColorGroups */ "YAWW");
/* harmony import */ var _SPRtePropertyPaneUtilities__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SPRtePropertyPaneUtilities */ "8kZZ");
/* harmony import */ var _SPRteColorPickerStyles_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SPRteColorPickerStyles.styles */ "fBXD");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file SPRteColorPicker.tsx
 */











/**
 * SPRteColorPicker as color picker component
 */
var SPRteColorPicker = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SPRteColorPicker, _super);
    /**
     * Constructs an instance of SPRteColorPicker
     */
    function SPRteColorPicker(props) {
        var _this = _super.call(this, props) || this;
        _this._buttonContainerRef = react__WEBPACK_IMPORTED_MODULE_2__["createRef"]();
        _this._colorPickerGroups = [];
        _this._handleColorChanged = function (id, color) {
            _this.props.onColorChanged(id, color, _this.props.theme);
        };
        _this._handleShowMenuClicked = function () {
            _this.setState({
                isCalloutVisible: !_this.state.isCalloutVisible
            });
        };
        _this._handleCalloutDismiss = function () {
            _this.setState({
                isCalloutVisible: false
            });
        };
        _this.state = {
            isCalloutVisible: false
        };
        _this._setColorPickerGroups();
        return _this;
    }
    SPRteColorPicker.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var selectedColor = this.props.selectedColor;
        return (selectedColor !== nextProps.selectedColor ||
            this.state.isCalloutVisible !== nextState.isCalloutVisible ||
            !Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__["isEqual"])(nextProps.colorPickerGroups, this.props.colorPickerGroups));
    };
    SPRteColorPicker.prototype.UNSAFE_componentWillUpdate = function (prevProps, prevState) {
        this._setColorPickerGroups();
    };
    /**
     * Renders SPRtColorPicker
     */
    SPRteColorPicker.prototype.render = function () {
        var _a, _b, _c, _d;
        var _e = this.props, buttonLabel = _e.buttonLabel, switchToDefaultColor = _e.switchToDefaultColor, defaultButtonLabel = _e.defaultButtonLabel, fillThemeColor = _e.fillThemeColor, automationId = _e.automationId;
        var isCalloutVisible = this.state.isCalloutVisible;
        var previewSvgCss = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].previewSvg, (_a = {},
            _a[_SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].border] = this.props.previewColor && _SPRtePropertyPaneUtilities__WEBPACK_IMPORTED_MODULE_8__["SPRtePropertyPaneUtilities"].isColorTransparent(this.props.previewColor),
            _a));
        var tooltipCalloutProps = { gapSpace: 0 };
        var defaultSvgClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].previewSvg, _SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].defaultSvg, this._themedClass, (_b = {}, _b[_SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selected] = !this._selectedColor, _b), (_c = {}, _c[_SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].fillDefaultColor] = !fillThemeColor, _c), (_d = {}, _d[_SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].fillThemeColor] = fillThemeColor && !this._themedClass, _d));
        var colorPickerButtonId = automationId + "-propertyPaneButtonToolTip";
        var defaultButtonId = automationId + "-defaultButtonTooltip";
        var pickerCalloutClassName = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["_BrowserDetection"].getBrowserInformation().browser === 5 /* Safari */ ? undefined : _SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].pickerCallout;
        var defaultColorButton = react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["TooltipHost"], { content: defaultButtonLabel, id: defaultButtonId, calloutProps: tooltipCalloutProps },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["Button"], { className: _SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].colorPickerButton, onClick: switchToDefaultColor, "data-automation-id": automationId + "-defaultButton", "aria-describedby": defaultButtonId, "aria-expanded": isCalloutVisible },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("svg", { className: defaultSvgClassName, viewBox: '0 0 20 20' }, this._previewSvgRectangle),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: _SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].buttonLabel }, defaultButtonLabel)));
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { ref: this._buttonContainerRef },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["TooltipHost"], { content: buttonLabel, id: colorPickerButtonId, calloutProps: tooltipCalloutProps },
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["Button"], { className: _SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].colorPickerButton, onClick: this._handleShowMenuClicked, "data-automation-id": automationId + "-propertyPaneButton", "aria-describedby": colorPickerButtonId, "aria-expanded": isCalloutVisible },
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("svg", { className: previewSvgCss, fill: this.props.previewColor, viewBox: '0 0 20 20' }, this._previewSvgRectangle),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: _SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].buttonLabel }, buttonLabel),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["Icon"], { className: _SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].previewIcon, iconName: 'CaretDownSolid8', role: 'presentation' })))),
            isCalloutVisible && (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["FocusTrapCallout"], { className: pickerCalloutClassName, directionalHint: _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].bottomLeftEdge, gapSpace: 0, isBeakVisible: false, onDismiss: this._handleCalloutDismiss, role: 'alertdialog', setInitialFocus: true, target: this._buttonContainer, focusTrapProps: { forceFocusInsideTrap: false, isClickableOutsideFocusTrap: true } },
                defaultColorButton,
                this._colorPickerGroups))));
    };
    Object.defineProperty(SPRteColorPicker.prototype, "_buttonContainer", {
        get: function () {
            return this._buttonContainerRef.current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRteColorPicker.prototype, "_themedClass", {
        get: function () {
            if (this.props.emphasisTheme) {
                var classNames = _SPRteColorPickerStyles_styles__WEBPACK_IMPORTED_MODULE_9__["SPRteColorPickerStyles"].getClassNames({
                    root: _SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].defaultSvg,
                    emphasisTheme: this.props.emphasisTheme
                });
                return classNames && classNames.root;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRteColorPicker.prototype, "_previewSvgRectangle", {
        get: function () {
            return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("rect", { className: _SPRteColorPicker_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].previewRectangle, width: '100%', height: '100%' });
        },
        enumerable: true,
        configurable: true
    });
    SPRteColorPicker.prototype._setColorPickerGroups = function () {
        var _a = this.props, colorPickerGroups = _a.colorPickerGroups, theme = _a.theme, selectedColor = _a.selectedColor;
        this._colorPickerGroups = [];
        var dataAutomationId;
        for (var i = 0; i < colorPickerGroups.length; i++) {
            var colorPickerGroup = void 0;
            switch (colorPickerGroups[i]) {
                case "standardColors" /* StandardColors */:
                    colorPickerGroup = theme ? _SPRteColorGroups__WEBPACK_IMPORTED_MODULE_7__["SPRteColorGroups"].standardColorGroup(theme) : undefined;
                    dataAutomationId = 'Standard';
                    break;
                case "themeColors" /* ThemeColors */:
                    colorPickerGroup = theme ? _SPRteColorGroups__WEBPACK_IMPORTED_MODULE_7__["SPRteColorGroups"].themeColorGroup(theme) : undefined;
                    dataAutomationId = 'Theme';
                    break;
                case "highlightColors" /* HighlightColors */:
                    colorPickerGroup = _SPRteColorGroups__WEBPACK_IMPORTED_MODULE_7__["SPRteColorGroups"].highlightColorGroup;
                    dataAutomationId = 'Highlight';
                    break;
            }
            if (colorPickerGroup) {
                // This will return undefined if the selected color is not part of any group i.e. default color
                var color = _SPRteColorGroups__WEBPACK_IMPORTED_MODULE_7__["SPRteColorGroups"].getSelectedColor(colorPickerGroup.groupColors, selectedColor);
                if (color) {
                    this._selectedColor = color;
                }
                this._colorPickerGroups.push(this._getColorPickerGroup(colorPickerGroup, color, dataAutomationId));
            }
        }
    };
    SPRteColorPicker.prototype._getColorPickerGroup = function (colorPickerGroup, color, dataAutomationId) {
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_ColorPickerGroup__WEBPACK_IMPORTED_MODULE_6__["ColorPickerGroup"], { dataAutomationId: dataAutomationId, key: colorPickerGroup.groupText, groupText: colorPickerGroup.groupText, groupColors: colorPickerGroup.groupColors, onColorChanged: this._handleColorChanged, selectedColor: color }));
    };
    SPRteColorPicker = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["customizable"])('SPRteColorPicker', ['theme'])
    ], SPRteColorPicker);
    return SPRteColorPicker;
}(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["BaseComponent"]));



/***/ }),

/***/ "bh0f":
/*!***************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/PropertyPane/SPRteColorPicker.module.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./SPRteColorPicker.module.css */ "27As");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "fBXD":
/*!********************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/PropertyPane/SPRteColorPickerStyles.styles.js ***!
  \********************************************************************************************/
/*! exports provided: SPRteColorPickerStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPRteColorPickerStyles", function() { return SPRteColorPickerStyles; });
/* harmony import */ var _common_StyleHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../common/StyleHelpers */ "wFVB");

var SPRteColorPickerStyles = /** @class */ (function () {
    function SPRteColorPickerStyles() {
    }
    SPRteColorPickerStyles.getClassNames = function (props) {
        return Object(_common_StyleHelpers__WEBPACK_IMPORTED_MODULE_0__["getClassNames"])(SPRteColorPickerStyles._getStyles, props);
    };
    SPRteColorPickerStyles._getStyles = function (props) {
        var emphasisTheme = props.emphasisTheme, root = props.root;
        var semanticColors = emphasisTheme.semanticColors;
        return {
            root: [
                root,
                {
                    fill: semanticColors.bodyText
                }
            ]
        };
    };
    return SPRteColorPickerStyles;
}());



/***/ }),

/***/ "lruL":
/*!***************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/PropertyPane/SPRtePropertyPaneControl.js ***!
  \***************************************************************************************/
/*! exports provided: SPRtePropertyPaneControl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPRtePropertyPaneControl", function() { return SPRtePropertyPaneControl; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-webpart-base */ "br4S");
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ms/sp-rte */ "RX6m");
/* harmony import */ var _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _tableIcons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tableIcons */ "/+z5");
/* harmony import */ var _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SPRtePropertyPane.resx */ "o5Yi");
/* harmony import */ var _common_ControlsInOneRow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../common/ControlsInOneRow */ "m0cW");
/* harmony import */ var _SPRteColorPicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SPRteColorPicker */ "ai5L");
/* harmony import */ var _SPRtePropertyPaneButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SPRtePropertyPaneButton */ "2MlO");
/* harmony import */ var _SPRteColorGroups__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SPRteColorGroups */ "YAWW");
/* harmony import */ var _common_Flights__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../common/Flights */ "qRiB");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file SPRtePropertyPaneControl.tsx
 */














var FontStyle;
(function (FontStyle) {
    FontStyle["NormalText"] = "normalText";
    FontStyle["H2"] = "h2";
    FontStyle["H3"] = "h3";
    FontStyle["H4"] = "h4";
    FontStyle["Blockquote"] = "blockquote";
    FontStyle["Pre"] = "pre";
})(FontStyle || (FontStyle = {}));
var PROPERTY_PATH = new Set(['fontSize', 'fontStyle']);
var TABLE_BUTTON_CLASS = 'tableButtonInPane';
/**
 * SPRtePropertyPaneControl to enable property pane settings on RTE.
 */
var SPRtePropertyPaneControl = /** @class */ (function () {
    function SPRtePropertyPaneControl(sprte) {
        var _this = this;
        this._handleFontColorChange = function (id, color, theme) {
            var formatHandler = _this._sprte.getFormatHandler(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].FontColor);
            if (formatHandler) {
                formatHandler({
                    format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].FontColor,
                    value: {
                        fontColor: _SPRteColorGroups__WEBPACK_IMPORTED_MODULE_11__["SPRteColorGroups"].buildFontColorMap(theme).get(id)
                    }
                });
            }
        };
        this._handleHighlightColorChange = function (id, color) {
            var formatHandler = _this._sprte.getFormatHandler(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].FontColor);
            if (formatHandler) {
                formatHandler({
                    format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].HighlightColor,
                    value: {
                        highlightColor: _SPRteColorGroups__WEBPACK_IMPORTED_MODULE_11__["SPRteColorGroups"].HighlightColorMap.get(color)
                    }
                });
            }
        };
        this._sprte = sprte;
        this._async = new _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["Async"](this);
        this._platform = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__["PlatformDetection"]();
    }
    SPRtePropertyPaneControl._getArrayOfElements = function (props, component) {
        return props.map(function (prop) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](component, prop); });
    };
    SPRtePropertyPaneControl._controlsInOneRow = function (props, component, spaceInBetween) {
        return Object(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__["PropertyPaneCustomField"])({
            key: 'ControlsInOneRow',
            onRender: function (element) {
                return react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_common_ControlsInOneRow__WEBPACK_IMPORTED_MODULE_8__["ControlsInOneRow"], { spaceInBetween: spaceInBetween }, SPRtePropertyPaneControl._getArrayOfElements(props, component)), element);
            }
        });
    };
    SPRtePropertyPaneControl._addTableButtonClassName = function (buttons) {
        return buttons.map(function (button) {
            button.className = TABLE_BUTTON_CLASS;
            return button;
        });
    };
    SPRtePropertyPaneControl.prototype._isPropertyPaneReactive = function () {
        return true;
    };
    /**
     * API to enable asynchronous loading of property pane related resources of a web part.
     */
    SPRtePropertyPaneControl.prototype._loadPropertyPaneResources = function () {
        /* no-op */
    };
    SPRtePropertyPaneControl.prototype._onPropertyPaneLifeCycleEvent = function (event) {
        if (event === 4 /* Closed */ || event === 3 /* Opened */) {
            this._sprte.handlePropertyPaneOpenOrClose();
        }
    };
    SPRtePropertyPaneControl.prototype._getPropertyPaneData = function () {
        return Promise.resolve({
            webPartId: this._sprte.props.control.id,
            title: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].RTESettingsText,
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
    SPRtePropertyPaneControl.prototype._onPropertyPaneFieldChanged = function (propertyPath, newValue) {
        var _this = this;
        if (this._platform.isEdge && PROPERTY_PATH.has(propertyPath)) {
            // In Edge, race condition exists between property pane drop down
            // and ckeditor, which causes stack overflow. Adding this timeout resolves
            // the issue.
            this._async.setTimeout(function () {
                _this._onFieldChanged(propertyPath, newValue);
            }, 0);
        }
        else {
            this._onFieldChanged(propertyPath, newValue);
        }
    };
    SPRtePropertyPaneControl.prototype._onFieldChanged = function (propertyPath, newValue) {
        if (propertyPath === 'fontSize') {
            var formatHandler = this._sprte.getFormatHandler(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].FontSize);
            if (formatHandler) {
                formatHandler({
                    format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].FontSize,
                    value: { fontSize: newValue }
                });
            }
        }
        else {
            var formatHandler = this._sprte.getFormatHandler(newValue);
            if (formatHandler) {
                formatHandler();
            }
        }
    };
    SPRtePropertyPaneControl.prototype._propertyPaneButton = function (formatKey, automationId, groupLabel, value, imageSrc, disabled, className) {
        // todo#661360 Canvas: Fix workaround left-over when we enable strict null checks
        var button = this._sprte.config.formats.get(formatKey).button;
        var formatHandler = this._sprte.getFormatHandler(formatKey);
        return {
            ariaLabel: groupLabel ?
                _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__["StringHelper"].format(_SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].PropertyPaneButtonAriaLabel, groupLabel, button.title) : button.title,
            fabricIconKey: button.fabricIconKey,
            imageSrc: _tableIcons__WEBPACK_IMPORTED_MODULE_6__["TableIcons"].getSvgFromSrc(imageSrc),
            isActive: this._sprte.isFormatActive(formatKey),
            isDisabled: disabled,
            key: button.title,
            onClick: value && formatHandler ? function () { return formatHandler(value); } : formatHandler,
            text: !button.fabricIconKey && !button.imageSrc ? button.label : undefined,
            title: button.title,
            automationId: automationId
        };
    };
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_firstRowButtons", {
        get: function () {
            var clearFormattingButtonProps = {
                ariaLabel: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].FormattingBarClearFormattingButtonTitle,
                fabricIconKey: 'ClearFormatting',
                key: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].FormattingBarClearFormattingButtonTitle,
                onClick: this._sprte.getFormatHandler(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].ClearFormatting),
                title: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].FormattingBarClearFormattingButtonTitle,
                automationId: 'clearFormatting-button'
            };
            return _common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isPageUndoRedoFlightEnabled()
                ? [clearFormattingButtonProps]
                : [
                    this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].Undo, 'undo'),
                    this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].Redo, 'redo'),
                    clearFormattingButtonProps
                ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_styleCommandButtons", {
        get: function () {
            var buttons = [
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].Bold, 'bold'),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].Italic, 'italic'),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].Underline, 'underline'),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].Strike, 'strike'),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].Superscipt, 'superscript'),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].Subscript, 'subscript')
            ];
            return buttons;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_hyperlinkButtons", {
        get: function () {
            var buttons = [
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].Link, 'link'),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].UnLink, 'unlink', undefined, undefined /*value*/, SPRtePropertyPaneControl._noImgSrc, !this._sprte.isLinkSelected)
            ];
            return buttons;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_hyperLinkTipLabel", {
        get: function () {
            return Object(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__["PropertyPaneLabel"])('wikiLinkingLabel', {
                text: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].PropertyPaneWikiLinkingLabel
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_paragraphButtons", {
        get: function () {
            var buttons = [
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].AlignLeft, 'alignLeft', _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].ParagraphGroupText),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].AlignCenter, 'alignCenter', _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].ParagraphGroupText),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].AlignRight, 'alignRight', _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].ParagraphGroupText),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].Justify, 'justify', _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].ParagraphGroupText),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].Indent, 'indent', _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].ParagraphGroupText),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].Outdent, 'outdent', _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].ParagraphGroupText)
            ];
            return buttons;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_bulletButtons", {
        get: function () {
            var buttons = [
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].Bullet, 'bullet', _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].ParagraphGroupText),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].List, 'list', _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].ParagraphGroupText)
            ];
            return buttons;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_tableButton", {
        get: function () {
            var buttons = [
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].CustomTable, 'createTable', _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].TableGroup, {
                    format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].CustomTable,
                    value: {
                        customTable: {
                            rows: 3,
                            columns: 3
                        }
                    }
                }, SPRtePropertyPaneControl._noImgSrc, this._sprte.isTableContentsSelected)
            ];
            return buttons;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_tableOperationButtons", {
        get: function () {
            var buttons = [
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].RowInserBefore, 'insertRowAbove', undefined, { format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].RowInserBefore }),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].RowInsertAfter, 'insertRowBelow', undefined, { format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].RowInsertAfter }),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].ColumnInsertBefore, 'insertColumnLeft', undefined, { format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].ColumnInsertBefore }),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].ColumnInsertAfter, 'insertColumnRight', undefined, { format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].ColumnInsertAfter }),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].RowDelete, 'deleteRow', undefined, { format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].RowDelete }),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].ColumnDelete, 'deleteColumn', undefined, { format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].ColumnDelete }),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].TableCustomDelete, 'deleteTable', undefined, {
                    format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].TableCustomDelete
                })
            ];
            return SPRtePropertyPaneControl._addTableButtonClassName(buttons);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_tableStyleNeutralButtons", {
        get: function () {
            return this._tableStyleButtons("Neutral" /* Neutral */);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_tableStyleThemeButtons", {
        get: function () {
            return this._tableStyleButtons("Theme" /* Theme */);
        },
        enumerable: true,
        configurable: true
    });
    SPRtePropertyPaneControl.prototype._tableStyleButtons = function (styleColor) {
        var isTheme = styleColor === "Theme" /* Theme */;
        var buttons = [
            this._propertyPaneButton(isTheme ? _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].SimpleTableStyleTheme : _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].SimpleTableStyleNeutral, "simpleTableStyle" + styleColor, _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].TableStylesGroupLabel, {
                format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].TableStyle,
                value: {
                    tableStyle: {
                        tableStyle: "simpleTableStyle" /* SimpleTableStyle */,
                        styleColor: styleColor
                    }
                }
            }, "simpleTableStyle" + styleColor + ".svg"),
            this._propertyPaneButton(isTheme ? _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].BorderHeaderTableStyleTheme : _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].BorderHeaderTableStyleNeutral, "borderHeaderTableStyle" + styleColor, _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].TableStylesGroupLabel, {
                format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].TableStyle,
                value: {
                    tableStyle: {
                        tableStyle: "borderHeaderTableStyle" /* BorderHeaderTableStyle */,
                        styleColor: styleColor
                    }
                }
            }, "borderHeaderTableStyle" + styleColor + ".svg"),
            this._propertyPaneButton(isTheme ? _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].FilledHeaderTableStyleTheme : _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].FilledHeaderTableStyleNeutral, "filledHeaderTableStyle" + styleColor, _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].TableStylesGroupLabel, {
                format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].TableStyle,
                value: {
                    tableStyle: {
                        tableStyle: "filledHeaderTableStyle" /* FilledHeaderTableStyle */,
                        styleColor: styleColor
                    }
                }
            }, "filledHeaderTableStyle" + styleColor + ".svg"),
            this._propertyPaneButton(isTheme ? _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].BandedRowTableStyleTheme : _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].BandedRowTableStyleNeutral, "bandedRowTableStyle" + styleColor, _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].TableStylesGroupLabel, {
                format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].TableStyle,
                value: {
                    tableStyle: {
                        tableStyle: "bandedRowTableStyle" /* BandedRowTableStyle */,
                        styleColor: styleColor
                    }
                }
            }, "bandedRowTableStyle" + styleColor + ".svg"),
            this._propertyPaneButton(isTheme ? _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].BandedRowColumnTableStyleTheme : _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].BandedRowColumnTableStyleNeutral, "bandedRowColumnTableStyle" + styleColor, _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].TableStylesGroupLabel, {
                format: _ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].TableStyle,
                value: {
                    tableStyle: {
                        tableStyle: "bandedRowColumnTableStyle" /* BandedRowColumnTableStyle */,
                        styleColor: styleColor
                    }
                }
            }, "bandedRowColumnTableStyle" + styleColor + ".svg")
        ];
        return buttons;
    };
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_fontStyleDropDown", {
        get: function () {
            var selectedKey = 'normalText';
            for (var i = 0; i < SPRtePropertyPaneControl._fontStyleOptions.length; i++) {
                if (this._sprte.isFormatActive(SPRtePropertyPaneControl._fontStyleOptions[i].key)) {
                    selectedKey = SPRtePropertyPaneControl._fontStyleOptions[i].key;
                    break;
                }
            }
            return Object(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__["PropertyPaneDropdown"])('fontStyle', {
                label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].FontDropDownText,
                options: SPRtePropertyPaneControl._fontStyleOptions,
                selectedKey: selectedKey
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_fontSizeDropDown", {
        get: function () {
            return Object(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__["PropertyPaneDropdown"])('fontSize', {
                label: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].FontSizeDropDownLabel,
                options: _common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isFluentFlightEnabled() ? SPRtePropertyPaneControl._fluentFontSizeOptions
                    : SPRtePropertyPaneControl._fontSizeOptions,
                selectedKey: this._sprte.fontSizeStyle ? this._sprte.fontSizeStyle : ''
            });
        },
        enumerable: true,
        configurable: true
    });
    SPRtePropertyPaneControl.prototype._getColorPickerProps = function (colorPickerGroups, onColorChanged, buttonLabel, previewColor, switchToDefaultColor, defaultButtonLabel, selectedColor, automationId, fillThemeColor, emphasisTheme) {
        return {
            buttonLabel: buttonLabel,
            colorPickerGroups: colorPickerGroups,
            onColorChanged: onColorChanged,
            previewColor: previewColor,
            key: buttonLabel,
            switchToDefaultColor: switchToDefaultColor,
            defaultButtonLabel: defaultButtonLabel,
            selectedColor: selectedColor,
            fillThemeColor: fillThemeColor,
            automationId: automationId,
            emphasisTheme: emphasisTheme
        };
    };
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_colorPickers", {
        get: function () {
            var colorPickers = [];
            colorPickers.push(this._getColorPickerProps(["themeColors" /* ThemeColors */, "standardColors" /* StandardColors */], this._handleFontColorChange, _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].FontColorLabel, this._sprte.fontColor, this._sprte.removeFontColorFormat, _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].DefaultColorLabel, this._sprte.fontColor, 'fontColor', true, this._sprte.props.control.emphasisTheme));
            colorPickers.push(this._getColorPickerProps(["highlightColors" /* HighlightColors */], this._handleHighlightColorChange, _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].HightlightLabel, this._sprte.highlightColor, this._sprte.removeHighlightColor, _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].RemoveHighlightColor, this._sprte.highlightColor && this._sprte.highlightColor.toUpperCase(), 'highlightLabel'));
            return colorPickers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_alignTableButtons", {
        get: function () {
            var buttons = [
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].AlignTableLeft, 'alignTableLeft'),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].AlignTableCenter, 'alignTableCenter'),
                this._propertyPaneButton(_ms_sp_rte__WEBPACK_IMPORTED_MODULE_5__["Format"].AlignTableRight, 'alignTableRight')
            ];
            return SPRtePropertyPaneControl._addTableButtonClassName(buttons);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_tableGroupLabel", {
        get: function () {
            return _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].TableGroup;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRtePropertyPaneControl.prototype, "_shouldAddTableButtons", {
        get: function () {
            return Boolean(this._sprte.isTableContentsSelected);
        },
        enumerable: true,
        configurable: true
    });
    SPRtePropertyPaneControl.prototype._getProperyPanePages = function () {
        // tslint:disable-next-line: no-any
        var hyperLinkGroupFields = [SPRtePropertyPaneControl._controlsInOneRow(this._hyperlinkButtons, _SPRtePropertyPaneButton__WEBPACK_IMPORTED_MODULE_10__["SPRtePropertyPaneButton"])];
        if (_common_Flights__WEBPACK_IMPORTED_MODULE_12__["Flights"].isWikiFeatureFlightEnabled()) {
            hyperLinkGroupFields.push(this._hyperLinkTipLabel);
        }
        var groups = [
            {
                groupName: '',
                groupFields: [
                    SPRtePropertyPaneControl._controlsInOneRow(this._firstRowButtons, _SPRtePropertyPaneButton__WEBPACK_IMPORTED_MODULE_10__["SPRtePropertyPaneButton"]),
                    this._fontStyleDropDown,
                    this._fontSizeDropDown,
                    SPRtePropertyPaneControl._controlsInOneRow(this._styleCommandButtons, _SPRtePropertyPaneButton__WEBPACK_IMPORTED_MODULE_10__["SPRtePropertyPaneButton"]),
                    SPRtePropertyPaneControl._controlsInOneRow(this._colorPickers, _SPRteColorPicker__WEBPACK_IMPORTED_MODULE_9__["SPRteColorPicker"])
                ]
            },
            {
                groupName: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].ParagraphGroupText,
                groupFields: [
                    SPRtePropertyPaneControl._controlsInOneRow(this._paragraphButtons, _SPRtePropertyPaneButton__WEBPACK_IMPORTED_MODULE_10__["SPRtePropertyPaneButton"]),
                    SPRtePropertyPaneControl._controlsInOneRow(this._bulletButtons, _SPRtePropertyPaneButton__WEBPACK_IMPORTED_MODULE_10__["SPRtePropertyPaneButton"])
                ]
            },
            {
                groupName: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].HyperlinkGroupLabel,
                groupFields: hyperLinkGroupFields
            },
            {
                groupName: this._tableGroupLabel,
                groupFields: [SPRtePropertyPaneControl._controlsInOneRow(this._tableButton, _SPRtePropertyPaneButton__WEBPACK_IMPORTED_MODULE_10__["SPRtePropertyPaneButton"])]
            }
        ];
        if (this._shouldAddTableButtons) {
            groups.push({
                groupName: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].TableStylesGroupLabel,
                groupFields: [
                    SPRtePropertyPaneControl._controlsInOneRow(this._tableStyleNeutralButtons, _SPRtePropertyPaneButton__WEBPACK_IMPORTED_MODULE_10__["SPRtePropertyPaneButton"]),
                    SPRtePropertyPaneControl._controlsInOneRow(this._tableStyleThemeButtons, _SPRtePropertyPaneButton__WEBPACK_IMPORTED_MODULE_10__["SPRtePropertyPaneButton"])
                ]
            });
        }
        if (this._sprte.isTableContentsSelected) {
            groups.push({
                groupName: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].InsertAndDeleteGroupLabel,
                groupFields: [SPRtePropertyPaneControl._controlsInOneRow(this._tableOperationButtons, _SPRtePropertyPaneButton__WEBPACK_IMPORTED_MODULE_10__["SPRtePropertyPaneButton"])]
            });
        }
        if (this._shouldAddTableButtons) {
            groups.push({
                groupName: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].AlignTableGroupLabel,
                groupFields: [SPRtePropertyPaneControl._controlsInOneRow(this._alignTableButtons, _SPRtePropertyPaneButton__WEBPACK_IMPORTED_MODULE_10__["SPRtePropertyPaneButton"])]
            });
        }
        return [
            {
                groups: groups
            }
        ];
    };
    SPRtePropertyPaneControl._fontStyleOptions = [
        { key: FontStyle.NormalText, text: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].FormattingBarNormalTextButtonTitle },
        { key: FontStyle.H2, text: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].FormattingBarHeading2ButtonTitle },
        { key: FontStyle.H3, text: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].FormattingBarHeading3ButtonTitle },
        { key: FontStyle.H4, text: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].FormattingBarHeading4ButtonTitle },
        { key: FontStyle.Blockquote, text: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].FormattingBarQuoteButtonTitle },
        { key: FontStyle.Pre, text: _SPRtePropertyPane_resx__WEBPACK_IMPORTED_MODULE_7__["default"].FormattingBarPreButtonTitle }
    ];
    SPRtePropertyPaneControl._fontSizeOptions = [
        { key: "12" /* Small */, text: "12" /* Small */.toString() },
        { key: "14" /* Medium */, text: "14" /* Medium */.toString() },
        { key: "15" /* MediumPlus */, text: "15" /* MediumPlus */.toString() },
        { key: "17" /* Large */, text: "17" /* Large */.toString() },
        { key: "21" /* XLarge */, text: "21" /* XLarge */.toString() },
        { key: "24" /* XLargePlus */, text: "24" /* XLargePlus */.toString() },
        { key: "28" /* XxLarge */, text: "28" /* XxLarge */.toString() },
        { key: "32" /* XxxLarge */, text: "32" /* XxxLarge */.toString() },
        { key: "36" /* XxLargePlus */, text: "36" /* XxLargePlus */.toString() },
        { key: "42" /* Super */, text: "42" /* Super */.toString() }
    ];
    SPRtePropertyPaneControl._fluentFontSizeOptions = [
        { key: "10" /* XSmall */, text: "10" /* XSmall */.toString() },
        { key: "12" /* Small */, text: "12" /* Small */.toString() },
        { key: "14" /* Medium */, text: "14" /* Medium */.toString() },
        { key: "16" /* MediumPlus */, text: "16" /* MediumPlus */.toString() },
        { key: "18" /* Large */, text: "18" /* Large */.toString() },
        { key: "20" /* XLarge */, text: "20" /* XLarge */.toString() },
        { key: "24" /* XLargePlus */, text: "24" /* XLargePlus */.toString() },
        { key: "28" /* XxLarge */, text: "28" /* XxLarge */.toString() },
        { key: "32" /* XxxLarge */, text: "32" /* XxxLarge */.toString() },
        { key: "36" /* XxLargePlus */, text: "36" /* XxLargePlus */.toString() },
        { key: "42" /* Super */, text: "42" /* Super */.toString() },
        { key: "68" /* Mega */, text: "68" /* Mega */.toString() }
    ];
    return SPRtePropertyPaneControl;
}());



/***/ }),

/***/ "nM/d":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/sp-canvas/canvas/editChunk/sprte/PropertyPane/SPRtePropertyPaneButton.module.css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".sprtePropertyPaneButton_ded7ec99{background:0 0;border:none}.sprtePropertyPaneButton_ded7ec99.iconButton_ded7ec99:hover{background-color:\"[theme:neutralLight, default: #edebe9]\"}.sprtePropertyPaneButton_ded7ec99.iconButton_ded7ec99:active{background-color:\"[theme:neutralQuaternaryAlt, default: #e1dfdd]\"}.sprtePropertyPaneButton_ded7ec99.iconButton_ded7ec99{width:40px;height:40px;padding:0}.sprtePropertyPaneButton_ded7ec99.imageButton_ded7ec99{width:56px;height:56px;min-width:56px;padding:0}.sprtePropertyPaneButton_ded7ec99 i{font-size:20px}.sprtePropertyPaneButton_ded7ec99.tableButtonInPane_ded7ec99 i{font-size:24px}.sprtePropertyPaneButton_ded7ec99.sprtePropertyPaneButtonActive_ded7ec99{color:\"[theme:themePrimary, default: #0078d4]\";background-color:\"[theme:neutralQuaternaryAlt, default: #e1dfdd]\"}.sprtePropertyPaneButton_ded7ec99:hover{color:\"[theme:themePrimary, default: #0078d4]\"}.sprtePropertyPaneButton_ded7ec99.textButton_ded7ec99{background:\"[theme:themePrimary, default: #0078d4]\";color:\"[theme:white, default: #ffffff]\"}.sprtePropertyPaneButton_ded7ec99.textButton_ded7ec99.disabled_ded7ec99{background:\"[theme:neutralTertiary, default: #a19f9d]\"}.sprtePropertyPaneButton_ded7ec99.textButton_ded7ec99:hover{background:\"[theme:themePrimary, default: #0078d4]\"}.sprtePropertyPaneButtonImage_ded7ec99{height:40px;background-color:\"[theme:white, default: #ffffff]\"}", ""]);



/***/ }),

/***/ "o5Yi":
/*!*************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/PropertyPane/SPRtePropertyPane.resx.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_8hUJbMifOh43gp1+NrT4Ig';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "ow4o":
/*!**********************************************************************************************!*\
  !*** ./lib/sp-canvas/canvas/editChunk/sprte/PropertyPane/SPRtePropertyPaneButton.module.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./SPRtePropertyPaneButton.module.css */ "nM/d");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "vfXv":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/sp-canvas/canvas/editChunk/sprte/tableIcons/TableIcons.module.css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".themeableSvgTableIcon_90f184eb{width:40px;height:40px}.cls1_90f184eb,.cls6_90f184eb{fill:none}.cls1_90f184eb,.cls2_90f184eb,.cls3_90f184eb{stroke:\"[theme:neutralPrimary, default: #323130]\"}.cls2_90f184eb,.cls4_90f184eb{fill:\"[theme:neutralLighterAlt, default: #faf9f8]\"}.cls3_90f184eb{fill:\"[theme:neutralPrimary, default: #323130]\"}.cls4_90f184eb{stroke:\"[theme:neutralLighterAlt, default: #faf9f8]\";stroke-width:.6px}.cls5_90f184eb{stroke:none}.deleteTable_90f184eb.cls1_90f184eb{fill:\"[theme:neutralTertiary, default: #a19f9d]\";stroke:\"[theme:neutralPrimary, default: #323130]\"}.deleteTable_90f184eb.cls2_90f184eb{fill:\"[theme:neutralPrimary, default: #323130]\";stroke:none}.deleteTable_90f184eb.cls3_90f184eb,.deleteTable_90f184eb.cls6_90f184eb{fill:none}.deleteTable_90f184eb.cls3_90f184eb{stroke:\"[theme:neutralTertiaryAlt, default: #c8c6c4]\"}.deleteTable_90f184eb.cls4_90f184eb{fill:\"[theme:neutralLighterAlt, default: #faf9f8]\";stroke:\"[theme:neutralLighterAlt, default: #faf9f8]\";stroke-width:.6px}.deleteTable_90f184eb.cls5_90f184eb{stroke:none}.neutralPrimaryIcon_90f184eb,.neutralRows_90f184eb{fill:\"[theme:neutralPrimary, default: #323130]\"}.neutralRows_90f184eb{opacity:.2}.neutralLeftColumn_90f184eb{opacity:.5;fill:\"[theme:neutralPrimary, default: #323130]\"}.themePrimaryIcon_90f184eb,.themeRows_90f184eb{fill:\"[theme:themePrimary, default: #0078d4]\"}.themeRows_90f184eb{opacity:.2}.themeLeftColumn_90f184eb{opacity:.5;fill:\"[theme:themePrimary, default: #0078d4]\"}", ""]);



/***/ })

}]);
//# sourceMappingURL=chunk.sp-rte-propertypane_f0cf291fe70a4da71f47.js.map