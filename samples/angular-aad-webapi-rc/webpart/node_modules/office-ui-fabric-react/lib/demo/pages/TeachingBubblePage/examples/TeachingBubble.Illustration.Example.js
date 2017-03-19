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
var TeachingBubbleIllustrationExample = (function (_super) {
    __extends(TeachingBubbleIllustrationExample, _super);
    function TeachingBubbleIllustrationExample() {
        _super.call(this);
        this._onDismiss = this._onDismiss.bind(this);
        this.state = {
            isTeachingBubbleVisible: false,
        };
    }
    TeachingBubbleIllustrationExample.prototype.render = function () {
        var _this = this;
        var isTeachingBubbleVisible = this.state.isTeachingBubbleVisible;
        var exampleImageProps = { src: 'http://placehold.it/364x140' };
        var examplePrimaryButton = {
            buttonType: index_1.ButtonType.primary,
            children: 'Try it out',
        };
        var exampleSecondaryButtonProps = {
            children: 'May be later',
            onClick: this._onDismiss
        };
        return (React.createElement("div", {className: 'ms-TeachingBubbleExample'}, 
            React.createElement("span", {className: 'ms-TeachingBubbleBasicExample-buttonArea', ref: function (menuButton) { return _this._menuButtonElement = menuButton; }}, 
                React.createElement(index_1.Button, {onClick: this._onDismiss}, isTeachingBubbleVisible ? 'Hide TeachingBubble' : 'Show TeachingBubble')
            ), 
            isTeachingBubbleVisible ? (React.createElement("div", null, 
                React.createElement(index_1.TeachingBubble, {illustrationImage: exampleImageProps, targetElement: this._menuButtonElement, primaryButtonProps: examplePrimaryButton, secondaryButtonProps: exampleSecondaryButtonProps, onDismiss: this._onDismiss, headline: 'Discover what’s trending around you'}, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni harum non?")
            )) : (null)));
    };
    TeachingBubbleIllustrationExample.prototype._onDismiss = function (ev) {
        this.setState({
            isTeachingBubbleVisible: !this.state.isTeachingBubbleVisible
        });
    };
    return TeachingBubbleIllustrationExample;
}(React.Component));
exports.TeachingBubbleIllustrationExample = TeachingBubbleIllustrationExample;

//# sourceMappingURL=TeachingBubble.Illustration.Example.js.map
