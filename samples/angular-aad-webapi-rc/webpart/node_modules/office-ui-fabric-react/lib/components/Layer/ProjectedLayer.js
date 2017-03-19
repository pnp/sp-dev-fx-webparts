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
var Utilities_1 = require('../../Utilities');
require('./Layer.scss');
/**
 * ProjectedLayer is an internal helper component that projects the contents rendered within a Layer. It is created
 * by the corresponding LayerHost that the originating Layer communicates with.
 */
var ProjectedLayer = (function (_super) {
    __extends(ProjectedLayer, _super);
    function ProjectedLayer(props) {
        _super.call(this, props);
        this.state = {
            isMounted: false
        };
        this._remoteProps = props.defaultRemoteProps;
    }
    ProjectedLayer.prototype.shouldComponentUpdate = function () {
        return !this.state.isMounted;
    };
    ProjectedLayer.prototype.componentDidMount = function () {
        Utilities_1.setVirtualParent(this._rootElement, this.props.parentElement);
        this.setState({ isMounted: true });
    };
    ProjectedLayer.prototype.render = function () {
        var remoteProps = Utilities_1.getNativeProps(this._remoteProps, Utilities_1.divProperties);
        // If this is the first render, let's avoid rendering children until we're certain that we've set
        // the virtual parent. After that, we can safely render the children, which in turn can safely call
        // dom utilities like elementContains, which respects the virtual parent.
        if (!this.state.isMounted) {
            delete remoteProps.children;
        }
        return (React.createElement("div", __assign({}, remoteProps, {className: Utilities_1.css('ms-ProjectedLayer', remoteProps.className), ref: this._resolveRef('_rootElement')})));
    };
    ProjectedLayer.prototype.getId = function () {
        return this.props.layerId;
    };
    ProjectedLayer.prototype.projectProps = function (remoteProps) {
        this._remoteProps = remoteProps;
        this.forceUpdate();
    };
    return ProjectedLayer;
}(Utilities_1.BaseComponent));
exports.ProjectedLayer = ProjectedLayer;

//# sourceMappingURL=ProjectedLayer.js.map
