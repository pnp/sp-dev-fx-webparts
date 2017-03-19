"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var PanelLightDismissExample = (function (_super) {
    __extends(PanelLightDismissExample, _super);
    function PanelLightDismissExample() {
        _super.call(this);
        this.state = {
            showPanel: false
        };
    }
    PanelLightDismissExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Button, {description: 'Opens the Sample Panel', onClick: this._showPanel.bind(this)}, "Open Panel"), 
            React.createElement(index_1.Panel, {isOpen: this.state.showPanel, isLightDismiss: true, onDismiss: this._closePanel.bind(this), headerText: 'Light Dismiss Panel'}, 
                React.createElement("span", {className: 'ms-font-m'}, "Light Dismiss usage is meant for the Contextual Menu on mobile sized breakpoints.")
            )));
    };
    PanelLightDismissExample.prototype._showPanel = function () {
        this.setState({ showPanel: true });
    };
    PanelLightDismissExample.prototype._closePanel = function () {
        this.setState({ showPanel: false });
    };
    return PanelLightDismissExample;
}(React.Component));
exports.PanelLightDismissExample = PanelLightDismissExample;

//# sourceMappingURL=Panel.LightDismiss.Example.js.map
