"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var index_1 = require('../../../../index');
var array_1 = require('../../../../utilities/array');
require('./MarqueeSelection.Basic.Example.scss');
var PHOTOS = array_1.createArray(250, function () {
    var randomWidth = 50 + Math.floor(Math.random() * 150);
    return {
        url: "http://placehold.it/" + randomWidth + "x100",
        width: randomWidth,
        height: 100
    };
});
var MarqueeSelectionBasicExample = (function (_super) {
    __extends(MarqueeSelectionBasicExample, _super);
    function MarqueeSelectionBasicExample() {
        var _this = this;
        _super.call(this);
        this.state = {
            isMarqueeEnabled: true
        };
        this._selection = new index_1.Selection({ onSelectionChanged: function () {
                if (_this._isMounted) {
                    _this.forceUpdate();
                }
            } });
        this._selection.setItems(PHOTOS);
    }
    MarqueeSelectionBasicExample.prototype.componentDidMount = function () {
        this._isMounted = true;
    };
    MarqueeSelectionBasicExample.prototype.render = function () {
        var _this = this;
        return (React.createElement(index_1.MarqueeSelection, {selection: this._selection, isEnabled: this.state.isMarqueeEnabled}, 
            React.createElement(index_1.Checkbox, {label: 'Is marquee enabled', defaultChecked: true, onChange: function (ev, isMarqueeEnabled) { return _this.setState({ isMarqueeEnabled: isMarqueeEnabled }); }}), 
            React.createElement("p", null, "Drag a rectangle around the items below to select them:"), 
            React.createElement("ul", {className: 'ms-MarqueeSelectionBasicExample-photoList'}, PHOTOS.map(function (photo, index) { return (React.createElement("div", {key: index, className: index_1.css('ms-MarqueeSelectionBasicExample-photoCell', {
                'is-selected': _this._selection.isIndexSelected(index)
            }), "data-is-focusable": true, "data-selection-index": index, onClick: function () { return console.log('clicked'); }, style: { width: photo.width, height: photo.height }}, index)); }))));
    };
    return MarqueeSelectionBasicExample;
}(React.Component));
exports.MarqueeSelectionBasicExample = MarqueeSelectionBasicExample;

//# sourceMappingURL=MarqueeSelection.Basic.Example.js.map
