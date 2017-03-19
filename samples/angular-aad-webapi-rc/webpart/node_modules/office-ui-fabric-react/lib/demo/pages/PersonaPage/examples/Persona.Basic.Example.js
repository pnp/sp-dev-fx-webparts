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
    imageUrl: './images/persona-female.png',
    imageInitials: 'AL',
    primaryText: 'Annie Lindqvist',
    secondaryText: 'Software Engineer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm'
};
var PersonaBasicExample = (function (_super) {
    __extends(PersonaBasicExample, _super);
    function PersonaBasicExample() {
        _super.call(this);
        this.state = {
            renderPersonaDetails: true
        };
    }
    PersonaBasicExample.prototype.render = function () {
        var _this = this;
        var renderPersonaDetails = this.state.renderPersonaDetails;
        return (React.createElement("div", null, 
            React.createElement("div", null, 
                React.createElement(index_1.Checkbox, {label: 'Include persona details', checked: renderPersonaDetails, onChange: function (ev, checked) { _this.setState({ renderPersonaDetails: checked }); }})
            ), 
            React.createElement(index_1.Persona, __assign({}, examplePersona, {size: index_1.PersonaSize.tiny, presence: index_1.PersonaPresence.offline, hidePersonaDetails: !renderPersonaDetails})), 
            React.createElement(index_1.Persona, __assign({}, examplePersona, {size: index_1.PersonaSize.extraSmall, presence: index_1.PersonaPresence.online, hidePersonaDetails: !renderPersonaDetails})), 
            React.createElement(index_1.Persona, __assign({}, examplePersona, {size: index_1.PersonaSize.small, presence: index_1.PersonaPresence.away, hidePersonaDetails: !renderPersonaDetails})), 
            React.createElement(index_1.Persona, __assign({}, examplePersona, {hidePersonaDetails: !renderPersonaDetails, presence: index_1.PersonaPresence.busy})), 
            React.createElement(index_1.Persona, __assign({}, examplePersona, {size: index_1.PersonaSize.large, presence: index_1.PersonaPresence.dnd, hidePersonaDetails: !renderPersonaDetails})), 
            React.createElement(index_1.Persona, __assign({}, examplePersona, {size: index_1.PersonaSize.extraLarge, presence: index_1.PersonaPresence.blocked, hidePersonaDetails: !renderPersonaDetails}))));
    };
    return PersonaBasicExample;
}(React.Component));
exports.PersonaBasicExample = PersonaBasicExample;

//# sourceMappingURL=Persona.Basic.Example.js.map
