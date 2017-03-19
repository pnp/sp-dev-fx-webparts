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
var CalloutContent_1 = require('./CalloutContent');
var Layer_1 = require('../../Layer');
var Callout = (function (_super) {
    __extends(Callout, _super);
    function Callout(props) {
        _super.call(this, props);
    }
    Callout.prototype.render = function () {
        var content = (React.createElement(CalloutContent_1.CalloutContent, __assign({}, this.props)));
        return this.props.doNotLayer ? content : (React.createElement(Layer_1.Layer, null, content));
    };
    return Callout;
}(React.Component));
exports.Callout = Callout;

//# sourceMappingURL=Callout.js.map
