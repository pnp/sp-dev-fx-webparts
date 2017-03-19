"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var FocusZone_1 = require('../../FocusZone');
var KeyCodes_1 = require('../../utilities/KeyCodes');
var PivotItem_1 = require('./PivotItem');
var Pivot_Props_1 = require('./Pivot.Props');
var Pivot_Props_2 = require('./Pivot.Props');
var object_1 = require('../../utilities/object');
require('./Pivot.scss');
var css_1 = require('../../utilities/css');
var Pivot = (function (_super) {
    __extends(Pivot, _super);
    function Pivot(props) {
        _super.call(this, props);
        var links = this._getPivotLinks(this.props);
        var selectedKey;
        if (props.initialSelectedKey) {
            selectedKey = props.initialSelectedKey;
        }
        else if (props.initialSelectedIndex) {
            selectedKey = links[props.initialSelectedIndex].itemKey;
        }
        else {
            selectedKey = links[0].itemKey;
        }
        this.state = {
            links: links,
            selectedKey: selectedKey,
            id: object_1.getId('Pivot')
        };
        this._renderLink = this._renderLink.bind(this);
    }
    Pivot.prototype.componentWillReceiveProps = function (nextProps) {
        var links = this._getPivotLinks(nextProps);
        var selectedKey = this._isKeyValid(this.state.selectedKey)
            ? this.state.selectedKey
            : links[0].itemKey;
        this.setState({
            links: links,
            selectedKey: selectedKey
        });
    };
    Pivot.prototype.render = function () {
        return (React.createElement("div", null, 
            this._renderPivotLinks(), 
            this._renderPivotItem()));
    };
    /**
     * Renders the set of links to route between pivots
     */
    Pivot.prototype._renderPivotLinks = function () {
        return (React.createElement(FocusZone_1.FocusZone, {direction: FocusZone_1.FocusZoneDirection.horizontal}, 
            React.createElement("ul", {className: css_1.css('ms-Pivot', { 'ms-Pivot--large': this.props.linkSize === Pivot_Props_2.PivotLinkSize.large }, { 'ms-Pivot--tabs': this.props.linkFormat === Pivot_Props_1.PivotLinkFormat.tabs }), role: 'tablist'}, this.state.links.map(this._renderLink))
        ));
    };
    /**
     * Renders a pivot link
     */
    Pivot.prototype._renderLink = function (link) {
        var itemKey = link.itemKey, itemCount = link.itemCount;
        var id = this.state.id;
        var countText;
        if (itemCount !== undefined && this.props.linkFormat !== Pivot_Props_1.PivotLinkFormat.tabs) {
            countText = React.createElement("span", {className: 'ms-Pivot-count'}, 
                "(", 
                itemCount, 
                ")");
        }
        return (React.createElement("a", {id: id + '-tab', key: itemKey, className: css_1.css('ms-Pivot-link', { 'is-selected': this.state.selectedKey === itemKey }), onClick: this._onLinkClick.bind(this, itemKey), onKeyPress: this._onKeyPress.bind(this, itemKey), "aria-label": link.ariaLabel, role: 'tab', "aria-controls": id + '-panel', "aria-selected": this.state.selectedKey === itemKey}, 
            link.linkText, 
            countText));
    };
    /**
     * Renders the current Pivot Item
     */
    Pivot.prototype._renderPivotItem = function () {
        var itemKey = this.state.selectedKey;
        var index = this._keyToIndexMapping[itemKey];
        var id = this.state.id;
        return (React.createElement("div", {className: 'pivotItem', role: 'tabpanel', id: id + '-panel', "aria-labelledby": id + '-tab'}, React.Children.toArray(this.props.children)[index]));
    };
    /**
     * Gets the set of PivotLinks as arrary of IPivotItemProps
     * The set of Links is determined by child components of type PivotItem
     */
    Pivot.prototype._getPivotLinks = function (props) {
        var _this = this;
        var links = [];
        this._keyToIndexMapping = {};
        React.Children.map(props.children, function (child, index) {
            if (typeof child === 'object' && child.type === PivotItem_1.PivotItem) {
                var pivotItem = child;
                var itemKey = pivotItem.props.itemKey || index.toString();
                links.push({
                    linkText: pivotItem.props.linkText,
                    ariaLabel: pivotItem.props.ariaLabel,
                    itemKey: itemKey,
                    itemCount: pivotItem.props.itemCount
                });
                _this._keyToIndexMapping[itemKey] = index;
            }
        });
        return links;
    };
    /**
     * whether the key exists in the pivot items.
     */
    Pivot.prototype._isKeyValid = function (itemKey) {
        return itemKey !== undefined && this._keyToIndexMapping[itemKey] !== undefined;
    };
    /**
     * Handles the onClick event on PivotLinks
     */
    Pivot.prototype._onLinkClick = function (itemKey, ev) {
        ev.preventDefault();
        this._updateSelectedItem(itemKey, ev);
    };
    /**
     * Handle the onKeyPress eventon the PivotLinks
     */
    Pivot.prototype._onKeyPress = function (itemKey, ev) {
        ev.preventDefault();
        if (ev.which === KeyCodes_1.KeyCodes.enter) {
            this._updateSelectedItem(itemKey);
        }
    };
    /**
     * Updates the state with the new selected index
     */
    Pivot.prototype._updateSelectedItem = function (itemKey, ev) {
        this.setState({
            selectedKey: itemKey
        });
        if (this.props.onLinkClick && this._keyToIndexMapping[itemKey] >= 0) {
            var index = this._keyToIndexMapping[itemKey];
            // React.Element<any> cannot directly convert to PivotItem.
            var item = React.Children.toArray(this.props.children)[index];
            if (typeof item === 'object' && item.type === PivotItem_1.PivotItem) {
                this.props.onLinkClick(item, ev);
            }
        }
    };
    return Pivot;
}(React.Component));
exports.Pivot = Pivot;

//# sourceMappingURL=Pivot.js.map
