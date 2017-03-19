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
var index_1 = require('../../components/index');
var data_1 = require('../CommandBarPage/examples/data');
var Callout_Basic_Example_1 = require('./examples/Callout.Basic.Example');
var Callout_Nested_Example_1 = require('./examples/Callout.Nested.Example');
var Callout_Directional_Example_1 = require('./examples/Callout.Directional.Example');
var Callout_Cover_Example_1 = require('./examples/Callout.Cover.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var CalloutBasicExampleCode = require('./examples/Callout.Basic.Example.tsx');
var CalloutNestedExampleCode = require('./examples/Callout.Nested.Example.tsx');
var CalloutDirectionalExampleCode = require('./examples/Callout.Directional.Example.tsx');
var CalloutCoverExampleCode = require('./examples/Callout.Cover.Example.tsx');
var CalloutPage = (function (_super) {
    __extends(CalloutPage, _super);
    function CalloutPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Callout');
    }
    CalloutPage.prototype.render = function () {
        var cmdBarParamsTextAndIcons = { items: data_1.textOnlyItems, farItems: null };
        return (React.createElement(index_1.ComponentPage, {title: 'Callout', componentName: 'CalloutExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'Simple callout', code: CalloutBasicExampleCode}, 
                React.createElement(Callout_Basic_Example_1.CalloutBasicExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Nested callout... Callout with a commandbar with a sub menu', code: CalloutNestedExampleCode}, 
                React.createElement(Callout_Nested_Example_1.CalloutNestedExample, __assign({}, cmdBarParamsTextAndIcons))
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Callout directional example', code: CalloutDirectionalExampleCode}, 
                React.createElement(Callout_Directional_Example_1.CalloutDirectionalExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Callout cover example', code: CalloutCoverExampleCode}, 
                React.createElement(Callout_Cover_Example_1.CalloutCoverExample, null)
            )), propertiesTables: React.createElement("div", null, 
            React.createElement(index_1.PropertiesTableSet, {componentName: 'Callout'}), 
            React.createElement("p", null, 
                "Besides the above properties, the ", 
                React.createElement("code", null, "Callout"), 
                " component accepts all properties that the React ", 
                React.createElement("code", null, "button"), 
                " and ", 
                React.createElement("code", null, "a"), 
                " components accept.")), overview: React.createElement("div", null, 
            React.createElement("p", null, "Callouts are a powerful way to simplify a user interface. They host tips and other information users need when they need it, with minimal effort on their part. Callouts can help you use screen space more effectively and reduce screen clutter. However, poorly designed Callouts can be annoying, distracting, unhelpful, overwhelming, or in the way."), 
            React.createElement("p", null, "Use a Callout for displaying additional contextual information about an item on the screen. Unlike Tooltips, Callouts also have a tail that identifies their source. A common use for Callout is the introduction of a new feature or capability of an app or site. Alternate usages include pairing the Callout with a button or clickable element for on-demand presentation of additional or supporting content."), 
            React.createElement("p", null, "Real-world examples of this implementation can be seen in administrative interfaces where a particularly difficult-to-understand concept is paired with the ms-Icon--info \"i\" icon. In this example, Callout - with its tip text - is opened when the user clicks on or hovers over the icon.")), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Callout.md'}, "Fabric JS"), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use Callouts to introduce new concepts in an experience where highlighting specific pieces of the UI is necessary."), 
                React.createElement("li", null, "Do be concise with the information you provide inside of a Callout. Short sentences or sentence fragments are best."), 
                React.createElement("li", null, "Do be helpful with the tip text inside of your Callout."), 
                React.createElement("li", null, "Do limit the information inside of a Callout to supplemental information that users don't have to read."), 
                React.createElement("li", null, "Callouts should be placed near the object being described, usually at the pointer's tail or head if possible."), 
                React.createElement("li", null, "When additional context - or more advanced description - is necessary, consider placing a link to \"Learn more\" at the bottom of the Callout and opening the additional content in a new window or Panel when clicked."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Don’t overuse Callout without putting the user in control. Too many Callouts which open automatically can be perceived as interrupting workflow and are a bad user experience."), 
                React.createElement("li", null, "Don't use large, unformatted blocks of text in your Callout, they are difficult to read and overwhelming."), 
                React.createElement("li", null, "Don't put obvious tip text, or text that simply repeats what is already on the screen in your Callout."), 
                React.createElement("li", null, "Because the content inside of a Callout isn't always visible, don't put important or required information in a Callout."), 
                React.createElement("li", null, "Don’t block important UI with the placement of your Callout, it is a poor user experience that will lead to frustration."), 
                React.createElement("li", null, "Don’t open Callout from within another Callout."), 
                React.createElement("li", null, "Don’t use Callout to ask the user to confirm an action, use a Dialog instead."), 
                React.createElement("li", null, "Don’t show Callouts on hidden elements."))
        ), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return CalloutPage;
}(React.Component));
exports.CalloutPage = CalloutPage;

//# sourceMappingURL=CalloutPage.js.map
