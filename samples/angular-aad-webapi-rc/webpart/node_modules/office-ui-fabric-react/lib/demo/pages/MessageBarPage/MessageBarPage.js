"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var MessageBar_Basic_Example_1 = require('./examples/MessageBar.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var MessageBarBasicExampleCode = require('./examples/MessageBar.Basic.Example.tsx');
var MessageBarPage = (function (_super) {
    __extends(MessageBarPage, _super);
    function MessageBarPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'MessageBar');
    }
    MessageBarPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'MessageBar', componentName: 'MessageBarExample', exampleCards: React.createElement(index_1.ExampleCard, {title: 'Various MessageBar types', code: MessageBarBasicExampleCode}, 
            React.createElement(MessageBar_Basic_Example_1.MessageBarBasicExample, null)
        ), propertiesTables: React.createElement("div", null, 
            React.createElement(index_1.PropertiesTableSet, {componentName: 'MessageBar'}), 
            ",", 
            React.createElement("p", null, 
                "Besides the above properties, the ", 
                React.createElement("code", null, "MessageBar"), 
                " component accepts all properties that the React ", 
                React.createElement("code", null, "MessageBar"), 
                " and ", 
                React.createElement("code", null, "a"), 
                " components accept.")), overview: React.createElement("div", null, 
            React.createElement("p", null, "A MessageBar is an area at the top of a primary view that displays relevant status information. You can use a MessageBar to tell the user about a situation that does not require their immediate attention and therefore does not need to block other activities.")
        ), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Place the message bar near the top of the relevant view, in a highly visible but unobtrusive location."), 
                React.createElement("li", null, "Keep the text very brief. Be succinct and your users are more likely to read everything you say."), 
                React.createElement("li", null, "Consider how localization may affect the message. Translation to other languages may add up to 33% more characters to the string length."), 
                React.createElement("li", null, "Use the right variant for the type and urgency of the particular message (see variants)"))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Don’t use paragraphs, long sentences, or special formatting in a MessageBar. The control tries to grow to accommodate all the text and will just result in pushing the user’s main content too low on the view."), 
                React.createElement("li", null, "Don’t use buttons when a subtler link will suffice. Reserve the usage of button for when the MessageBar has a single ”hero” action that has vital usefulness to the user at that particular moment. Using more than one button is discouraged."))
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/MessageBar.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return MessageBarPage;
}(React.Component));
exports.MessageBarPage = MessageBarPage;

//# sourceMappingURL=MessageBarPage.js.map
