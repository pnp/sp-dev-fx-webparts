"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/* tslint:disable */
var React = require('react');
var IconName_1 = require('./IconName');
var Utilities_1 = require('../../Utilities');
exports.Icon = function (props) {
    var customIcon = props.iconName === IconName_1.IconName.None;
    var className = Utilities_1.css('ms-Icon', customIcon ? '' : ('ms-Icon--' + IconName_1.IconName[props.iconName]), props.className);
    return React.createElement("i", __assign({}, Utilities_1.getNativeProps(props, Utilities_1.htmlElementProperties), {className: className}));
};

//# sourceMappingURL=Icon.js.map
