"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var index_1 = require('../../../../index');
exports.ToggleBasicExample = function () { return (React.createElement("div", null, 
    React.createElement(index_1.Toggle, {defaultChecked: true, label: 'Enabled and checked', onText: 'On', offText: 'Off'}), 
    React.createElement(index_1.Toggle, {defaultChecked: false, label: 'Enabled and unchecked', onText: 'On', offText: 'Off'}), 
    React.createElement(index_1.Toggle, {defaultChecked: true, disabled: true, label: 'Disabled and checked', onText: 'On', offText: 'Off'}), 
    React.createElement(index_1.Toggle, {defaultChecked: false, disabled: true, label: 'Disabled and unchecked', onText: 'On', offText: 'Off'}))); };

//# sourceMappingURL=Toggle.Basic.Example.js.map
