"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
require('./CalloutExample.scss');
var index_1 = require('../../../../index');
var DIRECTION_OPTIONS = [
    { key: index_1.DirectionalHint[index_1.DirectionalHint.topLeftEdge], text: 'Top Left Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.topCenter], text: 'Top Center' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.topRightEdge], text: 'Top Right Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.topAutoEdge], text: 'Top Auto Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.bottomLeftEdge], text: 'Bottom Left Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.bottomCenter], text: 'Bottom Center' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.bottomRightEdge], text: 'Bottom Right Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.bottomAutoEdge], text: 'Bottom Auto Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.leftTopEdge], text: 'Left Top Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.leftCenter], text: 'Left Center' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.leftBottomEdge], text: 'Left Bottom Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.rightTopEdge], text: 'Right Top Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.rightCenter], text: 'Right Center' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.rightBottomEdge], text: 'Right Bottom Edge' },
];
var CalloutCoverExample = (function (_super) {
    __extends(CalloutCoverExample, _super);
    function CalloutCoverExample() {
        _super.call(this);
        this._onDismiss = this._onDismiss.bind(this);
        this._onShowMenuClicked = this._onShowMenuClicked.bind(this);
        this._onDirectionalChanged = this._onDirectionalChanged.bind(this);
        this.state = {
            isCalloutVisible: false,
            directionalHint: index_1.DirectionalHint.bottomLeftEdge
        };
    }
    CalloutCoverExample.prototype.render = function () {
        var _this = this;
        var _a = this.state, isCalloutVisible = _a.isCalloutVisible, directionalHint = _a.directionalHint;
        // ms-Callout-smallbeak is used in this directional example to reflect all the positions. Large beak will disable some position to avoid beak over the callout edge.
        return (React.createElement("div", {className: 'ms-CalloutExample'}, 
            React.createElement("div", {className: 'ms-CalloutExample-configArea'}, 
                React.createElement(index_1.Dropdown, {label: 'Directional hint', selectedKey: index_1.DirectionalHint[directionalHint], options: DIRECTION_OPTIONS, onChanged: this._onDirectionalChanged})
            ), 
            React.createElement("div", {className: 'ms-CalloutCoverExample-buttonArea', ref: function (menuButton) { return _this._menuButtonElement = menuButton; }}, 
                React.createElement(index_1.Button, {onClick: this._onShowMenuClicked}, isCalloutVisible ? 'Hide callout' : 'Show callout')
            ), 
            isCalloutVisible ? (React.createElement(index_1.Callout, {className: 'ms-CalloutExample-callout', onDismiss: this._onDismiss, targetElement: this._menuButtonElement, directionalHint: directionalHint, coverTarget: true, isBeakVisible: false, gapSpace: 0}, 
                React.createElement("div", {className: 'ms-CalloutExample-header'}, 
                    React.createElement("p", {className: 'ms-CalloutExample-title'}, "I'm covering the target!")
                ), 
                React.createElement("div", {className: 'ms-CalloutExample-inner'}, 
                    React.createElement("div", {className: 'ms-CalloutExample-content'}, 
                        React.createElement(index_1.Button, {onClick: this._onShowMenuClicked}, " Click to dismiss ")
                    )
                ))) : (null)));
    };
    CalloutCoverExample.prototype._onDismiss = function () {
        this.setState({ isCalloutVisible: false });
    };
    CalloutCoverExample.prototype._onShowMenuClicked = function () {
        this.setState({
            isCalloutVisible: !this.state.isCalloutVisible
        });
    };
    CalloutCoverExample.prototype._onDirectionalChanged = function (option) {
        this.setState({
            directionalHint: index_1.DirectionalHint[option.key]
        });
    };
    return CalloutCoverExample;
}(React.Component));
exports.CalloutCoverExample = CalloutCoverExample;

//# sourceMappingURL=Callout.Cover.Example.js.map
