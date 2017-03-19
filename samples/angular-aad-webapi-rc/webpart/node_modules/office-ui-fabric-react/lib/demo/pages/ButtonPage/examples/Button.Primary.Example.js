"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var ButtonPrimaryExample = (function (_super) {
    __extends(ButtonPrimaryExample, _super);
    function ButtonPrimaryExample() {
        _super.call(this);
    }
    ButtonPrimaryExample.prototype.render = function () {
        var disabled = this.props.disabled;
        return (React.createElement("div", {className: 'ms-BasicButtonsExample'}, 
            React.createElement(index_1.Label, null, "Primary button"), 
            React.createElement(index_1.Button, {"data-automation-id": 'test', disabled: disabled, buttonType: index_1.ButtonType.primary}, "Create account")));
    };
    return ButtonPrimaryExample;
}(React.Component));
exports.ButtonPrimaryExample = ButtonPrimaryExample;

//# sourceMappingURL=Button.Primary.Example.js.map
