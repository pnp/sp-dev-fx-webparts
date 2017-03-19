"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var ButtonCompoundExample = (function (_super) {
    __extends(ButtonCompoundExample, _super);
    function ButtonCompoundExample() {
        _super.call(this);
    }
    ButtonCompoundExample.prototype.render = function () {
        var disabled = this.props.disabled;
        return (React.createElement("div", {className: 'ms-BasicButtonsExample'}, 
            React.createElement(index_1.Label, null, "Compound button"), 
            React.createElement(index_1.Button, {disabled: disabled, buttonType: index_1.ButtonType.compound, description: 'You can create a new account here.'}, "Create account")));
    };
    return ButtonCompoundExample;
}(React.Component));
exports.ButtonCompoundExample = ButtonCompoundExample;

//# sourceMappingURL=Button.Compound.Example.js.map
