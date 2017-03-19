"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Layer_Basic_Example_1 = require('./examples/Layer.Basic.Example');
var Layer_Hosted_Example_1 = require('./examples/Layer.Hosted.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var LayerBasicExampleCode = require('./examples/Layer.Basic.Example.tsx');
var LayerHostedExampleCode = require('./examples/Layer.Hosted.Example.tsx');
var LayerPage = (function (_super) {
    __extends(LayerPage, _super);
    function LayerPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Layer');
    }
    LayerPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Layer', componentName: 'LayerExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'Basic layered content', code: LayerBasicExampleCode}, 
                React.createElement(Layer_Basic_Example_1.LayerBasicExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Using LayerHost to control projection', code: LayerHostedExampleCode}, 
                React.createElement(Layer_Hosted_Example_1.LayerHostedExample, null)
            )), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Layer'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "A Layer is a technical component that does not have specific Design guidance."), 
            React.createElement("p", null, "Layers are used to render content outside of a DOM tree, at the end of the document. This allows content to escape traditional boundaries caused by \"overflow: hidden\" css rules and keeps it on the top without using z-index rules. This is useful for example in ContextualMenu and Tooltip scenarios, where the content should always overlay everything else."), 
            React.createElement("p", null, "There are some special considerations. Due to the nature of rendering content elsewhere asynchronously, React refs within content will not be resolvable synchronously at the time the Layer is mounted. Therefore, to use refs correctly, use functional refs ( ref={ (el) => { this._root = el; } ) rather than string refs ( ref='root' ). Additionally measuring the physical Layer element will not include any of the children, since it won't render it. Events that propgate from within the content will not go through the Layer element as well.")), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, 'Use functional refs ( ref={ (el) => { this._root = el; } ).')
            )
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, 'Don\'t use string refs ( ref=\'root\' ).')
            )
        ), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return LayerPage;
}(React.Component));
exports.LayerPage = LayerPage;

//# sourceMappingURL=LayerPage.js.map
