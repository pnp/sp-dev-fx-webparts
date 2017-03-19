"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Persona_Initials_Example_1 = require('./examples/Persona.Initials.Example');
var Persona_Basic_Example_1 = require('./examples/Persona.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var PersonaInitialsExampleCode = require('./examples/Persona.Initials.Example.tsx');
var PersonaBasicExampleCode = require('./examples/Persona.Basic.Example.tsx');
var PersonaPage = (function (_super) {
    __extends(PersonaPage, _super);
    function PersonaPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Persona');
    }
    PersonaPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Persona', componentName: 'PersonaExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'Persona in various sizes', code: PersonaBasicExampleCode}, 
                React.createElement(Persona_Basic_Example_1.PersonaBasicExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Persona in initials', code: PersonaInitialsExampleCode}, 
                React.createElement(Persona_Initials_Example_1.PersonaInitialsExample, null)
            )), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Persona'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "Personas are used for rendering an individual's avatar and presence. They are used within the PeoplePicker components.")
        ), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use XXS size Persona in text fields in read mode or in experiences such as multi-column list view which need compact Persona representations."), 
                React.createElement("li", null, "Use XS size Persona in text fields in edit mode."), 
                React.createElement("li", null, "Use XS, S and M size Personas in menus and list views."), 
                React.createElement("li", null, "Use L and XXL size Personas in profile cards and views."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Change the values of the color swatches in high contrast mode. ")
            )
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Persona.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return PersonaPage;
}(React.Component));
exports.PersonaPage = PersonaPage;

//# sourceMappingURL=PersonaPage.js.map
