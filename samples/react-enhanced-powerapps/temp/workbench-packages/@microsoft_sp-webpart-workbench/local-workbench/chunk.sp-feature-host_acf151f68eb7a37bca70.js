(window["webpackJsonp_8494e7d7_6b99_47b2_a741_59873e42f16f_4_0_19"] = window["webpackJsonp_8494e7d7_6b99_47b2_a741_59873e42f16f_4_0_19"] || []).push([["sp-feature-host"],{

/***/ "5TZR":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/coachmarkUtility/CoachMarkStyleOverrides.module.css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".bodyOverride_04f74e95 .ms-TeachingBubble-headline,.bodyOverride_04f74e95 .ms-TeachingBubble-subText{color:#fff!important}.bodyOverride_04f74e95 .ms-TeachingBubble-primaryButton{background-color:#fff!important;border-color:#fff!important}.bodyOverride_04f74e95 .ms-TeachingBubble-primaryButton .ms-Button-label{color:#0078d4!important}", ""]);



/***/ }),

/***/ "6n3h":
/*!****************************************************!*\
  !*** ./lib/coachmarkUtility/FeatureHostControl.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../performance/KillSwitch */ "k0Dt");
/* harmony import */ var _FeatureHost__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FeatureHost */ "KtLG");
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





var FeatureHostControl = /** @class */ (function () {
    function FeatureHostControl() {
        this._featureGroups = new Map();
        this._featureKeys = this._featureGroups.keys();
    }
    Object.defineProperty(FeatureHostControl, "instance", {
        get: function () {
            // Lazy initialize the singleton
            if (this._instance === undefined) {
                this._instance = new FeatureHostControl();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    FeatureHostControl.attachFeatureHost = function (hostProps) {
        if (this._isValid(hostProps)) {
            if (!this.instance._hostElem) {
                // render and set active feature host element
                return this.instance._renderFeatureHost(hostProps);
            }
            else {
                return this.instance._addToFeatureMap(hostProps);
            }
        }
        return undefined;
    };
    FeatureHostControl.dismissFeatureHost = function (localStorageKey, shouldSetLocalStorageKey) {
        if (shouldSetLocalStorageKey === void 0) { shouldSetLocalStorageKey = true; }
        if (this.instance._activeKey === localStorageKey) {
            this.instance._dismissFeatureHost(shouldSetLocalStorageKey);
        }
    };
    FeatureHostControl.normalizeCoachmarkHostProps = function (origHostProps) {
        var nonFocusProps = {};
        if (!FeatureHostControl._nonFocusDefaultPropsKS.isActivated()) {
            nonFocusProps = {
                preventFocusOnMount: true,
                positioningContainerProps: {
                    setInitialFocus: false
                }
            };
        }
        var hostProps = __assign({}, nonFocusProps, origHostProps);
        hostProps.version = hostProps.version || '1.0';
        hostProps.type = hostProps.type || "Coachmark" /* Coachmark */;
        return hostProps;
    };
    FeatureHostControl.normalizeTeachingBubbleProps = function (origHostProps) {
        var hostProps = __assign({}, origHostProps);
        hostProps.version = hostProps.version || '1.0';
        hostProps.type = hostProps.type || "TeachingBubble" /* TeachingBubble */;
        return hostProps;
    };
    FeatureHostControl._isValid = function (hostProps) {
        /**
         * The attach call should be ignored if:
         * 1. Found that newer/current version already dismissed in LocalStorage
         * 2. An instance with the same localStorageKey is being displayed
         */
        var isValid = false;
        if (hostProps.localStorageKey) {
            var dismissedVersionString = window.localStorage.getItem(hostProps.localStorageKey) || '0.0';
            var currentVersion = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Version"].parse(hostProps.version);
            try {
                // Already dismissed coachmarks will have integer 1 instead of 1.0 in localstorage causing Version exception
                var dismissedVersion = _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Version"].parse(dismissedVersionString);
                isValid = (dismissedVersion.lessThan(currentVersion)
                    && this.instance._activeKey !== hostProps.localStorageKey) || isValid;
            }
            catch (_a) {
                // Force display to correct localStorage value
                isValid = true;
            }
        }
        if (hostProps.displayEvaluator) {
            isValid = hostProps.displayEvaluator() || isValid;
        }
        return isValid;
    };
    FeatureHostControl.prototype._renderFeatureHost = function (hostProps) {
        if (FeatureHostControl._isValid(hostProps)) {
            var coachmarkElement = document.createElement('div');
            if (hostProps.layerElement) {
                // set inline style for container element if doNotLayer to correct display width
                coachmarkElement.style.width = '100%';
                coachmarkElement.style.position = 'absolute';
                hostProps.layerElement.appendChild(coachmarkElement);
            }
            this._activeKey = hostProps.localStorageKey || _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].newGuid().toString();
            this._activeVersion = hostProps.version.toString();
            this._hostElem = coachmarkElement;
            this._currentGroupKey = hostProps.featureGroupKey;
            if (hostProps.type === "Coachmark" /* Coachmark */) {
                this._renderCoachmark(hostProps);
            }
            else if (hostProps.type === "TeachingBubble" /* TeachingBubble */) {
                this._renderTeachingBubble(hostProps);
            }
            return this._activeKey;
        }
        return undefined;
    };
    FeatureHostControl.prototype._renderCoachmark = function (hostProps) {
        var _this = this;
        var coachmark = react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_FeatureHost__WEBPACK_IMPORTED_MODULE_4__["default"], __assign({}, hostProps, { onBeforeDismiss: function (ev) {
                if (hostProps.onBeforeDismiss) {
                    hostProps.onBeforeDismiss(ev);
                }
                _this._dismissFeatureHost(true, ev);
            } }));
        react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](coachmark, this._hostElem);
    };
    FeatureHostControl.prototype._renderTeachingBubble = function (hostProps) {
        var _this = this;
        var teachingBubble = react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_FeatureHost__WEBPACK_IMPORTED_MODULE_4__["default"], __assign({}, hostProps, { onBeforeDismiss: function (ev) {
                if (hostProps.onBeforeDismiss) {
                    hostProps.onBeforeDismiss(ev);
                }
                _this._dismissFeatureHost(true, ev);
            } }));
        react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](teachingBubble, this._hostElem);
    };
    Object.defineProperty(FeatureHostControl.prototype, "_nextFeatureInMap", {
        get: function () {
            var currentGroup = this._featureGroups.get(this._currentGroupKey);
            if (currentGroup) {
                if (currentGroup.length > 0) {
                    // retrieve the first item from current group
                    return currentGroup.shift();
                }
                else {
                    this._featureGroups.delete(this._currentGroupKey);
                }
            }
            // go to next group
            this._currentGroupKey = this._featureKeys.next().value;
            if (this._currentGroupKey) {
                return this._featureGroups.get(this._currentGroupKey).shift();
            }
            else {
                // iterator is empty, restart
                this._featureKeys = this._featureGroups.keys();
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    FeatureHostControl.prototype._addToFeatureMap = function (hostProps) {
        // push to queue if already an active one
        var featureGroupKey = hostProps.featureGroupKey || _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].newGuid().toString();
        var currentGroup = this._featureGroups.get(featureGroupKey);
        if (!currentGroup) {
            // add a new feature group if key is not found
            this._featureGroups.set(featureGroupKey, []);
            currentGroup = this._featureGroups.get(featureGroupKey);
        }
        // push the hostProps into existing group
        currentGroup.push(hostProps);
        return "" + featureGroupKey + (hostProps.localStorageKey || '');
    };
    FeatureHostControl.prototype._dismissFeatureHost = function (shouldSetLocalStorageKey, ev) {
        if (!this._hostElem) {
            return;
        }
        if (shouldSetLocalStorageKey && (!ev || ev.type !== 'scroll')) {
            // shouldSetLocalStorageKey as false will not set the local storage key.
            // Dismissing by scrolling doesn't set localstorage flag when shouldSetLocalStorageKey is true.
            var localStorageKey = this._activeKey;
            var versionString = this._activeVersion;
            if (localStorageKey && versionString) {
                window.localStorage.setItem(localStorageKey, versionString);
            }
        }
        if (react_dom__WEBPACK_IMPORTED_MODULE_1__["findDOMNode"](this._hostElem)) {
            react_dom__WEBPACK_IMPORTED_MODULE_1__["unmountComponentAtNode"](this._hostElem);
            this._hostElem = undefined;
            this._activeKey = undefined;
            this._activeVersion = undefined;
        }
        var nextFeatureHost = this._nextFeatureInMap;
        if (nextFeatureHost) {
            this._renderFeatureHost(nextFeatureHost);
        }
    };
    FeatureHostControl._nonFocusDefaultPropsKS = new _performance_KillSwitch__WEBPACK_IMPORTED_MODULE_3__["KillSwitch"]('10c06d62-83a9-4ac3-95d8-c72669f8a01b' /* '8/9/2019' */);
    return FeatureHostControl;
}());
/* harmony default export */ __webpack_exports__["default"] = (FeatureHostControl);


/***/ }),

/***/ "KtLG":
/*!*********************************************!*\
  !*** ./lib/coachmarkUtility/FeatureHost.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react_lib_Coachmark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/Coachmark */ "HfcR");
/* harmony import */ var office_ui_fabric_react_lib_TeachingBubble__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! office-ui-fabric-react/lib/TeachingBubble */ "Cr2D");
/* harmony import */ var _loc_CoachmarkHost_resx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loc/CoachmarkHost.resx */ "SdRb");
/* harmony import */ var _CoachMarkStyleOverrides_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CoachMarkStyleOverrides.module.scss */ "peJT");
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





var FeatureHost = /** @class */ (function (_super) {
    __extends(FeatureHost, _super);
    function FeatureHost(props) {
        return _super.call(this, props) || this;
    }
    FeatureHost.prototype.render = function () {
        if (this.props.type === "Coachmark" /* Coachmark */) {
            return this.renderCoachmark();
        }
        else if (this.props.type === "TeachingBubble" /* TeachingBubble */) {
            return this.renderTeachingBubble();
        }
    };
    FeatureHost.prototype.componentDidMount = function () {
        var onDidMount = this.props.onDidMount;
        if (onDidMount) {
            onDidMount();
        }
    };
    FeatureHost.prototype.renderCoachmark = function () {
        var _this = this;
        var _a = this.props, content = _a.content, onBeforeDismiss = _a.onBeforeDismiss, target = _a.target, teachingBubbleProps = _a.teachingBubbleProps;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_Coachmark__WEBPACK_IMPORTED_MODULE_1__["Coachmark"], __assign({}, this.props, { target: target, teachingBubbleRef: this._teachingBubbleContent }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _CoachMarkStyleOverrides_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].bodyOverride },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_TeachingBubble__WEBPACK_IMPORTED_MODULE_2__["TeachingBubbleContent"], __assign({}, teachingBubbleProps, { componentRef: function (ref) { return (_this._teachingBubbleContent = ref); }, closeButtonAriaLabel: _loc_CoachmarkHost_resx__WEBPACK_IMPORTED_MODULE_3__["default"].CloseButtonAriaLabel, hasCloseIcon: true, hasCondensedHeadline: true, isWide: false, onDismiss: onBeforeDismiss, targetElement: teachingBubbleProps.targetElement || target }), content))));
    };
    FeatureHost.prototype.renderTeachingBubble = function () {
        var _a = this.props, calloutProps = _a.calloutProps, content = _a.content, onBeforeDismiss = _a.onBeforeDismiss, targetElement = _a.targetElement;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _CoachMarkStyleOverrides_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].bodyOverride },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react_lib_TeachingBubble__WEBPACK_IMPORTED_MODULE_2__["TeachingBubble"], __assign({}, this.props, { calloutProps: calloutProps, closeButtonAriaLabel: _loc_CoachmarkHost_resx__WEBPACK_IMPORTED_MODULE_3__["default"].CloseButtonAriaLabel, onDismiss: onBeforeDismiss, targetElement: targetElement }), content)));
    };
    return FeatureHost;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (FeatureHost);


/***/ }),

/***/ "SdRb":
/*!********************************************************!*\
  !*** ./lib/coachmarkUtility/loc/CoachmarkHost.resx.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_hMVyVJ8VXd7+VBXtkz5V0w';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "jWgf":
/*!*****************************************************************!*\
  !*** ./lib/coachmarkUtility/CoachMarkStyleOverrides.module.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./CoachMarkStyleOverrides.module.css */ "5TZR");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "peJT":
/*!*********************************************************************!*\
  !*** ./lib/coachmarkUtility/CoachMarkStyleOverrides.module.scss.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./CoachMarkStyleOverrides.module.css */ "jWgf");
var styles = {
    bodyOverride: 'bodyOverride_04f74e95'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ })

}]);
//# sourceMappingURL=chunk.sp-feature-host_acf151f68eb7a37bca70.js.map