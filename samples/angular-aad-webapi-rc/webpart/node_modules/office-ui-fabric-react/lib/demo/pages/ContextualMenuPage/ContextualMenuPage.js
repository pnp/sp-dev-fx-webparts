"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var ContextualMenu_Basic_Example_1 = require('./examples/ContextualMenu.Basic.Example');
var ContextualMenu_Checkmarks_Example_1 = require('./examples/ContextualMenu.Checkmarks.Example');
var ContextualMenu_Directional_Example_1 = require('./examples/ContextualMenu.Directional.Example');
var ContextualMenu_Customization_Example_1 = require('./examples/ContextualMenu.Customization.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var ContextualMenuBasicExampleCode = require('./examples/ContextualMenu.Basic.Example.tsx');
var ContextualMenuCheckmarksExampleCode = require('./examples/ContextualMenu.Checkmarks.Example.tsx');
var ContextualMenuDirectionalExampleCode = require('./examples/ContextualMenu.Directional.Example.tsx');
var ContextualMenuCustomizationExampleCode = require('./examples/ContextualMenu.Customization.Example.tsx');
var ContextualMenuPage = (function (_super) {
    __extends(ContextualMenuPage, _super);
    function ContextualMenuPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'ContextualMenu');
    }
    ContextualMenuPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'ContextualMenu', componentName: 'ContextualMenuExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'ContextualMenu', code: ContextualMenuBasicExampleCode}, 
                React.createElement(ContextualMenu_Basic_Example_1.ContextualMenuBasicExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'ContextualMenu checked menus example', code: ContextualMenuCheckmarksExampleCode}, 
                React.createElement(ContextualMenu_Checkmarks_Example_1.ContextualMenuCheckmarksExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'ContextualMenu beak/direction test', code: ContextualMenuDirectionalExampleCode}, 
                React.createElement(ContextualMenu_Directional_Example_1.ContextualMenuDirectionalExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'ContextualMenu customization example', code: ContextualMenuCustomizationExampleCode}, 
                React.createElement(ContextualMenu_Customization_Example_1.ContextualMenuCustomizationExample, null)
            )), propertiesTables: React.createElement("div", null, 
            React.createElement(index_1.PropertiesTableSet, {componentName: 'ContextualMenu'}), 
            React.createElement(index_1.PropertiesTableSet, {componentName: 'Callout', renderOnly: ['DirectionalHint']})), overview: React.createElement("div", null, 
            React.createElement("p", null, "ContextualMenus are lists of commands that are based on the context of selection, mouse hover or keyboard focus. They are one of the most effective and highly used command surfaces, and can be used in a variety of places."), 
            React.createElement("p", null, "There are variants that originate from a command bar, or from cursor or focus. Those that come from CommandBars use a beak that is horizontally centered on the button. Ones that come from right click and menu button do not have a beak, but appear to the right and below the cursor. ContextualMenus can have submenus from commands, show selection checks, and icons."), 
            React.createElement("p", null, "Organize commands in groups divided by rules. This helps users remember command locations, or find less used commands based on proximity to others. One should also group sets of mutually exclusive or multiple selectable options. Use icons sparingly, for high value commands, and don’t mix icons with selection checks, as it makes parsing commands difficult. Avoid submenus of submenus as they can be difficult to invoke or remember.")), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use to display commands."), 
                React.createElement("li", null, "Divide groups of commands with rules."), 
                React.createElement("li", null, "Use selection checks without icons."), 
                React.createElement("li", null, "Provide submenus for sets of related commands that aren’t as critical as others."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use them to display content."), 
                React.createElement("li", null, "Show commands as one large group."), 
                React.createElement("li", null, "Mix checks and icons."), 
                React.createElement("li", null, "Create submenus of submenus."))
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/ContextualMenu.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return ContextualMenuPage;
}(React.Component));
exports.ContextualMenuPage = ContextualMenuPage;

//# sourceMappingURL=ContextualMenuPage.js.map
