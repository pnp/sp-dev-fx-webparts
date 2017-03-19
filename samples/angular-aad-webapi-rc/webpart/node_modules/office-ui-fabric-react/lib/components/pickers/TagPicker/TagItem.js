"use strict";
/* tslint:disable */
var React = require('react');
var css_1 = require('../../../utilities/css');
require('./TagItem.scss');
exports.TagItem = function (props) { return (React.createElement("div", {className: css_1.css('ms-TagItem', {
    'is-selected': props.selected
}), key: props.index, "data-selection-index": props.index, "data-is-focusable": true}, 
    React.createElement("span", {className: 'ms-TagItem-text'}, props.children), 
    React.createElement("span", {className: 'ms-TagItem-close', onClick: props.onRemoveItem}, 
        React.createElement("i", {className: ' ms-Icon ms-Icon--Cancel'})
    ))); };

//# sourceMappingURL=TagItem.js.map
