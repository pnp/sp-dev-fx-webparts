"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var ImageDefaultExample = (function (_super) {
    __extends(ImageDefaultExample, _super);
    function ImageDefaultExample() {
        _super.apply(this, arguments);
    }
    ImageDefaultExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Label, null, "For all of the examples below, no imageFit property has been provided."), 
            React.createElement(index_1.Label, null, "Without a width or height specified, the frame will fit the image. The image will not be scaled."), 
            React.createElement(index_1.Image, {src: 'http://placehold.it/350x150'}), 
            React.createElement("br", null), 
            React.createElement(index_1.Label, null, "If only a width is provided, the image will scale proportionally to fill that width."), 
            React.createElement(index_1.Image, {src: 'http://placehold.it/350x150', width: 600}), 
            React.createElement("br", null), 
            React.createElement(index_1.Label, null, "If only a height is provided, the image will scale proportionally to fill that height."), 
            React.createElement(index_1.Image, {src: 'http://placehold.it/350x150', height: 100}), 
            React.createElement("br", null), 
            React.createElement(index_1.Label, null, "If both width and height are provided, the image will be scaled to fit the frame. This may result in a distorted image."), 
            React.createElement(index_1.Image, {src: 'http://placehold.it/350x150', width: 100, height: 100})));
    };
    return ImageDefaultExample;
}(React.Component));
exports.ImageDefaultExample = ImageDefaultExample;

//# sourceMappingURL=Image.Default.Example.js.map
