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
var Button_1 = require('../../Button');
require('./DocumentCardActions.scss');
var DocumentCardActions = (function (_super) {
    __extends(DocumentCardActions, _super);
    function DocumentCardActions() {
        _super.apply(this, arguments);
    }
    DocumentCardActions.prototype.render = function () {
        var _a = this.props, actions = _a.actions, views = _a.views;
        return (React.createElement("div", {className: 'ms-DocumentCardActions'}, 
            actions && actions.map(function (action, index) {
                action.buttonType = Button_1.ButtonType.icon;
                return (React.createElement("div", {className: 'ms-DocumentCardActions-action', key: index}, 
                    React.createElement(Button_1.Button, __assign({}, action))
                ));
            }), 
            views > 0 && (React.createElement("div", {className: 'ms-DocumentCardActions-views'}, 
                React.createElement("i", {className: 'ms-Icon ms-Icon--View'}), 
                views))));
    };
    return DocumentCardActions;
}(React.Component));
exports.DocumentCardActions = DocumentCardActions;

//# sourceMappingURL=DocumentCardActions.js.map
