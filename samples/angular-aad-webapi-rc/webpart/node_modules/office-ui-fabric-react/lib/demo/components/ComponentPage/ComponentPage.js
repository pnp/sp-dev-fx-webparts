"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../index');
require('./ComponentPage.scss');
var css_1 = require('../../../utilities/css');
var ComponentPage = (function (_super) {
    __extends(ComponentPage, _super);
    function ComponentPage(props) {
        _super.call(this, props);
    }
    ComponentPage.prototype.render = function () {
        var _a = this.props, componentName = _a.componentName, exampleCards = _a.exampleCards, overview = _a.overview, className = _a.className;
        return (React.createElement("div", {className: css_1.css('ComponentPage', className)}, 
            React.createElement("div", {className: componentName}, 
                this._pageHeader(), 
                React.createElement("div", {className: 'ComponentPage-body'}, 
                    React.createElement("div", {className: 'ComponentPage-overviewSection'}, 
                        React.createElement("h2", {className: 'ComponentPage-subHeading', id: 'Overview'}, "Overview"), 
                        React.createElement("div", {className: 'ComponentPage-overviewSectionContent'}, 
                            React.createElement("div", {className: 'ComponentPage-overview'}, overview), 
                            this._getRelatedComponents())), 
                    this._getDosAndDonts(), 
                    React.createElement("div", {className: 'ComponentPage-variantsSection'}, 
                        React.createElement("h2", {className: 'ComponentPage-subHeading ComponentPage-variantsTitle', id: 'Variants'}, "Variants"), 
                        exampleCards), 
                    this._getPropertiesTable()))
        ));
    };
    ComponentPage.prototype._pageHeader = function () {
        if (this.props.isHeaderVisible) {
            return (React.createElement("div", {className: 'ComponentPage-header'}, 
                React.createElement("h1", {className: 'ComponentPage-title'}, this.props.title), 
                this._navigationLinks()));
        }
    };
    ComponentPage.prototype._navigationLinks = function () {
        var links = [];
        var _a = this.props, bestPractices = _a.bestPractices, dos = _a.dos, donts = _a.donts, route = _a.route;
        if (bestPractices && dos && donts) {
            links.push(React.createElement("div", {className: 'ComponentPage-navLink', key: 'nav-link'}, 
                React.createElement(index_1.Link, {href: route + '#Best Practices'}, "Best Practices")
            ));
        }
        return (React.createElement("div", {className: 'ComponentPage-navigation'}, 
            React.createElement("div", {className: 'ComponentPage-navLink'}, 
                React.createElement(index_1.Link, {href: route + '#Overview'}, "Overview")
            ), 
            links, 
            React.createElement("div", {className: 'ComponentPage-navLink'}, 
                React.createElement(index_1.Link, {href: route + '#Variants'}, "Variants")
            ), 
            React.createElement("div", {className: 'ComponentPage-navLink'}, 
                React.createElement(index_1.Link, {href: route + '#Implementation'}, "Implementation")
            )));
    };
    ComponentPage.prototype._getRelatedComponents = function () {
        if (this.props.related) {
            return (React.createElement("div", {className: 'ComponentPage-related'}, 
                React.createElement("span", {className: 'ComponentPage-relatedTitle'}, "Also available in"), 
                this.props.related));
        }
    };
    ComponentPage.prototype._getPropertiesTable = function () {
        if (this.props.propertiesTables) {
            return (React.createElement("div", {className: 'ComponentPage-implementationSection'}, 
                React.createElement("h2", {className: 'ComponentPage-subHeading', id: 'Implementation'}, "Implementation"), 
                this.props.propertiesTables));
        }
    };
    ComponentPage.prototype._getDosAndDonts = function () {
        var dosAndDonts = [];
        if (this.props.bestPractices) {
            dosAndDonts.push(React.createElement("div", {className: 'ComponentPage-usage', id: 'Best Practices', key: 'best-practices'}, 
                React.createElement("h2", {className: 'ComponentPage-subHeading'}, "Best practices"), 
                this.props.bestPractices));
        }
        if (this.props.dos && this.props.donts) {
            dosAndDonts.push(React.createElement("div", {className: 'ComponentPage-doSections', key: 'do-sections'}, 
                React.createElement("div", {className: 'ComponentPage-doSection'}, 
                    React.createElement("h3", null, "Do"), 
                    this.props.dos), 
                React.createElement("div", {className: 'ComponentPage-doSection ComponentPage-doSection--dont'}, 
                    React.createElement("h3", null, "Don’t"), 
                    this.props.donts)));
        }
        if (this.props.bestPractices || (this.props.dos && this.props.donts)) {
            return (React.createElement("div", {className: 'ComponentPage-bestPracticesSection'}, dosAndDonts));
        }
    };
    ComponentPage.defaultProps = {
        isHeaderVisible: true
    };
    return ComponentPage;
}(React.Component));
exports.ComponentPage = ComponentPage;

//# sourceMappingURL=ComponentPage.js.map
