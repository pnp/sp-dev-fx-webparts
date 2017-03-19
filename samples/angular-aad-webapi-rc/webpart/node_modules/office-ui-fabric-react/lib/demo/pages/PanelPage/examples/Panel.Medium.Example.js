"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var PanelMediumExample = (function (_super) {
    __extends(PanelMediumExample, _super);
    function PanelMediumExample() {
        _super.call(this);
        this.state = {
            showPanel: false
        };
    }
    PanelMediumExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Button, {description: 'Opens the Sample Panel', onClick: this._showPanel.bind(this)}, "Open Panel"), 
            React.createElement(index_1.Panel, {isOpen: this.state.showPanel, onDismiss: this._closePanel.bind(this), type: index_1.PanelType.medium, headerText: 'Medium Panel'}, 
                React.createElement("span", {className: 'ms-font-m'}, "Content goes here.")
            )));
    };
    PanelMediumExample.prototype._showPanel = function () {
        this.setState({ showPanel: true });
    };
    PanelMediumExample.prototype._closePanel = function () {
        this.setState({ showPanel: false });
    };
    return PanelMediumExample;
}(React.Component));
exports.PanelMediumExample = PanelMediumExample;

//# sourceMappingURL=Panel.Medium.Example.js.map
