"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var ButtonHeroExample = (function (_super) {
    __extends(ButtonHeroExample, _super);
    function ButtonHeroExample() {
        _super.call(this);
    }
    ButtonHeroExample.prototype.render = function () {
        var disabled = this.props.disabled;
        return (React.createElement("div", {className: 'ms-BasicButtonsExample'}, 
            React.createElement(index_1.Label, null, "Hero button"), 
            React.createElement(index_1.Button, {disabled: disabled, buttonType: index_1.ButtonType.hero, icon: 'Add'}, "Create account")));
    };
    return ButtonHeroExample;
}(React.Component));
exports.ButtonHeroExample = ButtonHeroExample;

//# sourceMappingURL=Button.Hero.Example.js.map
