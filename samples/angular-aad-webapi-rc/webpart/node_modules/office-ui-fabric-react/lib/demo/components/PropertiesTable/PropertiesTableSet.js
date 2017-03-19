"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var PropertiesTable_1 = require('./PropertiesTable');
var index_1 = require('../../utilities/parser/index');
var PropertiesTableSet = (function (_super) {
    __extends(PropertiesTableSet, _super);
    function PropertiesTableSet(props) {
        _super.call(this, props);
        var componentName = props.componentName, componentPath = props.componentPath;
        var src;
        var properties = [];
        if (componentPath) {
            src = require('../../../' + componentPath + componentName + '.Props.ts');
        }
        else {
            src = require('../../../components/' + componentName + '/' + componentName + '.Props.ts');
        }
        if (props.renderOnly) {
            props.renderOnly.forEach(function (item) {
                properties = properties.concat(index_1.parse(src, item));
            });
        }
        else {
            properties = index_1.parse(src);
        }
        this.state = {
            properties: properties
        };
    }
    PropertiesTableSet.prototype.renderEach = function () {
        var _this = this;
        return this.state.properties.map(function (item) {
            return (React.createElement(PropertiesTable_1.PropertiesTable, {key: item.propertyName, title: item.name === ('I' + _this.props.componentName) ? (_this.props.componentName + ' class') : item.propertyName, properties: item.property, renderAsEnum: item.propertyType === PropertiesTable_1.PropertyType.enum}));
        });
    };
    PropertiesTableSet.prototype.render = function () {
        return (React.createElement("div", null, this.renderEach()));
    };
    PropertiesTableSet.defaultProps = {
        title: 'Properties'
    };
    return PropertiesTableSet;
}(React.Component));
exports.PropertiesTableSet = PropertiesTableSet;

//# sourceMappingURL=PropertiesTableSet.js.map
