"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var FocusZone_Props_1 = require('./FocusZone.Props');
var Utilities_1 = require('../../Utilities');
var focus_1 = require('../../utilities/focus');
var IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable';
var IS_ENTER_DISABLED_ATTRIBUTE = 'data-disable-click-on-enter';
var FOCUSZONE_ID_ATTRIBUTE = 'data-focuszone-id';
var TABINDEX = 'tabindex';
var _allInstances = {};
var ALLOWED_INPUT_TYPES = ['text', 'number', 'password', 'email', 'tel', 'url', 'search'];
var FocusZone = (function (_super) {
    __extends(FocusZone, _super);
    function FocusZone(props) {
        _super.call(this, props);
        this._id = Utilities_1.getId('FocusZone');
        _allInstances[this._id] = this;
        this._focusAlignment = {
            left: 0,
            top: 0
        };
    }
    FocusZone.prototype.componentDidMount = function () {
        var windowElement = this.refs.root.ownerDocument.defaultView;
        var parentElement = Utilities_1.getParent(this.refs.root);
        while (parentElement &&
            parentElement !== document.body &&
            parentElement.nodeType === 1) {
            if (focus_1.isElementFocusZone(parentElement)) {
                this._isInnerZone = true;
                break;
            }
            parentElement = Utilities_1.getParent(parentElement);
        }
        this._events.on(windowElement, 'keydown', this._onKeyDownCapture, true);
        // Assign initial tab indexes so that we can set initial focus as appropriate.
        this._updateTabIndexes();
        if (this.props.defaultActiveElement) {
            this._activeElement = Utilities_1.getDocument().querySelector(this.props.defaultActiveElement);
        }
    };
    FocusZone.prototype.componentWillUnmount = function () {
        delete _allInstances[this._id];
    };
    FocusZone.prototype.render = function () {
        var _a = this.props, rootProps = _a.rootProps, ariaLabelledBy = _a.ariaLabelledBy, className = _a.className;
        return (React.createElement("div", __assign({}, rootProps, {className: Utilities_1.css('ms-FocusZone', className), ref: 'root', "data-focuszone-id": this._id, "aria-labelledby": ariaLabelledBy, onKeyDown: this._onKeyDown, onFocus: this._onFocus}, { onMouseDownCapture: this._onMouseDown }), this.props.children));
    };
    /**
     * Sets focus to the first tabbable item in the zone.
     * @returns True if focus could be set to an active element, false if no operation was taken.
     */
    FocusZone.prototype.focus = function () {
        if (this._activeElement && Utilities_1.elementContains(this.refs.root, this._activeElement)) {
            this._activeElement.focus();
            return true;
        }
        else {
            var firstChild = this.refs.root.firstChild;
            return this.focusElement(focus_1.getNextElement(this.refs.root, firstChild, true));
        }
    };
    /**
     * Sets focus to a specific child element within the zone. This can be used in conjunction with
     * onBeforeFocus to created delayed focus scenarios (like animate the scroll position to the correct
     * location and then focus.)
     * @param {HTMLElement} element The child element within the zone to focus.
     * @returns True if focus could be set to an active element, false if no operation was taken.
     */
    FocusZone.prototype.focusElement = function (element) {
        var onBeforeFocus = this.props.onBeforeFocus;
        if (onBeforeFocus && !onBeforeFocus(element)) {
            return false;
        }
        if (element) {
            if (this._activeElement) {
                this._activeElement.tabIndex = -1;
            }
            this._activeElement = element;
            if (element) {
                if (!this._focusAlignment) {
                    this._setFocusAlignment(element, true, true);
                }
                this._activeElement.tabIndex = 0;
                element.focus();
                return true;
            }
        }
        return false;
    };
    FocusZone.prototype._onFocus = function (ev) {
        var onActiveElementChanged = this.props.onActiveElementChanged;
        if (this._isImmediateDescendantOfZone(ev.target)) {
            this._activeElement = ev.target;
            this._setFocusAlignment(this._activeElement);
        }
        else {
            var parentElement = ev.target;
            while (parentElement && parentElement !== this.refs.root) {
                if (focus_1.isElementTabbable(parentElement) && this._isImmediateDescendantOfZone(parentElement)) {
                    this._activeElement = parentElement;
                    break;
                }
                parentElement = Utilities_1.getParent(parentElement);
            }
        }
        if (onActiveElementChanged) {
            onActiveElementChanged(this._activeElement, ev);
        }
    };
    /**
     * Handle global tab presses so that we can patch tabindexes on the fly.
     */
    FocusZone.prototype._onKeyDownCapture = function (ev) {
        if (ev.which === Utilities_1.KeyCodes.tab) {
            this._updateTabIndexes();
        }
    };
    FocusZone.prototype._onMouseDown = function (ev) {
        var disabled = this.props.disabled;
        if (disabled) {
            return;
        }
        var target = ev.target;
        var path = [];
        while (target && target !== this.refs.root) {
            path.push(target);
            target = Utilities_1.getParent(target);
        }
        while (path.length) {
            target = path.pop();
            if (focus_1.isElementFocusZone(target)) {
                break;
            }
            else if (target && focus_1.isElementTabbable(target)) {
                target.tabIndex = 0;
                this._setFocusAlignment(target, true, true);
            }
        }
    };
    /**
     * Handle the keystrokes.
     */
    FocusZone.prototype._onKeyDown = function (ev) {
        var _a = this.props, direction = _a.direction, disabled = _a.disabled, isInnerZoneKeystroke = _a.isInnerZoneKeystroke;
        if (disabled) {
            return;
        }
        if (isInnerZoneKeystroke &&
            this._isImmediateDescendantOfZone(ev.target) &&
            isInnerZoneKeystroke(ev)) {
            // Try to focus
            var innerZone = this._getFirstInnerZone();
            if (!innerZone || !innerZone.focus()) {
                return;
            }
        }
        else {
            switch (ev.which) {
                case Utilities_1.KeyCodes.left:
                    if (direction !== FocusZone_Props_1.FocusZoneDirection.vertical && this._moveFocusLeft()) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.right:
                    if (direction !== FocusZone_Props_1.FocusZoneDirection.vertical && this._moveFocusRight()) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.up:
                    if (direction !== FocusZone_Props_1.FocusZoneDirection.horizontal && this._moveFocusUp()) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.down:
                    if (direction !== FocusZone_Props_1.FocusZoneDirection.horizontal && this._moveFocusDown()) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.home:
                    var firstChild = this.refs.root.firstChild;
                    if (this.focusElement(focus_1.getNextElement(this.refs.root, firstChild, true))) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.end:
                    var lastChild = this.refs.root.lastChild;
                    if (this.focusElement(focus_1.getPreviousElement(this.refs.root, lastChild, true, true, true))) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.enter:
                    if (this._tryInvokeClickForFocusable(ev.target)) {
                        break;
                    }
                    return;
                default:
                    return;
            }
        }
        ev.preventDefault();
        ev.stopPropagation();
    };
    /**
     * Walk up the dom try to find a focusable element.
     */
    FocusZone.prototype._tryInvokeClickForFocusable = function (target) {
        do {
            if (target.tagName === 'BUTTON' || target.tagName === 'A') {
                return false;
            }
            if (this._isImmediateDescendantOfZone(target) &&
                target.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true' &&
                target.getAttribute(IS_ENTER_DISABLED_ATTRIBUTE) !== 'true') {
                Utilities_1.EventGroup.raise(target, 'click', null, true);
                return true;
            }
            target = Utilities_1.getParent(target);
        } while (target !== this.refs.root);
        return false;
    };
    /**
     * Traverse to find first child zone.
     */
    FocusZone.prototype._getFirstInnerZone = function (rootElement) {
        rootElement = rootElement || this._activeElement || this.refs.root;
        var child = rootElement.firstElementChild;
        while (child) {
            if (focus_1.isElementFocusZone(child)) {
                return _allInstances[child.getAttribute(FOCUSZONE_ID_ATTRIBUTE)];
            }
            var match = this._getFirstInnerZone(child);
            if (match) {
                return match;
            }
            child = child.nextElementSibling;
        }
        return null;
    };
    FocusZone.prototype._moveFocus = function (isForward, getDistanceFromCenter, ev) {
        var element = this._activeElement;
        var candidateDistance = -1;
        var candidateElement;
        var changedFocus = false;
        var isBidirectional = this.props.direction === FocusZone_Props_1.FocusZoneDirection.bidirectional;
        if (!element) {
            return false;
        }
        if (this._isElementInput(element)) {
            if (!this._shouldInputLoseFocus(element, isForward)) {
                return false;
            }
        }
        var activeRect = isBidirectional ? element.getBoundingClientRect() : null;
        do {
            element = isForward ?
                focus_1.getNextElement(this.refs.root, element) :
                focus_1.getPreviousElement(this.refs.root, element);
            if (isBidirectional) {
                if (element) {
                    var targetRect = element.getBoundingClientRect();
                    var elementDistance = getDistanceFromCenter(activeRect, targetRect);
                    if (elementDistance > -1 && (candidateDistance === -1 || elementDistance < candidateDistance)) {
                        candidateDistance = elementDistance;
                        candidateElement = element;
                    }
                    if (candidateDistance >= 0 && elementDistance < 0) {
                        break;
                    }
                }
            }
            else {
                candidateElement = element;
                break;
            }
        } while (element);
        // Focus the closest candidate
        if (candidateElement && candidateElement !== this._activeElement) {
            changedFocus = true;
            this.focusElement(candidateElement);
        }
        else if (this.props.isCircularNavigation) {
            if (isForward) {
                return this.focusElement(focus_1.getNextElement(this.refs.root, this.refs.root.firstElementChild, true));
            }
            else {
                return this.focusElement(focus_1.getPreviousElement(this.refs.root, this.refs.root.lastElementChild, true, true, true));
            }
        }
        return changedFocus;
    };
    FocusZone.prototype._moveFocusDown = function () {
        var targetTop = -1;
        var leftAlignment = this._focusAlignment.left;
        if (this._moveFocus(true, function (activeRect, targetRect) {
            var distance = -1;
            // ClientRect values can be floats that differ by very small fractions of a decimal.
            // If the difference between top and bottom are within a pixel then we should treat
            // them as equivalent by using Math.floor. For instance 5.2222 and 5.222221 should be equivalent,
            // but without Math.Floor they will be handled incorrectly.
            var targetRectTop = Math.floor(targetRect.top);
            var activeRectBottom = Math.floor(activeRect.bottom);
            if ((targetTop === -1 && targetRectTop >= activeRectBottom) ||
                (targetRectTop === targetTop)) {
                targetTop = targetRectTop;
                if (leftAlignment >= targetRect.left && leftAlignment <= (targetRect.left + targetRect.width)) {
                    distance = 0;
                }
                else {
                    distance = Math.abs((targetRect.left + (targetRect.width / 2)) - leftAlignment);
                }
            }
            return distance;
        })) {
            this._setFocusAlignment(this._activeElement, false, true);
            return true;
        }
        return false;
    };
    FocusZone.prototype._moveFocusUp = function () {
        var targetTop = -1;
        var leftAlignment = this._focusAlignment.left;
        if (this._moveFocus(false, function (activeRect, targetRect) {
            var distance = -1;
            // ClientRect values can be floats that differ by very small fractions of a decimal.
            // If the difference between top and bottom are within a pixel then we should treat
            // them as equivalent by using Math.floor. For instance 5.2222 and 5.222221 should be equivalent,
            // but without Math.Floor they will be handled incorrectly.
            var targetRectBottom = Math.floor(targetRect.bottom);
            var targetRectTop = Math.floor(targetRect.top);
            var activeRectTop = Math.floor(activeRect.top);
            if ((targetTop === -1 && targetRectBottom <= activeRectTop) ||
                (targetRectTop === targetTop)) {
                targetTop = targetRectTop;
                if (leftAlignment >= targetRect.left && leftAlignment <= (targetRect.left + targetRect.width)) {
                    distance = 0;
                }
                else {
                    distance = Math.abs((targetRect.left + (targetRect.width / 2)) - leftAlignment);
                }
            }
            return distance;
        })) {
            this._setFocusAlignment(this._activeElement, false, true);
            return true;
        }
        return false;
    };
    FocusZone.prototype._moveFocusLeft = function () {
        var _this = this;
        var targetTop = -1;
        var topAlignment = this._focusAlignment.top;
        if (this._moveFocus(Utilities_1.getRTL(), function (activeRect, targetRect) {
            var distance = -1;
            if ((targetTop === -1 &&
                targetRect.right <= activeRect.right &&
                (_this.props.direction === FocusZone_Props_1.FocusZoneDirection.horizontal || targetRect.top === activeRect.top)) ||
                (targetRect.top === targetTop)) {
                targetTop = targetRect.top;
                distance = Math.abs((targetRect.top + (targetRect.height / 2)) - topAlignment);
            }
            return distance;
        })) {
            this._setFocusAlignment(this._activeElement, true, false);
            return true;
        }
        return false;
    };
    FocusZone.prototype._moveFocusRight = function () {
        var _this = this;
        var targetTop = -1;
        var topAlignment = this._focusAlignment.top;
        if (this._moveFocus(!Utilities_1.getRTL(), function (activeRect, targetRect) {
            var distance = -1;
            if ((targetTop === -1 &&
                targetRect.left >= activeRect.left &&
                (_this.props.direction === FocusZone_Props_1.FocusZoneDirection.horizontal || targetRect.top === activeRect.top)) ||
                (targetRect.top === targetTop)) {
                targetTop = targetRect.top;
                distance = Math.abs((targetRect.top + (targetRect.height / 2)) - topAlignment);
            }
            return distance;
        })) {
            this._setFocusAlignment(this._activeElement, true, false);
            return true;
        }
        return false;
    };
    FocusZone.prototype._setFocusAlignment = function (element, isHorizontal, isVertical) {
        if (this.props.direction === FocusZone_Props_1.FocusZoneDirection.bidirectional &&
            (!this._focusAlignment || isHorizontal || isVertical)) {
            var rect = element.getBoundingClientRect();
            var left = rect.left + (rect.width / 2);
            var top_1 = rect.top + (rect.height / 2);
            if (!this._focusAlignment) {
                this._focusAlignment = { left: left, top: top_1 };
            }
            if (isHorizontal) {
                this._focusAlignment.left = left;
            }
            if (isVertical) {
                this._focusAlignment.top = top_1;
            }
        }
    };
    FocusZone.prototype._isImmediateDescendantOfZone = function (element) {
        var parentElement = Utilities_1.getParent(element);
        while (parentElement && parentElement !== this.refs.root && parentElement !== document.body) {
            if (focus_1.isElementFocusZone(parentElement)) {
                return false;
            }
            parentElement = Utilities_1.getParent(parentElement);
        }
        return true;
    };
    FocusZone.prototype._updateTabIndexes = function (element) {
        if (!element) {
            element = this.refs.root;
            if (this._activeElement && !Utilities_1.elementContains(element, this._activeElement)) {
                this._activeElement = null;
            }
        }
        var childNodes = element.children;
        for (var childIndex = 0; childNodes && childIndex < childNodes.length; childIndex++) {
            var child = childNodes[childIndex];
            if (!focus_1.isElementFocusZone(child)) {
                if (focus_1.isElementTabbable(child)) {
                    if (this.props.disabled) {
                        child.setAttribute(TABINDEX, '-1');
                    }
                    else if (!this._isInnerZone && (!this._activeElement || this._activeElement === child)) {
                        this._activeElement = child;
                        if (child.getAttribute(TABINDEX) !== '0') {
                            child.setAttribute(TABINDEX, '0');
                        }
                    }
                    else if (child.getAttribute(TABINDEX) !== '-1') {
                        child.setAttribute(TABINDEX, '-1');
                    }
                }
                else if (child.tagName === 'svg' && child.getAttribute('focusable') !== 'false') {
                    // Disgusting IE hack. Sad face.
                    child.setAttribute('focusable', 'false');
                }
                this._updateTabIndexes(child);
            }
        }
    };
    FocusZone.prototype._isElementInput = function (element) {
        if (element && element.tagName && element.tagName.toLowerCase() === 'input') {
            return true;
        }
        return false;
    };
    FocusZone.prototype._shouldInputLoseFocus = function (element, isForward) {
        if (element &&
            element.type &&
            ALLOWED_INPUT_TYPES.indexOf(element.type.toLowerCase()) > -1) {
            var selectionStart = element.selectionStart;
            var selectionEnd = element.selectionEnd;
            var isRangeSelected = selectionStart !== selectionEnd;
            var inputValue = element.value;
            // We shouldn't lose focus in the following cases:
            // 1. There is range selected.
            // 2. When selection start is larger than 0 and it is backward.
            // 3. when selection start is not the end of lenght and it is forward.
            if (isRangeSelected ||
                (selectionStart > 0 && !isForward) ||
                (selectionStart !== inputValue.length && isForward)) {
                return false;
            }
        }
        return true;
    };
    FocusZone.defaultProps = {
        isCircularNavigation: false,
        direction: FocusZone_Props_1.FocusZoneDirection.bidirectional
    };
    __decorate([
        Utilities_1.autobind
    ], FocusZone.prototype, "_onFocus", null);
    __decorate([
        Utilities_1.autobind
    ], FocusZone.prototype, "_onMouseDown", null);
    __decorate([
        Utilities_1.autobind
    ], FocusZone.prototype, "_onKeyDown", null);
    return FocusZone;
}(Utilities_1.BaseComponent));
exports.FocusZone = FocusZone;

//# sourceMappingURL=FocusZone.js.map
