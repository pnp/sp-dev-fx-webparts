"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
require('./Layer.Example.scss');
var index_1 = require('../../../../index');
var LayerHostedExample = (function (_super) {
    __extends(LayerHostedExample, _super);
    function LayerHostedExample() {
        _super.call(this);
        this.state = { showLayer: false };
    }
    LayerHostedExample.prototype.render = function () {
        var _this = this;
        var showLayer = this.state.showLayer;
        var content = (React.createElement("div", {className: 'LayerExample-content ms-u-scaleUpIn100'}, "This is example layer content."));
        return (React.createElement(index_1.LayerHost, {className: 'LayerExample-customHost'}, 
            React.createElement("p", null, "In some cases, you may need to contain layered content within an area. Wrap the area with a LayerHost, and it will render content at the end of host's area."), 
            React.createElement(index_1.Checkbox, {label: 'Wrap the content box belowed in a Layer', checked: showLayer, onChange: function (ev, checked) { return _this.setState({ showLayer: checked }); }}), 
            showLayer ? React.createElement(index_1.Layer, null, content) : content, 
            React.createElement("div", {className: 'LayerExample-nonLayered'}, "I am normally below the content.")));
    };
    return LayerHostedExample;
}(React.Component));
exports.LayerHostedExample = LayerHostedExample;

//# sourceMappingURL=Layer.Hosted.Example.js.map
