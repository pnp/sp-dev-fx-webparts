"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Pivot_Basic_Example_1 = require('./examples/Pivot.Basic.Example');
var Pivot_Large_Example_1 = require('./examples/Pivot.Large.Example');
var Pivot_Tabs_Example_1 = require('./examples/Pivot.Tabs.Example');
var Pivot_TabsLarge_Example_1 = require('./examples/Pivot.TabsLarge.Example');
var Pivot_Fabric_Example_1 = require('./examples/Pivot.Fabric.Example');
var Pivot_OnChange_Example_1 = require('./examples/Pivot.OnChange.Example');
var Pivot_Remove_Example_1 = require('./examples/Pivot.Remove.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var PivotRemoveExampleCode = require('./examples/Pivot.Remove.Example.tsx');
var PivotBasicExampleCode = require('./examples/Pivot.Basic.Example.tsx');
var PivotLargeExampleCode = require('./examples/Pivot.Large.Example.tsx');
var PivotTabsExampleCode = require('./examples/Pivot.Tabs.Example.tsx');
var PivotTabsLargesExampleCode = require('./examples/Pivot.TabsLarge.Example.tsx');
var PivotFabricExampleCode = require('./examples/Pivot.Fabric.Example.tsx');
var PivotOnChangeExampleCode = require('./examples/Pivot.OnChange.Example.tsx');
var PivotPage = (function (_super) {
    __extends(PivotPage, _super);
    function PivotPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Pivot');
    }
    PivotPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Pivot', componentName: 'PivotExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'Basic example', code: PivotBasicExampleCode}, 
                React.createElement(Pivot_Basic_Example_1.PivotBasicExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Large link size', code: PivotLargeExampleCode}, 
                React.createElement(Pivot_Large_Example_1.PivotLargeExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Links of tab style', code: PivotTabsExampleCode}, 
                React.createElement(Pivot_Tabs_Example_1.PivotTabsExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Links of large tab style', code: PivotTabsLargesExampleCode}, 
                React.createElement(Pivot_TabsLarge_Example_1.PivotTabsLargeExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Trigger onchange event', code: PivotOnChangeExampleCode}, 
                React.createElement(Pivot_OnChange_Example_1.PivotOnChangeExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Rendering nested components within the Pivot', code: PivotFabricExampleCode}, 
                React.createElement(Pivot_Fabric_Example_1.PivotFabricExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Show/Hide pivot item', code: PivotRemoveExampleCode}, 
                React.createElement(Pivot_Remove_Example_1.PivotRemoveExample, null)
            )), propertiesTables: React.createElement("div", null, 
            React.createElement(index_1.PropertiesTableSet, {componentName: 'Pivot'}), 
            React.createElement(index_1.PropertiesTableSet, {componentPath: 'components/Pivot/', componentName: 'PivotItem'})), overview: React.createElement("div", null, 
            React.createElement("p", null, "The Pivot control and related tabs pattern are used for navigating frequently accessed, distinct content categories. Pivots allow for navigation between two or more content views and relies on text headers to articulate the different sections of content."), 
            React.createElement("ul", null, 
                React.createElement("li", null, "Tapping on a pivot item header navigates to that header's section content."), 
                React.createElement("li", null, "Swiping left or right on a pivot item header navigates to the adjacent section."), 
                React.createElement("li", null, "Swiping left or right on section content navigates to the adjacent section. "), 
                React.createElement("li", null, "Pivots are stationary when all pivot headers fit within the allowed space."), 
                React.createElement("li", null, "Pivots carousel when all pivot headers don't fit within the allowed space.")), 
            React.createElement("p", null, "Tabs are a visual variant of Pivot that use a combination of icons and text or just icons to articulate section content.")), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use on content-heavy pages that require a significant amount of scrolling to access the various sections."), 
                React.createElement("li", null, "Be concise on the navigation labels, ideally one or two words rather than a phrase."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Don’t use on pages which doesn’t scroll."), 
                React.createElement("li", null, "Don’t use the Pivot to link to a new page."), 
                React.createElement("li", null, "Don’t use the Pivot to link to hidden content."))
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Pivot.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return PivotPage;
}(React.Component));
exports.PivotPage = PivotPage;

//# sourceMappingURL=PivotPage.js.map
