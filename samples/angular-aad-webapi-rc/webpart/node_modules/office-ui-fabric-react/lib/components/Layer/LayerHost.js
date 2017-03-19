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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var ReactDOM = require('react-dom');
var Fabric_1 = require('../../Fabric');
var Utilities_1 = require('../../Utilities');
var ProjectedLayer_1 = require('./ProjectedLayer');
require('./LayerHost.scss');
var DEFAULT_HOST_ID = '__layerHost';
/**
 * LayerHost provides a wrapper that acts as a passthrough, rendering the given children within it, but also
 * appending a div at the end, which projects all content wrapped in the Layer components within. Projecting
 * DOM to the end of the document allows for overlaying and stacking scenarios.
 *
 * Normally you do not need to interact directly with LayerHost. If you render Layers within content that isn't
 * wrapped within a LayerHost, a LayerHost will be created and appended to the end of the document body, where
 * layer content will then be projected. However in some circumstances you want Layered content to be rendered
 * in a specific place rather than document body (for example in a popup window or contained within a scrollable
 * region.) In those cases, wrap the content wihtin a LayerHost.
 *
 * @example
 * <LayerHost>
 *   <Layer>I will at the end of LayerHost.</Layer>
 *   <div>I will render normally.</div>
 * </LayerHost>
 **/
var LayerHost = (function (_super) {
    __extends(LayerHost, _super);
    function LayerHost(props) {
        _super.call(this, props);
        this.state = {
            layers: []
        };
        this._layers = [];
        this._layerRefs = {};
    }
    LayerHost.getDefault = function (layerElement) {
        var doc = layerElement.ownerDocument;
        var hostElement = doc.getElementById(DEFAULT_HOST_ID);
        if (hostElement) {
            return hostElement[DEFAULT_HOST_ID];
        }
        else {
            hostElement = doc.createElement('div');
            hostElement.id = DEFAULT_HOST_ID;
            doc.body.appendChild(hostElement);
            var defaultHost = ReactDOM.render(React.createElement(LayerHost, {isDefault: true}), hostElement);
            hostElement[DEFAULT_HOST_ID] = defaultHost;
            return defaultHost;
        }
    };
    LayerHost.prototype.getChildContext = function () {
        return {
            layerHost: this
        };
    };
    LayerHost.prototype.render = function () {
        var _this = this;
        var divProps = Utilities_1.getNativeProps(this.props, Utilities_1.divProperties);
        return (React.createElement("div", __assign({}, divProps, {className: Utilities_1.css('ms-LayerHost', this.props.className, { 'ms-LayerHost--default': this.props.isDefault })}), 
            React.createElement(Fabric_1.Fabric, null, 
                this.props.children, 
                React.createElement("div", {className: 'ms-LayerHost-overlay'}, this._layers.map(function (layer) { return (React.createElement(ProjectedLayer_1.ProjectedLayer, {key: layer.id, layerId: layer.id, parentElement: layer.parentElement, defaultRemoteProps: layer.props, ref: _this._resolveLayer})); })))
        ));
    };
    LayerHost.prototype.addLayer = function (id, parentElement, props, onMounted) {
        this._layers.push({
            id: id,
            parentElement: parentElement,
            props: props,
            onMounted: onMounted
        });
        this.forceUpdate();
    };
    LayerHost.prototype.removeLayer = function (id) {
        var index = Utilities_1.findIndex(this._layers, function (layer) { return layer.id === id; });
        if (index >= 0) {
            this._layers.splice(index, 1);
            delete this._layerRefs[id];
            this.forceUpdate();
        }
    };
    LayerHost.prototype._resolveLayer = function (projectedLayer) {
        if (projectedLayer) {
            var layerId_1 = projectedLayer.getId();
            var index = Utilities_1.findIndex(this._layers, function (layer) { return layer.id === layerId_1; });
            if (index >= 0 && this._layerRefs[layerId_1] !== projectedLayer) {
                this._layerRefs[layerId_1] = projectedLayer;
                this._layers[index].onMounted(projectedLayer);
            }
        }
    };
    LayerHost.childContextTypes = {
        layerHost: React.PropTypes.object
    };
    __decorate([
        Utilities_1.autobind
    ], LayerHost.prototype, "_resolveLayer", null);
    return LayerHost;
}(Utilities_1.BaseComponent));
exports.LayerHost = LayerHost;

//# sourceMappingURL=LayerHost.js.map
