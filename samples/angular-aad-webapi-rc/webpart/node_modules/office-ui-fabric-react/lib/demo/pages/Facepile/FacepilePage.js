"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Facepile_AddFace_Example_1 = require('./examples/Facepile.AddFace.Example');
var Facepile_Basic_Example_1 = require('./examples/Facepile.Basic.Example');
var Facepile_Overflow_Example_1 = require('./examples/Facepile.Overflow.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var FacepileAddFaceExampleCode = require('./examples/Facepile.AddFace.Example.tsx');
var FacepileBasicExampleCode = require('./examples/Facepile.Basic.Example.tsx');
var FacepileOverflowExampleCode = require('./examples/Facepile.Overflow.Example.tsx');
var FacepilePage = (function (_super) {
    __extends(FacepilePage, _super);
    function FacepilePage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Facepile');
    }
    FacepilePage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Facepile', componentName: 'FacepileExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'Facepile with Extras', code: FacepileBasicExampleCode}, 
                React.createElement(Facepile_Basic_Example_1.FacepileBasicExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Facepile with Overflow', code: FacepileOverflowExampleCode}, 
                React.createElement(Facepile_Overflow_Example_1.FacepileOverflowExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Facepile with Add Face', code: FacepileAddFaceExampleCode}, 
                React.createElement(Facepile_AddFace_Example_1.FacepileAddFaceExample, null)
            )), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Facepile'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "The Facepile shows a list of faces or initials in a horizontal lockup. Each circle represents a person. Many times this component is used when sharing who has access to a specific view or file or when assigning a user to a task within a workflow."), 
            React.createElement("h2", {className: 'ms-font-xl'}, "Adding people"), 
            React.createElement("p", null, "The component can include an add button which can be used for quickly adding a person to the list."), 
            React.createElement("h2", {className: 'ms-font-xl'}, "Empty state"), 
            React.createElement("p", null, "The empty state of the Facepile should include only an add button. Another variant is to use an input field with placeholder text instructing the user to add a person. See the PeoplePicker component for the menu used to add people to the Facepile list."), 
            React.createElement("h2", {className: 'ms-font-xl'}, "One person"), 
            React.createElement("p", null, "When there is only one person in the Facepile, consider using their name next to the face or initials."), 
            React.createElement("h2", {className: 'ms-font-xl'}, "Expanding the list when there is no overflow"), 
            React.createElement("p", null, "When there is a need to show the Facepile expanded into a vertical list, include a downward chevron button. Clicking or tapping on the chevron would open a standard list view of personas."), 
            React.createElement("h2", {className: 'ms-font-xl'}, "Overflow"), 
            React.createElement("p", null, "When the Facepile exceeds a max number of 5 people, show a button at the end of the list indicating how many are not being shown. Clicking or tapping on the overflow would open a standard list view of personas.")), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use if looking for a way to represent who has access to an area and need to show that as a people representation."), 
                React.createElement("li", null, "Only show the Add button if a user has access to do so."), 
                React.createElement("li", null, "Allow a way for the user to understand who the person is. Many common ways to do this are with a tooltip or adding the ability to open up a PeopleCard Experience."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use for things other than people."), 
                React.createElement("li", null, "Overwhelm users by listing every single person as a circle but truncate and provide a way to see the full list."), 
                React.createElement("li", null, "Don’t use this control for experiences where you need to manage details of hundreds of users, you are better off using a list control."))
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/FacePile.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return FacepilePage;
}(React.Component));
exports.FacepilePage = FacepilePage;

//# sourceMappingURL=FacepilePage.js.map
