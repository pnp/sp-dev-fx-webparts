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
var BaseDecorator_1 = require('./BaseDecorator');
function withContainsFocus(ComposedComponent) {
    return (function (_super) {
        __extends(WithContainsFocusComponent, _super);
        function WithContainsFocusComponent() {
            _super.call(this);
            this.state = {
                containsFocus: false
            };
            this._delayedSetContainsFocus = this._async.debounce(this._setContainsFocus, 20);
            this._updateComposedComponentRef = this._updateComposedComponentRef.bind(this);
        }
        WithContainsFocusComponent.prototype.componentWillUnmount = function () {
            this._async.dispose();
        };
        WithContainsFocusComponent.prototype.render = function () {
            var containsFocus = this.state.containsFocus;
            return (React.createElement("div", {ref: 'root', onFocus: this._handleFocus.bind(this), onBlur: this._handleBlur.bind(this)}, 
                React.createElement(ComposedComponent, __assign({ref: this._updateComposedComponentRef, containsFocus: containsFocus}, this.props))
            ));
        };
        WithContainsFocusComponent.prototype.forceUpdate = function () {
            this._composedComponentInstance.forceUpdate();
        };
        WithContainsFocusComponent.prototype._handleFocus = function (ev) {
            this._newContainsFocus = true;
            this._delayedSetContainsFocus();
        };
        WithContainsFocusComponent.prototype._handleBlur = function (ev) {
            this._newContainsFocus = false;
            this._delayedSetContainsFocus();
        };
        WithContainsFocusComponent.prototype._setContainsFocus = function () {
            if (this.state.containsFocus !== this._newContainsFocus) {
                this.setState({ containsFocus: this._newContainsFocus });
            }
        };
        return WithContainsFocusComponent;
    }(BaseDecorator_1.BaseDecorator));
}
exports.withContainsFocus = withContainsFocus;

//# sourceMappingURL=withContainsFocus.js.map
