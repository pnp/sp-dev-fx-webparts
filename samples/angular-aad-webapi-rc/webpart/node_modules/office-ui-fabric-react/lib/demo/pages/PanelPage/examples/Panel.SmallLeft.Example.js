"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var PanelSmallLeftExample = (function (_super) {
    __extends(PanelSmallLeftExample, _super);
    function PanelSmallLeftExample() {
        _super.call(this);
        this.state = {
            showPanel: false
        };
    }
    PanelSmallLeftExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Button, {description: 'Opens the Sample Panel', onClick: this._showPanel.bind(this)}, "Open Panel"), 
            React.createElement(index_1.Panel, {isOpen: this.state.showPanel, type: index_1.PanelType.smallFixedNear, onDismiss: this._closePanel.bind(this), headerText: 'Panel - Small, left-aligned, fixed'}, 
                React.createElement("span", {className: 'ms-font-m'}, "Content goes here.")
            )));
    };
    PanelSmallLeftExample.prototype._showPanel = function () {
        this.setState({ showPanel: true });
    };
    PanelSmallLeftExample.prototype._closePanel = function () {
        this.setState({ showPanel: false });
    };
    return PanelSmallLeftExample;
}(React.Component));
exports.PanelSmallLeftExample = PanelSmallLeftExample;

//# sourceMappingURL=Panel.SmallLeft.Example.js.map
