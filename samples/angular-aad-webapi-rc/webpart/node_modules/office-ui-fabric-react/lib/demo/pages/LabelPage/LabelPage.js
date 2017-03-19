"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Label_Basic_Example_1 = require('./examples/Label.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var LabelBasicExampleCode = require('./examples/Label.Basic.Example.tsx');
var LabelPage = (function (_super) {
    __extends(LabelPage, _super);
    function LabelPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Label');
    }
    LabelPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Label', componentName: 'LabelExample', exampleCards: React.createElement(index_1.ExampleCard, {title: 'Label', code: LabelBasicExampleCode}, 
            React.createElement(Label_Basic_Example_1.LabelBasicExample, null)
        ), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Label'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "Labels give a name or title to a component or group of components. Labels should be in close proximity to the component or group they are paired with. Some components, such as TextField, Dropdown, or Toggle, already have Labels incorporated, but other components may optionally add a Label if it helps inform the user of the component’s purpose.")
        ), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use sentence casing, e.g. “First name”."), 
                React.createElement("li", null, "Be short and concise."), 
                React.createElement("li", null, "When adding a Label to components, use the text as a noun or short noun phrase."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use Labels as instructional text, e.g. “Click to get started”."), 
                React.createElement("li", null, "Don’t use full sentences or complex punctuation (colons, semicolons, etc.)."))
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Label.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return LabelPage;
}(React.Component));
exports.LabelPage = LabelPage;

//# sourceMappingURL=LabelPage.js.map
