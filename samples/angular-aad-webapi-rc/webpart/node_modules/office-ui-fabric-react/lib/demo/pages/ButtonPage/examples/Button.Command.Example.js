"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var ButtonCommandExample = (function (_super) {
    __extends(ButtonCommandExample, _super);
    function ButtonCommandExample() {
        _super.call(this);
    }
    ButtonCommandExample.prototype.render = function () {
        var disabled = this.props.disabled;
        return (React.createElement("div", {className: 'ms-BasicButtonsExample'}, 
            React.createElement(index_1.Label, null, "Command button"), 
            React.createElement(index_1.Button, {"data-automation-id": 'test', buttonType: index_1.ButtonType.command, icon: 'AddFriend', description: 'Description of the action this button takes', disabled: disabled}, "Create account")));
    };
    return ButtonCommandExample;
}(React.Component));
exports.ButtonCommandExample = ButtonCommandExample;

//# sourceMappingURL=Button.Command.Example.js.map
