(window["webpackJsonp_8494e7d7_6b99_47b2_a741_59873e42f16f_4_0_19"] = window["webpackJsonp_8494e7d7_6b99_47b2_a741_59873e42f16f_4_0_19"] || []).push([["vendors~sp-feature-host"],{

/***/ "+SEB":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Coachmark/PositioningContainer/index.js ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: PositioningContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PositioningContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PositioningContainer */ "W0af");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PositioningContainer", function() { return _PositioningContainer__WEBPACK_IMPORTED_MODULE_0__["PositioningContainer"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "250y":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/TeachingBubble/TeachingBubble.js ***!
  \******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: TeachingBubble */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeachingBubble", function() { return TeachingBubble; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TeachingBubble_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TeachingBubble.base */ "CCi3");
/* harmony import */ var _TeachingBubble_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TeachingBubble.styles */ "hICi");



var TeachingBubble = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_TeachingBubble_base__WEBPACK_IMPORTED_MODULE_1__["TeachingBubbleBase"], _TeachingBubble_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, { scope: 'TeachingBubble' });
//# sourceMappingURL=TeachingBubble.js.map

/***/ }),

/***/ "2svy":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Stack/StackItem/StackItem.styles.js ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: StackItemStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StackItemStyles", function() { return StackItemStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var GlobalClassNames = {
    root: 'ms-StackItem'
};
var alignMap = {
    start: 'flex-start',
    end: 'flex-end'
};
var StackItemStyles = function (props, theme, tokens) {
    var grow = props.grow, shrink = props.shrink, disableShrink = props.disableShrink, align = props.align, verticalFill = props.verticalFill, order = props.order, className = props.className;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        root: [
            theme.fonts.medium,
            classNames.root,
            {
                margin: tokens.margin,
                height: verticalFill ? '100%' : 'auto',
                width: 'auto'
            },
            grow && { flexGrow: grow === true ? 1 : grow },
            (disableShrink || (!grow && !shrink)) && {
                flexShrink: 0
            },
            shrink &&
                !disableShrink && {
                flexShrink: 1
            },
            align && {
                alignSelf: alignMap[align] || align
            },
            order && {
                order: order
            },
            className
        ]
        // TODO: this cast may be hiding some potential issues with styling and name
        //        lookups and should be removed
    };
};
//# sourceMappingURL=StackItem.styles.js.map

/***/ }),

/***/ "3k5I":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Coachmark/Coachmark.base.js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: COACHMARK_ATTRIBUTE_NAME, CoachmarkBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COACHMARK_ATTRIBUTE_NAME", function() { return COACHMARK_ATTRIBUTE_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoachmarkBase", function() { return CoachmarkBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utilities_positioning__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utilities/positioning */ "mAxR");
/* harmony import */ var _PositioningContainer_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PositioningContainer/index */ "+SEB");
/* harmony import */ var _Beak_Beak__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Beak/Beak */ "5vaS");
/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/DirectionalHint */ "zCYU");
/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Coachmark_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Coachmark.styles */ "J8cx");
/* harmony import */ var _FocusTrapZone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../FocusTrapZone */ "q8AU");
/* harmony import */ var _FocusTrapZone__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_FocusTrapZone__WEBPACK_IMPORTED_MODULE_8__);

// Utilities



// Component Dependencies





var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var COACHMARK_ATTRIBUTE_NAME = 'data-coachmarkid';
var CoachmarkBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CoachmarkBase, _super);
    function CoachmarkBase(props) {
        var _this = _super.call(this, props) || this;
        /**
         * The cached HTMLElement reference to the Entity Inner Host
         * element.
         */
        _this._entityHost = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._entityInnerHostElement = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._translateAnimationContainer = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._ariaAlertContainer = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._childrenContainer = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._positioningContainer = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this.dismiss = function (ev) {
            var onDismiss = _this.props.onDismiss;
            if (onDismiss) {
                onDismiss(ev);
            }
        };
        _this._onKeyDown = function (e) {
            // Open coachmark if user presses ALT + C (arbitrary keypress for now)
            if ((e.altKey && e.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].c) ||
                (e.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].enter &&
                    _this._translateAnimationContainer.current &&
                    _this._translateAnimationContainer.current.contains(e.target))) {
                _this._onFocusHandler();
            }
        };
        _this._onFocusHandler = function () {
            if (_this.state.isCollapsed) {
                _this._openCoachmark();
            }
        };
        _this._onPositioned = function (positionData) {
            _this._async.requestAnimationFrame(function () {
                _this.setState({
                    targetAlignment: positionData.alignmentEdge,
                    targetPosition: positionData.targetEdge
                });
            });
        };
        _this._setBeakPosition = function () {
            var beakLeft;
            var beakTop;
            var beakRight;
            var beakBottom;
            var transformOriginX;
            var transformOriginY;
            var targetAlignment = _this.state.targetAlignment;
            var distanceAdjustment = '3px'; // Adjustment distance for Beak to shift towards Coachmark bubble.
            switch (_this._beakDirection) {
                // If Beak is pointing Up or Down
                case _utilities_positioning__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].top:
                case _utilities_positioning__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].bottom:
                    // If there is no target alignment, then beak is X-axis centered in callout
                    if (!targetAlignment) {
                        beakLeft = "calc(50% - " + _Beak_Beak__WEBPACK_IMPORTED_MODULE_5__["BEAK_WIDTH"] / 2 + "px)";
                        transformOriginX = 'center';
                    }
                    else {
                        // Beak is aligned to the left of target
                        if (targetAlignment === _utilities_positioning__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].left) {
                            beakLeft = _Coachmark_styles__WEBPACK_IMPORTED_MODULE_7__["COACHMARK_WIDTH"] / 2 - _Beak_Beak__WEBPACK_IMPORTED_MODULE_5__["BEAK_WIDTH"] / 2 + "px";
                            transformOriginX = 'left';
                        }
                        else {
                            // Beak is aligned to the right of target
                            beakRight = _Coachmark_styles__WEBPACK_IMPORTED_MODULE_7__["COACHMARK_WIDTH"] / 2 - _Beak_Beak__WEBPACK_IMPORTED_MODULE_5__["BEAK_WIDTH"] / 2 + "px";
                            transformOriginX = 'right';
                        }
                    }
                    if (_this._beakDirection === _utilities_positioning__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].top) {
                        beakTop = distanceAdjustment;
                        transformOriginY = 'top';
                    }
                    else {
                        beakBottom = distanceAdjustment;
                        transformOriginY = 'bottom';
                    }
                    break;
                // If Beak is pointing Left or Right
                case _utilities_positioning__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].left:
                case _utilities_positioning__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].right:
                    // If there is no target alignment, then beak is Y-axis centered in callout
                    if (!targetAlignment) {
                        beakTop = "calc(50% - " + _Beak_Beak__WEBPACK_IMPORTED_MODULE_5__["BEAK_WIDTH"] / 2 + "px)";
                        transformOriginY = "center";
                    }
                    else {
                        // Beak is aligned to the top of target
                        if (targetAlignment === _utilities_positioning__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].top) {
                            beakTop = _Coachmark_styles__WEBPACK_IMPORTED_MODULE_7__["COACHMARK_WIDTH"] / 2 - _Beak_Beak__WEBPACK_IMPORTED_MODULE_5__["BEAK_WIDTH"] / 2 + "px";
                            transformOriginY = "top";
                        }
                        else {
                            // Beak is aligned to the bottom of target
                            beakBottom = _Coachmark_styles__WEBPACK_IMPORTED_MODULE_7__["COACHMARK_WIDTH"] / 2 - _Beak_Beak__WEBPACK_IMPORTED_MODULE_5__["BEAK_WIDTH"] / 2 + "px";
                            transformOriginY = "bottom";
                        }
                    }
                    if (_this._beakDirection === _utilities_positioning__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].left) {
                        if (Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getRTL"])()) {
                            beakRight = distanceAdjustment;
                        }
                        else {
                            beakLeft = distanceAdjustment;
                        }
                        transformOriginX = 'left';
                    }
                    else {
                        if (Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getRTL"])()) {
                            beakLeft = distanceAdjustment;
                        }
                        else {
                            beakRight = distanceAdjustment;
                        }
                        transformOriginX = 'right';
                    }
                    break;
            }
            _this.setState({
                beakLeft: beakLeft,
                beakRight: beakRight,
                beakBottom: beakBottom,
                beakTop: beakTop,
                transformOrigin: transformOriginX + " " + transformOriginY
            });
        };
        _this._openCoachmark = function () {
            _this.setState({
                isCollapsed: false
            });
            if (_this.props.onAnimationOpenStart) {
                _this.props.onAnimationOpenStart();
            }
            _this._entityInnerHostElement.current &&
                _this._entityInnerHostElement.current.addEventListener('transitionend', function () {
                    // Need setTimeout to trigger narrator
                    _this._async.setTimeout(function () {
                        if (_this._entityInnerHostElement.current) {
                            Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["focusFirstChild"])(_this._entityInnerHostElement.current);
                        }
                    }, 1000);
                    if (_this.props.onAnimationOpenEnd) {
                        _this.props.onAnimationOpenEnd();
                    }
                });
        };
        _this._warnDeprecations({
            teachingBubbleRef: undefined,
            collapsed: 'isCollapsed',
            beakWidth: undefined,
            beakHeight: undefined,
            width: undefined,
            height: undefined
        });
        // Set defaults for state
        _this.state = {
            isCollapsed: props.isCollapsed,
            isBeaconAnimating: true,
            isMeasuring: true,
            entityInnerHostRect: {
                width: 0,
                height: 0
            },
            isMouseInProximity: false,
            isMeasured: false
        };
        return _this;
    }
    Object.defineProperty(CoachmarkBase.prototype, "_beakDirection", {
        get: function () {
            var targetPosition = this.state.targetPosition;
            if (targetPosition === undefined) {
                return _utilities_positioning__WEBPACK_IMPORTED_MODULE_3__["RectangleEdge"].bottom;
            }
            return Object(_utilities_positioning__WEBPACK_IMPORTED_MODULE_3__["getOppositeEdge"])(targetPosition);
        },
        enumerable: true,
        configurable: true
    });
    CoachmarkBase.prototype.render = function () {
        var _a = this.props, beaconColorOne = _a.beaconColorOne, beaconColorTwo = _a.beaconColorTwo, children = _a.children, target = _a.target, color = _a.color, positioningContainerProps = _a.positioningContainerProps, ariaDescribedBy = _a.ariaDescribedBy, ariaDescribedByText = _a.ariaDescribedByText, ariaLabelledBy = _a.ariaLabelledBy, ariaLabelledByText = _a.ariaLabelledByText, ariaAlertText = _a.ariaAlertText, delayBeforeCoachmarkAnimation = _a.delayBeforeCoachmarkAnimation, styles = _a.styles, theme = _a.theme, className = _a.className;
        var _b = this.state, beakLeft = _b.beakLeft, beakTop = _b.beakTop, beakRight = _b.beakRight, beakBottom = _b.beakBottom, isCollapsed = _b.isCollapsed, isBeaconAnimating = _b.isBeaconAnimating, isMeasuring = _b.isMeasuring, entityInnerHostRect = _b.entityInnerHostRect, transformOrigin = _b.transformOrigin, alertText = _b.alertText, isMeasured = _b.isMeasured;
        // Defaulting the main background before passing it to the styles because it is used for `Beak` too.
        var defaultColor = color;
        if (!defaultColor && theme) {
            defaultColor = theme.semanticColors.primaryButtonBackground;
        }
        var classNames = getClassNames(styles, {
            theme: theme,
            beaconColorOne: beaconColorOne,
            beaconColorTwo: beaconColorTwo,
            className: className,
            isCollapsed: isCollapsed,
            isBeaconAnimating: isBeaconAnimating,
            isMeasuring: isMeasuring,
            color: defaultColor,
            transformOrigin: transformOrigin,
            isMeasured: isMeasured,
            entityHostHeight: entityInnerHostRect.height + "px",
            entityHostWidth: entityInnerHostRect.width + "px",
            width: _Coachmark_styles__WEBPACK_IMPORTED_MODULE_7__["COACHMARK_WIDTH"] + "px",
            height: _Coachmark_styles__WEBPACK_IMPORTED_MODULE_7__["COACHMARK_HEIGHT"] + "px",
            delayBeforeCoachmarkAnimation: delayBeforeCoachmarkAnimation + "ms"
        });
        var finalHeight = isCollapsed ? _Coachmark_styles__WEBPACK_IMPORTED_MODULE_7__["COACHMARK_HEIGHT"] : entityInnerHostRect.height;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_PositioningContainer_index__WEBPACK_IMPORTED_MODULE_4__["PositioningContainer"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ target: target, offsetFromTarget: _Beak_Beak__WEBPACK_IMPORTED_MODULE_5__["BEAK_HEIGHT"], componentRef: this._positioningContainer, finalHeight: finalHeight, onPositioned: this._onPositioned, bounds: this._getBounds() }, positioningContainerProps),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.root },
                ariaAlertText && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.ariaContainer, role: "alert", ref: this._ariaAlertContainer, "aria-hidden": !isCollapsed }, alertText)),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.pulsingBeacon }),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.translateAnimationContainer, ref: this._translateAnimationContainer },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.scaleAnimationLayer },
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.rotateAnimationLayer },
                            this._positioningContainer.current && isCollapsed && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Beak_Beak__WEBPACK_IMPORTED_MODULE_5__["Beak"], { left: beakLeft, top: beakTop, right: beakRight, bottom: beakBottom, direction: this._beakDirection, color: defaultColor })),
                            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.entityHost, ref: this._entityHost, tabIndex: -1, "data-is-focusable": true, role: "dialog", "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy },
                                isCollapsed && [
                                    ariaLabelledBy && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("p", { id: ariaLabelledBy, key: 0, className: classNames.ariaContainer }, ariaLabelledByText)),
                                    ariaDescribedBy && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("p", { id: ariaDescribedBy, key: 1, className: classNames.ariaContainer }, ariaDescribedByText))
                                ],
                                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_FocusTrapZone__WEBPACK_IMPORTED_MODULE_8__["FocusTrapZone"], { isClickableOutsideFocusTrap: true, forceFocusInsideTrap: false },
                                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.entityInnerHost, ref: this._entityInnerHostElement },
                                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.childrenContainer, ref: this._childrenContainer, "aria-hidden": isCollapsed }, children))))))))));
    };
    // tslint:disable-next-line function-name
    CoachmarkBase.prototype.UNSAFE_componentWillReceiveProps = function (newProps) {
        if (this.props.isCollapsed && !newProps.isCollapsed) {
            // The coachmark is about to open
            this._openCoachmark();
        }
    };
    CoachmarkBase.prototype.shouldComponentUpdate = function (newProps, newState) {
        return !Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["shallowCompare"])(newProps, this.props) || !Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["shallowCompare"])(newState, this.state);
    };
    CoachmarkBase.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevState.targetAlignment !== this.state.targetAlignment || prevState.targetPosition !== this.state.targetPosition) {
            this._setBeakPosition();
        }
        if (prevProps.preventDismissOnLostFocus !== this.props.preventDismissOnLostFocus) {
            this._addListeners();
        }
    };
    CoachmarkBase.prototype.componentDidMount = function () {
        var _this = this;
        this._async.requestAnimationFrame(function () {
            if (_this._entityInnerHostElement.current && _this.state.entityInnerHostRect.width + _this.state.entityInnerHostRect.width === 0) {
                _this.setState({
                    isMeasuring: false,
                    entityInnerHostRect: {
                        width: _this._entityInnerHostElement.current.offsetWidth,
                        height: _this._entityInnerHostElement.current.offsetHeight
                    },
                    isMeasured: true
                });
                _this._setBeakPosition();
                _this.forceUpdate();
            }
            _this._addListeners();
            // We don't want to the user to immediately trigger the Coachmark when it's opened
            _this._async.setTimeout(function () {
                _this._addProximityHandler(_this.props.mouseProximityOffset);
            }, _this.props.delayBeforeMouseOpen);
            // Need to add setTimeout to have narrator read change in alert container
            if (_this.props.ariaAlertText) {
                _this._async.setTimeout(function () {
                    if (_this.props.ariaAlertText && _this._ariaAlertContainer.current) {
                        _this.setState({
                            alertText: _this.props.ariaAlertText
                        });
                    }
                }, 0);
            }
            if (!_this.props.preventFocusOnMount) {
                _this._async.setTimeout(function () {
                    if (_this._entityHost.current) {
                        _this._entityHost.current.focus();
                    }
                }, 1000);
            }
        });
    };
    CoachmarkBase.prototype._addListeners = function () {
        var preventDismissOnLostFocus = this.props.preventDismissOnLostFocus;
        var currentDoc = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getDocument"])();
        this._events.off();
        if (currentDoc) {
            this._events.on(currentDoc, 'keydown', this._onKeyDown, true);
            if (!preventDismissOnLostFocus) {
                this._events.on(currentDoc, 'click', this._dismissOnLostFocus, true);
                this._events.on(currentDoc, 'focus', this._dismissOnLostFocus, true);
            }
        }
    };
    CoachmarkBase.prototype._dismissOnLostFocus = function (ev) {
        var clickTarget = ev.target;
        var clickedOutsideCallout = this._translateAnimationContainer.current && !Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["elementContains"])(this._translateAnimationContainer.current, clickTarget);
        var target = this.props.target;
        if (clickedOutsideCallout && clickTarget !== target && !Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["elementContains"])(target, clickTarget)) {
            this.dismiss(ev);
        }
    };
    CoachmarkBase.prototype._getBounds = function () {
        var _a = this.props, isPositionForced = _a.isPositionForced, positioningContainerProps = _a.positioningContainerProps;
        if (isPositionForced) {
            // If directionalHint direction is the top or bottom auto edge, then we want to set the left/right bounds
            // to the window x-axis to have auto positioning work correctly.
            if (positioningContainerProps &&
                (positioningContainerProps.directionalHint === _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_6__["DirectionalHint"].topAutoEdge ||
                    positioningContainerProps.directionalHint === _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_6__["DirectionalHint"].bottomAutoEdge)) {
                return {
                    left: 0,
                    top: -Infinity,
                    bottom: Infinity,
                    right: window.innerWidth,
                    width: window.innerWidth,
                    height: Infinity
                };
            }
            else {
                return {
                    left: -Infinity,
                    top: -Infinity,
                    bottom: Infinity,
                    right: Infinity,
                    width: Infinity,
                    height: Infinity
                };
            }
        }
        else {
            return undefined;
        }
    };
    CoachmarkBase.prototype._addProximityHandler = function (mouseProximityOffset) {
        var _this = this;
        if (mouseProximityOffset === void 0) { mouseProximityOffset = 0; }
        /**
         * An array of cached ids returned when setTimeout runs during
         * the window resize event trigger.
         */
        var timeoutIds = [];
        // Take the initial measure out of the initial render to prevent
        // an unnecessary render.
        this._async.setTimeout(function () {
            _this._setTargetElementRect();
            // When the window resizes we want to async
            // get the bounding client rectangle.
            // Every time the event is triggered we want to
            // setTimeout and then clear any previous instances
            // of setTimeout.
            _this._events.on(window, 'resize', function () {
                timeoutIds.forEach(function (value) {
                    clearInterval(value);
                });
                timeoutIds.push(_this._async.setTimeout(function () {
                    _this._setTargetElementRect();
                }, 100));
            });
        }, 10);
        // Every time the document's mouse move is triggered
        // we want to check if inside of an element and
        // set the state with the result.
        this._events.on(document, 'mousemove', function (e) {
            if (_this.state.isCollapsed) {
                var mouseY = e.clientY;
                var mouseX = e.clientX;
                _this._setTargetElementRect();
                var isMouseInProximity = _this._isInsideElement(mouseX, mouseY, mouseProximityOffset);
                if (isMouseInProximity !== _this.state.isMouseInProximity) {
                    _this._openCoachmark();
                }
            }
            if (_this.props.onMouseMove) {
                _this.props.onMouseMove(e);
            }
        });
    };
    CoachmarkBase.prototype._setTargetElementRect = function () {
        if (this._translateAnimationContainer && this._translateAnimationContainer.current) {
            this._targetElementRect = this._translateAnimationContainer.current.getBoundingClientRect();
        }
    };
    CoachmarkBase.prototype._isInsideElement = function (mouseX, mouseY, mouseProximityOffset) {
        if (mouseProximityOffset === void 0) { mouseProximityOffset = 0; }
        return (mouseX > this._targetElementRect.left - mouseProximityOffset &&
            mouseX < this._targetElementRect.left + this._targetElementRect.width + mouseProximityOffset &&
            mouseY > this._targetElementRect.top - mouseProximityOffset &&
            mouseY < this._targetElementRect.top + this._targetElementRect.height + mouseProximityOffset);
    };
    CoachmarkBase.defaultProps = {
        isCollapsed: true,
        mouseProximityOffset: 10,
        delayBeforeMouseOpen: 3600,
        delayBeforeCoachmarkAnimation: 0,
        isPositionForced: true,
        positioningContainerProps: {
            directionalHint: _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_6__["DirectionalHint"].bottomAutoEdge
        }
    };
    return CoachmarkBase;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=Coachmark.base.js.map

/***/ }),

/***/ "3wan":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Foundation.js ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: legacyStyled, createComponent, withSlots, createFactory, getSlots, ThemeProvider, useControlledState, getControlledDerivedProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uifabric_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/foundation */ "h3rG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "legacyStyled", function() { return _uifabric_foundation__WEBPACK_IMPORTED_MODULE_0__["legacyStyled"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createComponent", function() { return _uifabric_foundation__WEBPACK_IMPORTED_MODULE_0__["createComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withSlots", function() { return _uifabric_foundation__WEBPACK_IMPORTED_MODULE_0__["withSlots"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return _uifabric_foundation__WEBPACK_IMPORTED_MODULE_0__["createFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSlots", function() { return _uifabric_foundation__WEBPACK_IMPORTED_MODULE_0__["getSlots"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return _uifabric_foundation__WEBPACK_IMPORTED_MODULE_0__["ThemeProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useControlledState", function() { return _uifabric_foundation__WEBPACK_IMPORTED_MODULE_0__["useControlledState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getControlledDerivedProps", function() { return _uifabric_foundation__WEBPACK_IMPORTED_MODULE_0__["getControlledDerivedProps"]; });


//# sourceMappingURL=Foundation.js.map

/***/ }),

/***/ "4Tkz":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/foundation/7.7.36_052fcf153ec79c77e0d1778fd73206f7/node_modules/@uifabric/foundation/lib/createComponent.js ***!
  \*************************************************************************************************************************************************************************************************************/
/*! exports provided: createComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createComponent", function() { return createComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _uifabric_styling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @uifabric/styling */ "pjSQ");
/* harmony import */ var _uifabric_styling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_uifabric_styling__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @uifabric/utilities */ "BJrP");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _slots__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./slots */ "WZug");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utilities */ "6cx9");






/**
 * Assembles a higher order component based on the following: styles, theme, view, and state.
 * Imposes a separation of concern and centralizes styling processing to increase ease of use and robustness
 * in how components use and apply styling and theming.
 *
 * Automatically merges and applies themes and styles with theme / styleprops having the highest priority.
 * State component, if provided, is passed in props for processing. Props from state / user are automatically processed
 * and styled before finally being passed to view.
 *
 * State components should contain all stateful behavior and should not generate any JSX, but rather simply call
 * the view prop.
 *
 * Views should simply be stateless pure functions that receive all props needed for rendering their output.
 *
 * State component is optional. If state is not provided, created component is essentially a functional
 * stateless component.
 *
 * @param options - component Component options. See IComponentOptions for more detail.
 */
function createComponent(view, options) {
    if (options === void 0) { options = {}; }
    var _a = options.factoryOptions, factoryOptions = _a === void 0 ? {} : _a;
    var defaultProp = factoryOptions.defaultProp;
    var result = function (componentProps) {
        var settings = _getCustomizations(options.displayName, react__WEBPACK_IMPORTED_MODULE_1__["useContext"](_uifabric_utilities__WEBPACK_IMPORTED_MODULE_3__["CustomizerContext"]), options.fields);
        var useState = options.state;
        if (useState) {
            // Don't assume state will return all props, so spread useState result over component props.
            componentProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, componentProps), useState(componentProps));
        }
        var theme = componentProps.theme || settings.theme;
        var tokens = _resolveTokens(componentProps, theme, options.tokens, settings.tokens, componentProps.tokens);
        var styles = _resolveStyles(componentProps, theme, tokens, options.styles, settings.styles, componentProps.styles);
        var viewProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, componentProps), { styles: styles,
            tokens: tokens, _defaultStyles: styles, theme: theme });
        return view(viewProps);
    };
    result.displayName = options.displayName || view.name;
    // If a shorthand prop is defined, create a factory for the component.
    // TODO: This shouldn't be a concern of createComponent.. factoryOptions should just be forwarded.
    //       Need to weigh creating default factories on component creation vs. memoizing them on use in slots.tsx.
    if (defaultProp) {
        result.create = Object(_slots__WEBPACK_IMPORTED_MODULE_4__["createFactory"])(result, { defaultProp: defaultProp });
    }
    Object(_utilities__WEBPACK_IMPORTED_MODULE_5__["assign"])(result, options.statics);
    // Later versions of TypeSript should allow us to merge objects in a type safe way and avoid this cast.
    return result;
}
/**
 * Resolve all styles functions with both props and tokens and flatten results along with all styles objects.
 */
function _resolveStyles(props, theme, tokens) {
    var allStyles = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        allStyles[_i - 3] = arguments[_i];
    }
    return _uifabric_styling__WEBPACK_IMPORTED_MODULE_2__["concatStyleSets"].apply(void 0, allStyles.map(function (styles) {
        return typeof styles === 'function' ? styles(props, theme, tokens) : styles;
    }));
}
/**
 * Resolve all tokens functions with props flatten results along with all tokens objects.
 */
function _resolveTokens(props, theme) {
    var allTokens = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        allTokens[_i - 2] = arguments[_i];
    }
    var tokens = {};
    for (var _a = 0, allTokens_1 = allTokens; _a < allTokens_1.length; _a++) {
        var currentTokens = allTokens_1[_a];
        if (currentTokens) {
            // TODO: why is this cast needed? TS seems to think there is a (TToken | Function) union from somewhere.
            currentTokens =
                typeof currentTokens === 'function'
                    ? currentTokens(props, theme)
                    : currentTokens;
            if (Array.isArray(currentTokens)) {
                currentTokens = _resolveTokens.apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArrays"])([props, theme], currentTokens));
            }
            Object(_utilities__WEBPACK_IMPORTED_MODULE_5__["assign"])(tokens, currentTokens);
        }
    }
    return tokens;
}
/**
 * Helper function for calling Customizations.getSettings falling back to default fields.
 *
 * @param displayName Displayable name for component.
 * @param context React context passed to component containing contextual settings.
 * @param fields Optional list of properties to grab from global store and context.
 */
function _getCustomizations(displayName, context, fields) {
    // TODO: do we want field props? should fields be part of IComponent and used here?
    // TODO: should we centrally define DefaultFields? (not exported from styling)
    // TODO: tie this array to ICustomizationProps, such that each array element is keyof ICustomizationProps
    var DefaultFields = ['theme', 'styles', 'tokens'];
    return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_3__["Customizations"].getSettings(fields || DefaultFields, displayName, context.customizations);
}
//# sourceMappingURL=createComponent.js.map

/***/ }),

/***/ "5vaS":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Coachmark/Beak/Beak.js ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: BEAK_HEIGHT, BEAK_WIDTH, Beak */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BEAK_HEIGHT", function() { return BEAK_HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BEAK_WIDTH", function() { return BEAK_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Beak", function() { return Beak; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Beak_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Beak.styles */ "ECc4");
/* harmony import */ var _utilities_positioning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utilities/positioning */ "mAxR");





var BEAK_HEIGHT = 10;
var BEAK_WIDTH = 18;
var Beak = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Beak, _super);
    function Beak(props) {
        return _super.call(this, props) || this;
    }
    Beak.prototype.render = function () {
        var _a = this.props, left = _a.left, top = _a.top, bottom = _a.bottom, right = _a.right, color = _a.color, _b = _a.direction, direction = _b === void 0 ? _utilities_positioning__WEBPACK_IMPORTED_MODULE_4__["RectangleEdge"].top : _b;
        var svgHeight;
        var svgWidth;
        if (direction === _utilities_positioning__WEBPACK_IMPORTED_MODULE_4__["RectangleEdge"].top || direction === _utilities_positioning__WEBPACK_IMPORTED_MODULE_4__["RectangleEdge"].bottom) {
            svgHeight = BEAK_HEIGHT;
            svgWidth = BEAK_WIDTH;
        }
        else {
            svgHeight = BEAK_WIDTH;
            svgWidth = BEAK_HEIGHT;
        }
        var pointOne;
        var pointTwo;
        var pointThree;
        var transform;
        switch (direction) {
            case _utilities_positioning__WEBPACK_IMPORTED_MODULE_4__["RectangleEdge"].top:
            default:
                pointOne = BEAK_WIDTH / 2 + ", 0";
                pointTwo = BEAK_WIDTH + ", " + BEAK_HEIGHT;
                pointThree = "0, " + BEAK_HEIGHT;
                transform = 'translateY(-100%)';
                break;
            case _utilities_positioning__WEBPACK_IMPORTED_MODULE_4__["RectangleEdge"].right:
                pointOne = "0, 0";
                pointTwo = BEAK_HEIGHT + ", " + BEAK_HEIGHT;
                pointThree = "0, " + BEAK_WIDTH;
                transform = 'translateX(100%)';
                break;
            case _utilities_positioning__WEBPACK_IMPORTED_MODULE_4__["RectangleEdge"].bottom:
                pointOne = "0, 0";
                pointTwo = BEAK_WIDTH + ", 0";
                pointThree = BEAK_WIDTH / 2 + ", " + BEAK_HEIGHT;
                transform = 'translateY(100%)';
                break;
            case _utilities_positioning__WEBPACK_IMPORTED_MODULE_4__["RectangleEdge"].left:
                pointOne = BEAK_HEIGHT + ", 0";
                pointTwo = "0, " + BEAK_HEIGHT;
                pointThree = BEAK_HEIGHT + ", " + BEAK_WIDTH;
                transform = 'translateX(-100%)';
                break;
        }
        var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
        var classNames = getClassNames(_Beak_styles__WEBPACK_IMPORTED_MODULE_3__["getStyles"], {
            left: left,
            top: top,
            bottom: bottom,
            right: right,
            height: svgHeight + "px",
            width: svgWidth + "px",
            transform: transform,
            color: color
        });
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.root, role: "presentation" },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("svg", { height: svgHeight, width: svgWidth, className: classNames.beak },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("polygon", { points: pointOne + ' ' + pointTwo + ' ' + pointThree }))));
    };
    return Beak;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=Beak.js.map

/***/ }),

/***/ "6cx9":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/foundation/7.7.36_052fcf153ec79c77e0d1778fd73206f7/node_modules/@uifabric/foundation/lib/utilities.js ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: assign */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");

var assign = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"];
//# sourceMappingURL=utilities.js.map

/***/ }),

/***/ "8t9d":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/positioning/positioning.types.js ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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

/***/ "9gBo":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Image.js ***!
  \*******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Image.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "AYr4":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/positioning/index.js ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: Rectangle, __positioningTestPackage, positionElement, positionCallout, positionCard, getMaxHeight, getOppositeEdge, RectangleEdge, Position */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./positioning */ "npfW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return _positioning__WEBPACK_IMPORTED_MODULE_0__["Rectangle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__positioningTestPackage", function() { return _positioning__WEBPACK_IMPORTED_MODULE_0__["__positioningTestPackage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "positionElement", function() { return _positioning__WEBPACK_IMPORTED_MODULE_0__["positionElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "positionCallout", function() { return _positioning__WEBPACK_IMPORTED_MODULE_0__["positionCallout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "positionCard", function() { return _positioning__WEBPACK_IMPORTED_MODULE_0__["positionCard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMaxHeight", function() { return _positioning__WEBPACK_IMPORTED_MODULE_0__["getMaxHeight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOppositeEdge", function() { return _positioning__WEBPACK_IMPORTED_MODULE_0__["getOppositeEdge"]; });

/* harmony import */ var _positioning_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./positioning.types */ "8t9d");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RectangleEdge", function() { return _positioning_types__WEBPACK_IMPORTED_MODULE_1__["RectangleEdge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return _positioning_types__WEBPACK_IMPORTED_MODULE_1__["Position"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "BJrP":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/utilities/7.24.2_b00af71b99b3978738e618b37212a8b6/node_modules/@uifabric/utilities/lib/index.js ***!
  \*************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @uifabric/utilities/index.js
var pkg = __webpack_require__(/*! @ms/uifabric-styling-bundle */ "fglE");
module.exports = pkg._Utilities;

/***/ }),

/***/ "BLKp":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/foundation/7.7.36_052fcf153ec79c77e0d1778fd73206f7/node_modules/@uifabric/foundation/lib/hooks/index.js ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: useControlledState, getControlledDerivedProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controlled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controlled */ "j9GC");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useControlledState", function() { return _controlled__WEBPACK_IMPORTED_MODULE_0__["useControlledState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getControlledDerivedProps", function() { return _controlled__WEBPACK_IMPORTED_MODULE_0__["getControlledDerivedProps"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "CCi3":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/TeachingBubble/TeachingBubble.base.js ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: TeachingBubbleBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeachingBubbleBase", function() { return TeachingBubbleBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _TeachingBubbleContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TeachingBubbleContent */ "L1BH");
/* harmony import */ var _Callout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Callout */ "cEYc");
/* harmony import */ var _Callout__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Callout__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/DirectionalHint */ "zCYU");
/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_5__);






var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var TeachingBubbleBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TeachingBubbleBase, _super);
    // Constructor
    function TeachingBubbleBase(props) {
        var _this = _super.call(this, props) || this;
        _this.rootElement = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this.state = {};
        _this._defaultCalloutProps = {
            beakWidth: 16,
            gapSpace: 0,
            setInitialFocus: true,
            doNotLayer: false,
            directionalHint: _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_5__["DirectionalHint"].rightCenter
        };
        return _this;
    }
    TeachingBubbleBase.prototype.focus = function () {
        if (this.rootElement.current) {
            this.rootElement.current.focus();
        }
    };
    TeachingBubbleBase.prototype.render = function () {
        var _a = this.props, setCalloutProps = _a.calloutProps, targetElement = _a.targetElement, onDismiss = _a.onDismiss, isWide = _a.isWide, styles = _a.styles, theme = _a.theme, target = _a.target;
        var calloutProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this._defaultCalloutProps, setCalloutProps);
        var stylesProps = {
            theme: theme,
            isWide: isWide,
            calloutClassName: calloutProps ? calloutProps.className : undefined
        };
        var classNames = getClassNames(styles, stylesProps);
        var calloutStyles = classNames.subComponentStyles
            ? classNames.subComponentStyles.callout
            : undefined;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Callout__WEBPACK_IMPORTED_MODULE_4__["Callout"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ target: target || targetElement, onDismiss: onDismiss }, calloutProps, { className: classNames.root, styles: calloutStyles, hideOverflow: true }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { ref: this.rootElement },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_TeachingBubbleContent__WEBPACK_IMPORTED_MODULE_3__["TeachingBubbleContent"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props)))));
    };
    TeachingBubbleBase.defaultProps = {
        /**
         * Default calloutProps is deprecated in favor of private `_defaultCalloutProps`.
         * Remove in next release.
         * @deprecated In favor of private `_defaultCalloutProps`.
         */
        calloutProps: {
            beakWidth: 16,
            gapSpace: 0,
            setInitialFocus: true,
            doNotLayer: false,
            directionalHint: _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_5__["DirectionalHint"].rightCenter
        }
    };
    return TeachingBubbleBase;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=TeachingBubble.base.js.map

/***/ }),

/***/ "Cr2D":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/TeachingBubble.js ***!
  \****************************************************************************************************************************************************************************************************************/
/*! exports provided: TeachingBubble, TeachingBubbleBase, TeachingBubbleContent, TeachingBubbleContentBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_TeachingBubble_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/TeachingBubble/index */ "d6B5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TeachingBubble", function() { return _components_TeachingBubble_index__WEBPACK_IMPORTED_MODULE_0__["TeachingBubble"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TeachingBubbleBase", function() { return _components_TeachingBubble_index__WEBPACK_IMPORTED_MODULE_0__["TeachingBubbleBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TeachingBubbleContent", function() { return _components_TeachingBubble_index__WEBPACK_IMPORTED_MODULE_0__["TeachingBubbleContent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TeachingBubbleContentBase", function() { return _components_TeachingBubble_index__WEBPACK_IMPORTED_MODULE_0__["TeachingBubbleContentBase"]; });


//# sourceMappingURL=TeachingBubble.js.map

/***/ }),

/***/ "ECc4":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Coachmark/Beak/Beak.styles.js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
function getStyles(props) {
    return {
        root: [
            {
                position: 'absolute',
                boxShadow: 'inherit',
                border: 'none',
                boxSizing: 'border-box',
                transform: props.transform,
                width: props.width,
                height: props.height,
                left: props.left,
                top: props.top,
                right: props.right,
                bottom: props.bottom
            }
        ],
        beak: {
            fill: props.color,
            display: 'block'
        }
    };
}
//# sourceMappingURL=Beak.styles.js.map

/***/ }),

/***/ "EMXY":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Coachmark/index.js ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: Coachmark, COACHMARK_ATTRIBUTE_NAME, CoachmarkBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Coachmark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Coachmark */ "jl7f");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Coachmark", function() { return _Coachmark__WEBPACK_IMPORTED_MODULE_0__["Coachmark"]; });

/* harmony import */ var _Coachmark_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Coachmark.base */ "3k5I");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COACHMARK_ATTRIBUTE_NAME", function() { return _Coachmark_base__WEBPACK_IMPORTED_MODULE_1__["COACHMARK_ATTRIBUTE_NAME"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CoachmarkBase", function() { return _Coachmark_base__WEBPACK_IMPORTED_MODULE_1__["CoachmarkBase"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "HfcR":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Coachmark.js ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: Coachmark, COACHMARK_ATTRIBUTE_NAME, CoachmarkBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Coachmark_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Coachmark/index */ "EMXY");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Coachmark", function() { return _components_Coachmark_index__WEBPACK_IMPORTED_MODULE_0__["Coachmark"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COACHMARK_ATTRIBUTE_NAME", function() { return _components_Coachmark_index__WEBPACK_IMPORTED_MODULE_0__["COACHMARK_ATTRIBUTE_NAME"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CoachmarkBase", function() { return _components_Coachmark_index__WEBPACK_IMPORTED_MODULE_0__["CoachmarkBase"]; });


//# sourceMappingURL=Coachmark.js.map

/***/ }),

/***/ "J8cx":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Coachmark/Coachmark.styles.js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: COACHMARK_WIDTH, COACHMARK_HEIGHT, translateOne, scaleOne, rotateOne, getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COACHMARK_WIDTH", function() { return COACHMARK_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COACHMARK_HEIGHT", function() { return COACHMARK_HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translateOne", function() { return translateOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleOne", function() { return scaleOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateOne", function() { return rotateOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_1__);


var COACHMARK_WIDTH = 32;
var COACHMARK_HEIGHT = 32;
var translateOne = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
    '0%': {
        transform: 'translate(0, 0)',
        animationTimingFunction: 'linear'
    },
    '78.57%': {
        transform: 'translate(0, 0)',
        animationTimingFunction: 'cubic-bezier(0.62, 0, 0.56, 1)'
    },
    '82.14%': {
        transform: 'translate(0, -5px)',
        animationTimingFunction: 'cubic-bezier(0.58, 0, 0, 1)'
    },
    '84.88%': {
        transform: 'translate(0, 9px)',
        animationTimingFunction: 'cubic-bezier(1, 0, 0.56, 1)'
    },
    '88.1%': {
        transform: 'translate(0, -2px)',
        animationTimingFunction: 'cubic-bezier(0.58, 0, 0.67, 1)'
    },
    '90.12%': {
        transform: 'translate(0, 0)',
        animationTimingFunction: 'linear'
    },
    '100%': {
        transform: 'translate(0, 0)'
    }
});
var scaleOne = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
    '0%': {
        transform: ' scale(0)',
        animationTimingFunction: 'linear'
    },
    '14.29%': {
        transform: 'scale(0)',
        animationTimingFunction: 'cubic-bezier(0.84, 0, 0.52, 0.99)'
    },
    '16.67%': {
        transform: 'scale(1.15)',
        animationTimingFunction: 'cubic-bezier(0.48, -0.01, 0.52, 1.01)'
    },
    '19.05%': {
        transform: 'scale(0.95)',
        animationTimingFunction: 'cubic-bezier(0.48, 0.02, 0.52, 0.98)'
    },
    '21.43%': {
        transform: 'scale(1)',
        animationTimingFunction: 'linear'
    },
    '42.86%': {
        transform: 'scale(1)',
        animationTimingFunction: 'cubic-bezier(0.48, -0.02, 0.52, 1.02)'
    },
    '45.71%': {
        transform: 'scale(0.8)',
        animationTimingFunction: 'cubic-bezier(0.48, 0.01, 0.52, 0.99)'
    },
    '50%': {
        transform: 'scale(1)',
        animationTimingFunction: 'linear'
    },
    '90.12%': {
        transform: 'scale(1)',
        animationTimingFunction: 'cubic-bezier(0.48, -0.02, 0.52, 1.02)'
    },
    '92.98%': {
        transform: 'scale(0.8)',
        animationTimingFunction: 'cubic-bezier(0.48, 0.01, 0.52, 0.99)'
    },
    '97.26%': {
        transform: 'scale(1)',
        animationTimingFunction: 'linear'
    },
    '100%': {
        transform: 'scale(1)'
    }
});
var rotateOne = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
    '0%': {
        transform: 'rotate(0deg)',
        animationTimingFunction: 'linear'
    },
    '83.33%': {
        transform: ' rotate(0deg)',
        animationTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)'
    },
    '83.93%': {
        transform: 'rotate(15deg)',
        animationTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)'
    },
    '84.52%': {
        transform: 'rotate(-15deg)',
        animationTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)'
    },
    '85.12%': {
        transform: 'rotate(15deg)',
        animationTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)'
    },
    '85.71%': {
        transform: 'rotate(-15deg)',
        animationTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)'
    },
    '86.31%': {
        transform: 'rotate(0deg)',
        animationTimingFunction: 'linear'
    },
    '100%': {
        transform: 'rotate(0deg)'
    }
});
function getStyles(props) {
    var _a;
    var theme = props.theme, className = props.className, color = props.color, beaconColorOne = props.beaconColorOne, beaconColorTwo = props.beaconColorTwo, delayBeforeCoachmarkAnimation = props.delayBeforeCoachmarkAnimation, isCollapsed = props.isCollapsed, isBeaconAnimating = props.isBeaconAnimating, isMeasuring = props.isMeasuring, isMeasured = props.isMeasured, entityHostHeight = props.entityHostHeight, entityHostWidth = props.entityHostWidth, transformOrigin = props.transformOrigin;
    if (!theme) {
        throw new Error('theme is undefined or null in base Dropdown getStyles function.');
    }
    var animationInnerDimension = '35px';
    var animationOuterDimension = '150px';
    var animationBorderWidth = '10px';
    var ContinuousPulse = _Styling__WEBPACK_IMPORTED_MODULE_0__["PulsingBeaconAnimationStyles"].continuousPulseAnimationDouble(beaconColorOne ? beaconColorOne : theme.palette.themePrimary, beaconColorTwo ? beaconColorTwo : theme.palette.themeTertiary, animationInnerDimension, animationOuterDimension, animationBorderWidth);
    var ContinuousPulseAnimation = _Styling__WEBPACK_IMPORTED_MODULE_0__["PulsingBeaconAnimationStyles"].createDefaultAnimation(ContinuousPulse, delayBeforeCoachmarkAnimation);
    return {
        root: [
            theme.fonts.medium,
            {
                position: 'relative'
            },
            className
        ],
        pulsingBeacon: [
            {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: Object(_Utilities__WEBPACK_IMPORTED_MODULE_1__["getRTL"])() ? 'translate(50%, -50%)' : 'translate(-50%, -50%)',
                width: '0px',
                height: '0px',
                borderRadius: '225px',
                borderStyle: 'solid',
                opacity: '0'
            },
            isCollapsed && isBeaconAnimating && ContinuousPulseAnimation
        ],
        // Translate Animation Layer
        translateAnimationContainer: [
            {
                width: '100%',
                height: '100%'
            },
            isCollapsed && {
                animationDuration: '14s',
                animationTimingFunction: 'linear',
                animationDirection: 'normal',
                animationIterationCount: '1',
                animationDelay: '0s',
                animationFillMode: 'forwards',
                animationName: translateOne,
                transition: 'opacity 0.5s ease-in-out'
            },
            !isCollapsed && {
                opacity: '1'
            }
        ],
        // Scale Animation Layer
        scaleAnimationLayer: [
            {
                width: '100%',
                height: '100%'
            },
            isCollapsed && {
                animationDuration: '14s',
                animationTimingFunction: 'linear',
                animationDirection: 'normal',
                animationIterationCount: '1',
                animationDelay: '0s',
                animationFillMode: 'forwards',
                animationName: scaleOne
            }
        ],
        // Rotate Animation Layer
        rotateAnimationLayer: [
            {
                width: '100%',
                height: '100%'
            },
            isCollapsed && {
                animationDuration: '14s',
                animationTimingFunction: 'linear',
                animationDirection: 'normal',
                animationIterationCount: '1',
                animationDelay: '0s',
                animationFillMode: 'forwards',
                animationName: rotateOne
            },
            !isCollapsed && {
                opacity: '1'
            }
        ],
        // Layer Host, defaults to collapsed
        entityHost: [
            {
                position: 'relative',
                outline: 'none',
                overflow: 'hidden',
                backgroundColor: color,
                borderRadius: COACHMARK_WIDTH,
                transition: 'border-radius 250ms, width 500ms, height 500ms cubic-bezier(0.5, 0, 0, 1)',
                visibility: 'hidden',
                selectors: (_a = {},
                    _a[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                        backgroundColor: 'Window',
                        border: '2px solid WindowText'
                    },
                    _a)
            },
            !isMeasuring && {
                width: COACHMARK_WIDTH,
                height: COACHMARK_HEIGHT,
                visibility: 'visible'
            },
            !isCollapsed && {
                borderRadius: '1px',
                opacity: '1',
                width: entityHostWidth,
                height: entityHostHeight
            }
        ],
        entityInnerHost: [
            {
                transition: 'transform 500ms cubic-bezier(0.5, 0, 0, 1)',
                transformOrigin: transformOrigin,
                transform: 'scale(0)'
            },
            !isCollapsed && {
                width: entityHostWidth,
                height: entityHostHeight,
                transform: 'scale(1)'
            },
            !isMeasuring && {
                visibility: 'visible'
            }
        ],
        childrenContainer: [
            {
                display: isMeasured && isCollapsed ? 'none' : 'block'
            }
        ],
        ariaContainer: {
            position: 'fixed',
            opacity: 0,
            height: 0,
            width: 0,
            pointerEvents: 'none'
        }
    };
}
//# sourceMappingURL=Coachmark.styles.js.map

/***/ }),

/***/ "KehA":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Stack/StackUtils.js ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: parseGap, parsePadding */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseGap", function() { return parseGap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePadding", function() { return parsePadding; });
/**
 * Functions used by Stack components to simplify style-related computations
 */
// Helper function that converts a themed spacing key (if given) to the corresponding themed spacing value.
var _getThemedSpacing = function (space, theme) {
    if (theme.spacing.hasOwnProperty(space)) {
        return theme.spacing[space];
    }
    return space;
};
// Helper function that takes a gap as a string and converts it into a { value, unit } representation.
var _getValueUnitGap = function (gap) {
    var numericalPart = parseFloat(gap);
    var numericalValue = isNaN(numericalPart) ? 0 : numericalPart;
    var numericalString = isNaN(numericalPart) ? '' : numericalPart.toString();
    var unitPart = gap.substring(numericalString.toString().length);
    return {
        value: numericalValue,
        unit: unitPart || 'px'
    };
};
/**
 * Takes in a gap size in either a CSS-style format (e.g. 10 or "10px")
 *  or a key of a themed spacing value (e.g. "s1").
 * Returns the separate numerical value of the padding (e.g. 10)
 *  and the CSS unit (e.g. "px").
 */
var parseGap = function (gap, theme) {
    if (gap === undefined || gap === '') {
        return {
            rowGap: {
                value: 0,
                unit: 'px'
            },
            columnGap: {
                value: 0,
                unit: 'px'
            }
        };
    }
    if (typeof gap === 'number') {
        return {
            rowGap: {
                value: gap,
                unit: 'px'
            },
            columnGap: {
                value: gap,
                unit: 'px'
            }
        };
    }
    var splitGap = gap.split(' ');
    // If the array has more than two values, then return 0px.
    if (splitGap.length > 2) {
        return {
            rowGap: {
                value: 0,
                unit: 'px'
            },
            columnGap: {
                value: 0,
                unit: 'px'
            }
        };
    }
    // If the array has two values, then parse each one.
    if (splitGap.length === 2) {
        return {
            rowGap: _getValueUnitGap(_getThemedSpacing(splitGap[0], theme)),
            columnGap: _getValueUnitGap(_getThemedSpacing(splitGap[1], theme))
        };
    }
    // Else, parse the numerical value and pass it as both the vertical and horizontal gap.
    var calculatedGap = _getValueUnitGap(_getThemedSpacing(gap, theme));
    return {
        rowGap: calculatedGap,
        columnGap: calculatedGap
    };
};
/**
 * Takes in a padding in a CSS-style format (e.g. 10, "10px", "10px 10px", etc.)
 *  where the separate padding values can also be the key of a themed spacing value
 *  (e.g. "s1 m", "10px l1 20px l2", etc.).
 * Returns a CSS-style padding.
 */
var parsePadding = function (padding, theme) {
    if (padding === undefined || typeof padding === 'number' || padding === '') {
        return padding;
    }
    var paddingValues = padding.split(' ');
    if (paddingValues.length < 2) {
        return _getThemedSpacing(padding, theme);
    }
    return paddingValues.reduce(function (padding1, padding2) {
        return _getThemedSpacing(padding1, theme) + ' ' + _getThemedSpacing(padding2, theme);
    });
};
//# sourceMappingURL=StackUtils.js.map

/***/ }),

/***/ "L1BH":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/TeachingBubble/TeachingBubbleContent.js ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: TeachingBubbleContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeachingBubbleContent", function() { return TeachingBubbleContent; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TeachingBubbleContent_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TeachingBubbleContent.base */ "O765");
/* harmony import */ var _TeachingBubble_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TeachingBubble.styles */ "hICi");



var TeachingBubbleContent = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_TeachingBubbleContent_base__WEBPACK_IMPORTED_MODULE_1__["TeachingBubbleContentBase"], _TeachingBubble_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, { scope: 'TeachingBubbleContent' });
//# sourceMappingURL=TeachingBubbleContent.js.map

/***/ }),

/***/ "LT1T":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Coachmark/PositioningContainer/PositioningContainer.styles.js ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getClassNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClassNames", function() { return getClassNames; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_1__);


var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["memoizeFunction"])(function () {
    var _a;
    return Object(_Styling__WEBPACK_IMPORTED_MODULE_1__["mergeStyleSets"])({
        root: [
            {
                position: 'absolute',
                boxSizing: 'border-box',
                border: '1px solid ${}',
                selectors: (_a = {},
                    _a[_Styling__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelector"]] = {
                        border: '1px solid WindowText'
                    },
                    _a)
            },
            Object(_Styling__WEBPACK_IMPORTED_MODULE_1__["focusClear"])()
        ],
        container: {
            position: 'relative'
        },
        main: {
            backgroundColor: '#ffffff',
            overflowX: 'hidden',
            overflowY: 'hidden',
            position: 'relative'
        },
        overFlowYHidden: {
            overflowY: 'hidden'
        }
    });
});
//# sourceMappingURL=PositioningContainer.styles.js.map

/***/ }),

/***/ "O765":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/TeachingBubble/TeachingBubbleContent.base.js ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: TeachingBubbleContentBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeachingBubbleContentBase", function() { return TeachingBubbleContentBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Button */ "xk/t");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Image */ "9gBo");
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Image__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Stack__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Stack */ "TAWF");
/* harmony import */ var _FocusTrapZone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../FocusTrapZone */ "q8AU");
/* harmony import */ var _FocusTrapZone__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_FocusTrapZone__WEBPACK_IMPORTED_MODULE_6__);







var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var TeachingBubbleContentBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TeachingBubbleContentBase, _super);
    function TeachingBubbleContentBase(props) {
        var _this = _super.call(this, props) || this;
        _this.rootElement = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._onKeyDown = function (e) {
            if (_this.props.onDismiss) {
                if (e.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].escape) {
                    _this.props.onDismiss();
                }
            }
        };
        _this.state = {};
        return _this;
    }
    TeachingBubbleContentBase.prototype.componentDidMount = function () {
        if (this.props.onDismiss) {
            document.addEventListener('keydown', this._onKeyDown, false);
        }
    };
    TeachingBubbleContentBase.prototype.componentWillUnmount = function () {
        if (this.props.onDismiss) {
            document.removeEventListener('keydown', this._onKeyDown);
        }
    };
    TeachingBubbleContentBase.prototype.focus = function () {
        if (this.rootElement.current) {
            this.rootElement.current.focus();
        }
    };
    TeachingBubbleContentBase.prototype.render = function () {
        var _a = this.props, children = _a.children, illustrationImage = _a.illustrationImage, primaryButtonProps = _a.primaryButtonProps, secondaryButtonProps = _a.secondaryButtonProps, headline = _a.headline, hasCondensedHeadline = _a.hasCondensedHeadline, hasCloseIcon = _a.hasCloseIcon, onDismiss = _a.onDismiss, closeButtonAriaLabel = _a.closeButtonAriaLabel, hasSmallHeadline = _a.hasSmallHeadline, isWide = _a.isWide, styles = _a.styles, theme = _a.theme, ariaDescribedBy = _a.ariaDescribedBy, ariaLabelledBy = _a.ariaLabelledBy, customFooterContent = _a.footerContent;
        var imageContent;
        var headerContent;
        var bodyContent;
        var footerContent;
        var closeButton;
        var classNames = getClassNames(styles, {
            theme: theme,
            hasCondensedHeadline: hasCondensedHeadline,
            hasSmallHeadline: hasSmallHeadline,
            isWide: isWide,
            primaryButtonClassName: primaryButtonProps ? primaryButtonProps.className : undefined,
            secondaryButtonClassName: secondaryButtonProps ? secondaryButtonProps.className : undefined
        });
        if (illustrationImage && illustrationImage.src) {
            imageContent = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.imageContent },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Image__WEBPACK_IMPORTED_MODULE_4__["Image"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, illustrationImage))));
        }
        if (headline) {
            var HeaderWrapperAs = typeof headline === 'string' ? 'p' : 'div';
            headerContent = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.header },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](HeaderWrapperAs, { role: "heading", className: classNames.headline, id: ariaLabelledBy }, headline)));
        }
        if (children) {
            var BodyContentWrapperAs = typeof children === 'string' ? 'p' : 'div';
            bodyContent = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.body },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](BodyContentWrapperAs, { className: classNames.subText, id: ariaDescribedBy }, children)));
        }
        if (primaryButtonProps || secondaryButtonProps || customFooterContent) {
            footerContent = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Stack__WEBPACK_IMPORTED_MODULE_5__["Stack"], { className: classNames.footer, horizontal: true, horizontalAlign: customFooterContent ? 'space-between' : 'end' },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Stack__WEBPACK_IMPORTED_MODULE_5__["Stack"].Item, { align: "center" }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", null, customFooterContent)),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Stack__WEBPACK_IMPORTED_MODULE_5__["Stack"].Item, null,
                    secondaryButtonProps && react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Button__WEBPACK_IMPORTED_MODULE_3__["DefaultButton"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, secondaryButtonProps, { className: classNames.secondaryButton })),
                    primaryButtonProps && react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Button__WEBPACK_IMPORTED_MODULE_3__["PrimaryButton"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, primaryButtonProps, { className: classNames.primaryButton })))));
        }
        if (hasCloseIcon) {
            closeButton = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Button__WEBPACK_IMPORTED_MODULE_3__["IconButton"], { className: classNames.closeButton, iconProps: { iconName: 'Cancel' }, title: closeButtonAriaLabel, ariaLabel: closeButtonAriaLabel, onClick: onDismiss }));
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.content, ref: this.rootElement, role: 'dialog', tabIndex: -1, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, "data-is-focusable": true },
            imageContent,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_FocusTrapZone__WEBPACK_IMPORTED_MODULE_6__["FocusTrapZone"], { isClickableOutsideFocusTrap: true },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.bodyContent },
                    headerContent,
                    bodyContent,
                    footerContent,
                    closeButton))));
    };
    // Specify default props values
    TeachingBubbleContentBase.defaultProps = {
        hasCondensedHeadline: false,
        imageProps: {
            imageFit: _Image__WEBPACK_IMPORTED_MODULE_4__["ImageFit"].cover,
            width: 364,
            height: 130
        }
    };
    return TeachingBubbleContentBase;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=TeachingBubbleContent.base.js.map

/***/ }),

/***/ "RMa8":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Stack/index.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: StackItem, Stack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StackItem_StackItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StackItem/StackItem */ "d1gO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StackItem", function() { return _StackItem_StackItem__WEBPACK_IMPORTED_MODULE_0__["StackItem"]; });

/* harmony import */ var _Stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Stack */ "rvHd");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Stack", function() { return _Stack__WEBPACK_IMPORTED_MODULE_1__["Stack"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "TAWF":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Stack.js ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: StackItem, Stack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Stack_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Stack/index */ "RMa8");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StackItem", function() { return _components_Stack_index__WEBPACK_IMPORTED_MODULE_0__["StackItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Stack", function() { return _components_Stack_index__WEBPACK_IMPORTED_MODULE_0__["Stack"]; });


//# sourceMappingURL=Stack.js.map

/***/ }),

/***/ "Uhjc":
/*!**********************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/merge-styles/7.16.2/node_modules/@uifabric/merge-styles/lib/index.js ***!
  \**********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @uifabric/merge-styles/index.js
var pkg = __webpack_require__(/*! @ms/uifabric-styling-bundle */ "fglE");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "W0af":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Coachmark/PositioningContainer/PositioningContainer.js ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: PositioningContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PositioningContainer", function() { return PositioningContainer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PositioningContainer_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PositioningContainer.styles */ "LT1T");
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Layer */ "88pY");
/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/DirectionalHint */ "zCYU");
/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utilities_positioning__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utilities/positioning */ "mAxR");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_7__);
var _a;




// Utilites/Helpers




var OFF_SCREEN_STYLE = { opacity: 0 };
// In order for some of the max height logic to work
// properly we need to set the border.
// The value is abitrary.
var BORDER_WIDTH = 1;
var SLIDE_ANIMATIONS = (_a = {},
    _a[_utilities_positioning__WEBPACK_IMPORTED_MODULE_6__["RectangleEdge"].top] = 'slideUpIn20',
    _a[_utilities_positioning__WEBPACK_IMPORTED_MODULE_6__["RectangleEdge"].bottom] = 'slideDownIn20',
    _a[_utilities_positioning__WEBPACK_IMPORTED_MODULE_6__["RectangleEdge"].left] = 'slideLeftIn20',
    _a[_utilities_positioning__WEBPACK_IMPORTED_MODULE_6__["RectangleEdge"].right] = 'slideRightIn20',
    _a);
var PositioningContainer = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PositioningContainer, _super);
    function PositioningContainer(props) {
        var _this = _super.call(this, props) || this;
        /**
         * The primary positioned div.
         */
        _this._positionedHost = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        // @TODO rename to reflect the name of this class
        _this._contentHost = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        /**
         * Deprecated, use `onResize` instead.
         * @deprecated Use `onResize` instead.
         */
        _this.dismiss = function (ev) {
            _this.onResize(ev);
        };
        _this.onResize = function (ev) {
            var onDismiss = _this.props.onDismiss;
            if (onDismiss) {
                onDismiss(ev);
            }
            else {
                _this._updateAsyncPosition();
            }
        };
        _this._setInitialFocus = function () {
            if (_this._contentHost.current && _this.props.setInitialFocus && !_this._didSetInitialFocus && _this.state.positions) {
                _this._didSetInitialFocus = true;
                Object(_Utilities__WEBPACK_IMPORTED_MODULE_5__["focusFirstChild"])(_this._contentHost.current);
            }
        };
        _this._onComponentDidMount = function () {
            // This is added so the positioningContainer will dismiss when the window is scrolled
            // but not when something inside the positioningContainer is scrolled. The delay seems
            // to be required to avoid React firing an async focus event in IE from
            // the target changing focus quickly prior to rendering the positioningContainer.
            _this._async.setTimeout(function () {
                _this._events.on(_this._targetWindow, 'scroll', _this._async.throttle(_this._dismissOnScroll, 10), true);
                _this._events.on(_this._targetWindow, 'resize', _this._async.throttle(_this.onResize, 10), true);
                _this._events.on(_this._targetWindow.document.body, 'focus', _this._dismissOnLostFocus, true);
                _this._events.on(_this._targetWindow.document.body, 'click', _this._dismissOnLostFocus, true);
            }, 0);
            if (_this.props.onLayerMounted) {
                _this.props.onLayerMounted();
            }
            _this._updateAsyncPosition();
            _this._setHeightOffsetEveryFrame();
        };
        _this._didSetInitialFocus = false;
        _this.state = {
            positions: undefined,
            heightOffset: 0
        };
        _this._positionAttempts = 0;
        return _this;
    }
    // tslint:disable-next-line function-name
    PositioningContainer.prototype.UNSAFE_componentWillMount = function () {
        this._setTargetWindowAndElement(this._getTarget());
    };
    PositioningContainer.prototype.componentDidMount = function () {
        this._onComponentDidMount();
    };
    PositioningContainer.prototype.componentDidUpdate = function () {
        this._setInitialFocus();
        this._updateAsyncPosition();
    };
    // tslint:disable-next-line function-name
    PositioningContainer.prototype.UNSAFE_componentWillUpdate = function (newProps) {
        // If the target element changed, find the new one. If we are tracking
        // target with class name, always find element because we do not know if
        // fabric has rendered a new element and disposed the old element.
        var newTarget = this._getTarget(newProps);
        var oldTarget = this._getTarget();
        if (newTarget !== oldTarget || typeof newTarget === 'string' || newTarget instanceof String) {
            this._maxHeight = undefined;
            this._setTargetWindowAndElement(newTarget);
        }
        if (newProps.offsetFromTarget !== this.props.offsetFromTarget) {
            this._maxHeight = undefined;
        }
        if (newProps.finalHeight !== this.props.finalHeight) {
            this._setHeightOffsetEveryFrame();
        }
    };
    PositioningContainer.prototype.render = function () {
        // If there is no target window then we are likely in server side rendering and we should not render anything.
        if (!this._targetWindow) {
            return null;
        }
        var _a = this.props, className = _a.className, positioningContainerWidth = _a.positioningContainerWidth, positioningContainerMaxHeight = _a.positioningContainerMaxHeight, children = _a.children;
        var positions = this.state.positions;
        var styles = Object(_PositioningContainer_styles__WEBPACK_IMPORTED_MODULE_2__["getClassNames"])();
        var directionalClassName = positions && positions.targetEdge ? _Styling__WEBPACK_IMPORTED_MODULE_7__["AnimationClassNames"][SLIDE_ANIMATIONS[positions.targetEdge]] : '';
        var getContentMaxHeight = this._getMaxHeight() + this.state.heightOffset;
        var contentMaxHeight = positioningContainerMaxHeight && positioningContainerMaxHeight > getContentMaxHeight
            ? getContentMaxHeight
            : positioningContainerMaxHeight;
        var content = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { ref: this._positionedHost, className: Object(_Utilities__WEBPACK_IMPORTED_MODULE_5__["css"])('ms-PositioningContainer', styles.container) },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_Styling__WEBPACK_IMPORTED_MODULE_7__["mergeStyles"])('ms-PositioningContainer-layerHost', styles.root, className, directionalClassName, !!positioningContainerWidth && { width: positioningContainerWidth }), 
                // tslint:disable-next-line:jsx-ban-props
                style: positions ? positions.elementPosition : OFF_SCREEN_STYLE, tabIndex: -1, 
                // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
                ref: this._contentHost },
                children,
                // @TODO apply to the content container
                contentMaxHeight)));
        return this.props.doNotLayer ? content : react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Layer__WEBPACK_IMPORTED_MODULE_3__["Layer"], null, content);
    };
    PositioningContainer.prototype._dismissOnScroll = function (ev) {
        var preventDismissOnScroll = this.props.preventDismissOnScroll;
        if (this.state.positions && !preventDismissOnScroll) {
            this._dismissOnLostFocus(ev);
        }
    };
    PositioningContainer.prototype._dismissOnLostFocus = function (ev) {
        var target = ev.target;
        var clickedOutsideCallout = this._positionedHost.current && !Object(_Utilities__WEBPACK_IMPORTED_MODULE_5__["elementContains"])(this._positionedHost.current, target);
        if ((!this._target && clickedOutsideCallout) ||
            (ev.target !== this._targetWindow &&
                clickedOutsideCallout &&
                (this._target.stopPropagation ||
                    (!this._target || (target !== this._target && !Object(_Utilities__WEBPACK_IMPORTED_MODULE_5__["elementContains"])(this._target, target)))))) {
            this.onResize(ev);
        }
    };
    PositioningContainer.prototype._updateAsyncPosition = function () {
        var _this = this;
        this._async.requestAnimationFrame(function () { return _this._updatePosition(); });
    };
    PositioningContainer.prototype._updatePosition = function () {
        var positions = this.state.positions;
        var _a = this.props, offsetFromTarget = _a.offsetFromTarget, onPositioned = _a.onPositioned;
        var hostElement = this._positionedHost.current;
        var positioningContainerElement = this._contentHost.current;
        if (hostElement && positioningContainerElement) {
            var currentProps = void 0;
            currentProps = Object(_Utilities__WEBPACK_IMPORTED_MODULE_5__["assign"])(currentProps, this.props);
            currentProps.bounds = this._getBounds();
            currentProps.target = this._target;
            if (document.body.contains(currentProps.target)) {
                currentProps.gapSpace = offsetFromTarget;
                var newPositions_1 = Object(_utilities_positioning__WEBPACK_IMPORTED_MODULE_6__["positionElement"])(currentProps, hostElement, positioningContainerElement);
                // Set the new position only when the positions are not exists or one of the new positioningContainer positions are different.
                // The position should not change if the position is within 2 decimal places.
                if ((!positions && newPositions_1) ||
                    (positions && newPositions_1 && !this._arePositionsEqual(positions, newPositions_1) && this._positionAttempts < 5)) {
                    // We should not reposition the positioningContainer more than a few times, if it is then the content is likely resizing
                    // and we should stop trying to reposition to prevent a stack overflow.
                    this._positionAttempts++;
                    this.setState({
                        positions: newPositions_1
                    }, function () {
                        if (onPositioned) {
                            onPositioned(newPositions_1);
                        }
                    });
                }
                else {
                    this._positionAttempts = 0;
                    if (onPositioned) {
                        onPositioned(newPositions_1);
                    }
                }
            }
            else if (positions !== undefined) {
                this.setState({
                    positions: undefined
                });
            }
        }
    };
    PositioningContainer.prototype._getBounds = function () {
        if (!this._positioningBounds) {
            var currentBounds = this.props.bounds;
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
            this._positioningBounds = currentBounds;
        }
        return this._positioningBounds;
    };
    /**
     * Return the maximum height the container can grow to
     * without going out of the specified bounds
     */
    PositioningContainer.prototype._getMaxHeight = function () {
        var _a = this.props, directionalHintFixed = _a.directionalHintFixed, offsetFromTarget = _a.offsetFromTarget, directionalHint = _a.directionalHint;
        if (!this._maxHeight) {
            if (directionalHintFixed && this._target) {
                var gapSpace = offsetFromTarget ? offsetFromTarget : 0;
                this._maxHeight = Object(_utilities_positioning__WEBPACK_IMPORTED_MODULE_6__["getMaxHeight"])(this._target, directionalHint, gapSpace, this._getBounds());
            }
            else {
                this._maxHeight = this._getBounds().height - BORDER_WIDTH * 2;
            }
        }
        return this._maxHeight;
    };
    PositioningContainer.prototype._arePositionsEqual = function (positions, newPosition) {
        return this._comparePositions(positions.elementPosition, newPosition.elementPosition);
    };
    PositioningContainer.prototype._comparePositions = function (oldPositions, newPositions) {
        for (var key in newPositions) {
            // This needs to be checked here and below because there is a linting error if for in does not immediately have an if statement
            if (newPositions.hasOwnProperty(key)) {
                var oldPositionEdge = oldPositions[key];
                var newPositionEdge = newPositions[key];
                if (oldPositionEdge && newPositionEdge) {
                    if (oldPositionEdge.toFixed(2) !== newPositionEdge.toFixed(2)) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    PositioningContainer.prototype._setTargetWindowAndElement = function (target) {
        var currentElement = this._positionedHost.current;
        if (target) {
            if (typeof target === 'string') {
                var currentDoc = Object(_Utilities__WEBPACK_IMPORTED_MODULE_5__["getDocument"])();
                this._target = currentDoc ? currentDoc.querySelector(target) : null;
                this._targetWindow = Object(_Utilities__WEBPACK_IMPORTED_MODULE_5__["getWindow"])(currentElement);
            }
            else if (target.stopPropagation) {
                this._targetWindow = Object(_Utilities__WEBPACK_IMPORTED_MODULE_5__["getWindow"])(target.toElement);
                this._target = target;
            }
            else if (target.x !== undefined && target.y !== undefined) {
                this._targetWindow = Object(_Utilities__WEBPACK_IMPORTED_MODULE_5__["getWindow"])(currentElement);
                this._target = target;
            }
            else {
                var targetElement = target;
                this._targetWindow = Object(_Utilities__WEBPACK_IMPORTED_MODULE_5__["getWindow"])(targetElement);
                this._target = target;
            }
        }
        else {
            this._targetWindow = Object(_Utilities__WEBPACK_IMPORTED_MODULE_5__["getWindow"])(currentElement);
        }
    };
    /**
     * Animates the height if finalHeight was given.
     */
    PositioningContainer.prototype._setHeightOffsetEveryFrame = function () {
        var _this = this;
        if (this._contentHost && this.props.finalHeight) {
            this._setHeightOffsetTimer = this._async.requestAnimationFrame(function () {
                if (!_this._contentHost.current) {
                    return;
                }
                var positioningContainerMainElem = _this._contentHost.current.lastChild;
                var cardScrollHeight = positioningContainerMainElem.scrollHeight;
                var cardCurrHeight = positioningContainerMainElem.offsetHeight;
                var scrollDiff = cardScrollHeight - cardCurrHeight;
                _this.setState({
                    heightOffset: _this.state.heightOffset + scrollDiff
                });
                if (positioningContainerMainElem.offsetHeight < _this.props.finalHeight) {
                    _this._setHeightOffsetEveryFrame();
                }
                else {
                    _this._async.cancelAnimationFrame(_this._setHeightOffsetTimer);
                }
            });
        }
    };
    PositioningContainer.prototype._getTarget = function (props) {
        if (props === void 0) { props = this.props; }
        var target = props.target;
        return target;
    };
    PositioningContainer.defaultProps = {
        preventDismissOnScroll: false,
        offsetFromTarget: 0,
        minPagePadding: 8,
        directionalHint: _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_4__["DirectionalHint"].bottomAutoEdge
    };
    return PositioningContainer;
}(_Utilities__WEBPACK_IMPORTED_MODULE_5__["BaseComponent"]));

//# sourceMappingURL=PositioningContainer.js.map

/***/ }),

/***/ "WZug":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/foundation/7.7.36_052fcf153ec79c77e0d1778fd73206f7/node_modules/@uifabric/foundation/lib/slots.js ***!
  \***************************************************************************************************************************************************************************************************/
/*! exports provided: withSlots, createFactory, getSlots */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withSlots", function() { return withSlots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return createFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSlots", function() { return getSlots; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @uifabric/merge-styles */ "Uhjc");
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @uifabric/utilities */ "BJrP");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utilities */ "6cx9");





/**
 * This function is required for any module that uses slots.
 *
 * This function is a slot resolver that automatically evaluates slot functions to generate React elements.
 * A byproduct of this resolver is that it removes slots from the React hierarchy by bypassing React.createElement.
 *
 * To use this function on a per-file basis, use the jsx directive targeting withSlots.
 * This directive must be the FIRST LINE in the file to work correctly.
 * Usage of this pragma also requires withSlots import statement.
 *
 * See React.createElement
 */
// Can't use typeof on React.createElement since it's overloaded. Approximate createElement's signature for now
// and widen as needed.
function withSlots(type, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var slotType = type;
    if (slotType.isSlot) {
        // TODO: There is something weird going on here with children embedded in props vs. rest args.
        // Comment out these lines to see. Make sure this function is doing the right things.
        var numChildren = react__WEBPACK_IMPORTED_MODULE_1__["Children"].count(children);
        if (numChildren === 0) {
            return slotType(props);
        }
        // Since we are bypassing createElement, use React.Children.toArray to make sure children are
        // properly assigned keys.
        // TODO: should this be mutating? does React mutate children subprop with createElement?
        // TODO: will toArray clobber existing keys?
        // TODO: React generates warnings because it doesn't detect hidden member _store that is set in createElement.
        //        Even children passed to createElement without keys don't generate this warning.
        //        Is there a better way to prevent slots from appearing in hierarchy? toArray doesn't address root issue.
        children = react__WEBPACK_IMPORTED_MODULE_1__["Children"].toArray(children);
        return slotType(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, props), { children: children }));
    }
    else {
        // TODO: Are there some cases where children should NOT be spread? Also, spreading reraises perf question.
        //        Children had to be spread to avoid breaking KeytipData in Toggle.view:
        //        react-dom.development.js:18931 Uncaught TypeError: children is not a function
        //        Without spread, function child is a child array of one element
        // TODO: is there a reason this can't be:
        // return React.createElement.apply(this, arguments);
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"].apply(react__WEBPACK_IMPORTED_MODULE_1__, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArrays"])([type, props], children));
    }
}
/**
 * This function creates factories that render ouput depending on the user ISlotProp props passed in.
 * @param DefaultComponent - Base component to render when not overridden by user props.
 * @param options - Factory options, including defaultProp value for shorthand prop mapping.
 * @returns ISlotFactory function used for rendering slots.
 */
function createFactory(DefaultComponent, options) {
    if (options === void 0) { options = {}; }
    var _a = options.defaultProp, defaultProp = _a === void 0 ? 'children' : _a;
    var result = function (componentProps, userProps, userSlotOptions, defaultStyles, theme) {
        // If they passed in raw JSX, just return that.
        if (react__WEBPACK_IMPORTED_MODULE_1__["isValidElement"](userProps)) {
            return userProps;
        }
        var flattenedUserProps = _translateShorthand(defaultProp, userProps);
        var finalProps = _constructFinalProps(defaultStyles, theme, componentProps, flattenedUserProps);
        if (userSlotOptions) {
            if (userSlotOptions.component) {
                // TODO: Remove cast if possible. This cast is needed because TS errors on the intrinsic portion of ReactType.
                // return <userSlotOptions.component {...finalProps} />;
                var UserComponent = userSlotOptions.component;
                return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](UserComponent, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, finalProps));
            }
            if (userSlotOptions.render) {
                return userSlotOptions.render(finalProps, DefaultComponent);
            }
        }
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](DefaultComponent, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, finalProps));
    };
    return result;
}
/**
 * Default factory for components without explicit factories.
 */
var defaultFactory = Object(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_3__["memoizeFunction"])(function (type) { return createFactory(type); });
/**
 * This function generates slots that can be used in JSX given a definition of slots and their corresponding types.
 * @param userProps - Props as pass to component.
 * @param slots - Slot definition object defining the default slot component for each slot.
 * @returns A set of created slots that components can render in JSX.
 */
function getSlots(userProps, slots) {
    var result = {};
    // userProps already has default props mixed in by createComponent. Recast here to gain typing for this function.
    var mixedProps = userProps;
    var _loop_1 = function (name_1) {
        if (slots.hasOwnProperty(name_1)) {
            // This closure method requires the use of withSlots to prevent unnecessary rerenders. This is because React
            // detects each closure as a different component (since it is a new instance) from the previous one and then
            // forces a rerender of the entire slot subtree. For now, the only way to avoid this is to use withSlots, which
            // bypasses the call to React.createElement.
            var slot = function (componentProps) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (args.length > 0) {
                    // If React.createElement is being incorrectly used with slots, there will be additional arguments.
                    // We can detect these additional arguments and error on their presence.
                    throw new Error('Any module using getSlots must use withSlots. Please see withSlots javadoc for more info.');
                }
                // TODO: having TS infer types here seems to cause infinite loop.
                //   use explicit types or casting to preserve typing if possible.
                // TODO: this should be a lookup on TProps property instead of being TProps directly, which is probably
                //   causing the infinite loop
                return _renderSlot(slots[name_1], 
                // TODO: this cast to any is hiding a relationship issue between the first two args
                componentProps, mixedProps[name_1], mixedProps.slots && mixedProps.slots[name_1], 
                // _defaultStyles should always be present, but a check for existence is added to make view tests
                // easier to use.
                mixedProps._defaultStyles && mixedProps._defaultStyles[name_1], mixedProps.theme);
            };
            slot.isSlot = true;
            result[name_1] = slot;
        }
    };
    for (var name_1 in slots) {
        _loop_1(name_1);
    }
    return result;
}
/**
 * Helper function that translates shorthand as needed.
 * @param defaultProp
 * @param slotProps
 */
function _translateShorthand(defaultProp, slotProps) {
    var _a;
    var transformedProps;
    if (typeof slotProps === 'string' || typeof slotProps === 'number' || typeof slotProps === 'boolean') {
        transformedProps = (_a = {},
            _a[defaultProp] = slotProps,
            _a);
    }
    else {
        transformedProps = slotProps;
    }
    return transformedProps;
}
/**
 * Helper function that constructs final styles and props given a series of props ordered by increasing priority.
 */
function _constructFinalProps(defaultStyles, theme) {
    var allProps = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        allProps[_i - 2] = arguments[_i];
    }
    var finalProps = {};
    var classNames = [];
    for (var _a = 0, allProps_1 = allProps; _a < allProps_1.length; _a++) {
        var props = allProps_1[_a];
        classNames.push(props && props.className);
        Object(_utilities__WEBPACK_IMPORTED_MODULE_4__["assign"])(finalProps, props);
    }
    finalProps.className = Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_2__["mergeCss"])([defaultStyles, classNames], { rtl: Object(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_3__["getRTL"])(theme) });
    return finalProps;
}
/**
 * Render a slot given component and user props. Uses component factory if available, otherwise falls back
 * to default factory.
 * @param ComponentType Factory component type.
 * @param componentProps The properties passed into slot from within the component.
 * @param userProps The user properties passed in from outside of the component.
 */
function _renderSlot(ComponentType, componentProps, userProps, slotOptions, defaultStyles, theme) {
    if (ComponentType.create !== undefined) {
        return ComponentType.create(componentProps, userProps, slotOptions, defaultStyles);
    }
    else {
        // TODO: need to resolve typing / generic issues passing through memoizeFunction. for now, cast to 'unknown'
        return defaultFactory(ComponentType)(componentProps, userProps, slotOptions, defaultStyles, theme);
    }
}
//# sourceMappingURL=slots.js.map

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

/***/ "d1gO":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Stack/StackItem/StackItem.js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: StackItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StackItem", function() { return StackItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Foundation */ "3wan");
/* harmony import */ var _StackItem_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StackItem.styles */ "2svy");
/** @jsx withSlots */



var StackItemView = function (props) {
    var children = props.children;
    if (react__WEBPACK_IMPORTED_MODULE_0__["Children"].count(children) < 1) {
        return null;
    }
    var Slots = Object(_Foundation__WEBPACK_IMPORTED_MODULE_1__["getSlots"])(props, {
        root: 'div'
    });
    return Object(_Foundation__WEBPACK_IMPORTED_MODULE_1__["withSlots"])(Slots.root, null, children);
};
var StackItem = Object(_Foundation__WEBPACK_IMPORTED_MODULE_1__["createComponent"])(StackItemView, {
    displayName: 'StackItem',
    styles: _StackItem_styles__WEBPACK_IMPORTED_MODULE_2__["StackItemStyles"]
});
/* harmony default export */ __webpack_exports__["default"] = (StackItem);
//# sourceMappingURL=StackItem.js.map

/***/ }),

/***/ "d6B5":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/TeachingBubble/index.js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! exports provided: TeachingBubble, TeachingBubbleBase, TeachingBubbleContent, TeachingBubbleContentBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TeachingBubble__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TeachingBubble */ "250y");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TeachingBubble", function() { return _TeachingBubble__WEBPACK_IMPORTED_MODULE_0__["TeachingBubble"]; });

/* harmony import */ var _TeachingBubble_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TeachingBubble.base */ "CCi3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TeachingBubbleBase", function() { return _TeachingBubble_base__WEBPACK_IMPORTED_MODULE_1__["TeachingBubbleBase"]; });

/* harmony import */ var _TeachingBubbleContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TeachingBubbleContent */ "L1BH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TeachingBubbleContent", function() { return _TeachingBubbleContent__WEBPACK_IMPORTED_MODULE_2__["TeachingBubbleContent"]; });

/* harmony import */ var _TeachingBubbleContent_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TeachingBubbleContent.base */ "O765");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TeachingBubbleContentBase", function() { return _TeachingBubbleContent_base__WEBPACK_IMPORTED_MODULE_3__["TeachingBubbleContentBase"]; });





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "ezOP":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Stack/Stack.styles.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _StackUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StackUtils */ "KehA");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_2__);



var nameMap = {
    start: 'flex-start',
    end: 'flex-end'
};
var GlobalClassNames = {
    root: 'ms-Stack',
    inner: 'ms-Stack-inner'
};
var styles = function (props, theme, tokens) {
    var _a, _b, _c, _d, _e, _f, _g;
    var verticalFill = props.verticalFill, horizontal = props.horizontal, reversed = props.reversed, gap = props.gap, grow = props.grow, wrap = props.wrap, horizontalAlign = props.horizontalAlign, verticalAlign = props.verticalAlign, disableShrink = props.disableShrink, className = props.className;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_2__["getGlobalClassNames"])(GlobalClassNames, theme);
    var childrenGap = tokens && tokens.childrenGap ? tokens.childrenGap : gap;
    var maxHeight = tokens && tokens.maxHeight ? tokens.maxHeight : props.maxHeight;
    var maxWidth = tokens && tokens.maxWidth ? tokens.maxWidth : props.maxWidth;
    var padding = tokens && tokens.padding ? tokens.padding : props.padding;
    var _h = Object(_StackUtils__WEBPACK_IMPORTED_MODULE_1__["parseGap"])(childrenGap, theme), rowGap = _h.rowGap, columnGap = _h.columnGap;
    var horizontalMargin = "" + -0.5 * columnGap.value + columnGap.unit;
    var verticalMargin = "" + -0.5 * rowGap.value + rowGap.unit;
    // styles to be applied to all direct children regardless of wrap or direction
    var childStyles = {
        textOverflow: 'ellipsis'
    };
    // selectors to be applied regardless of wrap or direction
    var commonSelectors = {
        // flexShrink styles are applied by the StackItem
        '> *:not(.ms-StackItem)': {
            flexShrink: disableShrink ? 0 : 1
        }
    };
    if (wrap) {
        return {
            root: [
                classNames.root,
                {
                    flexWrap: 'wrap',
                    maxWidth: maxWidth,
                    maxHeight: maxHeight,
                    width: 'auto',
                    overflow: 'visible',
                    height: '100%'
                },
                horizontalAlign && (_a = {},
                    _a[horizontal ? 'justifyContent' : 'alignItems'] = nameMap[horizontalAlign] || horizontalAlign,
                    _a),
                verticalAlign && (_b = {},
                    _b[horizontal ? 'alignItems' : 'justifyContent'] = nameMap[verticalAlign] || verticalAlign,
                    _b),
                className,
                {
                    // not allowed to be overridden by className
                    // since this is necessary in order to prevent collapsing margins
                    display: 'flex'
                },
                horizontal && {
                    height: verticalFill ? '100%' : 'auto'
                }
            ],
            inner: [
                classNames.inner,
                {
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginLeft: horizontalMargin,
                    marginRight: horizontalMargin,
                    marginTop: verticalMargin,
                    marginBottom: verticalMargin,
                    overflow: 'visible',
                    boxSizing: 'border-box',
                    padding: Object(_StackUtils__WEBPACK_IMPORTED_MODULE_1__["parsePadding"])(padding, theme),
                    // avoid unnecessary calc() calls if horizontal gap is 0
                    width: columnGap.value === 0 ? '100%' : "calc(100% + " + columnGap.value + columnGap.unit + ")",
                    maxWidth: '100vw',
                    selectors: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ '> *': tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ margin: "" + 0.5 * rowGap.value + rowGap.unit + " " + 0.5 * columnGap.value + columnGap.unit }, childStyles) }, commonSelectors)
                },
                horizontalAlign && (_c = {},
                    _c[horizontal ? 'justifyContent' : 'alignItems'] = nameMap[horizontalAlign] || horizontalAlign,
                    _c),
                verticalAlign && (_d = {},
                    _d[horizontal ? 'alignItems' : 'justifyContent'] = nameMap[verticalAlign] || verticalAlign,
                    _d),
                horizontal && {
                    flexDirection: reversed ? 'row-reverse' : 'row',
                    // avoid unnecessary calc() calls if vertical gap is 0
                    height: rowGap.value === 0 ? '100%' : "calc(100% + " + rowGap.value + rowGap.unit + ")",
                    selectors: {
                        '> *': {
                            maxWidth: columnGap.value === 0 ? '100%' : "calc(100% - " + columnGap.value + columnGap.unit + ")"
                        }
                    }
                },
                !horizontal && {
                    flexDirection: reversed ? 'column-reverse' : 'column',
                    height: "calc(100% + " + rowGap.value + rowGap.unit + ")",
                    selectors: {
                        '> *': {
                            maxHeight: rowGap.value === 0 ? '100%' : "calc(100% - " + rowGap.value + rowGap.unit + ")"
                        }
                    }
                }
            ]
        };
    }
    return {
        root: [
            classNames.root,
            {
                display: 'flex',
                flexDirection: horizontal ? (reversed ? 'row-reverse' : 'row') : reversed ? 'column-reverse' : 'column',
                flexWrap: 'nowrap',
                width: 'auto',
                height: verticalFill ? '100%' : 'auto',
                maxWidth: maxWidth,
                maxHeight: maxHeight,
                padding: Object(_StackUtils__WEBPACK_IMPORTED_MODULE_1__["parsePadding"])(padding, theme),
                boxSizing: 'border-box',
                selectors: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]((_e = { '> *': childStyles }, _e[reversed ? '> *:not(:last-child)' : '> *:not(:first-child)'] = [
                    horizontal && {
                        marginLeft: "" + columnGap.value + columnGap.unit
                    },
                    !horizontal && {
                        marginTop: "" + rowGap.value + rowGap.unit
                    }
                ], _e), commonSelectors)
            },
            grow && {
                flexGrow: grow === true ? 1 : grow
            },
            horizontalAlign && (_f = {},
                _f[horizontal ? 'justifyContent' : 'alignItems'] = nameMap[horizontalAlign] || horizontalAlign,
                _f),
            verticalAlign && (_g = {},
                _g[horizontal ? 'alignItems' : 'justifyContent'] = nameMap[verticalAlign] || verticalAlign,
                _g),
            className
        ]
        // TODO: this cast may be hiding some potential issues with styling and name
        //        lookups and should be removed
    };
};
//# sourceMappingURL=Stack.styles.js.map

/***/ }),

/***/ "h3rG":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/foundation/7.7.36_052fcf153ec79c77e0d1778fd73206f7/node_modules/@uifabric/foundation/lib/index.js ***!
  \***************************************************************************************************************************************************************************************************/
/*! exports provided: legacyStyled, createComponent, withSlots, createFactory, getSlots, ThemeProvider, useControlledState, getControlledDerivedProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createComponent */ "4Tkz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createComponent", function() { return _createComponent__WEBPACK_IMPORTED_MODULE_0__["createComponent"]; });

/* harmony import */ var _slots__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slots */ "WZug");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withSlots", function() { return _slots__WEBPACK_IMPORTED_MODULE_1__["withSlots"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return _slots__WEBPACK_IMPORTED_MODULE_1__["createFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSlots", function() { return _slots__WEBPACK_IMPORTED_MODULE_1__["getSlots"]; });

/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThemeProvider */ "hw/T");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__["ThemeProvider"]; });

/* harmony import */ var _hooks_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hooks/index */ "BLKp");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useControlledState", function() { return _hooks_index__WEBPACK_IMPORTED_MODULE_3__["useControlledState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getControlledDerivedProps", function() { return _hooks_index__WEBPACK_IMPORTED_MODULE_3__["getControlledDerivedProps"]; });

/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @uifabric/utilities */ "BJrP");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "legacyStyled", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_4__["styled"]; });

/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./version */ "mUDG");






//# sourceMappingURL=index.js.map

/***/ }),

/***/ "hICi":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/TeachingBubble/TeachingBubble.styles.js ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var globalClassNames = {
    root: 'ms-TeachingBubble',
    body: 'ms-TeachingBubble-body',
    bodyContent: 'ms-TeachingBubble-bodycontent',
    closeButton: 'ms-TeachingBubble-closebutton',
    content: 'ms-TeachingBubble-content',
    footer: 'ms-TeachingBubble-footer',
    header: 'ms-TeachingBubble-header',
    headerIsCondensed: 'ms-TeachingBubble-header--condensed',
    headerIsSmall: 'ms-TeachingBubble-header--small',
    headerIsLarge: 'ms-TeachingBubble-header--large',
    headline: 'ms-TeachingBubble-headline',
    image: 'ms-TeachingBubble-image',
    primaryButton: 'ms-TeachingBubble-primaryButton',
    secondaryButton: 'ms-TeachingBubble-secondaryButton',
    subText: 'ms-TeachingBubble-subText',
    // TODO: Button global class name usage should be converted to a styles function once
    //        Button supports JS styling, which means these button names can be removed.
    button: 'ms-Button',
    buttonLabel: 'ms-Button-label'
};
var opacityFadeIn = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
    '0%': {
        opacity: 0,
        animationTimingFunction: _Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].easeFunction1,
        transform: 'scale3d(.90,.90,.90)'
    },
    '100%': {
        opacity: 1,
        transform: 'scale3d(1,1,1)'
    }
});
var rootStyle = function (isWide) {
    return [
        {
            display: 'block',
            maxWidth: 364,
            border: 0,
            outline: 'transparent',
            width: 'calc(100% + 1px)',
            animationName: "" + opacityFadeIn,
            animationDuration: '300ms',
            animationTimingFunction: 'linear',
            animationFillMode: 'both'
        },
        isWide && {
            maxWidth: 456
        }
    ];
};
var headerStyle = function (classNames, hasCondensedHeadline, hasSmallHeadline) {
    if (hasCondensedHeadline) {
        return [
            classNames.headerIsCondensed,
            {
                marginBottom: 14
            }
        ];
    }
    return [
        hasSmallHeadline && classNames.headerIsSmall,
        !hasSmallHeadline && classNames.headerIsLarge,
        {
            selectors: {
                ':not(:last-child)': {
                    marginBottom: 14
                }
            }
        }
    ];
};
var getStyles = function (props) {
    var _a, _b, _c;
    var calloutClassName = props.calloutClassName, hasCondensedHeadline = props.hasCondensedHeadline, hasSmallHeadline = props.hasSmallHeadline, isWide = props.isWide, primaryButtonClassName = props.primaryButtonClassName, secondaryButtonClassName = props.secondaryButtonClassName, theme = props.theme;
    var hasLargeHeadline = !hasCondensedHeadline && !hasSmallHeadline;
    var palette = theme.palette, fonts = theme.fonts;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(globalClassNames, theme);
    return {
        root: [classNames.root, fonts.medium, calloutClassName],
        body: [
            classNames.body,
            {
                selectors: {
                    ':not(:last-child)': {
                        marginBottom: 20
                    }
                }
            }
        ],
        bodyContent: [
            classNames.bodyContent,
            {
                padding: '20px 24px 20px 24px'
            }
        ],
        closeButton: [
            classNames.closeButton,
            {
                position: 'absolute',
                right: 0,
                top: 0,
                margin: '15px 15px 0 0',
                borderRadius: 0,
                color: palette.white,
                fontSize: fonts.small.fontSize,
                selectors: {
                    ':hover': {
                        background: palette.themeDarkAlt,
                        color: palette.white
                    },
                    ':active': {
                        background: palette.themeDark,
                        color: palette.white
                    }
                }
            }
        ],
        content: [
            classNames.content
        ].concat(rootStyle(isWide), [
            isWide && {
                display: 'flex'
            }
        ]),
        footer: [
            classNames.footer,
            {
                display: 'flex',
                flex: 'auto',
                alignItems: 'center',
                color: palette.white,
                selectors: (_a = {},
                    // TODO: global class name usage should be converted to a button styles function once Button supports JS styling
                    _a["." + classNames.button + ":not(:first-child)"] = {
                        marginLeft: 10
                    },
                    _a)
            }
        ],
        header: [
            classNames.header
        ].concat(headerStyle(classNames, hasCondensedHeadline, hasSmallHeadline), [
            (hasCondensedHeadline || hasSmallHeadline) && [
                fonts.medium,
                {
                    marginRight: 24,
                    fontWeight: _Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].semibold
                }
            ]
        ]),
        headline: [
            classNames.headline,
            {
                margin: 0,
                color: palette.white,
                fontWeight: _Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].semibold
            },
            hasLargeHeadline && [
                {
                    fontSize: fonts.xLarge.fontSize
                }
            ]
        ],
        imageContent: [
            classNames.header,
            classNames.image,
            isWide && {
                display: 'flex',
                alignItems: 'center',
                maxWidth: 154
            }
        ],
        primaryButton: [
            classNames.primaryButton,
            primaryButtonClassName,
            {
                backgroundColor: palette.white,
                borderColor: palette.white,
                color: palette.themePrimary,
                whiteSpace: 'nowrap',
                selectors: (_b = {},
                    // TODO: global class name usage should be converted to a button styles function once Button supports JS styling
                    _b["." + classNames.buttonLabel] = fonts.medium,
                    _b[':hover'] = {
                        backgroundColor: palette.themeLighter,
                        borderColor: palette.themeLighter,
                        color: palette.themePrimary
                    },
                    _b[':focus'] = {
                        backgroundColor: palette.themeLighter,
                        borderColor: palette.white
                    },
                    _b[':active'] = {
                        backgroundColor: palette.white,
                        borderColor: palette.white,
                        color: palette.themePrimary
                    },
                    _b)
            }
        ],
        secondaryButton: [
            classNames.secondaryButton,
            secondaryButtonClassName,
            {
                backgroundColor: palette.themePrimary,
                borderColor: palette.white,
                whiteSpace: 'nowrap',
                selectors: (_c = {},
                    // TODO: global class name usage should be converted to a button styles function once Button supports JS styling
                    _c["." + classNames.buttonLabel] = [
                        fonts.medium,
                        {
                            color: palette.white
                        }
                    ],
                    _c['&:hover, &:focus'] = {
                        backgroundColor: palette.themeDarkAlt,
                        borderColor: palette.white
                    },
                    _c[':active'] = {
                        backgroundColor: palette.themePrimary,
                        borderColor: palette.white
                    },
                    _c)
            }
        ],
        subText: [
            classNames.subText,
            {
                margin: 0,
                fontSize: fonts.medium.fontSize,
                color: palette.white,
                fontWeight: _Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].regular
            }
        ],
        subComponentStyles: {
            callout: {
                root: rootStyle(isWide).concat([fonts.medium]),
                beak: [
                    {
                        background: palette.themePrimary
                    }
                ],
                calloutMain: [
                    {
                        background: palette.themePrimary
                    }
                ]
            }
        }
    };
};
//# sourceMappingURL=TeachingBubble.styles.js.map

/***/ }),

/***/ "hw/T":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/foundation/7.7.36_052fcf153ec79c77e0d1778fd73206f7/node_modules/@uifabric/foundation/lib/ThemeProvider.js ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: ThemeProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return ThemeProvider; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _uifabric_styling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @uifabric/styling */ "pjSQ");
/* harmony import */ var _uifabric_styling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_uifabric_styling__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @uifabric/utilities */ "BJrP");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_3__);




/**
 * Theme provider is a simplified version of Customizer that activates the appropriate theme data
 * for a given scheme name.
 *
 * @param providers - Injected providers for accessing theme data and providing it via a Customizer component.
 */
var ThemeProvider = function (props) {
    var scheme = props.scheme, theme = props.theme, rest = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(props, ["scheme", "theme"]);
    // TODO: consider merging implementation with theme-proto, which only stores a reference / scheme name to theme
    //   in context and uses quick global store accessor to trigger change by passing in theme object as child and
    //   triggering re-render. (perf benefits need verification)
    var contextTransform = function (context) {
        return Object(_uifabric_styling__WEBPACK_IMPORTED_MODULE_2__["getThemedContext"])(context, scheme, theme);
    };
    // eslint-disable-next-line react/jsx-no-bind
    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_uifabric_utilities__WEBPACK_IMPORTED_MODULE_3__["Customizer"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, rest, { contextTransform: contextTransform }));
};
//# sourceMappingURL=ThemeProvider.js.map

/***/ }),

/***/ "j9GC":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/foundation/7.7.36_052fcf153ec79c77e0d1778fd73206f7/node_modules/@uifabric/foundation/lib/hooks/controlled.js ***!
  \**************************************************************************************************************************************************************************************************************/
/*! exports provided: useControlledState, getControlledDerivedProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useControlledState", function() { return useControlledState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getControlledDerivedProps", function() { return getControlledDerivedProps; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Controlled state helper that gives priority to props value. Useful for components that have props with both
 * controlled and uncontrolled modes. Any props values will override state, but will not update internal state.
 * If prop is defined and then later undefined, state will revert to its previous value.
 *
 * @param props - The props object containing controlled prop values.
 * @param propName - The controlled prop name.
 * @param options - Options. defaultPropValue is only used if defaultPropName (or its value) is undefined.
 */
function useControlledState(props, propName, options) {
    var defaultValue;
    if (options) {
        if (options.defaultPropName && props[options.defaultPropName] !== undefined) {
            // No easy way to coerce TProps[TDefaultProp] to match TProps[TProp] in generic typings, so cast it here.
            defaultValue = props[options.defaultPropName];
        }
        else {
            defaultValue = options && options.defaultPropValue;
        }
    }
    var _a = react__WEBPACK_IMPORTED_MODULE_0__["useState"](defaultValue), state = _a[0], setState = _a[1];
    if (props[propName] !== undefined) {
        return [props[propName], setState];
    }
    else {
        return [state, setState];
    }
}
/**
 * Simple controlled helper that gives priority to props value and falls back to derived value.
 *
 * @param props - The props object containing controlled prop values.
 * @param propName - The controlled prop name.
 * @param derivedValue - Derived value. Returned when controlled value is not present.
 */
function getControlledDerivedProps(props, propName, derivedValue) {
    if (props[propName] !== undefined) {
        return props[propName];
    }
    else {
        return derivedValue;
    }
}
//# sourceMappingURL=controlled.js.map

/***/ }),

/***/ "jl7f":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Coachmark/Coachmark.js ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: Coachmark */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Coachmark", function() { return Coachmark; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Coachmark_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Coachmark.styles */ "J8cx");
/* harmony import */ var _Coachmark_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Coachmark.base */ "3k5I");



var Coachmark = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Coachmark_base__WEBPACK_IMPORTED_MODULE_2__["CoachmarkBase"], _Coachmark_styles__WEBPACK_IMPORTED_MODULE_1__["getStyles"], undefined, {
    scope: 'Coachmark'
});
//# sourceMappingURL=Coachmark.js.map

/***/ }),

/***/ "mAxR":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/positioning.js ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: Rectangle, __positioningTestPackage, positionElement, positionCallout, positionCard, getMaxHeight, getOppositeEdge, RectangleEdge, Position */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _positioning_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./positioning/index */ "AYr4");
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

/***/ "mUDG":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/foundation/7.7.36_052fcf153ec79c77e0d1778fd73206f7/node_modules/@uifabric/foundation/lib/version.js ***!
  \*****************************************************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uifabric_set_version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/set-version */ "LCDl");
// Do not modify this file; it is generated as part of publish.
// The checked in version is a placeholder only and will not be updated.

Object(_uifabric_set_version__WEBPACK_IMPORTED_MODULE_0__["setVersion"])('@uifabric/foundation', '7.7.36');
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "npfW":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/positioning/positioning.js ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/DirectionalHint */ "zCYU");
/* harmony import */ var _common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_common_DirectionalHint__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _positioning_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./positioning.types */ "8t9d");
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

/***/ "pjSQ":
/*!************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/styling/7.14.2/node_modules/@uifabric/styling/lib/index.js ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @uifabric/styling/index.js
var pkg = __webpack_require__(/*! @ms/uifabric-styling-bundle */ "fglE");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "q8AU":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/FocusTrapZone.js ***!
  \***************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/FocusTrapZone.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "rvHd":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Stack/Stack.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: Stack, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stack", function() { return Stack; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Foundation */ "3wan");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Stack_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Stack.styles */ "ezOP");
/* harmony import */ var _StackItem_StackItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./StackItem/StackItem */ "d1gO");

/** @jsx withSlots */





var StackView = function (props) {
    var _a = props.as, RootType = _a === void 0 ? 'div' : _a, disableShrink = props.disableShrink, wrap = props.wrap, rest = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](props, ["as", "disableShrink", "wrap"]);
    Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["warnDeprecations"])('Stack', props, {
        gap: 'tokens.childrenGap',
        maxHeight: 'tokens.maxHeight',
        maxWidth: 'tokens.maxWidth',
        padding: 'tokens.padding'
    });
    var stackChildren = react__WEBPACK_IMPORTED_MODULE_1__["Children"].map(props.children, function (child, index) {
        if (!child) {
            return null;
        }
        if (_isStackItem(child)) {
            var defaultItemProps = {
                shrink: !disableShrink
            };
            return react__WEBPACK_IMPORTED_MODULE_1__["cloneElement"](child, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, defaultItemProps, child.props));
        }
        return child;
    });
    var nativeProps = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getNativeProps"])(rest, _Utilities__WEBPACK_IMPORTED_MODULE_3__["htmlElementProperties"]);
    var Slots = Object(_Foundation__WEBPACK_IMPORTED_MODULE_2__["getSlots"])(props, {
        root: RootType,
        inner: 'div'
    });
    if (wrap) {
        return (Object(_Foundation__WEBPACK_IMPORTED_MODULE_2__["withSlots"])(Slots.root, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, nativeProps),
            Object(_Foundation__WEBPACK_IMPORTED_MODULE_2__["withSlots"])(Slots.inner, null, stackChildren)));
    }
    return Object(_Foundation__WEBPACK_IMPORTED_MODULE_2__["withSlots"])(Slots.root, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, nativeProps), stackChildren);
};
function _isStackItem(item) {
    // In theory, we should be able to just check item.type === StackItem.
    // However, under certain unclear circumstances (see https://github.com/OfficeDev/office-ui-fabric-react/issues/10785),
    // the object identity is different despite the function implementation being the same.
    return (!!item &&
        typeof item === 'object' &&
        !!item.type &&
        // StackItem is generated by createComponent, so we need to check its displayName instead of name
        item.type.displayName === _StackItem_StackItem__WEBPACK_IMPORTED_MODULE_5__["StackItem"].displayName);
}
var StackStatics = {
    Item: _StackItem_StackItem__WEBPACK_IMPORTED_MODULE_5__["StackItem"]
};
var Stack = Object(_Foundation__WEBPACK_IMPORTED_MODULE_2__["createComponent"])(StackView, {
    displayName: 'Stack',
    styles: _Stack_styles__WEBPACK_IMPORTED_MODULE_4__["styles"],
    statics: StackStatics
});
/* harmony default export */ __webpack_exports__["default"] = (Stack);
//# sourceMappingURL=Stack.js.map

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
//# sourceMappingURL=chunk.vendors~sp-feature-host_d1916028515f09477960.js.map