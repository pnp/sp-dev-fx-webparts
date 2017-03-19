"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var AppState_1 = require('../../../components/App/AppState');
var index_1 = require('../../../../index');
var NavFabricDemoAppExample = (function (_super) {
    __extends(NavFabricDemoAppExample, _super);
    function NavFabricDemoAppExample() {
        _super.apply(this, arguments);
    }
    NavFabricDemoAppExample.prototype.render = function () {
        return (React.createElement(index_1.Nav, {groups: AppState_1.AppState.examplePages, onRenderLink: function (link) { return ([
            React.createElement("span", {key: 1, className: 'Nav-linkText'}, link.name),
            (link.status !== undefined ?
                React.createElement("span", {key: 2, className: 'Nav-linkFlair ' + 'is-state' + link.status}, AppState_1.ExampleStatus[link.status]) :
                null)
        ]); }}));
    };
    return NavFabricDemoAppExample;
}(React.Component));
exports.NavFabricDemoAppExample = NavFabricDemoAppExample;

//# sourceMappingURL=Nav.FabricDemoApp.Example.js.map
