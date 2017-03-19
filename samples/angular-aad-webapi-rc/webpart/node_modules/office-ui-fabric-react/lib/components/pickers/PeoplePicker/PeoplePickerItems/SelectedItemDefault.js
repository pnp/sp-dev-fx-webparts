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
/* tslint:enable */
var Persona_1 = require('../../../../Persona');
var Button_1 = require('../../../../Button');
var css_1 = require('../../../../utilities/css');
require('./PickerItemsDefault.scss');
exports.SelectedItemDefault = function (peoplePickerItemProps) {
    var item = peoplePickerItemProps.item, onRemoveItem = peoplePickerItemProps.onRemoveItem, index = peoplePickerItemProps.index, selected = peoplePickerItemProps.selected;
    return (React.createElement("div", {className: css_1.css('ms-PickerPersona-container', {
        'is-selected': selected
    }), "data-is-focusable": true, "data-selection-index": index}, 
        React.createElement("div", {className: 'ms-PickerItem-content'}, 
            React.createElement(Persona_1.Persona, __assign({}, item, {presence: item.presence !== undefined ? item.presence : Persona_1.PersonaPresence.none, size: Persona_1.PersonaSize.extraSmall}))
        ), 
        React.createElement(Button_1.Button, {onClick: function () { if (onRemoveItem) {
            onRemoveItem();
        } }, icon: 'Cancel', buttonType: Button_1.ButtonType.icon, className: 'ms-PickerItem-content', "data-is-focusable": false})));
};

//# sourceMappingURL=SelectedItemDefault.js.map
