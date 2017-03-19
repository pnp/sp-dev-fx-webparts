"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var ReactDOM = require('react-dom');
var App_1 = require('./components/App/App');
var AppState_1 = require('./components/App/AppState');
var index_1 = require('../utilities/router/index');
var GettingStartedPage_1 = require('./pages/GettingStartedPage/GettingStartedPage');
var resources_1 = require('../utilities/resources');
var Fabric_1 = require('../Fabric');
var Debugging = require('./utilities/debugging');
require('./app.scss');
require('./ColorStyles.scss');
resources_1.setBaseUrl('./dist/');
/* tslint:disable:no-string-literal */
window['Debugging'] = Debugging;
/* tslint:enable:no-string-literal */
var rootElement;
// Return the anchor link from the URL without the hash
function _extractAnchorLink(path) {
    var index = path.lastIndexOf('#');
    if (index >= 0) {
        path = path.substr(index + 1, path.length - index);
    }
    return path;
}
function _scrollAnchorLink() {
    if ((window.location.hash.match(/#/g) || []).length > 1) {
        var anchor = _extractAnchorLink(window.location.hash);
        document.getElementById(anchor).scrollIntoView();
    }
}
function _onLoad() {
    rootElement = rootElement || document.getElementById('content');
    ReactDOM.render(React.createElement(Fabric_1.Fabric, null, 
        React.createElement(index_1.Router, {onNewRouteLoaded: _scrollAnchorLink}, _getRoutes())
    ), rootElement);
}
function _getRoutes() {
    var routes = AppState_1.AppState.testPages.map(function (page) { return React.createElement(index_1.Route, {key: page.key, path: page.url, component: page.component}); });
    var appRoutes = [];
    AppState_1.AppState.examplePages.forEach(function (group) {
        group.links
            .filter(function (link) { return link.hasOwnProperty('component'); })
            .forEach(function (link, linkIndex) {
            var component = link.component;
            appRoutes.push(React.createElement(index_1.Route, {key: link.key, path: link.url, component: component}));
        });
    });
    // Default route.
    appRoutes.push(React.createElement(index_1.Route, {key: 'gettingstarted', component: GettingStartedPage_1.GettingStartedPage}));
    routes.push(React.createElement(index_1.Route, {key: 'app', component: App_1.App}, appRoutes));
    return routes;
}
function _onUnload() {
    if (rootElement) {
        ReactDOM.unmountComponentAtNode(rootElement);
    }
}
var isReady = document.readyState === 'interactive' || document.readyState === 'complete';
if (isReady) {
    _onLoad();
}
else {
    window.onload = _onLoad;
}
window.onunload = _onUnload;

//# sourceMappingURL=app.js.map
