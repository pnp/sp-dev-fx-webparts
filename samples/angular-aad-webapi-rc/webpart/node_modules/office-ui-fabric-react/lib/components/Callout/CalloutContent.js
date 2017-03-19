"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable:no-unused-variable */
var React = require('react');
var DirectionalHint_1 = require('../../common/DirectionalHint');
var Utilities_1 = require('../../Utilities');
var positioning_1 = require('../../utilities/positioning');
var focus_1 = require('../../utilities/focus');
var Utilities_2 = require('../../Utilities');
var Popup_1 = require('../../Popup');
var BaseComponent_1 = require('../../common/BaseComponent');
require('./Callout.scss');
var BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
var OFF_SCREEN_POSITION = { top: -9999, left: 0 };
var BORDER_WIDTH = 1;
var SPACE_FROM_EDGE = 8;
var CalloutContent = (function (_super) {
    __extends(CalloutContent, _super);
    function CalloutContent(props) {
        _super.call(this, props, { 'beakStyle': 'beakWidth' });
        this._didSetInitialFocus = false;
        this.state = {
            positions: null,
            slideDirectionalClassName: null,
            calloutElementRect: null
        };
        this._positionAttempts = 0;
    }
    CalloutContent.prototype.componentDidUpdate = function () {
        this._setInitialFocus();
        this._updatePosition();
    };
    CalloutContent.prototype.componentWillMount = function () {
        var target = this.props.targetElement ? this.props.targetElement : this.props.target;
        this._setTargetWindowAndElement(target);
    };
    CalloutContent.prototype.componentWillUpdate = function (newProps) {
        if (newProps.targetElement !== this.props.targetElement || newProps.target !== this.props.target) {
            var newTarget = newProps.targetElement ? newProps.targetElement : newProps.target;
            this._setTargetWindowAndElement(newTarget);
        }
    };
    CalloutContent.prototype.componentDidMount = function () {
        this._onComponentDidMount();
    };
    CalloutContent.prototype.render = function () {
        // If there is no target window then we are likely in server side rendering and we should not render anything.
        if (!this._targetWindow) {
            return null;
        }
        var _a = this.props, className = _a.className, target = _a.target, targetElement = _a.targetElement, isBeakVisible = _a.isBeakVisible, beakStyle = _a.beakStyle, children = _a.children, beakWidth = _a.beakWidth;
        var _b = this.state, positions = _b.positions, slideDirectionalClassName = _b.slideDirectionalClassName;
        var beakStyleWidth = beakWidth;
        // This is here to support the old way of setting the beak size until version 1.0.0.
        // beakStyle is now deprecated and will be be removed at version 1.0.0
        if (beakStyle === 'ms-Callout-smallbeak') {
            beakStyleWidth = 16;
        }
        var beakReactStyle = {
            top: positions && positions.beak ? positions.beak.top : BEAK_ORIGIN_POSITION.top,
            left: positions && positions.beak ? positions.beak.left : BEAK_ORIGIN_POSITION.left,
            height: beakStyleWidth,
            width: beakStyleWidth
        };
        var contentMaxHeight = this._getMaxHeight();
        var beakVisible = isBeakVisible && (!!targetElement || !!target);
        var content = (React.createElement("div", {ref: this._resolveRef('_hostElement'), className: 'ms-Callout-container'}, 
            React.createElement("div", {className: Utilities_1.css('ms-Callout', className, slideDirectionalClassName ? "ms-u-" + slideDirectionalClassName : ''), style: positions ? positions.callout : OFF_SCREEN_POSITION, ref: this._resolveRef('_calloutElement')}, 
                beakVisible ? (React.createElement("div", {className: 'ms-Callout-beak', style: beakReactStyle})) : (null), 
                beakVisible ?
                    (React.createElement("div", {className: 'ms-Callout-beakCurtain'})) :
                    (null), 
                React.createElement(Popup_1.Popup, {className: 'ms-Callout-main', onDismiss: this.dismiss, shouldRestoreFocus: true, style: { maxHeight: contentMaxHeight }}, children))
        ));
        return content;
    };
    CalloutContent.prototype.dismiss = function (ev) {
        var onDismiss = this.props.onDismiss;
        if (onDismiss) {
            onDismiss(ev);
        }
    };
    CalloutContent.prototype._dismissOnLostFocus = function (ev) {
        var target = ev.target;
        if (ev.target !== this._targetWindow &&
            this._hostElement &&
            !Utilities_1.elementContains(this._hostElement, target) &&
            (this._target.stopPropagation ||
                (!this._target || (target !== this._target && !Utilities_1.elementContains(this._target, target))))) {
            this.dismiss(ev);
        }
    };
    CalloutContent.prototype._setInitialFocus = function () {
        if (this.props.setInitialFocus && !this._didSetInitialFocus && this.state.positions) {
            this._didSetInitialFocus = true;
            focus_1.focusFirstChild(this._calloutElement);
        }
    };
    CalloutContent.prototype._onComponentDidMount = function () {
        // This is added so the callout will dismiss when the window is scrolled
        // but not when something inside the callout is scrolled.
        this._events.on(this._targetWindow, 'scroll', this._dismissOnLostFocus, true);
        this._events.on(this._targetWindow, 'resize', this.dismiss, true);
        this._events.on(this._targetWindow, 'focus', this._dismissOnLostFocus, true);
        this._events.on(this._targetWindow, 'click', this._dismissOnLostFocus, true);
        if (this.props.onLayerMounted) {
            this.props.onLayerMounted();
        }
        this._updatePosition();
    };
    CalloutContent.prototype._updatePosition = function () {
        var positions = this.state.positions;
        var hostElement = this._hostElement;
        var calloutElement = this._calloutElement;
        if (hostElement && calloutElement) {
            var currentProps = void 0;
            currentProps = Utilities_2.assign(currentProps, this.props);
            currentProps.bounds = this._getBounds();
            // Temporary to be removed when targetElement is removed. Currently deprecated.
            if (this.props.targetElement) {
                currentProps.targetElement = this._target;
            }
            else {
                currentProps.target = this._target;
            }
            var positionInfo = positioning_1.getRelativePositions(currentProps, hostElement, calloutElement);
            // Set the new position only when the positions are not exists or one of the new callout positions are different.
            // The position should not change if the position is within 2 decimal places.
            if ((!positions && positionInfo) ||
                (positions && positionInfo &&
                    (positions.callout.top.toFixed(2) !== positionInfo.calloutPosition.top.toFixed(2) ||
                        positions.callout.left.toFixed(2) !== positionInfo.calloutPosition.left.toFixed(2))
                    && this._positionAttempts < 5)) {
                // We should not reposition the callout more than a few times, if it is then the content is likely resizing
                // and we should stop trying to reposition to prevent a stack overflow.
                this._positionAttempts++;
                this.setState({
                    positions: {
                        callout: positionInfo.calloutPosition,
                        beak: positionInfo.beakPosition,
                    },
                    slideDirectionalClassName: positionInfo.directionalClassName
                });
            }
            else {
                this._positionAttempts = 0;
            }
        }
    };
    CalloutContent.prototype._getBounds = function () {
        if (!this._bounds) {
            var currentBounds = this.props.bounds;
            if (!currentBounds) {
                currentBounds = {
                    top: 0 + SPACE_FROM_EDGE,
                    left: 0 + SPACE_FROM_EDGE,
                    right: this._targetWindow.innerWidth - SPACE_FROM_EDGE,
                    bottom: this._targetWindow.innerHeight - SPACE_FROM_EDGE,
                    width: this._targetWindow.innerWidth - SPACE_FROM_EDGE * 2,
                    height: this._targetWindow.innerHeight - SPACE_FROM_EDGE * 2
                };
            }
            this._bounds = currentBounds;
        }
        return this._bounds;
    };
    CalloutContent.prototype._getMaxHeight = function () {
        if (!this._maxHeight) {
            this._maxHeight = this._getBounds().height - BORDER_WIDTH * 2;
        }
        return this._maxHeight;
    };
    CalloutContent.prototype._setTargetWindowAndElement = function (target) {
        if (target) {
            if (typeof target === 'string') {
                var currentDoc = Utilities_1.getDocument();
                this._target = currentDoc ? currentDoc.querySelector(target) : null;
                this._targetWindow = Utilities_1.getWindow();
            }
            else if (target.stopPropagation) {
                this._target = target;
                this._targetWindow = Utilities_1.getWindow(target.toElement);
            }
            else {
                var targetElement = target;
                this._target = target;
                this._targetWindow = Utilities_1.getWindow(targetElement);
            }
        }
        else {
            this._targetWindow = Utilities_1.getWindow();
        }
    };
    CalloutContent.defaultProps = {
        isBeakVisible: true,
        beakWidth: 16,
        gapSpace: 16,
        directionalHint: DirectionalHint_1.DirectionalHint.bottomAutoEdge
    };
    __decorate([
        Utilities_1.autobind
    ], CalloutContent.prototype, "dismiss", null);
    __decorate([
        Utilities_1.autobind
    ], CalloutContent.prototype, "_setInitialFocus", null);
    __decorate([
        Utilities_1.autobind
    ], CalloutContent.prototype, "_onComponentDidMount", null);
    return CalloutContent;
}(BaseComponent_1.BaseComponent));
exports.CalloutContent = CalloutContent;

//# sourceMappingURL=CalloutContent.js.map
