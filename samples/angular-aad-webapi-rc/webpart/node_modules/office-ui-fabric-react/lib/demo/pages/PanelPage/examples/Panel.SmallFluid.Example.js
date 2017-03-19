"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var PanelSmallFluidExample = (function (_super) {
    __extends(PanelSmallFluidExample, _super);
    function PanelSmallFluidExample() {
        _super.call(this);
        this.state = {
            showPanel: false
        };
    }
    PanelSmallFluidExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Button, {description: 'Opens the Sample Panel', onClick: this._showPanel.bind(this)}, "Open Panel"), 
            React.createElement(index_1.Panel, {isOpen: this.state.showPanel, type: index_1.PanelType.smallFluid, onDismiss: this._closePanel.bind(this), headerText: 'Panel - Small, right-aligned, fixed'}, 
                React.createElement("span", {className: 'ms-font-m'}, "Content goes here.")
            )));
    };
    PanelSmallFluidExample.prototype._showPanel = function () {
        this.setState({ showPanel: true });
    };
    PanelSmallFluidExample.prototype._closePanel = function () {
        this.setState({ showPanel: false });
    };
    return PanelSmallFluidExample;
}(React.Component));
exports.PanelSmallFluidExample = PanelSmallFluidExample;

//# sourceMappingURL=Panel.SmallFluid.Example.js.map
