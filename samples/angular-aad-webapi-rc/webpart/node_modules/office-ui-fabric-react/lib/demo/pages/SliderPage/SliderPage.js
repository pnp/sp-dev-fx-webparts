"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Slider_Basic_Example_1 = require('./examples/Slider.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var SliderBasicExampleCode = require('./examples/Slider.Basic.Example.tsx');
var SliderPage = (function (_super) {
    __extends(SliderPage, _super);
    function SliderPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Slider');
    }
    SliderPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Slider', componentName: 'SliderExample', exampleCards: React.createElement(index_1.ExampleCard, {title: 'Slider', code: SliderBasicExampleCode}, 
            React.createElement(Slider_Basic_Example_1.SliderBasicExample, null)
        ), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Slider'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "A Slider is an element used to set a value. It provides a visual indication of adjustable content, as well as the current setting in the total range of content. It is displayed as a horizontal track with options on either side. A knob or lever is dragged to one end or the other to make the choice, indicating the current value. Marks on the Slider bar can show values and users can choose where they want to drag the knob or lever to set the value."), 
            React.createElement("p", null, "A Slider is a good choice when you know that users think of the value as a relative quantity, not a numeric value. For example, users think about setting their audio volume to low or medium—not about setting the value to two or five.")), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Consider a Slider when changing a value."), 
                React.createElement("li", null, "Use a slider when you want your users to be able to set defined values (such as volume or brightness)."), 
                React.createElement("li", null, "Include a label indicating what value the Slider changes."), 
                React.createElement("li", null, "Use step points (or tick marks) if you don’t want the Slider to allow arbitrary values between min and max. "), 
                React.createElement("li", null, "Use a Slider when the user would benefit from instant feedback on the effect of setting changes. "))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Don't use a Slider when the options are not values."), 
                React.createElement("li", null, "Don’t use a Slider for binary settings."), 
                React.createElement("li", null, "Don’t create a continuous Slider if the range of values is large."), 
                React.createElement("li", null, "Don’t use for a range of three values or less."))
        ), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return SliderPage;
}(React.Component));
exports.SliderPage = SliderPage;

//# sourceMappingURL=SliderPage.js.map
