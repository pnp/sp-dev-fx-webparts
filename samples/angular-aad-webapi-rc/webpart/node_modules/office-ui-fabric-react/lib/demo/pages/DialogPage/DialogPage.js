"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Dialog_Basic_Example_1 = require('./examples/Dialog.Basic.Example');
var Dialog_LargeHeader_Example_1 = require('./examples/Dialog.LargeHeader.Example');
var Dialog_Close_Example_1 = require('./examples/Dialog.Close.Example');
var Dialog_Blocking_Example_1 = require('./examples/Dialog.Blocking.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var DialogBasicExampleCode = require('./examples/Dialog.Basic.Example.tsx');
var DialogLargeHeaderExampleCode = require('./examples/Dialog.LargeHeader.Example.tsx');
var DialogCloseExampleCode = require('./examples/Dialog.Close.Example.tsx');
var DialogBlockingExampleCode = require('./examples/Dialog.Blocking.Example.tsx');
var DialogPage = (function (_super) {
    __extends(DialogPage, _super);
    function DialogPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Dialog');
    }
    DialogPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Dialog', componentName: 'DialogExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'Dialog', code: DialogBasicExampleCode}, 
                React.createElement(Dialog_Basic_Example_1.DialogBasicExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Dialog Large Header', code: DialogLargeHeaderExampleCode}, 
                React.createElement("p", null, "Use this Dialog sparingly, when calling extra attention to the content. It can be used in situations where you want to teach the user something or notify them of an important change."), 
                React.createElement(Dialog_LargeHeader_Example_1.DialogLargeHeaderExample, null)), 
            React.createElement(index_1.ExampleCard, {title: 'Dialog Close', code: DialogCloseExampleCode}, 
                React.createElement("p", null, "Use a Dialog with an explicit close button when the user is able to close the Dialog without providing the necessary information that it asks for. This is the most common type of dialog; it is generally used for user initiated actions that they change their mind about, or other non-critical information."), 
                React.createElement(Dialog_Close_Example_1.DialogCloseExample, null)), 
            React.createElement(index_1.ExampleCard, {title: 'Dialog Blocking', code: DialogBlockingExampleCode}, 
                React.createElement("p", null, "A blocking Dialog disables all other actions and commands on the page behind it. They should be used very sparingly, only when it is critical that the user makes a choice or provides information before they can proceed. Blocking Dialogs are generally used for irreversible or potentially destructive tasks."), 
                React.createElement(Dialog_Blocking_Example_1.DialogBlockingExample, null))), propertiesTables: React.createElement("div", null, 
            React.createElement(index_1.PropertiesTableSet, {componentName: 'Dialog'})
        ), overview: React.createElement("div", null, 
            React.createElement("p", null, "Dialogs are temporary, modal UI overlay that generally provide contextual app information or require user confirmation/input. In most cases, Dialogs block interactions with the web page or application until being explicitly dismissed, and often request action from the user. They are primarily used for lightweight creation or edit tasks, and simple management tasks.")
        ), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use Dialogs for quick, actionable interactions, such as making a choice or needing the user to provide information."), 
                React.createElement("li", null, "When possible, try a non-blocking Dialog before resorting to a blocking Dialog."), 
                React.createElement("li", null, "Only include information needed to help users make a decision."), 
                React.createElement("li", null, "Button text should reflect the actions available to the user (e.g. save, delete)."), 
                React.createElement("li", null, "Validate that the user's entries are acceptable before closing the Dialog. Show an inline validation error near the field they must correct."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Don’t overuse Dialogs. To some extent they can be perceived as interrupting workflow, and too many can be a bad user experience."), 
                React.createElement("li", null, "Avoid \"Are you sure?\" or confirmation Dialogs unless the user is making an irreversible or destructive choice."), 
                React.createElement("li", null, "Do not use a blocking Dialog unless absolutely necessary because they are very disruptive."), 
                React.createElement("li", null, "Don’t have long sentences or complicated choices."), 
                React.createElement("li", null, "Avoid generic button labels like \"Ok\" if you can be more specific about the action a user is about to complete. "), 
                React.createElement("li", null, "Don't dismiss the Dialog if underlying problem is not fixed. Don't put the user back into a broken/error state."), 
                React.createElement("li", null, "Don't provide the user with more than 3 buttons."))
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Dialog.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return DialogPage;
}(React.Component));
exports.DialogPage = DialogPage;

//# sourceMappingURL=DialogPage.js.map
