(window["webpackJsonp_4df9bb86_ab0a_4aab_ab5f_48bf167048fb_1_11_0"] = window["webpackJsonp_4df9bb86_ab0a_4aab_ab5f_48bf167048fb_1_11_0"] || []).push([[0],{

/***/ "/7gA":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Layer/LayerHost.js ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: LayerHost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayerHost", function() { return LayerHost; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _Layer_notification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Layer.notification */ "s3Hm");




var LayerHost = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LayerHost, _super);
    function LayerHost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayerHost.prototype.shouldComponentUpdate = function () {
        return false;
    };
    LayerHost.prototype.componentDidMount = function () {
        Object(_Layer_notification__WEBPACK_IMPORTED_MODULE_3__["notifyHostChanged"])(this.props.id);
    };
    LayerHost.prototype.componentWillUnmount = function () {
        Object(_Layer_notification__WEBPACK_IMPORTED_MODULE_3__["notifyHostChanged"])(this.props.id);
    };
    LayerHost.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props, { className: Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["css"])('ms-LayerHost', this.props.className) }));
    };
    return LayerHost;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=LayerHost.js.map

/***/ }),

/***/ "/yd3":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Callout/CalloutContent.base.js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: CalloutContentBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalloutContentBase", function() { return CalloutContentBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/DirectionalHint */ "RPJY");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _utilities_positioning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utilities/positioning */ "N3z6");
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Popup */ "RweB");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Styling */ "xS3b");
var _a;








var ANIMATIONS = (_a = {},
    _a[_utilities_positioning__WEBPACK_IMPORTED_MODULE_4__["RectangleEdge"].top] = _Styling__WEBPACK_IMPORTED_MODULE_6__["AnimationClassNames"].slideUpIn10,
    _a[_utilities_positioning__WEBPACK_IMPORTED_MODULE_4__["RectangleEdge"].bottom] = _Styling__WEBPACK_IMPORTED_MODULE_6__["AnimationClassNames"].slideDownIn10,
    _a[_utilities_positioning__WEBPACK_IMPORTED_MODULE_4__["RectangleEdge"].left] = _Styling__WEBPACK_IMPORTED_MODULE_6__["AnimationClassNames"].slideLeftIn10,
    _a[_utilities_positioning__WEBPACK_IMPORTED_MODULE_4__["RectangleEdge"].right] = _Styling__WEBPACK_IMPORTED_MODULE_6__["AnimationClassNames"].slideRightIn10,
    _a);
var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["classNamesFunction"])({
    disableCaching: true
});
var BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
// Microsoft Edge will overwrite inline styles if there is an animation pertaining to that style.
// To help ensure that edge will respect the offscreen style opacity
// filter needs to be added as an additional way to set opacity.
var OFF_SCREEN_STYLE = { opacity: 0, filter: 'opacity(0)' };
// role and role description go hand-in-hand. Both would be included by spreading getNativeProps for a basic element
// This constant array can be used to filter these out of native props spread on callout root and apply them together on
// calloutMain (the Popup component within the callout)
var ARIA_ROLE_ATTRIBUTES = ['role', 'aria-roledescription'];
var CalloutContentBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CalloutContentBase, _super);
    function CalloutContentBase(props) {
        var _this = _super.call(this, props) || this;
        _this._hostElement = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._calloutElement = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._hasListeners = false;
        _this._disposables = [];
        _this.dismiss = function (ev) {
            var onDismiss = _this.props.onDismiss;
            if (onDismiss) {
                onDismiss(ev);
            }
        };
        _this._dismissOnScroll = function (ev) {
            var preventDismissOnScroll = _this.props.preventDismissOnScroll;
            if (_this.state.positions && !preventDismissOnScroll) {
                _this._dismissOnClickOrScroll(ev);
            }
        };
        _this._dismissOnResize = function (ev) {
            var preventDismissOnResize = _this.props.preventDismissOnResize;
            if (!preventDismissOnResize) {
                _this.dismiss(ev);
            }
        };
        _this._dismissOnLostFocus = function (ev) {
            var preventDismissOnLostFocus = _this.props.preventDismissOnLostFocus;
            if (!preventDismissOnLostFocus) {
                _this._dismissOnClickOrScroll(ev);
            }
        };
        _this._setInitialFocus = function () {
            if (_this.props.setInitialFocus && !_this._didSetInitialFocus && _this.state.positions && _this._calloutElement.current) {
                _this._didSetInitialFocus = true;
                _this._async.requestAnimationFrame(function () { return Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["focusFirstChild"])(_this._calloutElement.current); }, _this._calloutElement.current);
            }
        };
        _this._onComponentDidMount = function () {
            _this._addListeners();
            if (_this.props.onLayerMounted) {
                _this.props.onLayerMounted();
            }
            _this._updateAsyncPosition();
            _this._setHeightOffsetEveryFrame();
        };
        _this._mouseDownOnPopup = function () {
            _this._isMouseDownOnPopup = true;
        };
        _this._mouseUpOnPopup = function () {
            _this._isMouseDownOnPopup = false;
        };
        _this._async = new _Utilities__WEBPACK_IMPORTED_MODULE_3__["Async"](_this);
        _this._didSetInitialFocus = false;
        _this.state = {
            positions: undefined,
            slideDirectionalClassName: undefined,
            // @TODO it looks like this is not even being used anymore.
            calloutElementRect: undefined,
            heightOffset: 0
        };
        _this._positionAttempts = 0;
        return _this;
    }
    CalloutContentBase.prototype.componentDidUpdate = function () {
        if (!this.props.hidden) {
            this._setInitialFocus();
            if (!this._hasListeners) {
                this._addListeners();
            }
            this._updateAsyncPosition();
        }
        else {
            if (this._hasListeners) {
                this._removeListeners();
            }
        }
    };
    CalloutContentBase.prototype.shouldComponentUpdate = function (newProps, newState) {
        if (!newProps.shouldUpdateWhenHidden && this.props.hidden && newProps.hidden) {
            // Do not update when hidden.
            return false;
        }
        return !Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["shallowCompare"])(this.props, newProps) || !Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["shallowCompare"])(this.state, newState);
    };
    // tslint:disable-next-line function-name
    CalloutContentBase.prototype.UNSAFE_componentWillMount = function () {
        this._setTargetWindowAndElement(this._getTarget());
    };
    CalloutContentBase.prototype.componentWillUnmount = function () {
        this._async.dispose();
        this._disposables.forEach(function (dispose) { return dispose(); });
    };
    // tslint:disable-next-line function-name
    CalloutContentBase.prototype.UNSAFE_componentWillUpdate = function (newProps) {
        // If the target element changed, find the new one. If we are tracking target with class name, always find element because we
        // do not know if fabric has rendered a new element and disposed the old element.
        var newTarget = this._getTarget(newProps);
        var oldTarget = this._getTarget();
        if ((newTarget !== oldTarget || typeof newTarget === 'string' || newTarget instanceof String) && !this._blockResetHeight) {
            this._maxHeight = undefined;
            this._setTargetWindowAndElement(newTarget);
        }
        if (newProps.gapSpace !== this.props.gapSpace || this.props.beakWidth !== newProps.beakWidth) {
            this._maxHeight = undefined;
        }
        if (newProps.finalHeight !== this.props.finalHeight) {
            this._setHeightOffsetEveryFrame();
        }
        // Ensure positioning is recalculated when we are about to show a persisted menu.
        if (this._didPositionPropsChange(newProps, this.props)) {
            this._maxHeight = undefined;
            // Target might have been updated while hidden.
            this._setTargetWindowAndElement(newTarget);
            this.setState({
                positions: undefined
            });
            this._didSetInitialFocus = false;
            this._bounds = undefined;
        }
        this._blockResetHeight = false;
    };
    CalloutContentBase.prototype.componentDidMount = function () {
        if (!this.props.hidden) {
            this._onComponentDidMount();
        }
    };
    CalloutContentBase.prototype.render = function () {
        // If there is no target window then we are likely in server side rendering and we should not render anything.
        if (!this._targetWindow) {
            return null;
        }
        var target = this.props.target;
        var _a = this.props, styles = _a.styles, style = _a.style, ariaLabel = _a.ariaLabel, ariaDescribedBy = _a.ariaDescribedBy, ariaLabelledBy = _a.ariaLabelledBy, className = _a.className, isBeakVisible = _a.isBeakVisible, children = _a.children, beakWidth = _a.beakWidth, calloutWidth = _a.calloutWidth, calloutMaxWidth = _a.calloutMaxWidth, finalHeight = _a.finalHeight, _b = _a.hideOverflow, hideOverflow = _b === void 0 ? !!finalHeight : _b, backgroundColor = _a.backgroundColor, calloutMaxHeight = _a.calloutMaxHeight, onScroll = _a.onScroll, _c = _a.shouldRestoreFocus, shouldRestoreFocus = _c === void 0 ? true : _c;
        target = this._getTarget();
        var positions = this.state.positions;
        var getContentMaxHeight = this._getMaxHeight() ? this._getMaxHeight() + this.state.heightOffset : undefined;
        var contentMaxHeight = calloutMaxHeight && getContentMaxHeight && calloutMaxHeight < getContentMaxHeight ? calloutMaxHeight : getContentMaxHeight;
        var overflowYHidden = hideOverflow;
        var beakVisible = isBeakVisible && !!target;
        this._classNames = getClassNames(styles, {
            theme: this.props.theme,
            className: className,
            overflowYHidden: overflowYHidden,
            calloutWidth: calloutWidth,
            positions: positions,
            beakWidth: beakWidth,
            backgroundColor: backgroundColor,
            calloutMaxWidth: calloutMaxWidth
        });
        var overflowStyle = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, style, { maxHeight: contentMaxHeight }, (overflowYHidden && { overflowY: 'hidden' }));
        var visibilityStyle = this.props.hidden ? { visibility: 'hidden' } : undefined;
        // React.CSSProperties does not understand IRawStyle, so the inline animations will need to be cast as any for now.
        var content = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { ref: this._hostElement, className: this._classNames.container, style: visibilityStyle },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getNativeProps"])(this.props, _Utilities__WEBPACK_IMPORTED_MODULE_3__["divProperties"], ARIA_ROLE_ATTRIBUTES), { className: Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["css"])(this._classNames.root, positions && positions.targetEdge && ANIMATIONS[positions.targetEdge]), style: positions ? positions.elementPosition : OFF_SCREEN_STYLE, tabIndex: -1, 
                // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
                ref: this._calloutElement }),
                beakVisible && react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: this._classNames.beak, style: this._getBeakPosition() }),
                beakVisible && react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: this._classNames.beakCurtain }),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Popup__WEBPACK_IMPORTED_MODULE_5__["Popup"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getNativeProps"])(this.props, ARIA_ROLE_ATTRIBUTES), { ariaLabel: ariaLabel, ariaDescribedBy: ariaDescribedBy, ariaLabelledBy: ariaLabelledBy, className: this._classNames.calloutMain, onDismiss: this.dismiss, onScroll: onScroll, shouldRestoreFocus: shouldRestoreFocus, style: overflowStyle, onMouseDown: this._mouseDownOnPopup, onMouseUp: this._mouseUpOnPopup }), children))));
        return content;
    };
    CalloutContentBase.prototype._dismissOnClickOrScroll = function (ev) {
        var target = ev.target;
        var isEventTargetOutsideCallout = this._hostElement.current && !Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["elementContains"])(this._hostElement.current, target);
        // If mouse is pressed down on callout but moved outside then released, don't dismiss the callout.
        if (isEventTargetOutsideCallout && this._isMouseDownOnPopup) {
            this._isMouseDownOnPopup = false;
            return;
        }
        if ((!this._target && isEventTargetOutsideCallout) ||
            (ev.target !== this._targetWindow &&
                isEventTargetOutsideCallout &&
                (this._target.stopPropagation ||
                    (!this._target || (target !== this._target && !Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["elementContains"])(this._target, target)))))) {
            this.dismiss(ev);
        }
    };
    CalloutContentBase.prototype._addListeners = function () {
        var _this = this;
        // This is added so the callout will dismiss when the window is scrolled
        // but not when something inside the callout is scrolled. The delay seems
        // to be required to avoid React firing an async focus event in IE from
        // the target changing focus quickly prior to rendering the callout.
        this._async.setTimeout(function () {
            _this._disposables.push(Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["on"])(_this._targetWindow, 'scroll', _this._dismissOnScroll, true), Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["on"])(_this._targetWindow, 'resize', _this._dismissOnResize, true), Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["on"])(_this._targetWindow.document.documentElement, 'focus', _this._dismissOnLostFocus, true), Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["on"])(_this._targetWindow.document.documentElement, 'click', _this._dismissOnLostFocus, true));
            _this._hasListeners = true;
        }, 0);
    };
    CalloutContentBase.prototype._removeListeners = function () {
        this._disposables.forEach(function (dispose) { return dispose(); });
        this._disposables = [];
        this._hasListeners = false;
    };
    CalloutContentBase.prototype._updateAsyncPosition = function () {
        var _this = this;
        this._async.requestAnimationFrame(function () { return _this._updatePosition(); }, this._calloutElement.current);
    };
    CalloutContentBase.prototype._getBeakPosition = function () {
        var positions = this.state.positions;
        var beakPostionStyle = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, (positions && positions.beakPosition ? positions.beakPosition.elementPosition : null));
        if (!beakPostionStyle.top && !beakPostionStyle.bottom && !beakPostionStyle.left && !beakPostionStyle.right) {
            beakPostionStyle.left = BEAK_ORIGIN_POSITION.left;
            beakPostionStyle.top = BEAK_ORIGIN_POSITION.top;
        }
        return beakPostionStyle;
    };
    CalloutContentBase.prototype._updatePosition = function () {
        // Try to update the target, page might have changed
        this._setTargetWindowAndElement(this._getTarget());
        var positions = this.state.positions;
        var hostElement = this._hostElement.current;
        var calloutElement = this._calloutElement.current;
        // If we expect a target element to position against, we need to wait until `this._target` is resolved. Otherwise
        // we can try to position.
        var expectsTarget = !!this.props.target;
        if (hostElement && calloutElement && (!expectsTarget || this._target)) {
            var currentProps = void 0;
            currentProps = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["assign"])(currentProps, this.props);
            currentProps.bounds = this._getBounds();
            currentProps.target = this._target;
            // If there is a finalHeight given then we assume that the user knows and will handle
            // additional positioning adjustments so we should call positionCard
            var newPositions = this.props.finalHeight
                ? Object(_utilities_positioning__WEBPACK_IMPORTED_MODULE_4__["positionCard"])(currentProps, hostElement, calloutElement, positions)
                : Object(_utilities_positioning__WEBPACK_IMPORTED_MODULE_4__["positionCallout"])(currentProps, hostElement, calloutElement, positions);
            // Set the new position only when the positions are not exists or one of the new callout positions are different.
            // The position should not change if the position is within 2 decimal places.
            if ((!positions && newPositions) ||
                (positions && newPositions && !this._arePositionsEqual(positions, newPositions) && this._positionAttempts < 5)) {
                // We should not reposition the callout more than a few times, if it is then the content is likely resizing
                // and we should stop trying to reposition to prevent a stack overflow.
                this._positionAttempts++;
                this.setState({
                    positions: newPositions
                });
            }
            else if (this._positionAttempts > 0) {
                // Only call the onPositioned callback if the callout has been re-positioned at least once.
                this._positionAttempts = 0;
                if (this.props.onPositioned) {
                    this.props.onPositioned(this.state.positions);
                }
            }
        }
    };
    CalloutContentBase.prototype._getBounds = function () {
        if (!this._bounds) {
            var bounds = this.props.bounds;
            var currentBounds = typeof bounds === 'function' ? bounds(this.props.target, this._targetWindow) : bounds;
            if (!currentBounds) {
                currentBounds = {
                    top: 0 + this.props.minPagePadding,
                    left: 0 + this.props.minPagePadding,
                    right: this._targetWindow.innerWidth - this.props.minPagePadding,
                    bottom: this._targetWindow.innerHeight - this.props.minPagePadding,
                    width: this._targetWindow.innerWidth - this.props.minPagePadding * 2,
                    height: this._targetWindow.innerHeight - this.props.minPagePadding * 2
                };
            }
            this._bounds = currentBounds;
        }
        return this._bounds;
    };
    // Max height should remain as synchronous as possible, which is why it is not done using set state.
    // It needs to be synchronous since it will impact the ultimate position of the callout.
    CalloutContentBase.prototype._getMaxHeight = function () {
        var _this = this;
        if (!this._maxHeight) {
            if (this.props.directionalHintFixed && this._target) {
                var beakWidth = this.props.isBeakVisible ? this.props.beakWidth : 0;
                var gapSpace = this.props.gapSpace ? this.props.gapSpace : 0;
                // Since the callout cannot measure it's border size it must be taken into account here. Otherwise it will
                // overlap with the target.
                var totalGap_1 = gapSpace + beakWidth;
                this._async.requestAnimationFrame(function () {
                    if (_this._target) {
                        _this._maxHeight = Object(_utilities_positioning__WEBPACK_IMPORTED_MODULE_4__["getMaxHeight"])(_this._target, _this.props.directionalHint, totalGap_1, _this._getBounds(), _this.props.coverTarget);
                        _this._blockResetHeight = true;
                        _this.forceUpdate();
                    }
                }, this._target);
            }
            else {
                this._maxHeight = this._getBounds().height;
            }
        }
        return this._maxHeight;
    };
    CalloutContentBase.prototype._arePositionsEqual = function (positions, newPosition) {
        return (this._comparePositions(positions.elementPosition, newPosition.elementPosition) &&
            this._comparePositions(positions.beakPosition.elementPosition, newPosition.beakPosition.elementPosition));
    };
    CalloutContentBase.prototype._comparePositions = function (oldPositions, newPositions) {
        for (var key in newPositions) {
            // This needs to be checked here and below because there is a linting error if for in does not immediately have an if statement
            if (newPositions.hasOwnProperty(key)) {
                var oldPositionEdge = oldPositions[key];
                var newPositionEdge = newPositions[key];
                if (oldPositionEdge !== undefined && newPositionEdge !== undefined) {
                    if (oldPositionEdge.toFixed(2) !== newPositionEdge.toFixed(2)) {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
        }
        return true;
    };
    CalloutContentBase.prototype._setTargetWindowAndElement = function (target) {
        var currentElement = this._calloutElement.current;
        if (target) {
            if (typeof target === 'string') {
                var currentDoc = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getDocument"])(currentElement);
                this._target = currentDoc ? currentDoc.querySelector(target) : null;
                this._targetWindow = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getWindow"])(currentElement);
            }
            else if (target.stopPropagation) {
                this._targetWindow = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getWindow"])(target.toElement);
                this._target = target;
            }
            else if (target.getBoundingClientRect) {
                var targetElement = target;
                this._targetWindow = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getWindow"])(targetElement);
                this._target = target;
            }
            else if (target.current !== undefined) {
                this._target = target.current;
                this._targetWindow = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getWindow"])(this._target);
                // HTMLImgElements can have x and y values. The check for it being a point must go last.
            }
            else {
                this._targetWindow = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getWindow"])(currentElement);
                this._target = target;
            }
        }
        else {
            this._targetWindow = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getWindow"])(currentElement);
        }
    };
    CalloutContentBase.prototype._setHeightOffsetEveryFrame = function () {
        var _this = this;
        if (this._calloutElement.current && this.props.finalHeight) {
            this._setHeightOffsetTimer = this._async.requestAnimationFrame(function () {
                var calloutMainElem = _this._calloutElement.current && _this._calloutElement.current.lastChild;
                if (!calloutMainElem) {
                    return;
                }
                var cardScrollHeight = calloutMainElem.scrollHeight;
                var cardCurrHeight = calloutMainElem.offsetHeight;
                var scrollDiff = cardScrollHeight - cardCurrHeight;
                _this.setState({
                    heightOffset: _this.state.heightOffset + scrollDiff
                });
                if (calloutMainElem.offsetHeight < _this.props.finalHeight) {
                    _this._setHeightOffsetEveryFrame();
                }
                else {
                    _this._async.cancelAnimationFrame(_this._setHeightOffsetTimer, _this._calloutElement.current);
                }
            }, this._calloutElement.current);
        }
    };
    // Whether or not the current positions should be reset
    CalloutContentBase.prototype._didPositionPropsChange = function (newProps, oldProps) {
        return (!newProps.hidden && newProps.hidden !== oldProps.hidden) || newProps.directionalHint !== oldProps.directionalHint;
    };
    CalloutContentBase.prototype._getTarget = function (props) {
        if (props === void 0) { props = this.props; }
        var target = props.target;
        return target;
    };
    CalloutContentBase.defaultProps = {
        preventDismissOnLostFocus: false,
        preventDismissOnScroll: false,
        preventDismissOnResize: false,
        isBeakVisible: true,
        beakWidth: 16,
        gapSpace: 0,
        minPagePadding: 8,
        directionalHint: _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_2__["DirectionalHint"].bottomAutoEdge
    };
    return CalloutContentBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=CalloutContent.base.js.map

/***/ }),

/***/ "1+D1":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Callout/CalloutContent.styles.js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "xS3b");

function getBeakStyle(beakWidth) {
    return {
        height: beakWidth,
        width: beakWidth
    };
}
var GlobalClassNames = {
    container: 'ms-Callout-container',
    root: 'ms-Callout',
    beak: 'ms-Callout-beak',
    beakCurtain: 'ms-Callout-beakCurtain',
    calloutMain: 'ms-Callout-main'
};
var getStyles = function (props) {
    var _a;
    var theme = props.theme, className = props.className, overflowYHidden = props.overflowYHidden, calloutWidth = props.calloutWidth, beakWidth = props.beakWidth, backgroundColor = props.backgroundColor, calloutMaxWidth = props.calloutMaxWidth;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    var semanticColors = theme.semanticColors, effects = theme.effects;
    return {
        container: [
            classNames.container,
            {
                position: 'relative'
            }
        ],
        root: [
            classNames.root,
            theme.fonts.medium,
            {
                position: 'absolute',
                boxSizing: 'border-box',
                borderRadius: effects.roundedCorner2,
                boxShadow: effects.elevation16,
                selectors: (_a = {},
                    _a[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: 'WindowText'
                    },
                    _a)
            },
            Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["focusClear"])(),
            className,
            !!calloutWidth && { width: calloutWidth },
            !!calloutMaxWidth && { maxWidth: calloutMaxWidth }
        ],
        beak: [
            classNames.beak,
            {
                position: 'absolute',
                backgroundColor: semanticColors.menuBackground,
                boxShadow: 'inherit',
                border: 'inherit',
                boxSizing: 'border-box',
                transform: 'rotate(45deg)'
            },
            getBeakStyle(beakWidth),
            backgroundColor && {
                backgroundColor: backgroundColor
            }
        ],
        beakCurtain: [
            classNames.beakCurtain,
            {
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: semanticColors.menuBackground,
                borderRadius: effects.roundedCorner2
            }
        ],
        calloutMain: [
            classNames.calloutMain,
            {
                backgroundColor: semanticColors.menuBackground,
                overflowX: 'hidden',
                overflowY: 'auto',
                position: 'relative',
                borderRadius: effects.roundedCorner2
            },
            overflowYHidden && {
                overflowY: 'hidden'
            },
            backgroundColor && {
                backgroundColor: backgroundColor
            }
        ]
    };
};
//# sourceMappingURL=CalloutContent.styles.js.map

/***/ }),

/***/ "1942":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/Image.js ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: Image, ImageBase, ImageFit, ImageCoverStyle, ImageLoadState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Image_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Image/index */ "DqTc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return _components_Image_index__WEBPACK_IMPORTED_MODULE_0__["Image"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageBase", function() { return _components_Image_index__WEBPACK_IMPORTED_MODULE_0__["ImageBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageFit", function() { return _components_Image_index__WEBPACK_IMPORTED_MODULE_0__["ImageFit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageCoverStyle", function() { return _components_Image_index__WEBPACK_IMPORTED_MODULE_0__["ImageCoverStyle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageLoadState", function() { return _components_Image_index__WEBPACK_IMPORTED_MODULE_0__["ImageLoadState"]; });


//# sourceMappingURL=Image.js.map

/***/ }),

/***/ "1WKE":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Tooltip/Tooltip.js ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: Tooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return Tooltip; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _Tooltip_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tooltip.base */ "7NGt");
/* harmony import */ var _Tooltip_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tooltip.styles */ "eW/a");



var Tooltip = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Tooltip_base__WEBPACK_IMPORTED_MODULE_1__["TooltipBase"], _Tooltip_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'Tooltip'
});
//# sourceMappingURL=Tooltip.js.map

/***/ }),

/***/ "1fyS":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Persona/Persona.styles.js ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "xS3b");
/* harmony import */ var _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PersonaConsts */ "ztYb");


var GlobalClassNames = {
    root: 'ms-Persona',
    size8: 'ms-Persona--size8',
    size10: 'ms-Persona--size10',
    size16: 'ms-Persona--size16',
    size24: 'ms-Persona--size24',
    size28: 'ms-Persona--size28',
    size32: 'ms-Persona--size32',
    size40: 'ms-Persona--size40',
    size48: 'ms-Persona--size48',
    size56: 'ms-Persona--size56',
    size72: 'ms-Persona--size72',
    size100: 'ms-Persona--size100',
    size120: 'ms-Persona--size120',
    available: 'ms-Persona--online',
    away: 'ms-Persona--away',
    blocked: 'ms-Persona--blocked',
    busy: 'ms-Persona--busy',
    doNotDisturb: 'ms-Persona--donotdisturb',
    offline: 'ms-Persona--offline',
    details: 'ms-Persona-details',
    primaryText: 'ms-Persona-primaryText',
    secondaryText: 'ms-Persona-secondaryText',
    tertiaryText: 'ms-Persona-tertiaryText',
    optionalText: 'ms-Persona-optionalText',
    textContent: 'ms-Persona-textContent'
};
var getStyles = function (props) {
    var className = props.className, showSecondaryText = props.showSecondaryText, theme = props.theme;
    var palette = theme.palette, fonts = theme.fonts;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    var size = Object(_PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["sizeBoolean"])(props.size);
    var presence = Object(_PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["presenceBoolean"])(props.presence);
    var showSecondaryTextDefaultHeight = '16px';
    var sharedTextStyles = {
        color: palette.neutralSecondary,
        fontWeight: _Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].regular,
        fontSize: fonts.small.fontSize
    };
    return {
        root: [
            classNames.root,
            theme.fonts.medium,
            _Styling__WEBPACK_IMPORTED_MODULE_0__["normalize"],
            {
                color: palette.neutralPrimary,
                position: 'relative',
                height: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size48,
                minWidth: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size48,
                display: 'flex',
                alignItems: 'center',
                selectors: {
                    '.contextualHost': {
                        display: 'none'
                    }
                }
            },
            size.isSize8 && [
                classNames.size8,
                {
                    height: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size8,
                    minWidth: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size8
                }
            ],
            // TODO: Deprecated size and needs to be removed in a future major release.
            size.isSize10 && [
                classNames.size10,
                {
                    height: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size10,
                    minWidth: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size10
                }
            ],
            // TODO: Deprecated size and needs to be removed in a future major release.
            size.isSize16 && [
                classNames.size16,
                {
                    height: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size16,
                    minWidth: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size16
                }
            ],
            size.isSize24 && [
                classNames.size24,
                {
                    height: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size24,
                    minWidth: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size24
                }
            ],
            size.isSize24 &&
                showSecondaryText && {
                height: '36px'
            },
            // TODO: Deprecated size and needs to be removed in a future major release.
            size.isSize28 && [
                classNames.size28,
                {
                    height: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size28,
                    minWidth: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size28
                }
            ],
            size.isSize28 &&
                showSecondaryText && {
                height: '32px'
            },
            size.isSize32 && [
                classNames.size32,
                {
                    height: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size32,
                    minWidth: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size32
                }
            ],
            size.isSize40 && [
                classNames.size40,
                {
                    height: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size40,
                    minWidth: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size40
                }
            ],
            size.isSize48 && classNames.size48,
            size.isSize56 && [
                classNames.size56,
                {
                    height: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size56,
                    minWidth: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size56
                }
            ],
            size.isSize72 && [
                classNames.size72,
                {
                    height: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size72,
                    minWidth: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size72
                }
            ],
            size.isSize100 && [
                classNames.size100,
                {
                    height: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size100,
                    minWidth: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size100
                }
            ],
            size.isSize120 && [
                classNames.size120,
                {
                    height: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size120,
                    minWidth: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size120
                }
            ],
            /**
             * Modifiers: presence
             */
            presence.isAvailable && classNames.available,
            presence.isAway && classNames.away,
            presence.isBlocked && classNames.blocked,
            presence.isBusy && classNames.busy,
            presence.isDoNotDisturb && classNames.doNotDisturb,
            presence.isOffline && classNames.offline,
            className
        ],
        details: [
            classNames.details,
            {
                padding: '0 24px 0 16px',
                minWidth: 0,
                width: '100%',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around'
            },
            (size.isSize8 || size.isSize10) && {
                paddingLeft: 17 // increased padding because we don't render a coin at this size
            },
            (size.isSize24 || size.isSize28 || size.isSize32) && {
                padding: '0 8px'
            },
            (size.isSize40 || size.isSize48) && {
                padding: '0 12px'
            }
        ],
        primaryText: [
            classNames.primaryText,
            _Styling__WEBPACK_IMPORTED_MODULE_0__["noWrap"],
            {
                color: palette.neutralPrimary,
                fontWeight: _Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].regular,
                fontSize: fonts.medium.fontSize,
                selectors: {
                    ':hover': {
                        color: palette.neutralDark
                    }
                }
            },
            showSecondaryText && {
                height: showSecondaryTextDefaultHeight,
                lineHeight: showSecondaryTextDefaultHeight,
                overflowX: 'hidden'
            },
            (size.isSize8 || size.isSize10) && {
                fontSize: fonts.small.fontSize,
                lineHeight: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size8
            },
            size.isSize16 && {
                lineHeight: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaSize"].size28
            },
            (size.isSize24 || size.isSize28 || size.isSize32 || size.isSize40 || size.isSize48) &&
                showSecondaryText && {
                height: 18
            },
            (size.isSize56 || size.isSize72 || size.isSize100 || size.isSize120) && {
                fontSize: fonts.xLarge.fontSize
            },
            (size.isSize56 || size.isSize72 || size.isSize100 || size.isSize120) &&
                showSecondaryText && {
                height: 22
            }
        ],
        secondaryText: [
            classNames.secondaryText,
            _Styling__WEBPACK_IMPORTED_MODULE_0__["noWrap"],
            sharedTextStyles,
            (size.isSize8 || size.isSize10 || size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32) && {
                display: 'none'
            },
            showSecondaryText && {
                display: 'block',
                height: showSecondaryTextDefaultHeight,
                lineHeight: showSecondaryTextDefaultHeight,
                overflowX: 'hidden'
            },
            size.isSize24 &&
                showSecondaryText && {
                height: 18
            },
            (size.isSize56 || size.isSize72 || size.isSize100 || size.isSize120) && {
                fontSize: fonts.medium.fontSize
            },
            (size.isSize56 || size.isSize72 || size.isSize100 || size.isSize120) &&
                showSecondaryText && {
                height: 18
            }
        ],
        tertiaryText: [
            classNames.tertiaryText,
            _Styling__WEBPACK_IMPORTED_MODULE_0__["noWrap"],
            sharedTextStyles,
            {
                display: 'none',
                fontSize: fonts.medium.fontSize
            },
            (size.isSize72 || size.isSize100 || size.isSize120) && {
                display: 'block'
            }
        ],
        optionalText: [
            classNames.optionalText,
            _Styling__WEBPACK_IMPORTED_MODULE_0__["noWrap"],
            sharedTextStyles,
            {
                display: 'none',
                fontSize: fonts.medium.fontSize
            },
            (size.isSize100 || size.isSize120) && {
                display: 'block'
            }
        ],
        textContent: [classNames.textContent, _Styling__WEBPACK_IMPORTED_MODULE_0__["noWrap"]]
    };
};
//# sourceMappingURL=Persona.styles.js.map

/***/ }),

/***/ "1jN7":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Tooltip/TooltipHost.base.js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: TooltipHostBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipHostBase", function() { return TooltipHostBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Styling */ "xS3b");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _TooltipHost_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TooltipHost.types */ "JS1Y");
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Tooltip */ "1WKE");
/* harmony import */ var _Tooltip_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Tooltip.types */ "ARrK");







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

/***/ "1xi6":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/utilities/positioning/index.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: Rectangle, __positioningTestPackage, positionElement, positionCallout, positionCard, getMaxHeight, getOppositeEdge, RectangleEdge, Position */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./positioning */ "z0mb");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return _positioning__WEBPACK_IMPORTED_MODULE_0__["Rectangle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__positioningTestPackage", function() { return _positioning__WEBPACK_IMPORTED_MODULE_0__["__positioningTestPackage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "positionElement", function() { return _positioning__WEBPACK_IMPORTED_MODULE_0__["positionElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "positionCallout", function() { return _positioning__WEBPACK_IMPORTED_MODULE_0__["positionCallout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "positionCard", function() { return _positioning__WEBPACK_IMPORTED_MODULE_0__["positionCard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMaxHeight", function() { return _positioning__WEBPACK_IMPORTED_MODULE_0__["getMaxHeight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOppositeEdge", function() { return _positioning__WEBPACK_IMPORTED_MODULE_0__["getOppositeEdge"]; });

/* harmony import */ var _positioning_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./positioning.types */ "AiOe");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RectangleEdge", function() { return _positioning_types__WEBPACK_IMPORTED_MODULE_1__["RectangleEdge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return _positioning_types__WEBPACK_IMPORTED_MODULE_1__["Position"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "28QO":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/HoverCard.styles.js ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: ExpandingCardStyles, PlainCardStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpandingCardStyles", function() { return ExpandingCardStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlainCardStyles", function() { return PlainCardStyles; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");

var commonCardStyles = function () {
    return {
        border: 'none',
        boxShadow: '0 0 20px rgba(0, 0, 0, .2)'
    };
};
var ExpandingCardStyles = {
    root: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, commonCardStyles(), { width: 340 }),
    expandedCard: {
        selectors: {
            ':before': {
                width: 292 // needs to change due to above change
            }
        }
    }
};
var PlainCardStyles = {
    root: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, commonCardStyles())
};
//# sourceMappingURL=HoverCard.styles.js.map

/***/ }),

/***/ "2MrE":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Fabric/Fabric.js ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: Fabric */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fabric", function() { return Fabric; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _Fabric_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Fabric.base */ "8Yra");
/* harmony import */ var _Fabric_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Fabric.styles */ "Q+6t");



var Fabric = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Fabric_base__WEBPACK_IMPORTED_MODULE_1__["FabricBase"], _Fabric_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'Fabric'
});
//# sourceMappingURL=Fabric.js.map

/***/ }),

/***/ "3f2I":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Icon/ImageIcon.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: ImageIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageIcon", function() { return ImageIcon; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Image_Image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Image/Image */ "HLvE");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _Icon_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Icon.styles */ "jyzp");





/**
 * Fast icon component which only supports images (not font glyphs) and can't be targeted by customizations.
 * To style the icon, use `className` or reference `ms-Icon` in CSS.
 * {@docCategory Icon}
 */
var ImageIcon = function (props) {
    var className = props.className, imageProps = props.imageProps;
    var nativeProps = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getNativeProps"])(props, _Utilities__WEBPACK_IMPORTED_MODULE_3__["htmlElementProperties"]);
    var containerProps = props['aria-label']
        ? {}
        : {
            role: 'presentation',
            'aria-hidden': imageProps.alt || imageProps['aria-labelledby'] ? false : true
        };
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, containerProps, nativeProps, { className: Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["css"])(_Icon_styles__WEBPACK_IMPORTED_MODULE_4__["MS_ICON"], _Icon_styles__WEBPACK_IMPORTED_MODULE_4__["classNames"].root, _Icon_styles__WEBPACK_IMPORTED_MODULE_4__["classNames"].image, className) }),
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Image_Image__WEBPACK_IMPORTED_MODULE_2__["Image"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, imageProps))));
};
//# sourceMappingURL=ImageIcon.js.map

/***/ }),

/***/ "4kf8":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Persona/PersonaCoin/PersonaCoin.styles.js ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Styling */ "xS3b");
/* harmony import */ var _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PersonaConsts */ "ztYb");


var GlobalClassNames = {
    coin: 'ms-Persona-coin',
    imageArea: 'ms-Persona-imageArea',
    image: 'ms-Persona-image',
    initials: 'ms-Persona-initials',
    size8: 'ms-Persona--size8',
    size10: 'ms-Persona--size10',
    size16: 'ms-Persona--size16',
    size24: 'ms-Persona--size24',
    size28: 'ms-Persona--size28',
    size32: 'ms-Persona--size32',
    size40: 'ms-Persona--size40',
    size48: 'ms-Persona--size48',
    size56: 'ms-Persona--size56',
    size72: 'ms-Persona--size72',
    size100: 'ms-Persona--size100',
    size120: 'ms-Persona--size120'
};
var getStyles = function (props) {
    var _a;
    var className = props.className, theme = props.theme, coinSize = props.coinSize;
    var palette = theme.palette, fonts = theme.fonts;
    var size = Object(_PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["sizeBoolean"])(props.size);
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    // Static colors used when displaying 'unknown persona' coin
    var unknownPersonaBackgroundColor = 'rgb(234, 234, 234)';
    var unknownPersonaFontColor = 'rgb(168, 0, 0)';
    var dimension = coinSize || (props.size && _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["sizeToPixels"][props.size]) || 48;
    return {
        coin: [
            classNames.coin,
            fonts.medium,
            size.isSize8 && classNames.size8,
            size.isSize10 && classNames.size10,
            size.isSize16 && classNames.size16,
            size.isSize24 && classNames.size24,
            size.isSize28 && classNames.size28,
            size.isSize32 && classNames.size32,
            size.isSize40 && classNames.size40,
            size.isSize48 && classNames.size48,
            size.isSize56 && classNames.size56,
            size.isSize72 && classNames.size72,
            size.isSize100 && classNames.size100,
            size.isSize120 && classNames.size120,
            className
        ],
        size10WithoutPresenceIcon: {
            fontSize: fonts.xSmall.fontSize,
            position: 'absolute',
            top: '5px',
            right: 'auto',
            left: 0
        },
        imageArea: [
            classNames.imageArea,
            {
                position: 'relative',
                textAlign: 'center',
                flex: '0 0 auto',
                height: dimension,
                width: dimension
            },
            dimension <= 10 && {
                overflow: 'visible',
                background: 'transparent',
                height: 0,
                width: 0
            }
        ],
        image: [
            classNames.image,
            {
                marginRight: '10px',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
                borderRadius: '50%',
                perspective: '1px'
            },
            dimension <= 10 && {
                overflow: 'visible',
                background: 'transparent',
                height: 0,
                width: 0
            },
            dimension > 10 && {
                height: dimension,
                width: dimension
            }
        ],
        initials: [
            classNames.initials,
            {
                borderRadius: '50%',
                color: props.showUnknownPersonaCoin ? unknownPersonaFontColor : palette.white,
                fontSize: fonts.large.fontSize,
                fontWeight: _Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].semibold,
                lineHeight: dimension === 48 ? 46 : dimension,
                height: dimension,
                selectors: (_a = {},
                    _a[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                        border: '1px solid WindowText',
                        MsHighContrastAdjust: 'none',
                        color: 'WindowText',
                        boxSizing: 'border-box',
                        backgroundColor: 'Window !important'
                    },
                    _a.i = {
                        fontWeight: _Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].semibold
                    },
                    _a)
            },
            props.showUnknownPersonaCoin && {
                backgroundColor: unknownPersonaBackgroundColor
            },
            dimension < 32 && {
                fontSize: fonts.xSmall.fontSize
            },
            dimension >= 32 &&
                dimension < 40 && {
                fontSize: fonts.medium.fontSize
            },
            dimension >= 40 &&
                dimension < 56 && {
                fontSize: fonts.mediumPlus.fontSize
            },
            dimension >= 56 &&
                dimension < 72 && {
                fontSize: fonts.xLarge.fontSize
            },
            dimension >= 72 &&
                dimension < 100 && {
                fontSize: fonts.xxLarge.fontSize
            },
            dimension >= 100 && {
                fontSize: fonts.superLarge.fontSize
            }
        ]
    };
};
//# sourceMappingURL=PersonaCoin.styles.js.map

/***/ }),

/***/ "5bNc":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Callout/CalloutContent.js ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: CalloutContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalloutContent", function() { return CalloutContent; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _CalloutContent_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CalloutContent.base */ "/yd3");
/* harmony import */ var _CalloutContent_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CalloutContent.styles */ "1+D1");



var CalloutContent = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_CalloutContent_base__WEBPACK_IMPORTED_MODULE_1__["CalloutContentBase"], _CalloutContent_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, { scope: 'CalloutContent' });
//# sourceMappingURL=CalloutContent.js.map

/***/ }),

/***/ "6vf4":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Tooltip/TooltipHost.styles.js ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "xS3b");

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

/***/ "7NGt":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Tooltip/Tooltip.base.js ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: TooltipBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipBase", function() { return TooltipBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _Callout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Callout */ "hrrk");
/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/DirectionalHint */ "RPJY");





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

/***/ "8Yra":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Fabric/Fabric.base.js ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: FabricBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FabricBase", function() { return FabricBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _Fabric_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Fabric.styles */ "Q+6t");




var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var FabricBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](FabricBase, _super);
    function FabricBase(props) {
        var _this = _super.call(this, props) || this;
        _this._rootElement = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._disposables = [];
        _this._onMouseDown = function (ev) {
            _this.setState({ isFocusVisible: false });
        };
        _this._onKeyDown = function (ev) {
            if (Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["isDirectionalKeyCode"])(ev.which)) {
                _this.setState({ isFocusVisible: true });
            }
        };
        _this.state = { isFocusVisible: false };
        return _this;
    }
    FabricBase.prototype.render = function () {
        var className = this.props.className;
        var classNames = getClassNames(_Fabric_styles__WEBPACK_IMPORTED_MODULE_3__["getStyles"], {
            theme: this.props.theme,
            className: className,
            isFocusVisible: this.state.isFocusVisible
        });
        var divProps = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getNativeProps"])(this.props, _Utilities__WEBPACK_IMPORTED_MODULE_2__["divProperties"]);
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, divProps, { className: classNames.root, ref: this._rootElement }));
    };
    FabricBase.prototype.componentDidMount = function () {
        var win = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getWindow"])(this._rootElement.current);
        if (win) {
            this._disposables.push(Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["on"])(win, 'mousedown', this._onMouseDown, true), Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["on"])(win, 'keydown', this._onKeyDown, true));
        }
    };
    FabricBase.prototype.componentWillUnmount = function () {
        this._disposables.forEach(function (dispose) { return dispose(); });
    };
    return FabricBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=Fabric.base.js.map

/***/ }),

/***/ "8vwk":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Callout/index.js ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: DirectionalHint, Callout, FocusTrapCallout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Callout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Callout */ "EZt/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Callout", function() { return _Callout__WEBPACK_IMPORTED_MODULE_0__["Callout"]; });

/* harmony import */ var _FocusTrapCallout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FocusTrapCallout */ "n+XE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FocusTrapCallout", function() { return _FocusTrapCallout__WEBPACK_IMPORTED_MODULE_1__["FocusTrapCallout"]; });

/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/DirectionalHint */ "RPJY");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirectionalHint", function() { return _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_2__["DirectionalHint"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "9LLN":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/Fabric.js ***!
  \*****************************************************************************************************************************************************************************************************/
/*! exports provided: Fabric, FabricBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Fabric_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Fabric/index */ "McAt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fabric", function() { return _components_Fabric_index__WEBPACK_IMPORTED_MODULE_0__["Fabric"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FabricBase", function() { return _components_Fabric_index__WEBPACK_IMPORTED_MODULE_0__["FabricBase"]; });


//# sourceMappingURL=Fabric.js.map

/***/ }),

/***/ "9w4M":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Layer/Layer.base.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: LayerBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayerBase", function() { return LayerBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Fabric__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Fabric */ "9LLN");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _Layer_notification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Layer.notification */ "s3Hm");






var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["classNamesFunction"])();
var LayerBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LayerBase, _super);
    function LayerBase(props) {
        var _this = _super.call(this, props) || this;
        _this._rootRef = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._createLayerElement = function () {
            var hostId = _this.props.hostId;
            var doc = Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["getDocument"])(_this._rootRef.current);
            var host = _this._getHost();
            if (!doc || !host) {
                return;
            }
            // If one was already existing, remove.
            _this._removeLayerElement();
            var layerElement = doc.createElement('div');
            var classNames = _this._getClassNames();
            layerElement.className = classNames.root;
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["setPortalAttribute"])(layerElement);
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["setVirtualParent"])(layerElement, _this._rootRef.current);
            _this.props.insertFirst ? host.insertBefore(layerElement, host.firstChild) : host.appendChild(layerElement);
            _this.setState({
                hostId: hostId,
                layerElement: layerElement
            }, function () {
                var _a = _this.props, onLayerDidMount = _a.onLayerDidMount, onLayerMounted = _a.onLayerMounted;
                if (onLayerMounted) {
                    onLayerMounted();
                }
                if (onLayerDidMount) {
                    onLayerDidMount();
                }
            });
        };
        _this.state = {};
        if (true) {
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["warnDeprecations"])('Layer', props, {
                onLayerMounted: 'onLayerDidMount'
            });
        }
        return _this;
    }
    LayerBase.prototype.componentDidMount = function () {
        var hostId = this.props.hostId;
        this._createLayerElement();
        if (hostId) {
            Object(_Layer_notification__WEBPACK_IMPORTED_MODULE_5__["registerLayer"])(hostId, this._createLayerElement);
        }
    };
    LayerBase.prototype.render = function () {
        var layerElement = this.state.layerElement;
        var classNames = this._getClassNames();
        var eventBubblingEnabled = this.props.eventBubblingEnabled;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: "ms-layer", ref: this._rootRef }, layerElement &&
            react_dom__WEBPACK_IMPORTED_MODULE_2__["createPortal"](react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Fabric__WEBPACK_IMPORTED_MODULE_3__["Fabric"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, !eventBubblingEnabled && _getFilteredEvents(), { className: classNames.content }), this.props.children), layerElement)));
    };
    LayerBase.prototype.componentDidUpdate = function () {
        if (this.props.hostId !== this.state.hostId) {
            this._createLayerElement();
        }
    };
    LayerBase.prototype.componentWillUnmount = function () {
        var hostId = this.props.hostId;
        this._removeLayerElement();
        if (hostId) {
            Object(_Layer_notification__WEBPACK_IMPORTED_MODULE_5__["unregisterLayer"])(hostId, this._createLayerElement);
        }
    };
    LayerBase.prototype._removeLayerElement = function () {
        var onLayerWillUnmount = this.props.onLayerWillUnmount;
        var layerElement = this.state.layerElement;
        if (onLayerWillUnmount) {
            onLayerWillUnmount();
        }
        if (layerElement && layerElement.parentNode) {
            var parentNode = layerElement.parentNode;
            if (parentNode) {
                parentNode.removeChild(layerElement);
            }
        }
    };
    LayerBase.prototype._getClassNames = function () {
        var _a = this.props, className = _a.className, styles = _a.styles, theme = _a.theme;
        var classNames = getClassNames(styles, {
            theme: theme,
            className: className,
            isNotHost: !this.props.hostId
        });
        return classNames;
    };
    LayerBase.prototype._getHost = function () {
        var hostId = this.props.hostId;
        var doc = Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["getDocument"])(this._rootRef.current);
        if (!doc) {
            return undefined;
        }
        if (hostId) {
            return doc.getElementById(hostId);
        }
        else {
            var defaultHostSelector = Object(_Layer_notification__WEBPACK_IMPORTED_MODULE_5__["getDefaultTarget"])();
            return defaultHostSelector ? doc.querySelector(defaultHostSelector) : doc.body;
        }
    };
    LayerBase.defaultProps = {
        onLayerDidMount: function () { return undefined; },
        onLayerWillUnmount: function () { return undefined; }
    };
    LayerBase = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["customizable"])('Layer', ['theme', 'hostId'])
    ], LayerBase);
    return LayerBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

var _onFilterEvent = function (ev) {
    // We should just be able to check ev.bubble here and only stop events that are bubbling up. However, even though mouseenter and
    //    mouseleave do NOT bubble up, they are showing up as bubbling. Therefore we stop events based on event name rather than ev.bubble.
    if (ev.eventPhase === Event.BUBBLING_PHASE && ev.type !== 'mouseenter' && ev.type !== 'mouseleave') {
        ev.stopPropagation();
    }
};
var _filteredEventProps;
function _getFilteredEvents() {
    if (!_filteredEventProps) {
        _filteredEventProps = {};
        [
            'onClick',
            'onContextMenu',
            'onDoubleClick',
            'onDrag',
            'onDragEnd',
            'onDragEnter',
            'onDragExit',
            'onDragLeave',
            'onDragOver',
            'onDragStart',
            'onDrop',
            'onMouseDown',
            'onMouseEnter',
            'onMouseLeave',
            'onMouseMove',
            'onMouseOver',
            'onMouseOut',
            'onMouseUp',
            'onKeyDown',
            'onKeyPress',
            'onKeyUp',
            'onFocus',
            'onBlur',
            'onChange',
            'onInput',
            'onInvalid',
            'onSubmit'
        ].forEach(function (name) { return (_filteredEventProps[name] = _onFilterEvent); });
    }
    return _filteredEventProps;
}
//# sourceMappingURL=Layer.base.js.map

/***/ }),

/***/ "ARrK":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Tooltip/Tooltip.types.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
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

/***/ "ATOD":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Icon/Icon.js ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: Icon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Icon", function() { return Icon; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _Icon_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon.base */ "o4pL");
/* harmony import */ var _Icon_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon.styles */ "jyzp");



/**
 * Legacy Icon component which can be targeted by customization. It's recommended to use `FontIcon`
 * or `ImageIcon` instead, especially in scenarios where rendering performance is important.
 * {@docCategory Icon}
 */
var Icon = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Icon_base__WEBPACK_IMPORTED_MODULE_1__["IconBase"], _Icon_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'Icon'
}, true);
//# sourceMappingURL=Icon.js.map

/***/ }),

/***/ "AiOe":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/utilities/positioning/positioning.types.js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: RectangleEdge, Position */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RectangleEdge", function() { return RectangleEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return Position; });
var RectangleEdge;
(function (RectangleEdge) {
    RectangleEdge[RectangleEdge["top"] = 1] = "top";
    RectangleEdge[RectangleEdge["bottom"] = -1] = "bottom";
    RectangleEdge[RectangleEdge["left"] = 2] = "left";
    RectangleEdge[RectangleEdge["right"] = -2] = "right";
})(RectangleEdge || (RectangleEdge = {}));
var Position;
(function (Position) {
    Position[Position["top"] = 0] = "top";
    Position[Position["bottom"] = 1] = "bottom";
    Position[Position["start"] = 2] = "start";
    Position[Position["end"] = 3] = "end";
})(Position || (Position = {}));
//# sourceMappingURL=positioning.types.js.map

/***/ }),

/***/ "B3I/":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/SpinButton.styles.js ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: SpinButtonStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpinButtonStyles", function() { return SpinButtonStyles; });
var SPIN_BUTTON_WIDTH = 14;
var SpinButtonStyles = {
    input: {
        padding: '0 12px'
    },
    arrowButtonsContainer: {
        selectors: {
            '.ms-DownButton': {
                width: SPIN_BUTTON_WIDTH,
                selectors: {
                    '.ms-Button-icon': {
                        fontSize: 6
                    }
                }
            },
            '.ms-UpButton': {
                width: SPIN_BUTTON_WIDTH,
                selectors: {
                    '.ms-Button-icon': {
                        fontSize: 6
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=SpinButton.styles.js.map

/***/ }),

/***/ "BBBu":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/ChoiceGroupOption.styles.js ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: ChoiceGroupOptionStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChoiceGroupOptionStyles", function() { return ChoiceGroupOptionStyles; });
var ChoiceGroupOptionStyles = function (props) {
    var checked = props.checked, disabled = props.disabled, theme = props.theme, hasIcon = props.hasIcon, hasImage = props.hasImage;
    var palette = theme.palette;
    return {
        field: [
            (hasIcon || hasImage) &&
                !disabled && {
                selectors: {
                    ':hover': {
                        borderColor: checked ? palette.themeDark : palette.neutralTertiaryAlt
                    }
                }
            },
            (hasIcon || hasImage) && {
                borderWidth: 2
            },
            disabled &&
                !checked && {
                selectors: {
                    ':before': {
                        backgroundColor: palette.neutralTertiary,
                        borderColor: palette.neutralTertiary
                    }
                }
            }
        ]
    };
};
//# sourceMappingURL=ChoiceGroupOption.styles.js.map

/***/ }),

/***/ "BxsC":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Popup/Popup.js ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: Popup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Popup", function() { return Popup; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "H+ST");



/**
 * This adds accessibility to Dialog and Panel controls
 */
var Popup = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Popup, _super);
    function Popup(props) {
        var _this = _super.call(this, props) || this;
        _this._root = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._disposables = [];
        _this._onKeyDown = function (ev) {
            switch (ev.which) {
                case _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].escape:
                    if (_this.props.onDismiss) {
                        _this.props.onDismiss(ev);
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                    break;
            }
        };
        _this._onFocus = function () {
            _this._containsFocus = true;
        };
        _this._onBlur = function (ev) {
            if (_this._root.current && _this._root.current.contains(ev.relatedTarget)) {
                _this._containsFocus = false;
            }
        };
        _this._async = new _Utilities__WEBPACK_IMPORTED_MODULE_2__["Async"](_this);
        _this.state = { needsVerticalScrollBar: false };
        return _this;
    }
    // tslint:disable-next-line function-name
    Popup.prototype.UNSAFE_componentWillMount = function () {
        this._originalFocusedElement = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getDocument"])().activeElement;
    };
    Popup.prototype.componentDidMount = function () {
        if (this._root.current) {
            this._disposables.push(Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["on"])(this._root.current, 'focus', this._onFocus, true), Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["on"])(this._root.current, 'blur', this._onBlur, true));
            var currentWindow = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getWindow"])(this._root.current);
            if (currentWindow) {
                this._disposables.push(Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["on"])(currentWindow, 'keydown', this._onKeyDown));
            }
            if (Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["doesElementContainFocus"])(this._root.current)) {
                this._containsFocus = true;
            }
        }
        this._updateScrollBarAsync();
    };
    Popup.prototype.componentDidUpdate = function () {
        this._updateScrollBarAsync();
        this._async.dispose();
    };
    Popup.prototype.componentWillUnmount = function () {
        this._disposables.forEach(function (dispose) { return dispose(); });
        if (this.props.shouldRestoreFocus &&
            this._originalFocusedElement &&
            this._containsFocus &&
            this._originalFocusedElement !== window) {
            // This slight delay is required so that we can unwind the stack, let react try to mess with focus, and then
            // apply the correct focus. Without the setTimeout, we end up focusing the correct thing, and then React wants
            // to reset the focus back to the thing it thinks should have been focused.
            if (this._originalFocusedElement) {
                this._originalFocusedElement.focus();
            }
        }
    };
    Popup.prototype.render = function () {
        var _a = this.props, role = _a.role, className = _a.className, ariaLabel = _a.ariaLabel, ariaLabelledBy = _a.ariaLabelledBy, ariaDescribedBy = _a.ariaDescribedBy, style = _a.style;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ ref: this._root }, Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getNativeProps"])(this.props, _Utilities__WEBPACK_IMPORTED_MODULE_2__["divProperties"]), { className: className, role: role, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, onKeyDown: this._onKeyDown, style: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ overflowY: this.state.needsVerticalScrollBar ? 'scroll' : undefined, outline: 'none' }, style) }), this.props.children));
    };
    Popup.prototype._updateScrollBarAsync = function () {
        var _this = this;
        this._async.requestAnimationFrame(function () {
            _this._getScrollBar();
        });
    };
    Popup.prototype._getScrollBar = function () {
        // If overflowY is overriden, don't waste time calculating whether the scrollbar is necessary.
        if (this.props.style && this.props.style.overflowY) {
            return;
        }
        var needsVerticalScrollBar = false;
        if (this._root && this._root.current && this._root.current.firstElementChild) {
            // ClientHeight returns the client height of an element rounded to an
            // integer. On some browsers at different zoom levels this rounding
            // can generate different results for the root container and child even
            // though they are the same height. This causes us to show a scroll bar
            // when not needed. Ideally we would use BoundingClientRect().height
            // instead however seems that the API is 90% slower than using ClientHeight.
            // Therefore instead we will calculate the difference between heights and
            // allow for a 1px difference to still be considered ok and not show the
            // scroll bar.
            var rootHeight = this._root.current.clientHeight;
            var firstChildHeight = this._root.current.firstElementChild.clientHeight;
            if (rootHeight > 0 && firstChildHeight > rootHeight) {
                needsVerticalScrollBar = firstChildHeight - rootHeight > 1;
            }
        }
        if (this.state.needsVerticalScrollBar !== needsVerticalScrollBar) {
            this.setState({
                needsVerticalScrollBar: needsVerticalScrollBar
            });
        }
    };
    Popup.defaultProps = {
        shouldRestoreFocus: true
    };
    return Popup;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=Popup.js.map

/***/ }),

/***/ "CYSw":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Icon/Icon.types.js ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: IconType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconType", function() { return IconType; });
/**
 * @deprecated Icon type is inferred based on presence of `IIconProps.imageProps`
 * {@docCategory Icon}
 */
var IconType;
(function (IconType) {
    /**
     * Render using the fabric icon font.
     * @deprecated Icon type is inferred based on presence of `IIconProps.imageProps`
     */
    IconType[IconType["default"] = 0] = "default";
    /**
     * Render using an image, where imageProps would be used.
     * @deprecated Icon type is inferred based on presence of `IIconProps.imageProps`
     */
    IconType[IconType["image"] = 1] = "image";
    /**
     * Deprecated, use `default`.
     * @deprecated Use `default`.
     */
    IconType[IconType["Default"] = 100000] = "Default";
    /**
     * Deprecated, use `image`.
     * @deprecated Use `image`.
     */
    IconType[IconType["Image"] = 100001] = "Image";
})(IconType || (IconType = {}));
//# sourceMappingURL=Icon.types.js.map

/***/ }),

/***/ "CcGg":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Layer/Layer.js ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: Layer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return Layer; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _Layer_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layer.base */ "9w4M");
/* harmony import */ var _Layer_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Layer.styles */ "gJKu");



var Layer = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Layer_base__WEBPACK_IMPORTED_MODULE_1__["LayerBase"], _Layer_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'Layer',
    fields: ['hostId', 'theme', 'styles']
});
//# sourceMappingURL=Layer.js.map

/***/ }),

/***/ "CsHB":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/FocusTrapZone/index.js ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: FocusTrapZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FocusTrapZone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FocusTrapZone */ "NYuz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FocusTrapZone", function() { return _FocusTrapZone__WEBPACK_IMPORTED_MODULE_0__["FocusTrapZone"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "DUPL":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Persona/PersonaCoin/index.js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! exports provided: PersonaCoin, PersonaCoinBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PersonaCoin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PersonaCoin */ "mQmn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaCoin", function() { return _PersonaCoin__WEBPACK_IMPORTED_MODULE_0__["PersonaCoin"]; });

/* harmony import */ var _PersonaCoin_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PersonaCoin.base */ "p1Ni");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaCoinBase", function() { return _PersonaCoin_base__WEBPACK_IMPORTED_MODULE_1__["PersonaCoinBase"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "DqTc":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Image/index.js ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: Image, ImageBase, ImageFit, ImageCoverStyle, ImageLoadState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Image */ "HLvE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return _Image__WEBPACK_IMPORTED_MODULE_0__["Image"]; });

/* harmony import */ var _Image_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Image.base */ "esuy");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageBase", function() { return _Image_base__WEBPACK_IMPORTED_MODULE_1__["ImageBase"]; });

/* harmony import */ var _Image_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Image.types */ "i/gR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageFit", function() { return _Image_types__WEBPACK_IMPORTED_MODULE_2__["ImageFit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageCoverStyle", function() { return _Image_types__WEBPACK_IMPORTED_MODULE_2__["ImageCoverStyle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageLoadState", function() { return _Image_types__WEBPACK_IMPORTED_MODULE_2__["ImageLoadState"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "EWSc":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Icon/index.js ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: Icon, IconBase, IconType, getIconContent, FontIcon, getFontIcon, ImageIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Icon */ "ATOD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Icon", function() { return _Icon__WEBPACK_IMPORTED_MODULE_0__["Icon"]; });

/* harmony import */ var _Icon_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon.base */ "o4pL");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IconBase", function() { return _Icon_base__WEBPACK_IMPORTED_MODULE_1__["IconBase"]; });

/* harmony import */ var _Icon_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon.types */ "CYSw");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IconType", function() { return _Icon_types__WEBPACK_IMPORTED_MODULE_2__["IconType"]; });

/* harmony import */ var _FontIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FontIcon */ "pAHr");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getIconContent", function() { return _FontIcon__WEBPACK_IMPORTED_MODULE_3__["getIconContent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FontIcon", function() { return _FontIcon__WEBPACK_IMPORTED_MODULE_3__["FontIcon"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFontIcon", function() { return _FontIcon__WEBPACK_IMPORTED_MODULE_3__["getFontIcon"]; });

/* harmony import */ var _ImageIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ImageIcon */ "3f2I");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageIcon", function() { return _ImageIcon__WEBPACK_IMPORTED_MODULE_4__["ImageIcon"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ "EZt/":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Callout/Callout.js ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: Callout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Callout", function() { return Callout; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CalloutContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CalloutContent */ "5bNc");
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Layer */ "Mp7W");




var Callout = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Callout, _super);
    function Callout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Callout.prototype.render = function () {
        var _a = this.props, layerProps = _a.layerProps, rest = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_a, ["layerProps"]);
        var content = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_CalloutContent__WEBPACK_IMPORTED_MODULE_2__["CalloutContent"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, rest));
        return this.props.doNotLayer ? content : react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Layer__WEBPACK_IMPORTED_MODULE_3__["Layer"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, layerProps), content);
    };
    return Callout;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=Callout.js.map

/***/ }),

/***/ "FEqW":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/Icon.js ***!
  \***************************************************************************************************************************************************************************************************/
/*! exports provided: Icon, IconBase, IconType, getIconContent, FontIcon, getFontIcon, ImageIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Icon_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Icon/index */ "EWSc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Icon", function() { return _components_Icon_index__WEBPACK_IMPORTED_MODULE_0__["Icon"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IconBase", function() { return _components_Icon_index__WEBPACK_IMPORTED_MODULE_0__["IconBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IconType", function() { return _components_Icon_index__WEBPACK_IMPORTED_MODULE_0__["IconType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getIconContent", function() { return _components_Icon_index__WEBPACK_IMPORTED_MODULE_0__["getIconContent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FontIcon", function() { return _components_Icon_index__WEBPACK_IMPORTED_MODULE_0__["FontIcon"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFontIcon", function() { return _components_Icon_index__WEBPACK_IMPORTED_MODULE_0__["getFontIcon"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageIcon", function() { return _components_Icon_index__WEBPACK_IMPORTED_MODULE_0__["ImageIcon"]; });


//# sourceMappingURL=Icon.js.map

/***/ }),

/***/ "Fyzl":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Tooltip/TooltipHost.js ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: TooltipHost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipHost", function() { return TooltipHost; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _TooltipHost_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TooltipHost.base */ "1jN7");
/* harmony import */ var _TooltipHost_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TooltipHost.styles */ "6vf4");



var TooltipHost = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_TooltipHost_base__WEBPACK_IMPORTED_MODULE_1__["TooltipHostBase"], _TooltipHost_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'TooltipHost'
});
//# sourceMappingURL=TooltipHost.js.map

/***/ }),

/***/ "H+ST":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/Utilities.js ***!
  \********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "iKPr");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @uifabric/utilities */ "pBtj");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));


//# sourceMappingURL=Utilities.js.map

/***/ }),

/***/ "HLvE":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Image/Image.js ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: Image */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return Image; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _Image_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Image.base */ "esuy");
/* harmony import */ var _Image_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Image.styles */ "np+x");



var Image = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Image_base__WEBPACK_IMPORTED_MODULE_1__["ImageBase"], _Image_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'Image'
}, true);
//# sourceMappingURL=Image.js.map

/***/ }),

/***/ "JS1Y":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Tooltip/TooltipHost.types.js ***!
  \***********************************************************************************************************************************************************************************************************************************/
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

/***/ "L+CY":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Persona/Persona.base.js ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: PersonaBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonaBase", function() { return PersonaBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Tooltip */ "gVJM");
/* harmony import */ var _PersonaCoin_PersonaCoin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PersonaCoin/PersonaCoin */ "mQmn");
/* harmony import */ var _Persona_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Persona.types */ "TSxk");






var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
/**
 * Persona with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Styling)
 */
var PersonaBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PersonaBase, _super);
    function PersonaBase(props) {
        var _this = _super.call(this, props) || this;
        _this._onRenderPersonaCoin = function (props) {
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_PersonaCoin_PersonaCoin__WEBPACK_IMPORTED_MODULE_4__["PersonaCoin"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props));
        };
        _this._warnDeprecations({ primaryText: 'text' });
        return _this;
    }
    PersonaBase.prototype.render = function () {
        // wrapping default render behavior based on various this.props properties
        var _onRenderPrimaryText = this._onRenderText(this._getText()), _onRenderSecondaryText = this._onRenderText(this.props.secondaryText), _onRenderTertiaryText = this._onRenderText(this.props.tertiaryText), _onRenderOptionalText = this._onRenderText(this.props.optionalText);
        var _a = this.props, hidePersonaDetails = _a.hidePersonaDetails, _b = _a.onRenderOptionalText, onRenderOptionalText = _b === void 0 ? _onRenderOptionalText : _b, _c = _a.onRenderPrimaryText, onRenderPrimaryText = _c === void 0 ? _onRenderPrimaryText : _c, _d = _a.onRenderSecondaryText, onRenderSecondaryText = _d === void 0 ? _onRenderSecondaryText : _d, _e = _a.onRenderTertiaryText, onRenderTertiaryText = _e === void 0 ? _onRenderTertiaryText : _e, _f = _a.onRenderPersonaCoin, onRenderPersonaCoin = _f === void 0 ? this._onRenderPersonaCoin : _f;
        var size = this.props.size;
        // These properties are to be explicitly passed into PersonaCoin because they are the only props directly used
        var _g = this.props, allowPhoneInitials = _g.allowPhoneInitials, className = _g.className, coinProps = _g.coinProps, showUnknownPersonaCoin = _g.showUnknownPersonaCoin, coinSize = _g.coinSize, styles = _g.styles, imageAlt = _g.imageAlt, imageInitials = _g.imageInitials, imageShouldFadeIn = _g.imageShouldFadeIn, imageShouldStartVisible = _g.imageShouldStartVisible, imageUrl = _g.imageUrl, initialsColor = _g.initialsColor, isOutOfOffice = _g.isOutOfOffice, onPhotoLoadingStateChange = _g.onPhotoLoadingStateChange, onRenderCoin = _g.onRenderCoin, onRenderInitials = _g.onRenderInitials, presence = _g.presence, presenceTitle = _g.presenceTitle, showInitialsUntilImageLoads = _g.showInitialsUntilImageLoads, showSecondaryText = _g.showSecondaryText, theme = _g.theme;
        var personaCoinProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ allowPhoneInitials: allowPhoneInitials,
            showUnknownPersonaCoin: showUnknownPersonaCoin,
            coinSize: coinSize,
            imageAlt: imageAlt,
            imageInitials: imageInitials,
            imageShouldFadeIn: imageShouldFadeIn,
            imageShouldStartVisible: imageShouldStartVisible,
            imageUrl: imageUrl,
            initialsColor: initialsColor,
            onPhotoLoadingStateChange: onPhotoLoadingStateChange,
            onRenderCoin: onRenderCoin,
            onRenderInitials: onRenderInitials,
            presence: presence,
            presenceTitle: presenceTitle,
            showInitialsUntilImageLoads: showInitialsUntilImageLoads,
            size: size, text: this._getText(), isOutOfOffice: isOutOfOffice }, coinProps);
        var classNames = getClassNames(styles, {
            theme: theme,
            className: className,
            showSecondaryText: showSecondaryText,
            presence: presence,
            size: size
        });
        var divProps = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getNativeProps"])(this.props, _Utilities__WEBPACK_IMPORTED_MODULE_2__["divProperties"]);
        var personaDetails = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.details },
            this._renderElement(classNames.primaryText, onRenderPrimaryText, _onRenderPrimaryText),
            this._renderElement(classNames.secondaryText, onRenderSecondaryText, _onRenderSecondaryText),
            this._renderElement(classNames.tertiaryText, onRenderTertiaryText, _onRenderTertiaryText),
            this._renderElement(classNames.optionalText, onRenderOptionalText, _onRenderOptionalText),
            this.props.children));
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, divProps, { className: classNames.root, style: coinSize ? { height: coinSize, minWidth: coinSize } : undefined }),
            onRenderPersonaCoin(personaCoinProps, this._onRenderPersonaCoin),
            (!hidePersonaDetails || (size === _Persona_types__WEBPACK_IMPORTED_MODULE_5__["PersonaSize"].size8 || size === _Persona_types__WEBPACK_IMPORTED_MODULE_5__["PersonaSize"].size10 || size === _Persona_types__WEBPACK_IMPORTED_MODULE_5__["PersonaSize"].tiny)) &&
                personaDetails));
    };
    /**
     * Renders various types of Text (primaryText, secondaryText, etc)
     * based on the classNames passed
     * @param classNames - element className
     * @param renderFunction - render function
     * @param defaultRenderFunction - default render function
     */
    PersonaBase.prototype._renderElement = function (classNames, renderFunction, defaultRenderFunction) {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { dir: "auto", className: classNames }, renderFunction && renderFunction(this.props, defaultRenderFunction)));
    };
    /**
     * Deprecation helper for getting text.
     */
    PersonaBase.prototype._getText = function () {
        return this.props.text || this.props.primaryText || '';
    };
    /**
     * using closure to wrap the default render behavior
     * to make it independent of the type of text passed
     * @param text - text to render
     */
    PersonaBase.prototype._onRenderText = function (text) {
        // return default render behaviour for valid text or undefined
        return text
            ? function () {
                // default onRender behaviour
                return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Tooltip__WEBPACK_IMPORTED_MODULE_3__["TooltipHost"], { content: text, overflowMode: _Tooltip__WEBPACK_IMPORTED_MODULE_3__["TooltipOverflowMode"].Parent, directionalHint: _Tooltip__WEBPACK_IMPORTED_MODULE_3__["DirectionalHint"].topLeftEdge }, text));
            }
            : undefined;
    };
    PersonaBase.defaultProps = {
        size: _Persona_types__WEBPACK_IMPORTED_MODULE_5__["PersonaSize"].size48,
        presence: _Persona_types__WEBPACK_IMPORTED_MODULE_5__["PersonaPresence"].none,
        imageAlt: ''
    };
    return PersonaBase;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=Persona.base.js.map

/***/ }),

/***/ "McAt":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Fabric/index.js ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: Fabric, FabricBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Fabric__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Fabric */ "2MrE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fabric", function() { return _Fabric__WEBPACK_IMPORTED_MODULE_0__["Fabric"]; });

/* harmony import */ var _Fabric_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Fabric.base */ "8Yra");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FabricBase", function() { return _Fabric_base__WEBPACK_IMPORTED_MODULE_1__["FabricBase"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "Mp7W":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/Layer.js ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: Layer, LayerBase, LayerHost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "iKPr");
/* harmony import */ var _components_Layer_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Layer/index */ "gnde");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return _components_Layer_index__WEBPACK_IMPORTED_MODULE_1__["Layer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayerBase", function() { return _components_Layer_index__WEBPACK_IMPORTED_MODULE_1__["LayerBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayerHost", function() { return _components_Layer_index__WEBPACK_IMPORTED_MODULE_1__["LayerHost"]; });



//# sourceMappingURL=Layer.js.map

/***/ }),

/***/ "N3z6":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/utilities/positioning.js ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: Rectangle, __positioningTestPackage, positionElement, positionCallout, positionCard, getMaxHeight, getOppositeEdge, RectangleEdge, Position */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _positioning_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./positioning/index */ "1xi6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return _positioning_index__WEBPACK_IMPORTED_MODULE_0__["Rectangle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__positioningTestPackage", function() { return _positioning_index__WEBPACK_IMPORTED_MODULE_0__["__positioningTestPackage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "positionElement", function() { return _positioning_index__WEBPACK_IMPORTED_MODULE_0__["positionElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "positionCallout", function() { return _positioning_index__WEBPACK_IMPORTED_MODULE_0__["positionCallout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "positionCard", function() { return _positioning_index__WEBPACK_IMPORTED_MODULE_0__["positionCard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMaxHeight", function() { return _positioning_index__WEBPACK_IMPORTED_MODULE_0__["getMaxHeight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOppositeEdge", function() { return _positioning_index__WEBPACK_IMPORTED_MODULE_0__["getOppositeEdge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RectangleEdge", function() { return _positioning_index__WEBPACK_IMPORTED_MODULE_0__["RectangleEdge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return _positioning_index__WEBPACK_IMPORTED_MODULE_0__["Position"]; });


//# sourceMappingURL=positioning.js.map

/***/ }),

/***/ "NYuz":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/FocusTrapZone/FocusTrapZone.js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: FocusTrapZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FocusTrapZone", function() { return FocusTrapZone; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "H+ST");



var FocusTrapZone = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](FocusTrapZone, _super);
    function FocusTrapZone(props) {
        var _this = _super.call(this, props) || this;
        _this._root = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._firstBumper = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._lastBumper = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._hasFocus = false;
        _this._onRootFocus = function (ev) {
            if (_this.props.onFocus) {
                _this.props.onFocus(ev);
            }
            _this._hasFocus = true;
        };
        _this._onRootBlur = function (ev) {
            if (_this.props.onBlur) {
                _this.props.onBlur(ev);
            }
            var relatedTarget = ev.relatedTarget;
            if (ev.relatedTarget === null) {
                // In IE11, due to lack of support, event.relatedTarget is always
                // null making every onBlur call to be "outside" of the ComboBox
                // even when it's not. Using document.activeElement is another way
                // for us to be able to get what the relatedTarget without relying
                // on the event
                relatedTarget = _this._getDocument().activeElement;
            }
            if (!Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["elementContains"])(_this._root.current, relatedTarget)) {
                _this._hasFocus = false;
            }
        };
        _this._onFirstBumperFocus = function () {
            _this._onBumperFocus(true);
        };
        _this._onLastBumperFocus = function () {
            _this._onBumperFocus(false);
        };
        _this._onBumperFocus = function (isFirstBumper) {
            if (_this.props.disabled) {
                return;
            }
            var currentBumper = (isFirstBumper === _this._hasFocus ? _this._lastBumper.current : _this._firstBumper.current);
            if (_this._root.current) {
                var nextFocusable = isFirstBumper === _this._hasFocus
                    ? Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getLastTabbable"])(_this._root.current, currentBumper, true, false)
                    : Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getFirstTabbable"])(_this._root.current, currentBumper, true, false);
                if (nextFocusable) {
                    if (_this._isBumper(nextFocusable)) {
                        // This can happen when FTZ contains no tabbable elements. focus will take care of finding a focusable element in FTZ.
                        _this.focus();
                    }
                    else {
                        nextFocusable.focus();
                    }
                }
            }
        };
        _this._onFocusCapture = function (ev) {
            if (_this.props.onFocusCapture) {
                _this.props.onFocusCapture(ev);
            }
            if (ev.target !== ev.currentTarget && !_this._isBumper(ev.target)) {
                // every time focus changes within the trap zone, remember the focused element so that
                // it can be restored if focus leaves the pane and returns via keystroke (i.e. via a call to this.focus(true))
                _this._previouslyFocusedElementInTrapZone = ev.target;
            }
        };
        _this._forceFocusInTrap = function (ev) {
            if (_this.props.disabled) {
                return;
            }
            if (FocusTrapZone._focusStack.length && _this === FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]) {
                var focusedElement = _this._getDocument().activeElement;
                if (!Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["elementContains"])(_this._root.current, focusedElement)) {
                    _this.focus();
                    _this._hasFocus = true; // set focus here since we stop event propagation
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }
        };
        _this._forceClickInTrap = function (ev) {
            if (_this.props.disabled) {
                return;
            }
            if (FocusTrapZone._focusStack.length && _this === FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]) {
                var clickedElement = ev.target;
                if (clickedElement && !Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["elementContains"])(_this._root.current, clickedElement)) {
                    _this.focus();
                    _this._hasFocus = true; // set focus here since we stop event propagation
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }
        };
        Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["initializeComponentRef"])(_this);
        return _this;
    }
    FocusTrapZone.prototype.componentDidMount = function () {
        this._bringFocusIntoZone();
        this._updateEventHandlers(this.props);
    };
    // tslint:disable-next-line function-name
    FocusTrapZone.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        var elementToFocusOnDismiss = nextProps.elementToFocusOnDismiss;
        if (elementToFocusOnDismiss && this._previouslyFocusedElementOutsideTrapZone !== elementToFocusOnDismiss) {
            this._previouslyFocusedElementOutsideTrapZone = elementToFocusOnDismiss;
        }
        this._updateEventHandlers(nextProps);
    };
    FocusTrapZone.prototype.componentDidUpdate = function (prevProps) {
        var prevForceFocusInsideTrap = prevProps.forceFocusInsideTrap !== undefined ? prevProps.forceFocusInsideTrap : true;
        var newForceFocusInsideTrap = this.props.forceFocusInsideTrap !== undefined ? this.props.forceFocusInsideTrap : true;
        var prevDisabled = prevProps.disabled !== undefined ? prevProps.disabled : false;
        var newDisabled = this.props.disabled !== undefined ? this.props.disabled : false;
        if ((!prevForceFocusInsideTrap && newForceFocusInsideTrap) || (prevDisabled && !newDisabled)) {
            // Transition from forceFocusInsideTrap / FTZ disabled to enabled.
            // Emulate what happens when a FocusTrapZone gets mounted.
            this._bringFocusIntoZone();
        }
        else if ((prevForceFocusInsideTrap && !newForceFocusInsideTrap) || (!prevDisabled && newDisabled)) {
            // Transition from forceFocusInsideTrap / FTZ enabled to disabled.
            // Emulate what happens when a FocusTrapZone gets unmounted.
            this._returnFocusToInitiator();
        }
    };
    FocusTrapZone.prototype.componentWillUnmount = function () {
        // don't handle return focus unless forceFocusInsideTrap is true or focus is still within FocusTrapZone
        if (!this.props.disabled ||
            this.props.forceFocusInsideTrap ||
            !Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["elementContains"])(this._root.current, this._getDocument().activeElement)) {
            this._returnFocusToInitiator();
        }
    };
    FocusTrapZone.prototype.render = function () {
        var _a = this.props, className = _a.className, _b = _a.disabled, disabled = _b === void 0 ? false : _b, ariaLabelledBy = _a.ariaLabelledBy;
        var divProps = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getNativeProps"])(this.props, _Utilities__WEBPACK_IMPORTED_MODULE_2__["divProperties"]);
        var bumperProps = {
            style: {
                pointerEvents: 'none',
                position: 'fixed' // 'fixed' prevents browsers from scrolling to bumpers when viewport does not contain them
            },
            tabIndex: disabled ? -1 : 0,
            'data-is-visible': true
        };
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, divProps, { className: className, ref: this._root, "aria-labelledby": ariaLabelledBy, onFocusCapture: this._onFocusCapture, onFocus: this._onRootFocus, onBlur: this._onRootBlur }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, bumperProps, { ref: this._firstBumper, onFocus: this._onFirstBumperFocus })),
            this.props.children,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, bumperProps, { ref: this._lastBumper, onFocus: this._onLastBumperFocus }))));
    };
    FocusTrapZone.prototype.focus = function () {
        var _a = this.props, focusPreviouslyFocusedInnerElement = _a.focusPreviouslyFocusedInnerElement, firstFocusableSelector = _a.firstFocusableSelector;
        if (focusPreviouslyFocusedInnerElement &&
            this._previouslyFocusedElementInTrapZone &&
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["elementContains"])(this._root.current, this._previouslyFocusedElementInTrapZone)) {
            // focus on the last item that had focus in the zone before we left the zone
            this._focusAsync(this._previouslyFocusedElementInTrapZone);
            return;
        }
        var focusSelector = typeof firstFocusableSelector === 'string' ? firstFocusableSelector : firstFocusableSelector && firstFocusableSelector();
        var _firstFocusableChild = null;
        if (this._root.current) {
            if (focusSelector) {
                _firstFocusableChild = this._root.current.querySelector('.' + focusSelector);
            }
            // Fall back to first element if query selector did not match any elements.
            if (!_firstFocusableChild) {
                _firstFocusableChild = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getNextElement"])(this._root.current, this._root.current.firstChild, false, false, false, true);
            }
        }
        if (_firstFocusableChild) {
            this._focusAsync(_firstFocusableChild);
        }
    };
    FocusTrapZone.prototype._focusAsync = function (element) {
        if (!this._isBumper(element)) {
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["focusAsync"])(element);
        }
    };
    FocusTrapZone.prototype._bringFocusIntoZone = function () {
        var _a = this.props, elementToFocusOnDismiss = _a.elementToFocusOnDismiss, _b = _a.disabled, disabled = _b === void 0 ? false : _b, _c = _a.disableFirstFocus, disableFirstFocus = _c === void 0 ? false : _c;
        if (disabled) {
            return;
        }
        FocusTrapZone._focusStack.push(this);
        this._previouslyFocusedElementOutsideTrapZone = elementToFocusOnDismiss
            ? elementToFocusOnDismiss
            : this._getDocument().activeElement;
        if (!disableFirstFocus && !Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["elementContains"])(this._root.current, this._previouslyFocusedElementOutsideTrapZone)) {
            this.focus();
        }
    };
    FocusTrapZone.prototype._returnFocusToInitiator = function () {
        var _this = this;
        var ignoreExternalFocusing = this.props.ignoreExternalFocusing;
        FocusTrapZone._focusStack = FocusTrapZone._focusStack.filter(function (value) {
            return _this !== value;
        });
        var doc = this._getDocument();
        var activeElement = doc.activeElement;
        if (!ignoreExternalFocusing &&
            this._previouslyFocusedElementOutsideTrapZone &&
            typeof this._previouslyFocusedElementOutsideTrapZone.focus === 'function' &&
            (Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["elementContains"])(this._root.current, activeElement) || activeElement === doc.body)) {
            this._focusAsync(this._previouslyFocusedElementOutsideTrapZone);
        }
    };
    FocusTrapZone.prototype._updateEventHandlers = function (newProps) {
        var _a = newProps.isClickableOutsideFocusTrap, isClickableOutsideFocusTrap = _a === void 0 ? false : _a, _b = newProps.forceFocusInsideTrap, forceFocusInsideTrap = _b === void 0 ? true : _b;
        if (forceFocusInsideTrap && !this._disposeFocusHandler) {
            this._disposeFocusHandler = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["on"])(window, 'focus', this._forceFocusInTrap, true);
        }
        else if (!forceFocusInsideTrap && this._disposeFocusHandler) {
            this._disposeFocusHandler();
            this._disposeFocusHandler = undefined;
        }
        if (!isClickableOutsideFocusTrap && !this._disposeClickHandler) {
            this._disposeClickHandler = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["on"])(window, 'click', this._forceClickInTrap, true);
        }
        else if (isClickableOutsideFocusTrap && this._disposeClickHandler) {
            this._disposeClickHandler();
            this._disposeClickHandler = undefined;
        }
    };
    FocusTrapZone.prototype._isBumper = function (element) {
        return element === this._firstBumper.current || element === this._lastBumper.current;
    };
    FocusTrapZone.prototype._getDocument = function () {
        return Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getDocument"])(this._root.current);
    };
    FocusTrapZone._focusStack = [];
    return FocusTrapZone;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=FocusTrapZone.js.map

/***/ }),

/***/ "NqHO":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Persona/Persona.js ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: Persona */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Persona", function() { return Persona; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _Persona_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Persona.base */ "L+CY");
/* harmony import */ var _Persona_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Persona.styles */ "1fyS");



/**
 * Personas are used for rendering an individual's avatar, presence and details.
 * They are used within the PeoplePicker components.
 */
var Persona = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Persona_base__WEBPACK_IMPORTED_MODULE_1__["PersonaBase"], _Persona_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'Persona'
});
//# sourceMappingURL=Persona.js.map

/***/ }),

/***/ "O3if":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Tooltip/index.js ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: Tooltip, TooltipBase, TooltipDelay, TooltipHost, TooltipHostBase, TooltipOverflowMode, DirectionalHint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tooltip */ "1WKE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return _Tooltip__WEBPACK_IMPORTED_MODULE_0__["Tooltip"]; });

/* harmony import */ var _Tooltip_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tooltip.base */ "7NGt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipBase", function() { return _Tooltip_base__WEBPACK_IMPORTED_MODULE_1__["TooltipBase"]; });

/* harmony import */ var _Tooltip_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tooltip.types */ "ARrK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipDelay", function() { return _Tooltip_types__WEBPACK_IMPORTED_MODULE_2__["TooltipDelay"]; });

/* harmony import */ var _TooltipHost__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TooltipHost */ "Fyzl");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipHost", function() { return _TooltipHost__WEBPACK_IMPORTED_MODULE_3__["TooltipHost"]; });

/* harmony import */ var _TooltipHost_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TooltipHost.base */ "1jN7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipHostBase", function() { return _TooltipHost_base__WEBPACK_IMPORTED_MODULE_4__["TooltipHostBase"]; });

/* harmony import */ var _TooltipHost_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TooltipHost.types */ "JS1Y");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipOverflowMode", function() { return _TooltipHost_types__WEBPACK_IMPORTED_MODULE_5__["TooltipOverflowMode"]; });

/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/DirectionalHint */ "RPJY");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirectionalHint", function() { return _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_6__["DirectionalHint"]; });








//# sourceMappingURL=index.js.map

/***/ }),

/***/ "Q+6t":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Fabric/Fabric.styles.js ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "xS3b");

var inheritFont = { fontFamily: 'inherit' };
var GlobalClassNames = {
    root: 'ms-Fabric'
};
var getStyles = function (props) {
    var theme = props.theme, className = props.className, isFocusVisible = props.isFocusVisible;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        root: [
            classNames.root,
            isFocusVisible && 'is-focusVisible ms-Fabric--isFocusVisible',
            theme.fonts.medium,
            {
                color: theme.palette.neutralPrimary,
                selectors: {
                    '& button': inheritFont,
                    '& input': inheritFont,
                    '& textarea': inheritFont
                }
            },
            className
        ]
    };
};
//# sourceMappingURL=Fabric.styles.js.map

/***/ }),

/***/ "QHob":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/Toggle.styles.js ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: ToggleStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToggleStyles", function() { return ToggleStyles; });
/* harmony import */ var office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! office-ui-fabric-react/lib/Styling */ "xS3b");

var ToggleStyles = function (props) {
    var disabled = props.disabled, checked = props.checked, theme = props.theme;
    var palette = theme.palette;
    return {
        pill: [
            {
                width: '2.2em',
                height: '1em',
                borderRadius: '1em',
                padding: '0 .2em'
            },
            !disabled && [
                checked && {
                    selectors: {
                        ':hover': [
                            {
                                backgroundColor: palette.themeDarkAlt
                            }
                        ]
                    }
                }
            ]
        ],
        thumb: [
            {
                width: '.5em',
                height: '.5em',
                borderRadius: '.5em'
            },
            !disabled &&
                !checked && {
                backgroundColor: palette.neutralDark
            }
        ],
        text: {
            selectors: {
                '&.ms-Toggle-stateText': {
                    fontWeight: office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].regular
                }
            }
        }
    };
};
//# sourceMappingURL=Toggle.styles.js.map

/***/ }),

/***/ "QeMu":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/ComboBox.styles.js ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: ComboBoxStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComboBoxStyles", function() { return ComboBoxStyles; });
var ComboBoxStyles = {
    root: {
        paddingLeft: 12
    },
    header: {
        padding: '0 16px',
        height: 32,
        lineHeight: 32
    },
    optionsContainer: {
        selectors: {
            '.ms-ComboBox-option': {
                padding: '5px 16px',
                minHeight: 32
            },
            '.ms-ComboBox-optionText': {
                margin: 1
            },
            '.ms-Button-flexContainer > span': {
                display: 'block'
            }
        }
    }
};
//# sourceMappingURL=ComboBox.styles.js.map

/***/ }),

/***/ "RPJY":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/common/DirectionalHint.js ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: DirectionalHint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectionalHint", function() { return DirectionalHint; });
var DirectionalHint = {
    /**
     * Appear above the target element, with the left edges of the callout and target aligning.
     */
    topLeftEdge: 0,
    /**
     * Appear above the target element, with the centers of the callout and target aligning.
     */
    topCenter: 1,
    /**
     * Appear above the target element, with the right edges of the callout and target aligning.
     */
    topRightEdge: 2,
    /**
     * Appear above the target element, aligning with the target element such that the callout tends toward the center of the screen.
     */
    topAutoEdge: 3,
    /**
     * Appear below the target element, with the left edges of the callout and target aligning.
     */
    bottomLeftEdge: 4,
    /**
     * Appear below the target element, with the centers of the callout and target aligning.
     */
    bottomCenter: 5,
    /**
     * Appear below the target element, with the right edges of the callout and target aligning.
     */
    bottomRightEdge: 6,
    /**
     * Appear below the target element, aligning with the target element such that the callout tends toward the center of the screen.
     */
    bottomAutoEdge: 7,
    /**
     * Appear to the left of the target element, with the top edges of the callout and target aligning.
     */
    leftTopEdge: 8,
    /**
     * Appear to the left of the target element, with the centers of the callout and target aligning.
     */
    leftCenter: 9,
    /**
     * Appear to the left of the target element, with the bottom edges of the callout and target aligning.
     */
    leftBottomEdge: 10,
    /**
     * Appear to the right of the target element, with the top edges of the callout and target aligning.
     */
    rightTopEdge: 11,
    /**
     * Appear to the right of the target element, with the centers of the callout and target aligning.
     */
    rightCenter: 12,
    /**
     * Appear to the right of the target element, with the bottom edges of the callout and target aligning.
     */
    rightBottomEdge: 13
};
//# sourceMappingURL=DirectionalHint.js.map

/***/ }),

/***/ "RweB":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/Popup.js ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: Popup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Popup_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Popup/index */ "pdBb");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Popup", function() { return _components_Popup_index__WEBPACK_IMPORTED_MODULE_0__["Popup"]; });


//# sourceMappingURL=Popup.js.map

/***/ }),

/***/ "TSxk":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Persona/Persona.types.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: PersonaSize, PersonaPresence, PersonaInitialsColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonaSize", function() { return PersonaSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonaPresence", function() { return PersonaPresence; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonaInitialsColor", function() { return PersonaInitialsColor; });
/**
 * {@docCategory Persona}
 */
var PersonaSize;
(function (PersonaSize) {
    /**
     * `tiny` size has been deprecated in favor of standardized numeric sizing. Use `size8` instead.
     * @deprecated Use `size8` instead.
     */
    PersonaSize[PersonaSize["tiny"] = 0] = "tiny";
    /**
     *
     * `extraExtraSmall` size has been deprecated in favor of standardized numeric sizing. Use `size24` instead.
     * @deprecated Use `size24` instead.
     */
    PersonaSize[PersonaSize["extraExtraSmall"] = 1] = "extraExtraSmall";
    /**
     * `extraSmall` size has been deprecated in favor of standardized numeric sizing. Use `size32` instead.
     * @deprecated Use `size32` instead.
     */
    PersonaSize[PersonaSize["extraSmall"] = 2] = "extraSmall";
    /**
     * `small` size has been deprecated in favor of standardized numeric sizing. Use `size40` instead.
     * @deprecated Use `size40` instead.
     */
    PersonaSize[PersonaSize["small"] = 3] = "small";
    /**
     * `regular` size has been deprecated in favor of standardized numeric sizing. Use `size48` instead.
     * @deprecated Use `size48` instead.
     */
    PersonaSize[PersonaSize["regular"] = 4] = "regular";
    /**
     * `large` size has been deprecated in favor of standardized numeric sizing. Use `size72` instead.
     * @deprecated Use `size72` instead.
     */
    PersonaSize[PersonaSize["large"] = 5] = "large";
    /**
     * `extraLarge` size has been deprecated in favor of standardized numeric sizing. Use `size100` instead.
     * @deprecated Use `size100` instead.
     */
    PersonaSize[PersonaSize["extraLarge"] = 6] = "extraLarge";
    /**
     * No `PersonaCoin` is rendered.
     */
    PersonaSize[PersonaSize["size8"] = 17] = "size8";
    /**
     * No `PersonaCoin` is rendered. Deprecated in favor of `size8` to align with design specifications.
     * @deprecated Use `size8` instead. Will be removed in a future major release.
     */
    PersonaSize[PersonaSize["size10"] = 9] = "size10";
    /**
     * Renders a 16px `PersonaCoin`. Deprecated due to not being in the design specification.
     * @deprecated Will be removed in a future major release.
     */
    PersonaSize[PersonaSize["size16"] = 8] = "size16";
    /**
     * Renders a 24px `PersonaCoin`.
     */
    PersonaSize[PersonaSize["size24"] = 10] = "size24";
    /**
     * Renders a 28px `PersonaCoin`. Deprecated due to not being in the design specification.
     * @deprecated Will be removed in a future major release.
     */
    PersonaSize[PersonaSize["size28"] = 7] = "size28";
    /**
     * Renders a 32px `PersonaCoin`.
     */
    PersonaSize[PersonaSize["size32"] = 11] = "size32";
    /**
     * Renders a 40px `PersonaCoin`.
     */
    PersonaSize[PersonaSize["size40"] = 12] = "size40";
    /**
     * Renders a 48px `PersonaCoin`.
     */
    PersonaSize[PersonaSize["size48"] = 13] = "size48";
    /**
     * Renders a 56px `PersonaCoin`.
     */
    PersonaSize[PersonaSize["size56"] = 16] = "size56";
    /**
     * Renders a 72px `PersonaCoin`.
     */
    PersonaSize[PersonaSize["size72"] = 14] = "size72";
    /**
     * Renders a 100px `PersonaCoin`.
     */
    PersonaSize[PersonaSize["size100"] = 15] = "size100";
    /**
     * Renders a 120px `PersonaCoin`.
     */
    PersonaSize[PersonaSize["size120"] = 18] = "size120";
})(PersonaSize || (PersonaSize = {}));
/**
 * {@docCategory Persona}
 */
var PersonaPresence;
(function (PersonaPresence) {
    PersonaPresence[PersonaPresence["none"] = 0] = "none";
    PersonaPresence[PersonaPresence["offline"] = 1] = "offline";
    PersonaPresence[PersonaPresence["online"] = 2] = "online";
    PersonaPresence[PersonaPresence["away"] = 3] = "away";
    PersonaPresence[PersonaPresence["dnd"] = 4] = "dnd";
    PersonaPresence[PersonaPresence["blocked"] = 5] = "blocked";
    PersonaPresence[PersonaPresence["busy"] = 6] = "busy";
})(PersonaPresence || (PersonaPresence = {}));
/**
 * {@docCategory Persona}
 */
var PersonaInitialsColor;
(function (PersonaInitialsColor) {
    PersonaInitialsColor[PersonaInitialsColor["lightBlue"] = 0] = "lightBlue";
    PersonaInitialsColor[PersonaInitialsColor["blue"] = 1] = "blue";
    PersonaInitialsColor[PersonaInitialsColor["darkBlue"] = 2] = "darkBlue";
    PersonaInitialsColor[PersonaInitialsColor["teal"] = 3] = "teal";
    PersonaInitialsColor[PersonaInitialsColor["lightGreen"] = 4] = "lightGreen";
    PersonaInitialsColor[PersonaInitialsColor["green"] = 5] = "green";
    PersonaInitialsColor[PersonaInitialsColor["darkGreen"] = 6] = "darkGreen";
    PersonaInitialsColor[PersonaInitialsColor["lightPink"] = 7] = "lightPink";
    PersonaInitialsColor[PersonaInitialsColor["pink"] = 8] = "pink";
    PersonaInitialsColor[PersonaInitialsColor["magenta"] = 9] = "magenta";
    PersonaInitialsColor[PersonaInitialsColor["purple"] = 10] = "purple";
    /**
     * `black` is a color that can result in offensive persona coins with some initials combinations, so it can only be set with overrides.
     * @deprecated will be removed in a future major release.
     */
    PersonaInitialsColor[PersonaInitialsColor["black"] = 11] = "black";
    PersonaInitialsColor[PersonaInitialsColor["orange"] = 12] = "orange";
    /**
     * `red` is a color that often has a special meaning, so it is considered a reserved color and can only be set with overrides
     * @deprecated will be removed in a future major release.
     */
    PersonaInitialsColor[PersonaInitialsColor["red"] = 13] = "red";
    PersonaInitialsColor[PersonaInitialsColor["darkRed"] = 14] = "darkRed";
    /**
     * Transparent is not intended to be used with typical initials due to accessibility issues.
     * Its primary use is for overflow buttons, so it is considered a reserved color and can only be set with overrides.
     */
    PersonaInitialsColor[PersonaInitialsColor["transparent"] = 15] = "transparent";
    PersonaInitialsColor[PersonaInitialsColor["violet"] = 16] = "violet";
    PersonaInitialsColor[PersonaInitialsColor["lightRed"] = 17] = "lightRed";
    PersonaInitialsColor[PersonaInitialsColor["gold"] = 18] = "gold";
    PersonaInitialsColor[PersonaInitialsColor["burgundy"] = 19] = "burgundy";
    PersonaInitialsColor[PersonaInitialsColor["warmGray"] = 20] = "warmGray";
    PersonaInitialsColor[PersonaInitialsColor["coolGray"] = 21] = "coolGray";
    /**
     * `gray` is a color that can result in offensive persona coins with some initials combinations, so it can only be set with overrides
     */
    PersonaInitialsColor[PersonaInitialsColor["gray"] = 22] = "gray";
    PersonaInitialsColor[PersonaInitialsColor["cyan"] = 23] = "cyan";
    PersonaInitialsColor[PersonaInitialsColor["rust"] = 24] = "rust";
})(PersonaInitialsColor || (PersonaInitialsColor = {}));
//# sourceMappingURL=Persona.types.js.map

/***/ }),

/***/ "X3iD":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/Checkbox.styles.js ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: CheckboxStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxStyles", function() { return CheckboxStyles; });
var CheckboxStyles = function (props) {
    var disabled = props.disabled, checked = props.checked, theme = props.theme;
    var semanticColors = theme.semanticColors, palette = theme.palette;
    return {
        checkbox: [
            !disabled &&
                !checked && {
                borderColor: semanticColors.smallInputBorder
            }
        ],
        checkmark: {
            color: semanticColors.inputForegroundChecked // using semanticColor to override original behavior on checked/disabled
        },
        root: [
            !disabled && [
                !checked && {
                    selectors: {
                        ':hover .ms-Checkbox-text': { color: palette.neutralPrimary },
                        ':hover .ms-Checkbox-checkmark': { color: palette.neutralSecondary }
                    }
                },
                checked && {
                    selectors: {
                        ':hover .ms-Checkbox-checkbox': {
                            background: palette.themeDarkAlt,
                            borderColor: palette.themeDarkAlt
                        },
                        ':focus .ms-Checkbox-checkbox': {
                            background: palette.themeDarkAlt,
                            borderColor: palette.themeDarkAlt
                        }
                    }
                }
            ]
        ]
    };
};
//# sourceMappingURL=Checkbox.styles.js.map

/***/ }),

/***/ "Y5SC":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/CompoundButton.styles.js ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: CompoundButtonStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompoundButtonStyles", function() { return CompoundButtonStyles; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/Styling */ "xS3b");


var CompoundButtonStyles = function (props) {
    var theme = props.theme;
    if (!theme) {
        throw new Error('Theme is undefined or null.');
    }
    var palette = theme.palette;
    return {
        root: {
            backgroundColor: palette.neutralLighter,
            border: '1px solid transparent',
            padding: '20px',
            // Primary styles require targeting a selector for now.
            // @todo: These selectors override the focus style above. Need to fix this.
            selectors: {
                '&.ms-Button--compoundPrimary': tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ backgroundColor: palette.themePrimary, borderColor: palette.themePrimary }, Object(office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__["getFocusStyle"])(theme, { inset: -1, borderColor: palette.white })),
                '&.ms-Button--compound': tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, Object(office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__["getFocusStyle"])(theme, { inset: -1, borderColor: palette.white }))
            }
        },
        rootHovered: {
            backgroundColor: palette.neutralLight,
            // Primary styles require targeting a selector for now.
            selectors: {
                '&.ms-Button--compoundPrimary:hover': {
                    backgroundColor: palette.themeDarkAlt,
                    borderColor: palette.themeDarkAlt
                }
            }
        },
        rootPressed: {
            backgroundColor: palette.neutralTertiaryAlt,
            // Primary styles require targeting a selector for now.
            selectors: {
                '&.ms-Button--compoundPrimary:active': {
                    backgroundColor: palette.themeDark,
                    borderColor: palette.themeDark
                }
            }
        },
        rootChecked: {
            backgroundColor: palette.neutralTertiaryAlt,
            // Primary styles require targeting a selector for now.
            selectors: {
                '&.ms-Button--compoundPrimary': {
                    backgroundColor: palette.themeDark,
                    borderColor: palette.themeDark
                }
            }
        },
        rootDisabled: {
            borderColor: palette.neutralLighter,
            // Primary styles require targeting a selector for now.
            selectors: {
                '&.ms-Button--compoundPrimary': {
                    backgroundColor: palette.neutralLighter,
                    borderColor: palette.neutralLighter
                }
            }
        }
    };
};
//# sourceMappingURL=CompoundButton.styles.js.map

/***/ }),

/***/ "cZZL":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Persona/PersonaPresence/PersonaPresence.styles.js ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Styling */ "xS3b");
/* harmony import */ var _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PersonaConsts */ "ztYb");


var GlobalClassNames = {
    presence: 'ms-Persona-presence',
    presenceIcon: 'ms-Persona-presenceIcon'
};
var getStyles = function (props) {
    var _a, _b, _c, _d, _e, _f;
    var theme = props.theme;
    var semanticColors = theme.semanticColors, fonts = theme.fonts;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    var size = Object(_PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["sizeBoolean"])(props.size);
    var presence = Object(_PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["presenceBoolean"])(props.presence);
    // Presence colors
    var presenceColorAvailable = '#6BB700';
    var presenceColorAway = '#FFAA44';
    var presenceColorBusy = '#C43148';
    var presenceColorDnd = '#C50F1F';
    var presenceColorOffline = '#8A8886';
    var presenceColorOof = '#B4009E';
    var isOpenCirclePresence = presence.isOffline || (props.isOutOfOffice && (presence.isAvailable || presence.isBusy || presence.isAway || presence.isDoNotDisturb));
    var borderSizeForSmallPersonas = '1px';
    var borderSizeForLargePersonas = '2px';
    var borderSize = size.isSize72 || size.isSize100 ? borderSizeForLargePersonas : borderSizeForSmallPersonas;
    return {
        presence: [
            classNames.presence,
            {
                position: 'absolute',
                height: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaPresenceSize"].size12,
                width: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaPresenceSize"].size12,
                borderRadius: '50%',
                top: 'auto',
                right: '-2px',
                bottom: '-2px',
                border: "2px solid " + semanticColors.bodyBackground,
                textAlign: 'center',
                boxSizing: 'content-box',
                backgroundClip: 'content-box',
                MsHighContrastAdjust: 'none',
                selectors: (_a = {},
                    _a[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                        borderColor: 'Window',
                        backgroundColor: 'WindowText'
                    },
                    _a)
            },
            (size.isSize8 || size.isSize10) && {
                right: 'auto',
                top: '7px',
                left: 0,
                border: 0,
                selectors: (_b = {},
                    _b[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                        top: '9px',
                        border: '1px solid WindowText'
                    },
                    _b)
            },
            (size.isSize8 || size.isSize10 || size.isSize24 || size.isSize28 || size.isSize32) && makeSizeStyle(_PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaPresenceSize"].size8),
            (size.isSize40 || size.isSize48) && makeSizeStyle(_PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaPresenceSize"].size12),
            size.isSize16 && {
                height: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaPresenceSize"].size6,
                width: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaPresenceSize"].size6,
                borderWidth: '1.5px'
            },
            size.isSize56 && makeSizeStyle(_PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaPresenceSize"].size16),
            size.isSize72 && makeSizeStyle(_PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaPresenceSize"].size20),
            size.isSize100 && makeSizeStyle(_PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaPresenceSize"].size28),
            size.isSize120 && makeSizeStyle(_PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaPresenceSize"].size32),
            presence.isAvailable && {
                backgroundColor: presenceColorAvailable,
                selectors: (_c = {},
                    _c[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = backgroundColor('Highlight'),
                    _c)
            },
            presence.isAway && backgroundColor(presenceColorAway),
            presence.isBlocked && [
                {
                    selectors: (_d = {
                            // Only show :after at larger sizes
                            ':after': size.isSize40 || size.isSize48 || size.isSize72 || size.isSize100
                                ? {
                                    content: '""',
                                    width: '100%',
                                    height: borderSize,
                                    backgroundColor: presenceColorBusy,
                                    transform: 'translateY(-50%) rotate(-45deg)',
                                    position: 'absolute',
                                    top: '50%',
                                    left: 0
                                }
                                : undefined
                        },
                        _d[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                            selectors: {
                                ':after': {
                                    width: "calc(100% - 4px)",
                                    left: '2px',
                                    backgroundColor: 'Window'
                                }
                            }
                        },
                        _d)
                }
            ],
            presence.isBusy && backgroundColor(presenceColorBusy),
            presence.isDoNotDisturb && backgroundColor(presenceColorDnd),
            presence.isOffline && backgroundColor(presenceColorOffline),
            (isOpenCirclePresence || presence.isBlocked) && [
                {
                    backgroundColor: semanticColors.bodyBackground,
                    selectors: (_e = {
                            ':before': {
                                content: '""',
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                border: borderSize + " solid " + presenceColorBusy,
                                borderRadius: '50%',
                                boxSizing: 'border-box'
                            }
                        },
                        _e[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                            backgroundColor: 'WindowText',
                            selectors: {
                                ':before': {
                                    width: "calc(100% - 2px)",
                                    height: "calc(100% - 2px)",
                                    top: '1px',
                                    left: '1px',
                                    borderColor: 'Window'
                                }
                            }
                        },
                        _e)
                }
            ],
            isOpenCirclePresence && presence.isAvailable && makeBeforeBorderStyle(borderSize, presenceColorAvailable),
            isOpenCirclePresence && presence.isBusy && makeBeforeBorderStyle(borderSize, presenceColorBusy),
            isOpenCirclePresence && presence.isAway && makeBeforeBorderStyle(borderSize, presenceColorOof),
            isOpenCirclePresence && presence.isDoNotDisturb && makeBeforeBorderStyle(borderSize, presenceColorDnd),
            isOpenCirclePresence && presence.isOffline && makeBeforeBorderStyle(borderSize, presenceColorOffline),
            isOpenCirclePresence && presence.isOffline && props.isOutOfOffice && makeBeforeBorderStyle(borderSize, presenceColorOof)
        ],
        presenceIcon: [
            classNames.presenceIcon,
            {
                color: semanticColors.bodyBackground,
                fontSize: '6px',
                lineHeight: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaPresenceSize"].size12,
                verticalAlign: 'top',
                selectors: (_f = {},
                    _f[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                        color: 'Window'
                    },
                    _f)
            },
            size.isSize56 && {
                fontSize: '8px',
                lineHeight: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaPresenceSize"].size16
            },
            size.isSize72 && {
                fontSize: fonts.small.fontSize,
                lineHeight: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaPresenceSize"].size20
            },
            size.isSize100 && {
                fontSize: fonts.medium.fontSize,
                lineHeight: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaPresenceSize"].size28
            },
            size.isSize120 && {
                fontSize: fonts.medium.fontSize,
                lineHeight: _PersonaConsts__WEBPACK_IMPORTED_MODULE_1__["personaPresenceSize"].size32
            },
            presence.isAway && {
                position: 'relative',
                left: isOpenCirclePresence ? undefined : '1px'
            },
            isOpenCirclePresence && presence.isAvailable && makeOpenCircleIconStyle(presenceColorAvailable),
            isOpenCirclePresence && presence.isBusy && makeOpenCircleIconStyle(presenceColorBusy),
            isOpenCirclePresence && presence.isAway && makeOpenCircleIconStyle(presenceColorOof),
            isOpenCirclePresence && presence.isDoNotDisturb && makeOpenCircleIconStyle(presenceColorDnd),
            isOpenCirclePresence && presence.isOffline && makeOpenCircleIconStyle(presenceColorOffline),
            isOpenCirclePresence && presence.isOffline && props.isOutOfOffice && makeOpenCircleIconStyle(presenceColorOof)
        ]
    };
};
function makeOpenCircleIconStyle(color) {
    return {
        color: color,
        borderColor: color
    };
}
function makeBeforeBorderStyle(borderSize, color) {
    return {
        selectors: {
            ':before': {
                border: borderSize + " solid " + color
            }
        }
    };
}
function makeSizeStyle(size) {
    return {
        height: size,
        width: size
    };
}
function backgroundColor(color) {
    return { backgroundColor: color };
}
//# sourceMappingURL=PersonaPresence.styles.js.map

/***/ }),

/***/ "eW/a":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Tooltip/Tooltip.styles.js ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "xS3b");

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

/***/ "eebY":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Persona/PersonaInitialsColor.js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: initialsColorPropToColorCode, getPersonaInitialsColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialsColorPropToColorCode", function() { return initialsColorPropToColorCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPersonaInitialsColor", function() { return getPersonaInitialsColor; });
/* harmony import */ var _Persona_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Persona.types */ "TSxk");

/**
 * Following colors are considered reserved colors and can only be set with overrides, so they are excluded from this set:
 * - `gray` and `black` are colors that can result in offensive persona coins with some initials combinations,
 *   so it can only be set with overrides.
 * - `red` is a color that often has a special meaning, so it is considered a reserved color and can only be set with overrides.
 * - `transparent` is not intended to be used with typical initials due to accessibility issues,
 *   its primary use is for Facepile overflow buttons.
 */
var COLOR_SWATCHES_LOOKUP = [
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].lightBlue,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].blue,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].darkBlue,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].teal,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].green,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].darkGreen,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].lightPink,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].pink,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].magenta,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].purple,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].orange,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].lightRed,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].darkRed,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].violet,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].gold,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].burgundy,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].warmGray,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].cyan,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].rust,
    _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].coolGray
];
var COLOR_SWATCHES_NUM_ENTRIES = COLOR_SWATCHES_LOOKUP.length;
function getInitialsColorFromName(displayName) {
    var color = _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].blue;
    if (!displayName) {
        return color;
    }
    var hashCode = 0;
    for (var iLen = displayName.length - 1; iLen >= 0; iLen--) {
        var ch = displayName.charCodeAt(iLen);
        var shift = iLen % 8;
        // tslint:disable-next-line:no-bitwise
        hashCode ^= (ch << shift) + (ch >> (8 - shift));
    }
    color = COLOR_SWATCHES_LOOKUP[hashCode % COLOR_SWATCHES_NUM_ENTRIES];
    return color;
}
function personaInitialsColorToHexCode(personaInitialsColor) {
    switch (personaInitialsColor) {
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].lightBlue:
            return '#4F6BED';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].blue:
            return '#0078D4';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].darkBlue:
            return '#004E8C';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].teal:
            return '#038387';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].lightGreen:
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].green:
            return '#498205';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].darkGreen:
            return '#0B6A0B';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].lightPink:
            return '#C239B3';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].pink:
            return '#E3008C';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].magenta:
            return '#881798';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].purple:
            return '#5C2E91';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].orange:
            return '#CA5010';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].red:
            return '#EE1111';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].lightRed:
            return '#D13438';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].darkRed:
            return '#A4262C';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].transparent:
            return 'transparent';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].violet:
            return '#8764B8';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].gold:
            return '#986F0B';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].burgundy:
            return '#750B1C';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].warmGray:
            return '#7A7574';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].cyan:
            return '#005B70';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].rust:
            return '#8E562E';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].coolGray:
            return '#69797E';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].black:
            return '#1D1D1D';
        case _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"].gray:
            return '#393939';
    }
}
/** @deprecated Use `getPersonaInitialsColor` */
function initialsColorPropToColorCode(props) {
    return getPersonaInitialsColor(props);
}
/**
 * Gets the hex color string (prefixed with #) for the given persona props.
 * This is the logic used internally by the Persona control.
 * @param props - Current persona props
 * @returns Hex color string prefixed with #
 */
function getPersonaInitialsColor(props) {
    var primaryText = props.primaryText, text = props.text;
    var initialsColor = props.initialsColor;
    var initialsColorCode;
    if (typeof initialsColor === 'string') {
        initialsColorCode = initialsColor;
    }
    else {
        initialsColor = initialsColor !== undefined ? initialsColor : getInitialsColorFromName(text || primaryText);
        initialsColorCode = personaInitialsColorToHexCode(initialsColor);
    }
    return initialsColorCode;
}
//# sourceMappingURL=PersonaInitialsColor.js.map

/***/ }),

/***/ "esuy":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Image/Image.base.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: ImageBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageBase", function() { return ImageBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _Image_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Image.types */ "i/gR");




var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var KEY_PREFIX = 'fabricImage';
var ImageBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ImageBase, _super);
    function ImageBase(props) {
        var _this = _super.call(this, props) || this;
        // Make an initial assumption about the image layout until we can
        // check the rendered element. The value here only takes effect when
        // shouldStartVisible is true.
        _this._coverStyle = _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageCoverStyle"].portrait;
        _this._imageElement = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._frameElement = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._onImageLoaded = function (ev) {
            var _a = _this.props, src = _a.src, onLoad = _a.onLoad;
            if (onLoad) {
                onLoad(ev);
            }
            _this._computeCoverStyle(_this.props);
            if (src) {
                _this.setState({
                    loadState: _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageLoadState"].loaded
                });
            }
        };
        _this._onImageError = function (ev) {
            if (_this.props.onError) {
                _this.props.onError(ev);
            }
            _this.setState({
                loadState: _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageLoadState"].error
            });
        };
        _this.state = {
            loadState: _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageLoadState"].notLoaded
        };
        return _this;
    }
    // tslint:disable-next-line function-name
    ImageBase.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.src !== this.props.src) {
            this.setState({
                loadState: _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageLoadState"].notLoaded
            });
        }
        else if (this.state.loadState === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageLoadState"].loaded) {
            this._computeCoverStyle(nextProps);
        }
    };
    ImageBase.prototype.componentDidUpdate = function (prevProps, prevState) {
        this._checkImageLoaded();
        if (this.props.onLoadingStateChange && prevState.loadState !== this.state.loadState) {
            this.props.onLoadingStateChange(this.state.loadState);
        }
    };
    ImageBase.prototype.render = function () {
        var imageProps = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getNativeProps"])(this.props, _Utilities__WEBPACK_IMPORTED_MODULE_2__["imageProperties"], ['width', 'height']);
        var _a = this.props, src = _a.src, alt = _a.alt, width = _a.width, height = _a.height, shouldFadeIn = _a.shouldFadeIn, shouldStartVisible = _a.shouldStartVisible, className = _a.className, imageFit = _a.imageFit, role = _a.role, maximizeFrame = _a.maximizeFrame, styles = _a.styles, theme = _a.theme;
        var loadState = this.state.loadState;
        var coverStyle = this.props.coverStyle !== undefined ? this.props.coverStyle : this._coverStyle;
        var classNames = getClassNames(styles, {
            theme: theme,
            className: className,
            width: width,
            height: height,
            maximizeFrame: maximizeFrame,
            shouldFadeIn: shouldFadeIn,
            shouldStartVisible: shouldStartVisible,
            isLoaded: loadState === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageLoadState"].loaded || (loadState === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageLoadState"].notLoaded && this.props.shouldStartVisible),
            isLandscape: coverStyle === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageCoverStyle"].landscape,
            isCenter: imageFit === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageFit"].center,
            isCenterContain: imageFit === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageFit"].centerContain,
            isCenterCover: imageFit === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageFit"].centerCover,
            isContain: imageFit === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageFit"].contain,
            isCover: imageFit === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageFit"].cover,
            isNone: imageFit === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageFit"].none,
            isError: loadState === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageLoadState"].error,
            isNotImageFit: imageFit === undefined
        });
        // If image dimensions aren't specified, the natural size of the image is used.
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.root, style: { width: width, height: height }, ref: this._frameElement },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("img", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, imageProps, { onLoad: this._onImageLoaded, onError: this._onImageError, key: KEY_PREFIX + this.props.src || '', className: classNames.image, ref: this._imageElement, src: src, alt: alt, role: role }))));
    };
    ImageBase.prototype._checkImageLoaded = function () {
        var src = this.props.src;
        var loadState = this.state.loadState;
        if (loadState === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageLoadState"].notLoaded) {
            // testing if naturalWidth and naturalHeight are greater than zero is better than checking
            // .complete, because .complete will also be set to true if the image breaks. However,
            // for some browsers, SVG images do not have a naturalWidth or naturalHeight, so fall back
            // to checking .complete for these images.
            var isLoaded = this._imageElement.current
                ? (src && (this._imageElement.current.naturalWidth > 0 && this._imageElement.current.naturalHeight > 0)) ||
                    (this._imageElement.current.complete && ImageBase._svgRegex.test(src))
                : false;
            if (isLoaded) {
                this._computeCoverStyle(this.props);
                this.setState({
                    loadState: _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageLoadState"].loaded
                });
            }
        }
    };
    ImageBase.prototype._computeCoverStyle = function (props) {
        var imageFit = props.imageFit, width = props.width, height = props.height;
        // Do not compute cover style if it was already specified in props
        if ((imageFit === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageFit"].cover ||
            imageFit === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageFit"].contain ||
            imageFit === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageFit"].centerContain ||
            imageFit === _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageFit"].centerCover) &&
            this.props.coverStyle === undefined &&
            this._imageElement.current &&
            this._frameElement.current) {
            // Determine the desired ratio using the width and height props.
            // If those props aren't available, measure measure the frame.
            var desiredRatio = void 0;
            if (!!width && !!height && imageFit !== _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageFit"].centerContain && imageFit !== _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageFit"].centerCover) {
                desiredRatio = width / height;
            }
            else {
                desiredRatio = this._frameElement.current.clientWidth / this._frameElement.current.clientHeight;
            }
            // Examine the source image to determine its original ratio.
            var naturalRatio = this._imageElement.current.naturalWidth / this._imageElement.current.naturalHeight;
            // Should we crop from the top or the sides?
            if (naturalRatio > desiredRatio) {
                this._coverStyle = _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageCoverStyle"].landscape;
            }
            else {
                this._coverStyle = _Image_types__WEBPACK_IMPORTED_MODULE_3__["ImageCoverStyle"].portrait;
            }
        }
    };
    ImageBase.defaultProps = {
        shouldFadeIn: true
    };
    ImageBase._svgRegex = /\.svg$/i;
    return ImageBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=Image.base.js.map

/***/ }),

/***/ "f1JJ":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/Persona.js ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: getPersonaInitialsColor, Persona, PersonaBase, PersonaSize, PersonaPresence, PersonaInitialsColor, personaSize, personaPresenceSize, sizeBoolean, sizeToPixels, presenceBoolean, PersonaCoin, PersonaCoinBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Persona_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Persona/index */ "hf7D");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPersonaInitialsColor", function() { return _components_Persona_index__WEBPACK_IMPORTED_MODULE_0__["getPersonaInitialsColor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Persona", function() { return _components_Persona_index__WEBPACK_IMPORTED_MODULE_0__["Persona"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaBase", function() { return _components_Persona_index__WEBPACK_IMPORTED_MODULE_0__["PersonaBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaSize", function() { return _components_Persona_index__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaPresence", function() { return _components_Persona_index__WEBPACK_IMPORTED_MODULE_0__["PersonaPresence"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaInitialsColor", function() { return _components_Persona_index__WEBPACK_IMPORTED_MODULE_0__["PersonaInitialsColor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "personaSize", function() { return _components_Persona_index__WEBPACK_IMPORTED_MODULE_0__["personaSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "personaPresenceSize", function() { return _components_Persona_index__WEBPACK_IMPORTED_MODULE_0__["personaPresenceSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sizeBoolean", function() { return _components_Persona_index__WEBPACK_IMPORTED_MODULE_0__["sizeBoolean"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sizeToPixels", function() { return _components_Persona_index__WEBPACK_IMPORTED_MODULE_0__["sizeToPixels"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "presenceBoolean", function() { return _components_Persona_index__WEBPACK_IMPORTED_MODULE_0__["presenceBoolean"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaCoin", function() { return _components_Persona_index__WEBPACK_IMPORTED_MODULE_0__["PersonaCoin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaCoinBase", function() { return _components_Persona_index__WEBPACK_IMPORTED_MODULE_0__["PersonaCoinBase"]; });


//# sourceMappingURL=Persona.js.map

/***/ }),

/***/ "g15e":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/IconButton.styles.js ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: IconButtonStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconButtonStyles", function() { return IconButtonStyles; });
var IconButtonStyles = function (props) {
    var theme = props.theme;
    if (!theme) {
        throw new Error('Theme is undefined or null.');
    }
    var palette = theme.palette;
    return {
        root: {
            backgroundColor: 'transparent',
            color: palette.neutralPrimary
        },
        rootHovered: {
            backgroundColor: 'transparent',
            color: palette.neutralDark
        },
        rootPressed: {
            backgroundColor: 'transparent',
            color: palette.themePrimary
        },
        rootChecked: {
            backgroundColor: palette.neutralTertiaryAlt,
            color: palette.neutralPrimary
        },
        rootCheckedHovered: {
            backgroundColor: palette.neutralLight,
            color: palette.neutralPrimary
        },
        rootDisabled: {
            color: palette.neutralTertiary
        }
    };
};
//# sourceMappingURL=IconButton.styles.js.map

/***/ }),

/***/ "gJKu":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Layer/Layer.styles.js ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "xS3b");

var GlobalClassNames = {
    root: 'ms-Layer',
    rootNoHost: 'ms-Layer--fixed',
    content: 'ms-Layer-content'
};
var getStyles = function (props) {
    var className = props.className, isNotHost = props.isNotHost, theme = props.theme;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        root: [
            classNames.root,
            theme.fonts.medium,
            isNotHost && [
                classNames.rootNoHost,
                {
                    position: 'fixed',
                    zIndex: _Styling__WEBPACK_IMPORTED_MODULE_0__["ZIndexes"].Layer,
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    visibility: 'hidden'
                }
            ],
            className
        ],
        content: [
            classNames.content,
            {
                visibility: 'visible'
            }
        ]
    };
};
//# sourceMappingURL=Layer.styles.js.map

/***/ }),

/***/ "gVJM":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/Tooltip.js ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: Tooltip, TooltipBase, TooltipDelay, TooltipHost, TooltipHostBase, TooltipOverflowMode, DirectionalHint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Tooltip_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Tooltip/index */ "O3if");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return _components_Tooltip_index__WEBPACK_IMPORTED_MODULE_0__["Tooltip"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipBase", function() { return _components_Tooltip_index__WEBPACK_IMPORTED_MODULE_0__["TooltipBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipDelay", function() { return _components_Tooltip_index__WEBPACK_IMPORTED_MODULE_0__["TooltipDelay"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipHost", function() { return _components_Tooltip_index__WEBPACK_IMPORTED_MODULE_0__["TooltipHost"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipHostBase", function() { return _components_Tooltip_index__WEBPACK_IMPORTED_MODULE_0__["TooltipHostBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipOverflowMode", function() { return _components_Tooltip_index__WEBPACK_IMPORTED_MODULE_0__["TooltipOverflowMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirectionalHint", function() { return _components_Tooltip_index__WEBPACK_IMPORTED_MODULE_0__["DirectionalHint"]; });


//# sourceMappingURL=Tooltip.js.map

/***/ }),

/***/ "gnde":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Layer/index.js ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: Layer, LayerBase, LayerHost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layer */ "CcGg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return _Layer__WEBPACK_IMPORTED_MODULE_0__["Layer"]; });

/* harmony import */ var _Layer_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layer.base */ "9w4M");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayerBase", function() { return _Layer_base__WEBPACK_IMPORTED_MODULE_1__["LayerBase"]; });

/* harmony import */ var _LayerHost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LayerHost */ "/7gA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayerHost", function() { return _LayerHost__WEBPACK_IMPORTED_MODULE_2__["LayerHost"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "hf7D":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Persona/index.js ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: getPersonaInitialsColor, Persona, PersonaBase, PersonaSize, PersonaPresence, PersonaInitialsColor, personaSize, personaPresenceSize, sizeBoolean, sizeToPixels, presenceBoolean, PersonaCoin, PersonaCoinBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Persona__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Persona */ "NqHO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Persona", function() { return _Persona__WEBPACK_IMPORTED_MODULE_0__["Persona"]; });

/* harmony import */ var _Persona_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Persona.base */ "L+CY");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaBase", function() { return _Persona_base__WEBPACK_IMPORTED_MODULE_1__["PersonaBase"]; });

/* harmony import */ var _Persona_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Persona.types */ "TSxk");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaSize", function() { return _Persona_types__WEBPACK_IMPORTED_MODULE_2__["PersonaSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaPresence", function() { return _Persona_types__WEBPACK_IMPORTED_MODULE_2__["PersonaPresence"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaInitialsColor", function() { return _Persona_types__WEBPACK_IMPORTED_MODULE_2__["PersonaInitialsColor"]; });

/* harmony import */ var _PersonaCoin_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PersonaCoin/index */ "DUPL");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaCoin", function() { return _PersonaCoin_index__WEBPACK_IMPORTED_MODULE_3__["PersonaCoin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaCoinBase", function() { return _PersonaCoin_index__WEBPACK_IMPORTED_MODULE_3__["PersonaCoinBase"]; });

/* harmony import */ var _PersonaConsts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PersonaConsts */ "ztYb");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "personaSize", function() { return _PersonaConsts__WEBPACK_IMPORTED_MODULE_4__["personaSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "personaPresenceSize", function() { return _PersonaConsts__WEBPACK_IMPORTED_MODULE_4__["personaPresenceSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sizeBoolean", function() { return _PersonaConsts__WEBPACK_IMPORTED_MODULE_4__["sizeBoolean"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sizeToPixels", function() { return _PersonaConsts__WEBPACK_IMPORTED_MODULE_4__["sizeToPixels"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "presenceBoolean", function() { return _PersonaConsts__WEBPACK_IMPORTED_MODULE_4__["presenceBoolean"]; });

/* harmony import */ var _PersonaInitialsColor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PersonaInitialsColor */ "eebY");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPersonaInitialsColor", function() { return _PersonaInitialsColor__WEBPACK_IMPORTED_MODULE_5__["getPersonaInitialsColor"]; });






// Exporting in case someone would like to track the current color of a persona

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "hrrk":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/Callout.js ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: DirectionalHint, Callout, FocusTrapCallout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Callout_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Callout/index */ "8vwk");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirectionalHint", function() { return _components_Callout_index__WEBPACK_IMPORTED_MODULE_0__["DirectionalHint"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Callout", function() { return _components_Callout_index__WEBPACK_IMPORTED_MODULE_0__["Callout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FocusTrapCallout", function() { return _components_Callout_index__WEBPACK_IMPORTED_MODULE_0__["FocusTrapCallout"]; });


//# sourceMappingURL=Callout.js.map

/***/ }),

/***/ "i/gR":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Image/Image.types.js ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: ImageFit, ImageCoverStyle, ImageLoadState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageFit", function() { return ImageFit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageCoverStyle", function() { return ImageCoverStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageLoadState", function() { return ImageLoadState; });
/**
 * The possible methods that can be used to fit the image.
 * {@docCategory Image}
 */
var ImageFit;
(function (ImageFit) {
    /**
     * The image is not scaled. The image is centered and cropped within the content box.
     */
    ImageFit[ImageFit["center"] = 0] = "center";
    /**
     * The image is scaled to maintain its aspect ratio while being fully contained within the frame. The image will
     * be centered horizontally and vertically within the frame. The space in the top and bottom or in the sides of
     * the frame will be empty depending on the difference in aspect ratio between the image and the frame.
     */
    ImageFit[ImageFit["contain"] = 1] = "contain";
    /**
     * The image is scaled to maintain its aspect ratio while filling the frame. Portions of the image will be cropped from
     * the top and bottom, or from the sides, depending on the difference in aspect ratio between the image and the frame.
     */
    ImageFit[ImageFit["cover"] = 2] = "cover";
    /**
     * Neither the image nor the frame are scaled. If their sizes do not match, the image will either be cropped or the
     * frame will have empty space.
     */
    ImageFit[ImageFit["none"] = 3] = "none";
    /**
     * The image will be centered horizontally and vertically within the frame and maintains its aspect ratio. It will
     * behave as ImageFit.center if the image's natural height or width is less than the Image frame's height or width,
     * but if both natural height and width are larger than the frame it will behave as ImageFit.cover.
     */
    ImageFit[ImageFit["centerCover"] = 4] = "centerCover";
    /**
     * The image will be centered horizontally and vertically within the frame and maintains its aspect ratio. It will
     * behave as ImageFit.center if the image's natural height and width is less than the Image frame's height and width,
     * but if either natural height or width are larger than the frame it will behave as ImageFit.contain.
     */
    ImageFit[ImageFit["centerContain"] = 5] = "centerContain";
})(ImageFit || (ImageFit = {}));
/**
 * The cover style to be used on the image
 * {@docCategory Image}
 */
var ImageCoverStyle;
(function (ImageCoverStyle) {
    /**
     * The image will be shown at 100% height of container and the width will be scaled accordingly
     */
    ImageCoverStyle[ImageCoverStyle["landscape"] = 0] = "landscape";
    /**
     * The image will be shown at 100% width of container and the height will be scaled accordingly
     */
    ImageCoverStyle[ImageCoverStyle["portrait"] = 1] = "portrait";
})(ImageCoverStyle || (ImageCoverStyle = {}));
/**
 * {@docCategory Image}
 */
var ImageLoadState;
(function (ImageLoadState) {
    /**
     * The image has not yet been loaded, and there is no error yet.
     */
    ImageLoadState[ImageLoadState["notLoaded"] = 0] = "notLoaded";
    /**
     * The image has been loaded successfully.
     */
    ImageLoadState[ImageLoadState["loaded"] = 1] = "loaded";
    /**
     * An error has been encountered while loading the image.
     */
    ImageLoadState[ImageLoadState["error"] = 2] = "error";
    /**
     * Deprecated at v1.3.6, to replace the src in case of errors, use `onLoadingStateChange` instead
     * and rerender the Image with a difference src.
     * @deprecated Use `onLoadingStateChange` instead
     * and rerender the Image with a difference src.
     */
    ImageLoadState[ImageLoadState["errorLoaded"] = 3] = "errorLoaded";
})(ImageLoadState || (ImageLoadState = {}));
//# sourceMappingURL=Image.types.js.map

/***/ }),

/***/ "jFEC":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/Slider.styles.js ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: SliderStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderStyles", function() { return SliderStyles; });
var SliderStyles = function (props) {
    var disabled = props.disabled, theme = props.theme;
    var palette = theme.palette;
    return {
        activeSection: [
            disabled && {
                background: palette.neutralTertiaryAlt
            }
        ]
    };
};
//# sourceMappingURL=Slider.styles.js.map

/***/ }),

/***/ "jyzp":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Icon/Icon.styles.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: classNames, MS_ICON, getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classNames", function() { return classNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MS_ICON", function() { return MS_ICON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "xS3b");

/** Class names used in themeable and non-themeable Icon components */
var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["mergeStyleSets"])({
    root: {
        display: 'inline-block'
    },
    placeholder: [
        'ms-Icon-placeHolder',
        {
            width: '1em'
        }
    ],
    image: [
        'ms-Icon-imageContainer',
        {
            overflow: 'hidden'
        }
    ]
});
/** Class name used only in non-themeable Icon components */
var MS_ICON = 'ms-Icon';
var getStyles = function (props) {
    var className = props.className, iconClassName = props.iconClassName, isPlaceholder = props.isPlaceholder, isImage = props.isImage, styles = props.styles;
    return {
        root: [
            isPlaceholder && classNames.placeholder,
            classNames.root,
            isImage && classNames.image,
            iconClassName,
            className,
            styles && styles.root,
            styles && styles.imageContainer
        ]
    };
};
//# sourceMappingURL=Icon.styles.js.map

/***/ }),

/***/ "k+mK":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/Panel.styles.js ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: PanelStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelStyles", function() { return PanelStyles; });
var PanelStyles = function (props) {
    var theme = props.theme;
    var fonts = theme.fonts;
    return {
        main: {
            boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.2)'
        },
        headerText: [
            fonts.xLarge,
            {
                lineHeight: '27px'
            }
        ],
        footerInner: {
            paddingBottom: 20,
            paddingTop: 20
        }
    };
};
//# sourceMappingURL=Panel.styles.js.map

/***/ }),

/***/ "lY31":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Persona/PersonaPresence/PersonaPresence.js ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: PersonaPresence */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonaPresence", function() { return PersonaPresence; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Utilities */ "H+ST");
/* harmony import */ var _PersonaPresence_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PersonaPresence.base */ "vQWm");
/* harmony import */ var _PersonaPresence_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PersonaPresence.styles */ "cZZL");



/**
 * PersonaPresence is used to render an individual's presence.
 */
var PersonaPresence = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_PersonaPresence_base__WEBPACK_IMPORTED_MODULE_1__["PersonaPresenceBase"], _PersonaPresence_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, { scope: 'PersonaPresence' });
//# sourceMappingURL=PersonaPresence.js.map

/***/ }),

/***/ "mQmn":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Persona/PersonaCoin/PersonaCoin.js ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: PersonaCoin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonaCoin", function() { return PersonaCoin; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Utilities */ "H+ST");
/* harmony import */ var _PersonaCoin_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PersonaCoin.base */ "p1Ni");
/* harmony import */ var _PersonaCoin_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PersonaCoin.styles */ "4kf8");



/**
 * PersonaCoin is used to render an individual's avatar and presence.
 */
var PersonaCoin = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_PersonaCoin_base__WEBPACK_IMPORTED_MODULE_1__["PersonaCoinBase"], _PersonaCoin_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'PersonaCoin'
});
//# sourceMappingURL=PersonaCoin.js.map

/***/ }),

/***/ "n+XE":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Callout/FocusTrapCallout.js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: FocusTrapCallout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FocusTrapCallout", function() { return FocusTrapCallout; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Callout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Callout */ "EZt/");
/* harmony import */ var _FocusTrapZone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../FocusTrapZone */ "spS5");




/**
 * A special Callout that uses FocusTrapZone to trap focus
 * @param props - Props for the component
 */
var FocusTrapCallout = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Callout__WEBPACK_IMPORTED_MODULE_2__["Callout"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props),
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_FocusTrapZone__WEBPACK_IMPORTED_MODULE_3__["FocusTrapZone"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ disabled: props.hidden }, props.focusTrapProps), props.children)));
};
//# sourceMappingURL=FocusTrapCallout.js.map

/***/ }),

/***/ "nAHb":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Persona/PersonaPresence/index.js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: PersonaPresence, PersonaPresenceBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PersonaPresence__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PersonaPresence */ "lY31");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaPresence", function() { return _PersonaPresence__WEBPACK_IMPORTED_MODULE_0__["PersonaPresence"]; });

/* harmony import */ var _PersonaPresence_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PersonaPresence.base */ "vQWm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaPresenceBase", function() { return _PersonaPresence_base__WEBPACK_IMPORTED_MODULE_1__["PersonaPresenceBase"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "np+x":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Image/Image.styles.js ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "xS3b");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ "H+ST");


var GlobalClassNames = {
    root: 'ms-Image',
    rootMaximizeFrame: 'ms-Image--maximizeFrame',
    image: 'ms-Image-image',
    imageCenter: 'ms-Image-image--center',
    imageContain: 'ms-Image-image--contain',
    imageCover: 'ms-Image-image--cover',
    imageCenterContain: 'ms-Image-image--centerContain',
    imageCenterCover: 'ms-Image-image--centerCover',
    imageNone: 'ms-Image-image--none',
    imageLandscape: 'ms-Image-image--landscape',
    imagePortrait: 'ms-Image-image--portrait'
};
var getStyles = function (props) {
    var className = props.className, width = props.width, height = props.height, maximizeFrame = props.maximizeFrame, isLoaded = props.isLoaded, shouldFadeIn = props.shouldFadeIn, shouldStartVisible = props.shouldStartVisible, isLandscape = props.isLandscape, isCenter = props.isCenter, isContain = props.isContain, isCover = props.isCover, isCenterContain = props.isCenterContain, isCenterCover = props.isCenterCover, isNone = props.isNone, isError = props.isError, isNotImageFit = props.isNotImageFit, theme = props.theme;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    var ImageFitStyles = {
        position: 'absolute',
        left: '50% /* @noflip */',
        top: '50%',
        transform: 'translate(-50%,-50%)' // @todo test RTL renders transform: translate(50%,-50%);
    };
    // Cut the mustard using msMaxTouchPoints to detect IE11 which does not support CSS object-fit
    var window = Object(_Utilities__WEBPACK_IMPORTED_MODULE_1__["getWindow"])();
    var supportsObjectFit = window !== undefined && window.navigator.msMaxTouchPoints === undefined;
    var fallbackObjectFitStyles = (isContain && isLandscape) || (isCover && !isLandscape) ? { width: '100%', height: 'auto' } : { width: 'auto', height: '100%' };
    return {
        root: [
            classNames.root,
            theme.fonts.medium,
            {
                overflow: 'hidden'
            },
            maximizeFrame && [
                classNames.rootMaximizeFrame,
                {
                    height: '100%',
                    width: '100%'
                }
            ],
            isLoaded && shouldFadeIn && !shouldStartVisible && _Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationClassNames"].fadeIn400,
            (isCenter || isContain || isCover || isCenterContain || isCenterCover) && {
                position: 'relative'
            },
            className
        ],
        image: [
            classNames.image,
            {
                display: 'block',
                opacity: 0
            },
            isLoaded && [
                'is-loaded',
                {
                    opacity: 1
                }
            ],
            isCenter && [classNames.imageCenter, ImageFitStyles],
            isContain && [
                classNames.imageContain,
                supportsObjectFit && {
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                },
                !supportsObjectFit && fallbackObjectFitStyles,
                ImageFitStyles
            ],
            isCover && [
                classNames.imageCover,
                supportsObjectFit && {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                },
                !supportsObjectFit && fallbackObjectFitStyles,
                ImageFitStyles
            ],
            isCenterContain && [
                classNames.imageCenterContain,
                isLandscape && {
                    maxWidth: '100%'
                },
                !isLandscape && {
                    maxHeight: '100%'
                },
                ImageFitStyles
            ],
            isCenterCover && [
                classNames.imageCenterCover,
                isLandscape && {
                    maxHeight: '100%'
                },
                !isLandscape && {
                    maxWidth: '100%'
                },
                ImageFitStyles
            ],
            isNone && [
                classNames.imageNone,
                {
                    width: 'auto',
                    height: 'auto'
                }
            ],
            isNotImageFit && [
                !!width &&
                    !height && {
                    height: 'auto',
                    width: '100%'
                },
                !width &&
                    !!height && {
                    height: '100%',
                    width: 'auto'
                },
                !!width &&
                    !!height && {
                    height: '100%',
                    width: '100%'
                }
            ],
            isLandscape && classNames.imageLandscape,
            !isLandscape && classNames.imagePortrait,
            !isLoaded && 'is-notLoaded',
            shouldFadeIn && 'is-fadeIn',
            isError && 'is-error'
        ]
    };
};
//# sourceMappingURL=Image.styles.js.map

/***/ }),

/***/ "o4pL":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Icon/Icon.base.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: IconBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconBase", function() { return IconBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Icon_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon.types */ "CYSw");
/* harmony import */ var _Image_Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Image/Image */ "HLvE");
/* harmony import */ var _Image_Image_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Image/Image.types */ "i/gR");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _FontIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FontIcon */ "pAHr");







var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_5__["classNamesFunction"])({
    disableCaching: true
});
var IconBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](IconBase, _super);
    function IconBase(props) {
        var _this = _super.call(this, props) || this;
        _this.onImageLoadingStateChange = function (state) {
            if (_this.props.imageProps && _this.props.imageProps.onLoadingStateChange) {
                _this.props.imageProps.onLoadingStateChange(state);
            }
            if (state === _Image_Image_types__WEBPACK_IMPORTED_MODULE_4__["ImageLoadState"].error) {
                _this.setState({ imageLoadError: true });
            }
        };
        _this.state = {
            imageLoadError: false
        };
        return _this;
    }
    IconBase.prototype.render = function () {
        var _a = this.props, className = _a.className, styles = _a.styles, iconName = _a.iconName, imageErrorAs = _a.imageErrorAs, theme = _a.theme;
        var isPlaceholder = typeof iconName === 'string' && iconName.length === 0;
        var isImage = this.props.iconType === _Icon_types__WEBPACK_IMPORTED_MODULE_2__["IconType"].image || this.props.iconType === _Icon_types__WEBPACK_IMPORTED_MODULE_2__["IconType"].Image || !!this.props.imageProps;
        var _b = Object(_FontIcon__WEBPACK_IMPORTED_MODULE_6__["getIconContent"])(iconName), iconClassName = _b.iconClassName, children = _b.children;
        var classNames = getClassNames(styles, {
            theme: theme,
            className: className,
            iconClassName: iconClassName,
            isImage: isImage,
            isPlaceholder: isPlaceholder
        });
        var RootType = isImage ? 'div' : 'i';
        var nativeProps = Object(_Utilities__WEBPACK_IMPORTED_MODULE_5__["getNativeProps"])(this.props, _Utilities__WEBPACK_IMPORTED_MODULE_5__["htmlElementProperties"], ['aria-label']);
        var imageLoadError = this.state.imageLoadError;
        var imageProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props.imageProps, { onLoadingStateChange: this.onImageLoadingStateChange });
        var ImageType = (imageLoadError && imageErrorAs) || _Image_Image__WEBPACK_IMPORTED_MODULE_3__["Image"];
        var ariaLabel = this.props.ariaLabel || this.props['aria-label'];
        var containerProps = ariaLabel
            ? {
                'aria-label': ariaLabel
            }
            : {
                'aria-hidden': this.props['aria-labelledby'] || imageProps['aria-labelledby'] ? false : true
            };
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](RootType, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ "data-icon-name": iconName }, containerProps, nativeProps, { className: classNames.root }), isImage ? react__WEBPACK_IMPORTED_MODULE_1__["createElement"](ImageType, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, imageProps)) : children));
    };
    return IconBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=Icon.base.js.map

/***/ }),

/***/ "p1Ni":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Persona/PersonaCoin/PersonaCoin.base.js ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: PersonaCoinBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonaCoinBase", function() { return PersonaCoinBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Utilities */ "H+ST");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Styling */ "xS3b");
/* harmony import */ var _PersonaPresence_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../PersonaPresence/index */ "nAHb");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Icon */ "FEqW");
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Image */ "1942");
/* harmony import */ var _Persona_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Persona.types */ "TSxk");
/* harmony import */ var _PersonaInitialsColor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../PersonaInitialsColor */ "eebY");
/* harmony import */ var _PersonaConsts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../PersonaConsts */ "ztYb");










var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
/**
 * PersonaCoin with no default styles.
 * [Use the `getStyles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Styling)
 */
var PersonaCoinBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PersonaCoinBase, _super);
    function PersonaCoinBase(props) {
        var _this = _super.call(this, props) || this;
        _this._onRenderCoin = function (props) {
            var _a = _this.props, coinSize = _a.coinSize, styles = _a.styles, imageUrl = _a.imageUrl, imageAlt = _a.imageAlt, imageShouldFadeIn = _a.imageShouldFadeIn, imageShouldStartVisible = _a.imageShouldStartVisible, theme = _a.theme, showUnknownPersonaCoin = _a.showUnknownPersonaCoin;
            // Render the Image component only if an image URL is provided
            if (!imageUrl) {
                return null;
            }
            var size = _this.props.size;
            var classNames = getClassNames(styles, {
                theme: theme,
                size: size,
                showUnknownPersonaCoin: showUnknownPersonaCoin
            });
            var dimension = coinSize || _PersonaConsts__WEBPACK_IMPORTED_MODULE_9__["sizeToPixels"][size];
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Image__WEBPACK_IMPORTED_MODULE_6__["Image"], { className: classNames.image, imageFit: _Image__WEBPACK_IMPORTED_MODULE_6__["ImageFit"].cover, src: imageUrl, width: dimension, height: dimension, alt: imageAlt, shouldFadeIn: imageShouldFadeIn, shouldStartVisible: imageShouldStartVisible, onLoadingStateChange: _this._onPhotoLoadingStateChange }));
        };
        _this._onRenderInitials = function (props) {
            var imageInitials = props.imageInitials;
            var allowPhoneInitials = props.allowPhoneInitials, showUnknownPersonaCoin = props.showUnknownPersonaCoin;
            if (showUnknownPersonaCoin) {
                return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Icon__WEBPACK_IMPORTED_MODULE_5__["Icon"], { iconName: "Help" });
            }
            var isRTL = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getRTL"])();
            imageInitials = imageInitials || Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getInitials"])(_this._getText(), isRTL, allowPhoneInitials);
            return imageInitials !== '' ? react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", null, imageInitials) : react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Icon__WEBPACK_IMPORTED_MODULE_5__["Icon"], { iconName: "Contact" });
        };
        _this._onPhotoLoadingStateChange = function (loadState) {
            _this.setState({
                isImageLoaded: loadState === _Image__WEBPACK_IMPORTED_MODULE_6__["ImageLoadState"].loaded,
                isImageError: loadState === _Image__WEBPACK_IMPORTED_MODULE_6__["ImageLoadState"].error
            });
            _this.props.onPhotoLoadingStateChange && _this.props.onPhotoLoadingStateChange(loadState);
        };
        _this._warnDeprecations({ primaryText: 'text' });
        _this.state = {
            isImageLoaded: false,
            isImageError: false
        };
        return _this;
    }
    // tslint:disable-next-line function-name
    PersonaCoinBase.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.imageUrl !== this.props.imageUrl) {
            this.setState({
                isImageLoaded: false,
                isImageError: false
            });
        }
    };
    PersonaCoinBase.prototype.render = function () {
        var _a = this.props, className = _a.className, coinProps = _a.coinProps, showUnknownPersonaCoin = _a.showUnknownPersonaCoin, coinSize = _a.coinSize, styles = _a.styles, imageUrl = _a.imageUrl, isOutOfOffice = _a.isOutOfOffice, _b = _a.onRenderCoin, onRenderCoin = _b === void 0 ? this._onRenderCoin : _b, _c = _a.onRenderInitials, onRenderInitials = _c === void 0 ? this._onRenderInitials : _c, presence = _a.presence, presenceTitle = _a.presenceTitle, showInitialsUntilImageLoads = _a.showInitialsUntilImageLoads, theme = _a.theme;
        var size = this.props.size;
        var divProps = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getNativeProps"])(this.props, _Utilities__WEBPACK_IMPORTED_MODULE_2__["divProperties"]);
        var divCoinProps = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getNativeProps"])(coinProps || {}, _Utilities__WEBPACK_IMPORTED_MODULE_2__["divProperties"]);
        var coinSizeStyle = coinSize ? { width: coinSize, height: coinSize } : undefined;
        var hideImage = showUnknownPersonaCoin;
        var personaPresenceProps = {
            coinSize: coinSize,
            isOutOfOffice: isOutOfOffice,
            presence: presence,
            presenceTitle: presenceTitle,
            size: size,
            theme: theme
        };
        // Use getStyles from props, or fall back to getStyles from styles file.
        var classNames = getClassNames(styles, {
            theme: theme,
            className: coinProps && coinProps.className ? coinProps.className : className,
            size: size,
            coinSize: coinSize,
            showUnknownPersonaCoin: showUnknownPersonaCoin
        });
        var shouldRenderInitials = Boolean(!this.state.isImageLoaded && ((showInitialsUntilImageLoads && imageUrl) || !imageUrl || this.state.isImageError || hideImage));
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, divProps, { className: classNames.coin }),
            size !== _Persona_types__WEBPACK_IMPORTED_MODULE_7__["PersonaSize"].size8 && size !== _Persona_types__WEBPACK_IMPORTED_MODULE_7__["PersonaSize"].size10 && size !== _Persona_types__WEBPACK_IMPORTED_MODULE_7__["PersonaSize"].tiny ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, divCoinProps, { className: classNames.imageArea, style: coinSizeStyle }),
                shouldRenderInitials && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_Styling__WEBPACK_IMPORTED_MODULE_3__["mergeStyles"])(classNames.initials, !showUnknownPersonaCoin && { backgroundColor: Object(_PersonaInitialsColor__WEBPACK_IMPORTED_MODULE_8__["getPersonaInitialsColor"])(this.props) }), style: coinSizeStyle, "aria-hidden": "true" }, onRenderInitials(this.props, this._onRenderInitials))),
                !hideImage && onRenderCoin(this.props, this._onRenderCoin),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_PersonaPresence_index__WEBPACK_IMPORTED_MODULE_4__["PersonaPresence"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, personaPresenceProps)))) : // Otherwise, render just PersonaPresence.
                this.props.presence ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_PersonaPresence_index__WEBPACK_IMPORTED_MODULE_4__["PersonaPresence"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, personaPresenceProps))) : (
                // Just render Contact Icon if there isn't a Presence prop.
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Icon__WEBPACK_IMPORTED_MODULE_5__["Icon"], { iconName: "Contact", className: classNames.size10WithoutPresenceIcon })),
            this.props.children));
    };
    /**
     * Deprecation helper for getting text.
     */
    PersonaCoinBase.prototype._getText = function () {
        return this.props.text || this.props.primaryText || '';
    };
    PersonaCoinBase.defaultProps = {
        size: _Persona_types__WEBPACK_IMPORTED_MODULE_7__["PersonaSize"].size48,
        presence: _Persona_types__WEBPACK_IMPORTED_MODULE_7__["PersonaPresence"].none,
        imageAlt: ''
    };
    return PersonaCoinBase;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=PersonaCoin.base.js.map

/***/ }),

/***/ "pAHr":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Icon/FontIcon.js ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: getIconContent, FontIcon, getFontIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIconContent", function() { return getIconContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FontIcon", function() { return FontIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFontIcon", function() { return getFontIcon; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Icon_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon.styles */ "jyzp");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Styling */ "xS3b");





var getIconContent = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["memoizeFunction"])(function (iconName) {
    var iconDefinition = Object(_Styling__WEBPACK_IMPORTED_MODULE_4__["getIcon"])(iconName) || {
        subset: {
            className: undefined
        },
        code: undefined
    };
    return {
        children: iconDefinition.code,
        iconClassName: iconDefinition.subset.className
    };
});
/**
 * Fast icon component which only supports font glyphs (not images) and can't be targeted by customizations.
 * To style the icon, use `className` or reference `ms-Icon` in CSS.
 * {@docCategory Icon}
 */
var FontIcon = function (props) {
    var iconName = props.iconName, className = props.className;
    var _a = getIconContent(iconName), iconClassName = _a.iconClassName, children = _a.children;
    var nativeProps = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getNativeProps"])(props, _Utilities__WEBPACK_IMPORTED_MODULE_3__["htmlElementProperties"]);
    var containerProps = props['aria-label']
        ? {}
        : {
            role: 'presentation',
            'aria-hidden': true
        };
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("i", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ "data-icon-name": iconName }, containerProps, nativeProps, { className: Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["css"])(_Icon_styles__WEBPACK_IMPORTED_MODULE_2__["MS_ICON"], _Icon_styles__WEBPACK_IMPORTED_MODULE_2__["classNames"].root, iconClassName, !iconName && _Icon_styles__WEBPACK_IMPORTED_MODULE_2__["classNames"].placeholder, className) }), children));
};
/**
 * Memoized helper for rendering a FontIcon.
 * @param iconName - The name of the icon to use from the icon font.
 * @param className - Class name for styling the icon.
 * @param ariaLabel - Label for the icon for the benefit of screen readers.
 * {@docCategory Icon}
 */
var getFontIcon = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["memoizeFunction"])(function (iconName, className, ariaLabel) {
    return FontIcon({ iconName: iconName, className: className, 'aria-label': ariaLabel });
});
//# sourceMappingURL=FontIcon.js.map

/***/ }),

/***/ "pBtj":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/utilities/7.5.0_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/utilities/lib/index.js ***!
  \*********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @uifabric/utilities/index.js
var pkg = __webpack_require__(/*! @ms/uifabric-styling-bundle */ "fglE");
module.exports = pkg._Utilities;

/***/ }),

/***/ "pdBb":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Popup/index.js ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: Popup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup */ "BxsC");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Popup", function() { return _Popup__WEBPACK_IMPORTED_MODULE_0__["Popup"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "s3Hm":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Layer/Layer.notification.js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: registerLayer, unregisterLayer, notifyHostChanged, setDefaultTarget, getDefaultTarget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerLayer", function() { return registerLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unregisterLayer", function() { return unregisterLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notifyHostChanged", function() { return notifyHostChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefaultTarget", function() { return setDefaultTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultTarget", function() { return getDefaultTarget; });
var _layersByHostId = {};
var _defaultHostSelector;
/**
 * Register a layer for a given host id
 * @param hostId Id of the layer host
 * @param layer Layer instance
 */
function registerLayer(hostId, callback) {
    if (!_layersByHostId[hostId]) {
        _layersByHostId[hostId] = [];
    }
    _layersByHostId[hostId].push(callback);
}
/**
 * Unregister a layer for a given host id
 * @param hostId Id of the layer host
 * @param layer Layer instance
 */
function unregisterLayer(hostId, callback) {
    if (_layersByHostId[hostId]) {
        var idx = _layersByHostId[hostId].indexOf(callback);
        if (idx >= 0) {
            _layersByHostId[hostId].splice(idx, 1);
            if (_layersByHostId[hostId].length === 0) {
                delete _layersByHostId[hostId];
            }
        }
    }
}
/**
 * Used for notifying applicable Layers that a host is available/unavailable and to re-evaluate Layers that
 * care about the specific host.
 */
function notifyHostChanged(id) {
    if (_layersByHostId[id]) {
        _layersByHostId[id].forEach(function (callback) { return callback(); });
    }
}
/**
 * Sets the default target selector to use when determining the host in which
 * Layered content will be injected into. If not provided, an element will be
 * created at the end of the document body.
 *
 * Passing in a falsey value will clear the default target and reset back to
 * using a created element at the end of document body.
 */
function setDefaultTarget(selector) {
    _defaultHostSelector = selector;
}
/**
 * Get the default target selector when determining a host
 */
function getDefaultTarget() {
    return _defaultHostSelector;
}
//# sourceMappingURL=Layer.notification.js.map

/***/ }),

/***/ "sA9l":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@ms/odsp-datasources/39.3.0/node_modules/@ms/odsp-datasources/lib-esm/providers/theming/FabricDeferredCustomizations.js ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: CheckboxStyles, ChoiceGroupOptionStyles, ColorPickerStyles, ColorRectangleStyles, ColorSliderStyles, ComboBoxStyles, CompoundButtonStyles, DropdownStyles, ExpandingCardStyles, PlainCardStyles, IconButtonStyles, PanelStyles, SliderStyles, SpinButtonStyles, ToggleStyles, PersonaStyles, PersonaCoinStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_Checkbox_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/Checkbox.styles */ "X3iD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_Checkbox_styles__WEBPACK_IMPORTED_MODULE_0__["CheckboxStyles"]; });

/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_ChoiceGroupOption_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/ChoiceGroupOption.styles */ "BBBu");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ChoiceGroupOptionStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_ChoiceGroupOption_styles__WEBPACK_IMPORTED_MODULE_1__["ChoiceGroupOptionStyles"]; });

/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_ColorPicker_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/ColorPicker.styles */ "zaHn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorPickerStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_ColorPicker_styles__WEBPACK_IMPORTED_MODULE_2__["ColorPickerStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorRectangleStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_ColorPicker_styles__WEBPACK_IMPORTED_MODULE_2__["ColorRectangleStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorSliderStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_ColorPicker_styles__WEBPACK_IMPORTED_MODULE_2__["ColorSliderStyles"]; });

/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_ComboBox_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/ComboBox.styles */ "QeMu");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ComboBoxStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_ComboBox_styles__WEBPACK_IMPORTED_MODULE_3__["ComboBoxStyles"]; });

/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_CompoundButton_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/CompoundButton.styles */ "Y5SC");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CompoundButtonStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_CompoundButton_styles__WEBPACK_IMPORTED_MODULE_4__["CompoundButtonStyles"]; });

/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_Dropdown_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/Dropdown.styles */ "v3/F");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropdownStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_Dropdown_styles__WEBPACK_IMPORTED_MODULE_5__["DropdownStyles"]; });

/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_HoverCard_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/HoverCard.styles */ "28QO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExpandingCardStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_HoverCard_styles__WEBPACK_IMPORTED_MODULE_6__["ExpandingCardStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlainCardStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_HoverCard_styles__WEBPACK_IMPORTED_MODULE_6__["PlainCardStyles"]; });

/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_IconButton_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/IconButton.styles */ "g15e");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IconButtonStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_IconButton_styles__WEBPACK_IMPORTED_MODULE_7__["IconButtonStyles"]; });

/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_Panel_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/Panel.styles */ "k+mK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PanelStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_Panel_styles__WEBPACK_IMPORTED_MODULE_8__["PanelStyles"]; });

/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_Slider_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/Slider.styles */ "jFEC");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SliderStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_Slider_styles__WEBPACK_IMPORTED_MODULE_9__["SliderStyles"]; });

/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_SpinButton_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/SpinButton.styles */ "B3I/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SpinButtonStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_SpinButton_styles__WEBPACK_IMPORTED_MODULE_10__["SpinButtonStyles"]; });

/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_Toggle_styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/Toggle.styles */ "QHob");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToggleStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_Toggle_styles__WEBPACK_IMPORTED_MODULE_11__["ToggleStyles"]; });

/* harmony import */ var _uifabric_mdl2_theme_lib_mdl2_styles_Persona_styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @uifabric/mdl2-theme/lib/mdl2/styles/Persona.styles */ "u+hd");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_Persona_styles__WEBPACK_IMPORTED_MODULE_12__["PersonaStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersonaCoinStyles", function() { return _uifabric_mdl2_theme_lib_mdl2_styles_Persona_styles__WEBPACK_IMPORTED_MODULE_12__["PersonaCoinStyles"]; });



 // x3



 // x2





 // publishing pages, we can move this back to PLT once fix the fabric import issue
//# sourceMappingURL=FabricDeferredCustomizations.js.map

/***/ }),

/***/ "spS5":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/FocusTrapZone.js ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: FocusTrapZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_FocusTrapZone_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/FocusTrapZone/index */ "CsHB");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FocusTrapZone", function() { return _components_FocusTrapZone_index__WEBPACK_IMPORTED_MODULE_0__["FocusTrapZone"]; });


//# sourceMappingURL=FocusTrapZone.js.map

/***/ }),

/***/ "u+hd":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/Persona.styles.js ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: PersonaStyles, PersonaCoinStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonaStyles", function() { return PersonaStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonaCoinStyles", function() { return PersonaCoinStyles; });
/* harmony import */ var office_ui_fabric_react_lib_Persona__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! office-ui-fabric-react/lib/Persona */ "f1JJ");
/* harmony import */ var office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react/lib/Styling */ "xS3b");


var PersonaStyles = function (props) {
    var size = Object(office_ui_fabric_react_lib_Persona__WEBPACK_IMPORTED_MODULE_0__["sizeBoolean"])(props.size);
    var fonts = props.theme.fonts;
    return {
        primaryText: [
            {
                fontSize: fonts.large.fontSize
            },
            (size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32 || size.isSize40) && {
                fontSize: fonts.medium.fontSize
            },
            size.isSize72 && {
                fontSize: fonts.xLarge.fontSize
            },
            size.isSize100 && {
                fontSize: fonts.xLarge.fontSize,
                fontWeight: office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].semilight
            }
        ],
        tertiaryText: {
            fontSize: fonts.small.fontSize
        },
        optionalText: {
            fontSize: fonts.small.fontSize
        }
    };
};
var PersonaCoinStyles = {
    initials: {
        fontWeight: office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].regular,
        selectors: {
            i: {
                fontWeight: office_ui_fabric_react_lib_Styling__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].regular
            }
        }
    }
};
//# sourceMappingURL=Persona.styles.js.map

/***/ }),

/***/ "v3/F":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/Dropdown.styles.js ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: DropdownStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropdownStyles", function() { return DropdownStyles; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");

var ITEM_HEIGHT = 32;
var commonItemStyles = {
    minHeight: ITEM_HEIGHT,
    padding: '4px 16px'
};
var DropdownStyles = {
    title: {
        padding: "0 32px 0 12px"
    },
    caretDownWrapper: {
        right: 12
    },
    dropdownItemHeader: {
        padding: '0 16px',
        height: ITEM_HEIGHT,
        lineHeight: ITEM_HEIGHT
    },
    dropdownItem: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, commonItemStyles),
    dropdownItemSelected: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, commonItemStyles),
    dropdownItemDisabled: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, commonItemStyles),
    dropdownItemSelectedAndDisabled: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, commonItemStyles)
};
//# sourceMappingURL=Dropdown.styles.js.map

/***/ }),

/***/ "vQWm":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Persona/PersonaPresence/PersonaPresence.base.js ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: PersonaPresenceBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonaPresenceBase", function() { return PersonaPresenceBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Utilities */ "H+ST");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Icon */ "FEqW");
/* harmony import */ var _Persona_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Persona.types */ "TSxk");
/* harmony import */ var _PersonaConsts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../PersonaConsts */ "ztYb");






var coinSizeFontScaleFactor = 6;
var coinSizePresenceScaleFactor = 3;
var presenceMaxSize = 40;
var presenceFontMaxSize = 20;
var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
/**
 * PersonaPresence with no default styles.
 * [Use the `getStyles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Styling)
 */
var PersonaPresenceBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PersonaPresenceBase, _super);
    function PersonaPresenceBase(props) {
        var _this = _super.call(this, props) || this;
        _this._onRenderIcon = function (className, style) { return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Icon__WEBPACK_IMPORTED_MODULE_3__["Icon"], { className: className, iconName: determineIcon(_this.props.presence, _this.props.isOutOfOffice), style: style })); };
        return _this;
    }
    PersonaPresenceBase.prototype.render = function () {
        var _a = this.props, coinSize = _a.coinSize, isOutOfOffice = _a.isOutOfOffice, styles = _a.styles, // Use getStyles from props.
        presence = _a.presence, theme = _a.theme, presenceTitle = _a.presenceTitle;
        var size = Object(_PersonaConsts__WEBPACK_IMPORTED_MODULE_5__["sizeBoolean"])(this.props.size);
        // Render Presence Icon if Persona is above size 32.
        var renderIcon = !(size.isSize8 || size.isSize10 || size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32) &&
            (coinSize ? coinSize > 32 : true);
        var presenceHeightWidth = coinSize
            ? coinSize / coinSizePresenceScaleFactor < presenceMaxSize
                ? coinSize / coinSizePresenceScaleFactor + 'px'
                : presenceMaxSize + 'px'
            : '';
        var presenceFontSize = coinSize
            ? coinSize / coinSizeFontScaleFactor < presenceFontMaxSize
                ? coinSize / coinSizeFontScaleFactor + 'px'
                : presenceFontMaxSize + 'px'
            : '';
        var coinSizeWithPresenceIconStyle = coinSize ? { fontSize: presenceFontSize, lineHeight: presenceHeightWidth } : undefined;
        var coinSizeWithPresenceStyle = coinSize ? { width: presenceHeightWidth, height: presenceHeightWidth } : undefined;
        // Use getStyles from props, or fall back to getStyles from styles file.
        var classNames = getClassNames(styles, {
            theme: theme,
            presence: presence,
            size: this.props.size,
            isOutOfOffice: isOutOfOffice
        });
        if (presence === _Persona_types__WEBPACK_IMPORTED_MODULE_4__["PersonaPresence"].none) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.presence, style: coinSizeWithPresenceStyle, title: presenceTitle }, renderIcon && this._onRenderIcon(classNames.presenceIcon, coinSizeWithPresenceIconStyle)));
    };
    return PersonaPresenceBase;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

function determineIcon(presence, isOutOfOffice) {
    if (!presence) {
        return undefined;
    }
    var oofIcon = 'SkypeArrow';
    switch (_Persona_types__WEBPACK_IMPORTED_MODULE_4__["PersonaPresence"][presence]) {
        case 'online':
            return 'SkypeCheck';
        case 'away':
            return isOutOfOffice ? oofIcon : 'SkypeClock';
        case 'dnd':
            return 'SkypeMinus';
        case 'offline':
            return isOutOfOffice ? oofIcon : '';
    }
    return '';
}
//# sourceMappingURL=PersonaPresence.base.js.map

/***/ }),

/***/ "z0mb":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/utilities/positioning/positioning.js ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: Rectangle, __positioningTestPackage, positionElement, positionCallout, positionCard, getMaxHeight, getOppositeEdge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return Rectangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__positioningTestPackage", function() { return __positioningTestPackage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "positionElement", function() { return positionElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "positionCallout", function() { return positionCallout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "positionCard", function() { return positionCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMaxHeight", function() { return getMaxHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOppositeEdge", function() { return getOppositeEdge; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/DirectionalHint */ "RPJY");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "H+ST");
/* harmony import */ var _positioning_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./positioning.types */ "AiOe");
var _a;




var Rectangle = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Rectangle, _super);
    function Rectangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Rectangle;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["Rectangle"]));

function _createPositionData(targetEdge, alignmentEdge, isAuto) {
    return {
        targetEdge: targetEdge,
        alignmentEdge: alignmentEdge,
        isAuto: isAuto
    };
}
// Currently the beakPercent is set to 50 for all positions meaning that it should tend to the center of the target
var DirectionalDictionary = (_a = {},
    _a[_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].topLeftEdge] = _createPositionData(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].top, _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].left),
    _a[_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].topCenter] = _createPositionData(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].top),
    _a[_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].topRightEdge] = _createPositionData(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].top, _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].right),
    _a[_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].topAutoEdge] = _createPositionData(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].top, undefined, true),
    _a[_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].bottomLeftEdge] = _createPositionData(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].bottom, _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].left),
    _a[_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].bottomCenter] = _createPositionData(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].bottom),
    _a[_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].bottomRightEdge] = _createPositionData(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].bottom, _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].right),
    _a[_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].bottomAutoEdge] = _createPositionData(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].bottom, undefined, true),
    _a[_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].leftTopEdge] = _createPositionData(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].left, _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].top),
    _a[_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].leftCenter] = _createPositionData(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].left),
    _a[_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].leftBottomEdge] = _createPositionData(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].left, _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].bottom),
    _a[_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].rightTopEdge] = _createPositionData(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].right, _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].top),
    _a[_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].rightCenter] = _createPositionData(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].right),
    _a[_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].rightBottomEdge] = _createPositionData(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].right, _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].bottom),
    _a);
function _isRectangleWithinBounds(rect, boundingRect) {
    if (rect.top < boundingRect.top) {
        return false;
    }
    if (rect.bottom > boundingRect.bottom) {
        return false;
    }
    if (rect.left < boundingRect.left) {
        return false;
    }
    if (rect.right > boundingRect.right) {
        return false;
    }
    return true;
}
/**
 * Gets all of the edges of a rectangle that are outside of the given bounds.
 * If there are no out of bounds edges it returns an empty array.
 */
function _getOutOfBoundsEdges(rect, boundingRect) {
    var outOfBounds = new Array();
    if (rect.top < boundingRect.top) {
        outOfBounds.push(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].top);
    }
    if (rect.bottom > boundingRect.bottom) {
        outOfBounds.push(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].bottom);
    }
    if (rect.left < boundingRect.left) {
        outOfBounds.push(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].left);
    }
    if (rect.right > boundingRect.right) {
        outOfBounds.push(_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].right);
    }
    return outOfBounds;
}
function _getEdgeValue(rect, edge) {
    return rect[_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"][edge]];
}
function _setEdgeValue(rect, edge, value) {
    rect[_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"][edge]] = value;
    return rect;
}
/**
 * Returns the middle value of an edge. Only returns 1 value rather than xy coordinates as
 * the itself already contains the other coordinate.
 * For instance, a bottom edge's current value is it's y coordinate, so the number returned is the x.
 *
 * @param {Rectangle} rect
 * @param {RectangleEdge} edge
 * @returns {number}
 */
function _getCenterValue(rect, edge) {
    var edges = _getFlankingEdges(edge);
    return (_getEdgeValue(rect, edges.positiveEdge) + _getEdgeValue(rect, edges.negativeEdge)) / 2;
}
/**
 * Flips the value depending on the edge.
 * If the edge is a "positive" edge, Top or Left, then the value should stay as it is.
 * If the edge is a "negative" edge, Bottom or Right, then the value should be flipped.
 * This is to account for the fact that the coordinates are effectively reveserved in certain cases for the "negative" edges.
 * For example, when testing to see if a bottom edge 1 is within the bounds of another bottom edge 2.
 * If edge 1 is greater than edge 2 then it is out of bounds. This is reversed for top edge 1 and top edge 2.
 * If top edge 1 is less than edge 2 then it is out of bounds.
 *
 *
 * @param {RectangleEdge} edge
 * @param {number} value
 * @returns {number}
 */
function _getRelativeEdgeValue(edge, value) {
    if (edge > 0) {
        return value;
    }
    else {
        return value * -1;
    }
}
function _getRelativeRectEdgeValue(edge, rect) {
    return _getRelativeEdgeValue(edge, _getEdgeValue(rect, edge));
}
function _getRelativeEdgeDifference(rect, hostRect, edge) {
    var edgeDifference = _getEdgeValue(rect, edge) - _getEdgeValue(hostRect, edge);
    return _getRelativeEdgeValue(edge, edgeDifference);
}
/**
 * Moves the edge of a rectangle to the value given. It only moves the edge in a linear direction based on that edge.
 * For example, if it's a bottom edge it will only change y coordinates.
 *
 * @param {Rectangle} rect
 * @param {RectangleEdge} edge
 * @param {number} newValue
 * @returns {Rectangle}
 */
function _moveEdge(rect, edge, newValue) {
    var difference = _getEdgeValue(rect, edge) - newValue;
    rect = _setEdgeValue(rect, edge, newValue);
    rect = _setEdgeValue(rect, edge * -1, _getEdgeValue(rect, edge * -1) - difference);
    return rect;
}
/**
 * Aligns the edge on the passed in rect to the target. If there is a gap then it will have that space between the two.
 *
 * @param {Rectangle} rect
 * @param {Rectangle} target
 * @param {RectangleEdge} edge
 * @param {number} [gap=0]
 * @returns {Rectangle}
 */
function _alignEdges(rect, target, edge, gap) {
    if (gap === void 0) { gap = 0; }
    return _moveEdge(rect, edge, _getEdgeValue(target, edge) + _getRelativeEdgeValue(edge, gap));
}
/**
 * Aligns the targetEdge on the passed in target to the rects corresponding opposite edge.
 * For instance if targetEdge is bottom, then the rects top will be moved to match it.
 *
 * @param {Rectangle} rect
 * @param {Rectangle} target
 * @param {RectangleEdge} targetEdge
 * @param {number} [gap=0]
 * @returns {Rectangle}
 */
function _alignOppositeEdges(rect, target, targetEdge, gap) {
    if (gap === void 0) { gap = 0; }
    var oppositeEdge = targetEdge * -1;
    var adjustedGap = _getRelativeEdgeValue(oppositeEdge, gap);
    return _moveEdge(rect, targetEdge * -1, _getEdgeValue(target, targetEdge) + adjustedGap);
}
/**
 * Tests to see if the given edge is within the bounds of the given rectangle.
 *
 * @param {Rectangle} rect
 * @param {Rectangle} bounds
 * @param {RectangleEdge} edge
 * @returns {boolean}
 */
function _isEdgeInBounds(rect, bounds, edge) {
    var adjustedRectValue = _getRelativeRectEdgeValue(edge, rect);
    return adjustedRectValue > _getRelativeRectEdgeValue(edge, bounds);
}
/**
 * Attempts to move the rectangle through various sides of the target to find a place to fit.
 * If no fit is found, the original position should be returned.
 *
 * @param {Rectangle} rect
 * @param {Rectangle} target
 * @param {Rectangle} bounding
 * @param {IPositionDirectionalHintData} positionData
 * @param {number} [gap=0]
 * @returns {IElementPosition}
 */
function _flipToFit(rect, target, bounding, positionData, gap) {
    if (gap === void 0) { gap = 0; }
    var directions = [_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].left, _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].right, _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].bottom, _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].top];
    // In RTL page, RectangleEdge.right has a higher priority than RectangleEdge.left, therefore the order should be updated.
    if (Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getRTL"])()) {
        directions[0] *= -1;
        directions[1] *= -1;
    }
    var currentEstimate = rect;
    var currentEdge = positionData.targetEdge;
    var currentAlignment = positionData.alignmentEdge;
    // Keep switching sides until one is found with enough space. If all sides don't fit then return the unmodified element.
    for (var i = 0; i < 4; i++) {
        if (!_isEdgeInBounds(currentEstimate, bounding, currentEdge)) {
            directions.splice(directions.indexOf(currentEdge), 1);
            if (directions.length > 0) {
                if (directions.indexOf(currentEdge * -1) > -1) {
                    currentEdge = currentEdge * -1;
                }
                else {
                    currentAlignment = currentEdge;
                    currentEdge = directions.slice(-1)[0];
                }
                currentEstimate = _estimatePosition(rect, target, { targetEdge: currentEdge, alignmentEdge: currentAlignment }, gap);
            }
        }
        else {
            return {
                elementRectangle: currentEstimate,
                targetEdge: currentEdge,
                alignmentEdge: currentAlignment
            };
        }
    }
    return {
        elementRectangle: rect,
        targetEdge: positionData.targetEdge,
        alignmentEdge: currentAlignment
    };
}
/**
 * Flips only the alignment edge of an element rectangle. This is used instead of nudging the alignment edges into position,
 * when alignTargetEdge is specified.
 * @param elementEstimate
 * @param target
 * @param bounding
 * @param gap
 */
function _flipAlignmentEdge(elementEstimate, target, gap, coverTarget) {
    var alignmentEdge = elementEstimate.alignmentEdge, targetEdge = elementEstimate.targetEdge, elementRectangle = elementEstimate.elementRectangle;
    var oppositeEdge = alignmentEdge * -1;
    var newEstimate = _estimatePosition(elementRectangle, target, { targetEdge: targetEdge, alignmentEdge: oppositeEdge }, gap, coverTarget);
    return {
        elementRectangle: newEstimate,
        targetEdge: targetEdge,
        alignmentEdge: oppositeEdge
    };
}
/**
 * Adjusts a element rectangle to fit within the bounds given. If directionalHintFixed or covertarget is passed in
 * then the element will not flip sides on the target. They will, however, be nudged to fit within the bounds given.
 *
 * @param {Rectangle} element
 * @param {Rectangle} target
 * @param {Rectangle} bounding
 * @param {IPositionDirectionalHintData} positionData
 * @param {number} [gap=0]
 * @param {boolean} [directionalHintFixed]
 * @param {boolean} [coverTarget]
 * @returns {IElementPosition}
 */
function _adjustFitWithinBounds(element, target, bounding, positionData, gap, directionalHintFixed, coverTarget) {
    if (gap === void 0) { gap = 0; }
    var alignmentEdge = positionData.alignmentEdge, alignTargetEdge = positionData.alignTargetEdge;
    var elementEstimate = {
        elementRectangle: element,
        targetEdge: positionData.targetEdge,
        alignmentEdge: alignmentEdge
    };
    if (!directionalHintFixed && !coverTarget) {
        elementEstimate = _flipToFit(element, target, bounding, positionData, gap);
    }
    var outOfBounds = _getOutOfBoundsEdges(element, bounding);
    if (alignTargetEdge) {
        // The edge opposite to the alignment edge might be out of bounds. Flip alignment to see if we can get it within bounds.
        if (elementEstimate.alignmentEdge && outOfBounds.indexOf(elementEstimate.alignmentEdge * -1) > -1) {
            var flippedElementEstimate = _flipAlignmentEdge(elementEstimate, target, gap, coverTarget);
            if (_isRectangleWithinBounds(flippedElementEstimate.elementRectangle, bounding)) {
                return flippedElementEstimate;
            }
            else {
                // If the flipped elements edges are still out of bounds, try nudging it.
                elementEstimate = _alignOutOfBoundsEdges(_getOutOfBoundsEdges(flippedElementEstimate.elementRectangle, bounding), elementEstimate, bounding);
            }
        }
    }
    else {
        elementEstimate = _alignOutOfBoundsEdges(outOfBounds, elementEstimate, bounding);
    }
    return elementEstimate;
}
/**
 * Iterates through a list of out of bounds edges and tries to nudge and align them.
 * @param outOfBoundsEdges Array of edges that are out of bounds
 * @param elementEstimate The current element positioning estimate
 * @param bounding The current bounds
 */
function _alignOutOfBoundsEdges(outOfBoundsEdges, elementEstimate, bounding) {
    for (var _i = 0, outOfBoundsEdges_1 = outOfBoundsEdges; _i < outOfBoundsEdges_1.length; _i++) {
        var direction = outOfBoundsEdges_1[_i];
        elementEstimate.elementRectangle = _alignEdges(elementEstimate.elementRectangle, bounding, direction);
    }
    return elementEstimate;
}
/**
 * Moves the middle point on an edge to the point given.
 * Only moves in one direction. For instance if a bottom edge is passed in, then
 * the bottom edge will be moved in the x axis to match the point.
 *
 * @param {Rectangle} rect
 * @param {RectangleEdge} edge
 * @param {number} point
 * @returns {Rectangle}
 */
function _centerEdgeToPoint(rect, edge, point) {
    var positiveEdge = _getFlankingEdges(edge).positiveEdge;
    var elementMiddle = _getCenterValue(rect, edge);
    var distanceToMiddle = elementMiddle - _getEdgeValue(rect, positiveEdge);
    return _moveEdge(rect, positiveEdge, point - distanceToMiddle);
}
/**
 * Moves the element rectangle to be appropriately positioned relative to a given target.
 * Does not flip or adjust the element.
 *
 * @param {Rectangle} elementToPosition
 * @param {Rectangle} target
 * @param {IPositionDirectionalHintData} positionData
 * @param {number} [gap=0]
 * @param {boolean} [coverTarget]
 * @returns {Rectangle}
 */
function _estimatePosition(elementToPosition, target, positionData, gap, coverTarget) {
    if (gap === void 0) { gap = 0; }
    var estimatedElementPosition;
    var alignmentEdge = positionData.alignmentEdge, targetEdge = positionData.targetEdge;
    var elementEdge = coverTarget ? targetEdge : targetEdge * -1;
    estimatedElementPosition = coverTarget
        ? _alignEdges(elementToPosition, target, targetEdge, gap)
        : _alignOppositeEdges(elementToPosition, target, targetEdge, gap);
    // if no alignment edge is provided it's supposed to be centered.
    if (!alignmentEdge) {
        var targetMiddlePoint = _getCenterValue(target, targetEdge);
        estimatedElementPosition = _centerEdgeToPoint(estimatedElementPosition, elementEdge, targetMiddlePoint);
    }
    else {
        estimatedElementPosition = _alignEdges(estimatedElementPosition, target, alignmentEdge);
    }
    return estimatedElementPosition;
}
/**
 * Returns the non-opposite edges of the target edge.
 * For instance if bottom is passed in then left and right will be returned.
 *
 * @param {RectangleEdge} edge
 * @returns {{ firstEdge: RectangleEdge, secondEdge: RectangleEdge }}
 */
function _getFlankingEdges(edge) {
    if (edge === _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].top || edge === _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].bottom) {
        return {
            positiveEdge: _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].left,
            negativeEdge: _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].right
        };
    }
    else {
        return {
            positiveEdge: _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].top,
            negativeEdge: _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].bottom
        };
    }
}
/**
 * Retrieve the final value for the return edge of elementRectangle.
 * If the elementRectangle is closer to one side of the bounds versus the other, the return edge is flipped to grow inward.
 *
 * @param elementRectangle
 * @param targetEdge
 * @param bounds
 */
function _finalizeReturnEdge(elementRectangle, returnEdge, bounds) {
    if (bounds &&
        Math.abs(_getRelativeEdgeDifference(elementRectangle, bounds, returnEdge)) >
            Math.abs(_getRelativeEdgeDifference(elementRectangle, bounds, returnEdge * -1))) {
        return returnEdge * -1;
    }
    return returnEdge;
}
/**
 * Finalizes the element positon based on the hostElement. Only returns the
 * rectangle values to position such that they are anchored to the target.
 * This helps prevent resizing from looking very strange.
 * For instance, if the target edge is top and aligned with the left side then
 * the bottom and left values are returned so as the callou shrinks it shrinks towards that corner.
 *
 * @param {Rectangle} elementRectangle
 * @param {HTMLElement} hostElement
 * @param {RectangleEdge} targetEdge
 * @param {RectangleEdge} bounds
 * @param {RectangleEdge} [alignmentEdge]
 * @param {boolean} coverTarget
 * @param {boolean} doNotFinalizeReturnEdge
 * @returns {IPartialIRectangle}
 */
function _finalizeElementPosition(elementRectangle, hostElement, targetEdge, bounds, alignmentEdge, coverTarget, doNotFinalizeReturnEdge) {
    var returnValue = {};
    var hostRect = _getRectangleFromElement(hostElement);
    var elementEdge = coverTarget ? targetEdge : targetEdge * -1;
    var elementEdgeString = _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"][elementEdge];
    var returnEdge = alignmentEdge ? alignmentEdge : _getFlankingEdges(targetEdge).positiveEdge;
    if (!doNotFinalizeReturnEdge) {
        returnEdge = _finalizeReturnEdge(elementRectangle, returnEdge, bounds);
    }
    returnValue[elementEdgeString] = _getRelativeEdgeDifference(elementRectangle, hostRect, elementEdge);
    returnValue[_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"][returnEdge]] = _getRelativeEdgeDifference(elementRectangle, hostRect, returnEdge);
    return returnValue;
}
// Since the beak is rotated 45 degrees the actual height/width is the length of the diagonal.
// We still want to position the beak based on it's midpoint which does not change. It will
// be at (beakwidth / 2, beakwidth / 2)
function _calculateActualBeakWidthInPixels(beakWidth) {
    return Math.sqrt(beakWidth * beakWidth * 2);
}
/**
 * Returns the appropriate IPositionData based on the props altered for RTL.
 * If directionalHintForRTL is passed in that is used if the page is RTL.
 * If a directionalHint is specified and no directionalHintForRTL is available and the page is RTL the hint will be flipped.
 * For instance bottomLeftEdge would become bottomRightEdge.
 * If there is no directionalHint passed in bottomAutoEdge is chosen automatically.
 *
 * @param {IPositionProps} props
 * @returns {IPositionDirectionalHintData}
 */
function _getPositionData(directionalHint, directionalHintForRTL, previousPositions) {
    if (directionalHint === void 0) { directionalHint = _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__["DirectionalHint"].bottomAutoEdge; }
    if (previousPositions) {
        return {
            alignmentEdge: previousPositions.alignmentEdge,
            isAuto: previousPositions.isAuto,
            targetEdge: previousPositions.targetEdge
        };
    }
    var positionInformation = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, DirectionalDictionary[directionalHint]);
    if (Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getRTL"])()) {
        // If alignment edge exists and that alignment edge is -2 or 2, right or left, then flip it.
        if (positionInformation.alignmentEdge && positionInformation.alignmentEdge % 2 === 0) {
            positionInformation.alignmentEdge = positionInformation.alignmentEdge * -1;
        }
        return directionalHintForRTL !== undefined ? DirectionalDictionary[directionalHintForRTL] : positionInformation;
    }
    return positionInformation;
}
/**
 * Get's the alignment data for the given information. This only really matters if the positioning is Auto.
 * If it is auto then the alignmentEdge should be chosen based on the target edge's position relative to
 * the center of the page.
 *
 * @param {IPositionDirectionalHintData} positionData
 * @param {Rectangle} target
 * @param {Rectangle} boundingRect
 * @param {boolean} [coverTarget]
 * @returns {IPositionDirectionalHintData}
 */
function _getAlignmentData(positionData, target, boundingRect, coverTarget, alignTargetEdge) {
    if (positionData.isAuto) {
        positionData.alignmentEdge = getClosestEdge(positionData.targetEdge, target, boundingRect);
    }
    positionData.alignTargetEdge = alignTargetEdge;
    return positionData;
}
function getClosestEdge(targetEdge, target, boundingRect) {
    var targetCenter = _getCenterValue(target, targetEdge);
    var boundingCenter = _getCenterValue(boundingRect, targetEdge);
    var _a = _getFlankingEdges(targetEdge), positiveEdge = _a.positiveEdge, negativeEdge = _a.negativeEdge;
    if (targetCenter <= boundingCenter) {
        return positiveEdge;
    }
    else {
        return negativeEdge;
    }
}
function _positionElementWithinBounds(elementToPosition, target, bounding, positionData, gap, directionalHintFixed, coverTarget) {
    var estimatedElementPosition = _estimatePosition(elementToPosition, target, positionData, gap, coverTarget);
    if (_isRectangleWithinBounds(estimatedElementPosition, bounding)) {
        return {
            elementRectangle: estimatedElementPosition,
            targetEdge: positionData.targetEdge,
            alignmentEdge: positionData.alignmentEdge
        };
    }
    else {
        return _adjustFitWithinBounds(elementToPosition, target, bounding, positionData, gap, directionalHintFixed, coverTarget);
    }
}
function _finalizeBeakPosition(elementPosition, positionedBeak, bounds) {
    var targetEdge = elementPosition.targetEdge * -1;
    // The "host" element that we will use to help position the beak.
    var actualElement = new Rectangle(0, elementPosition.elementRectangle.width, 0, elementPosition.elementRectangle.height);
    var returnValue = {};
    var returnEdge = _finalizeReturnEdge(elementPosition.elementRectangle, elementPosition.alignmentEdge ? elementPosition.alignmentEdge : _getFlankingEdges(targetEdge).positiveEdge, bounds);
    returnValue[_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"][targetEdge]] = _getEdgeValue(positionedBeak, targetEdge);
    returnValue[_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"][returnEdge]] = _getRelativeEdgeDifference(positionedBeak, actualElement, returnEdge);
    return {
        elementPosition: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, returnValue),
        closestEdge: getClosestEdge(elementPosition.targetEdge, positionedBeak, actualElement),
        targetEdge: targetEdge
    };
}
function _positionBeak(beakWidth, elementPosition) {
    var target = elementPosition.targetRectangle;
    /**
     * Note about beak positioning: The actual beak width only matters for getting the gap between the callout and
     * target, it does not impact the beak placement within the callout. For example example, if the beakWidth is 8,
     * then the actual beakWidth is sqrroot(8^2 + 8^2) = 11.31x11.31. So the callout will need to be an extra 3 pixels
     * away from its target. While the beak is being positioned in the callout it still acts as though it were 8x8.
     * */
    var _a = _getFlankingEdges(elementPosition.targetEdge), positiveEdge = _a.positiveEdge, negativeEdge = _a.negativeEdge;
    var beakTargetPoint = _getCenterValue(target, elementPosition.targetEdge);
    var elementBounds = new Rectangle(beakWidth / 2, elementPosition.elementRectangle.width - beakWidth / 2, beakWidth / 2, elementPosition.elementRectangle.height - beakWidth / 2);
    var beakPosition = new Rectangle(0, beakWidth, 0, beakWidth);
    beakPosition = _moveEdge(beakPosition, elementPosition.targetEdge * -1, -beakWidth / 2);
    beakPosition = _centerEdgeToPoint(beakPosition, elementPosition.targetEdge * -1, beakTargetPoint - _getRelativeRectEdgeValue(positiveEdge, elementPosition.elementRectangle));
    if (!_isEdgeInBounds(beakPosition, elementBounds, positiveEdge)) {
        beakPosition = _alignEdges(beakPosition, elementBounds, positiveEdge);
    }
    else if (!_isEdgeInBounds(beakPosition, elementBounds, negativeEdge)) {
        beakPosition = _alignEdges(beakPosition, elementBounds, negativeEdge);
    }
    return beakPosition;
}
function _getRectangleFromElement(element) {
    var clientRect = element.getBoundingClientRect();
    return new Rectangle(clientRect.left, clientRect.right, clientRect.top, clientRect.bottom);
}
function _getRectangleFromIRect(rect) {
    return new Rectangle(rect.left, rect.right, rect.top, rect.bottom);
}
function _getTargetRect(bounds, target) {
    var targetRectangle;
    if (target) {
        if (target.preventDefault) {
            var ev = target;
            targetRectangle = new Rectangle(ev.clientX, ev.clientX, ev.clientY, ev.clientY);
        }
        else if (target.getBoundingClientRect) {
            targetRectangle = _getRectangleFromElement(target);
            // HTMLImgElements can have x and y values. The check for it being a point must go last.
        }
        else {
            var point = target;
            targetRectangle = new Rectangle(point.x, point.x, point.y, point.y);
        }
        if (!_isRectangleWithinBounds(targetRectangle, bounds)) {
            var outOfBounds = _getOutOfBoundsEdges(targetRectangle, bounds);
            for (var _i = 0, outOfBounds_1 = outOfBounds; _i < outOfBounds_1.length; _i++) {
                var direction = outOfBounds_1[_i];
                targetRectangle[_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"][direction]] = bounds[_positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"][direction]];
            }
        }
    }
    else {
        targetRectangle = new Rectangle(0, 0, 0, 0);
    }
    return targetRectangle;
}
/**
 * If max height is less than zero it returns the bounds height instead.
 */
function _getMaxHeightFromTargetRectangle(targetRectangle, targetEdge, gapSpace, bounds, coverTarget) {
    var maxHeight = 0;
    var directionalHint = DirectionalDictionary[targetEdge];
    // If cover target is set, then the max height should be calculated using the opposite of the target edge since
    // that's the direction that the callout will expand in.
    // For instance, if the directionalhint is bottomLeftEdge then the callout will position so it's bottom edge
    // is aligned with the bottom of the target and expand up towards the top of the screen and the calculated max height
    // is (bottom of target) - (top of screen) - gapSpace.
    var target = coverTarget ? directionalHint.targetEdge * -1 : directionalHint.targetEdge;
    if (target === _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].top) {
        maxHeight = _getEdgeValue(targetRectangle, directionalHint.targetEdge) - bounds.top - gapSpace;
    }
    else if (target === _positioning_types__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].bottom) {
        maxHeight = bounds.bottom - _getEdgeValue(targetRectangle, directionalHint.targetEdge) - gapSpace;
    }
    else {
        maxHeight = bounds.bottom - targetRectangle.top - gapSpace;
    }
    return maxHeight > 0 ? maxHeight : bounds.height;
}
function _positionElementRelative(props, elementToPosition, boundingRect, previousPositions) {
    var gap = props.gapSpace ? props.gapSpace : 0;
    var targetRect = _getTargetRect(boundingRect, props.target);
    var positionData = _getAlignmentData(_getPositionData(props.directionalHint, props.directionalHintForRTL, previousPositions), targetRect, boundingRect, props.coverTarget, props.alignTargetEdge);
    var positionedElement = _positionElementWithinBounds(_getRectangleFromElement(elementToPosition), targetRect, boundingRect, positionData, gap, props.directionalHintFixed, props.coverTarget);
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, positionedElement, { targetRectangle: targetRect });
}
function _finalizePositionData(positionedElement, hostElement, bounds, coverTarget, doNotFinalizeReturnEdge) {
    var finalizedElement = _finalizeElementPosition(positionedElement.elementRectangle, hostElement, positionedElement.targetEdge, bounds, positionedElement.alignmentEdge, coverTarget, doNotFinalizeReturnEdge);
    return {
        elementPosition: finalizedElement,
        targetEdge: positionedElement.targetEdge,
        alignmentEdge: positionedElement.alignmentEdge
    };
}
function _positionElement(props, hostElement, elementToPosition, previousPositions) {
    var boundingRect = props.bounds
        ? _getRectangleFromIRect(props.bounds)
        : new Rectangle(0, window.innerWidth - Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getScrollbarWidth"])(), 0, window.innerHeight);
    var positionedElement = _positionElementRelative(props, elementToPosition, boundingRect, previousPositions);
    return _finalizePositionData(positionedElement, hostElement, boundingRect, props.coverTarget);
}
function _positionCallout(props, hostElement, callout, previousPositions, doNotFinalizeReturnEdge) {
    var beakWidth = props.isBeakVisible ? props.beakWidth || 0 : 0;
    var gap = _calculateActualBeakWidthInPixels(beakWidth) / 2 + (props.gapSpace ? props.gapSpace : 0);
    var positionProps = props;
    positionProps.gapSpace = gap;
    var boundingRect = props.bounds
        ? _getRectangleFromIRect(props.bounds)
        : new Rectangle(0, window.innerWidth - Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getScrollbarWidth"])(), 0, window.innerHeight);
    var positionedElement = _positionElementRelative(positionProps, callout, boundingRect, previousPositions);
    var beakPositioned = _positionBeak(beakWidth, positionedElement);
    var finalizedBeakPosition = _finalizeBeakPosition(positionedElement, beakPositioned, boundingRect);
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _finalizePositionData(positionedElement, hostElement, boundingRect, props.coverTarget, doNotFinalizeReturnEdge), { beakPosition: finalizedBeakPosition });
}
function _positionCard(props, hostElement, callout, previousPositions) {
    return _positionCallout(props, hostElement, callout, previousPositions, true);
}
// END PRIVATE FUNCTIONS
/* tslint:disable:variable-name */
var __positioningTestPackage = {
    _finalizePositionData: _finalizePositionData,
    _finalizeBeakPosition: _finalizeBeakPosition,
    _calculateActualBeakWidthInPixels: _calculateActualBeakWidthInPixels,
    _positionElementWithinBounds: _positionElementWithinBounds,
    _positionBeak: _positionBeak,
    _getPositionData: _getPositionData,
    _getMaxHeightFromTargetRectangle: _getMaxHeightFromTargetRectangle
};
/* tslint:enable:variable-name */
/**
 * Used to position an element relative to the given positioning props.
 * If positioning has been completed before, previousPositioningData
 * can be passed to ensure that the positioning element repositions based on
 * its previous targets rather than starting with directionalhint.
 *
 * @export
 * @param {IPositionProps} props
 * @param {HTMLElement} hostElement
 * @param {HTMLElement} elementToPosition
 * @param {IPositionedData} previousPositions
 * @returns
 */
function positionElement(props, hostElement, elementToPosition, previousPositions) {
    return _positionElement(props, hostElement, elementToPosition, previousPositions);
}
function positionCallout(props, hostElement, elementToPosition, previousPositions) {
    return _positionCallout(props, hostElement, elementToPosition, previousPositions);
}
function positionCard(props, hostElement, elementToPosition, previousPositions) {
    return _positionCard(props, hostElement, elementToPosition, previousPositions);
}
/**
 * Get's the maximum height that a rectangle can have in order to fit below or above a target.
 * If the directional hint specifies a left or right edge (i.e. leftCenter) it will limit the height to the topBorder
 * of the target given.
 * If no bounds are provided then the window is treated as the bounds.
 */
function getMaxHeight(target, targetEdge, gapSpace, bounds, coverTarget) {
    if (gapSpace === void 0) { gapSpace = 0; }
    var mouseTarget = target;
    var elementTarget = target;
    var pointTarget = target;
    var targetRect;
    var boundingRectangle = bounds
        ? _getRectangleFromIRect(bounds)
        : new Rectangle(0, window.innerWidth - Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getScrollbarWidth"])(), 0, window.innerHeight);
    if (mouseTarget.stopPropagation) {
        targetRect = new Rectangle(mouseTarget.clientX, mouseTarget.clientX, mouseTarget.clientY, mouseTarget.clientY);
    }
    else if (pointTarget.x !== undefined && pointTarget.y !== undefined) {
        targetRect = new Rectangle(pointTarget.x, pointTarget.x, pointTarget.y, pointTarget.y);
    }
    else {
        targetRect = _getRectangleFromElement(elementTarget);
    }
    return _getMaxHeightFromTargetRectangle(targetRect, targetEdge, gapSpace, boundingRectangle, coverTarget);
}
/**
 * Returns the opposite edge of the given RectangleEdge.
 */
function getOppositeEdge(edge) {
    return edge * -1;
}
//# sourceMappingURL=positioning.js.map

/***/ }),

/***/ "zaHn":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/mdl2-theme/0.1.5_react-dom@16.8.5+react@16.8.5/node_modules/@uifabric/mdl2-theme/lib/mdl2/styles/ColorPicker.styles.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: ColorPickerStyles, ColorRectangleStyles, ColorSliderStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorPickerStyles", function() { return ColorPickerStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorRectangleStyles", function() { return ColorRectangleStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorSliderStyles", function() { return ColorSliderStyles; });
var ColorPickerStyles = {
    input: {
        selectors: {
            '&.ms-TextField': {
                paddingRight: 2
            }
        }
    },
    table: {
        selectors: {
            'tbody td:last-of-type .ms-ColorPicker-input': {
                paddingRight: 0
            }
        }
    },
    tableHeader: {
        selectors: {
            td: {
                paddingBottom: 0
            }
        }
    }
};
var ColorRectangleStyles = {
    root: {
        border: 'none'
    },
    thumb: {
        borderColor: 'rgba(255,255,255,.8)',
        boxShadow: '0 0 15px -5px black',
        selectors: {
            ':before': {
                border: 'none'
            }
        }
    }
};
var ColorSliderStyles = {
    root: {
        marginBottom: 5
    },
    sliderThumb: {
        borderColor: 'rgba(255,255,255,.8)',
        boxShadow: '0 0 15px -5px black'
    }
};
//# sourceMappingURL=ColorPicker.styles.js.map

/***/ }),

/***/ "ztYb":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_react-dom@16.8.5+react@16.8.5/node_modules/office-ui-fabric-react/lib/components/Persona/PersonaConsts.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: personaSize, personaPresenceSize, sizeBoolean, sizeToPixels, presenceBoolean */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "personaSize", function() { return personaSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "personaPresenceSize", function() { return personaPresenceSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sizeBoolean", function() { return sizeBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sizeToPixels", function() { return sizeToPixels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "presenceBoolean", function() { return presenceBoolean; });
/* harmony import */ var _Persona_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Persona.types */ "TSxk");
var _a;

// Persona Sizes
var personaSize;
(function (personaSize) {
    personaSize.size8 = '20px';
    // TODO: remove in a future major release as it's deprecated.
    personaSize.size10 = '20px';
    // TODO: remove in a future major release as it's deprecated.
    personaSize.size16 = '16px';
    personaSize.size24 = '24px';
    // TODO: remove in a future major release as it's deprecated.
    personaSize.size28 = '28px';
    personaSize.size32 = '32px';
    personaSize.size40 = '40px';
    personaSize.size48 = '48px';
    personaSize.size56 = '56px';
    personaSize.size72 = '72px';
    personaSize.size100 = '100px';
    personaSize.size120 = '120px';
})(personaSize || (personaSize = {}));
// Persona Presence Sizes
var personaPresenceSize;
(function (personaPresenceSize) {
    personaPresenceSize.size6 = '6px';
    personaPresenceSize.size8 = '8px';
    personaPresenceSize.size12 = '12px';
    personaPresenceSize.size16 = '16px';
    personaPresenceSize.size20 = '20px';
    personaPresenceSize.size28 = '28px';
    personaPresenceSize.size32 = '32px';
    /**
     * @deprecated This is now unused
     */
    personaPresenceSize.border = '2px';
})(personaPresenceSize || (personaPresenceSize = {}));
// TODO: remove the deprecated parts in a future major release.
var sizeBoolean = function (size) { return ({
    isSize8: size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size8,
    isSize10: size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size10 || size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].tiny,
    isSize16: size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size16,
    isSize24: size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size24 || size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].extraExtraSmall,
    isSize28: size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size28 || size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].extraSmall,
    isSize32: size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size32,
    isSize40: size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size40 || size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].small,
    isSize48: size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size48 || size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].regular,
    isSize56: size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size56,
    isSize72: size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size72 || size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].large,
    isSize100: size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size100 || size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].extraLarge,
    isSize120: size === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size120
}); };
var sizeToPixels = (_a = {},
    // Old deprecated sizes
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].tiny] = 10,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].extraExtraSmall] = 24,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].extraSmall] = 28,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].small] = 40,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].regular] = 48,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].large] = 72,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].extraLarge] = 100,
    // New sizes
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size8] = 8,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size10] = 10,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size16] = 16,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size24] = 24,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size28] = 28,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size32] = 32,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size40] = 40,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size48] = 48,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size56] = 56,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size72] = 72,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size100] = 100,
    _a[_Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaSize"].size120] = 120,
    _a);
var presenceBoolean = function (presence) { return ({
    isAvailable: presence === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaPresence"].online,
    isAway: presence === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaPresence"].away,
    isBlocked: presence === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaPresence"].blocked,
    isBusy: presence === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaPresence"].busy,
    isDoNotDisturb: presence === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaPresence"].dnd,
    isOffline: presence === _Persona_types__WEBPACK_IMPORTED_MODULE_0__["PersonaPresence"].offline
}); };
//# sourceMappingURL=PersonaConsts.js.map

/***/ })

}]);
//# sourceMappingURL=chunk.0_8e7b2429e92574161315.js.map