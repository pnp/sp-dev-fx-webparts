"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var BaseComponent_1 = require('../../common/BaseComponent');
var Button_1 = require('../../Button');
var Image_1 = require('../../Image');
var Utilities_1 = require('../../Utilities');
require('./TeachingBubble.scss');
var TeachingBubbleContent = (function (_super) {
    __extends(TeachingBubbleContent, _super);
    // Constructor
    function TeachingBubbleContent(props) {
        _super.call(this, props);
        this._id = Utilities_1.getId('TeachingBubble');
        this.state = {};
    }
    TeachingBubbleContent.prototype.render = function () {
        var _a = this.props, illustrationImage = _a.illustrationImage, primaryButtonProps = _a.primaryButtonProps, secondaryButtonProps = _a.secondaryButtonProps, headline = _a.headline, hasCondensedHeadline = _a.hasCondensedHeadline, hasCloseIcon = _a.hasCloseIcon, onDismiss = _a.onDismiss, closeButtonAriaLabel = _a.closeButtonAriaLabel;
        var imageContent;
        var headerContent;
        var bodyContent;
        var footerContent;
        var closeButton;
        if (illustrationImage && illustrationImage.src) {
            imageContent = (React.createElement("div", {className: 'ms-TeachingBubble-header'}, 
                React.createElement(Image_1.Image, __assign({}, illustrationImage))
            ));
        }
        if (headline) {
            headerContent = (React.createElement("div", {className: Utilities_1.css('ms-TeachingBubble-header', hasCondensedHeadline ? 'ms-TeachingBubble-header--small' : 'ms-TeachingBubble-header--large')}, 
                React.createElement("p", {className: 'ms-TeachingBubble-headline'}, headline)
            ));
        }
        if (this.props.children) {
            bodyContent = (React.createElement("div", {className: 'ms-TeachingBubble-body'}, 
                React.createElement("p", {className: 'ms-TeachingBubble-subText'}, this.props.children)
            ));
        }
        if (primaryButtonProps || secondaryButtonProps) {
            footerContent = (React.createElement("div", {className: 'ms-TeachingBubble-footer'}, 
                primaryButtonProps ? React.createElement(Button_1.Button, __assign({className: 'ms-TeachingBubble-primaryButton'}, primaryButtonProps)) : null, 
                secondaryButtonProps ? React.createElement(Button_1.Button, __assign({className: 'ms-TeachingBubble-secondaryButton'}, secondaryButtonProps)) : null));
        }
        if (hasCloseIcon) {
            closeButton = (React.createElement(Button_1.Button, {className: 'ms-TeachingBubble-closebutton', buttonType: Button_1.ButtonType.icon, icon: 'Cancel', title: closeButtonAriaLabel, ariaLabel: closeButtonAriaLabel, onClick: onDismiss}));
        }
        return (React.createElement("div", {className: 'ms-TeachingBubble-content'}, 
            imageContent, 
            closeButton, 
            React.createElement("div", {className: 'ms-TeachingBubble-bodycontent'}, 
                headerContent, 
                bodyContent, 
                footerContent)));
    };
    // Specify default props values
    TeachingBubbleContent.defaultProps = {
        hasCondensedHeadline: false,
        imageProps: {
            imageFit: Image_1.ImageFit.cover,
            width: 364,
            height: 130
        }
    };
    return TeachingBubbleContent;
}(BaseComponent_1.BaseComponent));
exports.TeachingBubbleContent = TeachingBubbleContent;

//# sourceMappingURL=TeachingBubbleContent.js.map
