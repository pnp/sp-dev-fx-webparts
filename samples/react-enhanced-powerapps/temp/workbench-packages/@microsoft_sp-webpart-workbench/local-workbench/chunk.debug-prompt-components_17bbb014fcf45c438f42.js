(window["webpackJsonp_1c6c9123_7aac_41f3_a376_3caea41ed83f_1_11_0"] = window["webpackJsonp_1c6c9123_7aac_41f3_a376_3caea41ed83f_1_11_0"] || []).push([["debug-prompt-components"],{

/***/ "9G5p":
/*!************************************************************************!*\
  !*** ./lib/debug/debugComponents/debugError/DebugError.module.scss.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./DebugError.module.css */ "e3bv");
var styles = {
    detailText: 'detailText_c9936a36',
    errorText: 'errorText_c9936a36'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "FqM0":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/debug/debugComponents/debugPrompt/DebugPrompt.module.css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".warningText_e3836c84{color:#e81123;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.calloutFadeIn_e3836c84{opacity:1!important;-webkit-transform:ms-translate3d(0,0,0)!important;transform:ms-translate3d(0,0,0)!important}div .callout_e3836c84{max-width:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default;opacity:0;-webkit-transform:ms-translate3d(0,20px,0);transform:ms-translate3d(0,20px,0);-webkit-transition:opacity .2s,-webkit-transform .2s;transition:opacity .2s,-webkit-transform .2s;transition:opacity .2s,transform .2s;transition:opacity .2s,transform .2s,-webkit-transform .2s;-webkit-animation:none;animation:none}.calloutText_e3836c84{padding:18px 24px 12px;margin:0;font-size:21px;font-weight:100;color:#323130;font-weight:300}", ""]);



/***/ }),

/***/ "U5yO":
/*!**********************************************************************!*\
  !*** ./lib/debug/debugComponents/debugPrompt/DebugPrompt.module.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./DebugPrompt.module.css */ "FqM0");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "bEFm":
/*!********************************************!*\
  !*** ./lib/debug/debugComponents/index.js ***!
  \********************************************/
/*! exports provided: showDebugPrompt, showError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showDebugPrompt", function() { return showDebugPrompt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showError", function() { return showError; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "0ZZt");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _debugPrompt_DebugPrompt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./debugPrompt/DebugPrompt */ "gmkQ");
/* harmony import */ var _debugError_DebugError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./debugError/DebugError */ "sqhZ");
/* harmony import */ var _debugPrompt_DebugPrompt_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./debugPrompt/DebugPrompt.resx */ "raJO");





var _errorIsShown = false;
var _containerElement;
function showDebugPrompt(options) {
    return new Promise(function (resolve) {
        var title = options.loaderRequested && options.manifestsRequested
            ? _debugPrompt_DebugPrompt_resx__WEBPACK_IMPORTED_MODULE_4__["default"].allowDebugLoaderAndManifestsTitle
            : (options.loaderRequested ? _debugPrompt_DebugPrompt_resx__WEBPACK_IMPORTED_MODULE_4__["default"].allowDebugLoaderTitle : _debugPrompt_DebugPrompt_resx__WEBPACK_IMPORTED_MODULE_4__["default"].allowDebugManifestsTitle);
        react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_debugPrompt_DebugPrompt__WEBPACK_IMPORTED_MODULE_2__["default"], { title: title, callback: resolve }), _ensureEmptyContainerElement());
    });
}
function showError(innerError, errorText, title) {
    // Only show the prompt once
    if (!_errorIsShown) {
        _errorIsShown = true;
        react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_debugError_DebugError__WEBPACK_IMPORTED_MODULE_3__["default"], { innerError: innerError, errorText: errorText, title: title }), _ensureEmptyContainerElement());
    }
}
function _ensureEmptyContainerElement() {
    if (!_containerElement) {
        _containerElement = document.createElement('div');
        document.body.appendChild(_containerElement);
    }
    return _containerElement;
}


/***/ }),

/***/ "bK2A":
/*!******************************************************************!*\
  !*** ./lib/debug/debugComponents/debugComponents.module.scss.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./debugComponents.module.css */ "uiCC");
var styles = {
    dialogContainer: 'dialogContainer_fb73798b'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "e3bv":
/*!********************************************************************!*\
  !*** ./lib/debug/debugComponents/debugError/DebugError.module.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./DebugError.module.css */ "yn05");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "edap":
/*!*****************************************************************!*\
  !*** ./lib/debug/debugComponents/debugError/DebugError.resx.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_mraBnnuq2J9WjrAcnw9QNA';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "gmkQ":
/*!**************************************************************!*\
  !*** ./lib/debug/debugComponents/debugPrompt/DebugPrompt.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react_lib_Dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/Dialog */ "LFcF");
/* harmony import */ var office_ui_fabric_react_lib_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! office-ui-fabric-react/lib/Button */ "xk/t");
/* harmony import */ var office_ui_fabric_react_lib_Callout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! office-ui-fabric-react/lib/Callout */ "cEYc");
/* harmony import */ var office_ui_fabric_react_lib_Utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! office-ui-fabric-react/lib/Utilities */ "UJDV");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _DebugPrompt_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DebugPrompt.resx */ "raJO");
/* harmony import */ var _debugComponents_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../debugComponents.module.scss */ "bK2A");
/* harmony import */ var _DebugPrompt_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DebugPrompt.module.scss */ "hygs");
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









var DebugPrompt = /** @class */ (function (_super) {
    __extends(DebugPrompt, _super);
    function DebugPrompt(props) {
        var _this = _super.call(this, props) || this;
        _this._calloutTarget = undefined;
        _this.state = {
            showDialog: true,
            showCallout: false,
            dismissed: false
        };
        return _this;
    }
    DebugPrompt.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () { return _this.setState({
            showCallout: _this.state.showDialog // Only show the callout if the dialog is still open
        }); }, 5000); // Show the callout after 5 seconds.
    };
    DebugPrompt.prototype.render = function () {
        var _this = this;
        var _a;
        var callback = function (allow) {
            // Hide the dialog after 200ms to let the callout disappear
            setTimeout(function () { return _this.setState({ dismissed: true }); }, 200);
            _this.setState({
                showCallout: false,
                showDialog: false
            });
            _this.props.callback(allow);
        };
        return !this.state.dismissed
            ? (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { role: 'dialog', "data-automation-id": 'debugManifestPromptDialog', "aria-labelledby": 'manifestWarningLabel' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_Dialog__WEBPACK_IMPORTED_MODULE_1__["Dialog"], { dialogContentProps: {
                        type: office_ui_fabric_react_lib_Dialog__WEBPACK_IMPORTED_MODULE_1__["DialogType"].largeHeader,
                        title: this.props.title
                    }, hidden: !this.state.showDialog, modalProps: {
                        isBlocking: true,
                        containerClassName: _debugComponents_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].dialogContainer
                    } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _DebugPrompt_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].warningText }, _DebugPrompt_resx__WEBPACK_IMPORTED_MODULE_6__["default"].debugManifestLoadingWarning),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _DebugPrompt_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].warningText }, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_5__["Text"].format(_DebugPrompt_resx__WEBPACK_IMPORTED_MODULE_6__["default"].debugManifestLoadingWarning2, _DebugPrompt_resx__WEBPACK_IMPORTED_MODULE_6__["default"].debugManifestLoadingCancel)),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_Dialog__WEBPACK_IMPORTED_MODULE_1__["DialogFooter"], null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_Button__WEBPACK_IMPORTED_MODULE_2__["DefaultButton"], { "data-automation-id": 'debugManifestConfirmButton', onClick: function () { return callback(true); } }, _DebugPrompt_resx__WEBPACK_IMPORTED_MODULE_6__["default"].debugManifestLoadingConfirm),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_Button__WEBPACK_IMPORTED_MODULE_2__["PrimaryButton"], { "data-automation-id": 'debugManifestCancelButton', onClick: function () { return callback(false); } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { ref: function (calloutTarget) { return _this._calloutTarget = calloutTarget || _this._calloutTarget; } }, _DebugPrompt_resx__WEBPACK_IMPORTED_MODULE_6__["default"].debugManifestLoadingCancel)))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_Callout__WEBPACK_IMPORTED_MODULE_3__["Callout"], { className: Object(office_ui_fabric_react_lib_Utilities__WEBPACK_IMPORTED_MODULE_4__["css"])(_DebugPrompt_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].callout, (_a = {}, _a[_DebugPrompt_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].calloutFadeIn] = !!this.state.showCallout, _a)), target: this._calloutTarget, directionalHint: office_ui_fabric_react_lib_Callout__WEBPACK_IMPORTED_MODULE_3__["DirectionalHint"].bottomCenter, gapSpace: 10 },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _DebugPrompt_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].calloutText }, _DebugPrompt_resx__WEBPACK_IMPORTED_MODULE_6__["default"].debugManifestLoadingCalloutText))))
            : null; // tslint:disable-line:no-null-keyword
    };
    return DebugPrompt;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (DebugPrompt);


/***/ }),

/***/ "hygs":
/*!**************************************************************************!*\
  !*** ./lib/debug/debugComponents/debugPrompt/DebugPrompt.module.scss.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./DebugPrompt.module.css */ "U5yO");
var styles = {
    warningText: 'warningText_e3836c84',
    calloutFadeIn: 'calloutFadeIn_e3836c84',
    callout: 'callout_e3836c84',
    calloutText: 'calloutText_e3836c84'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "raJO":
/*!*******************************************************************!*\
  !*** ./lib/debug/debugComponents/debugPrompt/DebugPrompt.resx.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_upo3vfLFBbnbzl2hKy2TwA';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "sqhZ":
/*!************************************************************!*\
  !*** ./lib/debug/debugComponents/debugError/DebugError.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "3wdl");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react_lib_Dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/Dialog */ "LFcF");
/* harmony import */ var office_ui_fabric_react_lib_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! office-ui-fabric-react/lib/Button */ "xk/t");
/* harmony import */ var _debugComponents_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../debugComponents.module.scss */ "bK2A");
/* harmony import */ var _DebugError_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DebugError.module.scss */ "9G5p");
/* harmony import */ var _DebugError_resx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DebugError.resx */ "edap");
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






var DebugError = /** @class */ (function (_super) {
    __extends(DebugError, _super);
    function DebugError(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isShown: true
        };
        return _this;
    }
    DebugError.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { "data-automation-id": 'debugManifestErrorDialog', role: 'dialog' },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_Dialog__WEBPACK_IMPORTED_MODULE_1__["Dialog"], { hidden: !this.state.isShown, dialogContentProps: {
                    type: office_ui_fabric_react_lib_Dialog__WEBPACK_IMPORTED_MODULE_1__["DialogType"].largeHeader,
                    title: this.props.title
                }, modalProps: {
                    isBlocking: true,
                    containerClassName: _debugComponents_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].dialogContainer
                } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _DebugError_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].detailText }, this.props.errorText || _DebugError_resx__WEBPACK_IMPORTED_MODULE_5__["default"].debugManifestErrorDetail),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _DebugError_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].errorText }, this.props.innerError.toString()),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_Dialog__WEBPACK_IMPORTED_MODULE_1__["DialogFooter"], null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_Button__WEBPACK_IMPORTED_MODULE_2__["PrimaryButton"], { "data-automation-id": 'debugManifestErrorDismissButton', onClick: function () { return _this.setState({ isShown: false }); } }, _DebugError_resx__WEBPACK_IMPORTED_MODULE_5__["default"].debugManifestErrorDismissButtonText)))));
    };
    return DebugError;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (DebugError);


/***/ }),

/***/ "t2JX":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/debug/debugComponents/debugComponents.module.css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".dialogContainer_fb73798b{min-width:500px!important;max-width:50vw}", ""]);



/***/ }),

/***/ "uiCC":
/*!**************************************************************!*\
  !*** ./lib/debug/debugComponents/debugComponents.module.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./debugComponents.module.css */ "t2JX");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "yn05":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/debug/debugComponents/debugError/DebugError.module.css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".detailText_c9936a36{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.errorText_c9936a36{font-family:monospace;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}", ""]);



/***/ })

}]);
//# sourceMappingURL=chunk.debug-prompt-components_17bbb014fcf45c438f42.js.map