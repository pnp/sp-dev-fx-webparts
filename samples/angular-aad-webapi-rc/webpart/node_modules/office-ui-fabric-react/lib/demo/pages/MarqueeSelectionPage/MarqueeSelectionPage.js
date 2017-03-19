"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var MarqueeSelection_Basic_Example_1 = require('./examples/MarqueeSelection.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var MarqueeSelectionBasicExampleCode = require('./examples/MarqueeSelection.Basic.Example.tsx');
var MarqueeSelectionPage = (function (_super) {
    __extends(MarqueeSelectionPage, _super);
    function MarqueeSelectionPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'MarqueeSelection');
    }
    MarqueeSelectionPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'MarqueeSelection', componentName: 'MarqueeSelectionExample', exampleCards: React.createElement(index_1.ExampleCard, {title: 'Basic Selection Example', code: MarqueeSelectionBasicExampleCode}, 
            React.createElement(MarqueeSelection_Basic_Example_1.MarqueeSelectionBasicExample, null)
        ), overview: React.createElement("div", null, 
            React.createElement("p", null, "The MarqueeSelection component provides a service which allows the user to drag a rectangle to be drawn around" + ' ' + "items to select them. This works in conjunction with a selection object, which can be used to generically store selection state, separate from a component that consumes the state."), 
            React.createElement("p", null, "MarqueeSelection also works in conjunction with the AutoScroll utility to automatically scroll the container when we drag a rectangle within the vicinity of the edges."), 
            React.createElement("p", null, 
                "When a selection rectangle is dragged, we look for elements with the ", 
                React.createElement("b", null, "data-selection-index"), 
                " attribute populated. We get these elements' boundingClientRects and compare them with the root's rect to determine selection state. We update the selection state appropriately."), 
            React.createElement("p", null, "In virtualization cases where items that were once selected are dematerialized, we will keep the item in its" + ' ' + "previous state until we know definitively if it's on/off. (In other words, this works with List.)")), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return MarqueeSelectionPage;
}(React.Component));
exports.MarqueeSelectionPage = MarqueeSelectionPage;

//# sourceMappingURL=MarqueeSelectionPage.js.map
