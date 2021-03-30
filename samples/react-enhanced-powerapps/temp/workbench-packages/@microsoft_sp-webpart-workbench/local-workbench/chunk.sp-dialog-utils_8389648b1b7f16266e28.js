(window["webpackJsonp_8494e7d7_6b99_47b2_a741_59873e42f16f_4_0_19"] = window["webpackJsonp_8494e7d7_6b99_47b2_a741_59873e42f16f_4_0_19"] || []).push([["sp-dialog-utils"],{

/***/ "vxt3":
/*!**********************************!*\
  !*** ./lib/dialog/PageDialog.js ***!
  \**********************************/
/*! exports provided: PageDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageDialog", function() { return PageDialog; });
/* harmony import */ var office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Dialog */ "glo3");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/sp-a11y */ "ytfe");
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _PageDialog_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PageDialog.types */ "RGPq");
/* harmony import */ var _DialogUtility_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DialogUtility.scss */ "Dmv+");
/* harmony import */ var _DialogUtility_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DialogUtility.resx */ "2oeR");
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







/**
 * Generic page dialog
 */
var PageDialog = /** @class */ (function (_super) {
    __extends(PageDialog, _super);
    function PageDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showDialog: true
        };
        return _this;
    }
    PageDialog.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        this.setState({
            showDialog: true
        });
    };
    PageDialog.prototype.render = function () {
        var footerElements;
        switch (this.props.actionType) {
            case _PageDialog_types__WEBPACK_IMPORTED_MODULE_4__["DialogActionTypes"].CLOSE_ACTION:
                footerElements =
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_0__["DialogFooter"], null,
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["PrimaryButton"], { onClick: this._closeDialog, ariaLabel: _DialogUtility_resx__WEBPACK_IMPORTED_MODULE_6__["default"].DialogCloseButtonLabel, text: _DialogUtility_resx__WEBPACK_IMPORTED_MODULE_6__["default"].DialogCloseButtonLabel }),
                        ";");
                break;
            case _PageDialog_types__WEBPACK_IMPORTED_MODULE_4__["DialogActionTypes"].NONE:
                footerElements =
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_0__["DialogFooter"], null,
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: 'progressIcon' },
                            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["Icon"], { iconName: 'Sync' })),
                        ";");
                break;
            case _PageDialog_types__WEBPACK_IMPORTED_MODULE_4__["DialogActionTypes"].SAVE_ACTION:
                footerElements =
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_0__["DialogFooter"], null,
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["PrimaryButton"], { onClick: this._closeDialog, ariaLabel: _DialogUtility_resx__WEBPACK_IMPORTED_MODULE_6__["default"].DialogSaveButtonLabel, text: _DialogUtility_resx__WEBPACK_IMPORTED_MODULE_6__["default"].DialogSaveButtonLabel }),
                        ";");
                break;
            case _PageDialog_types__WEBPACK_IMPORTED_MODULE_4__["DialogActionTypes"].CONFIRM_ACTION:
                footerElements =
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_0__["DialogFooter"], null,
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["PrimaryButton"], { onClick: this._closeDialog, ariaLabel: _DialogUtility_resx__WEBPACK_IMPORTED_MODULE_6__["default"].DialogYesButtonLabel, "data-automation-id": 'yesButton', text: _DialogUtility_resx__WEBPACK_IMPORTED_MODULE_6__["default"].DialogYesButtonLabel }),
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["DefaultButton"], { onClick: this._cancelDialog, ariaLabel: _DialogUtility_resx__WEBPACK_IMPORTED_MODULE_6__["default"].DialogNoButtonLabel, "data-automation-id": 'noButton', text: _DialogUtility_resx__WEBPACK_IMPORTED_MODULE_6__["default"].DialogNoButtonLabel }));
                break;
            default:
                break;
        }
        var contentElement;
        if (this.props.contentElement) {
            contentElement = this.props.contentElement;
        }
        else if (this.props.message) {
            contentElement =
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["Label"], { className: 'dialogMessage-label' }, this.props.message);
            _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_3__["ScreenReader"].alert('dialogMessage', this.props.message);
        }
        else if (this.props.innerHTML) {
            contentElement =
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: 'dialogMessage-label', dangerouslySetInnerHTML: { __html: this.props.innerHTML } });
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_0__["Dialog"], { hidden: Boolean(!this.state.showDialog || this.props.hidden), key: this.props.name, dialogContentProps: {
                    type: office_ui_fabric_react_lib_components_Dialog__WEBPACK_IMPORTED_MODULE_0__["DialogType"].normal,
                    title: this.props.title,
                    subText: this.props.subText
                }, modalProps: {
                    isBlocking: true,
                    className: 'ms-dialogMainOverride'
                }, ignoreExternalFocusing: this.props.ignoreExternalFocusing ? true : false, onDismiss: this._cancelDialog },
                contentElement,
                footerElements)));
    };
    PageDialog.prototype._cancelDialog = function () {
        if (this.props.cancelCallback) {
            this.props.cancelCallback();
        }
        this._dismissDialog();
    };
    /**
     * Close modal dialog
     */
    PageDialog.prototype._closeDialog = function () {
        if (this.props.callback) {
            this.props.callback();
        }
        this._dismissDialog();
    };
    /**
     * Close modal dialog
    */
    PageDialog.prototype._dismissDialog = function () {
        this.setState({
            showDialog: false
        });
    };
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], PageDialog.prototype, "_cancelDialog", null);
    __decorate([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], PageDialog.prototype, "_closeDialog", null);
    return PageDialog;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));



/***/ })

}]);
//# sourceMappingURL=chunk.sp-dialog-utils_8389648b1b7f16266e28.js.map