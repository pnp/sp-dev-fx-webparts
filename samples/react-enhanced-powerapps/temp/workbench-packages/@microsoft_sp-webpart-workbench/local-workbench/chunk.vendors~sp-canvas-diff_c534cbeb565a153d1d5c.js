(window["webpackJsonp_85093aa7_8c12_4683_91aa_47cd5e2654db_2_5_0"] = window["webpackJsonp_85093aa7_8c12_4683_91aa_47cd5e2654db_2_5_0"] || []).push([["vendors~sp-canvas-diff"],{

/***/ "1I/f":
/*!*************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/visual-dom-diff/0.7.2/node_modules/visual-dom-diff/lib/domIterator.js ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DomIterator = /** @class */ (function () {
    function DomIterator(rootNode, config) {
        this.rootNode = rootNode;
        this.config = config;
        this.descend = true;
        this.nextNode = this.rootNode;
        if (this.skipSelf(this.nextNode)) {
            this.next();
        }
    }
    DomIterator.prototype.toArray = function () {
        var _a;
        var array = [];
        var _b = this.next(), done = _b.done, value = _b.value;
        while (!done) {
            array.push(value);
            (_a = this.next(), done = _a.done, value = _a.value);
        }
        return array;
    };
    DomIterator.prototype.forEach = function (fn) {
        var _a;
        var _b = this.next(), done = _b.done, value = _b.value;
        while (!done) {
            fn(value);
            (_a = this.next(), done = _a.done, value = _a.value);
        }
    };
    DomIterator.prototype.reduce = function (fn, initial) {
        var _a;
        var result = initial;
        var _b = this.next(), done = _b.done, value = _b.value;
        while (!done) {
            result = fn(result, value);
            (_a = this.next(), done = _a.done, value = _a.value);
        }
        return result;
    };
    DomIterator.prototype.some = function (fn) {
        var _a;
        var _b = this.next(), done = _b.done, value = _b.value;
        while (!done) {
            if (fn(value)) {
                return true;
            }
            ;
            (_a = this.next(), done = _a.done, value = _a.value);
        }
        return false;
    };
    DomIterator.prototype.next = function () {
        if (!this.nextNode) {
            return { done: true, value: this.rootNode };
        }
        var value = this.nextNode;
        var done = false;
        if (this.descend &&
            this.nextNode.firstChild &&
            !this.skipChildren(this.nextNode)) {
            this.nextNode = this.nextNode.firstChild;
        }
        else if (this.nextNode === this.rootNode) {
            this.nextNode = null;
        }
        else if (this.nextNode.nextSibling) {
            this.nextNode = this.nextNode.nextSibling;
            this.descend = true;
        }
        else {
            this.nextNode = this.nextNode.parentNode;
            this.descend = false;
            this.next(); // Skip this node, as we've visited it already.
        }
        if (this.nextNode && this.skipSelf(this.nextNode)) {
            this.next(); // Skip this node, as directed by the config.
        }
        return { done: done, value: value };
    };
    DomIterator.prototype.skipSelf = function (node) {
        return this.config && this.config.skipSelf
            ? this.config.skipSelf(node)
            : false;
    };
    DomIterator.prototype.skipChildren = function (node) {
        return this.config && this.config.skipChildren
            ? this.config.skipChildren(node)
            : false;
    };
    return DomIterator;
}());
exports.DomIterator = DomIterator;


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

/***/ "4qtm":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Tooltip/TooltipHost.styles.js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var GlobalClassNames = {
    root: 'ms-TooltipHost',
    ariaPlaceholder: 'ms-TooltipHost-aria-placeholder'
};
var getStyles = function (props) {
    var className = props.className, theme = props.theme;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        root: [
            classNames.root,
            {
                display: 'inline'
            },
            className
        ]
    };
};
//# sourceMappingURL=TooltipHost.styles.js.map

/***/ }),

/***/ "9SCQ":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Tooltip/TooltipHost.js ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: TooltipHost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipHost", function() { return TooltipHost; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TooltipHost_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TooltipHost.base */ "Xrkt");
/* harmony import */ var _TooltipHost_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TooltipHost.styles */ "4qtm");



var TooltipHost = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_TooltipHost_base__WEBPACK_IMPORTED_MODULE_1__["TooltipHostBase"], _TooltipHost_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'TooltipHost'
});
//# sourceMappingURL=TooltipHost.js.map

/***/ }),

/***/ "ALbB":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Tooltip/TooltipHost.types.js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: TooltipOverflowMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipOverflowMode", function() { return TooltipOverflowMode; });
/**
 * {@docCategory Tooltip}
 */
var TooltipOverflowMode;
(function (TooltipOverflowMode) {
    /** Only show tooltip if parent DOM element is overflowing */
    TooltipOverflowMode[TooltipOverflowMode["Parent"] = 0] = "Parent";
    /** Only show tooltip if tooltip host's content is overflowing */
    TooltipOverflowMode[TooltipOverflowMode["Self"] = 1] = "Self";
})(TooltipOverflowMode || (TooltipOverflowMode = {}));
//# sourceMappingURL=TooltipHost.types.js.map

/***/ }),

/***/ "CmDp":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Tooltip/Tooltip.types.js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: TooltipDelay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipDelay", function() { return TooltipDelay; });
/**
 * {@docCategory Tooltip}
 */
var TooltipDelay;
(function (TooltipDelay) {
    TooltipDelay[TooltipDelay["zero"] = 0] = "zero";
    TooltipDelay[TooltipDelay["medium"] = 1] = "medium";
    TooltipDelay[TooltipDelay["long"] = 2] = "long";
})(TooltipDelay || (TooltipDelay = {}));
//# sourceMappingURL=Tooltip.types.js.map

/***/ }),

/***/ "EAKU":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Tooltip.js ***!
  \*********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Tooltip_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Tooltip/index */ "Z/rk");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _components_Tooltip_index__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _components_Tooltip_index__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));

//# sourceMappingURL=Tooltip.js.map

/***/ }),

/***/ "Lnr4":
/*!********************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/visual-dom-diff/0.7.2/node_modules/visual-dom-diff/lib/config.js ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(/*! ./util */ "ic8p");
var skipChildrenMap = new Set();
skipChildrenMap.add('IMG');
skipChildrenMap.add('VIDEO');
skipChildrenMap.add('IFRAME');
skipChildrenMap.add('OBJECT');
skipChildrenMap.add('SVG');
var skipSelfMap = new Set();
skipSelfMap.add('BDO');
skipSelfMap.add('BDI');
skipSelfMap.add('Q');
skipSelfMap.add('CITE');
skipSelfMap.add('CODE');
skipSelfMap.add('DATA');
skipSelfMap.add('TIME');
skipSelfMap.add('VAR');
skipSelfMap.add('DFN');
skipSelfMap.add('ABBR');
skipSelfMap.add('STRONG');
skipSelfMap.add('EM');
skipSelfMap.add('BIG');
skipSelfMap.add('SMALL');
skipSelfMap.add('MARK');
skipSelfMap.add('SUB');
skipSelfMap.add('SUP');
skipSelfMap.add('SAMP');
skipSelfMap.add('KBD');
skipSelfMap.add('B');
skipSelfMap.add('I');
skipSelfMap.add('S');
skipSelfMap.add('U');
skipSelfMap.add('SPAN');
function optionsToConfig(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.addedClass, addedClass = _c === void 0 ? 'vdd-added' : _c, _d = _b.modifiedClass, modifiedClass = _d === void 0 ? 'vdd-modified' : _d, _e = _b.removedClass, removedClass = _e === void 0 ? 'vdd-removed' : _e, _f = _b.skipModified, skipModified = _f === void 0 ? false : _f, skipChildren = _b.skipChildren, skipSelf = _b.skipSelf, _g = _b.diffText, diffText = _g === void 0 ? util_1.diffText : _g;
    return {
        addedClass: addedClass,
        diffText: diffText,
        modifiedClass: modifiedClass,
        removedClass: removedClass,
        skipModified: skipModified,
        skipChildren: function (node) {
            if (!util_1.isElement(node) &&
                !util_1.isDocumentFragment(node) &&
                !util_1.isDocument(node)) {
                return true;
            }
            if (skipChildren) {
                var result = skipChildren(node);
                if (typeof result === 'boolean') {
                    return result;
                }
            }
            return skipChildrenMap.has(node.nodeName);
        },
        skipSelf: function (node) {
            if (!util_1.isText(node) && !util_1.isElement(node)) {
                return true;
            }
            if (skipSelf) {
                var result = skipSelf(node);
                if (typeof result === 'boolean') {
                    return result;
                }
            }
            return skipSelfMap.has(node.nodeName);
        },
    };
}
exports.optionsToConfig = optionsToConfig;


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

/***/ "Xrkt":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Tooltip/TooltipHost.base.js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: TooltipHostBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipHostBase", function() { return TooltipHostBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _TooltipHost_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TooltipHost.types */ "ALbB");
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Tooltip */ "OAft");
/* harmony import */ var _Tooltip_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Tooltip.types */ "CmDp");







var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["classNamesFunction"])();
var TooltipHostBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TooltipHostBase, _super);
    // Constructor
    function TooltipHostBase(props) {
        var _this = _super.call(this, props) || this;
        // The wrapping div that gets the hover events
        _this._tooltipHost = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this.show = function () {
            _this._toggleTooltip(true);
        };
        _this.dismiss = function () {
            _this._hideTooltip();
        };
        _this._getTargetElement = function () {
            if (!_this._tooltipHost.current) {
                return undefined;
            }
            var overflowMode = _this.props.overflowMode;
            // Select target element based on overflow mode. For parent mode, you want to position the tooltip relative
            // to the parent element, otherwise it might look off.
            if (overflowMode !== undefined) {
                switch (overflowMode) {
                    case _TooltipHost_types__WEBPACK_IMPORTED_MODULE_4__["TooltipOverflowMode"].Parent:
                        return _this._tooltipHost.current.parentElement;
                    case _TooltipHost_types__WEBPACK_IMPORTED_MODULE_4__["TooltipOverflowMode"].Self:
                        return _this._tooltipHost.current;
                }
            }
            return _this._tooltipHost.current;
        };
        // Show Tooltip
        _this._onTooltipMouseEnter = function (ev) {
            var _a = _this.props, overflowMode = _a.overflowMode, delay = _a.delay;
            if (TooltipHostBase._currentVisibleTooltip && TooltipHostBase._currentVisibleTooltip !== _this) {
                TooltipHostBase._currentVisibleTooltip.dismiss();
            }
            TooltipHostBase._currentVisibleTooltip = _this;
            if (overflowMode !== undefined) {
                var overflowElement = _this._getTargetElement();
                if (overflowElement && !Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["hasOverflow"])(overflowElement)) {
                    return;
                }
            }
            if (ev.target && Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["portalContainsElement"])(ev.target, _this._getTargetElement())) {
                // Do not show tooltip when target is inside a portal relative to TooltipHost.
                return;
            }
            _this._clearDismissTimer();
            _this._clearOpenTimer();
            if (delay !== _Tooltip_types__WEBPACK_IMPORTED_MODULE_6__["TooltipDelay"].zero) {
                _this.setState({ isAriaPlaceholderRendered: true });
                var delayTime = _this._getDelayTime(delay); // non-null assertion because we set it in `defaultProps`
                _this._openTimerId = _this._async.setTimeout(function () {
                    _this._toggleTooltip(true);
                }, delayTime);
            }
            else {
                _this._toggleTooltip(true);
            }
        };
        // Hide Tooltip
        _this._onTooltipMouseLeave = function (ev) {
            var closeDelay = _this.props.closeDelay;
            _this._clearDismissTimer();
            _this._clearOpenTimer();
            if (closeDelay) {
                _this._dismissTimerId = _this._async.setTimeout(function () {
                    _this._toggleTooltip(false);
                }, closeDelay);
            }
            else {
                _this._toggleTooltip(false);
            }
            if (TooltipHostBase._currentVisibleTooltip === _this) {
                TooltipHostBase._currentVisibleTooltip = undefined;
            }
        };
        _this._onTooltipKeyDown = function (ev) {
            if (ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_3__["KeyCodes"].escape) {
                _this._hideTooltip();
            }
        };
        _this._clearDismissTimer = function () {
            _this._async.clearTimeout(_this._dismissTimerId);
        };
        _this._clearOpenTimer = function () {
            _this._async.clearTimeout(_this._openTimerId);
        };
        // Hide Tooltip
        _this._hideTooltip = function () {
            _this._toggleTooltip(false);
        };
        _this._toggleTooltip = function (isTooltipVisible) {
            if (_this.state.isTooltipVisible !== isTooltipVisible) {
                _this.setState({ isAriaPlaceholderRendered: false, isTooltipVisible: isTooltipVisible }, function () { return _this.props.onTooltipToggle && _this.props.onTooltipToggle(_this.state.isTooltipVisible); });
            }
        };
        _this._getDelayTime = function (delay) {
            switch (delay) {
                case _Tooltip_types__WEBPACK_IMPORTED_MODULE_6__["TooltipDelay"].medium:
                    return 300;
                case _Tooltip_types__WEBPACK_IMPORTED_MODULE_6__["TooltipDelay"].long:
                    return 500;
                default:
                    return 0;
            }
        };
        Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["initializeComponentRef"])(_this);
        _this.state = {
            isAriaPlaceholderRendered: false,
            isTooltipVisible: false
        };
        _this._async = new _Utilities__WEBPACK_IMPORTED_MODULE_3__["Async"](_this);
        return _this;
    }
    // Render
    TooltipHostBase.prototype.render = function () {
        var _a = this.props, calloutProps = _a.calloutProps, children = _a.children, content = _a.content, directionalHint = _a.directionalHint, directionalHintForRTL = _a.directionalHintForRTL, className = _a.hostClassName, id = _a.id, _b = _a.setAriaDescribedBy, setAriaDescribedBy = _b === void 0 ? true : _b, tooltipProps = _a.tooltipProps, styles = _a.styles, theme = _a.theme;
        this._classNames = getClassNames(styles, {
            theme: theme,
            className: className
        });
        var _c = this.state, isAriaPlaceholderRendered = _c.isAriaPlaceholderRendered, isTooltipVisible = _c.isTooltipVisible;
        var tooltipId = id || Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getId"])('tooltip');
        var isContentPresent = !!(content || (tooltipProps && tooltipProps.onRenderContent && tooltipProps.onRenderContent()));
        var showTooltip = isTooltipVisible && isContentPresent;
        var ariaDescribedBy = setAriaDescribedBy && isTooltipVisible && isContentPresent ? tooltipId : undefined;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ className: this._classNames.root, ref: this._tooltipHost }, { onFocusCapture: this._onTooltipMouseEnter }, { onBlurCapture: this._hideTooltip }, { onMouseEnter: this._onTooltipMouseEnter, onMouseLeave: this._onTooltipMouseLeave, onKeyDown: this._onTooltipKeyDown, "aria-describedby": ariaDescribedBy }),
            children,
            showTooltip && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Tooltip__WEBPACK_IMPORTED_MODULE_5__["Tooltip"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: tooltipId, content: content, targetElement: this._getTargetElement(), directionalHint: directionalHint, directionalHintForRTL: directionalHintForRTL, calloutProps: Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["assign"])({}, calloutProps, {
                    onDismiss: this._hideTooltip,
                    onMouseEnter: this._onTooltipMouseEnter,
                    onMouseLeave: this._onTooltipMouseLeave
                }), onMouseEnter: this._onTooltipMouseEnter, onMouseLeave: this._onTooltipMouseLeave, onWheel: this._hideTooltip }, Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getNativeProps"])(this.props, _Utilities__WEBPACK_IMPORTED_MODULE_3__["divProperties"]), tooltipProps))),
            isAriaPlaceholderRendered && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { id: tooltipId, style: _Styling__WEBPACK_IMPORTED_MODULE_2__["hiddenContentStyle"] }, content))));
    };
    TooltipHostBase.prototype.componentWillUnmount = function () {
        if (TooltipHostBase._currentVisibleTooltip && TooltipHostBase._currentVisibleTooltip === this) {
            TooltipHostBase._currentVisibleTooltip = undefined;
        }
        this._async.dispose();
    };
    TooltipHostBase.defaultProps = {
        delay: _Tooltip_types__WEBPACK_IMPORTED_MODULE_6__["TooltipDelay"].medium
    };
    return TooltipHostBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=TooltipHost.base.js.map

/***/ }),

/***/ "Z/rk":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Tooltip/index.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tooltip */ "OAft");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return _Tooltip__WEBPACK_IMPORTED_MODULE_0__["Tooltip"]; });

/* harmony import */ var _Tooltip_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tooltip.base */ "QZCX");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipBase", function() { return _Tooltip_base__WEBPACK_IMPORTED_MODULE_1__["TooltipBase"]; });

/* harmony import */ var _Tooltip_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tooltip.types */ "CmDp");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipDelay", function() { return _Tooltip_types__WEBPACK_IMPORTED_MODULE_2__["TooltipDelay"]; });

/* harmony import */ var _TooltipHost__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TooltipHost */ "9SCQ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipHost", function() { return _TooltipHost__WEBPACK_IMPORTED_MODULE_3__["TooltipHost"]; });

/* harmony import */ var _TooltipHost_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TooltipHost.base */ "Xrkt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipHostBase", function() { return _TooltipHost_base__WEBPACK_IMPORTED_MODULE_4__["TooltipHostBase"]; });

/* harmony import */ var _TooltipHost_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TooltipHost.types */ "ALbB");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipOverflowMode", function() { return _TooltipHost_types__WEBPACK_IMPORTED_MODULE_5__["TooltipOverflowMode"]; });

/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/DirectionalHint */ "zCYU");
/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_6__) if(["Tooltip","TooltipBase","TooltipDelay","TooltipHost","TooltipHostBase","TooltipOverflowMode","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_6__[key]; }) }(__WEBPACK_IMPORT_KEY__));







//# sourceMappingURL=index.js.map

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

/***/ "ic8p":
/*!******************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/visual-dom-diff/0.7.2/node_modules/visual-dom-diff/lib/util.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var diff_match_patch_1 = __webpack_require__(/*! diff-match-patch */ "lv7O");
function isElement(node) {
    return node.nodeType === node.ELEMENT_NODE;
}
exports.isElement = isElement;
function isText(node) {
    return node.nodeType === node.TEXT_NODE;
}
exports.isText = isText;
function isDocument(node) {
    return node.nodeType === node.DOCUMENT_NODE;
}
exports.isDocument = isDocument;
function isDocumentFragment(node) {
    return node.nodeType === node.DOCUMENT_FRAGMENT_NODE;
}
exports.isDocumentFragment = isDocumentFragment;
function isComment(node) {
    return node.nodeType === node.COMMENT_NODE;
}
exports.isComment = isComment;
function strictEqual(item1, item2) {
    return item1 === item2;
}
exports.strictEqual = strictEqual;
function areArraysEqual(array1, array2, comparator) {
    if (comparator === void 0) { comparator = strictEqual; }
    if (array1.length !== array2.length) {
        return false;
    }
    for (var i = 0, l = array1.length; i < l; ++i) {
        if (!comparator(array1[i], array2[i])) {
            return false;
        }
    }
    return true;
}
exports.areArraysEqual = areArraysEqual;
function getAttributeNames(element) {
    if (element.getAttributeNames) {
        return element.getAttributeNames();
    }
    else {
        var attributes = element.attributes;
        var length_1 = attributes.length;
        var attributeNames = new Array(length_1);
        for (var i = 0; i < length_1; i++) {
            attributeNames[i] = attributes[i].name;
        }
        return attributeNames;
    }
}
/**
 * Compares DOM nodes for equality.
 * @param node1 The first node to compare.
 * @param node2 The second node to compare.
 * @param deep If true, the child nodes are compared recursively too.
 * @returns `true`, if the 2 nodes are equal, otherwise `false`.
 */
function areNodesEqual(node1, node2, deep) {
    if (deep === void 0) { deep = false; }
    if (node1 === node2) {
        return true;
    }
    if (node1.nodeType !== node2.nodeType ||
        node1.nodeName !== node2.nodeName) {
        return false;
    }
    if (isText(node1) || isComment(node1)) {
        if (node1.data !== node2.data) {
            return false;
        }
    }
    else if (isElement(node1)) {
        var attributeNames1 = getAttributeNames(node1).sort();
        var attributeNames2 = getAttributeNames(node2).sort();
        if (!areArraysEqual(attributeNames1, attributeNames2)) {
            return false;
        }
        for (var i = 0, l = attributeNames1.length; i < l; ++i) {
            var name_1 = attributeNames1[i];
            var value1 = node1.getAttribute(name_1);
            var value2 = node2.getAttribute(name_1);
            if (value1 !== value2) {
                return false;
            }
        }
    }
    if (deep) {
        var childNodes1 = node1.childNodes;
        var childNodes2 = node2.childNodes;
        if (childNodes1.length !== childNodes2.length) {
            return false;
        }
        for (var i = 0, l = childNodes1.length; i < l; ++i) {
            if (!areNodesEqual(childNodes1[i], childNodes2[i], deep)) {
                return false;
            }
        }
    }
    return true;
}
exports.areNodesEqual = areNodesEqual;
/**
 * Gets a list of `node`'s ancestor nodes up until and including `rootNode`.
 * @param node Node whose ancestors to get.
 * @param rootNode The root node.
 */
function getAncestors(node, rootNode) {
    if (rootNode === void 0) { rootNode = null; }
    if (!node || node === rootNode) {
        return [];
    }
    var ancestors = [];
    var currentNode = node.parentNode;
    while (currentNode) {
        ancestors.push(currentNode);
        if (currentNode === rootNode) {
            break;
        }
        currentNode = currentNode.parentNode;
    }
    return ancestors;
}
exports.getAncestors = getAncestors;
function never(message) {
    if (message === void 0) { message = 'visual-dom-diff: Should never happen'; }
    throw new Error(message);
}
exports.never = never;
// Source: https://stackoverflow.com/a/7616484/706807 (simplified)
function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        // tslint:disable-next-line:no-bitwise
        hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    }
    return hash;
}
exports.hashCode = hashCode;
/**
 * Returns a single character which should replace the given node name
 * when serializing a non-text node.
 */
function charForNodeName(nodeName) {
    return String.fromCharCode(0xe000 + (hashCode(nodeName) % (0xf900 - 0xe000)));
}
exports.charForNodeName = charForNodeName;
/**
 * Moves trailing HTML tag markers in the DIFF_INSERT and DIFF_DELETE diff items to the front,
 * if possible, in order to improve quality of the DOM diff.
 */
function cleanUpNodeMarkers(diff) {
    for (var i = 0; i < diff.length - 2;) {
        var diff0 = diff[i];
        var diff1 = diff[i + 1];
        var diff2 = diff[i + 2];
        if (diff0[0] !== diff_match_patch_1.DIFF_EQUAL ||
            diff1[0] === diff_match_patch_1.DIFF_EQUAL ||
            diff2[0] !== diff_match_patch_1.DIFF_EQUAL) {
            i++;
            continue;
        }
        var string0 = diff0[1];
        var string1 = diff1[1];
        var string2 = diff2[1];
        var lastChar0 = string0[string0.length - 1];
        var lastChar1 = string1[string1.length - 1];
        if (lastChar0 !== lastChar1 ||
            lastChar0 < '\uE000' ||
            lastChar0 >= '\uF900') {
            i++;
            continue;
        }
        diff0[1] = string0.substring(0, string0.length - 1);
        diff1[1] = lastChar0 + string1.substring(0, string1.length - 1);
        diff2[1] = lastChar0 + string2;
        if (diff0[1].length === 0) {
            diff.splice(i, 1);
        }
    }
}
exports.cleanUpNodeMarkers = cleanUpNodeMarkers;
var dmp = new diff_match_patch_1.diff_match_patch();
/**
 * Diffs the 2 strings and cleans up the result before returning it.
 */
function diffText(oldText, newText) {
    var diff = dmp.diff_main(oldText, newText);
    var result = [];
    var temp = [];
    cleanUpNodeMarkers(diff);
    // Execute `dmp.diff_cleanupSemantic` excluding equal node markers.
    for (var i = 0, l = diff.length; i < l; ++i) {
        var item = diff[i];
        if (item[0] === diff_match_patch_1.DIFF_EQUAL) {
            var text = item[1];
            var totalLength = text.length;
            var prefixLength = /^[^\uE000-\uF8FF]*/.exec(text)[0].length;
            if (prefixLength < totalLength) {
                var suffixLength = /[^\uE000-\uF8FF]*$/.exec(text)[0].length;
                if (prefixLength > 0) {
                    temp.push([diff_match_patch_1.DIFF_EQUAL, text.substring(0, prefixLength)]);
                }
                dmp.diff_cleanupSemantic(temp);
                pushAll(result, temp);
                temp.length = 0;
                result.push([
                    diff_match_patch_1.DIFF_EQUAL,
                    text.substring(prefixLength, totalLength - suffixLength),
                ]);
                if (suffixLength > 0) {
                    temp.push([
                        diff_match_patch_1.DIFF_EQUAL,
                        text.substring(totalLength - suffixLength),
                    ]);
                }
            }
            else {
                temp.push(item);
            }
        }
        else {
            temp.push(item);
        }
    }
    dmp.diff_cleanupSemantic(temp);
    pushAll(result, temp);
    temp.length = 0;
    dmp.diff_cleanupMerge(result);
    cleanUpNodeMarkers(result);
    return result;
}
exports.diffText = diffText;
function pushAll(array, items) {
    var destination = array.length;
    var source = 0;
    var length = items.length;
    while (source < length) {
        array[destination++] = items[source++];
    }
}
function markUpNode(node, elementName, className) {
    var document = node.ownerDocument;
    var parentNode = node.parentNode;
    var previousSibling = node.previousSibling;
    if (isElement(node)) {
        node.classList.add(className);
    }
    else if (previousSibling &&
        previousSibling.nodeName === elementName &&
        previousSibling.classList.contains(className)) {
        previousSibling.appendChild(node);
    }
    else {
        var wrapper = document.createElement(elementName);
        wrapper.classList.add(className);
        parentNode.insertBefore(wrapper, node);
        wrapper.appendChild(node);
    }
}
exports.markUpNode = markUpNode;
function isTableValid(table, verifyColumns) {
    var columnCount;
    return validateTable(table);
    function validateTable(_a) {
        var childNodes = _a.childNodes;
        var l = childNodes.length;
        var i = 0;
        if (i < l && childNodes[i].nodeName === 'CAPTION') {
            i++;
        }
        if (i < l && childNodes[i].nodeName === 'THEAD') {
            if (!validateRowGroup(childNodes[i])) {
                return false;
            }
            i++;
        }
        if (i < l && childNodes[i].nodeName === 'TBODY') {
            if (!validateRowGroup(childNodes[i])) {
                return false;
            }
            i++;
        }
        else {
            return false;
        }
        if (i < l && childNodes[i].nodeName === 'TFOOT') {
            if (!validateRowGroup(childNodes[i])) {
                return false;
            }
            i++;
        }
        return i === l;
    }
    function validateRowGroup(_a) {
        var childNodes = _a.childNodes, nodeName = _a.nodeName;
        if (nodeName === 'TBODY' && childNodes.length === 0) {
            return false;
        }
        for (var i = 0, l = childNodes.length; i < l; ++i) {
            if (!validateRow(childNodes[i])) {
                return false;
            }
        }
        return true;
    }
    function validateRow(_a) {
        var childNodes = _a.childNodes, nodeName = _a.nodeName;
        if (nodeName !== 'TR' || childNodes.length === 0) {
            return false;
        }
        if (verifyColumns) {
            if (columnCount === undefined) {
                columnCount = childNodes.length;
            }
            else if (columnCount !== childNodes.length) {
                return false;
            }
        }
        for (var i = 0, l = childNodes.length; i < l; ++i) {
            if (!validateCell(childNodes[i])) {
                return false;
            }
        }
        return true;
    }
    function validateCell(node) {
        var nodeName = node.nodeName;
        if (nodeName !== 'TD' && nodeName !== 'TH') {
            return false;
        }
        var cell = node;
        var colspan = cell.getAttribute('colspan');
        var rowspan = cell.getAttribute('rowspan');
        return ((colspan === null || colspan === '1') &&
            (rowspan === null || rowspan === '1'));
    }
}
exports.isTableValid = isTableValid;


/***/ }),

/***/ "kGBT":
/*!*******************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/visual-dom-diff/0.7.2/node_modules/visual-dom-diff/lib/index.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tCkv");
tslib_1.__exportStar(__webpack_require__(/*! ./diff */ "oeZw"), exports);


/***/ }),

/***/ "lv7O":
/*!*****************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/diff-match-patch/1.0.4/node_modules/diff-match-patch/index.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Diff Match and Patch
 * Copyright 2018 The diff-match-patch Authors.
 * https://github.com/google/diff-match-patch
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Computes the difference between two texts to create a patch.
 * Applies the patch onto another text, allowing for errors.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 * Class containing the diff, match and patch methods.
 * @constructor
 */
function diff_match_patch() {

  // Defaults.
  // Redefine these in your program to override the defaults.

  // Number of seconds to map a diff before giving up (0 for infinity).
  this.Diff_Timeout = 1.0;
  // Cost of an empty edit operation in terms of edit characters.
  this.Diff_EditCost = 4;
  // At what point is no match declared (0.0 = perfection, 1.0 = very loose).
  this.Match_Threshold = 0.5;
  // How far to search for a match (0 = exact location, 1000+ = broad match).
  // A match this many characters away from the expected location will add
  // 1.0 to the score (0.0 is a perfect match).
  this.Match_Distance = 1000;
  // When deleting a large block of text (over ~64 characters), how close do
  // the contents have to be to match the expected contents. (0.0 = perfection,
  // 1.0 = very loose).  Note that Match_Threshold controls how closely the
  // end points of a delete need to match.
  this.Patch_DeleteThreshold = 0.5;
  // Chunk size for context length.
  this.Patch_Margin = 4;

  // The number of bits in an int.
  this.Match_MaxBits = 32;
}


//  DIFF FUNCTIONS


/**
 * The data structure representing a diff is an array of tuples:
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
 */
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;

/** @typedef {{0: number, 1: string}} */
diff_match_patch.Diff;


/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {boolean=} opt_checklines Optional speedup flag. If present and false,
 *     then don't run a line-level diff first to identify the changed areas.
 *     Defaults to true, which does a faster, slightly less optimal diff.
 * @param {number} opt_deadline Optional time when the diff should be complete
 *     by.  Used internally for recursive calls.  Users should set DiffTimeout
 *     instead.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 */
diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines,
    opt_deadline) {
  // Set a deadline by which time the diff must be complete.
  if (typeof opt_deadline == 'undefined') {
    if (this.Diff_Timeout <= 0) {
      opt_deadline = Number.MAX_VALUE;
    } else {
      opt_deadline = (new Date).getTime() + this.Diff_Timeout * 1000;
    }
  }
  var deadline = opt_deadline;

  // Check for null inputs.
  if (text1 == null || text2 == null) {
    throw new Error('Null input. (diff_main)');
  }

  // Check for equality (speedup).
  if (text1 == text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }
    return [];
  }

  if (typeof opt_checklines == 'undefined') {
    opt_checklines = true;
  }
  var checklines = opt_checklines;

  // Trim off common prefix (speedup).
  var commonlength = this.diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  // Trim off common suffix (speedup).
  commonlength = this.diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  // Compute the diff on the middle block.
  var diffs = this.diff_compute_(text1, text2, checklines, deadline);

  // Restore the prefix and suffix.
  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  this.diff_cleanupMerge(diffs);
  return diffs;
};


/**
 * Find the differences between two texts.  Assumes that the texts do not
 * have any common prefix or suffix.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {boolean} checklines Speedup flag.  If false, then don't run a
 *     line-level diff first to identify the changed areas.
 *     If true, then run a faster, slightly less optimal diff.
 * @param {number} deadline Time when the diff should be complete by.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines,
    deadline) {
  var diffs;

  if (!text1) {
    // Just add some text (speedup).
    return [[DIFF_INSERT, text2]];
  }

  if (!text2) {
    // Just delete some text (speedup).
    return [[DIFF_DELETE, text1]];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i != -1) {
    // Shorter text is inside the longer text (speedup).
    diffs = [[DIFF_INSERT, longtext.substring(0, i)],
             [DIFF_EQUAL, shorttext],
             [DIFF_INSERT, longtext.substring(i + shorttext.length)]];
    // Swap insertions for deletions if diff is reversed.
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }

  if (shorttext.length == 1) {
    // Single character string.
    // After the previous speedup, the character can't be an equality.
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  }

  // Check to see if the problem can be split in two.
  var hm = this.diff_halfMatch_(text1, text2);
  if (hm) {
    // A half-match was found, sort out the return data.
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    // Send both pairs off for separate processing.
    var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
    var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
    // Merge the results.
    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
  }

  if (checklines && text1.length > 100 && text2.length > 100) {
    return this.diff_lineMode_(text1, text2, deadline);
  }

  return this.diff_bisect_(text1, text2, deadline);
};


/**
 * Do a quick line-level diff on both strings, then rediff the parts for
 * greater accuracy.
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} deadline Time when the diff should be complete by.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {
  // Scan the text on a line-by-line basis first.
  var a = this.diff_linesToChars_(text1, text2);
  text1 = a.chars1;
  text2 = a.chars2;
  var linearray = a.lineArray;

  var diffs = this.diff_main(text1, text2, false, deadline);

  // Convert the diff back to original text.
  this.diff_charsToLines_(diffs, linearray);
  // Eliminate freak matches (e.g. blank lines)
  this.diff_cleanupSemantic(diffs);

  // Rediff any replacement blocks, this time character-by-character.
  // Add a dummy entry at the end.
  diffs.push([DIFF_EQUAL, '']);
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete >= 1 && count_insert >= 1) {
          // Delete the offending records and add the merged ones.
          diffs.splice(pointer - count_delete - count_insert,
                       count_delete + count_insert);
          pointer = pointer - count_delete - count_insert;
          var a = this.diff_main(text_delete, text_insert, false, deadline);
          for (var j = a.length - 1; j >= 0; j--) {
            diffs.splice(pointer, 0, a[j]);
          }
          pointer = pointer + a.length;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
    pointer++;
  }
  diffs.pop();  // Remove the dummy entry at the end.

  return diffs;
};


/**
 * Find the 'middle snake' of a diff, split the problem in two
 * and return the recursively constructed diff.
 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} deadline Time at which to bail if not yet complete.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);
  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  // integers and undefined.
  for (var x = 0; x < v_length; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;
  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  var front = (delta % 2 != 0);
  // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.
  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d = 0; d < max_d; d++) {
    // Bail out if deadline is reached.
    if ((new Date()).getTime() > deadline) {
      break;
    }

    // Walk the front path one step.
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (x1 < text1_length && y1 < text2_length &&
             text1.charAt(x1) == text2.charAt(y1)) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2_length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
          // Mirror x2 onto top-left coordinate system.
          var x2 = text1_length - v2[k2_offset];
          if (x1 >= x2) {
            // Overlap detected.
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }

    // Walk the reverse path one step.
    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x2;
      if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
        x2 = v2[k2_offset + 1];
      } else {
        x2 = v2[k2_offset - 1] + 1;
      }
      var y2 = x2 - k2;
      while (x2 < text1_length && y2 < text2_length &&
             text1.charAt(text1_length - x2 - 1) ==
             text2.charAt(text2_length - y2 - 1)) {
        x2++;
        y2++;
      }
      v2[k2_offset] = x2;
      if (x2 > text1_length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2_length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;
          // Mirror x2 onto top-left coordinate system.
          x2 = text1_length - x2;
          if (x1 >= x2) {
            // Overlap detected.
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }
  }
  // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.
  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
};


/**
 * Given the location of the 'middle snake', split the diff in two parts
 * and recurse.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} x Index of split point in text1.
 * @param {number} y Index of split point in text2.
 * @param {number} deadline Time at which to bail if not yet complete.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x, y,
    deadline) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y);

  // Compute both diffs serially.
  var diffs = this.diff_main(text1a, text2a, false, deadline);
  var diffsb = this.diff_main(text1b, text2b, false, deadline);

  return diffs.concat(diffsb);
};


/**
 * Split two texts into an array of strings.  Reduce the texts to a string of
 * hashes where each Unicode character represents one line.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}
 *     An object containing the encoded text1, the encoded text2 and
 *     the array of unique strings.
 *     The zeroth element of the array of unique strings is intentionally blank.
 * @private
 */
diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {
  var lineArray = [];  // e.g. lineArray[4] == 'Hello\n'
  var lineHash = {};   // e.g. lineHash['Hello\n'] == 4

  // '\x00' is a valid character, but various debuggers don't like it.
  // So we'll insert a junk entry to avoid generating a null character.
  lineArray[0] = '';

  /**
   * Split a text into an array of strings.  Reduce the texts to a string of
   * hashes where each Unicode character represents one line.
   * Modifies linearray and linehash through being a closure.
   * @param {string} text String to encode.
   * @return {string} Encoded string.
   * @private
   */
  function diff_linesToCharsMunge_(text) {
    var chars = '';
    // Walk the text, pulling out a substring for each line.
    // text.split('\n') would would temporarily double our memory footprint.
    // Modifying text would create many large strings to garbage collect.
    var lineStart = 0;
    var lineEnd = -1;
    // Keeping our own length variable is faster than looking it up.
    var lineArrayLength = lineArray.length;
    while (lineEnd < text.length - 1) {
      lineEnd = text.indexOf('\n', lineStart);
      if (lineEnd == -1) {
        lineEnd = text.length - 1;
      }
      var line = text.substring(lineStart, lineEnd + 1);
      lineStart = lineEnd + 1;

      if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) :
          (lineHash[line] !== undefined)) {
        chars += String.fromCharCode(lineHash[line]);
      } else {
        chars += String.fromCharCode(lineArrayLength);
        lineHash[line] = lineArrayLength;
        lineArray[lineArrayLength++] = line;
      }
    }
    return chars;
  }

  var chars1 = diff_linesToCharsMunge_(text1);
  var chars2 = diff_linesToCharsMunge_(text2);
  return {chars1: chars1, chars2: chars2, lineArray: lineArray};
};


/**
 * Rehydrate the text in a diff from a string of line hashes to real lines of
 * text.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @param {!Array.<string>} lineArray Array of unique strings.
 * @private
 */
diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {
  for (var x = 0; x < diffs.length; x++) {
    var chars = diffs[x][1];
    var text = [];
    for (var y = 0; y < chars.length; y++) {
      text[y] = lineArray[chars.charCodeAt(y)];
    }
    diffs[x][1] = text.join('');
  }
};


/**
 * Determine the common prefix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the start of each
 *     string.
 */
diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (text1.substring(pointerstart, pointermid) ==
        text2.substring(pointerstart, pointermid)) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine the common suffix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of each string.
 */
diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 ||
      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine if the suffix of one string is the prefix of another.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of the first
 *     string and the start of the second string.
 * @private
 */
diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  // Eliminate the null case.
  if (text1_length == 0 || text2_length == 0) {
    return 0;
  }
  // Truncate the longer string.
  if (text1_length > text2_length) {
    text1 = text1.substring(text1_length - text2_length);
  } else if (text1_length < text2_length) {
    text2 = text2.substring(0, text1_length);
  }
  var text_length = Math.min(text1_length, text2_length);
  // Quick check for the worst case.
  if (text1 == text2) {
    return text_length;
  }

  // Start by looking for a single character match
  // and increase length until no match is found.
  // Performance analysis: http://neil.fraser.name/news/2010/11/04/
  var best = 0;
  var length = 1;
  while (true) {
    var pattern = text1.substring(text_length - length);
    var found = text2.indexOf(pattern);
    if (found == -1) {
      return best;
    }
    length += found;
    if (found == 0 || text1.substring(text_length - length) ==
        text2.substring(0, length)) {
      best = length;
      length++;
    }
  }
};


/**
 * Do the two texts share a substring which is at least half the length of the
 * longer text?
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {Array.<string>} Five element Array, containing the prefix of
 *     text1, the suffix of text1, the prefix of text2, the suffix of
 *     text2 and the common middle.  Or null if there was no match.
 * @private
 */
diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {
  if (this.Diff_Timeout <= 0) {
    // Don't risk returning a non-optimal diff if we have unlimited time.
    return null;
  }
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null;  // Pointless.
  }
  var dmp = this;  // 'this' becomes 'window' in a closure.

  /**
   * Does a substring of shorttext exist within longtext such that the substring
   * is at least half the length of longtext?
   * Closure, but does not reference any external variables.
   * @param {string} longtext Longer string.
   * @param {string} shorttext Shorter string.
   * @param {number} i Start index of quarter length substring within longtext.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
   *     of shorttext and the common middle.  Or null if there was no match.
   * @private
   */
  function diff_halfMatchI_(longtext, shorttext, i) {
    // Start with a 1/4 length substring at position i as a seed.
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var best_common = '';
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
      var prefixLength = dmp.diff_commonPrefix(longtext.substring(i),
                                               shorttext.substring(j));
      var suffixLength = dmp.diff_commonSuffix(longtext.substring(0, i),
                                               shorttext.substring(0, j));
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext.substring(j - suffixLength, j) +
            shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext.length) {
      return [best_longtext_a, best_longtext_b,
              best_shorttext_a, best_shorttext_b, best_common];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  var hm1 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 4));
  // Check again based on the third quarter.
  var hm2 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 2));
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    // Both matched.  Select the longest.
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
};


/**
 * Reduce the number of edits by eliminating semantically trivial equalities.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {
  var changes = false;
  var equalities = [];  // Stack of indices where equalities are found.
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  /** @type {?string} */
  var lastequality = null;
  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
  var pointer = 0;  // Index of current position.
  // Number of characters that changed prior to the equality.
  var length_insertions1 = 0;
  var length_deletions1 = 0;
  // Number of characters that changed after the equality.
  var length_insertions2 = 0;
  var length_deletions2 = 0;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
      equalities[equalitiesLength++] = pointer;
      length_insertions1 = length_insertions2;
      length_deletions1 = length_deletions2;
      length_insertions2 = 0;
      length_deletions2 = 0;
      lastequality = diffs[pointer][1];
    } else {  // An insertion or deletion.
      if (diffs[pointer][0] == DIFF_INSERT) {
        length_insertions2 += diffs[pointer][1].length;
      } else {
        length_deletions2 += diffs[pointer][1].length;
      }
      // Eliminate an equality that is smaller or equal to the edits on both
      // sides of it.
      if (lastequality && (lastequality.length <=
          Math.max(length_insertions1, length_deletions1)) &&
          (lastequality.length <= Math.max(length_insertions2,
                                           length_deletions2))) {
        // Duplicate record.
        diffs.splice(equalities[equalitiesLength - 1], 0,
                     [DIFF_DELETE, lastequality]);
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        // Throw away the equality we just deleted.
        equalitiesLength--;
        // Throw away the previous equality (it needs to be reevaluated).
        equalitiesLength--;
        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
        length_insertions1 = 0;  // Reset the counters.
        length_deletions1 = 0;
        length_insertions2 = 0;
        length_deletions2 = 0;
        lastequality = null;
        changes = true;
      }
    }
    pointer++;
  }

  // Normalize the diff.
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
  this.diff_cleanupSemanticLossless(diffs);

  // Find any overlaps between deletions and insertions.
  // e.g: <del>abcxxx</del><ins>xxxdef</ins>
  //   -> <del>abc</del>xxx<ins>def</ins>
  // e.g: <del>xxxabc</del><ins>defxxx</ins>
  //   -> <ins>def</ins>xxx<del>abc</del>
  // Only extract an overlap if it is as big as the edit ahead or behind it.
  pointer = 1;
  while (pointer < diffs.length) {
    if (diffs[pointer - 1][0] == DIFF_DELETE &&
        diffs[pointer][0] == DIFF_INSERT) {
      var deletion = diffs[pointer - 1][1];
      var insertion = diffs[pointer][1];
      var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
      var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
      if (overlap_length1 >= overlap_length2) {
        if (overlap_length1 >= deletion.length / 2 ||
            overlap_length1 >= insertion.length / 2) {
          // Overlap found.  Insert an equality and trim the surrounding edits.
          diffs.splice(pointer, 0,
              [DIFF_EQUAL, insertion.substring(0, overlap_length1)]);
          diffs[pointer - 1][1] =
              deletion.substring(0, deletion.length - overlap_length1);
          diffs[pointer + 1][1] = insertion.substring(overlap_length1);
          pointer++;
        }
      } else {
        if (overlap_length2 >= deletion.length / 2 ||
            overlap_length2 >= insertion.length / 2) {
          // Reverse overlap found.
          // Insert an equality and swap and trim the surrounding edits.
          diffs.splice(pointer, 0,
              [DIFF_EQUAL, deletion.substring(0, overlap_length2)]);
          diffs[pointer - 1][0] = DIFF_INSERT;
          diffs[pointer - 1][1] =
              insertion.substring(0, insertion.length - overlap_length2);
          diffs[pointer + 1][0] = DIFF_DELETE;
          diffs[pointer + 1][1] =
              deletion.substring(overlap_length2);
          pointer++;
        }
      }
      pointer++;
    }
    pointer++;
  }
};


/**
 * Look for single edits surrounded on both sides by equalities
 * which can be shifted sideways to align the edit to a word boundary.
 * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {
  /**
   * Given two strings, compute a score representing whether the internal
   * boundary falls on logical boundaries.
   * Scores range from 6 (best) to 0 (worst).
   * Closure, but does not reference any external variables.
   * @param {string} one First string.
   * @param {string} two Second string.
   * @return {number} The score.
   * @private
   */
  function diff_cleanupSemanticScore_(one, two) {
    if (!one || !two) {
      // Edges are the best.
      return 6;
    }

    // Each port of this function behaves slightly differently due to
    // subtle differences in each language's definition of things like
    // 'whitespace'.  Since this function's purpose is largely cosmetic,
    // the choice has been made to use each language's native features
    // rather than force total conformity.
    var char1 = one.charAt(one.length - 1);
    var char2 = two.charAt(0);
    var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
    var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
    var whitespace1 = nonAlphaNumeric1 &&
        char1.match(diff_match_patch.whitespaceRegex_);
    var whitespace2 = nonAlphaNumeric2 &&
        char2.match(diff_match_patch.whitespaceRegex_);
    var lineBreak1 = whitespace1 &&
        char1.match(diff_match_patch.linebreakRegex_);
    var lineBreak2 = whitespace2 &&
        char2.match(diff_match_patch.linebreakRegex_);
    var blankLine1 = lineBreak1 &&
        one.match(diff_match_patch.blanklineEndRegex_);
    var blankLine2 = lineBreak2 &&
        two.match(diff_match_patch.blanklineStartRegex_);

    if (blankLine1 || blankLine2) {
      // Five points for blank lines.
      return 5;
    } else if (lineBreak1 || lineBreak2) {
      // Four points for line breaks.
      return 4;
    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
      // Three points for end of sentences.
      return 3;
    } else if (whitespace1 || whitespace2) {
      // Two points for whitespace.
      return 2;
    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
      // One point for non-alphanumeric.
      return 1;
    }
    return 0;
  }

  var pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      var equality1 = diffs[pointer - 1][1];
      var edit = diffs[pointer][1];
      var equality2 = diffs[pointer + 1][1];

      // First, shift the edit as far left as possible.
      var commonOffset = this.diff_commonSuffix(equality1, edit);
      if (commonOffset) {
        var commonString = edit.substring(edit.length - commonOffset);
        equality1 = equality1.substring(0, equality1.length - commonOffset);
        edit = commonString + edit.substring(0, edit.length - commonOffset);
        equality2 = commonString + equality2;
      }

      // Second, step character by character right, looking for the best fit.
      var bestEquality1 = equality1;
      var bestEdit = edit;
      var bestEquality2 = equality2;
      var bestScore = diff_cleanupSemanticScore_(equality1, edit) +
          diff_cleanupSemanticScore_(edit, equality2);
      while (edit.charAt(0) === equality2.charAt(0)) {
        equality1 += edit.charAt(0);
        edit = edit.substring(1) + equality2.charAt(0);
        equality2 = equality2.substring(1);
        var score = diff_cleanupSemanticScore_(equality1, edit) +
            diff_cleanupSemanticScore_(edit, equality2);
        // The >= encourages trailing rather than leading whitespace on edits.
        if (score >= bestScore) {
          bestScore = score;
          bestEquality1 = equality1;
          bestEdit = edit;
          bestEquality2 = equality2;
        }
      }

      if (diffs[pointer - 1][1] != bestEquality1) {
        // We have an improvement, save it back to the diff.
        if (bestEquality1) {
          diffs[pointer - 1][1] = bestEquality1;
        } else {
          diffs.splice(pointer - 1, 1);
          pointer--;
        }
        diffs[pointer][1] = bestEdit;
        if (bestEquality2) {
          diffs[pointer + 1][1] = bestEquality2;
        } else {
          diffs.splice(pointer + 1, 1);
          pointer--;
        }
      }
    }
    pointer++;
  }
};

// Define some regex patterns for matching boundaries.
diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
diff_match_patch.whitespaceRegex_ = /\s/;
diff_match_patch.linebreakRegex_ = /[\r\n]/;
diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;

/**
 * Reduce the number of edits by eliminating operationally trivial equalities.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
  var changes = false;
  var equalities = [];  // Stack of indices where equalities are found.
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  /** @type {?string} */
  var lastequality = null;
  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
  var pointer = 0;  // Index of current position.
  // Is there an insertion operation before the last equality.
  var pre_ins = false;
  // Is there a deletion operation before the last equality.
  var pre_del = false;
  // Is there an insertion operation after the last equality.
  var post_ins = false;
  // Is there a deletion operation after the last equality.
  var post_del = false;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
      if (diffs[pointer][1].length < this.Diff_EditCost &&
          (post_ins || post_del)) {
        // Candidate found.
        equalities[equalitiesLength++] = pointer;
        pre_ins = post_ins;
        pre_del = post_del;
        lastequality = diffs[pointer][1];
      } else {
        // Not a candidate, and can never become one.
        equalitiesLength = 0;
        lastequality = null;
      }
      post_ins = post_del = false;
    } else {  // An insertion or deletion.
      if (diffs[pointer][0] == DIFF_DELETE) {
        post_del = true;
      } else {
        post_ins = true;
      }
      /*
       * Five types to be split:
       * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
       * <ins>A</ins>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<ins>C</ins>
       * <ins>A</del>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<del>C</del>
       */
      if (lastequality && ((pre_ins && pre_del && post_ins && post_del) ||
                           ((lastequality.length < this.Diff_EditCost / 2) &&
                            (pre_ins + pre_del + post_ins + post_del) == 3))) {
        // Duplicate record.
        diffs.splice(equalities[equalitiesLength - 1], 0,
                     [DIFF_DELETE, lastequality]);
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        equalitiesLength--;  // Throw away the equality we just deleted;
        lastequality = null;
        if (pre_ins && pre_del) {
          // No changes made which could affect previous entry, keep going.
          post_ins = post_del = true;
          equalitiesLength = 0;
        } else {
          equalitiesLength--;  // Throw away the previous equality.
          pointer = equalitiesLength > 0 ?
              equalities[equalitiesLength - 1] : -1;
          post_ins = post_del = false;
        }
        changes = true;
      }
    }
    pointer++;
  }

  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};


/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {
  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  var commonlength;
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete + count_insert > 1) {
          if (count_delete !== 0 && count_insert !== 0) {
            // Factor out any common prefixies.
            commonlength = this.diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if ((pointer - count_delete - count_insert) > 0 &&
                  diffs[pointer - count_delete - count_insert - 1][0] ==
                  DIFF_EQUAL) {
                diffs[pointer - count_delete - count_insert - 1][1] +=
                    text_insert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, [DIFF_EQUAL,
                                    text_insert.substring(0, commonlength)]);
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            // Factor out any common suffixies.
            commonlength = this.diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] = text_insert.substring(text_insert.length -
                  commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(0, text_insert.length -
                  commonlength);
              text_delete = text_delete.substring(0, text_delete.length -
                  commonlength);
            }
          }
          // Delete the offending records and add the merged ones.
          if (count_delete === 0) {
            diffs.splice(pointer - count_insert,
                count_delete + count_insert, [DIFF_INSERT, text_insert]);
          } else if (count_insert === 0) {
            diffs.splice(pointer - count_delete,
                count_delete + count_insert, [DIFF_DELETE, text_delete]);
          } else {
            diffs.splice(pointer - count_delete - count_insert,
                count_delete + count_insert, [DIFF_DELETE, text_delete],
                [DIFF_INSERT, text_insert]);
          }
          pointer = pointer - count_delete - count_insert +
                    (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop();  // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  var changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (diffs[pointer][1].substring(diffs[pointer][1].length -
          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] +
            diffs[pointer][1].substring(0, diffs[pointer][1].length -
                                        diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
          diffs[pointer + 1][1]) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] =
            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
            diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};


/**
 * loc is a location in text1, compute and return the equivalent location in
 * text2.
 * e.g. 'The cat' vs 'The big cat', 1->1, 5->8
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @param {number} loc Location within text1.
 * @return {number} Location within text2.
 */
diff_match_patch.prototype.diff_xIndex = function(diffs, loc) {
  var chars1 = 0;
  var chars2 = 0;
  var last_chars1 = 0;
  var last_chars2 = 0;
  var x;
  for (x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_INSERT) {  // Equality or deletion.
      chars1 += diffs[x][1].length;
    }
    if (diffs[x][0] !== DIFF_DELETE) {  // Equality or insertion.
      chars2 += diffs[x][1].length;
    }
    if (chars1 > loc) {  // Overshot the location.
      break;
    }
    last_chars1 = chars1;
    last_chars2 = chars2;
  }
  // Was the location was deleted?
  if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
    return last_chars2;
  }
  // Add the remaining character length.
  return last_chars2 + (loc - last_chars1);
};


/**
 * Convert a diff array into a pretty HTML report.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} HTML representation.
 */
diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
  var html = [];
  var pattern_amp = /&/g;
  var pattern_lt = /</g;
  var pattern_gt = />/g;
  var pattern_para = /\n/g;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];    // Operation (insert, delete, equal)
    var data = diffs[x][1];  // Text of change.
    var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
        .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
    switch (op) {
      case DIFF_INSERT:
        html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
        break;
      case DIFF_DELETE:
        html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
        break;
      case DIFF_EQUAL:
        html[x] = '<span>' + text + '</span>';
        break;
    }
  }
  return html.join('');
};


/**
 * Compute and return the source text (all equalities and deletions).
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Source text.
 */
diff_match_patch.prototype.diff_text1 = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_INSERT) {
      text[x] = diffs[x][1];
    }
  }
  return text.join('');
};


/**
 * Compute and return the destination text (all equalities and insertions).
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Destination text.
 */
diff_match_patch.prototype.diff_text2 = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_DELETE) {
      text[x] = diffs[x][1];
    }
  }
  return text.join('');
};


/**
 * Compute the Levenshtein distance; the number of inserted, deleted or
 * substituted characters.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {number} Number of changes.
 */
diff_match_patch.prototype.diff_levenshtein = function(diffs) {
  var levenshtein = 0;
  var insertions = 0;
  var deletions = 0;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];
    var data = diffs[x][1];
    switch (op) {
      case DIFF_INSERT:
        insertions += data.length;
        break;
      case DIFF_DELETE:
        deletions += data.length;
        break;
      case DIFF_EQUAL:
        // A deletion and an insertion is one substitution.
        levenshtein += Math.max(insertions, deletions);
        insertions = 0;
        deletions = 0;
        break;
    }
  }
  levenshtein += Math.max(insertions, deletions);
  return levenshtein;
};


/**
 * Crush the diff into an encoded string which describes the operations
 * required to transform text1 into text2.
 * E.g. =3\t-2\t+ing  -> Keep 3 chars, delete 2 chars, insert 'ing'.
 * Operations are tab-separated.  Inserted text is escaped using %xx notation.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Delta text.
 */
diff_match_patch.prototype.diff_toDelta = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    switch (diffs[x][0]) {
      case DIFF_INSERT:
        text[x] = '+' + encodeURI(diffs[x][1]);
        break;
      case DIFF_DELETE:
        text[x] = '-' + diffs[x][1].length;
        break;
      case DIFF_EQUAL:
        text[x] = '=' + diffs[x][1].length;
        break;
    }
  }
  return text.join('\t').replace(/%20/g, ' ');
};


/**
 * Given the original text1, and an encoded string which describes the
 * operations required to transform text1 into text2, compute the full diff.
 * @param {string} text1 Source string for the diff.
 * @param {string} delta Delta text.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @throws {!Error} If invalid input.
 */
diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {
  var diffs = [];
  var diffsLength = 0;  // Keeping our own length var is faster in JS.
  var pointer = 0;  // Cursor in text1
  var tokens = delta.split(/\t/g);
  for (var x = 0; x < tokens.length; x++) {
    // Each token begins with a one character parameter which specifies the
    // operation of this token (delete, insert, equality).
    var param = tokens[x].substring(1);
    switch (tokens[x].charAt(0)) {
      case '+':
        try {
          diffs[diffsLength++] = [DIFF_INSERT, decodeURI(param)];
        } catch (ex) {
          // Malformed URI sequence.
          throw new Error('Illegal escape in diff_fromDelta: ' + param);
        }
        break;
      case '-':
        // Fall through.
      case '=':
        var n = parseInt(param, 10);
        if (isNaN(n) || n < 0) {
          throw new Error('Invalid number in diff_fromDelta: ' + param);
        }
        var text = text1.substring(pointer, pointer += n);
        if (tokens[x].charAt(0) == '=') {
          diffs[diffsLength++] = [DIFF_EQUAL, text];
        } else {
          diffs[diffsLength++] = [DIFF_DELETE, text];
        }
        break;
      default:
        // Blank tokens are ok (from a trailing \t).
        // Anything else is an error.
        if (tokens[x]) {
          throw new Error('Invalid diff operation in diff_fromDelta: ' +
                          tokens[x]);
        }
    }
  }
  if (pointer != text1.length) {
    throw new Error('Delta length (' + pointer +
        ') does not equal source text length (' + text1.length + ').');
  }
  return diffs;
};


//  MATCH FUNCTIONS


/**
 * Locate the best instance of 'pattern' in 'text' near 'loc'.
 * @param {string} text The text to search.
 * @param {string} pattern The pattern to search for.
 * @param {number} loc The location to search around.
 * @return {number} Best match index or -1.
 */
diff_match_patch.prototype.match_main = function(text, pattern, loc) {
  // Check for null inputs.
  if (text == null || pattern == null || loc == null) {
    throw new Error('Null input. (match_main)');
  }

  loc = Math.max(0, Math.min(loc, text.length));
  if (text == pattern) {
    // Shortcut (potentially not guaranteed by the algorithm)
    return 0;
  } else if (!text.length) {
    // Nothing to match.
    return -1;
  } else if (text.substring(loc, loc + pattern.length) == pattern) {
    // Perfect match at the perfect spot!  (Includes case of null pattern)
    return loc;
  } else {
    // Do a fuzzy compare.
    return this.match_bitap_(text, pattern, loc);
  }
};


/**
 * Locate the best instance of 'pattern' in 'text' near 'loc' using the
 * Bitap algorithm.
 * @param {string} text The text to search.
 * @param {string} pattern The pattern to search for.
 * @param {number} loc The location to search around.
 * @return {number} Best match index or -1.
 * @private
 */
diff_match_patch.prototype.match_bitap_ = function(text, pattern, loc) {
  if (pattern.length > this.Match_MaxBits) {
    throw new Error('Pattern too long for this browser.');
  }

  // Initialise the alphabet.
  var s = this.match_alphabet_(pattern);

  var dmp = this;  // 'this' becomes 'window' in a closure.

  /**
   * Compute and return the score for a match with e errors and x location.
   * Accesses loc and pattern through being a closure.
   * @param {number} e Number of errors in match.
   * @param {number} x Location of match.
   * @return {number} Overall score for match (0.0 = good, 1.0 = bad).
   * @private
   */
  function match_bitapScore_(e, x) {
    var accuracy = e / pattern.length;
    var proximity = Math.abs(loc - x);
    if (!dmp.Match_Distance) {
      // Dodge divide by zero error.
      return proximity ? 1.0 : accuracy;
    }
    return accuracy + (proximity / dmp.Match_Distance);
  }

  // Highest score beyond which we give up.
  var score_threshold = this.Match_Threshold;
  // Is there a nearby exact match? (speedup)
  var best_loc = text.indexOf(pattern, loc);
  if (best_loc != -1) {
    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
    // What about in the other direction? (speedup)
    best_loc = text.lastIndexOf(pattern, loc + pattern.length);
    if (best_loc != -1) {
      score_threshold =
          Math.min(match_bitapScore_(0, best_loc), score_threshold);
    }
  }

  // Initialise the bit arrays.
  var matchmask = 1 << (pattern.length - 1);
  best_loc = -1;

  var bin_min, bin_mid;
  var bin_max = pattern.length + text.length;
  var last_rd;
  for (var d = 0; d < pattern.length; d++) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from 'loc' we can stray at this
    // error level.
    bin_min = 0;
    bin_mid = bin_max;
    while (bin_min < bin_mid) {
      if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
        bin_min = bin_mid;
      } else {
        bin_max = bin_mid;
      }
      bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
    }
    // Use the result from this iteration as the maximum for the next.
    bin_max = bin_mid;
    var start = Math.max(1, loc - bin_mid + 1);
    var finish = Math.min(loc + bin_mid, text.length) + pattern.length;

    var rd = Array(finish + 2);
    rd[finish + 1] = (1 << d) - 1;
    for (var j = finish; j >= start; j--) {
      // The alphabet (s) is a sparse hash, so the following line generates
      // warnings.
      var charMatch = s[text.charAt(j - 1)];
      if (d === 0) {  // First pass: exact match.
        rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
      } else {  // Subsequent passes: fuzzy match.
        rd[j] = (((rd[j + 1] << 1) | 1) & charMatch) |
                (((last_rd[j + 1] | last_rd[j]) << 1) | 1) |
                last_rd[j + 1];
      }
      if (rd[j] & matchmask) {
        var score = match_bitapScore_(d, j - 1);
        // This match will almost certainly be better than any existing match.
        // But check anyway.
        if (score <= score_threshold) {
          // Told you so.
          score_threshold = score;
          best_loc = j - 1;
          if (best_loc > loc) {
            // When passing loc, don't exceed our current distance from loc.
            start = Math.max(1, 2 * loc - best_loc);
          } else {
            // Already passed loc, downhill from here on in.
            break;
          }
        }
      }
    }
    // No hope for a (better) match at greater error levels.
    if (match_bitapScore_(d + 1, loc) > score_threshold) {
      break;
    }
    last_rd = rd;
  }
  return best_loc;
};


/**
 * Initialise the alphabet for the Bitap algorithm.
 * @param {string} pattern The text to encode.
 * @return {!Object} Hash of character locations.
 * @private
 */
diff_match_patch.prototype.match_alphabet_ = function(pattern) {
  var s = {};
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] = 0;
  }
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] |= 1 << (pattern.length - i - 1);
  }
  return s;
};


//  PATCH FUNCTIONS


/**
 * Increase the context until it is unique,
 * but don't let the pattern expand beyond Match_MaxBits.
 * @param {!diff_match_patch.patch_obj} patch The patch to grow.
 * @param {string} text Source text.
 * @private
 */
diff_match_patch.prototype.patch_addContext_ = function(patch, text) {
  if (text.length == 0) {
    return;
  }
  var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
  var padding = 0;

  // Look for the first and last matches of pattern in text.  If two different
  // matches are found, increase the pattern length.
  while (text.indexOf(pattern) != text.lastIndexOf(pattern) &&
         pattern.length < this.Match_MaxBits - this.Patch_Margin -
         this.Patch_Margin) {
    padding += this.Patch_Margin;
    pattern = text.substring(patch.start2 - padding,
                             patch.start2 + patch.length1 + padding);
  }
  // Add one chunk for good luck.
  padding += this.Patch_Margin;

  // Add the prefix.
  var prefix = text.substring(patch.start2 - padding, patch.start2);
  if (prefix) {
    patch.diffs.unshift([DIFF_EQUAL, prefix]);
  }
  // Add the suffix.
  var suffix = text.substring(patch.start2 + patch.length1,
                              patch.start2 + patch.length1 + padding);
  if (suffix) {
    patch.diffs.push([DIFF_EQUAL, suffix]);
  }

  // Roll back the start points.
  patch.start1 -= prefix.length;
  patch.start2 -= prefix.length;
  // Extend the lengths.
  patch.length1 += prefix.length + suffix.length;
  patch.length2 += prefix.length + suffix.length;
};


/**
 * Compute a list of patches to turn text1 into text2.
 * Use diffs if provided, otherwise compute it ourselves.
 * There are four ways to call this function, depending on what data is
 * available to the caller:
 * Method 1:
 * a = text1, b = text2
 * Method 2:
 * a = diffs
 * Method 3 (optimal):
 * a = text1, b = diffs
 * Method 4 (deprecated, use method 3):
 * a = text1, b = text2, c = diffs
 *
 * @param {string|!Array.<!diff_match_patch.Diff>} a text1 (methods 1,3,4) or
 * Array of diff tuples for text1 to text2 (method 2).
 * @param {string|!Array.<!diff_match_patch.Diff>} opt_b text2 (methods 1,4) or
 * Array of diff tuples for text1 to text2 (method 3) or undefined (method 2).
 * @param {string|!Array.<!diff_match_patch.Diff>} opt_c Array of diff tuples
 * for text1 to text2 (method 4) or undefined (methods 1,2,3).
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 */
diff_match_patch.prototype.patch_make = function(a, opt_b, opt_c) {
  var text1, diffs;
  if (typeof a == 'string' && typeof opt_b == 'string' &&
      typeof opt_c == 'undefined') {
    // Method 1: text1, text2
    // Compute diffs from text1 and text2.
    text1 = /** @type {string} */(a);
    diffs = this.diff_main(text1, /** @type {string} */(opt_b), true);
    if (diffs.length > 2) {
      this.diff_cleanupSemantic(diffs);
      this.diff_cleanupEfficiency(diffs);
    }
  } else if (a && typeof a == 'object' && typeof opt_b == 'undefined' &&
      typeof opt_c == 'undefined') {
    // Method 2: diffs
    // Compute text1 from diffs.
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(a);
    text1 = this.diff_text1(diffs);
  } else if (typeof a == 'string' && opt_b && typeof opt_b == 'object' &&
      typeof opt_c == 'undefined') {
    // Method 3: text1, diffs
    text1 = /** @type {string} */(a);
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_b);
  } else if (typeof a == 'string' && typeof opt_b == 'string' &&
      opt_c && typeof opt_c == 'object') {
    // Method 4: text1, text2, diffs
    // text2 is not used.
    text1 = /** @type {string} */(a);
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_c);
  } else {
    throw new Error('Unknown call format to patch_make.');
  }

  if (diffs.length === 0) {
    return [];  // Get rid of the null case.
  }
  var patches = [];
  var patch = new diff_match_patch.patch_obj();
  var patchDiffLength = 0;  // Keeping our own length var is faster in JS.
  var char_count1 = 0;  // Number of characters into the text1 string.
  var char_count2 = 0;  // Number of characters into the text2 string.
  // Start with text1 (prepatch_text) and apply the diffs until we arrive at
  // text2 (postpatch_text).  We recreate the patches one by one to determine
  // context info.
  var prepatch_text = text1;
  var postpatch_text = text1;
  for (var x = 0; x < diffs.length; x++) {
    var diff_type = diffs[x][0];
    var diff_text = diffs[x][1];

    if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
      // A new patch starts here.
      patch.start1 = char_count1;
      patch.start2 = char_count2;
    }

    switch (diff_type) {
      case DIFF_INSERT:
        patch.diffs[patchDiffLength++] = diffs[x];
        patch.length2 += diff_text.length;
        postpatch_text = postpatch_text.substring(0, char_count2) + diff_text +
                         postpatch_text.substring(char_count2);
        break;
      case DIFF_DELETE:
        patch.length1 += diff_text.length;
        patch.diffs[patchDiffLength++] = diffs[x];
        postpatch_text = postpatch_text.substring(0, char_count2) +
                         postpatch_text.substring(char_count2 +
                             diff_text.length);
        break;
      case DIFF_EQUAL:
        if (diff_text.length <= 2 * this.Patch_Margin &&
            patchDiffLength && diffs.length != x + 1) {
          // Small equality inside a patch.
          patch.diffs[patchDiffLength++] = diffs[x];
          patch.length1 += diff_text.length;
          patch.length2 += diff_text.length;
        } else if (diff_text.length >= 2 * this.Patch_Margin) {
          // Time for a new patch.
          if (patchDiffLength) {
            this.patch_addContext_(patch, prepatch_text);
            patches.push(patch);
            patch = new diff_match_patch.patch_obj();
            patchDiffLength = 0;
            // Unlike Unidiff, our patch lists have a rolling context.
            // http://code.google.com/p/google-diff-match-patch/wiki/Unidiff
            // Update prepatch text & pos to reflect the application of the
            // just completed patch.
            prepatch_text = postpatch_text;
            char_count1 = char_count2;
          }
        }
        break;
    }

    // Update the current character count.
    if (diff_type !== DIFF_INSERT) {
      char_count1 += diff_text.length;
    }
    if (diff_type !== DIFF_DELETE) {
      char_count2 += diff_text.length;
    }
  }
  // Pick up the leftover patch if not empty.
  if (patchDiffLength) {
    this.patch_addContext_(patch, prepatch_text);
    patches.push(patch);
  }

  return patches;
};


/**
 * Given an array of patches, return another array that is identical.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 */
diff_match_patch.prototype.patch_deepCopy = function(patches) {
  // Making deep copies is hard in JavaScript.
  var patchesCopy = [];
  for (var x = 0; x < patches.length; x++) {
    var patch = patches[x];
    var patchCopy = new diff_match_patch.patch_obj();
    patchCopy.diffs = [];
    for (var y = 0; y < patch.diffs.length; y++) {
      patchCopy.diffs[y] = patch.diffs[y].slice();
    }
    patchCopy.start1 = patch.start1;
    patchCopy.start2 = patch.start2;
    patchCopy.length1 = patch.length1;
    patchCopy.length2 = patch.length2;
    patchesCopy[x] = patchCopy;
  }
  return patchesCopy;
};


/**
 * Merge a set of patches onto the text.  Return a patched text, as well
 * as a list of true/false values indicating which patches were applied.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @param {string} text Old text.
 * @return {!Array.<string|!Array.<boolean>>} Two element Array, containing the
 *      new text and an array of boolean values.
 */
diff_match_patch.prototype.patch_apply = function(patches, text) {
  if (patches.length == 0) {
    return [text, []];
  }

  // Deep copy the patches so that no changes are made to originals.
  patches = this.patch_deepCopy(patches);

  var nullPadding = this.patch_addPadding(patches);
  text = nullPadding + text + nullPadding;

  this.patch_splitMax(patches);
  // delta keeps track of the offset between the expected and actual location
  // of the previous patch.  If there are patches expected at positions 10 and
  // 20, but the first patch was found at 12, delta is 2 and the second patch
  // has an effective expected position of 22.
  var delta = 0;
  var results = [];
  for (var x = 0; x < patches.length; x++) {
    var expected_loc = patches[x].start2 + delta;
    var text1 = this.diff_text1(patches[x].diffs);
    var start_loc;
    var end_loc = -1;
    if (text1.length > this.Match_MaxBits) {
      // patch_splitMax will only provide an oversized pattern in the case of
      // a monster delete.
      start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits),
                                  expected_loc);
      if (start_loc != -1) {
        end_loc = this.match_main(text,
            text1.substring(text1.length - this.Match_MaxBits),
            expected_loc + text1.length - this.Match_MaxBits);
        if (end_loc == -1 || start_loc >= end_loc) {
          // Can't find valid trailing context.  Drop this patch.
          start_loc = -1;
        }
      }
    } else {
      start_loc = this.match_main(text, text1, expected_loc);
    }
    if (start_loc == -1) {
      // No match found.  :(
      results[x] = false;
      // Subtract the delta for this failed patch from subsequent patches.
      delta -= patches[x].length2 - patches[x].length1;
    } else {
      // Found a match.  :)
      results[x] = true;
      delta = start_loc - expected_loc;
      var text2;
      if (end_loc == -1) {
        text2 = text.substring(start_loc, start_loc + text1.length);
      } else {
        text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
      }
      if (text1 == text2) {
        // Perfect match, just shove the replacement text in.
        text = text.substring(0, start_loc) +
               this.diff_text2(patches[x].diffs) +
               text.substring(start_loc + text1.length);
      } else {
        // Imperfect match.  Run a diff to get a framework of equivalent
        // indices.
        var diffs = this.diff_main(text1, text2, false);
        if (text1.length > this.Match_MaxBits &&
            this.diff_levenshtein(diffs) / text1.length >
            this.Patch_DeleteThreshold) {
          // The end points match, but the content is unacceptably bad.
          results[x] = false;
        } else {
          this.diff_cleanupSemanticLossless(diffs);
          var index1 = 0;
          var index2;
          for (var y = 0; y < patches[x].diffs.length; y++) {
            var mod = patches[x].diffs[y];
            if (mod[0] !== DIFF_EQUAL) {
              index2 = this.diff_xIndex(diffs, index1);
            }
            if (mod[0] === DIFF_INSERT) {  // Insertion
              text = text.substring(0, start_loc + index2) + mod[1] +
                     text.substring(start_loc + index2);
            } else if (mod[0] === DIFF_DELETE) {  // Deletion
              text = text.substring(0, start_loc + index2) +
                     text.substring(start_loc + this.diff_xIndex(diffs,
                         index1 + mod[1].length));
            }
            if (mod[0] !== DIFF_DELETE) {
              index1 += mod[1].length;
            }
          }
        }
      }
    }
  }
  // Strip the padding off.
  text = text.substring(nullPadding.length, text.length - nullPadding.length);
  return [text, results];
};


/**
 * Add some padding on text start and end so that edges can match something.
 * Intended to be called only from within patch_apply.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {string} The padding string added to each side.
 */
diff_match_patch.prototype.patch_addPadding = function(patches) {
  var paddingLength = this.Patch_Margin;
  var nullPadding = '';
  for (var x = 1; x <= paddingLength; x++) {
    nullPadding += String.fromCharCode(x);
  }

  // Bump all the patches forward.
  for (var x = 0; x < patches.length; x++) {
    patches[x].start1 += paddingLength;
    patches[x].start2 += paddingLength;
  }

  // Add some padding on start of first diff.
  var patch = patches[0];
  var diffs = patch.diffs;
  if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
    // Add nullPadding equality.
    diffs.unshift([DIFF_EQUAL, nullPadding]);
    patch.start1 -= paddingLength;  // Should be 0.
    patch.start2 -= paddingLength;  // Should be 0.
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[0][1].length) {
    // Grow first equality.
    var extraLength = paddingLength - diffs[0][1].length;
    diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
    patch.start1 -= extraLength;
    patch.start2 -= extraLength;
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  // Add some padding on end of last diff.
  patch = patches[patches.length - 1];
  diffs = patch.diffs;
  if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
    // Add nullPadding equality.
    diffs.push([DIFF_EQUAL, nullPadding]);
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[diffs.length - 1][1].length) {
    // Grow last equality.
    var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
    diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  return nullPadding;
};


/**
 * Look through the patches and break up any which are longer than the maximum
 * limit of the match algorithm.
 * Intended to be called only from within patch_apply.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 */
diff_match_patch.prototype.patch_splitMax = function(patches) {
  var patch_size = this.Match_MaxBits;
  for (var x = 0; x < patches.length; x++) {
    if (patches[x].length1 <= patch_size) {
      continue;
    }
    var bigpatch = patches[x];
    // Remove the big old patch.
    patches.splice(x--, 1);
    var start1 = bigpatch.start1;
    var start2 = bigpatch.start2;
    var precontext = '';
    while (bigpatch.diffs.length !== 0) {
      // Create one of several smaller patches.
      var patch = new diff_match_patch.patch_obj();
      var empty = true;
      patch.start1 = start1 - precontext.length;
      patch.start2 = start2 - precontext.length;
      if (precontext !== '') {
        patch.length1 = patch.length2 = precontext.length;
        patch.diffs.push([DIFF_EQUAL, precontext]);
      }
      while (bigpatch.diffs.length !== 0 &&
             patch.length1 < patch_size - this.Patch_Margin) {
        var diff_type = bigpatch.diffs[0][0];
        var diff_text = bigpatch.diffs[0][1];
        if (diff_type === DIFF_INSERT) {
          // Insertions are harmless.
          patch.length2 += diff_text.length;
          start2 += diff_text.length;
          patch.diffs.push(bigpatch.diffs.shift());
          empty = false;
        } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 &&
                   patch.diffs[0][0] == DIFF_EQUAL &&
                   diff_text.length > 2 * patch_size) {
          // This is a large deletion.  Let it pass in one chunk.
          patch.length1 += diff_text.length;
          start1 += diff_text.length;
          empty = false;
          patch.diffs.push([diff_type, diff_text]);
          bigpatch.diffs.shift();
        } else {
          // Deletion or equality.  Only take as much as we can stomach.
          diff_text = diff_text.substring(0,
              patch_size - patch.length1 - this.Patch_Margin);
          patch.length1 += diff_text.length;
          start1 += diff_text.length;
          if (diff_type === DIFF_EQUAL) {
            patch.length2 += diff_text.length;
            start2 += diff_text.length;
          } else {
            empty = false;
          }
          patch.diffs.push([diff_type, diff_text]);
          if (diff_text == bigpatch.diffs[0][1]) {
            bigpatch.diffs.shift();
          } else {
            bigpatch.diffs[0][1] =
                bigpatch.diffs[0][1].substring(diff_text.length);
          }
        }
      }
      // Compute the head context for the next patch.
      precontext = this.diff_text2(patch.diffs);
      precontext =
          precontext.substring(precontext.length - this.Patch_Margin);
      // Append the end context for this patch.
      var postcontext = this.diff_text1(bigpatch.diffs)
                            .substring(0, this.Patch_Margin);
      if (postcontext !== '') {
        patch.length1 += postcontext.length;
        patch.length2 += postcontext.length;
        if (patch.diffs.length !== 0 &&
            patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
          patch.diffs[patch.diffs.length - 1][1] += postcontext;
        } else {
          patch.diffs.push([DIFF_EQUAL, postcontext]);
        }
      }
      if (!empty) {
        patches.splice(++x, 0, patch);
      }
    }
  }
};


/**
 * Take a list of patches and return a textual representation.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {string} Text representation of patches.
 */
diff_match_patch.prototype.patch_toText = function(patches) {
  var text = [];
  for (var x = 0; x < patches.length; x++) {
    text[x] = patches[x];
  }
  return text.join('');
};


/**
 * Parse a textual representation of patches and return a list of Patch objects.
 * @param {string} textline Text representation of patches.
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 * @throws {!Error} If invalid input.
 */
diff_match_patch.prototype.patch_fromText = function(textline) {
  var patches = [];
  if (!textline) {
    return patches;
  }
  var text = textline.split('\n');
  var textPointer = 0;
  var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
  while (textPointer < text.length) {
    var m = text[textPointer].match(patchHeader);
    if (!m) {
      throw new Error('Invalid patch string: ' + text[textPointer]);
    }
    var patch = new diff_match_patch.patch_obj();
    patches.push(patch);
    patch.start1 = parseInt(m[1], 10);
    if (m[2] === '') {
      patch.start1--;
      patch.length1 = 1;
    } else if (m[2] == '0') {
      patch.length1 = 0;
    } else {
      patch.start1--;
      patch.length1 = parseInt(m[2], 10);
    }

    patch.start2 = parseInt(m[3], 10);
    if (m[4] === '') {
      patch.start2--;
      patch.length2 = 1;
    } else if (m[4] == '0') {
      patch.length2 = 0;
    } else {
      patch.start2--;
      patch.length2 = parseInt(m[4], 10);
    }
    textPointer++;

    while (textPointer < text.length) {
      var sign = text[textPointer].charAt(0);
      try {
        var line = decodeURI(text[textPointer].substring(1));
      } catch (ex) {
        // Malformed URI sequence.
        throw new Error('Illegal escape in patch_fromText: ' + line);
      }
      if (sign == '-') {
        // Deletion.
        patch.diffs.push([DIFF_DELETE, line]);
      } else if (sign == '+') {
        // Insertion.
        patch.diffs.push([DIFF_INSERT, line]);
      } else if (sign == ' ') {
        // Minor equality.
        patch.diffs.push([DIFF_EQUAL, line]);
      } else if (sign == '@') {
        // Start of next patch.
        break;
      } else if (sign === '') {
        // Blank line?  Whatever.
      } else {
        // WTF?
        throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
      }
      textPointer++;
    }
  }
  return patches;
};


/**
 * Class representing one patch operation.
 * @constructor
 */
diff_match_patch.patch_obj = function() {
  /** @type {!Array.<!diff_match_patch.Diff>} */
  this.diffs = [];
  /** @type {?number} */
  this.start1 = null;
  /** @type {?number} */
  this.start2 = null;
  /** @type {number} */
  this.length1 = 0;
  /** @type {number} */
  this.length2 = 0;
};


/**
 * Emmulate GNU diff's format.
 * Header: @@ -382,8 +481,9 @@
 * Indicies are printed as 1-based, not 0-based.
 * @return {string} The GNU diff string.
 */
diff_match_patch.patch_obj.prototype.toString = function() {
  var coords1, coords2;
  if (this.length1 === 0) {
    coords1 = this.start1 + ',0';
  } else if (this.length1 == 1) {
    coords1 = this.start1 + 1;
  } else {
    coords1 = (this.start1 + 1) + ',' + this.length1;
  }
  if (this.length2 === 0) {
    coords2 = this.start2 + ',0';
  } else if (this.length2 == 1) {
    coords2 = this.start2 + 1;
  } else {
    coords2 = (this.start2 + 1) + ',' + this.length2;
  }
  var text = ['@@ -' + coords1 + ' +' + coords2 + ' @@\n'];
  var op;
  // Escape the body of the patch with %xx notation.
  for (var x = 0; x < this.diffs.length; x++) {
    switch (this.diffs[x][0]) {
      case DIFF_INSERT:
        op = '+';
        break;
      case DIFF_DELETE:
        op = '-';
        break;
      case DIFF_EQUAL:
        op = ' ';
        break;
    }
    text[x + 1] = op + encodeURI(this.diffs[x][1]) + '\n';
  }
  return text.join('').replace(/%20/g, ' ');
};


// The following export code was added by @ForbesLindesay
module.exports = diff_match_patch;
module.exports['diff_match_patch'] = diff_match_patch;
module.exports['DIFF_DELETE'] = DIFF_DELETE;
module.exports['DIFF_INSERT'] = DIFF_INSERT;
module.exports['DIFF_EQUAL'] = DIFF_EQUAL;

/***/ }),

/***/ "oeZw":
/*!******************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/visual-dom-diff/0.7.2/node_modules/visual-dom-diff/lib/diff.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var diff_match_patch_1 = __webpack_require__(/*! diff-match-patch */ "lv7O");
var config_1 = __webpack_require__(/*! ./config */ "Lnr4");
var domIterator_1 = __webpack_require__(/*! ./domIterator */ "1I/f");
var util_1 = __webpack_require__(/*! ./util */ "ic8p");
/**
 * A simple helper which allows us to treat TH as TD in certain situations.
 */
var nodeNameOverride = function (nodeName) {
    return nodeName === 'TH' ? 'TD' : nodeName;
};
/**
 * Stringifies a DOM node recursively. Text nodes are represented by their `data`,
 * while all other nodes are represented by a single Unicode code point
 * from the Private Use Area of the Basic Multilingual Plane.
 */
var serialize = function (root, config) {
    return new domIterator_1.DomIterator(root, config).reduce(function (text, node) {
        return text +
            (util_1.isText(node)
                ? node.data
                : util_1.charForNodeName(nodeNameOverride(node.nodeName)));
    }, '');
};
var getLength = function (node) { return (util_1.isText(node) ? node.length : 1); };
var isTr = function (node) { return node.nodeName === 'TR'; };
var isNotTr = function (node) { return !isTr(node); };
var trIteratorOptions = {
    skipChildren: isTr,
    skipSelf: isNotTr,
};
function visualDomDiff(oldRootNode, newRootNode, options) {
    var _a, _b;
    if (options === void 0) { options = {}; }
    // Define config and simple helpers.
    var document = newRootNode.ownerDocument || newRootNode;
    var config = config_1.optionsToConfig(options);
    var addedClass = config.addedClass, diffText = config.diffText, modifiedClass = config.modifiedClass, removedClass = config.removedClass, skipSelf = config.skipSelf, skipChildren = config.skipChildren;
    var notSkipSelf = function (node) { return !skipSelf(node); };
    var getDepth = function (node, rootNode) {
        return util_1.getAncestors(node, rootNode).filter(notSkipSelf).length;
    };
    var isFormattingNode = function (node) {
        return util_1.isElement(node) && skipSelf(node);
    };
    var getFormattingAncestors = function (node, rootNode) {
        return util_1.getAncestors(node, rootNode)
            .filter(isFormattingNode)
            .reverse();
    };
    var getColumnValue = function (node) {
        return addedNodes.has(node) ? 1 : removedNodes.has(node) ? -1 : 0;
    };
    // Input iterators.
    var diffArray = diffText(serialize(oldRootNode, config), serialize(newRootNode, config));
    var diffIndex = 0;
    var oldIterator = new domIterator_1.DomIterator(oldRootNode, config);
    var newIterator = new domIterator_1.DomIterator(newRootNode, config);
    // Input variables produced by the input iterators.
    var oldDone;
    var newDone;
    var diffItem;
    var oldNode;
    var newNode;
    var diffOffset = 0;
    var oldOffset = 0;
    var newOffset = 0;
    diffItem = diffArray[diffIndex++];
    (_a = oldIterator.next(), oldDone = _a.done, oldNode = _a.value);
    (_b = newIterator.next(), newDone = _b.done, newNode = _b.value);
    // Output variables.
    var rootOutputNode = document.createDocumentFragment();
    var oldOutputNode = rootOutputNode;
    var oldOutputDepth = 0;
    var newOutputNode = rootOutputNode;
    var newOutputDepth = 0;
    var removedNode = null;
    var addedNode = null;
    var removedNodes = new Set();
    var addedNodes = new Set();
    var modifiedNodes = new Set();
    var formattingMap = new Map();
    var equalTables = new Array();
    var equalRows = new Map();
    function prepareOldOutput() {
        var depth = getDepth(oldNode, oldRootNode);
        while (oldOutputDepth > depth) {
            /* istanbul ignore if */
            if (!oldOutputNode.parentNode) {
                return util_1.never();
            }
            if (oldOutputNode === removedNode) {
                removedNode = null;
            }
            oldOutputNode = oldOutputNode.parentNode;
            oldOutputDepth--;
        }
        /* istanbul ignore if */
        if (oldOutputDepth !== depth) {
            return util_1.never();
        }
    }
    function prepareNewOutput() {
        var depth = getDepth(newNode, newRootNode);
        while (newOutputDepth > depth) {
            /* istanbul ignore if */
            if (!newOutputNode.parentNode) {
                return util_1.never();
            }
            if (newOutputNode === addedNode) {
                addedNode = null;
            }
            newOutputNode = newOutputNode.parentNode;
            newOutputDepth--;
        }
        /* istanbul ignore if */
        if (newOutputDepth !== depth) {
            return util_1.never();
        }
    }
    function appendCommonChild(node) {
        /* istanbul ignore if */
        if (oldOutputNode !== newOutputNode || addedNode || removedNode) {
            return util_1.never();
        }
        if (util_1.isText(node)) {
            var oldFormatting = getFormattingAncestors(oldNode, oldRootNode);
            var newFormatting = getFormattingAncestors(newNode, newRootNode);
            formattingMap.set(node, newFormatting);
            var length_1 = oldFormatting.length;
            if (length_1 !== newFormatting.length) {
                modifiedNodes.add(node);
            }
            else {
                for (var i = 0; i < length_1; ++i) {
                    if (!util_1.areNodesEqual(oldFormatting[i], newFormatting[i])) {
                        modifiedNodes.add(node);
                        break;
                    }
                }
            }
        }
        else {
            if (!util_1.areNodesEqual(oldNode, newNode)) {
                modifiedNodes.add(node);
            }
            var nodeName = oldNode.nodeName;
            if (nodeName === 'TABLE') {
                equalTables.push({
                    newTable: newNode,
                    oldTable: oldNode,
                    outputTable: node,
                });
            }
            else if (nodeName === 'TR') {
                equalRows.set(node, {
                    newRow: newNode,
                    oldRow: oldNode,
                });
            }
        }
        newOutputNode.appendChild(node);
        oldOutputNode = node;
        newOutputNode = node;
        oldOutputDepth++;
        newOutputDepth++;
    }
    function appendOldChild(node) {
        if (!removedNode) {
            removedNode = node;
            removedNodes.add(node);
        }
        if (util_1.isText(node)) {
            var oldFormatting = getFormattingAncestors(oldNode, oldRootNode);
            formattingMap.set(node, oldFormatting);
        }
        oldOutputNode.appendChild(node);
        oldOutputNode = node;
        oldOutputDepth++;
    }
    function appendNewChild(node) {
        if (!addedNode) {
            addedNode = node;
            addedNodes.add(node);
        }
        if (util_1.isText(node)) {
            var newFormatting = getFormattingAncestors(newNode, newRootNode);
            formattingMap.set(node, newFormatting);
        }
        newOutputNode.appendChild(node);
        newOutputNode = node;
        newOutputDepth++;
    }
    function nextDiff(step) {
        var length = diffItem[1].length;
        diffOffset += step;
        if (diffOffset === length) {
            diffItem = diffArray[diffIndex++];
            diffOffset = 0;
        }
        else {
            /* istanbul ignore if */
            if (diffOffset > length) {
                return util_1.never();
            }
        }
    }
    function nextOld(step) {
        var _a;
        var length = getLength(oldNode);
        oldOffset += step;
        if (oldOffset === length) {
            ;
            (_a = oldIterator.next(), oldDone = _a.done, oldNode = _a.value);
            oldOffset = 0;
        }
        else {
            /* istanbul ignore if */
            if (oldOffset > length) {
                return util_1.never();
            }
        }
    }
    function nextNew(step) {
        var _a;
        var length = getLength(newNode);
        newOffset += step;
        if (newOffset === length) {
            ;
            (_a = newIterator.next(), newDone = _a.done, newNode = _a.value);
            newOffset = 0;
        }
        else {
            /* istanbul ignore if */
            if (newOffset > length) {
                return util_1.never();
            }
        }
    }
    // Copy all content from oldRootNode and newRootNode to rootOutputNode,
    // while deduplicating identical content.
    // Difference markers and formatting are excluded at this stage.
    while (diffItem) {
        if (diffItem[0] === diff_match_patch_1.DIFF_DELETE) {
            /* istanbul ignore if */
            if (oldDone) {
                return util_1.never();
            }
            prepareOldOutput();
            var length_2 = Math.min(diffItem[1].length - diffOffset, getLength(oldNode) - oldOffset);
            var text = diffItem[1].substring(diffOffset, diffOffset + length_2);
            appendOldChild(util_1.isText(oldNode)
                ? document.createTextNode(text)
                : oldNode.cloneNode(false));
            nextDiff(length_2);
            nextOld(length_2);
        }
        else if (diffItem[0] === diff_match_patch_1.DIFF_INSERT) {
            /* istanbul ignore if */
            if (newDone) {
                return util_1.never();
            }
            prepareNewOutput();
            var length_3 = Math.min(diffItem[1].length - diffOffset, getLength(newNode) - newOffset);
            var text = diffItem[1].substring(diffOffset, diffOffset + length_3);
            appendNewChild(util_1.isText(newNode)
                ? document.createTextNode(text)
                : newNode.cloneNode(false));
            nextDiff(length_3);
            nextNew(length_3);
        }
        else {
            /* istanbul ignore if */
            if (oldDone || newDone) {
                return util_1.never();
            }
            prepareOldOutput();
            prepareNewOutput();
            var length_4 = Math.min(diffItem[1].length - diffOffset, getLength(oldNode) - oldOffset, getLength(newNode) - newOffset);
            var text = diffItem[1].substring(diffOffset, diffOffset + length_4);
            if (oldOutputNode === newOutputNode &&
                ((util_1.isText(oldNode) && util_1.isText(newNode)) ||
                    (nodeNameOverride(oldNode.nodeName) ===
                        nodeNameOverride(newNode.nodeName) &&
                        !skipChildren(oldNode) &&
                        !skipChildren(newNode)) ||
                    util_1.areNodesEqual(oldNode, newNode))) {
                appendCommonChild(util_1.isText(newNode)
                    ? document.createTextNode(text)
                    : newNode.cloneNode(false));
            }
            else {
                appendOldChild(util_1.isText(oldNode)
                    ? document.createTextNode(text)
                    : oldNode.cloneNode(false));
                appendNewChild(util_1.isText(newNode)
                    ? document.createTextNode(text)
                    : newNode.cloneNode(false));
            }
            nextDiff(length_4);
            nextOld(length_4);
            nextNew(length_4);
        }
    }
    // Move deletes before inserts.
    removedNodes.forEach(function (node) {
        var parentNode = node.parentNode;
        var previousSibling = node.previousSibling;
        while (previousSibling && addedNodes.has(previousSibling)) {
            parentNode.insertBefore(node, previousSibling);
            previousSibling = node.previousSibling;
        }
    });
    // Ensure a user friendly result for tables.
    equalTables.forEach(function (equalTable) {
        var newTable = equalTable.newTable, oldTable = equalTable.oldTable, outputTable = equalTable.outputTable;
        // Handle tables which can't be diffed nicely.
        if (!util_1.isTableValid(oldTable, true) ||
            !util_1.isTableValid(newTable, true) ||
            !util_1.isTableValid(outputTable, false)) {
            // Remove all values which were previously recorded for outputTable.
            new domIterator_1.DomIterator(outputTable).forEach(function (node) {
                addedNodes.delete(node);
                removedNodes.delete(node);
                modifiedNodes.delete(node);
                formattingMap.delete(node);
            });
            // Display both the old and new table.
            var parentNode = outputTable.parentNode;
            var oldTableClone = oldTable.cloneNode(true);
            var newTableClone = newTable.cloneNode(true);
            parentNode.insertBefore(oldTableClone, outputTable);
            parentNode.insertBefore(newTableClone, outputTable);
            parentNode.removeChild(outputTable);
            removedNodes.add(oldTableClone);
            addedNodes.add(newTableClone);
            return;
        }
        // Figure out which columns have been added or removed
        // based on the first row appearing in both tables.
        //
        // -  1: column added
        // -  0: column equal
        // - -1: column removed
        var columns = [];
        new domIterator_1.DomIterator(outputTable, trIteratorOptions).some(function (row) {
            var diffedRows = equalRows.get(row);
            if (!diffedRows) {
                return false;
            }
            var oldRow = diffedRows.oldRow, newRow = diffedRows.newRow;
            var oldColumnCount = oldRow.childNodes.length;
            var newColumnCount = newRow.childNodes.length;
            var maxColumnCount = Math.max(oldColumnCount, newColumnCount);
            var minColumnCount = Math.min(oldColumnCount, newColumnCount);
            if (row.childNodes.length === maxColumnCount) {
                // The generic diff algorithm worked properly in this case,
                // so we can rely on its results.
                var cells = row.childNodes;
                for (var i = 0, l = cells.length; i < l; ++i) {
                    columns.push(getColumnValue(cells[i]));
                }
            }
            else {
                // Fallback to a simple but correct algorithm.
                var i = 0;
                var columnValue = 0;
                while (i < minColumnCount) {
                    columns[i++] = columnValue;
                }
                columnValue = oldColumnCount < newColumnCount ? 1 : -1;
                while (i < maxColumnCount) {
                    columns[i++] = columnValue;
                }
            }
            return true;
        });
        var columnCount = columns.length;
        /* istanbul ignore if */
        if (columnCount === 0) {
            return util_1.never();
        }
        // Fix up the rows which do not align with `columns`.
        new domIterator_1.DomIterator(outputTable, trIteratorOptions).forEach(function (row) {
            var cells = row.childNodes;
            if (addedNodes.has(row) || addedNodes.has(row.parentNode)) {
                if (cells.length < columnCount) {
                    for (var i = 0; i < columnCount; ++i) {
                        if (columns[i] === -1) {
                            var td = document.createElement('TD');
                            row.insertBefore(td, cells[i]);
                            removedNodes.add(td);
                        }
                    }
                }
            }
            else if (removedNodes.has(row) ||
                removedNodes.has(row.parentNode)) {
                if (cells.length < columnCount) {
                    for (var i = 0; i < columnCount; ++i) {
                        if (columns[i] === 1) {
                            var td = document.createElement('TD');
                            row.insertBefore(td, cells[i]);
                        }
                    }
                }
            }
            else {
                // Check, if the columns in this row are aligned with those in the reference row.
                var isAligned = true;
                for (var i = 0, l = cells.length; i < l; ++i) {
                    if (getColumnValue(cells[i]) !== columns[i]) {
                        isAligned = false;
                        break;
                    }
                }
                if (!isAligned) {
                    // Remove all values which were previously recorded for row's content.
                    var iterator = new domIterator_1.DomIterator(row);
                    iterator.next(); // Skip the row itself.
                    iterator.forEach(function (node) {
                        addedNodes.delete(node);
                        removedNodes.delete(node);
                        modifiedNodes.delete(node);
                        formattingMap.delete(node);
                    });
                    // Remove the row's content.
                    while (row.firstChild) {
                        row.removeChild(row.firstChild);
                    }
                    // Diff the individual cells.
                    var _a = equalRows.get(row), newRow = _a.newRow, oldRow = _a.oldRow;
                    var newCells = newRow.childNodes;
                    var oldCells = oldRow.childNodes;
                    var oldIndex = 0;
                    var newIndex = 0;
                    for (var i = 0; i < columnCount; ++i) {
                        if (columns[i] === 1) {
                            var newCellClone = newCells[newIndex++].cloneNode(true);
                            row.appendChild(newCellClone);
                            addedNodes.add(newCellClone);
                        }
                        else if (columns[i] === -1) {
                            var oldCellClone = oldCells[oldIndex++].cloneNode(true);
                            row.appendChild(oldCellClone);
                            removedNodes.add(oldCellClone);
                        }
                        else {
                            row.appendChild(visualDomDiff(oldCells[oldIndex++], newCells[newIndex++], options));
                        }
                    }
                }
            }
        });
        return;
    });
    // Mark up the content which has been removed.
    removedNodes.forEach(function (node) {
        util_1.markUpNode(node, 'DEL', removedClass);
    });
    // Mark up the content which has been added.
    addedNodes.forEach(function (node) {
        util_1.markUpNode(node, 'INS', addedClass);
    });
    // Mark up the content which has been modified.
    if (!config.skipModified) {
        modifiedNodes.forEach(function (modifiedNode) {
            util_1.markUpNode(modifiedNode, 'INS', modifiedClass);
        });
    }
    // Add formatting.
    formattingMap.forEach(function (formattingNodes, textNode) {
        formattingNodes.forEach(function (formattingNode) {
            var parentNode = textNode.parentNode;
            var previousSibling = textNode.previousSibling;
            if (previousSibling &&
                util_1.areNodesEqual(previousSibling, formattingNode)) {
                previousSibling.appendChild(textNode);
            }
            else {
                var clonedFormattingNode = formattingNode.cloneNode(false);
                parentNode.insertBefore(clonedFormattingNode, textNode);
                clonedFormattingNode.appendChild(textNode);
            }
        });
    });
    return rootOutputNode;
}
exports.visualDomDiff = visualDomDiff;


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
//# sourceMappingURL=chunk.vendors~sp-canvas-diff_c534cbeb565a153d1d5c.js.map