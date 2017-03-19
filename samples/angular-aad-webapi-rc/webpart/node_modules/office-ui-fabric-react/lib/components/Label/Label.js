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
var Utilities_1 = require('../../Utilities');
require('./Label.scss');
var Label = (function (_super) {
    __extends(Label, _super);
    function Label() {
        _super.apply(this, arguments);
    }
    Label.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, required = _a.required, children = _a.children, className = _a.className;
        return (React.createElement("label", __assign({}, Utilities_1.getNativeProps(this.props, Utilities_1.divProperties), {className: Utilities_1.css('ms-Label', className, {
            'is-disabled': disabled,
            'is-required': required
        })}), children));
    };
    return Label;
}(React.Component));
exports.Label = Label;

//# sourceMappingURL=Label.js.map
