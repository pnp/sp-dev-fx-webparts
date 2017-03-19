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
var Utilities_1 = require('../Utilities');
// Track all components that require changes.
var _changedComponents;
var ConnectedHost = (function (_super) {
    __extends(ConnectedHost, _super);
    function ConnectedHost(props) {
        _super.call(this, props);
        this.state = {
            props: null
        };
    }
    ConnectedHost.prototype.componentWillMount = function () {
        var _this = this;
        if (this.props.storesToSubscribe && this.props.storesToSubscribe.length > 0) {
            if (!this.context.stores) {
                throw "A connected component was hosted in an environment where no stores were hosted. Use the StoreHost to host components.";
            }
            // Resolve and subscribe to stores.
            this._stores = this.props.storesToSubscribe.map(function (storeKey) {
                var store = _this.context.stores.getStore(storeKey);
                if (!store) {
                    throw "The \"" + storeKey.name + "\" store was required by a connected component, but not exposed.";
                }
                _this._disposables.push(store.subscribe(_this._onStoreChanged));
                return store;
            });
        }
        // We can only initialize state at this point, where context has been resolved.
        this.state = {
            props: this._getComponentProps(this.props)
        };
    };
    ConnectedHost.prototype.componentDidMount = function () {
        this._isMounted = true;
    };
    ConnectedHost.prototype.componentWillUnmount = function () {
        this._isMounted = false;
    };
    ConnectedHost.prototype.componentWillReceiveProps = function (newProps) {
        this._updateProps(newProps);
    };
    ConnectedHost.prototype.shouldComponentUpdate = function (newProps, newState) {
        var inputPropsHaveChanged = !Utilities_1.shallowCompare(this.props.componentProps, newProps.componentProps);
        var computedPropsHaveChanged = !Utilities_1.shallowCompare(this.state.props, newState.props);
        var shouldUpdate = inputPropsHaveChanged || computedPropsHaveChanged;
        return shouldUpdate;
    };
    ConnectedHost.prototype.render = function () {
        var Component = this.props.component;
        var props = this.state.props;
        return props ? React.createElement(Component, __assign({}, props)) : null;
    };
    ConnectedHost.prototype._onStoreChanged = function () {
        var storesToSubscribe = this.props.storesToSubscribe;
        if (!storesToSubscribe || storesToSubscribe.length < 2) {
            this._updateProps();
        }
        else if (!this._changeEnqueued) {
            if (!_changedComponents) {
                _changedComponents = [];
                this._async.setImmediate(function () {
                    _changedComponents.forEach(function (comp) { return comp._updateProps(); });
                    _changedComponents = null;
                });
            }
            _changedComponents.push(this);
            this._changeEnqueued = true;
        }
    };
    ConnectedHost.prototype._updateProps = function (props) {
        this._changeEnqueued = false;
        props = this._getComponentProps(props || this.props);
        this.setState({ props: props });
    };
    ConnectedHost.prototype._getComponentProps = function (props) {
        var newProps = Utilities_1.assign({}, props.componentProps, props.getProps.apply(props, [props.componentProps].concat(this._stores)));
        return newProps;
    };
    ConnectedHost.contextTypes = {
        stores: React.PropTypes.object
    };
    __decorate([
        Utilities_1.autobind
    ], ConnectedHost.prototype, "_onStoreChanged", null);
    __decorate([
        Utilities_1.autobind
    ], ConnectedHost.prototype, "_updateProps", null);
    return ConnectedHost;
}(Utilities_1.BaseComponent));
exports.ConnectedHost = ConnectedHost;

//# sourceMappingURL=ConnectedHost.js.map
