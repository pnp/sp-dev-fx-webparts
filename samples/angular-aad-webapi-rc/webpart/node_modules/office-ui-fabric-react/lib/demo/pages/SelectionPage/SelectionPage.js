"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Selection_Basic_Example_1 = require('./examples/Selection.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var SelectionBasicExampleCode = require('./examples/Selection.Basic.Example.tsx');
var SelectionPage = (function (_super) {
    __extends(SelectionPage, _super);
    function SelectionPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Selection');
    }
    SelectionPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Selection', componentName: 'SelectionExample', exampleCards: React.createElement(index_1.ExampleCard, {title: 'Basic Selection Example', code: SelectionBasicExampleCode}, 
            React.createElement(Selection_Basic_Example_1.SelectionBasicExample, null)
        ), overview: React.createElement("div", null, 
            React.createElement("p", null, "Selection is a store that maintains the selection state of items in an efficient way." + ' ' + "It exposes methods for accessing the selection state given an item index." + ' ' + "If the items change, it can resolve the selection if items move in the array."), 
            React.createElement("p", null, "SelectionZone is a React component that acts as a mediator between the Selection object and elements. By providing it the Selection instance and rendering content within it, you can have it manage clicking/focus/keyboarding from the DOM and translate into selection updates. You just need to provide the right data-selection-* attributes on elements within each row/tile to give SelectionZone a hint what the intent is."), 
            React.createElement("p", null, "SelectionZone also takes in an onItemInvoked callback for when items are invoked. Invoking occurs when a user double clicks a row, presses enter while focused on it, or clicks within an element marked by the data-selection-invoke attribute."), 
            React.createElement("p", null, "Available attributes:"), 
            React.createElement("ul", null, 
                React.createElement("li", null, 
                    React.createElement("b", null, "data-selection-index"), 
                    ": the index of the item being represented.This would go on the root of the tile/row."), 
                React.createElement("li", null, 
                    React.createElement("b", null, "data-selection-invoke"), 
                    ": this boolean flag would be set on the element which should immediately invoke the item on click.There is also a nuanced behavior where we will clear selection and select the item if mousedown occurs on an unselected item."), 
                React.createElement("li", null, 
                    React.createElement("b", null, "data-selection-toggle"), 
                    ": this boolean flag would be set on the element which should handle toggles.This could be a checkbox or a div."), 
                React.createElement("li", null, 
                    React.createElement("b", null, "data-selection-toggle-all"), 
                    ": this boolean flag indicates that clicking it should toggle all selection."))), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return SelectionPage;
}(React.Component));
exports.SelectionPage = SelectionPage;

//# sourceMappingURL=SelectionPage.js.map
