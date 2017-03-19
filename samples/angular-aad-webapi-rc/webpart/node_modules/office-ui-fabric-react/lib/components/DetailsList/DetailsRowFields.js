"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var css_1 = require('../../utilities/css');
var DetailsRowFields = (function (_super) {
    __extends(DetailsRowFields, _super);
    function DetailsRowFields(props) {
        _super.call(this);
        this.state = this._getState(props);
    }
    DetailsRowFields.prototype.componentWillReceiveProps = function (newProps) {
        this.setState(this._getState(newProps));
    };
    DetailsRowFields.prototype.render = function () {
        var columns = this.props.columns;
        var cellContent = this.state.cellContent;
        return (React.createElement("div", {className: 'ms-DetailsRow-fields', "data-automationid": 'DetailsRowFields'}, columns.map(function (column, columnIndex) { return (React.createElement("div", {key: columnIndex, role: column.isRowHeader ? 'rowheader' : 'gridcell', className: css_1.css('ms-DetailsRow-cell', column.className, {
            'is-multiline': column.isMultiline
        }), style: { width: column.calculatedWidth }, "data-automationid": 'DetailsRowCell', "data-automation-key": column.key}, cellContent[columnIndex])); })));
    };
    DetailsRowFields.prototype._getState = function (props) {
        var _this = this;
        var item = props.item, itemIndex = props.itemIndex, onRenderItemColumn = props.onRenderItemColumn;
        return {
            cellContent: props.columns.map(function (column) {
                var cellContent;
                try {
                    var render = column.onRender || onRenderItemColumn;
                    cellContent = render ? render(item, itemIndex, column) : _this._getCellText(item, column);
                }
                catch (e) { }
                return cellContent;
            })
        };
    };
    DetailsRowFields.prototype._getCellText = function (item, column) {
        var value = (item && column && column.fieldName) ? item[column.fieldName] : '';
        if (value === null || value === undefined) {
            value = '';
        }
        return value;
    };
    return DetailsRowFields;
}(React.Component));
exports.DetailsRowFields = DetailsRowFields;

//# sourceMappingURL=DetailsRowFields.js.map
