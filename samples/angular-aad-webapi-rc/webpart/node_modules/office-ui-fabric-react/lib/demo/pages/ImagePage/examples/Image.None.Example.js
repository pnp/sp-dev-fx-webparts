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
var ImageNoneExample = (function (_super) {
    __extends(ImageNoneExample, _super);
    function ImageNoneExample() {
        _super.apply(this, arguments);
    }
    ImageNoneExample.prototype.render = function () {
        var imageProps = {
            src: 'http://placehold.it/500x250',
            imageFit: index_1.ImageFit.none,
            width: 350,
            height: 150
        };
        return (React.createElement("div", null, 
            React.createElement(index_1.Label, null, "The image is larger than the frame, so it is cropped to fit. The image is positioned at the upper left of the frame."), 
            React.createElement(index_1.Image, __assign({}, imageProps)), 
            React.createElement("br", null), 
            React.createElement(index_1.Label, null, "The image is smaller than the frame, so there is empty space within the frame. The image is positioned at the upper left of the frame."), 
            React.createElement(index_1.Image, __assign({}, imageProps, {src: 'http://placehold.it/100x100'}))));
    };
    return ImageNoneExample;
}(React.Component));
exports.ImageNoneExample = ImageNoneExample;

//# sourceMappingURL=Image.None.Example.js.map
