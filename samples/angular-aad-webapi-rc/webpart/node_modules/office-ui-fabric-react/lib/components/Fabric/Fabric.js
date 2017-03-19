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
var css_1 = require('../../utilities/css');
var EventGroup_1 = require('../../utilities/eventGroup/EventGroup');
var KeyCodes_1 = require('../../utilities/KeyCodes');
var DIRECTIONAL_KEY_CODES = [
    KeyCodes_1.KeyCodes.up,
    KeyCodes_1.KeyCodes.down,
    KeyCodes_1.KeyCodes.left,
    KeyCodes_1.KeyCodes.right,
    KeyCodes_1.KeyCodes.home,
    KeyCodes_1.KeyCodes.end,
    KeyCodes_1.KeyCodes.tab,
    KeyCodes_1.KeyCodes.pageUp,
    KeyCodes_1.KeyCodes.pageDown
];
// We will track the last focus visibility state so that if we tear down and recreate
// the Fabric component, we will use the last known value as the default.
var _lastIsFocusVisible = false;
// Ensure that the HTML element has a dir specified. This helps to ensure RTL/LTR macros in css for all components will work.
if (typeof (document) === 'object' && document.documentElement && !document.documentElement.getAttribute('dir')) {
    document.documentElement.setAttribute('dir', 'ltr');
}
var Fabric = (function (_super) {
    __extends(Fabric, _super);
    function Fabric() {
        _super.call(this);
        this.state = {
            isFocusVisible: _lastIsFocusVisible
        };
        this._events = new EventGroup_1.EventGroup(this);
    }
    Fabric.prototype.componentDidMount = function () {
        this._events.on(document.body, 'mousedown', this._onMouseDown, true);
        this._events.on(document.body, 'keydown', this._onKeyDown, true);
    };
    Fabric.prototype.componentWillUnmount = function () {
        this._events.dispose();
    };
    Fabric.prototype.render = function () {
        var isFocusVisible = this.state.isFocusVisible;
        var rootClass = css_1.css('ms-Fabric ms-font-m', this.props.className, {
            'is-focusVisible': isFocusVisible
        });
        return (React.createElement("div", __assign({}, this.props, {className: rootClass, ref: 'root'})));
    };
    Fabric.prototype._onMouseDown = function () {
        if (this.state.isFocusVisible) {
            this.setState({
                isFocusVisible: false
            });
            _lastIsFocusVisible = false;
        }
    };
    Fabric.prototype._onKeyDown = function (ev) {
        if (!this.state.isFocusVisible && DIRECTIONAL_KEY_CODES.indexOf(ev.which) > -1) {
            this.setState({
                isFocusVisible: true
            });
            _lastIsFocusVisible = true;
        }
    };
    return Fabric;
}(React.Component));
exports.Fabric = Fabric;

//# sourceMappingURL=Fabric.js.map
