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
var index_1 = require('../../../../index');
var examplePersona = {
    imageInitials: 'MS',
    primaryText: 'Maor Sharett',
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm'
};
var PersonaInitialsExample = (function (_super) {
    __extends(PersonaInitialsExample, _super);
    function PersonaInitialsExample() {
        _super.apply(this, arguments);
    }
    PersonaInitialsExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Persona, __assign({}, examplePersona)), 
            React.createElement(index_1.Persona, __assign({}, examplePersona, {initialsColor: index_1.PersonaInitialsColor.black})), 
            React.createElement(index_1.Persona, __assign({}, examplePersona, {initialsColor: index_1.PersonaInitialsColor.teal}))));
    };
    return PersonaInitialsExample;
}(React.Component));
exports.PersonaInitialsExample = PersonaInitialsExample;

//# sourceMappingURL=Persona.Initials.Example.js.map
