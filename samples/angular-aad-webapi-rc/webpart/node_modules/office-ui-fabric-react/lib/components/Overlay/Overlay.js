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
var properties_1 = require('../../utilities/properties');
require('./Overlay.scss');
var Overlay = (function (_super) {
    __extends(Overlay, _super);
    function Overlay() {
        _super.apply(this, arguments);
    }
    Overlay.prototype.render = function () {
        var _a = this.props, isDarkThemed = _a.isDarkThemed, className = _a.className;
        var divProps = properties_1.getNativeProps(this.props, properties_1.divProperties);
        var modifiedClassName = css_1.css('ms-Overlay', className, {
            'ms-Overlay--dark': isDarkThemed
        });
        return (React.createElement("div", __assign({}, divProps, {className: modifiedClassName})));
    };
    return Overlay;
}(React.Component));
exports.Overlay = Overlay;

//# sourceMappingURL=Overlay.js.map
