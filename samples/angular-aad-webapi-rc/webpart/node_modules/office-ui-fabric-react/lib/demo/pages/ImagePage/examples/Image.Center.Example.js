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
var ImageCenterExample = (function (_super) {
    __extends(ImageCenterExample, _super);
    function ImageCenterExample() {
        _super.apply(this, arguments);
    }
    ImageCenterExample.prototype.render = function () {
        var imageProps = {
            src: 'http://placehold.it/800x300',
            imageFit: index_1.ImageFit.center,
            width: 350,
            height: 150,
            onLoad: function (ev) { return console.log('image loaded', ev); }
        };
        return (React.createElement("div", null, 
            React.createElement(index_1.Label, null, "The image is larger than the frame and its size is maintained, so all sides are cropped to center the image."), 
            React.createElement(index_1.Image, __assign({}, imageProps, {src: 'http://placehold.it/800x300'})), 
            React.createElement("br", null), 
            React.createElement(index_1.Label, null, "The image is smaller than the frame and its size is maintained, so there is empty space within the frame. The image is centered in the empty space."), 
            React.createElement(index_1.Image, __assign({}, imageProps, {src: 'http://placehold.it/100x100'}))));
    };
    return ImageCenterExample;
}(React.Component));
exports.ImageCenterExample = ImageCenterExample;

//# sourceMappingURL=Image.Center.Example.js.map
