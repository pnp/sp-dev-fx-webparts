"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var ButtonNormalExample = (function (_super) {
    __extends(ButtonNormalExample, _super);
    function ButtonNormalExample() {
        _super.call(this);
    }
    ButtonNormalExample.prototype.render = function () {
        var disabled = this.props.disabled;
        return (React.createElement("div", {className: 'ms-BasicButtonsExample'}, 
            React.createElement(index_1.Label, null, "Normal button"), 
            React.createElement(index_1.Button, {"data-automation-id": 'test', disabled: disabled}, "Create account")));
    };
    return ButtonNormalExample;
}(React.Component));
exports.ButtonNormalExample = ButtonNormalExample;

//# sourceMappingURL=Button.Normal.Example.js.map
