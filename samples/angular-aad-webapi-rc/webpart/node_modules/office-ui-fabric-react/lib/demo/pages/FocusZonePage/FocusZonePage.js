"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var FocusZone_Photos_Example_1 = require('./examples/FocusZone.Photos.Example');
var FocusZone_List_Example_1 = require('./examples/FocusZone.List.Example');
var FocusZone_Disabled_Example_1 = require('./examples/FocusZone.Disabled.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var FocusZonePhotosExampleCode = require('./examples/FocusZone.Photos.Example.tsx');
var FocusZoneListExampleCode = require('./examples/FocusZone.List.Example.tsx');
var FocusZoneDisabledExampleCode = require('./examples/FocusZone.Disabled.Example.tsx');
var FocusZonePage = (function (_super) {
    __extends(FocusZonePage, _super);
    function FocusZonePage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'FocusZone');
    }
    FocusZonePage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'FocusZone', componentName: 'FocusZoneExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'Non-uniform photos within bidirectional FocusZone', code: FocusZonePhotosExampleCode}, 
                React.createElement(FocusZone_Photos_Example_1.FocusZonePhotosExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Nesting FocusZones in list rows', code: FocusZoneListExampleCode}, 
                React.createElement(FocusZone_List_Example_1.FocusZoneListExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Disabled FocusZone', code: FocusZoneDisabledExampleCode}, 
                React.createElement(FocusZone_Disabled_Example_1.FocusZoneDisabledExample, null)
            )), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'FocusZone'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "FocusZones abstract arrow key navigation behaviors. Tabbable elements (buttons, anchors, and elements with data-is-focusable='true' attributes) are considered when pressing directional arrow keys and focus is moved appropriately. Tabbing to a zone sets focus only to the current \"active\" element, making it simple to use the tab key to transition from one zone to the next, rather than through every focusable element."), 
            React.createElement("p", null, "Using a FocusZone is simple. Just wrap a bunch of content inside of a FocusZone, and arrows and tabbling will be handled for you! See examples below.")), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return FocusZonePage;
}(React.Component));
exports.FocusZonePage = FocusZonePage;

//# sourceMappingURL=FocusZonePage.js.map
