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
/* tslint:disable */
var React = require('react');
var Persona_1 = require('../../../../Persona');
var ContextualMenu_1 = require('../../../../ContextualMenu');
var Button_1 = require('../../../../Button');
var SelectedItemWithMenu = (function (_super) {
    __extends(SelectedItemWithMenu, _super);
    function SelectedItemWithMenu(props) {
        _super.call(this, props);
        this.onContextualMenu = this.onContextualMenu.bind(this);
        this._onCloseContextualMenu = this._onCloseContextualMenu.bind(this);
        this.state = { contextualMenuVisible: false };
    }
    SelectedItemWithMenu.prototype.render = function () {
        var _a = this.props, item = _a.item, onRemoveItem = _a.onRemoveItem;
        return (React.createElement("div", {className: 'ms-PickerPersona-container'}, 
            React.createElement("div", {className: 'ms-PickerItem-content'}, 
                React.createElement(Persona_1.Persona, __assign({}, item, {presence: item.presence !== undefined ? item.presence : Persona_1.PersonaPresence.none}))
            ), 
            React.createElement("div", {ref: 'ellipsisRef', className: 'ms-PickerItem-content'}, 
                React.createElement(Button_1.Button, {icon: 'More', buttonType: Button_1.ButtonType.icon, onClick: this.onContextualMenu})
            ), 
            React.createElement("div", {className: 'ms-PickerItem-content'}, 
                React.createElement(Button_1.Button, {icon: 'Cancel', buttonType: Button_1.ButtonType.icon, onClick: onRemoveItem})
            ), 
            this.state.contextualMenuVisible ? (React.createElement(ContextualMenu_1.ContextualMenu, {items: item.menuItems, shouldFocusOnMount: true, targetElement: this.refs.ellipsisRef, onDismiss: this._onCloseContextualMenu, directionalHint: ContextualMenu_1.DirectionalHint.bottomAutoEdge}))
                : null));
    };
    SelectedItemWithMenu.prototype.onContextualMenu = function (ev) {
        this.setState({ contextualMenuVisible: true });
    };
    SelectedItemWithMenu.prototype._onCloseContextualMenu = function (ev) {
        this.setState({ contextualMenuVisible: false });
    };
    return SelectedItemWithMenu;
}(React.Component));
exports.SelectedItemWithMenu = SelectedItemWithMenu;

//# sourceMappingURL=SelectedItemWithMenu.js.map
