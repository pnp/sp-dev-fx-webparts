"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react'); // tslint:disable-line:no-unused-variable
require('./Layer.Example.scss');
var index_1 = require('../../../../index');
var LayerBasicExample = (function (_super) {
    __extends(LayerBasicExample, _super);
    function LayerBasicExample() {
        _super.call(this);
        this.state = {
            showLayer: false,
            time: new Date().toLocaleTimeString()
        };
    }
    LayerBasicExample.prototype.componentDidMount = function () {
        var _this = this;
        this._async.setInterval(function () { return _this.setState({ time: new Date().toLocaleTimeString() }); }, 1000);
    };
    LayerBasicExample.prototype.render = function () {
        var _this = this;
        var _a = this.state, showLayer = _a.showLayer, time = _a.time;
        var content = (React.createElement("div", {className: 'LayerExample-content ms-u-scaleUpIn100'}, 
            React.createElement("div", {className: 'LayerExample-textContent'}, "This is example layer content."), 
            React.createElement("div", null, time)));
        return (React.createElement("div", null, 
            React.createElement(index_1.Checkbox, {label: 'Wrap the content box belowed in a Layer', checked: showLayer, onChange: function (ev, checked) { return _this.setState({ showLayer: checked }); }}), 
            showLayer ? React.createElement(index_1.Layer, null, content) : content));
    };
    return LayerBasicExample;
}(index_1.BaseComponent));
exports.LayerBasicExample = LayerBasicExample;

//# sourceMappingURL=Layer.Basic.Example.js.map
