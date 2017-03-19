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
var css_1 = require('../../utilities/css');
var Image_1 = require('../../Image');
var Persona_Props_1 = require('./Persona.Props');
var PersonaConsts_1 = require('./PersonaConsts');
var properties_1 = require('../../utilities/properties');
require('./Persona.scss');
var Persona = (function (_super) {
    __extends(Persona, _super);
    function Persona() {
        _super.apply(this, arguments);
    }
    Persona.prototype.render = function () {
        var _a = this.props, className = _a.className, size = _a.size, imageUrl = _a.imageUrl, imageInitials = _a.imageInitials, initialsColor = _a.initialsColor, presence = _a.presence, primaryText = _a.primaryText, secondaryText = _a.secondaryText, tertiaryText = _a.tertiaryText, optionalText = _a.optionalText, hidePersonaDetails = _a.hidePersonaDetails, imageShouldFadeIn = _a.imageShouldFadeIn;
        var presenceElement = null;
        if (presence !== Persona_Props_1.PersonaPresence.none) {
            var userPresence = Persona_Props_1.PersonaPresence[presence], statusIcon = null;
            switch (userPresence) {
                case 'online':
                    userPresence = 'SkypeCheck';
                    break;
                case 'away':
                    userPresence = 'SkypeClock';
                    break;
                case 'dnd':
                    userPresence = 'SkypeMinus';
                    break;
                default:
                    userPresence = '';
            }
            if (userPresence) {
                var iconClass = "ms-Persona-presenceIcon ms-Icon ms-Icon--" + userPresence;
                statusIcon = React.createElement("i", {className: iconClass});
            }
            presenceElement = React.createElement("div", {className: 'ms-Persona-presence'}, statusIcon);
        }
        var divProps = properties_1.getNativeProps(this.props, properties_1.divProperties);
        var personaDetails = React.createElement("div", {className: 'ms-Persona-details'}, 
            React.createElement("div", {className: 'ms-Persona-primaryText'}, primaryText), 
            secondaryText ? (React.createElement("div", {className: 'ms-Persona-secondaryText'}, secondaryText)) : (null), 
            React.createElement("div", {className: 'ms-Persona-tertiaryText'}, tertiaryText), 
            React.createElement("div", {className: 'ms-Persona-optionalText'}, optionalText), 
            this.props.children);
        return (React.createElement("div", __assign({}, divProps, {className: css_1.css('ms-Persona', className, PersonaConsts_1.PERSONA_SIZE[size], PersonaConsts_1.PERSONA_PRESENCE[presence])}), 
            size !== Persona_Props_1.PersonaSize.tiny && (React.createElement("div", {className: 'ms-Persona-imageArea'}, 
                React.createElement("div", {className: css_1.css('ms-Persona-initials', PersonaConsts_1.PERSONA_INITIALS_COLOR[initialsColor])}, imageInitials), 
                React.createElement(Image_1.Image, {className: 'ms-Persona-image', imageFit: Image_1.ImageFit.cover, src: imageUrl, shouldFadeIn: imageShouldFadeIn}))), 
            presenceElement, 
            (!hidePersonaDetails || (size === Persona_Props_1.PersonaSize.tiny)) && personaDetails));
    };
    Persona.defaultProps = {
        primaryText: '',
        size: Persona_Props_1.PersonaSize.regular,
        initialsColor: Persona_Props_1.PersonaInitialsColor.blue,
        presence: Persona_Props_1.PersonaPresence.none
    };
    return Persona;
}(React.Component));
exports.Persona = Persona;

//# sourceMappingURL=Persona.js.map
