"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var index_1 = require('../../../../index');
require('./MessageBar.Basic.Example.scss');
exports.MessageBarBasicExample = function () { return (React.createElement("div", {className: 'ms-BasicMessageBarsExample'}, 
    React.createElement(index_1.Label, null, "Info/Default MessageBar"), 
    React.createElement(index_1.MessageBar, null, "Info - lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit."), 
    React.createElement(index_1.Label, null, "Error MessageBar - only dismiss"), 
    React.createElement(index_1.MessageBar, {messageBarType: index_1.MessageBarType.error, onDismiss: function () { console.log('test'); }}, "Error - lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit."), 
    React.createElement("p", null, "Add a close box when the user can safely dismiss the message. They’ll want to do this to reclaim space or if they feel too disrupted."), 
    React.createElement(index_1.Label, null, "Blocked MessageBar - single line"), 
    React.createElement(index_1.MessageBar, {messageBarType: index_1.MessageBarType.blocked, onDismiss: function () { console.log('test'); }, isMultiline: false, actions: React.createElement("div", null, 
        React.createElement(index_1.Button, null, "Yes"), 
        React.createElement(index_1.Button, null, "No"))}, 
        "Blocked - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris. ", 
        React.createElement(index_1.Link, {href: 'www.bing.com'}, "Visit our website")), 
    React.createElement(index_1.Label, null, "SevereWarning MessageBar - multiline (default)"), 
    React.createElement(index_1.MessageBar, {messageBarType: index_1.MessageBarType.severeWarning, actions: React.createElement("div", null, 
        React.createElement(index_1.Button, null, "Yes"), 
        React.createElement(index_1.Button, null, "No"))}, "SevereWarning - lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit."), 
    React.createElement(index_1.Label, null, "Success MessageBar - single line, long text with buttons"), 
    React.createElement(index_1.MessageBar, {actions: React.createElement("div", null, 
        React.createElement(index_1.Button, null, "Yes"), 
        React.createElement(index_1.Button, null, "No")), messageBarType: index_1.MessageBarType.success, isMultiline: false}, 
        "Success - Lorem ipsum dolor sit amet ", 
        React.createElement(index_1.Link, {href: 'www.bing.com'}, "Visit our website")), 
    React.createElement(index_1.Label, null, "Warning MessageBar"), 
    React.createElement(index_1.MessageBar, {onDismiss: function () { console.log('test'); }, messageBarType: index_1.MessageBarType.warning, ariaLabel: 'Aria help text here', actions: React.createElement("div", null, 
        React.createElement(index_1.Button, null, "Yes"), 
        React.createElement(index_1.Button, null, "No"))}, 
        "Warning - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris.", 
        React.createElement(index_1.Link, {href: 'www.bing.com'}, "Visit our website")))); };

//# sourceMappingURL=MessageBar.Basic.Example.js.map
