"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../index');
var index_2 = require('../../components/index');
var TeachingBubble_Basic_Example_1 = require('./examples/TeachingBubble.Basic.Example');
var TeachingBubble_Condensed_Example_1 = require('./examples/TeachingBubble.Condensed.Example');
var TeachingBubble_Illustration_Example_1 = require('./examples/TeachingBubble.Illustration.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var TeachingBubbleBasicExampleCode = require('./examples/TeachingBubble.Basic.Example.tsx');
var TeachingBubbleCondensedExampleCode = require('./examples/TeachingBubble.Condensed.Example.tsx');
var TeachingBubbleIllustrationExampleCode = require('./examples/TeachingBubble.Basic.Example.tsx');
var TeachingBubblePage = (function (_super) {
    __extends(TeachingBubblePage, _super);
    function TeachingBubblePage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'TeachingBubble');
    }
    TeachingBubblePage.prototype.render = function () {
        return (React.createElement(index_2.ComponentPage, {title: 'TeachingBubble', componentName: 'TeachingBubbleExample', exampleCards: React.createElement(index_1.LayerHost, null, 
            React.createElement(index_2.ExampleCard, {title: 'TeachingBubble', code: TeachingBubbleBasicExampleCode}, 
                React.createElement(TeachingBubble_Basic_Example_1.TeachingBubbleBasicExample, null)
            ), 
            React.createElement(index_2.ExampleCard, {title: 'TeachingBubble Condensed', code: TeachingBubbleCondensedExampleCode}, 
                React.createElement(TeachingBubble_Condensed_Example_1.TeachingBubbleCondensedExample, null)
            ), 
            React.createElement(index_2.ExampleCard, {title: 'TeachingBubble with Illustration', code: TeachingBubbleIllustrationExampleCode}, 
                React.createElement(TeachingBubble_Illustration_Example_1.TeachingBubbleIllustrationExample, null)
            )), propertiesTables: React.createElement(index_2.PropertiesTableSet, {componentName: 'TeachingBubble'}), overview: React.createElement("div", null, 
            React.createElement(index_1.Link, {target: '_blank', href: 'http://dev.office.com/fabric/components/TeachingBubble'}, "TeachingBubbles"), 
            React.createElement("span", null, " allow the user to display important hints on their web pages with a callout box.")), route: this._url}));
    };
    return TeachingBubblePage;
}(React.Component));
exports.TeachingBubblePage = TeachingBubblePage;

//# sourceMappingURL=TeachingBubblePage.js.map
