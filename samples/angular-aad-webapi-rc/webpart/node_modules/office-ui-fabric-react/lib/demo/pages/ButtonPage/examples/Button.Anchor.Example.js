"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var ButtonAnchorExample = (function (_super) {
    __extends(ButtonAnchorExample, _super);
    function ButtonAnchorExample() {
        _super.call(this);
    }
    ButtonAnchorExample.prototype.render = function () {
        var disabled = this.props.disabled;
        return (React.createElement("div", {className: 'ms-BasicButtonsExample'}, 
            React.createElement(index_1.Label, null, "Button like anchor"), 
            React.createElement(index_1.Button, {"data-automation-id": 'test', disabled: disabled, buttonType: index_1.ButtonType.primary, href: 'http://bing.com', target: '_blank', title: 'Let us bing!', description: 'Navigate to Bing home page.'}, "Bing")));
    };
    return ButtonAnchorExample;
}(React.Component));
exports.ButtonAnchorExample = ButtonAnchorExample;

//# sourceMappingURL=Button.Anchor.Example.js.map
