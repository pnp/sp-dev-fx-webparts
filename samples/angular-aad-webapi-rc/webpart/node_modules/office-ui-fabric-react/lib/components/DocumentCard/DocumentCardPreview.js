"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var Image_1 = require('../../Image');
var css_1 = require('../../utilities/css');
var autobind_1 = require('../../utilities/autobind');
require('./DocumentCardPreview.scss');
var LIST_ITEM_COUNT = 3;
var DocumentCardPreview = (function (_super) {
    __extends(DocumentCardPreview, _super);
    function DocumentCardPreview() {
        _super.apply(this, arguments);
    }
    DocumentCardPreview.prototype.render = function () {
        var previewImages = this.props.previewImages;
        var style, preview;
        var isFileList = false;
        if (previewImages.length > 1) {
            // Render a list of files
            preview = this._renderPreviewList(previewImages);
            isFileList = true;
        }
        else if (previewImages.length === 1) {
            // Render a single preview
            preview = this._renderPreviewImage(previewImages[0]);
            // Override the border color if an accent color was provided
            if (previewImages[0].accentColor) {
                style = {
                    borderBottomColor: previewImages[0].accentColor
                };
            }
        }
        return (React.createElement("div", {className: css_1.css('ms-DocumentCardPreview', isFileList && 'is-fileList'), style: style}, preview));
    };
    DocumentCardPreview.prototype._renderPreviewImage = function (previewImage) {
        var width = previewImage.width, height = previewImage.height, imageFit = previewImage.imageFit;
        var image = (React.createElement(Image_1.Image, {width: width, height: height, imageFit: imageFit, src: previewImage.previewImageSrc, errorSrc: previewImage.errorImageSrc, role: 'presentation', alt: ''}));
        var icon;
        if (previewImage.iconSrc) {
            icon = React.createElement(Image_1.Image, {className: 'ms-DocumentCardPreview-icon', src: previewImage.iconSrc, role: 'presentation', alt: ''});
        }
        return (React.createElement("div", null, 
            image, 
            icon));
    };
    DocumentCardPreview.prototype._renderPreviewList = function (previewImages) {
        var getOverflowDocumentCountText = this.props.getOverflowDocumentCountText;
        // Determine how many documents we won't be showing
        var overflowDocumentCount = previewImages.length - LIST_ITEM_COUNT;
        // Determine the overflow text that will be rendered after the preview list.
        var overflowText = overflowDocumentCount ?
            (getOverflowDocumentCountText ?
                getOverflowDocumentCountText(overflowDocumentCount) :
                '+' + overflowDocumentCount) : null;
        // Create list items for the documents to be shown
        var fileListItems = previewImages.slice(0, LIST_ITEM_COUNT).map(function (file, fileIndex) { return (React.createElement("li", {key: fileIndex}, 
            React.createElement(Image_1.Image, {className: 'ms-DocumentCardPreview-fileListIcon', src: file.iconSrc, role: 'presentation', alt: '', width: '16px', height: '16px'}), 
            React.createElement("a", {href: file.url}, file.name))); });
        return (React.createElement("div", null, 
            React.createElement("ul", {className: 'ms-DocumentCardPreview-fileList'}, fileListItems), 
            overflowText &&
                React.createElement("span", {className: 'ms-DocumentCardPreview-fileListMore'}, overflowText)));
    };
    __decorate([
        autobind_1.autobind
    ], DocumentCardPreview.prototype, "_renderPreviewList", null);
    return DocumentCardPreview;
}(React.Component));
exports.DocumentCardPreview = DocumentCardPreview;

//# sourceMappingURL=DocumentCardPreview.js.map
