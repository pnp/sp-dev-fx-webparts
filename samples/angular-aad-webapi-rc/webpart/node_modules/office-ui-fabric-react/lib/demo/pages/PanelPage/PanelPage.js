"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Panel_SmallRight_Example_1 = require('./examples/Panel.SmallRight.Example');
var Panel_SmallLeft_Example_1 = require('./examples/Panel.SmallLeft.Example');
var Panel_SmallFluid_Example_1 = require('./examples/Panel.SmallFluid.Example');
var Panel_Medium_Example_1 = require('./examples/Panel.Medium.Example');
var Panel_Large_Example_1 = require('./examples/Panel.Large.Example');
var Panel_LargeFixed_Example_1 = require('./examples/Panel.LargeFixed.Example');
var Panel_ExtraLarge_Example_1 = require('./examples/Panel.ExtraLarge.Example');
var Panel_LightDismiss_Example_1 = require('./examples/Panel.LightDismiss.Example');
var Panel_NonModal_Example_1 = require('./examples/Panel.NonModal.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var PanelSmallRightExampleCode = require('./examples/Panel.SmallRight.Example.tsx');
var PanelSmallLeftExampleCode = require('./examples/Panel.SmallLeft.Example.tsx');
var PanelSmallFluidExampleCode = require('./examples/Panel.SmallFluid.Example.tsx');
var PanelMediumExampleCode = require('./examples/Panel.Medium.Example.tsx');
var PanelLargeExampleCode = require('./examples/Panel.Large.Example.tsx');
var PanelLargeFixedExampleCode = require('./examples/Panel.LargeFixed.Example.tsx');
var PanelExtraLargeExampleCode = require('./examples/Panel.ExtraLarge.Example.tsx');
var PanelLightDismissExampleCode = require('./examples/Panel.LightDismiss.Example.tsx');
var PanelNonModalExampleCode = require('./examples/Panel.NonModal.Example.tsx');
var PanelPage = (function (_super) {
    __extends(PanelPage, _super);
    function PanelPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Panel');
    }
    PanelPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Panel', componentName: 'PanelExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'Panel - Small Panel, Anchored Right, Fixed Width', code: PanelSmallRightExampleCode}, 
                React.createElement(Panel_SmallRight_Example_1.PanelSmallRightExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Panel - Small Panel, Anchored Left, Fixed Width', code: PanelSmallLeftExampleCode}, 
                React.createElement(Panel_SmallLeft_Example_1.PanelSmallLeftExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Panel - Small Panel, Full Screen, Fluid Width', code: PanelSmallFluidExampleCode}, 
                React.createElement(Panel_SmallFluid_Example_1.PanelSmallFluidExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Panel - Medium', code: PanelMediumExampleCode}, 
                React.createElement(Panel_Medium_Example_1.PanelMediumExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Panel - Large', code: PanelLargeExampleCode}, 
                React.createElement(Panel_Large_Example_1.PanelLargeExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Panel - LargeFixed', code: PanelLargeFixedExampleCode}, 
                React.createElement(Panel_LargeFixed_Example_1.PanelLargeFixedExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Panel - Extra Large', code: PanelExtraLargeExampleCode}, 
                React.createElement(Panel_ExtraLarge_Example_1.PanelExtraLargeExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Panel - Light Dismiss', code: PanelLightDismissExampleCode}, 
                React.createElement(Panel_LightDismiss_Example_1.PanelLightDismissExample, null)
            ), 
            ",", 
            React.createElement(index_1.ExampleCard, {title: 'Panel - Non-Modal', code: PanelNonModalExampleCode}, 
                React.createElement(Panel_NonModal_Example_1.PanelNonModalExample, null)
            )), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Panel'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "Panels are modal UI overlays that provide contextual app information. They often request some kind of creation or management action from the user. Panels are paired with the Overlay component, also known as a Light Dismiss. The Overlay blocks interactions with the app view until dismissed either through clicking or tapping on the Overlay or by selecting a close or completion action within the Panel."), 
            React.createElement("h2", {className: 'ms-font-xl'}, "Examples of experiences that use Panels"), 
            React.createElement("ul", null, 
                React.createElement("li", null, "Member or group list creation or management"), 
                React.createElement("li", null, "Document list creation or management"), 
                React.createElement("li", null, "Permissions creation or management"), 
                React.createElement("li", null, "Settings creation or management"), 
                React.createElement("li", null, "Multi-field forms"))), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use for self-contained experiences where the user does not need to interact with the app view to complete the task. "), 
                React.createElement("li", null, "Use for complex creation, edit or management experiences."), 
                React.createElement("li", null, "Consider how the panel and its contained contents will scale across Fabric’s responsive web breakpoints."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use for experiences where the user needs to interact with the app view. Use a Pane (which pushes content, doesn’t use an overlay, and sits on the same z-index as the rest of the UI) instead.")
            )
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Panel.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return PanelPage;
}(React.Component));
exports.PanelPage = PanelPage;

//# sourceMappingURL=PanelPage.js.map
