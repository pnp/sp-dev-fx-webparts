"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var LayerHost_1 = require('./LayerHost');
var Utilities_1 = require('../../Utilities');
require('./Layer.scss');
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer(props) {
        _super.call(this, props);
        this._id = Utilities_1.getId();
    }
    Layer.prototype.componentDidMount = function () {
        var _this = this;
        var layerHost = this.context.layerHost || LayerHost_1.LayerHost.getDefault(this._rootElement);
        this._layerHost = layerHost;
        layerHost.addLayer(this._id, this._rootElement, this.props, function (projectedLayer) {
            _this._projectedLayer = projectedLayer;
            if (_this.props.onLayerMounted) {
                _this.props.onLayerMounted();
            }
        });
    };
    Layer.prototype.componentWillUnmount = function () {
        this._layerHost.removeLayer(this._id);
    };
    Layer.prototype.componentWillReceiveProps = function (newProps) {
        if (this._projectedLayer) {
            this._projectedLayer.projectProps(newProps);
        }
    };
    Layer.prototype.forceUpdate = function () {
        if (this._projectedLayer) {
            this._projectedLayer.forceUpdate();
        }
    };
    Layer.prototype.render = function () {
        return (React.createElement("span", {className: 'ms-Layer', ref: this._resolveRef('_rootElement')}));
    };
    Layer.contextTypes = {
        layerHost: React.PropTypes.object
    };
    return Layer;
}(Utilities_1.BaseComponent));
exports.Layer = Layer;

//# sourceMappingURL=Layer.js.map
