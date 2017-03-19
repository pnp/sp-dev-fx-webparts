"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var index_2 = require('../../../index');
var Button_Normal_Example_1 = require('./examples/Button.Normal.Example');
var Button_Primary_Example_1 = require('./examples/Button.Primary.Example');
var Button_Hero_Example_1 = require('./examples/Button.Hero.Example');
var Button_Compound_Example_1 = require('./examples/Button.Compound.Example');
var Button_Command_Example_1 = require('./examples/Button.Command.Example');
var Button_Icon_Example_1 = require('./examples/Button.Icon.Example');
var Button_Anchor_Example_1 = require('./examples/Button.Anchor.Example');
var Button_ScreenReader_Example_1 = require('./examples/Button.ScreenReader.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
require('./examples/Button.Basic.Example.scss');
var ButtonNormalExampleCode = require('./examples/Button.Normal.Example.tsx');
var ButtonPrimaryExampleCode = require('./examples/Button.Primary.Example.tsx');
var ButtonHeroExampleCode = require('./examples/Button.Hero.Example.tsx');
var ButtonCompoundExampleCode = require('./examples/Button.Compound.Example.tsx');
var ButtonCommandExampleCode = require('./examples/Button.Command.Example.tsx');
var ButtonIconExampleCode = require('./examples/Button.Icon.Example.tsx');
var ButtonAnchorExampleCode = require('./examples/Button.Anchor.Example.tsx');
var ButtonScreenReaderExampleCode = require('./examples/Button.ScreenReader.Example.tsx');
var ButtonPage = (function (_super) {
    __extends(ButtonPage, _super);
    function ButtonPage() {
        _super.call(this);
        this.state = {
            areButtonsDisabled: false
        };
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Button');
    }
    ButtonPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Button', componentName: 'ButtonExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_2.Checkbox, {label: 'Disable buttons', checked: this.state.areButtonsDisabled, onChange: this._onDisabledChanged.bind(this)}), 
            React.createElement(index_1.ExampleCard, {title: 'Normal Button', code: ButtonNormalExampleCode}, 
                React.createElement(Button_Normal_Example_1.ButtonNormalExample, {disabled: this.state.areButtonsDisabled})
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Primary Button', code: ButtonPrimaryExampleCode}, 
                React.createElement(Button_Primary_Example_1.ButtonPrimaryExample, {disabled: this.state.areButtonsDisabled})
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Hero Button', code: ButtonHeroExampleCode}, 
                React.createElement(Button_Hero_Example_1.ButtonHeroExample, {disabled: this.state.areButtonsDisabled})
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Compound Button', code: ButtonCompoundExampleCode}, 
                React.createElement(Button_Compound_Example_1.ButtonCompoundExample, {disabled: this.state.areButtonsDisabled})
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Command Button', code: ButtonCommandExampleCode}, 
                React.createElement(Button_Command_Example_1.ButtonCommandExample, {disabled: this.state.areButtonsDisabled})
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Icon Button', code: ButtonIconExampleCode}, 
                React.createElement(Button_Icon_Example_1.ButtonIconExample, {disabled: this.state.areButtonsDisabled})
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Button Like Anchor', code: ButtonAnchorExampleCode}, 
                React.createElement(Button_Anchor_Example_1.ButtonAnchorExample, {disabled: this.state.areButtonsDisabled})
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Button with Aria Description for Screen Reader', code: ButtonScreenReaderExampleCode}, 
                React.createElement(Button_ScreenReader_Example_1.ButtonScreenReaderExample, {disabled: this.state.areButtonsDisabled})
            )), propertiesTables: React.createElement("div", null, 
            React.createElement(index_1.PropertiesTableSet, {componentName: 'Button'}), 
            React.createElement("p", null, 
                "Besides the above properties, the ", 
                React.createElement("code", null, "Button"), 
                " component accepts all properties that the React ", 
                React.createElement("code", null, "button"), 
                " and ", 
                React.createElement("code", null, "a"), 
                " components accept.")), overview: React.createElement("div", null, 
            React.createElement("p", null, "Buttons are best used to enable a user to commit a change or complete steps in a task. They are typically found inside forms, dialogs, panels or pages. An example of their usage is confirming the deletion of a file in a confirmation dialog."), 
            React.createElement("p", null, "When considering their place in a layout, contemplate the order in which a user will flow through the UI. As an example, in a form, the individual will need to read and interact with the form fields before submiting the form. Therefore, as a general rule, the button should be placed at the bottom of the UI container (a dialog, panel, or page) which holds the related UI elements."), 
            React.createElement("p", null, "While buttons can technically be used to navigate a user to another part of the experience, this is not recommended unless that navigation is part of an action or their flow.")), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Button.md'}, "Fabric JS"), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Make sure the label conveys a clear purpose of the button to the user."), 
                React.createElement("li", null, "Button labels must describe the action the button will perform and should include a verb. Use concise, specific, self-explanatory labels, usually a single word."), 
                React.createElement("li", null, "Buttons should always include a noun if there is any room for interpretation about what the verb operates on."), 
                React.createElement("li", null, "Consider the affect localization will have on the button and what will happen to components around it."), 
                React.createElement("li", null, "If the button’s label content is dynamic, consider how the button will resize and what will happen to components around it."), 
                React.createElement("li", null, "Use only a single line of text in the label of the button."), 
                React.createElement("li", null, "Expose only one or two buttons to the user at a time, for example, \"Accept\" and \"Cancel\". If you need to expose more actions to the user, consider using checkboxes or radio buttons from which the user can select actions, with a single command button to trigger those actions."), 
                React.createElement("li", null, "Show only one primary button that inherits theme color at rest state. In the event there are more than two buttons with equal priority, all buttons should have neutral backgrounds."), 
                React.createElement("li", null, "\"Submit\", \"OK\", and \"Apply\" buttons should always be styled as primary buttons. When \"Reset\" or \"Cancel\" buttons appear alongside one of the above, they should be styled as secondary buttons."), 
                React.createElement("li", null, "Default buttons should always perform safe operations. For example, a default button should never delete."), 
                React.createElement("li", null, "Use task buttons to cause actions that complete a task or cause a transitional task. Do not use buttons to toggle other UX in the same context. For example, a button may be used to open an interface area but should not be used to open an additional set of components in the same interface."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Don't use generic labels like \"Ok,\" especially in the case of an error; errors are never \"Ok.\""), 
                React.createElement("li", null, "Don’t place the default focus on a button that destroys data. Instead, place the default focus on the button that performs the \"safe act\" and retains the content (i.e. \"Save\") or cancels the action (i.e. \"Cancel\")."), 
                React.createElement("li", null, "Don’t use a button to navigate to another place, use a link instead. The exception is in a wizard where \"Back\" and \"Next\" buttons may be used."), 
                React.createElement("li", null, "Don’t put too much text in a button - try to keep the length of your text to a minimum."), 
                React.createElement("li", null, "Don't put anything other than text in a button."))
        ), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    ButtonPage.prototype._onDisabledChanged = function (ev, disabled) {
        this.setState({
            areButtonsDisabled: disabled
        });
    };
    return ButtonPage;
}(React.Component));
exports.ButtonPage = ButtonPage;

//# sourceMappingURL=ButtonPage.js.map
