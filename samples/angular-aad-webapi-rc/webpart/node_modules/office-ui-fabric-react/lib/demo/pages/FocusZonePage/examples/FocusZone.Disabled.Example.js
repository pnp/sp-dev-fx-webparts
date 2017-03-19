"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var index_1 = require('../../../../index');
require('./FocusZone.Disabled.Example.scss');
exports.FocusZoneDisabledExample = function () { return (React.createElement("div", {className: 'ms-FocusZoneDisabledExample'}, 
    React.createElement("div", {className: 'ms-Row'}, 
        React.createElement(index_1.FocusZone, {direction: index_1.FocusZoneDirection.horizontal}, 
            React.createElement("span", null, "Enabled FocusZone: "), 
            React.createElement(index_1.Button, null, "Button 1"), 
            React.createElement(index_1.Button, null, "Button 2"), 
            React.createElement(index_1.TextField, {value: 'FocusZone TextField', className: 'ms-FocusZoneDisabledExample-textField'}), 
            React.createElement(index_1.Button, null, "Button 3"))
    ), 
    React.createElement("div", {className: 'ms-Row'}, 
        React.createElement(index_1.Button, null, "Tabbable Element 1")
    ), 
    React.createElement("div", {className: 'ms-Row'}, 
        React.createElement(index_1.FocusZone, {disabled: true}, 
            React.createElement("span", null, "Disabled FocusZone: "), 
            React.createElement(index_1.Button, null, "Button 1"), 
            React.createElement(index_1.Button, null, "Button 2"))
    ), 
    React.createElement("div", {className: 'ms-Row'}, 
        React.createElement(index_1.TextField, {value: 'Tabbable Element 2'})
    ))); };

//# sourceMappingURL=FocusZone.Disabled.Example.js.map
