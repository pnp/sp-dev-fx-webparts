"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
require('./ExampleCard.scss');
var Button_1 = require('../../../Button');
var css_1 = require('../../../utilities/css');
var Highlight = require('react-highlight');
var ExampleCard = (function (_super) {
    __extends(ExampleCard, _super);
    function ExampleCard(props) {
        _super.call(this, props);
        this.state = {
            isCodeVisible: false
        };
        this._onToggleCodeClick = this._onToggleCodeClick.bind(this);
    }
    ExampleCard.prototype.render = function () {
        var _a = this.props, title = _a.title, code = _a.code, children = _a.children, isRightAligned = _a.isRightAligned;
        var isCodeVisible = this.state.isCodeVisible;
        var rootClass = 'ExampleCard' + (this.state.isCodeVisible ? ' is-codeVisible' : '');
        return (React.createElement("div", {className: rootClass}, 
            React.createElement("div", {className: 'ExampleCard-header'}, 
                React.createElement("span", {className: 'ExampleCard-title ms-font-l'}, title), 
                React.createElement("div", {className: 'ExampleCard-toggleButtons ms-font-l'}, code ? (React.createElement(Button_1.Button, {buttonType: Button_1.ButtonType.icon, icon: 'Embed', onClick: this._onToggleCodeClick, className: css_1.css('ExampleCard-codeButton', { 'is-active': isCodeVisible })}, this.state.isCodeVisible ? 'Hide code' : 'Show code')) : (null))), 
            React.createElement("div", {className: 'ExampleCard-code'}, 
                React.createElement(Highlight, {className: 'javascript'}, code)
            ), 
            React.createElement("div", {className: css_1.css('ExampleCard-example', { ' is-right-aligned': (isRightAligned) }), "data-is-scrollable": 'true'}, children), 
            this._getDosAndDonts()));
    };
    ExampleCard.prototype._getDosAndDonts = function () {
        if (this.props.dos && this.props.donts) {
            return (React.createElement("div", {className: 'ExampleCard-dosAndDonts'}, 
                React.createElement("div", {className: 'ExampleCard-dos'}, 
                    React.createElement("h4", null, "Do"), 
                    this.props.dos), 
                React.createElement("div", {className: 'ExampleCard-donts'}, 
                    React.createElement("h4", null, "Do not"), 
                    this.props.donts)));
        }
    };
    ExampleCard.prototype._onToggleCodeClick = function () {
        this.setState({
            isCodeVisible: !this.state.isCodeVisible
        });
    };
    return ExampleCard;
}(React.Component));
exports.ExampleCard = ExampleCard;

//# sourceMappingURL=ExampleCard.js.map
