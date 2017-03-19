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
var React = require('react');
var KeyCodes_1 = require('../../utilities/KeyCodes');
var BaseComponent_1 = require('../../common/BaseComponent');
var Utilities_1 = require('../../Utilities');
var focus_1 = require('../../utilities/focus');
var dom_1 = require('../../utilities/dom');
/**
 * This adds accessibility to Dialog and Panel controls
 */
var Popup = (function (_super) {
    __extends(Popup, _super);
    function Popup() {
        _super.apply(this, arguments);
    }
    Popup.prototype.componentWillMount = function () {
        this._originalFocusedElement = dom_1.getDocument().activeElement;
    };
    Popup.prototype.componentDidMount = function () {
        var _this = this;
        this._events.on(this.refs.root, 'keydown', this._onKeyDown);
        this._events.on(this.refs.root, 'focus', function () { return _this._containsFocus = true; }, true);
        this._events.on(this.refs.root, 'blur', function () { return _this._containsFocus = false; }, true);
        if (focus_1.doesElementContainFocus(this.refs.root)) {
            this._containsFocus = true;
        }
    };
    Popup.prototype.componentWillUnmount = function () {
        var _this = this;
        if (this.props.shouldRestoreFocus &&
            this._originalFocusedElement &&
            this._containsFocus &&
            this._originalFocusedElement !== window) {
            // This slight delay is required so that we can unwind the stack, let react try to mess with focus, and then
            // apply the correct focus. Without the setTimeout, we end up focusing the correct thing, and then React wants
            // to reset the focus back to the thing it thinks should have been focused.
            setTimeout(function () {
                if (_this._originalFocusedElement) {
                    _this._originalFocusedElement.focus();
                }
            }, 0);
        }
    };
    Popup.prototype.render = function () {
        var _a = this.props, role = _a.role, className = _a.className, ariaLabelledBy = _a.ariaLabelledBy, ariaDescribedBy = _a.ariaDescribedBy;
        return (React.createElement("div", __assign({ref: 'root'}, Utilities_1.getNativeProps(this.props, Utilities_1.divProperties), {className: className, role: role, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy}), this.props.children));
    };
    Popup.prototype._onKeyDown = function (ev) {
        switch (ev.which) {
            case KeyCodes_1.KeyCodes.escape:
                if (this.props.onDismiss) {
                    this.props.onDismiss();
                    ev.preventDefault();
                    ev.stopPropagation();
                }
                break;
        }
    };
    Popup.defaultProps = {
        shouldRestoreFocus: true
    };
    return Popup;
}(BaseComponent_1.BaseComponent));
exports.Popup = Popup;

//# sourceMappingURL=Popup.js.map
