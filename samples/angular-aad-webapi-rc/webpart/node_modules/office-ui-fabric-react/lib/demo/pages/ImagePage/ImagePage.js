"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
require('./ImagePage.scss');
var Image_Default_Example_1 = require('./examples/Image.Default.Example');
var Image_Center_Example_1 = require('./examples/Image.Center.Example');
var Image_Contain_Example_1 = require('./examples/Image.Contain.Example');
var Image_Cover_Example_1 = require('./examples/Image.Cover.Example');
var Image_None_Example_1 = require('./examples/Image.None.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var ImageDefaultExampleCode = require('./examples/Image.Default.Example.tsx');
var ImageCenterExampleCode = require('./examples/Image.Center.Example.tsx');
var ImageContainExampleCode = require('./examples/Image.Contain.Example.tsx');
var ImageCoverExampleCode = require('./examples/Image.Cover.Example.tsx');
var ImageNoneExampleCode = require('./examples/Image.None.Example.tsx');
var ImagePage = (function (_super) {
    __extends(ImagePage, _super);
    function ImagePage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Image');
    }
    ImagePage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Image', componentName: 'ImageExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'Default Behavior', code: ImageDefaultExampleCode}, 
                React.createElement(Image_Default_Example_1.ImageDefaultExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'ImageFit: None', code: ImageNoneExampleCode}, 
                React.createElement(Image_None_Example_1.ImageNoneExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'ImageFit: Center', code: ImageCenterExampleCode}, 
                React.createElement(Image_Center_Example_1.ImageCenterExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'ImageFit: Contain', code: ImageContainExampleCode}, 
                React.createElement(Image_Contain_Example_1.ImageContainExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'ImageFit: Cover', code: ImageCoverExampleCode}, 
                React.createElement(Image_Cover_Example_1.ImageCoverExample, null)
            )), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Image'}), overview: React.createElement("div", null, "Images render an image. The borders have been added to these examples in order to help visualize empty space in the image frame."), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return ImagePage;
}(React.Component));
exports.ImagePage = ImagePage;

//# sourceMappingURL=ImagePage.js.map
