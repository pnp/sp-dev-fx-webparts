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
var React = require('react');
var index_1 = require('../../../../index');
var ImageCoverExample = (function (_super) {
    __extends(ImageCoverExample, _super);
    function ImageCoverExample() {
        _super.apply(this, arguments);
    }
    ImageCoverExample.prototype.render = function () {
        var imageProps = {
            src: 'http://placehold.it/700x300',
            imageFit: index_1.ImageFit.cover
        };
        return (React.createElement("div", null, 
            React.createElement(index_1.Label, null, "The image has a wider aspect ratio (landscape) than the frame, so the image is scaled to fit the height and the sides are cropped evenly."), 
            React.createElement(index_1.Image, __assign({}, imageProps, {width: 200, height: 200})), 
            React.createElement("br", null), 
            React.createElement(index_1.Label, null, "The image has a taller aspect ratio (portrait) than the frame, so the image is scaled to fit the width and the top and bottom are cropped evenly."), 
            React.createElement(index_1.Image, __assign({}, imageProps, {width: 300, height: 50}))));
    };
    return ImageCoverExample;
}(React.Component));
exports.ImageCoverExample = ImageCoverExample;

//# sourceMappingURL=Image.Cover.Example.js.map
