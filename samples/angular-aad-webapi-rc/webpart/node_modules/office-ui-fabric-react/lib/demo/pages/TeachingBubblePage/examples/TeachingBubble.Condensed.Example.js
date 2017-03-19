"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var index_1 = require('../../../../index');
var TeachingBubbleCondensedExample = (function (_super) {
    __extends(TeachingBubbleCondensedExample, _super);
    function TeachingBubbleCondensedExample() {
        _super.call(this);
        this._onDismiss = this._onDismiss.bind(this);
        this.state = {
            isTeachingBubbleVisible: false,
        };
    }
    TeachingBubbleCondensedExample.prototype.render = function () {
        var _this = this;
        var isTeachingBubbleVisible = this.state.isTeachingBubbleVisible;
        return (React.createElement("div", {className: 'ms-TeachingBubbleExample'}, 
            React.createElement("span", {className: 'ms-TeachingBubbleBasicExample-buttonArea', ref: function (menuButton) { return _this._menuButtonElement = menuButton; }}, 
                React.createElement(index_1.Button, {onClick: this._onDismiss}, isTeachingBubbleVisible ? 'Hide TeachingBubble' : 'Show TeachingBubble')
            ), 
            isTeachingBubbleVisible ? (React.createElement("div", null, 
                React.createElement(index_1.TeachingBubble, {targetElement: this._menuButtonElement, hasCondensedHeadline: true, onDismiss: this._onDismiss, hasCloseIcon: true, headline: 'Discover what’s trending around you'}, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni harum non?")
            )) : (null)));
    };
    TeachingBubbleCondensedExample.prototype._onDismiss = function (ev) {
        this.setState({
            isTeachingBubbleVisible: !this.state.isTeachingBubbleVisible
        });
    };
    return TeachingBubbleCondensedExample;
}(React.Component));
exports.TeachingBubbleCondensedExample = TeachingBubbleCondensedExample;

//# sourceMappingURL=TeachingBubble.Condensed.Example.js.map
