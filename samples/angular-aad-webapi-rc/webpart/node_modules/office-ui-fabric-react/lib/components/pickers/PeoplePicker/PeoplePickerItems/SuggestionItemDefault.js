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
exports.SuggestionItemNormal = function (personaProps) {
    return (React.createElement("div", {className: 'ms-PeoplePicker-personaContent'}, 
        React.createElement(Persona_1.Persona, __assign({}, personaProps, {presence: personaProps.presence !== undefined ? personaProps.presence : Persona_1.PersonaPresence.none, size: Persona_1.PersonaSize.small, className: 'ms-PeoplePicker-Persona'}))
    ));
};
exports.SuggestionItemSmall = function (personaProps) {
    return (React.createElement("div", {className: 'ms-PeoplePicker-personaContent'}, 
        React.createElement(Persona_1.Persona, __assign({}, personaProps, {presence: personaProps.presence !== undefined ? personaProps.presence : Persona_1.PersonaPresence.none, size: Persona_1.PersonaSize.extraSmall, className: 'ms-PeoplePicker-Persona'}))
    ));
};

//# sourceMappingURL=SuggestionItemDefault.js.map
