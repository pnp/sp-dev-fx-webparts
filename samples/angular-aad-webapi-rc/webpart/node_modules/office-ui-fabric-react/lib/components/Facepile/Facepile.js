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
var Facepile_Props_1 = require('./Facepile.Props');
var Persona_1 = require('../../Persona');
require('./Facepile.scss');
var properties_1 = require('../../utilities/properties');
var Facepile = (function (_super) {
    __extends(Facepile, _super);
    function Facepile() {
        _super.apply(this, arguments);
    }
    Facepile.prototype.render = function () {
        var _this = this;
        var _a = this.props, chevronButtonProps = _a.chevronButtonProps, maxDisplayablePersonas = _a.maxDisplayablePersonas, overflowButtonProps = _a.overflowButtonProps, overflowButtonType = _a.overflowButtonType, personas = _a.personas, showAddButton = _a.showAddButton;
        var numPersonasToShow = Math.min(personas.length, maxDisplayablePersonas);
        // Added for deprecating chevronButtonProps.  Can remove after v1.0
        if (chevronButtonProps && !overflowButtonProps) {
            overflowButtonProps = chevronButtonProps;
            overflowButtonType = Facepile_Props_1.OverflowButtonType.downArrow;
        }
        return (React.createElement("div", {className: 'ms-Facepile'}, 
            React.createElement("div", {className: 'ms-Facepile-members'}, 
                showAddButton ? this._getAddNewElement() : null, 
                personas.slice(0, numPersonasToShow).map(function (persona, index) {
                    var personaControl = _this._getPersonaControl(persona);
                    return persona.onClick ?
                        _this._getElementWithOnClickEvent(personaControl, persona, index) :
                        _this._getElementWithoutOnClickEvent(personaControl, persona, index);
                }), 
                overflowButtonProps ? this._getOverflowElement(numPersonasToShow) : null), 
            React.createElement("div", {className: 'ms-Facepile-clear'})));
    };
    Facepile.prototype._getPersonaControl = function (persona) {
        var getPersonaProps = this.props.getPersonaProps;
        return React.createElement(Persona_1.Persona, __assign({imageInitials: persona.imageInitials, imageUrl: persona.imageUrl, initialsColor: persona.initialsColor, primaryText: persona.personaName, size: Persona_1.PersonaSize.extraSmall, hidePersonaDetails: true}, (getPersonaProps ? getPersonaProps(persona) : null)));
    };
    Facepile.prototype._getElementWithOnClickEvent = function (personaControl, persona, index) {
        return React.createElement("button", __assign({}, properties_1.getNativeProps(persona, properties_1.buttonProperties), {className: 'ms-Facepile-itemButton', title: persona.personaName, key: (!!persona.imageUrl ? 'i' : '') + index, onClick: this._onPersonaClick.bind(this, persona), onMouseMove: this._onPersonaMouseMove.bind(this, persona), onMouseOut: this._onPersonaMouseOut.bind(this, persona)}), personaControl);
    };
    Facepile.prototype._getElementWithoutOnClickEvent = function (personaControl, persona, index) {
        return React.createElement("div", __assign({}, properties_1.getNativeProps(persona, properties_1.divProperties), {className: 'ms-Facepile-itemButton', title: persona.personaName, key: (!!persona.imageUrl ? 'i' : '') + index, onMouseMove: this._onPersonaMouseMove.bind(this, persona), onMouseOut: this._onPersonaMouseOut.bind(this, persona)}), personaControl);
    };
    Facepile.prototype._getOverflowElement = function (numPersonasToShow) {
        switch (this.props.overflowButtonType) {
            case Facepile_Props_1.OverflowButtonType.descriptive:
                return this._getDescriptiveOverflowElement(numPersonasToShow);
            case Facepile_Props_1.OverflowButtonType.downArrow:
                return this._getIconElement('ChevronDown');
            case Facepile_Props_1.OverflowButtonType.more:
                return this._getIconElement('More');
            default:
                return null;
        }
    };
    Facepile.prototype._getDescriptiveOverflowElement = function (numPersonasToShow) {
        var numPersonasNotPictured = this.props.personas.length - numPersonasToShow;
        if (!this.props.overflowButtonProps || numPersonasNotPictured < 1) {
            return null;
        }
        var personaNames = this.props.personas.slice(numPersonasToShow).map(function (p) { return p.personaName; }).join(', ');
        return React.createElement("button", __assign({}, properties_1.getNativeProps(this.props.overflowButtonProps, properties_1.buttonProperties), {className: css_1.css('ms-Facepile-descriptiveOverflowButton', 'ms-Facepile-itemButton'), title: personaNames}), '+' + numPersonasNotPictured);
    };
    Facepile.prototype._getIconElement = function (icon) {
        return React.createElement("button", __assign({}, properties_1.getNativeProps(this.props.overflowButtonProps, properties_1.buttonProperties), {className: css_1.css('ms-Facepile-overflowButton', 'ms-Facepile-itemButton')}), 
            React.createElement("i", {className: css_1.css('ms-Icon', 'msIcon', "ms-Icon ms-Icon--" + icon), "aria-hidden": 'true'})
        );
    };
    Facepile.prototype._getAddNewElement = function () {
        return React.createElement("button", __assign({}, properties_1.getNativeProps(this.props.addButtonProps, properties_1.buttonProperties), {className: css_1.css('ms-Facepile-addButton', 'ms-Facepile-itemButton')}), 
            React.createElement("i", {className: 'ms-Icon msIcon ms-Icon--AddFriend', "aria-hidden": 'true'})
        );
    };
    Facepile.prototype._onPersonaClick = function (persona, ev) {
        persona.onClick(ev, persona);
        ev.preventDefault();
        ev.stopPropagation();
    };
    Facepile.prototype._onPersonaMouseMove = function (persona, ev) {
        if (!!persona.onMouseMove) {
            persona.onMouseMove(ev, persona);
        }
    };
    Facepile.prototype._onPersonaMouseOut = function (persona, ev) {
        if (!!persona.onMouseOut) {
            persona.onMouseOut(ev, persona);
        }
    };
    Facepile.defaultProps = {
        maxDisplayablePersonas: 5,
        personas: []
    };
    return Facepile;
}(React.Component));
exports.Facepile = Facepile;

//# sourceMappingURL=Facepile.js.map
