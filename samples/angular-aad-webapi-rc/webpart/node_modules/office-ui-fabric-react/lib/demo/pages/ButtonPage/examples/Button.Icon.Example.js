"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var ButtonIconExample = (function (_super) {
    __extends(ButtonIconExample, _super);
    function ButtonIconExample() {
        _super.call(this);
    }
    ButtonIconExample.prototype.render = function () {
        var disabled = this.props.disabled;
        return (React.createElement("div", {className: 'ms-BasicButtonsExample'}, 
            React.createElement(index_1.Label, null, "Icon button"), 
            React.createElement(index_1.Button, {disabled: disabled, buttonType: index_1.ButtonType.icon, icon: 'Emoji2', title: 'Emoji', ariaLabel: 'Emoji'})));
    };
    return ButtonIconExample;
}(React.Component));
exports.ButtonIconExample = ButtonIconExample;

//# sourceMappingURL=Button.Icon.Example.js.map
