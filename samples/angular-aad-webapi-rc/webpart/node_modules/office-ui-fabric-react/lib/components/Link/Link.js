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
var BaseComponent_1 = require('../../common/BaseComponent');
var Utilities_1 = require('../../Utilities');
require('./Link.scss');
var Link = (function (_super) {
    __extends(Link, _super);
    function Link() {
        _super.apply(this, arguments);
    }
    Link.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, children = _a.children, className = _a.className, href = _a.href;
        return (href ? (React.createElement("a", __assign({role: 'link'}, Utilities_1.getNativeProps(this.props, Utilities_1.anchorProperties), {className: Utilities_1.css('ms-Link', className, {
            'is-disabled': disabled
        }), onClick: this._onClick, ref: this._resolveRef('_link')}), children)) : (React.createElement("button", __assign({role: 'button'}, Utilities_1.getNativeProps(this.props, Utilities_1.buttonProperties), {className: Utilities_1.css('ms-Link', className, {
            'is-disabled': disabled
        }), onClick: this._onClick, ref: this._resolveRef('_link')}), children)));
    };
    Link.prototype.focus = function () {
        if (this._link) {
            this._link.focus();
        }
    };
    Link.prototype._onClick = function (ev) {
        var onClick = this.props.onClick;
        if (onClick) {
            onClick(ev);
        }
    };
    __decorate([
        Utilities_1.autobind
    ], Link.prototype, "_onClick", null);
    return Link;
}(BaseComponent_1.BaseComponent));
exports.Link = Link;

//# sourceMappingURL=Link.js.map
