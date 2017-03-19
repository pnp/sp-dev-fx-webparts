"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var PanelExtraLargeExample = (function (_super) {
    __extends(PanelExtraLargeExample, _super);
    function PanelExtraLargeExample() {
        _super.call(this);
        this.state = {
            showPanel: false
        };
    }
    PanelExtraLargeExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Button, {description: 'Opens the Sample Panel', onClick: this._showPanel.bind(this)}, "Open Panel"), 
            React.createElement(index_1.Panel, {isOpen: this.state.showPanel, onDismiss: this._closePanel.bind(this), type: index_1.PanelType.extraLarge, headerText: 'Extra Large Panel', closeButtonAriaLabel: 'Close'}, 
                React.createElement("span", {className: 'ms-font-m'}, "Content goes here.")
            )));
    };
    PanelExtraLargeExample.prototype._showPanel = function () {
        this.setState({ showPanel: true });
    };
    PanelExtraLargeExample.prototype._closePanel = function () {
        this.setState({ showPanel: false });
    };
    return PanelExtraLargeExample;
}(React.Component));
exports.PanelExtraLargeExample = PanelExtraLargeExample;

//# sourceMappingURL=Panel.ExtraLarge.Example.js.map
