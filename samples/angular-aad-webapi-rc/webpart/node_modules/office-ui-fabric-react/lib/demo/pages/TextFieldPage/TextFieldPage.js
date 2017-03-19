"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var TextField_Basic_Example_1 = require('./examples/TextField.Basic.Example');
var TextField_ErrorMessage_Example_1 = require('./examples/TextField.ErrorMessage.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var TextFieldBasicExampleCode = require('./examples/TextField.Basic.Example.tsx');
var TextFieldErrorMessageExampleCode = require('./examples/TextField.ErrorMessage.Example.tsx');
var TextFieldPage = (function (_super) {
    __extends(TextFieldPage, _super);
    function TextFieldPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'TextField');
    }
    TextFieldPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'TextField', componentName: 'TextFieldExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'TextField variations', code: TextFieldBasicExampleCode}, 
                React.createElement(TextField_Basic_Example_1.TextFieldBasicExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'TextField error message variations', code: TextFieldErrorMessageExampleCode}, 
                React.createElement(TextField_ErrorMessage_Example_1.TextFieldErrorMessageExample, null)
            )), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'TextField'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "The TextField component enables a user to type text into an app. It's typically used to capture a single line of text, but can be configured to capture multiple lines of text. The text displays on the screen in a simple, uniform format.")
        ), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use the TextField to accept data input on a form or page."), 
                React.createElement("li", null, "Label the TextField with a helpful name. "), 
                React.createElement("li", null, "Provide concise helper text that specifies what content is expected to be entered."), 
                React.createElement("li", null, "Provide all appropriate states for the control (static, hover, focus, engaged, unavailable, error)."), 
                React.createElement("li", null, "When part of a form, provide clear designations for which fields are required vs. optional."), 
                React.createElement("li", null, "Provide all appropriate methods for submitting provided data (onEnter or a dedicated ‘Submit’ button)."), 
                React.createElement("li", null, "Provide all appropriate methods of clearing provided data (‘X’ or something similar)."), 
                React.createElement("li", null, "Allow for selection, copy and paste of field data."), 
                React.createElement("li", null, "Whenever possible, format TextField relative to the expected entry (4-digit PIN, 10-digit phone number (3 separate fields), etc)."), 
                React.createElement("li", null, "When long entries are expected, provide a mechanism for overflow or expansion of the control itself."), 
                React.createElement("li", null, "Ensure that the TextField is functional through use of mouse/keyboard or touch when available."), 
                React.createElement("li", null, "Ensure that the TextField is accessible through screen reader and/or other accessibility tools."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Don’t use a TextField to render basic copy as part of a body element of a page."), 
                React.createElement("li", null, "Don’t provide an unlabeled TextField and expect that users will know what to do with it."), 
                React.createElement("li", null, "Don’t place a TextField inline with body copy.  "), 
                React.createElement("li", null, "Don’t be overly verbose with helper text."), 
                React.createElement("li", null, "Don’t occlude the entry or allow entry when the active content is not visible."))
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/TextField.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return TextFieldPage;
}(React.Component));
exports.TextFieldPage = TextFieldPage;

//# sourceMappingURL=TextFieldPage.js.map
