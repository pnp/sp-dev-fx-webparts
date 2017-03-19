"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var EventGroup_1 = require('../eventGroup/EventGroup');
var Router = (function (_super) {
    __extends(Router, _super);
    function Router() {
        _super.call(this);
        this.state = {
            path: location.hash
        };
        this._events = new EventGroup_1.EventGroup(this);
    }
    Router.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.state.path !== prevState.path) {
            window.scrollTo(0, 0);
        }
    };
    Router.prototype.render = function () {
        return _getComponent(this.state.path, this.props.children);
    };
    Router.prototype.componentDidMount = function () {
        var _this = this;
        this._events.on(window, 'hashchange', function () {
            if (_this.state.path !== location.hash) {
                _this.setState({ path: location.hash }, function () {
                    if (_this.props.onNewRouteLoaded) {
                        _this.props.onNewRouteLoaded();
                    }
                });
            }
        });
        if (this.props.onNewRouteLoaded) {
            this.props.onNewRouteLoaded();
        }
    };
    Router.prototype.componentWillUnmount = function () {
        this._events.dispose();
    };
    return Router;
}(React.Component));
exports.Router = Router;
function _getComponent(matchPath, children) {
    var path = matchPath;
    if (children && children.$$typeof) {
        children = [children];
    }
    // Check if an in page anchor link was passed to the Url #/example/route#inPageAnchorLink
    if (_hasAnchorLink(path)) {
        // Extract the base path #/example/route - #inPageAnchorLink
        path = _extractRoute(path);
    }
    for (var i = 0; children && i < children.length; i++) {
        var currentChild = children[i];
        if (_match(path, currentChild)) {
            var component = currentChild.props.component;
            var childComponent = _getComponent(path, currentChild.props.children);
            return React.createElement(component, null, childComponent);
        }
    }
    return null;
}
function _hasAnchorLink(path) {
    return (path.match(/#/g) || []).length > 1;
}
/*
  Extract the route from the URL minus the in page anchor link
  Example URL #/example/route#inPageAnchorLink
  Returns #/example/route
*/
function _extractRoute(path) {
    var index = path.lastIndexOf('#');
    if (index >= 0) {
        path = path.substr(0, index);
    }
    return path;
}
function _match(currentPath, child) {
    if (child.props) {
        var path = child.props.path;
        path = path || '';
        currentPath = currentPath || '';
        return ((!path) ||
            (path.toLowerCase() === currentPath.toLowerCase()));
    }
    return false;
}

//# sourceMappingURL=Router.js.map
