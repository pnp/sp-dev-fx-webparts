"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
require('./PropertiesTable.scss');
var DetailsList_1 = require('../../../DetailsList');
var interfaces_1 = require('../../../utilities/selection/interfaces');
var object_1 = require('../../../utilities/object');
(function (InterfacePropertyType) {
    InterfacePropertyType[InterfacePropertyType["required"] = 0] = "required";
    InterfacePropertyType[InterfacePropertyType["optional"] = 1] = "optional";
    InterfacePropertyType[InterfacePropertyType["deprecated"] = 2] = "deprecated";
})(exports.InterfacePropertyType || (exports.InterfacePropertyType = {}));
var InterfacePropertyType = exports.InterfacePropertyType;
(function (PropertyType) {
    PropertyType[PropertyType["enum"] = 0] = "enum";
    PropertyType[PropertyType["interface"] = 1] = "interface";
})(exports.PropertyType || (exports.PropertyType = {}));
var PropertyType = exports.PropertyType;
var DEFAULT_COLUMNS = [
    {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 150,
        maxWidth: 250,
        isCollapsable: false,
        isRowHeader: true,
        isResizable: true
    },
    {
        key: 'type',
        name: 'Type',
        fieldName: 'type',
        minWidth: 130,
        maxWidth: 150,
        isCollapsable: false,
        isResizable: true
    },
    {
        key: 'defaultValue',
        name: 'Default value',
        fieldName: 'defaultValue',
        minWidth: 130,
        maxWidth: 150,
        isCollapsable: false,
        isResizable: true
    }, {
        key: 'description',
        name: 'Description',
        fieldName: 'description',
        minWidth: 300,
        maxWidth: 400,
        isCollapsable: false,
        isResizable: true,
        isMultiline: true
    }
];
var ENUM_COLUMNS = [
    {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 150,
        maxWidth: 250,
        isCollapsable: false,
        isRowHeader: true,
        isResizable: true
    },
    {
        key: 'description',
        name: 'Description',
        fieldName: 'description',
        minWidth: 300,
        maxWidth: 400,
        isCollapsable: false,
        isResizable: true
    }
];
var PropertiesTable = (function (_super) {
    __extends(PropertiesTable, _super);
    function PropertiesTable(props) {
        _super.call(this, props);
        var properties = props.properties
            .map(function (prop, index) { return object_1.assign({ key: index }, prop); })
            .sort(function (a, b) { return (a.name > b.name) ? -1 : 1; })
            .sort(function (a, b) { return (a.interfacePropertyType < b.interfacePropertyType) ? -1 : 1; });
        var groups = null;
        if (!props.renderAsEnum) {
            groups = this._getGroups(properties);
        }
        this.state = {
            properties: properties,
            groups: groups,
            isEnum: !!props.renderAsEnum
        };
    }
    PropertiesTable.prototype.render = function () {
        var title = this.props.title;
        var _a = this.state, properties = _a.properties, isEnum = _a.isEnum, groups = _a.groups;
        return (React.createElement("div", {className: 'PropertiesTable'}, 
            React.createElement("h2", {className: 'ms-font-xl'}, title), 
            (properties && properties.length) ? (React.createElement(DetailsList_1.DetailsList, {selectionMode: interfaces_1.SelectionMode.none, layoutMode: DetailsList_1.DetailsListLayoutMode.justified, items: properties, groups: groups, columns: isEnum ? ENUM_COLUMNS : DEFAULT_COLUMNS})) : (React.createElement("div", {className: 'PropertiesTable-noProperties'}, "This component is missing properties. Please provide properties or remove the table from the example."))));
    };
    PropertiesTable.prototype._getGroups = function (props) {
        var groups = [];
        var index = 0;
        index = this._tryAddGroup(props, InterfacePropertyType.required, 'Required members', index, groups);
        index = this._tryAddGroup(props, InterfacePropertyType.optional, 'Optional members', index, groups);
        index = this._tryAddGroup(props, InterfacePropertyType.deprecated, 'Deprecated members', index, groups);
        return groups;
    };
    PropertiesTable.prototype._tryAddGroup = function (props, typeToCompare, name, index, allGroups) {
        var group;
        while (index < props.length) {
            var prop = props[index];
            if (prop.interfacePropertyType !== typeToCompare) {
                break;
            }
            if (!group) {
                group = {
                    key: name,
                    name: name,
                    startIndex: index,
                    count: 0
                };
                allGroups.push(group);
            }
            group.count++;
            index++;
        }
        return index;
    };
    PropertiesTable.defaultProps = {
        title: 'Properties'
    };
    return PropertiesTable;
}(React.Component));
exports.PropertiesTable = PropertiesTable;

//# sourceMappingURL=PropertiesTable.js.map
