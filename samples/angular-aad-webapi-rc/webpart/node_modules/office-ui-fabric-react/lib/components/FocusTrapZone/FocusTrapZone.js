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
var Utilities_1 = require('../../Utilities');
var focus_1 = require('../../utilities/focus');
var FocusTrapZone = (function (_super) {
    __extends(FocusTrapZone, _super);
    function FocusTrapZone() {
        _super.apply(this, arguments);
    }
    FocusTrapZone.prototype.componentDidMount = function () {
        var _a = this.props, elementToFocusOnDismiss = _a.elementToFocusOnDismiss, _b = _a.isClickableOutsideFocusTrap, isClickableOutsideFocusTrap = _b === void 0 ? false : _b, _c = _a.forceFocusInsideTrap, forceFocusInsideTrap = _c === void 0 ? true : _c;
        this._previouslyFocusedElement = elementToFocusOnDismiss ? elementToFocusOnDismiss : document.activeElement;
        this.focus();
        if (forceFocusInsideTrap) {
            this._events.on(window, 'focus', this._forceFocusInTrap, true);
        }
        if (!isClickableOutsideFocusTrap) {
            this._events.on(window, 'click', this._forceClickInTrap, true);
        }
    };
    FocusTrapZone.prototype.componentWillUnmount = function () {
        var ignoreExternalFocusing = this.props.ignoreExternalFocusing;
        if (!ignoreExternalFocusing && this._previouslyFocusedElement) {
            this._previouslyFocusedElement.focus();
        }
    };
    FocusTrapZone.prototype.render = function () {
        var _a = this.props, className = _a.className, ariaLabelledBy = _a.ariaLabelledBy;
        var divProps = Utilities_1.getNativeProps(this.props, Utilities_1.divProperties);
        return (React.createElement("div", __assign({}, divProps, {className: className, ref: 'root', "aria-labelledby": ariaLabelledBy, onKeyDown: this._onKeyboardHandler}), this.props.children));
    };
    /**
     * Need to expose this method in case of popups since focus needs to be set when popup is opened
     */
    FocusTrapZone.prototype.focus = function () {
        var firstFocusableSelector = this.props.firstFocusableSelector;
        var _firstFocusableChild;
        var root = this.refs.root;
        if (firstFocusableSelector) {
            _firstFocusableChild = root.querySelector('.' + firstFocusableSelector);
        }
        else {
            _firstFocusableChild = focus_1.getNextElement(root, root.firstChild, true, false, false, true);
        }
        if (_firstFocusableChild) {
            _firstFocusableChild.focus();
        }
    };
    FocusTrapZone.prototype._onKeyboardHandler = function (ev) {
        if (ev.which !== Utilities_1.KeyCodes.tab) {
            return;
        }
        var root = this.refs.root;
        var _firstFocusableChild = focus_1.getFirstFocusable(root, root.firstChild, true);
        var _lastFocusableChild = focus_1.getLastFocusable(root, root.lastChild, true);
        if (ev.shiftKey && _firstFocusableChild === ev.target) {
            _lastFocusableChild.focus();
            ev.preventDefault();
            ev.stopPropagation();
        }
        else if (!ev.shiftKey && _lastFocusableChild === ev.target) {
            _firstFocusableChild.focus();
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    FocusTrapZone.prototype._forceFocusInTrap = function (ev) {
        var focusedElement = document.activeElement;
        if (!Utilities_1.elementContains(this.refs.root, focusedElement)) {
            this.focus();
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    FocusTrapZone.prototype._forceClickInTrap = function (ev) {
        var clickedElement = ev.target;
        if (clickedElement && !Utilities_1.elementContains(this.refs.root, clickedElement)) {
            this.focus();
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    __decorate([
        Utilities_1.autobind
    ], FocusTrapZone.prototype, "_onKeyboardHandler", null);
    return FocusTrapZone;
}(Utilities_1.BaseComponent));
exports.FocusTrapZone = FocusTrapZone;

//# sourceMappingURL=FocusTrapZone.js.map
