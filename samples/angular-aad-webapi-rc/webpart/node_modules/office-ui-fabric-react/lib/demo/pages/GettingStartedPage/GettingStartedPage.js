"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../index');
require('./GettingStartedPage.scss');
var Highlight = require('react-highlight');
var GettingStartedPage = (function (_super) {
    __extends(GettingStartedPage, _super);
    function GettingStartedPage() {
        _super.apply(this, arguments);
    }
    GettingStartedPage.prototype.render = function () {
        return (React.createElement("div", {className: 'ms-GettingStartedPage'}, 
            React.createElement("div", {className: 'ms-GettingStartedPage-banner'}, 
                React.createElement("h1", null, "office-ui-fabric-react"), 
                React.createElement("h3", null, "A library of reusable, generic React components")), 
            React.createElement("h2", null, "Overview"), 
            React.createElement("p", null, "Fabric React components are built as production ready components to be used in Microsoft products, but generalized, documented, and reusable. This enables us and our partners to more easily build great applications without spending a ton of time implementing the same things over and over."), 
            React.createElement("p", null, "Each component is designed to be RTL friendly, keyboard accessible, screen reader friendly, themeable, and generalized. TypeScript definition files are also included, so if you use TypeScript (which isn't a requirement), you will get compiler validation and using an editor like VS Code, you'll get intellisense. Each component is exported as a named module that can be easily imported in your code, allowing your external bundler to create small bundles that include just what you need."), 
            React.createElement("h2", null, "Getting started"), 
            React.createElement("p", null, 
                "Integrating components into your project depends heavily on your setup. The recommended setup is to use a bundler such as ", 
                React.createElement(index_1.Link, {href: 'https://webpack.github.io/', target: '_blank'}, "Webpack"), 
                " which can resolve NPM package imports in your code and can bundle the specific things you import."), 
            React.createElement("p", null, "Within an npm project, you should install the package and save it as a dependency:"), 
            React.createElement("div", {className: 'ms-GettingStartedPage-code'}, 
                React.createElement(Highlight, {className: 'bash'}, "npm install --save office-ui-fabric-react")
            ), 
            React.createElement("p", null, "This will add the fabric-react project as a dependency in your package.json file, and will drop the project under node_modules/office-ui-fabric-react."), 
            React.createElement("p", null, "The library includes commonjs entry points under the lib folder. To use a control, you should be able to import it and use it in your render method:"), 
            React.createElement("div", {className: 'ms-GettingStartedPage-code'}, 
                React.createElement(Highlight, {className: 'typescript'}, "import * as React from 'react';\nimport * as ReactDOM from 'react-dom';\nimport { Button } from 'office-ui-fabric-react/lib/Button';\n\nconst MyPage = () => (<div><Button>I am a button.</Button></div>);\n\nReactDOM.render(<MyPage />, document.body.firstChild);")
            ), 
            React.createElement("h2", null, "Notes on module vs path-based imports"), 
            React.createElement("p", null, "While it is possible to import all components as named imports from the main module entry point, it is not recommended to do so without using a bundler that supports es6 tree shaking. In other words, if you import the Button component like this:"), 
            React.createElement("div", {className: 'ms-GettingStartedPage-code'}, 
                React.createElement(Highlight, {className: 'typescript'}, "import { Button } from 'office-ui-fabric-react';")
            ), 
            React.createElement("p", null, "...this would work, but then unless you are using a tree-shaking bundler such as Rollup.js or Webpack 2, Webpack will assume you want every module exported from the main entry file to be included in your final bundle, which produces unnecessary large bundles and slows your page load down. Instead you can import the specific paths to trim down your bundle size:"), 
            React.createElement("div", {className: 'ms-GettingStartedPage-code'}, 
                React.createElement(Highlight, {className: 'typescript'}, "import { Button } from 'office-ui-fabric-react/lib/Button';\nimport { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';\nimport { List } from 'office-ui-fabric-react/lib/List';")
            ), 
            React.createElement("h2", null, "Using an AMD bundler like r.js"), 
            React.createElement("p", null, "\n        If your project relies on AMD modules, they are dropped in the lib-amd folder. You will need to set up your bundler to handle the imports correctly. This may require you to symlink or copy the folder into your pre-bundle location.\n        ")));
    };
    return GettingStartedPage;
}(React.Component));
exports.GettingStartedPage = GettingStartedPage;

//# sourceMappingURL=GettingStartedPage.js.map
